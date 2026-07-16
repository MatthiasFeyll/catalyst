# ADR-0003 — Deployment: GitHub Actions → Vercel

- **Status:** accepted
- **Datum:** 2026-07-14
- **Kontext-Phase:** /discover → Architektur
- **Abweichung:** Deployment ist hier bewusst im Architektur-Scope (fw-Default: Modell schließt Deployment-Ziele aus); außerdem kein Azure-Deployment (fw-ADR-0022/0025-Umfeld)

## Kontext

catalyst ersetzt die Vorgänger-Seite median. Der Owner will die **Pipeline als Teil des Projekts**
(Discovery-Block B1), das Repository liegt öffentlich auf GitHub (`git@…:MatthiasFeyll/catalyst.git`),
median deployte bislang über GitLab CI mit `vercel pull/build/deploy --prod`. Azure-Deployment ist
ausdrücklich ausgeschlossen. Das Zielhosting ist Vercel (statisches Build + Serverless Functions,
ADR-0001), inklusive cookieloser Vercel-Analytics (NFR-CC-05).

Der Framework-Default hält Deployment-Ziele, Registries und Runtime-Plattformen bewusst aus dem
Architekturmodell heraus. Weil hier die Pipeline explizit ratifizierter Projekt-Scope ist, werden
**GitHub** (Repo + Actions) und **Vercel** (Hosting + Analytics) als externe Systeme modelliert.

## Entscheidung

- **CI/CD:** Ein **GitHub-Actions-Workflow** baut das statische Vite-Build + die Functions und
  deployt nach Vercel (analog zum bewährten median-Flow, aber auf GitHub statt GitLab).
- **Neues Vercel-Projekt:** catalyst bekommt ein eigenes, frisches Vercel-Projekt.
- **Domain-Cutover:** Die Domain `matthias-feyll.de` wird **erst beim Go-Live** auf catalyst
  umgezogen; **median bleibt bis dahin live**. Vorher läuft catalyst auf einer Vercel-Preview-/
  Projekt-URL.
- **Secrets out-of-band:** `VERCEL_TOKEN`, `RESEND_API_KEY`, `DISCORD_WEBHOOK_URL` und später der
  LLM-API-Key werden **außerhalb des Repos** als GitHub-/Vercel-Secrets gepflegt. Sie erscheinen
  nie im Repo und nie im öffentlich einsehbaren SPA-Bundle (nur serverseitig in den Functions
  verfügbar).
- **Repo-Hygiene vor Go-Public:** Das Repo bleibt privat, bis die Alt-Materialien
  (`docs/Lebenslauf.docx.pdf`, `assets/reservix/**`, `docs/anforderungen.md`) entfernt und aus der
  Git-Historie bereinigt sind (Owner-Aufgabe, siehe Harness-Brief). Das öffentliche Repo ist
  zugleich Beleg der KI-geschriebenen Story (FEAT-007, FR-007-05).

## Konsequenzen

- **Positiv:** reproduzierbare, versionierte Auslieferung; kein manuelles Deploy; der
  Domain-Cutover ist entkoppelt und risikoarm (median als Rückfallebene bis Go-Live).
- **Positiv:** Geheimnis-Trennung serverseitig hält die statische SPA geheimnisfrei.
- **Abhängigkeit:** Dritt-Dependencies werden gepinnt im Manifest deklariert und über den
  Lockfile aufgelöst (fw-ADR-0009) — für reproduzierbare Builds und Supply-Chain-Kontrolle.
- **Abgrenzung:** Deployment-Details (Vercel-Projektkonfig, Domain-Verwaltung) sind Betrieb, nicht
  Feature; sie bleiben aus `product/**` heraus.
- **Negativ / Grenze:** Bindung an Vercel als Plattform (Functions-Laufzeit, Analytics). Ein
  Plattformwechsel wäre ein neuer ADR.
