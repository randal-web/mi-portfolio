import { localeTags, type Locale } from "@/lib/i18n";

/** Parse a `YYYY-MM` string into a Date at the first of that month. */
function parseMonth(value: string): Date {
  const [year, month] = value.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, 1);
}

/** Whole months between two `YYYY-MM` marks; `null` end means "today". */
export function monthsBetween(start: string, end: string | null): number {
  const from = parseMonth(start);
  const to = end ? parseMonth(end) : new Date();
  return Math.max(
    0,
    (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()),
  );
}

/** `2021` / `2021 - 2023` / `2023 -` for open-ended ranges. */
export function formatYearRange(start: string, end: string | null): string {
  const startYear = parseMonth(start).getFullYear();
  if (!end) return `${startYear} -`;
  const endYear = parseMonth(end).getFullYear();
  return startYear === endYear ? `${startYear}` : `${startYear} - ${endYear}`;
}

/** `mar 2024 — feb 2025`, the full period shown inside an expanded row. */
export function formatMonthRange(
  start: string,
  end: string | null,
  locale: Locale,
  present: string,
): string {
  const format = new Intl.DateTimeFormat(localeTags[locale], {
    month: "short",
    year: "numeric",
  });
  const from = format.format(parseMonth(start));
  return `${from} — ${end ? format.format(parseMonth(end)) : present}`;
}

type DurationLabels = {
  year: string;
  years: string;
  month: string;
  months: string;
};

/** `1 año 5 meses` / `8 months`, matching the work table in the mockup. */
export function formatDuration(months: number, labels: DurationLabels): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];

  if (years > 0) parts.push(`${years} ${years === 1 ? labels.year : labels.years}`);
  if (rest > 0 || years === 0) {
    parts.push(`${rest} ${rest === 1 ? labels.month : labels.months}`);
  }

  return parts.join(" ");
}

/** Localized long date, used by the article cards. */
export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(localeTags[locale], {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
