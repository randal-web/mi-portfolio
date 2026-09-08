import type { Localized } from "@/lib/i18n";

/* ------------------------------------------------------------------ *
 *  ✏️  Tus áreas técnicas. El orden aquí es el orden en pantalla.
 *      `span` controla el ancho de la tarjeta en el mosaico escalonado
 *      (como en el mockup): "wide" ocupa la fila entera, "narrow" no.
 * ------------------------------------------------------------------ */

export type SkillGroup = {
  id: string;
  title: Localized<string>;
  items: string[];
  span: "wide" | "narrow";
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: { es: "Front-end", en: "Front-end" },
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Vite",
      "JavaScript",
      "jQuery",
    ],
    span: "wide",
  },
  {
    id: "styles",
    title: { es: "Estilos", en: "Styles" },
    items: ["Tailwind CSS", "CSS Modules", "ShadCN", "Framer Motion", "GSAP"],
    span: "narrow",
  },
  {
    id: "backend",
    title: { es: "Back-end", en: "Back-end" },
    items: [
      "Node.js",
      "ExpressJS",
      "PostgreSQL",
      "Prisma",
      "REST",
      "WebSockets",
      "Spring Boot",
      "Laravel",
      "Python",
      "MySQL",
      "Supabase"
    ],
    span: "wide",
  },
  {
    id: "devops",
    title: { es: "DevOps", en: "DevOps" },
    items: ["Vercel", "Docker", "GitHub Actions", "Nginx", "Cloudflare", "Bash", "Railway", "CI/CD"],
    span: "narrow",
  },
];
