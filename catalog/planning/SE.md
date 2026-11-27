---
id: SE
name: Sweden – Part II planning checklist
part: II
country: SE
version: '1.0'
effective: '2026-11-27'
use_when: Part II documents for Sweden.
reference: https://trialagents.com/ctis/sweden/en
checked: '2026-11-27'
naming: Use the CTCG title for each document (see each row’s CTIS title); filename <study code>_<code>[_<variant>]_SE_<language>.
documents:
- code: K1_recruitment-arrangements
  name: Recruitment and informed consent procedure
  required: always
  languages:
  - sv
  per: trial
  national_notes: 'CTIS title: K1_Recruitment arrangements_SE_sv. Not needed if: recruitment.procedure_fully_in_protocol (the required information is already in the protocol; DECISIONS.md D2)

    Signed at CTIS submission: no

    Describe how potential participants are identified and what constitutes the first act of recruitment in Sweden, and the consent procedure, covering the current v2.0 fields and the Sweden-specific requirements in Swedish. Reference to protocol sections (with protocol version) is allowed. Annex I point 62 expects the emergency consent procedure and the impartial-witness procedure to be described where those pathways apply.

    National additions to the form: - **v105**: Sweden: recruitment advertisements and all participant-facing material are in Swedish (Läkemedelsverket); describe the first act of recruitment in Sweden.

    - **v108**: Sweden: written consent, dated and signed by the participant (or the legally designated representative) and by the person who gives the information. Under HSLF-FS 2021:109 the person responsible for obtaining informed consent also conducts the Article 29 interview; the normal rule is a licensed physician or licensed dentist. Another healthcare professional only where Läkemedelsverket permits it for special reasons, justified in the protocol. The signed consent and written information are retained at the site; a copy goes to the participant or representative.

    - **v110**: Sweden: the legally designated representative is a god man or förvaltare appointed under the Parental Code (föräldrabalken) whose authority covers the person''s personal matters. Separate Swedish information and consent for the representative and information adapted to the participant''s ability to understand; the participant is involved as far as possible and an explicit wish to refuse or withdraw is respected; no incentives beyond compensation for expenses and loss of earnings; describe how capacity is reassessed and how the participant moves to own consent when able.

    - **v113**: Sweden: a participant who turns 15 during the trial and understands what participation means gives explicit own informed consent before continued participation. A participant who has given valid own consent after age 15 does not need new consent solely because they turn 18 during the same trial (Läkemedelsverket); a protocol amendment or new risk information may still require re-consent.

    - **v114**: Sweden: the guardians (vårdnadshavare) are the legally designated representatives of a minor; where there are two guardians both sign and date before any study-related procedure, not necessarily at the same time; in an urgent situation the absent guardian''s consent may be transmitted digitally (for example by email) with subsequent confirmation of the original consent, which is not Article 35 emergency enrolment. A minor who has turned 15 and understands what participation means also gives own informed consent (Medicinal Products Act 2015:315 as amended by SFS 2026:497). Minors under 15 receive information adapted to age and mental maturity from an investigator or trial-team member trained or experienced in working with children; an explicit refusal by a minor able to form an opinion is respected.

    - **v117**: Sweden: the impartial-witness route applies only when a participant able to decide cannot write or cannot sign; not for interpreter needs, limited health literacy or a site''s wish for a second signature. At least one witness independent of the trial is present; describe how the witness is selected, what the witness observes, which document the witness dates and signs, how the investigator documents the reason and how the participant receives a copy.

    - **v121**: Sweden: all Article 35 conditions. Consent for continued participation is sought as soon as possible. For minors and adults without capacity, inform the participant and the legally designated representative as soon as possible and obtain the representative''s consent; for others, inform the participant or representative, whichever is reached first, and if the representative consents first obtain the participant''s own consent as soon as the participant is able. If consent is not given, inform the person of the right to object to use of data already collected. The licensed physician or dentist rule applies; a different healthcare professional (for example during ambulance transport) only with a Läkemedelsverket exception justified in the protocol.

    Completed by: assistant

    CTIS del II, avsnitt K. Obligatoriskt, utom när de uppgifter som krävs redan finns i protokollet (DECISIONS.md D2). Svenska (bilaga I punkterna 59–73 ska vara på svenska). Ingen underskrift vid inlämning. Använd EU-mallen v2.0, som gäller nya del II-inlämningar från den 1 september 2026; Läkemedelsverkets svenska mall för rekryterings- och samtyckesförfarandet är ett likvärdigt alternativ (D1). Hänvisning till protokollavsnitt med protokollversion är tillåten. Beskriv hur potentiella försökspersoner identifieras och vad som utgör den första rekryteringsåtgärden i Sverige. Fyll i avsnittet för varje inkluderingsväg i planen (beslutsoförmögna vuxna, minderåriga, opartiskt vittne, nödsituation) och besvara övriga med mallens svar för ej tillämpligt. Ange de svenska kraven i medlemsstatsfälten (national_fields): legitimerad läkare eller legitimerad tandläkare genomför informationssamtalet och inhämtar samtycket (HSLF-FS 2021:109), eget samtycke från 15 år, båda vårdnadshavarnas underskrift, god man eller förvaltare som lagligen utsedd ställföreträdare och vittnesvägen endast när försökspersonen inte kan skriva eller underteckna. Rekryteringsvägarna ska stämma med varje K2-material.

    Template basis: European Commission Recruitment and Informed Consent Procedure template v2.0 (adopted January 2026); applies to new Part II submissions from 1 September 2026. Läkemedelsverket also lists a Swedish recruitment and consent procedure template; use of the exact EU or Swedish template format is recommended (Commission Sweden overview).'
