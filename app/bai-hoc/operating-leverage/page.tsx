"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 30, day: 30, accent: "teal",
  title: "Operating Leverage",
  subtitle: "Tại sao SaaS kiếm nhiều hơn Airlines dù cùng doanh thu tăng?",
  duration: "6 phút", difficulty: "Trung bình", emoji: "📈",
  nextSlug: "income-affiliates-jv", nextTitle: "Income from Affiliates & JV",
};

const quiz: QuizQuestion[] = [
  {
    question: "Công ty nào có operating leverage cao hơn?",
    options: [
      "SaaS company: 80% fixed costs, thêm user với chi phí gần bằng 0",
      "Nhà hàng: chi phí biến đổi cao (nguyên liệu, nhân công) theo mỗi khách",
      "Taxi truyền thống: biến phí cao theo km",
      "Nông sản: cost phụ thuộc mùa vụ và sản lượng",
    ],
    correct: 0,
    explanation: "SaaS có operating leverage cao vì fixed cost lớn (servers, R&D, team cố định) nhưng marginal cost gần 0 khi thêm user. Doanh thu tăng → gần như toàn bộ incremental revenue chuyển thành profit. Airlines cũng có fixed cost cao (máy bay, sân bay) nhưng fuel cost là variable lớn.",
  },
  {
    question: "Doanh thu tăng nhưng operating margin tăng nhanh hơn - điều này phản ánh?",
    options: [
      "Công ty đang giảm giá bán",
      "Operating leverage dương - fixed cost được phân bổ trên nhiều đơn vị hơn, biên lợi nhuận mở rộng",
      "Công ty không có nợ",
      "Tax rate giảm",
    ],
    correct: 1,
    explanation: "Khi doanh thu tăng nhưng fixed cost không tăng tương ứng → cost per unit giảm → operating margin tăng nhanh hơn revenue. Đây là 'operating leverage in action'- đặc trưng của scalable business models.",
  },
  {
    question: "Airlines có operating leverage cao - đây là rủi ro hay cơ hội?",
    options: [
      "Chỉ là cơ hội",
      "Chỉ là rủi ro",
      "Cả hai - doanh thu tăng → lợi nhuận tăng mạnh; doanh thu giảm → lỗ nhanh. Fixed costs vẫn phải trả dù không bay.",
      "Không liên quan đến profitability",
    ],
    correct: 2,
    explanation: "High operating leverage = double-edged sword. Khi load factor cao → margin tốt. Khi recession/covid → revenue giảm nhưng fixed costs (lease máy bay, airport fees, nhân công phi công) vẫn phải trả → lỗ sâu. Đây là lý do airlines có track record phá sản nhiều.",
  },
  {
    question: "SG&A leverage là gì?",
    options: [
      "Nợ của phòng sales",
      "Doanh thu tăng nhưng SG&A (Sales, General & Administrative) không tăng tương ứng - một dạng operating leverage qua chi phí cố định",
      "Chi phí Marketing tăng",
      "Tỷ lệ nợ trên vốn",
    ],
    correct: 1,
    explanation: "SG&A leverage = khi revenue tăng nhưng SG&A grows slower → SG&A/Revenue ratio giảm → margin cải thiện. Điển hình khi công ty đã build được brand, distribution, và internal processes - thêm revenue mà không cần tăng proportionally overhead.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Operating Leverage</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Tại sao doanh thu tăng 30% nhưng lợi nhuận tăng 100%? - Đòn bẩy hoạt động</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Operating Leverage là gì?</h3>
        <div className="border-l-2 border-stone-300 pl-4 mb-4">
          <p className="text-sm text-stone-700 leading-relaxed">
            <strong>Operating leverage</strong> = mức độ doanh thu tăng được khuếch đại thành lợi nhuận. Công ty có fixed cost cao → khi revenue tăng, cost không tăng tương ứng → <strong>margin mở rộng nhanh</strong>.
          </p>
        </div>
        <div className="bg-stone-900 text-white rounded-xl p-5 text-center">
          <div className="font-mono text-lg font-bold mb-1">Degree of Op. Leverage (DOL) = % Change in EBIT / % Change in Revenue</div>
          <p className="text-stone-300 text-sm">DOL = 3 → doanh thu tăng 10% → EBIT tăng 30%</p>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">SaaS vs Airlines: cùng fixed cost, khác kết quả</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-stone-200 rounded-xl p-4">
            <div className="font-bold text-stone-800 mb-3 text-sm">SaaS Company</div>
            <div className="space-y-1.5 text-xs text-stone-600">
              <div> - Fixed: servers, R&D team, offices</div>
              <div> - Variable: ~near 0 per user</div>
              <div> - Gross margin: 70-85%</div>
              <div> - Scale: add 1M users → tiny incremental cost</div>
              <div className="font-semibold text-stone-800">→ DOL rất cao khi past break-even</div>
            </div>
          </div>
          <div className="border border-stone-200 rounded-xl p-4">
            <div className="font-bold text-stone-800 mb-3 text-sm">Airlines</div>
            <div className="space-y-1.5 text-xs text-stone-600">
              <div> - Fixed: máy bay (lease), phi công, airport</div>
              <div> - Variable: fuel (~30% revenue), catering</div>
              <div> - Gross margin: 20-35%</div>
              <div> - Scale: thêm chuyến bay → thêm fuel lớn</div>
              <div className="font-semibold text-stone-800">→ DOL cao nhưng variable cost cũng cao</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">SG&A Leverage - dấu hiệu mạnh của scalability</h3>
        <div className="space-y-2">
          {[
            { year: "Năm 1", rev: "100M", sga: "40M", ratio: "40%", note: "Build team, marketing, system" },
            { year: "Năm 2", rev: "200M", sga: "55M", ratio: "27.5%", note: "Revenue double nhưng SG&A chỉ +37%" },
            { year: "Năm 3", rev: "350M", sga: "68M", ratio: "19.4%", note: "Brand, distribution đã built - leverage kicks in" },
          ].map(r => (
            <div key={r.year} className="flex items-center gap-3 bg-stone-50 rounded-lg p-3 border border-stone-200">
              <div className="w-16 text-xs font-bold text-stone-700 flex-shrink-0">{r.year}</div>
              <div className="flex-1 font-mono text-xs">
                Rev: <span className="text-stone-800">{r.rev}</span> | SG&A: <span className="text-stone-500">{r.sga}</span> | Ratio: <span className="font-bold text-stone-700">{r.ratio}</span>
              </div>
              <div className="text-xs text-stone-500 flex-shrink-0 max-w-32">{r.note}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-stone-500 mt-2 italic">SG&A/Revenue giảm dần = SG&A leverage đang hoạt động.</p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3">Operating leverage = double-edged sword</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-stone-200 rounded-xl p-4">
            <div className="font-bold text-stone-800 mb-2 text-sm">Khi doanh thu tăng</div>
            <p className="text-xs text-stone-600">Margin mở rộng nhanh hơn doanh thu. Lợi nhuận tăng bội phần. Investors reward với premium valuation.</p>
          </div>
          <div className="border border-stone-200 rounded-xl p-4">
            <div className="font-bold text-stone-800 mb-2 text-sm">Khi doanh thu giảm</div>
            <p className="text-xs text-stone-600">Fixed costs vẫn phải trả → loss phóng đại. Airlines, hotels mất tiền nhanh khi recession. High operating leverage amplifies volatility cả hai chiều.</p>
          </div>
        </div>
      </section>
    </LessonPageLayout>
  );
}
