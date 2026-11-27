# Belgium: decisions and gaps

Answer these together. Each question gives the options and a recommendation. Until they are answered, the package uses the recommended defaults.

## Questions for the user

- **D1 Answer language of the administrative documents.** Which language should K1, M1, M2, N1, O1, the financing statement, P1, P3, R1 and S1 use? Belgium accepts Dutch, French, German or English, and needs one version for the country.
  - Options: (a) the reference package language; (b) English, which suits multinational trials and investigator-supplied CVs; (c) each N1 in the language of its site's region, and everything else as in (a).
  - Recommendation: (a), with (b) for CVs and declarations when the investigator prefers English.
- **D2 Language set per site.** The rules are Dutch in Flanders, French in Wallonia and German in the German-speaking region. Brussels sites need French and Dutch "when both language groups may be recruited".
  - Options for Brussels: (a) always French and Dutch; (b) only the language groups in the site-specific recruitment plan.
  - Recommendation: (a), unless a written recruitment plan justifies (b).
- **D3 Reference package.** Which language is completed first? The other languages then translate its study-specific content into the CT-College text of their own language.
  - Options: (a) the language of most Belgian sites; (b) the language the assigned ethics committee will review in, once the CT-College has assigned one; (c) English first, because the CT-College publishes an English template, then the official languages.
  - Recommendation: (a). French and Dutch both have official CT-College texts.
- **D4 German participant documents.** The mandatory CT-College templates are not published in German.
  - Options: (a) ask FAMHP or the CT-College how they expect the template to be implemented in German, then translate the standard text with a qualified translator and document the approach; (b) translate without asking.
  - Recommendation: (a), before submission, as the guide says.
- **D5 Participant templates.** None were supplied for any language.
  - Options: (a) supply the CT-College templates (adult patients, healthy adults, vaccine; Dutch, French and English, each with its sponsor statement) and a TrialAgents set for the other populations, then split them into `templates/participant` as `*_BE_fr.json`, `*_BE_nl.json` and `*_BE_de.json`; (b) draft the special-population documents without templates and adapt them from the reference package.
  - Recommendation: (a). The CT-College templates are mandatory for the main and healthy-volunteer ICFs, so (b) is possible only for the special-population documents.
- **D6 Procedure upload.** The EU procedure template belongs under K.59 and under L.62.
  - Options: (a) one file, uploaded in both places as `K1_Recruitment arrangements_BE_<lang>` and `L1_Recruitment and informed consent procedure_BE_<lang>`; (b) upload it under K.59 only.
  - Recommendation: (a).
- **D7 CV format.**
  - Options: (a) the Belgian CV template (strongly recommended; not supplied); (b) the EU CV template (shared) plus the Belgian addendum when information is missing (not supplied).
  - Recommendation: (a). Supply the template and convert it into `countries/BE/templates/part-ii`. Use (b) until then.
- **D8 GCP training evidence.**
  - Options: (a) in the CV, with the training organisation and date; (b) a separate certificate uploaded with the CV.
  - Recommendation: (a), with (b) when the CV lacks the details. The training must be no more than three years old.
- **D9 Site suitability template.**
  - Options: (a) the EU template (shared, accepted); (b) the Belgian template (not supplied).
  - Recommendation: (a), unless the institutions ask for (b).
- **D10 P titles.**
  - Options: (a) `P1_Compensation participants and financial arrangements_BE` for the EU compensation form, `P2_Statement on financing_BE` for the national form (P.69) and `P3_Financial arrangements and agreements_<site>` for draft site contracts (P.70/P.71); (b) the guide's descriptive names.
  - Recommendation: (a).
- **D11 Statement on financing.** The national form is mandatory and was not supplied.
  - Options: (a) supply the current form, convert it with `tools/content/curate.py` and `fields.py` into `countries/BE/templates/part-ii`, and change the document's kind to `form`; (b) the sponsor completes it and TrialAgents only checks it (current setting).
  - Recommendation: (a).
- **D12 Content for P.70 and P.71.**
  - Options: (a) a draft site-sponsor contract with draft amounts per site, plus P1 when participants are paid or reimbursed; (b) rely on the financing statement where it supplies the information.
  - Recommendation: (a). Contact the Belgian clinical trial centres early.
