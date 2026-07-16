# ADR-0007 — Zustellwege Kontakt/Relay: eine Function → Resend + Discord

- **Status:** accepted
- **Datum:** 2026-07-14
- **Kontext-Phase:** /discover → Architektur

## Kontext

Kontakt & Relay (FEAT-009) ist der niedrigschwellige Weg ins Gespräch (SC-2). Der Owner nutzte
bisher einen Discord-Webhook (bewährte Handy-Push-Zustellung), wünscht zusätzlich E-Mail mit
Absender-Bestätigung (E-Mails landen sonst im Spam), ein bewusst **lean** gehaltenes Formular
(genau Name, E-Mail, Nachricht) und **kein Captcha** (das offene Formular hatte nie Spam). Die
Owner-E-Mail-Adresse darf **nirgends im Klartext** erscheinen außer im Impressum (FR-009-07,
FEAT-012).

## Entscheidung

- **Eine einzige Serverless Function** nimmt die Einreichung (Formular **und** Chat-Relay,
  FR-009-05) entgegen und stellt sie **aus demselben Aufruf über zwei Kanäle** zu:
  1. **Resend** — E-Mail an den Owner **und** eine **Empfangs-Bestätigung im Du-Ton** an die
     Absender:in (FR-009-02/03).
  2. **Discord** — **Push-Benachrichtigung** über den eingehenden Webhook (FR-009-02).
- **Chat-Relay** nutzt **denselben** Zustellweg und **erfordert die E-Mail-Adresse** der
  Nutzer:in; ohne E-Mail wird das Relay geblockt (FR-009-05).
- **Spam-Schutz ohne Captcha:** **Honeypot-Feld** (befüllt → stillschweigend verwerfen) +
  **serverseitiges Rate-Limit** in der Function (FR-009-04). **Kein reCAPTCHA.**
- **Fehlerbehandlung:** Submit-Zustände Ruhe/Senden/Erfolg/Fehler; im Fehlerfall **Inline-Retry
  ohne Datenverlust** (FR-009-06). Der Kanal-Erfolg wird so behandelt, dass eine erfolgreiche
  Einreichung Owner-Push **und** Owner-Mail **und** Absender-Bestätigung erzeugt (AC FEAT-009).
- **Geheimnisse serverseitig:** `RESEND_API_KEY` und `DISCORD_WEBHOOK_URL` liegen nur als
  Vercel-/GitHub-Secrets (ADR-0003) in der Function, nie im SPA-Bundle. Die Owner-E-Mail-Adresse
  ist **kein** Client-Artefakt — sie ist Function-seitiges Ziel und erscheint im Klartext
  ausschließlich im Impressum.

## Konsequenzen

- **Positiv:** eine zuverlässige, redundante Zwei-Kanal-Zustellung (Push + Mail) mit
  Absender-Bestätigung; das Formular bleibt lean; keine Captcha-Reibung.
- **Sicherheit:** Function-Missbrauch (Spam, Header-Injection, Rate-Abuse) ist im Threat-Model
  adressiert — Eingabevalidierung/-escaping vor E-Mail-Konstruktion, Rate-Limit, Honeypot.
- **Datenschutz:** personenbezogene Eingaben werden nur transient zur Zustellung verarbeitet
  (keine Persistenz, ADR-0001); Resend/Discord (und später der LLM-Dienst) werden als
  Drittverarbeiter im Datenschutz offengelegt (FEAT-012, NFR-CC-05).
- **Negativ / Grenze:** Abhängigkeit von zwei Dritt-Diensten; fällt einer aus, bleibt der andere
  Kanal — der Nutzer-Fehlerzustand greift nur, wenn die Einreichung insgesamt scheitert.
