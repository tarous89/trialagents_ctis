// TrialAgents CTIS browser app: navigation, Projects and the document plan.
import {call,write,exportUrl} from './api.js'
import {E,$,all,icon,railIcon,host,ctry,countryName,languageName,fmtDate,plural,statusLabel,statusClass,finalLabel,categories,tone,
  toast,modal,closeModal,drawer,closeDrawer,field,options,formData,memberStates,assistantOnly,initials,askAssistant} from './ui.js'
import {marks,pencil,dupIcon} from './icons.js'
import {openDeliverable} from './reader.js'
import {registryPage,registryEvents,registrySubmit} from './registry.js'
import {settingsPage,settingsEvents,settingsSubmit,mountAccountFrame} from './settings.js'
import {nav} from './nav.js'

export const state={view:'projects',project:null,deliverable:null,section:'Personal',filters:{},account:null,plan:null}
const assistantUrl={Claude:'https://ctis.trialagents.com/ctis-info/connectors#claude',ChatGPT:'https://ctis.trialagents.com/ctis-info/connectors#chatgpt'}
const stepCodes={draft:'Draft',qc:'Source QC',style:'Style',checklist:'Checklist',team:'Team review',guide:'Internal guidelines',custom:'Custom step'}

// ---------- navigation ----------
function readUrl(){
  const q=new URLSearchParams(location.search)
  state.project=q.get('project');state.deliverable=q.get('deliverable')
  state.view=state.project?'plan':['sources','templates','settings'].includes(q.get('tab'))?q.get('tab'):'projects'
  if(q.get('section'))state.section=q.get('section')
}
export function go(view,{project=null,deliverable=null,section,replace=false}={}){
  state.view=view;state.project=project;state.deliverable=deliverable;if(section)state.section=section
  const q=new URLSearchParams()
  if(project)q.set('project',project);if(deliverable)q.set('deliverable',deliverable)
  if(!project&&view!=='projects')q.set('tab',view);if(view==='settings')q.set('section',state.section)
  if(host==='browser')history[replace?'replaceState':'pushState'](null,'','/'+(q.size?'?'+q:''))
  return render()
}
window.addEventListener('popstate',()=>{readUrl();render()})

function shell(){
  $('#assistant-actions').innerHTML=host==='browser'
    ?['Claude','ChatGPT'].map(n=>'<a class="assistant-link" href="'+assistantUrl[n]+'" target="_blank" rel="noopener" title="Get TrialAgents CTIS in '+n+'">'+marks[n]+'<span>Open in '+n+'</span></a>').join('')
    :'<button type="button" class="assistant-link" data-open-app title="Open this workspace in TrialAgents CTIS">Open TrialAgents app ↗</button>'
  const a=state.account,tab=k=>'<button type="button" data-tab="'+k.toLowerCase()+'" class="'+((state.view===k.toLowerCase()||(k==='Projects'&&state.view==='plan'))?'active':'')+'" aria-label="'+k+'" title="'+k+'">'+railIcon(k)+'<span>'+k+'</span></button>'
  $('#rail').innerHTML='<nav class="rail-nav" aria-label="Workspace">'+['Projects','Sources','Templates'].map(tab).join('')+'</nav>'+tab('Settings')
    +(a?'<button type="button" class="rail-account" data-tab="settings" title="Your profile and sign-in"><span class="avatar-rail">'+E(initials(a.name))+'</span><span><strong>'+E(a.name)+'</strong><small>'+E(a.email)+'</small></span></button>':'')
}

export async function render(){
  shell()
  const page=$('#page')
  try{
    // The plan lives in its own .ctis container, outside the .pl page styles (as in the prototype).
    if(state.view==='plan')page.innerHTML='<div id="planpage" class="ctis">'+await planPage()+'</div>'
    else if(state.view==='sources'||state.view==='templates')page.innerHTML=await registryPage(state.view==='sources'?'source':'template',state)
    else if(state.view==='settings'){page.innerHTML=await settingsPage(state);mountAccountFrame()}
    else page.innerHTML=await projectsPage()
    page.className=state.view==='plan'?'':'pl'
    if(state.view==='plan'&&state.deliverable)openDeliverable(state.project,state.deliverable,{onChange:()=>render(),onClose:()=>go('plan',{project:state.project,replace:true})})
  }catch(e){
    page.innerHTML='<section class="panel empty-panel"><h2>'+(e.status===404?'Not found':e.status===401?'Sign in':'Something went wrong')+'</h2><p>'+E(e.message)+'</p><p><button type="button" class="link" data-tab="projects">Back to projects</button></p></section>'
  }
}

