---
id: IE
name: Ireland – Part II planning checklist
part: II
country: IE
version: '1.0'
effective: '2026-11-27'
use_when: Part II documents for Ireland.
reference: https://trialagents.com/ctis/ireland/en
checked: '2026-11-27'
naming: Use the CTCG title for each document (see each row’s CTIS title); filename <study code>_<code>[_<variant>]_IE_<language>.
documents:
- code: K1_recruitment-arrangements
  name: Recruitment and informed consent procedure
  required: always
  languages:
  - en
  per: trial
  national_notes: 'CTIS title: K1_Recruitment arrangements. Signed at CTIS submission: no

    How people are identified, the first act of recruitment, who makes the initial approach, whether medical records or patient lists are accessed, how privacy is protected, and who provides information and takes consent. Covers ordinary consent, incapacitated adults, minors, impartial witnesses and emergency enrolment; must explain how each recruitment item is used and how responses from people who are not eligible are handled.

    National additions to the form: - **v105**: Ireland: all recruitment material shown to potential participants is in English (final versions uploaded under K2); explain how each item is used and how responses from people who are not eligible are handled.

    - **v108**: Ireland: the pre-consent interview and consent may be handled by the investigator or an appropriate registered medical practitioner, registered dentist or registered nurse designated by the investigator; state their role, training, setting, timing and the steps used to check understanding. Consent documents are in English; another language or communication format for an individual participant needs an approved translation or accessible process. The participant (or legally designated representative) and the authorised person taking consent sign and date the approved ICF; the participant receives a copy and the original is kept in the investigator site file. Trial-participation consent is kept distinct from the data-protection information and the explicit-consent safeguard of the Health Research Regulations (S.I. No. 314/2018).

    - **v110**: Ireland: legally designated representative under S.I. No. 99/2022: first a person who, because of a family or other personal relationship, is suitable and available and acts on their best interpretation of the participant''s will and preferences; if none is available, the medical practitioner primarily responsible for the participant''s treatment who is not involved in conducting the trial. Describe the supported capacity assessment and reassessment, how the participant is involved and their refusal respected, the lawful data-processing route (the representative cannot ordinarily give the participant''s explicit data-processing consent; a Health Research Consent Declaration may be needed unless an exemption applies), and the participant''s own consent when capacity returns.

    - **v114**: Ireland: a minor is a person under 16 (S.I. No. 99/2022). A parent or guardian legally entitled to act for the child consents, with that authority verified and documented; the child''s assent is sought where the child can form an opinion and assess the information, using age-appropriate information whose bands are justified for the protocol population; an explicit refusal or wish to withdraw by a capable minor is respected. Participants aged 16 or over consent themselves to participation and associated data processing. Re-consent: the participant''s own consent without undue delay on reaching 16 while trial activities, follow-up or identifiable data processing continue.

    - **v117**: Ireland: the witness route applies when the participant or legally designated representative can make the decision but cannot independently read the written information or complete the normal written signature; not for extra explanation or to avoid an approved translation or interpreter. The witness is independent of the trial, attends the full discussion and signs and dates to attest; the reason for witness involvement is recorded and a witness signature field is present (NREC expectation). A witness cannot consent for the participant or replace the legally designated representative.

    - **v121**: Ireland: all Article 35 conditions met at the first trial intervention, with the emergency, therapeutic window, eligibility decision, attempts to locate a representative, first trial intervention and consent follow-up defined; NREC approval of the specific pathway. Consent is then sought without undue delay from the participant or legally designated representative, whichever can validly decide first, and from the participant once capacity returns. Deferred consent to participation does not automatically authorise health-data processing: describe the Health Research Regulations deferred-consent route or the Health Research Consent Declaration Committee decision relied on, when processing begins and what happens if consent is refused.

    Completed by: assistant

    CTIS Part II section K (recruitment arrangements). Mandatory for every trial. English. Not signed at submission. Use the EU template version 2.0. Answer the incapacitated-adult, minor, impartial-witness and emergency sections for every pathway in the plan and give the template''s not-applicable answer for each ''no''. Put the Irish rules in the Member State fields (national_fields): consent taker roles (investigator, or registered medical practitioner, dentist or nurse designated by the investigator), minor = under 16 with re-consent at 16, the legally designated representative hierarchy, witness reason and signature field, the separate Irish data-processing route (Health Research Regulations, HRCDC). The recruitment routes must match every K2 item.

    Template basis: European Commission Recruitment and Informed Consent Procedure template, version 2.0, January 2026 (EudraLex Volume 10). Use version 2.0 for new Part II submissions from 1 September 2026, including initial applications, additional Member States and Part II completion under Article 11; already authorised trials and applications under review do not need retrospective replacement.'
