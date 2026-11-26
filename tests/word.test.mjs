import {test} from 'node:test'
import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import JSZip from 'jszip'
import {templateFields,fillTemplate,evaluateCondition} from '../app/server/word.mjs'
import {frontMatter} from '../app/server/catalog.mjs'

const file=name=>readFile(new URL('../catalog/word/'+name,import.meta.url))
const header=async name=>frontMatter(await readFile(new URL('../catalog/word/'+name,import.meta.url),'utf8')).header
const xmlOf=async(buffer,part='word/document.xml')=>(await JSZip.loadAsync(buffer)).file(part).async('string')
const textOf=xml=>[...xml.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)].map(m=>m[1]).join('')
const count=(s,re)=>(s.match(re)||[]).length

test('the recruitment form: every coded field and condition is found, including codes Word split across runs',async()=>{
  const fields=await templateFields(await file('recruitment-consent-procedure-de.docx'))
  const codes=fields.filter(f=>f.kinds.includes('code')).map(f=>f.id)
  assert.equal(codes.length,25)
  assert.ok(['kv101','kv102','date','v01100','v01121'].every(c=>codes.includes(c)))
  assert.deepEqual(fields.filter(f=>f.kinds.includes('condition')).map(f=>[f.id,f.values.sort().join('/')]).sort(),
    [['kv107','false/true'],['kv108','false/true'],['kv109','false/true'],['kv110','false/true']])
})

