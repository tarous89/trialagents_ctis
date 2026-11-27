---
id: CZ
name: Czechia – Part II planning checklist
part: II
country: CZ
version: '1.0'
effective: '2026-11-27'
use_when: Part II documents for Czechia.
reference: https://trialagents.com/ctis/czechia/en
checked: '2026-11-27'
naming: Use the CTCG title for each document (see each row’s CTIS title); filename <study code>_<code>[_<variant>]_CZ_<language>.
documents:
- code: B1_cover-letter
  name: Machine-readable list of the documentation under review, with version and date of each document
  required: always
  languages:
  - cs
  per: trial
  national_notes: 'CTIS title: B1_Cover letter_<EU CT number>. Signed at CTIS submission: no

    Machine-readable list of every document under review with its version and date. Versions and dates must match the uploaded documents and each participant document''s footer.

    Completed by: sponsor (in the cover letter, or as a separate machine-readable list)

    Formulářová část CTIS (průvodní dopis) nebo samostatný soubor. Povinné. Strojově čitelný seznam veškeré předkládané dokumentace s verzí a datem každého dokumentu. SÚKL umožňuje uvést seznam přímo v průvodním dopise, samostatný soubor proto není nutný. Národní požadavek na podpis seznamu SÚKL nestanoví. Verze a data musí odpovídat nahrávaným dokumentům a zápatím dokumentů pro účastníky.'
- code: L1_SIS-ICF
  name: Czech participant information sheet and informed consent form (PIS/ICF), one set per population
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
  - cs
  per: population
  national_notes: 'CTIS title: L1_SIS and ICF_<population>_CZ_cs. Signed at CTIS submission: no

    Blank Czech PIS/ICF submitted in CTIS; signed only at consent. Not the original English version, and no standard bilingual version. Every Czech version contains the EU CT Number, the full trial title, the ethics committee e-mail (no telephone number), consent to access to source medical records by monitors, auditors, regulators or medicines agencies, ethics committee members and study-team members as applicable, the statement that results will be available on the EMA clinical trials website, and the statement that one dated and signed copy is given to the participant and one remains at the site.

    The Part II checklist page says the PIS/ICF is submitted under the SÚKL category ''All Documents''. Foreign-language versions are certified translations of the approved Czech version, submitted later as a non-substantial amendment (bilingual allowed only then).

    Completed by: assistant

    CTIS část II, oddíl L. Povinné, jeden soubor pro každou populaci. Předkládá se pouze česká verze; původní anglická verze se nepředkládá (SÚKL ji neposuzuje ani neschvaluje) a standardní dvojjazyčné verze nejsou přípustné. V CTIS se nahrává prázdný formulář; účastník ani zkoušející jej při podání nepodepisují. Každá česká verze musí obsahovat EU CT číslo, celý název klinického hodnocení, e-mail etické komise (eticka.komise@sukl.gov.cz nebo e-mail příslušné etické komise; telefonní číslo etické komise neuvádět), souhlas s přístupem do zdrojové zdravotnické dokumentace (monitoři, auditoři, regulační orgány nebo lékové agentury, členové etické komise a studijního týmu podle situace), sdělení, že výsledky budou dostupné na webu EMA pro klinická hodnocení (euclinicaltrials.eu), a sdělení, že jeden datovaný a podepsaný stejnopis obdrží účastník a jeden zůstává na pracovišti. Doporučení KLH-22 verze 5: srozumitelný jazyk bez zbytečných odborných výrazů a zkratek, jazyková kontrola před podáním, pro dospělé a rodiče zpravidla nejvýše přibližně 8 stran (ve specifických případech 10), číslované strany s verzí, datem a identifikací hodnocení; výzkumné postupy odlišit od běžné péče a volitelné činnosti od povinných. Informovaný souhlas získává zkoušející. Elektronický PIS/ICF je přípustný; elektronický podpis jen kvalifikovaný, uznávaný nebo zaručený, případně dynamický biometrický podpis podle KLH-CTIS-01. Odměnu za účast lze podle KLH-22 uvádět jen u fáze I, bioekvivalence a farmakokinetiky a ne u zranitelných účastníků; náhrada výdajů je samostatný pojem.'
- code: L1_SIS-ICF-2
  name: Age-specific and capacity-specific consent documents (minors, adults with limited capacity, emergency enrolment, impartial witness)
  required: conditional
  condition: The study includes minors, adults with limited capacity, emergency enrolment or a consent pathway requiring an impartial witness.
  languages:
  - cs
  per: trial
  national_notes: 'CTIS title: L1_SIS and ICF_<template subtype>_<population>_CZ_cs. Signed at CTIS submission: no

    Separate or adapted Czech participant-facing documents for each special consent pathway, submitted blank and signed during the applicable consent procedure. Written information for minors aged 12 to 14 and 15 to 17 is mandatory (SÚKL). Each version keeps the Czech national PIS/ICF items.

    Completed by: assistant

    CTIS část II, oddíl L. Podmíněné: pro nezletilé, dospělé se sníženou schopností rozhodovat, zařazení v naléhavé situaci a postup s nezávislým svědkem. Prázdné formuláře, podepisují se až při získávání souhlasu. U nezletilých jsou povinné samostatné písemné informace pro věk 12–14 a 15–17 let; pro děti mladší 12 let připravte věku přiměřené informace, pokud to vyspělost dítěte a populace protokolu umožňují (podpis dítěte mladšího 11 let není povinný). Pro klinická hodnocení podaná přes CTIS postačuje podpis jednoho rodiče (KLH-22). Při přechodu do vyšší věkové skupiny a při dosažení 18 let se získává nový souhlas. U zákonně ustanoveného zástupce vycházejte z rozsahu soudního rozhodnutí; nevytvářejte hierarchii zástupců. Nezávislý svědek musí být nezávislý na studijním týmu; postup platí pro účastníka, který nemůže psát, i pro účastníka, který nemůže číst (KLH-22). Ve všech verzích zachovejte české národní náležitosti (EU CT číslo, celý název, e-mail etické komise, přístup ke zdravotnické dokumentaci, výsledky na webu EMA, stejnopis).'
