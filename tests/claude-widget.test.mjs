// The workspace inside Claude: the bundled view in an MCP Apps host bridge, under Claude's sandbox policy.
import {test} from 'node:test'
import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import {execFileSync} from 'node:child_process'
import {randomUUID} from 'node:crypto'
import {build} from 'esbuild'
import {chromium} from 'playwright-core'
import {PGlite} from '@electric-sql/pglite'
import {ctis} from '../app/server/store.mjs'
import {publishCatalog} from '../app/server/catalog.mjs'
import {loadCatalogDir} from '../app/server/catalog-files.mjs'
import {seedExamples,people} from '../app/server/examples.mjs'
import {ctisHttp,claudeResource} from '../mcp/http.mjs'

const root=new URL('../',import.meta.url)
const read=f=>readFile(new URL('dist/'+f,root),'utf8')

test('the Claude view is self-contained and uses Claude wording',async()=>{
  execFileSync(process.execPath,[fileURLToPath(new URL('scripts/build.mjs',root))],{stdio:'ignore'})
  const html=await read('ctis-claude.html')
  for(const phrase of ['ctis_workspace_request','Open TrialAgents app'])assert.ok(html.includes(phrase),phrase)
  assert.ok(!/<script[^>]+src=/.test(html),'no external scripts');assert.ok(!html.includes('/ctis-assets/'))
})

