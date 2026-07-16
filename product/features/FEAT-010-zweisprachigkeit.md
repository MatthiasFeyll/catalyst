# FEAT-010 — Zweisprachigkeit DE/EN

## Ziel / Intent

Die Sprach-Umschaltmechanik. Die Zielgruppe ist überwiegend deutsch (emotionaler Hook), daher
**Default Deutsch**; Englisch ist ein definitives Muss. Diese Feature-Datei besitzt die
**Umschaltung**; die inhaltliche Invariante „alle Inhalte sind zweisprachig" ist Querschnitt
(`FR-CC-01`).

## Scope

**In:** initiale Sprache aus Browser-Sprache, Default DE; sichtbarer manueller Toggle;
persistente Speicherung der Wahl; sofortige Umschaltung aller Inhalte.
**Out:** Übersetzung von Eigennamen (Firmen-/Produkt-/Personennamen bleiben gleich); weitere
Sprachen außer DE/EN.

## Funktionale Anforderungen

- **FR-010-01** — Die initiale Sprache wird aus der **Browser-Sprache** abgeleitet; ist sie nicht
  bestimmbar oder nicht unterstützt, gilt **Deutsch**.
- **FR-010-02** — Ein **sichtbarer Toggle** erlaubt jederzeit das Umschalten zwischen Deutsch und
  Englisch.
- **FR-010-03** — Die gewählte Sprache **bleibt über Reload und Wiederkehr erhalten** (lokale
  Persistenz).
- **FR-010-04** — Das Umschalten aktualisiert **alle sichtbaren Inhalte sofort** (Eigennamen
  ausgenommen — siehe `FR-CC-01`).
- **FR-010-05** — **Deutsch ist die Default-Sprache.**

## Edge Cases & Fehler-/Leer-Zustände

- **Nicht unterstützte Browser-Locale** → Deutsch (`FR-010-01`).
- **Keine gespeicherte Präferenz** → Browser-Sprache, sonst Deutsch.
- **Manuelle Wahl überschreibt** die Browser-Ableitung und wird persistiert.

## Bestätigte Annahmen

- Browser-Sprache **und** manueller Toggle; localStorage-Persistenz auch über Refresh; alles
  zweisprachig außer Eigennamen; Default DE (A3/A3b).

## Acceptance Criteria

- Ohne gespeicherte Präferenz startet die Seite in der Browser-Sprache, andernfalls auf Deutsch.
- Ein Umschalten wechselt sichtbar alle Inhalte und bleibt nach Reload bestehen.
- Firmen-/Produkt-/Personennamen ändern sich beim Umschalten nicht.

## Traces

- Personas: P1 (deutschsprachig primär), P2.
- Erfolgskriterien: SC-2.
- Cross-cutting: `FR-CC-01` (Inhalts-Invariante), `NFR-CC-01`, `NFR-CC-05`.
- Verknüpfung: FEAT-011 (hreflang / Prerender beider Sprachen).
