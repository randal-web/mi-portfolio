import type { Localized } from "@/lib/i18n";

/* ------------------------------------------------------------------ *
 *  ✏️  Tu trayectoria. Ordénala de más reciente a más antigua.
 *      Fechas en formato `YYYY-MM`; `end: null` significa "actualidad".
 *      La duración total se calcula sola, no la escribas a mano.
 *
 *      `summary` y `highlights` son el detalle que se despliega al
 *      abrir la fila: un párrafo de contexto y 3-5 logros concretos.
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
  /** Logros concretos, en viñetas. Mejor pocos y medibles. */
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
        "Diseñé y desarrollé sitios web de marketing enfocados en captación de clientes, aplicando buenas prácticas de UI/UX.",
        "Mejoré el SEO de estos sitios hasta posicionarlos en las primeras páginas de resultados de búsqueda.",
        "Refactoricé código legacy en PHP y JavaScript para el manejo de formularios, mejorando su mantenibilidad.",
        "Integré APIs internas para el consumo de información de otras áreas del negocio, más allá del manejo de formularios.",
        "Implementé pruebas de testing para validar el funcionamiento del código.",
        "Mejoré la velocidad de carga de los sitios un 20%, implementando técnicas de optimización.",
      ],
      en: [
        "Designed and developed marketing websites focused on customer acquisition, applying UI/UX best practices.",
        "Improved the SEO of these sites to rank on the first pages of search results.",
        "Refactored legacy PHP and JavaScript code for form handling, improving maintainability.",
        "Integrated internal APIs to consume data from other business units beyond form handling.",
        "Implemented testing suites to validate code functionality.",
        "Improved the loading speed of the sites by 20%, implementing optimization techniques."
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
        "Diseñé y desarrollé el sitio web corporativo desde cero con Next.js.",
        "Integré el frontend en React con el backend en Node.js mediante APIs RESTful, garantizando consistencia en el flujo de datos.",
        "Diseñé e implementé la base de datos relacional en PostgreSQL y la desplegué en Google Cloud, sentando las bases de la infraestructura de datos de la empresa.",
      ],
      en: [
        "Designed and developed the corporate website from scratch using Next.js.",
        "Integrated the React frontend with the Node.js backend through RESTful APIs, ensuring data flow consistency.",
        "Designed and implemented the relational PostgreSQL database and deployed it on Google Cloud, establishing the foundation of the company's data infrastructure.",
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
        "Desarrollé el sitio web y tienda en línea de la empresa con Next.js, con un sistema que diferencia entre clientes y veterinari@s.",
        "Implementé un checkout completo con Stripe, pasarelas de pago y seguimiento de órdenes en tiempo real.",
        "Integré la API de envia.com para automatizar el cálculo y gestión de envíos por paquetería.",
        "Construí el backend con Spring Boot y una base de datos en PostgreSQL alojada en Railway.",
        "Para el panel desarrollé un sistema de roles y permisos con Spring Security que diferencia entre diferentes usuarios para la administración de la tienda",
        "Desarrollé el panel de administración (Next.js) para la gestión completa del sitio.",
        "Apliqué buenas prácticas de SEO y UX en todo el desarrollo.",
      ],
      en: [
        "Developed the company's website and e-commerce store with Next.js, featuring a system that differentiates between regular customers and veterinarians.",
        "Implemented a complete checkout flow with Stripe, payment gateways, and real-time order tracking.",
        "Integrated the envia.com API to automate courier shipping calculations and management.",
        "Built the backend using Spring Boot with a PostgreSQL database hosted on Railway.",
        "For the admin panel I developed a roles and permissions system with Spring Security that differentiates between different users and permissions for the store management.",
        "Developed the administration dashboard (Next.js) for full site management.",
        "Applied SEO and UX best practices across the entire development cycle.",
      ],
    },
  },
];
