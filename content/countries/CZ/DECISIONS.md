# Czechia: decisions and gaps

Answer these together. Each line gives the question, the options and a recommendation. The package can be used with the recommended defaults, which `requirements.json` already applies.

## Questions for the user

- **D1 K1 template.** Which recruitment and informed-consent form goes into CTIS for Czechia? The EU template v2.0 applies to new Part II submissions from 1 September 2026, but SÚKL KLH-CTIS-01 Version 3 (28 January 2026) still lists its mandatory Template No. 1.
  - Options: (a) supply the current SÚKL Template No. 1, so it can be compared with the EU v2.0 form and any missing Czech field added; (b) upload SÚKL Template No. 1 alone, converted as a Czech form; (c) EU v2.0 with the Czech notes only.
  - Recommendation: (a). Also check the current SÚKL page before filing, because the guide says to check both forms together and include every Czech national field.
- **D2 Languages not stated.** Should everything be in Czech?
  - What the guides set: Template No. 1 may be in Czech or English, and insurance documents in Czech or bilingual.
  - What the guides leave open: no language for Templates No. 4, 5 and 7, the funding description, the document list or the post-trial compensation statement.
  - Options: (a) Czech for all of them, and Czech K1 answers; (b) English where SÚKL does not require Czech.
  - Recommendation: (a). This matches the Czech variable sheet, the Czech compensation information and the Czech CV and declaration of interest. `requirements.json` is set to Czech.
- **D3 SÚKL Templates No. 2 to 7.** Can you supply the DOCX annexes to KLH-CTIS-01 Version 3 (28 January 2026)?
  - Options: (a) supply them and we convert them into `countries/CZ/templates/part-ii`:
    - CV (No. 2) and declaration of interest (No. 3): the assistant fills the trial fields and the investigator completes and signs the rest;
    - site suitability (No. 4): the site fields stay empty for the site;
    - data protection (No. 5), compensation (No. 6) and samples (No. 7): drafted for upload.

    (b) the investigator, site or sponsor completes the SÚKL templates directly and TrialAgents only checks them; (c) use the EU forms.
  - Recommendation: (a). Option (c) does not meet SÚKL's mandatory-template rule.
  - The signature rules for Templates No. 6 and 7 can only be confirmed from the templates themselves.
- **D4 Document list.** Where does the machine-readable list of documents go?
  - Options: (a) inside the cover letter (`B1_Cover letter_<EU CT number>`), which SÚKL permits; (b) a separate file, with a title to agree, for example `K3_List of documents_CZ`.
  - Recommendation: (a).
- **D5 Separate GCP certificate.** If a separate certificate is submitted rather than GCP details in the CV, how is it filed?
  - Options: (a) a separate upload, `M2_GCP training_<investigator>_<site>`, as for Germany and Austria; (b) attached to the CV in M1.
  - Recommendation: (a).
- **D6 Site list and N documents.** The guide gives no CTIS slot or title for the Czech list of sites and principal investigators, the Regional Authority evidence or the SÚKL GCP certificate.
  - Options: (a) `N2_List of trial sites and principal investigators_CZ`, then `N<next number>_Healthcare facility evidence_<site>` and `N<next number>_SÚKL GCP certificate_<site>`; (b) put the site list under M, as `M3_List of sites and principal investigators_CZ`.
  - Recommendation: (a), unless the current KLH-CTIS-01 names a category.
- **D7 Titles and authorship of sponsor statements.** The naming guide covers neither the post-trial damage compensation statement, the funding description nor the fee proof.
  - Proposed titles: `O3_Sponsor statement post-trial damage compensation_CZ`, `P2_Funding of the trial_CZ` and `Proof of payment_Part II fee_CZ`.
  - Should TrialAgents draft the two statements (O3 and P2)? Options: (a) the sponsor supplies them and TrialAgents checks them (current setting); (b) TrialAgents drafts them, which needs a template or a short free-text form.
  - Recommendation: the proposed titles, with (a) until you want (b).
- **D8 Other participant materials.** Where do diaries, cards, questionnaires, instructions for use and e-questionnaire screenshots go in CTIS? The guide names no category.
  - Options: (a) all under `L2_Other subject information material_<type>_CZ_cs`; (b) endpoint questionnaires as `R2_Patient-facing document_<type>_CZ_cs` and the rest under L2.
  - Recommendation: (a), because the Czechia guide treats them all as participant materials.
  - Note: the Part II checklist says the PIS/ICF goes under the SÚKL category "All Documents". Confirm that this means the L1 slot.
- **D9 Medical-device documents.** Which CTIS slot and title apply to conformity documents and national declarations? The guide sends you to KLH-CTIS-01.
  - Options: (a) take them from the current KLH-CTIS-01 text; (b) use `Medical device documentation_<device>_CZ` as a placeholder.
  - Recommendation: (a). Use (b) only until (a) is checked.
