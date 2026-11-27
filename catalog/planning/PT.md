---
id: PT
name: Portugal – Part II planning checklist
part: II
country: PT
version: '1.0'
effective: '2026-11-27'
use_when: Part II documents for Portugal.
reference: https://trialagents.com/ctis/portugal/en
checked: '2026-11-27'
naming: Use the CTCG title for each document (see each row’s CTIS title); filename <study code>_<code>[_<variant>]_PT_<language>.
documents:
- code: K1_recruitment-arrangements
  name: Recruitment and informed consent procedure
  required: always
  languages:
  - en
  - pt
  per: trial
  national_notes: 'CTIS title: K1_Recruitment arrangements. Signed at CTIS submission: no

    Explains who identifies potential participants, who makes the first contact, whether medical records are reviewed before contact, what pre-screening data are collected and how undue influence is avoided; the consent procedure for every population pathway in the plan (emergency, impartial witness, minors, adults unable to consent).

    National additions to the form: - **v105**: Portugal: participant-facing recruitment material is in Portuguese (another language only with an exceptional, justified CEIC waiver); each item identified by title, version and date. State who identifies potential participants, who makes the first contact, whether medical records are reviewed before contact, what pre-screening data are collected and how undue influence is avoided. If pre-screening collects health data beyond normal recruitment, explain the data use and obtain the appropriate permission before collection.

    - **v108**: Portugal: Portuguese PIS and ICF for every group and consent pathway, each written for the person who signs it; consent before any trial-specific screening procedure; the participant or legally authorised representative and the person conducting the consent interview sign and date at the time of consent and a signed copy is given; re-consent with the approved update when new information may affect continued participation; trial medicines, auxiliary medicines, administration devices and protocol-only consultations or tests without cost to the participant and the post-trial continuation pathway (Law No 9/2026); optional choices (future use, genetic testing, biobanking, extra samples, recontact) separate from the main decision; privacy wording aligned with the sponsor''s GDPR statement and Law No 58/2019.

    - **v110**: Portugal (Law No 9/2026, Articles 8 and 10; Article 31 CTR): the legally authorised representative is the person, entity or body empowered under applicable law to consent for the incapacitated person; authority is verified and documented before consent and a relative does not automatically have it. Representative consent only when the person did not give or refuse consent before the incapacity began, and after the investigator has assessed capacity for the actual decision. The participant receives information adapted to capacity, affirmative willingness is recorded when it can be expressed and an explicit refusal or sustained objection is respected. Adults in institutional placement are excluded unless nonparticipation would cause a potential prejudice or disadvantage; then representative consent in coordination with the treating physician, with the investigator taking part, justified in the protocol and approved by CEIC. If capacity returns, direct written informed consent promptly.

    - **v114**: Portugal (Law No 9/2026, Articles 8 and 9; Article 32 CTR): consent of the legally authorised representative, whose authority is verified for the individual minor (no universal two-parent signature rule); assent is required at ages 16 and 17 and, under 16, whenever the minor can form an opinion and evaluate the information, regardless of form; a participant who turns 16 during the trial gives written assent to continue (existing representative consent remains valid); a participant who turns 18 gives their own written informed consent to continue, planned before the birthday. Refusal or later dissent is respected. A minor in institutional or protective placement is excluded unless nonparticipation would create a potential prejudice or disadvantage, attested by the treating physician (investigator coordinates with that physician if different).

    - **v117**: Portugal (Article 29 CTR): the witness pathway applies when the participant or legally authorised representative can consent but cannot write (including physical inability to sign); never in place of a capacity assessment or the emergency exception. Portugal sets no national profession, nationality or relationship requirement for the witness. The witness is impartial, independent of the decision and present for the whole information and consent process; study-team members who recruit, treat or assess the participant are poor choices. An interpreter is identified separately; if one person is proposed for both roles, justify impartiality. Describe how a remote process would be observed and verified. The witness and the person conducting the interview sign and date the ICF.

    - **v121**: Portugal (Law No 9/2026, Article 8(3); Article 35 CTR): enrolment without prior consent only when all conditions are met: grave or immediate risk to life or physical integrity; consent of the participant and of the legally authorised representative not obtainable in time; research directly related to the emergency condition and not possible outside it; protocol and emergency pathway approved in advance by the competent ethics committee; minimal additional risk and burden; well-founded expectation of direct benefit. State who confirms the conditions, what is recorded at enrolment (condition, time, efforts to contact a representative, assessment of each criterion), how quickly the participant or representative is approached and who conducts subsequent consent. Consent as soon as possible from the participant, otherwise the representative; own written consent when capacity returns; refusal or withdrawal stops prospective research subject to safety needs. Minors: apply the minor pathway as soon as the emergency permits.

    Completed by: assistant

    Parte II do CTIS, secção K. Obrigatório. Responder em português (inglês também aceite). Sem assinatura na submissão. Utilizar o modelo EudraLex atual do procedimento de recrutamento e consentimento informado (recomendado em Portugal). Explicar quem identifica os potenciais participantes, quem faz o primeiro contacto, se os registos clínicos são consultados antes do contacto, que dados de pré-seleção são recolhidos e como se evita influência indevida. Preencher a secção de cada via de consentimento do plano (adultos incapazes, menores, testemunha imparcial, emergência) e responder às vias não aplicáveis com a resposta "não aplicável" do modelo. Incluir nos campos nacionais (national_fields) as regras da Lei n.º 9/2026: assentimento aos 16 e 17 anos e abaixo dos 16 quando o menor for capaz de formar opinião, assentimento escrito ao completar 16 anos, consentimento próprio aos 18 anos, representante legalmente autorizado com poderes verificados, exceção restrita para pessoas em acolhimento institucional, condições da inclusão em emergência (artigo 8.º, n.º 3). As vias de recrutamento têm de corresponder a cada item K2.

    Template basis: Current EudraLex recruitment and informed-consent procedure template (Portugal recommends the EU template)'
