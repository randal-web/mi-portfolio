import { ArticleCarousel, type CarouselArticle } from "@/components/ui/ArticleCarousel";
import { Reveal } from "@/components/ui/Reveal";
import { DisplayHeading, Section, SectionLabel } from "@/components/ui/Section";
import { articles } from "@/content/articles";
import { formatDate } from "@/lib/date";
import type { Dictionary } from "@/lib/dictionaries";
import { pick, type Locale } from "@/lib/i18n";

export function Articles({
  dict,
  locale,
  index,
}: {
  dict: Dictionary;
  locale: Locale;
  index: number;
}) {
  if (articles.length === 0) return null;

  /*
   * Flatten to the active language on the server so the client bundle never
   * carries translations it will not render.
   */
  const items: CarouselArticle[] = articles.map((article) => ({
    id: article.id,
    title: pick(article.title, locale),
    excerpt: pick(article.excerpt, locale),
    url: article.url,
    publisher: article.publisher,
    date: formatDate(article.date, locale),
    image: article.image,
    tags: article.tags,
  }));

  return (
    <Section id="articles" index={index}>
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <Reveal>
          <SectionLabel>{dict.articles.label}</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <DisplayHeading id="articles-heading">{dict.articles.title}</DisplayHeading>
        </Reveal>
      </div>

      <Reveal delay={120} className="mt-12 sm:mt-16">
        <ArticleCarousel
          articles={items}
          labels={{
            readMore: dict.articles.readMore,
            previous: dict.articles.previous,
            next: dict.articles.next,
            goTo: dict.articles.goTo,
            external: dict.articles.external,
          }}
        />
      </Reveal>
    </Section>
  );
}
