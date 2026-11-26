import {test,before,after} from 'node:test'
import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import {randomUUID} from 'node:crypto'
import {PGlite} from '@electric-sql/pglite'
import {buildCatalog,catalogView,publishCatalog,currentCatalog,catalogFile,docxFields} from '../app/server/catalog.mjs'
import {readCatalogDir} from '../app/server/catalog-files.mjs'
import {ctis} from '../app/server/store.mjs'

const catalogDir=fileURLToPath(new URL('../catalog',import.meta.url))

const md=(header,body='')=>'---\n'+header.trim()+'\n---\n'+body
const fixtures=async()=>[
  {path:'requirements/part-i.md',text:md(`
id: part-i
name: Part I (fictional example)
part: I
country: EU
version: 1.0
effective: 2026-01-01
use_when: Every CTIS application.
documents:
  - {doc_type: protocol-synopsis, name: Protocol synopsis, required: always}
  - {doc_type: cover-letter, name: Cover letter, required: always, submission_types: [initial, substantial-modification]}
  - {doc_type: modification-description, name: Description of the modification, required: always, submission_types: [substantial-modification]}`)},
  {path:'requirements/de.md',text:md(`
id: de
name: Germany Part II (fictional example)
part: II
country: DE
version: 1.0
effective: 2026-01-01
use_when: Part II documents for Germany.
reference: https://example.org/de
documents:
  - {doc_type: participant-information-consent, name: Participant information and consent, required: always, languages: [de], per: population}
  - {doc_type: recruitment-arrangements, name: Recruitment arrangements, required: conditional, condition: When participants are recruited by advertisement, authority_form: recruitment-consent-procedure-de}`,'Signatures are wet ink.')},
  {path:'content/participant-information-consent.md',text:md(`
id: participant-information-consent
name: Participant information and consent
part: II
version: 1.0
effective: 2026-01-01
use_when: Adults able to consent.`,`
## S01 · Study purpose
Fill: study
Must say: why the study is done, in plain language.

## S02 · Taking part is voluntary
Fill: standard
Standard wording: Taking part is voluntary. You can stop at any time.
Check: the protocol must not contradict this.

## S03 · Site contact
Fill: site
Leave as placeholder: [Site study team]

## Checklist
- C01 All sections present.
- C02 Visit schedule matches the protocol.`)},
  {path:'content/participant-information-consent-de.md',text:md(`
id: participant-information-consent-de
name: Participant information and consent (Germany)
doc_type: participant-information-consent
part: II
countries: [DE]
languages: [de]
version: 1.0
effective: 2026-01-01
use_when: German adults.`,`
## S01 · Zweck der Studie
Fill: study
## S02 · Freiwilligkeit
Fill: standard
Standard wording: Die Teilnahme ist freiwillig.`)},
  {path:'content/future-guide.md',text:md(`
id: future-guide
name: Not yet effective
doc_type: protocol-synopsis
part: I
version: 2.0
effective: 2099-01-01
use_when: Later.`,'## S01 · Summary\nFill: study')}
]

test('the shipped catalog is valid and the default layout has its slots',async()=>{
  const built=await buildCatalog(await readCatalogDir(catalogDir))
  assert.deepEqual(built.errors,[])
  const layout=built.items.find(i=>i.id==='default-layout')
  assert.deepEqual(layout.tags.map(t=>t.id+'@'+t.parts.join()).sort(),['body@document','footer@footer','footer_ids@footer','page_label@footer','page_of@footer','subtitle@document','title@document'])
  const guides=built.items.filter(i=>i.category==='workflow').flatMap(i=>i.header.applies_to)
  for(const t of ['planning','draft','checklist','qc','style','revision','findings'])assert.ok(guides.includes(t),t)
})

test('validation explains what to fix',async()=>{
  const base=[...await readCatalogDir(catalogDir),...await fixtures()]
  const bad=await buildCatalog([...base,
    {path:'content/broken.md',text:md('id: broken\nname: Broken\npart: II\nversion: 1\neffective: 2026-01-01\nuse_when: x\nword_template: recruitment-consent-procedure-de','## S01 Title\n## S02 · Ok\nFill: maybe\n## S03 · Std\nFill: standard')},
    {path:'requirements/fr.md',text:md('id: fr\nname: France\npart: II\ncountry: FR\nversion: 1\neffective: 2026-01-01\nuse_when: x\ndocuments:\n  - {doc_type: pic, name: PIC, required: always, authority_form: default-layout}')},
    {path:'word/no-file.md',text:md('id: no-file\nname: x\nkind: layout\nversion: 1\neffective: 2026-01-01\nuse_when: x\nslots:\n  - {id: title}')},
    {path:'workflow/planning-copy.md',text:md('id: planning\nname: dup\nversion: 1\neffective: 2026-01-01\nuse_when: x\napplies_to: [nowhere]')}])
  const has=re=>assert.ok(bad.errors.some(e=>re.test(e)),'expected an error matching '+re+'\n'+bad.errors.join('\n'))
  has(/broken\.md: Section heading "S01 Title" must look like/)
  has(/broken\.md: S02: Fill must be one of/)
  has(/broken\.md: S03: standard sections need/)
  has(/broken\.md: section S02 has no slot in Word template recruitment-consent-procedure-de/)
  has(/fr\.md: pic authority_form default-layout is not a Word template of kind form/)
  has(/no-file\.md: missing word\/no-file\.docx/)
  has(/applies_to nowhere/)
  has(/id planning is also used by/)
  assert.ok(bad.warnings.some(w=>/no content guide yet for pic/.test(w)))
})

