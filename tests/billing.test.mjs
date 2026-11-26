// Team plan billing against a fake Stripe, and email notifications through the outbox.
import {test,before,after} from 'node:test'
import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import {randomUUID} from 'node:crypto'
import {PGlite} from '@electric-sql/pglite'
import {ctis} from '../app/server/store.mjs'
import {stripeBilling} from '../app/server/billing.mjs'
import {deliverMail} from '../app/server/mail.mjs'

// Just enough of Stripe: prices, customers, Checkout sessions, subscriptions and the portal.
function fakeStripe(){
  const s={prices:[],customers:[],sessions:[],subscriptions:[],idem:new Map(),calls:[]}
  const ok=body=>({ok:true,json:async()=>body})
  const stripeRequest=async(path,{method,headers,body})=>{
    s.calls.push(method+' '+path)
    const key=headers['Idempotency-Key'],form=body?Object.fromEntries(body):{}
    if(key&&s.idem.has(key))return ok(s.idem.get(key))
    const done=r=>{if(key)s.idem.set(key,r);return ok(r)}
    const [p,qs]=path.split('?'),query=new URLSearchParams(qs)
    if(p==='/prices'&&method==='GET')return ok({data:s.prices.filter(x=>x.lookup_key===query.get('lookup_keys[]'))})
    if(p==='/prices')return done(s.prices[s.prices.push({id:'price_'+s.prices.length,lookup_key:form.lookup_key,active:true,currency:form.currency,unit_amount:+form.unit_amount,recurring:{interval:'month',interval_count:1}})-1])
    if(p.startsWith('/prices/'))return ok(s.prices.find(x=>x.id===p.slice(8)))
    if(p==='/customers')return done(s.customers[s.customers.push({id:'cus_'+s.customers.length,email:form.email})-1])
    if(p==='/checkout/sessions'&&method==='POST')return done(s.sessions[s.sessions.push({id:'cs_'+s.sessions.length,status:'open',url:'https://checkout.stripe.com/c/'+s.sessions.length,form})-1])
    if(p.startsWith('/checkout/sessions/'))return ok(s.sessions.find(x=>x.id===p.slice(19)))
    if(p==='/subscriptions')return ok({data:s.subscriptions.filter(x=>x.customer===query.get('customer'))})
    if(p==='/billing_portal/sessions')return done({url:'https://billing.stripe.com/p/'+form.customer})
    return {ok:false,json:async()=>({})}
  }
  return {s,stripeRequest}
}

const pg=new PGlite(),db={transaction:fn=>pg.transaction(tx=>fn(async(sql,p)=>(await tx.query(sql,p)).rows))}
const stripe=fakeStripe(),billing=stripeBilling({stripeRequest:stripe.stripeRequest,stripeMode:()=>'test'})
const run=ctis(db,{billing})
const owner={id:'u:o',email:'owner@example.org',firstName:'Alex',lastName:'Morgan'},reviewer={id:'u:r',email:'reviewer@example.org',firstName:'Sofia',lastName:'Ruiz'}
let project
const w=(user,op,input={},extra={},source='web')=>run(user,{op,project,input,requestId:randomUUID(),...extra},source)
const event=(type,sub)=>({id:'evt_'+randomUUID(),type,livemode:false,data:{object:{customer:sub.customer,metadata:{ctis_account:owner.id}}}})
before(async()=>{
  await pg.exec(await readFile(new URL('../app/server/schema.sql',import.meta.url),'utf8'))
  project=(await run(owner,{op:'project.create',requestId:randomUUID(),input:{code:'EX-101',name:'EX-101',countries:['DE']}},'Claude')).project.id
  await w(owner,'plan.save',{documents:[{id:'D04',name:'Consent form',part:'II',country:'DE',language:'de',filename:'EX101_D04'}],steps:[{type:'draft'},{type:'qc'}]},{revision:0},'Claude')
})
after(()=>pg.close())

