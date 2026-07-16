import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./index.css";

// App entry — FRAMEWORK-OWNED REFERENCE (ADR-0010). TanStack Query for server
// state (data from serverless functions), React Router for client routing. The
// foundation milestone may extend providers (theme, error boundary) but keeps the
// single mount on #root.
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
