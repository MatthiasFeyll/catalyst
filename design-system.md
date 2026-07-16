# Design-System — catalyst

> Design-Baseline der Personal Page `matthias-feyll.de` (4. Generation). Autor: `/design`
> (ui-ux-Subagent, frontend-design-Craft). Bindend gegenüber allen tieferen Artefakten
> (Artefakt-Präzedenz). Änderungen nach Freeze nur via `/design`-Re-Entry.
>
> **Brand-Abweichung (owner-approved, Discovery A5):** catalyst nutzt **NICHT** die
> Commerz-Real-Corporate-Brand. Dies ist eine private Personal Page mit eigener **Personal
> Brand**. Das `assets/CommerzReal_logo.png` bleibt ausschließlich als **Arbeitgeber-Logo** in
> der Karriere-Timeline (FEAT-003) erhalten. Der **WCAG-2.2-AA-Floor gilt unverändert**.
>
> **Meilenstein-1:** nur **Light-Theme** (kein Dark Mode; `tokens.dark.json` bleibt in M1 ungenutzt,
> Discovery G4). Konkrete Umsetzung der Tokens erfolgt durch `implementation` in
> `services/frontend/**` (nicht mein Write-Scope) — dieses Dokument **committet die Werte + Intent**
> und `services/frontend/tokens.json` ist die maschinenlesbare Quelle der Wahrheit (DTCG, ADR-0010/
> -0029). Ich schreibe **keine** konkurrierende Hand-Mappings, sondern lege Werte + Absicht fest.

---

## 0. Design-Thinking (Craft-Grundlage)

- **Purpose.** Bewerbungswerkzeug **und** Exponat zugleich: die erste vollständig KI-geschriebene
  Generation, die das, was sie behauptet, selbst verkörpert. In ~5 s Klarheit für HR (P1); Tiefe
  und Belohnung für Technik-Leser:innen (P2) dahinter.
- **Audience.** P1 HR-Recruiter:in (primär, nicht-technisch, erwartet weiß/professionell/modern);
  P2 Informatiker:in / Tech-Interviewer:in (sekundär, will Links, Referenz-Tiefe, Terminal-Egg).
- **Tone / gewählte Ästhetik.** **Refined-technical Minimalismus mit Plotter-/Schaltplan-Motiv.**
  Weißer, luftiger Grund; Fast-Schwarz-Tinte; **Elektroblau** als einziger, scharfer Akzent.
  Referenz-Bilder: Oszilloskop-Spur, Vektor-Plotter-Zeichnung, feine Leiterbahnen/Netzpfade, ein
  technischer CAD-Riss — **präzise, ingenieurhaft, aber menschlich** (Du-Ansprache, Ich-Perspektive).
  „Less is more": wenig Text, viel Weißraum, ein einziges, konsequent durchgezogenes Gestaltungsmittel.
- **Differentiation — das Unvergessliche: „die durchgehende Linie".** Eine einzige, feine, sich
  **selbst zeichnende Linie** ist das verbindende Gewebe der ganzen Seite. Sie tritt auf als:
  gezeichneter **„Matthias"-Namenszug** (animierter SVG-Stroke, Plotter-/Oszilloskop-Ästhetik —
  **ausdrücklich KEINE Handschrift/Papier-Optik, kein Bild der echten Unterschrift**), als
  **Timeline-Rückgrat**, als gewelltes **Kompetenz-Band** (mit dem KI-Gradient, der hindurchfließt),
  als **Generationen-Faden** der Evolution-Story und als feine, parallax-getragene
  **Hintergrund-Leiterbahnen**. Ein Motiv, eine Sprache, überall wiedererkennbar. **Keine
  Partikel-Effekte** (löst den median-`tsparticles`-Ansatz ab).

Diese Ästhetik ist die committete Richtung. Der frontend-design-Craft wird eingesetzt, um **diese**
Personal Brand als raffiniertes, distinktes System zu rendern — nicht, um off-brand Fonts/Farben
oder etwas gegen den A11y-Floor einzuführen.

---

## 1. Farb-Tokens

Weiß-Grund · Fast-Schwarz-Tinte · **Elektroblau** als einzige Akzentfarbe. Einziger erlaubter
**Verlauf**: der KI-Gradient-Layer im Kompetenz-Band (FR-004-03) — nirgends sonst.

### 1.1 Kern-Tokens (shadcn-Set → `tokens.json`)

Werte sind als `hsl(<h> <s>% <l>%)` committet (DTCG-Konvention der `tokens.json`). `implementation`
setzt diese Werte in `services/frontend/tokens.json`; Style Dictionary generiert die
`hsl(var(--token))`-Ebene (unveränderte Tailwind-Bindung, ADR-0010).

