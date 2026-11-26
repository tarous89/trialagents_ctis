# TrialAgents CTIS: technical design

This is the reference for building TrialAgents CTIS: the hosted app, its database and the MCP server used by Claude and ChatGPT. It records the decisions taken while designing the prototype (26 November 2026). The plain-English feature list is in [FEATURES.md](FEATURES.md). The earlier product spec, [product-spec-2026-11-26.md](product-spec-2026-11-26.md), is kept for history. Where the two disagree, this file wins.

## 1. Product model

| Term | Meaning |
|---|---|
| **Project** | One CTIS submission. One project has exactly one plan. A new submission or amendment is a new project, usually created by duplicating one. |
| **Plan** | The documents of the project (rows) × the steps (columns), plus the pinned final document. |
| **Document** | One output for a part, country, language and variant, for example "Participant information & consent · Germany · German". Has a code such as `D04`. |
| **Step** | A stage every document goes through, for example Draft, Source QC, Checklist, Style. Steps are plan-wide; they can be paused for the plan or marked not applicable for a single document. |
| **Deliverable** | One document at one step. Has a code such as `D04-QC`. Has versions. |
| **Version** | One saved result of a deliverable. Immutable. Carries who, when, through which assistant, and the sources and templates used. |
| **Final document** | The approved version of the document's last applicable step. |
| **Source** | A study document used as evidence (protocol, IB, manuals). |
| **Template** | A writing template, checklist, Word layout or SOP. TrialAgents' catalog templates and country rules are not listed to users; only user-recorded templates are. |
| **Share** | Access given to one email for one deliverable, document or project, with a role. |

### Codes

- Document code: `D` + two digits, assigned by the plan (`D01` …). Stable within a project and copied by duplication.
- Step code: `DR` Draft, `QC` Source QC, `CL` Checklist, `ST` Style, `TR` Team review, `CV` Compare versions, `CX` Compare across documents, `IG` Internal guidelines, `CS` custom.
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

1. **Plan.** The assistant calls `get_planning_requirements` with countries and study facts, proposes documents, steps, languages and filenames, and saves with `save_plan` after the user confirms.
2. **Order.** Part I first, then each country's documents top to bottom. A document runs through all its steps before the next document starts.
3. **One step per turn.** Each step is a fresh assistant turn. The assistant gets everything it needs from `get_step_context`, not from chat history, so long runs do not exhaust the context.
4. **Continue.** When a step is saved, the widget posts the next message into the chat (`Continue with D04-CL`). Both hosts let an embedded app post a follow-up message, but only while the chat is open; check the current host behaviour before building on it. If the chat is closed, the run pauses and a **Continue** button resumes it.
5. **Stops.** The loop stops at ACTION_REQUIRED. Findings the assistant can fix from sources it already has are fixed in the same step and recorded. Missing user data, decisions, conflicting sources and comments stop the loop.
6. **Revise.** One action. It always sends: the version being revised, all open comments with replies and the text they anchor to, the document's current sources and templates marked where they differ from that version, and the step instructions and applicable rules. The assistant revises with comments, reruns if only inputs changed, or asks what to change if neither.
7. **Approve.** Only the project owner. Approval binds to the plan, document, last step and version number.

Unattended runs (no chat open) would require TrialAgents to call a model itself. Not in scope for the first release.

## 4. Sources and templates

### Records

A record has: id, category (`source` | `template`), name, type, version, document date, scope (country, document type, language for templates), notes, file mode (`name` | `link` | `stored`), link or stored file, who recorded it, via which client, when.

- The assistant records every source and template it uses, with name, version and date read from the document. Users can correct the metadata.
- Storing the file is optional. A name-only record still makes every deliverable traceable.

### Project and document level

- **Project-wide list:** `project_resources(project_id, resource_id)`. Edited only in Project details. Every change is logged.
- **Document-level overrides:** `document_resource_overrides(project_id, document_id, resource_id, op)` with `op` = `add` | `remove`.
- **Effective list for a document** = project-wide ∪ adds − removes. Project changes flow into documents that did not override them.
- A record cannot be detached from a project on the Sources or Templates pages. Those pages list where it is used and link to the project.

### Snapshot per version

When a version is saved, store the effective list as an immutable snapshot on the version: `{resource_id, name, version, type}`. The deliverable view shows this snapshot as "Used in this version". Removing a source from a project later never changes existing snapshots.

## 5. Sharing and permissions

Not an organisation model. Every user owns their own projects (free). Sharing is a paid feature of the owner's account (Team plan, €49 per month).

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
- Restore creates a new version copied from the chosen one (`restored_from = n`). History is never rewritten.
- Comment threads are attached to the deliverable and anchored to a version and text range. When wording changes, the anchor is marked as earlier wording.

## 7. MCP tools (proposed)

All tools take the project id; the server derives everything else from the caller's grants.

| Tool | Purpose |
|---|---|
| `list_projects`, `open_project` | Projects the caller owns or has been shared. |
| `create_project`, `update_project`, `duplicate_project` | Owner only. |
| `get_planning_requirements` | Country rules, required Part I/II documents, languages, variants and naming pattern for the given countries and study facts. Catalog content stays server-side. |
| `save_plan`, `update_plan_steps` | Documents, steps, not-applicable cells, codes and filenames. |
| `record_resource`, `update_resource` | Record a source or template by name and version, optional link or file upload. |
| `set_project_resources`, `set_document_resources` | Project-wide list and per-document overrides. |
| `get_step_context` | Everything for one deliverable: instructions, template sections, effective sources and templates with access handles, the current version, open threads with replies, checklist items, and what changed since the last version. |
| `save_version` | Structured content, findings and claim-to-source links for one deliverable. Validated server-side. Stores the resource snapshot. |
| `list_threads`, `post_comment`, `update_thread` | Review threads. |
| `continue_past_issues`, `undo_continue` | The "Ignore and continue" action, bound to a version number. |
| `request_revision` | Records the request and returns the full revision context. |
| `approve_final` | Owner only. Requires an authenticated owner action, never only an assistant call. |
| `share`, `update_share`, `revoke_share` | Owner only. Team plan required. |
| `export_package` | ZIP of the latest approved version of each final document plus a manifest. |
| `render_word` | Applies the selected Word layout to structured content. |

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
- Exact host support for a widget posting the next loop message in Claude and ChatGPT.
- Price and trial for the Team plan beyond €49 per month.
