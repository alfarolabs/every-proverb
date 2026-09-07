export type CalendarDay = string & { readonly __brand: "CalendarDay" };

export function utcDay(now: Date): CalendarDay {
  return now.toISOString().slice(0, 10) as CalendarDay;
}

export function secondsUntilNextUtcDay(now: Date): number {
  const nextMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
  return Math.max(1, Math.ceil((nextMidnight - now.getTime()) / 1000));
}
