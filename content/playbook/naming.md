# CTIS document naming

Source: the TrialAgents guide https://trialagents.com/ctis/ctis-document-naming-convention (reviewed 23 September 2026), which implements the CTCG Best Practice Guide: Naming of Documents in CTIS, version 3.0, 10 February 2026. Used when planning: every document in the plan gets its CTIS title.

## Structure

```
<section code>_<document type>_<subtype or identifying detail>_<country>_<language>_<special attribute>
```

- Start with the section prefix B–S. Use a clear document type; a recognised abbreviation is fine.
- Add subtype, country, language, site, product or organisation only when they distinguish the document. Use ISO codes for country and language.
- Mark special states when they apply: split-file number, public or redacted version, tracked changes, summary or extract of changes.
- Unique, self-explanatory, at most 100 characters.
- Version and date go in the CTIS metadata fields, never in the title.
- Personal names only where public disclosure allows: the principal investigator in investigator-suitability documents (CV, DoI). Do not extend this to other people.
- The CTIS title is what matters. The uploaded filename may follow the sponsor's system, but its base name must avoid `( ) / , . ; | [ ]` (the period before the extension is fine).
- Check national naming instructions in addition.

## Examples (replace capitals with the trial's details)

**Form:** `B1_Cover letter_EU CT number`, `B1_Cover letter_SM_EU CT number`

**Part I:**
`D1_Protocol_EU CT number`, `D1_Protocol synopsis_MS_EU CT number_LANGUAGE`, `D1_Master protocol_EU CT number_PROTOCOL ID`, `D2_Protocol modification nr_NUMBER_EU CT number`, `D3_DSMB Charter_EU CT number`, `D4_Patient-facing document_TYPE_ENG`, `E1_IB_PRODUCT`, `E2_SmPC_PRODUCT`, `F1_MIA_PRODUCT_MANUFACTURER`, `F2_QP GMP declaration_PRODUCT_MANUFACTURER`, `F3_Other statement or licence_PRODUCT_MANUFACTURER`, `G1_IMPD_Q_PRODUCT`, `G1_IMPD_E-S_PRODUCT`, `G1_Simplified IMPD_Q_PRODUCT`, `G1_Simplified IMPD_E-S_PRODUCT`, `H1_AxMPD_PRODUCT`, `I1_Scientific advice summary_ORGANISATION`, `I1_Scientific advice quality_ORGANISATION`, `I2_Paediatric committee opinion`, `I3_EMA PIP decision_AGENCY`, `J1_Label IMP_PRODUCT_LANGUAGE`, `J2_Label AxMP_PRODUCT_LANGUAGE`

**Part II:**
`K1_Recruitment arrangements`, `K2_Recruitment material_TYPE_COUNTRY_LANGUAGE`, `L1_SIS and ICF_TYPE_COUNTRY_LANGUAGE`, `L2_Other subject information material_TYPE_COUNTRY_LANGUAGE`, `M1_CV_INVESTIGATOR_SITE`, `M2_DoI_INVESTIGATOR_SITE`, `N1_Site suitability form_SITE`, `O1_Trial participant insurance certificate_COUNTRY`, `O2_Proof of coverage_SPONSOR OR SITE`, `P1_Compensation participants and financial arrangements_COUNTRY`, `R1_Compliance collection and use personal data_COUNTRY`, `R2_Patient-facing document_TYPE_COUNTRY_LANGUAGE`, `S1_Compliance collection use storage biological samples_COUNTRY`

C and Q are not used in the CTCG structure. Proof of fee payment and the GDPR statement in the Forms section use other CTIS upload locations.

## Special cases

- **Resubmission:** CTIS changes the last two digits of the EU trial number. Omitting them inside documents is accepted; a full original number already in a document need not be corrected until a later substantial modification. Decision letters keep the full number.
- **Article 11 workaround:** for a Member State receiving Part I only, upload the official multilingual placeholder PDF into every mandatory Part II slot with the title `Part_II_placeholder_document_Article_11_workaround`. This does not authorise the trial to start there; the real Part II follows later.

## Final naming check

- Correct B–S prefix and CTIS placeholder.
- Unique, self-explanatory title of at most 100 characters.
- Country, language, site, product or organisation only when needed.
- Version and date in metadata, not the title.
- Personal names only where disclosure permits.
- Clean, tracked, redacted/public and split variants clearly distinguished.
- Filename checked for forbidden characters.
- National naming instructions checked too.
