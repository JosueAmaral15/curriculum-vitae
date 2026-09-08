import { expect, test } from "@playwright/test";

test("keeps curriculum actions touch-friendly on mobile and tablet", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "chromium", "Touch-target assertions apply to mobile and tablet projects.");

  await page.goto("/");
  const englishResume = page.getByRole("link", { name: /english resume/i }).last();
  const portugueseResume = page.getByRole("link", { name: /portuguese resume/i }).last();
  const lattes = page.getByRole("link", { name: /lattes curriculum/i });
  const youtube = page.getByRole("link", { name: /youtube channel/i });

  for (const link of [englishResume, portugueseResume, lattes, youtube]) {
    await link.scrollIntoViewIfNeeded();
    await expect(link).toBeVisible();
    const box = await link.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }

  await expect(page.getByAltText("Portrait of Josué Amaral")).toBeVisible();
  await expect(page.getByText("MindSIM · Brazil · Remote")).toBeVisible();
});

test("uses the static assembly fallback when reduced motion is requested", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator("canvas")).toBeHidden();
  await expect(page.getByRole("heading", { name: /signals searching for meaning/i })).toBeVisible();
});
