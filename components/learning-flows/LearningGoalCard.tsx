"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Lightbulb } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { LEARNING_FLOWS, getLearningFlow, type FlowId } from "@/lib/learning-flows";
import { getLearningGoalState, saveLearningGoal, type LearningGoalState } from "@/app/actions/learning-goal";
import { cleanLessonTitle } from "@/components/learning-flows/lesson-title";

/**
 * "Bạn muốn làm gì?" - câu hỏi đầu tiên cho người mới, và thẻ tiến độ cho
 * người đã chọn. Cùng một component trên /lo-trinh và dashboard, vì đó là
 * cùng một câu hỏi: đặt hai bản thì hai bản sẽ lệch nhau.
 *
 * Tự tải trạng thái qua server action như các widget khác trên dashboard,
 * thay vì bắt trang cha đọc thêm cột: DashboardClient lo xác thực ở phía
 * client, và trang server của nó cố ý không gọi getUser().
 *
 * Chưa chọn → bốn thẻ nhu cầu. Đã chọn → hành trình đó: tiến độ, câu chốt
 * Feynman của chặng đang học, và nút vào đúng bài tiếp theo. Câu chốt đứng ở
 * đây vì nó là thứ ngắn nhất nhắc người học "mình đang học cái này để làm gì".
 */
export default function LearningGoalCard() {
  const { t } = useI18n();
  const c = t.learningFlows.goalCard;
  const [state, setState] = useState<LearningGoalState | null | undefined>(undefined);
  const [failed, setFailed] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    let alive = true;
    getLearningGoalState()
      .then((s) => alive && setState(s))
      .catch(() => alive && setState(null));
    return () => {
      alive = false;
    };
  }, []);

  if (!state) return null;

  const choose = (goal: FlowId | null) => {
    const previous = state.goal;
    setFailed(false);
    setState({ ...state, goal });
    startTransition(async () => {
      const res = await saveLearningGoal(goal).catch(() => ({ ok: false }));
      if (!res.ok) {
        setFailed(true);
        setState((s) => (s ? { ...s, goal: previous } : s));
      }
    });
  };

  const flow = state.goal ? getLearningFlow(state.goal) : undefined;

  if (!flow) {
    return (
      <section className="rounded-2xl border border-amber-300/70 bg-amber-50/70 p-4 sm:p-5 dark:border-amber-500/30 dark:bg-amber-500/[0.06]">
        <p className="text-lg font-black text-ink-max">{c.pickTitle}</p>
        <p className="mt-1 text-sm leading-6 text-ink-body">{c.pickSub}</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {LEARNING_FLOWS.map((f) => {
            const p = state.progress[f.id];
            return (
              <button
                key={f.id}
                type="button"
                disabled={pending}
                onClick={() => choose(f.id)}
                className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-3 text-left transition-colors hover:border-emerald-600 disabled:opacity-60 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-emerald-500"
              >
                <span className="text-2xl" aria-hidden>{f.emoji}</span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold text-ink-muted">“{t.learningFlows.flows[f.id].need}”</span>
                  <span className="block font-black text-ink-max">{t.learningFlows.flows[f.id].title}</span>
                  {p.done > 0 ? (
                    <span className="block text-xs text-accent-strong">{format(c.progress, { done: p.done, total: p.total })}</span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
        {failed ? <p className="mt-3 text-sm font-bold text-red-600 dark:text-red-400">{c.saveFailed}</p> : null}
      </section>
    );
  }

  const copy = t.learningFlows.flows[flow.id];
  const p = state.progress[flow.id];
  const step = flow.steps[p.stepIndex];
  const stepCopy = step ? (copy.steps as Record<string, { title: string; oneLiner: string }>)[step.id] : undefined;
  const pct = p.total ? Math.round((p.done / p.total) * 100) : 0;

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 dark:border-stone-800 dark:bg-stone-900">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="text-3xl" aria-hidden>{flow.emoji}</span>
          <div className="min-w-0">
            <p className="eyebrow text-accent-strong">{c.yourGoal}</p>
            <p className="font-black leading-snug text-ink-max">{copy.title}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => choose(null)}
          disabled={pending}
          className="shrink-0 text-xs font-bold text-ink-muted underline-offset-4 hover:text-ink-max hover:underline"
        >
          {c.change}
        </button>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-ink-muted">
          <span>{step ? format(c.stepNow, { n: p.stepIndex + 1 }) : null}</span>
          <span className="tabular-nums">{format(c.progress, { done: p.done, total: p.total })}</span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-raised">
          <div className="h-full rounded-full bg-emerald-600 dark:bg-emerald-500" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {stepCopy ? (
        <p className="mt-4 flex gap-2 rounded-xl bg-amber-50 px-3 py-2.5 text-sm font-semibold leading-6 text-ink-max dark:bg-amber-500/10">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden />
          {stepCopy.oneLiner}
        </p>
      ) : null}

      {p.next ? (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold text-ink-muted">{c.nextLabel}</p>
            <p className="font-bold leading-snug text-ink-max">{cleanLessonTitle(p.next.title)}</p>
          </div>
          <Link
            href={`/bai-hoc/${p.next.slug}`}
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
          >
            {c.nextCta} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <p className="mt-4 flex gap-2 text-sm font-semibold leading-6 text-ink-max">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-hidden />
          {c.finished}
        </p>
      )}

      <Link
        href={`/hoc-theo-nhu-cau/${flow.id}`}
        className="mt-3 inline-flex items-center gap-1 text-sm font-black text-accent-strong underline-offset-4 hover:underline"
      >
        {c.seeFlow} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
      {failed ? <p className="mt-3 text-sm font-bold text-red-600 dark:text-red-400">{c.saveFailed}</p> : null}
    </section>
  );
}
