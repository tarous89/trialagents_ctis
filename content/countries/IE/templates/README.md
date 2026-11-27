# Ireland templates

Source: the `CTIS_IE` folder (Part II DOCX forms `*_IE_en.docx`, `Variable Templates_IE_de.xlsx`, `IE_13 participant_facing_templates_10082026.txt`). Country guides: https://trialagents.com/ctis/ireland/en and its ten linked pages under `/ctis/ireland/en/`, all reviewed 23 September 2026 and read in full on 27 November 2026.

## Participant templates (JSON), used as supplied

Thirteen files in `participant/`, split from `IE_13 participant_facing_templates_10082026.txt` with `tools/content/split_participant.py` (country code checked as IE). The content is unchanged (`template_instructions` + `template_content` with `section_style`). The only edit is the standard one: the old pipeline variables (`{{population_label}}`, `{{population_description}}`, `{{doc_name_local}}`, `{{date}}`) became plain bracket notes such as `[population label]`. No file was renamed.

| File | Template id | Population set in `requirements.json` |
|---|---|---|
| `L1_SIS and ICF_main_IE_en.json` | IE-PT-main | adult_patients; re-consent after regained capacity (adults_without_capacity, emergency); re-consent at 16 when the participant is already 18 or older |
| `L1_SIS and ICF_healthy_IE_en.json` | IE-PT-healthy | healthy_volunteers |
| `L1_SIS and ICF_age 16-17_IE_en.json` | IE-PT-age-16-17 | participants_16_17; re-consent at 16 for minors |
| `L1_SIS and ICF_parents_IE_en.json` | IE-PT-parents | minors (under 16) |
| `L1_SIS and ICF_age 6-11_IE_en.json` | IE-PT-age-6-11 | minors, band 6-11 |
| `L1_SIS and ICF_age 12-15_IE_en.json` | IE-PT-age-12-15 | minors, band 12-15 |
| `L1_SIS and ICF_legal rep_IE_en.json` | IE-PT-legal-rep | adults_without_capacity; emergency (representative decides first, adapted) |
| `L1_SIS and ICF_limited capacity_IE_en.json` | IE-PT-limited-capacity | adults_without_capacity |
| `L1_SIS and ICF_emergency_IE_en.json` | IE-PT-emergency | emergency |
| `L1_SIS and ICF_witness_IE_en.json` | IE-PT-witness | impartial_witness |
| `L1_SIS and ICF_pregnancy_IE_en.json` | IE-PT-pregnancy | pregnancy_participant |
| `L1_SIS and ICF_pregnant partner_IE_en.json` | IE-PT-pregnant-partner | pregnancy_partner |
| `L1_SIS and ICF_secondary_IE_en.json` | IE-PT-secondary | secondary_use |

## Part II forms

Ireland uses the shared EU forms in `content/eu/templates/part-ii` for K1, M1, M2, P1 and S1, answered in English. The seven `CTIS_IE` DOCX files (K1, M1, M2, N1, P1, R1, S1) were compared with the `CTIS_AT` files that were already checked against the shared forms: the paragraph text is identical once the variable placeholders are normalised. The 48 prompts in `Variable Templates_IE_de.xlsx` are identical to Austria's apart from the country and language names (target language English, "localize … to Ireland"). Nothing was converted and nothing is copied here. National additions are in `requirements.json`: `national_fields` for K1 (Member State fields v105, v108, v110, v114, v117, v121) and S1 (`f03`, Irish future-use limits), plus `drafting_notes_en`.

**Two forms are not covered by the shared set.** Each document stays in `requirements.json`, but its template is missing:

- **N1.** Ireland requires the current NREC-CT Site Suitability Form (template version 2) for every Irish site, "not only the generic EU form". `N1_Site suitability_IE_en.docx` is the generic EU form, so it is not used. IE-N1 is a `third_party_document` until the national DOCX is supplied and converted into `templates/part-ii` with `tools/content/curate.py` and `fields.py` (DECISIONS.md D1).
- **R1.** Ireland requires the current NREC Statement of Compliance regarding Data Protection (version 2), or a DPIA instead. "A generic EU GDPR statement does not replace this Irish requirement." `R1_Data protection_IE_en.docx` is the generic EU statement, so it is not used. IE-R1 is a `third_party_document` until the NREC template is supplied and converted (DECISIONS.md D2).

