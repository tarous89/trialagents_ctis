import {createHash,randomUUID} from 'node:crypto'
import {z} from 'zod'
import {check,parse,inputs,splitDeliverable,stepTypes,stepNames,uuid} from './rules.mjs'
import {projectAccess,requireOwner,requireEdit,requireComment,teamActive} from './access.mjs'
import {loadBoard,visibleBoard,effectiveResources} from './board.mjs'
import {cell,documentStatuses,finalStatus,nextStep,canApprove,orderedDocuments,issueCount,ACTION_REQUIRED,APPROVED} from './status.mjs'
import {applyChanges} from './content.mjs'
import {attachUpload,searchPassages,snippet,storeFile,readFile as readStoredFile} from './sources.mjs'
import {currentCatalog,catalogFile} from './catalog.mjs'
import {fillTemplate} from './word.mjs'
import {stepContext} from './step-context.mjs'
const DOCX='application/vnd.openxmlformats-officedocument.wordprocessingml.document'

const json=JSON.stringify
const canonical=v=>Array.isArray(v)?v.map(canonical):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,canonical(v[k])])):v
const digest=v=>createHash('sha256').update(json(canonical(v))).digest('hex')
const person=u=>[u.firstName,u.lastName].filter(Boolean).join(' ')||u.email
const one=async(q,sql,p)=>(await q(sql,p))[0]
// Assistants act for a person, but some actions are for people only (docs/MCP.md §3).
export const assistantSource=s=>s==='Claude'||s==='ChatGPT'
const empty=z.strictObject({})

async function audit(c,action,target,details={},project=c.access?.project){
  await c.q('INSERT INTO ctis.audit(owner_id,project_id,actor,actor_name,source,action,target,details) VALUES($1,$2,$3,$4,$5,$6,$7,$8)',
    [project?.owner_id??c.user.id,project?.id??null,c.user.id,person(c.user),c.source,action,target??null,json(details)])
}
const bumpRevision=(c,extra='')=>c.q(`UPDATE ctis.project SET revision=revision+1${extra},updated_at=now() WHERE id=$1 RETURNING revision,plan_rev`,[c.access.project.id]).then(r=>r[0])
const touch=c=>c.q('UPDATE ctis.project SET updated_at=now() WHERE id=$1',[c.access.project.id])
function expectRevision(c){
  const current=c.access.project.revision
  check(c.request.revision===current,'The project changed since you read it. Read it again and retry.',409,{revision:current})
}

function deliverableOf(c,board,code){
  const [doc,step]=splitDeliverable(code)
  const d=board.documents.find(x=>x.id===doc),s=board.steps.find(x=>x.id===step)
  check(d&&s&&c.access.canSeeStep(doc,step),'Deliverable '+code+' not found',404)
  return {doc,step,d,s,key:cell(doc,step)}
}

const projectView=(p,extra={})=>({id:p.id,code:p.code,name:p.name,sponsor:p.sponsor,phase:p.phase,eu_ct_number:p.eu_ct_number,
  submission_type:p.submission_type,countries:p.countries,revision:p.revision,plan_rev:p.plan_rev,updated_at:p.updated_at,created_at:p.created_at,...extra})

function summarize(board){
  let needAction=0,approved=0
  for(const d of board.documents){
    const st=documentStatuses(board,d.id)
    if(st.some(s=>s.status===ACTION_REQUIRED))needAction++
    if(finalStatus(board,d.id,st).status===APPROVED)approved++
  }
  return {documents:board.documents.length,need_action:needAction,approved}
}

function planView(c,board){
  const a=c.access,b=visibleBoard(board,a)
  const documents=orderedDocuments(b).map(d=>{
    const statuses=documentStatuses(board,d.id).filter(s=>a.canSeeStep(d.id,s.step))
    return {...d,cells:statuses.map(s=>({...s,deliverable:d.id+'-'+s.step,issues:board.issues.get(cell(d.id,s.step))||0})),final:finalStatus(board,d.id)}
  })
  const canRun=a.owner||a.projectRole==='editor'
  return {project:projectView(a.project),role:a.owner?'owner':a.projectRole||'shared',steps:board.steps,documents,
    summary:summarize(b),next:canRun?nextStep(board):null}
}

async function nextNumber(q,p,doc,step){
  return (await one(q,'SELECT coalesce(max(number),0)+1 AS n FROM ctis.thread WHERE project_id=$1 AND document_id=$2 AND step_id=$3',[p,doc,step])).n
}
async function mentionable(c,emails){
  if(!emails.length)return
  const p=c.access.project
  const owner=await one(c.q,'SELECT email FROM ctis.account WHERE user_id=$1',[p.owner_id])
  const granted=(await c.q('SELECT lower(grantee_email) AS e FROM ctis.share_grant WHERE project_id=$1 AND revoked_at IS NULL',[p.id])).map(r=>r.e)
  const allowed=new Set([owner.email.toLowerCase(),...granted])
  const missing=emails.filter(e=>!allowed.has(e.toLowerCase()))
  check(!missing.length,'Invite '+missing.join(', ')+' before mentioning them',400)
}
async function threadOf(c,doc,step,number){
  const t=await one(c.q,'SELECT * FROM ctis.thread WHERE project_id=$1 AND document_id=$2 AND step_id=$3 AND number=$4',[c.access.project.id,doc,step,number])
  check(t,'Thread #'+number+' not found',404)
  return t
}

