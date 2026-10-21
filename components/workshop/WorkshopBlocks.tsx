"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Check, Lock } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { Reveal } from "@/components/ui/motion";
import StageScene from "./StageScene";
import { stageSceneFor } from "./stage-scene";

// "Xưởng của bạn" - trang tổng quan kể tiến độ bằng THỨ ĐƯỢC LÀM RA thay vì bằng
// số bài. Chữ của từng chặng đã có sẵn từ trước (`revampDashboard.stages[track][i]`:
// tag / headline / outcome) nhưng trang này chưa từng dùng tới; khối ở đây chỉ
// vẽ nó ra. Không có logic học nào ở đây: trạng thái chặng tính đúng như cây kỹ
// năng ở /hoc-bai (DashboardClient), để hai trang không bao giờ nói khác nhau.

export type WorkshopStageStatus = "mastered" | "active" | "started" | "notStarted" | "locked";

export type WorkshopStage = {
  key: string;
  /** Số thứ tự chặng trong tuyến, bắt đầu từ 1 - trùng "Chặng N" ở mọi trang khác. */
  n: number;
  tag: string;
  headline: string;
  outcome: string;
  done: number;
  total: number;
  status: WorkshopStageStatus;
};

/** Ba việc đầu tiên của `outcome` - đủ để thấy chặng làm ra cái gì, không thành đoạn văn. */
export function outcomeItems(outcome: string, max = 3): string[] {
  return outcome.split(" · ").map((s) => s.trim()).filter(Boolean).slice(0, max);
}