| Token | Rolle | HSL | ≈ Hex | Kontrast / Notiz |
|-------|-------|-----|-------|------------------|
| `background` | **Canvas / Paper** (kühles Off-White) | `hsl(214 32% 96%)` | #F0F3F7 | echter Schritt unter Card-Weiß (fw-ADR-0040): Cards heben sich ab |
| `foreground` | **Tinte** (Fast-Schwarz, kühl) | `hsl(222 30% 12%)` | #15181F | auf Weiß **18,3:1** (AAA); auf Canvas ~16,7:1 |
| `card` / `popover` | Karten-/Overlay-Fläche | `hsl(0 0% 100%)` | #FFFFFF | reines Weiß — die gehobene Ebene |
| `card-foreground` / `popover-foreground` | Text auf Card | `hsl(222 30% 12%)` | #15181F | wie `foreground` |
| `primary` | **Elektroblau** (CTA-Fill, Links, Fokus-Herkunft) | `hsl(223 90% 53%)` | #1B58F3 | auf Weiß **5,59:1** (AA Text); auf Canvas 5,08:1 (AA) |
| `primary-foreground` | Text auf Elektroblau-Fill | `hsl(0 0% 100%)` | #FFFFFF | weiß auf #1B58F3 = **5,59:1** (AA CTA-Label) |
| `secondary` | neutraler Fill (secondary-Button, Chips) | `hsl(214 32% 94%)` | #E9EDF3 | Träger-Fläche; Text darauf = `foreground` |
| `secondary-foreground` | Text auf secondary | `hsl(222 30% 12%)` | #15181F | hoher Kontrast |
| `muted` | gedämpfte Fläche (Skeleton, Hover-Wash neutral) | `hsl(214 32% 94%)` | #E9EDF3 | — |
| `muted-foreground` | **Sekundär-Text** (Meta, Caption, Timestamp, Helper) | `hsl(220 14% 38%)` | #545A66 | auf Weiß **6,9:1**, auf Canvas **6,25:1** — AA-Text auf beiden ✓ |
| `accent` | subtiler Hover-/Selected-**Wash** (Elektro-Tint) | `hsl(222 100% 97%)` | #F0F4FF | **nur Fläche**, nie Text |
| `accent-foreground` | Text auf dem Elektro-Wash | `hsl(224 78% 43%)` | #1846C3 | auf #F0F4FF **7,3:1** (AA) |
| `destructive` | Fehler/Retry | `hsl(0 68% 45%)` | #C22B2B | auf Weiß **5,7:1** (AA Text) |
| `destructive-foreground` | Text auf destructive-Fill | `hsl(0 0% 100%)` | #FFFFFF | — |
| `border` | Card-/Divider-Rahmen (dekorativ) | `hsl(214 22% 80%)` | #C2CBD8 | echter Rahmen-Schritt (fw-ADR-0040), Tiefe zusätzlich via `shadow-card` + Canvas-Schritt |
| `input` | **Formular-/Control-Rahmen** | `hsl(216 16% 56%)` | #7E8A9D | vs. Weiß **3,3:1** — erfüllt WCAG 1.4.11 (UI-Komponenten-Grenze) ✓ |
| `ring` | **Fokus-Ring** (Elektroblau) | `hsl(223 90% 53%)` | #1B58F3 | 5,59:1 (weit über den 3:1 für 1.4.11); Technik: 2 px Ring + 2 px weißer Offset (auf Weiß **und** auf Elektro-Fill sichtbar) |

### 1.2 Radius

| Token | Wert | Nutzung |
|-------|------|---------|
| `radius` | `0.5rem` (8 px) | Cards/Buttons (`lg`); `md`=6 px, `sm`=4 px abgeleitet |
| — (Komponenten-Detail) | `2px` | Mono-Chips/`CrTag`/`kbd` — technischer, scharfer Look |
| — (Komponenten-Detail) | `12px` | `CrRefModal` groß, `CrMuseumFrame` |

### 1.3 Brand-Erweiterungs-Tokens (über das shadcn-Set hinaus)

`implementation` ergänzt diese in `tokens.json` (bzw. als CSS-Variablen im generierten Layer) und
im Tailwind-Theme. Sie tragen das Linien-Motiv, die Viz und den einzigen Gradient.

| Token | Wert | Rolle |
|-------|------|-------|
| `ink` | = `foreground` `hsl(222 30% 12%)` | Default-Stroke der gezeichneten Linien, Timeline-Rückgrat, Namenszug-Ruhefarbe |
| `electric` | = `primary` `hsl(223 90% 53%)` | aktive Linien-Draws, Signatur-Highlight, aktive Zustände |
| `line-faint` | `hsl(214 22% 90%)` | **dekorative** Hintergrund-Leiterbahnen/Netzpfade — **rein dekorativ, `aria-hidden`, nie bedeutungstragend** (1.4.3/1.4.11-Ausnahme greift) |
| `ki-gradient-from` | `hsl(223 90% 53%)` #1B58F3 | KI-Layer Start (Elektroblau) |
| `ki-gradient-mid` | `hsl(211 92% 55%)` #2597F0 | KI-Layer Mitte |
| `ki-gradient-to` | `hsl(199 92% 56%)` #24B4EE | KI-Layer Ende (Elektro-Cyan) — **Blau→Cyan, bleibt in der Blau-Familie** (kein Purple-Cliché) |
| `chart-band` | `hsl(222 16% 30%)` #40465A | Grundkörper des Kompetenz-Bands (Graphit, damit der KI-Gradient darauf liest) |
| `chart-ki` | = `electric` | KI-Faden im Band / durchfließender Akzent |
| `chart-series-1` | `hsl(223 90% 53%)` #1B58F3 | Disziplin **Frontend** (Legenden-/Detailspalten-Tick) |
| `chart-series-2` | `hsl(211 55% 40%)` #2E6199 | Disziplin **Backend** |
| `chart-series-3` | `hsl(222 24% 26%)` #33384F | Disziplin **Architektur** |
| `chart-series-4` | `hsl(199 68% 42%)` #227FB4 | Disziplin **DevOps/Cloud** |

