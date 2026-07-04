"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 26, day: 26, accent: "indigo",
  title: "Market Fair Value",
  subtitle: "Tại sao AI companies lỗ mà vẫn được định giá hàng chục tỷ USD?",
  duration: "6 phút", difficulty: "Trung bình", emoji: "🔮",
  nextSlug: "vingroup-cash-flow", nextTitle: "Đọc Dòng Tiền Vingroup",
};

const quiz: QuizQuestion[] = [
  {
    question: "Nếu công ty có net income 50M USD và market định giá ở P/E 30x, equity valuation là bao nhiêu?",
    options: ["500M USD", "1B USD", "1.5B USD", "3B USD"],
    correct: 2,
    explanation: "Equity Value = Net Income × P/E = 50M × 30 = 1.500M = 1.5B USD. P/E là số lần nhà đầu tư sẵn sàng trả cho mỗi đồng lợi nhuận — P/E 30x cao, thường gặp ở growth companies.",
  },
  {
    question: "Điều nào thường làm valuation tăng?",
    options: [
      "Interest rate tăng mạnh",
      "Growth expectation tăng",
      "Earnings giảm mạnh",
      "Risk tăng cao",
    ],
    correct: 1,
    explanation: "Growth expectation tăng → nhà đầu tư sẵn sàng trả P/E multiple cao hơn cho cùng mức earnings hiện tại. Interest rate tăng → discount rate tăng → PV giảm → valuation giảm. Risk tăng → required return tăng → valuation giảm.",
  },
  {
    question: "Với growth companies như AI startups, investor thường focus nhiều hơn vào điều gì?",
    options: [
      "Historical accounting cost",
      "Office size và headcount",
      "Future cash flow potential, TAM, market dominance",
      "Daily stock volume",
    ],
    correct: 2,
    explanation: "Growth companies được định giá theo kỳ vọng tương lai, không phải earnings hiện tại. TAM (Total Addressable Market), revenue growth rate, market share, và long-term margin profile là những gì matters nhất.",
  },
  {
    question: "Tại sao valuation của growth companies rất sensitive với assumption?",
    options: [
      "Vì chúng không có tài sản hữu hình",
      "Phần lớn value nằm ở terminal value xa trong tương lai — thay đổi nhỏ trong growth/margin assumption → đổi lớn trong PV",
      "Vì không có lợi nhuận để so sánh",
      "Vì nhà đầu tư không hiểu business",
    ],
    correct: 1,
    explanation: "80%+ value của growth company nằm ở terminal value (dòng tiền từ năm 10 trở đi). Một thay đổi nhỏ trong long-term growth rate (ví dụ từ 4% xuống 3%) có thể làm valuation thay đổi 20-30%. Đây là lý do discounted cash flow rất volatile với high-growth companies.",
  },
  {
    question: "\"Price không phải lúc nào cũng bằng Value\" — điều này ngụ ý điều gì?",
    options: [
      "Stock market không đáng tin cậy và không nên đầu tư",
      "Market ngắn hạn bị ảnh hưởng bởi sentiment và liquidity — cơ hội tồn tại khi price ≠ fair value",
      "Chỉ nên mua cổ phiếu khi giá thấp",
      "Fair value không thể tính được",
    ],
    correct: 1,
    explanation: "Benjamin Graham: 'Trong ngắn hạn thị trường là máy bỏ phiếu, trong dài hạn là máy cân'. Stock có thể trade cao hơn (overvalued) hoặc thấp hơn (undervalued) fair value trong thời gian dài do sentiment, liquidity, và narrative — tạo cơ hội cho value investors.",
  },
];

