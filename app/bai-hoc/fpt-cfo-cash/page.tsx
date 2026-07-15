"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 43, day: 43, accent: "blue",
  title: "CFO FPT và 8.500 tỷ tiền mặt",
  subtitle: "Cân bằng Liquidity, Financial Income và Capital Allocation",
  duration: "6 phút", difficulty: "Trung bình", emoji: "·",
  nextSlug: "oil-gas-business-model", nextTitle: "4 Mô hình Kinh doanh Dầu khí",
};

const quiz: QuizQuestion[] = [
  {
    question: "Khoản mục nào phản ánh tiền đang được tối ưu để sinh lãi nhưng vẫn duy trì mức độ an toàn cao?",
    options: ["Tiền mặt tại quỹ", "Tiền gửi có kỳ hạn", "Hàng tồn kho", "Tài sản cố định"],
    correct: 1,
    explanation: "Tiền gửi có kỳ hạn (Term Deposits) sinh lãi cao hơn tài khoản thanh toán thông thường, nhưng vẫn là tài sản rất an toàn với rủi ro thấp. Đây là cách CFO tối ưu financial income mà không đánh đổi quá nhiều thanh khoản.",
  },
  {
    question: "Nếu FPT chuyển thêm 2.000 tỷ từ Cash & Equivalents sang Term Deposits, chỉ tiêu nào có khả năng giảm?",
    options: ["Tổng tài sản", "Thanh khoản tức thời (immediate liquidity)", "Vốn chủ sở hữu", "Doanh thu"],
    correct: 1,
    explanation: "Tổng tài sản không đổi (chỉ là dịch chuyển giữa hai dạng tài sản). Nhưng thanh khoản tức thời giảm vì tiền gửi kỳ hạn cần thời gian rút hoặc có thể phạt nếu rút trước hạn. CFO phải tính đủ buffer trước khi khóa tiền.",
  },
  {
    question: "Một CFO thường ưu tiên mục tiêu nào trong quản lý tiền mặt?",
    options: ["Giữ càng nhiều tiền mặt trong tài khoản thanh toán càng tốt", "Đầu tư toàn bộ tiền vào dự án mới để tối đa hóa return", "Cân bằng giữa thanh khoản, rủi ro và lợi nhuận - không cực đoan ở chiều nào", "Giữ tiền trong tài khoản không sinh lãi để linh hoạt nhất"],
    correct: 2,
    explanation: "Cash management là bài toán tối ưu ba chiều: đủ liquidity để vận hành và nắm bắt cơ hội; đủ financial income để không để tiền chết; đủ safety để không rơi vào khủng hoảng thanh khoản. Không có công thức cố định - phụ thuộc vào stage, industry và strategy của từng công ty.",
  },
];


