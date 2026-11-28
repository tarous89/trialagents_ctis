// Supplied documents and redacted versions for publication (docs/TECHNICAL.md §12).
import {test,before,after} from 'node:test'
import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import {randomUUID} from 'node:crypto'
import {PGlite} from '@electric-sql/pglite'
import {PDFDocument,StandardFonts} from 'pdf-lib'
import JSZip from 'jszip'
import {ctis} from '../app/server/store.mjs'
import {redactDocx,redactPdf,findRanges,prepareTerms,pdfTextLeft,BLOCK} from '../app/server/redact.mjs'

const pg=new PGlite()
const db={transaction:fn=>pg.transaction(tx=>fn(async(sql,p)=>(await tx.query(sql,p)).rows))}
const run=ctis(db)
const owner={id:'u:owner',email:'owner@example.org',firstName:'Alex',lastName:'Morgan'}
let project,revision
const w=(op,input={},extra={})=>({op,project,input,requestId:randomUUID(),revision,...extra})
const r=(op,input={})=>({op,project,input})
const err=(status,re)=>e=>e.status===status&&(!re||re.test(e.message))
const doc=text=>({title:'',sections:[{id:'S01',heading:'',blocks:[{type:'paragraph',text}]}]})

before(async()=>{await pg.exec(await readFile(new URL('../app/server/schema.sql',import.meta.url),'utf8'))})
after(()=>pg.close())

async function protocolPdf(){
  const pdf=await PDFDocument.create();pdf.setAuthor('Jane Doe')
  const font=await pdf.embedFont(StandardFonts.Helvetica)
  const p1=pdf.addPage([595,842])
  p1.drawText('Clinical Study Protocol EX-1, version 3.0',{x:60,y:780,size:16,font})
  p1.drawText('Approved by Dr. Jane Doe, Head of Clinical Development (jane.doe@example.com)',{x:60,y:740,size:10,font})
  const p2=pdf.addPage([595,842]);p2.drawText('5. Study population: adults aged 18 years or older.',{x:60,y:780,size:11,font})
  return Buffer.from(await pdf.save())
}
async function wordFile(paragraphs){
  const zip=new JSZip()
  zip.file('[Content_Types].xml','<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>')
  zip.file('_rels/.rels','<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>')
  zip.file('word/document.xml','<?xml version="1.0" encoding="UTF-8"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'+paragraphs.join('')+'</w:body></w:document>')
  zip.file('docProps/core.xml','<?xml version="1.0" encoding="UTF-8"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:creator>Jane Doe</dc:creator><cp:lastModifiedBy>Jane Doe</cp:lastModifiedBy></cp:coreProperties>')
  return zip.generateAsync({type:'nodebuffer'})
}
const run_=(text,props='')=>'<w:r>'+props+'<w:t xml:space="preserve">'+text+'</w:t></w:r>'

test('matching ignores case and white space, and never starts or ends inside a word',()=>{
  const terms=prepareTerms([{text:'Jane Doe'},{text:'Li'}])
  assert.deepEqual(findRanges('Dr JANE  doe and Jane\nDoe',terms),[[3,12],[17,25]])
  assert.deepEqual(findRanges('Lisbon and Li',terms),[[11,13]],'Li inside Lisbon is not a match')
})

