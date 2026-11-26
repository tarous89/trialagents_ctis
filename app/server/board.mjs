import {cell} from './status.mjs'

// Load everything the status rules need for one project, in a fixed number of queries.
export async function loadBoard(q,project){
  const id=project.id
  const [documents,steps,na,current,issues,continued,approvals]=await Promise.all([
    q('SELECT id,name,part,country,language,variant,code,filename,position,catalog FROM ctis.document WHERE project_id=$1 AND removed_at IS NULL ORDER BY position',[id]),
    q('SELECT id,type,name,instruction,position,paused FROM ctis.step WHERE project_id=$1 AND removed_at IS NULL ORDER BY position',[id]),
    q('SELECT document_id,step_id FROM ctis.cell_na WHERE project_id=$1',[id]),
    q('SELECT DISTINCT ON (document_id,step_id) document_id,step_id,n,basis,created_at,source FROM ctis.version WHERE project_id=$1 ORDER BY document_id,step_id,n DESC',[id]),
    q("SELECT document_id,step_id,count(*)::int AS open FROM ctis.thread WHERE project_id=$1 AND status='open' GROUP BY 1,2",[id]),
    q('SELECT document_id,step_id,version_n FROM ctis.continued WHERE project_id=$1',[id]),
    q('SELECT document_id,step_id,version_n FROM ctis.approval WHERE project_id=$1 ORDER BY id',[id])
  ])
  const approvalMap=new Map()
  for(const a of approvals){if(!approvalMap.has(a.document_id))approvalMap.set(a.document_id,[]);approvalMap.get(a.document_id).push({step:a.step_id,n:a.version_n})}
  return {
    documents,steps,countries:project.countries,
    na:new Set(na.map(r=>cell(r.document_id,r.step_id))),
    current:new Map(current.map(r=>[cell(r.document_id,r.step_id),{n:r.n,basis:r.basis,at:r.created_at,source:r.source}])),
    issues:new Map(issues.map(r=>[cell(r.document_id,r.step_id),r.open])),
    continued:new Map(continued.map(r=>[cell(r.document_id,r.step_id),r.version_n])),
    approvals:approvalMap
  }
}

// The part of a board a grantee may see: only shared documents, and only shared steps of them.
export function visibleBoard(board,a){
  if(a.owner||a.grants.some(g=>g.scope==='project'))return board
  return {...board,documents:board.documents.filter(d=>a.canSeeDocument(d.id))}
}

// Sources and templates for one document: the project list, plus additions, minus removals.
export async function effectiveResources(q,projectId,documentId){
  return q(`SELECT r.id,r.category,r.name,r.type,r.version,r.doc_date,r.file_mode FROM ctis.resource r
    WHERE (r.id IN (SELECT resource_id FROM ctis.project_resource WHERE project_id=$1)
        OR r.id IN (SELECT resource_id FROM ctis.document_resource_override WHERE project_id=$1 AND document_id=$2 AND op='add'))
      AND r.id NOT IN (SELECT resource_id FROM ctis.document_resource_override WHERE project_id=$1 AND document_id=$2 AND op='remove')
    ORDER BY r.category,r.name`,[projectId,documentId])
}
