# UX-Flows — catalyst

> Key-Flows der Personal Page `matthias-feyll.de`. Autor: `/design` (ui-ux-Subagent). Konform zu
> `design-system.md` (Tokens, Temperatur-Verlauf, Materialisierungs-Motion, Cr*-Komponenten,
> A11y-Baseline) und ADR-0005 (Routing/State/i18n/Viz). Jeder Flow: Zweck · Zustände
> (Happy/Fehler/Leer/Fallback) · Responsive/Mobile · Motion & reduced-motion · testbare A11y-ACs ·
> FR-Trace.
>
> **Vollständige Neu-Fassung (/design-Re-Entry 2026-07-16)** gegen den Brief „Die Linie, die
> schreibt". Wesentliche Änderungen ggü. Erst-Fassung: **kein gedockter Chat-Launcher** (DD3-b),
> **Evolution screenshot-primär** (DD2), **Temperatur-Verlauf + Fortschritts-Linie in Flow 0**
> verankert (DC2/DE1b), Kompetenz-**Linie** statt gewelltem Band (DD1-b).
>
> Konventionen: **eine** scroll-getragene Hauptroute je Sprache (`/`, `/en`); Referenz-Detail als
> URL-synchronisierte **Modal-Route**; Impressum/Datenschutz eigene Routen (ADR-0005). Light-only M1.

---

## Flow 0 — Scroll-Journey (Haupt-Reise) + Temperatur-Verlauf + Fortschritts-Linie

**Zweck.** Die lineare Erzählung, die HR (P1) in ~5 s abholt und mit steigender AI-native-
Dramaturgie zum Gespräch führt; P2 findet Tiefe entlang des Wegs. Der EINE Job: die **Machart der
Seite ist der Beweis des Pitch** (§0.1 design-system.md).

### Sektions-Reihenfolge (LOCKED, Brief-Punkt 11)

| # | Sektion | Feature | Kern | Temperatur-Zone |
|---|---------|---------|------|-----------------|
| 1 | **Hero & Pitch** | FEAT-001 | gezeichneter Namenszug + materialisierender Nutzwert-Pitch (5-s-Klarheit) | kühl (technisch) |
| 2 | **Über mich** | FEAT-002 | „Mensch hinter dem Code" — Hook, Du-Ton, Band-Stats | kühl → neutral |
| 3 | **Karriere-Timeline** | FEAT-003 | Credibility; die Linie als Rückgrat (Sicherheitszone, ruhig) | neutral |
| 4 | **Kompetenz-Linie** | FEAT-004 | Generalisten-Narrativ; vier Stationen; KI-Faden durchgehend | neutral |
| 5 | **Verantwortung** | FEAT-005 | Charakter/Engagement, belegbar | neutral → warm |
| 6 | **Referenzen** | FEAT-006 | greifbare Projekt-Belege (P2-Tiefe) | warm |
| 7 | **Evolution-Story** | FEAT-007 | Lern-Narrativ; endet auf „catalyst = 1. KI-geschriebene Generation, siehe Repo" | warm |
| 8 | **KI-Matthias-Chat** | FEAT-008 | inszeniertes Gesprächs-Exponat; Signature-AI; Brücke in den Kontakt | warm |
| 9 | **Kontakt & Relay** | FEAT-009 | die Handlungsaufforderung — am **menschlichsten** (wärmsten) Pol | warm (menschlich) |
| 10 | **Footer** | FEAT-012/007/009 | Impressum-/Datenschutz-Links, Repo-Link, Profil-Links | warm |

**Dramaturgie-Begründung.** Die Reihenfolge ist owner-locked. Sie deckt sich mit dem
**Temperatur-Verlauf** (DC2): oben kühl-technisch (Hero, Pitch, Werdegang, Kompetenz), unten
warm-menschlich (Referenzen als greifbares Werk → Evolution als Lernender → **Chat = sprich mit der
KI** → **Kontakt = sprich mit dem Menschen**). „Je tiefer du scrollst, desto näher kommst du dem
Menschen." Der Chat ist Signature-Element, **nicht** der Hero (FR-008-04) — daher hoch, aber nicht
oben.

