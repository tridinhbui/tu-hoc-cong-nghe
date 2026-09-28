"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle, RotateCcw, ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { ToolId } from "@/components/tools/tool-registry";

export interface ToolMissionView {
  id: string;
  title: string;
  hint: string;
  done: boolean;
}

/**
 * Khung chung cho mọi trang công cụ: thanh đầu (quay lại, tên công cụ, ghi chú
 * "môi trường mô phỏng"), vùng làm việc, và cột nhiệm vụ.
 *
 * Nhiệm vụ đứng cạnh công cụ chứ không ở trang riêng: người học nhìn nhiệm vụ,
 * làm ngay bên cạnh, và thấy dấu tích hiện lên lúc làm đúng - đúng nhịp "thử →
 * mình làm được" của lộ trình học theo nhu cầu.
 */
export default function ToolShell({
  tool,
  missions,
  onReset,
  children,
}: {
  tool: ToolId;
  missions: ToolMissionView[];
  onReset?: () => void;
  children: React.ReactNode;
}) {
  const { t } = useI18n();
  const c = t.toolSims;
  const copy = c.tools[tool];
  const done = missions.filter((m) => m.done).length;

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <Link href="/cong-cu" className="inline-flex items-center gap-1 text-xs font-bold text-ink-muted hover:text-ink">
              <ArrowLeft className="h-3.5 w-3.5" />
              {c.back}
            </Link>
            <h1 className="mt-1 text-xl font-black text-ink">
              <span className="text-accent">{copy.name}</span> · {copy.title}
            </h1>
          </div>
          <p className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 text-[11px] font-medium text-ink-muted dark:bg-stone-900">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" />
            {c.safeNote}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">{children}</div>

          <aside className="rounded-2xl border border-line bg-white p-4 dark:bg-stone-900 lg:self-start">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-black uppercase tracking-wider text-ink-muted">{c.missionsTitle}</p>
              <span className="text-xs font-bold tabular-nums text-accent">
                {done}/{missions.length}
              </span>
            </div>
            <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-surface-raised">
              <div
                className="h-full rounded-full bg-brand-600 transition-all"
                style={{ width: `${missions.length ? (done / missions.length) * 100 : 0}%` }}
              />
            </div>
            <ol className="space-y-2">
              {missions.map((m) => (
                <li key={m.id} className={`rounded-xl border p-2.5 ${m.done ? "border-brand-200 bg-brand-50/60 dark:border-brand-900 dark:bg-brand-950/30" : "border-line"}`}>
                  <p className="flex items-start gap-2 text-sm font-bold text-ink">
                    {m.done ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    ) : (
                      <Circle className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" />
                    )}
                    <span>{m.title}</span>
                  </p>
                  {!m.done && <p className="mt-1 pl-6 font-mono text-[11px] leading-relaxed text-ink-muted">{m.hint}</p>}
                </li>
              ))}
            </ol>
            {missions.length > 0 && done === missions.length && (
              <p className="mt-3 text-sm font-bold text-accent-strong">{c.allMissionsDone}</p>
            )}
            {onReset && (
              <button
                type="button"
                onClick={onReset}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-ink-muted hover:text-ink"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {c.reset}
              </button>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
