# catalyst

A static-SPA-on-container project built with the **`cr_adlc_framework`** Claude Code plugin (agentic software-engineering framework). The plugin provides all agent behavior; this repo holds only this project's artifacts. **catalyst deliberately deviates from the framework default** (Django API + Azure Entra auth): it is a purely static, **public** Vite SPA — no Django backend, no auth, no Azure — deployed to Vercel with a thin set of serverless functions (project ADR-0001/0002/0003/0004).

## Workflow (provided by the plugin)

A **re-enterable six-phase project cycle**. The first four phases are entered through **one unified discovery grill, `/discover`** (ADR-0016); Phase 5 has one human gate; Phase 6 loops the current milestone autonomously per feature in driver-processed **waves** — a mechanical **checkpoint** per milestone boundary, human validation of the running application at **wave end** (fw-ADR-0044):

1. **`/discover`** — **the greenfield default**: one continuous, dependency-ordered grill across vision/features, architecture, and design that folds late insights back before anything is written, then authors via the specialist subagents and ends in **one spec-freeze gate**. It produces, internally and in order:
   - the whole-project spec — vision, personas, success criteria, the **full feature list**, project FR/NFR;
   - the whole-system Structurizr model + ADRs (incl. the **frontend-architecture** specifics: routing detail, state-management need, list→detail interaction model — the stack itself is prescribed, see below) + STRIDE threat model + NFR decisions (greenfield bootstraps the full base);
   - the design-system baseline (tokens → Tailwind theme + the `Cr*` component set) + key flows + accessibility baseline, craft driven by the `frontend-design` skill (bounded by the corporate brand) for the prescribed React + Tailwind + shadcn/ui frontend (ADR-0010);
   - a senior-dev critique of the whole spec that **freezes** it on pass.

   To revise a single already-frozen layer later, use the **scoped re-entry commands**: `/specify`, `/architect`, `/design`, `/review-spec` (same subagents, bounded to one artifact family).

   **Optional — `/mockup` (before `/plan`).** For a greenfield project or a change that adds **strong new UI**, build a throwaway clickable HTML prototype of the key flow(s) from the frozen design system to surface UX/feature learnings **before** planning — so a mis-specified UI is fixed in the spec, not rebuilt after `/implement`. Opt-in; skip for low-UI work.
2. `/plan` — group features into **milestones** (milestone-1 = foundation walking skeleton); deeply elaborate **only the current milestone** (derive feature specs + AC-test plan + tasks, seed the loop). **The critical gate.**
3. The **milestone loop** (driver-internal `/implement`, fw-ADR-0044 — run it via `bash infra/run-milestones.sh`, never directly): per feature, **tier-1** AC tests (red) → code (green) → review — the tier-1 signal is **frontend-side** (project ADR-0004): `vitest` (unit + mocked serverless-function handlers) + `tsc --noEmit` + a render smoke that catches type-drift and white-screen/console-error crashes in-loop (no behavioral browser E2E on the per-feature path); then the **milestone-end verification phase** (deterministic **business-e2e** data journeys + deterministic **business-e2e** rendered/a11y journeys — computed styles vs tokens, focus ring, responsive, `axe` — run **hermetically** against the statically built SPA, serverless-function calls mocked; no human visual-approval gate) and the **boundary checkpoint** (mechanical accept + freeze-provenance assertion + durable record). You pick the wave size (`--milestones N`), validate the running app at wave end, and resolve any parked halt in a supervised session. Resumable across `/clear` / restarts.

