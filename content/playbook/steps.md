# Step instructions

Returned by `get_step_context` for the step being run, together with the deliverable's template, sources, reference document, country rules, checklist and open threads. One step per turn. Save with `save_version`.

## Always

- Work only from the sources, templates and rules in the step context. Never invent study facts, site, investigator, insurer or personal details. If something is missing, leave the instruction in place and raise a *missing data* finding; for conflicting sources raise *conflicting information*; for choices only the user can make raise *decision needed*.
- Fix what you can fix from the sources in the same step, and record what you fixed.
- Write in the document's language. Follow the country rules exactly (playbook section 0).
- Record every source and template used (`save_resources` → `record` for new ones).

## Draft

The first content step.

- **Participant document:** write every section of the bound template for this document's population, in the template's order and section styles. Follow the template's `content_instructions`, the instructions inside the model text, and the country `drafting_rules`. Keep the model text where it fits and make every study-specific addition; where you must deviate from the model text, say why in a finding (Germany: AKEK requires deviations to be justified and visible). Meet the country checklist items as you write. Remove all drafting instructions; keep consent-visit fields blank.
- **Adapted from a reference document:** start from the reference document's approved version (or the version the user chose). Translate into this document's language, apply this country's template, national requirements and checklist, add what the country needs, remove what does not apply. Keep the reference document's substance unless the country rules require otherwise. With `format_choice: sponsor_format`, keep the reference structure as far as the country rules allow.
- **From a starting document** (sponsor's own text): use it as the content basis and apply the template and country rules according to the format choice.
- **Form:** answer every field in `<template>.fields.json` (one answer per field id), in the template language for answers (German for German forms unless the user chose English). Follow each field's instruction and condition; for conditions that are false, give the template's "not applicable" answer; for checkboxes return ticked or not. Leave fields that belong to the site or investigator empty. The server writes the answers into the DOCX; the result is final layout.
- **Third-party template** (step "Prepare"): fill only the trial fields (title, EU trial number). Everything else stays empty for the person who completes it.

## Source QC

For participant documents. Compare every factual statement with the sources (protocol, IB/SmPC, sample plan, data flow, insurance documents). Link each claim to the passage it relies on (document, version, locator, quote). Record unsupported, softened or conflicting statements as findings and fix those the sources settle. Check consistency with the other documents of the package (compensation, insurance, samples, data, contacts).

## Checklist

For participant documents. A separate turn: read the finished document against every applicable item of the country checklist (Germany: `checklists/participant-documents.json`). Return one result per item: `met`, `unmet`, `needs_decision` or `not_applicable`, with a short rationale and evidence (quoted passage) or the gap. Items that are `unmet` and fixable from the sources are fixed in a new version within the step and recorded.

## Check

For forms, third-party templates, third-party documents and CTIS data. One short review against `checklists/forms-and-supplied.json`: trial identity, completeness, consistency with the rest of the package, document-specific items. Same result format as Checklist.

## Style

For participant documents only. Apply `styles/base.md` and the country styling (Germany: `countries/DE/styling.md`): letterhead, running footer, summary box, tables for schedules, checkbox and signature blocks, page breaks. Do not change wording except where a style rule requires it (for example splitting a long paragraph); any wording change is recorded.

## Package check (plan level)

Once per package, after its documents are done: run the country package checklist (Germany: `checklists/part-ii-package.json`): completeness against the plan and requirements, language and signatures, cross-document consistency, CTIS naming, transparency versions.
