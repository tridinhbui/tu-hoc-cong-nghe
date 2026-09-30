"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight, Cloud, Code2, Database, Send, TerminalSquare, type LucideIcon } from "lucide-react";
import CoCoSays from "@/components/CoCoSays";
import { IconTile, ProgressBar, chipReward, panel } from "@/components/ui/system";
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
    <div className="min-h-screen bg-page">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <p className="font-mono text-[11px] font-black uppercase tracking-widest text-accent-strong">{r.eyebrow}</p>
        <h1 className="mt-1 text-2xl font-black text-ink-max sm:text-3xl">{r.title}</h1>
        <CoCoSays lines={t.coco.tools} className="mt-4" />

        {/* Đầu danh sách: tổng ticket là tiến độ học -> một thanh xanh ngay dưới. */}
        <div className="mt-8">
          <div className="flex items-baseline justify-between gap-3">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-accent-strong">
              <span aria-hidden className="h-1 w-5 rounded-full bg-accent" />
              {c.eyebrow}
            </p>
            <p className="text-xs font-bold tabular-nums text-ink">{format(r.overall, { done, total })}</p>
          </div>
          <ProgressBar value={total ? (done / total) * 100 : 0} className="mt-2" label={format(r.overall, { done, total })} />
        </div>

        {/* Mỗi công cụ là một thẻ trắng nổi trên canvas băng; rê chuột thì nhấc lên,
            viền xanh và mũi tên "Bắt đầu" đậm hẳn. Công cụ đã xong cả ticket đổi
            sang vàng (thành tích); không thẻ nào có nền màu. */}
        <ul className="mt-4 space-y-3">
          {TOOLS.map(({ id, href, icon: Icon }) => {
            const copy = c.tools[id];
            const count = TOOL_MISSION_COUNTS[id];
            const d = doneOf(id);
            const finished = d >= count;
            const cta = d === 0 ? r.start : finished ? r.review : r.resume;
            return (
              <li key={id}>
                <Link
                  href={href}
                  className={`${panel} group flex items-start gap-4 p-4 transition-[transform,box-shadow,border-color] hover:border-accent-line hover:shadow-card-hover motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 sm:p-5`}
                >
                  <IconTile tone={finished ? "reward" : "accent"} className="h-11 w-11">
                    <Icon className="h-5 w-5" />
                  </IconTile>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent">{copy.name}</span>
                      <span className="font-bold text-ink-max transition-colors group-hover:text-accent-strong">{copy.title}</span>
                    </span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-ink-soft">{copy.subtitle}</span>
                    <span className="mt-3 flex items-center gap-3">
                      <ProgressBar
                        value={count ? (d / count) * 100 : 0}
                        tone={finished ? "reward" : "accent"}
                        className="h-1.5 w-28 sm:w-36"
                      />
                      {finished ? (
                        <span className={chipReward}>{r.finished}</span>
                      ) : (
                        <span className={`text-xs font-bold tabular-nums ${d > 0 ? "text-ink" : "text-ink-faint"}`}>
                          {format(r.ticketsDone, { done: d, total: count })}
                        </span>
                      )}
                    </span>
                  </span>
                  <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-control bg-accent-wash px-2.5 py-1.5 text-sm font-bold text-accent-strong transition-colors group-hover:bg-accent group-hover:text-white dark:group-hover:text-[#07101f]">
                    <span className="hidden sm:inline">{cta}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-[11px] text-ink-faint">{done === 0 ? r.notStarted : r.localNote}</p>
      </div>
    </div>
  );
}
