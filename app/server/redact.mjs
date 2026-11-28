// Redacted documents for publication (docs/TECHNICAL.md §12). Every method removes the text itself, never only covers it:
// - Word (.docx): each matching character is replaced by a solid block (█) in the document, headers, footers, notes and
//   comments; tracked-change and comment authors and the file properties are cleared.
// - PDF: the pages that contain a match are rebuilt as images with black boxes burned in (their text can no longer be
//   copied or searched); every other page is copied unchanged. The file properties are cleared.
// - Content without a file: each matching character in the text is replaced by a block.
// After redacting, the result is read back and refused if any redacted text can still be found.
import JSZip from 'jszip'
import {DOMParser,XMLSerializer} from '@xmldom/xmldom'
import {createRequire} from 'node:module'
import path from 'node:path'

export const BLOCK='█'
const letter=/[\p{L}\p{N}]/u
const squash=s=>s.replace(/\s+/gu,'').toLowerCase()

// Prepared terms: the text as given and its comparison form (no white space, lower case). Shorter than 2 characters is refused.
export function prepareTerms(terms){
  const seen=new Set(),out=[]
  for(const t of terms){
    const key=squash(t.text??'')
    if(key.length<2||seen.has(key))continue
    seen.add(key);out.push({...t,key,count:0})
  }
  return out
}

// Find terms in a string. White space is ignored and case does not matter; a match must not start or end inside a word.
// Returns ranges [start,end) in the original string, merged.
export function findRanges(text,terms,{count=true}={}){
  const map=[];let norm=''
  for(let i=0;i<text.length;i++){const ch=text[i];if(/\s/u.test(ch))continue;norm+=ch.toLowerCase();map.push(i)}
  const ranges=[]
  for(const t of terms){
    let at=norm.indexOf(t.key)
    while(at>=0){
      const start=map[at],end=map[at+t.key.length-1]+1
      const before=text.slice(0,start).match(/[\s\S]$/u)?.[0],after=text.slice(end).match(/^[\s\S]/u)?.[0]
      const edgeIn=letter.test(t.key[0])&&before&&letter.test(before),edgeOut=letter.test(t.key.at(-1))&&after&&letter.test(after)
      if(!edgeIn&&!edgeOut){ranges.push([start,end]);if(count)t.count++}
      at=norm.indexOf(t.key,at+1)
    }
  }
  ranges.sort((a,b)=>a[0]-b[0])
  const merged=[]
  for(const r of ranges){const last=merged.at(-1);if(last&&r[0]<=last[1])last[1]=Math.max(last[1],r[1]);else merged.push([...r])}
  return merged
}
// Terms that can still be found (used to verify a result).
const traces=(text,terms)=>terms.filter(t=>findRanges(text,[t],{count:false}).length).map(t=>t.text)

export function maskString(text,terms){
  const ranges=findRanges(text,terms)
  if(!ranges.length)return text
  let out='',pos=0
  for(const [s,e] of ranges){out+=text.slice(pos,s)+text.slice(s,e).replace(/\S/gu,BLOCK);pos=e}
  return out+text.slice(pos)
}

// ---------- content (no file) ----------
const textKeys=['text','heading','title','caption','alt','label','detail']
function mapStrings(v,fn){
  if(typeof v==='string')return fn(v)
  if(Array.isArray(v))return v.map(x=>mapStrings(x,fn))
  if(v&&typeof v==='object')return Object.fromEntries(Object.entries(v).map(([k,x])=>[k,textKeys.includes(k)||Array.isArray(x)||typeof x==='object'?mapStrings(x,fn):x]))
  return v
}
export function redactContent(content,termList){
  const terms=prepareTerms(termList)
  const out=mapStrings(content,s=>maskString(s,terms))
  const left=[];mapStrings(out,s=>{left.push(...traces(s,terms));return s})
  if(left.length)throw Object.assign(new Error('Redaction check failed: '+[...new Set(left)].join(', ')+' can still be found'),{status:422})
  return {content:out,terms}
}

// ---------- Word ----------
const W='http://schemas.openxmlformats.org/wordprocessingml/2006/main'
const textTags=new Set(['w:t','w:delText','w:instrText'])
function walk(node,fn){for(let c=node.firstChild;c;c=c.nextSibling){fn(c);walk(c,fn)}}

