---
id: findings
name: Findings
version: 1.0
effective: 2026-11-26
use_when: Reporting anything that needs a person.
applies_to: [findings]
---
A finding stops the document until a person resolves it, asks for a revision, or chooses to move on. Use them for what truly needs a person, and fix everything else yourself.

| Category | Use when |
|---|---|
| `missing` | Information or evidence is not in the sources or from the user. Say exactly what is needed. |
| `conflict` | The wording and its source, two sources, or a requirement and the document disagree. Quote both sides. |
| `decision` | Two or more acceptable options; a person must choose. List the options. |
| `comment` | Anything else a person should look at. |

- Anchor each finding to a section and, when possible, quote the exact words.
- Give a stable `key` (for example `reimbursement-cap`) to a finding you may report again, so it keeps its number across versions.
- One finding per issue. Keep the text to one or two sentences.
- When the user asks to move on despite findings on earlier steps, first tell them what is unresolved; then save with `continue_past: true`.
