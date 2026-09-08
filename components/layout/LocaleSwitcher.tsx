"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { localeNames, locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Swaps the `[lang]` segment of the current path.
 *
 * Because the locale lives in the URL rather than in client state, both
 * languages are statically prerendered and each one is independently
 * crawlable — the switcher is just two links.
 */
export function LocaleSwitcher({
  locale,
  label,
  className,
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();

  const hrefFor = (target: Locale) => {
    const segments = pathname.split("/");
    // segments[0] is always "" for absolute paths; segments[1] is the locale.
    segments[1] = target;
    return segments.join("/") || `/${target}`;
  };

  return (
    <nav aria-label={label} className={cn("flex flex-col items-end leading-tight", className)}>
      {locales.map((item) => {
        const active = item === locale;
        return (
          <Link
            key={item}
            href={hrefFor(item)}
            hrefLang={item}
            aria-current={active ? "true" : undefined}
            className={cn(
              "font-mono text-sm transition-colors duration-200",
              active ? "text-fg" : "text-fg-subtle hover:text-fg-muted",
            )}
          >
            {localeNames[item].short}
          </Link>
        );
      })}
    </nav>
  );
}
