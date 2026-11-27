---
id: 'NO'
name: Norway – Part II planning checklist
part: II
country: 'NO'
version: '1.0'
effective: '2026-11-27'
use_when: Part II documents for Norway.
reference: https://trialagents.com/ctis/norway/en
checked: '2026-11-27'
naming: Use the CTCG title for each document (see each row’s CTIS title); filename <study code>_<code>[_<variant>]_NO_<language>.
documents:
- code: K1_recruitment-arrangements
  name: Recruitment and informed consent procedure
  required: always
  languages:
  - en
  per: trial
  national_notes: 'CTIS title: K1_Recruitment arrangements. Signed at CTIS submission: no

    How participants are identified, approached, informed and consented; who gives the information and who obtains consent; every population pathway in the plan (incapacitated adults, minors, impartial witness, emergency); electronic consent and its secure identity solution where used; capacity assessment, representative verification, dissent and re-consent.

    National additions to the form: - **v100**: Norway: where health records are searched to identify candidates, state that the staff searching them have legal access to the records and describe any exemption from the duty of confidentiality that is requested (NO-QC section 7). Do not invent the legal basis; the sponsor or site provides it.

    - **v104**: Norway: name who identifies candidates, who gives the trial information and who obtains consent. The information-giver is a qualified member of the research group.

    - **v105**: Norway: recruitment advertisements, invitation texts, videos and other identification or recruitment material used in Norway are final Norwegian versions submitted in Part II (K2). Patient cards, thank-you cards and staff interview guides that do not identify or recruit participants are not submitted to REK KULMU.

    - **v107**: Norway: written and oral information before participation; enough time to consider and ask questions. REK KULMU treats the treating physician as having a dependent relationship with the patient, also where that physician is expected to treat the patient later, so another person obtains consent. The participant or legally designated representative and the person conducting the consent interview sign and date the approved form at consent; a copy is given.

    - **v108**: Norway: if electronic consent is used, state this and describe the secure identity solution (BankID or another two-factor authentication). Participant documents are in Norwegian; participants who need another language receive a translation that the sponsor ensures is accurate and corresponds to the approved Norwegian text (REK KULMU recommends a certified translator and does not assess translations).

    - **v110**: Norway: identify the legally designated representative under the law applicable in Norway and describe how the site confirms that authority; do not assume that the nearest relative or an accompanying person automatically has authority. The participant receives information adapted to their ability and takes part in the decision as far as possible; an explicit refusal or wish to withdraw is respected. Describe capacity assessment, how fluctuating capacity is documented, and that the participant''s own consent is obtained as soon as capacity returns. No incentives beyond participation-related expenses and loss of earnings.

    - **v111**: Norway: under 12 an age-appropriate Norwegian information leaflet (the child may sign as an expression of willingness, which is assent, not consent); 12 to 15 a Norwegian information form suited to ages 12 to 15 with assent sought and documented according to maturity; 16 and 17 the same information as an adult and the adolescent''s own consent in addition to the guardian or guardians.

    - **v113**: Norway: a participant enrolled before age 16 gives their own informed consent when they turn 16, before continued participation (16-17 document). Whether a further consent is needed at 18 is not stated in the guides (DECISIONS.md D9).

    - **v114**: Norway: consent from the guardian or guardians as applicable; confirm the authorised guardian for the individual case. An explicit wish to refuse or withdraw from a child who can form an opinion is respected and a guardian signature does not override it. No incentives or financial inducements beyond expenses and loss of earnings directly related to participation. Broad consent for future research is separate; from 16 a minor may consent to future research without guardian consent where it involves no bodily intervention; REK KULMU assesses inclusion of minors in future research case by case.

    - **v117**: Norway: the witness route applies when the participant or legally designated representative cannot read or cannot write; never for a language barrier (information in a language the person understands, qualified interpreter where needed) or lack of capacity (legally designated representative). The witness is independent of the trial, attends the whole discussion, and the witness''s name, role and relationship to the participant are recorded; for a remote discussion, describe how attendance, identity and signatures are verified. Interpreter role kept separate from the witness role.

    - **v121**: Norway: document how the investigator confirms the Article 35 conditions at the first intervention. Seek consent without undue delay from the participant or representative, whichever is available first; for minors and incapacitated participants from the legally designated representative, with information to both as soon as possible; the participant''s own consent as soon as capable. If consent is refused, further trial participation that depends on consent stops and the REK KULMU Norwegian information form on the right to object to use of data already obtained (Article 35(3)) is given. Name who makes the emergency-enrolment decision, what is recorded and how the representative is located.

    Completed by: assistant

    CTIS Part II section K. Mandatory. Answer in English (REK KULMU: Part II attachments other than consent forms and recruitment materials are English; the CTIS_NO variable sheet asked for Norwegian answers, the guide wins). No signature at submission. Use EU template v2.0. Complete the section for every population pathway in the plan and answer each ''no'' pathway with the template''s not-applicable answer. Put the Norwegian rules in the Member State fields (national_fields): consent not obtained by the treating physician, qualified information-giver from the research group, BankID or two-factor electronic consent, legally designated representative verified (not assumed to be the nearest relative), the under-12 / 12-15 / 16-17 pathways and own consent at 16, the witness rule, the Article 35(3) right-to-object form. Health-record screening: legal access and any requested exemption from confidentiality. Every K2 item must match the routes described here.

    Template basis: European Commission Recruitment and Informed Consent Procedure template v2.0; applies to new Part II submissions from 1 September 2026. Its procedure content is required; use of the exact template form is highly recommended; REK KULMU accepts another format that includes all requested information and meets CTR requirements.'
