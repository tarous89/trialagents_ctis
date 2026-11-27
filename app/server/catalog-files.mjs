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

// Country content (planning checklists per member state, content templates, country stylings and the shared
// EU forms) is imported from the content source. Tests that use their own sample countries load the core only.
export const isCountryContent=path=>/^(planning\/[A-Z]{2}\.md|content\/.+|styling\/(L1_SIS-ICF_.+|(K1_recruitment-arrangements|N1_site-suitability|S1_biological-samples|P1_compensation|R1_data-protection|M1_CV|M2_DoI)\.(md|docx)))$/.test(path)
export const readCoreCatalogDir=async dir=>(await readCatalogDir(dir)).filter(f=>!isCountryContent(f.path))
export const loadCoreCatalogDir=async dir=>buildCatalog(await readCoreCatalogDir(dir))

