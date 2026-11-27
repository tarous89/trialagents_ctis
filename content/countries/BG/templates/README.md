# Bulgaria templates

Sources: the `CTIS_BG` folder (seven Part II DOCX forms and `Variable Templates_BG_de.xlsx`), the Bulgarian participant-template text `BG_13 participant-facing templates_12082026.txt` (it arrived in the `CTIS_SK` folder by mistake; every template's country code is BG), all supplied on 27 November 2026, and the TrialAgents Bulgaria guides at `https://trialagents.com/ctis/bulgaria/en` (11 pages, reviewed 23 September 2026).

## Participant templates (JSON), used as supplied

There is one file per template in `participant/`, split with `tools/content/split_participant.py` (country code BG checked). The content is unchanged. A fresh split from the source text gives identical files. The old pipeline variables were already plain bracket notes (`[population label]`, `[population description from the protocol]`, `[document name]`, `[date]`). They stay in English inside the Bulgarian templates and are removed when drafting. No file was renamed.

| File | Population set in `requirements.json` |
|---|---|
| `L1_SIS and ICF_main_BG_bg.json` | adult_patients (also re-consent at 18 and when capacity returns) |
| `L1_SIS and ICF_healthy_BG_bg.json` | healthy_volunteers |
| `L1_SIS and ICF_parents_BG_bg.json`, `…_age 6-11_BG_bg.json`, `…_age 12-13_BG_bg.json`, `…_age 14-17_BG_bg.json` | minors |
| `L1_SIS and ICF_legal rep_BG_bg.json`, `…_limited capacity_BG_bg.json` | adults_without_capacity |
| `L1_SIS and ICF_emergency_BG_bg.json` | emergency |
| `L1_SIS and ICF_witness_BG_bg.json` | impartial_witness |
| `L1_SIS and ICF_pregnancy_BG_bg.json` | pregnancy_participant |
| `L1_SIS and ICF_pregnant partner_BG_bg.json` | pregnancy_partner |
| `L1_SIS and ICF_secondary_BG_bg.json` | secondary_use |

All templates are Bulgarian. No English templates were supplied. The required Bulgaria English version of each participant document is translated from the final Bulgarian document (see `../DECISIONS.md` D3).

## Part II forms

Bulgaria uses the shared EU forms in `content/eu/templates/part-ii` for K1, M1, M2, P1, R1 and S1. A word-level comparison shows the `CTIS_BG` DOCX files differ from the shared forms only in their variable placeholders (`{{v211xx}}`, `{{kv1xx}}`, conditional blocks), placeholder text ("[Enter text]", "N/A") and pre-ticked example boxes. The shared forms carry all of these as instructions. The variable sheet's 48 rows all target Bulgarian (22 K1, 21 S1, 5 N1). Answers are in Bulgarian. National notes are in `requirements.json` (`drafting_notes_bg`, `national_fields` for K1). R1 has no national statement: the BDA list adds no Bulgaria-specific form beyond the EU template.

**N1 is not bound to a template.** Bulgaria requires the BDA's national site-suitability declaration. The `CTIS_BG` file `N1_Site suitability_BG_bg.docx` is the generic EU (CTAG) form, not the national template, so the document stays in the list and its template is missing. This follows Austria's handling of its national N1. `BG-N1` is a `third_party_document` until the national template is supplied and converted into `templates/part-ii` (DECISIONS D1).

Nothing was converted into `countries/BG/templates/part-ii`.

The variable sheet is named `Variable Templates_BG_de.xlsx`, but its content targets Bulgarian ("A paragraph in Bulgarian…", target language Bulgarian). This is treated as a file-name slip.

## Conflicts resolved (rule 2: follow the authority; newest official source wins)

1. **Site suitability (N1).** The folder supplies the EU form. The Bulgaria guide requires the BDA's national template, signed by the head of the institution, in Bulgarian, and says the national template takes precedence over assuming the EU form alone is sufficient. The national template wins, and the EU form is not used.
2. **Adolescent template descriptions.** In `age 12-13` and `age 14-17`, the metadata field `description` says "aged 12 - 17 years". Their titles, file bands and content instructions say 12–13 and 14–17. Bulgarian law (Article 97) splits minors at 14: under 14, both parents or the guardians consent; from 14 to 17, the minor's own written consent is added. The authority's split decides which template applies. The 12–13 template is an age-adapted opinion record for a minor under 14, and the 14–17 template is the minor's own consent. The descriptions are kept as supplied, and the catalogue notes this (`description_note`).
3. **Age bands.** The template bands 6–11 and 12–13 sit inside the authority's under-14 group, and 14–17 matches the authority's second group. There is no conflict. Under 6 there is no template (DECISIONS D9).
4. **CTIS naming.** The Bulgaria guide asks for version and date on each recruitment and participant document. CTCG naming guide v3.0 (10 February 2026) puts version and date in the CTIS metadata, never in the title. Both apply: the title has no version, and the document itself and the CTIS metadata carry version and date.
5. **K1 trigger.** The BDA lists K1 as mandatory only when recruitment is not fully described in the protocol. Template v2.0 also carries the informed-consent procedure for every consent pathway. The requirement is recorded as the authority states it (conditional), and the plan includes K1 by default (DECISIONS D2).
6. **Site letterhead.** The base style puts a site letterhead in `Header`. The Bulgaria guides set no letterhead rule, and the Bulgarian templates start with the `Info table`. `styling.md` follows the templates: a letterhead is added only if the site requires one.

Checked without conflict:
- The parents template has signature routes for both parents, guardian(s) under 14 and custodian for 14–17, with the single-parent exception. This matches Article 97.
- The 14–17 form has the minor's own signature field, as the BDA requires.
- The legal-representative and limited-capacity templates match Article 96 and Ordinance No 31.
- The emergency template matches Article 35, with the Bulgarian minor and representative rules added.
- The pregnancy, partner and secondary-use templates match their guides.

## Mapping to the Bulgaria Part II checklist

The page's ten items give 14 document entries:

| Item | Documents |
|---|---|
| 1 | `BG-K1` and `BG-K2` |
| 2 | `BG-L1` (Bulgarian and English versions, population sets) and `BG-L2` (other information given before the decision) |
| 3 | `BG-M1` and `BG-M2` |
| 4 | `BG-N2` |
| 5 | `BG-N1` |
| 6 | `BG-O1` |
| 7 | `BG-P1` (EU compensation template) and `BG-P2` (financing description or draft contracts) |
| 8 | `BG-R1` |
| 9 | `BG-S1` |
| 10 | `BG-B1-CONTACT` (recommended; Forms section, not Part II) |

The population-specific documents on the page are the `population_sets` under `BG-L1`.

## Open points

See `../DECISIONS.md`.
