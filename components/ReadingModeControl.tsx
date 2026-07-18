"use client";

import { Sun, BookOpen, Moon } from "lucide-react";
import { setTheme } from "@/lib/theme";

export type ReadingMode = "light" | "sepia" | "dark";

const STORAGE_KEY = "lesson_reading_mode";

export function loadReadingMode(): ReadingMode {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "sepia" || saved === "dark" ? saved : "light";
}

const MODES: { id: ReadingMode; label: string; icon: typeof Sun }[] = [
  { id: "light", label: "Sáng", icon: Sun },
  { id: "sepia", label: "Dịu nhẹ", icon: BookOpen },
  { id: "dark", label: "Tối", icon: Moon },
];

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
  function select(next: ReadingMode) {
    onChange(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    setTheme(next === "dark" ? "dark" : "light");
  }

  return (
    <div className="flex items-center gap-0.5 bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 rounded-full px-1 py-1">
      {MODES.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => select(id)}
          aria-label={`Chế độ đọc: ${label}`}
          title={label}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            mode === id
              ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
              : "text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
          }`}
        >
          <Icon className="w-3.5 h-3.5" />
        </button>
      ))}
    </div>
  );
}
