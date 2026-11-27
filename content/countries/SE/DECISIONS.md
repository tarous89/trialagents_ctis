# Sweden: decisions and gaps

Answer these together. Each line gives the question, the options and a recommendation. The package works with the recommended defaults in the meantime.

## Questions for the user

- **D1 Läkemedelsverket national Part II templates.** Can you supply Läkemedelsverket's Swedish templates? They cover the recruitment and consent procedure, `Prövarens CV`, `Deklaration av intressekonflikter`, `Prövningsställets lämplighet`, `Ersättning för deltagande i klinisk prövning` and `Följsamhet med regler för hantering av biologiska prov`. Options:
  - (a) supply them. We compare each with the shared EU form. Any that differ, or that give the form's fixed text in Swedish, are converted into `countries/SE/templates/part-ii` and bound in place of the EU form.
  - (b) keep the shared EU forms with Swedish answers. Their questions and headings stay in English.

  Recommendation: (a). Swedish law requires Annex I points 59 to 73 to be in Swedish, and option (b) leaves English fixed text. Until then (b) is bound, and the Check step flags item X.05.
- **D2 K1 when the protocol already contains the information.** The guide makes K1 mandatory "unless the required information is already in the protocol". Options: (a) always submit K1 on template v2.0, with references to protocol sections where they cover a point; (b) omit K1 when the protocol covers every item. Recommendation: (a). v2.0 applies to new Part II submissions from 1 September 2026, the template allows protocol references, and the Sweden-specific consent rules still have to be stated.
- **D3 Funding and investigator or site payments (P1).** The Sweden item covers trial financing, payments to participants, investigators and sites, and other sponsor-site arrangements. The EU P1 form covers participant compensation only. Options:
  - (a) a second Swedish P upload describing financing and investigator and site payments (proposed title `P1_Financial arrangements funding_SE_sv`), drafted from sponsor information;
  - (b) wait for the Läkemedelsverket template (D1) and check whether it covers this;
  - (c) rely on the site contract.

  Recommendation: (a) until (b) is known. The guide names P1 as the only CTIS location, so confirm the title.
- **D4 Fee document location and title.** The Sweden guide says "Q Proof of payment of fee or the corresponding CTIS area instructed by Läkemedelsverket". The CTCG naming guide does not use Q and places proof of fee in the Forms section. Options: (a) the CTIS area Läkemedelsverket currently instructs, with the provisional title `Proof of payment of fee_SE_sv`; (b) a Q upload. Recommendation: (a). Confirm Läkemedelsverket's current fee and invoicing instructions before submission.
- **D5 Swedish description of the insurance arrangement.** The guide asks for a Swedish description of the insurance arrangement and allows an English insurer certificate where accepted. Options: (a) the sponsor or insurer supplies the Swedish description; (b) TrialAgents drafts a short Swedish description from the insurer documents for the sponsor to confirm. Recommendation: (b). It stays a checked document, and nothing about the insurer is invented.
- **D6 When O2 is needed.** The guide says "O2 proof of other coverage where relevant". Options: (a) plan O2 only when there is a sponsor-specific clinical trial insurance, or another arrangement beyond the O1 documentation; (b) always plan O2. Recommendation: (a). Study fact `insurance.other_coverage`.
- **D7 Impartial-witness document.** The guide says to add the witness statement and signature fields to the appropriate Swedish ICF. Options: (a) use the witness template as a separate version of the adult patient ICF, and add its witness block to the healthy-volunteer or secondary-use document when those populations need it; (b) add a witness block to every ICF. Recommendation: (a). Witness fields appear only where the route can apply (QC item C8.06).
- **D8 Signatures on M1, M2 and N1.** The guides send the signature question to the current template's fields and execution instructions. Options:
  - (a) M1 and M2: no signature unless the Swedish template asks for one. N1: the issuing head of clinic or institution completes the template's signature or approval fields before upload.
  - (b) all three signed.

  Recommendation: (a), to be checked against the Swedish templates when they are supplied (D1).
