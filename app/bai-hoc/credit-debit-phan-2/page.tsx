"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 9, day: 9, accent: "violet",
  title: "Debit và Credit - Phần 2",
  subtitle: "Ứng dụng thực tế vào các bút toán phổ biến",
  duration: "7 phút", difficulty: "Khó", emoji: "📗",
  nextSlug: "tu-duy-tai-chinh", nextTitle: "Tư Duy Tài Chính",
};

const quiz: QuizQuestion[] = [
  {
    question: "Mua hàng tồn kho 200 triệu, trả tiền mặt. Bút toán đúng là?",
    options: [
      "Dr. Cash 200M / Cr. Inventory 200M",
      "Dr. Inventory 200M / Cr. Cash 200M",
      "Dr. Expense 200M / Cr. Cash 200M",
      "Dr. Inventory 200M / Cr. Revenue 200M",
    ],
    correct: 1,
    explanation: "Inventory (Asset) tăng → Dr. Inventory. Cash (Asset) giảm → Cr. Cash. Đây là giao dịch trao đổi giữa 2 tài sản.",
  },
  {
    question: "Công ty vay ngân hàng 500 triệu, tiền vào tài khoản. Bút toán?",
    options: [
      "Dr. Loan 500M / Cr. Cash 500M",
      "Dr. Cash 500M / Cr. Loan Payable 500M",
      "Dr. Revenue 500M / Cr. Loan Payable 500M",
      "Dr. Cash 500M / Cr. Equity 500M",
    ],
    correct: 1,
    explanation: "Cash (Asset) tăng → Dr. Cash. Loan Payable (Liability) tăng → Cr. Loan Payable. Nợ và tài sản cùng tăng.",
  },
  {
    question: "Trả lương nhân viên 100 triệu bằng tiền mặt. Bút toán?",
    options: [
      "Dr. Cash 100M / Cr. Salary Expense 100M",
      "Dr. Salary Expense 100M / Cr. Cash 100M",
      "Dr. Equity 100M / Cr. Cash 100M",
      "Dr. Salary Payable 100M / Cr. Revenue 100M",
    ],
    correct: 1,
    explanation: "Salary Expense (Expense) tăng → Dr. Salary Expense. Cash (Asset) giảm → Cr. Cash. Chi phí làm giảm lợi nhuận → giảm Equity.",
  },
  {
    question: "Khách hàng đặt cọc trước 50 triệu, chưa giao hàng. Bút toán?",
    options: [
      "Dr. Cash 50M / Cr. Revenue 50M",
      "Dr. Cash 50M / Cr. Deferred Revenue 50M",
      "Dr. Revenue 50M / Cr. Cash 50M",
      "Dr. Cash 50M / Cr. Equity 50M",
    ],
    correct: 1,
    explanation: "Chưa giao hàng = chưa earn revenue. Ghi Deferred Revenue (Liability) - nghĩa vụ giao hàng trong tương lai. Khi giao hàng mới Dr. Deferred Revenue / Cr. Revenue.",
  },
  {
    question: "Sau khi close sổ cuối năm, Revenue và Expense accounts được xử lý thế nào?",
    options: [
      "Giữ nguyên số dư sang năm sau",
      "Đưa về 0, lãi lỗ chuyển vào lợi nhuận giữ lại",
      "Chuyển thẳng số dư sang bảng cân đối kế toán",
      "Xoá hoàn toàn khỏi hệ thống sổ sách",
    ],
    correct: 1,
    explanation: "Closing entries: Dr. Revenue / Cr. Income Summary; Dr. Income Summary / Cr. Retained Earnings (nếu lãi). Revenue và Expense là temporary accounts - reset mỗi năm.",
  },
];

