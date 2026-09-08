import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn, ordinal } from "@/lib/utils";

type SectionProps = {
  id: string;
  /** Zero-based; renders the `.01` counter from the mockup on the left rail. */
  index?: number;
  children: ReactNode;
  className?: string;
  /** Label for screen readers when the section has no visible heading. */
  ariaLabel?: string;
};

export function Section({ id, index, children, className, ariaLabel }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabel ? undefined : `${id}-heading`}
      className={cn("relative scroll-mt-24 py-24 sm:py-32 lg:py-40", className)}
    >
      {index !== undefined && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-4 top-24 hidden font-mono text-xs tracking-widest text-fg-subtle xl:block"
        >
          .{ordinal(index)}
        </span>
      )}
      <Container>{children}</Container>
    </section>
  );
}

/** The `... /About me ...` marker that opens every section in the mockup. */
export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-xs tracking-[0.2em] text-fg-subtle sm:text-sm", className)}>
      {children}
    </p>
  );
}

/** Oversized mono display type — "Work", "Projects", "Contact". */
export function DisplayHeading({
  children,
  id,
  className,
  as: Tag = "h2",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "font-mono font-extrabold uppercase leading-[0.9] tracking-tighter text-fg",
        "text-[clamp(2.75rem,10vw,7.5rem)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * Standard section opener: small label on the left, oversized title, and an
 * optional lead paragraph in the right column — the two-column rhythm used
 * throughout the reference designs.
 */
export function SectionIntro({
  id,
  label,
  title,
  children,
  align = "left",
}: {
  id: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "right";
}) {
  return (
    <div className="grid gap-8 md:grid-cols-12 md:gap-12">
      <Reveal className="md:col-span-4">
        <SectionLabel>{label}</SectionLabel>
      </Reveal>
      {children && (
        <Reveal delay={80} className="md:col-span-8 md:max-w-2xl">
          <div className="text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
            {children}
          </div>
        </Reveal>
      )}
      <Reveal
        delay={140}
        className={cn("md:col-span-12", align === "right" && "flex justify-end")}
      >
        <DisplayHeading id={`${id}-heading`} className="mt-4">
          {title}
        </DisplayHeading>
      </Reveal>
    </div>
  );
}
