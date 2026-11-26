// TrialAgents CTIS background work in the shared service: apply the schema, publish the catalog, deliver email.
import {readFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import postgres from 'postgres'
import {deliverMail} from '../app/lib/ctis/app/server/mail.mjs'
import {publishCatalog} from '../app/lib/ctis/app/server/catalog.mjs'
import {loadCatalogDir} from '../app/lib/ctis/app/server/catalog-files.mjs'

const sql=postgres(process.env.DATABASE_URL,{max:1})
const db={transaction:fn=>sql.begin(tx=>fn((s,p)=>tx.unsafe(s,p??[])))}
const lib=new URL('../app/lib/ctis/',import.meta.url)
try{
  await sql.begin(async tx=>{
    await tx`SELECT pg_advisory_xact_lock(hashtext('ctis.schema.v1'))`
    await tx.unsafe(await readFile(new URL('app/server/schema.sql',lib),'utf8')).simple()
  })
  const release=await publishCatalog(db,await loadCatalogDir(fileURLToPath(new URL('catalog',lib))),{sha:process.env.RENDER_GIT_COMMIT??''})
  console.log('ctis_catalog_release',release.release,release.published?'published':'unchanged')
}catch(e){console.error('ctis_start_failed',e.message);await sql.end();process.exit(1)}
const from=process.env.CTIS_MAIL_FROM||'TrialAgents CTIS <no-reply@trialagents.com>'
while(true){
  try{await deliverMail(db,async job=>{
    const res=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+process.env.RESEND_API_KEY,'Content-Type':'application/json','Idempotency-Key':'ctis/'+job.id},
      body:JSON.stringify({from,to:[job.recipient],subject:job.subject,text:job.message+(job.link?'\n\nOpen in TrialAgents CTIS: '+job.link:'')+'\n\nChange which emails you get in Settings → Notifications.'}),signal:AbortSignal.timeout(10000)})
    if(!res.ok)throw new Error('Mail unavailable')
  })}catch{console.error('ctis_mail_retry_scheduled')}
  await new Promise(r=>setTimeout(r,15000))
}