// ---------- Projects ----------
async function projectsPage(){
  const {projects,shared}=await call('project.list')
  const docs=projects.reduce((n,p)=>n+p.documents,0),approved=projects.reduce((n,p)=>n+p.approved,0),action=projects.reduce((n,p)=>n+p.need_action,0)
  const track=p=>'<span class="mini-track" aria-hidden="true">'+Array.from({length:10},(_,i)=>'<i class="'+(p.documents&&i<Math.round(10*p.approved/p.documents)?'past':'')+'"></i>').join('')+'</span>'
  const row=p=>'<tr><td><button type="button" class="link" data-project="'+p.id+'">'+E(p.name)+'</button><small class="sub">'+E([p.code,p.sponsor].filter(Boolean).join(' · '))+'</small></td>'
    +'<td>'+(p.countries.map(ctry).join(' ')||'<span class="muted">—</span>')+'</td>'
    +'<td>'+(p.documents?p.approved+' of '+p.documents+track(p):'<span class="muted">No plan yet</span>')+'</td>'
    +'<td>'+(p.need_action?'<span class="tag warn">'+plural(p.need_action,'document')+'</span>':'<span class="muted">—</span>')+'</td>'
    +'<td>'+p.resources+'</td><td>'+fmtDate(p.updated_at)+'</td>'
    +'<td><span class="rowactions"><button type="button" class="edit-action" data-edit-project="'+p.id+'" aria-label="Edit '+E(p.name)+'" title="Edit details">'+pencil+'</button><button type="button" class="edit-action" data-duplicate-project="'+p.id+'" aria-label="Duplicate '+E(p.name)+'" title="Duplicate: copies the details, sources, templates and plan, without deliverables">'+dupIcon+'</button></span></td></tr>'
  const access=a=>a.map(g=>(g.role==='editor'?'Can edit':'Can comment')+'<small class="sub">'+E(g.scope==='project'?'Whole project':g.scope==='document'?g.document_name??g.document:(g.document_name??g.document)+' · '+g.step)+'</small>').join('')
  const sharedRow=p=>'<tr><td><button type="button" class="link" data-project="'+p.id+'" title="Open what was shared with you">'+E(p.name)+'</button><small class="sub">'+E(p.code)+'</small></td><td>'+E(p.owner_name)+'</td><td>'+access(p.access)+'</td><td>'+fmtDate(p.access[0]?.since)+'</td></tr>'
  return '<div class="title"><h1>Projects</h1><div><button type="button" class="primary" data-new-project title="Projects start in Claude or ChatGPT">＋ New project</button></div></div>'
    +'<div class="strip"><div class="card" style="--c:#3354ac"><small>Active projects</small><strong>'+projects.length+'</strong></div><div class="card" style="--c:#077862"><small>Final documents approved</small><strong>'+approved+' / '+docs+'</strong></div><div class="card" style="--c:#cd6835"><small>Documents needing action</small><strong>'+action+'</strong></div></div>'
    +'<section class="panel"><h2>Projects</h2>'+(projects.length?'<div class="scroll"><table><thead><tr><th>Project</th><th>Countries</th><th>Final documents</th><th>Needs action</th><th>Sources</th><th>Updated</th><th></th></tr></thead><tbody>'+projects.map(row).join('')+'</tbody></table></div>'
      :'<div class="pad"><p>No projects yet. Ask Claude or ChatGPT to prepare a CTIS submission: the assistant plans the documents with the TrialAgents planning checklists and saves the project here.</p><p class="prompt">“Prepare a CTIS initial application for our study in Germany and Spain.”</p></div>')+'</section>'
    +(shared.length?'<section class="panel"><h2>Shared with you</h2><div class="scroll"><table><thead><tr><th>Project</th><th>Shared by</th><th>Access</th><th>Since</th></tr></thead><tbody>'+shared.map(sharedRow).join('')+'</tbody></table></div></section>':'')
}