**Persistent, sektionsübergreifend:**
- `CrNav` (Scroll-Spy + `CrLangToggle` + **eine** CTA „Kontakt" + Sektions-Anker inkl. **Chat-Anker**
  „Frag KI-Matthias").
- `CrProgressLinie` — die dezente **Scroll-Fortschritts-Linie** (DE1b): füllt sich ink→electric mit
  der Reise, `aria-hidden`, rein dekorativ (die navigierbare Positions-Info trägt der Scroll-Spy).
- `CrLineBackground` — full-bleed **Hintergrund-Spuren** (DC2: „man spürt es mehr, als man es sieht"),
  `aria-hidden`.
- **KEIN gedockter Chat-Launcher** (DD3-b, Änderung ggü. Erst-Fassung).

### Temperatur-Verlauf (DC2 — verankert)

- Der Seiten-Canvas ist **ein statischer, seitenlanger Verlauf** `canvas-cool` (#F0F3F7, oben) →
  `canvas-warm` (#F7F3EC, unten), Hue-Journey bei **konstanter Luminanz** (L≈0,90) → **unmerklich**
  und **accessibility-neutral** (§1.2 design-system.md). **Kein** Scroll-Hijacking, **kein**
  JS-Scroll-Listener — nur ein `background-image`.
- **Cards bleiben reines Weiß durchgehend** (ruhiger Anker); am warmen Pol heben sie sich sauber ab.
- **Kein** Textelement hängt für seine Lesbarkeit am Verlauf: alle Text-/UI-Paare halten AA an
  **beiden** Polen (§8 design-system.md).

### Zustände

- **Happy (Motion an):** orchestrierter Page-Load — Namenszug zeichnet sich (~1,5 s), Pitch
  **materialisiert** (Fade+Rise + Caret-Tick), Scroll-Hinweis zuletzt. Beim Scrollen materialisiert
  je Sektion der `CrSectionHeader` + Inhalt (einmalig, IntersectionObserver); Sektions-Linien
  zeichnen sich; `CrProgressLinie` füllt sich; Hintergrund-Spuren parallaxen dezent.
- **reduced-motion:** Namenszug + Pitch + alle Sektions-Linien + Inhalte **sofort** im Endzustand;
  **kein** Caret, kein Rise, kein Parallax; Fortschritts-Linie folgt Scroll ohne Smoothing; volle
  inhaltliche Parität (FR-001-03/-05, NFR-CC-01).
- **Leer/langsame Verbindung:** Pitch + Name sind **text-first**, sofort lesbar, unabhängig von der
  Animation (FR-001-05); Kompetenz-Linie/Chat lazy mit Skeleton-Platzhalter (reservierte Layout-Box
  gegen CLS, NFR-CC-02).
- **Fehler:** ein lazy-Chunk (Kompetenz-Linie/Chat) lädt nicht → statischer Parität-/Retry-Zustand
  statt leerer Fläche.

### Responsive/Mobile

- 360 px: einspaltig, Daumen-Scroll; Content-Cap greift erst ab ~1500 px, Motiv full-bleed.
- `CrNav` mobil = Hamburger → Radix-Sheet; CTA „Kontakt" + Chat-Anker bleiben erreichbar.
- Details siehe **Flow 6 (Mobile-Journey)**.

### A11y-ACs (testbar)

- Skip-Link „Zum Inhalt" als erstes fokussierbares Element; Sektionen sind `<section>` mit
  `aria-labelledby` (§1.3.1).
- Scroll-Hinweis ist tastaturerreichbar und aktivierbar (FEAT-001-AC).
- `CrNav`-Scroll-Spy verdeckt fokussierte Elemente nicht (§2.4.11); aktueller Anker hat
  `aria-current`.
- **Temperatur-Verlauf:** Computed-Style von Meta-/Body-/Link-Text erfüllt ≥4,5:1 an **zwei**
  Scroll-Positionen (kühler Pol: Hero/Timeline; warmer Pol: Kontakt) — objektiv testbar (§1.2
  design-system.md).
- `CrProgressLinie` + Hintergrund-Spuren sind `aria-hidden`; Fortschritts-Info zusätzlich über den
  Scroll-Spy (nicht allein dekorativ getragen).
- Bei 200 % Zoom kein Inhaltsverlust, kein H-Scroll (§1.4.4).
- `<html lang>` = aktive Sprache; dekoratives Linien-Motiv `aria-hidden` (NFR-CC-01).

**FR-Trace:** FEAT-001…009 (Reihenfolge), FR-CC-01/-02, NFR-CC-01/-02/-04; DC2 (Verlauf), DE1b
(Fortschritts-Linie), DD3-b (kein Launcher).

---

## Flow 1 — Referenz-Detail (Karte → Modal, URL-Sync, Deep-Link)

**Zweck.** Greifbare Projekt-Belege ohne HR zu überfordern; teilbare Deep-Links (P2). Sitzt am
warmen Pol (greifbares Werk).

### Schritte & Zustände

1. **Galerie** (`CrRefCard`-Raster): je Karte Visual · Kontext (2–3 Sätze) · Rolle · Stack-Tags ·
   optionaler ausgehender Link (FR-006-01). Karten materialisieren beim In-View (gestaffelt).
2. **Aktivieren** (Klick/Enter/Space auf Karte) → `CrRefModal` öffnet; **URL wechselt** auf die
   Deep-Link-Route (`/ref/<id>` bzw. `/en/ref/<id>`), History-Push (FR-006-03).
3. **Modal offen:** klein=Vollbild (mit Scroll), groß=großzügig zentriert (FR-006-02); Fokus-Falle;
   Titel fokussiert; `shadow-overlay`, Backdrop-Dimm.
4. **Schließen** via X / ESC / Backdrop-Klick / **Browser-Zurück** → Modal schließt, URL zurück auf
   Galerie, **Fokus zurück** auf die auslösende Karte (FR-006-04).

- **Happy:** Deep-Link teilbar; direkter Aufruf der URL lädt Seite mit **direkt geöffnetem** Modal
  (FR-006-03).
- **Leer/Fallback — unbekannte ID:** Deep-Link auf nicht existierende Referenz → **Galerie ohne
  offenes Modal**, definierter Fallback, **kein** Fehlerzustand (ADR-0005).
- **Leer — kein Link:** Referenz ohne ausgehenden Link zeigt **keine** tote Link-Affordanz
  (FR-006-10).
- **Sonderfall — PromotionPlanner:** **kein** Produkt-Screenshot; **abstraktes Visual** („Excel-Chaos
  → strukturiertes System"), text-only Kontext (FR-006-06). `assets/reservix/*` wird **nicht**
  verwendet.
- **Sonderfälle — VUSC / Hornetsecurity:** je **genau ein** ausgehender Link auf die öffentliche
  Seite, keine vertraulichen Inhalte (FR-006-07/08).
- **Fehler:** kein Netzwerk-Rand im Modal (statischer Inhalt) → keine Ladefehler möglich; ein nicht
  ladendes Visual fällt auf ein neutrales Platzhalter-Visual zurück.

### Responsive/Mobile

- < md: Vollbild-Modal mit Scroll, kein abgeschnittener Inhalt; Schließen-Button (≥44 px) oben
  erreichbar (Daumen).
- ≥ lg: zentriertes Modal, `shadow-overlay`, Backdrop-Dimm.

### A11y-ACs (testbar)

- `role="dialog"` + `aria-modal="true"` + `aria-labelledby` (Titel); Fokus-Falle hält Fokus im Modal;
  ESC schließt (§2.1.1/§2.1.2).
- Beim Schließen **Fokus-Rückgabe** an die auslösende Karte (§2.4.3).
- Karte ist ein echtes interaktives Element (`button`/`a`), Enter+Space aktivieren; `cursor-pointer`.
- Ausgehende Links: `rel="noopener"` + erkennbares externes-Link-Icon mit `aria-label`.

**FR-Trace:** FEAT-006 (FR-006-01…10), ADR-0005 (Modal-Route, List→Detail), NFR-CC-01/-04.

---

## Flow 2 — Kompetenz-Linie (vier Stationen, KI-Faden, Fakten-Tiefe) — NEU (DD1-b)

**Zweck.** Das Generalisten-Narrativ visuell: eine durchgehende Linie durch alle Disziplinen, KI
durchdringt alle. Signature-Visual (SC-3), ruhig gestaltet (Sicherheitszone-Ausnahme: hier darf es
eigenwillig sein, DC3).

### Schritte & Zustände

1. **Ruhe-Darstellung:** eine **durchgehende, ununterbrochene Linie** (`viz-line` = Tinte) fließt
   durch **vier Stationen — Frontend · Backend · Architektur · DevOps/Cloud** (FR-004-01). Die Linie
   ist **ruhig** (gerade/sanft geschwungen), **keine** informationstragende Amplitude (DD1-b). Ein
   **KI-Faden** (`--ki-gradient-*`, Blau→Cyan) läuft über die **gesamte Länge** parallel/überlagert
   mit (FR-004-03) — KI durchdringt alle Disziplinen, kein eigener Abschnitt.
2. **Station aktivieren** (Klick/Tap/Enter/Space) → **Detail** öffnet: Desktop im **Detail-Bereich**
   unter der Linie, Mobil als **Aufklapper** an der Station (FR-004-04). Detail enthält die
   **Erfahrungstiefe als Fakten** (Jahre · Schwerpunkte · Belege, FR-004-02) — **nicht** grafisch
   kodiert.
3. **DevOps/Cloud-Station:** enthält den **Linux/Terminal-Marker** `matthias@linux:~$` (FR-004-07),
   Copy nicht wörtlich „Das Terminal ist meine Heimat" (I3).
4. **Schließen** der Station: Detail klappt zu; Fokus bleibt auf der Station.

- **Happy:** Linie + KI-Faden zeichnen sich beim In-View (einmalig); Stationen aktivierbar.
- **Leer/lazy:** d3 wird **lazy** geladen; Skeleton in reservierter Box (kein CLS, NFR-CC-02).
- **Fehler:** d3-Chunk lädt nicht → statische Linien-Grafik + Stations-Fakten als Text-Fallback
  (Information bleibt vollständig).
- **reduced-motion:** Linie + KI-Faden **sofort** vollständig; Stationen bleiben aktivier-/
  aufklappbar; KI-Faden statisch.

### Responsive/Mobile

- **Desktop (≥ md):** Linie **horizontal**, vier gleich-verteilte Knoten, Detail-Bereich darunter.
- **Mobil (< md):** Linie **vertikal**, Stationen gestapelt, Tap → Aufklapper darunter — **inhaltliche
  Parität** zur Desktop-Fassung (FR-004-05).

### A11y-ACs (testbar)

- Jede Station ist per Tastatur fokussier- und aktivierbar; `aria-expanded` spiegelt den Detail-
  Zustand; Enter/Space öffnen/schließen (§2.1.1).
- Die **Erfahrungstiefe je Disziplin** ist **textuell** ablesbar (Fakten in der Station) — nicht nur
  grafisch getragen (NFR-CC-01); Linie/Faden `aria-hidden`.
- Reihenfolge der Disziplinen ist als semantische Struktur (Liste/`<ol>`) vorhanden.
- **Keine** Verlinkung von Disziplinen auf Referenzen (FR-004-06) — keine tote Affordanz.
- reduced-motion: statische Nutzbarkeit, kein Informationsverlust (§2.3.3).
- Station-Marker (`--chart-series-*`) sind grafisch ≥3:1; alle **Labels/Fakten** in
  `foreground`/`muted-foreground` (AA-Text).

**FR-Trace:** FEAT-004 (FR-004-01…07, **revidiert DD1-b**), NFR-CC-01/-02/-04, FR-CC-01.

---

## Flow 3 — Evolution-Museum (screenshot-primär, „Live öffnen", iframe optional) — NEU (DD2)

**Zweck.** Vier Generationen als Lern-Narrativ; die Alt-Apps als Exponate zeigen, **ohne**
Hosting-Annahme und ohne fremdes Alt-Design in die neue Ästhetik einzuschleppen.

### Schritte & Zustände

- **Narrativ:** `CrEvolutionThread` zeigt den durchgehenden Faden lookup → lookdown → median →
  **catalyst**; catalyst ist als **vollständig KI-geschrieben** ausgewiesen und **verlinkt sein
  öffentliches Repository** (FR-007-01/05).
- **Primärdarstellung (Desktop UND mobil):** je Generation ein **kuratierter Screenshot** im
  `CrMuseumFrame` (§6.1 design-system.md) — das Exponat-Craft-Objekt, das das Alt-Design **„hinter
  Glas" recessed** hält (Passe-partout + Mono-Plakette: Name · Jahr · eine Zeile Lektion). **Der
  Screenshot ist der Ausgangszustand, kein Fallback** (FR-007-03).
- **„Live öffnen":** ist eine URL konfiguriert, erscheint ein `external-link`-**Link** (neuer Tab,
  Utility-Aktion, **kein** Elektro-Fill; FR-007-02). Fehlt die URL → **kein Link**, nur der
  Screenshot (FR-007-04) — kein leerer Rahmen.
- **iframe (optional):** nur dort, wo eine Einbettung sich als **stabil** erweist (FR-007-04); der
  Screenshot bleibt der Ausgangszustand. Die frühere Framing-Timeout-Heuristik ist **nicht mehr
  Kern-Pfad** (RV-08 entschärft, DD2).

- **Happy:** alle vier Exponate mit Screenshot; erreichbare Alt-Apps zusätzlich „Live öffnen".
- **Leer/Fallback — keine URL / App down / Framing verweigert:** in **allen** Fällen trägt der
  Screenshot durchgehend; **nie** ein defekter/leerer Rahmen (FR-007-03, AC).
- **Fehler:** ein „Live öffnen"-Ziel kann ins Leere führen (Alt-App down) — die Darstellung bricht
  nicht, der Screenshot trägt.

### Responsive/Mobile

- **Identische** Screenshot-Primärdarstellung im Museums-Rahmen (Desktop und mobil), inhaltliche
  Parität (FR-007-02). Rahmen mit reservierter Layout-Box (kein CLS).
- Desktop: Rahmen nebeneinander/gerastert (≥ lg); mobil gestapelt.

### A11y-ACs (testbar)

- Jedes Screenshot-`img` hat ein aussagekräftiges `alt` (Generation + Kurzbeschreibung); jeder
  optionale `iframe` einen `title`.
- „Live öffnen" ist ein echtes `a[target=_blank][rel=noopener]` mit erkennbarem/angesagtem Verhalten.
- Faden/Linien `aria-hidden`; die Generationen-Reihenfolge ist **zusätzlich textuell** (Liste)
  vorhanden (NFR-CC-01).
- Repo-Link tastaturerreichbar; Fokus sichtbar.

**FR-Trace:** FEAT-007 (FR-007-01…05, **revidiert DD2**), NFR-CC-01/-02/-04. RV-08 bewusst entschärft
(Screenshot-primär).

---

## Flow 4 — KI-Matthias-Chat (geführt, M1, als Sektion — kein Dock) + Relay — NEU (DD3-b)

**Zweck.** Signature-AI-Element (SC-1); geführt, deterministisch, ohne Kosten; **kein
Servicebot-Look**; **kein gedockter Launcher** (DD3-b); führt via Relay in den Kontakt.

### Inszenierung (DD3-b)

Der Chat lebt als **eigene, prominent inszenierte Sektion** zwischen Evolution (7) und Kontakt (9)
+ **Nav-Anker** „Frag KI-Matthias" — **kein** persistenter Launcher-Pill. Gestaltet als
**Gesprächs-Exponat** (§6.2 design-system.md): ein komponiertes Panel, in das der Signature-Faden
hineinführt; die Erstnachricht **materialisiert** (die KI „schreibt", passend zur These).

### Schritte & Zustände (geführt, M1)

1. **Erreichen:** Scroll in die Sektion oder Klick auf den Nav-Anker.
2. **intro:** **persönliche Erstnachricht** im Du-Ton (FR-008-01), **nicht** generisch — Ton siehe
   §9.2 design-system.md („Hey, ich bin's — na ja, meine KI-Version. Frag mich was."). Materialisiert
   mit Caret-Tick.
3. **idle:** **vordefinierte Fragen** als Chips (FR-008-02) — **kein Freitextfeld in M1** (z. B. „Wo
   hast du gearbeitet?", „Was kannst du?", „Erzähl von der Bandtour", „Wie erreiche ich dich?").
4. **question-selected → answering:** kuratierte **Antwortkarte** materialisiert gestaffelt
   (reduced-motion: sofort). Danach wieder Chips (weiterfragen).
5. **relay-prompt:** die Antwort/ein Chip bietet die **Relay-Aktion** (die **eine primäre CTA** der
   Sektion): „Soll ich das dem echten Matthias weiterleiten?" (FR-008-03).
6. **relay-email-input:** bei „Ja" wird die **E-Mail-Adresse verlangt** (Pflicht, FR-009-05) +
   optionale Kurznachricht. **Redundant-Entry (§3.3.7):** bereits erhobene E-Mail vorbelegt.
7. **relay-sending → relay-success:** Zwei-Kanal-Zustellung (Push + E-Mail) + Absender-Bestätigung im
   Du-Ton (FR-009-02/03); **Erfolgs-/Abschluss-Moment** (DE1b, §5.5: `check-circle` zeichnet sich +
   Bestätigung materialisiert), **kein** stiller Reset.

### Fehler-/Leer-/Degradations-Zustände

- **relay ohne E-Mail:** wird **geblockt** mit Hinweis, dass die E-Mail nötig ist (FR-009-05).
- **relay-error:** Zustellung schlägt fehl → sichtbarer Fehler + **Inline-Retry**, Eingaben bleiben
  erhalten (FR-009-06).
- **degraded (Cap/Offline):** der **geführte Modus ist die Baseline und dauerhafter Fallback**
  (FR-008-08). Für die spätere LLM-Ausbaustufe: bei erreichtem 20-€-Cap (FR-008-07) oder LLM-Ausfall
  (FR-008-08) sichtbarer, freundlicher **„geführter Modus"-Banner** — kein Fehlerzustand.
  (LLM-Freitext, DE/EN-nach-Eingabe, Allowlist, Streaming: **spätere Ausbaustufe**, hier nur als
  Zustand mitgedacht; FR-008-05…10.)
- **leer:** vor erster Interaktion nur Erstnachricht + Chips — nie eine leere Servicebot-Fläche.

### Responsive/Mobile

- Mobil: die Chat-Sektion rendert vollbreit; bei aktiver Konversation kann das Panel als
  **Vollbild-Sheet** in Daumen-Reichweite expandieren (Fokus-Falle + ESC); Chips scrollen horizontal
  oder stapeln; Relay-Feld mit großzügigem Touch-Target.
- Chat wird **lazy** geladen (NFR-CC-02).

### A11y-ACs (testbar)

- Nachrichtenlauf als `role="log"`/`aria-live="polite"`; neue Antworten werden angesagt.
- Chips sind echte `button`, in logischer Tab-Ordnung; `cursor-pointer`; Fokus sichtbar.
- Relay-E-Mail-Feld: `label` + `type="email"` + Fehler via `aria-describedby` + `aria-invalid`
  (§3.3.1/3.3.3).
- Vollständig ohne Maus bedienbar; Vollbild-Sheet (mobil) mit Fokus-Falle + ESC.
- **Kein Launcher/Dock** — Erreichbarkeit ausschließlich über Sektion + Nav-Anker (DD3-b).
- reduced-motion: keine Materialisierungs-Bewegung, sofortige Anzeige (Parität); Abschluss-Moment
  ohne Draw, `aria-live` unverändert.

**FR-Trace:** FEAT-008 (FR-008-01/02/03/04; Ausbaustufe -05…10 als Zustand), FEAT-009
(FR-009-02/03/05/06), FR-CC-02, NFR-CC-01/-02/-05; DD3-b (kein Dock), DE1b (Abschluss-Moment).

---

## Flow 5 — Kontaktformular (Eingabe → Senden → Abschluss/Retry)

**Zweck.** Niedrigschwelliger Weg ins Gespräch (SC-2); bewusst lean; zuverlässige Zwei-Kanal-
Zustellung; Owner-E-Mail geschützt. Sitzt am **wärmsten** (menschlichsten) Pol. Sicherheitszone:
ruhig/konventionell (DC3).

### Schritte & Zustände

1. **idle:** genau **drei Felder** — Name, E-Mail, Nachricht (FR-009-01) — plus ein **unsichtbares
   Honeypot-Feld** (FR-009-04). Eine primäre CTA „Nachricht senden" (Elektroblau-Fill).
2. **validating:** Client-Validierung (Pflichtfelder, E-Mail-Format) mit Inline-Fehlern.
3. **sending:** Button `loading`; Felder gesperrt.
4. **success:** **Inline-Bestätigung** (kein Seitenwechsel) als **Abschluss-Moment** (DE1b, §5.5:
   `check-circle` zeichnet sich + Du-Ton-Bestätigung „Angekommen. Ich melde mich bei dir."); Absender
   erhält Bestätigung (FR-009-03); Zustellung an Owner über **Push + E-Mail** (FR-009-02).
5. **error:** sichtbarer Fehlerzustand + **Inline-Retry ohne Datenverlust** (FR-009-06).

### Fehler-/Leer-/Fallback-Zustände

- **Honeypot befüllt:** Einreichung wird **stillschweigend verworfen** (kein Feedback an Bots,
  FR-009-04).
- **Rate-Limit erreicht:** **freundlicher Hinweis**, kein Absturz (FR-009-04 / Edge Case).
- **Owner-E-Mail:** erscheint **nirgends** im Klartext im Formular/Flow — ausschließlich im Impressum
  (FR-009-07/FEAT-012).
- **Profil-Links (`CrProfileLinks`):** GitHub, GitLab, LinkedIn; **kein Xing**; **LinkedIn entfällt**
  bis URL geliefert (kein Dead Link, FR-009-08).

### Responsive/Mobile

- Einspaltig; Felder full-width; Touch-Targets ≥ 44 px; native Tastatur-Typen (`inputmode`/
  `type=email`).
- **Warmer Pol:** `input`-Border #6F7B90 erfüllt 1.4.11 auch auf `canvas-warm` mit Reserve (3,9:1,
  §1.2 design-system.md).

### A11y-ACs (testbar)

- Jedes Feld hat ein sichtbares `label` (kein Placeholder-only); Pflicht via `required` +
  `aria-required`.
- Fehler programmatisch (`aria-describedby`, `aria-invalid`) **und** textuell benannt (§3.3.1),
  Vorschlag zur Korrektur (§3.3.3); Fokus springt auf das erste fehlerhafte Feld.
- Honeypot ist für Hilfstechnik **und** visuell verborgen (`aria-hidden` + off-screen), kein
  Fokus-Stop.
- Erfolg wird über `aria-live` angesagt; CTA hat sichtbaren Fokus + `cursor-pointer`.
- reduced-motion: Abschluss-Häkchen sofort (kein Draw), Bestätigung + `aria-live` unverändert.

**FR-Trace:** FEAT-009 (FR-009-01…08), FR-CC-02, NFR-CC-01/-05; DE1b (Abschluss-Moment).

---

## Flow 6 — Sprachwechsel (URL als Source of Truth → Toggle → Persistenz)

**Zweck.** DE Default / EN vollständig; emotionaler DE-Hook, EN als Muss.

**URL-Schema (fixiert, RV-03):** `/` = **DE (Default, `x-default`)**, `/en` = **EN**; **beide
prerendered**, als **hreflang-Paar + `x-default` auf `/`** verknüpft. **Kein Server-Redirect.** Die
**URL ist die Source of Truth** der aktiven Sprache — `<html lang>` und alle Inhalte folgen dem Pfad.
**Ausnahme (RV-09):** Impressum liegt **nur DE** vor; Datenschutz bleibt DE/EN.

### Schritte & Zustände

1. **Einstieg = Pfad:** Aufruf von `/` rendert **DE**, Aufruf von `/en` rendert **EN** — jeweils
   vorgerendert, ohne JS lesbar (FR-011-01).
2. **Persistenz-Vorrang (localStorage gewinnt):** existiert eine gespeicherte Sprachwahl, gilt sie
   über Reload/Wiederkehr (FR-010-03); beim Erstpaint auf einem nicht passenden Pfad → **client-
   seitiger Redirect** auf die gespeicherte Sprach-URL. *(localStorage nur für Sprachwahl — keine
   Personalisierung, DE1c.)*
3. **Auto-Detect nur ohne gespeicherte Wahl (Erstbesuch):** Aufruf von `/` **ohne** gespeicherte Wahl
   **und** mit **EN-Browser-Sprache** → **client-seitiger Redirect nach `/en`** (FR-010-01). Ist die
   Browser-Sprache nicht bestimmbar/unterstützt oder DE → **Verbleib auf `/` (Deutsch)**
   (FR-010-01/05).
4. **Toggle (`CrLangToggle`):** sichtbar in `CrNav`; **navigiert zwischen den Sprach-URLs** (`/` ⇄
   `/en`, entsprechender Deep-Link-Pfad bleibt erhalten), aktualisiert **alle sichtbaren Inhalte**
   (Eigennamen ausgenommen, FR-010-02/04/FR-CC-01) und `<html lang>` und **persistiert** die Wahl
   (überschreibt die Auto-Ableitung, FR-010-04).

- **Leer/Fallback:** keine gespeicherte Wahl + nicht unterstützte/DE-Browser-Locale → **`/`
  (Deutsch)** (FR-010-01).
- **SEO/Deep-Link:** `/` und `/en` sind **vorgerendert** und **hreflang**-verknüpft (`x-default` auf
  `/`, FR-011-01/02) — ein Sprach-Deep-Link liefert die passende crawlbare Fassung ohne JS.

### A11y-ACs (testbar)

- `CrLangToggle` ist ein echter Sprach-Umschalter (**Link/Navigation** zwischen `/` und `/en`) mit
  `aria-current` je Sprache; per Tastatur bedienbar; sichtbarer Fokus.
- Nach Umschalten stimmt `<html lang>` mit dem Pfad überein (§3.1.1); `hreflang`-Alternates inkl.
  `x-default` im `<head>` (§3.1.2).
- Kein client-seitiger Redirect-Loop; ein Redirect ist einmalig und ändert Fokus-/Scroll-Lage nicht
  unerwartet (keine unangekündigte Kontextänderung).
- Kein Layout-Bruch bei längeren DE/EN-Strings (Text-Resize-Toleranz, §1.4.4).

**FR-Trace:** FEAT-010 (FR-010-01…05), FEAT-011 (FR-011-01/02), FR-CC-01, NFR-CC-01. RV-03, RV-09.

---

## Flow 7 — Mobile-Journey (Daumen-Scroll, vertikale Kompetenz-Linie, Vollbild-Modal)

**Zweck.** 360 px bis Tablet vollständig bedienbar; die schwierigen Desktop-Muster (Kompetenz-Linie,
Modal, Chat) sauber übersetzt.

### Verhalten

- **Daumen-Scroll:** einspaltige Reise; `CrNav` = Hamburger → Radix-Sheet; CTA „Kontakt" + Chat-Anker
  bleiben in Daumen-Reichweite; **kein** gedockter Launcher (DD3-b); keine Hover-Abhängigkeit (Touch).
- **Kompetenz-Linie vertikal (< md):** `CrKompetenzLinie` rendert **vertikal** mit **inhaltlicher
  Parität**; Tap auf eine Station öffnet den **Aufklapper darunter** (FR-004-05).
- **Referenz-Modal Vollbild:** `CrRefModal` = Vollbild mit Scroll (FR-006-02); Schließen-Target
  ≥ 44 px oben; Browser-Zurück schließt.
- **Evolution mobil:** **identische Screenshot-Primärdarstellung** im Museums-Rahmen + „Live öffnen"
  (neuer Tab) (FR-007-02, DD2).
- **Chat mobil:** Sektion vollbreit, Konversation ggf. Vollbild-Sheet (Flow 4).
- **Temperatur-Verlauf** greift identisch (statisches `background-image`, DC2); **kein** horizontaler
  Scroll an keinem Breakpoint; Content-Cap greift erst ~1500 px, Motiv full-bleed.

### A11y-ACs (testbar)

- Touch-Targets ≥ 44×44 px (Minimum 24 px, §2.5.8); ausreichende Abstände.
- Alle Hover-Delights haben ein Touch-/Fokus-Äquivalent; keine Funktion nur per Hover (FR-013-03/-04).
- Vertikale Kompetenz-Linie per Tastatur (externe Tastatur an Mobil/Tablet) fokussier-/aufklappbar
  (`aria-expanded`), Parität zur Desktop-Interaktion.
- 200 % Zoom / große Systemschrift: kein Inhalts-/Bedienverlust (§1.4.4/§1.4.10 Reflow).

**FR-Trace:** FEAT-004 (FR-004-05), FEAT-006 (FR-006-02), FEAT-007 (FR-007-02), FEAT-008/013 (Touch),
NFR-CC-01/-04; DC2, DD3-b.

---

## Delight & Easter-Eggs (Querschnitt, HR-unsichtbar)

**Zweck.** Erinnerungswert für P2, ohne die HR-Reise zu stören (unsichtbar für P1).

- **`CrTerminalEgg`:** verstecktes Terminal, Befehle `help` · `whoami` · `skills` · `contact`; `help`
  listet die Befehle; **unbekannter Befehl → freundlicher Hinweis + Verweis auf `help`** (FR-013-01).
  Ligaturen an; Cursor blinkt (reduced-motion: statisch).
- **Konsolen-Gruß** beim Öffnen der Browser-Konsole (FR-013-02) — Ton siehe design-system.md §9.2.
- **Mikro-Hover** (FR-013-03): Link-Underline-Draw, Card-Lift, Tag-Border → electric; **Touch/
  reduced-motion:** statisches/dezentes Äquivalent, keine funktionale Hover-Abhängigkeit (FR-013-04).
- **Materialisierungs-Signatur (Caret-Tick):** die dezente „von-einem-Modell-geschrieben"-Signatur
  (§5.2 design-system.md) ist selbst ein Delight-Moment für aufmerksame Betrachter — sparsam, nie an
  Fließtext, reduced-motion: entfällt.
- **Unaufdringlich (FR-013-04):** keine Blockade/Ablenkung der primären Inhalts- und Kontaktpfade;
  die 5-s-HR-Klarheit bleibt unberührt.

**A11y-ACs:** Terminal vollständig per Tastatur bedienbar (Eingabe-`label`, Fokus sichtbar);
Konsolen-Gruß rein additiv (keine A11y-Abhängigkeit); Mikro-Hover + Caret degradieren bei
reduced-motion.

**FR-Trace:** FEAT-013 (FR-013-01…04), NFR-CC-01, NFR-CC-06; R2 (Materialisierung).
