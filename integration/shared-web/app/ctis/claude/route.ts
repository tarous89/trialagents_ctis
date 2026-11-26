// MCP endpoint for Claude: https://mcp.trialagents.com/ctis/claude, forwarded here by the MCP service.
// Sits next to the public CTIS guide pages (app/ctis/route.ts, app/ctis/[country]/[language]): the fixed folder name wins.
import {ctisClaudeMcp} from '@/app/lib/ctis/adapter';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const off=()=>new Response(null,{status:404});
const handle=(request:Request)=>process.env.CTIS_MCP_ENABLED!=='false'?ctisClaudeMcp(request):off();
export const GET=handle,POST=handle,DELETE=handle;
