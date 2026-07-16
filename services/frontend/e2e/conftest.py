"""Shared fixtures for the business-e2e suite (milestone-end, project ADR-0004).

Hermetic by construction: journeys run against the statically built SPA served at
E2E_FRONTEND_URL (the nginx image on the isolated e2e network, default http://frontend).
There is no backend and no auth — a journey that needs a serverless function mocks the
endpoint with `page.route(...)`; it never calls a live function or IdP.
"""
from __future__ import annotations

import os

import pytest

# The origin the built SPA is served at (set by the gate driver / compose).
APP_URL = os.environ.get("E2E_FRONTEND_URL", "http://frontend").rstrip("/")


@pytest.fixture
def app_url() -> str:
    """Base origin of the SPA under test."""
    return APP_URL
