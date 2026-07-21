import { test, expect } from "@playwright/test";

// Manual-only smoke suite (npm run test:e2e - see playwright.config.ts).
// Scoped to what's testable WITHOUT a real Supabase session: the public
// marketing/login pages render, and proxy.ts's auth gate (lib default-deny
// route gate - see proxy.ts's PUBLIC_PATHS/PUBLIC_PREFIXES) correctly
// redirects protected routes to /login instead of leaking content. A full
// login -> dashboard -> lesson -> quiz flow needs a seeded test account and
// is left for a future pass once that's available.

test.describe("public pages render", () => {
  test("homepage loads and shows the marketing content", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/Tự học Tài chính/i);
  });

  test("login page loads with the login form", async ({ page }) => {
    const response = await page.goto("/login");
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("form, input[type='email']").first()).toBeVisible();
  });

  test("service worker script is served as JS, not redirected to login", async ({ page }) => {
    // Regression test for the bug found while building web push
    // notifications: proxy.ts's matcher excluded image assets but not
    // .js files, so /sw.js was silently redirected to /login instead of
    // registering as a service worker.
    const response = await page.goto("/sw.js");
    expect(response?.status()).toBe(200);
    const contentType = response?.headers()["content-type"] ?? "";
    expect(contentType).toContain("javascript");
  });
});

test.describe("protected routes require auth", () => {
  const protectedPaths = ["/dashboard", "/settings", "/cong-dong", "/ban-be", "/admin/messages"];

  for (const path of protectedPaths) {
    test(`${path} redirects an anonymous visitor to /login`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveURL(/\/login/);
    });
  }
});
