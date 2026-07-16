import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// `cn` — the shadcn class-merge helper. Composes conditional classes (clsx) and
// resolves Tailwind conflicts (tailwind-merge). Used by every primitive + Cr*.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
