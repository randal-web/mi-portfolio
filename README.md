# Portfolio

Portfolio personal de desarrollador full-stack. Landing de una sola página, bilingüe
(ES/EN), en modo oscuro monocromo, construida sobre **Next.js 16** (App Router) y
pensada para desplegarse en **Vercel**.

---

## Puesta en marcha

```bash
pnpm install
pnpm dev          # http://localhost:3000  ->  redirige a /es o /en
```

| Script           | Qué hace                                  |
| ---------------- | ----------------------------------------- |
| `pnpm dev`       | Servidor de desarrollo (Turbopack)        |
| `pnpm build`     | Build de producción                       |
| `pnpm start`     | Sirve el build de producción              |
| `pnpm lint`      | ESLint (incluye las reglas de React 19)   |
| `pnpm typecheck` | `tsc --noEmit`                            |

> Este proyecto usa **pnpm**. El campo `packageManager` del `package.json` hace que
> Vercel y Corepack elijan la versión correcta automáticamente.

---

## Qué editar (y qué no)

Todo el contenido vive en `content/`. **No hace falta tocar ningún componente** para
personalizar el sitio:

| Archivo                 | Contenido                                                        |
| ----------------------- | ---------------------------------------------------------------- |
| `content/site.ts`       | Nombre, titular del hero, bio, e-mail, redes, disponibilidad, foto |
| `content/skills.ts`     | Bloques de tecnologías del mosaico de «Sobre mí»                  |
| `content/experience.ts` | Trayectoria laboral (la duración total se calcula sola)           |
| `content/projects.ts`   | Proyectos y sus capturas                                          |
| `content/articles.ts`   | Artículos publicados fuera. **Array vacío ⇒ la sección desaparece** del home y del menú |

Los textos de interfaz (botones, etiquetas, mensajes del formulario) están en
`lib/dictionaries/es.ts` y `lib/dictionaries/en.ts`. El archivo español es la fuente
de verdad: su forma se exporta como el tipo `Dictionary`, así que **si olvidas una
clave en inglés, el build falla** en lugar de renderizar un hueco.

Los campos traducibles del contenido usan el tipo `Localized<T>`:

```ts
tagline: {
  es: "Pedidos online para una cafetería de barrio",
  en: "Online ordering for a neighbourhood coffee shop",
}
```

### Imágenes

`public/images/` contiene marcadores SVG generados (retrato, portadas de artículos y
mockups de navegador). Sustitúyelos por archivos reales manteniendo los nombres, o
cambia las rutas en `content/`. Al pasar a PNG/JPG, `next/image` empieza a optimizar
automáticamente (los SVG se sirven sin optimizar, que es lo correcto).

---

## Formulario de contacto

El envío es un **Server Action** (`lib/actions/contact.ts`), así que la API key nunca
llega al navegador. Valida con Zod, incluye honeypot y descarte por tiempo mínimo de
relleno, y devuelve los valores para no perder lo escrito si algo falla.

Copia `.env.example` a `.env.local` y rellena:

```bash
RESEND_API_KEY=re_...        # https://resend.com/api-keys
CONTACT_TO_EMAIL=            # opcional; por defecto, site.email
CONTACT_FROM_EMAIL=          # opcional; por defecto, onboarding@resend.dev
```

Sin `RESEND_API_KEY` el formulario sigue funcionando y valida, pero avisa al visitante
de que el envío no está configurado en lugar de romperse.

> `onboarding@resend.dev` funciona sin verificar dominio, pero **solo entrega al correo
> dueño de la cuenta de Resend**. Para producción, verifica tu dominio y pon algo como
> `CONTACT_FROM_EMAIL="Portfolio <hola@tudominio.com>"`.

---

## Idiomas

Cada ruta cuelga de `app/[lang]`, de modo que `lang` es un *root parameter*:

- Ambos idiomas se **prerenderizan estáticamente** (`generateStaticParams`).
- Cualquier Server Component lee el idioma con `next/root-params`, sin pasar props
  en cascada (`lib/dictionaries.ts`).
- `proxy.ts` (el sustituto de `middleware` en Next 16) negocia `Accept-Language` y
  redirige `/` a `/es` o `/en`.
- El selector del header son dos enlaces reales, con `hreflang` y URLs canónicas.

Para añadir un idioma: amplía `locales` en `lib/i18n.ts`, crea
`lib/dictionaries/<code>.ts` y añade las variantes a los objetos `Localized` de
`content/`. TypeScript te irá señalando todo lo que falte.

---

## Estructura

```
app/
  [lang]/          layout (fuentes, metadata, hreflang), page, not-found, opengraph-image
  icon.tsx         favicon generado con ImageResponse
  robots.ts        sitemap.ts        globals.css (tokens de diseño)
components/
  layout/          header, footer, raíles laterales, selector de idioma
  sections/        Hero, About, Experience, Projects, Articles, Contact
  ui/              primitivas: Button, Card, Section, Reveal, Field, carrusel…
  contact/         formulario de cliente (useActionState)
  icons/           set de iconos SVG inline
content/           ⬅ tus datos
lib/               i18n, diccionarios, utilidades, server action
proxy.ts           redirección por idioma
```

---

## Despliegue en Vercel

1. Sube el repo a GitHub e impórtalo en Vercel. El framework se detecta solo.
2. Añade `RESEND_API_KEY` (y las opcionales) en *Settings → Environment Variables*.
3. Deploy.

La URL canónica se detecta desde `VERCEL_PROJECT_PRODUCTION_URL`. Si conectas un
dominio propio, define `NEXT_PUBLIC_SITE_URL=https://tudominio.com` para que sitemap,
canonical y Open Graph lo usen.

Lo que el proyecto ya aprovecha de la plataforma:

- **Todo estático**: las dos páginas, ambas imágenes OG, el favicon, `sitemap.xml` y
  `robots.txt` se generan en build.
- **Server Actions** para el formulario, sin necesidad de una API route.
- `@vercel/analytics` y `@vercel/speed-insights` (se activan al habilitarlos en el panel).
- `next/font` autoaloja Inter y JetBrains Mono: sin peticiones a Google en runtime.
- Cabeceras de seguridad en `next.config.ts`.

---

## Accesibilidad y rendimiento

- Enlace «saltar al contenido», landmarks y `aria-current` en la navegación.
- El formulario asocia errores con `aria-describedby` / `aria-invalid` y mueve el foco
  al resultado del envío.
- Todo respeta `prefers-reduced-motion`; sin JavaScript, las animaciones de entrada se
  desactivan y el contenido se ve igualmente (regla `<noscript>` en el layout).
- El carrusel usa scroll nativo con snap: funciona con dedo, trackpad y teclado.
