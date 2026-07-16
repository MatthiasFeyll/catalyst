# FEAT-011 — SEO/AEO-Paket

## Ziel / Intent

Auffindbarkeit für Menschen (SEO) **und** für LLM-Agenten (AEO). Da die Zielgruppe zunehmend
über KI-Assistenten sucht, gehört neben klassischem SEO auch ein LLM-lesbares Pendant zur
`robots.txt` dazu (`llms.txt`). Beide Sprachfassungen sind ohne Client-Ausführung indexierbar.

## Scope

**In:** vorgerenderte, crawlbare Inhalte beider Sprachen; hreflang-Verknüpfung; `sitemap.xml`;
`robots.txt`; strukturierte Meta-Angaben + Open-Graph-Share-Image; `llms.txt`.
**Out:** Konkrete Prerender-/Build-Technik (Architektur); Content-Ausformulierung der Metas
(`/design`/Umsetzung).

## Funktionale Anforderungen

- **FR-011-01** — Beide Sprachfassungen (DE/EN) sind als **vorgerenderte, crawlbare Inhalte**
  verfügbar (Kerninhalt ist **ohne** Client-Skript-Ausführung indexierbar).
- **FR-011-02** — Die Sprachfassungen sind über **hreflang** wechselseitig verknüpft.
- **FR-011-03** — Eine **`sitemap.xml`** listet die crawlbaren URLs.
- **FR-011-04** — Eine **`robots.txt`** steuert den Crawler-Zugriff.
- **FR-011-05** — Seiten liefern **strukturierte Meta-Angaben** (Titel/Beschreibung) und ein
  **Open-Graph-Share-Image**.
- **FR-011-06** — Eine **`llms.txt`** stellt eine LLM-lesbare Zusammenfassung der Seite bereit
  (Pendant zur `robots.txt`).

## Edge Cases & Fehler-/Leer-Zustände

- **Crawler ohne JS** → Kerninhalt bleibt lesbar (`FR-011-01`).
- **Fehlendes OG-Image** → definierter Fallback (kein defekter Share-Preview).

## Bestätigte Annahmen

- Prerender + Meta/OG + hreflang „reicht aus" als SEO-Mechanik (B5).
- `llms.txt` ist neu aufgenommen (Owner-Wunsch, J9).

## Acceptance Criteria

- Für DE und EN existiert je eine vorgerenderte, ohne JS lesbare Fassung, wechselseitig per
  hreflang verlinkt.
- `sitemap.xml`, `robots.txt`, `llms.txt` und ein OG-Image sind vorhanden und valide erreichbar.

## Traces

- Personas: P1 (klassische Suche), P2, plus LLM-Agenten (AEO).
- Erfolgskriterien: SC-1 (AI-native/AEO), SC-2 (Auffindbarkeit).
- Cross-cutting: `FR-CC-01`, `NFR-CC-02`.
- Verknüpfung: FEAT-010 (Sprachfassungen).
