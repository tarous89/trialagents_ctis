# Italy templates

Source: the `CTIS_IT` folder supplied on 27 November 2026, and the TrialAgents Italy guides at `https://trialagents.com/ctis/italy/en` (11 pages, reviewed 23 September 2026).

## Participant templates (JSON), used as supplied

One file per template in `participant/`, split from `IT_Participant-facing_templates_05082026.txt` with the content unchanged. The old pipeline variables in the metadata were already plain bracket notes (`[population label]`, `[population description from the protocol]`, `[document name]`, `[date]`). No file was renamed: the children's band `age 6-11` matches the CCNCE model (see conflicts below).

| File | Population set in `requirements.json` |
|---|---|
| `L1_SIS and ICF_main_IT_it.json` | adult_patients (also re-consent at 18 and after regained capacity) |
| `L1_SIS and ICF_healthy_IT_it.json` | healthy_volunteers |
| `L1_SIS and ICF_parents_IT_it.json`, `…_age 6-11_IT_it.json`, `…_age 12-17_IT_it.json` | minors |
| `L1_SIS and ICF_legal rep_IT_it.json`, `…_limited capacity_IT_it.json` | adults_without_capacity |
| `L1_SIS and ICF_emergency_IT_it.json` | emergency |
| `L1_SIS and ICF_witness_IT_it.json` | impartial_witness |
| `L1_SIS and ICF_pregnancy_IT_it.json` | pregnancy_participant |
| `L1_SIS and ICF_pregnant partner_IT_it.json` | pregnancy_partner |
| `L1_SIS and ICF_secondary_IT_it.json` | secondary_use (the participant sample consent of checklist item 6) |

The extra `Participant-facing templates_IT.docx` in the folder is a copy of the same templates and was not used.

## Part II forms

Italy uses the shared EU forms in `content/eu/templates/part-ii` (the `CTIS_IT` DOCX files are identical apart from the variable numbering). Answers in Italian, matching the Italian variable sheet. National notes are in `requirements.json` (`drafting_notes_it`, `national_fields`): K1 national sections, N1 signature block, P1 details, S1 section 5. R1 needs no national statement in Italy.

Nothing was converted into `countries/IT/templates/part-ii`: the Italian national models the guides require (declaration of interests, reimbursement and allowance, privacy notice, clinical-trial agreement) are not in the folder. They are listed in `../DECISIONS.md` under Missing; each one goes into `templates/part-ii` (or `templates/participant` for the privacy notice) once supplied.

The variable sheet is named `Variable Templates_IT_de.xlsx`, but its content targets Italian ("A paragraph in Italian…", target language Italian). Treated as a file-name slip.

## Conflicts resolved (rule 2: follow the authority; newest official source wins)

1. **Declaration of interests (M2).** The folder's `M2_DoI Principal investigator_IT_it.docx` is the EU form; the Italy guides require the CCNCE national model, version 4, 21 April 2024. The CCNCE model wins. `IT-M2-DOI` is a `third_party_document` until the model is supplied.
2. **Participant compensation (P1).** The folder's P1 is the EU (CTAG) compensation form; the Italy guides require the CCNCE reimbursement and allowance model (version 3, 10 November 2022). The national model wins. The EU form is bound only as an interim content basis (`interim: true`, `use_for_upload: false`), and Check item P1.01 stays unmet until the national model is used.
3. **CTIS naming.** The Italy checklist asks for file names with document type, country or language, version and date. The CTCG naming guide v3.0 (10 February 2026, newer) puts version and date in CTIS metadata, never in the CTIS title. Resolved: CTIS titles follow CTCG; the uploaded filename may carry version and date (allowed by the naming guide), matching the visible document version.
4. **Coordinating centre.** The May 2024 AIFA Article 7 guide (marked under revision) used a coordinating-centre label; the June 2026 CCNCE FAQ confirms no formal coordinating centre is required for CTIS trials. The FAQ wins (M2 drafting note and check M2D.03).
5. **Privacy notice as an annex.** The main and population templates list the privacy information and consent under "Allegati". The CCNCE FAQ (10 June 2026) requires a separate privacy document distinct from the consent form, filed under personal data protection. It is planned as its own document `IT-PRIVACY` (CTIS section R), not as an annex inside the L1 file.
6. **Site letterhead.** The base style puts the site letterhead in `Header`; the Italy guide says institution letterhead is not required and, if used, must be the institution's. Italy rule applied in `styling.md`.
7. **Signatures.** The shared N1 form leaves the signature empty unless the Member State requires one; Italy requires the institution's legal representative or delegate to sign with PAdES or equivalent (`signature_at_submission: true`, national field `n1_issued_by`). The insurance certificate is signed by the insurer and must be in Italian, unlike other administrative documents.
8. **Mandatory EU templates.** The Italy hub designates the EU PI CV and site-suitability templates as mandatory (Germany: recommended). Recorded as `mandatory_template: true` for M1 and N1.

Checked without conflict: the age bands in the templates (6–11, 12–17) match the CCNCE appendix heading and current model; the pregnant-partner template's built-in privacy section matches the guide's "separate pregnant-partner information and privacy form".

## Mapping to the Italy Part II checklist

Fourteen document entries for the thirteen checklist items. Item 11 has two uploads with different authors and kinds, so it gives `IT-P1` (reimbursement model, form) and `IT-P2` (clinical-trial agreement material, third-party document). The participant sample consent of item 6 is the `secondary_use` population set, filed under L. Recommended documents that are not uploads (the GP or paediatrician letter, site files) are in the package checklist (P1.13) only.

## Open points

See `../DECISIONS.md`.
