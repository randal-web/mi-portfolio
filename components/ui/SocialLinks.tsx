import { socialIcons } from "@/components/icons";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const externalProps = { target: "_blank", rel: "noreferrer noopener" } as const;

function linkProps(href: string) {
  return href.startsWith("mailto:") ? {} : externalProps;
}

/** Row of labelled pills — the hero treatment from the first mockup. */
export function SocialPills({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2.5 sm:gap-3", className)}>
      {site.socials.map(({ id, label, href }) => {
        const Icon = socialIcons[id];
        return (
          <li key={id}>
            <a
              href={href}
              {...linkProps(href)}
              className={cn(
                "group inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.03]",
                "px-4 py-2.5 font-mono text-xs text-fg-muted sm:px-5 sm:text-sm",
                "transition-colors duration-200 hover:border-white/35 hover:bg-white/[0.07] hover:text-fg",
              )}
            >
              <Icon className="text-[1.05em] transition-transform duration-200 group-hover:-translate-y-px" />
              {label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** Fixed vertical rail pinned to the left edge, as in the second mockup. */
export function SocialRail({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        "pointer-events-auto flex flex-col items-center gap-5 rounded-full border border-white/10",
        "bg-ink/70 px-2.5 py-5 backdrop-blur-md",
        className,
      )}
    >
      {site.socials.map(({ id, label, href }) => {
        const Icon = socialIcons[id];
        return (
          <li key={id}>
            <a
              href={href}
              {...linkProps(href)}
              aria-label={label}
              title={label}
              className="block text-lg text-fg-subtle transition-colors duration-200 hover:text-fg"
            >
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
