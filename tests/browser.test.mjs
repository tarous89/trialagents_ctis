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
  // Supplied Part I documents and the Redacted documents column.
  assert.match(body,/Protocol[\s\S]*Provided by sponsor[\s\S]*Supplied[\s\S]*Approved v1[\s\S]*Redacted v1/)
  assert.match(body,/Held outside/);assert.match(body,/Awaiting file/);assert.match(body,/Not published/);assert.match(body,/After approval/)
  assert.match(await text('#matrix thead'),/Redacted documents/i)
  assert.ok(await page.locator('[data-redact]').count()>=1,'approved synopsis offers Redact')
  await page.selectOption('[data-filter="country"]','ES')
  await page.waitForFunction(()=>document.querySelectorAll('#matrix .docline').length===1)
  assert.match(await text('#matrix'),/Spain/)
  await page.click('[data-clear-filters]')
  await page.waitForFunction(()=>document.querySelectorAll('#matrix .docline').length===7)
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
  assert.ok(zip.file('EX101_D1_protocol_EU_en_v1.pdf')&&zip.file('EX101_D1_protocol_EU_en_redacted_v1.pdf'),'the final and the redacted protocol')
  await page.click('[data-edit-steps]');await page.selectOption('#addstep','team');await page.click('[data-step-add]');await page.click('[data-steps-save]')
  await page.waitForFunction(()=>/team review/i.test(document.querySelector('#matrix thead').innerText))
  const heads=await page.locator('#matrix thead th').allInnerTexts()
  assert.deepEqual(heads.slice(2,7).map(h=>h.trim().toLowerCase()),['draft','source qc','checklist','team review','style'],'a new step goes before Style')
  // The approval belonged to the old last step of the protocol; its new last step must be run and approved again.
  assert.match(await page.locator('#matrix .docline >> nth=0').innerText(),/Waiting/)
  assert.match(await page.locator('#matrix .docline >> nth=0').innerText(),/After approval/,'its redacted version waits for the new approval')
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

test('Settings: Personal embeds the TrialAgents account page; Billing offers the Team plan; notification switches save',async()=>{
  await open('/?tab=settings&section=Personal')
  await page.frameLocator('#account-holder iframe').locator('text=Personal details').waitFor()
  assert.match(await page.frameLocator('#account-holder iframe').locator('.ctis-account').innerText(),/alex\.morgan@example\.com/)
  await page.click('[data-settings-section="Billing"]')
  assert.match(await text('.settings-sections'),/Active[\s\S]*TrialAgents CTIS Team · Monthly subscription[\s\S]*€49 per month/,'Alex has the Team plan')
  await open('/?as=sofia');await page.click('[data-tab="settings"]');await page.click('[data-settings-section="Billing"]')
  assert.match(await text('.settings-sections'),/Review submissions as a team[\s\S]*€49/,'the free plan sees the offer')
  assert.ok(await page.locator('[data-upgrade]').isDisabled(),'no Stripe on the dev server');assert.match(await text('.settings-sections'),/not available on this server/)
  await page.goto(dev.url+'/?as=alex');await page.waitForSelector('#page h1');await page.click('[data-tab="settings"]')
  await page.click('[data-settings-section="Notifications"]');await page.waitForSelector('#prefsform')
  assert.equal(await page.locator('#prefsform input[name=source]').isChecked(),false,'source changes are off by default')
  await page.uncheck('#prefsform input[name=draft]');await page.click('#prefsform button.primary')
  await page.waitForSelector('#prefsform output:has-text("Saved")')
  await page.click('[data-settings-section="Logs"]');await page.click('[data-settings-section="Notifications"]');await page.waitForSelector('#prefsform')
  assert.equal(await page.locator('#prefsform input[name=draft]').isChecked(),false)
})

test('no page errors',()=>assert.deepEqual(errors,[]))
