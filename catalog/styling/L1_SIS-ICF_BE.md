---
id: L1_SIS-ICF_BE
name: L1 styling – Belgium
code: L1_SIS-ICF
countries:
- BE
version: '1.0'
effective: '2026-11-27'
use_when: L1 participant documents for Belgium.
base: L1_SIS-ICF
---
Applies on top of `content/styles/base.md`. Sources: the Belgium guides (https://trialagents.com/ctis/belgium/en and its ten linked pages, reviewed 23 September 2026), which summarise the CT-College ICF templates, the BAREC and CT-College advice and the FAMHP List of requested documents in CTIS for Belgium (30 June 2026). Where these rules are stricter than the base style, they win. The same rules apply to the French (`fr`), Dutch (`nl`) and German (`de`) packages.

No participant templates were supplied for any language, so there are no template `styling_instructions` to reproduce (see `DECISIONS.md`, Missing). When the CT-College templates are supplied, their own layout and fixed text take precedence over the base style for the documents they cover; add each template's `styling_instructions` verbatim below.

## Rules for all Belgian participant documents

- **Language.** Each document is written in the language of its participants and submitted at least in the official language or languages of the site's region: Dutch (Flanders), French (Wallonia), German (German-speaking region), French and Dutch at Brussels sites when both groups may be recruited. Read each language version on its own: medical terminology, consistent defined terms, short sentences, clear headings and usable contact details. Risk frequencies and time periods keep the same meaning in every language version.
- **CT-College templates.** For adult patients and adult healthy volunteers (vaccine trials: the recommended vaccine template), keep the template's fixed text and structure. Use the CT-College source text of each official language for the standard paragraphs; do not re-translate them. Change only the study-specific sections. A deviation from mandatory wording needs the sponsor statement, so do not restyle or reword fixed text.
- **Identification.** Every item shows a clear document title, the population, the language, the version and the date. Use the same official trial title, short title, EU trial number, sponsor and investigational product throughout the document family.
- **Running footer** on every page: document name, population, language, version and date, protocol number and EU trial number, with page numbering in the document's language ("Page x sur y", "Pagina x van y", "Seite x von y").
- **Readability.** Write for the intended participant, not the assessor. Define medical terms, explain probabilities in a form the population can understand, and use short sections. Keep risks specific to the intervention; do not copy investigator-facing lists without context.
- **Main decision and optional choices.** The main trial decision is explicit and separate from optional choices (samples, genetic analysis, future use, anonymisation, extra or infant follow-up). Each optional choice is a separate tick-box line, never preselected, with its own signature logic where needed.
- **Signature blocks.** Signature and date fields for every person whose consent, assent, attestation or authorisation is required: the participant or legally designated representative and the physician (or dentist) who conducted the interview; in paediatric forms two parent signature lines and a record of the minor's assent or dissent; in witness forms the participant's expression of consent by the alternative method, the witness attestation and the interviewer; in infant follow-up forms two parental signatures. All fields stay blank in the CTIS copy.
- **Minors.** Age-adapted documents match the actual population's comprehension: a young child may need a short illustrated explanation, an older child or adolescent a fuller assent document. Do not give a child an adult document with simplified headings.
- **Adults lacking capacity.** The participant's information is adapted to the person's comprehension (simplified sheet, supported communication or the main ICF explained accessibly).
- **Impartial witness.** The participant receives the signed and dated copy in an accessible form.
- **Electronic consent.** The electronic presentation contains at least the paper ICF's information and is submitted as participants will see it (screens, logos, images, videos, process) together with a printable PDF; the signed document is locked and a printed or locked electronic copy is given.
- **Recruitment material and other patient-facing documents.** Submitted in their final wording and presentation; neutral, not promotional; compensation disclosed clearly without presenting payment as a reason to ignore risk.
- **Visuals** add to the text and never replace required information.
- **Filenames and publication.** Version and date in CTIS structured data, not the filename; the Annex I letter and language in the filename where practical (for example `L Main ICF_NL`). Remove signatures, personal addresses and other unnecessary personal data from documents intended for CTIS publication. Tracked-change versions accompany RFI responses and substantial modifications.
