# Czechia templates

Source: the `CTIS_CZ` folder (Part II DOCX forms `*_CZ_cs.docx`, `Variable Templates_CZ_de.xlsx`, `CZ_Participant-facing templates_05082026.txt`). Country guides: https://trialagents.com/ctis/czechia/en and its ten linked pages, all reviewed 23 September 2026.

## Participant templates (JSON), used as supplied

Thirteen files in `participant/`, split from `CZ_Participant-facing templates_05082026.txt`. Their `template_content` is identical to the source. The only change is that the old pipeline variables (`{{population_label}}`, `{{population_description}}`, `{{doc_name_local}}`, `{{date}}`) are now the plain bracket notes `[population label]`, `[population description from the protocol]`, `[document name]` and `[date]`. Nothing else was edited, and the file names keep the supplied language code `cs`.

| File | Template id | Population set in `requirements.json` |
|---|---|---|
| `L1_SIS and ICF_main_CZ_cs.json` | CZ-PT-main | adult_patients (also re-consent at 18 and after regained capacity) |
| `L1_SIS and ICF_healthy_CZ_cs.json` | CZ-PT-healthy | healthy_volunteers |
| `L1_SIS and ICF_parents_CZ_cs.json` | CZ-PT-parents | minors |
| `L1_SIS and ICF_age 6-11_CZ_cs.json` | CZ-PT-age-6-11 | minors, SÚKL group "under 12" (conditional) |
| `L1_SIS and ICF_age 12-14_CZ_cs.json` | CZ-PT-age-12-14 | minors, band 12-14 (mandatory) |
| `L1_SIS and ICF_age 15-17_CZ_cs.json` | CZ-PT-age-15-17 | minors, band 15-17 (mandatory) |
| `L1_SIS and ICF_legal rep_CZ_cs.json` | CZ-PT-legal-rep | adults_without_capacity |
| `L1_SIS and ICF_limited capacity_CZ_cs.json` | CZ-PT-limited-capacity | adults_without_capacity (as applicable) |
| `L1_SIS and ICF_emergency_CZ_cs.json` | CZ-PT-emergency | emergency |
| `L1_SIS and ICF_witness_CZ_cs.json` | CZ-PT-witness | impartial_witness |
| `L1_SIS and ICF_pregnancy_CZ_cs.json` | CZ-PT-pregnancy | pregnancy_participant |
| `L1_SIS and ICF_pregnant partner_CZ_cs.json` | CZ-PT-pregnant-partner | pregnancy_partner |
| `L1_SIS and ICF_secondary_CZ_cs.json` | CZ-PT-secondary | secondary_use |

## Part II forms

The `CTIS_CZ` DOCX files are the shared EU forms (English text with variables), the same as `content/eu/templates/part-ii` apart from the variable numbering. Nothing was converted, and nothing is copied into this folder. The variable sheet asks for Czech answers, so the answer language is Czech.

**SÚKL national templates are mandatory.** KLH-CTIS-01 Version 3 (28 January 2026) makes SÚKL's Templates No. 1 to 7 (28 January 2026) mandatory, and the hub says they "should not be treated as interchangeable EU administrative forms". None of the seven was supplied. As a result:

- **K1** is bound to the shared EU form v2.0, as explained under conflict 2 below. National notes are in `national_fields` (v105, v108, v110, v114, v117, v121) and `drafting_notes_cs`. Template No. 1 is still needed to confirm the Czech national fields (DECISIONS.md D1).
- **M1 (Template No. 2), M2 DoI (Template No. 3) and N1 (Template No. 4)** are `third_party_document` with `template: null` and a `template_required` note. Each is completed and signed by the investigator or the site. Once the templates are supplied, they are converted into `templates/part-ii` with `tools/content/curate.py` and `fields.py`. M1 and M2 then become `third_party_template`, and N1 becomes a form with the site fields left empty.
- **R1 (Template No. 5), S1 (Template No. 7) and P1 (Template No. 6)** are bound to the shared EU forms as interim content only (`interim: true`, `use_for_upload: false`), as Italy does for P1. Check item X.06 stays unmet until the SÚKL template is used. For P1, SÚKL also accepts the sponsor's own document if it gives references to where every Template No. 6 item is addressed. That cannot be built without the template.

