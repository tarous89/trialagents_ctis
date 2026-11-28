// The content catalog (docs/CATALOG.md): parsing, validation, matching and publishing.
// Files live in catalog/ in this repository; a deploy publishes them as a catalog release.
import {createHash} from 'node:crypto'
import {parse as parseYaml} from 'yaml'
import {z} from 'zod'
import {templateFields} from './word.mjs'

export const categories=['planning','content','styling','workflow']
const json=JSON.stringify
const sha=b=>createHash('sha256').update(b).digest('hex')
const all=z.array(z.string()).default(['all'])
const date=z.union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/),z.date().transform(d=>d.toISOString().slice(0,10))])
// IDs and codes follow regulatory naming: K1_recruitment-arrangements_DE, L1_SIS-ICF_adults_ES.
const id=z.string().regex(/^[A-Za-z0-9][A-Za-z0-9_.-]{0,80}$/,'use letters, digits, _ . and - only, for example L1_SIS-ICF_adults_ES')
const code=z.string().regex(/^[A-Za-z0-9][A-Za-z0-9_.-]{0,60}$/,'use the regulatory code, for example L1_SIS-ICF or K1_recruitment-arrangements')
const common={id,name:z.string().min(1),version:z.union([z.string(),z.number()]).transform(String),effective:date,use_when:z.string().min(1)}
const fillLevels=['study','standard','user','site','blank']
const slot=z.strictObject({id:z.string().regex(/^[A-Za-z0-9_.-]{1,40}$/),required:z.boolean().default(false),
  accepts:z.enum(['text','blocks','choice','checkbox']).default('blocks'),values:z.array(z.string()).optional(),default:z.string().optional(),
  sections:z.literal('all').optional(),description:z.string().optional()})

const headers={
  // Planning checklist (Part I or one country) or the naming instructions.
  planning:z.union([
    z.strictObject({...common,category:z.literal('planning').optional(),kind:z.literal('naming')}),
    z.strictObject({...common,category:z.literal('planning').optional(),kind:z.literal('checklist').default('checklist'),
      part:z.enum(['I','II']),country:z.string().regex(/^([A-Z]{2}|EU)$/),reference:z.string().optional(),checked:date.optional(),naming:z.string().optional(),
      documents:z.array(z.strictObject({
        code,name:z.string().min(1),variants:z.array(z.string()).default([]),required:z.enum(['always','conditional','optional']),condition:z.string().optional(),
        submission_types:all,languages:all,per:z.enum(['trial','site','population']).default('trial'),national_notes:z.string().optional(),
        provided_by:z.enum(['sponsor','assistant','either']).optional()
      })).min(1)}).refine(h=>(h.part==='I')===(h.country==='EU'),'Part I uses country EU; Part II uses a member state code')
  ]),
  content:z.strictObject({...common,category:z.literal('content').optional(),code,variant:z.string().default(''),part:z.enum(['I','II']),countries:all,languages:all,styling:id.optional()}),
  // Styling instructions: a form or layout with its own .docx, or instructions on top of a base styling (default: the default layout).
  styling:z.strictObject({...common,category:z.literal('styling').optional(),code:z.union([code,z.literal('all')]),variant:z.string().default(''),countries:all,languages:all,
    kind:z.enum(['layout','form']).optional(),file:z.string().regex(/^[A-Za-z0-9_.-]+\.docx$/).optional(),base:id.optional(),slots:z.array(slot).optional()})
    .refine(h=>h.file?h.kind&&h.slots?.length:!h.slots&&!h.kind,'a styling with its own file needs kind and slots; one without a file takes them from its base'),
  workflow:z.strictObject({...common,category:z.literal('workflow').optional(),applies_to:z.array(z.string()).min(1)})
}