- code: K2_recruitment-material
  name: Recruitment material
  required: conditional
  condition: 'Every recruitment item that will be used: advertisements, letters, scripts, social-media text, referral material and pre-screening information (healthy-volunteer trials: also telephone scripts and online text).'
  languages:
  - pt
  per: trial
  national_notes: 'CTIS title: K2_Recruitment material_<type>_PT_pt. Signed at CTIS submission: no

    Blank approved material in Portuguese, each item identified by title, version and date. No recruitment claim may overstate likely benefit or understate burden; neutral, non-promotional language.

    Completed by: assistant

    Parte II do CTIS, secção K. Condicional: um documento por cada material de recrutamento utilizado (anúncios, cartas, guiões, textos para redes sociais, material de referenciação, informação de pré-seleção). Em português. Identificar cada item por título, versão e data. Material em branco aprovado; sem assinaturas na submissão. Sem afirmações que exagerem o benefício provável ou minimizem os incómodos; linguagem neutra, não promocional.'
- code: L1_SIS-ICF
  name: Participant information sheet and informed consent form, one set per participant group and consent pathway
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
  - pt
  per: population
  national_notes: 'CTIS title: L1_SIS and ICF_<population>_PT_pt. Signed at CTIS submission: no

    Blank, version-controlled Portuguese PIS and ICF for every participant group and consent pathway (competent adults, healthy volunteers, parents or guardians, adolescents, younger children, adults with limited capacity, pregnant partners and the other population sets that apply). Signed later when consent or assent is obtained, never at submission.

    Completed by: assistant

    Parte II do CTIS, secção L. Obrigatório: um conjunto de informação e consentimento em português por cada grupo e via de consentimento (ver population_sets). Documentos em branco, com controlo de versão; não assinar nem pré-datar. O modelo CEIC de FCI para adultos (janeiro de 2026) é opcional e serve de base aos modelos fornecidos; adaptar ao protocolo. Não pedir a um adulto, pai/mãe, adolescente, representante ou parceira grávida que assine um formulário escrito para outra função.'
- code: L2_other-subject-information
  name: Other participant-facing material (patient cards, instructions, visit schedules, diaries, questionnaires, guides, brochures, appointment information)
  required: always
  languages:
  - pt
  per: trial
  national_notes: 'CTIS title: L2_Other subject information material_<type>_PT_pt. Signed at CTIS submission: no

    The Portugal checklist places these items in CTIS folder L. The naming guide''s R2 pattern (R2_Patient-facing document_<type>_PT_pt) is the alternative for endpoint-related questionnaires and diaries; see DECISIONS.md D3.

    Completed by: assistant (drafting or translation)

    Parte II do CTIS, secção L. Obrigatório para cada material destinado ao participante que o ensaio utilize (cartões do doente, instruções de administração ou do dispositivo, calendários de visitas, diários, questionários, guias, folhetos, informação de marcações). Em português, salvo dispensa excecional e justificada da CEIC. Conferir com o calendário de atividades do protocolo. Questionários e diários de parâmetros de avaliação: confirmar o local de submissão (DECISIONS.md D3).'
- code: M1_CV
  name: Principal investigator CV
  required: always
  languages:
  - en
  - pt
  per: site
  national_notes: 'CTIS title: M1_CV_<investigator>_<site>. Signed at CTIS submission: yes

    Current CV of the principal investigator at each Portuguese site: relevant education, clinical-trial experience and ability to conduct the protocol. GCP information may be given in the CV (MedEthicsEU Portugal overview).

    Completed by: investigator

    Parte II do CTIS, secção M. Obrigatório por investigador principal e centro. Português ou inglês. Modelo EudraLex de CV recomendado. O CV deve estar atualizado, assinado e datado pelo investigador antes da submissão. O assistente preenche apenas o número UE do ensaio; todos os dados pessoais, formação, experiência e GCP são fornecidos pelo investigador e não são inventados. Nome do centro, identidade do investigador e número estimado de participantes coerentes com o CTIS, a declaração do centro e os documentos financeiros.

    Template basis: EudraLex CV template (recommended in Portugal)'
- code: M2_DoI
  name: Declaration of interests
  required: always
  languages:
  - en
  - pt
  per: site
  national_notes: 'CTIS title: M2_DoI_<investigator>_<site>. Signed at CTIS submission: yes

    Completed by: investigator

    Parte II do CTIS, secção M. Obrigatório por investigador principal e centro. Português ou inglês. Utilizar o modelo EudraLex. O investigador assina e data a declaração antes da submissão. O assistente preenche apenas o título do ensaio e o número UE do ensaio; as declarações de interesses são do próprio investigador.

    Template basis: EudraLex declaration-of-interest template (to be used in Portugal)'
- code: M2_gcp-training
  name: Good Clinical Practice certificate
  required: conditional
  condition: Provide a GCP certificate when competence is not sufficiently documented in the CV or when requested by the Portuguese checklist. The MedEthicsEU Portugal overview accepts GCP information in the CV.
  languages:
  - en
  - pt
  per: site
  national_notes: 'CTIS title: M2_GCP training_<investigator>_<site>. Signed at CTIS submission: no

    The guide names no CTIS title; the title follows the Austria and Germany pattern (DECISIONS.md D6).

    Completed by: investigator / training provider

    Parte II do CTIS, secção M. Condicional: certificado de Boas Práticas Clínicas quando a competência não estiver suficientemente documentada no CV ou quando a checklist portuguesa o pedir. Fornecido pelo investigador ou entidade formadora; apenas verificado. Título CTIS a confirmar (DECISIONS.md D6).'
