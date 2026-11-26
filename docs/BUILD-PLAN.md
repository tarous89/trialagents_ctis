# TrialAgents CTIS: build plan

How to build the hosted app, the MCP server and the Claude plugin described in [TECHNICAL.md](TECHNICAL.md), [MCP.md](MCP.md) and [CATALOG.md](CATALOG.md). It follows TrialAgents Pipeline (`tarous89/trialagents_pipeline`): same stack, same repository layout, same shared Render services. ChatGPT comes after the Claude release.

Decided: authority forms are Word only; the catalog lives in `catalog/` in this repository and is published by deploy.

## 1. Repository layout

```
app/
  server/            Store, statuses, loop, catalog, Word filler, files, sharing, billing, mail
    schema.sql       ctis schema (additive migrations)
  web/               Browser app and the workspace shown inside Claude (same UI code)
mcp/
  tools.mjs          Tool descriptors, zod schemas, server instructions
  http.mjs           Streamable HTTP handler, OAuth audiences, widget resource
catalog/             Submission requirements, content guides, Word templates, workflow guides
plugins/claude/      .claude-plugin/plugin.json, .mcp.json, skills/ctis/SKILL.md, README.md
.claude-plugin/marketplace.json
integration/
  shared-web/        Routes, OAuth and account patches for the shared web service
  shared-mcp/        Ingress for the two MCP paths
scripts/             build.mjs, stage-app.mjs, stage-ingress.py, publish-catalog.mjs, package-plugins.py
tests/               node --test suites, Chromium checks, plugin archive checks
prototype/           Approved design reference (unchanged)
docs/
```

## 2. Stack

As Pipeline: Node 24, ES modules, `zod` 4, `@modelcontextprotocol/server` and `@modelcontextprotocol/ext-apps`, `esbuild`, `dompurify`; tests with `node --test`, `@electric-sql/pglite` for an in-process Postgres and Playwright with Chromium.

Added for CTIS:

| Need | Library |
|---|---|
| Read and write .docx templates | `jszip` + `@xmldom/xmldom` (own filler, see §5) |
| Text from uploaded Word sources | `mammoth` |
| Text from uploaded PDF sources | `pdfjs-dist` |
| Download all | `jszip` |

## 3. Database

Schema `ctis` in the shared application database (`intel-agent-control-db`), additive migrations applied by the existing worker. Users come from the shared TrialAgents accounts.

| Table | Key columns |
|---|---|
| `account` | `user_id` PK, `plan` (individual, team), Stripe mapping, `paid_until`, `access_version` |
| `project` | `id`, `owner_id`, `code`, `name`, `sponsor`, `eu_ct_number`, `countries[]`, `submission_type` (free text), `revision`, timestamps, `archived_at` |
| `document` | `(project_id, id)` e.g. `D04`; `name`, `part`, `country`, `language`, `variant`, `doc_type`, `filename`, `position`, catalog refs |
| `step` | `(project_id, id)`; `type`, `name`, `instruction`, `position`, `paused` |
| `cell_na` | `(project_id, document_id, step_id)`: not applicable |
| `plan_revision` | `(project_id, rev)`; full plan snapshot, who, via, when |
| `version` | `(project_id, document_id, step_id, n)`; `content` (blocks), `claims` (fact → source), `fill`, `file_id`, `basis` (input version), resource and catalog snapshots, who, via, `restored_from`, when |
| `thread` | `id`, deliverable, `number`, `kind` (finding, comment), `category`, `anchor` (version, text parts), `text`, `status`, finding `key` for de-duplication, who, via |
| `thread_reply` | `thread_id`, text, mentions, who, when |
| `continued` | deliverable + version `n`: Ignore and continue |
| `approval` | document + last step + version `n`, owner, when |
| `resource` | `id`, `owner_id`, `category` (source, template), name, type, version, document date, scope, notes, `file_mode`, link, `file_id`, who, via |
| `resource_text` | `(resource_id, chunk)`: locator (section, page, table), text, `tsvector` for `read_ctis_source` |
| `project_resource`, `document_resource_override` | As TECHNICAL §4 |
| `file` | `id`, owner, name, MIME type, size, SHA-256, contents (`bytea`, in the database for now) |
| `share_grant` | As TECHNICAL §5 |
| `catalog_release`, `catalog_item` | Release (git SHA, published at); item (id, category, version, header, body, file) |
| `audit`, `receipt`, `mail`, `stripe_event`, `frame_access`, `preference` | As Pipeline |

