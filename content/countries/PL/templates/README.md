# Poland templates

Source: the `CTIS_PL` folder supplied on 27 November 2026 (Part II DOCX forms `*_PL_pl.docx`, `Variable Templates_PL_de.xlsx`, `PL_Participant-facing_templates_05082026.txt`, `Participant-facing templates_PL.docx`), and the TrialAgents Poland guides at `https://trialagents.com/ctis/poland/en` and the ten pages it links to (all reviewed 23 September 2026).

## Participant templates (JSON), used as supplied

Twelve files in `participant/`, split from `PL_Participant-facing_templates_05082026.txt` with `tools/content/split_participant.py`. A fresh split was checked byte-identical to the files here. The old pipeline variables were already plain bracket notes (`[population label]`, `[population description from the protocol]`, `[document name]`, `[date]`). The model text and instructions were not changed. One file was renamed (conflict 1 below).

| File | Template id | Population set in `requirements.json` |
|---|---|---|
| `L1_SIS and ICF_main_PL_pl.json` | PL-PT-main | adult_patients (also adult re-consent at 18 and after regained capacity) |
| `L1_SIS and ICF_healthy_PL_pl.json` | PL-PT-healthy | healthy_volunteers |
| `L1_SIS and ICF_parents_PL_pl.json` | PL-PT-parents | minors |
| `L1_SIS and ICF_age 6-11_PL_pl.json` | PL-PT-age-6-11 | minors, children under 13 (information only) |
| `L1_SIS and ICF_age 13-17_PL_pl.json` | PL-PT-age-13-17 | minors, from the 13th birthday until 18 |
| `L1_SIS and ICF_legal rep_PL_pl.json` | PL-PT-legal-rep | adults_without_capacity; emergency (continuing incapacity) |
| `L1_SIS and ICF_limited capacity_PL_pl.json` | PL-PT-limited-capacity | adults_without_capacity; emergency (as applicable) |
| `L1_SIS and ICF_emergency_PL_pl.json` | PL-PT-emergency | emergency |
| `L1_SIS and ICF_witness_PL_pl.json` | PL-PT-witness | impartial_witness |
| `L1_SIS and ICF_pregnancy_PL_pl.json` | PL-PT-pregnancy | pregnancy_participant |
| `L1_SIS and ICF_pregnant partner_PL_pl.json` | PL-PT-pregnant-partner | pregnancy_partner |
| `L1_SIS and ICF_secondary_PL_pl.json` | PL-PT-secondary | secondary_use |

`Participant-facing templates_PL.docx` in the folder is a copy of the same templates. It was not used.

Each template's `description`, `styling_instructions` and age band were checked against the Poland guides. The `styling_instructions` are reproduced verbatim in `../styling.md`.

## Part II forms

Poland uses the shared EU forms in `content/eu/templates/part-ii` for K1, M1, M2, N1, P1, R1 and S1. The `CTIS_PL` DOCX files are the same EU forms, using the old `{{v…}}` variables. M1 and M2 are word-identical; the other forms differ only in how variables and instructions are written. Nothing was converted, and nothing is copied here.

Answers are in Polish. The variable sheet is named `Variable Templates_PL_de.xlsx`, but its content targets Polish ("A paragraph in Polish…", target language Polish, file names `_PL_pl`). The name is treated as a slip.

National additions are recorded in `requirements.json` under `national_fields`:

- K1: fields v105, v108, v110, v114, v117 and v121.
- P1: fields f04 and f06.

R1, N1 and S1 need no national addition according to the guides.

The Poland guides require no national form in place of a shared one. URPL accepts K1 in "another format" that holds the complete information, but the EU v2.0 template is used.

## Conflicts resolved (rule 2: follow the authority; the newest official source wins)

1. **Adolescent age band.**
   - The template's `description` and file name said "aged 12 - 17".
   - NKB good practice, as recorded in the minors guide, sets the threshold at 13. Under 13, only the legal representative consents. From the 13th birthday until 18, the minor's own consent is required as well.
   - The template's own `content_instructions` already say "ukończył 13 lat i nie ukończył 18 lat".
   - The authority wins. The file was renamed `age 12-17` to `age 13-17`, as Germany did for its 7-11 band. Its JSON is unchanged, including `file_name` and `description`. The catalogue entry has a `poland_rule` field.
