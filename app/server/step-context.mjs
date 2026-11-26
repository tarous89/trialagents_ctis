// The bundle get_ctis_step returns (docs/MCP.md §4): everything one step needs, from the server, never from chat history.
import {cell,documentStatuses,nextStep} from './status.mjs'
import {effectiveResources} from './board.mjs'

const outputs={
  draft:'save_ctis action save_version with content (all sections, ids from the content template), claims for the facts you wrote where you have the passage, findings for what a person must supply or decide, and note listing checklist items you fixed.',
  checklist:'save_ctis action save_version with the checked content (with your fixes) and findings for checklist items that need a person.',
  qc:'save_ctis action save_version with the content (unchanged except corrections), a claim for every fact (kind source with resource, version, locator and quote; or standard, user, site, blank), and findings for facts without a passage (missing) or that contradict their source (conflict).',
  style:'save_ctis action save_version with the final content and fill (a value for each slot; choices with one of their values). The server writes the Word file and reports required slots left empty.',
  team:'save_ctis action save_version with a review summary as content and findings for each point a person must act on.',
  guide:'save_ctis action save_version with the content checked against the internal guidelines, and findings for deviations.',
  custom:'save_ctis action save_version with the result of the step as content, and findings for what needs a person.'
}

const threadSql=`SELECT t.number,t.kind,t.category,t.version_n,t.anchor,t.text,t.actor_name,t.source,
    coalesce((SELECT json_agg(json_build_object('text',r.text,'by',r.actor_name,'source',r.source) ORDER BY r.id) FROM ctis.thread_reply r WHERE r.thread_id=t.id),'[]') AS replies
  FROM ctis.thread t WHERE t.project_id=$1 AND t.document_id=$2 AND t.step_id=$3 AND t.status='open' ORDER BY t.number`

const itemText=i=>i&&{id:i.id,name:i.name,version:i.version,text:i.body}

export async function stepContext({q,project,board,catalog,deliverable,revise=false,canRun}){
  let code=deliverable
  if(!code){
    const n=nextStep(board)
    if(n.stop)return {stop:true,summary:n.summary,next:'Nothing left to run. Tell the user the summary: which documents await approval (they approve in TrialAgents CTIS) and which are blocked, with what needs a person.'}
    code=n.deliverable
  }
  const [docId,stepId]=code.split('-')
  const doc=board.documents.find(d=>d.id===docId),step=board.steps.find(s=>s.id===stepId)
  if(!doc||!step)throw Object.assign(new Error('Deliverable '+code+' is not in the plan'),{status:404})
  const statuses=documentStatuses(board,docId),status=statuses.find(s=>s.step===stepId)
  if(status.status==='not_applicable')throw Object.assign(new Error(code+' is not part of the plan for this document'),{status:409})
  const applicable=statuses.filter(s=>s.status!=='not_applicable'),idx=applicable.findIndex(s=>s.step===stepId),prev=applicable[idx-1]
  const versionOf=async(stepCode,n)=>n?(await q('SELECT n,content,claims,fill,note,created_at FROM ctis.version WHERE project_id=$1 AND document_id=$2 AND step_id=$3 AND n=$4',[project.id,docId,stepCode,n]))[0]:null
  const current=await versionOf(stepId,board.current.get(cell(docId,stepId))?.n)
  const input=prev?await versionOf(prev.step,prev.version):null
  const cat=catalog.forDeliverable(doc,step.type,{submission_type:project.submission_type})
  const threads=await q(threadSql,[project.id,docId,stepId])
  const resources=await effectiveResources(q,project.id,docId)
  // Earlier steps the user moved past keep their open issues visible here.
  const earlier=[]
  for(const s of applicable.slice(0,Math.max(idx,0)).filter(x=>x.status==='action_required'))
    earlier.push({deliverable:docId+'-'+s.step,continued:s.continued,source_changed:s.sourceChanged,open:(await q(threadSql,[project.id,docId,s.step])).map(t=>({number:t.number,category:t.category,text:t.text}))})
  let revision=null
  if(revise){
    if(!current)throw Object.assign(new Error('There is no version of '+code+' to revise yet'),{status:409})
    const [snap]=await q('SELECT resources FROM ctis.version WHERE project_id=$1 AND document_id=$2 AND step_id=$3 AND n=$4',[project.id,docId,stepId,current.n])
    const was=new Set(snap.resources.map(r=>r.id)),now=new Set(resources.map(r=>r.id))
    revision={version:current.n,open_threads:threads.length,
      added:resources.filter(r=>!was.has(r.id)).map(r=>({id:r.id,name:r.name,version:r.version})),
      removed:snap.resources.filter(r=>!now.has(r.id)).map(r=>({id:r.id,name:r.name,version:r.version})),
      input_changed:status.sourceChanged}
  }
  const workflow=[...(revise?catalog.workflow('revision'):[]),...cat.workflow].map(itemText)
  const blocked=status.blockedBy?docId+'-'+status.blockedBy:null
  const base=current?.n??0
  return {
    deliverable:code,project:project.id,
    document:{id:doc.id,name:doc.name,code:doc.code,variant:doc.variant,part:doc.part,country:doc.country,language:doc.language,filename:doc.filename},
    step:{id:step.id,type:step.type,name:step.name,instruction:step.instruction},
    status:status.status,base,blocked_by:blocked,earlier_issues:earlier,
    instructions:workflow,
    content_template:cat.content_template?{id:cat.content_template.id,name:cat.content_template.name,version:cat.content_template.version,text:cat.content_template.body,
      checklist:cat.content_template.parsed.checklist}:null,
    planning_checklist:cat.planning_checklist,
    styling:cat.styling,
    input:input?{deliverable:docId+'-'+prev.step,...input}:null,
    current:current??null,
    sources:resources.map(r=>({id:r.id,category:r.category,name:r.name,type:r.type,version:r.version,searchable:r.file_mode==='stored'})),
    threads,revision,
    output:revise?'save_ctis action save_version with base '+base+' and changes (only the changed sections), claims for those sections, and addressed (each comment you answered, with a one-line reply).':outputs[step.type],
    next:!canRun?'You can work on this deliverable, but only the owner or a project editor can run the rest of the plan.'
      :blocked?code+' waits for '+blocked+', which needs action. Tell the user what is unresolved; if they ask to move on anyway, save with continue_past: true.'
      :'Do the work, then save with save_ctis (action save_version, deliverable '+code+', base '+base+'). The result says what to run next.'
  }
}
