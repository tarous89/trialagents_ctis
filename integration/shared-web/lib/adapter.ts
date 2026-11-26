// TrialAgents CTIS inside the shared web service: one store for the browser app, the MCP endpoint and Stripe.
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {getSql} from '@/db';
import {stripeRequest,stripeMode} from '@/app/lib/stripe';
import {authenticatedUser} from '@/app/lib/auth';
import {introspectAccessToken} from '@/app/lib/oauth-server';
import {ctisResource,oauthIssuer,OAUTH_SCOPE} from '@/app/lib/oauth-config';
import {ctis} from './app/server/store.mjs';
import {ctisApi} from './app/server/api.mjs';
import {stripeBilling} from './app/server/billing.mjs';
import {ctisHttp,protectedResource} from './mcp/http.mjs';

type Query=(s:string,p?:unknown[])=>Promise<unknown[]>;
export const db={transaction:async <T>(fn:(q:Query)=>Promise<T>)=>getSql().begin(async t=>fn((s,p)=>t.unsafe(s,(p??[]) as never[]) as Promise<unknown[]>)) as Promise<T>};
const billing=stripeBilling({stripeRequest,stripeMode,priceId:(mode:string)=>(mode==='test'?process.env.CTIS_TEAM_PRICE_TEST:process.env.CTIS_TEAM_PRICE_LIVE)||null});
export const runCtis=ctis(db,{billing});
export const ctisWebhook=(event:unknown)=>billing.webhook(db,event);

// Browser: the TrialAgents session cookie on ctis.trialagents.com.
export const ctisBrowserApi=ctisApi({run:runCtis,currentUser:(request:Request)=>authenticatedUser(request as never),origin:'https://ctis.trialagents.com'});

// Claude: an access token issued for the CTIS resource, with the MCP scope.
async function authorize(token:string,audience:string){
  const info=await introspectAccessToken(token);
  if(!info.active||!info.sub||!String(info.scope).split(' ').includes(OAUTH_SCOPE)||info.resource!==audience)return null;
  const [row]=await getSql()`SELECT id,email,first_name AS "firstName",last_name AS "lastName" FROM users WHERE id=${info.sub}`;
  return row??null;
}
const widget=()=>readFile(path.join(process.cwd(),'public/ctis-assets/ctis-claude.html'),'utf8');
export const ctisClaudeMcp=ctisHttp({authorize,run:runCtis,readWidget:widget,audience:ctisResource()});
export const ctisClaudeResourceMetadata=()=>protectedResource(oauthIssuer(),ctisResource());
