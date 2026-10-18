"use client";

import Link from "next/link";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { LEARNING_FLOWS, type FlowId } from "@/lib/learning-flows";
import type { LearningGoalState } from "@/app/actions/learning-goal";

/**
 * Bộ chọn lối học của /lo-trinh, trình bày như chọn NHIỆM VỤ: chữ to nhất là
 * OUTPUT - thứ người học cầm được ở cuối ("Trang web của bạn, có địa chỉ
 * riêng"); tên lối học là dòng nhỏ phía trên.
 *
 * Một danh sách hàng, không phải lưới thẻ có hình: bản trước dựng chín thẻ lớn
 * với hình xem trước, cao hơn 1.200px, nên bước đầu của trang đẩy mọi thứ còn
 * lại (hướng đi, các mốc, bài đầu tiên) xuống ngoài tầm nhìn. Bốn hướng cho
 * người mới hiện sẵn; năm hướng sâu hơn gập lại.
 *
 * Nút "Bắt đầu xây" lưu mục tiêu NGAY, và là thứ duy nhất lưu: hàng không bấm
 * được, nên không có cú bấm vô tình. "Xem lộ trình" là đường so sánh trước khi
 * chọn. Thứ đầu tiên sẽ làm ra (firstBuild) hiện ở thẻ tiến độ ngay sau khi chọn.
 */

/** Độ khó 0-3 (Người mới → Nâng cao) và tầng hiển thị của từng lối. */
const MISSIONS: Record<FlowId, { starter: boolean; level: 0 | 1 | 2 | 3 }> = {
  website: { starter: true, level: 0 },
  "ai-assistant": { starter: true, level: 0 },
  "data-ai": { starter: true, level: 1 },
  "ai-marketing": { starter: true, level: 0 },
  automation: { starter: false, level: 2 },
  "ai-agent": { starter: false, level: 2 },
  "ai-safety": { starter: false, level: 2 },
  vibecode: { starter: false, level: 1 },
  "ai-builder": { starter: false, level: 3 },
};

const STARTER_ORDER: FlowId[] = ["website", "ai-assistant", "data-ai", "ai-marketing"];

export default function MissionPicker({
  state,
  effortOf,
  pending,
  onStart,
}: {
  state: LearningGoalState;
  effortOf: (id: FlowId) => string;
  pending: boolean;
  onStart: (id: FlowId) => void;
}) {
  const { t } = useI18n();
  const r = t.revampGoals;
  const m = r.mission;

  const starters = STARTER_ORDER.filter((id) => LEARNING_FLOWS.some((f) => f.id === id));
  const advanced = LEARNING_FLOWS.map((f) => f.id).filter((id) => !MISSIONS[id]?.starter);

  const row = (id: FlowId) => {
    const p = state.progress[id];
    const level = MISSIONS[id]?.level ?? 2;
    return (
      <li key={id} className="flex items-center gap-4 py-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-accent-strong">{t.learningFlows.flows[id].title}</p>
          <p className="mt-0.5 text-base font-black leading-snug tracking-tight text-ink-max sm:text-lg">{r.flows[id].output}</p>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
            <Level level={level} labels={m.levels} aria={m.levelAria} />
            <span className="font-mono tabular-nums">
              {p.done > 0 ? format(m.progress, { done: p.done, total: p.total }) : effortOf(id)}
            </span>
            <Link href={`/hoc-theo-nhu-cau/${id}`} className="font-semibold underline-offset-4 hover:text-ink-max hover:underline">
              {m.viewPath}
            </Link>
          </p>
        </div>
        <button
          type="button"
          disabled={pending}
          onClick={() => onStart(id)}
          aria-label={`${p.done > 0 ? m.continueCta : m.buildCta}: ${t.learningFlows.flows[id].title}`}
          className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700 disabled:cursor-wait disabled:opacity-60 dark:bg-brand-500 dark:text-stone-950 dark:hover:bg-brand-400"
        >
          <span className="hidden sm:inline">{p.done > 0 ? m.continueCta : m.buildCta}</span>
          {p.done > 0 && p.done >= p.total ? <Check className="h-4 w-4" aria-hidden /> : <ArrowRight className="h-4 w-4" aria-hidden />}
        </button>
      </li>
    );
  };

  return (
    <div>
      <p className="max-w-[62ch] text-sm leading-6 text-ink-soft">{m.hint}</p>
      <p className="mt-4 text-xs font-bold text-accent-strong">{m.starterLabel}</p>
      <ul className="mt-1 divide-y divide-line-strong border-y border-line-strong">{starters.map(row)}</ul>

      {advanced.length > 0 ? (
        <details className="group mt-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-ink-heading marker:content-none">
            <span>
              {m.advancedTitle}
              <span className="ml-2 font-mono text-xs font-medium tabular-nums text-ink-muted">{advanced.length}</span>
            </span>
            <ChevronDown className="h-4 w-4 text-ink-muted transition-transform group-open:rotate-180" aria-hidden />
          </summary>
          <p className="mt-1 text-sm text-ink-muted">{m.advancedHint}</p>
          <ul className="mt-1 divide-y divide-line-strong border-y border-line-strong">{advanced.map(row)}</ul>
        </details>
      ) : null}
    </div>
  );
}

/** Bốn vạch độ khó, kèm chữ (Người mới / Cơ bản / ...). */
function Level({ level, labels, aria }: { level: number; labels: readonly string[]; aria: string }) {
  const label = labels[level] ?? "";
  return (
    <span aria-label={format(aria, { level: label })} className="inline-flex items-center gap-1.5 font-bold">
      <span aria-hidden className="flex items-end gap-[2px]">
        {[0, 1, 2, 3].map((n) => (
          <span
            key={n}
            className={`w-[3px] rounded-full ${n <= level ? "bg-brand-600 dark:bg-brand-500" : "bg-stone-300 dark:bg-stone-600"}`}
            style={{ height: 4 + n * 2 }}
          />
        ))}
      </span>
      {label}
    </span>
  );
}
