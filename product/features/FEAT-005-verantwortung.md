# FEAT-005 — Verantwortung

## Ziel / Intent

Eine eigene Sektion für **Verantwortung und Wissensweitergabe** — ein Thema, das nicht ins
Kompetenz-Band passt, aber ein starkes, belegbares Charakterbild zeichnet. Zeigt HR (P1)
Engagement über den reinen Job hinaus, ausschließlich mit **belegbaren** Instanzen.

## Scope

**In:** 4–6 Karten, jede eine konkrete, belegbare Instanz von Verantwortung/Wissensweitergabe.
**Out:** Weiche oder unbelegbare Claims (fliegen bewusst raus). Keine Verlinkung auf Referenzen.

## Belegbare Instanzen (Auswahl, 4–6 Karten)

Schach-Ämter (Schiedsrichter, Turnierleiter, Mannschaftsführer/Schriftführer);
Hausaufgabenhilfe/-betreuung; Nachhilfe in Programmierung; Tutor (h_da); Team-/Technical-Lead in
(Uni-)Projekten; eigenständig umgesetzte Projekte im Job.

## Funktionale Anforderungen

- **FR-005-01** — Die Sektion präsentiert **4–6 Karten**, jede eine eigenständige Instanz von
  Verantwortung bzw. Wissensweitergabe.
- **FR-005-02** — Jede Karte ist durch eine **konkrete, verifizierbare** Tatsache belegt; **keine
  weichen/unbelegbaren Claims**.
- **FR-005-03** — Der abgedeckte Instanzen-Pool umfasst mindestens: Schach-Ämter,
  Hausaufgabenhilfe, Programmier-Nachhilfe, Tutor-Tätigkeit, Team-/Technical-Lead-Rollen und
  eigenständige Projekte.

## Edge Cases & Fehler-/Leer-Zustände

- **Weniger als 4 belegbare Karten verfügbar** → nur belegbare zeigen; niemals mit unbelegbaren
  Claims auffüllen (`FR-005-02`).
- **Mobil** → Karten stapeln lesbar.

## Bestätigte Annahmen

- Dreh „Verantwortung + Wissensweitergabe" bestätigt (I1); weiche/unbelegbare Claims raus.
- Arbeitstitel „Verantwortung"; finale Benennung/Copy in `/design`.

## Acceptance Criteria

- Es werden zwischen 4 und 6 Karten angezeigt.
- Jede Karte benennt eine überprüfbare Tatsache (Amt, Tätigkeit, Rolle); keine reine
  Selbstzuschreibung ohne Beleg.

## Traces

- Personas: P1 (Charakter/Engagement), P2.
- Erfolgskriterien: SC-2.
- Cross-cutting: `FR-CC-01`, `FR-CC-02`, `NFR-CC-01`, `NFR-CC-04`.
