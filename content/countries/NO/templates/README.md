# Norway templates

Source: the `CTIS_NO` folder. It holds the Part II DOCX forms (`*_NO_no.docx`), `Variable Templates_NO_de.xlsx` and `NO_14 participant-facing templates_07082026.txt`. Country guides: https://trialagents.com/ctis/norway/en and the ten pages it links to under `/ctis/norway/en/`, all reviewed 23 September 2026.

## Participant templates (JSON), used as supplied

Fourteen files are in `participant/`. They were split from `NO_14 participant-facing templates_07082026.txt` with `tools/content/split_participant.py` (country code checked: NO). A fresh split was compared with the folder and is identical.

The content is unchanged (`template_instructions` + `template_content` with `section_style`). The split tool made the only edit: the old pipeline variables became plain bracket notes such as `[population label]` and `[document name]`. No `{{…}}` variable remains. The model text and its instructions were not rewritten, and no file was renamed.

All fourteen templates are in Bokmål (`language_code: no`). None is in Nynorsk or Sami, and no guide asks for either (DECISIONS.md D1).

| File | Template id | Population set in `requirements.json` |
|---|---|---|
| `L1_SIS and ICF_main_NO_no.json` | NO-PT-main | adult_patients; optional_substudy; re-consent after regained capacity (and at 18 if chosen, D9) |
| `L1_SIS and ICF_healthy_NO_no.json` | NO-PT-healthy | healthy_volunteers |
| `L1_SIS and ICF_parents_NO_no.json` | NO-PT-parents | minors (guardians) |
| `L1_SIS and ICF_age 6-11_NO_no.json` | NO-PT-age-6-11 | minors, band under 12 |
| `L1_SIS and ICF_age 12-15_NO_no.json` | NO-PT-age-12-15 | minors, band 12-15 |
| `L1_SIS and ICF_age 16-17_NO_no.json` | NO-PT-age-16-17 | minors, band 16-17; own consent on turning 16 |
| `L1_SIS and ICF_legal rep_NO_no.json` | NO-PT-legal-rep | adults_without_capacity; emergency (representative) |
| `L1_SIS and ICF_limited capacity_NO_no.json` | NO-PT-limited-capacity | adults_without_capacity |
| `L1_SIS and ICF_emergency_NO_no.json` | NO-PT-emergency | emergency |
| `L1_SIS and ICF_withdrawal notice_NO_no.json` | NO-PT-withdrawal-notice | emergency (Article 35(3) right to object) |
| `L1_SIS and ICF_witness_NO_no.json` | NO-PT-witness | impartial_witness |
| `L1_SIS and ICF_pregnancy_NO_no.json` | NO-PT-pregnancy | pregnancy_participant |
| `L1_SIS and ICF_pregnant partner_NO_no.json` | NO-PT-pregnant-partner | pregnancy_partner |
| `L1_SIS and ICF_secondary_NO_no.json` | NO-PT-secondary | secondary_use (the other templates call it "Template 14") |

Each template's `description`, `content_instructions`, `styling_instructions` and age band was checked against the Norway guides. The `styling_instructions` are copied word for word into `../styling.md`.

### The extra template: withdrawal notice

`L1_SIS and ICF_withdrawal notice_NO_no.json` ("Informasjon om reservasjonsrett mot bruk av helseopplysninger etter inklusjon i en klinisk nødsituasjon") was checked against the emergency guide.

What matches the guide:

- **It is the form the guide requires.** The guide says REK KULMU publishes a Norwegian form on the right to object to use of data when consent is not obtained after emergency enrolment (Article 35(3) reservation-right form, 24 March 2026). The guide lists it among the Part II documents for the emergency pathway. The template's instructions limit it to CTR Article 35(3), after the participant or relative has had full information and decided not to continue. That is the same restriction REK KULMU states. It is therefore planned in the emergency population set and submitted blank with it.
- **No new data collection.** The letter says that no new data, visits or study procedures follow, and that ordinary treatment is not affected. This matches the guide: further participation that depends on consent stops.
- **Retention.** The storage year is at least 25 years after End of Trial, as in the national retention rule.
- **No GDPR legal basis.** The letter does not give a GDPR legal basis. This matches the guide's rule that CTR consent is not presented as the GDPR basis.
- **DMP and REK KULMU.** The approvals section names DMP and REK KULMU.
- **One letter per recipient.** One separately addressed letter goes to each person who can object (participant, representative). This fits the guide's "information to both representative and participant".

