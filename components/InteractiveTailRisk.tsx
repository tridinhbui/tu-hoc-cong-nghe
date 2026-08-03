"use client";

import { useMemo, useState } from "react";
import { normalQuantile, tQuantile } from "@/lib/tail-risk";

// VaR dưới hai giả định phân phối, widget cho các bài khai `interactiveType:
// "tail-risk"`.
//
// Toàn bộ FRM quay quanh một câu: con số rủi ro bạn báo cáo phụ thuộc vào giả
// định bạn đã chọn, và giả định đó thường vô hình. VaR 99% tính theo phân phối
// chuẩn cho ra một con số gọn gàng; cùng dữ liệu ấy với đuôi dày cho ra con số
// lớn hơn hẳn, và chênh lệch đó chính là phần vốn ngân hàng thiếu khi thị
// trường xấu.
//
// Widget đặt hai con số cạnh nhau và cho kéo bậc tự do của phân phối Student-t.
// Bậc tự do thấp = đuôi dày. Khi bậc tự do lớn dần, t hội tụ về chuẩn và hai
// con số gặp nhau - nhìn thấy điều đó thì "đuôi dày" thôi là một tính từ.
//
// Kèm cả Expected Shortfall, vì đó là câu trả lời cho khiếm khuyết lớn nhất
// của VaR: VaR nói ngưỡng bị vượt bao lâu một lần, không nói vượt xa tới đâu.
// Basel đã chuyển sang ES chính vì chỗ đó.

export default function InteractiveTailRisk() {
  const [portfolio, setPortfolio] = useState(1000); // tỷ đồng
  const [vol, setVol] = useState(20); // % năm
  const [conf, setConf] = useState(99);
  const [df, setDf] = useState(4);

  const numbers = useMemo(() => {
    const p = conf / 100;
    const daily = vol / 100 / Math.sqrt(252);
    const zNorm = normalQuantile(p);
    // Chuẩn hoá t về cùng độ lệch chuẩn, nếu không thì so hai thứ có phương sai
    // khác nhau và chênh lệch chỉ là ảo giác của thang đo.
    const tScale = df > 2 ? Math.sqrt((df - 2) / df) : 1;
    const zT = tQuantile(p, df) * tScale;
    const varNorm = portfolio * daily * zNorm;
    const varT = portfolio * daily * zT;
    // ES của phân phối chuẩn có công thức đóng: φ(z)/(1−p)·σ.
    const pdf = Math.exp(-0.5 * zNorm * zNorm) / Math.sqrt(2 * Math.PI);
    const esNorm = portfolio * daily * (pdf / (1 - p));
    return { varNorm, varT, esNorm, gap: varT - varNorm };
  }, [portfolio, vol, conf, df]);

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
      <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
        Cùng dữ liệu, hai giả định phân phối, hai con số rủi ro
      </h3>

      <div className="mt-4 space-y-3">
        <Row label="Quy mô danh mục" value={`${portfolio} tỷ`}>
          <input type="range" min={100} max={5000} step={100} value={portfolio}
            onChange={(e) => setPortfolio(Number(e.target.value))} aria-label="Quy mô danh mục"
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
        <Row label="Biến động năm" value={`${vol}%`}>
          <input type="range" min={5} max={60} step={1} value={vol}
            onChange={(e) => setVol(Number(e.target.value))} aria-label="Biến động năm"
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
        <Row label="Mức tin cậy" value={`${conf}%`}>
          <input type="range" min={90} max={99.5} step={0.5} value={conf}
            onChange={(e) => setConf(Number(e.target.value))} aria-label="Mức tin cậy"
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
        <Row label="Độ dày đuôi (bậc tự do t)" value={df >= 30 ? `${df} — gần như chuẩn` : `${df} — đuôi dày`}>
          <input type="range" min={3} max={30} step={1} value={df}
            onChange={(e) => setDf(Number(e.target.value))} aria-label="Bậc tự do"
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Card label="VaR 1 ngày (chuẩn)" value={numbers.varNorm} />
        <Card label="VaR 1 ngày (đuôi dày)" value={numbers.varT} tone="bad" />
        <Card label="Expected Shortfall (chuẩn)" value={numbers.esNorm} tone="warn" />
      </div>

      <p className="mt-4 rounded-2xl bg-stone-50 p-4 text-xs leading-relaxed text-stone-600 dark:bg-stone-800/60 dark:text-stone-300">
        {df >= 25
          ? "Bậc tự do đã đủ lớn để phân phối t gần như trùng với chuẩn, và hai con số VaR gặp nhau. Kéo ngược xuống 3-5 để thấy khoảng cách mở ra."
          : `Cùng một danh mục và cùng một mức tin cậy, giả định đuôi dày đòi thêm ${numbers.gap.toFixed(1)} tỷ vốn so với giả định chuẩn. Khoảng cách đó không nằm ở dữ liệu — nó nằm ở giả định, và giả định thì không hiện trên báo cáo.`}
        {" "}
        Expected Shortfall luôn lớn hơn VaR cùng mức tin cậy vì nó trả lời một câu khác: không phải &quot;ngưỡng bị vượt bao lâu một lần&quot; mà &quot;vượt rồi thì mất trung bình bao nhiêu&quot;. Đó là lý do Basel chuyển thước đo sang ES.
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

function Card({ label, value, tone }: { label: string; value: number; tone?: "bad" | "warn" }) {
  const color =
    tone === "bad"
      ? "text-rose-600 dark:text-rose-400"
      : tone === "warn"
        ? "text-amber-600 dark:text-amber-400"
        : "text-stone-800 dark:text-stone-100";
  return (
    <div className="rounded-2xl border border-stone-200 p-3 dark:border-stone-800">
      <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400">{label}</p>
      <p className={`mt-0.5 text-lg font-extrabold tabular-nums ${color}`}>{value.toFixed(1)} tỷ</p>
    </div>
  );
}
