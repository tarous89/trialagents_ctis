import {test,before,after} from 'node:test'
import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import {randomUUID} from 'node:crypto'
import JSZip from 'jszip'
import {PGlite} from '@electric-sql/pglite'
import {ctis} from '../app/server/store.mjs'
import {publishCatalog} from '../app/server/catalog.mjs'
import {loadCoreCatalogDir as loadCatalogDir} from '../app/server/catalog-files.mjs'
import {fillTemplate} from '../app/server/word.mjs'

const pg=new PGlite(),db={transaction:fn=>pg.transaction(tx=>fn(async(sql,p)=>(await tx.query(sql,p)).rows))}
const run=ctis(db),owner={id:'u:o',email:'o@example.org',firstName:'Alex',lastName:'Morgan'}
let project,revision=0
const w=(op,input,extra={})=>({op,project,input,requestId:randomUUID(),revision,...extra})
const r=(op,input={})=>({op,project,input})

// A two-page PDF with real text, written by hand so the tests need no tools.
function pdf(pages){
  const objs=['<< /Type /Catalog /Pages 2 0 R >>',null,'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>']
  const kids=[]
  for(const text of pages){
    const stream='BT /F1 11 Tf 72 720 Td 14 TL '+text.split('\n').map(l=>'('+l.replace(/[()\\]/g,'\\$&')+') Tj T*').join(' ')+' ET'
    objs.push('<< /Length '+stream.length+' >>\nstream\n'+stream+'\nendstream')
    objs.push('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R >> >> /Contents '+objs.length+' 0 R >>')
    kids.push(objs.length+' 0 R')
  }
  objs[1]='<< /Type /Pages /Kids ['+kids.join(' ')+'] /Count '+pages.length+' >>'
  let out='%PDF-1.4\n';const offsets=[]
  objs.forEach((o,i)=>{offsets.push(out.length);out+=(i+1)+' 0 obj\n'+o+'\nendobj\n'})
  const xref=out.length
  out+='xref\n0 '+(objs.length+1)+'\n0000000000 65535 f \n'+offsets.map(o=>String(o).padStart(10,'0')+' 00000 n \n').join('')
  out+='trailer\n<< /Size '+(objs.length+1)+' /Root 1 0 R >>\nstartxref\n'+xref+'\n%%EOF'
  return Buffer.from(out,'latin1')
}

before(async()=>{
  await pg.exec(await readFile(new URL('../app/server/schema.sql',import.meta.url),'utf8'))
  await publishCatalog(db,await loadCatalogDir(fileURLToPath(new URL('../catalog',import.meta.url))))
  const p=await run(owner,{op:'project.create',requestId:randomUUID(),input:{code:'EX-101',name:'EX-101',countries:['DE','ES']}})
  project=p.project.id
  await run(owner,w('plan.save',{documents:[
    {id:'D04',name:'SIS and ICF – adults',part:'II',country:'DE',language:'de',code:'L1_SIS-ICF',variant:'adults',filename:'EX101_L1_SIS-ICF_adults_DE_de'},
    {id:'D05',name:'Recruitment arrangements',part:'II',country:'DE',language:'en',code:'K1_recruitment-arrangements',filename:'EX101_K1_recruitment-arrangements_DE_en'}],
    steps:[{type:'draft'},{type:'style'}]}))
  revision=1
})
after(()=>pg.close())

test('uploads are people-only; PDF and Word sources become searchable passages with page or section',async()=>{
  const protocol=await run(owner,w('resource.record',{category:'source',name:'EX-101 protocol',type:'Protocol',version:'3.0'}),'Claude')
  const manual=await run(owner,w('resource.record',{category:'source',name:'Country manual',type:'Study manual',version:'2.0'}),'Claude')
  const file=pdf(['Synopsis\nThe study enrols adults aged 18 years or older.','Schedule of activities\nThe follow-up visit takes place at week 12.\nTravel expenses are reimbursed up to 50 EUR per visit.'])
  const upload={resource:protocol.resource,name:'protocol.pdf',mime:'application/pdf',content_base64:file.toString('base64')}
  await assert.rejects(run(owner,w('resource.upload',upload),'Claude'),e=>e.status===403)
  const up=await run(owner,w('resource.upload',upload),'web')
  assert.equal(up.passages,2)
  const docx=(await fillTemplate(await readFile(new URL('../catalog/styling/default-layout.docx',import.meta.url)),{kind:'layout',slots:[{id:'body',sections:'all'}],
    content:{title:'Country manual',sections:[{id:'DE',heading:'Germany',blocks:[{type:'paragraph',text:'Documented travel expenses may be reimbursed up to 50 EUR per visit.'}]},
      {id:'ES',heading:'Spain',blocks:[{type:'paragraph',text:'Participants direct questions to the local study team.'}]}]}})).buffer
  await run(owner,w('resource.upload',{resource:manual.resource,name:'manual.docx',mime:'',content_base64:docx.toString('base64')}),'Claude workspace')
  const hit=await run(owner,r('source.search',{query:'travel expenses reimbursed'}))
  assert.deepEqual(hit.passages.map(p=>[p.name,p.locator]).sort((a,b)=>a[0]<b[0]?-1:1),[['Country manual',{section:'Germany'}],['EX-101 protocol',{page:2}]])
  const one=await run(owner,r('source.search',{query:'adults 18',resource:protocol.resource}))
  assert.equal(one.passages[0].locator.page,1);assert.match(one.passages[0].text,/adults aged 18 years/)
  const page=await run(owner,r('source.read',{resource:protocol.resource,from:2,count:1}))
  assert.equal(page.total,2);assert.match(page.passages[0].text,/week 12/)
  await assert.rejects(run(owner,w('resource.upload',{...upload,name:'virus.exe',mime:'application/x-msdownload'}),'web'),/PDF, Word/)
  const {entries}=await run(owner,{op:'logs',input:{limit:5}})
  assert.ok(entries.some(e=>e.action==='resource.uploaded'&&e.source==='Claude workspace'))
})

