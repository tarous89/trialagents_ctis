# Austria: decisions and gaps

Answer these together. Each line: question; options; recommendation.

## Questions for the user

- **D1 Form answer language.** In which language are the Part II forms (K1, P1, R1, S1) and administrative documents answered? Options: (a) English; (b) German; (c) English for multinational trials, German for national-only trials. Recommendation: (c). The guides record an English dossier for multinational trials (BASG) but say nothing about national-only trials or German administrative documents such as an Austrian insurer's certificate, so confirm (b) for those with BASG/AustrianEthics before using it. `requirements.json` is set to English until then.
- **D2 Austrian site-suitability form.** Can you supply the official Austrian Trial Site Suitability Form (DOCX)? Options: (a) supply it, and we convert it into `countries/AT/templates/part-ii` as a form where the assistant fills the trial fields and the site completes and signs the rest; (b) leave N1 as a document the site prepares entirely. Recommendation: (a). The EU form is not accepted in Austria, so N1 has no template today.
- **D3 Austrian national ICF template.** Can you supply the official Austrian Patient Information and Informed Consent template (DOCX)? Options: (a) supply it so the insurance and data-protection passages in our templates can be checked word for word; (b) treat the passages in our templates as the national text without checking. Recommendation: (a). These passages must be used verbatim, and we cannot confirm that today.
- **D4 Optional genetic investigations.** Our templates put the optional genetic consent as a block inside the main consent form, but AustrianEthics requires a separate consent form. Options: (a) a separate L1 document (`L1_SIS and ICF_optional genetic investigation_<population>_AT_de`) built from the genetic module of the population's template; (b) supply a dedicated template; (c) keep the block in the main ICF. Recommendation: (a) now, and (b) when a template is available. (c) does not meet the authority's rule.
- **D5 Post-hoc consent after temporary incapacity (not an emergency).** Austria requires a post-hoc information and consent form when capacity returns, but the only post-hoc template we have is written for emergency inclusion. Options: (a) adapt the emergency template, with every deviation visible; (b) supply a dedicated template. Recommendation: (a) for now, (b) for the long term.
- **D6 Signatures of persons with custody.** The parents template has one signature block. Options: (a) keep one block and add an optional second representative block, with the legal entitlement confirmed per minor; (b) keep it as supplied. Recommendation: (a). The guide says not to hard-code a one-parent or two-parent rule.
- **D7 GCP training evidence.** Austria requires evidence of ICH GCP training but names no CTIS title for it. Options: (a) a separate upload `M2_GCP training_<investigator>_<site>` (the Germany pattern); (b) `M1_GCP training_<investigator>_<site>` next to the CV; (c) attached to the CV in M1. Recommendation: (a), which keeps the catalogue consistent across countries.
- **D8 Splitting the insurance documents.** How should the insurance documents be split between O1 and O2? Options: (a) O1 = insurance confirmation; O2 = policy and terms and conditions, including the extended investigator liability and criminal legal-protection information; (b) everything under O1. Recommendation: (a). The Austria page calls O2 "where needed", but AustrianEthics requires all three documents.
- **D9 Site contact details.** For multicentre trials, how are site contacts given? Options: (a) placeholders in the master ICF and a separate site contact list marked "not for publication" (proposed title `L1_SIS and ICF_site contact list_AT_de`); (b) site-specific ICFs with full contacts. Recommendation: (a), which AustrianEthics permits and which avoids an ICF amendment when a contact changes. The guides name no CTIS slot or title for the list, so confirm the title.
- **D10 Signatures on P1, R1 and S1.** The Austria guides set no signature rule for these forms. Options: (a) no signature, with only the form's own sponsor fields (R1 name, role and date) completed; (b) signed by the sponsor. Recommendation: (a), unless AustrianEthics asks otherwise.
- **D11 Children under 8.** For enrolled children under 8: (a) prepare a short age-appropriate information sheet (no template yet); (b) document only the oral information, with parent consent. Recommendation: decide per study. The Forum recommends informing younger children who can understand; it is not a document requirement.
- **D12 External reimbursement provider.** Where do the provider's details go? Options: (a) in the main ICF; (b) in a separate L2 document. Recommendation: (a). Guidance V5 says a separate document is unnecessary when the main ICF has all the required information, completely and concisely.
- **D13 German protocol synopsis.** If Part I is outside the plan, should we still record the German protocol synopsis that Austria requires? Options: (a) record it as a Part I source to obtain; (b) add it to the plan as a Part I document. Recommendation: (b) if Part I is in the plan, otherwise (a).

## Missing

Documents the guides require that have no template in the supplied set:

- **N1 Austrian Trial Site Suitability Form.** The official national DOCX was not supplied, and the EU form is not accepted (D2).
- **Separate consent form for optional genetic investigations** (D4).
- **Post-hoc information and consent after temporary incapacity outside an emergency** (D5).
- **Site contact list "not for publication"** for the placeholder route (D9).
- **K2 recruitment material and L2 other information material.** Free-form, drafted from the protocol.
- **GCP training evidence, O1 insurance confirmation and O2 policy and terms.** Supplied by the investigator or insurer.
- **Information for children under 8.** Recommended, not required (D11).
- **German protocol synopsis (Part I) and the national contact and billing address** (CTIS Forms). These are outside Part II, and no template is needed or supplied.

Other gaps:

- **Austrian national ICF template (DOCX).** Without it, the verbatim insurance and data-protection passages cannot be checked (D3).
- **Language of administrative and third-party documents for national-only trials.** Not stated in the guides (D1).
- **Signature rules for P1, R1, S1, O1 and O2.** Not stated (D10).
- **CTIS titles or slots for the GCP evidence and the site contact list.** The guides do not give them (D7, D9).
- **Detailed text of AustrianEthics Guidance ICF Version 5.0 (17 September 2026).** The guides only summarise it. Exact requirements are missing for: data transfers to the United States, external reimbursement providers (fees, usability, terms under Austrian law, data minimisation) and optional third-party services. The checklists refer to these items but cannot spell them out.
- **Institution-specific signatory lists for N1** (hospitals, federal states). Check the current list before signatures are collected.
- **National contact point for insurance questions** (the template's "Kontaktstelle gemäß § 42 AMG"). The guides require it but do not name it; take it from the national template or AustrianEthics.
- **Endpoint-related patient-facing documents (questionnaires, diaries).** The Austria Part II checklist gives them no Part II slot; only the German-language rule for their use is stated.
