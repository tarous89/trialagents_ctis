// The CTIS wording is swapped into the shared consent page (app/oauth/authorize/route.ts). Fixtures as in oauth-journey.test.mjs.
import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {build} from 'esbuild';

test('TrialAgents CTIS consent names CTIS, and the research wording is unchanged', async t => {
 const dir=await mkdtemp(join(tmpdir(),'ctis-consent-'));
 t.after(async()=>{await rm(dir,{recursive:true,force:true});delete globalThis.oauthFixture;});
 const params=new URLSearchParams({response_type:'code',client_id:'client',redirect_uri:'https://client.invalid/callback',scope:'mcp:tools',state:'state',code_challenge:'a'.repeat(43),code_challenge_method:'S256',resource:'https://mcp.trialagents.com/mcp'});
 const f=globalThis.oauthFixture={user:{id:'owner',email:'owner@synthetic.invalid'},record:null,codes:[],cleared:false};
 const modules={
 '@/app/lib/pipeline/adapter':`export const runPipeline=async()=>{}`,
 '@/app/lib/oauth-connections':`export const hasChatGPTConnection=async()=>globalThis.oauthFixture.connected===true;export const hasClaudeConnection=async()=>globalThis.oauthFixture.claudeConnected===true;`,
 'next/server':`export const NextResponse={redirect:(url,status=307)=>new Response(null,{status,headers:{location:String(url)}})};`,
 '@/app/lib/auth':`export const authenticatedUser=async()=>globalThis.oauthFixture.user; export const opaqueToken=()=>crypto.randomUUID();export const hashToken=x=>'hash-'+x;export const deleteRequestSession=async()=>{globalThis.oauthFixture.user=null};export const clearSessionCookie=()=>{globalThis.oauthFixture.cleared=true};`,
 '@/app/lib/oauth-config':`export const oauthIssuer=()=> 'https://intel.trialagents.com';export const pipelineResource=(claude=false)=> 'https://mcp.trialagents.com/'+(claude?'pipeline-claude':'pipeline')+'/mcp';export const oauthClaudeResource=()=> 'https://mcp.trialagents.com/claude/mcp';`,
 '@/app/lib/oauth-account-lock':`export const lockResearchOAuthAccount=async()=>{};`,
 '@/app/lib/oauth-server':`export const registeredClient=async()=>({clientName:'ChatGPT',redirectUris:globalThis.oauthFixture.redirectUris||['https://client.invalid/callback']});`,
 '@/app/lib/oauth-validation':`export const validAuthorizationRequest=p=>({clientId:p.get('client_id'),redirectUri:p.get('redirect_uri'),state:p.get('state'),codeChallenge:p.get('code_challenge'),resource:p.get('resource'),scope:p.get('scope')});`,
 'drizzle-orm':`export const eq=(a,b)=>b;export const sql=()=>null;`,
 '@/db/schema':`export const oauthAuthorizationRequests={kind:'request',id:'id'};export const oauthAuthorizationCodes={kind:'code'};`,
 '@/app/lib/ctis-resource':`export const ctisResource=()=> 'https://mcp.trialagents.com/ctis/claude';`,
 '@/db':`const f=()=>globalThis.oauthFixture;const db={execute:async()=>{},select:()=>({from:()=>({where:id=>({limit:async()=>f().record?.id===id?[f().record]:[]})})}),insert:table=>({values:async v=>{if(table.kind==='request')f().record=v;else f().codes.push(v)}}),delete:()=>({where:async()=>{f().record=null}}),transaction:async fn=>fn(db)};export const getDb=()=>db;`
 };
 await build({stdin:{contents:"export * from './app/lib/oauth-return.ts'; export * from './app/oauth/authorize/route.ts';",resolveDir:process.cwd()},bundle:true,platform:'node',format:'esm',outfile:join(dir,'api.mjs'),plugins:[{name:'fixtures',setup(b){b.onResolve({filter:/.*/},a=>modules[a.path]?{path:a.path,namespace:'fixture'}:null);b.onLoad({filter:/.*/,namespace:'fixture'},a=>({contents:modules[a.path],loader:'ts'}));}}]});
 const api=await import(pathToFileURL(join(dir,'api.mjs')));
 const consent=async resource=>{const url=new URL('https://intel.trialagents.com/oauth/authorize?'+params);url.searchParams.set('resource',resource);return (await api.GET({nextUrl:url})).text()};
 const ctis=await consent('https://mcp.trialagents.com/ctis/claude');
 assert.match(ctis,/Plan, draft and check your TrialAgents CTIS projects/);
 assert.match(ctis,/to read and save TrialAgents CTIS projects within your access\./);
 assert.doesNotMatch(ctis,/search results|save research/);
 const research=await consent('https://mcp.trialagents.com/mcp');
 assert.match(research,/Save your search results, projects and custom views for later use in TrialAgents\./);
 assert.match(research,/access and save research in this account/);
 assert.doesNotMatch(research,/CTIS/);
});