- code: N1_site-suitability
  name: Site-suitability form with Portuguese national site detail
  required: always
  languages:
  - en
  - pt
  per: site
  national_notes: 'CTIS title: N1_Site suitability form_<site>. Signed at CTIS submission: yes

    Site infrastructure, equipment, human resources, expected recruitment and ability to perform the protocol, plus pharmacy and investigational-product circuit information and any external facility. Site name, investigator identity and estimated participant number consistent with CTIS, the CV and the financial documents.

    National additions to the form: - **v125**: Portugal: the declaration covers the site''s infrastructure, equipment, human resources, expected recruitment and ability to perform this protocol. Site name, principal investigator and estimated participant number in Section 1 are completed by the site and must match CTIS, the CV and the financial documents.

    - **v126**: Portugal: include the pharmaceutical services and the investigational-medicinal-product circuit: how receipt, storage, preparation, dispensing, return and destruction are controlled (with the pharmaceutical-services declaration, PT-N-PHARMACY).

    - **v128**: Portugal: identify any external facility that performs protocol tests or assessments, why it is needed, and that licensing evidence, extended insurance cover and the financial agreement are provided (PT-N-EXTERNAL).

    - **v129**: Portugal: describe the research team and its functions consistently with the authorisation for the composition of the research team (PT-N-SERVICE) and the financial arrangements (PT-P2); identify an external study coordinator or one outside the site hierarchy (PT-N-COORDINATOR).

    - **n1 issued by**: Portugal: a signed and dated declaration is required at submission (CEIC checklist: authored and signed by the Director of Service). Leave the signature block empty for the signatory; do not invent names.

    Completed by: assistant; site fields and signature left empty for the site

    Parte II do CTIS, secção N. Obrigatório, um documento por centro. Português ou inglês. Portugal aceita o formulário EudraLex, mas exige detalhe nacional adicional: infraestruturas, equipamento, recursos humanos, recrutamento previsto e capacidade para cumprir o protocolo; serviços farmacêuticos e circuito do medicamento experimental (receção, armazenamento, preparação, dispensa, devolução e destruição); entidades externas que realizem testes ou avaliações do protocolo. Os dados do centro (nome, investigador principal, número previsto de participantes, identificação) ficam em branco para o centro. Declaração assinada e datada na submissão; a checklist CEIC prevê autoria e assinatura pelo Diretor do Serviço (DECISIONS.md D5); deixar o bloco de assinatura em branco.

    Template basis: EudraLex site-suitability form (accepted in Portugal), with the national site detail the CEIC checklist requires'
- code: N2_list-of-sites
  name: Authorisation to conduct the trial in the service and for the composition of the research team
  required: always
  languages:
  - en
  - pt
  per: site
  national_notes: 'CTIS title: N2_Service and research team authorisation_<site>. Signed at CTIS submission: yes

    The guides name no CTIS title or separate slot; it may instead form part of the N1 site declaration (DECISIONS.md D4).

    Completed by: site (Director of Service)

    Parte II do CTIS, secção N. Obrigatório por centro: autorização para a realização do ensaio no serviço e para a composição da equipa de investigação, da autoria do Diretor do Serviço, assinada e datada na submissão. Documento do centro; apenas verificado (coerência com N1, CV e contrato). Título e local de submissão a confirmar (DECISIONS.md D4).'
- code: N3_pharmaceutical-services-declaration-and-imp-circuit
  name: Pharmaceutical-services declaration and investigational-medicinal-product circuit
  required: always
  languages:
  - en
  - pt
  per: site
  national_notes: 'CTIS title: N3_Pharmaceutical services declaration and IMP circuit_<site>. Declaration from the pharmaceutical services and a description or declaration of the IMP circuit: how receipt, storage, preparation, dispensing, return and destruction will be controlled.

    The guides name no CTIS title or separate slot; it may instead form part of the N1 site declaration (DECISIONS.md D4).

    Completed by: site pharmaceutical services

    Parte II do CTIS, secção N. Obrigatório por centro: declaração dos serviços farmacêuticos e descrição ou declaração do circuito do medicamento experimental (receção, armazenamento, preparação, dispensa, devolução e destruição). Documento do centro; apenas verificado contra o protocolo, o manual da farmácia e o N1. Regra de assinatura não indicada nos guias (DECISIONS.md D11).'
- code: PT_evidence-for-an-external-study-coordinator
  name: Evidence for an external study coordinator
  required: conditional
  condition: A study coordinator is provided by an external entity or does not sit clearly within the site's hierarchy.
  languages:
  - en
  - pt
  per: site
  national_notes: 'CTIS title: N<next number>_Study coordinator evidence_<site>. The supporting employment, authority, confidentiality and institutional-agreement evidence requested in the CEIC checklist.

    The naming guide gives no fixed code; use the next free N number. The detailed CEIC list is not reproduced in the guides (DECISIONS.md, Missing).

    Completed by: site / external entity

    Parte II do CTIS, secção N. Condicional: quando o coordenador do estudo for disponibilizado por entidade externa ou não estiver claramente integrado na hierarquia do centro, incluir a evidência de vínculo laboral, autoridade, confidencialidade e acordo institucional pedida na checklist CEIC. Fornecido pelo centro ou entidade externa; apenas verificado.'
