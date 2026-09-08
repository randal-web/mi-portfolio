"use server";

import { Resend } from "resend";
import { z } from "zod";

import { site } from "@/content/site";
import type { ContactState } from "@/lib/actions/contact-state";
import { getDictionary } from "@/lib/dictionaries";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

/** Bots fill every input they find; humans never see this one. */
const HONEYPOT_FIELD = "company";

/** A genuine visitor needs more than a couple of seconds to fill four fields. */
const MIN_FILL_MS = 2_000;

const MAX_MESSAGE_LENGTH = 5_000;

function buildSchema(errors: Awaited<ReturnType<typeof getDictionary>>["contact"]["errors"]) {
  return z.object({
    name: z.string().trim().min(2, { message: errors.name }).max(120, { message: errors.tooLong }),
    email: z.email({ message: errors.email }).max(200, { message: errors.tooLong }),
    subject: z
      .string()
      .trim()
      .min(3, { message: errors.subject })
      .max(200, { message: errors.tooLong }),
    message: z
      .string()
      .trim()
      .min(10, { message: errors.message })
      .max(MAX_MESSAGE_LENGTH, { message: errors.tooLong }),
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderEmail(input: { name: string; email: string; subject: string; message: string }) {
  const rows: Array<[string, string]> = [
    ["From", `${input.name} <${input.email}>`],
    ["Subject", input.subject],
  ];

  return `<!doctype html>
<html>
  <body style="margin:0;background:#0b0b0e;padding:32px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;color:#f4f4f5">
    <div style="max-width:640px;margin:0 auto;border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:28px">
      <h1 style="margin:0 0 20px;font-size:16px;letter-spacing:.12em;text-transform:uppercase;color:#a1a1aa">
        New portfolio message
      </h1>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([label, value]) => `<tr>
          <td style="padding:6px 12px 6px 0;color:#71717a;white-space:nowrap;vertical-align:top">${label}</td>
          <td style="padding:6px 0;color:#f4f4f5">${escapeHtml(value)}</td>
        </tr>`,
          )
          .join("")}
      </table>
      <hr style="margin:20px 0;border:none;border-top:1px solid rgba(255,255,255,.12)" />
      <pre style="margin:0;white-space:pre-wrap;word-break:break-word;font-size:14px;line-height:1.7;color:#e4e4e7">${escapeHtml(
        input.message,
      )}</pre>
    </div>
  </body>
</html>`;
}

/**
 * Handles the contact form.
 *
 * Runs only on the server, so `RESEND_API_KEY` is never exposed to the client.
 * Note that Server Actions are reachable by direct POST, not just through the
 * form — hence the validation, honeypot and timing checks live here rather than
 * in the component.
 *
 * `next/root-params` is unavailable inside Server Actions, so the locale
 * travels with the submission as a hidden field.
 */
export async function sendContactMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const rawLocale = String(formData.get("locale") ?? "");
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);
  const { errors, status } = dict.contact;

  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  /* Spam gates. Both answer with the same generic message so a bot learns nothing. */
  const startedAt = Number(formData.get("startedAt"));
  const tooFast = Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS;

  if (String(formData.get(HONEYPOT_FIELD) ?? "").length > 0 || tooFast) {
    return { status: "error", message: errors.spam, values };
  }

  const parsed = buildSchema(errors).safeParse(values);

  if (!parsed.success) {
    const fieldErrors = z.flattenError(parsed.error).fieldErrors;
    return {
      status: "error",
      values,
      fieldErrors: {
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        subject: fieldErrors.subject?.[0],
        message: fieldErrors.message?.[0],
      },
    };
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { status: "error", message: errors.notConfigured, values };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      /* Resend's shared sender works with no domain set up; swap it for an
         address on your own verified domain once you have one. */
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? site.email,
      replyTo: parsed.data.email,
      subject: `[Portfolio] ${parsed.data.subject}`,
      html: renderEmail(parsed.data),
      text: `${parsed.data.name} <${parsed.data.email}>\n\n${parsed.data.message}`,
    });

    if (error) {
      /*
       * Serialised by hand: Resend's error is a plain object whose fields the
       * dev-server logger renders as `{}`, which hides the one line that says
       * what went wrong (a wrong recipient, an unverified domain, a bad key).
       */
      console.error("[contact] Resend rejected the message:", JSON.stringify(error));
      return { status: "error", message: errors.generic, values };
    }
  } catch (cause) {
    console.error("[contact] Unexpected failure:", cause);
    return { status: "error", message: errors.generic, values };
  }

  return { status: "success", id: crypto.randomUUID(), message: status.successBody };
}
