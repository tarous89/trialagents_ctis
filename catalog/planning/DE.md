---
id: DE
name: Germany – Part II planning checklist
part: II
country: DE
version: '1.0'
effective: '2026-11-27'
use_when: Part II documents for Germany.
reference: https://trialagents.com/ctis/germany/en
checked: '2026-11-27'
naming: Use the CTCG title for each document (see each row’s CTIS title); filename <study code>_<code>[_<variant>]_DE_<language>.
documents:
- code: K1_recruitment-arrangements
  name: Recruitment and informed consent procedure
  required: always
  languages:
  - de
  - en
  per: trial
  national_notes: 'CTIS title: K1_Recruitment arrangements. Signed at CTIS submission: no

    How potential participants are identified, approached, informed, given time to decide and consented; who conducts the consent interview; capacity, vulnerable populations, remote elements, interpreters and re-consent where relevant. Every population pathway in the plan (minors, adults without capacity, impartial witness, emergency) needs its section completed.

    Completed by: assistant

    CTIS Teil II, Abschnitt K. Pflichtdokument. Verwaltungsdokument: Deutsch oder Englisch zulässig; Antworten in dieser Vorlage auf Deutsch. Keine Unterschrift bei Einreichung. Grundlage: EudraLex-Vorlage „Recruitment and informed consent procedure“ Version 2.0 (gilt für neue Teil-II-Einreichungen ab 1. September 2026). Für jede Population mit eigenem Einwilligungsweg (Minderjährige, nicht Einwilligungsfähige, Notfall, unparteiischer Zeuge) den jeweiligen Abschnitt ausfüllen; Abschnitte 1.6, 2.3, 3.2, 4.4, 5.3 und 6.4 mit den deutschen Anforderungen nach §§ 40a, 40b AMG füllen (z. B. Aufklärung durch Prüfarzt/Ärztin, Ausdrückliche Einwilligung in die Datenverarbeitung nach § 40b Abs. 6 AMG, qualifizierte Übersetzungen bei nicht deutschsprachigen Teilnehmenden).

    Template basis: EudraLex Volume 10 recruitment and informed-consent procedure template, version 2.0 (applies to new Part II submissions from 1 September 2026, including initial applications, additional Member States and Article 11 completions)'
- code: K2_recruitment-material
  name: Recruitment material
  required: conditional
  condition: Advertisements, posters, social-media items, scripts, website views, audio or video texts or other material used to recruit participants.
  languages:
  - de
  per: trial
  national_notes: 'CTIS title: K2_Recruitment material_<type>_DE_de. Signed at CTIS submission: no

    Final blank form. Identify the study clearly without promotional claims about the medicine or the site; payment must not dominate. If a call centre is used, identify its role and submit the call script.

    Completed by: assistant'
- code: L1_SIS-ICF
  name: Participant information and informed consent form, one set per population
  variants:
  - adults
  - age-12-17
  - age-7-11
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
  - de
  per: population
  national_notes: 'CTIS title: L1_SIS and ICF_<population>_DE_de. Signed at CTIS submission: no

    Blank German information sheet and consent form for each population that can enter the trial. See population_sets for which sets the plan needs.

    Completed by: assistant'
- code: L2_other-subject-information
  name: Other information given before the participation decision
  required: conditional
  condition: Any additional leaflet or information material handed out with the consent package before the person decides.
  languages:
  - de
  per: trial
  national_notes: 'CTIS title: L2_Other subject information material_<type>_DE_de. Signed at CTIS submission: no

    Completed by: assistant'
- code: R2_patient-facing-document
  name: German translations of endpoint-related patient-facing documents
  required: conditional
  condition: Questionnaires, diaries, participant cards and similar documents related to primary or secondary endpoints. The English source goes with the protocol in Part I; the German translation goes in Part II (R area per the June 2026 Member State overview).
  languages:
  - de
  per: trial
  national_notes: 'CTIS title: R2_Patient-facing document_<type>_DE_de. Do not upload all operational participant materials by default; current EU guidance does not support requesting every patient-facing document or translation.

    Completed by: assistant (translation)'
- code: M1_CV
  name: Principal investigator CV
  required: always
  languages:
  - de
  - en
  per: site
  national_notes: 'CTIS title: M1_CV_<investigator>_<site>. Signed at CTIS submission: no

    Professional qualification, relevant clinical experience, trial experience and GCP knowledge. The German site template asks for a CV no more than one year old. Personal details come from the investigator; the assistant fills only trial fields.

    Completed by: investigator

    CTIS Teil II, Abschnitt M. Pflichtdokument je Hauptprüfer/in und Prüfstelle. Deutsch oder Englisch zulässig. EU-Lebenslaufvorlage empfohlen, nicht verpflichtend; Lebenslauf nicht älter als ein Jahr; muss Qualifikation, klinische Erfahrung, Prüfungserfahrung und GCP-Kenntnisse zeigen. Persönliche Angaben werden von der Prüferin bzw. dem Prüfer geliefert: der Assistent trägt nur Studienangaben ein und erfindet keine persönlichen Daten. Nachweise der regulatorischen Schulung (CTR, AMG, GCP) separat als „M2_Regulatory training_<Prüfer/in>_<Prüfstelle>“ einreichen.

    Template basis: EU CV template'
