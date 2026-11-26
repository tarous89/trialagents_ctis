import {test,before,after} from 'node:test'
import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import {randomUUID} from 'node:crypto'
import {PGlite} from '@electric-sql/pglite'
import {ctis} from '../app/server/store.mjs'

const pg=new PGlite()
const db={transaction:fn=>pg.transaction(tx=>fn(async(sql,p)=>(await tx.query(sql,p)).rows))}
const run=ctis(db)
const owner={id:'u:owner',email:'owner@example.org',firstName:'Alex',lastName:'Morgan'}
const reviewer={id:'u:reviewer',email:'sofia@example.org',firstName:'Sofia',lastName:'Ruiz'}
const editor={id:'u:editor',email:'editor@example.org',firstName:'Lee',lastName:'Chan'}
const stranger={id:'u:stranger',email:'stranger@example.org'}
let project,revision
const w=(op,input={},extra={})=>({op,project,input,requestId:randomUUID(),revision,...extra})
const r=(op,input={})=>({op,project,input})
const section=(id,text,heading='')=>({id,heading,blocks:[{type:'paragraph',text}]})
const doc=(...sections)=>({title:'',sections})
const err=(status,re)=>e=>e.status===status&&(!re||re.test(e.message))

before(async()=>{
  const schema=await readFile(new URL('../app/server/schema.sql',import.meta.url),'utf8')
  await pg.exec(schema);await pg.exec(schema) // migrations are additive and safe to rerun
})
after(()=>pg.close())

const plan={
  documents:[
    {id:'D01',name:'Protocol synopsis',part:'I',country:'EU',language:'en',filename:'EX101_SYN_EU_en'},
    {id:'D04',name:'Participant information & consent',part:'II',country:'DE',language:'de',filename:'EX101_ICF_DE_de'},
    {id:'D07',name:'Participant information & consent',part:'II',country:'ES',language:'es',filename:'EX101_ICF_ES_es'}
  ],
  steps:[{type:'draft'},{type:'checklist'},{type:'qc'},{type:'style'}],
  not_applicable:[{document:'D01',step:'ST'}]
}

test('create a project and save a plan; retries replay, stale revisions are refused',async()=>{
  const created=await run(owner,{op:'project.create',requestId:randomUUID(),input:{code:'EX-101',name:'EX-101 initial application',countries:['DE']}},'Claude')
  project=created.project.id;revision=0
  const save=w('plan.save',plan)
  const saved=await run(owner,save,'Claude')
  assert.deepEqual(saved.steps.map(s=>s.id),['DR','CL','QC','ST'])
  assert.deepEqual(saved.project.countries,['DE','ES'],'Part II countries are added to the project')
  assert.equal(saved.project.revision,1)
  assert.deepEqual(await run(owner,save,'Claude'),saved,'the same request ID returns the first result')
  await assert.rejects(run(owner,{...save,input:{...plan,steps:[{type:'draft'}]}},'Claude'),err(409,/different change/))
  await assert.rejects(run(owner,w('plan.save',plan),'Claude'),err(409,/changed since/))
  revision=1
  assert.deepEqual(saved.next,{deliverable:'D01-DR',document:'D01',step:'DR'})
  assert.equal(saved.documents[0].cells.at(-1).status,'not_applicable')
})

