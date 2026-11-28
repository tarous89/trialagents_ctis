---
id: Part-I
name: Part I planning checklist (all member states)
part: I
country: EU
version: '1.0'
effective: '2026-11-28'
use_when: Part I documents of any CTIS application, and the national-language versions of Part I documents some member states require.
reference: https://health.ec.europa.eu/medicinal-products/eudralex/eudralex-volume-10_en
checked: '2026-11-28'
naming: 'CTCG best practice guide v3.0 titles (see the naming instructions); filename <study code>_<code>[_<variant>]_EU_<language>.'
documents:
- code: B1_cover-letter
  name: Cover letter
  required: always
  languages: [en]
  provided_by: sponsor
  national_notes: 'CTIS title: B1_Cover letter_<EU CT number> (B1_Cover letter_SM_<EU CT number> for a substantial modification). Uploaded in the Form section. Not published. Some member states also need it in their language (see the national-language row).'
- code: B1_cover-letter
  name: Cover letter in a national language
  variants: [BG, HR, GR, HU, SK, SI]
  required: conditional
  condition: The plan includes Bulgaria, Croatia, Greece, Hungary, Slovakia or Slovenia (one per member state; Q&A v7.4 Annex II).
  provided_by: either
  national_notes: 'Variant = member state code. Adapted from the English cover letter (based_on), translated, keeping its content.'
- code: D1_protocol
  name: Protocol
  required: always
  languages: [en]
  provided_by: sponsor
  national_notes: 'CTIS title: D1_Protocol_<EU CT number> (D1_Master protocol_<EU CT number>_<protocol ID> for a master protocol). Published: needs a redacted version for publication. Greece also needs the protocol in Greek.'
- code: D1_protocol-synopsis
  name: Protocol synopsis
  required: always
  languages: [en]
  provided_by: sponsor
  national_notes: 'CTIS title: D1_Protocol synopsis_<EU CT number>. Published: needs a redacted version for publication. Must match the protocol version submitted.'
- code: D1_protocol-synopsis
  name: Protocol synopsis in a national language
  variants: [AT, BE, BG, HR, CY, CZ, FR, GR, HU, IS, IT, LT, NL, NO, PL, PT, RO, SK, SI, ES, SE]
  required: conditional
  condition: 'The plan includes one of these member states (Q&A v7.4 Annex II). Belgium: in each of French, Dutch and German. Czechia and Hungary: a scientific summary of the protocol in the national language. Not needed for DK, EE, FI, DE, IE, LV, LU.'
  provided_by: either
  national_notes: 'CTIS title: D1_Protocol synopsis_<MS>_<EU CT number>_<LANGUAGE>. Variant = member state code. Adapted from the approved English synopsis (based_on) unless the sponsor supplies it. Same content and version as the English synopsis.'
- code: D2_protocol-modification
  name: Protocol modification documents
  required: conditional
  condition: Substantial modification of the protocol.
  submission_types: [substantial-modification]
  provided_by: sponsor
  national_notes: 'CTIS title: D2_Protocol modification nr_<NUMBER>_<EU CT number>. Clean and tracked versions of the changed protocol go in D1.'
- code: D3_DSMB-charter
  name: Data safety monitoring committee charter
  required: conditional
  condition: The protocol has a data safety monitoring board or committee.
  provided_by: sponsor
  national_notes: 'CTIS title: D3_DSMB Charter_<EU CT number>. Not published; keep members'' personal data to what is necessary.'
- code: D4_patient-facing-document
  name: Patient-facing document for a primary or secondary endpoint
  variants: [questionnaire, diary, scale, card, other]
  required: conditional
  condition: 'The protocol''s primary or secondary endpoints use a document the participant completes or reads: questionnaires, diaries, rating scales, patient cards (Q&A v7.4 §1.24). Documents for other endpoints are not submitted; recruitment material is Part II (K), and the information sheet and consent form are Part II (L).'
  languages: [en]
  provided_by: sponsor
  national_notes: 'CTIS title: D4_Patient-facing document_<TYPE>_ENG. In English in Part I (or the national language in a mononational trial). Published with the protocol: needs a redacted version for publication. Translations go in Part II of each member state that requires them (R2_Patient-facing document_<TYPE>_<COUNTRY>_<LANGUAGE>), not here; they are not published.'
- code: E1_IB
  name: Investigator's brochure
  required: conditional
  condition: For every investigational medicinal product without an SmPC used within its authorisation.
  languages: [en]
  provided_by: sponsor
  national_notes: 'CTIS title: E1_IB_<PRODUCT>. English is accepted in every member state. Not published.'
- code: E2_SmPC
  name: Summary of product characteristics
  required: conditional
  condition: An authorised product whose SmPC serves as reference safety information instead of an IB.
  provided_by: sponsor
  national_notes: 'CTIS title: E2_SmPC_<PRODUCT>. Published (a version for publication is uploaded; personal data is not expected).'
- code: F1_MIA
  name: Manufacturing and import authorisation
  required: conditional
  condition: 'CTR Annex I section F: the investigational product is not authorised in the Union, or is modified, and is manufactured or imported in the Union.'
  languages: [en]
  provided_by: sponsor
  national_notes: 'CTIS title: F1_MIA_<PRODUCT>_<MANUFACTURER>. Not published.'
- code: F2_QP-GMP-declaration
  name: QP declaration on GMP
  required: conditional
  condition: 'CTR Annex I section F: the investigational product is manufactured outside the Union (certification by the qualified person that manufacturing complies with GMP at least equivalent to EU GMP).'
  languages: [en]
  provided_by: sponsor
  national_notes: 'CTIS title: F2_QP GMP declaration_<PRODUCT>_<MANUFACTURER>. Not published.'
