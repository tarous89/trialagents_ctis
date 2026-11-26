# TrialAgents CTIS
## Product features, user stories and backend workflows

**Product draft · 26 November 2026**

A regulatory lead can take a study from protocol to an owner-approved package while working in ChatGPT or Claude. The assistant proposes the required outputs, drafts their content and conducts the reviews the user agrees to. TrialAgents supplies the applicable resources, records each deliverable and its evidence, gives people a shared review surface, and renders the approved files.

The product has one working view per plan. Its basic unit is a **document output** for a particular scope, country, language and intended use. Each cell where an output meets a step has its own **deliverable**, versions and numbered conversations. A project can contain multiple plans.

## 1. The journey

| What the user wants | What the assistant and app do | What the user sees |
|---|---|---|
| “Prepare an initial application for this study.” | The assistant establishes the countries, application type and known study facts. The user can attach a protocol in chat, link it or save it to the project. The MCP returns applicable planning resources and identifies unanswered scope questions. | A proposed list of outputs and any decisions needed. Project sources are accessible from the header. |
| “Agree the plan with me.” | The assistant proposes Part I and country-specific Part II outputs, language and publication variants, filenames and shared steps. The user confirms or changes the proposal in chat. | One table, one row per output. Default columns are Draft, Source QC, Checklist and Style. The final document stays pinned on the right. |
| “Start with the German participant information.” | The MCP resolves the writing template, source protocol, applicable country instructions and sponsor guidance for that exact row. The assistant writes and saves the draft against their versions. | Draft changes from Pending to Ready. Opening the cell shows the full text, Download and Invite. |
| “Check this wording and tell me what needs attention.” | The assistant compares factual claims with source passages, then evaluates the applicable document and country checklist when requested. The app persists the evidence and individual findings. | The QC reader shows the full document. Hover, focus or tap a passage for its source. Click a numbered highlight to discuss the finding. Checklist opens its own itemized review. |
| “Have our reviewer check the reimbursement paragraph.” | The owner invites a reviewer to the deliverable. The reviewer highlights the exact text and posts a comment. The assistant can retrieve open threads and revise the wording when asked. | A browser link for the reviewer, a numbered thread beside the document, and a replacement version with one-step restore. |
| “Apply our Word layout and give me the package.” | The MCP resolves the applicable Word design. The renderer applies it to the agreed content. The owner inspects and approves the last applicable deliverable. | The styled file can be downloaded at once. The pinned final file becomes Ready on owner approval. Package export collects approved files and identifies omissions. |
| “We have an amendment.” | The assistant creates a new plan under the project, records the reason, carries forward relevant outputs, and identifies what should be redone. | An independently selectable plan linked to its predecessor. The previous package and its approval record remain accessible. |

## 2. User stories and acceptance criteria

