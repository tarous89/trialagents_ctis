# Greece: decisions and gaps

Answer these together. Each item gives the question, the options and a recommendation. The package content already uses the recommended defaults.

## Questions for the user

- **D1 Country code in CTIS titles.** The templates use GR, which is the ISO 3166 code. CTIS and the EU identify Greece as EL. The naming guide asks for "appropriate ISO codes" and gives no Greece example.
  - Options: (a) EL, for example `O1_Trial participant insurance certificate_EL`, `L1_SIS and ICF_<population>_EL_el`; (b) GR.
  - Recommendation: (a), so titles match the Member State code shown in CTIS. File and folder names keep GR. `requirements.json` uses EL.
- **D2 Answer language of the Part II forms (K1, N1, P1, R1, S1; M1/M2 trial fields).**
  - Options: (a) English, as the Greece guide recommends; (b) Greek, as the supplied `_GR_el` forms and the Greek variable sheet assume.
  - Recommendation: (a). If EOF requests one, an official Greek translation can follow.
- **D3 Emergency-representative form.** The guide makes a separate Greek emergency-representative information and consent form mandatory. The emergency template addresses only the participant and has an optional representative signature block.
  - Options: (a) a separate document drafted from the emergency template, addressed to the representative, with every deviation visible (current setting); (b) use the emergency template alone, with its representative block; (c) supply a dedicated template.
  - Recommendation: (a) now and (c) for the long term. (b) does not give the representative their own information form.
- **D4 Format of optional choices.** The templates forbid YES/NO boxes and initials and require a separate dated signature per optional decision. The guide asks for "a clear yes or no choice" per separable activity.
  - Options: (a) one signature block per optional activity, with wording that not signing means no and does not affect the main trial (current setting); (b) two statements per activity ("I agree" / "I do not agree"), each with a dated signature line; (c) tick boxes (base style).
  - Recommendation: (a). (c) contradicts the templates.
- **D5 Paediatric age bands.** The supplied templates cover 6-9, 10-14 and 15-17. The parents template cites an NEC split into 2 or 3 maturity bands, with indicative ranges 10-12, 13-15 and 16-18.
  - Options: (a) the two supplied assent bands (10-14, 15-17); (b) three bands per the NEC indicative ranges, which needs an adapted template.
  - Recommendation: (a). Use (b) only if the NEC asks for it or the enrolled age range and maturity spread make two forms unclear.
- **D6 Children under 10.**
  - Options: (a) the 6-9 information sheet for enrolled children who can understand one, and age-adapted oral information under 6; (b) oral information only, with parental consent.
  - Recommendation: (a). The guide calls a child-facing sheet mandatory whenever the population can understand one.
- **D7 Phase I Article 7 declaration placement and title.** The checklist names the declaration under both investigator (M) and facility (N) suitability. The naming guide gives no title for it.
  - Options: (a) the same signed declaration under M (`M2_Phase I site and team declaration_<investigator>_<site>`) and, with the equipment and emergency-capability evidence, under N (`N<next number>_Phase I declaration and equipment evidence_<site>`) (current setting); (b) upload it once, under M only.
  - Recommendation: (a).
- **D8 ALS certificates.**
  - Options: (a) one combined upload per site, `M2_ALS certificates_<site>` (current setting); (b) one upload per person.
  - Recommendation: (a). It keeps team members' names out of CTIS titles, as the naming guide requires.
- **D9 P1 when no payment or reimbursement is offered.** P1 is conditional in Greece.
  - Options: (a) omit P1 and state in the ICF that there is no payment and no cost; (b) upload P1 with "No" ticked and an explanation.
  - Recommendation: (a), following the guide, unless the National Ethics Committee asks for (b).
- **D10 Financial annexes (P2, Government Gazette B 230/2026).**
  - Options: (a) provide the applicable annexes (per-participant fee analysis, project-team list, project budget) for each site, unsigned; (b) provide no financial details.
  - Recommendation: (a). The hub lists financial information "where applicable" among the NEC's expectations. Supply the annex forms and confirm their language; the guides do not state it.
