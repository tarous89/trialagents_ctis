// Email notifications. Changes write to the outbox in their own transaction; a worker delivers later and
// checks, at send time, that the recipient still has access and still wants this kind of email.
import {randomUUID} from 'node:crypto'

export const origin='https://ctis.trialagents.com'
// Personal switches (Settings → Notifications), with their defaults. "share" is not a switch: people must learn they were given access.
export const mailTypes=[
  ['draft','Draft ready','When the assistant saves a draft in a project you own.',true],
  ['finding','Finding opened','When Source QC or another step opens a numbered finding in a project you own.',true],
  ['comment','Comment or mention','When someone comments on your project or mentions you.',true],
  ['invite','Shared item opened','When someone opens what you shared with them for the first time.',true],
  ['approval','Ready for your approval','When the last step of a document in your project is done.',true],
  ['source','Source changed','When a newer version of a recorded source is registered.',false]
]
export const wants=(prefs,category)=>category==='share'||(prefs?.[category]??mailTypes.find(t=>t[0]===category)?.[3]??true)
export const link=(project,deliverable)=>origin+'/'+(project?'?project='+project+(deliverable?'&deliverable='+encodeURIComponent(deliverable):''):'')

// enqueue(q, {owner, project, recipient, category, subject, message, link, dedupe, delay})
export async function enqueue(q,m){
  if(!m.recipient)return
  await q(`INSERT INTO ctis.mail(id,owner_id,project_id,recipient,category,subject,message,link,dedupe,due_at)
    VALUES($1,$2,$3,lower($4),$5,$6,$7,$8,$9,now()+($10||' seconds')::interval) ON CONFLICT(dedupe) DO NOTHING`,
    [randomUUID(),m.owner,m.project??null,m.recipient,m.category,m.subject.slice(0,200),m.message.slice(0,4000),m.link??'',m.dedupe,String(m.delay??0)])
}

// Can this recipient still see the project? The owner always; others through an active grant while the owner's Team plan is active.
async function stillAllowed(q,job){
  if(!job.project_id)return true
  const [p]=await q('SELECT p.owner_id,a.email,a.plan,a.paid_until FROM ctis.project p JOIN ctis.account a ON a.user_id=p.owner_id WHERE p.id=$1 AND p.archived_at IS NULL',[job.project_id])
  if(!p)return false
  if(p.email.toLowerCase()===job.recipient)return true
  const team=p.plan==='team'&&(!p.paid_until||new Date(p.paid_until)>new Date())
  if(!team)return false
  return (await q('SELECT 1 FROM ctis.share_grant WHERE project_id=$1 AND lower(grantee_email)=$2 AND revoked_at IS NULL',[job.project_id,job.recipient])).length>0
}

// send(job) delivers one email (the shared service's mail provider, with job.id as idempotency key).
export async function deliverMail(db,send,limit=25){
  let sent=0
  for(let i=0;i<limit;i++){
    const found=await db.transaction(async q=>{
      const [job]=await q(`SELECT * FROM ctis.mail WHERE sent_at IS NULL AND due_at<=now() ORDER BY due_at,created_at LIMIT 1 FOR UPDATE SKIP LOCKED`)
      if(!job)return false
      const [account]=await q('SELECT preferences FROM ctis.account WHERE lower(email)=$1',[job.recipient])
      if(!wants(account?.preferences,job.category)||!await stillAllowed(q,job)){await q('DELETE FROM ctis.mail WHERE id=$1',[job.id]);return true}
      try{await send(job);sent++;await q("UPDATE ctis.mail SET sent_at=now(),message='' WHERE id=$1",[job.id])}
      catch{await q("UPDATE ctis.mail SET attempts=attempts+1,due_at=now()+least(3600,30*(attempts+1))*interval '1 second' WHERE id=$1",[job.id])}
      return true
    })
    if(!found)break
  }
  return sent
}