> **Chart-Farb-Regel (fw-Checkliste):** Series-/Band-/KI-Farben binden **ausschließlich** an diese
> Tokens (`--chart-*`, `--ki-gradient-*`), **nie** hartkodiertes Hex in d3-Code. Alle Serien liegen
> in der Blau/Ink-Familie (kohärent, kein Off-Brand-Ton). Für **graphische** Objekte (Bandsegmente)
> gilt ≥3:1 gegen Weiß (1.4.11); **Labels** werden in `foreground`/`muted-foreground` gesetzt, nicht
> in den Serienfarben — so bleibt die AA-Text-Regel gewahrt.

### 1.4 Elevation / Oberflächen-Tiefe (fw-ADR-0040)

Cards/Panels müssen als **distinkte Ebenen** lesen, nicht als eine flache Fläche. Multi-Signal-Tiefe:
**(a)** Canvas #F0F3F7 ist ein echter Schritt unter Card-Weiß, **(b)** `border` #C2CBD8 ist ein echter
Rahmen-Schritt (kein Sub-Pixel-Hairline), **(c)** die framework-eigene `shadow-*`-Skala.

| Utility | Wert (literal, aus Scaffold-Theme) | Nutzung |
|---------|-----------------------------------|---------|
| `shadow-card` | `0 1px 2px rgba(16,24,40,.06), 0 2px 8px rgba(16,24,40,.08)` | Ruhe-Elevation aller Cards (`CrRefCard`, Verantwortung, Timeline-Station, Chat-Panel) |
| `shadow-raised` | `0 4px 14px rgba(16,24,40,.10), 0 2px 6px rgba(16,24,40,.06)` | Hover-Elevation (Card lift), CTA-Hover |
| `shadow-overlay` | `0 12px 32px rgba(16,24,40,.16), 0 4px 12px rgba(16,24,40,.10)` | `CrRefModal`, `CrNav` (scrolled), Chat-Popover |

> **Footgun (verbindlich):** Elevation bindet **nur** über die benannten Utilities
> (`shadow-card`/`shadow-raised`/`shadow-overlay`) oder einen neuen benannten Step in
> `tailwind.config.ts`. **Nie** eine `shadow-[var(--x)]`-Arbitrary-Klasse — Tailwind kompiliert das
> als Shadow-**Farbe** (`--tw-shadow-color`) und rendert **gar keinen** Box-Shadow. Dark-Mode müsste
> die `--shadow-*` in der Dark-Ebene neu tunen (in M1 nicht relevant, Light-only).

