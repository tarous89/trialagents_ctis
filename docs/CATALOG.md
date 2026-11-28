# TrialAgents CTIS: content catalog

The catalog is the content TrialAgents serves to Claude and ChatGPT through the MCP. The app stays generic: projects, plans, steps, versions and review. Everything specific to CTIS, countries and documents lives here, so it can be updated without a new app or plugin release.

The assistant decides what the submission needs. The catalog gives it labelled material to use when it fits. When nothing in the catalog fits, the assistant works from the sources and its own knowledge and says so.

Everything uses regulatory naming: the Annex I section letter and number and a short name, for example `K1_recruitment-arrangements` or `L1_SIS-ICF`, then the variant and the country where there is one: `L1_SIS-ICF_adults_ES`.

## 1. What the MCP provides

| Item | Folder and file | One per | Used for |
|---|---|---|---|
| **Planning checklist** | `planning/Part-I.md`, `planning/DE.md`, … | Part I (all member states, with the national-language versions some require), and each member state | Which documents a submission needs, by regulatory code, when, in which language and variants, with national notes and an optional country naming rule |
| **Naming instructions** | `planning/naming.md` | One | Codes, variants, names and filenames of documents |
| **Content template** | `content/L1_SIS-ICF_adults_ES.md` | Regulatory document, optionally per variant, country and language | What the document says: sections, fill levels, standard wording, and its **template checklist** |
| **Styling instructions** | `styling/K1_recruitment-arrangements_DE.md` (+ `.docx`), `styling/L1_SIS-ICF.md` | Regulatory document, optionally per variant, country and language | How the document looks: an authority form filled as is, or a layout, plus written styling rules |
| **Workflow guides** | `workflow/…` | Step | How the assistant plans, drafts, runs Source QC, styles and revises (maintained with the app) |

Users can add their own items of the same kinds (a sponsor content template, an SOP checklist, a company Word layout). Theirs are recorded in the Templates registry; TrialAgents items are not listed there but are recorded in each version's "Used in this version" snapshot.

### Matching a document

Every document in a plan has a `code` and a `variant`, plus its part, country and language. For each document the MCP picks the most specific item: variant beats no variant, country beats all countries, language beats all languages. A plan can pin a specific item for a document. Items whose `effective` date is in the future are ignored until then.

- **Content template:** same `code`; a variant-specific template only serves that variant.
- **Styling:** the content template's `styling`, else the most specific styling with the same `code`, else the default styling.

## 2. Common header

Every file starts with a header between `---` lines:

| Field | Meaning |
|---|---|
| `id` | The file name without `.md`, using regulatory naming (`L1_SIS-ICF_adults_ES`). Letters, digits, `_`, `.` and `-`. |
| `name` | Readable name |
| `version` | Kept exactly as written (`2.0` stays `2.0`) |
| `effective` | `YYYY-MM-DD`; ignored until then |
| `use_when` | One or two sentences the assistant reads to decide whether the item fits |

Put a value in quotes when it contains a colon followed by a space, for example `use_when: 'Germany: Part II'`.

## 3. Planning checklist

```markdown
---
id: DE
name: Germany – Part II planning checklist
part: II
country: DE
version: 1.0
effective: 2027-01-01
use_when: Part II documents for Germany.
reference: https://… (authority page)
checked: 2026-11-20
naming: '<study>_<code>_<variant>_DE_de'
documents:
  - code: L1_SIS-ICF
    name: Subject information sheet and informed consent form
    variants: [adults, minors]
    required: always
    languages: [de]
    per: population
    national_notes: Signature blocks as a table; wet-ink signatures.
  - code: K1_recruitment-arrangements
    name: Recruitment arrangements
    required: always
---
National notes that apply to the whole country.
```

| Row field | Meaning |
|---|---|
| `code` | Regulatory code; links to content templates and styling |
| `name` | Document name |
| `variants` | Populations or versions this document comes in; empty for one version |
| `required` | `always`, `conditional` (with `condition`) or `optional` |
| `submission_types` | `initial`, `substantial-modification`, `additional-msc`, … or `all` (default) |
| `languages` | Required languages; default `all` |
| `per` | `trial` (default), `site` or `population` |
| `national_notes` | Country rules for this document, passed to the assistant with the styling instructions |
| `provided_by` | `sponsor` (supplied: checked, not drafted), `assistant` or `either` (supplied when the sponsor has it, otherwise prepared from the English document) |

