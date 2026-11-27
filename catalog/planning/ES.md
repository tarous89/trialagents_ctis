---
id: ES
name: Spain – Part II planning checklist
part: II
country: ES
version: '1.0'
effective: '2026-11-27'
use_when: Part II documents for Spain.
reference: https://trialagents.com/ctis/spain/en
checked: '2026-11-27'
naming: Use the CTCG title for each document (see each row’s CTIS title); filename <study code>_<code>[_<variant>]_ES_<language>.
documents:
- code: K1_recruitment-arrangements
  name: Recruitment and informed-consent procedure
  required: always
  languages:
  - en
  - es
  per: trial
  national_notes: 'CTIS title: K1_Recruitment arrangements. Not needed if: recruitment.procedure_fully_in_protocol (a separate document is then not needed, but the cover letter must identify where the protocol describes the process; see DECISIONS.md)

    Signed at CTIS submission: no

    How potential participants are identified and approached, including the first act of recruitment; each recruitment item (K2) and how and where it is used; how information is given and consent obtained. Every consent pathway in the plan (adults unable to consent, minors, impartial witness, emergency) needs its section completed with the Spanish rules in national_fields.

    Completed by: assistant

    CTIS Parte II, sección K («Recruitment arrangements»). Información obligatoria. Un documento separado no es necesario si el protocolo describe completamente el proceso; en ese caso la carta de presentación debe indicar dónde figura esa información. Español o inglés; respuestas de esta plantilla en español. Sin firma en la presentación. Para todas las nuevas presentaciones de Parte II desde el 1 de septiembre de 2026 (solicitudes iniciales, Estados miembros adicionales y Parte II que completa una solicitud del artículo 11) usar la versión 2.0 de la plantilla europea. Describir cómo se identifica y contacta a los posibles participantes, incluido el primer acto de reclutamiento, y explicar cada material de reclutamiento (K2) y cómo y dónde se usará. Completar la sección de cada vía de consentimiento del plan (adultos incapaces, menores, testigo imparcial, urgencia) con los requisitos españoles indicados en national_fields; responder «no aplicable» en las secciones que no apliquen.

    National additions to the form: - **v105**: Spain (recruitment, Member State information): state that participant-facing recruitment material for Spain is in Spanish and submitted as a blank version; if the protocol fully describes the recruitment process, reference where (the cover letter must identify it).

    - **v108**: Spain (informed consent, Member State information): the PIS/ICF assessed by the CEIm is in Spanish; when a participant needs another language the sponsor provides an accurate translation (not submitted to the CEIm under the national instruction); withdrawal is valid without signing a revocation form; the participant receives the PIS and a signed and dated copy of the ICF.

    - **v110**: Spain (adults unable to consent): Royal Decree 1090/2015 articles 4 and 6: consent by the legal representative or, as appropriate, a person connected by family or factual relationship; the site verifies current legal authority and keeps the evidence; information accessible and understandable with appropriate support so that the person consents personally whenever possible; prior instructions given while capable are checked and respected; explicit objection respected; consent of the participant before continuing if capacity is regained.

    - **v114**: Spain (minors): Royal Decree 1090/2015 articles 4 and 5 and Civil Code article 156: prior consent of the parents not deprived of parental authority or of the legal representative; one parent may sign when the other parent''s express or tacit agreement is sufficiently documented (both sign / one signs and confirms the other does not object / sole legal guardian); a child younger than 12 with sufficient judgment is heard; from age 12 the minor also consents and signs; adult consent before continuing at 18; an explicit refusal or wish to withdraw is respected.

    - **v117**: Spain (impartial witness): only for a capable participant unable to read or write; the witness is impartial and unrelated to the study, with full name and role recorded; a study staff member reads the PIS; the AEMPS Annex VIIIA "Informed Consent before witnesses" model is used; not used for language barriers, incapacity or emergencies; an interpreter is not automatically the witness.

    - **v121**: Spain (emergency): Article 35 CTR and Royal Decree 1090/2015 article 7: whenever the emergency allows, consult people connected to the participant by family or factual relationship before enrolment (who, time allowed, documentation); inform the participant or legally designated representative as soon as possible; obtain consent to continue and ratification of the participation already started; tell them of the right to object to use of data obtained in the trial.

    Template basis: European recruitment and informed-consent procedure template, version 2.0 (European Commission, version dated 1 June 2026); mandatory version for all new Part II submissions after 1 September 2026, including initial applications, additional Member State applications and Part II submissions completing an Article 11 application'
