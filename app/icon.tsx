import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Monogram favicon, generated at build time so there is no binary to maintain. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f4f4f5",
          color: "#050506",
          fontSize: 30,
          fontWeight: 800,
          fontFamily: "monospace",
          letterSpacing: -1.5,
          borderRadius: 14,
        }}
      >
        {site.initials}
      </div>
    ),
    size,
  );
}
