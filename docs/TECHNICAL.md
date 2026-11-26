# TrialAgents CTIS: technical design

This is the reference for building TrialAgents CTIS: the hosted app, its database and the MCP server used by Claude and ChatGPT. It records the decisions taken while designing the prototype (26 November 2026). The plain-English feature list is in [FEATURES.md](FEATURES.md). The MCP server, Claude plugin and assistant loop are specified in [MCP.md](MCP.md), and the content TrialAgents serves through the MCP in [CATALOG.md](CATALOG.md). The earlier product spec, [product-spec-2026-11-26.md](product-spec-2026-11-26.md), is kept for history. Where the two disagree, this file wins.

## 1. Product model

| Term | Meaning |
|---|---|
| **Project** | One CTIS submission. One project has exactly one plan. A new submission or amendment is a new project, usually created by duplicating one. Duplication copies the details, sources and templates and the plan, not the deliverables. |
| **Plan** | The documents of the project (rows) × the steps (columns), plus the pinned final document. |
| **Document** | One output for a part, country, language and variant, for example "Participant information & consent · Germany · German". Has a code such as `D04`. |
| **Step** | A stage every document goes through. Default: Draft, Source QC, Style (the Draft step checks the content template's checklist). Steps are plan-wide; they can be paused for the plan or marked not applicable for a single document. |
| **Deliverable** | One document at one step. Has a code such as `D04-QC`. Has versions. |
| **Version** | One saved result of a deliverable. Immutable. Carries who, when, through which assistant, and the sources and templates used. |
| **Final document** | The approved version of the document's last applicable step. |
| **Source** | A study document used as evidence (protocol, IB, manuals). |
| **Template** | A writing template, checklist, Word layout or SOP recorded by a user. TrialAgents' own planning checklists, naming instructions, content templates, styling instructions and workflow guides form the catalog ([CATALOG.md](CATALOG.md)); they are not listed to users but are recorded in each version's snapshot. |
| **Share** | Access given to one email for one deliverable, document or project, with a role. |

### Codes

- Document code: `D` + two digits, assigned by the plan (`D01` …). Stable within a project and copied by duplication.
- Step code: `DR` Draft, `CL` Checklist (optional), `QC` Source QC, `ST` Style, `TR` Team review, `IG` Internal guidelines, `CS` custom. Compare versions and Compare across documents are dropped as step types; the Versions view already compares versions.
- Deliverable code: `<document>-<step>`, for example `D04-QC`. Shown only inside the opened deliverable and in logs, not in the plan table.
- Document and deliverable naming and codes are part of the plan the assistant proposes.

## 2. Statuses

Statuses are derived, never stored, so they cannot go stale.

```
deliverable status(d, step):
  if step paused for the plan or not applicable for this document -> NOT_APPLICABLE
  if an earlier applicable step is ACTION_REQUIRED and has not been
     "continued" for its current version                           -> WAITING
  if no completed current version                                  -> WAITING
  if open findings or open comments on the current version         -> ACTION_REQUIRED
  else                                                             -> DONE
```

- **Continue past issues** ("Ignore and continue") stores `continued[step] = current_version_number`. It unblocks later steps for that version only. The step stays ACTION_REQUIRED. A new version clears it automatically because the number no longer matches.
- **Final document status:** `APPROVED vN` if any version was approved (the latest approval wins), `AWAITING_APPROVAL` if the last step is DONE but not approved, otherwise `WAITING`.
- A newer version of the last step does not remove the previous approval. The final column keeps showing the last approved version until the new one is approved.
- Project "needs action" = number of documents with any ACTION_REQUIRED step.

Findings types (shown in the review panel): missing data, conflicting information, decision needed, open comment, source changed. In the table they all collapse into "Action required".

## 3. Workflow and the assistant loop

Specified in [MCP.md §5](MCP.md#5-the-loop). In short:

1. **Plan.** The assistant reads the planning checklists and naming instructions from the catalog and saves the plan, naming each document by its regulatory code (for example `L1_SIS-ICF`, variant `adults`). It opens in the workspace at once; there is no confirmation step. The user asks for changes in the chat and says when to start.
2. **Order.** Part I first, then each country's documents top to bottom. A document runs through all its steps before the next document starts.
3. **One step at a time, context from the server.** Each step's context comes from `get_ctis_step`, never from chat history, so a run can resume in any conversation.
4. **Blocks.** Any unresolved finding or comment on the current version blocks that document (missing data, conflicting information, decision needed, open comment, source changed). The loop moves to the next document. **Ignore and continue** (this version only) unblocks it: a person clicks it in the app, or asks the assistant to move on, which records it and flags the unresolved issues on the next version.
5. **No cascade.** A new version of an earlier step does not rerun later steps or other documents; those show "Source changed" until the user asks for a rerun.
6. **Revise.** The server sends the version, open comments and source changes; the assistant returns only the changed sections.
7. **Approve.** Only the project owner, in the app. Never a tool.

The loop runs inside the conversation. Unattended runs (no chat open) would require TrialAgents to call a model itself. Not in scope for the first release.

## 4. Sources and templates

### Records

A record has: id, category (`source` | `template`), name, type, version, document date, scope (country, document type, language for templates), notes, file mode (`name` | `link` | `stored`), link or stored file, who recorded it, via which client, when.

- The assistant records every source and template it uses, with name, version and date read from the document. Users can correct the metadata.
- Storing the file is the default; the user can choose name only. A name-only record still makes every deliverable traceable. Files are uploaded in the app (browser or the workspace inside Claude), not through tool calls.

### Project and document level

- **Project-wide list:** `project_resources(project_id, resource_id)`. Edited only in Project details. Every change is logged.
- **Document-level overrides:** `document_resource_overrides(project_id, document_id, resource_id, op)` with `op` = `add` | `remove`.
- **Effective list for a document** = project-wide ∪ adds − removes. Project changes flow into documents that did not override them.
- A record cannot be detached from a project on the Sources or Templates pages. Those pages list where it is used and link to the project.

### Snapshot per version

When a version is saved, store the effective list as an immutable snapshot on the version: `{resource_id, name, version, type}`. The deliverable view shows this snapshot as "Used in this version". Removing a source from a project later never changes existing snapshots.

## 5. Sharing and permissions

Not an organisation model. Every user owns their own projects (free). Sharing is a paid feature of the owner's account (Team plan, €49 per month per owner account, unlimited people; Stripe as in Pipeline).

### Grants

```
share_grants(
  id, owner_user_id, grantee_email, grantee_user_id NULL,
  project_id, scope ENUM('project','document','deliverable'),
  document_id NULL, step_id NULL,
  role ENUM('commenter','editor'),
  created_at, first_opened_at NULL, revoked_at NULL
)
```

- Access is immediate on creation; there is no acceptance step. `grantee_user_id` is filled when the email signs in.
- The grantee can be mentioned as soon as the grant exists.
- Only the owner creates, changes or revokes grants and approves final documents.
- Grants work only while the owner's Team plan is active. When it lapses, shared people lose access; the owner keeps everything and grants come back on renewal.
- A grantee sees sources and templates only with a project-scope grant.
- Commenter: read and comment. Editor: also Revise and Ignore and continue (through their own assistant or the web app).

### Access checks without repeated database reads

- On sign-in (web) or token exchange (MCP), resolve the user's grants once into a compact list, for example `["BX-212:doc:D04:commenter"]`, plus an `access_version` number.
- Every read checks against that in-memory list. No database lookup per request.
- Any grant change increments the owner's `access_version`. Requests carry the version they were resolved with; a cheap comparison triggers a refresh only when it changed.
- Writes (comment, revise, approve, download of stored files) always re-check against the database.

### Billing gate

- `account.plan = individual | team`. Creating a grant requires `team`.
- Every Invite entry point (deliverable, Settings → Team, @mention) routes an individual-plan owner to Billing with a short notice.

## 6. Versions

- Versions are immutable and kept in full. Each has number, created_at, created_by, via (`Claude` | `ChatGPT` | `Browser`), content (structured blocks), findings, and the resource snapshot.
- Restore creates a new version copied from the chosen one (`restored_from = n`), and that version's open findings come back on their original threads. History is never rewritten.
- Each version stores a snapshot of its open findings.
- Comment threads are attached to the deliverable and anchored to a version and text range. When wording changes, the anchor is marked as earlier wording.

## 7. MCP tools

Specified in [MCP.md §3](MCP.md#3-tools): five read-only tools (`open_ctis`, `read_ctis`, `read_ctis_catalog`, `get_ctis_step`, `read_ctis_source`) and one write tool, `save_ctis`, so a user approves a single write tool. Approval, Ignore and continue, sharing, billing, deletion, restore, duplication and uploads are people-only actions in the app and are not tools.

Writes take an idempotency key and the expected current version number. A stale write returns the current version instead of overwriting.

## 8. Hosting

Follow TrialAgents Pipeline (`tarous89/trialagents_pipeline`), which already runs this shape:

- One Node service inside the existing shared Render web service, Frankfurt.
- PostgreSQL for projects, plans, versions, threads, grants and logs. Private object storage for stored files and rendered Word files.
- MCP endpoints for Claude and ChatGPT on the shared MCP hostname, with the shared TrialAgents OAuth issuer and separate audiences per client.
- The embedded widget and the web app use the same backend and the same UI code.

## 9. UI structure

Copied from TrialAgents Pipeline: dark header (sidebar toggle, product name, assistant buttons), dark sidebar (207 px; icons only below 800 px), page area with panels, tables, filters and right-hand drawers. Brand green `#00b482` (from the logo) for the header dot and hover accents; primary buttons `#14644e`.

| Page | Contents |
|---|---|
| Projects | Summary cards, own projects table (edit, duplicate), Shared with you. |
| Project plan | Title, sponsor, country codes, sources and templates links, Project details; Document plan table with filters, Edit steps, Download all. |
| Deliverable (dialog) | Top: status, step, language, version, sources and templates link, Download, Versions, Invite. Middle: document and review panel. Bottom: Ignore and continue, Revise, Approve final document. |
| Sources, Templates | Searchable registry with filters; record drawer with used-in projects and deliverables. |
| Settings | Personal, Team, Logs (filters: project, person, document, text), Billing, Notifications, Support. |

Rules agreed during design:

- Top bar of the deliverable changes nothing; bottom bar moves the workflow.
- Helper text under titles is short, thin and grey. Info icons only for long, rarely needed explanations.
- Every action button has a tooltip.
- No document codes in the plan table; deliverable codes only inside the opened deliverable.
- Not applicable is set in the plan, never from inside a deliverable.
- Inside Claude or ChatGPT the header shows **Open TrialAgents app ↗**. In the browser it shows **Open in Claude** and **Open in ChatGPT**, which open the plugin's directory page.
- Assistant-only actions (New project, Revise, Continue) are disabled in the browser with the tooltip "Available in Claude or ChatGPT". Inside the assistant, they post the matching message into the chat. See [MCP.md §9](MCP.md#9-workspace-inside-claude-vs-browser).

## 10. The prototype

`prototype/TrialAgents-CTIS.html` is a single self-contained file. It stores its state in the browser (`localStorage`, key `trialagents-ctis-workspace-1`). Downloads work when the file is opened directly, not inside the claude.ai artifact viewer.

It is built from `prototype/source`:

| File | Role |
|---|---|
| `plan-canvas-original.html` | The original plan prototype (table, deliverable reader, comments, ZIP export). |
| `patches.py` | Exact string patches applied to the original script (statuses, reader layout, codes, versions). |
| `shell_new.js` | The new shell: routing, Projects, Sources, Templates, Settings, sharing, drawers, pickers, data upgrade. |
| `extra.css` | Glue styles mapping the plan UI onto Pipeline's look. |
| `vendor/pipeline/` | Pipeline's `shell.html` (its CSS is reused, scoped under `.pl` and `.plh`), assistant marks and logo. |
| `build.py` | Scopes the CSS, assembles the page and writes `../TrialAgents-CTIS.html`. |

Rebuild with `python3 prototype/source/build.py`. The prototype is a design reference, not production code: the production app should be written fresh against the data model above, reusing Pipeline's components.

## 11. Open questions

- Should editors be allowed to share further? Currently owner only.
- Should a shared person see the rest of the plan greyed out for context? Currently they see only what is shared.
- Exact host support for a widget posting a message into the chat, and for file upload from the widget, in Claude and ChatGPT.
- Price and trial for the Team plan beyond €49 per month.
