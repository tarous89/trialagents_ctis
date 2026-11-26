// Streamable HTTP MCP endpoint, as in Pipeline: one handler per assistant audience, the same tools and store.
import {Server,createMcpHandler} from '@modelcontextprotocol/server'
import {toolList,invoke,invokeWorkspaceRequest,instructions,origin,claudeWidgetUri,workspaceRequestTool} from './tools.mjs'

export const claudeResource='https://mcp.trialagents.com/ctis/claude'
export const chatgptResource='https://mcp.trialagents.com/ctis/chatgpt'
const mime='text/html;profile=mcp-app'
// Claude shows the bundled workspace and frames nothing, so it declares no connect or frame origins.
const widgetMeta={ui:{domain:origin,csp:{connectDomains:[],resourceDomains:[]}}}
const assistantFor=audience=>new URL(audience).pathname==='/ctis/chatgpt'?'ChatGPT':'Claude'
export const metadataPath=audience=>'/.well-known/oauth-protected-resource'+new URL(audience).pathname

export function protectedResource(issuer='https://intel.trialagents.com/oauth/intel',audience=claudeResource){
  return Response.json({
    resource:audience,authorization_servers:[issuer],scopes_supported:['mcp:tools'],bearer_methods_supported:['header'],
    resource_documentation:origin+'/ctis-info/connectors',resource_policy_uri:origin+'/ctis-info/privacy',resource_tos_uri:origin+'/ctis-info/terms'
  },{headers:{'Cache-Control':'no-store'}})
}

// authorize(token, audience) -> user {id, email, firstName, lastName} or null
// run(user, request, source) -> the store's execute; readWidget() -> the bundled workspace (dist/ctis-claude.html)
export function ctisHttp({authorize,run,readWidget,audience=claudeResource,version='0.1.0'}){
  const assistant=assistantFor(audience)
  return async request=>{
    if(new URL(request.url).pathname!==new URL(audience).pathname)return new Response(null,{status:404})
    const token=/^Bearer (\S+)$/i.exec(request.headers.get('authorization')??'')?.[1]
    let user
    try{if(token)user=await authorize(token,audience)}catch{return Response.json({error:'Authorization temporarily unavailable'},{status:503})}
    if(!user)return Response.json({error:'Connect TrialAgents CTIS'},{status:401,headers:{
      'WWW-Authenticate':'Bearer resource_metadata="'+new URL(metadataPath(audience),audience).href+'", scope="mcp:tools"','Cache-Control':'no-store'}})
    const handler=createMcpHandler(()=>{
      const server=new Server({name:'TrialAgents CTIS',version},{capabilities:{tools:{},resources:{}},instructions})
      server.setRequestHandler('tools/list',()=>({tools:toolList}))
      server.setRequestHandler('tools/call',({params})=>params.name===workspaceRequestTool
        ?invokeWorkspaceRequest(params.arguments,r=>run(user,r,assistant+' workspace'))
        :invoke(params.name,params.arguments,r=>run(user,r,assistant)))
      server.setRequestHandler('resources/list',()=>({resources:[{uri:claudeWidgetUri,name:'TrialAgents CTIS workspace',mimeType:mime,_meta:widgetMeta}]}))
      server.setRequestHandler('resources/read',async({params})=>{
        if(params.uri!==claudeWidgetUri||!readWidget)throw new Error('Unknown TrialAgents CTIS resource')
        return {contents:[{uri:claudeWidgetUri,mimeType:mime,text:await readWidget(),_meta:widgetMeta}]}
      })
      return server
    },{legacy:'stateless',maxRequestBodySize:12_000_000}) // uploads from the workspace view: up to 8 MB files
    const response=await handler.fetch(request)
    response.headers.set('Cache-Control','private, no-store')
    return response
  }
}
