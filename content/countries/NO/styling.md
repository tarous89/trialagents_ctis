# Norway document styling

Applies on top of `content/styles/base.md`. Sources: the Norway patient information and consent guide and the QC checklist (`/ctis/norway/en/`, reviewed 23 September 2026), and the `styling_instructions` of each Norwegian participant template (CTIS_NO set, `NO_14 participant-facing templates_07082026.txt`). Where they are stricter than the base style, these rules win.

## Rules for all Norwegian participant documents

- Norwegian (Bokmål, as the templates) for a lay reader, adapted to the person who will consent. A representative or guardian document addresses that person, never as though they were the participant.
- Headings, short paragraphs, readable type and clear consent choices (Norway guide). The templates ask for a sans-serif typeface (skrifttype uten seriffer) and clear section headings (`H3 module title`, mostly in capitals as in the templates).
- Keep the EU trial number, document title, version and date visible. Running footer as the templates give it: `[document name] - [population label] - versjon [x] - [date]` and `Protokollnummer: … | EU CT-nummer: …`, with page numbering `Side x av y`. Version and date must match the CTIS structured data.
- Info table (trial title, short title, protocol number with version and date, EU CT number, sponsor with full address, principal investigator, site name and address) at the start of the information and again on the consent pages, from each template's `info_table`. The site letterhead is supplied by the site and never invented.
- No summary box is required: the Norwegian templates have no `Summary section`. Do not add one unless the user asks.
- Visit schedules: when the trial has many visits or procedures, show the course of the study in a short table with the columns «Tidspunkt», «Hva skjer», «Omtrentlig tidsbruk» and «Hva er ekstra på grunn av studien». The table replaces repeated procedure text but never drops a procedure, burden or risk. Long instructions or side-effect lists may go in an appendix.
- Data section in short sub-sections, where relevant: «Hvilke opplysninger bruker vi?», «Hvor kommer opplysningene fra?», «Hvem kan få tilgang?», «Hvor og hvor lenge lagres opplysningene?».
- Consent choices: use dated signature fields, not checkboxes (templates). Each truly optional choice (optional procedure or analysis, GP contact, infant follow-up) gets its own signature module (`VALGFRITT TILLEGGSSAMTYKKE – …`) after the main consent, never pre-ticked. This replaces the base style's `Checkbox group` for Norway; the guide's requirement that the optional choice is unmistakable is met by the separate signature logic.
- The consent pages start on a new page (`Section break`) with the info table, followed by separate blocks «BEKREFTELSE PÅ AT INFORMASJON ER GITT» and «BEKREFTELSE PÅ AT SAMTYKKE ER AVGITT» for the person who gave the information and the person who received consent; each block has place and date, signature and role. Names in block capitals (store bokstaver).
- Keep only the signature path that is used (for example participant or nearest relative in the emergency template; one or two guardian blocks in the parents template).
- Children's and limited-capacity documents: simple, age- or ability-adapted layout, large readable type, plenty of white space, pictures, symbols or illustrations where helpful; they add to the text and never replace required information.
- No risk frequency scale is set by the Norway guides (DECISIONS.md D14).
- Upload a searchable, copyable PDF, not a scan.
- Remove all highlighted instruction text, [square-bracket] notes, `[Redaksjonsnote: …]` notes and unused alternatives before the document is given to the participant (and before upload).

## Template-specific rules

Verbatim from each template's `styling_instructions`.

### Forespørsel om deltakelse i en legemiddelstudie (`L1_SIS and ICF_main_NO_no.json`)

Sørg for god lesbarhet og bruk en skrifttype uten seriffer. Behold tydelige seksjonsoverskrifter. Bruk daterte signaturfelt fremfor avkrysningsbokser. Fjern markert instruksjonstekst og hakeparenteser i sluttversjonen.

### Forespørsel om deltakelse i en legemiddelstudie for friske voksne (`L1_SIS and ICF_healthy_NO_no.json`)

Bruk god lesbarhet og skrifttype uten seriffer. Behold tydelige norske moduloverskrifter. Bruk tabell eller vedlegg bare når det forenkler studieplan eller lange risikolister. Fjern markert instruksjonstekst, alternativer og hakeparenteser som ikke gjelder før utlevering.

### Forespørsel til den eller de med foreldreansvar om barnets deltakelse i en legemiddelstudie (`L1_SIS and ICF_parents_NO_no.json`)

Behold hovedmalens struktur og norske overskrifter. Bruk skrifttype uten seriffer og tydelige signaturfelt for barnets identitet, foreldreansvarlige og personen som ga informasjon. Fjern ikke-relevante alternativer før utlevering.

### Informasjonsskriv til barn under 12 år (`L1_SIS and ICF_age 6-11_NO_no.json`)

