import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** The single horizontal rhythm for the whole page. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14", className)}>
      {children}
    </div>
  );
}
