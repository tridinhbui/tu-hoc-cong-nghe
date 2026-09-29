"use client";

import { createElement, useState } from "react";
import { Check, Link2, Plug, TrendingDown, Wrench, X } from "lucide-react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { Sys } from "@/components/ui/system";
import type { LaunchEffortLessonCopy } from "@/lib/i18n/dictionaries/sections/bespoke-lessons";

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
  id: 9014, slug: "nguon-luc-cho-mot-lan-ra-mat", day: 15, accent: "emerald",
  title: "Nguồn Lực Cho Một Lần Ra Mắt",
  subtitle: "Công sức để đưa một hệ thống lên sản xuất đến từ đâu?",
  duration: "8 phút", difficulty: "Khó", emoji: "💼",
  nextSlug: "synergy-ma", nextTitle: "Cộng hưởng khi gộp hai dịch vụ",
};
/* i18n-ignore-end */


/* i18n-ignore-start: sáu chuỗi dưới đây GIỐNG HỆT nhau ở cả hai ngôn ngữ -
   bốn tên nguồn lực cùng hai nhãn đã là tiếng Anh trong bản gốc.
   Chúng nằm ngoài từ điển có chủ đích: một cặp giá trị trùng nhau ở đó không
   phân biệt được với một bản dịch bị bỏ quên, và dictionary-parity đã bắt đúng
   cả ba khi tôi thử đưa chúng vào. */
/** Icon và TÊN bốn nguồn lực. Không nằm trong từ điển vì chúng giống hệt nhau
 *  ở cả hai ngôn ngữ: "In-House Effort" / "Technical Debt"
 *  vốn đã là tiếng Anh trong bản gốc tiếng Việt. Một cặp giá trị trùng nhau
 *  trong từ điển không phân biệt được với một bản dịch bị bỏ quên. */
const SOURCE_ICONS = [Wrench, TrendingDown, Plug, Link2];
const SOURCE_TYPES = ["In-House Effort", "Technical Debt", "Third-Party Service", "Open Source + Hybrid"];

/** Cùng lý do: hai nhãn này đã là tiếng Anh trong bản gốc. */
const SIMULATOR_HEADING = "Technical Debt Leverage Simulator";
const MOIC_LABEL = "Return on in-house effort";
/* i18n-ignore-end */

