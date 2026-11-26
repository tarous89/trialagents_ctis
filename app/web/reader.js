// The deliverable dialog: the document, its review threads, versions, sources, and the workflow actions.
import {call,write,downloadUrl} from './api.js'
import {E,$,icon,host,statusLabel,statusClass,categories,tone,languageName,fmtDate,fmtTime,initials,inline,plural,toast,modal,closeModal,drawer,closeDrawer,field,options,assistantOnly,formData,askAssistant} from './ui.js'

let ctx=null // {project, code, data, n, history, compose, quote, section, onChange}

const stepOutput={draft:'Draft text',qc:'Annotated text',style:'Styled Word document',checklist:'Checklist report',team:'Review summary',guide:'Guideline review',custom:'Step result'}

export async function openDeliverable(project,code,{n,onChange,onClose}={}){
  ctx={project,code,n,history:false,compose:null,onChange,onClose}
  await load()
}
async function load(){
  ctx.data=await call('deliverable.read',{project:ctx.project,input:{deliverable:ctx.code,...(ctx.n?{n:ctx.n}:{})}})
  draw()
}

function block(b){
  switch(b.type){
    case 'heading':return '<h4>'+inline(b.text)+'</h4>'
    case 'paragraph':return '<p>'+inline(b.text)+'</p>'
    case 'list':return (b.style==='number'?'<ol>':'<ul>')+b.items.map(i=>'<li>'+inline(i)+'</li>').join('')+(b.style==='number'?'</ol>':'</ul>')
    case 'table':return '<table class="visitTable'+(b.style==='info'?' infoTable':'')+'">'+b.rows.map((r,i)=>'<tr>'+r.map((c,j)=>{const th=(b.header&&b.style!=='info'&&i===0)||(b.style==='info'&&j===0);return (th?'<th>':'<td>')+inline(c)+(th?'</th>':'</td>')}).join('')+'</tr>').join('')+'</table>'+(b.caption?'<p class="caption">'+inline(b.caption)+'</p>':'')
    case 'note':return '<div class="noteBox '+E(b.tone)+'">'+inline(b.text)+'</div>'
    case 'placeholder':return '<p><mark class="missingInfo">['+E(b.text.replace(/^\[|\]$/g,''))+']</mark></p>'
    case 'timeline':return '<div class="timeline">'+b.items.map((it,i)=>(i?'<span class="tlArrow" aria-hidden="true">→</span>':'')+'<div class="tlStep"><strong>'+inline(it.label)+'</strong>'+(it.detail?'<small>'+inline(it.detail)+'</small>':'')+'</div>').join('')+'</div>'+(b.caption?'<p class="caption">'+inline(b.caption)+'</p>':'')
    case 'image':return '<p class="caption">[Image'+(b.caption?': '+inline(b.caption):'')+']</p>'
    case 'page_break':return '<hr class="pagebreak">'
    default:return ''
  }
}

function paper(){
  const {data}=ctx,v=data.version,doc=data.document
  if(!v){
    const s=data.status
    return '<article class="paper stepbrief"><div class="paperKicker"><span class="frag">'+E(doc.code||doc.id)+'</span><span>'+E(languageName(doc.language))+'</span></div><h2>'+E(doc.name)+'</h2>'
      +'<p>This step has not run yet.</p>'+(s.blockedBy?'<p>It waits for <button type="button" class="link" data-goto="'+doc.id+'-'+s.blockedBy+'">'+doc.id+'-'+s.blockedBy+'</button>, which needs action.</p>':'<p>The assistant runs it when the plan reaches it, or when you ask in Claude or ChatGPT.</p>')+'</article>'
  }
  const open=data.threads.filter(t=>t.status==='open')
  const markers=id=>open.filter(t=>t.anchor?.section===id).map(t=>'<button type="button" class="marker" style="'+tone(t.category)+'" data-focus-thread="'+t.number+'" aria-label="Open thread '+t.number+'">#'+t.number+'</button>').join('')
  const claims=id=>v.claims.filter(c=>c.section===id).length
  return '<article class="paper" aria-label="Full document"><div class="paperKicker"><span class="frag">'+E(doc.code||doc.id)+'</span> <span>'+E(languageName(doc.language))+' · v'+v.n+(ctx.n&&ctx.n!==data.versions.at(-1)?.n?' (earlier version)':'')+'</span></div>'
    +'<h2>'+inline(v.content.title||doc.name)+'</h2>'
    +v.content.sections.map(s=>'<section class="para'+(ctx.section===s.id?' activePara':'')+'" data-section="'+E(s.id)+'" tabindex="0">'+(s.heading?'<h3>'+inline(s.heading)+'</h3>':'')
      +'<div class="paraline"><div class="prose">'+s.blocks.map(block).join('')+'</div>'+(markers(s.id)||claims(s.id)?'<span class="inlinetools">'+markers(s.id)+(claims(s.id)?'<span class="claimtag" title="Facts with a source passage">'+icon('book')+claims(s.id)+'</span>':'')+'</span>':'')+'</div></section>').join('')
    +'</article>'
}

