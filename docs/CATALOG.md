# TrialAgents CTIS: content catalog

The catalog is the content TrialAgents maintains and serves to Claude and ChatGPT through the MCP. It is separate from the app: the app stays generic (projects, plans, steps, versions, review), and everything specific to CTIS, countries or document types lives here, so it can be updated without a new app or plugin release.

The assistant decides what the submission needs. The catalog gives it labelled material to use when it fits. When nothing in the catalog fits, the assistant works from the sources and its own knowledge and says so in the step output.

## 1. Categories

There are four categories. The first three are per submission content and are provided by TrialAgents (you). The fourth is how the assistant works and is maintained with the app.

| Category | One item per | Answers | Used in steps |
|---|---|---|---|
| **Submission requirements** | Part I (one item) and each member state (one item each) | Which documents are needed, when, in which language, with which national rules | Planning, Checklist |
| **Content guide** | Document type, optionally a country or language variant | What goes in the document: sections, what each must say, standard wording, what is filled for the study vs left for the site, checklist items | Draft, Checklist, Source QC |
| **Word template** | Document type, optionally a country or language variant | The final .docx to populate. Either a TrialAgents **layout** (styled template) or an authority **form** (filled as is, never restyled) | Style / Fill form |
| **Workflow guide** | Step type, plus planning and revision | How to plan, draft, check, run Source QC, fill Word, revise and report findings | All steps |

Users can add their own items of the same kinds (a sponsor content guide, an SOP checklist, a company Word layout). Theirs are recorded in the Templates registry; TrialAgents catalog items are not listed there but are recorded in each version's "Used in this version" snapshot.

## 2. Submission requirements

One file for Part I and one per member state. Each lists documents as rows:

| Field | Example |
|---|---|
| `doc_type` | `participant-information-consent` (links to the content guide and Word template) |
| `name` | Participant information and informed consent form |
| `part` | `I` or `II` |
| `required` | `always` · `conditional` · `optional` |
| `condition` | "When minors are enrolled", "Substantial modification affecting Part II" |
| `submission_types` | `initial`, `substantial-modification`, `additional-msc`, `transition`, … or `all` |
| `languages` | `de`; or "national language(s), English accepted for documents not intended for participants" |
| `per` | `trial` · `site` · `population` (one document per site, per population, …) |
| `national_notes` | Signatures, fees, formats, upload location in CTIS |
| `authority_form` | Reference to a Word template of kind `form`, if the authority prescribes one |
| `reference` | Link to the authority page or legal basis, and the date it was checked |

Submission types are open: the assistant plans any type. A row with `submission_types: all` applies to every type.

## 3. Content guide

One file per document type. Markdown with a small header, so it is easy to write and Claude reads it directly.

```markdown
---
id: participant-information-consent
name: Participant information and informed consent form
part: II
countries: [all]          # or [DE] for a German variant
languages: [all]
version: 1.0
effective: 2027-01-01
use_when: Adult participants able to consent. Use the minors guide for assent.
word_template: pic-layout  # or an authority form id
---

## S01 · Study purpose
Fill: study
Must say: why the study is done, in plain language, reading age about 12.
Sources: protocol synopsis, objectives.

## S02 · Taking part is voluntary
Fill: standard
Standard wording: "Taking part is voluntary. You can stop at any time without giving a reason…"
Check: the protocol must not contradict this (for example a mandatory follow-up after withdrawal).

## S07 · Site contact
Fill: site
Leave as placeholder: [Name, phone and address of the site study team]

## Checklist
- C01 Every section S01–S12 is present, in order.
- C02 Visit schedule matches the protocol schedule of activities.
- C03 Reimbursement wording matches the country requirements.
```

### Fill levels

Each section, field or table cell has one fill level. It decides what the assistant writes and what Source QC expects.