function FundingStructure({ c }: { c: LaunchEffortLessonCopy }) {
  const [debtPct, setDebtPct] = useState(60);
  const equityPct = 100 - debtPct;
  const dealSize = 1000;
  const debt = (debtPct / 100) * dealSize;
  const equity = (equityPct / 100) * dealSize;

  const exitMultiple = 10;
  const entryHoursSaved = 80;
  const exitHoursSaved = entryHoursSaved * 1.5;
  const exitEV = exitMultiple * exitHoursSaved;
  const remainingDebt = debt * 0.5;
  const exitEquity = exitEV - remainingDebt;
  const moic = exitEquity / equity;

  return (
    <div className="my-6 overflow-hidden rounded-md border border-line-strong bg-white dark:border-stone-700 dark:bg-stone-900">
      <div className="flex h-9 items-center border-b border-stone-300 bg-surface-raised px-3 dark:border-stone-700 dark:bg-stone-950">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{SIMULATOR_HEADING}</h3>
      </div>
      <div className="space-y-5 p-4 sm:p-5">
        <div>
          <label className="mb-1 block text-xs font-semibold text-ink-soft">{format(c.debtShareLabel, { debt: debtPct, proper: equityPct })}</label>
          <input type="range" min={20} max={80} value={debtPct} onChange={e => setDebtPct(+e.target.value)} className="w-full accent-brand-600" />
        </div>

        <div>
          <div className="mb-2 text-xs font-semibold text-ink-soft">{format(c.dealSizeLabel, { size: dealSize })}</div>
          <div className="mb-3 flex h-8 overflow-hidden rounded-sm border border-line-strong">
            <div className="flex items-center justify-center bg-brand-600 text-xs font-bold text-white transition-[width] dark:bg-brand-500 dark:text-stone-950" style={{ width: `${equityPct}%` }}>
              {format(c.equityShare, { pct: equityPct })}
            </div>
            <div className="flex items-center justify-center bg-stone-700 text-xs font-bold text-white transition-[width] dark:bg-stone-600" style={{ width: `${debtPct}%` }}>
              {format(c.debtShare, { pct: debtPct })}
            </div>
          </div>
          <div className="grid grid-cols-2 border-y border-stone-200 text-sm dark:border-stone-800">
            <div className="py-2.5">
              <div className="font-mono font-medium tabular-nums text-accent-strong">{format(c.billion, { value: equity.toFixed(0) })}</div>
              <div className="text-xs text-ink-muted">{c.equityCaption}</div>
            </div>
            <div className="border-l border-stone-200 py-2.5 pl-3 dark:border-stone-800">
              <div className="font-mono font-medium tabular-nums text-ink-max">{format(c.billion, { value: debt.toFixed(0) })}</div>
              <div className="text-xs text-ink-muted">{c.debtCaption}</div>
            </div>
          </div>
        </div>

        {/* Kết quả: khối mực, như terminal cuối HeroEditor. */}
        <div className="rounded-sm bg-stone-950 p-4 text-sm text-stone-300">
          <div className="mb-2 text-xs font-semibold text-stone-400">{c.exitAssumption}</div>
          <div className="mb-1 flex justify-between gap-3">
            <span>{format(c.exitEvLabel, { multiple: exitMultiple, hours: exitHoursSaved })}</span>
            <span className="font-mono tabular-nums text-white">{format(c.billion, { value: exitEV.toFixed(0) })}</span>
          </div>
          <div className="mb-2 flex justify-between gap-3">
            <span>{c.remainingDebtLabel}</span>
            <span className="font-mono tabular-nums text-stone-300">−{format(c.billion, { value: remainingDebt.toFixed(0) })}</span>
          </div>
          <div className="flex items-baseline justify-between gap-3 border-t border-stone-700 pt-2">
            <span className="font-bold text-white">{MOIC_LABEL}</span>
            <span className="font-mono text-lg font-medium tabular-nums text-brand-300">{moic.toFixed(1)}x</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// `correct` đọc từ đây, KHÔNG từ từ điển: nó là chỉ số vào mảng options và
// LessonPageLayout ghi `quiz_score` xuống Cloudflare. Một bản dịch đổi được nó là
// một bản dịch đổi được đáp án.
const QUIZ_CORRECT = [3, 0, 2, 1, 0];

export default function Page() {
  const { t } = useI18n();
  // Ép kiểu một lần ở đây thay vì `?.` ở ba mươi chỗ render - xem chú thích
  // của LaunchEffortLessonCopy về việc bộ kiểm nào làm cho phép ép này an toàn.
  const c = t.bespokeLessons["nguon-luc-cho-mot-lan-ra-mat"] as LaunchEffortLessonCopy;

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
      <div>
        <h2 className="text-2xl font-black leading-tight tracking-tight text-ink-max">{c.heading}</h2>
        <p className="mt-2 max-w-[68ch] text-lg leading-8 text-ink-soft">{c.intro}</p>
      </div>

      <section>
        <h3 className="mb-3 border-b border-stone-300 pb-2 text-lg font-black tracking-tight text-ink-max dark:border-stone-700">{c.sourcesHeading}</h3>
        <div className="space-y-3">
          {c.sources.map((s, i) => (
            <div key={SOURCE_TYPES[i]} className="rounded-md border border-line-strong bg-white p-4 dark:border-stone-700 dark:bg-stone-900">
              <div className="mb-2 flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-sm border border-line-strong text-ink-body dark:border-stone-700">
                  {createElement(SOURCE_ICONS[i], { "aria-hidden": true, className: "h-4 w-4", strokeWidth: 1.75 })}
                </span>
                <span className="font-bold text-ink-max">{SOURCE_TYPES[i]}</span>
              </div>
              <p className="mb-2 max-w-[68ch] text-base leading-7 text-ink-body">{s.desc}</p>
              <p className="mb-3 border-l-2 border-stone-300 pl-3 text-sm leading-6 text-ink-soft dark:border-stone-700">{s.example}</p>
              <div className="grid grid-cols-1 gap-2 text-sm leading-6 sm:grid-cols-2">
                <div className="flex gap-1.5"><Check aria-hidden className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-accent-strong" strokeWidth={2} /><span className="text-ink-body">{s.pro}</span></div>
                <div className="flex gap-1.5"><X aria-hidden className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-red-600 dark:text-red-400" strokeWidth={2} /><span className="text-ink-body">{s.con}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FundingStructure c={c} />

      <section>
        <h3 className="mb-3 border-b border-stone-300 pb-2 text-lg font-black tracking-tight text-ink-max dark:border-stone-700">{c.checklistHeading}</h3>
        <ol className="divide-y divide-stone-200 rounded-md border border-line-strong bg-white dark:divide-stone-800 dark:border-stone-700 dark:bg-stone-900">
          {c.checklist.map((item, i) => (
            <li key={i} className="flex items-baseline gap-3 px-4 py-3 text-base leading-7">
              <Sys className="flex-shrink-0 text-ink-faint">{String(i + 1).padStart(2, "0")}</Sys>
              <span className="text-ink-body">{item}</span>
            </li>
          ))}
        </ol>
      </section>
    </LessonPageLayout>
  );
}
