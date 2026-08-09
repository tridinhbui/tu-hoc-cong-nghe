"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { SourceCashLessonCopy } from "@/lib/i18n/dictionaries/sections/bespoke-lessons";

/* i18n-ignore-start: `title`, `subtitle` và `nextTitle` đã có lớp phủ trong
   lib/i18n/dictionaries/sections/bespoke-lessons.ts; trang dựng `lesson` từ
   `META` rồi ghi đè ba trường đó theo ngôn ngữ. `difficulty` là union tiếng
   Việt dùng làm giá trị khắp ứng dụng (render qua `t.difficulty[...]`), và
   `duration` chỉ được LessonPageLayout parse lấy con số. */
const META: LessonMeta = {
  // Id tổng hợp, KHÔNG phải id trong corpus. Trang này chưa có bài tương ứng
  // trong lib/lessons.ts nên không có id thật để ghi vào, còn id cũ (15) là id
  // của một bài Chặng 3 CÓ THẬT - nên tiến độ, XP, ghi chú và highlight của
  // trang này đều đổ sang bài đó. Xem lib/__tests__/bespoke-lesson-ids.test.ts.
  id: 9014, slug: "source-cash-ma", day: 15, accent: "emerald",
  title: "Source of Cash trong M&A",
  subtitle: "Tiền mua lại doanh nghiệp đến từ đâu?",
  duration: "8 phút", difficulty: "Khó", emoji: "💼",
  nextSlug: "synergy-ma", nextTitle: "Synergy trong M&A",
};
/* i18n-ignore-end */


/* i18n-ignore-start: sáu chuỗi dưới đây GIỐNG HỆT nhau ở cả hai ngôn ngữ -
   emoji, và bốn tên nguồn vốn cùng hai nhãn vốn đã là tiếng Anh trong bản gốc.
   Chúng nằm ngoài từ điển có chủ đích: một cặp giá trị trùng nhau ở đó không
   phân biệt được với một bản dịch bị bỏ quên, và dictionary-parity đã bắt đúng
   cả ba khi tôi thử đưa chúng vào. */
/** Emoji và TÊN bốn nguồn vốn. Không nằm trong từ điển vì chúng giống hệt nhau
 *  ở cả hai ngôn ngữ: emoji không dịch, còn "Cash on Hand" / "Debt Financing"
 *  vốn đã là tiếng Anh trong bản gốc tiếng Việt. Một cặp giá trị trùng nhau
 *  trong từ điển không phân biệt được với một bản dịch bị bỏ quên. */
const SOURCE_ICONS = ["💵", "", "", "🔗"];
const SOURCE_TYPES = ["Cash on Hand", "Debt Financing", "Stock Consideration", "Earnout + Hybrid"];

/** Cùng lý do: hai nhãn này đã là tiếng Anh trong bản gốc. */
const SIMULATOR_HEADING = "⚙️ LBO Capital Structure Simulator";
const MOIC_LABEL = "MOIC (equity return)";
/* i18n-ignore-end */

