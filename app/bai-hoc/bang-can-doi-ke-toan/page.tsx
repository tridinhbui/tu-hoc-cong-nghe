"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 3, day: 3, accent: "violet",
  title: "Đọc Bảng Cân Đối Kế Toán",
  subtitle: "Doanh nghiệp đang có gì và tiền đến từ đâu?",
  duration: "8 phút", difficulty: "Dễ", emoji: "⚖️",
  nextSlug: "10-cong-thuc-finance", nextTitle: "Day 4: 10 Công Thức Finance",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Phương trình kế toán cơ bản là:",
    options: [
      "Tài sản = Doanh thu − Chi phí",
      "Tài sản = Nợ phải trả + Vốn chủ sở hữu",
      "Nợ = Tài sản + Vốn chủ",
      "Vốn chủ = Tài sản × Đòn bẩy",
    ],
    correct: 1,
    explanation: "Assets = Liabilities + Equity. Đây là nền tảng của kế toán kép — mọi giao dịch đều giữ nguyên phương trình này.",
  },
  {
    question: "Tài sản ngắn hạn (Current Assets) bao gồm:",
    options: [
      "Nhà máy, máy móc, bất động sản",
      "Tiền mặt, phải thu, tồn kho — có thể chuyển thành tiền trong 12 tháng",
      "Thương hiệu, bằng sáng chế, goodwill",
      "Đầu tư dài hạn vào công ty khác",
    ],
    correct: 1,
    explanation: "Current Assets là tài sản có thể thanh khoản trong 12 tháng: tiền mặt, các khoản phải thu, tồn kho, chi phí trả trước...",
  },
  {
    question: "Debt-to-Equity (D/E) ratio = 3.0 có nghĩa là:",
    options: [
      "Công ty có 3 đồng vốn chủ cho mỗi đồng nợ",
      "Công ty có 3 đồng nợ cho mỗi đồng vốn chủ sở hữu",
      "Tổng nợ là 300% doanh thu",
      "Công ty đang lỗ 3 năm liên tiếp",
    ],
    correct: 1,
    explanation: "D/E = Total Debt / Equity. D/E = 3.0 nghĩa là cứ 1 đồng vốn chủ có 3 đồng nợ — đòn bẩy cao, rủi ro cao nhưng ROE có thể được khuếch đại.",
  },
  {
    question: "Goodwill trên bảng cân đối kế toán phát sinh khi nào?",
    options: [
      "Khi thương hiệu công ty trở nên nổi tiếng",
      "Khi một công ty được mua lại với giá cao hơn giá trị tài sản thuần",
      "Khi cổ phiếu tăng giá trên thị trường",
      "Khi doanh nghiệp đạt lợi nhuận cao",
    ],
    correct: 1,
    explanation: "Goodwill = Giá mua (M&A) − Giá trị tài sản thuần. Phản ánh premium trả cho thương hiệu, khách hàng, nhân tài... Goodwill phải kiểm tra impairment hàng năm.",
  },
  {
    question: "Công ty có Current Ratio = 0.6. Điều này cho thấy điều gì?",
    options: [
      "Rất tốt — tài sản ngắn hạn gấp đôi nợ ngắn hạn",
      "Rủi ro thanh khoản — nợ ngắn hạn nhiều hơn tài sản ngắn hạn có thể thanh lý",
      "Công ty đang trong giai đoạn tăng trưởng cao",
      "Current Ratio không phản ánh sức khỏe tài chính",
    ],
    correct: 1,
    explanation: "Current Ratio = Current Assets / Current Liabilities. < 1.0 có nghĩa là nợ ngắn hạn nhiều hơn tài sản ngắn hạn — tiềm ẩn rủi ro không trả được nợ đến hạn.",
  },
];

