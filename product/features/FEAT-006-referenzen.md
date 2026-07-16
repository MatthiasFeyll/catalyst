# FEAT-006 — Referenzen

## Ziel / Intent

Die Projekt-Galerie: greifbare Belege der fachlichen Arbeit für die tiefer bohrende Persona (P2),
ohne HR (P1) zu überfordern. Karten-Raster mit Detail-Modal, dessen URL **teilbar** ist; die
Struktur ist erweiterbar (weitere Referenzen, z. B. Commerz Real, folgen später).

## Scope

**In:** Karten-Galerie; Detail-Modal mit URL-Sync (teilbar, Zurück schließt); Raster je Karte
(Visual · Kontext · Rolle · Stack-Tags · optionaler Link); definiertes Inventar; Erweiterbarkeit.
**Out:** Eigene Unterseiten pro Referenz; Wiederbelebung/Bereitstellung der referenzierten Apps;
Verlinkung von/zu Kompetenzen; Anzeige vertraulicher/NDA-behafteter Inhalte.

## Referenz-Inventar (bestätigt)

| Referenz | Darstellung / Link |
|----------|--------------------|
| **PromotionPlanner** (Reservix, IMS löst Excel-Prozesse ab) | **Text-only + abstraktes Visual** („Excel-Chaos → strukturiertes System"); **keine Produkt-Screenshots** |
| **VUSC** (Fraunhofer SIT) | **nur** öffentlicher Bericht-/Projektseiten-Link |
| **Hornetsecurity** | **nur** öffentlicher Produktseiten-Link (Security-Awareness-Service) |
| **ADLC-Framework** | Referenz-Karte |
| **goSDN** | Referenz-Karte |
| **Micro-Frontend-Architecture (MFE)** | Referenz-Karte |
| **Software Provisioning** | Referenz-Karte |
| _Commerz Real_ | aktuell nichts Zeigbares — **später** ergänzbar (Erweiterbarkeit) |

## Funktionale Anforderungen

- **FR-006-01** — Referenzen erscheinen als **Karten-Galerie**; jede Karte zeigt Visual, 2–3
  Sätze Kontext, Rolle, Stack-Tags und — sofern vorhanden — einen ausgehenden Link.
- **FR-006-02** — Aktivieren einer Karte öffnet ein **Detail-Modal**: auf kleinen Viewports als
  **Vollbild**, auf großen Viewports als **großzügiges zentriertes Modal**.
- **FR-006-03** — Das Detail-Modal besitzt eine **teilbare URL** (Deep Link); der Aufruf dieser
  URL lädt die Seite mit direkt geöffnetem Referenz-Detail.
- **FR-006-04** — **Browser-Zurück schließt das Modal** und kehrt zur Galerie zurück (keine
  Navigation zu einer eigenen Seite).
- **FR-006-05** — Das Inventar umfasst PromotionPlanner, VUSC, Hornetsecurity, ADLC-Framework,
  goSDN, Micro-Frontend-Architecture und Software Provisioning.
- **FR-006-06** — PromotionPlanner wird **text-only mit einem abstrakten Visual** dargestellt;
  **keine Produkt-Screenshots** (die `assets/reservix/`-Screenshots werden nicht verwendet).
- **FR-006-07** — VUSC verlinkt **ausschließlich** auf seine öffentliche Bericht-/Projektseite
  (keine vertraulichen Inhalte).
- **FR-006-08** — Hornetsecurity verlinkt **ausschließlich** auf die öffentliche Produktseite.
- **FR-006-09** — Das Inventar ist **erweiterbar**: weitere Referenzen (z. B. Commerz Real)
  lassen sich später ohne strukturelle Änderung ergänzen.
- **FR-006-10** — Eine Referenz ohne Link zeigt **keine tote/ins Leere führende** Link-Affordanz.

## Edge Cases & Fehler-/Leer-Zustände

- **Kein reales Visual (z. B. PromotionPlanner)** → abstraktes Visual statt Screenshot
  (`FR-006-06`).
- **Referenz ohne Link** → keine Link-Affordanz (`FR-006-10`).
- **Sehr kleiner Viewport** → Vollbild-Modal mit Scroll; kein abgeschnittener Inhalt.
- **Direkter Deep-Link auf unbekannte Referenz-ID** → Galerie ohne offenes Modal (definierter
  Fallback, kein Fehlerzustand).

## Bestätigte Annahmen

- `assets/reservix/`-Screenshots werden **nicht** verwendet (C3c/C3d) und sind Teil der
  Repo-Hygiene (Entfernung außerhalb dieser Spec).
- Zu Commerz Real gibt es aktuell nichts Zeigbares — Struktur bleibt erweiterbar (C3c).
- Grafiken der übrigen Projekte werden bei der Umsetzung eingesammelt (Material).

## Acceptance Criteria

- Jede Karte zeigt Visual, Kontext (2–3 Sätze), Rolle und Stack-Tags; ein Link erscheint nur,
  wenn vorhanden.
- Öffnen eines Details ändert die URL; Kopieren/Aufrufen dieser URL öffnet dieselbe Referenz
  direkt; Browser-Zurück schließt das Modal.
- PromotionPlanner zeigt kein Produkt-Screenshot; VUSC und Hornetsecurity zeigen je genau einen
  ausgehenden Link auf die jeweilige öffentliche Seite.

## Traces

- Personas: P2 (primär, tiefer bohren), P1 (überblicksartig).
- Erfolgskriterien: SC-2.
- Cross-cutting: `FR-CC-01`, `NFR-CC-01`, `NFR-CC-04`.
- Verknüpfung: FEAT-003 (Timeline-Stationen verlinken auf Referenzen).
