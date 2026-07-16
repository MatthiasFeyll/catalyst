# FEAT-007 — Evolution-Story

## Ziel / Intent

Ein eigenes narratives Element: die **vier Generationen** der Personal Page als Beleg für
**kontinuierliches Lernen** (lookup → lookdown → median → catalyst). Ein einprägsamer,
„catchy" Faktor (SC-3) und zugleich Beleg der AI-native-Story (SC-1) — catalyst ist die erste
vollständig KI-geschriebene Generation.

## Scope

**In:** Narrativ der vier Generationen; Einbettung/Vorschau der Alt-Apps über einen
**Einbettungs-Kontrakt** (konfigurierbare URL + Verfügbarkeits-Fallback); Verweis auf das
öffentliche catalyst-Repository.
**Out:** Wiederbelebung, Hosting oder Bereitstellung von lookup/lookdown (separate Arbeit
außerhalb catalyst). catalyst trifft **keine** Annahme über deren Hosting.

## Funktionale Anforderungen

- **FR-007-01** — Die vier Generationen (lookup, lookdown, median, catalyst) werden als
  **kontinuierliches Lern-Narrativ** dargestellt.
- **FR-007-02** — Auf **Desktop** wird eine Generation in einem eingebetteten „Museums-Rahmen"
  live gezeigt; auf **Mobil** als **Screenshot-Galerie** mit „in neuem Tab öffnen".
- **FR-007-03** — Kann eine Generation **nicht live eingebettet** werden, wird ein
  **Screenshot-Fallback** gezeigt (kein defekter/leerer Rahmen). Das gilt für **zwei
  unterscheidbare Zustände** mit **derselben** Fallback-Darstellung:
  - (a) die Alt-Seite ist **nicht erreichbar** (down/Netzwerkfehler);
  - (b) die Alt-Seite antwortet, **verweigert aber das Framing** (z. B. per `X-Frame-Options` /
    CSP `frame-ancestors`).
  Da Cross-Origin-Introspektion des Frame-Inhalts nicht möglich ist, wird Zustand (b) über eine
  **definierte Heuristik** erkannt (iframe-Lade-Timeout: erfolgt bis zum Timeout kein
  erfolgreicher Ladevorgang, greift der Screenshot-Fallback).
- **FR-007-04** — Die Einbettungs-URL ist **je Generation konfigurierbar**; es gibt keine
  festverdrahtete Hosting-Annahme.
- **FR-007-05** — catalyst wird als **aktuelle, vollständig KI-geschriebene** Generation
  dargestellt, mit einem Link auf sein **öffentliches Repository** (Beleg der AI-written-Story).

## Edge Cases & Fehler-/Leer-Zustände

- **App down / nicht erreichbar** → Screenshot-Fallback (`FR-007-03` (a)).
- **Framing verweigert** (Alt-Seite antwortet, blockt Einbettung via `X-Frame-Options`/CSP
  `frame-ancestors`) → **derselbe** Screenshot-Fallback, erkannt über iframe-Lade-Timeout
  (`FR-007-03` (b)).
- **Mobil** → Screenshot-Galerie statt Live-Einbettung (`FR-007-02`).
- **Keine URL für eine Generation konfiguriert** → nur Screenshot, kein leerer Rahmen.

## Bestätigte Annahmen

- Wiederbelebung von lookup/lookdown ist out of scope; catalyst konsumiert nur URL +
  Screenshot-Fallback (C1/C2).
- Repo ist öffentlich und wird auf der Seite verlinkt (B1c).
- **Betriebsvoraussetzung (RV-08):** Für die **Live-Einbettung** müssen die eigenen Alt-Apps
  catalyst per CSP `frame-ancestors` freigeben. Das liegt in **Owner-Hand** (Anpassung der
  Alt-Apps); ihre Wiederbelebung/Anpassung ist **out of scope** für catalyst. Ohne Freigabe
  greift dauerhaft der Screenshot-Fallback (`FR-007-03` (b)) — kein Fehlerzustand.

## Acceptance Criteria

- Alle vier Generationen erscheinen im Narrativ; catalyst ist als KI-geschrieben ausgewiesen und
  verlinkt sein öffentliches Repository.
- Bei nicht erreichbarer eingebetteter App **und** bei verweigertem Framing (Timeout ohne
  erfolgreiches Laden) erscheint jeweils derselbe Screenshot-Fallback statt eines Fehlers.
- Auf Mobil erscheint die Screenshot-Galerie mit „in neuem Tab öffnen".

## Traces

- Personas: P1, P2.
- Erfolgskriterien: SC-1 (KI-geschriebene Seite, Repo-Beleg), SC-3 (Lern-Narrativ, Erinnerungs-
  wert).
- Cross-cutting: `FR-CC-01`, `NFR-CC-01`, `NFR-CC-04`.
