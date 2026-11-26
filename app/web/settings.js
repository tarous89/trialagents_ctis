// Settings: Personal, Team, Logs, Billing, Notifications, Support.
import {call,write} from './api.js'
import {E,icon,sectionIcon,fmtDate,fmtTime,initials,toast,options,formData} from './ui.js'
import {nav} from './nav.js'

const actions={'project.created':'Created project','project.updated':'Changed project details','project.duplicated':'Duplicated project','project.archived':'Archived project',
  'plan.saved':'Saved the plan','version.saved':'Saved a version','version.restored':'Restored a version','comment.created':'Commented','thread.replied':'Replied',
  'thread.resolved':'Resolved a thread','thread.reopened':'Reopened a thread','continue.set':'Ignore and continue','continue.undone':'Undid continue',
  'final.approved':'Approved the final document','resource.recorded':'Recorded a source or template','resource.uploaded':'Uploaded a file','resource.updated':'Corrected source details',
  'resources.changed':'Changed project sources','document.resources.changed':'Changed document sources','share.created':'Shared','share.updated':'Changed access','share.revoked':'Stopped sharing'}
const sourceName=s=>s==='web'?'Browser':s
let logState={project:'',q:'',entries:[],before:null}

export async function settingsPage(state){
  const sections=['Personal','Team','Logs','Billing','Notifications','Support']
  const sec=sections.includes(state.section)?state.section:'Personal'
  const menu='<div class="pipeline-settings"><nav class="settings-tabs" aria-label="Settings sections">'+sections.map(n=>'<button type="button" data-settings-section="'+n+'" aria-pressed="'+(sec===n)+'" class="'+(sec===n?'active':'')+'">'+sectionIcon(n)+n+'</button>').join('')+'</nav></div>'
  return '<div class="title"><h1>Settings</h1></div><div class="settings-page">'+menu+'<div class="settings-sections">'+await sections_[sec](state)+'</div></div>'
}

