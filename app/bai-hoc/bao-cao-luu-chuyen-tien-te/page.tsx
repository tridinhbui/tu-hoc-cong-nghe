"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 6, day: 6, accent: "cyan",
  title: "Báo Cáo Lưu Chuyển Tiền Tệ",
  subtitle: "Profit is opinion. Cash is fact.",
  duration: "8 phút", difficulty: "Trung bình", emoji: "💧",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Theo phương pháp gián tiếp, điểm xuất phát để tính OCF là:",
    options: ["Doanh thu", "Net Income (lợi nhuận ròng)", "Tiền mặt đầu kỳ", "EBITDA"],
    correct: 1,
    explanation: "Phương pháp gián tiếp: bắt đầu từ Net Income → cộng lại D&A (phi tiền mặt) → điều chỉnh thay đổi working capital → ra OCF. Đây là phương pháp 95% doanh nghiệp sử dụng.",
  },
  {
    question: "Tại sao D&A được cộng ngược lại khi tính OCF từ Net Income?",
    options: [
      "Vì D&A là thu nhập, không phải chi phí",
      "Vì D&A giảm Net Income nhưng không dùng tiền mặt thực — phải cộng lại để phản ánh đúng dòng tiền",
      "Vì D&A chỉ là bút toán kế toán không có thực",
      "Để bù đắp cho CapEx đã chi",
    ],
    correct: 1,
    explanation: "D&A làm giảm Net Income (chi phí trên P&L) nhưng không có dòng tiền mặt ra khỏi công ty. Khi đi từ NI xuống OCF, phải cộng lại D&A để phản ánh đúng tiền mặt thực tế.",
  },
  {
    question: "Phải thu (Accounts Receivable) tăng 50 tỷ trong kỳ → ảnh hưởng đến OCF như thế nào?",
    options: [
      "+50 tỷ vào OCF — phải thu tăng là tốt",
      "−50 tỷ vào OCF — doanh thu ghi nhận nhưng tiền chưa về, dùng tiền mặt để tài trợ",
      "Không ảnh hưởng đến OCF",
      "+25 tỷ vào OCF — chỉ tính một nửa",
    ],
    correct: 1,
    explanation: "Phải thu tăng nghĩa là bán hàng nhưng chưa thu tiền → tiền mặt chưa về → OCF giảm. Ngược lại, phải thu giảm (thu được tiền từ kỳ trước) → OCF tăng.",
  },
  {
    question: "Công ty có NI = 100 tỷ nhưng OCF = −20 tỷ. Điều này báo hiệu gì?",
    options: [
      "Công ty đang hoạt động tốt, không cần lo",
      "Red flag: lợi nhuận ghi nhận nhưng tiền không về — phải thu/tồn kho đang 'nuốt' tiền, hoặc có vấn đề kế toán",
      "Công ty đang đầu tư CapEx lớn",
      "OCF âm là bình thường trong giai đoạn tăng trưởng",
    ],
    correct: 1,
    explanation: "OCF âm khi NI dương là cờ đỏ (red flag). Tiền lợi nhuận bị kẹt trong phải thu, tồn kho, hoặc có thể có vấn đề về nhận dạng doanh thu. Nhà phân tích sẽ đào sâu vào working capital movements.",
  },
  {
    question: "Financing Cash Flow (CFF) âm thường có nghĩa là gì?",
    options: [
      "Công ty đang thua lỗ và mất tiền",
      "Công ty đang trả nợ, mua lại cổ phiếu, hoặc trả cổ tức — thường là dấu hiệu tích cực của doanh nghiệp trưởng thành",
      "Công ty không thể huy động vốn",
      "Công ty đang phá sản",
    ],
    correct: 1,
    explanation: "CFF âm nghĩa là tiền ra để trả nợ, buyback, hoặc cổ tức. Với doanh nghiệp cash-generative trưởng thành (Vinamilk, Apple...), CFF âm là dấu hiệu tốt — họ trả lại tiền cho cổ đông thay vì cần vay thêm.",
  },
];

