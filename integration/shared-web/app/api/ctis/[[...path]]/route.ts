// The TrialAgents CTIS browser API: /api/ctis (operations), /api/ctis/download, /api/ctis/source, /api/ctis/export.
import {ctisBrowserApi} from '@/app/lib/ctis/adapter';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const off=()=>Response.json({error:'TrialAgents CTIS is unavailable'},{status:404});
export async function GET(request:Request){return process.env.CTIS_ENABLED!=='false'?ctisBrowserApi(request):off()}
export async function POST(request:Request){return process.env.CTIS_ENABLED!=='false'?ctisBrowserApi(request):off()}