- code: K2_recruitment-material
  name: Recruitment materials
  required: conditional
  condition: Advertisements, invitation texts, videos and other material used to identify or recruit participants in Norway.
  languages:
  - 'no'
  per: trial
  national_notes: 'CTIS title: K2_Recruitment material_<type>_NO_no. Signed at CTIS submission: no

    Final Norwegian versions as they will be used. Payment must not be presented as the main reason to participate and risk must not be understated. Not submitted: patient cards, thank-you cards and staff interview guides that do not identify or recruit participants.

    Completed by: assistant

    CTIS del II, seksjon K. Betinget: bare når annonser, invitasjonstekster, videoer eller annet materiale brukes til å identifisere eller rekruttere deltakere; ett dokument per materiale. Endelig norsk versjon; ingen signatur ved innsending. Ingen mal: utarbeides fra protokollen og K1, og innholdet skal stemme med K1 og informasjonsskrivet. Betaling skal ikke fremstå som hovedgrunnen til å delta, og risiko skal ikke tones ned. Pasientkort, takkekort og intervjuguider for personalet som ikke identifiserer eller rekrutterer deltakere, sendes ikke inn.'
- code: L1_SIS-ICF
  name: Patient Information Sheet and Informed Consent Form, one set per population, plus the adapted documents for each consent pathway
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
  - right-to-object
  - secondary-use
  required: always
  languages:
  - 'no'
  per: population
  national_notes: 'CTIS title: L1_SIS and ICF_<population>_NO_no. Signed at CTIS submission: no

    Blank Norwegian information and consent for each population that can enter the trial and, conditionally, adapted Norwegian documents for guardians and minors, legally designated representatives and adults without capacity, emergency enrolment (including the Article 35(3) right-to-object form), impartial witness, pregnancy follow-up and optional future research (broad consent). Realistic dates for the end of the trial, the end of all research activity and data deletion at least 25 years after the end of the trial.

    Completed by: assistant

    CTIS del II, seksjon L (informasjonsskriv og samtykkeerklæring). Obligatorisk: ett blankt norsk sett per populasjon og per samtykkevei (se population_sets). Ingen signatur ved innsending; deltakeren eller representanten og personen som gjennomfører samtalen signerer og daterer ved samtykket, og deltakeren får en kopi. Skriv for lekfolk og tilpass teksten til den som skal samtykke; et skriv til representanten skal ikke henvende seg til representanten som om hen var deltakeren. Oppgi tre realistiske tidspunkter: End of Trial, avslutning av all forskningsaktivitet inkludert publisering, og et konkret slettings-/lagringsår minst 25 år etter End of Trial. Biologisk materiale: hva som samles inn, analyser, lagringstid, studiespesifikk forskningsbiobank (navn, sted, ansvarlig) og overføring til utlandet med land, lagringstid og destruksjon eller retur; materiale som lagres i Norge mer enn to måneder skal i en studiespesifikk biobank. Opplys om relevante interessekonflikter, kompensasjon og refusjon uten utilbørlig påvirkning, og erstatningsordningen (LAF-sertifikat; eventuell tilleggsforsikring). Ikke skriv at samtykket etter CTR er behandlingsgrunnlag etter GDPR; personverninformasjon etter DECISIONS.md D3. EU CT-nummer, tittel, versjon og dato synlige og identiske med CTIS. Valgfrie valg med egne daterte signaturfelt. Bredt samtykke til fremtidig forskning i eget skriv. Søkbar PDF, ikke skannet.'
