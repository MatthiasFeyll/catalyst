# Querschnitts-Anforderungen (Cross-cutting)

> Nur FRs/NFRs, die **feature-übergreifend** gelten. Feature-spezifische Anforderungen leben in
> der jeweiligen `FEAT-*`-Datei. IDs sind global eindeutig und stabil.

## Querschnitts-FRs

- **FR-CC-01 — Zweisprachigkeit aller Inhalte.** Sämtliche für Nutzer:innen sichtbaren Inhalte
  aller Features sind in **Deutsch und Englisch** verfügbar. **Eigennamen** (Firmen-, Produkt-,
  Personennamen) bleiben unverändert. Die Umschaltmechanik selbst besitzt FEAT-010; diese FR ist
  die Inhalts-Invariante, die für jedes Feature gilt.
  - **Ausnahme (RV-09) — Impressum:** Das **Impressum** ist ein rechtsverbindliches deutsches
    Dokument und liegt **nur auf Deutsch** vor (auch bei EN-Sprachwahl). Die
    **Datenschutzerklärung** bleibt **zweisprachig** (DE/EN). Details in FEAT-012.
- **FR-CC-02 — Du-Ansprache und Ich-Perspektive.** Die Seite spricht die Besucher:in durchgehend
  im **Du** an und formuliert Matthias' Aussagen in der **Ich-Perspektive** („Mensch hinter dem
  Code"). Gilt für alle textlichen Inhalte, inkl. Chat-Erstnachricht und Absender-Bestätigung.

## Querschnitts-NFRs

- **NFR-CC-01 — Barrierefreiheit (WCAG 2.2 AA).** Die gesamte Seite erfüllt WCAG 2.2 AA. Sie ist
  **vollständig tastaturbedienbar**, zeigt einen **sichtbaren Fokus-Ring**, und dekorative
  Linien/Grafiken sind **rein dekorativ** (nicht alleiniger Bedeutungsträger, für Hilfstechnik
  ausgeblendet). **Volle `prefers-reduced-motion`-Parität**: zu jeder Animation existiert ein
  gleichwertiger statischer/finaler Zustand ohne Informationsverlust.
- **NFR-CC-02 — Performance-Budgets.** Lighthouse-Score **mobil ≥ 90**; **LCP < 2,0 s** (4G-
  Mittelklasse); **CLS < 0,1**; **Initial-JS < 200 KB gzip**. Schwergewichtige Module
  (Visualisierungs-Band, Chat) werden **lazy** geladen; Schriften subgesetzt und self-hosted.
- **NFR-CC-03 — Browser-Matrix.** Unterstützt: **Evergreen last-2** von Chrome, Edge, Firefox,
  Safari sowie **aktuelles iOS Safari und Android Chrome**. **Kein Internet Explorer.**
- **NFR-CC-04 — Responsivität.** Bedienbar von **360 px bis WQHD**. Content-Maxbreite **~1500 px**;
  dekoratives Linien-Motiv und Parallax dürfen full-bleed über die Content-Breite hinausgehen.
- **NFR-CC-05 — Datenschutz / cookieless.** Reichweitenmessung erfolgt **cookieless**; kein
  einwilligungspflichtiges Tracking-Cookie. Personenbezogene Eingaben (Kontakt/Relay/Chat)
  werden datensparsam verarbeitet und im Datenschutz offengelegt (FEAT-012).
- **NFR-CC-06 — Erinnerungswert / „less is more".** Die Gestaltung ist eigenständig und
  einprägsam, bleibt dabei **unaufdringlich und reduziert** (keine visuelle Überladung).
  Delight-Momente stören den primären HR-Pfad nie (siehe FEAT-013).

## Traces

- Personas: P1, P2 (alle).
- Erfolgskriterien: SC-1, SC-2, SC-3.
- Betroffene Features: alle (FEAT-001 … FEAT-013).
