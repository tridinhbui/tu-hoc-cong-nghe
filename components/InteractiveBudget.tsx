"use client";

import { useMemo, useState } from "react";
import { Calculator, HardDrive } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

// Bộ chia dung lượng - widget cho các bài khai `interactiveType: "budget"`.
//
// Điểm khác biệt so với một máy tính chia ba phần: nó tính ra SỐ THÁNG tới
// mốc dự phòng, không chỉ tính ra ba con số. Bài học của cả chặng dung lượng
// nằm ở TỶ LỆ để trống chứ không ở lượng để trống, và cách duy nhất để người
// đọc cảm được điều đó là kéo thanh trượt rồi thấy đích đến gần lại - hoặc
// lùi xa - ngay trước mắt.
//
// Phép tính: ba phần cộng lại bằng 100%, mốc bằng sáu lần phần đang dùng, số kỳ bằng mốc
// chia phần để trống. Chỉ chữ đổi.

function getCategories(t: Dictionary) {
  return [
    { key: "needs", label: t.budgetSim.categoryNeedsLabel, hint: t.budgetSim.categoryNeedsHint, tone: "bg-stone-700 dark:bg-stone-300" },
    { key: "wants", label: t.budgetSim.categoryWantsLabel, hint: t.budgetSim.categoryWantsHint, tone: "bg-stone-300 dark:bg-stone-600" },
    { key: "save", label: t.budgetSim.categorySaveLabel, hint: t.budgetSim.categorySaveHint, tone: "bg-brand-600 dark:bg-brand-500" },
  ] as const;
}

export default function InteractiveBudget() {
  const { t } = useI18n();
  const CATEGORIES = useMemo(() => getCategories(t), [t]);
  const [income, setIncome] = useState(20);
  const [needs, setNeeds] = useState(50);
  const [wants, setWants] = useState(30);

  const save = Math.max(0, 100 - needs - wants);
  const share = { needs, wants, save };

  const saveAmount = (income * save) / 100;
  const monthlyCost = (income * (needs + wants)) / 100;
  // Quỹ khẩn cấp sáu tháng chi phí - mốc được nhắc xuyên suốt chặng đầu.
  const target = monthlyCost * 6;
  const months = saveAmount > 0 ? Math.ceil(target / saveAmount) : Infinity;

  return (
    <div className="space-y-6 rounded-md border border-line-strong bg-white p-6 dark:border-stone-700 dark:bg-stone-900">
      <div>
        <h3 className="flex items-center gap-2 mb-1 text-lg font-black tracking-tight text-ink-max">
          <Calculator aria-hidden className="h-5 w-5 text-ink-muted" strokeWidth={1.75} /> {t.budgetSim.title}
        </h3>
        <p className="text-sm text-ink-soft">
          {t.budgetSim.subtitle}
        </p>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="inline-flex items-center gap-1.5 font-medium text-ink-body"><HardDrive aria-hidden className="h-4 w-4 text-ink-muted" strokeWidth={1.75} /> {t.budgetSim.incomeLabel}</span>
          <span className="font-bold tabular-nums text-ink-max">
            {format(t.budgetSim.incomeAmount, { amount: income })}
          </span>
        </div>
        <input
          type="range"
          min={5}
          max={80}
          value={income}
          onChange={(e) => setIncome(+e.target.value)}
          className="w-full"
          aria-label={t.budgetSim.incomeAriaLabel}
        />
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-ink-body">{t.budgetSim.categoryNeedsLabel}</span>
            <span className="font-mono font-medium tabular-nums text-ink-max">{needs}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={needs}
            onChange={(e) => setNeeds(Math.min(+e.target.value, 100 - wants))}
            className="w-full"
            aria-label={t.budgetSim.needsAriaLabel}
          />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-ink-body">{t.budgetSim.categoryWantsLabel}</span>
            <span className="font-mono font-medium tabular-nums text-ink-max">{wants}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={wants}
            onChange={(e) => setWants(Math.min(+e.target.value, 100 - needs))}
            className="w-full"
            aria-label={t.budgetSim.wantsAriaLabel}
          />
        </div>
      </div>

      {/* Một thanh duy nhất thay vì ba con số rời: mắt đọc tỷ lệ nhanh hơn đọc
          phần trăm, và tỷ lệ mới là thứ bài học nói tới. */}
      <div className="flex h-3 w-full overflow-hidden rounded-xs border border-line-strong">
        {CATEGORIES.map((c) => (
          <div
            key={c.key}
            className={c.tone}
            style={{ width: `${share[c.key]}%` }}
            title={`${c.label}: ${share[c.key]}%`}
          />
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {CATEGORIES.map((c) => (
          <div key={c.key} className="rounded-sm border border-stone-200 bg-page p-3 dark:border-stone-800 dark:bg-stone-950">
            <p className="text-xs font-bold text-ink-soft">{c.label}</p>
            <p className="text-lg font-black tabular-nums text-ink-max">
              {format(t.budgetSim.categoryAmount, { amount: ((income * share[c.key]) / 100).toFixed(1) })}
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-ink-faint">{c.hint}</p>
          </div>
        ))}
      </div>

      <div
        className={`border-l-2 pl-4 ${
          save === 0
            ? "border-red-600 dark:border-red-400"
            : months <= 12
              ? "border-brand-600 dark:border-brand-400"
              : "border-amber-500"
        }`}
      >
        {save === 0 ? (
          <p className="text-sm font-semibold text-alert-strong">
            {t.budgetSim.noSavingsMessage}
          </p>
        ) : (
          <p className="text-sm text-ink-body">
            {t.budgetSim.savingsPart1} <b>{format(t.budgetSim.savingsAmount, { amount: saveAmount.toFixed(1) })}</b>{" "}
            {t.budgetSim.savingsPart2}{" "}
            (<b>{format(t.budgetSim.savingsTarget, { amount: target.toFixed(0) })}</b>) {t.budgetSim.savingsPart3}{" "}
            <b>{format(t.budgetSim.savingsMonths, { months })}</b>{t.budgetSim.savingsPart4}
          </p>
        )}
        <p className="mt-1.5 text-[11px] leading-relaxed text-ink-muted">
          {t.budgetSim.footerNote}
        </p>
      </div>
    </div>
  );
}
