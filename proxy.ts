import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n";

/**
 * Every page lives under `/[lang]`, so requests without a locale prefix are
 * redirected to the visitor's best match.
 *
 * `proxy` is the Next.js 16 replacement for `middleware`. It runs at the network
 * edge before rendering, so it stays free of shared state — the only thing it
 * imports is a constant list of locales.
 */

/** Minimal `Accept-Language` negotiation; no dependency needed for two locales. */
function negotiateLocale(header: string | null): Locale {
  if (!header) return defaultLocale;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const quality = params.find((param) => param.startsWith("q="));
      return { tag: tag.toLowerCase(), q: quality ? Number(quality.slice(2)) : 1 };
    })
    .filter((entry) => Number.isFinite(entry.q))
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const alreadyLocalized = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (alreadyLocalized) return;

  const locale = negotiateLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  /* Skip Next internals, metadata routes and anything with a file extension. */
  matcher: ["/((?!_next|sitemap.xml|robots.txt|.*\.).*)"],
};