- code: PT_external-facility-documentation
  name: External facility documentation
  required: conditional
  condition: An external facility will perform protocol tests or assessments.
  languages:
  - en
  - pt
  per: trial
  national_notes: 'CTIS title: N<next number>_External facility documentation_<facility>_<site>. Identify the facility and why it is needed, describe it in the site declaration, provide licensing evidence where applicable, extend the insurance cover to it and provide the relevant financial agreement. A later material change to the external provider may require a substantial modification.

    The naming guide gives no fixed code; use the next free N number.

    Completed by: site / external facility

    Parte II do CTIS, secção N. Condicional: quando uma entidade externa realizar testes ou avaliações do protocolo, identificá-la e justificar a necessidade, descrevê-la na declaração do centro (N1), apresentar evidência de licenciamento quando aplicável, estender o seguro a essa entidade (O1) e apresentar o acordo financeiro (P2). Uma alteração material posterior do prestador externo pode exigir modificação substancial.'
- code: O1_insurance-certificate
  name: Insurance certificate
  required: always
  languages:
  - en
  - pt
  per: trial
  national_notes: 'CTIS title: O1_Trial participant insurance certificate_PT. Not needed if: trial.low_intervention and CEIC has accepted evidence that existing civil-liability insurance covers the statutory damage (PT-O2)

    Signed at CTIS submission: yes

    Valid certificate identifying the trial, insurer, insured party, policy number, type of insurance, coverage and validity. Civil-liability cover appropriate to the nature and extent of the risk, valid during the trial and for 12 months after the last participant completes the study in Portugal (CEIC may set a longer period). Portuguese law presumes that health damage arising during participation or in the following year was caused by the trial unless the presumption is rebutted. Covers every Portuguese site and applicable external facility.

    Completed by: insurer

    Parte II do CTIS, secção O. Obrigatório. Certificado válido, datado e assinado pela seguradora, que identifique o ensaio, a seguradora, o tomador/segurado, o número da apólice, o tipo de seguro, as coberturas e a validade. Seguro de responsabilidade civil adequado à natureza e extensão do risco, válido durante o ensaio e 12 meses após o último participante concluir o estudo em Portugal (a CEIC pode fixar prazo superior). Deve cobrir todos os centros portugueses e entidades externas aplicáveis. A redação do seguro na informação ao participante tem de coincidir com este certificado.'
- code: O2_proof-of-coverage
  name: Evidence that existing civil-liability insurance covers a low-intervention trial
  required: conditional
  condition: For a low-intervention trial, CEIC may dispense with a separate trial-specific policy if the sponsor presents evidence that existing civil-liability insurance covers the statutory damage. Low intervention does not by itself remove the insurance requirement; CEIC acceptance is needed.
  languages:
  - en
  - pt
  per: trial
  national_notes: 'CTIS title: O2_Proof of coverage_<sponsor or site>. Completed by: sponsor / insurer

    Parte II do CTIS, secção O. Condicional: só em ensaio de baixa intervenção quando o promotor pede à CEIC a dispensa de apólice específica. Apresentar evidência de que o seguro de responsabilidade civil existente cobre os danos legalmente previstos; a dispensa depende de aceitação da CEIC. Não presumir que a baixa intervenção elimina a exigência de seguro (DECISIONS.md D13).'
- code: P2_financial-arrangements
  name: Financial arrangements per site (contract, agreed contract model or minimum-information document)
  required: always
  languages:
  - en
  - pt
  per: site
  national_notes: 'CTIS title: P2_Financial arrangements_<site>. Signed at CTIS submission: no

    Remuneration and functions of the research team consistent with the site declaration; site costs, investigator payments, participant expenses or compensation, external providers; free supply of the IMP, auxiliary medicines, administration devices and protocol-only consultations or tests; the post-trial continuation pathway when the investigator considers the medicine indispensable and there is no comparably effective and safe alternative.

    Completed by: sponsor legal / site

    Parte II do CTIS, secção P. Obrigatório por centro. Português ou inglês. Para a validação inicial é aceite o contrato final, o modelo de contrato acordado ou um documento com a informação mínima obrigatória (orientação CEIC de 24 de agosto de 2022). O contrato definitivo identifica promotor, centro, investigador principal e outras partes e é assinado por todas antes de produzir efeitos. Verificar: remuneração e funções da equipa coerentes com a declaração do centro; custos do centro; pagamentos ao investigador; despesas ou compensação dos participantes; prestadores externos; fornecimento gratuito do medicamento experimental, medicamentos auxiliares, dispositivos de administração e consultas ou exames exclusivos do protocolo; via de continuação pós-ensaio prevista na Lei n.º 9/2026.'
- code: P1_compensation
  name: Participant reimbursement and compensation
  required: conditional
  condition: Participants receive reimbursement or compensation.
  languages:
  - en
  - pt
  per: trial
  national_notes: 'CTIS title: P1_Compensation participants and financial arrangements_PT. Amounts, calculation, payment schedule and any conditions. No completion bonuses or payment structures that could pressure a participant to remain in the trial. Consistent with the PIS and ICF and the site financial arrangements.

    National additions to the form: - **f04**: Portugal: state the amount, calculation and payment schedule. In healthy-volunteer trials CEIC guidance recognises that payment may be made; it compensates time and burden without becoming pressure to accept risk or remain in the trial, and is described separately from expense reimbursement.

    - **f06**: Portugal: no completion bonus or payment structure that could pressure the participant to remain; payment is prorated if the participant stops early, and the investigator has no discretion to withhold earned payment because the participant withdraws.

    Completed by: assistant

    Parte II do CTIS, secção P. Condicional: quando os participantes recebam reembolso ou compensação. O modelo EudraLex é opcional em Portugal; usar se útil. Português ou inglês. Descrever montantes, cálculo, calendário de pagamento e condições; pagamento proporcional em caso de saída antecipada; sem bónus de conclusão nem estruturas que pressionem a permanência. Montantes e condições idênticos aos da informação ao participante e aos acordos financeiros por centro (P2). Regra de assinatura não indicada (DECISIONS.md D11).

    Template basis: EudraLex participant-compensation template; optional in Portugal (use if useful)'
