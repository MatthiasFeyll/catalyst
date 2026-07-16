# ADR-0002 — Kein Auth: vollständig öffentliche Seite

- **Status:** accepted
- **Datum:** 2026-07-14
- **Kontext-Phase:** /discover → Architektur
- **Abweichung:** fw-ADR-0025 (Azure Entra OIDC Bearer-Auth)

## Kontext

catalyst ist ein Bewerbungs-/Business-Werkzeug, das sich an eine anonyme Öffentlichkeit richtet
(HR-Recruiter:innen, Tech-Interviewer:innen, LLM-Agenten). Es gibt keine geschützten Inhalte,
keine personalisierten Bereiche und keine Owner-Administrationsfläche im Produkt. Der gesamte
Wert entsteht daraus, dass die Seite **ohne jede Hürde** sofort konsumierbar ist (SC-2:
5-Sekunden-Klarheit für HR).

Das Framework-Scaffold delegiert Identität per fw-ADR-0025 an Azure Entra (die SPA erwirbt
OIDC-Bearer-Tokens via MSAL, die API validiert sie). Für catalyst gibt es weder eine geschützte
Ressource noch einen Corporate-SSO-Bezug — die Seite ist bewusst persönliche Marke, kein
Commerz-Real-Kontext.

## Entscheidung

catalyst hat **keinerlei Authentifizierung und keine Autorisierung**. Es gibt **keine
Login-Fläche**, keinen Identity-Provider, keine Tokens, keine MSAL-Integration, kein CORS-Allowlist-
Auth-Modell. Die Seite ist **vollständig öffentlich und anonym** erreichbar.

Das externe System „Azure Entra ID" wird aus dem Architekturmodell entfernt; sämtliche
MSAL-/OIDC-/Bearer-/Tenant-Bezüge werden über den Harness-Decoupling-Brief zurückgebaut.

## Konsequenzen

- **Positiv:** keine Auth-Angriffsfläche, kein Token-Handling, kein SSO-DX-Aufwand; die Seite ist
  ohne Sign-in nutzbar und indexierbar (FEAT-011 SEO/AEO).
- **Positiv:** der Dev-Inner-Loop ist wieder vollständig offline (im Gegensatz zum
  fw-ADR-0025-Default, der einen Live-Entra-Login verlangt).
- **Sicherheits-Konsequenz:** Die Serverless Functions haben **kein Nutzer-Auth** als
  Missbrauchsschutz. Missbrauch (Spam, Budget-Drain der LLM-Stufe) wird stattdessen über
  Honeypot + serverseitiges Rate-Limit (ADR-0007) und Budget-Cap + Allowlist (ADR-0006) begrenzt;
  siehe Threat-Model.
- **Framework-Abweichung dokumentiert:** fw-ADR-0025 gilt für catalyst nicht. Die
  Render-Smoke-Anforderung „Route rendert ohne Live-Token" ist trivial erfüllt, da es keine
  authpflichtige Route gibt.
- Owner-seitige Geheimnisse (API-Keys, Webhook-URL) liegen ausschließlich serverseitig als
  Vercel-/GitHub-Secrets (ADR-0003), nie im öffentlich einsehbaren SPA-Bundle.