- code: M1_CV
  name: Principal investigator curriculum vitae
  required: always
  languages:
  - en
  per: site
  national_notes: 'CTIS title: M1_CV_<investigator>_<site>. Signed at CTIS submission: no

    One CV per principal investigator at each Norwegian site. Shows clinical competence, previous clinical-trial experience, patient-care experience and GCP training. For new CTR applications, current ICH GCP E6(R3) competence is documented, or the CV confirms that training will be completed before participant recruitment. Personal details come from the investigator.

    Completed by: investigator

    CTIS Part II section M (investigator suitability). Mandatory, one per principal investigator and Norwegian site. English accepted. EU CV template recommended. Fill only the EU trial number; every personal field stays empty for the investigator. Check on receipt: clinical competence, previous trial experience, patient-care experience, GCP training, and current ICH GCP E6(R3) competence or confirmation that training will be completed before recruitment. No signature required at submission.

    Template basis: European Commission CV template (recommended by REK KULMU)'
- code: M2_DoI
  name: Declaration of interests
  required: always
  languages:
  - en
  per: site
  national_notes: 'CTIS title: M2_DoI_<investigator>_<site>. Signed at CTIS submission: no

    Financial interests, institutional affiliations and other circumstances that could affect impartiality, for each Norwegian principal investigator. Interests are declared by the investigator.

    Completed by: investigator

    CTIS Part II section M (investigator suitability). Mandatory, one per Norwegian principal investigator. English. EU template or another separate document. Fill only trial title and EU trial number; the investigator answers every interest question. REK KULMU lists no submission signature. Relevant interests must also be disclosed in the Norwegian participant information (NO-L1).

    Template basis: European Commission Declaration of Interest template, or another separate document (REK KULMU)'
- code: N1_site-suitability
  name: Site suitability form
  required: always
  languages:
  - en
  per: site
  national_notes: 'CTIS title: N1_Site suitability form_<site>. Signed at CTIS submission: no

    Site-specific description in English. Issued by the head of department, head of clinic or an equivalent institutional representative who is not the principal investigator. The form or another submitted document presents the project organisation and planned enrolment by site; an enrolment plan may be attached if site-level participant numbers are not stated elsewhere.

    National additions to the form: - **n1 issued by**: Norway: issued by the head of department, head of clinic or an equivalent institutional representative who is not the principal investigator; give name, position and organisation so that issuer and authority are clear. No signature needed at submission. Left for the site to complete; never invented.

    - **v125**: Norway: include, or refer to the document that gives, the project organisation and the planned enrolment at this site (DECISIONS.md D13).

    Completed by: assistant; site and issuer fields left empty for the site

    CTIS Part II section N (site suitability). Mandatory, one per Norwegian site. Answer in English. EU form recommended. Issuer: head of department, head of clinic or equivalent institutional representative, not the PI; issuer and authority must be clear; no signature at submission. Site details (name, PI, participant numbers, issuer) stay empty for the site. State the project organisation and planned enrolment by site here or in an attached enrolment plan.

    Template basis: European Commission Site Suitability Form (recommended by REK KULMU)'
- code: O1_insurance-certificate
  name: Insurance certificate from the Norwegian Medicines Liability Association (Legemiddelansvarsforeningen, LAF)
  required: always
  languages:
  - en
  - 'no'
  per: trial
  national_notes: 'CTIS title: O1_Trial participant insurance certificate_NO. A valid certificate issued by the Norwegian Medicines Liability Association under proof of insurance or indemnification. State whether the sponsor has additional trial-specific insurance (DECISIONS.md D11). The participant documents describe the injury coverage accurately and consistently.

    Completed by: Norwegian Medicines Liability Association (LAF); sponsor for the additional-insurance statement

    CTIS Part II section O (proof of insurance cover or indemnification). Mandatory. Certificate issued by the Norwegian Medicines Liability Association; only checked: valid, identifies the trial, covers the Norwegian part of the trial. Record whether the sponsor has additional trial-specific insurance and, if so, its documentation (DECISIONS.md D11). No added signature.'
