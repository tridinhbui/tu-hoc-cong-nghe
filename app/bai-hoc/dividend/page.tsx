"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 37, day: 37, accent: "emerald",
  title: "Dividend - Cổ Tức",
  subtitle: "Dividend yield cao không phải lúc nào cũng tốt - cần nhìn FCF",
  duration: "6 phút", difficulty: "Dễ", emoji: "💰",
  nextSlug: "walmart-earnings", nextTitle: "Walmart Earnings Story",
};

const quiz: QuizQuestion[] = [
  {
    question: "Dividend yield cao có luôn tốt không?",
    options: [
      "Có, yield càng cao càng tốt",
      "Không - yield cao đôi khi do giá cổ phiếu giảm mạnh, thị trường lo ngại công ty sắp cắt cổ tức",
      "Có, vì công ty chắc chắn đang tăng trưởng tốt",
      "Dividend yield không liên quan đến giá cổ phiếu",
    ],
    correct: 1,
    explanation: "Dividend Yield = Annual Dividend / Stock Price. Nếu cổ phiếu giảm mạnh (mẫu số giảm) → yield tăng không phải vì cổ tức cao hơn mà vì giá giảm. 'Dividend yield trap': yield 10%+ thường là dấu hiệu thị trường đang nghi ngờ sustainability của dividend.",
  },
  {
    question: "Tại sao cần nhìn Free Cash Flow khi phân tích dividend?",
    options: [
      "FCF cho biết công ty còn bao nhiêu tiền thật sau hoạt động kinh doanh và đầu tư",
      "FCF luôn bằng net income",
      "FCF chỉ dùng để tính doanh thu",
      "FCF không liên quan đến cổ tức",
    ],
    correct: 0,
    explanation: "Cổ tức trả bằng tiền mặt thực, không bằng lợi nhuận kế toán trên giấy. FCF = Operating CF − CapEx = tiền thực còn lại sau khi maintain và grow business. Nếu FCF không cover dividend → công ty phải vay hoặc issue stock để trả → không sustainable.",
  },
  {
    question: "Tyson Foods: payout ratio dựa trên net income ~197% nhưng FCF cover dividend ~4x. Đánh giá?",
    options: [
      "Đáng lo vì payout ratio >100%",
      "Cổ tức ổn định - FCF 4x coverage cho thấy tiền thực sự dư để trả, dù accounting earnings thấp",
      "Tyson sắp cắt cổ tức",
      "Không thể đánh giá mà không có thêm thông tin",
    ],
    correct: 1,
    explanation: "Payout ratio >100% (dựa trên NI) nghe đáng lo, nhưng NI thường thấp hơn FCF vì D&A lớn với manufacturing companies. FCF 4x coverage = FCF gấp 4 lần cổ tức phải trả → rất comfortable. Đây là lý do phải nhìn FCF, không chỉ payout ratio từ NI.",
  },
  {
    question: "Câu hỏi quan trọng nhất khi phân tích dividend là?",
    options: [
      "Cổ tức có cao không",
      "Công ty có đủ FCF để duy trì và có thể phát triển cổ tức theo thời gian không",
      "Giá cổ phiếu hôm nay tăng hay giảm",
      "Công ty có nhiều nhân viên không",
    ],
    correct: 1,
    explanation: "Dividend sustainability check: (1) FCF cover dividend >1.5x? (2) Net Debt/EBITDA manageable? (3) Business có stable/growing earnings không? (4) Payout policy consistent không? Dividend cut là sự kiện tiêu cực lớn với thị trường - thường gây stock price drop 20-30%.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Dividend - Cổ Tức</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Không chỉ là bao nhiêu % - mà là công ty có đủ dòng tiền thật để duy trì không?</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Tại sao cần học về Dividend?</h3>
        <div className="space-y-3">
          {[
            {
              n: "1",
              title: "Dividend phản ánh sức khỏe dòng tiền",
              desc: "Công ty có thể báo lợi nhuận kế toán tốt nhưng nếu dòng tiền yếu thì việc trả cổ tức lâu dài không bền vững. Dividend là cam kết thực tế, phải trả bằng tiền mặt.",
            },
            {
              n: "2",
              title: "Dividend tiết lộ cách ban lãnh đạo dùng tiền",
              desc: "Trả dividend = trả tiền về cho cổ đông (không tìm được investment tốt hơn). Giữ lại = invest vào growth. Không lựa chọn nào luôn đúng - quan trọng là có hợp lý với giai đoạn của công ty không.",
            },
            {
              n: "3",
              title: "Dividend yield cao = cảnh báo, không phải ăn mừng",
              desc: "Yield = Dividend/Price. Yield tăng vì cổ phiếu rớt giá mạnh = 'dividend yield trap'. Thị trường đang price in rủi ro cắt cổ tức.",
            },
          ].map(s => (
            <div key={s.n} className="flex gap-3 border border-stone-200 rounded-xl p-4">
              <div className="w-8 h-8 bg-stone-800 text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">{s.n}</div>
              <div>
                <div className="font-semibold text-stone-800 text-sm mb-0.5">{s.title}</div>
                <p className="text-stone-600 text-xs">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Case Study: Tyson Foods Dividend Analysis</h3>
        <div className="bg-stone-800 text-white rounded-xl p-5 font-mono text-sm mb-4">
          <div className="text-stone-500 text-xs mb-3">{"// Tyson Foods - Dividend Sustainability Check"}</div>
          <div className="flex justify-between mb-1"><span className="text-stone-300">Payout Ratio (NI-based)</span><span>~197%</span></div>
          <div className="flex justify-between mb-1"><span className="text-stone-300">Net Income</span><span className="text-stone-300">~Low (low margin quarter)</span></div>
          <div className="flex justify-between mb-1"><span className="text-stone-200">Free Cash Flow</span><span className="text-stone-200">Much higher than NI</span></div>
          <div className="flex justify-between border-t border-stone-600 pt-2">
            <span className="text-white font-bold">FCF Dividend Coverage</span>
            <span className="text-stone-200 font-bold">~4x</span>
          </div>
          <div className="text-stone-500 text-xs mt-2">NI thấp vì D&A lớn (non-cash). FCF = NI + D&A ± Working Capital - FCF cao hơn NI nhiều.</div>
        </div>
        <div className="border-l-2 border-stone-300 pl-4">
          <p className="text-sm text-stone-700">
            <strong>Bài học:</strong> Payout ratio 197% nhìn đáng lo, nhưng đây là accounting artifact - NI thấp vì D&A lớn. FCF 4x coverage = cổ tức rất sustainable. Điều này chỉ thấy được khi nhìn cash flow, không chỉ nhìn income statement.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Key Dividend Metrics</h3>
        <div className="space-y-3">
          {[
            { metric: "Dividend Yield", formula: "Annual DPS / Stock Price", good: ">2% = income, but check sustainability. >7% = possible yield trap", when: "Để so sánh income return" },
            { metric: "Payout Ratio (NI)", formula: "Annual DPS / EPS", good: "<60% là conservative. >100% = earning không cover dividend", when: "Quick sanity check - nhưng xem FCF nếu D&A lớn" },
            { metric: "FCF Dividend Coverage", formula: "FCF / Total Dividends Paid", good: ">1.5x = comfortable. <1x = nguy hiểm", when: "Metric quan trọng nhất để đánh giá sustainability" },
            { metric: "Dividend Growth Rate", formula: "Year-over-year % increase in DPS", good: "Consistent growers (Dividend Aristocrats) thường 5-10%/năm", when: "Dài hạn - dividend growth stocks outperform" },
          ].map(m => (
            <div key={m.metric} className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-stone-800 text-sm">{m.metric}</span>
                <span className="font-mono text-xs text-stone-600 bg-stone-100 px-2 py-0.5 rounded">{m.formula}</span>
              </div>
              <p className="text-xs text-stone-600 mb-1"><span className="font-medium">Benchmark:</span> {m.good}</p>
              <p className="text-xs text-stone-500">{m.when}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3">Framework phân tích Dividend</h3>
        <div className="space-y-2">
          {[
            "Bước 1: FCF cover dividend >1.5x? - nếu không, tìm hiểu tại sao",
            "Bước 2: Net Debt/EBITDA có room để duy trì không? Nếu leverage cao + FCF tight = rủi ro cut",
            "Bước 3: Business có stable/growing earnings không? Cyclicals rủi ro cut dividend hơn consumer staples",
            "Bước 4: Track record - công ty đã giữ/tăng dividend liên tục bao nhiêu năm? Dividend Aristocrat (25+ năm) = rất tin cậy",
            "Bước 5: Management guidance - họ có cam kết dividend policy rõ ràng không?",
          ].map((s, i) => (
            <div key={i} className="flex gap-3 border border-stone-200 rounded-lg p-3 text-sm">
              <span className="text-stone-500 font-bold flex-shrink-0">→</span>
              <span className="text-stone-700">{s}</span>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
