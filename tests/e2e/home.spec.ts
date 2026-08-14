import { expect, test } from "@playwright/test";

test("shows the professional profile and contact path", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /sistemas claros/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /entrar em contato/i })).toHaveAttribute("href", /mailto:/);
  await expect(page.getByRole("link", { name: /ver projetos/i })).toHaveAttribute("href", "#projetos");
});
