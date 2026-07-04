"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 27, day: 27, accent: "cyan",
  title: "Đọc Dòng Tiền Vingroup",
  subtitle: "Lesson từ báo cáo LCTT Q4/2024 — xoay vòng vốn vay 160.000 tỷ",
  duration: "6 phút", difficulty: "Trung bình", emoji: "🏢",
  nextSlug: "enterprise-value", nextTitle: "Enterprise Value",
};

const quiz: QuizQuestion[] = [
  {
    question: "Vì sao công ty bất động sản thường vay nợ lớn?",
    options: [
      "Vì ngành cần vốn lớn cho dự án — đất, xây dựng, hạ tầng mất nhiều năm mới thu hồi được",
      "Vì muốn giảm doanh thu",
      "Vì không có tài sản để dùng",
      "Vì không bán được nhà",
    ],
    correct: 0,
    explanation: "Real estate là ngành capital-intensive: mua đất, xây dựng, phát triển dự án mất 2-5 năm mới bàn giao và thu tiền. Trong thời gian đó cần vốn rất lớn → vay nợ là tất yếu. Chất lượng phụ thuộc vào khả năng xoay vòng và thu hồi tiền.",
  },
  {
    question: "Nếu lợi nhuận cao nhưng cash flow từ hoạt động kinh doanh yếu, điều đó có thể cho thấy gì?",
    options: [
      "Công ty thu tiền chưa tốt — doanh thu được ghi nhận nhưng tiền chưa về (AR cao, hàng tồn kho nhiều)",
      "Công ty chắc chắn rất khỏe mạnh",
      "Debt bằng 0",
      "Không cần xem balance sheet thêm",
    ],
    correct: 0,
    explanation: "Profit is opinion, cash is fact. Lãi cao + OCF yếu = dấu hiệu earnings quality kém: có thể tiền chưa thu được từ khách (AR tăng), hoặc hàng tồn kho tích lũy nhiều. Với BĐS, điều này rất phổ biến khi dự án chưa bàn giao.",
  },
  {
    question: "Khi đọc báo cáo công ty bất động sản, finance analyst thường xem thêm gì nhiều nhất?",
    options: [
      "Dòng tiền và tiền mặt cuối kỳ — đặc biệt tiền vay mới, tiền trả nợ gốc, liquidity buffer",
      "Giá vốn hàng bán",
      "Hàng tồn kho đơn thuần",
      "Giá cổ phiếu mỗi ngày",
    ],
    correct: 0,
    explanation: "Với BĐS/holding leverage cao: (1) Tiền vay mới vs trả nợ gốc — xem xoay vòng như thế nào, (2) Tiền mặt cuối kỳ — có đủ buffer không, (3) Operating CF — có thực sự generate cash từ bán nhà không.",
  },
  {
    question: "Vingroup Q4/2024: vay 165.900 tỷ, trả nợ 156.180 tỷ, chênh lệch ~9.720 tỷ. Điều này phản ánh điều gì?",
    options: [
      "Vingroup đang vay rất ít và thận trọng",
      "Xoay vòng vốn vay liên tục — refinancing quy mô lớn, đặc trưng của tập đoàn BĐS-hạ tầng",
      "Vingroup sắp vỡ nợ",
      "Tiền mặt sẽ giảm về 0",
    ],
    correct: 1,
    explanation: "Gross borrowing 165.900 tỷ ≠ net borrowing 9.720 tỷ. Phần lớn là refinancing — vay mới để trả nợ cũ đến hạn. Đây là đặc trưng bình thường của tập đoàn BĐS-hạ tầng có nhiều dự án dài hạn, miễn là liquidity được duy trì và dự án generate cash.",
  },
  {
    question: "Tiền mặt cuối kỳ 42.669 tỷ cao hơn đầu kỳ 27.983 tỷ — đây là tín hiệu gì?",
    options: [
      "Công ty sắp phá sản vì vay nợ nhiều",
      "Tích cực — dù áp lực nợ lớn, Vingroup vẫn tăng được cash buffer, cho thấy khả năng thu hồi tiền đang tốt hơn",
      "Tiền mặt tăng nghĩa là không đầu tư gì",
      "Không có ý nghĩa gì",
    ],
    correct: 1,
    explanation: "Cash buffer tăng từ 28.000 lên 42.700 tỷ là tín hiệu positive về liquidity management. Dù leverage cao, công ty đang giữ được lượng tiền mặt đáng kể — giảm rủi ro short-term liquidity crunch.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Đọc Dòng Tiền Vingroup Q4/2024</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Case study thực tế: tập đoàn BĐS-hạ tầng xoay vòng 160.000 tỷ vốn vay — bình thường hay đáng lo?</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">📋 Số liệu từ BCLCTT Q4/2024</h3>
        <div className="bg-stone-800 text-white rounded-xl p-5 font-mono text-sm space-y-2">
          <div className="text-stone-400 text-xs mb-3">{ '// Báo cáo Lưu chuyển Tiền tệ — Dòng tiền từ Tài chính (CFF)' }</div>
          <div className="flex justify-between">
            <span className="text-stone-700">Tiền thu từ đi vay</span>
            <span className="text-white font-bold">+165.900 tỷ VND</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-700">Tiền trả nợ gốc vay</span>
            <span className="text-stone-700 font-bold">−156.180 tỷ VND</span>
          </div>
          <div className="flex justify-between border-t border-stone-600 pt-2">
            <span className="text-stone-300">Net borrowing</span>
            <span className="text-stone-700 font-bold">+9.720 tỷ VND</span>
          </div>
          <div className="mt-3 pt-3 border-t border-stone-600">
            <div className="flex justify-between text-stone-300 mb-1">
              <span>Tiền mặt đầu kỳ</span>
              <span>27.983 tỷ</span>
            </div>
            <div className="flex justify-between font-bold text-white">
              <span>Tiền mặt cuối kỳ</span>
              <span className="text-stone-700">42.669 tỷ</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">🔍 Đọc hiểu: 165.900 tỷ vay có đáng lo không?</h3>
        <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 mb-4">
          <p className="text-sm text-stone-700 leading-relaxed">
            <strong>Đừng nhìn gross borrowing một mình.</strong> 165.900 tỷ là gross — nhưng net chỉ là 9.720 tỷ. Phần lớn là <strong>refinancing</strong>: vay mới để trả khoản cũ đến hạn. Đây là đặc trưng bình thường của tập đoàn BĐS-hạ tầng có nhiều dự án dài hạn.
          </p>
        </div>
        <div className="space-y-3">
          {[
            {
              question: "Gross borrowing 165.900 tỷ nghĩa là gì?",
              answer: "Tổng tiền vay mới trong kỳ — bao gồm cả vay để tái tài trợ (refinance) các khoản nợ cũ đến hạn. Không phải toàn bộ là vay thêm.",
              color: "emerald",
            },
            {
              question: "Tại sao net chỉ 9.720 tỷ?",
              answer: "156.180 tỷ được dùng để trả nợ gốc đến hạn. Net borrowing = 165.900 − 156.180 = 9.720 tỷ — mức tăng nợ ròng thực sự khiêm tốn hơn nhiều.",
              color: "blue",
            },
            {
              question: "Tiền mặt tăng thêm 14.686 tỷ — từ đâu?",
              answer: "Từ tổng hợp Operating CF (thu tiền bán hàng, thu phí dịch vụ) + Investing CF (thanh lý assets) + net CFF (9.720 tỷ). Tăng cash = liquidity đang được duy trì tốt.",
              color: "cyan",
            },
          ].map(s => (
            <div key={s.question} className={`bg-${s.color}-50 rounded-xl p-4 border border-${s.color}-100`}>
              <div className={`font-semibold text-${s.color}-700 text-sm mb-1`}>Q: {s.question}</div>
              <div className="text-stone-600 text-sm">A: {s.answer}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> 3 dòng quan trọng nhất khi đọc BĐS/Holding</h3>
        <div className="space-y-3">
          {[
            { n: "1", title: "Tiền vay mới vs Tiền trả nợ gốc", why: "Xem tỷ lệ refinancing — net borrowing tăng hay giảm? Gross cao nhưng net thấp là bình thường.", icon: "" },
            { n: "2", title: "Operating Cash Flow (OCF)", why: "Doanh nghiệp có thực sự thu được tiền từ bán hàng/dịch vụ không? OCF dương là foundation của sustainability.", icon: "💧" },
            { n: "3", title: "Tiền mặt cuối kỳ", why: "Buffer thanh khoản — có đủ để trả nợ ngắn hạn và chi phí vận hành không? Cần so với short-term debt maturities.", icon: "" },
          ].map(s => (
            <div key={s.n} className="flex gap-4 bg-cyan-50 rounded-xl p-4 border border-cyan-100">
              <div className="w-8 h-8 bg-cyan-600 text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">{s.n}</div>
              <div>
                <div className="font-semibold text-stone-800 text-sm mb-0.5">{s.icon} {s.title}</div>
                <div className="text-stone-600 text-xs">{s.why}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">🚦 Framework phân tích BĐS leverage cao</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: "", label: "Tín hiệu tốt", items: ["Cash buffer tăng YoY", "OCF dương và growing", "Refinancing được thực hiện trơn tru", "Bán hàng/bàn giao tiến độ đúng kế hoạch"] },
            { icon: "⚠️", label: "Cần theo dõi", items: ["Net borrowing tăng liên tục", "OCF âm nhiều quý", "Cash giảm mạnh", "Gross borrowing tăng nhưng net cũng tăng nhanh"] },
          ].map(s => (
            <div key={s.label} className={`rounded-xl p-4 border ${s.icon === "" ? "bg-stone-50 border-stone-200" : "bg-stone-50 border-stone-200"}`}>
              <div className="font-bold text-stone-800 text-sm mb-2">{s.icon} {s.label}</div>
              <ul className="space-y-1">
                {s.items.map((i, idx) => (
                  <li key={idx} className="text-xs text-stone-600 flex gap-1.5">
                    <span className={s.icon === "" ? "text-stone-700" : "text-stone-700"}>·</span>{i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Bài học</h3>
        <div className="bg-cyan-600 text-white rounded-xl p-5">
          <p className="font-bold mb-2">Với BĐS và holding leverage cao: đừng chỉ nhìn lợi nhuận.</p>
          <p className="text-cyan-200 text-sm">Chất lượng tài chính phụ thuộc vào khả năng xoay vòng nợ, bán hàng thu tiền, và duy trì thanh khoản — những thứ chỉ thấy được khi đọc Cash Flow Statement.</p>
        </div>
      </section>
    </LessonPageLayout>
  );
}
