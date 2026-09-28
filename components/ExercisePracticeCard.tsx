"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Code2 } from "lucide-react";
import { EXERCISES, exerciseKey } from "@/lib/exercise-index";
import { getMyExercisePasses } from "@/lib/exercise-passes";
import { format } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/context";
import { panel, textLink } from "@/components/ui/system";

/** Thước đo thực hành: số bài tập viết mã đã tự chạy đúng, trên tổng số.
 *
 *  Điểm quiz và số bài đã xong đo được việc đọc hiểu; chúng không nói được
 *  người học đã tự viết ra một dòng mã chạy đúng hay chưa. Thẻ này đặt con số
 *  đó cạnh các con số kia, kèm đường tới bài tập kế tiếp chưa làm. */
export default function ExercisePracticeCard() {
  const { t } = useI18n();
  const c = t.lessonCode.practice;
  const [passed, setPassed] = useState<Set<string> | null>(null);

  useEffect(() => {
    let alive = true;
    getMyExercisePasses().then((rows) => {
      if (alive) setPassed(new Set(rows.map((r) => exerciseKey(r.lesson_id, r.block_index))));
    });
    return () => {
      alive = false;
    };
  }, []);

  if (EXERCISES.length === 0) return null;

  const rows = (["personal", "professional"] as const).map((track) => {
    const list = EXERCISES.filter((e) => e.track === track);
    const done = passed ? list.filter((e) => passed.has(exerciseKey(e.lessonId, e.block))).length : 0;
    const next = passed ? list.find((e) => !passed.has(exerciseKey(e.lessonId, e.block))) : undefined;
    return { track, total: list.length, done, next };
  });

  return (
    <section className={`${panel} p-5`} aria-labelledby="practice-title">
      <div className="flex items-center gap-2">
        <Code2 className="h-5 w-5 shrink-0 text-ink-muted" aria-hidden />
        <h2 id="practice-title" className="text-base font-black tracking-tight text-ink-max">
          {c.title}
        </h2>
      </div>
      <p className="mt-1 max-w-[68ch] text-sm leading-6 text-ink-soft">{c.sub}</p>
      <div className="mt-4 space-y-4">
        {rows
          .filter((r) => r.total > 0)
          .map((r) => (
            <div key={r.track}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="font-bold text-ink-max">{t.tracks[r.track].tab}</span>
                <span className="font-mono text-ink-muted">
                  {passed ? format(c.count, { done: r.done, total: r.total }) : "…"}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-sunken">
                <div
                  className="h-full bg-brand-600 dark:bg-brand-500"
                  style={{ width: `${r.total ? (100 * r.done) / r.total : 0}%` }}
                />
              </div>
              {r.next ? (
                <Link href={`/bai-hoc/${r.next.slug}`} className={`${textLink} mt-2 text-xs`}>
                  {format(c.next, { title: r.next.title })}
                </Link>
              ) : passed && r.done === r.total ? (
                <p className="mt-2 text-xs text-ink-muted">{c.allDone}</p>
              ) : null}
            </div>
          ))}
      </div>
    </section>
  );
}
