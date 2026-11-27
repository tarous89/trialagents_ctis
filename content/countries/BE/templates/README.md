# Belgium templates

Sources: the `CTIS_BE_fr`, `CTIS_BE_nl` and `CTIS_BE_de` folders. Each holds the seven Part II DOCX forms (`*_BE_fr.docx`, `*_BE_nl.docx`, `*_BE_de.docx`) and a variable sheet (`Variable Templates_BE_fr_de.xlsx`, `…_nl_de.xlsx`, `…_de_de.xlsx`). None of them holds participant templates. Country guides: https://trialagents.com/ctis/belgium/en and its ten linked pages, all reviewed 23 September 2026 and read in full on 27 November 2026.

Belgium has three package languages: French (`fr`), Dutch (`nl`) and German (`de`). Which ones a trial needs depends on the language region of each site (see `language_rules` in `requirements.json`).

## Participant templates: none supplied

No participant templates were supplied for French, Dutch or German, so `participant/` does not exist. `requirements.json` has `participant_templates: []`. It lists the 15 templates the guides call for, once per language (45 entries), in `participant_templates_missing`, each with status `missing` and no file. Every population set lists its documents in all three languages with `"template": "missing"`.

The 15 templates are: adult patients, healthy adults and vaccine healthy volunteers (CT-College), parents or guardians, young children, older children and adolescents, legal representative, adapted participant information, emergency participant, emergency representative, impartial witness, pregnant participant, infant follow-up, pregnant partner, and future use.

`population_rules` names the templates each population needs under `required_templates` and `conditional_templates`. It does not use `always`, because the audit only accepts ids from `participant_templates` there, and that list is empty. `minors.age_bands` is empty because Belgium has no national age bands. The audit does not check `shareable_when_supplied` either. Once templates are supplied, split them into `participant/` as `L1_SIS and ICF_<template>_BE_<lang>.json`, move their ids into `participant_templates`, and restore the `always` and `shareable_templates` keys.

## Part II forms

Belgium uses the shared EU forms in `content/eu/templates/part-ii` for K1, M1, M2, N1, P1, R1 and S1. We compared the forms paragraph by paragraph after removing the variables. The French, Dutch and German DOCX files are identical to each other and to the CTIS_FI_fi forms, which have already been checked against the shared forms. The three variable sheets (855 variables each) are also identical to each other and to the Finland sheet, apart from the language name, the country name, the template file names and the variable numbering. Nothing was converted and nothing was copied here.

- **K1** is the European Commission's combined informed-consent and patient-recruitment procedure template. It is mandatory in Belgium and is uploaded under K.59 and L.62.
- **M1** is the EU CV template. It is accepted, but the guides strongly recommend the Belgian CV template, which was not supplied. The Belgian addendum was not supplied either (`DECISIONS.md` D7).
- **M2** is the European Commission DoI template, which FAMHP requires.
- **N1** is the EU template, which is accepted as an alternative to the Belgian template (not supplied; D9). Belgium requires it to be signed at submission.
- **P1** is the EU compensation template, used where applicable (checklist item 10).
- **R1** is the EU GDPR statement. It is needed only when the ICF lacks the GDPR confirmation.
- **S1** is the EU biological-sample template. It is mandatory and needs the Belgian section 5.1 text, which was not supplied (D15).

The national additions are in `requirements.json`:

- `national_fields` for K1: v105, v108, v110, v114, v117 and v121.
- `national_fields` for N1: v128 and `n1_issued_by`.
- `national_fields` for R1: `r1_the_sponsor_declares`.
- `national_fields` for S1: f03 (section 5.1).
- `drafting_notes_fr`, `drafting_notes_nl` and `drafting_notes_de` on every document.

The **Belgian Statement on financing** (checklist item 9) is a mandatory national form that was not supplied. The document stays in the package with no template, as kind `third_party_document`, just as Austria did for its national N1 (D11).

## Document list against the Belgium Part II checklist

The checklist page has 12 items, which map to 14 documents. Item 6 covers two CTIS uploads (M.65 CV and M.66 DoI) and item 10 covers two (participant compensation on the EU template, and site payments and agreements).

