"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 6, day: 6, accent: "cyan",
  title: "Báo Cáo Lưu Chuyển Tiền Tệ",
  subtitle: "Lợi nhuận có thể là ước tính, tiền mặt mới là thứ doanh nghiệp thật sự có",
  duration: "8 phút", difficulty: "Trung bình", emoji: "💧",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Theo phương pháp gián tiếp, điểm xuất phát để tính dòng tiền kinh doanh là:",
    options: ["Doanh thu", "Lợi nhuận ròng", "Tiền mặt đầu kỳ", "EBITDA"],
    correct: 1,
    explanation: "Dòng tiền kinh doanh, viết tắt là OCF, bắt đầu từ lợi nhuận ròng rồi điều chỉnh các khoản không dùng tiền mặt và vốn lưu động. Đây là cách phần lớn doanh nghiệp trình bày.",
  },
  {
    question: "Tại sao khấu hao được cộng ngược lại khi tính dòng tiền kinh doanh từ lợi nhuận ròng?",
    options: [
      "Vì khấu hao là thu nhập, không phải chi phí",
      "Vì khấu hao làm giảm lợi nhuận nhưng không làm tiền mặt chảy ra trong kỳ",
      "Vì khấu hao chỉ là bút toán kế toán nên luôn bỏ qua",
      "Để bù đắp cho tiền đầu tư tài sản cố định đã chi",
    ],
    correct: 1,
    explanation: "D&A là khấu hao và phân bổ, tức chi phí kế toán không làm tiền mặt chảy ra ngay trong kỳ. Vì vậy khi đi từ lợi nhuận ròng sang dòng tiền kinh doanh, ta cộng lại khoản này.",
  },
  {
    question: "Phải thu khách hàng tăng 50 tỷ trong kỳ → ảnh hưởng đến dòng tiền kinh doanh như thế nào?",
    options: [
      "+50 tỷ vào dòng tiền kinh doanh - phải thu tăng là tốt",
      "−50 tỷ vào dòng tiền kinh doanh - doanh thu đã ghi nhận nhưng tiền chưa về",
      "Không ảnh hưởng đến dòng tiền kinh doanh",
      "+25 tỷ vào dòng tiền kinh doanh - chỉ tính một nửa",
    ],
    correct: 1,
    explanation: "Phải thu tăng nghĩa là doanh nghiệp đã ghi doanh thu nhưng chưa thu tiền. Vì tiền mặt chưa về, dòng tiền kinh doanh giảm.",
  },
  {
    question: "Công ty có lợi nhuận ròng 100 tỷ nhưng dòng tiền kinh doanh âm 20 tỷ. Điều này báo hiệu gì?",
    options: [
      "Công ty đang hoạt động tốt, không cần lo",
      "Cờ đỏ: lợi nhuận ghi nhận nhưng tiền không về - phải thu/tồn kho đang 'nuốt' tiền, hoặc có vấn đề kế toán",
      "Công ty đang đầu tư CapEx lớn",
      "Dòng tiền kinh doanh âm luôn bình thường trong giai đoạn tăng trưởng",
    ],
    correct: 1,
    explanation: "Dòng tiền kinh doanh âm trong khi lợi nhuận dương là cờ đỏ. Tiền có thể bị kẹt trong phải thu, tồn kho, hoặc cách ghi nhận doanh thu cần được kiểm tra kỹ hơn.",
  },
  {
    question: "Dòng tiền tài chính âm thường có nghĩa là gì?",
    options: [
      "Công ty đang thua lỗ và mất tiền",
      "Công ty đang trả nợ, mua lại cổ phiếu, hoặc trả cổ tức - thường là dấu hiệu tích cực của doanh nghiệp trưởng thành",
      "Công ty không thể huy động vốn",
      "Công ty đang phá sản",
    ],
    correct: 1,
    explanation: "Dòng tiền tài chính, viết tắt là CFF, ghi tiền liên quan đến vay nợ, phát hành cổ phần, cổ tức và mua lại cổ phiếu. CFF âm thường nghĩa là doanh nghiệp đang trả nợ hoặc trả tiền cho cổ đông.",
  },
];

