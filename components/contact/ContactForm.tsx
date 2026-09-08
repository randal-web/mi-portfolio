"use client";

import { useActionState, useEffect, useRef, useState } from "react";

import { AlertIcon, ArrowRightIcon, CheckIcon, SpinnerIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Field, TextareaField } from "@/components/ui/Field";
import { sendContactMessage } from "@/lib/actions/contact";
import { initialContactState } from "@/lib/actions/contact-state";
import type { Locale } from "@/lib/i18n";

type ContactFormProps = {
  locale: Locale;
  labels: {
    title: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
    sending: string;
  };
  statusLabels: {
    successTitle: string;
    successBody: string;
    errorTitle: string;
    sendAnother: string;
  };
};

export function ContactForm({ locale, labels, statusLabels }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialContactState);
  /*
   * Which success result the visitor has already dismissed. Comparing ids —
   * rather than holding a boolean — means the next submission shows its own
   * confirmation without an effect resetting the flag.
   */
  const [dismissedId, setDismissedId] = useState<string | null>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const showSuccess = state.status === "success" && state.id !== dismissedId;

  /*
   * Timestamp the render so the action can reject submissions that arrive
   * impossibly fast. Written after mount to keep server and client HTML
   * identical during hydration.
   */
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, [showSuccess]);

  /* Move focus to the outcome so it is announced instead of silently appearing. */
  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (showSuccess) {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start gap-4 rounded-card border border-white/12 bg-surface-2 p-8 outline-none sm:p-10"
      >
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-fg text-xl text-ink">
          <CheckIcon />
        </span>
        <div>
          <h3 className="font-mono text-lg text-fg">{statusLabels.successTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            {state.message ?? statusLabels.successBody}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setDismissedId(state.id ?? null)}
        >
          {statusLabels.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      className="rounded-card border border-white/12 bg-surface-2 p-6 sm:p-8 lg:p-10"
    >
      <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
        {labels.title}
      </h3>

      {state.status === "error" && state.message && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-xl border border-red-400/25 bg-red-400/5 p-4 outline-none"
        >
          <AlertIcon className="mt-0.5 shrink-0 text-base text-red-400" />
          <div>
            <p className="font-mono text-sm text-red-300">{statusLabels.errorTitle}</p>
            <p className="mt-1 text-sm leading-relaxed text-fg-muted">{state.message}</p>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-7">
        <Field
          id="contact-name"
          name="name"
          label={labels.name}
          autoComplete="name"
          required
          defaultValue={state.values?.name}
          error={state.fieldErrors?.name}
        />
        <Field
          id="contact-email"
          name="email"
          type="email"
          inputMode="email"
          label={labels.email}
          autoComplete="email"
          required
          defaultValue={state.values?.email}
          error={state.fieldErrors?.email}
        />
        <Field
          id="contact-subject"
          name="subject"
          label={labels.subject}
          required
          defaultValue={state.values?.subject}
          error={state.fieldErrors?.subject}
        />
        <TextareaField
          id="contact-message"
          name="message"
          label={labels.message}
          required
          maxLength={5000}
          defaultValue={state.values?.message}
          error={state.fieldErrors?.message}
        />
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute size-px overflow-hidden opacity-0 [clip:rect(0,0,0,0)]">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="startedAt" ref={startedAtRef} defaultValue="" />

      <Button type="submit" size="lg" disabled={pending} className="mt-9 w-full sm:w-auto">
        {pending ? (
          <>
            {labels.sending}
            <SpinnerIcon />
          </>
        ) : (
          <>
            {labels.submit}
            <ArrowRightIcon />
          </>
        )}
      </Button>
    </form>
  );
}
