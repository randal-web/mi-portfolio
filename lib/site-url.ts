import { site } from "@/content/site";

/**
 * Absolute origin for canonical URLs, OG tags and the sitemap.
 *
 * Resolution order:
 *  1. `NEXT_PUBLIC_SITE_URL` — set this once you point a custom domain at the app.
 *  2. `VERCEL_PROJECT_PRODUCTION_URL` — injected by Vercel, always the
 *     production domain (unlike `VERCEL_URL`, which changes per deployment).
 *  3. The value in `content/site.ts`, used for local development.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return site.url.replace(/\/$/, "");
}
