# Croatia templates

Sources: the `CTIS_HR` folder supplied on 27 November 2026, and the Croatia guides at https://trialagents.com/ctis/croatia/en (11 pages, reviewed 23 September 2026).

## Participant templates

None were supplied for Croatia. `CTIS_HR` holds only the seven Part II DOCX files and the variable sheet, so `templates/participant` does not exist. `requirements.json` sets `participant_templates` to `[]` and lists the 24 planned template ids in `participant_templates_missing`. Every population set marks its documents `"template": "missing"` (DECISIONS.md D18).

## Part II forms

Croatia uses the shared EU forms in `content/eu/templates/part-ii`. The seven `CTIS_HR` DOCX files were compared with them:

- M1, M2 and R1: same text. The only differences are the old variables, which the shared forms hold as instructions.
- K1, N1, P1 and S1: same questions. The `CTIS_HR` copies differ only in three things: the EU boilerplate ("How to use this document", "This form may be used…"), the pre-ticked or "N/A" example answers, and the "Click or tap here to enter text" prompts. The shared forms hold all three as instructions.
- The variable sheet asks for the answers in Croatian ("A paragraph in Croatian…", target language Croatian), even though its file name, `Variable Templates_HR_de.xlsx`, carries `_de`. That matches `answer_languages: ["hr"]`.

Nothing was converted into `countries/HR/templates/part-ii`. The national notes and fields are in `requirements.json`:

- **K1:** the Croatia fields v105, v108, v110, v114, v117 and v121.
- **N1:** v126 (emergency arrangements and the hospitalisation agreement) and n1_issued_by (signature block kept for the authorised site representative).
- **P1:** f02 (maximum net amount in euros).
- **R1:** r1_the_sponsor_declares (applicable Croatian data-protection rules).
- **S1:** v149 and f03 (prior Central Ethics Committee review; separate consents; repository samples not linkable to the participant; re-consent at adulthood).

**M1 is not used for upload.** Central Ethics Committee guidance requests the Croatian HALMED CV format, in Croatian, signed and dated, and no more than six months old. The `CTIS_HR` M1 file is the EU CV form. So `HR-M1` has no template and is kind `third_party_document` until the HALMED format is supplied and converted (DECISIONS.md D2).

## Conflicts resolved (newest official source wins; authority followed exactly)

| Topic | Older or other source | Followed |
|---|---|---|
| PI CV format | Shared EU CV form in the supplied set (M1) | Central Ethics Committee guidance: HALMED CV format, in Croatian, signed and dated, no more than six months old. The EU form is not used for the Croatian upload (D2). |
| Site suitability signature | Shared N1 instruction: leave the signature block empty unless the Member State requires a signature | Croatia requires it: the authorised site representative signs and dates at submission. The block is kept through the national field n1_issued_by. |
| Recruitment and consent procedure | Earlier EudraLex template versions | Version 2.0 for new Part II submissions from 1 September 2026. |
| GDPR statement | CTCG Part II title `R1_Compliance collection and use personal data_<country>` | The Croatia checklist puts the EudraLex statement in the CTIS Form section, titled "GDPR compliance statement". A Part II R1 is used only if national information is not covered or the authority asks for it (D9). |
| Information sheet and consent form | Base style and the CTCG title `L1_SIS and ICF` (two parts, consent form on a new page with its own letterhead) | Central Ethics Committee guidance: one unified Informirani pristanak, with all information before the signature section and no signature-only form. The CTIS title keeps the CTCG form; styling.md overrides the base-style rule. |
| Document names | Descriptive names on the Croatia guide pages | CTCG v3.0 titles from the naming guide. Titles are proposed where the guide gives none: GCP certificate, mentor documentation, hospitalisation agreement and funding description (D3, D4, D5, D7). |
| Mental-disorder trials | Older Croatian clinical-trial rules require a positive opinion from the committee responsible for protecting people with mental disorders | Current Central Ethics Committee restriction applies. Confirm the current procedural route with the authorities for the specific application (D14). |
| Variable sheet language | File name `_de` | Content: Croatian. Answers in Croatian. |

## Open points

- The Croatian participant template set (24 planned templates) is missing (DECISIONS.md D18).
- The HALMED CV format is missing (D2).
- These items have no template: K2, L2, the GCP certificate, mentor documentation, the hospitalisation agreement, O1, the funding description and the site agreements. They are drafted from the sources or supplied by others.
- The Central Ethics Committee's address for written questions about participant rights and the AZOP contact details must appear in every informed consent. The guides do not state them, so they come from the current official pages.
- The Croatian-language guides (`/ctis/croatia/hr`) are outside the `/ctis/croatia/en/` scope and were not read.
