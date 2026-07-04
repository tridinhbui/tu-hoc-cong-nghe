"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 4, day: 4, accent: "orange",
  title: "10 Công Thức Finance Interview",
  subtitle: "Revenue → FCF → EV → Giá cổ phiếu — một dòng chảy liên thông",
  duration: "10 phút", difficulty: "Trung bình", emoji: "",
  nextSlug: "cac-loai-debt", nextTitle: "Day 5: Các Loại Debt",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Gross Profit Margin = 40% có nghĩa là:",
    options: [
      "Công ty lãi 40% sau khi trừ tất cả chi phí",
      "Cứ 100 đồng doanh thu, còn lại 40 đồng sau khi trừ giá vốn hàng bán (COGS)",
      "Tổng doanh thu tăng 40%",
      "Chi phí marketing chiếm 40% doanh thu",
    ],
    correct: 1,
    explanation: "Gross Profit = Revenue − COGS. GPM = GP/Revenue. 40% nghĩa là 60% doanh thu bị tiêu tốn bởi chi phí sản xuất/mua hàng trực tiếp.",
  },
  {
    question: "EBITDA khác EBIT ở điểm gì?",
    options: [
      "EBITDA bao gồm thuế, EBIT thì không",
      "EBITDA cộng ngược lại D&A (Depreciation & Amortization) — không phải chi tiêu tiền mặt",
      "EBIT dùng cho manufacturing, EBITDA dùng cho tech",
      "Hai chỉ số hoàn toàn giống nhau",
    ],
    correct: 1,
    explanation: "EBITDA = EBIT + D&A. D&A là chi phí phi tiền mặt (non-cash) — khấu hao tài sản. EBITDA loại bỏ D&A để phản ánh khả năng tạo tiền thuần hơn. Phổ biến trong so sánh định giá (EV/EBITDA).",
  },
  {
    question: "Enterprise Value (EV) = ?",
    options: [
      "Giá thị trường của tất cả cổ phiếu đang lưu hành",
      "Market Cap + Net Debt (tổng nợ − tiền mặt)",
      "Tổng tài sản trên bảng cân đối kế toán",
      "Lợi nhuận ròng × P/E ratio",
    ],
    correct: 1,
    explanation: "EV = Market Cap + Total Debt − Cash. EV là giá thực sự phải trả để mua lại toàn bộ doanh nghiệp (cả nợ lẫn vốn chủ). Dùng trong M&A và định giá.",
  },
  {
    question: "P/E ratio = 25x và EPS = 4,000 đồng. Giá cổ phiếu là bao nhiêu?",
    options: ["100,000 đồng", "4,025 đồng", "6,250 đồng", "16,000 đồng"],
    correct: 0,
    explanation: "P/E = Price/EPS → Price = P/E × EPS = 25 × 4,000 = 100,000 đồng.",
  },
  {
    question: "Tại sao nhà phân tích dùng EV/EBITDA thay vì P/E?",
    options: [
      "EV/EBITDA dễ tính hơn",
      "EV/EBITDA trung lập với cấu trúc vốn (debt/equity) và chính sách kế toán khấu hao — so sánh công bằng giữa các công ty khác nhau",
      "P/E không áp dụng được cho công ty VN",
      "EV/EBITDA luôn thấp hơn P/E nên nhìn đẹp hơn",
    ],
    correct: 1,
    explanation: "EV/EBITDA không bị ảnh hưởng bởi đòn bẩy tài chính (EV bao gồm cả nợ) và chính sách D&A. Phù hợp so sánh công ty với cấu trúc vốn khác nhau hoặc trong M&A.",
  },
];

const formulas = [
  { id: "gp", name: "Gross Profit", formula: "Revenue − COGS", note: "Biên lợi nhuận gộp = GP/Revenue. Cao → pricing power tốt hoặc chi phí SX thấp." },
  { id: "ebitda", name: "EBITDA", formula: "Gross Profit − Operating Expenses + D&A", note: "Proxy cho cash generation từ hoạt động. Dùng nhiều trong M&A (EV/EBITDA)." },
  { id: "ebit", name: "EBIT (Operating Income)", formula: "EBITDA − Depreciation & Amortization", note: "Lợi nhuận trước lãi vay và thuế. Phản ánh hiệu quả hoạt động, không phụ thuộc cấu trúc vốn." },
  { id: "ni", name: "Net Income", formula: "(EBIT − Interest Expense) × (1 − Tax Rate)", note: "Lợi nhuận cuối cùng cho cổ đông. Nhưng coi chừng: NI bị ảnh hưởng nhiều bởi kế toán." },
  { id: "fcf", name: "Free Cash Flow", formula: "OCF − CapEx", note: "Tiền thực sự tự do — cơ sở định giá DCF và 'owner earnings' của Buffett." },
  { id: "ev", name: "Enterprise Value (EV)", formula: "Market Cap + Total Debt − Cash", note: "Giá 'thực' để mua lại cả doanh nghiệp. Chuẩn hóa cho M&A và so sánh (EV/EBITDA)." },
  { id: "equity", name: "Equity Value (Market Cap)", formula: "EV − Net Debt", note: "Giá trị phần thuộc về cổ đông. Chia cho số cổ phiếu = giá lý thuyết mỗi cổ phiếu." },
  { id: "pe", name: "P/E Ratio", formula: "Price per Share / EPS", note: "Nhà đầu tư trả bao nhiêu đồng cho 1 đồng lợi nhuận. P/E cao = kỳ vọng tăng trưởng cao." },
  { id: "evebitda", name: "EV/EBITDA", formula: "Enterprise Value / EBITDA", note: "Multiple phổ biến nhất trong M&A. Trung lập với đòn bẩy và chính sách khấu hao." },
  { id: "eps", name: "Earnings Per Share (EPS)", formula: "Net Income / Diluted Shares Outstanding", note: "Lợi nhuận trên mỗi cổ phiếu. Dùng tính P/E. Phải dùng diluted shares (bao gồm options, warrants)." },
];

