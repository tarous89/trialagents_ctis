# TrialAgents CTIS

TrialAgents CTIS helps regulatory teams prepare CTIS clinical trial applications with Claude or ChatGPT. The assistant plans, drafts and checks the documents; TrialAgents keeps the plan, records the sources and templates behind every version, handles review and sharing, and holds the approved files.

## Contents

| Path | What it is |
|---|---|
| [docs/FEATURES.md](docs/FEATURES.md) | Plain-English feature list: what the product does and how people use it. |
| [docs/TECHNICAL.md](docs/TECHNICAL.md) | Technical design: data model, statuses, sharing and permissions, hosting, UI rules. |
| [docs/MCP.md](docs/MCP.md) | MCP server and Claude plugin: tools and permissions, the assistant loop, Source QC, revision, Word filling. |
| [docs/CATALOG.md](docs/CATALOG.md) | Content TrialAgents serves through the MCP: submission requirements, content guides, Word templates, workflow guides. |
| [docs/product-spec-2026-11-26.md](docs/product-spec-2026-11-26.md) | Earlier product spec, kept for history. TECHNICAL.md supersedes it. |
| [docs/BUILD-PLAN.md](docs/BUILD-PLAN.md) | Build plan: repository layout, database, server modules, Word filling, catalog publishing, phases. |
| [prototype/TrialAgents-CTIS.html](prototype/TrialAgents-CTIS.html) | Clickable prototype. Download it and open it in a browser. |
| [prototype/source](prototype/source) | Sources and build script for the prototype. |

## Try the prototype

Open `prototype/TrialAgents-CTIS.html` in a browser. It contains fictional example data (project EX-101 and a project shared with you, BX-212) and saves your changes in that browser only. To start over, clear the site data for the file.

To rebuild it after editing the sources:

```
python3 prototype/source/build.py
```

## Next step

Build in the phases of [docs/BUILD-PLAN.md](docs/BUILD-PLAN.md), following the structure of TrialAgents Pipeline.
