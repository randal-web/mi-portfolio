import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl();
  const lastModified = new Date();

  return locales.map((locale) => ({
    url: `${url}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === "es" ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(locales.map((item) => [item, `${url}/${item}`])),
    },
  }));
}
