// Build the browser app into dist/: ctis.html (shell with styles and logo inlined) and ctis.js (the app),
// and the workspace shown inside Claude: dist/ctis-claude.html, one self-contained file (no requests to the app origin).
// node scripts/build.mjs
import {readFile,writeFile,mkdir} from 'node:fs/promises'
import {build} from 'esbuild'

const root=new URL('../',import.meta.url),read=p=>readFile(new URL(p,root))
await mkdir(new URL('dist/',root),{recursive:true})
const css=(await read('app/web/ctis.css')).toString()+'\n'+(await read('app/web/app.css')).toString()
const logo='data:image/png;base64,'+(await read('app/web/logo.png')).toString('base64')
const shell=(await read('app/web/shell.html')).toString()
const bundle=async(host,entry='main.js')=>(await build({entryPoints:[new URL('app/web/'+entry,root).pathname],bundle:true,minify:true,format:'iife',target:'es2022',write:false,
  define:{'process.env.CTIS_HOST':JSON.stringify(host)},legalComments:'none'})).outputFiles[0].text
const page=(script)=>shell.replace('/*STYLES*/',()=>css).replaceAll('{{LOGO}}',logo).replace('<!--SCRIPT-->',()=>'<script src="'+script+'"></script>')
await writeFile(new URL('dist/ctis.js',root),await bundle('browser'))
await writeFile(new URL('dist/ctis.html',root),page('/ctis-assets/ctis.js'))
const claude=(await bundle('claude','claude-entry.js')).replace(/<\/script/gi,'<\\/script')
await writeFile(new URL('dist/ctis-claude.html',root),shell.replace('/*STYLES*/',()=>css).replaceAll('{{LOGO}}',logo).replace('<!--SCRIPT-->',()=>'<script>'+claude+'</script>'))
console.log('Built dist/ctis.html, dist/ctis.js and dist/ctis-claude.html')
