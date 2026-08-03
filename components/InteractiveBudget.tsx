"use client";

import { useState } from "react";

// Bộ chia ngân sách 50/30/20 - widget cho các bài khai `interactiveType:
// "budget"`.
//
// Điểm khác biệt so với một máy tính chia ba phần: nó tính ra SỐ THÁNG tới
// mục tiêu, không chỉ tính ra ba con số. Bài học của cả chặng ngân sách nằm ở
// tỷ lệ tiết kiệm chứ không ở số tiền tiết kiệm, và cách duy nhất để người
// đọc cảm được điều đó là kéo thanh trượt rồi thấy đích đến gần lại - hoặc
// lùi xa - ngay trước mắt.

const CATEGORIES = [
  { key: "needs", label: "Thiết yếu", hint: "Thuê nhà, ăn uống, đi lại, hoá đơn", tone: "bg-sky-500" },
  { key: "wants", label: "Mong muốn", hint: "Ăn ngoài, giải trí, mua sắm", tone: "bg-amber-500" },
  { key: "save", label: "Tiết kiệm & đầu tư", hint: "Quỹ khẩn cấp, đầu tư, trả nợ thêm", tone: "bg-emerald-500" },
] as const;

export default function InteractiveBudget() {
  const [income, setIncome] = useState(20);
  const [needs, setNeeds] = useState(50);
  const [wants, setWants] = useState(30);

  const save = Math.max(0, 100 - needs - wants);
  const share = { needs, wants, save };

  const saveAmount = (income * save) / 100;
  const monthlyCost = (income * (needs + wants)) / 100;
  // Quỹ khẩn cấp sáu tháng chi phí - mốc được nhắc xuyên suốt chặng đầu.
  const target = monthlyCost * 6;
  const months = saveAmount > 0 ? Math.ceil(target / saveAmount) : Infinity;

  return (
    <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-6 dark:bg-stone-900 dark:border-stone-800">
      <div>
        <h3 className="font-bold text-stone-800 text-lg mb-1 dark:text-stone-100">
          🧮 Chia ngân sách và xem quỹ khẩn cấp mất bao lâu
        </h3>
        <p className="text-stone-500 text-sm dark:text-stone-400">
          Kéo hai thanh đầu; phần còn lại tự động là tiết kiệm.
        </p>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-stone-700 dark:text-stone-300">💵 Thu nhập mỗi tháng</span>
          <span className="font-bold text-stone-800 dark:text-stone-100">{income} triệu</span>
        </div>
        <input
          type="range"
          min={5}
          max={80}
          value={income}
          onChange={(e) => setIncome(+e.target.value)}
          className="w-full"
          aria-label="Thu nhập mỗi tháng, triệu đồng"
        />
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-stone-700 dark:text-stone-300">Thiết yếu</span>
            <span className="font-bold text-sky-600 dark:text-sky-400">{needs}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={needs}
            onChange={(e) => setNeeds(Math.min(+e.target.value, 100 - wants))}
            className="w-full"
            aria-label="Tỷ lệ chi thiết yếu"
          />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-stone-700 dark:text-stone-300">Mong muốn</span>
            <span className="font-bold text-amber-600 dark:text-amber-400">{wants}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={wants}
            onChange={(e) => setWants(Math.min(+e.target.value, 100 - needs))}
            className="w-full"
            aria-label="Tỷ lệ chi cho mong muốn"
          />
        </div>
      </div>

      {/* Một thanh duy nhất thay vì ba con số rời: mắt đọc tỷ lệ nhanh hơn đọc
          phần trăm, và tỷ lệ mới là thứ bài học nói tới. */}
      <div className="flex h-4 w-full overflow-hidden rounded-full">
        {CATEGORIES.map((c) => (
          <div
            key={c.key}
            className={c.tone}
            style={{ width: `${share[c.key]}%` }}
            title={`${c.label}: ${share[c.key]}%`}
          />
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {CATEGORIES.map((c) => (
          <div key={c.key} className="rounded-2xl bg-stone-50 p-3 dark:bg-stone-800/60">
            <p className="text-xs font-bold text-stone-600 dark:text-stone-300">{c.label}</p>
            <p className="text-lg font-extrabold text-stone-900 dark:text-stone-100">
              {((income * share[c.key]) / 100).toFixed(1)} triệu
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-stone-400 dark:text-stone-500">{c.hint}</p>
          </div>
        ))}
      </div>

      <div
        className={`rounded-2xl p-4 ${
          save === 0
            ? "bg-rose-50 dark:bg-rose-950/30"
            : months <= 12
              ? "bg-emerald-50 dark:bg-emerald-950/30"
              : "bg-amber-50 dark:bg-amber-950/30"
        }`}
      >
        {save === 0 ? (
          <p className="text-sm font-semibold text-rose-700 dark:text-rose-300">
            Không còn đồng nào để dành. Ở mức này, một sự cố bất ngờ buộc phải vay.
          </p>
        ) : (
          <p className="text-sm text-stone-700 dark:text-stone-200">
            Để dành <b>{saveAmount.toFixed(1)} triệu</b> mỗi tháng. Quỹ khẩn cấp sáu tháng chi phí
            (<b>{target.toFixed(0)} triệu</b>) sẽ đủ sau <b>{months} tháng</b>.
          </p>
        )}
        <p className="mt-1.5 text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">
          Tăng thu nhập mà chi tiêu tăng theo thì tỷ lệ tiết kiệm không đổi - và số tháng ở trên
          cũng gần như không đổi. Đó là lý do tỷ lệ quan trọng hơn số tiền.
        </p>
      </div>
    </div>
  );
}