- code: K2_recruitment-material
  name: Recruitment material
  required: conditional
  condition: Recruitment material such as advertisements will be used; it must then be attached.
  languages:
  - sv
  per: trial
  national_notes: 'CTIS title: K2_Recruitment material_<type>_SE_sv. Signed at CTIS submission: no

    Final Swedish material as it will be used. Consistent with K1, the participant information and P1.

    Completed by: assistant

    CTIS del II, avsnitt K. Villkorat: endast när rekryteringsmaterial, till exempel annonser, används; ett dokument per material. Svenska. Inget krav på underskrift. Ingen mall: utforma materialet utifrån protokollet och K1. Innehållet ska stämma med K1, deltagarinformationen och P1, och ersättning får inte framställas som en nytta som påverkar frivilligheten.'
- code: L1_SIS-ICF
  name: Participant information sheet and informed consent form, one set per population
  variants:
  - adults
  - age-12-14
  - age-15-17
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
  - sv
  per: population
  national_notes: 'CTIS title: L1_SIS and ICF_<population>_SE_sv. Signed at CTIS submission: no

    Swedish participant information and blank consent form for each population that will be recruited, with separate age-specific or situation-specific documents when the consent process differs (see population_sets). Must explain purpose; expected benefits, consequences, risks and inconveniences; rights and protections; right to refuse; right to withdraw at any time without negative consequences and without giving a reason; conduct and duration; treatment alternatives where relevant; follow-up if participation stops; right to compensation for trial-related injury; the EU trial number and how results can be found in the EU database; contacts for trial questions, medical issues and rights or complaints.

    Completed by: assistant

    CTIS del II, avsnitt L. Obligatoriskt: ett set per population som rekryteras, med svensk deltagarinformation och blankt samtyckesformulär, och separata ålders- eller situationsspecifika dokument när samtyckesförfarandet skiljer sig (se population_sets). Svenska. Ingen underskrift vid inlämning; underskrifter och datum läggs till när samtycket inhämtas före prövningsspecifika åtgärder, utom vid inkludering i nödsituation enligt artikel 35. Det finns ingen allmän nationell mall; Etikprövningsmyndigheten hänvisar till Kliniska Studier Sveriges mall, som de levererade mallarna bygger på. Samtyckesdelen har fält för underskrift och datum för försökspersonen eller den lagligen utsedda ställföreträdaren och för den som lämnat informationen (legitimerad läkare eller legitimerad tandläkare, eller annan hälso- och sjukvårdspersonal enligt undantag från Läkemedelsverket). Ange EU-prövningsnummer och hur resultaten senare kan hittas i EU-databasen. Kontrollerade versionsnummer och datum som stämmer med hänvisningarna i protokollet och K1.'
- code: L2_other-subject-information
  name: Other participant-facing information
  required: conditional
  condition: Diaries, information leaflets, cards, instructions, questionnaires or other materials that provide information to participants or legal representatives and form part of the participant-facing trial process.
  languages:
  - sv
  per: trial
  national_notes: 'CTIS title: L2_Other subject information material_<type>_SE_sv. Signed at CTIS submission: no

    Swedish when directed to Swedish participants; Läkemedelsverket expects participant-directed questionnaires and other subject-directed material to be Swedish.

    Completed by: assistant

    CTIS del II, avsnitt L. Villkorat: dagböcker, informationsblad, kort, instruktioner, frågeformulär eller annat material som ger information till försökspersoner eller ställföreträdare och ingår i prövningsförfarandet; ett dokument per material. Svenska när materialet riktar sig till svenska försökspersoner. Normalt ingen underskrift; innehåller materialet ett samtyckes- eller bekräftelseavsnitt lämnas det in blankt och underskrifterna inhämtas under prövningen. Ingen mall. Innehållet får inte motsäga deltagarinformationen eller protokollet.'