Brownfield = **re-enter** the cycle on an existing spec. `/evaluate` reports the trace + cost rubric. After a plugin update, **`/update-project`** pulls framework scaffold changes (settings/infra/.gitignore/this file's preamble) into this project — it reports the version delta and reconciles behind one gate, preserving your customizations and the notes below.

## Artifact precedence (resolve conflicts in this order)

`Vision > Requirements > Architecture > ADRs > Acceptance Criteria > Tests > Implementation`

The `Vision` + Requirements layers live in the project spec (`/specify`) — `product.md` (slim index) + `product/features/**` (one file per feature, owning its FRs); the design baseline in `design-system.md` (`/design`). Lower artefacts never override higher ones — escalate contradictions to the human.

> **ADR namespaces are distinct.** This project's `adrs/` (its own decisions, numbered from 0001) and the **framework's** ADRs (which govern the plugin, also numbered from 0001) are unrelated. When a plugin command or skill cites an ADR id (e.g. "ADR-0033") it means the **framework** ADR — a subagent that can't resolve a cited id in this project's `adrs/` should read it as a framework ADR at `${CLAUDE_PLUGIN_ROOT}/adrs/` (index: `${CLAUDE_PLUGIN_ROOT}/docs/adr-index.md`), not treat it as dangling. Newer plugin text prefixes these as `fw-ADR-NNNN`.

## Project artifacts (owned here)

- `product.md` — slim project-spec index: vision + personas + success criteria + scope + project NFRs + a feature index table (`/specify`)
- `product/features/<FEAT-id>-<slug>.md` — one self-contained file per feature (intent + edge cases + the feature's own FRs + traces); `product/features/_cross-cutting.md` for FRs/NFRs that span features (`/specify`)
- `roadmap.md` — milestone grouping + sequencing (`/plan`)
- `design-system.md` / `ux-flows.md` — design baseline + key flows (`/design`)
- `assets/CommerzReal_logo.png` — the Commerz Real brand mark (seeded at scaffold; wired to favicons + sidebar in `/implement`)
- `architecture/workspace.dsl` + threat model — this project's Structurizr model (single writer: the architecture step)
- `specs/<milestone>/<feature>.md`, `specs/<milestone>/<feature>.tasks.md` — derived feature specs + execution plans (`/plan`)
- `.adlc/progress.json` — milestone-loop state (orchestrator-owned; resumable); `.adlc/revision.md` — brownfield revision ledger (orchestrator-owned; archived to `.adlc/revisions/<milestone>.md` by `/plan`)
- `services/frontend/**` — the React + Vite SPA (the **single** terminal artefact image — `nginx:alpine` serving the built `dist/`); `services/frontend/e2e/**` holds the milestone-end business-e2e suite (project ADR-0004). There is **no** `services/backend/`.
- `adrs/` — this project's architecture decisions

## Stance

- **Git remote sync.** Each phase auto-commits + pushes to your `origin` remote (ADR-0006 — set one once with `git remote add origin <url>`; until then push is skipped with a warning). Third-party dependencies are **prescribed** to be declared at a pinned version in the project package manifest (`package.json` / `requirements.txt`) and resolved by the container build via the lockfile (`npm ci` / hash-pinned pip, ADR-0009) — for reproducibility. The old hard local-only / network-egress boundary was **retired (ADR-0024)**: network tools, image pushes, and host-side installs are no longer denied. The `PreToolUse` hook still enforces **write-path scoping**, the **test-immutability firewall**, and the narrow **Bash safety guards** (it denies host-side `runserver` and an unscoped `docker compose down`); the local plan-mode scratchpad `~/.claude/plans/` is exempt from write-path scoping.
- **One container image is the terminal artefact** (the `nginx:alpine` static SPA, project ADR-0001). catalyst has **no** Django API and **no** gunicorn image — it deviates from the framework's SPA+API default (fw-ADR-0022). The server-side surface (contact/relay + chat-proxy **serverless functions**, ADR-0001) deploys to **Vercel**, out of this repo's container scope (ADR-0003). Stopping at the SPA image is a **deliberate scope choice**.
- **Frontend is prescribed (ADR-0010 stack).** A React + Vite + TypeScript SPA (Tailwind CSS, shadcn/ui on Radix, Lucide icons, React Router, TanStack Query; client-side rendering, Node build-time only). Dev = the Vite dev server (HMR); prod = `nginx:alpine` serving the built SPA. **Auth = NONE** (project ADR-0002): catalyst is a purely public page — no login, no IdP, no tokens, no MSAL, no CORS-auth model (deviates from fw-ADR-0025). The api client (`src/lib/api.ts`) calls the Vercel serverless functions anonymously. The charting library is a per-project `/design` choice.
- **Dev is fully offline (project ADR-0002).** No IdP, so the dev inner loop needs no sign-in. Tier-1 is the **frontend** signal — `vitest` (unit + mocked serverless-function handlers) + `tsc --noEmit` + the render smoke (project ADR-0004; runs against the public SPA — every route renders without auth). The milestone-end business-e2e gate (`infra/run-e2e-gate.sh`, and the prod-parity variant `infra/prod-parity.sh`) is **hermetic**: Playwright + `axe` against the statically built SPA, with any serverless-function endpoint mocked — no live function, no IdP, no network.
- **Add project-specific notes below this line.**

**catalyst profile (harness decoupled from the framework's Django/Azure default).** See project ADRs 0001–0004: static Vite SPA only (ADR-0001), no auth/public (ADR-0002), GitHub Actions → Vercel deploy (ADR-0003), frontend-only hermetic e2e gate (ADR-0004). Practical consequences for agents working here:
- There is no `services/backend/`, no database, no Azure/Entra/MSAL, no bearer tokens anywhere. Do not reintroduce them.
- Tier-1 = `vitest` + `tsc --noEmit` + render smoke (`infra/docker-compose.test.yml` + `infra/docker-compose.frontend-check.yml`). Milestone-end e2e = `infra/run-e2e-gate.sh` (hermetic, `services/frontend/e2e/`).
- The dev stack (`infra/docker-compose.dev.yml`) starts **only** the frontend Vite container. Serverless functions run separately (`vercel dev`) and are proxied via `VITE_DEV_PROXY_TARGET` when needed.
