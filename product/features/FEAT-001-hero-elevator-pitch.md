# FEAT-001 — Hero & Elevator-Pitch

## Ziel / Intent

Der erste Eindruck oberhalb der Falz. Für HR (P1) soll in ~5 Sekunden ohne technisches
Vorwissen klar werden, welchen **Nutzwert** Matthias bietet und warum ein Gespräch lohnt. Der
Namenszug erscheint als sich selbst zeichnender Linien-/Plotter-Schriftzug und setzt das
individuelle, einprägsame UI/UX (SC-3) sofort in Szene.

## Scope

**In:** Above-the-fold Elevator-Pitch (Nutzwert-Perspektive), animierter Namenszug, klarer
Einstieg in die weitere Scroll-Reise.
**Out:** Detaillierte Copy-Ausformulierung und die konkrete Visual-/Motion-Umsetzung des
Namenszugs (gehört `/design`). Kein Intro-Video.

## Funktionale Anforderungen

- **FR-001-01** — Beim ersten Laden ist der Elevator-Pitch (Nutzwert-Aussage) prominent und ohne
  Scrollen auf dem Einstiegs-Viewport lesbar. Ausgangsfassung des Pitch verbatim:
  „State-of-the-art AI-Entwicklung für wertschöpfende Ketten. Gestützt von 12 Jahren
  Softwareentwicklungserfahrung." (Copy-Feinschliff durch `/design`.)
- **FR-001-02** — Der Namenszug wird beim Laden als sich zeichnende Linien-Animation dargestellt.
- **FR-001-03** — Bei aktivem `prefers-reduced-motion` erscheint der Namenszug sofort in seinem
  fertigen Endzustand, ohne Zeichen-Animation (volle Parität, kein Informationsverlust).
- **FR-001-04** — Der Hero enthält einen erkennbaren Hinweis/Einstieg, der die weitere Reise
  (Scroll) signalisiert.
- **FR-001-05** — Kerninhalt (Pitch, Name) wird textuell zuerst dargestellt und ist nicht von
  der Animation abhängig; bei langsamer Verbindung bleibt der Pitch lesbar.

## Edge Cases & Fehler-/Leer-Zustände

- **reduced-motion aktiv** → statischer Endzustand des Namenszugs (`FR-001-03`).
- **Viewport 360 px** → Pitch bleibt lesbar, kein horizontales Scrollen, keine Abschneidung.
- **Langsame Verbindung / Animation lädt spät** → Text-First, Pitch sofort sichtbar
  (`FR-001-05`).

## Bestätigte Annahmen

- Chat ist Signature-Element, **nicht** der Hero — der Hero trägt den Pitch (aus A1c).
- Pitch-Perspektive ist Nutzwert („was hat HR davon"), nicht reine Selbstbeschreibung (A4).

## Acceptance Criteria

- Auf dem Einstiegs-Viewport (Desktop und 360 px mobil) sind Pitch und Name ohne Scrollen und
  ohne horizontales Overflow lesbar.
- Ohne reduced-motion zeichnet sich der Namenszug animiert; mit reduced-motion ist er sofort
  vollständig und identisch im Inhalt.
- Ein Weiter-/Scroll-Hinweis ist vorhanden und tastaturerreichbar.

## Traces

- Personas: P1 (5-Sekunden-Klarheit), P2.
- Erfolgskriterien: SC-2 (Kernbotschaft), SC-3 (Erinnerungswert).
- Cross-cutting: `FR-CC-01` (DE/EN), `FR-CC-02` (Du/Ich), `NFR-CC-01` (a11y/reduced-motion),
  `NFR-CC-04` (Responsivität).
