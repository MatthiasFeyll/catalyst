workspace "catalyst" "4. Generation der Personal Page matthias-feyll.de — Bewerbungswerkzeug und zugleich vollständig KI-geschriebenes Exponat (ADLC). Rein statische SPA + Serverless Functions, kein Backend, kein Auth (ADR-0001/0002)." {

    !identifiers hierarchical

    model {

        # --- Personen ---------------------------------------------------------
        hr = person "HR-Recruiter:in" "Primäre Persona (P1). Erstkontakt nach Bewerbung, nicht-technisch: erfasst in ~5 Sekunden Nutzwert und Werdegang, sucht einen niedrigschwelligen Kontaktweg."
        tech = person "Informatiker:in / Tech-Interviewer:in" "Sekundäre Persona (P2). Bohrt tiefer: Repository-Links, technische Referenz-Details, Kompetenz-Tiefe, DevTools-Terminal."

        # --- Externe Systeme --------------------------------------------------
        resend = softwareSystem "Resend" "Transaktions-E-Mail-Dienst. Zustellt die Kontakt-/Relay-Nachricht als E-Mail an den Owner und die Empfangs-Bestätigung an die Absender:in (FEAT-009)." "External"
        discord = softwareSystem "Discord" "Push-Kanal über einen eingehenden Webhook — bewährte, sofortige Handy-Push-Zustellung der Kontakt-/Relay-Nachricht (FEAT-009)." "External"
        llm = softwareSystem "LLM-API" "Externer LLM-Dienst günstiger Modellklasse für die SPÄTERE Chat-Freitext-Stufe (FEAT-008). Kostenbegrenzt (Budget-Cap ~20 EUR/Monat), strikte Themen-Allowlist, Streaming; bei Ausfall oder erreichtem Cap degradiert der Chat auf den geführten Modus." "External"
        github = softwareSystem "GitHub" "Doppelrolle: (1) öffentliches catalyst-Repository als Beleg der vollständig KI-geschriebenen Story (FEAT-007, FR-007-05) und (2) GitHub-Actions-CI/CD-Pipeline, die nach Vercel deployt (ADR-0003)." "External"
        vercel = softwareSystem "Vercel" "Hosting-Plattform des statischen Builds und der Serverless Functions; Deploy-Ziel der Pipeline. Liefert cookielose Reichweitenmessung (Vercel Analytics, NFR-CC-05). Neues Vercel-Projekt; Domain-Cutover matthias-feyll.de erst beim Go-Live (median bleibt bis dahin live) (ADR-0003)." "External"
        lookup = softwareSystem "lookup (Gen 1)" "Alt-Personal-Page, 1. Generation. Einbettungsquelle der Evolution-Story über einen Einbettungs-Kontrakt: konfigurierbare URL, iframe auf Desktop, Screenshot-Fallback bei Nichtverfügbarkeit (FEAT-007). Wiederbelebung out of scope." "External"
        lookdown = softwareSystem "lookdown (Gen 2)" "Alt-Personal-Page, 2. Generation. Einbettungsquelle der Evolution-Story wie lookup (konfigurierbare URL, iframe/Screenshot-Fallback). Wiederbelebung out of scope." "External"
        median = softwareSystem "median (Gen 3)" "Alt-Personal-Page, 3. Generation. Doppelrolle: Einbettungsquelle der Evolution-Story (konfigurierbare URL, iframe/Screenshot-Fallback, FEAT-007) UND die aktuell live ausgelieferte Produktion unter matthias-feyll.de bis zum Domain-Cutover (ADR-0003)." "External"

        # --- Das System catalyst ---------------------------------------------
        catalyst = softwareSystem "catalyst" "Die öffentlich und anonym erreichbare Personal Page (kein Login). Verkörpert als KI-geschriebenes Artefakt die Vision selbst." {

            spa = container "SPA" "Rein statische React+Vite+TS Single-Page-App (Tailwind CSS, shadcn/ui auf Radix, Lucide, React Router, TanStack Query; d3 lazy für Kompetenz-Band FEAT-004 und Evolution-Faden FEAT-007). Trägt alle 13 Features: Hero, Über mich, Timeline, Kompetenz-Band, Verantwortung, Referenzen (URL-synchrones Modal), Evolution-Story, geführter Chat (M1, deterministisch, clientseitig), Sprach-Toggle DE/EN mit localStorage, Impressum-/Datenschutz-Routen (FEAT-012), Delight/Terminal. Build-Zeit-Prerender beider Sprachfassungen unter / (DE, x-default) und /en (EN) + hreflang (FEAT-011, ADR-0005). Kein Auth (ADR-0002), kein Backend (ADR-0001)." "React+Vite+TS (statisch gebaut)" "Runtime"

            functions = container "Serverless Functions" "Vercel Serverless Functions — die einzigen Server-Anteile (ADR-0001). Meilenstein 1: EINE Kontakt-/Relay-Function, die Owner-Mail (Resend) + Push (Discord) + Absender-Bestätigung (Resend) aus demselben Aufruf zustellt, mit Honeypot + serverseitigem Rate-Limit statt Captcha (FEAT-009, ADR-0007). Spätere Ausbaustufe: LLM-Chat-Proxy (Budget-Cap, Themen-Allowlist, Streaming, Fallback auf geführten Modus; ADR-0006). Ein eng umrissener Ephemeral-KV-Store (z. B. Vercel KV/Upstash) hält ausschließlich Rate-Limit- und Monats-Budget-Zähler — keine Domänen-/Nutzerdaten-Persistenz (ADR-0001/0006). Secrets ausschließlich serverseitig, nie im SPA-Bundle." "Vercel Serverless Functions (Node/TS)" "Runtime"

            spa -> functions "Reicht Kontakt-/Relay-Formular ein; in der späteren Ausbaustufe zusätzlich Chat-Freitext" "HTTPS/JSON"
        }

        # --- Beziehungen: Personen -> System ---------------------------------
        hr -> catalyst.spa "Erfasst in ~5 s Nutzwert & Werdegang, bahnt ein Gespräch an" "HTTPS"
        tech -> catalyst.spa "Bohrt tiefer: Repo-Links, Referenz-Details, DevTools-Terminal" "HTTPS"

        # --- Beziehungen: SPA -> extern --------------------------------------
        catalyst.spa -> vercel "Wird statisch ausgeliefert und sendet cookielose Analytics-Beacons" "HTTPS"
        catalyst.spa -> github "Verlinkt das öffentliche Repository (Beleg der KI-geschriebenen Story)" "HTTPS"
        catalyst.spa -> lookup "Bettet ein (iframe, Desktop) / zeigt Screenshot-Fallback bei Nichtverfügbarkeit" "HTTPS/iframe"
        catalyst.spa -> lookdown "Bettet ein (iframe, Desktop) / zeigt Screenshot-Fallback bei Nichtverfügbarkeit" "HTTPS/iframe"
        catalyst.spa -> median "Bettet ein (iframe, Desktop) / zeigt Screenshot-Fallback bei Nichtverfügbarkeit" "HTTPS/iframe"

        # --- Beziehungen: Functions -> extern --------------------------------
        catalyst.functions -> resend "Versendet Owner-Benachrichtigung + Absender-Bestätigung" "HTTPS REST"
        catalyst.functions -> discord "Sendet Push-Benachrichtigung an den Owner" "HTTPS Webhook"
        catalyst.functions -> llm "Ruft LLM-Freitext-Antworten ab (spätere Ausbaustufe; gestreamt, kostenbegrenzt, allowlist-gefiltert)" "HTTPS/SSE" "Future"

        # --- Beziehungen: CI/CD ----------------------------------------------
        github -> vercel "Baut und deployt das statische Build + die Functions (GitHub-Actions-Workflow)" "GitHub Actions -> Vercel CLI"
    }

    views {
        systemContext catalyst "system-context" {
            include *
            autoLayout
        }
        container catalyst "containers" {
            include *
            autoLayout
        }

        styles {
            element "Person" {
                shape Person
            }
            element "Container" {
                background "#1168bd"
                color "#ffffff"
            }
            element "External" {
                background "#8a8a8a"
                color "#ffffff"
            }
            relationship "Future" {
                dashed true
                color "#888888"
            }
        }
    }
}