- **D13 GDPR confirmation.**
  - Options: (a) put the GDPR compliance confirmation in the ICF, so no R1 is needed; (b) a separate R1 statement.
  - Recommendation: (a). Belgium accepts it and does not then require R1.
- **D14 S1 when no human biological material is used.**
  - Options: (a) leave S1 out, as the guide makes it conditional; (b) submit it with "No" anyway.
  - Recommendation: (a).
- **D15 S1 section 5.1 Belgian text.** The prescribed text is not in the guides.
  - Options: (a) supply the FAMHP text, so it can be inserted verbatim with the scope box; (b) leave the instruction in place and raise missing data.
  - Recommendation: (a). Until then, (b) applies.
- **D16 Pregnant participant.**
  - Options: (a) the pregnancy section of the main ICF, which the CT-College prefers; (b) a separate information letter or pregnancy ICF.
  - Recommendation: (a). Use (b) when the follow-up goes beyond what the main ICF covers.
- **D17 Infant follow-up.**
  - Options: (a) a specific infant authorisation ICF with two parental signatures; (b) an option in the main ICF with an information and signature route for the other parent.
  - Recommendation: (a). It keeps the child's authorisation separate.
- **D18 Pregnant partner.**
  - Options: (a) include the partner ICF in the initial dossier; (b) submit it by substantial modification when a pregnancy occurs.
  - Recommendation: (a) whenever pregnancy is foreseeable, which the guide prefers.
- **D19 Age-adapted documents for minors.** Belgium has no statutory assent age or bands.
  - Options: (a) one short document for young children and one fuller assent document for older children and adolescents, with ages taken from the protocol; (b) study-specific groups defined in the protocol and consent procedure.
  - Recommendation: (b), with (a) as the starting point. Record the groups in K1.
- **D20 Other patient-facing material.**
  - Options: (a) submit only items that could influence participation, classified against the BAREC list; (b) submit every item participants see.
  - Recommendation: (a). The guide says to avoid uploading purely operational items.

## Missing

Participant templates (the three missing sets):

- **French set (`fr`): all 15 templates.** These are the CT-College adult patients, healthy adults and vaccine healthy volunteers templates; parents/guardians; young children; older children and adolescents; legal representative; adapted participant information; emergency participant; emergency representative; impartial witness; pregnant participant; infant follow-up; pregnant partner; and future use.
- **Dutch set (`nl`): the same 15 templates.**
- **German set (`de`): the same 15 templates.** No German CT-College version is published (D4).

All of them are recorded in `participant_templates_missing` and in each population set with `"template": "missing"`.

Other documents the guides require that have no template in the supplied set:

- **CT-College template packages with their sponsor statements**, needed when the template is not used or its mandatory wording changes.
- **The Belgian Statement on financing of a clinical trial**, a mandatory national form (D11).
- **The Belgian CV template and the Belgian CV addendum** (D7).
- **The Belgian site suitability template**, an optional alternative (D9).
- **The prescribed Belgian S1 section 5.1 text** (D15).
- **K2 recruitment material and L2 other patient-facing documents.** These are free-form and drafted from the protocol.
- **A signed consent form for study-specific prescreening**, and the external recruitment platform's documents (role, privacy policy, staff qualifications).
- **The electronic consent presentation.** This means the screens, images and videos plus a printable PDF, when e-consent is used.
- **O1 insurance certificate and P3 draft site contracts.** The insurer, sponsor and sites supply these.

Other gaps:

- **The Belgian GDPR implementing law.** The guides do not name it.
- **Minimum insured amount and fee amounts.** The guides do not state them.
- **Signature rules.** The guides give none for the financing statement, K1, P1, R1, S1 and the insurance certificate. Only N1 (signed by the institution) and the blank ICFs are stated.
- **A legal representative who cannot write.** The guides do not address this.
- **Sources outside the `/ctis/belgium/en/` scope** were not read: the French and Dutch guide versions and the FAMHP List of requested documents (PDF).
- **The variable sheets** carry `_de` in their file names, and the French sheet has a typo ("Belgiuml"). This has no effect, because the forms are shared.