- code: K2_recruitment-material
  name: Recruitment material
  required: conditional
  condition: Advertising, letters, telephone scripts, posters, websites, social media or other recruitment materials will be used.
  languages:
  - es
  per: trial
  national_notes: 'CTIS title: K2_Recruitment material_<type>_ES_es. Signed at CTIS submission: no

    Each proposed item, prepared in Spanish for use in Spain, submitted as a blank approved version, not signed. K1 explains how and where each item is used.

    Completed by: assistant

    CTIS Parte II, sección K. Condicional: presentar cada material de reclutamiento propuesto (anuncios, cartas, guiones telefónicos, carteles, páginas web, redes sociales u otros) y explicar en K1 cómo y dónde se usará. En español, versión en blanco aprobada, sin firma. Sin plantilla nacional.'
- code: L1_SIS-ICF
  name: Patient Information Sheet and Informed Consent Form (HIP/CI), one set per population, substudy or optional activity
  variants:
  - adults
  - age-12-17
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
  - es
  per: population
  national_notes: 'CTIS title: L1_SIS and ICF_<population>_ES_es. Signed at CTIS submission: no

    Blank Spanish PIS/ICF for the main study and separate versions for relevant populations, substudies or optional activities (population_sets). Additional distinct consent materials when the trial includes adults unable to consent, emergency enrolment, an impartial-witness process, pregnancy follow-up of a participant''s partner, optional substudies or secondary use; independent choices are not hidden inside one general acceptance statement. AEMPS Annex VIIIA is the national model; AEMPS Annex VIIIB gives the biological-sample text. The participant, parent, representative, witness and investigator sign only when consent is obtained.

    Completed by: assistant

    CTIS Parte II, sección L («Subject information and informed consent form»). Obligatorio: una HIP/CI en español por población, subestudio o actividad opcional (ver population_sets), en blanco y con control de versión. Modelo nacional: Anexo VIIIA de la AEMPS (27 de febrero de 2025); textos de muestras: Anexo VIIIB (20 de diciembre de 2017). Incluir el Apéndice 1 de protección de datos del Anexo VIIIA dentro de cada documento (ver ES-DATA-PROTECTION-APPENDIX). Título CTIS descriptivo; versión y fecha en el pie del documento y en los metadatos de CTIS, no en el título (guía CTCG v3.0). Nadie firma antes de la presentación.'
- code: L1_SIS-ICF-2
  name: Personal-data appendix (AEMPS Annex VIIIA Appendix 1) within the Spanish participant information
  required: always
  languages:
  - es
  per: trial
  national_notes: 'CTIS title: L1_SIS and ICF_<population>_ES_es. Signed at CTIS submission: no

    Annex VIIIA personal-data appendix in every Spanish participant document, uploaded only under "Subject information and informed consent form" and never duplicated as a separate national data-protection document. Identifies the sponsor and site roles, processing purposes and legal basis, confidentiality protections, retention, rights and limitations, contacts, result publication, sharing and international transfers where applicable. At most two pages.

    Completed by: assistant (drafted as part of each L1 document)

    Obligatorio dentro de la información al participante. Incluir el Apéndice 1 del Anexo VIIIA en cada documento español para participantes y subirlo solo bajo «Subject information and informed consent form»; no duplicarlo como documento nacional de protección de datos separado. Identificar las funciones del promotor y del centro (el centro conserva la historia clínica identificable; el promotor recibe datos codificados), base jurídica y finalidades, confidencialidad, quién accede a datos identificables, conservación (25 años promotor e investigador; historia clínica según plazo del centro), derechos y limitaciones, contactos de protección de datos, publicación de resultados, comunicación y transferencias fuera del EEE. Describir por finalidad las actividades externalizadas que requieren datos directos (viajes, reembolsos, servicios domiciliarios); no es necesario nombrar cada empresa. Máximo dos páginas, con la misma letra y el mismo interlineado mínimos.'
