import { SocialRail } from "@/components/ui/SocialLinks";

/**
 * The fixed left/right furniture from the second mockup: a vertical social
 * rail and a rotated "scroll" cue. Desktop-only.
 *
 * The rail holds real links, so it stays in the accessibility tree and gets a
 * `<nav>` landmark of its own; only the scroll cue is decorative.
 */
export function SideRails({
  scrollLabel,
  socialsLabel,
}: {
  scrollLabel: string;
  socialsLabel: string;
}) {
  return (
    <div className="pointer-events-none fixed inset-y-0 z-40 hidden w-full xl:block">
      <nav aria-label={socialsLabel} className="absolute left-4 top-1/2 -translate-y-1/2">
        <SocialRail />
      </nav>

      <div
        aria-hidden
        className="absolute right-6 top-1/2 flex -translate-y-1/2 flex-col items-center gap-4"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-fg-subtle [writing-mode:vertical-rl]">
          {scrollLabel}
        </span>
        <span className="h-16 w-px bg-gradient-to-b from-white/25 to-transparent" />
      </div>
    </div>
  );
}