- code: P1_compensation
  name: Compensation and expense reimbursement for trial participants
  required: always
  languages:
  - en
  per: trial
  national_notes: 'CTIS title: P1_Compensation participants and financial arrangements_NO. Signed at CTIS submission: no

    Any participant payment and reimbursement of expenses. Distinguish reimbursement and compensation for lost earnings from any incentive, especially for vulnerable participants. Minors, guardians, incapacitated adults and their representatives: nothing beyond expenses and loss of earnings directly related to participation. Healthy volunteers: amount, schedule and any pro rata payment after withdrawal; payment already earned is not lost by stopping. State clearly when no payment is offered.

    National additions to the form: - **f04**: Norway: if a monetary payment is offered, give amount, schedule and any pro rata payment after withdrawal, and show that it does not exert undue influence; keep it separate from reimbursement of expenses and lost earnings.

    Completed by: assistant

    CTIS Part II section P (compensation for trial participants). Mandatory. Answer in English; no signature. EU template recommended. Distinguish reimbursement and lost-earnings compensation from incentives; no incentives for minors, guardians, incapacitated adults or representatives. Amounts and conditions must match every Norwegian participant document. Funding and site payments go in NO-P2, not here.

    Template basis: European Commission compensation template (recommended by REK KULMU)'
- code: P2_financial-arrangements
  name: Financing and site arrangements (short description)
  required: always
  languages:
  - en
  per: trial
  national_notes: 'CTIS title: P2_Financial arrangements_NO. Signed at CTIS submission: no

    A short English description of the funding sources, what the funding covers and confirmation that the intervention period is financially secured, plus an overview of the agreements between the sponsor and the sites and any payment arrangements for sites or investigators. Do not upload the underlying agreements. Proof of fee payment belongs in Part I in Norway, including for substantial modifications.

    Completed by: sponsor (finance)

    CTIS Part II section P (financial and other arrangements). Mandatory. English, no signature. Supplied by the sponsor (no template; DECISIONS.md D12): funding sources, what they cover, confirmation that the intervention period is financially secured, overview of sponsor-site agreements and site or investigator payments. Check that no underlying contract is uploaded and that proof of payment is not placed here (Part I in Norway).'
- code: R1_data-protection
  name: GDPR compliance statement
  required: always
  languages:
  - en
  per: trial
  national_notes: 'CTIS title: R1_Compliance collection and use personal data_NO. Signed at CTIS submission: no

    English statement from the sponsor or the sponsor''s representative confirming that data collection and handling comply with the GDPR. State who issues the declaration and on whose behalf. The guides require no additional national data-protection sentence (DECISIONS.md D17).

    National additions to the form: - **r1 role in the sponsor**: Norway: state who issues the declaration and on whose behalf (the sponsor, or the sponsor''s representative acting for the named sponsor). Name and role come from the sponsor; never invented.

    - **r1 the sponsor declares**: Norway: no national data-protection statement is required by the guides; give the template''s not-applicable answer unless the user decides otherwise (DECISIONS.md D17).

    Completed by: assistant

    CTIS Part II section R (data protection). Mandatory. English; REK KULMU lists no submission signature. EU statement template. Name the issuer and the party represented. Keep it consistent with the privacy information in the participant documents: CTR consent is not presented as the GDPR legal basis.

    Template basis: European Commission statement of compliance with Regulation (EU) 2016/679 (GDPR)'
