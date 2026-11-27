# Netherlands templates

Source: the `CTIS_NL` folder (Part II DOCX forms `*_NL_nl.docx`, `Variable Templates_NL_de.xlsx`, `NL_Participant-facing_templates_05082026.txt`, and `Participant-facing templates_NL.docx`, a copy of the participant templates). Country guides: https://trialagents.com/ctis/netherlands/en and its ten linked pages, all reviewed 23 September 2026.

## Participant templates (JSON), used as supplied

Twelve files in `participant/`, split from `NL_Participant-facing_templates_05082026.txt` with `tools/content/split_participant.py`. The content is unchanged (`template_instructions` + `template_content` with `section_style`). A fresh split was checked byte for byte against the files. The old pipeline variables became plain bracket notes in English (`[population label]`, `[population description from the protocol]`, `[document name]`, `[date]`), because the split tool has no Dutch wording for them. Nothing else was edited, and the file names are kept as supplied, including `age 6-11` and `age 12-17` (see conflicts 1 and 2).

| File | Template id | Population set in `requirements.json` |
|---|---|---|
| `L1_SIS and ICF_main_NL_nl.json` | NL-PT-main | adult_patients (16 or older); own re-consent when capacity is regained |
| `L1_SIS and ICF_healthy_NL_nl.json` | NL-PT-healthy | healthy_volunteers (16 or older) |
| `L1_SIS and ICF_parents_NL_nl.json` | NL-PT-parents | minors (under 16) |
| `L1_SIS and ICF_age 6-11_NL_nl.json` | NL-PT-age-6-11 | minors, band under 12 (discussion sheet) |
| `L1_SIS and ICF_age 12-17_NL_nl.json` | NL-PT-age-12-17 | minors, band 12-15; re-consent at 12 |
| `L1_SIS and ICF_legal rep_NL_nl.json` | NL-PT-legal-rep | adults_without_capacity; emergency (adapted, for the representative) |
| `L1_SIS and ICF_limited capacity_NL_nl.json` | NL-PT-limited-capacity | adults_without_capacity |
| `L1_SIS and ICF_emergency_NL_nl.json` | NL-PT-emergency | emergency |
| `L1_SIS and ICF_witness_NL_nl.json` | NL-PT-witness | impartial_witness |
| `L1_SIS and ICF_pregnancy_NL_nl.json` | NL-PT-pregnancy | pregnancy_participant |
| `L1_SIS and ICF_pregnant partner_NL_nl.json` | NL-PT-pregnant-partner | pregnancy_partner |
| `L1_SIS and ICF_secondary_NL_nl.json` | NL-PT-secondary | secondary_use |

## Part II forms

The CTIS_NL DOCX files were checked against the shared forms in `content/eu/templates/part-ii`. They match apart from variable numbering and the boilerplate that the shared forms turn into `[NOTE: …]` instructions. Nothing was converted or copied here. The variable sheet targets Dutch answers ("Target_language: Dutch") despite its `_de` file name.

- **K1, M1, M2, S1** use the shared forms. Answers are in Dutch (DECISIONS.md D1). National additions are in `requirements.json`: `national_fields` for K1 (Member State fields v105, v108, v110, v114, v117 and v121) and S1 (`f03`), plus `drafting_notes_nl` on every document.
- **The shared R1 form** (the EudraLex GDPR statement) is used for the application-level GDPR compliance statement in the CTIS Form section (`NL-GDPR-STATEMENT`). In the Netherlands, that statement is separate from the Part II R1 document.
- **Not covered by a supplied template**: the Netherlands requires national forms whose templates are not in CTIS_NL. Each document stays in `requirements.json` as a `third_party_document` with `template: null` and a `national_template` note, and becomes a `form` once its official DOCX is supplied and converted with `tools/content/curate.py` and `fields.py`. The three documents are:
  - **N1**: the Site Suitability Declaration (VGO). The CTIS_NL N1 is the generic EU (CTAG) form (D2).
  - **P1**: the national Dutch compensation, funding and arrangements template. The CTIS_NL P1 is the EU CTAG compensation template, which lacks the Dutch publication and early-termination points (D3).
  - **R1**: the official Dutch national data-protection form dated 16 January 2026 (D4).