- code: M2_regulatory-training
  name: Regulatory-training certificates
  required: always
  languages:
  - de
  - en
  per: site
  national_notes: 'CTIS title: M2_Regulatory training_<investigator>_<site>. Signed at CTIS submission: no

    Evidence of training covering CTR, AMG and GCP according to the German curricular recommendations, current for the investigator''s role.

    Completed by: training provider'
- code: M2_DoI
  name: Declaration of interest
  required: always
  languages:
  - de
  - en
  per: site
  national_notes: 'CTIS title: M2_DoI_<investigator>_<site>. Signed at CTIS submission: no

    Completed by: investigator

    CTIS Teil II, Abschnitt M. Pflichtdokument je Hauptprüfer/in und Prüfstelle. Deutsch oder Englisch zulässig. EU-Vorlage empfohlen. Keine zusätzliche Unterschrift, sofern nicht von der Ethikkommission verlangt. Die Angaben zu Interessen liefert die Prüferin bzw. der Prüfer selbst; der Assistent trägt nur Studientitel und EU-Prüfungsnummer ein.

    Template basis: EU declaration-of-interest template'
- code: N1_site-suitability
  name: Site-suitability statement
  required: always
  languages:
  - de
  - en
  per: site
  national_notes: 'CTIS title: N1_Site suitability form_<site>. Signed at CTIS submission: no

    Head of institution or delegate approves internally; AKEK instructs not to include the signature in the CTIS upload.

    Completed by: assistant; site fields left empty for the site

    CTIS Teil II, Abschnitt N. Pflichtdokument, je Prüfstelle ein Dokument. Deutsch oder Englisch zulässig. Für Deutschland wird die aktuelle AKEK-Vorlage zur Eignung der Prüfstelle empfohlen; diese EU-Vorlage ist gleichwertig, wenn sie Anhang I Nr. 67 abdeckt. Leiter/in der Einrichtung oder Bevollmächtigte/r genehmigt intern; die Unterschrift NICHT in die in CTIS hochgeladene Fassung aufnehmen. Prüfstellenangaben (Name, Hauptprüfer/in, Teilnehmerzahl, Kennnummer) bleiben für das Prüfzentrum leer. Strahlenschutz: Falls eine Genehmigung nach § 31 StrlSchG nötig ist, die Unterlagen ebenfalls unter N hochladen.

    Template basis: EU site-suitability template (CTAG); the current AKEK Germany site-suitability template is the recommended alternative; either must cover Annex I point 67'
- code: N2_list-of-sites
  name: List of trial sites
  required: always
  languages:
  - de
  - en
  per: trial
  national_notes: 'CTIS title: N2_List of trial sites. CTIS must contain the planned German sites, principal investigators, roles and planned participant numbers. A separate list, if used, goes without signatures under suitability of facilities.

    Completed by: sponsor in CTIS'
- code: DE_radiation-authorisation-documentation-section-31-s
  name: Radiation authorisation documentation (section 31 StrlSchG)
  required: conditional
  condition: Medical exposure to ionising radiation or radioactive substances that requires a German authorisation or notification. Since 1 July 2025 routed through BfArM or PEI with the trial submission.
  languages:
  - de
  per: trial
  national_notes: 'CTIS title: N<next number>_Radiation authorisation_<procedure>_<site>. The exact file set depends on the radiation procedure. Confirm the current BfArM or PEI route before submission. The naming guide gives no fixed code; use the next free N number under suitability of facilities.

    Completed by: site / radiation protection'
- code: O1_insurance-certificate
  name: Trial-participant insurance certificate
  required: always
  languages:
  - de
  - en
  per: trial
  national_notes: 'CTIS title: O1_Trial participant insurance certificate_DE. Not needed if: trial.low_intervention and the German statutory conditions for other insurance are met

    No-fault trial-participant insurance proportionate to the risk, with at least EUR 500,000 per case of death or continuing incapacity for work. The certificate must identify the trial or clearly establish coverage in Germany.

    Completed by: insurer'
- code: O2_proof-of-coverage
  name: Insurance terms and conditions
  required: always
  languages:
  - de
  - en
  per: trial
  national_notes: 'CTIS title: O2_Proof of coverage_<sponsor or site>. Applicable policy terms. Participant documents must state the insurer, policy or reference number, contact route, main cover and participant obligations that affect a claim, matching these terms.

    Completed by: insurer'