- code: L2_other-subject-information
  name: 'Other participant materials: diaries, participation cards, questionnaires, instructions for use, screenshots of electronic questionnaires'
  required: conditional
  condition: Diaries, participation cards, questionnaires or other participant materials apply to the trial; instructions for use are mandatory when applicable for self-administered medicinal products and for relevant medical devices.
  languages:
  - cs
  per: trial
  national_notes: 'CTIS title: L2_Other subject information material_<type>_CZ_cs. Signed at CTIS submission: no

    Czech participant materials as used. Screenshots for electronic questionnaires. Instructions for use for self-administered medicinal products and relevant medical devices.

    Completed by: assistant (manufacturer instructions for use are supplied documents)

    CTIS část II (kategorii průvodce neuvádí; navrženo L2). Podmíněné: deníky, karty účastníka, dotazníky a další materiály pro účastníky, které se na hodnocení vztahují; jeden dokument na každý materiál. Česky. Dotazník smí být anglicky jen tehdy, pokud jej vyplňuje zkoušející společně s účastníkem; pak nebude uveden mezi schválenými dokumenty v rozhodnutí. U elektronických dotazníků předložte snímky obrazovky. Návod k použití je povinný, je-li relevantní, u léčivých přípravků, které si účastník podává sám, a u příslušných zdravotnických prostředků. Obsah musí odpovídat protokolu a aktuální verzi PIS/ICF.'
- code: K1_recruitment-arrangements
  name: Recruitment and informed consent procedure (SÚKL Template No. 1 / EU template v2.0)
  required: always
  languages:
  - cs
  - en
  per: trial
  national_notes: 'CTIS title: K1_Recruitment arrangements. Signed at CTIS submission: no

    How potential participants are identified, approached, informed and consented, with a completed section for every population pathway in the plan. Annex I requires, where the pathways apply, the emergency procedure (how urgency is identified and documented, information given later, consent to continue) and the reason for, selection of and procedure with an impartial witness. Healthy-volunteer recruitment and consent process included where applicable.

    National additions to the form: - **v105**: Czechia: all recruitment advertisements, leaflets and other materials are submitted (K2); audio, video or other non-print formats are submitted in that format in CTIS where possible. Participant-facing material is Czech.

    - **v108**: Czechia: the consent process is conducted by the investigator; the participant has enough time to consider and ask questions (KLH-22). Czech PIS/ICF only; a foreign national who demonstrably understands another language receives a certified translation of the approved Czech version, submitted through CTIS as a non-substantial amendment. The participant or legally designated representative and the person conducting the interview sign and date; one dated and signed copy for the participant and one kept at the site. Electronic consent only with a qualified, recognised or guaranteed electronic signature or a dynamic biometric signature; a sponsor-created signature not meeting SÚKL''s criteria is not accepted.

    - **v110**: Czechia: who gives legally valid consent follows the participant''s legal status and the scope of any court ruling on healthcare decisions; if the ruling does not remove the ability to make the relevant healthcare decision, the participant may consent personally. A caregiver is not thereby the legally designated representative. Information adapted to the participant''s capacity; explicit refusal respected. For acute or severely deteriorated participants KLH-22 recommends a short basic information stage and fuller information after stabilisation. The participant''s own consent is obtained once capacity is regained.

    - **v114**: Czechia: written information for minors aged 12 to 14 and 15 to 17 is mandatory (SÚKL); children under 12 receive age-appropriate information where meaningful and may express willingness on the form with their parents (a signature under age 11 is not mandatory). One parent''s signature is acceptable for trials submitted through CTIS (KLH-22). The minor signs the age-specific document to confirm willingness; this does not replace the parent''s or representative''s consent. Re-consent when the minor moves into the next age band and at 18 with the adult PIS/ICF.

    - **v117**: Czechia: the impartial-witness procedure applies when the participant cannot write (Article 29 CTR) and, per KLH-22, when the participant cannot read; the witness is independent of the study team, is not a study-team member merely present at the discussion, and signs and dates; state how the witness is selected.

    - **v121**: Czechia: all Article 35 conditions; describe how urgency is identified and documented, the information given later and how consent to continue is sought without undue delay; where an abbreviated information stage is used, fuller information and continued consent after stabilisation (KLH-22); the right to object to use of data already obtained.

    Completed by: assistant

    CTIS část II, oddíl K (Recruitment Arrangements). Povinné. SÚKL vyžaduje svou šablonu č. 1 „Nábor subjektů hodnocení a získání informovaného souhlasu“ (28. ledna 2026; dvojjazyčná, lze vyplnit česky nebo anglicky); od 1. září 2026 se pro nová podání části II uplatňuje harmonizovaná šablona Evropské komise verze 2.0. Tato sdílená šablona v2.0 je vyplňována česky; před podáním ověřte s aktuálním zněním šablony SÚKL č. 1, že jsou zahrnuta všechna česká národní pole (DECISIONS.md D1). Bez podpisu při podání. Vyplňte oddíl pro každou populaci s vlastním postupem souhlasu (dospělí bez způsobilosti, nezletilí, nezávislý svědek, naléhavá situace) a u ostatních uveďte odpověď „nevztahuje se“. Do polí členského státu (national_fields) doplňte české požadavky. Náborové cesty musí odpovídat všem materiálům K2.

    Template basis: European Commission harmonised recruitment and informed consent procedure template v2.0, applicable to new Part II submissions from 1 September 2026. SÚKL KLH-CTIS-01 Version 3 (28 January 2026) still lists its mandatory national Template No. 1 (Trial subject recruitment and obtaining of informed consent, 28 January 2026), which was not supplied; the guide says to check both forms together and include all Czech national fields (DECISIONS.md D1).'
