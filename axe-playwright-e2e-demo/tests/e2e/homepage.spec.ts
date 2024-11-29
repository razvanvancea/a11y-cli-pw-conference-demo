import { test, expect } from "@playwright/test";

test("welcome message is displayed", async ({ page }) => {
  await page.goto("https://qa-practice.netlify.app");

  await expect(page.locator("h1", { hasText: "Welcome!" })).toBeVisible();
});