const cashflowSections = [
  {
    key: "ocf",
    title: "Operating Cash Flow (OCF)",
    desc: "Tiền từ hoạt động kinh doanh cốt lõi. Đây là phần quan trọng nhất — thể hiện khả năng tự tạo ra tiền của doanh nghiệp.",
    items: [
      { label: "Tiền thu từ khách hàng", val: "+350 tỷ" },
      { label: "Tiền trả nhà cung cấp", val: "−180 tỷ" },
      { label: "Tiền trả lương nhân viên", val: "−80 tỷ" },
      { label: "Thuế TNDN đã nộp", val: "−25 tỷ" },
      { label: "D&A cộng ngược lại", val: "+30 tỷ" },
    ],
    total: "+95 tỷ",
    signalGood: "OCF dương, tăng trưởng → kinh doanh lành mạnh",
    signalBad: "OCF âm liên tục → đốt tiền không bền vững",
  },
  {
    key: "cfi",
    title: "Investing Cash Flow (CFI)",
    desc: "Tiền dùng để mua/bán tài sản dài hạn. Thường âm ở doanh nghiệp tăng trưởng — đây là điều bình thường và cần thiết.",
    items: [
      { label: "Mua tài sản cố định (CapEx)", val: "−120 tỷ" },
      { label: "Mua công ty con (M&A)", val: "−50 tỷ" },
      { label: "Bán tài sản thanh lý", val: "+15 tỷ" },
      { label: "Mua chứng khoán đầu tư", val: "−30 tỷ" },
    ],
    total: "−185 tỷ",
    signalGood: "CFI âm = đang đầu tư mở rộng — bình thường khi OCF đủ tài trợ",
    signalBad: "CFI dương bất thường = bán tài sản để bù thiếu hụt — cảnh báo",
  },
  {
    key: "cff",
    title: "Financing Cash Flow (CFF)",
    desc: "Tiền liên quan đến nguồn vốn: vay nợ, phát hành cổ phần, trả cổ tức, buyback.",
    items: [
      { label: "Vay dài hạn từ ngân hàng", val: "+200 tỷ" },
      { label: "Trả nợ gốc đến hạn", val: "−80 tỷ" },
      { label: "Trả cổ tức cổ đông", val: "−50 tỷ" },
      { label: "Mua lại cổ phiếu quỹ", val: "−20 tỷ" },
    ],
    total: "+50 tỷ",
    signalGood: "CFF âm (trả nợ + cổ tức) = doanh nghiệp trưởng thành, cash-generative",
    signalBad: "CFF dương vì vay liên tục = cần kiểm tra OCF có đủ trả nợ không",
  },
];

