"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";

// Máy tính bội số, widget cho các bài khai `interactiveType: "multiples"`.
//
// Thứ widget này phải dạy được là độ NHẠY: cùng một doanh nghiệp, đổi bội số
// trong khoảng mà các công ty so sánh đang giao dịch cũng đủ làm giá trị mỗi
// cổ phiếu nhảy gấp rưỡi. Đọc "định giá so sánh phụ thuộc vào nhóm so sánh"
// thì gật đầu; kéo thanh trượt rồi thấy con số nhảy thì mới thấy vì sao việc
// chọn nhóm so sánh là phần khó nhất của cả phương pháp.
//
// Cũng là chỗ tốt nhất để cầu nối EV và vốn hoá: cùng một EBITDA, hai doanh
// nghiệp khác nhau về nợ ròng cho ra giá cổ phiếu rất khác.

export default function InteractiveMultiples() {
  const { t, locale } = useI18n();
  const [ebitda, setEbitda] = useState(200);
  const [multiple, setMultiple] = useState(8);
  const [netDebt, setNetDebt] = useState(300);
  const [shares, setShares] = useState(50);

  const ev = ebitda * multiple;
  const equity = ev - netDebt;
  const perShare = shares > 0 ? equity / shares : 0;

  // Dải theo bội số ±2 - khoảng mà một nhóm so sánh thật thường trải ra.
  const low = (ebitda * Math.max(1, multiple - 2) - netDebt) / (shares || 1);
  const high = (ebitda * (multiple + 2) - netDebt) / (shares || 1);

  return (
    <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-5 dark:bg-stone-900 dark:border-stone-800">
      <div>
        <h3 className="font-bold text-stone-800 text-lg mb-1 dark:text-stone-100">
          {t.multiplesCalc.title}
        </h3>
        <p className="text-stone-500 text-sm dark:text-stone-400">
          {t.multiplesCalc.desc}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-stone-700 dark:text-stone-300">{t.multiplesCalc.ebitdaLabel}</span>
            <span className="font-bold text-stone-800 dark:text-stone-100">{format(t.multiplesCalc.ebitdaAmount, { amount: ebitda })}</span>
          </div>
          {/* i18n-ignore-start: EBITDA is the same acronym in every language */}
          <input type="range" min={50} max={600} step={10} value={ebitda} onChange={(e) => setEbitda(+e.target.value)} className="w-full" aria-label="EBITDA" />
          {/* i18n-ignore-end */}
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-stone-700 dark:text-stone-300">{t.multiplesCalc.multipleLabel}</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{format(t.multiplesCalc.multipleAmount, { amount: multiple })}</span>
          </div>
          <input type="range" min={3} max={20} value={multiple} onChange={(e) => setMultiple(+e.target.value)} className="w-full" aria-label={t.multiplesCalc.multipleAriaLabel} />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-stone-700 dark:text-stone-300">{t.multiplesCalc.netDebtLabel}</span>
            <span className="font-bold text-stone-800 dark:text-stone-100">{format(t.multiplesCalc.netDebtAmount, { amount: netDebt })}</span>
          </div>
          <input type="range" min={-200} max={1200} step={20} value={netDebt} onChange={(e) => setNetDebt(+e.target.value)} className="w-full" aria-label={t.multiplesCalc.netDebtAriaLabel} />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-stone-700 dark:text-stone-300">{t.multiplesCalc.sharesLabel}</span>
            <span className="font-bold text-stone-800 dark:text-stone-100">{format(t.multiplesCalc.sharesAmount, { amount: shares })}</span>
          </div>
          <input type="range" min={10} max={200} step={5} value={shares} onChange={(e) => setShares(+e.target.value)} className="w-full" aria-label={t.multiplesCalc.sharesAriaLabel} />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-stone-50 p-3 dark:bg-stone-800/60">
          <p className="text-[11px] font-bold text-stone-500 dark:text-stone-400">{t.multiplesCalc.evLabel}</p>
          <p className="text-lg font-extrabold text-stone-900 dark:text-stone-100">{format(t.multiplesCalc.evAmount, { amount: ev.toLocaleString(intlLocale(locale)) })}</p>
        </div>
        <div className="rounded-2xl bg-stone-50 p-3 dark:bg-stone-800/60">
          <p className="text-[11px] font-bold text-stone-500 dark:text-stone-400">{t.multiplesCalc.equityLabel}</p>
          <p className={`text-lg font-extrabold ${equity < 0 ? "text-rose-600 dark:text-rose-400" : "text-stone-900 dark:text-stone-100"}`}>
            {format(t.multiplesCalc.equityAmount, { amount: equity.toLocaleString(intlLocale(locale)) })}
          </p>
        </div>
        <div className="rounded-2xl bg-emerald-50 p-3 dark:bg-emerald-950/30">
          <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">{t.multiplesCalc.perShareLabel}</p>
          <p className="text-lg font-extrabold text-emerald-700 dark:text-emerald-300">
            {format(t.multiplesCalc.perShareAmount, { amount: perShare.toFixed(1) })}
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-stone-50 p-4 dark:bg-stone-800/60">
        <p className="text-sm text-stone-700 dark:text-stone-200">
          {t.multiplesCalc.rangePart1} {format(t.multiplesCalc.rangeMultipleX, { multiple: Math.max(1, multiple - 2) })} {t.multiplesCalc.rangePart2}{" "}
          {format(t.multiplesCalc.rangeMultipleX, { multiple: multiple + 2 })}, {t.multiplesCalc.rangePart3}{" "}
          <b>{format(t.multiplesCalc.rangeAmount, { amount: low.toFixed(1) })}</b> {t.multiplesCalc.rangePart4}{" "}
          <b>{format(t.multiplesCalc.rangeAmountThousand, { amount: high.toFixed(1) })}</b>.
        </p>
        <p className="mt-1.5 text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">
          {t.multiplesCalc.footnote}
        </p>
      </div>
    </div>
  );
}
