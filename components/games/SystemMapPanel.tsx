"use client";

import Link from "next/link";
import {
  ArrowRight,
  Binary,
  Code2,
  Database,
  GitBranch,
  Globe,
  LayoutTemplate,
  MousePointerClick,
  Plug,
  Server,
  TerminalSquare,
  type LucideIcon,
} from "lucide-react";
import CoCoSays from "@/components/CoCoSays";
import { Sys, btnPrimary } from "@/components/ui/system";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import {
  SYSTEM_LAYERS,
  type NodeState,
  type SystemMapStatus,
  type SystemNodeKey,
  type SystemNodeStatus,
} from "@/lib/system-map";

const NODE_ICONS: Record<SystemNodeKey, LucideIcon> = {
  shell: TerminalSquare,
  git: GitBranch,
  runtime: Code2,
  ui: LayoutTemplate,
  interaction: MousePointerClick,
  logic: Binary,
  api: Plug,
  storage: Database,
  deploy: Globe,
};

/* i18n-ignore-start: định danh hệ thống (đường dẫn node), giống nhau ở mọi
   ngôn ngữ - như tên tệp, không phải câu chữ. */
const SYS_PATH = {
  map: "THCN://SYSTEM/MAP",
  node: (key: string) => `/srv/${key}`,
};
/* i18n-ignore-end */

// Luật màu của đợt revamp: cyan = đã xong, brand = đang làm, xám = chưa mở.
const STATE_STYLE: Record<NodeState, { icon: string; bar: string; label: string; line: string }> = {
  online: {
    icon: "border-cyan-600 bg-cyan-600 text-white dark:border-cyan-500 dark:bg-cyan-500 dark:text-stone-950",
    bar: "bg-cyan-600 dark:bg-cyan-400",
    label: "text-cyan-700 dark:text-cyan-400",
    line: "bg-cyan-500",
  },
  booting: {
    icon: "border-brand-500 bg-white text-brand-600 dark:bg-stone-900 dark:text-brand-400",
    bar: "bg-brand-600 dark:bg-brand-500",
    label: "text-accent-strong",
    line: "bg-surface-deep",
  },
  offline: {
    icon: "border-stone-300 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-600",
    bar: "bg-surface-deep",
    label: "text-ink-faint",
    line: "bg-surface-deep",
  },
};

