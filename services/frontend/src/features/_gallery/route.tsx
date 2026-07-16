import type { RouteObject } from "react-router-dom";

import { Gallery } from "./Gallery";

// Self-registering slice (ADR-0015). The router globs features/*/route.tsx and
// mounts this with NO edit to any shared file. This `_gallery` slice is the
// foundation-owned component gallery; product feature slices follow the same shape.
const route: RouteObject = { path: "gallery", element: <Gallery /> };

export default route;
