import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    exclude: ["**/node_modules/**", "**/.node_modules-interrupted-install/**", "tests/e2e/**"],
    pool: "vmForks",
    minWorkers: 1,
    maxWorkers: 1,
  },
});
