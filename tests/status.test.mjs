import {test} from 'node:test'
import assert from 'node:assert/strict'
import {cell,documentStatuses,finalStatus,nextStep,canApprove,orderedDocuments,WAITING,DONE,ACTION_REQUIRED,NOT_APPLICABLE,APPROVED,AWAITING_APPROVAL} from '../app/server/status.mjs'

const steps=[{id:'DR',position:0},{id:'CL',position:1},{id:'QC',position:2},{id:'ST',position:3}]
function board({documents,na=[],current={},issues={},continued={},approvals={},paused=[]}={}){
  return {
    documents:documents??[{id:'D01',part:'I',country:'EU',position:0},{id:'D04',part:'II',country:'DE',position:1},{id:'D07',part:'II',country:'ES',position:2}],
    steps:steps.map(s=>({...s,paused:paused.includes(s.id)})),countries:['DE','ES'],
    na:new Set(na),current:new Map(Object.entries(current)),issues:new Map(Object.entries(issues)),
    continued:new Map(Object.entries(continued)),approvals:new Map(Object.entries(approvals))
  }
}
// A full chain of versions for a document: DR v1, CL v1 on DR v1, ...
const chain=(doc,upTo=4)=>Object.fromEntries(steps.slice(0,upTo).map((s,i)=>[cell(doc,s.id),{n:1,basis:i?{step:steps[i-1].id,n:1}:null}]))
const st=(b,doc)=>documentStatuses(b,doc).map(x=>x.status)

test('a step without a version waits, and so does everything after it',()=>{
  assert.deepEqual(st(board(),'D01'),[WAITING,WAITING,WAITING,WAITING])
  assert.deepEqual(st(board({current:chain('D01',2)}),'D01'),[DONE,DONE,WAITING,WAITING])
})

test('open findings or comments make a step action required and hold later steps',()=>{
  const b=board({current:chain('D01'),issues:{[cell('D01','CL')]:1}})
  assert.deepEqual(st(b,'D01'),[DONE,ACTION_REQUIRED,WAITING,WAITING])
  assert.equal(documentStatuses(b,'D01')[2].blockedBy,'CL')
})

test('ignore and continue unblocks later steps for that version only; the step stays action required',()=>{
  const cur=chain('D01')
  const b=board({current:cur,issues:{[cell('D01','CL')]:1},continued:{[cell('D01','CL')]:1}})
  assert.deepEqual(st(b,'D01'),[DONE,ACTION_REQUIRED,DONE,DONE])
  cur[cell('D01','CL')]={n:2,basis:{step:'DR',n:1}}
  const later=board({current:cur,issues:{[cell('D01','CL')]:1},continued:{[cell('D01','CL')]:1}})
  // A new CL version clears the continue, and QC now ran on an older CL version.
  assert.deepEqual(st(later,'D01'),[DONE,ACTION_REQUIRED,WAITING,WAITING])
})

test('a new version of an earlier step does not cascade: later steps show source changed',()=>{
  const cur=chain('D01');cur[cell('D01','DR')]={n:2,basis:null}
  const s=documentStatuses(board({current:cur}),'D01')
  assert.deepEqual(s.map(x=>x.status),[DONE,ACTION_REQUIRED,WAITING,WAITING])
  assert.equal(s[1].sourceChanged,true)
})

test('paused and not applicable steps are skipped; the last applicable step is the final document',()=>{
  const b=board({current:{...chain('D04',3)},na:[cell('D04','ST')]})
  assert.deepEqual(st(b,'D04'),[DONE,DONE,DONE,NOT_APPLICABLE])
  assert.deepEqual(finalStatus(b,'D04'),{status:AWAITING_APPROVAL,step:'QC',version:1})
  const p=board({current:{[cell('D01','DR')]:{n:1,basis:null},[cell('D01','QC')]:{n:1,basis:{step:'DR',n:1}}},paused:['CL','ST']})
  assert.deepEqual(st(p,'D01'),[DONE,NOT_APPLICABLE,DONE,NOT_APPLICABLE])
})

test('approval binds to the last step and version; a newer version keeps the approval shown',()=>{
  const cur=chain('D01')
  assert.equal(canApprove(board({current:cur}),'D01','QC',1),'Only the last step of a document can be approved')
  assert.equal(canApprove(board({current:cur}),'D01','ST',2),'Only the current version can be approved')
  assert.equal(canApprove(board({current:cur}),'D01','ST',1),null)
  assert.equal(canApprove(board({current:cur,issues:{[cell('D01','ST')]:1}}),'D01','ST',1),'This document is not ready for approval')
  cur[cell('D01','ST')]={n:2,basis:{step:'QC',n:1}}
  assert.deepEqual(finalStatus(board({current:cur,approvals:{D01:[{step:'ST',n:1}]}}),'D01'),{status:APPROVED,step:'ST',version:1})
})

test('order is Part I first, then countries in project order, then position',()=>{
  const b=board({documents:[{id:'D09',part:'II',country:'ES',position:0},{id:'D02',part:'II',country:'DE',position:5},{id:'D05',part:'I',country:'EU',position:9},{id:'D03',part:'II',country:'FR',position:1}]})
  assert.deepEqual(orderedDocuments(b).map(d=>d.id),['D05','D02','D09','D03'])
})

test('the loop runs one document at a time and skips blocked documents',()=>{
  assert.deepEqual(nextStep(board()),{deliverable:'D01-DR',document:'D01',step:'DR'})
  assert.deepEqual(nextStep(board({current:chain('D01',2)})),{deliverable:'D01-QC',document:'D01',step:'QC'})
  const blocked=board({current:{...chain('D01',2),...chain('D04',1)},issues:{[cell('D01','CL')]:2}})
  assert.deepEqual(nextStep(blocked),{deliverable:'D04-CL',document:'D04',step:'CL'})
})

test('the loop stops when every document is final or blocked',()=>{
  const b=board({current:{...chain('D01'),...chain('D04'),...chain('D07')},issues:{[cell('D04','QC')]:1},approvals:{D07:[{step:'ST',n:1}]}})
  assert.deepEqual(nextStep(b),{stop:true,summary:{approved:['D07'],awaitingApproval:['D01'],blocked:[{document:'D04',step:'QC',deliverable:'D04-QC'}],waiting:[]}})
})