test('Claude shows the workspace, works through the app-only tool, and sends assistant actions to the chat',async t=>{
  const pg=new PGlite();t.after(()=>pg.close())
  await pg.exec(await readFile(new URL('app/server/schema.sql',root),'utf8'))
  const db={transaction:fn=>pg.transaction(tx=>fn(async(sql,p)=>(await tx.query(sql,p)).rows))}
  await publishCatalog(db,await loadCatalogDir(fileURLToPath(new URL('catalog',root))))
  const store=ctis(db),ids=await seedExamples(store,{db}),user=people.alex
  const serve=ctisHttp({audience:claudeResource,authorize:async()=>user,run:store,readWidget:()=>read('ctis-claude.html')})
  async function mcp(method,params){
    const res=await serve(new Request(claudeResource,{method:'POST',headers:{authorization:'Bearer x','content-type':'application/json',accept:'application/json, text/event-stream'},body:JSON.stringify({jsonrpc:'2.0',id:1,method,params})}))
    const raw=await res.text(),json=JSON.parse(raw.startsWith('{')?raw:raw.split('\n').find(l=>l.startsWith('data: ')).slice(6))
    assert.ifError(json.error);return json.result
  }
  const tool=(name,args)=>mcp('tools/call',{name,arguments:args})
  const {tools}=await mcp('tools/list',{})
  const uri=tools.find(x=>x.name==='open_ctis')._meta.ui.resourceUri
  const {contents:[resource]}=await mcp('resources/read',{uri})
  assert.equal(resource.mimeType,'text/html;profile=mcp-app');assert.deepEqual(resource._meta.ui.csp.connectDomains,[])
  assert.ok((await tool('ctis_workspace_request',{request:{op:'project.create',input:{code:'X',name:'X'},requestId:randomUUID()}})).isError,'projects are created in the chat')
  const open=await tool('open_ctis',{project:ids.ex101})
  assert.equal(open.structuredContent.result.view,'plan')

  const host=await build({stdin:{resolveDir:fileURLToPath(root),contents:`
    import {AppBridge,PostMessageTransport} from '@modelcontextprotocol/ext-apps/app-bridge';
    const iframe=document.querySelector('iframe'),bridge=new AppBridge(null,{name:'test',version:'1'},{serverTools:{},openLinks:{},message:{text:{}},downloadFile:{}});
    bridge.oncalltool=p=>window.dispatch(p);bridge.onopenlink=p=>window.opened(p.url).then(()=>({}));
    bridge.onmessage=p=>window.sent(p).then(()=>({}));
    bridge.oninitialized=()=>bridge.sendToolResult(${JSON.stringify({content:open.content,structuredContent:open.structuredContent})});
    bridge.connect(new PostMessageTransport(iframe.contentWindow,iframe.contentWindow)).then(()=>iframe.src='/widget');`},bundle:true,write:false,format:'iife'})
  const browser=await chromium.launch();t.after(()=>browser.close())
  const page=await browser.newPage({viewport:{width:1200,height:860}}),links=[],messages=[],calls=[],errors=[],appOrigin=[]
  page.on('pageerror',e=>errors.push(e.message))
  await page.exposeFunction('sent',p=>messages.push(p.content?.[0]?.text))
  await page.exposeFunction('opened',u=>links.push(u))
  await page.exposeFunction('dispatch',async p=>{calls.push(p.arguments?.request?.op??p.name);return tool(p.name,p.arguments)})
  // Claude's sandbox: nothing from outside origins.
  const csp="default-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'none'; frame-src blob: data:"
  await page.route('https://host.example/**',async route=>{
    const path=new URL(route.request().url()).pathname
    if(path==='/widget')return route.fulfill({contentType:'text/html',headers:{'Content-Security-Policy':csp},body:resource.text})
    if(path==='/host.js')return route.fulfill({contentType:'application/javascript',body:host.outputFiles[0].text})
    return route.fulfill({contentType:'text/html',body:'<style>*{margin:0}iframe{width:100vw;height:100vh;border:none}</style><iframe></iframe><script src="/host.js"></script>'})
  })
  await page.route('https://ctis.trialagents.com/**',r=>{appOrigin.push(r.request().url());return r.fulfill({status:404,body:''})})
  await page.goto('https://host.example/')
  const frame=page.frameLocator('iframe')
  await frame.locator('#matrix').waitFor({timeout:10000}).catch(async e=>{throw new Error(JSON.stringify({errors,calls}),{cause:e})})
  assert.match(await frame.locator('#planpage h1').innerText(),/EX-101/)
  if(process.env.CTIS_SCREENSHOT)await page.screenshot({path:process.env.CTIS_SCREENSHOT})
  // Header: back to the app.
  await frame.locator('[data-open-app]').click()
  await page.waitForFunction(()=>true);await new Promise(r=>setTimeout(r,200))
  assert.equal(links.at(-1),'https://ctis.trialagents.com/?project='+ids.ex101)
  // Continue sends the loop request to the chat.
  await frame.locator('[data-continue-plan]').click();await new Promise(r=>setTimeout(r,200))
  assert.match(messages.at(-1),/Continue the TrialAgents CTIS plan for EX-101/)
  // Revise is enabled here and sends the request to the chat.
  await frame.locator('[data-cell="D04-QC"]').click();await frame.locator('.threadcard').first().waitFor()
  const revise=frame.locator('[data-revise]')
  assert.ok(!(await revise.isDisabled()))
  await revise.click();await new Promise(r=>setTimeout(r,200))
  assert.match(messages.at(-1),/Revise D04-QC/)
  // People's actions run through the app-only tool and are recorded as the workspace in Claude.
  await frame.locator('[data-continue]').click();await frame.locator('[data-undo-continue]').waitFor()
  const {entries}=await store(user,{op:'logs',project:ids.ex101,input:{limit:5}})
  assert.ok(entries.some(e=>e.action==='continue.set'&&e.source==='Claude workspace'))
  assert.ok(calls.every(c=>c==='ctis_workspace_request'||typeof c==='string'))
  // Links open through Claude; nothing is fetched from the app origin.
  await frame.locator('[data-close-reader]').click()
  await frame.locator('a:has-text("Download all")').click();await new Promise(r=>setTimeout(r,200))
  assert.match(links.at(-1),/^https:\/\/ctis\.trialagents\.com\/api\/ctis\/export\?project=/)
  assert.deepEqual(appOrigin,[]);assert.deepEqual(errors,[])
})
