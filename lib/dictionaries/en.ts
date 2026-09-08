import type { Dictionary } from "./es";

/** English dictionary. Type-checked against the Spanish one. */
export const en: Dictionary = {
  meta: {
    tagline: "Full-stack Developer",
    description:
      "Portfolio of a full-stack developer focused on writing maintainable, clean and understandable code. Projects, work experience and ways to get in touch.",
    ogAlt: "Full-stack developer portfolio",
  },

  nav: {
    about: "About",
    skills: "Skills",
    articles: "Articles",
    experience: "Experience",
    projects: "Projects",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primary: "Primary navigation",
  },

  localeSwitcher: {
    label: "Language",
  },

  hero: {
    label: "... /Home ...",
    cta: "Projects",
    available: "Available for new projects",
    unavailable: "Fully booked right now",
    scroll: "Scroll",
    socials: "Socials",
  },

  about: {
    label: "... /About me ...",
    greeting: "Hello! I'm",
    connector: "and I'm a",
    experience: "More than {years} years of experience.",
    portraitAlt: "Portrait of the developer",
    favTech: "Some of my favorite technologies, topics or tools that I worked with",
  },

  skills: {
    label: "... /Stack ...",
    title: "Skills",
  },

  articles: {
    label: "... /I write ...",
    title: "Articles",
    readMore: "Read more",
    previous: "Previous article",
    next: "Next article",
    goTo: "Go to article",
    external: "Opens in a new tab",
  },

  experience: {
    label: "... /Track record ...",
    title: "Work",
    present: "Present",
    totalLabel: "Work experience",
    period: "Period",
    company: "Company",
    role: "Role",
    expand: "View details",
    collapse: "Hide details",
    highlights: "What I did",
    stack: "Stack",
    location: "Location",
    visit: "Visit website",
  },

  projects: {
    label: "... /Selected work ...",
    title: "Projects",
    viewProject: "View project",
    liveDemo: "Live demo",
    sourceCode: "Source",
    stack: "Stack",
    screenshotAlt: "Project screenshot",
    gallery: "Project gallery",
    viewImage: "View image",
    closeGallery: "Close gallery",
    previousImage: "Previous image",
    nextImage: "Next image",
  },

  contact: {
    label: "... /Let's talk ...",
    title: "Contact",
    intro:
      "Got a project in mind or a role that fits? Tell me about it and I'll get back to you within 24 hours.",
    emailLabel: "E-mail",
    locationLabel: "Location",
    availabilityLabel: "Availability",
    formTitle: "Contact form",
    form: {
      name: "Your name",
      email: "Your e-mail",
      subject: "Subject",
      message: "Message",
      submit: "Send message",
      sending: "Sending",
      optional: "optional",
    },
    status: {
      successTitle: "Message sent",
      successBody: "Thanks for reaching out. I'll reply as soon as I can.",
      errorTitle: "Couldn't send it",
      sendAnother: "Send another message",
    },
    errors: {
      name: "Please enter your name (at least 2 characters).",
      email: "I need a valid e-mail address to reply to you.",
      subject: "Add a subject of at least 3 characters.",
      message: "Tell me a bit more: at least 10 characters.",
      tooLong: "That message is too long (5000 characters max).",
      generic: "Something broke on my side. Try again or e-mail me directly.",
      notConfigured: "E-mail delivery isn't configured yet. In the meantime, write to me directly.",
      spam: "I couldn't process this submission.",
    },
  },

  footer: {
    rights: "All rights reserved.",
    builtWith: "Built with Next.js, deployed on Vercel",
    backToTop: "Back to top",
    sitemap: "Sections",
    elsewhere: "Elsewhere",
  },

  duration: {
    year: "year",
    years: "years",
    month: "month",
    months: "months",
  },

  notFound: {
    title: "Page not found",
    body: "The link you followed doesn't exist or has moved somewhere else.",
    cta: "Back home",
  },
};
