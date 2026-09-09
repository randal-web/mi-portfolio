import type { Localized } from "@/lib/i18n";

/* ------------------------------------------------------------------ *
 *  ✏️  EDITA ESTE ARCHIVO — es tu identidad en todo el sitio.
 *      Nada de esto está hardcodeado en los componentes.
 * ------------------------------------------------------------------ */

export type SocialId = "github" | "linkedin" | "x" | "telegram" | "email";

export type Social = {
  id: SocialId;
  label: string;
  href: string;
};

export type Resume = {
  /** Ruta del archivo dentro de `/public`. */
  href: string;
  /** Nombre con el que el navegador guarda la descarga. */
  filename: string;
};

/**
 * CV descargable, uno por idioma.
 *
 * Deja los archivos en `public/cv/` con estos nombres (o cambia las rutas).
 * Si solo tienes un CV, apunta ambos idiomas al mismo archivo.
 * Ponlo en `null` para ocultar el botón de descarga en todo el sitio.
 */
const resume: Localized<Resume> | null = {
  es: { href: "/cv/randal-cv-es.pdf", filename: "Randal-CV-ES.pdf" },
  en: { href: "/cv/randal-cv-en.pdf", filename: "Randal-CV-EN.pdf" },
};

export const site = {
  /** Se parte por espacios para el logo de dos líneas del header. */
  name: "Randal",

  /** Fallback del logo y del favicon generado. */
  initials: "RW",

  /**
   * Titular gigante del hero, en dos líneas.
   * Mantén las palabras cortas: se renderizan enormes.
   */
  headline: {
    es: ["Desarrollador", "Full-stack"],
    en: ["Full-stack", "Developer"],
  } satisfies Localized<[string, string]>,

  /** Párrafo corto bajo el titular. */
  tagline: {
    es: "Mi compromiso es escribir código de calidad —limpio, mantenible y bien estructurado— que permita construir productos confiables y fáciles de evolucionar en el tiempo.",
    en: "My commitment is to write quality code — clean, maintainable, and well-structured — that enables building reliable products that are easy to evolve over time.",
  } satisfies Localized<string>,

  /** Párrafos de la sección «Sobre mí». */
  bio: {
    es: [
      "Construyo productos web de punta a punta: desde la base de datos y la API hasta la interfaz que la gente termina usando.",
      "Me importa especialmente el rendimiento, la accesibilidad y dejar una base de código que el siguiente equipo pueda entender sin manual de instrucciones.",
    ],
    en: [
      "I build end-to-end web products: from the database and API to the interface people end up using.",
      "I care most about performance, accessibility, and leaving behind a codebase that the next team can understand without instructions.",
    ],
  } satisfies Localized<string[]>,

  location: {
    es: "México · Remoto",
    en: "México · Remote",
  } satisfies Localized<string>,

  email: "randal.rmz@outlook.com",

  /** Controla el badge de disponibilidad del hero y del contacto. */
  available: true,

  /** Retrato de la sección «Sobre mí». Sustituye por tu foto en /public. */
  portrait: "/images/portrait.svg",

  /** Ver el bloque `resume` de arriba. */
  resume,

  /**
   * URL canónica en producción. Se usa para metadataBase, sitemap, OG y
   * hreflang. En Vercel se autodetecta con VERCEL_PROJECT_PRODUCTION_URL,
   * así que esto es solo el fallback local.
   */
  url: "https://randal-web.vercel.app",

  socials: [
    { id: "github", label: "GitHub", href: "https://github.com/randal-web" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/randaledin" },
    { id: "email", label: "E-mail", href: "mailto:randal.rmz@outlook.com" },
  ] satisfies Social[],
};

export type Site = typeof site;
