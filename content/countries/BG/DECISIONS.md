# Bulgaria: decisions and gaps

Answer these together. Each item gives the question, the options and a recommendation. The package content works with the recommended defaults.

## Questions for the user

- **D1 Bulgaria site-suitability template.** Can you supply the BDA's Bulgaria-specific site-suitability declaration template?
  - Options: (a) supply it, and we convert it into `countries/BG/templates/part-ii` as a form: the assistant drafts the trial and site-description fields from sponsor and site information, and the head of the institution signs; (b) leave N1 as a document the site prepares entirely.
  - Recommendation: (a). The EU form in `CTIS_BG` is not the national template, so N1 has no template today.
- **D2 K1 when recruitment is in the protocol.** The BDA requires K1 when recruitment is not fully described in the protocol.
  - Options: (a) always submit K1 on template v2.0; (b) submit it only when the protocol does not fully describe recruitment.
  - Recommendation: (a). Template v2.0 also carries the informed-consent procedure and the minors, incapacity, witness and emergency sections, where the Bulgarian rules are stated.
- **D3 English version of participant documents.** The BDA requires the corresponding Bulgaria version in English.
  - Options: (a) a separate English file per document (`…_BG_en`), translated from the approved Bulgarian version and run through Source QC, Checklist and Style; (b) one bilingual file per document.
  - Recommendation: (a). It keeps the CTIS titles distinct, and each version can be checked against the other. Confirm the CTIS slot for the English files, since the guides do not name one.
- **D4 English version of other information material (L2) and recruitment material (K2).** The guides require the English version only for the PIS and ICF set.
  - Options: (a) Bulgarian only; (b) also an English version.
  - Recommendation: (a) for K2, since the BDA asks only for Bulgarian recruitment material. For L2: (a), unless the material forms part of the consent package, then (b).
- **D5 Witness for a legal representative or parent who cannot read.** Bulgarian GCP requires an independent witness when the participant or the legal representative cannot read. The supplied witness template covers only a capable adult participant, and the legal-representative, parents and age-band templates have no witness block.
  - Options: (a) add a witness attestation block, taken from the witness template, to that pathway's document when the situation is foreseeable, and record the deviation as a finding; (b) supply dedicated templates.
  - Recommendation: (a).
- **D6 Planned trial-site list: CTIS slot and title.** The guide requires a Bulgarian list but names no slot.
  - Options: (a) `N2_List of trial sites and principal investigators_BG` under site suitability; (b) attached to the cover letter.
  - Recommendation: (a), which matches the Czech package. Include the English site name, address and PI name as extra columns in the same list.
- **D7 P2 granularity.**
  - Options: (a) one trial-level financing description `P2_Financial arrangements_BG`; (b) the draft sponsor-investigator and sponsor-institution contracts, one per site (`P2_Financial arrangements_<site>`); (c) both.
  - Recommendation: (a). Use (c) when the contracts carry payment terms not in the description, since the guide allows the information to be "contained in" the draft contracts.
- **D8 National cover letter and title codes.**
  - Options for the national cover letter: (a) a separate Bulgarian national cover letter `B1_Cover letter_<EU CT number>_BG_bg` in the Forms section; (b) a Bulgaria section in the main cover letter.
  - Recommendation for the cover letter: (a), because the guide says "the national cover letter should be in Bulgarian".
  - Options for the CTIS titles: country and language codes only where they distinguish the document (naming guide), or `_BG_bg` on every title.
  - Recommendation for the titles: the naming guide. K1, M1, M2 and N1 are therefore without codes, since Part II documents are per Member State.
- **D9 Children under 6.** There is no age-band template.
  - Options: (a) prepare a short age-appropriate information sheet per study (no template); (b) document only the oral information given by a physician experienced with children, with both parents' consent.
  - Recommendation: decide per study. Article 97 requires understandable information for every child but no separate document.
- **D10 Risk frequency categories.** The Bulgaria guides name none.
  - Options: (a) use the IB or SmPC categories for each product; (b) supply a national convention.
  - Recommendation: (a), recorded as a source.
- **D11 Form answer language for P1, R1 and S1.** K1 must be Bulgarian. P1, R1 and S1 may be Bulgarian and/or English.
  - Options: (a) Bulgarian; (b) English.
  - Recommendation: (a), matching the supplied Bulgarian variable sheet and file names (`answer_languages: ["bg"]`).
- **D12 Insurance split.** The guide asks for "insurance documentation" (one item).
  - Options: (a) everything under O1 `O1_Trial participant insurance certificate_BG`; (b) certificate in O1 and policy terms in O2 `O2_Proof of coverage_<sponsor>`.
  - Recommendation: (a), unless the insurer issues separate policy terms, then (b).
- **D13 Pregnant partner English version.** The guide recommends, without a named rule, a Bulgarian partner document with an English Bulgaria version.
  - Options: (a) both versions; (b) Bulgarian only.
  - Recommendation: (a).

## Missing

Documents the guides require that have no template in the supplied set:

- **N1 Bulgaria site-suitability declaration (BDA national template).** It was not supplied, and the EU form in `CTIS_BG` does not replace it (D1).
- **English templates** for the required Bulgaria English versions of participant documents. None were supplied, so the English versions are translations (D3).
- **Witness block for a legal representative or parent who cannot read** (D5).
- **Under-6 information** (D9).
- **K2 recruitment material, L2 other information, the planned-site list, P2 financing description or contracts, O1 insurance documentation and the national cover letter.** These are free-form or supplied by the sponsor, site or insurer, so no template is expected.

Other gaps (not in the Bulgaria guides; not filled from memory):

- Fee amount and payment route for Bulgaria (`outside_part_ii` BG-FEE).
- Minimum insurance sums. The guides cite Article 91 but give no amounts.
- Risk frequency categories (D10).
- Endpoint-related patient-facing documents (questionnaires, diaries). The Bulgaria guides do not say whether Bulgarian versions go in Part II. They are left out of the document list.
- Radiation-protection documents, low-intervention insurance exceptions and electronic consent: the guides are silent.
- The BDA's national instructions for clean and tracked-change versions in substantial modifications are referenced but not described.
- The BDA document list PDF (`bda.bg`, 10 July 2024) and the Bulgarian-language guides (`/ctis/bulgaria/bg`) were not read, because they are outside the `/ctis/bulgaria/en/` scope.
- The variable sheet is named `_BG_de` although its content is Bulgarian (file-name slip).
