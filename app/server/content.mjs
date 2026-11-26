import {check} from './rules.mjs'

// Build a new version's content from the previous one and the changed sections only (docs/MCP.md §7).
// A changed section replaces the one with the same id in place; a new id is inserted after `after`
// (null: at the start; omitted: at the end). Returns the content and the set of touched section ids.
export function applyChanges(previous,changes){
  const sections=previous.sections.map(s=>({...s}))
  const touched=new Set()
  for(const id of changes.remove){
    const i=sections.findIndex(s=>s.id===id)
    check(i>=0,'Cannot remove unknown section '+id)
    sections.splice(i,1);touched.add(id)
  }
  for(const {after,...section} of changes.sections){
    check(!changes.remove.includes(section.id),'Section '+section.id+' is both removed and changed')
    const i=sections.findIndex(s=>s.id===section.id)
    if(i>=0&&after===undefined)sections[i]=section
    else{
      if(i>=0)sections.splice(i,1)
      let at=after===undefined?sections.length:0
      if(typeof after==='string'){const j=sections.findIndex(s=>s.id===after);check(j>=0,'Unknown section '+after);at=j+1}
      sections.splice(at,0,section)
    }
    touched.add(section.id)
  }
  check(touched.size,'The revision changes nothing')
  return {content:{title:changes.title??previous.title,sections},touched}
}
