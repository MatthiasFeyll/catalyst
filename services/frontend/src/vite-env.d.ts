/// <reference types="vite/client" />

// FRAMEWORK-OWNED REFERENCE, adapted for catalyst (project ADR-0001/0002). Typed env
// for the api client (src/lib/api.ts). No auth env — the SPA is public/auth-less.
interface ImportMetaEnv {
  // The serverless-function API base, baked at BUILD time in prod (Vite inlines it).
  // Unset in dev → the api client falls back to "/api" (the Vite proxy).
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