Statuses, the next step and "where we stand" are derived from these tables, never stored (TECHNICAL §2). There is no loop cursor to go stale.

**Next step.** Documents in order (Part I by position, then countries in project order, by position). For each, skip it if any applicable step is ACTION_REQUIRED and not continued for its current version; otherwise return its first WAITING step whose earlier steps are DONE or continued. If none, `stop` with a summary of final, awaiting-approval and blocked documents.

## 4. Server modules (`app/server`)

| Module | Responsibility |
|---|---|
| `store.mjs` | Transactions, revision checks, idempotent receipts, audit in the same transaction |
| `access.mjs` | Owner and grant resolution, compact grant list with `access_version` (TECHNICAL §5) |
| `status.mjs` | Statuses, final status, next step |
| `plan.mjs` | Save plan (documents, steps, not applicable, codes, filenames), plan revisions |
| `versions.mjs` | Save version (full, or changes only for revisions), restore, snapshots, finding threads from saved findings |
| `threads.mjs` | Comments, replies, mentions, resolve, anchors to earlier wording |
| `step-context.mjs` | The `get_ctis_step` bundle (MCP §4), revision context |
| `catalog.mjs` | Load, match and serve catalog items for a deliverable |
| `sources.mjs` | Uploads, text extraction, chunking with locators, search |
| `word.mjs` | Template outline and filling (§5) |
| `files.mjs` | File storage and access-checked downloads |
| `export.mjs` | Download all: approved final documents plus a manifest |
| `sharing.mjs`, `billing.mjs`, `mail.mjs` | Grants, Team plan, notifications (Pipeline patterns) |
| `frame.mjs` | Short-lived token for the workspace inside Claude to call the app API directly |

## 5. Word filling

**Content model.** Structured blocks: heading, paragraph, list, table, image, note, page break, placeholder. The old app's renderer (`trialagents_ctis_old/shared/ctisRenderer.ts`) already defines most block types; reuse its block schema, not its renderer.

**Outline.** For a template, list every content control (by tag), header and footer part, table and cell, and optional or repeatable section, each with an id. Untagged templates get positional ids.

**Fill.** For each slot, replace the content control's contents with OOXML built from the blocks, using the template's own paragraph, list and table styles. Also: set header and footer text, repeat table rows or tagged sections, remove optional sections, insert images from stored files. A `form` template allows only text in existing fields and cells; any other change is rejected.

**Checks.** Required slots left empty become Missing data. The result is opened and re-read as a check before it is stored. Fixture tests cover the default layout, a tagged form, an untagged template, headers and footers, tables with repeated rows, and images.

The workspace shows the content from the blocks with Download Word; there is no server-side PDF preview in the first release.

## 6. Catalog publishing

`scripts/publish-catalog.mjs` validates `catalog/`:

- required header fields
- slot ids that match content guide sections
- links between requirements, content guides and Word templates
- unique ids and versions

On deploy it writes a new `catalog_release`. Versions record the exact item versions they used. The first content is the default Word layout (ported from `ctis-defaults.json`), the workflow guides, and one fictional content guide and requirement file used by tests and the EX-101 example. Your real country requirements and templates are added as files later.

## 7. MCP server

- Routes: `https://mcp.trialagents.com/ctis/claude` (and later `/ctis/chatgpt`), with OAuth protected-resource metadata under `/.well-known/oauth-protected-resource/ctis/claude`, the shared TrialAgents issuer and the `mcp:tools` scope.
- Tools: six model tools and one app-only tool as in MCP §3, with the annotations listed there. Each `save_ctis` action has its own strict schema. Every result carries `next`.
- Widget: `ui://trialagents-ctis/claude-workspace-v1.html`, bundled. `connectDomains: ["https://ctis.trialagents.com"]` so the workspace can call the app API and upload files.
- Anonymous requests get connection guidance. All data access goes through the store with the caller's grants.

