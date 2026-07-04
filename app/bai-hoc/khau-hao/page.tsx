"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 17, day: 17, accent: "stone",
  title: "Khấu Hao",
  subtitle: "Tài sản mòn dần — kế toán ghi lại thế nào?",
  duration: "7 phút", difficulty: "Trung bình", emoji: "🏗️",
};

const quiz: QuizQuestion[] = [
  {
    question: "Mua máy móc 600 triệu, tuổi thọ 10 năm, giá trị còn lại (salvage value) = 0. Straight-line depreciation mỗi năm là?",
    options: ["60 triệu/năm", "600 triệu ngay năm 1", "6 triệu/năm", "Phụ thuộc vào doanh thu"],
    correct: 0,
    explanation: "Straight-line: D&A = (Cost - Salvage Value) / Useful Life = (600 - 0) / 10 = 60 triệu/năm. Sau 10 năm, Book Value = 0.",
  },
  {
    question: "Tại sao D&A được cộng lại trong Cash Flow Statement (indirect method)?",
    options: [
      "Để tăng lợi nhuận",
      "D&A là non-cash expense — làm giảm Net Income nhưng không thực sự chi tiền mặt",
      "Vì D&A là chi phí đầu tư",
      "Để giảm thuế",
    ],
    correct: 1,
    explanation: "Indirect method bắt đầu từ Net Income (đã trừ D&A) và cộng lại D&A vì không có dòng tiền ra thực tế. D&A là bút toán phi tiền mặt — chỉ ảnh hưởng đến P&L, không phải bank account.",
  },
  {
    question: "Book Value của tài sản sau 3 năm với cost 900M, useful life 15 năm, salvage 0, straight-line là?",
    options: ["720 triệu", "600 triệu", "180 triệu", "900 triệu"],
    correct: 0,
    explanation: "Annual D&A = 900/15 = 60M/năm. Sau 3 năm: Accumulated Depreciation = 3 × 60 = 180M. Book Value = 900 - 180 = 720M.",
  },
];

