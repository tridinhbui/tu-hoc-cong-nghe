"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 49, day: 77, accent: "rose",
  title: "Phân loại Rủi ro Tài chính",
  subtitle: "Credit, Liquidity, Interest Rate, Market và Concentration Risk",
  duration: "6 phút", difficulty: "Trung bình", emoji: "·",
  nextSlug: "wealth-management", nextTitle: "Wealth Management là gì?",
};

const quiz: QuizQuestion[] = [
  {
    question: "Credit risk là gì?",
    options: [
      "Rủi ro giá cổ phiếu tăng quá nhanh",
      "Rủi ro bên vay không trả được nợ",
      "Rủi ro doanh nghiệp có quá nhiều tiền mặt",
      "Rủi ro nhà đầu tư mua được giá thấp",
    ],
    correct: 1,
    explanation: "Credit risk là xác suất bên đối tác không thực hiện được nghĩa vụ tài chính - trả gốc, trả lãi, hoặc thực hiện hợp đồng. Khi mua trái phiếu doanh nghiệp, nhà đầu tư đang chịu credit risk của doanh nghiệp phát hành.",
  },
  {
    question: "Khi mua trái phiếu doanh nghiệp, bản chất là mình đang làm gì?",
    options: [
      "Gửi tiết kiệm ngân hàng",
      "Mua quyền sở hữu doanh nghiệp",
      "Cho doanh nghiệp vay tiền",
      "Mua bảo hiểm cho doanh nghiệp",
    ],
    correct: 2,
    explanation: "Mua trái phiếu = cho vay. Doanh nghiệp cam kết trả lãi định kỳ và hoàn gốc đúng hạn. Nếu doanh nghiệp không đủ tiền trả, nhà đầu tư chịu credit risk - có thể mất một phần hoặc toàn bộ số tiền đã cho vay.",
  },
  {
    question: "Liquidity risk là gì?",
    options: [
      "Rủi ro không bán được tài sản nhanh với giá hợp lý",
      "Rủi ro doanh thu tăng quá nhanh",
      "Rủi ro doanh nghiệp trả cổ tức cao",
      "Rủi ro cổ phiếu có thanh khoản tốt",
    ],
    correct: 0,
    explanation: "Liquidity risk = có tài sản nhưng không bán được nhanh thành tiền mặt, hoặc phải bán giá xấu. BĐS là ví dụ điển hình: có đất, có dự án, có tài sản trên giấy chưa chắc có tiền đúng lúc cần.",
  },
  {
    question: "Nếu lãi suất tăng mạnh, doanh nghiệp vay nợ nhiều thường gặp vấn đề gì trước?",
    options: [
      "Chi phí vay tăng",
      "Doanh thu chắc chắn tăng",
      "Nợ tự động giảm",
      "Giá tài sản luôn tăng",
    ],
    correct: 0,
    explanation: "Interest rate risk: lãi suất tăng → chi phí vay tăng → áp lực EBIT phải đủ cover interest expense → nếu không đủ thì financial distress. Doanh nghiệp leverage cao rất nhạy cảm với thay đổi lãi suất.",
  },
  {
    question: "Stress test dùng để làm gì?",
    options: [
      "Xem doanh nghiệp/danh mục chịu được kịch bản xấu tới đâu",
      "Dự đoán chắc chắn giá cổ phiếu",
      "Đảm bảo đầu tư không bao giờ lỗ",
      "Làm đẹp báo cáo tài chính",
    ],
    correct: 0,
    explanation: "Stress test = đặt doanh nghiệp hoặc danh mục vào kịch bản xấu (lãi suất tăng mạnh, doanh thu giảm 30%, tỷ giá biến động...) để xem sẽ chịu được tới đâu. Không phải để dự báo tương lai mà để đánh giá sức chịu đựng.",
  },
];

