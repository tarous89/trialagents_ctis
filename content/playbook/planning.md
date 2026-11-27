# Planning playbook

Returned by `get_planning_guide` together with the country requirements (for example `countries/DE/requirements.json`). It tells the assistant how to agree a plan with the user. The plan is saved with `save_project`.

## 1. What a good plan contains

- Every document the application needs, per country and language, each with a CTIS title (section 6).
- For each document: the population or site it is for, whether TrialAgents drafts it or it is **provided** by someone else (investigator CV, insurer certificate, contract), its starting document, and its `based_on` reference document if it is adapted.
- The steps every document goes through, with steps marked not applicable where they make no sense (for example no Draft for an insurer certificate).
- The planning choices: Part I scope, reference package, format choice.
- The study facts that decided which documents are needed, so the plan can be re-checked when a fact changes.

## 2. Questions to settle before proposing the plan

Ask only what the sources do not already answer. Read the protocol (and any synopsis or IB the user has) first and propose answers for the user to confirm.

**Planning choices**

1. **Application type:** initial application, additional Member State, completion of an Article 11 application, substantial modification, or response to an RFI (section 7).
2. **Countries and languages.** A country can need several languages (for example Belgium); each country-language is a package.
3. **Part I:** include it in the plan, completed outside TrialAgents (record its documents as sources), or left for later. Never blocks Part II.
4. **Starting material:** what exists already: protocol only, or sponsor documents such as an existing participant information. Record existing documents as sources and use them as starting documents.
5. **Format** (only if the sponsor brings documents): keep the sponsor's structure across countries as far as possible, or use their content with the TrialAgents country format.
6. **Reference package:** which country and language to complete first (section 3).

**Study facts** (they decide which documents and sections are needed; keys are used in country requirements as triggers)

| Key | Question |
|---|---|
| `population.adult_patients` | Are capable adult patients enrolled? |
| `population.healthy_volunteers` | Does eligibility depend on being healthy? |
| `population.minors` / `population.minors_age_bands` | Are minors enrolled, and in which age ranges? |
| `population.adults_without_capacity` | Are adults who cannot consent enrolled? |
| `population.group_benefit_research_without_capacity` | If so, is the research only of benefit to the represented population (Art. 31(1)(g)(ii))? |
| `consent.emergency_enrolment` | Does the protocol use emergency enrolment under Article 35? |
| `consent.impartial_witness_possible` | Could a capable participant be unable to write? |
| `consent.electronic` | Is electronic consent used? |
| `population.non_german_speakers` (country-specific form: non-local-language speakers) | Is enrolment of people who do not speak the local language planned? |
| `recruitment.material_used` / `recruitment.call_centre` | Are adverts, posters, websites, social media or call centres used? |
| `recruitment.other_information_material` | Is other material handed out before the decision? |
| `endpoint_documents.participant_facing` | Are there questionnaires, diaries or cards for endpoints? |
| `samples.collected` / `samples.archive_used` | Are new samples taken, or archived samples used? |
| `samples.future_use_outside_protocol` / `data.future_use_outside_protocol` | Is optional future use outside the protocol planned (biobank, future research)? |
| `pregnancy.participant_follow_up_beyond_main_consent` / `pregnancy.partner_follow_up` / `pregnancy.infant_follow_up` | Is pregnancy follow-up planned, and for whom? |
| `radiation.requires_authorisation_or_notification` | Are there research-only radiation exposures needing national authorisation? |
| `trial.low_intervention` | Is it a low-intervention trial? |
| `contract.financial_arrangements_in_site_contract` | Does the site contract carry the financial arrangements? |
| `sites.count` | Which sites and principal investigators per country? |

Save facts with `save_project`. If a fact is unknown, plan the document as *needs decision* rather than guessing.

## 3. Recommended strategy

Recommend this order; plan another if the user prefers:

1. **Part I**, if it is in the plan.
2. **The reference package**: one country-language package completed in full, through every step, and approved by the owner. Choose the country the sponsor knows best, the language the team reviews most easily, or the country with the strictest requirements, so later packages mostly add or remove.
3. **The other packages**, each document `based_on` its counterpart in the reference package: translate, add the country's national requirements, remove what does not apply, and run the country checklist. Countries may need more or fewer documents, extra details or several languages; documents with no counterpart are drafted from the sources.