function evidence(){
  const v=ctx.data.version;if(!v||!ctx.section)return ''
  const list=v.claims.filter(c=>c.section===ctx.section)
  if(!list.length)return '<div class="evidenceCard"><div class="railLabel">'+icon('book')+' Source passage</div><p class="muted">No evidence recorded for this section.</p></div>'
  const kind={source:'Source',standard:'Standard wording',user:'Supplied by the user',site:'Completed by the site',blank:'Left blank'}
  return list.map(c=>'<div class="evidenceCard"><div class="railLabel">'+icon('book')+' '+kind[c.kind]+'</div><p class="claimtext">'+inline(c.text)+'</p>'
    +(c.source?'<strong>'+E([c.source.name,c.source.version&&'v'+c.source.version,c.source.locator].filter(Boolean).join(' · '))+'</strong>'+(c.source.quote?'<blockquote>'+E(c.source.quote)+'</blockquote>':''):'')
    +(c.supplied_by?'<small>'+E(c.supplied_by)+'</small>':'')+'</div>').join('')
}

function sidebar(){
  const {data}=ctx,canComment=!!data.role,threads=ctx.history?data.threads:data.threads.filter(t=>t.status==='open')
  const card=t=>{
    const cat=t.category,meta=categories[cat],ai=t.kind==='finding',who=ai?'TrialAgents AI'+(t.source&&t.source!=='web'?' · '+t.source:''):t.actor_name
    return '<article class="threadcard'+(ctx.focus===t.number?' selected':'')+'" style="'+tone(cat)+'" data-thread="'+t.number+'"><div class="threadHead"><span class="personTile'+(ai?' auto':'')+'">'+(ai?icon('spark'):E(initials(t.actor_name)))+'</span><div><b>'+E(who)+'</b><div class="threadKind">'+icon(meta.icon)+(t.status==='resolved'?'Resolved':meta.label)+'</div></div><button type="button" class="threadnum" data-focus-thread="'+t.number+'" title="Go to the text">#'+t.number+'</button></div>'
      +(t.anchor?.quote?'<button class="anchorQuote" data-focus-thread="'+t.number+'">'+E(t.anchor.quote)+'</button>':'')
      +'<p>'+inline(t.text)+'</p>'+t.replies.map(r=>'<div class="reply"><b>'+E(r.by)+(r.source&&r.source!=='web'?' · '+E(r.source):'')+'</b><p>'+inline(r.text)+'</p></div>').join('')
      +'<div class="threadFoot"><span>v'+t.version_n+'</span>'+(canComment?'<div class="threadacts"><button type="button" class="actionIcon" data-reply="'+t.number+'" aria-label="Reply" data-tip="Reply">'+icon('reply')+'</button>'
        +(t.status==='open'?'<button type="button" class="actionIcon" data-resolve="'+t.number+'" aria-label="Resolve" data-tip="Resolve">'+icon('resolved')+'</button>':'<button type="button" class="actionIcon" data-reopen="'+t.number+'" aria-label="Reopen" data-tip="Reopen">'+icon('redo')+'</button>')+'</div>':'')+'</div>'
      +(ctx.compose?.reply===t.number?composer('Reply to #'+t.number):'')+'</article>'
  }
  const past=data.version?.past_issues??[]
  return '<div class="railTop"><h3>Review</h3>'+(canComment&&data.version?'<button type="button" class="actionIcon" data-new-thread aria-label="Comment on the entire deliverable" data-tip="Comment on the entire deliverable">'+icon('message')+'</button>':'')+'</div>'
    +'<div id="source-slot">'+evidence()+'</div>'
    +(data.status.sourceChanged?'<div class="notice">'+icon('redo')+' The input of this step changed after it ran. Ask the assistant to run it again.</div>':'')
    +past.map(p=>'<div class="notice">Moved on past '+E(p.deliverable)+(p.open.length?': '+p.open.map(o=>'#'+o.number+' '+E(categories[o.category].label.toLowerCase())).join(', '):'')+' (asked in the chat).</div>').join('')
    +'<div class="railTitle"><h4>Threads <span>'+data.threads.filter(t=>t.status==='open').length+'</span></h4></div>'
    +(ctx.compose&&!ctx.compose.reply?composer('New comment'):'')
    +(threads.map(card).join('')||'<p class="nothreads">'+(data.version?'Highlight text to comment on it.':'Comments open once the step has run.')+'</p>')
    +(data.threads.some(t=>t.status==='resolved')?'<button type="button" class="textbtn mt" data-history>'+(ctx.history?'Show open threads':'Show resolved threads')+'</button>':'')
}
const composer=label=>'<form class="railform" id="threadform"><label class="field" for="thread-text">'+E(label)+'</label>'+(ctx.compose?.quote?'<q class="selectedquote">'+E(ctx.compose.quote)+'</q>':'')
  +'<textarea id="thread-text" name="text" required maxlength="4000" rows="3"></textarea><div class="rowbtns"><button class="btn primary sm">'+(ctx.compose?.reply?'Reply':'Comment')+'</button><button type="button" class="btn sm" data-cancel-compose>Cancel</button></div><output></output></form>'

