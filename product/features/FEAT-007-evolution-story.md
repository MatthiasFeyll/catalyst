# FEAT-007 — Evolution-Story

> **Revidiert via /design-Re-Entry 2026-07-16, Owner-approved (DD2):** **Kuratierte Screenshots
> sind jetzt die Primärdarstellung** jeder Generation (Desktop UND mobil); „Live öffnen" ist ein
> **externer Link** (neuer Tab); die **Live-iframe-Einbettung ist optional** und nur dort zulässig,
> wo sie stabil ist — nicht mehr gefordert. Grund: Live-iframes der Alt-Seiten sind fragil (Laden,
> `X-Frame-Options`/CSP, tote Apps) und holen fremdes Alt-Design in die neue Ästhetik; der
> Screenshot war realistisch ohnehin der Normalfall. Die Fallback-Ketten vereinfachen sich: der
> Screenshot ist der **Ausgangszustand**, kein Fallback. IDs stabil gehalten; RV-08 bewusst
> entschärft (siehe unten), nicht gelöscht.

## Ziel / Intent

Ein eigenes narratives Element: die **vier Generationen** der Personal Page als Beleg für
**kontinuierliches Lernen** (lookup → lookdown → median → catalyst). Ein einprägsamer,
„catchy" Faktor (SC-3) und zugleich Beleg der AI-native-Story (SC-1) — catalyst ist die erste
vollständig KI-geschriebene Generation.

## Scope

**In:** Narrativ der vier Generationen; **kuratierte Screenshots** jeder Generation im
„Museums-Rahmen" (Desktop und mobil) als Primärdarstellung; **„Live öffnen" als externer Link**
(neuer Tab) für erreichbare Alt-Apps; **optionale** Live-iframe-Einbettung über einen
**Einbettungs-Kontrakt** (konfigurierbare URL) nur dort, wo sie sich als stabil erweist; Verweis
auf das öffentliche catalyst-Repository.
**Out:** Wiederbelebung, Hosting oder Bereitstellung von lookup/lookdown (separate Arbeit
außerhalb catalyst). catalyst trifft **keine** Annahme über deren Hosting. Eine **verpflichtende**
Live-Einbettung ist bewusst nicht gefordert (DD2).

## Funktionale Anforderungen

- **FR-007-01** — Die vier Generationen (lookup, lookdown, median, catalyst) werden als
  **kontinuierliches Lern-Narrativ** dargestellt.
- **FR-007-02** *(geändert, DD2)* — Jede Generation wird auf **Desktop und Mobil** primär über
  einen **kuratierten Screenshot** im „Museums-Rahmen" gezeigt. Für erreichbare Alt-Apps gibt es
  einen **„Live öffnen"-Link**, der die Alt-App in einem **neuen Tab** öffnet (keine Pflicht zur
  Einbettung).
- **FR-007-03** *(geändert, DD2)* — Der **Screenshot ist der Ausgangszustand**, kein Fallback:
  unabhängig davon, ob eine Generation erreichbar ist, das Framing verweigert oder gar keine URL
  hat, zeigt die Seite denselben kuratierten Screenshot — **nie** ein defekter/leerer Rahmen. Eine
  Framing-/Erreichbarkeits-Heuristik ist damit **nicht mehr erforderlich**.
- **FR-007-04** *(geändert, DD2)* — Die Einbettungs-URL bleibt **je Generation konfigurierbar**
  (Einbettungs-Kontrakt) als **optionale** Fähigkeit; es gibt keine festverdrahtete
  Hosting-Annahme. Eine konfigurierte URL speist den **„Live öffnen"-Link** und darf **optional**
  eine Live-iframe-Einbettung dort ermöglichen, wo sie sich als stabil erweist.
- **FR-007-05** — catalyst wird als **aktuelle, vollständig KI-geschriebene** Generation
  dargestellt, mit einem Link auf sein **öffentliches Repository** (Beleg der AI-written-Story).

## Edge Cases & Fehler-/Leer-Zustände

- **Keine URL für eine Generation konfiguriert** → nur der kuratierte Screenshot, kein „Live
  öffnen"-Link, kein leerer Rahmen.
- **App down / nicht erreichbar** → der Screenshot (Ausgangszustand) bleibt stehen; ein „Live
  öffnen"-Link kann ins Leere führen, bricht die Darstellung aber nicht (der Screenshot trägt).
- **Framing verweigert** (Alt-Seite blockt Einbettung via `X-Frame-Options`/CSP) → gegenstandslos,
  da Einbettung nur optional/stabil erfolgt; die Screenshot-Primärdarstellung ist unberührt.
- **Mobil** → identische Screenshot-Primärdarstellung im Museums-Rahmen mit „Live öffnen" (neuer
  Tab), inhaltliche Parität zu Desktop.

## Bestätigte Annahmen

- Wiederbelebung von lookup/lookdown ist out of scope; catalyst konsumiert nur (optionale) URL +
  kuratierten Screenshot (C1/C2).
- Repo ist öffentlich und wird auf der Seite verlinkt (B1c).
- **RV-08 (bewusst entschärft, DD2):** Die frühere **Betriebsvoraussetzung**, dass die eigenen
  Alt-Apps catalyst per CSP `frame-ancestors` für die **Live-Einbettung** freigeben müssen, ist mit
  der Umstellung auf **Screenshot-primär** weitgehend **gegenstandslos**. Die Live-Einbettung ist
  nur noch optional; ohne Freigabe/ohne stabile Einbettung bleibt schlicht der Screenshot stehen —
  kein Fehlerzustand, keine Owner-Vorbedingung mehr für die Kern-Darstellung. Der Hinweis bleibt
  als Kontext dokumentiert (nicht gelöscht), falls die optionale Einbettung später aktiviert wird.

## Acceptance Criteria

- Alle vier Generationen erscheinen im Narrativ; catalyst ist als KI-geschrieben ausgewiesen und
  verlinkt sein öffentliches Repository.
- Jede Generation zeigt auf Desktop und Mobil ihren **kuratierten Screenshot** im Museums-Rahmen;
  für erreichbare Alt-Apps erscheint ein **„Live öffnen"-Link** (neuer Tab).
- In **keinem** Zustand (nicht erreichbar, Framing verweigert, keine URL) erscheint ein defekter
  oder leerer Rahmen — der Screenshot trägt die Darstellung durchgehend.

## Traces

- Personas: P1, P2.
- Erfolgskriterien: SC-1 (KI-geschriebene Seite, Repo-Beleg), SC-3 (Lern-Narrativ, Erinnerungs-
  wert).
- Cross-cutting: `FR-CC-01`, `NFR-CC-01`, `NFR-CC-04`.