| ID | User story | Acceptance criteria |
|---|---|---|
| P01 | As a regulatory lead, I want to open the same study in either assistant or the browser. | All three surfaces resolve the same authorized project, active plan, deliverables, threads and approval state. A returning user can resume at a named document and step. |
| P02 | As an owner, I want to control where the protocol and sponsor materials live. | Sources supports a saved file, an authorized external reference, or a chat-only reference. It shows the version, availability and scope. Adding a reference never silently uploads a file. |
| P03 | As a lead, I want an assistant-generated plan I can inspect and correct. | Each proposed output identifies Part I or II, shared or country scope, document type, language, use/variant, planned filename and the basis for inclusion. Conditional outputs have a reason or question. The plan can start with incomplete inputs. |
| P04 | As a writer, I want the whole submission visible in one place. | Outputs are grouped vertically by part and country. Filters cover part, country and language. Separate language, full and public variants get separate rows when applicable. The final column stays visible during horizontal scrolling. |
| P05 | As a lead, I want the workflow to match what I agreed with the assistant. | Add, reorder, omit or repeat steps. A step can apply across the plan, a filtered set or an individual output. An omitted step displays a dash. Team review can be added explicitly. Inviting a reviewer requires no workflow step. |
| P06 | As a lead, I want an amendment, revision or country change to have its own plan. | The new plan links to its parent, records scope changes and identifies carried-forward and reopened outputs. Reuse of existing content is explicit. Approval in the previous plan does not approve the new plan. |
| R01 | As a writer, I want the assistant to receive the right writing template automatically. | The MCP returns the matched template version, ordered sections, requested fields, repeatable blocks and drafting instructions for the output. A project-selected template is identified as such. An unavailable match is visible. |
| R02 | As an owner, I want my protocol, templates, local manuals, SOPs and Word designs to be usable in every relevant step. | I can register a resource once, scope it to a project, country, language, document type or step, and replace it with a new version. The assistant receives applicable resources and access instructions at run time. |
| R03 | As a regulatory resource maintainer, I want to update a template or rule once. | Publishing a catalog version records its applicability, origin and effective date. New runs resolve current applicable versions. Saved reviews retain the versions actually used. A later update can identify affected outputs. |
| D01 | As a writer, I want to draft in chat or start from an existing document. | The assistant can save structured sections, paragraphs, tables and figures, or register user-supplied content. Missing values remain explicit. A saved draft can be previewed, downloaded or sent for review immediately. |
| D02 | As a lead, I want to run a step on one output or on several and see progress. | Each run reports started, saved or failed events. A transient activity indicator shows the current work. The persistent status capsules are Pending and Ready. A failure identifies the affected output and supports retry without duplicating completed work. |
| Q01 | As a reviewer, I want to check a factual claim against the exact evidence used. | The QC deliverable contains the full reviewed content and claim-to-passage links with source title, version and locator. The sidebar shows an authorized excerpt or reports that the source must be supplied. A missing or contradictory source opens a numbered finding. |
| Q02 | As a country lead, I want to know whether this particular document meets the checklist that applies to it. | The checklist combines applicable shared, document-specific, country-specific and sponsor items. Each result has an item ID, provenance, outcome, evidence or an explicit gap. Unassessed items remain visible. |
| Q03 | As a lead, I want to compare related documents or versions where that adds value. | An optional comparison step names both versions and links discrepancies to the corresponding passages. A plan-level checklist can cover missing language or publication variants and other cross-output dependencies. |
| Q04 | As an owner, I want to know whether a saved review still reflects its inputs. | An observed change to a referenced version identifies the affected deliverables. I can inspect the change and ask for a rerun. The app distinguishes an unavailable external source from a verified version change. |
| C01 | As a reviewer, I want to comment on exactly what I am looking at. | Selecting text exposes Comment. A range can cross headings, paragraphs or table cells. A figure or selected region can carry a thread. A full-document comment is available when the issue has no precise anchor. |
| C02 | As a teammate, I want one stable reference I can quote in chat. | AI findings and human comments share numbering within each deliverable, starting at #1. Replies keep the number. Copy includes plan, output, step, version and thread number. Resolve and reopen preserve the conversation. |
| C03 | As a reviewer, I want familiar discussion controls. | A near-full-screen reader places the full output beside sources and comments. Reply, mention, resolve and copy have labeled icons and tooltips. Mentions offer people with access. A mention never grants access. |
| C04 | As an owner, I want to invite a colleague whenever judgment is needed. | Invite sits beside Download on every step, including the final deliverable. The recipient can open that deliverable in a browser and view or comment according to the grant. The comments panel has no invitation flow. |
| V01 | As a writer, I want to revise without accumulating files. | Rerunning a step atomically replaces its current version and retains only the immediate predecessor for restore. Restoring consumes that restore point. Thread IDs persist. Changed or missing anchors are labeled as earlier wording. |
| F01 | As an owner, I want a consistently formatted Word file. | The style step uses the selected version of a predesigned DOCX and fills it with the selected content version. The output respects supported styles, tables, figures, headers and footers. Clean export excludes review overlays and private comments. |
| F02 | As the owner, I want final readiness to represent my approval. | A ready draft, finished QC or successful Word render alone cannot release the file. Only the authenticated owner can approve the last applicable deliverable and its linked output version. The record names who approved, what and when. |
| F03 | As a submission lead, I want a usable package and a clear account of its contents. | Every step offers download of its available deliverable. Package export uses selected, owner-approved final versions with their planned filenames, grouped by part/country. A manifest identifies version, language, variant, approval and omitted outputs. |
| A01 | As an owner, I want to reconstruct what happened without maintaining a second tracker. | The event record links plan changes, resource versions, runs, comments, invitations, revisions, restores, approvals and exports to actor, time and scope. Event history can be retained independently of old document binaries. |

