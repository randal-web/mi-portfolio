import { notFound } from "next/navigation";
import { lang } from "next/root-params";

import { isLocale, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries/es";

/**
 * Dictionaries are loaded through dynamic `import()` so only the active
 * language ends up in the server bundle for a given render.
 */
const dictionaries = {
  es: () => import("@/lib/dictionaries/es").then((m) => m.es),
  en: () => import("@/lib/dictionaries/en").then((m) => m.en),
} satisfies Record<Locale, () => Promise<Dictionary>>;

/**
 * Resolve the active locale from the `[lang]` root parameter.
 *
 * `next/root-params` works in any Server Component without prop drilling, but
 * *not* in Client Components, Server Actions or Route Handlers — those receive
 * the locale explicitly instead.
 */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!isLocale(value)) notFound();
  return value;
}

/** UI copy for the active locale (or an explicit one, for Server Actions). */
export async function getDictionary(locale?: Locale): Promise<Dictionary> {
  return dictionaries[locale ?? (await getLocale())]();
}

export type { Dictionary };