| Fill level | The assistant | Source QC expects | If it cannot be filled |
|---|---|---|---|
| `study` | Writes it from the sources | A source passage for every fact | Missing data (blocks) |
| `standard` | Uses the standard wording, adapted only as allowed | Standard wording reference; checks the protocol does not contradict it | Contradiction → Conflicting information (blocks) |
| `user` | Asks the user (sponsor name, insurance, contact) | User-supplied, recorded with who and when | Missing data (blocks) |
| `site` | Leaves a visible placeholder | Nothing | Not a finding. Shown as a placeholder in the document |
| `blank` | Leaves it empty | Nothing | Not a finding |

This answers documents that can only partly be completed centrally (for example forms where only the study title and code are known): their content guide marks the rest `site` or `blank`.

## 4. Word template

A .docx file (Word only; authority forms included) plus a small header:

| Field | Meaning |
|---|---|
| `id`, `name`, `version`, `effective` | Identity |
| `kind` | `layout`: TrialAgents or user styling, content is poured into it. `form`: authority form, only its fields are filled; nothing else changes |
| `doc_type`, `countries`, `languages` | Where it applies |
| `slots` | Named places to fill, matching content guide section ids (`S01` …), plus `header`, `footer`, table and cell ids |

**Preparing a template.** Put a Word content control (Developer → Rich text content control) where each section goes and set its Tag to the section id. For a form, tag each field or table cell. A template without tags still works: the server lists its paragraphs, tables, cells, headers and footers with ids and the assistant fills by those, but tagged templates are more reliable and should be the default for catalog items.

**Filling.** The assistant never handles the .docx file itself. It sends the content for each slot (paragraphs, lists, tables, images from stored files, header and footer text, repeated rows or sections, removal of optional sections) and the server writes the .docx, keeping the template's styles. Unfilled required slots come back as Missing data. See [MCP.md](MCP.md#word-files).

## 5. Workflow guides

Maintained with the app, versioned like the rest:

| Guide | Covers |
|---|---|
| `planning` | Reading the protocol, choosing submission requirements, populations and variants, document naming and codes, default steps |
| `draft` | Using the content guide, sources and fill levels; writing per section |
| `checklist` | Checking the draft against the content guide checklist and the submission requirements |
| `source-qc` | Fact-level evidence: every `study` fact gets a source passage; `standard` wording is checked for contradiction; how to quote and locate passages |
| `fill-word` | Mapping final content to template slots; forms vs layouts |
| `revision` | Using comments, source changes and the previous version; changing only what is needed |
| `findings` | The five finding types and when each blocks |

## 6. Labelling and selection

Every item carries `use_when` in one or two sentences, plus its scope fields. The MCP filters by part, country, language, document type and submission type and returns the matches with `use_when`, so the assistant can choose. Planning returns the matching submission requirements; each step's context already contains the content guide, Word template outline and workflow guide for that deliverable, so the assistant rarely has to search.

## 7. How you deliver it

Put files in `catalog/` in this repository:

```
catalog/
  requirements/  part-i.md, de.md, es.md, …
  content/       participant-information-consent.md, recruitment-material.md, …
  word/          pic-layout.docx + pic-layout.md, de-recruitment-form.docx + .md, …
  workflow/      planning.md, draft.md, checklist.md, source-qc.md, …
```

A deploy validates the files (header fields, slot ids that match content guide sections, links between items) and publishes them as a new catalog version. Plugins never change. Runs record the exact catalog versions they used.

## 8. Starting content

- Default Word layout: port the styling in `trialagents_ctis_old/server/config/ctis-defaults.json` (Arial 12, green headings, page margins, table of contents) into `word/default-layout.docx`.
- German participant information: `trialagents_ctis_old/templates/patient_information_consent_de_coded.docx` is a candidate first `layout`.
- Population and consent planning rules: `trialagents_ctis_old/server/prompts/phase1-analyze.txt` and `pop-dep-*.txt` feed the `planning` and content guides.
- Country requirements: provided by you.
