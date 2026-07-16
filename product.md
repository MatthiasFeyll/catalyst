# catalyst — Projekt-Spezifikation (Index)

> Schlanker Projekt-Index. Jedes Feature besitzt seine eigene Datei unter
> `product/features/`. Querschnitts-Anforderungen liegen in
> `product/features/_cross-cutting.md`. FR-/NFR-IDs sind global eindeutig und stabil.
>
> **Status:** Spezifikations-Phase (`/discover` → Authoring). Wird am `/review-spec`-Gate
> eingefroren. Danach keine Rück-Edits mehr in dieses Dokument — nur über Re-Entry.

---

## Vision

**catalyst** ist die 4. Generation der persönlichen Seite von Matthias Feyll unter
`matthias-feyll.de` — zugleich **Bewerbungswerkzeug** und **Exponat**: die erste vollständig
KI-geschriebene Generation (nach dem ADLC-Framework gebaut). Sie belegt die Entwicklung vom
Softwareentwickler über den Software Engineer zum AI-Native Software Developer, indem sie das,
was sie behauptet, selbst verkörpert.

**Vision-Arbeitsfassung (verbatim bestätigt, Copy-Feinschliff durch `/design`):**

> „State-of-the-art AI-Entwicklung für wertschöpfende Ketten. Gestützt von 12 Jahren
> Softwareentwicklungserfahrung."

**Leitprinzipien**

- **AI-native erlebbar** — die Seite zeigt KI nicht nur als Behauptung, sondern als erfahrbares
  Element (Signature: KI-Matthias-Chat; die Seite selbst als KI-geschriebenes Artefakt mit
  öffentlichem Repo).
- **Informativ & professionell, lädt zum Gespräch ein** — in ~5 Sekunden Klarheit für HR;
  Tiefe für technische Leser:innen dahinter.
- **Individuelles UI/UX mit Erinnerungswert** — eigenständig und einprägsam, dabei „less is
  more".
- **Persönliche Marke** (keine Commerz-Real-Ästhetik), **Du-Ansprache**, Ich-Perspektive,
  „Mensch hinter dem Code".

## Personas

| ID | Persona | Priorität | Kern-Bedürfnis |
|----|---------|-----------|----------------|
| **P1** | HR-Recruiter:in | primär | Erstkontakt nach Bewerbung, nicht-technisch: in ~5 Sekunden verstehen, welchen Mehrwert Matthias bringt und warum ein Gespräch lohnt. Erwartet ein weißes, professionelles, modernes Design. |
| **P2** | Informatiker:in / Tech-Interviewer:in | sekundär | Bohrt tiefer: Repository-Links, technische Referenz-Details, Kompetenz-Tiefe, das DevTools-Terminal. Darf mehr entdecken, ohne die HR-Reise zu stören. |

## Erfolgskriterien (Priorität absteigend)

| ID | Kriterium | Beobachtbarer Beleg |
|----|-----------|---------------------|
| **SC-1** | AI-native erlebbar | Besucher:in kann ein KI-Element aktiv erleben (Chat); die Seite ist als vollständig KI-geschrieben ausgewiesen und über ein öffentliches Repository nachprüfbar. |
| **SC-2** | Informativ & professionell, lädt zum Gespräch ein | HR (P1) erfasst Kernbotschaft und Werdegang ohne technisches Vorwissen; ein niedrigschwelliger Kontaktweg ist jederzeit erreichbar. |
| **SC-3** | Individuelles UI/UX mit Erinnerungswert | Eigenständige, einprägsame Gestaltung; Delight-Momente; „less is more" ohne Überladung. |

## Scope

**In Scope**

- 13 Features (siehe Feature-Index unten).
- Zweisprachigkeit DE (Default) / EN über alle Inhalte.
- Öffentliche, vollständig anonym erreichbare Seite (kein Login).
- Kontakt & Relay mit Zwei-Kanal-Zustellung an den Owner.
- KI-Matthias-Chat (Meilenstein 1: geführt; spätere Ausbaustufe: LLM-Freitext).
- SEO/AEO-Paket inkl. `llms.txt`.

