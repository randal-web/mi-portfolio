import { ArrowRightIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ResumeLink } from "@/components/ui/ResumeLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Section";
import { SocialPills } from "@/components/ui/SocialLinks";
import { site } from "@/content/site";
import type { Dictionary } from "@/lib/dictionaries";
import { pick, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Grid, glow, arcs and grain — everything behind the headline. */
function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,#000_10%,transparent_75%)]" />
      <div className="absolute left-1/2 top-[-18%] h-[560px] w-[min(1100px,120vw)] -translate-x-1/2 rounded-[50%] bg-white/[0.055] blur-[130px]" />
      <div className="absolute -right-40 top-10 size-[620px] rounded-full border border-white/[0.06]" />
      <div className="absolute -left-56 bottom-[-14rem] size-[540px] rounded-full border border-white/[0.05]" />
      <div className="absolute inset-0 bg-noise opacity-[0.12] mix-blend-overlay" />
    </div>
  );
}

/** Both halves of the hero headline share exactly one type scale. */
function headlineClasses(placement: string) {
  return cn(
    "block font-mono text-[clamp(2.5rem,8vw,7rem)] font-extrabold leading-[0.88] tracking-tighter text-fg",
    placement,
  );
}

function AvailabilityBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 font-mono text-xs text-fg-muted">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70 motion-reduce:hidden" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
      </span>
      {label}
    </span>
  );
}

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [lineOne, lineTwo] = pick(site.headline, locale);
  const resume = site.resume && pick(site.resume, locale);

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh flex-col justify-center pb-20 pt-32 sm:pt-36"
    >
      <HeroBackdrop />

      <Container>
        <Reveal>
          <SectionLabel>{dict.hero.label}</SectionLabel>
        </Reveal>

        {/*
         * `display: contents` lets the two halves of the headline sit in
         * different grid cells (left/right, as in the mockup) while staying a
         * single <h1> in the accessibility tree.
         *
         * The CTA only moves up beside the first line at `xl`. Below that it
         * stacks, which keeps long localized words (Spanish "Desarrollador" is
         * half again as wide as "Full-stack") from colliding with the button.
         */}
        <div className="mt-8 grid grid-cols-1 items-center gap-x-10 gap-y-6 sm:mt-10 xl:grid-cols-12">
          <h1 id="hero-heading" className="contents">
            <Reveal
              as="span"
              delay={60}
              className={headlineClasses("xl:col-span-9 xl:col-start-1 xl:row-start-1")}
            >
              {lineOne}
            </Reveal>
            <Reveal
              as="span"
              delay={180}
              className={headlineClasses(
                "xl:col-span-9 xl:col-start-4 xl:row-start-2 xl:text-right",
              )}
            >
              {lineTwo}
            </Reveal>
          </h1>

          <Reveal
            delay={240}
            className="max-w-md text-pretty text-base leading-relaxed text-fg-muted sm:text-lg xl:col-span-4 xl:col-start-1 xl:row-start-3 xl:self-start"
          >
            <p>{pick(site.tagline, locale)}</p>
          </Reveal>

          <Reveal
            delay={120}
            className="xl:col-span-3 xl:col-start-10 xl:row-start-1 xl:justify-self-end"
          >
            <div className="flex items-center gap-3">
              <ButtonLink href="#projects" size="lg" className="min-w-40 sm:min-w-48">
                {dict.hero.cta}
              </ButtonLink>
              <span
                aria-hidden
                className="inline-flex size-14 shrink-0 items-center justify-center rounded-full border border-white/15 text-lg text-fg"
              >
                <ArrowRightIcon />
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={320} className="mt-14 sm:mt-20">
          <div className="flex flex-col items-start gap-6">
            {/*
             * The badge and the CV share a row: both are "who I am right now"
             * facts, and pairing them keeps the download in the first screen
             * without crowding the headline CTA.
             */}
            <div className="flex flex-wrap items-center gap-3">
              <AvailabilityBadge
                label={site.available ? dict.hero.available : dict.hero.unavailable}
              />
              {resume && (
                <ResumeLink {...resume} label={dict.resume.download} size="sm" />
              )}
            </div>
            <nav aria-label={dict.hero.socials}>
              <SocialPills />
            </nav>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
