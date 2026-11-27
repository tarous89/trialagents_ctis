# France: decisions for the user

Each line: question | options | recommendation. Sources: the France guides (reviewed 23 September 2026), the CTIS_FR template set and the naming guide. Answer them together; the package works with the recommendations until then.

## Questions

1. **Additional France application document (FR-K-ADDITIONAL), mandatory and signed, has no template in CTIS_FR.** | (a) you supply the current CNRIPH form; it is converted into `countries/FR/templates/part-ii` and becomes a `form` the assistant drafts (Draft → Check); (b) keep it as a sponsor-prepared document that is only checked. | (a); until then (b).
2. **Separate genetic testing document (FR-L1-GENETIC) has no template.** | (a) draft it as a standalone L1 from the genetics section and consent-page structure of the matching participant template; (b) wait for a dedicated template from you. | (a) now, (b) when a template exists.
3. **The supplied templates keep a genetics section/choice inside the main consent.** | (a) when FR-L1-GENETIC is used, keep only a short pointer in the main document and move the consent to the separate form; (b) keep both. | (a): the national guidance expects a separate document, and a single bundled signature is not allowed.
4. **Curatorship (curatelle) route has no template; the legal-representative template excludes it.** | (a) use the main template, adapted, with participant consent plus a curator-assistance signature block (population set `adults_under_curatorship`); (b) supply a dedicated template. | (a).
5. **Minors under 6 who can understand part of the decision: no template.** | (a) draft a short developmentally appropriate document from the 6-11 template when the protocol enrols under-6s; (b) record the oral information and the child's response in the consent procedure only. | (a) when such minors are enrolled, after confirming with you.
6. **Children's band 6-11 (France has no statutory band).** | (a) keep 6-11 / 12-17 as default drafting bands; (b) set bands per study, justified by readability and maturity. | (a) as default, adjusted per study (b) when the cohort is narrow or wide.
7. **Impartial-witness template says it must not be used for healthy volunteers; the guide states no such limit.** | (a) keep the template's limit (no witnessed route for healthy volunteers); (b) allow the witnessed route for capable healthy volunteers who cannot write, drafted from the witness template. | Ask the CPP-facing regulatory lead; until confirmed, (a), and flag any such volunteer as needs decision.
8. **CV and DoI for "every investigator listed for France".** | (a) principal investigators only (one per site); (b) every investigator named in the France site list. | (b): it follows the guide's wording.
9. **RPPS identifier and GCP training date are expected on the CV, but the EU CV template has no field for them.** | (a) ask each investigator to include them in the CV text (checked in M1.03); (b) add a national field to the shared M1 form. | (a): the CV stays the original EU form (rule 5).
10. **Site list (FR-M-SITE-LIST): France places it in section M; no naming-guide example.** | (a) CTIS structured data, plus an uploaded list titled `M3_List of sites and principal investigators_FR` only where requested; (b) always upload a list document. | (a).
11. **No separate recruitment material planned.** | (a) state it in K1 (v102/v103) so the position is clear in the filed recruitment set; (b) upload a short K2 statement. | (a).
12. **Endpoint-related questionnaires and diaries: L2 or R2.** | (a) `R2_Patient-facing document_<type>_FR_fr` for endpoint-related items, L2 for other materials; (b) everything under L2. | (a), the naming guide's more specific category (the France page allows it).
13. **English source of endpoint-related documents in Part I (`D4_Patient-facing document_<type>_ENG`)?** The France guides do not say. | (a) follow the naming guide and file the English source in Part I with the protocol; (b) French version only. | (a); confirm.
14. **Shared EU data-protection statement (`R1_Data protection.docx`, also in CTIS_FR) is not on the France checklist.** | (a) do not file it; R1 holds the CNIL MR-001 receipt or authorisation and the MR-001 position goes in the Additional France document; (b) file it as well. | (a).
15. **Titles for the national documents without a naming-guide example.** | Additional France document `K3_Additional application document_FR`; ARS decision `N2_ARS site authorisation_<site>`; site list `M3_…`. Alternatives: keep the official name "Additional France application document" in the title. | Use the proposed titles.
16. **Shareable templates (pregnant partner, secondary use) across populations.** | (a) one shared document when nothing in it differs; (b) one per population. | (a), with separate versions where the consent giver differs (minors, protected adults).
17. **Emergency: legal-representative version.** | (a) adapt `L1_SIS and ICF_legal rep_FR_fr.json` to the deferred-consent context (what has already happened, choices now, right to object to use of data); (b) supply a dedicated template. | (a).
18. **Short emergency information aid (recommended by the guide).** | (a) draft one when the protocol allows an explanation before or right after the first intervention; (b) none. | (a) only when the protocol foresees such an explanation.

## Missing

Documents the guides require (or recommend) with no template in CTIS_FR, and other gaps:

- **Additional France application document** (Part II checklist item 3, mandatory, signed by the CTIS applicant). The CNRIPH form is not in the folder.
- **Separate genetic testing information and consent** (item 5, conditional). No template.
- **Curatorship information and consent with curator assistance** (limited-capacity guide, mandatory for that route). No dedicated template; legal-rep template excludes it.
- **Information for minors under 6** who can understand part of the decision (minors guide, mandatory). No template.
- **Short emergency information aid** (emergency guide, recommended). No template.
- **Article 35 site checklist or source-note template** (emergency guide, recommended, internal). No template.
- **Judge or family-council authorisation** where the CPP finds a serious risk (limited-capacity guide, conditional). Third-party document; not an item on the Part II checklist, so no document entry; kept in `population_rules`.
- **Accessible or adapted materials for the witnessed route** (read-aloud, large print, supported communication; impartial-witness guide, conditional). No template.
- **List of sites in the "current EU or CTIS list format"** (item 8). Format not supplied; CTIS structured data used.
- **Third-party documents** (no template needed, supplied by others): insurance certificate (item 13), CNIL MR-001 receipt or authorisation (item 15), ARS decision (item 12), CVs and DoIs completed by investigators (items 9, 10).
- **Free-form participant materials** (no national template by design): recruitment material (item 2), other participant-facing materials (item 6).
- **Other gaps:** the exact national healthy-volunteer register process (the guide says to confirm it with the sponsor's France privacy and site teams); final wording identifying the CPP opinion and ANSM authorisation (finalised once decisions are available); exact CNRIPH recommendations are cited by the guides but their text was not available.
