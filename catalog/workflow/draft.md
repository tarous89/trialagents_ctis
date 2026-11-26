---
id: draft
name: Draft
version: 1.0
effective: 2026-11-26
use_when: Running a Draft step.
applies_to: [draft]
---
Write the document from the content guide, the sources and the fill levels.

- Follow the content guide's sections, in order, with the same section ids (S01, S02, …). Without a content guide, choose clear sections and ids yourself.
- `study`: write from the sources only. Use the protocol's facts exactly (numbers, visits, durations, doses). Do not invent.
- `standard`: use the standard wording; adapt only grammar, language and the study's own terms.
- `user`: use what the user supplied; if it is missing, write a placeholder and report a `missing` finding naming what is needed.
- `site`: write a placeholder block with the text from "Leave as placeholder".
- `blank`: leave the section empty.
- Participant-facing documents: plain language in the document's language, short sentences, second person.
- Layout: follow the step's `layout` instructions (general design rules, then the content guide's and country's specific instructions, which win). Choose blocks accordingly: tables, timelines, notes and lists, not only paragraphs.
- Report findings for anything the user must supply or decide. Fix what you can from the sources before saving.
- Save the full content with `save_ctis` (`save_version`, `base` = current version number, 0 for the first).
