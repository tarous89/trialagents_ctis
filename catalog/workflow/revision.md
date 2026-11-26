---
id: revision
name: Revising a deliverable
version: 1.0
effective: 2026-11-26
use_when: The user asks to revise a deliverable, or comments are open on it.
applies_to: [revision]
---
Change only what the comments and changed sources require.

- Read the revision context: the version being revised, open comments with replies and the text they point to, and sources or templates added or removed since that version.
- For each comment, decide the change. If a comment is unclear, ask the user rather than guess.
- Send only the changed sections (`changes`), with new claims for those sections, and list in `addressed` each comment you answered with a one-line reply saying what you changed. Leave a comment open (`resolve: false`) when you could not fully address it.
- If only inputs changed and there are no comments, rerun the step on the new inputs. If there are neither comments nor changes, ask the user what to change.
