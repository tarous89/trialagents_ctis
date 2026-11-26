// Claude host: the workspace is bundled into the MCP App view. Claude does not let the view call
// ctis.trialagents.com, so data travels through the app-only ctis_workspace_request tool on the same MCP connection.
// This module must be imported before main.js.
import {App} from '@modelcontextprotocol/ext-apps'
import {nav} from './nav.js'

export const appOrigin='https://ctis.trialagents.com'
const app=new App({name:'TrialAgents CTIS',version:'0.1.0'},{tools:{},availableDisplayModes:['inline','fullscreen']},{autoResize:false})
let target=null
const ready=app.connect().then(()=>{
  const d=app.getHostContext()?.containerDimensions
  if(!d?.height)void app.sendSizeChanged({height:Math.min(d?.maxHeight||760,760)}).catch(()=>{})
})

window.ctisHost={
  name:'Claude',
  ready,
  // The tool result that opened this view says where to start.
  initial:()=>target,
  async request(request){
    await ready
    const r=await app.callServerTool({name:'ctis_workspace_request',arguments:{request}})
    if(r.isError)throw Object.assign(new Error(r.content?.find(c=>c.type==='text')?.text||'TrialAgents CTIS request failed'),{status:r.structuredContent?.status,details:r.structuredContent?.details})
    return r.structuredContent?.result
  },
  async openLink(url){
    const u=new URL(url,appOrigin)
    if(!['https:','mailto:'].includes(u.protocol))throw new Error('Invalid link')
    const r=await app.openLink({url:u.href});if(r?.isError)throw new Error('The link could not be opened.')
  },
  async sendMessage(text){
    const r=await app.sendMessage({role:'user',content:[{type:'text',text}]});if(r?.isError)throw new Error('The message could not be sent.')
  },
  async download({name,mime,content_base64}){
    const r=await app.downloadFile({contents:[{type:'resource',resource:{uri:'file:///'+encodeURIComponent(name),mimeType:mime,blob:content_base64}}]})
    if(r?.isError)throw new Error('The download was cancelled.')
  }
}
app.ontoolresult=result=>{
  const next=result.structuredContent?.result
  if(!next?.view)return
  target={view:next.view,project:next.project??null,deliverable:next.deliverable??null}
  if(nav.state)void nav.go(target.view,{project:target.project,deliverable:target.deliverable})
}
app.onhostcontextchanged=ctx=>{const d=ctx?.containerDimensions;if(!d?.height&&ctx?.displayMode!=='fullscreen')void app.sendSizeChanged({height:Math.min(d?.maxHeight||760,760)}).catch(()=>{})}
app.onteardown=async()=>({})
