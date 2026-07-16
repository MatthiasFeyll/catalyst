# Design-System — catalyst

> Design-Baseline der Personal Page `matthias-feyll.de` (4. Generation). Autor: `/design`
> (ui-ux-Subagent, frontend-design-Craft). Bindend gegenüber allen tieferen Artefakten
> (Artefakt-Präzedenz). Änderungen nach Freeze nur via `/design`-Re-Entry.
>
> **Vollständige Neu-Fassung (/design-Re-Entry 2026-07-16).** Diese Version ersetzt die
> Erst-Fassung, die vor Verfügbarkeit des frontend-design-Craft-Skills (fw-ADR-0048) entstand.
> Der freigegebene Design-Brief aus dem Discovery-Grill („**Die Linie, die schreibt**") ist die
> committete Richtung; Owner-Entscheidungen sind mit ihren Grill-Labels (DA/DB/DC/DD/DE) belegt.
> Tragfähige Substanz der Erst-Fassung (Kontrast-Mathematik, A11y-Struktur, Zustandsmatrizen,
> Elevation-Skala) wurde übernommen und **neu geprüft** — nichts gilt, weil es dastand.
>
> **Brand-Abweichung (owner-approved, DE2 / Discovery A5):** catalyst nutzt **NICHT** die
> Commerz-Real-Corporate-Brand. Dies ist eine private Personal Page mit eigener **Personal Brand**.
> Das `assets/CommerzReal_logo.png` bleibt **ausschließlich** Arbeitgeber-Logo in der
> Karriere-Timeline (FEAT-003). Der **WCAG-2.2-AA-Floor gilt unverändert**.
>
> **Meilenstein-1:** nur **Light-Theme** (kein Dark Mode; `tokens.dark.json` bleibt in M1 ungenutzt).
> Umsetzung der Tokens erfolgt durch `implementation` in `services/frontend/**` (nicht mein
> Write-Scope) — dieses Dokument **committet Werte + Intent**; `services/frontend/tokens.json` ist die
> maschinenlesbare Quelle der Wahrheit (DTCG, ADR-0005/-0010). Ich schreibe **keine** konkurrierenden
> Hand-Mappings, sondern lege Werte + Absicht fest.

---

## 0. Design-Thinking (Craft-Grundlage)

### 0.1 Subjekt · Publikum · der EINE Job

- **Subjekt.** Matthias Feyll — erfahrener Entwickler (12 Jahre), heute AI-Native Software
  Developer. Die Seite ist die **4. Generation** seiner Personal Page **und zugleich das Exponat**:
  die erste vollständig **KI-geschriebene** Generation (nach dem ADLC-Framework gebaut, öffentliches
  Repo). Sie **verkörpert**, was sie behauptet.
- **Publikum.** **P1 HR-Recruiter:in** (primär, nicht-technisch, erwartet weiß/professionell/modern,
  ~5 s Klarheit); **P2 Informatiker:in / Tech-Interviewer:in** (sekundär, will Links,
  Referenz-Tiefe, das Terminal-Egg).
- **Der EINE Job der Seite.** In ~5 s HR überzeugen, dass ein Gespräch lohnt — und dabei durch das
  **eigene Handwerk** belegen, dass Matthias AI-native ist. Kern-These: **Die Machart der Seite ist
  der Beweis des Pitch.**

### 0.2 These & Signature — „Die Linie, die schreibt" (DB1b)

Eine **einzige, feine Plotter-Linie** ist das verbindende Gewebe der ganzen Seite — und sie
**schreibt die Seite in die Existenz**. Zwei fusionierte Richtungen:

- **R1 — Die durchgehende Linie (Struktur, nicht Deko).** Dieselbe Linie tritt tragend auf als:
  gezeichneter **„Matthias"-Namenszug** (SVG-Stroke, Plotter-/Oszilloskop-Ästhetik — **ausdrücklich
  KEINE Handschrift/Papier-Optik, kein Bild der echten Unterschrift**, DE2), **Timeline-Rückgrat**,
  **Kompetenz-Faden** durch vier Stationen, **Generationen-Faden** der Evolution, **Scroll-Fortschritt
  der Journey** (DE1b — die Linie „füllt sich") und als kaum wahrnehmbare **Hintergrund-Spuren**
  („man spürt es mehr, als man es sieht", DC2). Ein Motiv, eine Sprache, überall wiedererkennbar.
- **R2 — Die Materialisierungs-Sprache (Motion).** Inhalte **materialisieren** beim ersten
  Sichtbarwerden wie **ruhiger Modell-Output** — die Seite „schreibt sich selbst". Durchgehend
  professionell: **kein Tipp-Kitsch, kein Terminal-Typewriter für Fließtext, kein Gimmick.** Präzise
  Spezifikation in §5.

**Verworfen:** das Museums-Plaketten-Stil-Konzept (R3), Partikel-Effekte (löst den
median-`tsparticles`-Ansatz ab), gewelltes Amplituden-Band (DD1-b).

**Warum das nicht generisch ist (frontend-design-Selbstkritik).** Ein gezeichneter SVG-Namenszug
allein wäre ein Tech-Portfolio-Default. Was diese Richtung **spezifisch für dieses Briefing** macht:
die Linie ist **lastentragend** (Fortschrittsanzeige, Timeline-Rückgrat, Kompetenz-Faden), nicht
gesprenkelte Deko; die Motion-Sprache ist **diegetisch** an die These „KI-geschriebene Seite"
gekoppelt (die Seite schreibt sich); und der **Temperatur-Verlauf** (§0.3) kodiert eine Reise von
Maschine zu Mensch. Die Boldness sitzt **an einer Stelle** (Hero als These + die zwei Signature-
Visuals); alles drumherum ist diszipliniert ruhig (DC3).

### 0.3 Temperatur-Dramaturgie (DC2 / DB2c-a — Owner-Idee, committet)

Der Seiten-Canvas ist **EIN seitenlanger, statischer Verlauf**: oben **kühl-technisch**
(Blau-Weiß) → unten **warm-menschlich** (Papier-Weiß). „Je tiefer du scrollst, desto näher kommst
du dem Menschen." **Kontinuierlich-unmerklich**, kein sichtbarer Streifen, **kein
Scroll-Hijacking** — dadurch **per Konstruktion reduced-motion-sicher und performance-neutral**
(nur ein statisches `background-image`). **Cards bleiben durchgehend reines Weiß** als ruhiger Anker
(sie „poppen" am warmen Ende sogar sauberer als ihr wärmerer Grund). Konkrete Endpunkt-Werte +
Kontrast-Nachweise auf **beiden** Endpunkten in §1.2.

### 0.4 Sicherheitszonen (DC3)

Die Eigenwilligkeit lebt **ausschließlich** in **Hero**, **Kompetenz-Linie**, **Evolution** und den
**Delight-Momenten**. **Kompromisslos konventionell/ruhig** bleiben: **Nav**, **Kontaktformular**,
**Fließtext-Lesbarkeit**, **Timeline**. Owner-Risikoprofil: „eher sicher professionell als
eigenwillig, aber nicht ausgewogen" — P1 (HR) erwartet weiß/professionell/modern.

---

## 1. Farb-Tokens

Weiß-/Papier-Grund · Fast-Schwarz-Tinte · **Elektroblau #1B58F3** als **einzige** Akzentfarbe (DA4).
Zulässige **Verläufe**: (a) der seitenweite **Temperatur-Canvas** (atmosphärisch, hinter allem;
§1.2), (b) der **KI-Gradient** (Blau→Cyan) am Kompetenz-Faden und im KI-Motiv (FR-004-03) — sonst
nirgends.

### 1.1 Kern-Tokens (shadcn-Set → `tokens.json`)

Werte als `hsl(<h> <s>% <l>%)` committet (DTCG-Konvention). `implementation` setzt sie in
`services/frontend/tokens.json`; Style Dictionary generiert die `hsl(var(--token))`-Ebene
(unveränderte Tailwind-Bindung, ADR-0010).

| Token | Rolle | HSL | ≈ Hex | Kontrast / Notiz |
|-------|-------|-----|-------|------------------|
| `background` | **Canvas-Fallback** (= kühler Verlaufs-Startpunkt; solide Fallback-/Print-Fläche) | `hsl(214 32% 96%)` | #F0F3F7 | echter Schritt unter Card-Weiß (fw-ADR-0040); der eigentliche Grund ist der Verlauf, §1.2 |
| `foreground` | **Tinte** (Fast-Schwarz, kühl) | `hsl(222 30% 12%)` | #15181F | auf Weiß **17,8:1** · auf kühlem Canvas **16,0:1** · auf warmem Canvas **16,1:1** (alle AAA) |
| `card` / `popover` | Karten-/Overlay-Fläche | `hsl(0 0% 100%)` | #FFFFFF | reines Weiß — die gehobene Ebene, **durchgehend** (DC2-Anker) |
| `card-foreground` / `popover-foreground` | Text auf Card | `hsl(222 30% 12%)` | #15181F | wie `foreground` |
| `primary` | **Elektroblau** (CTA-Fill, Links, Fokus-Herkunft) | `hsl(223 90% 53%)` | #1B58F3 | als Text auf Weiß **5,6:1** · kühl 5,1:1 · warm 5,1:1 (AA) |
| `primary-foreground` | Text auf Elektroblau-Fill | `hsl(0 0% 100%)` | #FFFFFF | weiß auf #1B58F3 = **5,6:1** (AA CTA-Label) |
| `secondary` | neutraler Fill (secondary-Button-Grund, Chips) | `hsl(214 32% 94%)` | #E9EDF3 | Trägerfläche; Text darauf = `foreground` |
| `secondary-foreground` | Text auf secondary | `hsl(222 30% 12%)` | #15181F | hoher Kontrast |
| `muted` | gedämpfte Fläche (Skeleton, Hover-Wash neutral) | `hsl(214 32% 94%)` | #E9EDF3 | — |
| `muted-foreground` | **Sekundär-Text** (Meta, Caption, Timestamp, Helper) | `hsl(220 14% 38%)` | #545A66 | auf Weiß **6,9:1** · kühl **6,2:1** · warm **6,3:1** — AA-Text auf allen ✓ |
| `accent` | subtiler Hover-/Selected-**Wash** (Elektro-Tint) | `hsl(222 100% 97%)` | #F0F4FF | **nur Fläche**, nie Text |
| `accent-foreground` | Text auf dem Elektro-Wash | `hsl(224 78% 43%)` | #1846C3 | auf #F0F4FF **7,3:1** (AA) |
| `destructive` | Fehler/Retry | `hsl(0 68% 45%)` | #C22B2B | als Text auf Weiß **5,7:1** (AA) |
| `destructive-foreground` | Text auf destructive-Fill | `hsl(0 0% 100%)` | #FFFFFF | — |
| `border` | Card-/Divider-Rahmen (dekorativ) | `hsl(214 22% 80%)` | #C2CBD8 | echter Rahmen-Schritt (fw-ADR-0040); trägt auch auf warmem Canvas (kühles Grau, dunkler als beide Pole) |
| `input` | **Formular-/Control-Rahmen** | `hsl(216 18% 52%)` | #6F7B90 | vs. Weiß **4,3:1** · vs. warmen Canvas **3,9:1** · vs. kühlen 3,8:1 — erfüllt WCAG 1.4.11 (≥3:1) mit Reserve ✓ **(dunkler als Erst-Fassung #7E8A9D — Sicherheitsmarge am warmen Formular-Ende, s. §1.2)** |
| `ring` | **Fokus-Ring** (Elektroblau) | `hsl(223 90% 53%)` | #1B58F3 | ≥5:1 (weit über 3:1 für 1.4.11); Technik: 2 px Ring + 2 px weißer Offset (auf Weiß **und** Elektro-Fill sichtbar) |

### 1.2 Temperatur-Canvas — Endpunkt-Tokens + Kontrast-Nachweis auf beiden Polen (DC2)

Der seitenweite Verlauf ist ein **Hue-Journey bei konstanter Helligkeit**: beide Endpunkte liegen
auf **nahezu identischer Luminanz** (L≈0,90) und unterscheiden sich fast nur in der **Farb-
Temperatur**. Genau das macht ihn **unmerklich** (kein Helligkeitssprung) **und
barrierefreiheits-neutral** (die WCAG-Kontrastformel bewertet Luminanz — bleibt die zwischen den
Polen konstant, halten alle Text-/UI-Paare auf **beiden** Polen). Das ist die ehrliche Auflösung
der Owner-Sorge „der wärmste Punkt ist kritisch für kühle Grautöne": kritisch wäre ein **dunklerer**
warmer Pol — deshalb ist der warme Pol bewusst **gleich hell** gewählt.

| Token | Rolle | HSL | ≈ Hex | Luminanz L |
|-------|-------|-----|-------|-----------|
| `canvas-cool` | **oberer/technischer Pol** (Hero → Timeline) | `hsl(214 32% 96%)` | #F0F3F7 | 0,894 |
| `canvas-warm` | **unterer/menschlicher Pol** (Referenzen → Kontakt) | `hsl(38 30% 95%)` | #F7F3EC | 0,899 |

**Umsetzung (`implementation`, nicht mein Scope):** `body`/Root erhält
`background-image: linear-gradient(to bottom, var(--canvas-cool), var(--canvas-warm))` über die volle
Dokumenthöhe, `background-attachment: fixed` oder auf dem Scroll-Container fixiert, **statisch** (kein
JS, kein Scroll-Listener). `background` (solide) bleibt `--canvas-cool` als Fallback (Print /
no-gradient / `forced-colors`). **Cards `--card` = reines Weiß durchgehend.** Der Verlauf ist
Hintergrund-Atmosphäre, **nicht** Inhalt — `aria`-irrelevant; **kein** Textelement liegt für seine
Lesbarkeit im Verlauf gefangen (alle Nachweise unten gelten auf beiden Polen).

**Kontrast-Nachweise (berechnet, auf beiden Polen):**

| Paar | auf Weiß (Card) | auf `canvas-cool` | auf `canvas-warm` | Floor |
|------|-----------------|-------------------|-------------------|-------|
| `foreground` #15181F (Tinte) | 17,8:1 | 16,0:1 | 16,1:1 | 4,5 (AAA erreicht) |
| `muted-foreground` #545A66 (Meta) | 6,9:1 | 6,2:1 | 6,3:1 | 4,5 ✓ |
| `primary` #1B58F3 als **Text** (Link/Eyebrow) | 5,6:1 | 5,1:1 | 5,1:1 | 4,5 ✓ |
| `input` #6F7B90 (Control-Grenze) | 4,3:1 | 3,8:1 | 3,9:1 | 3,0 (1.4.11) ✓ |
| `border` #C2CBD8 (Card-Grenze, grafisch) | 1,4:1 vs Card / vs Canvas ~1,3:1 | — | — | dekorativ, Tiefe via Multi-Signal §1.4 |

> **Test-Verankerung.** Die rendered/a11y-Journeys (ADR-0004) prüfen Computed-Style von Meta-/
> Body-/Link-Text an **zwei repräsentativen Scroll-Positionen** (oberer kühler Pol: Hero/Timeline;
> unterer warmer Pol: Kontakt) gegen den 4,5:1-Floor — so ist die „beide-Pole-AA"-Zusage objektiv
> testbar, nicht nur behauptet.

### 1.3 Brand-Erweiterungs-Tokens (über das shadcn-Set hinaus)

`implementation` ergänzt diese in `tokens.json` bzw. als CSS-Variablen im generierten Layer und im
Tailwind-Theme. Sie tragen das Linien-Motiv, die zwei Visuals und die zwei erlaubten Verläufe.

| Token | Wert | Rolle |
|-------|------|-------|
| `canvas-cool` / `canvas-warm` | s. §1.2 | Temperatur-Verlauf (DC2) |
| `ink` | = `foreground` `hsl(222 30% 12%)` | Default-Stroke aller gezeichneten Linien: Timeline-Rückgrat, Namenszug-Ruhefarbe, Kompetenz-Faden-Basis, Evolution-Faden |
| `electric` | = `primary` `hsl(223 90% 53%)` | aktive Linien-Draws, Signatur-Highlight, **gefüllte** Scroll-Fortschritts-Linie, aktive Zustände |
| `line-faint` | `hsl(214 22% 90%)` #DDE3EB | **dekorative** Hintergrund-Spuren („man spürt es mehr, als man es sieht", DC2) — **rein dekorativ, `aria-hidden`, nie bedeutungstragend** |
| `ki-gradient-from` | `hsl(223 90% 53%)` #1B58F3 | KI-Faden Start (Elektroblau) |
| `ki-gradient-mid` | `hsl(211 92% 55%)` #2597F0 | KI-Faden Mitte |
| `ki-gradient-to` | `hsl(199 92% 56%)` #24B4EE | KI-Faden Ende (Elektro-Cyan) — **Blau→Cyan, bleibt Blau-Familie** (kein Purple-Cliché) |
| `viz-line` | = `ink` `hsl(222 30% 12%)` | Basis-Stroke der Kompetenz-Linie & des Evolution-Fadens (ersetzt das entfallene `chart-band`) |
| `chart-series-1` | `hsl(223 90% 53%)` #1B58F3 | Station **Frontend** — Identitäts-Tick/Marker |
| `chart-series-2` | `hsl(211 55% 40%)` #2E6199 | Station **Backend** |
| `chart-series-3` | `hsl(222 24% 26%)` #33384F | Station **Architektur** |
| `chart-series-4` | `hsl(199 68% 42%)` #227FB4 | Station **DevOps/Cloud** |

> **Entfallen ggü. Erst-Fassung:** `chart-band` (#40465A, „Grundkörper des gewellten Bands") — es
> gibt kein Band mehr (DD1-b). Sein Zweck geht in `viz-line` (= Tinte) über.
>
> **Chart-/Viz-Farb-Regel (fw-Checkliste):** Faden-/KI-/Serien-Farben binden **ausschließlich** an
> diese Tokens (`--viz-line`, `--ki-gradient-*`, `--chart-series-*`), **nie** hartkodiertes Hex in
> d3-Code. Alle Töne liegen in der Blau/Ink-Familie (kohärent, off-brand ausgeschlossen). Für
> **grafische** Objekte (Faden, Station-Marker) gilt ≥3:1 gegen den jeweiligen Grund (1.4.11);
> **Labels/Fakten** werden in `foreground`/`muted-foreground` gesetzt, nie in den Serienfarben — so
> bleibt die AA-Text-Regel gewahrt. Da Erfahrungstiefe jetzt über **Fakten** kodiert wird (DD1-b),
> tragen die Serienfarben **nur Stations-Identität**, keine Bedeutung.

### 1.4 Elevation / Oberflächen-Tiefe (fw-ADR-0040)

Cards/Panels müssen als **distinkte Ebenen** lesen, nicht als eine flache Fläche. Multi-Signal-Tiefe:
**(a)** der Temperatur-Canvas (L≈0,90) ist ein echter Schritt unter Card-Weiß (L=1,0), auf **beiden**
Polen, **(b)** `border` #C2CBD8 ist ein echter Rahmen-Schritt (kein Sub-Pixel-Hairline), **(c)** die
framework-eigene `shadow-*`-Skala.

| Utility | Wert (literal, aus Scaffold-Theme) | Nutzung |
|---------|-----------------------------------|---------|
| `shadow-card` | `0 1px 2px rgba(16,24,40,.06), 0 2px 8px rgba(16,24,40,.08)` | Ruhe-Elevation aller Cards (`CrRefCard`, Verantwortung, Timeline-Station, Chat-Panel, Museums-Rahmen) |
| `shadow-raised` | `0 4px 14px rgba(16,24,40,.10), 0 2px 6px rgba(16,24,40,.06)` | Hover-Elevation (Card-Lift), CTA-Hover |
| `shadow-overlay` | `0 12px 32px rgba(16,24,40,.16), 0 4px 12px rgba(16,24,40,.10)` | `CrRefModal`, `CrNav` (scrolled), Chat-Vollbild-Sheet (mobil) |

> **Footgun (verbindlich, aus Erst-Fassung übernommen — wertvoll).** Elevation bindet **nur** über
> die benannten Utilities (`shadow-card`/`shadow-raised`/`shadow-overlay`) oder einen **neuen
> benannten Step** in `tailwind.config.ts`. **Nie** eine `shadow-[var(--x)]`-Arbitrary-Klasse —
> Tailwind kompiliert das als Shadow-**Farbe** (`--tw-shadow-color`) und rendert **gar keinen**
> Box-Shadow (in der Praxis beobachteter Whole-Elevation-Ausfall, den nur die rendered-Prüfung
> fing). Dark-Mode müsste die `--shadow-*` in der Dark-Ebene per `var()`-Hook neu tunen — in M1 nicht
> relevant (Light-only).

> **Warum trotz „less is more" ein sichtbarer Canvas-Schritt?** Der fw-ADR-0040-Konflikt (weiß-auf-
> weiß kollabiert auf großen Displays) ist real. Auflösung: die **primäre** Tiefe trägt das
> **Linien-Motiv** + der restrained Shadow; der Canvas-Schritt ist bewusst leicht (L≈0,90 vs 1,0),
> liest weiterhin als „weiße, professionelle Seite", ist aber messbar ein Schritt — keine
> sub-perzeptuelle Hairline-Falle. Am **warmen** Pol wirkt das reine Card-Weiß sogar minimal kühler
> als sein Grund und hebt sich dadurch angenehm ab.

### 1.5 Radius

| Token | Wert | Nutzung |
|-------|------|---------|
| `radius` | `0.5rem` (8 px) | Cards/Buttons (`lg`); `md`=6 px, `sm`=4 px abgeleitet |
| — (Komponenten-Detail) | `2 px` | Mono-Chips/`CrTag`/`kbd` — technischer, scharfer Look |
| — (Komponenten-Detail) | `12 px` | `CrRefModal` groß, `CrMuseumFrame` (Rahmen-Außenkante) |

---

## 2. Typografie (DA4 — gesetzt)

**Self-hosted, WOFF2, subgesetzt (Latin + Latin-Extended-A → deckt ä ö ü ß + Sprachnamen), kein
Google-Fonts-CDN (DSGVO, NFR-CC-05 / ADR-0005).** `font-display: swap`; Preload nur der kritischen
Schnitte (Cabinet Grotesk 700/800 für Hero, General Sans 400 für Body). **Kein
Inter/Roboto/Arial/System-UI/Space Grotesk.**

### 2.1 Font-Wahl (committet, DA4)

| Rolle | Font | Bezug / Lizenz | Schnitte | Einsatz |
|-------|------|----------------|----------|---------|
| **Display** | **Cabinet Grotesk** | Fontshare (ITF), self-hostable | 500 / 700 / 800 | Hero-Pitch, Sektions-Titel, große Zahlen-Statements — trägt den **Charakter/Erinnerungswert** |
| **Body / UI** | **General Sans** | Fontshare (ITF), self-hostable | 400 / 500 / 600 | Fließtext, Cards, Formular, Chat, Nav — der **professionelle, hoch-lesbare** Workhorse |
| **Mono / Akzent** | **JetBrains Mono** | OFL, self-hostable | 400 / 500 / 700 | Eyebrows/Labels, Stack-Tags, Timeline-Daten, Zahlen-Stats, der **Materialisierungs-Caret** (§5), `CrTerminalEgg`, `kbd`, Code |

**Begründung.** Cabinet Grotesk (charaktervolle Geometric-Grotesk, distinkte Details) + General Sans
(neutral-warmer, sehr legibler Grotesk derselben Foundry) sind ein raffiniertes Display/Body-Paar:
Charakter oben, professionelle Ruhe im Fließtext — genau der Spagat **HR-tauglich × einprägsam**.
JetBrains Mono ist die entwickler-native Mono; sie trägt die Linux-/Terminal-Identität (P2,
FR-004-07, FEAT-013) **und** — neu in dieser Fassung — den **Caret der Materialisierungs-Sprache**
(ein 1-px-Mono-Caret als „Schreib-Signatur"; §5). **Ligaturen aus** für Labels/Tags
(`font-variant-ligatures: none`), **an** nur im `CrTerminalEgg`.

### 2.2 Typo-Skala (fluid, 360 px → WQHD)

| Stufe | Font / Weight | Größe (clamp) | Leading | Tracking | Einsatz |
|-------|---------------|---------------|---------|----------|---------|
| Display XL | Cabinet 800 | `clamp(2.5rem, 6vw, 4.5rem)` | 1.02 | -0.02em | Hero-Keyword/Pitch |
| Display L | Cabinet 700 | `clamp(1.75rem, 3.5vw, 2.75rem)` | 1.08 | -0.01em | Sektions-Titel |
| Heading M | Cabinet 600 / GS 600 | `1.25rem` | 1.2 | 0 | Card-Titel, Modal-Titel, Station-Titel |
| Body L (Lead) | General Sans 400 | `1.125rem` | 1.6 | 0 | Lead-Absätze |
| Body M | General Sans 400 | `1rem` | 1.6 | 0 | Standard-Fließtext |
| Body S | General Sans 400/500 | `0.875rem` | 1.5 | 0 | Meta/Caption (`muted-foreground`) |
| Eyebrow (Kicker) | JetBrains Mono 500 | `0.75rem` | 1.2 | 0.12em, UPPERCASE | Sektions-Kicker (`muted-foreground`/`electric`) |
| Tag / Mono-Label | JetBrains Mono 400 | `0.8125rem` | 1.3 | 0.01em | Stack-Tags, Timeline-Daten, Museums-Plaketten-Zeile |
| Terminal | JetBrains Mono 400 | `0.875rem` | 1.5 | 0 | `CrTerminalEgg`, `kbd` |

### 2.3 Lesemaß (fw-ADR-0040)

- **Content-Container:** `max-w-content` — **Ziel ~1500 px** (NFR-CC-04). Das Scaffold-Theme setzt
  `maxWidth.content = 1200px`; **`implementation` erhöht auf ~1500 px** (oder ergänzt `max-w-wide:
  1500px`). Grids/Galerie/Kompetenz-Linie nutzen die volle Content-Breite.
- **Fließtext:** laufende Prosa wird auf **~65–75 ch** gekappt (`max-w-prose`), damit Text auf großen
  Displays **nie** die volle Breite spannt (WQHD-„Flach/Leer"-Tell vermeiden).
- **Dekoratives Linien-Motiv + Hintergrund-Spuren** dürfen **full-bleed** über die Content-Breite
  hinaus (NFR-CC-04) — sie sind `aria-hidden` und tragen keine Information.

---

## 3. Raster, Raum & Breakpoints

### 3.1 Breakpoints (Projekt, 360 px → WQHD, NFR-CC-04)

| Name | min-width | Zweck |
|------|-----------|-------|
| base | 360 px | Smallest supported; alles lesbar, kein H-Scroll |
| sm | 480 px | große Phones |
| md | 768 px | Tablet — Kompetenz-Linie Umbruch horizontal↔vertikal-Grenze |
| lg | 1024 px | Desktop — mehrspaltige Galerie, Museums-Rahmen nebeneinander |
| xl | 1280 px | großer Desktop |
| 2xl | 1536 px | Content-Cap greift (~1500 px), Motiv full-bleed darüber |

**Deterministische Test-Viewports (rendered/a11y-Journeys):** 360 · 768 · 1024 · 1440 · **2560
(WQHD)**. Prüfziel: kein horizontaler Scroll, Content-Cap hält, Linien-Motiv bleibt full-bleed ohne
Text-Drift.

### 3.2 Spacing & Sektions-Rhythmus

- **8-px-Basisraster** (Tailwind-Default-Skala). Komponenten-Innenabstände in 4/8/12/16/24.
- **Sektions-Vertikalrhythmus großzügig** (less is more): Section-Padding-Block
  `clamp(4rem, 10vh, 8rem)`; Sektions-Trenner ist eine **gezeichnete Linie**, kein harter Block.
- **Weißraum ist ein aktives Element** — jede Sektion hat einen klaren „ein Ding pro Screen"-Fokus
  (Reduktion kognitiver Last, §13).

---

## 4. Ikonografie & Visualisierung

### 4.1 Ikonografie — **Lucide** (ADR-0010, gebunden)

**SVG, nie Emoji als Icon.** Kern-Set (Auswahl): `menu`, `x`, `arrow-down` (Scroll-Hinweis),
`arrow-up-right` / `external-link` (externer Link, „Live öffnen"), `chevron-down` (Aufklappen),
`github`, `gitlab`, `linkedin`, `mail`, `send`, `terminal`, `languages`/`globe` (Lang-Toggle),
`map-pin` (Reisen — **ohne** konkrete Adresse), `music` (Band), `server` (NAS/Smart Home),
`graduation-cap` (Bildung), `briefcase` (Beruf), `messages-square` (Chat-Anker), `check` /
`check-circle` (Erfolgs-/Abschluss-Moment, DE1b), `alert-circle` (Fehler), `loader` (Lade-Spinner mit
reduced-motion-Fallback). Icons erben Textfarbe; dekorative Icons `aria-hidden`, bedeutungstragende
bekommen `aria-label`.

### 4.2 Charting/Viz — **d3** (ADR-0005, lazy-geladen)

Zwei individuelle Visuals, beide **dynamisch importiert** (nicht im Initial-Bundle, NFR-CC-02), beide
mit gleichwertigem **statischem End-/Parität-Zustand** für `prefers-reduced-motion` (NFR-CC-01).

**A) Kompetenz-Linie (`CrKompetenzLinie`, FEAT-004 — revidiert DD1-b).** *(Rename ggü. Erst-Fassung:
`CrSpektrumBand` → `CrKompetenzLinie`; „Band"/Amplitude sind entfallen.)*

- **Eine durchgehende, ununterbrochene Linie** (ein d3-`path`) fließt durch **vier ruhige
  Disziplin-Stationen** — **Frontend · Backend · Architektur · DevOps/Cloud** in dieser Reihenfolge
  (FR-004-01). Die **Ununterbrochenheit** transportiert das **Generalisten-Narrativ** (kein
  Spezialisten-Silo). Die Linie ist **ruhig** — eine gerade bzw. sanft, gleichmäßig geschwungene
  Baseline; **keine** informationstragende Amplitude (DD1-b), also **keine** Wellen-Kodierung.
- **Erfahrungstiefe je Disziplin = Fakten in der Station** (FR-004-02, geändert): Jahre,
  Schwerpunkte, Belege — als **Text/Struktur** in der aktivierten Station, **nicht** grafisch als
  Bandstärke. Die Serienfarbe (`--chart-series-1…4`) markiert nur die **Stations-Identität**.
- **KI-Layer (`--ki-gradient-*`) läuft als durchgehender Faden** über die **gesamte Länge** parallel
  zur/überlagert der Basis-Linie (FR-004-03) — **kein eigener Abschnitt**, sondern ein durchlaufender
  Blau→Cyan-Faden, der sichtbar macht: **KI durchdringt alle Disziplinen**.
- **Desktop horizontal** (Linie links→rechts, vier gleich-verteilte Stations-Knoten, Detail-Bereich
  darunter) **/ Mobil vertikal** (Linie oben→unten, Stationen gestapelt, Aufklapper an der Station)
  mit **inhaltlicher Parität** (FR-004-05).
- **Klick/Tap/Enter/Space auf eine Station** öffnet deren **Detail** (Desktop-Bereich / mobiler
  Aufklapper; FR-004-04). Tastatur: jede Station fokussier-/aufklappbar (`aria-expanded`).
- **Linux/Terminal-Affinität** (FR-004-07) sitzt in der Station „DevOps/Cloud" als **Mono-Prompt-
  Marker** `matthias@linux:~$` im Detail — Copy **nicht** wörtlich „Das Terminal ist meine Heimat"
  (I3, §9).
- **Keine Verlinkung** von Disziplinen auf Referenzen (FR-004-06, Dead-Links-Vermeidung).
- reduced-motion: Linie + KI-Faden **sofort vollständig** gezeichnet; Stationen bleiben
  aktivier-/aufklappbar; KI-Faden statisch (kein „Fließen").

**B) Evolution-Faden (`CrEvolutionThread`, FEAT-007).** Eine durchgehende, sich zeichnende Linie
verbindet die vier Generationen-Knoten lookup → lookdown → median → **catalyst**; jeder Knoten
hostet einen `CrMuseumFrame` (§6). reduced-motion: Faden sofort vollständig gezeichnet.

---

## 5. Motion-Spezifikation — die Materialisierungs-Sprache (DB4 / R2, eigenes Kapitel)

Gesamt-Motion-Level wie Bestand (DB4): **ein orchestrierter Page-Load + Scroll-Reveals + dezente
Mikro-Interaktionen** — nicht mehr. **Zu jedem Motion-Element existiert die vollständige
`prefers-reduced-motion`-Parität, ohne Informationsverlust** (NFR-CC-01, verbindlich).

### 5.1 Easing & Dauern (neu begründet)

- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (refined ease-out). **Begründung:** diese Kurve
  dezeleriert scharf und **setzt weich auf** — sie liest wie ein **Plotter-Stift, der ankommt und
  sich setzt**, genau der Ton „ruhiger Modell-Output". **Kein** Overshoot/Bounce-Easing (läse
  verspielt — falsches Register für HR).
- **Namenszug-Stroke (Hero):** ~**1,5 s** (DC1; SVG `stroke-dashoffset`, Plotter-Ästhetik), linearer/
  leicht ease-in-out Draw, damit der „Stift" gleichmäßig zieht.
- **Materialisierung eines Elements:** **400–560 ms** (Opazität + Y-Translation, s. §5.2).
- **Stagger** zwischen Geschwistern einer Gruppe: **60–90 ms**.
- **Mikro-Interaktionen (Hover/Focus):** **150–250 ms**.
- **Caret-Tick** (die „Schreib-Signatur"): erscheint ~**120 ms**, löst sich dann auf.

### 5.2 Was die Materialisierung GENAU tut

Beim **ersten Sichtbarwerden** (IntersectionObserver, **einmalig** pro Element) materialisiert ein
Inhaltsblock so:

1. **Opazität** 0 → 1 (über die Elementdauer).
2. **Minimale Y-Translation** `translateY(10px → 0)` (Bereich 8–12 px) — ein ruhiges „Aufsetzen",
   kein Springen.
3. **Optional & sparsam** ein **1-px-Elektro-Caret/Linien-Tick** (JetBrains-Mono-Caret bzw. ein
   kurzer Elektro-Strich) an der **Führungskante** des Blocks, ~120 ms sichtbar, dann aufgelöst — die
   „von-einem-Modell-geschrieben"-Signatur. **Nur** an **Schlüsselstellen**: Hero-Pitch, jeder
   `CrSectionHeader`, Chat-Erstnachricht/-Antwortkarten. **Nicht** an jedem Absatz.

### 5.3 Was die Materialisierung NIEMALS tut (Anti-Kitsch-Leitplanken)

- **Kein Buchstaben-für-Buchstaben-Tippen von Fließtext.** Nur der **Namenszug** zeichnet sich als
  Stroke; der **Pitch materialisiert als ganzer Block** (Fade+Rise), nicht getippt.
- **Kein Terminal-Typewriter** für Prosa/Antwortkarten.
- **Kein Layout-Shift** (CLS): der Platz jedes Blocks ist **vorab reserviert**; Materialisierung
  bewegt nur Opazität + eine 10-px-Translation innerhalb des reservierten Kastens.
- **Kein Dauer-Loop, keine Ambient-Endlosanimation** (außer dem Terminal-Cursor-Blink).
- **Kein Scroll-Hijacking** (der Temperatur-Verlauf ist statisch, DC2).

### 5.4 Scroll-Fortschritts-Linie (DE1b — neu)

Die Signature-Linie **verdoppelt** als dezenter Journey-Fortschritt (`CrProgressLinie`): eine feine,
fixierte Linie (z. B. am linken Viewport-Rand oder als Nav-Unterstrich), die sich mit dem Scroll von
`ink` zu `electric` **füllt** — die Linie „schreibt sich" mit der Reise voran. **Rein dekorativ,
`aria-hidden`**, **nicht** alleiniger Träger irgendeiner Information (der Scroll-Spy in `CrNav` trägt
die navigierbare Positions-Info separat und barrierefrei). Da die Füllung **direkt dem Scroll folgt**
(nutzergesteuert, keine autonome Animation), ist sie unter `prefers-reduced-motion` zulässig; jedes
**Smoothing/Lerp** wird bei reduced-motion abgeschaltet (harte, sofortige Positions-Reflexion).

### 5.5 Erfolgs-/Abschluss-Momente (DE1b — neu)

Erfolgszustände lesen als **kleiner Abschluss/Achievement**, **kein stiller Reset**:

- **Kontakt gesendet / Relay zugestellt:** ein `check-circle` **zeichnet** sich (Stroke-Draw, ~400 ms)
  **und** eine Du-Ton-Bestätigung materialisiert (§9); optional vervollständigt sich der lokale
  Linien-Abschnitt der Sektion. reduced-motion: Häkchen + Bestätigung **sofort** im Endzustand.
- Der Erfolg wird zusätzlich per `aria-live="polite"` angesagt (§8) — der Abschluss-Moment ist
  Delight **obendrauf**, nie der alleinige Träger der Rückmeldung.

### 5.6 Vollständige reduced-motion-Paritätstabelle

| Motion-Element | Verhalten (Motion an) | `prefers-reduced-motion` (Parität) |
|----------------|-----------------------|------------------------------------|
| **Orchestrierter Page-Load** | 1) Namenszug zeichnet sich (~1,5 s), 2) Pitch **materialisiert** (Fade+Rise, Caret-Tick), 3) Scroll-Hinweis zuletzt | Namenszug + Pitch + Hinweis **sofort** im Endzustand; keine Staffelung; **kein Caret** (FR-001-03/-05) |
| **Sektions-Materialisierung** | `CrSectionHeader` + Inhalt materialisieren beim ersten In-View (Fade+Rise, Stagger 60–90 ms; Header mit Caret-Tick) | Inhalt **sofort** sichtbar, identisch; kein Rise, kein Caret |
| **Sektions-Linien-Draws** | Kicker-Underline, Timeline-Rückgrat, Kompetenz-Faden, Evolution-Faden zeichnen sich **einmalig** beim In-View | Linien **sofort** vollständig gezeichnet; Inhalt identisch |
| **Scroll-Fortschritts-Linie** | füllt sich weich mit Scroll (ink→electric) | folgt Scroll **ohne** Smoothing (sofortige Positions-Reflexion); rein dekorativ |
| **Mikro-Hover** | Link-Underline zeichnet sich; Card-Lift (`shadow-card`→`shadow-raised`, `translateY(-2px)`); Tag-Border → `electric` | **kein Transform**; nur Farb-/Opacity-/Border-Wechsel (statische Rückmeldung) |
| **Hintergrund-Spuren** (`CrLineBackground`) | dezent, evtl. minimales Parallax (~0,15–0,3×), full-bleed | **statische** Linien-Ebene, kein Parallax |
| **Kompetenz-Linie / Evolution-Faden (d3)** | Linie zeichnet sich, KI-Faden „fließt" (langsame, dezente Gradient-Verschiebung) | statische End-Linie + statischer KI-Faden; Stationen/Aufklapper funktionieren weiter |
| **Chat-Reveal** | Erstnachricht + Antwortkarten materialisieren gestaffelt (Caret-Tick) | sofortiges Erscheinen |
| **Erfolgs-/Abschluss-Moment** (§5.5) | `check-circle` zeichnet sich + Bestätigung materialisiert | Häkchen + Bestätigung sofort; `aria-live`-Ansage unverändert |
| **`CrTerminalEgg`-Cursor / Spinner** | blinkender Cursor, Lade-Spin | Cursor statisch sichtbar; Spinner → statischer „lädt…"-Text |

**Budget-Disziplin:** ein gut orchestrierter Page-Load + Scroll-Draws > verstreute Mikro-Effekte;
schwere Visuals (Kompetenz-Linie, Chat) lazy (NFR-CC-02). Namenszug/Pitch sind **text-first** und
**nicht** von der Animation abhängig (FR-001-05).

---

## 6. `Cr*`-Komponenten (Kontrakt für die deliverable React-Library)

Brand-Komponenten **über shadcn/ui-Primitive (Radix)**. Jede ist zu bauen **und** über die
Design-Tokens/Tailwind-Theme zu themen (keine hartkodierten Hex). Zustände umfassen jeweils
default/hover/focus/active/disabled/loading/error/empty/fallback, wo zutreffend.

| Komponente | Zweck | Zustände (inkl. Fehler/Leer/Fallback) | FR-Trace |
|------------|-------|----------------------------------------|----------|
| **CrNav** | Sticky Top-Nav / Scroll-Spy; hostet `CrLangToggle` + Sektions-Anker (**inkl. Chat-Anker**, DD3-b) + **eine** primäre CTA „Kontakt" | default (transparent über Hero) · scrolled (kondensiert, `shadow-overlay`) · section-active (Anker markiert, `aria-current`) · mobile (Hamburger → Radix-Sheet) · focus-visible je Item | Navigation, FR-010 (Toggle-Host), FEAT-008 (Chat-Anker), §2.4.11 |
| **CrProgressLinie** | dezente Scroll-Fortschritts-Linie der Journey (DE1b); füllt ink→electric | scroll-getrieben · reduced-motion (ohne Smoothing) · immer `aria-hidden` | DE1b, NFR-CC-01 |
| **CrLineBackground** | full-bleed dekorative Hintergrund-Spuren („man spürt es mehr, als man es sieht", DC2), evtl. minimales Parallax | motion · reduced-motion (statisch) · immer `aria-hidden` | Leitmotiv, NFR-CC-01/-04 |
| **CrHero** | Above-the-fold: gezeichneter Namenszug + **materialisierender** Pitch + Scroll-Hinweis | draw+materialize (motion) · static (reduced-motion) · loaded · 360 px (kein Overflow) | FEAT-001 (FR-001-01…05), DC1 |
| **CrSectionHeader** | Mono-Eyebrow + Display-Titel + gezeichnete Underline + Caret-Tick | default · in-view (Underline-Draw + Materialisierung) · reduced-motion | Querschnitt |
| **CrTimeline** | verwobene Berufs-+Bildungs-Timeline; die **Linie** ist das Rückgrat (Sicherheitszone: ruhig, DC3) | default · Station-hover · Station **mit** Referenz (Link-Affordanz) vs. **ohne** (keine) · Logo vorhanden vs. **Text-Fallback (h_da)** · mobile gestapelt | FEAT-003 (FR-003-01…06) |
| **CrKompetenzLinie** | d3-Kompetenz-Linie durch **vier ruhige Stationen** + durchlaufender KI-Faden; **Tiefe = Fakten** (DD1-b, **kein** Amplituden-Band) | loading-Skeleton (lazy) · interaktiv (Station-hover/-focus) · expanded (Detail-Bereich/Aufklapper mit Jahren/Schwerpunkten/Belegen) · desktop-horizontal / mobil-vertikal · reduced-motion (statisch) | FEAT-004 (FR-004-01…07) |
| **CrRefCard** | Referenz-Galerie-Karte: Visual · Kontext (2–3 Sätze) · Rolle · Stack-Tags · optionaler Link | default · hover (lift) · focus · **kein-Link** (keine tote Affordanz) · **abstraktes Visual** (PromotionPlanner, keine Screenshots) | FEAT-006 (FR-006-01/06/10) |
| **CrRefModal** | URL-synchronisiertes Detail-Modal (List→Detail); klein=Vollbild, groß=großzügig zentriert | opening · open (Fokus-Falle) · closing (Fokus-Rückgabe) · loading · **not-found** (unbekannte ID → Galerie, kein Fehler) · Browser-Zurück schließt | FEAT-006 (FR-006-02/03/04), ADR-0005 |
| **CrMuseumFrame** | **Screenshot-primärer** „Museums-Rahmen" (Exponat-Craft-Objekt; §6.1) — hält fremdes Alt-Design „hinter Glas" | **screenshot** (Ausgangszustand, Desktop **und** mobil) · loading (Skeleton, reservierte Box) · **„Live öffnen"-Link vorhanden** vs. **keine URL → kein Link** · **iframe optional/stabil** (nur wo aktiviert) · reduced-motion | FEAT-007 (FR-007-02/03/04, **revidiert DD2**) |
| **CrEvolutionThread** | Generationen-Faden, hostet je Knoten `CrMuseumFrame` | default · Knoten-active · reduced-motion (Faden statisch) | FEAT-007 (FR-007-01/05) |
| **CrResponsibilityCard** | Verantwortungs-/Wissensweitergabe-Karte (4–6) | default · hover · focus; **nur belegbare** Karten (nie mit weichen Claims auffüllen) | FEAT-005 (FR-005-01/02) |
| **CrChat** | **als eigene, prominent inszenierte Sektion** (DD3-b — **kein** gedockter Launcher): persönliche Erstnachricht, vordefinierte Fragen (Chips), kuratierte Antwortkarten, Relay-Aktion mit E-Mail-Feld; **kein Freitextfeld in M1**; **kein Servicebot-Look** | intro (Erstnachricht materialisiert) · idle (Fragen-Chips) · question-selected · answering (gestaffelter Reveal) · relay-prompt · relay-email-input · relay-sending · relay-success (**Abschluss-Moment §5.5**) · relay-error (Retry) · **degraded** (Cap/Offline → geführter Fallback-Banner) | FEAT-008 (FR-008-01/02/03/04), FEAT-009 (Relay) |
| **CrLangToggle** | DE/EN-Umschalter — **navigiert zwischen den Sprach-URLs** (`/` ⇄ `/en`, URL = Source of Truth, RV-03); persistiert Wahl in localStorage | DE-active (`/`) · EN-active (`/en`) · focus (`aria-current`/`aria-pressed`) · Deep-Link-Pfad bleibt beim Umschalten erhalten | FEAT-010 (FR-010-02/04), RV-03 |
| **CrContactForm** | Lean-Formular (Name, E-Mail, Nachricht) + unsichtbarer Honeypot (Sicherheitszone: ruhig, DC3) | idle · validating · sending · **success (Abschluss-Moment §5.5)** · error (Inline-Retry, Eingaben erhalten) · rate-limited (freundlicher Hinweis) | FEAT-009 (FR-009-01/04/06) |
| **CrProfileLinks** | GitHub · GitLab · LinkedIn (bedingt) | vollständig · **LinkedIn fehlt → Link entfällt** (kein Dead Link) | FEAT-009 (FR-009-08) |
| **CrFooter** | Footer: Impressum-/Datenschutz-Links, **öffentliches Repo**-Link, Profil-Links | default · focus je Link | FEAT-012 (Links), FEAT-007 (Repo), FEAT-009 (Links) |
| **CrTerminalEgg** | verstecktes Terminal (`help`, `whoami`, `skills`, `contact`) + Konsolen-Gruß | hidden · open · command · **unknown-command → Verweis auf `help`** · reduced-motion (Cursor statisch) · Touch (kein Hover-Zwang) | FEAT-013 (FR-013-01/02/03/04) |
| **CrButton** / **CrIconButton** | Aktions-Primitive; **primary=Elektroblau-Fill** (workflow-treibend), **secondary=Ink-Outline**, **ghost** | default · hover (`shadow-raised`) · focus (Elektro-Ring) · active · disabled · loading | Aktions-Hierarchie (§7) |
| **CrTag** | Mono-Stack-Tag-Chip (2 px Radius) | default · hover (Border→electric) | FEAT-006 |
| **CrStat** | Mono-Zahl-Statement (35 Tage / 13 Länder / 30 Shows) | default · in-view (Reveal/Materialisierung) · reduced-motion (Zahl sofort) | FEAT-002 |
| **CrPortrait** | Porträt mit Platzhalter-/Leer-Handling | Bild vorhanden · **helles Porträt fehlt → dunkles median-Foto** · **kein Bild → definierter Leer-Zustand** (kein defektes Bild, Layout bricht nicht) | FEAT-002 (FR-002-05/06) |

> **Entfallen ggü. Erst-Fassung: `CrChatLauncher` / gedockte Chat-Pill.** DD3-b verbietet den
> persistenten Launcher (Servicebot-Muster). Der Chat wird ausschließlich über die **dedizierte
> Sektion** und den **Nav-Anker** erreicht (§6.2). Ebenfalls entfallen: die Framing-Timeout-Heuristik
> als Kern-Pfad von `CrMuseumFrame` (Screenshot ist jetzt Ausgangszustand, nicht Fallback; §6.1).

> **State-Management (ADR-0005):** TanStack Query für asynchrone Ränder (Function-Aufrufe:
> Kontakt/Relay, später Chat-LLM); **lokaler Komponenten-State** für UI-Zustand; offenes Modal +
> Sprache über **URL bzw. localStorage**. **Kein globaler Store** (kein Zustand/Redux — der
> Zustandsbedarf ist gering).

### 6.1 `CrMuseumFrame` als Craft-Objekt (DD2 — neu gestaltet)

Der Rahmen zeigt **alte Fremd-Designs** (lookup/lookdown/median) — er muss sie **fassen, ohne dass
ihre fremde Ästhetik die neue bricht**. Gestaltungs-Entscheidung: ein **Exponat-Rahmen**, der das
alte Design **„hinter Glas" versenkt** subordiniert:

- **Passe-partout / Mat** in neutralem Ton (Card-Weiß bzw. `secondary`) + **12-px-Außenkante**
  (`shadow-card`), so dass der Rahmen ein ruhiges Objekt auf dem Canvas ist.
- **Screenshot recessed** (leichter Inner-Shadow / feine `border`-Innenkante) — das alte Design sitzt
  **eingelassen** und liest als **Artefakt im Schaukasten**, dem neuen Rahmen untergeordnet.
- **Mono-Plakette** (JetBrains Mono, `muted-foreground`): Generationsname · Jahr · **eine Zeile Lektion**
  („was diese Generation gelehrt hat") — informativ, kein Museums-Plaketten-**Pastiche** (R3 abgelehnt).
- **Motiv-Anbindung:** der Evolution-Faden **berührt** den Rahmen an einem Elektro-Tick (Knoten),
  so bleibt das Exponat Teil der „einen Linie".
- **„Live öffnen"** = `a[target=_blank][rel=noopener]` mit `external-link`-Icon (Utility-Aktion,
  **kein** Elektro-Fill, §7); erscheint **nur**, wenn eine URL konfiguriert ist. Optional-iframe nur
  dort, wo stabil (FR-007-04) — der Screenshot bleibt der Ausgangszustand (FR-007-03).

### 6.2 `CrChat` als **Exponat**, nicht Widget (DD3-b — neu inszeniert)

Der Chat ist das Signature-AI-Element (SC-1) und wird als **inszenierte Sektion** zwischen Evolution
und Kontakt gestaltet — als **kuratiertes Gesprächs-Exponat**, nicht als schwebendes Servicebot-
Widget:

- Ein komponiertes **Conversation-Panel** (Card-Weiß, `shadow-card`), in das der Signature-Faden
  **hineinführt** (die Linie „mündet" in die Konversation).
- Die **Erstnachricht materialisiert** (Caret-Tick, §5.2) im Du-Ton — sichtbar als „die KI schreibt",
  passend zur These.
- **Fragen-Chips** als echte Buttons; **kuratierte Antwortkarten** materialisieren gestaffelt;
  **Relay-Aktion** als die **eine primäre CTA** dieser Sektion.
- **Kein** persistenter Launcher, **keine** Andockung. Erreichbar über Scroll + `CrNav`-Anker
  („Frag KI-Matthias").

---

## 7. Aktions- & CTA-Hierarchie (fw-ADR-0040)

- **Eine primäre CTA pro Screen/Sektion.** Der Elektroblau-**Fill** (`primary`) ist **reserviert für
  die workflow-treibende Aktion** (Kontakt aufnehmen / Nachricht senden / Chat starten / Relay
  senden). Utility-/Sekundär-Aktionen („Live öffnen", Sprache, Galerie-Navigation) sind
  **Ink-Outline** oder **ghost** — **nie** Elektro-Fill. Eine Sektion, deren lautester Button eine
  Sekundär-Aktion ist, ist ein Defekt (invertierte Hierarchie).
- **Elektroblau-Regel (Motiv vs. Aktion):** Elektro-**Fill** = die eine Aktion; Elektro-**Stroke**
  (feine gezeichnete Linie, Signatur, KI-Faden, **gefüllte Fortschritts-Linie**) = **Brand-Motiv**
  (dekorativ, `aria-hidden`). Der `reviewer` prüft: **nicht mehr als ein** Elektro-gefüllter
  Primär-Button je Viewport.

---

## 8. Accessibility-Baseline (WCAG 2.2 AA / NFR-CC-01, verbindlich)

- **Kontrast (§1.4.3/1.4.11):** alle in Nutzung befindlichen Token-Paare erfüllen AA auf **beiden**
  Temperatur-Polen — Belege in §1.1/§1.2: `foreground` 16–17,8:1 · `muted-foreground` 6,2–6,9:1 ·
  `primary`-Text 5,1–5,6:1 · CTA-Label weiß-auf-Elektro 5,6:1 · `destructive` 5,7:1 · `input`-Border
  3,8–4,3:1 · Fokus-Ring ≥5:1. **Die hellsten Grautöne (`line-faint` u. ä.) sind dekorativ-only — nie
  Body-, Meta-, Timestamp-, Breadcrumb- oder Helper-Text.**
- **Sichtbarer Fokus (§2.4.7/2.4.13):** Elektro-Ring `2 px` + `2 px` weißer Offset (Box-Shadow-
  Technik) — sichtbar auf Weiß **und** Elektro-Fill. Fokus nie durch Sticky-`CrNav` verdeckt (§2.4.11).
- **Volle Tastatur-Bedienbarkeit (§2.1.1):** `CrRefModal` (Fokus-Falle, ESC, Fokus-Rückgabe),
  `CrChat` (Chips als Buttons, logische Tab-Ordnung, Relay-Feld), `CrLangToggle` (`aria-current`),
  `CrKompetenzLinie` (jede Station fokussier-/aufklappbar, `aria-expanded`), Timeline-Links,
  `CrTerminalEgg`.
- **Touch-Targets (§2.5.8):** interaktive Ziele **≥ 44×44 px** komfortabel (Minimum 24 px);
  Chips/Tags mit ausreichend Padding.
- **Dekorative Linien nie informationstragend (NFR-CC-01):** `CrLineBackground`, `CrProgressLinie`,
  Signatur, KI-Faden, Evolution-Faden sind für Hilfstechnik `aria-hidden`; alle so kodierten
  Informationen (Fortschritt via Scroll-Spy, Generationen-Reihenfolge via Liste, Erfahrungstiefe via
  Stations-Fakten) sind **zusätzlich textuell/strukturell** vorhanden.
- **Reduced-Motion-Parität (§2.3.3):** zu jeder Animation ein gleichwertiger statischer Zustand (§5.6)
  — kein Informationsverlust; insbesondere die **Materialisierungs-Sprache** (Endzustand sofort, kein
  Caret) und die **Scroll-Fortschritts-Linie** (ohne Smoothing).
- **Text-Resize (§1.4.4/§1.4.10):** clamp-basierte Skala, keine fixen px-Fallen; bei 200 % Zoom kein
  Abschnitt/keine Bedienung verloren, kein H-Scroll.
- **Sprache & hreflang (§3.1.1/3.1.2):** `<html lang>` folgt der aktiven Sprache; DE/EN wechselseitig
  per `hreflang` verknüpft (FR-011-02); Sprachwechsel aktualisiert `lang`. **Impressum nur DE** (RV-09).
- **Fehler-Identifikation (§3.3.1/3.3.3):** `CrContactForm`/Relay benennen Fehler textuell +
  programmatisch (`aria-describedby`, `aria-invalid`), Eingaben bleiben erhalten (Retry ohne
  Datenverlust); **Redundant Entry (§3.3.7):** eine im Chat bereits erhobene E-Mail wird im
  Relay/Formular vorbelegt.

Diese ACs sind als **deterministische business-e2e rendered/a11y-Journeys** testbar (Playwright
Computed-Style **an beiden Temperatur-Polen**, sichtbarer Fokus/Tastatur, `axe`-Scan über
repräsentative Routen) — kein menschliches Visual-Approval-Gate.

---

## 9. Ton & Copy

- **Du-Ansprache, Ich-Perspektive** durchgehend (FR-CC-02), „Mensch hinter dem Code".
- **DE Default / EN vollständig** (FR-CC-01); Eigennamen unübersetzt. **Impressum nur DE** (RV-09).

### 9.1 Hero-Pitch (FR-001-01, DC1b) — neue Richtung „Experienced Developer shaping AI-powered Software"

Der Pitch **ersetzt** die alte Arbeitsfassung („State-of-the-art AI-Entwicklung…"). Er
**materialisiert** unter dem gezeichneten Namenszug als **die eine Pitch-Zeile** (DC1b-a).

✅ **Gate-Entscheidung (Owner, 2026-07-16): V1 gewählt.** Die Pitch-Zeile lautet
**„Experienced developer shaping AI-powered software."** und bleibt **in beiden Sprachfassungen
englisch** — sie erscheint auch auf der deutschen Seite **unübersetzt**. Der Pitch wird als
**Brand-Claim** behandelt: eine bewusste, owner-approved Ausnahme von FR-CC-01 (analog zur
Eigennamen-Regel). Die deutsche V1-Fassung entfällt.

Darüber steht ein **Mono-Kicker**, der **normal übersetzt** wird: DE „12 Jahre Softwareentwicklung" /
EN „12 years of software development". Kicker + Pitch tragen in ~5 s sowohl **Klarheit** (was
Matthias tut) als auch **Beleg** (Erfahrung), ohne die eine Zeile zu überladen (DC1b-a: eine Zeile).

**Verworfene Alternativen** (dokumentiert, nicht umgesetzt):

- ~~**V2 (Ich/Du, Nutzwert + Erfahrungs-Beleg):**~~ *(verworfen)*
  DE „Ich baue KI-gestützte Software — auf 12 Jahren Entwicklungserfahrung."
  EN „I build AI-powered software — on 12 years of engineering experience."
- ~~**V3 (Zweizeiler, thesen-resonant):**~~ *(verworfen)* Headline DE „12 Jahre Code. Jetzt: KI, die mitschreibt."
  Sub „Erfahrener Entwickler, der KI-gestützte Software gestaltet." /
  EN Headline „12 years of code. Now: AI that writes along." Sub „Experienced developer shaping
  AI-powered software." — *„mitschreibt/writes along" spielt bewusst auf „Die Linie, die schreibt"
  und die KI-geschriebene Seite an.*
- ~~**V4 (sehr knapp):**~~ *(verworfen)* DE „Erfahrener Entwickler. KI-gestützte Software." / EN „Experienced
  developer. AI-powered software."

### 9.2 Weitere Copy-Bausteine

- **Linux/Terminal-Hook (FR-004-07 / FEAT-013) — nicht wörtlich** „Das Terminal ist meine Heimat"
  (I3, Owner findet das wörtlich „cringe"). Richtungen (Owner wählt): „Wo andere klicken, tippe ich."
  · „Am liebsten mit den Fingern auf der Tastatur." · „Meine Werkbank ist die Kommandozeile." · als
  Mono-Marker im Stations-Detail: `matthias@linux:~$ whoami`.
- **Chat-Erstnachricht (FR-008-01, Du-Ton, kein Servicebot):** z. B. „Hey, ich bin's — na ja, meine
  KI-Version. Frag mich was." / EN „Hey — it's me, well, my AI version. Ask me something."
- **Erfolgs-/Abschluss-Copy (DE1b, §5.5):** Kontakt „Angekommen. Ich melde mich bei dir." / EN
  „Got it. I'll get back to you." — Relay analog im Du-Ton; **kein** stiller Reset, ein spürbarer
  Abschluss.
- **Museums-Plaketten-Zeile (§6.1):** je Generation eine Mono-Zeile „was sie gelehrt hat" (informativ,
  kein Pastiche).
- **Konsolen-Gruß (FR-013-02):** „Hey — du schaust also unter die Haube. Respekt. Tipp mal `help` ins
  versteckte Terminal auf der Seite. — Matthias" (technisch, kein Emoji, Du-Ton).

---

## 10. Brand-Mark (DE2)

- **Wortmarke:** der gezeichnete **„Matthias"-Schriftzug** als animierter SVG-Stroke (Plotter-/
  Oszilloskop-Ästhetik, `ink`-Stroke, Elektro-Highlight im Draw). **Keine** Handschrift/Papier-Optik,
  **kein** Bild der echten Unterschrift (DE2).
- **Favicon / Monogramm:** ein aus **einer durchgehenden Plotter-Linie** geformtes **„M"** in `ink`
  auf Weiß; Elektro-Variante für dunkle Kontexte. **Favicon-Größen 16/32 + 180 (apple-touch) +
  SVG-Favicon.** OG-Share-Image (FR-011-05) trägt **Wortmarke + Pitch** auf hellem Grund mit
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
| Alt-Generationen-Screenshots | `CrMuseumFrame` | **Screenshot ist Ausgangszustand** (DD2); fehlt einer, definierter neutraler Exponat-Platzhalter, nie leerer Rahmen |
| median-Rechtstexte | Impressum/Datenschutz | Draft-Status, „vor Go-Live durch Owner geprüft" (FR-012-04) |

---

## 12. Engagement & Experience (framework-owned; DE1 — Owner-Entscheidungen)

Drei Entscheidungen, im Grill ratifiziert. **Die Business-Kontext-Priorität bleibt oberste
Leitplanke** (Engagement dient dem Task, nie Gamification); jedes Device respektiert Brand, den
WCAG-Floor und `prefers-reduced-motion`.

- **(a) Reduktion kognitiver Last / progressive Offenlegung — ANGENOMMEN.** Überblick zuerst, Tiefe
  auf Abruf: „ein Ding pro Sektion", großzügiger Weißraum (§3.2), List→Detail-Modal (Referenzen),
  Stations-Aufklapper (Kompetenz-Linie), geführte Chat-Chips statt Freitext-Überforderung.
- **(b) Fortschritt & Abschluss — ANGENOMMEN.** Die Signature-Linie ist **zugleich Journey-
  Fortschritt** (`CrProgressLinie`, DE1b, §5.4); Erfolgszustände (Kontakt/Relay) lesen als **kleiner
  Abschluss/Achievement** (§5.5), kein stiller Reset.
- **(c) Personalisierung / Wiederkehr-Begrüßung — BEWUSST ABGELEHNT (DE1c).** catalyst ist eine
  **öffentliche, datensparsame** Seite (NFR-CC-05, ADR-0002); eine personalisierte Begrüßung
  („Willkommen zurück") oder Wiederkehr-Erkennung ist **not in scope for this project**. **Explizite
  Entscheidung, keine stille Auslassung.** (localStorage wird ausschließlich für Sprachwahl genutzt,
  nicht für Personalisierung.)

---

## 13. Pre-Delivery-Checkliste (framework-owned, für jede Oberfläche)

- Icons sind **SVG** (Lucide) — **nie Emoji** als Icon.
- `cursor-pointer` auf **jedem** klickbaren Element.
- **Hover + Focus** auf allen interaktiven Elementen, 150–250 ms Transition; **sichtbarer
  Fokus-Ring** (Elektroblau) für Tastatur-Nav.
- **`prefers-reduced-motion`** für **jede** Animation respektiert (§5.6, volle Parität) — inkl.
  Materialisierungs-Sprache (Endzustand sofort, kein Caret) und Fortschritts-Linie (ohne Smoothing).
- **Responsiv** an 360/768/1024/1440/2560 — **kein** horizontaler Scroll.
- **Temperatur-Verlauf accessibility-neutral:** Text-AA gilt an **beiden** Polen (rendered-Prüfung an
  zwei Scroll-Positionen); Verlauf ist statisch, kein Scroll-Hijacking.
- **Viz-/Chart-Farben** binden an `--viz-line` / `--ki-gradient-*` / `--chart-series-*` — **nie**
  hartkodiertes Hex.
- Überall wo Liste/Galerie: **card-level List→Detail** (`CrRefCard` → `CrRefModal`), kein loser
  Text-Button.
- **Oberflächen-Tiefe vorhanden** — Cards lesen als distinkte Objekte auf **beiden** Polen (Canvas ≠
  Card, echter Border-Step, `shadow-*`); kein Weiß-auf-Weiß.
- **Lesemaß gehalten** — `max-w-content` (~1500 px) + Prosa ~65–75 ch; kein Full-Width-Text auf WQHD.
- **Eine primäre CTA pro Screen** — Elektroblau-Fill markiert die eine workflow-treibende Aktion;
  Utility outline/neutral (inkl. „Live öffnen").
- **Text erfüllt AA** — Body/Meta/Timestamp/Helper ≥ 4,5:1 auf beiden Polen; hellste Grautöne
  dekorativ-only.
- **Kein Chat-Launcher/Dock** (DD3-b) — Chat nur als Sektion + Nav-Anker.
