#!/usr/bin/env python3
"""AgentOps trace aggregator.

Tails .claude/logs/agent-trace.jsonl (mounted at $TRACE_FILE) and prints a
human-readable summary line per event to stdout. The container runs locally;
output is visible via `docker compose logs -f agentops-tail`.

No external telemetry. No file writes (the trace file is mounted read-only).
"""
from __future__ import annotations

import json
import os
import sys
import time
from pathlib import Path

TRACE_FILE = Path(os.environ.get("TRACE_FILE", "/logs/agent-trace.jsonl"))
POLL_SECONDS = float(os.environ.get("POLL_SECONDS", "2"))


def _format(event: dict) -> str:
    # Coerce with `or` (not the .get default), because analytic events
    # (phase_enter, discovery_confirmed, …) carry these keys with a *null*
    # value rather than omitting them — .get(k, "") would still return None
    # and `f"{None:<10}"` raises TypeError.
    ts = event.get("ts") or "?"
    sub = event.get("subagent") or "?"
    kind = event.get("event") or "?"
    phase = event.get("phase")
    phase_s = f"p{phase}" if phase is not None else "  "
    tool = event.get("tool") or ""
    summary = event.get("args_summary") or ""
    result = event.get("result") or ""
    return f"{ts}  {phase_s}  {sub:<14}  {kind:<22}  {tool:<10}  {result:<8}  {summary}"


def _emit(line: str) -> None:
    line = line.strip()
    if not line:
        return
    try:
        print(_format(json.loads(line)), flush=True)
    except json.JSONDecodeError:
        print(f"[agentops] malformed line skipped: {line[:120]}", flush=True)


def _tail(path: Path) -> None:
    # Wait until the file appears.
    while not path.exists():
        print(f"[agentops] waiting for {path} ...", flush=True)
        time.sleep(POLL_SECONDS)

    # Print existing content first.
    fh = path.open("r", encoding="utf-8")
    for line in fh:
        _emit(line)

    # Now follow. Rotation safety: when the trace is rotated (the active file is
    # *renamed* to agent-trace-YYYY-MM-DD.jsonl and a fresh empty one is created
    # at the same path — see hooks/posttooluse_trace.py), our open handle still
    # points at the renamed inode. Detect that the on-disk file at `path` has
    # been replaced/truncated (its size dropped below our read offset) and
    # **reopen the path** rather than seeking the stale handle to 0 — seeking the
    # stale handle re-reads the whole rotated file forever (a no-sleep reprint
    # storm that floods container logs). Always sleep when there is no new line.
    try:
        while True:
            line = fh.readline()
            if line:
                _emit(line)
                continue
            # No new data — check whether the file rotated/truncated underneath us.
            try:
                size = path.stat().st_size
            except FileNotFoundError:
                print(f"[agentops] {path} disappeared, polling ...", flush=True)
                time.sleep(POLL_SECONDS)
                continue
            if size < fh.tell():
                # Rotated or truncated: reopen the path fresh and read from its start.
                fh.close()
                fh = path.open("r", encoding="utf-8")
                continue
            time.sleep(POLL_SECONDS)
    finally:
        fh.close()


def main() -> int:
    try:
        _tail(TRACE_FILE)
    except KeyboardInterrupt:
        return 0
    return 0


if __name__ == "__main__":
    sys.exit(main())
