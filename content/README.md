# Content served by the MCP server

| Path | Served by | What it is |
|---|---|---|
| `playbook/planning.md` | `get_planning_guide` | How the assistant agrees a plan: questions, study facts, reference-package strategy, document list, naming, application types, transparency. |
| `countries/<CC>/requirements.json` | `get_planning_guide` | Country rules: authorities, language rules, every Part II document with trigger, CTIS title, language, template, signature rule and source; population sets; drafting rules. |
| `countries/<CC>/checklists/*.json` | `get_step_context` (Checklist step) | Checklist items with id, applicability condition, check and source. Results are recorded per item. |
| `countries/<CC>/templates/` | `get_step_context` / `read_resource` | Writing templates with labelled instructions, and Word templates. |
| `conventions/template-instructions.md` | all steps | How instructions are labelled in templates and removed in final documents. |

These files are TrialAgents catalog content. They are returned to the assistant at run time and are not listed to users (see `docs/TECHNICAL.md`, section 1).

Countries available: Germany (`DE`). Germany sources: the TrialAgents public CTIS guides (reviewed 23 September 2026) and the CTIS_DE template set (27 November 2026).
