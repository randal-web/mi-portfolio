import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names while letting later Tailwind utilities win over
 * earlier conflicting ones (e.g. `cn("px-4", "px-6")` -> `"px-6"`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** `01`, `02`, ... — the section counters from the mockups. */
export function ordinal(index: number) {
  return String(index + 1).padStart(2, "0");
}
