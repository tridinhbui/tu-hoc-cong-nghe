"use client";

import { useState } from "react";
import {
  computeTax,
  INSURANCE_RATE,
  SCHEDULE_2026,
  SCHEDULE_PRE_2026,
  type TaxSchedule,
} from "@/lib/vn-income-tax";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";
import type { Locale } from "@/lib/i18n/locales";

// Cắt lát thu nhập theo bậc thuế, widget cho các bài khai `interactiveType:
// "tax-brackets"`.
//
// Cả chặng Thuế xoay quanh một hiểu lầm duy nhất, và nó bền tới mức mỗi lần
// tăng lương lại có người hỏi lại: "lên bậc thuế thì có bị đánh thuế cao hơn
// trên toàn bộ thu nhập không". Không. Chỉ phần vượt ngưỡng chịu thuế suất mới.
//
// Chữ nói câu đó xong thì người đọc gật, và vẫn không tin. Thứ làm người ta
// tin là nhìn thấy thu nhập của chính mình bị cắt thành từng lát, mỗi lát một
// màu, và thấy lát cuối cùng nhỏ tới mức nào so với phần còn lại. Nên widget
// vẽ các lát chứ không chỉ in ra một con số thuế.
//
// Hai biểu thuế đặt cạnh nhau vì kho có một bài riêng về cải cách 2026, và so
// sánh chỉ có nghĩa khi cùng một hồ sơ chạy qua cả hai.

const COLORS = [
  "bg-emerald-400 dark:bg-emerald-600",
  "bg-sky-400 dark:bg-sky-600",
  "bg-amber-400 dark:bg-amber-600",
  "bg-orange-400 dark:bg-orange-600",
  "bg-rose-400 dark:bg-rose-600",
  "bg-fuchsia-400 dark:bg-fuchsia-600",
  "bg-stone-500 dark:bg-stone-400",
];

function fmt(trieu: number, t: Dictionary, locale: Locale) {
  return trieu >= 1
    ? format(t.taxBrackets.millionUnit, { value: trieu.toLocaleString(intlLocale(locale), { maximumFractionDigits: 2 }) })
    : format(t.taxBrackets.thousandUnit, { value: Math.round(trieu * 1000).toLocaleString(intlLocale(locale)) });
}

