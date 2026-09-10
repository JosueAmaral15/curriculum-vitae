import { expect, test } from "@playwright/test";

test("keeps curriculum actions touch-friendly on mobile and tablet", async ({ page }, testInfo) => {
  test.skip(!["mobile", "mobile-firefox", "tablet"].includes(testInfo.project.name), "Touch-target assertions apply to mobile and tablet projects.");

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
  const staticStructure = await page.locator('[data-assembly-track]').evaluate((element) => {
    const stage = element.querySelector<HTMLElement>('[data-assembly-stage]')!;
    return {
      extraScrollDistance: element.offsetHeight - stage.offsetHeight,
      stagePosition: getComputedStyle(stage).position,
    };
  });
  expect(staticStructure.extraScrollDistance).toBe(0);
  expect(staticStructure.stagePosition).toBe("relative");
});

test("aligns project columns and row content on desktop", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Desktop project-grid regression only.");

  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const rows = page.locator("#projetos a, #projetos article");
  await expect(rows).toHaveCount(15);

  const metrics = await rows.evaluateAll((elements) => elements.map((element) => {
    const bounds = Array.from(element.children, (child) => child.getBoundingClientRect());
    return {
      display: getComputedStyle(element).display,
      leadingColumns: bounds.slice(0, 3).map((box) => box.left),
      lastRight: bounds.at(-1)?.right ?? 0,
      topSpread: Math.max(...bounds.map((box) => box.top)) - Math.min(...bounds.map((box) => box.top)),
    };
  }));

  expect(metrics.every((row) => row.display === "grid" && row.topSpread <= 1)).toBe(true);
  for (let column = 0; column < 3; column += 1) {
    const positions = metrics.map((row) => row.leadingColumns[column]);
    expect(Math.max(...positions) - Math.min(...positions)).toBeLessThanOrEqual(1);
  }
  const trailingEdges = metrics.map((row) => row.lastRight);
  expect(Math.max(...trailingEdges) - Math.min(...trailingEdges)).toBeLessThanOrEqual(1);
});

test("keeps the complete 3D camera behind readable copy in narrow Firefox", async ({ page }, testInfo) => {
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
  expect(overlap).toBe(true);

  const layers = await section.evaluate((element) => {
    const canvasElement = element.querySelector("canvas")!;
    const copyElement = element.querySelector<HTMLElement>('[class*="copy"]')!;
    return {
      canvasPosition: getComputedStyle(canvasElement).position,
      canvasZ: Number(getComputedStyle(canvasElement).zIndex),
      copyZ: Number(getComputedStyle(copyElement).zIndex),
    };
  });
  expect(layers.canvasPosition).toBe("absolute");
  expect(layers.copyZ).toBeGreaterThan(layers.canvasZ);
});

test("keeps upward scrolling monotonic across the 3D camera section", async ({ page }, testInfo) => {
  test.skip(!["chromium", "firefox"].includes(testInfo.project.name), "Desktop wheel regression runs in Chromium and Firefox.");
  test.setTimeout(60_000);

  await page.goto("/");
  const section = page.locator('[data-assembly-track]');
  await expect(section).toHaveClass(/ready/, { timeout: 20_000 });

  const structure = await section.evaluate((element) => {
    const stage = element.querySelector<HTMLElement>('[data-assembly-stage]')!;
    return {
      hasPinSpacer: element.parentElement?.classList.contains("pin-spacer") ?? false,
      stagePosition: getComputedStyle(stage).position,
      start: element.getBoundingClientRect().top + window.scrollY,
      distance: element.offsetHeight - stage.offsetHeight,
    };
  });
  expect(structure.hasPinSpacer).toBe(false);
  expect(structure.stagePosition).toBe("sticky");
  expect(structure.distance).toBeGreaterThan(1_000);

  await page.evaluate((top) => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, top);
  }, structure.start + structure.distance + 240);
  await page.mouse.move(640, 360);
  const samples: Array<{ before: number; after: number }> = [];
  for (let index = 0; index < 12; index += 1) {
    const before = await page.evaluate(() => window.scrollY);
    await page.mouse.wheel(0, -180);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(before);
    const after = await page.evaluate(() => window.scrollY);
    samples.push({ before, after });
  }

  expect(samples.every(({ before, after }) => after < before)).toBe(true);
  expect(samples.at(-1)!.after).toBeLessThan(structure.start);
});
