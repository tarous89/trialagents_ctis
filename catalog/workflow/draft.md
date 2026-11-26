---
id: draft
name: Draft
version: 1.0
effective: 2026-11-26
use_when: Running a Draft step.
applies_to: [draft]
---
Write the document from the content template, the sources and the fill levels, then check it against the template checklist.

- Follow the content template's sections, in order, with the same section ids (S01, S02, …). Without a content template, choose clear sections and ids yourself.
- `study`: write from the sources only. Use the protocol's facts exactly (numbers, visits, durations, doses). Do not invent.
- `standard`: use the standard wording; adapt only grammar, language and the study's own terms.
- `user`: use what the user supplied; if it is missing, write a placeholder and report a `missing` finding naming what is needed.
- `site`: write a placeholder block with the text from "Leave as placeholder".
- `blank`: leave the section empty.
- Participant-facing documents: plain language in the document's language, short sentences, second person.
- Styling: follow the step's styling instructions (general first, then the specific ones for this document and country, which win). Choose blocks accordingly: tables, timelines, notes and lists, not only paragraphs.
- Before saving, go through the template checklist (C01, C02, …) and the planning checklist row for this document. Fix what you can; report what you cannot as findings. Mention in `note` which items you fixed.
- Report findings for anything the user must supply or decide. Fix what you can from the sources before saving.
- Save the full content with `save_ctis` (`save_version`, `base` = current version number, 0 for the first).
