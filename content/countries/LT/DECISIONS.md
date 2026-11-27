# Lithuania: decisions and gaps

Please answer these together. Each item gives the question, the options and a recommendation. Until they are answered, the package uses the recommended defaults.

## Questions for the user

- **D1 National sample forms or shared EU forms.** The Lithuanian Bioethics Committee publishes sample forms for the consent procedure, CV, site suitability and biological samples. They are recommended, not mandatory, and an equivalent format that fully covers the required information is accepted. Options: (a) use the shared EU forms (K1 v2.0, M1, N1, S1) with the Lithuanian national fields; (b) supply the national sample forms, to be converted into `countries/LT/templates/part-ii`. Recommendation: (a). The guide calls the EU K1 v2.0 "highly recommended" for submissions from 1 September 2026, and the supplied `CTIS_LT` set is the EU set.
- **D2 Lithuanian for documents issued by others.** The guides say every document of the national list is submitted in Lithuanian. That includes the insurance certificate, CVs and training certificates. They give no exception for English originals. Options: (a) Lithuanian only (insurer and investigators issue Lithuanian versions, or a Lithuanian translation is attached); (b) accept English or bilingual originals for the CV, insurance and training evidence, after confirming with the Lithuanian Bioethics Committee. Recommendation: (a), the guide's rule. Use (b) only with written confirmation.
- **D3 Where the advertising explanation goes.** The Committee expects an explanation with recruitment advertisements: why advertising is needed, placement, ineligible respondents, reimbursement and respondents' personal data. Options: (a) in K1 (fields v102, v103 and v105, which ask for this); (b) a separate cover note uploaded with each K2 item. Recommendation: (a). It needs no extra document, and K2 stays the advertisement itself.
- **D4 Other subject information (L2).** The national list names items such as a subject card. The current FAQ limits extra patient-facing submissions to those Annex I requires. Options: (a) upload L2 items only when they are part of the information needed before the participation decision; (b) upload every participant-facing material. Recommendation: (a), per the FAQ.
- **D5 Title and location of the site list.** The guide makes the site list a separate mandatory submission document but gives no CTIS section, and the naming guide gives no example. Options: (a) `N2_List of trial sites and principal investigators_LT` under suitability of facilities (as Germany's N2); (b) `M3_List of sites and principal investigators_LT` under suitability of the investigator. Recommendation: (a). Confirm against the current CTIS upload structure.
- **D6 Who prepares the site list.** Options: (a) the sponsor supplies it and TrialAgents checks it against CTIS, M1, M2 and N1 (current setting); (b) TrialAgents assembles it from site data the sponsor supplies, without inventing anything. Recommendation: (b) once the site data are available. The document kind would then change to a drafted document.
- **D7 Investigator qualification description: scope, title and author.** The guide asks for a description of investigator qualifications plus a sponsor compliance statement. It does not say whether this is one document for the trial or one per site. Options: (a) one trial-level document `M3_Investigator qualifications and sponsor statement_LT`, with E6(R3) and GCP training evidence attached, prepared by the sponsor (current setting); (b) one per site (`M3_Investigator qualifications_<investigator>_<site>`); (c) TrialAgents drafts the description from the supplied CVs and training records, and the sponsor confirms the statement. Recommendation: (a), with (c) if the sponsor wants it drafted.
- **D8 Signing the declaration of interest.** Lithuania requires each declaration of interest to be signed at submission. The shared EU form has name, institution and date lines but no signature line. Options: (a) the investigator signs next to the date line (handwritten, or an electronic signature whose validity is established); (b) add a signature line to a Lithuania-specific copy of the form, converted into `countries/LT/templates/part-ii`. Recommendation: (a). It keeps the shared form unchanged. Confirm with the Committee if a sponsor's EU-level guidance says no signature is needed (templates/README.md).
- **D9 P1 when no reimbursement applies.** Item 11 is mandatory only when reimbursement applies, while financing (item 12, P2) is always mandatory. Options: (a) submit P1 whenever any reimbursement or compensation for time applies (including contraception costs), and otherwise state "no compensation" in P2; (b) always submit P1, ticking "No" with the reason when none applies. Recommendation: (a), as the guide words it. Use (b) if the sponsor prefers a uniform package.
- **D10 GDPR statement location.** The guide lists the GDPR statement in the national list without a CTIS location. The naming guide notes that the GDPR statement can use the Forms section. Options: (a) Part II R, titled `R1_Compliance collection and use personal data_LT`; (b) the CTIS Form section, titled "GDPR compliance statement". Recommendation: (a), so the national-list item is visibly in the Part II package. Use (b) if the current CTIS structure provides only the Form slot.
- **D11 Biological-sample form.** The national recommendations include a specific Lithuanian biological-sample form (recommended, not mandatory). Options: (a) the shared S1 form, answered in Lithuanian with compliance with Lithuanian rules stated; (b) the national sample form, once supplied. Recommendation: (a).
- **D12 Children under 12, and the upper age band.** For children under 12 the guide requires oral information and asks whether written information is also given. The guides do not state the age of legal competence as a number. Options: (a) plan written child information (`LT-PT-child-under-12`) only when the protocol's age range and procedures make it appropriate, and set the upper bound of the 12-plus band and the re-consent age from the protocol and Lithuanian law as the sponsor confirms; (b) always prepare a written child document. Recommendation: (a).
- **D13 Missing Lithuanian participant templates.** Options: (a) supply a Lithuanian template set, to be split into `templates/participant` as `*_LT_lt.json`; (b) draft each document from the Lithuania guides with the base style, or adapt it from its reference-package counterpart (`based_on`). Recommendation: (b) now and (a) when a set is available.
- **D14 Impartial witness: separate document or added blocks.** No national witness form exists. Options: (a) a separate witness version of the population's ICF (`L1_SIS and ICF_impartial witness_<population>_LT_lt`); (b) witness and alternative-consent blocks added to the main ICF. Recommendation: (a) when a specific group is expected to need it, and (b) when it is only a remote possibility, so the main form does not carry unused witness fields (the QC checklist says witness fields only where the pathway may be used).
- **D15 Future use: separate form or opt-in choice.** The Committee accepts either. Options: (a) a separate future-use ICF (`L1_SIS and ICF_future use_LT_lt`); (b) a distinct opt-in box in the main ICF consent section. Recommendation: (a) when the programme is complex (long storage, broad purposes, transfers, several material types), as the guide advises, and (b) for a single simple choice.
- **D16 Proof of payment title.** The naming guide puts proof of fee payment in the Forms section, with no CTCG title. Options: (a) `Proof of payment_state fee_LT`; (b) the sponsor's own filename. Recommendation: (a).

## Missing

Documents the guides require that have no template in the supplied set:

- **The whole Lithuanian participant template set.** No templates were supplied. There are 12 planned templates:
  - adult patients (`LT-PT-main`)
  - healthy volunteers (`LT-PT-healthy`)
  - parents or legal representatives of minors (`LT-PT-parents`)
  - information and assent for children aged 12 and above (`LT-PT-assent-12-plus`)
  - written child information for children under 12 (`LT-PT-child-under-12`)
  - legally entitled representative of an adult (`LT-PT-legal-rep`)
  - adapted participant information for adults with limited capacity (`LT-PT-limited-capacity`)
  - consent to continue after emergency enrolment (`LT-PT-emergency`)
  - impartial witness (`LT-PT-witness`)
  - pregnancy follow-up of a participant (`LT-PT-pregnancy`)
  - pregnant partner (`LT-PT-pregnant-partner`)
  - future use of samples or coded data (`LT-PT-secondary`)

  All are marked `"template": "missing"` (D13).
- **Lithuanian Bioethics Committee sample forms and ICF recommendations** (2022, amended October 2022). They were not supplied; the shared EU forms are used instead (D1, D11).
- **K2 recruitment material and L2 other subject information.** Free-form, drafted from the protocol.
- **Site list (N2).** No template (D5, D6).
- **Investigator qualification description and sponsor statement (M3).** No template (D7).
- **Insurance certificate or policy (O1).** Issued by the insurer.
- **Financing and financial arrangements (P2).** Sponsor document, no template.
- **Proof of payment.** Payment confirmation from the sponsor (D16).

Other gaps:

- **State fee.** The guides say a fixed state fee applies to authorisation and to substantial modifications, but give neither the amount nor the payment route.
- **Insurance.** The guides give no minimum cover and no required wording.
- **Compensation for time.** The guides say Lithuanian law regulates it, but give no rates or limits.
- **Age of legal competence.** The guides do not state it as a number (D12).
- **Electronic consent.** The FAQ conditions are summarised only in outline: prior agreement, durable-medium storage and separate tablet-signature requirements. The legal validity of the chosen e-signature method must be established from the FAQ itself.
- **Contacts.** The guides require contacts for participant rights and research-related injury, but name no national contact body or telephone number.
- **Endpoint-related patient-facing documents** (questionnaires, diaries). Lithuania's list has no R2 item. The QC page only requires them to match the protocol, so none is planned unless they fall under L2 (D4).
- **Lithuanian-language guides** (`/ctis/lithuania/lt`) were not read, because they are outside the `/ctis/lithuania/en/` scope. The EU hub linked from the Lithuania hub was not re-read.
- **Variable sheet name.** The file name carries `_de` although its content is Lithuanian. This has no effect, because the forms are shared.
- **Audit script.** `tools/content/audit.py` accepts the planned ids in `participant_templates_missing` for `population_rules.*.always`, `age_bands[].template` and `shareable_templates`. It does not check the extra `conditional` keys used here; their ids were checked by hand. The script was not edited.
