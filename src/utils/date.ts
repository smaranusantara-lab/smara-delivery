/**
 * All date/time handling in the app goes through this file, so that
 * "today", display formatting, and day boundaries are consistently
 * calculated in Asia/Jakarta regardless of server or browser timezone.
 *
 * Deliberately dependency-free (uses the native Intl API) rather than
 * pulling in date-fns/date-fns-tz, since the app's date needs are
 * simple (display formatting + day-boundary comparisons).
 */

export const APP_TIMEZONE = "Asia/Jakarta";

/**
 * Returns "today" as a YYYY-MM-DD string in Asia/Jakarta, matching the
 * `deliveries.delivery_date` column type (date). Use this instead of
 * `new Date().toISOString()`, which would use UTC and can be off by a
 * day for Jakarta users late at night / early morning.
 */
export function getTodayJakarta(): string {
  return formatDateISO(new Date());
}

/**
 * Formats any Date/timestamp as a YYYY-MM-DD string in Asia/Jakarta.
 */
export function formatDateISO(date: Date): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: APP_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  // en-CA locale formats as YYYY-MM-DD
  return formatter.format(date);
}

/**
 * Human-readable date for display, e.g. "10 Jul 2026".
 */
export function formatDateDisplay(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: APP_TIMEZONE,
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

/**
 * Human-readable date + time for display, e.g. "10 Jul 2026, 14:32".
 */
export function formatDateTimeDisplay(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: APP_TIMEZONE,
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}

/**
 * Difference between two timestamps in minutes. Used for KPI
 * calculations (e.g. average delivery time) derived from
 * delivery_status_logs entries in Milestone 6.
 */
export function diffInMinutes(start: Date | string, end: Date | string): number {
  const startMs = typeof start === "string" ? new Date(start).getTime() : start.getTime();
  const endMs = typeof end === "string" ? new Date(end).getTime() : end.getTime();
  return Math.round((endMs - startMs) / 60000);
}