- code: ES_eu-statement-of-compliance-with-regulation-eu-2016
  name: EU statement of compliance with Regulation (EU) 2016/679
  required: always
  languages:
  - en
  - es
  per: trial
  national_notes: 'CTIS title: GDPR compliance statement. Signed at CTIS submission: no

    The CTIS Form includes the EU statement of compliance with the GDPR. It sits outside the Part II document placeholders but remains part of the application. Not an R1 Part II document for Spain: the national data-protection content is the Annex VIIIA appendix inside the participant documents.

    Completed by: assistant; name and role of the responsible person at the sponsor from the sponsor

    Formulario CTIS (fuera de los apartados de documentos de la Parte II). Declaración UE de cumplimiento del Reglamento (UE) 2016/679. No subir en la sección R de la Parte II ni como documento nacional de protección de datos: en España la información nacional va en el Apéndice 1 del Anexo VIIIA dentro de la HIP/CI. La guía española no exige ninguna frase nacional adicional: el campo condicional r1_the_sponsor_declares no aplica y se elimina. Nombre y cargo de la persona responsable del promotor: solo de las fuentes del promotor; no inventar.

    Template basis: EudraLex statement of compliance with Regulation (EU) 2016/679 (GDPR); Spain requires no national data-protection sentence in it'
- code: M1_CV
  name: Principal investigator curriculum vitae
  required: always
  languages:
  - en
  - es
  per: trial
  national_notes: 'CTIS title: M1_CV_<investigator>_<site>. Signed at CTIS submission: no

    Current CV in the CTIS "Investigator CV" subsection showing suitable clinical-trial and GCP experience, updated within the previous two years. AEMPS does not require the EU trial number in the CV.

    Completed by: investigator

    CTIS Parte II, sección M, subsección «Investigator CV». Obligatorio para cada investigador principal. Plantilla europea de CV aceptada. Español o inglés. Debe mostrar experiencia adecuada en ensayos clínicos y en Buena Práctica Clínica y estar actualizado en los dos años anteriores. La AEMPS no exige el número UE del ensayo en el CV (puede rellenarse, no es obligatorio); su tabla CTIS no exige firma en la presentación. Los datos personales los aporta el investigador: el asistente solo rellena los datos del ensayo y no inventa datos personales.

    Template basis: European CV template (accepted in Spain)'
- code: M2_DoI
  name: Declaration of interest
  required: always
  languages:
  - en
  - es
  per: trial
  national_notes: 'CTIS title: M2_DoI_<investigator>_<site>. Signed at CTIS submission: no

    Declaration of Interest in the CTIS "Suitability of the investigator" subsection, mandatory even when no conflict exists; updated within the previous year; states the relevant interests or that none exist.

    Completed by: investigator

    CTIS Parte II, sección M, subsección «Suitability of the investigator». Obligatorio para cada investigador principal, también cuando no existe conflicto. Usar la plantilla europea de declaración. Español o inglés. Actualizada en el año anterior; debe indicar los intereses relevantes o que no existen. La tabla CTIS de la AEMPS no exige firma en la presentación. Los intereses los declara el investigador; el asistente solo rellena título del ensayo y número UE.

    Template basis: European declaration-of-interest template (to be used in Spain)'
- code: N1_site-suitability
  name: Site-suitability statement
  required: always
  languages:
  - en
  - es
  per: site
  national_notes: 'CTIS title: N1_Site suitability form_<site>. Signed at CTIS submission: yes

    One statement per site under the CTIS facility and site-suitability fields. Identifies the trial, department, site, planned participant number and any collaborating departments, and confirms that the site has the required staff, equipment, facilities and expertise.

    Completed by: assistant; site details and signature left empty for the site

    CTIS Parte II, sección N (campos de idoneidad de las instalaciones y del centro). Obligatorio, un documento por centro. España acepta el formulario europeo o el Anexo IV de la AEMPS, en español o inglés. FIRMADO en la presentación por el director del centro o institución sanitaria, o persona delegada: el bloque de firma lo completa el centro y se sube la versión firmada. Debe identificar el ensayo, el servicio, el centro, el número previsto de participantes y los servicios colaboradores, y confirmar que el centro dispone del personal, equipos, instalaciones y experiencia necesarios. Nombre del centro, investigador principal y número de participantes quedan en blanco para el centro.

    National additions to the form: - **n1 issued by**: Spain requires the signature at submission: the director of the healthcare site or institution, or a delegated person, signs. Leave the block empty for the site; do not delete it.

    - **v125**: Spain: the statement must also identify the department (servicio) and any collaborating departments. Use them only if the sources give them; otherwise leave the instruction and raise missing data for the site.

    Template basis: European site-suitability form (CTAG); Spain accepts it or AEMPS Annex IV (Site Suitability, version 27 March 2023, not supplied)'
