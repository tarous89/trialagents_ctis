/* ---------- TrialAgents CTIS workspace shell (Pipeline layout) ---------- */
const E=safe,elx=id=>document.getElementById(id);
const memberStates={AT:'Austria',BE:'Belgium',BG:'Bulgaria',HR:'Croatia',CY:'Cyprus',CZ:'Czechia',DK:'Denmark',EE:'Estonia',FI:'Finland',FR:'France',DE:'Germany',GR:'Greece',HU:'Hungary',IS:'Iceland',IE:'Ireland',IT:'Italy',LV:'Latvia',LI:'Liechtenstein',LT:'Lithuania',LU:'Luxembourg',MT:'Malta',NL:'Netherlands',NO:'Norway',PL:'Poland',PT:'Portugal',RO:'Romania',SK:'Slovakia',SI:'Slovenia',ES:'Spain',SE:'Sweden'};
const countryNames={EU:'Shared',...memberStates};
const stepCode={draft:'DR',qc:'QC',check:'CL',style:'ST',team:'TR',compare:'CV',cross:'CX',guide:'IG',custom:'CS'};
const dcode=(id,k)=>id+'-'+(stepCode[k?.type]||'S'+(k?.id??''));
const sourceKinds=['Protocol','Protocol amendment','Investigator’s brochure','Study manual','Source document','Other'];
const templateKinds=['Writing template','Checklist','Word layout','SOP or guideline'];
const templateOf=r=>['Writing template','Word layout','Internal guideline','Checklist','SOP or guideline'].includes(r.kind);
const kindLabel=k=>k==='Internal guideline'?'SOP or guideline':k;
const railIcons={Projects:'M3 6h6l2 2h10v11H3z',Plan:'M3 4h7v16H3z M14 4h7v6h-7z M14 14h7v6h-7z',Sources:'M3 4q5-2 9 1v15q-4-3-9-1zM21 4q-5-2-9 1v15q4-3 9-1z',Templates:'M5 3h9l5 5v13H5zM14 3v6h5M8 13h8m-8 4h6',Settings:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z'};
const railIcon=k=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+railIcons[k]+'"/></svg>';
const sectionIconPaths={Personal:'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',Project:'M3 6h6l2 2h10v11H3z',Team:'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6m2 9a6 6 0 0 0-3-5',Sharing:'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6m2 9a6 6 0 0 0-3-5',Team:'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6m2 9a6 6 0 0 0-3-5',Logs:'M3 12h4l3-8 4 16 3-8h4',Billing:'M3 6h18v12H3zM3 10h18M7 15h3',Notifications:'M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4',Support:'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9a2.7 2.7 0 0 1 5.2 1c0 2-2.7 2.2-2.7 4M12 18h.01'};
const sectionIcon=k=>'<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="'+sectionIconPaths[k]+'"/></svg>';
const dupIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 8h12v12H8zM16 8V4H4v12h4"/></svg>';
const pencil='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16zM13 7l4 4"/></svg>';
const mark=name=>name==='Claude'?'%%CLAUDE_MARK%%':'%%CHATGPT_MARK%%';
const ptable=(h,rows,cls='')=>'<div class="scroll"><table class="'+cls+'"><thead><tr>'+h.map(x=>'<th>'+x+'</th>').join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr'+(r.attrs?' '+r.attrs:'')+'>'+(r.cells||r).map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
const ppanel=(t,c,extra='')=>'<section class="panel'+(extra?' '+extra:'')+'">'+(t?'<h2>'+t+'</h2>':'')+c+'</section>';
const ptag=(t,c='')=>'<span class="tag '+c+'">'+E(t)+'</span>';
const pfield=(label,input,hint='')=>'<label class="field">'+label+input+(hint?'<small class="hint">'+hint+'</small>':'')+'</label>';
const popts=(arr,v)=>arr.map(x=>{const [val,lab]=Array.isArray(x)?x:[x,x];return '<option value="'+E(val)+'"'+(String(val)===String(v)?' selected':'')+'>'+E(lab)+'</option>'}).join('');
const fmtDate=d=>{if(!d)return '—';const x=new Date(d+'T12:00:00');return isNaN(x)?E(d):x.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})};
const fmtSize=n=>n>=1048576?(n/1048576).toFixed(1)+' MB':Math.max(1,Math.round(n/1024))+' KB';
const assistantLink=(name,verb)=>'<button type="button" class="assistant-link" data-assistant="'+name+'">'+mark(name)+'<span>'+verb+' '+name+'</span></button>';

let route='projects',settingTab='Personal',srcFilter={q:'',project:'',kind:'',file:''},tplFilter={q:'',project:'',kind:'',country:''},logQuery='',drawerState=null;

