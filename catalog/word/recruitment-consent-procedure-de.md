---
id: recruitment-consent-procedure-de
name: Recruitment and informed consent procedure (MedEthicsEU and CTAG template v2.0)
kind: form
doc_type: recruitment-arrangements
countries: [DE]
languages: [all]
version: 2.0
effective: 2026-01-01
use_when: "Part II recruitment arrangements and informed consent procedure for Germany. The harmonised MedEthicsEU and CTAG template, completed in English as provided; fill answers, never restyle."
slots:
  - id: kv101
    accepts: "text"
    required: true
    description: "Full title of the clinical trial, exactly as in the protocol."
  - id: kv102
    accepts: "text"
    required: true
    description: "EU clinical trial number (EU CT number), for example 2026-500123-45-00. Use a [[missing information]] mark if CTIS has not assigned it yet."
  - id: date
    accepts: "text"
    required: true
    description: "Date of this sponsor version of the form (it follows \"Version 1.0 / \"), in the form's language."
  - id: v01100
    accepts: "text"
    required: true
    description: "1.1 Specify how potential participants will be identified and if it involves access to identifiable information. (e.g. at the clinic/trial site, via referrals, publicising of the trial/advertisement, via access to identifiable information such as existing patient lists and medical records, or a combination of several methods)"
  - id: v01101
    accepts: "text"
    required: true
    description: "1.2 Specify what the first act of recruitment is. (e.g. approaching potential participants at the clinic, recruitment letter, posting of advertisement. CTR, Annex I, K59)"
  - id: v01102
    accepts: "text"
    required: true
    description: "1.3 If communication material (such as advertisement) is used for recruitment purposes, specify how the material will be used and why the material is necessary for recruiting the intended number of participants in this Member State. (Specify the format of the material, e.g. paper or electronic (digital form, AI tools, video and audio files), and how the material will be presented to potential participants e.g. via the post, in the clinic, through social media)"
  - id: v01103
    accepts: "text"
    required: true
    description: "1.4 In case communication material (such as advertisement) is used for recruitment purposes, specify the procedures in place for handling responses to the advertisements, including arrangements for information or advice to respondents found not to be suitable for inclusion in the clinical trial. (CTR, Annex I, K60)"
  - id: v01104
    accepts: "text"
    required: true
    description: "1.5 Specify who initially will be approaching potential participants regarding participation in the trial. (Specify the professional role and whether there is a prior clinical relationship with potential participants and/or if there is an external service provider for pre-screening of potential participants in place)"
  - id: v01105
    accepts: "text"
    required: true
    description: "1.6 Specify any additional information that is of relevance to the Member State applicable rules on recruitment procedure, e.g. specific national requirements and legislation. (It is recommended that you refer to national law and/or legal guidance to ensure that all required information has been provided)"
  - id: v01106
    accepts: "text"
    required: true
    description: "2.1 Specify the procedure for providing potential participants (or their legally designated representative, if applicable) with sufficient details on the trial to ensure that they have understood the information and can provide an informed consent. (Specify the various formats of information e.g. written, oral, video and if any information is given using decentralised methods. Specify who will provide the participant with the information (professional role, prior clinical relationship) and in what setting it is done. Specify how the interests and rights of the potential participants are safeguarded (e.g. right to withdraw, right to bring companion, privacy rights, time to consider participation))"
  - id: v01107
    accepts: "text"
    required: true
    description: "2.2 Specify the procedure for obtaining informed consent. (Specify when and where informed consent will be obtained, how privacy will be ensured, the professional role of the person obtaining the informed consent, whether there is a prior clinical relationship with the potential participant, and if there are any decentralised elements)"
  - id: v01108
    accepts: "text"
    required: true
    description: "2.3 Specify any additional information that is of relevance to the Member State applicable rules on informed consent procedure, e.g. specific national requirements and legislation. (It is recommended that you refer to national law and/or legal guidance to ensure that all required information has been provided)"
  - id: kv108
    accepts: "choice"
    required: true
    values: ["true", "false"]
    description: "Does the trial include incapacitated adults in this Member State (CTR Article 31)? \"true\" keeps section 3 with Yes ticked; \"false\" ticks No and shows N/A."
  - id: v01109
    accepts: "text"
    required: false
    description: "3.1 Specify how the potential participant will be involved in the decision to participate in the trial in a way that is adequate in view of their capacity. (This should include how information will be tailored to ensure participants are able to understand the information.) Only used when kv108 is \"true\"."
  - id: v01110
    accepts: "text"
    required: false
    description: "3.2 Specify any additional information that is of relevance to the Member State applicable rules on the procedure for inclusion of incapacitated adults e.g. designation of the legal representative or other specific national requirements and legislation. (It is recommended that you refer to national law and/or legal guidance to ensure that all required information has been provided) Only used when kv108 is \"true\"."
  - id: kv107
    accepts: "choice"
    required: true
    values: ["true", "false"]
    description: "Does the trial include minors in this Member State (CTR Article 32)? \"true\" keeps section 4 with Yes ticked; \"false\" ticks No and shows N/A."
  - id: v01111
    accepts: "text"
    required: false
    description: "4.1 Specify how the potential minor participant will be involved in the informed consent and/or assent procedure. (Specify appropriate arrangements for obtaining and recording assent) Only used when kv107 is \"true\"."
  - id: v01112
    accepts: "text"
    required: false
    description: "4.2 Specify who will obtain consent/assent from a minor participant. (Specify what kind of training and experience the members of the investigating team have in working with children) Only used when kv107 is \"true\"."
  - id: v01113
    accepts: "text"
    required: false
    description: "4.3 Specify the procedure for obtaining informed consent when the participant reach the age of legal competence. (See Question 9.4 in CTR Q&A) Only used when kv107 is \"true\"."
  - id: v01114
    accepts: "text"
    required: false
    description: "4.4 Specify any additional information that is of relevance to the Member State applicable rules on the procedure for inclusion of minors e.g. designation of the legal representative or other specific national requirements and legislation. (It is recommended that you refer to national law and/or legal guidance to ensure that all required information has been provided) Only used when kv107 is \"true\"."
  - id: kv109
    accepts: "choice"
    required: true
    values: ["true", "false"]
    description: "Might consent need to be witnessed by an impartial witness in this Member State (CTR Article 29, ICH E6(R3) 2.8.9)? \"true\" keeps section 5 with Yes ticked; \"false\" ticks No and shows N/A."
  - id: v01115
    accepts: "text"
    required: false
    description: "5.1 Specify why is it expected that an impartial witness might be required. Only used when kv109 is \"true\"."
  - id: v01116
    accepts: "text"
    required: false
    description: "5.2 Specify how an impartial witness will be selected and the procedure for involving the impartial witness in the informed consent situation. Only used when kv109 is \"true\"."
  - id: v01117
    accepts: "text"
    required: false
    description: "5.3 Specify any additional information that is of relevance to the Member State applicable rules on the procedure for clinical trials where consent witnessed by an impartial witness will occur e.g. specific national requirements and legislation. (It is recommended that you refer to national law and/or legal guidance to ensure that all required information has been provided) Only used when kv109 is \"true\"."
  - id: kv110
    accepts: "choice"
    required: true
    values: ["true", "false"]
    description: "Does the trial include participants in emergency situations in this Member State (CTR Article 35)? \"true\" keeps section 6 with Yes ticked; \"false\" ticks No and shows N/A."
  - id: v01118
    accepts: "text"
    required: false
    description: "6.1 Specify why it would not be possible to obtain informed consent from potential participants or a legal representative prior to enrolment into the clinical trial. Only used when kv110 is \"true\"."
  - id: v01119
    accepts: "text"
    required: false
    description: "6.2 Specify the arrangements in place for obtaining informed consent from the participant or from a legal representative, whichever can be obtained soonest. (Where a legal representative is expected to be required due to the participant not having capacity to consent, please also complete section 3 and 4 (if relevant) of this document) Only used when kv110 is \"true\"."
  - id: v01120
    accepts: "text"
    required: false
    description: "6.3 If the participant regains capacity, specify how the informed consent will be obtained from the participant in situations where the legally designated representative initially provided the informed consent. Only used when kv110 is \"true\"."
  - id: v01121
    accepts: "text"
    required: false
    description: "6.4 Specify any additional information that is of relevance to the Member State applicable rules on the procedure for inclusion of participants in emergency situations e.g. designation of the legal representative or other specific national requirements and legislation. (It is recommended that you refer to national law and/or legal guidance to ensure that all required information has been provided) Only used when kv110 is \"true\"."
---
Answers go in the boxes under each question. Sections 1 and 2 apply to all trials. Sections 3 to 6 are switched on or off with kv108, kv107, kv109 and kv110; a section switched off keeps the question and shows N/A. Write answers in full sentences; use [[...]] for information you do not have.
