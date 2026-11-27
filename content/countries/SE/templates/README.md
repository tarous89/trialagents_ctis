# Sweden templates

Source: the `CTIS_SE` folder (Part II DOCX forms `*_SE_sv.docx`, `Variable Templates_SE_de.xlsx`, `SE_13 participant-facingtemplates_06082026.txt`). Country guides: https://trialagents.com/ctis/sweden/en and its ten linked pages, all reviewed 23 September 2026.

## Participant templates (JSON), used as supplied

Thirteen files in `participant/`, split from `SE_13 participant-facingtemplates_06082026.txt` with `tools/content/split_participant.py`. A fresh split was compared with the folder and is identical. The content is unchanged (`template_instructions` + `template_content` with `section_style`). The only edit is the split tool's own: it turned the old pipeline variables into plain bracket notes such as `[population label]` and `[document name]`. The templates follow the Kliniska Studier Sverige template v7 (2025-11-12). Etikprövningsmyndigheten points sponsors to that template; Sweden has no universal national form.

| File | Template id | Population set in `requirements.json` |
|---|---|---|
| `L1_SIS and ICF_main_SE_sv.json` | SE-PT-main | adult_patients (also own consent after regained capacity; adult re-consent where needed) |
| `L1_SIS and ICF_healthy_SE_sv.json` | SE-PT-healthy | healthy_volunteers |
| `L1_SIS and ICF_parents_SE_sv.json` | SE-PT-parents | minors (guardians) |
| `L1_SIS and ICF_age 6-11_SE_sv.json` | SE-PT-age-6-11 | minors, band 6-11 |
| `L1_SIS and ICF_age 12-14_SE_sv.json` | SE-PT-age-12-14 | minors, band 12-14 |
| `L1_SIS and ICF_age 15-17_SE_sv.json` | SE-PT-age-15-17 | minors, 15-17 who understand the trial (own consent), and participants turning 15 |
| `L1_SIS and ICF_legal rep_SE_sv.json` | SE-PT-legal-rep | adults_without_capacity; emergency (representative first) |
| `L1_SIS and ICF_limited capacity_SE_sv.json` | SE-PT-limited-capacity | adults_without_capacity |
| `L1_SIS and ICF_emergency_SE_sv.json` | SE-PT-emergency | emergency (adults) |
| `L1_SIS and ICF_witness_SE_sv.json` | SE-PT-witness | impartial_witness |
| `L1_SIS and ICF_pregnancy_SE_sv.json` | SE-PT-pregnancy | pregnancy_participant |
| `L1_SIS and ICF_pregnant partner_SE_sv.json` | SE-PT-pregnant-partner | pregnancy_partner |
| `L1_SIS and ICF_secondary_SE_sv.json` | SE-PT-secondary | secondary_use |

## Part II forms

Sweden references the shared EU forms in `content/eu/templates/part-ii` for K1, M1, M2, N1, P1, R1 and S1. Nothing was converted and nothing is copied here. The CTIS_SE DOCX files are the English EU forms with old variables. The variable sheet asks for Swedish answers ("Target_language: Swedish"), although the file is named `_SE_de`. Answers are in Swedish (`answer_languages: ["sv"]`). National additions are in `requirements.json`:

- `national_fields` for K1 (v105, v108, v110, v113, v114, v117, v121), N1 (`n1_issued_by`), R1 (`r1_the_sponsor_declares`, the required Swedish national compliance statement) and S1 (`f03`, the Biobank Act and the parallel biobank process);
- `drafting_notes_sv` for every document.

Läkemedelsverket lists Swedish national templates for six areas:

- the recruitment and consent procedure;
- `Prövarens CV`;
- `Deklaration av intressekonflikter`;
- `Prövningsställets lämplighet`;
- `Ersättning för deltagande i klinisk prövning`;
- `Följsamhet med regler för hantering av biologiska prov`.

None was supplied. For K1 the guide says the EU or Swedish format is recommended. For the other areas it only says that Läkemedelsverket lists the template. No guide says the EU form is refused. The EU forms therefore stay bound, and each document records its `national_template`. The EU forms' fixed text is English, but the Swedish language rule covers Annex I points 59 to 73. That is why the Swedish templates are asked for in DECISIONS.md D1.

## Conflicts resolved (rule 2: the authority and the newest official source win)

1. **Impartial-witness trigger.** The witness template (description and instructions) and the secondary-use template also cover a person who "cannot read". Läkemedelsverket, as recorded in the Sweden guide, uses the witness route only when a participant who can decide cannot write or cannot sign. It is never used for limited health literacy, interpreter needs or a second signature. The template is planned only in that case.
2. **Re-consent at 18.** The main template's description lists "re-consent after reaching adulthood". Läkemedelsverket requires no new consent just because a participant turns 18, if the participant gave valid own consent after 15. Adult re-consent is planned only for participants without that consent, or after an amendment or new risk information. Own consent is required when a participant turns 15 and understands the trial.
3. **Age bands.** The templates use the bands 6-11, 12-14 and 15-17. Swedish law sets no fixed child-information bands below 15. The bands 6-11 and 12-14 are kept as drafting bands, so there is no conflict. 15 is the statutory threshold for own consent (SFS 2026:497). The 15-17 template is used only for minors who understand what taking part means. For minors under 6 and for 15-17-year-olds who do not understand, see DECISIONS.md D9 and D10.
4. **Limited-capacity information.** The template description limits it to adults "who retain sufficient understanding". The Sweden guide requires information adapted to the person's ability to understand in every case. The template is always planned with the legal-representative document.
5. **Pregnant partner and secondary use "must be used".** The Sweden guides make both needs study-specific. A partner document is planned only when the protocol collects identifiable information directly from the partner. A separate optional consent is planned only for a genuinely separate optional use; it is not needed for every later use of trial data.
6. **Healthy volunteers.** The template may be used "for non-treated participants when no other template applies". The Sweden guide warns against treating a person as a healthy volunteer only because the study is non-therapeutic. It also excludes people under compulsory or forensic psychiatric care from non-therapeutic trials. The guide's trigger is used.
7. **Emergency template, adults only.** The Sweden guide asks for documents for every realistic post-emergency pathway: representative, minors and guardians, and limited capacity. Those pathways use the other sets (DECISIONS.md D12).
8. **CTIS titles.** The Sweden checklist page uses descriptive names, for example "P1 Compensation, investigator, funding and other arrangements" and "M1 CV Investigator". The CTCG v3.0 naming guide is used instead, with `_SE_sv` on every document.
9. **Fee location.** The Sweden guide names "Q Proof of payment of fee". The CTCG naming guide does not use Q and places proof of fee in the Forms section. The CTIS area Läkemedelsverket instructs is followed (DECISIONS.md D4).
10. **Endpoint questionnaires and diaries.** Other countries plan these under R2. The Sweden checklist files them as L2 "Other subject information material", in Swedish. The Sweden guide is followed (SE-L2).

## Open points

- The Läkemedelsverket Swedish national Part II templates were not supplied (D1).
- No template for K2, L2, O1, O2, the fee document, information for children under 6, the documents for 15-17-year-olds who do not understand the trial, or the post-emergency guardian documents. See the Missing list in `../DECISIONS.md`.
- The EU P1 form covers participant compensation only. Trial financing and investigator and site payments need separate content (D3).
- The Swedish-language guides (`/ctis/sweden/sv`) were not read; they are outside the `/ctis/sweden/en/` scope.