const TRANSACTIONS = [
  {
    name: "Mua tài sản bằng tiền mặt",
    dr: "PPE (Asset) ↑",
    cr: "Cash (Asset) ↓",
    amount: "500M",
    note: "Trao đổi giữa 2 tài sản - tổng assets không đổi",
  },
  {
    name: "Bán hàng chịu (credit sale)",
    dr: "Accounts Receivable ↑",
    cr: "Revenue ↑",
    amount: "200M",
    note: "Ghi nhận doanh thu dù chưa nhận tiền - accrual basis",
  },
  {
    name: "Thu tiền từ khách nợ",
    dr: "Cash ↑",
    cr: "Accounts Receivable ↓",
    amount: "200M",
    note: "Chuyển đổi giữa 2 tài sản khi tiền về",
  },
  {
    name: "Khấu hao tài sản",
    dr: "Depreciation Expense ↑",
    cr: "Accumulated Depreciation ↑",
    amount: "50M",
    note: "Non-cash expense - giảm giá trị tài sản ròng",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">Debit &amp; Credit - Phần 2: Thực Chiến</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Từ lý thuyết → bút toán thực tế cho các giao dịch phổ biến nhất</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">💡 Nói đơn giản: bút toán kép là gì?</h3>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-3">
          <p className="text-sm text-stone-700 leading-relaxed">
            Mỗi khi tiền hoặc tài sản của bạn di chuyển, nó luôn <strong>đi từ đâu đó đến đâu đó</strong> - không tự nhiên sinh ra hay biến mất. Bút toán kép (double-entry) chỉ đơn giản là ghi lại cả hai đầu của sự di chuyển đó: một vế Dr. (nơi tiền/giá trị đi đến hoặc thứ gì tăng lên) và một vế Cr. (nơi tiền/giá trị đi ra hoặc thứ gì đó khác tăng lên tương ứng).
          </p>
          <p className="text-sm text-stone-700 leading-relaxed">
            Ví dụ đời thường: bạn rút 2 triệu từ ví để trả tiền thuê nhà. Ví của bạn (tài sản) giảm 2 triệu, nhưng đồng thời bạn vừa &quot;mua&quot; được một tháng ở trọ (chi phí) tăng 2 triệu. Không ghi 1 vế mà bỏ vế kia thì sổ sách sẽ không giải thích được tiền đã đi đâu.
          </p>
          <p className="text-sm text-stone-700 leading-relaxed">
            Tại sao cần đúng <strong>2 vế</strong>? Vì mọi giao dịch kinh doanh đều có bản chất trao đổi: đưa cái này, nhận cái kia. Ghi cả 2 vế giúp sổ sách luôn tự kiểm tra được - nếu tổng Dr. không bằng tổng Cr., chắc chắn có chỗ ghi sai. Đây chính là lý do kế toán kép tồn tại 500 năm mà vẫn là chuẩn mực: nó tự phát hiện lỗi.
          </p>
          <p className="text-sm text-stone-700 leading-relaxed">
            Phần dưới đây sẽ đi vào cách ghi Dr./Cr. cụ thể cho từng loại giao dịch phổ biến - nhưng hãy nhớ nguyên tắc gốc: <em>mỗi đồng đi vào phải có một đồng đi ra (hoặc một khoản tăng tương ứng) ở đâu đó khác.</em>
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">3 bước ghi bút toán</h3>
        <div className="space-y-3">
          {[
            { n: 1, title: "Identify accounts affected", desc: "Xác định tài khoản nào bị ảnh hưởng (Cash, Inventory, Revenue, Loan...)" },
            { n: 2, title: "Classify each account", desc: "Asset? Liability? Equity? Revenue? Expense? → Áp dụng quy tắc Dr./Cr. tương ứng" },
            { n: 3, title: "Record the entry", desc: "Ghi Dr. trước, Cr. sau, đảm bảo tổng Dr. = tổng Cr." },
          ].map(s => (
            <div key={s.n} className="flex gap-4 border border-stone-200 rounded-xl p-4">
              <div className="w-8 h-8 bg-stone-800 text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">{s.n}</div>
              <div>
                <div className="font-semibold text-stone-800 text-sm">{s.title}</div>
                <div className="text-stone-600 text-xs mt-0.5">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="my-6">
        <h3 className="font-bold text-stone-800 dark:text-stone-200 mb-4 text-sm">Journal Entry Simulator</h3>
        <div className="space-y-3">
          {TRANSACTIONS.map((tx, i) => (
            <div key={i} className="bg-white rounded-xl border border-stone-200 overflow-hidden">
              <div className="bg-stone-50 px-4 py-2 border-b border-stone-200 text-xs font-bold text-stone-600 uppercase">{tx.name} - {tx.amount}</div>
              <div className="p-4 font-mono text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-stone-700">Dr. {tx.dr}</span>
                  <span className="font-bold text-stone-700">{tx.amount}</span>
                </div>
                <div className="flex justify-between pl-8">
                  <span className="text-stone-600">Cr. {tx.cr}</span>
                  <span className="font-bold text-stone-700">{tx.amount}</span>
                </div>
              </div>
              <div className="bg-stone-50 px-4 py-3 border-t border-stone-200">
                <p className="text-xs text-stone-700">{tx.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">Ví dụ tổng hợp: Tháng 1 của startup</h3>
        <div className="space-y-3">
          {[
            { tx: "Cổ đông góp vốn 2 tỷ", dr: "Dr. Cash 2 tỷ", cr: "Cr. Share Capital 2 tỷ" },
            { tx: "Thuê văn phòng trả trước 6 tháng: 120 triệu", dr: "Dr. Prepaid Rent 120M", cr: "Cr. Cash 120M" },
            { tx: "Mua laptop 50M", dr: "Dr. Equipment 50M", cr: "Cr. Cash 50M" },
            { tx: "Ký hợp đồng, bán dịch vụ 300M, thu 50% ngay", dr: "Dr. Cash 150M / Dr. AR 150M", cr: "Cr. Revenue 300M" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-stone-200 p-4">
              <div className="text-xs font-semibold text-stone-500 mb-2">Giao dịch {i + 1}: {item.tx}</div>
              <div className="font-mono text-xs space-y-0.5">
                <div className="text-stone-700">{item.dr}</div>
                <div className="text-stone-600 pl-6">{item.cr}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">Từ Journal Entries → Báo cáo tài chính</h3>
        <div className="bg-stone-900 text-white rounded-xl p-5">
          <div className="flex items-center gap-3 flex-wrap">
            {["Journal Entries", "→", "General Ledger", "→", "Trial Balance", "→", "Financial Statements"].map((s, i) => (
              <span key={i} className={s === "→" ? "text-stone-500 font-bold" : "bg-white/20 px-3 py-1.5 rounded-lg text-sm font-semibold"}>{s}</span>
            ))}
          </div>
          <p className="text-stone-500 text-xs mt-3">Mọi con số trên P&amp;L, Balance Sheet, Cash Flow đều xuất phát từ journal entries</p>
        </div>
      </section>
    </LessonPageLayout>
  );
}