> **Warum trotz „less is more" ein sichtbarer Canvas-Schritt?** Der fw-ADR-0040-Konflikt (weiß-auf-weiß
> kollabiert auf großen Displays) ist real. Auflösung: die **primäre** Tiefe trägt das **Linien-Motiv**
> + der restrained Shadow; der Canvas-Schritt ist bewusst leicht (#F0F3F7), liest weiterhin als
> „weiße, professionelle Seite", ist aber messbar ein Schritt (~4 % L + Sättigung) — keine
> sub-perzeptuelle Hairline-Falle.

---

## 2. Typografie

**Self-hosted, WOFF2, subgesetzt (Latin + Latin-Extended-A → deckt ä ö ü ß + Sprachnamen), kein
Google-Fonts-CDN (DSGVO, NFR-CC-05 / ADR-0005).** `font-display: swap`; Preload nur der kritischen
Schnitte (Cabinet Grotesk Bold für Hero, General Sans Regular für Body). **Kein
Inter/Roboto/Arial/System-UI/Space Grotesk.**

### 2.1 Font-Wahl (committet)

| Rolle | Font | Bezug / Lizenz | Schnitte | Einsatz |
|-------|------|----------------|----------|---------|
| **Display** | **Cabinet Grotesk** | Fontshare (ITF), self-hostable | 500 / 700 / 800 | Hero-Pitch, Sektions-Titel, große Zahlen-Statements — trägt den **Charakter/Erinnerungswert** |
| **Body / UI** | **General Sans** | Fontshare (ITF), self-hostable | 400 / 500 / 600 | Fließtext, Cards, Formular, Chat, Nav — der **professionelle, hoch-lesbare** Workhorse |
| **Mono / Akzent** | **JetBrains Mono** | OFL, self-hostable | 400 / 500 / 700 | Eyebrows/Labels, Stack-Tags, Timeline-Daten, Zahlen-Stats, `CrTerminalEgg`, `kbd`, Code |

**Begründung.** Cabinet Grotesk (charaktervolle Geometric-Grotesk, distinkte Details) + General Sans
(neutral-warmer, sehr legibler Grotesk derselben Foundry) sind ein raffiniertes Display/Body-Paar:
Charakter oben, professionelle Ruhe im Fließtext — genau der Spagat HR-tauglich × einprägsam.
JetBrains Mono ist die entwickler-native Mono und trägt die Linux-/Terminal-Identität (P2, FR-004-07,
FEAT-013). **Ligaturen aus** für Labels/Tags (`font-variant-ligatures: none`), **an** nur im
`CrTerminalEgg`.

### 2.2 Typo-Skala (fluid, 360 px → WQHD)

| Stufe | Font / Weight | Größe (clamp) | Leading | Tracking | Einsatz |
|-------|---------------|---------------|---------|----------|---------|
| Display XL | Cabinet 800 | `clamp(2.5rem, 6vw, 4.5rem)` | 1.02 | -0.02em | Hero-Keyword/Pitch |
| Display L | Cabinet 700 | `clamp(1.75rem, 3.5vw, 2.75rem)` | 1.08 | -0.01em | Sektions-Titel |
| Heading M | Cabinet 600 / GS 600 | `1.25rem` | 1.2 | 0 | Card-Titel, Modal-Titel |
| Body L (Lead) | General Sans 400 | `1.125rem` | 1.6 | 0 | Lead-Absätze |
| Body M | General Sans 400 | `1rem` | 1.6 | 0 | Standard-Fließtext |
| Body S | General Sans 400/500 | `0.875rem` | 1.5 | 0 | Meta/Caption (`muted-foreground`) |
| Eyebrow (Kicker) | JetBrains Mono 500 | `0.75rem` | 1.2 | 0.12em, UPPERCASE | Sektions-Kicker (`muted-foreground`/`electric`) |
| Tag / Mono-Label | JetBrains Mono 400 | `0.8125rem` | 1.3 | 0.01em | Stack-Tags, Timeline-Daten |
| Terminal | JetBrains Mono 400 | `0.875rem` | 1.5 | 0 | `CrTerminalEgg`, `kbd` |

### 2.3 Lesemaß (fw-ADR-0040)

- **Content-Container:** `max-w-content` — **Ziel ~1500 px** (NFR-CC-04). Das Scaffold-Theme setzt
  `maxWidth.content = 1200px`; **`implementation` erhöht auf ~1500 px** (oder ergänzt `max-w-wide:
  1500px`). Grids/Galerie/Band nutzen die volle Content-Breite.
- **Fließtext:** laufende Prosa wird auf **~65–75 ch** gekappt (`max-w-prose`), damit Text auf
  großen Displays **nie** die volle Breite spannt (WQHD-„Flach/Leer"-Tell vermeiden).
- **Dekoratives Linien-Motiv + Parallax** dürfen **full-bleed** über die Content-Breite hinaus
  (NFR-CC-04, H3) — sie sind `aria-hidden` und tragen keine Information.

---

## 3. Raster, Raum & Breakpoints

### 3.1 Breakpoints (Projekt, 360 px → WQHD, NFR-CC-04)

| Name | min-width | Zweck |
|------|-----------|-------|
| base | 360 px | Smallest supported; alles lesbar, kein H-Scroll |
| sm | 480 px | große Phones |
| md | 768 px | Tablet — Band-Umbruch horizontal↔vertikal-Grenze |
| lg | 1024 px | Desktop — iframe-Museum, mehrspaltige Galerie |
| xl | 1280 px | großer Desktop |
| 2xl | 1536 px | Content-Cap greift (~1500 px), Motiv full-bleed darüber |

**Deterministische Test-Viewports (für die rendered/a11y-Journeys):** 360 · 768 · 1024 · 1440 · **2560
(WQHD)**. Prüfziel: kein horizontaler Scroll, Content-Cap hält, Linien-Motiv bleibt full-bleed ohne
Text-Drift.

### 3.2 Spacing & Sektions-Rhythmus

- **8-px-Basisraster** (Tailwind-Default-Skala). Komponenten-Innenabstände in 4/8/12/16/24.
- **Sektions-Vertikalrhythmus großzügig** (less is more): Section-Padding-Block
  `clamp(4rem, 10vh, 8rem)`; Sektions-Trenner ist eine **gezeichnete Linie**, kein harter Block.
- **Weißraum ist ein aktives Element** — jede Sektion hat einen klaren „ein Ding pro Screen"-Fokus
  (Reduktion kognitiver Last).

---

## 4. Ikonografie & Visualisierung

### 4.1 Ikonografie — **Lucide** (ADR-0010)

**SVG, nie Emoji als Icon.** Kern-Set (Auswahl): `menu`, `x`, `arrow-down` (Scroll-Hinweis),
`arrow-up-right` (externer Link), `chevron-down` (Aufklappen), `github`, `gitlab`, `linkedin`,
`mail`, `send`, `terminal`, `languages`/`globe` (Lang-Toggle), `map-pin` (Reisen — **ohne** konkrete
Adresse), `music` (Band), `server` (NAS/Smart Home), `graduation-cap` (Bildung), `briefcase` (Beruf),
`external-link`, `check`, `alert-circle` (Fehler), `loader` (Lade-Spinner mit reduced-motion-Fallback).
Icons erben Textfarbe; dekorative Icons `aria-hidden`, bedeutungstragende bekommen `aria-label`.

### 4.2 Charting/Viz — **d3** (ADR-0005, lazy-geladen)

Zwei individuelle Visuals, beide **dynamisch importiert** (nicht im Initial-Bundle, NFR-CC-02), beide
mit gleichwertigem **statischem End-/Parität-Zustand** für `prefers-reduced-motion` (NFR-CC-01).

**A) Kompetenz-Band (`CrSpektrumBand`, FEAT-004).**
- **Ein durchgehendes, gewelltes Band** (eine d3-Fläche/`path`) spannt über die vier Disziplinen
  **Frontend · Backend · Architektur · DevOps/Cloud** in dieser Reihenfolge (FR-004-01). Kein
  Spezialisten-Silo — eine Linie, alle Disziplinen (Generalisten-Narrativ).
- **Bandstärke = Erfahrungstiefe** je Disziplin (FR-004-02): die Wellen-Amplitude/Bandhöhe
  variiert je Zone.
- **KI-Layer (`chart-ki` → KI-Gradient) fließt als durchgehender Faden** über die gesamte Länge
  **durch** das Band (FR-004-03) — **kein eigener Abschnitt**, sondern ein durchlaufender
  Gradient-Overlay auf/entlang des Bands, der sichtbar macht: KI durchdringt **alle** Disziplinen.
- **Desktop horizontal / Mobil vertikal** (FR-004-05, E1c) mit **inhaltlicher Parität**.
- **Klick/Tap auf eine Disziplin-Zone** öffnet die **Detail-Spalten** darunter (Desktop) bzw. den
  **mobilen Aufklapper** unter dem Abschnitt (FR-004-04). Tastatur: jede Zone fokussier- und
  aufklappbar (`aria-expanded`).
- **Linux/Terminal-Affinität** (FR-004-07) sitzt unter „DevOps/Cloud" bzw. als eigener
  Mono-Prompt-Marker (`matthias@linux:~$`) im Detail — Copy **nicht** wörtlich „Das Terminal ist
  meine Heimat" (I3).
- **Keine Verlinkung** von Disziplinen auf Referenzen (FR-004-06, Dead-Links-Vermeidung).

**B) Evolution-Faden (`CrEvolutionThread`, FEAT-007).** Eine durchgehende, sich zeichnende Linie
verbindet die vier Generationen-Knoten lookup → lookdown → median → **catalyst**; jeder Knoten
hostet einen `CrMuseumFrame`. Reduced-motion: Faden sofort vollständig gezeichnet.