export default function BalanceSheetPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-8 text-stone-700 leading-relaxed">

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">Bảng cân đối kế toán là gì?</h2>
          <p>Nếu P&L (báo cáo kết quả kinh doanh) là bức ảnh ghi lại <em>những gì xảy ra trong một khoảng thời gian</em>, thì bảng cân đối kế toán (Balance Sheet) là <strong>ảnh chụp nhanh tại một thời điểm</strong> — cho thấy doanh nghiệp đang có gì và nguồn vốn đến từ đâu.</p>
          <p>Phương trình nền tảng: <strong>Tài sản = Nợ phải trả + Vốn chủ sở hữu</strong>. Phương trình này luôn phải cân bằng — đó là lý do gọi là "cân đối".</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">3 phần của Balance Sheet</h2>
          <div className="space-y-3">
            {[
              { title: "Tài sản (Assets)", sub: "Doanh nghiệp đang có gì?",
                items: ["Current Assets: tiền mặt, phải thu, tồn kho (≤ 12 tháng)", "Non-current Assets: PP&E, intangibles, goodwill, đầu tư dài hạn"] },
              { title: "Nợ phải trả (Liabilities)", sub: "Doanh nghiệp nợ ai?",
                items: ["Current Liabilities: phải trả NCC, vay ngắn hạn, doanh thu chưa thực hiện", "Non-current Liabilities: vay dài hạn, trái phiếu, nghĩa vụ hưu trí"] },
              { title: "Vốn chủ sở hữu (Equity)", sub: "Phần còn lại thuộc về cổ đông",
                items: ["Vốn góp (paid-in capital): cổ phần phát hành", "Lợi nhuận giữ lại (retained earnings): lãi tích lũy qua các năm"] },
            ].map(s => (
              <div key={s.title} className="border border-stone-200 rounded-xl p-4">
                <div className="font-bold text-sm text-stone-800 mb-0.5">{s.title}</div>
                <div className="text-xs text-stone-500 mb-2">{s.sub}</div>
                {s.items.map(t => <div key={t} className="text-xs text-stone-600 flex gap-2 mt-1"><span>—</span><span>{t}</span></div>)}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">Bảng Cân Đối — minh họa</h2>
          <div className="border border-stone-200 rounded-xl p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">TÀI SẢN</div>
                {[
                  { label: "Tiền mặt", val: "50 tỷ" },
                  { label: "Phải thu", val: "80 tỷ" },
                  { label: "Tồn kho", val: "60 tỷ" },
                  { label: "PP&E", val: "200 tỷ" },
                ].map(r => (
                  <div key={r.label} className="flex justify-between text-sm">
                    <span className="text-stone-600">{r.label}</span>
                    <span className="text-stone-800 font-medium">{r.val}</span>
                  </div>
                ))}
                <div className="border-t border-stone-200 pt-2 flex justify-between text-sm font-bold">
                  <span className="text-stone-700">Tổng tài sản</span>
                  <span className="text-stone-900">390 tỷ</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-bold text-stone-500 uppercase tracking-widest">NGUỒN VỐN</div>
                {[
                  { label: "Nợ phải trả", val: "150 tỷ" },
                  { label: "Vốn chủ sở hữu", val: "240 tỷ" },
                ].map(r => (
                  <div key={r.label} className="flex justify-between text-sm">
                    <span className="text-stone-600">{r.label}</span>
                    <span className="text-stone-800 font-medium">{r.val}</span>
                  </div>
                ))}
                <div className="border-t border-stone-200 pt-2 flex justify-between text-sm font-bold">
                  <span className="text-stone-700">Tổng nguồn vốn</span>
                  <span className="text-stone-900">390 tỷ</span>
                </div>
              </div>
            </div>
            <div className="border-t border-stone-200 pt-3 text-sm text-stone-600 text-center">
              Tài sản = Nợ + Vốn chủ → 390 tỷ = 150 tỷ + 240 tỷ
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">3 câu hỏi quan trọng khi đọc Balance Sheet</h2>
          <div className="space-y-3">
            {[
              { q: "Doanh nghiệp có đủ thanh khoản không?", metric: "Current Ratio = Current Assets / Current Liabilities", good: "> 1.5 = an toàn", bad: "< 1.0 = cảnh báo" },
              { q: "Đòn bẩy tài chính ở mức nào?", metric: "Debt/Equity = Total Debt / Equity", good: "D/E < 1.0 thường an toàn", bad: "D/E > 2.0 = high leverage" },
              { q: "Chất lượng tài sản có tốt không?", metric: "Kiểm tra: Goodwill/Assets, Intangibles, Bad debt provisions", good: "Tài sản hữu hình chiếm phần lớn", bad: "Goodwill quá lớn = rủi ro impairment" },
            ].map(r => (
              <div key={r.q} className="border border-stone-200 rounded-xl p-4">
                <div className="font-bold text-stone-800 text-sm mb-2">{r.q}</div>
                <div className="font-mono text-xs bg-stone-50 rounded-lg px-3 py-2 text-stone-600 mb-2">{r.metric}</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="border border-stone-200 rounded-lg p-2 text-stone-700">Tốt: {r.good}</div>
                  <div className="border border-stone-200 rounded-lg p-2 text-stone-700">Cảnh báo: {r.bad}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">Case study: Masan Group</h2>
          <p>Masan là holding company với portfolio đa dạng (Masan Consumer, WinCommerce, Masan MEATLife). Balance Sheet của họ minh hoạ rõ cách một tập đoàn sử dụng đòn bẩy để mở rộng nhanh.</p>
          <div className="bg-stone-900 rounded-2xl p-5 text-sm space-y-2">
            {[
              { label: "Tổng tài sản", val: "~120,000 tỷ" },
              { label: "Nợ phải trả", val: "~80,000 tỷ (D/E ~2.0x)" },
              { label: "Vốn chủ sở hữu", val: "~40,000 tỷ" },
              { label: "Goodwill / Intangibles", val: "~30,000 tỷ (từ M&A)" },
            ].map(r => (
              <div key={r.label} className="flex justify-between py-1.5 border-b border-stone-800 last:border-0">
                <span className="text-stone-500">{r.label}</span>
                <span className="text-white font-semibold">{r.val}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-stone-500">Goodwill lớn phản ánh premium trả trong các thương vụ M&A. Đây là điểm cần theo dõi — nếu thương vụ không thành công như kỳ vọng, goodwill impairment có thể làm P&L xấu đột ngột.</p>
        </section>

        <div className="border-l-2 border-stone-300 pl-4 space-y-2">
          <h3 className="font-bold text-stone-800 mb-3">3 điều cần nhớ</h3>
          <div className="space-y-1 text-sm text-stone-700">
            <div>— Assets = Liabilities + Equity — luôn luôn cân bằng</div>
            <div>— Current Ratio &gt; 1.5 và D/E &lt; 2.0 là ngưỡng cơ bản để đánh giá sức khỏe</div>
            <div>— Goodwill lớn = cần kiểm tra kỹ lịch sử M&A và impairment risk</div>
          </div>
        </div>
      </div>
    </LessonPageLayout>
  );
}
