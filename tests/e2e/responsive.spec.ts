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

test("does not crop or overlap the 3D camera in narrow Firefox", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-firefox", "Firefox mobile regression only.");

  await page.goto("/");
  const section = page.locator('section[aria-labelledby="assembly-title"]');
  await expect(section).toHaveClass(/ready/, { timeout: 20_000 });

  const canvas = section.locator("canvas");
  const copy = section.locator('[class*="copy"]');
  await expect(canvas).toBeVisible();
  await expect.poll(() => canvas.evaluate((element) => getComputedStyle(element).clipPath)).toBe("none");

  const [canvasBox, copyBox] = await Promise.all([canvas.boundingBox(), copy.boundingBox()]);
  expect(canvasBox).not.toBeNull();
  expect(copyBox).not.toBeNull();
  const overlap = !(
    canvasBox!.x + canvasBox!.width <= copyBox!.x
    || copyBox!.x + copyBox!.width <= canvasBox!.x
    || canvasBox!.y + canvasBox!.height <= copyBox!.y
    || copyBox!.y + copyBox!.height <= canvasBox!.y
  );
  expect(overlap).toBe(false);
});