---

## 5. Motion-Spezifikation (G5)

Custom-Easing `cubic-bezier(0.22, 1, 0.36, 1)` (refined ease-out). Mikro-Transitions **150–300 ms**.
**Zu jedem Motion-Element existiert die vollständige `prefers-reduced-motion`-Parität — kein
Informationsverlust** (NFR-CC-01, verbindlich).

| Motion-Element | Verhalten (Motion an) | `prefers-reduced-motion` (Parität) |
|----------------|-----------------------|------------------------------------|
| **Orchestrierter Page-Load** | Gestaffelte Reveals (`animation-delay`): 1) Namenszug zeichnet sich (SVG `stroke-dashoffset`, ~1,4–1,8 s, Plotter-Ästhetik), 2) Pitch steigt/faded ein, 3) Scroll-Hinweis zuletzt | Namenszug **sofort** im fertigen Endzustand; Pitch/Hinweis **sofort** sichtbar; keine Staffelung (FR-001-03/-05) |
| **Scroll-Linien-Draws je Sektion** | IntersectionObserver: die Sektions-Linie (Kicker-Underline, Timeline-Rückgrat, Band, Faden) zeichnet sich **einmalig** beim ersten Sichtbarwerden | Linien **sofort gezeichnet** dargestellt; Inhalt identisch |
| **Mikro-Hover** | Link-Underline zeichnet sich; Card-Lift (`shadow-card`→`shadow-raised`, `translateY(-2px)`); Tag-Border → `electric` | **kein Transform**; nur Farb-/Opacity-/Border-Wechsel (statische Rückmeldung) |
| **Leichtes Parallax der Hintergrund-Linien** | `CrLineBackground` translatiert bei Scroll mit ~0,15–0,3× (dezent, full-bleed) | **kein Parallax** — statische Linien-Ebene |
| **Band / Faden (d3)** | Wellen zeichnen sich, KI-Gradient „fließt" (langsame, dezente Verschiebung) | statisches End-Band mit statischem KI-Gradient; Aufklapper funktioniert weiter |
| **Chat-Reveal** | Erstnachricht + Antwortkarten faden/steigen gestaffelt ein | sofortiges Erscheinen |
| **`CrTerminalEgg`-Cursor / Spinner** | blinkender Cursor, Lade-Spin | Cursor statisch sichtbar; Spinner → statischer „lädt…"-Text |

**Budget-Disziplin:** ein gut orchestrierter Page-Load + Scroll-Draws > verstreute Mikro-Effekte;
schwere Visuals (Band, Chat) lazy (NFR-CC-02). Namenszug/Pitch sind **text-first** und **nicht**
von der Animation abhängig (FR-001-05).

---

## 6. `Cr*`-Komponenten (Kontrakt für die deliverable React-Library)

Brand-Komponenten **über shadcn/ui-Primitive (Radix)**. Jede Komponente ist zu bauen **und** über
die Design-Tokens/Tailwind-Theme zu themen (keine hartkodierten Hex). Zustände umfassen jeweils
default/hover/focus/active/disabled/loading/error/empty/fallback, wo zutreffend.

