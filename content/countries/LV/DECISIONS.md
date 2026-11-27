# Latvia: decisions and gaps

Please answer these together. Each item gives the question, the options and a recommendation. Until they are answered, the package uses the recommended defaults.

## Questions for the user

- **D1 Answer language of forms and administrative documents.** The Latvia overview sets no general Latvian rule for administrative documents. It accepts the English EU templates (K1 need not be translated; M1 may be in English; N1 English accepted; R1 English EudraLex statement allowed; S1 English template recommended). The supplied variable sheet asks for Latvian answers. Options: (a) Latvian answers for K1, N1, P1, R1 and S1, with M1 in either language and M2 on the English template; (b) English for all administrative documents. Recommendation: (a). It matches the variable sheet and the ethics committee's working language. Choose (b) if the sponsor wants to reuse the forms across countries.
- **D2 Russian or other additional-language participant documents.** None of the Latvia guide pages requires or mentions Russian. Latvian is required. If a participant group cannot understand Latvian, the guide asks for a suitable additional language version and consent process, never an unapproved ad hoc translation. Options: (a) Latvian only, adding an approved Russian (or other) version, titled `…_LV_ru`, only when the protocol or site plans to enrol people who cannot understand Latvian; (b) always prepare Russian versions next to the Latvian ones. Recommendation: (a). Ask the sites whether they expect such participants; if they do, submit the extra version for ethics approval before use.
- **D3 Minors aged 14 to 17: document structure.** Options: (a) a separate adolescent information and consent document, coordinated with the legal-representative document; (b) one combined set with suitable information for each signer and separate signature lines. Recommendation: (a). The guide says the adolescent information must not be a copy of the parent document with minor wording changes.
- **D4 Child document under 14.** The national band is 0 to 13. A child document is needed only when the child can understand the trial, so there is no fixed lower bound. Options: (a) one child information or assent document for the protocol's age range, split by maturity when the range is wide, with the lower bound justified in K1; (b) always one document for the whole band. Recommendation: (a).
- **D5 Legal-representative signature blocks for minors.** The national rule uses the singular legal representative. The guide warns against a universal two-parent rule. Options: (a) one legal-representative block, with K1 describing the site process for shared custody, guardianship, disagreement or missing documentation; (b) two blocks in every case. Recommendation: (a). Add a second block only where a trial-specific legal basis requires one.
- **D6 Healthy-volunteer screening consent.** If screening involves research procedures, or data or sample collection before main enrolment, the guide asks either for the screening consent scope to be made clear or for a separate screening consent. Options: (a) a separate `L1_SIS and ICF_screening_<population>_LV_lv` when screening happens on a separate occasion before the main consent; (b) a clearly marked screening section in the main healthy-volunteer document. Recommendation: (a) for separate screening visits, (b) otherwise.
- **D7 Endpoint-related patient-facing instruments.** Options: (a) the instrument in Part I with the protocol, and the required Latvian translation in Part II on the CTIS translation route of Q&A 7.3, titled `R2_Patient-facing document_<type>_LV_lv`; (b) the Latvian version as `L2_Other subject information material_<type>_LV_lv`. Recommendation: (a). Check the current CTIS upload structure before filing.
- **D8 Draft contract and budget (P2).** The guide requires a draft contract with each investigator and/or site and a draft budget showing each one's allocation. The naming guide gives no P2 example. Options: (a) two files per site, `P2_Financial arrangements_<site>` (draft contract) and `P2_Trial budget_<site>`; (b) one combined file per site, `P2_Financial arrangements_<site>`. Recommendation: (a). It keeps the budget easy to compare with P1 and the consent forms.
- **D9 Latvian-law sentence in R1.** The guide asks for a sponsor statement of compliance with the GDPR and Latvian law, and says the English EudraLex statement may be used. The EudraLex text mentions only the GDPR. Options: (a) add one sentence confirming compliance with Latvian law (national field `r1_the_sponsor_declares`); (b) use the EudraLex statement unchanged. Recommendation: (a). It matches the guide's wording at no cost.
- **D10 Emergency: initial information for a representative.** Options: (a) plan the concise initial information only when the protocol shows that a representative may become available within the therapeutic window; (b) always plan it. Recommendation: (a). It never replaces the full subsequent documents.
- **D11 Secondary use: separate document or section.** The guide allows either. Options: (a) a separate optional document (`L1_SIS and ICF_secondary use_LV_lv`); (b) a clearly separate optional section in the main form. Recommendation: (a) when samples are stored or there are several optional choices, (b) for a single simple choice.
- **D12 Information sheet and consent form: one document or two.** Options: (a) one combined document per population; (b) two controlled documents. Recommendation: (a). It matches the CTCG `L1_SIS and ICF` title and keeps the versions together.
- **D13 Pregnancy follow-up of a participant.** Options: (a) a separate or renewed consent only when the main consent does not adequately cover the planned follow-up; (b) always a separate form. Recommendation: (a), as the guide says.
- **D14 Missing Latvian participant templates.** Options: (a) supply a Latvian template set, to be split into `templates/participant` as `*_LV_lv.json`; (b) draft each document from the Latvia guides with the base and Latvian styling, or adapt it from its reference-package counterpart (`based_on`). Recommendation: (b) now, and (a) when a set is available.
- **D15 Statement that trial medicines and procedures are free.** The guide says to state it "where it helps the participant understand costs". The QC checklist checks it "where applicable". Options: (a) always state it in the costs section; (b) state it only when costs are discussed. Recommendation: (a). It is short and is checked by the QC list.
- **D16 Shared documents across populations.** Options: (a) one pregnant-partner document shared by all populations, and one secondary-use document shared only by capable adult populations; (b) one document per population for each. Recommendation: (a) when nothing in the document would differ.
- **D17 Infant follow-up.** Options: (a) a clearly separated infant section with the legal-representative signature in the pregnancy or partner document, when the signer is also the child's legal representative; (b) a separate infant document (`L1_SIS and ICF_infant follow-up_LV_lv`). Recommendation: (a), switching to (b) when someone else holds the authority or separate information is needed.

