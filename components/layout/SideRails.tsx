import { ResumeRailLink } from "@/components/ui/ResumeLink";
import { SocialRail } from "@/components/ui/SocialLinks";
import type { Resume } from "@/content/site";

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
  resume,
  resumeLabel,
}: {
  scrollLabel: string;
  socialsLabel: string;
  /** Already resolved for the active locale; `null` hides the button. */
  resume: Resume | null;
  resumeLabel: string;
}) {
  return (
    <div className="pointer-events-none fixed inset-y-0 z-40 hidden w-full xl:block">
      {/*
       * The CV sits in its own capsule below the socials rather than inside
       * the list: it is a download, not a profile, so it stays outside the
       * `<nav>` landmark that the socials own.
       */}
      <div className="absolute left-4 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3">
        <nav aria-label={socialsLabel}>
          <SocialRail />
        </nav>
        {resume && <ResumeRailLink {...resume} label={resumeLabel} />}
      </div>

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
