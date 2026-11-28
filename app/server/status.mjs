// Statuses are derived from the stored plan, versions, threads, continues and approvals. Nothing here is stored.
// See docs/TECHNICAL.md §2 and docs/MCP.md §5.

import {publishedByDefault} from './rules.mjs'

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

// The reference document a document is adapted from (based_on): its approved final version, if any, and its latest
// version of the last applicable step. Nothing waits for the approval; the assistant asks the user first (nextStep).
export function referenceOf(board,documentId){
  const doc=board.documents.find(d=>d.id===documentId),ref=doc?.based_on&&board.documents.find(d=>d.id===doc.based_on)
  if(!ref)return null
  const last=applicableSteps(board,ref.id).at(-1)
  const approved=last?(board.approvals.get(ref.id)||[]).filter(a=>a.step===last.id).at(-1)??null:null
  const cur=last&&board.current.get(cell(ref.id,last.id))
  return {document:ref.id,name:ref.name,approved:approved&&{step:approved.step,n:approved.n},latest:cur?{step:last.id,n:cur.n}:null}
}

// "Reference changed": the first content step was drafted from a reference version that is no longer the approved one.
export function referenceChanged(board,documentId,stepId){
  if(applicableSteps(board,documentId)[0]?.id!==stepId)return false
  const used=board.current.get(cell(documentId,stepId))?.reference,ref=used&&referenceOf(board,documentId)
  if(!ref?.approved)return false
  return !used.approved||used.step!==ref.approved.step||used.n!==ref.approved.n
}

export function issueCount(board,documentId,stepId){
  return (board.issues.get(cell(documentId,stepId))||0)+(sourceChanged(board,documentId,stepId)?1:0)+(referenceChanged(board,documentId,stepId)?1:0)
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
    const base={step:s.id,version:cur?.n??null,continued:isContinued(board,documentId,s.id),sourceChanged:sourceChanged(board,documentId,s.id),
      ...(referenceChanged(board,documentId,s.id)?{referenceChanged:true}:{})}
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

// The redacted version for publication (docs/TECHNICAL.md §12). It is made from the approved final version only, so it
// follows approval and needs none of its own: not_published (the document is not published), after_approval,
// ready (approved, no redacted version yet), done (made from the approved version) or outdated (made from an earlier one).
export const needsRedaction=d=>d.redact??publishedByDefault(d.code)
export function redactionStatus(board,documentId){
  const d=board.documents.find(x=>x.id===documentId)
  if(!d||!needsRedaction(d))return {status:'not_published'}
  const f=finalStatus(board,documentId)
  if(f.status!==APPROVED)return {status:'after_approval'}
  const r=board.redactions?.get(documentId)
  if(!r)return {status:'ready',version:f.version}
  const base={n:r.n,version:r.version_n,file:r.file_name??null,mime:r.file_mime??null}
  return r.step_id===f.step&&r.version_n===f.version?{status:'done',...base}:{status:'outdated',...base,final:f.version}
}

// A supplied document waits for its file on its first step; nothing else waits for it.
export function awaitingFile(board,d){
  if(!d.supplied)return false
  const first=applicableSteps(board,d.id)[0]
  return !!first&&!board.current.get(cell(d.id,first.id))
}

// Part I first, then the reference package (country and language), then each country in project order, then by position.
export const inReferencePackage=(board,d)=>{const rp=board.planning?.reference_package;return !!rp&&d.part==='II'&&d.country===rp.country&&d.language===rp.language}
export function orderedDocuments(board){
  const rank=d=>d.part==='I'?-2:inReferencePackage(board,d)?-1:(i=>i<0?board.countries.length:i)(board.countries.indexOf(d.country))
  return [...board.documents].sort((a,b)=>rank(a)-rank(b)||a.position-b.position)
}

// The next deliverable the assistant should work on, or a stop summary.
export function nextStep(board){
  const summary={approved:[],awaitingApproval:[],blocked:[],waiting:[],awaitingFile:[],toRedact:[]}
  const awaiting=[]
  for(const d of orderedDocuments(board)){
    if(awaitingFile(board,d)){awaiting.push(d.id);summary.awaitingFile.push(d.id);continue}
    const statuses=documentStatuses(board,d.id)
    const blocking=statuses.find(s=>s.status===ACTION_REQUIRED&&!s.continued)
    if(blocking){summary.blocked.push({document:d.id,step:blocking.step,deliverable:d.id+'-'+blocking.step});continue}
    const todo=statuses.find(s=>s.status===WAITING)
    if(todo){
      const next={deliverable:d.id+'-'+todo.step,document:d.id,step:todo.step,...(awaiting.length?{awaiting_file:awaiting}:{})}
      // Drafting from a reference document that is not approved yet: no automatic continue; the assistant asks the user.
      const ref=applicableSteps(board,d.id)[0]?.id===todo.step&&referenceOf(board,d.id)
      if(ref&&!ref.approved)next.unapproved_reference={document:ref.document,name:ref.name,latest:ref.latest}
      return next
    }
    const final=finalStatus(board,d.id,statuses)
    if(final.status===APPROVED&&['ready','outdated'].includes(redactionStatus(board,d.id).status))summary.toRedact.push(d.id)
    if(final.status===APPROVED)summary.approved.push(d.id)
    else if(final.status===AWAITING_APPROVAL)summary.awaitingApproval.push(d.id)
    else summary.waiting.push(d.id)
  }
  return {stop:true,summary}
}