function FundingStructure({ c }: { c: SourceCashLessonCopy }) {
  const [debtPct, setDebtPct] = useState(60);
  const equityPct = 100 - debtPct;
  const dealSize = 1000;
  const debt = (debtPct / 100) * dealSize;
  const equity = (equityPct / 100) * dealSize;

  const exitMultiple = 10;
  const entryEbitda = 80;
  const exitEbitda = entryEbitda * 1.5;
  const exitEV = exitMultiple * exitEbitda;
  const remainingDebt = debt * 0.5;
  const exitEquity = exitEV - remainingDebt;
  const moic = exitEquity / equity;

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-stone-200 my-6">
      <h3 className="font-bold text-stone-700 mb-4 text-sm">{SIMULATOR_HEADING}</h3>
      <div className="mb-4">
        <label className="text-xs font-semibold text-stone-600 block mb-1">{format(c.debtShareLabel, { debt: debtPct, equity: equityPct })}</label>
        <input type="range" min={20} max={80} value={debtPct} onChange={e => setDebtPct(+e.target.value)} className="w-full accent-emerald-500" />
      </div>

      <div className="bg-white rounded-xl p-4 mb-4">
        <div className="font-semibold text-stone-600 text-xs mb-3">{format(c.dealSizeLabel, { size: dealSize })}</div>
        <div className="h-8 rounded-lg overflow-hidden flex mb-3">
          <div className="bg-stone-50 flex items-center justify-center text-white text-xs font-bold transition-all" style={{ width: `${equityPct}%` }}>
            {format(c.equityShare, { pct: equityPct })}
          </div>
          <div className="bg-stone-600 flex items-center justify-center text-white text-xs font-bold transition-all" style={{ width: `${debtPct}%` }}>
            {format(c.debtShare, { pct: debtPct })}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-center text-sm">
          <div className="bg-stone-50 rounded-lg p-2">
            <div className="text-stone-700 font-bold">{format(c.billion, { value: equity.toFixed(0) })}</div>
            <div className="text-xs text-stone-500">{c.equityCaption}</div>
          </div>
          <div className="bg-stone-50 rounded-lg p-2">
            <div className="text-stone-700 font-bold">{format(c.billion, { value: debt.toFixed(0) })}</div>
            <div className="text-xs text-stone-500">{c.debtCaption}</div>
          </div>
        </div>
      </div>

      <div className="bg-stone-800 rounded-xl p-4">
        <div className="text-xs font-semibold text-stone-500 mb-2">{c.exitAssumption}</div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-stone-300">{format(c.exitEvLabel, { multiple: exitMultiple, ebitda: exitEbitda })}</span>
          <span className="text-white font-bold">{format(c.billion, { value: exitEV.toFixed(0) })}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-stone-300">{c.remainingDebtLabel}</span>
          <span className="text-stone-700">−{format(c.billion, { value: remainingDebt.toFixed(0) })}</span>
        </div>
        <div className="flex justify-between text-sm border-t border-stone-600 pt-2">
          <span className="text-stone-700 font-bold">{MOIC_LABEL}</span>
          <span className="text-stone-700 font-bold text-lg">{moic.toFixed(1)}x</span>
        </div>
      </div>
    </div>
  );
}

// `correct` đọc từ đây, KHÔNG từ từ điển: nó là chỉ số vào mảng options và
// LessonPageLayout ghi `quiz_score` xuống Supabase. Một bản dịch đổi được nó là
// một bản dịch đổi được đáp án.
const QUIZ_CORRECT = [3, 0, 2, 1, 0];

export default function Page() {
  const { t } = useI18n();
  // Ép kiểu một lần ở đây thay vì `?.` ở ba mươi chỗ render - xem chú thích
  // của SourceCashLessonCopy về việc bộ kiểm nào làm cho phép ép này an toàn.
  const c = t.bespokeLessons["source-cash-ma"] as SourceCashLessonCopy;

  const lesson: LessonMeta = { ...META, title: c.title, subtitle: c.subtitle, nextTitle: c.nextTitle };
  // Mảng options theo VỊ TRÍ. Lệch độ dài thì đây là chỗ nó lộ ra - độ dài của
  // `QUIZ_CORRECT` là hợp đồng, và bộ kiểm giữ ba bên khớp nhau.
  const quiz: QuizQuestion[] = c.quiz.map((q, i) => ({
    question: q.question,
    options: q.options,
    correct: QUIZ_CORRECT[i],
    explanation: q.explanation,
  }));

  return (
    <LessonPageLayout lesson={lesson} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">{c.heading}</h2>
      <p className="text-stone-600 text-sm mb-6 italic">{c.intro}</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">{c.sourcesHeading}</h3>
        <div className="space-y-3">
          {c.sources.map((s, i) => (
            <div key={SOURCE_TYPES[i]} className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{SOURCE_ICONS[i]}</span>
                <span className="font-bold text-stone-800">{SOURCE_TYPES[i]}</span>
              </div>
              <p className="text-stone-600 text-sm mb-2">{s.desc}</p>
              <div className="bg-white rounded-lg p-2 mb-2 text-xs text-stone-500 italic">{s.example}</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex gap-1"><span className="text-stone-700"></span><span className="text-stone-600">{s.pro}</span></div>
                <div className="flex gap-1"><span className="text-stone-700">✗</span><span className="text-stone-600">{s.con}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FundingStructure c={c} />

      <section>
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">{c.checklistHeading}</h3>
        <div className="space-y-2">
          {c.checklist.map((item, i) => (
            <div key={i} className="flex gap-3 bg-stone-50 rounded-lg p-3 text-sm border border-stone-200">
              <span className="w-5 h-5 bg-stone-50 text-stone-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
              <span className="text-stone-700">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
