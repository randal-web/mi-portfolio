import { ContactForm } from "@/components/contact/ContactForm";
import { DownloadIcon, MailIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { DisplayHeading, Section, SectionLabel } from "@/components/ui/Section";
import { SocialPills } from "@/components/ui/SocialLinks";
import { site } from "@/content/site";
import type { Dictionary } from "@/lib/dictionaries";
import { pick, type Locale } from "@/lib/i18n";

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-white/10 py-4">
      <dt className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">{label}</dt>
      <dd className="mt-1.5 text-base text-fg">{children}</dd>
    </div>
  );
}

export function Contact({
  dict,
  locale,
  index,
}: {
  dict: Dictionary;
  locale: Locale;
  index: number;
}) {
  const resume = site.resume && pick(site.resume, locale);

  return (
    <Section id="contact" index={index}>
      <div className="flex flex-col gap-6">
        <Reveal>
          <SectionLabel>{dict.contact.label}</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <DisplayHeading id="contact-heading">{dict.contact.title}</DisplayHeading>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="max-w-md text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
              {dict.contact.intro}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <dl className="mt-10">
              <InfoRow label={dict.contact.emailLabel}>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 underline-offset-4 transition-opacity hover:opacity-70 hover:underline"
                >
                  <MailIcon className="text-fg-subtle" />
                  {site.email}
                </a>
              </InfoRow>
              {resume && (
                <InfoRow label={dict.contact.resumeLabel}>
                  <a
                    href={resume.href}
                    download={resume.filename}
                    className="group inline-flex items-center gap-2.5 underline-offset-4 transition-opacity hover:opacity-70 hover:underline"
                  >
                    <DownloadIcon className="text-fg-subtle transition-transform duration-200 group-hover:translate-y-0.5" />
                    {dict.resume.download}
                  </a>
                </InfoRow>
              )}
              <InfoRow label={dict.contact.locationLabel}>{pick(site.location, locale)}</InfoRow>
              <InfoRow label={dict.contact.availabilityLabel}>
                {site.available ? dict.hero.available : dict.hero.unavailable}
              </InfoRow>
            </dl>
          </Reveal>

          <Reveal delay={140}>
            <nav aria-label={dict.footer.elsewhere} className="mt-10">
              <SocialPills />
            </nav>
          </Reveal>
        </div>

        <Reveal delay={120} className="lg:col-span-7">
          <ContactForm
            locale={locale}
            labels={{
              title: dict.contact.formTitle,
              name: dict.contact.form.name,
              email: dict.contact.form.email,
              subject: dict.contact.form.subject,
              message: dict.contact.form.message,
              submit: dict.contact.form.submit,
              sending: dict.contact.form.sending,
            }}
            statusLabels={dict.contact.status}
          />
        </Reveal>
      </div>
    </Section>
  );
}
