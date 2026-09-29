"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Glyph from "@/components/Glyph";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { Sys, tabClass } from "@/components/ui/system";
import type { ResourceClassLessonCopy } from "@/lib/i18n/dictionaries/sections/bespoke-lessons";

/* i18n-ignore-start: `title`, `subtitle` và `nextTitle` đã có lớp phủ trong
   lib/i18n/dictionaries/sections/bespoke-lessons.ts; trang dựng `lesson` từ
   `LESSON` rồi ghi đè ba trường đó theo ngôn ngữ. `difficulty` là union tiếng
   Việt dùng làm giá trị khắp ứng dụng, và `duration` chỉ được parse lấy số. */
const LESSON: LessonMeta = {
  // Id tổng hợp, KHÔNG phải id trong corpus. Trang này chưa có bài tương ứng
  // trong lib/lessons.ts nên không có id thật để ghi vào, còn id cũ (5) là id
  // của một bài Chặng 3 CÓ THẬT - nên tiến độ, XP, ghi chú và highlight của
  // trang này đều đổ sang bài đó. Xem lib/__tests__/bespoke-lesson-ids.test.ts.
  id: 9004, slug: "cac-hang-uu-tien-tai-nguyen", day: 5, accent: "teal",
  title: "Các Hạng Ưu Tiên Tài Nguyên",
  subtitle: "9 hạng công suất, thứ tự thu hồi và ai bị cắt trước khi cụm thiếu chỗ",
  duration: "8 phút", difficulty: "Trung bình", emoji: "",
  nextSlug: "cau-dieu-kien-if-else", nextTitle: "Day 6: Câu điều kiện",
};
/* i18n-ignore-end */

/* i18n-ignore-start: `correct` là chỉ số vào mảng options và LessonPageLayout
   ghi `quiz_score` xuống Cloudflare - để nó trong từ điển là để một bản dịch sửa
   được đáp án. Câu hỏi, phương án và lời giải nằm ở
   lib/i18n/dictionaries/sections/bespoke-lessons.ts. */
const QUIZ_CORRECT = [2, 3, 0, 3, 1];
/* i18n-ignore-end */

/* i18n-ignore-start: `name` của chín hạng công suất vốn ĐÃ là tiếng Anh trong
   bản gốc ("Reserved Instance", "Spot Capacity") - chúng là thuật ngữ ngành,
   giống nhau ở cả hai ngôn ngữ, nên không thuộc về một từ điển hai ngôn ngữ.
   `risk` và `rate` là số vẽ thanh trượt; `emoji` không dịch. Phần chữ - `tag`,
   `desc`, `eg` - nằm trong `debtTypes` của từ điển, khớp THEO VỊ TRÍ với mảng
   này. */
const DEBT_TYPES = [
  { id: "reserved", emoji: "🔒", name: "Guaranteed Reservation", risk: 10, rate: 5 },
  { id: "besteffort", emoji: "🔓", name: "Best-Effort Quota", risk: 30, rate: 8 },
  { id: "system", emoji: "👑", name: "System Critical", risk: 15, rate: 6 },
  { id: "batch", emoji: "", name: "Deferrable Batch", risk: 50, rate: 12 },
  { id: "burst", emoji: "🔄", name: "Burst Credit", risk: 20, rate: 7 },
  { id: "committed", emoji: "📅", name: "Committed Use", risk: 25, rate: 7 },
  { id: "promote", emoji: "🔀", name: "Promotable Class", risk: 45, rate: 6 },
  { id: "ri", emoji: "🏛️", name: "Reserved Instance", risk: 25, rate: 9 },
  { id: "spot", emoji: "🔶", name: "Spot Capacity", risk: 65, rate: 18 },
];

/** Tên bốn tầng trong thác phân bổ và trong bảng trộn hạng. Cùng lý do với
 *  `name` ở trên: chúng là tên hạng bằng tiếng Anh trong cả hai bản. */
