import {test} from 'node:test'
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
// Fictional examples; real content lives in catalog/.
const fixtures=[
  {path:'planning/Part-I.md',text:md(`
id: Part-I
name: Part I planning checklist (fictional example)
part: I
country: EU
version: 1.0
effective: 2026-01-01
use_when: Every CTIS application.
documents:
  - {code: D1_protocol-synopsis, name: Protocol synopsis, required: always}
  - {code: B1_cover-letter, name: Cover letter, required: always, submission_types: [initial, substantial-modification]}
  - {code: B2_modification-description, name: Description of the modification, required: always, submission_types: [substantial-modification]}`)},
  {path:'planning/DE.md',text:md(`
id: DE
name: Germany Part II planning checklist (fictional example)
part: II
country: DE
version: 1.0
effective: 2026-01-01
use_when: Part II documents for Germany.
naming: '<study>_<code>_<variant>_DE_de, with the variant in German'
documents:
  - {code: L1_SIS-ICF, name: Subject information and consent, variants: [adults, minors], required: always, languages: [de], per: population, national_notes: Signature blocks as a table.}
  - {code: K1_recruitment-arrangements, name: Recruitment arrangements, required: always}`,'Signatures are wet ink.')},
  {path:'content/L1_SIS-ICF_adults.md',text:md(`
id: L1_SIS-ICF_adults
name: L1 SIS and ICF – adults
code: L1_SIS-ICF
variant: adults
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

## S03 · Site contact
Fill: site
Leave as placeholder: [Site study team]

## Checklist
- C01 All sections present.
- C02 Visit schedule matches the protocol.`)},
  {path:'content/L1_SIS-ICF_adults_DE.md',text:md(`
id: L1_SIS-ICF_adults_DE
name: L1 SIS and ICF – adults – Germany
code: L1_SIS-ICF
variant: adults
part: II
countries: [DE]
languages: [de]
version: 1.0
effective: 2026-01-01
use_when: German adults.`,'## S01 · Zweck der Studie\nFill: study\n## S02 · Freiwilligkeit\nFill: standard\nStandard wording: Die Teilnahme ist freiwillig.')},
  {path:'styling/L1_SIS-ICF_DE.md',text:md(`
id: L1_SIS-ICF_DE
name: L1 styling – Germany (fictional example)
code: L1_SIS-ICF
countries: [DE]
version: 1.0
effective: 2026-01-01
use_when: German L1 documents.
base: L1_SIS-ICF`,'Put the data protection section in a box.')},
  {path:'content/D1_protocol-synopsis.md',text:md(`
id: D1_protocol-synopsis
name: Not yet effective
code: D1_protocol-synopsis
part: I
version: 2.0
effective: 2099-01-01
use_when: Later.`,'## S01 · Summary\nFill: study')}
]

test('the shipped catalog is valid: naming, default and L1 styling, the K1 form, workflow guides',async()=>{
  const built=await buildCatalog(await readCatalogDir(catalogDir))
  assert.deepEqual(built.errors,[])
  const ids=built.items.map(i=>i.category+'/'+i.id)
  for(const x of ['planning/naming','styling/default','styling/L1_SIS-ICF','styling/K1_recruitment-arrangements_DE'])assert.ok(ids.includes(x),x)
  const layout=built.items.find(i=>i.id==='default')
  assert.deepEqual(layout.tags.map(t=>t.id).sort(),['body','footer','footer_ids','page_label','page_of','subtitle','title'])
  const guides=built.items.filter(i=>i.category==='workflow').flatMap(i=>i.header.applies_to)
  for(const t of ['planning','draft','checklist','qc','style','revision','findings','design'])assert.ok(guides.includes(t),t)
  assert.equal(built.items.find(i=>i.id==='K1_recruitment-arrangements_DE').version,'2.0','versions keep their exact text')
})