function upgrade(d){
 d.ui??={};
 d.projects??=[
  {id:'EX-101',name:'CTIS initial application EX-101',code:'EX-101',phase:'Phase II',sponsor:'Example Bio GmbH',countries:['DE','ES'],owner:'Alex Morgan',updated:'2026-11-25',created:'2026-11-03',planId:'P01'},
  {id:'NX-220',name:'NX-220 first-in-human study',code:'NX-220',phase:'Phase I',sponsor:'Example Bio GmbH',countries:['NL','BE'],owner:'Alex Morgan',updated:'2026-11-18',created:'2026-11-17',planId:''},
  {id:'RT-330',name:'RT-330 pivotal study',code:'RT-330',phase:'Phase III',sponsor:'Example Bio GmbH',countries:['FR','IT','PL'],owner:'Sofia Ruiz',updated:'2026-10-30',created:'2026-10-21',planId:''}
 ];
 const base={1:{cat:'source',kind:'Protocol',version:'3.0',date:'2026-09-14',projects:['EX-101'],file:null,link:'',via:'Claude',by:'Alex Morgan',added:'2026-11-03',used:['D01','D02','D03','D04','D05','D06','D07','D08']},
  2:{cat:'template',kind:'Internal guideline',version:'2.0',date:'2026-06-01',projects:['EX-101'],file:{name:'Country_operations_manual_v2.0.pdf',size:842000},link:'',via:'Browser',by:'Alex Morgan',added:'2026-11-04',used:['D04','D05','D06','D07','D08'],lang:'',doctype:'Any'},
  3:{cat:'template',kind:'Writing template',version:'1.4',date:'2026-05-20',projects:['EX-101'],file:null,link:'',via:'Claude',by:'Alex Morgan',added:'2026-11-03',used:['D04','D05','D07'],lang:'en',doctype:'Participant information & consent'},
  4:{cat:'template',kind:'Word layout',version:'2026.1',date:'2026-01-10',projects:['EX-101','NX-220'],file:null,link:'',via:'ChatGPT',by:'Alex Morgan',added:'2026-11-05',used:[],lang:'',doctype:'Any'}};
 for(const r of d.resources){if(base[r.id])for(const [k,v] of Object.entries(base[r.id]))r[k]??=v;r.cat??=templateOf(r)?'template':'source';r.projects??=['EX-101'];r.version??='';r.used??=[];r.via??='Browser';r.by??='Alex Morgan';r.added??=now();if(r.blob&&!r.file)r.file={name:r.filename||'file',size:0};r.file??=null;r.link??=r.url||''}
 if(!d.resources.some(r=>r.id===5))d.resources.push(
  {id:5,cat:'source',name:'EX-101 Investigator’s brochure',kind:'Investigator’s brochure',version:'2.1',date:'2026-08-02',scope:'All',mode:'Saved',projects:['EX-101'],file:{name:'EX-101_IB_v2.1.pdf',size:2516582},link:'',via:'ChatGPT',by:'Alex Morgan',added:'2026-11-06',used:['D01','D03'],detail:'Safety and dosing sections cited in the protocol synopsis.'},
  {id:6,cat:'source',name:'Site manual',kind:'Study manual',version:'1.1',date:'2026-10-12',scope:'All',mode:'External link',projects:['EX-101'],file:null,link:'https://example.com/ex-101/site-manual',via:'Claude',by:'Alex Morgan',added:'2026-11-07',used:['D04','D05','D07'],detail:'Visit procedures, participant copies of consent, and reimbursement of documented travel expenses.'},
  {id:7,cat:'source',name:'NX-220 protocol draft',kind:'Protocol',version:'0.9',date:'2026-11-12',scope:'All',mode:'Chat only',projects:['NX-220'],file:null,link:'',via:'Claude',by:'Alex Morgan',added:'2026-11-17',used:[],detail:'Recorded by name when the plan discussion started. No copy stored.'},
  {id:8,cat:'source',name:'Clinical trial insurance certificate (Germany)',kind:'Source document',version:'',date:'2026-10-28',scope:'DE',mode:'Saved',projects:['EX-101'],file:{name:'EX-101_DE_insurance.pdf',size:318000},link:'',via:'Browser',by:'Sofia Ruiz',added:'2026-11-10',used:['D04'],detail:''},
  {id:9,cat:'template',name:'Recruitment outline',kind:'Writing template',version:'1.0',date:'2026-04-02',scope:'All',mode:'Chat only',projects:['EX-101','NX-220'],file:null,link:'',via:'ChatGPT',by:'Alex Morgan',added:'2026-11-08',used:['D06','D08'],lang:'',doctype:'Recruitment material',detail:'Sponsor outline supplied in chat. Recorded by name only.'},
  {id:10,cat:'template',name:'Sponsor Part II pre-submission checklist',kind:'Checklist',version:'3',date:'2026-07-15',scope:'All',mode:'Saved',projects:['EX-101','RT-330'],file:{name:'PartII_checklist_v3.xlsx',size:96000},link:'',via:'Browser',by:'Alex Morgan',added:'2026-11-08',used:['D04','D06','D07','D08'],lang:'',doctype:'Any',detail:'Added to the country checklist items. TrialAgents items still apply.'});
 d.team??=[{name:'Alex Morgan',email:'alex.morgan@example.com',role:'owner',projects:'all'}];
 d.invites??=[];
 d.billing??={team:false};
 d.shares??=[...(d.invites||[]).map(v=>({email:v.email,opened:false,sent:v.sent,grants:(v.projects||[v.project]).filter(Boolean).map(pid=>({project:pid,scope:v.scope==='project'||!v.scope?'project':v.scope,doc:v.doc||'',sid:v.code?(d.plans[0]?.steps.find(s=>v.code.endsWith('-'+({draft:'DR',qc:'QC',check:'CL',style:'ST'})[s.type]))?.id??null):null,role:v.role}))})),...d.team.filter(m=>m.role!=='owner').map(m=>({email:m.email,name:m.name,opened:true,sent:now(),grants:(m.projects==='all'?d.projects.map(x=>x.id):m.projects||[]).map(pid=>({project:pid,scope:'project',role:m.role}))}))];
 delete d.invites;
 if(!d.projects.some(x=>x.shared)){
  const base=d.plans.find(x=>x.id==='P01');
  if(base){const q={...JSON.parse(JSON.stringify(base)),id:'S01',title:'Shared',base:''};for(const dd of Object.values(q.docs)){delete dd.approval;for(const w of Object.values(dd.work||{})){w.invites=[];w.threads=[];w.threadSeq=0}}delete q.exampleApproval;d.plans.push(q);
  d.projects.push({id:'BX-212',name:'CTIS initial application BX-212',code:'BX-212',phase:'Phase II',sponsor:'Nordic Biotech AB',countries:['DE','ES'],owner:'Maria Keller',updated:'2026-11-24',created:'2026-11-10',planId:'S01',shared:{by:'Maria Keller',org:'Nordic Biotech AB',scope:'document',doc:'D04',sid:null,role:'commenter',since:'2026-11-24'}})}
 }
 d.logs??=[
  ['2026-11-25 16:42','Alex Morgan','Claude','Saved deliverable','EX-101 · D04-DR v2'],
  ['2026-11-25 16:40','Alex Morgan','Claude','Recorded source','EX-101 · Site manual v1.1'],
  ['2026-11-25 11:05','Alex Morgan','Browser','Commented','EX-101 · D04-QC #2'],
  ['2026-11-24 09:12','Alex Morgan','ChatGPT','Recorded template','EX-101 · Recruitment outline v1.0'],
  ['2026-11-17 14:01','Alex Morgan','Claude','Created project','NX-220 first-in-human study']];
 d.profile??={name:'Alex Morgan',email:'alex.morgan@example.com',title:'Regulatory affairs lead',org:'Example Bio GmbH',tz:'Europe/Berlin',lang:'English',twofa:true,claude:true,chatgpt:false};
 d.prefs??={draft:true,finding:true,comment:true,invite:true,approval:true,source:false};
 d.defaults??={steps:['draft','qc','check'],pattern:'{study}_{part}_{country}_{doc}_{lang}_{variant}_v{version}'};
 for(const p of d.projects){if(p.hasPlans!==undefined){p.planId=p.hasPlans?'P01':'';delete p.hasPlans}}
 if(!d.ui.resModel){
  const links={3:['D04','D05','D07'],8:['D04'],9:['D06','D08']};
  for(const r of d.resources){
   const legacy={...(r.docLinks||{})};if(links[r.id]&&!legacy['EX-101'])legacy['EX-101']=links[r.id];delete r.docLinks;
   for(const [pid,docs] of Object.entries(legacy)){r.projects=r.projects.filter(x=>x!==pid);const pr=d.projects.find(x=>x.id===pid),pl=pr&&d.plans.find(x=>x.id===pr.planId);if(pl)for(const did of docs){const dd=pl.docs[did];if(dd&&!(dd.resAdd??=[]).includes(r.id))dd.resAdd.push(r.id)}}
  }
  const p1=d.plans.find(x=>x.id==='P01');
  if(p1)for(const did of ['D01','D02']){const dd=p1.docs[did];if(dd){dd.rowSkip??={};for(const s of p1.steps.filter(s=>['draft','qc'].includes(s.type)))dd.rowSkip[s.id]=true}}
  d.ui.resModel=1;
 }
 for(const m of d.team)if(m.role==='viewer')m.role='commenter';
 for(const pl of d.plans)for(const dd of Object.values(pl.docs))if((dd.approval||pl.exampleApproval)&&!dd.lastApproved&&dd.approval)dd.lastApproved={rev:1,at:'2026-11-25'};
 route=d.ui.route||'projects';if(route==='plan'&&!d.ui.project)route='projects';
 return d;
}
const proj=()=>data.projects.find(p=>p.id===data.ui.project);
const hasPlan=()=>{const p=proj();return !!(p?.planId&&data.plans.some(x=>x.id===p.planId))};
const planOf=p=>data.plans.find(x=>x.id===p.planId);
const wide=(r,pid)=>r.projects.includes(pid);
const mine=()=>data.projects.filter(p=>!p.shared);
const shareOf=()=>proj()?.shared||null;
function cellVisible(did,sid){const s=shareOf();if(!s||s.scope==='project')return true;if(s.doc!==did)return false;return s.scope==='document'||s.sid===sid}
function docVisible(did){const s=shareOf();return !s||s.scope==='project'||s.doc===did}
const canEdit=()=>{const s=shareOf();return !s||s.role==='editor'};
const isOwnerHere=()=>!shareOf();
const scopeLabel=g=>{const p=data.projects.find(x=>x.id===g.project),k=g.sid!=null?(planOf(p||{})?.steps||[]).find(s=>s.id===g.sid):null;return (p?p.code:g.project)+' · '+(g.scope==='project'?'Whole project':g.scope==='document'?(def(g.doc)?.name||g.doc):(k?dcode(g.doc,k):g.doc))};
const roleName=r=>({owner:'Owner',editor:'Can edit',commenter:'Can comment'})[r]||r;
const variantLabel=v=>'';
function docRes(did,p=proj()){
 const d=planOf(p)?.docs?.[did];if(!d)return {sources:[],templates:[]};
 const ids=[...new Set([...data.resources.filter(r=>wide(r,p.id)).map(r=>r.id),...(d.resAdd||[])])].filter(id=>!(d.resRemove||[]).includes(id));
 const list=ids.map(id=>data.resources.find(r=>r.id===id)).filter(Boolean);
 return {sources:list.filter(r=>r.cat==='source'),templates:list.filter(r=>r.cat==='template')};
}
function snapshotUse(did,k){const a=work(doc(did),k).current;if(a&&!a.used){const r=docRes(did);a.used=[...r.sources,...r.templates].map(x=>({id:x.id,cat:x.cat,name:x.name,version:x.version,kind:kindLabel(x.kind)}));persist()}}
function allVersions(w){const m=new Map();for(const v of [...(w.history||[]),w.previous,w.current].filter(Boolean))m.set(v.rev,v);return [...m.values()].sort((a,b)=>b.rev-a.rev)}
function usedProjects(r){return mine().filter(p=>wide(r,p.id)||Object.values(planOf(p)?.docs||{}).some(d=>(d.resAdd||[]).includes(r.id)||Object.values(d.work||{}).some(w=>allVersions(w).some(v=>v.used?.some(u=>u.id===r.id))))).map(p=>p.id)}
function usedDeliverables(r){const out=[];for(const p of mine()){const pl=planOf(p);if(!pl)continue;for(const [did,d] of Object.entries(pl.docs))for(const k of pl.steps){const w=d.work?.[k.id];if(!w)continue;for(const v of allVersions(w))if(v.used?.some(u=>u.id===r.id))out.push([p,did,k,v.rev])}}
 if(!out.length&&r.used?.length)for(const did of r.used)out.push([data.projects.find(p=>p.id==='EX-101'),did,null,null]);return out}
function log(source,action,target){data.logs.unshift([new Date().toISOString().slice(0,16).replace('T',' '),actor,source,action,target])}
function go(r){route=r;data.ui.route=r;persist();render();elx('app').scrollTop=0;window.scrollTo(0,0)}
function openProject(id){data.ui.project=id;const p=proj();if(p?.planId){data.active=p.planId;data.project=p.name}filters={part:'',country:'',language:''};go('plan')}

