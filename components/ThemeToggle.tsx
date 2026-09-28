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
      role="switch"
      aria-checked={isDark}
      className={`w-11 h-6 rounded-sm border transition-colors flex items-center cursor-pointer ${
        isDark ? "bg-brand-600 border-brand-600" : "bg-surface-raised border-line-firm"
      }`}
    >
      <div
        className={`w-4 h-4 rounded-xs bg-white border border-line-strong transition-transform ${
          isDark ? "translate-x-5.5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
