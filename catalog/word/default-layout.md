---
id: default-layout
name: TrialAgents default layout
kind: layout
doc_type: all
version: 1.0
effective: 2026-11-26
use_when: Any document without its own Word template or authority form. Arial 12 pt, green headings, A4, header and footer with page numbers.
slots:
  - id: title
    accepts: text
    required: true
    description: The document title, as named in the plan.
  - id: body
    sections: all
    required: true
    description: All content sections in order. Each section heading becomes a level 1 heading.
  - id: header
    accepts: text
    description: Study code, short document name and version, for example "EX-101 · Participant information (DE) · v2.0".
  - id: footer
    accepts: text
    description: Sponsor and document date. Page numbers are added by the template.
---
Styles available to filled content: Title, Heading 1–4, Normal, List Bullet, List Number, Caption, Note info, Note warning, Note summary, the CTIS table style (shaded header row) and a highlighted Site placeholder for text the site completes.