// ---------- operations ----------
// write: needs a requestId and is replayed from its receipt; people: never from an assistant; project: needs request.project
const ops={
  'project.list':{input:empty,async run(c){
    const own=await c.q('SELECT * FROM ctis.project WHERE owner_id=$1 AND archived_at IS NULL ORDER BY updated_at DESC',[c.user.id])
    const shared=await c.q(`SELECT DISTINCT p.*,a.display_name AS owner_name FROM ctis.project p JOIN ctis.share_grant g ON g.project_id=p.id JOIN ctis.account a ON a.user_id=p.owner_id
      WHERE p.archived_at IS NULL AND g.revoked_at IS NULL AND (g.grantee_user_id=$1 OR lower(g.grantee_email)=lower($2))
        AND a.plan='team' AND (a.paid_until IS NULL OR a.paid_until>now()) ORDER BY p.updated_at DESC`,[c.user.id,c.user.email])
    const out=async(p,extra)=>{const a=await projectAccess(c.q,c.user,p.id,{open:false});return projectView(p,{...extra,...summarize(visibleBoard(await loadBoard(c.q,p),a))})}
    const sources=new Map((await c.q('SELECT project_id,count(*)::int AS n FROM ctis.project_resource WHERE project_id=ANY($1::uuid[]) GROUP BY 1',[own.map(p=>p.id)])).map(r=>[r.project_id,r.n]))
    return {projects:await Promise.all(own.map(p=>out(p,{resources:sources.get(p.id)||0}))),
      shared:await Promise.all(shared.map(p=>out(p,{owner_name:p.owner_name})))}
  }},
  'project.create':{write:true,async run(c){
    const i=c.input,id=randomUUID()
    const p=await one(c.q,`INSERT INTO ctis.project(id,owner_id,code,name,sponsor,phase,submission_type,eu_ct_number,countries) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [id,c.user.id,i.code,i.name,i.sponsor,i.phase,i.submission_type,i.eu_ct_number,[...new Set(i.countries)]])
    await audit(c,'project.created',p.code,{name:p.name},p)
    return {project:projectView(p)}
  }},
  'project.read':{project:true,input:empty,async run(c){return planView(c,await loadBoard(c.q,c.access.project))}},
  'project.update':{project:true,write:true,async run(c){
    requireOwner(c.access);expectRevision(c)
    const fields=Object.entries(c.input).filter(([,v])=>v!==undefined)
    check(fields.length,'Nothing to change')
    const sets=fields.map(([k],i)=>k+'=$'+(i+2)).join(',')
    await c.q(`UPDATE ctis.project SET ${sets} WHERE id=$1`,[c.access.project.id,...fields.map(([k,v])=>k==='countries'?[...new Set(v)]:v)])
    const r=await bumpRevision(c)
    await audit(c,'project.updated',c.access.project.code,{before:Object.fromEntries(fields.map(([k])=>[k,c.access.project[k]])),after:Object.fromEntries(fields)})
    return {revision:r.revision}
  }},
  'project.archive':{project:true,write:true,people:true,input:empty,async run(c){
    requireOwner(c.access)
    await c.q('UPDATE ctis.project SET archived_at=now() WHERE id=$1',[c.access.project.id])
    await audit(c,'project.archived',c.access.project.code)
    return {archived:true}
  }},
  'project.duplicate':{project:true,write:true,people:true,async run(c){
    requireOwner(c.access)
    const src=c.access.project,id=randomUUID(),q=c.q
    const p=await one(q,`INSERT INTO ctis.project(id,owner_id,code,name,sponsor,phase,submission_type,eu_ct_number,countries,duplicated_from,plan_rev)
      SELECT $2,owner_id,coalesce($3,code),coalesce($4,name||' (copy)'),sponsor,phase,submission_type,'',countries,id,1 FROM ctis.project WHERE id=$1 RETURNING *`,[src.id,id,c.input.code??null,c.input.name??null])
    await q('INSERT INTO ctis.project_resource SELECT $2,resource_id FROM ctis.project_resource WHERE project_id=$1',[src.id,id])
    await q('INSERT INTO ctis.document(project_id,id,name,part,country,language,variant,code,filename,position,catalog) SELECT $2,id,name,part,country,language,variant,code,filename,position,catalog FROM ctis.document WHERE project_id=$1 AND removed_at IS NULL',[src.id,id])
    await q('INSERT INTO ctis.step(project_id,id,type,name,instruction,position,paused) SELECT $2,id,type,name,instruction,position,paused FROM ctis.step WHERE project_id=$1 AND removed_at IS NULL',[src.id,id])
    await q('INSERT INTO ctis.cell_na SELECT $2,n.document_id,n.step_id FROM ctis.cell_na n JOIN ctis.document d ON d.project_id=$2 AND d.id=n.document_id JOIN ctis.step s ON s.project_id=$2 AND s.id=n.step_id WHERE n.project_id=$1',[src.id,id])
    await q('INSERT INTO ctis.document_resource_override SELECT $2,o.document_id,o.resource_id,o.op FROM ctis.document_resource_override o JOIN ctis.document d ON d.project_id=$2 AND d.id=o.document_id WHERE o.project_id=$1',[src.id,id])
    // Only the plan and the sources and templates are copied: no deliverables, comments, approvals or shares.
    await q('INSERT INTO ctis.plan_revision(project_id,rev,body,actor,actor_name,source) SELECT $2,1,body,$3,$4,$5 FROM ctis.plan_revision WHERE project_id=$1 AND rev=$6',[src.id,id,c.user.id,person(c.user),c.source,src.plan_rev])
    await audit(c,'project.duplicated',p.code,{from:src.code,from_project:src.id},p)
    return {project:projectView(p)}
  }},

  'plan.save':{project:true,write:true,async run(c){
    requireOwner(c.access);expectRevision(c)
    const {documents,steps,not_applicable}=c.input,pid=c.access.project.id,q=c.q
    // Steps: standard types keep their code (DR, CL, QC, ST, TR, IG); custom steps are CS1, CS2, ...
    const existing=await q('SELECT id,type,removed_at FROM ctis.step WHERE project_id=$1',[pid])
    const taken=new Set(),resolved=[],reserved=new Set([...existing.map(e=>e.id),...steps.map(s=>s.id).filter(Boolean)])
    for(const s of steps){
      let id=s.id
      if(id){
        const e=existing.find(x=>x.id===id)
        const fits=e?e.type===s.type:s.type==='custom'?/^CS\d{1,2}$/.test(id):id===stepTypes[s.type]
        check(fits,'Step '+id+' does not match type '+s.type)
      }else if(s.type!=='custom')id=stepTypes[s.type]
      else{let k=1;while(reserved.has('CS'+k))k++;id='CS'+k;reserved.add(id)}
      check(!taken.has(id),'Step '+id+' appears twice');taken.add(id);resolved.push({...s,id})
    }
    const docIds=new Set()
    for(const d of documents){
      check(!docIds.has(d.id),'Document '+d.id+' appears twice');docIds.add(d.id)
      check(d.part==='I'?d.country==='EU':d.country!=='EU',d.id+': Part I documents use country EU; Part II documents use a member state code')
    }
    const stepOf=new Map(resolved.map(s=>[s.id,s.id]))
    for(const s of resolved)stepOf.set(stepTypes[s.type],s.id)
    const na=not_applicable.map(x=>{check(docIds.has(x.document)&&stepOf.has(x.step),'Not applicable cell '+x.document+'-'+x.step+' is not in the plan');return {document:x.document,step:stepOf.get(x.step)}})
    const before=await q('SELECT id FROM ctis.document WHERE project_id=$1 AND removed_at IS NULL',[pid])
    for(const [i,s] of resolved.entries())
      await q(`INSERT INTO ctis.step(project_id,id,type,name,instruction,position,paused) VALUES($1,$2,$3,$4,$5,$6,$7)
        ON CONFLICT(project_id,id) DO UPDATE SET type=EXCLUDED.type,name=EXCLUDED.name,instruction=EXCLUDED.instruction,position=EXCLUDED.position,paused=EXCLUDED.paused,removed_at=NULL`,
        [pid,s.id,s.type,s.name||stepNames[s.type],s.instruction,i,s.paused])
    await q('UPDATE ctis.step SET removed_at=now() WHERE project_id=$1 AND removed_at IS NULL AND NOT (id=ANY($2))',[pid,[...taken]])
    for(const [i,d] of documents.entries())
      await q(`INSERT INTO ctis.document(project_id,id,name,part,country,language,variant,code,filename,position,catalog) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
        ON CONFLICT(project_id,id) DO UPDATE SET name=EXCLUDED.name,part=EXCLUDED.part,country=EXCLUDED.country,language=EXCLUDED.language,variant=EXCLUDED.variant,
          code=EXCLUDED.code,filename=EXCLUDED.filename,position=EXCLUDED.position,catalog=EXCLUDED.catalog,removed_at=NULL`,
        [pid,d.id,d.name,d.part,d.country,d.language,d.variant,d.code,d.filename,i,json(d.catalog)])
    await q('UPDATE ctis.document SET removed_at=now() WHERE project_id=$1 AND removed_at IS NULL AND NOT (id=ANY($2))',[pid,[...docIds]])
    await q('DELETE FROM ctis.cell_na WHERE project_id=$1',[pid])
    for(const x of na)await q('INSERT INTO ctis.cell_na VALUES($1,$2,$3) ON CONFLICT DO NOTHING',[pid,x.document,x.step])
    // Countries used by the plan are added to the project, keeping the existing order.
    const countries=[...c.access.project.countries]
    for(const d of documents)if(d.part==='II'&&!countries.includes(d.country))countries.push(d.country)
    await q('UPDATE ctis.project SET countries=$2 WHERE id=$1',[pid,countries])
    const r=await bumpRevision(c,',plan_rev=plan_rev+1')
    const body={documents,steps:resolved,not_applicable:na}
    await q('INSERT INTO ctis.plan_revision(project_id,rev,body,actor,actor_name,source) VALUES($1,$2,$3,$4,$5,$6)',[pid,r.plan_rev,json(body),c.user.id,person(c.user),c.source])
    const was=new Set(before.map(x=>x.id))
    await audit(c,'plan.saved',c.access.project.code,{plan_rev:r.plan_rev,documents:documents.length,steps:resolved.map(s=>s.id),
      added:[...docIds].filter(x=>!was.has(x)),removed:[...was].filter(x=>!docIds.has(x))})
    const project=await one(q,'SELECT * FROM ctis.project WHERE id=$1',[pid])
    return planView({...c,access:{...c.access,project}},await loadBoard(q,project))
  }},

  'step.context':{project:true,async run(c){
    const board=await loadBoard(c.q,c.access.project),canRun=c.access.owner||c.access.projectRole==='editor'
    if(c.input.deliverable){const [doc,step]=splitDeliverable(c.input.deliverable);check(c.access.canSeeStep(doc,step),'Deliverable '+c.input.deliverable+' not found',404)}
    else check(canRun,'Only the owner or a project editor can run the plan. Name a deliverable you can work on.',403)
    try{return await stepContext({q:c.q,project:c.access.project,board,catalog:await currentCatalog(c.q),deliverable:c.input.deliverable,revise:c.input.revise,canRun})}
    catch(e){check(false,e.message,e.status??500)}
  }},
  'catalog.planning':{async run(c){
    const cat=await currentCatalog(c.q),out=cat.planning(c.input)
    const guide=cat.workflow('planning')[0]
    return {...out,instructions:guide?{id:guide.id,version:guide.version,text:guide.body}:null}
  }},
  'catalog.search':{async run(c){return {items:(await currentCatalog(c.q)).search(c.input)}}},
  'catalog.item':{async run(c){
    const i=(await currentCatalog(c.q)).get(c.input.id);check(i,'Catalog item '+c.input.id+' not found',404)
    return {...i.header,category:i.category,text:i.body,checklist:i.parsed?.checklist}
  }},
  'next.step':{project:true,input:empty,async run(c){
    check(c.access.owner||c.access.projectRole==='editor','Only the owner or a project editor can run the plan',403)
    return nextStep(await loadBoard(c.q,c.access.project))
  }},

  'deliverable.read':{project:true,async run(c){
    const board=await loadBoard(c.q,c.access.project),{doc,step,d,s,key}=deliverableOf(c,board,c.input.deliverable),pid=c.access.project.id
    const versions=await c.q('SELECT n,created_at,actor_name,source,restored_from,note FROM ctis.version WHERE project_id=$1 AND document_id=$2 AND step_id=$3 ORDER BY n',[pid,doc,step])
    const n=c.input.n??versions.at(-1)?.n
    const version=n?await one(c.q,'SELECT n,content,claims,fill,file_id,basis,resources,catalog,note,past_issues,restored_from,actor_name,source,created_at FROM ctis.version WHERE project_id=$1 AND document_id=$2 AND step_id=$3 AND n=$4',[pid,doc,step,n]):null
    check(!c.input.n||version,'Version '+c.input.n+' not found',404)
    const threads=await c.q(`SELECT t.number,t.kind,t.category,t.version_n,t.anchor,t.text,t.status,t.mentions,t.actor_name,t.source,t.created_at,t.resolved_by,
        coalesce((SELECT json_agg(json_build_object('text',r.text,'by',r.actor_name,'source',r.source,'at',r.created_at) ORDER BY r.id) FROM ctis.thread_reply r WHERE r.thread_id=t.id),'[]') AS replies
      FROM ctis.thread t WHERE t.project_id=$1 AND t.document_id=$2 AND t.step_id=$3 ORDER BY t.number`,[pid,doc,step])
    const status=documentStatuses(board,doc).find(x=>x.step===step)
    return {deliverable:c.input.deliverable,document:d,step:s,status,final:finalStatus(board,doc),versions,version,threads,
      role:c.access.role(doc,step),resources:c.access.canSeeResources?await effectiveResources(c.q,pid,doc):null}
  }},

  'version.save':{project:true,write:true,async run(c){
    const i=c.input,q=c.q,pid=c.access.project.id
    const board=await loadBoard(q,c.access.project),{doc,step,key}=deliverableOf(c,board,i.deliverable)
    requireEdit(c.access,doc,step)
    const statuses=documentStatuses(board,doc),st=statuses.find(x=>x.step===step)
    check(st.status!=='not_applicable',i.deliverable+' is not part of the plan for this document',409)
    const cur=board.current.get(key),curN=cur?.n||0
    check(i.base===curN,'A newer version of '+i.deliverable+' exists. Read it and retry.',409,{current:curN})
    const applicable=statuses.filter(x=>x.status!=='not_applicable'),idx=applicable.findIndex(x=>x.step===step),prev=applicable[idx-1]
    if(prev){
      check(prev.version,'Run '+doc+'-'+prev.step+' first: this step works on its output.',409,{blocked_by:doc+'-'+prev.step})
    }
    // Earlier steps with unresolved issues: refused unless the user asked to move on; then they are continued and flagged.
    const pastIssues=applicable.slice(0,Math.max(idx,0)).filter(x=>x.version&&!x.continued&&issueCount(board,doc,x.step)>0)
    let flagged=[]
    if(pastIssues.length){
      const codes=pastIssues.map(x=>doc+'-'+x.step)
      check(i.continue_past,codes.join(', ')+' needs action. Tell the user what is unresolved and ask whether to move on anyway; if they agree, save again with continue_past: true.',409,{blocked_by:codes})
      for(const x of pastIssues){
        await q('INSERT INTO ctis.continued(project_id,document_id,step_id,version_n,actor) VALUES($1,$2,$3,$4,$5) ON CONFLICT(project_id,document_id,step_id) DO UPDATE SET version_n=EXCLUDED.version_n,actor=EXCLUDED.actor,created_at=now()',[pid,doc,x.step,x.version,c.user.id])
        const open=await q("SELECT number,category,text FROM ctis.thread WHERE project_id=$1 AND document_id=$2 AND step_id=$3 AND status='open' ORDER BY number",[pid,doc,x.step])
        flagged.push({deliverable:doc+'-'+x.step,version:x.version,source_changed:x.sourceChanged,open})
        await audit(c,'continue.set',doc+'-'+x.step,{n:x.version,asked_in_chat:true,for:i.deliverable})
      }
    }
    const basis=prev?{step:prev.step,n:prev.version}:null
    let content=i.content,claims=i.claims??[],touched=null
    if(i.changes){
      check(curN>0,'There is no version to revise yet. Send the full content.',409)
      const old=await one(q,'SELECT content,claims FROM ctis.version WHERE project_id=$1 AND document_id=$2 AND step_id=$3 AND n=$4',[pid,doc,step,curN])
      ;({content,touched}=applyChanges(old.content,i.changes))
      claims=[...old.claims.filter(x=>!touched.has(x.section)),...(i.claims??[])]
    }
    const ids=new Set(content.sections.map(s=>s.id))
    for(const x of [...claims,...i.findings])check(!x.section||ids.has(x.section),'Unknown section '+x.section)
    const n=curN+1
    // Catalog items used, and for a Style step the filled Word file.
    const docRow=board.documents.find(x=>x.id===doc),stepRow=board.steps.find(x=>x.id===step)
    const cat=await currentCatalog(q),guide=cat.contentTemplate(docRow)
    const used=[...i.catalog,...(guide?[{id:guide.id,version:guide.version}]:[])]
    let fileId=null
    const wordFindings=[]
    if(stepRow.type==='style'){
      const styling=cat.styling(docRow,guide)
      check(styling||!i.fill,'No styling is available for this document',409)
      if(styling){
        const tpl=styling.file,slots=styling.slots,unknown=Object.keys(i.fill??{}).filter(k=>!slots.some(x=>x.id===k))
        check(!unknown.length,'Unknown Word fields: '+unknown.join(', ')+'. Styling '+styling.item.id+' has: '+slots.map(x=>x.id).join(', '))
        const owner=c.access.project.owner_id,source=await catalogFile(q,cat.release,tpl.id)
        let r
        try{r=await fillTemplate(source.buffer,{kind:styling.kind,slots,values:i.fill??{},content,
          files:async id=>{const f=await readStoredFile(q,id);return f&&f.owner_id===owner?f:null}})}
        catch(e){check(false,'The Word file of styling '+styling.item.id+' could not be filled: '+e.message,422)}
        fileId=await storeFile(q,{ownerId:owner,name:docRow.filename+'_v'+n+'.docx',mime:DOCX,buffer:r.buffer})
        for(const m of r.missing){const sl=slots.find(x=>x.id===m);wordFindings.push({category:'missing',text:'Fill the Word field '+m+(sl?.description?': '+sl.description:''),key:'word-'+m})}
        for(const img of r.images.filter(x=>!x.ok))wordFindings.push({category:'missing',text:'An image could not be added: upload it as a PNG or JPEG file in the workspace.',key:'image-'+img.file})
        for(const x of styling.chain)used.push({id:x.id,version:x.version})
      }
    }
    const findings=[...i.findings,...wordFindings.filter(w=>!i.findings.some(f=>f.key===w.key))]
    await q(`INSERT INTO ctis.version(project_id,document_id,step_id,n,content,claims,fill,file_id,basis,resources,catalog,note,past_issues,actor,actor_name,source)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)`,
      [pid,doc,step,n,json(content),json(claims),i.fill?json(i.fill):null,fileId,json(basis),json(await effectiveResources(q,pid,doc)),json(used),i.note,json(flagged),c.user.id,person(c.user),c.source])
    // Findings: re-reported keys keep their thread and number; in a revision, findings on untouched sections carry over; others are superseded.
    const open=await q("SELECT id,number,key,anchor FROM ctis.thread WHERE project_id=$1 AND document_id=$2 AND step_id=$3 AND kind='finding' AND status='open'",[pid,doc,step])
    const keep=new Set(),saved=[]
    let number=await nextNumber(q,pid,doc,step)
    for(const f of findings){
      const anchor=json({section:f.section,quote:f.quote})
      const known=f.key&&await one(q,'SELECT id,number FROM ctis.thread WHERE project_id=$1 AND document_id=$2 AND step_id=$3 AND key=$4',[pid,doc,step,f.key])
      if(known){
        await q("UPDATE ctis.thread SET category=$2,text=$3,anchor=$4,version_n=$5,status='open',resolved_by=NULL,resolved_at=NULL WHERE id=$1",[known.id,f.category,f.text,anchor,n])
        keep.add(known.id);saved.push({number:known.number,category:f.category,text:f.text})
      }else{
        await q(`INSERT INTO ctis.thread(id,project_id,document_id,step_id,number,kind,category,version_n,anchor,text,key,actor,actor_name,source)
          VALUES($1,$2,$3,$4,$5,'finding',$6,$7,$8,$9,$10,$11,$12,$13)`,[randomUUID(),pid,doc,step,number,f.category,n,anchor,f.text,f.key??null,c.user.id,person(c.user),c.source])
        saved.push({number:number++,category:f.category,text:f.text})
      }
    }
    for(const t of open){
      if(keep.has(t.id))continue
      if(touched&&!touched.has(t.anchor?.section))await q('UPDATE ctis.thread SET version_n=$2 WHERE id=$1',[t.id,n])
      else await q("UPDATE ctis.thread SET status='resolved',resolved_by='system',resolved_at=now() WHERE id=$1",[t.id])
    }
    for(const a of i.addressed){
      const t=await threadOf(c,doc,step,a.thread)
      await q('INSERT INTO ctis.thread_reply(thread_id,text,actor,actor_name,source) VALUES($1,$2,$3,$4,$5)',[t.id,a.reply,c.user.id,person(c.user),c.source])
      if(a.resolve)await q("UPDATE ctis.thread SET status='resolved',resolved_by=$2,resolved_at=now() WHERE id=$1",[t.id,c.user.id])
    }
    await snapshotFindings(q,pid,doc,step,n)
    await touch(c)
    await audit(c,'version.saved',i.deliverable,{n,mode:i.changes?'changes':'full',findings:saved.length,addressed:i.addressed.map(a=>a.thread)})
    const after=await loadBoard(q,c.access.project)
    return {deliverable:i.deliverable,n,status:documentStatuses(after,doc).find(x=>x.step===step),findings:saved,past_issues:flagged,file:fileId?docRow.filename+'_v'+n+'.docx':null,
      next:c.access.owner||c.access.projectRole==='editor'?nextStep(after):null}
  }},

  'version.restore':{project:true,write:true,people:true,async run(c){
    const i=c.input,q=c.q,pid=c.access.project.id
    const board=await loadBoard(q,c.access.project),{doc,step,key}=deliverableOf(c,board,i.deliverable)
    requireEdit(c.access,doc,step)
    const curN=board.current.get(key)?.n||0
    check(i.base===curN,'A newer version of '+i.deliverable+' exists.',409,{current:curN})
    check(i.n<curN,'Choose an earlier version to restore')
    const n=curN+1
    const v=await one(q,`INSERT INTO ctis.version(project_id,document_id,step_id,n,content,claims,fill,file_id,basis,resources,catalog,note,restored_from,actor,actor_name,source)
      SELECT project_id,document_id,step_id,$5,content,claims,fill,file_id,basis,resources,catalog,'Restored from v'||n,n,$6,$7,$8 FROM ctis.version
      WHERE project_id=$1 AND document_id=$2 AND step_id=$3 AND n=$4 RETURNING n`,[pid,doc,step,i.n,n,c.user.id,person(c.user),c.source])
    check(v,'Version '+i.n+' not found',404)
    // The restored version's own findings come back on their original threads; the current ones are superseded.
    const {findings}=await one(q,'SELECT findings FROM ctis.version WHERE project_id=$1 AND document_id=$2 AND step_id=$3 AND n=$4',[pid,doc,step,i.n])
    await q("UPDATE ctis.thread SET status='resolved',resolved_by='system',resolved_at=now() WHERE project_id=$1 AND document_id=$2 AND step_id=$3 AND kind='finding' AND status='open'",[pid,doc,step])
    for(const f of findings)await q("UPDATE ctis.thread SET status='open',category=$5,text=$6,anchor=$7,version_n=$8,resolved_by=NULL,resolved_at=NULL WHERE project_id=$1 AND document_id=$2 AND step_id=$3 AND number=$4",
      [pid,doc,step,f.number,f.category,f.text,json(f.anchor),n])
    await snapshotFindings(q,pid,doc,step,n)
    await touch(c)
    await audit(c,'version.restored',i.deliverable,{n,from:i.n})
    return {deliverable:i.deliverable,n}
  }},

  'comment.create':{project:true,write:true,async run(c){
    const i=c.input,board=await loadBoard(c.q,c.access.project),{doc,step,key}=deliverableOf(c,board,i.deliverable),pid=c.access.project.id
    requireComment(c.access,doc,step)
    check(i.version<=(board.current.get(key)?.n||0),'Version '+i.version+' not found',404)
    await mentionable(c,i.mentions)
    const number=await nextNumber(c.q,pid,doc,step)
    await c.q(`INSERT INTO ctis.thread(id,project_id,document_id,step_id,number,kind,category,version_n,anchor,text,mentions,actor,actor_name,source)
      VALUES($1,$2,$3,$4,$5,'comment','comment',$6,$7,$8,$9,$10,$11,$12)`,[randomUUID(),pid,doc,step,number,i.version,json(i.anchor),i.text,i.mentions,c.user.id,person(c.user),c.source])
    await touch(c)
    await audit(c,'comment.created',i.deliverable,{number,mentions:i.mentions})
    return {deliverable:i.deliverable,number}
  }},
  'thread.reply':{project:true,write:true,async run(c){
    const i=c.input,board=await loadBoard(c.q,c.access.project),{doc,step}=deliverableOf(c,board,i.deliverable)
    requireComment(c.access,doc,step);await mentionable(c,i.mentions)
    const t=await threadOf(c,doc,step,i.number)
    await c.q('INSERT INTO ctis.thread_reply(thread_id,text,mentions,actor,actor_name,source) VALUES($1,$2,$3,$4,$5,$6)',[t.id,i.text,i.mentions,c.user.id,person(c.user),c.source])
    await touch(c)
    await audit(c,'thread.replied',i.deliverable,{number:i.number})
    return {deliverable:i.deliverable,number:i.number}
  }},
  'thread.resolve':{project:true,write:true,async run(c){return setThread(c,'resolved')}},
  'thread.reopen':{project:true,write:true,async run(c){return setThread(c,'open')}},

  'continue.set':{project:true,write:true,people:true,async run(c){
    const i=c.input,board=await loadBoard(c.q,c.access.project),{doc,step,key}=deliverableOf(c,board,i.deliverable)
    requireEdit(c.access,doc,step)
    const st=documentStatuses(board,doc).find(x=>x.step===step)
    check(st.status===ACTION_REQUIRED,'Nothing needs action on '+i.deliverable,409)
    check(board.current.get(key).n===i.n,'Version '+i.n+' is not the current version',409)
    await c.q('INSERT INTO ctis.continued(project_id,document_id,step_id,version_n,actor) VALUES($1,$2,$3,$4,$5) ON CONFLICT(project_id,document_id,step_id) DO UPDATE SET version_n=EXCLUDED.version_n,actor=EXCLUDED.actor,created_at=now()',
      [c.access.project.id,doc,step,i.n,c.user.id])
    await touch(c)
    await audit(c,'continue.set',i.deliverable,{n:i.n})
    return {deliverable:i.deliverable,continued:i.n}
  }},
  'continue.undo':{project:true,write:true,people:true,async run(c){
    const i=c.input,board=await loadBoard(c.q,c.access.project),{doc,step}=deliverableOf(c,board,i.deliverable)
    requireEdit(c.access,doc,step)
    await c.q('DELETE FROM ctis.continued WHERE project_id=$1 AND document_id=$2 AND step_id=$3',[c.access.project.id,doc,step])
    await touch(c)
    await audit(c,'continue.undone',i.deliverable)
    return {deliverable:i.deliverable,continued:null}
  }},
  'approval.create':{project:true,write:true,people:true,async run(c){
    requireOwner(c.access)
    const i=c.input,board=await loadBoard(c.q,c.access.project),{doc,step}=deliverableOf(c,board,i.deliverable)
    const why=canApprove(board,doc,step,i.n);check(!why,why,409)
    await c.q('INSERT INTO ctis.approval(project_id,document_id,step_id,version_n,plan_rev,actor,actor_name) VALUES($1,$2,$3,$4,$5,$6,$7)',
      [c.access.project.id,doc,step,i.n,c.access.project.plan_rev,c.user.id,person(c.user)])
    await touch(c)
    await audit(c,'final.approved',i.deliverable,{n:i.n,plan_rev:c.access.project.plan_rev})
    return {deliverable:i.deliverable,approved:i.n}
  }},

  'resource.record':{write:true,async run(c){
    const i=c.input,id=randomUUID()
    let ownerId=c.user.id
    if(c.request.project){
      c.access=await projectAccess(c.q,c.user,c.request.project,{lock:true})
      check(c.access.owner||c.access.projectRole==='editor','Only the owner or a project editor can record sources for this project',403)
      ownerId=c.access.project.owner_id
    }
    await c.q(`INSERT INTO ctis.resource(id,owner_id,category,name,type,version,doc_date,scope,notes,file_mode,link,actor,actor_name,source)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
      [id,ownerId,i.category,i.name,i.type,i.version,i.doc_date,json(i.scope),i.notes,i.link?'link':'name',i.link??null,c.user.id,person(c.user),c.source])
    const attached=!!(c.access&&i.attach_to_project&&c.access.owner)
    if(attached)await c.q('INSERT INTO ctis.project_resource VALUES($1,$2) ON CONFLICT DO NOTHING',[c.access.project.id,id])
    await audit(c,'resource.recorded',i.name,{id,category:i.category,version:i.version,attached},c.access?.project??{owner_id:ownerId,id:null})
    return {resource:id,attached}
  }},
  // Uploads come through the app (browser or the workspace inside an assistant), never as tool arguments.
  'resource.upload':{write:true,people:true,async run(c){
    const i=c.input,buffer=Buffer.from(i.content_base64,'base64')
    const r=await one(c.q,'SELECT * FROM ctis.resource WHERE id=$1',[i.resource]);check(r,'Source or template not found',404)
    if(r.owner_id!==c.user.id){
      check(c.request.project,'Only the owner can upload this file',403)
      c.access=await projectAccess(c.q,c.user,c.request.project,{lock:true})
      check(c.access.project.owner_id===r.owner_id&&(c.access.owner||c.access.projectRole==='editor'),'Only the owner or a project editor can upload this file',403)
    }
    let out
    try{out=await attachUpload(c.q,{resourceId:r.id,ownerId:r.owner_id,name:i.name,mime:i.mime,buffer})}
    catch(e){check(false,e.message,e.status??400)}
    await audit(c,'resource.uploaded',r.name,{id:r.id,file:i.name,size:buffer.length,passages:out.chunks},c.access?.project??{owner_id:r.owner_id,id:null})
    return {resource:r.id,passages:out.chunks,note:out.scanned?'No text was found: the PDF may be a scan. It is stored, but cannot be searched or quoted.':null}
  }},
  'source.search':{project:true,async run(c){
    check(c.access.canSeeResources,'Sources are visible to the owner and to people the whole project is shared with',403)
    const i=c.input,pid=c.access.project.id
    const allowed=i.document?(await effectiveResources(c.q,pid,i.document)).map(r=>r.id)
      :(await c.q(`SELECT resource_id AS id FROM ctis.project_resource WHERE project_id=$1 UNION SELECT resource_id FROM ctis.document_resource_override WHERE project_id=$1 AND op='add'`,[pid])).map(r=>r.id)
    const ids=i.resource?allowed.filter(x=>x===i.resource):allowed
    check(!i.resource||ids.length,'That source is not used in this project',404)
    const names=new Map((await c.q('SELECT id,name,version,file_mode FROM ctis.resource WHERE id=ANY($1::uuid[])',[allowed])).map(r=>[r.id,r]))
    const rows=await searchPassages(c.q,ids,i.query,i.limit)
    return {query:i.query,passages:rows.map(r=>({resource:r.resource_id,name:names.get(r.resource_id).name,version:names.get(r.resource_id).version,passage:r.chunk,locator:r.locator,text:snippet(r.text,i.query)})),
      not_stored:[...names.values()].filter(r=>ids.includes(r.id)&&r.file_mode!=='stored').map(r=>r.name)}
  }},
  'source.read':{project:true,async run(c){
    check(c.access.canSeeResources,'Sources are visible to the owner and to people the whole project is shared with',403)
    const i=c.input,pid=c.access.project.id
    const ok=await one(c.q,`SELECT 1 FROM ctis.project_resource WHERE project_id=$1 AND resource_id=$2 UNION SELECT 1 FROM ctis.document_resource_override WHERE project_id=$1 AND resource_id=$2 AND op='add'`,[pid,i.resource])
    check(ok,'That source is not used in this project',404)
    const r=await one(c.q,'SELECT name,version FROM ctis.resource WHERE id=$1',[i.resource])
    const rows=await c.q('SELECT chunk,locator,text FROM ctis.resource_text WHERE resource_id=$1 AND chunk>=$2 ORDER BY chunk LIMIT $3',[i.resource,i.from,i.count])
    const total=(await one(c.q,'SELECT count(*)::int AS n FROM ctis.resource_text WHERE resource_id=$1',[i.resource])).n
    return {resource:i.resource,name:r.name,version:r.version,passages:rows.map(x=>({passage:x.chunk,locator:x.locator,text:x.text})),total}
  }},
  'version.file':{project:true,async run(c){
    const i=c.input,board=await loadBoard(c.q,c.access.project),{doc,step,key}=deliverableOf(c,board,i.deliverable)
    const n=i.n??board.current.get(key)?.n
    const v=n&&await one(c.q,'SELECT file_id FROM ctis.version WHERE project_id=$1 AND document_id=$2 AND step_id=$3 AND n=$4',[c.access.project.id,doc,step,n])
    check(v?.file_id,'This version has no Word file',404)
    const f=await readStoredFile(c.q,v.file_id)
    return {name:f.name,mime:f.mime,size:f.size,content_base64:f.buffer.toString('base64')}
  }},
  'resources.set':{project:true,write:true,async run(c){
    requireOwner(c.access)
    const pid=c.access.project.id,want=[...new Set(c.input.resources)]
    const valid=await c.q('SELECT id FROM ctis.resource WHERE owner_id=$1 AND id=ANY($2::uuid[])',[c.access.project.owner_id,want])
    check(valid.length===want.length,'Unknown source or template')
    const before=(await c.q('SELECT resource_id FROM ctis.project_resource WHERE project_id=$1',[pid])).map(r=>r.resource_id)
    await c.q('DELETE FROM ctis.project_resource WHERE project_id=$1',[pid])
    for(const r of want)await c.q('INSERT INTO ctis.project_resource VALUES($1,$2)',[pid,r])
    await touch(c)
    await audit(c,'resources.changed',c.access.project.code,{added:want.filter(x=>!before.includes(x)),removed:before.filter(x=>!want.includes(x))})
    return {resources:want}
  }},
  'document.resources.set':{project:true,write:true,async run(c){
    requireOwner(c.access)
    const i=c.input,pid=c.access.project.id
    const doc=await one(c.q,'SELECT id FROM ctis.document WHERE project_id=$1 AND id=$2 AND removed_at IS NULL',[pid,i.document]);check(doc,'Document '+i.document+' not found',404)
    const onProject=new Set((await c.q('SELECT resource_id FROM ctis.project_resource WHERE project_id=$1',[pid])).map(r=>r.resource_id))
    const valid=await c.q('SELECT id FROM ctis.resource WHERE owner_id=$1 AND id=ANY($2::uuid[])',[c.access.project.owner_id,[...i.add,...i.remove]])
    check(valid.length===new Set([...i.add,...i.remove]).size,'Unknown source or template')
    const set=(r,op)=>c.q('INSERT INTO ctis.document_resource_override VALUES($1,$2,$3,$4) ON CONFLICT(project_id,document_id,resource_id) DO UPDATE SET op=EXCLUDED.op',[pid,i.document,r,op])
    const clear=r=>c.q('DELETE FROM ctis.document_resource_override WHERE project_id=$1 AND document_id=$2 AND resource_id=$3',[pid,i.document,r])
    for(const r of i.add)await(onProject.has(r)?clear(r):set(r,'add'))
    for(const r of i.remove)await(onProject.has(r)?set(r,'remove'):clear(r))
    await touch(c)
    await audit(c,'document.resources.changed',i.document,{add:i.add,remove:i.remove})
    return {document:i.document,resources:await effectiveResources(c.q,pid,i.document)}
  }},

  'share.create':{project:true,write:true,people:true,async run(c){
    requireOwner(c.access)
    const i=c.input,p=c.access.project
    const account=await one(c.q,'SELECT * FROM ctis.account WHERE user_id=$1',[p.owner_id])
    check(teamActive(account),'Sharing is part of the Team plan',402)
    check(i.email.toLowerCase()!==account.email.toLowerCase(),'You already own this project')
    check((i.scope==='project')===(i.document===undefined)&&(i.scope==='deliverable')===(i.step!==undefined),'Choose a document for a document share, and a document and step for a deliverable share')
    if(i.document)check(await one(c.q,'SELECT 1 FROM ctis.document WHERE project_id=$1 AND id=$2 AND removed_at IS NULL',[p.id,i.document]),'Document '+i.document+' not found',404)
    if(i.step)check(await one(c.q,'SELECT 1 FROM ctis.step WHERE project_id=$1 AND id=$2 AND removed_at IS NULL',[p.id,i.step]),'Step '+i.step+' not found',404)
    const id=randomUUID()
    await c.q('INSERT INTO ctis.share_grant(id,owner_id,grantee_email,project_id,scope,document_id,step_id,role) VALUES($1,$2,$3,$4,$5,$6,$7,$8)',
      [id,p.owner_id,i.email,p.id,i.scope,i.document??null,i.step??null,i.role])
    await c.q('UPDATE ctis.account SET access_version=access_version+1 WHERE user_id=$1',[p.owner_id])
    await audit(c,'share.created',i.email,{id,scope:i.scope,document:i.document,step:i.step,role:i.role})
    return {share:id}
  }},
  'share.update':{project:true,write:true,people:true,async run(c){return changeShare(c,'role')}},
  'share.revoke':{project:true,write:true,people:true,async run(c){return changeShare(c,'revoke')}},

  'logs':{async run(c){
    const p=c.request.project
    if(p){c.access=await projectAccess(c.q,c.user,p);check(c.access.owner||c.access.projectRole,'Logs are available to the owner and to people the whole project is shared with',403)}
    const rows=await c.q(`SELECT id,project_id,actor_name,source,action,target,details,happened_at FROM ctis.audit
      WHERE ${p?'project_id=$1':'owner_id=$1'} AND ($2::bigint IS NULL OR id<$2) ORDER BY id DESC LIMIT $3`,[p??c.user.id,c.input.before??null,c.input.limit])
    return {entries:rows,before:rows.length===c.input.limit?rows.at(-1).id:null}
  }}
}