2. **Children's band and 12-year-olds.**
   - The child template is drafted for children aged 6 up to their 12th birthday, so no supplied template covers 12-year-olds.
   - The parents template says a 12-year-old receives age-appropriate information without a consent signature. This matches the NKB rule that under-13s do not consent.
   - The file name `age 6-11` is kept because it matches the template's text and is not an authority band.
   - 12-year-olds are catalogued under the child template, pending DECISIONS.md D2.
3. **Age-range notation.**
   - NKB reads "13-18 years" as "reached 13, not yet 18". The repository's file names use inclusive ranges, where 13-17 means 13 through 17.
   - Polish document labels follow the NKB notation. CTIS titles use unambiguous words, such as "children under 13" and "adolescents 13 to under 18" (DECISIONS.md D3). File names keep the inclusive form.
4. **Impartial-witness trigger.**
   - The witness template's description covers a participant who "cannot read, write or sign".
   - The CTR and NKB route, as recorded in the witness guide, applies when the person giving consent (participant or legally designated representative) cannot write. One witness is enough, and the two-witness rule for medical experiments does not apply.
   - The template is planned only in that case. Its single-witness design already matches the authority.
5. **Child assent signature.**
   - The minors guide allows an assent signature for children under 13 as an ethical record, if it is labelled as assent.
   - The Polish child template excludes any signature, consent form or assent form.
   - This is stricter and stays within the authority's rule, so the template is used as supplied. No signature is added.
6. **GDPR statement location.**
   - The CTCG naming guide gives `R1_Compliance collection and use personal data_COUNTRY` as a Part II example.
   - The Poland checklist and the naming guide's note place the standard EC GDPR statement in the CTIS Form section.
   - `PL-R1` is filed in the Form section. R1 is kept for any extra Poland-specific Part II documentation (DECISIONS.md D7).
7. **CTIS titles.**
   - The Poland checklist uses descriptive names, such as "Investigator Curriculum Vitae", "Proof of insurance or indemnification" and "Financial and participant-compensation arrangements".
   - The CTCG v3.0 titles are used instead.
   - The fee and Compensation Fund proofs have no CTCG title, so plain descriptive titles are proposed (DECISIONS.md D5).
8. **Remuneration guidance.**
   - The healthy-volunteer guide says NKB revoked its earlier remuneration guidance in 2026.
   - The supplied templates do not cite it. P1 field f04 and the drafting rules forbid relying on it.

Checked without conflict:

- The joint-parental-decision routes in the parents template (both parents sign, or one parent signs with the NKB attestation) match the minors guide.
- The Compensation Fund and insurance modules are in the main, healthy-volunteer, parents, adolescent, legal-representative, emergency and witness templates.
- The pregnancy templates leave out the generic Fund section, consistent with the guide's warning not to copy participant compensation language into partner forms.
- The risk-frequency categories in the templates are used, because the guides set none.

## Mapping to the Poland Part II checklist

The 14 checklist items produce 16 document entries:

| Checklist item | Document id(s) |
|---|---|
| 1 Recruitment arrangements and informed consent procedure | PL-K1 |
| 2 Recruitment materials | PL-K2 |
| 3 PIS and ICF | PL-L1 |
| 4 Population-specific information and consent documents | PL-L1-POPULATION |
| 5 Other participant-facing materials | PL-L2 (other information material), PL-R2 (translated endpoint-related patient-facing documents) |
| 6 Investigator CV | PL-M1 |
| 7 Declaration of interest | PL-M2 |
| 8 Site suitability form | PL-N1 |
| 9 Proof of insurance or indemnification | PL-O1 |
| 10 Clinical Trials Compensation Fund payment evidence | PL-FUND |
| 11 Financial and participant-compensation arrangements | PL-P1 (participant compensation, form), PL-P2 (investigator and site financial arrangements) |
| 12 Data-protection compliance | PL-R1 (Form section) |
| 13 Compliance for biological samples | PL-S1 |
| 14 Application and ethics fees | PL-FEE |

Items 5 and 11 each cover two uploads with different readers or authors, so each has two entries. The Polish protocol synopsis, the Polish CTIS fields and the Polish labelling come from the language rules. They are outside Part II and are listed in `outside_part_ii`.

## Open points

See `../DECISIONS.md`.
