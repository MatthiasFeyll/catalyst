#!/usr/bin/env bash
# Milestone-end PROD-PARITY gate — FRONTEND-ONLY / HERMETIC (project ADR-0004).
#
#   bash infra/prod-parity.sh
#
# catalyst ships a SINGLE terminal artefact: the static SPA as an `nginx:alpine` image
# (services/frontend/Dockerfile) — there is no Django API, no auth, no IdP
# (ADR-0001/0002, deviating from fw-ADR-0022). So "prod parity" is: build the EXACT
# shipped nginx image and run the full deterministic business-e2e suite against it, once,
# before the milestone is accepted. There is no gunicorn API image, no CORS/JWT contract,
# and no token to mint — the gate is fully OFFLINE/HERMETIC (serverless-function calls are
# mocked in-test).
#
# For a static SPA the dev-backed gate (infra/run-e2e-gate.sh) and this prod-parity gate
# CONVERGE on the same shipped image, so this script runs that same hermetic gate in its
# OWN isolated compose project and writes its OWN verdict
# (`infra/.prod-parity-result.json`, gate="prod-parity") so the two verdicts never clobber
# each other. A build/serve failure or any business-e2e failure here is a milestone `block`.
#
# ISOLATION (retro: a bare `docker compose down` once cascaded into the shared dev network
# and destroyed the dev stack). This gate uses its own throwaway project name + private
# network, torn down with `down -v` on exit (see run-e2e-gate.sh) — it can never touch the
# dev stack. NEVER run a bare, unscoped `docker compose down`.
#
# MACHINE-READABLE RESULT. The verdict is `infra/.prod-parity-result.json` (status +
# counts + scope + commit_sha); CALLERS READ THAT FILE, never this script's stdout through
# a pipe. The exit code mirrors it (0 = pass). Freshness is enforced on consume by
# infra/check-result-fresh.sh.
set -euo pipefail

cd "$(dirname "$0")/.."   # project root

DEV_PREFIX="${COMPOSE_PROJECT_NAME:-catalyst}"

# Delegate to the single hermetic frontend gate, but in an isolated prod-parity project
# with a prod-parity verdict file + gate name. Same shipped nginx image, same suite.
E2E_PROJECT="${DEV_PREFIX}-prodparity" \
E2E_GATE_NAME="prod-parity" \
E2E_RESULT_FILE="infra/.prod-parity-result.json" \
  exec bash infra/run-e2e-gate.sh "$@"