const cashflowSections = [
  {
    key: "ocf",
    title: "Dòng tiền kinh doanh (OCF)",
    desc: "Tiền từ hoạt động kinh doanh cốt lõi. Đây là phần quan trọng nhất - thể hiện khả năng tự tạo ra tiền của doanh nghiệp.",
    items: [
      { label: "Tiền thu từ khách hàng", val: "+350 tỷ" },
      { label: "Tiền trả nhà cung cấp", val: "−180 tỷ" },
      { label: "Tiền trả lương nhân viên", val: "−80 tỷ" },
      { label: "Thuế TNDN đã nộp", val: "−25 tỷ" },
      { label: "Khấu hao cộng ngược lại", val: "+30 tỷ" },
    ],
    total: "+95 tỷ",
    signalGood: "Dòng tiền kinh doanh dương, tăng trưởng → kinh doanh lành mạnh",
    signalBad: "Dòng tiền kinh doanh âm liên tục → đốt tiền không bền vững",
  },
  {
    key: "cfi",
    title: "Dòng tiền đầu tư (CFI)",
    desc: "Tiền dùng để mua/bán tài sản dài hạn. Thường âm ở doanh nghiệp tăng trưởng - đây là điều bình thường và cần thiết.",
    items: [
      { label: "Mua tài sản cố định (CapEx)", val: "−120 tỷ" },
      { label: "Mua công ty con (M&A)", val: "−50 tỷ" },
      { label: "Bán tài sản thanh lý", val: "+15 tỷ" },
      { label: "Mua chứng khoán đầu tư", val: "−30 tỷ" },
    ],
    total: "−185 tỷ",
    signalGood: "Dòng tiền đầu tư âm = đang đầu tư mở rộng - bình thường nếu dòng tiền kinh doanh đủ tài trợ",
    signalBad: "Dòng tiền đầu tư dương bất thường = bán tài sản để bù thiếu hụt - cảnh báo",
  },
  {
    key: "cff",
    title: "Dòng tiền tài chính (CFF)",
    desc: "Tiền liên quan đến nguồn vốn: vay nợ, phát hành cổ phần, trả cổ tức, mua lại cổ phiếu.",
    items: [
      { label: "Vay dài hạn từ ngân hàng", val: "+200 tỷ" },
      { label: "Trả nợ gốc đến hạn", val: "−80 tỷ" },
      { label: "Trả cổ tức cổ đông", val: "−50 tỷ" },
      { label: "Mua lại cổ phiếu quỹ", val: "−20 tỷ" },
    ],
    total: "+50 tỷ",
    signalGood: "Dòng tiền tài chính âm do trả nợ và cổ tức = doanh nghiệp trưởng thành, tự tạo tiền tốt",
    signalBad: "Dòng tiền tài chính dương vì vay liên tục = cần kiểm tra dòng tiền kinh doanh có đủ trả nợ không",
  },
];