export default function InteractiveTaxBrackets() {
  const { t, locale } = useI18n();
  const [gross, setGross] = useState(30);
  const [dependents, setDependents] = useState(0);
  // Mặc định mở ở biểu ĐANG có hiệu lực. Bản trước mặc định "current" trỏ tới
  // biểu 7 bậc với giảm trừ 11/4,4 - từ kỳ tính thuế 2026 thì con số đó không
  // còn đúng, nên người học mở bài ra là thấy một mức lương net sai, kèm cái
  // nhãn nói rằng nó đang đúng.
  const [scheduleId, setScheduleId] = useState<"pre2026" | "2026">("2026");

  const schedule: TaxSchedule = scheduleId === "pre2026" ? SCHEDULE_PRE_2026 : SCHEDULE_2026;
  const other: TaxSchedule = scheduleId === "pre2026" ? SCHEDULE_2026 : SCHEDULE_PRE_2026;
  const r = computeTax(gross, dependents, schedule);
  const alt = computeTax(gross, dependents, other);
  const diff = alt.tax - r.tax;

  // Thêm một triệu nữa thì nộp thêm bao nhiêu - con số trả lời thẳng câu hỏi
  // "tăng lương có bị lỗ không".
  const nextMillion = computeTax(gross + 1, dependents, schedule).tax - r.tax;

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
      <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
        {t.taxBrackets.title}
      </h3>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Row label={t.taxBrackets.grossSalaryLabel} value={format(t.taxBrackets.grossSalaryValue, { value: gross })}>
          <input
            type="range" min={5} max={150} step={1} value={gross}
            onChange={(e) => setGross(Number(e.target.value))} aria-label={t.taxBrackets.grossSalaryAriaLabel}
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100"
          />
        </Row>
        <Row label={t.taxBrackets.dependentsLabel} value={`${dependents}`}>
          <input
            type="range" min={0} max={4} step={1} value={dependents}
            onChange={(e) => setDependents(Number(e.target.value))} aria-label={t.taxBrackets.dependentsAriaLabel}
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100"
          />
        </Row>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {(["2026", "pre2026"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setScheduleId(id)}
            aria-pressed={scheduleId === id}
            className={`cursor-pointer rounded-full px-3 py-1.5 text-[11px] font-bold ${
              scheduleId === id
                ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300"
            }`}
          >
            {t.taxSchedules[id] ?? (id === "pre2026" ? SCHEDULE_PRE_2026 : SCHEDULE_2026).label}
          </button>
        ))}
      </div>

      {/* Ba khoản trừ trước khi chạm tới bậc thuế nào - phần lớn người tưởng
          thuế tính thẳng trên lương gộp. */}
      <div className="mt-4 space-y-1 rounded-2xl bg-stone-50 p-3 text-[12px] dark:bg-stone-800/60">
        <Line label={t.taxBrackets.grossSalaryLineLabel} value={fmt(gross, t, locale)} />
        <Line
          label={format(t.taxBrackets.insuranceLineLabel, { rate: (INSURANCE_RATE * 100).toFixed(1) })}
          value={`−${fmt(r.insurance, t, locale)}`}
        />
        <Line
          label={
            dependents
              ? format(t.taxBrackets.deductionLineWithDependents, { count: dependents })
              : t.taxBrackets.deductionLineLabel
          }
          value={`−${fmt(r.deduction, t, locale)}`}
        />
        <div className="border-t border-stone-200 pt-1 dark:border-stone-700">
          <Line label={t.taxBrackets.taxableIncomeLineLabel} value={fmt(r.taxableIncome, t, locale)} bold />
        </div>
      </div>

      {r.slices.length > 0 ? (
        <>
          <div className="mt-4 flex h-7 w-full overflow-hidden rounded-full" role="img"
            aria-label={format(t.taxBrackets.slicesAriaLabel, { count: r.slices.length })}>
            {r.slices.map((s, i) => (
              <div
                key={i}
                className={COLORS[i % COLORS.length]}
                style={{ width: `${(s.amount / r.taxableIncome) * 100}%` }}
                title={format(t.taxBrackets.sliceTitle, { rate: (s.rate * 100).toFixed(0), amount: fmt(s.amount, t, locale) })}
              />
            ))}
          </div>
          <div className="mt-2 space-y-1">
            {r.slices.map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-[11px]">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-sm ${COLORS[i % COLORS.length]}`} />
                <span className="text-stone-600 dark:text-stone-300">
                  {format(t.taxBrackets.sliceLine, { amount: fmt(s.amount, t, locale), rate: (s.rate * 100).toFixed(0) })}
                </span>
                <span className="ml-auto font-bold tabular-nums text-stone-800 dark:text-stone-100">
                  {fmt(s.tax, t, locale)}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-4 rounded-2xl border border-dashed border-stone-300 px-3 py-2 text-[12px] text-stone-500 dark:border-stone-700 dark:text-stone-400">
          {t.taxBrackets.noTaxableIncomeNote}
        </p>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Card label={t.taxBrackets.taxDueLabel} value={fmt(r.tax, t, locale)} />
        <Card label={t.taxBrackets.marginalRateLabel} value={`${(r.marginalRate * 100).toFixed(0)}%`} tone="warn" />
        <Card label={t.taxBrackets.effectiveRateLabel} value={`${(r.effectiveRate * 100).toFixed(1)}%`} tone="good" />
      </div>

      <p className="mt-4 rounded-2xl bg-stone-50 p-4 text-xs leading-relaxed text-stone-600 dark:bg-stone-800/60 dark:text-stone-300">
        {format(t.taxBrackets.summaryText, {
          marginalRate: (r.marginalRate * 100).toFixed(0),
          effectiveRate: (r.effectiveRate * 100).toFixed(1),
          nextMillion: fmt(nextMillion, t, locale),
        })}{" "}
        {diff > 0.001
          ? format(t.taxBrackets.scheduleEarnsMoreNote, { label: other.label, amount: fmt(diff, t, locale) })
          : diff < -0.001
            ? format(t.taxBrackets.scheduleEarnsLessNote, { label: other.label, amount: fmt(-diff, t, locale) })
            : t.taxBrackets.scheduleSameNote}
      </p>

      <p className="mt-2 text-[10px] leading-relaxed text-stone-400 dark:text-stone-500">
        {format(t.taxBrackets.modelNote, { rate: (INSURANCE_RATE * 100).toFixed(1) })}
      </p>
    </div>
  );
}

function Row({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs font-bold text-stone-700 dark:text-stone-200">{label}</span>
        <span className="text-[11px] font-semibold tabular-nums text-stone-500 dark:text-stone-400">{value}</span>
      </div>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function Line({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className={bold ? "font-bold text-stone-800 dark:text-stone-100" : "text-stone-600 dark:text-stone-300"}>
        {label}
      </span>
      <span className={`tabular-nums ${bold ? "font-extrabold text-stone-900 dark:text-stone-50" : "text-stone-700 dark:text-stone-200"}`}>
        {value}
      </span>
    </div>
  );
}

function Card({ label, value, tone }: { label: string; value: string; tone?: "good" | "warn" }) {
  const color =
    tone === "good"
      ? "text-emerald-600 dark:text-emerald-400"
      : tone === "warn"
        ? "text-amber-600 dark:text-amber-400"
        : "text-stone-800 dark:text-stone-100";
  return (
    <div className="rounded-2xl border border-stone-200 p-3 dark:border-stone-800">
      <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400">{label}</p>
      <p className={`mt-0.5 text-lg font-extrabold tabular-nums ${color}`}>{value}</p>
    </div>
  );
}