test('matching: requirements by submission type, the most specific content guide, and the Word template',async()=>{
  const built=await buildCatalog([...await readCatalogDir(catalogDir),...await fixtures()])
  assert.deepEqual(built.errors,[])
  const cat=catalogView({id:1,items:built.items},{today:'2026-11-26'})
  const req=cat.requirements({countries:['DE','ES'],submission_type:'Initial application'})
  assert.deepEqual(req.items.map(i=>i.id),['part-i','de']);assert.deepEqual(req.missing,['ES'])
  assert.deepEqual(req.items[0].documents.map(d=>d.doc_type),['protocol-synopsis','cover-letter'])
  assert.deepEqual(cat.requirements({countries:[],submission_type:'Substantial modification'}).items[0].documents.map(d=>d.doc_type),['protocol-synopsis','cover-letter','modification-description'])
  assert.equal(req.items[1].notes,'Signatures are wet ink.')
  const de={id:'D04',part:'II',country:'DE',language:'de',doc_type:'participant-information-consent',catalog:{}}
  const es={...de,id:'D07',country:'ES',language:'es'}
  assert.equal(cat.contentGuide(de).id,'participant-information-consent-de')
  assert.equal(cat.contentGuide(es).id,'participant-information-consent')
  assert.equal(cat.wordTemplate(es).id,'default-layout')
  const form={id:'D05',part:'II',country:'DE',language:'de',doc_type:'recruitment-arrangements',catalog:{}}
  assert.equal(cat.wordTemplate(form).id,'recruitment-consent-procedure-de')
  assert.equal(cat.contentGuide({...de,catalog:{content_guide:'participant-information-consent'}}).id,'participant-information-consent','the plan can pin an item')
  assert.equal(cat.contentGuide({id:'D01',part:'I',country:'EU',language:'en',doc_type:'protocol-synopsis',catalog:{}}),null,'items not yet effective are ignored')
  const bundle=cat.forDeliverable(de,'qc',{submission_type:'initial'})
  assert.equal(bundle.content_guide.id,'participant-information-consent-de');assert.equal(bundle.word_template,null)
  assert.deepEqual(bundle.requirements.map(r=>[r.doc_type,r.per,r.from]),[['participant-information-consent','population','de']])
  assert.deepEqual(bundle.workflow.map(w=>w.id),['source-qc','findings'])
  assert.equal(cat.forDeliverable(form,'style').word_template.header.kind,'form')
  assert.deepEqual(cat.search({query:'consent',country:'DE'}).map(i=>i.id).sort(),['default-layout','participant-information-consent','participant-information-consent-de','recruitment-consent-procedure-de'])
  assert.deepEqual(cat.search({category:'requirements',doc_type:'recruitment-arrangements'}).map(i=>i.id),['de'])
})

test('publishing is idempotent and a store document resolves its catalog items',async()=>{
  const pg=new PGlite(),db={transaction:fn=>pg.transaction(tx=>fn(async(sql,p)=>(await tx.query(sql,p)).rows))}
  try{
    await pg.exec(await readFile(new URL('../app/server/schema.sql',import.meta.url),'utf8'))
    const built=await buildCatalog([...await readCatalogDir(catalogDir),...await fixtures()])
    const first=await publishCatalog(db,built,{sha:'abc'})
    assert.deepEqual(first,{release:1,published:true})
    assert.deepEqual(await publishCatalog(db,built,{sha:'abc'}),{release:1,published:false})
    await assert.rejects(publishCatalog(db,{...built,errors:['x']}),/errors/)
    const run=ctis(db),user={id:'u1',email:'u1@example.org'}
    const {project}=await run(user,{op:'project.create',requestId:randomUUID(),input:{code:'EX-101',name:'EX-101',submission_type:'Initial application'}})
    const plan=await run(user,{op:'plan.save',project:project.id,revision:0,requestId:randomUUID(),input:{
      documents:[{id:'D04',name:'PIC adults',part:'II',country:'DE',language:'de',doc_type:'participant-information-consent',filename:'EX101_ICF_DE_de'}],
      steps:[{type:'draft'},{type:'qc'},{type:'style'}]}})
    const doc=plan.documents[0]
    const cat=await db.transaction(q=>currentCatalog(q,{today:'2026-11-26'}))
    const style=cat.forDeliverable(doc,'style',{submission_type:project.submission_type})
    assert.equal(style.content_guide.id,'participant-information-consent-de')
    assert.equal(style.word_template.id,'default-layout')
    assert.equal(style.requirements[0].from,'de')
    const file=await db.transaction(q=>catalogFile(q,cat.release,'default-layout'))
    assert.deepEqual((await docxFields(file.buffer)).map(t=>t.id).sort(),['body','footer','footer_ids','page_label','page_of','subtitle','title'])
  }finally{await pg.close()}
})
