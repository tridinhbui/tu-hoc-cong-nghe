"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import dynamic from "next/dynamic";
import { CheckCircle2, Circle, Lightbulb, RotateCcw, ShieldCheck } from "lucide-react";
import type { LessonSectionBlock, SimToolId } from "@/lib/lesson-types";
import type { ToolEmbed, ToolMissionView } from "@/components/tools/ToolShell";
import { useI18n } from "@/lib/i18n/context";
import { Sys, btnSecondary, panel } from "@/components/ui/system";

/** Khối `sim` - xem lib/lesson-types.ts. Nhúng MỘT nhiệm vụ của công cụ ở
 *  /cong-cu vào bài học: công cụ tự chấm bằng `check` của nhiệm vụ, khối này
 *  chỉ hiện đề, checklist và báo `onPass` đúng một lần khi đạt. */
export type SimBlockProps = Extract<LessonSectionBlock, { type: "sim" }> & { onPass?: () => void };

type SimComponent = ComponentType<{ embed?: ToolEmbed }>;

const SIMS: Record<SimToolId, SimComponent> = {
  terminal: dynamic(() => import("@/components/tools/TerminalSim"), { ssr: false }),
  sql: dynamic(() => import("@/components/tools/SqlSim"), { ssr: false }),
  api: dynamic(() => import("@/components/tools/ApiSim"), { ssr: false }),
  cloud: dynamic(() => import("@/components/tools/CloudSim"), { ssr: false }),
  editor: dynamic(() => import("@/components/tools/EditorSim"), { ssr: false }),
};

function EmbedFrame({
  block,
  mission,
  reset,
  surface,
  onPass,
}: {
  block: SimBlockProps;
  mission: ToolMissionView | undefined;
  reset?: () => void;
  surface: React.ReactNode;
  onPass?: () => void;
}) {
  const { t } = useI18n();
  const c = t.lessonBlockSim;
  const [hintOpen, setHintOpen] = useState(false);
  const passedRef = useRef(false);
  const done = !!mission?.done;

  useEffect(() => {
    if (!done || passedRef.current) return;
    passedRef.current = true;
    onPass?.();
  }, [done, onPass]);

  return (
    <div className={`${panel} my-6 overflow-hidden`}>
      <div className="border-b border-line-strong bg-surface-raised px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Sys className="text-ink-muted">
            {c.eyebrow} · {t.toolSims.tools[block.tool].name}
          </Sys>
          <span title={c.sandbox} className="inline-flex items-center gap-1 text-ink-muted">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            <Sys>{c.sandbox}</Sys>
          </span>
        </div>
        <h3 className="mt-1 text-base font-black leading-snug text-ink-max">{block.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink">{block.task}</p>
      </div>

      {!mission ? (
        <p className="px-4 py-3 text-sm text-danger">{c.unknownMission}</p>
      ) : (
        <>
          <div className="max-h-[560px] overflow-auto p-3">{surface}</div>

          <div className="border-t border-line-strong px-4 py-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <Sys className="text-ink-muted">{c.mission}</Sys>
                <p className="text-sm font-bold text-ink-max">{mission.title}</p>
              </div>
              {done && (
                <span
                  role="status"
                  className="inline-flex items-center gap-1.5 rounded-control bg-brand-600 px-3 py-1 text-sm font-black text-white"
                >
                  <CheckCircle2 className="h-4 w-4" aria-hidden />
                  {c.passed}
                </span>
              )}
            </div>

            {mission.criteria && mission.criteria.length > 0 && (
              <div className="mt-2">
                <Sys className="text-ink-muted">{c.criteria}</Sys>
                <ul className="mt-1 space-y-1" aria-label={c.criteria}>
                  {mission.criteria.map((cr) => {
                    const met = done || cr.met;
                    return (
                      <li key={cr.id} data-met={met ? "true" : "false"} className="flex items-start gap-2 text-sm">
                        {met ? (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                        ) : (
                          <Circle className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
                        )}
                        <span className={met ? "text-ink" : "text-ink-muted"}>{cr.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {done && <p className="mt-2 text-sm text-ink">{c.passedNote}</p>}
            {hintOpen && !done && <p className="mt-2 text-sm leading-relaxed text-ink-muted">{mission.hint}</p>}

            <div className="mt-3 flex flex-wrap gap-2">
              {!done && mission.hint && (
                <button
                  type="button"
                  onClick={() => setHintOpen((v) => !v)}
                  aria-expanded={hintOpen}
                  className={`${btnSecondary} px-3 py-1.5 text-xs`}
                >
                  <Lightbulb className="h-3.5 w-3.5" aria-hidden />
                  {hintOpen ? c.hideHint : c.hint}
                </button>
              )}
              {reset && (
                <button
                  type="button"
                  onClick={() => {
                    setHintOpen(false);
                    reset();
                  }}
                  className={`${btnSecondary} px-3 py-1.5 text-xs`}
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                  {c.reset}
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function SimBlock(props: SimBlockProps) {
  const { tool, mission, onPass } = props;
  const Sim = SIMS[tool];
  // Giữ onPass mới nhất mà không làm đổi `embed` (đổi embed = dựng lại khung).
  const onPassRef = useRef(onPass);
  useEffect(() => {
    onPassRef.current = onPass;
  }, [onPass]);
  const [firePass] = useState(() => () => onPassRef.current?.());

  if (!Sim) return null;
  const embed: ToolEmbed = {
    missionId: mission,
    render: (view) => <EmbedFrame block={props} {...view} onPass={firePass} />,
  };
  return <Sim embed={embed} />;
}
