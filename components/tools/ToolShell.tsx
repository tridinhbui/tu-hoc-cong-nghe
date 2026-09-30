"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Lightbulb, RotateCcw, ShieldCheck } from "lucide-react";
import CoCoSays from "@/components/CoCoSays";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { ToolId } from "@/components/tools/tool-registry";

export interface ToolCriterionView {
  id: string;
  label: string;
  /** Đọc từ bộ máy mô phỏng ở trạng thái HIỆN TẠI - không bịa. */
  met: boolean;
}

export interface ToolMissionView {
  id: string;
  title: string;
  hint: string;
  done: boolean;
  /** Người yêu cầu ticket, ví dụ "CEO", "QA". */
  from?: string;
  /** Đề bài viết như một ticket: ai cần gì, để làm gì. */
  brief?: string;
  criteria?: ToolCriterionView[];
}

/**
 * Chế độ nhúng: công cụ khoá vào MỘT nhiệm vụ và khung này không dựng trang
 * (tiêu đề, cột ticket, hàng đợi) mà giao cho `render` - dùng bởi khối `sim`
 * trong bài học (components/lesson-blocks/SimBlock.tsx). Công cụ ở chế độ này
 * bắt đầu từ trạng thái mới và không đọc/ghi localStorage của trang /cong-cu.
 */
export interface ToolEmbed {
  missionId: string;
  render: (view: { mission: ToolMissionView | undefined; reset?: () => void; surface: React.ReactNode }) => React.ReactNode;
}

/** Lọc danh sách nhiệm vụ còn đúng nhiệm vụ được nhúng (không nhúng thì giữ nguyên). */
export function embedMissions<T extends { id: string }>(missions: T[], embed: ToolEmbed | undefined): T[] {
  return embed ? missions.filter((m) => m.id === embed.missionId) : missions;
}

type CocoEvent = { kind: "error" | "hint" | "done"; mission: string; n: number } | null;

/**
 * Khung chung cho mọi trang công cụ: vùng làm việc bên trái, cột ticket bên phải.
 *
 * Cột ticket cố ý ít chữ khi người học đang làm: một ticket đang mở (ai yêu
 * cầu, cần gì, tiêu chí đạt dạng checklist), gợi ý giấu sau nút, và hàng đợi
 * thu gọn. Tiêu chí được tích theo trạng thái thật của bộ máy mô phỏng mà công
 * cụ truyền vào - khung này không tự chấm gì.
 *
 * Khi ticket đang mở vừa đạt, khung GIỮ ticket đó trên màn hình (không nhảy
 * sang ticket kế) để người học thấy kết quả bàn giao - `renderArtifact` - và
 * lời Cơ Cơ chỉ bước tiếp theo, rồi tự bấm sang ticket sau.
 *
 * Cơ Cơ xuất hiện ở ba lúc: chạy lỗi (`errorKey` tăng), bấm Gợi ý, và đóng
 * ticket. Ngoài ba lúc đó Cơ Cơ im lặng.
 */