function render(){
 renderRail();
 const plan=route==='plan'&&hasPlan();
 elx('planpage').hidden=!plan;elx('page').hidden=plan;
 if(plan){renderPlan();renderPlanHead()}
 else elx('page').innerHTML=route==='plan'?emptyPlan():route==='sources'?registryPage('source'):route==='templates'?registryPage('template'):route==='settings'?settingsPage():projectsPage();
}
function renderRail(){
 const items=['Projects','Sources','Templates'];
 const label={Projects:'Projects',Plan:'Submission plan',Sources:'Sources',Templates:'Templates',Settings:'Settings'};
 const btn=k=>'<button type="button" data-tab="'+k.toLowerCase()+'" class="'+(route===k.toLowerCase()||(k==='Projects'&&route==='plan')?'active':'')+'" aria-label="'+label[k]+'" title="'+label[k]+'">'+railIcon(k)+'<span>'+label[k]+'</span></button>';
 elx('rail').innerHTML='<nav class="rail-nav" aria-label="Workspace">'+items.map(btn).join('')+'</nav>'+btn('Settings')+'<button type="button" class="rail-account" data-account title="Your profile and sign-in"><span class="avatar-rail">'+E(data.profile.name.split(' ').map(x=>x[0]).join(''))+'</span><span><strong>'+E(data.profile.name)+'</strong><small>'+E(data.profile.email)+'</small></span></button>';
}
function renderPlanHead(){
 const sh=shareOf();elx('planpage').dataset.share=sh?sh.scope:'';elx('planpage').dataset.role=sh?sh.role:'owner';
 const p=proj(),srcs=data.resources.filter(r=>r.cat==='source'&&r.projects.includes(p.id)).length,tpls=data.resources.filter(r=>r.cat==='template'&&r.projects.includes(p.id)).length;
 elx('ptitle').textContent=p.name;
 elx('facts').innerHTML=[p.sponsor,p.euct?'EU CT '+p.euct:''].filter(Boolean).map(s=>'<span>'+E(s)+'</span>').join('<b>·</b>')+(p.countries.length?'<b>·</b><span class="ccodes">'+p.countries.map(c=>'<span class="ctry" title="'+E(countryNames[c])+'">'+c+'</span>').join('')+'</span>':'');
 elx('pcode').textContent='';if(sh){elx('pcode').textContent='Shared with you by '+sh.by+' · '+sh.org;elx('planrefs').innerHTML='<span class="sharepill">'+E(roleName(sh.role))+' · '+E(sh.scope==='project'?'whole project':sh.scope==='document'?'one document':'one deliverable')+'</span>';return}
 elx('planrefs').innerHTML='<button type="button" class="link" data-tab="sources">'+srcs+' sources</button><span class="sepdot">·</span><button type="button" class="link" data-tab="templates">'+tpls+' templates</button>';
}
function emptyPlan(){
 const p=proj();if(!p){route='projects';return projectsPage()}
 return '<div class="title"><div><h1>'+E(p.name)+'</h1><p class="lede">'+[p.sponsor,p.countries.map(c=>countryNames[c]).join(', ')].filter(Boolean).map(E).join(' · ')+'</p></div><div><button type="button" data-edit-project="'+p.id+'" title="Name, countries, sources and templates">Project details</button></div></div>'+
 '<section class="panel empty-panel"><h2>No submission plan yet</h2><p>Ask Claude or ChatGPT to propose the documents for this submission. The assistant uses the TrialAgents country requirements, lists each document, language and filename, and saves the plan here for you to confirm.</p><p class="prompt">“Prepare an initial CTIS application for '+E(p.code)+' in '+p.countries.map(c=>countryNames[c]).join(', ')+'.”</p><div class="assistant-row">'+assistantLink('Claude','Open in')+assistantLink('ChatGPT','Open in')+'</div></section>'+
 ppanel('Recorded for this project',ptable(['Name','Type','File'],data.resources.filter(r=>r.projects.includes(p.id)).map(r=>['<button type="button" class="link" data-res="'+r.id+'">'+E(r.name)+'</button>',E(kindLabel(r.kind)),fileTag(r)]))+(data.resources.some(r=>r.projects.includes(p.id))?'':'<p class="pad muted">No sources or templates recorded yet.</p>'));
}
function docNeedsAction(plan,d){return plan.steps.some(k=>{try{return liveState(d,k)[0]==='action'}catch{return false}})}

function projectStats(p){
 const plan=planOf(p);if(!plan)return {total:0,ready:0,action:0};
 const ids=Object.keys(plan.docs);let ready=0,action=0;
 const keep=data.active;data.active=plan.id;
 for(const id of ids){try{if(released(plan,plan.docs[id]))ready++;if(docNeedsAction(plan,plan.docs[id]))action++}catch{}}
 data.active=keep;
 return {total:ids.length,ready,action};
}
function progress(ready,total){const n=10,f=total?Math.round(ready/total*n):0;return '<span class="mini-track" aria-hidden="true">'+Array.from({length:n},(_,i)=>'<i class="'+(i<f?'past':'')+'"></i>').join('')+'</span>'}
function projectsPage(){
 const stats=mine().map(p=>[p,projectStats(p)]),shared=data.projects.filter(p=>p.shared);
 const open=stats.reduce((s,[,x])=>s+x.action,0);
 const named=data.resources.filter(r=>!r.file&&!r.link).length;
 return '<div class="title"><h1>Projects</h1><div><button type="button" class="primary" data-new-project title="Start a new submission project">＋ New project</button></div></div>'+
 '<div class="strip">'+[[mine().length,'Active projects','#3354ac'],[stats.reduce((s,[,x])=>s+x.ready,0)+' / '+stats.reduce((s,[,x])=>s+x.total,0),'Final documents','#077862'],[open,'Documents needing action','#cd6835']].map(([n,t,c])=>'<div class="card" style="--c:'+c+'"><small>'+t+'</small><strong>'+n+'</strong></div>').join('')+'</div>'+
 ppanel('Projects',ptable(['Project','Countries','Final documents','Needs action','Sources','Owner','Updated',''],stats.map(([p,s])=>['<button type="button" class="link" data-project="'+p.id+'">'+E(p.name)+'</button><small class="sub">'+E(p.code)+(p.sponsor?' · '+E(p.sponsor):'')+(p.euct?' · EU CT '+E(p.euct):'')+'</small>',p.countries.map(c=>'<span class="ctry" title="'+E(countryNames[c])+'">'+c+'</span>').join(' '),s.total?s.ready+' of '+s.total+progress(s.ready,s.total):'<span class="muted">No plan yet</span>',s.action?ptag(s.action+' document'+(s.action>1?'s':''),'warn'):'<span class="muted">—</span>',String(data.resources.filter(r=>r.projects.includes(p.id)).length),E(p.owner),fmtDate(p.updated),'<span class="rowactions"><button type="button" class="edit-action" data-edit-project="'+p.id+'" aria-label="Edit '+E(p.name)+'" title="Edit details">'+pencil+'</button><button type="button" class="edit-action" data-duplicate-project="'+p.id+'" aria-label="Duplicate '+E(p.name)+'" title="Duplicate">'+dupIcon+'</button></span>'])))+
 (shared.length?ppanel('Shared with you',ptable(['Project','Shared by','Access','Since'],shared.map(p=>['<button type="button" class="link" data-project="'+p.id+'" title="Open what was shared with you">'+E(p.name)+'</button><small class="sub">'+E(p.code)+'</small>',E(p.shared.by)+'<small class="sub">'+E(p.shared.org)+'</small>',E(roleName(p.shared.role))+'<small class="sub">'+E(p.shared.scope==='project'?'Whole project':p.shared.scope==='document'?def(p.shared.doc)?.name:'One deliverable')+'</small>',fmtDate(p.shared.since)]))):'')+
 (named?'<p class="footnote">'+named+' sources and templates are recorded by name only. Their files stay with you or in the assistant chat.</p>':'');
}
function fileCell(r){return r.file?'<button type="button" class="filelink" data-file-res="'+r.id+'" title="Download">'+E(r.file.name.length>26?r.file.name.slice(0,23)+'…':r.file.name)+'</button>':r.link?'<a class="filelink" href="'+E(r.link)+'" target="_blank" rel="noopener" title="'+E(r.link)+'">Open link</a>':'<span class="muted" title="Only the name and version are recorded">—</span>'}
function fileTag(r){return r.file?ptag('Stored · '+(r.file.size?fmtSize(r.file.size):'file'),'good'):r.link?ptag('Linked','info'):ptag('Name only')}
function registryPage(cat){
 const isT=cat==='template',f=isT?tplFilter:srcFilter,p=proj();
 if(p&&f.project===undefined)f.project=p.id;
 const kinds=isT?templateKinds:sourceKinds;
 let list=data.resources.filter(r=>r.cat===cat);
 if(f.project)list=list.filter(r=>usedProjects(r).includes(f.project));
 if(f.kind)list=list.filter(r=>kindLabel(r.kind)===f.kind);
 if(f.file)list=list.filter(r=>f.file==='stored'?r.file:f.file==='link'?(!r.file&&r.link):(!r.file&&!r.link));
 if(f.country)list=list.filter(r=>r.scope===f.country||r.scope==='All');
 if(f.q)list=list.filter(r=>(r.name+' '+r.kind+' '+(r.detail||'')).toLowerCase().includes(f.q.toLowerCase()));
 const title=isT?'Templates':'Sources';
 const intro=isT?'Templates, checklists, Word layouts and SOPs that were used or saved for your projects. TrialAgents default templates and country rules apply automatically and are recorded in each output’s run details.':'Every document an assistant uses is recorded here by name and linked to its project, so each output can be traced to its sources. Storing a copy of the file is optional.';
 const head=isT?['Template','Applies to','Projects','File','Recorded','Deliverables','']:['Source','Projects','File','Recorded','Deliverables',''];
 const rows=list.map(r=>[
  '<button type="button" class="link" data-res="'+r.id+'" title="Details and where it is used">'+E(r.name)+'</button><small class="sub" title="Type, version and date as recorded from the document">'+E([kindLabel(r.kind),r.version?'v'+r.version:'',isT?'':fmtDate(r.date)].filter(x=>x&&x!=='—').join(' · '))+'</small>',
  ...(isT?[E(r.scope==='All'||!r.scope?'All countries':countryNames[r.scope])+'<small class="sub">'+E([r.doctype&&r.doctype!=='Any'?r.doctype:'Any document',r.lang?langs[r.lang]||r.lang:''].filter(Boolean).join(' · '))+'</small>']:[]),
  usedProjects(r).map(x=>'<span class="ctry">'+E(pcode(x))+'</span>').join(' ')||'<span class="muted">—</span>',
  fileCell(r),
  E(r.via)+'<small class="sub">'+fmtDate(r.added)+'</small>',
  (n=>n?String(n):'<span class="muted">—</span>')(usedDeliverables(r).length),
  '<button type="button" class="edit-action" data-res="'+r.id+'" aria-label="Edit '+E(r.name)+'" title="Edit details">'+pencil+'</button>']);
 return '<div class="title"><div><h1>'+title+'</h1><p class="lede">'+intro+'</p></div><div><button type="button" class="primary" data-add-res="'+cat+'" title="Record a '+(isT?'template':'source')+' that was used outside a chat">＋ Add '+(isT?'template':'source')+'</button></div></div>'+
 '<form class="filters" data-filters="'+cat+'"><label>Search<input type="search" name="q" value="'+E(f.q)+'" placeholder="Name, type or note"></label><label>Project<select name="project">'+popts([['','All projects'],...mine().map(x=>[x.id,x.code+' · '+x.name])],f.project)+'</select></label><label>Type<select name="kind">'+popts([['','All types'],...kinds],f.kind)+'</select></label>'+(isT?'<label>Country<select name="country">'+popts([['','All countries'],...['DE','ES','NL','BE','FR','IT','PL'].map(c=>[c,countryNames[c]])],f.country)+'</select></label>':'<label>File<select name="file">'+popts([['','Any'],['stored','Stored copy'],['link','Linked'],['name','Name only']],f.file)+'</select></label>')+'</form>'+
 ppanel(list.length+' '+(list.length===1?(isT?'template':'source'):title.toLowerCase()),rows.length?ptable(head,rows,'registry'):'<p class="pad muted">'+(f.q||f.kind||f.file||f.country?'Nothing matches these filters.':'No '+(isT?'templates':'sources')+' recorded'+(f.project?' for '+E(f.project):'')+' yet. They appear here when an assistant uses them.')+'</p>');
}
function resDrawer(id,cat){
 const r=id?data.resources.find(x=>x.id===+id):{id:0,cat,name:'',kind:cat==='template'?'Writing template':'Protocol',version:'',date:'',scope:'All',projects:[],file:null,link:'',via:'Browser',by:actor,added:now(),used:[],detail:'',lang:'',doctype:'Any'};
 if(!r)return;cat=r.cat;const isT=cat==='template',kinds=isT?templateKinds:sourceKinds;
 drawerState={type:'res',id:r.id,cat,pendingFile:null,mode:r.file?'file':r.link?'link':'name'};
 const projs=r.id?usedProjects(r):[],dels=r.id?usedDeliverables(r):[];
 openDrawer('<form id="resform"><div class="line"><h2>'+(r.id?E(isT?'Template':'Source'):'Add '+(isT?'template':'source'))+'</h2><button type="button" data-close aria-label="Close" title="Close">✕</button></div>'+
 (r.id?'<p class="drawer-meta">Recorded by '+E(r.by)+' via '+E(r.via)+' · '+fmtDate(r.added)+'</p>':'<p class="drawer-meta">Assistants record what they use automatically. Add one here when it was used outside a chat.</p>')+
 pfield('Name *','<input name="name" required maxlength="120" value="'+E(r.name)+'">')+
 '<div class="grid">'+pfield('Type','<select name="kind">'+popts(kinds,kindLabel(r.kind))+'</select>')+pfield('Version','<input name="version" maxlength="20" value="'+E(r.version)+'" placeholder="e.g. 3.0">','The assistant reads it from the document when recording it. Correct it here if needed.')+
 (isT?pfield('Country','<select name="scope">'+popts([['All','All countries'],...Object.entries(memberStates).sort((a,b)=>a[1].localeCompare(b[1]))],r.scope)+'</select>')+pfield('Language','<select name="lang">'+popts([['','Any'],['en','English'],['de','German'],['es','Spanish']],r.lang)+'</select>')+pfield('Document type','<select name="doctype">'+popts(['Any','Study protocol','Protocol synopsis','Participant information & consent','Recruitment material'],r.doctype||'Any')+'</select>'):pfield('Document date','<input type="date" name="date" value="'+E(r.date)+'">')+pfield('Applies to','<select name="scope">'+popts([['All','Whole study'],...Object.entries(memberStates).sort((a,b)=>a[1].localeCompare(b[1]))],r.scope)+'</select>'))+'</div>'+
 (!r.id?pfield('Add to a project','<select name="addProject">'+popts([['','Not now'],...data.projects.map(p=>[p.id,p.code+' · '+p.name])],data.ui.project||'')+'</select>','Adds it to the project’s sources and templates. You can change that in the project later.'):'')+
 '<fieldset class="field"><legend>File</legend><p class="fieldnote">Optional. Without a copy, the name and version still keep every deliverable traceable.</p><div class="segmented" role="radiogroup">'+[['name','Name only','Keep only the name and version'],['link','Link','Link to where the file lives'],['file','Stored copy','Store a copy with the record']].map(([v,l,t])=>'<label title="'+t+'"><input type="radio" name="mode" value="'+v+'" '+(drawerState.mode===v?'checked':'')+'><span>'+l+'</span></label>').join('')+'</div><div id="file-slot">'+fileSlot(r)+'</div></fieldset>'+
 pfield('Notes','<textarea name="detail" maxlength="1000" placeholder="What it contains or how the assistant should use it">'+E(r.detail||'')+'</textarea>')+
 (r.id?'<div class="usedgrid"><section class="usedin"><h3>Projects</h3>'+(projs.length?'<ul>'+projs.map(pid=>{const p=data.projects.find(x=>x.id===pid);return '<li><button type="button" class="link" data-goto-project="'+pid+'" title="Open the project. Remove it from the project there.">'+E(p.code)+'</button><small>'+E(p.name)+'</small></li>'}).join('')+'</ul><p class="fieldnote">To stop using it, remove it in the project. Deliverables that used it keep their record.</p>':'<p class="muted">Not used in a project yet.</p>')+'</section>'+
 '<section class="usedin"><h3>Deliverables</h3>'+(dels.length?'<ul>'+dels.slice(0,12).map(([p,did,k,rev])=>'<li><span>'+E(p?.code||'')+' · '+E(k?dcode(did,k):did)+'</span><small>'+(rev?'v'+rev:E(def(did)?.name||''))+'</small></li>').join('')+'</ul>'+(dels.length>12?'<p class="muted">and '+(dels.length-12)+' more</p>':''):'<p class="muted">No deliverable has used it yet.</p>')+'</section></div>':'')+
 '<div class="save">'+(r.id&&!projs.length&&!dels.length?'<button type="button" data-delete-res="'+r.id+'" title="Delete this record">Delete</button>':'')+'<button type="button" class="cancel" data-close>Cancel</button><button class="primary">'+(r.id?'Save changes':'Add '+(isT?'template':'source'))+'</button></div></form>');
}

