#!/usr/bin/env python3
"""Framework-owned render-capture for the implement-loop screenshot self-review
(ADR-0049; sibling of frontend-smoke.py, ADR-0017).

WHY THIS EXISTS: the root-cause analysis of the framework's flat frontends
(docs/design-quality-workpackages-2026-07.md §0, cause #1) found there is NO
see-and-iterate loop on the real UI anywhere in the cycle — implementation
self-verify is "pytest only, no browser", and the first RENDERED contact is the
milestone-end deterministic business-e2e phase. Nobody — model or human — ever
LOOKS at the app before wave end. This script gives the agent that writes the JSX
its own render back: it captures full-page PNGs of the feature's routes so the
`implementation` agent can Read them (multimodal) and iterate on visual craft
(ADR-0040 principles + gestalt) BEFORE hand-off.

It is DELIBERATELY NOT A GATE and NOT AN ASSERTION (ADR-0049): it makes no
pass/fail claim about rendered quality — it only produces the images the agent
reflects on. The deterministic ADR-0017 frontend gate stays the in-loop gate; the
deterministic milestone-end business-e2e rendered/a11y journeys (ADR-0018) stay the
authoritative rendered verification. This is the cheap reflection loop above them.

It captures each path in SHOT_PATHS at each width in SHOT_WIDTHS against
SHOT_BASE_URL — the FRONTEND origin (the Vite dev server at http://frontend:5173,
ADR-0022 — NEVER a host-side server, NEVER localhost which resolves to this runner
container). Full-page PNGs go to SHOT_OUT_DIR/<route>@<width>.png. Like the smoke,
it runs unauthenticated, so SHOT_PATHS must name routes that render WITHOUT a live
OIDC token (the public shell / login-redirect landing) — a token-gated route
white-screens here and produces an uninformative shot (ADR-0025).

FAIL-SOFT (ADR-0049): this is advisory self-reflection, never a halt. A route that
fails to load is recorded and skipped; the script exits 0 whenever it captured at
least one image, and non-zero ONLY when it could capture nothing (e.g. the dev stack
is down) so the caller can note "skipped — stack unavailable" rather than treat it as
a defect. It writes a machine-readable manifest to SHOT_OUT_DIR/_manifest.json.

Run as a one-shot via infra/docker-compose.frontend-check.yml (the `screenshot`
service — reuses the standing e2e Playwright image, joins the dev network):

  SHOT_PATHS="/projects /projects/gallery" SHOT_SUBDIR="milestone-2/projects" \
    docker compose --project-directory infra -f infra/docker-compose.frontend-check.yml \
      run --rm screenshot

  SHOT_BASE_URL  default http://frontend:5173 (the Vite dev server)
  SHOT_PATHS     comma- or space-separated route paths; default "/"
                 (the caller derives these from the feature's
                  src/features/<feature>/route.tsx `path`, plus "/" — ADR-0015)
  SHOT_WIDTHS    comma/space-separated viewport widths; default "1440,390"
                 (a desktop + a mobile breakpoint — the committed breakpoints,
                  ADR-0040 reading-measure/responsive craft)
  SHOT_SUBDIR    subdir under the out mount, typically "<milestone>/<feature>";
                 default "" (write straight into the mount root)
  SHOT_OUT_DIR   the writable mount root; default /shots/out (the compose bind of
                 the project's .adlc/screenshots/ — gitignored, ADR-0049)
"""

from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE_URL = os.environ.get("SHOT_BASE_URL", "http://frontend:5173").rstrip("/")
_RAW_PATHS = os.environ.get("SHOT_PATHS", "/").strip()
_RAW_WIDTHS = os.environ.get("SHOT_WIDTHS", "1440,390").strip()
_SUBDIR = os.environ.get("SHOT_SUBDIR", "").strip().strip("/")
OUT_ROOT = Path(os.environ.get("SHOT_OUT_DIR", "/shots/out"))
OUT_DIR = OUT_ROOT / _SUBDIR if _SUBDIR else OUT_ROOT

