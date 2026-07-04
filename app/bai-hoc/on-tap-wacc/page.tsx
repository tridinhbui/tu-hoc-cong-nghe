"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 22, day: 22, accent: "blue",
  title: "Ôn Tập WACC",
  subtitle: "5 câu quiz về chi phí vốn — hiểu bản chất, không học thuộc",
  duration: "6 phút", difficulty: "Khó", emoji: "⚖️",
  nextSlug: "roic", nextTitle: "ROIC",
};

const quiz: QuizQuestion[] = [
  {
    question: "WACC tăng khi nào?",
    options: [
      "Cost of equity giảm",
      "Cost of debt giảm",
      "Tỷ trọng equity tăng, cost of equity cao hơn cost of debt (after-tax)",
      "Thuế tăng",
    ],
    correct: 2,
    explanation: "WACC = Ke×We + Kd×(1−t)×Wd. Equity thường đắt hơn debt (after-tax) vì equity riskier. Khi shift weight sang equity, WACC tăng. Thuế tăng thì after-tax cost of debt giảm → WACC giảm.",
  },
  {
    question: "Tại sao phải dùng after-tax cost of debt trong WACC?",
    options: [
      "Vì debt rẻ hơn equity",
      "Vì interest expense được tax shield — lãi vay được khấu trừ thuế, làm giảm chi phí thực",
      "Vì debt không có rủi ro",
      "Vì quy định kế toán",
    ],
    correct: 1,
    explanation: "Interest expense làm giảm taxable income → tiết kiệm thuế = interest × tax rate. Chi phí nợ thực = Kd × (1 − t). Ví dụ: vay lãi 10%, thuế 20% → chi phí thực chỉ là 8%. Đây là tax shield của debt.",
  },
  {
    question: "Nếu công ty tăng leverage (vay nhiều hơn), WACC sẽ thay đổi thế nào trong thực tế?",
    options: [
      "Luôn giảm — vì thay equity đắt bằng debt rẻ",
      "Luôn tăng — vì rủi ro tăng",
      "Giảm rồi tăng lại — có optimal leverage point",
      "Không đổi theo Modigliani-Miller",
    ],
    correct: 2,
    explanation: "Lý thuyết: ban đầu thêm debt rẻ → WACC giảm. Nhưng leverage càng cao → financial distress risk tăng → lenders đòi lãi cao hơn, equity holders đòi return cao hơn → cost of equity và debt tăng → WACC bật lên. Đây là lý do tồn tại capital structure tối ưu.",
  },
  {
    question: "Cost of equity thường được tính bằng phương pháp nào?",
    options: [
      "IRR của dự án",
      "CAPM: Ke = Rf + β × (Rm − Rf)",
      "EBITDA / Enterprise Value",
      "Dividend yield hiện tại",
    ],
    correct: 1,
    explanation: "CAPM (Capital Asset Pricing Model): Ke = Risk-free rate + Beta × Equity Risk Premium. Beta đo mức độ nhạy cảm của cổ phiếu với thị trường. Beta = 1.5 → cổ phiếu biến động 1.5x thị trường → riskier → đòi higher return.",
  },
  {
    question: "WACC được dùng để làm gì trong DCF?",
    options: [
      "Tính doanh thu kỳ vọng",
      "Chiết khấu (discount) free cash flow về hiện tại",
      "Tính net income",
      "Dự báo chi phí vận hành",
    ],
    correct: 1,
    explanation: "WACC là discount rate trong DCF. Nó đại diện cho chi phí cơ hội của vốn — tỷ suất return tối thiểu mà dự án/doanh nghiệp phải tạo ra để justify vốn đầu tư. PV = CF / (1 + WACC)^n.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Ôn Tập WACC</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Không học thuộc công thức — hiểu tại sao WACC hoạt động như vậy</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">WACC — Nhắc lại core formula</h3>
        <div className="bg-stone-900 text-white rounded-xl p-5 text-center mb-4">
          <div className="font-mono text-lg font-bold mb-1">WACC = Ke × We + Kd × (1−t) × Wd</div>
          <p className="text-stone-300 text-sm">Chi phí vốn trung bình có trọng số — phản ánh risk tổng thể của doanh nghiệp</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { sym: "Ke", name: "Cost of Equity", calc: "CAPM: Rf + β×ERP", note: "Không có tax shield" },
            { sym: "Kd(1−t)", name: "After-tax Cost of Debt", calc: "Lãi suất vay × (1−thuế)", note: "Được khấu trừ thuế" },
            { sym: "We / Wd", name: "Capital Weights", calc: "Market value, không phải book", note: "Equity / (E+D) và D / (E+D)" },
            { sym: "β (Beta)", name: "Systematic Risk", calc: "Cov(stock, market) / Var(market)", note: "Beta > 1 = riskier than market" },
          ].map(s => (
            <div key={s.sym} className="bg-stone-50 rounded-xl p-3 border border-stone-200">
              <div className="font-mono font-bold text-stone-800">{s.sym}</div>
              <div className="font-semibold text-stone-700 text-xs mt-0.5">{s.name}</div>
              <div className="text-stone-500 text-xs mt-1">{s.calc}</div>
              <div className="text-stone-500 text-xs italic">{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">3 intuitions cốt lõi về WACC</h3>
        <div className="space-y-3">
          <div className="border-l-2 border-stone-300 pl-4 space-y-1">
            <div className="font-bold text-stone-800 text-sm">WACC = chi phí cơ hội của vốn</div>
            <p className="text-stone-600 text-sm">Nếu dự án không tạo ra return ≥ WACC, nhà đầu tư tốt hơn nên rút vốn và invest vào nơi khác có cùng risk level. WACC là hurdle rate tối thiểu.</p>
          </div>
          <div className="border-l-2 border-stone-300 pl-4 space-y-1">
            <div className="font-bold text-stone-800 text-sm">Debt rẻ hơn equity — vì sao không vay 100%?</div>
            <p className="text-stone-600 text-sm">Vay nhiều → financial risk tăng → lender đòi lãi cao hơn, cổ đông đòi return cao hơn → cả Kd và Ke tăng → WACC bật lên. Có optimal leverage point tối thiểu hóa WACC.</p>
          </div>
          <div className="border-l-2 border-stone-300 pl-4 space-y-1">
            <div className="font-bold text-stone-800 text-sm">WACC cao → DCF valuation thấp</div>
            <p className="text-stone-600 text-sm">PV = CF / (1+WACC)^n. WACC tăng → mẫu số tăng → PV giảm. Đây là lý do khi Fed tăng lãi suất (Rf tăng → WACC tăng), định giá cổ phiếu growth giảm mạnh.</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3">Quick reminders</h3>
        <div className="space-y-2">
          {[
            "Ke > Kd(1−t) trong hầu hết mọi trường hợp — equity riskier nên đắt hơn",
            "Dùng market value weights, không phải book value — market phản ánh current reality",
            "WACC là blended rate — không phải chi phí của bất kỳ nguồn vốn cụ thể nào",
            "Trong LBO: leverage cao → Ke tăng mạnh → offsetting debt benefit → WACC có thể tăng",
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
