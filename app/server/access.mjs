import {check} from './rules.mjs'
import {enqueue,link} from './mail.mjs'

// One person's access to one project: the owner, or the union of their active grants.
// Grants are effective only while the owner's Team plan is active (docs/TECHNICAL.md §5).
export const teamActive=a=>a?.plan==='team'&&(!a.paid_until||new Date(a.paid_until)>new Date())

export async function projectAccess(q,user,projectId,{lock=false,open=true}={}){
  const [project]=await q('SELECT * FROM ctis.project WHERE id=$1 AND archived_at IS NULL'+(lock?' FOR UPDATE':''),[projectId])
  check(project,'Project not found',404)
  if(project.owner_id===user.id)return access(project,'owner',[])
  const grants=await q(`SELECT g.id,g.scope,g.document_id,g.step_id,g.role,g.first_opened_at,g.created_at FROM ctis.share_grant g JOIN ctis.account a ON a.user_id=g.owner_id
    WHERE g.project_id=$1 AND g.revoked_at IS NULL AND (g.grantee_user_id=$2 OR lower(g.grantee_email)=lower($3))
      AND a.plan='team' AND (a.paid_until IS NULL OR a.paid_until>now())`,[projectId,user.id,user.email])
  check(grants.length,'Project not found',404)
  const unseen=grants.filter(g=>!g.first_opened_at).map(g=>g.id)
  if(open)await q('UPDATE ctis.share_grant SET grantee_user_id=$2,first_opened_at=coalesce(first_opened_at,now()) WHERE id=ANY($1::uuid[]) OR (project_id=$3 AND lower(grantee_email)=lower($4) AND grantee_user_id IS NULL)',[unseen,user.id,projectId,user.email])
  // The owner hears once when a person first opens what was shared ("invite" switch).
  if(open&&unseen.length){
    const [o]=await q('SELECT email FROM ctis.account WHERE user_id=$1',[project.owner_id])
    await enqueue(q,{owner:project.owner_id,project:project.id,recipient:o?.email,category:'invite',dedupe:'opened:'+unseen.sort().join(','),
      subject:(user.email)+' opened what you shared',message:user.email+' opened '+project.code+' for the first time.',link:link(project.id)})
  }
  return access(project,'grantee',grants)
}

function access(project,kind,grants){
  const owner=kind==='owner'
  const covers=(g,doc,step)=>g.scope==='project'||(g.document_id===doc&&(g.scope==='document'||g.step_id===step))
  const role=(doc,step)=>{
    if(owner)return 'owner'
    const roles=grants.filter(g=>covers(g,doc,step)).map(g=>g.role)
    return roles.includes('editor')?'editor':roles.length?'commenter':null
  }
  return {
    project,owner,grants,
    role,
    projectRole:owner?'owner':grants.some(g=>g.scope==='project'&&g.role==='editor')?'editor':grants.some(g=>g.scope==='project')?'commenter':null,
    canSeeDocument:doc=>owner||grants.some(g=>g.scope==='project'||g.document_id===doc),
    canSeeStep:(doc,step)=>!!role(doc,step),
    canComment:(doc,step)=>!!role(doc,step),
    canEdit:(doc,step)=>['owner','editor'].includes(role(doc,step)),
    canSeeResources:owner||grants.some(g=>g.scope==='project')
  }
}

export function requireOwner(a){check(a.owner,'Only the project owner can do this',403)}
export function requireEdit(a,doc,step){
  check(a.canSeeStep(doc,step),'Deliverable not found',404)
  check(a.canEdit(doc,step),'You can comment on this deliverable but not change it',403)
}
export function requireComment(a,doc,step){check(a.canComment(doc,step),'Deliverable not found',404)}
