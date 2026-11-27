# Content served by the MCP server

| Path | Served by | What it is |
|---|---|---|
| `playbook/planning.md` | `get_planning_guide` | How the assistant agrees a plan: questions, study facts, reference-package strategy, document list, naming, application types, transparency. |
| `playbook/steps.md` | `get_step_context` | What each step (Draft, Source QC, Checklist, Check, Style, package check) does for each kind of document. |
| `styles/base.md` | `get_step_context` (Style step) | Section styles and layout rules for every participant document. |
| `countries/<CC>/styling.md` | `get_step_context` (Style step) | National styling rules and each template's styling instructions. |
| `playbook/naming.md` | `get_planning_guide` | CTIS title convention with all Form, Part I and Part II examples. |
| `countries/<CC>/requirements.json` | `get_planning_guide` | Country rules: authorities, language rules, every Part II document with trigger, CTIS title, language, template, signature rule and source; population sets; drafting rules. |
| `countries/<CC>/checklists/*.json` | `get_step_context` (Checklist step) | Checklist items with id, applicability condition, check and source. Results are recorded per item. |
| `countries/<CC>/templates/` | `get_step_context` / `read_resource` | Participant templates (JSON, section by section) and Part II Word templates. |
| `conventions/template-instructions.md` | all steps | How templates carry their instructions and that none may remain in a final document. |

These files are TrialAgents catalog content. They are returned to the assistant at run time and are not listed to users (see `docs/TECHNICAL.md`, section 1).

To add a country, follow `COUNTRY_ONBOARDING.md`.

Countries available (25): Austria, Belgium, Bulgaria, Croatia, Czechia, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Ireland, Italy, Latvia, Lithuania, Netherlands, Norway, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden. Not built: Cyprus (no guide). Open questions and missing items across countries: `DECISIONS.md`. Germany sources: the TrialAgents public CTIS guides (reviewed 23 September 2026) and the CTIS_DE template set (27 November 2026).
