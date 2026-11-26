// Shared helpers for the TrialAgents CTIS UI.
import {symbols,railIcons,sectionIcons} from './icons.js'

export const host=process.env.CTIS_HOST||'browser'
export const E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
export const $=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)]
export const icon=k=>'<svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="'+(symbols[k]??'')+'"/></svg>'
export const railIcon=k=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+railIcons[k]+'"/></svg>'
export const sectionIcon=k=>'<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="'+(sectionIcons[k]??sectionIcons.Personal)+'"/></svg>'

export const memberStates={AT:'Austria',BE:'Belgium',BG:'Bulgaria',HR:'Croatia',CY:'Cyprus',CZ:'Czechia',DK:'Denmark',EE:'Estonia',FI:'Finland',FR:'France',DE:'Germany',GR:'Greece',HU:'Hungary',IS:'Iceland',IE:'Ireland',IT:'Italy',LV:'Latvia',LI:'Liechtenstein',LT:'Lithuania',LU:'Luxembourg',MT:'Malta',NL:'Netherlands',NO:'Norway',PL:'Poland',PT:'Portugal',RO:'Romania',SK:'Slovakia',SI:'Slovenia',ES:'Spain',SE:'Sweden'}
export const countryName=c=>c==='EU'?'Shared':memberStates[c]??c
export const languages={bg:'Bulgarian',cs:'Czech',da:'Danish',de:'German',el:'Greek',en:'English',es:'Spanish',et:'Estonian',fi:'Finnish',fr:'French',ga:'Irish',hr:'Croatian',hu:'Hungarian',is:'Icelandic',it:'Italian',lt:'Lithuanian',lv:'Latvian',mt:'Maltese',nl:'Dutch',no:'Norwegian',pl:'Polish',pt:'Portuguese',ro:'Romanian',sk:'Slovak',sl:'Slovenian',sv:'Swedish'}
export const languageName=l=>languages[l]??l
export const ctry=c=>'<span class="ctry" title="'+E(countryName(c))+'">'+E(c)+'</span>'
export const fmtDate=d=>{if(!d)return '—';const x=new Date(d);return isNaN(x)?E(d):x.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}
export const fmtTime=d=>{if(!d)return '—';const x=new Date(d);return isNaN(x)?E(d):x.toLocaleString('en-GB',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}
export const fmtSize=n=>n>=1048576?(n/1048576).toFixed(1)+' MB':Math.max(1,Math.round(n/1024))+' KB'
export const initials=n=>String(n||'?').split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0].toUpperCase()).join('')
export const plural=(n,one,many=one+'s')=>n+' '+(n===1?one:many)

export const statusLabel={done:'Done',action_required:'Action required',waiting:'Waiting',not_applicable:'Not applicable'}
export const statusClass={done:'done',action_required:'action',waiting:'waiting',not_applicable:'na'}
export const finalLabel={approved:'Approved',awaiting_approval:'Awaiting approval',waiting:'Waiting'}
export const categories={
  missing:{label:'Missing data',who:'AI',icon:'fileGap',color:'#925900',bg:'#fff1cf',description:'Information or source evidence is missing.'},
  conflict:{label:'Conflicting information',who:'AI',icon:'conflict',color:'#aa3643',bg:'#ffe7e9',description:'The wording and its source, or two documents, disagree.'},
  decision:{label:'Decision needed',who:'AI',icon:'decision',color:'#7141a0',bg:'#f0e8ff',description:'A person needs to choose or confirm an option.'},
  comment:{label:'Open comment',who:'Team',icon:'message',color:'#285e99',bg:'#e6f0ff',description:'An owner or reviewer has opened a conversation.'},
  changed:{label:'Source changed',who:'System',icon:'redo',color:'#526276',bg:'#e9edf3',description:'A referenced version changed after this step ran.'}
}
export const tone=k=>'--tone:'+categories[k].color+';--tint:'+categories[k].bg

// Actions that only an assistant can do are disabled in the browser and say where to do them.
export const ONLY_ASSISTANT='Available in Claude or ChatGPT'
export const assistantOnly=()=>host==='browser'?' disabled aria-disabled="true" title="'+ONLY_ASSISTANT+'" data-only-assistant':''

let toastTimer
export function toast(text){
  const t=$('#toast');clearTimeout(toastTimer);t.textContent=text;t.hidden=false
  toastTimer=setTimeout(()=>{t.hidden=true},4200)
}
export function modal(html,{drawer=false,onClose}={}){
  const o=$('#overlay');o.classList.toggle('drawer',drawer);$('#dialog-content').innerHTML=html
  // Switching views inside an open dialog keeps its close handler unless a new one is given.
  if(onClose||!o.open)o.onclose=()=>{$('#dialog-content').innerHTML='';onClose?.()}
  if(!o.open)o.showModal()
}
export const closeModal=()=>{const o=$('#overlay');if(o.open)o.close()}
export function drawer(html){const d=$('#drawer');d.innerHTML=html;if(!d.open)d.showModal()}
export const closeDrawer=()=>{const d=$('#drawer');if(d.open)d.close()}
export const field=(label,input,hint='')=>'<label class="field">'+label+input+(hint?'<small class="hint">'+hint+'</small>':'')+'</label>'
export const options=(list,value)=>list.map(x=>{const [v,l]=Array.isArray(x)?x:[x,x];return '<option value="'+E(v)+'"'+(String(v)===String(value??'')?' selected':'')+'>'+E(l)+'</option>'}).join('')
export const formData=form=>Object.fromEntries([...new FormData(form)].map(([k,v])=>[k,typeof v==='string'?v.trim():v]))

// Inline marks used in content: **bold**, *italic*, __underline__, [[missing information]].
export function inline(text){
  return E(text).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/__([^_]+)__/g,'<u>$1</u>')
    .replace(/\[\[([^\]]+)\]\]/g,'<mark class="missingInfo" title="Missing information">[$1]</mark>').replace(/(^|[^*])\*([^*\s][^*]*)\*/g,'$1<em>$2</em>')
}
export const plainText=text=>String(text??'').replace(/\*\*|__|\[\[|\]\]/g,'')

// Inside an assistant, actions only it can do are sent to the chat as a message.
export async function askAssistant(text){
  try{await window.ctisHost.sendMessage(text);toast('Sent to '+window.ctisHost.name)}
  catch{modal('<div class="modalhead"><div><h2 id="overlaytitle">Copy this message to '+window.ctisHost.name+'</h2></div><button type="button" class="iconbtn" data-close aria-label="Close">'+icon('close')+'</button></div><div class="modalbody pad"><p>The message could not be sent from the workspace.</p><textarea readonly rows="3" style="width:100%">'+E(text)+'</textarea></div>')}
}
