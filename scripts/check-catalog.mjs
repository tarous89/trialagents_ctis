// Validate catalog/ (used in CI). Exit code 1 when there are errors.
// node scripts/check-catalog.mjs [dir]
import {fileURLToPath} from 'node:url'
import {loadCatalogDir} from '../app/server/catalog-files.mjs'
const dir=process.argv[2]??fileURLToPath(new URL('../catalog',import.meta.url))
const built=await loadCatalogDir(dir)
const count=c=>built.items.filter(i=>i.category===c).length
console.log(`Catalog: ${count('requirements')} submission requirements, ${count('content')} content guides, ${count('word')} Word templates, ${count('workflow')} workflow guides`)
for(const w of built.warnings)console.log('warning:',w)
for(const e of built.errors)console.error('error:',e)
if(built.errors.length)process.exit(1)
console.log('OK',built.digest.slice(0,12))