const WATERFALL_LAYERS = [
  { name: "System Critical", amount: 200 },
  { name: "Guaranteed Reserved", amount: 150 },
  { name: "Deferrable Batch", amount: 100 },
  { name: "Spot", amount: 50 },
];

const LBO_ROWS = [
  { layer: "Committed Use (1 năm)", pct: "50%", rate: "-30% giá niêm yết" },
  { layer: "Reserved Instance (3 năm)", pct: "20%", rate: "-50% giá niêm yết" },
  { layer: "Burst Credit", pct: "10%", rate: "×1.2 lúc cao điểm" },
  { layer: "Spot Capacity", pct: "20%", rate: "" },
];
/* i18n-ignore-end */

function CapacityWaterfallAnimation({ c }: { c: ResourceClassLessonCopy }) {
  const [scenario, setScenario] = useState<"normal" | "distress">("normal");
  const assets = scenario === "normal" ? 600 : 280;
  let remaining = assets;
  const payouts = WATERFALL_LAYERS.map(l => { const p = Math.min(remaining, l.amount); remaining = Math.max(0, remaining - l.amount); return p; });

  return (
    <div className="my-6 overflow-hidden rounded-md border border-line-strong bg-white dark:border-stone-700 dark:bg-stone-900">
      <div className="flex h-9 items-center border-b border-stone-300 bg-surface-raised px-3 dark:border-stone-700 dark:bg-stone-950">
        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{c.waterfallHeading}</span>
      </div>
      <div className="space-y-4 p-4 sm:p-5">
        {/* Kịch bản: tab chữ, gạch dưới xanh - không phải viên thuốc. */}
        <div role="tablist" className="flex gap-5 border-b border-line">
          {(["normal", "distress"] as const).map(sc => (
            <button key={sc} role="tab" aria-selected={scenario === sc} onClick={() => setScenario(sc)} className={tabClass(scenario === sc)}>
              {sc === "normal" ? c.scenarioNormal : c.scenarioDistress}
            </button>
          ))}
        </div>
        <div className="divide-y divide-stone-200 border-y border-stone-200 dark:divide-stone-800 dark:border-stone-800">
          {WATERFALL_LAYERS.map((layer, i) => {
            const pct = (payouts[i] / layer.amount) * 100;
            const fullPaid = payouts[i] >= layer.amount;
            return (
              <div key={layer.name} className="py-3">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-ink-max">{layer.name}</span>
                  <span className={`inline-flex items-center gap-1 font-mono text-sm tabular-nums ${fullPaid ? "text-ink-body" : "text-danger"}`}>
                    {format(c.payoutLine, { paid: payouts[i], total: layer.amount })}
                    {!fullPaid && <X aria-hidden className="h-4 w-4" strokeWidth={2} />}
                  </span>
                </div>
                <div className="h-1.5 bg-surface-sunken">
                  <div
                    className={`h-full transition-[width] duration-700 ${fullPaid ? "bg-brand-600 dark:bg-brand-500" : "bg-red-500"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <p className="border-l-2 border-stone-950 pl-4 text-sm leading-7 text-ink-body dark:border-stone-200">
          {scenario === "normal" ? c.verdictNormal : c.verdictDistress}
        </p>
      </div>
    </div>
  );
}

export default function CacHangUuTienTaiNguyenPage() {
  const { t } = useI18n();
  // Ép kiểu một lần - xem chú thích của ResourceClassLessonCopy về bộ kiểm làm cho phép
  // ép này an toàn.
  const c = t.bespokeLessons["cac-hang-uu-tien-tai-nguyen"] as ResourceClassLessonCopy;

  const lesson: LessonMeta = { ...LESSON, title: c.title, subtitle: c.subtitle, nextTitle: c.nextTitle };
  const quiz: QuizQuestion[] = c.quiz.map((q, i) => ({
    question: q.question,
    options: q.options,
    correct: QUIZ_CORRECT[i],
    explanation: q.explanation,
  }));

  return (
    <LessonPageLayout lesson={lesson} quiz={quiz}>
      <div className="space-y-8 text-lg leading-8 text-ink-body">

        <section className="max-w-[68ch] space-y-4">
          <h2 className="text-2xl font-black leading-tight tracking-tight text-ink-max">{c.heading}</h2>
          <p>{c.intro}</p>
          <p>{c.intro2}</p>
        </section>

        <section className="space-y-4">
          <h2 className="border-t border-stone-300 pt-5 text-2xl font-black leading-tight tracking-tight text-ink-max dark:border-stone-700">{c.ruleHeading}</h2>
          <p className="max-w-[68ch]">{c.ruleLead}</p>
          <div className="rounded-md bg-stone-950 p-5 text-white">
            <div className="mb-2 text-xl font-black tracking-tight text-white">{c.ruleBanner}</div>
            <p className="text-sm leading-6 text-stone-300">{c.ruleNote}</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="border-t border-stone-300 pt-5 text-2xl font-black leading-tight tracking-tight text-ink-max dark:border-stone-700">{c.typesHeading}</h2>
          <div className="divide-y divide-stone-200 overflow-hidden rounded-md border border-line-strong bg-white dark:divide-stone-800 dark:border-stone-700 dark:bg-stone-900">
            {DEBT_TYPES.map((d, i) => (
              <div key={d.id} className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm border border-line-strong text-ink-body dark:border-stone-700"><Glyph emoji={d.emoji} className="h-4 w-4" /></span>
                    <div>
                      <div className="text-sm font-bold text-ink-max">{d.name}</div>
                      <div className="mt-0.5 text-xs text-ink-muted">
                        {format(c.rateSuffix, { tag: c.debtTypes[i].tag, rate: d.rate })}
                      </div>
                    </div>
                  </div>
                  <div className="ml-2 h-1.5 w-16 flex-shrink-0 bg-surface-sunken">
                    <div className="h-full bg-stone-600 dark:bg-stone-400" style={{ width: `${d.risk}%` }} />
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <p className="max-w-[68ch] text-base leading-7 text-ink-body">{c.debtTypes[i].desc}</p>
                  <p className="border-l-2 border-stone-300 pl-3 text-sm leading-6 text-ink-soft dark:border-stone-700">{c.debtTypes[i].eg}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CapacityWaterfallAnimation c={c} />

        <section className="space-y-4">
          <h2 className="border-t border-stone-300 pt-5 text-2xl font-black leading-tight tracking-tight text-ink-max dark:border-stone-700">{c.lboHeading}</h2>
          <p className="max-w-[68ch]">{c.lboLead}</p>
          <div className="overflow-hidden rounded-md border border-line-strong bg-white text-sm dark:border-stone-700 dark:bg-stone-900">
            <div className="border-b border-stone-300 bg-surface-raised px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted dark:border-stone-700 dark:bg-stone-950">{c.lboTableTitle}</div>
            <div className="divide-y divide-stone-200 dark:divide-stone-800">
              {LBO_ROWS.map((r, i) => (
                <div key={r.layer} className="flex items-baseline gap-3 px-4 py-2.5">
                  <Sys className="flex-shrink-0 text-ink-faint">{String(i + 1).padStart(2, "0")}</Sys>
                  <div className="flex-1">
                    <div className="font-semibold text-ink-max">{r.layer}</div>
                    <div className="text-xs text-ink-muted">
                      {r.pct} · {c.lboAmounts[i]} · {r.rate || c.lboEquityRate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="max-w-[68ch] text-sm leading-6 text-ink-soft">{c.lboNote}</p>
        </section>

        <div className="border-l-2 border-stone-950 pl-4 dark:border-stone-200 sm:pl-5">
          <h3 className="mb-3 text-lg font-black tracking-tight text-ink-max">{c.takeawayHeading}</h3>
          <ol className="space-y-2">
            {c.takeaways.map((item, i) => (
              <li key={i} className="flex max-w-[68ch] items-baseline gap-3 text-base leading-7 text-ink-body">
                <Sys className="flex-shrink-0 text-ink-faint">{String(i + 1).padStart(2, "0")}</Sys>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </LessonPageLayout>
  );
}
