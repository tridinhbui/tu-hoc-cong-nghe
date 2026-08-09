"use client";

import { useMemo, useState } from "react";
import { CFA_ESSAYS, essayMaxPoints, type CfaEssay } from "@/lib/cfa-essays";
import { useI18n } from "@/lib/i18n/context";
import { mergeCfaEssays } from "@/lib/cfa-essays-i18n";
import { format } from "@/lib/i18n";

/**
 * Luyện tự luận Level III.
 *
 * Quy tắc của màn này: thang chấm KHÔNG hiện cho tới khi người học bấm "Tôi đã
 * viết xong". Nhìn thấy các ý trước khi viết thì bài tập biến thành chép lại
 * danh sách, và cảm giác "mình biết mà" sẽ thay chỗ cho việc thật sự viết ra -
 * đúng cái ảo tưởng làm người ta trượt buổi sáng Level III.
 *
 * Điểm tự chấm chỉ sống trong state của component. Không lưu, không XP.
 */

function EssayCard({ essay }: { essay: CfaEssay }) {
  const { t } = useI18n();
  const [revealed, setRevealed] = useState(false);
  const [ticked, setTicked] = useState<Set<number>>(new Set());
  const max = essayMaxPoints(essay);
  const scored = essay.rubric.reduce((sum, r, i) => (ticked.has(i) ? sum + r.points : sum), 0);

  function toggle(i: number) {
    setTicked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-stone-600 dark:bg-stone-800 dark:text-stone-300">
          {essay.topic}
        </span>
        <span className="text-[11px] font-semibold text-stone-400 dark:text-stone-500">
          {format(t.cfaEssay.minutesAndPoints, { minutes: essay.minutes, max })}
        </span>
      </div>

      <p className="mt-3 text-[12px] leading-relaxed text-stone-600 dark:text-stone-300">{essay.vignette}</p>
      <p className="mt-3 rounded-xl bg-stone-50 px-3 py-2 text-[13px] font-bold leading-snug text-stone-900 dark:bg-stone-800/60 dark:text-stone-100">
        {essay.prompt}
      </p>

      {!revealed ? (
        <div className="mt-3">
          <p className="text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">
            {t.cfaEssay.writeFirstHint}
          </p>
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="mt-2 cursor-pointer rounded-full bg-stone-900 px-4 py-2 text-[11px] font-bold text-white hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
          >
            {t.cfaEssay.revealCta}
          </button>
        </div>
      ) : (
        <div className="mt-3">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">
              {t.cfaEssay.rubricTitle}
            </p>
            <p className="text-[12px] font-extrabold text-stone-900 dark:text-stone-100">
              {format(t.cfaEssay.scoredOfMax, { scored, max })}
            </p>
          </div>
          <ul className="mt-2 space-y-1.5">
            {essay.rubric.map((point, i) => (
              <li key={point.text}>
                <label className="flex cursor-pointer items-start gap-2 rounded-xl border border-stone-200 px-3 py-2 text-[12px] leading-snug text-stone-700 hover:border-stone-400 dark:border-stone-700 dark:text-stone-200">
                  <input
                    type="checkbox"
                    checked={ticked.has(i)}
                    onChange={() => toggle(i)}
                    className="mt-0.5 cursor-pointer"
                  />
                  <span className="flex-1">{point.text}</span>
                  <span className="shrink-0 text-[11px] font-bold text-stone-400 dark:text-stone-500">
                    {point.points}{t.cfaEssay.pointsSuffix}
                  </span>
                </label>
              </li>
            ))}
          </ul>
          <p className="mt-2.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[12px] leading-relaxed text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
            <span className="font-bold">{t.cfaEssay.commonMistakeLabel}</span>
            {essay.commonMistake}
          </p>
        </div>
      )}
    </article>
  );
}

export default function CfaEssayPractice() {
  const { t, locale } = useI18n();
  // Nội dung đề nằm ngoài từ điển UI - xem lib/cfa-essays-i18n.
  const essays = useMemo(() => mergeCfaEssays(CFA_ESSAYS, locale), [locale]);
  return (
    <section className="mt-6 rounded-[24px] border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
      <h3 className="text-base font-extrabold text-stone-900 dark:text-stone-100">
        {t.cfaEssay.sectionTitle}
      </h3>
      <p className="mt-1 max-w-2xl text-xs leading-relaxed text-stone-500 dark:text-stone-400">
        {t.cfaEssay.sectionBlurb}
      </p>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {essays.map((essay) => (
          <EssayCard key={essay.id} essay={essay} />
        ))}
      </div>
    </section>
  );
}