# Generous mount budget — this is a render-capture, not a perf gate. Wait for the
# SPA to actually mount (#root children) before the shot so we photograph the app,
# not a blank boot frame; fall back to a plain load if it never mounts.
MOUNT_TIMEOUT_MS = int(os.environ.get("SHOT_MOUNT_TIMEOUT_MS", "10000"))
NAV_TIMEOUT_MS = int(os.environ.get("SHOT_NAV_TIMEOUT_MS", "30000"))
# A short settle so async data/layout lands before the capture (fonts, first fetch).
SETTLE_MS = int(os.environ.get("SHOT_SETTLE_MS", "600"))


def _parse_paths(raw: str) -> list[str]:
    parts = [p for p in re.split(r"[,\s]+", raw) if p]
    paths: list[str] = []
    for p in parts:
        if not p.startswith("/"):
            p = "/" + p
        if p not in paths:
            paths.append(p)
    if "/" not in paths:
        paths.insert(0, "/")  # always capture the boot route
    return paths


def _parse_widths(raw: str) -> list[int]:
    widths: list[int] = []
    for tok in re.split(r"[,\s]+", raw):
        if not tok:
            continue
        try:
            w = int(tok)
        except ValueError:
            continue
        if w > 0 and w not in widths:
            widths.append(w)
    return widths or [1440]


def _slug(path: str) -> str:
    return path.rstrip("/").replace("/", "_") or "_root"


def _capture(browser, path: str, width: int) -> dict:
    """Capture one route at one width. Never raises — records the outcome."""
    url = f"{BASE_URL}{path}"
    rec: dict = {"path": path, "width": width, "url": url, "ok": False}
    context = browser.new_context(viewport={"width": width, "height": 900})
    page = context.new_page()
    try:
        resp = page.goto(url, wait_until="load", timeout=NAV_TIMEOUT_MS)
        rec["status"] = resp.status if resp else None
        try:
            page.wait_for_function(
                "() => { const r = document.getElementById('root');"
                " return r && r.childElementCount > 0; }",
                timeout=MOUNT_TIMEOUT_MS,
            )
        except Exception:
            rec["note"] = "did not mount (#root empty) — captured anyway"
        page.wait_for_timeout(SETTLE_MS)
        shot = OUT_DIR / f"{_slug(path)}@{width}.png"
        page.screenshot(path=str(shot), full_page=True)
        rec["screenshot"] = str(shot)
        rec["ok"] = True
    except Exception as exc:  # navigation failed (stack down / timeout / …)
        rec["error"] = str(exc)
    finally:
        page.close()
        context.close()
    return rec


def main() -> int:
    paths = _parse_paths(_RAW_PATHS)
    widths = _parse_widths(_RAW_WIDTHS)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"› Render capture against {BASE_URL} — paths: {', '.join(paths)} "
          f"× widths: {', '.join(map(str, widths))} → {OUT_DIR}")

    records: list[dict] = []
    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch(headless=True)
            for path in paths:
                for width in widths:
                    records.append(_capture(browser, path, width))
            browser.close()
    except Exception as exc:  # Playwright itself failed to start — fail-soft.
        print(f"✗ capture unavailable ({exc}) — skipping screenshot self-review "
              "(advisory; not a defect).")
        (OUT_DIR / "_manifest.json").write_text(
            json.dumps({"base_url": BASE_URL, "captured": 0, "records": [],
                        "error": str(exc)}, indent=2), encoding="utf-8")
        return 1

    captured = [r for r in records if r["ok"]]
    (OUT_DIR / "_manifest.json").write_text(
        json.dumps({"base_url": BASE_URL, "widths": widths,
                    "captured": len(captured), "records": records}, indent=2),
        encoding="utf-8",
    )

    for r in records:
        mark = "✓" if r["ok"] else "✗"
        extra = r.get("note") or r.get("error") or ""
        loc = r.get("screenshot", "")
        print(f"  {mark} {r['path']}@{r['width']}  {loc}{('  — ' + extra) if extra else ''}")

    if not captured:
        print("✗ captured no screenshots (dev stack unreachable?) — skipping the "
              "screenshot self-review (advisory; not a defect).")
        return 1
    print(f"✓ captured {len(captured)}/{len(records)} render(s) → {OUT_DIR} "
          "(Read the PNGs, critique vs ADR-0040 + gestalt, fix, re-capture ≤2×).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