- code: S1_biological-samples
  name: Compliance with rules for biological samples
  required: conditional
  condition: Human biological material is collected, stored, analysed, imported or exported.
  languages:
  - en
  per: trial
  national_notes: 'CTIS title: S1_Compliance collection use storage biological samples_NO. Signed at CTIS submission: no

    Material, analyses, relationship to protocol endpoints, storage locations and periods, biobank details, cross-border movement and destruction or return plan. Samples kept in Norway more than two months after collection are stored in a study-specific biobank linked to the trial. Samples for optional future research are declared as a separate purpose; storage abroad beyond the trial states destination, purpose and safeguards; material for a Norwegian general biobank uses that biobank''s REK-approved consent.

    National additions to the form: - **f03**: Norway: state the study-specific biobank (name, institution, location, responsible person) when samples remain in Norway more than two months after collection; for export the country, purpose, storage period and destruction or return plan; for import the origin country and the plan for residual material; storage of endpoint samples ends when analyses and the active research period are complete; any retention for future use is a separate declared purpose with separate broad consent; storage abroad beyond the trial states destination, future-use purpose and safeguards (section 14 of the Norwegian Health Research Act and GDPR-equivalent privacy requirements, as REK KULMU links them); material placed in a Norwegian general biobank requires REK approval for all use and that biobank''s REK-approved consent.

    Completed by: assistant

    CTIS Part II section S. Conditional: only when human biological material is collected, stored, analysed, imported or exported. English; no signature. EU template recommended. Section 5 (f03) carries the Norwegian points. Every sample statement must match the protocol, the sample plan and every Norwegian participant document.

    Template basis: European Commission biological-samples template (recommended by REK KULMU)'
---
# National rules – Norway

## Authorities and fee

- **competent authority**: Norwegian Medical Products Agency (Direktoratet for medisinske produkter, DMP)
- **ethics**: REK KULMU (Etisk komité for klinisk utprøving av legemidler og medisinsk utstyr) assesses Part II on behalf of Norway and is responsible for the Norwegian Part II dossier.
- **fee**: Proof of payment belongs in Part I in Norway, including for substantial modifications; it is not a Part II document.

## Language rules

- **participant documents**: no
- **administrative documents**:
  - en
- **rule**: Part II attachments are in English, except informed consent forms (participant information and consent) and recruitment materials, which must be in Norwegian. Part I is generally English, but the protocol synopsis must be in Norwegian.
- **written standard**: The guides say 'Norwegian' only. They set no Nynorsk or Sami requirement. The supplied templates are Bokmål with language code 'no' (DECISIONS.md D1).
- **non norwegian speakers**: Potential participants receive material in a language they understand. REK KULMU does not ask to receive or assess foreign-language translations; the sponsor ensures that a translation is accurate and corresponds to the approved Norwegian text; REK KULMU recommends a certified translator (DECISIONS.md D16).
- **exception**: Other Part II documents stay English unless a justified participant-language document is needed (QC section 8).
- **form answers**: Part II forms (shared EU templates in content/eu/templates/part-ii) are answered in English. The CTIS_NO variable sheet targets Norwegian; the guide wins (templates/README.md).
- **by language**:
  - **en**:
    - NO-K1
    - NO-M1
    - NO-M2-DOI
    - NO-N1
    - NO-O1
    - NO-P1
    - NO-P2
    - NO-R1
    - NO-S1
  - **no**:
    - NO-K2
    - NO-L1
- **drafting notes language**: drafting_notes_en for the English administrative documents, drafting_notes_no for the Norwegian participant-facing documents.

## Answer languages for forms

- en
- no

## Populations, age bands and representatives

