"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 34, day: 34, accent: "emerald",
  title: "Maple Leaf - Leverage Ratio",
  subtitle: "Net Debt/EBITDA: đọc nợ đúng cách, không nhìn số tuyệt đối",
  duration: "6 phút", difficulty: "Trung bình", emoji: "🍁",
  nextSlug: "tesla-cash-flow", nextTitle: "Tesla Q1/2026 Cash Flow",
};

const quiz: QuizQuestion[] = [
  {
    question: "Maple Leaf Foods có Net Debt ~995M CAD và EBITDA ~122M CAD. Leverage Ratio (Net Debt/EBITDA) là?",
    options: ["~4x", "~8x", "~2x", "~1x"],
    correct: 1,
    explanation: "Net Debt/EBITDA = 995/122 ≈ 8.15x. Tuy nhiên, đây chưa nói lên tất cả. Phải xem thêm: ngành nào (consumer staples thường được phép leverage cao hơn), tốc độ trả nợ, FCF coverage, và maturity schedule.",
  },
  {
    question: "Câu hỏi đúng nhất khi nhìn thấy công ty có >1 tỷ USD nợ là?",
    options: [
      "Công ty này nguy hiểm, nên bán cổ phiếu ngay",
      "Vay để làm gì? Chi phí vay bao nhiêu? Khi nào đến hạn?",
      "Nợ càng nhiều càng tốt vì tax shield",
      "Chỉ cần xem EBITDA là đủ",
    ],
    correct: 1,
    explanation: "3 câu hỏi cốt lõi: (1) Purpose - vay để mở rộng/đầu tư hay chỉ refinance? (2) Cost of debt - có tạo ra return cao hơn lãi vay không? (3) Maturity - bao nhiêu đến hạn trong 1-2 năm? Số tuyệt đối ít ý nghĩa hơn context.",
  },
  {
    question: "Doanh thu Maple Leaf tăng 6.2% YoY trong khi nợ ròng ổn định. Đây là tín hiệu gì?",
    options: [
      "Tín hiệu tiêu cực - nợ vẫn còn đó",
      "Tích cực - revenue growing + stable debt = leverage ratio đang giảm dần theo thời gian",
      "Không liên quan",
      "Chỉ tốt nếu tăng trưởng >10%",
    ],
    correct: 1,
    explanation: "Leverage ratio = Net Debt/EBITDA. Nếu revenue và EBITDA tăng trong khi debt ổn định → ratio giảm tự nhiên. Đây là 'deleveraging through growth'- cách khỏe mạnh nhất để giảm leverage.",
  },
  {
    question: "Nếu công ty thực phẩm tiêu dùng (consumer staples) có Net Debt/EBITDA 2x, đây có phải mức đáng lo không?",
    options: [
      "Rất đáng lo, mọi nợ đều nguy hiểm",
      "Không - consumer staples có stable cash flow, 2-3x là bình thường và chấp nhận được",
      "Tùy thuộc vào màu sắc logo công ty",
      "Chỉ an toàn nếu nợ = 0",
    ],
    correct: 1,
    explanation: "Leverage tolerance khác nhau theo ngành: Utilities/Consumer Staples có stable FCF → chịu được 3-4x. Airlines/Retail → 2x đã rủi ro. Technology nên giữ <1x. Consumer staples như Maple Leaf hay Nestlé thường operate ở 2-3x một cách thoải mái.",
  },
];