## 3. What the MCP must deliver dynamically

The assistant starts with a project or prospective plan scope. For each step it sends the plan, output and step IDs. The server derives the authorized project, countries, part, document type, language, intended use, submission type, effective date and selected overrides. Changes to the catalog or project materials therefore take effect through the same tool calls in both hosts. The plugin instructions describe how to request and use resources. Template text, checklists, country rules and Word files live in versioned resources.

| Resource | What the MCP returns | Where it is used |
|---|---|---|
| Planning requirements | Applicable output definitions, conditional triggers, languages, variants, naming pattern and source reference. Comparable trials can be returned separately as examples. | The assistant proposes what is needed and explains open scope decisions. |
| Writing template | Document-specific outline or JSON schema with stable section IDs, repeatable blocks, required content, instructions and version. Can be a catalog template or a project template. | Draft, translation/variant preparation, revision. |
| Study evidence | Protocol, amendments, manuals and annexes as authorized passages, file handles or explicit requests to reattach material. Include version and stable locators where available. | Draft, QC and cross-document comparison. |
| Sponsor and country instructions | Applicable project guidelines, internal SOPs, local wording and approved exceptions, each with scope and provenance. | Draft, checklist and optional internal-guideline review. |
| Checklist | Applicable items assembled across document type, country, language, variant, sponsor and package scope. Return item IDs, applicability condition, evaluation instruction and source/version. | Document and country checklist; optional final package review. |
| Word design | Exact version of the predesigned DOCX, a renderer-compatible handle, and a binding map from semantic content blocks to content controls or named slots. A project Word file can override the catalog design. | Style and final Word generation. |
| Prior work and feedback | Current deliverable, permitted previous version, numbered open threads, decisions and linked peer versions. | Revisions, amendments, follow-up QC and comparisons. |

**Matching.** Resolve catalog and project resources independently for each output. A sponsor’s selected writing template or Word design can replace the default for that purpose. Applicable checklist obligations accumulate. Equivalent items retain all contributing references. Conflicting instructions keep both sources and surface a question. A template in another language or from another country requires an explicit fallback choice.

**Return contract.** Each match includes resource ID, version, type, title, origin, scope, applicability reason, effective date where applicable, access mode and a retrieval handle. The step bundle has a stable manifest ID and identifies missing, incompatible or ambiguous resources. Structured resources can be read in full or by section. Large source files and DOCX binaries travel by authorized file handle or short-lived download rather than being inserted into the prompt. Pin the resolved manifest to the run.

**Chat-only and local files.** The MCP dynamically supplies the reference and its availability. When the bytes exist only in the current chat or on the user’s machine, the assistant asks the user to provide the relevant file or passage. The user chooses whether to retain an excerpt, a locator, or the full source. A colleague sees only evidence they have permission to read. The same rule applies to locally retained deliverables. An owner can register their version and fingerprint, then supply the exact file for team preview, QC or export.

## 4. Backend workflow and proposed MCP operations

These operation names describe a proposed contract. The prototype uses illustrative data. GitHub would hold the application, resource schemas and rendering code. Render would host the authenticated web/MCP service and worker. PostgreSQL would store scoped records and events. Private object storage would hold the files users elect to retain.