- code: K2_recruitment-material
  name: Recruitment materials
  required: conditional
  condition: Any advertisement, letter, brochure, social-media item, video script, website text or other material shown to potential participants.
  languages:
  - en
  per: trial
  national_notes: 'CTIS title: K2_Recruitment material_<type>_IE_en. Signed at CTIS submission: no

    Final English version of every item. K1 must explain how each item is used and how responses from people who are not eligible are handled.

    Completed by: assistant

    CTIS Part II section K. Conditional: one upload per recruitment item. Final English versions, not signed. No national template. Keep consistent with K1 and with the participant documents; payment wording must not suggest that payment is a benefit.'
- code: L1_SIS-ICF
  name: Subject Information Sheet and Informed Consent Form, one set per population and per optional procedure that changes the information or consent logic
  variants:
  - adults
  - age-12-15
  - age-16-17
  - age-6-11
  - emergency
  - healthy-volunteers
  - impartial-witness
  - legal-representatives
  - limited-capacity
  - parents
  - pregnant-participants
  - pregnant-partners
  - secondary-use
  required: always
  languages:
  - en
  per: population
  national_notes: 'CTIS title: L1_SIS and ICF_<population>_IE_en. Signed at CTIS submission: no

    Blank English SIS and ICF for each population that can enter the trial, with separate or clearly distinct versions for each population and optional procedure that changes the information or consent logic (minors, parents or guardians, incapacitated adults, healthy volunteers, emergency enrolment, pregnant participants, pregnant partners, optional genetics, future research and other substudy consent). See population_sets.

    Completed by: assistant

    CTIS Part II section L (subject information and informed consent). Mandatory when participants are enrolled. English only; submit accessible, searchable Word files or original PDFs, never image-only scans. Blank and unsigned. One set per population in population_sets; follow the bound template and drafting_rules. Signature blocks only for the signers of that pathway.'
- code: L2_other-subject-information
  name: Other participant-facing materials
  required: conditional
  condition: Diaries, questionnaires, participant cards, electronic-interface text, videos, instructions, letters and other material shown to participants when it affects their understanding, decisions or trial burden.
  languages:
  - en
  per: trial
  national_notes: 'CTIS title: L2_Other subject information material_<type>_IE_en. Signed at CTIS submission: no

    Final English versions. The Ireland checklist gives no CTIS slot for these items; the naming guide places endpoint-related patient-facing documents under R2 and other information material under L2 (DECISIONS.md D5).

    Completed by: assistant

    CTIS Part II section L (or R2 for endpoint-related questionnaires and diaries; DECISIONS.md D5). Conditional: one upload per item. Final English versions, normally unsigned. No national template. Keep consistent with the SIS/ICF and the protocol.'
- code: M1_CV
  name: Principal investigator curriculum vitae
  required: always
  languages:
  - en
  per: site
  national_notes: 'CTIS title: M1_CV_<investigator>_<site>. Signed at CTIS submission: no

    Current CV showing the principal investigator''s education, training and relevant experience. Irish legislation requires an investigator to be a registered medical practitioner or registered dentist: professional registration and clinical-trial experience must be clear. Name, site and date fields completed.

    Completed by: investigator

    CTIS Part II section M (suitability of the investigator). Mandatory, one per Irish site. English. EU CV template or an equivalent NREC-aligned format. The assistant fills only the trial fields (EU trial number); education, training, experience, registration, name, site and date come from the investigator. No signature rule published for Ireland.

    Template basis: EU (EMA) CV template; an equivalent NREC-aligned format is also accepted'