- **authority**: REK KULMU (Norwegian Ethics Committees for Clinical Trials on Medicinal Products and Medical Devices): Information to study participants and consent form; Inclusion of minors in research; Broad-consent forms; Recruitment (current guidance reviewed 29 August 2026); Templates: Norwegian CTR consent template 3 June 2026, under-12 and 12-to-15 templates 24 March 2026, Article 35(3) reservation-right form 24 March 2026, future-research templates 24 March 2026; Regulation (EU) No 536/2014 Articles 28 to 35. As recorded in the TrialAgents Norway guides reviewed 23 September 2026.
- **consent taker**: The information-giver is a qualified member of the research group. REK KULMU regards the treating physician (including a physician expected to treat the patient later) as having a dependent relationship with the patient, so another person obtains consent. The templates have separate confirmation blocks for 'information given' and 'consent given'.
- **minors**:
  - **age bands**:
    - **band**: under 12
    - **template**: NO-PT-age-6-11
    - **reader**: child
    - **legal role**: age-appropriate information; the child may sign as an expression of willingness (assent, not legal consent)
    - **band**: 12-15
    - **template**: NO-PT-age-12-15
    - **reader**: adolescent
    - **legal role**: information and documented assent according to maturity; the guardians give the legal consent
    - **band**: 16-17
    - **template**: NO-PT-age-16-17
    - **reader**: adolescent
    - **legal role**: same information as an adult; own consent in addition to the guardian or guardians
  - **always**:
    - NO-PT-parents
  - **turning 16**: A participant enrolled before 16 gives their own informed consent on turning 16, before continued participation (NO-PT-age-16-17).
  - **reconsent at 18**: Not stated in the Norway guides (DECISIONS.md D9). If chosen: NO-PT-main or NO-PT-healthy.
  - **guardians**: Consent from the guardian or guardians as applicable; confirm the authorised guardian for the individual case. The parents template keeps two signature blocks when two persons hold parental responsibility and one when one person holds it alone.
  - **dissent**: An explicit wish to refuse or withdraw from a child who can form an opinion is respected; a guardian signature does not override it.
  - **broad consent**: Minors should not generally be included in future research (REK KULMU, case by case). From 16, own broad consent without guardian consent where there is no bodily intervention.
  - **band conflicts**:
    - Children: file name and description 'age 6-11' vs REK KULMU band 'under 12' (template text already says under 12). Authority wins; file name kept as supplied.
    - 12-15 and 16-17 templates: description 'aged 12 - 17 years' vs REK KULMU bands 12-15 and 16-17. Authority wins; file names and text already follow it.
- **adults without capacity**:
  - **always**:
    - NO-PT-legal-rep
    - NO-PT-limited-capacity
  - **regained capacity**: NO-PT-main
  - **note**: Only under Article 31. The legally designated representative is identified under the law applicable in Norway and verified per case; not assumed to be the nearest relative. Dissent is respected. Own consent as soon as capacity returns; fluctuating capacity assessed and documented.
- **emergency**:
  - **always**:
    - NO-PT-emergency
    - NO-PT-withdrawal-notice
  - **note**: NO-PT-withdrawal-notice is given only when consent to continue is not obtained (Article 35(3)); it is still submitted in Part II with the emergency set. Representative path in NO-PT-emergency, or NO-PT-legal-rep when the participant stays unable to consent. Minors: DECISIONS.md D7.
- **impartial witness**:
  - **always**:
    - NO-PT-witness
  - **note**: Participant or representative cannot read or cannot write. Representative case: DECISIONS.md D8.
- **pregnancy**:
  - **participant**:
    - NO-PT-pregnancy
  - **partner**:
    - NO-PT-pregnant-partner
  - **note**: Keep participant and partner forms separate. Infant information needs the separate post-birth consent section.
- **secondary use**:
  - **always**:
    - NO-PT-secondary
  - **note**: Separate broad consent; general biobank in Norway uses that biobank's REK-approved consent (not a template here).
- **shareable templates**:
  - NO-PT-pregnant-partner
  - NO-PT-secondary
- **separate document rules**:
  - Optional future research (data or material beyond the trial objectives) always needs a separate Norwegian broad-consent form; it can never be a condition of participation (REK KULMU).
  - Optional substudies are described and consented in a separate document; a single optional procedure or analysis within the main trial uses a separate dated signature module (templates).
  - Participant and representative documents have distinct titles, versions and dates (limited-capacity guide).
  - A pregnant partner receives a separate document addressed to them; the participant cannot consent for the partner.
  - The Article 35(3) right-to-object letter is separate from the continued-participation consent; one separately addressed letter per recipient.
  - Guardian and minor versions are separate documents; the minor's versions carry no guardian signature fields.

## Drafting rules

