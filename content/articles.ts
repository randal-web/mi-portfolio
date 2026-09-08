import type { Localized } from "@/lib/i18n";

/* ------------------------------------------------------------------ *
 *  ✏️  Artículos publicados fuera (Medium, dev.to, LinkedIn…).
 *      Cada card enlaza directamente al post original.
 *      Si dejas el array vacío, la sección desaparece del home y del nav.
 *
 *      Ahora mismo está vacío a propósito: la sección de artículos está
 *      oculta. Para volver a mostrarla, mueve a `articles` las entradas
 *      que quieras de `sampleArticles` (más abajo).
 * ------------------------------------------------------------------ */

export type Article = {
  id: string;
  title: Localized<string>;
  excerpt: Localized<string>;
  url: string;
  publisher: string;
  /** ISO date, `YYYY-MM-DD`. */
  date: string;
  image: string;
  tags: string[];
};

/** Vacío = sección oculta. Ver la nota de arriba. */
export const articles: Article[] = [];

/**
 * Los ejemplos de la plantilla, aparcados aquí para no perderlos: sirven de
 * modelo del formato cuando publiques algo real. No se renderizan — nadie
 * importa esta constante.
 */
export const sampleArticles: Article[] = [
  {
    id: "server-components",
    title: {
      es: "Server Components sin misticismo",
      en: "Server Components without the mysticism",
    },
    excerpt: {
      es: "Qué se ejecuta dónde, por qué el bundle se encoge y cuándo sigue mereciendo la pena un componente de cliente.",
      en: "What runs where, why the bundle shrinks, and when a client component is still the right call.",
    },
    url: "https://example.com/articles/server-components",
    publisher: "Medium",
    date: "2025-11-18",
    image: "/images/article-1.svg",
    tags: ["React", "Next.js"],
  },
  {
    id: "postgres-indexes",
    title: {
      es: "Índices de Postgres que sí usas",
      en: "The Postgres indexes you actually use",
    },
    excerpt: {
      es: "Un recorrido práctico por B-tree, GIN y los índices parciales, con los EXPLAIN que lo demuestran.",
      en: "A practical tour of B-tree, GIN and partial indexes, with the EXPLAIN output to back it up.",
    },
    url: "https://example.com/articles/postgres-indexes",
    publisher: "dev.to",
    date: "2025-09-02",
    image: "/images/article-2.svg",
    tags: ["PostgreSQL", "Performance"],
  },
  {
    id: "design-tokens",
    title: {
      es: "Design tokens con Tailwind v4",
      en: "Design tokens with Tailwind v4",
    },
    excerpt: {
      es: "Cómo pasar de una hoja de estilos improvisada a un sistema con una sola fuente de verdad en CSS.",
      en: "How to move from an improvised stylesheet to a system with a single source of truth in CSS.",
    },
    url: "https://example.com/articles/design-tokens",
    publisher: "LinkedIn",
    date: "2025-06-24",
    image: "/images/article-3.svg",
    tags: ["CSS", "Design Systems"],
  },
  {
    id: "ci-pipelines",
    title: {
      es: "Pipelines de CI que no dan miedo",
      en: "CI pipelines that don't scare you",
    },
    excerpt: {
      es: "Cachés, jobs en paralelo y previews por PR: cómo bajar un pipeline de doce minutos a menos de tres.",
      en: "Caches, parallel jobs and per-PR previews: taking a twelve-minute pipeline down to under three.",
    },
    url: "https://example.com/articles/ci-pipelines",
    publisher: "dev.to",
    date: "2025-03-11",
    image: "/images/article-4.svg",
    tags: ["DevOps", "CI/CD"],
  },
];
