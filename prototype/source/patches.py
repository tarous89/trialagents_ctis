# Patches applied to the original plan/reader script (string `app`).
def swap_function(src, name, new):
    i = src.index('function ' + name + '(')
    e = src.index('\n}', i) + 2
    return src[:i] + new.strip('\n') + '\n' + src[e:]

app = must_replace(app, """'<th scope="col">'+button('batch','<span class="stepidx">'+pad(i+1)+'</span><span>'+safe(s.name)+'</span><span class="chev">'+icon('down')+'</span>','thbtn','data-s="'+s.id+'" aria-label="Manage '+safe(s.name)+' across the plan"')+'</th>'""",
                   """'<th scope="col"><span class="thlabel">'+safe(s.name)+'</span></th>'""")
app = must_replace(app, """<th scope="col">Language / use</th>""", """<th scope="col">Language</th>""")

app = swap_function(app, 'cellMarkup', r"""
function cellMarkup(m,s,d){
 if(!cellVisible(m.id,s.id))return '<td class="workcell hiddencell"></td>';
 const [st,l]=liveState(d,s);
 if(st==='na')return '<td class="workcell"><span class="state na" title="Not part of the plan for this document">'+l+'</span></td>';
 return '<td class="workcell">'+button('cell','<span class="state '+st+'">'+l+'</span>','cellbutton','data-s="'+s.id+'" data-d="'+m.id+'" title="Open '+safe(dcode(m.id,s)+' · '+s.name)+'"')+'</td>'
}""")

app = must_replace(app, """button('doc','<span class="id">'+m.id+'</span><span>'+safe(m.name)+'</span>','docname','data-d="'+m.id+'"')""",
                   """button('doc','<span>'+safe(m.name)+'</span>','docname','data-d="'+m.id+'" title="Open the latest deliverable of this document"')""")
app = must_replace(app, """<span class="variant">'+safe(m.variant)+'</span></td>'""", """<span class="variant">'+safe(variantLabel(m.variant))+'</span></td>'""")
app = app.replace("(ready?'Ready':'Pending')", "(ready?'Approved':'Waiting')")
app = must_replace(app, "const scopeName=c=>c==='EU'?'Part I · Shared documents':'Part II · '+cc[c];", "const scopeName=c=>c==='EU'?'Part I':'Part II · '+cc[c];")