- code: M2_DoI
  name: Principal investigator declaration of interest
  required: always
  languages:
  - en
  per: site
  national_notes: 'CTIS title: M2_DoI_<investigator>_<site>. Signed at CTIS submission: no

    Trial-specific declaration identifying any economic, institutional or personal interest that could affect impartiality. Investigator, institution and date fields completed by the investigator.

    Completed by: investigator

    CTIS Part II section M. Mandatory, one per Irish site. English. EU template or equivalent. The assistant fills only trial title and EU trial number; the interests, investigator, institution and date are completed by the investigator.

    Template basis: EU declaration-of-interest template; an equivalent accepted format may be used'
- code: N1_site-suitability
  name: Irish Site Suitability Form (NREC-CT)
  required: always
  languages:
  - en
  per: site
  national_notes: 'CTIS title: N1_Site suitability form_<site>. One completed national form per Irish site describing the site, facilities, equipment, procedures, staffing, expertise, pharmacy arrangements and site-specific issues such as ionising radiation. Planned participant number consistent with CTIS and the Irish site list.

    Completed by: site (national NREC-CT form)

    CTIS Part II section N (suitability of the facilities). Mandatory, one per Irish site, on the current NREC-CT Site Suitability Form, not only the generic EU form. English. Complete the issuer, position, organisation and date fields and follow the national form''s authorisation field. Do not draft it on the EU form. Planned participant numbers must agree with CTIS and the Irish site list; site forms are a frequent source of avoidable inconsistencies.'
- code: O1_insurance-certificate
  name: Proof of insurance or indemnity
  required: always
  languages:
  - en
  per: trial
  national_notes: 'CTIS title: O1_Trial participant insurance certificate_IE. Valid insurance certificate or evidence of an appropriate indemnity arrangement, appropriate to the nature and extent of trial risk and providing compensation for damage resulting from participation, valid for the planned trial period (explain renewal where cover expires earlier). For trials involving delegated State authority healthcare enterprises and academic institutions, check the current State Claims Agency guidance and Clinical Trial Indemnity Form; commercial arrangements may use the standard Irish documents developed with the State Claims Agency, HSE and the Irish Pharmaceutical Healthcare Association.

    Completed by: insurer or indemnity provider

    CTIS Part II section O (proof of insurance cover or indemnification). Mandatory. English. Issued by the insurer or indemnity provider. Insurance certificate as O1; an indemnity arrangement (State Claims Agency) may be filed as O2 proof of coverage (DECISIONS.md D4). Injury and insurance wording in every participant document must match it; do not promise automatic compensation where the policy has conditions or exclusions.'
- code: P1_compensation
  name: Compensation and reimbursement for participants
  required: always
  languages:
  - en
  per: trial
  national_notes: 'CTIS title: P1_Compensation participants and financial arrangements_IE. Signed at CTIS submission: no

    Mandatory disclosure even when no payment is offered. Whether participants, parents, carers or legal representatives receive travel, meals, accommodation, loss-of-earnings reimbursement, money or non-monetary items. For minors, incapacitated adults and breastfeeding women, incentives are prohibited apart from reimbursement of expenses or loss of earnings directly related to participation; any small token of appreciation needs ethics review.

    Completed by: assistant

    CTIS Part II section P (financial and other arrangements). Mandatory as a disclosure, also when nothing is paid (then say so). English; not signed. EU compensation template. Amounts, schedule, conditions and third-party reimbursement must match the SIS/ICF exactly. Minors, incapacitated adults and breastfeeding women: no incentives, only expenses and loss of earnings directly related to participation; any token of appreciation is flagged for ethics review. Healthy volunteers: separate reimbursement of expenses from payment for time and inconvenience; payment must not be contingent on completing every procedure. Other financial arrangements go in IE-P2.

    Template basis: EU Compensation for Trial Participants template, version 5, June 2023 (or the accepted equivalent)'
