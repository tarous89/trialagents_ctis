# TrialAgents CTIS: release and rollout

TrialAgents CTIS runs inside the two existing shared services, as Pipeline does. It adds no Render service.

| Service | Repository | What CTIS adds | Branch |
|---|---|---|---|
| Shared web (`intel-agent-app`) | `tarous89/intel_agent_app` | The app at `ctis.trialagents.com`, its API, the Claude MCP server at `/ctis/claude`, account and info pages, CTIS billing in the Stripe webhook, a worker for the schema, catalog and email | `claude/ctis-integration` |
| Shared MCP (`intel-mcp`) | `tarous89/intel_mcp` | Forwards `mcp.trialagents.com/ctis/claude` and its OAuth resource metadata to the shared web service | `claude/ctis-ingress` |

Everything is off until its flag is set, so both branches can be merged and deployed before launch.

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

## 2. Settings

Shared web service (`intel-agent-app`):

| Variable | Value |
|---|---|
| `CTIS_ENABLED` | `true` turns on the app, its API, the account and info routes' data, the webhook hand-off and the worker |
| `CTIS_MCP_ENABLED` | `true` turns on `/ctis/claude`, its resource metadata and CTIS sign-in for Claude. Without it, Claude cannot connect |
| `CTIS_TEAM_PRICE_TEST`, `CTIS_TEAM_PRICE_LIVE` | Optional Stripe price IDs for the Team plan. If unset, checkout finds the price by lookup key `trialagents_ctis_team_eur_49_monthly_v1`, or creates it (€49 per month) on first use |
| `CTIS_MAIL_FROM` | Optional sender, default `TrialAgents CTIS <no-reply@trialagents.com>` |

It reuses the service's existing `DATABASE_URL`, `RESEND_API_KEY`, `STRIPE_MODE`, Stripe keys and webhook secrets, and `OAUTH_*` settings. The Stripe webhook endpoint already receives `checkout.session.completed` and `customer.subscription.*` for Pipeline; CTIS needs no other events.

Shared MCP service (`intel-mcp`): nothing to set. It forwards to `intel-agent-app:10000` on Render's private network, as Pipeline's forwarder does.

## 3. Rollout order

1. **Merge and deploy the shared web branch** with both flags off. Nothing changes for current users.
2. **Set `CTIS_ENABLED=true`** and redeploy. The worker creates the `ctis` schema and publishes the catalog (logged as `ctis_catalog_release <n> published`; `ctis_start_failed` means it could not, and it retries every 15 seconds). `/ctis-app` on the service's Render address now shows the app.
3. **Merge and deploy the shared MCP branch.** Until step 4, `mcp.trialagents.com/ctis/claude` answers 404 from the web service; every other MCP path is unchanged.
4. **Set `CTIS_MCP_ENABLED=true`.** Check `https://mcp.trialagents.com/.well-known/oauth-protected-resource/ctis/claude` returns the resource `https://mcp.trialagents.com/ctis/claude`, and an unauthenticated POST to `/ctis/claude` returns 401 with a `WWW-Authenticate` header pointing at it.
5. **Move `ctis.trialagents.com`** from Replit to the shared web service: add the custom domain in Render, then change the DNS record. Render issues the certificate. Old Replit addresses (`/app…`, `/projects`, `/project/…`, `/new`, `/settings`, `/templates`, `/template-generator`, `/render`) redirect to `/` (308). The public guides and reports (`/ctis/…`, `/reports/…`) are not touched.
6. **Live check** with a real Claude account: the EX-101 scenario in [BUILD-PLAN §10](BUILD-PLAN.md#10-phases). Then Team checkout in Stripe test mode, an invite email, and a notification email.
7. **Switch off Replit** once the domain serves the new app.
8. **Submit the Claude plugin** (`python3 scripts/package-plugins.py`) and point the browser header's Open in Claude link at its directory page.

To roll back, unset the flags: CTIS routes answer 404 and the worker stops; data stays in the `ctis` schema.

## 4. Checked on the branches

| Check | Result |
|---|---|
| Shared web: `npx tsc --noEmit`, `next build`, eslint on the CTIS files | Pass |
| Shared web, flags on: `/` on `ctis.trialagents.com` serves the app; resource metadata; `/ctis/claude` 401 with `WWW-Authenticate`; info pages; old-address redirects | Pass |
| Shared web, flags off: `/ctis-app`, `/api/ctis/…`, `/ctis/claude`, the metadata route | 404 |
| Shared MCP: full test suite with the forwarder (571 tests) and its own tests | Pass |
| Shared MCP: CTIS and Pipeline staged in either order give the same entrypoint; CTIS, Pipeline and shared paths each reach the right handler | Pass |
| Against the production database, Stripe, Resend and Claude | Not yet: steps 2–6 above |