Alternatives to offer when they fit: draft every country from the sources in parallel (no `based_on` links), or use the sponsor's existing document as the reference for all countries.

**Unapproved inputs.** Nothing waits for approval. Before a document is drafted from a reference document or a project document that is not approved yet, the run pauses and you ask: approve it first, or go ahead with the current version? Explain that going ahead is fine (for example when the team will review everything at the end) and that a later approval will flag the documents built on it. Bring up the approval with `request_approval`; never approve yourself.

## 4. Building the document list

1. Take every `mandatory` document of the country, then every `conditional` document whose trigger is true, then the population sets whose trigger is true.
2. Expand `per`: one document per site, per population, per recruitment item, as stated.
3. Set each document's kind from the country file; documents others complete or issue get no Draft (see section 5).
4. Add the Part I documents if Part I is in the plan, and the English sources of endpoint-related patient-facing documents.
5. Name each document with its CTIS title (section 6).
6. Show the list to the user grouped by Part I, reference package, then other packages, and explain any document that is conditional and why it was included or left out.

## 5. Templates and default steps

Each document in the plan records its **kind** and, where there is one, its **template** (from the country file). The template is bound in the plan, so `get_step_context` returns only that template when the document is drafted.

| Kind | Examples | Default steps |
|---|---|---|
| `participant_document` | L1 information and consent sets, recruitment material | Draft → Source QC → Checklist → Style |
| `form` | K1, N1, S1, P1, R1 | Draft → Check → Style |
| `third_party_template` | PI CV, declaration of interest | Prepare (trial title and EU trial number only; every other field stays empty for the investigator) → Check |
| `third_party_document` | insurance certificate and terms, training certificates, contracts, radiation documents | Check (recorded as a source when received) |
| `ctis_data` | list of sites | Check |

Draft is always the first content step: written from the template, from a starting document, or adapted from a reference document. The Draft step receives the checklist items as requirements to meet; the Checklist step then verifies them in a separate turn and records one result per item. Check is a single short review for forms and supplied documents (identity of the trial, consistency with the rest of the package, completeness). Add Team review, Compare versions or Compare across documents when the user wants them.

## 6. CTIS naming

Name every document with its CTIS title following `naming.md` (CTCG v3.0 as published in the TrialAgents naming guide): `<section code>_<document type>_<subtype>_<country>_<language>_<special attribute>`, only the fields that distinguish the document, at most 100 characters, version and date in metadata. Use the country file's `ctis_title` patterns. Where a country guide shows an older name, the naming guide wins.

## 7. Application types

**Initial application:** full plan as above.

**Additional Member State:** a new package for that country, normally `based_on` the approved reference package. It can trigger publication of applicable Part II documents (section 8).

**Substantial modification and other changes:** create a successor project with `save_project` (`create_successor`). Classify each change first (sponsor's responsibility):

1. Could it significantly affect participant safety or rights, or the reliability and robustness of the data? Yes: **substantial modification**, Part I, Part II or both.
2. If not, is it relevant to supervision of the trial? Yes: **Article 81(9) non-substantial modification**.
3. Otherwise: no standalone filing; list it in the cover letter of the next substantial modification.

Check the combined effect of several minor changes; a change that triggers a substantial one cannot go through Article 81(9). Classify the change, not the document type. Check open submissions before creating a CTIS draft (Sponsor Handbook compatibility rules). The plan contains only the affected documents, each `based_on` its previously approved version, plus the cover letter and a description of changes. Reopen every participant document the change affects, not only the main one. For re-consent of enrolled participants, plan a short version-dated document on the change (Germany: AKEK recommendation).

**RFI response:** a successor plan with a response document and the documents the RFI asks to change.

## 8. Transparency

Plan public versions where a document is publishable under the current Annex I tables (revised CTIS transparency rules applicable from 18 June 2024; ACT EU guidance v2.2, 30 April 2026): a version for publication with personal data and qualifying CCI redacted, plus the complete version for assessment where required. Structured fields have no redacted version: keep personal data and CCI out of them. For historical trials (application before 18 June 2024), a modification or additional Member State application can trigger publication of documents in its scope.

## 9. Country requirements

Each country file gives authorities, language rules, the document list with triggers, population sets, drafting rules and sources. Use its drafting rules in Draft and its checklists in Checklist. Available: Germany (`countries/DE`).
