// Sources and Templates: every document an assistant used, by name, version and date, with the projects that use it.
import {call,write,sourceUrl,fileToBase64} from './api.js'
import {E,$,icon,host,fmtDate,fmtSize,toast,drawer,closeDrawer,field,options,formData} from './ui.js'
import {pencil} from './icons.js'
import {nav} from './nav.js'

const kinds={source:['Protocol','Protocol amendment','Investigator’s brochure','Study manual','Source document','Other'],template:['Writing template','Checklist','Word layout','SOP or guideline','Other']}
let cache={}

export async function registryPage(category,state){
  const isT=category==='template',title=isT?'Templates':'Sources'
  const [{resources},{projects}]=await Promise.all([call('resource.list',{input:{category}}),call('project.list')])
  cache[category]=resources
  const f=state.filters[category+'s']??state.filters[isT?'templates':'sources']??{}
  state.filters[isT?'templates':'sources']=f
  const list=resources.filter(r=>(!f.q||[r.name,r.type,r.notes].join(' ').toLowerCase().includes(f.q.toLowerCase()))&&(!f.project||r.projects.some(p=>p.id===f.project))&&(!f.kind||r.type===f.kind)&&(!f.file||r.file_mode===f.file))
  const file=r=>r.file_mode==='stored'?'<a class="filelink" href="'+sourceUrl(r.id)+'" title="Download">'+E(r.file_name)+'</a><small class="sub">'+fmtSize(r.file_size)+'</small>'
    :r.file_mode==='link'?'<a class="filelink" href="'+E(r.link)+'" target="_blank" rel="noopener noreferrer">Open link</a>':'<span class="muted" title="Only the name and version are recorded">—</span>'
  const row=r=>'<tr><td><button type="button" class="link" data-res="'+r.id+'" title="Details and where it is used">'+E(r.name)+'</button><small class="sub">'+E([r.type,r.version&&'v'+r.version,r.doc_date&&fmtDate(r.doc_date)].filter(Boolean).join(' · '))+'</small></td>'
    +'<td>'+(r.projects.map(p=>'<button type="button" class="ctry" data-project="'+p.id+'" title="'+E(p.name)+'">'+E(p.code)+'</button>').join(' ')||'<span class="muted">—</span>')+'</td>'
    +'<td>'+file(r)+'</td><td>'+E(r.source==='web'?'Browser':r.source)+'<small class="sub">'+fmtDate(r.created_at)+'</small></td><td>'+r.used_in+'</td>'
    +'<td><button type="button" class="edit-action" data-res="'+r.id+'" aria-label="Edit '+E(r.name)+'" title="Edit details">'+pencil+'</button></td></tr>'
  return '<div class="title"><div><h1>'+title+'</h1><p class="lede">'+(isT?'Templates, checklists, Word layouts and SOPs used for your projects. TrialAgents’ own content templates, styling and country checklists apply automatically and are recorded in each version.'
    :'Every document an assistant uses is recorded here by name and version and linked to its projects, so each output can be traced to its sources. Storing a copy of the file is optional; a stored file can be searched and quoted by the assistant.')+'</p></div></div>'
    +'<form class="filters" data-registry-filters="'+category+'"><label>Search<input type="search" name="q" value="'+E(f.q??'')+'" placeholder="Name, type or note"></label>'
    +'<label>Project<select name="project">'+options([['','All projects'],...projects.map(p=>[p.id,p.code+' · '+p.name])],f.project)+'</select></label>'
    +'<label>Type<select name="kind">'+options([['','All types'],...kinds[category]],f.kind)+'</select></label>'
    +'<label>File<select name="file">'+options([['','Any'],['stored','Stored copy'],['link','Linked'],['name','Name only']],f.file)+'</select></label></form>'
    +'<section class="panel"><h2>'+list.length+' '+(list.length===1?category:title.toLowerCase())+'</h2>'+(list.length?'<div class="scroll"><table class="registry"><thead><tr><th>'+(isT?'Template':'Source')+'</th><th>Projects</th><th>File</th><th>Recorded</th><th>Deliverables</th><th></th></tr></thead><tbody>'+list.map(row).join('')+'</tbody></table></div>'
      :'<p class="pad muted">'+(Object.values(f).some(Boolean)?'Nothing matches these filters.':'No '+title.toLowerCase()+' recorded yet. They appear here when an assistant uses them.')+'</p>')+'</section>'
}

