# Germany templates

Source: the `CTIS_DE` folder supplied on 27 November 2026.

## Participant templates (JSON), used as supplied

One file per template in `participant/`, split from `DE_Participant-facing templates_05082026.txt` with the content unchanged. Two edits only:

- The old pipeline variables in the metadata (`{{population_label}}`, `{{population_description}}`, `{{doc_name_local}}`, `{{date}}`) became plain bracket notes such as `[Kurzbezeichnung der Population]`.
- The children's template file name was `age 6-11`; it is now `age 7-11`, matching the AKEK 2026 guideline and the template's own text.

| File | Population set in `requirements.json` |
|---|---|
| `L1_SIS and ICF_main_DE_de.json` | adult_patients |
| `L1_SIS and ICF_healthy_DE_de.json` | healthy_volunteers |
| `L1_SIS and ICF_parents_DE_de.json`, `…_age 7-11_DE_de.json`, `…_age 12-17_DE_de.json` | minors |
| `L1_SIS and ICF_legal rep_DE_de.json`, `…_limited capacity_DE_de.json` | adults_without_capacity |
| `L1_SIS and ICF_emergency_DE_de.json` | emergency |
| `L1_SIS and ICF_witness_DE_de.json` | impartial_witness |
| `L1_SIS and ICF_pregnancy_DE_de.json` | pregnancy_participant |
| `L1_SIS and ICF_pregnant partner_DE_de.json` | pregnancy_partner |
| `L1_SIS and ICF_secondary_DE_de.json` | secondary_use |

## Part II forms

Germany uses the shared EU forms in `content/eu/templates/part-ii` (identical in every country; only the variable numbering differed). Answers in German. National notes are in `requirements.json` (`drafting_notes_de`, `national_fields`): R1 needs the national data-protection sentence.

## Open points

- AKEK's child and adolescent model texts are under the old law (2011); check our minors templates against Regulation 536/2014 and section 40b AMG when they are first used.
- No templates for K2, L2, M2 training, N2, O1/O2, P2 and radiation documents: they are supplied by others or free-form.