- Participant documents: the REK KULMU national CTR template structure, as followed by the supplied templates, is the baseline. Add all study-specific information; record every deviation from the template text as a finding for the reviewer.
- Plain Norwegian (Bokmål, as the templates) for a lay reader, adapted to the person who consents; a representative or guardian document addresses that person and refers to the participant as the participant or the child.
- State three realistic dates: the expected end of the clinical trial (protocol definition), the expected date or year when all research activity including publication ends, and a concrete year for data deletion not earlier than 25 years after the end of the trial; consistent with the protocol and other documents.
- Biological samples: what is collected, analyses, storage period; any study-specific research biobank with location and responsible person or institution; export with destination country and storage period; destruction or return with date or year; storage in Norway beyond two months in a study-specific biobank.
- Do not present CTR consent as the GDPR legal basis for processing; keep consent to participation separate from data-protection information. Include the privacy points the guide lists (controllers, recipients, access, transfers, participant rights, privacy contact) as decided in DECISIONS.md D3.
- Explain what happens to data and samples after withdrawal without promising deletion where continued retention is required; after a refused emergency consent, give the Article 35(3) right-to-object letter and do not promise automatic destruction of all collected information.
- Disclose relevant conflicts of interest or connections; describe compensation and reimbursement without undue influence; describe the injury coverage accurately (LAF certificate; any additional trial-specific insurance).
- Contacts: whom to contact about the trial, injury, participant rights and privacy; the EU trial number and how results become available.
- Optional choices (optional procedures or analyses, GP contact, infant follow-up) each get their own dated signature module, never a pre-ticked box; future research and optional substudies get separate documents.
- Consent is obtained by a person without a dependent relationship (not the treating physician); the information-giver is a qualified member of the research group. Electronic consent only with secure identity verification (BankID or another two-factor method) described in K1.
- Version and date in the document identical to the CTIS structured data; EU trial number, title, version and date visible; searchable, copyable PDF rather than a scan.
- Participant templates (JSON): highlighted text, [square-bracket] notes, [Redaksjonsnote: ...] notes and alternatives are drafting instructions; follow and remove them. Part II templates (DOCX): yellow [INSERT/IF/OTHERWISE/CHOOSE/NOTE: ...] labels. Nothing of either may remain in a final document.

## Study facts that decide which documents are needed

- population.adult_patients
- population.healthy_volunteers
- population.minors
- population.minors_age_bands
- population.minors_turn_16_during_trial
- population.minors_turn_18_during_trial
- population.adults_without_capacity
- population.group_benefit_research_without_capacity
- population.capacity_may_return
- consent.emergency_enrolment
- consent.impartial_witness_possible
- consent.representative_cannot_read_or_write
- consent.electronic
- consent.remote_witness
- population.non_norwegian_speakers
- recruitment.material_used
- recruitment.health_record_screening
- endpoint_documents.participant_facing
- samples.collected
- samples.archive_used
- samples.import
- samples.export
- samples.stored_in_norway_over_two_months
- samples.future_use_outside_protocol
- samples.general_biobank_norway
- samples.future_storage_abroad
- data.future_use_outside_protocol
- data.transfer_outside_eea
- genetics.analysis
- pregnancy.participant_follow_up_beyond_main_consent
- pregnancy.partner_follow_up
- pregnancy.infant_follow_up
- trial.optional_substudy
- insurance.additional_trial_specific
- ctis.publication_applies
- application.rfi_response
- sites.count

## Sources

- **NO-HUB**: https://trialagents.com/ctis/norway/en
- **NO-PII-CHECKLIST**: https://trialagents.com/ctis/norway/en/part-ii-document-checklist
- **NO-ICF**: https://trialagents.com/ctis/norway/en/patient-information-consent-requirements
- **NO-QC**: https://trialagents.com/ctis/norway/en/patient-facing-document-qc-checklist
- **NO-HV**: https://trialagents.com/ctis/norway/en/healthy-volunteer-consent-requirements
- **NO-MINORS**: https://trialagents.com/ctis/norway/en/minor-consent-assent-requirements
- **NO-CAPACITY**: https://trialagents.com/ctis/norway/en/limited-capacity-legal-representative-consent-requirements
- **NO-EMERGENCY**: https://trialagents.com/ctis/norway/en/emergency-enrollment-consent-requirements
- **NO-WITNESS**: https://trialagents.com/ctis/norway/en/impartial-witness-consent-requirements
- **NO-PREGNANCY**: https://trialagents.com/ctis/norway/en/pregnancy-follow-up-requirements
- **NO-SECONDARY**: https://trialagents.com/ctis/norway/en/secondary-use-consent-requirements
- **NAMING**: https://trialagents.com/ctis/ctis-document-naming-convention
