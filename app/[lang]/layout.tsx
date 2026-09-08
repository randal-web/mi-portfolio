import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader, type NavItem } from "@/components/layout/SiteHeader";
import { SideRails } from "@/components/layout/SideRails";
import { articles } from "@/content/articles";
import { site } from "@/content/site";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localeTags, locales, type Locale } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";

import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

/** Prerender every language at build time — the whole site is static. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const url = getSiteUrl();
  const title = `${site.name} — ${dict.meta.tagline}`;

  return {
    metadataBase: new URL(url),
    title: {
      default: title,
      template: `%s — ${site.name}`,
    },
    description: dict.meta.description,
    applicationName: site.name,
    authors: [{ name: site.name, url }],
    creator: site.name,
    keywords: [
      site.name,
      dict.meta.tagline,
      "portfolio",
      "Next.js",
      "React",
      "TypeScript",
      "full-stack",
    ],
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ...Object.fromEntries(locales.map((item) => [item, `/${item}`])),
        "x-default": "/es",
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description: dict.meta.description,
      url: `/${lang}`,
      locale: localeTags[lang],
      alternateLocale: locales.filter((item) => item !== lang).map((item) => localeTags[item]),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

/** Section order for the header, footer and in-page anchors. */
function navItems(dict: Awaited<ReturnType<typeof getDictionary>>): NavItem[] {
  return [
    { id: "about", label: dict.nav.about },
    { id: "experience", label: dict.nav.experience },
    { id: "projects", label: dict.nav.projects },
    ...(articles.length > 0 ? [{ id: "articles", label: dict.nav.articles }] : []),
    { id: "contact", label: dict.nav.contact },
  ];
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale: Locale = lang;
  const dict = await getDictionary(locale);
  const items = navItems(dict);

  return (
    /*
     * `data-scroll-behavior="smooth"` restores the pre-16 behaviour of pausing
     * smooth scrolling during route transitions, so navigations stay instant
     * while in-page anchors keep gliding.
     */
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-svh bg-ink text-fg">
        {/* Without JS the scroll-reveal wrappers would never un-hide. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-5 focus:py-2.5 focus:font-mono focus:text-sm focus:text-ink"
        >
          {dict.nav.primary}
        </a>

        <SiteHeader
          name={site.name}
          locale={locale}
          items={items}
          labels={{
            primary: dict.nav.primary,
            openMenu: dict.nav.openMenu,
            closeMenu: dict.nav.closeMenu,
            locale: dict.localeSwitcher.label,
          }}
        />

        <SideRails scrollLabel={dict.hero.scroll} socialsLabel={dict.hero.socials} />

        <main id="main">{children}</main>

        <SiteFooter dict={dict} locale={locale} items={items} />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
