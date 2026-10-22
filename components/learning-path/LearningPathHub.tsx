"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, History } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { PROFESSIONAL_BRANCHES } from "@/lib/track-stages";
import { LEARNING_FLOWS } from "@/lib/learning-flows";
import type { FlowEffort } from "@/components/learning-flows/LearningGoalCard";
import StageScene from "@/components/workshop/StageScene";
import type { StageSceneId } from "@/components/workshop/stage-scene";
import { outcomeItems } from "@/components/workshop/WorkshopBlocks";

// /lo-trinh - lớp chọn lối, trước mọi trang chi tiết. Ba cửa: đi đường chung từ
// con số 0, đi theo nghề, hay đi thẳng tới một việc cụ thể. Mỗi cửa có một bản
// xem trước dựng từ tiến độ thật của người học (không phải ảnh minh hoạ), để
// chọn bằng mắt trước khi đọc chữ.

type Track = "personal" | "professional";
type Milestone = { total: number; done: number };

/** Bốn lối xem trước: bốn cảnh khác nhau, để thẻ không thành bốn khung chat giống hệt. */
const NEEDS_PREVIEW = ["website", "automation", "data-ai", "ai-assistant"] as const;

/** Lối học theo nhu cầu nào vẽ bằng cảnh xưởng nào - cùng bộ cảnh với các chặng. */
const FLOW_SCENE: Partial<Record<string, StageSceneId>> = {
  website: "web",
  "ai-assistant": "ai",
  "ai-agent": "ai",
  "ai-marketing": "ai",
  automation: "cloud",
  "data-ai": "data",
  "ai-safety": "shield",
  vibecode: "code",
  "ai-builder": "ai",
};

