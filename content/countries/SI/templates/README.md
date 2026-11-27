# Slovenia templates

Sources: the `CTIS_SI` folder supplied on 27 November 2026, and the Slovenia guides at https://trialagents.com/ctis/slovenia/en (the hub and its 10 linked pages, all reviewed 23 September 2026).

## Participant templates

None were supplied for Slovenia. `CTIS_SI` contains only the seven Part II DOCX files and the variable sheet, so `templates/participant` does not exist. `requirements.json` lists 17 planned template ids in `participant_templates_missing`, and every population set marks its documents `"template": "missing"` (DECISIONS.md D3). The guides also found no Slovenia-specific CTIS template for any population.

The KME RS one-page "Form of Voluntary and Informed Consent After Information" is a national reference only. It does not replace a trial-specific PIS and ICF, it has no witness block, and its statement on anonymised scientific use is narrow.

## Part II forms

Slovenia uses the shared EU forms in `content/eu/templates/part-ii`. The seven `CTIS_SI` DOCX files were compared with them paragraph by paragraph:

- M1, M2 and R1 have the same text.
- K1, N1, P1 and S1 have the same questions. The only differences are the EU boilerplate ("How to use this document", "This form may be used…", the endorsements), the pre-ticked or "N/A" example answers, and the "Click or tap here to enter text" and "[Enter text]" placeholders in the SI copies. The shared forms hold all of these as instructions.
- The SI S1 copy contains a malformed variable `{#kv104 === "true"}}` (one opening brace is missing). This has no effect, because the shared S1 is used.
- The variable sheet (`Variable Templates_SI_de.xlsx`) has 48 variables for K1 (22), S1 (21) and N1 (5). All of them target Slovenian, despite the `_de` in the file name, and none mentions Italian or Hungarian. This matches `answer_languages: ["sl"]`.

Nothing was converted into `countries/SI/templates/part-ii`. The national additions are in `requirements.json` as `national_fields`:

- **K1:** the Slovenian Member State fields v105, v108, v110, v114, v117 and v121.
- **N1:** the KME RS institutional-management confirmation in v125, and the authorised person's date and signature in `n1_issued_by`. The site fills these in.
- **R1:** the Slovenian content in `r1_the_sponsor_declares`: Slovenian law, controller arrangements and the legal basis for each purpose.

The P1 form covers participant compensation only. Trial financing and payments to sites therefore go in a separate document (`SI-P2-FINANCING`, DECISIONS.md D6).

## Conflicts resolved (newest official source wins)

| Topic | Older or other source | Followed |
|---|---|---|
| Recruitment and consent procedure template | Earlier EudraLex template versions | Version 2.0 for new Part II submissions from 1 September 2026, including additional Member States and Article 11 completions. |
| CV and DoI signatures | KME RS instructions (3 March 2020) and general signature practice | Commission Q&A, July 2026: no signature is required at the CTIS application. Slovenia has published no contrary rule, so no signature requirement was added. |
| Site suitability signature | The shared N1 form's curation note says to leave the signature block empty unless the Member State requires a signature | The Slovenia guide requires the date and signature of the person authorised to confirm the institution's suitability. `signature_at_submission: true`, and the site fills in the block. |
| Legal representative for an adult unable to consent | KME RS guidance (2020): consent of a "close person or legal representative" (Patients' Rights Act, Article 37) | CTR Article 31: a legally designated representative with documented legal authority. An informal family relationship does not replace it. |
| Minors' consent | Patients' Rights Act: from age 15 a child is presumed able to consent to healthcare | CTR Article 32: the legally designated representative consents for every minor under 18. KME RS adds that minors aged 15 or older give their own agreement. Both rules apply together. |
| Model consent form | KME RS one-page model consent form | A trial-specific CTR PIS and ICF. The model is a reference only. |
| Emergency procedure | KME RS general advance-approval process for urgent action (outside CTIS) | CTR Article 35 and the CTIS-approved pathway. No national waiver applies. |
| Secondary use | KME RS model statement allowing anonymised scientific use | A narrow statement only. Optional future use needs a separate, specific choice (Information Commissioner, EDPB Opinion 3/2019). |
| Trial consent and data processing | Treating trial consent as the GDPR basis | Information Commissioner: these are separate questions, and the controller documents the legal basis for each purpose. |
| Document names | Descriptive names on the Slovenia guide pages | CTCG v3.0 titles from the naming guide. Proposed titles are used where the naming guide gives none (P2 financing, the Slovenian cover letter, the fee proof). |

## Open points

- The Slovenian participant template set (17 planned templates) is missing (DECISIONS.md D3).
- K2, L2, O1, P2, the cover letter, the synopsis and the fee proof have no template. They are drafted from the sources or supplied by others.
- The current official contact details for KME RS and the national participant-rights contact points (JAZMP, KME RS, patient-rights representatives, the Human Rights Ombudsman, the Information Commissioner) are not stated in the guides. Take them from the official KME RS page when drafting.
- No Italian or Hungarian requirement was found for sites in the bilingual areas (DECISIONS.md D2).