- code: K2_recruitment-material
  name: Recruitment advertisements, leaflets and other recruitment materials
  required: conditional
  condition: Advertisements, leaflets or other materials (including audio, video or other non-print formats) are used for recruitment.
  languages:
  - cs
  per: trial
  national_notes: 'CTIS title: K2_Recruitment material_<type>_CZ_cs. Signed at CTIS submission: no

    All recruitment advertisements, leaflets and other materials as they will be used; non-print formats submitted in that format in CTIS where possible. Content consistent with K1, the PIS/ICF and P1.

    Completed by: assistant

    CTIS část II, oddíl K. Podmíněné: předkládají se všechny náborové inzeráty, letáky a další materiály; jeden dokument na každý materiál. Pokud nábor využívá zvukový, obrazový nebo jiný netištěný formát, předložte jej podle možností v tomto formátu přímo v CTIS. Česky. Bez podpisu. Obsah musí odpovídat K1, PIS/ICF a údajům o náhradách (P1) a musí jít o aktuální verzi obsahu.'
- code: M1_CV
  name: Principal investigator CV (SÚKL Template No. 2)
  required: always
  languages:
  - cs
  per: site
  national_notes: 'CTIS title: M1_CV_<investigator>_<site>. Signed at CTIS submission: yes

    Current CV of the principal investigator on SÚKL Template No. 2, completed in Czech. If GCP training is documented only in the CV, it gives the month, year and training provider.

    Completed by: investigator

    CTIS část II, oddíl M (Suitability of the Investigator). Povinné pro každého hlavního zkoušejícího a pracoviště. Použijte šablonu SÚKL č. 2 „Životopis zkoušejícího“ (28. ledna 2026), nikoli evropskou šablonu; vyplňuje se česky. Při podání musí být datován a podepsán lékařem: vlastnoruční podpis, uznávaný, kvalifikovaný nebo zaručený elektronický podpis, nebo dynamický biometrický podpis; DocuSign ani podpis vytvořený zadavatelem, který nesplňuje kritéria SÚKL, nejsou přijatelné. Pokud je školení SVP uvedeno jen v životopise, uveďte měsíc, rok a poskytovatele školení. Osobní údaje dodává zkoušející; asistent žádné osobní údaje nevymýšlí.'
- code: M2_gcp-training
  name: Separate Good Clinical Practice certificate of the principal investigator
  required: conditional
  condition: A separate GCP certificate is submitted instead of documenting GCP training only in the CV.
  languages:
  - cs
  - en
  per: site
  national_notes: 'CTIS title: M2_GCP training_<investigator>_<site>. Signed at CTIS submission: no

    Not older than three years and identifies the version of ICH E6 covered by the training (SÚKL).

    Completed by: training provider

    CTIS část II, oddíl M. Podmíněné: pouze pokud se předkládá samostatný certifikát SVP (jinak stačí údaje v životopise). Certifikát nesmí být starší tří let a musí uvádět verzi ICH E6, kterou školení pokrývalo. Záznamy a doklady o SVP dalších členů týmu se v části II nepředkládají a zůstávají na pracovišti.'
- code: M2_DoI
  name: Declaration of investigator's interest (SÚKL Template No. 3)
  required: always
  languages:
  - cs
  per: site
  national_notes: 'CTIS title: M2_DoI_<investigator>_<site>. Signed at CTIS submission: yes

    Completed by: investigator

    CTIS část II, oddíl M. Povinné pro každého hlavního zkoušejícího a pracoviště. Šablona SÚKL č. 3 „Prohlášení o zájmech zkoušejícího“ (28. ledna 2026), česky. Při podání datuje a podepisuje lékař; platí stejná pravidla pro podpis jako u životopisu (DocuSign ani podpis vytvořený zadavatelem nesplňující kritéria SÚKL nejsou přijatelné). Údaje o zájmech vyplňuje zkoušející sám; asistent nic nevymýšlí.'