test('validation explains what to fix',async()=>{
  const bad=await buildCatalog([...await readCatalogDir(catalogDir),...fixtures,
    {path:'content/broken.md',text:md('id: broken\nname: Broken\ncode: X1_broken\npart: II\nversion: 1\neffective: 2026-01-01\nuse_when: x\nstyling: nowhere','## S01 Title\n## S02 · Ok\nFill: maybe\n## S03 · Std\nFill: standard')},
    {path:'styling/no-file.md',text:md('id: no-file\nname: x\ncode: X1_broken\nkind: layout\nfile: no-file.docx\nversion: 1\neffective: 2026-01-01\nuse_when: x\nslots:\n  - {id: title}')},
    {path:'styling/orphan.md',text:md('id: orphan\nname: x\ncode: X1_broken\nbase: missing-base\nversion: 1\neffective: 2026-01-01\nuse_when: x')},
    {path:'planning/FR.md',text:md('id: FR\nname: France\npart: II\ncountry: FR\nversion: 1\neffective: 2026-01-01\nuse_when: x\ndocuments:\n  - {code: M1_investigator-suitability, name: Investigator, required: always}')},
    {path:'workflow/planning-copy.md',text:md('id: naming\nname: dup\nversion: 1\neffective: 2026-01-01\nuse_when: x\napplies_to: [nowhere]')}])
  const has=re=>assert.ok(bad.errors.some(e=>re.test(e)),'expected an error matching '+re+'\n'+bad.errors.join('\n'))
  has(/broken\.md: Section heading "S01 Title" must look like/)
  has(/broken\.md: S02: Fill must be one of/)
  has(/broken\.md: S03: standard sections need/)
  has(/broken\.md: styling nowhere is not a styling instruction/)
  has(/no-file\.md: missing styling\/no-file\.docx/)
  has(/orphan\.md: base missing-base does not lead to a styling with a \.docx file/)
  has(/applies_to nowhere/)
  has(/id naming is also used by/)
  assert.ok(bad.warnings.some(w=>/FR\.md: no content template yet for M1_investigator-suitability/.test(w)))
})

test('matching by regulatory code, variant and country; styling instructions in two layers',async()=>{
  const built=await buildCatalog([...await readCatalogDir(catalogDir),...fixtures])
  assert.deepEqual(built.errors,[])
  const cat=catalogView({id:1,items:built.items},{today:'2026-11-26'})
  const plan=cat.planning({countries:['DE','ES'],submission_type:'Initial application'})
  assert.deepEqual(plan.checklists.map(i=>i.id),['Part-I','DE']);assert.deepEqual(plan.missing,['ES'])
  assert.deepEqual(plan.checklists[0].documents.map(d=>d.code),['D1_protocol-synopsis','B1_cover-letter'])
  assert.equal(plan.checklists[1].naming,'<study>_<code>_<variant>_DE_de, with the variant in German')
  assert.match(plan.naming.text,/Filename/)
  assert.deepEqual(cat.planning({submission_type:'Substantial modification'}).checklists[0].documents.map(d=>d.code),['D1_protocol-synopsis','B1_cover-letter','B2_modification-description'])
  const de={id:'D04',part:'II',country:'DE',language:'de',code:'L1_SIS-ICF',variant:'adults',catalog:{}}
  const es={...de,id:'D07',country:'ES',language:'es'}
  assert.equal(cat.contentTemplate(de).id,'L1_SIS-ICF_adults_DE')
  assert.equal(cat.contentTemplate(es).id,'L1_SIS-ICF_adults')
  assert.equal(cat.contentTemplate({...es,variant:'minors'}),null,'a variant-specific template does not serve another variant')
  assert.equal(cat.contentTemplate({...de,catalog:{content:'L1_SIS-ICF_adults'}}).id,'L1_SIS-ICF_adults','the plan can pin an item')
  assert.equal(cat.contentTemplate({id:'D01',part:'I',country:'EU',language:'en',code:'D1_protocol-synopsis',variant:'',catalog:{}}),null,'items not yet effective are ignored')
  const sDe=cat.styling(de),sEs=cat.styling(es)
  assert.deepEqual([sDe.item.id,sDe.file.id,sDe.kind],['L1_SIS-ICF_DE','default','layout'])
  assert.deepEqual([sEs.item.id,sEs.file.id],['L1_SIS-ICF','default'])
  const k1={id:'D05',part:'II',country:'DE',language:'de',code:'K1_recruitment-arrangements',variant:'',catalog:{}}
  assert.deepEqual([cat.styling(k1).item.id,cat.styling(k1).kind],['K1_recruitment-arrangements_DE','form'])
  assert.equal(cat.styling({...k1,country:'ES'}).item.id,'default','no Spanish K1 form yet: default styling')
  const draft=cat.forDeliverable(de,'draft',{submission_type:'initial'})
  assert.equal(draft.content_template.id,'L1_SIS-ICF_adults_DE')
  assert.deepEqual(draft.planning_checklist.map(r=>[r.code,r.per,r.from]),[['L1_SIS-ICF','population','DE']])
  assert.deepEqual(draft.styling.instructions.map(x=>[x.from,x.level]),[['design','general'],['default','general'],['L1_SIS-ICF','general'],['L1_SIS-ICF_DE','specific'],['DE','specific']])
  assert.equal(draft.styling.slots,undefined,'slots only come with the Style step')
  assert.ok(cat.forDeliverable(de,'style').styling.slots.some(s=>s.id==='footer'))
  assert.deepEqual(cat.forDeliverable(k1,'style').styling.instructions.map(x=>x.from),['K1_recruitment-arrangements_DE'],'forms get no general design rules')
  assert.equal(cat.forDeliverable(de,'qc').styling,null)
  assert.deepEqual(cat.search({category:'planning',code:'K1_recruitment-arrangements'}).map(i=>i.id),['DE'])
  assert.deepEqual(cat.search({query:'L1',category:'styling'}).map(i=>i.id).sort(),['L1_SIS-ICF','L1_SIS-ICF_DE'])
})

