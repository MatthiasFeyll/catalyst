#!/usr/bin/env bash
# Freshness-on-consume for gate result files (F-5b / WI-4, ADR-0031).
#
#   bash infra/check-result-fresh.sh <result-file.json> [--allow-dirty]
#
# The framework's result-file pattern stamps every verdict with the commit it was
# produced at (`commit_sha` + `commit_dirty`, run-e2e-gate.sh / prod-parity.sh /
# mutation-challenge.sh). But a CONSUMER that reads the verdict without checking that
# stamp can act on a STALE result: a resumed unattended turn re-reads a verdict a prior
# (cut) session left behind, whose commit predates the current tree. The mutation
# verdict was the known offender — its `commit_sha` was never compared to HEAD before
# a feature was routed on it (F-5b). This script makes the check one mechanical call.
#
# Rule: a verdict is FRESH iff it was produced at the current HEAD against a clean tree —
#   commit_sha == $(git rev-parse HEAD)  AND  commit_dirty == false.
# --allow-dirty relaxes the clean-tree half for gates that legitimately run against an
# uncommitted working tree (the mutation challenge runs pre-commit on the feature diff):
# with it, a dirty tree is tolerated ONLY when commit_sha still matches HEAD.
#
# Exit codes (so a caller can branch): 0 fresh · 2 missing/unreadable · 3 stale
# (commit_sha unknown or != HEAD) · 4 dirty (tree dirty and --allow-dirty not given).
# Prints a one-line verdict to stderr. No writes, no network.
set -euo pipefail

cd "$(dirname "$0")/.."   # project root (same convention as the other gate scripts)

FILE=""
ALLOW_DIRTY=0
while [[ $# -gt 0 ]]; do
  case "$1" in
    --allow-dirty) ALLOW_DIRTY=1; shift ;;
    -h|--help) sed -n '2,26p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) FILE="$1"; shift ;;
  esac
done
[[ -n "$FILE" ]] || { echo "check-result-fresh: give a result file path" >&2; exit 2; }

if [[ ! -f "$FILE" ]]; then
  echo "check-result-fresh: STALE — '$FILE' does not exist (never produced, or cleaned)." >&2
  exit 2
fi

HEAD_SHA="$(git rev-parse HEAD 2>/dev/null || echo unknown)"

python3 - "$FILE" "$HEAD_SHA" "$ALLOW_DIRTY" <<'PY'
import json, sys
from pathlib import Path
path, head, allow_dirty = sys.argv[1], sys.argv[2], sys.argv[3] == "1"
try:
    d = json.loads(Path(path).read_text(encoding="utf-8"))
except Exception as exc:
    sys.stderr.write(f"check-result-fresh: STALE — '{path}' is unreadable ({exc}).\n")
    sys.exit(2)
sha = d.get("commit_sha")
dirty = d.get("commit_dirty")
gate = d.get("gate", "?")
if not sha or sha == "unknown":
    sys.stderr.write(f"check-result-fresh: STALE — {gate} verdict carries no usable commit_sha; re-run the gate.\n")
    sys.exit(3)
if sha != head:
    sys.stderr.write(f"check-result-fresh: STALE — {gate} verdict was produced at {sha[:8]}, HEAD is {head[:8]}; re-run the gate, do not consume it.\n")
    sys.exit(3)
if dirty is True and not allow_dirty:
    sys.stderr.write(f"check-result-fresh: DIRTY — {gate} verdict was produced against an uncommitted tree at HEAD; cannot certify. Re-run (or pass --allow-dirty for a pre-commit gate).\n")
    sys.exit(4)
sys.stderr.write(f"check-result-fresh: FRESH — {gate} verdict is current (commit {sha[:8]}).\n")
sys.exit(0)
PY
