"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 8, day: 8, accent: "indigo",
  title: "Credit vs Debit — Phần 1",
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
    options: ["Credit (bên phải)", "Debit (bên trái)", "Cả hai", "Không cần ghi"],
    correct: 1,
    explanation: "Assets tăng → Debit. Assets giảm → Credit. Đây là quy tắc cơ bản — ngược lại với Liabilities và Equity.",
  },
  {
    question: "Doanh nghiệp nhận tiền mặt từ khách hàng. Bút toán Cash (tài sản) là?",
    options: ["Credit Cash (giảm)", "Debit Cash (tăng)", "Không ghi Cash", "Debit và Credit Cash bằng nhau"],
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
    options: ["Debit", "Credit", "Cả hai tùy trường hợp", "Không ghi vào T-account"],
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
      <h3 className="font-bold text-stone-700 mb-4 text-sm"> T-Account Interactive — Chọn loại tài khoản</h3>
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
        <div className="bg-white rounded-xl border border-dashed border-stone-200 p-6 text-center text-stone-400 text-sm">
          Chọn loại tài khoản để xem quy tắc Dr./Cr.
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Debit & Credit — Phần 1: Nền Tảng</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Hệ thống kế toán kép 500 tuổi vẫn là nền tảng mọi báo cáo tài chính</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">😵 Tại sao Debit/Credit gây nhầm lẫn?</h3>
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
        <h3 className="text-lg font-bold text-stone-800 mb-3">📜 DEAD CLIC — Mẹo nhớ quy tắc</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 mb-3 text-sm">DEBIT tăng:</div>
            <ul className="space-y-1 text-sm">
              <li className="flex gap-2"><span className="font-bold text-stone-700">D</span><span className="text-stone-600">rawings (rút vốn)</span></li>
              <li className="flex gap-2"><span className="font-bold text-stone-700">E</span><span className="text-stone-600">xpenses (chi phí)</span></li>
              <li className="flex gap-2"><span className="font-bold text-stone-700">A</span><span className="text-stone-600">ssets (tài sản)</span></li>
              <li className="flex gap-2"><span className="font-bold text-stone-700">D</span><span className="text-stone-600">ividends (cổ tức)</span></li>
            </ul>
          </div>
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 mb-3 text-sm">CREDIT tăng:</div>
            <ul className="space-y-1 text-sm">
              <li className="flex gap-2"><span className="font-bold text-stone-700">C</span><span className="text-stone-600">apital (vốn chủ)</span></li>
              <li className="flex gap-2"><span className="font-bold text-stone-700">L</span><span className="text-stone-600">iabilities (nợ)</span></li>
              <li className="flex gap-2"><span className="font-bold text-stone-700">I</span><span className="text-stone-600">ncome (doanh thu)</span></li>
              <li className="flex gap-2"><span className="font-bold text-stone-700">C</span><span className="text-stone-600">redit increases these</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Ví dụ thực tế: Bán hàng thu tiền mặt</h3>
        <div className="bg-stone-800 rounded-xl p-5 font-mono text-sm">
          <div className="text-stone-400 mb-3 text-xs">{ '// Bán hàng 50 triệu, khách trả tiền mặt ngay' }</div>
          <div className="flex justify-between mb-1">
            <span className="text-stone-700">Dr. Cash (Asset ↑)</span>
            <span className="text-white">50.000.000</span>
          </div>
          <div className="flex justify-between mb-3 pl-8">
            <span className="text-stone-700">Cr. Revenue (Income ↑)</span>
            <span className="text-white">50.000.000</span>
          </div>
          <div className="border-t border-stone-600 pt-3 text-stone-400 text-xs">
            Total Dr. = Total Cr. = 50M 
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3">🔄 Phương trình kế toán</h3>
        <div className="bg-stone-50 text-white rounded-xl p-5 text-center">
          <div className="text-xl font-bold font-mono mb-2">Assets = Liabilities + Equity</div>
          <p className="text-stone-700 text-sm">Bảng cân đối luôn cân — đây là hệ quả tất yếu của kế toán kép</p>
        </div>
      </section>
    </LessonPageLayout>
  );
}
