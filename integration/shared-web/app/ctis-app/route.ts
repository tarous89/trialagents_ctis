// ctis.trialagents.com/ (rewritten here by proxy.ts): the TrialAgents CTIS browser app.
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {authenticatedUser} from '@/app/lib/auth';
export const runtime='nodejs';
export const dynamic='force-dynamic';
// The app's API accepts requests from ctis.trialagents.com only (as Pipeline's from pipeline.trialagents.com), so on
// any other host of the shared service, open it there instead of showing a page whose every request is refused.
const local=(host:string)=>/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host);
export async function GET(request:Request){
  if(process.env.CTIS_ENABLED==='false')return new Response('Unavailable',{status:404});
  const host=(request.headers.get('x-forwarded-host')?.split(',')[0]??request.headers.get('host')??'').trim().toLowerCase();
  if(host!=='ctis.trialagents.com'&&!local(host)){const to=new URL('https://ctis.trialagents.com/');to.search=new URL(request.url).search;return Response.redirect(to,308);}
  // Signed out: straight to the TrialAgents CTIS sign-in page, which returns to the app afterwards.
  if(!await authenticatedUser(request as never))return new Response(null,{status:307,headers:{Location:'/auth?mode=login&ctis=1','Cache-Control':'no-store'}});
  const html=await readFile(path.join(process.cwd(),'public/ctis-assets/ctis.html'),'utf8');
  return new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'private, no-store',
    'Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; frame-src 'self'; object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'self'",
    'Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff'}});
}