- code: M1_CV
  name: Investigator CV (investigator suitability)
  required: always
  languages:
  - sv
  per: site
  national_notes: 'CTIS title: M1_CV_<investigator>_<site>_SE_sv. Current information showing that each responsible investigator is qualified by education, Good Clinical Practice training, clinical trial experience and patient-care experience appropriate to the trial. Personal details come from the investigator; the assistant fills only trial fields.

    Completed by: investigator

    CTIS del II, avsnitt M. Obligatoriskt, ett per ansvarig prövare och svenskt prövningsställe. Svenska enligt språkregeln för bilaga I punkterna 59–73. Läkemedelsverket anger mallen ”Prövarens CV”, som inte har levererats (D1); EU:s CV-mall används tills vidare. Assistenten fyller endast i prövningsuppgifterna (EU-prövningsnummer); alla personliga fält lämnas tomma för prövaren. CV:t ska visa utbildning, GCP-utbildning samt erfarenhet av kliniska prövningar och patientvård som är relevant för prövningen. Inget allmänt krav på våtbläcksunderskrift; följ mallens fält och anvisningar.

    Template basis: EU CV template (EU Clinical Trials Expert Group). Läkemedelsverket lists a Swedish national template for this area (Prövarens CV); it was not supplied, so the shared EU form is bound until the user supplies it (DECISIONS.md D1).'
- code: M2_DoI
  name: Declaration of interests
  required: always
  languages:
  - sv
  per: site
  national_notes: 'CTIS title: M2_DoI_<investigator>_<site>_SE_sv. Financial interests and institutional affiliations that could affect the investigator''s impartiality, declared by the investigator.

    Completed by: investigator

    CTIS del II, avsnitt M. Obligatoriskt, ett per ansvarig prövare och prövningsställe. Svenska. Läkemedelsverket anger mallen ”Deklaration av intressekonflikter”, som inte har levererats (D1); EU-mallen används tills vidare. Assistenten fyller endast i prövningens titel och EU-prövningsnummer; prövaren besvarar själv frågorna om ekonomiska intressen och institutionell anknytning. Underskrift och datum enligt mallens aktuella anvisningar.

    Template basis: EU declaration-of-interest template (EU Clinical Trials Expert Group). Läkemedelsverket lists a Swedish national template for this area (Deklaration av intressekonflikter); it was not supplied, so the shared EU form is bound until the user supplies it (DECISIONS.md D1).'
- code: N1_site-suitability
  name: Site suitability
  required: always
  languages:
  - sv
  per: site
  national_notes: 'CTIS title: N1_Site suitability form_<site>_SE_sv. Signed at CTIS submission: yes

    Written justification covering facilities, equipment, staffing and expertise, specific to this protocol. One per Swedish trial site.

    National additions to the form: - **n1 issued by**: Sweden: the statement is obtained from the head of the clinic or institution (verksamhetschef) or another responsible person according to the applicable arrangement; the template''s signature or approval fields are completed by that person before upload. Leave them empty in the draft.

    Completed by: assistant; site fields and the issuer''s approval fields left empty for the site

    CTIS del II, avsnitt N. Obligatoriskt, ett per svenskt prövningsställe. Svenska. Läkemedelsverket anger mallen ”Prövningsställets lämplighet”, som inte har levererats (D1); EU-mallen används tills vidare. Skriftlig motivering som täcker lokaler, utrustning, personal och kompetens, anpassad till protokollet. Utlåtandet utfärdas av verksamhetschefen för kliniken eller institutionen, eller av annan ansvarig person enligt gällande ordning; använd mallens fält för underskrift eller godkännande (avsnitt 3), som fylls i av den personen och inte av assistenten. Prövningsställets uppgifter (namn, ansvarig prövare, planerat antal försökspersoner, ID-nummer) lämnas tomma för prövningsstället.

    Template basis: EU site-suitability template (CTAG); covers Annex I point 67. Läkemedelsverket lists a Swedish national template for this area (Prövningsställets lämplighet); it was not supplied, so the shared EU form is bound until the user supplies it (DECISIONS.md D1).'
