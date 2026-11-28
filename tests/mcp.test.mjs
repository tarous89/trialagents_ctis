import {test} from 'node:test'
import assert from 'node:assert/strict'
import {randomUUID} from 'node:crypto'
import {readFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import {PGlite} from '@electric-sql/pglite'
import {ctis} from '../app/server/store.mjs'
import {publishCatalog} from '../app/server/catalog.mjs'
import {loadCoreCatalogDir as loadCatalogDir} from '../app/server/catalog-files.mjs'
import {ctisHttp,protectedResource,claudeResource,metadataPath} from '../mcp/http.mjs'

test('Claude runs a submission over MCP: plan, loop, block, resume in a new conversation, revise',async t=>{
  const pg=new PGlite();t.after(()=>pg.close())
  await pg.exec(await readFile(new URL('../app/server/schema.sql',import.meta.url),'utf8'))
  const db={transaction:fn=>pg.transaction(tx=>fn(async(sql,p)=>(await tx.query(sql,p)).rows))}
  await publishCatalog(db,await loadCatalogDir(fileURLToPath(new URL('../catalog',import.meta.url))))
  const store=ctis(db),user={id:'u:alex',email:'alex@example.org',firstName:'Alex',lastName:'Morgan'}
  const serve=ctisHttp({authorize:(token,aud)=>token==='good'&&aud===claudeResource?user:null,run:store})
  let id=0
  const post=(method,params,token='good')=>serve(new Request(claudeResource,{method:'POST',
    headers:{authorization:'Bearer '+token,'content-type':'application/json',accept:'application/json, text/event-stream'},
    body:JSON.stringify({jsonrpc:'2.0',id:++id,method,params})}))
  async function rpc(method,params={}){
    const res=await post(method,params),raw=await res.text();assert.equal(res.status,200,raw)
    const json=JSON.parse(raw.startsWith('{')?raw:raw.split('\n').find(l=>l.startsWith('data: ')).slice(6));assert.ifError(json.error);return json.result
  }
  const call=async(name,args)=>{const r=await rpc('tools/call',{name,arguments:args});assert.ok(!r.isError,r.content?.[0]?.text);return r.structuredContent.result}
  const fails=async(name,args)=>{const r=await rpc('tools/call',{name,arguments:args});assert.ok(r.isError,'expected an error');return r.content[0].text}
  const save=(args)=>call('save_ctis',{request_id:randomUUID(),...args})

  await t.test('sign-in and discovery',async()=>{
    const res=await post('tools/list',{},'bad');assert.equal(res.status,401)
    assert.ok(res.headers.get('www-authenticate').includes(metadataPath(claudeResource)))
    const meta=await protectedResource(undefined,claudeResource).json()
    assert.equal(meta.resource,'https://mcp.trialagents.com/ctis/claude');assert.equal(meta.resource_documentation,'https://ctis.trialagents.com/ctis-info/connectors')
    const init=await rpc('initialize',{protocolVersion:'2025-11-25',clientInfo:{name:'test',version:'1'},capabilities:{}})
    assert.equal(init.serverInfo.name,'TrialAgents CTIS');assert.match(init.instructions,/get_ctis_step/)
  })

  await t.test('six tools; only save_ctis writes, and it never overwrites or deletes',async()=>{
    const {tools:listed}=await rpc('tools/list')
    const appOnly=listed.filter(x=>x._meta.ui?.visibility?.includes('app')),tools=listed.filter(x=>!appOnly.includes(x))
    assert.deepEqual(appOnly.map(x=>x.name),['ctis_workspace_request'],'the workspace view’s own tool is hidden from the model')
    assert.deepEqual(tools.map(x=>x.name),['open_ctis','read_ctis','read_ctis_catalog','get_ctis_step','read_ctis_source','save_ctis'])
    assert.deepEqual(tools.filter(x=>x._meta.ui?.resourceUri).map(x=>x.name),['open_ctis','save_ctis'],'opening and every save show the workspace view')
    for(const x of tools){
      assert.equal(x.inputSchema.type,'object');assert.ok(!x.inputSchema.oneOf&&!x.inputSchema.anyOf)
      assert.equal(x.annotations.readOnlyHint,x.name!=='save_ctis',x.name)
      assert.equal(x.annotations.destructiveHint,false,x.name)
      assert.equal(x.securitySchemes[0].type,'oauth2')
    }
    for(const word of ['approv','share','invite','upload','delete','continue.set'])assert.ok(!tools.some(x=>x.name.includes(word)),word)
  })

  let project
  await t.test('plan: planning catalog, project, plan shown in the workspace',async()=>{
    const planning=await call('read_ctis_catalog',{what:'planning',countries:['DE'],submission_type:'Initial application'})
    assert.match(planning.naming.text,/Filename/);assert.match(planning.instructions.text,/planning checklist/i);assert.deepEqual(planning.missing,['Part I','DE'])
    const created=await save({action:'create_project',code:'EX-101',name:'EX-101 initial application',sponsor:'Example Bio GmbH',submission_type:'Initial application'})
    project=created.project.id;assert.match(created.next_hint,/save_plan/)
    const plan=await save({action:'save_plan',project,revision:0,
      documents:[{id:'D01',name:'Protocol synopsis',part:'I',country:'EU',language:'en',code:'D1_protocol-synopsis',filename:'EX101_D1_protocol-synopsis_EU_en'},
        {id:'D04',name:'SIS and ICF – adults',part:'II',country:'DE',language:'de',code:'L1_SIS-ICF',variant:'adults',filename:'EX101_L1_SIS-ICF_adults_DE_de'},
        {id:'D05',name:'Recruitment arrangements',part:'II',country:'DE',language:'en',code:'K1_recruitment-arrangements',filename:'EX101_K1_recruitment-arrangements_DE_en'}],
      steps:[{type:'draft'},{type:'qc'},{type:'style'}],not_applicable:[{document:'D01',step:'ST'}]})
    assert.deepEqual(plan.steps,['DR Draft','QC Source QC','ST Style']);assert.match(plan.url,/^https:\/\/ctis\.trialagents\.com\/\?project=/)
    assert.deepEqual(plan.open,{view:'plan',project},'after saving a plan, the workspace opens on it')
    assert.doesNotMatch(plan.next_hint,/open_ctis/,'no second call: the save shows the workspace itself')
    await fails('save_ctis',{action:'save_plan',request_id:randomUUID(),project,revision:0,documents:[],steps:[{type:'draft'}]})
  })

  await t.test('the loop: each step’s context comes from the server; findings block; the loop moves on',async()=>{
    const first=await call('get_ctis_step',{project})
    assert.equal(first.deliverable,'D01-DR');assert.equal(first.base,0)
    assert.deepEqual(first.instructions.map(i=>i.id),['draft','findings'])
    assert.ok(first.styling.instructions.some(x=>x.from==='design'),'draft gets the general styling instructions')
    const doc=(t)=>({title:'',sections:[{id:'S01',heading:'Summary',blocks:[{type:'paragraph',text:t}]}]})
    let r=await save({action:'save_version',project,deliverable:'D01-DR',base:0,content:doc('Adults aged 18 or older.')})
    assert.match(r.next_hint,/next is D01-QC/)
    const qc=await call('get_ctis_step',{project})
    assert.equal(qc.input.deliverable,'D01-DR');assert.equal(qc.input.content.sections[0].blocks[0].text,'Adults aged 18 or older.')
    r=await save({action:'save_version',project,deliverable:'D01-QC',base:0,content:doc('Adults aged 18 or older.'),
      claims:[{section:'S01',text:'adults aged 18 or older',kind:'source',source:{name:'EX-101 protocol',version:'3.0',locator:'§4.1',quote:'Adults aged 18 years or older.'}}]})
    assert.match(r.next_hint,/next is D04-DR/)
    const d04=await call('get_ctis_step',{project})
    assert.deepEqual(d04.styling.instructions.map(x=>x.from),['design','default','L1_SIS-ICF'])
    r=await save({action:'save_version',project,deliverable:'D04-DR',base:0,content:doc('Reisekosten bis 50 € pro Besuch.'),
      findings:[{category:'conflict',text:'The manual caps reimbursement at €50 for documented expenses.',section:'S01',key:'reimbursement'}]})
    assert.equal(r.status.status,'action_required');assert.match(r.next_hint,/next is D05-DR/)
  })

  await t.test('a new conversation resumes from the server, and moving past issues needs the user',async()=>{
    // No chat history: a fresh call finds the next step.
    const next=await call('get_ctis_step',{project})
    assert.equal(next.deliverable,'D05-DR')
    const blocked=await call('get_ctis_step',{project,deliverable:'D04-QC'})
    assert.equal(blocked.blocked_by,'D04-DR');assert.match(blocked.next,/continue_past/)
    assert.deepEqual(blocked.earlier_issues[0].open.map(o=>o.category),['conflict'])
    const text=await fails('save_ctis',{action:'save_version',request_id:randomUUID(),project,deliverable:'D04-QC',base:0,content:{title:'',sections:[{id:'S01',heading:'',blocks:[]}]}})
    assert.match(text,/needs action.*ask whether to move on/)
  })

  await t.test('revise: the server sends the comments; only changed sections come back',async()=>{
    await store(user,{op:'comment.create',project,requestId:randomUUID(),input:{deliverable:'D04-DR',version:1,text:'Keep the condition about documented expenses.',anchor:{section:'S01'}}},'web')
    const ctx=await call('get_ctis_step',{project,deliverable:'D04-DR',revise:true})
    assert.deepEqual(ctx.threads.map(x=>[x.number,x.kind]),[[1,'finding'],[2,'comment']])
    assert.equal(ctx.revision.version,1);assert.match(ctx.output,/changes/)
    assert.deepEqual(ctx.instructions.map(i=>i.id),['revision','draft','findings'])
    const r=await save({action:'save_version',project,deliverable:'D04-DR',base:1,
      changes:{sections:[{id:'S01',heading:'Reisekosten',blocks:[{type:'paragraph',text:'Dokumentierte Reisekosten werden bis 50 € pro Besuch erstattet.'}]}]},
      addressed:[{thread:2,reply:'Kept the documented-expenses condition.'}]})
    assert.equal(r.status.status,'done');assert.equal(r.n,2)
    const read=await call('read_ctis',{project,deliverable:'D04-DR'})
    assert.equal(read.threads.find(x=>x.number===2).replies[0].source,'Claude')
  })

  await t.test('the Style step fills the form; the result links to the workspace',async()=>{
    const doc={title:'Recruitment arrangements',sections:[{id:'S01',heading:'Recruitment',blocks:[{type:'paragraph',text:'See form.'}]}]}
    await save({action:'save_version',project,deliverable:'D05-DR',base:0,content:doc})
    await save({action:'save_version',project,deliverable:'D05-QC',base:0,content:doc})
    const style=await call('get_ctis_step',{project,deliverable:'D05-ST'})
    assert.equal(style.styling.kind,'form');assert.ok(style.styling.slots.some(x=>x.id==='kv108'&&x.accepts==='choice'))
    const bad=await fails('save_ctis',{action:'save_version',request_id:randomUUID(),project,deliverable:'D05-ST',base:0,content:doc,fill:{wrong:'x'}})
    assert.match(bad,/Unknown Word fields: wrong/)
    const r=await save({action:'save_version',project,deliverable:'D05-ST',base:0,content:doc,fill:{kv101:'EX-101',kv102:'2026-500123-45-00',date:'1 Dec 2026',kv107:'false',kv108:'false',kv109:'false',kv110:'false'}})
    assert.equal(r.file,'EX101_K1_recruitment-arrangements_DE_en_v1.docx')
    assert.ok(r.findings.every(f=>f.category==='missing'),'required answers not given are reported')
    assert.match(r.url,/deliverable=D05-ST/)
  })

  await t.test('reads and sources',async()=>{
    const list=await call('read_ctis',{});assert.equal(list.projects[0].code,'EX-101')
    const plan=await call('read_ctis',{project});assert.ok(plan.documents.length===3);assert.ok(plan.next_hint)
    const open=await call('open_ctis',{project,deliverable:'D04-DR'});assert.match(open.url,/deliverable=D04-DR/)
    const item=await call('read_ctis_catalog',{what:'item',id:'K1_recruitment-arrangements_DE'});assert.equal(item.kind,'form')
    const found=await call('read_ctis_catalog',{what:'search',category:'styling',code:'L1_SIS-ICF'});assert.deepEqual(found.items.map(i=>i.id),['L1_SIS-ICF'])
    const src=await call('read_ctis_source',{project,query:'adults'});assert.deepEqual(src.passages,[])
    assert.match(await fails('read_ctis_source',{project}),/needs resource/)
    const {entries}=await call('read_ctis',{project,logs:true})
    assert.ok(entries.every(e=>['Claude','web'].includes(e.source)))
  })
})