- code: P2_financial-arrangements
  name: Other financial arrangements
  required: conditional
  condition: 'Guide: ''Mandatory where applicable'': financing, payments to investigators and sites, and other agreements that could affect impartiality.'
  languages:
  - en
  per: trial
  national_notes: 'CTIS title: P2_Financial arrangements_IE. Description of financing, payments to investigators and sites, and other agreements that could affect impartiality. A contract does not need to be uploaded unless the requested information is not otherwise provided or NREC-CT asks for it (study fact contract.financial_arrangements_in_site_contract). Financial statements, participant documents and the reimbursement process must agree.

    Completed by: sponsor (finance or legal)

    CTIS Part II section P. Mandatory where applicable. English. No template. Describe financing, payments to investigators and sites and other agreements that could affect impartiality; upload a contract only if the information is not otherwise provided or NREC-CT asks for it.'
- code: R1_data-protection
  name: NREC Statement of Compliance regarding Data Protection, or a Data Protection Impact Assessment
  required: always
  languages:
  - en
  per: trial
  national_notes: 'CTIS title: R1_Compliance collection and use personal data_IE. Identify controllers, processors, recipients, lawful bases, the Article 9 condition, Irish Health Research Regulations safeguards, retention, transfers, security, participant rights and Data Protection Officer input. Must describe the same data-processing route as the participant documents, protocol and any HRCDC application or decision.

    Completed by: sponsor with Data Protection Officer input (national NREC template) or sponsor DPIA

    CTIS Part II section R (compliance with national requirements on data protection). Mandatory. English. Use the current NREC Statement of Compliance (version 2) or provide a DPIA instead; the generic EU GDPR statement (eu/templates/part-ii/R1_Data protection.docx) does not replace it and is not used for Ireland. Follow the national template''s completion and authorisation fields. Retention, recipients, transfers and the lawful route must match the SIS/ICF, protocol and S1.'
- code: S1_biological-samples
  name: Compliance with rules for biological samples
  required: conditional
  condition: The trial collects, accesses, stores, transfers or plans future use of human biological samples.
  languages:
  - en
  per: trial
  national_notes: 'CTIS title: S1_Compliance collection use storage biological samples_IE. Signed at CTIS submission: no

    Sample type and volume, collection, legal responsibility, analysis, storage location and duration, coding, access, transfers, destruction and any future use. Optional future use must also be explained to participants and supported by valid consent.

    National additions to the form: - **f03**: Ireland: optional future use is limited to broad consent that is specific, explicit and informed within a described disease, health or research area (no blanket consent); future projects receive the ethics, scientific, data-protection and institutional review required at the time; recontact for new consent where the purpose cannot be described within a meaningful area; a legally designated representative cannot ordinarily give an incapacitated adult''s explicit data consent and a Health Research Consent Declaration cannot authorise unknown future research; participants enrolled under 16 are asked for their own consent at 16 if identifiable material remains in use or storage. Wording consistent with the NREC data-protection statement or DPIA.

    Completed by: assistant

    CTIS Part II section S. Conditional: only when human biological samples are collected, accessed, stored, transferred or planned for future use. English; not signed. Storage, retention, recipients, transfers and withdrawal wording must agree with the protocol, SIS/ICF, secondary-use consent and R1. Put the Irish future-use limits in Section 5 (national_fields f03).

    Template basis: EU biological-samples template (EudraLex Volume 10); an accepted NREC equivalent may be used instead'
- code: IE_ireland-fee-evidence-hpra-fee-application-form-and
  name: 'Ireland fee evidence: HPRA fee application form and proof of payment'
  required: conditional
  condition: Commercial sponsors pay the Irish clinical-trial fee to HPRA; non-commercial and academic trials are not charged.
  languages:
  - en
  per: trial
  national_notes: 'CTIS title: (CTIS Forms section, proof of payment of fee; no CTCG Part II title). Completed HPRA fee application form and proof of payment, submitted in CTIS in the correct administrative area; not a Part II ethics document.

    Listed as item 13 on the Ireland Part II checklist page but placed outside Part II. Keep it out of the Part II sections K to S.

    Completed by: sponsor (HPRA fee form)

    Not a Part II document: CTIS Forms section (proof of fee payment). Only for fee-paying (commercial) applications. HPRA fee application form completed by the sponsor plus proof of payment. Do not upload it in K to S.'
