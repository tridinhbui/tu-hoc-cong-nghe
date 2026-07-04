"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 12, day: 12, accent: "orange",
  title: "Đánh Giá Deal Đầu Tư",
  subtitle: "Câu hỏi phỏng vấn finance thực chiến",
  duration: "9 phút", difficulty: "Khó", emoji: "🤝",
  nextSlug: "on-tap-npv", nextTitle: "Ôn Tập NPV",
};

const quiz: QuizQuestion[] = [
  {
    question: "Khi pitch một deal LBO, câu đầu tiên investor thường hỏi là gì?",
    options: [
      "Revenue là bao nhiêu?",
      "What's the entry multiple và exit multiple kỳ vọng?",
      "Bao nhiêu nhân viên?",
      "Lãi suất vay là bao nhiêu?",
    ],
    correct: 1,
    explanation: "Entry/exit multiple là core của mọi LBO: mua vào ở bao nhiêu x EBITDA, bán ra ở bao nhiêu x. Khoảng cách = multiple expansion, là một trong 3 nguồn return chính.",
  },
  {
    question: "3 nguồn return trong LBO là gì?",
    options: [
      "Revenue growth, cost cutting, refinancing",
      "EBITDA growth, debt paydown, multiple expansion",
      "Asset sale, dividend recap, IPO",
      "Organic growth, M&A, market share gain",
    ],
    correct: 1,
    explanation: "PE return drivers trong LBO: (1) EBITDA growth (kinh doanh tốt hơn), (2) Debt paydown (tự trả nợ từ cash flow), (3) Multiple expansion (exit đắt hơn entry).",
  },
  {
    question: "Tại sao PE fund thích doanh nghiệp có recurring revenue?",
    options: [
      "Recurring revenue cao hơn one-time revenue",
      "Dự đoán được, ổn định → có thể leverage cao hơn trong LBO vì lender tin tưởng hơn",
      "Recurring revenue không bị thuế",
      "Nhà đầu tư thích subscription model hơn",
    ],
    correct: 1,
    explanation: "Lender trong LBO nhìn vào khả năng trả nợ. Recurring revenue (subscription, contract) = visibility cao → lender comfortable cho vay nhiều hơn → equity return cao hơn.",
  },
  {
    question: "MOIC 3x trong 5 năm tương đương IRR khoảng bao nhiêu?",
    options: ["~15%", "~25%", "~50%", "~60%"],
    correct: 1,
    explanation: "MOIC 3x trong 5 năm ≈ IRR 25%. Công thức: IRR = (MOIC)^(1/n) - 1 = 3^(1/5) - 1 ≈ 24.6%. PE thường target IRR 20-25%+.",
  },
  {
    question: "Red flag nào khiến bạn immediately pass một deal?",
    options: [
      "EBITDA margin dưới 20%",
      "Key person dependency — business phụ thuộc hoàn toàn vào 1-2 người",
      "Công ty chưa niêm yết",
      "Revenue dưới 500 tỷ",
    ],
    correct: 1,
    explanation: "Key person risk là red flag nghiêm trọng: nếu CEO/founder rời đi → business có thể sụp đổ. PE cần scalable business không phụ thuộc vào cá nhân cụ thể.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Đánh Giá Deal Đầu Tư — Thực Chiến</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Framework phân tích deal như một PE analyst — từ triage đến investment committee</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Framework 5 bước phân tích deal</h3>
        <div className="space-y-3">
          {[
            {
              n: 1, title: "Business Understanding",
              questions: ["Business model là gì?", "Doanh thu đến từ đâu?", "Competitive moat ở đâu?", "Industry dynamics thế nào?"],
            },
            {
              n: 2, title: "Financial Analysis",
              questions: ["Revenue growth 3-5 năm?", "EBITDA margin trend?", "FCF conversion cao không?", "Working capital needs?"],
            },
            {
              n: 3, title: "Deal Structure",
              questions: ["Entry EV/EBITDA bao nhiêu?", "Debt/EBITDA leverage?", "Equity contribution?", "Management rollover?"],
            },
            {
              n: 4, title: "Value Creation Plan",
              questions: ["Organic growth levers?", "Operational improvements?", "Add-on acquisitions?", "Exit options trong 3-5 năm?"],
            },
            {
              n: 5, title: "Risk Assessment",
              questions: ["Key risks là gì?", "Downside scenario?", "Covenant headroom?", "Red flags nào?"],
            },
          ].map(step => (
            <div key={step.n} className="border border-stone-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 bg-stone-800 text-white rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0">{step.n}</div>
                <div className="font-bold text-stone-800 text-sm">{step.title}</div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {step.questions.map((q, i) => (
                  <div key={i} className="text-xs text-stone-600 flex gap-1">
                    <span className="text-stone-500">→</span>{q}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">LBO Return Drivers</h3>
        <div className="space-y-2">
          {[
            { title: "EBITDA Growth", desc: "Tăng doanh thu, cải thiện margin → EBITDA cao hơn" },
            { title: "Debt Paydown", desc: "Cash flow trả nợ → equity tự nhiên tăng" },
            { title: "Multiple Expansion", desc: "Exit multiple cao hơn entry multiple" },
          ].map(d => (
            <div key={d.title} className="bg-stone-800 rounded-xl p-4">
              <div className="text-white font-bold text-xs mb-1">{d.title}</div>
              <div className="text-stone-500 text-xs">{d.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Interview Questions thực chiến</h3>
        <div className="space-y-3">
          {[
            {
              q: "Walk me through an LBO model",
              a: "Entry: mua công ty với leveraged capital (60-70% debt). Operations: trả nợ từ FCF, improve EBITDA. Exit: bán sau 3-5 năm tại higher multiple. Return = MOIC = Exit Equity / Entry Equity.",
            },
            {
              q: "What makes a good LBO candidate?",
              a: "Stable/predictable cash flows, low CapEx, strong market position, potential for operational improvement, management team, clear exit options (strategic buyer, IPO, secondary).",
            },
            {
              q: "Tại sao IRR quan trọng hơn MOIC?",
              a: "IRR điều chỉnh theo thời gian — MOIC 3x trong 3 năm (IRR ~44%) tốt hơn nhiều 3x trong 7 năm (IRR ~17%). IRR cho phép so sánh apples-to-apples giữa các deal có holding period khác nhau.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-stone-200 rounded-xl p-4">
              <div className="font-semibold text-stone-800 text-sm mb-2">Q: {item.q}</div>
              <div className="text-stone-600 text-sm leading-relaxed border-t border-stone-100 pt-2 mt-2">A: {item.a}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3">Red Flags cần watch out</h3>
        <div className="border-l-2 border-stone-300 pl-4 space-y-2">
          <div className="space-y-1 text-sm text-stone-700">
            {[
              "Customer concentration > 30% từ 1 khách",
              "Key person dependency",
              "Declining revenue / market share loss",
              "Lãi vay ICR < 2x ở entry",
              "Ngành đang bị disruption",
              "Accounting irregularities",
            ].map((f, i) => (
              <div key={i}>— {f}</div>
            ))}
          </div>
        </div>
      </section>
    </LessonPageLayout>
  );
}