export default function ToolShell({
  tool,
  missions,
  onReset,
  ready = true,
  errorKey = 0,
  renderArtifact,
  embed,
  children,
}: {
  tool: ToolId;
  missions: ToolMissionView[];
  onReset?: () => void;
  /** false cho tới khi công cụ đọc xong tiến độ đã lưu: tránh coi cả loạt
   *  nhiệm vụ khôi phục từ localStorage là "vừa xong". */
  ready?: boolean;
  /** Tăng mỗi lần người học chạy mà gặp lỗi. */
  errorKey?: number;
  /** Kết quả / artifact của một nhiệm vụ đã xong. */
  renderArtifact?: (missionId: string) => React.ReactNode;
  /** Có thì nhúng vào bài học thay vì dựng trang - xem ToolEmbed. */
  embed?: ToolEmbed;
  children: React.ReactNode;
}) {
  const { t } = useI18n();
  const c = t.toolSims;
  const r = t.revampTools;
  const copy = c.tools[tool];
  const done = missions.filter((m) => m.done).length;
  const total = missions.length;

  const [pinned, setPinned] = useState<string | null>(null);
  const [hintFor, setHintFor] = useState<string | null>(null);
  const [event, setEvent] = useState<CocoEvent>(null);

  const firstOpen = missions.find((m) => !m.done) ?? missions[missions.length - 1];
  const active = missions.find((m) => m.id === pinned) ?? firstOpen;

  // Phát hiện "vừa đạt" và "vừa lỗi" ngay trong lúc render (so với lần render
  // trước), thay vì một effect đặt state - đúng mẫu React cho state suy ra.
  const doneKey = missions
    .filter((m) => m.done)
    .map((m) => m.id)
    .join(",");
  const [seen, setSeen] = useState({ doneKey, ready, errorKey });
  if (seen.doneKey !== doneKey || seen.ready !== ready || seen.errorKey !== errorKey) {
    const n = (event?.n ?? 0) + 1;
    let next: CocoEvent = event;
    // Lỗi khôi phục cùng lúc với tiến độ đã lưu không phải lỗi "vừa chạy".
    if (seen.errorKey !== errorKey && errorKey > 0 && ready && seen.ready && active) {
      next = { kind: "error", mission: active.id, n };
    }
    if (ready && seen.ready && seen.doneKey !== doneKey) {
      const before = new Set(seen.doneKey.split(",").filter(Boolean));
      const newly = missions.filter((m) => m.done && !before.has(m.id));
      const target = newly.find((m) => m.id === active?.id) ?? newly[0];
      if (target) {
        setPinned(target.id);
        next = { kind: "done", mission: target.id, n };
      }
    }
    setSeen({ doneKey, ready, errorKey });
    if (next !== event) setEvent(next);
  }

  if (embed) return <>{embed.render({ mission: missions.find((m) => m.id === embed.missionId), reset: onReset, surface: children })}</>;
  if (!active) return null;

  const index = missions.findIndex((m) => m.id === active.id);
  const nextOpen = missions.find((m, i) => !m.done && i > index) ?? missions.find((m) => !m.done && m.id !== active.id);
  const hintOpen = hintFor === active.id;

  const select = (id: string) => {
    setPinned(id);
    setHintFor(null);
    setEvent(null);
  };

  const toggleHint = () => {
    if (hintOpen) {
      setHintFor(null);
      if (event?.kind === "hint") setEvent(null);
      return;
    }
    setHintFor(active.id);
    setEvent({ kind: "hint", mission: active.id, n: (event?.n ?? 0) + 1 });
  };

  const reset = onReset
    ? () => {
        onReset();
        setPinned(null);
        setHintFor(null);
        setEvent(null);
      }
    : undefined;

  const coco =
    event && event.mission === active.id
      ? event.kind === "done"
        ? nextOpen
          ? { lines: r.coco.done, vars: { next: nextOpen.title } }
          : { lines: r.coco.allDone }
        : event.kind === "hint"
          ? { lines: [active.hint], lead: r.coco.hintLead }
          : { lines: r.coco.error[tool] }
      : null;

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div className="min-w-0">
            <Link href="/cong-cu" className="inline-flex items-center gap-1 text-xs font-bold text-ink-muted hover:text-ink">
              <ArrowLeft className="h-3.5 w-3.5" />
              {c.back}
            </Link>
            <h1 className="mt-1 text-xl font-black text-ink-max">
              <span className="text-accent">{copy.name}</span> · {copy.title}
            </h1>
          </div>
          <p
            title={c.safeNote}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-ink-faint"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            {r.shell.sandbox}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">{children}</div>

          <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
            {/* Ticket đang mở */}
            <section
              aria-labelledby="tool-ticket-title"
              className={`rounded-lg border bg-white p-4 dark:bg-stone-900 ${
                active.done ? "border-cyan-300 dark:border-cyan-800" : "border-accent-line-mid"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink-muted">
                  {format(r.shell.ticket, { n: index + 1, total })}
                </p>
                {active.done && (
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] font-black uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {r.shell.passed}
                  </span>
                )}
              </div>
              {active.from && (
                <p className="mt-2 text-xs text-ink-muted">
                  {r.shell.from}: <span className="font-bold text-ink">{active.from}</span>
                </p>
              )}
              <h2 id="tool-ticket-title" className="mt-1 text-base font-black leading-snug text-ink-max">
                {active.title}
              </h2>
              {active.brief && <p className="mt-1.5 text-sm leading-relaxed text-ink">{active.brief}</p>}

              {active.criteria && active.criteria.length > 0 && (
                <div className="mt-3">
                  <p className="text-[11px] font-black uppercase tracking-wider text-ink-muted">{r.shell.criteria}</p>
                  <ul className="mt-1.5 space-y-1">
                    {active.criteria.map((cr) => {
                      const met = active.done || cr.met;
                      return (
                        <li key={cr.id} className="flex items-start gap-2 text-sm">
                          {met ? (
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600 dark:text-cyan-400" />
                          ) : (
                            <Circle className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" />
                          )}
                          <span className={met ? "text-ink" : "text-ink-muted"}>{cr.label}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {!active.done && (
                <button
                  type="button"
                  onClick={toggleHint}
                  aria-expanded={hintOpen}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 text-xs font-bold text-ink-muted hover:border-brand-400 hover:text-accent-strong"
                >
                  <Lightbulb className="h-3.5 w-3.5" />
                  {hintOpen ? r.shell.hideHint : r.shell.hint}
                </button>
              )}

              {coco && (
                <CoCoSays
                  key={`${event?.kind}-${event?.n}`}
                  lines={coco.lines}
                  lead={"lead" in coco ? coco.lead : undefined}
                  vars={"vars" in coco ? coco.vars : undefined}
                  salt={event?.n ?? 0}
                  size={36}
                  className="mt-3"
                />
              )}

              {active.done && renderArtifact && (
                <div className="mt-3 border-t border-line pt-3">
                  <p className="text-[11px] font-black uppercase tracking-wider text-ink-muted">{r.shell.result}</p>
                  <div className="mt-1.5">{renderArtifact(active.id)}</div>
                </div>
              )}

              {active.done && nextOpen && (
                <button
                  type="button"
                  onClick={() => select(nextOpen.id)}
                  className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-brand-600 px-3 py-2 text-sm font-bold text-white hover:bg-brand-700"
                >
                  {r.shell.nextTicket}
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
              {active.done && !nextOpen && <p className="mt-3 text-sm font-bold text-cyan-700 dark:text-cyan-400">{r.shell.allDone}</p>}
            </section>

            {/* Hàng đợi thu gọn */}
            <section className="rounded-lg border border-line bg-white p-3 dark:bg-stone-900">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-black uppercase tracking-wider text-ink-muted">{r.shell.queue}</p>
                <span className="text-xs font-bold tabular-nums text-cyan-700 dark:text-cyan-400">
                  {format(r.shell.progress, { done, total })}
                </span>
              </div>
              <div className="mb-2 h-1 overflow-hidden rounded-full bg-surface-raised">
                <div
                  className="h-full rounded-full bg-cyan-500 transition-all"
                  style={{ width: `${total ? (done / total) * 100 : 0}%` }}
                />
              </div>
              <ol className="space-y-0.5">
                {missions.map((m, i) => {
                  const current = m.id === active.id;
                  return (
                    <li key={m.id}>
                      <button
                        type="button"
                        onClick={() => select(m.id)}
                        aria-current={current ? "true" : undefined}
                        aria-label={format(r.shell.open, { n: i + 1, title: m.title })}
                        className={`flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-left text-xs ${
                          current ? "bg-brand-50 text-ink-max dark:bg-brand-950/40" : "text-ink-muted hover:bg-surface-raised hover:text-ink"
                        }`}
                      >
                        <span className="w-4 shrink-0 text-right font-mono tabular-nums text-ink-faint">{i + 1}</span>
                        {m.done ? (
                          <CheckCircle2 className="mt-px h-3.5 w-3.5 shrink-0 text-cyan-600 dark:text-cyan-400" />
                        ) : (
                          <Circle className={`mt-px h-3.5 w-3.5 shrink-0 ${current ? "text-accent" : "text-ink-faint"}`} />
                        )}
                        <span className={`min-w-0 ${current ? "font-bold" : ""}`}>{m.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
              {reset && (
                <button
                  type="button"
                  onClick={reset}
                  className="mt-2 inline-flex items-center gap-1.5 px-2 text-xs font-bold text-ink-muted hover:text-ink"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  {c.reset}
                </button>
              )}
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
