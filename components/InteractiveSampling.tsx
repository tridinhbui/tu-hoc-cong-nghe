"use client";

import { useState } from "react";
import {
  detectionProbability,
  requiredSampleSize,
  residualRisk,
  zeroErrorUpperBound,
} from "@/lib/audit-sampling";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";

// Chọn mẫu và rủi ro còn lại, widget cho các bài khai `interactiveType:
// "sampling"`.
//
// Kiểm toán và kiểm soát nội bộ đứng trên một sự thật khó chịu: không ai kiểm
// hết được, nên mọi kết luận đều là kết luận từ một mẫu. Bài học nói được điều
// đó bằng chữ, nhưng thứ chữ không làm được là sửa cái trực giác sai đi kèm -
// rằng kiểm 25 hồ sơ không thấy lỗi nghĩa là mọi thứ ổn.
//
// Không ổn. Ở mức tin cậy 95%, mẫu 25 sạch chỉ cho phép kết luận tỷ lệ lỗi
// dưới khoảng 11%. Với một danh mục 10.000 hồ sơ, đó là tới 1.100 hồ sơ có
// lỗi mà vẫn hoàn toàn nhất quán với những gì kiểm toán viên nhìn thấy.
//
// Widget cho kéo cỡ mẫu và tỷ lệ lỗi thật rồi đặt ba con số cạnh nhau: xác
// suất bắt được, cận trên khi không thấy gì, và cỡ mẫu cần cho ngưỡng mong
// muốn. Ba con số đó nói cùng một chuyện từ ba phía.

export default function InteractiveSampling() {
  const { t, locale } = useI18n();
  const [sampleSize, setSampleSize] = useState(25);
  const [errorRate, setErrorRate] = useState(2);
  const [tolerable, setTolerable] = useState(5);
  const [population, setPopulation] = useState(10000);
  const [controlEff, setControlEff] = useState(60);

  const detect = detectionProbability(sampleSize, errorRate / 100);
  const bound = zeroErrorUpperBound(sampleSize);
  const needed = requiredSampleSize(tolerable / 100);
  const residual = residualRisk(errorRate / 100, controlEff / 100, detect);
  const hiddenCount = Math.round(bound * population);

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
      <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
        {t.samplingCalc.title}
      </h3>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Row label={t.samplingCalc.sampleSizeLabel} value={format(t.samplingCalc.sampleSizeValue, { n: sampleSize })}>
          <input
            type="range" min={5} max={300} step={5} value={sampleSize}
            onChange={(e) => setSampleSize(Number(e.target.value))} aria-label={t.samplingCalc.ariaSampleSize}
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100"
          />
        </Row>
        <Row label={t.samplingCalc.errorRateLabel} value={`${errorRate}%`}>
          <input
            type="range" min={0.5} max={20} step={0.5} value={errorRate}
            onChange={(e) => setErrorRate(Number(e.target.value))} aria-label={t.samplingCalc.ariaErrorRate}
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100"
          />
        </Row>
        <Row label={t.samplingCalc.tolerableLabel} value={`${tolerable}%`}>
          <input
            type="range" min={1} max={15} step={0.5} value={tolerable}
            onChange={(e) => setTolerable(Number(e.target.value))} aria-label={t.samplingCalc.ariaTolerable}
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100"
          />
        </Row>
        <Row label={t.samplingCalc.populationLabel} value={population.toLocaleString(intlLocale(locale))}>
          <input
            type="range" min={500} max={50000} step={500} value={population}
            onChange={(e) => setPopulation(Number(e.target.value))} aria-label={t.samplingCalc.ariaPopulation}
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100"
          />
        </Row>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Card label={t.samplingCalc.detectCardLabel} value={`${(detect * 100).toFixed(0)}%`} tone={detect > 0.8 ? "good" : "bad"} />
        <Card label={t.samplingCalc.boundCardLabel} value={`${(bound * 100).toFixed(1)}%`} tone="bad" />
        <Card
          label={format(t.samplingCalc.neededCardLabel, { tolerable })}
          value={format(t.samplingCalc.neededValue, { n: needed })}
          tone="neutral"
        />
      </div>

      <p className="mt-4 rounded-2xl bg-stone-50 p-4 text-xs leading-relaxed text-stone-600 dark:bg-stone-800/60 dark:text-stone-300">
        {format(t.samplingCalc.explainPart1, { sampleSize })}
        <span className="font-bold">{(bound * 100).toFixed(1)}%</span>
        {t.samplingCalc.explainPart2}
        <span className="font-bold">{hiddenCount.toLocaleString(intlLocale(locale))}</span>
        {t.samplingCalc.explainPart3}
        {population.toLocaleString(intlLocale(locale))}
        {t.samplingCalc.explainPart4}
      </p>

      {/* Tầng thứ ba: mẫu chỉ là tuyến cuối. Đặt nó cạnh hai tuyến kia mới ra
          được con số mà người quản trị rủi ro thực sự phải trả lời. */}
      <div className="mt-4 rounded-2xl border border-stone-200 p-4 dark:border-stone-800">
        <Row label={t.samplingCalc.controlEffLabel} value={`${controlEff}%`}>
          <input
            type="range" min={0} max={95} step={5} value={controlEff}
            onChange={(e) => setControlEff(Number(e.target.value))} aria-label={t.samplingCalc.ariaControlEff}
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100"
          />
        </Row>
        <p className="mt-3 text-xs leading-relaxed text-stone-600 dark:text-stone-300">
          {t.samplingCalc.residualPart1}{" "}
          <span className="font-bold tabular-nums text-rose-600 dark:text-rose-400">
            {(residual * 100).toFixed(2)}%
          </span>
          {t.samplingCalc.residualPart2}
        </p>
      </div>
    </div>
  );
}

function Row({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs font-bold text-stone-700 dark:text-stone-200">{label}</span>
        <span className="text-[11px] font-semibold tabular-nums text-stone-500 dark:text-stone-400">
          {value}
        </span>
      </div>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function Card({ label, value, tone }: { label: string; value: string; tone: "good" | "bad" | "neutral" }) {
  const color =
    tone === "good"
      ? "text-emerald-600 dark:text-emerald-400"
      : tone === "bad"
        ? "text-rose-600 dark:text-rose-400"
        : "text-stone-800 dark:text-stone-100";
  return (
    <div className="rounded-2xl border border-stone-200 p-3 dark:border-stone-800">
      <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400">
        {label}
      </p>
      <p className={`mt-0.5 text-lg font-extrabold tabular-nums ${color}`}>{value}</p>
    </div>
  );
}
