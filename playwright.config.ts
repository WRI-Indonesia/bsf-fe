import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3000";
const { hostname, port, protocol } = new URL(baseURL);
const useExistingServer = process.env.PLAYWRIGHT_USE_EXISTING_SERVER === "true";

if (protocol !== "http:") {
  throw new Error("PLAYWRIGHT_BASE_URL must use http:// for the local e2e server.");
}

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  globalSetup: "./e2e/support/global-setup.ts",
  outputDir: "test-results/playwright",
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "off",
  },
  webServer: {
    command: `npm run build && npm run start -- --hostname ${hostname} --port ${port || "3000"}`,
    reuseExistingServer: useExistingServer,
    timeout: 240 * 1000,
    url: baseURL,
  },
  workers: 1,
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