export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">CFO FPT và 8.500 tỷ Tiền Mặt</h2>
      <p className="text-stone-500 text-sm mb-8">Bài toán capital allocation thực tế: giữ bao nhiêu và tối ưu bao nhiêu?</p>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Số liệu thực tế - FPT Q1/2026</h3>
        <p className="text-stone-600 leading-relaxed mb-4">
          Tại 31/03/2026, công ty mẹ FPT đang nắm giữ tổng cộng hơn <strong>8.500 tỷ VND</strong> trong các dạng tài sản liên quan đến tiền và đầu tư ngắn hạn.
        </p>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-100">
              <tr>
                <th className="p-3 text-left font-semibold text-stone-600 text-xs">Khoản mục</th>
                <th className="p-3 text-right font-semibold text-stone-600 text-xs">Giá trị (tỷ VND)</th>
                <th className="p-3 text-right font-semibold text-stone-600 text-xs">Tỷ trọng</th>
              </tr>
            </thead>
            <tbody>
              {[
                { item: "Cash & Cash Equivalents", val: 2231, note: "Tiền và các khoản tương đương tiền" },
                { item: "Term Deposits", val: 6174, note: "Tiền gửi có kỳ hạn" },
                { item: "Interest Receivables", val: 125, note: "Lãi phải thu" },
              ].map((r, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                  <td className="p-3">
                    <div className="font-medium text-stone-800 text-xs">{r.item}</div>
                    <div className="text-stone-500 text-xs">{r.note}</div>
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-stone-700 text-sm">{r.val.toLocaleString()}</td>
                  <td className="p-3 text-right text-stone-500 text-xs">{((r.val / 8530) * 100).toFixed(0)}%</td>
                </tr>
              ))}
              <tr className="border-t border-stone-300 bg-stone-100">
                <td className="p-3 font-bold text-stone-800 text-xs">Tổng cộng</td>
                <td className="p-3 text-right font-mono font-bold text-stone-700">8.530</td>
                <td className="p-3 text-right font-bold text-stone-600 text-xs">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-stone-500 text-xs mt-2">
          Điểm đáng chú ý: <strong>tiền gửi kỳ hạn lớn gần gấp 3 lần tiền mặt sẵn có</strong> - FPT không để tiền chết mà đang chủ động tối ưu financial income.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Ba câu hỏi CFO phải trả lời</h3>
        <div className="space-y-4">
          {[
            {
              q: "1. Bao nhiêu tiền cần sẵn sàng cho hoạt động kinh doanh?",
              a: "Đủ để cover payroll, supplier payments, capex ngắn hạn và buffer cho cơ hội bất ngờ. Thường được đo bằng cash runway - bao nhiêu tháng công ty có thể vận hành mà không cần thêm dòng tiền vào.",
            },
            {
              q: "2. Bao nhiêu tiền nên được tối ưu để tạo thêm lợi nhuận?",
              a: "Phần vượt quá nhu cầu hoạt động có thể gửi kỳ hạn hoặc đầu tư vào instruments an toàn. Với FPT, 6.174 tỷ trong term deposits tạo ra financial income đáng kể - cải thiện lợi nhuận mà không cần tăng doanh thu.",
            },
            {
              q: "3. Phân bổ vốn như thế nào cho hợp lý?",
              a: "Capital allocation là quyết định chiến lược: mở rộng M&A, trả cổ tức, buyback, hay đầu tư vào growth? Cash position mạnh tạo optionality - khả năng hành động nhanh khi cơ hội xuất hiện.",
            },
          ].map(s => (
            <div key={s.q} className="border-l-2 border-stone-300 pl-4 py-1">
              <div className="font-semibold text-stone-800 text-sm mb-1">{s.q}</div>
              <p className="text-stone-500 text-sm leading-relaxed">{s.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Phân bổ điển hình - FPT 8.500 tỷ VND</h3>
        <div className="border border-stone-200 rounded-xl p-4 bg-stone-50 space-y-2 text-sm text-stone-700">
          <div className="flex justify-between border-b border-stone-200 pb-2">
            <span>Cash &amp; Equivalents (26%)</span>
            <span className="font-mono font-bold">2.210 tỷ</span>
          </div>
          <div className="flex justify-between border-b border-stone-200 pb-2">
            <span>Term Deposits (73%)</span>
            <span className="font-mono font-bold">6.205 tỷ</span>
          </div>
          <div className="flex justify-between pb-1">
            <span>Khác / Đầu tư (1%)</span>
            <span className="font-mono font-bold">85 tỷ</span>
          </div>
          <div className="border-l-2 border-stone-300 pl-3 pt-2 text-xs text-stone-500">
            Thu nhập lãi ước tính: ~365 tỷ/năm (~4.3% return). Phân bổ cân bằng - đủ thanh khoản và đang tối ưu return.
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Đánh đổi không thể tránh</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-stone-200 rounded-xl p-4">
            <div className="font-bold text-stone-700 text-sm mb-2">Giữ quá nhiều tiền mặt</div>
            <p className="text-stone-500 text-xs leading-relaxed">Thanh khoản tốt nhưng bỏ lỡ financial income. Với lãi suất 5-6%/năm, mỗi nghìn tỷ để không là mất 50-60 tỷ lãi mỗi năm.</p>
          </div>
          <div className="border border-stone-200 rounded-xl p-4">
            <div className="font-bold text-stone-700 text-sm mb-2">Khóa toàn bộ vào dài hạn</div>
            <p className="text-stone-500 text-xs leading-relaxed">Financial income tối đa nhưng mất linh hoạt. Nếu cơ hội M&A xuất hiện hoặc thị trường biến động, không có tiền để hành động nhanh.</p>
          </div>
        </div>
        <p className="text-stone-500 text-xs mt-3 text-center italic">Không có câu trả lời đúng tuyệt đối - phụ thuộc vào growth stage, upcoming capex, và market outlook của từng công ty.</p>
      </section>

      <section>
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-3 uppercase tracking-wide text-xs">Góc nhìn thực hành</h3>
        <p className="text-stone-600 text-sm leading-relaxed">
          Bài học từ FPT không phải là con số cụ thể, mà là <strong>tư duy phân bổ tiền mặt có chủ đích</strong>. Tiền không để im - nhưng cũng không được khóa đến mức mất đi sự linh hoạt chiến lược. CFO giỏi biết ranh giới đó nằm ở đâu với công ty của mình.
        </p>
      </section>
    </LessonPageLayout>
  );
}
