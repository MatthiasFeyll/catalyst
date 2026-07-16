import { Outlet, Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

// App shell — FRAMEWORK-OWNED REFERENCE (ADR-0015 + ADR-0022). The foundation
// milestone extends this (real nav assembled from features/*/nav.tsx, a theme
// toggle, the Commerz Real brand mark) but keeps the single <Outlet/> mount. Server
// data flows through the api client (src/lib/api.ts → the cross-origin DRF API,
// ADR-0022/0023). Styling consumes design tokens (bg-background, text-primary),
// never hardcoded hex.
export function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container flex h-14 items-center gap-2">
          <LayoutDashboard className="h-5 w-5 text-primary" />
          <span className="font-semibold">App</span>
          <nav className="ml-auto flex gap-4 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link
              to="/gallery"
              className="text-muted-foreground hover:text-foreground"
            >
              Components
            </Link>
          </nav>
        </div>
      </header>
      <main className="container py-8">
        <Outlet />
      </main>
    </div>
  );
}

// Index route — the walking-skeleton boot page (the `/` the render smoke checks).
export function Home() {
  return (
    <div data-testid="home" className="space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight">Walking skeleton</h1>
      <p className="text-muted-foreground">
        Frontend shell is live. The foundation milestone replaces this with the
        product home and wires the real navigation.
      </p>
    </div>
  );
}
