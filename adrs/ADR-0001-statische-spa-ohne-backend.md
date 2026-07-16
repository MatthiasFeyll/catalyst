# ADR-0001 — Statische SPA ohne Backend

- **Status:** accepted
- **Datum:** 2026-07-14
- **Kontext-Phase:** /discover → Architektur
- **Abweichung:** fw-ADR-0022 (zwei Container: SPA + Django-API)

## Kontext

catalyst ist eine öffentliche Personal Page, die im Wesentlichen Inhalte präsentiert. Die drei
Vorgänger-Generationen kamen ohne eigenes Backend aus. Der einzige Grund für serverseitige Logik
ist (a) die zuverlässige Zustellung der Kontakt-/Relay-Nachricht über zwei Kanäle mit
Absender-Bestätigung (FEAT-009) und (b) die spätere LLM-Chat-Freitext-Stufe (FEAT-008), die einen
serverseitigen Proxy braucht, damit der API-Schlüssel und der Budget-Cap nicht im Client liegen.
Beides sind schmale, ereignisgetriebene Funktionen — kein persistenter Datenbestand, keine
Domänenentität, keine Nutzerverwaltung.

Das Framework-Scaffold liefert per fw-ADR-0022 zwei Runtime-Container (React-SPA + API-only
Django/DRF) plus Postgres. Für catalyst gibt es keine Anforderung, die einen Anwendungsserver oder
eine Datenbank rechtfertigt.

## Entscheidung

catalyst wird als **rein statisch gebautes Vite-SPA** ausgeliefert. Der einzige Server-Anteil sind
**Vercel Serverless Functions** (Container „Serverless Functions" im Modell) für Kontakt/Relay und
später den LLM-Chat-Proxy. **Es gibt keinen Django/DRF-Anwendungsserver und keine Datenbank.**

**Eng umrissene Ephemeral-State-Ausnahme:** Ein KV-Store (z. B. Vercel KV / Upstash) ist
**ausschließlich** für **Rate-Limit-Zähler** und den **Monats-Budget-Zähler** der LLM-Stufe
zulässig — **keine Domänen-Persistenz, keine Speicherung von Nutzerdaten oder Nachrichten**. Für
Meilenstein 1 genügt ein **In-Memory**-IP-Rate-Limit als Best-Effort-Hygiene (FEAT-009); der
**KV-Zähler wird mit der LLM-Stufe verbindlich**, weil die harte ~20-EUR-Monatsgrenze eine
Owner-Kernanforderung ist (ADR-0006). Der Store wird bewusst **nicht** als eigener DSL-Container
modelliert (Infrastruktur-Detail der Functions), sondern in deren Modell-Beschreibung erwähnt.

Das **Terminal-Artefakt** ist damit: das statische Vite-Build (`dist/`) **plus** die Vercel
Serverless Functions — **nicht** die zwei Container-Images aus fw-ADR-0022.

Der Django-Backend-Container und Postgres werden aus dem Architekturmodell entfernt (siehe
`architecture/workspace.dsl`); die entsprechende Scaffold-Infrastruktur wird über den
Harness-Decoupling-Brief (`docs/harness-decoupling-brief.md`) in einer dedizierten Session
zurückgebaut.

## Konsequenzen

- **Positiv:** minimale Angriffsfläche und Betriebskomplexität; kein Datenbank-Betrieb, keine
  Migrationen, kein Anwendungsserver; die Performance-Budgets (NFR-CC-02) sind mit statischer
  Auslieferung + Edge-CDN gut erreichbar. Der eng umrissene KV-Zähler ist **kein** Datenbank-/
  Domänen-Betrieb (nur Ganzzahl-Zähler mit TTL).
- **Positiv:** die geführte Chat-Baseline (M1) ist vollständig clientseitig und braucht die
  Functions gar nicht (siehe ADR-0006).
- **Negativ / Grenze:** jede künftige Anforderung mit echtem Persistenzbedarf (z. B.
  serverseitig gespeicherter Zustand, Nutzerkonten) würde diese Entscheidung neu aufwerfen und
  einen frischen ADR erfordern.
- **Framework-Abweichung dokumentiert:** fw-ADR-0022 gilt für catalyst nicht; das E2E-Gate wird
  entsprechend frontend-only (ADR-0004), das Auth-Modell entfällt (ADR-0002).
- Datensparsamkeit: Die Functions verarbeiten personenbezogene Eingaben (Name, E-Mail, Nachricht)
  nur transient zur Zustellung, ohne Persistenz — offengelegt im Datenschutz (FEAT-012, NFR-CC-05).
