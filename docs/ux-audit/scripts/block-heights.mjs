// Chiều cao từng khối dùng chung (sơ đồ từng bước, tình huống, bảng khái niệm)
// trên một trang bài, ở một bề rộng. Một dòng JSON mỗi bài. Mở cả mục gập
// "Học sâu hơn", vì phần lớn khối dùng chung nằm ở đó (lib/lesson-block-budget):
// `main` là mạch chính, `deep` là trong mục gập.
// node block-heights.mjs <url-gốc> <bề-rộng> <slug>...
import { chromium } from "playwright";
const [base, width, ...slugs] = process.argv.slice(2);
const w = +width, h = w === 390 ? 844 : 900;
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: w < 768, hasTouch: w < 768 });
for (const slug of slugs) {
  const p = await ctx.newPage();
  await p.goto(`${base}/bai-hoc/${slug}`, { waitUntil: "networkidle" });
  await p.waitForTimeout(2500);
  const deepBtn = p.locator("button[aria-controls=lesson-deep-dive]");
  if (await deepBtn.count()) { await deepBtn.first().click(); await p.waitForTimeout(2500); }
  const r = await p.evaluate(() => {
    const art = document.querySelector("article")?.parentElement ?? document.body;
    const deep = document.getElementById("lesson-deep-dive");
    const hh = (el) => [deep?.contains(el) ? "deep" : "main", Math.round(el.getBoundingClientRect().height)].join(":");
    // Khối trong cùng chứa dấu hiệu, không phải mọi <section> bọc ngoài nó.
    const innermost = (mark) => [...art.querySelectorAll("section")].filter((s) => s.querySelector(mark) && ![...s.querySelectorAll("section")].some((c) => c.querySelector(mark))).map(hh);
    const flow = innermost("[data-testid=flow-detail]");
    const scenario = innermost(":scope > header svg.lucide-git-branch");
    const concept = [...art.querySelectorAll("dl.divide-y")].map((d) => hh(d.parentElement));
    return { flow, scenario, concept };
  });
  console.log(JSON.stringify({ slug, ...r }));
  await p.close();
}
await b.close();