/** Banner đầu trang: chặng đang dựng, cảnh xưởng của nó, và thẻ Học tiếp (`children`). */
export function WorkshopHero({ stage, isLast, children }: { stage: WorkshopStage | null; isLast: boolean; children: ReactNode }) {
  const { t } = useI18n();
  const r = t.revampDashboard;
  const pct = stage && stage.total > 0 ? Math.round((stage.done / stage.total) * 100) : 0;
  const left = stage ? Math.max(0, stage.total - stage.done) : 0;
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 via-white to-sky-50 p-4 shadow-card ring-1 ring-accent-line sm:p-6 dark:from-brand-950/60 dark:via-stone-900 dark:to-stone-900 dark:ring-white/5">
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-500/10" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(var(--color-brand-200)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_left,black,transparent_60%)] dark:opacity-[0.08]" />

      <div className="relative flex items-center gap-6">
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold uppercase tracking-[0.14em]">
            <span className="text-ink-muted">{r.workshopEyebrow}</span>
            {stage && (
              <>
                <span aria-hidden className="text-ink-faint">/</span>
                <span className="font-mono text-accent-strong">{format(r.workshopStage, { n: stage.n, tag: stage.tag })}</span>
              </>
            )}
          </p>
          <p className="mt-3 text-sm font-semibold text-ink-muted lg:[@media(max-height:1199px)]:mt-2">
            {stage ? (stage.done > 0 ? r.workshopBuilding : r.workshopStart) : ""}
          </p>
          <h2 className="mt-0.5 text-2xl font-black leading-tight tracking-tight text-ink-max sm:text-[32px] lg:[@media(max-height:1199px)]:text-[26px]">
            {stage ? stage.headline : r.workshopAllDone}
          </h2>
          {stage && (
            <>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {outcomeItems(stage.outcome).map((item) => (
                  <li key={item} className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 text-xs font-semibold text-ink-body ring-1 ring-brand-100 dark:bg-white/5 dark:ring-white/10">
                    <Check className="h-3 w-3 text-cyan-600 dark:text-cyan-400" strokeWidth={3} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex max-w-md items-center gap-3 lg:[@media(max-height:1199px)]:mt-3">
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white ring-1 ring-brand-100 dark:bg-white/10 dark:ring-0">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400 motion-safe:transition-[width] motion-safe:duration-700" style={{ width: `${Math.max(3, pct)}%` }} />
                </div>
                <span className="shrink-0 text-xs font-semibold text-ink-soft">
                  <span className="font-mono tabular-nums">{format(r.journeyLessons, { done: stage.done, total: stage.total })}</span>
                  {" · "}
                  {isLast ? r.journeyLast : format(r.journeyLeft, { n: left })}
                </span>
              </div>
            </>
          )}
        </div>
        <StageScene tag={stage?.tag} className="hidden h-[170px] w-[272px] shrink-0 sm:block lg:[@media(max-height:1199px)]:h-[140px] lg:[@media(max-height:1199px)]:w-[224px]" />
      </div>

      <div className="relative mt-5 lg:[@media(max-height:1199px)]:mt-3">{children}</div>
    </section>
  );
}

const STATUS_TONE: Record<WorkshopStageStatus, { card: string; badge: string; bar: string }> = {
  mastered: { card: "ring-1 ring-cyan-200 dark:ring-cyan-500/20", badge: "bg-cyan-500 text-white", bar: "bg-cyan-400" },
  active: { card: "ring-2 ring-brand-500 shadow-[0_12px_32px_-16px_rgba(41,97,184,0.55)]", badge: "bg-brand-600 text-white", bar: "bg-brand-500" },
  started: { card: "ring-1 ring-brand-200 dark:ring-white/10", badge: "bg-brand-100 text-brand-800 dark:bg-brand-500/20 dark:text-brand-200", bar: "bg-brand-400" },
  notStarted: { card: "ring-1 ring-brand-100/70 dark:ring-white/5", badge: "bg-surface-raised text-ink-muted", bar: "bg-brand-200" },
  locked: { card: "ring-1 ring-line-soft dark:ring-white/5", badge: "bg-surface-raised text-ink-faint", bar: "bg-line" },
};

/** Một chặng như một món đồ trong xưởng: cảnh, tên thứ làm ra, việc đầu tiên, tiến độ. */
export function StageBuildTile({ stage, justUnlocked = false }: { stage: WorkshopStage; justUnlocked?: boolean }) {
  const { t } = useI18n();
  const r = t.revampDashboard;
  const tone = STATUS_TONE[stage.status];
  const pct = stage.total > 0 ? Math.round((stage.done / stage.total) * 100) : 0;
  const dim = stage.status === "locked" || stage.status === "notStarted";
  const label = {
    mastered: r.statusMastered,
    active: r.statusActive,
    started: r.statusStarted,
    notStarted: r.statusNotStarted,
    locked: r.statusLocked,
  }[stage.status];
  return (
    <article
      aria-current={stage.status === "active" ? "step" : undefined}
      className={`relative flex h-full min-w-0 flex-col rounded-2xl bg-white p-3 dark:bg-stone-900 ${tone.card}`}
    >
      {justUnlocked && (
        // Một lần duy nhất, ngay sau khi chặng này thành chặng đang học: vòng
        // sáng toả ra hai nhịp rồi thôi. Không lặp mãi - thứ nhấp nháy mãi là
        // thứ người ta học cách lờ đi.
        <span aria-hidden className="pointer-events-none absolute -inset-1 rounded-[20px] ring-4 ring-cyan-300/70 motion-safe:animate-[ping_1.4s_ease-out_2] dark:ring-cyan-400/40" />
      )}
      <div className={`relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-xl ${stage.status === "active" ? "bg-brand-50 dark:bg-brand-950/50" : "bg-surface-raised dark:bg-stone-950"}`}>
        <StageScene tag={stage.tag} muted={stage.status === "locked"} className={`h-full w-full p-1 ${stage.status === "notStarted" ? "opacity-70" : ""}`} />
        <span className={`absolute left-2 top-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.08em] ${tone.badge}`}>
          {stage.status === "mastered" && <Check className="h-3 w-3" strokeWidth={3} aria-hidden />}
          {stage.status === "locked" && <Lock className="h-3 w-3" aria-hidden />}
          {justUnlocked ? r.tileJustUnlocked : label}
        </span>
      </div>
      <p className={`mt-3 font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] ${stage.status === "active" ? "text-accent-strong" : "text-ink-faint"}`}>
        {format(r.workshopStage, { n: stage.n, tag: stage.tag })}
      </p>
      <h3 className={`mt-0.5 line-clamp-2 font-black leading-snug ${dim ? "text-ink-soft" : "text-ink-max"} text-[15px]`}>{stage.headline}</h3>
      <p className="mt-1 line-clamp-2 flex-1 text-xs leading-relaxed text-ink-muted">{outcomeItems(stage.outcome, 2).join(" · ")}</p>
      <div className="mt-3 flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-raised dark:bg-white/10">
          <div className={`h-full rounded-full ${tone.bar} motion-safe:transition-[width] motion-safe:duration-700`} style={{ width: `${stage.done > 0 ? Math.max(4, pct) : 0}%` }} />
        </div>
        <span className="shrink-0 font-mono text-[11px] font-bold tabular-nums text-ink-muted">{format(r.journeyLessons, { done: stage.done, total: stage.total })}</span>
      </div>
    </article>
  );
}

/** Lưới chặng quanh chặng đang học: một chặng trước, chặng hiện tại, rồi những chặng kế. */
export function StageBuildGrid({ stages, currentIndex, scope, max = 6 }: { stages: WorkshopStage[]; currentIndex: number; scope: string; max?: number }) {
  const { t } = useI18n();
  const r = t.revampDashboard;
  const activeKey = stages.find((st) => st.status === "active")?.key ?? null;
  const justUnlocked = useJustUnlocked(scope, activeKey);
  const cur = Math.min(Math.max(currentIndex, 0), Math.max(stages.length - 1, 0));
  let start = Math.max(0, cur - 1);
  start = Math.max(0, Math.min(start, stages.length - max));
  const shown = stages.slice(start, start + max);
  const rest = stages.length - (start + shown.length);
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((st, i) => (
          <Reveal key={st.key} delay={i * 60}>
            <StageBuildTile stage={st} justUnlocked={st.key === justUnlocked} />
          </Reveal>
        ))}
      </div>
      {rest > 0 && (
        <Link href="/lo-trinh" className="group mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand-700 hover:text-brand-900 dark:text-brand-300">
          {format(r.buildMore, { count: rest })}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      )}
    </div>
  );
}

