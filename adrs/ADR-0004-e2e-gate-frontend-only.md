# ADR-0004 — E2E-Gate frontend-only, Azure-E2E-Infra entfernt

- **Status:** accepted
- **Datum:** 2026-07-14
- **Kontext-Phase:** /discover → Architektur
- **Abweichung:** fw-ADR-0017/0018 (per-Feature-Gate + Milestone-Gate mit Backend/Azure-Token); fw-ADR-0022/0025-Infra

## Kontext

catalyst hat kein Backend (ADR-0001) und kein Auth (ADR-0002). Das Framework-Scaffold koppelt die
Test-/Gate-Infrastruktur an einen Django-API-Container, an Postgres und an einen Azure-/Entra-
Dev-Token (`infra/refresh-e2e-token.sh`, Token-/Tenant-Pfade in `run-e2e-gate.sh`,
`prod-parity.sh`, den Compose-Dateien, `frontend-smoke.py`). Diese Kopplung ist für catalyst
gegenstandslos und muss entfernt werden, ohne die eigentliche Test-Wirkung (deterministische
E2E-Journeys + a11y) zu verlieren.

## Entscheidung

- **Azure-/Entra-E2E-Infra vollständig entfernt.** Kein Token-Erwerb, kein Tenant, keine
  MSAL-/OIDC-/Bearer-Bezüge in der Gate-Infrastruktur. Umsetzung des Rückbaus in einer dedizierten
  Harness-Session gemäß `docs/harness-decoupling-brief.md` (kein `product/**`-, `architecture/**`-
  oder `design-system.md`-Eingriff — diese sind gefroren).
- **Backend-Anteile entfernt.** Kein API-Container, kein Postgres, keine pytest-basierten
  Gate-Anteile.
- **Per-Feature-Signal (Tier-1) wird frontend-seitig:** **`vitest`** (Verhaltens-/Unit-Ebene) +
  **`tsc --noEmit`** (Typ-Drift) + **Render-Smoke** (Weiß-Screen-/Konsolen-Crash-Schutz). Da keine
  Route Auth erfordert (ADR-0002), rendert die Smoke-Route trivial ohne Live-Token.
- **Function-Test-Tier (Teil von Tier-1) — Proof-Pfad für die serverseitige Logik:** Da die
  Serverless Functions (ADR-0001) beobachtbares Verhalten und die Security-Kanten tragen, gibt es
  eine explizite **`vitest`-Tier gegen die Function-Handler** mit **gemockten** Resend/Discord und
  gemocktem Ephemeral-Store (KV). Diese Tier ist die **Proof-Klasse** für **SEC-01** (Honeypot →
  keine Zustellung), **SEC-02** (Rate-Limit-Ablehnung ohne Zustellung), **SEC-03**
  (Header-/CRLF-Injection erzeugt keine zusätzlichen Header) und die **FEAT-009-Zustell-Logik**
  (eine Einreichung ⇒ Owner-Mail + Push + Absender-Bestätigung; Relay ohne E-Mail wird geblockt).
  Sie läuft hermetisch, ohne Live-Dritt-Dienst.
- **Milestone-Ende bleibt deterministisch, backend-los, hermetisch/offline:** **Playwright**-
  Business-E2E-Journeys + **axe**-a11y gegen das **statisch gebaute SPA** (via nginx- oder
  vite-preview-Container). **Function-abhängige Journeys** (Kontakt/Relay-Absenden, Chat-Relay)
  laufen im Gate über einen **Endpoint-Mock** — **MSW** bzw. **Playwright-Route-Mock** — der den
  Function-Endpoint gegen die statisch gebaute SPA simuliert (Erfolg/Fehler/Rate-Limit-Zustände).
  Die **echte Zustellkette (Resend/Discord live)** ist **ausdrücklich KEIN Gate-Bestandteil**,
  sondern **manuelle Wave-End-Validierung** durch den Owner. Keine LLM-Live-Aufrufe im Gate — die
  spätere Chat-Stufe wird gegen einen deterministischen Stub/Fallback getestet (der geführte Modus
  ist ohnehin die dauerhafte Baseline, ADR-0006).
- **NFR-Budget-Verifikation als Gate-Stufe (Performance-Proof, NFR-CC-02):** ein
  **Bundle-Budget-CI-Check** (z. B. `size-limit`) erzwingt **Initial-JS < 200 KB gz** als **harte**
  Schranke (Build/Gate schlägt bei Überschreitung fehl), plus ein **Lighthouse-CI-Budget** am
  **Milestone-Ende** (Performance **≥ 90 mobil**, **LCP < 2,0 s**, **CLS < 0,1**) gegen das statisch
  gebaute SPA. Damit sind die quantifizierten Budgets nicht nur Vorsatz, sondern gate-durchgesetzt.

## Konsequenzen

- **Positiv:** Das Gate läuft vollständig offline/hermetisch, ohne Netzwerk, ohne Tenant, ohne
  Geheimnisse — schnell und reproduzierbar.
- **Positiv:** Die Frontend-Signale (vitest/tsc/Smoke) passen zur reinen SPA und fangen die
  realen Fehlerklassen (Typ-Drift, Render-Crash) früh.
- **Abgrenzung:** Die deterministischen E2E-/a11y-Journeys prüfen **beobachtbares Verhalten** und
  berechnete Stile gegen Tokens (WCAG 2.2 AA, NFR-CC-01), nicht Implementierungsinterna.
- **Framework-Abweichung dokumentiert:** graceful degradation auf frontend-only ist im
  Scaffold-Stance vorgesehen (auto-detect fehlendes Frontend/Backend); catalyst nutzt die
  frontend-only-Seite dieser Degradation als bewusstes Profil.
