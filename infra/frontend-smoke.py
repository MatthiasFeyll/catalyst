#!/usr/bin/env python3
"""Framework-owned per-feature render smoke (ADR-0017, ADR-0022).

WHY THIS EXISTS: ADR-0014 pulled all rendered/browser verification off the
per-feature path. A real-run retro showed that left a gap — render
crashes (nested <Router>, a EUR value rendered as a number, an unhandled
`undefined`) produced a WHITE SCREEN no per-feature check could see, and surfaced
only at the milestone-end rendered phase. Source-greps (the ADR-0015 wiring test,
the review §8 static checks) assert SOURCE facts; a green grep says nothing about
whether the component actually mounted.

This smoke is the in-loop proof that the route loads, the app mounts, and nothing
threw. It is DELIBERATELY GENERIC (ADR-0017): no selectors, no `data-testid`, no
acceptance-criterion assertions — so it cannot drift and cannot be gamed. It is a
loop-level BUILD-HEALTH GATE, not a tester-owned AC test (NOT under tests/ or e2e/,
NOT firewalled): `implementation` runs it in self-verify, `reviewer` re-runs it at
the per-feature gate. The rendered-quality + a11y slice (computed styles, focus
ring, axe, interaction states) is NOT checked here — it is verified at the
milestone-end verification phase as DETERMINISTIC `business-e2e` rendered/a11y
journeys (ADR-0018; there is no human visual-approval gate).

It loads each path in SMOKE_PATHS against SMOKE_BASE_URL — the FRONTEND origin (the
Vite dev server at http://frontend:5173, ADR-0022 — NEVER a host-side server, NEVER
localhost which resolves to this runner container) — and for each asserts:
  1. HTTP response status < 400
  2. #root exists and has childElementCount > 0  (a white screen fails here)
  3. zero uncaught console.error / pageerror during load

There is no bundle-freshness guard anymore: the frontend is served by the Vite dev
server (HMR) in dev and nginx in prod — there is no server-rendered build output that
can go stale, so the entire stale-serve failure class the old guard defended against
is gone.

AUTH + THIS SMOKE (project ADR-0002): catalyst is a purely static, PUBLIC page — there
is NO auth, no login, no IdP, no tokens. Every route renders anonymously, so the smoke
never has to worry about an auth gate mis-flagging as a render crash. SMOKE_PATHS can
name any route the feature introduces (plus `/`); all of them mount without a token.

Run as a one-shot via infra/docker-compose.frontend-check.yml (reuses the standing
e2e Playwright image, joins the dev network). Writes a machine-readable result to
test-artifacts/frontend-smoke-result.json + a screenshot per failing path, and
exits non-zero on any failure.

  SMOKE_BASE_URL  default http://frontend:5173 (the Vite dev server)
  SMOKE_PATHS     comma- or space-separated route paths; default "/"
                  (the orchestrator derives these from the feature's
                   src/features/<feature>/route.tsx `path`, plus "/" — ADR-0015)
"""

from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE_URL = os.environ.get("SMOKE_BASE_URL", "http://frontend:5173").rstrip("/")
_RAW_PATHS = os.environ.get("SMOKE_PATHS", "/").strip()
ARTIFACT_DIR = Path(os.environ.get("SMOKE_ARTIFACT_DIR", "test-artifacts"))

# The page-mount budget: the SPA boots, fetches, and renders #root children. This
# is a render-crash detector, not a perf gate — be generous, fail only on a true
# white screen / thrown error, never on slowness.
MOUNT_TIMEOUT_MS = int(os.environ.get("SMOKE_MOUNT_TIMEOUT_MS", "10000"))
NAV_TIMEOUT_MS = int(os.environ.get("SMOKE_NAV_TIMEOUT_MS", "30000"))


def _parse_paths(raw: str) -> list[str]:
    parts = [p for p in re.split(r"[,\s]+", raw) if p]
    paths: list[str] = []
    for p in parts:
        if not p.startswith("/"):
            p = "/" + p
        if p not in paths:
            paths.append(p)
    if "/" not in paths:
        paths.insert(0, "/")  # always smoke the boot route
    return paths


def _smoke_path(browser, path: str) -> dict:
    """Load one route; return a result dict. Never raises — records the failure."""
    errors: list[str] = []
    page = browser.new_page()
    page.on("console", lambda m: errors.append(f"console.{m.type}: {m.text}")
            if m.type == "error" else None)
    page.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))

    url = f"{BASE_URL}{path}"
    result: dict = {"path": path, "url": url, "ok": False, "reasons": []}
    try:
        resp = page.goto(url, wait_until="load", timeout=NAV_TIMEOUT_MS)
        status = resp.status if resp else None
        result["status"] = status
        if status is not None and status >= 400:
            result["reasons"].append(f"HTTP {status}")

        # The app must MOUNT — #root present with at least one child element.
        # A white screen (root empty) is the render-crash signal ADR-0017 targets.
        try:
            page.wait_for_function(
                "() => { const r = document.getElementById('root');"
                " return r && r.childElementCount > 0; }",
                timeout=MOUNT_TIMEOUT_MS,
            )
        except Exception:
            child_count = page.evaluate(
                "() => { const r = document.getElementById('root');"
                " return r ? r.childElementCount : -1; }"
            )
            if child_count == -1:
                result["reasons"].append("#root element not found (no SPA mount point)")
            else:
                result["reasons"].append("white screen — #root has no child elements after load")

        if errors:
            result["reasons"].append(f"{len(errors)} console/page error(s)")
        result["errors"] = errors
        result["ok"] = not result["reasons"]

        if not result["ok"]:
            ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)
            shot = ARTIFACT_DIR / f"frontend-smoke{path.rstrip('/').replace('/', '_') or '_root'}.png"
            try:
                page.screenshot(path=str(shot))
                result["screenshot"] = str(shot)
            except Exception:
                pass
    except Exception as exc:  # navigation itself failed (frontend down, timeout, …)
        result["reasons"].append(f"navigation failed: {exc}")
        result["errors"] = errors
    finally:
        page.close()
    return result


def main() -> int:
    paths = _parse_paths(_RAW_PATHS)
    print(f"› Render smoke against {BASE_URL} — paths: {', '.join(paths)}")

    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        results = [_smoke_path(browser, p) for p in paths]
        browser.close()

    passed = [r for r in results if r["ok"]]
    failed = [r for r in results if not r["ok"]]

    ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)
    (ARTIFACT_DIR / "frontend-smoke-result.json").write_text(
        json.dumps(
            {"base_url": BASE_URL, "passed": len(passed), "failed": len(failed),
             "results": results},
            indent=2,
        ),
        encoding="utf-8",
    )

    for r in results:
        mark = "✓" if r["ok"] else "✗"
        detail = "" if r["ok"] else f"  — {'; '.join(r['reasons'])}"
        print(f"  {mark} {r['path']}{detail}")
        for e in (r.get("errors") or [])[:10]:
            print(f"      {e}")

    if failed:
        print(f"✗ render smoke FAILED ({len(failed)}/{len(results)} routes) — "
              "render crash / white screen / console error at the source feature.")
        return 1
    print(f"✓ render smoke passed ({len(passed)}/{len(results)} routes).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
