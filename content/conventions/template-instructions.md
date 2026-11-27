# Template instruction convention

Templates no longer contain variables (`{{v01100}}`, `{{kv102}}`) or conditional blocks (`{{#kv108 === "true"}} … {{/}}`) for an LLM pipeline to replace. Instead, every instruction is **labelled in the template itself**. The assistant reads the labels and the step instructions, writes the content, and removes every label before the document is final.

## The four labels

Labels use the template's language. German templates use:

| Label | Meaning | What the assistant does |
|---|---|---|
| `[EINFÜGEN: description]` | Fill in study-specific content. The description says what and how (it carries the former variable description). | Replace the whole label with the content. If the information is missing from the sources, keep the label and raise a *missing data* finding. Never invent site, investigator, insurer or personal details. |
| `[FALLS condition: …]` | Conditional text or field. Applies to the label and the paragraph or field it introduces. | If the condition is true, keep the text (or fill it) and remove the label. If false, remove the paragraph or field, or enter what a `[SONST: …]` label says. |
| `[AUSWAHL: …]` | Choose one of several alternatives or tick the right box. | Keep the alternative that fits the study, delete the others and the labels. Tick boxes per the condition. |
| `[HINWEIS: …]` | Drafting guidance or template explanation. | Follow it, then delete it. Text marked "HINWEIS – vor Einreichung entfernen" is template boilerplate to delete. |

English equivalents for English-language templates: `[INSERT: …]`, `[IF …: …]`, `[CHOOSE: …]`, `[NOTE: …]`.

## Fields completed by hand at consent

Signature blocks and other fields that the participant, representative or physician completes at the consent visit stay as blank lines (`__________________`) in the final document. They are not instructions and must not be filled by the assistant.

## How labels are marked

- **DOCX:** each label is one run in the character style `TAInstruction` (italic, yellow highlight). Detection uses the style, so a reviewer sees every instruction at a glance and the server can check a final file for leftovers.
- **JSON participant templates:** labels are plain text in `section_content`; the renderer applies `TAInstruction` to any `[KEYWORD: …]` span. Bold and underline stay as `<b>` and `<u>`.

## Validation

`save_version` for a final step (and the package checklist item P6.01) rejects a document that still contains a `TAInstruction` run or a `[EINFÜGEN|FALLS|SONST|AUSWAHL|HINWEIS` / `[INSERT|IF|CHOOSE|NOTE` label, and reports each leftover as a finding.

## Converting the old templates

`tools/content/convert_docx.py` and `tools/content/convert_pf.py` (see `content/countries/DE/templates/README.md`) did the conversion for Germany:

- `{{v…}}` → `[EINFÜGEN: <description from the variable sheet>]`.
- `{{kv101}}`, `{{kv102}}`, `{{kv103}}`, `{{date}}` → `[EINFÜGEN: title / EU trial number / sponsor / date]`.
- Block conditionals on `kv104`–`kv110` → one `[AUSWAHL: …]` with plain checkboxes; inline conditionals → `[FALLS …: EINFÜGEN …]` plus `[SONST: „N/A“ eintragen]`.
- Word "Click or tap here to enter text." and cyan "[Enter text]" → `[EINFÜGEN: <question it answers>]`.
- In participant templates: `........... <i>[desc]</i>` → `[EINFÜGEN: desc]`; `●●●`/`◆◆◆` → product and comparator labels; italic notes → `[HINWEIS: …]`; bracket notes classified as EINFÜGEN, FALLS, AUSWAHL or HINWEIS; blanks without a description were given one by hand; signature-block blanks became form lines.
