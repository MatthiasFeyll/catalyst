# ADR-0005 — Frontend-Architektur (Routing, State, Interaktion, i18n, Viz, Prerender)

- **Status:** accepted
- **Datum:** 2026-07-14
- **Kontext-Phase:** /discover → Architektur
- **Art:** Framework-Pflicht-ADR (Frontend-Architektur-Spezifika); der Stack selbst ist per fw-ADR-0010 vorgeschrieben

## Kontext

catalyst ist eine rein statische React+Vite+TS-SPA (ADR-0001) mit einer scroll-getriebenen
Hauptreise über 13 Features, einem teilbaren Referenz-Detail (FEAT-006), Zweisprachigkeit
DE/EN (FEAT-010/011), zwei schweren d3-Visualisierungen (FEAT-004 Kompetenz-Band, FEAT-007
Evolution-Faden) und strengen Performance-/a11y-Budgets (NFR-CC-01/02/04). Diese ADR fixiert die
architektonischen Frontend-Entscheidungen, die das Framework hier verbindlich verlangt.

## Entscheidung

### Routing & Sprach-URLs
- **Sprach-präfigierte URLs als Source of Truth der aktiven Sprache:** **`/` = Deutsch (Default,
  `x-default`)**, **`/en` = Englisch**. Beide Sprachfassungen werden **build-zeit-prerendered**
  (FR-011-01) und über ein **hreflang-Paar + `x-default` auf `/`** wechselseitig verknüpft
  (FR-011-02). **Kein Server-Redirect.**
- **Erstbesuch-Logik (client-seitig, kein Server):** Ruft eine Nutzer:in `/` **ohne gespeicherte
  Wahl** auf und ist die **Browser-Sprache EN**, erfolgt ein **client-seitiger Redirect nach
  `/en`**; sonst bleibt `/` (Deutsch als Fallback, FR-010-01/05). Eine **gespeicherte Wahl
  (localStorage) gewinnt** immer über die Browser-Ableitung (FR-010-03).
- **Der Sprach-Toggle navigiert zwischen den Sprach-URLs** (`/` ⇄ `/en`) und persistiert die Wahl;
  die URL bleibt die maßgebliche Quelle der aktiven Sprache (FR-010-02/04).
- **Eine scroll-getragene Hauptroute** je Sprache (`/`, `/en`) trägt die gesamte Journey
  (Hero → … → Kontakt).
- Das **Referenz-Detail ist eine URL-synchronisierte Modal-Route** **unter beiden Sprachpräfixen**
  (z. B. `/ref/<id>` bzw. `/en/ref/<id>` — konkrete Form in der Umsetzung): Aufruf der URL lädt die
  Seite mit direkt geöffnetem Modal; **Browser-Zurück schließt** das Modal und kehrt zur Galerie
  zurück, ohne Seitenwechsel (FR-006-02/03/04). Ein Deep-Link auf eine unbekannte Referenz-ID fällt
  definiert auf die Galerie ohne offenes Modal zurück (FR-006, Edge Case).
- **Impressum/Datenschutz** (FEAT-012) sind eigene, verlinkte Routen **ebenfalls unter beiden
  Sprachpräfixen** (`/impressum`, `/en/impressum` usw.).
- **React Router** ist der Routing-Mechanismus (Teil des vorgeschriebenen Stacks).

### State-Management
- **TanStack Query** für alle asynchronen Ränder (Function-Aufrufe: Kontakt/Relay, später
  Chat-LLM) und **lokaler Komponenten-State** (Hooks) für UI-Zustand. **Kein globaler Store**
  (kein Redux/Zustand) — der Zustandsbedarf ist gering (Sprache, offenes Modal, Chat-Verlauf) und
  wird lokal bzw. über URL/localStorage gehalten.

### List → Detail Interaktionsmodell
- **Modal**, responsiv: auf kleinen Viewports **Vollbild** (mit Scroll), auf großen Viewports ein
  **großzügiges zentriertes Modal** (FR-006-02). Tastatur-vollständig, Fokus-Falle im Modal,
  Fokus-Rückgabe beim Schließen (NFR-CC-01).

### Internationalisierung (i18n)
- Eine **i18n-Bibliothek** (z. B. i18next/react-i18next — Feinauswahl in der Umsetzung) mit
  **localStorage-Persistenz** der Sprachwahl über Reload/Wiederkehr (FR-010-03) und
  **Browser-Sprach-Default**, der auf **Deutsch** zurückfällt, wenn die Locale nicht bestimmbar/
  unterstützt ist (FR-010-01/05). Manuelle Wahl überschreibt die Ableitung und wird persistiert.
  Eigennamen werden nicht übersetzt (FR-CC-01). Die **aktive Sprache folgt der URL** (siehe
  „Routing & Sprach-URLs"); localStorage steuert die Erstbesuch-Weiche auf `/` und überlebt
  Reload/Wiederkehr.

### Visualisierung / Charting
- **d3** ist die Visualisierungs-Wahl für die zwei individuellen Visuals: **Kompetenz-Band**
  (gewelltes Band, Bandstärke = Tiefe, durchfließender KI-Layer; FEAT-004) und
  **Evolution-Faden** (FEAT-007). Beide werden **lazy geladen** (dynamischer Import), damit sie
  nicht ins Initial-Bundle fallen (NFR-CC-02). Jedes animierte Visual hat einen gleichwertigen
  statischen Endzustand für `prefers-reduced-motion` (NFR-CC-01).

### Prerender & SEO/AEO
- **Build-Zeit-Prerender beider Sprachfassungen** (DE/EN), sodass der Kerninhalt **ohne
  Client-Skript-Ausführung** crawlbar ist (FR-011-01), wechselseitig per **hreflang** verknüpft
  (FR-011-02). `sitemap.xml`, `robots.txt`, OG-Image und `llms.txt` gehören zum Build-Output
  (FEAT-011).

## NFR-Verankerung (technische Entscheidungen)

- **Initial-JS < 200 KB gz / LCP < 2,0 s / CLS < 0,1 / Lighthouse mobil ≥ 90 (NFR-CC-02):**
  Lazy-Loading der d3-Visuals und des Chats (Code-Splitting), Prerender für schnellen First
  Paint, **self-hosted, subgesetzte Fonts** (kein Google-CDN — zugleich DSGVO-konform, NFR-CC-05),
  reservierte Layout-Boxen für Bilder/Visuals gegen CLS.
- **WCAG 2.2 AA / Tastatur / reduced-motion (NFR-CC-01):** vollständige Tastaturbedienung, sichtbarer
  Fokus-Ring, dekorative Linien für Hilfstechnik ausgeblendet, statische Paritätszustände zu jeder
  Animation.
- **Responsivität 360 px–WQHD, Content-Max ~1500 px (NFR-CC-04):** responsive Layouts;
  Kompetenz-Band Desktop horizontal / mobil vertikal mit inhaltlicher Parität (FR-004-05).

## Konsequenzen

- **Positiv:** kein globaler-Store-Overhead; teilbare Deep-Links „gratis" über die Router-Route;
  Budgets durch Splitting/Prerender/self-hosted-Fonts strukturell erreichbar.
- **Negativ / Grenze:** Prerender beider Sprachen verlangt Build-Zeit-Rendering-Setup; d3
  lazy-zu-laden bedeutet eine sichtbare (kurze) Nachlade-Phase für die Visuals — mit Skeleton/
  statischem Fallback abzufedern.
- **Design-Grenze:** konkrete Motion-/Visual-Ausgestaltung und Font-Feinauswahl sind `/design`.
