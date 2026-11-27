# Estonia templates

Source: the `CTIS_EE` folder supplied on 27 November 2026, and the Estonia guides at https://trialagents.com/ctis/estonia/en (11 pages, reviewed 23 September 2026).

## Participant templates

None supplied. `CTIS_EE` holds only the seven Part II DOCX files and the variable sheet. The guides recommend the Estonia national Subject Information and Informed Consent Form template (Ravimiamet, approved by the Ethics Committee for Medicinal Products, published in Estonian and English) as the drafting baseline; it was not supplied either. `templates/participant` therefore does not exist. `requirements.json` lists the 12 planned template ids in `participant_templates_missing`, and every population set marks its documents `"template": "missing"` (DECISIONS.md D15).

## Part II forms

Estonia uses the shared EU forms in `content/eu/templates/part-ii`; the Estonia checklist names the European Commission template for K1, M1, M2, N1, P1 and S1, and the EU statement for R1. The seven `CTIS_EE` DOCX files were compared with the shared forms:

- M1 and M2: same text.
- R1: same text; the EE copy has no national data-protection sentence, and the guides require none (`r1_the_sponsor_declares` is removed).
- K1, N1, P1 and S1: same questions. The differences are only the EU boilerplate ("How to use this document", "This form may be used…"), placeholder prompts ("Click or tap here to enter text", "[Enter text]") and the pre-ticked "No" or "N/A"/"Not applicable" example answers in the EE copies, which the shared forms hold as instructions.
- The variable sheet (`Variable Templates_EE_de.xlsx`, Estonian descriptions despite the `_de` in its name) asks for the answers in Estonian. That matches `answer_languages: ["et"]`, except for M1, which the guides require in English.

Nothing was converted into `countries/EE/templates/part-ii`. National notes and fields are in `requirements.json`: K1 (v105, v108, v110, v114, v117, v121), N1 (v125, n1_issued_by), P1 (f04, f06), R1 (r1_the_sponsor_declares removed) and S1 (f03).

## Conflicts resolved (newest official source wins)

| Topic | Older or other source | Followed |
|---|---|---|
| Answer language of the CV | Supplied variable sheet: all answers in Estonian | Estonia checklist: the Principal Investigator CV must be in English. M1 (and M2 with it) in English. |
| Answer language of the other forms | Variable sheet: Estonian; guides: the dossier is generally in English | Estonian by default, English allowed for N1, P1, R1 and S1 (DECISIONS.md D1). Not a true conflict: the guides do not exclude Estonian. |
| CTIS placement of Estonian patient-facing materials | EU Q&A: translated patient-facing documents with Part I section D | Ravimiamet instruction from 27 April 2026: Estonian versions in Part II section R for multinational trials (`R2_...`); English versions stay in Part I; mononational trials follow the EU Q&A (DECISIONS.md D3). |
| Recruitment and consent procedure template | Earlier EudraLex template versions | Version 2.0, highly recommended for new Part II submissions; transition ended 1 September 2026. |
| Minors' role in the decision | Generic EU pattern of representative consent plus minor's assent | Medicinal Products Act section 99⁵: at 7 to 17 the minor's own consent is required in addition to the representative's. The age band 7-17 follows the Act. |
| GCP certificate | Separate certificate upload (common in other countries) | Ravimiamet: no certificate when the CV gives the most recent GCP training and the year issued. No separate document. |
| GDPR statement | CTCG Part II title `R1_Compliance collection and use personal data_<country>` | Estonia checklist: the EU statement goes in the CTIS Form section. The R1 title is kept as the document title because the naming guide gives no other (DECISIONS.md D4). |
| Impartial witness trigger | Article 29: participant unable to write | Both: Article 29 (cannot write) and ICH E6(R3) (cannot read), as the Estonia witness guide states. Additive, recorded for clarity. |
| Document names | Descriptive names on the Estonia guide pages | CTCG v3.0 titles from the naming guide; proposed titles where it gives none (P2 budget information, invoice details). |

## Open points

- The Estonian participant template set (12 planned templates) and the Estonia national SIS/ICF template are missing (DECISIONS.md D15).
- K2 recruitment material and R2 patient-facing materials have no template; they are drafted from the protocol and their English sources.
- O1 (insurer), P2 budget information (sponsor) and the invoice details (sponsor) are supplied by others.
- The guides do not mention Russian. Russian (or any other) participant versions are planned only when they will be used (DECISIONS.md D2).
