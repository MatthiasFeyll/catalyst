#!/usr/bin/env bash
# Milestone-end business-e2e gate — FRONTEND-ONLY / HERMETIC (project ADR-0004).
#
#   bash infra/run-e2e-gate.sh                        # whole suite against the built SPA
#   E2E_TARGET=<m>/ bash infra/run-e2e-gate.sh        # scope to one milestone's journeys
#   E2E_WORKERS=8  bash infra/run-e2e-gate.sh         # raise Playwright worker count
#
# WHY THIS SCRIPT EXISTS. catalyst is a purely static, public SPA (no Django API, no
# auth, no IdP — ADR-0001/0002). The milestone-end gate runs the deterministic
# business-e2e suite (services/frontend/e2e/) against the STATICALLY BUILT, shipped
# SPA (the nginx image), fully OFFLINE/HERMETIC: no backend container, no token mint, no
# IdP, no outbound network at run time. Journeys that depend on a Vercel serverless
# function mock the endpoint in-test (Playwright route mock / MSW). The inner /implement
# loop uses neither this nor a browser — it runs tier-1 vitest + `tsc --noEmit` + the
# render smoke (ADR-0004).
#
# ISOLATED PROJECT — SAFE TEARDOWN. Unlike the old dev-backed overlay, this gate stands
# up its own throwaway compose project (frontend + e2e on a private network), so a
# `docker compose -p <isolated> down -v` here tears down ONLY the gate — never the dev
# stack. The teardown runs on exit via a trap.
#
# MACHINE-READABLE RESULT. The verdict is written to `infra/.e2e-gate-result.json`
# (status + counts + scope + commit_sha + created_at) and CALLERS READ THAT FILE, never
# this script's stdout through a pipe. The result is stamped with the current commit so a
# stale verdict from a prior run cannot be misread as the current one
# (infra/check-result-fresh.sh enforces the stamp on consume).
set -euo pipefail

cd "$(dirname "$0")/.."            # project root

E2E=infra/docker-compose.e2e.yml
# Isolated, throwaway project name so teardown never touches the dev stack.
PROJECT="${E2E_PROJECT:-${COMPOSE_PROJECT_NAME:-catalyst}-e2e}"
GATE_NAME="${E2E_GATE_NAME:-e2e-frontend}"

# Default result file is the milestone-end gate verdict. A caller may override it so a
# DIFFERENT scoped run (e.g. the walking-skeleton smoke) does not clobber it:
#   E2E_TARGET=_skeleton/ E2E_RESULT_FILE=infra/.e2e-skeleton-result.json bash infra/run-e2e-gate.sh
RESULT_FILE="${E2E_RESULT_FILE:-infra/.e2e-gate-result.json}"
E2E_LOG="${RESULT_FILE%.json}.log"
SCOPE="${E2E_TARGET:-full}"

if [ ! -d services/frontend ]; then
  echo "✗ services/frontend/ is missing — nothing to serve. catalyst is a frontend-only project." >&2
  exit 1
fi

dc() { docker compose -p "$PROJECT" -f "$E2E" "$@"; }

# Tear the isolated gate project down on exit (safe: private project + network).
teardown() { dc down -v --remove-orphans >/dev/null 2>&1 || true; }
trap teardown EXIT

echo "› Building + starting the static SPA (nginx) for the gate…"
dc up -d --build --wait frontend

echo "› Running the business-e2e suite (browser → http://frontend/, hermetic — no backend, no token)…"
echo "› Suite output → $E2E_LOG (follow live with: tail -f $E2E_LOG)"
# NEVER pipe the suite through this script's stdout (deadlock class): callers consume the
# result FILE, so nothing drains our stdout. Redirect to $E2E_LOG; a bounded tail is
# echoed on failure. `-T`: no pseudo-TTY. `set +e` so a failing suite still writes the
# result file below.
set +e
dc run --rm -T \
  ${E2E_TARGET:+-e E2E_TARGET="$E2E_TARGET"} \
  ${E2E_WORKERS:+-e E2E_WORKERS="$E2E_WORKERS"} \
  e2e > "$E2E_LOG" 2>&1
E2E_RC=$?
set -e

# Best-effort counts from pytest's summary line; the exit code is authoritative.
SUMMARY="$(grep -E '(passed|failed|error|no tests ran)' "$E2E_LOG" | tail -1 | sed 's/=//g; s/^ *//; s/ *$//' || true)"
count() { echo "$SUMMARY" | grep -oE "[0-9]+ $1" | grep -oE '^[0-9]+' | head -1 || true; }
PASSED="$(count passed)";   PASSED="${PASSED:-0}"
FAILED="$(count failed)";   FAILED="${FAILED:-0}"
ERRORS="$(count error)";    ERRORS="${ERRORS:-0}"
SKIPPED="$(count skipped)"; SKIPPED="${SKIPPED:-0}"

if [ "$E2E_RC" -eq 0 ]; then STATUS=pass; else STATUS=fail; fi

# Freshness stamp: tie the verdict to the commit it was produced at + a timestamp.
COMMIT_SHA="$(git rev-parse HEAD 2>/dev/null || echo unknown)"
if [ -n "$(git status --porcelain 2>/dev/null)" ]; then COMMIT_DIRTY=true; else COMMIT_DIRTY=false; fi
CREATED_AT="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

cat > "$RESULT_FILE" <<JSON
{
  "gate": "$GATE_NAME",
  "status": "$STATUS",
  "scope": "$SCOPE",
  "exit_code": $E2E_RC,
  "counts": { "passed": $PASSED, "failed": $FAILED, "errors": $ERRORS, "skipped": $SKIPPED },
  "base_url": "http://frontend",
  "hermetic": true,
  "commit_sha": "$COMMIT_SHA",
  "commit_dirty": $COMMIT_DIRTY,
  "created_at": "$CREATED_AT",
  "summary": "$SUMMARY",
  "result_file_version": 3
}
JSON
echo "› Wrote $RESULT_FILE (status=$STATUS scope=$SCOPE passed=$PASSED failed=$FAILED errors=$ERRORS commit=$COMMIT_SHA)."

if [ "$STATUS" != "pass" ]; then
  echo "— last 40 lines of the suite log ($E2E_LOG):"
  tail -n 40 "$E2E_LOG" 2>/dev/null || true
  echo "✗ business-e2e gate FAILED. Read $RESULT_FILE for the verdict; this is a milestone \`block\`."
  exit "$E2E_RC"
fi

echo "✓ business-e2e gate passed (hermetic, against the statically built SPA)."
