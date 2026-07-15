"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 53, day: 86, accent: "blue",
  title: "Tài chính quy về Công thức Toán học",
  subtitle: "Dòng tiền chiết khấu, chi phí vốn và các bội số định giá",
  duration: "7 phút", difficulty: "Khó", emoji: "·",
  nextSlug: "samsung-ai-finance", nextTitle: "Samsung Q1/2026 - AI qua lăng kính tài chính",
};

const quiz: QuizQuestion[] = [
  {
    question: "Phương pháp dòng tiền chiết khấu định giá doanh nghiệp dựa trên điều gì?",
    options: [
      "Giá cổ phiếu hôm nay",
      "Dòng tiền tự do trong tương lai chiết khấu về hiện tại",
      "Tổng tài sản trên bảng cân đối kế toán",
      "Lợi nhuận gộp năm gần nhất",
    ],
    correct: 1,
    explanation: "Dòng tiền chiết khấu, tiếng Anh là DCF, định giá bằng cách ước tính dòng tiền tự do trong tương lai rồi quy về giá trị hiện tại. Ý tưởng là: tiền trong tương lai phải được giảm về giá trị hôm nay.",
  },
  {
    question: "Chi phí vốn bình quân là gì và tại sao quan trọng khi định giá?",
    options: [
      "Tỷ lệ tăng trưởng doanh thu",
      "Chi phí vốn bình quân gia quyền - tỷ lệ dùng để chiết khấu dòng tiền tương lai",
      "Biên lợi nhuận ròng",
      "Tỷ lệ nợ trên tổng tài sản",
    ],
    correct: 1,
    explanation: "Chi phí vốn bình quân, tiếng Anh là WACC, là mức lợi nhuận tối thiểu mà cả cổ đông và chủ nợ kỳ vọng. Chi phí vốn càng cao thì dòng tiền tương lai càng bị chiết khấu mạnh, định giá càng thấp.",
  },
  {
    question: "Tại sao giá trị dài hạn sau giai đoạn dự báo thường chiếm tỷ trọng lớn trong định giá?",
    options: [
      "Vì năm đầu tiên luôn quan trọng nhất",
      "Vì phần lớn giá trị doanh nghiệp nằm ở dòng tiền dài hạn sau giai đoạn dự báo chi tiết",
      "Vì giá trị dài hạn dễ tính nhất",
      "Vì chi phí vốn không áp dụng cho giá trị dài hạn",
    ],
    correct: 1,
    explanation: "Định giá thường chỉ dự báo chi tiết 5-10 năm, nhưng doanh nghiệp còn hoạt động sau đó. Giá trị dài hạn sau giai đoạn dự báo, gọi là Terminal Value, có thể chiếm phần lớn tổng định giá.",
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
    explanation: "EV là giá trị toàn bộ doanh nghiệp, gồm cả phần thuộc về chủ nợ. EBITDA là lợi nhuận trước lãi vay, thuế và khấu hao. EV/EBITDA giúp so sánh doanh nghiệp có cơ cấu nợ khác nhau; P/E nhìn ở cấp cổ đông sau nợ và thuế.",
  },
  {
    question: "Nếu chi phí vốn tăng từ 8% lên 12%, trong khi dòng tiền tương lai không đổi, định giá sẽ thế nào?",
    options: ["Tăng", "Giảm", "Không đổi", "Không thể xác định"],
    correct: 1,
    explanation: "Tỷ lệ chiết khấu tăng làm giá trị hiện tại của mỗi đồng tiền tương lai giảm xuống. Đây là lý do khi lãi suất tăng, định giá cổ phiếu tăng trưởng thường chịu áp lực.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">Tài chính quy về Công thức Toán học</h2>
      <p className="text-stone-500 text-sm mb-8">Dòng tiền chiết khấu, chi phí vốn và giá trị dài hạn đều xoay quanh một ý tưởng: tiền hôm nay đáng giá hơn tiền tương lai.</p>

      <section className="mb-10 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-blue-800 mb-2">Nói đơn giản</h3>
        <p className="text-sm leading-relaxed text-stone-700">
          Định giá không phải là học thuộc công thức. Ta đang hỏi: doanh nghiệp sẽ tạo ra bao nhiêu tiền trong tương lai, số tiền đó đáng giá bao nhiêu ở hiện tại, và mình có đang trả quá đắt không.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Tài chính là math đặt trong bối cảnh</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          Phần lớn định giá tài chính quy về một ý tưởng đơn giản: <strong>một đồng trong tương lai không bằng một đồng hôm nay</strong>. Mọi công thức phức tạp đều là biến thể của ý tưởng đó.
        </p>
        <p className="text-stone-600 leading-relaxed">
          Khi hiểu được cái gốc này, các công thức như dòng tiền chiết khấu, chi phí vốn hay giá trị dài hạn bắt đầu có logic, không còn là thứ phải nhớ thuộc lòng.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Dòng tiền chiết khấu (DCF)</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-4">
          Doanh nghiệp đáng giá bao nhiêu = chiết khấu toàn bộ dòng tiền tự do tương lai về hiện tại.
        </p>
        <div className="space-y-4">
          <div>
            <div className="font-bold text-stone-800 text-sm mb-1">Chi phí vốn bình quân (WACC)</div>
            <p className="text-stone-600 text-xs mb-2">
              Chi phí vốn bình quân của toàn bộ nguồn vốn, gồm vốn chủ sở hữu và nợ vay. Đây là tỷ lệ dùng để chiết khấu dòng tiền tương lai.
            </p>
            <p className="text-stone-600 text-xs font-mono bg-stone-50 p-2 rounded">
              WACC = (E/V) × Ke + (D/V) × Kd × (1 − Tax rate)
            </p>
          </div>
          <div>
            <div className="font-bold text-stone-800 text-sm mb-1">Giá trị dài hạn sau giai đoạn dự báo (Terminal Value)</div>
            <p className="text-stone-600 text-xs">
              Dòng tiền chiết khấu thường dự báo chi tiết 5-10 năm. Giá trị dài hạn ước tính giá trị từ năm dự báo cuối trở đi và thường chiếm phần lớn tổng định giá.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Bội số định giá (Valuation Multiples)</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-4">
          Dòng tiền chiết khấu đòi hỏi nhiều giả định. Nhà đầu tư thường dùng thêm các bội số định giá để so sánh với ngành.
        </p>
        <div className="space-y-3 text-sm">
          <div className="border border-stone-200 rounded-lg p-3">
            <div className="font-bold text-stone-800">P/E - Giá trên lợi nhuận</div>
            <p className="text-stone-600 text-xs mt-1">Thị trường trả bao nhiêu lần lợi nhuận/cổ phiếu. Dùng cho cổ phiếu lợi nhuận ổn định, so sánh trong ngành.</p>
          </div>
          <div className="border border-stone-200 rounded-lg p-3">
            <div className="font-bold text-stone-800">EV/EBITDA - Giá trị doanh nghiệp trên lợi nhuận vận hành</div>
            <p className="text-stone-600 text-xs mt-1">Giá trị doanh nghiệp so với thu nhập trước lãi, thuế, khấu hao. So sánh doanh nghiệp có cơ cấu nợ khác nhau.</p>
          </div>
          <div className="border border-stone-200 rounded-lg p-3">
            <div className="font-bold text-stone-800">P/B - Giá trên giá trị sổ sách</div>
            <p className="text-stone-600 text-xs mt-1">Thị trường trả bao nhiêu lần giá trị sổ sách. Dùng cho ngân hàng, tài chính, BĐS.</p>
          </div>
          <div className="border border-stone-200 rounded-lg p-3">
            <div className="font-bold text-stone-800">EV/Revenue - Giá trị doanh nghiệp trên doanh thu</div>
            <p className="text-stone-600 text-xs mt-1">Giá trị doanh nghiệp so với doanh thu. Dùng cho startup, tech chưa có lãi.</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-3 uppercase tracking-wide text-xs">Điều quan trọng nhất</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          Dòng tiền chiết khấu phụ thuộc nhiều vào giả định: dòng tiền tương lai ước tính thế nào, chi phí vốn chọn bao nhiêu, tốc độ tăng trưởng dài hạn ra sao. <strong>Thay đổi nhỏ trong các giả định có thể tạo ra định giá rất khác nhau.</strong>
        </p>
        <p className="text-stone-600 text-sm leading-relaxed">
          Đây là lý do nhiều người nói: công thức đúng nhưng đầu vào sai thì kết quả vẫn sai. Phân tích độ nhạy, tức thay đổi từng biến và xem định giá thay đổi ra sao, là cách kiểm tra kết quả có chắc không.
        </p>
      </section>
    </LessonPageLayout>
  );
}
