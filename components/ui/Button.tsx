import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  solid: "bg-fg text-ink hover:bg-white/85",
  outline: "border border-white/15 text-fg hover:border-white/40 hover:bg-white/5",
  ghost: "text-fg-muted hover:text-fg hover:bg-white/5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-sm sm:h-16 sm:px-10 sm:text-base",
};

export function buttonClasses({
  variant = "solid",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2.5 rounded-full font-mono tracking-tight",
    "transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={buttonClasses({ variant, size, className })} {...props} />;
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses({ variant, size, className })} {...props} />;
}

/**
 * The circular icon button that sits next to the pill CTAs in the mockup.
 * Renders as a `<button>`; pair it with `ButtonLink` inside a flex row.
 */
export function IconButton({
  children,
  className,
  variant = "outline",
  ...props
}: ComponentPropsWithoutRef<"button"> & { children: ReactNode; variant?: ButtonVariant }) {
  return (
    <button
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-full text-base",
        "transition-all duration-200 disabled:pointer-events-none disabled:opacity-40",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
