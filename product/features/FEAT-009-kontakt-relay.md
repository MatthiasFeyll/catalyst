# FEAT-009 — Kontakt & Relay

## Ziel / Intent

Der niedrigschwellige Weg ins Gespräch (SC-2): ein bewusst **lean** gehaltenes Kontaktformular
plus ein **Chat-Relay** („Soll ich das Matthias weiterleiten?"). Nachrichten erreichen den Owner
**zuverlässig über zwei Kanäle** (Push + E-Mail) mit Absender-Bestätigung. Die E-Mail-Adresse
bleibt geschützt (nur im Impressum).

## Scope

**In:** Formular mit genau drei Feldern; Chat-Relay mit E-Mail-Pflicht; Zwei-Kanal-Zustellung an
den Owner; Absender-Bestätigung; Honeypot + Rate-Limit; Submit-Zustände mit Inline-Retry;
Profil-/Kontaktlinks (GitHub, GitLab, LinkedIn).
**Out:** Captcha/reCAPTCHA; Klartext-E-Mail im Formular/auf der Seite; Xing; weitere
Formularfelder.

## Funktionale Anforderungen

- **FR-009-01** — Das Kontaktformular hat **genau drei Felder**: Name, E-Mail, Nachricht.
- **FR-009-02** — Beim Absenden wird die Nachricht dem Owner über **zwei Kanäle** zugestellt:
  eine **Push-Benachrichtigung** und eine **E-Mail**.
- **FR-009-03** — Der/die Absender:in erhält eine **Empfangs-Bestätigung im Du-Ton**.
- **FR-009-04** — Spam-Schutz erfolgt über ein **Honeypot-Feld** plus ein **serverseitiges
  Rate-Limit**; **kein Captcha**.
- **FR-009-05** — Das **Chat-Relay** stellt über denselben Zustellweg zu und **erfordert die
  E-Mail-Adresse** der Nutzer:in (Aufhänger aus FEAT-008).
- **FR-009-06** — Submit-Zustände werden dargestellt (Ruhe / Senden / Erfolg / Fehler); im
  Fehlerfall ist ein **Inline-Retry** ohne Datenverlust möglich.
- **FR-009-07** — Die E-Mail-Adresse des Owners erscheint **an keiner Stelle des Formulars/Flows
  im Klartext** (ausschließlich im Impressum, FEAT-012).
- **FR-009-08** — Profil-/Kontaktlinks werden angeboten: **GitHub, GitLab, LinkedIn** — **kein
  Xing**. Die LinkedIn-URL wird angezeigt, sobald geliefert; bis dahin entfällt der Link (kein
  Dead Link).

## Edge Cases & Fehler-/Leer-Zustände

- **Zustellung schlägt fehl** → sichtbarer Fehlerzustand + Inline-Retry, Eingaben bleiben
  erhalten (`FR-009-06`).
- **Relay ohne E-Mail** → wird geblockt mit Hinweis, dass die E-Mail nötig ist (`FR-009-05`).
- **Honeypot befüllt** → Einreichung wird stillschweigend verworfen (`FR-009-04`).
- **Rate-Limit erreicht** → freundlicher Hinweis, kein Absturz.
- **LinkedIn-URL fehlt** → Link entfällt (`FR-009-08`).

## Bestätigte Annahmen

- Zwei-Kanal-Zustellung (bisher bewährter Discord-Push + zusätzlich E-Mail mit
  Absender-Bestätigung); konkrete Dienste sind Architektur (`/architect`) (F1/F1b).
- Formular bislang offen ohne Spam — Honeypot + Rate-Limit als Hygiene trotzdem eingebaut (F3).
- Profil-/Kontaktlinks (aus D4) sind hier verortet, weil im Discovery als „Kontaktflächen"
  geführt; siehe „Open questions" im Rückgabebericht (Verortungs-Annahme).

## Acceptance Criteria

- Das Formular zeigt exakt die Felder Name, E-Mail, Nachricht.
- Eine erfolgreiche Einreichung erzeugt Push **und** E-Mail an den Owner sowie eine Bestätigung
  an die Absender-Adresse.
- Ein Relay-Versuch ohne E-Mail wird abgelehnt; ein befülltes Honeypot-Feld führt zu keiner
  Zustellung; im Fehlerfall bleibt die Eingabe erhalten und ist erneut absendbar.
- Die Owner-E-Mail erscheint nirgends im Klartext auf der Seite außer im Impressum.

## Traces

- Personas: P1 (Gespräch anbahnen), P2.
- Erfolgskriterien: SC-2.
- Cross-cutting: `FR-CC-01`, `FR-CC-02`, `NFR-CC-01`, `NFR-CC-05`.
- Abhängigkeit: FEAT-008 (Relay-Auslöser), FEAT-012 (E-Mail nur dort).
- Ausstehende Materialien: LinkedIn-URL.
