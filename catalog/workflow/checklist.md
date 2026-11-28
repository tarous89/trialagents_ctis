---
id: checklist
name: Checklist
version: 1.1
effective: 2026-11-28
use_when: Running a separate Checklist step (optional; the Draft step already checks the template checklist).
applies_to: [checklist]
---
Check the current draft against the content template's checklist and the planning checklist row for this document.

- Go item by item (C01, C02, …, then each requirement and national note). For each, record passed, fixed, or a finding.
- Fix in the output what you can fix from the draft and the sources: missing mandatory sections, order, wrong document name, wrong language variant. Say what you fixed.
- Report a finding for what needs a person: `missing` (information not in the sources), `decision` (two acceptable options), `conflict` (requirement and draft or source disagree).
- The content you save is the checked document (with your fixes), followed by a final section `CHECKLIST` listing each item and its result.

## Supplied documents

A supplied document (the sponsor's protocol, synopsis, IB, IMPD, label, certificate, …) is checked, not rewritten. Save without content or changes so the supplied file is kept as it is; report a finding for everything the user must fix in their file, then they supply a new version.

Check each item and record it in `note` (passed or finding):

- S01 It is the final version: no draft watermark, tracked changes or open comments; version number and date present.
- S02 Versions match: the synopsis, patient-facing documents and labels match the protocol version in the plan; the IB and IMPD cover every product in the protocol; the Part II documents drafted in TrialAgents were made from this protocol version (compare with the sources).
- S03 Language: accepted by every member state in the plan for this document (the Part I planning checklist's rows and conditions); a national-language version is planned where one is required.
- S04 CTIS title: the document can be uploaded under the title in the planning checklist (CTCG naming), without forbidden characters, at most 100 characters.
- S05 File: PDF or Word, not password protected, text searchable (not a scan), file properties without a person's name.
- S06 Signatures: signed where the planning checklist requires it, and only there.
- S07 Publication: if the document is published (the plan's `published`), say whether a redacted version will be needed and what it will likely remove; the redaction itself happens after approval.
- Then each requirement and national note in the planning checklist row for this document.
