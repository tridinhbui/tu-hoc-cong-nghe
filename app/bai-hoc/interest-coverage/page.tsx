"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 14, day: 14, accent: "teal",
  title: "Interest Coverage Ratio",
  subtitle: "Đo khả năng trả lãi vay của doanh nghiệp",
  duration: "6 phút", difficulty: "Trung bình", emoji: "🛡️",
  nextSlug: "source-cash-ma", nextTitle: "Source of Cash trong M&A",
};

const quiz: QuizQuestion[] = [
  {
    question: "Công ty A có EBIT = 300 tỷ, Interest Expense = 100 tỷ. ICR là?",
    options: ["2x — khá an toàn", "3x — an toàn", "0.33x — nguy hiểm", "30x — rất an toàn"],
    correct: 1,
    explanation: "ICR = EBIT / Interest = 300 / 100 = 3x. Lợi nhuận gấp 3 lần lãi vay — đủ an toàn. Lender thường yêu cầu tối thiểu 2-3x.",
  },
  {
    question: "Trong covenant của khoản vay, 'minimum ICR = 2.5x' có nghĩa là?",
    options: [
      "Công ty không được vay thêm nếu ICR > 2.5x",
      "Nếu ICR xuống dưới 2.5x, lender có quyền recall loan hoặc yêu cầu thêm collateral",
      "Lãi suất sẽ tăng khi ICR < 2.5x",
      "Không có ý nghĩa thực tế",
    ],
    correct: 1,
    explanation: "Financial covenants là điều kiện ràng buộc trong hợp đồng vay. Vi phạm covenant (ICR < minimum) = technical default → lender có quyền accelerate loan (đòi trả ngay).",
  },
  {
    question: "Tại sao EBITDA thay vì EBIT đôi khi được dùng trong ICR?",
    options: [
      "EBITDA luôn cao hơn EBIT",
      "D&A là non-cash expense — EBITDA phản ánh cash tốt hơn để trả lãi",
      "Lender thích EBITDA hơn",
      "Không có sự khác biệt đáng kể",
    ],
    correct: 1,
    explanation: "EBITDA coverage = EBITDA / Interest. Vì D&A là phi tiền mặt, EBITDA gần với cash flow thực hơn → phản ánh khả năng trả lãi tiền mặt chính xác hơn.",
  },
  {
    question: "Doanh nghiệp có ICR = 1.2x. Điều gì có thể xảy ra nếu doanh thu giảm 20%?",
    options: [
      "Không sao — vẫn còn ICR dương",
      "ICR có thể xuống dưới 1x — không đủ lợi nhuận trả lãi → risk of default",
      "Lãi suất sẽ giảm để bù đắp",
      "Doanh nghiệp sẽ tự động renegotiate với lender",
    ],
    correct: 1,
    explanation: "ICR 1.2x nghĩa là margin rất mỏng. Doanh thu giảm 20% → EBIT giảm → ICR có thể xuống dưới 1x → doanh nghiệp không đủ tiền trả lãi từ hoạt động kinh doanh → technical default.",
  },
  {
    question: "Trong phân tích credit, ICR được dùng kết hợp với chỉ số nào khác?",
    options: [
      "Chỉ ICR là đủ",
      "Debt/EBITDA (leverage), DSCR (debt service coverage), FCF/Debt",
      "P/E và EV/EBITDA",
      "ROE và ROA",
    ],
    correct: 1,
    explanation: "Credit analysis dùng bộ chỉ số: ICR (khả năng trả lãi), Debt/EBITDA (đòn bẩy), DSCR (khả năng trả cả gốc lẫn lãi), FCF/Total Debt (thời gian trả hết nợ từ FCF).",
  },
];