function bottom(){
  const {data}=ctx,s=data.status,role=data.role,canEdit=role==='owner'||role==='editor',v=data.version
  const latest=v&&v.n===data.versions.at(-1)?.n
  const btns=[]
  if(latest&&canEdit&&s.status==='action_required')btns.push(s.continued
    ?'<button type="button" class="btn" data-undo-continue title="Stop the next step from running past the open issues">'+icon('rewind')+' Undo continue</button>'
    :'<button type="button" class="btn" data-continue title="Let the next step run. The issues here stay open and still need action.">'+icon('skip')+' Ignore and continue</button>')
  if(canEdit&&v)btns.push('<button type="button" class="btn'+(role==='owner'&&data.final.step===data.step.id?'':' primary')+'" data-revise'+assistantOnly()+(assistantOnly()?'':' title="Ask the assistant for a new version using your comments and any changed sources"')+'>'+icon('redo')+' Revise</button>')
  const isLast=data.final.step===data.step.id
  if(role==='owner'&&latest&&isLast&&(s.status==='done'||(s.status==='action_required'&&s.continued))&&!(data.final.status==='approved'&&data.final.version===v.n))
    btns.push('<button type="button" class="btn primary" data-approve="'+v.n+'" title="Approve v'+v.n+' as the final document">'+icon('check')+' Approve final document</button>')
  if(isLast&&data.final.status==='approved')btns.unshift('<span class="tag good">Approved v'+data.final.version+'</span>')
  return '<div class="readerBottom"><span>'+E(stepOutput[data.step.type]??'')+'</span><div class="actions">'+btns.join('')+'</div></div>'
}