- **D9 Children under 6.** There is no template, but the child must receive information adapted to age and maturity. Options: (a) a short, picture-based Swedish information sheet built from the 6-11 template, with deviations visible; (b) oral information only, documented by the investigator, with guardian consent. Recommendation: (a) when the child can understand some information, otherwise (b). Decide per study (`population.minors_under_6`).
- **D10 Minors aged 15 to 17 who do not understand the trial.** Guardian consent is the legal basis, and the minor is informed and involved according to ability. Options: (a) the 12-14 template adapted for this group, with deviations visible and a documented assessment of understanding; (b) the 15-17 template with the own-consent block replaced. Recommendation: (a). The 15-17 template itself says it must not be used without that assessment.
- **D11 Wording of the R1 national statement.** The guides require a statement on compliance with national requirements for personal data, but name no Swedish provision. Options: (a) a general statement of compliance with the Swedish national requirements; (b) a statement naming specific Swedish provisions supplied by the sponsor's data-protection officer. Recommendation: (a), unless (b) is supplied. We do not add legal references from memory.
- **D12 Documents after emergency enrolment of minors or of adults reached first through a representative.** The emergency template is for adults only. Options: (a) adapt the guardian and legal-representative templates for deferred information and consent to continued participation, with deviations visible; (b) supply dedicated templates. Recommendation: (a) now, (b) for the long term.
- **D13 Risk frequency categories.** The Sweden guides name none. Options: (a) the categories used in the IB or SmPC for each product; (b) a fixed Swedish scale chosen by the sponsor. Recommendation: (a), recorded as a source.
- **D14 Swedish protocol synopsis (Annex I point 24, Part I).** Options: (a) add it to the plan as a Part I document when Part I is in the plan; (b) record it as a Part I source to obtain. Recommendation: (a) if Part I is in the plan, otherwise (b).
- **D15 GDPR statement in the CTIS Form section.** Läkemedelsverket references the EU GDPR template for the Form section. Options: (a) the Form-section statement as Läkemedelsverket instructs, plus the Swedish R1 in Part II; (b) the Swedish R1 only. Recommendation: (a). The guide says the Form-section statement does not replace R1.

## Missing

Documents the guides require that have no template in the supplied set:

- **Läkemedelsverket Swedish national templates** for K1, M1, M2, N1, P1 and S1 (D1). The shared EU forms are bound until they are supplied.
- **Description of trial financing and investigator and site payments** for P1 (D3).
- **Fee-related document and invoicing information** (SE-FEE). This is an authority form completed by the sponsor; Läkemedelsverket's current instructions are needed (D4).
- **O1 documentation of participant protection, including the Swedish description of the arrangement, and O2 proof of other coverage.** Supplied by the insurer or sponsor (D5, D6).
- **K2 recruitment material and L2 other participant-facing material** (diaries, leaflets, cards, instructions, questionnaires). Free-form, drafted from the protocol.
- **Information for children under 6** (D9).
- **Information for 15-17-year-olds who do not understand the trial** (D10).
- **Deferred-consent documents for guardians and representatives after emergency enrolment** (D12).
- **Parallel biobank application and forms** (Regional Biobank Centre, outside CTIS) and the **Swedish protocol synopsis** (Part I). These are outside Part II.

Other gaps (not in the Sweden guides; not filled from memory):

- No minimum insurance amounts and no name of a Swedish participant-protection scheme. The guides state only that protection must match the nature and extent of the risk.
- No specific Swedish data-protection provisions for R1 (D11).
- No risk frequency categories (D13).
- No details of the Läkemedelsverket exception procedure for a non-physician consent taker, beyond "special reasons, justified in the protocol".
- No rule on translations for participants who do not understand Swedish. The guides require Swedish only.
- No national fee amount or payment route.
- The Swedish-language guides (`/ctis/sweden/sv`) were not read; they are outside the `/ctis/sweden/en/` scope.
- The variable sheet is named `_SE_de` though its content targets Swedish.
