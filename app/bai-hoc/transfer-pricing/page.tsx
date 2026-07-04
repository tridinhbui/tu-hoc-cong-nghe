"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 33, day: 33, accent: "rose",
  title: "Transfer Pricing",
  subtitle: "Arm's length principle — tại sao Apple Ireland lại lợi nhuận thấp thế?",
  duration: "6 phút", difficulty: "Khó", emoji: "🌐",
  nextSlug: "maple-leaf-leverage", nextTitle: "Maple Leaf — Leverage Ratio",
};

const quiz: QuizQuestion[] = [
  {
    question: "Arm's length principle trong transfer pricing nghĩa là gì?",
    options: [
      "Giao dịch phải được thực hiện bằng tay thay vì điện tử",
      "Giá giao dịch giữa các công ty trong cùng tập đoàn phải tương đương giá trên thị trường mở giữa các bên độc lập",
      "Công ty không được giao dịch với công ty con",
      "Phải có ít nhất 2 bên tham gia giao dịch",
    ],
    correct: 1,
    explanation: "Arm's length principle: khi công ty A bán hàng cho công ty B trong cùng group, giá phải 'như thể hai bên độc lập, không liên quan'. Nếu thị trường charge 100 USD cho sản phẩm đó, A không thể bán cho B với giá 10 USD để shift profit sang nước có thuế thấp.",
  },
  {
    question: "Mục đích chính của Transfer Pricing (TP) regulations là?",
    options: [
      "Khuyến khích doanh nghiệp đa quốc gia phát triển",
      "Ngăn chặn việc dịch chuyển lợi nhuận nhân tạo sang jurisdictions có thuế thấp để tránh thuế",
      "Quy định giá hàng hóa tiêu dùng",
      "Xác định tỷ giá hối đoái",
    ],
    correct: 1,
    explanation: "TP regulations chống lại 'profit shifting' — multinational groups dùng intercompany transactions (IP licensing, management fees, intercompany loans) để move profit từ nước thuế cao (ví dụ US 21%) sang nước thuế thấp (Ireland 12.5%, Cayman 0%). OECD BEPS project là nỗ lực toàn cầu để address vấn đề này.",
  },
  {
    question: "Ai là người thường review và tư vấn Transfer Pricing documentation cho doanh nghiệp?",
    options: [
      "Chỉ nội bộ công ty tự làm",
      "Big 4 accounting firms (Deloitte, PwC, EY, KPMG) — Tax and TP specialists",
      "Chỉ luật sư",
      "Chỉ cơ quan thuế",
    ],
    correct: 1,
    explanation: "Big 4 là leading TP advisors — họ cung cấp: (1) TP policy design, (2) Benchmarking analysis (tìm comparable transactions), (3) TP documentation (Master File, Local File, Country-by-Country Report), (4) Advance Pricing Agreements (APA) với tax authorities. Thuế TP là một specialty lớn trong ngành tax.",
  },
  {
    question: "Công ty A (Việt Nam) mua software license từ công ty mẹ B (Ireland) với giá 10M USD/năm. Market rate là 3M USD. Vấn đề gì có thể xảy ra?",
    options: [
      "Không có vấn đề gì vì cùng tập đoàn",
      "TP adjustment: cơ quan thuế VN có thể điều chỉnh lại giá từ 10M xuống 3M → A phải nộp thêm thuế TNDN trên 7M bị overstated cost",
      "Chỉ ảnh hưởng công ty ở Ireland",
      "Cần phải hủy hợp đồng",
    ],
    correct: 1,
    explanation: "Overcharging intercompany: A báo chi phí 10M nhưng thị trường chỉ 3M → A 'artificially' giảm profit ở VN → nộp ít thuế hơn. Cơ quan thuế VN có quyền điều chỉnh (TP adjustment) về arm's length price, truy thu thuế + penalty + interest. Đây là dạng TP risk phổ biến nhất.",
  },
  {
    question: "Country-by-Country Report (CbCR) yêu cầu gì?",
    options: [
      "Chỉ báo cáo doanh thu tổng hợp",
      "MNC phải báo cáo breakdown revenue, profit, tax paid, nhân viên theo từng quốc gia cho cơ quan thuế",
      "Chỉ áp dụng với công ty có doanh thu > 1 tỷ USD",
      "Cả B và C",
    ],
    correct: 3,
    explanation: "CbCR (OECD BEPS Action 13): MNC group với consolidated revenue >750M EUR phải nộp CbCR — breakdown theo jurisdiction: doanh thu, lợi nhuận trước thuế, thuế đã nộp, số nhân viên, assets. Giúp cơ quan thuế identify 'mismatch' giữa nơi economic activity và nơi profit được ghi nhận.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Transfer Pricing</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Khi Apple Ireland báo ít lãi — hay cả hệ thống tax structure đằng sau?</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">🤔 Transfer Pricing là gì?</h3>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 mb-4">
          <p className="text-sm text-stone-700 leading-relaxed">
            <strong>Transfer Pricing</strong> = giá của giao dịch giữa các công ty trong cùng một tập đoàn (intercompany transactions). Ví dụ: Apple Inc. (US) mua linh kiện từ Apple Manufacturing (China) với giá bao nhiêu? Apple US bán cho Apple Ireland với giá nào?
          </p>
        </div>
        <p className="text-stone-600 leading-relaxed text-sm">
          Vì các công ty trong cùng group có thể <strong>tự định giá giao dịch nội bộ</strong>, họ có thể lợi dụng để chuyển lợi nhuận sang nơi có thuế thấp hơn — đây là lý do OECD và các nước đặt ra Transfer Pricing regulations.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">⚖️ Arm's Length Principle</h3>
        <div className="bg-stone-50 text-white rounded-xl p-5 text-center mb-4">
          <div className="font-bold text-xl mb-1">Arm's Length Price</div>
          <p className="text-stone-700 text-sm">Giá intercompany phải = giá hai bên độc lập sẽ thỏa thuận trên thị trường mở</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 mb-2 text-sm">❌ Vi phạm Arm's Length</div>
            <p className="text-xs text-stone-600">Công ty con ở Việt Nam mua IP license từ Hà Lan với giá 10x market rate → cost artificially cao → profit VN thấp → ít thuế VN. Profit "chuyển" sang Hà Lan.</p>
          </div>
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 mb-2 text-sm"> Đúng Arm's Length</div>
            <p className="text-xs text-stone-600">Comparable uncontrolled transaction: tìm giao dịch tương tự giữa 2 bên độc lập → dùng làm benchmark. TP documentation chứng minh giá intercompany = arm's length.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> 3 loại TP methods phổ biến</h3>
        <div className="space-y-3">
          {[
            {
              method: "Comparable Uncontrolled Price (CUP)",
              desc: "So sánh trực tiếp với giá giao dịch thị trường giữa bên độc lập. Tốt nhất nhưng khó tìm comparable.",
              example: "Bán hàng hóa commoditized: dầu, ngũ cốc có market price rõ ràng",
            },
            {
              method: "Cost Plus",
              desc: "Cost + markup hợp lý. Phổ biến với manufacturing entities.",
              example: "Factory sản xuất với cost 100, markup 10% → bán cho affiliate với 110",
            },
            {
              method: "Transactional Net Margin Method (TNMM)",
              desc: "So sánh operating margin với comparable companies. Phổ biến nhất trong thực tế.",
              example: "Distribution company phải có operating margin ~3-5% theo benchmark (phân tích TNMM)",
            },
          ].map(s => (
            <div key={s.method} className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="font-bold text-stone-700 text-sm mb-1">{s.method}</div>
              <p className="text-xs text-stone-600 mb-1">{s.desc}</p>
              <p className="text-xs text-stone-400 italic">{s.example}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">🌍 Case Study: Apple & Ireland</h3>
        <div className="bg-stone-800 text-white rounded-xl p-5 text-sm">
          <p className="text-stone-300 mb-3 text-xs">EC State Aid Investigation 2016: Apple owed €13B in back taxes</p>
          <div className="space-y-2">
            {[
              "Apple (Ireland) ghi nhận profits toàn cầu với tax rate hiệu quả ~0.005% (2014)",
              "IP held in Ireland but managed từ US → 'stateless income' concept",
              "EU: Ireland granted illegal state aid → phải thu lại €13B",
              "Apple kháng cáo — case kéo dài đến 2024 mới có phán quyết chính thức",
            ].map((p, i) => (
              <div key={i} className="flex gap-2 text-xs">
                <span className="text-stone-700 flex-shrink-0">•</span>
                <span className="text-stone-300">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3">📑 TP Documentation Requirements</h3>
        <div className="space-y-2">
          {[
            { doc: "Master File", scope: "Group-level TP policy, global business, value chain, IP overview" },
            { doc: "Local File", scope: "Entity-level: detailed analysis từng intercompany transaction, benchmarking studies" },
            { doc: "Country-by-Country Report (CbCR)", scope: "Revenue, profit, tax, employees per jurisdiction — cho tax authorities" },
            { doc: "Advance Pricing Agreement (APA)", scope: "Pre-agreed TP methodology với tax authority — certainty cho doanh nghiệp" },
          ].map(d => (
            <div key={d.doc} className="flex gap-3 bg-stone-50 rounded-lg p-3 border border-stone-200">
              <div className="w-32 flex-shrink-0 font-bold text-stone-700 text-xs">{d.doc}</div>
              <div className="text-xs text-stone-600">{d.scope}</div>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
