"use client";

import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { LOCALES, LOCALE_LABELS, LOCALE_SHORT_LABELS } from "@/lib/i18n/locales";

/**
 * Two-locale segmented toggle rather than a dropdown: with exactly two
 * options a select costs an extra click and hides the alternative behind it.
 * Both labels stay visible and each is written in its own language, so a
 * reader who can't read the current UI can still find their way out.
 */
export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, t, setLocale } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.language.label}
      className="inline-flex items-center rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 p-0.5"
    >
      {LOCALES.map((code) => {
        const isActive = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => !isActive && setLocale(code)}
            aria-pressed={isActive}
            // The label is already in the target language, so the accessible
            // name spells out the action in the language the user is reading
            // right now.
            title={
              isActive
                ? format(t.language.current, { name: LOCALE_LABELS[code] })
                : format(t.language.switchTo, { name: LOCALE_LABELS[code] })
            }
            className={`cursor-pointer rounded-lg px-2 py-1 text-[11px] font-extrabold uppercase tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
              isActive
                ? "bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-2xs"
                : "text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
            }`}
          >
            {compact ? LOCALE_SHORT_LABELS[code] : LOCALE_LABELS[code]}
          </button>
        );
      })}
    </div>
  );
}