function PEValuationSimulator() {
  const [netIncome, setNetIncome] = useState(100);
  const [pe, setPE] = useState(20);
  const [growthPremium, setGrowthPremium] = useState(0);

  const adjustedPE = pe + growthPremium;
  const equityValue = netIncome * adjustedPE;

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 border border-stone-200 my-6">
      <h3 className="font-bold text-stone-700 mb-1 text-sm"> P/E Valuation Simulator</h3>
      <p className="text-xs text-stone-500 mb-4">Điều chỉnh để thấy P/E và growth expectation ảnh hưởng đến valuation</p>

      <div className="grid grid-cols-1 gap-3 mb-5">
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Net Income ({netIncome}M USD)</label>
          <input type="range" min={10} max={500} step={10} value={netIncome} onChange={e => setNetIncome(+e.target.value)} className="w-full accent-indigo-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Base P/E Multiple ({pe}x)</label>
          <input type="range" min={5} max={50} value={pe} onChange={e => setPE(+e.target.value)} className="w-full accent-indigo-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Growth Premium (+{growthPremium}x P/E)</label>
          <input type="range" min={0} max={80} value={growthPremium} onChange={e => setGrowthPremium(+e.target.value)} className="w-full accent-purple-400" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 p-4 space-y-2 font-mono text-sm mb-3">
        <div className="flex justify-between text-stone-500">
          <span>Net Income</span>
          <span className="font-bold text-stone-700">{netIncome}M USD</span>
        </div>
        <div className="flex justify-between text-stone-500">
          <span>Adjusted P/E (base + growth premium)</span>
          <span className="font-bold text-stone-700">{adjustedPE}x</span>
        </div>
        <div className="flex justify-between border-t pt-2">
          <span className="font-bold text-stone-800">Equity Value</span>
          <span className="font-bold text-xl text-stone-700">
            {equityValue >= 1000 ? `${(equityValue / 1000).toFixed(1)}B` : `${equityValue}M`} USD
          </span>
        </div>
      </div>

      <div className={`rounded-xl p-3 border text-center text-sm ${adjustedPE > 50 ? "bg-stone-50 border-stone-200" : adjustedPE > 30 ? "bg-stone-50 border-stone-200" : "bg-stone-50 border-stone-200"}`}>
        <span className="font-bold">
          {adjustedPE > 50 ? "⚠️ P/E rất cao — market kỳ vọng growth cực lớn. Sensitive với thay đổi nhỏ." :
           adjustedPE > 30 ? "🔶 P/E cao — growth company territory. Cần growth story thuyết phục." :
           " P/E hợp lý — mature business hoặc value stock."}
        </span>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Market Fair Value</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Market không chỉ định giá earnings hôm nay — market định giá kỳ vọng tương lai</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">🤔 Tại sao Anthropic được định giá ~60B USD dù chưa profitable lớn?</h3>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 mb-4">
          <p className="text-sm text-stone-700 leading-relaxed">
            Câu hỏi hay. Lý do là <strong>market định giá dựa trên future expectation</strong>, không chỉ earnings hiện tại. Investors đang đặt cược vào: TAM khổng lồ của AI, market dominance potential, và long-term cash flow khi AI becomes infrastructure.
          </p>
        </div>
        <p className="text-stone-600 leading-relaxed">
          Trong finance, <strong>fair value</strong> = mức định giá hợp lý dựa trên khả năng tạo ra future cash flow, earnings và growth. Với growth companies, phần lớn value nằm ở tương lai — đó là lý do định giá rất sensitive với assumptions.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">📐 Định giá cơ bản: P/E Multiple</h3>
        <div className="bg-stone-50 text-white rounded-xl p-5 text-center mb-4">
          <div className="font-mono text-xl font-bold mb-1">Equity Value = Net Income × P/E</div>
          <p className="text-stone-700 text-sm">P/E = nhà đầu tư sẵn sàng trả bao nhiêu lần earnings</p>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-4 font-mono text-sm">
          <div className="text-stone-400 text-xs mb-2">{ '// Ví dụ công ty stable' }</div>
          <div className="flex justify-between mb-1"><span>Net Income</span><span className="text-stone-700">100M USD</span></div>
          <div className="flex justify-between mb-1"><span>P/E múltiple</span><span className="text-stone-700">20x</span></div>
          <div className="flex justify-between border-t pt-1"><span className="font-bold">Equity Value</span><span className="font-bold">2,000M = 2B USD</span></div>
        </div>
      </section>

      <PEValuationSimulator />

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Stable vs Growth Company: cách nhìn khác nhau</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 mb-3 text-sm">🏭 Stable Company</div>
            <ul className="space-y-1.5 text-xs text-stone-600">
              <li className="flex gap-1.5"><span className="text-stone-400">·</span>P/E: 10–20x</li>
              <li className="flex gap-1.5"><span className="text-stone-400">·</span>Focus: current earnings</li>
              <li className="flex gap-1.5"><span className="text-stone-400">·</span>Metrics: P/E, EV/EBITDA</li>
              <li className="flex gap-1.5"><span className="text-stone-400">·</span>Ví dụ: Vinamilk, Petrolimex</li>
            </ul>
          </div>
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 mb-3 text-sm">🚀 Growth Company</div>
            <ul className="space-y-1.5 text-xs text-stone-600">
              <li className="flex gap-1.5"><span className="text-stone-700">·</span>P/E: 50–200x (hoặc N/A)</li>
              <li className="flex gap-1.5"><span className="text-stone-700">·</span>Focus: revenue growth, TAM</li>
              <li className="flex gap-1.5"><span className="text-stone-700">·</span>Metrics: EV/Revenue, ARR</li>
              <li className="flex gap-1.5"><span className="text-stone-700">·</span>Ví dụ: Anthropic, OpenAI</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">⚠️ Key insight: Price ≠ Value</h3>
        <div className="space-y-3">
          {[
            { label: "Short-term", driver: "Sentiment, liquidity, narrative, momentum", example: "Meme stocks, FOMO rallies" },
            { label: "Long-term", driver: "Fundamental value — earnings, cash flow, growth", example: "Warren Buffett: buy wonderful companies at fair prices" },
          ].map(s => (
            <div key={s.label} className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-stone-500 bg-stone-200 px-2 py-0.5 rounded">{s.label}</span>
                <span className="text-sm font-semibold text-stone-700">Price driven by:</span>
              </div>
              <p className="text-stone-600 text-sm mb-1">{s.driver}</p>
              <p className="text-stone-400 text-xs italic">{s.example}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3"> 5 drivers investor theo dõi ở growth companies</h3>
        <div className="space-y-2">
          {[
            { d: "Revenue growth rate", n: "30%+ thường được coi là high-growth; deceleration là red flag" },
            { d: "TAM (Total Addressable Market)", n: "Thị trường đủ lớn không? AI TAM được ước tính >1 trillion USD" },
            { d: "Market dominance / moat", n: "Network effect, switching cost, data advantage" },
            { d: "Path to profitability", n: "Khi nào có thể FCF positive? Unit economics ra sao?" },
            { d: "Long-term margin potential", n: "SaaS điển hình: gross margin 70-80%, operating margin 20-30% khi scale" },
          ].map(s => (
            <div key={s.d} className="flex gap-3 bg-stone-50 rounded-lg p-3 border border-stone-200">
              <span className="font-bold text-stone-700 text-sm flex-shrink-0">·</span>
              <div>
                <span className="font-semibold text-stone-800 text-sm">{s.d}: </span>
                <span className="text-stone-600 text-sm">{s.n}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
