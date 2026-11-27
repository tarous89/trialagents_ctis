# Poland: decisions for the user

Each item gives the question, the options and a recommendation. Answer them together. Until then, the package content works with the recommended defaults.

## Questions

1. **D1 Answer language of the Part II forms (K1, N1, P1, GDPR statement, S1).**
   - Options: Polish; English. The guides imply English is possible for administrative EU templates, but embedded participant-facing content and Poland-specific fields must be in Polish.
   - Recommendation: Polish, which matches the supplied Polish variable sheet and the `_PL_pl` file names (`answer_languages: ["pl"]`).
2. **D2 Document for 12-year-olds.** No supplied template is drafted for age 12. The child template covers ages 6 up to the 12th birthday; the adolescent template starts at 13.
   - Options:
     - (a) Use the child template (`age 6-11`), adapted to a 12-year-old's maturity, with information only and no signature.
     - (b) Supply a dedicated template for 12-year-olds.
     - (c) Give oral information only and document it.
   - Recommendation: (a). It meets the NKB rule (no consent below 13) and the parents template's instruction ("age-appropriate information without a child consent signature").
3. **D3 CTIS title labels for the minors' documents.**
   - Options:
     - (a) Explicit words: `children under 13`, `adolescents 13 to under 18`.
     - (b) NKB notation: `children 6-13`, `adolescents 13-18`.
     - (c) Inclusive ranges: `children 6-12`, `adolescents 13-17`.
   - Recommendation: (a). The minors guide asks for labels that make the 13-year boundary unambiguous, and (b) and (c) read differently to Polish and non-Polish reviewers. Polish text inside the documents uses NKB notation.
4. **D4 Joint-parental-decision route in the parents ICF.** NKB accepts either route; the template asks you to finalise one.
   - Options:
     - (A) Both parents sign.
     - (B) One parent signs, with the NKB attestation that the consent results from a joint decision with the other parent.
   - Either route is kept visually distinct from a sole-representative block, which is used where only one person holds legal authority.
   - Recommendation: (B) as the standard route, with the sole-representative block. Both are NKB-compliant, and (B) does not need both parents at the visit. Choose (A) if the sponsor or sites prefer two signatures.
5. **D5 Location and titles of the payment proofs (application fee, Clinical Trials Compensation Fund).** The guides say the fee proof "is uploaded in CTIS" and the Fund proof is "attached to the application", but name no slot.
   - Options:
     - (a) The CTIS Form section proof-of-payment area for both, titled `Proof of payment_application fee_PL` and `Proof of payment_Clinical Trials Compensation Fund_PL`.
     - (b) The Fund proof in Part II section O next to the insurance evidence.
   - Recommendation: (a), because the naming guide puts proof of payment in the Forms section. Confirm against the current URPL, NKB and Patient Rights Ombudsman instructions before filing.
6. **D6 Ombudsman Compensation Fund wording.** The templates contain Fund and insurance text, but the Ombudsman's current recommended wording, which the guides name as the reference, was not supplied.
   - Options: (a) supply the current Ombudsman wording so the template passages can be checked word for word; (b) use the template text as is.
   - Recommendation: (a).
7. **D7 GDPR statement placement.**
   - Options:
     - (a) The CTIS Form section, as the Poland checklist and the naming guide say.
     - (b) Part II section R as `R1_Compliance collection and use personal data_PL`.
   - Recommendation: (a). Use R1 only for additional Poland-specific data-protection documentation if an assessor asks for it.
8. **D8 National sentence in the GDPR statement.** The guides say Poland applies the GDPR together with the Polish Act of 10 May 2018 but do not require a statement on it.
   - Options: (a) no national sentence (field `r1_the_sponsor_declares` removed); (b) add a sentence that national data-protection law is respected.
   - Recommendation: (a), since no source requires it.
9. **D9 Investigator and site financial arrangements (PL-P2).** Part II must describe them; the guides give no format.
   - Options: (a) one document per site, for example the draft site agreement, titled `P2_Financial arrangements_<site>`; (b) one trial-level description with site annexes.
   - Recommendation: (a), without signatures unless an assessor asks.