Points that need action:

1. **Name.** `doc_name_en` "Emergency Enrolment Withdrawal Notice" and the file name suggest a withdrawal-of-consent form. The document is a notice of the right to object, with a reply slip. Its CTIS title is set to `L1_SIS and ICF_right to object emergency_<population>_NO_no` (DECISIONS.md D4). The file name is kept as supplied.
2. **Deletion wording.** The template says that a later objection leads to deletion "unless already analysed", and the reply slip says the data "will be deleted within [period]". The guide says not to promise automatic destruction of all collected information. It also says to distinguish withdrawal from safety reporting and legally required retention. The REK wording is kept. Where the protocol or the law requires some data to be kept (for example safety reporting), one qualifying sentence is added and marked as a deviation (DECISIONS.md D5).
3. **REK number.** The info table has a "REK-nummer" row, and the approvals section offers "EU CT nummer / REK-nummer". The Norway guides use only the EU trial number for CTR trials. The default is the EU CT number, and the REK row is removed unless REK KULMU issues a reference (DECISIONS.md D6).
4. **"Pårørende".** The letter addresses the participant or the relative ("pårørende"). For a minor or an incapacitated adult it goes to the legally designated representative, identified as in conflict 2 below.
5. **Four-week deadline.** The four-week deadline and the "no action means use" rule come from the template (the REK form), not from the guide. They are kept as supplied.
6. **Description.** The `description` repeats the general emergency trigger. The template's own instructions and the guide narrow its use to Article 35(3). This is recorded in `participant_templates[].authority_note`.

## Part II forms

Norway uses the shared EU forms in `content/eu/templates/part-ii` for K1, M1, M2, N1, P1, R1 and S1. Nothing was converted, and nothing is copied here. The CTIS_NO DOCX files were compared paragraph by paragraph with the shared forms:

- M1, M2 and R1 are identical apart from the variables (`{{kv101}}` and similar).
- In K1, N1, P1 and S1, every other difference is text that the shared forms carry as `[NOTE: …]` or `[OTHERWISE: …]` labels, or as the conditional `{{#kv…}}` blocks that became `[IF …]` and `[CHOOSE: …]` labels. Examples are "How to use this document", the endorsement text, the "N/A" alternatives and "Click or tap here to enter text."
- The NO variables are numbered `v29100`–`v29150`. The shared ids are `v100`–`v150`.

No guide asks for a national form in place of a shared form. REK KULMU recommends the European Commission Part II templates.

The variable sheet has 48 variables (K1 22, N1 5, S1 21), all with "Target_language: Norwegian", although the file is named `_NO_de`. Apart from the language, the country name and the shared forms' `[IF …]` wrappers, their descriptions match the instructions in the shared `fields.json` files (v29116 and v29117 were checked word for word).

Answers are in English (`answer_languages`: en for forms, no for participant documents). National additions are in `requirements.json`:

- `national_fields` for K1. They cover health-record screening, the consent-taker and treating-physician rule, Norwegian recruitment material, electronic consent with BankID or two-factor authentication, translations, the legally designated representative, the minors pathways and own consent at 16, the witness rule and the Article 35(3) letter.
- `national_fields` for N1 (`n1_issued_by`, `v125`), P1 (`f04`), R1 (`r1_role_in_the_sponsor`; `r1_the_sponsor_declares` not applicable, D17) and S1 (`f03`).
- `drafting_notes_en` for every English document and `drafting_notes_no` for K2 and L1.

## Conflicts resolved (rule 2: the authority and the newest official source win)

