# Finland templates

Sources: the `CTIS_FI_fi` folder (Part II DOCX forms `*_FI_fi.docx`, `Variable Templates_FI_fi_de.xlsx`, `FI_13 participant-facing templates_11082026.txt`) and the `CTIS_FI_sv` folder (Part II DOCX forms `*_FI_sv.docx`, `Variable Templates_FI_sv_de.xlsx`; no participant templates). Country guides: https://trialagents.com/ctis/finland/en and its ten linked pages, all reviewed 23 September 2026.

Finland has two package languages, Finnish (`fi`) and Swedish (`sv`). File names carry the language code; a Swedish set would sit in the same `participant/` folder.

## Participant templates (JSON), used as supplied

Thirteen Finnish files in `participant/`, split from `FI_13 participant-facing templates_11082026.txt` with the content unchanged (`template_instructions` + `template_content` with `section_style`). The old pipeline variables were already plain bracket notes (`[population label]`, `[population description from the protocol]`, `[document name]`, `[date]`); nothing else was edited.

| File | Template id | Population set in `requirements.json` |
|---|---|---|
| `L1_SIS and ICF_main_FI_fi.json` | FI-PT-main-fi | adult_patients (also re-consent at 18 or when capacity returns) |
| `L1_SIS and ICF_healthy_FI_fi.json` | FI-PT-healthy-fi | healthy_volunteers |
| `L1_SIS and ICF_parents_FI_fi.json` | FI-PT-parents-fi | minors (guardian or other legal representative) |
| `L1_SIS and ICF_age 6-11_FI_fi.json` | FI-PT-age-6-11-fi | minors, band 6-11 |
| `L1_SIS and ICF_age 12-14_FI_fi.json` | FI-PT-age-12-14-fi | minors, band 12-14 |
| `L1_SIS and ICF_age 15-17_FI_fi.json` | FI-PT-age-15-17-fi | minors, band 15-17 (independent pathway or own written consent) |
| `L1_SIS and ICF_legal rep_FI_fi.json` | FI-PT-legal-rep-fi | adults_without_capacity; later representative consent after emergency enrolment |
| `L1_SIS and ICF_limited capacity_FI_fi.json` | FI-PT-limited-capacity-fi | adults_without_capacity |
| `L1_SIS and ICF_emergency_FI_fi.json` | FI-PT-emergency-fi | emergency |
| `L1_SIS and ICF_witness_FI_fi.json` | FI-PT-witness-fi | impartial_witness |
| `L1_SIS and ICF_pregnancy_FI_fi.json` | FI-PT-pregnancy-fi | pregnancy_participant |
| `L1_SIS and ICF_pregnant partner_FI_fi.json` | FI-PT-pregnant-partner-fi | pregnancy_partner |
| `L1_SIS and ICF_secondary_FI_fi.json` | FI-PT-secondary-fi | secondary_use |

**Swedish set: missing.** No Swedish participant templates were supplied. `requirements.json` records the thirteen Swedish counterparts in `participant_templates_missing` (status `missing`, no file) and lists each population set's Swedish documents under `documents_sv` with `"template": "missing"`. `participant_templates` holds only the supplied Finnish files. Until a Swedish set is supplied, Swedish documents are adapted from the approved Finnish documents (`DECISIONS.md` D3).

## Part II forms

Finland uses the shared EU forms in `content/eu/templates/part-ii` for K1, M1, M2, N1, P1, R1 and S1, as Tukija requests (EU Recruitment and Informed Consent Procedure v2.0, CV, declaration of interest, site suitability, compensation; EU data-protection and biological-sample statements). The `CTIS_FI_fi` and `CTIS_FI_sv` DOCX files have the same text as the CTIS_AT and CTIS_SE forms already checked against the shared forms (variables removed, paragraph by paragraph identical), and the two variable sheets (855 variables each) are identical to each other and to the Sweden sheet apart from language, country and variable numbering. Nothing was converted and nothing is copied here; no national form replaces a shared one.

