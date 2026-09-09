import { DownloadIcon } from "@/components/icons";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { RailLabel } from "@/components/ui/SocialLinks";
import type { Resume } from "@/content/site";
import { cn } from "@/lib/utils";

type ResumeLinkProps = Resume & {
  label: string;
  /**
   * Spoken label, for when `label` is shortened to fit (the header uses just
   * "CV"). Defaults to `label`.
   */
  ariaLabel?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
};

/**
 * Download button for the CV.
 *
 * A plain `<a>` rather than `ButtonLink`: `next/link` is for in-app
 * navigation, while `download` needs the browser to fetch the file itself and
 * hand it to the OS. `download` also renames the saved file, so the visitor
 * ends up with `Randal-CV-ES.pdf` instead of whatever is in `/public`.
 */
export function ResumeLink({
  href,
  filename,
  label,
  ariaLabel,
  variant = "outline",
  size = "md",
  className,
  onClick,
}: ResumeLinkProps) {
  return (
    <a
      href={href}
      download={filename}
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn("group", buttonClasses({ variant, size }), className)}
    >
      <DownloadIcon className="text-[1.15em] transition-transform duration-200 group-hover:translate-y-0.5" />
      {label}
    </a>
  );
}

/**
 * Rail treatment of the same download: an icon-only circle sized and skinned
 * like the social rail it hangs under, with the label sliding out on hover.
 */
export function ResumeRailLink({ href, filename, label }: Resume & { label: string }) {
  return (
    <a
      href={href}
      download={filename}
      aria-label={label}
      className={cn(
        "group pointer-events-auto relative flex size-11 items-center justify-center rounded-full",
        "border border-white/10 bg-ink/70 text-lg text-fg-subtle backdrop-blur-md",
        "transition-colors duration-200 hover:border-white/25 hover:text-fg",
      )}
    >
      <DownloadIcon className="transition-transform duration-200 group-hover:translate-y-0.5" />
      <RailLabel>{label}</RailLabel>
    </a>
  );
}