# Reader: rebuilt around the live status
app = swap_function(app, 'cellDlg', r"""
function cellDlg(id,sid){
 if(!cellVisible(id,sid)){const sh=shareOf();if(!sh||sh.doc!==id)return;sid=sh.sid??P().steps.find(x=>!x.skip&&!doc(id).rowSkip?.[x.id])?.id}
 const m=def(id),d=doc(id),k=lookupStep(sid);if(!k)return;
 const w=work(d,k),a=w.current,threads=reviewThreads(d,k),own=isOwnerHere(),edit=canEdit(),sh=shareOf();
 const key=[P().id,id,k.id].join('/');if(!reading||reading.key!==key)reading={key,p:0,thread:0,compose:null,invite:false,history:false,draft:'',quote:''};
 const [st]=liveState(d,k),last=lastApplicable(P(),d),isLast=k.id===last?.id,showContent=!!a&&!['waiting','na'].includes(st);
 const canApprove=own&&showContent&&isLast&&actor===owner&&!!approvalKey(P(),d)&&!released(P(),d)&&st!=='action';
 if(showContent)snapshotUse(id,k);
 const res=docRes(id),versions=allVersions(w);
 const meta=[k.name,langs[m.lang],variantLabel(m.variant),showContent?'v'+a.rev:''].filter(Boolean);
 const refs=sh&&sh.scope!=='project'?'':'<span class="sepdot">·</span><button type="button" class="reflink" data-doc-sources="'+id+'" title="Sources and templates for this document">'+res.sources.length+' source'+(res.sources.length===1?'':'s')+' · '+res.templates.length+' template'+(res.templates.length===1?'':'s')+'</button>';
 const toolbar='<div class="readerToolbar"><div class="readertitle">'+liveBadge(d,k)+' <span>'+safe(meta.join(' · '))+'</span>'+refs+(showContent&&continuedPast(d,k)?'<span class="contnote" title="You let the next step run while these issues stay open">Next step allowed</span>':'')+'</div><div class="actions">'+
  (showContent?button('save-file',icon('download')+' '+(k.type==='style'?'Download Word':'Download'),'btn sm','title="Download this version"'):'')+
  (showContent&&versions.length>1?'<button type="button" class="btn sm" data-versions title="See earlier versions and restore one">'+icon('clock')+' Versions ('+versions.length+')</button>':'')+
  (own?'<button type="button" class="btn sm" data-invite="'+id+'|'+k.id+'" title="Share this deliverable, its document or the project">'+icon('team')+' Invite</button>':'')+
  '</div></div>';
 let body,foot;
 if(showContent){
  body='<div class="reviewLayout"><div class="readingSurface">'+paperHTML(m,k,w,threads)+'</div><aside id="review-sidebar" class="reviewSidebar" aria-label="Comments and sources">'+sidebarHTML(m,k,w,threads)+'</aside></div>'+button('selection-comment',icon('message')+' Comment','selectionAction','id="selection-toolbar" hidden aria-label="Comment on selection"');
  foot='<div class="readerBottom"><span>'+safe(isLast?(released(P(),d)?'Final document approved by '+owner:'Final document · waiting for owner approval'):outputNames[k.type])+'</span><div class="actions">'+
   (edit&&st==='action'&&!continuedPast(d,k)?'<button type="button" class="btn" data-ignore title="Let the assistant continue with the next step. The issues here stay open and still need action.">'+icon('skip')+' Ignore and continue</button>':'')+
   (edit&&st==='action'&&continuedPast(d,k)?'<button type="button" class="btn" data-unignore title="Make the next step wait again until these issues are resolved">'+icon('redo')+' Undo</button>':'')+
   (edit?'<button type="button" class="btn'+(canApprove?'':' primary')+'" data-revise data-a="run-one" title="Sends your comments and any changed sources or templates to the assistant for a new version">'+icon('redo')+' Revise</button>':'<span class="muted">You can comment on this deliverable.</span>')+
   (canApprove?'<button type="button" class="btn primary" data-a="approve-owner" title="Approve this version as the final document">'+icon('check')+' Approve final document</button>':'')+'</div></div>';
 }else{
  const steps=P().steps.filter(x=>!x.skip&&!d.rowSkip?.[x.id]),idx=steps.findIndex(x=>x.id===k.id),blocker=idx>0?steps.slice(0,idx).find(x=>liveState(d,x)[0]==='action'):null;
  const msg=st==='na'?['Not applicable','This step is not needed for '+m.name+'.']:blocker?['Waiting for '+dcode(id,blocker),'This step starts once the issues in '+blocker.name+' are resolved or ignored.']:['Not started yet','The assistant runs this step when the previous step is done.'];
  body='<div class="emptyReader">'+icon(st==='na'?'minus':'clock')+'<h3>'+safe(msg[0])+'</h3><p>'+safe(msg[1])+'</p>'+(blocker?button('cell','Open '+dcode(id,blocker),'btn','data-d="'+id+'" data-s="'+blocker.id+'"'):'')+'</div>';
  foot='<div class="readerBottom"><span></span><div class="actions">'+(st!=='na'&&!blocker&&edit?'<button type="button" class="btn primary" data-a="run-one" title="Ask the assistant to run this step now">'+icon('play')+' Run now</button>':'')+'</div></div>';
 }
 modal({name:'cell',id,sid:k.id},m.name,'',toolbar+body+foot);$('#overlaytitle').insertAdjacentHTML('beforeend',' <span class="titlecode" title="Deliverable code. Quote it to the assistant.">'+safe(dcode(id,k))+'</span>');
}""")

# Title and project code in the paper are commentable text
app = must_replace(app, """<div class="paperKicker">EX-101 <span>'+safe(langs[m.lang]+' · '+m.variant+' · v'+a.rev)+'</span></div><h2>'+safe(m.name)+'</h2><div class="paperSub">'+safe(k.type==='style'?a.layout:outputNames[k.type])+'</div>'""",
                   """<div class="paperKicker" data-p="0">'+run('0k',proj()?.code||'')+' <span>'+safe(langs[m.lang]+' · v'+a.rev)+'</span></div><h2 data-p="0">'+run('0h',m.name)+'</h2>'""")