- code: O1_insurance-certificate
  name: Insurance certificate (AEMPS Annex VA)
  required: always
  languages:
  - es
  per: trial
  national_notes: 'CTIS title: O1_Trial participant insurance certificate_ES. Not needed if: trial.low_intervention and insurance.low_intervention_site_liability_cover (then ES-O2-LOW-INTERVENTION); a qualifying non-commercial sponsor may first submit ES-O2-NON-COMMERCIAL and provide this certificate within 30 calendar days

    Signed at CTIS submission: yes

    Proof of insurance or equivalent financial guarantee, in Spanish, on AEMPS Annex VA. Lists each participating site and principal investigator and reflects the Spanish statutory coverage limits (Royal Decree 1090/2015).

    Completed by: insurer

    CTIS Parte II, sección O. Obligatorio salvo en ensayos de bajo nivel de intervención cubiertos por la responsabilidad civil profesional del centro. Solo en español. Modelo estándar: Anexo VA de la AEMPS; enumera cada centro participante y su investigador principal y refleja los límites de cobertura legales españoles. Certificado cumplimentado y firmado (asegurador, promotor o representante del centro); no se requiere firma electrónica adicional en CTIS. Documento del asegurador: solo se revisa.'
- code: O2_proof-of-coverage
  name: Additional sponsor responsibility commitment (AEMPS Annex VB)
  required: conditional
  condition: An international policy contains exclusions that may not meet Spanish coverage rules. Acceptance of the commitment is for the CEIm to decide.
  languages:
  - es
  per: trial
  national_notes: 'CTIS title: O2_Proof of coverage_Sponsor responsibility commitment_<sponsor>. Signed at CTIS submission: yes

    Completed by: sponsor

    CTIS Parte II, sección O. Condicional: compromiso adicional de responsabilidad del promotor (Anexo VB de la AEMPS) cuando una póliza internacional contiene exclusiones que pueden no cumplir las normas españolas de cobertura. Su aceptación corresponde al CEIm. En español, firmado por el promotor.'
- code: O2_proof-of-coverage-2
  name: Non-commercial sponsor insurance commitment (AEMPS Annex VI)
  required: conditional
  condition: A qualifying non-commercial sponsor initially submits the signed commitment instead of the certificate; the insurance certificate (ES-O1) must then be provided within 30 calendar days. The trial cannot start until the CEIm confirms that the required insurance or guarantee is in place.
  languages:
  - es
  per: trial
  national_notes: 'CTIS title: O2_Proof of coverage_Non-commercial insurance commitment_<sponsor>. Signed at CTIS submission: yes

    Completed by: sponsor

    CTIS Parte II, sección O. Condicional para la investigación clínica no comercial: el promotor no comercial que cumpla los requisitos puede presentar inicialmente el compromiso firmado del Anexo VI de la AEMPS; el certificado de seguro (ES-O1) debe aportarse en un plazo de 30 días naturales. El ensayo no puede comenzar hasta que el CEIm confirme que el seguro o la garantía exigidos están vigentes. En español.'
- code: O2_proof-of-coverage-3
  name: Low-intervention trial civil-liability certificate (AEMPS Annex VII)
  required: conditional
  condition: Low-intervention trial in which the site's professional civil-liability coverage protects against trial-related harm, so no trial-specific policy is required. If the sponsor buys a specific trial policy instead, submit ES-O1 (Annex VA).
  languages:
  - es
  per: trial
  national_notes: 'CTIS title: O2_Proof of coverage_Civil liability certificate_<site or organisation>. Signed at CTIS submission: yes

    Completed by: site or organisation representative

    CTIS Parte II, sección O. Condicional para ensayos de bajo nivel de intervención: no se exige póliza específica cuando la responsabilidad civil profesional del centro cubre los daños derivados del ensayo. Presentar el certificado firmado del representante del centro u organización según el Anexo VII de la AEMPS. Si el promotor contrata una póliza específica, presentar el Anexo VA (ES-O1). En español.'
