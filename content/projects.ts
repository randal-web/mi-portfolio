import type { Localized } from "@/lib/i18n";

/* ------------------------------------------------------------------ *
 *  ✏️  Tus proyectos. `images` admite 1–3 capturas: se apilan en
 *      perspectiva como en el mockup (la del centro es la principal).
 *      Sustituye los SVG de /public/images por capturas reales.
 * ------------------------------------------------------------------ */

export type Project = {
  slug: string;
  name: string;
  year: number;
  tagline: Localized<string>;
  description: Localized<string>;
  stack: string[];
  images: string[];
  liveUrl?: string;
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "prolimk",
    name: "Prolimk",
    year: 2024,
    tagline: {
      es: "E-commerce de productos veterinarios para mascotas y clinicas.",
      en: "E-commerce for veterinary products and pet supplies",
    },
    description: {
      es: "Landing y e-commerce de productos veterinarios para mascotas y clinicas, con gestión de inventario, catálogo, carrito de compras, pasarela de pagos con Stripe, autenticación de usuarios y panel de administración.",
      en: "Landing and e-commerce page for veterinary products and pet supplies, with inventory management, catalog, shopping cart, Stripe payment gateway, user authentication, and admin panel.",
    },
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Spring Boot", "Tailwind CSS", "Railway"],
    images: ["/images/project-1-a.webp", "/images/project-1-b.webp", "/images/project-1-c.webp"],
    liveUrl: "https://prolimk.com.mx/",
  },
];