- code: PT_fee-evidence
  name: Fee evidence
  required: conditional
  condition: Portugal charges the applicable national clinical-trial fee unless an exemption applies. Since 2 December 2025 payment or exemption is handled through an electronic process after CTIS submission; the CTIS contact receives the links by email.
  languages:
  - en
  - pt
  per: trial
  national_notes: 'CTIS title: none (no CTIS upload: fee payment or exemption through the electronic process after submission). Signed at CTIS submission: no

    The naming guide does not use section Q; do not upload an unsupported payment document before the process is issued.

    Completed by: sponsor (electronic fee process)

    Pasta Q do CTIS. Condicional: taxa nacional aplicável salvo isenção. Desde 2 de dezembro de 2025 o pagamento ou a isenção são tratados por processo eletrónico após a submissão no CTIS; o contacto CTIS recebe as ligações por correio eletrónico. Seguir as instruções atuais da CEIC e do INFARMED; não carregar comprovativo de pagamento antes de o processo ser emitido. Apenas verificar que o contacto CTIS está correto e que o processo foi concluído.'
- code: R1_data-protection
  name: GDPR compliance statement (sponsor declaration)
  required: always
  languages:
  - en
  - pt
  per: trial
  national_notes: 'CTIS title: R1_Compliance collection and use personal data_PT. Sponsor statement that personal data will be handled in accordance with the GDPR and applicable Portuguese law. The PIS and ICF still need a clear privacy section (controllers, purposes, data categories, legal basis, recipients, coded data, transfers, retention, rights, contacts) aligned with this statement.

    National additions to the form: - **r1 the sponsor declares**: Portugal: state in Portuguese that personal data will also be handled in accordance with applicable Portuguese law, naming Law No 58/2019 implementing the GDPR, so that the statement matches the participant information (which states that the sponsor declared compliance with the GDPR and Law No 58/2019). The guides accept the plain EudraLex statement; this sentence is recommended, not required (DECISIONS.md D2).

    Completed by: assistant

    Pasta R do CTIS. Obrigatório. Declaração do promotor de que os dados pessoais serão tratados de acordo com o RGPD e a legislação portuguesa aplicável. A declaração EudraLex submetida na secção Formulário do CTIS é aceite em Portugal e não precisa de ser duplicada na Parte II quando abrange as atividades do ensaio em Portugal (DECISIONS.md D2). Recomenda-se acrescentar a referência à Lei n.º 58/2019 no campo r1_the_sponsor_declares, para coincidir com a informação ao participante. Não é assinada pelos participantes. Data, nome e função do responsável do promotor apenas a partir das fontes; não inventar.

    Template basis: EudraLex GDPR-compliance statement; the statement submitted in the CTIS Form section is acceptable for Portugal'
- code: S1_biological-samples
  name: Compliance with Member State rules for the collection, storage and future use of human biological samples
  required: conditional
  condition: Biological samples are collected, stored or used. Then the current EudraLex template is mandatory (MedEthicsEU Portugal overview), with the Portugal-specific information completed.
  languages:
  - en
  - pt
  per: trial
  national_notes: 'CTIS title: S1_Compliance collection use storage biological samples_PT. What is collected, why, where it is stored, whether coded or anonymised, how long it is kept, who may receive it and whether future use is optional. Must match the PIS and ICF and any future-use document.

    National additions to the form: - **f03**: Portugal: Law No 12/2005 requires separate informed consent for biological material used for research and that the purpose and storage duration are stated; a sample collected for one purpose cannot normally be used for another without new authorisation unless irreversibly anonymised under the legal conditions; identifiable samples only when the research cannot be done with anonymous material (describe coding, access controls and where the key is held). For a biological-sample bank, written consent identifies the bank''s purposes and responsible body, the kinds of research, risks and benefits, storage conditions and duration, privacy and confidentiality measures and whether results may be communicated. Transfer of a large number of samples or a collection to another national or foreign entity respects the bank''s consented purpose and needs approval of the responsible ethics committees. Withdrawal and destruction of identifiable material within the scope of the law. Genetic research follows the additional protections of Portuguese health and genetic-information law (Law No 12/2005; Decree-Law No 131/2014). Data reuse: Law No 58/2019, Article 31 allows consent covering defined research areas.

    Completed by: assistant

    Pasta S do CTIS. Obrigatório quando sejam colhidas, armazenadas ou utilizadas amostras biológicas; modelo EudraLex atual obrigatório. Português ou inglês. Indicar o que é colhido, porquê, onde é armazenado, se é codificado ou anonimizado, durante quanto tempo, quem o pode receber e se a utilização futura é opcional. Completar a informação específica portuguesa na secção 5 (campo f03): Lei n.º 12/2005 (consentimento separado, finalidade e duração, biobanco, transferências de coleções), Decreto-Lei n.º 131/2014 (informação genética) e Lei n.º 58/2019, artigo 31.º. Coerente com o protocolo, o plano de amostras, a informação ao participante e o documento de utilização secundária/futura.

    Template basis: Current EudraLex template on compliance with Member State rules for the collection, storage and future use of human biological samples (mandatory in Portugal when samples are involved)'