- code: N2_list-of-sites
  name: Machine-readable list of trial sites and principal investigators
  required: always
  languages:
  - cs
  per: trial
  national_notes: 'CTIS title: N2_List of trial sites and principal investigators_CZ. Signed at CTIS submission: no

    Machine-readable list in Czech with all Czech trial sites and principal investigators, preserving Czech diacritics and all academic titles. No lists of sub-investigators or other team members in Part II; their records and GCP evidence stay at the site.

    Completed by: sponsor (machine-readable list from the CTIS site data)

    CTIS část II. Povinné. Strojově čitelný seznam míst hodnocení a hlavních zkoušejících v češtině; zachovejte českou diakritiku a všechny akademické tituly. Seznamy dalších zkoušejících a členů týmu SÚKL v části II nepožaduje; jejich záznamy a doklady o SVP zůstávají na pracovišti. Údaje musí odpovídat CTIS, formulářům vhodnosti pracoviště (N1), životopisům a prohlášením o zájmech.'
- code: N1_site-suitability
  name: Site suitability (SÚKL Template No. 4)
  required: always
  languages:
  - cs
  per: site
  national_notes: 'CTIS title: N1_Site suitability form_<site>. Signed at CTIS submission: yes

    One form per Czech site identifying the site name and address. Where protocol procedures are performed outside the main site, identify who provides them in the site documentation.

    Completed by: site (department head, clinic director or principal investigator signs)

    CTIS část II, oddíl N (Suitability of the Facilities). Povinné, jeden formulář pro každé české pracoviště. Šablona SÚKL č. 4 „Vhodnost pracoviště“ (28. ledna 2026), nikoli evropská šablona. Musí uvádět název a adresu pracoviště. Při podání podepisuje přednosta oddělení, ředitel kliniky nebo hlavní zkoušející; přípustné jsou stejné metody podpisu jako u životopisu (DocuSign ani podpis vytvořený zadavatelem nesplňující kritéria SÚKL nejsou přijatelné). Pokud se postupy protokolu provádějí mimo hlavní pracoviště, uveďte v dokumentaci pracoviště, kdo je zajišťuje. Údaje pracoviště vyplňuje pracoviště; asistent je nevymýšlí.'
- code: CZ_regional-authority-evidence-of-healthcare-facility
  name: Regional Authority evidence of healthcare-facility status and permitted scope of activities
  required: conditional
  condition: A non-state healthcare facility, or a facility established by an entity other than the Czech Ministry of Health, is a trial site; or part of the trial is performed at a sub-site.
  languages:
  - cs
  per: trial
  national_notes: 'CTIS title: N<next number>_Healthcare facility evidence_<site>. Signed at CTIS submission: no

    Evidence from the Regional Authority confirming healthcare-facility status and the permitted scope of activities, for the site and for any sub-site where part of the trial is performed.

    Completed by: site (Regional Authority document)

    CTIS část II, oddíl N. Podmíněné: u nestátních zdravotnických zařízení a zařízení, jejichž zřizovatelem není Ministerstvo zdravotnictví ČR, předložte doklad krajského úřadu o statusu zdravotnického zařízení a povoleném rozsahu činnosti. Totéž platí pro dílčí pracoviště, kde se provádí část hodnocení.'
- code: CZ_scan-of-the-s-kl-gcp-certificate-of-a-bioequivalen
  name: Scan of the SÚKL GCP certificate of a bioequivalence, pharmacokinetic or First-in-Human site
  required: conditional
  condition: Bioequivalence, pharmacokinetic or First-in-Human site that is required to hold a SÚKL GCP certificate.
  languages:
  - cs
  per: site
  national_notes: 'CTIS title: N<next number>_SÚKL GCP certificate_<site>. Signed at CTIS submission: no

    Completed by: site (SÚKL-issued certificate)

    CTIS část II, oddíl N. Podmíněné: pro pracoviště bioekvivalenčních, farmakokinetických a First-in-Human studií, která musí mít certifikát SVP vydaný SÚKL, předložte jeho sken.'
- code: O1_insurance-certificate
  name: Insurance certificate
  required: always
  languages:
  - cs
  per: trial
  national_notes: 'CTIS title: O1_Trial participant insurance certificate_CZ. Signed at CTIS submission: no

    Insurance certificate under Proof of Insurance Cover or Indemnification. It need not state the number of enrolled participants; if it does and the planned number later increases, an updated certificate is submitted as a non-substantial modification.

    Completed by: insurer

    CTIS část II, oddíl O (Proof of Insurance Cover or Indemnification). Povinné. Pojistný certifikát česky nebo ve dvojjazyčné verzi. Nemusí uvádět počet zařazených účastníků; pokud jej uvádí a plánovaný počet se později zvýší, předložte aktualizovaný certifikát jako nepodstatnou změnu. Pojistitel a údaje musí odpovídat PIS/ICF.'
- code: O2_proof-of-coverage
  name: Complete insurance policy including the terms and conditions
  required: always
  languages:
  - cs
  per: trial
  national_notes: 'CTIS title: O2_Proof of coverage_<sponsor or site>. Signed at CTIS submission: no

    The complete insurance policy including the terms and conditions; SÚKL explicitly states that submission of the terms and conditions is mandatory.

    Completed by: insurer

    CTIS část II, oddíl O. Povinné. Úplná pojistná smlouva včetně pojistných podmínek; předložení pojistných podmínek je podle SÚKL výslovně povinné. Celá pojistná dokumentace česky nebo dvojjazyčně. Pojistné krytí a povinnosti účastníka musí odpovídat PIS/ICF.'