test('Word: a name split over runs, tracked changes and authors, and the file properties are redacted',async()=>{
  const buffer=await wordFile(['<w:p>'+run_('Approved by Ja')+run_('ne Do','<w:rPr><w:b/></w:rPr>')+run_('e.')+'</w:p>',
    '<w:p><w:ins w:id="1" w:author="Jane Doe"><w:r><w:t>Contact jane.doe@example.com</w:t></w:r></w:ins><w:del w:id="2" w:author="Jane Doe"><w:r><w:delText>John Smith</w:delText></w:r></w:del></w:p>'])
  const out=await redactDocx(buffer,[{text:'Jane Doe',category:'name'},{text:'jane.doe@example.com',category:'email'},{text:'John Smith',category:'name'}])
  const zip=await JSZip.loadAsync(out.buffer),xml=await zip.file('word/document.xml').async('string'),core=await zip.file('docProps/core.xml').async('string')
  assert.ok(!/Ja|Doe|Smith|example/.test(xml.replace(/w:author="Author"/g,'')),xml)
  assert.match(xml,new RegExp(BLOCK))
  assert.match(xml,/w:author="Author"/)
  assert.ok(!/Jane/.test(core))
  assert.deepEqual(out.terms.map(t=>t.count),[1,1,1])
})

test('PDF: pages with a match become images with black boxes; other pages keep their text; the check reads the result back',async()=>{
  const out=await redactPdf(await protocolPdf(),[{text:'Jane Doe',category:'name'},{text:'jane.doe@example.com',category:'email'}])
  assert.deepEqual(out.pages,[1])
  assert.deepEqual(await pdfTextLeft(out.buffer,prepareTerms([{text:'Jane Doe'},{text:'jane.doe@example.com'}])),[])
  const pdfjs=await import('pdfjs-dist/legacy/build/pdf.mjs'),d=await pdfjs.getDocument({data:new Uint8Array(out.buffer)}).promise
  assert.equal((await (await d.getPage(1)).getTextContent()).items.length,0,'page 1 is an image')
  assert.match((await (await d.getPage(2)).getTextContent()).items.map(i=>i.str).join(''),/Study population/,'page 2 keeps its text')
  assert.equal((await d.getMetadata()).info.Author,'')
  await d.destroy()
})

test('a supplied document is not drafted and does not hold up the plan; its file is recorded and kept through the Checklist',async()=>{
  project=(await run(owner,{op:'project.create',requestId:randomUUID(),input:{code:'EX-1',name:'EX-1',countries:['DE']}},'Claude')).project.id;revision=0
  const saved=await run(owner,w('plan.save',{documents:[
      {id:'D01',name:'Protocol',part:'I',country:'EU',language:'en',code:'D1_protocol',filename:'EX1_D1_protocol_EU_en',supplied:true},
      {id:'D02',name:'Investigator’s brochure',part:'I',country:'EU',language:'en',code:'E1_IB',filename:'EX1_E1_IB_EU_en',supplied:true},
      {id:'D03',name:'SIS and ICF',part:'II',country:'DE',language:'de',code:'L1_SIS-ICF',variant:'adults',filename:'EX1_L1_SIS-ICF_adults_DE_de'}],
    steps:[{type:'draft'},{type:'checklist'}]}),'Claude')
  revision=saved.project.revision
  assert.deepEqual(saved.documents.map(d=>[d.id,d.published,d.awaiting_file??false,d.redaction.status]),
    [['D01',true,true,'after_approval'],['D02',false,true,'not_published'],['D03',true,false,'after_approval']])
  assert.deepEqual(saved.next,{deliverable:'D03-DR',document:'D03',step:'DR',awaiting_file:['D01','D02']},'Part I supplied documents do not block Part II')
  await assert.rejects(run(owner,w('version.save',{deliverable:'D01-DR',base:0,content:doc('x')}),'Claude'),err(409,/supplied by the sponsor/))
  await assert.rejects(run(owner,w('document.supply',{document:'D03',held_outside:true}),'Claude'),err(409,/not marked as supplied/))

  // The assistant uploads the file the user gave it; the PDF's text becomes the content to check.
  const s=await run(owner,w('document.supply',{document:'D01',file:{name:'EX-1 protocol v3.0.pdf',mime:'application/pdf',content_base64:(await protocolPdf()).toString('base64')},sponsor_version:'3.0'}),'Claude')
  assert.equal(s.deliverable,'D01-DR');assert.equal(s.supplied.name,'EX-1 protocol v3.0.pdf');assert.ok(s.passages>0)
  const plan=await run(owner,r('project.read'))
  const d1=plan.documents.find(d=>d.id==='D01')
  assert.deepEqual(d1.cells[0].supplied,{held_outside:false,name:'EX-1 protocol v3.0.pdf'})
  assert.equal(d1.awaiting_file,undefined)
  const ctx=await run(owner,r('step.context',{deliverable:'D01-CL'}))
  assert.match(JSON.stringify(ctx.input.content),/Study population/)
  assert.match(ctx.output,/do not rewrite it/)
  // The Checklist keeps the supplied file: no content, findings only.
  const cl=await run(owner,w('version.save',{deliverable:'D01-CL',base:0,note:'S01–S07 passed'}),'Claude')
  assert.equal(cl.file,'EX-1 protocol v3.0.pdf')
  const read=await run(owner,r('deliverable.read',{deliverable:'D01-CL'}))
  assert.ok(read.version.file_id);assert.equal(read.version.supplied.sponsor_version,'3.0')
  // Held outside: recorded without a file.
  const h=await run(owner,w('document.supply',{document:'D02',held_outside:true,sponsor_version:'7.0'}),'Claude')
  assert.equal(h.supplied.held_outside,true)
  const after=await run(owner,r('project.read'))
  assert.equal(after.documents.find(d=>d.id==='D02').cells[0].supplied.held_outside,true)
})

