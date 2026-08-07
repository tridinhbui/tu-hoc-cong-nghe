"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  // Id tổng hợp, KHÔNG phải id trong corpus. Trang này chưa có bài tương ứng
  // trong lib/lessons.ts nên không có id thật để ghi vào, còn id cũ (8) là id
  // của một bài Chặng 3 CÓ THẬT - nên tiến độ, XP, ghi chú và highlight của
  // trang này đều đổ sang bài đó. Xem lib/__tests__/bespoke-lesson-ids.test.ts.
  id: 9006, slug: "credit-debit-phan-1", day: 8, accent: "indigo",
  title: "Credit vs Debit - Phần 1",
  subtitle: "Tại sao kế toán ghi sổ theo kiểu đó?",
  duration: "6 phút", difficulty: "Trung bình", emoji: "📒",
  nextSlug: "credit-debit-phan-2", nextTitle: "Credit vs Debit Phần 2",
};

const quiz: QuizQuestion[] = [
  {
    question: "Trong kế toán kép, 'Debit' có nghĩa là gì?",
    options: [
      "Tiền ra khỏi tài khoản",
      "Ghi vào bên trái của T-account",
      "Nợ phải trả",
      "Tiền vào tài khoản",
    ],
    correct: 1,
    explanation: "Trong kế toán, Debit (Dr.) = bên TRÁI của T-account. Không liên quan đến 'tiền ra' hay 'nợ' theo nghĩa thông thường!",
  },
  {
    question: "Tài sản (Assets) tăng được ghi vào bên nào?",
    options: ["Credit (bên phải)", "Debit (bên trái)", "Cả hai", "Ghi cả hai bên cho cân"],
    correct: 1,
    explanation: "Assets tăng → Debit. Assets giảm → Credit. Đây là quy tắc cơ bản - ngược lại với Liabilities và Equity.",
  },
  {
    question: "Doanh nghiệp nhận tiền mặt từ khách hàng. Bút toán Cash (tài sản) là?",
    options: ["Credit Cash (giảm)", "Debit Cash (tăng)", "Ghi Cash ở cả hai bên", "Debit và Credit Cash bằng nhau"],
    correct: 1,
    explanation: "Cash là tài sản. Tiền vào → Cash tăng → Debit Cash. Đồng thời Credit Revenue (hoặc Credit Liability nếu là tiền đặt cọc).",
  },
  {
    question: "Nguyên tắc kế toán kép (Double-entry) đòi hỏi gì?",
    options: [
      "Mỗi giao dịch ghi vào 2 sổ sách khác nhau",
      "Tổng Debit = Tổng Credit trong mỗi giao dịch",
      "Ghi 2 lần để kiểm tra lỗi",
      "Chỉ doanh nghiệp lớn mới cần",
    ],
    correct: 1,
    explanation: "Double-entry: mỗi giao dịch tác động tối thiểu 2 tài khoản, tổng Dr. = tổng Cr. → Bảng cân đối luôn cân.",
  },
  {
    question: "Doanh thu (Revenue) tăng được ghi bên nào?",
    options: ["Debit", "Credit", "Cả hai tùy trường hợp", "Ghi ngoài T-account, ở sổ phụ riêng"],
    correct: 1,
    explanation: "Revenue thuộc nhóm Equity (retained earnings) → tăng thì Credit. Để giảm Revenue (như hoàn hàng) → Debit.",
  },
];

