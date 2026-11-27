# Austria templates

Source: the `CTIS_AT` folder (Part II DOCX forms `*_AT_de.docx`, `Variable Templates_AT_de.xlsx`, `AT_13 participant-facing templates_06082026.txt`). Country guides: https://trialagents.com/ctis/austria/en and its ten linked pages, all reviewed 23 September 2026.

## Participant templates (JSON), used as supplied

Thirteen files in `participant/`, split from `AT_13 participant-facing templates_06082026.txt` with the content unchanged (`template_instructions` + `template_content` with `section_style`). The old pipeline variables were already plain bracket notes such as `[Kurzbezeichnung der Population]`; nothing else was edited.

| File | Template id | Population set in `requirements.json` |
|---|---|---|
| `L1_SIS and ICF_main_AT_de.json` | AT-PT-main | adult_patients (also re-consent at 18; genetic module for optional_genetics) |
| `L1_SIS and ICF_healthy_AT_de.json` | AT-PT-healthy | healthy_volunteers |
| `L1_SIS and ICF_parents_AT_de.json` | AT-PT-parents | minors |
| `L1_SIS and ICF_age 8-9_AT_de.json` | AT-PT-age-8-9 | minors, band 8-9 |
| `L1_SIS and ICF_age 10-13_AT_de.json` | AT-PT-age-10-13 | minors, band 10-13 |
| `L1_SIS and ICF_age 14-17_AT_de.json` | AT-PT-age-14-17 | minors, band 14-17 |
| `L1_SIS and ICF_legal rep_AT_de.json` | AT-PT-legal-rep | adults_without_capacity, temporary_incapacity |
| `L1_SIS and ICF_limited capacity_AT_de.json` | AT-PT-limited-capacity | adults_without_capacity (as applicable) |
| `L1_SIS and ICF_emergency_AT_de.json` | AT-PT-emergency | emergency; provisional basis for temporary_incapacity post-hoc form |
| `L1_SIS and ICF_witness_AT_de.json` | AT-PT-witness | impartial_witness |
| `L1_SIS and ICF_pregnancy_AT_de.json` | AT-PT-pregnancy | pregnancy_participant |
| `L1_SIS and ICF_pregnant partner_AT_de.json` | AT-PT-pregnant-partner | pregnancy_partner |
| `L1_SIS and ICF_secondary_AT_de.json` | AT-PT-secondary | secondary_use |

## Part II forms

Austria uses the shared EU forms in `content/eu/templates/part-ii` for K1, M1, M2, P1, R1 and S1. The CTIS_AT DOCX files and variable sheet were checked identical to the shared forms apart from variable numbering; nothing was converted and nothing is copied here. Answers in English for the multinational dossier (DECISIONS.md D1). National additions are in `requirements.json`: `national_fields` for K1 (Member State fields v105, v108, v110, v114, v117, v121), R1 (`r1_the_sponsor_declares`, required national data-protection confirmation) and S1 (`f03`, Austrian future-use rules), plus `drafting_notes_en`.

**N1 is not covered.** Austria requires its national Trial Site Suitability Form and does not accept the generic EU form. The CTIS_AT `N1_Site suitability_AT_de.docx` is the EU form, so it is not used for Austria. AT-N1 is a `third_party_document` until the official national DOCX is supplied and converted into `templates/part-ii` with `tools/content/curate.py` and `fields.py` (DECISIONS.md D2).

## Conflicts resolved (rule 2: authority and newest official source win)

1. **Age bands.** The template descriptions say "aged 12 - 17 years" (10-13 and 14-17 templates) and "aged 6 - 11 years" (8-9 template). AustrianEthics bands are 8-9, 10-13 and 14-17, with no age-band document required under 8. The authority's bands are used; file names and model text already match them. The 10-13 template's `doc_type` "adolescents" is left as supplied; it is catalogued as a child document.
2. **Forum recommendation (2002) vs current platform.** The linked Forum minors recommendation (v1.1, 2002) uses older age examples; the current AustrianEthics bands are the planning baseline, with the Forum's written-signature-from-14 rule kept as a note.
3. **N1 form.** Shared EU site-suitability form vs Austrian national form: the national form is mandatory (BASG, AustrianEthics).
4. **CTIS titles.** The Austria checklist page uses descriptive names ("P1 Compensation trial participants, investigator, funding and other arrangements", "R1 Compliance on the collection and use of personal data", "S1 Compliance on the collection, use and storage of biological samples", "M1 CV Investigator", "M2 Declaration of Interest", "K2 Recruitment material description"). The CTCG v3.0 naming guide is used instead.
5. **Impartial witness trigger.** The witness template's description and opening also cover a person who cannot read. Article 29 CTR, as recorded in the Austria guide, triggers the witness route only when the consenting person cannot write. The template is planned only in that case.
6. **Pregnant partner.** A partner template is supplied, but Austria has no national partner requirement; it is planned only when the protocol collects identifiable partner data.
7. **Form answer language.** The CTIS_AT variable sheet targets German answers; the guides record an English dossier for multinational trials. English is set as answer language (DECISIONS.md D1).
8. **Optional genetic consent.** The templates put "Gesonderte Einwilligung zur optionalen genetischen Untersuchung" inside the main consent form; AustrianEthics requires a separate consent form. A separate document is planned (DECISIONS.md D4).
9. **One representative signature.** The parents template has one signature block for "der obsorgeberechtigten Person"; the guide says not to hard-code a one- or two-parent rule (DECISIONS.md D6).

## Open points

- The official Austrian national ICF template (DOCX) was not supplied, so the verbatim insurance (section 10) and data-protection (section 13) passages in the templates could not be compared with it (DECISIONS.md D3).
- No templates for K2, L2, GCP evidence, N1 (national form), O1, O2, optional genetic consent, post-hoc consent after temporary incapacity outside an emergency, the site contact list and information for children under 8. See the Missing list in `../DECISIONS.md`.
- The limited-capacity template's styling text says "Für Kinder"; kept verbatim in `styling.md`.
