# Denmark templates

Source: the `CTIS_DK` folder: the Part II DOCX forms (`*_DK_da.docx`), `Variable Templates_DK_de.xlsx`, `DK_Participant-facing_templates_05082026.txt` and `Participant-facing templates_DK.docx`. Country guides: https://trialagents.com/ctis/denmark/en and the ten pages it links to under `/ctis/denmark/en/`, all reviewed 23 September 2026.

## Participant templates (JSON), used as supplied

Twelve files in `participant/`, split from `DK_Participant-facing_templates_05082026.txt` with `tools/content/split_participant.py`. A fresh split was compared with the folder and is identical. `Participant-facing templates_DK.docx` is a copy of the same twelve templates (every template name and every section opening was found in it). It was not used separately.

The content is unchanged (`template_instructions` + `template_content` with `section_style`). The only edit is the split tool's own: the old pipeline variables became plain bracket notes, such as `[population label]` and `[document name]`. No `{{…}}` variable remains. The model text and its instructions were not rewritten, and no file was renamed.

| File | Template id | Population set in `requirements.json` |
|---|---|---|
| `L1_SIS and ICF_main_DK_da.json` | DK-PT-main | adult_patients; optional_substudy; right_not_to_know; re-consent at 18 and after regained capacity |
| `L1_SIS and ICF_healthy_DK_da.json` | DK-PT-healthy | healthy_volunteers; right_not_to_know |
| `L1_SIS and ICF_parents_DK_da.json` | DK-PT-parents | minors; parental_power_of_attorney (section 11) |
| `L1_SIS and ICF_age 6-11_DK_da.json` | DK-PT-age-6-11 | minors, band 5-11 |
| `L1_SIS and ICF_age 12-17_DK_da.json` | DK-PT-age-12-17 | minors: route A for 12-14 and route B for 15-17, each a separate document |
| `L1_SIS and ICF_legal rep_DK_da.json` | DK-PT-legal-rep | adults_without_capacity (route A guardian, route B nearest relative plus trial guardian) |
| `L1_SIS and ICF_limited capacity_DK_da.json` | DK-PT-limited-capacity | adults_without_capacity |
| `L1_SIS and ICF_emergency_DK_da.json` | DK-PT-emergency | emergency |
| `L1_SIS and ICF_witness_DK_da.json` | DK-PT-witness | impartial_witness; right_not_to_know |
| `L1_SIS and ICF_pregnancy_DK_da.json` | DK-PT-pregnancy | pregnancy_participant |
| `L1_SIS and ICF_pregnant partner_DK_da.json` | DK-PT-pregnant-partner | pregnancy_partner_participant (route B); route A is `outside_part_ii` |
| `L1_SIS and ICF_secondary_DK_da.json` | DK-PT-secondary | secondary_data_use; the extra-collection route is `outside_part_ii` |

Each template gives two uploads per population: the information sheet (`sis_sections`, DK-L1-SIS) and the blank consent form (`icf_sections`, DK-L1-ICF). The catalogue in `requirements.json` lists the sections for each. Each template's `description`, `styling_instructions` and age band were checked against the Denmark guides. The `styling_instructions` are reproduced verbatim in `../styling.md`.

## Part II forms

Denmark uses the shared EU forms in `content/eu/templates/part-ii` for K1, M1, M2, N1, P1, R1 and S1. Nothing was converted, and nothing is copied here. The CTIS_DK DOCX files were compared word by word with the shared forms:

- M1, M2 and R1 are identical apart from the variables.
- In K1, N1, P1 and S1, every other difference is text that the shared forms carry as `[NOTE: …]` or `[OTHERWISE: …]` labels. Examples are "How to use this document", the endorsement text and the "N/A" alternatives. Content-control prompts became `[INSERT: …]` labels.

The variable sheet has 48 variables (K1, N1, S1), all "Target_language: Danish", although the file is named `_DK_de`. Apart from the language and the country name, their descriptions match the instructions in the shared `fields.json` files.

Answers are in Danish (`answer_languages: ["da"]`). National additions are in `requirements.json`:

- `national_fields` for K1. These cover patient-record screening and contact permission, the Danish-authorised consent physician and delegation, validated translations, nearest relative plus trial guardian, guardianship, parental authority and the 15-17 own consent, re-consent at 18, the impartial witness, and the VMK Article 35 detail.
- `national_fields` for N1 (`n1_issued_by`), R1 (`r1_the_sponsor_declares`: the GDPR and the Danish Data Protection Act) and S1 (`f03`: the Danish sample details and future-use pathways).
- `drafting_notes_da` for every document.

The guide asks for no national form in place of a shared form. VMK's CTR standard consent forms are recommended for the participant consent forms, not for the Part II forms (see Open points).

## Conflicts resolved (rule 2: the authority and the newest official source win)