function newProjectDialog(){
  modal('<div class="modalhead"><div><h2 id="overlaytitle">Start a project in your assistant</h2></div><button type="button" class="iconbtn" data-close aria-label="Close">'+icon('close')+'</button></div>'
    +'<div class="modalbody pad"><p>New projects are created in Claude or ChatGPT. The assistant reads your protocol, uses the TrialAgents planning checklists for each country, and saves the plan. It then appears here in Projects for you and your team to review.</p>'
    +'<p class="prompt">“Start a new TrialAgents CTIS project for our study EX-102 in France and Italy.”</p>'
    +'<div class="rowbtns">'+['Claude','ChatGPT'].map(n=>'<a class="btn primary" href="'+assistantUrl[n]+'" target="_blank" rel="noopener">'+marks[n]+' Continue in '+n+'</a>').join(' ')+'</div></div>')
}

async function projectDrawer(id){
  const plan=await call('project.read',{project:id}),p=plan.project
  const [sources,templates]=await Promise.all(['source','template'].map(category=>call('resource.list',{input:{category}})))
  const used=new Set((plan.resources??[]).map(r=>r.id))
  const res=[...sources.resources,...templates.resources]
  drawer('<form id="projectform" data-id="'+p.id+'" data-revision="'+p.revision+'"><div class="line"><h2>Project details</h2><button type="button" data-close-drawer aria-label="Close">✕</button></div>'
    +field('Project name *','<input name="name" required maxlength="200" value="'+E(p.name)+'">')
    +'<div class="grid">'+field('Study code *','<input name="code" required maxlength="40" value="'+E(p.code)+'">')+field('Sponsor','<input name="sponsor" maxlength="200" value="'+E(p.sponsor)+'">')+'</div>'
    +'<div class="grid">'+field('Phase','<input name="phase" maxlength="40" value="'+E(p.phase)+'">')+field('Submission type','<input name="submission_type" maxlength="200" value="'+E(p.submission_type)+'" placeholder="Initial application">')+'</div>'
    +field('EU CT number','<input name="eu_ct_number" maxlength="40" value="'+E(p.eu_ct_number)+'" placeholder="e.g. 2026-512345-12-00">','Assigned by CTIS when the application is submitted.')
    +'<fieldset class="field"><legend>Member states</legend><div class="checkgrid">'+Object.entries(memberStates).map(([c,n])=>'<label class="chk"><input type="checkbox" name="countries" value="'+c+'"'+(p.countries.includes(c)?' checked':'')+'> '+E(n)+'</label>').join('')+'</div></fieldset>'
    +'<fieldset class="field"><legend>Sources and templates for the whole project</legend><p class="fieldnote">Used for every document. Choose sources for a single document in that document.</p>'
    +(res.length?'<div class="checklist">'+res.map(r=>'<label class="chk"><input type="checkbox" name="resources" value="'+r.id+'"'+(used.has(r.id)?' checked':'')+'> '+E(r.name)+' <small class="muted">'+E(r.type+(r.version?' · v'+r.version:''))+'</small></label>').join('')+'</div>':'<p class="muted">No sources or templates recorded yet.</p>')+'</fieldset>'
    +'<div class="rowbtns"><button class="primary">Save details</button><button type="button" data-close-drawer>Cancel</button></div></form>')
}
async function saveProject(form){
  const fd=new FormData(form),id=form.dataset.id,f=formData(form)
  const input={name:f.name,code:f.code,sponsor:f.sponsor,phase:f.phase,submission_type:f.submission_type,eu_ct_number:f.eu_ct_number,countries:fd.getAll('countries')}
  await write('project.update',{project:id,revision:Number(form.dataset.revision),input})
  await write('resources.set',{project:id,input:{resources:fd.getAll('resources')}})
  closeDrawer();toast('Project details saved');render()
}

function duplicateDialog(p){
  modal('<div class="modalhead"><div><h2 id="overlaytitle">Duplicate project</h2></div><button type="button" class="iconbtn" data-close aria-label="Close">'+icon('close')+'</button></div>'
    +'<form class="modalbody pad gearform" id="duplicateform" data-id="'+p.id+'"><p class="note">The copy keeps the details, sources and templates and the document plan. It starts without deliverables: no drafts, comments, approvals or sharing are copied.</p>'
    +field('Name of the copy','<input name="name" required maxlength="200" value="'+E(p.name+' – substantial modification')+'">')+field('Study code','<input name="code" required maxlength="40" value="'+E(p.code)+'">')
    +'<div class="rowbtns"><button class="btn primary">Duplicate</button><button type="button" class="btn" data-close>Cancel</button></div></form>')
}