## Conflicts resolved (rule 2: authority and newest official source win)

1. **Adolescent band.** The file name, `file_name` and `description` say 12-17. CCMO's band is 12 through 15: the CCMO model is "for children aged 12 to 16", and the template's own Dutch title and instructions say 12-16. From 16, participants consent themselves on the adult IVO. The authority's band is used.
2. **Children's band.** The file name and description say 6-11. CCMO's band is "under 12" with no lower age, and the template's Dutch title says "tot 12 jaar". The template is used for every enrolled child under 12, adapted to age and understanding. It is a discussion sheet and does not replace the parents' consent.
3. **Adult age.** The main and healthy-volunteer templates limit themselves to participants aged 18 or older, so that they do not overlap with the adolescent template. The main template itself says the CCMO model applies from 16. CCMO wins: capable participants aged 16 or older consent on the adult IVO pathway, and no new consent is needed solely because a participant turns 16. The 16-17 group therefore uses NL-PT-main or NL-PT-healthy (D9).
4. **Parents' age.** The parents template description says "younger than 18", while its content instructions and CCMO say under 16. Under 16 is used.
5. **Resistance statement.** CCMO requires the parents' consent declaration to state that consent for continued participation no longer applies if the minor resists. The template only says that a clear refusal or wish to stop is respected. The required statement is added in Draft as a recorded, justified addition (drafting_rules; D10).
6. **Form templates.** The CTIS_NL N1, P1 and R1 are generic EU forms. The Netherlands requires its national VGO, P1 and R1 templates rather than substitutes, so those three are not used for N1, P1 and R1 (see Part II forms).
7. **Emergency, mixed populations.** The CCMO memorandum on deferred consent (7 April 2020) treats a mixed population as exceptional. The newer EU CTR Q&A (March 2026) allows it when the reasons are clear and Article 35 applies to those enrolled without prior consent. The newer source is followed, with a compelling justification in the protocol (D17).
8. **Emergency representative document.** The emergency template is addressed to the patient and has only a conditional representative signature block ("not a general representative template"). The guide requires Dutch information and consent for the legally designated representative while the participant remains unable to consent. A representative document is planned from the legal-representative template, adapted to the deferred-consent context (D12).
9. **Secondary use.** The templates keep optional future use out of the main consent, and NL-PT-secondary says it is "the only template" for it. The guide places future-use choices normally in L1 and allows a separate secondary-use ICF when it improves clarity and stays linked. The separate document is kept, with the link required (D11).
10. **CTIS titles.** The Netherlands checklist page uses descriptive names ("Site Suitability Declaration, VGO", "Dutch R1 data-protection form", "WMO participant-insurance certificate"). The CTCG v3.0 naming guide is used instead.

## Open points

- **Official IVO v1.1 model not supplied.** The main and healthy templates follow the layered IVO structure: a cover page, eight numbered questions, appendices A-E and a reference to the general CCMO information. They could not be compared word for word with the official CCMO IVO v1.1 DOCX, whose standard text must stay unchanged (D18).
- **Children's template example text.** The children's template carries example text ("hart en je bloed", "Jan Voorbeeld"). It is model text to replace with study content.
- **Independent expert contact.** The main template's Appendix A keeps the independent-expert contact as optional. The guide says to include it only when it is part of the authorised process.
- **Witness template scope.** The witness template covers a capable adult patient only. The guide also allows the route for a representative who cannot write and for healthy volunteers (D13).
- **Other documents without a template.** K2, L2, the cover letter, the invoice details, O1/O2 and the exemption request have no template. See the Missing list in `../DECISIONS.md`.
