"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

// Sửa bảng cân đối, xem cả loạt chỉ số động đậy cùng lúc, widget cho các bài
// khai `interactiveType: "ratios"`.
//
// Học chỉ số kiểu mỗi bài một công thức để lại một lỗ hổng: người học nhớ
// current ratio là gì, quick ratio là gì, nhưng không thấy chúng NỐI với nhau.
// Mà đó mới là chỗ đọc ra được điều gì: current ratio 2,4 nghe an toàn, cho tới
// khi nhìn sang quick ratio 0,6 và hiểu rằng gần hết tài sản ngắn hạn đang nằm
// trong kho chứ không phải tiền. Một doanh nghiệp như vậy vẫn có thể không trả
// nổi lương tháng sau.
//
// Nên widget có một bộ số duy nhất và năm chỉ số cùng đọc từ đó. Kéo tồn kho
// lên là thấy hai chỉ số thanh khoản tách đôi ra ngay - thứ không nhìn thấy
// được khi mỗi chỉ số nằm ở một bài riêng.

interface Ratio {
  name: string;
  value: number;
  formula: string;
  /** Ngưỡng thường dùng để đọc nhanh. Không phải luật - bán lẻ sống khoẻ với
   *  current ratio dưới 1, nên phần diễn giải nói rõ chuyện đó. */
  healthy: (v: number) => boolean;
  suffix?: string;
}

function getRatios(t: Dictionary, values: {
  currentAssets: number;
  currentLiab: number;
  cash: number;
  receivable: number;
  debt: number;
  equity: number;
  inventory: number;
  cogs: number;
}): Ratio[] {
  const { currentAssets, currentLiab, cash, receivable, debt, equity, inventory, cogs } = values;
  return [
    {
      name: t.ratiosCalc.currentRatioName,
      value: currentAssets / currentLiab,
      formula: t.ratiosCalc.currentRatioFormula,
      healthy: (v) => v >= 1.2,
    },
    {
      name: t.ratiosCalc.quickRatioName,
      value: (cash + receivable) / currentLiab,
      formula: t.ratiosCalc.quickRatioFormula,
      healthy: (v) => v >= 1,
    },
    {
      name: t.ratiosCalc.cashRatioName,
      value: cash / currentLiab,
      formula: t.ratiosCalc.cashRatioFormula,
      healthy: (v) => v >= 0.3,
    },
    {
      name: t.ratiosCalc.deRatioName,
      value: debt / equity,
      formula: t.ratiosCalc.deRatioFormula,
      healthy: (v) => v <= 1.5,
    },
    {
      name: t.ratiosCalc.inventoryTurnoverName,
      value: inventory > 0 ? cogs / inventory : 0,
      formula: t.ratiosCalc.inventoryTurnoverFormula,
      healthy: (v) => v >= 4,
      suffix: t.ratiosCalc.perYearSuffix,
    },
  ];
}

export default function InteractiveRatios() {
  const { t } = useI18n();
  const [cash, setCash] = useState(200);
  const [receivable, setReceivable] = useState(300);
  const [inventory, setInventory] = useState(500);
  const [currentLiab, setCurrentLiab] = useState(400);
  const [debt, setDebt] = useState(600);
  const [equity, setEquity] = useState(1000);
  const [cogs, setCogs] = useState(1800);

  const currentAssets = cash + receivable + inventory;
  const ratios = getRatios(t, { currentAssets, currentLiab, cash, receivable, debt, equity, inventory, cogs });

  const liquidityGap = currentAssets / currentLiab - (cash + receivable) / currentLiab;

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
      <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
        {t.ratiosCalc.headerTitle}
      </h3>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Num label={t.ratiosCalc.cashLabel} value={cash} set={setCash} max={1500} unit={t.ratiosCalc.billionValue} />
        <Num label={t.ratiosCalc.receivableLabel} value={receivable} set={setReceivable} max={1500} unit={t.ratiosCalc.billionValue} />
        <Num label={t.ratiosCalc.inventoryLabel} value={inventory} set={setInventory} max={1500} unit={t.ratiosCalc.billionValue} />
        <Num label={t.ratiosCalc.currentLiabLabel} value={currentLiab} set={setCurrentLiab} max={1500} min={50} unit={t.ratiosCalc.billionValue} />
        <Num label={t.ratiosCalc.debtLabel} value={debt} set={setDebt} max={3000} unit={t.ratiosCalc.billionValue} />
        <Num label={t.ratiosCalc.equityLabel} value={equity} set={setEquity} max={3000} min={50} unit={t.ratiosCalc.billionValue} />
        <Num label={t.ratiosCalc.cogsLabel} value={cogs} set={setCogs} max={5000} unit={t.ratiosCalc.billionValue} />
      </div>

      <div className="mt-5 space-y-1.5">
        {ratios.map((r) => (
          <div
            key={r.name}
            className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 rounded-xl border border-stone-200 px-3 py-2 dark:border-stone-800"
          >
            <div className="min-w-0">
              <p className="text-xs font-bold text-stone-800 dark:text-stone-100">{r.name}</p>
              <p className="text-[10px] text-stone-400 dark:text-stone-500">{r.formula}</p>
            </div>
            <p
              className={`text-base font-extrabold tabular-nums ${
                r.healthy(r.value)
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-amber-600 dark:text-amber-400"
              }`}
            >
              {r.value.toFixed(2)}
              {r.suffix ?? ""}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-4 rounded-2xl bg-stone-50 p-4 text-xs leading-relaxed text-stone-600 dark:bg-stone-800/60 dark:text-stone-300">
        {liquidityGap > 1
          ? t.ratiosCalc.liquidityGapWide
          : liquidityGap > 0.4
            ? t.ratiosCalc.liquidityGapModerate
            : t.ratiosCalc.liquidityGapNarrow}
        {" "}
        {t.ratiosCalc.liquidityFootnote}
      </p>
    </div>
  );
}

function Num({
  label,
  value,
  set,
  max,
  min = 0,
  unit,
}: {
  label: string;
  value: number;
  set: (v: number) => void;
  max: number;
  min?: number;
  unit: string;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs font-bold text-stone-700 dark:text-stone-200">{label}</span>
        <span className="text-[11px] font-semibold tabular-nums text-stone-500 dark:text-stone-400">
          {format(unit, { value })}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={10}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
        aria-label={label}
        className="mt-1 w-full cursor-pointer accent-stone-900 dark:accent-stone-100"
      />
    </label>
  );
}