## 8. Web app and workspace

One UI codebase in `app/web`, written fresh against the API and reusing Pipeline's shell CSS and components. The prototype is the visual and behavioural reference.

| Surface | Entry | Differences |
|---|---|---|
| Browser | `ctis.trialagents.com` | Header: Open in Claude, Open in ChatGPT (plugin directory pages). New project, Revise, Continue disabled with tooltip. |
| Workspace in Claude | Widget resource | Header: Open TrialAgents app ↗. New project, Revise, Continue post a message into the chat. |

Screens (TECHNICAL §9): Projects, Project plan, Deliverable dialog, Sources, Templates, Settings (Personal, Team, Logs, Billing, Notifications, Support). Public info pages under `ctis.trialagents.com/ctis-info/` (about, privacy, terms, support, connectors), as Pipeline.

## 9. Claude plugin

`plugins/claude`, as Pipeline: `plugin.json` (name `trialagents-ctis`, Atlas Consulting, info URLs), `.mcp.json` pointing to `/ctis/claude`, the `ctis` skill from MCP §2, `README.md`, icon. `.claude-plugin/marketplace.json` at the root so Claude Code can install it with `/plugin install trialagents-ctis --marketplace tarous89/trialagents_ctis`. `scripts/package-plugins.py` builds the directory package; tests check its contents.

## 10. Phases

| Phase | Work | Done when |
|---|---|---|
| 1. Scaffold | `package.json`, build, CI, pglite test harness, schema | `npm test` passes in CI with an empty schema |
| 2. Core | Store, access, plan, versions, threads, status, next step | Tests cover every rule in TECHNICAL §2 and MCP §5 (order, blocking, continue, no cascade, approval binding) |
| 3. Catalog | Loader, validator, publish script, default layout, workflow guides, fictional example items | A deliverable resolves its content guide, template and requirements; an invalid catalog fails CI |
| 4. Sources and Word | Uploads, text extraction, source search, Word outline and fill | Fixture templates fill correctly; forms reject restyling; a stored protocol is searchable with locators |
| 5. MCP | Six tools, frame tool, HTTP handler, instructions, step context | Over the MCP transport a scripted client runs EX-101: plan, loop to a block, resume from a new session, revise with changes only |
| 6. Web app | Browser screens against the API | Chromium tests of the prototype flows; visual check against the prototype on desktop and mobile |
| 7. Workspace in Claude | Widget build, header variant, message posting, uploads | Works in Claude web and desktop; Claude Code gets text and a link |
| 8. Sharing, billing, mail | Grants, Team plan in Stripe test mode, notifications | Pipeline's billing and grant test list passes for CTIS |
| 9. Plugin and info pages | Plugin package, marketplace, public pages | Plugin installs in Claude Code and loads the `ctis` skill and the server |
| 10. Launch | Shared web and MCP integration, domain and TLS, staging, live check with a real Claude account, directory submission | The EX-101 scenario below passes live |

**Live acceptance scenario (fictional EX-101, Germany and Spain).** Ask Claude for an initial application. The plan opens in the workspace. Ask for one change, then say start. The loop runs Part I, blocks the German consent form on a conflict and continues to the next document. Close the chat; in a new chat "continue EX-101" resumes. Comment on a sentence in the browser; ask Claude to revise; only that section changes. Ignore and continue a finding in the browser. The style step fills the Word layout and a German authority form. Approve in the browser and download all. Each action shows in Logs with Claude or Browser as the source. Only one Claude permission prompt for writes is needed.

## 11. Before phase 10

- **File storage.** Decided: files are stored in the Render database (`bytea` in `ctis.file`) for now. `files.mjs` is the only module that reads or writes them, so moving to S3-compatible storage later is a change to that module plus a one-off copy. Revisit when storage size or user numbers grow.
- **Shared web and MCP repositories.** Phase 10 patches the shared web service (`intel_agent_app`) and MCP service (`intel_mcp`) as Pipeline does. This session cannot see those repositories, so the patches will be written against Pipeline's integration files and need checking against the live services.
