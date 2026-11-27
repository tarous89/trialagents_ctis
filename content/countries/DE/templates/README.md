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

## Part II templates (DOCX)

The 48 variables of the variable sheet are written into the templates as yellow `[EINFÜGEN: …]` instructions with the variable's description; conditional blocks became `[AUSWAHL: …]` / `[FALLS …]`. The per-document guidance (CTIS section, mandatory or not, language, signature rule, template basis) is in `requirements.json` as `drafting_notes_de`, so the documents themselves stay clean. Fields the site or investigator completes stay empty: the CV and declaration of interest are the original EU templates with only the trial title and EU trial number to fill, and N1's site name, principal investigator, planned participants and site ID are left blank. R1 has an added instruction for the German national data-protection sentence the Germany guide requires. Every place to fill is a content control with a stable id (the former variable code, e.g. `v01100`, `kv102`, or `f01`, `cb01`, `choice01`); `<template>.fields.json` lists them with their question and instruction, so answers are written into exactly that place. Rebuild with `tools/content/curate.py <source.docx> <output.docx> <variables.json>`, then `tools/content/fields.py <output.docx> <output.fields.json>`.

| File | CTIS | Variables written in |
|---|---|---|
| `part-ii/K1_Recruitment arrangements_DE_de.docx` | K1 | 22 |
| `part-ii/N1_Site suitability_DE_de.docx` | N1 | 5 |
| `part-ii/S1_Biological samples_DE_de.docx` | S1 | 21 |
| `part-ii/P1_Participant compensation_DE_de.docx` | P1 | – |
| `part-ii/R1_Data protection_DE_de.docx` | R1 | – |
| `part-ii/M1_CV Principal investigator_DE_de.docx` | M1 | – |
| `part-ii/M2_DoI Principal investigator_DE_de.docx` | M2 | – |

## Open points

- AKEK's child and adolescent model texts are under the old law (2011); check our minors templates against Regulation 536/2014 and section 40b AMG when they are first used.
- No templates for K2, L2, M2 training, N2, O1/O2, P2 and radiation documents: they are supplied by others or free-form.
