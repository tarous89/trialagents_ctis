// Uploaded sources: store the file, extract its text in chunks with locators, and search it (docs/MCP.md §3 read_ctis_source).
import {createHash,randomUUID} from 'node:crypto'
import mammoth from 'mammoth'

export const MAX_FILE_BYTES=25*1024*1024
const CHUNK=1500
export const kinds={
  'application/pdf':'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':'docx',
  'text/plain':'text','text/markdown':'text'
}
export function kindOf(name,mime){
  if(kinds[mime])return kinds[mime]
  const ext=String(name).toLowerCase().split('.').pop()
  return {pdf:'pdf',docx:'docx',txt:'text',md:'text'}[ext]??null
}
const mimeOf=kind=>({pdf:'application/pdf',docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',text:'text/plain'})[kind]

// Split long text into chunks at paragraph or sentence boundaries, keeping the locator.
function pack(parts){
  const out=[]
  for(const {locator,text} of parts){
    let rest=text.replace(/[ \t]+/g,' ').replace(/\n{3,}/g,'\n\n').trim()
    while(rest.length>CHUNK){
      let cut=rest.lastIndexOf('\n',CHUNK);if(cut<CHUNK/2)cut=rest.lastIndexOf('. ',CHUNK)+1;if(cut<CHUNK/2)cut=CHUNK
      out.push({locator,text:rest.slice(0,cut).trim()});rest=rest.slice(cut).trim()
    }
    if(rest)out.push({locator,text:rest})
  }
  return out
}

const decode=s=>s.replace(/<[^>]+>/g,'').replace(/&nbsp;/g,' ').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&')
async function docxParts(buffer){
  const styleMap=[1,2,3,4].flatMap(n=>[`p[style-name='heading ${n}'] => h${n}:fresh`,`p[style-name='Heading ${n}'] => h${n}:fresh`]).concat(["p[style-name='Title'] => h1:fresh","p[style-name='title'] => h1:fresh"])
  const {value:html}=await mammoth.convertToHtml({buffer},{styleMap})
  const parts=[];let section='',current=[]
  const flush=()=>{if(current.length)parts.push({locator:section?{section}:{},text:current.join('\n')});current=[]}
  for(const m of html.matchAll(/<(h[1-6]|p|li|td|th)[^>]*>([\s\S]*?)<\/\1>/g)){
    const text=decode(m[2]).trim();if(!text)continue
    if(m[1].startsWith('h')){flush();section=text;continue}
    current.push(m[1]==='li'?'- '+text:text)
  }
  flush()
  return parts
}
async function pdfParts(buffer){
  const pdfjs=await import('pdfjs-dist/legacy/build/pdf.mjs')
  const doc=await pdfjs.getDocument({data:new Uint8Array(buffer),useSystemFonts:true,isEvalSupported:false,disableFontFace:true,verbosity:0}).promise
  const parts=[]
  for(let i=1;i<=doc.numPages;i++){
    const page=await doc.getPage(i),content=await page.getTextContent()
    const text=content.items.map(it=>it.str+(it.hasEOL?'\n':'')).join('').replace(/-\n(?=[a-z])/g,'')
    if(text.trim())parts.push({locator:{page:i},text})
  }
  await doc.destroy()
  return parts
}
export async function extractChunks(buffer,kind){
  const parts=kind==='pdf'?await pdfParts(buffer):kind==='docx'?await docxParts(buffer)
    :buffer.toString('utf8').split(/\n(?=#{1,4} )/).map(block=>{const h=/^#{1,4} (.+)/.exec(block);return {locator:h?{section:h[1].trim()}:{},text:h?block.slice(h[0].length):block}})
  return pack(parts)
}

export async function storeFile(q,{ownerId,name,mime,buffer}){
  const id=randomUUID()
  await q('INSERT INTO ctis.file(id,owner_id,name,mime,size,sha256,content) VALUES($1,$2,$3,$4,$5,$6,$7)',
    [id,ownerId,name,mime,buffer.length,createHash('sha256').update(buffer).digest('hex'),buffer])
  return id
}
export async function readFile(q,id){
  const [f]=await q('SELECT id,owner_id,name,mime,size,content FROM ctis.file WHERE id=$1',[id])
  return f?{...f,buffer:Buffer.from(f.content)}:null
}

// Replace a resource's stored file and text.
export async function attachUpload(q,{resourceId,ownerId,name,mime,buffer}){
  const kind=kindOf(name,mime)
  if(!kind)throw Object.assign(new Error('Upload a PDF, Word (.docx) or text file'),{status:400})
  if(buffer.length>MAX_FILE_BYTES)throw Object.assign(new Error('Files can be up to 25 MB'),{status:413})
  let chunks=[]
  try{chunks=await extractChunks(buffer,kind)}catch{throw Object.assign(new Error('The file could not be read. Check that it is not password protected or damaged.'),{status:400})}
  const fileId=await storeFile(q,{ownerId,name,mime:mimeOf(kind),buffer})
  await q("UPDATE ctis.resource SET file_mode='stored',file_id=$2,updated_at=now() WHERE id=$1",[resourceId,fileId])
  await q('DELETE FROM ctis.resource_text WHERE resource_id=$1',[resourceId])
  for(const [i,c] of chunks.entries())await q('INSERT INTO ctis.resource_text(resource_id,chunk,locator,text) VALUES($1,$2,$3,$4)',[resourceId,i+1,JSON.stringify(c.locator),c.text])
  return {file:fileId,chunks:chunks.length,scanned:kind==='pdf'&&!chunks.length}
}

// Ranked passages for a query, from the given resources. Falls back to plain matching for short or unusual terms.
export async function searchPassages(q,resourceIds,query,limit=8){
  if(!resourceIds.length)return []
  const ranked=await q(`SELECT t.resource_id,t.chunk,t.locator,t.text,ts_rank(to_tsvector('simple',t.text),websearch_to_tsquery('simple',$2)) AS rank
    FROM ctis.resource_text t WHERE t.resource_id=ANY($1::uuid[]) AND to_tsvector('simple',t.text) @@ websearch_to_tsquery('simple',$2)
    ORDER BY rank DESC,t.chunk LIMIT $3`,[resourceIds,query,limit])
  if(ranked.length)return ranked
  const words=query.split(/\s+/).filter(w=>w.length>2).slice(0,6)
  if(!words.length)return []
  return q(`SELECT resource_id,chunk,locator,text,0 AS rank FROM ctis.resource_text WHERE resource_id=ANY($1::uuid[]) AND (${words.map((_,i)=>'text ILIKE $'+(i+3)).join(' OR ')})
    ORDER BY chunk LIMIT $2`,[resourceIds,limit,...words.map(w=>'%'+w.replace(/[%_]/g,'')+'%')])
}

// A window of text around the query terms, so results stay short.
export function snippet(text,query,size=700){
  if(text.length<=size)return text
  const words=query.toLowerCase().split(/\s+/).filter(w=>w.length>2)
  const at=Math.max(0,Math.min(...words.map(w=>text.toLowerCase().indexOf(w)).filter(i=>i>=0),text.length))
  const start=Math.max(0,Math.min(at-size/3,text.length-size))
  return (start>0?'…':'')+text.slice(start,start+size).trim()+(start+size<text.length?'…':'')
}