test('the loop: each save returns the next deliverable, one document at a time',async()=>{
  const v1=await run(owner,w('version.save',{deliverable:'D01-DR',base:0,content:doc(section('S01','The study enrols adults aged 18 or older.'))}),'Claude')
  assert.equal(v1.n,1);assert.equal(v1.status.status,'done')
  assert.deepEqual(v1.next,{deliverable:'D01-CL',document:'D01',step:'CL'})
  await assert.rejects(run(owner,w('version.save',{deliverable:'D01-QC',base:0,content:doc(section('S01','x'))}),'Claude'),err(409,/Run D01-CL first/))
  await assert.rejects(run(owner,w('version.save',{deliverable:'D01-DR',base:0,content:doc(section('S01','x'))}),'Claude'),err(409,/newer version/))
  const cl=await run(owner,w('version.save',{deliverable:'D01-CL',base:0,content:doc(section('S01','All sections present.'))}),'Claude')
  const qc=await run(owner,w('version.save',{deliverable:'D01-QC',base:0,content:doc(section('S01','The study enrols adults aged 18 or older.')),
    claims:[{section:'S01',text:'adults aged 18 or older',kind:'source',source:{name:'EX-101 protocol',version:'3.0',locator:'§4.1',quote:'Adults aged 18 years or older.'}}]}),'Claude')
  assert.deepEqual([cl.next.deliverable,qc.next.deliverable],['D01-QC','D04-DR'],'D01 has no style step, so the loop moves to D04')
})

test('a finding blocks the document; the loop moves on to the next document',async()=>{
  await run(owner,w('version.save',{deliverable:'D04-DR',base:0,content:doc(section('S01','Besuch in Woche 12.'),section('S02','Reisekosten bis 50 € pro Besuch.'))}),'Claude')
  await run(owner,w('version.save',{deliverable:'D04-CL',base:0,content:doc(section('S01','Checklist passed.'))}),'Claude')
  const qc=await run(owner,w('version.save',{deliverable:'D04-QC',base:0,content:doc(section('S01','Besuch in Woche 12.'),section('S02','Reisekosten bis 50 € pro Besuch.')),
    findings:[{category:'conflict',text:'The source caps reimbursement at €50 for documented expenses.',section:'S02',key:'reimbursement'}]}),'Claude')
  assert.equal(qc.status.status,'action_required')
  assert.deepEqual(qc.findings,[{number:1,category:'conflict',text:'The source caps reimbursement at €50 for documented expenses.'}])
  assert.equal(qc.next.deliverable,'D07-DR')
  await assert.rejects(run(owner,w('version.save',{deliverable:'D04-ST',base:0,content:doc(section('S01','x'))}),'Claude'),err(409,/needs action.*ask whether to move on/))
})

test('people-only actions are refused from an assistant; ignore and continue is per version',async()=>{
  await assert.rejects(run(owner,w('continue.set',{deliverable:'D04-QC',n:1}),'Claude'),err(403,/Only a person/))
  await run(owner,w('continue.set',{deliverable:'D04-QC',n:1}),'web')
  let read=await run(owner,r('project.read'))
  const d04=read.documents.find(d=>d.id==='D04')
  assert.deepEqual(d04.cells.map(c=>c.status),['done','done','action_required','waiting'])
  assert.equal(d04.cells[2].continued,true)
  assert.equal(read.next.deliverable,'D04-ST','continuing lets the next step run')
  await run(owner,w('continue.undo',{deliverable:'D04-QC'}),'web')
  read=await run(owner,r('project.read'))
  assert.equal(read.next.deliverable,'D07-DR')
})