app = must_replace(app, "function fragmentMap(ps){return new Map(ps.flatMap(q=>fragments(q).map(f=>[f.key,f])))}",
                   "function fragmentMap(ps){const map=new Map(ps.flatMap(q=>fragments(q).map(f=>[f.key,f])));if(panel?.name==='cell'){const m=def(panel.id);if(m){map.set('0h',{key:'0h',text:m.name});map.set('0k',{key:'0k',text:proj()?.code||''})}}return map}")

# Full version history
app = must_replace(app, "function storeResult(w,obj){\n w.previous=w.current;", "function storeResult(w,obj){\n if(w.current)(w.history??=[]).push(w.current);w.previous=w.current;")

# Mentions can invite someone new
app = must_replace(app, """function peoplePicker(w){return '<div class="taglist" hidden>'+members(w).map(u=>button('insert-tag','@'+safe(u),'membertag','data-person="'+safe(u)+'"')).join('')+'</div>'}""",
                   """function peoplePicker(w){return '<div class="taglist" hidden>'+members(w).map(u=>button('insert-tag','@'+safe(u),'membertag','data-person="'+safe(u)+'"')).join('')+'<button type="button" class="membertag invitetag" data-invite="'+panel?.id+'|'+panel?.sid+'" title="Invite someone who is not on the team yet">＋ Invite someone</button></div>'}""")
app = must_replace(app, "function members(w){return [owner,reviewer,...w.invites.map(x=>x.email)]", "function members(w){return [...data.team.map(x=>x.name),...data.shares.filter(s=>s.grants.some(g=>g.project===data.ui.project)).map(s=>s.name||s.email),...w.invites.map(x=>x.email)]")

app = must_replace(app, "$('#persona').value=actor;", "")
app = must_replace(app, "if(key==='persona'){actor=e.target.value;render();return}", "")
app = must_replace(app, "toast('Demo invitation saved for this deliverable')", "toast('Invitation sent')")
app = app.replace("""P().id+' / '+c.id+' · '+k.name""", """dcode(c.id,k)+' · '+k.name""")
app = must_replace(app, """const ref=(id,n)=>P().id+' / '+id+' / Point '+n;""", """const ref=(id,n)=>id+' · #'+n;""")
app = must_replace(app, """copyText(P().id+' / '+m.id+' / '+k.name+' / #'+t.id""", """copyText(dcode(m.id,k)+' #'+t.id""")
app = app.replace("(ready?'Approved':'Waiting')", "(ready?'Approved':approvalKey(p,d)?'Awaiting approval':'Waiting')")
app = app.replace("Save demo invite","Send invitation")

app = must_replace(app, "rows=()=>defs.filter(m=>doc(m.id));", "rows=()=>defs.filter(m=>doc(m.id)&&docVisible(m.id));")

# ---- Round 5 ----
app = must_replace(app, "['D02','Study protocol','PROT'", "['D02','Study protocol (redacted)','PROT'")
app = must_replace(app, """button('doc','<span>'+safe(m.name)+'</span>','docname','data-d="'+m.id+'" title="Open the latest deliverable of this document"')""", """'<span class="docname plain">'+safe(m.name)+'</span>'""")
app = must_replace(app, """(k.type==='style'?'Download Word':'Download')""", """'Download'""")
app = app.replace("P().id+' · '+P().title", "''")
app = must_replace(app, "button('toggle',k.skip?'Restore':'Skip','btn sm','data-i=\"'+i+'\"')", "button('toggle',k.skip?'Resume':'Pause','btn sm','data-i=\"'+i+'\" title=\"'+(k.skip?'Run this step again for every document':'Temporarily stop running this step for every document')+'\"')")
app = must_replace(app, "(k.skip?'Skipped in this plan':safe(k.instruction))", "(k.skip?'Paused':safe(k.instruction))")
app = must_replace(app, "<p class=\"note\">Choose the sequence you agreed on in chat. Each step is a column across every output. Run a step again to replace its current deliverable. One previous version can be restored.</p>", "<p class=\"note\">The steps every document goes through, in order.</p>")
app = must_replace(app, "...active.map(()=>narrow?104:116)", "...active.map(()=>narrow?124:160)")
app = must_replace(app, "'Download plan files'", "'Download all'")
app = must_replace(app, "icon('download')+' Download ZIP'", "icon('download')+' Download'")
app = must_replace(app, "<p class=\"note\">Select owner-approved final documents for the package. Each step also has its own download.</p>", "<p class=\"note\">Approved final documents, as one ZIP file.</p>")
# Approved final document: no further actions
app = must_replace(app, """  foot='<div class="readerBottom"><span>'+safe(isLast?(released(P(),d)?""", """  const approvedHere=isLast&&released(P(),d);
  foot='<div class="readerBottom"><span>'+safe(isLast?(released(P(),d)?""")