## Conflicts resolved (rule 2: the authority and the newest official source win)

1. **Age of minority.** The parents template's `description` says "younger than 18 years". Under Irish regulated-trial law (S.I. No. 99/2022, as recorded in the guides) a minor is a person under 16. The parents template is planned only for participants under 16. Its own content instructions already say "under 16".
2. **Adolescent bands.** The `description` of both the 12-15 and the 16-17 templates says "aged 12 - 17 years". The file names, the content instructions and the Irish rule give 12-15 (assent, with guardian consent) and 16-17 (own consent). The authority is followed. The 16-17 template is catalogued as a capable participant's own consent, not a minor's document.
3. **Re-consent age.** The main template's `description` names "re-consent after reaching adulthood". Ireland requires the participant's own consent on reaching 16. Re-consent at 16 uses the 16-17 template, or the main or healthy template if the participant is already 18 or older.
4. **Adults from 16.** The main and healthy templates are written for people aged 18 or older, and Irish legal competence starts at 16. People aged 16-17 use the 16-17 template. For healthy volunteers aged 16-17 there is no template (DECISIONS.md D7).
5. **Assent bands.** The guides say the law prescribes no fixed assent bands: bands must be chosen for the protocol population and justified. 6-11 and 12-15 are kept as the templates' default drafting bands, to be justified per study (DECISIONS.md D8).
6. **N1 form.** The shared EU site-suitability form conflicts with the NREC-CT national form. The national form is mandatory (NREC-CT, National Office).
7. **R1 form.** The shared EU GDPR statement conflicts with the NREC Statement of Compliance or DPIA. The national requirement wins.
8. **Witness scope.** The witness template is limited to a capable adult participant ("Do not add incapacity, representative … language"). The Ireland guide also plans the witness route when the legally designated representative cannot read or write. The guide is recorded as the rule, and the template's limit is raised as DECISIONS.md D9.
9. **Emergency representative.** The emergency template keeps one participant-addressed document with a conditional representative signature block. The Ireland guide lists separate "representative information and consent documents" for the emergency pathway. A representative document adapted from the legal-rep template is planned (DECISIONS.md D10).
10. **CTIS titles.** The Ireland checklist uses descriptive names ("Irish Site Suitability Form", "NREC Statement of Compliance or Data Protection Impact Assessment", "Proof of insurance or indemnity", "Principal investigator curriculum vitae"). The CTCG v3.0 naming guide (reviewed 23 September 2026, unchanged) is used instead.
11. **Styling.** The base style sets 11 pt and a German page label. The Irish templates require about 12 pt, and the footer uses English "Page x of y". The stricter country rule is used (`styling.md`).

## Open points

- **Variable sheet name.** The variable sheet is named `Variable Templates_IE_de.xlsx`, but its content targets English and Ireland. It is treated as a misnamed English sheet. No German applies to Ireland.
- **National forms not supplied.** The NREC-CT Site Suitability Form v2 and the NREC Statement of Compliance v2, with its guidance, were not supplied (D1, D2).
- **Documents without a template.** No templates exist for the following, listed in the Missing section of `../DECISIONS.md`:
  - K2 and L2/R2 materials
  - O1 insurance or indemnity evidence
  - P2 other financial arrangements
  - HPRA fee form
  - the short immediate emergency information sheet
  - separate healthy-volunteer screening consent
  - a witness version for a representative
  - information for children under 6
  - a separate optional-genetics consent (if chosen)
- **External sources not read.** The guides link two official sources outside `/ctis/ireland/en/` (the HPRA guide AUT-G0170-5 PDF and the NREC Guidance on Age of Consent). They were not read. Their content is used only as the guides summarise it.