test('filling the form keeps its design: answers in place, Yes or No ticked, sections switched off show N/A',async()=>{
  const original=await file('recruitment-consent-procedure-de.docx'),h=await header('recruitment-consent-procedure-de.md')
  const values={kv101:'A study of EX-101',kv102:'2026-500123-45-00',date:'15 August 2026',v01100:'Line one\nLine two',v01101:'By the treating physician.',
    kv108:'true',v01109:'ANSWER-3-1',v01110:'ANSWER-3-2',kv107:'false',v01111:'MUST-NOT-APPEAR',kv109:'false',kv110:'false'}
  const r=await fillTemplate(original,{kind:'form',slots:h.slots,values})
  const before=await xmlOf(original),after=await xmlOf(r.buffer),text=textOf(after)
  assert.equal(count(text,/\{\{/g),0,'no codes or markers are left')
  for(const v of ['2026-500123-45-00','A study of EX-101','Version 1.0 / 15 August 2026','ANSWER-3-1','ANSWER-3-2'])assert.ok(text.includes(v),v)
  assert.ok(!text.includes('MUST-NOT-APPEAR'),'answers for a section switched off are dropped')
  assert.match(after,/<w:t[^>]*>Line one<\/w:t><w:br\/><w:t[^>]*>Line two<\/w:t>/,'multi-line answers become line breaks')
  assert.match(text,/☒ Yes, please fill in the requested information in section 3\./)
  assert.match(text,/☒ No, not applicable\. Please continue with section 5\./)
  assert.equal(count(after,/<w:tbl>/g),count(before,/<w:tbl>/g),'no table is added or removed')
  const [s1,s2]=await Promise.all([original,r.buffer].map(async b=>(await JSZip.loadAsync(b)).file('word/styles.xml').async('string')))
  assert.equal(s1,s2,'styles are untouched')
  assert.deepEqual(r.missing.sort(),['v01102','v01103','v01104','v01105','v01106','v01107','v01108'],'required answers left empty are reported')
})

test('conditions: && binds tighter than ||; unknown values are false; regions must be closed',async()=>{
  assert.equal(evaluateCondition('a === "1" && b === "2" || c === "3"',{a:'1',b:'x',c:'3'}),true)
  assert.equal(evaluateCondition('a === "1" && b === "2"',{a:'1'}),false)
  assert.equal(evaluateCondition('flag === "true"',{flag:true}),true)
  const zip=new JSZip()
  zip.file('word/document.xml','<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:t>{{#a === "1"}}x</w:t></w:r></w:p></w:body></w:document>')
  await assert.rejects(fillTemplate(await zip.generateAsync({type:'nodebuffer'}),{kind:'form',values:{a:'1'}}),/not closed/)
})

test('the default layout: content in the template styles, slots unwrapped, inline marks, lists, tables, timeline and footer',async()=>{
  const h=await header('default-layout.md')
  const content={title:'Hoja de información',sections:[
    {id:'S00',heading:'',blocks:[{type:'table',style:'info',header:false,rows:[['Título del estudio','[[no facilitado]]']]}]},
    {id:'S01',heading:'Introducción',blocks:[{type:'paragraph',text:'Lea **con atención** y __decida__.'},{type:'list',style:'number',items:['a','b']},{type:'list',style:'number',items:['c']},
      {type:'table',rows:[['Visita','Semana'],['Basal','0']]},{type:'timeline',items:[{label:'Semana 0'},{label:'Semana 12'}]},{type:'note',tone:'warning',text:'Aviso'}]}]}
  const r=await fillTemplate(await file('default-layout.docx'),{kind:'layout',slots:h.slots,content,values:{footer:'Hoja - v1.0',page_label:'Página ',page_of:' de '}})
  const doc=await xmlOf(r.buffer),foot=await xmlOf(r.buffer,'word/footer1.xml'),numbering=await xmlOf(r.buffer,'word/numbering.xml')
  assert.equal(count(doc,/<w:sdt>/g),0,'filled slots are unwrapped and the empty subtitle is removed')
  assert.match(doc,/<w:pStyle w:val="Title"\/><\/w:pPr><w:r>(<w:rPr\/>)?<w:t[^>]*>Hoja de información/)
  assert.match(doc,/<w:pStyle w:val="Heading1"\/>.*Introducción/)
  assert.match(doc,/<w:b\/><w:bCs\/><\/w:rPr><w:t[^>]*>con atención/)
  assert.match(doc,/<w:u w:val="single"\/><\/w:rPr><w:t[^>]*>decida/)
  assert.match(doc,/<w:highlight w:val="cyan"\/><\/w:rPr><w:t[^>]*>\[no facilitado\]/)
  assert.match(doc,/<w:tblStyle w:val="CtisInfoTable"\/>/);assert.match(doc,/<w:tblStyle w:val="CtisTable"\/>/)
  assert.equal(count(numbering,/<w:startOverride w:val="1"\/>/g),2,'each numbered list restarts at 1')
  assert.match(doc,/<w:pStyle w:val="NoteWarning"\/>/)
  assert.match(doc,/Semana 0.*→.*Semana 12/)
  assert.ok(textOf(foot).includes('Página 1 de 1'),'page words in the document language')
  assert.ok(!textOf(foot).includes('{{'))
  assert.deepEqual(r.missing,[])
})

test('images from stored files and tagged checkboxes',async()=>{
  // 1×1 PNG
  const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==','base64')
  const h=await header('default-layout.md')
  const r=await fillTemplate(await file('default-layout.docx'),{kind:'layout',slots:h.slots,values:{footer:'x'},
    content:{title:'T',sections:[{id:'S01',heading:'Figure',blocks:[{type:'image',file:'00000000-0000-4000-8000-000000000001',caption:'Visit schedule'}]}]},
    files:async id=>id.endsWith('1')?{buffer:png}:null})
  const zip=await JSZip.loadAsync(r.buffer)
  assert.ok(zip.file('word/media/ctis-image-1.png'))
  assert.match(await zip.file('word/_rels/document.xml.rels').async('string'),/media\/ctis-image-1\.png/)
  assert.match(await zip.file('word/document.xml').async('string'),/<a:blip r:embed="rIdCtisImg1"\/>/)
  const box=new JSZip()
  box.file('word/document.xml','<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml"><w:body><w:p><w:sdt><w:sdtPr><w:tag w:val="adults"/><w14:checkbox><w14:checked w14:val="0"/></w14:checkbox></w:sdtPr><w:sdtContent><w:r><w:t>☐</w:t></w:r></w:sdtContent></w:sdt><w:r><w:t> Adults</w:t></w:r></w:p></w:body></w:document>')
  const fields=await templateFields(await box.generateAsync({type:'nodebuffer'}))
  assert.deepEqual(fields.map(f=>[f.id,f.kinds[0]]),[['adults','checkbox']])
  const ticked=await fillTemplate(await box.generateAsync({type:'nodebuffer'}),{kind:'form',slots:[{id:'adults',accepts:'checkbox'}],values:{adults:true}})
  const xml=await xmlOf(ticked.buffer)
  assert.match(xml,/w14:checked w14:val="1"/);assert.match(xml,/☒/)
})
