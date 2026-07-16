# Threat-Model — catalyst (STRIDE light)

> **Scope & Kalibrierung.** catalyst ist eine **öffentliche, anonym erreichbare** Personal Page
> ohne Auth (ADR-0002) und ohne Backend/Datenbank (ADR-0001). Es gibt **keine geschützten
> Ressourcen**, **keine Nutzerkonten** und **keine persistenten Nutzerdaten**. Die einzigen
> PII-berührenden Flächen sind das Kontakt-/Relay-Formular (Name, E-Mail, Nachricht) und — später
> — die LLM-Chat-Eingaben; beide werden nur **transient** verarbeitet. Deshalb STRIDE **light**:
> Fokus auf **Tampering, Information Disclosure, Denial of Service / Kosten-Missbrauch** an den
> wenigen aktiven Rändern; Spoofing/Elevation-of-Privilege sind mangels Identität/Rollen weitgehend
> gegenstandslos.

Vertrauensgrenzen (aus `architecture/workspace.dsl`):

1. **Client ↔ Serverless Functions** — die einzige Stelle, an der öffentliche Eingaben
   serverseitige Aktionen und Geheimnisse berühren.
2. **Functions ↔ Dritt-Dienste** (Resend, Discord, später LLM-API) — ausgehende Aufrufe mit
   serverseitigen Geheimnissen.
3. **SPA ↔ eingebettete Alt-Seiten** (lookup/lookdown/median via iframe) — Fremd-Origin im
   Browser-Kontext.
4. **Build/Supply-Chain** (GitHub Actions → Vercel, npm-Lockfile) — Herkunft des ausgelieferten
   Codes.

---

## 1. Serverless-Functions-Missbrauch (Kontakt/Relay)

**Betroffen:** FEAT-009, ADR-0007. Function-Kante `spa → functions`, `functions → resend/discord`.

| STRIDE | Bedrohung | Gegenmaßnahme |
|--------|-----------|---------------|
| Tampering / Spoofing | **Header-/Content-Injection** in die konstruierte E-Mail (z. B. CR/LF in Name/Betreff → zusätzliche Header, gefälschte Absender) oder Webhook-Payload | Strikte Eingabevalidierung + Escaping/Normalisierung **vor** E-Mail-/Webhook-Konstruktion; keine ungeprüfte Übernahme von Nutzereingaben in Header-Felder; Bibliotheks-API statt String-Konkatenation. |
| Denial of Service | **Spam-Flut / Rate-Abuse** gegen die Function (Kosten, Zustell-Rauschen) | **Honeypot-Feld** (befüllt → stilles Verwerfen) + **serverseitiges Rate-Limit** je IP; kein Captcha (bewusst, FR-009-04). |
| Information Disclosure | **Owner-E-Mail-Leak** über Client-Artefakte oder Fehlermeldungen | Owner-E-Mail ist **kein** Client-Artefakt; nur Function-seitiges Ziel; im Klartext ausschließlich im Impressum (FR-009-07). Fehlermeldungen an den Client sind generisch (kein Adress-/Interna-Leak). |
| Repudiation | Nachricht scheinbar zugestellt, aber verloren | Zwei-Kanal-Zustellung (Mail **und** Push) + Absender-Bestätigung als impliziter Zustell-Beleg; bei Gesamt-Fehlschlag sichtbarer Fehlerzustand + Inline-Retry (FR-009-06). |
| Spoofing / Information Disclosure | **Backscatter / Phishing über die Absender-Bestätigung** (FR-009-03): Ein Angreifer trägt eine **fremde, unverifizierte** E-Mail-Adresse ein → die ausgehende Bestätigungsmail wird zur Spam-/Phishing-Fläche, ggf. mit gespiegeltem Absender-Freitext als Vehikel | Bestätigungs-Inhalt **statisch/minimal**, **kein Spiegeln** von Absender-Freitext (Name/Nachricht) in der Bestätigungsmail; keine aktiven/anhängenden Inhalte; das **serverseitige Rate-Limit gilt auch für die Bestätigungs-Kante** (nicht nur für die Owner-Zustellung). |

## 2. Chat-Stufe (spätere LLM-Ausbaustufe)

