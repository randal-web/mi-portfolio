/**
 * Spanish dictionary — the source of truth for the site's UI copy.
 *
 * Its shape is exported as `Dictionary`, so every other language file is
 * type-checked against it and a missing key becomes a build error.
 *
 * Only *chrome* lives here (labels, buttons, form copy). Translatable
 * **content** (projects, experience, articles) lives in `content/` as
 * `Localized<T>` values.
 */
export const es = {
  meta: {
    tagline: "Desarrollador Full-stack",
    description:
      "Portfolio de un desarrollador full-stack centrado en escribir código mantenible, limpio y comprensible. Proyectos, experiencia y formas de contacto.",
    ogAlt: "Portfolio de desarrollador full-stack",
  },

  nav: {
    about: "Sobre mí",
    skills: "Skills",
    articles: "Artículos",
    experience: "Experiencia",
    projects: "Proyectos",
    contact: "Contacto",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    primary: "Navegación principal",
  },

  localeSwitcher: {
    label: "Idioma",
  },

  hero: {
    label: "... /Inicio ...",
    cta: "Proyectos",
    available: "Disponible para nuevos proyectos",
    unavailable: "Agenda completa ahora mismo",
    scroll: "Scroll",
    socials: "Redes",
  },

  about: {
    label: "... /Sobre mí ...",
    greeting: "¡Hola! Soy",
    connector: "y soy",
    /** `{years}` se sustituye por los años calculados desde `content/experience.ts`. */
    experience: "Más de {years} años de experiencia.",
    favTech: "Algunas de mis tecnologías, temas o herramientas favoritas con las que he trabajado",
  },

  skills: {
    label: "... /Stack ...",
    title: "Skills",
  },

  articles: {
    label: "... /Escribo ...",
    title: "Artículos",
    readMore: "Leer más",
    previous: "Artículo anterior",
    next: "Artículo siguiente",
    goTo: "Ir al artículo",
    external: "Se abre en una pestaña nueva",
  },

  experience: {
    label: "... /Trayectoria ...",
    title: "Work",
    present: "Actualidad",
    totalLabel: "Experiencia laboral",
    period: "Periodo",
    company: "Empresa",
    role: "Puesto",
    expand: "Ver detalles",
    collapse: "Ocultar detalles",
    highlights: "Lo que hice",
    stack: "Stack",
    location: "Ubicación",
    visit: "Visitar sitio",
  },

  projects: {
    label: "... /Trabajos ...",
    title: "Proyectos",
    viewProject: "Ver proyecto",
    liveDemo: "Ver en vivo",
    sourceCode: "Código",
    stack: "Stack",
    screenshotAlt: "Captura del proyecto",
    gallery: "Galería del proyecto",
    viewImage: "Ver imagen",
    closeGallery: "Cerrar galería",
    previousImage: "Imagen anterior",
    nextImage: "Imagen siguiente",
  },

  contact: {
    label: "... /Hablemos ...",
    title: "Contacto",
    intro:
      "¿Tienes un proyecto en mente o una vacante que encaje? Cuéntamelo y te respondo en menos de 24 horas.",
    emailLabel: "E-mail",
    locationLabel: "Ubicación",
    availabilityLabel: "Disponibilidad",
    formTitle: "Formulario de contacto",
    form: {
      name: "Tu nombre",
      email: "Tu e-mail",
      subject: "Asunto",
      message: "Mensaje",
      submit: "Enviar mensaje",
      sending: "Enviando",
      optional: "opcional",
    },
    status: {
      successTitle: "Mensaje enviado",
      successBody: "Gracias por escribir. Te respondo lo antes posible.",
      errorTitle: "No se ha podido enviar",
      sendAnother: "Enviar otro mensaje",
    },
    errors: {
      name: "Escribe tu nombre (mínimo 2 caracteres).",
      email: "Necesito un e-mail válido para poder responderte.",
      subject: "Añade un asunto de al menos 3 caracteres.",
      message: "Cuéntame algo más: mínimo 10 caracteres.",
      tooLong: "El mensaje es demasiado largo (máximo 5000 caracteres).",
      generic: "Algo ha fallado por mi lado. Vuelve a intentarlo o escríbeme directamente.",
      notConfigured:
        "El envío de correo aún no está configurado. Mientras tanto puedes escribirme directamente.",
      spam: "No he podido procesar el envío.",
    },
  },

  footer: {
    rights: "Todos los derechos reservados.",
    builtWith: "Hecho con Next.js y desplegado en Vercel",
    backToTop: "Volver arriba",
    sitemap: "Secciones",
    elsewhere: "En otros sitios",
  },

  duration: {
    year: "año",
    years: "años",
    month: "mes",
    months: "meses",
  },

  notFound: {
    title: "Página no encontrada",
    body: "El enlace que has seguido no existe o ha cambiado de sitio.",
    cta: "Volver al inicio",
  },
};

/** Shape every other language file must satisfy. */
export type Dictionary = typeof es;