/** Chặng như một hàng trên đường đi (/lo-trinh): cảnh nhỏ bên trái, thứ làm ra, hai việc đầu, tiến độ. */
export function StageBuildRow({ stage }: { stage: WorkshopStage }) {
  const { t } = useI18n();
  const r = t.revampDashboard;
  const tone = STATUS_TONE[stage.status];
  const pct = stage.total > 0 ? Math.round((stage.done / stage.total) * 100) : 0;
  const isActive = stage.status === "active";
  return (
    <li
      aria-current={isActive ? "step" : undefined}
      className={`flex items-center gap-4 rounded-2xl bg-white p-3 dark:bg-stone-900 ${tone.card}`}
    >
      <div className={`hidden aspect-[16/10] w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl sm:flex ${isActive ? "bg-brand-50 dark:bg-brand-950/50" : "bg-surface-raised dark:bg-stone-950"}`}>
        <StageScene tag={stage.tag} muted={stage.status === "locked"} className={`h-full w-full p-0.5 ${stage.status === "notStarted" ? "opacity-70" : ""}`} />
      </div>
      <div className="min-w-0 flex-1">
        <p className={`font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] ${isActive ? "text-accent-strong" : "text-ink-faint"}`}>
          {format(r.workshopStage, { n: stage.n, tag: stage.tag })}
        </p>
        <p className={`mt-0.5 font-black leading-snug ${isActive ? "text-base text-ink-max" : "text-sm text-ink-body"}`}>{stage.headline}</p>
        <p className="mt-0.5 line-clamp-1 text-xs text-ink-muted">{outcomeItems(stage.outcome, 2).join(" · ")}</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-1.5 max-w-[220px] flex-1 overflow-hidden rounded-full bg-surface-raised dark:bg-white/10">
            <div className={`h-full rounded-full ${tone.bar}`} style={{ width: `${stage.done > 0 ? Math.max(4, pct) : 0}%` }} />
          </div>
          <span className="shrink-0 font-mono text-[11px] font-bold tabular-nums text-ink-muted">{format(r.journeyLessons, { done: stage.done, total: stage.total })}</span>
        </div>
      </div>
      {stage.status === "mastered" && (
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-white">
          <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
        </span>
      )}
    </li>
  );
}

/** Những thứ sẽ làm ra từ chặng `from` trở đi - mỗi cảnh xưởng một lần, để
 *  dải "đích đến" là bốn món khác nhau chứ không phải bốn chặng code liền nhau. */
export function pickDestinations(stages: WorkshopStage[], from: number, n = 4): WorkshopStage[] {
  const seen = new Set<string>();
  const out: WorkshopStage[] = [];
  for (const st of stages.slice(Math.max(0, from))) {
    const scene = stageSceneFor(st.tag);
    if (seen.has(scene)) continue;
    seen.add(scene);
    out.push(st);
    if (out.length === n) break;
  }
  return out;
}

/** Dải đích đến: cảnh xưởng + tên thứ làm ra, nối bằng mũi tên. */
export function DestinationStrip({ title, stages }: { title: string; stages: WorkshopStage[] }) {
  if (stages.length === 0) return null;
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.1em] text-ink-muted">{title}</p>
      <ol className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stages.map((st) => (
          <li key={st.key} className="flex min-w-0 flex-col rounded-xl bg-white/80 p-2 ring-1 ring-brand-100 dark:bg-white/5 dark:ring-white/10">
            <StageScene tag={st.tag} className="aspect-[16/10] w-full" />
            <span className="mt-1.5 line-clamp-2 text-xs font-bold leading-snug text-ink-body">{st.headline}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Chặng đang học vừa đổi so với lần trước người này mở trang? Nhớ theo tuyến,
 *  trong localStorage - chỉ là một hiệu ứng, mất đi thì không sai gì. Lần đầu
 *  tiên (chưa nhớ gì) không tính là "vừa mở": người mới không có gì để mừng. */
function useJustUnlocked(scope: string, activeKey: string | null): string | null {
  const [fresh, setFresh] = useState<string | null>(null);
  // Đọc giá trị cũ MỘT lần mỗi lần gắn: ở chế độ dev React chạy effect hai lần,
  // và lần thứ hai sẽ đọc lại đúng giá trị lần đầu vừa ghi - không bao giờ thấy
  // "vừa đổi". Ref sống qua cả hai lần chạy đó.
  const prevRef = useRef<string | null | undefined>(undefined);
  useEffect(() => {
    if (!activeKey) return;
    const k = `thtcn:workshop-active-stage:${scope}`;
    try {
      if (prevRef.current === undefined) prevRef.current = localStorage.getItem(k);
      localStorage.setItem(k, activeKey);
    } catch {
      return;
    }
    if (prevRef.current !== null && prevRef.current !== activeKey) {
      const id = window.setTimeout(() => setFresh(activeKey), 0);
      return () => window.clearTimeout(id);
    }
  }, [scope, activeKey]);
  return fresh;
}