## Missing

Documents the guides require that have no template in the supplied set:

- **The whole Latvian participant template set.** None was supplied. There are 16 planned templates, all marked `"template": "missing"` (D14):
  - adult patients (`LV-PT-main`)
  - healthy volunteers (`LV-PT-healthy`)
  - healthy-volunteer screening (`LV-PT-screening`)
  - legal representative of a minor (`LV-PT-legal-rep-minor`)
  - child under 14 (`LV-PT-age-0-13`)
  - minor 14 to 17 (`LV-PT-age-14-17`)
  - legal representative of an adult unable to consent (`LV-PT-legal-rep`)
  - adapted participant information (`LV-PT-limited-capacity`)
  - emergency initial information (`LV-PT-emergency-initial`)
  - emergency participant (`LV-PT-emergency`)
  - emergency legal representative (`LV-PT-emergency-legal-rep`)
  - impartial witness (`LV-PT-witness`)
  - pregnant participant (`LV-PT-pregnancy`)
  - pregnant partner (`LV-PT-pregnant-partner`)
  - infant follow-up (`LV-PT-infant`)
  - secondary use (`LV-PT-secondary`)
- **K2 recruitment material and L2 other participant-facing material.** Free-form, drafted from the protocol in Latvian.
- **O1 insurance certificate and policy terms.** Issued by the insurer.
- **P2 draft contract and budget per site.** No template; supplied by the sponsor's legal team (D8).
- **Capacity-assessment form.** Only needed when the protocol uses a structured assessment. No template.

Other gaps:

- **Contact details** of ZVA, the assigned ethics committee and the Data State Inspectorate. Every main consent set needs them, but the guides do not give them. The committee is assigned per trial by ZVA.
- **Fee.** The Latvia guides state no Part II fee, payment route or proof-of-payment rule.
- **Insurance amount in euros.** The minimum is 48 (or 12, low-intervention) Latvian minimum monthly wages per participant per event. The euro amount depends on the minimum wage in force when the insurance contract is concluded, which the guides do not state.
- **Legal-representative rules under Latvian law.** The guides refer to them without stating them (who qualifies as a minor's legal representative; the relatives order for medical-treatment decisions). The K1 answer and the signature plan need the site's or sponsor's legal basis (D5).
- **Russian.** The guides are silent on Russian-language documents (D2).
- **Latvian-language guides** (`/ctis/latvia/lv`) were not read, because they are outside the `/ctis/latvia/en/` scope. The EU hub linked from the Latvia hub was not re-read.
- **Variable sheet name.** The file name carries `_de` although its content is Latvian. This has no effect, because the forms are shared.