**Out of Scope**

- Wiederbelebung der Alt-Apps `lookup` / `lookdown` — eigene, separate Arbeit. catalyst
  spezifiziert nur den **Einbettungs-Kontrakt** (konfigurierbare URL + Screenshot-Fallback).
- Intro-/Werbevideo.
- Dark Mode (frühestens spätere Ausbaustufe; Meilenstein 1 nur Light).
- Xing-Profil; reCAPTCHA; echte handschriftliche Unterschrift online.
- Verlinkung Kompetenzen ↔ Referenzen (bewusst, um Dead Links zu vermeiden).
- Nennung des Firmennamens „(Firmenname bewusst nicht genannt)" bzw. jeglicher Instagram-Verweis.
- Jegliches Azure-/Entra-Deployment (Projekt-ADR weicht vom Framework-Default ab).
- Klartext-E-Mail außerhalb des Impressums.

> Deployment/Technik-Details (Vercel, Serverless Functions, Pipeline, Stack) sind bewusst
> **nicht** Teil dieser Spezifikation — sie gehören in die Architektur-Phase (`/architect`).

## Projekt-NFRs (qualitativ; normative Schwellen in `_cross-cutting.md`)

- **Barrierefreiheit** — WCAG 2.2 AA verbindlich; vollständig tastaturbedienbar; volle
  reduced-motion-Parität. *(normativ: `NFR-CC-01`)*
- **Performance** — schnelle, budgetierte Auslieferung auf Mobilgeräten. *(normativ:
  `NFR-CC-02`)*
- **Kompatibilität** — aktuelle Evergreen-Browser Desktop + Mobil; kein IE. *(normativ:
  `NFR-CC-03`)*
- **Responsivität** — 360 px bis WQHD; Content-Maxbreite ~1500 px. *(normativ: `NFR-CC-04`)*
- **Datenschutz** — cookieless Analytics, kein einwilligungspflichtiges Tracking. *(normativ:
  `NFR-CC-05`)*
- **Zweisprachigkeit** — alle Inhalte DE/EN, Eigennamen ausgenommen. *(normativ: `FR-CC-01`)*
- **Erinnerungswert / „less is more"** — eigenständig, einprägsam, unaufdringlich. *(normativ:
  `NFR-CC-06`)*

## Feature-Index

