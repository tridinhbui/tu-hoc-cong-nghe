"use client";

import { useMemo, useState } from "react";
import { normalQuantile, tQuantile } from "@/lib/tail-risk";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

// Độ trễ đuôi dưới hai giả định phân phối, widget cho các bài khai
// `interactiveType: "tail-risk"`.
//
// Toàn bộ chuyện đo hiệu năng quay quanh một câu: con số p99 bạn báo cáo phụ
// thuộc vào giả định phân phối bạn đã chọn, và giả định đó thường vô hình. Tính
// p99 theo phân phối chuẩn cho ra một con số gọn gàng; cùng dữ liệu ấy với đuôi
// dày cho ra con số lớn hơn hẳn - và chênh lệch đó chính là phần dung lượng
// thiếu đúng lúc tải lên đỉnh.
//
// Widget đặt hai con số cạnh nhau và cho kéo bậc tự do của phân phối Student-t.
// Bậc tự do thấp = đuôi dày. Khi bậc tự do lớn dần, t hội tụ về chuẩn và hai
// con số gặp nhau - nhìn thấy điều đó thì "đuôi dày" thôi là một tính từ.
//
// Kèm cả trung bình phần đuôi, vì đó là câu trả lời cho khiếm khuyết lớn nhất
// của một ngưỡng phân vị: p99 nói ngưỡng bị vượt bao lâu một lần, không nói
// vượt xa tới đâu. Người dùng chạm phải phần "xa tới đâu" ấy.

export default function InteractiveTailRisk() {
  const { t } = useI18n();
  const [baseline, setBaseline] = useState(120); // ms, độ trễ nền p50
  const [jitter, setJitter] = useState(20); // % của độ trễ nền
  const [conf, setConf] = useState(99);
  const [df, setDf] = useState(4);

  const numbers = useMemo(() => {
    const p = conf / 100;
    // Độ lệch chuẩn tính thẳng theo ms. Bản tài chính chia thêm √252 để quy lợi
    // suất năm về một ngày giao dịch; độ trễ không có nhịp đó - mỗi request là
    // một quan sát, nên không có gì để quy đổi.
    const sigma = (baseline * jitter) / 100;
    const zNorm = normalQuantile(p);
    // Chuẩn hoá t về cùng độ lệch chuẩn, nếu không thì so hai thứ có phương sai
    // khác nhau và chênh lệch chỉ là ảo giác của thang đo.
    const tScale = df > 2 ? Math.sqrt((df - 2) / df) : 1;
    const zT = tQuantile(p, df) * tScale;
    const varNorm = sigma * zNorm;
    const varT = sigma * zT;
    // Trung bình phần đuôi của phân phối chuẩn có công thức đóng: φ(z)/(1−p)·σ.
    const pdf = Math.exp(-0.5 * zNorm * zNorm) / Math.sqrt(2 * Math.PI);
    const esNorm = sigma * (pdf / (1 - p));
    return { varNorm, varT, esNorm, gap: varT - varNorm };
  }, [baseline, jitter, conf, df]);

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
      <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
        {t.tailRisk.title}
      </h3>

      <div className="mt-4 space-y-3">
        <Row label={t.tailRisk.portfolioSizeLabel} value={format(t.tailRisk.portfolioSizeValue, { value: baseline })}>
          <input type="range" min={20} max={500} step={10} value={baseline}
            onChange={(e) => setBaseline(Number(e.target.value))} aria-label={t.tailRisk.portfolioSizeAriaLabel}
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
        <Row label={t.tailRisk.volatilityLabel} value={`${jitter}%`}>
          <input type="range" min={5} max={60} step={1} value={jitter}
            onChange={(e) => setJitter(Number(e.target.value))} aria-label={t.tailRisk.volatilityAriaLabel}
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
        <Row label={t.tailRisk.confidenceLabel} value={`${conf}%`}>
          <input type="range" min={90} max={99.5} step={0.5} value={conf}
            onChange={(e) => setConf(Number(e.target.value))} aria-label={t.tailRisk.confidenceAriaLabel}
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
        <Row
          label={t.tailRisk.tailThicknessLabel}
          value={
            df >= 30
              ? format(t.tailRisk.tailThicknessNearNormal, { df })
              : format(t.tailRisk.tailThicknessFat, { df })
          }
        >
          <input type="range" min={3} max={30} step={1} value={df}
            onChange={(e) => setDf(Number(e.target.value))} aria-label={t.tailRisk.tailThicknessAriaLabel}
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Card label={t.tailRisk.varNormalCard} value={numbers.varNorm} suffixTemplate={t.tailRisk.cardValueSuffix} />
        <Card label={t.tailRisk.varFatTailCard} value={numbers.varT} tone="bad" suffixTemplate={t.tailRisk.cardValueSuffix} />
        <Card label={t.tailRisk.esNormalCard} value={numbers.esNorm} tone="warn" suffixTemplate={t.tailRisk.cardValueSuffix} />
      </div>

      <p className="mt-4 rounded-2xl bg-stone-50 p-4 text-xs leading-relaxed text-stone-600 dark:bg-stone-800/60 dark:text-stone-300">
        {df >= 25
          ? t.tailRisk.convergedHint
          : format(t.tailRisk.gapHint, { gap: numbers.gap.toFixed(1) })}
        {" "}
        {t.tailRisk.esExplainer}
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
  value,
  tone,
  suffixTemplate,
}: {
  label: string;
  value: number;
  tone?: "bad" | "warn";
  suffixTemplate: string;
}) {
  const color =
    tone === "bad"
      ? "text-rose-600 dark:text-rose-400"
      : tone === "warn"
        ? "text-amber-600 dark:text-amber-400"
        : "text-stone-800 dark:text-stone-100";
  return (
    <div className="rounded-2xl border border-stone-200 p-3 dark:border-stone-800">
      <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400">{label}</p>
      <p className={`mt-0.5 text-lg font-extrabold tabular-nums ${color}`}>
        {format(suffixTemplate, { value: value.toFixed(1) })}
      </p>
    </div>
  );
}