test('a Style step fills the default layout and reports required fields left empty',async()=>{
  const content={title:'Patienteninformation und Einwilligungserklärung',sections:[{id:'S01',heading:'Einleitung',blocks:[{type:'paragraph',text:'Wir laden Sie ein.'}]}]}
  await run(owner,w('version.save',{deliverable:'D04-DR',base:0,content}),'Claude')
  await assert.rejects(run(owner,w('version.save',{deliverable:'D04-ST',base:0,content,fill:{nonsense:'x'}}),'Claude'),/Unknown Word fields: nonsense/)
  const st=await run(owner,w('version.save',{deliverable:'D04-ST',base:0,content,fill:{subtitle:'Erwachsene',page_label:'Seite ',page_of:' von '}}),'Claude')
  assert.equal(st.file,'EX101_L1_SIS-ICF_adults_DE_de_v1.docx')
  assert.deepEqual(st.findings.map(f=>f.category+':'+f.text.split(':')[0]),['missing:Fill the Word field footer'])
  const f=await run(owner,r('version.file',{deliverable:'D04-ST'}))
  const zip=await JSZip.loadAsync(Buffer.from(f.content_base64,'base64'))
  const text=(await zip.file('word/document.xml').async('string')).replace(/<[^>]+>/g,'')
  assert.match(text,/Patienteninformation und Einwilligungserklärung/);assert.match(text,/Erwachsene/);assert.match(text,/Einleitung/)
  const v=(await run(owner,r('deliverable.read',{deliverable:'D04-ST'}))).version
  assert.deepEqual(v.catalog.map(x=>x.id),['L1_SIS-ICF','default'],'the styling used and the base it took its Word file from')
  // The footer arrives in a revision: the Word finding is closed and the file is rebuilt.
  const fixed=await run(owner,w('version.save',{deliverable:'D04-ST',base:1,content,fill:{subtitle:'Erwachsene',footer:'Patienteninformation - v1.0'}}),'Claude')
  assert.equal(fixed.status.status,'done');assert.equal(fixed.file,'EX101_L1_SIS-ICF_adults_DE_de_v2.docx')
})

test('a Style step fills the authority form, choosing which sections it keeps',async()=>{
  const content={title:'Recruitment arrangements',sections:[{id:'S01',heading:'Recruitment',blocks:[{type:'paragraph',text:'See the form.'}]}]}
  await run(owner,w('version.save',{deliverable:'D05-DR',base:0,content}),'Claude')
  const fill={kv101:'A study of EX-101',kv102:'2026-500123-45-00',date:'15 August 2026',v01100:'From clinic lists.',v01101:'At a routine visit.',v01102:'No advertisement.',v01103:'Not applicable.',
    v01104:'The investigator.',v01105:'None.',v01106:'Written information.',v01107:'Before any procedure.',v01108:'None.',kv108:'false',kv107:'false',kv109:'false',kv110:'false'}
  const st=await run(owner,w('version.save',{deliverable:'D05-ST',base:0,content,fill}),'Claude')
  assert.deepEqual(st.findings,[]);assert.equal(st.status.status,'done')
  const f=await run(owner,r('version.file',{deliverable:'D05-ST'}))
  const xml=await (await JSZip.loadAsync(Buffer.from(f.content_base64,'base64'))).file('word/document.xml').async('string')
  const text=xml.replace(/<[^>]+>/g,'')
  assert.ok(!text.includes('{{'));assert.match(text,/2026-500123-45-00/);assert.match(text,/☒ No, not applicable\. Please continue with section 4\./)
  const v=(await run(owner,r('deliverable.read',{deliverable:'D05-ST'}))).version
  assert.deepEqual(v.catalog,[{id:'K1_recruitment-arrangements_DE',version:'2.0'}])
})
