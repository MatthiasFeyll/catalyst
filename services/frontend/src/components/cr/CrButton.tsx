import * as React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Cr* REFERENCE COMPONENT — the demonstrated pattern (design-system.md § component
// conventions). A Cr* wraps a shadcn primitive and binds it to the PROJECT design
// system: tokens, brand geometry, and any house interaction states — never bare
// shadcn/browser defaults, never hardcoded hex outside the token layer. The
// foundation milestone implements the FULL Cr* set (CrCard, CrBadge, CrAlert,
// CrTable, form controls, …) by extending this pattern over the vendored primitives.
// Here the wrapper is thin because Button already binds to tokens; richer Cr*
// components add house defaults (e.g. a default size, an icon slot, a loading state).
export const CrButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <Button ref={ref} className={cn(className)} {...props} />
  ),
);
CrButton.displayName = "CrButton";