---
# National rules – Ireland

## Authorities and fee

- **competent authority**: Health Products Regulatory Authority (HPRA): leads the scientific assessment and issues Ireland's single national decision through CTIS.
- **ethics**: National Research Ethics Committee for Clinical Trials (NREC-CT), with the National Office for Research Ethics Committees, assesses Part II (participant information, consent, recruitment, investigator and site suitability, insurance, financial arrangements, data protection, biological samples).
- **communication**: Documents and RFI responses for an application under assessment go through CTIS, not directly to HPRA or the National Office unless an authority asks.
- **fee**: Commercial sponsors pay the Irish clinical-trial fee to HPRA and submit the completed HPRA fee application form and proof of payment in CTIS (Forms section, not Part II). Non-commercial and academic trials are not charged.
- **data protection bodies**: Health Research Consent Declaration Committee (HRCDC) decides consent declarations under the Health Research Regulations where explicit consent cannot be obtained.

## Language rules

- **participant documents**: en
- **administrative documents**:
  - en
- **rule**: Ireland requires the application and all documents and communications before, during and after the trial to be in English (HPRA, NREC). Participant-facing documents need an English version suitable for the intended Irish population.
- **other languages**: Other language versions can be offered to individual participants where needed (approved translation or accessible process), but they do not replace the English Irish submission set.
- **irish language ga**: Irish-language (ga) versions are not required by any Ireland guide. The guides require English only and the QC checklist warns against implying that an unpublished Irish-language CTIS guide is available. An Irish-language document is planned only as an individual approved translation if a participant needs it (DECISIONS.md D18).
- **form answers**: Part II forms (shared EU templates in content/eu/templates/part-ii) are answered in English.

## Answer languages for forms

- en

## Populations, age bands and representatives

- **authority**: Irish rules as recorded in the TrialAgents Ireland guides (reviewed 23 September 2026): European Union (Clinical Trials on Medicinal Products for Human Use) Regulations 2022, S.I. No. 99/2022; Data Protection Act 2018 (Section 36(2)) (Health Research) Regulations 2018, S.I. No. 314/2018 as amended by S.I. No. 18/2021; National Office for Research Ethics Committees guidance (Part II National Requirements; Age of Consent for Regulated Research; Legally Designated Representatives; Use of Biological Samples and Associated Data; all reviewed 31 August 2026); HSE National Policy for Consent in Health and Social Care Research v1.1 (2023); Regulation (EU) No 536/2014 Articles 28 to 35.
- **participants 16 17**:
  - **always**:
    - IE-PT-age-16-17
  - **note**: Not minors in Irish regulated trials: own consent to participation and associated data processing; family or support persons may be involved if the young person wishes.
- **minors**:
  - **definition**: A minor is a person under 16 in Irish regulated clinical trials.
  - **age bands**:
    - **band**: 6-11
    - **template**: IE-PT-age-6-11
    - **reader**: child
    - **band**: 12-15
    - **template**: IE-PT-age-12-15
    - **reader**: adolescent
  - **bands note**: The legal rules do not prescribe fixed assent bands. 6-11 and 12-15 are the supplied templates' drafting bands; choose the bands the protocol population and developmental needs require and justify them (DECISIONS.md D8).
  - **always**:
    - IE-PT-parents
  - **reconsent at 16**: IE-PT-age-16-17 when the participant reaches 16 while trial activities, follow-up or identifiable data processing continue (IE-PT-main or IE-PT-healthy if the participant is 18 or older at that time); obtain the participant's own consent without undue delay; if they do not consent, stop optional future activities and follow the approved withdrawal and safety process.
  - **under 6**: No template. Inform the child according to age and maturity and seek assent where the child can form an opinion; an explicit refusal is respected (DECISIONS.md D8).
  - **representatives**: Consent from the person legally entitled to act for the child, with authority verified and documented (not assumed from attendance or an informal caregiving role). The parents template has an optional second parent/guardian block, used only if the specific guardianship or site situation requires it.
  - **conflicts**:
    - IE-PT-parents description says 'younger than 18 years'; in Ireland a minor is under 16: the parents template is used only for participants under 16.
    - IE-PT-age-12-15 and IE-PT-age-16-17 descriptions say 'aged 12 - 17 years'; their content instructions and the Irish rule give 12-15 (assent) and 16-17 (own consent). The authority and the content instructions are followed.
