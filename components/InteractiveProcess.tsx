"use client";

import { useState } from "react";

// Ba báo cáo tài chính nối vào nhau, widget cho các bài khai
// `interactiveType: "process"`.
//
// Diagram tĩnh ở mỗi bài đã vẽ được các bước; thứ nó không làm được là cho
// thấy một thay đổi CHẢY qua các bước. Ở đây người học chọn một giao dịch rồi
// bấm từng bước, và thấy đúng dòng nào trên báo cáo nào nhúc nhích - kể cả
// những dòng mà trực giác nói là không liên quan.

const FLOWS = [
  {
    key: "sale",
    label: "Bán hàng 100 triệu, khách nợ 60 ngày",
    steps: [
      { at: "Kết quả kinh doanh", text: "Doanh thu +100. Lợi nhuận tăng, dù chưa nhận đồng nào." },
      { at: "Bảng cân đối", text: "Khoản phải thu +100, lợi nhuận giữ lại +100. Hai vế vẫn cân." },
      { at: "Lưu chuyển tiền tệ", text: "Lợi nhuận +100 nhưng phải thu tăng 100, trừ lại. Tiền không đổi." },
      { at: "Kết luận", text: "Lãi trên giấy, tiền chưa về. Đây là chỗ doanh nghiệp tăng trưởng nhanh chết." },
    ],
  },
  {
    key: "capex",
    label: "Mua máy 120 triệu, khấu hao 4 năm",
    steps: [
      { at: "Lưu chuyển tiền tệ", text: "Dòng tiền đầu tư −120 ngay hôm nay. Tiền ra đủ 120." },
      { at: "Bảng cân đối", text: "Tiền −120, tài sản cố định +120. Tổng tài sản không đổi." },
      { at: "Kết quả kinh doanh", text: "Năm nay chỉ ghi khấu hao −30, không phải −120." },
      { at: "Kết luận", text: "Chi tiền một lần, ghi chi phí bốn năm. Đây là lý do lợi nhuận khác dòng tiền." },
    ],
  },
  {
    key: "loan",
    label: "Vay ngân hàng 200 triệu, lãi 10%/năm",
    steps: [
      { at: "Lưu chuyển tiền tệ", text: "Dòng tiền tài chính +200 khi nhận vốn." },
      { at: "Bảng cân đối", text: "Tiền +200, nợ vay +200. Vốn chủ sở hữu không đổi chút nào." },
      { at: "Kết quả kinh doanh", text: "Mỗi năm lãi vay −20, và khoản này được trừ trước khi tính thuế." },
      { at: "Kết luận", text: "Vay không làm giàu hay nghèo ngay; nó chỉ đổi ai có quyền với tài sản." },
    ],
  },
] as const;

export default function InteractiveProcess() {
  const [flowIndex, setFlowIndex] = useState(0);
  const [step, setStep] = useState(0);
  const flow = FLOWS[flowIndex];
  const atEnd = step >= flow.steps.length - 1;

  const pick = (i: number) => {
    setFlowIndex(i);
    setStep(0);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-5 dark:bg-stone-900 dark:border-stone-800">
      <div>
        <h3 className="font-bold text-stone-800 text-lg mb-1 dark:text-stone-100">
          🔗 Một giao dịch chạy qua ba báo cáo
        </h3>
        <p className="text-stone-500 text-sm dark:text-stone-400">
          Chọn một giao dịch rồi bấm từng bước để xem nó chạm vào đâu.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {FLOWS.map((f, i) => (
          <button
            key={f.key}
            type="button"
            onClick={() => pick(i)}
            aria-pressed={i === flowIndex}
            className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors ${
              i === flowIndex
                ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ol className="space-y-2">
        {flow.steps.map((s, i) => {
          const reached = i <= step;
          return (
            <li
              key={s.at}
              className={`rounded-2xl border px-4 py-3 transition-colors ${
                reached
                  ? "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900 dark:bg-emerald-950/25"
                  : "border-stone-200 bg-stone-50 opacity-55 dark:border-stone-800 dark:bg-stone-800/40"
              }`}
            >
              <p className="text-[11px] font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">
                {s.at}
              </p>
              <p className="mt-0.5 text-sm leading-relaxed text-stone-700 dark:text-stone-200">
                {reached ? s.text : "…"}
              </p>
            </li>
          );
        })}
      </ol>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setStep(atEnd ? 0 : step + 1)}
          className="rounded-full bg-stone-900 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
        >
          {atEnd ? "Chạy lại" : "Bước tiếp"}
        </button>
        <span className="text-[11px] text-stone-400 dark:text-stone-500">
          Bước {step + 1}/{flow.steps.length}
        </span>
      </div>
    </div>
  );
}
