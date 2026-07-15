import { test } from "@playwright/test";

test("Capture high fidelity workspace screenshot", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.waitForTimeout(3000); // Wait for splash screen
  await page.screenshot({ path: "public/screenshot.png", fullPage: true });
});
