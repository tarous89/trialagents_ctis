// Local dev server: the browser app and its API on an in-memory database with the published catalog and example data.
// node scripts/dev.mjs  ->  http://localhost:4600 (add ?as=sofia or ?as=maria to switch the signed-in person)
import http from 'node:http'
import {readFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import {execFileSync} from 'node:child_process'
import {PGlite} from '@electric-sql/pglite'
import {ctis} from '../app/server/store.mjs'
import {ctisApi} from '../app/server/api.mjs'
import {publishCatalog} from '../app/server/catalog.mjs'
import {loadCatalogDir} from '../app/server/catalog-files.mjs'
import {seedExamples,people} from '../app/server/examples.mjs'

const root=new URL('../',import.meta.url)
export async function startDev({port=4600,build=true,quiet=false}={}){
  if(build)execFileSync(process.execPath,[fileURLToPath(new URL('scripts/build.mjs',root))],{stdio:quiet?'ignore':'inherit'})
  const pg=new PGlite()
  await pg.exec(await readFile(new URL('app/server/schema.sql',root),'utf8'))
  const db={transaction:fn=>pg.transaction(tx=>fn(async(sql,p)=>(await tx.query(sql,p)).rows))}
  await publishCatalog(db,await loadCatalogDir(fileURLToPath(new URL('catalog',root))))
  const run=ctis(db)
  const ids=await seedExamples(run,{db})
  const origin='http://localhost:'+port
  const who=req=>people[/(?:^|; )dev_user=(\w+)/.exec(req.headers.get('cookie')??'')?.[1]]??people.alex
  const api=ctisApi({run,currentUser:async req=>who(req),origin})
  const server=http.createServer(async(req,res)=>{
    const url=new URL(req.url,origin)
    try{
      if(url.pathname.startsWith('/api/ctis')){
        const body=['GET','HEAD'].includes(req.method)?undefined:await new Promise(r=>{const c=[];req.on('data',d=>c.push(d));req.on('end',()=>r(Buffer.concat(c)))})
        const r=await api(new Request(origin+req.url,{method:req.method,headers:req.headers,body}))
        res.writeHead(r.status,Object.fromEntries(r.headers));res.end(Buffer.from(await r.arrayBuffer()));return
      }
      if(url.pathname==='/ctis-assets/ctis.js'){res.writeHead(200,{'content-type':'text/javascript; charset=utf-8'});res.end(await readFile(new URL('dist/ctis.js',root)));return}
      // Stand-in for the shared TrialAgents account page (integration/shared-web/app/ctis-account) on the real site.
      if(url.pathname==='/ctis-account'){
        const u=who({headers:new Headers(req.headers)}),esc=x=>String(x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))
        const support=url.searchParams.get('tab')==='support'
        res.writeHead(200,{'content-type':'text/html; charset=utf-8'})
        res.end('<!doctype html><meta charset="utf-8"><body style="margin:0;font-family:system-ui"><div class="ctis-account" style="border:1px solid #d4dce4;border-radius:12px;padding:20px;background:#fff">'
          +(support?'<h2 style="margin:0 0 8px;font-size:16px">Support</h2><p>Message the TrialAgents team (shared account page on the real site).</p><textarea rows="5" style="width:100%"></textarea>'
            :'<h2 style="margin:0 0 8px;font-size:16px">Personal details</h2><p>Your TrialAgents account (shared account page on the real site).</p><p><strong>'+esc(u.firstName+' '+u.lastName)+'</strong><br>'+esc(u.email)+'</p><p>Password, sign-out and assistant connections are managed here.</p>')
          +'</div></body>');return
      }
      if(url.pathname==='/'){
        const headers={'content-type':'text/html; charset=utf-8'}
        if(people[url.searchParams.get('as')])headers['set-cookie']='dev_user='+url.searchParams.get('as')+'; Path=/; SameSite=Lax'
        res.writeHead(200,headers);res.end(await readFile(new URL('dist/ctis.html',root)));return
      }
      res.writeHead(404);res.end()
    }catch(e){res.writeHead(500);res.end(String(e))}
  })
  await new Promise(r=>server.listen(port,r))
  if(!quiet)console.log('TrialAgents CTIS dev server: '+origin+'  (signed in as Alex Morgan; ?as=sofia or ?as=maria to switch)')
  return {url:origin,ids,close:async()=>{server.close();await pg.close()}}
}
if(process.argv[1]===fileURLToPath(import.meta.url))await startDev({port:Number(process.env.PORT)||4600})
