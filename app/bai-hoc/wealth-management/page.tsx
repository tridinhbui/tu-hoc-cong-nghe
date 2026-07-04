"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 51, day: 83, accent: "violet",
  title: "Wealth Management là gì?",
  subtitle: "Tài sản ròng, phân bổ tài sản và danh mục kỳ vọng",
  duration: "6 phút", difficulty: "Trung bình", emoji: "·",
  nextSlug: "modern-portfolio-theory", nextTitle: "Modern Portfolio Theory",
};

const quiz: QuizQuestion[] = [
  {
    question: "Net worth được tính như thế nào?",
    options: [
      "Tổng thu nhập hàng tháng",
      "Tổng tài sản trừ tổng nợ phải trả",
      "Giá trị chứng khoán trong tài khoản",
      "Lương nhân với số năm làm việc",
    ],
    correct: 1,
    explanation: "Net Worth = Tổng tài sản (Assets) − Tổng nợ (Liabilities). Không phải thu nhập — một người thu nhập cao nhưng tiêu hết và nợ nhiều có net worth thấp hơn người thu nhập vừa phải nhưng tiết kiệm và tích lũy đều đặn.",
  },
  {
    question: "Expected return của danh mục gồm 60% cổ phiếu (return kỳ vọng 10%) và 40% trái phiếu (return kỳ vọng 4%) là bao nhiêu?",
    options: ["4%", "7,6%", "10%", "14%"],
    correct: 1,
    explanation: "Expected Return = 0.6 × 10% + 0.4 × 4% = 6% + 1.6% = 7.6%. Đây là tính bình quân gia quyền theo tỷ trọng mỗi loại tài sản. Phân bổ tỷ trọng khác nhau sẽ tạo ra expected return và risk profile khác nhau.",
  },
  {
    question: "Tại sao thanh khoản (liquidity) lại là một tiêu chí trong asset allocation?",
    options: [
      "Vì tài sản thanh khoản cao bao giờ cũng sinh lời cao hơn",
      "Vì phải đảm bảo có tiền mặt cho nhu cầu ngắn hạn hoặc khẩn cấp",
      "Vì bất động sản luôn có thanh khoản tốt hơn cổ phiếu",
      "Vì thanh khoản không liên quan đến quản lý tài sản",
    ],
    correct: 1,
    explanation: "Liquidity là khả năng chuyển đổi tài sản thành tiền mặt nhanh mà không mất nhiều giá trị. Nếu toàn bộ tài sản là BĐS và cổ phiếu kém thanh khoản, khi có nhu cầu khẩn cấp có thể phải bán ở giá xấu. Một phần tài sản cần giữ dạng thanh khoản cao.",
  },
  {
    question: "Bước đầu tiên quan trọng nhất trong wealth management cá nhân là gì?",
    options: [
      "Mua ngay cổ phiếu tốt nhất",
      "Biết mình đang có gì — tài sản và nợ là bao nhiêu",
      "Tìm fund manager giỏi",
      "Đầu tư vào bất cứ thứ gì sinh lời cao nhất",
    ],
    correct: 1,
    explanation: "Không thể quản lý cái mình không đo được. Bước đầu tiên là lập bảng net worth: liệt kê toàn bộ tài sản (tiền mặt, chứng khoán, BĐS, xe, góp vốn...) và toàn bộ nợ (vay ngân hàng, nợ thẻ, nợ gia đình...). Từ đó mới có cơ sở để lập kế hoạch.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Wealth Management là gì?</h2>
      <p className="text-stone-500 text-sm mb-8">Quản lý tài sản bắt đầu từ việc biết mình đang có gì</p>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Wealth Management — định nghĩa đơn giản</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          Wealth management là quá trình quản lý và tăng trưởng tài sản theo mục tiêu tài chính cá nhân — bao gồm đầu tư, lập kế hoạch thuế, bảo hiểm, di chúc và phân bổ tài sản.
        </p>
        <p className="text-stone-600 leading-relaxed">
          Ở cấp độ cá nhân, wealth management đơn giản hơn: <strong>biết mình đang có gì, biết mình muốn đến đâu, và phân bổ nguồn lực để đi đến đó.</strong>
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Net Worth — điểm xuất phát</h3>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 mb-4 font-mono text-sm">
          <div className="text-stone-500 text-xs mb-3">CÔNG THỨC</div>
          <div className="font-bold text-stone-800">Net Worth = Assets − Liabilities</div>
          <div className="mt-3 space-y-1 text-xs text-stone-500">
            <div>Assets: tiền mặt, chứng khoán, BĐS, xe, góp vốn công ty, tài sản khác</div>
            <div>Liabilities: vay ngân hàng, nợ thẻ tín dụng, vay gia đình, thuê mua</div>
          </div>
        </div>
        <p className="text-stone-600 text-sm leading-relaxed">
          Net worth không phải thu nhập. Hai người cùng lương 30 triệu/tháng có thể có net worth rất khác nhau — tùy vào họ tiêu, tiết kiệm, đầu tư và vay mượn thế nào.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Asset Allocation — phân bổ tài sản</h3>
        <p className="text-stone-600 leading-relaxed text-sm mb-4">
          Phân bổ bao nhiêu % vào mỗi loại tài sản. Không có công thức cố định — phụ thuộc vào mục tiêu, thời gian, khẩu vị rủi ro và nhu cầu thanh khoản.
        </p>
        <div className="space-y-2 text-sm text-stone-600">
          <div><strong>Cổ phiếu:</strong> Tiềm năng lợi nhuận cao, biến động mạnh, thanh khoản tốt</div>
          <div><strong>Trái phiếu:</strong> Ổn định, thu nhập cố định, đối trọng với cổ phiếu</div>
          <div><strong>Bất động sản:</strong> Phòng lạm phát, dòng tiền cho thuê, thanh khoản thấp</div>
          <div><strong>Tiền mặt:</strong> Thanh khoản cao, sinh lời thấp, dự phòng ngắn hạn</div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Expected Return của danh mục</h3>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 mb-3 font-mono text-sm">
          <div className="text-stone-500 text-xs mb-2">VÍ DỤ: danh mục 60/40</div>
          <div className="text-stone-700 text-xs space-y-1">
            <div>60% cổ phiếu × 10% kỳ vọng = 6%</div>
            <div>40% trái phiếu × 4% kỳ vọng = 1.6%</div>
            <div className="mt-2 font-bold text-stone-800">Expected Return = 7.6%</div>
          </div>
        </div>
        <p className="text-stone-600 text-xs leading-relaxed">
          Expected return của danh mục là trung bình có trọng số của expected return từng tài sản thành phần. Danh mục khác nhau tạo ra risk-return profile khác nhau.
        </p>
      </section>

      <section>
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">3 câu hỏi cốt lõi</h3>
        <div className="space-y-3">
          {[
            { q: "Mình đang ở đâu?", a: "Lập bảng net worth: assets và liabilities" },
            { q: "Mình muốn đến đâu?", a: "Mục tiêu tài chính: về hưu, mua nhà, tài chính tự do..." },
            { q: "Phân bổ thế nào để đến đó?", a: "Asset allocation theo rủi ro, thời gian và thanh khoản" },
          ].map(s => (
            <div key={s.q} className="flex gap-4 text-sm">
              <span className="font-semibold text-stone-800 min-w-[160px]">{s.q}</span>
              <span className="text-stone-500">{s.a}</span>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