The K1 form is used twice: as `K1_Recruitment arrangements` (checklist item 1) and, as the same file, under Subject information and informed consent procedure (item 4, `FI-L1-PROCEDURE`; `DECISIONS.md` D4).

National additions are in `requirements.json`: `national_fields` for K1 (Member State fields v105, v108, v110, v114, v117, v121: languages, transcripts instead of media files, consent recording and archive, interpreter, section 13 representative order, section 14 minors and age-15 pathway, witness, emergency records) and S1 (`f03`, separate Tukija future-use consent when samples are used outside the protocol), plus `drafting_notes_fi` and `drafting_notes_sv` on every document. R1 needs no national sentence for Finland.

## Conflicts resolved (rule 2: authority and newest official source win)

1. **Placement of other patient-facing forms.** Tukija T/448/2026 (7 May 2026) asks for questionnaires, diaries and similar forms in Part I in Finnish, Swedish or English and requires no Part II translations; the European Commission Q&A (March 2026) generally places participant-form translations in Part II. Tukija (national and newer) is followed: `FI-PATIENT-FORMS` titled `D4_...`, with `R2_...` kept as the alternative if the CTIS structure requires it (`DECISIONS.md` D7).
2. **Age bands.** The 12-14 and 15-17 templates describe themselves as for "adolescent participants (aged 12 - 17 years)". Tukija sets no fixed bands; the statutory threshold is 15 (section 14, Act 983/2021). The file names and model text (12-14 and 15-17) are followed; all bands are drafting bands to be justified in K1.
3. **Impartial witness trigger.** The witness template's description covers a participant who "cannot read, write or sign". The Finland guide uses the witness only when the consenting person cannot write, and not for language, limited literacy or interpreter use. The guide's narrower trigger is used; the guide also extends it to a legal representative who cannot write (`DECISIONS.md` D17).
4. **Pregnant participant.** The pregnancy template says it "must be used" whenever pregnancy information is collected from a participant. The guide says a separate document is needed only when follow-up goes beyond what the main consent covers. The guide is followed (`DECISIONS.md` D15).
5. **Secondary use.** The secondary-use template's description covers data, samples or genetic material. The guide limits Tukija's template (T/171/2025) to biological samples and related data, and forbids presenting it as a national form for data-only reuse. Data-only reuse is handled as a separate Article 28(2) choice (`DECISIONS.md` D14).
6. **CTIS titles.** The Finland checklist page uses descriptive names ("Trial financing and site payments", "Biological-sample compliance statement", "Site suitability statement"). The CTCG v3.0 naming guide is used instead, with `_FI_fi` / `_FI_sv` on the participant-facing and procedure documents.
7. **Minors' guardian document.** The population set lists the guardian template for all minors, but under the age-15 independent pathway the guardian is informed, not asked to consent; `population_rules.minors.independent_consent_15_17` records this.

## Open points

- The official Tukija templates (T/447/2026 of 25 June 2026 and T/171/2025) were not supplied, so the insurance wording (Pharmaceutical Injuries Insurance and patient insurance) and the other Tukija passages in our templates cannot be checked word for word.
- The 15-17 and parents templates refer to FINPEDMED forms (FPM-E-005 guardian notification; FINPEDMED model for an absent second guardian). The Finland guides do not mention them and none was supplied (`DECISIONS.md` D13).
- No templates for K2, a separate privacy notice, P2, P3, O1, the fee invoicing details, other patient-facing forms, an easy-language version and information for children under 6. See the Missing list in `../DECISIONS.md`.
- Some templates carry English instructions: `content_instructions` of main, and `styling_instructions` of main, 15-17, emergency, healthy, legal rep, parents and witness; kept verbatim.
- The Swedish variable sheet names its target audience "Swedish regulatory body" and both sheets carry `_de` in the file name; content is otherwise the Finland sheet in Swedish. Not used, since the forms are shared.