1. **Who receives consent.** The main, healthy, parents, legal-rep, witness, pregnancy, pregnant-partner and 12-17 templates say that the same physician who gave the oral information must receive consent. The physician's declaration has no other block. The Denmark guides follow VMK's September 2026 guidance: normally the same physician, but after a reflection period another qualified, delegated physician may receive consent and attest separately, if that physician can answer remaining questions. VMK's form permits that separate attestation. The guidance wins. When the protocol uses this route, the ICF gets a separate attestation block, marked as a visible deviation (drafting rule; DECISIONS.md D4). The witness route keeps the same physician, as the witness guide says.
2. **Adolescents 12-17 in one template.** VMK treats 15-17 as its own consent pathway: own written consent together with the parents, with a dedicated 15-17 information sheet and consent form. Below 15, the parents consent and the child is informed. The template's two routes are therefore used as two separate documents, route A for 12-14 and route B for 15-17. It is never one combined 12-17 document.
3. **Who informs children.** The 6-11 template, and route A of the 12-17 template, let a person with knowledge of the trial and pedagogical skills give the information. The minors guide says the person who conducts the information process in a CTR medicinal trial must meet the Danish medical-doctor requirement. The guide wins: the Danish-authorised physician conducts the process, and a person with pedagogical skills may support (DECISIONS.md D7).
4. **Dispensation from parental consent.** The 12-17 and secondary-use templates offer an alternative for a committee dispensation from parental consent "in a non-interventional trial". The minors guide says not to rely on exceptions from general Danish research guidance unless VMK has expressly confirmed that they apply to the CTR trial. That alternative is deleted by default.
5. **Witness trigger.** The witness template's description covers an adult who "cannot read, write or sign". The witness guide uses the route when the participant or legally designated representative can consent but is unable to write. The guide's trigger is used: inability to read alone does not trigger it. The template covers capable adult patients only (DECISIONS.md D15).
6. **Healthy volunteers.** The template description says "without a specific health condition". Danish ethics guidance also counts as healthy a person with an unrelated condition that has no relevance to the research. The authority's definition is used.
7. **Secondary-use template "must be used".** The Denmark guide sorts future use into separate pathways. A defined optional substudy is within Part II and gets its own PIS and ICF from the main template. Article 28(2) secondary data use needs a separate, withdrawable consent form in Part II (this template). Surplus trial material is handled in the main documents with the VMK opt-out checkbox; the template itself excludes it. Extra material collected for unspecified future research is outside VMK's Part II approval and is omitted by default (DECISIONS.md D13).
8. **Pregnant-partner template "must be used".** VMK says that data-only collection from a pregnant partner who is not a participant is usually outside its Part II approval. VMK recommends omitting it from Part II. Route A is therefore `outside_part_ii` by default (DECISIONS.md D12). Route B, where the partner becomes a participant, is a Part II document.
9. **Participant information and consent form.** The templates and the naming-guide example combine them (`L1_SIS and ICF_…`). The Denmark checklist lists them as two items (3 and 4), and VMK's CTR consent forms are stand-alone forms. They are planned as two uploads per population, `L1_SIS_…` and `L1_ICF_…`, with the same version and date (DECISIONS.md D1).
10. **CTIS titles.** The Denmark guide names CTIS categories only. The CTCG v3.0 naming guide is used, with `_DK_da` on every document (`_DK_en` for an English administrative document). The fee item has no CTCG title; the naming guide places proof of fee outside Part II (DECISIONS.md D10).

## Not a conflict, but recorded

- **Children's band.** The file is named `age 6-11`, but its description and instructions say 5-11. VMK sets no band below 15, so this is not an authority conflict. The file name is kept as supplied, and the band 5-11 from the template text is used (DECISIONS.md D5).
- **Limited-capacity template.** Its description is limited to adults who "retain sufficient understanding". The guide asks for information adapted to the participant's capacity as far as possible. The template is planned with every representative set and adapted to the person's level.

## Open points

- The VMK CTR standard consent forms were not supplied. They exist for competent persons, holders of parental authority, 15-17-year-olds with parents, and nearest relatives with a trial guardian. The parental power-of-attorney form and the right-not-to-know addendum were not supplied either. The templates' declarations follow VMK wording, but they could not be compared with the current forms (DECISIONS.md D2).
- The main, healthy and witness templates still carry legacy ` FORMTEXT ` prompts from the older VMK form. The main template refers to "appendiks 5 i anmeldelsesvejledningen". These are drafting prompts to remove (QC C8.05, C8.11). Their reference to non-CTR guidance is not followed as a source.
- No template for: K2 and other recruitment material, children under 5, documents for minors after emergency inclusion (D21), the right-not-to-know form for parents, legal representatives, adolescents and emergency (D18), the VMK English data-protection sentence (D11), the "Dine rettigheder som forsøgsperson i forsøg med medicin" leaflet (D14), O1, P2 and the fee document (supplied by others).
- The Danish-language guides (`/ctis/denmark/dk`) were not read. They are outside the `/ctis/denmark/en/` scope.
