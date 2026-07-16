#!/usr/bin/env bash
# Bring up (or resume) the local stacks the ADLC needs. Idempotent — safe to
# re-run any time, including after a machine reboot to resume the containers.
#
#   bash infra/bootstrap.sh
#
# This co-launches the project dev stack (the static-SPA Vite dev server) with the
# consolidated ADLC-infra stack (MCP servers + AgentOps) in a single invocation, so
# their same-named `backend` networks merge and the Playwright MCP can reach the dev
# `frontend` service. catalyst is frontend-only (project ADR-0001): no Django API, no db.
#
# Telemetry egress (ADR-0004) stays opt-in and is NOT started here
# — see infra/adlc/.env.example and skills/agentops/SKILL.md.
set -euo pipefail

cd "$(dirname "$0")/.."            # project root

DEV=infra/docker-compose.dev.yml
ADLC=infra/adlc/docker-compose.adlc.yml

# Per-project host-port block (ADR-0035). /init-project writes explicit
# ADLC_*_HOST_PORT vars into infra/.env (compose auto-loads that file via
# --project-directory below); resolve them here for the preflight check and
# the endpoint map. The canonical defaults keep a pre-0.46.0 infra/.env
# behaving exactly as before.
port() { local v; v=$(sed -n "s/^$1=//p" infra/.env 2>/dev/null | tail -1); printf '%s' "${v:-$2}"; }
FE=$(port ADLC_FRONTEND_HOST_PORT 5173);   SUI=$(port ADLC_STRUCTURIZR_UI_HOST_PORT 8080)
SMCP=$(port ADLC_STRUCTURIZR_MCP_HOST_PORT 3000)
PMCP=$(port ADLC_POSTGRES_MCP_HOST_PORT 3001)
WMCP=$(port ADLC_PLAYWRIGHT_MCP_HOST_PORT 3002)
OG=$(port ADLC_OTLP_GRPC_HOST_PORT 4317);  OH=$(port ADLC_OTLP_HTTP_HOST_PORT 4318)

# Pre-create the host directories that the compose files bind-mount. If they
# don't exist when a container starts, the Docker daemon creates them as
# **root**, which then blocks the (non-root) user and the hooks from writing.
# Creating them here first guarantees user ownership. Idempotent.
mkdir -p services/frontend/e2e/test-artifacts .claude/logs

# Run the structurizr container as the host user so it can write its rendered
# workspace.json into the (host-owned) architecture/ dir, and so those files
# land host-owned rather than root-owned. Consumed by the `user:` field of the
# structurizr service in the ADLC stack.
export ADLC_UID="$(id -u)" ADLC_GID="$(id -g)"

# Pin the project directory to infra/ so every relative host path in both
# compose files resolves consistently (the adlc stack's paths are written
# relative to infra/). Without this, multi-file path resolution would depend
# on `-f` ordering. This also makes compose auto-load `infra/.env`, whose
# COMPOSE_PROJECT_NAME (written by /init-project) prefixes every container,
# network, and volume with the project slug — so stacks from different projects
# never collide on one machine. With no prefix set the project name falls back
# to the directory basename (`infra`), preserving legacy behaviour.
COMPOSE=(docker compose --project-directory infra -f "$DEV" -f "$ADLC")

# Fail fast when a port of this project's block is already held by a FOREIGN
# owner — another project's stack, or a host process (ADR-0035). Compose's own
# bind error names no owner, which was exactly the confusing failure two
# parallel projects used to hit. A listener owned by our OWN compose project is
# the idempotent resume case and fine.
PREFIX=$(port COMPOSE_PROJECT_NAME infra)
for p in "$FE" "$SMCP" "$SUI" "$PMCP" "$WMCP" "$OG" "$OH"; do
  if (exec 3<>"/dev/tcp/127.0.0.1/$p") 2>/dev/null; then
    owner=$(docker ps --filter "publish=$p" --format '{{.Label "com.docker.compose.project"}}' 2>/dev/null | head -1 || true)
    [ "$owner" = "$PREFIX" ] && continue
    held="${owner:+compose project '$owner'}"
    echo "✗ host port $p is already in use by ${held:-a non-compose process}." >&2
    echo "  This project's port block lives in infra/.env (ADLC_*_HOST_PORT; machine index:" >&2
    echo "  ~/.claude/cr_adlc_framework/port-registry.json). If two projects claim the same" >&2
    echo "  block (e.g. an unregistered clone), re-run /init-project in one of them to" >&2
    echo "  re-allocate, then re-run bash infra/bootstrap.sh." >&2
    exit 1
  fi
done

echo "› Bringing up dev + ADLC-infra stacks…"
"${COMPOSE[@]}" up -d

echo
"${COMPOSE[@]}" ps

# Unquoted heredoc: the endpoint map reflects THIS project's allocated block
# (canonical values unless /init-project assigned a shifted block, ADR-0035).
cat <<EOF

Stacks up. Endpoints (this project's port block — see infra/.env):
  Frontend (Vite)  http://localhost:$FE   (the static SPA dev server — open in a browser)
  Structurizr      http://localhost:$SUI   (C4 diagram viewer — open in a browser)
  Structurizr MCP  http://localhost:$SMCP/mcp   (HTTP transport)
  Playwright MCP   http://localhost:$WMCP/mcp   (HTTP transport)
  OTEL collector   localhost:$OG (gRPC) / $OH (HTTP)

Run the milestone-end business-e2e gate (hermetic, against the built SPA):
  bash infra/run-e2e-gate.sh

Re-run \`bash infra/bootstrap.sh\` after a reboot to resume.
EOF