**Betroffen:** FEAT-008, ADR-0006. Kante `functions → llm` (im Modell „Future"). Der geführte M1-
Modus ist rein clientseitig und deterministisch → **keine** dieser Bedrohungen in M1.

| STRIDE | Bedrohung | Gegenmaßnahme |
|--------|-----------|---------------|
| Tampering | **Prompt-Injection** gegen die Persona/Allowlist (Nutzer versucht, den Chat themenfremd/„jailbreak" zu missbrauchen, um die KI für fremde Zwecke zu kapern) | **Strikte serverseitige Themen-Allowlist** (FR-008-06): themenfremde Anfragen werden abgelehnt und zurückgeführt; System-Prompt serverseitig, nicht client-manipulierbar; Ausgabe bleibt auf Persona-Themen (Werdegang/Kompetenzen/Projekte) begrenzt. |
| Denial of Service / Kosten | **Budget-Drain** (absichtliche Massenanfragen treiben LLM-Kosten über die Schmerzgrenze) | **Hartes Monats-Budget ~20 EUR** mit serverseitigem Zähler → Cap erreicht ⇒ Degradation auf geführten Modus (FR-008-07); **entspanntes Rate-Limit** je Nutzer:in (FR-008-09); API-Key serverseitig, nicht abgreifbar. |
| Information Disclosure | **Datenschutz der Nutzereingaben** Richtung Dritt-LLM (Eingaben verlassen die Seite zu einem externen Dienst) | Datensparsamkeit; **keine Persistenz** der Eingaben (ADR-0001); LLM-Verarbeitung wird als Drittverarbeiter im Datenschutz **offengelegt** (FEAT-012, FR-012-02); keine Übermittlung darüber hinausgehender personenbezogener Daten. |
| Availability | **LLM-Ausfall/Timeout** | **Fallback-Kaskade** auf den geführten Modus (FR-008-08) — die Seite bleibt funktionsfähig. |

## 3. iframe-Einbettung der Alt-Seiten

**Betroffen:** FEAT-007, ADR-0005. Kanten `spa → lookup/lookdown/median` (iframe/Screenshot).

| STRIDE | Bedrohung | Gegenmaßnahme |
|--------|-----------|---------------|
| Tampering / Elevation | Fremd-Origin im iframe versucht Zugriff auf den catalyst-Kontext (Top-Navigation kapern, Skripte, Popups) | **`sandbox`-Attribut** am iframe (nur minimal nötige Rechte, kein `allow-top-navigation`, kontrolliertes `allow-scripts`); **Origin-Isolation** durch die iframe-Grenze; `referrerpolicy` restriktiv. |
| Availability / Integrity | Eingebettete App **down/nicht erreichbar** **oder Framing verweigert** (`X-Frame-Options`/`frame-ancestors` der Alt-App blockt die Einbettung) → leerer/defekter Rahmen | **Screenshot-Fallback** statt leerem Rahmen (FR-007-03), ausgelöst über eine **onload-Timeout-Heuristik**; Einbettungs-URL **konfigurierbar** je Generation (FR-007-04), keine festverdrahtete Hosting-Annahme. **Betriebsvoraussetzung:** die eigenen Alt-Apps (lookup/lookdown/median) müssen catalyst per `frame-ancestors` zum Framen freigeben — sonst greift generationsweise der Screenshot-Pfad. |
| Information Disclosure | catalyst-Kontext leakt in die Fremd-Seite | Kein Weitergeben von catalyst-Daten in den iframe; reiner Anzeige-/Vorschau-Kontrakt. |

## 4. Secrets-Handling

**Betroffen:** ADR-0003, ADR-0006, ADR-0007.

| STRIDE | Bedrohung | Gegenmaßnahme |
|--------|-----------|---------------|
| Information Disclosure | **Geheimnisse im öffentlichen SPA-Bundle** (das Bundle ist öffentlich einsehbar; das Repo ist public) — Leak von `RESEND_API_KEY`, `DISCORD_WEBHOOK_URL`, LLM-Key, `VERCEL_TOKEN` | **Ausschließlich serverseitig** als Vercel-/GitHub-Secrets (ADR-0003); **nie** in Client-Code/Env-Prefix, der ins Bundle gelangt (kein `VITE_`-Prefix für Geheimnisse); Geheimnisse existieren nur zur Function-Laufzeit. |
| Information Disclosure | **Geheimnis-/PII-Leak über Git-Historie** beim Go-Public | Repo bleibt privat bis zur Historien-Bereinigung der Alt-Materialien (ADR-0003, Harness-Brief); kein Secret im Repo. |

## 5. Supply-Chain

**Betroffen:** projektweit, fw-ADR-0009.

| STRIDE | Bedrohung | Gegenmaßnahme |
|--------|-----------|---------------|
| Tampering | **Kompromittierte/abweichende Dependency** gelangt in den Build | Dritt-Dependencies **gepinnt im Manifest** (`package.json`) deklariert und über den **Lockfile** reproduzierbar aufgelöst (`npm ci`, fw-ADR-0009); Build in der kontrollierten GitHub-Actions-Pipeline (ADR-0003). |
| Tampering | **Unkontrollierter Deploy** (fremder Push deployt Fremd-Code) | Deploy nur aus der Pipeline mit out-of-band Secrets; kein manuelles Prod-Deploy. |

## 6. Content-Security-Policy (Header-Härtung)

**Betroffen:** §3/§4 querschnittlich; ausgeliefert über Vercel-Response-Header.

Als Defense-in-Depth setzt catalyst eine **Content-Security-Policy** via Vercel-Header:

- **`frame-src`** = die (konfigurierbaren) Origins der drei Alt-Seiten (lookup/lookdown/median) —
  nur diese dürfen eingebettet werden (§3).
- **`connect-src`** = der Function-Endpoint + Vercel Analytics (+ später der LLM-Proxy-Endpoint).
- **`script-src`** ohne `unsafe-inline` (keine Inline-Skripte; Nonces/Hashes wo nötig).
- **`frame-ancestors`** für catalyst selbst **restriktiv** (catalyst wird nicht fremd-eingebettet).
- Ergänzend restriktive `referrer-policy` und `X-Content-Type-Options: nosniff`.

---

## Abgeleitete, testbare Security-Anforderungen (→ spätere Security-ACs)

| ID | Anforderung (beobachtbar/testbar) | Quelle |
|----|-----------------------------------|--------|
| **SEC-01** | Ein befülltes Honeypot-Feld führt zu **keiner** Zustellung (weder Mail noch Push), ohne Fehlermeldung an den Bot. | §1, FR-009-04 |
| **SEC-02** | Nach Überschreiten des serverseitigen Rate-Limits liefert die Function eine freundliche Ablehnung (kein Absturz), und es erfolgt **keine** weitere Zustellung. | §1, FR-009-04 |
| **SEC-03** | Eingaben mit Zeilenumbrüchen/Header-Steuerzeichen in Name/E-Mail erzeugen **keine** zusätzlichen E-Mail-Header und keinen manipulierten Empfänger (Injection-Test). | §1 |
| **SEC-04** | Die Owner-E-Mail-Adresse ist **an keiner** Stelle des ausgelieferten SPA-Bundles / des Kontakt-Flows im Klartext auffindbar; sie erscheint ausschließlich auf der Impressum-Seite. | §1/§4, FR-009-07/FR-012-03 |
| **SEC-05** | Ein Grep über das gebaute SPA-Bundle findet **keinen** API-Key/Webhook-URL/Token (`RESEND_API_KEY`, `DISCORD_WEBHOOK_URL`, LLM-Key, `VERCEL_TOKEN`). | §4 |
| **SEC-06** | Bei simuliertem Erreichen des LLM-Budget-Caps degradiert der Chat sichtbar auf den geführten Modus, **ohne** weiteren LLM-Aufruf. | §2, FR-008-07 |
| **SEC-07** | Bei simuliertem LLM-Ausfall/Timeout degradiert der Chat auf den geführten Modus (kein Fehlerzustand). | §2, FR-008-08 |
| **SEC-08** | Eine themenfremde Freitext-Anfrage im LLM-Modus wird abgelehnt und auf zulässige Themen zurückgeführt (Allowlist greift). | §2, FR-008-06 |
| **SEC-09** | Jedes eingebettete Alt-Seiten-iframe trägt ein restriktives `sandbox`-Attribut (kein `allow-top-navigation`) und `referrerpolicy`; ist eine App **nicht erreichbar oder verweigert das Framing** (erkannt per onload-Timeout-Heuristik), erscheint der **Screenshot-Fallback** statt eines leeren/defekten Rahmens. Betriebsvoraussetzung: die eigenen Alt-Apps geben catalyst per `frame-ancestors` frei. | §3, FR-007-03/04 |
| **SEC-10** | Der Build schlägt fehl bzw. wird nicht deployt, wenn der Lockfile nicht zum Manifest passt (reproduzierbare, gepinnte Auflösung; `npm ci`). | §5, fw-ADR-0009 |
| **SEC-11** | Der Datenschutz nennt die Drittverarbeiter für Kontakt/Relay (Resend, Discord), das **Hosting/Analytics (Vercel)** und — sobald aktiv — den LLM-Dienst; personenbezogene Eingaben werden nicht persistiert. | §2/§4/§6, FR-012-02, NFR-CC-05 |
| **SEC-12** | Der ausgelieferte Response trägt eine **Content-Security-Policy** mit `frame-src` = Alt-Seiten-Origins, `connect-src` = Function-Endpoint + Vercel Analytics (+ später LLM-Proxy), `script-src` **ohne** `unsafe-inline` und restriktivem `frame-ancestors`. | §6 |
| **SEC-13** | Die **Absender-Bestätigungsmail** hat statischen/minimalen Inhalt und **spiegelt keinen** Absender-Freitext (Name/Nachricht); das serverseitige Rate-Limit greift **auch** für die Bestätigungs-Kante. | §1, FR-009-03 |

> Diese SEC-Anforderungen sind der Sicherheits-Beitrag der Architektur-Phase; `/plan` überführt
> sie in konkrete Acceptance-Tests. **Proof-Pfade (ADR-0004):** SEC-01/02/03/13 und die
> FEAT-009-Zustell-Logik werden von der **Function-Test-Tier** belegt — `vitest` gegen die
> Function-Handler mit **gemockten** Resend/Discord/KV-Store. Function-abhängige E2E-Journeys laufen
> im Offline-Gate über einen **Endpoint-Mock** (MSW / Playwright-Route-Mock) gegen die statisch
> gebaute SPA; die **echte Zustellkette (Resend/Discord live) ist KEIN Gate-Bestandteil**, sondern
> manuelle Wave-End-Validierung. SEC-04/05/09/12 sind Build-/Rendered-Assertions (Bundle-Grep,
> DOM-/Header-Prüfung), SEC-10 ein CI-Check. LLM-bezogene SEC-06..08 werden erst mit der
> LLM-Ausbaustufe verbindlich (deterministischer Stub im Gate).
