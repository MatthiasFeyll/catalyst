# FEAT-004 — Kompetenz-Linie

> **Revidiert via /design-Re-Entry 2026-07-16, Owner-approved (DD1-b/DD1c):** Das gewellte Band
> mit „Bandstärke = Erfahrungstiefe" wird ersetzt durch eine **durchgehende Kompetenz-Linie durch
> vier ruhige Disziplin-Stationen**. Grund: Amplituden auf einem gewellten Band sind nicht ablesbar
> und wirken dekorativ; die Kern-Botschaft ist das **Generalisten-Narrativ**. Erfahrungstiefe wird
> jetzt über **Fakten in den Stationen** (Jahre, Schwerpunkte, Belege) kommuniziert statt über eine
> visuelle Amplituden-/Bandstärken-Kodierung. IDs stabil gehalten; Inhalte einzelner FRs geändert.

## Ziel / Intent

Das **Generalisten-Narrativ** im KI-Zeitalter visuell erzählt: eine **durchgehende Linie** fließt
durch alle Disziplinen der Softwareentwicklung, und KI läuft als durchgängiger Faden über die
gesamte Länge mit. Kein Spezialisten-Silo, sondern Breite plus Tiefe — ruhig gestaltet, ein
Signature-Visual für SC-3.

## Scope

**In:** Eine durchgehende Kompetenz-Linie durch vier ruhige **Disziplin-Stationen** in fester
Reihenfolge (**Frontend · Backend · Architektur · DevOps/Cloud**); Erfahrungstiefe je Disziplin
über **Fakten in den Stationen** (Jahre, Schwerpunkte, Belege); KI als durchgängiger
Faden/Gradient über die gesamte Länge; klick-/tap-bare Stationen mit Detail-Darstellung; Desktop
horizontal / Mobil vertikal; sichtbar gemachte Linux-/Terminal-Affinität.
**Out:** Verlinkung von Kompetenzen auf Referenzen (bewusst ausgeschlossen, um Dead Links zu
vermeiden); eine visuelle Amplituden-/Bandstärken-Kodierung der Erfahrungstiefe (bewusst
verworfen, DD1-b). Die konkrete Visualisierungstechnik und der Farbverlauf sind `/architect` bzw.
`/design`.

## Funktionale Anforderungen

- **FR-004-01** — Eine **durchgehende, ununterbrochene Linie** fließt durch die Disziplin-Stationen
  Frontend, Backend, Architektur und DevOps/Cloud (in dieser Reihenfolge) und transportiert über
  ihre Ununterbrochenheit das **Generalisten-Narrativ** (kein Spezialisten-Silo).
- **FR-004-02** *(geändert, DD1-b)* — Die **Erfahrungstiefe/Ausprägung je Disziplin** wird über
  **Fakten in der jeweiligen Station** (Jahre, Schwerpunkte, Belege) kommuniziert — **nicht** über
  eine visuelle Amplituden-/Bandstärken-Kodierung. Die Information (relative Tiefe je Disziplin)
  bleibt erhalten; nur die Kodierung wird textuell/strukturell statt grafisch.
- **FR-004-03** — Ein **KI-Layer läuft als durchgängiger Faden/Gradient** über die gesamte Länge
  der Linie mit und macht sichtbar, dass KI alle Disziplinen durchdringt (kein eigener Abschnitt).
- **FR-004-04** — Beim Aktivieren einer Station werden deren Details eingeblendet: auf Desktop in
  einem **Detail-Bereich**, auf Mobil als **Aufklapper** an der Station.
- **FR-004-05** — Auf Desktop wird die Linie **horizontal**, auf Mobil **vertikal** dargestellt;
  beide Darstellungen bieten dieselben Detail-Informationen (inhaltliche Parität).
- **FR-004-06** — Kompetenzen/Disziplinen **verlinken nicht** auf Referenzen (keine Dead Links).
- **FR-004-07** — Die **Linux-/Terminal-Affinität** ist unter den Kompetenzen sichtbar
  repräsentiert (Copy-Hook nicht wörtlich „Das Terminal ist meine Heimat").

## Edge Cases & Fehler-/Leer-Zustände

- **reduced-motion aktiv** → statische Linie, Stationen bleiben aktivierbar/aufklappbar (Parität).
- **Mobil** → vertikale Darstellung mit inhaltlicher Parität zur horizontalen (`FR-004-05`).
- **Tastatur** → jede Station ist per Tastatur fokussier- und aktivierbar; Detail lässt sich
  öffnen und schließen.

## Bestätigte Annahmen

- Lehre/Mentoring gehört **nicht** in die Kompetenz-Linie, sondern in FEAT-005 (E1b).
- KI-Gradient ist der einzige Verlaufs-Ort der Seite (Design-Entscheidung; hier nur als Verhalten
  „KI läuft durchgängig mit" referenziert).
- Erfahrungstiefe wird als **Fakt in der Station** ausgewiesen, nicht grafisch kodiert (DD1-b).

## Acceptance Criteria

- Die Linie verbindet ununterbrochen alle vier Disziplin-Stationen; je Station lässt sich ein
  Detail (Desktop-Bereich / mobiler Aufklapper) öffnen und schließen.
- Die Erfahrungstiefe je Disziplin ist als **Fakt in der Station** (Jahre/Schwerpunkte/Belege)
  ablesbar; es gibt **keine** grafische Amplituden-/Bandstärken-Kodierung.
- Kein Element der Linie führt zu einer Referenz-Seite/-Modal.
- Auf 360 px mobil ist die Linie vertikal, vollständig lesbar und tastaturbedienbar; ohne Motion
  bleibt sie statisch nutzbar.

## Traces

- Personas: P2 (Tiefe), P1 (Generalisten-Botschaft auf einen Blick).
- Erfolgskriterien: SC-1 (KI als durchgehender Faden), SC-3.
- Cross-cutting: `FR-CC-01`, `NFR-CC-01` (Tastatur/reduced-motion), `NFR-CC-02` (Lazy-Loading
  des schweren Visuals), `NFR-CC-04`.
