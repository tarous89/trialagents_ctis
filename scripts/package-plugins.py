"""Build the Claude directory archive (only on an explicit release request). ChatGPT follows later."""
from pathlib import Path
import argparse
import json
import zipfile

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--output", type=Path, default=ROOT / "dist")
args = parser.parse_args()
args.output.mkdir(parents=True, exist_ok=True)

base = ROOT / "plugins" / "claude"
payload = {p.relative_to(base).as_posix(): p.read_bytes() for p in base.rglob("*") if p.is_file() and not p.is_symlink()}
manifest = json.loads(payload[".claude-plugin/plugin.json"])
server = json.loads(payload[".mcp.json"])["mcpServers"]["trialagents-ctis"]
assert server == {"type": "http", "url": "https://mcp.trialagents.com/ctis/claude"}, server
assert "skills/ctis/SKILL.md" in payload
assert payload[manifest["icon"]] == (ROOT / "assets" / "claude-mark.png").read_bytes()
assert payload[manifest["icon"]].startswith(b"\x89PNG\r\n\x1a\n")
listing = json.loads((ROOT / ".claude-plugin" / "marketplace.json").read_bytes())
assert listing["plugins"][0]["version"] == manifest["version"], "marketplace.json and plugin.json versions differ"
destination = args.output / f"trialagents-ctis-claude-{manifest['version']}.zip"
with zipfile.ZipFile(destination, "w") as archive:
    for name, content in sorted(payload.items()):
        item = zipfile.ZipInfo(name, (2026, 11, 26, 0, 0, 0))
        item.external_attr = 0o100644 << 16
        archive.writestr(item, content, compress_type=zipfile.ZIP_DEFLATED)
with zipfile.ZipFile(destination) as archive:
    assert archive.testzip() is None
print(destination)
