# TrialAgents CTIS: MCP server and Claude plugin

This file defines what Claude sees: the plugin, its one skill, the MCP tools and their permissions, the assistant loop and Word filling. It replaces the tool list in [TECHNICAL.md §7](TECHNICAL.md#7-mcp-tools). ChatGPT follows later with the same server and tools.

## 1. Goals

1. **Few permission prompts.** A user approves one write tool once ("Always allow") and can then run a whole submission. Reads are marked read-only so they can be allowed together.
2. **Claude always knows what to do next.** Every result says the next call. Every step's context comes from the server, never from chat history, so a run can resume in any conversation.
3. **People decide.** Approval, Ignore and continue, sharing and billing are not tools. Only a person can do them, in the app.

## 2. Plugin

| | |
|---|---|
| Plugin | `trialagents-ctis` |
| Skill | `ctis` (one skill) |
| MCP | `https://mcp.trialagents.com/ctis/claude` (HTTP, TrialAgents OAuth) |
| App | `https://ctis.trialagents.com` |
| Layout | `plugins/claude/.claude-plugin/plugin.json`, `plugins/claude/.mcp.json`, `plugins/claude/skills/ctis/SKILL.md`, `plugins/claude/README.md`, `.claude-plugin/marketplace.json` (as in Pipeline) |

### Skill (draft)

```markdown
---
name: ctis
description: Plan, draft, check and finalise CTIS clinical trial application documents (Part I and Part II) in a TrialAgents CTIS project. Use whenever the user mentions TrialAgents CTIS, a CTIS submission or application, a substantial modification, or asks to plan, draft, QC, style, revise or continue documents such as participant information, consent forms or recruitment material.
---

Show the workspace with `open_ctis` on the first TrialAgents CTIS request in a conversation and right after saving a plan. Start with `get_ctis_step` when the user wants to continue or revise, `read_ctis_catalog` (planning guide) when they want a new submission, otherwise `read_ctis` or `open_ctis`. Every result ends with `next`: do that next. Take everything a step needs from `get_ctis_step`, not from earlier messages. Save each step with `save_ctis` and continue with the `next` it returns until it says to stop. Never approve documents, ignore findings or share; tell the user where to do it in the app.

Where Claude shows MCP Apps (web, desktop, mobile) the workspace appears in the conversation. Elsewhere (Claude Code) answer in text and give the link the tool returns. Never build links or IDs yourself.
```

All detailed instructions (planning, steps, QC, Word, revision) come from the server, so they can change without a plugin release.

## 3. Tools

### Model tools

| Tool | Read only | Purpose |
|---|---|---|
| `open_ctis` | Yes | Show the workspace: projects, a project's plan, or one deliverable. |
| `read_ctis` | Yes | Projects, a plan with statuses, a deliverable with its versions and threads, the sources and templates of a project. Text answers without opening the workspace. |
| `read_ctis_catalog` | Yes | Search and read catalog items by regulatory code, country and language: planning checklists (Part I and each country), naming instructions, content templates, styling instructions, workflow guides. Used mainly for planning. |
| `get_ctis_step` | Yes | Everything for one deliverable, or for the next one in a project (`next: true`): see §4. With `revise: true` it returns the revision context. |
| `read_ctis_source` | Yes | Search and read passages of a stored source (protocol, IB, manuals) by text, section or page, with locators for quoting. |
| `save_ctis` | **No** | The only write tool. One `action` per call: `create_project`, `update_project`, `save_plan`, `record_resource`, `save_version`, `reply`. Returns the saved IDs, versions and `next_hint`. Its input is one flat object (Claude does not accept a top-level choice of schemas); the server checks the fields each action needs. |

Annotations: the five read tools have `readOnlyHint: true`, `openWorldHint: false`. `save_ctis` has `readOnlyHint: false`, `destructiveHint: false` (everything it writes is a new version or a new record; nothing is overwritten or deleted), `idempotentHint: true` (every call carries a `request_id`; a retry returns the first result), `openWorldHint: false`. Owners can turn on email notifications for drafts and findings; those go only to people the owner already shares with.

Why one write tool: Claude asks per tool, so each extra write tool is another prompt before anything useful happens. One `action` field with a strict schema per action is as clear for Claude as separate tools (Pipeline's `edit_pipeline_records` works the same way).

Why read tools are split: each has one clear job and its own input, which keeps Claude's calls accurate. Read-only tools cost no extra approvals.

### Not tools (people only)

Done in the app (browser or the workspace inside Claude) through the app's own API, never by Claude:

- Approve final document
- Ignore and continue / Undo as a button. In the chat, the user can ask Claude to move on past unresolved issues; see §5.
- Share, change or revoke access, invite, billing
- Delete or archive a project, restore a version, duplicate a project
- Upload files (sources, Word layouts)

The workspace inside Claude is one bundled file (an MCP App) and makes no requests to `ctis.trialagents.com`. It reads and saves through an app-only tool, `ctis_workspace_request`, on the same MCP connection, as in Pipeline. Claude keeps that tool from the model. It runs as the signed-in person and is recorded as "Claude workspace" in Logs, so people's own clicks (approve, Ignore and continue, comments) work there; creating projects and recording sources stay with the assistant. Word files download through Claude; other links open in the browser.

## 4. Step context

`get_ctis_step` returns one bundle, so Claude never needs chat history:

| Part | Contents |
|---|---|
| `deliverable` | Code (`D04-QC`), document, part, country, language, variant, step, filename |
| `instructions` | The workflow guide for this step type, plus any plan-level instruction for the step |
| `content_template` | The matching content template (by code, variant, country, language): sections, fill levels, standard wording, template checklist |
| `styling` | Draft and Style steps: the styling instructions, general first and specific last (specific wins), and for the Style step the Word file's kind (layout or form) and slots |
| `planning_checklist` | The planning checklist row(s) for this document, with national notes |
| `input` | The version this step works on (normally the previous step's current version) |
| `sources` | Effective sources and user templates, with handles for `read_ctis_source` |
| `threads` | Open findings and comments on the current version, with replies and anchored text |
| `revision` | When revising: the version being revised, open comments, sources and templates added or removed since it was made |
| `output_schema` | What `save_ctis` `save_version` expects for this step |
| `next` | What to do after saving |

## 5. The loop

**Default steps:** Draft → Source QC → Style. The Draft step checks its output against the content template's checklist (and the planning checklist row) before saving, so no separate Checklist step is needed. Comments can be added on any deliverable at any step. Optional steps the assistant can add when the user wants them: Checklist, Team review, Internal guidelines, and custom steps.

**Plan.** Claude reads the planning guide, the planning checklists and the naming instructions, then saves the plan with `save_ctis` `save_plan`. The plan opens in the workspace straight away. There is no separate confirmation: the user asks for changes in the chat (each saves a new plan revision), and says when to start.

**Order.** Part I top to bottom, then each country's Part II documents top to bottom. One document runs through all its steps before the next document starts.

**Running a step.** `get_ctis_step` (next) → do the work → `save_ctis` `save_version`. Findings Claude can fix from what it already has are fixed before saving. The save result returns `next`:

- the next step of the same document, or
- the first step of the next document, when this document reached its final step or is blocked, or
- `stop`, with a summary, when every document is final or blocked.

**Running a step needs its input.** A step works on the current version of the step before it, so that step must have a version.

**Moving on when the user asks.** The loop never runs past unresolved issues on its own. If the user asks Claude to go to the next step anyway, Claude first tells them what is unresolved, then saves with `continue_past: true`. The server records an Ignore and continue on the earlier step for its current version (logged as asked in the chat), and the new version lists those unresolved issues so they stay visible. Without `continue_past` the save is refused with the list of what needs action.

**What blocks a document.** Any unresolved finding or comment on the current version: missing data, conflicting information, decision needed, open comment (from a person or the assistant), source changed. The loop then moves to the next document, so as much work as possible gets done. A person unblocks with **Ignore and continue** (this version only) or by resolving, or asks Claude to revise.

**New versions do not cascade.** Revising D04 Draft to v2 does not rerun D04's later steps or other documents. Later steps that were based on v1 show "Source changed" until the user asks to rerun them.

**Conversations.** The loop runs inside the conversation. Each step re-reads its context from the server, so a long run does not depend on what is earlier in the chat; Claude compacts older messages as needed. If the conversation ends (closed, out of context, interrupted), the progress is already saved. In any new conversation, "continue EX-101" calls `get_ctis_step` with `next: true` and resumes at the right place. The workspace also shows **Continue**, which posts that message into the chat where the host allows it.

Starting a fresh conversation for every step is not possible: neither Claude nor ChatGPT lets a plugin open new chats. It would need TrialAgents to run the model itself (unattended runs), which is out of scope for the first release.

## 6. Source QC

Fact by fact, per [CATALOG.md fill levels](CATALOG.md#fill-levels):

- Every `study` fact links to a source passage: source record, version, locator (section, page, table) and the quoted passage.
- `standard` wording links to the content template and is checked against the protocol. A contradiction is **Conflicting information**.
- `user` values record who supplied them and when.
- `site` and `blank` items are placeholders, not findings.
- A fact without a passage is **Missing data**.

## 7. Revision

`get_ctis_step` with `revise: true` returns the version being revised, open comments with replies and anchored text, changes to the document's sources and templates since that version, and the step instructions. Claude sends back only the changed sections (`save_version` with `changes`: section id → new content, plus which threads each change answers). The server builds the new version from the previous one and the changes, keeps the rest unchanged, and shows what changed. With no comments and no changes, Claude asks what to change.

When Claude says a change answers a comment, the server adds Claude's reply to the thread and resolves it; anyone can reopen it. Findings on sections the revision did not touch carry over to the new version; findings on changed sections are closed unless Claude reports them again (a finding reported with the same key keeps its thread and number).

## 8. Word files

The Style step fills the Word file of the document's styling: an authority form (for example `K1_recruitment-arrangements_DE`), a layout (the default L1 design), or the user's own layout.

- `get_ctis_step` returns the styling: its instructions (general first, specific last) and the Word file's slots with their descriptions. Slots are coded fields (`{{kv102}}`), yes/no choices that keep or remove parts of a form, checkboxes, and for layouts the title, subtitle, body, footer and page words.
- Claude sends `save_version` with the content and `fill`: a value for each slot. Layout content uses blocks (headings, paragraphs, lists, tables, timelines, notes, images from stored files) and inline marks (`**bold**`, `__underline__`, `[[missing information]]`).
- The server writes the .docx, keeps every style of the template, stores it on the version (`<filename>_v<n>.docx`) and reports required slots left empty as Missing data findings.
- An authority form (`kind: form`) is never restyled: only its fields, choices and checkboxes change.

Why the server writes the file rather than Claude: Claude can only edit a .docx inside its code sandbox, whose network access is restricted by default, so it cannot reliably fetch the template from TrialAgents or send the result back. Passing a .docx through a tool call as text costs tens of thousands of tokens per document and breaks on large files. Having Claude decide the content and the server write the file gives the same result in Claude and ChatGPT and leaves authority forms intact. Claude still controls every part of the document (header, footer, tables, images, sections) through the slots.

**User layouts and sources.** Uploaded in the app: on the Templates or Sources page, or from the workspace inside Claude. Storing the file is the default; a user can choose name only. If a file is only attached in the chat, Claude reads it there, records it by name and version with `record_resource`, and tells the user that uploading it in the workspace lets later runs (and other conversations) use it.

## 9. Workspace inside Claude vs browser

| Action | Workspace in Claude | Browser |
|---|---|---|
| Header button | **Open TrialAgents app ↗** | **Open in Claude**, **Open in ChatGPT**: open the plugin's directory page |
| New project | Posts "Start a new TrialAgents CTIS project." into the chat | Offers Claude or ChatGPT (no form) |
| Revise | Posts "Revise D04-QC …" into the chat | Disabled, tooltip "Available in Claude or ChatGPT" |
| Continue the loop | A **Continue (next deliverable)** button posts "Continue the TrialAgents CTIS plan for EX-101 …" into the chat | Not shown: runs start in Claude or ChatGPT |
| Comment, reply, resolve | Yes | Yes |
| Ignore and continue, Approve, Share, Download, Versions, Restore, Duplicate, Upload | Yes | Yes |

Empty states point to the assistant first.

| Downloads | Word files download through Claude; Download all and source files open in the browser | Direct downloads |
| Uploads | Up to 8 MB (larger files in the browser) | Up to 25 MB |

## 10. Open points to verify on the hosts

- Posting a message from the workspace into the chat (MCP Apps message request in Claude; `sendFollowUpMessage` in ChatGPT) on web, desktop and mobile.
- File upload from inside the workspace iframe (allowed connect domains for `ctis.trialagents.com`).
- How Claude groups read-only tools in its permission settings.