function fileSlot(r){
 const m=drawerState.mode;
 if(m==='link')return pfield('Location','<input type="url" name="link" placeholder="https://…" value="'+E(r.link||'')+'">','Link to where the file lives, such as SharePoint or a document system.');
 if(m==='file')return (r.file?'<p class="filecard">'+icon('file')+'<span><b>'+E(r.file.name)+'</b><small>'+(r.file.size?fmtSize(r.file.size):'')+'</small></span>'+(r.blob?'<button type="button" data-download-res="'+r.id+'">Download</button>':'')+'</p>':'')+pfield(r.file?'Replace file':'Upload file','<input type="file" name="upload">');
 return '<p class="fieldnote muted">The assistant and reviewers see the name and version. To check the passage, they ask the owner for the file.</p>';
}
function issuesOpen(d,k){const w=work(d,k);if(!w.current||w.status!=='Complete')return false;return reviewThreads(d,k).some(t=>!t.closed&&flagActive(t,d,k))}
function liveState(d,s){
 if(s.skip||d.rowSkip?.[s.id])return ['na','Not applicable'];
 const steps=P().steps.filter(k=>!k.skip&&!d.rowSkip?.[k.id]),idx=steps.findIndex(k=>k.id===s.id);
 const passed=k=>d.ignored?.[k.id]!=null&&d.ignored[k.id]===work(d,k).current?.rev;
 if(idx>0&&steps.slice(0,idx).some(k=>issuesOpen(d,k)&&!passed(k)))return ['waiting','Waiting'];
 const w=work(d,s);if(!w.current||w.status!=='Complete')return ['waiting','Waiting'];
 return issuesOpen(d,s)?['action','Action required']:['done','Done'];
}
function approvedVersion(d){const s=finalTarget(P(),d);if(!s)return null;const w=work(d,s);if(released(P(),d))return w.current;if(!d.lastApproved)return null;return allVersions(w).find(v=>v.rev===d.lastApproved.rev)||null}
function approvedName(m,d){const s=finalTarget(P(),d),a=approvedVersion(d);return s&&a?fileName(m,s,a):finalName(m,d)}
const continuedPast=(d,k)=>d.ignored?.[k.id]!=null&&d.ignored[k.id]===work(d,k).current?.rev;


