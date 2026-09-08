import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getDictionary, getLocale } from "@/lib/dictionaries";

export default async function NotFound() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <Container className="flex min-h-svh flex-col items-center justify-center gap-6 py-32 text-center">
      <p className="font-mono text-sm tracking-[0.3em] text-fg-subtle">404</p>
      <h1 className="font-mono text-[clamp(2.5rem,8vw,5rem)] font-extrabold uppercase leading-none tracking-tighter">
        {dict.notFound.title}
      </h1>
      <p className="max-w-md text-base leading-relaxed text-fg-muted">{dict.notFound.body}</p>
      <ButtonLink href={`/${locale}`} size="lg" className="mt-2">
        {dict.notFound.cta}
      </ButtonLink>
    </Container>
  );
}
