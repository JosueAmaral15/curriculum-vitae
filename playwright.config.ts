import { defineConfig, devices } from "@playwright/test";

const staticOutputDirectory = process.env.PLAYWRIGHT_OUTPUT_DIR ?? "out";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  use: { baseURL: "http://127.0.0.1:3001", trace: "on-first-retry" },
  webServer: { command: `npx serve ${staticOutputDirectory} --listen 3001`, url: "http://127.0.0.1:3001", reuseExistingServer: true },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
