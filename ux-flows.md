# UX-Flows — catalyst

> Key-Flows der Personal Page `matthias-feyll.de`. Autor: `/design` (ui-ux-Subagent). Konform zu
> `design-system.md` (Tokens, Motion, Cr*-Komponenten, A11y-Baseline) und ADR-0005 (Routing/State/
> i18n/Viz). Jeder Flow: Zweck · Zustände (Happy/Fehler/Leer/Fallback) · Responsive/Mobile · Motion
> & reduced-motion · testbare A11y-ACs · FR-Trace.
>
> Konventionen: **Eine** scroll-getragene Hauptroute (`/`); Referenz-Detail als URL-synchronisierte
> **Modal-Route**; Impressum/Datenschutz als eigene Routen (ADR-0005). Light-only in M1.

---

## Flow 0 — Scroll-Journey (Haupt-Reise)

**Zweck.** Die lineare Erzählung, die HR (P1) in ~5 s abholt und mit steigender AI-native-Dramaturgie
zum Gespräch führt; P2 findet Tiefe entlang des Wegs.

### Sektions-Reihenfolge (Vorschlag — vom Brief optimiert, Begründung unten)

| # | Sektion | Feature | Kern |
|---|---------|---------|------|
| 1 | **Hero & Pitch** | FEAT-001 | gezeichneter Namenszug + Nutzwert-Pitch (5-s-Klarheit) |
| 2 | **Über mich** | FEAT-002 | „Mensch hinter dem Code" — emotionaler Hook, Du-Ton, Band-Stats |
| 3 | **Karriere-Timeline** | FEAT-003 | „nicht nur ein Master-Student" — Credibility direkt nach dem Hook |
| 4 | **Kompetenz-Band** | FEAT-004 | Generalisten-Narrativ; KI fließt durch; Signature-Visual |
| 5 | **Verantwortung** | FEAT-005 | Charakter/Engagement, belegbar |
| 6 | **Referenzen** | FEAT-006 | greifbare Projekt-Belege (P2-Tiefe) |
| 7 | **Evolution-Story** | FEAT-007 | Lern-Narrativ; endet auf „catalyst = 1. KI-geschriebene Generation, siehe Repo" |
| 8 | **KI-Matthias-Chat** | FEAT-008 | dediziertes „Frag mich" — Signature-AI, interaktive Brücke in den Kontakt |
| 9 | **Kontakt & Relay** | FEAT-009 | die Handlungsaufforderung |
| 10 | **Footer** | FEAT-012/007/009 | Impressum-/Datenschutz-Links, Repo-Link, Profil-Links |

