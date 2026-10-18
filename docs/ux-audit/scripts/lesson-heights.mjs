import { chromium } from "playwright";
const url = process.argv[2]; const w = +(process.argv[3] ?? 390), h = w === 390 ? 844 : 900;
const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: w < 768, hasTouch: w < 768 });
const p = await ctx.newPage(); await p.goto(url, { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
for (const lbl of ["Để sau"]) { const x = p.getByRole("button", { name: lbl }); if (await x.count()) await x.first().click().catch(()=>{}); }
await p.waitForTimeout(800);
const r = await p.evaluate(() => {
  const H = document.documentElement.scrollHeight, vh = innerHeight;
  const rows = [];
  const art = document.querySelector("article");
  const walk = (el, depth) => { for (const c of el.children) { const r = c.getBoundingClientRect(); if (r.height < 30) continue; rows.push({ d: depth, h: Math.round(r.height), t: (c.innerText || "").replace(/\s+/g, " ").slice(0, 60) }); if (depth < 2 && r.height > 1500) walk(c, depth + 1); } };
  if (art) walk(art, 0);
  const aside = document.querySelector("#lesson-quiz"); 
  return { H, screens: +(H / vh).toFixed(1), words: document.body.innerText.split(/\s+/).length, aside: aside ? Math.round(aside.getBoundingClientRect().height) : 0, rows };
});
console.log(JSON.stringify({ H: r.H, screens: r.screens, words: r.words, aside: r.aside }));
for (const x of r.rows) console.log("  ".repeat(x.d) + x.h, x.t);
await b.close();