---
# National rules – Portugal

## Authorities and fee

- **competent authority**: INFARMED (Autoridade Nacional do Medicamento e Produtos de Saúde, I.P.); national competent authority, issues the authorisation
- **ethics**: CEIC (Comissão de Ética para a Investigação Clínica) assesses Part II and the ethical elements of Part I. CEIC may designate another eligible Portuguese health ethics committee to carry out the ethics assessment.
- **fee**: Portugal charges the applicable national clinical-trial fee unless an exemption applies. Since 2 December 2025 payment or exemption is handled through an electronic process after CTIS submission; the CTIS contact receives the links by email. Follow the current CEIC and INFARMED instructions; do not upload an unsupported payment document before the process is issued (PT-Q-FEE).

## Language rules

- **participant documents**: pt
- **administrative documents**:
  - pt
  - en
- **rule**: Documents for participants, the protocol synopsis and the lay summary of results must be in Portuguese unless CEIC accepts an exceptional, justified alternative. This covers the PIS and ICF, assent forms, legal-representative information, recruitment materials, patient cards, visit information, instructions, diaries, questionnaires and every other material a participant reads or uses. Most other application documents may be in Portuguese or English.
- **non portuguese speakers**: CEIC may approve another language for participant documents only in an exceptional and justified case. The guides set no further rule for planned non-Portuguese-speaking groups; request the CEIC waiver with the justification before using another language.
- **quality**: Use natural European Portuguese regulatory and clinical terms. A technically accurate translation is not enough if the Portuguese reads like a literal translation of the protocol. Independent proofreading by a qualified Portuguese reviewer (PT-QC section 9).
- **form answers**: Part II forms (shared EU templates in content/eu/templates/part-ii) are answered in Portuguese: the CTIS_PT variable sheet targets Portuguese answers and the guides accept Portuguese or English for dossier documents. English answers only if the user decides so (DECISIONS.md D1).
- **by language**:
  - **pt only**:
    - PT-K2
    - PT-L1
    - PT-L2
  - **pt or en**:
    - PT-K1
    - PT-M1
    - PT-M2-DOI
    - PT-M-GCP
    - PT-N1
    - PT-N-SERVICE
    - PT-N-PHARMACY
    - PT-N-COORDINATOR
    - PT-N-EXTERNAL
    - PT-O1
    - PT-O2
    - PT-P1
    - PT-P2
    - PT-R1
    - PT-S1
- **drafting notes language**: drafting_notes_pt for every document.
- **by language note**: pt_only: participant-facing, Portuguese unless CEIC grants an exceptional justified waiver. pt_or_en: dossier documents in Portuguese or English; forms the assistant answers (K1, N1, P1, R1, S1) are answered in Portuguese (answer_languages).

## Answer languages for forms

- pt

## Populations, age bands and representatives

- **authority**: CEIC (Comissão de Ética para a Investigação Clínica): Part II submission requirements and Portugal checklist v2.0 (1 August 2022) and optional informed-consent model and forms (January 2026); Portuguese Law No 9/2026 of 6 March, Articles 8 to 19; Regulation (EU) No 536/2014, Articles 28 to 35
- **minors**:
  - **age bands**:
    - **band**: 6-11
    - **template**: PT-PT-age-6-11
    - **reader**: child
    - **band**: 12-17
    - **template**: PT-PT-age-12-17
    - **reader**: adolescent
  - **always**:
    - PT-PT-parents
  - **legal thresholds**:
    - **under 16 unable to form opinion**: Representative consent; no assent decision can be obtained, but provide information suited to understanding (suitable child information when meaningful).
    - **under 16 able to form opinion**: Representative consent; assent required, regardless of form; age-appropriate child information and an assent record.
    - **16 17**: Representative consent; assent required; adolescent information and assent form (PT-PT-age-12-17).
    - **turns 16 during trial**: Existing representative consent remains valid; written assent required to continue on an approved written age-16 assent form (provisionally built from PT-PT-age-12-17; DECISIONS.md D7).
    - **turns 18 during trial**: Representative consent no longer substitutes; the participant's own written informed consent on the approved adult PIS and ICF (PT-PT-main or PT-PT-healthy), planned before the birthday.
  - **reconsent at 18**: PT-PT-main or PT-PT-healthy, when participants can reach 18 during participation
  - **under 6**: No age-band template. Under 16 the child is asked for assent whenever able to form an opinion and evaluate the information; otherwise provide information suited to understanding when meaningful (no template; DECISIONS.md D8).
  - **representatives**: Verify who is legally authorised to act for the particular minor; do not assume any accompanying adult has authority. Law No 9/2026 creates no universal two-parent signature rule; confirm the representative evidence for the individual case and any CEIC condition. Record name, relationship or authority, signature and date.
  - **institutional placement**: A minor subject to a placement or institutional measure is generally excluded; enrolment only when nonparticipation would create a potential prejudice or disadvantage for the child, attested by the treating physician (the investigator coordinates with that physician if different). Narrow exception, justified in the protocol and consent procedure before submission.
  - **note**: The statute sets no younger-child age bands; the template bands (6-11, 12-17) are drafting bands built around comprehension and study burden. Avoid one dense adolescent document for every child. No conflict with the authority, which sets legal thresholds at 16 and 18 only.
  - **conflicts**:

- **adults without capacity**:
  - **always**:
    - PT-PT-legal-rep
    - PT-PT-limited-capacity
  - **regained capacity**: PT-PT-main (direct written informed consent promptly, before further non-urgent trial procedures where possible)
  - **note**: Only when the adult is unable to give informed consent and did not give or refuse consent before the incapacity began; capacity assessed for the actual decision. Article 31 CTR conditions. Participant objection is respected and never overridden by the representative.
  - **institutional placement**: An adult unable to consent in institutional placement is generally excluded; enrolment only when nonparticipation would cause a potential prejudice or disadvantage; representative consent in coordination with the treating physician, the responsible investigator taking part, justified in the protocol and approved by CEIC.
  - **conflicts**:
    - The legal-representative template uses the limited-capacity template only 'when the participant can understand adapted information'; the Portugal guide makes participant information adapted to capacity mandatory. The guide wins: PT-PT-limited-capacity is always planned.
- **emergency**:
  - **always**:
    - PT-PT-emergency
  - **as applicable**:
    - PT-PT-legal-rep
    - PT-PT-main
  - **note**: Representative version if the participant may remain unable to consent; direct adult form for participants who recover capacity; minors' set if minors are eligible. Recommended short emergency information sheet has no template (DECISIONS.md D9).
- **impartial witness**:
  - **always**:
    - PT-PT-witness
  - **note**: Only when the participant or representative can consent but cannot write. A witness never replaces a representative, a capacity assessment or the emergency exception.
  - **conflicts**:
    - The witness template's description covers a person who 'cannot read, write or sign'; Article 29 CTR as recorded in the Portugal guide triggers the witness only when the person can consent but cannot write (including a physical inability to sign). The guide wins: the template is planned only in that case.
- **pregnancy**:
  - **participant**: PT-PT-pregnancy only when follow-up goes beyond the main consent (new record access, additional samples, after withdrawal from treatment, new purpose); otherwise the main PIS and ICF covers it.
  - **partner**: PT-PT-pregnant-partner whenever the pregnant partner's data or records are collected (mandatory).
  - **infant**: Infant data or records after birth: explain who authorises the collection and how parental authority is verified; maternal consent does not automatically cover every infant follow-up activity.
  - **conflicts**:
    - The pregnant-partner template says the partner is not a participant of the clinical trial; the guide says she is a separate data subject and may also be a research participant for the follow-up activity. The guide wins in drafting: describe her as taking part in the follow-up activity only (she does not receive the investigational medicine); the template text stays as supplied (DECISIONS.md D12).
- **shareable templates**:
  - PT-PT-pregnant-partner
  - PT-PT-secondary
- **shareable note**: One shared document for several populations only when nothing in it would differ; with minors or represented adults the future-use declaration is adapted to the representative.
- **separate document rules**:
  - A separate document or clearly identified version for every group whose information or decision pathway differs; no one signs a form written for another role (PT-ICF).
  - Adults unable to consent: separate participant information adapted to capacity and separate representative PIS and ICF (PT-CAPACITY).
  - Minors: representative PIS and ICF plus age-appropriate information and assent; do not rely on the parent document as the only explanation (PT-MINORS).
  - A pregnant partner whose data are collected receives her own PIS and ICF; the enrolled participant cannot consent for her (PT-PREGNANCY).
  - Optional future use: a separate future-use PIS and ICF or a clearly separated optional section with its own yes and no choices; Law No 12/2005 requires separate informed consent for biological material used for research (PT-SECONDARY).
  - Emergency enrolment: a full subsequent-consent PIS and ICF; the recommended short emergency information sheet does not replace it (PT-EMERGENCY).

## Drafting rules

- Participant documents in natural European Portuguese, written for a person who has not read the protocol; not a literal translation of protocol language. Short sentences, familiar words, descriptive headings, white space; unavoidable medical terms explained immediately. Keep the consent declaration short and put the explanation in the information section.
- The CEIC adult ICF model (January 2026) is optional guidance; the supplied templates are based on it. Adapt to the protocol; keep the model text where it fits.
- A separate document or clearly identified version for every group whose information or decision pathway differs; never ask an adult participant, parent, adolescent, legal representative or pregnant partner to sign a form written for another role.
- Use the same study title, EU trial number, sponsor, investigator and site details as CTIS; page numbering and a footer with document title, version and date.
- Distinguish routine care from procedures done only for the study. Present foreseeable risks (medicine, procedural, reproductive, privacy) and burdens in plain Portuguese, by likelihood and seriousness where reliable information supports it. Do not imply personal benefit when none is expected; describe alternatives without steering.
- State that trial medicines, auxiliary medicines, administration devices and protocol-only tests or consultations are free to the participant; explain reimbursement or compensation, how it is calculated and whether it is prorated after withdrawal.
- Describe the insurance and injury-compensation route in understandable terms; never ask the participant to waive legal rights. Insurance wording matches the valid policy.
- Explain the Portuguese post-trial continuation pathway (Law No 9/2026) where post-trial treatment may be clinically indispensable, without promising access the protocol and law do not support; consistent with the financial agreement.
- Privacy section: controllers, purposes, data categories, legal basis, recipients, coded-data process, authorised direct access to source records, international transfers and safeguards, retention, rights with trial-law limits and privacy contacts; aligned with the sponsor's GDPR statement and Law No 58/2019. Never promise deletion where clinical-trial law requires retention.
- The main decision to participate is clear and separate from optional future research, optional genetic testing, biobanking, extra samples or unrelated contact; each optional choice has its own yes and no response and declining it does not affect main participation.
- Withdrawal is explained separately for treatment, follow-up, data, stored samples and optional future use.
- Portuguese site contacts for study questions, medical emergencies, participant rights and privacy; explain how new information is given and how the lay summary of results will be available.
- Submitted PIS, ICF and assent forms are blank: no participant, representative, witness or interviewer signatures; signatures and dates are recorded at the time of consent, never pre-dated. Investigator declarations, declaration of interests, site declaration and insurance certificate are separate Part II documents, never merged into the consent form.
- Re-consent triggers: approved new information affecting willingness to continue, amended documents, turning 16 (written assent), turning 18 (own written consent), regained capacity (own written consent).
- Participant templates (JSON): bold marks recommended text (CEIC logic), text boxes and [square-bracket] notes are drafting guidance, underlined italic text marks comprehension-check questions for the investigator, and "..........." gaps are to fill; follow them and remove them. Part II templates (DOCX): yellow [INSERT/IF/CHOOSE/NOTE: …] labels. Nothing of either may remain in a final document.

