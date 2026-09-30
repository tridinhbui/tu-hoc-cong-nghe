"use client";

import Link from "next/link";
import { ArrowRight, Check, Clock, FileText, Sparkles, TrendingUp } from "lucide-react";
import Glyph from "@/components/Glyph";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { LEARNING_FLOWS, type FlowId } from "@/lib/learning-flows";
import type { LearningGoalState } from "@/app/actions/learning-goal";

/**
 * "Hôm nay bạn muốn build cái gì?" - bộ chọn lối học của /lo-trinh, trình bày
 * như chọn NHIỆM VỤ chứ không như mục lục khoá học.
 *
 * Nhân vật chính của mỗi thẻ là OUTPUT - thứ người học cầm được ở cuối - chữ
 * to nhất thẻ; tên lối học lùi xuống làm dòng nhỏ phía trên. Các nhãn
 * KỸ NĂNG/OUTPUT của bản cũ bỏ đi: một câu "Trang web của bạn, có địa chỉ
 * riêng" tự nói nó là output rồi.
 *
 * Hai tầng:
 *  - Bốn hướng cho người mới: thẻ lớn, mỗi thẻ một sắc xanh riêng và một hình
 *    xem trước nhẹ của thứ sẽ làm ra (khung trình duyệt, khung chat, biểu đồ,
 *    lịch đăng bài) - vẽ bằng khối, không chữ, nên không cần dịch.
 *  - Bốn hướng nâng cao: hàng gọn bên dưới, lộ ra dần khi cuộn tới.
 *
 * Nút "Bắt đầu xây" lưu mục tiêu NGAY. Bản cũ bắt bấm thẻ rồi bấm "Bắt đầu",
 * vì một cú bấm vào THẺ từng lưu luôn và làm thẻ biến mất trước khi người đọc
 * kịp so hai lối. Ở đây thẻ không bấm được - chỉ nút có nhãn rõ ràng mới lưu,
 * nên không có cú bấm vô tình; "Xem lộ trình" là đường so sánh trước khi chọn.
 * Thứ đầu tiên sẽ làm ra (firstBuild) vẫn hiện, ở thẻ tiến độ ngay sau khi chọn.
 */

type Tone = "brand" | "sky" | "navy" | "blue";

// Lớp viết đủ chữ (không ghép chuỗi) để Tailwind thấy được lúc build.
const TONES: Record<
  Tone,
  { card: string; stage: string; ink: string; soft: string; solid: string; tile: string; bar: string }
> = {
  brand: {
    card: "bg-brand-50 hover:shadow-[0_18px_40px_-24px_rgba(41,97,184,0.75)] dark:bg-brand-950/50",
    stage: "bg-brand-100 dark:bg-brand-900/50",
    ink: "text-accent-strong",
    soft: "bg-brand-300/70 dark:bg-brand-700/70",
    solid: "bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-400",
    tile: "bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300",
    bar: "bg-brand-600 dark:bg-brand-500",
  },
  sky: {
    card: "bg-sky-50 hover:shadow-[0_18px_40px_-24px_rgba(2,132,199,0.7)] dark:bg-sky-950/40",
    stage: "bg-sky-100 dark:bg-sky-900/40",
    ink: "text-sky-700 dark:text-sky-300",
    soft: "bg-sky-300/70 dark:bg-sky-700/70",
    solid: "bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400",
    tile: "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300",
    bar: "bg-sky-600 dark:bg-sky-400",
  },
  navy: {
    card: "bg-brand-100/60 hover:shadow-[0_18px_40px_-24px_rgba(31,66,122,0.75)] dark:bg-brand-900/30",
    stage: "bg-brand-200/70 dark:bg-brand-900/60",
    ink: "text-brand-800 dark:text-brand-200",
    soft: "bg-brand-400/60 dark:bg-brand-600/60",
    solid: "bg-brand-800 hover:bg-brand-900 dark:bg-brand-300 dark:hover:bg-brand-200",
    tile: "bg-brand-200/70 text-brand-800 dark:bg-brand-900/60 dark:text-brand-200",
    bar: "bg-brand-800 dark:bg-brand-300",
  },
  blue: {
    card: "bg-blue-50 hover:shadow-[0_18px_40px_-24px_rgba(37,99,235,0.65)] dark:bg-blue-950/40",
    stage: "bg-blue-100 dark:bg-blue-900/40",
    ink: "text-blue-800 dark:text-blue-300",
    soft: "bg-blue-300/70 dark:bg-blue-700/70",
    solid: "bg-blue-700 hover:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-400",
    tile: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
    bar: "bg-blue-700 dark:bg-blue-400",
  },
};

