import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type BaseProps = {
  id: string;
  label: string;
  error?: string;
  className?: string;
};

const controlClasses = [
  "w-full border-0 border-b border-white/15 bg-transparent px-0 py-3",
  "text-base text-fg placeholder:text-fg-subtle/70",
  "transition-colors duration-200 outline-none",
  "hover:border-white/30 focus:border-fg",
  "aria-[invalid=true]:border-red-400/70",
].join(" ");

function Label({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-mono text-xs tracking-[0.15em] text-fg-subtle uppercase"
    >
      {children}
    </label>
  );
}

function ErrorText({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} className="font-mono text-xs text-red-400">
      {children}
    </p>
  );
}

/** Single-line underline input, matching the contact card in the mockup. */
export function Field({
  id,
  label,
  error,
  className,
  ...props
}: BaseProps & ComponentPropsWithoutRef<"input">) {
  const errorId = `${id}-error`;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={controlClasses}
        {...props}
      />
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  );
}

/** Multi-line variant for the message body. */
export function TextareaField({
  id,
  label,
  error,
  className,
  ...props
}: BaseProps & ComponentPropsWithoutRef<"textarea">) {
  const errorId = `${id}-error`;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={id}>{label}</Label>
      <textarea
        id={id}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(controlClasses, "resize-y")}
        {...props}
      />
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  );
}