- code: P1_compensation
  name: Financial budget of the trial
  required: always
  languages:
  - en
  - es
  per: trial
  national_notes: 'CTIS title: P1_Compensation participants and financial arrangements_ES. Signed at CTIS submission: no

    One financial budget covering the cost of additional tests, cost per visit and per recruited participant, indirect and administrative costs to be specified in site contracts, free supply of the investigational medicinal products, any additional participant cost and all planned participant and investigator compensation. The amount, nature and payment procedure for participant compensation must be clear. Site contracts are required before site initiation but are not Part II documents.

    Completed by: sponsor (finance)

    CTIS Parte II, sección P. Obligatorio: una memoria económica (presupuesto) del ensayo, en español o inglés, sin firma en la presentación. Se acepta un presupuesto único con importes variables por centro o el conjunto de presupuestos individuales por centro. Debe cubrir el coste de las pruebas adicionales, el coste por visita y por participante reclutado, los costes indirectos y administrativos que se especificarán en los contratos con los centros, el suministro gratuito de los medicamentos en investigación, cualquier coste adicional para el participante y todas las compensaciones previstas a participantes e investigadores. Importe, naturaleza y procedimiento de pago de la compensación a participantes deben ser claros y coincidir con la HIP/CI. Los contratos con los centros no se presentan en la Parte II.'
- code: P2_compensation-participants
  name: Compensation for trial participants (European template)
  required: conditional
  condition: The sponsor chooses to add the European compensation-for-participants template when helpful. It does not replace the Spanish financial budget (ES-P1-BUDGET).
  languages:
  - en
  - es
  per: trial
  national_notes: 'CTIS title: P2_Compensation participants_ES. Signed at CTIS submission: no

    Travel and expense reimbursement, inconvenience payments, prorating and conditions, identical to the budget and the participant documents.

    Completed by: assistant

    CTIS Parte II, sección P. Condicional y opcional: la plantilla europea de compensación a participantes puede usarse cuando sea útil, pero no sustituye la memoria económica española (ES-P1-BUDGET). Español o inglés; sin firma. Importes, condiciones, forma de pago y pago proporcional si la participación termina antes deben coincidir con la memoria económica y con cada HIP/CI. Si no se ofrece compensación, indicarlo expresamente.

    Template basis: EU compensation template (CTAG), optional in Spain'
- code: S1_biological-samples
  name: Compliance with Spanish rules for biological samples (AEMPS Annex XIII)
  required: conditional
  condition: The trial collects new samples, uses archived material, stores samples or plans future use.
  languages:
  - en
  - es
  per: trial
  national_notes: 'CTIS title: S1_Compliance collection use storage biological samples_ES. Signed at CTIS submission: no

    Samples, quantities, collection procedures, responsible entity, analysis and storage locations, retention, coding, access, transfers, future use, recontact, ethics review and handling of findings. Participant text follows AEMPS Annex VIIIB; optional future use has separate consent logic.

    Completed by: assistant

    CTIS Parte II, sección S. Condicional: cuando el ensayo obtenga muestras nuevas, use material archivado, almacene muestras o prevea un uso futuro. España acepta el Anexo XIII de la AEMPS en español o inglés (o la misma información en el expediente con una referencia clara); sin firma. Describir muestras, cantidades, procedimientos de obtención, entidad responsable, lugares de análisis y almacenamiento, conservación, codificación, acceso, transferencias (con acuerdo de transferencia de material o equivalente), uso futuro, nuevo contacto, revisión ética y gestión de hallazgos. Las muestras restantes se destruyen al final del ensayo salvo que el participante acepte su almacenamiento e investigación futura; indicar la vía española (biobanco registrado en España, colección registrada en España o repositorio en el extranjero). Debe coincidir con el protocolo, el manual de laboratorio, la HIP/CI (Anexo VIIIB) y el documento de uso futuro.

    National additions to the form: - **f03**: Spain (section 5, national arrangements): remaining samples are destroyed after the trial unless the participant agrees to storage and future research; name the Spanish route for stored samples (biobank registered in Spain, collection registered in Spain, or repository abroad with its legal model, location, access, transfer and purpose) under Royal Decree 1716/2011 and Law 14/2007; the participant text follows AEMPS Annex VIIIB; withdrawal allows destruction or anonymisation of samples.

    - **v149**: Spain: a biobank registered in Spain releases samples for authorised projects after its scientific and ethics review; future data use beyond the drug development programme needs a favourable ethics-committee opinion or the prior report described in Annex VIIIA.

    Template basis: EudraLex biological-samples form, used to give the same information as AEMPS Annex XIII (template version 28 January 2022, the accepted Spanish Part II form, not supplied). The guide allows completing Annex XIII "or provide the same information in the dossier with a clear reference". See DECISIONS.md.'
