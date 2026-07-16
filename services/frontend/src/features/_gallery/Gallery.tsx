import { CheckCircle2 } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CrButton } from "@/components/cr/CrButton";

// Component gallery — FRAMEWORK-OWNED REFERENCE (ADR-0010, ADR-0015). Renders the
// vendored primitives + the Cr* reference so the design-token theming is visible.
// The foundation milestone extends this with every Cr* in design-system.md; the
// milestone-end business-e2e rendered journey asserts these render with token-driven
// computed styles (not bare defaults).
export function Gallery() {
  return (
    <div data-testid="gallery" className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Component gallery
        </h1>
        <p className="text-muted-foreground">
          The base component set, themed via the design tokens.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buttons &amp; badges</CardTitle>
          <CardDescription>shadcn primitives + the Cr* wrapper.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <CrButton>Cr button</CrButton>
          <Badge>Badge</Badge>
          <Badge variant="secondary">Secondary</Badge>
        </CardContent>
      </Card>

      <Alert>
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Walking skeleton is live</AlertTitle>
        <AlertDescription>
          Replace the slate baseline tokens in <code>src/index.css</code> with the
          project palette to re-theme everything above.
        </AlertDescription>
      </Alert>
    </div>
  );
}