const liveBadge=(d,s)=>{const [c,l]=liveState(d,s);return '<span class="state '+c+'">'+E(l)+'</span>'};
function picker(name,options,selected,placeholder){
 // options: [value,label,sub]; chips beside a searchable list
 const sel=options.filter(o=>selected.includes(o[0]));
 return '<div class="picker" data-picker="'+name+'" data-opts="'+E(JSON.stringify(options))+'"><div class="pickchips">'+sel.map(o=>chip(name,o)).join('')+'</div><div class="pickbox"><input type="search" class="pickinput" placeholder="'+E(placeholder)+'" autocomplete="off" aria-label="'+E(placeholder)+'"><ul class="pickresults" hidden role="listbox"></ul></div></div>';
}
const chip=(name,o)=>'<span class="pickchip" data-value="'+E(o[0])+'"><input type="hidden" name="'+name+'" value="'+E(o[0])+'">'+E(o[1])+'<button type="button" data-unpick aria-label="Remove '+E(o[1])+'">×</button></span>';
function pickerResults(box){
 const name=box.dataset.picker,opts=JSON.parse(box.dataset.opts),q=box.querySelector('.pickinput').value.trim().toLowerCase(),chosen=[...box.querySelectorAll('.pickchip')].map(c=>c.dataset.value);
 const list=opts.filter(o=>!chosen.includes(o[0])&&(!q||(o[1]+' '+(o[2]||'')+' '+o[0]).toLowerCase().includes(q))).slice(0,30);
 const ul=box.querySelector('.pickresults');ul.innerHTML=list.length?list.map(o=>'<li><button type="button" data-pick="'+E(o[0])+'">'+E(o[1])+(o[2]?'<small>'+E(o[2])+'</small>':'')+'</button></li>').join(''):'<li class="none">No matches</li>';ul.hidden=false;
}
const resOption=r=>[String(r.id),r.name+(r.version?' v'+r.version:''),kindLabel(r.kind)];
const pcode=id=>data.projects.find(p=>p.id===id)?.code||id;
function projectDrawer(id,dup){
 const src=id?data.projects.find(x=>x.id===id):null;
 const p=src?{...src,name:dup?src.name+' (copy)':src.name}:{id:'',name:'',code:'',phase:'Phase II',sponsor:'',countries:[],owner:actor};
 const pid=src?.id||'';
 drawerState={type:'project',id:dup?'':pid,from:dup?pid:''};
 const wideOf=cat=>pid?data.resources.filter(r=>r.cat===cat&&wide(r,pid)).map(r=>String(r.id)):[];
 const title=dup?'Duplicate project':id?'Project details':'New project';
 openDrawer('<form id="projectform"><div class="line"><h2>'+title+'</h2><button type="button" data-close aria-label="Close">✕</button></div>'+
 (dup?'<p class="drawer-meta">Copies the details, the linked sources and templates, and the document plan with its current drafts. Approvals, comments and invitations are not copied.</p>':'')+
 pfield('Project name *','<input name="name" required maxlength="80" value="'+E(p.name)+'" placeholder="e.g. CTIS initial application NX-220">')+
 '<div class="grid">'+pfield('Study code *','<input name="code" required maxlength="20" value="'+E(p.code)+'">')+pfield('Sponsor','<input name="sponsor" maxlength="80" value="'+E(p.sponsor||'')+'">')+'</div>'+
 pfield('EU CT number','<input name="euct" maxlength="20" value="'+E(p.euct||'')+'" placeholder="e.g. 2026-512345-12-00">','Assigned by CTIS when the application is submitted.')+
 '<div class="field"><span class="fieldlabel">Member states</span>'+picker('countries',Object.entries(memberStates).sort((a,b)=>a[1].localeCompare(b[1])).map(([c,n])=>[c,n,c]),p.countries,'Search member states')+'</div>'+
 '<div class="field"><span class="fieldlabel">Sources for the whole project</span><p class="fieldnote">Used for every document, such as the protocol. Sources for a single document are chosen in that document.</p>'+picker('wideSources',data.resources.filter(r=>r.cat==='source').map(resOption),wideOf('source'),'Search recorded sources')+'</div>'+
 '<div class="field"><span class="fieldlabel">Templates for the whole project</span><p class="fieldnote">Optional. Leave empty to choose templates per document. TrialAgents defaults apply where none is chosen.</p>'+picker('wideTemplates',data.resources.filter(r=>r.cat==='template').map(resOption),wideOf('template'),'Search recorded templates')+'</div>'+
 (!id?'<p class="fieldnote">The document plan is proposed in Claude or ChatGPT and saved to this project.</p>':'')+
 '<div class="save"><button type="button" class="cancel" data-close>Cancel</button><button class="primary">'+(dup?'Create copy':id?'Save changes':'Create project')+'</button></div></form>');
}
function applyWide(pid,cat,ids){
 const p=data.projects.find(x=>x.id===pid);
 for(const r of data.resources.filter(x=>x.cat===cat)){
  const on=ids.includes(String(r.id)),was=wide(r,pid);
  if(on&&!was){r.projects.push(pid);log('Browser','Added '+cat+' to project',(p?.code||pid)+' · '+r.name)}
  if(!on&&was){r.projects=r.projects.filter(x=>x!==pid);log('Browser','Removed '+cat+' from project',(p?.code||pid)+' · '+r.name+' (existing deliverables keep their record)')}
 }
}

function clonePlanFor(base,title){
 const q={...clone(base),id:'P'+pad(Math.max(...data.plans.map(p=>+p.id.slice(1)))+1),title,base:base.id};
 for(const d of Object.values(q.docs)){delete d.approval;for(const w of Object.values(d.work||{})){w.invites=[];w.threads=[];w.threadSeq=0;w.notes=[]}}
 delete q.exampleApproval;data.plans.push(q);return q.id;
}
function docDrawer(did){
 const p=proj(),m=def(did),pl=planOf(p);if(!p||!m||!pl)return;
 drawerState={type:'doc',id:did};
 const cur=docRes(did),ids=[...cur.sources,...cur.templates].map(r=>String(r.id));
 const k=panel?.name==='cell'&&panel.id===did?lookupStep(panel.sid):null,a=k?work(doc(did),k).current:null;
 const usedNow=a?.used||null;
 const used=usedNow?'<section class="usedin first"><h3>Used in '+E(dcode(did,k))+' v'+a.rev+'</h3><p class="fieldnote">Recorded when this version was made. It does not change.</p><ul>'+usedNow.map(u=>'<li><span>'+E(u.name)+(u.version?' v'+E(u.version):'')+'</span><small>'+E(u.kind)+(ids.includes(String(u.id))?'':' · no longer used')+'</small></li>').join('')+'</ul></section>':'';
 openDrawer('<form id="docform"><div class="line"><h2>Sources and templates</h2><button type="button" data-close aria-label="Close" title="Close">✕</button></div>'+used+
 '<section class="nextrun"><h3>'+(usedNow?'For the next run':'Used for this document')+'</h3><p class="fieldnote">Starts from the project’s sources and templates. Changes here apply to this document only.</p>'+
 '<div class="field"><span class="fieldlabel">Sources</span>'+picker('docSources',data.resources.filter(r=>r.cat==='source').map(resOption),ids,'Add a recorded source')+'</div>'+
 '<div class="field"><span class="fieldlabel">Templates</span>'+picker('docTemplates',data.resources.filter(r=>r.cat==='template').map(resOption),ids,'Add a recorded template')+'</div></section>'+
 '<div class="save"><button type="button" class="cancel" data-close>Cancel</button><button class="primary">Save</button></div></form>');
}

function openDrawer(html){const d=elx('drawer');d.innerHTML=html;if(!d.open)d.showModal();d.querySelector('input:not([type=checkbox]):not([type=radio]),select')?.focus()}
function closeDrawer(){const d=elx('drawer');if(d.open)d.close();drawerState=null}
function openInvite(ctx){
 if(!data.billing.team){if($('#overlay').open)dismiss();closeDrawer();settingTab='Billing';data.ui.billingNotice=true;go('settings');return}
 drawerState={type:'invite',...ctx};
 const p=ctx.project?data.projects.find(x=>x.id===ctx.project):null,m=ctx.doc?def(ctx.doc):null,k=ctx.sid?lookupStep(ctx.sid):null;
 const share=ctx.shareIndex!=null?data.shares[ctx.shareIndex]:null;
 openDrawer('<form id="inviteform"><div class="line"><h2>'+(share?'Share more with '+E(share.name||share.email):'Invite')+'</h2><button type="button" data-close aria-label="Close" title="Close">✕</button></div>'+
 (share?'':pfield('Email *','<input type="email" name="email" required placeholder="name@company.com">','They get access straight away and an email with a link. No account set-up is needed to comment.'))+
 grantFields(p,m,k)+
 '<div class="save"><button type="button" class="cancel" data-close>Cancel</button><button class="primary">'+(share?'Share':'Send invitation')+'</button></div></form>');
}
function grantFields(p,m,k){
 const own=mine();
 const scopes=m&&k?[['deliverable','Only this deliverable',dcode(m.id,k)],['document','This document',m.name+' · all its deliverables'],['project','The whole project',p.code+' · including its sources and templates']]:null;
 return (scopes?'<fieldset class="field"><legend>What to share</legend><div class="choicecards">'+scopes.map(([v,l,dsc],i)=>'<label class="choicecard"><input type="radio" name="scope" value="'+v+'" '+(i?'':'checked')+'><span><strong>'+l+'</strong><small>'+E(dsc)+'</small></span></label>').join('')+'</div></fieldset>':
  '<div class="grid">'+pfield('Project *','<select name="gproject" required>'+popts(own.map(x=>[x.id,x.code+' · '+x.name]),data.ui.project&&!proj()?.shared?data.ui.project:own[0]?.id)+'</select>')+pfield('What to share','<select name="gscope">'+popts([['project','Whole project'],['document','One document'],['deliverable','One deliverable']],'project')+'</select>')+'</div><div class="grid" id="grant-detail" hidden>'+pfield('Document','<select name="gdoc">'+popts(defs.map(x=>[x.id,x.name+(x.c==='EU'?'':' · '+countryNames[x.c])+' · '+langs[x.lang]]))+'</select>')+'<label class="field" id="grant-step" hidden>Step<select name="gstep">'+popts((data.plans.find(x=>x.id==='P01')?.steps||[]).map(s=>[s.id,s.name]))+'</select></label></div>')+
 '<fieldset class="field"><legend>Access</legend><div class="choicecards two">'+[['commenter','Can comment','Reads and comments. Cannot change the document.'],['editor','Can edit','Also asks their own assistant for revisions.']].map(([v,l,dsc],i)=>'<label class="choicecard"><input type="radio" name="role" value="'+v+'" '+(i?'':'checked')+'><span><strong>'+l+'</strong><small>'+dsc+'</small></span></label>').join('')+'</div></fieldset>';
}

function memberDrawer(i){
 const s=data.shares[i];if(!s)return;drawerState={type:'member',i};
 openDrawer('<form id="memberform"><div class="line"><h2>'+E(s.name||s.email)+'</h2><button type="button" data-close aria-label="Close" title="Close">✕</button></div><p class="drawer-meta">'+E(s.email)+' · '+(s.opened?'Has opened what you shared':'Has not opened it yet')+'</p>'+
 '<section class="usedin first"><h3>Shared with them</h3><ul class="grantlist">'+s.grants.map((g,gi)=>'<li><span>'+E(scopeLabel(g))+'</span><span class="grantctl"><select name="role'+gi+'" aria-label="Access">'+popts([['commenter','Can comment'],['editor','Can edit']],g.role)+'</select><button type="button" class="edit-action" data-ungrant="'+gi+'" title="Stop sharing this">✕</button></span></li>').join('')+'</ul></section>'+
 '<div class="rowbtns"><button type="button" data-share-more="'+i+'" title="Share another project, document or deliverable">＋ Share more</button></div>'+
 '<div class="save"><button type="button" data-remove-member="'+i+'" title="Stop sharing everything with this person">Remove access</button><button type="button" class="cancel" data-close>Cancel</button><button class="primary">Save</button></div></form>');
}

