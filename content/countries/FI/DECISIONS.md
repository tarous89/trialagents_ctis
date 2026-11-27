# Finland: decisions and gaps

Answer these together. Each line: question; options; recommendation. The package works with the recommended defaults until they are answered.

## Questions for the user

- **D1 Answer language of the administrative forms.** In which language are M1, M2, N1, P1, R1, S1 and the other administrative documents answered? K1 and the consent procedure must be in Finnish and/or Swedish. Options: (a) the package language (Finnish in the fi package, Swedish in the sv package); (b) English, which Tukija accepts for administrative documents. Recommendation: (a). It matches the supplied fi and sv variable sheets and keeps one language per package. Use (b) for investigator-supplied CVs and declarations when the investigator prefers English.
- **D2 Which language packages go to CTIS.** Options: (a) submit the Finnish package; prepare Swedish participant documents from the approved Finnish versions for Swedish-speaking participants, without adding them to CTIS (Tukija allows this); (b) submit Finnish and Swedish participant documents together in the initial application; (c) submit a Swedish-only package, which "Finnish and/or Swedish" allows. Recommendation: (a). Use (b) only if the sponsor wants Tukija to review the Swedish text, and (c) only when no Finnish-speaking participants are planned. The guides give no rule by site region.
- **D3 Swedish participant templates.** None were supplied. Options: (a) supply a Swedish template set, to be split into `templates/participant` as `*_FI_sv.json`; (b) adapt each Swedish document from its approved Finnish counterpart (`based_on`), with qualified translation and the same version. Recommendation: (b) now and (a) when a Swedish set is available.
- **D4 Recruitment arrangements and consent procedure.** The Finland checklist asks for the EU procedure form under Recruitment arrangements (item 1) and under Subject information and informed consent procedure (item 4). Options: (a) one completed form, uploaded in both places with titles `K1_Recruitment arrangements_FI_<lang>` and `L1_Recruitment and informed consent procedure_FI_<lang>`; (b) upload it under K only; (c) split the form into a recruitment part (K) and a consent part (L). Recommendation: (a). It meets both items without diverging versions.
- **D5 Location of the GDPR information.** Options: (a) inside the information sheet (section 8 of the Finnish templates); (b) a separate privacy notice `L2_Other subject information material_privacy notice_FI_<lang>`; (c) an annex to the information sheet. Recommendation: (a). Use (b) or (c) only when the sheet would otherwise exceed the 10-page guidance.
- **D6 Site suitability per site or combined.** Finland permits one N1 document for all sites if they are clearly separated, and a sponsor contact person may make the statement. Options: (a) one N1 per site; (b) one N1 for all Finnish sites (`N1_Site suitability form_FI`). Recommendation: (a). Changes at one site then do not reopen the others. Use (b) for many similar sites.
- **D7 Placement of questionnaires and diaries.** Options: (a) Part I in the protocol language (Finnish, Swedish or English), as Tukija instructs (`D4_Patient-facing document_<type>_<lang>`); (b) Part II translations (`R2_...`), as the EC Q&A generally places them. Recommendation: (a), checking the current CTIS upload structure before filing.
- **D8 P titles.** Finland splits compensation, financing and other agreements. Options: (a) `P1_Compensation participants and financial arrangements_FI` (CTCG title) for the EU compensation form, `P2_Financial arrangements_FI` for financing and site payments, `P3_Other sponsor-site agreements_FI`; (b) the guide's descriptive names. Recommendation: (a).
- **D9 Who prepares the trial financing description (P2).** Options: (a) the sponsor supplies it and TrialAgents only checks it (current setting); (b) TrialAgents drafts it from sponsor-supplied figures (site costs, investigator fees in euros, other remuneration, recruitment resources). Recommendation: (b) when the sponsor provides the figures. This needs a decision on the document kind, since there is no template.
- **D10 Insurance description (O1).** The guide asks for a separate description of the insurance or other guarantee, and gives no minimum cover. Options: (a) the sponsor or insurer supplies it and TrialAgents checks it against the participant documents (current setting); (b) TrialAgents drafts the description from the insurer's documents. Recommendation: (a).
- **D11 Title of the invoicing details.** These go in the CTIS Proof of payment section, and the naming guide gives no prefix. Options: (a) structured data only, plus Fimea's customer-data form uploaded as `Proof of payment_Fimea invoicing details_FI` if a file is needed; (b) no title, data only. Recommendation: (a).
- **D12 Age bands and very young children.** The templates use 6-11, 12-14 and 15-17; Tukija sets no fixed bands and allows groups such as pre-school children. Options: (a) keep the template bands as drafting bands and justify them in K1; (b) define study-specific bands, adapting the nearest template. For under-6s, options: an age-appropriate information sheet (no template), or oral involvement only. Recommendation: (a), and decide under-6 handling per study.
- **D13 Guardian notification under the age-15 pathway.** The 15-17 template refers to the FINPEDMED FPM-E-005 notice, which the guides do not mention and which was not supplied. Options: (a) supply the FINPEDMED notice and plan it as a site document; (b) describe the notification only in K1 (v114), which the guide requires. Recommendation: (b) always, plus (a) if the sites use the FINPEDMED form.
- **D14 Data-only reuse outside the protocol.** Options: (a) a separate optional information and consent document adapted from the secondary-use template, not presented as a Tukija form; (b) a separate optional section in the main consent. Recommendation: (a). The guide requires a separate Article 28(2) choice and forbids presenting the sample template as a national form for data-only use.
- **D15 Pregnancy follow-up of a participant.** Options: (a) use the main consent's pregnancy section, and a separate pregnancy document only when follow-up goes beyond it; (b) always a separate document. Recommendation: (a), as the guide says.
- **D16 Easy-language version.** Tukija suggests one when the population needs it; no template exists. Options: (a) plan one for populations with limited reading ability or cognitive impairment; (b) none. Recommendation: decide per study, with (a) for adults with reduced capacity.
- **D17 Representative who cannot write.** The witness template is written for a participant. Options: (a) add the witness block to the representative document, with the deviation visible; (b) supply a dedicated template. Recommendation: (a).

