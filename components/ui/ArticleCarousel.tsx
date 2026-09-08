"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";
import { IconButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/** Already-localized shape: the server picks the language, the client stays lean. */
export type CarouselArticle = {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  publisher: string;
  date: string;
  image: string;
  tags: string[];
};

type ArticleCarouselProps = {
  articles: CarouselArticle[];
  labels: {
    readMore: string;
    previous: string;
    next: string;
    goTo: string;
    external: string;
  };
};

/**
 * Peeking carousel built on native scroll-snap.
 *
 * Scrolling, touch and trackpad gestures are handled by the browser; the arrows
 * only nudge `scrollLeft`, and an IntersectionObserver scoped to the scroller
 * tracks which card is centred so the inactive ones can recede.
 */
export function ArticleCarousel({ articles, labels }: ArticleCarouselProps) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  /*
   * The centred card is derived straight from `scrollLeft` rather than from an
   * IntersectionObserver. An observer only reports the children whose
   * visibility *changed*, so a callback can easily arrive without the card that
   * actually sits in the middle — which left the wrong card highlighted.
   * Measuring distance to the scrollport centre is deterministic and needs no
   * threshold tuning.
   */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const centre = scroller.scrollLeft + scroller.clientWidth / 2;

      let closest = 0;
      let smallest = Number.POSITIVE_INFINITY;

      Array.from(scroller.children).forEach((child, index) => {
        const card = child as HTMLElement;
        const distance = Math.abs(card.offsetLeft + card.clientWidth / 2 - centre);
        if (distance < smallest) {
          smallest = distance;
          closest = index;
        }
      });

      setActive(closest);
    };

    /* Coalesce the scroll stream into one measurement per frame. */
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    schedule();
    scroller.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [articles.length]);

  /** Centre a card without letting the browser scroll the page vertically. */
  const goTo = useCallback((index: number) => {
    const scroller = scrollerRef.current;
    const card = scroller?.children[index] as HTMLElement | undefined;
    if (!scroller || !card) return;

    scroller.scrollTo({
      left: card.offsetLeft - (scroller.clientWidth - card.clientWidth) / 2,
      behavior: "smooth",
    });
  }, []);

  const atStart = active === 0;
  const atEnd = active === articles.length - 1;

  return (
    <div className="relative">
      <ul
        ref={scrollerRef}
        /*
         * Card widths are absolute (rem), never percentages: a percentage would
         * resolve against this element's *content* box, which the centring
         * padding below shrinks — so the cards would collapse as the padding
         * grew. With a fixed card width the padding is simply "half the track
         * minus half a card", and the first and last cards can reach the centre.
         */
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-[max(0rem,calc(50%-16rem))]"
      >
        {articles.map((article, index) => {
          const isActive = index === active;

          return (
            <li
              key={article.id}
              data-index={index}
              className={cn(
                "w-[min(85vw,26rem)] shrink-0 snap-center sm:w-[24rem] lg:w-[32rem]",
                "transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
                isActive ? "opacity-100" : "opacity-40 lg:scale-[0.94]",
              )}
            >
              <article
                className={cn(
                  "group flex h-full overflow-hidden rounded-card border transition-colors duration-500",
                  isActive ? "border-white/20 bg-surface-2" : "border-white/10 bg-surface/60",
                )}
              >
                <div className="relative hidden w-2/5 shrink-0 sm:block">
                  <Image
                    src={article.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 18vw, 27vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-3 p-6 sm:p-7">
                  <p className="font-mono text-[0.7rem] tracking-[0.15em] text-fg-subtle">
                    {article.publisher} &middot; {article.date}
                  </p>

                  <h3 className="text-pretty text-lg font-semibold leading-snug text-fg sm:text-xl">
                    {article.title}
                  </h3>

                  <p className="line-clamp-3 text-sm leading-relaxed text-fg-muted">
                    {article.excerpt}
                  </p>

                  <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                    {article.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[0.65rem] text-fg-subtle"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    tabIndex={isActive ? undefined : -1}
                    className={cn(
                      "mt-3 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs",
                      "transition-colors duration-300",
                      isActive
                        ? "bg-fg text-ink hover:bg-white/85"
                        : "border border-white/15 text-fg-muted",
                    )}
                  >
                    {labels.readMore}
                    <ArrowUpRightIcon />
                    <span className="sr-only">({labels.external})</span>
                  </a>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <IconButton
            type="button"
            aria-label={labels.previous}
            disabled={atStart}
            onClick={() => goTo(Math.max(0, active - 1))}
          >
            <ArrowLeftIcon />
          </IconButton>
          <IconButton
            type="button"
            aria-label={labels.next}
            disabled={atEnd}
            onClick={() => goTo(Math.min(articles.length - 1, active + 1))}
          >
            <ArrowRightIcon />
          </IconButton>
        </div>

        <ol className="flex items-center gap-2">
          {articles.map((article, index) => (
            <li key={article.id}>
              <button
                type="button"
                onClick={() => goTo(index)}
                aria-label={`${labels.goTo}: ${article.title}`}
                aria-current={index === active ? "true" : undefined}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  index === active ? "w-8 bg-fg" : "w-4 bg-white/20 hover:bg-white/40",
                )}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
