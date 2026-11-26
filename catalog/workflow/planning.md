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
2. Read the submission requirements for Part I and each member state with `read_ctis_catalog`. Apply rows whose `submission_types` match. A conditional row applies when its condition is true for this study; say which conditions you assumed. If a country has no requirements in the catalog, plan from your knowledge of CTIS and national practice and say so in the plan summary.
3. One document per row and per `per` value: `trial` once, `population` once per population, `site` once as a site template unless the user wants one per site. Participant-facing documents need each language the country requires.
4. Name documents in plain words ("Participant information and consent – adults"). Codes are D01, D02, … in plan order: Part I first, then each country. Filenames follow `<study code>_<short type>_<country>_<language>[_<variant>]`, for example `EX101_ICF_DE_de_ADULT`.
5. Set each document's `doc_type` to the catalog document type when one fits, so the right content guide and Word template are used.
6. Steps: Draft, Checklist, Source QC, Style, unless the user asks otherwise. Add Team review or Internal guidelines only when the user wants them. Mark a step not applicable where it makes no sense, for example Draft for a document the team supplies (the protocol itself).
7. Save with `save_ctis` (`save_plan`). The plan opens in the workspace. Summarise it in a few lines: documents per part and country, assumptions, and anything the catalog did not cover. Do not start drafting until the user says to start.
