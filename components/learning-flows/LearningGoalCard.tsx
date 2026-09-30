"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { ArrowRight, Check, CheckCircle2, Lightbulb } from "lucide-react";
import Glyph from "@/components/Glyph";
import CoCoSays from "@/components/CoCoSays";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { LEARNING_FLOWS, getLearningFlow, type FlowId } from "@/lib/learning-flows";
import { getLearningGoalState, saveLearningGoal, type LearningGoalState } from "@/app/actions/learning-goal";
import { cleanLessonTitle } from "@/components/learning-flows/lesson-title";
import { CapabilityFacts, effortLabel } from "@/components/learning-flows/capability";
import { btnPrimary, textLink } from "@/components/ui/system";
import MissionPicker from "@/components/learning-flows/MissionPicker";

/** Công sức của từng lối: số bài và tổng phút, tính ở server từ meta bài. */
export type FlowEffort = Partial<Record<FlowId, { count: number; minutes: number }>>;

/**
 * "Bạn muốn làm được gì?" - câu hỏi đầu tiên cho người mới, và thẻ tiến độ cho
 * người đã chọn. Cùng một component trên /lo-trinh và dashboard, vì đó là
 * cùng một câu hỏi: đặt hai bản thì hai bản sẽ lệch nhau.
 *
 * Tự tải trạng thái qua server action như các widget khác trên dashboard,
 * thay vì bắt trang cha đọc thêm cột: DashboardClient lo xác thực ở phía
 * client, và trang server của nó cố ý không gọi getUser().
 *
 * Chưa chọn → mỗi lối học là một NĂNG LỰC: tên việc, công sức (số bài · giờ),
 * kỹ năng có được và output cầm được ở cuối. Chọn là HAI BƯỚC: bấm thẻ để
 * đánh dấu, thấy thứ đầu tiên mình sẽ làm ra, rồi mới bấm "Bắt đầu" để lưu.
 * Một cú bấm lưu ngay từng làm thẻ biến mất trước khi người đọc kịp so hai lối.
 *
 * Đã chọn → hành trình đó: tiến độ, thứ đầu tiên làm ra (nếu chưa học bài
 * nào) hoặc câu chốt Feynman của chặng đang học, và nút vào đúng bài tiếp.
 *
 * `effort` chỉ /lo-trinh truyền (nó có meta bài ở server); dashboard không
 * truyền thì thẻ chỉ ghi số bài, không đoán số giờ.
 */
/**
 * `quiet`: dashboard đặt thẻ này ở cột phải, cạnh thẻ "Hôm nay làm gì" - nên
 * ở đó nó là thông tin phụ: vạch trái nhạt và nút "Học tiếp" không phải khối
 * xanh đặc, để trang chỉ có một hành động chính.
 */
/**
 * `warm`: bản của khu "Lộ trình" trên dashboard. Bộ chọn chỉ còn tên mục tiêu,
 * thời lượng và một dòng thành quả (không khối KỸ NĂNG/OUTPUT, không lưới kẻ
 * ô); tông xanh của app (bản đầu dùng cam đất - người dùng yêu cầu về xanh).
 * /hoc-theo-nhu-cau vẫn dùng bản đầy đủ.
 */
/**
 * `mission`: bản của /lo-trinh - bộ chọn dạng "chọn nhiệm vụ" (MissionPicker),
 * output là nhân vật chính, bốn hướng cho người mới nổi lên trước.
 */