function TAccountDemo() {
  const [selected, setSelected] = useState<string | null>(null);

  const accounts = [
    { name: "Cash (Asset)", debitRule: "Tăng", creditRule: "Giảm", color: "emerald" },
    { name: "Revenue (Income)", debitRule: "Giảm", creditRule: "Tăng", color: "blue" },
    { name: "Expense", debitRule: "Tăng", creditRule: "Giảm", color: "orange" },
    { name: "Liability (Nợ)", debitRule: "Giảm", creditRule: "Tăng", color: "rose" },
  ];

  const colorMap: Record<string, string> = {
    emerald: "bg-stone-50 border-stone-200 text-stone-700",
    blue: "bg-stone-50 border-stone-200 text-stone-700",
    orange: "bg-stone-50 border-stone-200 text-stone-700",
    rose: "bg-stone-50 border-stone-200 text-stone-700",
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-5 border border-stone-200 my-6">
      <h3 className="font-bold text-stone-700 mb-4 text-sm"> T-Account Interactive - Chọn loại tài khoản</h3>
      <div className="grid grid-cols-2 gap-2 mb-5">
        {accounts.map(a => (
          <button key={a.name} onClick={() => setSelected(a.name === selected ? null : a.name)}
            className={`text-left p-3 rounded-xl border-2 text-xs font-semibold transition-all ${a.name === selected ? colorMap[a.color] + " border-2" : "bg-white border-stone-200 text-stone-600 hover:border-stone-200"}`}>
            {a.name}
          </button>
        ))}
      </div>

      {selected && (() => {
        const acc = accounts.find(a => a.name === selected)!;
        return (
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <div className="bg-stone-100 text-center py-2 font-bold text-stone-700 text-sm">{selected}</div>
            <div className="grid grid-cols-2 divide-x divide-stone-200">
              <div className="p-4 text-center">
                <div className="text-xs font-bold text-stone-500 mb-2">DEBIT (Bên Trái)</div>
                <div className={`text-lg font-bold ${acc.debitRule === "Tăng" ? "text-stone-700" : "text-stone-700"}`}>
                  {acc.debitRule === "Tăng" ? "↑ Tăng" : "↓ Giảm"}
                </div>
              </div>
              <div className="p-4 text-center">
                <div className="text-xs font-bold text-stone-500 mb-2">CREDIT (Bên Phải)</div>
                <div className={`text-lg font-bold ${acc.creditRule === "Tăng" ? "text-stone-700" : "text-stone-700"}`}>
                  {acc.creditRule === "Tăng" ? "↑ Tăng" : "↓ Giảm"}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {!selected && (
        <div className="bg-white rounded-xl border border-dashed border-stone-200 p-6 text-center text-stone-500 text-sm">
          Chọn loại tài khoản để xem quy tắc Dr./Cr.
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">Debit & Credit - Phần 1: Nền Tảng</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Hệ thống kế toán kép 500 tuổi vẫn là nền tảng mọi báo cáo tài chính</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">😵 Tại sao Debit/Credit gây nhầm lẫn?</h3>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 mb-4">
          <p className="text-sm text-stone-700 leading-relaxed">
            Trong ngân hàng, "Credit" = tiền vào (ngân hàng nợ bạn). Trong kế toán, "Credit" = bên phải T-account và có thể là tiền ra khỏi tài sản của bạn. <strong>Đây là hai khái niệm hoàn toàn khác nhau!</strong>
          </p>
        </div>
        <p className="text-stone-600 leading-relaxed">
          Kế toán kép (Double-entry bookkeeping) ra đời từ thế kỷ 15 tại Ý. Mỗi giao dịch luôn có hai mặt: một thứ gì đó <em>tăng</em> và một thứ gì đó <em>giảm</em> (hoặc một thứ khác tăng).
        </p>
      </section>

      <TAccountDemo />

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">📜 Debit tăng gì? Credit tăng gì?</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-4">
          Thay vì học vẹt viết tắt tiếng Anh, hãy nhớ theo cách này: hãy tưởng tượng <strong>Debit là &quot;bên trái - những gì bạn đang có hoặc đang bỏ ra&quot;</strong>, còn <strong>Credit là &quot;bên phải - những gì bạn đang nợ hoặc đang thu về&quot;</strong>. Cứ mỗi nhóm tài khoản sẽ có 1 phía làm nó tăng, phía còn lại làm nó giảm.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 mb-3 text-sm">DEBIT (bên trái) làm những thứ này TĂNG:</div>
            <ul className="space-y-2 text-sm">
              <li className="text-stone-600"><strong className="text-stone-700">Tài sản (Assets)</strong> - VD: tiền mặt, hàng tồn kho, xe cộ. Bạn mua thêm xe → tài sản tăng → ghi Debit.</li>
              <li className="text-stone-600"><strong className="text-stone-700">Chi phí (Expenses)</strong> - VD: tiền điện, lương nhân viên. Trả thêm chi phí → khoản chi phí tăng → ghi Debit.</li>
              <li className="text-stone-600"><strong className="text-stone-700">Rút vốn (Drawings)</strong> - chủ doanh nghiệp rút tiền ra xài riêng → ghi Debit.</li>
            </ul>
          </div>
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 mb-3 text-sm">CREDIT (bên phải) làm những thứ này TĂNG:</div>
            <ul className="space-y-2 text-sm">
              <li className="text-stone-600"><strong className="text-stone-700">Nợ phải trả (Liabilities)</strong> - VD: vay ngân hàng. Vay thêm tiền → khoản nợ tăng → ghi Credit.</li>
              <li className="text-stone-600"><strong className="text-stone-700">Vốn chủ sở hữu (Equity)</strong> - VD: vốn góp của cổ đông. Góp thêm vốn → vốn chủ tăng → ghi Credit.</li>
              <li className="text-stone-600"><strong className="text-stone-700">Doanh thu (Income/Revenue)</strong> - VD: tiền bán hàng. Bán được thêm hàng → doanh thu tăng → ghi Credit.</li>
            </ul>
          </div>
        </div>
        <p className="text-stone-500 text-xs mt-3 italic">Mẹo nhớ nhanh: Tài sản và Chi phí &quot;thích&quot; bên trái (Debit). Nợ, Vốn chủ và Doanh thu &quot;thích&quot; bên phải (Credit).</p>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">🍜 Ví dụ đời thường trước khi vào bút toán</h3>
        <div className="space-y-3 mb-5">
          <div className="border border-stone-200 rounded-xl p-4">
            <div className="font-semibold text-stone-800 text-sm mb-1">Bạn mua đồ ăn hết 50.000đ bằng tiền mặt</div>
            <p className="text-stone-600 text-xs leading-relaxed">Tiền mặt bạn có (tài sản) giảm 50.000đ, đổi lại bạn có một bữa ăn (chi phí) tăng 50.000đ. Về bản chất: <strong>tài sản này giảm để chi phí kia tăng</strong> - tiền không tự nhiên biến mất, nó chuyển thành thứ khác.</p>
          </div>
          <div className="border border-stone-200 rounded-xl p-4">
            <div className="font-semibold text-stone-800 text-sm mb-1">Bạn vay ngân hàng 20 triệu để mua xe máy</div>
            <p className="text-stone-600 text-xs leading-relaxed">Tiền mặt (tài sản) của bạn tăng 20 triệu, nhưng đồng thời khoản nợ phải trả ngân hàng (nợ) cũng tăng 20 triệu. Có thêm tiền không có nghĩa là bạn giàu hơn - vì bạn cũng nợ thêm đúng bằng số đó.</p>
          </div>
          <div className="border border-stone-200 rounded-xl p-4">
            <div className="font-semibold text-stone-800 text-sm mb-1">Bạn nhận lương 15 triệu vào tài khoản</div>
            <p className="text-stone-600 text-xs leading-relaxed">Tiền mặt (tài sản) tăng 15 triệu, và đây là khoản thu nhập/doanh thu của bạn cũng tăng tương ứng. Không có khoản nợ nào phát sinh - đây là tiền &quot;của bạn thật sự&quot;.</p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">Ví dụ bút toán: Bán hàng thu tiền mặt</h3>
        <div className="bg-stone-800 rounded-xl p-5 font-mono text-sm">
          <div className="text-stone-500 mb-3 text-xs">{ '// Bán hàng 50 triệu, khách trả tiền mặt ngay' }</div>
          <div className="flex justify-between mb-1">
            <span className="text-stone-700">Dr. Cash (Tài sản ↑)</span>
            <span className="text-white">50.000.000</span>
          </div>
          <div className="flex justify-between mb-3 pl-8">
            <span className="text-stone-700">Cr. Revenue (Doanh thu ↑)</span>
            <span className="text-white">50.000.000</span>
          </div>
          <div className="border-t border-stone-600 pt-3 text-stone-500 text-xs">
            Diễn giải: tiền mặt trong túi bạn tăng 50 triệu (Debit), đồng thời doanh thu bán hàng cũng tăng 50 triệu (Credit). Tổng Dr. = Tổng Cr. = 50 triệu.
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">🔄 Phương trình kế toán</h3>
        <div className="bg-stone-50 text-white rounded-xl p-5 text-center">
          <div className="text-xl font-bold font-mono mb-2">Assets = Liabilities + Equity</div>
          <p className="text-stone-700 text-sm">Bảng cân đối luôn cân - đây là hệ quả tất yếu của kế toán kép</p>
        </div>
      </section>
    </LessonPageLayout>
  );
}