10. **D10 Investigator insurance evidence.** Polish law requires civil liability insurance of both the sponsor and the investigator.
    - Options: (a) one certificate covering both, under O1; (b) O1 for the sponsor's policy and `O2_Proof of coverage_<site>` for an investigator's separately issued cover.
    - Recommendation: follow how the insurer issues the cover. Use (b) when there are separate certificates.
11. **D11 Signature on N1.** The guides state no Polish signature requirement for the CTIS copy of the site-suitability form.
    - Options: (a) leave the signature block empty in the CTIS copy; (b) signed by the head of the site.
    - Recommendation: (a), unless the assessor or site asks otherwise.
12. **D12 Language of insurer documents (O1).** The guides do not say.
    - Options: Polish; English; bilingual.
    - Recommendation: accept the insurer's Polish or English certificate. The participant documents must give the policy details in Polish.
13. **D13 Secondary-use architecture.** The secondary-use guide allows an optional section inside the main PIS/ICF or a separate form; the supplied templates send optional future use to a separate form.
    - Options: (a) a separate form (PL-PT-secondary); (b) a section in the main ICF.
    - Recommendation: (a), as the templates are designed and as the guide's "unmistakably separate" rule favours.
14. **D14 Optional genetic or genomic research.**
    - Options: (a) a distinct YES/NO block in the secondary-use form; (b) a separate L1 document when its scope differs materially from the other optional uses.
    - Recommendation: (a) by default and (b) when the scope differs materially, as the secondary-use guide says.
15. **D15 Emergency enrolment of minors.** The emergency template is written for adults.
    - Options: (a) adapt the parents and adolescent templates for continued participation after emergency inclusion, with every deviation visible; (b) supply a dedicated template.
    - Recommendation: decide per study. Use (a) only if the protocol enrols minors under Article 35.
16. **D16 Children under 6.**
    - Options: (a) give oral, age-appropriate information and document the child's response; (b) draft a short picture-based information sheet (no template).
    - Recommendation: (a), unless the protocol's procedures make a written aid useful. The minors guide requires involving the child, not a document.
17. **D17 Participant who cannot read but can write.** The witness template covers "cannot read, write or sign", but the CTR and NKB witness route applies only when the person cannot write.
    - Options: (a) standard ICF with the information read aloud and explained, without a witness; (b) the witness template.
    - Recommendation: (a). Use the witness template only when the person cannot write.

## Missing

Documents the guides require that have no template in `CTIS_PL`:

- **K2 recruitment material, L2 other participant-facing material and R2 Polish translations of endpoint-related documents.** Free-form, drafted from the protocol and the sponsor's source materials.
- **O1 proof of sponsor and investigator civil liability insurance.** Issued by the insurer.
- **Clinical Trials Compensation Fund payment proof and application fee payment proof.** Issued by the sponsor's finance team or bank.
- **P2 investigator and site financial arrangements.** Sponsor legal or finance (D9).
- **A template for 12-year-olds (D2), information for children under 6 (D16) and an emergency pathway for minors (D15).**

Other gaps (not in the Poland guides; not filled from memory):

- The Patient Rights Ombudsman's current recommended participant wording on the Fund and insurance (D6).
- The minimum guaranteed insurance sums by number of participants. The guide refers to the statutory text and gives no figures.
- Fee and Compensation Fund payment amounts and account details. These are deliberately not copied; use the current URPL, NKB and Ombudsman pages.
- The CTIS slot and title for the payment proofs (D5).
- How the legally designated representative of an incapacitated adult is identified under Polish law. The guide advises country-specific legal or site advice and gives no hierarchy.
- Rules for enrolling people who do not understand Polish, beyond communication support. The guides are silent.
- The identity and assignment of the ethics body reviewing a given application. The guides describe only the "ethics structure" of the Act and NKB's role.
- Radiation-protection documents, electronic consent, and signature rules for N1, P1 and S1. The guides are silent (see D11).
- The Polish-language guides (`/ctis/poland/pl`) were not read, because they are outside the `/ctis/poland/en/` scope.
- The variable sheet is named `Variable Templates_PL_de.xlsx`, although its content is Polish.