- **adults without capacity**:
  - **always**:
    - IE-PT-legal-rep
    - IE-PT-limited-capacity
  - **regained capacity**: IE-PT-main or IE-PT-healthy: the participant's own consent without undue delay, explaining activities completed and data collected.
  - **representative hierarchy**: First a person who, because of a family or other personal relationship, is suitable and available and acts on their best interpretation of the participant's will and preferences; if none is available, the medical practitioner primarily responsible for the participant's treatment who is not involved in conducting the trial.
  - **data protection**: The representative cannot ordinarily give the participant's explicit consent to health-data processing; determine and document the lawful route before submission (HRCDC declaration unless a specific exemption applies). Do not ask the representative for explicit data-processing consent.
  - **note**: Capacity is supported, assessed and reassessed (process in K1, not a participant document). Compensation includes no incentive.
- **emergency**:
  - **always**:
    - IE-PT-emergency
  - **representative first**:
    - IE-PT-legal-rep
  - **note**: IE-PT-legal-rep adapted to the deferred-consent context when a legally designated representative can decide before the participant (DECISIONS.md D10); the participant's own consent when capacity returns (IE-PT-emergency participant section or IE-PT-main).
- **impartial witness**:
  - **always**:
    - IE-PT-witness
  - **note**: Template covers a capable participant who cannot read, write or sign. The Irish guide also allows a witness where the legally designated representative cannot read or write (DECISIONS.md D9).
- **pregnancy**:
  - **participant**:
    - IE-PT-pregnancy
  - **partner**:
    - IE-PT-pregnant-partner
  - **note**: Distinct documents for the two pathways.
- **secondary use**:
  - **always**:
    - IE-PT-secondary
- **shareable templates**:
  - IE-PT-pregnant-partner
  - IE-PT-secondary
- **shareable note**: One shared document for several populations only when nothing in it differs; the secondary-use document needs a separate version for each signer pathway (participant, parent or guardian, legally designated representative).
- **separate document rules**:
  - Separate or clearly distinct versions for each population and optional procedure that changes the information or consent logic: minors, parents or guardians, incapacitated adults, healthy volunteers, emergency enrolment, pregnant participants, pregnant partners, optional genetics, future research and other substudy consent (Part II checklist item 3).
  - Optional future use of samples or data: a distinct optional information and consent pathway (IE-PT-secondary), never bundled with trial participation under one signature.
  - Pregnancy follow-up: separate documents for a pregnant participant and for a pregnant partner; the partner consents for herself.
  - Witness, guardian, legally designated representative and interpreter blocks appear only in the versions that use them.

## Drafting rules