- code: O3_sponsor-statement-post-trial-damage-compensation
  name: Sponsor statement on compensation for health damage that becomes apparent after the trial and after the policy expires
  required: always
  languages:
  - cs
  per: trial
  national_notes: 'CTIS title: O3_Sponsor statement post-trial damage compensation_CZ. Signed at CTIS submission: no

    Sponsor statement explaining how compensation will be ensured for health damage caused by trial participation that becomes apparent only after the trial and after the insurance policy expires.

    Completed by: sponsor

    CTIS část II, oddíl O. Povinné. Prohlášení zadavatele, jak bude zajištěno odškodnění újmy na zdraví způsobené účastí v hodnocení, která se projeví až po skončení hodnocení a po skončení platnosti pojistné smlouvy. Musí odpovídat pojistné dokumentaci (O1, O2) a PIS/ICF.'
- code: R1_data-protection
  name: Sponsor declaration on personal data processing (SÚKL Template No. 5)
  required: always
  languages:
  - cs
  per: trial
  national_notes: 'CTIS title: R1_Compliance collection and use personal data_CZ. Signed at CTIS submission: yes

    Sponsor-signed SÚKL Template No. 5 under Compliance with National Requirements on Data Protection. The sponsor may use the same declaration submitted in Part I under Forms, but it must also be submitted in the Part II data-protection category. Sponsor and controller descriptions consistent with the PIS/ICF.

    Until Template No. 5 is supplied and converted into countries/CZ/templates/part-ii, the EU form only collects the content; it is not the Czech upload.

    Completed by: assistant; signed by the sponsor

    CTIS část II, oddíl R (Compliance with National Requirements on Data Protection). Povinné. Šablona SÚKL č. 5 „Prohlášení zadavatele o zpracování osobních údajů“ (28. ledna 2026) podepsaná zadavatelem; evropská šablona je jen prozatímním podkladem a nenahrává se jako český dokument. Zadavatel ze třetí země podepisuje prohlášení sám; zástupce v EU ani CRO je za něj podepsat nesmí. Lze použít totéž prohlášení jako v části I (Forms), musí však být nahráno i do kategorie ochrany osobních údajů v části II. Popis zadavatele a správce musí odpovídat PIS/ICF; souhlas účastníka nenahrazuje regulatorní dokumentaci zadavatele.

    Template basis: Interim only: EudraLex GDPR compliance statement. Czechia requires the sponsor-signed SÚKL Template No. 5, Sponsor declaration on personal data processing (28 January 2026), which is not in the CTIS_CZ folder.'
- code: S1_biological-samples
  name: Human biological samples compliance form (SÚKL Template No. 7)
  required: conditional
  condition: Human biological samples are collected or stored.
  languages:
  - cs
  per: trial
  national_notes: 'CTIS title: S1_Compliance collection use storage biological samples_CZ. Signed at CTIS submission: no

    Template No. 7 completed in full, covering samples collected during the trial as well as storage and future use; the same storage, coding and future-use model as the participant documents.

    National additions to the form: - **f03**: Czechia: the form covers samples collected during the trial and future use. For optional future research use state the storage duration, whether samples remain pseudonymised or become fully anonymised and the main future research purpose (disease, treatment, genetic testing or broader research, as applicable); consent to future use is either in the main PIS/ICF with its own separate signature or a separate signed document (the CZ template set uses the separate document).

    Completed by: assistant

    Until Template No. 7 is supplied and converted, the EU form only collects the content; it is not the Czech upload.

    CTIS část II, oddíl S (Compliance with Use of Biological Samples). Podmíněné: pokud se odebírají nebo uchovávají lidské biologické vzorky. Šablona SÚKL č. 7 „Soulad s platnými pravidly členského státu pro odběr, uchovávání a budoucí použití lidských biologických vzorků“ (28. ledna 2026), vyplněná v plném rozsahu; evropská šablona je jen prozatímním podkladem. Uveďte vzorky odebírané během hodnocení i jejich budoucí použití. U budoucího použití uveďte dobu uchování, zda vzorky zůstanou pseudonymizované nebo budou plně anonymizované, a hlavní účel budoucího výzkumu. Údaje musí odpovídat protokolu, PIS/ICF a samostatnému dokumentu o budoucím použití; vzorky s kódem, který lze propojit s účastníkem, neoznačujte jako plně anonymizované.

    Template basis: Interim only: EudraLex biological-samples form. Czechia requires SÚKL Template No. 7, Compliance with effective rules of the Member State for sampling, storage and future use of human biological samples (28 January 2026), completed in full; not in the CTIS_CZ folder.'
