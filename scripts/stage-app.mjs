// Install this revision of TrialAgents CTIS into a checkout of the shared web service (tarous89/intel_agent_app).
// node scripts/stage-app.mjs /path/to/intel_agent_app   then, in that checkout: npm install
// It applies integration/shared-web/host.patch (once), copies the routes, the server and MCP code, the catalog,
// the built browser and Claude views, and adds the dependencies CTIS needs.
import {cp,mkdir,readFile,writeFile,rm} from 'node:fs/promises'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import path from 'node:path'

const root=fileURLToPath(new URL('../',import.meta.url)),target=process.argv[2]
if(!target||path.resolve(target)===path.resolve(root))throw new Error('Usage: node scripts/stage-app.mjs /path/to/intel_agent_app')
const host=path.resolve(target),src=path.join(root,'integration/shared-web'),lib=path.join(host,'app/lib/ctis')
execFileSync(process.execPath,[path.join(root,'scripts/build.mjs')],{stdio:'inherit'})
const apply=(...args)=>execFileSync('git',['-C',host,'apply',...args,path.join(src,'host.patch')],{stdio:'pipe'})
try{apply('--reverse','--check');console.log('host.patch already applied')}catch{apply('--check');apply();console.log('host.patch applied')}
await cp(path.join(src,'app'),path.join(host,'app'),{recursive:true})
await rm(lib,{recursive:true,force:true})
for(const dir of ['app/server','mcp','catalog'])await cp(path.join(root,dir),path.join(lib,dir),{recursive:true})
await cp(path.join(src,'types'),lib,{recursive:true})
await cp(path.join(src,'lib/adapter.ts'),path.join(lib,'adapter.ts'))
await cp(path.join(src,'worker.mjs'),path.join(host,'scripts/ctis-worker.mjs'))
await cp(path.join(src,'tests'),path.join(host,'tests'),{recursive:true})
await mkdir(path.join(host,'public/ctis-assets'),{recursive:true})
for(const f of ['ctis.html','ctis.js','ctis-claude.html'])await cp(path.join(root,'dist',f),path.join(host,'public/ctis-assets',f))
const sha=execFileSync('git',['-C',root,'rev-parse','HEAD']).toString().trim()
await writeFile(path.join(lib,'SOURCE.md'),'Vendored from https://github.com/tarous89/trialagents_ctis at '+sha+' by scripts/stage-app.mjs. Edit it there, not here.\n')
// Dependencies the CTIS server needs at run time, at the versions it is tested with.
const ours=JSON.parse(await readFile(path.join(root,'package.json'),'utf8')).dependencies
const pkgPath=path.join(host,'package.json'),pkg=JSON.parse(await readFile(pkgPath,'utf8'))
for(const name of ['zod','yaml','jszip','@xmldom/xmldom','mammoth','pdfjs-dist','pdf-lib','@napi-rs/canvas','@modelcontextprotocol/server'])if(!pkg.dependencies[name])pkg.dependencies[name]=ours[name]
pkg.dependencies=Object.fromEntries(Object.entries(pkg.dependencies).sort(([a],[b])=>a<b?-1:1))
await writeFile(pkgPath,JSON.stringify(pkg,null,2)+'\n')
// Render stages Pipeline onto the same checkout at every deploy (trialagents_pipeline scripts/stage-app.mjs), and its
// patches must still apply. With PIPELINE_SRC set to a Pipeline checkout at the commit Render pins, check that here.
if(process.env.PIPELINE_SRC){
  for(const patch of ['pipeline-oauth.patch','pipeline-account.patch']){
    const file=path.join(process.env.PIPELINE_SRC,'integration/shared-web',patch)
    const check=(...args)=>execFileSync('git',['-C',host,'apply','--check',...args,file],{stdio:'pipe'})
    try{check('--reverse')}catch{try{check()}catch(e){throw new Error('Pipeline\'s '+patch+' no longer applies: '+String(e.stderr))}}
  }
  console.log('Pipeline deploy patches still apply')
}
console.log('Staged TrialAgents CTIS '+sha.slice(0,7)+' into '+host+'. Run npm install there.')
