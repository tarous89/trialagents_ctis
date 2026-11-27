# Hungary: decisions and gaps

Answer these together. Each line: question; options; recommendation.

## Questions for the user

- **D1 Language of forms and administrative documents.** The guides require Hungarian for participant-facing and recruitment material, the cover letter and the Part II document list, but state no language for K1, M1, M2, N1, P1 and P2. Options: (a) Hungarian for all; (b) English for administrative forms, Hungarian for the rest; (c) Hungarian, with English accepted for third-party documents as issued. Recommendation: (c). It matches the supplied CTIS_HU set and variable sheet, which target Hungarian answers. Confirm with NNGYK/ETT-KFEB before using (b). `requirements.json` is set to Hungarian until then.
- **D2 Hungary-adapted CV template.** Can you supply the ETT-KFEB CTEG CV template as modified for Hungary? Options: (a) supply it, and we convert it into `countries/HU/templates/part-ii` as a third-party template (the assistant fills trial fields; investigators complete the rest); (b) leave M1 as a document each investigator prepares on the national template. Recommendation: (a). The CTIS_HU M1 file is the generic EU form, which Hungary does not ask for.
- **D3 Hungary-modified site suitability form.** Can you supply the ETT-KFEB Site Suitability Form (November 2025 version)? Options: (a) supply it, and we convert it into a form where the assistant drafts the study-specific answers and the site completes its fields and signatures; (b) leave N1 to the site entirely. Recommendation: (a). The guide says not to substitute the generic EU form, so N1 has no template today.
- **D4 Patient emergency card: CTIS slot and title.** ETT-KFEB treats the card as an addendum to the main ICF and suggests the subject-information area. Options: (a) separate file `L2_Other subject information material_patient emergency card_HU_hu`; (b) appended to the main L1 file. Recommendation: (a). The main template says the card is a separate annex, and a separate file can be updated without reissuing the ICF.
- **D5 Patient emergency card template.** No template was supplied. Options: (a) draft the card from the content list recorded in the guides (ETT-KFEB requirements of 15 December 2015); (b) supply the sponsor's card or the ETT-KFEB guidance document so the card can be checked against it. Recommendation: (a) now and (b) when available.
- **D6 Protocol signature pages: title, slot and grouping.** The guides require pages signed by the PI and co-investigators but name no CTIS title. Options: (a) one file per site, `M3_Protocol signature pages_<site>`; (b) one file per investigator; (c) a trial-level file with all Hungarian signatures. Recommendation: (a). It keeps them under investigator suitability and puts no co-investigator names in titles. Plan a redacted version if the document is publishable.
- **D7 GCP evidence.** MedEthicsEU accepts a full GCP reference in the CV. Options: (a) rely on the CV and upload a certificate (`M2_GCP training_<investigator>_<site>`) only where the CV is incomplete; (b) always upload a separate certificate. Recommendation: (a).
- **D8 Co-investigator CV titles.** The naming guide allows personal names only for the principal investigator. Options: (a) `M1_CV_co-investigator <n>_<site>`; (b) the co-investigator's name in the title. Recommendation: (a).
- **D9 EU GDPR statement (R1) and samples form (S1).** The guides identify no separate Hungary data-protection or sample document; both topics go in the ICF. Options: (a) do not upload R1 or S1; (b) upload the shared R1 and S1 forms as well, consistent with the ICF. Recommendation: (a), unless CTIS validation or the sponsor's multinational practice needs a file in those placeholders; then (b).
- **D10 Hungarian cover letter.** The guides do not say whether it replaces or accompanies the application cover letter, or where it goes. Options: (a) a separate Hungarian letter `B1_Cover letter_<EU CT number>_HU_hu` with the document list; (b) a Hungarian section in the application cover letter. Recommendation: (a) provisionally; confirm the slot with ETT-KFEB. A template or agreed format would let the assistant draft it from the plan.
- **D11 Hungarian Part II document list.** Options: (a) a separate file `B1_Part II document list_<EU CT number>_HU_hu`; (b) inside the Hungarian cover letter. Recommendation: (a). The guide lists it as an item separate from the cover letter, for ETT-KFEB lay members.
- **D12 Own consent of minors aged 14 or older.** The 12-17 and genetic templates record the own consent of a minor aged 14 or older with the representative's consent in the parents document. The guides state this only for genetic consent of minors with limited capacity, and warn that the age-16 rule is not independent trial consent. Options: (a) keep the template logic, with legal confirmation per study; (b) use only representative consent plus assent. Recommendation: (a). The templates stay as supplied; confirm the legal basis with Hungarian counsel or ETT-KFEB.
- **D13 Children under 6.** No template. Options: (a) a short age-appropriate information sheet when the children can understand; (b) oral information only, documented, with representative consent. Recommendation: decide per study. The guide requires information appropriate to age and maturity when the minor can understand.
- **D14 Child and adolescent bands.** Hungary has no fixed assent bands. Options: (a) use the 6-11 and 12-17 templates as drafting bands; (b) split further (for example 12-14 and 15-17) for a broad cohort. Recommendation: (a) by default and (b) when the cohort's maturity range makes one document hard to defend. The 12-17 template notes that no 12-14/15-17 split is required.
- **D15 Genetic template instructions not in the guides.** These come from the template: genetic counselling before sampling, the Section 13(3) applicability check for incapable persons and the Section 10 destruction period of 30-45 days (Act XXI of 2008). Options: (a) apply them as supplied; (b) confirm them against the Act before use. Recommendation: (a), with (b) at legal review.
- **D16 Healthy-volunteer payment scope.** The healthy template also names interaction and bioequivalence studies; the guide (Bioethics Code) names Phase I and non-therapeutic PK or PD research. Options: (a) the guide's scope only; (b) include interaction and bioequivalence studies after confirmation. Recommendation: (a), which is what is recorded now.
- **D17 Signatures on K1, P1, P2, the cover letter and the document list.** The guides set no signature rule for these. Options: (a) no signature, completing only fields the form itself contains; (b) signed by the sponsor. Recommendation: (a), unless ETT-KFEB asks otherwise.
- **D18 Privacy appendix.** Options: (a) privacy integrated into every ICF; (b) a separate appendix with its own signature field, referenced by the ICF. Recommendation: (a). ETT-KFEB expects integration where possible.
- **D19 Small-gift list.** Options: (a) in P1 field f05 (type and value of non-monetary benefit); (b) a separate list document. Recommendation: (a). The EU form already asks for type and value; the guide gives no separate slot.
- **D20 Insurance files.** Options: (a) O1 = insurance confirmation or certificate, O2 = insurance policy; (b) both in O1. Recommendation: (a). MedEthicsEU lists both as the normal evidence.