- code: F3_other-statement
  name: Other GMP statement or licence
  required: optional
  provided_by: sponsor
  national_notes: 'CTIS title: F3_Other statement or licence_<PRODUCT>_<MANUFACTURER>.'
- code: G1_IMPD-Q
  name: IMPD – quality (full or simplified)
  required: conditional
  condition: Every investigational medicinal product (and placebo, quality only), unless a justification for not submitting it applies.
  languages: [en]
  provided_by: sponsor
  national_notes: 'CTIS title: G1_IMPD_Q_<PRODUCT> or G1_Simplified IMPD_Q_<PRODUCT>. Not published.'
- code: G1_IMPD-SE
  name: IMPD – safety and efficacy (full or simplified)
  required: conditional
  condition: Every investigational medicinal product without an IB covering the data, unless a simplified IMPD or a justification applies.
  languages: [en]
  provided_by: sponsor
  national_notes: 'CTIS title: G1_IMPD_E-S_<PRODUCT> or G1_Simplified IMPD_E-S_<PRODUCT>. Not published.'
- code: H1_AxMPD
  name: Auxiliary medicinal product dossier
  required: conditional
  condition: An auxiliary medicinal product that is not authorised in the Union, or is used outside its authorisation.
  languages: [en]
  provided_by: sponsor
  national_notes: 'CTIS title: H1_AxMPD_<PRODUCT>. Not published.'
- code: I1_scientific-advice
  name: Scientific advice summary
  required: conditional
  condition: Scientific advice was given on the trial by EMA or a national authority.
  languages: [en]
  provided_by: sponsor
  national_notes: 'CTIS title: I1_Scientific advice summary_<ORGANISATION> (I1_Scientific advice quality_<ORGANISATION> for quality advice). Not published.'
- code: I2_PIP
  name: Paediatric investigation plan opinion or decision
  required: conditional
  condition: The trial is part of an agreed paediatric investigation plan.
  languages: [en]
  provided_by: sponsor
  national_notes: 'CTIS title: I2_Paediatric committee opinion or I3_EMA PIP decision_<AGENCY>. Not published.'
- code: J1_label-IMP
  name: Labelling of the investigational medicinal product
  required: always
  languages: [en]
  provided_by: sponsor
  national_notes: 'CTIS title: J1_Label IMP_<PRODUCT>_<LANGUAGE>. Content of the labelling per CTR Annex VI. Not published. National-language versions: see the next row.'
- code: J1_label-IMP
  name: Labelling of the investigational medicinal product in a national language
  variants: [AT, BE, BG, HR, CY, CZ, DK, EE, FI, FR, DE, GR, HU, IS, IT, LV, LT, LU, NL, NO, PL, PT, RO, SK, SI, ES, SE]
  required: conditional
  condition: 'Every member state in the plan except Ireland (Q&A v7.4 Annex II). Finland: Finnish, and Swedish too if Swedish-speaking participants are recruited. Belgium: French, Dutch and German. Luxembourg: at least two national languages. English-only labelling for a product administered by a physician or qualified healthcare personnel according to the protocol (not handed to the participant) is accepted in HR, EE, FR, HU, IS, LV, LT, NL, NO, RO, SI, ES and SE; in AT where they are healthcare professionals with sufficient English, stated in the protocol; in BE, BG and DK when the product is also administered at the trial site; BG, DE and GR require the physician to be a member of the investigating team; CY, GR and PT decide case by case outside public health emergencies; CZ, IT and LU accept it only in emergencies; FI, PL and SK always need their language.'
  provided_by: either
  national_notes: 'CTIS title: J1_Label IMP_<PRODUCT>_<LANGUAGE>. Variant = member state code. Adapted from the English label (based_on) unless the sponsor supplies it; Annex VI content unchanged.'
- code: J2_label-AxMP
  name: Labelling of the auxiliary medicinal product
  required: conditional
  condition: An auxiliary medicinal product that is not authorised, or whose labelling differs from its authorisation (CTR Annex VI).
  provided_by: sponsor
  national_notes: 'CTIS title: J2_Label AxMP_<PRODUCT>_<LANGUAGE>. National languages as for J1.'
---
Part I documents usually exist long before the CTIS submission: the sponsor writes them. TrialAgents does not draft them. It lists them from the protocol or synopsis, checks that each one is ready to submit, and prepares the redacted version of the documents CTIS publishes.

**Supplied documents.** Mark every document the sponsor provides as `supplied: true` in the plan. Its first step (Draft) records the sponsor's file ("Supplied"): the user uploads it in the workspace, gives it to the assistant, or confirms it is held outside TrialAgents CTIS. Its steps are normally Draft (Supplied) and Checklist; mark Source QC and Style not applicable. Supplied documents never block other documents.

**Generated documents.** National-language versions (a synopsis, a cover letter or a label in a member state's language) can be prepared by the assistant from the approved English document (`based_on`), with all steps: Draft, Source QC, Checklist where useful, and Style.

**Languages (Q&A v7.4 Annex II).** Every member state accepts the IB, GMP documents, IMPD, AxMPD, scientific advice and PIP documents in English, and patient-facing documents in English in Part I. A mononational trial may use the national language instead. Where a national language is needed, an English original may be submitted as well. National-language CTIS fields (not documents): AT (scientific and public title in German), BG, HR, FR (text fields made public), GR, HU, NL, PL, PT, SK, ES.

**Publication (EMA/194159/2023 Annex I v2.2).** In Part I, the protocol (with its patient-facing documents) and the synopsis, and the SmPC, are uploaded in two versions: for publication (redacted) and not for publication. All other Part I documents are not published. Remove the author's personal data from every file's properties before upload.
