---
id: R1_data-protection
name: R1 Statement of compliance with the GDPR (EU template)
code: R1_data-protection
kind: form
file: R1_data-protection.docx
countries:
- all
languages:
- all
version: '1.0'
effective: '2026-11-27'
use_when: R1 Statement of compliance with the GDPR (EU template). Shared form for all countries unless a country-specific form is listed for that country.
slots:
- id: kv103
  accepts: text
  required: false
  description: Sponsor (legal entity) with full address, as in the CTIS application.
- id: kv101
  accepts: text
  required: true
  description: Full title of the clinical trial, exactly as in the protocol.
- id: kv102
  accepts: text
  required: true
  description: EU trial number (EU CT number). Use a [[missing information]] mark if CTIS has not assigned it yet.
- id: r1_national
  accepts: text
  description: 'Only if the country requires it (see the planning checklist national notes): the national data-protection statement, in the form version''s language. Otherwise leave empty.'
- id: r1_date
  accepts: text
  description: Date of the declaration.
- id: r1_name
  accepts: text
  description: Name and surname of the responsible person at the sponsor.
- id: r1_role
  accepts: text
  description: Role of that person in the sponsor organisation.
---
Shared EU form used by every country unless the country has its own form. Answer each field in the language of this form version (see the planning checklist row for the country; the form text itself stays as provided). Follow each field's instruction; give the template's "not applicable" answer where a condition is false. Fields for the site or investigator are left for them.