app = must_replace(app, "allrows.length+' planned outputs · '+active.filter(s=>!s.skip).length+' agreed steps'", "allrows.length+' documents · '+active.filter(s=>!s.skip).length+' steps'")
app = app.replace("+' outputs'", "+' documents'")
app = must_replace(app, "function storeResult(w,obj){\n if(w.current)", "function storeResult(w,obj){\n obj.at??=new Date().toISOString();obj.by??=actor;obj.via??='Claude';\n if(w.current)")
app = must_replace(app, "skip:'m4 5 10 7-10 7zm13 0v14',", "skip:'m4 5 10 7-10 7zm13 0v14',rewind:'M11 18 3 12l8-6zM21 18l-8-6 8-6z',")
app = must_replace(app, """icon('clock')+' Versions ('+versions.length+')</button>'""", """icon('rewind')+' Versions ('+versions.length+')</button>'""")
app = must_replace(app, "d.approval={by:owner,key};refresh();", "d.approval={by:owner,key};d.lastApproved={rev:work(d,k).current.rev,at:now()};refresh();")
app = app.replace("(ready?'Approved':approvalKey(p,d)?'Awaiting approval':'Waiting')", "(ready?'Approved':d.lastApproved?'Approved v'+d.lastApproved.rev:approvalKey(p,d)?'Awaiting approval':'Waiting')")
app = app.replace("'<span class=\"finalstate '+(ready?'isready':'')+'\">'", "'<span class=\"finalstate '+(ready||d.lastApproved?'isready':'')+'\">'")

app = must_replace(app, """icon('rewind')+' Versions ('""", """icon('redo')+' Versions ('""")

# ---- Round 7: download the latest approved version; version next to status ----
app = must_replace(app, "return s&&released(P(),d)});", "return s&&!!approvedVersion(d)});")
app = must_replace(app, "safe(finalName(m,doc(m.id)))", "safe(approvedName(m,doc(m.id)))")
app = must_replace(app, "a=s&&work(d,s).current,include=!!a&&released(p,d)&&ids.includes(m.id),name=finalName(m,d);", "a=s&&approvedVersion(d),include=!!a&&ids.includes(m.id),name=a?fileName(m,s,a):finalName(m,d);")
app = must_replace(app, "'EX101_'+P().id+'_example_outputs.zip'", "(proj()?.code||'CTIS').replace(/[^A-Za-z0-9-]/g,'')+'_approved_documents.zip'")
app = must_replace(app, """button('cell','<span class="state '+st+'">'+l+'</span>','cellbutton',""", """button('cell','<span class="state '+st+'">'+l+(work(d,s).current&&st!=='waiting'?' <span class="vtag">v'+work(d,s).current.rev+'</span>':'')+'</span>','cellbutton',""")

app = must_replace(app, "ready=released(p,d),name=finalName(m,d);", "ready=released(p,d),name=approvedVersion(d)?approvedName(m,d):finalName(m,d);")

# ---- Round 6: reference package ----
app = must_replace(app, "const scopeName=c=>c==='EU'?'Part I':'Part II · '+cc[c];", "const scopeName=c=>c==='EU'?'Part I · '+part1Labels[planning().part1]:'Part II · '+cc[c]+(refPkg(c)?' · Reference package'+refLabel():'');")
app = must_replace(app, """'<span class="docname plain">'+safe(m.name)+'</span>'""", """'<span class="docname plain">'+safe(m.name)+'</span>'+refNote(m.id)""")
app = must_replace(app, """blocker?['Waiting for '+dcode(id,blocker),""", """st==='waiting'&&refOf(id)&&k.type==='draft'&&!refApproved(refOf(id))?['Waiting for '+refOf(id),'This document is adapted from '+refOf(id)+'. Its draft starts once '+refOf(id)+' is approved.']:blocker?['Waiting for '+dcode(id,blocker),""")
app = must_replace(app, """res.sources.length+' source'+(res.sources.length===1?'':'s')""", """(res.sources.length+projDocSources(id).length)+' source'+(res.sources.length+projDocSources(id).length===1?'':'s')""")
