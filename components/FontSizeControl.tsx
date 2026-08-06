"use client";

import { useI18n } from "@/lib/i18n/context";

const SCALES = [0.875, 1, 1.125, 1.25, 1.375];
const STORAGE_KEY = "lesson_font_scale";
// Default reading size is one notch above the control's own 100% baseline
// (a ~12.5% bump) - the A-/A+ control still ranges the same five steps,
// it just starts one step higher unless the learner has explicitly picked
// a size before.
const DEFAULT_SCALE = 1.125;

export function loadFontScale(): number {
  if (typeof window === "undefined") return DEFAULT_SCALE;
  const saved = Number(window.localStorage.getItem(STORAGE_KEY));
  return SCALES.includes(saved) ? saved : DEFAULT_SCALE;
}

interface Props {
  scale: number;
  onChange: (scale: number) => void;
}

// A- / A+ reading-size control. Applied as CSS `zoom` on the article content
// wrapper (see LessonPageLayout) rather than a plain fontSize, since lesson
// content is ~300 hand-written pages that each set their own explicit
// Tailwind text-sm/lg/xl/2xl classes - a fontSize/em-based approach on the
// wrapper wouldn't cascade into those fixed-rem children, but `zoom` rescales
// the whole rendered subtree uniformly regardless of how descendants size themselves.
export default function FontSizeControl({ scale, onChange }: Props) {
  const { t } = useI18n();
  const index = SCALES.indexOf(scale);

  function set(newIndex: number) {
    const clamped = Math.min(SCALES.length - 1, Math.max(0, newIndex));
    const next = SCALES[clamped];
    onChange(next);
    window.localStorage.setItem(STORAGE_KEY, String(next));
  }

  return (
    <div className="hidden sm:flex items-center gap-1 bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 rounded-full px-1.5 py-1">
      <button
        onClick={() => set(index - 1)}
        disabled={index === 0}
        aria-label={t.fontSize.decrease}
        title={t.fontSize.decrease}
        className="w-7 h-7 rounded-full flex items-center justify-center text-stone-600 dark:text-stone-400 text-xs font-bold hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        {t.fontSize.smaller}
      </button>
      <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 w-9 text-center tabular-nums">
        {Math.round(scale * 100)}%
      </span>
      <button
        onClick={() => set(index + 1)}
        disabled={index === SCALES.length - 1}
        aria-label={t.fontSize.increase}
        title={t.fontSize.increase}
        className="w-7 h-7 rounded-full flex items-center justify-center text-stone-600 dark:text-stone-400 text-sm font-bold hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        {t.fontSize.larger}
      </button>
    </div>
  );
}
