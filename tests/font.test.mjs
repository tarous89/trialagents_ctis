// The browser page embeds Inter, and the policy the shared web service sends with it (integration/shared-web/app/ctis-app)
// lets it load: default-src 'self' alone would refuse a data: font.
import {test} from 'node:test'
import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import {chromium} from 'playwright-core'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'

test('Inter loads on ctis.trialagents.com under the production Content-Security-Policy',async t=>{
  const csp=(await readFile('integration/shared-web/app/ctis-app/route.ts','utf8')).match(/'Content-Security-Policy':"([^"]+)"/)[1]
  assert.match(csp,/font-src 'self' data:/)
  execFileSync(process.execPath,[fileURLToPath(new URL('../scripts/build.mjs',import.meta.url))],{stdio:'ignore'})
  const html=(await readFile('dist/ctis.html','utf8')).replace(/<script[^>]*src=[^>]*><\/script>/g,'')
  const browser=await chromium.launch();t.after(()=>browser.close())
  const p=await browser.newPage()
  await p.route('https://ctis.trialagents.com/**',r=>r.fulfill({contentType:'text/html',headers:{'Content-Security-Policy':csp},body:html}))
  await p.goto('https://ctis.trialagents.com/')
  const status=await p.evaluate(async()=>{await document.fonts.load('500 14px Inter');return [...document.fonts].filter(f=>f.family==='Inter').map(f=>f.status)})
  assert.deepEqual(status,['loaded'])
})
