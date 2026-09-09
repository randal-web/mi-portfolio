"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { CloseIcon, MenuIcon } from "@/components/icons";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type NavItem = { id: string; label: string };

type SiteHeaderProps = {
  name: string;
  locale: Locale;
  items: NavItem[];
  labels: {
    primary: string;
    openMenu: string;
    closeMenu: string;
    locale: string;
  };
};

export function SiteHeader({ name, locale, items, labels }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  /* Condense the bar once the hero is behind us. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Highlight whichever section currently owns the top of the viewport. */
  useEffect(() => {
    /* The hero is observed too, so scrolling back to the top clears the
       highlight instead of leaving the first section stuck as "active". */
    const ids = ["top", ...items.map(({ id }) => id)];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (sections.length === 0 || typeof IntersectionObserver === "undefined") return;

    /*
     * The observer only reports sections whose visibility *changed*, so the
     * currently-visible set has to be tracked across callbacks. Deriving the
     * active id from `entries` alone leaves a stale highlight whenever a
     * section leaves the band and nothing new enters it.
     */
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActive(ids.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  /* Close the mobile sheet on Escape and lock the page behind it. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  const [firstName, ...restName] = name.split(" ");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-white/10 bg-ink/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <Container className="flex items-center justify-between gap-6 py-4 sm:py-5">
        <Link
          href={`/${locale}`}
          onClick={close}
          className="font-mono text-sm leading-tight tracking-tight text-fg transition-opacity hover:opacity-70"
        >
          <span className="block">{firstName}</span>
          {restName.length > 0 && (
            <span className="block text-fg-muted">{restName.join(" ")}</span>
          )}
        </Link>

        <nav aria-label={labels.primary} className="hidden md:block">
          {/*
           * The padding lives on every item, not just the active one, so the
           * pill appearing never shifts the row; the gaps shrink by the same
           * amount the padding adds, keeping the original optical rhythm.
           */}
          <ul className="flex items-center gap-1 lg:gap-3">
            {items.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={cn(
                    "relative block rounded-full px-3 py-1.5 font-mono text-sm transition-colors duration-200",
                    // The hover underline is inset to the text, so it grows from
                    // the left edge of the label rather than of the pill.
                    "after:absolute after:bottom-0.5 after:left-3 after:right-3 after:h-px after:origin-left after:bg-fg after:transition-transform after:duration-300",
                    active === id
                      ? "bg-white/10 text-fg after:scale-x-0"
                      : "text-fg-muted after:scale-x-0 hover:text-fg hover:after:scale-x-100",
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <LocaleSwitcher locale={locale} label={labels.locale} />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? labels.closeMenu : labels.openMenu}
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/12 text-lg text-fg transition-colors hover:border-white/35 md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-white/10 bg-ink/95 backdrop-blur-xl md:hidden"
      >
        <nav aria-label={labels.primary}>
          <ul className="flex flex-col px-5 py-3 sm:px-8">
            {items.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={close}
                  className="block border-b border-white/5 py-4 font-mono text-base text-fg-muted transition-colors hover:text-fg"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
