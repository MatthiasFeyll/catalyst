// API client — FRAMEWORK-OWNED REFERENCE, adapted for catalyst (project ADR-0001/0002).
// A thin `fetch` wrapper the whole SPA (and every TanStack Query queryFn/mutationFn)
// routes through.
//
// AUTH: NONE. catalyst is a purely static, PUBLIC page (ADR-0002) — there is no login,
// no IdP, no bearer tokens (Azure Entra / MSAL were removed). The only server-side
// surface is a set of Vercel serverless functions (contact/relay + LLM chat proxy,
// ADR-0001), called anonymously. No Authorization header, no cookies, no CSRF.
//
// API BASE: `import.meta.env.VITE_API_URL` when set, else "/api". In dev the Vite
// server can proxy "/api" to a local `vercel dev` process (VITE_DEV_PROXY_TARGET,
// vite.config.ts); in prod the functions live under the same origin ("/api"). Either
// way the base ALREADY includes `/api`, so callers pass paths WITHOUT it:
// `api("/contact")` → `<base>/contact`.

// Build-time-inlined API base in prod; the relative "/api" proxy base in dev.
const API_BASE = (import.meta.env.VITE_API_URL ?? "/api").replace(/\/$/, "");

export class ApiError extends Error {
  status: number;
  body: unknown;
  constructor(status: number, body: unknown, message?: string) {
    super(message ?? `API error ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

type ApiOptions = Omit<RequestInit, "body"> & { body?: unknown };

/**
 * Issue a JSON request against a serverless function. `path` is relative to the API
 * base (e.g. `/contact` → `${API_BASE}/contact`). Throws `ApiError` on a non-2xx
 * response so TanStack Query surfaces it as an error state.
 */
export async function api<T = unknown>(path: string, options: ApiOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;

  const finalHeaders: Record<string, string> = {
    Accept: "application/json",
    ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
    ...(headers as Record<string, string> | undefined),
  };

  const resp = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers: finalHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const isJson = resp.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await resp.json().catch(() => null) : await resp.text();

  if (!resp.ok) {
    throw new ApiError(resp.status, payload);
  }
  return payload as T;
}