- code: P1_compensation
  name: Participant compensation and reimbursement information (SÚKL Template No. 6)
  required: always
  languages:
  - cs
  per: trial
  national_notes: 'CTIS title: P1_Compensation participants and financial arrangements_CZ. Signed at CTIS submission: no

    Czech information on expense reimbursement, compensation, any remuneration and the payment method under Financial and Other Arrangements. SÚKL recommends standardising compensation payments as a lump sum. Payment cards: no participant fees, Czech-language support and an alternative reimbursement method. Amounts and conditions identical in every participant document.

    National additions to the form: - **f02**: Czechia: describe expense reimbursement, compensation, any remuneration and the payment method; SÚKL recommends standardising compensation as a lump sum; if payment cards are used, no participant fees, Czech-language support and an alternative reimbursement method. Remuneration only in Phase I, bioequivalence and pharmacokinetic studies and not to vulnerable participants (KLH-22 recommendation).

    - **f06**: Czechia: state the payment conditions and schedule consistently with the PIS/ICF (prorating on early termination where it applies).

    Until Template No. 6 is supplied and converted, the EU form only collects the content; it may be uploaded only with references to every Template No. 6 item, which cannot be built without the template.

    Completed by: assistant

    CTIS část II, oddíl P (Financial and Other Arrangements). Povinná informace. SÚKL poskytuje šablonu č. 6 „Náhrady pro účastníky studie“ (28. ledna 2026); pokud ji zadavatel nepoužije, musí odkazy doložit, kde je řešena každá položka šablony. Evropská šablona je jen prozatímním podkladem. Česky. Popište náhradu výdajů, kompenzaci, případnou odměnu a způsob platby. SÚKL doporučuje kompenzační platby standardizovat jako paušální částku. Při použití platebních karet: žádné poplatky pro účastníka, podpora v češtině a alternativní způsob úhrady. Odměnu podle KLH-22 jen u fáze I, bioekvivalence a farmakokinetiky a ne zranitelným účastníkům. Částky a podmínky musí být shodné ve všech dokumentech pro účastníky.

    Template basis: Interim only: EU compensation template (CTAG). SÚKL provides Template No. 6, Compensation for study participants (28 January 2026), not in the CTIS_CZ folder; a sponsor not using it must give references showing where every Template No. 6 item is addressed.'
- code: P2_funding-of-the-trial
  name: Description of how the clinical trial will be funded (financial coverage)
  required: always
  languages:
  - cs
  per: trial
  national_notes: 'CTIS title: P2_Funding of the trial_CZ. Signed at CTIS submission: no

    Description of how the clinical trial will be funded, under Financial and Other Arrangements.

    Completed by: sponsor

    CTIS část II, oddíl P (Financial and Other Arrangements). Povinné. Popis financování klinického hodnocení. SÚKL popis vyžaduje, ale nepředepisuje pro něj samostatný národní formulář s podpisem.'
- code: CZ_proof-of-part-ii-ethics-fee-payment
  name: Proof of Part II (ethics) fee payment
  required: always
  languages:
  - cs
  per: trial
  national_notes: 'CTIS title: Proof of payment_Part II fee_CZ. Signed at CTIS submission: no

    Do not pay the Part II assessment fee at the initial CTIS submission. SÚKL designates the Ethics Committee in the validation request and provides the payment pathway. SÚKL Ethics Committee: follow UST-29 and the applicable K-023 to K-028 code. Multicentre Ethics Committee: provide billing information and use that committee''s payment instructions.

    Completed by: sponsor (payment confirmation)

    Doklad o zaplacení poplatku za část II. Povinné až v průběhu validace, nikoli při prvním podání. Poplatek neplaťte, dokud není známa určená etická komise; SÚKL ji uvede v žádosti o doplnění při validaci a sdělí platební postup. Je-li určena Etická komise SÚKL, postupujte podle UST-29 a příslušného kódu K-023 až K-028; je-li určena multicentrická etická komise, uveďte fakturační údaje a použijte platební pokyny této komise. Doklad o platbě se předkládá v rámci posuzování.'
- code: CZ_medical-device-and-ivd-documents-conformity-docume
  name: 'Medical-device and IVD documents: conformity documents and national declarations'
  required: conditional
  condition: A medical device or in vitro diagnostic device is used within the clinical trial of a medicinal product. Non-CE-marked devices and devices used outside their intended purpose trigger additional national declarations and, where required, a separate clinical investigation or performance-study authorisation.
  languages:
  - cs
  per: trial
  national_notes: 'CTIS title: Medical device documentation_<device>_CZ. Signed at CTIS submission: no

    Applicable conformity documents, Czech instructions for use, identification of device use in the application; additional national declarations for non-CE-marked devices or use outside the intended purpose; separate clinical investigation or performance-study authorisation pathway where required. Exact scenario per the current KLH-CTIS-01 text.

    Completed by: sponsor or manufacturer

    Podmíněné: pokud se v klinickém hodnocení léčivého přípravku používá zdravotnický prostředek nebo diagnostický zdravotnický prostředek in vitro. Předložte příslušné doklady o shodě a český návod k použití a v žádosti uveďte použití prostředku. Prostředky bez označení CE a prostředky použité mimo určený účel vyžadují další národní prohlášení a případně samostatné povolení klinické zkoušky nebo studie funkční způsobilosti. Přesný scénář ověřte v aktuálním znění KLH-CTIS-01.'
---
# National rules – Czechia

## Authorities and fee