1. **Children's band.** The file name and `description` say `age 6-11`. REK KULMU's template and band are "under 12", and the template's own title and text say "barn under 12 år". The authority wins: the band is under 12, and the CTIS subtype is "children under 12". The file name is kept as supplied. If the age range is broad, more than one child version may be needed (DECISIONS.md D10).
2. **Legal representative.** The legal-representative template, the emergency template and the withdrawal notice use "nærmeste pårørende" (nearest relative) as the person who gives substitute consent. The limited-capacity guide (newer) says to identify the legally designated representative under the law applicable in Norway, to document how the site confirms that authority, and not to assume that the nearest relative automatically has it. The guide wins. The wording stays only where the site has confirmed that this person is the legally designated representative. The template's field "Relasjon til deltakeren/grunnlag for å opptre som nærmeste pårørende" records the basis, and K1 (`v110`) describes the verification (DECISIONS.md D2).
3. **Privacy information.** The templates say not to give the GDPR legal basis or rights in the consent, that privacy information is given separately, and that no further privacy information belongs in it. The patient information guide lists confidentiality, data controllers, recipients, access, transfers and participant rights, and a privacy contact, as content of the form. The QC checklist (section 5) checks them. The guide (23 September 2026, on REK KULMU guidance reviewed 29 August 2026) is newer than the CTR template it describes (3 June 2026), so it wins on content. Both sources agree that the legal basis is not stated in the consent. How the privacy points are delivered is DECISIONS.md D3.
4. **Healthy volunteers.** The template description says "18 or older without a specific health condition". The guide defines healthy volunteers as participants with no condition that could provide a therapeutic benefit from the investigational treatment. The authority's definition is used.
5. **Witness.** The witness template covers a capable adult who cannot read and/or write, and it excludes representatives. Its witness block records the name only. The guide also covers a legally designated representative who cannot read or write. It asks to record the witness's name, role and relationship to the participant, and how attendance and identity were verified for a remote discussion. The guide wins: the role and relationship fields (and the remote-verification note where relevant) are added as visible deviations, and the representative case is DECISIONS.md D8.
6. **Adolescent descriptions.** The 12-15 and 16-17 templates both say "aged 12 - 17 years". REK KULMU's bands are 12-15 and 16-17, and the file names and texts already follow them.
7. **Form answer language.** The variable sheet asks for Norwegian answers in K1, N1 and S1. The Part II checklist says that Part II attachments other than consent forms and recruitment materials are English, and that K1 is submitted in English. The guide wins: the forms are answered in English.
8. **CTIS titles.** The Norway guide names CTIS categories only. The CTCG v3.0 naming guide is used: `_NO_no` on Norwegian participant documents, `_NO` on English O1, P1, P2, R1 and S1. P2 and the right-to-object letter have no CTCG example (DECISIONS.md D4, D12).

## Not a conflict, but recorded

- **Checkboxes.** The base style uses `Checkbox group` for independent choices. The Norwegian templates say to avoid checkboxes and to use dated signature fields. The guide allows "separate initials, tick boxes or signature logic". The stricter template rule is used (see `../styling.md`).
- **Assent signature.** The under-12 and 12-15 templates make the child's signature optional ("hvis ønskelig"). The guide says that the child may sign under 12, and that assent is sought and documented for ages 12 to 15. Keeping the signature section is the default (DECISIONS.md D15).
- **Guardians.** The parents template says that all persons with parental responsibility consent and sign. The guide says "guardian or guardians, as applicable" and to confirm the authorised guardian per case. These are compatible: the template keeps one or two blocks according to who holds parental responsibility.
- **Future research for minors.** The secondary-use and parents templates say that minors are usually not included. The guide says that REK KULMU assesses this case by case and that from 16 a minor may give broad consent without guardian consent where there is no bodily intervention. The 16-17 template already states this.
- **Emergency template scope.** The emergency template is written for an adult, with a nearest-relative signature path. Documents for minors after emergency enrolment are missing (DECISIONS.md D7).

## Open points

- **REK KULMU originals not supplied.** The original REK KULMU templates were not supplied: the national CTR consent template (3 June 2026), the under-12 and 12-15 templates (24 March 2026), the Article 35(3) reservation-right form (24 March 2026) and the future-research templates (24 March 2026). The supplied templates follow their structure and wording, but could not be compared word for word.
- **Electronic consent.** No template carries electronic-consent wording. When `consent.electronic` applies, K1 describes the BankID or two-factor solution.
- **Missing templates.** There is no template for K2 recruitment material, documents for minors after emergency enrolment (D7), witness blocks for a representative (D8), or a general biobank's REK-approved consent (supplied by the biobank). There is none for O1, P2, or M1/M2 content either: those are supplied by LAF, the sponsor or the investigator.
- **Norwegian-language guides.** The Norwegian-language guides (`/ctis/norway/no`) were not read. They are outside the `/ctis/norway/en/` scope.
