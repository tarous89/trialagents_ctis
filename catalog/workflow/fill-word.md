---
id: fill-word
name: Style (fill the Word template)
version: 1.0
effective: 2026-11-26
use_when: Running a Style step.
applies_to: [style]
---
Put the final content into the Word template returned with the step. Do not change the wording that passed Source QC. Apply the step's `layout` instructions; the specific ones win over the general design rules.

- The step context lists the template's slots. For a layout with a `body` slot that takes all sections, the server pours the sections in order; you only fill `title`, `header` and `footer`, and may adjust headings, lists and tables for the layout.
- For a template with one slot per section, map each section to its slot by id.
- For an authority form (`kind: form`), fill each field with plain text only, and answer each `choice` slot with one of its values (it keeps or removes parts of the form, for example ticking Yes or No). Never add, remove or restyle anything; leave fields that the site completes empty, or mark missing information with [[...]].
- Send `save_version` with the content and `fill` (slot id → text or blocks). The server writes the .docx and reports unfilled required slots as `missing` findings.