function ICRSimulator() {
  const [ebit, setEbit] = useState(300);
  const [interest, setInterest] = useState(100);
  const icr = interest > 0 ? ebit / interest : 0;

  const getStatus = () => {
    if (icr >= 3) return { label: "An toàn", color: "text-stone-700 bg-stone-50", bar: "bg-stone-50" };
    if (icr >= 1.5) return { label: "Trung bình — cần theo dõi", color: "text-stone-700 bg-stone-50", bar: "bg-stone-50" };
    if (icr >= 1) return { label: "Rủi ro cao", color: "text-stone-700 bg-stone-50", bar: "bg-stone-50" };
    return { label: "Nguy hiểm — có thể default", color: "text-stone-700 bg-stone-50", bar: "bg-stone-50" };
  };

  const status = getStatus();

  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-5 border border-stone-200 my-6">
      <h3 className="font-bold text-stone-700 mb-4 text-sm">🛡️ ICR Simulator</h3>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">EBIT ({ebit} tỷ)</label>
          <input type="range" min={50} max={1000} step={50} value={ebit} onChange={e => setEbit(+e.target.value)} className="w-full accent-teal-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Interest Expense ({interest} tỷ)</label>
          <input type="range" min={10} max={500} step={10} value={interest} onChange={e => setInterest(+e.target.value)} className="w-full accent-teal-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 mb-4">
        <div className="font-mono text-sm text-center mb-3 text-stone-600">
          ICR = EBIT / Interest = {ebit} / {interest} = <span className="text-stone-700 font-bold text-xl">{icr.toFixed(1)}x</span>
        </div>
        <div className="h-4 bg-stone-100 rounded-full overflow-hidden mb-2">
          <div className={`h-full ${status.bar} rounded-full transition-all`} style={{ width: `${Math.min(100, (icr / 5) * 100)}%` }} />
        </div>
        <div className="flex justify-between text-xs text-stone-400 mb-3">
          <span>0x</span><span>1.5x</span><span>3x</span><span>5x+</span>
        </div>
        <div className={`text-center py-2 rounded-xl text-sm font-bold ${status.color}`}>{status.label}</div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { label: "< 1.5x", desc: "Nguy hiểm", bg: "bg-stone-50 border-stone-200" },
          { label: "1.5–3x", desc: "Trung bình", bg: "bg-stone-50 border-stone-200" },
          { label: "> 3x", desc: "An toàn", bg: "bg-stone-50 border-stone-200" },
        ].map(b => (
          <div key={b.label} className={`rounded-lg p-2 border text-xs ${b.bg}`}>
            <div className="font-bold text-stone-700">{b.label}</div>
            <div className="text-stone-500">{b.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Interest Coverage Ratio (ICR)</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Chỉ số đầu tiên lender kiểm tra khi đánh giá khả năng trả nợ</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">📐 Công thức và ý nghĩa</h3>
        <div className="bg-stone-50 text-white rounded-xl p-5 text-center mb-4">
          <div className="font-mono text-xl font-bold mb-1">ICR = EBIT ÷ Interest Expense</div>
          <p className="text-stone-700 text-sm">Lợi nhuận trước lãi vay gấp bao nhiêu lần tiền lãi phải trả</p>
        </div>
        <p className="text-stone-600 leading-relaxed mb-3">
          ICR = 3x nghĩa là: với mỗi 1 đồng lãi vay phải trả, doanh nghiệp tạo ra 3 đồng EBIT. Cushion 2 đồng này là "safety margin" — cho phép doanh nghiệp chịu đựng được khó khăn mà không vỡ nợ.
        </p>
      </section>

      <ICRSimulator />

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Tại sao lender quan tâm đến ICR?</h3>
        <div className="space-y-3">
          {[
            {
              title: "Risk assessment",
              desc: "ICR thấp → doanh nghiệp dễ bị tổn thương khi business chậm lại. Lender muốn biết buffer trước khi doanh nghiệp không đủ tiền trả lãi.",
            },
            {
              title: "Loan pricing",
              desc: "ICR cao → rủi ro thấp → lender offer lãi suất thấp hơn. ICR thấp → lãi suất cao hơn để bù đắp rủi ro.",
            },
            {
              title: "Covenant monitoring",
              desc: "Sau khi cho vay, lender monitor ICR hàng quý. Vi phạm minimum ICR covenant = event of default.",
            },
          ].map(s => (
            <div key={s.title} className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="font-semibold text-stone-700 text-sm mb-1">{s.title}</div>
              <div className="text-stone-600 text-sm">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> ICR theo ngành điển hình</h3>
        <div className="space-y-2">
          {[
            { industry: "Utilities / Điện nước", range: "2-4x", note: "Dòng tiền ổn định → chấp nhận leverage cao" },
            { industry: "Consumer Staples (FMCG)", range: "4-8x", note: "Ổn định nhưng cần more cushion" },
            { industry: "Technology / SaaS", range: "8-20x", note: "Thường ít debt, ICR rất cao" },
            { industry: "Real Estate / BĐS", range: "1.5-3x", note: "Asset-heavy, leverage cao là bình thường" },
            { industry: "Startup (năm đầu)", range: "< 0", note: "Thường lỗ, không áp dụng ICR" },
          ].map(r => (
            <div key={r.industry} className="flex items-center gap-3 bg-stone-50 rounded-lg p-3 border border-stone-200">
              <div className="flex-1">
                <div className="text-sm font-medium text-stone-700">{r.industry}</div>
                <div className="text-xs text-stone-400">{r.note}</div>
              </div>
              <div className="font-bold text-stone-700 text-sm">{r.range}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3">⚠️ Hạn chế của ICR</h3>
        <div className="space-y-2">
          {[
            "EBIT ≠ Cash — doanh nghiệp có thể có EBIT cao nhưng Working Capital trap tiền",
            "Không capture principal repayment — dùng DSCR để đo cả gốc lẫn lãi",
            "Snapshot một kỳ — cần xem trend 3-5 năm",
            "Có thể bị manipulate qua accounting choices",
          ].map((l, i) => (
            <div key={i} className="flex gap-2 text-sm bg-stone-50 rounded-lg p-3 border border-stone-200">
              <span className="text-stone-700 flex-shrink-0">⚠️</span>
              <span className="text-stone-700">{l}</span>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
