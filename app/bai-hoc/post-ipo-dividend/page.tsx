"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 40, day: 40, accent: "violet",
  title: "Post-IPO: Nên Trả Cổ Tức?",
  subtitle: "Bài toán capital allocation thực tế ngay sau IPO",
  duration: "6 phút", difficulty: "Trung bình", emoji: "🚀",
  nextSlug: "disney-pixar-ma", nextTitle: "Disney–Pixar: Horizontal M&A",
};

const quiz: QuizQuestion[] = [
  {
    question: "Công ty lợi nhuận 100M USD nhưng FCF = -50M USD. Có nên trả cổ tức lớn không?",
    options: [
      "Có - lợi nhuận 100M là đủ",
      "Không - FCF âm 50M nghĩa là tiền thực ra chưa đủ; trả cổ tức sẽ phải vay hoặc issue thêm stock",
      "Tùy CEO quyết định",
      "Chỉ cần payout ratio <50% là ổn",
    ],
    correct: 1,
    explanation: "Cổ tức trả bằng tiền mặt thực, không phải lợi nhuận kế toán. FCF -50M = sau CapEx còn thiếu 50M. Trả cổ tức khi FCF âm → phải vay hoặc dilute shareholders → không tạo value. Rule: dividend nên đến từ excess FCF sau khi đã invest vào tất cả NPV-positive projects.",
  },
  {
    question: "Tại sao nhiều công ty công nghệ mới IPO thường không trả cổ tức?",
    options: [
      "Vì họ không có lợi nhuận",
      "Vì mọi tech company đều lỗ",
      "Vì còn nhiều cơ hội reinvest với ROI cao hơn cost of capital - mỗi đồng reinvest tạo ra >1 đồng value",
      "Vì SEC không cho phép",
    ],
    correct: 2,
    explanation: "Post-IPO tech companies: ROIC thường rất cao (30-50%+), còn nhiều TAM chưa capture. Reinvest $1 vào R&D/expansion → tạo ra $2-3 value. Trả cổ tức tức là từ bỏ growth opportunities đó. Chỉ khi market opportunity thu hẹp hoặc ROIC < WACC thì mới nên return capital.",
  },
  {
    question: "Công ty chưa muốn cam kết dividend định kỳ. Giải pháp linh hoạt hơn là?",
    options: [
      "Trả cổ tức cao nhất có thể",
      "Mua lại cổ phiếu (share buyback) - linh hoạt hơn vì có thể adjust theo từng năm",
      "Không làm gì cả",
      "Phát hành thêm cổ phiếu",
    ],
    correct: 1,
    explanation: "Share buyback vs Dividend: (1) Buyback linh hoạt - không tạo expectation phải duy trì hàng năm. (2) Dividend cut là negative signal → stock giảm mạnh; reduce buyback ít bị penalize hơn. (3) Buyback tăng EPS (ít cổ phiếu hơn) và thường tax-efficient hơn. Apple, Microsoft dùng cả hai.",
  },
  {
    question: "\"Nếu giữ lại 1 đồng hôm nay, công ty có tạo được hơn 1 đồng giá trị trong tương lai không?\"- Đây là câu hỏi của loại phân tích nào?",
    options: [
      "Dividend Discount Model",
      "Capital Allocation - xác định opportunity cost của việc return capital vs reinvest",
      "Bond valuation",
      "Margin analysis",
    ],
    correct: 1,
    explanation: "Capital allocation decision framework: nếu ROIC > WACC và còn growth opportunities → reinvest. Nếu không → return capital (dividend hoặc buyback). Đây là câu hỏi Warren Buffett nổi tiếng đặt ra: 'retained earnings phải tạo ra ít nhất $1 market value per $1 retained'. Nếu không → trả lại cho shareholders.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Post-IPO: Nên Trả Cổ Tức Không?</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Bài toán CFO phải trả lời: giữ tiền grow hay chia lại cho cổ đông?</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Bài toán thực tế sau IPO</h3>
        <div className="border-l-2 border-stone-300 pl-4 mb-4">
          <p className="text-sm text-stone-700 leading-relaxed">
            Công ty vừa IPO, lợi nhuận 100M USD. Có nên chia 10M cho cổ đông không? Câu hỏi đúng không phải "có đủ lợi nhuận để chia không?"- mà là <strong>"nếu giữ lại 1 đồng, có tạo ra hơn 1 đồng giá trị trong tương lai không?"</strong>
          </p>
        </div>
        <div className="border-l-2 border-stone-300 pl-4">
          <p className="text-sm text-stone-700"><strong>Quan trọng:</strong> Cổ tức trả bằng tiền mặt thực, không phải lợi nhuận kế toán. Phải nhìn FCF, không chỉ Net Income.</p>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Trước tiên: ROIC và WACC là gì?</h3>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 mb-3 space-y-3">
          <p className="text-sm text-stone-700 leading-relaxed">
            <strong>ROIC (tỷ suất sinh lời trên vốn đầu tư)</strong>: nếu công ty bỏ 100 đồng vốn vào hoạt động kinh doanh, mỗi năm công ty tạo ra bao nhiêu đồng lợi nhuận từ số vốn đó. ROIC = 20% nghĩa là mỗi 100 đồng vốn tạo ra 20 đồng lợi nhuận/năm.
          </p>
          <p className="text-sm text-stone-700 leading-relaxed">
            <strong>WACC (chi phí vốn bình quân)</strong>: chi phí mà công ty phải trả để có được số vốn đó - gồm lãi vay ngân hàng/trái phiếu và mức lợi nhuận tối thiểu mà cổ đông kỳ vọng khi bỏ tiền vào công ty (nếu không đạt được, cổ đông thà đem tiền đi đầu tư chỗ khác). WACC = 10% nghĩa là công ty cần tạo ra ít nhất 10 đồng lợi nhuận trên mỗi 100 đồng vốn để "hòa vốn" so với kỳ vọng của người góp vốn.
          </p>
          <p className="text-sm text-stone-700 leading-relaxed">
            <strong>Logic đơn giản:</strong> nếu ROIC &gt; WACC (ví dụ 20% &gt; 10%) → mỗi đồng công ty giữ lại và tái đầu tư sinh lời tốt hơn mức cổ đông tự đi đầu tư nơi khác → nên giữ tiền lại để tái đầu tư. Ngược lại, nếu ROIC &lt; WACC → công ty đầu tư vào hoạt động kinh doanh mà sinh lời kém hơn chi phí vốn, tức là đang "phá hủy" giá trị → nên trả tiền lại cho cổ đông (chia cổ tức hoặc mua lại cổ phiếu) để cổ đông tự tìm nơi đầu tư tốt hơn.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Framework: Khi nào nên Return Capital?</h3>
        <div className="space-y-3">
          {[
            {
              condition: "ROIC > WACC và còn nhiều growth opportunities",
              decision: "Reinvest - mỗi đồng reinvest tạo ra > 1 đồng value",
              action: "Không trả dividend hoặc buyback ít",
              example: "Amazon 2000-2015, early Apple, Nvidia 2020-2023",
            },
            {
              condition: "ROIC > WACC nhưng cơ hội reinvest hạn chế",
              decision: "Return excess capital - có lời nhưng không có chỗ put money",
              action: "Buyback hoặc special dividend",
              example: "Apple 2012+, Microsoft 2015+",
            },
            {
              condition: "Mature business, stable earnings, ROIC ≈ WACC",
              decision: "Regular dividend - signal stability, thu hút income investors",
              action: "Payout ratio 30-60% của FCF",
              example: "Coca-Cola, P&G, Johnson & Johnson",
            },
            {
              condition: "ROIC < WACC (growth destroys value)",
              decision: "Return capital - tốt hơn là reinvest lỗ",
              action: "Dividend + stop unprofitable growth",
              example: "Airlines sau restructuring",
            },
          ].map(s => (
            <div key={s.condition} className="border border-stone-200 rounded-xl p-4">
              <div className="text-xs text-stone-500 mb-1">Khi: {s.condition}</div>
              <div className="font-bold text-stone-800 text-sm mb-1">→ {s.decision}</div>
              <div className="text-xs text-stone-600 mb-1">{s.action}</div>
              <div className="text-xs text-stone-500 italic">{s.example}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Dividend vs Share Buyback</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-stone-200 rounded-xl p-4">
            <div className="font-bold text-stone-800 mb-2 text-sm">Dividend</div>
            <div className="space-y-1 text-xs text-stone-600">
              <div> - Regular income cho investors</div>
              <div> - Signal stability và confidence</div>
              <div> - Tạo expectation - cut = negative signal lớn</div>
              <div> - Ít linh hoạt hơn</div>
            </div>
          </div>
          <div className="border border-stone-200 rounded-xl p-4">
            <div className="font-bold text-stone-800 mb-2 text-sm">Share Buyback</div>
            <div className="space-y-1 text-xs text-stone-600">
              <div> - Linh hoạt - adjust mỗi năm</div>
              <div> - Tax-efficient ở một số jurisdictions</div>
              <div> - Tăng EPS (ít shares hơn)</div>
              <div> - Có thể wasteful nếu buyback khi stock overvalued</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Post-IPO: Một số hướng giải quyết</h3>
        <div className="space-y-2">
          {[
            "Đầu tư hết vào các dự án NPV-positive trước → phần FCF dư thừa mới xem xét return capital",
            "Nếu chọn dividend: bắt đầu thấp và bền vững hơn là cao rồi phải cắt",
            "Buyback linh hoạt hơn: không tạo commitment cứng nhắc theo năm",
            "Nếu FCF âm: không nên trả cổ tức - sẽ phải vay hoặc dilute để tài trợ",
            "Communicate rõ với investors: capital allocation policy là gì và tại sao",
          ].map((s, i) => (
            <div key={i} className="flex gap-3 bg-stone-50 rounded-lg p-3 text-sm border border-stone-200">
              <span className="text-stone-600 font-bold flex-shrink-0">{i + 1}.</span>
              <span className="text-stone-700">{s}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3">Key Question</h3>
        <div className="bg-stone-900 text-white rounded-xl p-5 text-center">
          <p className="font-bold text-lg mb-2">"Nếu giữ lại 1 đồng hôm nay, công ty có tạo ra hơn 1 đồng giá trị không?"</p>
          <p className="text-stone-300 text-sm">Nếu có → giữ lại. Nếu không → trả lại cho cổ đông. Đây là foundation của capital allocation decision.</p>
        </div>
      </section>
    </LessonPageLayout>
  );
}