## Missing

Documents the guides require that have no template in the supplied set:

- **Swedish participant templates: the whole set of 13** (main, healthy, guardians, 6-11, 12-14, 15-17, legal representative, limited capacity, emergency, witness, pregnancy, pregnant partner, future use). Recorded in `participant_templates_missing` and in each population set's `documents_sv` with `"template": "missing"` (D3).
- **K2 recruitment material.** Free-form, drafted from the protocol.
- **Separate privacy notice**, if chosen (D5).
- **Guardian notification for the age-15 independent pathway** (FINPEDMED FPM-E-005 or another approved procedure; D13).
- **Information for children under 6 or pre-school groups**, and **easy-language versions** (D12, D16).
- **Data-only future-use information and consent** (D14).
- **O1 insurance description, P2 financing description and P3 other agreements.** Supplied by the sponsor or insurer (D9, D10).
- **Fimea customer-data reporting form** for the invoicing details (D11).
- **Other patient-facing forms** (questionnaires, diaries). Sponsor instruments, filed in Part I (D7).

Other gaps:

- **The official Tukija templates** T/447/2026 (25 June 2026) and T/171/2025 were not supplied, so the "essentially as provided by Tukija" insurance wording in our templates cannot be checked word for word.
- **Minimum insurance cover, the fee amount and Fimea's invoicing address.** Not stated in the guides.
- **Radiation-protection authorisation documents.** The guides cover only the participant information on radiation exposure, and name no Part II document or Finnish authorisation route.
- **Data Protection Ombudsman contact details.** The guides require the complaint route but do not give the details.
- **Signature rule for the R1 sponsor name, role and date fields.** The guide says only that no separate signature is needed; the fields are filled from the sources or left as missing data.
- **The Finnish-language guides** (`/ctis/finland/fi`) were not read, because they are outside the `/ctis/finland/en/` scope.
- **The Swedish variable sheet** names its audience "Swedish regulatory body", and both sheets carry `_de` in the file name. This has no effect, because the forms are shared.