test('revise with changed sections only; findings on untouched sections carry over; addressed comments resolve',async()=>{
  const c=await run(owner,w('comment.create',{deliverable:'D04-QC',version:1,text:'Keep the condition about documented expenses.',anchor:{section:'S02',quote:'50 €'}}),'web')
  assert.equal(c.number,2,'findings and comments share one numbered list')
  // A finding on S01 that the revision will not touch.
  await assert.rejects(run(owner,w('version.save',{deliverable:'D04-QC',base:1,changes:{sections:[section('S09','x')],remove:['S09']}}),'Claude'),err(400))
  const rev=await run(owner,w('version.save',{deliverable:'D04-QC',base:1,
    changes:{sections:[section('S02','Dokumentierte Reisekosten werden bis 50 € pro Besuch erstattet.')]},
    claims:[{section:'S02',text:'up to €50 for documented expenses',kind:'source',source:{name:'Country operations manual',locator:'DE §3',quote:'Documented travel expenses may be reimbursed up to €50 per visit.'}}],
    addressed:[{thread:2,reply:'Rewrote S02 to keep the documented-expenses condition.'}]}),'Claude')
  assert.equal(rev.n,2);assert.equal(rev.status.status,'done','the conflict on S02 is superseded and the comment resolved')
  const read=await run(reviewer.id&&owner,r('deliverable.read',{deliverable:'D04-QC'}))
  assert.deepEqual(read.version.content.sections.map(s=>s.blocks[0].text),['Besuch in Woche 12.','Dokumentierte Reisekosten werden bis 50 € pro Besuch erstattet.'])
  assert.deepEqual(read.version.claims.map(x=>x.section),['S02'])
  assert.deepEqual(read.threads.map(t=>[t.number,t.status,t.resolved_by]),[[1,'resolved','system'],[2,'resolved','u:owner']])
  assert.equal(read.threads[1].replies[0].source,'Claude')
  // Re-reporting a known key reopens the same thread and number.
  const again=await run(owner,w('version.save',{deliverable:'D04-QC',base:2,changes:{sections:[section('S01','Besuch in Woche 12 (Tag 84).')]},
    findings:[{category:'decision',text:'Day 84 or week 12?',section:'S01',key:'reimbursement'}]}),'Claude')
  assert.deepEqual(again.findings.map(f=>f.number),[1])
})

test('no cascade: a new draft marks later steps source changed until rerun',async()=>{
  const read=await run(owner,r('project.read'))
  const d01=read.documents.find(d=>d.id==='D01')
  assert.equal(d01.final.status,'awaiting_approval')
  await run(owner,w('version.save',{deliverable:'D01-DR',base:1,changes:{sections:[section('S01','The study enrols adults aged 18 to 75.')]}}),'Claude')
  const after=(await run(owner,r('project.read'))).documents.find(d=>d.id==='D01')
  assert.deepEqual(after.cells.map(c=>[c.status,c.sourceChanged]),[['done',false],['action_required',true],['waiting',false],['not_applicable',false]])
  const rerun=await run(owner,w('version.save',{deliverable:'D01-CL',base:1,content:doc(section('S01','All sections present.'))}),'Claude')
  assert.equal(rerun.status.status,'done')
})

test('only the owner approves, in the app, the current version of the last step',async()=>{
  const read=await run(owner,r('project.read'))
  assert.equal(read.next.deliverable,'D07-DR','D01-QC still shows source changed until the user asks for a rerun')
  await run(owner,w('version.save',{deliverable:'D01-QC',base:1,content:doc(section('S01','The study enrols adults aged 18 to 75.'))}),'Claude')
  await assert.rejects(run(owner,w('approval.create',{deliverable:'D01-QC',n:2}),'Claude'),err(403))
  await assert.rejects(run(owner,w('approval.create',{deliverable:'D01-QC',n:1}),'web'),err(409,/current version/))
  await run(owner,w('approval.create',{deliverable:'D01-QC',n:2}),'web')
  const d01=(await run(owner,r('project.read'))).documents.find(d=>d.id==='D01')
  assert.deepEqual(d01.final,{status:'approved',step:'QC',version:2})
  await run(owner,w('version.save',{deliverable:'D01-QC',base:2,changes:{sections:[section('S01','Adults aged 18 to 75.')]}}),'Claude')
  const kept=(await run(owner,r('project.read'))).documents.find(d=>d.id==='D01')
  assert.deepEqual(kept.final,{status:'approved',step:'QC',version:2},'the approved version stays until the new one is approved')
})

test('restore creates a new version and brings back that version’s findings',async()=>{
  const r1=await run(owner,r('deliverable.read',{deliverable:'D04-QC'}))
  const cur=r1.version.n
  await assert.rejects(run(owner,w('version.restore',{deliverable:'D04-QC',n:1,base:cur}),'Claude'),err(403))
  const res=await run(owner,w('version.restore',{deliverable:'D04-QC',n:1,base:cur}),'web')
  assert.equal(res.n,cur+1)
  const r2=await run(owner,r('deliverable.read',{deliverable:'D04-QC'}))
  assert.equal(r2.version.restored_from,1)
  assert.equal(r2.status.status,'action_required')
})

