"use client";

import { useState } from "react";
import { getInitialTheme, setTheme as persistTheme, type Theme } from "@/lib/theme";
import { useI18n } from "@/lib/i18n/context";

export default function ThemeToggle() {
  const { t } = useI18n();
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme());
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => {
        const next: Theme = isDark ? "light" : "dark";
        setThemeState(next);
        persistTheme(next);
      }}
      aria-label={isDark ? t.miscUi.themeToggle.toLight : t.miscUi.themeToggle.toDark}
      className={`w-12 h-6 rounded-full border-2 transition-colors flex items-center cursor-pointer ${
        isDark ? "bg-emerald-600 border-emerald-700" : "bg-stone-200 border-stone-300"
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white transition-transform ${
          isDark ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
