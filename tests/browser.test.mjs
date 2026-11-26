// The browser app in Chromium against the dev server (real API, store and catalog, fictional example data).
import {test,before,after} from 'node:test'
import assert from 'node:assert/strict'
import JSZip from 'jszip'
import {chromium} from 'playwright-core'
import {startDev} from '../scripts/dev.mjs'

let dev,browser,page,errors=[]
before(async()=>{
  dev=await startDev({port:4612,quiet:true})
  browser=await chromium.launch()
  page=await browser.newPage({viewport:{width:1360,height:900}})
  page.on('pageerror',e=>errors.push(e.message))
})
after(async()=>{await browser?.close();await dev?.close()})
const open=async(path='/')=>{await page.goto(dev.url+path);await page.waitForSelector('#page h1')}
const text=sel=>page.locator(sel).innerText()

test('Projects: own and shared projects; new projects start in an assistant',async()=>{
  await open()
  assert.match(await text('#page'),/CTIS initial application EX-101/)
  assert.match(await text('#page'),/Shared with you[\s\S]*BX-212[\s\S]*Maria Keller[\s\S]*Can comment/)
  await page.click('[data-new-project]')
  assert.match(await text('#overlay'),/Start a project in your assistant/)
  assert.equal(await page.locator('#overlay a.btn').count(),2)
  await page.keyboard.press('Escape')
  assert.match(await page.locator('#assistant-actions').innerText(),/Open in Claude[\s\S]*Open in ChatGPT/)
})

test('Plan: Part I and each country, statuses, final column, filters',async()=>{
  await open('/?project='+dev.ids.ex101)
  const body=await text('#matrix')
  assert.match(body,/Part I[\s\S]*Protocol synopsis[\s\S]*Approved v1/)
  assert.match(body,/Part II · Germany[\s\S]*Action required/)
  assert.match(body,/Part II · Spain/)
  await page.selectOption('[data-filter="country"]','ES')
  await page.waitForFunction(()=>document.querySelectorAll('#matrix .docline').length===1)
  assert.match(await text('#matrix'),/Spain/)
  await page.click('[data-clear-filters]')
  await page.waitForFunction(()=>document.querySelectorAll('#matrix .docline').length===4)
})

test('Deliverable: threads, comment, resolve, ignore and continue; Revise is for the assistant',async()=>{
  await open('/?project='+dev.ids.ex101+'&deliverable=D04-QC')
  await page.waitForSelector('#review-sidebar .threadcard')
  assert.equal(await page.locator('.threadcard').count(),3)
  const revise=page.locator('[data-revise]')
  assert.equal(await revise.getAttribute('title'),'Available in Claude or ChatGPT');assert.ok(await revise.isDisabled())
  await page.click('[data-new-thread]');await page.fill('#thread-text','Check the reimbursement wording against the manual.')
  await page.click('#threadform button.primary')
  await page.waitForFunction(()=>document.querySelectorAll('.threadcard').length===4)
  await page.click('[data-thread="4"] [data-resolve="4"]')
  await page.waitForFunction(()=>document.querySelectorAll('.threadcard').length===3)
  await page.click('.para[data-section="S02"]')
  assert.match(await text('#source-slot'),/The follow-up visit takes place at week 12/)
  await page.click('[data-continue]')
  await page.waitForSelector('[data-undo-continue]')
  assert.match(await text('.readertitle'),/Continued/)
  await page.click('[data-undo-continue]');await page.waitForSelector('[data-continue]')
  await page.click('[data-close-reader]')
  await page.waitForFunction(()=>!location.search.includes('deliverable'))
})

test('Edit steps adds a column; Download all holds the approved final document',async()=>{
  await open('/?project='+dev.ids.ex101)
  const res=await page.request.get(dev.url+'/api/ctis/export?project='+dev.ids.ex101)
  assert.equal(res.status(),200)
  const zip=await JSZip.loadAsync(await res.body())
  assert.ok(zip.file('manifest.json'));assert.ok(Object.keys(zip.files).some(n=>n.startsWith('EX101_D1_protocol-synopsis_EU_en_v1')))
  await page.click('[data-edit-steps]');await page.selectOption('#addstep','checklist');await page.click('[data-step-add]');await page.click('[data-steps-save]')
  await page.waitForFunction(()=>/checklist/i.test(document.querySelector('#matrix thead').innerText))
  const heads=await page.locator('#matrix thead th').allInnerTexts()
  assert.deepEqual(heads.slice(2,6).map(h=>h.trim().toLowerCase()),['draft','source qc','checklist','style'],'a new step goes before Style')
  // The approval belonged to the old last step of D01; its new last step must be run and approved again.
  assert.match(await page.locator('#matrix .docline >> nth=0').innerText(),/Waiting/)
})

test('Sources: upload a file and correct details',async()=>{
  await open('/?tab=sources')
  await page.click('button.link:has-text("EX-101 study protocol")')
  await page.setInputFiles('[data-upload]',{name:'protocol.txt',mimeType:'text/plain',buffer:Buffer.from('# Eligibility\nAdults aged 18 years or older.\n# Visits\nFollow-up at week 12.')})
  await page.waitForSelector('#page a.filelink:has-text("protocol.txt")')
  await page.click('[data-res] >> nth=0')
  await page.fill('#resourceform input[name=version]','3.1');await page.click('#resourceform button.primary')
  await page.waitForSelector('#page small.sub:has-text("v3.1")')
})

test('Sharing: a commenter sees only the shared document and cannot run steps',async()=>{
  await open('/?as=sofia')
  assert.match(await text('#page'),/Shared with you[\s\S]*EX-101/)
  await page.click('[data-project="'+dev.ids.ex101+'"]');await page.waitForSelector('#matrix')
  assert.equal(await page.locator('#matrix .docline').count(),1)
  assert.equal(await page.locator('[data-edit-steps]').count(),0)
  await page.click('[data-cell="D04-QC"]');await page.waitForSelector('.threadcard')
  assert.equal(await page.locator('[data-continue]').count(),0);assert.equal(await page.locator('[data-invite]').count(),0)
  await page.click('[data-close-reader]')
  await page.goto(dev.url+'/?as=alex');await page.waitForSelector('#page h1')
})

test('Settings: Logs show who did what and through which client; duplicate starts without deliverables',async()=>{
  await open('/?tab=settings&section=Logs')
  const logs=await text('table.logs')
  assert.match(logs,/Sofia Ruiz\s+Browser\s+Commented/);assert.match(logs,/Alex Morgan\s+Claude\s+Saved a version/)
  await open('/')
  await page.click('[data-duplicate-project="'+dev.ids.ex101+'"]');await page.fill('#duplicateform input[name=code]','EX-101-SM1');await page.click('#duplicateform button.primary')
  await page.waitForSelector('#matrix')
  assert.match(await text('#planpage h1'),/substantial modification/)
  assert.equal(await page.locator('#matrix .state.done').count(),0)
})

test('no page errors',()=>assert.deepEqual(errors,[]))