| Komponente | Zweck | Zustände (inkl. Fehler/Leer/Fallback) | FR-Trace |
|------------|-------|----------------------------------------|----------|
| **CrNav** | Sticky Top-Nav / Scroll-Spy; hostet `CrLangToggle` + Sektions-Anker + **eine** primäre CTA „Kontakt" | default (transparent über Hero) · scrolled (kondensiert, `shadow-overlay`) · section-active (Anker markiert) · mobile (Hamburger → Radix-Sheet) · focus-visible je Item | Navigation, FR-010 (Toggle-Host), 2.4.11 (Fokus nicht verdeckt) |
| **CrLineBackground** | Full-bleed dekorative Leiterbahnen/Netzpfade auf Weiß, leichtes Parallax | motion · reduced-motion (statisch) · immer `aria-hidden` | Leitmotiv, NFR-CC-01/-04 |
| **CrHero** | Above-the-fold: gezeichneter Namenszug + Pitch + Scroll-Hinweis | draw (motion) · static (reduced-motion) · loaded · 360 px (kein Overflow) | FEAT-001 (FR-001-01…05) |
| **CrSectionHeader** | Mono-Eyebrow + Display-Titel + gezeichnete Underline | default · in-view (Underline-Draw) · reduced-motion | Querschnitt |
| **CrTimeline** | Verwobene Berufs-+Bildungs-Timeline; die **Linie** ist das Rückgrat | default · Station-hover · Station **mit** Referenz (Link-Affordanz) vs. **ohne** (keine Affordanz) · Logo vorhanden vs. **Text-Fallback (h_da)** · mobile gestapelt | FEAT-003 (FR-003-01…06) |
| **CrSpektrumBand** | d3-Wellen-Band, Disziplinen + KI-Gradient-Faden | loading-Skeleton (lazy) · interaktiv (Zone-hover/-focus) · expanded (Detail-Spalten/Aufklapper) · desktop-horizontal / mobil-vertikal · reduced-motion (statisch) | FEAT-004 (FR-004-01…07) |
| **CrRefCard** | Referenz-Galerie-Karte: Visual · Kontext (2–3 Sätze) · Rolle · Stack-Tags · optionaler Link | default · hover (lift) · focus · **kein-Link** (keine tote Affordanz) · **abstraktes Visual** (PromotionPlanner, keine Screenshots) | FEAT-006 (FR-006-01/06/10) |
| **CrRefModal** | URL-synchronisiertes Detail-Modal (List→Detail); klein=Vollbild, groß=großzügig zentriert | opening · open (Fokus-Falle) · closing (Fokus-Rückgabe) · loading · **not-found** (unbekannte ID → Galerie, kein Fehler) · Browser-Zurück schließt | FEAT-006 (FR-006-02/03/04), ADR-0005 |
| **CrMuseumFrame** | iframe-„Museums-Rahmen" (Desktop) + Screenshot-Fallback | live-iframe · loading (Skeleton) · **unreachable/App-down → Screenshot** · **framing-verweigert (X-Frame-Options/CSP `frame-ancestors`) → Screenshot** (Erkennung per Lade-Timeout-Heuristik, Skeleton→Screenshot ohne Fehler-Flackern, RV-08) · **keine URL → Screenshot** · mobile → Screenshot-Galerie + „in neuem Tab öffnen" | FEAT-007 (FR-007-02/03/04), RV-08 |
| **CrEvolutionThread** | Generationen-Faden, hostet je Knoten `CrMuseumFrame` | default · Knoten-active · reduced-motion (Faden statisch) | FEAT-007 (FR-007-01/05) |
| **CrResponsibilityCard** | Verantwortungs-/Wissensweitergabe-Karte (4–6) | default · hover · focus; **nur belegbare** Karten (nie mit weichen Claims auffüllen) | FEAT-005 (FR-005-01/02) |
| **CrChat** | Geführter Signature-Chat: persönliche Erstnachricht, vordefinierte Fragen (Chips), kuratierte Antwortkarten, Relay-Aktion mit E-Mail-Feld; **kein Freitextfeld in M1**; **kein Servicebot-Look** | intro (Erstnachricht) · idle (Fragen-Chips) · question-selected · answering (gestaffelter Reveal) · relay-prompt · relay-email-input · relay-sending · relay-success · relay-error (Retry) · **degraded** (Cap/Offline → geführter Fallback-Banner) | FEAT-008 (FR-008-01/02/03/04), FEAT-009 (Relay) |
| **CrLangToggle** | DE/EN-Umschalter — **navigiert zwischen den Sprach-URLs** (`/` ⇄ `/en`, URL = Source of Truth, RV-03); persistiert Wahl in localStorage | DE-active (`/`) · EN-active (`/en`) · focus (`aria-current`/`aria-pressed`) · Deep-Link-Pfad bleibt beim Umschalten erhalten | FEAT-010 (FR-010-02/04), RV-03 |
| **CrContactForm** | Lean-Formular (Name, E-Mail, Nachricht) + unsichtbarer Honeypot | idle · validating · sending · success (Inline-Bestätigung) · error (Inline-Retry, Eingaben erhalten) · rate-limited (freundlicher Hinweis) | FEAT-009 (FR-009-01/04/06) |
| **CrProfileLinks** | GitHub · GitLab · LinkedIn (bedingt) | vollständig · **LinkedIn fehlt → Link entfällt** (kein Dead Link) | FEAT-009 (FR-009-08) |
| **CrFooter** | Footer: Impressum-/Datenschutz-Links, **öffentliches Repo**-Link, Profil-Links | default · focus je Link | FEAT-012 (Links), FEAT-007 (Repo), FEAT-009 (Links) |
| **CrTerminalEgg** | Verstecktes Terminal (`help`, `whoami`, `skills`, `contact`) + Konsolen-Gruß | hidden · open · command · **unknown-command → Verweis auf `help`** · reduced-motion (Cursor statisch) · Touch (kein Hover-Zwang) | FEAT-013 (FR-013-01/02/03/04) |
| **CrButton** / **CrIconButton** | Aktions-Primitive; **primary=Elektroblau-Fill** (workflow-treibend), **secondary=Ink-Outline**, **ghost** | default · hover (`shadow-raised`) · focus (Elektro-Ring) · active · disabled · loading | Aktions-Hierarchie |
| **CrTag** | Mono-Stack-Tag-Chip (2 px Radius) | default · hover (Border→electric) | FEAT-006 |
| **CrStat** | Mono-Zahl-Statement (35 Tage / 13 Länder / 30 Shows) | default · in-view (Count/Reveal) · reduced-motion (Zahl sofort) | FEAT-002 |
| **CrPortrait** | Porträt mit Platzhalter-/Leer-Handling | Bild vorhanden · **helles Porträt fehlt → dunkles median-Foto** · **kein Bild → definierter Leer-Zustand** (kein defektes Bild, Layout bricht nicht) | FEAT-002 (FR-002-05/06) |

