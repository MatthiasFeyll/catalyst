# ADR-0006 — Chat-Architektur: guided-first, LLM als spätere Function-Stufe

- **Status:** accepted
- **Datum:** 2026-07-14
- **Kontext-Phase:** /discover → Architektur

## Kontext

Der KI-Matthias-Chat (FEAT-008) ist das Signature-Element und der zentrale AI-native-Beleg (SC-1).
Der Owner setzt eine harte Kostengrenze (~20 EUR/Monat), erwartet sehr geringes Aufkommen
(≈ 1 Nutzer:in/Monat), will keinen generischen Servicebot-Look und eine strikte Themen-Allowlist.
Meilenstein 1 soll den Chat voll designt, aber **ohne Kosten und ohne Missbrauchsrisiko** liefern.

## Entscheidung

### Meilenstein 1 — geführt (Q&A clientseitig, Relay über die Kontakt-Function)
- **Deterministischer geführter Modus**: persönliche Erstnachricht im Du-Ton (FR-008-01),
  **vordefinierte Fragen mit kuratierten Antworten**, **kein Freitext-Eingabefeld** (FR-008-02),
  Relay-Aktion an FEAT-009 (FR-008-03).
- Die kuratierten Q&A-Inhalte liegen **clientseitig im SPA-Bundle** (bzw. als statisches
  Datenmodul). Der **geführte Q&A-Teil** ruft **keine** LLM-API und **keine** Function auf —
  0 EUR, kein Netzwerk. **Die Relay-Aktion ist aber auch in M1 ein Function-Aufruf**
  (FR-008-03 → FR-009-05): sie nutzt die bestehende **Kontakt-/Relay-Function** (ADR-0007), also
  die vorhandene `spa → functions`-Kante des Modells. Es gibt lediglich **keine** eigene
  Chat→LLM-Kante in M1; die `functions → llm`-Kante ist „Future".

### Spätere Ausbaustufe — LLM-Freitext über eine Serverless Function
- **Freitext-Modus** über einen **serverseitigen LLM-Proxy** (Container „Serverless Functions",
  Kante `functions → llm`, im Modell als „Future"/spätere Stufe markiert). Der API-Key liegt nur
  serverseitig (ADR-0003), nie im Client.
- **Modellklasse:** günstig/„Haiku-Klasse" (schwaches, kostengünstiges Modell reicht).
- **Sprache:** antwortet in **DE oder EN je nach Sprache der Nutzer-Eingabe** (FR-008-05).
- **Themen-Allowlist:** **strikt** — themenfremde Anfragen werden abgelehnt und auf zulässige
  Themen (Werdegang, Kompetenzen, Projekte) zurückgeführt (FR-008-06). Verteidigt gegen
  Prompt-Injection gegen die Persona (siehe Threat-Model).
- **Budget-Cap:** **hartes Monats-Budget ~20 EUR** mit einem **serverseitigen Zähler in einem eng
  umrissenen Ephemeral-KV-Store** (z. B. Vercel KV / Upstash — nur Zähler, keine Domänen-/
  Nutzerdaten; ADR-0001); bei Erreichen des Caps **degradiert** der Chat auf den geführten Modus
  (FR-008-07). Dieser KV-Zähler wird mit der LLM-Stufe **verbindlich**, weil die harte Grenze eine
  Owner-Kernanforderung ist.
- **Rate-Limit:** **entspannt** pro IP/Nutzer:in (Aufkommen ist minimal), primär als
  Kosten-/Missbrauchs-Schutz (FR-008-09); ebenfalls über den KV-Zähler (für den M1-Kontakt-Pfad
  genügt In-Memory als Best-Effort-Hygiene, ADR-0001).
- **Streaming:** Antworten werden **progressiv gestreamt** (FR-008-10).

### Fallback-Kaskade
- **LLM-Ausfall/Timeout → geführter Modus** (FR-008-08). **Budget-Cap erreicht → geführter
  Modus** (FR-008-07). Der geführte Modus ist damit **dauerhafte Baseline und Fallback** — die
  Seite funktioniert immer, auch ohne LLM.

## Konsequenzen

- **Positiv:** M1 liefert das Signature-Feature ohne Kosten/Risiko; die LLM-Stufe ist additiv und
  jederzeit sicher degradierbar; das Kostenrisiko ist hart gedeckelt.
- **Positiv fürs Gate:** da der geführte Modus die Baseline ist, testet das E2E-Gate (ADR-0004)
  deterministisch ohne LLM-Live-Aufruf; die Fallback-Kaskade wird gegen simulierten Cap/Ausfall
  geprüft.
- **Sicherheit:** Prompt-Injection, Budget-Drain und Datenschutz der Eingaben Richtung LLM sind im
  Threat-Model adressiert; die LLM-Verarbeitung wird im Datenschutz offengelegt (FEAT-012).
- **Negativ / Grenze:** die harte Allowlist kann legitime Randfragen ablehnen — bewusst
  konservativ zugunsten von Kosten-/Reputationsschutz.
