"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

// Biểu đồ so sánh lãi đơn với lãi kép, widget cho các bài khai
// `interactiveType: "chart"`.
//
// Chọn đúng phép so sánh này vì nó là thứ duy nhất trong toàn bộ chương trình
// mà một biểu đồ dạy được còn một câu văn thì không: khoảng cách giữa hai
// đường gần như không thấy trong mấy năm đầu rồi mở toác ra về sau. Đọc "lãi
// kép mạnh về dài hạn" thì gật đầu; nhìn hai đường tách nhau thì mới tin.

const WIDTH = 320;
const HEIGHT = 150;

export default function InteractiveChart() {
  const { t } = useI18n();
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(20);

  const { compoundPath, simplePath, compoundEnd, simpleEnd } = useMemo(() => {
    const compound: number[] = [];
    const simple: number[] = [];
    for (let y = 0; y <= years; y++) {
      compound.push(Math.pow(1 + rate / 100, y));
      simple.push(1 + (rate / 100) * y);
    }
    const max = Math.max(compound[compound.length - 1], 1.2);
    const toPath = (series: number[]) =>
      series
        .map((v, i) => {
          const x = (i / Math.max(1, years)) * WIDTH;
          const yPos = HEIGHT - ((v - 1) / (max - 1 || 1)) * (HEIGHT - 8);
          return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${yPos.toFixed(1)}`;
        })
        .join(" ");
    return {
      compoundPath: toPath(compound),
      simplePath: toPath(simple),
      compoundEnd: compound[compound.length - 1],
      simpleEnd: simple[simple.length - 1],
    };
  }, [rate, years]);

  const gap = compoundEnd - simpleEnd;

  return (
    <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-6 dark:bg-stone-900 dark:border-stone-800">
      <div>
        <h3 className="font-bold text-stone-800 text-lg mb-1 dark:text-stone-100">
          {t.chartDemo.title}
        </h3>
        <p className="text-stone-500 text-sm dark:text-stone-400">
          {t.chartDemo.subtitle}
        </p>
      </div>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        role="img"
        aria-label={format(t.chartDemo.chartAriaLabel, {
          years,
          rate,
          compound: (compoundEnd * 100).toFixed(0),
          simple: (simpleEnd * 100).toFixed(0),
        })}
      >
        <line x1={0} y1={HEIGHT} x2={WIDTH} y2={HEIGHT} className="stroke-stone-200 dark:stroke-stone-700" strokeWidth={1} />
        <path d={simplePath} fill="none" className="stroke-stone-400" strokeWidth={2} strokeDasharray="4 3" />
        <path d={compoundPath} fill="none" className="stroke-emerald-500" strokeWidth={2.5} />
      </svg>

      <div className="flex flex-wrap gap-x-5 gap-y-1 text-[11px]">
        <span className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300">
          <span className="inline-block h-0.5 w-4 bg-emerald-500" /> {t.chartDemo.compoundLegend}
        </span>
        <span className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300">
          <span className="inline-block h-0.5 w-4 border-t-2 border-dashed border-stone-400" /> {t.chartDemo.simpleLegend}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-stone-700 dark:text-stone-300">{t.chartDemo.rateLabel}</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{rate}%</span>
          </div>
          <input
            type="range"
            min={1}
            max={20}
            value={rate}
            onChange={(e) => setRate(+e.target.value)}
            className="w-full"
            aria-label={t.chartDemo.rateAriaLabel}
          />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-stone-700 dark:text-stone-300">{t.chartDemo.yearsLabel}</span>
            <span className="font-bold text-stone-800 dark:text-stone-100">{format(t.chartDemo.yearsValueSuffix, { years })}</span>
          </div>
          <input
            type="range"
            min={1}
            max={40}
            value={years}
            onChange={(e) => setYears(+e.target.value)}
            className="w-full"
            aria-label={t.chartDemo.yearsAriaLabel}
          />
        </div>
      </div>

      <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
        <p className="text-sm text-stone-700 dark:text-stone-200">
          {format(t.chartDemo.summaryPart1, { years })}{" "}
          <b>{format(t.chartDemo.summaryCompound, { compound: (compoundEnd * 100).toFixed(0) })}</b>
          {t.chartDemo.summaryPart2}{" "}
          <b>{format(t.chartDemo.summarySimple, { simple: (simpleEnd * 100).toFixed(0) })}</b>
          {t.chartDemo.summaryPart3}{" "}
          <b>{format(t.chartDemo.summaryGap, { gap: (gap * 100).toFixed(0) })}</b>{" "}
          {t.chartDemo.summaryPart4}
        </p>
        <p className="mt-1.5 text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">
          {t.chartDemo.summaryHint}
        </p>
      </div>
    </div>
  );
}
