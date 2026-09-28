"use client";

import { Sun, BookOpen, Moon } from "lucide-react";
import { setTheme } from "@/lib/theme";
import { useI18n } from "@/lib/i18n/context";
import { format, type Dictionary } from "@/lib/i18n";

export type ReadingMode = "light" | "sepia" | "dark";

const STORAGE_KEY = "lesson_reading_mode";

export function loadReadingMode(): ReadingMode {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "sepia" || saved === "dark" ? saved : "light";
}

// Labels come from the dictionary at render time; module scope has no
// useI18n() to call, so this keeps only the ids/icons and their order.
function modes(t: Dictionary): { id: ReadingMode; label: string; icon: typeof Sun }[] {
  return [
    { id: "light", label: t.finalTwo.readingModeControl.light, icon: Sun },
    { id: "sepia", label: t.finalTwo.readingModeControl.sepia, icon: BookOpen },
    { id: "dark", label: t.finalTwo.readingModeControl.dark, icon: Moon },
  ];
}

interface Props {
  mode: ReadingMode;
  onChange: (mode: ReadingMode) => void;
}

// Kindle-style 3-way reading theme, scoped to the lesson's article content
// (see the `.reading-sepia` filter in globals.css and its usage in
// LessonPageLayout) rather than a 2-way toggle. "Sáng"/"Tối" just drive the
// site's existing global light/dark theme (lib/theme.ts) - the app is
// already fully themed for those two. "Dịu nhẹ" (sepia) is genuinely new:
// there's no third `sepia:` Tailwind variant threaded through every lesson
// component, so instead of retrofitting hundreds of hand-written lesson
// pages, it forces the light theme as a base and applies a warm CSS filter
// over the reading area - the same technique reader-mode browser extensions
// use, and it needs zero changes to existing component styling.
export default function ReadingModeControl({ mode, onChange }: Props) {
  const { t } = useI18n();
  const MODES = modes(t);
  function select(next: ReadingMode) {
    onChange(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    setTheme(next === "dark" ? "dark" : "light");
  }

  return (
    <div className="flex items-center gap-0.5 border border-line-strong rounded-sm p-0.5">
      {MODES.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => select(id)}
          aria-label={format(t.finalTwo.readingModeControlLabels.readingModeAria, { mode: label })}
          title={label}
          aria-pressed={mode === id}
          className={`w-7 h-7 rounded-xs flex items-center justify-center transition-colors cursor-pointer ${
            mode === id
              ? "bg-accent-soft text-accent-strong"
              : "text-ink-muted hover:bg-surface-raised hover:text-ink"
          }`}
        >
          <Icon className="w-3.5 h-3.5" />
        </button>
      ))}
    </div>
  );
}
