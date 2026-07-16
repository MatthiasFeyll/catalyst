# FEAT-013 — Delight & Easter-Eggs

## Ziel / Intent

Individueller Charakter und Erinnerungswert (SC-3), gezielt für die technische Persona (P2), ohne
die HR-Reise (P1) zu stören: ein verstecktes DevTools-Terminal, ein Konsolen-Gruß und subtile
Mikro-Interaktionen. „Belohnung fürs tiefer Schauen".

## Scope

**In:** DevTools-/On-Page-Terminal mit den Befehlen `help`, `whoami`, `skills`, `contact`;
Konsolen-Begrüßung; Mikro-Hover-Interaktionen.
**Out:** Copy wörtlich „Das Terminal ist meine Heimat" (Hook-Richtung ok, Feinschliff `/design`);
alles, was die primäre HR-Reise blockiert oder ablenkt.

## Funktionale Anforderungen

- **FR-013-01** — Ein verstecktes **Terminal** reagiert auf die Befehle `help`, `whoami`,
  `skills`, `contact`; `help` listet die verfügbaren Befehle auf.
- **FR-013-02** — In der Browser-Konsole erscheint eine **freundliche Begrüßung** (Konsolen-Gruß).
- **FR-013-03** — **Mikro-Interaktionen bei Hover** erhöhen das Delight, ohne die Bedienbarkeit zu
  beeinträchtigen.
- **FR-013-04** — Alle Easter-Eggs sind **unaufdringlich und für den primären HR-Pfad
  unsichtbar** — sie blockieren oder stören die Hauptreise nie.

## Edge Cases & Fehler-/Leer-Zustände

- **reduced-motion aktiv** → Mikro-Hover degradiert zu einem statischen/dezenten Zustand
  (`NFR-CC-01`).
- **Unbekannter Terminal-Befehl** → freundlicher Hinweis + Verweis auf `help`.
- **Touch-/Mobil ohne Hover** → keine funktionale Abhängigkeit von Hover; Kerninhalt bleibt
  vollständig erreichbar.

## Bestätigte Annahmen

- Linux/Terminal-Leidenschaft sichtbar machen; Copy nicht wörtlich, Hook-Richtung bestätigt (I3).
- Easter-Eggs für HR unsichtbar (dürfen die 5-Sekunden-Klarheit nicht gefährden).

## Acceptance Criteria

- Die vier Befehle liefern je eine passende Ausgabe; ein unbekannter Befehl verweist auf `help`.
- Ein Konsolen-Gruß ist beim Öffnen der Browser-Konsole sichtbar.
- Der primäre Inhalts- und Kontaktpfad funktioniert vollständig, auch wenn kein Easter-Egg
  entdeckt wird und ohne Hover (Touch).

## Traces

- Personas: P2 (primär), P1 (unbeeinträchtigt).
- Erfolgskriterien: SC-1 (technische Signatur), SC-3 (Erinnerungswert).
- Cross-cutting: `FR-CC-01`, `NFR-CC-01`, `NFR-CC-06` (unaufdringlich / „less is more").
