# Instructions inside templates

Templates contain the instructions the assistant needs, in the template itself. There are no variables to be replaced by a separate pipeline. The assistant follows the instructions while drafting and removes them, so none remain in a final document.

**Participant templates (JSON).** Each template has `template_instructions` (purpose, population, content and styling rules, footer, info table) and `template_content` (one entry per section with the model text and its style). Inside the model text, italic text, `[square-bracket]` notes and `...........` gaps are drafting instructions or gaps to fill. Fields that the participant or physician completes by hand at the consent visit (names, dates, signatures) stay blank.

**Part II templates (DOCX).** Former variables are now visible instructions, highlighted yellow in the character style `TAInstruction`:

- `[EINFÜGEN: …]` write this content; the text says what (it is the former variable description).
- `[FALLS …: …]` and `[SONST: …]` conditional content.
- `[AUSWAHL: …]` tick the right box or keep the right alternative.
- `[HINWEIS: …]` guidance or template boilerplate to delete.

If a required fact is not in the sources, leave the instruction in place and raise a *missing data* finding. Never invent site, investigator, insurer or personal details. A final document with an instruction still in it is flagged by the checklist (items C8.11 and P6.01).