- code: O1_insurance-certificate
  name: 'Insurance or indemnification: documentation of the applicable participant protection'
  required: always
  languages:
  - en
  - sv
  per: trial
  national_notes: 'CTIS title: O1_Trial participant insurance certificate_SE_sv. Signed at CTIS submission: no

    Swedish law (Medicinal Products Act 2015:315) requires the sponsor to ensure, through insurance or another arrangement, that a participant can receive compensation where the sponsor or investigator becomes liable; the protection must match the nature and extent of the risk. Läkemedelsverket asks for documentation of the applicable participant protection. The participant information must explain the right to compensation for injury consistently.

    Completed by: insurer / sponsor

    CTIS del II, avsnitt O. Obligatoriskt i sak: sponsorn ska genom försäkring eller annan ordning säkerställa att en försöksperson kan få ersättning när sponsorn eller prövaren blir skadeståndsskyldig, och skyddet ska motsvara riskens art och omfattning (läkemedelslagen 2015:315). Lämna dokumentation av det skydd som gäller för försökspersonerna. Beskrivningen av den svenska försäkringsordningen ska vara på svenska; ett försäkringsbevis på engelska från försäkringsgivaren kan bifogas där myndighetens vägledning godtar det (D5). Ingen underskrift av försöksperson eller prövare. Utfärdas av försäkringsgivaren eller sponsorn och kontrolleras endast. Deltagarinformationen ska beskriva rätten till ersättning vid skada på samma sätt.'
- code: O2_proof-of-coverage
  name: Proof of other coverage (for example sponsor-specific clinical trial insurance)
  required: conditional
  condition: Other coverage is relevant, for example a sponsor-specific clinical trial insurance in addition to the documentation in O1 (DECISIONS.md D6).
  languages:
  - en
  - sv
  per: trial
  national_notes: 'CTIS title: O2_Proof of coverage_<sponsor or site>_SE_sv. Signed at CTIS submission: no

    Issued insurer or coverage documentation; insurer, cover and contacts must match every participant document.

    Completed by: insurer

    CTIS del II, avsnitt O. Villkorat: bevis på annan täckning där det är relevant, till exempel en sponsorspecifik försäkring för klinisk prövning (D6). Språk och underskrift som för O1. Utfärdas av försäkringsgivaren och kontrolleras endast; försäkringsgivare, skydd och kontaktvägar ska stämma med varje deltagardokument.'
- code: P1_compensation
  name: 'Financial and other arrangements: compensation of participants, investigators and sites, funding'
  required: always
  languages:
  - sv
  per: trial
  national_notes: 'CTIS title: P1_Compensation participants and financial arrangements_SE_sv. Signed at CTIS submission: no

    Trial financing and payments or compensation to participants, investigators and sites; other relevant sponsor-site financial arrangements. State explicitly when no participant compensation is offered.

    Completed by: assistant

    CTIS del II, avsnitt P. Obligatoriskt. Svenska. Inget allmänt krav på underskrift. Beskriv prövningens finansiering, betalningar eller ersättning till försökspersoner, prövare och prövningsställen samt andra relevanta ekonomiska arrangemang mellan sponsor och prövningsställe. Läkemedelsverket anger mallen ”Ersättning för deltagande i klinisk prövning” för ersättning till försökspersoner (inte levererad, D1); EU:s ersättningsmall används tills vidare. Finansiering och ersättning till prövare och prövningsställen ryms inte i EU-mallen (D3). Ange uttryckligen om ingen ersättning ges. Belopp och villkor ska vara identiska med deltagarinformationen. Till beslutsoförmögna försökspersoner och deras ställföreträdare (och till minderåriga) ges inga incitament utöver ersättning för utgifter och inkomstbortfall som är direkt kopplade till deltagandet. Ersättning får inte framställas som en nytta som påverkar frivilligheten.

    Template basis: EU compensation template (CTAG), for participant compensation. Läkemedelsverket lists a Swedish national template for this area (Ersättning för deltagande i klinisk prövning); it was not supplied, so the shared EU form is bound until the user supplies it (DECISIONS.md D1).'