- code: P1_compensation
  name: Participant compensation and reimbursement
  required: always
  languages:
  - de
  - en
  per: trial
  national_notes: 'CTIS title: P1_Compensation participants and financial arrangements_DE. Signed at CTIS submission: no

    Travel and expense reimbursement, inconvenience payments, prorating and any other payment. State clearly when no payment is offered.

    Completed by: assistant

    CTIS Teil II, Abschnitt P. Pflichtdokument als Erklärung, auch wenn keine Vergütung erfolgt (dann ausdrücklich angeben). Deutsch oder Englisch zulässig; keine Unterschrift. Bei Minderjährigen, nicht Einwilligungsfähigen und Stillenden nur Aufwandsentschädigung bzw. Verdienstausfall. Beträge und Bedingungen müssen mit der Patienteninformation übereinstimmen. Ein Vertragsentwurf Sponsor–Prüfstelle wird ggf. separat unter P2 eingereicht.

    Template basis: EU compensation template (CTAG), version 5, June 2023'
- code: P2_financial-arrangements
  name: Draft sponsor–site contract and other financial arrangements
  required: conditional
  condition: The draft contract with a German site contains the financial and operational arrangements assessed under Part II, or other agreements or a funding description apply.
  languages:
  - de
  - en
  per: site
  national_notes: 'CTIS title: P2_Financial arrangements_<site>. Signed at CTIS submission: no

    Completed by: sponsor legal'
- code: R1_data-protection
  name: GDPR and national data-protection compliance statement
  required: always
  languages:
  - de
  - en
  per: trial
  national_notes: 'CTIS title: R1_Compliance collection and use personal data_DE. Signed at CTIS submission: no

    Confirm compliance with GDPR and, for Germany, that national data-protection rules are respected where GDPR opening clauses apply. If the national point is not in the common statement, submit a separate Part II document.

    Completed by: assistant

    CTIS Teil II, Abschnitt R. Pflichtdokument. Deutsch oder Englisch zulässig; keine Unterschrift nach der CTR erforderlich. Für Deutschland zusätzlich bestätigen, dass nationale Datenschutzvorschriften beachtet werden, soweit die DSGVO Öffnungsklauseln enthält (siehe Einfügung unten).

    National additions to the form: - **r1 the sponsor declares**: Required in Germany: state in German that national data-protection rules are respected where GDPR opening clauses apply (BDSG; express consent to processing of health data under section 40b(6) AMG).

    Template basis: EudraLex GDPR statement, with a German national data-protection sentence added'
- code: S1_biological-samples
  name: Compliance with the use of biological samples
  required: conditional
  condition: The trial collects, stores, uses or transfers human biological samples.
  languages:
  - de
  - en
  per: trial
  national_notes: 'CTIS title: S1_Compliance collection use storage biological samples_DE. Signed at CTIS submission: no

    Completed by: assistant

    CTIS Teil II, Abschnitt S. Bedingt: nur einreichen, wenn biologische Proben entnommen, gelagert, verwendet oder übermittelt werden. Deutsch oder Englisch zulässig; keine Unterschrift. Angaben müssen mit Prüfplan, Probenplan, Patienteninformation und ggf. separater Information zur Sekundärnutzung übereinstimmen. Nutzung außerhalb des Prüfplans erfordert in Deutschland eine separate Information und Einwilligung (AKEK).

    Template basis: EudraLex biological-samples form'
---
# National rules – Germany

## Authorities and fee

- **competent authority**: BfArM or PEI (depending on the product); validates the application and issues the national decision
- **ethics**: Registered ethics committee assesses the Article 7 Part II elements; the authority's decision is bound by the ethics committee's Part II assessment
- **fee**: The federal authority levies one combined fee that includes the ethics-committee fee. Proof of fee is in the CTIS Forms section, not Part II; follow the authority's invoicing instructions.

## Language rules

- **participant documents**: de
- **administrative documents**:
  - de
  - en
- **rule**: Documents intended for the participant or legal representative must be in German (AMG). The application dossier itself may be German or English.
- **non german speakers**: If enrolment of people who do not understand German is planned, add a commitment to qualified translation and to communication in a language each participant and representative understands throughout the trial (AKEK, 15 June 2024). An interpreter does not replace translated documents for a planned language group.
- **form answers**: Part II forms (shared EU templates in content/eu/templates/part-ii) are answered in German; English is also accepted for administrative documents.

## Answer languages for forms

- de

## Populations, age bands and representatives

