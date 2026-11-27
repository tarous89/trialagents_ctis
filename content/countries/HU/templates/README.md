# Hungary templates

Source: the `CTIS_HU` folder (Part II DOCX forms `*_HU_hu.docx`, `Variable Templates_HU_de.xlsx`, `HU_13 Participant-facing templates_09082026.txt`). Country guides: https://trialagents.com/ctis/hungary/en and its ten linked pages, all reviewed 23 September 2026 (read 27 November 2026).

## Participant templates (JSON), used as supplied

Thirteen files in `participant/`, split from `HU_13 Participant-facing templates_09082026.txt`. Checked against the source: the content is unchanged except the old pipeline variables (`{{population_description}}`, `{{population_label}}`, `{{doc_name_local}}`, `{{date}}`), which became plain bracket notes such as `[population label]` and `[document name]`. Nothing else was edited.

| File | Template id | Population set in `requirements.json` |
|---|---|---|
| `L1_SIS and ICF_main_HU_hu.json` | HU-PT-main | adult_patients; substudy; re-consent at 18 or after regained capacity |
| `L1_SIS and ICF_healthy_HU_hu.json` | HU-PT-healthy | healthy_volunteers |
| `L1_SIS and ICF_parents_HU_hu.json` | HU-PT-parents | minors |
| `L1_SIS and ICF_age 6-11_HU_hu.json` | HU-PT-age-6-11 | minors (drafting band 6-11) |
| `L1_SIS and ICF_age 12-17_HU_hu.json` | HU-PT-age-12-17 | minors (drafting band 12-17) |
| `L1_SIS and ICF_legal rep_HU_hu.json` | HU-PT-legal-rep | adults_without_capacity; emergency (representative consents first) |
| `L1_SIS and ICF_limited capacity_HU_hu.json` | HU-PT-limited-capacity | adults_without_capacity (as applicable) |
| `L1_SIS and ICF_emergency_HU_hu.json` | HU-PT-emergency | emergency |
| `L1_SIS and ICF_witness_HU_hu.json` | HU-PT-witness | impartial_witness (two-witness route) |
| `L1_SIS and ICF_pregnancy_HU_hu.json` | HU-PT-pregnancy | pregnancy_participant |
| `L1_SIS and ICF_pregnant partner_HU_hu.json` | HU-PT-pregnant-partner | pregnancy_partner |
| `L1_SIS and ICF_secondary_HU_hu.json` | HU-PT-secondary | secondary_use |
| `L1_SIS and ICF_genetic testing_HU_hu.json` | HU-PT-genetic-testing | genetic_testing (document HU-L1-GENETIC) |

### The extra genetic-testing template, checked against the guides

Hungary adds `L1_SIS and ICF_genetic testing_HU_hu.json` ("Humángenetikai vizsgálatra vonatkozó tájékoztató és beleegyező nyilatkozat"). It matches the guides:

- ETT-KFEB requires separate genetic information and consent documents when genetic sampling or genetic research is planned (Part II checklist 2 and 9; ICF guide). The template is a separate document, for mandatory and optional protocol genetic testing, and the main, healthy, parents, child, adolescent, representative, emergency and pregnancy templates all say that genetic testing needs this separate document.
- Detailed written consent before sampling; refusal does not block main-trial participation; withdrawal and destruction of identifiable, coded or pseudonymised samples and data; storage forms (identifiable, coded, pseudonymised, anonymous): all in the template.
- One signature set per document; signature route per population (own consent, Section 16 authorised person, minor or partly limited adult with the representative's consent or later approval, two witnesses): in the template instructions and consent section, as the minors, limited-capacity and witness guides require.
- The template covers the primary protocol purpose only and sends future genetic research to the secondary-use document. The Genetics Act choice of permitted use (primary purpose only, other purposes allowed by the Act, research) is therefore fixed to the primary purpose here; wider use needs the secondary-use document plus the genetic rules (secondary-use guide).
- Not stated in the guides and kept as supplied (open points, DECISIONS.md D15): genetic counselling before sampling, the Section 13(3) applicability check for incapable persons, the Section 10 destruction period of 30-45 days, and the own consent of a minor aged 14 or older.

## Part II forms

Hungary uses the shared EU forms in `content/eu/templates/part-ii` for **K1**, **M2** (DoI) and **P1**. The CTIS_HU DOCX files and variable sheet are the shared forms apart from variable numbering (checked for N1 and M1 here; the brief records all seven as verified). Nothing was converted or copied. Answers in Hungarian; the variable sheet targets Hungarian answers although its file name ends in `_de`. National additions are in `requirements.json`: `national_fields` for K1 (v105, v108, v110, v114, v117, v121) and P1 (f02, f04, f05), plus `drafting_notes_hu`.

Not used for Hungary:

- **M1 CV.** Hungary requires the CTEG CV template as modified for Hungary and published by ETT-KFEB, for the PI and co-investigators. `M1_CV Principal investigator_HU_hu.docx` is the unmodified EU form. HU-M1 is a `third_party_document` until the national template is supplied (DECISIONS.md D2).
- **N1 site suitability.** Hungary requires the ETT-KFEB Hungary-modified Site Suitability Form (November 2025 version) and says not to substitute the generic EU form. `N1_Site suitability_HU_hu.docx` is the EU form. HU-N1 is a `third_party_document` until the national form is supplied (DECISIONS.md D3).
- **R1 data protection and S1 biological samples.** The MedEthicsEU Hungary overview, as recorded in the guide, identifies no separate Hungary Part II data-protection document and no separate sample form; ETT-KFEB expects both topics in the participant information and consent. The forms stay in the shared set but are not planned (DECISIONS.md D9).

## Part II checklist mapped to the documents (one to one)

| Checklist item (part-ii-document-checklist) | Document id |
|---|---|
| 1 Recruitment arrangements: procedure information (mandatory) | HU-K1 |
| 1 Recruitment material in final Hungarian form (conditional) | HU-K2 |
| 2 Hungarian SIS and ICF per population, combined (mandatory) | HU-L1 |
| 2 Separate genetic information and consent (conditional) | HU-L1-GENETIC |
| 2 Population-specific documents (conditional) | HU-L1-POPULATION |
| 3 Patient emergency card (mandatory when applicable) | HU-L-CARD |
| 4 PI and co-investigator CVs on the Hungary template (mandatory) | HU-M1 |
| 4 PI declaration of interest (mandatory) | HU-M2-DOI |
| 4 GCP qualification (mandatory; may be in the CV) | HU-M-GCP |
| 4 Signed protocol signature or acceptance pages (mandatory) | HU-M-PROTOCOL-SIGNATURE |
| 5 Hungary-modified site suitability form (mandatory) | HU-N1 |
| 6 Proof of insurance: confirmation or certificate, and policy (mandatory) | HU-O1, HU-O2 (split provisional, D20) |
| 7 Compensation or reimbursement to participants (mandatory when applicable) | HU-P1 |
| 7 Financial information per participant to site, PI and team (mandatory) | HU-P2 |
| 7 Third-party reimbursement service (conditional) | content of HU-L1 and HU-P1 field f02 |
| 7 Small gifts list with commercial value (conditional) | HU-P1 field f05 |
| 8 Data protection in the participant package (mandatory) | content of every L1 document; HU-L-PRIVACY-APPENDIX only if a separate appendix is used |
| 9 Biological samples in the participant package (mandatory when samples are collected) | content of HU-L1 and HU-L1-POPULATION |
| 9 Genetic sampling, separate documents (conditional) | HU-L1-GENETIC |
| 10 Hungarian cover letter with document list (mandatory) | HU-COVER |
| 10 Hungarian list of the Part II documents (mandatory) | HU-DOC-LIST |
| 11 Submission-time signature summary | `signature_at_submission` and `signature_rule` on each document |

## Conflicts resolved (rule 2: authority and newest official source win)

1. **Site suitability and CV forms.** The CTIS_HU set supplies the generic EU N1 and M1 forms; ETT-KFEB requires its Hungary-modified site form (November 2025) and Hungary-adapted CV. The national forms win; the shared forms are not used.
2. **Witness template description.** It says "an impartial witness" and "cannot read, write or sign". Hungary requires two witnesses who are not interested in or participating in the research, with address or contact (Section 159(1a) Health Act, ETT-KFEB Q&A), for a capable person unable to write or illiterate. The two-witness rule applies; the template content already implements it.
3. **Healthy-volunteer payment scope.** The healthy template allows benefits beyond expenses in "non-therapeutic pharmacokinetic/interaction, Phase I or bioequivalence" studies. The guide (Medical Research Council Bioethics Code 2022) names Phase I trials and non-therapeutic PK or PD research. The guide's scope is used in P1 (field f04) and the drafting rules; interaction and bioequivalence studies only if confirmed (DECISIONS.md D16).
4. **Age bands.** The templates use 6-11 and 12-17. The guide says the official Hungary sources publish no fixed national assent age-band table and not to invent one. The bands are kept only as drafting bands, chosen per study from the protocol population and maturity; no band is presented as a national rule.
5. **CTIS titles.** The Hungary guides give no CTIS titles; the CTCG v3.0 naming guide is used. Co-investigator documents carry no personal names (naming guide: names only for the principal investigator).
6. **Data protection and samples forms.** The shared R1 and S1 forms exist in the template set; the guide records that Hungary needs no separate data-protection or sample document and expects the content in the ICF. The guide wins (not planned).

## Open points

- The ETT-KFEB Hungary-adapted CV template and the Hungary-modified Site Suitability Form (November 2025) were not supplied (DECISIONS.md D2, D3).
- No template for the patient emergency card, the Hungarian cover letter or the Part II document list, nor for information for children under 6 (DECISIONS.md D5, D10, D11, D13).
- Template instructions not stated in the guides, kept as supplied: own consent of minors aged 14 or older recorded in the parents document (12-17 and genetic templates); genetic counselling before sampling, Section 13(3) and Section 10 (30-45 days) of Act XXI of 2008 (genetic template); Section 159(4)-(5) Health Act and Sections 7/A-9 of Decree 35/2005 and the exclusion of persons who previously refused trial participation (legal-representative template). See DECISIONS.md D12 and D15.
- The ETT-KFEB Part II Q&A, GDPR recommendation (14 March 2023) and patient-card requirements (15 December 2015) are known only through the guides' summaries.
