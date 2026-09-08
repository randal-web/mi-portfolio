/**
 * Locale configuration for the site.
 *
 * Every route lives under `app/[lang]`, so `lang` is a *root parameter* and can
 * be read from any Server Component with `next/root-params` (see
 * `lib/dictionaries.ts`) instead of being drilled through props.
 */

export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

/** Human-readable names, used by the locale switcher. */
export const localeNames: Record<Locale, { short: string; long: string }> = {
  es: { short: "Es", long: "Español" },
  en: { short: "En", long: "English" },
};

/** BCP-47 tags for `<html lang>`, `Intl` formatting and `hreflang`. */
export const localeTags: Record<Locale, string> = {
  es: "es-ES",
  en: "en-US",
};

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (locales as readonly string[]).includes(value);
}

/**
 * A value that exists in every supported language.
 * Content files use this for any field that needs translating.
 */
export type Localized<T> = Record<Locale, T>;

/** Read the variant of a localized value for the active locale. */
export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}