export default function TenCongThucPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-8 text-stone-700 leading-relaxed">

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">Tại sao cần nhớ 10 công thức này?</h2>
          <p>Trong bất kỳ cuộc phỏng vấn finance nào — IB, PE, equity research, corporate finance — bạn sẽ được hỏi về những công thức này. Không chỉ hỏi "công thức là gì" mà còn hỏi "tại sao nó quan trọng" và "khi nào dùng cái nào".</p>
          <p>Điều quan trọng hơn việc ghi nhớ công thức là hiểu <strong>dòng chảy từ Revenue xuống FCF</strong> — và từ FCF lên Enterprise Value — là một chuỗi liên thông.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">Dòng chảy từ Revenue → FCF</h2>
          <div className="bg-stone-50 rounded-2xl p-5 space-y-1 font-mono text-sm">
            {[
              { label: "Revenue", op: "" },
              { label: "− COGS", op: "↓" },
              { label: "= Gross Profit", op: "" },
              { label: "− Operating Expenses (SG&A, R&D)", op: "↓" },
              { label: "= EBITDA", op: "" },
              { label: "− D&A", op: "↓" },
              { label: "= EBIT", op: "" },
              { label: "− Interest Expense", op: "↓" },
              { label: "= EBT (trước thuế)", op: "" },
              { label: "− Taxes", op: "↓" },
              { label: "= Net Income", op: "" },
              { label: "+ D&A (cộng lại vì phi tiền mặt)", op: "↑" },
              { label: "± ΔNWC (Working Capital changes)", op: "↕" },
              { label: "= OCF", op: "" },
              { label: "− CapEx", op: "↓" },
              { label: "= Free Cash Flow (FCF)", op: "" },
            ].map(r => (
              <div key={r.label} className="flex items-center gap-2 py-0.5 text-stone-700">
                <span className="w-3 text-center text-stone-300">{r.op}</span>
                <span>{r.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">10 công thức — chi tiết</h2>
          <div className="space-y-3">
            {formulas.map(f => (
              <div key={f.id} className="border border-stone-200 rounded-xl p-4">
                <div className="font-bold text-sm text-stone-800">{f.name}</div>
                <div className="font-mono text-xs mt-0.5 text-stone-500">{f.formula}</div>
                <p className="text-sm mt-2 text-stone-600 leading-relaxed">{f.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">FPT — Áp dụng thực tế</h2>
          <div className="bg-stone-900 rounded-2xl p-5 text-sm space-y-2">
            <div className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-3">FPT Corporation — Ước tính 2023</div>
            {[
              { label: "Revenue", val: "~55,000 tỷ" },
              { label: "Gross Profit", val: "~18,000 tỷ (GPM ~33%)" },
              { label: "EBITDA", val: "~9,000 tỷ (Margin ~16%)" },
              { label: "Net Income", val: "~6,500 tỷ (Net margin ~12%)" },
              { label: "EPS", val: "~5,000 đồng" },
              { label: "P/E (thị trường)", val: "~20x → Giá ~100,000 đồng" },
              { label: "EV/EBITDA", val: "~15x (phù hợp tech VN)" },
            ].map(r => (
              <div key={r.label} className="flex justify-between py-1.5 border-b border-stone-800 last:border-0">
                <span className="text-stone-400">{r.label}</span>
                <span className="text-white font-semibold">{r.val}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="border-l-2 border-stone-300 pl-4 space-y-2">
          <h3 className="font-bold text-stone-800 mb-3">3 điều cần nhớ</h3>
          <div className="space-y-1 text-sm text-stone-700">
            <div>— Revenue → Gross Profit → EBITDA → EBIT → NI → OCF → FCF là một dòng chảy liên thông</div>
            <div>— EV/EBITDA trung lập với đòn bẩy — dùng để so sánh giữa các công ty</div>
            <div>— FCF là cơ sở của mọi mô hình định giá DCF — quan trọng nhất trong finance</div>
          </div>
        </div>
      </div>
    </LessonPageLayout>
  );
}
