import type { Localized } from "@/lib/i18n";

/* ------------------------------------------------------------------ *
 *  ✏️  Tu trayectoria. Ordénala de más reciente a más antigua.
 *      Fechas en formato `YYYY-MM`; `end: null` significa "actualidad".
 *      La duración total se calcula sola, no la escribas a mano.
 *
 *      `summary` y `highlights` son el detalle que se despliega al
 *      abrir la fila: un párrafo de contexto y 3-4 logros concretos.
 *      Ambos son opcionales — sin ellos la fila sigue desplegando el
 *      periodo completo, la ubicación y el stack.
 * ------------------------------------------------------------------ */

export type Experience = {
  id: string;
  company: string;
  role: Localized<string>;
  /** Se muestra a la derecha de la fila, separado por barras. */
  stack: string[];
  start: string;
  end: string | null;
  url?: string;
  /** Ciudad o modalidad — "Remoto", "Madrid (híbrido)"... */
  location?: Localized<string>;
  /** Párrafo de contexto dentro del panel desplegable. */
  summary?: Localized<string>;
  /**
   * Logros concretos, en viñetas: 3-4 por puesto, nunca más. Esto es el
   * portfolio, no el CV — quien quiera el detalle completo tiene el CV.
   * Cada viñeta dice qué hice, con qué y por qué importó, en ese orden,
   * y van de mayor a menor impacto.
   */
  highlights?: Localized<string[]>;
};

export const experiences: Experience[] = [
  {
    id: "trabajo_3",
    company: "Vorecol - Psicosmart",
    role: { es: "Desarrollador Web Jr", en: "Junior Web Developer" },
    stack: ["PHP", "JavaScript", "jQuery", "Bootstrap"],
    start: "2024-12",
    end: null,
    location: { es: "Remoto", en: "Remote" },
    summary: {
      es: "Desarrollo y optimizo sitios web enfocados en marketing y captación de clientes, cuidando tanto el SEO como el diseño UI/UX para mejorar su posicionamiento en buscadores. También trabajo sobre código legacy en PHP y JavaScript, integrando APIs internas y reforzando la calidad del producto con pruebas de testing.",
      en: "Development and optimization of websites focused on marketing and lead generation, paying attention to both SEO and UI/UX design to improve their search engine positioning. I also work on legacy code in PHP and JavaScript, integrating internal APIs and reinforcing product quality with testing.",
    },
    highlights: {
      es: [
        "Diseño y desarrollo de punta a punta los sitios de marketing de la empresa —diseño UI/UX, maquetado y formularios de captación— con PHP, JavaScript, jQuery y Bootstrap.",
        "Los posicioné en las primeras páginas de resultados de búsqueda trabajando el SEO de cada página: estructura, contenido, metadatos y rendimiento.",
        "Reduje un 20% el tiempo de carga aplicando técnicas de optimización, una mejora que pesa directamente en el posicionamiento y en la conversión de las landings.",
        "Refactorizo el código legacy en PHP y JavaScript que gestiona los formularios y respaldo los cambios con pruebas, para poder evolucionar una base heredada sin romper lo que ya funciona.",
      ],
      en: [
        "I design and build the company's marketing sites end to end —UI/UX design, markup and lead-capture forms— with PHP, JavaScript, jQuery and Bootstrap.",
        "Took them to the first pages of search results by working the SEO of every page: structure, content, metadata and performance.",
        "Cut load time by 20% with optimization techniques, a gain that weighs directly on ranking and on landing page conversion.",
        "I refactor the legacy PHP and JavaScript behind the forms and back every change with tests, so an inherited codebase can evolve without breaking what already works.",
      ],
    },
  },
  {
    id: "trabajo_2",
    company: "Mondasi",
    role: { es: "Desarrollador Web Interno", en: "Intern Web Developer" },
    stack: ["NextJS", "Supabase", "Tailwind CSS", "Google Cloud"],
    start: "2024-06",
    end: "2024-09",
    location: { es: "Remoto", en: "Remote" },
    summary: {
      es: "Trabajé como Desarrollador de Software Intern construyendo el sitio web corporativo de la empresa desde cero y sentando las bases de su infraestructura de datos, cubriendo frontend, backend e infraestructura en un solo rol.",
      en: "I worked as an Intern Software Developer building the company's corporate website from scratch and laying the groundwork for its data infrastructure, covering frontend, backend, and infrastructure in a single role.",
    },
    highlights: {
      es: [
        "Asumí frontend, backend e infraestructura en un mismo rol, llevando el sitio corporativo desde la primera línea de código hasta el despliegue.",
        "Lo construí desde cero con Next.js y Tailwind CSS, conectándolo con el backend en Node.js mediante APIs RESTful.",
        "Diseñé el modelo relacional en PostgreSQL y lo desplegué en Google Cloud: la primera infraestructura de datos formal de la empresa, sobre la que se apoyó el resto del proyecto.",
      ],
      en: [
        "Owned frontend, backend and infrastructure in a single role, taking the corporate site from the first line of code to deployment.",
        "Built it from scratch with Next.js and Tailwind CSS, wiring it to the Node.js backend through RESTful APIs.",
        "Designed the relational model in PostgreSQL and deployed it on Google Cloud: the company's first formal data infrastructure, which the rest of the project relied on.",
      ],
    },
  },
  {
    id: "trabajo_1",
    company: "Prolimk",
    role: { es: "Desarrollador Web Jr", en: "Junior Web Developer" },
    stack: ["NextJS", "Java", "Spring Boot", "PostgreSQL", "Tailwind CSS", "Railway", "TypeScript"],
    start: "2023-01",
    end: "2024-06",
    location: { es: "Presencial", en: "On-site" },
    summary: {
      es: "Desarrollé el sitio web de Prolimk, que funciona también como tienda en línea, con un sistema que diferencia entre clientes y veterinarias. Construí un checkout completo con Stripe, seguimiento de órdenes y envíos automatizados por paquetería, además de trabajar el SEO y la experiencia de usuario de todo el sitio.",
      en: "I developed Prolimk's website, which also functions as an online store, with a system that differentiates between clients and veterinarians. I built a complete checkout with Stripe, order tracking, and automated shipping by courier, in addition to working on the SEO and user experience of the entire site.",
    },
    highlights: {
      es: [
        "Desarrollé el sitio y la tienda en línea de la empresa con Next.js y TypeScript, con un sistema de cuentas que diferencia a clientes particulares de veterinarias.",
        "Implementé el flujo de compra completo: checkout con Stripe, seguimiento de la orden en tiempo real y la API de envia.com para calcular tarifas y gestionar los envíos por paquetería.",
        "Construí el backend en Java con Spring Boot sobre una base de datos PostgreSQL desplegada en Railway, exponiendo la API que consume el frontend.",
        "Desarrollé el panel de administración en Next.js para gestionar toda la tienda, con un sistema de roles y permisos en Spring Security que define qué puede ver y hacer cada tipo de usuario.",
      ],
      en: [
        "Built the company's website and online store with Next.js and TypeScript, with an account system that tells regular customers apart from veterinary clinics.",
        "Implemented the full purchase flow: Stripe checkout, real-time order tracking and the envia.com API to calculate rates and handle courier shipping.",
        "Built the backend in Java with Spring Boot on a PostgreSQL database deployed on Railway, exposing the API the frontend consumes.",
        "Developed the Next.js admin dashboard to manage the whole store, with a roles and permissions system in Spring Security that defines what each type of user can see and do.",
      ],
    },
  },
];
