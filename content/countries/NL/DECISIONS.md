# Netherlands: decisions and gaps

Answer these together. Each line gives the question, the options and a recommendation. Sources: the Netherlands guides (reviewed 23 September 2026), the CTIS_NL template set and the naming guide. The package uses the recommendations until you answer.

## Questions for the user

- **D1 Language of forms and administrative documents.** The guides require Dutch only for participant-facing material. They say the Dutch R1 form is available in English and that the VGO comes in Dutch or English, but they set no language for K1, S1, the GDPR statement, the cover letter, CVs, declarations of interest or insurance documents. Options: (a) Dutch for the forms the assistant answers (K1, S1, GDPR statement), with third-party documents accepted in Dutch or English; (b) English for all non-participant documents; (c) Dutch for national-only trials and English for multinational ones. Recommendation: (a). The CTIS_NL template set and variable sheet target Dutch answers. `requirements.json` is set this way until you answer.
- **D2 VGO template.** Can you supply the official Site Suitability Declaration (VGO, Dutch or English)? Options: (a) supply it, and we convert it into `countries/NL/templates/part-ii` as a form: the assistant fills the trial fields, and the institution completes and signs the front sheet; (b) leave N1 as a document the site prepares entirely. Recommendation: (a). The EU site-suitability form in CTIS_NL is not the mandatory national template.
- **D3 Dutch P1 template.** Can you supply the national P1 compensation, funding and arrangements template? Options: (a) supply it, and we convert it as a form the assistant drafts; (b) the sponsor completes it outside TrialAgents and we only check it. Recommendation: (a). The EU CTAG template in CTIS_NL does not cover the Dutch publication and early-termination points.
- **D4 Dutch R1 form.** Can you supply the official national data-protection form dated 16 January 2026? Options: (a) supply it, and we convert it as a form the assistant drafts in English; (b) the sponsor completes it and we only check it. Recommendation: (a).
- **D5 S1 form.** The guide says the official Dutch biological-samples form "is aligned with" the EudraLex Volume 10 template, and the CTIS_NL S1 is that EudraLex form. Options: (a) use the shared S1, with the Dutch points in section 5 (`f03`); (b) supply the CCMO version and we compare it word for word. Recommendation: (a) now, and (b) if you have the CCMO file.
- **D6 Official CV template.** The guide strongly recommends "the official CV template" but does not say who publishes it. Options: (a) use the shared EU CV template as the official one; (b) supply a CCMO-specific CV template. Recommendation: (a). The CV template is not mandatory, and the investigator may also use their own dated CV, no more than two years old.
- **D7 Cover-letter template.** The cover letter is mandatory on the current European template, which is not in CTIS_NL. Options: (a) supply the template, and we convert it so the assistant drafts the letter (proposed MREC, combined-study details, reason for an IVO over 4,000 words); (b) the sponsor writes the letter and we only check it. Recommendation: (a). Until then, (b).
- **D8 Invoice-details template.** Options: (a) the sponsor's finance team completes the CCMO invoice-details template, and we only check that it is present; (b) supply it for conversion. Recommendation: (a). It holds only billing data.
- **D9 Template age scope.** The main and healthy templates say 18 or older and the adolescent template says 12-17, but CCMO sets 16 for own consent on the adult IVO and 12-15 for the adolescent form. Options: (a) keep the files as supplied, use the authority's bands in the plan, and tell Draft to apply NL-PT-main or NL-PT-healthy to 16- and 17-year-olds; (b) rename the files (`age under 12`, `age 12-15`) and ask for corrected template descriptions. Recommendation: (a) now. The rule is that templates stay as supplied, so (b) needs your approval.
- **D10 Resistance statement in the parents' consent.** CCMO requires the statement that consent for continued participation no longer applies if the minor resists. The template has only a softer line. Options: (a) add the required sentence to the consent declaration in Draft and record it as a justified addition; (b) ask for a corrected template. Recommendation: (a). It is mandatory.
- **D11 Secondary use: separate document or inside L1.** The templates keep optional future use in a separate document (NL-PT-secondary). The guide says the choices normally sit in the L1 consent form and allows a separate ICF when it improves clarity and stays linked. Options: (a) a separate `L1_SIS and ICF_secondary use_<population>_NL_nl`, cross-referenced from the main IVO; (b) put the Yes/No choices for data and bodily material into the main consent form. Recommendation: (a), because it matches the supplied templates and the guide permits it. Use (b) if the reviewing MREC prefers the IVO standard layout.
- **D12 Emergency: representative document.** Options: (a) a separate representative document built from NL-PT-legal-rep and adapted to deferred consent (what has already happened, what happens next, the remaining choices); (b) only the conditional representative block in NL-PT-emergency. Recommendation: (a). The guide requires full Dutch information and consent for the representative, and the emergency template says it is not a representative template.
- **D13 Witness route beyond adult patients.** The witness template covers a capable adult patient. The guides also allow the route for a capable representative who cannot write and for healthy volunteers. Options: (a) adapt NL-PT-witness for those cases, with every deviation visible; (b) supply dedicated templates. Recommendation: (a), only when the protocol plans it.
- **D14 Insurance exemption request.** For a qualifying low-intervention trial, the guide asks for a reasoned exemption request but names no title for it. Options: (a) `O1_Trial participant insurance exemption request_NL` under O1, in place of the certificate; (b) attach it to the cover letter. Recommendation: (a).
- **D15 Liability cover (O2).** Liability cover is mandatory, but a separate upload is needed only when the other documents do not already show it. Options: (a) always plan O2 as a Check item and upload proof unless it is clearly shown elsewhere; (b) plan O2 only on request. Recommendation: (a).
- **D16 Titles of Form-section documents.** The naming guide gives no CTCG code for documents outside Part II. Options: (a) `B1_Cover letter_<EU CT number>` (naming-guide example), `GDPR compliance statement` and `Invoice details_NL`; (b) the sponsor's own titles. Recommendation: (a).
- **D17 Mixed emergency populations.** The CCMO memorandum (2020) treats them as exceptional, while the newer EU Q&A (March 2026) allows them when the reasons are clear. Options: (a) allow them, with a compelling justification in the protocol and K1 section 6; (b) never plan them. Recommendation: (a), following the newer source.
- **D18 Official IVO v1.1 model.** Can you supply the official CCMO IVO v1.1 DOCX, which is dated 14 August 2026 and mandatory from 1 January 2027? Options: (a) supply it, so the standard text in our main and healthy templates can be checked word for word; (b) treat the supplied templates as IVO-conformant. Recommendation: (a). The IVO standard text must stay unchanged, and we cannot confirm it today.
- **D19 PIF transition.** Options: (a) always use the IVO for new adult documents; (b) allow the old PIF model for submissions made before 1 January 2027. Recommendation: (a). The IVO becomes mandatory in five weeks, and the supplied templates appear to follow its structure (D18).

