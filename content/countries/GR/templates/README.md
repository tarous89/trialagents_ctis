# Greece templates

Source: the `CTIS_GR` folder supplied on 27 November 2026 (Part II DOCX forms `*_GR_el.docx`, `Variable Templates_GR_de.xlsx`, `GR_13 participant-facing templates_08082026.txt`). Country guides: https://trialagents.com/ctis/greece/en and its ten linked pages, all reviewed 23 September 2026.

Country code: the folder and template files use `GR`, the code in the supplied templates. CTIS titles use `EL`, the code CTIS and the EU use for Greece (`../DECISIONS.md` D1). Language code `el`.

## Participant templates (JSON), used as supplied

Thirteen files in `participant/`, split from `GR_13 participant-facing templates_08082026.txt`. Each file's `template_content` is identical to the source. The only edits are the old pipeline variables in the metadata (`{{population_label}}`, `{{population_description}}`, `{{doc_name_local}}`, `{{date}}`), which became the plain bracket notes `[population label]`, `[population description from the protocol]`, `[document name]` and `[date]`. No file was renamed.

| File | Template id | Population set in `requirements.json` |
|---|---|---|
| `L1_SIS and ICF_main_GR_el.json` | GR-PT-main | adult_patients (also re-consent at 18 and after regained capacity) |
| `L1_SIS and ICF_healthy_GR_el.json` | GR-PT-healthy | healthy_volunteers |
| `L1_SIS and ICF_parents_GR_el.json` | GR-PT-parents | minors (always) |
| `L1_SIS and ICF_age 6-9_GR_el.json` | GR-PT-age-6-9 | minors, children under 10 |
| `L1_SIS and ICF_age 10-14_GR_el.json` | GR-PT-age-10-14 | minors, band 10-14 (written assent) |
| `L1_SIS and ICF_age 15-17_GR_el.json` | GR-PT-age-15-17 | minors, band 15-17 (written assent) |
| `L1_SIS and ICF_legal rep_GR_el.json` | GR-PT-legal-rep | adults_without_capacity |
| `L1_SIS and ICF_limited capacity_GR_el.json` | GR-PT-limited-capacity | adults_without_capacity |
| `L1_SIS and ICF_emergency_GR_el.json` | GR-PT-emergency | emergency (participant form; interim basis of the emergency-representative form) |
| `L1_SIS and ICF_witness_GR_el.json` | GR-PT-witness | impartial_witness |
| `L1_SIS and ICF_pregnancy_GR_el.json` | GR-PT-pregnancy | pregnancy_participant |
| `L1_SIS and ICF_pregnant partner_GR_el.json` | GR-PT-pregnant-partner | pregnancy_partner |
| `L1_SIS and ICF_secondary_GR_el.json` | GR-PT-secondary | secondary_use |

Checked against the guides without conflict: two-parent consent with the single-parent exceptions and the court-appointed guardian (parents template); written assent from 10 (10-14 and 15-17 templates); the court-appointed judicial supporter and the participant's own written agreement (legal-rep and limited-capacity templates); the Article 35 representative list (emergency template); one witness for deaf or speech-impaired participants, two for participants unable to read or write, audio or video with one witness (witness template); the always-present representative and two-witness fields on the pregnant-partner page; the separate two-parent infant-data page (both pregnancy templates).

## Part II forms

Greece uses the shared EU forms in `content/eu/templates/part-ii` for K1, M1, M2, N1, P1, R1 and S1. They were verified identical in every country folder apart from variable numbering, so nothing was converted and nothing is copied here. The guide recommends the EU template for each of them; no Greek national form replaces a shared one.

Answers are in English, as the Greece guide recommends for these forms (`../DECISIONS.md` D2). National additions are in `requirements.json` (`national_fields` and `drafting_notes_en`):

- K1: Member State fields v105, v108, v110, v114, v117 and v121.
- N1: `n1_issued_by`, because the principal investigator signs at submission.
- P1: f02, f04 and f06, for the National Ethics Committee's benefit rules.
- R1: `r1_the_sponsor_declares`, marked not required. No Greek national statement is needed.
- S1: f03, for the Greek further-use rule.

Documents Greece adds that have no shared form are third-party documents with no template:

- the Phase I principal-investigator Article 7 declaration (M and N);
- the ALS certificates;
- the Phase I equipment evidence;
- the Government Gazette B 230/2026 financial annexes (P2);
- the insurer's certificate (O1);
- the certified translations.

The variable sheet is named `Variable Templates_GR_de.xlsx`, but its content targets Greek ("A paragraph in Greek…", target language Greek). This is treated as a file-name slip.

## Conflicts resolved (rule 2: follow the authority; newest official source wins)

