// OAuth protected resource metadata for the CTIS Claude endpoint (RFC 9728).
import {ctisClaudeResourceMetadata} from '@/app/lib/ctis/adapter';
export const runtime='nodejs';
export async function GET(){return process.env.CTIS_MCP_ENABLED==='true'?ctisClaudeResourceMetadata():new Response(null,{status:404})}
