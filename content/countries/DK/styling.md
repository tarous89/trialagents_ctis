# Denmark document styling

Applies on top of `content/styles/base.md`. Sources: the `styling_instructions`, `footer` and `info_table` of each Danish participant template (CTIS_DK set, `DK_Participant-facing_templates_05082026.txt`) and the Denmark guides (reviewed 23 September 2026), mainly the patient information and consent guide and the patient-facing document QC checklist. Where they are stricter than the base style, these rules win.

## Rules for all Danish participant documents

- Danish throughout, in concise, clear language for a lay reader; unavoidable clinical terms defined at first use; headings, sentence length and risk descriptions understandable without medical training (DK-ICF, DK-QC#5).
- Keep the template's section structure and headings (all templates). Short paragraphs, clear headings, and tables or boxes where they improve understanding.
- Info table at the start of the information and again on the consent form, as set in each template's `info_table`: forsøgets titel, korte titel, protokolnummer with version and date, EU-forsøgsnummer, sponsor with full address, forsøgsansvarlig (investigator), forsøgsstedets navn, adresse, telefon og e-mail, dokumentversion og dato, plus the template's extra rows (for example the representative's legal basis). Site letterhead only as supplied by the site; never invented.
- Running footer as set in each template's `footer`: `[document name] - [population label] - version - [date]` and `Protokolnummer | EU-forsøgsnummer`, with page numbering in Danish ("Side x af y"). Document version and date updated at every change.
- Where the information is extensive: a table of contents and/or a summary of at most one page (Summary section), which never replaces the full information (main, healthy, legal rep, parents, emergency templates).
- Trial plan either as text or as a table, without needless repetition; study-specific activities clearly separated from ordinary care.
- Participant information (L1_SIS) and consent form (L1_ICF) are separate uploads with the same version and date (requirements.json DK-L1-SIS, DK-L1-ICF; DECISIONS.md D1). The consent form starts on its own page with the info table.
- Consent form: clear fields for name, date and signature; separate blocks for each signer: participant or representative; the physician who gave the oral information; where the reflection route is used, a separate attestation block for the later qualified, delegated physician who receives consent (DK-ICF; DECISIONS.md D4). Two blocks for joint parental authority; the nearest relative and the trial guardian in distinct blocks; witness block only in the witness route.
- On the main consent form only the VMK opt-out checkbox for storage of surplus trial material may appear as a future-research choice, at the bottom; other optional choices only for concrete, protocol-described optional samples or tests, one line each, never pre-ticked (DK-SECONDARY, templates).
- The right-not-to-know declaration and the parental-authority power of attorney are separate forms on their own pages.
- Child (5-11), adolescent (12-14, 15-17) and limited-capacity documents are clearly shorter than the parents' or representative's information, with large readable type, short lines, generous spacing and age-appropriate pictures, pictograms or supported communication where they help; they add to and never replace required information.
- The CTIS copy is blank: no participant, representative, witness or physician signatures and no completed personal data (DK-PII-CHECKLIST#3, DK-QC#9).
- Recruitment material as it will be presented, including images; audio or video as a scene-by-scene storyboard with text or speech (DK-PII-CHECKLIST#2).
- Risk frequency: the Denmark guides set no categories; give frequency numerically or in plain categories where reliable data exist (template), using the IB or SmPC categories until the user decides (DECISIONS.md D16). Rare but serious risks stand out.
- Remove all drafting notes before the document reaches the reader: `<i>[Redaktionsnote: …]</i>`, other `[…]` alternatives and gaps such as `[indsæt]`, the legacy ` FORMTEXT ` field prompts, non-selected alternatives, routes and irrelevant blocks (all templates).

## Template-specific rules

Verbatim from each template's `styling_instructions`.

### Deltagerinformation og samtykke-/tilkendegivelseserklæring for unge 12-17 år (`L1_SIS and ICF_age 12-17_DK_da.json`)

Bevar skabelonens afsnitsstruktur og overskrifter. Angiv dokumentversion og dato ved hver ændring, og gentag protokolnummer, EU-forsøgsnummer, dokumentversion og dato i sidefoden. Brug korte afsnit, tydelige overskrifter og tabeller eller bokse, når det forbedrer forståelsen. Fjern alle redaktionsnoter, ikke-valgte alternativer og ikke-relevante tekstblokke før udlevering. Erklæringsafsnit skal have tydelige felter til navn, dato og underskrift eller anden meningsfuld dokumentation. Brug et ungdomsvenligt layout og forklar faglige begreber kort. Samtykke-/tilkendegivelsesdelen skal stå på en separat side og tydeligt adskille aldersvej A og B.

### Information til børn og erklæring om tilsagn (`L1_SIS and ICF_age 6-11_DK_da.json`)

Bevar skabelonens afsnitsstruktur og overskrifter. Angiv dokumentversion og dato ved hver ændring, og gentag protokolnummer, EU-forsøgsnummer, dokumentversion og dato i sidefoden. Brug korte afsnit, tydelige overskrifter og tabeller eller bokse, når det forbedrer forståelsen. Fjern alle redaktionsnoter, ikke-valgte alternativer og ikke-relevante tekstblokke før udlevering. Erklæringsafsnit skal have tydelige felter til navn, dato og underskrift eller anden meningsfuld dokumentation. Brug stor, letlæselig skrift, korte linjer, meget luft og alderssvarende billeder eller piktogrammer. Hold dokumentet klart kortere end forældreinformationen og undgå juridiske og tekniske detaljer.

### Information om akut inklusion og efterfølgende samtykke (`L1_SIS and ICF_emergency_DK_da.json`)

Bevar skabelonens afsnitsstruktur og overskrifter. Angiv dokumentversion og dato ved hver ændring, og gentag protokolnummer, EU-forsøgsnummer, dokumentversion og dato i sidefoden. Hvis informationen er omfattende, indsættes en indholdsfortegnelse og/eller et resumé på højst én side. Brug enten tekst eller skema til forsøgsplanen uden unødig gentagelse. Brug tydelige tabeller eller bokse til forsøgsplan, risici og valg, når det forbedrer forståelsen. Samtykke- og erklæringsafsnit skal have tydelige felter til navn, dato og underskrift.

### Deltagerinformation og samtykkeerklæring for raske voksne (`L1_SIS and ICF_healthy_DK_da.json`)

Bevar skabelonens afsnitsstruktur og overskrifter. Angiv dokumentversion og dato ved hver ændring, og gentag protokolnummer, EU-forsøgsnummer, dokumentversion og dato i sidefoden. Hvis informationen er omfattende, indsættes en indholdsfortegnelse og/eller et resumé på højst én side. Brug enten tekst eller skema til forsøgsplanen uden unødig gentagelse. Brug tydelige tabeller eller bokse til forsøgsplan, risici og valg, når det forbedrer forståelsen. Samtykke- og erklæringsafsnit skal have tydelige felter til navn, dato og underskrift.

### Information til stedfortræder og samtykkeerklæring (`L1_SIS and ICF_legal rep_DK_da.json`)

Bevar skabelonens afsnitsstruktur og overskrifter. Angiv dokumentversion og dato ved hver ændring, og gentag protokolnummer, EU-forsøgsnummer, dokumentversion og dato i sidefoden. Hvis informationen er omfattende, indsættes en indholdsfortegnelse og/eller et resumé på højst én side. Brug enten tekst eller skema til forsøgsplanen uden unødig gentagelse. Brug tydelige tabeller eller bokse til forsøgsplan, risici og valg, når det forbedrer forståelsen. Samtykke- og erklæringsafsnit skal have tydelige felter til navn, dato og underskrift.

### Tilpasset deltagerinformation og erklæring om tilsagn eller modstand (`L1_SIS and ICF_limited capacity_DK_da.json`)

Bevar skabelonens afsnitsstruktur og overskrifter. Angiv dokumentversion og dato ved hver ændring, og gentag protokolnummer, EU-forsøgsnummer, dokumentversion og dato i sidefoden. Brug korte afsnit, tydelige overskrifter og tabeller eller bokse, når det forbedrer forståelsen. Fjern alle redaktionsnoter, ikke-valgte alternativer og ikke-relevante tekstblokke før udlevering. Erklæringsafsnit skal have tydelige felter til navn, dato og underskrift eller anden meningsfuld dokumentation. Brug stor letlæselig skrift, enkel tekst, piktogrammer eller anden støttet kommunikation efter behov. Hold dokumentet klart kortere end stedfortræderinformationen.

### Deltagerinformation og samtykkeerklæring (`L1_SIS and ICF_main_DK_da.json`)

Bevar skabelonens afsnitsstruktur og overskrifter. Angiv dokumentversion og dato ved hver ændring, og gentag protokolnummer, EU-forsøgsnummer, dokumentversion og dato i sidefoden. Hvis informationen er omfattende, indsættes en indholdsfortegnelse og/eller et resumé på højst én side. Brug enten tekst eller skema til forsøgsplanen uden unødig gentagelse. Brug tydelige tabeller eller bokse til forsøgsplan, risici og valg, når det forbedrer forståelsen. Samtykke- og erklæringsafsnit skal have tydelige felter til navn, dato og underskrift.

### Information til forældremyndighedsindehavere og samtykkeerklæring (`L1_SIS and ICF_parents_DK_da.json`)

Bevar skabelonens afsnitsstruktur og overskrifter. Angiv dokumentversion og dato ved hver ændring, og gentag protokolnummer, EU-forsøgsnummer, dokumentversion og dato i sidefoden. Hvis informationen er omfattende, indsættes en indholdsfortegnelse og/eller et resumé på højst én side. Brug enten tekst eller skema til forsøgsplanen uden unødig gentagelse. Brug tydelige tabeller eller bokse til forsøgsplan, risici og valg, når det forbedrer forståelsen. Samtykke- og erklæringsafsnit skal have tydelige felter til navn, dato og underskrift.

### Information og samtykke til graviditetsopfølgning – gravid forsøgsdeltager (`L1_SIS and ICF_pregnancy_DK_da.json`)

Bevar skabelonens afsnitsstruktur og overskrifter. Angiv dokumentversion og dato ved hver ændring, og gentag protokolnummer, EU-forsøgsnummer, dokumentversion og dato i sidefoden. Brug korte afsnit, tydelige overskrifter og tabeller eller bokse, når det forbedrer forståelsen. Fjern alle redaktionsnoter, ikke-valgte alternativer og ikke-relevante tekstblokke før udlevering. Erklæringsafsnit skal have tydelige felter til navn, dato og underskrift eller anden meningsfuld dokumentation. Hold dokumentet fokuseret på graviditetsopfølgning og placer den separate børneerklæring på en ny side efter fødslen.

### Information og samtykke til graviditetsopfølgning – gravid partner (`L1_SIS and ICF_pregnant partner_DK_da.json`)

Bevar skabelonens afsnitsstruktur og overskrifter. Angiv dokumentversion og dato ved hver ændring, og gentag protokolnummer, EU-forsøgsnummer, dokumentversion og dato i sidefoden. Brug korte afsnit, tydelige overskrifter og tabeller eller bokse, når det forbedrer forståelsen. Fjern alle redaktionsnoter, ikke-valgte alternativer og ikke-relevante tekstblokke før udlevering. Erklæringsafsnit skal have tydelige felter til navn, dato og underskrift eller anden meningsfuld dokumentation. Hold dokumentet snævert og datalivscyklusorienteret. Brug en tydelig note om dansk myndighedsstatus og placer eventuelt børnesamtykke på en separat side efter fødslen.

### Information og valg om sekundær eller fremtidig brug af data og biologisk materiale (`L1_SIS and ICF_secondary_DK_da.json`)

Bevar skabelonens afsnitsstruktur og overskrifter. Angiv dokumentversion og dato ved hver ændring, og gentag protokolnummer, EU-forsøgsnummer, dokumentversion og dato i sidefoden. Brug korte afsnit, tydelige overskrifter og tabeller eller bokse, når det forbedrer forståelsen. Fjern alle redaktionsnoter, ikke-valgte alternativer og ikke-relevante tekstblokke før udlevering. Erklæringsafsnit skal have tydelige felter til navn, dato og underskrift eller anden meningsfuld dokumentation. Brug tydeligt adskilte bokse til de danske juridiske spor og separate afkrydsningsfelter til uafhængige valg. Samtykkesiden skal stå separat.

### Deltagerinformation og samtykkeerklæring med upartisk vidne (`L1_SIS and ICF_witness_DK_da.json`)

Bevar skabelonens afsnitsstruktur og overskrifter. Angiv dokumentversion og dato ved hver ændring, og gentag protokolnummer, EU-forsøgsnummer, dokumentversion og dato i sidefoden. Hvis informationen er omfattende, indsættes en indholdsfortegnelse og/eller et resumé på højst én side. Brug enten tekst eller skema til forsøgsplanen uden unødig gentagelse. Brug tydelige tabeller eller bokse til forsøgsplan, risici og valg, når det forbedrer forståelsen. Samtykke- og erklæringsafsnit skal have tydelige felter til navn, dato og underskrift.
