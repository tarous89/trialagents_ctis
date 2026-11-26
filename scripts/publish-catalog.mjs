// Publish catalog/ as a new release when it changed. Called by the deploy with a database handle.
// The shared web service supplies `db` (transaction(fn) with fn(q) where q(sql, params) returns rows).
import {fileURLToPath} from 'node:url'
import {loadCatalogDir} from '../app/server/catalog-files.mjs'
import {publishCatalog} from '../app/server/catalog.mjs'
export async function publish(db,{dir=fileURLToPath(new URL('../catalog',import.meta.url)),sha=process.env.RENDER_GIT_COMMIT??''}={}){
  return publishCatalog(db,await loadCatalogDir(dir),{sha})
}
