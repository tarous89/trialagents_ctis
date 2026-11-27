---
id: L1_SIS-ICF_SE
name: L1 styling – Sweden
code: L1_SIS-ICF
countries:
- SE
version: '1.0'
effective: '2026-11-27'
use_when: L1 participant documents for Sweden.
base: L1_SIS-ICF
---
Applies on top of `content/styles/base.md`. Sources: the `styling_instructions` of each Swedish participant template (CTIS_SE set, `SE_13 participant-facingtemplates_06082026.txt`) and the Sweden guides (reviewed 23 September 2026), mainly the patient-facing document QC checklist. Where they are stricter than the base style, these rules win.

## Rules for all Swedish participant documents

- Swedish throughout, understandable to the intended participant population and not only grammatically correct: define clinical terms, shorten dense sentences and keep the decision-relevant information visible (SE-QC#9).
- Keep the clear section structure of the Swedish source template (Kliniska Studier Sverige model). The page header gives the EU trial number (EU-prövningsnummer), the Swedish trial title and the document version (all templates).
- Running footer as set in each template's `footer`: `[document name] - [population label] - version - [date]` and `Protokollnummer | EU-prövningsnummer`, with page numbering in Swedish ("Sida x av y").
- Info table at the start of the information and of the consent form: trial title, short title, protocol number with version and date, EU trial number, sponsor with full address, principal investigator (ansvarig prövare), site name and site address (template `info_table`). Site letterhead only as supplied by the site; never invented.
- Each document has a controlled title, version and date; the version matches the references in the protocol and in K1 (SE-QC#8).
- Short paragraphs, clear headings, and separate fields for name, date and signature (all templates).
- Consent form: signature and date fields for the participant or legally designated representative and for the person who gives the information (licensed physician or licensed dentist, or another healthcare professional under a Läkemedelsverket exception); two separate guardian blocks in guardian documents; witness block only in documents where the impartial-witness route can apply (SE-QC#3, SE-MINORS, SE-WITNESS).
- Optional choices visually separate from the main consent, one line per independent choice, never pre-ticked; a "no" must visibly not affect main participation (SE-SECONDARY).
- The CTIS copy is blank: no site, participant, representative or witness signatures and no completed personal data (SE-QC#8).
- Child and adolescent documents shorter than the adult or guardian information, with age-adapted language; pictures or symbols where they help understanding and never in place of required information (templates 6-11, 12-14, 15-17).
- Risk frequency categories: the Sweden guides set none; use the categories of the IB or SmPC until the user decides (DECISIONS.md D13).
- Only the template markers `[INSTRUKTION – TA BORT FÖRE SLUTVERSION: ...]`, `[FYLL I: ...]` and `[VALFRI TEXT – BEHÅLL ELLER TA BORT]` are used while drafting; all are removed before the document reaches the reader.
