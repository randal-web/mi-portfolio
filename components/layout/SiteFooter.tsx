import Link from "next/link";

import { ArrowUpIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { SocialPills } from "@/components/ui/SocialLinks";
import { site } from "@/content/site";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import type { NavItem } from "@/components/layout/SiteHeader";

export function SiteFooter({
  dict,
  locale,
  items,
}: {
  dict: Dictionary;
  locale: Locale;
  items: NavItem[];
}) {
  return (
    <footer className="border-t border-white/10 bg-ink-2">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              href={`/${locale}`}
              className="font-mono text-2xl font-bold tracking-tight text-fg transition-opacity hover:opacity-70"
            >
              {site.name}
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-muted">
              {dict.meta.description}
            </p>
          </div>

          <nav aria-label={dict.footer.sitemap} className="md:col-span-3">
            <h2 className="font-mono text-xs tracking-[0.2em] text-fg-subtle">
              {dict.footer.sitemap}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {items.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="font-mono text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="font-mono text-xs tracking-[0.2em] text-fg-subtle">
              {dict.footer.elsewhere}
            </h2>
            <SocialPills className="mt-4" />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-fg-subtle">
            © {new Date().getFullYear()} {site.name}. {dict.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <p className="font-mono text-xs text-fg-subtle">{dict.footer.builtWith}</p>
            <a
              href="#top"
              className="inline-flex items-center gap-2 font-mono text-xs text-fg-muted transition-colors hover:text-fg"
            >
              {dict.footer.backToTop}
              <ArrowUpIcon />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
