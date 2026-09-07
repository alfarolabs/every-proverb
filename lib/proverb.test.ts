import { expect, test } from "vitest";
import { catalog, createCatalog } from "./catalog";
import { utcDay } from "./day";
import { proverbForDay } from "./proverb";

const seed = createCatalog([
  { text: "Alpha saying", origin: "English" },
  { text: "Beta saying", origin: "Scottish" },
  { text: "Gamma saying", origin: "Latin" },
]);

test("same CalendarDay and catalog yield the same proverb", () => {
  const day = utcDay(new Date("2026-09-06T18:00:00.000Z"));
  expect(proverbForDay({ day, catalog })).toEqual(proverbForDay({ day, catalog }));
  expect(proverbForDay({ day, catalog: seed })).toEqual(proverbForDay({ day, catalog: seed }));
});

test("the next UTC day yields the next index and wraps at catalog.length", () => {
  const day = utcDay(new Date("2026-09-06T12:00:00.000Z"));
  const next = utcDay(new Date("2026-09-07T12:00:00.000Z"));
  const today = proverbForDay({ day, catalog });
  const tomorrow = proverbForDay({ day: next, catalog });
  expect(tomorrow.index).toBe((today.index + 1) % catalog.length);

  const epoch = utcDay(new Date(0));
  const wrap = utcDay(new Date(catalog.length * 86_400_000));
  expect(proverbForDay({ day: epoch, catalog }).index).toBe(0);
  expect(proverbForDay({ day: wrap, catalog }).index).toBe(0);
  expect(proverbForDay({ day: wrap, catalog }).proverb).toEqual(
    proverbForDay({ day: epoch, catalog }).proverb,
  );

  expect(proverbForDay({ day: epoch, catalog: seed }).index).toBe(0);
  expect(proverbForDay({ day: utcDay(new Date(86_400_000)), catalog: seed }).index).toBe(1);
  expect(proverbForDay({ day: utcDay(new Date(3 * 86_400_000)), catalog: seed }).index).toBe(0);
});
