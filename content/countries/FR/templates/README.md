# France templates

Source: the `CTIS_FR` folder supplied on 27 November 2026 (Part II DOCX forms, the variable sheet `Participant-facing templates_FR.xlsx`, `FR_Participant-facing templates_05082026.txt` and `Participant-facing templates_FR.docx`), and the TrialAgents France guides (`https://trialagents.com/ctis/france/en` and the ten pages it links to, reviewed 23 September 2026).

## Participant templates (JSON), used as supplied

One file per template in `participant/`, split from `FR_Participant-facing templates_05082026.txt` with the content unchanged. The only edit is the one in onboarding rule 3: old pipeline variables became plain bracket notes (`[population label]`, `[population description from the protocol]`, `[document name]`, `[date]`). No `{{…}}` variable remains. The model text and instructions were not rewritten.

| File | Template id | Population set in `requirements.json` | Document |
|---|---|---|---|
| `L1_SIS and ICF_main_FR_fr.json` | FR-PT-main | adult_patients; adults_under_curatorship (starting point, see Open points) | FR-L1 / FR-L1-POPULATION |
| `L1_SIS and ICF_healthy_FR_fr.json` | FR-PT-healthy | healthy_volunteers | FR-L1-POPULATION |
| `L1_SIS and ICF_parents_FR_fr.json`, `…_age 6-11_FR_fr.json`, `…_age 12-17_FR_fr.json` | FR-PT-parents, FR-PT-age-6-11, FR-PT-age-12-17 | minors | FR-L1-POPULATION |
| `L1_SIS and ICF_legal rep_FR_fr.json`, `…_limited capacity_FR_fr.json` | FR-PT-legal-rep, FR-PT-limited-capacity | adults_without_capacity (legal rep also in emergency) | FR-L1-POPULATION |
| `L1_SIS and ICF_emergency_FR_fr.json` | FR-PT-emergency | emergency | FR-L1-POPULATION |
| `L1_SIS and ICF_witness_FR_fr.json` | FR-PT-witness | impartial_witness | FR-L1-POPULATION |
| `L1_SIS and ICF_pregnancy_FR_fr.json` | FR-PT-pregnancy | pregnancy_participant | FR-L1-POPULATION |
| `L1_SIS and ICF_pregnant partner_FR_fr.json` | FR-PT-pregnant-partner | pregnancy_partner | FR-L1-POPULATION |
| `L1_SIS and ICF_secondary_FR_fr.json` | FR-PT-secondary | secondary_use | FR-L1-POPULATION |

Each template's `description`, `styling_instructions` and age band were checked against the France guides. `styling_instructions` are reproduced verbatim in `../styling.md`.

## Part II forms

France uses the shared EU forms in `content/eu/templates/part-ii` (the CTIS_FR DOCX and variable sheet were confirmed identical to them apart from variable numbering). Nothing was converted into `countries/FR/templates/part-ii`. Answers in French. National notes are in `requirements.json` (`drafting_notes_fr`, `national_fields`):

- K1 (v105, v108, v110, v114, v117, v121): French recruitment and consent routes (parental authority, protective status, independent witness, Article 35 pathway, healthy-volunteer exclusion period, separate genetic consent).
- N1 (n1_issued_by): France requires the statement dated and signed by the person responsible for the site at submission.
- P1 (f04, f06): constraint indemnity, EUR 6,000 per twelve months cap, none for minors or protected persons where prohibited.
- S1 (f03): Articles L1243-3 and L1243-4 CSP, new consent before a changed purpose, separate genetic consent.
- M1 and M2 stay the original EU forms; only trial title and EU trial number are filled. The France expectations for the CV (dated less than one year, GCP training normally within three years, RPPS identifier) are Check items for the investigator's content.
- The shared R1 data-protection statement (`R1_Data protection.docx`, also in the CTIS_FR folder) is not used: the France Part II checklist's data-protection item is the CNIL MR-001 receipt or CNIL authorisation (FR-R1), and the MR-001 position goes in the Additional France application document. See DECISIONS.md.

## Conflicts resolved (onboarding rule 2)

1. **Biological-samples section.** The France checklist page places the EU biological-sample form in "section R". The CTCG naming guide v3.0 (10 February 2026) and the CTIS structure use S for biological samples and R for data protection. The naming guide wins: `S1_Compliance collection use storage biological samples_FR`. The France page's own instruction not to file the CNIL receipt in the biological-sample subsection is kept.
2. **Genetic examination.** The supplied templates (main, healthy, parents, children, adolescents, legal rep, limited capacity, emergency, witness) contain in-document genetics wording (an "[Le cas échéant] Examen des caractéristiques génétiques" section and/or a genetics choice in the consent form). The France national Part II guidance (as recorded in the checklist, consent and secondary-use pages) expects a separate genetic testing information and express written prior consent document (Civil Code Article 16-10). The authority wins: a separate document `FR-L1-GENETIC` is required whenever a genetic examination is planned; the in-template checkbox alone does not satisfy it (how to treat the in-template section: DECISIONS.md).
3. **Endpoint-related participant documents.** The France page files diaries, questionnaires and similar items under section L "or the most specific CTIS participant-document category available". The naming guide defines `R2_Patient-facing document_TYPE_COUNTRY_LANGUAGE`, which is the more specific category for endpoint-related questionnaires and diaries. Endpoint-related items use R2 (`ctis_title_endpoint_related`); other materials use `L2_Other subject information material_<type>_FR_fr`.
4. **Older document names on the France page** ("Compensation and other financial arrangements", "Clinical trial insurance certificate", "CNIL MR-001 declaration-of-conformity receipt") are replaced by the CTCG titles (`P1_Compensation participants and financial arrangements_FR`, `O1_Trial participant insurance certificate_FR`, `R1_Compliance collection and use personal data_<MR-001 receipt or CNIL authorisation>_FR`).
5. **Children's age band.** The template band is 6-11. France sets no statutory child or adolescent band (the minors guide: bands are justified by readability and maturity, not presented as statutory French bands). There is no authority band to conflict with, so 6-11 and 12-17 are kept as drafting bands and the file name is unchanged (unlike Germany, where AKEK's 7-11 replaced 6-11).

## Open points

- No template supplied for: the Additional France application document (CNRIPH), the separate genetic testing document, the curatorship (curatelle) consent with curator assistance, information for minors under 6, the short emergency information aid. See DECISIONS.md, Missing.
- `L1_SIS and ICF_witness_FR_fr.json` says it "must not be used for healthy volunteers"; the impartial-witness guide does not state this restriction (DECISIONS.md).
- `L1_SIS and ICF_legal rep_FR_fr.json` excludes curatorship, consistent with the guide (under curatelle the participant consents with the curator's assistance). The main template is the starting point for that route until a dedicated template exists.
- No templates for K2, L2, the site list, O1, the ARS decision or the CNIL receipt: free-form, supplied by others, or CTIS data.