test('sharing needs the Team plan; roles and scopes limit what people see and do',async()=>{
  await assert.rejects(run(owner,w('share.create',{email:reviewer.email,scope:'document',document:'D04',role:'commenter'}),'web'),err(402))
  await pg.query("UPDATE ctis.account SET plan='team' WHERE user_id=$1",[owner.id])
  await assert.rejects(run(owner,w('share.create',{email:reviewer.email,scope:'document',document:'D04',role:'commenter'}),'Claude'),err(403))
  await run(owner,w('share.create',{email:reviewer.email,scope:'document',document:'D04',role:'commenter'}),'web')
  await run(owner,w('share.create',{email:editor.email,scope:'project',role:'editor'}),'web')
  await assert.rejects(run(stranger,r('project.read')),err(404))
  const seen=await run(reviewer,r('project.read'))
  assert.deepEqual(seen.documents.map(d=>d.id),['D04']);assert.equal(seen.next,null)
  assert.equal((await run(reviewer,r('deliverable.read',{deliverable:'D04-QC'}))).resources,null,'document shares do not see sources')
  await assert.rejects(run(reviewer,r('deliverable.read',{deliverable:'D01-DR'})),err(404))
  const n=(await run(reviewer,r('deliverable.read',{deliverable:'D04-QC'}))).version.n
  await run(reviewer,w('comment.create',{deliverable:'D04-QC',version:n,text:'@Alex please check',mentions:[owner.email]}),'web')
  await assert.rejects(run(reviewer,w('comment.create',{deliverable:'D04-QC',version:n,text:'x',mentions:[stranger.email]}),'web'),err(400,/Invite/))
  await assert.rejects(run(reviewer,w('version.save',{deliverable:'D04-QC',base:n,changes:{sections:[section('S01','x')]}}),'Claude'),err(403,/comment/))
  await assert.rejects(run(reviewer,w('continue.set',{deliverable:'D04-QC',n}),'web'),err(403))
  // A project editor can run the plan through their own assistant, but cannot plan, share or approve.
  assert.ok((await run(editor,r('next.step'))).deliverable)
  await assert.rejects(run(editor,w('plan.save',plan),'Claude'),err(403))
  await assert.rejects(run(editor,w('approval.create',{deliverable:'D04-ST',n:1}),'web'),err(403))
  const list=await run(editor,{op:'project.list',input:{}})
  assert.equal(list.shared[0].owner_name,'Alex Morgan')
  // When the Team plan lapses, shared access stops; the owner keeps everything.
  await pg.query("UPDATE ctis.account SET paid_until=now()-interval '1 day' WHERE user_id=$1",[owner.id])
  await assert.rejects(run(editor,r('project.read')),err(404))
  assert.ok((await run(owner,r('project.read'))).documents.length)
  await pg.query("UPDATE ctis.account SET paid_until=NULL WHERE user_id=$1",[owner.id])
})

test('sources: project list, document overrides and the snapshot on each version',async()=>{
  const p=await run(owner,{...w('resource.record',{category:'source',name:'EX-101 protocol',type:'Protocol',version:'3.0',doc_date:'2026-09-14'})},'Claude')
  const m=await run(owner,{...w('resource.record',{category:'source',name:'Country operations manual',type:'Study manual',version:'2.0',attach_to_project:false})},'Claude')
  assert.equal(p.attached,true);assert.equal(m.attached,false)
  await run(owner,w('document.resources.set',{document:'D04',add:[m.resource]}),'web')
  const read=await run(owner,r('deliverable.read',{deliverable:'D04-QC'}))
  assert.deepEqual(read.resources.map(x=>x.name).sort(),['Country operations manual','EX-101 protocol'])
  const d07=(await run(owner,r('deliverable.read',{deliverable:'D07-DR'})))
  assert.deepEqual(d07.resources.map(x=>x.name),['EX-101 protocol'])
  const saved=await run(owner,w('version.save',{deliverable:'D07-DR',base:0,content:doc(section('S01','Visita en la semana 12.'))}),'Claude')
  const v=(await run(owner,r('deliverable.read',{deliverable:'D07-DR'}))).version
  assert.equal(saved.n,1);assert.deepEqual(v.resources.map(x=>x.version),['3.0'])
  await run(owner,w('resources.set',{resources:[]}),'web')
  assert.deepEqual((await run(owner,r('deliverable.read',{deliverable:'D07-DR'}))).version.resources.map(x=>x.name),['EX-101 protocol'],'snapshots never change')
})

