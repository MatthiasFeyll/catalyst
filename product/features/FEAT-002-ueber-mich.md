# FEAT-002 — Über mich

## Ziel / Intent

Der „Mensch hinter dem Code": persönliche Facetten, die Matthias als engagierten, weltoffenen
Generalisten zeigen — nicht als „Nerd, der nie rauskommt", aber auch nicht überinszeniert. Baut
emotionale Bindung auf (Du-Ansprache, Ich-Perspektive) und stützt SC-2/SC-3.

## Scope

**In:** Facetten Band-Europatour, technische Affinität (Smart Home/NAS/Self-Hosting),
selbständige Videografie (niedrig gehängt), interkulturelle Reisen; Porträt; optionale
Hobby-/Alltagsfotos.
**Out:** Firmenname/Link zur Videografie; Wohnort/Adresse; Familienthemen; Intro-Video.

## Funktionale Anforderungen

- **FR-002-01** — Die Facette **Band-Europatour** wird mit exakt diesen Fakten dargestellt:
  **35 Tage, 13 Länder, 30 Shows**, Rolle **Roadie und Band-Mitglied**, Arbeitssprache Englisch.
- **FR-002-02** — Die Facette **technische Affinität** (Smart Home, NAS, Self-Hosting) wird als
  privates Interesse dargestellt.
- **FR-002-03** — Die Facette **selbständige Videografie** wird niedrig gehängt und im
  People-Business-Kontext dargestellt: **ohne Firmennamen, ohne Link, ohne Portfolio-Behauptung**
  (Nebentätigkeit, kein zeigbares Portfolio).
- **FR-002-04** — Die Facette **interkulturelle Reisen** (u. a. Sri Lanka, Indonesien, Bangkok)
  wird ohne Überhöhung dargestellt (nicht „Reisemaus").
- **FR-002-05** — Ein Porträt wird angezeigt. Solange das helle Porträt nicht geliefert ist,
  dient das dunkle median-Foto als Platzhalter; fehlt jedes Porträt, bricht das Layout nicht
  (definierter Leer-Zustand, kein defektes Bild).
- **FR-002-06** — Hobby-/Alltagsfotos werden angezeigt, wenn geliefert; fehlen sie, bleibt der
  Abschnitt inhaltlich kohärent (keine leeren/defekten Bildplätze).

## Edge Cases & Fehler-/Leer-Zustände

- **Helles Porträt fehlt** → dunkles median-Foto als Platzhalter (`FR-002-05`).
- **Hobby-Fotos fehlen** → Abschnitt ohne Bilder weiterhin stimmig (`FR-002-06`).
- **Videografie** → niemals Firmenname/Instagram/Link (harte Leitplanke).

## Bestätigte Annahmen

- „Alles darf auf die Seite" — aber **kein Wohnort/keine Adresse, keine Familienthemen** (D4).
- Videografie als reine Facette, niedrig gehängt; Name **(Firmenname bewusst nicht genannt)** ungenannt (J5).
- Band-Fakten sind die im Discovery korrigierten Werte (35 Tage, nicht „3 Monate").

## Acceptance Criteria

- Band-Facette nennt exakt 35 Tage / 13 Länder / 30 Shows und die Doppelrolle Roadie und
  Band-Mitglied.
- In keiner Sprachfassung erscheinen der Videografie-Firmenname oder ein Instagram-/externer
  Videografie-Link.
- Ohne geliefertes helles Porträt wird der Platzhalter gezeigt; ohne Hobby-Fotos entstehen keine
  defekten Bildplätze.

## Traces

- Personas: P1, P2.
- Erfolgskriterien: SC-2, SC-3.
- Cross-cutting: `FR-CC-01`, `FR-CC-02`, `NFR-CC-04`.
- Ausstehende Materialien: helles Porträt, Hobby-Fotos.
