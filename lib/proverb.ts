import type { CalendarDay } from "./day";

export type ProverbId = string & { readonly __brand: "ProverbId" };

export type Proverb = {
  id: ProverbId;
  text: string;
  origin: string;
};

export type DailyProverb = {
  day: CalendarDay;
  proverb: Proverb;
  index: number;
};

export type Catalog = readonly [Proverb, ...Proverb[]];

const MS_PER_DAY = 86_400_000;

function nonNegativeRemainder(value: number, length: number): number {
  return ((value % length) + length) % length;
}

export function proverbForDay(args: { day: CalendarDay; catalog: Catalog }): DailyProverb {
  const ordinal = Math.floor(Date.parse(`${args.day}T00:00:00.000Z`) / MS_PER_DAY);
  const index = nonNegativeRemainder(ordinal, args.catalog.length);
  const proverb = args.catalog[index] ?? args.catalog[0];
  return { day: args.day, proverb, index };
}
