"use client";

import { useState } from "react";

// Phí ăn mòn danh mục theo thời gian, widget cho các bài khai `interactiveType:
// "fee-drag"`.
//
// Ai cũng nghe "phí 1,5% một năm" rồi gật, vì 1,5% nghe như tiền lẻ. Thứ không
// nghe ra được từ con số đó là nó không lấy 1,5% của tiền gốc, mà lấy 1,5% của
// cả phần lãi mà phần bị lấy đáng lẽ sinh ra - mỗi năm, trên toàn bộ số năm
// còn lại. Sau 30 năm, chênh 1,5% phí nuốt khoảng một phần ba số tiền cuối
// cùng, và không có đoạn văn nào làm người ta tin điều đó bằng cách nhìn hai
// con số cạnh nhau.
//
// Widget tính cả phí VÀO/RA (phí mua chứng chỉ quỹ) chứ không chỉ phí thường
// niên: ở Việt Nam phí mua 1-2% khá phổ biến và người ta hay chỉ so phí quản lý.

function finalValue(
  monthly: number,
  years: number,
  annualReturn: number,
  annualFee: number,
  entryFee: number
): number {
  const r = (annualReturn - annualFee) / 100 / 12;
  const months = years * 12;
  const net = monthly * (1 - entryFee / 100);
  // Niên kim cuối kỳ. r = 0 thì công thức chuẩn chia cho 0, nên tách riêng.
  if (Math.abs(r) < 1e-9) return net * months;
  return net * ((Math.pow(1 + r, months) - 1) / r);
}

const fmt = (v: number) =>
  v >= 1_000
    ? `${(v / 1_000).toFixed(2)} tỷ`
    : `${v.toFixed(0)} triệu`;

export default function InteractiveFeeDrag() {
  const [monthly, setMonthly] = useState(5); // triệu/tháng
  const [years, setYears] = useState(20);
  const [ret, setRet] = useState(10);
  const [fee, setFee] = useState(1.5);
  const [entry, setEntry] = useState(1);

  const withFee = finalValue(monthly, years, ret, fee, entry);
  const noFee = finalValue(monthly, years, ret, 0, 0);
  const lost = noFee - withFee;
  const lostShare = noFee > 0 ? (lost / noFee) * 100 : 0;
  const contributed = monthly * years * 12;

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
      <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
        Phí lấy đi bao nhiêu, tính trên số năm bạn thực sự giữ
      </h3>

      <div className="mt-4 space-y-3">
        <Row label="Góp mỗi tháng" value={`${monthly} triệu`}>
          <input type="range" min={1} max={30} step={1} value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))} className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
        <Row label="Số năm giữ" value={`${years} năm`}>
          <input type="range" min={5} max={40} step={1} value={years}
            onChange={(e) => setYears(Number(e.target.value))} className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
        <Row label="Lợi nhuận gộp/năm" value={`${ret}%`}>
          <input type="range" min={4} max={16} step={0.5} value={ret}
            onChange={(e) => setRet(Number(e.target.value))} className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
        <Row label="Phí quản lý/năm" value={`${fee}%`}>
          <input type="range" min={0} max={3} step={0.1} value={fee}
            onChange={(e) => setFee(Number(e.target.value))} className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
        <Row label="Phí mua mỗi lần góp" value={`${entry}%`}>
          <input type="range" min={0} max={3} step={0.25} value={entry}
            onChange={(e) => setEntry(Number(e.target.value))} className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Card label="Bạn đã góp" value={fmt(contributed)} tone="neutral" />
        <Card label="Nhận về sau phí" value={fmt(withFee)} tone="good" />
        <Card label="Phí đã lấy" value={fmt(lost)} tone="bad" />
      </div>

      <p className="mt-4 rounded-2xl bg-stone-50 p-4 text-xs leading-relaxed text-stone-600 dark:bg-stone-800/60 dark:text-stone-300">
        Phí lấy mất <span className="font-bold">{lostShare.toFixed(1)}%</span> số tiền cuối cùng, trong
        khi con số ghi trên hợp đồng chỉ là {fee}% một năm. Chênh lệch đến từ chỗ phần bị lấy mỗi năm
        cũng mất luôn toàn bộ số lãi nó đáng lẽ sinh ra trong những năm còn lại — nên kéo thanh
        &quot;số năm giữ&quot; lên là thấy tỷ lệ này lớn dần, dù mức phí không đổi.
      </p>
    </div>
  );
}

function Row({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs font-bold text-stone-700 dark:text-stone-200">{label}</span>
        <span className="text-[11px] font-semibold tabular-nums text-stone-500 dark:text-stone-400">{value}</span>
      </div>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function Card({ label, value, tone }: { label: string; value: string; tone: "neutral" | "good" | "bad" }) {
  const color =
    tone === "good"
      ? "text-emerald-600 dark:text-emerald-400"
      : tone === "bad"
        ? "text-rose-600 dark:text-rose-400"
        : "text-stone-700 dark:text-stone-200";
  return (
    <div className="rounded-2xl border border-stone-200 p-3 dark:border-stone-800">
      <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400">{label}</p>
      <p className={`mt-0.5 text-lg font-extrabold tabular-nums ${color}`}>{value}</p>
    </div>
  );
}