- code: SE_proof-of-fee-or-swedish-invoicing-information
  name: Proof of fee or Swedish invoicing information
  required: conditional
  condition: 'According to the national fee process: follow the current Läkemedelsverket instructions for the fee-related document and invoicing information placed in CTIS.'
  languages:
  - sv
  per: trial
  national_notes: 'CTIS title: Proof of payment of fee_SE_sv. Signed at CTIS submission: no

    Fee-related document and invoicing information as instructed by Läkemedelsverket.

    Completed by: sponsor (Läkemedelsverket fee and invoicing instructions)

    Villkorat enligt den nationella avgiftsprocessen. Följ Läkemedelsverkets aktuella anvisningar för avgiftsdokumentet och faktureringsuppgifterna i CTIS. Svenska, eftersom bilaga I punkt 72 omfattas av den svenska språkregeln, om inte myndighetens formulär anger annat. Ingen underskrift av försöksperson eller prövare. CTCG:s namnguide använder inte avsnitt Q; avgiftsbeviset laddas upp i CTIS formuläravsnitt eller där Läkemedelsverket anvisar (D4). Sponsorn tillhandahåller dokumentet; det kontrolleras endast.'
- code: R1_data-protection
  name: Statement on compliance with national requirements for the collection and use of personal data
  required: always
  languages:
  - sv
  per: trial
  national_notes: 'CTIS title: R1_Compliance collection and use personal data_SE_sv. Signed at CTIS submission: no

    Part II statement (Annex I point 73) on compliance with national requirements for the collection and use of personal data, in Swedish. Läkemedelsverket also references the EU GDPR compliance template for the CTIS Form section; an English Form-section statement is not a substitute for this Swedish Part II item.

    National additions to the form: - **r1 the sponsor declares**: Required in Sweden: state in Swedish that the national Swedish requirements for the collection and use of personal data are complied with (Annex I point 73). The Sweden guides name no specific national provision; do not add one from memory (DECISIONS.md D11).

    Completed by: assistant

    CTIS del II, avsnitt R. Obligatoriskt. Svenska: del II-uttalandet om efterlevnad av nationella krav för insamling och användning av personuppgifter (bilaga I punkt 73) omfattas av den svenska språkregeln. Ett engelskt GDPR-uttalande i CTIS formuläravsnitt ersätter inte den svenska del II-handlingen. Ingen underskrift av försöksperson; formulärets fält för datum, namn och roll fylls i för sponsorn. Lägg till den nationella bekräftelsen (national_fields) utan att ange lagrum som inte finns i källorna (D11).

    Template basis: European Commission GDPR compliance statement, answered in Swedish, with the Swedish national compliance statement added.'
- code: S1_biological-samples
  name: Biological-sample compliance
  required: conditional
  condition: Biological samples are collected, stored or used in a way that requires the CTIS biological-sample compliance document.
  languages:
  - sv
  per: trial
  national_notes: 'CTIS title: S1_Compliance collection use storage biological samples_SE_sv. Signed at CTIS submission: no

    If the Swedish Biobank Act applies, the CTIS document is not the whole national process: a parallel biobank application may also be needed and should be prepared early (outside_part_ii SE-BIOBANK).

    National additions to the form: - **f03**: Sweden: state whether the Biobank Act (2023:38) applies and, if so, the responsible Swedish biobank and the parallel biobank process (early contact with the Regional Biobank Centre; for regional biobanks an unsigned biobank application can be sent in parallel when the application is registered in CTIS; the final biobank agreement takes effect only after the required sponsor and biobank approvals and signatures). Samples may be used in accordance with the authorised CTR application only when it describes their collection, storage and use; a new purpose outside the earlier information and consent needs information and consent for that purpose; consent to retention or use can be withdrawn or restricted, with destruction or de-identification as the Act provides.

    Completed by: assistant

    CTIS del II, avsnitt S. Villkorat: när biologiska prov samlas in, lagras eller används. Svenska. Läkemedelsverket anger mallen ”Följsamhet med regler för hantering av biologiska prov”, som inte har levererats (D1); EU-mallen används tills vidare. Ingen underskrift av försöksperson; samtycke till provanvändning hanteras i deltagarinformationen. Om biobankslagen (2023:38) är tillämplig är CTIS-dokumentet inte hela den nationella processen: ta tidigt kontakt med Regionalt biobankscentrum och förbered en parallell biobanksansökan. Ansökan ska beskriva insamling, lagring och användning av proven, eftersom användningen enligt biobankslagen knyts till den godkända CTR-ansökan. Uppgifterna ska stämma med protokollet, deltagarinformationen, R1 och biobanksansökan.

    Template basis: European Commission biological-samples form. Läkemedelsverket lists a Swedish national template for this area (Följsamhet med regler för hantering av biologiska prov); it was not supplied, so the shared EU form is bound until the user supplies it (DECISIONS.md D1).'
---
# National rules – Sweden

## Authorities and fee