export default function LearningGoalCard({ id, effort, quiet = false, warm = false, mission = false }: { id?: string; effort?: FlowEffort; quiet?: boolean; warm?: boolean; mission?: boolean } = {}) {
  const { t, locale } = useI18n();
  const c = t.learningFlows.goalCard;
  const r = t.revampGoals;
  const [state, setState] = useState<LearningGoalState | null | undefined>(undefined);
  const [candidate, setCandidate] = useState<FlowId | null>(null);
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
    if (goal === null) setCandidate(previous);
    startTransition(async () => {
      const res = await saveLearningGoal(goal).catch(() => ({ ok: false }));
      if (!res.ok) {
        setFailed(true);
        setState((s) => (s ? { ...s, goal: previous } : s));
      }
    });
  };

  const effortOf = (fid: FlowId) =>
    effortLabel(r, locale, effort?.[fid]?.count ?? state.progress[fid].total, effort?.[fid]?.minutes);

  const flow = state.goal ? getLearningFlow(state.goal) : undefined;

  if (!flow && mission) {
    return (
      <section id={id} className="scroll-mt-6">
        <MissionPicker state={state} effortOf={effortOf} pending={pending} onStart={(fid) => choose(fid)} />
        {failed ? <p className="mt-3 text-sm font-bold text-red-600 dark:text-red-400">{c.saveFailed}</p> : null}
      </section>
    );
  }

  if (!flow && warm) {
    const picked = candidate ? getLearningFlow(candidate) : undefined;
    return (
      <section id={id} className="scroll-mt-6">
        <h3 className="text-base font-black tracking-tight text-ink-max dark:text-stone-100">{c.pickTitle}</h3>
        <p className="mt-1 text-sm leading-6 text-ink-body dark:text-stone-300">{r.pickHint}</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {LEARNING_FLOWS.map((f) => {
            const on = candidate === f.id;
            const fp = state.progress[f.id];
            const pct = fp.total ? Math.round((fp.done / fp.total) * 100) : 0;
            return (
              <li key={f.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  disabled={pending}
                  onClick={() => setCandidate(on ? null : f.id)}
                  className={`group flex h-full w-full flex-col gap-3 rounded-[18px] p-4 text-left transition-[background-color,box-shadow,transform,opacity] duration-200 disabled:opacity-60 motion-safe:hover:-translate-y-0.5 ${
                    on
                      ? "bg-brand-50 shadow-[0_10px_28px_-16px_rgba(41,97,184,0.7)] ring-2 ring-brand-600 dark:bg-brand-950/50 dark:ring-brand-400"
                      : `bg-brand-50/60 ring-1 ring-brand-100 hover:bg-brand-50 hover:shadow-[0_10px_28px_-18px_rgba(41,97,184,0.6)] hover:ring-brand-300 dark:bg-white/5 dark:ring-white/10 dark:hover:bg-white/10 ${candidate ? "opacity-60 hover:opacity-100" : ""}`
                  }`}
                >
                  <span className="flex w-full items-start gap-3">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${on ? "bg-brand-600 text-white" : "bg-white text-brand-600 shadow-sm group-hover:bg-brand-600 group-hover:text-white dark:bg-stone-900 dark:text-brand-300"}`}>
                      <Glyph emoji={f.emoji} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-black leading-snug tracking-tight text-ink-max dark:text-stone-100">{t.learningFlows.flows[f.id].title}</span>
                      <span className="mt-1 flex items-start gap-1.5 text-[13px] font-semibold leading-snug text-brand-800 dark:text-brand-200">
                        <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" aria-hidden />
                        <span className="line-clamp-2">{r.flows[f.id].output}</span>
                      </span>
                    </span>
                    {on ? <Check className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden /> : null}
                  </span>
                  <span className="mt-auto flex items-center gap-3 pl-[52px]">
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white ring-1 ring-brand-100 dark:bg-white/10 dark:ring-0">
                      <span className="block h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400" style={{ width: `${Math.max(fp.done ? 4 : 0, pct)}%` }} />
                    </span>
                    <span className="shrink-0 font-mono text-[11px] font-semibold tabular-nums text-ink-muted dark:text-stone-400">
                      {fp.done > 0 ? `${fp.done}/${fp.total}` : effortOf(f.id)}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        {picked ? (
          <div className="mt-5 border-l-2 border-brand-600 pl-5 dark:border-brand-400">
            <CoCoSays key={picked.id} lines={[r.flows[picked.id].firstBuild]} size={36} />
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={pending}
                onClick={() => choose(picked.id)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
              >
                {format(r.startWith, { title: t.learningFlows.flows[picked.id].title })}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <Link href={`/hoc-theo-nhu-cau/${picked.id}`} className="text-sm font-semibold text-ink-muted underline-offset-4 hover:underline">
                {c.preview}
              </Link>
            </div>
          </div>
        ) : null}
        {failed ? <p className="mt-3 text-sm font-bold text-red-600 dark:text-red-400">{c.saveFailed}</p> : null}
      </section>
    );
  }

  if (!flow) {
    const picked = candidate ? getLearningFlow(candidate) : undefined;
    return (
      <section id={id} className="scroll-mt-6">
        <div className="flex items-baseline justify-between gap-3 border-b-2 border-ink-max pb-2">
          <h2 className="text-lg font-black tracking-tight text-ink-max">{c.pickTitle}</h2>
          <span className="font-mono text-[11px] tabular-nums text-ink-faint">{LEARNING_FLOWS.length}</span>
        </div>
        <p className="mt-1.5 text-sm leading-6 text-ink-soft">{r.pickHint}</p>

        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {LEARNING_FLOWS.map((f) => {
            const p = state.progress[f.id];
            const copy = t.learningFlows.flows[f.id];
            const cap = r.flows[f.id];
            const on = candidate === f.id;
            return (
              // Nút chọn và link xem trước là hai phần tử ANH EM, không lồng:
              // <a> trong <button> là HTML sai, và bấm vào đâu thì trình duyệt
              // tự chọn một trong hai. Xem trước cần có vì /hoc-theo-nhu-cau
              // chuyển người đã đăng nhập về đây - không có link này thì họ
              // phải chọn mù rồi mới thấy hành trình gồm những gì.
              <li
                key={f.id}
                // Mỗi mục là một thẻ riêng có viền xanh mảnh (trước là lưới
                // kẻ ô xám liền nhau - đọc như một bảng, không như lựa chọn).
                // Rê chuột: viền đậm lên và nổi nhẹ; đang chọn: viền 2px.
                className={`relative flex flex-col overflow-hidden rounded-card border transition-[border-color,box-shadow,background-color] duration-200 ${
                  on
                    ? "border-brand-600 bg-brand-50 ring-1 ring-brand-600 dark:border-brand-400 dark:bg-brand-950/40 dark:ring-brand-400"
                    : `group border-brand-300 bg-surface hover:border-brand-500 hover:shadow-[0_6px_18px_-12px_rgba(41,97,184,0.55)] dark:border-brand-900 dark:hover:border-brand-600 ${candidate ? "[&>*]:opacity-60 [&>*]:transition-opacity hover:[&>*]:opacity-100" : ""}`
                }`}
              >
                {/* Thanh trái 3px: dấu chọn đọc được cả khi không phân biệt màu nền. */}
                <span
                  aria-hidden
                  className={`absolute inset-y-0 left-0 w-[3px] transition-colors ${on ? "bg-brand-600 dark:bg-brand-500" : "bg-brand-300 group-hover:bg-brand-500 dark:bg-brand-800"}`}
                />
                <button
                  type="button"
                  aria-pressed={on}
                  disabled={pending}
                  onClick={() => setCandidate(on ? null : f.id)}
                  className="flex flex-1 flex-col gap-2 px-4 pt-4 pb-1.5 text-left disabled:opacity-60"
                >
                  <span className="flex w-full items-start gap-3">
                    <Glyph
                      emoji={f.emoji}
                      className={`mt-0.5 h-5 w-5 shrink-0 transition-colors ${on ? "text-accent" : "text-ink-faint group-hover:text-ink-muted"}`}
                    />
                    <span className="min-w-0 flex-1">
                      <span className={`block text-base font-black leading-snug tracking-tight ${on ? "text-brand-950 dark:text-stone-100" : "text-ink-heading"}`}>{copy.title}</span>
                      <span className="mt-0.5 block font-mono text-[11px] tabular-nums text-ink-muted">{effortOf(f.id)}</span>
                    </span>
                    {on ? (
                      <span className="inline-flex shrink-0 items-center gap-1 bg-brand-600 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white dark:bg-brand-400 dark:text-stone-950">
                        <Check className="h-3 w-3" aria-hidden />
                        {r.selected}
                      </span>
                    ) : null}
                  </span>
                  <CapabilityFacts inline r={r} skill={cap.skill} output={cap.output} className="pl-8" />
                  {p.done > 0 ? (
                    <span className="pl-8 font-mono text-[11px] tabular-nums text-cyan-700 dark:text-cyan-400">
                      {format(r.doneSoFar, { done: p.done })}
                    </span>
                  ) : null}
                  {!on ? (
                    <span className="inline-flex items-center gap-1 pl-8 text-xs font-semibold text-ink-faint transition-colors group-hover:text-accent-strong">
                      {r.select} <ArrowRight className="h-3 w-3" aria-hidden />
                    </span>
                  ) : null}
                </button>
                <Link
                  href={`/hoc-theo-nhu-cau/${f.id}`}
                  className="mb-3.5 ml-[3rem] inline-flex items-center gap-1 self-start text-xs font-bold text-ink-muted underline-offset-4 hover:text-ink-max hover:underline"
                >
                  {c.preview} <ArrowRight className="h-3 w-3" aria-hidden />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Bước hai của lựa chọn: thứ đầu tiên sẽ làm ra, rồi mới lưu. */}
        {picked ? (
          <div className="mt-4 border-l-[3px] border-brand-600 pl-4 dark:border-brand-400">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-faint">{r.firstBuildLabel}</p>
            <CoCoSays key={picked.id} lines={[r.flows[picked.id].firstBuild]} size={40} className="mt-2" />
            <button type="button" disabled={pending} onClick={() => choose(picked.id)} className={`${btnPrimary} mt-3`}>
              {format(r.startWith, { title: t.learningFlows.flows[picked.id].title })}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        ) : null}
        {failed ? <p className="mt-3 text-sm font-bold text-red-600 dark:text-red-400">{c.saveFailed}</p> : null}
      </section>
    );
  }

  const copy = t.learningFlows.flows[flow.id];
  const cap = r.flows[flow.id];
  const p = state.progress[flow.id];
  const step = flow.steps[p.stepIndex];
  const stepCopy = step ? (copy.steps as Record<string, { title: string; oneLiner: string }>)[step.id] : undefined;
  const pct = p.total ? Math.round((p.done / p.total) * 100) : 0;
  const notStarted = p.done === 0;

  return (
    <section id={id} className={warm ? "scroll-mt-6" : `scroll-mt-6 bg-surface py-4 pr-4 pl-4 sm:pr-5 sm:pl-5 ${quiet ? "border-l-2 border-accent-line-mid" : "border-l-[3px] border-brand-600 dark:border-brand-400"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <Glyph emoji={flow.emoji} className={`mt-1 h-6 w-6 shrink-0 ${warm ? "text-brand-600" : "text-accent-strong"}`} />
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-faint">{c.yourGoal}</p>
            <p className={`text-lg font-black leading-snug tracking-tight ${warm ? "text-brand-950 dark:text-stone-100" : "text-ink-max"}`}>{copy.title}</p>
            <p className="mt-0.5 text-sm text-ink-soft">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-faint">{r.goalOutput}</span>{" "}
              <span className="font-bold text-ink-max">{cap.output}</span>
            </p>
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
          <span className="font-mono tabular-nums">{format(c.progress, { done: p.done, total: p.total })}</span>
        </div>
        <div className={`mt-1.5 overflow-hidden ${warm ? "h-2 rounded-full bg-surface-sunken dark:bg-white/10" : "h-1.5 bg-surface-sunken"}`}>
          <div className={`h-full motion-safe:transition-[width] motion-safe:duration-700 ${warm ? "rounded-full bg-cyan-500 dark:bg-cyan-400" : "bg-cyan-500 dark:bg-cyan-400"}`} style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Chưa học bài nào: nói rõ thứ ĐẦU TIÊN sẽ làm ra. Đã vào guồng: câu
          chốt của chặng đang học nhắc "mình học cái này để làm gì". */}
      {notStarted && p.next ? (
        <div className="mt-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-faint">{r.firstBuildLabel}</p>
          <CoCoSays lines={[cap.firstBuild]} size={40} className="mt-2" />
        </div>
      ) : stepCopy ? (
        <p className="mt-4 flex gap-2 border-l border-line pl-3 text-sm font-semibold leading-6 text-ink-max">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
          {stepCopy.oneLiner}
        </p>
      ) : null}

      {p.next ? (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold text-ink-muted">{c.nextLabel}</p>
            <p className="font-bold leading-snug text-ink-max">{cleanLessonTitle(p.next.title)}</p>
          </div>
          <Link href={`/bai-hoc/${p.next.slug}`} className={warm ? "group inline-flex shrink-0 items-center gap-2 py-2 text-sm font-bold text-ink-muted transition-colors hover:text-accent-strong" : quiet ? "group inline-flex shrink-0 items-center gap-2 rounded-sm border border-line px-3.5 py-2 text-sm font-bold text-ink-body transition-colors hover:border-line-strong hover:text-ink-max" : `${btnPrimary} shrink-0`}>
            {notStarted ? r.start : c.nextCta} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <p className="mt-4 flex gap-2 text-sm font-semibold leading-6 text-ink-max">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600 dark:text-cyan-400" aria-hidden />
          {c.finished}
        </p>
      )}

      <Link href={`/hoc-theo-nhu-cau/${flow.id}`} className={`mt-3 ${textLink}`}>
        {c.seeFlow} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
      {failed ? <p className="mt-3 text-sm font-bold text-red-600 dark:text-red-400">{c.saveFailed}</p> : null}
    </section>
  );
}
