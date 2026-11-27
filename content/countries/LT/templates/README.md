# Lithuania templates

Source: the `CTIS_LT` folder supplied on 27 November 2026, and the Lithuania guides at https://trialagents.com/ctis/lithuania/en (11 pages, reviewed 23 September 2026).

## Participant templates

None supplied for Lithuania. `CTIS_LT` holds only the seven Part II DOCX files and the variable sheet, so `templates/participant` does not exist. `requirements.json` lists the 12 planned template ids in `participant_templates_missing`, and every population set marks its documents `"template": "missing"` (DECISIONS.md D13).

## Part II forms

Lithuania uses the shared EU forms in `content/eu/templates/part-ii`. The seven `CTIS_LT` DOCX files were compared with them, with the old `{{…}}` variables and the shared forms' instruction labels set aside:

- M1, M2, P1 and R1: same text.
- K1, N1 and S1: same questions. The only differences are the EU boilerplate ("How to use this document", "This form may be used…"), the duplicated yes/no variants and the pre-ticked or "N/A" example answers in the LT copies. The shared forms hold all of these as instructions.
- The variable sheet (`Variable Templates_LT_de.xlsx`) has 48 variables, for K1, N1 and S1. All of them ask for answers in Lithuanian, despite the `_de` in the file name. That matches `answer_languages: ["lt"]`.

Nothing was converted into `countries/LT/templates/part-ii`. The Lithuanian Bioethics Committee sample forms (consent procedure, CV, site suitability, biological samples) are recommended, not mandatory, and an equivalent format is accepted if it covers all the required information. So the shared forms are used, and the national content goes into `requirements.json`:

- **K1** has the Lithuanian Member State fields v105, v108, v110, v114, v117 and v121.
- **N1** has the issuer and signature rule on `n1_issued_by`.
- **R1** needs no national sentence.

The guides give no national form for the site list, the investigator qualification statement, financing, proof of payment or insurance. Those are supplied documents.

## Conflicts resolved (newest official source wins)

| Topic | Older or other source | Followed |
|---|---|---|
| Recruitment and consent procedure | Lithuanian Bioethics Committee sample consent-procedure form (2022) | EU template v2.0 for new Part II submissions from 1 September 2026 (content mandatory, exact form highly recommended), with the Lithuanian information in the national fields. |
| Other subject information (L2) | National Part II list (2022) lists other subject information such as a subject card | Current Lithuanian Bioethics Committee FAQ: limit additional patient-facing submissions to the documents required by the relevant Annex I sections. No automatic upload of operational materials. |
| Investigator training | Shared CV form asks only for GCP knowledge | Current Lithuanian Bioethics Committee FAQ: ICH E6(R3) training documented for all investigators, and a GCP certificate for those without trial-investigator experience in the previous five years (LT-M-QUALIFICATION). |
| Declaration of interest signature | Shared EU DoI form has no signature line. The Slovakia package (`countries/SK`) records a Commission Q&A of March 2026: no separate DoI signature in the CTIS application. That source is not cited on the Lithuania pages. | Lithuania guide (23 September 2026, citing CTR Q&A v7.3, July 2026) and the national Part II list: each declaration is signed at submission (DECISIONS.md D8). |
| Site suitability signature | Shared N1 note: leave the signature block empty unless the Member State requires a signature | Lithuania requires it: issued, signed and dated by the head of the institution or delegate before submission. |
| Participant compensation and financing | CTCG gives one P1 title, "Compensation participants and financial arrangements" | Lithuanian list has two items (reimbursement, item 11; financing, item 12): P1 for the shared compensation form and P2 for financing (DECISIONS.md D9). |
| Document names | Descriptive names on the Lithuania guide pages | CTCG v3.0 titles from the naming guide. Proposed titles where it gives none: site list, qualification statement, financing, proof of payment (DECISIONS.md D5, D7, D16). |
| GDPR statement location | CTCG Part II title `R1_Compliance collection and use personal data_<country>`; naming guide note that the GDPR statement can use the Forms section | R1 title kept; the location is left to the user (DECISIONS.md D10). |

## Open points

- The Lithuanian participant template set (12 planned templates) is missing (DECISIONS.md D13).
- The Lithuanian Bioethics Committee sample forms and ICF recommendations were not supplied. The shared forms are used because the national forms are recommended, not mandatory (DECISIONS.md D1, D11).
- The site list, investigator qualification statement, insurance, financing and proof of payment have no template. They are supplied by the sponsor, the insurer or the sites.
- The state fee amount and payment route, and the age of legal competence, are not stated in the guides (DECISIONS.md, Missing).
