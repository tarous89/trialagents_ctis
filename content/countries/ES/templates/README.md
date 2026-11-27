# Spain templates

Source: the `CTIS_ES` folder supplied on 27 November 2026 (Part II DOCX forms, `Variable Templates_ES_de.xlsx`, `ES_Participant-facing_templates_05082026.txt`, and `Participant-facing templates_ES.docx`). Country guides: the TrialAgents Spain CTIS guides, reviewed 23 September 2026.

## Participant templates (JSON), used as supplied

One file per template in `participant/`, split from `ES_Participant-facing_templates_05082026.txt` with the content unchanged. No old pipeline variables remain. The extra `Participant-facing templates_ES.docx` in the source folder is a copy of the same templates and is not used.

| File | Population set in `requirements.json` |
|---|---|
| `L1_SIS and ICF_main_ES_es.json` | adult_patients; also the adult re-consent document (minors reaching 18, regained capacity) and optional_substudy |
| `L1_SIS and ICF_healthy_ES_es.json` | healthy_volunteers |
| `L1_SIS and ICF_parents_ES_es.json`, `…_age 6-11_ES_es.json`, `…_age 12-17_ES_es.json` | minors |
| `L1_SIS and ICF_legal rep_ES_es.json`, `…_limited capacity_ES_es.json` | adults_without_capacity (the legal-rep template also serves the emergency representative document) |
| `L1_SIS and ICF_emergency_ES_es.json` | emergency |
| `L1_SIS and ICF_witness_ES_es.json` | impartial_witness |
| `L1_SIS and ICF_pregnancy_ES_es.json` | pregnancy_participant |
| `L1_SIS and ICF_pregnant partner_ES_es.json` | pregnancy_partner |
| `L1_SIS and ICF_secondary_ES_es.json` | secondary_use |

Every template already carries the AEMPS Annex VIIIA Appendix 1 on personal data, which Spain requires inside the participant document (`ES-DATA-PROTECTION-APPENDIX`).

## Part II forms

Spain uses the shared EU forms in `content/eu/templates/part-ii`. The country DOCX files and the variable sheet were checked against them: same text apart from the variable numbering. Nothing was converted and `countries/ES/templates/part-ii` does not exist. The variable sheet's file name ends in `_de`, but its content is Spanish (answer language Spanish, localised to Spain).

| Shared form | Spain document | Notes |
|---|---|---|
| K1 | `ES-K1` | National additions in `national_fields` (v105, v108, v110, v114, v117, v121) |
| M1, M2 | `ES-M1`, `ES-M2-DOI` | Only trial fields are filled |
| N1 | `ES-N1` | Signed at submission by the site director (n1_issued_by); department and collaborating departments (v125) |
| P1 | `ES-P2-COMPENSATION` | Optional in Spain; does not replace the national financial budget `ES-P1-BUDGET` |
| R1 | `ES-GDPR-STATEMENT` | GDPR statement in the CTIS Form only, not a Part II R1 document in Spain |
| S1 | `ES-S1` | Provides the AEMPS Annex XIII information; Spanish storage route in section 5 (f03, v149) |

National notes are in `requirements.json` (`drafting_notes_es`, `national_fields`).

## Conflicts resolved (newest official source / authority wins)

1. **Children's age band.** The template is labelled 6-11. The authority (Royal Decree 1090/2015 article 5; AEMPS Annex VIIIA, 27 February 2025) sets no lower age: a child **younger than 12** with sufficient judgment must be heard. `population_rules.minors` uses the band "under 12" and the 6-11 template for any child under 12 who can understand a simple explanation. The file name was not changed, because the templates are kept as supplied (see DECISIONS.md).
2. **Adolescents 12-17: consent, not assent.** The template's English name and instructions call it an assent document. The authority requires the adolescent's **own consent** from age 12, with their own signature, and says it must not be only a simplified leaflet with no consent record. The document records consent, as its Spanish title ("consentimiento informado para adolescentes") already says.
3. **Child document font.** The 6-11 template allows "Arial or another highly legible sans-serif font". AEMPS recommends Arial or Times New Roman, so `styling.md` requires Arial. The 12-17 template names no font family or line spacing, so the AEMPS rules apply (Arial or Times New Roman, line spacing at least 1.5).
4. **CTIS titles.** The Spain Part II checklist asks for PIS/ICF titles "with version and date". The newer CTCG naming guide v3.0 (10 February 2026) puts version and date in the CTIS metadata, never in the title. Titles carry no version or date; the version and date stay in each document's footer.
5. **Data-protection document.** The naming guide and the Germany package use `R1_Compliance collection and use personal data_<country>` as a Part II document. The Spain guide says to put the AEMPS Annex VIIIA personal-data appendix inside the participant document only, and never to duplicate it as a separate national data-protection document. The EU GDPR statement belongs to the CTIS Form. So Spain has no R1 Part II document, and the shared R1 form is used only for the Form-section statement.

## Open points

- AEMPS national models that the guides name were not supplied: Annex VA, VB, VI and VII (insurance), Annex XIII (biological samples), Annex IV (site suitability, an accepted alternative), and the Annex VIIIA and VIIIB texts. There is also no model for the financial budget. They are listed in `../DECISIONS.md` under "Missing".
- The supplied templates were not compared line by line with the official Annex VIIIA and VIIIB texts, because those texts are not in the folder.
