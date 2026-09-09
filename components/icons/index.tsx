import type { SVGProps } from "react";

import type { SocialId } from "@/content/site";

type IconProps = SVGProps<SVGSVGElement>;

/**
 * Hand-rolled icon set — a handful of paths beats pulling in an icon library
 * for a site that uses eight glyphs. All icons share a 24x24 box and inherit
 * `currentColor`.
 */

const base = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em",
  "aria-hidden": true,
  focusable: false,
} as const;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function GitHubIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.5 9.5 0 0 1 5.01 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
      />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        fill="currentColor"
        d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6.5 0h3.83v1.64h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.53 4.78 5.82V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21h-4V9Z"
      />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        fill="currentColor"
        d="M17.53 3h3.05l-6.66 7.62L21.75 21h-6.13l-4.8-6.28L5.32 21H2.27l7.12-8.14L2.25 3h6.29l4.34 5.74L17.53 3Zm-1.07 16.17h1.69L7.62 4.74H5.8l10.66 14.43Z"
      />
    </svg>
  );
}

export function TelegramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        fill="currentColor"
        d="M21.72 3.29a1.2 1.2 0 0 0-1.24-.2L2.85 10.2c-.94.38-.9 1.73.06 2.05l4.3 1.44 1.65 5.06c.28.84 1.36 1.06 1.94.4l2.35-2.65 4.3 3.16c.68.5 1.66.14 1.84-.69l3.06-14.4a1.2 1.2 0 0 0-.63-1.28ZM9.6 13.9l-.62 3.6-1.06-3.26 8.63-5.63L9.6 13.9Z"
      />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2.5" {...stroke} />
      <path d="m3.5 7.5 7.4 5.1a2 2 0 0 0 2.2 0l7.4-5.1" {...stroke} />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16m0 0-6-6m6 6-6 6" {...stroke} />
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7m0 0H8m9 0v9" {...stroke} />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 12H4m0 0 6-6m-6 6 6 6" {...stroke} />
    </svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20V4m0 0-6 6m6-6 6 6" {...stroke} />
    </svg>
  );
}

/** Tray with an arrow dropping into it — the CV download button. */
export function DownloadIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5v11m0 0 4-4m-4 4-4-4" {...stroke} />
      <path d="M4 16.5v2A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5v-2" {...stroke} />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8h16M4 16h16" {...stroke} />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" {...stroke} />
    </svg>
  );
}

/** Toggle for the work rows — rotates 45deg into a cross when expanded. */
export function PlusIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" {...stroke} />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m4.5 12.5 5 5 10-11" {...stroke} />
    </svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9.25" {...stroke} />
      <path d="M12 7.5v5.5" {...stroke} />
      <circle cx="12" cy="16.25" r="1" fill="currentColor" />
    </svg>
  );
}

export function SpinnerIcon({ className, ...props }: IconProps) {
  return (
    <svg {...base} className={`animate-spin ${className ?? ""}`} {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.25" fill="none" />
      <path d="M21 12a9 9 0 0 0-9-9" {...stroke} strokeWidth={2} />
    </svg>
  );
}

/** Lookup used by the social links, keyed by `content/site.ts` ids. */
export const socialIcons: Record<SocialId, (props: IconProps) => React.ReactElement> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
  telegram: TelegramIcon,
  email: MailIcon,
};