function recordDrawer(r){
  drawer('<form id="resourceform" data-id="'+r.id+'"><div class="line"><h2>'+E(r.name)+'</h2><button type="button" data-close-drawer aria-label="Close">✕</button></div>'
    +field('Name *','<input name="name" required maxlength="200" value="'+E(r.name)+'">')
    +'<div class="grid">'+field('Type','<select name="type">'+options([...new Set([...kinds[r.category],r.type])],r.type)+'</select>')+field('Version','<input name="version" maxlength="50" value="'+E(r.version)+'" placeholder="e.g. 3.0">','The assistant reads it from the document. Correct it if needed.')+'</div>'
    +field('Document date','<input name="doc_date" maxlength="40" value="'+E(r.doc_date)+'" placeholder="YYYY-MM-DD">')
    +field('Notes','<textarea name="notes" maxlength="2000">'+E(r.notes)+'</textarea>')
    +'<div class="field"><span class="fieldlabel">File</span>'+(r.file_mode==='stored'?'<p><a class="filelink" href="'+sourceUrl(r.id)+'">'+E(r.file_name)+'</a> · '+fmtSize(r.file_size)+'</p>':'<p class="muted">'+(r.file_mode==='link'?'Linked: '+E(r.link):'Only the name and version are recorded.')+'</p>')
    +'<label class="btn sm">'+icon('download')+' '+(r.file_mode==='stored'?'Replace file':'Upload file')+'<input type="file" name="upload" accept=".pdf,.docx,.txt,.md" hidden data-upload="'+r.id+'"></label><small class="hint">PDF, Word or text, up to 25 MB. Stored files can be searched and quoted by the assistant in later runs.</small></div>'
    +'<div class="field"><span class="fieldlabel">Used in</span>'+(r.projects.map(p=>'<button type="button" class="ctry" data-project="'+p.id+'">'+E(p.code)+'</button>').join(' ')||'<span class="muted">No project</span>')+'<small class="hint">'+r.used_in+' deliverable versions used it. Remove it from a project in that project’s details.</small></div>'
    +'<div class="rowbtns"><button class="primary">Save details</button><button type="button" data-close-drawer>Cancel</button></div><output></output></form>')
}

export async function registryEvents(b,state){
  if(b.dataset.res){const r=Object.values(cache).flat().find(x=>x.id===b.dataset.res);if(r){recordDrawer(r);return true}}
  return false
}
export async function registrySubmit(form,state){
  if(form.id!=='resourceform')return false
  const f=formData(form)
  await write('resource.update',{input:{id:form.dataset.id,name:f.name,type:f.type,version:f.version,doc_date:f.doc_date,notes:f.notes}})
  closeDrawer();toast('Saved');nav.render()
  return true
}
document.addEventListener('change',async e=>{
  const t=e.target
  if(t.closest('[data-registry-filters]')){
    const form=t.closest('form'),key=form.dataset.registryFilters==='template'?'templates':'sources'
    nav.state.filters[key]=Object.fromEntries(new FormData(form));nav.render();return
  }
  if(t.dataset.upload&&t.files[0]){
    const file=t.files[0],out=t.closest('form').querySelector('output')
    const limit=host==='browser'?25:8
    if(file.size>limit*1024*1024){out.textContent=host==='browser'?'Files can be up to 25 MB':'Files over 8 MB: upload them in the TrialAgents CTIS app';return}
    out.textContent='Uploading…'
    try{
      const r=await write('resource.upload',{input:{resource:t.dataset.upload,name:file.name,mime:file.type,content_base64:await fileToBase64(file)}})
      closeDrawer();toast(r.note??('Stored: '+r.passages+' searchable passages'));nav.render()
    }catch(err){out.textContent=err.message}
  }
})
document.addEventListener('input',async e=>{
  const t=e.target;if(t.name!=='q'||!t.closest('[data-registry-filters]'))return
  clearTimeout(t._t);t._t=setTimeout(async()=>{const form=t.closest('form'),key=form.dataset.registryFilters==='template'?'templates':'sources'
    nav.state.filters[key]=Object.fromEntries(new FormData(form));await nav.render();const q=$('[data-registry-filters] input[name=q]');q?.focus();q?.setSelectionRange(q.value.length,q.value.length)},250)
})
