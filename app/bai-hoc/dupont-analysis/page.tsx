"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 36, day: 36, accent: "teal",
  title: "DuPont Analysis",
  subtitle: "ROE = Net Margin × Asset Turnover × Equity Multiplier",
  duration: "6 phút", difficulty: "Trung bình", emoji: "🔬",
  nextSlug: "dividend", nextTitle: "Dividend - Cổ Tức",
};

const quiz: QuizQuestion[] = [
  {
    question: "Giá nguyên liệu tăng nhưng công ty chưa tăng giá bán ngay. Phần nào của DuPont dễ giảm nhất?",
    options: ["Net Margin", "Asset Turnover", "Equity Multiplier", "Revenue"],
    correct: 0,
    explanation: "Net Margin = Net Income / Revenue. Khi COGS tăng mà giá bán chưa tăng → gross profit giảm → operating income giảm → Net Income giảm → Net Margin thu hẹp. Asset Turnover và Equity Multiplier không bị ảnh hưởng trực tiếp.",
  },
  {
    question: "Hàng tồn kho tăng mạnh nhưng doanh thu không tăng nhiều. Phần nào của DuPont dễ giảm?",
    options: ["Net Margin", "Asset Turnover", "Equity Multiplier", "Tax Rate"],
    correct: 1,
    explanation: "Asset Turnover = Revenue / Total Assets. Tồn kho tăng → Total Assets tăng → mẫu số lớn hơn → Asset Turnover giảm. Đây là tín hiệu công ty đang dùng tài sản kém hiệu quả hơn để tạo ra doanh thu.",
  },
  {
    question: "Hai công ty cùng ROE 15%. Điều nào ĐÚNG hơn?",
    options: [
      "Hai công ty hoạt động giống nhau",
      "Hai công ty chắc chắn lãi bằng nhau",
      "Hai công ty có thể đạt ROE 15% qua con đường hoàn toàn khác nhau",
      "Hai công ty dùng cùng lượng nợ",
    ],
    correct: 2,
    explanation: "Đây là key insight của DuPont. Công ty A: ROE 15% = Net Margin 15% × AT 1x × EM 1x (không nợ, margin cao). Công ty B: ROE 15% = Net Margin 2% × AT 3x × EM 2.5x (leverage + high turnover). Cùng ROE nhưng hoàn toàn khác nhau về risk profile.",
  },
  {
    question: "Tyson Foods: Net Margin ~0.6%, Asset Turnover ~0.4x, Equity Multiplier normal. ROE thấp. Nguyên nhân chính?",
    options: [
      "Nợ quá nhiều",
      "Margin thấp + tài sản quay chậm - điển hình meat processor: low margin, capital-intensive",
      "Không đủ doanh thu",
      "Tax rate quá cao",
    ],
    correct: 1,
    explanation: "Tyson Foods: meat processing là ngành margin thấp (0.6% Net Margin) và cần nhiều tài sản (nhà máy, kho lạnh, logistics) → Asset Turnover cũng thấp. ROE kết quả thấp dù leverage không quá cao. DuPont cho thấy cả hai levers đều yếu.",
  },
];