function draw(){
  const {data}=ctx,v=data.version,doc=data.document,s=data.status
  const res=data.resources,label=res?plural(res.filter(r=>r.category==='source').length,'source')+' · '+plural(res.filter(r=>r.category==='template').length,'template'):''
  modal('<div class="modalhead"><div><h2 id="overlaytitle">'+E(doc.name)+' <span class="titlecode" title="Deliverable code. Quote it to the assistant.">'+E(ctx.code)+'</span></h2></div><button type="button" class="iconbtn" data-close-reader aria-label="Close window">'+icon('close')+'</button></div>'
    +'<div class="modalbody"><div class="readerToolbar"><div class="readertitle"><span class="state '+(s.continued&&s.status==='action_required'?'ignored':statusClass[s.status])+'">'+(s.continued&&s.status==='action_required'?'Continued':statusLabel[s.status])+'</span> <span>'+E(data.step.name)+' · '+E(languageName(doc.language))+(v?' · v'+v.n:'')+'</span>'
    +(res?'<span class="sepdot">·</span><button type="button" class="reflink" data-doc-sources title="Sources and templates for this document">'+label+'</button>':'')+'</div>'
    +'<div class="actions">'+(v?.file_id?'<a class="btn sm" href="'+downloadUrl(ctx.project,ctx.code,v.n)+'" title="Download this version">'+icon('download')+' Download</a>':'')
    +(data.versions.length?'<button type="button" class="btn sm" data-versions title="All versions of this deliverable">'+icon('clock')+' Versions</button>':'')
    +(data.role==='owner'?'<button type="button" class="btn sm" data-invite title="Share this deliverable, its document or the project">'+icon('team')+' Invite</button>':'')+'</div></div>'
    +'<div class="reviewLayout"><div class="readingSurface">'+paper()+'</div><aside id="review-sidebar" class="reviewSidebar" aria-label="Comments and sources">'+sidebar()+'</aside></div>'
    +'<button type="button" class="selectionAction" id="selection-toolbar" hidden aria-label="Comment on selection">'+icon('message')+' Comment</button>'
    +bottom()+'</div>',{drawer:true,onClose:()=>{const done=ctx?.onClose;ctx=null;done?.()}})
  if(ctx.compose)$('#thread-text')?.focus()
}
const redraw=()=>{const scroll=$('.readingSurface')?.scrollTop;draw();if(scroll)$('.readingSurface').scrollTop=scroll}
const changed=async(msg)=>{if(msg)toast(msg);ctx.n=undefined;await load();ctx.onChange?.()}

