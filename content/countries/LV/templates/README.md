# Latvia templates

Sources: the `CTIS_LV` folder supplied on 27 November 2026, and the Latvia guides at https://trialagents.com/ctis/latvia/en (11 pages, reviewed 23 September 2026).

## Participant templates

None were supplied for Latvia. `CTIS_LV` holds only the seven Part II DOCX files and the variable sheet, so `templates/participant` does not exist. `requirements.json` lists the 16 planned template ids under `participant_templates_missing` (id, name, role), and every population set marks its documents `"template": "missing"`. `population_rules` refers to these planned ids (DECISIONS.md D14).

## Part II forms

Latvia uses the shared EU forms in `content/eu/templates/part-ii`. The seven `CTIS_LV` DOCX files were compared paragraph by paragraph with the `CTIS_SK` source set, which was already checked against the shared forms. After variable numbers were normalised, there were no differences. The variable sheet (`Variable Templates_LV_de.xlsx`) is the same as the Slovak sheet apart from the language and country names and the variable numbers. Despite the `_de` in its file name, it asks for the answers in Latvian.

Nothing was converted into `countries/LV/templates/part-ii`. Latvia makes the EU K1, M2, N1 and P1 templates mandatory, recommends M1 and S1, and allows the English EudraLex R1 statement. No national form replaces a shared form. The national additions are in `requirements.json` (`national_fields`):

- K1: the Latvian Member State fields v105, v108, v110, v114, v117 and v121.
- N1: protocol number (v125), off-site institutions (v128), and a signature block kept for the institution's authorised representative (`n1_issued_by`).
- R1: the Latvian-law confirmation (`r1_the_sponsor_declares`).

## Conflicts resolved (newest official source wins)

| Topic | Older or other source | Followed |
|---|---|---|
| Recruitment and consent procedure | Earlier EudraLex template versions | Version 2.0 (January 2026) for new Part II submissions from 1 September 2026, as the Latvia checklist says. |
| Site-suitability signature | Shared N1 form note: leave the signature block empty unless the Member State requires a signature | Latvia requires a signature and date by an authorised representative of the healthcare institution before CTIS submission. The block is kept and left empty for the site. |
| Endpoint-related patient-facing documents | Uploading them in Part II as other participant material | Current EU guidance (Q&A version 7.3, July 2026) as stated on the checklist page: the instrument goes with the protocol in Part I, and the Latvian translation goes in Part II on the CTIS translation route (DECISIONS.md D7). |
| Language of forms | Variable sheet: answers in Latvian. Latvia overview: no general Latvian rule for administrative documents; English EU templates accepted. | Latvian answers by default, English allowed (DECISIONS.md D1). M2 stays on the English template, as the guide says. |
| Document names | Descriptive names on the Latvia guide pages ("Site suitability statement", "Draft site or investigator agreement and budget") | CTCG v3.0 titles from the naming guide. Proposed titles where the guide gives none (P2 budget, R2 translation). |
| Minor age bands | None. No templates; the hub, checklist, minors guide and QC checklist all use 0 to 13 and 14 to 17. | National bands 0-13 and 14-17. |

## Open points

- The whole Latvian participant template set is missing (16 planned templates, DECISIONS.md D14).
- K2, L2, O1 and P2 have no template. They are drafted from the sources or supplied by others.
- The contact details of ZVA, the assigned ethics committee and the Data State Inspectorate must appear in every main consent set. The guides do not give them.
- The guides cite the Compensation template as version 5 (June 2023), the Site Suitability template as version 3.0 (September 2023), the CV as version 3.6, the DoI as version 1.2 and the biological samples template as 28 January 2022. The shared forms carry no version marking, so these versions could not be checked against them.
