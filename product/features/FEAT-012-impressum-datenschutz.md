# FEAT-012 — Impressum & Datenschutz

## Ziel / Intent

Rechtliche Pflichtinhalte (Impressum, Datenschutzerklärung). Inhalte werden aus der Vorgänger-
Seite median übernommen und um die neuen Datenverarbeitungen (Kontakt-Zustellung, Relay, Chat)
erweitert. Die E-Mail-Adresse erscheint **ausschließlich hier**.

## Scope

**In:** Impressum-Seite; Datenschutz-Seite; Übernahme der median-Inhalte; Erweiterung um neue
Verarbeiter/Zwecke; E-Mail nur hier; Owner-Review vor Go-Live.
**Out:** Verbindliche Rechtsberatung/-prüfung (liegt beim Owner); Fabrizieren von Betreiber-/
Identitätsangaben (werden aus median übernommen, nicht erfunden).

## Funktionale Anforderungen

- **FR-012-01** — Eine **Impressum-Seite** stellt die rechtlich erforderlichen Betreiberangaben
  dar (Inhalte aus median übernommen). Das Impressum ist ein rechtsverbindliches deutsches
  Dokument und liegt **ausschließlich auf Deutsch** vor — **auch bei EN-Sprachwahl** (Ausnahme von
  `FR-CC-01`, RV-09).
- **FR-012-02** — Eine **Datenschutz-Seite** (**zweisprachig DE/EN**, gemäß `FR-CC-01`) übernimmt
  die median-Inhalte und ergänzt die **Offenlegung der zusätzlichen Drittverarbeiter**: den
  **Hosting-/Analytics-Anbieter** (Hosting der Seite + cookieless Reichweitenmessung, verarbeitet
  u. a. IP-Adressen) sowie die Verarbeiter für Kontakt-Zustellung, Relay und Chat (E-Mail-Versand,
  Push/Webhook, LLM-Dienst).
- **FR-012-03** — Die **E-Mail-Adresse des Owners** erscheint **im Klartext ausschließlich auf
  der Impressum-Seite**.
- **FR-012-04** — Die Rechtstexte werden vor Go-Live **vom Owner geprüft** (bis dahin als
  Entwurf/Draft gekennzeichnet).

## Edge Cases & Fehler-/Leer-Zustände

- **median-Quelltexte noch nicht eingepflegt** → Draft-Status, sichtbar als „vor Go-Live durch
  Owner zu prüfen"; keine erfundenen Betreiber-/Identitätsangaben.
- **Neue Verarbeiter kommen hinzu** → Datenschutz-Abschnitt ist erweiterbar zu halten.

## Bestätigte Annahmen

- Impressum + Datenschutz-Inhalte aus median übernehmen (F4); Owner prüft vor Go-Live (J10).
- Cookieless Analytics → Datenschutz-Text ohne einwilligungspflichtiges Cookie-Tracking.
- Der konkrete Hosting-/Analytics-Verarbeiter ist **Vercel** (Hosting + cookieless Analytics,
  verarbeitet IP-Adressen) — als Verarbeiter offenzulegen (RV-07; der Architektur-Agent zieht
  SEC-11 parallel nach).

## Acceptance Criteria

- Impressum und Datenschutz sind je als eigene, verlinkte Seiten erreichbar.
- Der Datenschutz nennt den Hosting-/Analytics-Verarbeiter (Vercel) sowie die zusätzlichen
  Verarbeiter für Kontakt, Relay und Chat.
- Bei EN-Sprachwahl bleibt das Impressum auf Deutsch, während die Datenschutzerklärung auf
  Englisch erscheint.
- Die Owner-E-Mail ist im Klartext nur im Impressum auffindbar.

## Traces

- Personas: P1, P2 (rechtliche Erwartung).
- Erfolgskriterien: SC-2 (Professionalität/Vertrauen).
- Cross-cutting: `FR-CC-01`, `NFR-CC-05` (cookieless).
- Abhängigkeit: FEAT-009 (E-Mail nur hier), FEAT-008 (LLM-Verarbeiter offenlegen).
- Ausstehende Materialien: median-Rechtstexte (Quelle), Owner-Review.
