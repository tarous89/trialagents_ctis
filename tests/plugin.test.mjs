// The Claude plugin: manifest, connection, skill, icon, marketplace, and the directory archive.
import {test} from 'node:test'
import assert from 'node:assert/strict'
import {readFile,mkdtemp,rm} from 'node:fs/promises'
import {execFileSync} from 'node:child_process'
import {tmpdir} from 'node:os'
import path from 'node:path'
import JSZip from 'jszip'
import {frontMatter} from '../app/server/catalog.mjs'
import {toolList} from '../mcp/tools.mjs'

const root=new URL('../',import.meta.url),read=p=>readFile(new URL(p,root))
const json=async p=>JSON.parse(await read(p))

test('plugin manifest, connection and marketplace agree',async()=>{
  const plugin=await json('plugins/claude/.claude-plugin/plugin.json'),market=await json('.claude-plugin/marketplace.json')
  assert.equal(plugin.name,'trialagents-ctis');assert.equal(market.plugins[0].name,plugin.name);assert.equal(market.plugins[0].version,plugin.version)
  assert.equal(market.plugins[0].source,'./plugins/claude')
  for(const k of ['homepage','privacyPolicyUrl','termsOfServiceUrl','supportUrl','documentationUrl'])assert.match(plugin[k],/^https:\/\/ctis\.trialagents\.com\/ctis-info\/(about|privacy|terms|support|connectors)$/,k)
  assert.deepEqual((await json('plugins/claude/.mcp.json')).mcpServers,{'trialagents-ctis':{type:'http',url:'https://mcp.trialagents.com/ctis/claude'}})
  assert.ok((await read(plugin.icon.replace(/^/,'plugins/claude/'))).subarray(0,8).equals(Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a])))
})

test('the one skill names only tools the server has',async()=>{
  const {header,body}=frontMatter((await read('plugins/claude/skills/ctis/SKILL.md')).toString())
  assert.equal(header.name,'ctis');assert.ok(header.description.length<=1024)
  const named=[...body.matchAll(/`([a-z_]+_ctis[a-z_]*|[a-z]+_ctis)`/g)].map(m=>m[1])
  const tools=new Set(toolList.filter(t=>!t._meta.ui?.visibility?.includes('app')).map(t=>t.name))
  assert.ok(named.length>=4);for(const n of named)assert.ok(tools.has(n),n+' is not a tool')
})

test('the directory archive holds exactly the plugin',async()=>{
  const out=await mkdtemp(path.join(tmpdir(),'ctis-plugin-'))
  try{
    const file=execFileSync('python3',[new URL('scripts/package-plugins.py',root).pathname,'--output',out]).toString().trim()
    const zip=await JSZip.loadAsync(await readFile(file))
    assert.deepEqual(Object.keys(zip.files).filter(n=>!zip.files[n].dir).sort(),['.claude-plugin/icon.png','.claude-plugin/plugin.json','.mcp.json','README.md','skills/ctis/SKILL.md'])
  }finally{await rm(out,{recursive:true,force:true})}
})
