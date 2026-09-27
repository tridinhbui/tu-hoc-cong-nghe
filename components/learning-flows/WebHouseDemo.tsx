"use client";

import { useId, useMemo, useState } from "react";
import { PartyPopper } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);
}

/** Chuỗi JSON nhúng vào <script> phải không chứa `<`, nếu không một cái tên
 *  như "</script>" đóng thẻ sớm. */
function jsString(s: string): string {
  return JSON.stringify(s).replace(/</g, "\\u003c");
}

/* i18n-ignore-start: CSS và mã JavaScript của trang demo - là mã nguồn người
   học đang bật tắt, không phải chữ giao diện. Chữ hiện trong trang đều đến từ
   t.learningFlows.demo. */
const HOUSE_CSS = `
body{margin:0;font-family:system-ui,sans-serif;background:#fef9ef;color:#1c1917;transition:background .3s,color .3s}
body.dark{background:#1c1917;color:#fafaf9}
.house{max-width:420px;margin:16px auto;padding:20px;border-radius:18px;background:#fff;box-shadow:0 8px 30px rgba(0,0,0,.08);border-top:14px solid #2961b8}
body.dark .house{background:#292524}
h1{margin:0 0 6px;font-size:24px;color:#214e96}
body.dark h1{color:#6c9bdc}
p{margin:0 0 14px;color:#57534e}
body.dark p{color:#d6d3d1}
ul{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:0;margin:0 0 16px;list-style:none}
li{padding:14px 6px;border-radius:12px;background:#f3f7fc;text-align:center;font-weight:700;font-size:13px}
body.dark li{background:#1c3862}
.row{display:flex;gap:8px;flex-wrap:wrap}
button{flex:1;padding:10px 12px;border:0;border-radius:10px;background:#f59e0b;color:#1c1917;font-weight:800;cursor:pointer}
button + button{background:#1c1917;color:#fff}
#msg{margin-top:12px;font-weight:700;min-height:1.4em}
`;
/* i18n-ignore-end */

/**
 * "Wow, mình làm được" đầu tiên của hành trình website, trước bất kỳ bài nào.
 *
 * Người học gõ tên mình và thấy trang đổi ngay; rồi tự tay tắt CSS (nhà mất
 * sơn nhưng vẫn đứng) và tắt JavaScript (vẫn đẹp nhưng chuông không reo). Hai
 * cú bật tắt đó CHÍNH LÀ bảng so sánh ngay phía trên, nhưng được cảm thấy
 * thay vì được đọc.
 *
 * HTML không tắt được, có chủ ý: không có khung thì không có nhà, và nút bị
 * khoá cùng dòng giải thích dạy đúng điều đó.
 *
 * iframe `sandbox="allow-scripts"` không kèm allow-same-origin: mã trong trang
 * demo chạy được nhưng không chạm được cookie hay DOM của app.
 */
export default function WebHouseDemo() {
  const { t } = useI18n();
  const d = t.learningFlows.demo;
  const nameId = useId();
  const [name, setName] = useState(d.defaultName);
  const [css, setCss] = useState(true);
  const [js, setJs] = useState(true);

  const srcDoc = useMemo(() => {
    const shown = name.trim() || d.defaultName;
    const heading = escapeHtml(format(d.houseHeading, { name: shown }));
    /* i18n-ignore-start: mã nguồn HTML/JS của trang demo mà người học đang
       bật tắt - thẻ và thuộc tính, không phải chữ. Mọi chữ hiện ra trong
       trang đều đi qua escapeHtml(d.*) hoặc jsString(d.*). */
    const rooms = d.rooms.map((r) => `<li>${escapeHtml(r)}</li>`).join("");
    const style = css ? `<style>${HOUSE_CSS}</style>` : "";
    const script = js
      ? `<script>
document.getElementById("bell").onclick=function(){document.getElementById("msg").textContent=${jsString(d.bellRung)}};
document.getElementById("light").onclick=function(){document.body.classList.toggle("dark")};
</script>`
      : "";
    return `<!doctype html><html><head><meta charset="utf-8">${style}</head><body>
<div class="house">
<h1>${heading}</h1>
<p>${escapeHtml(d.houseIntro)}</p>
<ul>${rooms}</ul>
<div class="row"><button id="bell" type="button">${escapeHtml(d.bellButton)}</button><button id="light" type="button">${escapeHtml(d.lightButton)}</button></div>
<div id="msg">${js ? "" : escapeHtml(d.bellSilent)}</div>
</div>${script}</body></html>`;
    /* i18n-ignore-end */
  }, [name, css, js, d]);

  const chip = (on: boolean, locked = false) =>
    `inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-bold transition-colors ${
      on
        ? "border-brand-600 bg-brand-600 text-white dark:border-brand-500 dark:bg-brand-500 dark:text-stone-950"
        : "border-stone-300 bg-white text-ink-muted hover:border-stone-500 dark:border-stone-600 dark:bg-stone-900"
    } ${locked ? "cursor-not-allowed opacity-90" : ""}`;

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-900">
      <p className="font-black text-ink-max">{d.title}</p>
      <p className="mb-4 text-sm leading-6 text-ink-muted">{d.sub}</p>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="space-y-4">
          <div>
            <label htmlFor={nameId} className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink-muted">
              {d.nameLabel}
            </label>
            <input
              id={nameId}
              value={name}
              maxLength={40}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-base text-ink-max outline-none focus:border-brand-600 dark:border-stone-600 dark:bg-stone-950"
            />
          </div>

          <div className="flex flex-col items-start gap-2">
            <button type="button" aria-pressed disabled className={chip(true, true)} title={d.htmlAlways}>
              {d.toggleHtml}
            </button>
            <p className="-mt-1 text-xs text-ink-muted">{d.htmlAlways}</p>
            <button type="button" aria-pressed={css} onClick={() => setCss((v) => !v)} className={chip(css)}>
              {d.toggleCss}
            </button>
            <button type="button" aria-pressed={js} onClick={() => setJs((v) => !v)} className={chip(js)}>
              {d.toggleJs}
            </button>
          </div>

          <p className="text-sm leading-6 text-ink-body">{d.tryHint}</p>
        </div>

        <iframe
          title={d.iframeTitle}
          sandbox="allow-scripts"
          srcDoc={srcDoc}
          className="h-[330px] w-full rounded-lg border border-stone-200 bg-white dark:border-stone-700"
        />
      </div>

      {name.trim() && name.trim() !== d.defaultName ? (
        <p className="mt-4 flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2 text-sm font-bold text-brand-800 dark:bg-brand-500/10 dark:text-brand-300">
          <PartyPopper className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
          {d.win}
        </p>
      ) : null}
    </div>
  );
}