test('redacted versions: only from the approved final; PDFs need the user’s choice; a new approval makes it out of date; Download all has both',async()=>{
  await assert.rejects(run(owner,r('redaction.context',{document:'D01'})),err(409,/Approve the final document/))
  await run(owner,w('approval.create',{deliverable:'D01-CL',n:1}),'web')
  let plan=await run(owner,r('project.read'))
  assert.deepEqual(plan.documents.find(d=>d.id==='D01').redaction,{status:'ready',version:1})
  assert.equal(plan.documents.find(d=>d.id==='D01').final.ext,'.pdf')
  const ctx=await run(owner,r('redaction.context',{document:'D01'}))
  assert.equal(ctx.final.file.kind,'pdf');assert.match(ctx.output,/Word version/)
  await assert.rejects(run(owner,r('redaction.context',{document:'D02'})),err(409,/not published/))
  const terms=[{text:'Jane Doe',category:'name'},{text:'jane.doe@example.com',category:'email'},{text:'Nobody Else',category:'name'}]
  await assert.rejects(run(owner,w('redaction.save',{document:'D01',terms}),'Claude'),err(409,/pages_as_images/))
  const red=await run(owner,w('redaction.save',{document:'D01',terms,pdf_method:'pages_as_images'}),'Claude')
  assert.equal(red.method,'pdf_pages_as_images');assert.deepEqual(red.pages_as_images,[1]);assert.deepEqual(red.not_found,['Nobody Else'])
  assert.equal(red.file,'EX1_D1_protocol_EU_en_redacted_v1.pdf')
  plan=await run(owner,r('project.read'))
  assert.equal(plan.documents.find(d=>d.id==='D01').redaction.status,'done')
  const file=await run(owner,r('redaction.file',{document:'D01'}))
  assert.equal(file.mime,'application/pdf')
  // The SIS (content without a Word file): drafted, checked, approved, then redacted as text.
  await run(owner,w('version.save',{deliverable:'D03-DR',base:0,content:doc('Ihre Ansprechpartnerin ist Jane Doe, Tel. 0301234567.')}),'Claude')
  await run(owner,w('version.save',{deliverable:'D03-CL',base:0}),'Claude')
  await run(owner,w('approval.create',{deliverable:'D03-CL',n:1}),'web')
  const t=await run(owner,w('redaction.save',{document:'D03',terms:[{text:'Jane Doe',category:'name'},{text:'0301234567',category:'phone'}]}),'Claude')
  assert.equal(t.method,'text');assert.equal(t.found.length,2)
  const pkg=await run(owner,r('export.package'))
  assert.deepEqual(pkg.files.map(f=>f.name).sort(),['EX1_D1_protocol_EU_en_redacted_v1.pdf','EX1_D1_protocol_EU_en_v1.pdf','EX1_L1_SIS-ICF_adults_DE_de_redacted_v1.txt','EX1_L1_SIS-ICF_adults_DE_de_v1.txt'])
  assert.ok(!Buffer.from(pkg.files.find(f=>f.name.includes('SIS-ICF')&&f.name.includes('redacted')).content_base64,'base64').toString().includes('Jane'))
  // A new supplied version, checked and approved: the redacted version is out of date.
  await run(owner,w('document.supply',{document:'D01',file:{name:'EX-1 protocol v3.1.docx',mime:'',content_base64:(await wordFile(['<w:p>'+run_('Approved by Jane Doe.')+'</w:p>'])).toString('base64')}}),'Claude')
  await run(owner,w('version.save',{deliverable:'D01-CL',base:1}),'Claude')
  await run(owner,w('approval.create',{deliverable:'D01-CL',n:2}),'web')
  plan=await run(owner,r('project.read'))
  assert.deepEqual(plan.documents.find(d=>d.id==='D01').redaction,{status:'outdated',n:1,version:1,file:'EX1_D1_protocol_EU_en_redacted_v1.pdf',mime:'application/pdf',final:2})
  const again=await run(owner,w('redaction.save',{document:'D01',terms:[{text:'Jane Doe',category:'name'}]}),'Claude')
  assert.equal(again.method,'docx');assert.equal(again.file,'EX1_D1_protocol_EU_en_redacted_v2.docx')
  plan=await run(owner,r('project.read'))
  assert.equal(plan.documents.find(d=>d.id==='D01').redaction.status,'done')
})

