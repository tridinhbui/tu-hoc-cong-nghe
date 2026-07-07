"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 13, day: 13, accent: "blue",
  title: "Ôn Tập NPV",
  subtitle: "Quiz thực hành tính Net Present Value",
  duration: "7 phút", difficulty: "Khó", emoji: "🔢",
  nextSlug: "interest-coverage", nextTitle: "Interest Coverage Ratio",
};

const quiz: QuizQuestion[] = [
  {
    question: "Dự án cần đầu tư 200 triệu ngay hôm nay, tạo ra 120 triệu/năm trong 2 năm. Discount rate 10%. NPV là?",
    options: [
      "NPV = +40 triệu (nên đầu tư)",
      "NPV = +8.3 triệu (nên đầu tư)",
      "NPV = -8.3 triệu (không nên đầu tư)",
      "NPV = 0 (hòa vốn)",
    ],
    correct: 1,
    explanation: "PV(120M, Y1) = 120/1.1 = 109.1M. PV(120M, Y2) = 120/1.21 = 99.2M. Tổng PV = 208.3M. NPV = 208.3 - 200 = +8.3M → nên đầu tư.",
  },
  {
    question: "Nếu IRR của một dự án = 15% và WACC = 18%, bạn nên:",
    options: [
      "Đầu tư vì IRR dương",
      "Không đầu tư - chi phí vốn cao hơn return kỳ vọng, NPV < 0",
      "Đầu tư nếu có funding",
      "Phụ thuộc vào ngành",
    ],
    correct: 1,
    explanation: "IRR < WACC → NPV < 0. Dự án tạo ra return thấp hơn chi phí vốn → hủy giá trị. Nguyên tắc: chỉ đầu tư khi IRR > WACC (hoặc NPV > 0).",
  },
  {
    question: "Mutually exclusive projects: Dự án A NPV = 50M, IRR = 30%. Dự án B NPV = 80M, IRR = 20%. Chọn dự án nào?",
    options: [
      "Dự án A vì IRR cao hơn",
      "Dự án B vì NPV cao hơn - NPV rule beats IRR rule",
      "Phụ thuộc vào vốn có sẵn",
      "Cần thêm thông tin",
    ],
    correct: 1,
    explanation: "Với mutually exclusive projects, NPV rule cho kết quả đúng. Dự án B tạo ra 80M giá trị tuyệt đối nhiều hơn dù IRR thấp hơn. IRR có thể mislead khi scale dự án khác nhau.",
  },
  {
    question: "Terminal Value trong DCF thường chiếm bao nhiêu % tổng giá trị?",
    options: [
      "10-20% - phần lớn là dòng tiền trong kỳ dự báo",
      "60-80% - tại sao terminal value assumptions rất quan trọng",
      "50% - thường chia đôi",
      "100% - forecast period không đáng kể",
    ],
    correct: 1,
    explanation: "Trong thực tế, terminal value thường chiếm 60-80% tổng enterprise value trong DCF. Điều này có nghĩa là DCF rất nhạy cảm với terminal growth rate và exit multiple assumptions.",
  },
  {
    question: "WACC = 10%, risk-free rate = 4%, equity risk premium = 6%, beta = 1.5, Kd = 7%, tax = 20%, D/(D+E) = 40%. WACC tính đúng là?",
    options: [
      "Ke = 4% + 1.5×6% = 13%; WACC = 13%×0.6 + 7%×(1-20%)×0.4 = 10%",
      "Ke = 13%; WACC = 13%×0.6 + 7%×0.4 = 10.6%",
      "Ke = 10%; WACC = 10%×0.6 + 7%×0.8×0.4 = 8.24%",
      "Không đủ thông tin",
    ],
    correct: 0,
    explanation: "Ke = Rf + β×ERP = 4% + 1.5×6% = 13%. WACC = Ke×We + Kd×(1-t)×Wd = 13%×0.6 + 7%×0.8×0.4 = 7.8% + 2.24% = 10.04% ≈ 10%.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Ôn Tập NPV - Net Present Value</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Công cụ quan trọng nhất trong capital budgeting và định giá doanh nghiệp</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Công thức NPV</h3>
        <div className="bg-stone-900 text-white rounded-xl p-5 mb-4 text-center">
          <div className="font-mono text-lg font-bold mb-2">NPV = Σ [CF_t / (1+r)^t] − C₀</div>
          <p className="text-stone-300 text-sm">Tổng PV dòng tiền tương lai trừ vốn đầu tư ban đầu</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { symbol: "CF_t", name: "Cash Flow", desc: "Dòng tiền tạo ra tại thời điểm t" },
            { symbol: "r", name: "Discount Rate", desc: "WACC hoặc required return" },
            { symbol: "C₀", name: "Initial Cost", desc: "Vốn đầu tư ban đầu (t=0)" },
          ].map(v => (
            <div key={v.symbol} className="bg-stone-50 rounded-xl p-3 text-center border border-stone-200">
              <div className="font-mono font-bold text-stone-800 text-lg">{v.symbol}</div>
              <div className="font-semibold text-stone-700 text-xs mt-1">{v.name}</div>
              <div className="text-stone-500 text-xs mt-0.5">{v.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">NPV vs IRR - Khi nào dùng gì?</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-100">
                <th className="text-left p-2 rounded-l-lg font-semibold text-stone-600">Tiêu chí</th>
                <th className="text-center p-2 font-semibold text-stone-700">NPV</th>
                <th className="text-center p-2 rounded-r-lg font-semibold text-stone-700">IRR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {[
                ["Đo gì?", "Giá trị tuyệt đối (VND)", "Tỷ suất sinh lời (%)"],
                ["Mutually exclusive", "Đúng - chọn NPV cao nhất", "Có thể sai khi scale khác nhau"],
                ["Independent projects", "Accept khi NPV > 0", "Accept khi IRR > WACC"],
                ["Reinvestment assumption", "Reinvest tại WACC (thực tế hơn)", "Reinvest tại IRR (thường quá lạc quan)"],
              ].map((row, i) => (
                <tr key={i}>
                  <td className="p-2 font-medium text-stone-700">{row[0]}</td>
                  <td className="p-2 text-center text-stone-600 text-xs">{row[1]}</td>
                  <td className="p-2 text-center text-stone-600 text-xs">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3">Quick reminders</h3>
        <div className="space-y-2">
          {[
            "NPV > 0 → Accept. NPV < 0 → Reject. NPV = 0 → Indifferent",
            "IRR = discount rate tại đó NPV = 0",
            "Terminal Value thường 60-80% tổng DCF - sensitize assumptions này!",
            "WACC tăng → NPV giảm (inverse relationship)",
          ].map((r, i) => (
            <div key={i} className="flex gap-3 bg-stone-50 rounded-lg p-3 text-sm border border-stone-200">
              <span className="text-stone-600 font-bold flex-shrink-0">{i + 1}.</span>
              <span className="text-stone-700">{r}</span>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
