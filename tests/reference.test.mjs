// Populations, the reference package and documents adapted from a reference document (docs/TECHNICAL.md §1–§3).
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
let project,revision
const w=(op,input={},extra={})=>({op,project,input,requestId:randomUUID(),revision,...extra})
const doc=text=>({title:'',sections:[{id:'S01',heading:'',blocks:[{type:'paragraph',text}]}]})
const err=(status,re)=>e=>e.status===status&&(!re||re.test(e.message))

before(async()=>{await pg.exec(await readFile(new URL('../app/server/schema.sql',import.meta.url),'utf8'))})
after(()=>pg.close())

const planning={populations:[{id:'single-dose-adults',label:'Single-dose adults'},{id:'multiple-dose-adults',label:'Multiple-dose adults'}],
  part1_scope:'completed_outside',reference_package:{country:'DE',language:'de'},format_choice:'country_format'}
const documents=[
  {id:'D01',name:'SIS and ICF – single dose – Spain',part:'II',country:'ES',language:'es',code:'L1_SIS-ICF',variant:'adults',filename:'X_L1_ES',population:'single-dose-adults',based_on:'D02'},
  {id:'D02',name:'SIS and ICF – single dose – Germany',part:'II',country:'DE',language:'de',code:'L1_SIS-ICF',variant:'adults',filename:'X_L1_DE',population:'single-dose-adults'}
]
const steps=[{type:'draft'}]

test('the plan stores populations and planning choices; the reference package runs first',async()=>{
  const created=await run(owner,{op:'project.create',requestId:randomUUID(),input:{code:'EX-1',name:'EX-1',countries:['ES','DE']}},'Claude')
  project=created.project.id;revision=0
  await assert.rejects(run(owner,w('plan.save',{documents:[{...documents[0],based_on:'D01'},documents[1]],steps,planning}),'Claude'),err(400,/another document/))
  await assert.rejects(run(owner,w('plan.save',{documents:[{...documents[0],population:'children'},documents[1]],steps,planning}),'Claude'),err(400,/not one of the plan/))
  await assert.rejects(run(owner,w('plan.save',{documents:[documents[0],{...documents[1],based_on:'D01'}],steps,planning}),'Claude'),err(400,/cycle/))
  const saved=await run(owner,w('plan.save',{documents,steps,planning}),'Claude');revision=saved.project.revision
  assert.deepEqual(saved.project.planning.reference_package,{country:'DE',language:'de'})
  assert.equal(saved.project.planning.populations.length,2)
  assert.deepEqual(saved.documents.map(d=>d.id),['D02','D01'],'reference package first, although ES is the first country')
  assert.equal(saved.documents[0].reference_package,true)
  assert.deepEqual(saved.documents[1].reference,{document:'D02',approved:false})
  assert.deepEqual(saved.next,{deliverable:'D02-DR',document:'D02',step:'DR'})
})

test('before drafting from an unapproved reference the run asks; going ahead records it; a later approval flags Reference changed',async()=>{
  const v=await run(owner,w('version.save',{deliverable:'D02-DR',base:0,content:doc('Deutscher Text.')}),'Claude')
  assert.equal(v.next.deliverable,'D01-DR')
  assert.deepEqual(v.next.unapproved_reference,{document:'D02',name:documents[1].name,latest:{step:'DR',n:1}},'not a gate: the next step is named, flagged')
  const ctx=await run(owner,{op:'step.context',project,input:{deliverable:'D01-DR'}},'Claude')
  assert.equal(ctx.reference.document,'D02');assert.equal(ctx.reference.approved,false)
  assert.equal(ctx.reference.content.sections[0].blocks[0].text,'Deutscher Text.')
  assert.equal(ctx.document.population.label,'Single-dose adults');assert.equal(ctx.planning.format_choice,'country_format')
  assert.match(ctx.next,/Before drafting, ask the user/)
  const es=await run(owner,w('version.save',{deliverable:'D01-DR',base:0,content:doc('Texto en español.')}),'Claude')
  assert.equal(es.status.status,'done','going ahead is allowed')
  await run(owner,w('approval.create',{deliverable:'D02-DR',n:1}),'web')
  const plan=await run(owner,{op:'project.read',project,input:{}},'web')
  const d01=plan.documents.find(d=>d.id==='D01')
  assert.equal(d01.cells[0].status,'action_required','drafted from an unapproved version that has since been approved')
  assert.equal(d01.cells[0].referenceChanged,true)
  const ctx2=await run(owner,{op:'step.context',project,input:{deliverable:'D01-DR',revise:true}},'Claude')
  assert.equal(ctx2.reference.approved,true);assert.deepEqual(ctx2.reference.used_for_current,{document:'D02',step:'DR',n:1,approved:false})
  const es2=await run(owner,w('version.save',{deliverable:'D01-DR',base:1,content:doc('Texto revisado.')}),'Claude')
  assert.equal(es2.status.status,'done','redrafted from the approved reference')
  assert.equal(es2.next.unapproved_reference,undefined)
})
