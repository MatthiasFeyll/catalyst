import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { App, Home } from "./App";

// Router — FRAMEWORK-OWNED REFERENCE (ADR-0015). Feature slices SELF-REGISTER: each
// src/features/<feature>/route.tsx default-exports a RouteObject ({ path, element }).
// A Vite build-time glob discovers them, so adding a feature = adding a route.tsx —
// the router is NEVER hand-edited. This makes each user-facing feature's frontend
// `outputs` disjoint by construction (the SPA analogue of the schema-spine).
const routeModules = import.meta.glob<{ default: RouteObject }>(
  "./features/*/route.tsx",
  { eager: true },
);

const featureRoutes: RouteObject[] = Object.values(routeModules).map(
  (m) => m.default,
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: <Home /> }, ...featureRoutes],
  },
]);
