#!/usr/bin/env bash
# Unsupervised milestone runner — THIN SHIM (ADR-0036).
#
#   bash infra/run-milestones.sh [--milestones N] [--dry-run] [--from-milestone <id>]
#                                [--implement-only] [--max-parallel N] [--log <path>]
#                                [--min-plugin-version <x.y.z>] [...any adlc-driver batch flag]
#
# The driver logic that used to live in this file (ADR-0019/ADR-0031) moved into
# the FRAMEWORK-OWNED, tested Python package `cr-adlc-driver`, shipped inside the
# plugin at <plugin-root>/driver/ and versioned with it. This shim only:
#   1. resolves the installed plugin root (same per-project priority as before, I-6),
#   2. exec's `python3 -m adlc_driver batch "$@"` from that copy.
# All historical flags and env knobs (CLAUDE_BIN, CLAUDE_PERM_FLAG, CLAUDE_CMD_PREFIX,
# CLAUDE_EXTRA_ARGS, MAX_IMPLEMENT_RESUMES, LIMIT_*, SKIP_E2E_CRED_PREFLIGHT) keep
# working verbatim — `batch` is a strict superset (`adlc-driver batch --help`).
# CLAUDE_ORCHESTRATOR_MODEL (default `sonnet`) pins the model of every spawned
# orchestrator turn so an unattended run can't silently ride the launching
# shell's default model (subagents stay pinned by their own frontmatter); set it
# to `opus` for a stronger orchestrator, or "" to fall back to your settings.json.
# `advance` (one milestone, the supervisor surface) and `usage` are also available:
# see docs/driver-event-contract.md in the plugin for the event stream it emits.
#
# RUN IT FROM A PLAIN TERMINAL (not inside a Claude Code session) — it spawns
# `claude` itself. (If you DO run it from inside a session — e.g. a babysitting
# agent — CLAUDE_ORCHESTRATOR_MODEL + the driver's ANTHROPIC_MODEL scrub now stop
# that parent session's model from leaking into every spawned turn.) Unattended
# mode auto-approves ONLY the happy path and HALTS on any deviation by writing
# `.adlc/unattended-halt.json` (ADR-0019); every hook stays in force inside
# spawned sessions. The same lock file as before
# (`.adlc/.run-milestones.lock`) is used, so an old driver and the packaged one
# mutually exclude during a transition window.
set -euo pipefail

cd "$(dirname "$0")/.."            # project root

# Resolve the installed plugin's ROOT dir (the one holding .claude-plugin/plugin.json).
# Priority: an explicit --plugin-dir in CLAUDE_EXTRA_ARGS (framework-dev / pinned run)
# → THIS project's `claude plugin list --json` entry, then the user-scope entry (the
# only source that discriminates between projects' local installs — I-6) → the newest
# cached cr_adlc_framework version (filtered by plugin.json's own `name`; the dir above
# .claude-plugin is the VERSION, not the plugin name).
resolve_plugin_dir() {
  CLAUDE_BIN="${CLAUDE_BIN:-claude}" python3 - "${CLAUDE_EXTRA_ARGS:-}" <<'PY' 2>/dev/null || true
import json, os, re, subprocess, sys, shlex
from pathlib import Path
toks = shlex.split(sys.argv[1]) if len(sys.argv) > 1 and sys.argv[1] else []
for i, t in enumerate(toks):
    if t == "--plugin-dir" and i + 1 < len(toks):
        print(toks[i + 1]); sys.exit(0)
    if t.startswith("--plugin-dir="):
        print(t.split("=", 1)[1]); sys.exit(0)
binary = (os.environ.get("CLAUDE_BIN") or "claude").split()[0]
try:
    out = subprocess.run([binary, "plugin", "list", "--json"],
                         capture_output=True, text=True, timeout=30).stdout
    entries = [e for e in json.loads(out)
               if isinstance(e, dict)
               and str(e.get("id", "")).startswith("cr_adlc_framework@")
               and e.get("enabled") and e.get("installPath")
               and Path(e["installPath"]).is_dir()]
    here = Path.cwd().resolve()
    for e in entries:
        if (e.get("scope") == "local" and e.get("projectPath")
                and Path(e["projectPath"]).resolve() == here):
            print(e["installPath"]); sys.exit(0)
    for e in entries:
        if e.get("scope") == "user":
            print(e["installPath"]); sys.exit(0)
except Exception:
    pass
best = None
base = Path(os.environ.get("CLAUDE_CONFIG_DIR") or (Path.home() / ".claude")) / "plugins"
if base.exists():
    for pj in base.rglob(".claude-plugin/plugin.json"):
        try:
            data = json.loads(pj.read_text())
        except Exception:
            continue
        if data.get("name") != "cr_adlc_framework":
            continue
        v = data.get("version")
        if v:
            key = tuple(int(x) for x in re.findall(r"\d+", v)[:3])
            if best is None or key > best[0]:
                best = (key, str(pj.parent.parent))
if best:
    print(best[1])
PY
}

PLUGIN_DIR="$(resolve_plugin_dir)"

if [[ -n "$PLUGIN_DIR" && -d "$PLUGIN_DIR/driver/adlc_driver" ]]; then
  export PYTHONPATH="$PLUGIN_DIR/driver${PYTHONPATH:+:$PYTHONPATH}"
  exec python3 -m adlc_driver batch "$@"
fi

# Plugin root unresolvable (or a pre-0.47.0 plugin without the driver package):
# fall back to a pip-installed driver before giving up.
if command -v adlc-driver >/dev/null 2>&1; then
  echo "run-milestones: plugin driver package not found — using the pip-installed adlc-driver on PATH." >&2
  exec adlc-driver batch "$@"
fi

echo "run-milestones: could not locate the cr_adlc_framework plugin's driver package" >&2
echo "  (checked CLAUDE_EXTRA_ARGS --plugin-dir, 'claude plugin list --json', the plugin cache," >&2
echo "  and PATH for a pip-installed adlc-driver)." >&2
echo "  Update the plugin to >= 0.47.0 (docs/plugin-usage.md), or pip install <plugin>/driver." >&2
exit 2
