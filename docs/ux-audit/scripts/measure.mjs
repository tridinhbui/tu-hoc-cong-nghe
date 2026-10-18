// Đo một trang: mật độ chữ, số phần tử bấm được, vùng chạm nhỏ, chữ nhỏ,
// tương phản thấp, tràn ngang. Dùng chung cho trước/sau.
export async function measure(page) {
  return await page.evaluate(() => {
    const vw = window.innerWidth, vh = window.innerHeight;
    const vis = (el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none" && Number(s.opacity) > 0.05;
    };
    const inFold = (el) => { const r = el.getBoundingClientRect(); return r.top < vh && r.bottom > 0; };
    const parse = (c) => { const m = c.match(/[\d.]+/g); return m ? m.map(Number) : [0, 0, 0, 0]; };
    const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const bgOf = (el) => { let e = el; while (e) { const c = parse(getComputedStyle(e).backgroundColor); if (c.length === 4 ? c[3] > 0.5 : c.length === 3) return c; e = e.parentElement; } return [255, 255, 255]; };
    const interactive = [...document.querySelectorAll("a[href],button,input,select,textarea,[role=button],[role=tab]")].filter(vis);
    const fold = interactive.filter(inFold);
    const smallTargets = interactive.filter((el) => { const r = el.getBoundingClientRect(); return r.width < 44 && r.height < 44 || r.height < 24; });
    let words = 0, foldWords = 0, small = 0, lowContrast = 0; const lowSamples = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const seen = new Set();
    while (walker.nextNode()) {
      const t = walker.currentNode; const el = t.parentElement; const txt = t.textContent.trim();
      if (!txt || !el || !vis(el) || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(el.tagName)) continue;
      const n = txt.split(/\s+/).length; words += n; if (inFold(el)) foldWords += n;
      if (seen.has(el)) continue; seen.add(el);
      const s = getComputedStyle(el); const fs = parseFloat(s.fontSize);
      if (fs < 13) small++;
      const fg = parse(s.color), bg = bgOf(el);
      const L1 = lum(fg), L2 = lum(bg); const cr = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      const large = fs >= 24 || (fs >= 18.66 && Number(s.fontWeight) >= 700);
      if (cr < (large ? 3 : 4.5) && (fg.length < 4 || fg[3] > 0.5)) { lowContrast++; if (lowSamples.length < 6) lowSamples.push(`${txt.slice(0, 40)} (${cr.toFixed(2)})`); }
    }
    const h1 = [...document.querySelectorAll("h1")].filter(vis).map((h) => h.innerText.trim().slice(0, 80));
    const primaryCtas = fold.filter((el) => { const s = getComputedStyle(el); const bg = parse(s.backgroundColor); return (bg.length === 3 || bg[3] > 0.5) && lum(bg) < 0.4 && el.getBoundingClientRect().height >= 36; }).map((el) => el.innerText.trim().slice(0, 40)).filter(Boolean);
    return {
      url: location.pathname, title: document.title, h1,
      words, foldWords, interactive: interactive.length, foldInteractive: fold.length,
      primaryCtasInFold: primaryCtas, smallTargets: smallTargets.length, smallText: small,
      lowContrast, lowSamples,
      overflowX: document.documentElement.scrollWidth > vw + 1, scrollScreens: +(document.documentElement.scrollHeight / vh).toFixed(1),
    };
  });
}