/** Độ khó 0-3 (Người mới → Nâng cao) và tầng hiển thị của từng lối. */
const MISSIONS: Record<FlowId, { starter: boolean; level: 0 | 1 | 2 | 3; tone: Tone }> = {
  website: { starter: true, level: 0, tone: "brand" },
  "ai-assistant": { starter: true, level: 0, tone: "sky" },
  "data-ai": { starter: true, level: 1, tone: "navy" },
  "ai-marketing": { starter: true, level: 0, tone: "blue" },
  automation: { starter: false, level: 2, tone: "navy" },
  "ai-agent": { starter: false, level: 2, tone: "sky" },
  "ai-safety": { starter: false, level: 2, tone: "blue" },
  "ai-builder": { starter: false, level: 3, tone: "brand" },
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
  const emojiOf = (id: FlowId) => LEARNING_FLOWS.find((f) => f.id === id)?.emoji ?? "";

  return (
    <div>
      <h2 className="text-xl font-black tracking-tight text-ink-max sm:text-2xl">{m.title}</h2>
      <p className="mt-1 max-w-[62ch] text-sm leading-6 text-ink-body">{m.hint}</p>

      <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-accent-strong">
        <Sparkles className="h-3.5 w-3.5" aria-hidden />
        {m.starterLabel}
      </p>
      <ul className="mt-2 grid gap-4 sm:grid-cols-2">
        {starters.map((id, i) => {
          const meta = MISSIONS[id];
          const tone = TONES[meta.tone];
          const p = state.progress[id];
          const pct = p.total ? Math.round((p.done / p.total) * 100) : 0;
          return (
            <li
              key={id}
              className={`group flex flex-col rounded-2xl p-2 transition-[transform,box-shadow] duration-200 motion-safe:hover:-translate-y-1 motion-safe:animate-[coco-rise_0.4s_ease-out_both] ${tone.card}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className={`relative h-36 overflow-hidden rounded-xl ${tone.stage}`}>
                <Preview id={id} tone={tone} />
                <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
                  <Level level={meta.level} tone={tone} labels={m.levels} aria={m.levelAria} />
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/85 px-2 py-0.5 font-mono text-[11px] font-semibold tabular-nums text-ink-body backdrop-blur-sm dark:bg-stone-950/70 dark:text-stone-300">
                    <Clock className="h-3 w-3" aria-hidden />
                    {effortOf(id)}
                  </span>
                </div>
                {p.done > 0 ? (
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-white/60 dark:bg-stone-950/50">
                    <div className={`h-full ${tone.bar}`} style={{ width: `${Math.max(4, pct)}%` }} />
                  </div>
                ) : null}
              </div>

              <div className="flex flex-1 flex-col px-2.5 pt-3.5 pb-2">
                <p className={`flex items-center gap-1.5 text-xs font-bold ${tone.ink}`}>
                  <Glyph emoji={emojiOf(id)} className="h-3.5 w-3.5" />
                  {t.learningFlows.flows[id].title}
                  {p.done > 0 ? (
                    <span className="ml-auto font-mono text-[11px] font-semibold tabular-nums text-ink-muted">
                      {format(m.progress, { done: p.done, total: p.total })}
                    </span>
                  ) : null}
                </p>
                <p className="mt-1.5 text-lg font-black leading-snug tracking-tight text-ink-max sm:text-xl">
                  {r.flows[id].output}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4">
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => onStart(id)}
                    className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-white transition-colors disabled:cursor-wait disabled:opacity-60 dark:text-stone-950 ${tone.solid}`}
                  >
                    {p.done > 0 ? m.continueCta : m.buildCta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </button>
                  <Link
                    href={`/hoc-theo-nhu-cau/${id}`}
                    className="text-sm font-semibold text-ink-muted underline-offset-4 hover:text-ink-max hover:underline"
                  >
                    {m.viewPath}
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {advanced.length > 0 ? (
        <div className="mt-8">
          <h3 className="text-base font-black tracking-tight text-ink-max">{m.advancedTitle}</h3>
          <p className="mt-0.5 text-sm text-ink-muted">{m.advancedHint}</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {advanced.map((id, i) => {
              const meta = MISSIONS[id];
              const tone = TONES[meta?.tone ?? "brand"];
              const p = state.progress[id];
              return (
                <li
                  key={id}
                  className="group flex items-center gap-3 rounded-xl bg-surface-raised p-3 transition-colors hover:bg-surface-sunken motion-safe:animate-[coco-rise_0.4s_ease-out_both] dark:bg-white/5 dark:hover:bg-white/10"
                  style={{ animationDelay: `${240 + i * 60}ms` }}
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tone.tile}`}>
                    <Glyph emoji={emojiOf(id)} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-xs font-bold ${tone.ink}`}>{t.learningFlows.flows[id].title}</span>
                    <span className="block font-bold leading-snug text-ink-max">{r.flows[id].output}</span>
                    <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <Level level={meta?.level ?? 2} tone={tone} labels={m.levels} aria={m.levelAria} bare />
                      <span className="font-mono text-[11px] tabular-nums text-ink-muted">
                        {p.done > 0 ? format(m.progress, { done: p.done, total: p.total }) : effortOf(id)}
                      </span>
                      <Link
                        href={`/hoc-theo-nhu-cau/${id}`}
                        className="text-xs font-semibold text-ink-muted underline-offset-4 hover:text-ink-max hover:underline"
                      >
                        {m.viewPath}
                      </Link>
                    </span>
                  </span>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => onStart(id)}
                    aria-label={`${p.done > 0 ? m.continueCta : m.buildCta}: ${t.learningFlows.flows[id].title}`}
                    title={p.done > 0 ? m.continueCta : m.buildCta}
                    className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-white transition-colors disabled:opacity-60 dark:text-stone-950 ${tone.solid}`}
                  >
                    {p.done > 0 && p.done >= p.total ? <Check className="h-4 w-4" aria-hidden /> : <ArrowRight className="h-4 w-4" aria-hidden />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

/** Bốn vạch độ khó, kèm chữ (Người mới / Cơ bản / ...). */
function Level({
  level,
  tone,
  labels,
  aria,
  bare = false,
}: {
  level: number;
  tone: (typeof TONES)[Tone];
  labels: readonly string[];
  aria: string;
  bare?: boolean;
}) {
  const label = labels[level] ?? "";
  return (
    <span
      aria-label={format(aria, { level: label })}
      className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${bare ? "text-ink-muted" : "rounded-full bg-white/85 px-2 py-0.5 text-ink-body backdrop-blur-sm dark:bg-stone-950/70 dark:text-stone-300"}`}
    >
      <span aria-hidden className="flex items-end gap-[2px]">
        {[0, 1, 2, 3].map((n) => (
          <span
            key={n}
            className={`w-[3px] rounded-full ${n <= level ? tone.bar : "bg-stone-300 dark:bg-stone-600"}`}
            style={{ height: 4 + n * 2 }}
          />
        ))}
      </span>
      {label}
    </span>
  );
}

/**
 * Hình xem trước thứ sẽ làm ra. Chỉ khối và icon, không chữ: đọc được ở mọi
 * ngôn ngữ, và không ai nhầm nó là ảnh chụp màn hình thật.
 */
function Preview({ id, tone }: { id: FlowId; tone: (typeof TONES)[Tone] }) {
  const card = "rounded-lg bg-white shadow-sm dark:bg-stone-900";
  const line = `h-1.5 rounded-full ${tone.soft}`;
  const lift = "transition-transform duration-300 motion-safe:group-hover:-translate-y-1";

  if (id === "website") {
    return (
      <div className={`absolute inset-x-6 top-11 bottom-0 overflow-hidden rounded-t-lg ${card} ${lift}`}>
        <div className="flex items-center gap-1 border-b border-stone-100 px-2 py-1.5 dark:border-stone-800">
          <span className="h-1.5 w-1.5 rounded-full bg-stone-300 dark:bg-stone-600" />
          <span className="h-1.5 w-1.5 rounded-full bg-stone-300 dark:bg-stone-600" />
          <span className="h-1.5 w-1.5 rounded-full bg-stone-300 dark:bg-stone-600" />
          <span className={`ml-2 h-2 w-24 rounded-full ${tone.soft}`} />
        </div>
        <div className="flex gap-2 p-2.5">
          <div className="flex-1 space-y-1.5">
            <div className={`h-2.5 w-4/5 rounded-full ${tone.bar}`} />
            <div className={`${line} w-full`} />
            <div className={`${line} w-3/5`} />
            <div className={`mt-2 h-3 w-12 rounded-full ${tone.bar}`} />
          </div>
          <div className={`h-14 w-16 rounded-md ${tone.soft}`} />
        </div>
      </div>
    );
  }

  if (id === "ai-assistant") {
    return (
      <div className={`absolute inset-x-6 top-11 bottom-3 flex gap-2.5 ${lift}`}>
        <div className={`flex w-12 shrink-0 flex-col items-center justify-center gap-1 ${card} ${tone.ink}`}>
          <FileText className="h-5 w-5" aria-hidden />
          <div className={`${line} w-6`} />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-1.5">
          <div className={`ml-auto h-5 w-3/5 rounded-xl rounded-br-sm ${tone.bar} opacity-90`} />
          <div className={`w-4/5 space-y-1 rounded-xl rounded-bl-sm p-2 ${card}`}>
            <div className={`${line} w-full`} />
            <div className={`${line} w-2/3`} />
          </div>
          <div className="flex gap-1 pl-1">
            {[0, 1, 2].map((n) => (
              <span key={n} className={`h-1.5 w-1.5 rounded-full ${tone.bar} motion-safe:animate-bounce`} style={{ animationDelay: `${n * 150}ms` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (id === "data-ai") {
    const bars = [38, 52, 44, 66, 58, 82];
    return (
      <div className={`absolute inset-x-6 top-11 bottom-3 flex flex-col p-2.5 ${card} ${lift}`}>
        <div className="flex items-center justify-between">
          <div className={`${line} w-16`} />
          <span className={`inline-flex h-4 w-4 items-center justify-center rounded-full text-white ${tone.bar}`}>
            <Check className="h-2.5 w-2.5" aria-hidden />
          </span>
        </div>
        <div className="mt-2 flex flex-1 items-end gap-1.5">
          {bars.map((h, n) => (
            <div
              key={n}
              className={`flex-1 rounded-t-sm transition-[height] duration-500 ${n === bars.length - 1 ? tone.bar : tone.soft}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (id === "ai-marketing") {
    const filled = [0, 2, 4, 5];
    return (
      <div className={`absolute inset-x-6 top-11 bottom-3 p-2.5 ${card} ${lift}`}>
        <div className="flex items-center justify-between">
          <div className={`${line} w-14`} />
          <span className={`inline-flex items-center gap-0.5 ${tone.ink}`}>
            <TrendingUp className="h-3.5 w-3.5" aria-hidden />
            <span className={`h-1.5 w-5 rounded-full ${tone.bar}`} />
          </span>
        </div>
        <div className="mt-2.5 grid grid-cols-7 gap-1">
          {Array.from({ length: 7 }, (_, n) => (
            <div
              key={n}
              className={`h-10 rounded-md ${filled.includes(n) ? tone.bar : "bg-surface-raised"} ${n === 4 ? "opacity-100" : filled.includes(n) ? "opacity-60" : ""}`}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
}