- **authority**: AKEK (Arbeitskreis Medizinischer Ethik-Kommissionen) guideline for ethics-committee review of participant information and consent, effective 9 April 2026; AMG sections 40a and 40b
- **minors**:
  - **age bands**:
    - **band**: 7-11
    - **template**: DE-PT-age-7-11
    - **reader**: child
    - **band**: 12-17
    - **template**: DE-PT-age-12-17
    - **reader**: adolescent
  - **always**:
    - DE-PT-parents
  - **reconsent at 18**: DE-PT-main or DE-PT-healthy, when participants can reach 18 during treatment or follow-up
  - **under 7**: No age-band template; inform the child in a form appropriate to age and document the information given and the child's response. An expressed refusal is decisive.
  - **note**: There is no fixed statutory assent age in Germany; bands are drafting bands. A minor with sufficient understanding signs their own written consent in addition to the legal representative.
- **adults without capacity**:
  - **always**:
    - DE-PT-legal-rep
    - DE-PT-limited-capacity
  - **note**: Group-benefit research additionally needs the prior written advance statement (AMG)
- **emergency**:
  - **always**:
    - DE-PT-emergency
  - **note**: Later legal-representative consent uses DE-PT-legal-rep when the participant stays unable to consent.
- **impartial witness**:
  - **always**:
    - DE-PT-witness
- **shareable templates**:
  - DE-PT-pregnant-partner
  - DE-PT-secondary
- **separate document rules**:
  - Optional use of samples or data outside the protocol always needs its own information and consent (DE-PT-secondary), separate from the main consent (AKEK).
  - A pregnant partner receives a separate document addressed to them; the enrolled participant cannot consent for the partner.
  - Re-consent of already enrolled participants after a material change: a short version-dated document on the change (AKEK).

## Drafting rules

- Participant documents: AKEK structure and model text are the baseline (AKEK Informed Consent review guideline, effective 9 April 2026). Add all study-specific information. Every deviation from the model text must be justified and visibly identifiable; record the justification as a finding for the reviewer.
- Structure the participant information into a short summary of at most two pages (visually highlighted), Part I on procedures and health aspects, and Part II on data protection and samples.
- Give risks by frequency where possible: very common (> 10 %), common (1–10 %), uncommon (0.1–1 %), rare (< 0.1 %).
- Separate study-specific procedures, risks and burdens from standard care.
- Name only the special categories of personal data actually processed, each with a study-specific lay justification and explicit consent.
- Express written or electronic consent to processing of personal and health data with the disclosures of section 40b(6) AMG.
- Consent interview by an investigator who is a physician or dentist, or a physician or dentist on the trial team.
- EU trial number and document version in the running footer; site letterhead on participant documents.
- Re-consent for enrolled participants after a material change: a short, version-dated document focused on the change; new participants get the updated full document with revisions marked for ethics review.
- Participant templates (JSON): italic text, [square-bracket] notes and "..........." gaps are drafting instructions or gaps; follow them and remove them. Part II templates (DOCX): yellow [EINFÜGEN/FALLS/AUSWAHL/HINWEIS: …] labels. Nothing of either may remain in a final document.

## Study facts that decide which documents are needed

- population.adult_patients
- population.healthy_volunteers
- population.minors
- population.minors_age_bands
- population.adults_without_capacity
- population.group_benefit_research_without_capacity
- consent.emergency_enrolment
- consent.impartial_witness_possible
- consent.electronic
- population.non_german_speakers
- recruitment.material_used
- recruitment.call_centre
- recruitment.other_information_material
- endpoint_documents.participant_facing
- samples.collected
- samples.archive_used
- samples.future_use_outside_protocol
- data.future_use_outside_protocol
- pregnancy.participant_follow_up_beyond_main_consent
- pregnancy.partner_follow_up
- pregnancy.infant_follow_up
- radiation.requires_authorisation_or_notification
- trial.low_intervention
- contract.financial_arrangements_in_site_contract
- sites.count

## Sources

- **DE-HUB**: https://trialagents.com/ctis/germany/en
- **DE-PII-CHECKLIST**: https://trialagents.com/ctis/germany/en/part-ii-document-checklist
- **DE-ICF**: https://trialagents.com/ctis/germany/en/patient-information-consent-requirements
- **DE-QC**: https://trialagents.com/ctis/germany/en/patient-facing-document-qc-checklist
- **DE-HV**: https://trialagents.com/ctis/germany/en/healthy-volunteer-consent-requirements
- **DE-MINORS**: https://trialagents.com/ctis/germany/en/minor-consent-assent-requirements
- **DE-CAPACITY**: https://trialagents.com/ctis/germany/en/limited-capacity-legal-representative-consent-requirements
- **DE-EMERGENCY**: https://trialagents.com/ctis/germany/en/emergency-enrollment-consent-requirements
- **DE-WITNESS**: https://trialagents.com/ctis/germany/en/impartial-witness-consent-requirements
- **DE-PREGNANCY**: https://trialagents.com/ctis/germany/en/pregnancy-follow-up-requirements
- **DE-SECONDARY**: https://trialagents.com/ctis/germany/en/secondary-use-consent-requirements
