# Business-E2E suite (milestone-end) — catalyst

Deterministic, **hermetic** browser journeys run **once per milestone** (project ADR-0004),
never on the per-feature path (that is tier-1 vitest + `tsc` + the render smoke). Executed by
the standing Playwright runner (`infra/docker-compose.e2e.yml`) against the **statically built
SPA** (the shipped `nginx:alpine` image) — no Django backend, no auth, no live network.

catalyst is a purely static, public page: the only server-side surface is Vercel serverless
functions (contact/relay, chat proxy — ADR-0001). Journeys that depend on a function **must mock
the endpoint** (Playwright `page.route(...)` / MSW), so the gate stays offline/hermetic — never a
live function, never an IdP.

Two journey classes live here (ADR-0004):
- **data / routing / state** journeys (navigate → act → see result; deep-link + refresh routing);
- **rendered / a11y** journeys (computed styles vs design tokens, visible focus ring, responsive,
  deterministic `axe` with no serious/critical violations). There is no human visual-approval gate.

Layout:
- `_skeleton/` — the walking-skeleton boot smoke (ships with the harness; proves the gate wiring).
- `<milestone>/` — the tester authors per-milestone journeys here; scope one with
  `E2E_TARGET=<milestone>/`.

The suite is mounted **read-only** into the runner (test-integrity firewall); artifacts go to
`test-artifacts/`.
