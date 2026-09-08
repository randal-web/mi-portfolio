import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionLabel } from "@/components/ui/Section";
import { TechList } from "@/components/ui/TechList";
import { experiences } from "@/content/experience";
import { site } from "@/content/site";
import { skillGroups } from "@/content/skills";
import { monthsBetween } from "@/lib/date";
import type { Dictionary } from "@/lib/dictionaries";
import { pick, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Total years across every role, so the headline number can never drift out of
 * sync with `content/experience.ts`. Overlapping roles are intentionally not
 * de-duplicated — this is a rounded-down "more than N years" claim.
 */
function totalYears() {
  const months = experiences.reduce(
    (sum, item) => sum + monthsBetween(item.start, item.end),
    0,
  );
  return Math.max(1, Math.floor(months / 12));
}

/** Staggered widths reproduce the offset mosaic from the reference design. */
const mosaic: Record<"wide" | "narrow", string> = {
  wide: "w-full",
  narrow: "w-full sm:w-[76%]",
};

export function About({
  dict,
  locale,
  index,
}: {
  dict: Dictionary;
  locale: Locale;
  index: number;
}) {
  const years = totalYears();

  return (
    <Section id="about" index={index}>
      <div className="grid gap-8 md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-4">
          <SectionLabel>{dict.about.label}</SectionLabel>
        </Reveal>

        <Reveal delay={80} className="md:col-span-8 md:max-w-2xl">
          <h2 id="about-heading" className="text-pretty text-xl leading-snug sm:text-2xl">
            {dict.about.greeting} <span className="font-medium text-fg">{site.name}</span>,{" "}
            {dict.about.connector}{" "}
            <em className="not-italic font-medium text-fg">{dict.meta.tagline}</em>.
            <br />
            <span className="text-fg-muted">
              {dict.about.experience.replace("{years}", String(years))}
            </span>
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-fg-muted">
            {pick(site.bio, locale).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </div>

      {/*
       * Same 4/8 split as the block above, so the section keeps one rhythm all
       * the way down: a quiet caption in the left margin, content on the right.
       * The mosaic stays in eight columns — at full width its offset cards
       * stretch into bands and the zig-zag stops reading.
       */}
      <div className="mt-16 grid gap-8 md:grid-cols-12 md:gap-12 lg:mt-24">
        <Reveal className="md:col-span-4">
          <p className="max-w-xs text-sm leading-relaxed text-fg-subtle md:sticky md:top-28">
            {dict.about.favTech}
          </p>
        </Reveal>

        <div className="md:col-span-8">
          <ul className="flex flex-col gap-4 sm:gap-5">
            {skillGroups.map((group, position) => (
              <li
                key={group.id}
                className={cn(
                  "flex",
                  // Alternate the indent so narrow cards zig-zag like the mockup.
                  group.span === "narrow" && position % 2 === 1 && "sm:justify-end",
                )}
              >
                <Reveal delay={position * 90} className={mosaic[group.span]}>
                  <Card className="h-full p-6 sm:p-7">
                    <h3 className="text-lg font-medium text-fg">{pick(group.title, locale)}</h3>
                    <TechList items={group.items} className="mt-4" />
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