**Persistent, sektionsübergreifend:** `CrNav` (Scroll-Spy + `CrLangToggle` + eine CTA „Kontakt") und
ein **dezenter, gedockter `CrChat`-Launcher** (Pill „Frag KI-Matthias", ab Hero verfügbar).

**Begründung der Optimierung ggü. Brief-Vorschlag.**
- **Dedizierte Chat-Sektion zwischen Evolution (7) und Kontakt (9) eingefügt + persistenter
  Launcher.** SC-1 („AI-native erlebbar") ist das **oberste** Erfolgskriterium: der persistente
  Launcher macht das KI-Element **jederzeit** erlebbar, ohne den linearen HR-Read zu unterbrechen;
  die dedizierte Sektion bildet eine **AI-native-Crescendo**: die Seite ist KI-**geschrieben**
  (Evolution) → jetzt **sprich** mit der KI (Chat) → jetzt sprich mit dem **Menschen** (Kontakt).
  Der Chat ist Signature-Element, **nicht** der Hero (A1c/FR-008-04) — daher hoch platziert, aber
  nicht oben.
- **Über mich (2) vor Timeline (3):** kurzer menschlicher Hook + Du-Ton **zuerst**, dann harte
  Credibility — beides in den ersten anderthalb Scrolls.
- **Verantwortung (5) vor Referenzen (6):** Charakter/Engagement vor der technischen Projekt-Tiefe.

> Diese Reihenfolge ist ein **Vorschlag** und am Freeze-Gate owner-sichtbar (siehe Rückgabe-Kontrakt).

### Zustände

- **Happy (Motion an):** orchestrierter Page-Load — Namenszug zeichnet sich (~1,4–1,8 s), Pitch
  steigt ein, Scroll-Hinweis erscheint zuletzt. Beim Scrollen zeichnet sich je Sektion die Linie
  einmalig (IntersectionObserver); `CrLineBackground` parallaxt dezent.
- **reduced-motion:** Namenszug + Pitch + alle Sektions-Linien **sofort** im Endzustand; kein
  Parallax; volle inhaltliche Parität (FR-001-03/-05, NFR-CC-01).
- **Leer/langsame Verbindung:** Pitch + Name sind **text-first**, sofort lesbar, unabhängig von der
  Animation (FR-001-05); d3-Band/Chat lazy mit Skeleton-Platzhalter (reservierte Layout-Box gegen
  CLS, NFR-CC-02).
- **Fehler:** ein lazy-Chunk (Band/Chat) lädt nicht → statischer Parität-/Retry-Zustand statt
  leerer Fläche.

### Responsive/Mobile

- 360 px: einspaltig, Daumen-Scroll; Content-Cap greift erst ab ~1500 px, Motiv full-bleed.
- `CrNav` mobil = Hamburger → Radix-Sheet; CTA „Kontakt" bleibt erreichbar.
- Details siehe **Flow 6 (Mobile-Journey)**.

### A11y-ACs (testbar)

- Skip-Link „Zum Inhalt" als erstes fokussierbares Element; Sektionen sind `<section>` mit
  `aria-labelledby` (semantische Struktur, §1.3.1).
- Scroll-Hinweis ist tastaturerreichbar und aktivierbar (FEAT-001-AC).
- `CrNav`-Scroll-Spy verdeckt fokussierte Elemente nicht (§2.4.11); aktueller Anker hat
  `aria-current`.
- Bei 200 % Zoom kein Inhaltsverlust, kein H-Scroll (§1.4.4).
- `<html lang>` = aktive Sprache; dekoratives Linien-Motiv `aria-hidden` (NFR-CC-01).

**FR-Trace:** FEAT-001…009 (Reihenfolge), FR-CC-01/-02, NFR-CC-01/-02/-04.

---

## Flow 1 — Referenz-Detail (Karte → Modal, URL-Sync, Deep-Link)

**Zweck.** Greifbare Projekt-Belege ohne HR zu überfordern; teilbare Deep-Links (P2).

### Schritte & Zustände

1. **Galerie** (`CrRefCard`-Raster): je Karte Visual · Kontext (2–3 Sätze) · Rolle · Stack-Tags ·
   optionaler ausgehender Link (FR-006-01).
2. **Aktivieren** (Klick/Enter/Space auf Karte) → `CrRefModal` öffnet; **URL wechselt** auf die
   Deep-Link-Route (z. B. `/#/ref/<id>`), Browser-History-Push (FR-006-03).
3. **Modal offen:** klein=Vollbild (mit Scroll), groß=großzügig zentriert (FR-006-02);
   Fokus-Falle; Titel fokussiert.
4. **Schließen** via X / ESC / Backdrop-Klick / **Browser-Zurück** → Modal schließt, URL zurück auf
   Galerie, **Fokus zurück** auf die auslösende Karte (FR-006-04).

- **Happy:** Deep-Link teilbar; direkter Aufruf der URL lädt Seite mit **direkt geöffnetem** Modal
  (FR-006-03).
- **Leer/Fallback — unbekannte ID:** Deep-Link auf nicht existierende Referenz → **Galerie ohne
  offenes Modal**, definierter Fallback, **kein** Fehlerzustand (FR-006, Edge Case; ADR-0005).
- **Leer — kein Link:** Referenz ohne ausgehenden Link zeigt **keine** tote Link-Affordanz
  (FR-006-10).
- **Sonderfall — PromotionPlanner:** **kein** Produkt-Screenshot; **abstraktes Visual**
  („Excel-Chaos → strukturiertes System"), text-only Kontext (FR-006-06). `assets/reservix/*` wird
  **nicht** verwendet.
- **Sonderfälle — VUSC / Hornetsecurity:** je **genau ein** ausgehender Link auf die öffentliche
  Seite, keine vertraulichen Inhalte (FR-006-07/08).
- **Fehler:** kein Netzwerk-Rand im Modal (statischer Inhalt) → keine Ladefehler möglich; ein
  nicht ladendes Visual fällt auf ein neutrales Platzhalter-Visual zurück.

### Responsive/Mobile

- < md: Vollbild-Modal mit Scroll, kein abgeschnittener Inhalt; Schließen-Button (≥44 px) oben
  erreichbar (Daumen).
- ≥ lg: zentriertes Modal, `shadow-overlay`, Backdrop-Dimm.

### A11y-ACs (testbar)

- `role="dialog"` + `aria-modal="true"` + `aria-labelledby` (Titel); Fokus-Falle hält Fokus im
  Modal; ESC schließt (§2.1.1/§2.1.2 keine Tastatur-Falle).
- Beim Schließen **Fokus-Rückgabe** an die auslösende Karte (§2.4.3 Fokus-Reihenfolge).
- Karte ist ein echtes interaktives Element (`button`/`a`), Enter+Space aktivieren; `cursor-pointer`.
- Ausgehende Links: `rel="noopener"` + erkennbares externes-Link-Icon mit `aria-label`.

**FR-Trace:** FEAT-006 (FR-006-01…10), ADR-0005 (Modal-Route, List→Detail), NFR-CC-01/-04.

---

## Flow 2 — Evolution-Museum (iframe / Screenshot / App-down)

**Zweck.** Vier Generationen als Lern-Narrativ; die Alt-Apps erlebbar machen ohne Hosting-Annahme.

### Schritte & Zustände

- **Narrativ:** `CrEvolutionThread` zeigt den durchgehenden Faden lookup → lookdown → median →
  **catalyst**; catalyst ist als **vollständig KI-geschrieben** ausgewiesen und **verlinkt sein
  öffentliches Repository** (FR-007-01/05).
- **Desktop (≥ lg):** je Knoten ein `CrMuseumFrame` — **Live-iframe** im „Museums-Rahmen"
  (FR-007-02).
  - Zustände: `loading` (Skeleton im Rahmen) → `live` (iframe geladen).
  - **App-down / nicht erreichbar → Screenshot-Fallback** im selben Rahmen, kein defekter/leerer
    Rahmen (FR-007-03).
  - **Framing verweigert (RV-08):** die Alt-Seite **antwortet**, verweigert aber das
    iframe-Rendering (`X-Frame-Options` / CSP `frame-ancestors`). UX-Verhalten: **identischer
    Screenshot-Fallback** wie „App-down". Weil Cross-Origin-Introspektion unmöglich ist, erfolgt
    die Erkennung per **iframe-Lade-Timeout-Heuristik**: bleibt das `load`-Event innerhalb eines
    definierten Timeouts aus, wechselt der Rahmen **Skeleton → Screenshot-Fallback** — **ohne
    Fehler-Flackern**, kein leerer/„gebrochener" Rahmen. (Gleiche Behandlung wie App-down; keine
    Unterscheidung nach außen nötig.)
  - **Keine URL konfiguriert → nur Screenshot**, kein leerer Rahmen (FR-007-04).
- **Mobil (< lg):** **Screenshot-Galerie** je Generation + „in neuem Tab öffnen" (FR-007-02).
- **Fehler:** iframe-Ladefehler **oder Timeout (App-down bzw. Framing verweigert)** → automatischer
  Screenshot-Fallback (kein Fehler-Overlay, kein leeres Zwischenbild).

### Responsive/Mobile

- iframe wird auf Mobil **nicht** geladen (Screenshot-Galerie stattdessen — Performance + Touch);
  „in neuem Tab" öffnet die Live-App extern.
- Rahmen mit reservierter Layout-Box (kein CLS beim Screenshot/iframe-Wechsel).

### A11y-ACs (testbar)

- Jeder `iframe` hat einen `title`; jedes Screenshot-`img` ein aussagekräftiges `alt`
  (Generation + Zustand).
- „In neuem Tab öffnen" ist ein echtes `a[target=_blank]` mit `rel="noopener"` und
  erkennbarem/angesagtem Verhalten.
- Faden/Linien sind `aria-hidden`; die Generationen-Reihenfolge ist **zusätzlich textuell** (Liste)
  vorhanden (NFR-CC-01).
- Repo-Link tastaturerreichbar; Fokus sichtbar.

**FR-Trace:** FEAT-007 (FR-007-01…05), NFR-CC-01/-02/-04. **RV-08** (Zustand „Framing verweigert" →
identischer Screenshot-Fallback via Lade-Timeout-Heuristik).

---

## Flow 3 — KI-Matthias-Chat (geführt, M1) + Relay

**Zweck.** Signature-AI-Element (SC-1); geführt, deterministisch, ohne Kosten; **kein
Servicebot-Look**; führt via Relay in den Kontakt.

### Schritte & Zustände (geführt, M1)

1. **Öffnen** über gedockten Launcher oder die dedizierte Sektion.
2. **intro:** **persönliche Erstnachricht** im Du-Ton (FR-008-01), **nicht** generisch
   („Willkommen bei…"). Beispiel-Ton: „Hey, ich bin's — na ja, meine KI-Version. Frag mich was."
3. **idle:** **vordefinierte Fragen** als Chips (FR-008-02) — **kein Freitextfeld in M1**
   (z. B. „Wo hast du gearbeitet?", „Was kannst du?", „Erzähl von der Bandtour", „Wie erreiche ich
   dich?").
4. **question-selected → answering:** kuratierte **Antwortkarte** faded/steigt gestaffelt ein
   (reduced-motion: sofort). Danach wieder Chips (weiterfragen).
5. **relay-prompt:** die Antwort/ein Chip bietet die **Relay-Aktion**: „Soll ich das dem echten
   Matthias weiterleiten?" (FR-008-03).
6. **relay-email-input:** bei „Ja" wird die **E-Mail-Adresse verlangt** (Pflicht, FR-009-05) +
   optionale Kurznachricht. **Redundant-Entry (§3.3.7):** bereits erhobene E-Mail vorbelegt.
7. **relay-sending → relay-success:** Zwei-Kanal-Zustellung (Push + E-Mail) + Absender-Bestätigung
   im Du-Ton (FR-009-02/03); Erfolgs-Zustand liest als Bestätigung/„erledigt", kein stiller
   Reset.

### Fehler-/Leer-/Degradations-Zustände

- **relay ohne E-Mail:** wird **geblockt** mit Hinweis, dass die E-Mail nötig ist (FR-009-05).
- **relay-error:** Zustellung schlägt fehl → sichtbarer Fehler + **Inline-Retry**, Eingaben
  bleiben erhalten (FR-009-06).
- **degraded (Cap/Offline):** der **geführte Modus ist die Baseline und dauerhafter Fallback**
  (FR-008-08). Für die spätere LLM-Ausbaustufe: bei erreichtem 20-€-Cap (FR-008-07) oder
  LLM-Ausfall (FR-008-08) sichtbarer, freundlicher **„geführter Modus"-Banner** — kein
  Fehlerzustand. (LLM-Freitext, DE/EN-nach-Eingabe, Allowlist, Streaming: **spätere Ausbaustufe**,
  hier nur als Zustand mitgedacht; FR-008-05…10.)
- **leer:** vor erster Interaktion nur Erstnachricht + Chips — nie eine leere Servicebot-Fläche.

### Responsive/Mobile

- Mobil: der Chat öffnet als **Vollbild-Sheet** (Daumen-Reichweite); Chips scrollen horizontal
  oder stapeln; Relay-Feld mit großzügigem Touch-Target.
- Chat wird **lazy** geladen (NFR-CC-02).

### A11y-ACs (testbar)

- Nachrichtenlauf als `role="log"`/`aria-live="polite"`; neue Antworten werden angesagt.
- Chips sind echte `button`, in logischer Tab-Ordnung; `cursor-pointer`; Fokus sichtbar.
- Relay-E-Mail-Feld: `label` + `type="email"` + Fehler via `aria-describedby` + `aria-invalid`
  (§3.3.1/3.3.3).
- Vollständig ohne Maus bedienbar; Vollbild-Sheet mit Fokus-Falle + ESC (Mobil).
- reduced-motion: keine Reveal-Bewegung, sofortige Anzeige (Parität).

**FR-Trace:** FEAT-008 (FR-008-01/02/03/04; Ausbaustufe -05…10 als Zustand), FEAT-009 (FR-009-02/03/05/06),
FR-CC-02, NFR-CC-01/-02/-05.

---

## Flow 4 — Kontaktformular (Eingabe → Senden → Bestätigung/Retry)

**Zweck.** Niedrigschwelliger Weg ins Gespräch (SC-2); bewusst lean; zuverlässige Zwei-Kanal-
Zustellung; Owner-E-Mail geschützt.

### Schritte & Zustände

1. **idle:** genau **drei Felder** — Name, E-Mail, Nachricht (FR-009-01) — plus ein **unsichtbares
   Honeypot-Feld** (FR-009-04). Eine primäre CTA „Nachricht senden" (Elektroblau-Fill).
2. **validating:** Client-Validierung (Pflichtfelder, E-Mail-Format) mit Inline-Fehlern.
3. **sending:** Button `loading`; Felder gesperrt.
4. **success:** **Inline-Bestätigung** (kein Seitenwechsel); Absender erhält Bestätigung im Du-Ton
   (FR-009-03); Zustellung an Owner über **Push + E-Mail** (FR-009-02).
5. **error:** sichtbarer Fehlerzustand + **Inline-Retry ohne Datenverlust** (FR-009-06).

### Fehler-/Leer-/Fallback-Zustände

- **Honeypot befüllt:** Einreichung wird **stillschweigend verworfen** (kein Feedback an Bots,
  FR-009-04).
- **Rate-Limit erreicht:** **freundlicher Hinweis**, kein Absturz (FR-009-04 / Edge Case).
- **Owner-E-Mail:** erscheint **nirgends** im Klartext im Formular/Flow — ausschließlich im
  Impressum (FR-009-07/FEAT-012).
- **Profil-Links (`CrProfileLinks`):** GitHub, GitLab, LinkedIn; **kein Xing**; **LinkedIn entfällt**
  bis URL geliefert (kein Dead Link, FR-009-08).

### Responsive/Mobile

- Einspaltig; Felder full-width; Touch-Targets ≥ 44 px; native Tastatur-Typen (`inputmode`/
  `type=email`).

### A11y-ACs (testbar)

- Jedes Feld hat ein sichtbares `label` (kein Placeholder-only); Pflicht via `required` +
  `aria-required`.
- Fehler programmatisch (`aria-describedby`, `aria-invalid`) **und** textuell benannt (§3.3.1),
  Vorschlag zur Korrektur (§3.3.3); Fokus springt auf das erste fehlerhafte Feld.
- Honeypot ist für Hilfstechnik **und** visuell verborgen (`aria-hidden` + off-screen), kein
  Fokus-Stop.
- Erfolg wird über `aria-live` angesagt; CTA hat sichtbaren Fokus + `cursor-pointer`.

**FR-Trace:** FEAT-009 (FR-009-01…08), FR-CC-02, NFR-CC-01/-05.

---

## Flow 5 — Sprachwechsel (URL als Source of Truth → Toggle → Persistenz)

**Zweck.** DE Default / EN vollständig; emotionaler DE-Hook, EN als Muss.

**URL-Schema (fixiert, RV-03):** `/` = **DE (Default)**, `/en` = **EN**; **beide prerendered**,
als **hreflang-Paar + `x-default` auf `/`** verknüpft. **Kein Server-Redirect.** Die **URL ist die
Source of Truth** der aktiven Sprache — `<html lang>` und alle Inhalte folgen dem Pfad.

### Schritte & Zustände

1. **Einstieg = Pfad:** ein Aufruf von `/` rendert **DE**, ein Aufruf von `/en` rendert **EN** —
   jeweils vorgerendert, ohne JS lesbar (FR-011-01).
2. **Persistenz-Vorrang (localStorage gewinnt):** existiert eine gespeicherte Sprachwahl, gilt sie
   über Reload/Wiederkehr (FR-010-03) — beim Erstpaint auf einem nicht passenden Pfad führt sie zu
   einem **client-seitigen Redirect** auf die gespeicherte Sprach-URL.
3. **Auto-Detect nur ohne gespeicherte Wahl (Erstbesuch):** Aufruf von `/` **ohne** gespeicherte
   Wahl **und** mit **EN-Browser-Sprache** → **client-seitiger Redirect nach `/en`** (FR-010-01).
   Ist die Browser-Sprache nicht bestimmbar/unterstützt oder DE → **Verbleib auf `/` (Deutsch)**
   (FR-010-01/05).
4. **Toggle (`CrLangToggle`):** sichtbar in `CrNav`; der Toggle **navigiert zwischen den
   Sprach-URLs** (`/` ⇄ `/en`, entsprechender Deep-Link-Pfad bleibt erhalten), aktualisiert **alle
   sichtbaren Inhalte** (Eigennamen ausgenommen, FR-010-02/04/FR-CC-01) und `<html lang>` und
   **persistiert** die Wahl in localStorage (überschreibt die Auto-Ableitung, FR-010-04).

- **Leer/Fallback:** keine gespeicherte Wahl + nicht unterstützte/DE-Browser-Locale → **`/`
  (Deutsch)** (FR-010-01).
- **SEO/Deep-Link:** `/` und `/en` sind **vorgerendert** und **hreflang**-verknüpft (`x-default`
  auf `/`, FR-011-01/02) — ein Sprach-Deep-Link liefert die passende crawlbare Fassung ohne JS;
  Suchmaschinen/LLM-Agenten indexieren beide Pfade.

### A11y-ACs (testbar)

- `CrLangToggle` ist ein echter Sprach-Umschalter (**Link/Navigation** zwischen `/` und `/en`) mit
  `aria-current` (bzw. `aria-pressed`) je Sprache; per Tastatur bedienbar; sichtbarer Fokus.
- Nach Umschalten stimmt `<html lang>` mit dem Pfad überein (§3.1.1); `hreflang`-Alternates inkl.
  `x-default` im `<head>` (§3.1.2).
- Kein client-seitiger Redirect-Loop; ein Redirect ist einmalig und ändert die Fokus-/Scroll-Lage
  nicht unerwartet (§3.2.x, keine unangekündigte Kontextänderung).
- Kein Layout-Bruch bei längeren DE/EN-Strings (Text-Resize-Toleranz, §1.4.4).

**FR-Trace:** FEAT-010 (FR-010-01…05), FEAT-011 (FR-011-01/02), FR-CC-01, NFR-CC-01. **RV-03**
(URL-Schema `/` + `/en`, hreflang/x-default, kein Server-Redirect, client-Redirect-Heuristik).

---

## Flow 6 — Mobile-Journey (Daumen-Scroll, vertikales Band, Vollbild-Modal)

**Zweck.** 360 px bis Tablet vollständig bedienbar; die schwierigen Desktop-Muster (Band, Modal,
iframe) sauber übersetzt.

### Verhalten

- **Daumen-Scroll:** einspaltige Reise; `CrNav` = Hamburger → Radix-Sheet; CTA „Kontakt" + gedockter
  Chat-Launcher bleiben in Daumen-Reichweite; keine Hover-Abhängigkeit (Touch, FR-013 Edge Case).
- **Kompetenz-Band vertikal (< md):** `CrSpektrumBand` rendert **vertikal** mit **inhaltlicher
  Parität** zur horizontalen Fassung; Tap auf eine Disziplin öffnet den **Aufklapper darunter**
  (FR-004-05, E1c).
- **Referenz-Modal Vollbild:** `CrRefModal` = Vollbild mit Scroll (FR-006-02); Schließen-Target
  ≥ 44 px oben; Browser-Zurück schließt.
- **Evolution mobil:** **Screenshot-Galerie** statt iframe + „in neuem Tab öffnen" (FR-007-02).
- **Chat mobil:** Vollbild-Sheet (Flow 3).
- **Kein horizontaler Scroll** an keinem Breakpoint; Content-Cap greift erst ~1500 px, Motiv
  full-bleed.

### A11y-ACs (testbar)

- Touch-Targets ≥ 44×44 px (Minimum 24 px, §2.5.8); ausreichende Abstände.
- Alle Hover-Delights haben ein Touch-/Fokus-Äquivalent; keine Funktion nur per Hover (FR-013-03,
  Edge Case).
- Vertikales Band ist per Tastatur (externe Tastatur an Mobil/Tablet) fokussier-/aufklappbar
  (`aria-expanded`), Parität zur Desktop-Interaktion.
- 200 % Zoom / große Systemschrift: kein Inhalts-/Bedienverlust (§1.4.4/§1.4.10 Reflow).

**FR-Trace:** FEAT-004 (FR-004-05), FEAT-006 (FR-006-02), FEAT-007 (FR-007-02), FEAT-013 (Touch),
NFR-CC-01/-04.

---

## Delight & Easter-Eggs (Querschnitt, HR-unsichtbar)

**Zweck.** Erinnerungswert für P2, ohne die HR-Reise zu stören (unsichtbar für P1).

- **`CrTerminalEgg`:** verstecktes Terminal, Befehle `help` · `whoami` · `skills` · `contact`;
  `help` listet die Befehle; **unbekannter Befehl → freundlicher Hinweis + Verweis auf `help`**
  (FR-013-01). Ligaturen an; Cursor blinkt (reduced-motion: statisch).
- **Konsolen-Gruß** beim Öffnen der Browser-Konsole (FR-013-02) — Ton siehe `design-system.md` §9.
- **Mikro-Hover** (FR-013-03): Link-Underline-Draw, Card-Lift, Tag-Border → electric; **Touch/
  reduced-motion:** statisches/dezentes Äquivalent, keine funktionale Hover-Abhängigkeit
  (FR-013-04, Edge Case).
- **Unaufdringlich (FR-013-04):** keine Blockade/Ablenkung der primären Inhalts- und Kontaktpfade;
  die 5-s-HR-Klarheit bleibt unberührt.

**A11y-ACs:** Terminal vollständig per Tastatur bedienbar (Eingabe-`label`, Fokus sichtbar);
Konsolen-Gruß ist rein additiv (keine A11y-Abhängigkeit); Mikro-Hover degradiert bei reduced-motion.

**FR-Trace:** FEAT-013 (FR-013-01…04), NFR-CC-01, NFR-CC-06.
