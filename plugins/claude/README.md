# TrialAgents CTIS for Claude

Prepare CTIS clinical trial applications with Claude. TrialAgents CTIS keeps each submission as a project: the documents for Part I and each country's Part II, the steps each one goes through, every version with its sources, and your team's comments and approvals. This plugin lets Claude plan and run that work with you.

## What you can do

- **Plan a submission.** "Prepare a CTIS initial application for our study in Germany and Spain." Claude uses the TrialAgents planning checklists for each country, names every document by its regulatory code, and shows the plan for you to adjust.
- **Run the documents.** "Start." Claude drafts each document from the TrialAgents content templates and your sources, checks every fact against its source passage, and fills the Word template or authority form. It stops on a document where a person is needed and moves on to the next.
- **Pick up later.** "Continue EX-101" works in any conversation: the plan, versions and open questions are kept in TrialAgents CTIS.
- **Revise.** "Revise D04-QC" sends Claude your comments and any changed sources; it changes only what is needed.

In Claude on the web, desktop and mobile, the workspace opens in the conversation. In Claude Code, Claude answers in text and gives you a link.

## Getting started

1. Install the plugin from the Claude directory, or in Claude Code run:

   ```
   /plugin install trialagents-ctis --marketplace tarous89/trialagents_ctis
   ```

2. When asked, sign in with your TrialAgents account (or create one) and approve the connection.
3. Your own projects are free. Sharing with reviewers needs the Team plan (€49 per month per owner account).

## Permissions

Claude reads with five read-only tools and saves with one tool, `save_ctis`. Every save is a new version or record; nothing is overwritten or deleted. Approving final documents, sharing, billing and uploading files are done by people in TrialAgents CTIS, never by Claude. Every change made through Claude is recorded as Claude in the project's Logs.

## Privacy and data

Do not enter patient-level data. Your projects, documents and stored sources stay in your TrialAgents account, hosted in Frankfurt, and are used only to provide the service. See the [privacy policy](https://ctis.trialagents.com/ctis-info/privacy) and [terms](https://ctis.trialagents.com/ctis-info/terms).

## Help

- Setup, permissions and troubleshooting: https://ctis.trialagents.com/ctis-info/connectors
- Support: https://ctis.trialagents.com/ctis-info/support
- About: https://ctis.trialagents.com/ctis-info/about

Published by Atlas Consulting. Contact: contact@trialagents.com
