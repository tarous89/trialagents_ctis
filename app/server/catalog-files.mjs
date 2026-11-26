// Read catalog/ from disk into the shape buildCatalog expects.
import {readdir,readFile} from 'node:fs/promises'
import path from 'node:path'
import {categories,buildCatalog} from './catalog.mjs'

export async function readCatalogDir(dir){
  const files=[]
  for(const category of categories){
    let names=[]
    try{names=await readdir(path.join(dir,category))}catch(e){if(e.code!=='ENOENT')throw e}
    for(const name of names.sort()){
      const full=path.join(dir,category,name),rel=category+'/'+name
      if(name.endsWith('.md'))files.push({path:rel,text:await readFile(full,'utf8')})
      else if(name.endsWith('.docx'))files.push({path:rel,buffer:await readFile(full)})
    }
  }
  return files
}
export const loadCatalogDir=async dir=>buildCatalog(await readCatalogDir(dir))