---
# National rules – Spain

## Authorities and fee

- **competent authority**: AEMPS (Spanish Agency for Medicines and Medical Devices) issues the national authorisation.
- **ethics**: A Spanish Research Ethics Committee for medicinal products (CEIm) validates and evaluates Part II. The sponsor agrees on the assessing CEIm before submission, contacts a CEIm that participates in CTIS work, confirms it can assess on the intended dates, and identifies it in the cover letter. For minors the CEIm needs paediatric expertise or advice; for adults unable to consent, relevant disease expertise or clinical, ethical and psychosocial advice.
- **fee**: Proof of the AEMPS assessment fee is uploaded in the CTIS Form, not Part II (mandatory unless exempt). A sponsor claiming the non-commercial exemption uploads the required signed declaration instead. The selected CEIm must be identified during fee payment.
- **cover letter**: Identify the agreed assessing CEIm; where the protocol fully describes recruitment, identify where (no separate K1 then).
- **before site start**: Favourable CEIm opinion, AEMPS authorisation decision, signed contract with the site, and activation of the site in the Spanish Clinical Studies Registry (REec).
- **sources**:
  - ES-HUB
  - ES-PII-CHECKLIST#support

## Language rules

- **participant documents**: es
- **administrative documents**:
  - es
  - en
- **spanish only documents**:
  - ES-O1
  - ES-O2-SPONSOR-COMMITMENT
  - ES-O2-NON-COMMERCIAL
  - ES-O2-LOW-INTERVENTION
  - ES-K2
  - ES-L1
  - ES-DATA-PROTECTION-APPENDIX
- **rule**: Part II documents addressed to trial participants and assessed by the CEIm must be written only in Spanish (including recruitment material). Most administrative Part II documents may be in Spanish or English; the insurance document must be in Spanish.
- **non spanish speakers**: If a participant needs another language, the sponsor provides an accurate translation; these additional translations are not submitted to the CEIm under the national instruction. An impartial witness is not a substitute for a translation or interpreter.
- **form answers**: Part II forms (shared EU templates in content/eu/templates/part-ii) are answered in Spanish; English is also accepted for the administrative forms (see DECISIONS.md).

## Answer languages for forms

- es

## Populations, age bands and representatives

- **authority**: AEMPS Annex VIIIA, Guideline for Correct Preparation of a Model Patient Information Sheet and Informed Consent Form, version 27 February 2025; Royal Decree 1090/2015 articles 3 to 8; Spanish Civil Code article 156; Law 41/2002 on Patient Autonomy; Regulation (EU) No 536/2014 articles 28 to 35
- **minors**:
  - **age bands**:
    - **band**: under 12
    - **template band**: 6-11
    - **template**: ES-PT-age-6-11
    - **reader**: child
    - **rule**: Parents or legal representative consent first. The child is heard when sufficiently mature; information adapted to age and maturity; the child's agreement is recorded when the child can understand and express a view. Prepared when younger children can understand a simple explanation.
    - **conflict resolved**: The template is labelled 6-11; the authority sets no lower age, only "younger than 12" with sufficient judgment. The authority wins: the band is "under 12"; the 6-11 template is used for any child under 12 able to understand a simple explanation, adapted to the reader. Recorded in templates/README.md.
    - **band**: 12-17
    - **template**: ES-PT-age-12-17
    - **reader**: adolescent
    - **rule**: Mandatory from age 12: parent or legal-representative consent and the adolescent's own consent, with the adolescent's signature and date; the same material decision points as the parent document in age-appropriate language.
    - **conflict resolved**: The template's English name and instructions call it an assent document; the authority requires the adolescent's own consent ("not only a simplified leaflet with no consent record"). The authority wins: the document records consent (consentimiento), as its Spanish title already says.
  - **always**:
    - ES-PT-parents
  - **reaching 12**: A child who enters under 12 and turns 12 during the trial receives the adolescent document and gives their own consent before continuing.
  - **reconsent at 18**: ES-PT-main or ES-PT-healthy: express adult consent before continued participation; plan the visit, version and timing before the birthday.
  - **parent signature**: One parent may sign when the other parent's express or tacit agreement is sufficiently documented. Record one of: both parents sign; one parent signs and confirms the other does not object; the signer is the sole legal guardian. Do not require two signatures on every form; do not accept one signature without the documented basis. A non-parent legal representative is identified and the authority relied on is evidenced per site procedure.
  - **note**: An explicit refusal or wish to withdraw by a minor able to form and evaluate an opinion is respected even if a parent signed. Parent permission for the main trial is not permission for optional activities. AEMPS points to the KIDS Barcelona young-person guidance as a recommended aid.
