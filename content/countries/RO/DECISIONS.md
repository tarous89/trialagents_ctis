# Romania: decisions and gaps

Answer these together. Each line: question; options; recommendation. Sources: the Romania guides (reviewed 23 September 2026), the CTIS_RO template set and the naming guide. The package works with the recommendations until then.

## Questions for the user

- **D1 Form answer language.** In which language are K1, N1, P1, R1 and S1 answered? Options: (a) Romanian; (b) English (permitted for non-participant documents under Government Emergency Ordinance 29/2022). Recommendation: (a), matching the Romanian variable sheet and the `_RO_ro` file names; choose (b) if your multinational dossier is kept in English. `requirements.json` is set to Romanian.
- **D2 Romanian national forms.** Can you supply the current national forms from Order 3390/2022 (ANMDMR): principal-investigator CV, declaration of interests, site suitability, participant compensation (Annex 7) and the payment commitment form? Options: (a) supply them, and we convert them into `countries/RO/templates/part-ii` (CV and DoI become `third_party_template`, N1 and P1 `form` on the national layout); (b) confirm with ANMDMR/CNBMDM that the EU forms are accepted, and bind the EU forms for upload. Recommendation: (a). The guides say to use the current national forms. Until then, N1 and P1 use the EU form only to collect content, and M1/M2 are checked on receipt.
- **D3 K1 national form during the transition.** Options: (a) the EU v2.0 K1, checking the current ANMDMR form before filing; (b) the May 2022 national form in Order 3390/2022. Recommendation: (a), as the guides direct for new Part II submissions since 1 September 2026. If ANMDMR has republished a Romanian v2.0 form, supply it for conversion.
- **D4 Children under 6.** There is no template for children below the 6-11 band. Options: (a) draft a short child information or assent document from the 6-11 template when the protocol enrols younger children who can form an opinion; (b) inform orally and record the child's response in the consent procedure only. Recommendation: (a) when such children are enrolled. The guide says such a document "may be appropriate", and the minor's agreement is mandatory when the child can form an opinion.
- **D5 Impartial witness for a participant who cannot read.** The witness template also covers someone who cannot read or sign; the guide triggers the route only when the participant cannot write. Options: (a) witness route only when the participant cannot write; (b) also for participants who can write but cannot read. Recommendation: (a). For (b), ask CNBMDM first.
- **D6 Titles without a naming-guide example.** Proposed: `N<next number>_ANMDMR Phase I unit authorisation_<site>` and `Proof of payment_ANMDMR payment commitment_RO` (CTIS Forms section). Options: use these; or your own convention. Recommendation: use the proposed titles.
- **D7 Phase I unit authorisation upload.** The guide calls it an additional national operational requirement. Options: (a) upload a copy under N next to N1; (b) keep it as site-readiness evidence and only reference it in N1. Recommendation: (a), so CNBMDM sees it without an RFI.
- **D8 Trial financing description (P2).** Options: (a) one P2 per site holding the unsigned contract, with the financing description inside it or attached; (b) a separate trial-level financing description (for example `P3_Funding of the trial_RO`) plus one P2 per site. Recommendation: (b) when the site contracts do not describe the funding. The guide names both items under one checklist point but gives no layout.
- **D9 Signatures on P1, R1 and S1.** The guides set no signature rule for these forms. Options: (a) no signature, with only the form's own sponsor fields (R1 name, role, date) completed; (b) signed by the sponsor. Recommendation: (a), unless the national P1 form (D2) has a signature field.
- **D10 Insurance documents.** The guide lists one insurance item. Options: (a) O1 certificate only; (b) O1 certificate plus `O2_Proof of coverage_<sponsor or site>` for the policy terms. Recommendation: (a), adding (b) if the insurer's certificate does not show the cover the participant documents describe.
- **D11 Data-protection reference in R1.** The supplied participant templates cite Law 190/2018 alongside the GDPR, but the guide only requires the Union-law declaration. Options: (a) leave R1 as the EU declaration; (b) add a national sentence citing Law 190/2018. Recommendation: (a). The guides require no national statement.
- **D12 Shareable templates (pregnant partner, secondary use).** Options: (a) one shared document across populations when nothing in it differs; (b) one per population. Recommendation: (a), with separate versions where the consent giver differs (minors, adults lacking capacity).

## Missing

Documents the guides require that have no template in the supplied set:

- **Romanian national CV form** (M1) and **declaration-of-interests form** (M2), Order 3390/2022 (D2).
- **Romanian national site-suitability form** (N1), signed by three people (D2). The EU form is only an interim content basis.
- **Romanian national compensation form** (P1, Annex 7) (D2). The EU form is only an interim content basis.
- **Romanian payment commitment form** for ANMDMR invoices (RO-FEE) (D2).
- **Current ANMDMR version of the recruitment and consent procedure**, if republished for v2.0 (D3).
- **Information for children under 6** (D4).
- **Unsigned sponsor-site or sponsor-investigator contract and trial financing description** (P2). Supplied by the sponsor; no template needed.
- **Insurance or indemnity evidence** (O1) and **ANMDMR Phase I or bioequivalence unit authorisation**. Supplied by the insurer or the site.
- **K2 recruitment material.** Free-form, drafted from the protocol.

Other gaps (not in the Romania guides; not filled from memory):

- Minimum insurance amounts or other Romanian insurance conditions: "applicable Romanian arrangements" are not spelled out.
- Fee amounts and the current ANMDMR payment route.
- Signature method (wet ink or electronic) for the signed national forms.
- Risk frequency categories for participant documents: the guides name none; use the IB or SmPC categories.
- Whether a separate list of trial sites is uploaded: not a Romania checklist item; sites are checked against CTIS (package check P1.12).
- Text of Order 3390/2022, Government Emergency Ordinance 29/2022 and the CNBMDM Regulation: cited by the guides but not read here.
- The Romanian-language guides (`/ctis/romania/ro`) were not read (outside the `/ctis/romania/en/` scope).
- The variable sheet is named `Variable Templates_RO_de.xlsx`, but its content targets Romanian. Treated as a file-name slip.