> **State-Management (ADR-0005):** TanStack Query für asynchrone Ränder (Function-Aufrufe:
> Kontakt/Relay, später Chat-LLM); **lokaler Komponenten-State** für UI-Zustand; offenes Modal +
> Sprache über **URL bzw. localStorage**. Kein globaler Store.

---

## 7. Aktions- & CTA-Hierarchie (fw-ADR-0040)

- **Eine primäre CTA pro Screen/Sektion.** Der Elektroblau-**Fill** (`primary`) ist **reserviert für
  die workflow-treibende Aktion** (Kontakt aufnehmen / Nachricht senden / Chat starten / Relay
  senden). Utility-/Sekundär-Aktionen („in neuem Tab öffnen", Sprache, Galerie-Filter) sind
  **Ink-Outline** oder **ghost** — **nie** Elektro-Fill. Eine Sektion, deren lautester Button eine
  Sekundär-Aktion ist, ist ein Defekt (invertierte Hierarchie).
- **Elektroblau-Regel (Motiv vs. Aktion):** Elektro-**Fill** = die eine Aktion; Elektro-**Stroke**
  (feine gezeichnete Linie, Signatur, KI-Faden) = **Brand-Motiv** (dekorativ, `aria-hidden`). Der
  `reviewer` prüft: **nicht mehr als ein** Elektro-gefüllter Primär-Button je Viewport.

---

## 8. Accessibility-Baseline (WCAG 2.2 AA / NFR-CC-01, verbindlich)

- **Kontrast (§1.4.3/1.4.11):** alle in Nutzung befindlichen Token-Paare erfüllen AA — Belege in
  §1.1: `foreground` 18,3:1 · `muted-foreground` 6,9:1 (Weiß) / 6,25:1 (Canvas) · `primary`-Text
  5,59:1 · CTA-Label weiß-auf-Elektro 5,59:1 · `destructive` 5,7:1 · `input`-Border 3,3:1 ·
  Fokus-Ring 5,59:1. **Die hellsten Grautöne (`line-faint` u. ä.) sind dekorativ-only — nie Body-,
  Meta-, Timestamp-, Breadcrumb- oder Helper-Text.**
- **Sichtbarer Fokus (§2.4.7/2.4.13):** Elektro-Ring `2 px` + `2 px` weißer Offset (Box-Shadow-Technik)
  — sichtbar auf Weiß **und** auf Elektro-Fill. Fokus nie durch Sticky-`CrNav` verdeckt (§2.4.11).
- **Volle Tastatur-Bedienbarkeit (§2.1.1):** `CrRefModal` (Fokus-Falle, ESC, Fokus-Rückgabe),
  `CrChat` (Chips als Buttons, logische Tab-Ordnung, Relay-Feld), `CrLangToggle` (`aria-pressed`),
  `CrSpektrumBand` (jede Zone fokussier-/aufklappbar, `aria-expanded`), Timeline-Links,
  `CrTerminalEgg`.
- **Touch-Targets (§2.5.8):** interaktive Ziele **≥ 44×44 px** komfortabel (Minimum 24 px);
  Chips/Tags mit ausreichend Padding.
- **Dekorative Linien nie informationstragend (NFR-CC-01):** `CrLineBackground`, Band-Wellen,
  Signatur, Faden sind für Hilfstechnik `aria-hidden`; alle so codierten Informationen (Tiefe je
  Disziplin, Generationen-Reihenfolge) sind **zusätzlich textuell** vorhanden.
- **Reduced-Motion-Parität (§2.3.3):** zu jeder Animation ein gleichwertiger statischer Zustand
  (§5) — kein Informationsverlust.
- **Text-Resize (§1.4.4):** clamp-basierte Skala, keine fixen px-Fallen; bei 200 % kein Abschnitt/
  keine Bedienung verloren, kein H-Scroll.
- **Sprache & hreflang (§3.1.1/3.1.2):** `<html lang>` folgt der aktiven Sprache; DE/EN-Fassungen
  wechselseitig per `hreflang` verknüpft (FR-011-02); Sprachwechsel aktualisiert `lang`.
- **Fehler-Identifikation (§3.3.1/3.3.3):** `CrContactForm`/Relay benennen Fehler textuell +
  programmatisch (`aria-describedby`), Eingaben bleiben erhalten (Retry ohne Datenverlust);
  **Redundant Entry (§3.3.7):** eine im Chat bereits erhobene E-Mail wird im Relay/Formular
  vorbelegt.

Diese ACs sind als **deterministische business-e2e rendered/a11y-Journeys** testbar (Playwright
Computed-Style, sichtbarer Fokus/Tastatur, `axe`-Scan) — kein menschliches Visual-Approval-Gate.

---

## 9. Ton & Copy-Prinzipien

- **Du-Ansprache, Ich-Perspektive** durchgehend (FR-CC-02), „Mensch hinter dem Code".
- **DE Default / EN vollständig** (FR-CC-01); Eigennamen unübersetzt.
- **Pitch-Copy (FR-001-01) — Arbeitsfassung** verbatim:
  „State-of-the-art AI-Entwicklung für wertschöpfende Ketten. Gestützt von 12 Jahren
  Softwareentwicklungserfahrung." **Verfeinerungs-Vorschläge** (finale Freigabe beim Owner am Gate):
  - **V1 (nah am Original, gestrafft):** DE „State-of-the-art KI-Entwicklung für wertschöpfende
    Ketten — gestützt von 12 Jahren Softwareentwicklung." / EN „State-of-the-art AI engineering for
    value-creating chains — backed by 12 years of software development."
  - **V2 (Nutzwert-forward, Du/Ich):** DE „Ich mache aus 12 Jahren Softwareentwicklung KI, die
    messbar Wert schafft — vom Prozess bis zur Kette." / EN „I turn 12 years of software
    engineering into AI that creates measurable value — from process to chain."
  - **V3 (Zweizeiler, einprägsam):** Headline DE „Aus Erfahrung wird Wertschöpfung." / Sub
    „State-of-the-art KI-Entwicklung, gestützt von 12 Jahren Softwareentwicklung." (EN „Experience,
    turned into value." / „State-of-the-art AI engineering, backed by 12 years of software.")
  - **V4 (sehr knapp):** DE „12 Jahre Softwareentwicklung. Heute: KI, die Wert schöpft." / EN
    „12 years of software. Now: AI that creates value."
  - *Empfehlung ui-ux:* **V3** als Hero (Cabinet-Display-Headline + General-Sans-Sub) — knappste
    5-s-Klarheit für HR bei höchstem Erinnerungswert; Owner entscheidet.
