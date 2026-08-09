"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { DebtLessonCopy } from "@/lib/i18n/dictionaries/sections/bespoke-lessons";

/* i18n-ignore-start: `title`, `subtitle` và `nextTitle` đã có lớp phủ trong
   lib/i18n/dictionaries/sections/bespoke-lessons.ts; trang dựng `lesson` từ
   `LESSON` rồi ghi đè ba trường đó theo ngôn ngữ. `difficulty` là union tiếng
   Việt dùng làm giá trị khắp ứng dụng, và `duration` chỉ được parse lấy số. */
const LESSON: LessonMeta = {
  // Id tổng hợp, KHÔNG phải id trong corpus. Trang này chưa có bài tương ứng
  // trong lib/lessons.ts nên không có id thật để ghi vào, còn id cũ (5) là id
  // của một bài Chặng 3 CÓ THẬT - nên tiến độ, XP, ghi chú và highlight của
  // trang này đều đổ sang bài đó. Xem lib/__tests__/bespoke-lesson-ids.test.ts.
  id: 9004, slug: "cac-loai-debt", day: 5, accent: "teal",
  title: "Các Loại Debt Cần Biết",
  subtitle: "9 loại nợ, capital structure và thứ tự ưu tiên thanh toán",
  duration: "8 phút", difficulty: "Trung bình", emoji: "",
  nextSlug: "bao-cao-luu-chuyen-tien-te", nextTitle: "Day 6: Báo Cáo LCTT",
};
/* i18n-ignore-end */

/* i18n-ignore-start: `correct` là chỉ số vào mảng options và LessonPageLayout
   ghi `quiz_score` xuống Supabase - để nó trong từ điển là để một bản dịch sửa
   được đáp án. Câu hỏi, phương án và lời giải nằm ở
   lib/i18n/dictionaries/sections/bespoke-lessons.ts. */
const QUIZ_CORRECT = [2, 3, 0, 3, 1];
/* i18n-ignore-end */

/* i18n-ignore-start: `name` của chín loại nợ vốn ĐÃ là tiếng Anh trong bản gốc
   ("Secured Debt", "Mezzanine Debt") - chúng là thuật ngữ ngành, giống nhau ở
   cả hai ngôn ngữ, nên không thuộc về một từ điển hai ngôn ngữ. `risk` và
   `rate` là số vẽ thanh trượt; `emoji` không dịch. Phần chữ - `tag`, `desc`,
   `eg` - nằm trong `debtTypes` của từ điển, khớp THEO VỊ TRÍ với mảng này. */
const DEBT_TYPES = [
  { id: "secured", emoji: "🔒", name: "Secured Debt", risk: 10, rate: 5 },
  { id: "unsecured", emoji: "🔓", name: "Unsecured Debt", risk: 30, rate: 8 },
  { id: "senior", emoji: "👑", name: "Senior Debt", risk: 15, rate: 6 },
  { id: "sub", emoji: "", name: "Subordinated Debt", risk: 50, rate: 12 },
  { id: "revolver", emoji: "🔄", name: "Revolving Credit (Revolver)", risk: 20, rate: 7 },
  { id: "term", emoji: "📅", name: "Term Loan", risk: 25, rate: 7 },
  { id: "conv", emoji: "🔀", name: "Convertible Debt", risk: 45, rate: 6 },
  { id: "bond", emoji: "🏛️", name: "Bond", risk: 25, rate: 9 },
  { id: "mezz", emoji: "🔶", name: "Mezzanine Debt", risk: 65, rate: 18 },
];

/** Tên bốn tầng trong waterfall và trong bảng LBO. Cùng lý do với `name` ở
 *  trên: chúng là tên tầng vốn bằng tiếng Anh trong cả hai bản. */
const WATERFALL_LAYERS = [
  { name: "Senior Secured", amount: 200 },
  { name: "Senior Unsecured / Bond", amount: 150 },
  { name: "Subordinated / Mezz", amount: 100 },
  { name: "Equity", amount: 50 },
];

const LBO_ROWS = [
  { layer: "Senior Secured (Term Loan)", pct: "50%", rate: "SOFR+300bps" },
  { layer: "Senior Unsecured Bond", pct: "20%", rate: "~8%" },
  { layer: "Mezzanine / PIK", pct: "10%", rate: "15-20%" },
  { layer: "Equity (PE Fund)", pct: "20%", rate: "" },
];
/* i18n-ignore-end */

