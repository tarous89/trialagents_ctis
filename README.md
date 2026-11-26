# TrialAgents CTIS

TrialAgents CTIS helps regulatory teams prepare CTIS clinical trial applications with Claude or ChatGPT. The assistant plans, drafts and checks the documents; TrialAgents keeps the plan, records the sources and templates behind every version, handles review and sharing, and holds the approved files.

## Contents

| Path | What it is |
|---|---|
| [docs/FEATURES.md](docs/FEATURES.md) | Plain-English feature list: what the product does and how people use it. |
| [docs/TECHNICAL.md](docs/TECHNICAL.md) | Technical design: data model, statuses, sharing and permissions, hosting, UI rules. |
| [docs/MCP.md](docs/MCP.md) | MCP server and Claude plugin: tools and permissions, the assistant loop, Source QC, revision, Word filling. |
| [docs/CATALOG.md](docs/CATALOG.md) | Content TrialAgents serves through the MCP, in regulatory naming: planning checklists, naming instructions, content templates (with their checklists), styling instructions, workflow guides. |
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

## Develop

Use Node 24. `npm ci` then `npm test` (the browser tests use Chromium through `playwright-core`; in a fresh environment run `npx playwright-core install chromium` once). `npm run check:catalog` validates `catalog/`.

`npm run dev` starts the app at http://localhost:4600 on an in-memory database with the catalog and fictional example data (EX-101, a shared BX-212). Add `?as=sofia` (a commenter on one EX-101 document) or `?as=maria` (owner of BX-212) to switch the signed-in person. `npm run build` writes `dist/ctis.html` and `dist/ctis.js`. Tests run the server against an in-process PostgreSQL (PGlite), so no database is needed.

| Path | What it is |
|---|---|
| `app/server/schema.sql` | Database schema (`ctis`), additive and safe to rerun |
| `app/server/status.mjs` | Statuses, final status, approval rule and the loop's next step (pure functions) |
| `app/server/store.mjs` | Every operation: projects, plans, versions, threads, continue, approval, sources, sharing, logs |
| `app/server/rules.mjs` | Input schemas and the content model |
| `app/server/catalog.mjs` | Catalog parsing, validation, matching to a document, publishing |
| `app/server/word.mjs` | Fills Word templates: coded fields and conditional regions, content controls, checkboxes, and content blocks for layouts |
| `app/server/sources.mjs` | Stored sources: text extraction (PDF, Word, text) with page or section locators, search |
| `app/server/step-context.mjs` | The bundle `get_ctis_step` returns: instructions, content template, styling, planning checklist, input, sources, threads |
| `mcp/tools.mjs`, `mcp/http.mjs` | The MCP server for Claude: six tools (five read-only, one write), OAuth audience and discovery |
| `app/server/api.mjs` | The browser app's API (`/api/ctis`, downloads, Download all) |
| `app/server/billing.mjs`, `app/server/mail.mjs` | Team plan through Stripe (checkout, portal, webhook); email notifications (outbox and delivery) |
| `plugins/claude/`, `.claude-plugin/marketplace.json` | The Claude plugin (`trialagents-ctis`, one skill `ctis`) and its marketplace entry; package with `python3 scripts/package-plugins.py` |
| `integration/shared-web/` | What the shared web service adds for CTIS: the embedded account page and the public info pages (`/ctis-info/about`, `connectors`, `support`, `privacy`, `terms`) |
| `app/web/` | The browser app: shell, Projects, Plan, the deliverable reader, Sources, Templates, Settings. Styles and icons come from the approved prototype |
| `catalog/` | The catalog itself (see its README) |

## Next step

Build in the phases of [docs/BUILD-PLAN.md](docs/BUILD-PLAN.md), following the structure of TrialAgents Pipeline.
