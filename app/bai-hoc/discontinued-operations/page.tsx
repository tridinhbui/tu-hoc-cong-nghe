"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 21, day: 21, accent: "orange",
  title: "Discontinued Operations",
  subtitle: "Đừng để Net Income đánh lừa bạn",
  duration: "5 phút", difficulty: "Trung bình", emoji: "🔀",
  nextSlug: "on-tap-wacc", nextTitle: "Ôn Tập WACC",
};

const quiz: QuizQuestion[] = [
  {
    question: "Tại sao analyst tách Discontinued Operations ra khỏi Continuing Operations?",
    options: [
      "Vì kế toán bắt buộc phải tách",
      "Vì discontinued ops là one-off - không phản ánh earning power tương lai của core business",
      "Vì discontinued ops luôn là khoản lỗ",
      "Để làm cho Net Income trông đẹp hơn",
    ],
    correct: 1,
    explanation: "Mục tiêu phân tích là dự báo tương lai. Discontinued ops sẽ không còn tạo ra doanh thu nữa - gộp vào sẽ làm méo picture về core business. Analyst chỉ dùng earnings từ continuing operations để value doanh nghiệp.",
  },
  {
    question: "Công ty A báo Net Income = 50 tỷ, trong đó Discontinued Ops = +80 tỷ gain (từ bán mảng). Continuing Ops thực chất là?",
    options: [
      "+130 tỷ - tốt hơn mức báo cáo",
      "−30 tỷ - core business đang lỗ",
      "+50 tỷ - không đổi",
      "Không thể tính từ thông tin này",
    ],
    correct: 1,
    explanation: "Net Income = Continuing Ops + Discontinued Ops → 50 = Continuing Ops + 80 → Continuing Ops = −30 tỷ. Core business đang lỗ! Nếu chỉ nhìn Net Income = 50 tỷ sẽ bị đánh lừa hoàn toàn.",
  },
  {
    question: "Trong DCF và earnings-based valuation, bạn nên dùng earning nào?",
    options: [
      "Net Income - vì đó là 'bottom line' cuối cùng",
      "EBITDA từ Continuing Operations - loại trừ tác động của discontinued",
      "Revenue tổng hợp bao gồm cả discontinued",
      "Earnings per share trên báo cáo",
    ],
    correct: 1,
    explanation: "Dùng earnings/EBITDA từ continuing operations. Discontinued ops sẽ không generate cash flow tương lai → đưa vào DCF sẽ sai. Đây là lý do báo cáo tài chính luôn tách 2 dòng riêng.",
  },
  {
    question: "Khi nào discontinued operations xuất hiện thường xuyên trong báo cáo là dấu hiệu đáng lo?",
    options: [
      "Không bao giờ - tách bán assets là bình thường",
      "Khi xảy ra liên tục nhiều năm - có thể là dấu hiệu chiến lược thiếu nhất quán hoặc capital allocation kém",
      "Chỉ đáng lo khi discontinued ops lỗ",
      "Khi công ty là conglomerate",
    ],
    correct: 1,
    explanation: "Một lần discontinued ops = bình thường (tái cơ cấu, divest mảng không cốt lõi). Liên tục nhiều năm → management có thể đang loay hoay tìm strategy, mua vào rồi bán ra, capital allocation không hiệu quả.",
  },
  {
    question: "Gain on sale of discontinued operations nên được treat thế nào trong valuation?",
    options: [
      "Cộng vào earnings để tính P/E forward",
      "Loại bỏ khỏi normalized earnings - đây là one-time item, không recurring",
      "Chia đều cho các năm trong tương lai",
      "Giữ nguyên nếu gain lớn",
    ],
    correct: 1,
    explanation: "Gain on sale là non-recurring - xảy ra một lần khi bán asset, không bao giờ lặp lại. Trong valuation, analyst dùng 'normalized' hoặc 'adjusted' earnings loại trừ one-time items như thế này.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">Discontinued Operations Income</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Net Income có thể nói dối - biết cách tách discontinued ops là kỹ năng analyst thiết yếu</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">Discontinued Operations là gì?</h3>
        <p className="text-stone-600 leading-relaxed mb-4">
          Discontinued Operations = phần business đã bán hoặc đóng cửa và <strong>sẽ không còn đóng góp doanh thu/lợi nhuận trong tương lai</strong>. Kế toán bắt buộc phải báo cáo tách biệt để tránh làm méo picture về core business đang hoạt động.
        </p>
        <div className="border-l-2 border-stone-300 pl-4 space-y-2">
          <div className="text-sm font-semibold text-stone-800 mb-2">Ví dụ thực tế:</div>
          <div className="space-y-1 text-sm text-stone-600">
            <div> - Masan bán mảng Masan Consumer Holdings để tập trung vào retail</div>
            <div> - Vingroup thoái vốn VinCommerce (Winmart) cho Masan → discontinued ops cho Vingroup</div>
            <div> - GE bán mảng tài chính GE Capital - gain khổng lồ trên P&amp;L nhưng là one-time</div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">Cấu trúc trình bày trên Income Statement</h3>
        <div className="bg-stone-800 text-white rounded-xl p-5 font-mono text-sm space-y-2">
          <div className="text-stone-500 text-xs mb-3">{"// Cách đọc đúng"}</div>
          <div className="flex justify-between"><span className="text-white">Revenue</span><span className="text-stone-300">1.000</span></div>
          <div className="flex justify-between"><span className="text-stone-300">− Operating Expenses</span><span className="text-stone-500">(800)</span></div>
          <div className="flex justify-between border-t border-stone-600 pt-2"><span className="text-white font-bold">Income from Continuing Ops</span><span className="text-stone-200 font-bold">200</span></div>
          <div className="flex justify-between pt-1"><span className="text-stone-300">Discontinued Operations (net of tax)</span><span className="text-stone-500">(150)</span></div>
          <div className="flex justify-between border-t border-stone-600 pt-2"><span className="text-white font-bold">Net Income</span><span className="text-white font-bold">50</span></div>
          <div className="mt-3 text-xs text-stone-500 border-t border-stone-700 pt-3">
            Analyst dùng 200 để value - không phải 50
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">Income Statement Decomposer - Ví dụ</h3>
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden mb-4">
          <div className="bg-stone-50 px-4 py-2 text-xs font-bold text-stone-600 border-b border-stone-200">INCOME STATEMENT (tỷ VNĐ) - Ví dụ minh họa</div>
          <div className="p-4 space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-stone-600">Income from Continuing Ops</span>
              <span className="font-bold text-stone-800">+100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Discontinued Operations (net of tax)</span>
              <span className="font-bold text-stone-600">−30</span>
            </div>
            <div className="flex justify-between border-t border-stone-200 pt-2">
              <span className="font-bold text-stone-800">Net Income</span>
              <span className="font-bold text-lg text-stone-800">+70</span>
            </div>
          </div>
        </div>
        <div className="border-l-2 border-stone-300 pl-4">
          <p className="text-sm text-stone-700">Analyst view: Core business thực chất đang kiếm 100 tỷ - Net Income 70 tỷ đang bị kéo xuống bởi discontinued ops. Dùng 100 tỷ để định giá, không phải 70 tỷ.</p>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">Ứng dụng trong phân tích</h3>
        <div className="space-y-3">
          {[
            {
              title: "Trong Valuation (DCF / Multiples)",
              desc: "Chỉ dùng EBIT, EBITDA, Net Income từ Continuing Operations. Discontinued ops sẽ không generate cash flow tương lai → đưa vào DCF sẽ sai.",
            },
            {
              title: "Trong Earnings Quality Analysis",
              desc: "Tách Net Income → Continuing + Discontinued. Nếu Continuing lỗ nhưng Net Income dương nhờ bán assets → red flag về core business.",
            },
            {
              title: "Trong Trend Analysis",
              desc: "Xem discontinued ops xuất hiện bao nhiêu lần trong 5 năm. Liên tục → management có thể đang loay hoay về strategy, capital allocation kém hiệu quả.",
            },
          ].map(s => (
            <div key={s.title} className="border border-stone-200 rounded-xl p-4">
              <div className="font-semibold text-stone-800 text-sm mb-1">{s.title}</div>
              <div className="text-stone-600 text-sm">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">Takeaway</h3>
        <div className="bg-stone-900 text-white rounded-xl p-5 text-center">
          <p className="text-lg font-bold mb-2">Đừng để Net Income đánh lừa.</p>
          <p className="text-stone-500 text-sm">Luôn tách Continuing Operations ra khi phân tích earnings - đó là số phản ánh business thực đang chạy.</p>
        </div>
      </section>
    </LessonPageLayout>
  );
}
