"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 42, day: 42, accent: "stone",
  title: "NVIDIA Q1/26 — Cash & Marketable Securities",
  subtitle: "Treasury vs FP&A: cùng một bảng, hai cách đọc hoàn toàn khác nhau",
  duration: "7 phút", difficulty: "Trung bình", emoji: "·",
  nextSlug: "fpt-cfo-cash", nextTitle: "CFO FPT và 8.500 tỷ tiền mặt",
};

const quiz: QuizQuestion[] = [
  {
    question: "Unrealized Gain nghĩa là gì?",
    options: ["Tài sản tăng giá nhưng chưa bán", "Tiền mặt tăng", "Doanh thu mới ghi nhận", "Khoản vay chưa sử dụng"],
    correct: 0,
    explanation: "Unrealized Gain = tài sản đang có giá trị cao hơn giá mua ban đầu, nhưng chưa được bán ra để chốt lời. Khoản lãi này tồn tại trên sổ sách nhưng chưa trở thành tiền mặt thực tế.",
  },
  {
    question: "Lock-up đáng chú ý vì sao?",
    options: ["Tài sản đang mất giá nhanh", "Tài sản có giá trị nhưng chưa thể bán ngay — ảnh hưởng đến thanh khoản thực tế", "Doanh thu bị trì hoãn ghi nhận", "Tiền mặt đang tăng lên"],
    correct: 1,
    explanation: "Lock-up là ràng buộc pháp lý hoặc hợp đồng ngăn công ty bán tài sản trong một khoảng thời gian nhất định. Điều này có nghĩa tài sản đó không thể chuyển thành tiền mặt ngay cả khi công ty cần — rủi ro thanh khoản thực sự.",
  },
  {
    question: "Tài sản thuộc Pricing Category Level 1 thường có nghĩa là gì?",
    options: ["Tài sản bị hạn chế bán trong vòng 1 năm", "Không có giá thị trường, phải ước tính", "Có giá thị trường trực tiếp và dễ quan sát — như cổ phiếu niêm yết", "Cần mô hình định giá phức tạp"],
    correct: 2,
    explanation: "Fair value hierarchy: Level 1 = quoted prices trong active markets (cổ phiếu giao dịch hàng ngày). Level 2 = observable inputs nhưng không trực tiếp (bond pricing dựa vào yield curve). Level 3 = unobservable inputs, dùng internal models.",
  },
  {
    question: "FP&A đọc bảng này chủ yếu để hiểu điều gì?",
    options: ["Quyết định giữ tiền ở ngân hàng nào", "Tác động đến forecast, earnings quality và câu chuyện tài chính cho management", "Số lượng tài khoản ngân hàng của công ty", "Chi phí vận hành quý tiếp theo"],
    correct: 1,
    explanation: "FP&A quan tâm đến forward-looking implications: nếu 94B Unrealized Gain này reverse, lợi nhuận quý sau sẽ ra sao? Đây là earnings quality question — lợi nhuận đến từ core business hay từ market fluctuation của tài sản tài chính?",
  },
  {
    question: "Nếu một khoản đầu tư có Unrealized Gain lớn, điều đó có nghĩa gì với cash flow?",
    options: ["Công ty đã thu được tiền mặt từ khoản này", "Công ty đã bán tài sản thành công", "Tài sản tăng giá nhưng chưa chắc tiền mặt đã tăng — chỉ realized khi bán", "Công ty ghi nhận thêm doanh thu"],
    correct: 2,
    explanation: "Unrealized ≠ Realized. Tiền mặt chỉ vào tay khi tài sản được bán. Đây là lý do khi đọc earnings, phải phân biệt operating income (từ business) và investment income (từ mark-to-market) — hai loại có quality rất khác nhau.",
  },
  {
    question: "Tại sao footnotes (1)(2)(3) trong bảng này quan trọng?",
    options: ["Chỉ để giải thích định nghĩa thuật ngữ kế toán", "Chỉ phục vụ kiểm toán viên", "Có thể chứa thông tin về lock-up, cấu trúc đặc biệt của tài sản — nơi insight thật sự thường nằm", "Không ảnh hưởng đến phân tích thực tế"],
    correct: 2,
    explanation: "Footnotes là nơi các điều kiện quan trọng được tiết lộ: lock-up periods, concentration risks, assumptions trong valuation, các ràng buộc về disposition. Nhiều analyst đọc footnotes trước khi đọc bảng chính.",
  },
  {
    question: "Từ góc nhìn FP&A, thấy Marketable Equity Securities tăng mạnh thì suy nghĩ nào hợp lý hơn?",
    options: ["Công ty chắc chắn bán được nhiều sản phẩm hơn", "Forecast và earnings tương lai có thể biến động hơn nếu giá tài sản thay đổi — mark-to-market risk", "Công ty cần tuyển thêm nhân sự ngay", "Chi phí vận hành sẽ tăng trong quý tới"],
    correct: 1,
    explanation: "Equity securities thường được mark-to-market qua P&L (FVTPL). Khi giá cổ phiếu thị trường biến động mạnh, income statement sẽ phản ánh unrealized gains/losses — tạo ra earnings volatility không liên quan đến core business. FP&A cần clean this up khi build forecast.",
  },
  {
    question: "Từ góc nhìn Treasury, câu hỏi nào hợp lý nhất khi đọc bảng này?",
    options: ["Tài sản này có giúp tăng EPS không?", "Tài sản này có thể chuyển thành tiền mặt nhanh nếu công ty cần — thanh khoản có đủ an toàn không?", "Tài sản này có giúp tăng doanh thu không?", "Tài sản này có giúp tăng thị phần không?"],
    correct: 1,
    explanation: "Treasury's primary concern: liquidity management. Bao nhiêu tài sản available for immediate use? Bao nhiêu bị lock-up? Có đủ để cover operating needs, potential M&A, và emergency situations không? Đây là risk management question, không phải return question.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">NVIDIA Q1/26 — Cash Equivalents and Marketable Securities</h2>
      <p className="text-stone-500 text-sm mb-8">Góc nhìn Treasury và FP&A từ cùng một bảng số liệu</p>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Bảng này cho thấy điều gì?</h3>
        <p className="text-stone-600 leading-relaxed mb-4">
          Trong báo cáo quý của NVIDIA, bảng <strong>Cash Equivalents and Marketable Securities</strong> cho thấy tiền của công ty đang nằm ở đâu — không phải tất cả đều giống nhau về thanh khoản và rủi ro.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Cash Equivalents", desc: "Gần như tiền mặt — có thể dùng ngay" },
            { label: "Marketable Debt Securities", desc: "Đầu tư vào trái phiếu — cần bán để lấy tiền" },
            { label: "Marketable Equity Securities", desc: "Cổ phiếu — biến động theo thị trường" },
            { label: "Lock-up Assets", desc: "Có giá trị nhưng chưa thể bán trong thời gian nhất định" },
          ].map(s => (
            <div key={s.label} className="border border-stone-200 rounded-xl p-4 bg-stone-50">
              <div className="font-semibold text-stone-800 text-sm mb-1">{s.label}</div>
              <div className="text-stone-500 text-xs">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Pricing Category — giá lấy từ đâu?</h3>
        <p className="text-stone-600 leading-relaxed mb-4">
          Cột Pricing Category cho biết công ty xác định giá trị tài sản theo cơ sở nào. Đây là <strong>fair value hierarchy</strong> theo chuẩn kế toán GAAP/IFRS.
        </p>
        <div className="space-y-3">
          {[
            { level: "Level 1", method: "Giá thị trường trực tiếp", example: "Cổ phiếu đang giao dịch trên sàn — giá lấy từ market mỗi ngày", reliable: "Đáng tin cậy nhất" },
            { level: "Level 2", method: "Dựa vào tài sản tương tự", example: "Trái phiếu — dùng yield curve và comparable bonds để ước tính", reliable: "Tin cậy, có thể kiểm chứng" },
            { level: "Level 3", method: "Mô hình nội bộ", example: "Tài sản không có thị trường — dùng assumptions của chính công ty", reliable: "Ít tin cậy nhất, chủ quan" },
          ].map(s => (
            <div key={s.level} className="border-l-4 border-stone-300 pl-4 py-2">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-bold text-stone-800 text-sm">{s.level}</span>
                <span className="text-xs text-stone-400">{s.reliable}</span>
              </div>
              <div className="text-stone-600 text-sm font-medium mb-0.5">{s.method}</div>
              <div className="text-stone-400 text-xs">{s.example}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Hai góc nhìn từ cùng một bảng</h3>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-stone-700 mb-3">Treasury — quản lý thanh khoản và nguồn vốn</h4>
            <p className="text-stone-600 text-sm leading-relaxed mb-3">
              Treasury đọc bảng này để trả lời một câu hỏi cốt lõi: <strong>công ty có đủ tiền dùng ngay không?</strong> Họ phân loại từng khoản theo khả năng chuyển đổi thành tiền mặt.
            </p>
            <div className="bg-stone-50 rounded-xl border border-stone-200 p-4 text-sm space-y-2">
              <div className="flex gap-3"><span className="text-stone-400 flex-shrink-0">—</span><span className="text-stone-600">Bao nhiêu tài sản có thể dùng ngay cho vận hành, đầu tư hoặc M&A?</span></div>
              <div className="flex gap-3"><span className="text-stone-400 flex-shrink-0">—</span><span className="text-stone-600">Bao nhiêu đang nằm trong trái phiếu, cần thời gian để bán?</span></div>
              <div className="flex gap-3"><span className="text-stone-400 flex-shrink-0">—</span><span className="text-stone-600">Bao nhiêu bị lock-up và không thể tiếp cận?</span></div>
              <div className="flex gap-3"><span className="text-stone-400 flex-shrink-0">—</span><span className="text-stone-600">Thanh khoản có đủ an toàn trong mọi kịch bản không?</span></div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-stone-700 mb-3">FP&A — forecast và câu chuyện tài chính</h4>
            <p className="text-stone-600 text-sm leading-relaxed mb-3">
              FP&A đọc cùng bảng đó nhưng hỏi về <strong>tác động tương lai</strong>: khoản này sẽ ảnh hưởng thế nào đến lợi nhuận quý sau? Lợi nhuận đến từ business hay từ tài sản tăng giá?
            </p>
            <div className="bg-stone-50 rounded-xl border border-stone-200 p-4 text-sm space-y-2">
              <div className="flex gap-3"><span className="text-stone-400 flex-shrink-0">—</span><span className="text-stone-600">Lợi nhuận này đến từ hoạt động kinh doanh hay từ tài sản tài chính tăng giá?</span></div>
              <div className="flex gap-3"><span className="text-stone-400 flex-shrink-0">—</span><span className="text-stone-600">Nếu thị trường giảm, earnings quý sau sẽ bị ảnh hưởng thế nào?</span></div>
              <div className="flex gap-3"><span className="text-stone-400 flex-shrink-0">—</span><span className="text-stone-600">Lock-up assets có nên tính vào available capital khi build forecast không?</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Ví dụ cụ thể từ NVIDIA</h3>
        <div className="space-y-4">
          <div className="border border-stone-200 rounded-xl p-5">
            <div className="font-semibold text-stone-800 mb-2 text-sm">94B Unrealized Gain</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs font-bold text-stone-500 uppercase mb-1">Treasury nói</div>
                <p className="text-stone-600">Khoản đầu tư đang tăng giá tốt. Nếu cần, có thể realize một phần để tăng liquidity.</p>
              </div>
              <div>
                <div className="text-xs font-bold text-stone-500 uppercase mb-1">FP&A nói</div>
                <p className="text-stone-600">Nếu thị trường đảo chiều, unrealized gain này có thể thành unrealized loss — earnings quý sau sẽ biến động đáng kể.</p>
              </div>
            </div>
          </div>
          <div className="border border-stone-200 rounded-xl p-5">
            <div className="font-semibold text-stone-800 mb-2 text-sm">27.4B Lock-up Investments</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs font-bold text-stone-500 uppercase mb-1">Treasury nói</div>
                <p className="text-stone-600">Đây là vấn đề thanh khoản. Không thể dùng số tiền này dù cấp bách.</p>
              </div>
              <div>
                <div className="text-xs font-bold text-stone-500 uppercase mb-1">FP&A nói</div>
                <p className="text-stone-600">Khi báo cáo available capital cho CEO/CFO, không được cộng khoản này vào — nó chưa phải tiền sẵn sàng sử dụng.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Cách đọc bảng này hiệu quả</h3>
        <div className="space-y-3 text-sm text-stone-600">
          <p><strong>Đọc từ trái sang phải</strong>, không phải từ trên xuống dưới: công ty giữ cái gì → giá mua bao nhiêu → tăng/giảm bao nhiêu → hiện đáng giá bao nhiêu.</p>
          <p><strong>Đọc dòng Total trước</strong> để thấy bức tranh lớn, sau đó mới quay lên xem phần nào chiếm tỷ trọng lớn nhất.</p>
          <p><strong>Không bỏ qua footnotes</strong> — các ký hiệu (1)(2)(3) thường dẫn đến thông tin về lock-up, ràng buộc pháp lý, hoặc cấu trúc tài sản đặc biệt.</p>
          <p>Khi thấy <strong>Unrealized Gain/Loss lớn</strong>, hỏi ngay: khoản này đã thành tiền mặt chưa? Nó đi qua P&L hay OCI?</p>
          <p>Khi thấy <strong>Equity Securities lớn</strong>, hỏi: đây là đầu tư tài chính thuần túy hay liên kết với business cốt lõi?</p>
        </div>
      </section>
    </LessonPageLayout>
  );
}
