/**
 * The shape of a contact submission's result, shared by the Server Action and
 * the form component.
 *
 * This lives *outside* `contact.ts` on purpose: that file carries the
 * `"use server"` directive, and every export of such a file is turned into a
 * Server Function. Exporting a plain object from it — `initialContactState` —
 * makes the module throw as soon as the action is invoked:
 *
 *   A "use server" file can only export async functions, found object.
 *
 * The page still renders (the error only surfaces when the action module is
 * evaluated), so the breakage shows up as a failed submit rather than a build
 * error. Keep values and types here; keep `contact.ts` to async functions only.
 */

export type ContactField = "name" | "email" | "subject" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  /**
   * Identifies one submission result. The form uses it to tell a freshly
   * dismissed success panel apart from a brand-new one, without an effect.
   */
  id?: string;
  /** Top-level feedback rendered above the form. */
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  /** Echoed back so a failed submit does not wipe what the visitor typed. */
  values?: Partial<Record<ContactField, string>>;
};

export const initialContactState: ContactState = { status: "idle" };
