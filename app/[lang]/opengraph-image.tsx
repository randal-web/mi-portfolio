import { ImageResponse } from "next/og";

import { site } from "@/content/site";
import { getDictionary } from "@/lib/dictionaries";
import { defaultLocale, isLocale, locales, pick } from "@/lib/i18n";

export const alt = "Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Prerender one card per locale instead of rendering them on demand. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/**
 * Social card, rendered to PNG at build time (one per locale).
 *
 * In Next.js 16 the `params` handed to image-generating functions are Promises,
 * matching the async request APIs everywhere else.
 */
export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const [lineOne, lineTwo] = pick(site.headline, locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#050506",
          color: "#f4f4f5",
          fontFamily: "monospace",
        }}
      >
        {/* Soft glow, matching the hero backdrop. */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: 240,
            width: 900,
            height: 560,
            borderRadius: 999,
            background: "rgba(255,255,255,0.07)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 28,
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 30, letterSpacing: -0.5 }}>{site.name}</div>
          <div style={{ fontSize: 24, color: "#71717a", letterSpacing: 4 }}>
            {locale.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 116, fontWeight: 800, letterSpacing: -5, lineHeight: 1 }}>
            {lineOne}
          </div>
          <div
            style={{
              fontSize: 116,
              fontWeight: 800,
              letterSpacing: -5,
              lineHeight: 1,
              textAlign: "right",
            }}
          >
            {lineTwo}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 26, color: "#a1a1aa", maxWidth: 720, lineHeight: 1.45 }}>
            {pick(site.tagline, locale)}
          </div>
          <div style={{ fontSize: 24, color: "#71717a" }}>{dict.meta.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