function NodeCell({ node }: { node: SystemNodeStatus }) {
  const { t } = useI18n();
  const copy = t.revampGame.systemMap.nodes[node.key];
  const style = STATE_STYLE[node.state];
  const Icon = NODE_ICONS[node.key];
  const pct = node.total > 0 ? Math.round((node.done / node.total) * 100) : 0;

  return (
    <div className="flex min-w-0 items-start gap-2.5" data-node={node.key} data-state={node.state}>
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border ${style.icon}`}>
        <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <Sys className="truncate text-ink-faint">{SYS_PATH.node(node.key)}</Sys>
          <span className={`shrink-0 font-mono text-[10px] font-bold tracking-wide ${style.label}`}>
            {t.revampGame.systemMap.state[node.state]}
          </span>
        </div>
        <p className="truncate text-sm font-bold text-ink-max">
          {node.state === "online" ? copy.online : copy.name}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden bg-surface-sunken">
            <div className={`h-full ${style.bar}`} style={{ width: `${pct}%` }} />
          </div>
          <span className="shrink-0 font-mono text-[10px] tabular-nums text-ink-muted">
            {format(t.revampGame.systemMap.lessonsDone, { done: node.done, total: node.total })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SystemMapPanel({
  status,
  ready,
  onOpenIncident,
}: {
  status: SystemMapStatus;
  /** Tiến độ đã đọc xong chưa - trước đó Cơ Cơ im, để không nói "chưa có gì" rồi đổi giọng. */
  ready: boolean;
  onOpenIncident: () => void;
}) {
  const { t } = useI18n();
  const sm = t.revampGame.systemMap;
  const { nodes, online, next, allOnline, lessonsDone, lessonsTotal } = status;
  const nextIndex = next ? nodes.indexOf(next) : -1;
  const after = nextIndex >= 0 ? nodes[nextIndex + 1] : undefined;
  const overallPct = lessonsTotal > 0 ? Math.round((lessonsDone / lessonsTotal) * 100) : 0;

  const cocoLines = allOnline ? t.revampGame.coco.all : online === 0 ? t.revampGame.coco.none : t.revampGame.coco.partial;
  const cocoVars: Record<string, string | number> = next
    ? { node: sm.nodes[next.key].name, online, total: nodes.length, left: next.total - next.done }
    : { online, total: nodes.length };

  return (
    <section
      aria-label={sm.heading}
      className="mb-4 overflow-hidden rounded-md border border-line-strong bg-white dark:border-stone-700 dark:bg-stone-900"
    >
      <div className="flex h-8 items-center justify-between gap-3 border-b border-stone-300 bg-surface-raised px-3 dark:border-stone-700 dark:bg-stone-950">
        <Sys className="truncate text-ink-muted">{SYS_PATH.map}</Sys>
        <span
          className={`font-mono text-[11px] font-bold tabular-nums ${allOnline ? "text-cyan-700 dark:text-cyan-400" : "text-ink-muted"}`}
        >
          {allOnline ? sm.systemOnline : format(sm.nodesOnline, { online, total: nodes.length })}
        </span>
      </div>

      {/* Cơ Cơ - người điều phối hệ thống - và hành động kế tiếp trên cùng một hàng. */}
      <div className="grid gap-4 border-b border-stone-200 p-3 sm:p-4 lg:grid-cols-[1fr_320px] dark:border-stone-800">
        <div className="min-h-[64px]">
          {ready && <CoCoSays lines={cocoLines} vars={cocoVars} size={44} />}
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-stone-200 pt-3 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0 dark:border-stone-800">
          {next ? (
            <div>
              <p className="text-[11px] font-semibold text-ink-muted">{sm.nextLabel}</p>
              <p className="mt-0.5 text-base font-black text-ink-max">{sm.nodes[next.key].name}</p>
              <p className="mt-0.5 font-mono text-[11px] tabular-nums text-accent-strong">
                {format(sm.nextLeft, { left: next.total - next.done })}
              </p>
              {after && (
                <p className="mt-0.5 text-[11px] text-ink-faint">
                  {format(sm.unlocksAfter, { node: t.revampGame.systemMap.nodes[after.key].online })}
                </p>
              )}
            </div>
          ) : (
            <div>
              <p className="font-mono text-[11px] font-bold text-cyan-700 dark:text-cyan-400">{sm.systemOnline}</p>
              <p className="mt-0.5 text-base font-black text-ink-max">{sm.allDoneTitle}</p>
              <p className="mt-0.5 text-[11px] text-ink-muted">{sm.allDoneSub}</p>
            </div>
          )}
          {next ? (
            <Link href="/hoc-bai" className={`${btnPrimary} w-full justify-center px-3 py-2 text-xs`}>
              {sm.continueCta}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          ) : (
            <button type="button" onClick={onOpenIncident} className={`${btnPrimary} w-full justify-center px-3 py-2 text-xs`}>
              <Server className="h-3.5 w-3.5" aria-hidden />
              {sm.incidentCta}
            </button>
          )}
        </div>
      </div>

      {/* Ba tầng của hệ thống. Mỗi tầng là một hàng node; đường nối giữa hai
          node chuyển cyan khi cả hai đầu đã online - dòng chảy đã thông. */}
      <div className="divide-y divide-stone-200 dark:divide-stone-800">
        {SYSTEM_LAYERS.map((layer) => {
          const layerNodes = nodes.filter((n) => n.layer === layer);
          if (layerNodes.length === 0) return null;
          const layerOnline = layerNodes.every((n) => n.state === "online");
          return (
            <div key={layer} className="grid gap-3 p-3 sm:p-4 lg:grid-cols-[120px_1fr] lg:items-center">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className={`h-2 w-2 rounded-[1px] ${layerOnline ? "bg-cyan-500" : "bg-surface-deep"}`}
                />
                <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-ink-muted">{sm.layers[layer]}</span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_24px_1fr_24px_1fr] sm:items-center sm:gap-2">
                {layerNodes.map((node, i) => {
                  const prev = layerNodes[i - 1];
                  const linkOnline = prev && prev.state === "online" && node.state === "online";
                  return (
                    <div key={node.key} className="contents">
                      {i > 0 && (
                        <span
                          aria-hidden
                          className={`hidden h-px w-full sm:block ${linkOnline ? STATE_STYLE.online.line : STATE_STYLE.offline.line}`}
                        />
                      )}
                      <NodeCell node={node} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 border-t border-stone-200 px-3 py-2 sm:px-4 dark:border-stone-800">
        <div className="h-1 flex-1 overflow-hidden bg-surface-sunken">
          <div
            className={`h-full ${allOnline ? "bg-cyan-600 dark:bg-cyan-400" : "bg-brand-600 dark:bg-brand-500"}`}
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <span className="shrink-0 font-mono text-[11px] tabular-nums text-ink-muted">
          {format(sm.lessonsDone, { done: lessonsDone, total: lessonsTotal })}
        </span>
      </div>
    </section>
  );
}
