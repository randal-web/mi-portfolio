import { ExperienceList, type ExperienceEntry } from "@/components/ui/ExperienceList";
import { Reveal } from "@/components/ui/Reveal";
import { DisplayHeading, Section, SectionLabel } from "@/components/ui/Section";
import { experiences } from "@/content/experience";
import { formatDuration, formatMonthRange, formatYearRange, monthsBetween } from "@/lib/date";
import type { Dictionary } from "@/lib/dictionaries";
import { pick, type Locale } from "@/lib/i18n";

export function Experience({
  dict,
  locale,
  index,
}: {
  dict: Dictionary;
  locale: Locale;
  index: number;
}) {
  const totalMonths = experiences.reduce(
    (sum, item) => sum + monthsBetween(item.start, item.end),
    0,
  );

  /*
   * Everything the rows need is localized and formatted here, on the server:
   * the list only has to own which row is open, so it never sees a dictionary
   * or an `Intl` formatter.
   */
  const items: ExperienceEntry[] = experiences.map((item) => {
    const range = formatYearRange(item.start, item.end);

    return {
      id: item.id,
      company: item.company,
      role: pick(item.role, locale),
      range: item.end ? range : `${range} ${dict.experience.present}`,
      period: formatMonthRange(item.start, item.end, locale, dict.experience.present),
      duration: formatDuration(monthsBetween(item.start, item.end), dict.duration),
      stack: item.stack,
      url: item.url,
      location: item.location && pick(item.location, locale),
      summary: item.summary && pick(item.summary, locale),
      highlights: item.highlights ? pick(item.highlights, locale) : [],
    };
  });

  return (
    <Section id="experience" index={index}>
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <Reveal>
          <SectionLabel>{dict.experience.label}</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <DisplayHeading id="experience-heading">{dict.experience.title}</DisplayHeading>
        </Reveal>
      </div>

      <ExperienceList
        items={items}
        labels={{
          expand: dict.experience.expand,
          collapse: dict.experience.collapse,
          highlights: dict.experience.highlights,
          stack: dict.experience.stack,
          location: dict.experience.location,
          period: dict.experience.period,
          visit: dict.experience.visit,
        }}
      />

      <Reveal delay={120}>
        <p className="mt-8 text-right font-mono text-sm text-fg-subtle">
          {dict.experience.totalLabel}
          <br />
          <span className="text-fg-muted">{formatDuration(totalMonths, dict.duration)}</span>
        </p>
      </Reveal>
    </Section>
  );
}