function DuPontSimulator() {
  const [margin, setMargin] = useState(0.6);
  const [at, setAT] = useState(0.4);
  const [em, setEM] = useState(2.5);

  const roe = margin * at * em;

  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-5 border border-stone-200 my-6">
      <h3 className="font-bold text-stone-700 mb-1 text-sm">🔬 DuPont Simulator</h3>
      <p className="text-xs text-stone-500 mb-4">Điều chỉnh 3 levers để thấy tác động lên ROE</p>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Net Margin ({margin}%)</label>
          <input type="range" min={0.1} max={30} step={0.1} value={margin} onChange={e => setMargin(+e.target.value)} className="w-full accent-teal-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Asset Turnover ({at}x)</label>
          <input type="range" min={0.1} max={5} step={0.1} value={at} onChange={e => setAT(+e.target.value)} className="w-full accent-teal-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Equity Multiplier ({em}x)</label>
          <input type="range" min={1} max={8} step={0.1} value={em} onChange={e => setEM(+e.target.value)} className="w-full accent-cyan-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 p-4 font-mono text-sm mb-3">
        <div className="flex items-center gap-2 justify-center text-stone-600 mb-3 text-xs">
          <span className="text-stone-700 font-bold">{margin}%</span>
          <span>×</span>
          <span className="text-stone-700 font-bold">{at}x</span>
          <span>×</span>
          <span className="text-cyan-600 font-bold">{em}x</span>
          <span>=</span>
          <span className={`font-bold text-lg ${roe > 15 ? "text-stone-700" : roe > 8 ? "text-stone-700" : "text-stone-700"}`}>{roe.toFixed(2)}%</span>
        </div>
        <div className="text-center text-xs text-stone-500">Net Margin × Asset Turnover × Equity Multiplier = ROE</div>
      </div>

      <div className={`rounded-xl p-3 text-center text-xs font-medium border ${roe > 15 ? "bg-stone-50 border-stone-200 text-stone-700" : roe > 8 ? "bg-stone-50 border-stone-200 text-stone-700" : "bg-stone-50 border-stone-200 text-stone-700"}`}>
        {roe > 15 ? ` ROE ${roe.toFixed(1)}% - Excellent. Cần xem nguồn gốc: từ margin, turnover, hay leverage?` :
         roe > 8 ? `🔶 ROE ${roe.toFixed(1)}% - Trung bình. Yếu tố nào có thể cải thiện?` :
         `⚠️ ROE ${roe.toFixed(1)}% - Thấp. Cần DuPont để hiểu tại sao và nơi nào cần cải thiện.`}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">DuPont Analysis</h2>
      <p className="text-stone-600 text-sm mb-6 italic">ROE giống điểm thi cuối kỳ - DuPont cho biết yếu ở môn nào</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Công thức DuPont 3 factors</h3>
        <div className="bg-stone-50 text-white rounded-xl p-5 text-center mb-4">
          <div className="font-mono text-lg font-bold mb-1">ROE = Net Margin × Asset Turnover × Equity Multiplier</div>
          <div className="font-mono text-sm text-stone-700">= (Net Income/Revenue) × (Revenue/Assets) × (Assets/Equity)</div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          {[
            { label: "Net Margin", formula: "NI / Revenue", question: "Bán 100đ giữ lại bao nhiêu?", example: "Apple: 25%, Tyson: 0.6%", color: "teal" },
            { label: "Asset Turnover", formula: "Revenue / Assets", question: "1đ tài sản → bao nhiêu đồng DT?", example: "Retail: 2x, Mfg: 0.5x", color: "cyan" },
            { label: "Equity Multiplier", formula: "Assets / Equity", question: "Dùng bao nhiêu đòn bẩy nợ?", example: "EM 3x = debt/equity 2x", color: "blue" },
          ].map(c => (
            <div key={c.label} className={`bg-${c.color}-50 rounded-xl p-3 border border-${c.color}-100`}>
              <div className={`font-bold text-${c.color}-700 mb-1`}>{c.label}</div>
              <div className={`font-mono text-${c.color}-600 text-xs mb-1`}>{c.formula}</div>
              <div className="text-stone-500">{c.question}</div>
              <div className="text-stone-500 italic mt-1">{c.example}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">🏷️ Case Study: Tyson Foods</h3>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 mb-3">
          <p className="text-sm text-stone-700 mb-3">Hệ thống phân tích báo cáo: <span className="font-mono bg-stone-200 px-1 rounded text-xs">Net Margin: 0.6% | AT: 0.4x | ROE thấp</span></p>
          <p className="text-stone-600 text-sm">Thay vì nói: <em>"ROE = 5% - công ty hoạt động không tốt"</em></p>
          <p className="text-stone-600 text-sm mt-1">DuPont Analysis nói: <em>"ROE thấp chủ yếu do Net Margin chỉ 0.6% (meat processing đặc thù low-margin) và AT 0.4x (capital-intensive với nhiều nhà máy, kho). Leverage không quá bất thường. Cải thiện ROE cần cải thiện margin hoặc tối ưu asset utilization."</em></p>
        </div>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm">
          <span className="font-bold text-stone-700">Key insight:</span> <span className="text-stone-600">Đây là lý do DuPont analysis có giá trị - không chỉ nói ROE cao hay thấp, mà kể được câu chuyện tại sao và cần làm gì.</span>
        </div>
      </section>

      <DuPontSimulator />

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Business model khác nhau → DuPont profile khác nhau</h3>
        <div className="space-y-2">
          {[
            { company: "Apple", margin: "25%", at: "1.0x", em: "3.5x", roe: "~88%", note: "Premium margin + moderate leverage" },
            { company: "Walmart", margin: "2.4%", at: "2.5x", em: "5x", roe: "~30%", note: "Thin margin bù bằng high turnover + leverage" },
            { company: "Tyson Foods", margin: "0.6%", at: "0.4x", em: "2.5x", roe: "~1%", note: "Low margin + low AT = tough ROE" },
            { company: "SaaS Company", margin: "20%", at: "0.7x", em: "2x", roe: "~28%", note: "High margin nhưng AT thấp (intangible heavy)" },
          ].map(c => (
            <div key={c.company} className="flex items-center gap-3 bg-stone-50 rounded-lg p-3 border border-stone-200 text-xs">
              <div className="w-28 font-bold text-stone-700 flex-shrink-0">{c.company}</div>
              <div className="flex-1 font-mono text-stone-500">{c.margin} × {c.at} × {c.em}</div>
              <div className="font-bold text-stone-700 flex-shrink-0">ROE {c.roe}</div>
              <div className="text-stone-500 flex-shrink-0 max-w-32 hidden md:block">{c.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Khi nào dùng DuPont?</h3>
        <div className="space-y-2">
          {[
            "So sánh 2 công ty cùng ngành: tại sao ROE khác nhau? Margin? Turnover? Leverage?",
            "Track xu hướng qua thời gian: lever nào đang yếu đi - cải thiện ở đâu?",
            "Phân tích competitor: Walmart vs Amazon vs Costco - ba business model rất khác nhau dù cùng retail",
            "Investment thesis: management đang cải thiện ROE bằng cách tăng margin hay leverage?",
          ].map((u, i) => (
            <div key={i} className="flex gap-3 bg-stone-50 rounded-lg p-3 text-sm border border-stone-200">
              <span className="text-stone-700 font-bold flex-shrink-0">→</span>
              <span className="text-stone-700">{u}</span>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
