# Revision-Ledger — catalyst

> Orchestrator-owned. Brownfield-/Re-Entry-Deltas gegen die eingefrorene Spezifikation.
> Archivierung nach `/plan` in `.adlc/revisions/<milestone>.md`.

## Design delta (/design) — 2026-07-16

**Anlass:** fw-ADR-0048 (Plugin 0.58.0): das `frontend-design`-Craft-Skill war beim Original-Authoring der Design-Schicht (~2026-07-10, Plugin ~0.49.x) für den ui-ux-Subagent nicht erreichbar. Owner-Mandat: Komplettüberarbeitung der Design-Schicht; Bestand als Kandidat, nicht als Anker. Discovery-Grill-Gruppen dieses Re-Entries: **DA–DE**.

**Ergebnis-Richtung (owner-approved am Proposal-Gate):** „**Die Linie, die schreibt**" — R1×R2-Fusion: die durchgehende Plotter-Linie bleibt das Gewebe (geschärft), ergänzt um eine subtile, schnelle Materialisierungs-Motion-Sprache („Modell-Output") und die **Temperatur-Dramaturgie** (statischer Canvas-Verlauf kühl→warm über die Seitenlänge, Owner-Idee DB2b).

**Design-Schicht-Änderungen ggü. Bestand:**
- Canvas: von einfarbig kühl (#F0F3F7) → seitenlanger statischer Verlauf kühl→warm; Cards bleiben reines Weiß; AA-Nachweise auf beiden Endpunkten (DB2c-a).
- Hero: Pitch-Arbeitsfassung ersetzt durch die eine materialisierende Pitch-Zeile (Richtung „Experienced Developer shaping AI-powered Software"), Copy-Wahl am Gate (DC1b-a).
- Signature-Linie zusätzlich als dezenter Scroll-Fortschrittsanzeiger; Erfolgszustände als Abschluss-Momente (DE1b).
- Kompetenz-Sektion: gewelltes d3-Band mit Amplituden-Kodierung ersetzt durch Linie-durch-vier-Stationen, Tiefe über Fakten (DD1-b) — **mit Spec-Delta, s. u.**
- Evolution-Museum: Screenshots primär, „Live öffnen" als Link, iframe optional (DD2) — **mit Spec-Delta, s. u.**
- Chat: persistenter Dock-Launcher entfällt; nur eigene Sektion + Nav-Anker (DD3-b, mockup-revidierbar).
- Hintergrund-Motiv: Präsenzstufe „kaum wahrnehmbar" fixiert (DC2-a); Sicherheitszonen Nav/Formular/Fließtext/Timeline konventionell (DC3).
- Engagement-Entscheidungen dokumentiert: progressive Offenlegung ✓, Fortschritt/Erfolgs-Momente ✓, Personalisierung/Wiederkehr-Begrüßung bewusst abgelehnt (DE1a–c).
- Gesetzt bestätigt: Elektroblau #1B58F3, Cabinet Grotesk / General Sans / JetBrains Mono (DA4); Brand-Mark Plotter-„M" + Namenszug (DE2); Motion-Gesamtlevel wie Bestand (DB4).

**Zugehöriges Spec-Delta (owner-approved im Grill, von `requirements` ausgeführt vor dem Design-Authoring):**
- `product/features/FEAT-004-kompetenz-band.md`: FR-004-01…04 revidiert (Band→Linie-durch-Stationen; Tiefe textuell/strukturell statt Amplituden-Kodierung; KI-Faden durchgängig; Detail-Interaktion präzisiert). IDs stabil.
- `product/features/FEAT-007-evolution-story.md`: FR-007-02…04 revidiert (Screenshot primär Desktop+Mobil; „Live öffnen" extern; Einbettungs-URL optional; Timeout-Heuristik entfällt). RV-08 dokumentiert entschärft. IDs stabil.

**Freeze-Gate-Ausgang (2026-07-16): FREIGEGEBEN.** Pitch-Entscheidung: **V1**, die Pitch-Zeile
bleibt in **beiden** Sprachfassungen englisch („Experienced developer shaping AI-powered software."
— Brand-Claim, bewusste owner-approved FR-CC-01-Ausnahme analog Eigennamen); Mono-Kicker wird normal
übersetzt. Personalisierungs-Ablehnung (DE1c) bestätigt via Proposal-Gate.

**Gemeldete, bewusst NICHT ausgeführte Nachzieh-Punkte (nächster `/specify`-Durchgang):**
- `_cross-cutting.md` NFR-CC-02 nennt terminologisch noch das „Visualisierungs-Band" (Intention lazy-loading bleibt gültig).
- `product.md`-Feature-Index führt FEAT-004 noch als „Kompetenz-Band" (Titel-Sync).
- `architecture/workspace.dsl` referenziert ggf. Band/iframe-Terminologie (Single-Writer: Architektur-Phase).
