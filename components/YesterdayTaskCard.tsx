"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CoCoSays from "@/components/CoCoSays";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { trackFeatureClick } from "@/lib/feature-events";
import { Sys, btnPrimary, btnSecondary, panel } from "@/components/ui/system";

interface YesterdayTask {
  lessonId: number;
  lessonSlug: string;
  lessonTitle: string;
  message: string;
  nextSlug: string | null;
  nextTitle: string | null;
}

type Answer = "tried" | "notYet";

/** Câu trả lời chỉ để thẻ không hỏi lại trên cùng máy - tiện ích theo người
 *  xem, không phải dữ liệu cần giữ. Không đọc được (chế độ riêng tư) thì thẻ
 *  vẫn chạy, chỉ là hỏi lại lần sau. */
const answerKey = (lessonId: number) => `yesterday_task_${lessonId}`;

function readAnswer(lessonId: number): Answer | null {
  try {
    const v = window.localStorage.getItem(answerKey(lessonId));
    return v === "tried" || v === "notYet" ? v : null;
  } catch {
    return null;
  }
}

/**
 * "Hôm qua bạn thử chưa?" - hỏi lại việc "Làm ngay" của bài vừa học xong hôm
 * trước, rồi mới dẫn sang bài kế. Xem app/api/yesterday-task/route.ts cho lý
 * do và cửa sổ thời gian. Không có việc nào trong cửa sổ thì thẻ không hiện.
 */
export default function YesterdayTaskCard() {
  const { t } = useI18n();
  const c = t.revampDashboard.yesterdayTask;
  const [task, setTask] = useState<YesterdayTask | null>(null);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [answeredBefore, setAnsweredBefore] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/yesterday-task", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { task: null }))
      .then((data: { task: YesterdayTask | null }) => {
        if (cancelled || !data.task) return;
        // Đã trả lời trên máy này thì không hỏi lại.
        if (readAnswer(data.task.lessonId)) {
          setAnsweredBefore(true);
          return;
        }
        setTask(data.task);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!task || answeredBefore) return null;

  function choose(a: Answer) {
    setAnswer(a);
    trackFeatureClick("yesterday_task_answer", { label: `${task!.lessonSlug}:${a}` });
    try {
      window.localStorage.setItem(answerKey(task!.lessonId), a);
    } catch {
      /* chế độ riêng tư - bỏ qua */
    }
  }

  return (
    <section className={`${panel} space-y-4 p-4 sm:p-5`}>
      <div className="flex items-center justify-between gap-3">
        <Sys className="text-accent-strong">{c.eyebrow}</Sys>
        <span className="truncate text-[11px] font-semibold text-ink-muted">{format(c.fromLesson, { title: task.lessonTitle })}</span>
      </div>
      <div>
        <h3 className="text-lg font-black tracking-tight text-ink-max">{c.title}</h3>
        <p className="mt-2 max-w-[68ch] border-l-2 border-brand-600 pl-3 text-sm leading-6 text-ink-body dark:border-brand-500">
          {task.message}
        </p>
      </div>

      {answer === null ? (
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => choose("tried")} className={`${btnPrimary} cursor-pointer`}>
            {c.tried}
          </button>
          <button type="button" onClick={() => choose("notYet")} className={`${btnSecondary} cursor-pointer`}>
            {c.notYet}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <CoCoSays lines={[answer === "tried" ? c.triedReply : c.notYetReply]} size={36} />
          <div className="flex flex-wrap gap-2">
            {answer === "notYet" && (
              <Link href={`/bai-hoc/${task.lessonSlug}`} className={btnSecondary}>
                {c.reopen}
              </Link>
            )}
            {task.nextSlug && task.nextTitle && (
              <Link href={`/bai-hoc/${task.nextSlug}`} className={`${answer === "tried" ? btnPrimary : btnSecondary} group`}>
                <span className="truncate">{format(c.next, { title: task.nextTitle })}</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