function redactWordXml(xml,terms){
  const doc=new DOMParser().parseFromString(xml,'text/xml')
  let changed=false
  // Paragraph by paragraph, so a name split over several runs is still found.
  const paragraphs=[...doc.getElementsByTagName('w:p')]
  for(const p of paragraphs){
    const all=[];walk(p,n=>{if(n.nodeType===1&&textTags.has(n.nodeName)&&!all.includes(n))all.push(n)})
    // Deleted text (tracked changes) is matched on its own, so it never joins up with the text around it.
    for(const nodes of [all.filter(n=>n.nodeName!=='w:delText'),all.filter(n=>n.nodeName==='w:delText')]){
    if(!nodes.length)continue
    const parts=nodes.map(n=>n.textContent??''),text=parts.join('')
    const ranges=findRanges(text,terms)
    if(!ranges.length)continue
    let offset=0
    for(const [i,n] of nodes.entries()){
      const s=parts[i];let out=''
      for(let k=0;k<s.length;k++){const at=offset+k;out+=ranges.some(([a,b])=>at>=a&&at<b)&&!/\s/u.test(s[k])?BLOCK:s[k]}
      if(out!==s){while(n.firstChild)n.removeChild(n.firstChild);n.appendChild(doc.createTextNode(out));if(/^\s|\s$/.test(out))n.setAttribute('xml:space','preserve');changed=true}
      offset+=s.length
    }
    }
  }
  // People's names in tracked changes and comments, and their sign-in ids.
  walk(doc,n=>{
    if(n.nodeType!==1)return
    for(const a of ['w:author','w:initials'])if(n.hasAttribute?.(a)){n.setAttribute(a,a==='w:author'?'Author':'A');changed=true}
  })
  for(const el of [...doc.getElementsByTagName('w15:presenceInfo')]){el.parentNode.removeChild(el);changed=true}
  return changed?new XMLSerializer().serializeToString(doc):xml
}
function redactPlainXml(xml,terms,clear=[]){
  const doc=new DOMParser().parseFromString(xml,'text/xml')
  let changed=false
  walk(doc,n=>{
    if(n.nodeType===1&&clear.includes(n.nodeName)&&n.textContent){while(n.firstChild)n.removeChild(n.firstChild);changed=true;return}
    if(n.nodeType===3){const t=maskString(n.data,terms);if(t!==n.data){n.data=t;changed=true}}
  })
  return changed?new XMLSerializer().serializeToString(doc):xml
}
async function wordText(zip){
  const out=[]
  for(const name of Object.keys(zip.files).filter(n=>/\.(xml|rels)$/i.test(n))){
    const xml=await zip.file(name).async('string')
    const doc=new DOMParser().parseFromString(xml,'text/xml')
    for(const p of [...doc.getElementsByTagName('w:p')]){let s='',del='';walk(p,n=>{if(n.nodeType===3)(n.parentNode?.nodeName==='w:delText'?del+=n.data:s+=n.data)});out.push(s,del)}
    walk(doc,n=>{if(n.nodeType===3)out.push(n.data);if(n.nodeType===1&&n.attributes)for(let i=0;i<n.attributes.length;i++)out.push(n.attributes[i].value)})
  }
  return out
}
export async function redactDocx(buffer,termList){
  const terms=prepareTerms(termList)
  let zip
  try{zip=await JSZip.loadAsync(buffer)}catch{throw Object.assign(new Error('The Word file could not be opened. Check that it is a .docx file and not password protected.'),{status:422})}
  check(zip.file('word/document.xml'),'This is not a Word (.docx) document')
  const warnings=[]
  for(const name of Object.keys(zip.files)){
    const f=zip.file(name);if(!f)continue
    if(/^word\/.+\.xml$/i.test(name))zip.file(name,redactWordXml(await f.async('string'),terms))
    else if(name==='docProps/core.xml')zip.file(name,redactPlainXml(await f.async('string'),terms,['dc:creator','cp:lastModifiedBy']))
    else if(name==='docProps/app.xml')zip.file(name,redactPlainXml(await f.async('string'),terms,['Company','Manager']))
    else if(/^(docProps\/custom|customXml\/.+)\.xml$/i.test(name))zip.file(name,redactPlainXml(await f.async('string'),terms))
  }
  if(Object.keys(zip.files).some(n=>/^word\/media\//i.test(n)))warnings.push('The document contains images. Images are not checked: look at logos, signatures, photos and scanned pages yourself.')
  const out=await zip.generateAsync({type:'nodebuffer',compression:'DEFLATE'})
  const left=new Set();for(const s of await wordText(await JSZip.loadAsync(out)))for(const x of traces(s,terms))left.add(x)
  if(left.size)throw Object.assign(new Error('Redaction check failed: '+[...left].join(', ')+' can still be found in the Word file'),{status:422})
  return {buffer:out,terms,warnings,pages:[]}
}

// ---------- PDF ----------
let pdfjsLib
const pdfjs=async()=>pdfjsLib??=await import('pdfjs-dist/legacy/build/pdf.mjs')
// Rendering in Node needs pdf.js's own standard fonts and character maps (for PDFs that do not embed their fonts).
const pdfjsDir=path.dirname(createRequire(import.meta.url).resolve('pdfjs-dist/package.json'))+path.sep
const openPdf=async data=>(await pdfjs()).getDocument({data:new Uint8Array(data),useSystemFonts:false,isEvalSupported:false,disableFontFace:true,verbosity:0,
  standardFontDataUrl:pdfjsDir+'standard_fonts'+path.sep,cMapUrl:pdfjsDir+'cmaps'+path.sep,cMapPacked:true}).promise

// The characters of a page in reading order, each pointing back to its text item; a virtual space between items.
function pageChars(items){
  let text='';const where=[]
  items.forEach((it,i)=>{
    for(let k=0;k<it.str.length;k++){text+=it.str[k];where.push({item:i,k})}
    text+=it.hasEOL?'\n':' ';where.push(null)
  })
  return {text,where}
}
// The box (user space) covering characters k0..k1 of a text item. Positions inside the item come from the measured
// width of the text before them in serif, sans-serif and monospace fonts and by character count (the widest span), plus a margin
// of a third of the character height on each side for the difference to the real font. Covering a little more is safe; less is not.
// The canvas library is native code: load it at run time, as pdf.js does, so a bundler never tries to pack it.
const nativeCanvas=()=>process.getBuiltinModule('module').createRequire(import.meta.url)('@napi-rs/canvas')
let measureCtx
async function measurer(){
  if(!measureCtx){const {createCanvas}=nativeCanvas();measureCtx=createCanvas(10,10).getContext('2d')}
  return measureCtx
}
function fraction(ctx,family,str,k){
  if(!str.length)return 0
  ctx.font='100px '+family
  const all=ctx.measureText(str).width
  return all>0?ctx.measureText(str.slice(0,k)).width/all:k/str.length
}
function itemBox(ctx,it,family,k0,k1){
  const [a,b,c,d,e,f]=it.transform,size=Math.hypot(c,d)||it.height||10
  const pad=size*0.5
  if(Math.abs(b)<1e-6&&Math.abs(c)<1e-6){
    // The detected family may be wrong (a PDF's font names vary), so cover what each of the three would give.
    const families=[...new Set([family,'serif','sans-serif','monospace'])]
    // Character counts are exact for monospace text (the server may have no monospace font to measure with).
    const len=it.str.length||1
    const x0=e+it.width*Math.min(k0/len,...families.map(fm=>fraction(ctx,fm,it.str,k0)))
    const x1=e+it.width*Math.max((k1+1)/len,...families.map(fm=>fraction(ctx,fm,it.str,k1+1)))
    return [x0-pad*0.6,f-size*0.35,x1+pad*0.6,f+size*1.1]
  }
  // Rotated or skewed text: cover the whole item.
  const ux=a/(Math.hypot(a,b)||1),uy=b/(Math.hypot(a,b)||1),vx=-uy,vy=ux
  const pts=[[0,-0.35],[it.width,-0.35],[0,1.1],[it.width,1.1]].map(([s,t])=>[e+ux*s+vx*t*size,f+uy*s+vy*t*size])
  const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1])
  return [Math.min(...xs)-pad,Math.min(...ys)-pad,Math.max(...xs)+pad,Math.max(...ys)+pad]
}
async function pdfMatches(doc,terms){
  const pages=[]
  for(let i=1;i<=doc.numPages;i++){
    const page=await doc.getPage(i),tc=await page.getTextContent(),ctx=await measurer()
    const {text,where}=pageChars(tc.items)
    const boxes=[]
    const family=it=>({serif:'serif',monospace:'monospace'})[tc.styles[it.fontName]?.fontFamily]??'sans-serif'
    for(const [s,e] of findRanges(text,terms)){
      const byItem=new Map()
      for(let k=s;k<e;k++){const w=where[k];if(!w)continue;const r=byItem.get(w.item)??[w.k,w.k];r[0]=Math.min(r[0],w.k);r[1]=Math.max(r[1],w.k);byItem.set(w.item,r)}
      for(const [item,[k0,k1]] of byItem)boxes.push(itemBox(ctx,tc.items[item],family(tc.items[item]),k0,k1))
    }
    // Comments and other annotations with a match: the page is rebuilt too, without its annotations.
    const notes=(await page.getAnnotations()).map(a=>[a.contentsObj?.str,a.titleObj?.str,a.fieldValue].filter(x=>typeof x==='string').join(' ')).join('\n')
    const inNotes=findRanges(notes,terms).length>0
    if(boxes.length||inNotes)pages.push({index:i,boxes})
  }
  return pages
}
async function renderPage(doc,index,boxes){
  const {createCanvas}=nativeCanvas()
  const page=await doc.getPage(index),scale=2,viewport=page.getViewport({scale}),base=page.getViewport({scale:1})
  const canvas=createCanvas(Math.ceil(viewport.width),Math.ceil(viewport.height)),ctx=canvas.getContext('2d')
  ctx.fillStyle='#ffffff';ctx.fillRect(0,0,canvas.width,canvas.height)
  const lib=await pdfjs()
  await page.render({canvasContext:ctx,viewport,annotationMode:lib.AnnotationMode.DISABLE}).promise
  ctx.fillStyle='#000000'
  for(const b of boxes){const [x0,y0,x1,y1]=viewport.convertToViewportRectangle(b);ctx.fillRect(Math.min(x0,x1),Math.min(y0,y1),Math.abs(x1-x0),Math.abs(y1-y0))}
  return {png:await canvas.encode('png'),width:base.width,height:base.height}
}
export async function pdfTextLeft(buffer,terms){
  const doc=await openPdf(buffer),left=new Set()
  for(let i=1;i<=doc.numPages;i++){
    const page=await doc.getPage(i),tc=await page.getTextContent()
    for(const x of traces(tc.items.map(it=>it.str).join(' '),terms))left.add(x)
    const notes=(await page.getAnnotations()).map(a=>[a.contentsObj?.str,a.titleObj?.str,a.fieldValue].filter(x=>typeof x==='string').join(' ')).join(' ')
    for(const x of traces(notes,terms))left.add(x)
  }
  await doc.destroy()
  return [...left]
}
export async function redactPdf(buffer,termList,{title=''}={}){
  const {PDFDocument}=await import('pdf-lib')
  const terms=prepareTerms(termList)
  let doc
  try{doc=await openPdf(buffer)}catch(e){throw Object.assign(new Error(/password/i.test(e?.name+e?.message)?'The PDF is password protected. Ask for an unprotected file or the Word version.':'The PDF could not be opened.'),{status:422})}
  const affected=await pdfMatches(doc,terms)
  let source
  try{source=await PDFDocument.load(buffer,{updateMetadata:false})}
  catch{await doc.destroy();throw Object.assign(new Error('The PDF could not be rebuilt (it may be encrypted). Ask for the Word version or an unprotected PDF.'),{status:422})}
  const out=await PDFDocument.create({updateMetadata:false})
  const byIndex=new Map(affected.map(p=>[p.index,p]))
  for(let i=1;i<=doc.numPages;i++){
    const hit=byIndex.get(i)
    if(!hit){const [copy]=await out.copyPages(source,[i-1]);out.addPage(copy);continue}
    const r=await renderPage(doc,i,hit.boxes),img=await out.embedPng(r.png)
    const page=out.addPage([r.width,r.height]);page.drawImage(img,{x:0,y:0,width:r.width,height:r.height})
  }
  await doc.destroy()
  // Only the file properties set here: no author, no editing software, no dates of the original.
  out.setTitle(title);out.setAuthor('');out.setSubject('');out.setKeywords([]);out.setCreator('TrialAgents CTIS');out.setProducer('TrialAgents CTIS')
  const now=new Date();out.setCreationDate(now);out.setModificationDate(now)
  const result=Buffer.from(await out.save())
  const left=await pdfTextLeft(result,terms)
  if(left.length)throw Object.assign(new Error('Redaction check failed: '+left.join(', ')+' can still be found in the PDF'),{status:422})
  const warnings=affected.length?['Pages '+affected.map(p=>p.index).join(', ')+' were turned into images: their text can no longer be copied or searched.']:[]
  if(!(await pdfHasText(buffer)))warnings.push('No text was found in the PDF (it may be a scan): nothing could be found to redact. Ask for the Word version.')
  return {buffer:result,terms,warnings,pages:affected.map(p=>p.index)}
}
async function pdfHasText(buffer){
  const doc=await openPdf(buffer)
  try{for(let i=1;i<=doc.numPages;i++){const tc=await (await doc.getPage(i)).getTextContent();if(tc.items.some(it=>it.str.trim()))return true}return false}
  finally{await doc.destroy()}
}

function check(ok,message){if(!ok)throw Object.assign(new Error(message),{status:422})}
