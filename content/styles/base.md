# Base document style

Used by the Style step for participant documents and by the renderer. Country files add their own rules (for Germany: `countries/DE/styling.md`); where a country rule is stricter, it wins. Forms (`kind: form`) keep their template's own layout and are not restyled.

## Section styles

Every section of a participant template has a `section_style` listing the elements it contains. The assistant writes content in these elements; the renderer maps each to a Word style.

| Section style | Use | Word rendering |
|---|---|---|
| `Header` | Site letterhead block at the top of the information and of the consent form | Site letterhead (logo, name, address, phone) supplied by the site; never invented |
| `H1 document headline` | Document title | Title, 18 pt bold |
| `H2 document subline` | Part titles (Kurzdarstellung, Teil I, Teil II, Einwilligungserklärung) | Heading 1, 14 pt bold, starts on a new page where the template has a page break |
| `H3 module title` | Numbered section heading, preferably phrased as the participant's question ("I. 3. Was passiert mit mir?") | Heading 2, 12 pt bold, kept with next paragraph |
| `H4 section title` | Sub-heading inside a module | Heading 3, 11 pt bold |
| `Rich body text` | Running text; `<b>` and `<u>` allowed, lists allowed | Normal, 11 pt, 1.15 line spacing, left aligned, short paragraphs |
| `Summary section` | Short summary of the study | Shaded box with a border across its full length, visually distinct from the rest; length limit set by the country |
| `Info table` | Trial identity: title, short title, protocol number and version, EU trial number, sponsor with address, principal investigator, site name, address and phone, sponsor's EU representative | Two-column table, labels bold |
| `Info/warning/note box` | Key statements that must stand out (voluntariness, important risks, what to do in an emergency, essential consent statements) | Bordered box with light shading |
| `Standard table` | Tabular content | Table with header row; **visit schedules and procedure lists are always tables** (visits as columns or rows, procedures marked), optionally with a simple timeline graphic |
| `Checkbox group` | Independent choices (optional activities, data transfer, re-contact) | One line per choice with an unticked box ☐; each choice stands alone |
| `Signature section` | Names, dates, places and signatures completed at the consent visit | Labelled blank lines with enough space; separate blocks for each signer (participant, representative, witness, physician) |
| `Footnote/small text` | References and small print | 9 pt |
| `TOC` | Table of contents | Automatic table of contents of H2 and H3 |
| `Section break`, `Section/page break` | Start of a new part (for example the consent form) | Page break; the consent form starts on a new page with its own letterhead and info table |

## Rules for every participant document

- **Running footer** on every page: document name, population, version, date, protocol number, EU trial number, and page "Seite x von y" (in the document's language).
- **Plain language:** short sentences, terms explained at first use, numbers and time periods easy to find, consistent terms.
- **Structure:** follow the template's sections and order. Do not move or merge modules unless the country rules allow it; mark any deviation as the country requires.
- **Visuals:** pictograms, simple timelines and tables where they help understanding; they add to the text and never replace required information.
- **Risks** grouped and ordered by frequency and severity, in the frequency categories the country uses.
- **Optional choices** look optional: separate checkbox lines, never pre-ticked.
- **Consent form** starts on a new page and repeats the letterhead and the info table.
- **No drafting instructions** remain (see `conventions/template-instructions.md`); fields for the consent visit stay blank.
- **Accessible output:** headings as real Word headings, tables with header rows, readable printed, on a phone and electronically.
