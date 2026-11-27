---
id: L1_SIS-ICF_NO
name: L1 styling – Norway
code: L1_SIS-ICF
countries:
- 'NO'
version: '1.0'
effective: '2026-11-27'
use_when: L1 participant documents for Norway.
base: L1_SIS-ICF
---
Applies on top of `content/styles/base.md`. Sources: the Norway patient information and consent guide and the QC checklist (`/ctis/norway/en/`, reviewed 23 September 2026), and the `styling_instructions` of each Norwegian participant template (CTIS_NO set, `NO_14 participant-facing templates_07082026.txt`). Where they are stricter than the base style, these rules win.

## Rules for all Norwegian participant documents

- Norwegian (Bokmål, as the templates) for a lay reader, adapted to the person who will consent. A representative or guardian document addresses that person, never as though they were the participant.
- Headings, short paragraphs, readable type and clear consent choices (Norway guide). The templates ask for a sans-serif typeface (skrifttype uten seriffer) and clear section headings (`H3 module title`, mostly in capitals as in the templates).
- Keep the EU trial number, document title, version and date visible. Running footer as the templates give it: `[document name] - [population label] - versjon [x] - [date]` and `Protokollnummer: … | EU CT-nummer: …`, with page numbering `Side x av y`. Version and date must match the CTIS structured data.
- Info table (trial title, short title, protocol number with version and date, EU CT number, sponsor with full address, principal investigator, site name and address) at the start of the information and again on the consent pages, from each template's `info_table`. The site letterhead is supplied by the site and never invented.
- No summary box is required: the Norwegian templates have no `Summary section`. Do not add one unless the user asks.
- Visit schedules: when the trial has many visits or procedures, show the course of the study in a short table with the columns «Tidspunkt», «Hva skjer», «Omtrentlig tidsbruk» and «Hva er ekstra på grunn av studien». The table replaces repeated procedure text but never drops a procedure, burden or risk. Long instructions or side-effect lists may go in an appendix.
- Data section in short sub-sections, where relevant: «Hvilke opplysninger bruker vi?», «Hvor kommer opplysningene fra?», «Hvem kan få tilgang?», «Hvor og hvor lenge lagres opplysningene?».
- Consent choices: use dated signature fields, not checkboxes (templates). Each truly optional choice (optional procedure or analysis, GP contact, infant follow-up) gets its own signature module (`VALGFRITT TILLEGGSSAMTYKKE – …`) after the main consent, never pre-ticked. This replaces the base style's `Checkbox group` for Norway; the guide's requirement that the optional choice is unmistakable is met by the separate signature logic.
- The consent pages start on a new page (`Section break`) with the info table, followed by separate blocks «BEKREFTELSE PÅ AT INFORMASJON ER GITT» and «BEKREFTELSE PÅ AT SAMTYKKE ER AVGITT» for the person who gave the information and the person who received consent; each block has place and date, signature and role. Names in block capitals (store bokstaver).
- Keep only the signature path that is used (for example participant or nearest relative in the emergency template; one or two guardian blocks in the parents template).
- Children's and limited-capacity documents: simple, age- or ability-adapted layout, large readable type, plenty of white space, pictures, symbols or illustrations where helpful; they add to the text and never replace required information.
- No risk frequency scale is set by the Norway guides (DECISIONS.md D14).
- Upload a searchable, copyable PDF, not a scan.
- Remove all highlighted instruction text, [square-bracket] notes, `[Redaksjonsnote: …]` notes and unused alternatives before the document is given to the participant (and before upload).
