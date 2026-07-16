# FEAT-004 — Kompetenz-Band

## Ziel / Intent

Das **Generalisten-Narrativ** im KI-Zeitalter visuell erzählt: ein gewelltes Band spannt sich
über alle Disziplinen der Softwareentwicklung, und KI fließt als durchgehender Faden hindurch.
Kein Spezialisten-Silo, sondern Breite plus Tiefe — schön animiert, ein Signature-Visual für
SC-3.

## Scope

**In:** Gewelltes Band über die Disziplinen **Frontend · Backend · Architektur · DevOps/Cloud**;
Bandstärke als Tiefen-Codierung; KI als durchfließender Akzent; aufklappbare Detail-Spalten;
Desktop horizontal / Mobil vertikal; sichtbar gemachte Linux-/Terminal-Affinität.
**Out:** Verlinkung von Kompetenzen auf Referenzen (bewusst ausgeschlossen, um Dead Links zu
vermeiden). Die konkrete Visualisierungstechnik und der Farbverlauf sind `/architect` bzw.
`/design`.

## Funktionale Anforderungen

- **FR-004-01** — Ein durchgehendes, gewelltes Band spannt sich über die Disziplinen Frontend,
  Backend, Architektur und DevOps/Cloud und transportiert das Generalisten-Narrativ.
- **FR-004-02** — Die **Bandstärke codiert die Tiefe/Ausprägung** je Disziplin.
- **FR-004-03** — Ein **KI-Layer fließt als durchgehender Akzent** durch das gesamte Band und
  macht sichtbar, dass KI alle Disziplinen durchdringt.
- **FR-004-04** — Beim Aktivieren/Aufklappen einer Disziplin werden deren Details (Kompetenzen in
  Spalten) **unter dem Abschnitt** eingeblendet.
- **FR-004-05** — Auf Desktop wird das Band **horizontal**, auf Mobil **vertikal** dargestellt;
  beide Darstellungen bieten dieselben Detail-Informationen.
- **FR-004-06** — Kompetenzen/Disziplinen **verlinken nicht** auf Referenzen (keine Dead Links).
- **FR-004-07** — Die **Linux-/Terminal-Affinität** ist unter den Kompetenzen sichtbar
  repräsentiert (Copy-Hook nicht wörtlich „Das Terminal ist meine Heimat").

## Edge Cases & Fehler-/Leer-Zustände

- **reduced-motion aktiv** → statisches Band, Details bleiben aufklappbar (Parität).
- **Mobil** → vertikale Darstellung mit inhaltlicher Parität zur horizontalen (`FR-004-05`).
- **Tastatur** → jede Disziplin ist per Tastatur fokussier- und aufklappbar.

## Bestätigte Annahmen

- Lehre/Mentoring gehört **nicht** ins Band, sondern in FEAT-005 (E1b).
- KI-Gradient ist der einzige Verlaufs-Ort der Seite (Design-Entscheidung; hier nur als
  Verhalten „KI fließt durch" referenziert).

## Acceptance Criteria

- Das Band zeigt alle vier Disziplinen; je Disziplin lässt sich ein Detail-Bereich auf- und
  zuklappen.
- Kein Element des Bands führt zu einer Referenz-Seite/-Modal.
- Auf 360 px mobil ist das Band vertikal, vollständig lesbar und tastaturbedienbar; ohne Motion
  bleibt es statisch nutzbar.

## Traces

- Personas: P2 (Tiefe), P1 (Generalisten-Botschaft auf einen Blick).
- Erfolgskriterien: SC-1 (KI als durchgehender Faden), SC-3.
- Cross-cutting: `FR-CC-01`, `NFR-CC-01` (Tastatur/reduced-motion), `NFR-CC-02` (Lazy-Loading
  des schweren Visuals), `NFR-CC-04`.