export default function BaoLuuChuyenPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-8 text-stone-700 leading-relaxed">

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">&ldquo;Profit is opinion. Cash is fact.&rdquo;</h2>
          <p>Câu nói này tóm gọn tất cả lý do tại sao Báo cáo Lưu chuyển Tiền tệ (BCLCTT) tồn tại. Lợi nhuận trên P&L có thể bị điều chỉnh bởi vô số chính sách kế toán — phương pháp ghi nhận doanh thu, tỷ lệ khấu hao, dự phòng nợ xấu... Tiền mặt trong tài khoản ngân hàng thì không.</p>
          <p>BCLCTT trả lời câu hỏi đơn giản nhưng quan trọng nhất: <strong>tiền đã đi đâu trong kỳ này?</strong></p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">Tại sao lợi nhuận ≠ Tiền mặt?</h2>
          <p>Bài 1 đã đề cập vấn đề này. Trong BCLCTT, chúng ta đi sâu hơn vào cơ chế "hoà giải" (reconciliation) giữa Net Income và OCF theo phương pháp gián tiếp:</p>
          <div className="space-y-2 font-mono text-sm">
            {[
              { step: "Bắt đầu từ Net Income", note: "" },
              { step: "+ Cộng lại D&A", note: "Khấu hao làm giảm NI nhưng không dùng tiền" },
              { step: "± Thay đổi Working Capital", note: "AR↑ = tiền chưa về (âm). AP↑ = chưa trả (dương). Inv↑ = đã mua hàng (âm)" },
              { step: "= Operating Cash Flow", note: "Tiền mặt thực tế từ kinh doanh" },
            ].map(r => (
              <div key={r.step} className="pl-4 border-l-2 border-stone-200 text-stone-700">
                <div>{r.step}</div>
                {r.note && <div className="text-xs text-stone-400 font-sans">{r.note}</div>}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">Từ Net Income → Operating Cash Flow — ví dụ</h2>
          <div className="bg-stone-900 rounded-2xl p-4 space-y-1.5">
            <div className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">Phương pháp gián tiếp (ví dụ minh họa)</div>
            {[
              { label: "Net Income", val: "+100 tỷ" },
              { label: "+ Khấu hao D&A (phi tiền mặt)", val: "+30 tỷ" },
              { label: "± Thay đổi Phải thu (AR)", val: "−40 tỷ" },
              { label: "± Thay đổi Phải trả (AP)", val: "+20 tỷ" },
              { label: "± Thay đổi Tồn kho", val: "−15 tỷ" },
            ].map(r => (
              <div key={r.label} className="flex justify-between items-center text-sm">
                <span className="text-stone-400 text-xs">{r.label}</span>
                <span className="font-bold text-sm text-stone-300">{r.val}</span>
              </div>
            ))}
            <div className="border-t border-stone-700 pt-2 flex justify-between items-center">
              <span className="text-white font-bold text-sm">= OCF</span>
              <span className="font-bold text-xl text-stone-200">+95 tỷ</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">3 phần của Báo cáo LCTT</h2>
          {cashflowSections.map(sec => (
            <div key={sec.key} className="border border-stone-200 rounded-xl p-5 space-y-4">
              <div>
                <div className="font-bold text-base text-stone-800">{sec.title}</div>
                <p className="text-sm text-stone-600 mt-1">{sec.desc}</p>
              </div>
              <div className="space-y-2">
                {sec.items.map(item => (
                  <div key={item.label} className="flex justify-between items-center bg-stone-50 rounded-xl px-3 py-2.5">
                    <span className="text-stone-600 text-xs">{item.label}</span>
                    <span className="font-bold text-sm text-stone-700">{item.val}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center rounded-xl px-3 py-2.5 font-bold border border-stone-200 bg-stone-50">
                  <span className="text-stone-700">= Tổng</span>
                  <span className="text-stone-800">{sec.total}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="border-l-2 border-stone-300 pl-3 text-xs text-stone-600">Tốt: {sec.signalGood}</div>
                <div className="border-l-2 border-stone-300 pl-3 text-xs text-stone-600">Cảnh báo: {sec.signalBad}</div>
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">OCF/NI Ratio — Đo chất lượng lợi nhuận</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { range: "OCF/NI > 1.2", tag: "Xuất sắc", desc: "Tiền về nhanh hơn ghi nhận — thường thấy ở SaaS, FMCG" },
              { range: "OCF/NI 0.8–1.2", tag: "Bình thường", desc: "Phần lớn lợi nhuận chuyển được thành tiền" },
              { range: "OCF/NI < 0.5", tag: "Cảnh báo", desc: "Tiền kẹt trong working capital hoặc có vấn đề kế toán" },
            ].map(r => (
              <div key={r.range} className="border border-stone-200 rounded-xl p-4">
                <div className="font-mono text-xs font-bold text-stone-800 mb-1">{r.range}</div>
                <div className="font-semibold text-sm text-stone-700 mb-1">{r.tag}</div>
                <p className="text-xs text-stone-500">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">Vinamilk — Đọc BCLCTT thực tế</h2>
          <div className="bg-stone-900 rounded-2xl p-5 text-sm space-y-3">
            <div className="text-stone-400 text-xs font-bold uppercase tracking-widest">Vinamilk (VNM) — BCLCTT 2023 (ước lượng minh họa)</div>
            {[
              { label: "OCF", val: "+3,200 tỷ", note: "Kinh doanh lành mạnh, tiền về đều đặn" },
              { label: "CFI", val: "−1,800 tỷ", note: "Đầu tư mở rộng sản xuất" },
              { label: "CFF", val: "−1,500 tỷ", note: "Trả cổ tức cao (~1,200 tỷ) + giảm nợ" },
              { label: "= Net Cash Change", val: "−100 tỷ", note: "Tiền mặt giảm nhẹ nhưng kinh doanh ổn" },
            ].map(r => (
              <div key={r.label} className="border-b border-stone-800 pb-3 last:border-0">
                <div className="flex justify-between">
                  <span className="text-stone-400">{r.label}</span>
                  <span className="font-bold text-white">{r.val}</span>
                </div>
                <div className="text-stone-500 text-xs mt-0.5">{r.note}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-stone-500">OCF/NI ≈ 1.2x → chất lượng lợi nhuận tốt. CFF âm vì Vinamilk trả cổ tức cao — dấu hiệu doanh nghiệp trưởng thành, không cần vay thêm để hoạt động.</p>
        </section>

        <div className="border-l-2 border-stone-300 pl-4 space-y-2">
          <h3 className="font-bold text-stone-800 mb-3">3 điều cần nhớ</h3>
          <div className="space-y-1 text-sm text-stone-700">
            <div>— BCLCTT = OCF + CFI + CFF = Thay đổi tiền mặt trong kỳ</div>
            <div>— OCF/NI &gt; 1.0 = chất lượng lợi nhuận tốt. OCF âm khi NI dương = red flag</div>
            <div>— Profit is opinion, cash is fact — BCLCTT khó làm giả hơn P&L</div>
          </div>
        </div>
      </div>
    </LessonPageLayout>
  );
}