export default function LearningPathHub({
  milestones,
  savedTrack,
  flowEffort,
}: {
  milestones: Record<Track, Milestone[]>;
  savedTrack: Track | null;
  flowEffort: FlowEffort;
}) {
  const { t } = useI18n();
  const p = t.learningPath;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 pb-28 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-strong">{p.hubEyebrow}</p>
      <h1 className="mt-2 max-w-3xl text-2xl font-black leading-tight tracking-tight text-ink-max sm:text-[34px]">{p.hubTitle}</h1>

      <div className="mt-6 space-y-4">
        <PathCard
          current={savedTrack === "personal"}
          title={p.startTitle}
          body={p.startBody}
          cta={p.startCta}
          href="/lo-trinh/bat-dau-tu-dau"
          preview={<StagePathPreview track="personal" list={milestones.personal} />}
        />
        <PathCard
          current={savedTrack === "professional"}
          title={p.careerTitle}
          body={p.careerBody}
          cta={p.careerCta}
          href="/lo-trinh/theo-nghe"
          preview={
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink-muted">{p.careerBranchesLabel}</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {PROFESSIONAL_BRANCHES.map((b) => (
                  <li key={b.id} className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-ink-body ring-1 ring-brand-100 dark:bg-white/5 dark:ring-white/10">
                    {t.professionalBranches[b.id]?.label ?? b.label}
                  </li>
                ))}
              </ul>
              <StagePathPreview track="professional" list={milestones.professional} compact />
            </div>
          }
        />
        <PathCard
          current={false}
          title={p.needsTitle}
          body={p.needsBody}
          cta={p.needsCta}
          href="/lo-trinh/theo-nhu-cau"
          preview={
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {NEEDS_PREVIEW.map((id) => LEARNING_FLOWS.find((f) => f.id === id)).filter((f) => f !== undefined).map((f) => {
                const e = flowEffort[f.id];
                return (
                  <li key={f.id} className="flex min-w-0 flex-col rounded-xl bg-white p-2 ring-1 ring-brand-100 dark:bg-white/5 dark:ring-white/10">
                    <StageScene scene={FLOW_SCENE[f.id] ?? "workshop"} className="aspect-[16/10] w-full" />
                    <span className="mt-1 line-clamp-1 text-xs font-bold text-ink-body">{t.learningFlows.flows[f.id].title}</span>
                    {e && e.count > 0 && (
                      <span className="font-mono text-[10.5px] tabular-nums text-ink-muted">
                        {format(p.needsEffort, { count: e.count, hours: Math.max(1, Math.round(e.minutes / 60)) })}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          }
        />
      </div>
    </div>
  );
}

function PathCard({ current, title, body, cta, href, preview }: { current: boolean; title: string; body: string; cta: string; href: string; preview: ReactNode }) {
  const { t } = useI18n();
  return (
    <section className="grid gap-5 rounded-3xl bg-white p-3 shadow-card ring-1 ring-accent-line sm:p-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center dark:bg-stone-900 dark:ring-white/5">
      <div className="min-w-0 rounded-2xl bg-gradient-to-br from-brand-50 to-sky-50 p-4 ring-1 ring-brand-100/70 dark:from-brand-950/50 dark:to-stone-900 dark:ring-white/5">{preview}</div>
      <div className="min-w-0 px-2 pb-2 lg:px-6 lg:pb-0">
        {current && (
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-accent-strong ring-1 ring-accent-line dark:bg-white/5">
            <History className="h-3 w-3" aria-hidden />
            {t.learningPath.hubCurrent}
          </span>
        )}
        <h2 className={`${current ? "mt-2" : ""} text-2xl font-black tracking-tight text-ink-max`}>{title}</h2>
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-ink-soft">{body}</p>
        <Link
          href={href}
          className="group mt-4 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-black text-white shadow-card transition-colors hover:bg-brand-700"
        >
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}

/** Đường uốn qua năm chặng quanh chặng đang học: xong (tick), đang học (số to),
 *  sắp tới (số nhỏ); dưới là thứ chặng đang học làm ra. */
function StagePathPreview({ track, list, compact = false }: { track: Track; list: Milestone[]; compact?: boolean }) {
  const { t } = useI18n();
  const copy = t.revampDashboard.stages[track] ?? [];
  const found = list.findIndex((s) => s.done < s.total);
  const cur = found === -1 ? Math.max(0, list.length - 1) : found;
  const start = Math.max(0, Math.min(cur - 1, list.length - 5));
  const nodes = list.slice(start, start + 5).map((s, k) => ({ ...s, i: start + k }));
  const pts = nodes.map((_, k) => ({ x: 40 + k * 110, y: k % 2 === 0 ? 112 : 42 }));
  const d = pts.reduce((acc, pt, k) => {
    if (k === 0) return `M${pt.x} ${pt.y}`;
    const prev = pts[k - 1];
    return `${acc} C${prev.x + 55} ${prev.y} ${pt.x - 55} ${pt.y} ${pt.x} ${pt.y}`;
  }, "");
  const curK = nodes.findIndex((n) => n.i === cur);
  const doneD = curK > 0 ? d.split(" C").slice(0, curK + 1).join(" C") : "";
  const now = copy[cur];

  return (
    <div className={compact ? "mt-3" : ""}>
      <svg viewBox="0 0 520 150" className={`w-full ${compact ? "max-h-[96px]" : "max-h-[150px]"}`} aria-hidden>
        <path d={d} className="stroke-brand-200 dark:stroke-white/10" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray="2 14" />
        {doneD && <path d={doneD} className="stroke-cyan-400" strokeWidth="5" fill="none" strokeLinecap="round" />}
        {nodes.map((n, k) => {
          const { x, y } = pts[k];
          const isDone = n.total > 0 && n.done === n.total;
          const isCur = n.i === cur;
          return (
            <g key={n.i}>
              {isCur && <circle cx={x} cy={y} r="26" className="fill-brand-200/60 dark:fill-brand-500/20" />}
              <circle cx={x} cy={y} r={isCur ? 19 : 13} className={isDone ? "fill-cyan-400" : isCur ? "fill-brand-600" : "fill-white stroke-brand-200 dark:fill-stone-800 dark:stroke-white/10"} strokeWidth="2" />
              {isDone ? (
                <path d={`M${x - 5} ${y} l3.5 3.5 l6.5 -7`} className="stroke-white" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <text x={x} y={y + 4.5} textAnchor="middle" className={`font-mono font-black ${isCur ? "fill-white text-[15px]" : "fill-ink-muted text-[12px]"}`}>
                  {n.i + 1}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {!compact && now && (
        <div className="mt-2 flex items-center gap-3 rounded-xl bg-white/90 p-2.5 ring-1 ring-brand-100 dark:bg-white/5 dark:ring-white/10">
          <StageScene tag={now.tag} className="h-11 w-[70px] shrink-0" />
          <div className="min-w-0">
            <p className="truncate text-sm font-black text-ink-max">{now.headline}</p>
            <p className="truncate text-xs text-ink-muted">{outcomeItems(now.outcome, 3).join(" · ")}</p>
          </div>
        </div>
      )}
    </div>
  );
}
