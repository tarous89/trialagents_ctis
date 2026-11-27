# France document styling

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

## Template-specific rules

Verbatim from each template's `styling_instructions`.

### Document d’information adaptée et formulaire d’adhésion pour l’adolescent (`L1_SIS and ICF_age 12-17_FR_fr.json`)

Use a readable, airy and non-patronising layout with short question headings, 12-point or larger font, a simple visit calendar and visual aids where useful. Keep the document materially shorter than the adult form.

### Document d’information adaptée et formulaire d’adhésion pour l’enfant (`L1_SIS and ICF_age 6-11_FR_fr.json`)

Use a child-friendly, uncluttered layout, preferably 2-5 pages, with 12-14 point highly legible type, short question headings, generous spacing, neutral pictures or icons where useful and a simple activity calendar.

### Document d’information et formulaire de consentement différé après inclusion en situation d’urgence (`L1_SIS and ICF_emergency_FR_fr.json`)

Use an airy, readable layout with clear subheadings; subheadings may be written as participant-facing questions. Add a table of contents when the document exceeds 6 pages. The information document should ideally not exceed 15 pages and should use 12-point font. Avoid colored text, avoid placing the sponsor logo on every page and do not require participant initials or page-by-page paraphs. Keep the consent form visually separate from the participant information document.

### Document d’information et formulaire de consentement - volontaire sain (`L1_SIS and ICF_healthy_FR_fr.json`)

Use an airy, readable layout with clear subheadings; subheadings may be written as participant-facing questions. Add a table of contents when the document exceeds 6 pages. The information document should ideally not exceed 15 pages and should use 12-point font. Avoid colored text, avoid placing the sponsor logo on every page and do not require participant initials or page-by-page paraphs. Keep the consent form visually separate from the participant information document.

### Document d’information et formulaire d’autorisation de la personne habilitée pour un majeur hors d’état de consentir (`L1_SIS and ICF_legal rep_FR_fr.json`)

Use an airy, readable layout with clear subheadings; subheadings may be written as participant-facing questions. Add a table of contents when the document exceeds 6 pages. The information document should ideally not exceed 15 pages and should use 12-point font. Avoid colored text, avoid placing the sponsor logo on every page and do not require participant initials or page-by-page paraphs. Keep the consent form visually separate from the participant information document.

### Document d’information adaptée et formulaire d’adhésion du participant majeur hors d’état de consentir (`L1_SIS and ICF_limited capacity_FR_fr.json`)

Use an accessible, highly readable and materially shorter format than the adult SIS. Use short question headings, 12-point or larger type, generous spacing, pictures or supported-communication tools where useful, and a clear adherence/objection record.

### Document d’information à l’attention du participant à la recherche et formulaire de consentement (`L1_SIS and ICF_main_FR_fr.json`)

Use an airy, readable layout with clear subheadings; subheadings may be written as participant-facing questions. Add a table of contents when the document exceeds 6 pages. The information document should ideally not exceed 15 pages and should use 12-point font. Avoid colored text, avoid placing the sponsor logo on every page and do not require participant initials or page-by-page paraphs. Keep the consent form visually separate from the participant information document.

### Document d’information et formulaire de consentement des titulaires de l’autorité parentale (`L1_SIS and ICF_parents_FR_fr.json`)

Use an airy, readable layout with clear subheadings; subheadings may be written as participant-facing questions. Add a table of contents when the document exceeds 6 pages. The information document should ideally not exceed 15 pages and should use 12-point font. Avoid colored text, avoid placing the sponsor logo on every page and do not require participant initials or page-by-page paraphs. Keep the consent form visually separate from the participant information document.

### Document d’information et formulaire de consentement au suivi de grossesse - participante enceinte (`L1_SIS and ICF_pregnancy_FR_fr.json`)

Keep the form substantially shorter than the main SIS/ICF. Use a clear chronology, short headings, simple tables and separate signature blocks for maternal follow-up and post-birth child data.

### Document d’information et formulaire de consentement au suivi de grossesse - partenaire enceinte (`L1_SIS and ICF_pregnant partner_FR_fr.json`)

Keep the form substantially shorter than the main SIS/ICF. Use short headings, simple tables, clear checkboxes and distinct signature blocks for the pregnant partner and, only after birth where applicable, the child-data consent.

### Document d’information et formulaire de consentement à l’utilisation secondaire des données et/ou échantillons biologiques (`L1_SIS and ICF_secondary_FR_fr.json`)

Keep the document materially shorter than the main SIS/ICF. Use short lifecycle headings, one clear data/sample table, separate YES/NO choices for genuinely independent optional activities and distinct signature blocks.

### Document d’information et formulaire de consentement avec attestation d’un tiers indépendant (`L1_SIS and ICF_witness_FR_fr.json`)

Use an airy, readable layout with clear subheadings; subheadings may be written as participant-facing questions. Add a table of contents when the document exceeds 6 pages. The information document should ideally not exceed 15 pages and should use 12-point font. Avoid colored text, avoid placing the sponsor logo on every page and do not require participant initials or page-by-page paraphs. Keep the consent form visually separate from the participant information document.