- **competent authority**: SÚKL (Státní ústav pro kontrolu léčiv, State Institute for Drug Control); national competent authority. SÚKL states that proposed studies are assessed by SÚKL and at least one Ethics Committee independently.
- **ethics**: SÚKL designates the Ethics Committee during validation (the SÚKL Ethics Committee or a multicentre Ethics Committee). The ethics assessment focuses in particular on ethical aspects, investigator qualifications and site facilities. Some participant documents (for example pregnant-partner documents) are documents on which the ethics committee gives the opinion rather than documents SÚKL approves (KLH-22).
- **fee**: Do not pay the Part II assessment fee at the initial CTIS submission. SÚKL names the Ethics Committee in the validation request and gives the payment pathway; evidence of payment follows within the assessment (SÚKL Ethics Committee: UST-29 and K-023 to K-028 codes; multicentre Ethics Committee: billing information and that committee's instructions).
- **national guidance**: KLH-CTIS-01 Version 3, 28 January 2026: machine-readable document list, mandatory national templates No. 1 to 7 (28 January 2026), Czech-language, signature, insurance, data-protection, biological-sample and fee rules. KLH-22 Version 5 (1 June 2022): recommended participant-information drafting guidance.

## Language rules

- **participant documents**: cs
- **administrative documents**:
  - cs
- **rule**: Participant documents are Czech only: the original English PIS/ICF is not submitted (not reviewed or approved) and standard bilingual versions are not permitted. Diaries, participant cards and other participant materials are Czech; an English questionnaire only when the investigator completes it with the participant. Investigator CV (Template No. 2), declaration of interest (Template No. 3) and the list of sites and principal investigators are Czech. Template No. 1 may be completed in Czech or English. Insurance documentation is Czech or bilingual. The guides state no language for Templates No. 4, 5, 6 (beyond 'Czech' compensation information) and 7, the funding description, the document list or the post-trial compensation statement (DECISIONS.md D2).
- **foreign nationals**: A foreign national who demonstrably understands another language (preferably the native language) receives a certified translation of the approved Czech PIS/ICF, submitted through CTIS as a non-substantial amendment; a bilingual version is permitted in this situation only. Do not translate an unapproved English master for use in Czechia.
- **form answers**: Shared EU forms (content/eu/templates/part-ii) are answered in Czech, matching the Czech variable sheet. They are bound only as the K1 basis and as interim content for R1, S1 and P1; the mandatory SÚKL templates replace them for upload.
- **by language**:
  - **cs**:
    - CZ-DOC-LIST
    - CZ-L1
    - CZ-L1-POPULATION
    - CZ-L2
    - CZ-K1
    - CZ-K2
    - CZ-M1
    - CZ-M-GCP
    - CZ-M2-DOI
    - CZ-SITE-LIST
    - CZ-N1
    - CZ-N-FACILITY
    - CZ-N-GCP-CERT
    - CZ-O1
    - CZ-O2
    - CZ-O-POSTTRIAL
    - CZ-R1
    - CZ-S1
    - CZ-P1
    - CZ-P-FUNDING
    - CZ-FEE
    - CZ-DEVICE
  - **cs or en**:
    - CZ-K1
    - CZ-M-GCP
  - **cs or bilingual**:
    - CZ-O1
    - CZ-O2
- **drafting notes language**: drafting_notes_cs for every document.

## Answer languages for forms

- cs

## Populations, age bands and representatives

- **authority**: SÚKL (State Institute for Drug Control): KLH-CTIS-01 Version 3 of 28 January 2026 (mandatory national Part II requirements and templates) and KLH-22 Version 5, effective 1 June 2022 (recommended drafting guidance); Regulation (EU) No 536/2014 Articles 28 to 35
- **minors**:
  - **age bands**:
    - **band**: 6-11
    - **template**: CZ-PT-age-6-11
    - **reader**: child
    - **requirement**: conditional (SÚKL group 'under 12': where maturity and protocol population make it meaningful)
    - **band**: 12-14
    - **template**: CZ-PT-age-12-14
    - **reader**: adolescent
    - **requirement**: mandatory written information (SÚKL)
    - **band**: 15-17
    - **template**: CZ-PT-age-15-17
    - **reader**: adolescent
    - **requirement**: mandatory written information (SÚKL)
  - **always**:
    - CZ-PT-parents
  - **reconsent**: When the minor reaches the next age band, discuss the study again and obtain the higher-age document (KLH-22); at 18 obtain the adult PIS/ICF (CZ-PT-main or CZ-PT-healthy). Plan transitions before the first participant enters.
  - **under 12 signature**: Younger minors may sign together with their parents to express willingness; a signature for minors under age 11 is not mandatory (KLH-CTIS-01). Article 32 involvement still applies.
  - **under 6**: No age-band template. Inform the child according to age and maturity where meaningful (DECISIONS.md D10).
  - **parent signature**: One parent's signature is acceptable for trials submitted through CTIS (KLH-22); this differs from older Czech wording that referred to both parents.
  - **page limits**: KLH-22: 12-14 document about four pages at most; 15-17 may approach adult length.
  - **conflicts**:
    - The 12-14 and 15-17 template descriptions say 'aged 12 - 17 years'; the SÚKL bands 12-14 and 15-17 win. File names and content already follow the authority.
- **adults without capacity**:
  - **always**:
    - CZ-PT-legal-rep
  - **as applicable**:
    - CZ-PT-limited-capacity
  - **note**: Representative consent when the court ruling removes the ability to make the relevant healthcare decision; otherwise the participant may consent personally (CZ-PT-main). Two-stage information for acute participants recommended by KLH-22 (no template).
- **emergency**:
  - **always**:
    - CZ-PT-emergency
  - **note**: Add CZ-PT-legal-rep or CZ-PT-parents with CZ-PT-age-* when the emergency population includes incapacitated adults or minors; CZ-PT-witness rules apply when the person cannot write or read.
- **impartial witness**:
  - **always**:
    - CZ-PT-witness
- **healthy volunteers**:
  - **always**:
    - CZ-PT-healthy
- **shareable templates**:
  - CZ-PT-pregnant-partner
  - CZ-PT-secondary
- **separate document rules**:
  - Optional future storage and research use of samples: separate signature inside the main PIS/ICF or a separate signed document (SÚKL); the CZ templates use the separate document CZ-PT-secondary.
  - An optional substudy independent of the main trial needs its own information and consent document; refusal does not affect main participation (KLH-22).
  - A pregnant partner receives a document addressed to her own data; the enrolled participant cannot consent for her.
  - Each truly independent optional choice within the main protocol has its own yes/no choice with signature and date (templates; SÚKL separate-signature rule).
  - Foreign nationals: a certified translation of the approved Czech version, submitted later as a non-substantial amendment; no standard bilingual versions.

## Drafting rules

- Participant documents: Czech only; follow the template's model text, content_instructions and the SÚKL national items; KLH-22 Version 5 is recommended guidance, not a mandatory template.
- Every Czech PIS/ICF version (including age-, capacity-, witness-, emergency- and pregnancy-specific versions) contains: EU CT Number; full clinical trial title; ethics committee e-mail (eticka.komise@sukl.gov.cz or the specific Ethics Committee's e-mail) and no ethics committee telephone number; consent to access to source medical records by monitors, auditors, regulators or medicines agencies, Ethics Committee members and study-team members as applicable; the statement that results will be available on the EMA clinical trials website (not an obsolete national register); the statement that one dated and signed copy is given to the participant and one remains at the site.
- Clear, understandable language without unnecessary specialist terms or abbreviations; language review before submission recommended (KLH-22). Adults and parents: normally at most about eight pages, ten in specific cases; shorter, larger type for populations with reduced reading ability.
- Pages numbered with document version, date and trial identification; versions and dates match the machine-readable document list.
- Distinguish research procedures from routine care and optional activities from mandatory participation; state risks cautiously and never promise benefit; describe alternatives where relevant.
- Optional future use of samples: separate signature or separate signed document, with storage duration, pseudonymised or fully anonymised status and main research purpose; never describe coded material as fully anonymised; withdrawal wording distinguishes identifiable or pseudonymised samples from anonymised material or completed research.
- Remuneration only in Phase I, bioequivalence and pharmacokinetic studies and not to vulnerable participants (KLH-22 recommendation); expense reimbursement is separate; amounts identical to P1.
- The consent interview is conducted by the investigator; enough time to consider. Electronic consent only with a qualified, recognised or guaranteed electronic signature or a dynamic biometric signature; sponsor-created signatures not meeting SÚKL's criteria are not accepted.
- Data withdrawal language does not promise deletion that the trial's legal and scientific record cannot support; privacy information matches the actual data flow and the sponsor's Template No. 5 declaration.
- Participant templates (JSON): [square-bracket] notes, 'Pokyn pro zpracovatele', 'Podmíněný text', 'Vyberte a upravte' and '...........' gaps are drafting instructions or gaps; follow them and remove them. Part II templates (DOCX): yellow [INSERT/IF/OTHERWISE/CHOOSE/NOTE] labels. Nothing of either may remain in a final document.

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
- population.foreign_nationals_other_language
- recruitment.material_used
- recruitment.call_centre
- recruitment.other_information_material
- participant_materials.used
- questionnaires.electronic
- imp.self_administered
- endpoint_documents.participant_facing
- samples.collected
- samples.archive_used
- samples.future_use_outside_protocol
- data.future_use_outside_protocol
- substudy.optional_independent
- pregnancy.participant_follow_up_beyond_main_consent
- pregnancy.partner_follow_up
- pregnancy.infant_follow_up
- compensation.remuneration_offered
- compensation.payment_cards
- trial.low_intervention
- sponsor.third_country
- investigator.separate_gcp_certificate
- sites.count
- sites.non_state_or_non_ministry_facility
- sites.sub_site_used
- sites.sukl_gcp_certificate_required
- devices.used_in_trial

## Sources

- **CZ-HUB**: https://trialagents.com/ctis/czechia/en
- **CZ-PII-CHECKLIST**: https://trialagents.com/ctis/czechia/en/part-ii-document-checklist
- **CZ-ICF**: https://trialagents.com/ctis/czechia/en/patient-information-consent-requirements
- **CZ-QC**: https://trialagents.com/ctis/czechia/en/patient-facing-document-qc-checklist
- **CZ-HV**: https://trialagents.com/ctis/czechia/en/healthy-volunteer-consent-requirements
- **CZ-MINORS**: https://trialagents.com/ctis/czechia/en/minor-consent-assent-requirements
- **CZ-CAPACITY**: https://trialagents.com/ctis/czechia/en/limited-capacity-legal-representative-consent-requirements
- **CZ-EMERGENCY**: https://trialagents.com/ctis/czechia/en/emergency-enrollment-consent-requirements
- **CZ-WITNESS**: https://trialagents.com/ctis/czechia/en/impartial-witness-consent-requirements
- **CZ-PREGNANCY**: https://trialagents.com/ctis/czechia/en/pregnancy-follow-up-requirements
- **CZ-SECONDARY**: https://trialagents.com/ctis/czechia/en/secondary-use-consent-requirements
- **NAMING**: https://trialagents.com/ctis/ctis-document-naming-convention
