"use client";

import { useState } from "react";

import { ArrowUpRightIcon, PlusIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";

/** Already-localized shape: the server picks the language and formats the dates. */
export type ExperienceEntry = {
  id: string;
  company: string;
  role: string;
  /** Compact years for the row header — `2022 - 2024`. */
  range: string;
  /** Full period for the panel — `sept 2022 — feb 2024`. */
  period: string;
  duration: string;
  stack: string[];
  url?: string;
  location?: string;
  summary?: string;
  highlights: string[];
};

type ExperienceListProps = {
  items: ExperienceEntry[];
  labels: {
    expand: string;
    collapse: string;
    highlights: string;
    stack: string;
    location: string;
    period: string;
    visit: string;
  };
};

/**
 * The work table, where every row is a disclosure.
 *
 * One row open at a time: an expanded row becomes the white slab that the
 * closed rows only *preview* on hover, and two of those stacked would fight
 * each other for attention.
 *
 * The panel animates through the `grid-template-rows: 0fr -> 1fr` trick rather
 * than a measured `max-height`, so it costs no layout reads and adapts to any
 * amount of copy. Collapsed content stays in the DOM for the transition, so it
 * is marked `inert` to keep it out of the tab order and the a11y tree.
 */
export function ExperienceList({ items, labels }: ExperienceListProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <ul className="mt-12 border-t border-white/10 sm:mt-16">
      {items.map((item, position) => {
        const open = openId === item.id;
        const panelId = `experience-panel-${item.id}`;
        const triggerId = `experience-trigger-${item.id}`;

        return (
          <Reveal as="li" key={item.id} delay={position * 70}>
            {/*
             * The whole row inverts to a white slab on hover — the signature
             * interaction of the reference design — and stays inverted while it
             * is open. Children opt into the inverted palette through
             * `group-hover:` and `group-data-[open]:`.
             *
             * The corners round only while the slab is filled, so the row reads
             * as a table rule at rest and as a card once it lifts. The rounding
             * rides on the same transition as the colour, and the bottom rule
             * disappears into the white slab anyway, so its curved ends never
             * show.
             */}
            <div
              data-open={open ? "" : undefined}
              className="group border-b border-white/10 transition-[background-color,border-color,border-radius] duration-300 hover:rounded-2xl hover:bg-fg data-[open]:rounded-2xl data-[open]:bg-fg"
            >
              <button
                type="button"
                id={triggerId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId((current) => (current === item.id ? null : item.id))}
                className="relative grid w-full cursor-pointer grid-cols-1 gap-y-2 px-3 py-6 text-left sm:grid-cols-12 sm:items-center sm:gap-x-6 sm:px-6 lg:px-8"
              >
                <div className="sm:col-span-3 lg:col-span-2">
                  <p className="font-mono text-sm text-fg transition-colors duration-300 group-hover:text-ink group-data-[open]:text-ink">
                    {item.range}
                  </p>
                  <p className="font-mono text-xs text-fg-subtle transition-colors duration-300 group-hover:text-ink/60 group-data-[open]:text-ink/60">
                    {item.duration}
                  </p>
                </div>

                <p className="pr-12 text-base text-fg transition-colors duration-300 group-hover:text-ink group-data-[open]:text-ink sm:col-span-4 sm:pr-0 lg:col-span-3">
                  {item.company}
                </p>

                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-fg-muted transition-colors duration-300 group-hover:text-ink/70 group-data-[open]:text-ink/70 sm:col-span-4 lg:col-span-6">
                  <span className="text-fg transition-colors duration-300 group-hover:text-ink group-data-[open]:text-ink">
                    {item.role}
                  </span>
                  <span
                    aria-hidden
                    className="text-fg-subtle group-hover:text-ink/40 group-data-[open]:text-ink/40"
                  >
                    |
                  </span>
                  <span>{item.stack.join(" & ")}</span>
                </p>

                <span
                  aria-hidden
                  className="absolute right-3 top-5 flex size-8 items-center justify-center rounded-full border border-white/15 text-fg transition-[transform,color,border-color] duration-300 group-hover:border-ink/25 group-hover:text-ink group-data-[open]:rotate-45 group-data-[open]:border-ink/25 group-data-[open]:text-ink sm:static sm:col-span-1 sm:justify-self-end"
                >
                  <PlusIcon className="text-base" />
                </span>

                <span className="sr-only">{open ? labels.collapse : labels.expand}</span>
              </button>

              <div
                inert={!open}
                className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[open]:grid-rows-[1fr]"
              >
                <div className="overflow-hidden">
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className="grid gap-8 px-3 pb-8 text-ink sm:grid-cols-12 sm:gap-x-6 sm:px-6 lg:px-8"
                  >
                    {/* Empty cell so the panel lines up with the company column. */}
                    <div aria-hidden className="hidden sm:col-span-3 sm:block lg:col-span-2" />

                    <div className="grid gap-8 sm:col-span-9 lg:col-span-10 lg:grid-cols-12 lg:gap-x-6">
                      <div className="space-y-6 lg:col-span-7">
                        {item.summary && (
                          <p className="max-w-prose text-pretty text-sm leading-relaxed text-ink/70 sm:text-base">
                            {item.summary}
                          </p>
                        )}

                        {item.highlights.length > 0 && (
                          <div className="space-y-3">
                            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/40">
                              {labels.highlights}
                            </p>
                            <ul className="space-y-2">
                              {item.highlights.map((highlight) => (
                                <li
                                  key={highlight}
                                  className="flex gap-3 text-sm leading-relaxed text-ink/70"
                                >
                                  <span
                                    aria-hidden
                                    className="mt-[0.7em] h-px w-4 shrink-0 bg-ink/30"
                                  />
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <dl className="space-y-4 lg:col-span-5">
                        <div className="space-y-1">
                          <dt className="font-mono text-xs uppercase tracking-[0.2em] text-ink/40">
                            {labels.period}
                          </dt>
                          <dd className="font-mono text-sm text-ink/70">{item.period}</dd>
                        </div>

                        {item.location && (
                          <div className="space-y-1">
                            <dt className="font-mono text-xs uppercase tracking-[0.2em] text-ink/40">
                              {labels.location}
                            </dt>
                            <dd className="font-mono text-sm text-ink/70">{item.location}</dd>
                          </div>
                        )}

                        <div className="space-y-2">
                          <dt className="font-mono text-xs uppercase tracking-[0.2em] text-ink/40">
                            {labels.stack}
                          </dt>
                          <dd className="flex flex-wrap gap-2">
                            {item.stack.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-full border border-ink/15 px-3 py-1 font-mono text-xs text-ink/70"
                              >
                                {tech}
                              </span>
                            ))}
                          </dd>
                        </div>
                      </dl>

                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-ink underline-offset-4 hover:underline lg:col-span-12"
                        >
                          {labels.visit}
                          <ArrowUpRightIcon className="text-sm" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
