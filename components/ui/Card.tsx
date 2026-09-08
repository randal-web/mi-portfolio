import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Hairline-bordered surface used by the skill, article and contact panels. */
export function Card({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return (
    <Tag
      className={cn(
        "rounded-card border border-white/10 bg-surface/70 backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
