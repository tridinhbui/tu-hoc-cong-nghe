import { defineConfig, devices } from "@playwright/test";

// Manual-only smoke suite (npm run test:e2e) - not wired into CI, see
// IMPROVEMENTS.md/plan notes: Playwright needs a headless browser download
// and adds real minutes to every PR, so it's opt-in for now rather than
// gating merges.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