// ---------- document plan ----------
async function planPage(){
  const plan=state.plan=await call('project.read',{project:state.project}),p=plan.project,owner=plan.role==='owner'
  const f=state.filters[p.id]??={part:'',country:'',language:''}
  const head='<div class="pl planhead"><div class="title"><div class="titleblock"><span class="eyebrow">'+E(p.code)+'</span><h1>'+E(p.name)+'</h1><div class="facts">'
    +[p.sponsor&&'<span>'+E(p.sponsor)+'</span>',p.countries.length&&'<span class="ccodes">'+p.countries.map(ctry).join('')+'</span>',
      plan.resources&&'<span><button type="button" class="link" data-tab="sources" data-filter-project="'+p.id+'">'+plural(plan.resources.filter(r=>r.category==='source').length,'source')+'</button><span class="sepdot">·</span><button type="button" class="link" data-tab="templates" data-filter-project="'+p.id+'">'+plural(plan.resources.filter(r=>r.category==='template').length,'template')+'</button></span>'].filter(Boolean).join('<b>·</b>')
    +'</div></div><div class="planbuttons">'+(owner?'<button type="button" data-edit-project="'+p.id+'">Project details</button>':'<span class="tag">'+(plan.role==='editor'?'Can edit':'Shared with you')+'</span>')+'</div></div></div>'
  if(!plan.documents.length)return head+'<section class="sheet"><div class="pad empty-panel"><h2>No submission plan yet</h2><p>Ask Claude or ChatGPT to propose the documents for this submission. The assistant uses the TrialAgents planning checklists for each country, lists each document with its regulatory code, language and filename, and saves the plan here.</p><p class="prompt">“Plan the CTIS documents for '+E(p.code)+'.”</p></div></section>'
  const docs=plan.documents.filter(d=>(!f.part||d.part===f.part)&&(!f.country||d.country===f.country)&&(!f.language||d.language===f.language))
  const steps=plan.steps
  const cell=(d,c)=>{
    if(c.status==='not_applicable')return '<td class="workcell"><span class="state na" title="Not part of the plan for this document">Not applicable</span></td>'
    const label=c.continued&&c.status==='action_required'?'Continued':statusLabel[c.status]
    return '<td class="workcell"><button type="button" class="cellbutton" data-cell="'+c.deliverable+'" title="Open '+c.deliverable+' · '+E(steps.find(s=>s.id===c.step).name)+(c.sourceChanged?' · source changed':'')+'"><span class="state '+(c.continued&&c.status==='action_required'?'ignored':statusClass[c.status])+'">'+label+(c.version&&c.status!=='waiting'?' <span class="vtag">v'+c.version+'</span>':'')+'</span></button></td>'
  }
  const final=d=>{
    const s=d.final,name=d.filename+(s.version?'_v'+s.version:'')+(steps.find(x=>x.id===s.step)?.type==='style'?'.docx':'')
    return '<td class="lastcol">'+(s.step?'<button type="button" class="fn" data-cell="'+d.id+'-'+s.step+'" aria-label="'+d.id+' · Final document · '+finalLabel[s.status]+'"><span class="finalstate'+(s.status==='approved'?' isready':'')+'">'+finalLabel[s.status]+(s.status==='approved'?' v'+s.version:'')+'</span><span class="fnametxt">'+E(name).replace(/_/g,'_<wbr>')+'</span></button>':'<span class="muted">—</span>')+'</td>'
  }
  const groups=[];for(const d of docs){const k=d.part==='I'?'I':'II|'+d.country;let g=groups.find(x=>x.k===k);if(!g)groups.push(g={k,part:d.part,country:d.country,docs:[]});g.docs.push(d)}
  const total=plan.documents.length,cols=steps.length+3
  const body=groups.map(g=>'<tbody><tr class="subrow"><th scope="rowgroup" class="grouptitle" colspan="'+(cols-1)+'"><span class="groupline"><span class="flag '+(g.part==='I'?'EU':g.country)+'">'+(g.part==='I'?'EU':'')+'</span>'+(g.part==='I'?'Part I':'Part II · '+E(countryName(g.country)))+'<span class="groupcount">/ '+g.docs.length+'</span></span></th><td class="lastcol"></td></tr>'
    +g.docs.map(d=>'<tr class="docline"><td class="doccell"><span class="docname plain" title="'+E(d.code+(d.variant?' · '+d.variant:''))+'">'+E(d.name)+'</span></td><td><span class="outlang">'+E(languageName(d.language))+'</span><span class="variant">'+E(d.variant)+'</span></td>'+d.cells.map(c=>cell(d,c)).join('')+final(d)+'</tr>').join('')+'</tbody>').join('')
  const countries=[...new Set(plan.documents.map(d=>d.country))],langs=[...new Set(plan.documents.map(d=>d.language))]
  const legend='<details class="legend"><summary>'+icon('info')+' Alert guide</summary><div class="legendPanel"><h3>Review alerts</h3>'+Object.entries(categories).map(([k,a])=>'<div class="legendRow" style="'+tone(k)+'"><i>'+icon(a.icon)+'</i><div><strong>'+a.label+'</strong><small>'+a.who+'</small><p>'+a.description+'</p></div></div>').join('')+'</div></details>'
  return head+'<section class="sheet"><div class="sheethead"><div><h2>Document plan</h2><p id="tally">'+plural(total,'document')+' · '+plural(steps.length,'step')+(plan.summary.need_action?' · '+plan.summary.need_action+' need action':'')+'</p></div><div class="tools">'
    +(owner?'<button class="btn" data-edit-steps title="Choose which steps run for every document">'+icon('sliders')+'Edit steps</button>':'')
    +(host!=='browser'&&plan.next?.deliverable?'<button class="btn" data-continue-plan title="Ask '+E(window.ctisHost?.name??'the assistant')+' to run the plan from '+E(plan.next.deliverable)+'">'+icon('play')+'Continue ('+E(plan.next.deliverable)+')</button>':'')
    +'<a class="btn primary" href="'+exportUrl(p.id)+'" title="Download every approved final document as one ZIP file">'+icon('download')+'Download all</a></div></div>'
    +'<div class="filterbar"><div class="filters"><span class="ficon">'+icon('filter')+'</span><select data-filter="part" aria-label="Filter by submission part">'+options([['','All parts'],['I','Part I'],['II','Part II']],f.part)+'</select>'
    +'<select data-filter="country" aria-label="Filter by country">'+options([['','All countries'],...countries.map(c=>[c,countryName(c)])],f.country)+'</select>'
    +'<select data-filter="language" aria-label="Filter by language">'+options([['','All languages'],...langs.map(l=>[l,languageName(l)])],f.language)+'</select>'
    +(f.part||f.country||f.language?'<button class="textbtn" data-clear-filters>Clear</button>':'')+'</div><div>'+legend+'</div></div>'
    +'<div class="scroll" tabindex="0" aria-label="Submission plan table"><table id="matrix" style="min-width:'+(240+119+steps.length*160+220)+'px"><colgroup><col style="width:240px"><col style="width:119px">'+steps.map(()=>'<col style="width:160px">').join('')+'<col style="width:220px"></colgroup>'
    +'<thead><tr class="tablehead"><th scope="col">Document</th><th scope="col">Language</th>'+steps.map(s=>'<th scope="col"><span class="thlabel">'+E(s.name)+(s.paused?' <small>(paused)</small>':'')+'</span></th>').join('')+'<th scope="col" class="lastcol"><span class="lasttitle">'+icon('pin')+' Final document</span></th></tr></thead>'
    +(body||'<tbody><tr><td colspan="'+cols+'" class="empty">No documents match these filters. <button class="textbtn" data-clear-filters>Clear filters</button></td></tr></tbody>')+'</table></div>'
    +'<footer class="sheetfoot"><span>'+docs.length+' of '+total+' documents</span><span>'+icon('pin')+' Final document pinned</span></footer></section>'
}

