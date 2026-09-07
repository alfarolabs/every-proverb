import { expect, test } from "vitest";
import { catalog, createCatalog } from "./catalog";

test("catalog has at least 366 unique non-empty proverbs", () => {
  expect(catalog.length).toBeGreaterThanOrEqual(366);

  const ids = catalog.map((proverb) => proverb.id);
  const texts = catalog.map((proverb) => proverb.text);
  expect(new Set(ids).size).toBe(ids.length);
  expect(new Set(texts).size).toBe(texts.length);

  for (const proverb of catalog) {
    expect(proverb.text.trim().length).toBeGreaterThan(0);
    expect(proverb.origin.trim().length).toBeGreaterThan(0);
    expect(proverb.id.length).toBeGreaterThan(0);
  }
});

test("createCatalog rejects an empty list and duplicate ids or texts", () => {
  expect(() => createCatalog([])).toThrow(/empty/);
  expect(() =>
    createCatalog([
      { text: "Same text", origin: "English" },
      { text: "Same text", origin: "Scottish" },
    ]),
  ).toThrow(/duplicate proverb text/);
  expect(() =>
    createCatalog([
      { text: "Hello!", origin: "English" },
      { text: "Hello?", origin: "English" },
    ]),
  ).toThrow(/duplicate proverb id/);
  expect(() => createCatalog([{ text: "   ", origin: "English" }])).toThrow(/text is empty/);
  expect(() => createCatalog([{ text: "A saying", origin: "  " }])).toThrow(/origin is empty/);
});
