"use client";

import { useMemo, useState } from "react";
import { falsePositiveChance, fitLine, generateSample } from "@/lib/regression-demo";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

// Hồi quy trên dữ liệu biết trước sự thật, widget cho các bài khai
// `interactiveType: "regression"`.
//
// Bài học viết "mẫu nhỏ cho ước lượng không đáng tin" thì ai đọc cũng gật, và
// gần như không ai thực sự tin. Cách duy nhất làm người ta tin là để họ tự kéo
// cỡ mẫu xuống 15, bấm lấy mẫu lại vài lần, và thấy hệ số nhảy từ 0,1 sang 1,3
// trong khi sự thật không hề đổi - vì sự thật ở đây do chính họ đặt ra.
//
// Đó là điểm mấu chốt của widget: dữ liệu sinh ra từ một hệ số ĐÃ BIẾT. Trên
// dữ liệu thật thì không ai có con số đó để đối chiếu, nên không ai nhìn thấy
// được sai số của mình. Ở đây thì nhìn thấy.
//
// Phần p-hacking đứng riêng bên dưới vì nó là một cái bẫy khác: không phải "ước
// lượng lệch" mà "tìm đủ lâu thì kiểu gì cũng thấy".

const W = 320;
const H = 190;

export default function InteractiveRegression() {
  const { t } = useI18n();
  const [n, setN] = useState(30);
  const [trueSlope, setTrueSlope] = useState(0.5);
  const [noise, setNoise] = useState(1.5);
  const [seed, setSeed] = useState(1);
  const [tests, setTests] = useState(1);

  const points = useMemo(() => generateSample(n, trueSlope, noise, seed), [n, trueSlope, noise, seed]);
  const fit = useMemo(() => fitLine(points), [points]);

  // Khung vẽ theo dữ liệu thật để điểm không tràn ra ngoài khi tăng nhiễu.
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const xMin = Math.min(-3, ...xs);
  const xMax = Math.max(3, ...xs);
  const yMin = Math.min(-5, ...ys);
  const yMax = Math.max(5, ...ys);
  const sx = (x: number) => ((x - xMin) / (xMax - xMin)) * W;
  const sy = (y: number) => H - ((y - yMin) / (yMax - yMin)) * H;

  const err = Math.abs(fit.slope - trueSlope);
  const significant = fit.pValue < 0.05;

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
      <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
        {t.regressionCalc.title}
      </h3>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Row label={t.regressionCalc.sampleSizeLabel} value={`${n}`}>
          <input type="range" min={8} max={500} step={1} value={n}
            onChange={(e) => setN(Number(e.target.value))} aria-label={t.regressionCalc.sampleSizeLabel}
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
        <Row label={t.regressionCalc.trueSlopeLabel} value={trueSlope.toFixed(2)}>
          <input type="range" min={0} max={2} step={0.05} value={trueSlope}
            onChange={(e) => setTrueSlope(Number(e.target.value))} aria-label={t.regressionCalc.trueSlopeLabel}
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
        <Row label={t.regressionCalc.noiseLabel} value={noise.toFixed(1)}>
          <input type="range" min={0.2} max={5} step={0.1} value={noise}
            onChange={(e) => setNoise(Number(e.target.value))} aria-label={t.regressionCalc.noiseLabel}
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
      </div>

      <div className="mt-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full min-w-[280px] rounded-2xl bg-stone-50 dark:bg-stone-800/60"
          role="img"
          aria-label={format(t.regressionCalc.chartAriaLabel, {
            n,
            estimated: fit.slope.toFixed(2),
            trueSlope: trueSlope.toFixed(2),
          })}
        >
          {/* Đường sự thật vẽ trước, mờ hơn - để đường ước lượng nằm đè lên nó
              và khoảng lệch giữa hai đường là thứ nhìn thấy ngay. */}
          <line
            x1={sx(xMin)} y1={sy(trueSlope * xMin)} x2={sx(xMax)} y2={sy(trueSlope * xMax)}
            className="stroke-stone-400 dark:stroke-stone-500" strokeWidth={2} strokeDasharray="5 4"
          />
          {points.map((p, i) => (
            <circle key={i} cx={sx(p.x)} cy={sy(p.y)} r={2.5} className="fill-stone-400/70 dark:fill-stone-500/70" />
          ))}
          <line
            x1={sx(xMin)} y1={sy(fit.slope * xMin + fit.intercept)}
            x2={sx(xMax)} y2={sy(fit.slope * xMax + fit.intercept)}
            className="stroke-rose-500" strokeWidth={2.5}
          />
        </svg>
      </div>
      <p className="mt-1.5 text-[10px] text-stone-500 dark:text-stone-400">
        {t.regressionCalc.chartHint}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setSeed((s) => s + 1)}
          className="cursor-pointer rounded-full bg-stone-900 px-4 py-2 text-[11px] font-bold text-white hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900"
        >
          {t.regressionCalc.resampleButton}
        </button>
        <span className="text-[11px] text-stone-500 dark:text-stone-400">
          {t.regressionCalc.resampleHint}
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        <Card label={t.regressionCalc.estimatedSlopeLabel} value={fit.slope.toFixed(2)} tone={err < 0.15 ? "good" : "bad"} />
        <Card label={t.regressionCalc.errorLabel} value={err.toFixed(2)} tone={err < 0.15 ? "good" : "bad"} />
        <Card label={t.regressionCalc.r2Label} value={fit.r2.toFixed(2)} tone="neutral" />
        <Card label={t.regressionCalc.pValueLabel} value={fit.pValue < 0.001 ? t.regressionCalc.pValueBelowThreshold : fit.pValue.toFixed(3)} tone={significant ? "good" : "bad"} />
      </div>

      <p className="mt-4 rounded-2xl bg-stone-50 p-4 text-xs leading-relaxed text-stone-600 dark:bg-stone-800/60 dark:text-stone-300">
        {n < 30
          ? format(t.regressionCalc.smallSampleNote, { n })
          : format(t.regressionCalc.r2ExplainerNote, { r2: fit.r2.toFixed(2) })}
      </p>

      {/* Cái bẫy thứ hai, tách riêng vì nó không phải chuyện ước lượng lệch. */}
      <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/60 dark:bg-amber-950/30">
        <Row label={t.regressionCalc.testsTriedLabel} value={`${tests}`}>
          <input type="range" min={1} max={50} step={1} value={tests}
            onChange={(e) => setTests(Number(e.target.value))} aria-label={t.regressionCalc.testsTriedAriaLabel}
            className="w-full cursor-pointer accent-amber-600" />
        </Row>
        <p className="mt-3 text-xs leading-relaxed text-amber-900 dark:text-amber-200">
          {format(t.regressionCalc.pHackingText, { tests, chance: (falsePositiveChance(tests) * 100).toFixed(0) })}
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
        <span className="text-[11px] font-semibold tabular-nums text-stone-500 dark:text-stone-400">{value}</span>
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
        ? "text-amber-600 dark:text-amber-400"
        : "text-stone-800 dark:text-stone-100";
  return (
    <div className="rounded-2xl border border-stone-200 p-3 dark:border-stone-800">
      <p className="text-[10px] font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400">{label}</p>
      <p className={`mt-0.5 text-base font-extrabold tabular-nums ${color}`}>{value}</p>
    </div>
  );
}
