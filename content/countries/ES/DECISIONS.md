# Spain: decisions for the user

Each line gives the question, the options and the recommendation. Until a question is answered, the package follows the recommendation. Sources: the TrialAgents Spain CTIS guides (reviewed 23 September 2026) and the CTIS_ES template folder.

## Questions

1. **Children's template band.** The authority's band is "under 12"; the template is labelled 6-11. Options: (a) keep the file name `age 6-11` and apply the authority's band in `population_rules`; (b) rename the file to `age under 12`. Recommendation: (b), done with the template owner. For now (a) applies, because the templates are kept as supplied.
2. **Answer language of the Part II forms.** Options: Spanish; English (accepted for administrative documents, but not for insurance). Recommendation: Spanish (`answer_languages: ["es"]`), because the CEIm assesses Part II.
3. **K1 when the protocol fully describes recruitment.** Options: (a) always submit K1 on the EU template v2.0; (b) skip K1 and have the cover letter point to the protocol section. Recommendation: (a). It covers the Spanish consent pathways explicitly, and v2.0 applies to every new Part II submission.
4. **GDPR statement in the CTIS Form.** Options: (a) TrialAgents drafts it on the shared R1 form (`ES-GDPR-STATEMENT`) with the title "GDPR compliance statement"; (b) the sponsor provides it outside the package. Recommendation: (a). The naming guide gives no CTCG title for this Form upload, so please confirm the title.
5. **P section titles.** Options: (a) financial budget = `P1_Compensation participants and financial arrangements_ES`, optional EU compensation form = `P2_Compensation participants_ES`; (b) budget = `P2_Financial budget_ES`, compensation form = P1. Recommendation: (a). The mandatory Spanish budget covers both participant compensation and the financial arrangements, which matches the CTCG P1 title.
6. **Who prepares the financial budget.** Options: (a) the sponsor's finance team supplies it and TrialAgents only checks it (current setting, `third_party_document`); (b) TrialAgents drafts it from the sponsor's figures, which needs a budget template. Recommendation: (a), unless a budget template is added.
7. **EU compensation form (`ES-P2-COMPENSATION`).** Options: include whenever compensation is offered; include only on request. Recommendation: include it only when the sponsor wants it. It is optional in Spain and the budget is mandatory.
8. **Biological samples form.** Options: (a) use the shared EU S1 form, which gives "the same information in the dossier with a clear reference", with the Spanish additions in section 5; (b) use AEMPS Annex XIII, which the guide calls the accepted Spanish Part II form. Recommendation: (b). Supply Annex XIII and convert it into `countries/ES/templates/part-ii`. Until then, (a) applies.
9. **Site suitability form.** Options: EU form with Spanish notes (department and collaborating departments, director signature); AEMPS Annex IV. Recommendation: EU form, which Spain accepts. Switch to Annex IV if the sites prefer it, which means supplying the form.
10. **Future data use outside the drug development programme.** Options: (a) a separate secondary-use document (`L1_SIS and ICF_secondary_ES_es.json`); (b) an independent yes/no box in the main ICF. Recommendation: (a) whenever samples are stored for future research, because AEMPS recommends a specific document. Use (b) only for a data-only choice when the main ICF stays within 15 pages.
11. **Language code on administrative titles.** Options: `_ES` as in the naming-guide examples; `_ES_es` on every title. Recommendation: `_ES_es` on participant-facing documents (K2, L1) only and `_ES` elsewhere. The naming guide adds the language only where it distinguishes the document.
12. **Insurance commitment titles (O2).** Options: the descriptive subtypes used now (`Sponsor responsibility commitment`, `Non-commercial insurance commitment`, `Civil liability certificate`); the plain `O2_Proof of coverage_<sponsor or site>`. Recommendation: the descriptive subtypes, so that the documents are unique and self-explanatory.
13. **New study-fact keys.** Spain needs `population.non_spanish_speakers`, `recruitment.procedure_fully_in_protocol`, `substudy.optional_subpopulation`, `trial.non_commercial`, `insurance.international_policy_exclusions`, `insurance.low_intervention_site_liability_cover`, `compensation.offered`, `compensation.eu_template_used` and `budget.individual_site_budgets`, none of which is in `playbook/planning.md`. Options: add them to the playbook; keep them Spain-only. Recommendation: add them to the playbook in an EU-level change (outside this country folder).
14. **Documents the Spain guide does not mention.** Germany has L2 (other information material), R2 (translated endpoint documents), N2 (list of sites) and regulatory-training certificates. The Spain Part II checklist lists none of them. Options: leave them out; add them per study. Recommendation: leave them out, and raise any per study only when the user or an official Spanish source asks for them.

## Missing

Documents or texts the guides require for which no template was supplied:

- **AEMPS Annex VA, insurance certificate model** (version 27 March 2023): needed for `ES-O1`, in Spanish and executed.
- **AEMPS Annex VB, additional sponsor responsibility commitment**: `ES-O2-SPONSOR-COMMITMENT`.
- **AEMPS Annex VI, non-commercial sponsor commitment**: `ES-O2-NON-COMMERCIAL`.
- **AEMPS Annex VII, low-intervention civil-liability certificate**: `ES-O2-LOW-INTERVENTION`.
- **Financial budget**: `ES-P1-BUDGET` is mandatory, but the guide names no AEMPS model and none was supplied.
- **AEMPS Annex XIII, compliance with Spanish rules for biological samples** (template version 28 January 2022): the accepted Spanish S1 form. The EU S1 form is used until it is supplied.
- **AEMPS Annex IV, site suitability** (version 27 March 2023): an accepted alternative to the EU N1 form. Optional.
- **AEMPS Annex VIIIA guideline** (27 February 2025) and **Annex VIIIB biological-sample paragraphs** (20 December 2017): the official texts the participant documents must follow. The templates carry the Annex VIIIA structure, but the official texts were not supplied, so the sample paragraphs and the templates cannot be checked against them.
- **Short initial information for emergency enrolment** (conditional, emergency guide): no template.
- **Signed declaration for the non-commercial fee exemption** (CTIS Form, outside Part II): no template.
- **KIDS Barcelona young-person guidance**: a recommended aid for minors' documents; not supplied.

Other gaps:

- The guide says site suitability "corresponding to M64 and N" without explaining "M64". The package uploads N1 under N (site suitability). Please confirm.
- The guide refers to "the Spanish statutory coverage limits" (Royal Decree 1090/2015) but gives no amounts, so the insurance checks cannot verify figures.
- The guide gives no explicit CTIS document names. All titles come from the CTCG naming guide v3.0.
- Neither the guide nor the templates provide a revocation (withdrawal) form. Spain does not require one; if a protocol uses one, it needs the AEMPS wording that withdrawal is valid without signing it.
- The Spanish-language version of the guides (`/ctis/spain/es`) was not read. Only the English pages under `/ctis/spain/en/` were in scope.
