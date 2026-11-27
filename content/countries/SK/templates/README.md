# Slovakia templates

Source: the `CTIS_SK` folder supplied on 27 November 2026, and the Slovakia guides at https://trialagents.com/ctis/slovakia/en (11 pages, reviewed 23 September 2026).

## Participant templates

None supplied for Slovakia. The participant-template text file in `CTIS_SK` (`BG_13 participant-facing templates_12082026.txt`) is the Bulgarian set, already filed under `countries/BG`, and was not used. `templates/participant` therefore does not exist. `requirements.json` lists the planned template ids (`participant_templates_missing`), and every population set marks its documents `"template": "missing"` (DECISIONS.md D15).

## Part II forms

Slovakia uses the shared EU forms in `content/eu/templates/part-ii`. The seven `CTIS_SK` DOCX files were compared with them:

- M1, M2 and R1: same text.
- K1, N1, P1 and S1: same questions. The differences are only the EU boilerplate ("How to use this document", "This form may be used…") and the pre-ticked or "N/A" example answers in the SK copies, which the shared forms hold as instructions.
- The variable sheet (`Variable Templates_SK_de.xlsx`, Slovak descriptions despite the `_de` in its name) asks for the answers in Slovak. That matches `answer_languages: ["sk"]`.

Nothing was converted into `countries/SK/templates/part-ii`. National notes and fields are in `requirements.json`: K1 has the Slovak Member State fields, and R1 needs no national sentence.

**N1 is used for content only.** The Part II checklist requires the Slovakia national site suitability form (a country form, updated in 2025). The `CTIS_SK` N1 file is the EU form. So `SK-N1` has no template and is kind `third_party_document` until the national form is supplied and converted (DECISIONS.md D3).

## Conflicts resolved (newest official source wins)

| Topic | Older or other source | Followed |
|---|---|---|
| Declaration-of-interest signature | Earlier national guidance on signature practice | Commission Q&A, March 2026: no separate signature in the CTIS application. Check again if the Ethics Committee republishes the form. |
| Insurance certificate | Earlier requirement to list every Slovak site | Current national guidance: sites need not be listed. |
| Site suitability | EU N1 form in the supplied set; earlier national form | Current Slovakia national form (2025 update); verify the instructions before submission. |
| Recruitment and consent procedure | Earlier EudraLex template versions | Version 2.0 for new Part II submissions from 1 September 2026. |
| GDPR statement | CTCG Part II title `R1_Compliance collection and use personal data_<country>` | Slovakia checklist: EudraLex statement in the CTIS Form section, not a duplicate Part II narrative. Title "GDPR compliance statement" (DECISIONS.md D6). |
| Document names | Descriptive names on the Slovakia guide pages | CTCG v3.0 titles from the naming guide; proposed titles where it gives none (M3 site list, national approvals). |
| Adolescent band | National overview "12 to 18"; minors guide "commonly 12 to 17" | Same meaning (12 up to the 18th birthday). Recorded as 12-17. |
| Extra patient-facing materials | National expectation of additional patient-facing documents | Commission Q&A, March 2026: Member States should not request documents the CTR does not include. Only CTR or Q&A-required items are uploaded; no bulk upload of diaries, cards, questionnaires or instructions. |

## Open points

- The Slovak participant template set (13 planned templates) is missing (DECISIONS.md D15).
- The Slovakia national site suitability form is missing (DECISIONS.md D3).
- K2, L2, M3, O1 and the national approvals (GMO, radioactive products, transplant centre) have no template. They are drafted from the sources or supplied by others.
- The national Ethics Committee contact details, including the telephone number, must appear in every participant information sheet. The guides do not state them, so they come from the current national guidance.