## Study facts that decide which documents are needed

- population.adult_patients
- population.healthy_volunteers
- population.minors
- population.minors_age_bands
- population.minors_may_reach_16
- population.minors_may_reach_18
- population.adults_without_capacity
- population.group_benefit_research_without_capacity
- population.institutional_placement
- consent.emergency_enrolment
- consent.impartial_witness_possible
- consent.electronic
- population.non_portuguese_speakers
- recruitment.material_used
- recruitment.call_centre
- recruitment.other_information_material
- endpoint_documents.participant_facing
- samples.collected
- samples.archive_used
- samples.future_use_outside_protocol
- samples.biobank_or_repository
- data.future_use_outside_protocol
- data.transfer_outside_eea
- genetics.optional_testing
- pregnancy.participant_follow_up_beyond_main_consent
- pregnancy.partner_follow_up
- pregnancy.infant_follow_up
- trial.low_intervention
- insurance.low_intervention_dispensation_sought
- payment.participant_reimbursement_or_compensation
- sites.external_study_coordinator
- sites.external_facilities
- sites.count

## Sources

- **PT-HUB**: https://trialagents.com/ctis/portugal/en
- **PT-PII-CHECKLIST**: https://trialagents.com/ctis/portugal/en/part-ii-document-checklist
- **PT-ICF**: https://trialagents.com/ctis/portugal/en/patient-information-consent-requirements
- **PT-QC**: https://trialagents.com/ctis/portugal/en/patient-facing-document-qc-checklist
- **PT-HV**: https://trialagents.com/ctis/portugal/en/healthy-volunteer-consent-requirements
- **PT-MINORS**: https://trialagents.com/ctis/portugal/en/minor-consent-assent-requirements
- **PT-CAPACITY**: https://trialagents.com/ctis/portugal/en/limited-capacity-legal-representative-consent-requirements
- **PT-EMERGENCY**: https://trialagents.com/ctis/portugal/en/emergency-enrollment-consent-requirements
- **PT-WITNESS**: https://trialagents.com/ctis/portugal/en/impartial-witness-consent-requirements
- **PT-PREGNANCY**: https://trialagents.com/ctis/portugal/en/pregnancy-follow-up-requirements
- **PT-SECONDARY**: https://trialagents.com/ctis/portugal/en/secondary-use-consent-requirements
- **PT-LAW-9-2026**: https://diariodarepublica.pt/dr/detalhe/lei/9-2026-1068062486
- **PT-LAW-58-2019**: https://diariodarepublica.pt/dr/detalhe/lei/58-2019-123815982
- **PT-LAW-12-2005**: https://diariodarepublica.pt/dr/detalhe/lei/12-2005-624463
- **PT-DL-131-2014**: https://diariodarepublica.pt/dr/detalhe/decreto-lei/131-2014-56384883
- **CEIC-SUBMISSION**: https://www.ceic.pt/documentos-submissao
- **CEIC-FORMS**: https://www.ceic.pt/formularios
- **CEIC-CTR**: https://www.ceic.pt/regulamento-ec
- **CEIC-FINANCIAL**: https://www.ceic.pt/documents/20727/57520/Esclarecimentos%2BCEIC%2Bsobre%2Bprocedimentos%2Brelativos%2Ba%2BDisposi%C3%A7%C3%B5es%2BFinanceiras%2B-%2BContrato%2Bcom%2Bos%2BCentros%2Bde%2BEnsaio%2B%C2%BF%2BPasta%2BP.%2BRegulamento%2Bde%2BEnsaios%2BCl%C3%ADnicos%2B%C2%BF%2BSubmiss%C3%A3o%2BCTIS/8cd44084-0a8b-48cb-b351-e9ac2099d565
- **CEIC-CONSENT-CHECKLIST-2020**: https://www.ceic.pt/documents/20727/57535/Nota%2BCIF/1a5c0f0b-68cf-427f-a11c-01182a45ed0f
- **INFARMED-CT**: https://www.infarmed.pt/web/infarmed/entidades/medicamentos-uso-humano/ensaios-clinicos
- **INFARMED-CTIS**: https://www.infarmed.pt/web/infarmed/entidades/medicamentos-uso-humano/ensaios-clinicos/submissao-ensaios-clinicos
- **EUDRALEX-10**: https://health.ec.europa.eu/medicinal-products/eudralex/eudralex-volume-10_en
- **MEDETHICSEU-OVERVIEW**: https://health.ec.europa.eu/document/download/7ae68dce-da1a-40e5-81ed-25d6211cda0b_en?filename=mp_ct_medethicseu_deliverables_cta-per-ms_en.pdf
- **CTR**: https://eur-lex.europa.eu/eli/reg/2014/536/oj/eng
