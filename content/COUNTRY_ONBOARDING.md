# Adding a country

The workflow and rules used to build Germany (`countries/DE`). Follow them for every new country so all countries have the same shape and the MCP server can serve them the same way.

## 1. What to collect from the user

- The country folder: Part II DOCX templates (the old variable-based ones), the variable sheet (`Variable Templates_<CC>_<lang>.xlsx`), and the participant templates (JSON text, one block per population template).
- The TrialAgents country guides: `https://trialagents.com/ctis/<country>/en` and every page it links to (Part II checklist, participant information and consent, QC checklist, population guides). Also re-read the EU hub (`/ctis/eu`) and the naming guide (`/ctis/ctis-document-naming-convention`) when their review date changed.

## 2. Rules

1. **Follow the authority exactly.** Use the national authority's and ethics bodies' own guidance as recorded in the guides (Germany: AKEK, BfArM/PEI, AMG). Do not simplify their rules.
2. **Newest official source wins.** Where the templates, a guide and the naming guide disagree, follow the newest official guidance (example: AKEK age band 7–11 replaced the template's 6–11; CTCG v3.0 titles replaced older names on the Germany checklist page). Record the conflict in the country's templates README.
3. **Participant templates are used as supplied.** Keep their JSON (`template_instructions` + `template_content` with `section_style`). Only replace old pipeline variables (`{{population_label}}`, `{{population_description}}`, `{{doc_name_local}}`, `{{date}}`) with plain bracket notes. Do not rewrite the model text or its instructions.
4. **Part II forms are shared.** K1, M1, M2, N1, P1, R1 and S1 are the same EU forms in every country (checked for all 28 folders: only the variable numbering and the language/country name in the variable descriptions differ). Use `content/eu/templates/part-ii`; do not copy them into the country. The country file sets `answer_languages`, national notes (`drafting_notes_<lang>`) and any `national_fields` (for example a required national statement in R1). Only a form that really differs, or a document the country adds, goes into `countries/<CC>/templates/part-ii`, converted with `tools/content/curate.py` and `fields.py`.
5. **Nothing for others to fill.** Fields the site, investigator or another party completes stay empty, without placeholders. CV and declaration-of-interest templates stay as the original EU forms; only trial title and EU trial number are filled.
6. **Guidance lives in `requirements.json`, not in the documents.** Per-document notes (CTIS section, mandatory or conditional, language, signature rule, template basis, national additions) go into `drafting_notes_<lang>`. Template boilerplate ("How to use this document", endorsements) is marked as a note to delete.
7. **Add national content the templates miss** when a guide requires it (Germany: the national data-protection sentence in R1).
8. **Names follow the naming guide** (`playbook/naming.md`), with the population label as subtype for participant documents.

## 3. Steps

1. Read every guide page in full. Note: authorities and fee route; language rules; each Part II document with mandatory/conditional status and trigger, CTIS section, language, template, signature rule, who provides it; population-specific rules (age bands, representatives, emergency, witness, pregnancy, secondary use); drafting rules; QC checklist items; package checklist items.
2. Split the participant templates: `python3 tools/content/split_participant.py <source.txt> countries/<CC>/templates/participant <CC>` (stops if the file's country code is not `<CC>`). Check each template's `description`, `styling_instructions` and age bands against the authority's guidance. Countries with several languages (Belgium, Finland, …) get one set per language in the same folder; file names carry the language code.
3. Confirm the country's Part II DOCX and variable sheet match the shared forms (same text apart from variable numbers; same descriptions apart from language and country). If a form differs or the country needs an extra document, convert only that one into `countries/<CC>/templates/part-ii` and record why.
4. Write `countries/<CC>/requirements.json` with the same keys as Germany (plus `answer_languages`; multi-language countries list each package language and which documents each language needs): `authorities`, `language_rules`, `study_facts_used`, `documents` (id, ctis_section, ctis_title, name_en, requirement, trigger, per, language, template with file and fields, signature_at_submission, kind, reader, filled_by, default_steps, drafting_notes, sources), `document_kinds`, `default_steps_by_kind`, `participant_templates` (catalogue), `population_sets`, `population_rules` (age bands, always-needed templates, shareable templates, separate-document rules), `drafting_rules`, `naming`, `styling`, `checklists`, `playbook`, `sources`.
5. Write `countries/<CC>/styling.md`: national rules for all participant documents plus each template's `styling_instructions` verbatim; fill a missing one with the national rules.
6. Write the three checklists in `countries/<CC>/checklists/`: `participant-documents.json` (from the country QC checklist), `forms-and-supplied.json` (common items plus items per document id), `part-ii-package.json` (completeness, language and signatures, cross-document consistency, CTIS naming, transparency, final form). Every item: id, check, optional `applies_when` using study-fact keys.
7. Write `countries/<CC>/templates/README.md`: what was used as supplied, what was converted, conflicts resolved under rule 2, open points. Put every decision the user should make in `countries/<CC>/DECISIONS.md` (one line each: question, options, your recommendation); they are answered together later.
8. Run the audit, `python3 tools/content/audit.py <CC>`, and also check by hand that the document list matches the country guide's Part II checklist one to one.
9. Commit, open a pull request and merge.

## 4. General content (shared by all countries)

| File | Contents |
|---|---|
| `playbook/planning.md` | Principle, plan contents, questions and study facts, populations and templates, reference-package strategy, document list, kinds and default steps, naming pointer, application types, transparency |
| `playbook/naming.md` | CTIS naming convention (CTCG v3.0) with all examples |
| `playbook/steps.md` | What each step does per document kind |
| `conventions/template-instructions.md` | How templates carry instructions; nothing may remain in a final document |
| `styles/base.md` | Section styles and rules for every participant document |

Update these only when an EU-level source changes, and say so in the commit.