function versionsDrawer(){
 const k=lookupStep(panel.sid),w=work(doc(panel.id),k),list=allVersions(w),p=proj();drawerState={type:'versions'};
 const when=v=>v.at?new Date(v.at).toLocaleString('en-GB',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}):fmtDate(p?.updated);
 openDrawer('<div class="details"><div class="line"><h2>'+E(def(panel.id).name)+' <span class="titlecode">'+E(dcode(panel.id,k))+'</span></h2><button type="button" data-close aria-label="Close" title="Close">✕</button></div><ul class="versionlist">'+list.map(v=>'<li><div><strong>v'+v.rev+'</strong><small>'+E((v.by||p?.owner||'')+' via '+(v.via||'Claude'))+' · '+E(when(v))+(v.restoredFrom?' · restored from v'+v.restoredFrom:'')+'</small></div>'+(v===w.current?'<span class="currenttag">Current</span>':'<button type="button" class="restorebtn" data-restore-rev="'+v.rev+'" title="Make this the current version. The current one stays in the history.">Restore</button>')+'</li>').join('')+'</ul></div>');
}

function restoreVersion(rev){
 const k=lookupStep(panel.sid),d=doc(panel.id),w=work(d,k),v=allVersions(w).find(x=>x.rev===rev);if(!v||v===w.current)return;
 storeResult(w,{...clone(v),restoredFrom:rev});if(k.type==='draft')d.draftId=k.id;delete d.approval;
 log('Browser','Restored version',proj()?.code+' · '+dcode(panel.id,k)+' v'+rev);closeDrawer();refresh();cellDlg(panel.id,panel.sid);toast('v'+rev+' restored as v'+w.current.rev);
}
function confirmAction(message){
 const dialog=document.createElement('dialog'),text=document.createElement('p'),cancel=document.createElement('button'),accept=document.createElement('button');
 dialog.className='pl pipeline-confirm';text.textContent=message;cancel.textContent='Cancel';accept.textContent='Confirm';accept.className='primary';
 cancel.onclick=()=>dialog.close();accept.onclick=()=>dialog.close('confirm');dialog.append(text,cancel,accept);document.body.append(dialog);
 return new Promise(res=>{dialog.onclose=()=>{dialog.remove();res(dialog.returnValue==='confirm')};dialog.showModal();cancel.focus()});
}

const sections=()=>['Personal',...(actor===owner?['Team']:[]),'Logs',...(actor===owner?['Billing']:[]),'Notifications','Support'];
function settingsPage(){
 const list=sections();if(!list.includes(settingTab))settingTab=list[0];
 const menu='<div class="pipeline-settings"><nav class="settings-tabs" aria-label="Settings sections">'+list.map(n=>'<button type="button" data-settings-section="'+n+'" aria-pressed="'+(settingTab===n)+'" class="'+(settingTab===n?'active':'')+'">'+sectionIcon(n)+n+'</button>').join('')+'</nav></div>';
 const isOwner=actor===owner,mem=data.team.find(m=>m.name===actor),pr=isOwner?data.profile:{name:actor,email:mem?.email||'',title:'Clinical reviewer',org:data.profile.org,tz:'Europe/Madrid',lang:'English',twofa:false,claude:false,chatgpt:false};let body='';
 if(settingTab==='Personal')body=ppanel('Profile','<form class="pad gearform" id="profileform"><div class="avatarline"><span class="avatar-lg">'+E(pr.name.split(' ').map(x=>x[0]).join(''))+'</span><div><strong>'+E(pr.name)+'</strong><small>'+E(pr.email)+'</small></div></div>'+pfield('Full name','<input name="name" required value="'+E(pr.name)+'">')+pfield('Email','<input value="'+E(pr.email)+'" readonly>','Your sign-in address. Contact support to change it.')+pfield('Job title','<input name="title" value="'+E(pr.title)+'">')+pfield('Organisation','<input name="org" value="'+E(pr.org)+'">')+'<div class="grid">'+pfield('Time zone','<select name="tz">'+popts(['Europe/Berlin','Europe/Madrid','Europe/Paris','Europe/London','America/New_York'],pr.tz)+'</select>')+pfield('Language','<select name="lang">'+popts(['English','Deutsch','Español','Français'],pr.lang)+'</select>')+'</div><button class="primary">Save profile</button> <output></output></form>')+
  ppanel('Sign-in','<form class="pad gearform" id="securityform"><div class="rowbtns"><button type="button" data-toast="A reset link would be sent to '+E(pr.email)+'.">Change password</button><button type="button" data-toast="Other sessions would be signed out.">Sign out other sessions</button></div></form>')+
  '<div class="assistant-settings-cards">'+['Claude','ChatGPT'].map(n=>ppanel(n,'<div class="pad"><p>'+(pr[n.toLowerCase()]?'Connected. '+n+' can read your projects, record sources and save drafts and reviews for your approval.':'Connect '+n+' to plan, draft and review CTIS documents with your TrialAgents projects.')+'</p>'+(pr[n.toLowerCase()]?'<span class="tag good">Connected</span> <button type="button" data-connect="'+n+'">Disconnect</button>':assistantLink(n,'Connect to').replace('data-assistant','data-connect'))+'</div>')).join('')+'</div>';
 if(settingTab==='Project'){const p=proj();
  body=ppanel('Project details','<form class="pad gearform" id="projectsettings">'+pfield('Project name','<input name="name" required maxlength="80" value="'+E(p.name)+'">')+'<div class="grid">'+pfield('Study code','<input value="'+E(p.code)+'" readonly>')+pfield('Phase','<select name="phase">'+popts(['Phase I','Phase I/II','Phase II','Phase III','Phase IV'],p.phase)+'</select>')+'</div>'+pfield('Sponsor','<input name="sponsor" value="'+E(p.sponsor||'')+'">')+pfield('Owner','<input value="'+E(p.owner)+'" readonly>','Only the owner can approve final documents.')+'<button class="primary">Save project</button> <output></output></form>')+
  ppanel('Plan defaults','<form class="pad gearform" id="plandefaults"><fieldset class="field"><legend>Default steps for new plans</legend><div class="checks">'+Object.entries({draft:'Draft',qc:'Source QC',check:'Checklist',guide:'Internal guidelines',team:'Team review',style:'Style'}).map(([k,l])=>'<label class="chk"><input type="checkbox" name="steps" value="'+k+'" '+(data.defaults.steps.includes(k)?'checked':'')+'>'+l+'</label>').join('')+'</div></fieldset>'+pfield('Filename pattern','<input name="pattern" value="'+E(data.defaults.pattern)+'">','The assistant proposes filenames with this pattern. You can change them per row.')+'<label class="mail-pref"><span><strong>Compact table rows</strong><small>Show more documents on screen in the plan table.</small></span><input type="checkbox" role="switch" name="dense" '+(data.dense?'checked':'')+'></label><button class="primary">Save defaults</button> <output></output></form>')+
  '';}
 if(settingTab==='Team'){
  body=(data.billing.team?'':'<section class="panel upsell"><div class="pad"><strong>Sharing is part of TrialAgents CTIS Team.</strong><p>Share a deliverable, a document or a whole project. People you share with comment, or edit through their own assistant.</p><button type="button" class="primary" data-settings-section="Billing">See the Team plan</button></div></section>')+
  ppanel('<span class="paneltitle">People you share with</span><button type="button" class="primary small" data-invite="" title="Share a project, document or deliverable with someone">＋ Invite</button>',data.shares.length?ptable(['Person','Shared','Opened',''],data.shares.map((s,i)=>['<span class="who"><span class="avatar-sm">'+E((s.name||s.email).split(/[ .@]/).filter(Boolean).slice(0,2).map(x=>x[0].toUpperCase()).join(''))+'</span><span>'+E(s.name||s.email)+(s.name?'<small class="sub">'+E(s.email)+'</small>':'')+'</span></span>','<ul class="grantsum">'+s.grants.map(g=>'<li>'+E(scopeLabel(g))+' <span class="muted">· '+roleName(g.role)+'</span></li>').join('')+'</ul>',s.opened?'Yes':'<span class="muted">Not yet</span>','<button type="button" class="edit-action" data-member="'+i+'" title="Change what is shared or the access">'+pencil+'</button>'])):'<p class="pad muted">You have not shared anything yet. Use Invite here or on any deliverable.</p>');}
 if(settingTab==='Logs'){const lf=data.ui.logf||{};const codeOf=l=>(mine().find(p=>l[4].startsWith(p.code+' ')||l[4].includes(p.code+' ·')||l[4].startsWith(p.code))||{}).id||'';
  const people=[...new Set(data.logs.map(l=>l[1]))],q=(logQuery||'').toLowerCase();
  const rows=data.logs.filter(l=>(!lf.project||codeOf(l)===lf.project)&&(!lf.person||l[1]===lf.person)&&(!lf.doc||l[4].includes(lf.doc+'-')||l[4].includes(def(lf.doc)?.name||'§'))&&(!q||l.join(' ').toLowerCase().includes(q)));
  body='<form class="filters" id="logform" data-logf><label>Search<input name="query" value="'+E(logQuery)+'" placeholder="Action or detail"></label><label>Project<select name="project">'+popts([['','All projects'],...mine().map(p=>[p.id,p.code])],lf.project||'')+'</select></label><label>Person<select name="person">'+popts([['','Everyone'],...people],lf.person||'')+'</select></label><label>Document<select name="doc">'+popts([['','All documents'],...defs.map(x=>[x.id,x.name+(x.c==='EU'?'':' · '+x.c)+' · '+langs[x.lang]])],lf.doc||'')+'</select></label></form>'+ppanel('Audit history',rows.length?ptable(['Time','Member','Source','Action','Details'],rows.map(l=>[E(l[0]),E(l[1]),E(l[2]),E(l[3]),E(l[4])])):'<p class="pad">No matching activity.</p>');}
 if(settingTab==='Billing')body=(data.ui.billingNotice&&!data.billing.team?'<div class="notice">Inviting people is part of TrialAgents CTIS Team. Upgrade to invite reviewers to a deliverable, a document or a whole project.</div>':'')+(data.billing.team?ppanel('TrialAgents CTIS Team','<div class="pad"><p><span class="tag good">Active</span> €49 per month · Unlimited people to share with</p><div class="rowbtns"><button type="button" data-toast="The billing portal opens here.">Manage billing</button><button type="button" data-downgrade title="Switch back to individual use">Switch to individual</button></div></div>'):'<section class="combined-premium-banner pipeline-team-offer" aria-label="TrialAgents CTIS Team"><div class="combined-premium-pitch"><span class="combined-premium-eyebrow">TrialAgents CTIS Team</span><h2>Review submissions as a team.</h2><p>Bring reviewers into the exact document and passage.</p><ul><li>Invite people to a deliverable, a document or a whole project</li><li>Reviewers comment, or edit through their own assistant</li><li>No assistant account needed to comment</li><li>Audit history and owner approval records</li></ul></div><div class="combined-premium-offers"><p class="combined-offers-heading">Team subscription</p><button type="button" data-upgrade title="Start the Team subscription"><span>Monthly</span><strong>€49 <small>/ month</small></strong><span class="combined-offer-action">Upgrade to Team</span></button><p>Individual use stays available. The team subscription renews monthly and can be canceled in Billing.</p></div></section>');
 if(settingTab==='Notifications'){const types=[['draft','Draft ready','When the assistant saves a draft in a project you own.'],['finding','QC finding opened','When Source QC or a checklist opens a numbered finding.'],['comment','Comment or mention','When someone comments on your document or mentions you.'],['invite','Invitation accepted','When a reviewer accepts an invitation you sent.'],['approval','Ready for owner approval','When the last step of a document is ready for your approval.'],['source','Source changed','When a newer version of a recorded source is registered.']];
  body=ppanel('Email notifications','<form class="pad gearform" id="prefsform">'+types.map(([k,n,dsc])=>'<label class="mail-pref"><span><strong>'+n+'</strong><small>'+dsc+'</small></span><input name="'+k+'" type="checkbox" role="switch" '+(data.prefs[k]!==false?'checked':'')+'></label>').join('')+'<button class="primary">Save preferences</button> <output></output></form>');}
 if(settingTab==='Support')body=ppanel('Contact support','<form class="pad gearform" id="supportform">'+pfield('Topic','<select name="topic">'+popts(['Question about a plan','Country requirement or template','Assistant connection','Billing','Something else'])+'</select>')+pfield('Message','<textarea name="message" required placeholder="Describe what you need"></textarea>')+'<button class="primary">Send message</button> <output></output></form>')+ppanel('Resources','<div class="pad linklist"><button type="button" class="link" data-toast="The connector guide would open.">Connector setup guide</button><button type="button" class="link" data-toast="The privacy notice would open.">Privacy and data handling</button><button type="button" class="link" data-toast="The terms would open.">Terms of service</button></div>');
 return '<div class="title"><h1>Settings</h1></div><div class="settings-page">'+menu+'<div class="settings-sections">'+body+'</div></div>';
}

