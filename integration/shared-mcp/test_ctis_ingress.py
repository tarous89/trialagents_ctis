"""python -m pytest integration/shared-mcp, in an environment with the shared MCP's dependencies (httpx, starlette)."""
import asyncio
import shutil
import subprocess
import sys
from pathlib import Path

import httpx
from starlette.applications import Starlette
from starlette.responses import PlainTextResponse
from starlette.routing import Route

sys.path.insert(0, str(Path(__file__).parent))
from ctis_ingress import CtisIngress  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
seen = []


def upstream(request: httpx.Request) -> httpx.Response:
    seen.append(request)
    if request.url.path.startswith("/.well-known/"):
        return httpx.Response(200, headers={"content-type": "application/json"},
                              stream=httpx.ByteStream(b'{"resource": "https://mcp.trialagents.com/ctis/claude"}'))
    if "authorization" not in request.headers:
        return httpx.Response(401, headers={"www-authenticate": 'Bearer resource_metadata="x"', "set-cookie": "a=b"}, stream=httpx.ByteStream(b""))
    return httpx.Response(200, headers={"content-type": "text/event-stream", "x-internal": "1"}, stream=httpx.ByteStream(b"data: {}\n\n"))


shared = Starlette(routes=[Route("/mcp", lambda r: PlainTextResponse("shared"), methods=["POST"])])


def call(method, path, **kw):
    async def go():
        app = CtisIngress(shared, transport=httpx.MockTransport(upstream))
        async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="https://mcp.trialagents.com") as c:
            return await c.request(method, path, **kw)
    return asyncio.run(go())


def test_forwards_the_exact_ctis_paths_only():
    seen.clear()
    assert call("POST", "/mcp").text == "shared"
    assert call("POST", "/ctis/claude/extra").status_code == 404
    assert not seen
    meta = call("GET", "/.well-known/oauth-protected-resource/ctis/claude")
    assert meta.json()["resource"].endswith("/ctis/claude")
    assert str(seen[-1].url) == "http://intel-agent-app:10000/.well-known/oauth-protected-resource/ctis/claude"


def test_passes_auth_and_mcp_headers_and_drops_the_rest():
    seen.clear()
    r = call("POST", "/ctis/claude", content=b'{"jsonrpc":"2.0"}', headers={
        "authorization": "Bearer t", "mcp-protocol-version": "2025-11-25", "cookie": "s=1", "x-forwarded-for": "1.2.3.4",
        "content-type": "application/json"})
    assert r.status_code == 200 and r.text == "data: {}\n\n" and "x-internal" not in r.headers
    sent = seen[-1].headers
    assert sent["authorization"] == "Bearer t" and sent["mcp-protocol-version"] == "2025-11-25"
    assert "cookie" not in sent and "x-forwarded-for" not in sent and seen[-1].content == b'{"jsonrpc":"2.0"}'
    r = call("POST", "/ctis/claude", content=b"{}")
    assert r.status_code == 401 and "www-authenticate" in r.headers and "set-cookie" not in r.headers


def test_methods_size_and_upstream_errors():
    assert call("PUT", "/ctis/claude").status_code == 405
    assert call("POST", "/.well-known/oauth-protected-resource/ctis/claude").status_code == 405
    assert call("POST", "/ctis/claude", content=b"x" * 12_000_001).status_code == 413
    assert call("POST", "/ctis/claude", content=b"x" * 9_000_000, headers={"authorization": "Bearer t"}).status_code == 200

    def down(request):
        raise httpx.ConnectError("down")

    async def go():
        app = CtisIngress(shared, transport=httpx.MockTransport(down))
        async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="https://x") as c:
            return await c.post("/ctis/claude")
    assert asyncio.run(go()).status_code == 502


BASELINE = "import x\n\napp = server.build_app()\n\n\ndef main() -> None:\n    pass\n"


def stage(tmp_path, source, script):
    package = tmp_path / "src" / "intel_mcp"
    package.mkdir(parents=True, exist_ok=True)
    (package / "bootstrap.py").write_text(source)
    subprocess.run([sys.executable, str(script), str(tmp_path)], check=True)
    return (package / "bootstrap.py").read_text()


def test_stage_is_idempotent_and_composes_with_pipeline(tmp_path):
    ctis = ROOT / "scripts/stage-ingress.py"
    once = stage(tmp_path, BASELINE, ctis)
    assert once.index("app = server.build_app()") < once.index("app = CtisIngress(app)") < once.index("def main")
    assert stage(tmp_path, once, ctis) == once
    assert (tmp_path / "src/intel_mcp/ctis_ingress.py").exists()
    # Pipeline staged first: its wrapped line is kept and CTIS wraps it.
    piped = BASELINE.replace("\napp = server.build_app()\n", "\nfrom .pipeline_ingress import PipelineIngress\napp = PipelineIngress(server.build_app())\n")
    both = stage(tmp_path, piped, ctis)
    assert "app = PipelineIngress(server.build_app())\nfrom .ctis_ingress import CtisIngress\napp = CtisIngress(app)\n" in both
    pipeline = Path("/home/user/tarous89/trialagents_pipeline/scripts/stage-ingress.py")
    if pipeline.exists():  # Pipeline staged after CTIS still finds its one baseline line.
        package = tmp_path / "src/intel_mcp"
        shutil.copy(pipeline, tmp_path / "pipeline-stage.py")
        (tmp_path / "integration/shared-mcp").mkdir(parents=True, exist_ok=True)
        (tmp_path / "integration/shared-mcp/pipeline_ingress.py").write_text("")
        (tmp_path / "scripts").mkdir(exist_ok=True)
        shutil.copy(pipeline, tmp_path / "scripts/stage-ingress.py")
        after = stage(tmp_path, once, tmp_path / "scripts/stage-ingress.py")
        assert "app = PipelineIngress(server.build_app())\nfrom .ctis_ingress import CtisIngress\napp = CtisIngress(app)\n" in after
        assert (package / "pipeline_ingress.py").exists()