function stepsDialog(){
  const plan=state.plan,list=plan.steps.map(s=>({...s}))
  const draw=()=>{$('#addstep').innerHTML=options(Object.entries(stepCodes).filter(([k])=>k==='custom'||!list.some(s=>s.type===k)));$('#steplist').innerHTML=list.map((s,i)=>'<div class="stepline"><span class="number">'+String(i+1).padStart(2,'0')+'</span><div class="lead"><div class="name">'+E(s.name)+'</div><span class="muted">'+(s.paused?'Paused for every document':s.name!==stepCodes[s.type]?E(stepCodes[s.type]):'')+'</span></div><div class="stepacts">'
    +'<button type="button" class="iconbtn" data-step-move="'+i+'|-1" aria-label="Move up" title="Move up"'+(i?'':' disabled')+'>'+icon('up')+'</button><button type="button" class="iconbtn" data-step-move="'+i+'|1" aria-label="Move down" title="Move down"'+(i<list.length-1?'':' disabled')+'>'+icon('down')+'</button>'
    +'<button type="button" class="iconbtn" data-step-pause="'+i+'" title="'+(s.paused?'Resume':'Pause')+' this step for every document" aria-label="'+(s.paused?'Resume':'Pause')+'">'+icon(s.paused?'play':'skip')+'</button><button type="button" class="iconbtn" data-step-remove="'+i+'" title="Remove from the plan" aria-label="Remove"'+(list.length>1?'':' disabled')+'>'+icon('minus')+'</button></div></div>').join('')}
  modal('<div class="modalhead"><div><h2 id="overlaytitle">Edit plan steps</h2></div><button type="button" class="iconbtn" data-close aria-label="Close">'+icon('close')+'</button></div>'
    +'<div class="modalbody pad"><p class="note">The steps every document goes through, in order. The Draft step already checks the content template’s checklist.</p><div id="steplist"></div>'
    +'<div class="rowbtns"><label class="field">Add a step<select id="addstep">'+options(Object.entries(stepCodes).filter(([k])=>k==='custom'||!list.some(s=>s.type===k)))+'</select></label><button type="button" class="btn" data-step-add>Add</button></div>'
    +'<div class="rowbtns"><button type="button" class="btn primary" data-steps-save>Save steps</button><button type="button" class="btn" data-close>Cancel</button></div></div>')
  draw()
  $('#dialog-content').onclick=async e=>{
    const b=e.target.closest('button');if(!b)return
    if(b.dataset.stepMove){const [i,d]=b.dataset.stepMove.split('|').map(Number);[list[i],list[i+d]]=[list[i+d],list[i]];draw()}
    if(b.dataset.stepPause!==undefined){list[+b.dataset.stepPause].paused=!list[+b.dataset.stepPause].paused;draw()}
    if(b.dataset.stepRemove!==undefined){list.splice(+b.dataset.stepRemove,1);draw()}
    if(b.hasAttribute('data-step-add')){const type=$('#addstep').value,at=list.findIndex(s=>s.type==='style');list.splice(at<0?list.length:at,0,{type,name:stepCodes[type],instruction:'',paused:false});draw()}
    if(b.hasAttribute('data-steps-save')){
      const na=plan.documents.flatMap(d=>d.cells.filter(c=>c.status==='not_applicable'&&!plan.steps.find(s=>s.id===c.step)?.paused).map(c=>({document:d.id,step:c.step}))).filter(x=>list.some(s=>s.id===x.step))
      await write('plan.save',{project:plan.project.id,revision:plan.project.revision,input:{
        documents:plan.documents.map(d=>({id:d.id,name:d.name,part:d.part,country:d.country,language:d.language,variant:d.variant,code:d.code,filename:d.filename,catalog:d.catalog??{}})),
        steps:list.map(s=>({...(s.id?{id:s.id}:{}),type:s.type,name:s.name,instruction:s.instruction??'',paused:!!s.paused})),not_applicable:na}}).then(()=>{closeModal();toast('Steps saved');render()},err=>toast(err.message))
    }
  }
}

