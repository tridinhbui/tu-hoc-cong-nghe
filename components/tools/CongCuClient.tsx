"use client";

import Link from "next/link";
import { ArrowRight, Cloud, Code2, Database, Send, TerminalSquare, type LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { TOOL_MISSION_COUNTS, type ToolId } from "@/components/tools/tool-registry";

/**
 * /cong-cu - trang tổng của bộ mô phỏng công cụ.
 *
 * Khuôn giữ đúng bản tài chính (một danh sách thẻ, mỗi thẻ mở một phần mềm
 * riêng; công cụ đầu tiên là thẻ tối vì nó là dòng lệnh), nhưng năm công cụ là
 * của nghề công nghệ. Mỗi công cụ chạy hoàn toàn trong trình duyệt.
 */
const TOOLS: { id: ToolId; href: string; icon: LucideIcon; dark?: boolean }[] = [
  { id: "terminal", href: "/cong-cu/terminal", icon: TerminalSquare, dark: true },
  { id: "editor", href: "/cong-cu/editor", icon: Code2 },
  { id: "sql", href: "/cong-cu/sql", icon: Database },
  { id: "api", href: "/cong-cu/api", icon: Send },
  { id: "cloud", href: "/cong-cu/cloud", icon: Cloud },
];

export default function CongCuClient() {
  const { t } = useI18n();
  const c = t.toolSims;

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <p className="text-xs font-extrabold text-accent-strong uppercase tracking-widest mb-1">{c.eyebrow}</p>
          <h1 className="text-2xl font-bold text-ink">{c.title}</h1>
          <p className="text-sm text-ink-muted mt-1 leading-relaxed">{c.subtitle}</p>
        </div>

        <div className="space-y-3">
          {TOOLS.map(({ id, href, icon: Icon, dark }) => {
            const copy = c.tools[id];
            return (
              <Link
                key={id}
                href={href}
                className={`group block rounded-xl border px-5 py-4 transition-colors ${
                  dark
                    ? "border-stone-800 bg-stone-950 hover:border-amber-600"
                    : "border-line bg-white hover:border-brand-600 dark:bg-stone-900"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`mt-0.5 h-6 w-6 shrink-0 ${dark ? "text-amber-500" : "text-accent"}`} />
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-[11px] font-bold uppercase tracking-widest ${
                        dark ? "font-mono text-amber-500" : "text-accent"
                      }`}
                    >
                      {copy.name}
                    </p>
                    <p className={`mt-0.5 font-bold ${dark ? "text-stone-100" : "text-ink"}`}>{copy.title}</p>
                    <p className={`mt-1 text-sm leading-relaxed ${dark ? "text-stone-400" : "text-ink-muted"}`}>
                      {copy.subtitle}
                    </p>
                    <p className={`mt-2 text-xs font-bold ${dark ? "text-stone-500" : "text-ink-faint"}`}>
                      {format(c.missionsCount, { count: TOOL_MISSION_COUNTS[id] })}
                    </p>
                  </div>
                  <ArrowRight
                    className={`mt-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                      dark ? "text-stone-500" : "text-ink-faint"
                    }`}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
