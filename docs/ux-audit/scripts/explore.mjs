import { chromium } from "playwright";
import { measure } from "./measure.mjs";
const BASE = process.env.BASE || "http://localhost:4000";
const OUT = process.argv[2] || "before";
const paths = (process.argv[3] || "/,/login").split(",");
const vps = { desktop: { width: 1440, height: 900 }, tablet: { width: 768, height: 1024 }, m375: { width: 375, height: 812 }, m390: { width: 390, height: 844 } };
const browser = await chromium.launch();
const ctx = await browser.newContext({ storageState: process.env.STATE || undefined });
const res = [];
for (const p of paths) for (const [vn, vp] of Object.entries(vps)) {
  const page = await ctx.newPage(); await page.setViewportSize(vp);
  const errs = []; page.on("pageerror", (e) => errs.push(e.message.slice(0, 120)));
  const t0 = Date.now();
  await page.goto(BASE + p, { waitUntil: "networkidle", timeout: 120000 }).catch(() => {});
  await page.waitForTimeout(800);
  const m = await measure(page); m.vp = vn; m.loadMs = Date.now() - t0; m.errors = errs;
  const slug = (p === "/" ? "home" : p.replace(/\//g, "_")) + "-" + vn;
  await page.screenshot({ path: `${OUT}/${slug}-fold.png` });
  if (vn === "desktop" || vn === "m375") await page.screenshot({ path: `${OUT}/${slug}-full.png`, fullPage: true });
  res.push(m); await page.close();
}
await browser.close();
console.log(JSON.stringify(res, null, 1));
