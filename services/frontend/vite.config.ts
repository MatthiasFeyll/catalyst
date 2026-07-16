// Vite config — FRAMEWORK-OWNED REFERENCE, adapted for catalyst (project ADR-0001).
// The frontend is a purely static SPA: a Vite DEV SERVER in dev (HMR), and a static
// `vite build` → nginx image in prod. There is no Django backend — the only server-side
// surface is Vercel serverless functions under `/api` (ADR-0001).
//
//   base    "/" — the SPA is served from the ROOT of its own origin (nginx in prod,
//           the Vite dev server in dev).
//
//   server  the dev server binds 0.0.0.0:5173 (reachable as http://frontend:5173 on
//           the compose network and http://localhost:5173 on the host). It OPTIONALLY
//           proxies "/api" to a local functions dev server (e.g. `vercel dev`) when
//           VITE_DEV_PROXY_TARGET is set; unset → no proxy (pure static dev). Prod
//           serves the functions under the same origin, so the SPA always uses "/api".
//
// The prod build emits a plain `dist/` (Vite's default outDir) that the Dockerfile's
// nginx stage serves with an SPA fallback (see Dockerfile + nginx.conf).

import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Optional local functions dev server (e.g. `vercel dev`). Unset → no /api proxy.
const proxyTarget = process.env.VITE_DEV_PROXY_TARGET;

export default defineConfig({
  base: "/",
  plugins: [react()],
  // `@/` → ./src — the shadcn import convention; must mirror tsconfig.json `paths`.
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: true, // bind 0.0.0.0 so the container is reachable cross-host
    port: 5173,
    strictPort: true,
    // Proxy "/api" to a local functions dev server only when one is configured.
    ...(proxyTarget
      ? { proxy: { "/api": { target: proxyTarget, changeOrigin: true } } }
      : {}),
  },
});