test('through the MCP tools: supply_document, get_ctis_step with redaction, save_redaction',async()=>{
  const {invoke}=await import('../mcp/tools.mjs')
  const call=async(name,args)=>{const r=await invoke(name,args,req=>run(owner,req,'Claude'));assert.ok(!r.isError,r.content?.[0]?.text);return r.structuredContent.result}
  const p=(await call('save_ctis',{action:'create_project',request_id:randomUUID(),code:'EX-2',name:'EX-2',countries:['DE']})).project.id
  await call('save_ctis',{action:'save_plan',request_id:randomUUID(),project:p,revision:0,steps:[{type:'draft'},{type:'checklist'}],
    documents:[{id:'D01',name:'Protocol synopsis',part:'I',country:'EU',language:'en',code:'D1_protocol-synopsis',filename:'EX2_D1_synopsis_EU_en',supplied:true}]})
  const s=await call('save_ctis',{action:'supply_document',request_id:randomUUID(),project:p,document:'D01',file_name:'synopsis.docx',
    file_base64:(await wordFile(['<w:p>'+run_('Medical monitor: Jane Doe.')+'</w:p>'])).toString('base64')})
  assert.deepEqual(s.open,{view:'plan',project:p,deliverable:'D01-DR'})
  await call('save_ctis',{action:'save_version',request_id:randomUUID(),project:p,deliverable:'D01-CL',base:0})
  await run(owner,{op:'approval.create',project:p,input:{deliverable:'D01-CL',n:1},requestId:randomUUID()},'web')
  const ctx=await call('get_ctis_step',{project:p,redaction:'D01'})
  assert.equal(ctx.final.file.kind,'docx');assert.match(JSON.stringify(ctx.content),/Jane Doe/)
  const red=await call('save_ctis',{action:'save_redaction',request_id:randomUUID(),project:p,document:'D01',terms:[{text:'Jane Doe',category:'name'}]})
  assert.equal(red.found[0].count,1);assert.match(red.next_hint,/Redacted documents column/)
})