- **adults without capacity**:
  - **always**:
    - ES-PT-limited-capacity
    - ES-PT-legal-rep
  - **reconsent on capacity**: ES-PT-main or ES-PT-healthy when capacity is regained: the participant's own consent before continuing.
  - **note**: Use the representative pathway only when the adult cannot understand, retain, use or communicate the information despite suitable support; capacity is decision-specific and may change. Prior instructions given while capable are respected. Representative: legal representative or, as appropriate, a person connected by family or factual relationship; not any relative by default. Explicit objection, non-verbal resistance or distress is respected and documented.
- **emergency**:
  - **always**:
    - ES-PT-emergency
  - **representative**: ES-PT-legal-rep when the participant remains unable to consent after enrolment.
  - **note**: When the participant regains capacity, their own decision governs; do not rely on representative consent. If minors or adults unable to consent are eligible, the emergency plan covers them.
- **impartial witness**:
  - **always**:
    - ES-PT-witness
- **pregnancy partner**:
  - **always**:
    - ES-PT-pregnant-partner
- **shareable templates**:
  - ES-PT-pregnant-partner
  - ES-PT-secondary
- **separate document rules**:
  - The pregnant partner of a male participant gives a specific consent in her own document (AEMPS); the participant cannot consent for her.
  - An optional substudy for a defined subpopulation gets a separate information and consent document (AEMPS); a substudy open to all participants may be a separate section of the main PIS with its own yes or no choice.
  - Future data use outside the drug development programme or for unrelated diseases needs separate consent: an independent yes or no box in the general ICF or a separate form (AEMPS).
  - Storage and future use of remaining samples needs the participant's agreement; otherwise they are destroyed. AEMPS recommends a specific document when samples are obtained for a substudy or future studies.
  - Each materially different optional purpose has its own choice (at minimum main trial, future data use, future sample storage; also optional biopsies, genetic research, recontact); no bundled consent.
  - Participant pregnancy follow-up needs a separate form when it is optional, extends beyond the main consent, adds medical-record access or involves a distinct infant-data decision.

## Drafting rules