- **Linux/Terminal-Hook (FR-004-07 / FEAT-013) — nicht wörtlich** „Das Terminal ist meine Heimat"
  (I3, Owner findet das wörtlich „cringe"). Vorschläge (Richtung, Owner wählt): „Wo andere klicken,
  tippe ich." · „Am liebsten mit den Fingern auf der Tastatur." · „Meine Werkbank ist die
  Kommandozeile." · als Mono-Marker im Band-Detail: `matthias@linux:~$ whoami`.
- **Konsolen-Gruß (FR-013-02) — Vorschlag (Owner final):** „Hey — du schaust also unter die Haube.
  Respekt. Tipp mal `help` ins versteckte Terminal auf der Seite. — Matthias" (technisch, kein Emoji;
  Du-Ton).

---

## 10. Brand-Mark

- **Wortmarke:** der gezeichnete **„Matthias"-Schriftzug** als animierter SVG-Stroke (Plotter-/
  Oszilloskop-Ästhetik, `ink`-Stroke, Elektro-Highlight im Draw). **Keine** Handschrift/Papier-Optik,
  **kein** Bild der echten Unterschrift (D3/G1).
- **Favicon / Monogramm:** ein aus **einer durchgehenden Plotter-Linie** geformtes **„M"** (bzw.
  „MF") in `ink` auf Weiß; Elektro-Variante für dunkle Kontexte. **Favicon-Größen 16/32 + 180
  (apple-touch) + SVG-Favicon**; OG-Share-Image (FR-011-05) trägt Wortmarke + Pitch auf Weiß mit
  Linien-Motiv. Assets werden im Foundation-Meilenstein von `implementation` erzeugt.
- **CommerzReal_logo.png:** **ausschließlich** Arbeitgeber-Logo in `CrTimeline` (FEAT-003) — nicht
  Teil der Personal Brand.

---

## 11. Ausstehende Materialien — definierte Platzhalter/Fallbacks

| Material | Komponente | Design-Fallback (kein defekter Zustand) |
|----------|------------|------------------------------------------|
| h_da-Logo | `CrTimeline` | **Text-Fallback** (Institutionsname), kein Broken-Image (FR-003-04) |
| Helles Porträt | `CrPortrait` | dunkles **median-Foto** als Platzhalter (FR-002-05) |
| Hobby-/Alltagsfotos | Über-mich | Abschnitt bleibt **ohne** Bilder kohärent (FR-002-06) |
| LinkedIn-URL | `CrProfileLinks` | Link **entfällt** bis geliefert — kein Dead Link (FR-009-08) |
| median-Rechtstexte | Impressum/Datenschutz | Draft-Status, „vor Go-Live durch Owner geprüft" (FR-012-04) |

---

## 12. Pre-Delivery-Checkliste (framework-owned, für jede Oberfläche)

- Icons sind **SVG** (Lucide) — **nie Emoji** als Icon.
- `cursor-pointer` auf **jedem** klickbaren Element.
- **Hover + Focus** auf allen interaktiven Elementen, 150–300 ms Transition; **sichtbarer
  Fokus-Ring** (Elektroblau) für Tastatur-Nav.
- **`prefers-reduced-motion`** für **jede** Animation respektiert (§5, volle Parität).
- **Responsiv** an 360/768/1024/1440/2560 — **kein** horizontaler Scroll.
- **Chart-Serien** binden an `--chart-*` / `--ki-gradient-*` — **nie** hartkodiertes Hex.
- Überall wo Liste/Galerie: **row-/card-level List→Detail** (`CrRefCard` → `CrRefModal`), kein
  loser Text-Button.
- **Oberflächen-Tiefe vorhanden** — Cards lesen als distinkte Objekte (Canvas ≠ Card, echter
  Border-Step, `shadow-*`); kein Weiß-auf-Weiß.
- **Lesemaß gehalten** — `max-w-content` (~1500 px) + Prosa ~65–75 ch; kein Full-Width-Text auf WQHD.
- **Eine primäre CTA pro Screen** — Elektroblau markiert die eine workflow-treibende Aktion; Utility
  outline/neutral.
- **Text erfüllt AA** — Body/Meta/Timestamp/Helper ≥ 4,5:1; hellste Grautöne dekorativ-only.