Part I uses `id: Part-I`, `part: I` and `country: EU`. Submission types are open: the assistant plans any type.

## 4. Naming instructions

`planning/naming.md` (`kind: naming`) describes codes, variants, names and filenames in plain text. A country checklist's `naming` field adds or overrides a rule for that country.

## 5. Content template

```markdown
---
id: L1_SIS-ICF_adults_ES
name: L1 SIS and ICF – adults – Spain
code: L1_SIS-ICF
variant: adults
part: II
countries: [ES]
languages: [es]
version: 1.0
effective: 2027-01-01
use_when: Adult participants able to consent, Spain.
styling: L1_SIS-ICF_ES        # optional; otherwise matched by code
---

## S01 · Introducción
Fill: study
Must say: why the study is done, in plain language.
Sources: protocol synopsis, objectives.

## S02 · Participación voluntaria
Fill: standard
Standard wording: La participación es voluntaria…
Check: the protocol must not contradict this.

## S09 · Contacto del centro
Fill: site
Leave as placeholder: [Nombre, teléfono y dirección del equipo del estudio]

## Checklist
- C01 Every section S01–S12 is present, in order.
- C02 The visit schedule matches the protocol schedule of activities.
```

Recognised lines inside a section: `Fill:` (required), `Must say:`, `Standard wording:` (required for `standard`), `Sources:`, `Check:`, `Leave as placeholder:`, `Optional: yes`, `Repeat: yes`. Other lines are kept as notes.

**The template checklist** is the `## Checklist` section, when the document has one. The Draft step checks the draft against it (and against the planning checklist row) before saving, so plans need no separate Checklist step.

### Fill levels

| Fill level | The assistant | Source QC expects | If it cannot be filled |
|---|---|---|---|
| `study` | Writes it from the sources | A source passage for every fact | Missing data (blocks) |
| `standard` | Uses the standard wording, adapted only as allowed | Standard wording reference; checks the protocol does not contradict it | Contradiction → Conflicting information (blocks) |
| `user` | Asks the user (sponsor name, insurance, contact) | User-supplied, recorded with who and when | Missing data (blocks) |
| `site` | Leaves a visible placeholder | Nothing | Not a finding |
| `blank` | Leaves it empty | Nothing | Not a finding |

## 6. Styling instructions

A styling item either has its **own Word file** (a form or a layout) or adds **written instructions on top of a base** styling.

**With its own file** (`styling/K1_recruitment-arrangements_DE.md` next to `K1_recruitment-arrangements_DE.docx`):

```markdown
---
id: K1_recruitment-arrangements_DE
name: K1 Recruitment arrangements – Germany
code: K1_recruitment-arrangements
countries: [DE]
kind: form            # form: filled as is, never restyled; layout: content is poured in
file: K1_recruitment-arrangements_DE.docx
version: 2.0
effective: 2026-01-01
use_when: The authority form for recruitment arrangements in Germany.
slots:
  - {id: kv102, accepts: text, required: true, description: EU CT number}
  - {id: kv108, accepts: choice, values: ["true", "false"], description: Incapacitated adults included?}
---
Notes for the assistant.
```

**On top of a base** (`styling/L1_SIS-ICF_ES.md`, no `.docx`):

```markdown
---
id: L1_SIS-ICF_ES
name: L1 styling – Spain
code: L1_SIS-ICF
countries: [ES]
base: L1_SIS-ICF      # default: the default styling
version: 1.0
effective: 2027-01-01
use_when: L1 documents for Spain.
---
- Use a table for the schedule of visits and procedures.
- Show the treatment phases as a timeline.
- Put the data protection section in a summary box.
```

The Word file, kind and slots come from the first item in the `base` chain that has a file. The default styling (`styling/default.md` with `default-layout.docx`) is the end of every chain.

**How styling reaches the assistant** (Draft and Style steps): general instructions first, then specific ones; where they disagree, the specific one wins.

1. General: `workflow/design.md`, then the base stylings' text (default, then `L1_SIS-ICF`).
2. Specific: this document's styling text (`L1_SIS-ICF_ES`), then the planning checklist row's `national_notes`.

Authority forms get only their own notes: they are never restyled.

### Fields in a Word file

Two kinds of fields work, and a file can mix them:

- **Coded fields**, the convention of the earlier CTIS app: `{{code}}` where a value goes (`{{kv102}}`, `{{v01100}}`), and optional parts wrapped in `{{#code === "value"}}` … `{{/}}`. Conditions can combine terms with `&&` and `||`. Pre-ticked Yes/No variants work this way: one region per answer. Word may split a code across formatting runs; the server joins it back.
- **Word content controls** (Developer → Rich text content control) whose Tag is the slot id. A checkbox content control with a tag is a `checkbox` slot.

Every field is declared as a slot with a description, so the assistant knows what to write. Slots accept `text`, `blocks` (layouts only), `choice` (with `values`, for the variables tested in `{{#…}}` regions) or `checkbox`, and may have a `default`. A layout's slot with `sections: all` receives every content section in order.

**Filling.** The assistant never handles the .docx itself. It sends the content for each slot and the server writes the file, keeping the template's styles. Layout content uses blocks: headings, paragraphs, lists, tables (style `info` for the study information table), timelines, notes, images from stored files. Inline marks work in any text: `**bold**`, `*italic*`, `__underline__` and `[[missing information]]`, which is highlighted. Required slots left empty come back as Missing data findings. See [MCP.md §8](MCP.md#8-word-files).

## 7. Workflow guides

| Guide | Covers |
|---|---|
| `planning` | Reading the protocol, planning checklists, populations and variants, naming, default steps |
| `draft` | Using the content template, sources and fill levels; the template checklist; choosing blocks by the styling instructions |
| `checklist` | The Checklist step, including the readiness checks of supplied documents (S01–S07) |
| `source-qc` | Fact-level evidence; standard wording checked for contradiction; quoting and locating passages |
| `fill-word` | Filling forms and layouts |
| `revision` | Using comments, source changes and the previous version; changing only what is needed |
| `findings` | The finding types and when each blocks |
| `design` | General styling instructions for documents that are not authority forms |
| `redaction` | Redacted versions for publication: when, which documents, what to redact and keep by category, PDF choice (applies_to `redaction`) |

## 8. How you deliver it

Add or change files in `catalog/` and run `npm run check:catalog`: it lists errors with what to fix, and warnings (for example a planning checklist row with no content template yet). CI runs it on every push. A deploy publishes a new catalog release when anything changed; no plugin release is needed. Every version records the exact catalog items it used.

## 9. What is included

- `planning/naming.md`: naming instructions.
- `styling/default.md` + `default-layout.docx`: the patient information design of the earlier CTIS app (sample L1 SIS and ICF, Spain): blue title box, shaded section bands, bordered study information table, cyan highlight for missing information, blue footer rule with document details, page numbers in the document's language and the protocol and EU trial numbers. Generated by `scripts/build-default-layout.mjs`.
- `styling/L1_SIS-ICF.md`: L1 styling rules for every country, on top of the default.
- `styling/K1_recruitment-arrangements_DE.md` + `.docx`: the MedEthicsEU and CTAG recruitment and informed consent procedure template v2.0, coded, with all 29 fields described.
- Workflow guides.
- Planning checklists for 25 member states (`planning/AT.md` … `planning/SK.md`): every Part II document with its requirement, condition, languages, variants and national notes (CTIS title, signature rule, template basis, national additions), and the national rules in the body (authorities, language rules, populations and age bands, drafting rules, sources). Built from the TrialAgents country guides (reviewed 23 September 2026).
- Content templates for the participant documents of 17 countries (`content/L1_SIS-ICF_<variant>_<country>.md`, 226 in total), from the supplied national templates with the model text kept as standard wording and the country's participant-document checklist as the template checklist.
- Country styling for L1 (`styling/L1_SIS-ICF_<country>.md`) and each template's own styling (`styling/L1_SIS-ICF_<variant>_<country>_styling.md`).
- Shared EU forms for all countries: K1, N1, S1, P1, R1, M1 and M2 (`styling/<code>.md` + `.docx`), the original coded files with every field described. A country form, where one exists (for example `K1_recruitment-arrangements_DE`), is more specific and wins.
- Imported with `scripts/import_country_content.py` and `scripts/build_shared_forms.py` from the content source in trialagents_ctis (`content/`).
- `planning/Part-I.md`: the Part I planning checklist: every Part I document (CTR Annex I B–J) with its condition, who provides it, CTIS title and publication, and the national-language versions member states require (CTR Q&A v7.4 Annex II).
- To be provided: participant templates for Belgium, Croatia, Estonia, Latvia, Lithuania, Slovenia, Slovakia and Finland (Swedish); national forms that replace the shared EU forms in some countries (listed in each country's national notes).