| Operation | Backend behavior and return value |
|---|---|
| `open_project`, `register_resource` | Resolve user and project membership. Register an upload, permitted link or chat-only reference. Record resource version and scope. Return its ID, access mode and availability. |
| `get_planning_resources`, `save_plan` | Resolve planning rules for the supplied study scope. Accept the assistant’s proposed outputs and ordered steps. Validate output identity, filenames and resource references. Save the agreed plan or create a linked successor. |
| `get_step_context`, `read_resource` | Resolve the resource bundle in section 3 and the precise input versions. Return available blocks, checklist items, evidence locators, Word layout handle, open threads and gaps. Recheck authorization on retrieval. |
| `start_step`, `save_deliverable` | Start an individual run or a scoped batch. Return a run ID and expected current revision. The assistant submits content, QC annotations or checklist results. Validate the step’s deliverable contract, then commit the output, version, dependencies and progress event together. |
| `get_review`, `list_threads`, `update_thread` | Return permitted passages, anchors, thread histories and review findings. Create, reply, mention, resolve or reopen against a deliverable ID. Allocate its next thread number transactionally. |
| `render_word` | Resolve the pinned Word resource through the MCP resource service, validate its bindings, merge the current structured content, and return a styled artifact ID, checksum, preview and planned filename. |
| `restore_previous`, `approve_final` | Restore only the immediate predecessor. Bind final approval to plan, output, final step, last deliverable revision and downloadable artifact. Require a direct authenticated owner action for approval. |
| `invite_to_deliverable`, `manage_invite` | Apply the same sharing service used by the toolbar. Return pending, accepted, expired or revoked invitation state. A request to list or mention users does not send an invitation. |
| `export_package` | Recheck access, approvals and file availability at export. Build the ZIP and manifest from pinned versions. Report missing local files, unavailable versions and excluded outputs. |

**Step execution.** The app guides the assistant by returning the agreed next step, instructions, input manifest, expected response schema and explicit skip/rerun options. The assistant performs interpretation, drafting and semantic review. The server validates the submitted structure, checks accessible evidence locators, generates the Word file and records the result. A completed QC run may identify serious findings and still yield a Ready QC deliverable. A fabricated or inaccessible citation cannot be displayed as verified evidence. A human can inspect the actual passage and judge whether it supports the claim.

**Retries and concurrent edits.** Use a run idempotency key and expected revision for writes. If another reviewer or assistant has replaced the input, return the current revision for reconciliation. A failed run keeps the last successful deliverable available. Both chat hosts and the browser read the same event stream or poll from the last observed revision. A partial batch can retry only failed rows.

**QC and checklist contracts.** QC returns the full reviewed document, its exact input version and claim-level annotations. Each factual claim in scope has supporting passage references or an explicit missing/conflict/decision finding. An annotation stores block/range or figure coordinates, quoted text where permitted and source version/locator. Checklist results return one record per resolved item, with met, unmet, needs decision or not applicable, rationale and evidence where available. These are item outcomes. The plan still has only Pending and Ready. Save a skipped review as an explicit plan choice. A completed final package checklist remains a separate step if the user includes it.

**Rendering and approval.** The assistant supplies structured content. The renderer fills predesigned Word slots using the layout’s styles and repeatable sections. Missing bindings, incompatible templates or lost tables/figures produce a visible render issue and preserve the prior artifact. Replacing or restoring the approved last deliverable, changing the bound output, or changing which step is last invalidates final readiness. If styling is omitted, the owner approves the actual deliverable and format selected for export. Record the precise format in the plan.

### Invitation lifecycle

1. **Choose scope.** From the deliverable toolbar, the owner chooses Invite beside Download, enters an email and selects Can view or Can comment. The dialog names the project, document and step. Proposed default scope is this deliverable and its revisions. Team access can follow the existing TrialAgents team entitlement.
2. **Issue.** The backend authenticates the inviter, verifies sharing rights and entitlement, normalizes the address, creates or reuses a pending invitation, and binds it to the deliverable and role. Store a digest of a single-use expiring token. Send a browser link without document contents in the email. A retry can resend without creating duplicate grants.
3. **Accept.** The recipient opens the link in a browser, signs in or verifies the invited address. The backend checks recipient, scope, expiry and revocation, then atomically consumes the token and creates the grant. A returning recipient opens the same deliverable. A reviewer needs no ChatGPT or Claude account.
4. **Collaborate.** Viewers can read the shared output. Commenters can add anchored threads, reply, mention authorized teammates and resolve conversations. Shared evidence is shown only within its own access rules. Thread references remain scoped to the deliverable. A reviewer cannot release the final file.
5. **Manage access.** The owner can inspect invitations, resend a pending one, change a role or revoke access. The server enforces the current grant on every read, comment, resource fetch and download. Access to previously downloaded copies cannot be withdrawn. Record acceptance and revocation in the event history.