## Missing

Documents the guides require that have no template in the supplied set:

- **HU-M1 Hungary-adapted CV (ETT-KFEB),** for the PI and co-investigators (D2).
- **HU-N1 Hungary-modified Site Suitability Form (ETT-KFEB, November 2025)** (D3).
- **HU-L-CARD patient emergency card** (D4, D5).
- **HU-COVER Hungarian cover letter and HU-DOC-LIST Hungarian Part II document list** (D10, D11).
- **HU-K2 recruitment material.** Free-form, drafted from the protocol.
- **HU-L-PRIVACY-APPENDIX,** only if a separate appendix is chosen (D18).
- **Information for children under 6** (D13).
- **Supplied by others:** HU-M-GCP GCP evidence, HU-M-PROTOCOL-SIGNATURE signed protocol pages, HU-O1/HU-O2 insurance evidence, HU-P2 site and investigator financial information.

Other gaps:

- **Fee and proof of payment.** The Hungary guides do not describe the NNGYK or ETT-KFEB fee route.
- **Language of administrative documents** other than the cover letter and document list (D1).
- **Signature rules** for K1, P1, P2, the cover letter and the document list (D17).
- **CTIS titles and slots** for the card, protocol signature pages, GCP evidence, cover letter and document list (D4, D6, D7, D10, D11).
- **Endpoint-related patient-facing documents** (questionnaires, diaries). The Hungary guides do not mention them or give them a Part II slot; only the general rule that participant-facing material is in Hungarian applies.
- **Official texts not available:** the ETT-KFEB Part II Q&A, GDPR recommendation (14 March 2023), patient-card requirements (15 December 2015), the MedEthicsEU overview v4.0 (Hungary pages 17-18) and the Bioethics Code. They are known only through the guides' summaries. So the exact NAIH contact wording, the approved legal-basis wording and the full card requirements cannot be checked.
- **Pregnancy follow-up duration.** There is no Hungary-specific duration; state the protocol's duration.
- **Legal-basis wording.** ETT-KFEB expects consent as the legal basis, but the sponsor's GDPR analysis must confirm it per study.