| Item | Document id | CTIS title |
|---|---|---|
| 1 | BE-K1 | `K1_Recruitment arrangements_BE_<lang>` (also `L1_Recruitment and informed consent procedure_BE_<lang>` under L.62) |
| 2 | BE-K2 | `K2_Recruitment material_<type>_BE_<lang>` |
| 3 | BE-L1 | `L1_SIS and ICF_<population>_BE_<lang>` |
| 4 | BE-L1-POPULATION | `L1_SIS and ICF_<template subtype>_<population>_BE_<lang>` |
| 5 | BE-L2 | `L2_Other subject information material_<type>_BE_<lang>` |
| 6 | BE-M1, BE-M2 | `M1_CV_<investigator>_<site>`, `M2_DoI_<investigator>_<site>` |
| 7 | BE-N1 | `N1_Site suitability form_<site>` |
| 8 | BE-O1 | `O1_Trial participant insurance certificate_BE` |
| 9 | BE-P-FINANCING | `P2_Statement on financing_BE` |
| 10 | BE-P1, BE-P3 | `P1_Compensation participants and financial arrangements_BE`, `P3_Financial arrangements and agreements_<site>` |
| 11 | BE-R1 | `R1_Compliance collection and use personal data_BE` |
| 12 | BE-S1 | `S1_Compliance collection use storage biological samples_BE` |

The items the guide lists as not required are recorded in `outside_part_ii`: the planned-site list, proof of fee payment and purely operational patient materials. Endpoint instruments also go there, because they are filed in Part I.

## Conflicts resolved (rule 2: authority and newest official source win)

1. **CTIS titles.** The Belgium checklist page uses descriptive names and Annex I item numbers ("Statement on financing", "Site suitability statement", "GDPR statement"). We use the CTCG v3.0 naming guide instead, with `_BE_<lang>` on participant-facing documents and the procedure. P1 keeps the CTCG compensation title, the financing statement is P2 and the site agreements are P3 (D10).
2. **N1 signature.** The shared N1 form says to leave the signature block empty unless the Member State requires a signature. Belgium requires the head of the institution or a delegate to sign at submission, so `signature_at_submission` is true and the `n1_issued_by` national field keeps the block for that signatory.
3. **S1 section 5.1.** The shared S1 form says section 5 is filled in "only if applicable". Belgium requires its prescribed text and a scope declaration in section 5.1 whenever S1 is submitted (`national_fields` f03). Belgium also makes S1 conditional on human biological material being collected, stored or proposed for future use, unlike packages that treat S1 as always mandatory (D14).
4. **Minors' age bands.** The guides allow no fixed national bands: Belgium sets no statutory assent age and requires age-adapted documents based on the actual population (BAREC and CT-College paediatric advice v3.0, 10 July 2026). The minors set therefore has a young-child and an older-child/adolescent template with no ages, and `age_bands` is empty (D19).
5. **German participant documents.** German is required for participants recruited in the German-speaking region, but the mandatory CT-College templates are published only in Dutch, French and English. The guide's instruction is followed: confirm the implementation with FAMHP or the CT-College before submission and document the translation approach (D4).
6. **Pregnant participant.** The guide allows either a separate pregnancy document or the pregnancy section of the main ICF, and the CT-College prefers the main ICF. The CT-College preference is used as the default (D16).

## Open points

- The CT-College templates were not supplied: the adult-patient ICF (4 June 2026), the healthy-adult and vaccine ICFs (22 July 2026) and their sponsor statements. They are mandatory for the main and healthy-volunteer ICFs, so those documents cannot be drafted on their fixed text until they arrive (D5).
- These Belgian national forms were not supplied: the Statement on financing, the CV template and addendum, the site suitability template, and the prescribed S1 section 5.1 text.
- The guides do not name the Belgian GDPR implementing law. The R1 national field asks for the statement without naming the act.
- The variable sheets carry `_de` in every file name, and the French sheet has a typo ("localize for Belgiuml"). This has no effect, because the forms are shared.
- The French and Dutch versions of the guides (`/ctis/belgium/fr`, `/ctis/belgium/nl`) and the FAMHP PDF were not read, because they are outside the `/ctis/belgium/en/` scope.
