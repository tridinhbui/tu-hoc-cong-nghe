"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

// Kéo hai đòn bẩy chính sách và xem AD/AS dịch chuyển, widget cho các bài khai
// `interactiveType: "macro-policy"`.
//
// Bài học viết ra thì ai cũng gật: nới tiền tệ làm tăng tổng cầu. Nhưng hỏi
// tiếp "vậy giá và sản lượng cái nào tăng nhiều hơn" thì bắt đầu lệch, và đó
// mới là câu đề thi hỏi. Câu trả lời phụ thuộc nền kinh tế đang đứng ở đâu
// trên đường AS: còn nhiều công suất nhàn rỗi thì sản lượng ăn gần hết cú
// kích, gần hết công suất thì phần lớn chảy vào giá.
//
// Nên widget có ba đòn bẩy chứ không phải hai: hai đòn chính sách và một thanh
// độ nhàn rỗi. Không có thanh thứ ba thì mọi cú nới đều cho cùng một kết quả và
// người học rút ra đúng cái kết luận thiếu vế.
//
// Các con số là mô hình dạy học, không phải ước lượng của một nền kinh tế cụ
// thể. Hệ số nhân cố tình đơn giản để nhìn ra quan hệ, không để dự báo.

/** Độ dốc đường AS: gần 0 khi thừa công suất (thêm cầu chỉ ra sản lượng),
 *  gần 1 khi chạm trần (thêm cầu chỉ ra giá). */
function priceShare(slack: number): number {
  return 1 - slack / 100;
}

export default function InteractiveMacroPolicy() {
  const { t } = useI18n();
  const tr = t.interactiveRest.macroPolicy;
  const [fiscal, setFiscal] = useState(0); // -3..+3, tiêu dùng công / thuế
  const [monetary, setMonetary] = useState(0); // -3..+3, hạ/nâng lãi suất
  const [slack, setSlack] = useState(60); // % công suất còn nhàn rỗi

  // Tiền tệ tác động qua đầu tư nên có độ trễ và hệ số nhỏ hơn tài khoá trong
  // ngắn hạn - đó là lý do các gói kích thích luôn có vế chi ngân sách.
  const adShift = fiscal * 1.2 + monetary * 0.9;
  const toPrice = priceShare(slack);
  const outputChange = adShift * (1 - toPrice);
  const priceChange = adShift * toPrice;

  const overheating = slack < 25 && adShift > 1.5;
  const stagnant = slack > 70 && adShift < -1.5;

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
      <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
        {tr.title}
      </h3>

      <div className="mt-4 space-y-4">
        <Slider
          label={tr.fiscalLabel}
          hint={fiscal === 0 ? tr.fiscalHintNeutral : fiscal > 0 ? tr.fiscalHintExpand : tr.fiscalHintContract}
          value={fiscal}
          min={-3}
          max={3}
          step={1}
          onChange={setFiscal}
        />
        <Slider
          label={tr.monetaryLabel}
          hint={monetary === 0 ? tr.monetaryHintNeutral : monetary > 0 ? tr.monetaryHintExpand : tr.monetaryHintContract}
          value={monetary}
          min={-3}
          max={3}
          step={1}
          onChange={setMonetary}
        />
        <Slider
          label={tr.slackLabel}
          hint={format(tr.slackHint, {
            slack,
            desc: slack > 60 ? tr.slackDescHigh : slack > 30 ? tr.slackDescMid : tr.slackDescLow,
          })}
          value={slack}
          min={0}
          max={100}
          step={5}
          onChange={setSlack}
        />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Readout label={tr.outputLabel} value={outputChange} unit="%" />
        <Readout label={tr.priceLabel} value={priceChange} unit="%" />
      </div>

      <p className="mt-4 rounded-2xl bg-stone-50 p-4 text-xs leading-relaxed text-stone-600 dark:bg-stone-800/60 dark:text-stone-300">
        {overheating
          ? tr.noteOverheating
          : stagnant
            ? tr.noteStagnant
            : adShift === 0
              ? tr.noteNeutral
              : format(tr.noteShiftBody, {
                  direction: adShift > 0 ? tr.noteShiftRight : tr.noteShiftLeft,
                  priceShare: Math.round(toPrice * 100),
                  outputShare: Math.round((1 - toPrice) * 100),
                })}
      </p>
    </div>
  );
}

function Slider({
  label,
  hint,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs font-bold text-stone-700 dark:text-stone-200">{label}</span>
        <span className="text-[11px] text-stone-500 dark:text-stone-400">{hint}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1.5 w-full cursor-pointer accent-stone-900 dark:accent-stone-100"
      />
    </label>
  );
}

function Readout({ label, value, unit }: { label: string; value: number; unit: string }) {
  const sign = value > 0 ? "+" : "";
  return (
    <div className="rounded-2xl border border-stone-200 p-3 dark:border-stone-800">
      <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400">
        {label}
      </p>
      <p
        className={`mt-0.5 text-lg font-extrabold tabular-nums ${
          value > 0.05
            ? "text-emerald-600 dark:text-emerald-400"
            : value < -0.05
              ? "text-rose-600 dark:text-rose-400"
              : "text-stone-500 dark:text-stone-400"
        }`}
      >
        {sign}
        {value.toFixed(1)}
        {unit}
      </p>
    </div>
  );
}