- **competent authority**: Läkemedelsverket (Swedish Medical Products Agency): competent authority
- **ethics**: Etikprövningsmyndigheten (Swedish Ethical Review Authority) performs the ethical review. The sponsor does not submit a separate clinical trial ethics application outside CTIS.
- **biobank**: When biological samples fall within the Biobank Act (2023:38), a Regional Biobank Centre may contribute to the review and a separate biobank process may be needed in parallel (Biobank Sweden).
- **fee**: Follow the current Läkemedelsverket instructions for the fee-related document and invoicing information placed in CTIS (SE-FEE); prepared in Swedish unless the authority form specifies otherwise.
- **consent professional role**: HSLF-FS 2021:109: a licensed physician or licensed dentist conducts the Article 29 interview and obtains consent; Läkemedelsverket can permit another healthcare professional for special reasons justified in the protocol.

## Language rules

- **participant documents**: sv
- **administrative documents**:
  - sv
- **rule**: Swedish law (Medical Products Ordinance 2015:458) requires the information corresponding to Annex I points 59 to 73 to be in Swedish, and the protocol synopsis under point 24 (Part I) too. Participant-facing information, recruitment material and participant-directed questionnaires are Swedish. Do not rely on an English multinational Part II set.
- **insurance**: The description of the Swedish insurance arrangement is in Swedish; an insurer-issued certificate in English may be attached where accepted by the authority guidance (SE-O1, SE-O2).
- **fee**: Swedish unless the authority form itself specifies otherwise (SE-FEE).
- **gdpr forms section**: An English GDPR statement in the CTIS Form section does not replace the Swedish Part II R1 item.
- **multinational**: Maintain master content centrally and create a controlled Swedish country version for every affected document. Do not submit both Swedish and English versions of the same document simply because both exist internally when only one is requested.
- **form answers**: Part II forms (shared EU templates in content/eu/templates/part-ii) are answered in Swedish. Their fixed text is English; whether the Läkemedelsverket Swedish templates must be used for a fully Swedish document is DECISIONS.md D1.
- **by language**:
  - **sv**:
    - SE-K1
    - SE-K2
    - SE-L1
    - SE-L2
    - SE-M1
    - SE-M2-DOI
    - SE-N1
    - SE-O1
    - SE-O2
    - SE-P1
    - SE-FEE
    - SE-R1
    - SE-S1
  - **en**:
    - SE-O1
    - SE-O2
- **by language note**: en only for an insurer-issued certificate or coverage document where accepted; every other document Swedish only.
- **drafting notes language**: drafting_notes_sv for every document.

## Answer languages for forms

- sv

## Populations, age bands and representatives

- **authority**: Läkemedelsverket guidance 'Trial subjects and informed consent' (accessed 26 August 2026); Läkemedelsverket HSLF-FS 2021:109 (in force since 30 January 2022); Swedish Medicinal Products Act (2015:315), section 7 chapter 3 as amended by SFS 2026:497; Swedish Biobank Act (2023:38); Regulation (EU) No 536/2014 Articles 28 to 35. As recorded in the TrialAgents Sweden guides reviewed 23 September 2026.
- **consent taker**: A licensed physician or licensed dentist conducts the Article 29 interview and obtains consent (same person; HSLF-FS 2021:109). Another healthcare professional only with a Läkemedelsverket exception for special reasons, justified in the protocol (study fact consent.non_physician_consent_taker).
- **minors**:
  - **age bands**:
    - **band**: 6-11
    - **template**: SE-PT-age-6-11
    - **reader**: child
    - **legal role**: information and documentation of the child's position; not legal consent
    - **band**: 12-14
    - **template**: SE-PT-age-12-14
    - **reader**: adolescent
    - **legal role**: information and documentation of the adolescent's position; not legal consent
    - **band**: 15-17
    - **template**: SE-PT-age-15-17
    - **reader**: adolescent
    - **legal role**: own informed consent in addition to guardian consent, when the minor understands what participation means
  - **always**:
    - SE-PT-parents
  - **band basis**: 15 is the statutory threshold (SFS 2026:497). Below 15 Swedish law creates no fixed national set of age bands: build age-appropriate versions from the protocol population and the child's expected ability to understand. The template bands 6-11 and 12-14 are drafting bands; no conflict with the authority.
  - **guardians**: The guardians are the legally designated representatives. Where there are two guardians, both sign and date before any study-related procedure, not necessarily at the same time. In an urgent situation the absent guardian's consent may be transmitted digitally (for example email) with subsequent confirmation of the original consent; this is not Article 35 emergency enrolment.
  - **turning 15**: A participant who turns 15 during the trial and understands what participation means gives explicit own informed consent (SE-PT-age-15-17) before continued participation.
  - **reconsent at 18**: Not required solely because the participant turns 18 when valid own consent was given after age 15 (Läkemedelsverket). Use SE-PT-main or SE-PT-healthy at 18 only for participants without valid own consent after 15, or when an amendment or new risk information requires re-consent.
  - **minors 15 17 not understanding**: Guardian consent remains the legal basis; the minor is informed and involved according to ability and an explicit refusal is respected. SE-PT-age-15-17 is not used by default (DECISIONS.md D10).
  - **under 6**: No template. Information adapted to age and maturity is still given by an investigator or team member trained or experienced with children (DECISIONS.md D9).
  - **information giver**: Information to the child is adapted to age and mental maturity and given by an investigator or trial-team member trained or experienced in working with children; the formal consent interview with a 15-17-year-old is held by the licensed physician or dentist.
  - **dissent**: A child who can form an opinion and assess the information has the right to refuse or withdraw; that explicit wish is respected. The child's document must not contradict the guardian document.
  - **compensation**: No incentives beyond compensation for expenses and loss of earnings directly related to participation (Article 32 CTR).
  - **conflicts**:
    - SE-PT-main lists re-consent after reaching adulthood; Läkemedelsverket requires none when valid own consent was given after 15 (authority wins, see reconsent_at_18).
