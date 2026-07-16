# FEAT-003 — Karriere-Timeline

## Ziel / Intent

Der Werdegang auf einen Blick, damit HR (P1) schnell erkennt: hier ist **nicht nur ein
Master-Student ohne Praxis**, sondern jemand mit durchgehendem Berufs- und Bildungsweg. Berufs-
und Bildungsstationen sind **verwoben** dargestellt, je Station eine Zeile, Arbeitgeber-/
Institutions-Logos geben Wiedererkennung.

## Scope

**In:** Chronologisch verwobene Berufs- und Bildungsstationen; ein Zeile je Station;
Arbeitgeber-/Institutions-Logos; Verlinkung einer Station auf ihre zugehörige Referenz (falls
vorhanden); responsives Verhalten (Desktop/Mobil).
**Out:** Ausführliche Projekt-Beschreibungen (die leben in FEAT-006 Referenzen). Keine
Verlinkung von Kompetenzen (das ist FEAT-004 und dort bewusst ausgeschlossen).

## Bekannte Stationen (Inhalt, Reihenfolge in `/design` finalisiert)

Berufsweg und Bildungsweg verwoben, u. a.: Ausbildung Fachinformatiker (Mainova → Reservix);
B.Sc. Informatik; M.Sc. Informatik (h_da, laufend); Werkstudent Fraunhofer SIT (Frontend, VUSC);
Werkstudent Hornetsecurity; HiWi Frontend + Tutor (h_da); Commerz Real (AI-Native Software
Developer / AI-Workflow-Automation, laufend).

## Funktionale Anforderungen

- **FR-003-01** — Die Timeline stellt **Berufs- und Bildungsstationen chronologisch verwoben**
  dar (nicht in zwei getrennten Listen).
- **FR-003-02** — Jede Station wird in **einer Zeile** knapp zusammengefasst.
- **FR-003-03** — Jede Station zeigt das Arbeitgeber-/Institutions-Logo, sofern vorhanden
  (verfügbar: Mainova, Reservix, Fraunhofer SIT, Commerz Real, Hornetsecurity).
- **FR-003-04** — Stationen ohne verfügbares Logo (aktuell **h_da**) zeigen einen
  **Text-Fallback** (Institutionsname) ohne defektes Bild.
- **FR-003-05** — Eine Station, zu der eine Referenz existiert, **verlinkt auf deren
  Detail** (FEAT-006). Stationen ohne Referenz zeigen keine Link-Affordanz.
- **FR-003-06** — Auf Desktop und Mobil bleibt die Timeline vollständig lesbar und bedienbar
  (das Linien-Leitmotiv passt sich responsiv an).

## Edge Cases & Fehler-/Leer-Zustände

- **h_da-Logo fehlt** → Text-Fallback (`FR-003-04`).
- **Station ohne Referenz** → kein Link, keine tote Affordanz (`FR-003-05`).
- **Mobil** → Timeline bleibt bedienbar; keine abgeschnittenen Stationen.

## Bestätigte Annahmen

- Timeline = Berufs- **und** Bildungsweg (Ausbildung, B.Sc., M.Sc., HiWi/Tutor) integriert
  (C3b).
- Verlinkung Timeline→Referenz ist erwünscht (C3b) — abzugrenzen von der bewusst fehlenden
  Kompetenz→Referenz-Verlinkung (FEAT-004).

## Acceptance Criteria

- Berufs- und Bildungsstationen erscheinen in einer gemeinsamen chronologischen Struktur, je
  Station eine Zeile.
- Für h_da wird der Institutionsname als Text angezeigt (kein Broken-Image-Icon).
- Eine Station mit Referenz öffnet beim Aktivieren das zugehörige Referenz-Detail; eine Station
  ohne Referenz ist nicht klickbar dargestellt.

## Traces

- Personas: P1 (Werdegang auf einen Blick), P2 (Detail via Referenz-Link).
- Erfolgskriterien: SC-2.
- Cross-cutting: `FR-CC-01`, `NFR-CC-01`, `NFR-CC-04`.
- Abhängigkeit: FEAT-006 (Referenz-Ziele der Links).
- Ausstehende Materialien: h_da-Logo.
