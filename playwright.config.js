import { defineConfig, devices } from "@playwright/test";
const baseURL = process.env.FITPOOL_TEST_URL || "http://127.0.0.1:5173";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 35000,
  use: {
    baseURL,
    channel: "chrome",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
    {
      name: "mobile",
      use: {
        ...devices["iPhone 13"],
        defaultBrowserType: "chromium",
        channel: "chrome",
      },
    },
  ],
  webServer: process.env.FITPOOL_TEST_URL
    ? undefined
    : {
        command: "npm run dev -- --host 127.0.0.1 --port 5173 --strictPort",
        url: "http://127.0.0.1:5173",
        reuseExistingServer: !process.env.CI,
      },
});