async function snapshotFindings(q,pid,doc,step,n){
  await q(`UPDATE ctis.version SET findings=coalesce((SELECT json_agg(json_build_object('number',number,'category',category,'text',text,'anchor',anchor,'key',key) ORDER BY number)
      FROM ctis.thread WHERE project_id=$1 AND document_id=$2 AND step_id=$3 AND kind='finding' AND status='open'),'[]') WHERE project_id=$1 AND document_id=$2 AND step_id=$3 AND n=$4`,[pid,doc,step,n])
}
async function setThread(c,status){
  const i=c.input,board=await loadBoard(c.q,c.access.project),{doc,step}=deliverableOf(c,board,i.deliverable)
  requireComment(c.access,doc,step)
  const t=await threadOf(c,doc,step,i.number)
  check(t.status!==status,'Thread #'+i.number+' is already '+status,409)
  await c.q('UPDATE ctis.thread SET status=$2,resolved_by=$3,resolved_at=$4 WHERE id=$1',[t.id,status,status==='resolved'?c.user.id:null,status==='resolved'?new Date():null])
  await touch(c)
  await audit(c,'thread.'+(status==='resolved'?'resolved':'reopened'),i.deliverable,{number:i.number})
  return {deliverable:i.deliverable,number:i.number,status}
}
async function changeShare(c,what){
  requireOwner(c.access)
  const g=await one(c.q,'SELECT * FROM ctis.share_grant WHERE id=$1 AND project_id=$2 AND revoked_at IS NULL',[c.input.id,c.access.project.id])
  check(g,'Share not found',404)
  if(what==='revoke')await c.q('UPDATE ctis.share_grant SET revoked_at=now() WHERE id=$1',[g.id])
  else await c.q('UPDATE ctis.share_grant SET role=$2 WHERE id=$1',[g.id,c.input.role])
  await c.q('UPDATE ctis.account SET access_version=access_version+1 WHERE user_id=$1',[g.owner_id])
  await audit(c,'share.'+(what==='revoke'?'revoked':'updated'),g.grantee_email,{id:g.id,role:c.input.role})
  return {share:g.id,revoked:what==='revoke'}
}

