"""Walking-skeleton boot smoke — ships with the harness (project ADR-0004).

Proves the milestone-end gate wiring end-to-end: the built SPA is served, the browser
navigates to the boot route, the app mounts (#root has children — a white screen fails
here), and nothing threw. It is intentionally generic (no selectors, no AC assertions) —
the tester authors real per-milestone journeys alongside it. Fully hermetic: no backend,
no auth, no network beyond the served static bundle.
"""
from __future__ import annotations

from playwright.sync_api import Page


def test_app_boots(page: Page, app_url: str) -> None:
    errors: list[str] = []
    page.on("console", lambda m: errors.append(f"console.{m.type}: {m.text}")
            if m.type == "error" else None)
    page.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))

    resp = page.goto(f"{app_url}/", wait_until="load")
    assert resp is not None and resp.status < 400, f"boot route returned {resp and resp.status}"

    # The app must MOUNT — #root present with at least one child (white screen fails here).
    page.wait_for_function(
        "() => { const r = document.getElementById('root');"
        " return r && r.childElementCount > 0; }",
        timeout=10000,
    )

    assert not errors, f"console/page errors on boot: {errors}"
