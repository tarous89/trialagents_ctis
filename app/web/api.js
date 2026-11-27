// Calls to /api/ctis. Every change carries a new request ID, so a retry never saves twice.
export class ApiError extends Error{constructor(message,status,details){super(message);this.status=status;this.details=details}}
const uuid=()=>crypto.randomUUID?.()??'10000000-1000-4000-8000-100000000000'.replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15>>c/4).toString(16))

export async function call(op,{project,input={},revision,write=false}={}){
  // Inside an assistant the workspace has no direct line to the app: requests travel through the host (see host-claude.js).
  if(window.ctisHost?.request)return window.ctisHost.request({op,project,input,revision,requestId:write?uuid():undefined})
  const res=await fetch('/api/ctis',{method:'POST',credentials:'same-origin',headers:{'content-type':'application/json'},
    body:JSON.stringify({op,project,input,revision,requestId:write?uuid():undefined})})
  const body=await res.json().catch(()=>({error:'The server did not answer. Try again.'}))
  // Signed out, or the session ended while the app was open: go to the TrialAgents CTIS sign-in page.
  if(res.status===401){location.replace('/auth?mode=login&ctis=1');await new Promise(()=>{})}
  if(!res.ok)throw new ApiError(body.error||'Something went wrong',res.status,body.details)
  return body
}
export const write=(op,opts={})=>call(op,{...opts,write:true})
export const downloadUrl=(project,deliverable,n)=>'/api/ctis/download?project='+encodeURIComponent(project)+'&deliverable='+encodeURIComponent(deliverable)+(n?'&n='+n:'')
export const exportUrl=project=>'/api/ctis/export?project='+encodeURIComponent(project)
export const sourceUrl=id=>'/api/ctis/source?id='+encodeURIComponent(id)
export const fileToBase64=file=>new Promise((ok,fail)=>{const r=new FileReader();r.onload=()=>ok(String(r.result).split(',')[1]);r.onerror=()=>fail(r.error);r.readAsDataURL(file)})
