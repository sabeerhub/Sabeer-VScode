import { test, expect } from "@playwright/test";

test("Verify Sabeer VS Code Portfolio workspace boots and renders", async ({ page }) => {
  // Go to local next server port
  await page.goto("http://localhost:3000");

  // Check the title matches
  await expect(page).toHaveTitle(/Mustapha Abdulsalam/);

  // Wait for the startup loading animation to transition
  await page.waitForTimeout(2500);

  // The workspace TitleBar, Sidebar and status bar should be present
  const sidebar = page.locator("text=sabeer-workspace — Search");
  await expect(sidebar).toBeVisible();

  // The README file should be initially rendered
  const readmeHeader = page.locator("text=Mustapha Abdulsalam");
  await expect(readmeHeader).toBeVisible();
});
