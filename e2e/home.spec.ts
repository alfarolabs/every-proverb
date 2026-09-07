import { expect, test } from "@playwright/test";

test("home shows Every Proverb and a proverb", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Every Proverb" })).toBeVisible();
  const proverb = page.locator("blockquote");
  await expect(proverb).toBeVisible();
  await expect(proverb).not.toHaveText("");
});

test("unknown path is 404 with Not found", async ({ page }) => {
  const response = await page.goto("/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "Not found" })).toBeVisible();
});
