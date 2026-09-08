import { About } from "@/components/sections/About";
import { Articles } from "@/components/sections/Articles";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { articles } from "@/content/articles";
import { site } from "@/content/site";
import { skillGroups } from "@/content/skills";
import { getDictionary, getLocale } from "@/lib/dictionaries";
import { getSiteUrl } from "@/lib/site-url";

/**
 * Structured data so search engines and AI crawlers read the page as a person
 * rather than as a wall of headings.
 */
function PersonJsonLd({ description }: { description: string }) {
  const url = getSiteUrl();

  const json = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url,
    email: `mailto:${site.email}`,
    description,
    image: `${url}${site.portrait}`,
    sameAs: site.socials
      .filter((social) => !social.href.startsWith("mailto:"))
      .map((social) => social.href),
    knowsAbout: skillGroups.flatMap((group) => group.items),
  };

  return (
    <script
      type="application/ld+json"
      // Content is fully authored in `content/`, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default async function HomePage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  const hasArticles = articles.length > 0;

  return (
    <>
      <Hero dict={dict} locale={locale} />
      <About dict={dict} locale={locale} index={0} />
      <Experience dict={dict} locale={locale} index={1} />
      <Projects dict={dict} locale={locale} index={2} />
      {hasArticles && <Articles dict={dict} locale={locale} index={3} />}
      <Contact dict={dict} locale={locale} index={hasArticles ? 4 : 3} />
      <PersonJsonLd description={dict.meta.description} />
    </>
  );
}
