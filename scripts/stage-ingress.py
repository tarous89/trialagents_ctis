"""Install the CTIS routes into a disposable shared MCP build checkout (tarous89/intel_mcp).

python3 scripts/stage-ingress.py /path/to/intel_mcp

It wraps whatever app bootstrap.py builds, so it works before or after Pipeline's own stage-ingress.py:
Pipeline replaces the `app = server.build_app()` line; this adds a separate line after it.
"""
from pathlib import Path
from shutil import copyfile
import re
import sys

root = Path(__file__).resolve().parents[1]
package = Path(sys.argv[1]).resolve() / "src" / "intel_mcp"
bootstrap = package / "bootstrap.py"
source = bootstrap.read_text()
staged = "\nfrom .ctis_ingress import CtisIngress\napp = CtisIngress(app)\n"
copyfile(root / "integration/shared-mcp/ctis_ingress.py", package / "ctis_ingress.py")
if staged not in source:
    # The module-level line that builds the app: `app = server.build_app()`, or Pipeline's wrapped form.
    builds = list(re.finditer(r"^app = .*server\.build_app\(\).*\n", source, re.M))
    if len(builds) != 1:
        raise SystemExit("Incompatible shared MCP entrypoint")
    end = builds[0].end()
    bootstrap.write_text(source[:end] + staged.lstrip("\n") + source[end:])
