// The browser app's API (ctis.trialagents.com/api/ctis). The shared web service supplies the signed-in user.
import JSZip from 'jszip'

const json=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer'}})
const safeName=s=>String(s).replace(/[^A-Za-z0-9_.-]+/g,'_').slice(0,180)
const download=(buffer,name,type)=>new Response(buffer,{headers:{'Content-Type':type,'Content-Disposition':'attachment; filename="'+safeName(name)+'"','Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}})

// run(user, request, source): the store's execute. currentUser(request): the signed-in user or null.
// origin: requests from another site are refused (the session cookie must not be usable cross-site).
export function ctisApi({run,currentUser,origin='https://ctis.trialagents.com',source='web'}){
  const fail=e=>{const status=e.status??500;return json({error:status<500?e.message:'Something went wrong. Try again.',details:e.details},status)}
  return async request=>{
    const url=new URL(request.url)
    if(!url.pathname.startsWith('/api/ctis'))return new Response(null,{status:404})
    const from=request.headers.get('origin')
    if(from&&from!==origin)return json({error:'Unexpected origin'},403)
    const user=await currentUser(request)
    if(!user)return json({error:'Sign in to TrialAgents CTIS'},401)
    try{
      if(request.method==='POST'&&url.pathname==='/api/ctis'){
        if(!(request.headers.get('content-type')??'').startsWith('application/json'))return json({error:'Send JSON'},415)
        const body=await request.json()
        return json(await run(user,{op:body.op,project:body.project,input:body.input??{},requestId:body.requestId,revision:body.revision},source))
      }
      if(request.method!=='GET')return json({error:'Not found'},404)
      const p=url.searchParams
      if(url.pathname==='/api/ctis/download'){
        const f=await run(user,{op:'version.file',project:p.get('project'),input:{deliverable:p.get('deliverable'),...(p.get('n')?{n:Number(p.get('n'))}:{})}},source)
        return download(Buffer.from(f.content_base64,'base64'),f.name,f.mime)
      }
      if(url.pathname==='/api/ctis/source'){
        const f=await run(user,{op:'resource.file',input:{id:p.get('id')}},source)
        return download(Buffer.from(f.content_base64,'base64'),f.name,f.mime)
      }
      if(url.pathname==='/api/ctis/export'){
        const pkg=await run(user,{op:'export.package',project:p.get('project'),input:{}},source)
        const zip=new JSZip()
        for(const f of pkg.files)zip.file(f.name,Buffer.from(f.content_base64,'base64'))
        zip.file('manifest.json',JSON.stringify(pkg.manifest,null,2))
        return download(await zip.generateAsync({type:'nodebuffer',compression:'DEFLATE'}),pkg.project+'_approved_documents.zip','application/zip')
      }
      return json({error:'Not found'},404)
    }catch(e){return fail(e)}
  }
}
