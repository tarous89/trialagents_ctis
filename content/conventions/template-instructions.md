# Instructions inside templates

Templates contain the instructions the assistant needs, in the template itself. There are no variables to be replaced by a separate pipeline. The assistant follows the instructions while drafting and removes them, so none remain in a final document.

**Participant templates (JSON).** Each template has `template_instructions` (purpose, population, content and styling rules, footer, info table) and `template_content` (one entry per section with the model text and its style). Inside the model text, italic text, `[square-bracket]` notes and `...........` gaps are drafting instructions or gaps to fill. Fields that the participant or physician completes by hand at the consent visit (names, dates, signatures) stay blank.

**Part II forms (DOCX), shared by all countries** (`content/eu/templates/part-ii`). The EU forms are the same in every Member State; only the answer language and national notes change. Former variables are visible instructions, highlighted yellow in the character style `TAInstruction`, each in a content control with a country-neutral field id (`v100`–`v150`, `kv101`–`kv110`, `cb…`, `choice…`, `f…`, `r1_…`) listed in `<form>.fields.json`:

- `[INSERT: …]` write this content in the package's answer language, localised to the Member State concerned.
- `[IF …: …]` and `[OTHERWISE: …]` conditional content.
- `[CHOOSE: …]` tick the right box.
- `[NOTE: …]` guidance or template boilerplate to delete.

The country file gives the answer language(s) and any national notes or extra fields (for example Germany's national data-protection sentence in R1). Country-specific forms that are not shared, if any, live in `countries/<CC>/templates/part-ii`.

If a required fact is not in the sources, leave the instruction in place and raise a *missing data* finding. Never invent site, investigator, insurer or personal details. A final document with an instruction still in it is flagged by the checklist (items C8.11 and P6.01).
