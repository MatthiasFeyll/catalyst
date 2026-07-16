# Frontend prod image — FRAMEWORK-OWNED REFERENCE (ADR-0022, ADR-0009, ADR-0012).
#
# Two-stage: Node builds the SPA at BUILD time, nginx serves the static `dist/` at
# runtime (no Node at runtime). This image + the gunicorn backend image are the two
# lean prod artifacts (ADR-0022). The milestone-end prod-parity gate (infra/prod-
# parity.sh) builds this and runs the suite genuinely cross-origin against it.
#
# VITE_API_URL is the BROWSER-VISIBLE backend origin. Vite INLINES env at build time,
# so it MUST be a build-arg (not a runtime env) — a runtime change would not affect
# the already-bundled JS. The compose prod stack passes it as a build arg.

# ── Stage 1: build the SPA bundle (Node is build-time only) ────────────────────
FROM node:22-alpine AS build
WORKDIR /app
# Lockfile-only install first (cache layer): deps enter via `npm ci` against the
# committed package-lock.json (ADR-0009) — never a host-side install.
COPY package.json package-lock.json ./
RUN npm ci
# Then the source; `vite build` emits to dist/ (base="/").
COPY . .
# The backend origin the bundled JS will call (cross-origin in prod). Inlined now.
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

# ── Stage 2: nginx serves the static bundle with an SPA fallback ───────────────
FROM nginx:alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
# nginx's default CMD serves; healthcheck hits the SPA shell.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO /dev/null http://127.0.0.1/ || exit 1