const panel=(title,body,extra='')=>'<section class="panel'+(extra?' '+extra:'')+'"><h2>'+title+'</h2>'+body+'</section>'
const sections_={
  async Personal(state){
    const a=state.account
    return panel('Profile','<div class="pad"><div class="avatarline"><span class="avatar-lg">'+E(initials(a.name))+'</span><div><strong>'+E(a.name)+'</strong><small>'+E(a.email)+'</small></div></div>'
      +'<p>Your name, email and password belong to your TrialAgents account, shared with the other TrialAgents apps.</p><p><a class="btn" href="/ctis-account">Manage your TrialAgents account</a></p></div>')
      +'<div class="assistant-settings-cards">'+['Claude','ChatGPT'].map(n=>panel(n,'<div class="pad"><p>Add TrialAgents CTIS to '+n+' and sign in with this account. '+n+' can then read your projects, plan submissions, and save drafts and reviews for you to approve.</p><p class="muted">Each change made through '+n+' is recorded as '+n+' in Logs.</p><a class="btn" href="https://ctis.trialagents.com/ctis-info/connectors#'+n.toLowerCase()+'" target="_blank" rel="noopener">How to connect '+n+'</a></div>')).join('')+'</div>'
  },
  async Team(state){
    const {shares}=await call('share.list')
    const team=state.account.team
    if(!shares.length)return (team?'':'<section class="panel upsell"><div class="pad"><strong>Sharing is part of TrialAgents CTIS Team.</strong><p>Share a deliverable, a document or a whole project. People you share with comment, or edit through their own assistant.</p><button type="button" class="primary" data-settings-section="Billing">See the Team plan</button></div></section>')
      +panel('People you share with','<p class="pad muted">You are not sharing anything yet. Use Invite in a deliverable to share it, its document or the whole project.</p>')
    const byPerson=new Map();for(const s of shares){if(!byPerson.has(s.email))byPerson.set(s.email,[]);byPerson.get(s.email).push(s)}
    const what=s=>E(s.code)+' · '+(s.scope==='project'?'Whole project':s.scope==='document'?E(s.document_name??s.document):E((s.document_name??s.document)+' · '+s.step))
    return panel('People you share with','<div class="scroll"><table><thead><tr><th>Person</th><th>Shared</th><th>Access</th><th>Opened</th><th></th></tr></thead><tbody>'
      +[...byPerson].map(([email,list])=>list.map((s,i)=>'<tr>'+(i===0?'<td rowspan="'+list.length+'"><strong>'+E(email)+'</strong></td>':'')+'<td>'+what(s)+'<small class="sub">since '+fmtDate(s.created_at)+'</small></td>'
        +'<td><select data-share-role="'+s.id+'" data-project-id="'+s.project+'" aria-label="Access for '+E(email)+'">'+options([['commenter','Can comment'],['editor','Can edit']],s.role)+'</select></td>'
        +'<td>'+(s.first_opened_at?fmtDate(s.first_opened_at):'<span class="muted">Not yet</span>')+'</td><td><button type="button" class="edit-action" data-share-revoke="'+s.id+'" data-project-id="'+s.project+'" title="Stop sharing this item" aria-label="Stop sharing '+E(what(s))+' with '+E(email)+'">'+icon('minus')+'</button></td></tr>').join('')).join('')
      +'</tbody></table></div>')
  },
  async Logs(state){
    const {projects,shared}=await call('project.list')
    const all=[...projects,...shared]
    if(!logState.entries.length||logState.stale){const r=await call('logs',{project:logState.project||undefined,input:{limit:100}});logState={...logState,entries:r.entries,before:r.before,stale:false}}
    const q=logState.q.toLowerCase(),names=new Map(all.map(p=>[p.id,p.code]))
    const rows=logState.entries.filter(e=>!q||[e.actor_name,e.action,actions[e.action],e.target,JSON.stringify(e.details)].join(' ').toLowerCase().includes(q))
    return panel('Activity','<form class="filters pad" id="logfilters"><label>Project<select name="project">'+options([['','All your projects'],...all.map(p=>[p.id,p.code+' · '+p.name])],logState.project)+'</select></label><label>Search<input type="search" name="q" value="'+E(logState.q)+'" placeholder="Person, document or action"></label></form>'
      +'<div class="scroll"><table class="logs"><thead><tr><th>When</th><th>Who</th><th>Via</th><th>What</th><th>Project</th><th>Item</th></tr></thead><tbody>'
      +(rows.map(e=>'<tr><td>'+fmtTime(e.happened_at)+'</td><td>'+E(e.actor_name)+'</td><td>'+E(sourceName(e.source))+'</td><td>'+E(actions[e.action]??e.action)+(e.details?.n?' <small class="muted">v'+e.details.n+'</small>':'')+(e.details?.asked_in_chat?' <small class="muted">(asked in the chat)</small>':'')+'</td><td>'+E(names.get(e.project_id)??'')+'</td><td>'+E(e.target??'')+'</td></tr>').join('')||'<tr><td colspan="6" class="muted">No activity matches.</td></tr>')
      +'</tbody></table></div>'+(logState.before?'<p class="pad"><button type="button" class="textbtn" data-logs-more>Show earlier activity</button></p>':''))
  },
  async Billing(state){
    const a=state.account
    return panel('Your plan','<div class="pad">'+(a.team?'<p><span class="tag good">TrialAgents CTIS Team</span> €49 per month. You can share deliverables, documents and projects with unlimited people.</p>'+(a.paid_until?'<p class="muted">Paid until '+fmtDate(a.paid_until)+'</p>':'')
      :'<p><strong>Individual</strong> · free. Your own projects, with Claude and ChatGPT, without limits.</p><p><strong>TrialAgents CTIS Team</strong> · €49 per month. Share a deliverable, a document or a whole project with unlimited people. People you share with comment, or edit through their own assistant.</p><p class="muted">Online checkout for the Team plan opens soon. Until then, contact support to upgrade.</p><a class="btn primary" href="mailto:contact@trialagents.com?subject=TrialAgents%20CTIS%20Team">Contact us to upgrade</a>')+'</div>')
  },
  async Notifications(){
    return panel('Email notifications','<div class="pad"><p>Email notifications for drafts, findings, comments, approvals and changed sources are coming soon. Until then, check Logs for what changed.</p></div>')
  },
  async Support(){
    return panel('Support','<div class="pad"><p>Questions, problems or ideas: write to <a href="mailto:contact@trialagents.com">contact@trialagents.com</a>.</p><ul><li><a href="/ctis-info/connectors" target="_blank" rel="noopener">Connect Claude or ChatGPT</a></li><li><a href="/ctis-info/privacy" target="_blank" rel="noopener">Privacy</a></li><li><a href="/ctis-info/terms" target="_blank" rel="noopener">Terms</a></li></ul></div>')
  }
}

export async function settingsEvents(b,state){
  const d=b.dataset
  if(d.settingsSection){state.section=d.settingsSection;await nav.go('settings',{section:d.settingsSection});return true}
  if(d.shareRevoke){await write('share.revoke',{project:d.projectId,input:{id:d.shareRevoke}});toast('Stopped sharing');await nav.render();return true}
  if(d.logsMore!==undefined){const r=await call('logs',{project:logState.project||undefined,input:{limit:100,before:logState.before}});logState.entries.push(...r.entries);logState.before=r.before;await nav.render();return true}
  return false
}
export async function settingsSubmit(){return false}
document.addEventListener('change',async e=>{
  const t=e.target
  if(t.dataset.shareRole){try{await write('share.update',{project:t.dataset.projectId,input:{id:t.dataset.shareRole,role:t.value}});toast('Access changed')}catch(err){toast(err.message)}return}
  if(t.closest('#logfilters')){const f=formData(t.closest('form'));if(f.project!==logState.project)logState={project:f.project,q:f.q,entries:[],before:null};else logState.q=f.q;nav.render()}
})