- Participant documents: AEMPS Annex VIIIA (27 February 2025) is the national model; adapt it to each population rather than translating a generic EU form. Biological-sample text follows AEMPS Annex VIIIB (20 December 2017).
- All participant- and representative-facing documents in Spanish only. Translations into other languages for individual participants are the sponsor's responsibility and are not submitted to the CEIm.
- Format (AEMPS recommendation): at most 15 pages including the ICF; Arial or Times New Roman, 11 pt or larger; line spacing at least 1.5; normal margins. Personal-data appendix (Annex VIIIA Appendix 1) at most two pages with the same minimums.
- Identify study title, study code, EU trial number, sponsor, principal investigator and site; principal investigator and site fields may stay blank for each site to complete before use. The introduction states that the study has received the required CEIm and AEMPS review.
- Plain language: explain random allocation, blinding and placebo; no full eligibility list; no protocol schedule pasted in (simple patient-facing table instead); no repetition of routine details or the same discomfort.
- Separate routine care from research activities. State whether the medicine is authorised and within its indication; most frequent and most serious risks; unknown risks may exist; procedure risks.
- Benefits only when supported; the participant may receive no benefit; free medicine, tests, results and closer follow-up are not benefits. List main alternatives, including not joining.
- Withdrawal never requires a signed revocation form; if the protocol has one, say that withdrawal is valid without signing it. Distinguish leaving visits, withdrawing trial consent and withdrawing optional future-use consent; data and samples are not used in later analyses after withdrawal unless another lawful route or new consent applies.
- Costs and compensation: no cost for study medicines or trial-specific tests; amount or calculation, payment method and proportional payment on early end; AEMPS warning that compensation is income for Spanish tax purposes; match the financial budget. Insurance: cover meeting Royal Decree 1090/2015 and how to get more information; match the actual Spanish insurance route.
- Pregnancy: specific pregnancy and breastfeeding section when participants or partners could become pregnant; contraception only as in the protocol; partner data only through her own specific consent.
- Data protection: Annex VIIIA Appendix 1 inside each participant document (not a separate upload); legally required trial processing is not presented as depending on an optional GDPR consent; 25-year sponsor and investigator retention; no promise of deletion where retention is required.
- Consent form: handwritten name, signature and date of participant and investigator at consent; confirms the participant read the PIS and data-protection appendix, could ask questions, received enough information, understood voluntariness and agrees. Blank at CTIS submission; the participant receives the PIS and a signed and dated copy.
- CTIS titles carry no version or date (CTCG naming guide v3.0 wins over the guide's "titles with version and date"); version and date go in the document footer and the CTIS metadata.
- Participant templates (JSON): italic text, [square-bracket] and <<double-angle>> notes and "..........." gaps are drafting instructions or gaps; follow them and remove them. Part II templates (DOCX): yellow [INSERT/IF/OTHERWISE/CHOOSE/NOTE: …] labels. Nothing of either may remain in a final document.

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
- population.non_spanish_speakers
- recruitment.material_used
- recruitment.call_centre
- recruitment.procedure_fully_in_protocol
- samples.collected
- samples.archive_used
- samples.future_use_outside_protocol
- data.future_use_outside_protocol
- substudy.optional_subpopulation
- pregnancy.participant_follow_up_beyond_main_consent
- pregnancy.partner_follow_up
- pregnancy.infant_follow_up
- trial.low_intervention
- trial.non_commercial
- insurance.international_policy_exclusions
- insurance.low_intervention_site_liability_cover
- compensation.offered
- compensation.eu_template_used
- budget.individual_site_budgets
- sites.count

## Sources

- **ES-HUB**: https://trialagents.com/ctis/spain/en
- **ES-PII-CHECKLIST**: https://trialagents.com/ctis/spain/en/part-ii-document-checklist
- **ES-ICF**: https://trialagents.com/ctis/spain/en/patient-information-consent-requirements
- **ES-QC**: https://trialagents.com/ctis/spain/en/patient-facing-document-qc-checklist
- **ES-HV**: https://trialagents.com/ctis/spain/en/healthy-volunteer-consent-requirements
- **ES-MINORS**: https://trialagents.com/ctis/spain/en/minor-consent-assent-requirements
- **ES-CAPACITY**: https://trialagents.com/ctis/spain/en/limited-capacity-legal-representative-consent-requirements
- **ES-EMERGENCY**: https://trialagents.com/ctis/spain/en/emergency-enrollment-consent-requirements
- **ES-WITNESS**: https://trialagents.com/ctis/spain/en/impartial-witness-consent-requirements
- **ES-PREGNANCY**: https://trialagents.com/ctis/spain/en/pregnancy-follow-up-requirements
- **ES-SECONDARY**: https://trialagents.com/ctis/spain/en/secondary-use-consent-requirements
- **NAMING**: https://trialagents.com/ctis/ctis-document-naming-convention (content/playbook/naming.md, CTCG v3.0, 10 February 2026)
- **official cited by guides**:
  - AEMPS information on CTIS and Regulation (EU) No 536/2014, updated 29 December 2025
  - AEMPS CTIS Guidance for Sponsors, Spain, version 2, June 2023 (Table 1, Spanish Part II requirements)
  - AEMPS Instruction Document for Conducting Clinical Trials in Spain, version 19, 24 November 2023
  - AEMPS and CEIm Collaboration and Information Exchange Memorandum, version 20 February 2025
  - AEMPS annexes for conducting clinical trials in Spain, updated 27 April 2026: Annex IV (site suitability, 27 March 2023), Annex VA (insurance certificate, 27 March 2023), Annex VB, Annex VI, Annex VII, Annex VIIIA (PIS/ICF model, 27 February 2025), Annex VIIIB (biological-sample paragraphs, 20 December 2017), Annex XIII (biological samples, 28 January 2022)
  - Royal Decree 1090/2015 on clinical trials with medicinal products; Royal Decree 1716/2011 on biobanks; Law 14/2007 on Biomedical Research; Law 41/2002 on Patient Autonomy; Organic Law 3/2018 on data protection; Civil Code article 156
  - Regulation (EU) No 536/2014; Regulation (EU) 2016/679; EudraLex Volume 10 including the July 2026 CTR Q&A; European Commission informed consent and patient recruitment procedure template, version dated 1 June 2026
