import { expect, test } from "@playwright/test";

test("shows English by default, has contact paths, and can switch to Portuguese", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /clear systems/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /signals searching for meaning/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /send email/i })).toHaveAttribute("href", /mailto:/);
  await expect(page.getByRole("link", { name: /start a conversation on whatsapp/i })).toHaveAttribute("href", "https://wa.me/5521999526162");
  await page.getByRole("button", { name: "PT" }).click();
  await expect(page.getByRole("heading", { name: /sistemas claros/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /sinais procurando sentido/i })).toBeVisible();
});

test("removes decorative video for visitors who prefer reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator("video")).toBeHidden();
});