function CapitalStructureAnimation({ c }: { c: DebtLessonCopy }) {
  const [scenario, setScenario] = useState<"normal" | "distress">("normal");
  const assets = scenario === "normal" ? 600 : 280;
  let remaining = assets;
  const payouts = WATERFALL_LAYERS.map(l => { const p = Math.min(remaining, l.amount); remaining = Math.max(0, remaining - l.amount); return p; });

  return (
    <div className="bg-white border-2 border-stone-200 rounded-3xl p-6 space-y-4 my-6">
      <div className="text-sm font-bold text-stone-700">{c.waterfallHeading}</div>
      <div className="bg-stone-100 rounded-2xl p-1.5 flex gap-1.5">
        {(["normal", "distress"] as const).map(sc => (
          <button key={sc} onClick={() => setScenario(sc)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${scenario === sc ? "bg-white text-stone-800 shadow-sm" : "text-stone-500"}`}>
            {sc === "normal" ? c.scenarioNormal : c.scenarioDistress}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {WATERFALL_LAYERS.map((layer, i) => {
          const pct = (payouts[i] / layer.amount) * 100;
          const fullPaid = payouts[i] >= layer.amount;
          return (
            <div key={layer.name} className={`rounded-2xl p-4 border-2 transition-all ${fullPaid ? "bg-stone-50 border-stone-100" : "bg-stone-50 border-stone-200"}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-sm text-stone-700">{layer.name}</span>
                <span className="text-sm font-bold text-stone-700">
                  {format(c.payoutLine, { paid: payouts[i], total: layer.amount })} {fullPaid ? "" : "❌"}
                </span>
              </div>
              <div className="h-3 bg-stone-200 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700 bg-stone-50" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="rounded-2xl p-4 text-sm font-medium border-2 bg-stone-50 border-stone-200 text-stone-700">
        {scenario === "normal" ? c.verdictNormal : c.verdictDistress}
      </div>
    </div>
  );
}

export default function CacLoaiDebtPage() {
  const { t } = useI18n();
  // Ép kiểu một lần - xem chú thích của DebtLessonCopy về bộ kiểm làm cho phép
  // ép này an toàn.
  const c = t.bespokeLessons["cac-loai-debt"] as DebtLessonCopy;

  const lesson: LessonMeta = { ...LESSON, title: c.title, subtitle: c.subtitle, nextTitle: c.nextTitle };
  const quiz: QuizQuestion[] = c.quiz.map((q, i) => ({
    question: q.question,
    options: q.options,
    correct: QUIZ_CORRECT[i],
    explanation: q.explanation,
  }));

  return (
    <LessonPageLayout lesson={lesson} quiz={quiz}>
      <div className="space-y-8 text-stone-700 leading-relaxed">

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">{c.heading}</h2>
          <p>{c.intro}</p>
          <p>{c.intro2}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">{c.ruleHeading}</h2>
          <p>{c.ruleLead}</p>
          <div className="bg-stone-900 rounded-2xl p-5 text-white text-center">
            <div className="text-2xl font-bold text-stone-700 mb-2">{c.ruleBanner}</div>
            <p className="text-stone-300 text-sm">{c.ruleNote}</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">{c.typesHeading}</h2>
          <div className="space-y-2">
            {DEBT_TYPES.map((d, i) => (
              <div key={d.id} className="w-full text-left rounded-2xl border p-4 bg-white border-stone-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl flex-shrink-0">{d.emoji}</span>
                    <div>
                      <div className="font-bold text-sm text-stone-800">{d.name}</div>
                      <div className="text-xs mt-0.5 text-stone-500">
                        {format(c.rateSuffix, { tag: c.debtTypes[i].tag, rate: d.rate })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <div className="h-2 w-16 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-current rounded-full" style={{ width: `${d.risk}%`, opacity: 0.5 }} />
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <p className="text-sm leading-relaxed text-stone-700">{c.debtTypes[i].desc}</p>
                  <div className="bg-stone-50 rounded-xl p-3 text-xs text-stone-500 border border-stone-100">{c.debtTypes[i].eg}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CapitalStructureAnimation c={c} />

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">{c.lboHeading}</h2>
          <p>{c.lboLead}</p>
          <div className="bg-stone-900 rounded-2xl p-5 text-sm space-y-2">
            <div className="text-stone-700 text-xs font-bold uppercase tracking-widest mb-2">{c.lboTableTitle}</div>
            {LBO_ROWS.map((r, i) => (
              <div key={r.layer} className="flex items-center gap-3 py-1.5 border-b border-stone-800 last:border-0">
                <div className="w-1 h-8 rounded-full flex-shrink-0 bg-stone-50" />
                <div className="flex-1">
                  <div className="font-semibold text-xs text-stone-700">{r.layer}</div>
                  <div className="text-stone-500 text-xs">
                    {r.pct} · {c.lboAmounts[i]} · {r.rate || c.lboEquityRate}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-stone-500">{c.lboNote}</p>
        </section>

        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6">
          <h3 className="font-bold text-stone-700 mb-3">{c.takeawayHeading}</h3>
          <div className="space-y-2">
            {c.takeaways.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-stone-700">
                <span className="text-stone-700 font-bold flex-shrink-0 mt-0.5"></span>{item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </LessonPageLayout>
  );
}
