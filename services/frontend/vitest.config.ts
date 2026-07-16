// Vitest config — the per-feature tier-1 test tier (project ADR-0004). catalyst is a
// purely static, auth-less SPA, so tier-1 is `tsc --noEmit` + `vitest` (unit tests +
// serverless-function handler tests with mocked Resend/Discord/KV). The rendered/a11y
// slice stays at milestone-end (Playwright + axe). Kept minimal: the foundation
// milestone picks the environment per test need (jsdom for component tests, node for
// handler tests) and adds setup files as it authors the first tests.
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // Mirror the `@/` → ./src alias (tsconfig.json `paths` + vite.config.ts) so tests
  // import the same way the app does.
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true,
    // Default to node; component tests override with `// @vitest-environment jsdom`
    // (add jsdom + @testing-library/react as pinned deps when the first one lands).
    environment: "node",
  },
});
