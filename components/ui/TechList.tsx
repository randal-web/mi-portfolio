import { cn } from "@/lib/utils";

/**
 * `TypeScript / React / Vue` — slash-separated stack lists from the mockup.
 * Rendered as a real list so assistive tech announces the items individually.
 */
export function TechList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-sm", className)}>
      {items.map((item, index) => (
        <li key={item} className="flex items-center gap-2 text-fg-muted">
          {index > 0 && (
            <span aria-hidden className="text-fg-subtle/60">
              /
            </span>
          )}
          {item}
        </li>
      ))}
    </ul>
  );
}
