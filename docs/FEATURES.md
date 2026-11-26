# TrialAgents CTIS: features

TrialAgents CTIS helps a regulatory team prepare a CTIS clinical trial application with Claude or ChatGPT. The assistant writes and checks the documents. TrialAgents keeps the plan, records which sources and templates were used, lets people review, and holds the approved files.

This file describes what the product does, in plain English. The technical design is in [TECHNICAL.md](TECHNICAL.md). The clickable prototype is [prototype/TrialAgents-CTIS.html](../prototype/TrialAgents-CTIS.html).

## How it works in one paragraph

You ask Claude or ChatGPT to prepare a submission. The assistant uses the TrialAgents submission requirements to propose a plan: every document the submission needs, per country and language. The plan opens in the workspace straight away; ask for changes in the chat, then tell it to start. The assistant takes each document through the agreed steps (by default Draft, Checklist, Source QC, Style), one document at a time, top to bottom. Where a person is needed it leaves that document waiting and moves on to the next. You review the final document, comment where something is wrong, and approve it. Approved documents can be downloaded together.

## Where things are

The app has the same layout as TrialAgents Pipeline: a dark header, a sidebar on the left and the page on the right.

- **Header:** the TrialAgents CTIS name, a button to show or hide the sidebar, and buttons to open the workspace in Claude or ChatGPT.
- **Sidebar:** Projects, Sources, Templates, Settings, and your account at the bottom.

## Projects

A project is one CTIS submission. One project has one document plan. A new submission, such as an amendment, is a new project. You can create it by duplicating an existing one.

The Projects page shows:

- Three summary cards: active projects, final documents approved, and documents needing action.
- Your projects, with countries, how many final documents are approved, how many documents need action, the number of sources, the owner and the last update.
- **Shared with you:** projects other people shared with you, with who shared them and what access you have.

For each project you can:

- **Open it** to see its document plan.
- **Edit its details:** name, study code, sponsor, EU CT number (once CTIS assigns it), member states, and the sources and templates used for the whole project.
- **Duplicate it.** The copy keeps the details, the sources and templates and the document plan with its current drafts. Approvals, comments and sharing are not copied.

Member states are chosen from a searchable list of all countries in CTIS: the 27 EU countries plus Iceland, Liechtenstein and Norway.

## The document plan

The plan is a table. Each row is a document. Each column is a step. The last column, pinned on the right, is the final document.

- Documents are grouped into **Part I** (shared across countries) and **Part II** per country.
- Under the project name you see the sponsor, the countries as two-letter codes, and links to the project's sources and templates.
- **Filters:** part, country, language.
- **Edit steps:** add, remove, reorder or pause steps for the whole plan. A paused step does not run for any document until you resume it.
- **Download all:** downloads the latest approved version of every final document as one ZIP file.

### What each step shows

Each cell shows the status of one deliverable, with its version (for example "Done v2"):

| Status | Meaning |
|---|---|
| **Done** | The step finished and nothing is open. |
| **Action required** | Something needs a person: missing data, conflicting information, a decision, or an open comment. |
| **Waiting** | The step has not run yet, or an earlier step needs action first. |
| **Not applicable** | The step is not part of the plan for this document, for example drafting the protocol, which comes from the team. This is set in the plan, not in a document. |

The final document column shows **Approved v1**, **Awaiting approval** or **Waiting**. When a newer version of the last step exists, the approved version stays in the final column until the new one is approved.

Hovering over a status underlines it. Clicking opens that deliverable.

## Opening a deliverable

A deliverable is one document at one step, for example the German consent form after Source QC. Every deliverable has a short code you can quote to the assistant, for example **D04-QC** (document D04, step Source QC). The code is shown next to the document name when the deliverable is open.

**At the top:**

- Status, step, language and version.
- A link such as "4 sources · 4 templates" that opens the sources and templates for this document.
- **Download**, **Versions**, and **Invite**.

**In the middle:** the full document on the left and the review panel on the right. In Source QC, pointing at a sentence shows the source passage it relies on.

**At the bottom:**

- **Ignore and continue** (only when action is required): lets the next step run. The issues stay open and the status stays "Action required". It applies to this version only, and **Undo** reverses it.
- **Revise:** asks the assistant for a new version. It always sends your open comments, any changes to the document's sources and templates, and the version being revised. Without comments or changes, the assistant asks what you want changed.
- **Approve final document** (only on the last step, only for the owner).

A step that has not run yet shows no content, only what it is waiting for and a link to the step that blocks it.

### Comments

- Select any text, including the title and headings, and choose **Comment**.
- Findings from the assistant and comments from people share one numbered list per deliverable (#1, #2 …).
- You can reply, mention someone with @, resolve and reopen. When mentioning, you can also invite someone new.
- An open comment makes the deliverable "Action required".

### Versions

**Versions** lists every version with who made it, through which assistant, and when. You can restore any earlier version. Restoring creates a new version, so nothing is lost.

### Sources and templates of a document

The link at the top opens two lists:

- **Used in this version:** a fixed record of exactly what was used when this version was made. It never changes.
- **For the next run:** starts from the project's sources and templates. You can add or remove items for this document only. The project is not changed.

## Sources and Templates pages

Every document an assistant uses is recorded here by name, version and date, and linked to the projects that use it. Storing a copy of the file is optional.

- **Sources** are study documents: protocol, amendments, investigator's brochure, manuals and other source documents.
- **Templates** are writing templates, checklists, Word layouts and SOPs. TrialAgents' own default templates and country rules apply automatically and are not listed.

Each record shows its name, type, version and date, the projects that use it, the file (click to download, open the link, or "—" if only the name is recorded), who recorded it and how many deliverables used it.

The version and date are filled in by the assistant from the document when it records it. You can correct them.

A record cannot be removed from a project on these pages. You remove it in the project's details, where the change is logged. Deliverables that already used it keep their record.

## Sharing

Using the app for your own projects is free. Sharing with other people is part of the **Team plan (€49 per month)**. Until then, every Invite button leads to Billing.

- You can share **one deliverable**, **one document** (all its deliverables) or a **whole project**.
- For each item you choose **Can comment** or **Can edit**. Can edit also lets them ask their own assistant for revisions.
- Access starts immediately. There is nothing to accept, so you can mention them right away.
- You invite from a deliverable, from Settings → Team, or while mentioning someone in a comment.
- Settings → Team lists everyone you share with, what they can see, their access, and whether they have opened it. You can change access per item, share more, stop sharing an item or remove them.

### What someone you share with sees

- The project appears under **Shared with you**.
- They see only what is shared: one document's row, or one deliverable, or the whole project.
- They see sources and templates only when the whole project is shared.
- With **Can comment** they can read and comment. With **Can edit** they can also use Revise and Ignore and continue.
- Only the owner can share further and approve final documents.

## Settings

| Tab | What it holds |
|---|---|
| Personal | Your profile, password, and the connection to Claude and ChatGPT. |
| Team | People you share with (owner only). |
| Logs | Everything that happened, filterable by project, person, document and text. |
| Billing | The Team plan (owner only). |
| Notifications | Email notifications for drafts, findings, comments, accepted invitations, approvals and changed sources. |
| Support | Contact form and links. |

## What the assistant does

- Proposes the plan from the TrialAgents country rules and your answers.
- Runs each document through its steps, document by document, Part I first.
- Records every source and template it uses, by name and version.
- Stops when a person is needed and continues when the issue is resolved or set aside.
- Revises on request, using the comments and the current sources and templates.