test('publishing is idempotent and a store document resolves its catalog items',async()=>{
  const pg=new PGlite(),db={transaction:fn=>pg.transaction(tx=>fn(async(sql,p)=>(await tx.query(sql,p)).rows))}
  try{
    await pg.exec(await readFile(new URL('../app/server/schema.sql',import.meta.url),'utf8'))
    const built=await buildCatalog([...await readCatalogDir(catalogDir),...fixtures])
    assert.deepEqual(await publishCatalog(db,built,{sha:'abc'}),{release:1,published:true})
    assert.deepEqual(await publishCatalog(db,built,{sha:'abc'}),{release:1,published:false})
    await assert.rejects(publishCatalog(db,{...built,errors:['x']}),/errors/)
    const run=ctis(db),user={id:'u1',email:'u1@example.org'}
    const {project}=await run(user,{op:'project.create',requestId:randomUUID(),input:{code:'EX-101',name:'EX-101',submission_type:'Initial application'}})
    const plan=await run(user,{op:'plan.save',project:project.id,revision:0,requestId:randomUUID(),input:{
      documents:[{id:'D04',name:'SIS and ICF – adults',part:'II',country:'DE',language:'de',code:'L1_SIS-ICF',variant:'adults',filename:'EX101_L1_SIS-ICF_adults_DE_de'}],
      steps:[{type:'draft'},{type:'qc'},{type:'style'}]}})
    const doc=plan.documents[0]
    const cat=await db.transaction(q=>currentCatalog(q,{today:'2026-11-26'}))
    const style=cat.forDeliverable(doc,'style',{submission_type:project.submission_type})
    assert.equal(style.content_template.id,'L1_SIS-ICF_adults_DE')
    assert.equal(style.styling.id,'L1_SIS-ICF_DE');assert.equal(style.styling.file,'default')
    assert.equal(style.planning_checklist[0].from,'DE')
    const file=await db.transaction(q=>catalogFile(q,cat.release,'default'))
    assert.deepEqual((await docxFields(file.buffer)).map(t=>t.id).sort(),['body','footer','footer_ids','page_label','page_of','subtitle','title'])
  }finally{await pg.close()}
})
