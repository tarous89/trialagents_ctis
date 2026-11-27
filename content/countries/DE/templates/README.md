# Germany templates

All templates follow [the instruction convention](../../../conventions/template-instructions.md). Sources: the `CTIS_DE` folder supplied on 27 November 2026 (seven Part II DOCX templates, the variable sheet `Variable Templates_DE_de.xlsx`, and the participant templates `DE_Participant-facing templates_05082026.txt`; the `.docx` copy of the participant templates has the same 197 sections).

## Part II (DOCX): converted

| File | CTIS | Variables replaced | Notes |
|---|---|---|---|
| `part-ii/K1_Recruitment arrangements_DE_de.docx` | K1 | 22 | 5 population sections turned into AUSWAHL + FALLS labels. |
| `part-ii/N1_Site suitability_DE_de.docx` | N1 | 5 | Site fields labelled "vom Prüfzentrum bestätigen lassen"; signature kept out of the CTIS copy. |
| `part-ii/S1_Biological samples_DE_de.docx` | S1 | 21 | 3 conditional sections (new samples, archive samples, future use). |
| `part-ii/P1_Participant compensation_DE_de.docx` | P1 | 0 | Word placeholders labelled with their question. |
| `part-ii/R1_Data protection_DE_de.docx` | R1 | 0 | **Added** the German national data-protection sentence the guide requires (GDPR opening clauses, section 40b(6) AMG). |
| `part-ii/M1_CV Principal investigator_DE_de.docx` | M1 | 0 | Personal data come from the investigator; labels say not to invent them. |
| `part-ii/M2_DoI Principal investigator_DE_de.docx` | M2 | 0 | Interests come from the investigator. |

Each file starts with a `[HINWEIS: …]` that gives its CTIS title, whether it is mandatory, the language, the signature rule and the template basis, all from the Germany guides. Template boilerplate ("How to use this document", endorsements) is marked "HINWEIS – vor Einreichung entfernen". The English form questions of the EU templates are kept; answers are in German.

## Participant templates (JSON)

| Source template | Status |
|---|---|
| L1_SIS and ICF_main (adult patients) | **Converted:** `participant/L1_SIS and ICF_adult patients_DE_de.json`. 86 EINFÜGEN, 54 HINWEIS, 26 FALLS, 16 AUSWAHL labels; 24 consent-visit fields kept as blank lines. Needs a regulatory read-through. |
| healthy, age 6-11, age 12-17, parents, legal rep, limited capacity, emergency, witness, pregnant partner, pregnancy, secondary | To convert with the same tool. About 270 blanks without a description need one written from context; limited capacity alone has 93. |

## Open points

1. **Children's age band:** the template is 6–11; the AKEK 2026 guideline names 7–11 (and 12–17 for adolescents). Confirm which band to use.
2. **Child and adolescent model texts:** AKEK's are under the old law (2011). Our templates should be checked against Regulation 536/2014, section 40b AMG and current data rules.
3. **Variable descriptions are in English** ("A paragraph in German explaining …"). They work as instructions for the assistant; translate them if reviewers prefer German throughout.
4. **AKEK site-suitability template:** the guide names it as the recommended German option; we use the EU (CTAG) template, which the guide accepts as equivalent if it covers Annex I point 67.
5. **No templates** for K2, L2, M2 training, N2, O1/O2, P2 and radiation: they are supplied by others or are free-form, so the plan marks them as provided or drafts them from the requirements.