document.addEventListener('click',async e=>{
 const b=e.target.closest('button,a');if(!b)return;
 if(b.dataset.tab){if(b.dataset.tab==='plan'&&!proj())return;if(['sources','templates'].includes(b.dataset.tab)){const f=b.dataset.tab==='sources'?srcFilter:tplFilter;f.project=data.ui.project||''}go(b.dataset.tab);return}
 if(b.dataset.project){openProject(b.dataset.project);return}
 if(b.dataset.newProject!==undefined){projectDrawer('');return}
 if(b.dataset.editProject){projectDrawer(b.dataset.editProject);return}
 if(b.hasAttribute('data-edit-project-current')){projectDrawer(data.ui.project);return}
 if(b.dataset.duplicateProject){projectDrawer(b.dataset.duplicateProject,true);return}
 if(b.dataset.account!==undefined){settingTab='Personal';go('settings');return}
 if(b.dataset.docSources){docDrawer(b.dataset.docSources);return}
 if(b.dataset.invite!==undefined){const [did,sid]=(b.dataset.invite||'').split('|');openInvite(did&&did!=='undefined'?{project:data.ui.project,doc:did,sid:+sid}:{});return}
 if(b.dataset.member!==undefined&&b.tagName==='BUTTON'){memberDrawer(+b.dataset.member);return}
 if(b.dataset.removeMember){const i=+b.dataset.removeMember,m=data.shares[i];if(m&&await confirmAction('Stop sharing everything with '+(m.name||m.email)+'?')){data.shares.splice(i,1);log('Browser','Removed access',m.email);closeDrawer();refresh();toast('Access removed')}return}
 if(b.dataset.ungrant){const s=data.shares[drawerState.i],g=s.grants[+b.dataset.ungrant];s.grants.splice(+b.dataset.ungrant,1);log('Browser','Stopped sharing',s.email+' · '+scopeLabel(g));if(!s.grants.length){data.shares.splice(drawerState.i,1);closeDrawer();refresh();toast('Access removed');return}persist();memberDrawer(drawerState.i);if(route==='settings')render();return}
 if(b.dataset.shareMore){openInvite({shareIndex:+b.dataset.shareMore});return}
 if(b.dataset.upgrade!==undefined){data.billing.team=true;data.ui.billingNotice=false;log('Browser','Started Team subscription','TrialAgents CTIS Team');settingTab='Team';refresh();toast('Team plan active. You can share now.');return}
 if(b.dataset.downgrade!==undefined){data.billing.team=false;refresh();toast('Switched to individual use');return}
 if(b.dataset.versions!==undefined&&panel?.name==='cell'){versionsDrawer();return}
 if(b.dataset.restoreRev){restoreVersion(+b.dataset.restoreRev);return}
 if(b.dataset.ignore!==undefined&&panel?.name==='cell'){const d=doc(panel.id);(d.ignored??={})[panel.sid]=work(d,lookupStep(panel.sid)).current?.rev;log('Browser','Ignored issues and continued',proj()?.code+' · '+dcode(panel.id,lookupStep(panel.sid)));refresh();cellDlg(panel.id,panel.sid);toast('The next step can run. The issues here stay open.');return}
 if(b.dataset.unignore!==undefined&&panel?.name==='cell'){const d=doc(panel.id);delete d.ignored?.[panel.sid];log('Browser','Stopped continuing past open issues',proj()?.code+' · '+dcode(panel.id,lookupStep(panel.sid)));refresh();cellDlg(panel.id,panel.sid);toast('The next step waits again');return}
 if(b.dataset.fileRes){const r=data.resources.find(x=>x.id===+b.dataset.fileRes);if(r?.blob){const a=document.createElement('a');a.href=r.blob;a.download=r.file.name;a.click()}else toast('The stored copy of '+(r?.file?.name||'this file')+' downloads here.');return}
 if(b.dataset.gotoProject){const pid=b.dataset.gotoProject;closeDrawer();openProject(pid);projectDrawer(pid);return}
 if(b.dataset.pick!==undefined){const box=b.closest('.picker'),o=JSON.parse(box.dataset.opts).find(x=>x[0]===b.dataset.pick);if(o){box.querySelector('.pickchips').insertAdjacentHTML('beforeend',chip(box.dataset.picker,o));const i=box.querySelector('.pickinput');i.value='';pickerResults(box);i.focus()}return}
 if(b.hasAttribute('data-unpick')){const box=b.closest('.picker');b.closest('.pickchip').remove();if(!box.querySelector('.pickresults').hidden)pickerResults(box);return}
 if(b.dataset.res){resDrawer(b.dataset.res);return}
 if(b.dataset.addRes){resDrawer('',b.dataset.addRes);return}
 if(b.hasAttribute('data-close')&&b.closest('#drawer')){closeDrawer();return}
 if(b.dataset.deleteRes){const r=data.resources.find(x=>x.id===+b.dataset.deleteRes);if(r&&await confirmAction('Delete “'+r.name+'”? It is not used in any output.')){data.resources=data.resources.filter(x=>x!==r);log('Browser','Deleted '+(r.cat==='template'?'template':'source'),r.name);closeDrawer();refresh();toast('Deleted')}return}
 if(b.dataset.downloadRes){const r=data.resources.find(x=>x.id===+b.dataset.downloadRes);if(r?.blob){const a=document.createElement('a');a.href=r.blob;a.download=r.file.name;a.click()}return}
 if(b.dataset.settingsSection){settingTab=b.dataset.settingsSection;if(settingTab!=='Billing')data.ui.billingNotice=false;render();return}
 if(false&&b.dataset.revoke){const v=data.invites[+b.dataset.revoke];if(v&&await confirmAction('Withdraw the invitation to '+v.email+'?')){data.invites.splice(+b.dataset.revoke,1);log('Browser','Revoked invitation',v.email);refresh();toast('Invitation revoked')}return}
 if(b.dataset.connect){const k=b.dataset.connect.toLowerCase();data.profile[k]=!data.profile[k];refresh();toast(b.dataset.connect+(data.profile[k]?' connected':' disconnected'));return}
 if(b.dataset.assistant){toast('Opens '+(proj()?proj().code:'TrialAgents CTIS')+' in '+b.dataset.assistant);return}
 if(b.dataset.toast){toast(b.dataset.toast);return}
 if(b.dataset.revise!==undefined&&panel?.name==='cell'){const k=lookupStep(panel.sid),open=reviewThreads(doc(panel.id),k).filter(t=>!t.closed).length;log('Browser','Requested revision',proj()?.code+' · '+dcode(panel.id,k));persist();toast(open?'Sent to the assistant: revise '+dcode(panel.id,k)+' using '+open+' open comment'+(open>1?'s':''):'Sent to the assistant: '+dcode(panel.id,k)+' has no open comments, so it will ask what to change');return}
 if(b.classList.contains('sidebar-toggle')){const r=elx('rail');r.hidden=!r.hidden;b.setAttribute('aria-expanded',String(!r.hidden));b.title=b.ariaLabel=r.hidden?'Show sidebar':'Hide sidebar'}
});
elx('drawer').addEventListener('click',e=>{if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left)closeDrawer()}});
document.addEventListener('change',e=>{
 const t=e.target;
 if(t.closest('form[data-logf]')&&t.tagName==='SELECT'){data.ui.logf={...(data.ui.logf||{}),[t.name]:t.value};render();return}
 if(t.name==='gscope'){elx('grant-detail').hidden=t.value==='project';elx('grant-step').hidden=t.value!=='deliverable';return}
 const ff=t.closest('form[data-filters]');if(ff){const f=ff.dataset.filters==='template'?tplFilter:srcFilter;if(t.name!=='q'){f[t.name]=t.value;render()}return}
 if(t.name==='mode'&&drawerState?.type==='res'){drawerState.mode=t.value;const r=data.resources.find(x=>x.id===drawerState.id)||{};elx('file-slot').innerHTML=fileSlot(r);return}
 if(t.name==='upload'&&t.files?.[0]){const f=t.files[0];drawerState.pendingFile={name:f.name,size:f.size};if(f.size<=1500000){const rd=new FileReader();rd.onload=()=>{if(drawerState)drawerState.pendingFile.blob=rd.result};rd.readAsDataURL(f)}return}
});
document.addEventListener('input',e=>{if(e.target.classList.contains('pickinput')){pickerResults(e.target.closest('.picker'));return}});
document.addEventListener('focusin',e=>{if(e.target.classList?.contains('pickinput'))pickerResults(e.target.closest('.picker'))});
document.addEventListener('pointerdown',e=>{for(const ul of document.querySelectorAll('.pickresults:not([hidden])'))if(!ul.closest('.picker').contains(e.target))ul.hidden=true});
document.addEventListener('keydown',e=>{if(e.target.classList?.contains('pickinput')){if(e.key==='Enter'){e.preventDefault();e.target.closest('.picker').querySelector('[data-pick]')?.click()}if(e.key==='Escape'){e.stopPropagation();e.target.closest('.picker').querySelector('.pickresults').hidden=true}if(e.key==='Backspace'&&!e.target.value){const c=[...e.target.closest('.picker').querySelectorAll('.pickchip')].at(-1);c?.querySelector('[data-unpick]').click()}}},true);
document.addEventListener('input',e=>{const ff=e.target.closest('form[data-filters]');if(ff&&e.target.name==='q'){const f=ff.dataset.filters==='template'?tplFilter:srcFilter;f.q=e.target.value;const pos=e.target.selectionStart;render();const i=document.querySelector('form[data-filters] input[name=q]');i.focus();i.setSelectionRange(pos,pos)}});
document.addEventListener('submit',e=>{
 const f=e.target,fd=new FormData(f),get=k=>String(fd.get(k)||'').trim(),out=f.querySelector('output'),done=t=>{persist();if(out)out.textContent=t;else toast(t)};
 if(f.id==='resform'){e.preventDefault();
  const isNew=!drawerState.id,r=isNew?{id:Math.max(0,...data.resources.map(x=>x.id))+1,cat:drawerState.cat,via:'Browser',by:actor,added:now(),used:[],mode:'',projects:[]}:data.resources.find(x=>x.id===drawerState.id);
  Object.assign(r,{name:get('name'),kind:get('kind')==='SOP or guideline'?'Internal guideline':get('kind'),version:get('version'),scope:get('scope')||'All',detail:get('detail')});
  if(isNew&&get('addProject')&&!r.projects.includes(get('addProject'))){r.projects.push(get('addProject'));log('Browser','Added '+(r.cat==='template'?'template':'source')+' to project',pcode(get('addProject'))+' · '+r.name)}
  if(r.cat==='template'){r.lang=get('lang');r.doctype=get('doctype')}else r.date=get('date');
  const mode=drawerState.mode;
  if(mode==='link'){const l=get('link');if(l){try{const u=new URL(l);if(!['http:','https:'].includes(u.protocol))throw 0;r.link=u.href}catch{toast('Enter an http or https link.');return}}else r.link='';r.file=null;delete r.blob;r.mode='External link'}
  else if(mode==='file'){if(drawerState.pendingFile){r.file={name:drawerState.pendingFile.name,size:drawerState.pendingFile.size};if(drawerState.pendingFile.blob)r.blob=drawerState.pendingFile.blob;else delete r.blob}else if(!r.file){toast('Choose a file, or keep the record as name only.');return}r.link='';r.mode='Saved'}
  else{r.file=null;r.link='';delete r.blob;r.mode='Chat only'}
  if(isNew)data.resources.push(r);log('Browser',(isNew?'Recorded ':'Updated ')+(r.cat==='template'?'template':'source'),r.name+(r.version?' v'+r.version:''));
  if(!persist()){delete r.blob;r.file&&(r.file.size=r.file.size);persist();toast('Browser storage is full. The record was saved without the file copy.')}
  closeDrawer();render();toast(isNew?'Recorded':'Saved');return}
 if(f.id==='projectform'){e.preventDefault();const countries=fd.getAll('countries'),ws=fd.getAll('wideSources'),wt=fd.getAll('wideTemplates');
  const vals={name:get('name'),code:get('code').toUpperCase(),euct:get('euct'),sponsor:get('sponsor'),countries,updated:now()};
  if(drawerState.id){const p=data.projects.find(x=>x.id===drawerState.id);Object.assign(p,vals);if(p.planId&&data.ui.project===p.id)data.project=p.name;applyWide(p.id,'source',ws);applyWide(p.id,'template',wt);log('Browser','Updated project',p.name);closeDrawer();refresh();toast('Project saved');return}
  const id='PRJ'+Date.now().toString(36).toUpperCase(),from=drawerState.from?data.projects.find(x=>x.id===drawerState.from):null;
  const np={id,...vals,owner:actor,created:now(),planId:''};
  if(from){const base=planOf(from);if(base)np.planId=clonePlanFor(base,vals.name);}
  data.projects.push(np);applyWide(id,'source',ws);applyWide(id,'template',wt);
  log('Browser',from?'Duplicated project':'Created project',vals.name+(from?' from '+from.name:''));closeDrawer();openProject(id);toast(from?'Copy created':'Project created');return}
 if(f.id==='docform'){e.preventDefault();const p=proj(),did=drawerState.id,d=planOf(p).docs[did],sel=[...fd.getAll('docSources'),...fd.getAll('docTemplates')].map(Number);
  const wideIds=data.resources.filter(r=>wide(r,p.id)).map(r=>r.id);
  d.resAdd=sel.filter(id=>!wideIds.includes(id));d.resRemove=wideIds.filter(id=>!sel.includes(id));
  log('Browser','Changed document sources and templates',p.code+' · '+def(did).name);closeDrawer();refresh();if(panel?.name==='cell')cellDlg(panel.id,panel.sid);toast('Saved for this document');return}
 if(f.id==='profileform'){e.preventDefault();if(actor!==owner){done('Profile saved');return}Object.assign(data.profile,{name:get('name'),title:get('title'),org:get('org'),tz:get('tz'),lang:get('lang')});done('Profile saved');return}
 if(f.id==='securityform'){e.preventDefault();return}
 if(f.id==='projectsettings'){e.preventDefault();const p=proj();Object.assign(p,{name:get('name'),phase:get('phase'),sponsor:get('sponsor'),updated:now()});if(p.planId)data.project=p.name;done('Project saved');return}
 if(f.id==='plandefaults'){e.preventDefault();data.defaults.steps=fd.getAll('steps');data.defaults.pattern=get('pattern');data.dense=fd.has('dense');done('Defaults saved');return}
 if(f.id==='inviteform'){e.preventDefault();const st=drawerState,role=get('role');let g;
  if(st.doc){const scope=get('scope')||'deliverable';g={project:st.project,scope,doc:scope==='project'?'':st.doc,sid:scope==='deliverable'?st.sid:null,role}}
  else{const scope=get('gscope');g={project:get('gproject'),scope,doc:scope==='project'?'':get('gdoc'),sid:scope==='deliverable'?+get('gstep'):null,role}}
  let s=st.shareIndex!=null?data.shares[st.shareIndex]:data.shares.find(x=>x.email.toLowerCase()===get('email').toLowerCase());
  if(!s){s={email:get('email'),opened:false,sent:now(),grants:[]};data.shares.push(s)}
  const same=s.grants.find(x=>x.project===g.project&&x.scope===g.scope&&x.doc===g.doc&&x.sid===g.sid);if(same)same.role=role;else s.grants.push(g);
  log('Browser','Shared',s.email+' · '+scopeLabel(g)+' · '+roleName(role));closeDrawer();persist();if(route==='settings')render();toast('Shared with '+s.email);return}
 if(f.id==='memberform'){e.preventDefault();const s=data.shares[drawerState.i];s.grants.forEach((g,gi)=>{const r=fd.get('role'+gi);if(r)g.role=r});log('Browser','Changed access',s.email);closeDrawer();refresh();toast('Access updated');return}
 if(f.id==='logform'){e.preventDefault();logQuery=get('query');render();return}
 if(f.id==='prefsform'){e.preventDefault();for(const k of Object.keys(data.prefs))data.prefs[k]=fd.has(k);done('Preferences saved');return}
 if(f.id==='supportform'){e.preventDefault();f.reset();done('Message sent to support');return}
 if(f.closest('form[data-filters]')||f.dataset.filters){e.preventDefault();return}
},true);
document.addEventListener('change',e=>{if(e.target.closest('#securityform')&&e.target.name==='twofa'){data.profile.twofa=e.target.checked;persist();toast('Two-step verification '+(e.target.checked?'on':'off'))}});
data=upgrade(data);
