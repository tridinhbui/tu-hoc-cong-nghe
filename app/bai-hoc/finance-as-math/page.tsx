"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 53, day: 86, accent: "blue",
  title: "Tài chính quy về Công thức Toán học",
  subtitle: "DCF, WACC, Terminal Value và các bội số định giá",
  duration: "7 phút", difficulty: "Khó", emoji: "·",
  nextSlug: "samsung-ai-finance", nextTitle: "Samsung Q1/2026 — AI qua lăng kính tài chính",
};

const quiz: QuizQuestion[] = [
  {
    question: "DCF định giá doanh nghiệp dựa trên điều gì?",
    options: [
      "Giá cổ phiếu hôm nay",
      "Dòng tiền tự do trong tương lai chiết khấu về hiện tại",
      "Tổng tài sản trên bảng cân đối kế toán",
      "Lợi nhuận gộp năm gần nhất",
    ],
    correct: 1,
    explanation: "DCF (Discounted Cash Flow) định giá bằng cách ước tính tất cả dòng tiền tự do (FCF) doanh nghiệp sẽ tạo ra trong tương lai, rồi chiết khấu về giá trị hiện tại bằng tỷ lệ chiết khấu (WACC). Giá trị doanh nghiệp = tổng giá trị hiện tại của tất cả FCF tương lai.",
  },
  {
    question: "WACC là gì và tại sao nó quan trọng trong DCF?",
    options: [
      "Tỷ lệ tăng trưởng doanh thu",
      "Chi phí vốn bình quân gia quyền — tỷ lệ chiết khấu trong DCF",
      "Biên lợi nhuận ròng",
      "Tỷ lệ nợ trên tổng tài sản",
    ],
    correct: 1,
    explanation: "WACC (Weighted Average Cost of Capital) là chi phí vốn bình quân gia quyền của vốn chủ sở hữu và nợ vay. Đây là tỷ lệ chiết khấu trong DCF. WACC tăng → giá trị chiết khấu giảm → định giá thấp hơn. WACC phản ánh rủi ro và cơ cấu vốn của doanh nghiệp.",
  },
  {
    question: "Tại sao Terminal Value thường chiếm tỷ trọng lớn trong tổng giá trị DCF?",
    options: [
      "Vì năm đầu tiên luôn quan trọng nhất",
      "Vì phần lớn giá trị doanh nghiệp nằm ở dòng tiền dài hạn sau giai đoạn dự báo chi tiết",
      "Vì terminal value dễ tính nhất",
      "Vì WACC không áp dụng cho terminal value",
    ],
    correct: 1,
    explanation: "DCF thường dự báo chi tiết 5-10 năm, nhưng doanh nghiệp sẽ tiếp tục hoạt động sau đó. Terminal Value ước tính tổng giá trị từ năm thứ 11 trở đi — thường chiếm 60-80% tổng định giá. Điều này khiến terminal value rất nhạy cảm với giả định tốc độ tăng trưởng dài hạn (g).",
  },
  {
    question: "EV/EBITDA khác P/E ở điểm nào?",
    options: [
      "EV/EBITDA dùng cho doanh nghiệp nhỏ, P/E dùng cho doanh nghiệp lớn",
      "EV/EBITDA nhìn ở cấp độ doanh nghiệp trước nợ và thuế, P/E nhìn ở cấp độ cổ đông sau nợ và thuế",
      "EV/EBITDA chỉ dùng cho ngân hàng",
      "Hai chỉ số hoàn toàn giống nhau",
    ],
    correct: 1,
    explanation: "EV (Enterprise Value) là giá trị toàn bộ doanh nghiệp trước khi trừ nợ. EBITDA là thu nhập trước lãi vay, thuế và khấu hao. EV/EBITDA so sánh ở cấp doanh nghiệp, độc lập với cơ cấu vốn. P/E nhìn ở cấp cổ đông — bị ảnh hưởng bởi đòn bẩy tài chính và thuế. EV/EBITDA phù hợp hơn khi so sánh doanh nghiệp có cơ cấu nợ khác nhau.",
  },
  {
    question: "Nếu WACC tăng từ 8% lên 12%, trong khi FCF và Terminal Value không đổi, định giá DCF sẽ thế nào?",
    options: ["Tăng", "Giảm", "Không đổi", "Không thể xác định"],
    correct: 1,
    explanation: "Tỷ lệ chiết khấu tăng → PV của mỗi đồng FCF trong tương lai giảm xuống → tổng giá trị DCF giảm. Đây là lý do khi lãi suất tăng, định giá cổ phiếu (đặc biệt cổ phiếu growth) thường giảm — vì WACC tăng ép định giá xuống.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Tài chính quy về Công thức Toán học</h2>
      <p className="text-stone-500 text-sm mb-8">DCF, WACC, Terminal Value — mọi thứ về định giá đều dựa trên một vài giả định đơn giản</p>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Tài chính là math đặt trong bối cảnh</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          Phần lớn định giá tài chính quy về một ý tưởng đơn giản: <strong>một đồng trong tương lai không bằng một đồng hôm nay</strong>. Và mọi công thức phức tạp đều là biến thể của ý tưởng đó.
        </p>
        <p className="text-stone-600 leading-relaxed">
          Khi hiểu được cái gốc này, mọi công thức — từ DCF đến WACC đến Terminal Value — bắt đầu cảm thấy có logic, không phải là công thức để nhớ thuộc lòng.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">DCF — Discounted Cash Flow</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-4">
          Doanh nghiệp đáng giá bao nhiêu = chiết khấu toàn bộ dòng tiền tự do tương lai về hiện tại.
        </p>
        <div className="space-y-4">
          <div>
            <div className="font-bold text-stone-800 text-sm mb-1">WACC — Chi phí vốn bình quân</div>
            <p className="text-stone-600 text-xs mb-2">
              Chi phí vốn bình quân của toàn bộ nguồn vốn (cả vốn chủ sở hữu và nợ vay). WACC là tỷ lệ chiết khấu trong DCF.
            </p>
            <p className="text-stone-600 text-xs font-mono bg-stone-50 p-2 rounded">
              WACC = (E/V) × Ke + (D/V) × Kd × (1 − Tax rate)
            </p>
          </div>
          <div>
            <div className="font-bold text-stone-800 text-sm mb-1">Terminal Value</div>
            <p className="text-stone-600 text-xs">
              DCF dự báo chi tiết 5-10 năm. Terminal Value ước tính giá trị từ năm dự báo cuối trở đi. Thường chiếm 60-80% tổng định giá.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Bội số định giá (Valuation Multiples)</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-4">
          DCF đòi hỏi nhiều giả định. Nhà đầu tư thường dùng kết hợp: DCF làm nền, multiples để so sánh với ngành.
        </p>
        <div className="space-y-3 text-sm">
          <div className="border border-stone-200 rounded-lg p-3">
            <div className="font-bold text-stone-800">P/E — Price to Earnings</div>
            <p className="text-stone-600 text-xs mt-1">Thị trường trả bao nhiêu lần lợi nhuận/cổ phiếu. Dùng cho cổ phiếu lợi nhuận ổn định, so sánh trong ngành.</p>
          </div>
          <div className="border border-stone-200 rounded-lg p-3">
            <div className="font-bold text-stone-800">EV/EBITDA</div>
            <p className="text-stone-600 text-xs mt-1">Giá trị doanh nghiệp so với thu nhập trước lãi, thuế, khấu hao. So sánh doanh nghiệp có cơ cấu nợ khác nhau.</p>
          </div>
          <div className="border border-stone-200 rounded-lg p-3">
            <div className="font-bold text-stone-800">P/B — Price to Book</div>
            <p className="text-stone-600 text-xs mt-1">Thị trường trả bao nhiêu lần giá trị sổ sách. Dùng cho ngân hàng, tài chính, BĐS.</p>
          </div>
          <div className="border border-stone-200 rounded-lg p-3">
            <div className="font-bold text-stone-800">EV/Revenue</div>
            <p className="text-stone-600 text-xs mt-1">Giá trị doanh nghiệp so với doanh thu. Dùng cho startup, tech chưa có lãi.</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold text-stone-800 mb-3 uppercase tracking-wide text-xs">Điều quan trọng nhất</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          DCF phụ thuộc nhiều vào giả định: FCF tương lai ước tính thế nào, WACC chọn bao nhiêu, g dài hạn bao nhiêu. <strong>Thay đổi nhỏ trong các giả định có thể tạo ra định giá rất khác nhau.</strong>
        </p>
        <p className="text-stone-600 text-sm leading-relaxed">
          Đây là lý do nhiều người nói DCF là "garbage in, garbage out" — công thức đúng nhưng đầu vào cần suy nghĩ cẩn thận. Sensitivity analysis (thay đổi từng biến và xem định giá thay đổi ra sao) là cách kiểm tra tính chắc chắn của kết quả.
        </p>
      </section>
    </LessonPageLayout>
  );
}
