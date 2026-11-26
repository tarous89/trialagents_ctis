// Screenshots of every screen on the dev server, for design checks against the prototype.
// node scripts/shots.mjs <output dir>
import {chromium} from 'playwright-core'
import {startDev} from './dev.mjs'

const out=process.argv[2]??'shots'
const dev=await startDev({port:4611,quiet:true})
const browser=await chromium.launch(),page=await browser.newPage({viewport:{width:1360,height:860}})
const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())})
const shot=async name=>{await page.waitForTimeout(350);await page.screenshot({path:out+'/'+name+'.png'})}
try{
  await page.goto(dev.url+'/');await shot('1-projects')
  await page.click('[data-project="'+dev.ids.ex101+'"]');await shot('2-plan')
  await page.click('[data-cell="D04-QC"]');await shot('3-deliverable-action')
  await page.click('.para[data-section="S02"]');await shot('4-evidence')
  await page.keyboard.press('Escape')
  await page.click('[data-cell="D01-QC"]');await shot('5-deliverable-approved');await page.keyboard.press('Escape')
  await page.click('[data-edit-steps]');await shot('6-edit-steps');await page.keyboard.press('Escape')
  await page.click('[data-tab="sources"]');await shot('7-sources')
  await page.click('[data-tab="templates"]');await shot('8-templates')
  await page.click('[data-tab="settings"]');await shot('9-settings')
  for(const s of ['Team','Logs','Billing'])await page.click('[data-settings-section="'+s+'"]').then(()=>shot('10-settings-'+s))
}finally{
  console.log(errors.length?'Page errors:\n'+errors.join('\n'):'No page errors')
  await browser.close();await dev.close()
}
