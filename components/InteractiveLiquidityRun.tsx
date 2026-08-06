"use client";

import { useState } from "react";
import { survivalDays } from "@/lib/liquidity-run";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

// Đếm số ngày sống sót khi tiền chảy ra, widget cho các bài khai
// `interactiveType: "liquidity-run"`.
//
// Rủi ro thanh khoản khó dạy vì nó không nằm trên bảng cân đối. Một tổ chức có
// thể có vốn dày, tài sản tốt, lãi đều, và vẫn chết trong hai tuần - Northern
// Rock, SVB và cả một danh sách quỹ mở năm 2020 đều không phải chết vì lỗ.
//
// Widget dựng đúng cái vòng xoáy đó chứ không chỉ cho một tỷ lệ. Ba chỗ khoá
// vào nhau:
//
//   1. Tiền chảy ra mỗi ngày theo tốc độ rút.
//   2. Đệm tiền mặt cạn thì phải cầm cố tài sản để vay - nhưng haircut ăn một
//      phần, nên 100 đồng tài sản không đổi được 100 đồng tiền.
//   3. Haircut TĂNG khi thị trường căng. Nguồn "an toàn nhất" biến mất đúng
//      lúc cần nhất, và đó là câu quan trọng nhất của cả chương.
//
// Nếu haircut cố định thì widget chỉ là một phép chia và người học rút ra sai
// bài học: rằng cứ giữ nhiều tài sản là xong.

export default function InteractiveLiquidityRun() {
  const { t } = useI18n();
  const [buffer, setBuffer] = useState(300); // tỷ tiền mặt
  const [pledgeable, setPledgeable] = useState(1200); // tỷ tài sản cầm cố được
  const [outflowRate, setOutflowRate] = useState(4); // % tiền gửi rút mỗi ngày
  const [deposits, setDeposits] = useState(5000); // tỷ tiền gửi
  const [haircut, setHaircut] = useState(8); // % lúc bình thường
  const [stress, setStress] = useState(50); // mức căng thẳng thị trường

  const dailyOutflow = (deposits * outflowRate) / 100;
  const calm = survivalDays(buffer, pledgeable, dailyOutflow, haircut, 0);
  const stressed = survivalDays(buffer, pledgeable, dailyOutflow, haircut, stress);

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
      <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
        {t.liquidityRun.title}
      </h3>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Row label={t.liquidityRun.depositsLabel} value={format(t.liquidityRun.depositsValue, { amount: deposits })}>
          <input type="range" min={1000} max={20000} step={500} value={deposits}
            onChange={(e) => setDeposits(Number(e.target.value))} aria-label={t.liquidityRun.depositsAria}
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
        <Row label={t.liquidityRun.outflowLabel} value={format(t.liquidityRun.outflowValue, { pct: outflowRate, amount: dailyOutflow.toFixed(0) })}>
          <input type="range" min={1} max={15} step={0.5} value={outflowRate}
            onChange={(e) => setOutflowRate(Number(e.target.value))} aria-label={t.liquidityRun.outflowAria}
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
        <Row label={t.liquidityRun.bufferLabel} value={format(t.liquidityRun.bufferValue, { amount: buffer })}>
          <input type="range" min={0} max={2000} step={50} value={buffer}
            onChange={(e) => setBuffer(Number(e.target.value))} aria-label={t.liquidityRun.bufferAria}
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
        <Row label={t.liquidityRun.pledgeableLabel} value={format(t.liquidityRun.pledgeableValue, { amount: pledgeable })}>
          <input type="range" min={0} max={6000} step={100} value={pledgeable}
            onChange={(e) => setPledgeable(Number(e.target.value))} aria-label={t.liquidityRun.pledgeableAria}
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
        <Row label={t.liquidityRun.haircutLabel} value={format(t.liquidityRun.haircutValue, { pct: haircut })}>
          <input type="range" min={2} max={30} step={1} value={haircut}
            onChange={(e) => setHaircut(Number(e.target.value))} aria-label={t.liquidityRun.haircutAria}
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
        <Row label={t.liquidityRun.stressLabel} value={stress === 0 ? t.liquidityRun.stressValueNormal : format(t.liquidityRun.stressValue, { pct: stress })}>
          <input type="range" min={0} max={150} step={10} value={stress}
            onChange={(e) => setStress(Number(e.target.value))} aria-label={t.liquidityRun.stressAria}
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Card label={t.liquidityRun.calmCardLabel} days={calm} tone="good" daysOver60={t.liquidityRun.daysOver60} daysValue={t.liquidityRun.daysValue} />
        <Card label={t.liquidityRun.stressedCardLabel} days={stressed} tone="bad" daysOver60={t.liquidityRun.daysOver60} daysValue={t.liquidityRun.daysValue} />
      </div>

      <p className="mt-4 rounded-2xl bg-stone-50 p-4 text-xs leading-relaxed text-stone-600 dark:bg-stone-800/60 dark:text-stone-300">
        {stress === 0
          ? t.liquidityRun.noteStressZero
          : calm - stressed >= 3
            ? format(t.liquidityRun.noteBigGap, { days: calm - stressed })
            : t.liquidityRun.noteSmallGap}
        {" "}
        {t.liquidityRun.modelDisclaimer}
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

function Card({
  label,
  days,
  tone,
  daysOver60,
  daysValue,
}: {
  label: string;
  days: number;
  tone: "good" | "bad";
  daysOver60: string;
  daysValue: string;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 p-3 dark:border-stone-800">
      <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400">{label}</p>
      <p
        className={`mt-0.5 text-lg font-extrabold tabular-nums ${
          tone === "good" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
        }`}
      >
        {days >= 60 ? daysOver60 : format(daysValue, { days })}
      </p>
    </div>
  );
}