// ---------- inside an assistant ----------
const appLink=()=>'https://ctis.trialagents.com/'+(state.project?'?project='+encodeURIComponent(state.project)+(state.deliverable?'&deliverable='+encodeURIComponent(state.deliverable):''):'')
async function hostLink(href){
  const u=new URL(href,'https://ctis.trialagents.com')
  if(u.pathname==='/api/ctis/download'){
    const f=await call('version.file',{project:u.searchParams.get('project'),input:{deliverable:u.searchParams.get('deliverable'),...(u.searchParams.get('n')?{n:+u.searchParams.get('n')}:{})}})
    return window.ctisHost.download(f).catch(()=>window.ctisHost.openLink(u.href))
  }
  return window.ctisHost.openLink(u.href)
}

// ---------- events ----------
document.addEventListener('click',async e=>{
  const b=e.target.closest('button,a');if(!b)return
  const d=b.dataset
  try{
    if(d.onlyAssistant!==undefined){e.preventDefault();toast('Available in Claude or ChatGPT');return}
    if(b.classList.contains('sidebar-toggle')){setSidebar($('#rail').hidden);return}
    if(d.tab){if(d.filterProject)state.filters[d.tab]={project:d.filterProject};return go(d.tab)}
    if(d.project)return go('plan',{project:d.project})
    if(d.cell)return go('plan',{project:state.project,deliverable:d.cell})
    if(d.newProject!==undefined)return host==='browser'?newProjectDialog():askAssistant('Start a new TrialAgents CTIS project.')
    if(d.openApp!==undefined)return window.ctisHost.openLink(appLink())
    if(d.continuePlan!==undefined)return askAssistant('Continue the TrialAgents CTIS plan for '+state.plan.project.code+' (project '+state.plan.project.id+').')
    // Inside an assistant, links open through the host; Word files download through it.
    if(host!=='browser'&&b.tagName==='A'){e.preventDefault();return hostLink(b.getAttribute('href'))}
    if(d.editProject)return projectDrawer(d.editProject)
    if(d.duplicateProject){const {projects}=await call('project.list');return duplicateDialog(projects.find(p=>p.id===d.duplicateProject)??state.plan.project)}
    if(d.editSteps!==undefined)return stepsDialog()
    if(d.clearFilters!==undefined){state.filters[state.project]={part:'',country:'',language:''};return render()}
    if(d.close!==undefined)return closeModal()
    if(d.closeDrawer!==undefined)return closeDrawer()
    if(await registryEvents(b,state)||await settingsEvents(b,state))return
  }catch(err){toast(err.message)}
})
document.addEventListener('change',e=>{
  const s=e.target.closest('[data-filter]');if(!s||!state.project)return
  state.filters[state.project][s.dataset.filter]=s.value;render()
})
document.addEventListener('submit',async e=>{
  const form=e.target;e.preventDefault()
  try{
    if(form.id==='projectform')return await saveProject(form)
    if(form.id==='duplicateform'){const f=formData(form);const r=await write('project.duplicate',{project:form.dataset.id,input:{name:f.name,code:f.code}});closeModal();toast('Duplicated');return go('plan',{project:r.project.id})}
    if(await registrySubmit(form,state)||await settingsSubmit(form,state))return
  }catch(err){const out=form.querySelector('output');if(out)out.textContent=err.message;else toast(err.message)}
})

