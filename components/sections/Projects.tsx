import { ArrowUpRightIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectShowcase } from "@/components/ui/ProjectShowcase";
import { Reveal } from "@/components/ui/Reveal";
import { DisplayHeading, Section, SectionLabel } from "@/components/ui/Section";
import { TechList } from "@/components/ui/TechList";
import { projects } from "@/content/projects";
import type { Dictionary } from "@/lib/dictionaries";
import { pick, type Locale } from "@/lib/i18n";

export function Projects({
  dict,
  locale,
  index,
}: {
  dict: Dictionary;
  locale: Locale;
  index: number;
}) {
  return (
    <Section id="projects" index={index}>
      <div className="flex flex-col gap-6 text-center">
        <Reveal>
          <SectionLabel className="text-center">{dict.projects.label}</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <DisplayHeading id="projects-heading">{dict.projects.title}</DisplayHeading>
        </Reveal>
      </div>

      <div className="mt-20 space-y-28 sm:mt-24 lg:space-y-40">
        {projects.map((project, position) => (
          <article key={project.slug} className="group">
            <Reveal>
              <ProjectShowcase
                images={project.images}
                alt={`${project.name} — ${dict.projects.screenshotAlt}`}
                priority={position === 0}
                labels={{
                  view: dict.projects.viewImage,
                  gallery: `${project.name} — ${dict.projects.gallery}`,
                  close: dict.projects.closeGallery,
                  previous: dict.projects.previousImage,
                  next: dict.projects.nextImage,
                }}
              />
            </Reveal>

            <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-5 text-center sm:mt-12">
              <Reveal delay={60}>
                <p className="font-mono text-xs tracking-[0.2em] text-fg-subtle">
                  {project.year} · {pick(project.tagline, locale)}
                </p>
              </Reveal>

              <Reveal delay={100}>
                <h3 className="font-mono text-4xl font-extrabold uppercase leading-none tracking-tighter text-fg sm:text-6xl">
                  {project.name}
                </h3>
              </Reveal>

              <Reveal delay={140}>
                <p className="text-pretty text-base leading-relaxed text-fg-muted">
                  {pick(project.description, locale)}
                </p>
              </Reveal>

              <Reveal delay={180}>
                <TechList items={project.stack} className="justify-center text-xs" />
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                  {project.liveUrl && (
                    <ButtonLink
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      variant="outline"
                      size="md"
                      className="uppercase tracking-widest"
                    >
                      {dict.projects.viewProject}
                      <ArrowUpRightIcon />
                    </ButtonLink>
                  )}
                  {project.repoUrl && (
                    <ButtonLink
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      variant="ghost"
                      size="md"
                      className="uppercase tracking-widest"
                    >
                      {dict.projects.sourceCode}
                    </ButtonLink>
                  )}
                </div>
              </Reveal>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
