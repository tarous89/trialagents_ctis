# Romania templates

Source: the `CTIS_RO` folder (Part II DOCX forms `*_RO_ro.docx`, `Variable Templates_RO_de.xlsx`, `RO_12 participant-facing templates_09082026.txt`). Country guides: https://trialagents.com/ctis/romania/en and the ten pages it links to under `/ctis/romania/en/`, all reviewed 23 September 2026.

## Participant templates (JSON), used as supplied

Twelve files in `participant/`, already split from `RO_12 participant-facing templates_09082026.txt` with the content unchanged (`template_instructions` + `template_content` with `section_style`). The old pipeline variables were already plain bracket notes (`[population label]`, `[population description from the protocol]`, `[document name]`, `[date]`); no `{{…}}` variable remains and nothing was edited or renamed.

| File | Template id | Population set in `requirements.json` |
|---|---|---|
| `L1_SIS and ICF_main_RO_ro.json` | RO-PT-main | adult_patients (also re-consent at 18 and after regained capacity) |
| `L1_SIS and ICF_healthy_RO_ro.json` | RO-PT-healthy | healthy_volunteers |
| `L1_SIS and ICF_parents_RO_ro.json` | RO-PT-parents | minors |
| `L1_SIS and ICF_age 6-11_RO_ro.json` | RO-PT-age-6-11 | minors, readability band 6-11 |
| `L1_SIS and ICF_age 12-17_RO_ro.json` | RO-PT-age-12-17 | minors, readability band 12-17 |
| `L1_SIS and ICF_legal rep_RO_ro.json` | RO-PT-legal-rep | adults_without_capacity (also emergency, as applicable) |
| `L1_SIS and ICF_limited capacity_RO_ro.json` | RO-PT-limited-capacity | adults_without_capacity (as applicable) |
| `L1_SIS and ICF_emergency_RO_ro.json` | RO-PT-emergency | emergency |
| `L1_SIS and ICF_witness_RO_ro.json` | RO-PT-witness | impartial_witness |
| `L1_SIS and ICF_pregnancy_RO_ro.json` | RO-PT-pregnancy | pregnancy_participant |
| `L1_SIS and ICF_pregnant partner_RO_ro.json` | RO-PT-pregnant-partner | pregnancy_partner |
| `L1_SIS and ICF_secondary_RO_ro.json` | RO-PT-secondary | secondary_use |

Each template's `description`, `content_instructions`, `styling_instructions` and age band were checked against the Romania guides. They already carry the Order 3390/2022 rules the guides describe: physician consent interviewer trained on the protocol and GCP, the minor's mandatory agreement (Art. 15(2)), both signatures for a capable-of-opinion adult lacking capacity (Art. 15(3)), witness signs and dates (Annex 3), compensation limits (Annex 7), sample information (Annex 10). `styling_instructions` are reproduced verbatim in `../styling.md`.

## Part II forms

The seven `CTIS_RO` DOCX files are the shared EU forms in English (same text as `content/eu/templates/part-ii` apart from the old variables, which became the visible instructions; checked against the shared forms). The variable sheet targets Romanian answers. Nothing was copied or converted into `countries/RO/templates/part-ii`.

How each is used for Romania (`requirements.json`):

- **K1** shared EU form v2.0, answered in Romanian; national notes in `national_fields` v105, v108, v110, v114, v117, v121.
- **R1** shared EU form; no national data-protection statement is required by the guides (`r1_the_sponsor_declares` not applicable).
- **S1** shared EU form; Order 3390/2022 reproduces a biological-sample template that is explicitly not mandatory. National note in `f03`.
- **M1 and M2** not covered: Romania requires its national CV and declaration-of-interests forms (Order 3390/2022), which are not in the folder. Both are `third_party_document` with `template: null` until supplied (DECISIONS.md D2).
- **N1 and P1** the national site-suitability and compensation forms (Order 3390/2022) are not in the folder. The shared EU forms are bound only as interim content bases (`interim: true`, `use_for_upload: false`): same questions, but not the Romanian upload (DECISIONS.md D2).

## Conflicts resolved (rule 2: follow the authority; newest official source wins)

1. **Recruitment and consent procedure.** Order 3390/2022 (Annex 3) holds the May 2022 national form "RO_Procedura de recrutare şi obţinere a consimţământului informat"; EudraLex Volume 10 lists template v2.0 with full implementation from 1 September 2026, and the Order provides for republication of Romanian forms when Commission templates change. The guides direct v2.0 for new Part II submissions: the shared K1 (v2.0) is used, and the current ANMDMR form is checked before filing (K1.01, C11.01).
2. **Impartial witness trigger.** The witness template's description says the participant "cannot read, write or sign"; the Romania guides and Order 3390/2022 use the witness route when a participant can consent but cannot write. The guide wins: planned only in that case (catalogue `use_note`).
3. **EU forms in the folder vs national forms.** The folder's M1, M2, N1 and P1 are EU forms; the Romania guides require the current national forms. The national forms win (see Part II forms above).
4. **Signatures.** The shared N1 leaves the signature block empty unless the Member State requires one; Romania requires the principal investigator, the head of department and the institution manager to sign (`signature_at_submission: true`, national field `n1_issued_by`). The national CV and DoI forms are signed where the current form requires it. The P2 contract stays unsigned.
5. **CTIS titles.** The guides use descriptive names and the national form name above; CTIS titles follow the CTCG naming guide v3.0.
6. **Age bands.** None: Order 3390/2022 publishes no fixed assent bands, and the templates themselves call 6-11 and 12-17 readability bands, not legal thresholds. File names unchanged.

## Mapping to the Romania Part II checklist

Thirteen document entries for the ten checklist items: 1 → RO-L1 (with the population sets for the conditional population documents); 2 → RO-K1, RO-K2; 3 → RO-M1, RO-M2-DOI; 4 → RO-N1, RO-N-PHASE1; 5 → RO-O1; 6 → RO-P1; 7 → RO-P2; 8 → RO-R1; 9 → RO-S1; 10 → RO-FEE (CTIS Forms section).

## Open points

See `../DECISIONS.md`.
