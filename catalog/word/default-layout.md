---
id: default-layout
name: TrialAgents default layout
kind: layout
doc_type: all
version: 1.1
effective: 2026-11-26
use_when: 'Any document without its own template or authority form, in particular participant information and consent documents in every country. Blue title box, shaded section bands, bordered information tables, cyan highlight for missing information.'
slots:
  - id: title
    accepts: text
    required: true
    description: 'The document title in the document''s language, for example "Hoja de información al paciente y consentimiento informado".'
  - id: subtitle
    accepts: text
    description: 'The population or variant, for example "Todos los participantes del estudio". Leave out when there is none.'
  - id: body
    sections: all
    required: true
    description: 'All content sections in order. Each section heading becomes a shaded section band.'
  - id: footer
    accepts: text
    required: true
    description: 'Document name, population, version and date, for example "Hoja de información al paciente y consentimiento informado - Todos los participantes del estudio - versión 1.0 - 15 de agosto de 2026".'
  - id: page_label
    accepts: text
    default: ''
    description: 'The word before the page number in the document''s language, with a trailing space, for example "Página " or "Seite ". Leave out for "1 / 2".'
  - id: page_of
    accepts: text
    default: ' / '
    description: 'The words between page number and page count, for example " de " or " von ".'
  - id: footer_ids
    accepts: text
    description: 'Protocol and EU trial numbers in the document''s language, for example "Número de protocolo: EX-101-03 | Número de ensayo de la UE: 2026-500123-45-00".'
---
Inline marks in any text: **bold**, *italic*, __underline__, and [[text]] for missing information, which is highlighted in cyan.
Blocks: heading, paragraph, list, table (style "info" gives the two-column study information table with bold labels), note, placeholder, image, page break.
