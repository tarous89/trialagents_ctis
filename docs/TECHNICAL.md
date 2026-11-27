# TrialAgents CTIS: technical design

This is the reference for building TrialAgents CTIS: the hosted app, its database and the MCP server used by Claude and ChatGPT. It records the decisions taken while designing the prototype (26 November 2026). The plain-English feature list is in [FEATURES.md](FEATURES.md). The earlier product spec, [product-spec-2026-11-26.md](product-spec-2026-11-26.md), is kept for history. Where the two disagree, this file wins.

## 1. Product model

| Term | Meaning |
|---|---|
| **Project** | One CTIS submission and its plan. Project and plan are one object, saved by one tool: creating a project may include the plan, and planning later is an update of the project. A new submission or amendment is a new project, usually created by duplicating one or as a linked successor. |
| **Plan** | The part of the project that lists the documents (rows) × the steps (columns), plus the pinned final document. Also holds the planning choices: Part I scope, the reference package and the format choice. Not a separate record. |
| **Package** | All Part II documents for one country and language, for example "Germany · German". A country that needs several languages has several packages. Countries may need more or fewer documents than others. |
| **Reference package** | The first country-language package the plan completes. It is not a special kind of document: it is an ordinary package that is done and approved first, so its content can be adapted for the other packages. |
| **Reference document** | The approved document another document is adapted from (`based_on`), normally the same document type in the reference package. Optional: a document with no counterpart in the reference package is drafted from the sources. |
| **Document** | One output for a part, country, language and variant, for example "Participant information & consent · Germany · German". Has a code such as `D04`. Optional `based_on` points to its reference document. |
| **Step** | A stage every document goes through, for example Draft, Source QC, Checklist, Style. Steps are plan-wide; they can be paused for the plan or marked not applicable for a single document. |
| **Deliverable** | One document at one step. Has a code such as `D04-QC`. Has versions. |
| **Version** | One saved result of a deliverable. Immutable. Carries who, when, through which assistant, and the sources and templates used. |
| **Final document** | The approved version of the document's last applicable step. |
| **Source** | A study document used as evidence (protocol, IB, manuals). Can be a recorded file or a document of a project (see section 4). |
| **Template** | A writing template, checklist, Word layout or SOP. TrialAgents' catalog templates and country rules are not listed to users; only user-recorded templates are. |
| **Share** | Access given to one email for one deliverable, document or project, with a role. |

### Planning choices stored on the project