- **D10 Youngest children.** The rule is that a signature under age 11 is not mandatory. Two questions:
  - Should an 11-year-old sign the 6-11 document? Options: (a) yes, when able; (b) optional, as for younger children. Recommendation: (a) until confirmed, because the guide gives no rule for age 11 itself.
  - What about children under 6? Options: (a) document the oral information given, with parental consent; (b) a short pictorial information sheet, for which there is no template. Recommendation: decide per study.
- **D11 Two-stage information for acute participants.** KLH-22 recommends a short basic version during the acute state and fuller information after stabilisation. No template exists.
  - Options: (a) a short version adapted from the legal-representative, limited-capacity or emergency template, with every deviation visible; (b) supply a template; (c) not used.
  - Recommendation: (a) when the protocol enrols acutely deteriorated participants; otherwise (c).
- **D12 Separate participant data-processing notice.** The main, pregnancy and secondary-use templates say the participant receives a separate notice ("samostatné sdělení ke zpracování osobních údajů"). The Czechia guides do not require one, and no template was supplied.
  - Options: (a) the sponsor's own notice, recorded as a source and planned as `L2_Other subject information material_privacy notice_CZ_cs`; (b) supply a template to add as a participant template; (c) move the full privacy information into each PIS/ICF and delete the references, which deviates from the templates.
  - Recommendation: (a), or (b) if the sponsor has no notice.
- **D13 Future-use consent structure.** SÚKL allows future sample use either inside the main PIS/ICF with its own separate signature or in a separate signed document. The CZ templates use the separate document.
  - Options: (a) separate document (`CZ-PT-secondary`); (b) embedded block with a separate signature.
  - Recommendation: (a), keeping the templates as supplied.
- **D14 Signatures not stated.** The guides set no signature rule for P1 (Template No. 6), S1 (Template No. 7), the post-trial statement or the insurer documents.
  - Options: (a) no signature beyond what the SÚKL template itself requires; (b) signed by the sponsor.
  - Recommendation: (a), confirmed once the templates are supplied (D3).

## Missing

Documents the guides require that have no template in the supplied set:

- **SÚKL Template No. 1**, trial subject recruitment and obtaining of informed consent (K1, D1).
- **SÚKL Template No. 2**, investigator curriculum vitae (M1, mandatory, signed). The folder holds only the EU CV form.
- **SÚKL Template No. 3**, declaration of investigator's interest (M2 DoI, mandatory, signed). The folder holds only the EU form.
- **SÚKL Template No. 4**, site suitability (N1, mandatory, signed). The folder holds only the EU form.
- **SÚKL Template No. 5**, sponsor declaration on personal data processing (R1, mandatory, signed by the sponsor). Only the EU form is bound, and only as interim content.
- **SÚKL Template No. 6**, compensation for study participants (P1). Only the EU form is bound, and only as interim content.
- **SÚKL Template No. 7**, human biological samples (S1, conditional). Only the EU form is bound, and only as interim content.
- **Separate participant data-processing notice** that the templates refer to (D12).
- **Short basic information for acute participants** (D11) and **information for children under 6** (D10).
- **K2 recruitment material and L2 other participant materials.** These are free-form and drafted from the protocol. Manufacturer instructions for use are supplied documents.
- **Supplied by others, so no template is expected:**
  - O1 insurance certificate and O2 policy with its terms and conditions;
  - O3 post-trial compensation statement and the P2 funding description (unless D7(b));
  - Regional Authority facility evidence, the SÚKL GCP certificate and the separate GCP certificate;
  - medical-device documents and the Part II fee proof;
  - the document list (cover letter) and the site list.

Other gaps (not in the Czechia guides; not filled from memory):

- **Full SÚKL texts.** KLH-CTIS-01 Version 3 and KLH-22 Version 5 were not read, only the guides' summaries of them. Three things depend on the full text:
  - the exact device scenarios (D9);
  - the national examples of accepted electronic signatures;
  - the national fields inside Templates No. 1 to 7.
- **Languages** for several administrative documents (D2), and **signature rules** for P1, S1, O1, O2 and O3 (D14).
- **CTIS slots and titles** for the document list, site list, facility evidence, SÚKL GCP certificate, post-trial statement, funding description, fee proof and device documents (D4 to D9).
- **Minimum insurance amounts and post-trial cover duration.** The guides give no figures.
- **Exceptions and other topics the guides are silent on:**
  - any insurance exception for low-intervention trials;
  - radiation-protection documents;
  - per-site contracts or financial agreements (no Czech checklist item, so none is planned).
- **Pages not read.** The SÚKL page linked from the hub and the Czech-language guides (`/ctis/czechia/cz`) are outside the `/ctis/czechia/en/` scope.
- **Variable sheet name.** The file is named `_CZ_de`, although its content is Czech.