## Missing

Documents the guides require that have no template in the supplied set:

- **N1 Site Suitability Declaration (VGO).** The official national form was not supplied (D2).
- **P1 national compensation, funding and arrangements template** (D3).
- **R1 official Dutch national data-protection form (16 January 2026)** (D4).
- **Cover letter on the current European template** (D7).
- **Dutch invoice-details template** (D8).
- **Information and consent for the legally designated representative after emergency enrolment.** There is no dedicated template; it is adapted from the legal-representative template (D12).
- **Reasoned insurance-exemption request** for low-intervention trials. It is sponsor-written and has no template (D14).
- **K2 recruitment material and L2 other material integral to consent.** These are free-form and drafted from the protocol.
- **O1 WMO certificate and O2 liability proof.** These are supplied by the insurer or guarantor.
- **M1 CV and M2 DoI content.** These are completed by each principal investigator.
- **Translation certificate.** It is needed only when non-Dutch enrolment is planned, and is due with the first Part II substantial modification. No template is needed.

Other gaps:

- **Official IVO v1.1 model (DOCX) and the CCMO manual for the minor templates.** They were not supplied, so the templates' standard text cannot be checked against them (D18).
- **CCMO version of the S1 form.** Only its alignment with EudraLex is stated (D5).
- **Language for non-participant documents.** The guides do not state it (D1).
- **Signature rules for P1, R1, S1, O1, O2 and the invoice details.** The guides state none; they are set to "no signature" with a note.
- **Texts cited but not available.** The guides only summarise the CCMO memorandum on deferred consent (7 April 2020), the CCMO code of conduct on objection by minors (2002) and the CCMO questions and answers on the IRP template.
- **Research-participation register for healthy volunteers.** The guide names no specific system. Only the obligation to explain the check is recorded.
- **Variable sheet file name.** It is `Variable Templates_NL_de.xlsx`, but its content targets Dutch. Confirm that this is the right sheet.