- `part1_scope`: `in_plan` | `completed_outside` | `later`.
- `reference_package`: `{country, language}`, or empty when the user chose to draft every package from the sources.
- `format_choice`: `sponsor_format` (keep the structure of the sponsor's documents across countries) | `country_format` (use their content with the TrialAgents country format). Plan-wide, with optional per-document-type overrides.
- Per document: `package {country, language}` for Part II, `based_on` (reference document id, or a previous project's document for modifications), and an optional starting document (a recorded source, for example the sponsor's existing participant information).

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

- **No planning gates.** Part I, the reference package and unapproved input documents never block a step. Order and approvals are recommendations the assistant raises (section 3), not rules the server enforces.
- **Unapproved inputs** (a `based_on` reference or a project-document source without an approved version) are shown on the not-yet-started deliverable as a note, for example "Uses D06 v2, not approved yet". They do not change the status.

Findings types (shown in the review panel): missing data, conflicting information, decision needed, open comment, source changed, reference changed. In the table they all collapse into "Action required".

- **Reference changed** is raised by the server on every document whose current version was adapted from an earlier or unapproved version of its reference document, when that reference gets a newer approval. Existing approvals stay; the finding asks whether to revise. **Source changed** works the same way for project-document sources.

## 3. Workflow and the assistant loop

1. **Plan.** The assistant calls `get_planning_guide` with the application type, countries and known study facts. The guide returns the requirements and the questions the assistant must settle with the user before proposing a plan:
   - **Part I:** include it in the plan, completed outside TrialAgents (its documents are recorded as sources), or left for later. Never a gate for Part II.
   - **Starting material:** what already exists (protocol only, or sponsor documents such as an existing participant information). Existing documents are recorded as sources and used as the starting document of a Draft.
   - **Format:** where the sponsor brings its own documents, keep the sponsor's structure and format across countries as far as possible, or use the content with the TrialAgents country format. Stored on the plan, per document type if the user wants.
   - **Reference package:** which country and language to complete first. Any language the user is comfortable with.
   - Study facts (for example minors included) and planning choices are both saved on the project with `save_project`.

   The assistant then proposes documents, packages, `based_on` links, steps, languages and filenames, and saves them with `save_project` after the user confirms.
2. **Recommended strategy, and alternatives.** The guide tells the assistant to recommend: Part I (if in the plan), then the reference package in full, approved by the owner, then the other packages, each document adapted from its reference document (translation, national requirements, country checklist). Other countries may need more or fewer documents, additional details, or several languages; documents without a counterpart are drafted from the sources. If the user prefers another order, for example every country drafted from the sources in parallel, the assistant plans that instead: the same data model supports it by leaving `based_on` empty.
3. **Order.** Part I if in the plan, then the reference package, then the other packages, each top to bottom. A document runs through all its steps before the next document starts. Draft is always the first content step, whether written from scratch, from a starting document or adapted from a reference document; the step instructions differ, the column does not.
4. **Modifications and RFIs.** Also a planning case. `save_project` with `create_successor` creates a project linked to the previous one. The guide returns the modification rules; the assistant reads the previous project's approved documents, agrees with the user what changes, and saves a plan containing only the affected documents and the change documents. Each affected document is `based_on` its previously approved version.
5. **One step per turn.** Each step is a fresh assistant turn. The assistant gets everything it needs from `get_step_context`, not from chat history, so long runs do not exhaust the context.
6. **Continue.** When a step is saved, the widget posts the next message into the chat (`Continue with D04-CL`), unless the next deliverable uses an unapproved input (step 7). Both hosts let an embedded app post a follow-up message, but only while the chat is open; check the current host behaviour before building on it. If the chat is closed, the run pauses and a **Continue** button resumes it.
7. **Stops.** The loop stops at ACTION_REQUIRED. Findings the assistant can fix from sources it already has are fixed in the same step and recorded. Missing user data, decisions, conflicting sources and comments stop the loop.

   **Pause before unapproved inputs.** When the next deliverable would start from a project document that has no approved version (its `based_on` reference or a project-document source), there is no automatic continue. `read_project` and `get_step_context` return the unapproved inputs, and the assistant asks the user, for example: *"D04 will be built from D01 Study protocol v2, which is not approved yet. Approve D01 first, or go ahead with v2?"* It can bring up the approval with `request_approval`. Both answers are fine:
   - **Approve first:** the owner clicks Approve; the run continues.
   - **Go ahead:** the assistant continues; the version snapshot marks the input as not approved, and a later approval raises *reference changed* or *source changed* where the approved version differs. This suits teams that draft everything first and sign off together later.

   The user can tell the assistant to go ahead for the rest of the run, so it does not ask at every document.
8. **Revise.** One action. It always sends: the version being revised, all open comments with replies and the text they anchor to, the document's current sources and templates marked where they differ from that version, and the step instructions and applicable rules, and for an adapted document the reference version it was adapted from and the current approved one. The assistant revises with comments, reruns if only inputs changed, or asks what to change if neither.
9. **Approve.** Only the project owner, by a click. Approval is the only thing that needs a person, and it is needed only for a document to count as approved (final column, Download all); nothing else waits for it. The assistant can ask for approval with `update_review` (`request_approval`): the deliverable opens in the chat widget with an **Approve final document** confirmation showing the exact version, and the approval is recorded only when the owner clicks it there or in the web app. Where the host shows no widget, the assistant gives the web link. An assistant call alone never approves. Approval binds to the project, document, last step and version number.

Unattended runs (no chat open) would require TrialAgents to call a model itself. Not in scope for the first release.

## 4. Sources and templates

### Records

A record has: id, category (`source` | `template`), name, type, version, document date, scope (country, document type, language for templates), notes, file mode (`name` | `link` | `stored`), link or stored file, who recorded it, via which client, when.

- The assistant records every source and template it uses, with name, version and date read from the document. Users can correct the metadata.
- Storing the file is optional. A name-only record still makes every deliverable traceable.
- A source can be the starting document of a Draft, for example a sponsor's existing participant information or a Part I document completed outside TrialAgents.

### Project and document level

- **Project-wide list:** `project_resources(project_id, resource_id)`. Edited only in Project details. Every change is logged.
- **Document-level overrides:** `document_resource_overrides(project_id, document_id, resource_id, op)` with `op` = `add` | `remove`.
- **Effective list for a document** = project-wide ∪ adds − removes. Project changes flow into documents that did not override them.
- A record cannot be detached from a project on the Sources or Templates pages. Those pages list where it is used and link to the project.

### Project documents as sources

A document of a plan, or of an earlier project the caller can read, can be a source of another document. Example: the assistant writes the protocol in Part I; the protocol is a source of the reference package; the reference package is the reference of the other packages.

- Stored as `document_sources(project_id, document_id, source_project_id, source_document_id)`, edited with the per-document sources (`save_resources` → `set_document`) or proposed with the plan (`save_project`).
- **Version used:** the latest approved final version if there is one; otherwise the latest version of the document's last completed step, marked *not approved*. The step context says which, so the assistant can tell the user it is working from an unapproved draft.
- **No gate.** A project-document source, like a `based_on` reference, never makes a step wait. Before a step uses an unapproved one, the run pauses and the assistant asks (section 3, step 7).
- **Changes:** when the source document gets a newer approved version, or a first approval after an unapproved version was used, every document whose current version used the older one gets a *source changed* finding.
- **Default:** documents produced in Part I of the same plan are suggested as sources for Part II documents; the user confirms them with the plan.
- `based_on` means "adapt this document"; a project-document source means "use as evidence". Both are handled the same way for approval.

### Snapshot per version

When a version is saved, store the effective list as an immutable snapshot on the version: `{resource_id, name, version, type}`, and for project documents `{project_id, document_id, version, approved}`. The deliverable view shows this snapshot as "Used in this version". Removing a source from a project later never changes existing snapshots.

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
- Only the owner creates, changes or revokes grants (web app only; no sharing tool in the MCP server for the first release) and approves final documents (owner click in the chat widget or web app).
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

### Design rules

- **Few write tools.** Hosts usually ask the user to approve tools that change data, and read-only tools (annotated `readOnlyHint`) tend to prompt less. Check current host behaviour before relying on it. Each write tool covers one kind of object and takes an `action` or `ops` field, so one approval covers related operations.
- **Approval is an owner click, not a tool result.** The assistant can bring the approval up in the chat widget (`update_review` → `request_approval`); the owner confirms it there or in the web app. Reason: approval is the owner's attestation of a regulatory document. A tool call can be pre-allowed in the host or triggered by text inside a source document, so it cannot prove a person approved.
- **Sharing stays in the web app** for the first release.
- All tools take the project id where one applies; the server derives everything else from the caller's grants.
- Every write takes an idempotency key and the expected current version. A stale write returns the current state instead of overwriting.
- Rendering is a server side effect of saving, not a tool.

### Read-only

| Tool | Purpose |
|---|---|
| `list_projects` | Projects the caller owns or has been shared, with summary counts. |
| `read_project` | Details, study facts, the plan with statuses and planning choices, the **next deliverable or what blocks it**, open action items, recent events, version lists and approval links. Optional `include` sections keep it small. Displays the widget. |
| `get_planning_guide` | For an application type (initial, additional country, modification, RFI response), countries and study facts: required Part I and Part II documents per country and language, conditional triggers, naming pattern, the recommended strategy, the **questions to settle with the user** (Part I scope, starting material, format, reference package) and, for modifications, the modification rules. Catalog content stays server-side. |
| `get_step_context` | One deliverable by code, or `next`; mode `run` or `revise`. Step instructions for this document's case (from scratch, from a starting document, adapted from a reference document), the manifest of effective sources and templates with handles (including project documents, with the version used and whether it is approved), the reference document's approved version, the current version, threads and findings, checklist items, what changed since the last version, the output schema and the expected version. |
| `read_resource` | Opens a handle by section or page: catalog templates and checklists, stored source files, an approved reference document, a previous project's approved document. |
| `find_resources` | Searches recorded sources and templates by name, type and version, so the assistant reuses a record instead of creating a duplicate. |
| `get_download` | Short-lived link for one deliverable file, or the ZIP of the latest approved version of each final document plus a manifest. |

### Write

| Tool | Actions |
|---|---|
| `save_project` | `create`, `update`, `duplicate`, `create_successor` (modification or RFI response, linked to the previous project). Covers details, study facts, planning choices (Part I scope, reference package, format choice) and the plan, given whole or as patch ops: documents and packages, `based_on` links, starting documents, steps, paused steps, not-applicable cells, order, codes and filenames. Validated; returns what changed. Every change is logged. Owner only. |
| `save_resources` | `record`, `update` (metadata), `upload` (returns a short-lived upload URL), `set_project` (project-wide list), `set_document` (per-document overrides, including documents of this or an earlier project used as sources). |
| `save_version` | Structured content, findings (including those fixed in the same step), claim-to-source links, checklist results and the reference version used, for one deliverable. Validated server-side; stores the resource snapshot; renders the Word file where the step needs it and returns render issues. |
| `update_review` | `comment`, `reply`, `resolve`, `reopen`, `continue_past_issues`, `undo_continue`, `request_approval` (shows the owner's Approve confirmation; does not approve). Bound to a version number where relevant. |

Eleven tools in total. Sharing is web-only for the first release; approval needs the owner's click.

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

The prototype shows the planning choices in Project details (Part I, reference package as country and language, format), marks the reference package in the plan, and shows "Adapted from" on adapted documents (example: EX-101 D08 adapted from D06). A deliverable that has not started lists its unapproved inputs, for example "Uses D06 v1, not approved yet", and can still be run. A document's Sources and templates drawer lists "Documents from this project" (example: the protocol D01 is a source of every Part II document), and the version snapshot records which version of it was used and whether it was approved. It does not raise "Reference changed" findings or run the assistant-side approval request.

Rebuild with `python3 prototype/source/build.py`. The prototype is a design reference, not production code: the production app should be written fresh against the data model above, reusing Pipeline's components.

## 11. Open questions

- Should editors be allowed to share further? Currently owner only.
- Should a shared person see the rest of the plan greyed out for context? Currently they see only what is shared.
- Exact host support for a widget posting the next loop message in Claude and ChatGPT.
- Exact permission prompting per host for read-only and write tools, which the tool split in section 7 is designed around.
- Price and trial for the Team plan beyond €49 per month.
