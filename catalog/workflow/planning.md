---
id: planning
name: Planning a submission
version: 1.0
effective: 2026-11-26
use_when: Before saving or changing a project's document plan.
applies_to: [planning]
---
Goal: one plan that lists every document the submission needs, per part, country, language and variant, and the steps each goes through.

1. Establish the facts. Read the protocol (and any synopsis, IB or previous submission the user gives you). Confirm with the user only what you cannot find: submission type, member states, sponsor, study code, and populations (adults, minors, partners of participants, healthy volunteers).
2. Read the planning checklists for Part I and each member state, and the naming instructions, with `read_ctis_catalog`. Apply rows whose `submission_types` match. A conditional row applies when its condition is true for this study; say which conditions you assumed. If a country has no planning checklist in the catalog, plan from your knowledge of CTIS and national practice and say so in the plan summary.
3. One document per row, per `variants` entry and per `per` value: `trial` once, `population` once per population, `site` once as a site template unless the user wants one per site. Participant-facing documents need each language the country requires.
4. Name every document by the naming instructions (and the country's naming rule where there is one): its regulatory `code` (for example `L1_SIS-ICF`), `variant` (for example `adults`), name and filename. Plan rows are numbered D01, D02, … in plan order: Part I first, then each country.
5. The `code` and `variant` select the content template and styling instructions for each document, so use the codes from the planning checklist.
6. Steps: Draft, Source QC, Style, unless the user asks otherwise. The Draft step already checks the content template's checklist. Add Checklist, Team review or Internal guidelines only when the user wants a separate step for them. Mark a step not applicable where it makes no sense, for example Draft for a document the team supplies (the protocol itself).
7. Save with `save_ctis` (`save_plan`). The plan opens in the workspace. Summarise it in a few lines: documents per part and country, assumptions, and anything the catalog did not cover. Do not start drafting until the user says to start.