- English for every Irish document and communication; write in plain Irish English for the intended participants (templates: National Adult Literacy Agency principles, about a 12-year-old reading level where feasible). Explain technical terms, abbreviations, study arms, randomisation, placebo, genetic analyses and uncommon procedures.
- Accessible, searchable Word files or original PDFs only; no image-only scans. Check navigation, selectable text, headings, lists and reading order.
- Put the information needed for consent in the participant document itself; never refer participants to the protocol, IB or SmPC to discover material risks.
- Cover the SIS core content from the Ireland consent guide: purpose and phase, why invited, treatment, comparator, placebo and chance of each arm, procedures and visits, research-specific versus standard care, risks and burdens, expected benefit (clear statement where none is expected), alternatives, pregnancy and contraception, samples, optional elements, data protection, reimbursement, insurance, injury and complaints, voluntariness and withdrawal, what happens to data and samples collected before withdrawal, contacts including the Data Protection Officer, public trial information and results.
- Separate agreement to the main trial from optional elements; describe each optional activity before its consent statement; one clear choice per activity; declining must not block participation unless the activity is genuinely necessary (then explain why and do not present it as optional). No pre-ticked boxes or bundled future-use permission.
- Distinguish ethical consent to take part from the data-protection information and safeguards: explicit consent under the Health Research Regulations is a safeguard even where consent is not the GDPR legal basis. Explicit consent is the default for capable participants; a legally designated representative is not asked for explicit data-processing consent.
- Data protection: name controllers and Irish and international recipients, coding, transfers and safeguards; pseudonymised or coded data are personal data, never 'anonymous'; realistic retention periods with their reason, consistent with R1, the protocol and S1; explain rights accurately without promising complete deletion where legal retention duties apply.
- Samples: type, amount, collection, purpose, storage location, retention, coding, recipients and destruction; return of results and incidental findings; commercial use. Broad consent only within a described disease, health or research area.
- Consent taker: the investigator or a registered medical practitioner, registered dentist or registered nurse designated by the investigator. Signature blocks for the participant or representative and the person taking consent, with date (and time where needed); submitted documents are blank and unsigned.
- Risks expressed consistently, with words and numbers where useful. The Ireland guides set no fixed frequency categories (DECISIONS.md D17).
- Payment wording never suggests payment is a benefit of treatment; instructions never pressure the participant or imply loss of ordinary care on refusal; respectful, person-centred language.
- Healthy volunteers: no therapeutic benefit claimed; unknown risk not minimised and prominent for first-in-human or novel-mechanism studies; screening failures, restrictions, reproductive precautions and repeat-volunteer checks covered.
- Participant templates (JSON): italic text, [square-bracket] notes, 'Drafting note' paragraphs, SAMPLE TEXT labels and '...........' gaps are drafting instructions or gaps; follow them and remove them. Part II forms (DOCX): yellow [INSERT/IF/OTHERWISE/CHOOSE/NOTE] labels. Nothing of either may remain in a final document.

## Study facts that decide which documents are needed

- population.adult_patients
- population.healthy_volunteers
- population.minors
- population.minors_age_bands
- population.age_16_17
- population.adults_without_capacity
- population.group_benefit_research_without_capacity
- consent.emergency_enrolment
- consent.impartial_witness_possible
- consent.electronic
- population.non_english_speakers
- recruitment.material_used
- recruitment.other_information_material
- endpoint_documents.participant_facing
- samples.collected
- samples.archive_used
- samples.future_use_outside_protocol
- data.future_use_outside_protocol
- genetics.optional_testing
- substudy.optional_consent
- screening.separate_consent
- pregnancy.participant_follow_up_beyond_main_consent
- pregnancy.partner_follow_up
- pregnancy.infant_follow_up
- radiation.requires_authorisation_or_notification
- contract.financial_arrangements_in_site_contract
- financial.other_arrangements
- insurance.state_indemnity
- data.hrcdc_declaration_needed
- sponsor.commercial
- sites.count

## Sources

- **IE-HUB**: https://trialagents.com/ctis/ireland/en
- **IE-PII-CHECKLIST**: https://trialagents.com/ctis/ireland/en/part-ii-document-checklist
- **IE-ICF**: https://trialagents.com/ctis/ireland/en/patient-information-consent-requirements
- **IE-QC**: https://trialagents.com/ctis/ireland/en/patient-facing-document-qc-checklist
- **IE-HV**: https://trialagents.com/ctis/ireland/en/healthy-volunteer-consent-requirements
- **IE-MINORS**: https://trialagents.com/ctis/ireland/en/minor-consent-assent-requirements
- **IE-CAPACITY**: https://trialagents.com/ctis/ireland/en/limited-capacity-legal-representative-consent-requirements
- **IE-EMERGENCY**: https://trialagents.com/ctis/ireland/en/emergency-enrollment-consent-requirements
- **IE-WITNESS**: https://trialagents.com/ctis/ireland/en/impartial-witness-consent-requirements
- **IE-PREGNANCY**: https://trialagents.com/ctis/ireland/en/pregnancy-follow-up-requirements
- **IE-SECONDARY**: https://trialagents.com/ctis/ireland/en/secondary-use-consent-requirements
