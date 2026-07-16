# FEAT-008 — KI-Matthias-Chat

## Ziel / Intent

Das **Signature-Element** der Seite und der zentrale AI-native-Beleg (SC-1): Besucher:innen
„fragen KI-Matthias" Dinge über Werdegang, Kompetenzen usw. In Meilenstein 1 **geführt**
(deterministisch, ohne Kosten, ohne Missbrauchsrisiko); als spätere Ausbaustufe eine
LLM-Freitext-Stufe. Wirkt bewusst **nicht** wie ein generischer Firmen-Servicebot.

## Scope

**In (Meilenstein 1, geführt):** persönliche Erstnachricht, vordefinierte Fragen mit kuratierten
Antworten, Relay-Aktion (an FEAT-009), voll designtes UI.
**In (spätere Ausbaustufe, LLM):** Freitext-Eingabe, sprachabhängige Antworten (DE/EN),
strikte Themen-Allowlist, monatlicher Budget-Cap (~20 €), entspanntes Rate-Limit, Streaming,
Fallback-Kaskade auf den geführten Modus.
**Out:** Freitext-Eingabefeld in Meilenstein 1; Servicebot-Anmutung; Nutzung der KI für
themenfremde Zwecke.

## Funktionale Anforderungen (Meilenstein 1 — geführt)

- **FR-008-01** — Der Chat begrüßt mit einer **persönlichen Erstnachricht** (im Du-Ton), **nicht**
  mit einer generischen Servicebot-Begrüßung.
- **FR-008-02** — Die Interaktion erfolgt über **vordefinierte Fragen mit kuratierten Antworten**;
  in Meilenstein 1 gibt es **kein Freitext-Eingabefeld**.
- **FR-008-03** — Der geführte Chat bietet eine **Relay-Aktion** an („Soll ich das Matthias
  weiterleiten?"); die Durchführung liegt bei FEAT-009 (User-E-Mail erforderlich).
- **FR-008-04** — Der Chat ist ein **prominentes Signature-Element** der Seite (in Meilenstein 1
  voll designt), nicht der Hero.

## Funktionale Anforderungen (spätere Ausbaustufe — LLM-Freitext)

- **FR-008-05** — Ein **Freitext-LLM-Modus** kann aktiviert werden; er antwortet in **Deutsch
  oder Englisch je nach Sprache der Nutzer-Eingabe**.
- **FR-008-06** — Der LLM-Modus erzwingt eine **strikte Themen-Allowlist**; themenfremde Anfragen
  werden abgelehnt und auf zulässige Themen zurückgeführt.
- **FR-008-07** — Der LLM-Modus ist durch ein **monatliches Kostenbudget (~20 €)** begrenzt; bei
  Erreichen des Caps **degradiert** der Chat auf den geführten Modus.
- **FR-008-08** — Ist der LLM-Dienst **nicht verfügbar**, degradiert der Chat auf den geführten
  Modus (Fallback-Kaskade).
- **FR-008-09** — Für den LLM-Modus gilt ein **entspanntes Rate-Limit pro Nutzer:in**.
- **FR-008-10** — LLM-Antworten werden **progressiv gestreamt**.

## Edge Cases & Fehler-/Leer-Zustände

- **Budget-Cap erreicht** → geführter Modus (`FR-008-07`).
- **LLM-Dienst down / Timeout** → geführter Modus (`FR-008-08`).
- **Themenfremde Freitext-Anfrage** → Ablehnung + Rückführung (`FR-008-06`).
- **Der geführte Modus ist jederzeit als Baseline und dauerhafter Fallback verfügbar.**

## Bestätigte Annahmen

- Guided-first; Meilenstein 1 **ohne** Freitextfeld (J7).
- LLM-Stufe nutzt ein günstiges, schwaches Modell-Klasse-Level bei ~20 €/Monat-Cap (J8) — die
  konkrete Modellwahl ist Architektur (`/architect`), hier nur als kostenbegrenztes Verhalten.
- Erwartetes Aufkommen sehr niedrig (≈ 1 Nutzer:in/Monat) → Rate-Limit entspannt.

## Acceptance Criteria

- Meilenstein 1: Erstnachricht ist persönlich; es existiert kein Freitextfeld; vordefinierte
  Fragen liefern kuratierte Antworten; eine Relay-Aktion ist verfügbar.
- Ausbaustufe: Bei simuliertem Cap-Erreichen bzw. LLM-Ausfall fällt der Chat sichtbar auf den
  geführten Modus zurück, ohne Fehlerzustand.
- Ausbaustufe: Eine englischsprachige Eingabe erhält eine englische Antwort, eine deutsche eine
  deutsche.

## Traces

- Personas: P1, P2.
- Erfolgskriterien: SC-1 (zentraler AI-native-Beleg), SC-2 (lädt zum Gespräch ein via Relay).
- Cross-cutting: `FR-CC-01`, `FR-CC-02`, `NFR-CC-01`, `NFR-CC-02` (Lazy-Loading des Chats),
  `NFR-CC-05` (keine tracking-cookiepflichtige Datenverarbeitung).
- Abhängigkeit: FEAT-009 (Relay-Zustellung).