function LeverageSimulator() {
  const [debt, setDebt] = useState(995);
  const [cash, setCash] = useState(50);
  const [ebitda, setEbitda] = useState(122);

  const netDebt = debt - cash;
  const ratio = ebitda > 0 ? netDebt / ebitda : 0;
  const yearsToPayoff = ratio;

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-stone-200 my-6">
      <h3 className="font-bold text-stone-700 mb-1 text-sm">🍁 Leverage Ratio Simulator (CAD millions)</h3>
      <p className="text-xs text-stone-500 mb-4">Maple Leaf Foods như ví dụ - điều chỉnh để xem leverage thay đổi</p>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Total Debt ({debt}M)</label>
          <input type="range" min={100} max={2000} step={50} value={debt} onChange={e => setDebt(+e.target.value)} className="w-full accent-emerald-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Cash ({cash}M)</label>
          <input type="range" min={0} max={300} step={10} value={cash} onChange={e => setCash(+e.target.value)} className="w-full accent-emerald-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">EBITDA ({ebitda}M)</label>
          <input type="range" min={50} max={500} step={10} value={ebitda} onChange={e => setEbitda(+e.target.value)} className="w-full accent-teal-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 p-4 mb-3 font-mono text-sm">
        <div className="flex justify-between mb-1 text-stone-500"><span>Total Debt</span><span>{debt}M</span></div>
        <div className="flex justify-between mb-1 text-stone-500"><span>− Cash</span><span>−{cash}M</span></div>
        <div className="flex justify-between mb-1 border-t pt-1"><span className="font-bold text-stone-800">Net Debt</span><span className="font-bold">{netDebt}M</span></div>
        <div className="flex justify-between mb-1 text-stone-500"><span>÷ EBITDA</span><span>{ebitda}M</span></div>
        <div className="flex justify-between border-t pt-2">
          <span className="font-bold text-stone-800">Net Debt / EBITDA</span>
          <span className={`font-bold text-xl ${ratio > 5 ? "text-stone-700" : ratio > 3 ? "text-stone-700" : "text-stone-700"}`}>{ratio.toFixed(1)}x</span>
        </div>
      </div>

      <div className={`rounded-xl p-3 border text-sm text-center font-medium ${ratio > 5 ? "bg-stone-50 border-stone-200 text-stone-700" : ratio > 3 ? "bg-stone-50 border-stone-200 text-stone-700" : "bg-stone-50 border-stone-200 text-stone-700"}`}>
        {ratio > 5 ? `⚠️ ${ratio.toFixed(1)}x - Leverage cao. Cần xem kỹ debt maturity và FCF coverage.` :
         ratio > 3 ? `🔶 ${ratio.toFixed(1)}x - Trung bình cao. Cần EBITDA grow để tự deleverage.` :
         ` ${ratio.toFixed(1)}x - Lành mạnh cho consumer staples. Khoảng ~${yearsToPayoff.toFixed(1)} năm EBITDA để clear net debt.`}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Maple Leaf Foods - Đọc Nợ Đúng Cách</h2>
      <p className="text-stone-600 text-sm mb-6 italic">995M CAD net debt - nhiều hay ít? Câu trả lời đúng là: tùy vào EBITDA và context</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">📋 Case Study: Maple Leaf Foods</h3>
        <div className="bg-stone-800 text-white rounded-xl p-5 font-mono text-sm space-y-2 mb-4">
          <div className="text-stone-500 text-xs mb-2">{ '// Maple Leaf Foods - Financial Snapshot' }</div>
          <div className="flex justify-between"><span className="text-stone-700">Revenue growth YoY</span><span>+6.2%</span></div>
          <div className="flex justify-between"><span className="text-stone-700">Long-term Debt</span><span>&gt;1B CAD</span></div>
          <div className="flex justify-between"><span className="text-stone-700">Net Debt</span><span>~995M CAD</span></div>
          <div className="flex justify-between"><span className="text-white">Adjusted EBITDA</span><span className="text-stone-700">~122M CAD</span></div>
          <div className="flex justify-between border-t border-stone-600 pt-2"><span className="text-stone-300">Net Debt/EBITDA</span><span className="text-yellow-400">~8x</span></div>
        </div>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
          <p className="text-sm text-stone-700">
            <strong>8x Net Debt/EBITDA nghe có vẻ cao</strong> - nhưng context rất quan trọng. Maple Leaf là consumer staples company với stable, recurring cash flows. Câu hỏi không phải "bao nhiêu nợ?" mà là "dùng nợ làm gì và có thể trả không?"
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> 3 câu hỏi trước khi nhìn vào nợ</h3>
        <div className="space-y-3">
          {[
            {
              q: "1. Purpose of Debt - vay để làm gì?",
              a: "Mở rộng sản xuất, đầu tư nhà máy, tái cấu trúc = productive use. Vay chỉ để trả nợ cũ liên tục = red flag.",
              icon: "",
            },
            {
              q: "2. Cost of Debt - lãi suất bao nhiêu?",
              a: "Nếu vay được 4% và tạo ra ROIC 15%, đòn bẩy là công cụ hỗ trợ. Nếu lãi suất cao hơn ROIC, mỗi đồng nợ phá hủy giá trị.",
              icon: "💰",
            },
            {
              q: "3. Debt Maturity - đến hạn khi nào?",
              a: "Cùng 1 tỷ USD nhưng đáo hạn năm sau vs 10 năm nữa là rủi ro hoàn toàn khác. Maturity ladder và refinancing risk là critical.",
              icon: "📅",
            },
          ].map(s => (
            <div key={s.q} className="flex gap-3 bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="text-2xl flex-shrink-0">{s.icon}</div>
              <div>
                <div className="font-bold text-stone-700 text-sm mb-1">{s.q}</div>
                <p className="text-stone-600 text-xs">{s.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <LeverageSimulator />

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Leverage ratio benchmark theo ngành</h3>
        <div className="space-y-2">
          {[
            { sector: "Utilities", range: "3-5x", note: "Stable regulated cashflow, highly leveraged is normal" },
            { sector: "Consumer Staples (như Maple Leaf, Nestlé)", range: "2-3x", note: "Stable demand → moderate leverage OK" },
            { sector: "Industrials / Manufacturing", range: "1.5-2.5x", note: "Cyclical → lower leverage cẩn thận hơn" },
            { sector: "Technology / SaaS", range: "0-1x", note: "High growth → giữ flexibility, ít debt" },
            { sector: "Airlines / Retail", range: "<2x", note: "Cyclical + thin margin → leverage rất nguy hiểm" },
          ].map(s => (
            <div key={s.sector} className="flex items-center gap-3 bg-stone-50 rounded-lg p-3 border border-stone-200">
              <div className="flex-1">
                <div className="text-sm font-medium text-stone-700">{s.sector}</div>
                <div className="text-xs text-stone-500">{s.note}</div>
              </div>
              <div className="font-bold text-stone-700 text-sm flex-shrink-0">{s.range}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Key insight</h3>
        <div className="bg-stone-50 text-white rounded-xl p-5">
          <p className="font-bold mb-1">Câu hỏi đầu tiên không phải "nợ bao nhiêu?"- mà là "có đủ dòng tiền để trả không?"</p>
          <p className="text-stone-700 text-sm">Net Debt/EBITDA cho biết lý thuyết cần bao nhiêu năm EBITDA để clear nợ. FCF coverage là thực tế. Cả hai cùng nhau mới kể được câu chuyện đầy đủ.</p>
        </div>
      </section>
    </LessonPageLayout>
  );
}