// ---------- dialogs ----------
function versionsDrawer(){
  const {data}=ctx,role=data.role,current=data.versions.at(-1)?.n
  drawer('<div class="line"><h2>Versions of '+E(ctx.code)+'</h2><button type="button" data-close-drawer aria-label="Close">✕</button></div><ul class="versionlist">'
    +[...data.versions].reverse().map(x=>'<li><div><strong>v'+x.n+(x.n===current?' · current':'')+'</strong><small>'+E(x.actor_name)+' · '+E(x.source)+' · '+fmtTime(x.created_at)+'</small>'+(x.note?'<p>'+E(x.note)+'</p>':'')+'</div><div class="rowbtns">'
      +'<button type="button" class="sm" data-view-version="'+x.n+'">View</button>'+(x.n!==current&&(role==='owner'||role==='editor')?'<button type="button" class="sm" data-restore="'+x.n+'" title="Make a new version from this one">Restore</button>':'')+'</div></li>').join('')+'</ul>')
}
async function sourcesDialog(){
  const {data}=ctx,v=data.version,owner=data.role==='owner'
  const row=(r,remove)=>'<li><span>'+E(r.name)+' <small class="muted">'+E([r.type,r.version&&'v'+r.version].filter(Boolean).join(' · '))+'</small></span>'+(remove&&owner?'<button type="button" class="textbtn" data-doc-res-remove="'+r.id+'">Remove for this document</button>':'')+'</li>'
  let add=''
  if(owner){
    const [s,t]=await Promise.all(['source','template'].map(category=>call('resource.list',{input:{category}})))
    const have=new Set(data.resources.map(r=>r.id)),candidates=[...s.resources,...t.resources].filter(r=>!have.has(r.id))
    if(candidates.length)add='<div class="rowbtns"><select id="docresadd" aria-label="Add a source or template">'+options(candidates.map(r=>[r.id,r.name+(r.version?' v'+r.version:'')]))+'</select><button type="button" class="btn" data-doc-res-add>Add for this document</button></div>'
  }
  modal('<div class="modalhead"><div><h2 id="overlaytitle">Sources and templates · '+E(data.document.name)+'</h2></div><button type="button" class="iconbtn" data-back-reader aria-label="Back">'+icon('close')+'</button></div>'
    +'<div class="modalbody pad">'+(v?'<h3>Used in this version (v'+v.n+')</h3><p class="note">A fixed record of what was used when this version was made.</p><ul class="reslist">'+(v.resources.map(r=>row(r,false)).join('')||'<li class="muted">None recorded</li>')+'</ul>':'')
    +'<h3>For the next run</h3><p class="note">Starts from the project’s sources and templates. Changes here apply to this document only.</p><ul class="reslist">'+(data.resources.map(r=>row(r,true)).join('')||'<li class="muted">None</li>')+'</ul>'+add
    +'<div class="rowbtns"><button type="button" class="btn" data-back-reader>Back to the document</button></div></div>',{drawer:true})
}
function inviteDialog(){
  const {data}=ctx,doc=data.document
  modal('<div class="modalhead"><div><h2 id="overlaytitle">Invite</h2></div><button type="button" class="iconbtn" data-back-reader aria-label="Back">'+icon('close')+'</button></div>'
    +'<form class="modalbody pad gearform" id="inviteform">'+field('Email','<input type="email" name="email" required placeholder="name@company.com">')
    +field('Share','<select name="scope">'+options([['deliverable','This deliverable ('+ctx.code+')'],['document','This document: '+doc.name],['project','The whole project']])+'</select>')
    +field('Access','<select name="role">'+options([['commenter','Can comment'],['editor','Can edit (also asks their own assistant for revisions)']])+'</select>')
    +'<p class="note">Access starts immediately; there is nothing to accept. Sharing is part of the Team plan.</p><div class="rowbtns"><button class="btn primary">Invite</button><button type="button" class="btn" data-back-reader>Cancel</button></div><output></output></form>',{drawer:true})
}

