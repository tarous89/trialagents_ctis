---
id: planning
name: Planning a submission
version: 1.2
effective: 2026-11-28
use_when: Before saving or changing a project's document plan.
applies_to: [planning]
---
Goal: one plan that lists every document the submission needs, per part, country, language and population, the steps each goes through, and the order in which the packages are prepared.

Follow the competent authorities' and ethics bodies' own guidance exactly, as given in each country's planning checklist (for example AKEK, BfArM and PEI for Germany). Where two sources disagree, the newer official guidance wins; say so in the plan summary.

## 1. Establish the facts

Read the protocol (and any synopsis, IB, previous submission or sponsor documents the user gives you). Confirm with the user only what you cannot find: submission type, member states and languages, sponsor, study code. Then agree these planning choices with the user, proposing an answer for each:

- **Part I:** include it in the plan, completed outside TrialAgents (record its documents as sources), or left for later. Part I never blocks Part II. In the plan, Part I is mostly a readiness check of the sponsor's documents (see section 5).
- **Starting material:** what already exists (protocol only, or sponsor documents such as an existing participant information). Record existing documents as sources; they are the starting point of a Draft.
- **Format** (only when the sponsor brings its own documents): keep the sponsor's structure across countries as far as each country allows (`sponsor_format`), or use their content with the TrialAgents country format (`country_format`).
- **Reference package:** which country and language to complete first (see section 3).

## 2. Populations

Decide the populations before listing participant documents. Populations belong to the study and are saved once with the plan.

- A population is a group of **enrolled** participants who need materially different participant information because of differences in age or consent framework, study stage or part, participant type, mandatory procedures, treatment pathway, visit schedule, risk or expected benefit, safety monitoring, or burden.
- Populations are mutually exclusive within one consent stage: every participant belongs to exactly one. If criteria overlap, define combined populations.
- Protocol stages or parts are separate populations when participants enter them separately and the stages differ in purpose, randomisation, dose certainty, treatment pathway, mandatory procedures, monitoring, risk, burden or the information needed to consent (for example single-dose and multiple-dose adults, or the two stages of a phase 1/2 trial).
- An optional extension, crossover, retreatment, rollover or continued-access phase is a separate population only when participants make a new consent decision before entering it.
- These never create a population on their own: treatment arms, active versus placebo or comparator, randomised dose levels, investigator-selected options, cohort numbers or arm labels, biomarker or statistical subgroups, assignments within the same stage and consent pathway, optional samples, biopsies or genetic testing, optional pregnancy data, optional future research, partner information.
- Parents, guardians, legal representatives, partners and caregivers are not populations unless the protocol enrols them. Using a legal representative for an adult does not by itself create a population. Age groups among minors are not separate populations unless their procedures differ; age-adapted documents come from the country's templates.
- One homogeneous group is one population ("All study participants", or the protocol's term).
- For each population keep a short id (`single-dose-adults`), a label in the protocol's terms, a one-sentence description that tells it apart from the others, and the reason it needs its own documents.

Then, per country, give each population every participant template that applies (the country checklist's L1 variants and national notes, with the country's age bands and representative rules): a population can need several documents (for minors: the parents' document, the age-adapted documents, the adult document for re-consent at adulthood), and a template can serve several populations, each getting its own document. Templates that do not depend on the population (for example a pregnant partner or secondary-use document) may be one shared document when nothing in it would differ; agree that with the user. Every inclusion pathway in the protocol must end up with a document set.

## 3. Recommended order: the reference package

Recommend this order; plan another if the user prefers:

1. Part I, if it is in the plan.
2. The **reference package**: one country-language package completed in full, through every step, and approved by the owner. Choose the country the sponsor knows best, the language the team reviews most easily, or the country with the strictest rules.
3. The other packages, each document `based_on` its counterpart in the reference package (same code, variant and population): translate it, add the country's national requirements, remove what does not apply, and check it against the country's checklist. Countries may need more or fewer documents, extra details or several languages; documents with no counterpart are drafted from the sources and have no `based_on`.

The alternative, when the user wants it: draft every country from the sources in parallel (no reference package, no `based_on`).

Nothing waits for approval. When the next document is adapted from a reference document that is not approved yet, the run stops and you ask the user whether to approve the reference first or go ahead with its current version. Going ahead is fine (for example when the team will review everything together); a later approval of a different version marks the adapted document "Reference changed".

## 4. Building and saving the plan

1. Read the planning checklists for Part I and each member state, and the naming instructions, with `read_ctis_catalog`. Apply rows whose `submission_types` match. A conditional row applies when its condition is true for this study; say which conditions you assumed. If a country has no planning checklist, plan from your knowledge of CTIS and national practice and say so.
2. One document per row, per variant and per `per` value: `trial` once, `population` once per population (with its `population` id), `site` once as a site template unless the user wants one per site. Participant-facing documents need each language the country requires.
3. Name every document by the naming instructions (and the country's naming rule): its regulatory `code`, `variant` (the template variant, for example `adults`, `minors-12-17`), name and filename; add the population to the name and filename when a country has more than one population for the same template. Plan rows are numbered D01, D02, … in plan order: Part I, then the reference package, then the other countries.
4. The `code` and `variant` select the content template and styling, so use the codes from the planning checklist.
5. Steps: Draft, Source QC, Style, unless the user asks otherwise. The Draft step already checks the content template's checklist. Add Checklist, Team review or Internal guidelines only when the user wants a separate step for them; a plan with supplied documents needs the Checklist step. Mark a step not applicable where it makes no sense.
6. **Supplied documents** (`supplied: true`): documents the sponsor or someone else provides, which TrialAgents does not draft: most of Part I (protocol, synopsis, IB, IMPD, GMP documents, labels, scientific advice) and, in Part II, documents such as the insurance certificate or CVs. Their Draft column shows "Supplied" once the file is recorded; their steps are Draft and Checklist, with Source QC and Style not applicable. Use the planning checklist's `provided_by`: `sponsor` rows are supplied; `either` rows (for example a national-language synopsis or label) are supplied when the sponsor has them, otherwise the assistant prepares them from the approved English document (`based_on`) with all steps.
7. **Part I from the protocol.** List the Part I rows that apply to this study from the protocol or synopsis: an IB or an SmPC per product, an IMPD per product (simplified where allowed), GMP documents by where the product is made, an AxMPD for auxiliary products, scientific advice and PIP documents if any, the labels, a DSMB charter if there is a committee, and a D4 document for each questionnaire, diary or scale used for a primary or secondary endpoint. Add the national-language versions the member states in the plan require (the Part I checklist lists them per member state). Say which rows you assumed.
8. **Redacted documents:** the documents CTIS publishes (protocol, synopsis, endpoint patient-facing documents, SmPC, recruitment and subject information documents) get a "Redacted documents" entry automatically, made after their final version is approved. Set `redact: false` for one that will not be published, or `redact: true` for another document the user wants redacted.
9. Save with `save_ctis` (`save_plan`): the documents (with `population`, `based_on`, `supplied` and `redact` where they apply) and `planning` (`populations`, `part1_scope`, `reference_package`, `format_choice`). The plan opens in the workspace. Summarise it in a few lines: populations, documents per part and country, the order, assumptions, and anything the catalog did not cover. Do not start drafting until the user says to start.
