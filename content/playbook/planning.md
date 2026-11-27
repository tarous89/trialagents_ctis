# Planning playbook

Returned by `get_planning_guide` together with the country requirements (for example `countries/DE/requirements.json`). It tells the assistant how to agree a plan with the user. The plan is saved with `save_project`.

## 0. Principle

Follow the competent authorities' and ethics bodies' own guidance exactly, as recorded in the country file (for Germany: AKEK, BfArM/PEI, AMG). Do not simplify their rules. Where two sources disagree, the newer official guidance wins; record the conflict as a finding.

## 1. What a good plan contains

- Every document the application needs, per country and language, each with a CTIS title (section 6).
- The study's populations (section 2a), and for each document the population or site it is for, its template, whether TrialAgents drafts it or it is **provided** by someone else (investigator CV, insurer certificate, contract), its starting document, and its `based_on` reference document if it is adapted.
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

## 2a. Populations and participant documents

Decide populations before listing participant documents. Populations belong to the study and are saved on the project once; template choices are made per country.

**Step 1: identify the populations** from the protocol.

- A population is a group of **enrolled** participants who need materially different participant information because of differences in age or consent framework, study stage or part, participant type, mandatory procedures, treatment pathway, visit schedule, risk or expected benefit, safety monitoring, or burden.
- Populations are mutually exclusive within one consent stage: every participant belongs to exactly one. If criteria overlap, define combined populations.
- Protocol stages or parts are separate populations when participants enter them separately and the stages differ in purpose, randomisation options, dose certainty, treatment pathway, mandatory procedures, monitoring, risk, burden or the information needed to consent (for example single-dose and multiple-dose adults, or the phase 1 and phase 2 stages of a phase 1/2 trial).
- An optional extension, crossover, retreatment, rollover or continued-access phase is a separate population only when participants make a new consent decision before entering it.
- These never create a population on their own: treatment arms, active versus placebo or comparator, randomised dose levels, investigator-selected options, cohort numbers or arm labels, biomarker or statistical subgroups, assignments within the same stage and consent pathway, optional samples, biopsies or genetic testing, optional pregnancy data, optional future research, partner information.
- Parents, guardians, legal representatives, partners and caregivers are not populations unless the protocol enrols them as participants. Using a legal representative for an adult does not by itself create a population. Age groups among minors are not separate populations unless their procedures differ; age-adapted documents are handled by templates (step 2).
- A study with one homogeneous group has one population ("All study participants", or the protocol's term).
- For each population save: a short label in the protocol's terms, a one-sentence operational description that tells it apart from the others, and the reason it needs its own documents.

**Step 2: assign templates per country.** For each population, add every participant template of the country that applies (see the country file's `participant_templates` and `population_rules`):

- A population can need several templates; for minors in Germany: the parents' document, the age-adapted documents for the AKEK age bands, and the adult document for re-consent when participants can reach 18 during the trial.
- A template can serve several populations; each population then gets its own document from it.
- Templates whose content does not depend on the population (in Germany: pregnant partner, secondary use) may be **one shared document** for several populations when nothing in it would differ. Agree this with the user.
- Age bands, separate-document rules and representative rules come from the country file, which follows the national authority's guidance.

**Step 3: name and show.** Use the population label as the subtype in the CTIS title, for example `L1_SIS and ICF_single dose adults_DE_de`, `L1_SIS and ICF_parents_minors_DE_de`. Show the user a population × document table per package and confirm it. Every inclusion pathway in the protocol must have a document set (checklist item C4.01).

Other packages keep the same populations and adapt each population's documents from the reference package; a country may add or drop documents for a population according to its own rules.

## 3. Recommended strategy

Recommend this order; plan another if the user prefers:

1. **Part I**, if it is in the plan.
2. **The reference package**: one country-language package completed in full, through every step, and approved by the owner. Choose the country the sponsor knows best, the language the team reviews most easily, or the country with the strictest requirements, so later packages mostly add or remove.
3. **The other packages**, each document `based_on` its counterpart in the reference package: translate, add the country's national requirements, remove what does not apply, and run the country checklist. Countries may need more or fewer documents, extra details or several languages; documents with no counterpart are drafted from the sources.

Alternatives to offer when they fit: draft every country from the sources in parallel (no `based_on` links), or use the sponsor's existing document as the reference for all countries.

**Unapproved inputs.** Nothing waits for approval. Before a document is drafted from a reference document or a project document that is not approved yet, the run pauses and you ask: approve it first, or go ahead with the current version? Explain that going ahead is fine (for example when the team will review everything at the end) and that a later approval will flag the documents built on it. Bring up the approval with `request_approval`; never approve yourself.

## 4. Building the document list

1. Take every `mandatory` document of the country, then every `conditional` document whose trigger is true, then the population sets whose trigger is true.
2. Expand `per`: one document per site, per recruitment item, as stated; participant documents per population × template (section 2a).
3. Set each document's kind from the country file; documents others complete or issue get no Draft (see section 5).
4. Add the Part I documents if Part I is in the plan, and the English sources of endpoint-related patient-facing documents.
5. Name each document with its CTIS title (section 6).
6. Show the list to the user grouped by Part I, reference package, then other packages, and explain any document that is conditional and why it was included or left out.

## 5. Templates and default steps

Each document in the plan records its **kind** and, where there is one, its **template** (from the country file). The template is bound in the plan, so `get_step_context` returns only that template when the document is drafted.

| Kind | Examples | Default steps |
|---|---|---|
| `participant_document` | L1 information and consent sets, recruitment material | Draft → Source QC → Checklist → Style |
| `form` | K1, N1, S1, P1, R1 | Draft → Check |
| `third_party_template` | PI CV, declaration of interest | Prepare (trial title and EU trial number only; every other field stays empty for the investigator) → Check |
| `third_party_document` | insurance certificate and terms, training certificates, contracts, radiation documents | Check (recorded as a source when received) |
| `ctis_data` | list of sites | Check |

Draft is always the first content step: written from the template, from a starting document, or adapted from a reference document. The Draft step receives the checklist items as requirements to meet; the Checklist step then verifies them in a separate turn and records one result per item. For forms, Draft fills the Word template directly: `get_step_context` lists the form's fields (id, question, instruction, condition) and `save_version` takes one answer per field id, which the server writes into that exact place in the DOCX, so the result is already the final layout and needs no Style step. Style applies to participant documents, which are written section by section and then laid out (site letterhead, running footer with EU trial number and version, highlighted summary). Check is a single short review for forms and supplied documents (identity of the trial, consistency with the rest of the package, completeness). Add Team review, Compare versions or Compare across documents when the user wants them.

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