### Numbered alerts

| Type | Origin | Icon and color | Example |
|---|---|---|---|
| Missing data | Assistant | Incomplete document · amber | The recruitment text lacks a local contact or a factual claim lacks supporting evidence. |
| Conflicting information | Assistant | Opposing arrows · red | Draft promises €50 per visit. The source permits reimbursement up to €50 for documented expenses. |
| Decision needed | Assistant | Branching arrows · purple | Two wording options fit the available evidence. The country lead must choose. |
| Open comment | Human | Speech bubble · blue | A reviewer asks for a change to selected text or a figure. |
| Source changed | App | Circular arrow · slate | The referenced draft or source has a newer known revision than the one used in QC. |

Every alert has a text label as well as an icon and color. AI and human discussions use the same numbering. Persist a stable finding identity so retries and repeat checks can reuse the relevant thread. Retain its earlier version and anchor if wording moves. An ordinary comment never automatically blocks release. The owner makes the release decision with open findings visible.

## 5. End-to-end acceptance examples

- **One document, two countries.** Two participant information outputs request different bundles. Each gets the correct language, local checklist, applicable source references and Word layout. If one translation template is absent, only that output reports the gap.
- **Sponsor substitution.** A project consent outline replaces the default writing outline. A separate sponsor DOCX supplies the visual design. The applicable country checklist survives both substitutions. The manifest identifies the versions actually used.
- **The €50 discrepancy.** QC links the draft sentence to the exact source and opens conflict #1. A reviewer replies to #1. A new comment becomes #2. Another deliverable starts at #1. Rerunning QC references the revised draft and leaves the discussion traceable.
- **Chat-only evidence.** The author can use a protocol from the current chat. A teammate opening the review sees the permitted excerpt or a clear request for access. Reopening from the other assistant never silently fabricates access to the file.
- **Late team review.** A colleague is invited directly from the styled Word deliverable, comments on a figure and mentions the owner. The plan gains no extra column. Revocation prevents further access through the link.
- **Owner release and restore.** Style is Ready while Final document is Pending. A reviewer cannot approve. Owner approval makes the pinned file Ready. Replacing or restoring its bound version returns it to Pending until the owner approves again.
- **Amendment and export.** An amendment drops a country and reopens selected outputs. The original plan remains reproducible. Export of the new plan includes only the owner-approved available artifacts selected for it and lists omissions.
- **Competing edits.** Two assistants try to save against the same revision. One succeeds. The second receives the new revision rather than overwriting it. Retrying the successful call reuses its existing result.

## 6. Decisions proposed for product sign-off

| Decision | Proposed default |
|---|---|
| What exactly does an invitation share? | The selected deliverable and its revisions. Broader project access requires a separate explicit grant. |
| Which sources can a reviewer see? | The shared output and authorized evidence excerpts. Full protocol or template access is separately scoped. |
| How do sponsor resources interact with country rules? | Sponsor writing and design templates may replace defaults. Applicable checklist items remain visible, with provenance and a recorded reason for any exception. |
| How does the owner handle open findings? | Present outstanding findings at approval. The owner may approve with a recorded rationale. A missing or mismatched final artifact prevents approval. |
| What belongs in the final package? | Selected owner-approved final files plus a manifest. Review conversations and source overlays stay in the workspace. |
| What does the first release connect to? | ChatGPT, Claude and the browser share one backend. The package is downloaded for the user to upload to CTIS. Direct CTIS submission would be a separate integration. |
