# Italy: decisions for the user

Each line: question; options; recommendation. Answer them together; the package content is ready to use with the recommended defaults.

## Questions

1. **Answer language of the Part II forms (K1, N1, P1, R1, S1).** Options: Italian; English (accepted for non-participant documents). Recommendation: Italian, matching the supplied Italian variable sheet and file names (`answer_languages: ["it"]`).
2. **P1 reimbursement and allowance (national model).** Options: (a) supply the current CCNCE reimbursement and allowance model so it can be converted into `templates/part-ii` and bound to IT-P1; (b) keep the EU compensation form as the interim content basis only; (c) upload the EU form. Recommendation: (a); until then (b). Not (c): the guide requires the national model.
3. **M2 declaration of interests (national model).** Options: (a) supply the CCNCE model v4 (Italian and English) to convert, so the assistant prepares the trial fields (kind becomes `third_party_template`); (b) the PI completes the AIFA model directly and TrialAgents only checks it (current setting). Recommendation: (a).
4. **Separate privacy notice: template and scope.** Options for scope: one document per population; one per signer route (participant, parent or guardian, legal representative) shared across populations whose content does not differ. Recommendation: supply the CCNCE privacy model of 13 August 2026 to add as a participant template; one document per signer route.
5. **S1 model.** Options: shared EU S1 form (supplied); CCNCE model on collection, storage and future use of biological samples (23 June 2022, not supplied). Recommendation: EU S1, since the guide accepts "the latest applicable EU or Italian model"; check the AIFA list before filing and switch if AIFA lists the CCNCE model as current for this category.
6. **Separate participant sample consent when samples serve only the protocol.** Options: always a separate sample document; separate only when samples are stored beyond the trial or used in future, residual-material, genetic or biobank research. Recommendation: the second; protocol-required samples are described in the main L1 form.
7. **K1 upload location.** The guide files recruitment information under Recruitment arrangements and consent-process information under the subject information and consent category, "as applicable". Options: one combined K1 (template v2.0) under K; split the consent-process part into an L upload. Recommendation: one combined K1 under K unless the ethics committee asks otherwise.
8. **Uploaded filename.** Options: filename = CTIS title; filename = CTIS title plus version and date (for example `_v1-0_2026-11-27`, no periods or brackets). Recommendation: the second, so the visible version matches the filename as the Italy guide asks, while the CTIS title stays without version and date (CTCG v3.0).
9. **Risk frequency categories.** The Italy guides name no frequency categories. Options: use the categories of the IB or SmPC for each product; adopt wording from the CCNCE 27 May 2026 model once supplied. Recommendation: IB or SmPC categories, recorded as a source, until the CCNCE model is checked.
10. **Operational patient-facing materials (IT-R2).** Options: plan only endpoint-defining materials (English source in Part I, Italian version with the participant documents); plan every diary, card and device instruction. Recommendation: the first; the guide says there is no blanket Part II requirement.
11. **Pregnancy add-ons.** Infant follow-up permission and healthcare-provider release wording have no template. Options: a section or appendix in the pregnancy templates (as their instructions allow); separate documents. Recommendation: a section or appendix, separate only when infant procedures go beyond passive safety outcome collection.
12. **GP or paediatrician letter (CCNCE, 7 January 2026).** Options: include it in the plan as a recommended, not-uploaded document when the participant's doctor is informed; leave it out. Recommendation: include it when relevant (needs the CCNCE model).
13. **P2 agreement material granularity.** Options: one per site; one per trial with site annexes. Recommendation: one per site, since each site agreement is executed separately.

## Missing

Documents the guides require that have no template in `CTIS_IT`:

- **CCNCE privacy information and data-processing consent model**, announced 13 August 2026 (IT-PRIVACY, mandatory).
- **CCNCE declaration-of-interests model**, version 4, 21 April 2024, Italian and English (IT-M2-DOI, mandatory). The folder holds only the EU form.
- **CCNCE model for participant allowances and reimbursement of expenses**, version 3, 10 November 2022, or the current AIFA version (IT-P1, mandatory). The folder holds only the EU compensation form.
- **National clinical-trial agreement**, version 3: commercial 28 January 2026, non-commercial 22 July 2026 (IT-P2, mandatory).
- **CCNCE model on collection, storage and future use of biological samples**, 23 June 2022 (IT-S1 or the participant sample consent; see question 5).
- **CCNCE general-practitioner or paediatrician letter**, 7 January 2026 (recommended, not a CTIS upload).
- **Infant follow-up permission and healthcare-provider release wording** for pregnancy follow-up (no template; see question 11).
- No templates, as expected, for K2 recruitment material, IT-R2 operational materials and the insurer-issued O1 certificate and policy terms.

Other gaps (not in the Italy guides; not filled from memory):

- Fee amount and payment route for Italy.
- Minimum insurance limits and the length of the extended post-trial period for minors and advanced treatments (the guides cite the Ministerial Decree of 14 July 2009 but give no figures).
- Risk frequency categories (question 9).
- Radiation-protection documents and any low-intervention insurance exception: the Italy guides are silent.
- A separate list of trial sites: not an Italy checklist item; sites are checked against CTIS in the package checklist (P1.12).
- The AIFA Article 7 evaluation guide (May 2024) is marked under revision; recheck the CCNCE page before filing.
- The Italian-language guides (`/ctis/italy/it`) were not read (outside the `/ctis/italy/en/` scope).
- The variable sheet file is named `_IT_de` though its content is Italian.
