"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight, Cloud, Code2, Database, Send, TerminalSquare, type LucideIcon } from "lucide-react";
import CoCoSays from "@/components/CoCoSays";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { TOOL_MISSION_COUNTS, type ToolId } from "@/components/tools/tool-registry";
import { readToolProgress } from "@/lib/tools/progress";

/**
 * /cong-cu - trang tổng của bộ mô phỏng công cụ, tính năng chủ lực.
 *
 * Mỗi dòng là một công cụ kèm số ticket đã đóng / tổng. Tiến độ nằm trong
 * localStorage của từng công cụ (lib/tools/progress.ts), không có bảng D1 nào,
 * nên đọc sau khi mount: phía máy chủ luôn thấy 0.
 */
const TOOLS: { id: ToolId; href: string; icon: LucideIcon }[] = [
  { id: "terminal", href: "/cong-cu/terminal", icon: TerminalSquare },
  { id: "editor", href: "/cong-cu/editor", icon: Code2 },
  { id: "sql", href: "/cong-cu/sql", icon: Database },
  { id: "api", href: "/cong-cu/api", icon: Send },
  { id: "cloud", href: "/cong-cu/cloud", icon: Cloud },
];

const subscribeNoop = () => () => {};
const EMPTY = "";

export default function CongCuClient() {
  const { t } = useI18n();
  const c = t.toolSims;
  const r = t.revampTools.hub;

  // Chuỗi JSON làm snapshot: so sánh bằng giá trị, không tạo vòng render.
  const raw = useSyncExternalStore(subscribeNoop, () => JSON.stringify(readToolProgress()), () => EMPTY);
  const progress: Partial<Record<ToolId, number>> = raw ? JSON.parse(raw) : {};
  const doneOf = (id: ToolId) => Math.min(progress[id] ?? 0, TOOL_MISSION_COUNTS[id]);

  const total = TOOLS.reduce((n, { id }) => n + TOOL_MISSION_COUNTS[id], 0);
  const done = TOOLS.reduce((n, { id }) => n + doneOf(id), 0);

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <p className="font-mono text-[11px] font-black uppercase tracking-widest text-accent-strong">{r.eyebrow}</p>
        <h1 className="mt-1 text-2xl font-black text-ink-max sm:text-3xl">{r.title}</h1>
        <CoCoSays lines={t.coco.tools} className="mt-4" />

        <div className="mt-6 flex items-baseline justify-between gap-3 border-b border-line pb-2">
          <p className="text-xs font-black uppercase tracking-wider text-ink-muted">{c.eyebrow}</p>
          <p className="text-xs font-bold tabular-nums text-cyan-700 dark:text-cyan-400">
            {format(r.overall, { done, total })}
          </p>
        </div>

        <ul className="divide-y divide-line">
          {TOOLS.map(({ id, href, icon: Icon }) => {
            const copy = c.tools[id];
            const count = TOOL_MISSION_COUNTS[id];
            const d = doneOf(id);
            const cta = d === 0 ? r.start : d >= count ? r.review : r.resume;
            return (
              <li key={id}>
                <Link href={href} className="group flex items-start gap-4 py-4">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${
                      d > 0 ? "bg-stone-950 text-brand-300" : "bg-surface-raised text-ink-muted"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent">{copy.name}</span>
                      <span className="font-bold text-ink-max">{copy.title}</span>
                    </span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-ink-muted">{copy.subtitle}</span>
                    <span className="mt-2 flex items-center gap-2">
                      <span className="h-1 w-24 overflow-hidden rounded-full bg-surface-raised">
                        <span
                          className="block h-full rounded-full bg-cyan-500"
                          style={{ width: `${count ? (d / count) * 100 : 0}%` }}
                        />
                      </span>
                      <span
                        className={`text-xs font-bold tabular-nums ${
                          d >= count ? "text-cyan-700 dark:text-cyan-400" : d > 0 ? "text-ink" : "text-ink-faint"
                        }`}
                      >
                        {d >= count ? r.finished : format(r.ticketsDone, { done: d, total: count })}
                      </span>
                    </span>
                  </span>
                  <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-sm font-bold text-accent-strong">
                    <span className="hidden sm:inline">{cta}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-[11px] text-ink-faint">{done === 0 ? r.notStarted : r.localNote}</p>
      </div>
    </div>
  );
}