// The sidebar starts hidden inside Claude and ChatGPT, where the workspace shares the chat's width; the menu button
// left of the logo shows and hides it (as in TrialAgents Pipeline). The browser app starts with it shown.
function setSidebar(show){
  const r=$('#rail'),t=document.querySelector('.sidebar-toggle');r.hidden=!show
  if(t){const label=show?'Hide sidebar':'Show sidebar';t.setAttribute('aria-expanded',String(show));t.setAttribute('aria-label',label);t.title=label}
}
;(async()=>{
  Object.assign(nav,{state,render,go})
  if(host!=='browser')setSidebar(false)
  if(host==='browser')readUrl()
  else{try{await window.ctisHost.ready}catch{};const t=window.ctisHost.initial();if(t)Object.assign(state,{view:t.view,project:t.project,deliverable:t.deliverable})}
  try{state.account=await call('account.read')}catch(e){if(e.status===401){if(host==='browser'){location.replace('/auth?mode=login&ctis=1');return}$('#page').innerHTML='<section class="panel empty-panel"><h2>Sign in to TrialAgents CTIS</h2><p><a class="primary btn" href="'+(host==='browser'?'':'https://ctis.trialagents.com')+'/auth?mode=login&ctis=1">Sign in</a></p></section>';return}}
  render()
})()
