// Settings: Personal, Team, Logs, Billing, Notifications, Support.
import {call,write} from './api.js'
import {E,icon,host,sectionIcon,fmtDate,fmtTime,initials,toast,options,formData} from './ui.js'
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
  // Profile, password and support are the shared TrialAgents account settings (as in Pipeline), embedded here.
  async Personal(state){return accountFrame('account','Personal')},
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
    const a=state.account,returned=new URLSearchParams(location.search).get('checkout')==='done'
    if(a.team)return '<section class="combined-billing-card panel"><div class="pad"><p><span class="tag good">Active</span></p><strong>TrialAgents CTIS Team · Monthly subscription</strong><p>€49 per month · Unlimited people to share with</p>'
      +(a.paid_until?'<p class="muted">Paid through '+fmtDate(a.paid_until)+'</p>':'')+(a.billing.customer?'<button type="button" data-billing-portal>Manage billing</button> <output></output>':'')+'</div></section>'
    return (returned?'<div class="notice pad">Payment is being confirmed. This page shows the Team plan as soon as Stripe confirms it.</div>':'')
      +'<section class="combined-premium-banner pipeline-team-offer" aria-label="TrialAgents CTIS Team"><div class="combined-premium-pitch"><span class="combined-premium-eyebrow">TrialAgents CTIS Team</span><h2>Review submissions as a team.</h2><p>Bring reviewers into the exact document and passage.</p><ul><li>Invite people to a deliverable, a document or a whole project</li><li>Reviewers comment, or edit through their own assistant</li><li>No assistant account needed to comment</li><li>Audit history and owner approval records</li></ul></div>'
      +'<div class="combined-premium-offers"><p class="combined-offers-heading">Team subscription</p><button type="button" data-upgrade title="Start the Team subscription"'+(a.billing_available?'':' disabled')+'><span>Monthly</span><strong>€49 <small>/ month</small></strong><span class="combined-offer-action">Upgrade to Team</span></button>'
      +'<p>'+(a.billing_available?'Individual use stays free. The Team subscription renews monthly and can be canceled in Billing.':'Checkout is not available on this server.')+'</p><output></output></div></section>'
  },
  async Notifications(){
    const {types}=await call('preferences.read')
    return panel('Email notifications','<form class="pad gearform" id="prefsform">'+types.map(t=>'<label class="mail-pref"><span><strong>'+E(t.label)+'</strong><small>'+E(t.description)+'</small></span><input name="'+t.id+'" type="checkbox" role="switch"'+(t.on?' checked':'')+'></label>').join('')
      +'<p class="muted">You always get an email when someone shares something with you.</p><button class="primary">Save preferences</button> <output></output></form>')
  },
  async Support(){return accountFrame('support','Support')}
}

function accountFrame(tab,label){
  if(host!=='browser')return panel(label,'<div class="pad"><p>Your '+(tab==='support'?'support requests':'profile, password and sign-in')+' are managed in your TrialAgents account.</p><button type="button" data-open-account="'+tab+'">Open '+label+' in TrialAgents</button></div>')
  return '<div id="account-holder" data-tab="'+tab+'"></div>'
}
// The account page is served by the same site; size the frame to its content.
export function mountAccountFrame(){
  const holder=document.getElementById('account-holder');if(!holder||holder.firstChild)return
  const frame=document.createElement('iframe')
  frame.className='account-frame';frame.title=holder.dataset.tab==='support'?'Support':'Personal';frame.src='/ctis-account?tab='+holder.dataset.tab
  frame.style.cssText='width:100%;border:0;min-height:420px;display:block'
  frame.addEventListener('load',()=>{
    const content=frame.contentDocument?.querySelector('.ctis-account');if(!content)return
    const fit=()=>{frame.style.height=Math.ceil(content.getBoundingClientRect().height)+'px'}
    new ResizeObserver(fit).observe(content);fit()
  })
  holder.append(frame)
}

export async function settingsEvents(b,state){
  const d=b.dataset
  if(d.openAccount){await window.ctisHost.openLink('https://ctis.trialagents.com/?tab=settings&section='+(d.openAccount==='support'?'Support':'Personal'));return true}
  if(d.upgrade!==undefined||d.billingPortal!==undefined){
    const out=b.parentElement.querySelector('output')
    try{
      b.disabled=true
      const {url}=await write(d.upgrade!==undefined?'billing.checkout':'billing.portal')
      const u=new URL(url);if(u.protocol!=='https:'||!['checkout.stripe.com','billing.stripe.com'].includes(u.hostname))throw new Error('Unexpected billing address')
      if(host==='browser')location.assign(url);else await window.ctisHost.openLink(url)
    }catch(err){if(out)out.textContent=err.message;b.disabled=false}
    return true
  }
  if(d.settingsSection){state.section=d.settingsSection;await nav.go('settings',{section:d.settingsSection});return true}
  if(d.shareRevoke){await write('share.revoke',{project:d.projectId,input:{id:d.shareRevoke}});toast('Stopped sharing');await nav.render();return true}
  if(d.logsMore!==undefined){const r=await call('logs',{project:logState.project||undefined,input:{limit:100,before:logState.before}});logState.entries.push(...r.entries);logState.before=r.before;await nav.render();return true}
  return false
}
export async function settingsSubmit(form){
  if(form.id!=='prefsform')return false
  const prefs=Object.fromEntries([...form.querySelectorAll('input[type=checkbox]')].map(i=>[i.name,i.checked]))
  await write('preferences.save',{input:prefs});form.querySelector('output').textContent='Saved'
  return true
}
document.addEventListener('change',async e=>{
  const t=e.target
  if(t.dataset.shareRole){try{await write('share.update',{project:t.dataset.projectId,input:{id:t.dataset.shareRole,role:t.value}});toast('Access changed')}catch(err){toast(err.message)}return}
  if(t.closest('#logfilters')){const f=formData(t.closest('form'));if(f.project!==logState.project)logState={project:f.project,q:f.q,entries:[],before:null};else logState.q=f.q;nav.render()}
})
