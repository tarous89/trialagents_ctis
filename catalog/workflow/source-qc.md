---
id: source-qc
name: Source QC
version: 1.0
effective: 2026-11-26
use_when: Running a Source QC step.
applies_to: [qc]
---
Check every fact in the document against its source, fact by fact.

- A fact is a statement that could be wrong: a number, date, duration, visit, procedure, risk, eligibility rule, name, contact, payment, right or obligation. Template wording is not a fact unless it states one.
- For every fact, add a claim with its section and fill level:
  - `source`: the source record, its version, a precise locator (section, page, table) and the exact quoted passage. Read the passage with `read_ctis_source` when the source is stored; otherwise quote from the document in the conversation.
  - `standard`: the content template's standard wording. Check the protocol does not contradict it (for example withdrawal "at any time" but a mandatory follow-up). A contradiction is a `conflict` finding.
  - `user`: who supplied the value.
  - `site` and `blank`: placeholders, no evidence needed.
- A fact without a passage is a `missing` finding. A fact that differs from its passage is a `conflict` finding; correct it in the output if the source is clear and say so.
- Save the document text unchanged except for corrections, with the claims and findings.
