// Statuses are derived from the stored plan, versions, threads, continues and approvals. Nothing here is stored.
// See docs/TECHNICAL.md §2 and docs/MCP.md §5.

export const NOT_APPLICABLE='not_applicable',WAITING='waiting',ACTION_REQUIRED='action_required',DONE='done'
export const APPROVED='approved',AWAITING_APPROVAL='awaiting_approval'
export const cell=(document,step)=>document+'|'+step

// board: {documents, steps, countries, na:Set, current:Map, issues:Map, continued:Map, approvals:Map}
//  documents: [{id, part, country, position}]   steps: [{id, position, paused}]
//  current:   cell -> {n, basis:{step,n}|null}  issues: cell -> number of open threads on the current version
//  continued: cell -> version n                  approvals: document -> [{step, n}] oldest first

export function applicableSteps(board,documentId){
  return board.steps.filter(s=>!s.paused&&!board.na.has(cell(documentId,s.id)))
}

// The input version of a step changed after the step ran ("Source changed").
export function sourceChanged(board,documentId,stepId){
  const cur=board.current.get(cell(documentId,stepId))
  if(!cur?.basis)return false
  const input=board.current.get(cell(documentId,cur.basis.step))
  return !input||input.n!==cur.basis.n
}

export function issueCount(board,documentId,stepId){
  return (board.issues.get(cell(documentId,stepId))||0)+(sourceChanged(board,documentId,stepId)?1:0)
}

export function isContinued(board,documentId,stepId){
  const cur=board.current.get(cell(documentId,stepId))
  return !!cur&&board.continued.get(cell(documentId,stepId))===cur.n
}

// Status of every step of one document, in plan order.
export function documentStatuses(board,documentId){
  const applicable=new Set(applicableSteps(board,documentId).map(s=>s.id))
  const out=[];let blockedBy=null
  for(const s of board.steps){
    const key=cell(documentId,s.id),cur=board.current.get(key)
    const base={step:s.id,version:cur?.n??null,continued:isContinued(board,documentId,s.id),sourceChanged:sourceChanged(board,documentId,s.id)}
    if(!applicable.has(s.id)){out.push({...base,status:NOT_APPLICABLE});continue}
    if(blockedBy){out.push({...base,status:WAITING,blockedBy});continue}
    if(!cur){out.push({...base,status:WAITING});continue}
    if(issueCount(board,documentId,s.id)>0){
      out.push({...base,status:ACTION_REQUIRED})
      if(!base.continued)blockedBy=s.id
      continue
    }
    out.push({...base,status:DONE})
  }
  return out
}

export function finalStatus(board,documentId,statuses=documentStatuses(board,documentId)){
  const last=applicableSteps(board,documentId).at(-1)
  if(!last)return {status:WAITING,step:null}
  const approved=(board.approvals.get(documentId)||[]).filter(a=>a.step===last.id).at(-1)
  if(approved)return {status:APPROVED,step:last.id,version:approved.n}
  const st=statuses.find(x=>x.step===last.id)
  return st.status===DONE?{status:AWAITING_APPROVAL,step:last.id,version:st.version}:{status:WAITING,step:last.id}
}

// Approval is possible on the last applicable step once it has a version and nothing blocks it.
export function canApprove(board,documentId,stepId,n){
  const last=applicableSteps(board,documentId).at(-1)
  if(!last||last.id!==stepId)return 'Only the last step of a document can be approved'
  const cur=board.current.get(cell(documentId,stepId))
  if(!cur||cur.n!==n)return 'Only the current version can be approved'
  const st=documentStatuses(board,documentId).find(x=>x.step===stepId)
  if(st.status===DONE||(st.status===ACTION_REQUIRED&&st.continued))return null
  return 'This document is not ready for approval'
}

// Part I first, then each country in project order, then by position.
export function orderedDocuments(board){
  const rank=d=>d.part==='I'?-1:(i=>i<0?board.countries.length:i)(board.countries.indexOf(d.country))
  return [...board.documents].sort((a,b)=>rank(a)-rank(b)||a.position-b.position)
}

// The next deliverable the assistant should work on, or a stop summary.
export function nextStep(board){
  const summary={approved:[],awaitingApproval:[],blocked:[],waiting:[]}
  for(const d of orderedDocuments(board)){
    const statuses=documentStatuses(board,d.id)
    const blocking=statuses.find(s=>s.status===ACTION_REQUIRED&&!s.continued)
    if(blocking){summary.blocked.push({document:d.id,step:blocking.step,deliverable:d.id+'-'+blocking.step});continue}
    const todo=statuses.find(s=>s.status===WAITING)
    if(todo)return {deliverable:d.id+'-'+todo.step,document:d.id,step:todo.step}
    const final=finalStatus(board,d.id,statuses)
    if(final.status===APPROVED)summary.approved.push(d.id)
    else if(final.status===AWAITING_APPROVAL)summary.awaitingApproval.push(d.id)
    else summary.waiting.push(d.id)
  }
  return {stop:true,summary}
}
