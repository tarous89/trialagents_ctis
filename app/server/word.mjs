// Fill Word templates (docs/MCP.md §8). The assistant decides the content; this module writes the .docx.
// Supports two kinds of fields, so existing templates work unchanged:
//  - coded fields: {{code}} placeholders and {{#code === "value" && …}} … {{/}} conditional regions (the earlier CTIS app's convention)
//  - Word content controls tagged with a slot id (text, blocks or a checkbox)
// Layout templates receive content blocks (headings, paragraphs, lists, tables, notes, timelines, images) in the template's own styles.
// Forms are never restyled: only fields, checkboxes and conditional regions change.
import JSZip from 'jszip'
import {DOMParser,XMLSerializer} from '@xmldom/xmldom'

const W='http://schemas.openxmlformats.org/wordprocessingml/2006/main'
const W14='http://schemas.microsoft.com/office/word/2010/wordml'
const R='http://schemas.openxmlformats.org/officeDocument/2006/relationships'
const PARTS=/^word\/(document|header\d*|footer\d*)\.xml$/
const CODE=/\{\{\s*([A-Za-z][A-Za-z0-9_]*)\s*\}\}/g
const MARKER=/\{\{(#[^}]*|\/)\}\}/g
const ANY=/\{\{[^{}]*\}\}/g

const els=(node,name)=>Array.from(node.getElementsByTagNameNS(W,name))
const kids=(node,name)=>Array.from(node.childNodes).filter(c=>c.nodeType===1&&(!name||c.localName===name))
const wAttr=(el,name)=>el?.getAttributeNS(W,name)??el?.getAttribute('w:'+name)
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
const parseXml=s=>new DOMParser().parseFromString(s,'text/xml')
const ser=d=>new XMLSerializer().serializeToString(d)

async function openDocx(buffer){
  const zip=await JSZip.loadAsync(buffer)
  if(!zip.file('word/document.xml'))throw new Error('not a Word document')
  const parts={}
  for(const name of Object.keys(zip.files).filter(n=>PARTS.test(n)))parts[name]=parseXml(await zip.file(name).async('string'))
  return {zip,parts}
}

// ---------- reading ----------
// Merge {{…}} that Word split across runs, so each sits inside one w:t (keeps the first run's formatting).
export function normalizeMarkers(doc){
  for(const p of els(doc,'p')){
    const ts=els(p,'t');if(ts.length<2)continue
    let flat='';const at=[]
    for(const t of ts){at.push(flat.length);flat+=t.textContent}
    if(!flat.includes('{{'))continue
    const matches=[...flat.matchAll(ANY)].reverse()
    for(const m of matches){
      const s=m.index,e=s+m[0].length
      const a=at.findLastIndex(x=>x<=s),b=at.findLastIndex(x=>x<e)
      if(a===b)continue
      const ta=ts[a],tb=ts[b]
      setText(ta,ta.textContent.slice(0,s-at[a])+m[0]+'')
      for(let k=a+1;k<b;k++)setText(ts[k],'')
      setText(tb,tb.textContent.slice(e-at[b]))
      // The rest of A after the marker moved into the marker itself; keep text after it that was in A.
    }
  }
}
function setText(t,text){t.textContent=text;t.setAttribute('xml:space','preserve')}

// Every place a template can be filled: tags, codes, conditional variables (with tested values) and checkboxes.
export async function templateFields(buffer){
  const {parts}=await openDocx(buffer)
  const fields=new Map()
  const add=(id,kind,part,extra={})=>{const f=fields.get(id)??{id,kinds:new Set(),parts:new Set(),values:new Set()};f.kinds.add(kind);f.parts.add(part);for(const v of extra.values??[])f.values.add(v);fields.set(id,f)}
  for(const [name,doc] of Object.entries(parts)){
    const part=name.slice(5,-4).replace(/\d+$/,'')
    normalizeMarkers(doc)
    for(const sdt of els(doc,'sdt')){
      const pr=kids(sdt,'sdtPr')[0],tag=wAttr(pr&&kids(pr,'tag')[0],'val')
      const box=pr&&pr.getElementsByTagNameNS(W14,'checkbox').length
      if(tag)add(tag,box?'checkbox':'tag',part)
    }
    const text=els(doc,'t').map(t=>t.textContent).join('')
    for(const m of text.matchAll(CODE))add(m[1],'code',part)
    for(const m of text.matchAll(/\{\{#([^}]*)\}\}/g))for(const c of conditionTerms(m[1]))add(c.name,'condition',part,{values:[c.value]})
  }
  return [...fields.values()].map(f=>({id:f.id,kinds:[...f.kinds],parts:[...f.parts],values:[...f.values]}))
}

// ---------- conditions ----------
function conditionTerms(expr){
  return expr.split(/&&|\|\|/).map(t=>/^\s*([A-Za-z][A-Za-z0-9_]*)\s*===\s*"([^"]*)"\s*$/.exec(t)).map(m=>m?{name:m[1],value:m[2]}:{invalid:true})
}
export function evaluateCondition(expr,values){
  return expr.split('||').some(any=>any.split('&&').every(term=>{
    const m=/^\s*([A-Za-z][A-Za-z0-9_]*)\s*===\s*"([^"]*)"\s*$/.exec(term)
    if(!m)throw new Error('Cannot read the condition {{#'+expr+'}}')
    return values[m[1]]!==undefined&&String(values[m[1]])===m[2]
  }))
}

// Keep or drop {{#cond}}…{{/}} regions. Regions may span runs, paragraphs and table rows.
const REMOVABLE=new Set(['p','tbl','tr','r','sdt','hyperlink','ins','smartTag','proofErr'])
function applyConditions(doc,values){
  const stack=[],active=()=>stack.every(Boolean)
  const markerParas=new Set()
  function walk(node){
    let sawMarker=false,wasActive=active(),allInactive=!wasActive
    for(const child of kids(node)){
      if(child.localName==='t'){
        const text=child.textContent
        if(!/\{\{(#|\/)/.test(text)){if(!active())setText(child,'');else allInactive=false;continue}
        sawMarker=true;let out='',last=0
        for(const m of text.matchAll(MARKER)){
          if(active())out+=text.slice(last,m.index)
          if(m[1]==='/'){if(!stack.length)throw new Error('{{/}} without a matching {{#…}}');stack.pop()}
          else stack.push(evaluateCondition(m[1].slice(1),values))
          last=m.index+m[0].length
        }
        if(active())out+=text.slice(last)
        setText(child,out);if(out)allInactive=false
        continue
      }
      if(['pPr','rPr','tblPr','trPr','tcPr','sectPr','sdtPr','tblGrid'].includes(child.localName))continue
      const r=walk(child)
      if(r.sawMarker)sawMarker=true
      if(!r.sawMarker&&r.allInactive&&REMOVABLE.has(child.localName))node.removeChild(child)
      else if(!r.allInactive)allInactive=false
      if(child.localName==='p'&&r.sawMarker&&child.parentNode)markerParas.add(child)
    }
    return {sawMarker,allInactive:allInactive&&!active()}
  }
  const body=els(doc,'body')[0]??doc.documentElement
  walk(body)
  if(stack.length)throw new Error('A {{#…}} region is not closed with {{/}}')
  // Paragraphs that held only markers disappear.
  for(const p of markerParas){
    const hasContent=els(p,'t').some(t=>t.textContent)||els(p,'drawing').length||els(p,'sdt').length||els(p,'br').length
    if(!hasContent&&p.parentNode&&!(p.parentNode.localName==='tc'&&kids(p.parentNode,'p').length===1))p.parentNode.removeChild(p)
  }
  // Every table cell keeps a paragraph; tables without rows go.
  for(const tc of els(doc,'tc'))if(!kids(tc,'p').length&&!kids(tc,'tbl').length)tc.appendChild(doc.createElementNS(W,'w:p'))
  for(const tbl of els(doc,'tbl'))if(!kids(tbl,'tr').length)tbl.parentNode.removeChild(tbl)
}

// ---------- writing text ----------
// Inline marks: **bold**, *italic*, __underline__, [[missing information]].
export function inlineRuns(text,{baseRPr='',missing='cyan'}={}){
  const out=[],re=/(\*\*[^*]+\*\*|__[^_]+__|\*[^*\s][^*]*\*|\[\[[^\]]+\]\])/g
  let last=0
  const run=(t,extra='')=>{
    const rpr=baseRPr.replace(/^<w:rPr[^>]*\/>$|^<w:rPr[^>]*>|<\/w:rPr>$/g,'')+extra
    const lines=t.split('\n').map(l=>'<w:t xml:space="preserve">'+esc(l)+'</w:t>').join('<w:br/>')
    out.push('<w:r>'+(rpr?'<w:rPr>'+rpr+'</w:rPr>':'')+lines+'</w:r>')
  }
  for(const m of text.matchAll(re)){
    if(m.index>last)run(text.slice(last,m.index))
    const t=m[0]
    if(t.startsWith('**'))run(t.slice(2,-2),'<w:b/><w:bCs/>')
    else if(t.startsWith('__'))run(t.slice(2,-2),'<w:u w:val="single"/>')
    else if(t.startsWith('[['))run('['+t.slice(2,-2)+']',`<w:highlight w:val="${missing}"/>`)
    else run(t.slice(1,-1),'<w:i/><w:iCs/>')
    last=m.index+t.length
  }
  if(last<text.length||!out.length)run(text.slice(last))
  return out.join('')
}
const nodesFrom=(doc,xml)=>Array.from(parseXml('<root xmlns:w="'+W+'" xmlns:r="'+R+'" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">'+xml+'</root>').documentElement.childNodes).map(n=>doc.importNode(n,true))

// Replace {{code}} inside its w:t, keeping the run's formatting. Multi-line values become line breaks.
function replaceCodes(doc,values,used){
  for(const t of els(doc,'t')){
    const text=t.textContent;if(!/\{\{\s*[A-Za-z]/.test(text))continue
    const run=t.parentNode,rPr=kids(run,'rPr')[0],base=rPr?ser(rPr):''
    const pieces=[];let last=0
    for(const m of text.matchAll(CODE)){
      pieces.push({text:text.slice(last,m.index)})
      used.add(m[1]);const v=values[m[1]]
      pieces.push({text:v===undefined||v===null?'':String(v),value:true})
      last=m.index+m[0].length
    }
    pieces.push({text:text.slice(last)})
    const xml=pieces.filter(p=>p.text).map(p=>p.value?inlineRuns(p.text,{baseRPr:base}):'<w:r>'+base+'<w:t xml:space="preserve">'+esc(p.text)+'</w:t></w:r>').join('')
    // Split the run around t: the run keeps what came before, then the replacement, then a copy of the run for what came after.
    const parent=run.parentNode,after=doc.createElementNS(W,'w:r')
    if(rPr)after.appendChild(rPr.cloneNode(true))
    let n=t.nextSibling;while(n){const next=n.nextSibling;after.appendChild(n);n=next}
    run.removeChild(t)
    const ref=run.nextSibling
    for(const node of nodesFrom(doc,xml))parent.insertBefore(node,ref)
    if(kids(after).some(c=>c.localName!=='rPr'))parent.insertBefore(after,ref)
    if(!kids(run).some(c=>c.localName!=='rPr'))parent.removeChild(run)
  }
}

// ---------- content controls ----------
function fillControls(doc,values,used,{kind,blocksFor,unwrap}){
  for(const sdt of els(doc,'sdt')){
    if(!sdt.parentNode)continue
    const pr=kids(sdt,'sdtPr')[0],tag=wAttr(pr&&kids(pr,'tag')[0],'val');if(!tag)continue
    const content=kids(sdt,'sdtContent')[0];if(!content)continue
    const box=pr.getElementsByTagNameNS(W14,'checkbox')[0]
    if(box){
      if(values[tag]===undefined)continue
      used.add(tag)
      const on=values[tag]===true||/^(true|yes|1|x)$/i.test(String(values[tag]))
      const checked=box.getElementsByTagNameNS(W14,'checked')[0];checked?.setAttributeNS(W14,'w14:val',on?'1':'0')
      const t=els(content,'t')[0];if(t)setText(t,on?'☒':'☐')
      continue
    }
    const blocks=blocksFor(tag)
    const v=values[tag]
    if(blocks===null&&(v===undefined||v===null||v==='')){
      if(kind==='layout'&&unwrap)sdt.parentNode.removeChild(sdt) // optional layout slot left empty
      continue
    }
    used.add(tag)
    for(const p of kids(pr,'showingPlcHdr'))pr.removeChild(p)
    const blockLevel=kids(content).some(c=>['p','tbl'].includes(c.localName))
    const firstP=els(content,'p')[0],pPr=firstP&&kids(firstP,'pPr')[0]
    const firstR=els(content,'r')[0],rPr=firstR&&kids(firstR,'rPr')[0]
    const baseRPr=rPr?ser(rPr).replace(/<w:rStyle w:val="PlaceholderText"\/>/,''):''
    let xml
    if(blocks!==null)xml=blocks
    else if(blockLevel)xml=String(v).split(/\n{2,}/).map(par=>'<w:p>'+(pPr?ser(pPr):'')+inlineRuns(par,{baseRPr})+'</w:p>').join('')
    else xml=inlineRuns(String(v),{baseRPr})
    while(content.firstChild)content.removeChild(content.firstChild)
    for(const n of nodesFrom(doc,xml))content.appendChild(n)
    if(unwrap){const parent=sdt.parentNode;for(const n of Array.from(content.childNodes))parent.insertBefore(n,sdt);parent.removeChild(sdt)}
  }
}

// ---------- blocks to OOXML (layouts) ----------
function styleIds(stylesXml){
  const doc=parseXml(stylesXml),ids={}
  for(const s of els(doc,'style')){const name=wAttr(kids(s,'name')[0],'val')?.toLowerCase();if(name)ids[name]=wAttr(s,'styleId')}
  return ids
}
function blockWriter({styles,numbering,images}){
  const st=n=>styles[n]
  const pStyle=n=>st(n)?'<w:pPr><w:pStyle w:val="'+st(n)+'"/></w:pPr>':''
  const para=(text,style,{extraPPr=''}={})=>'<w:p><w:pPr>'+(st(style)?'<w:pStyle w:val="'+st(style)+'"/>':'')+extraPPr+'</w:pPr>'+inlineRuns(text,{baseRPr:!st(style)&&/heading/.test(style)?'<w:rPr><w:b/></w:rPr>':''})+'</w:p>'
  const cellP=(text,bold)=>'<w:p><w:pPr><w:spacing w:before="0" w:after="0"/></w:pPr>'+inlineRuns(text,{baseRPr:bold?'<w:rPr><w:b/></w:rPr>':''})+'</w:p>'
  const table=(rows,{header=true,style='standard',caption=''})=>{
    const cols=Math.max(1,...rows.map(r=>r.length)),info=style==='info'
    const widths=info?[45,55]:Array(cols).fill(Math.floor(100/cols))
    const grid=widths.map(w=>'<w:gridCol w:w="'+Math.round(9355*w/100)+'"/>').join('')
    const tblStyle=st(info?'ctis info table':'ctis table')
    const borders=tblStyle?'':'<w:tblBorders>'+['top','left','bottom','right','insideH','insideV'].map(b=>'<w:'+b+' w:val="single" w:sz="4" w:space="0" w:color="000000"/>').join('')+'</w:tblBorders>'
    const look='<w:tblLook w:val="0000" w:firstRow="'+(header&&!info?1:0)+'" w:lastRow="0" w:firstColumn="'+(info?1:0)+'" w:lastColumn="0" w:noHBand="1" w:noVBand="1"/>'
    // Header rows and info labels are also formatted directly, so every viewer shows them (not only Word's table styles).
    const tr=(r,i)=>{const head=i===0&&header&&!info
      return '<w:tr>'+(head?'<w:trPr><w:tblHeader/></w:trPr>':'')+Array.from({length:cols},(_,j)=>'<w:tc><w:tcPr><w:tcW w:w="'+widths[Math.min(j,widths.length-1)]*50+'" w:type="pct"/>'
        +(head?'<w:shd w:val="clear" w:color="auto" w:fill="DCEDFC"/>':'')+'</w:tcPr>'+cellP(r[j]??'',head||(info&&j===0))+'</w:tc>').join('')+'</w:tr>'}
    return '<w:tbl><w:tblPr>'+(tblStyle?'<w:tblStyle w:val="'+tblStyle+'"/>':'')+'<w:tblW w:w="5000" w:type="pct"/>'+borders+look+'</w:tblPr><w:tblGrid>'+grid+'</w:tblGrid>'+rows.map(tr).join('')+'</w:tbl>'
      +(caption?para(caption,'caption'):'<w:p><w:pPr><w:spacing w:before="0" w:after="120"/></w:pPr></w:p>')
  }
  const timeline=items=>{
    const cells=[];items.forEach((it,i)=>{
      if(i)cells.push('<w:tc><w:tcPr><w:tcW w:w="300" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:spacing w:before="0" w:after="0"/><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:b/><w:color w:val="034B8A"/><w:sz w:val="28"/></w:rPr><w:t>→</w:t></w:r></w:p></w:tc>')
      cells.push('<w:tc><w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="DCEDFC"/><w:tcMar><w:top w:w="113" w:type="dxa"/><w:left w:w="113" w:type="dxa"/><w:bottom w:w="113" w:type="dxa"/><w:right w:w="113" w:type="dxa"/></w:tcMar><w:vAlign w:val="center"/></w:tcPr>'
        +'<w:p><w:pPr><w:spacing w:before="0" w:after="0"/><w:jc w:val="center"/></w:pPr>'+inlineRuns(it.label,{baseRPr:'<w:rPr><w:b/><w:color w:val="034B8A"/></w:rPr>'})+'</w:p>'
        +(it.detail?'<w:p><w:pPr><w:spacing w:before="40" w:after="0"/><w:jc w:val="center"/></w:pPr>'+inlineRuns(it.detail,{baseRPr:'<w:rPr><w:sz w:val="20"/></w:rPr>'})+'</w:p>':'')+'</w:tc>')
    })
    return '<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/><w:tblLook w:val="0000"/></w:tblPr><w:tblGrid>'+cells.map(()=>'<w:gridCol/>').join('')+'</w:tblGrid><w:tr><w:trPr><w:cantSplit/></w:trPr>'+cells.join('')+'</w:tr></w:tbl>'
  }
  const list=(items,style)=>{
    const sid=st(style==='number'?'list number':'list bullet')
    const num=style==='number'?numbering.restart():null
    return items.map(t=>'<w:p><w:pPr>'+(sid?'<w:pStyle w:val="'+sid+'"/>':'')+(num?'<w:numPr><w:ilvl w:val="0"/><w:numId w:val="'+num+'"/></w:numPr>':'')+'</w:pPr>'+inlineRuns(sid||num?t:(style==='number'?'':'• ')+t)+'</w:p>').join('')
  }
  const note={info:'note info',warning:'note warning',summary:'note summary'}
  const block=(b,level=0)=>{
    switch(b.type){
      case 'heading':return para(b.text,'heading '+Math.min(4,(b.level??1)+level))
      case 'paragraph':return para(b.text,'normal')
      case 'list':return list(b.items,b.style)
      case 'table':return table(b.rows,b)
      case 'note':return para(b.text,note[b.tone]??'note info')
      case 'placeholder':return '<w:p>'+inlineRuns('[['+b.text.replace(/^\[|\]$/g,'')+']]')+'</w:p>'
      case 'page_break':return '<w:p><w:r><w:br w:type="page"/></w:r></w:p>'
      case 'timeline':return timeline(b.items)+'<w:p><w:pPr><w:spacing w:before="0" w:after="120"/></w:pPr></w:p>'+(b.caption?para(b.caption,'caption'):'')
      case 'image':return images.add(b)+(b.caption?para(b.caption,'caption'):'')
      default:return ''
    }
  }
  return {
    section:s=>(s.heading?para(s.heading,'heading 1'):'')+s.blocks.map(b=>block(b,1)).join(''),
    blocks:list=>list.map(b=>block(b,0)).join(''),
    para
  }
}

// Numbered lists restart at 1: each gets its own w:num pointing at the List Number style's abstract numbering.
function numberingFor(numberingDoc,styles,stylesDoc){
  let next=1000
  return {restart(){
    if(!numberingDoc)return null
    const sid=styles['list number'],style=sid&&els(stylesDoc,'style').find(s=>wAttr(s,'styleId')===sid)
    const numId=style&&wAttr(els(style,'numId')[0],'val')
    const num=numId&&els(numberingDoc,'num').find(n=>wAttr(n,'numId')===numId)
    const abs=num&&wAttr(kids(num,'abstractNumId')[0],'val')
    if(!abs)return null
    const id=String(next++)
    for(const n of nodesFrom(numberingDoc,'<w:num w:numId="'+id+'"><w:abstractNumId w:val="'+abs+'"/><w:lvlOverride w:ilvl="0"><w:startOverride w:val="1"/></w:lvlOverride></w:num>'))numberingDoc.documentElement.appendChild(n)
    return id
  }}
}

// Images from stored files: PNG or JPEG, scaled to the text width.
function imageSize(buf){
  if(buf[0]===0x89&&buf.toString('ascii',1,4)==='PNG')return {w:buf.readUInt32BE(16),h:buf.readUInt32BE(20),ext:'png'}
  if(buf[0]===0xFF&&buf[1]===0xD8){let i=2;while(i<buf.length){const m=buf[i+1],len=buf.readUInt16BE(i+2);if(m>=0xC0&&m<=0xC3)return {h:buf.readUInt16BE(i+5),w:buf.readUInt16BE(i+7),ext:'jpeg'};i+=2+len}}
  return null
}

// fillTemplate(buffer, {kind, slots, values, content, files}) -> {buffer, missing, unknown}
//  slots: the template header's declared slots; values: slot id -> text, choice or checkbox value
//  content: the version's {title, sections} for a layout's `sections: all` slot
//  files: async id -> {buffer} for image blocks
export async function fillTemplate(buffer,{kind='layout',slots=[],values={},content=null,files=async()=>null}){
  const {zip,parts}=await openDocx(buffer)
  const stylesXml=await zip.file('word/styles.xml')?.async('string')??'<w:styles xmlns:w="'+W+'"/>'
  const styles=styleIds(stylesXml),stylesDoc=parseXml(stylesXml)
  const numberingXml=await zip.file('word/numbering.xml')?.async('string')
  const numberingDoc=numberingXml?parseXml(numberingXml):null
  const relsName='word/_rels/document.xml.rels',rels=parseXml(await zip.file(relsName)?.async('string')??'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>')
  const pending=[]
  let imageNo=0
  const images={add(b){
    const id='rIdCtisImg'+(++imageNo),name='media/ctis-image-'+imageNo
    pending.push({id,name,file:b.file,alt:b.alt||b.caption||''})
    return '<!--image:'+id+'-->'
  }}
  const writer=blockWriter({styles,numbering:numberingFor(numberingDoc,styles,stylesDoc),images})
  const v={...Object.fromEntries(slots.filter(s=>s.default!==undefined).map(s=>[s.id,s.default])),...values}
  if(content?.title&&v.title===undefined)v.title=content.title
  const allSlot=slots.find(s=>s.sections==='all')
  const sectionSlots=new Set(kind==='layout'&&content&&!allSlot?content.sections.map(s=>s.id):[])
  const blocksFor=tag=>{
    if(kind!=='layout')return null
    if(allSlot&&tag===allSlot.id&&content)return writer.blocks([])+content.sections.map(writer.section).join('')
    if(sectionSlots.has(tag))return writer.section({...content.sections.find(s=>s.id===tag),heading:''})
    const val=v[tag];if(Array.isArray(val))return writer.blocks(val)
    return null
  }
  const used=new Set()
  for(const doc of Object.values(parts)){
    normalizeMarkers(doc)
    applyConditions(doc,v)
    replaceCodes(doc,v,used)
    fillControls(doc,v,used,{kind,blocksFor,unwrap:kind==='layout'})
  }
  // Images: write media, relationships and content types; replace markers with drawings.
  if(pending.length){
    const types=parseXml(await zip.file('[Content_Types].xml').async('string'))
    for(const img of pending){
      const f=await files(img.file),size=f&&imageSize(f.buffer)
      img.ok=!!size
      if(!size)continue
      const cx=Math.min(5940000,size.w*9525),cy=Math.round(cx*size.h/size.w)
      const ns='xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture" xmlns:r="'+R+'"'
      img.xml='<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:drawing '+ns+'><wp:inline><wp:extent cx="'+cx+'" cy="'+cy+'"/><wp:docPr id="'+(9000+pending.indexOf(img))+'" name="'+esc(img.alt||'Image')+'" descr="'+esc(img.alt)+'"/><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="0" name="'+img.name+'"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="'+img.id+'"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="'+cx+'" cy="'+cy+'"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>'
      zip.file('word/'+img.name+'.'+size.ext,f.buffer)
      const rel=rels.createElement('Relationship');rel.setAttribute('Id',img.id);rel.setAttribute('Type',R+'/image');rel.setAttribute('Target',img.name+'.'+size.ext);rels.documentElement.appendChild(rel)
      if(!Array.from(types.documentElement.childNodes).some(n=>n.nodeType===1&&n.getAttribute('Extension')===size.ext)){
        const d=types.createElement('Default');d.setAttribute('Extension',size.ext);d.setAttribute('ContentType','image/'+size.ext);types.documentElement.appendChild(d)
      }
    }
    zip.file('[Content_Types].xml',ser(types));zip.file(relsName,ser(rels))
  }
  // Images go where their markers are; an image whose file is missing or not PNG/JPEG is left out and reported.
  for(const [name,doc] of Object.entries(parts))
    zip.file(name,ser(doc).replace(/<!--image:(rIdCtisImg\d+)-->/g,(_,id)=>pending.find(p=>p.id===id)?.xml??''))
  if(numberingDoc)zip.file('word/numbering.xml',ser(numberingDoc))
  const declared=new Set(slots.map(s=>s.id))
  const filled=id=>v[id]!==undefined&&v[id]!==null&&String(v[id]).trim()!==''
  const missing=slots.filter(s=>s.required&&!filled(s.id)&&!(s.sections==='all'&&content)&&!(kind==='layout'&&content&&sectionSlots.has(s.id))).map(s=>s.id)
  const unknown=Object.keys(values).filter(k=>!declared.has(k)&&!used.has(k))
  const out=await zip.generateAsync({type:'nodebuffer',compression:'DEFLATE'})
  return {buffer:out,missing,unknown,images:pending.map(p=>({file:p.file,ok:!!p.ok}))}
}