test('duplicate copies the plan and the sources and templates, but no deliverables',async()=>{
  await assert.rejects(run(owner,w('project.duplicate',{code:'EX-101-SM1',name:'EX-101 substantial modification 1'}),'Claude'),err(403))
  const copy=await run(owner,w('project.duplicate',{code:'EX-101-SM1',name:'EX-101 substantial modification 1'}),'web')
  const read=await run(owner,{op:'project.read',project:copy.project.id,input:{}})
  assert.deepEqual(read.documents.map(d=>d.id),['D01','D04','D07'])
  assert.ok(read.documents.every(d=>d.cells.every(c=>c.version===null)))
  assert.equal(read.documents[0].cells.at(-1).status,'not_applicable')
  assert.deepEqual(read.next,{deliverable:'D01-DR',document:'D01',step:'DR'})
  const d04=await run(owner,{op:'deliverable.read',project:copy.project.id,input:{deliverable:'D04-QC'}})
  assert.equal(d04.version,null);assert.deepEqual(d04.threads,[])
  assert.deepEqual(d04.resources.map(x=>x.name),['Country operations manual'],'document overrides are copied')
  await assert.rejects(run(editor,{op:'project.read',project:copy.project.id,input:{}}),err(404),'shares are not copied')
})

test('when the user asks to move on, the assistant runs the next step and flags what is unresolved',async()=>{
  await run(owner,w('version.save',{deliverable:'D07-CL',base:0,content:doc(section('S01','Contact section missing.')),
    findings:[{category:'missing',text:'Provide the local study contact.',section:'S01'}]}),'Claude')
  const ask={deliverable:'D07-QC',base:0,content:doc(section('S01','Visita en la semana 12.'))}
  await assert.rejects(run(owner,w('version.save',ask),'Claude'),e=>e.status===409&&e.details.blocked_by[0]==='D07-CL')
  const moved=await run(owner,w('version.save',{...ask,continue_past:true}),'Claude')
  assert.deepEqual(moved.past_issues,[{deliverable:'D07-CL',version:1,source_changed:false,open:[{number:1,category:'missing',text:'Provide the local study contact.'}]}])
  const d07=(await run(owner,r('project.read'))).documents.find(d=>d.id==='D07')
  assert.deepEqual(d07.cells.slice(1,3).map(c=>[c.status,c.continued]),[['action_required',true],['done',false]],'the earlier step stays action required')
  assert.deepEqual((await run(owner,r('deliverable.read',{deliverable:'D07-QC'}))).version.past_issues[0].deliverable,'D07-CL')
  const {entries}=await run(owner,{op:'logs',input:{limit:5}})
  assert.ok(entries.some(e=>e.action==='continue.set'&&e.source==='Claude'&&e.details.asked_in_chat))
})

test('every change is in Logs with who and through which client',async()=>{
  const {entries}=await run(owner,{op:'logs',input:{limit:100}})
  const actions=new Set(entries.map(e=>e.action))
  for(const a of ['project.created','plan.saved','version.saved','continue.set','final.approved','share.created','comment.created','project.duplicated'])assert.ok(actions.has(a),a)
  assert.ok(entries.some(e=>e.action==='version.saved'&&e.source==='Claude'&&e.actor_name==='Alex Morgan'))
  assert.ok(entries.some(e=>e.action==='final.approved'&&e.source==='web'))
})