test('checkout: one customer, one open session, the €49 monthly price; never from an assistant',async()=>{
  await assert.rejects(w(owner,'share.create',{email:reviewer.email,scope:'project',role:'commenter'}),e=>e.status===402)
  await assert.rejects(w(owner,'billing.checkout',{},{},'Claude'),e=>e.status===403)
  const first=await w(owner,'billing.checkout')
  assert.match(first.url,/^https:\/\/checkout\.stripe\.com\//)
  assert.deepEqual(stripe.s.prices.map(p=>[p.currency,p.unit_amount,p.lookup_key]),[['eur',4900,'trialagents_ctis_team_eur_49_monthly_v1']])
  const again=await w(owner,'billing.checkout')
  assert.equal(again.url,first.url,'an open session is reused');assert.equal(stripe.s.customers.length,1);assert.equal(stripe.s.sessions.length,1)
  assert.equal(stripe.s.sessions[0].form['metadata[ctis_account]'],owner.id)
  assert.match(stripe.s.sessions[0].form.success_url,/section=Billing&checkout=done/)
})

test('the webhook turns the Team plan on from Stripe’s own state, once per event, and off when it ends',async()=>{
  const customer=stripe.s.customers[0].id,price=stripe.s.prices[0].id,end=Math.floor(Date.now()/1000)+30*86400
  const sub={id:'sub_1',customer,status:'active',metadata:{ctis_account:owner.id},items:{data:[{price:{id:price},quantity:1,current_period_end:end}]}}
  stripe.s.subscriptions.push(sub)
  const e=event('checkout.session.completed',sub)
  assert.equal(await billing.webhook(db,e),true)
  let a=await run(owner,{op:'account.read',input:{}})
  assert.equal(a.team,true);assert.equal(new Date(a.paid_until).getTime(),end*1000)
  assert.equal(await billing.webhook(db,{...e,data:{object:{customer,metadata:{}}}}),false,'events for other products are passed on')
  const subsBefore=stripe.s.calls.filter(c=>c.startsWith('GET /subscriptions')).length
  await billing.webhook(db,e)
  assert.equal(stripe.s.calls.filter(c=>c.startsWith('GET /subscriptions')).length,subsBefore,'a repeated event is ignored')
  await w(owner,'share.create',{email:reviewer.email,scope:'project',role:'commenter'})
  assert.equal((await run(reviewer,{op:'project.read',project,input:{}})).project.code,'EX-101')
  assert.match((await w(owner,'billing.portal')).url,/^https:\/\/billing\.stripe\.com\//)
  await assert.rejects(w(owner,'billing.checkout'),/already active/)
  // Cancellation: access stays until the end of the period already paid, then stops.
  sub.status='canceled'
  await billing.webhook(db,event('customer.subscription.deleted',sub))
  assert.equal((await run(owner,{op:'account.read',input:{}})).team,true,'paid period kept')
  await pg.query("UPDATE ctis.account SET paid_until=now()-interval '1 minute' WHERE user_id=$1",[owner.id]) // the paid period has passed
  sub.items.data[0].current_period_end=Math.floor(Date.now()/1000)-60
  await billing.webhook(db,event('customer.subscription.updated',sub))
  a=await run(owner,{op:'account.read',input:{}})
  assert.equal(a.team,false)
  await assert.rejects(run(reviewer,{op:'project.read',project,input:{}}),e=>e.status===404,'shared access stops; the owner keeps everything')
  assert.ok((await run(owner,{op:'project.read',project,input:{}})).documents.length)
  // Renewal restores access.
  sub.status='active';sub.items.data[0].current_period_end=end
  await billing.webhook(db,event('customer.subscription.updated',sub))
  assert.equal((await run(reviewer,{op:'project.read',project,input:{}})).project.code,'EX-101')
})

test('notifications: shared with you, first opened, findings, comments and mentions, ready for approval; switches and access are checked at send time',async()=>{
  const sent=[];const send=async job=>sent.push(job)
  await pg.query("UPDATE ctis.mail SET due_at=now()")
  await deliverMail(db,send)
  const subjects=()=>sent.map(j=>j.recipient+' | '+j.subject)
  assert.ok(subjects().some(x=>x==='reviewer@example.org | Alex Morgan shared EX-101 with you'))
  assert.ok(subjects().some(x=>x==='owner@example.org | reviewer@example.org opened what you shared'))
  sent.length=0
  const doc=t=>({title:'',sections:[{id:'S01',heading:'',blocks:[{type:'paragraph',text:t}]}]})
  await w(owner,'version.save',{deliverable:'D04-DR',base:0,content:doc('Draft')},{},'Claude')
  await w(owner,'version.save',{deliverable:'D04-QC',base:0,content:doc('Draft'),findings:[{category:'missing',text:'PI name missing.',section:'S01'}]},{},'Claude')
  await w(reviewer,'comment.create',{deliverable:'D04-QC',version:1,text:'Please check @Alex',mentions:[owner.email]})
  await pg.query("UPDATE ctis.mail SET due_at=now()")
  await deliverMail(db,send)
  const s=subjects()
  assert.ok(s.includes('owner@example.org | Drafts saved in EX-101'))
  assert.ok(s.includes('owner@example.org | D04-QC needs action'))
  assert.ok(s.includes('owner@example.org | Sofia Ruiz mentioned you on D04-QC'))
  assert.ok(!s.some(x=>x.startsWith('reviewer@')),'nobody is told about their own comment')
  // Switches: the owner turns off drafts; ready-for-approval still arrives.
  await w(owner,'preferences.save',{draft:false})
  const prefs=await run(owner,{op:'preferences.read',input:{}})
  assert.equal(prefs.types.find(t=>t.id==='draft').on,false);assert.equal(prefs.types.find(t=>t.id==='source').on,false,'source changes are off by default')
  sent.length=0
  await w(owner,'thread.resolve',{deliverable:'D04-QC',number:2})
  await w(owner,'version.save',{deliverable:'D04-DR',base:1,content:doc('Draft 2')},{},'Claude')
  await w(owner,'version.save',{deliverable:'D04-QC',base:1,content:doc('Draft 2')},{},'Claude')
  await pg.query("UPDATE ctis.mail SET due_at=now()")
  await deliverMail(db,send)
  assert.deepEqual(subjects(),['owner@example.org | Consent form is ready for your approval'])
  // A revoked person gets nothing that was still queued.
  await w(owner,'comment.create',{deliverable:'D04-QC',version:2,text:'FYI @Sofia',mentions:[reviewer.email]})
  const share=(await run(owner,{op:'share.list',input:{}})).shares[0]
  await w(owner,'share.revoke',{id:share.id})
  sent.length=0;await pg.query("UPDATE ctis.mail SET due_at=now()");await deliverMail(db,send)
  assert.ok(!sent.some(j=>j.recipient===reviewer.email))
  // Failed sends are retried later, not lost.
  await w(owner,'resource.record',{category:'source',name:'Protocol',type:'Protocol',version:'1.0'},{},'Claude')
  await w(owner,'resource.record',{category:'source',name:'Protocol',type:'Protocol',version:'2.0'},{},'Claude')
  await w(owner,'preferences.save',{source:true})
  await pg.query("UPDATE ctis.mail SET due_at=now()")
  assert.equal(await deliverMail(db,async()=>{throw new Error('provider down')}),0)
  const [job]=(await pg.query("SELECT attempts,sent_at FROM ctis.mail WHERE category='source'")).rows
  assert.equal(job.attempts,1);assert.equal(job.sent_at,null)
})