1. **Age-band descriptions.** The template descriptions say "aged 12 - 17 years" (10-14 and 15-17 templates) and "aged 6 - 11 years" (6-9 template). Greek law (JMD G5a/59676, Article 10, as recorded in the minors guide) requires written assent from age 10, so a child aged 10 or 11 must use an assent form. The authority wins: the catalogue uses 6-9, 10-14 and 15-17, which match the file names and the model text. The descriptions are left as supplied.
2. **Form answer language.** The CTIS_GR forms (`_GR_el`) and the variable sheet were prepared for Greek answers. The Greece Part II checklist recommends English for K1, M1, M2, N1, P1, R1 and S1. English is set (`answer_languages`, `language_rules.form_answers`; `../DECISIONS.md` D2).
3. **N1 signature.** The shared N1 form leaves the signature empty unless the Member State requires one. Greece requires the principal investigator's signature at submission, so `signature_at_submission` is true and the national field `n1_issued_by` is set.
4. **P1 status.** In the Germany worked example P1 is mandatory. In Greece it is conditional ("If participants receive reimbursement or compensation"). The Greek rule is used (`compensation.offered`; `../DECISIONS.md` D9).
5. **Emergency-representative form.** The guide makes a separate "Greek emergency representative information and consent form" mandatory. The supplied emergency template addresses its body only to the participant, with an optional representative signature block. A separate emergency-representative document is planned in the emergency population set. It is drafted from the emergency template, addressed to the representative, and every deviation is visible (`../DECISIONS.md` D3; Missing).
6. **Optional choices.** The base style uses tick-box lines (`Checkbox group`) for optional choices. The Greek templates forbid YES/NO boxes and initials and require a separate dated signature for each independent optional decision. The secondary-use guide asks for "a clear yes or no choice for each genuinely separable activity". Resolved in `../styling.md`: each separable activity gets its own signature block, and the wording makes clear that not signing means no. This gives the guide's clear choice in the template's form (`../DECISIONS.md` D4).
7. **Font size and unified document.** The base style uses 11 pt and puts the consent form on a new page with its own letterhead. The Greek templates ask for about 12 pt, and the National Ethics Committee treats information and consent as one continuously paginated document. The Greek rules apply (`../styling.md`).
8. **CTIS titles.** The Greece checklist page uses descriptive section names. The CTCG v3.0 naming guide is used for titles, with `EL` as the country code.

## Mapping to the Greece Part II checklist

There are 17 document entries for the 9 checklist items. Each "Mandatory" or "Conditional" statement on the page that names a separate upload has its own entry, because the uploads differ in kind, author, language or trigger.

| Checklist item | Documents |
|---|---|
| 1 Trial sites | GR-N-SITES (CTIS structured data, no upload) |
| 2 Recruitment arrangements | GR-K1, GR-K2 |
| 3 Participant information and informed consent forms | GR-L1 (with population_sets, including the optional-use form of item 9), GR-L2, GR-L1-TRANSLATION. The endpoint questionnaires are in Part I (`outside_part_ii`). |
| 4 Suitability of the investigator | GR-M1, GR-M2-DOI, GR-M-PHASE1-DECL, GR-M-ALS |
| 5 Suitability of the facilities | GR-N1, GR-N-PHASE1 |
| 6 Proof of insurance cover or indemnification | GR-O1 |
| 7 Financial and other arrangements | GR-P2 (Government Gazette B 230/2026 annexes), GR-P1 (compensation) |
| 8 Data-protection compliance | GR-R1 |
| 9 Biological samples | GR-S1, plus the separate Greek optional consent (secondary_use population set under GR-L1) |

The "Version and submission checks" of the page are in `../checklists/part-ii-package.json` (P3.01, P4.03, P4.05, P4.07, P5.01).

## Open points

- **Paediatric band split.** The parents template cites a National Ethics Committee split into 2 or 3 maturity bands, with indicative ranges 10-12, 13-15 and 16-18. The supplied templates give two bands (10-14, 15-17), and the guide gives no split (`../DECISIONS.md` D5).
- **NEC decisions the guides do not mention.** The parents template cites a 2025 decision on the term "Νομίμως Ορισμένος Εκπρόσωπος": the signature field must say whether the signer is a parent or a court-appointed guardian, with the supporting documents noted. The secondary-use template cites a 2025 decision that future use needs a protocol amendment or a new protocol approved through the NEC and EOF. Both are kept as supplied, because they are template content. They should be confirmed against the National Ethics Committee publications (`../DECISIONS.md` D16).
- **Leftover references.** The main and 15-17 styling instructions refer to "the structure of the Austria/Poland templates". They are kept verbatim in `../styling.md`.
- **Missing templates.** There are no templates for the emergency-representative form, K2, L2, the Phase I documents, the P2 annexes, O1, the translations, the emergency worksheet and information for children under 6. See the Missing list in `../DECISIONS.md`.
