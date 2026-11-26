# TrialAgents CTIS: release and rollout

TrialAgents CTIS runs inside the two existing shared services, as Pipeline does. It adds no Render service.

| Service | Repository | What CTIS adds | Branch |
|---|---|---|---|
| Shared web (`intel-agent-app`) | `tarous89/intel_agent_app` | The app at `ctis.trialagents.com`, its API, the Claude MCP server at `/ctis/claude`, account and info pages, CTIS billing in the Stripe webhook, a worker for the schema, catalog and email | `claude/ctis-integration` |
| Shared MCP (`intel-mcp`) | `tarous89/intel_mcp` | Forwards `mcp.trialagents.com/ctis/claude` and its OAuth resource metadata to the shared web service | `claude/ctis-ingress` |

CTIS is on by default once deployed, as Pipeline is meant to be. Each part has an emergency off switch.

## 1. What is in this repository

| Path | Purpose |
|---|---|
| `integration/shared-web/host.patch` | Edits to existing files of the shared web service: account settings `product` option, OAuth resource and consent text for `/ctis/claude`, sign-in return to CTIS (`/auth?mode=login&ctis=1`), Stripe webhook hand-off (`ctis_account` metadata), host routing for `ctis.trialagents.com`, upload size and server packages in `next.config.ts`, the worker in `start-render.mjs` |
| `integration/shared-web/app/…` | New routes: `ctis-app`, `api/ctis/[[...path]]`, `ctis/claude`, `.well-known/oauth-protected-resource/ctis/claude`, `ctis-account`, `ctis-info/[section]` |
| `integration/shared-web/lib/adapter.ts`, `types/` | Connects the CTIS store, API, billing and MCP handler to the shared database, sign-in, OAuth tokens and Stripe client |
| `integration/shared-web/worker.mjs` | Becomes `scripts/ctis-worker.mjs`: applies `app/server/schema.sql` under an advisory lock, publishes `catalog/`, then sends queued email through Resend every 15 seconds |
| `scripts/stage-app.mjs` | Builds the views and installs all of the above, with `app/server`, `mcp` and `catalog` vendored under `app/lib/ctis/`, into a shared web checkout. Repeatable: the patch is applied once |
| `integration/shared-mcp/ctis_ingress.py`, `scripts/stage-ingress.py` | The MCP forwarder and its installer. It wraps whatever app `bootstrap.py` builds, so it works before or after Pipeline's `stage-ingress.py` |

To refresh the shared web branch after changing CTIS:

```bash
node scripts/stage-app.mjs /path/to/intel_agent_app
```

```bash
cd /path/to/intel_agent_app && npm install && npx tsc --noEmit && npx next build
```

`app/lib/ctis/SOURCE.md` records the CTIS commit that was vendored. Edit CTIS here, never in the vendored copy.

**Pipeline is staged at deploy time.** Render's build command for `intel-agent-app` runs Pipeline's `scripts/stage-app.mjs` (at a pinned commit) on the `main` checkout, which applies `pipeline-oauth.patch` and `pipeline-account.patch` to shared files (`app/oauth/authorize/route.ts`, `app/components/AccountSettings.tsx`, `app/lib/oauth-config.ts`, `app/components/ChatGPTConnection.tsx`, `tests/oauth-journey.test.mjs`). `host.patch` must leave every line those patches change or use as context exactly as it is, or the deploy fails. Check before opening a shared web PR:

```bash
PIPELINE_SRC=/path/to/trialagents_pipeline-at-the-pinned-commit node scripts/stage-app.mjs /path/to/intel_agent_app
```

## 2. Settings

Shared web service (`intel-agent-app`):

| Variable | Value |
|---|---|
| `CTIS_ENABLED` | Not needed. `false` switches off the app, its API, the webhook hand-off and the worker |
| `CTIS_MCP_ENABLED` | Not needed. `false` switches off `/ctis/claude`, its resource metadata and CTIS sign-in for Claude |
| `CTIS_TEAM_PRICE_TEST`, `CTIS_TEAM_PRICE_LIVE` | Optional Stripe price IDs for the Team plan. If unset, checkout finds the price by lookup key `trialagents_ctis_team_eur_49_monthly_v1`, or creates it (€49 per month) on first use |
| `CTIS_MAIL_FROM` | Optional sender, default `TrialAgents CTIS <no-reply@trialagents.com>` |

It reuses the service's existing `DATABASE_URL`, `RESEND_API_KEY`, `STRIPE_MODE`, Stripe keys and webhook secrets, and `OAUTH_*` settings. The Stripe webhook endpoint already receives `checkout.session.completed` and `customer.subscription.*` for Pipeline; CTIS needs no other events.

Shared MCP service (`intel-mcp`): nothing to set. It forwards to `intel-agent-app:10000` on Render's private network, as Pipeline's forwarder does.

## 3. Rollout order

1. **Merge and deploy the shared web branch.** The worker creates the `ctis` schema and publishes the catalog (logged as `ctis_catalog_release <n> published`; `ctis_start_failed` means it could not, and it retries every 15 seconds). `/ctis-app` on the service's Render address shows the app.
2. **Merge and deploy the shared MCP branch.** Check `https://mcp.trialagents.com/.well-known/oauth-protected-resource/ctis/claude` returns the resource `https://mcp.trialagents.com/ctis/claude`, and an unauthenticated POST to `/ctis/claude` returns 401 with a `WWW-Authenticate` header pointing at it. Every other MCP path is unchanged.
3. **Move `ctis.trialagents.com`** from Replit to the shared web service: add the custom domain in Render, then change the DNS record. Render issues the certificate. Old Replit addresses (`/app…`, `/projects`, `/project/…`, `/new`, `/settings`, `/templates`, `/template-generator`, `/render`) redirect to `/` (308). The public guides and reports (`/ctis/…`, `/reports/…`) are not touched.
4. **Live check** with a real Claude account: the EX-101 scenario in [BUILD-PLAN §10](BUILD-PLAN.md#10-phases). Then Team checkout in Stripe test mode, an invite email, and a notification email.
5. **Switch off Replit** once the domain serves the new app.
6. **Submit the Claude plugin** (`python3 scripts/package-plugins.py`) and point the browser header's Open in Claude link at its directory page.

To switch CTIS off, set `CTIS_ENABLED=false` and `CTIS_MCP_ENABLED=false` and redeploy: CTIS routes answer 404 and the worker stops; data stays in the `ctis` schema.

## 4. Checked on the branches

| Check | Result |
|---|---|
| Shared web: `npx tsc --noEmit`, `next build`, eslint on the CTIS files | Pass |
| Shared web, default settings: `/` on `ctis.trialagents.com` serves the app; resource metadata; `/ctis/claude` 401 with `WWW-Authenticate`; info pages; old-address redirects | Pass |
| Shared web, both set to `false`: `/ctis-app`, `/api/ctis/…`, `/ctis/claude`, the metadata route | 404 |
| Shared MCP: full test suite with the forwarder (571 tests) and its own tests | Pass |
| Shared MCP: CTIS and Pipeline staged in either order give the same entrypoint; CTIS, Pipeline and shared paths each reach the right handler | Pass |
| Against the production database, Stripe, Resend and Claude | Not yet: steps 2–6 above |