function DepreciationChart() {
  const [cost, setCost] = useState(600);
  const [life, setLife] = useState(10);
  const [method, setMethod] = useState<"sl" | "dd">("sl");

  const years = Array.from({ length: life }, (_, i) => {
    const yr = i + 1;
    let dda: number;
    if (method === "sl") {
      dda = cost / life;
    } else {
      const rate = 2 / life;
      const bookAtStart = cost * Math.pow(1 - rate, i);
      dda = bookAtStart * rate;
    }
    const accumulated = method === "sl" ? (cost / life) * yr : cost * (1 - Math.pow(1 - 2 / life, yr));
    const bookValue = Math.max(0, cost - accumulated);
    return { yr, dda, bookValue };
  });

  return (
    <div className="bg-gradient-to-br from-stone-50 to-slate-50 rounded-2xl p-5 border border-stone-200 my-6">
      <h3 className="font-bold text-stone-800 mb-4 text-sm"> Depreciation Schedule Visualizer</h3>
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Cost ({cost}M)</label>
          <input type="range" min={100} max={2000} step={100} value={cost} onChange={e => setCost(+e.target.value)} className="w-full accent-stone-600" />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Useful Life ({life} năm)</label>
          <input type="range" min={3} max={20} value={life} onChange={e => setLife(+e.target.value)} className="w-full accent-stone-600" />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Phương pháp</label>
          <div className="flex gap-1 mt-1">
            <button onClick={() => setMethod("sl")} className={`flex-1 text-xs py-1 rounded-lg font-semibold ${method === "sl" ? "bg-stone-700 text-white" : "bg-white border border-stone-200 text-stone-500"}`}>SL</button>
            <button onClick={() => setMethod("dd")} className={`flex-1 text-xs py-1 rounded-lg font-semibold ${method === "dd" ? "bg-stone-700 text-white" : "bg-white border border-stone-200 text-stone-500"}`}>DDB</button>
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-0.5 h-24 mb-3">
        {years.map(y => (
          <div key={y.yr} className="flex-1 flex flex-col items-center justify-end">
            <div className="w-full bg-stone-500 rounded-t transition-all" style={{ height: `${(y.bookValue / cost) * 96}px` }} />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[9px] text-stone-500 mb-3">
        <span>Y1</span>
        <span>Y{Math.floor(life / 2)}</span>
        <span>Y{life}</span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="bg-white rounded-lg p-2 border border-stone-200">
          <div className="font-bold text-stone-700">{(cost / life).toFixed(0)}M/năm</div>
          <div className="text-stone-500">D&A (SL)</div>
        </div>
        <div className="bg-white rounded-lg p-2 border border-stone-200">
          <div className="font-bold text-stone-700">{cost}M</div>
          <div className="text-stone-500">Cost ban đầu</div>
        </div>
        <div className="bg-white rounded-lg p-2 border border-stone-200">
          <div className="font-bold text-stone-700">0M</div>
          <div className="text-stone-500">Book Value Y{life}</div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Khấu Hao & Accumulated Depreciation</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Non-cash expense nhưng ảnh hưởng đến P&L, Balance Sheet và Cash Flow</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">❓ Tại sao cần khấu hao?</h3>
        <p className="text-stone-600 leading-relaxed mb-4">
          Doanh nghiệp mua máy móc 600 triệu để dùng 10 năm. Nếu ghi toàn bộ 600M là chi phí ngay năm 1, lợi nhuận năm đó sẽ giảm mạnh đột ngột — không phản ánh đúng thực tế. Khấu hao giải quyết điều này: <strong>phân bổ chi phí tài sản vào các kỳ sử dụng</strong>.
        </p>
        <div className="bg-stone-800 text-white rounded-xl p-5 text-center">
          <div className="font-mono text-lg font-bold mb-1">Matching Principle</div>
          <p className="text-stone-300 text-sm">Chi phí phải được ghi nhận trong cùng kỳ với doanh thu mà nó tạo ra</p>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">📐 3 phương pháp khấu hao</h3>
        <div className="space-y-3">
          {[
            {
              name: "Straight-Line (Đường thẳng)", short: "SL",
              formula: "D&A = (Cost − Salvage) / Useful Life",
              desc: "Khấu hao đều mỗi năm. Đơn giản, phổ biến nhất.",
              example: "600M / 10 năm = 60M/năm",
            },
            {
              name: "Double Declining Balance", short: "DDB",
              formula: "D&A = Book Value × (2 / Useful Life)",
              desc: "Khấu hao nhanh hơn ở những năm đầu. Phù hợp tài sản mất giá trị nhanh (công nghệ).",
              example: "Năm 1: 600 × 20% = 120M. Năm 2: 480 × 20% = 96M",
            },
            {
              name: "Units of Production", short: "UOP",
              formula: "D&A = (Cost − Salvage) / Total Units × Units Used",
              desc: "Khấu hao theo mức sử dụng thực tế. Phù hợp máy móc, xe tải.",
              example: "Xe tải 500M, chạy 500.000km. Năm 1 chạy 60.000km → D&A = 60M",
            },
          ].map(m => (
            <div key={m.name} className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-stone-700 text-white text-xs font-bold px-2 py-0.5 rounded">{m.short}</span>
                <span className="font-bold text-stone-800 text-sm">{m.name}</span>
              </div>
              <div className="font-mono text-xs bg-white rounded p-2 border border-stone-200 mb-2">{m.formula}</div>
              <p className="text-stone-600 text-xs mb-1">{m.desc}</p>
              <p className="text-stone-500 text-xs italic">{m.example}</p>
            </div>
          ))}
        </div>
      </section>

      <DepreciationChart />

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Ảnh hưởng lên 3 báo cáo tài chính</h3>
        <div className="space-y-2">
          {[
            { report: "P&L (Income Statement)", effect: "D&A expense làm giảm EBIT và Net Income", icon: "📋" },
            { report: "Balance Sheet", effect: "Accumulated Depreciation làm giảm Net PPE (gross PPE - accum. D&A)", icon: "⚖️" },
            { report: "Cash Flow Statement", effect: "D&A được cộng lại trong OCF (indirect method) vì là non-cash", icon: "💧" },
          ].map(s => (
            <div key={s.report} className="flex gap-3 bg-stone-50 rounded-xl p-4 border border-stone-200">
              <span className="text-xl flex-shrink-0">{s.icon}</span>
              <div>
                <div className="font-semibold text-stone-800 text-sm">{s.report}</div>
                <div className="text-stone-600 text-xs mt-0.5">{s.effect}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3">🔍 D&A trong phân tích tài chính</h3>
        <div className="space-y-2">
          {[
            "EBITDA = EBIT + D&A → loại trừ ảnh hưởng của khấu hao để so sánh doanh nghiệp",
            "D&A cao trong ngành asset-heavy (sản xuất, hàng không) → margins thấp hơn ngành light-asset",
            "Capex replacement ≈ D&A trong steady state; Capex > D&A = doanh nghiệp đang mở rộng",
            "Accelerated depreciation (tax purpose) ≠ financial reporting depreciation → deferred tax liability",
          ].map((n, i) => (
            <div key={i} className="flex gap-3 bg-stone-50 rounded-lg p-3 text-sm border border-stone-200">
              <span className="text-stone-700 flex-shrink-0"></span>
              <span className="text-stone-700">{n}</span>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