## Conflicts resolved (rule 2: follow the authority; newest official source wins)

1. **National templates against shared EU forms (M1, M2 DoI, N1, R1, S1, P1).** SÚKL makes its templates mandatory, so the SÚKL templates win. The EU forms in the folder are not the Czech uploads.
2. **K1 template.** There are two sources:
   - The European Commission's harmonised recruitment and informed-consent template v2.0 applies to new Part II submissions from 1 September 2026.
   - KLH-CTIS-01 Version 3 (28 January 2026) still lists the mandatory national Template No. 1.

   The guide says to check both and include every Czech national field. The EU v2.0 form is the newer official source, so it is bound for drafting and the Czech rules from the guides go into its Member State fields. Template No. 1 still has to be checked for any further national field (D1).
3. **Age bands.** The 12-14 and 15-17 template descriptions say "aged 12 - 17 years". SÚKL requires separate written information for 12-14 and for 15-17, so the SÚKL bands are used. The file names and content already follow them. The 6-11 template falls within SÚKL's conditional group "children under 12". Children under 6 have no template (D10).
4. **One or two parents.** Older Czech wording referred to both parents. KLH-22 (current national guidance) accepts one parent's signature for CTIS trials. The newer rule is used, and the parents template already follows it.
5. **Emergency wording.** The guide says older national emergency wording yields to Article 35 CTR wherever they conflict. The emergency template follows Article 35.
6. **Impartial witness trigger.** Article 29 CTR covers a participant who cannot write, and KLH-22 adds a participant who cannot read. Both are national rules, and the witness template covers both. The witness must be independent of the study team.
7. **Signatures at submission.** The shared EU forms leave signatures empty. Czechia requires these signatures at submission, each with a SÚKL-accepted method (no DocuSign or non-compliant sponsor-created signatures):
   - the physician signs the CV and the declaration of interest;
   - the department head, clinic director or principal investigator signs N1;
   - the sponsor itself signs Template No. 5, even when it is a third-country sponsor.
8. **CTIS titles.** The Czechia guides use descriptive names only. The CTCG v3.0 naming guide is used. Documents it does not cover carry proposed titles (D4-D9).
9. **Base style.** `styles/base.md` provides a site letterhead (`Header`) and a summary box. The Czech templates have neither section, and the guides require neither, so none is added (`styling.md`).

## Mapping to the Czechia Part II checklist

There are 22 document entries for the 17 checklist items; `checklist_item` on each entry gives its item. An item is split when its uploads come from different authors or have different triggers:

- 5 → CZ-K1, CZ-K2
- 6 → CZ-M1, CZ-M-GCP
- 10 → CZ-N-FACILITY, CZ-N-GCP-CERT
- 11 → CZ-O1, CZ-O2, CZ-O-POSTTRIAL

Every other item has one entry:

| Item | Entry |
|---|---|
| 1 | CZ-DOC-LIST |
| 2 | CZ-L1 |
| 3 | CZ-L1-POPULATION |
| 4 | CZ-L2 |
| 7 | CZ-M2-DOI |
| 8 | CZ-SITE-LIST |
| 9 | CZ-N1 |
| 12 | CZ-R1 |
| 13 | CZ-S1 |
| 14 | CZ-P1 |
| 15 | CZ-P-FUNDING |
| 16 | CZ-FEE |
| 17 | CZ-DEVICE |

## Open points

- The SÚKL Templates No. 1 to 7 were not supplied (D1, D3).
- The main, pregnancy and secondary-use templates refer to a separate participant data-processing notice ("samostatné sdělení ke zpracování osobních údajů"). The guides do not require one, and no template was supplied (D12).
- There is no template for KLH-22's short basic information for acute participants (D11) or for children under 6 (D10).
- The variable sheet is named `Variable Templates_CZ_de.xlsx`, but its content targets Czech ("A paragraph in Czech…"). This is treated as a file-name slip.
- See `../DECISIONS.md` for every open decision and the Missing list.