// Split "---\nyaml\n---\nbody".
export function frontMatter(text){
  const m=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(text)
  if(!m)throw new Error('missing the --- header ---')
  // Versions stay exactly as written (YAML would turn 2.0 into 2).
  const yaml=m[1].replace(/^(version:[ \t]*)([^'"\s][^\n]*?)[ \t]*$/m,(_,k,v)=>k+JSON.stringify(v))
  return {header:parseYaml(yaml)??{},body:m[2].trim()}
}

// Content guide body: "## S01 · Title" sections with "Key: value" lines, and a "## Checklist" of "- C01 text".
const keys={'fill':'fill','must say':'must_say','standard wording':'standard_wording','sources':'sources','check':'check',
  'leave as placeholder':'placeholder','optional':'optional','repeat':'repeat'}
export function parseContentBody(body){
  const out={intro:'',sections:[],checklist:[]},errors=[]
  let current=null,mode='intro'
  for(const raw of body.split(/\r?\n/)){
    const line=raw.trimEnd()
    const h=/^##\s+(.+)$/.exec(line)
    if(h){
      if(/^checklist$/i.test(h[1].trim())){mode='checklist';current=null;continue}
      const s=/^([A-Za-z0-9_.-]{1,40})\s*[·:—–-]\s*(.+)$/.exec(h[1].trim())
      if(!s){errors.push('Section heading "'+h[1]+'" must look like "## S01 · Title"');current=null;mode='skip';continue}
      current={id:s[1],title:s[2].trim(),notes:''};out.sections.push(current);mode='section';continue
    }
    if(mode==='intro'){out.intro+=(out.intro?'\n':'')+line;continue}
    if(mode==='checklist'){
      const c=/^[-*]\s+([A-Za-z0-9_.-]{1,40})\s+(.+)$/.exec(line.trim())
      if(c)out.checklist.push({id:c[1],text:c[2].trim()})
      else if(line.trim())errors.push('Checklist line "'+line.trim()+'" must look like "- C01 text"')
      continue
    }
    if(mode!=='section')continue
    const kv=/^([A-Za-z ]+):\s*(.*)$/.exec(line.trim()),key=kv&&keys[kv[1].toLowerCase()]
    if(key)current[key]=current[key]?current[key]+'\n'+kv[2]:kv[2]
    else if(line.trim())current.notes+=(current.notes?'\n':'')+line.trim()
  }
  out.intro=out.intro.trim()
  for(const s of out.sections){
    if(!s.fill)errors.push(s.id+': add a "Fill:" line ('+fillLevels.join(', ')+')')
    else if(!fillLevels.includes(s.fill.trim()))errors.push(s.id+': Fill must be one of '+fillLevels.join(', '))
    else s.fill=s.fill.trim()
    if(s.fill==='standard'&&!s.standard_wording)errors.push(s.id+': standard sections need a "Standard wording:" line')
    if(s.optional!==undefined)s.optional=/^(yes|true)$/i.test(s.optional.trim())
    if(s.repeat!==undefined)s.repeat=/^(yes|true)$/i.test(s.repeat.trim())
  }
  return {parsed:out,errors}
}

// Every fillable field of a .docx: content controls, {{codes}}, conditional variables and checkboxes.
export const docxFields=templateFields
function check(c,m){if(!c)throw new Error(m)}

// files: [{path:'content/x.md', text}] and [{path:'word/x.docx', buffer}]
export async function buildCatalog(files){
  const items=[],errors=[],warnings=[]
  const docx=new Map(files.filter(f=>f.path.endsWith('.docx')).map(f=>[f.path,f.buffer]))
  for(const f of files.filter(f=>f.path.endsWith('.md'))){
    const [category,name]=f.path.split('/')
    if(!categories.includes(category)||!name||name==='README.md')continue
    const where=f.path
    try{
      const {header,body}=frontMatter(f.text)
      const r=headers[category].safeParse(header)
      if(!r.success){errors.push(where+': '+r.error.issues.slice(0,4).map(i=>(i.path.join('.')||'header')+' '+i.message).join('; '));continue}
      const h=r.data
      if(h.id+'.md'!==name)warnings.push(where+': file name should be '+h.id+'.md')
      const item={id:h.id,category,version:h.version,effective:h.effective,name:h.name,use_when:h.use_when,header:h,body,path:f.path}
      if(category==='content'){
        const {parsed,errors:e}=parseContentBody(body);item.parsed=parsed
        errors.push(...e.map(x=>where+': '+x))
        if(!parsed.sections.length)errors.push(where+': add at least one "## S01 · Title" section')
        const dup=parsed.sections.map(s=>s.id).filter((x,i,a)=>a.indexOf(x)!==i)
        if(dup.length)errors.push(where+': duplicate section ids '+[...new Set(dup)].join(', '))
      }
      if(category==='styling'&&h.file){
        const file='styling/'+h.file,buffer=docx.get(file)
        if(!buffer){errors.push(where+': missing '+file);continue}
        item.file={path:file,sha256:sha(buffer),size:buffer.length,buffer}
        try{item.tags=await docxFields(buffer)}catch(e){errors.push(file+': '+e.message);continue}
        const found=new Map(item.tags.map(f=>[f.id,f]))
        for(const s of h.slots)if(!found.has(s.id))errors.push(where+': slot '+s.id+' is not in '+file+' (as {{'+s.id+'}} or a content control tagged "'+s.id+'")')
        for(const f of item.tags){
          const s=h.slots.find(x=>x.id===f.id)
          if(!s){(h.kind==='form'?errors:warnings).push(where+': '+file+' has '+(f.kinds.includes('condition')?'a condition on ':'a field ')+f.id+' that is not a declared slot; describe it so the assistant knows what to fill');continue}
          if(f.kinds.includes('condition')&&s.accepts!=='choice')errors.push(where+': '+f.id+' decides which parts of the form are kept; declare it with accepts: choice and its values ('+f.values.join(', ')+')')
          if(s.accepts==='choice'&&s.values)for(const v of f.values)if(!s.values.includes(v))errors.push(where+': '+f.id+' is tested for "'+v+'" in '+file+' but its values are '+s.values.join(', '))
          if(f.kinds.includes('checkbox')&&s.accepts!=='checkbox')errors.push(where+': '+f.id+' is a checkbox; declare it with accepts: checkbox')
        }
        if(h.kind==='form'&&h.slots.some(s=>s.sections||s.accepts==='blocks'))errors.push(where+': form slots accept text, choice or checkbox only')
      }
      items.push(item)
    }catch(e){errors.push(where+': '+e.message)}
  }
  const ids=new Map()
  for(const i of items){if(ids.has(i.id))errors.push(i.path+': id '+i.id+' is also used by '+ids.get(i.id));else ids.set(i.id,i.path)}
  const byId=new Map(items.map(i=>[i.id,i]))
  // Links between items.
  for(const st of items.filter(i=>i.category==='styling'&&!i.header.file)){
    const seen=new Set([st.id]);let b=st.header.base??'default',ok=false
    while(b&&!seen.has(b)){seen.add(b);const x=byId.get(b);if(x?.category!=='styling')break;if(x.header.file){ok=true;break};b=x.header.base??'default'}
    if(!ok)errors.push(st.path+': base '+(st.header.base??'default')+' does not lead to a styling with a .docx file')
  }
  for(const c of items.filter(i=>i.category==='content')){
    const t=c.header.styling&&byId.get(c.header.styling)
    if(c.header.styling&&t?.category!=='styling')errors.push(c.path+': styling '+c.header.styling+' is not a styling instruction')
  }
  for(const r of items.filter(i=>i.category==='planning'&&i.header.kind==='checklist'))
    for(const d of r.header.documents)
      if(!items.some(i=>i.category==='content'&&i.header.code===d.code))warnings.push(r.path+': no content template yet for '+d.code)
  const wfTargets=['planning','draft','checklist','qc','style','team','guide','custom','revision','findings','design','redaction']
  for(const w of items.filter(i=>i.category==='workflow'))for(const a of w.header.applies_to)if(!wfTargets.includes(a))errors.push(w.path+': applies_to '+a+' is not one of '+wfTargets.join(', '))
  if(!items.some(i=>i.id==='default'&&i.category==='styling'&&i.header.file))errors.push('styling/default.md: the default styling (with its .docx) is required')
  return {items,errors,warnings,digest:sha(json(items.map(({file,path,...i})=>({...i,file:file&&{sha256:file.sha256}})).sort((a,b)=>a.id<b.id?-1:1)))}
}

// ---------- matching ----------
const slug=s=>String(s||'').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
const fits=(list,value)=>list.includes('all')||list.includes(value)
const typeFits=(types,type)=>!type||types.includes('all')||types.some(t=>slug(type).includes(slug(t))||slug(t).includes(slug(type)))
const specificity=(i,d)=>(i.header.variant&&i.header.variant===d.variant?4:0)+(i.header.countries?.includes(d.country)?2:0)+(i.header.languages?.includes(d.language)?1:0)
const matches=(i,d)=>(!i.header.variant||i.header.variant===d.variant)&&fits(i.header.countries,d.country)&&fits(i.header.languages,d.language)
const best=(list,d)=>list.filter(i=>matches(i,d)).sort((a,b)=>specificity(b,d)-specificity(a,d))[0]??null
const effectiveNow=(i,today)=>i.effective<=today
const summary=i=>({id:i.id,category:i.category,name:i.name,version:i.version,effective:i.effective,use_when:i.use_when,
  ...(i.header.code?{code:i.header.code}:{}),...(i.header.variant?{variant:i.header.variant}:{}),
  ...(i.category==='styling'?{kind:i.header.kind??'layout',countries:i.header.countries}:{}),...(i.category==='content'?{countries:i.header.countries}:{}),
  ...(i.category==='planning'&&i.header.kind!=='naming'?{part:i.header.part,country:i.header.country}:{})})

export function catalogView(release,{today=new Date().toISOString().slice(0,10)}={}){
  const items=release.items.filter(i=>effectiveNow(i,today))
  const byId=new Map(items.map(i=>[i.id,i]))
  const of=c=>items.filter(i=>i.category===c)
  const checklists=()=>of('planning').filter(i=>i.header.kind!=='naming')
  const api={
    release:release.id,
    get:id=>byId.get(id),
    naming:()=>byId.get('naming')??null,
    // Planning checklists for Part I and each country, rows filtered by submission type, plus the naming instructions.
    planning({countries=[],submission_type=''}={}){
      const found=[checklists().find(r=>r.header.part==='I'),...countries.map(c=>checklists().find(r=>r.header.country===c))]
      const naming=api.naming()
      return {
        checklists:found.filter(Boolean).map(r=>({...summary(r),reference:r.header.reference,checked:r.header.checked,naming:r.header.naming,notes:r.body,
          documents:r.header.documents.filter(d=>typeFits(d.submission_types,submission_type))})),
        naming:naming?{id:naming.id,version:naming.version,text:naming.body}:null,
        missing:[...(found[0]?[]:['Part I']),...countries.filter((c,i)=>!found[i+1])]
      }
    },
    planningRows(d,{submission_type=''}={}){
      const r=checklists().find(x=>d.part==='I'?x.header.part==='I':x.header.country===d.country)
      return r?r.header.documents.filter(x=>x.code===d.code&&(!x.variants.length||x.variants.includes(d.variant))&&typeFits(x.submission_types,submission_type)).map(x=>({...x,from:r.id})):[]
    },
    contentTemplate(d){
      const pinned=d.catalog?.content&&byId.get(d.catalog.content)
      return pinned??best(of('content').filter(i=>i.header.code===d.code),d)
    },
    // The styling for a document: the most specific instruction, with the file, kind and slots it inherits from its base.
    styling(d,content=api.contentTemplate(d)){
      const pick=d.catalog?.styling&&byId.get(d.catalog.styling)
        ||content?.header.styling&&byId.get(content.header.styling)
        ||best(of('styling').filter(i=>i.header.code===d.code),d)
        ||best(of('styling').filter(i=>i.header.code==='all'&&i.id!=='default'),d)
        ||byId.get('default')
      if(!pick)return null
      const chain=[pick];let b=pick
      while(!b.header.file){b=byId.get(b.header.base??'default');if(!b||chain.includes(b))return null;chain.push(b)}
      return {item:pick,file:b,kind:b.header.kind,slots:b.header.slots,chain}
    },
    workflow:target=>of('workflow').filter(w=>w.header.applies_to.includes(target)),
    // Everything one deliverable needs from the catalog.
    forDeliverable(d,stepType,{submission_type=''}={}){
      const content=api.contentTemplate(d),planning=api.planningRows(d,{submission_type})
      const styling=['draft','style'].includes(stepType)?api.styling(d,content):null
      return {
        content_template:content,
        planning_checklist:planning,
        styling:styling&&{id:styling.item.id,version:styling.item.version,file:styling.file.id,kind:styling.kind,slots:stepType==='style'?styling.slots:undefined,
          // General instructions first (the design guide, then the base stylings), then the specific ones. Specific wins. Forms are never restyled.
          instructions:[
            ...(styling.kind==='layout'?api.workflow('design').map(w=>({from:w.id,level:'general',text:w.body})):[]),
            ...[...styling.chain].reverse().filter(x=>x.body).map(x=>({from:x.id,level:x===styling.item?'specific':'general',text:x.body})),
            ...planning.filter(r=>r.national_notes).map(r=>({from:r.from,level:'specific',text:r.national_notes}))
          ]},
        workflow:[...api.workflow(stepType),...api.workflow('findings')]
      }
    },
    search({query='',category,country,language,code}={}){
      const words=slug(query).split('-').filter(Boolean)
      return items.filter(i=>(!category||i.category===category)
        &&(!country||(i.category==='planning'?i.header.kind==='naming'||i.header.country===country||i.header.part==='I':fits(i.header.countries??['all'],country)))
        &&(!language||fits(i.header.languages??['all'],language))
        &&(!code||i.header.code===code||(i.category==='planning'&&i.header.documents?.some(d=>d.code===code)))
        &&words.every(w=>slug([i.id,i.name,i.use_when,i.header.code].join(' ')).includes(w)))
        .map(summary)
    },
    summary
  }
  return api
}

// ---------- publishing ----------
export async function publishCatalog(db,built,{sha:gitSha=''}={}){
  if(built.errors.length)throw new Error('The catalog has errors:\n'+built.errors.join('\n'))
  return db.transaction(async q=>{
    const [latest]=await q('SELECT id,digest FROM ctis.catalog_release ORDER BY id DESC LIMIT 1')
    if(latest?.digest===built.digest)return {release:Number(latest.id),published:false}
    const [rel]=await q('INSERT INTO ctis.catalog_release(sha,digest,items) VALUES($1,$2,$3) RETURNING id',[gitSha,built.digest,built.items.length])
    for(const i of built.items)
      await q(`INSERT INTO ctis.catalog_item(release_id,id,category,version,effective,name,use_when,header,body,parsed,tags,file_name,file_sha256,file)
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
        [rel.id,i.id,i.category,i.version,i.effective,i.name,i.use_when,json(i.header),i.body,i.parsed?json(i.parsed):null,i.tags?json(i.tags):null,
         i.file?.path??null,i.file?.sha256??null,i.file?.buffer??null])
    return {release:Number(rel.id),published:true}
  })
}

// The current release without file bytes, cached per release.
const cache=new Map()
export async function currentCatalog(q,options){
  const [rel]=await q('SELECT id FROM ctis.catalog_release ORDER BY id DESC LIMIT 1')
  if(!rel)return catalogView({id:null,items:[]},options)
  const id=Number(rel.id)
  if(!cache.has(id)){
    const rows=await q('SELECT id,category,version,effective,name,use_when,header,body,parsed,tags,file_name,file_sha256 FROM ctis.catalog_item WHERE release_id=$1 ORDER BY id',[id])
    cache.clear()
    cache.set(id,{id,items:rows.map(r=>({id:r.id,category:r.category,version:r.version,effective:r.effective,name:r.name,use_when:r.use_when,header:r.header,body:r.body,
      parsed:r.parsed??undefined,tags:r.tags??undefined,file:r.file_name?{path:r.file_name,sha256:r.file_sha256}:undefined}))})
  }
  return catalogView(cache.get(id),options)
}
export async function catalogFile(q,release,id){
  const [r]=await q('SELECT file_name,file FROM ctis.catalog_item WHERE release_id=$1 AND id=$2 AND file IS NOT NULL',[release,id])
  return r?{name:r.file_name.split('/').pop(),buffer:Buffer.from(r.file)}:null
}