// ---------- events ----------
document.addEventListener('click',async e=>{
  if(!ctx)return
  const b=e.target.closest('button,a,.para');if(!b||!b.closest('#overlay,#drawer'))return
  const d=b.dataset
  try{
    if(b.classList.contains('para')){ctx.section=d.section;ctx.focus=null;return redraw()}
    if(d.closeReader!==undefined)return closeModal()
    if(d.backReader!==undefined)return draw()
    if(d.goto){ctx.code=d.goto;ctx.n=undefined;history.replaceState(null,'','/?project='+ctx.project+'&deliverable='+d.goto);return load()}
    if(d.focusThread){const t=ctx.data.threads.find(x=>x.number===+d.focusThread);ctx.focus=t.number;ctx.section=t.anchor?.section??ctx.section;redraw();$('.para[data-section="'+CSS.escape(ctx.section??'')+'"]')?.scrollIntoView({block:'nearest'});return}
    if(d.newThread!==undefined){ctx.compose={};return redraw()}
    if(d.reply){ctx.compose={reply:+d.reply};return redraw()}
    if(d.cancelCompose!==undefined){ctx.compose=null;return redraw()}
    if(d.history!==undefined){ctx.history=!ctx.history;return redraw()}
    if(d.resolve)return write('thread.resolve',{project:ctx.project,input:{deliverable:ctx.code,number:+d.resolve}}).then(()=>changed('Resolved'))
    if(d.reopen)return write('thread.reopen',{project:ctx.project,input:{deliverable:ctx.code,number:+d.reopen}}).then(()=>changed('Reopened'))
    if(d.continue!==undefined)return write('continue.set',{project:ctx.project,input:{deliverable:ctx.code,n:ctx.data.version.n}}).then(()=>changed('The next step can run. The issues here stay open.'))
    if(d.undoContinue!==undefined)return write('continue.undo',{project:ctx.project,input:{deliverable:ctx.code}}).then(()=>changed('Continue undone'))
    if(d.approve)return write('approval.create',{project:ctx.project,input:{deliverable:ctx.code,n:+d.approve}}).then(()=>changed('Final document approved'))
    if(d.versions!==undefined)return versionsDrawer()
    if(d.viewVersion){closeDrawer();ctx.n=+d.viewVersion;return load()}
    if(d.restore){closeDrawer();return write('version.restore',{project:ctx.project,input:{deliverable:ctx.code,n:+d.restore,base:ctx.data.versions.at(-1).n}}).then(()=>changed('Restored as a new version'))}
    if(d.docSources!==undefined)return sourcesDialog()
    if(d.docResRemove)return write('document.resources.set',{project:ctx.project,input:{document:ctx.data.document.id,remove:[d.docResRemove]}}).then(async()=>{await load();sourcesDialog()})
    if(d.docResAdd!==undefined)return write('document.resources.set',{project:ctx.project,input:{document:ctx.data.document.id,add:[$('#docresadd').value]}}).then(async()=>{await load();sourcesDialog()})
    if(d.invite!==undefined)return inviteDialog()
    if(d.revise!==undefined&&host!=='browser')return askAssistant('Revise '+ctx.code+' in TrialAgents CTIS (project '+ctx.project+'), using the open comments and any changed sources.')
    if(b.id==='selection-toolbar'){const sel=getSelection(),node=sel.anchorNode?.parentElement?.closest('.para');ctx.compose={quote:sel.toString().trim().slice(0,2000),section:node?.dataset.section};sel.removeAllRanges();return redraw()}
  }catch(err){toast(err.message)}
})
document.addEventListener('mouseup',()=>{
  if(!ctx)return
  const sel=getSelection(),bar=$('#selection-toolbar');if(!bar)return
  const inPaper=sel.rangeCount&&!sel.isCollapsed&&sel.anchorNode&&sel.anchorNode.parentElement?.closest('.paper')
  if(!inPaper||!ctx.data.role||!ctx.data.version){bar.hidden=true;return}
  const r=sel.getRangeAt(0).getBoundingClientRect(),box=$('#dialog-content').getBoundingClientRect()
  bar.style.position='absolute';bar.style.left=(r.left-box.left)+'px';bar.style.top=(r.bottom-box.top+6)+'px';bar.hidden=false
})
document.addEventListener('submit',async e=>{
  if(!ctx)return
  const form=e.target
  if(form.id==='threadform'){
    e.preventDefault()
    const text=form.text.value.trim(),c=ctx.compose??{}
    try{
      if(c.reply)await write('thread.reply',{project:ctx.project,input:{deliverable:ctx.code,number:c.reply,text}})
      else await write('comment.create',{project:ctx.project,input:{deliverable:ctx.code,version:ctx.data.version.n,text,anchor:{...(c.section?{section:c.section}:{}),...(c.quote?{quote:c.quote}:{})}}})
      ctx.compose=null;await changed(c.reply?'Reply added':'Comment added')
    }catch(err){form.querySelector('output').textContent=err.message}
  }
  if(form.id==='inviteform'){
    e.preventDefault()
    const f=formData(form),doc=ctx.data.document
    const input={email:f.email,scope:f.scope,role:f.role,...(f.scope!=='project'?{document:doc.id}:{}),...(f.scope==='deliverable'?{step:ctx.data.step.id}:{})}
    try{await write('share.create',{project:ctx.project,input});toast('Shared with '+f.email);draw()}
    catch(err){form.querySelector('output').innerHTML=err.status===402?'Sharing is part of the Team plan. <a href="/?tab=settings&section=Billing">See the Team plan</a>':E(err.message)}
  }
},true)