| ID | Feature | Einzeiler | Datei |
|----|---------|-----------|-------|
| FEAT-001 | Hero & Elevator-Pitch | Above-the-fold Nutzwert-Pitch mit sich zeichnendem Namenszug | [features/FEAT-001-hero-elevator-pitch.md](product/features/FEAT-001-hero-elevator-pitch.md) |
| FEAT-002 | Über mich | Persönliche Facetten (Band-Europatour, Smart Home/NAS, Videografie, Reisen) | [features/FEAT-002-ueber-mich.md](product/features/FEAT-002-ueber-mich.md) |
| FEAT-003 | Karriere-Timeline | Berufs- und Bildungsweg verwoben, ein Zeile je Station | [features/FEAT-003-karriere-timeline.md](product/features/FEAT-003-karriere-timeline.md) |
| FEAT-004 | Kompetenz-Band | Gewelltes Band über die Disziplinen; KI fließt durch; Generalisten-Narrativ | [features/FEAT-004-kompetenz-band.md](product/features/FEAT-004-kompetenz-band.md) |
| FEAT-005 | Verantwortung | 4–6 belegte Karten zu Verantwortung & Wissensweitergabe | [features/FEAT-005-verantwortung.md](product/features/FEAT-005-verantwortung.md) |
| FEAT-006 | Referenzen | Projekt-Galerie + Detail-Modal mit teilbarer URL | [features/FEAT-006-referenzen.md](product/features/FEAT-006-referenzen.md) |
| FEAT-007 | Evolution-Story | 4 Generationen als Lern-Narrativ; Museums-Einbettung / Screenshot-Fallback | [features/FEAT-007-evolution-story.md](product/features/FEAT-007-evolution-story.md) |
| FEAT-008 | KI-Matthias-Chat | Signature-Element: geführt (M1), LLM-Freitext später | [features/FEAT-008-ki-matthias-chat.md](product/features/FEAT-008-ki-matthias-chat.md) |
| FEAT-009 | Kontakt & Relay | Lean-Formular + Chat-Relay, Zwei-Kanal-Zustellung + Bestätigung | [features/FEAT-009-kontakt-relay.md](product/features/FEAT-009-kontakt-relay.md) |
| FEAT-010 | Zweisprachigkeit DE/EN | Browser-Erkennung + Toggle, persistent, Default DE | [features/FEAT-010-zweisprachigkeit.md](product/features/FEAT-010-zweisprachigkeit.md) |
| FEAT-011 | SEO/AEO-Paket | Prerender beider Sprachen, hreflang, sitemap, robots, OG, llms.txt | [features/FEAT-011-seo-aeo-paket.md](product/features/FEAT-011-seo-aeo-paket.md) |
| FEAT-012 | Impressum & Datenschutz | Rechtstexte aus median übernommen + erweitert; E-Mail nur hier | [features/FEAT-012-impressum-datenschutz.md](product/features/FEAT-012-impressum-datenschutz.md) |
| FEAT-013 | Delight & Easter-Eggs | DevTools-Terminal, Konsolen-Gruß, Mikro-Hover — unsichtbar für HR | [features/FEAT-013-delight-easter-eggs.md](product/features/FEAT-013-delight-easter-eggs.md) |

> Ziel-Meilenstein-Zuordnung wird in `/plan` gesetzt. Einzige bereits fixierte
> Staging-Entscheidung: **FEAT-008** wird in Meilenstein 1 im **geführten** Modus voll designt
> und umgesetzt; die LLM-Freitext-Stufe ist eine **spätere Ausbaustufe**.

## Bestätigte Annahmen (projektweit, im Discovery ratifiziert)

- Widerspruch Bandtour aufgelöst: **35 Tage / 13 Länder / 30 Shows**, Rolle **Roadie und
  Band-Mitglied** (nicht „3 Monate", nicht nur Roadie).
- E-Mail-Adresse erscheint **ausschließlich** im Impressum (nirgends sonst im Klartext).
- Firmenname **„(Firmenname bewusst nicht genannt)"** und jeglicher **Instagram-Verweis** werden **nirgends** genannt.
- Meilenstein-1-Chat **ohne** Freitext-Eingabefeld (geführt); LLM-Stufe später mit
  20 €/Monat-Budget-Cap.
- Impressum-/Datenschutz-Inhalte werden aus median übernommen; der **Owner prüft vor Go-Live**.
- Kein Off-Limits-Thema explizit benannt („alles darf auf die Seite") — Annahme: **kein
  Wohnort/keine Adresse, keine Familienthemen**.

## Ausstehende Materialien (nicht blockierend, mit definiertem Fallback)

| Material | Betroffenes Feature | Fallback bis zur Lieferung |
|----------|---------------------|----------------------------|
| h_da-Logo | FEAT-003 | Text-Fallback (Institutionsname) |
| Helles Porträtfoto | FEAT-002 | dunkles median-Foto als Platzhalter |
| Hobby-/Alltagsfotos | FEAT-002 | Abschnitt bleibt ohne Bilder kohärent |
| LinkedIn-URL | FEAT-009 | Link entfällt, bis geliefert (kein Dead Link) |
| median-Rechtstexte (Impressum/Datenschutz-Quelle) | FEAT-012 | Draft-Status, Owner-Review vor Go-Live |
