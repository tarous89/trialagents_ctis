# Portugal templates

Source: the `CTIS_PT` folder (Part II DOCX forms `*_PT_pt.docx`, `Variable Templates_PT_de.xlsx`, `PT_12 participant-facing templates_08082026.txt`). Country guides: https://trialagents.com/ctis/portugal/en and its ten linked pages, all reviewed 23 September 2026 and read in full on 27 November 2026. The naming guide (reviewed 23 September 2026) is unchanged.

## Participant templates (JSON), used as supplied

Twelve files in `participant/`, split from `PT_12 participant-facing templates_08082026.txt` with the content unchanged (`template_instructions` + `template_content` with `section_style`). The old pipeline variables were already plain bracket notes (`[population label]`, `[population description from the protocol]`, `[document name]`, `[date]`); nothing else was edited. All twelve are based on the CEIC adult ICF model of January 2026, which the guides describe as optional.

| File | Template id | Population set in `requirements.json` |
|---|---|---|
| `L1_SIS and ICF_main_PT_pt.json` | PT-PT-main | adult_patients; adult re-consent at 18; regained capacity (adults_without_capacity, emergency) |
| `L1_SIS and ICF_healthy_PT_pt.json` | PT-PT-healthy | healthy_volunteers; re-consent at 18 for healthy minors |
| `L1_SIS and ICF_parents_PT_pt.json` | PT-PT-parents | minors |
| `L1_SIS and ICF_age 6-11_PT_pt.json` | PT-PT-age-6-11 | minors (children able to form an opinion) |
| `L1_SIS and ICF_age 12-17_PT_pt.json` | PT-PT-age-12-17 | minors (always at 16-17); provisional basis for the written age-16 assent form |
| `L1_SIS and ICF_legal rep_PT_pt.json` | PT-PT-legal-rep | adults_without_capacity; emergency (participant remains unable to consent) |
| `L1_SIS and ICF_limited capacity_PT_pt.json` | PT-PT-limited-capacity | adults_without_capacity (always) |
| `L1_SIS and ICF_emergency_PT_pt.json` | PT-PT-emergency | emergency |
| `L1_SIS and ICF_witness_PT_pt.json` | PT-PT-witness | impartial_witness |
| `L1_SIS and ICF_pregnancy_PT_pt.json` | PT-PT-pregnancy | pregnancy_participant |
| `L1_SIS and ICF_pregnant partner_PT_pt.json` | PT-PT-pregnant-partner | pregnancy_partner |
| `L1_SIS and ICF_secondary_PT_pt.json` | PT-PT-secondary | secondary_use |

## Part II forms

Portugal uses the shared EU forms in `content/eu/templates/part-ii` for K1, M1, M2, N1, P1, R1 and S1. The CTIS_PT DOCX files were compared with the shared forms: same text apart from the variables and the curated instruction labels; nothing was converted and nothing is copied here. The variable sheet targets Portuguese answers (`Target_language: Portuguese`, "localize for Portugal"), so the answer language is Portuguese (DECISIONS.md D1). National additions are in `requirements.json`: `national_fields` for K1 (Member State fields v105, v108, v110, v114, v117, v121: Law No 9/2026 rules), N1 (v125, v126, v128, v129, n1_issued_by: CEIC national site detail and the required signature), P1 (f04, f06), R1 (`r1_the_sponsor_declares`, recommended Law No 58/2019 sentence) and S1 (`f03`, Law No 12/2005, Decree-Law No 131/2014, Law No 58/2019 Article 31), plus `drafting_notes_pt` for every document.

No form is a national one: Portugal accepts the EudraLex site-suitability form (with national detail), recommends the EU K1, CV and DoI templates, treats the EU P1 template as optional, accepts the EU GDPR statement in the CTIS Form section and requires the EU S1 template when samples are involved.

## Conflicts resolved (rule 2: authority and newest official source win)

1. **Age bands.** The templates give "aged 6 - 11 years" and "aged 12 - 17 years". Law No 9/2026 sets no younger-child bands; it sets thresholds at 16 (assent mandatory at 16-17, written assent on turning 16) and 18 (own consent). Under 16, assent is required whenever the child can form an opinion and evaluate the information. The template bands are kept as drafting bands; `population_rules.minors.legal_thresholds` carries the statutory rules, which the template content already reflects.
2. **Limited-capacity document.** The legal-representative template plans the limited-capacity document only when the participant can understand adapted information; the Portugal guide makes participant information adapted to capacity mandatory. Always planned.
3. **Impartial-witness trigger.** The witness template's description covers a person who "cannot read, write or sign"; the guide (Article 29 CTR) triggers the witness when the person can consent but cannot write, including a physical inability to sign. Planned only in that case. The guide also applies the witness route to a representative who cannot write, which the template does not cover (DECISIONS.md D10).
4. **Pregnant partner status.** The partner template says the partner is not a trial participant; the guide says she is a separate data subject and may also be a research participant for the follow-up activity. Drafting follows the guide; the template stays as supplied (DECISIONS.md D12).
5. **CTIS titles.** The Portugal guides use descriptive folder names and give no national titles; the CTCG v3.0 naming guide is used. Titles for the N service authorisation, pharmacy declaration, coordinator and external-facility documents and the GCP certificate are not given anywhere and follow the next-free-number pattern (DECISIONS.md D4, D6).
6. **Other participant-facing material.** The Portugal checklist puts patient cards, diaries, questionnaires and instructions in folder L; the naming guide offers R2 for endpoint-related patient-facing documents. The national checklist is followed (L2) pending DECISIONS.md D3.
7. **Data-protection statement.** The naming guide places the GDPR statement in the Forms section; the Portugal guide accepts that statement for Part II and says it need not be duplicated. R1 is drafted on the shared form for the Form-section upload (DECISIONS.md D2).

## Open points

- The variable sheet is named `Variable Templates_PT_de.xlsx` although its content targets Portuguese; the file name looks like a copy error and was not used for anything else.
- The CEIC Part II checklist v2.0 (1 August 2022), the CEIC financial-arrangements guidance (24 August 2022) and the CEIC January 2026 ICF model are only summarised in the guides; their exact item lists could not be checked.
- No templates for K2, L2, the GCP certificate, the N service authorisation, pharmacy declaration, coordinator and external-facility documents, O1, O2, P2, the written age-16 assent form, information for children under 6, the short emergency information sheet, easy-read or accessible formats and the witness section for a representative. See the Missing list in `../DECISIONS.md`.
- The main and parents templates refer to a separate withdrawal-options document ("Opções de Saída do Participante do Ensaio Clínico e Declaração de Retirada de Consentimento", section E); no template was supplied and the guides do not mention it.
- The templates' comprehension-check questions (underlined italics) are treated as drafting aids for the investigator and removed from the final participant copy, like other italic notes.
