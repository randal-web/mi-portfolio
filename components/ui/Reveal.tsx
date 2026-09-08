"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds, for lists that should cascade in. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Fades content up the first time it scrolls into view.
 *
 * Deliberately hand-rolled on top of `IntersectionObserver` instead of pulling
 * in an animation library: it is a few lines, ships almost no JS, and it
 * disconnects itself once the element has been revealed.
 *
 * The reveal flips a data attribute on the node rather than React state — this
 * is DOM synchronisation, not application state, so it costs zero re-renders.
 *
 * Users with `prefers-reduced-motion` and users without JS get the content
 * immediately — see the `motion-reduce:` classes and the `<noscript>` rule in
 * the root layout.
 */
export function Reveal({ children, delay = 0, className, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reveal = () => node.setAttribute("data-revealed", "");

    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        reveal();
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "translate-y-5 opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "data-[revealed]:translate-y-0 data-[revealed]:opacity-100",
        "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
