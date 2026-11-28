---
id: redaction
name: Redacted documents for publication
version: '1.0'
effective: 2026-11-28
use_when: Preparing the redacted version of an approved final document that CTIS publishes.
applies_to: [redaction]
---
CTIS publishes some documents. For each of them the sponsor uploads two versions: the full one (not for publication) and a redacted one (for publication). Sources: EMA/194159/2023 Annex I v2.2 (30 April 2026), Tables II, III and VI; CTR Q&A v7.4 §6.4.

## When

- Only from the **approved final version**. The redacted version needs no approval of its own: it follows the approved final. If the final document changes and is approved again, the redacted version is out of date and is made again.
- Only when the user asks or clicks **Redact** in the workspace. Never on your own as part of running the plan.
- Documents that need one (the plan's `published`): the protocol and its synopsis (D1), patient-facing documents for primary or secondary endpoints (D4), the SmPC (E2), recruitment arrangements and material (K1, K2), and subject information and consent documents (L1, L2). Translations of patient-facing documents submitted in Part II (R2) and all other documents are not published.

## What to redact

Give each exact text as it appears in the document (every spelling and form that appears: "Dr Jane Doe", "J. Doe", "jane.doe@sponsor.com"), with its category. Redact as little as possible: the public version must still make sense (Q&A §6.4).

| Category | Redact | Keep |
|---|---|---|
| `name` | Names of individuals: sponsor staff (authors, approvers, medical monitors, study managers), CRO and vendor staff, site staff other than the principal investigator, DSMB or committee members, any participant | The principal investigator's name in recruitment (K) and subject information (L) documents; the coordinating or principal investigator in the protocol, whose details CTIS publishes |
| `signature` | Signatures, initials used as signatures, signature dates tied to a person | The signature block's role titles |
| `email` | Personal email addresses (name.surname@…) | Functional addresses the sponsor publishes as its contact point (for example clinicaltrials@sponsor.com); the PI's professional contact details in K and L |
| `phone` | Direct and mobile numbers of individuals | The site's or sponsor's general number published as a contact point; the PI's professional number in K and L |
| `address` | Home addresses of individuals | The sponsor's registered address; trial site names and addresses (CTIS publishes them) |
| `date_of_birth` | Dates of birth and ages of identifiable people | Age criteria and study population descriptions |
| `identifier` | Staff numbers, internal user IDs, document management IDs that identify a person | Protocol number, EU CT number, product codes |
| `company` | Commercially confidential information that is not public: names and addresses of contract manufacturers, CROs or vendors when not disclosed elsewhere; prices, costs and payment terms; unpublished proprietary formulation or manufacturing details | The sponsor's name; the product name and code; trial design, endpoints and everything CTIS publishes as structured data |
| `other` | Anything else that identifies a person (photos captions, handwriting notes) | — |

Participant payments, the trial's design, eligibility, procedures, risks and benefits are never redacted.

## How

1. `get_ctis_step` with `redaction` set to the document id: the approved final text, the file kind, earlier redactions and these instructions.
2. Read the whole text. List every term to redact, with its category and a short reason. Show the list to the user only if they ask for it.
3. If the final document is a **PDF**, ask the user first: upload the Word version as a new supplied version (best: the text stays searchable), or redact the PDF with the pages that contain redactions turned into images (their text can no longer be copied or searched). Then send `pdf_method: pages_as_images`.
4. Save with `save_ctis` action `save_redaction` (document and terms). The server redacts the approved file: in a Word file every matching character becomes a solid block, including headers, footers, notes, comments and tracked changes, and comment and change authors and the file properties are cleared; in a PDF the affected pages are rebuilt as images with black boxes. It reads the result back and refuses it if any term can still be found.
5. Report the result in one or two lines: what was redacted, terms not found (check their spelling against the text and save again if needed) and any warnings (for example images, which are not checked).