export const operations=Object.keys(ops)

// execute(user, {op, project?, input, requestId?, revision?}, source) -> result
// source: 'web', 'Claude', 'ChatGPT', or the assistant workspace ('Claude workspace'), recorded in Logs.
export function ctis(db){
  return async function execute(user,request,source='web'){
    check(user?.id&&user.email,'Sign in to TrialAgents CTIS',401)
    const def=ops[request?.op];check(def,'Unknown operation '+request?.op,400)
    check(!def.people||!assistantSource(source),'Only a person can do this, in TrialAgents CTIS',403)
    const input=parse(def.input??inputs[request.op],request.input)
    if(def.write)parse(uuid,request.requestId)
    if(def.project)parse(uuid,request.project)
    return db.transaction(async q=>{
      await q(`INSERT INTO ctis.account(user_id,email,display_name) VALUES($1,$2,$3)
        ON CONFLICT(user_id) DO UPDATE SET email=EXCLUDED.email,display_name=EXCLUDED.display_name`,[user.id,user.email.toLowerCase(),person(user)])
      let d
      if(def.write){
        d=digest({op:request.op,project:request.project??null,input,revision:request.revision??null})
        const prior=await one(q,'SELECT digest,result FROM ctis.receipt WHERE actor=$1 AND key=$2',[user.id,request.requestId])
        if(prior){check(prior.digest===d,'This request ID was already used for a different change',409);return prior.result}
      }
      const c={q,user,source,input,request}
      if(def.project)c.access=await projectAccess(q,user,request.project,{lock:!!def.write})
      const result=JSON.parse(json(await def.run(c)))
      if(def.write)await q('INSERT INTO ctis.receipt(actor,key,digest,result) VALUES($1,$2,$3,$4)',[user.id,request.requestId,d,json(result)])
      return result
    })
  }
}