- **adults without capacity**:
  - **always**:
    - SE-PT-legal-rep
    - SE-PT-limited-capacity
  - **representative**: god man or förvaltare appointed under the Parental Code (föräldrabalken) whose authority covers the individual's personal matters.
  - **note**: Article 31 conditions. The participant is involved as far as possible; the representative cannot override an explicit refusal. No incentives beyond expenses and loss of earnings. Capacity reassessment and the move to own consent (SE-PT-main) are defined in the protocol and K1.
  - **conflicts**:
    - SE-PT-limited-capacity description implies use only when the adult retains understanding; the Sweden guide requires adapted participant information in every case (authority wins; always planned, adapted to the person's level).
- **emergency**:
  - **always**:
    - SE-PT-emergency
  - **as applicable**:
    - SE-PT-legal-rep
    - SE-PT-limited-capacity
    - SE-PT-parents
  - **note**: SE-PT-emergency is for adults. Where the representative is reached first, SE-PT-legal-rep; minors enrolled in an emergency use the guardian and age-band documents adapted to subsequent consent (DECISIONS.md D12).
- **impartial witness**:
  - **always**:
    - SE-PT-witness
  - **note**: Only when the participant cannot write or cannot sign; at least one independent witness; the witness dates and signs; not for interpreter needs or limited literacy.
  - **conflicts**:
    - SE-PT-witness also names a person who cannot read; the Sweden guide limits the route to inability to write or sign (authority wins).
- **pregnancy**:
  - **participant**: Main ICF covers pregnancy risks, contraception, testing and what happens if pregnancy is identified; SE-PT-pregnancy only for follow-up beyond what the original information reasonably described.
  - **partner**: SE-PT-pregnant-partner only when the protocol requires direct pregnancy follow-up of the partner; separate document; the participant cannot consent for the partner.
  - **infant**: Newborn or infant information only when scientifically justified; block B of the pregnancy templates; where the child has two guardians both consent (template rule).
- **excluded groups**: A clinical trial not connected with treatment of disease must not be performed on a person receiving care under the Swedish compulsory psychiatric care or forensic psychiatric care legislation (Medicinal Products Act, as recorded in SE-HV).
- **shareable templates**:
  - SE-PT-pregnant-partner
  - SE-PT-secondary
- **shareable note**: One shared document for several populations only when nothing in it would differ; agree with the user.
- **separate document rules**:
  - Each population with a different legal or practical consent logic gets its own Swedish document set; the main adult form is not enough (SE-ICF).
  - Minors: Swedish guardian document, age-appropriate child information for younger participants and adolescent information with own consent for 15-17 who understand (SE-MINORS).
  - Adults without capacity: separate representative information and consent plus adapted participant information (SE-CAPACITY).
  - Optional future use genuinely separate from main participation: separate optional choice; refusal does not affect main participation (SE-SECONDARY).
  - Pregnant partner: separate Swedish document addressed to the partner when the protocol collects identifiable information directly from her (SE-PREGNANCY).
  - Material change to the approved information or consent logic: assess whether a substantial modification and participant re-consent are required before implementing it (SE-ICF).

## Drafting rules

- Participant documents: the supplied templates follow the Kliniska Studier Sverige template v7 (2025-11-12) to which Etikprövningsmyndigheten points sponsors; keep their structure and model text, add all study-specific information, and record every deviation as a finding.
- Information exhaustive enough for an informed decision but concise, clear, relevant and understandable to a lay person; Swedish understandable to the intended population, not only grammatically correct; define clinical terms, shorten dense sentences, keep decision-relevant information visible.
- State the EU trial number and how trial results can later be found in the EU database.
- State the right to refuse and the right to withdraw at any time without negative consequences and without giving a reason.
- Where no direct therapeutic benefit is expected, say so; never imply one.
- Compensation, reimbursement and injury-protection wording must match P1, O1 and O2; payment is not presented as a benefit.
- Data protection: match the actual data flow (controllers, categories, transfers, access, retention, rights); no promise such as permanent deletion on request that the protocol, safety obligations or record-retention rules do not support; a research consent checkbox is no substitute for the sponsor's data-protection obligations.
- Samples: match the protocol, S1 and any Swedish biobank application; distinguish use within the authorised trial from a new purpose; withdrawal effects stated accurately; no broad future-use language in place of the later information and consent process.
- Consent form: signature and date fields for the participant or legally designated representative and for the person who gives the information (licensed physician or dentist, or another healthcare professional under a Läkemedelsverket exception); both guardians for minors where there are two; the signed consent and information stay at the site and a copy goes to the participant or representative.
- Blank, unsigned documents are uploaded with controlled version numbers and dates matching references in the protocol and K1; remove any site or participant signatures and completed personal data from the submission copy.
- Risk frequency categories are not set in the Sweden guides; use the IB or SmPC categories until the user decides (DECISIONS.md D13).
- Participant templates (JSON): [INSTRUKTION – TA BORT FÖRE SLUTVERSION: …] notes, [FYLL I: …] gaps and [VALFRI TEXT – BEHÅLL ELLER TA BORT] markers are drafting instructions; follow and remove them, keep the system variables [document name], [population label] and [date] until rendering. Part II templates (DOCX): yellow [INSERT/IF/OTHERWISE/CHOOSE/NOTE: …] labels. Nothing of either may remain in a final document.

## Study facts that decide which documents are needed

- population.adult_patients
- population.healthy_volunteers
- population.minors
- population.minors_age_bands
- population.minors_15_17_own_consent
- population.minors_under_6
- population.adults_without_capacity
- population.compulsory_psychiatric_care
- consent.emergency_enrolment
- consent.impartial_witness_possible
- consent.non_physician_consent_taker
- recruitment.procedure_fully_in_protocol
- recruitment.material_used
- recruitment.other_information_material
- endpoint_documents.participant_facing
- decentralised.elements
- samples.collected
- samples.archive_used
- samples.biobank_act_applies
- samples.future_use_outside_protocol
- data.future_use_outside_protocol
- pregnancy.participant_follow_up_beyond_main_consent
- pregnancy.partner_follow_up
- pregnancy.infant_follow_up
- pregnancy.pregnant_or_breastfeeding_enrolled
- trial.non_therapeutic
- trial.multinational
- insurance.other_coverage
- fee.national_process
- sites.count

## Sources

- **SE-HUB**: https://trialagents.com/ctis/sweden/en
- **SE-PII-CHECKLIST**: https://trialagents.com/ctis/sweden/en/part-ii-document-checklist
- **SE-ICF**: https://trialagents.com/ctis/sweden/en/patient-information-consent-requirements
- **SE-QC**: https://trialagents.com/ctis/sweden/en/patient-facing-document-qc-checklist
- **SE-HV**: https://trialagents.com/ctis/sweden/en/healthy-volunteer-consent-requirements
- **SE-MINORS**: https://trialagents.com/ctis/sweden/en/minor-consent-assent-requirements
- **SE-CAPACITY**: https://trialagents.com/ctis/sweden/en/limited-capacity-legal-representative-consent-requirements
- **SE-EMERGENCY**: https://trialagents.com/ctis/sweden/en/emergency-enrollment-consent-requirements
- **SE-WITNESS**: https://trialagents.com/ctis/sweden/en/impartial-witness-consent-requirements
- **SE-PREGNANCY**: https://trialagents.com/ctis/sweden/en/pregnancy-follow-up-requirements
- **SE-SECONDARY**: https://trialagents.com/ctis/sweden/en/secondary-use-consent-requirements
- **NAMING**: https://trialagents.com/ctis/ctis-document-naming-convention