export default function BaoLuuChuyenPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-8 text-stone-700 dark:text-stone-300 leading-relaxed">

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">Lợi nhuận là câu chuyện kế toán, tiền mặt là sức khỏe thật</h2>
          <p>Câu này tóm gọn lý do Báo cáo Lưu chuyển Tiền tệ tồn tại. Lợi nhuận trên báo cáo lãi lỗ có thể bị ảnh hưởng bởi chính sách kế toán như ghi nhận doanh thu, khấu hao, dự phòng nợ xấu. Tiền mặt trong tài khoản thì khó “trang điểm” hơn.</p>
          <p>BCLCTT trả lời câu hỏi đơn giản nhưng quan trọng nhất: <strong>tiền đã đi đâu trong kỳ này?</strong></p>
          <div className="rounded-xl border border-cyan-200 dark:border-cyan-900/60 bg-cyan-50 dark:bg-cyan-950/40 p-4">
            <h3 className="text-sm font-bold uppercase tracking-wide text-cyan-800 dark:text-cyan-300 mb-2">Hiểu nhanh</h3>
            <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-200">
              OCF là dòng tiền kinh doanh, CFI là dòng tiền đầu tư, CFF là dòng tiền tài chính. Ba phần này cộng lại cho biết tiền mặt của doanh nghiệp tăng hay giảm trong kỳ.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">Tại sao lợi nhuận ≠ Tiền mặt?</h2>
          <p>Bài 1 đã đề cập vấn đề này. Trong BCLCTT, chúng ta đi sâu hơn vào cơ chế đối chiếu giữa lợi nhuận ròng và dòng tiền kinh doanh theo phương pháp gián tiếp:</p>
          <div className="space-y-2 font-mono text-sm">
            {[
              { step: "Bắt đầu từ lợi nhuận ròng", note: "" },
              { step: "+ Cộng lại khấu hao", note: "Khấu hao làm giảm lợi nhuận nhưng không dùng tiền trong kỳ" },
              { step: "± Thay đổi vốn lưu động", note: "Phải thu tăng = tiền chưa về. Phải trả tăng = chưa trả tiền. Tồn kho tăng = tiền đã nằm trong hàng." },
              { step: "= Dòng tiền kinh doanh", note: "Tiền mặt thực tế từ hoạt động kinh doanh" },
            ].map(r => (
              <div key={r.step} className="pl-4 border-l-2 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200">
                <div>{r.step}</div>
                {r.note && <div className="text-xs text-stone-500 dark:text-stone-400 font-sans">{r.note}</div>}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">Từ lợi nhuận ròng đến dòng tiền kinh doanh - ví dụ</h2>
          <div className="bg-stone-900 dark:bg-stone-900 border border-stone-800 rounded-2xl p-4 space-y-1.5">
            <div className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">Phương pháp gián tiếp (ví dụ minh họa)</div>
            {[
              { label: "Lợi nhuận ròng", val: "+100 tỷ" },
              { label: "+ Khấu hao (không dùng tiền mặt)", val: "+30 tỷ" },
              { label: "± Thay đổi phải thu", val: "−40 tỷ" },
              { label: "± Thay đổi phải trả", val: "+20 tỷ" },
              { label: "± Thay đổi Tồn kho", val: "−15 tỷ" },
            ].map(r => (
              <div key={r.label} className="flex justify-between items-center text-sm">
                <span className="text-stone-400 text-xs">{r.label}</span>
                <span className="font-bold text-sm text-stone-200">{r.val}</span>
              </div>
            ))}
            <div className="border-t border-stone-700 pt-2 flex justify-between items-center">
              <span className="text-white font-bold text-sm">= Dòng tiền kinh doanh</span>
              <span className="font-bold text-xl text-emerald-400">+95 tỷ</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">3 phần của Báo cáo lưu chuyển tiền tệ</h2>
          {cashflowSections.map(sec => (
            <div key={sec.key} className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 rounded-xl p-5 space-y-4">
              <div>
                <div className="font-bold text-base text-stone-800 dark:text-stone-100">{sec.title}</div>
                <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">{sec.desc}</p>
              </div>
              <div className="space-y-2">
                {sec.items.map(item => (
                  <div key={item.label} className="flex justify-between items-center bg-stone-50 dark:bg-stone-950 rounded-xl px-3 py-2.5">
                    <span className="text-stone-600 dark:text-stone-400 text-xs">{item.label}</span>
                    <span className="font-bold text-sm text-stone-800 dark:text-stone-200">{item.val}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center rounded-xl px-3 py-2.5 font-bold border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-800">
                  <span className="text-stone-700 dark:text-stone-300">= Tổng</span>
                  <span className="text-stone-900 dark:text-stone-100">{sec.total}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="border-l-2 border-emerald-500 pl-3 text-xs text-stone-600 dark:text-stone-300">Tốt: {sec.signalGood}</div>
                <div className="border-l-2 border-amber-500 pl-3 text-xs text-stone-600 dark:text-stone-300">Cảnh báo: {sec.signalBad}</div>
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">Tỷ lệ dòng tiền kinh doanh / lợi nhuận ròng</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { range: "Trên 1.2 lần", tag: "Xuất sắc", desc: "Tiền về nhanh hơn lợi nhuận ghi nhận" },
              { range: "0.8-1.2 lần", tag: "Bình thường", desc: "Phần lớn lợi nhuận chuyển được thành tiền" },
              { range: "Dưới 0.5 lần", tag: "Cảnh báo", desc: "Tiền kẹt trong vốn lưu động hoặc có vấn đề kế toán" },
            ].map(r => (
              <div key={r.range} className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 rounded-xl p-4">
                <div className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">{r.range}</div>
                <div className="font-semibold text-sm text-stone-800 dark:text-stone-100 mb-1">{r.tag}</div>
                <p className="text-xs text-stone-500 dark:text-stone-400">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">Vinamilk - Đọc BCLCTT thực tế</h2>
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 text-sm space-y-3">
            <div className="text-amber-400 text-xs font-bold uppercase tracking-widest">Vinamilk (VNM) - BCLCTT 2023 (ước lượng minh họa)</div>
            {[
              { label: "Dòng tiền kinh doanh", val: "+3,200 tỷ", note: "Kinh doanh lành mạnh, tiền về đều đặn" },
              { label: "Dòng tiền đầu tư", val: "−1,800 tỷ", note: "Đầu tư mở rộng sản xuất" },
              { label: "Dòng tiền tài chính", val: "−1,500 tỷ", note: "Trả cổ tức cao (~1,200 tỷ) + giảm nợ" },
              { label: "= Thay đổi tiền mặt ròng", val: "−100 tỷ", note: "Tiền mặt giảm nhẹ nhưng kinh doanh ổn" },
            ].map(r => (
              <div key={r.label} className="border-b border-stone-800 pb-3 last:border-0">
                <div className="flex justify-between">
                  <span className="text-stone-400">{r.label}</span>
                  <span className="font-bold text-white">{r.val}</span>
                </div>
                <div className="text-stone-400 text-xs mt-0.5">{r.note}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400">Dòng tiền kinh doanh / lợi nhuận ròng khoảng 1.2 lần → chất lượng lợi nhuận tốt. Dòng tiền tài chính âm vì Vinamilk trả cổ tức cao - dấu hiệu doanh nghiệp trưởng thành, không cần vay thêm để hoạt động.</p>
        </section>

        <div className="border-l-2 border-stone-300 dark:border-stone-700 pl-4 space-y-2">
          <h3 className="font-bold text-stone-800 dark:text-stone-200 mb-3">3 điều cần nhớ</h3>
          <div className="space-y-1 text-sm text-stone-700 dark:text-stone-300">
            <div> - BCLCTT = dòng tiền kinh doanh + dòng tiền đầu tư + dòng tiền tài chính = thay đổi tiền mặt trong kỳ</div>
            <div> - Dòng tiền kinh doanh cao hơn lợi nhuận ròng thường là dấu hiệu chất lượng lợi nhuận tốt</div>
            <div> - Lợi nhuận có thể đẹp trên giấy, nhưng dòng tiền mới cho biết doanh nghiệp có thật sự tạo tiền hay không</div>
          </div>
        </div>
      </div>
    </LessonPageLayout>
  );
}