Bruk et enkelt, alderspasset oppsett med korte og tydelige spørsmål som moduloverskrifter. Bruk bilder og illustrasjoner der det er hensiktsmessig. Fjern markert instruksjonstekst og hakeparenteser i sluttversjonen.

### Informasjonsskriv til barn og ungdom 12–15 år (`L1_SIS and ICF_age 12-15_NO_no.json`)

Bruk et enkelt, alderspasset oppsett med tydelige moduloverskrifter. Bruk bilder og illustrasjoner der det er hensiktsmessig. Behold eventuell signaturdel som en tydelig signaturseksjon. Fjern markert instruksjonstekst og hakeparenteser i sluttversjonen.

### Forespørsel om deltakelse i en legemiddelstudie – ungdom 16–17 år (`L1_SIS and ICF_age 16-17_NO_no.json`)

Behold den norske hovedmalens seksjonsstruktur og tydelige overskrifter. Bruk skrifttype uten seriffer, korte avsnitt og forklarende underoverskrifter eller enkel studieplan når det forbedrer forståelsen. Bruk daterte signaturfelt. Samtykkesiden skal bare inneholde ungdommens signatur og eventuelle separate ungdomssignaturer for reelt valgfrie aktiviteter. Fjern redaksjonsnoter, alternativer og hakeparenteser som ikke gjelder før dokumentet gis til ungdommen.

### Informasjon og stedfortredende samtykke fra nærmeste pårørende (`L1_SIS and ICF_legal rep_NO_no.json`)

Behold hovedmalens struktur, skrifttype uten seriffer og tydelige overskrifter. Signatursiden skal identifisere deltakeren, nærmeste pårørende, relasjonen/grunnlaget for stedfortredende samtykke og personen som ga informasjon.

### Tilpasset informasjon og uttrykk for vilje – voksen uten beslutningskompetanse (`L1_SIS and ICF_limited capacity_NO_no.json`)

Bruk stor, lettlest skrift uten seriffer, korte avsnitt, god luft og gjerne bilder eller symboler. Behold tydelige felt for deltakernes uttrykte vilje, kommunikasjonsmåte og forskerens dokumentasjon.

### Informasjon og samtykke til videre deltakelse etter inklusjon i en klinisk nødsituasjon (`L1_SIS and ICF_emergency_NO_no.json`)

Behold den norske hovedmalens struktur, skrifttype uten seriffer og tydelige seksjonsoverskrifter. Bruk korte underoverskrifter eller en enkel tabell for å skille «Dette har allerede skjedd» fra «Dette vil skje dersom du samtykker til å fortsette». Bruk daterte signaturfelt. Behold bare relevant signaturvei i sluttversjonen, og fjern alle redaksjonsnoter, alternativer og hakeparenteser som ikke gjelder før dokumentet gis til mottakeren.

### Informasjon om reservasjonsrett mot bruk av helseopplysninger etter inklusjon i en klinisk nødsituasjon (`L1_SIS and ICF_withdrawal notice_NO_no.json`)

Sørg for god lesbarhet ved valg av skrift. Bruk tydelige seksjonsoverskrifter, fremhev fristen og reservasjonsalternativene, og behold en klar svarslipp med signaturfelt og innsending-/kontaktinformasjon. Fjern markert instruksjonstekst og hakeparenteser i sluttversjonen.

### Forespørsel om deltakelse i en legemiddelstudie med upartisk vitne (`L1_SIS and ICF_witness_NO_no.json`)

Behold hovedmalens struktur og lesbarhet. Samtykkesiden skal ha tydelige, separate felt for deltakeren, alternativ dokumentasjonsmetode, upartisk vitne og personen som ga informasjon. Fjern ikke-relevante alternativer før utlevering.

### Informasjon og samtykke til graviditetsoppfølging – studiedeltaker (`L1_SIS and ICF_pregnancy_NO_no.json`)

Bruk kort, tydelig norsk og skrifttype uten seriffer. Hold graviditetsoppfølgingen tydelig atskilt fra samtykke til hovedstudien og eventuell fortsatt behandling. Behold separate signaturseksjoner for deltakeren og eventuell oppfølging av barnet.

### Informasjon og samtykke til graviditetsoppfølging – gravid partner (`L1_SIS and ICF_pregnant partner_NO_no.json`)

Bruk kort, tydelig norsk og skrifttype uten seriffer. Hold oppfølgingen atskilt fra hovedstudien. Behold separate signaturseksjoner for den gravide partneren og, dersom relevant, barnets oppfølging etter fødselen.

### Forespørsel om deltakelse i fremtidig forskning (`L1_SIS and ICF_secondary_NO_no.json`)

Sørg for god lesbarhet ved valg av skrift og bruk tydelige seksjonsoverskrifter. Unngå avkrysningsbokser og bruk daterte signaturfelt. Behold separate signaturseksjoner for deltakeren og personen som ga informasjon. Fjern markert instruksjonstekst og hakeparenteser i sluttversjonen.