- **D11 Translations for participants who do not understand Greek.**
  - Options: (a) a qualified or certified translator translates from the approved Greek version, and TrialAgents only checks (current setting); (b) TrialAgents prepares a draft translation for the translator to certify.
  - Recommendation: (a). Use (b) only if the user's translator accepts drafts.
- **D12 Signatures on M1 CV and M2 DoI.**
  - Options: (a) no signature unless the template instructions or the NEC explicitly ask for one; (b) always signed.
  - Recommendation: (a). The Greek Q&A warns against adding signatures by habit.
- **D13 R1 sponsor fields.** The guides set no signature rule for R1.
  - Options: (a) complete the form's name, role and date fields for the sponsor's responsible person from the sponsor's details, with no signature; (b) signed by the sponsor.
  - Recommendation: (a).
- **D14 Emergency source-document worksheet** (recommended, not a CTIS document).
  - Options: (a) prepare a blank Greek worksheet for the site's conduct records; (b) leave it to the site.
  - Recommendation: (a) when emergency enrolment is planned. No template exists.
- **D15 Electronic or remote consent.** The Greek guidance describes in-person paper consent.
  - Options: (a) paper only; (b) another approach only where the NEC expressly accepts it for the trial, described in K1.
  - Recommendation: (a) unless the sponsor has that acceptance.
- **D16 NEC 2025 decisions cited only in the templates.** These are the parents template's representative-status wording with supporting documents, and the secondary-use template's rule that future use needs an amendment or a new protocol.
  - Options: (a) keep them as supplied; (b) confirm them against the NEC publications first.
  - Recommendation: (a) now, and (b) before first use. The Greece guides do not mention either decision.
- **D17 Risk frequency categories.** The Greece guides give none.
  - Options: (a) the categories of the IB or SmPC for each product; (b) fixed categories chosen by the sponsor.
  - Recommendation: (a), recorded as a source.

## Missing

Documents the guides require that have no template in `CTIS_GR`:

- **Emergency-representative information and consent form** (mandatory when emergency enrolment applies; D3).
- **Government Gazette B 230/22.01.2026 financial annexes** (GR-P2): per-participant fee analysis, project-team list and project budget.
- **Phase I principal-investigator declaration** under Article 7 of Government Gazette B 4131/2016 (GR-M-PHASE1-DECL, GR-N-PHASE1). The guides give no wording and no model.
- **K2 recruitment material and L2 other information material.** These are free-form and drafted from the protocol.
- **Certified translations** (GR-L1-TRANSLATION), the **ALS certificates**, the **Phase I equipment evidence** and the **insurer-executed O1 certificate**. These are supplied by others.
- **Emergency source-document worksheet.** It is recommended, not a CTIS upload (D14).
- **Information for children under 6.** There is no template; such children are informed orally according to understanding (D6).

Other gaps (not in the Greece guides; not filled from memory):

- The national fee amount and payment route.
- Minimum insurance amounts, the exact wording of the required pregnancy clause, and any low-intervention insurance exception. The guides cite JMD G5a/59676 but give no figures.
- Signature rules for K1, P1, R1 and S1. The guides are silent; none is set (D13).
- Language of the Phase I declaration, the ALS certificates and the P2 annexes. Only "most administrative documents can be in English" is stated.
- Whether Greek versions of Part I endpoint questionnaires and PRO instruments are needed at Greek sites. The guide says only that they belong in Part I.
- Radiation-protection documents and site-specific national authorisations: the Greece guides are silent.
- Risk frequency categories (D17).
- The Greek-language guides (`/ctis/greece/el`) were not read, because they fall outside the `/ctis/greece/en/` scope.
- The variable sheet file is named `_GR_de` although its content is Greek.
