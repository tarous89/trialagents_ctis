// Build the browser app into dist/: ctis.html (shell with styles and logo inlined) and ctis.js (the app).
// node scripts/build.mjs [--host=browser|claude]
import {readFile,writeFile,mkdir} from 'node:fs/promises'
import {build} from 'esbuild'

const root=new URL('../',import.meta.url),read=p=>readFile(new URL(p,root))
await mkdir(new URL('dist/',root),{recursive:true})
const css=(await read('app/web/ctis.css')).toString()+'\n'+(await read('app/web/app.css')).toString()
const logo='data:image/png;base64,'+(await read('app/web/logo.png')).toString('base64')
const shell=(await read('app/web/shell.html')).toString()
const bundle=async host=>(await build({entryPoints:[new URL('app/web/main.js',root).pathname],bundle:true,minify:true,format:'iife',target:'es2022',write:false,
  define:{'process.env.CTIS_HOST':JSON.stringify(host)},legalComments:'none'})).outputFiles[0].text
const page=(script)=>shell.replace('/*STYLES*/',()=>css).replaceAll('{{LOGO}}',logo).replace('<!--SCRIPT-->',()=>'<script src="'+script+'"></script>')
await writeFile(new URL('dist/ctis.js',root),await bundle('browser'))
await writeFile(new URL('dist/ctis.html',root),page('/ctis-assets/ctis.js'))
console.log('Built dist/ctis.html and dist/ctis.js')