const RISKS = [
  {
    name: "Credit Risk",
    vn: "Rủi ro tín dụng",
    desc: "Bên vay không trả được nợ - gốc hoặc lãi.",
    example: "Mua trái phiếu Tân Hoàng Minh → công ty không trả được → nhà đầu tư mất tiền.",
    model: "PD (Probability of Default) × LGD (Loss Given Default) = Expected Loss",
  },
  {
    name: "Liquidity Risk",
    vn: "Rủi ro thanh khoản",
    desc: "Có tài sản nhưng không bán được nhanh thành tiền mặt, hoặc phải bán giá xấu.",
    example: "BĐS: có đất, có dự án, có tài sản trên giấy chưa chắc có tiền đúng lúc.",
    model: "",
  },
  {
    name: "Interest Rate Risk",
    vn: "Rủi ro lãi suất",
    desc: "Lãi suất tăng → chi phí vay tăng. Trái phiếu cũ lãi thấp cũng giảm giá khi lãi suất tăng.",
    example: "Doanh nghiệp vay nợ nhiều khi lãi suất ngân hàng tăng lên 15%+.",
    model: "",
  },
  {
    name: "Market Risk",
    vn: "Rủi ro thị trường",
    desc: "Giá cổ phiếu, trái phiếu, hàng hóa, tỷ giá đi ngược kỳ vọng.",
    example: "Doanh nghiệp chưa phá sản, nhưng tài khoản vẫn lỗ nặng vì thị trường chung xấu.",
    model: "VaR (Value at Risk): ước lượng mức lỗ tối đa với một xác suất và khoảng thời gian nhất định",
  },
  {
    name: "Concentration Risk",
    vn: "Rủi ro tập trung",
    desc: "All-in vào một mã, một ngành, một loại tài sản - hoặc phụ thuộc quá nhiều vào một nguồn vốn/nhóm khách hàng.",
    example: "Danh mục 100% cổ phiếu ngân hàng. Hoặc PVGas phụ thuộc vào nhóm khách điện.",
    model: "",
  },
  {
    name: "Confidence Risk",
    vn: "Rủi ro mất niềm tin",
    desc: "Khi niềm tin biến mất, tiền rút rất nhanh.",
    example: "Silicon Valley Bank: bank run xảy ra cực nhanh khi niềm tin mất. Vạn Thịnh Phát.",
    model: "",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Phân loại Rủi ro Tài chính</h2>
      <p className="text-stone-500 text-sm mb-8">Nhìn rủi ro phía sau doanh nghiệp trước khi đầu tư</p>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Tại sao cần học về rủi ro?</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          Nhìn lại các case tại Việt Nam: <strong>Tân Hoàng Minh</strong> là bài học về trái phiếu doanh nghiệp. <strong>Vạn Thịnh Phát</strong> là bài học về hệ sinh thái, ngân hàng và niềm tin. <strong>FLC/Faros</strong> là bài học về cổ phiếu và thao túng giá.
        </p>
        <p className="text-stone-600 leading-relaxed">
          Mỗi case khác nhau, nhưng đều nhắc một điều: nhìn rủi ro phía sau doanh nghiệp trước khi đầu tư.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">6 loại rủi ro cần nhớ</h3>
        <div className="space-y-4">
          {RISKS.map(r => (
            <div key={r.name} className="border border-stone-200 rounded-xl p-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-bold text-stone-800 text-sm">{r.name}</span>
                <span className="text-xs text-stone-500">({r.vn})</span>
              </div>
              <p className="text-stone-600 text-xs leading-relaxed mb-2">{r.desc}</p>
              <p className="text-stone-500 text-xs italic">{r.example}</p>
              {r.model && <p className="mt-2 text-xs text-stone-500 bg-stone-50 rounded-lg px-3 py-2 font-mono">{r.model}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Rủi ro kéo nhau như domino</h3>
        <div className="space-y-2 text-sm text-stone-600">
          <div> - Lãi suất tăng → chi phí vay tăng</div>
          <div> - Dòng tiền yếu đi → credit risk tăng</div>
          <div> - Tài sản khó bán → liquidity risk xuất hiện</div>
          <div> - Thị trường mất niềm tin → confidence risk → mọi thứ xấu nhanh hơn</div>
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Risk Modeling - một số khái niệm</h3>
        <div className="space-y-2">
          {[
            { term: "PD - Probability of Default", def: "Xác suất bên vay không trả được nợ" },
            { term: "LGD - Loss Given Default", def: "Nếu vỡ nợ thì mất bao nhiêu % khoản vay" },
            { term: "Expected Loss", def: "PD × LGD = khoản lỗ kỳ vọng" },
            { term: "VaR - Value at Risk", def: "Mức lỗ tối đa có thể xảy ra trong khoảng thời gian với xác suất nhất định" },
            { term: "Stress Test", def: "Đặt doanh nghiệp vào kịch bản xấu để xem chịu được tới đâu" },
            { term: "Sensitivity Analysis", def: "Một biến thay đổi 1% thì kết quả thay đổi bao nhiêu - ví dụ lãi suất tăng 1%?" },
          ].map(s => (
            <div key={s.term} className="border-l-2 border-stone-200 pl-3 py-1">
              <div className="font-semibold text-stone-800 text-xs">{s.term}</div>
              <div className="text-stone-500 text-xs">{s.def}</div>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
