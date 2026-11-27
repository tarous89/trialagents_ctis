---
id: L1_SIS-ICF_FR
name: L1 styling – France
code: L1_SIS-ICF
countries:
- FR
version: '1.0'
effective: '2026-11-27'
use_when: L1 participant documents for France.
base: L1_SIS-ICF
---
Applies on top of `content/styles/base.md`. Sources: the `styling_instructions` of each French participant template (CTIS_FR set, supplied 27 November 2026) and the France guides (TrialAgents, reviewed 23 September 2026: patient information and consent, QC checklist, population guides). Where they are stricter than the base style, these rules win. Forms (`kind: form`) keep their template layout.

## Rules for all French participant documents

- Language: French that a lay reader in the intended population understands; clear, concise and fair. Excessive length can itself impair understanding: the adult information document should ideally not exceed 15 pages (templates).
- Structure (templates): Partie 1 informations sur la recherche, Partie 2 informations sur les droits du participant et sur la gestion des données, Partie 3 glossaire where useful; the consent form (formulaire de consentement, d'autorisation or d'adhésion) visually separate from the information and starting on a new page.
- Headings, short paragraphs, readable type (12 point or larger in the templates), sufficient spacing and contrast; subheadings may be phrased as the participant's questions. Add a table of contents when a document exceeds 6 pages (templates).
- Tables only where they help comparison; visit schedules as a table or simple calendar. Do not hide material risks, data transfers or withdrawal effects in dense legal text.
- Diagrams and icons are explained in words where needed for accessibility; they add to the text and never replace required information.
- Running footer on every page (template `footer`): document name, population label, version and date; protocol number and EU trial number; page "Page x sur y". Every page carries a consistent title, version and date.
- The consent page identifies the information document's version and date.
- Info table (template `info_table`) at the start of the information and of the consent form: titre de la recherche, titre abrégé, numéro de protocole (version et date), numéro d'essai UE, promoteur avec adresse, investigateur principal / coordonnateur, nom et adresse du lieu de recherche, version et date du document, plus the template's population-specific rows.
- Site letterhead block (`Header`) supplied by the site, never invented. Avoid placing the sponsor logo on every page (templates).
- Avoid coloured text (templates). Avoid coercive tone and sponsor marketing language.
- Do not require participant initials or page-by-page paraphs (templates).
- Optional choices as separate Oui / Non lines with empty boxes (☐), never pre-ticked; no bundled signature for unrelated permissions.
- Signature blocks: separate labelled blocks per signer, with the role in French and whether the person signs for consentement, autorisation, assistance (curateur) or attestation (tiers); name, date and signature fields blank in the CTIS copy.
- Final files: no tracked changes, comments, hidden text or blank pages; searchable-text PDFs (no image-only PDFs).
- Accessible output: real Word headings, tables with header rows; usable printed, on a phone and electronically. Digital screens are tested on the participants' devices and keep the CPP-reviewed content and flow.
