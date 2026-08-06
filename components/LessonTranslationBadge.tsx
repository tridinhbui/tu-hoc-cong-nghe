"use client";

import { useI18nOptional } from "@/lib/i18n/context";
import { DEFAULT_LOCALE } from "@/lib/i18n/locales";

/**
 * Tells an English reader that this particular lesson is still in Vietnamese.
 *
 * The `translated` flag comes from the server, where lib/lesson-translations.js
 * set it while merging (or failing to find) a translation patch. This component
 * only supplies the reader's locale, which it already has from the provider
 * seeded server-side in app/layout.tsx - so there is no flash and no second
 * source of truth about whether a lesson is translated.
 *
 * Renders nothing for a Vietnamese reader - the lesson is in their language and
 * there is nothing to flag - and nothing once the lesson has been translated.
 *
 * `useI18nOptional` rather than `useI18n`: this sits inside the lesson body,
 * which is also rendered by a handful of hand-authored pages that may not be
 * under the provider. Falling back to the source locale there means the badge
 * simply doesn't render, which is the correct outcome - those pages hold their
 * content inline and cannot be translated through this mechanism anyway.
 */
export default function LessonTranslationBadge({ translated }: { translated?: boolean }) {
  const { locale, t } = useI18nOptional();

  if (locale === DEFAULT_LOCALE) return null;
  if (translated) return null;

  return (
    <p
      title={t.content.viOnlyBadgeTitle}
      className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 text-[11px] font-bold text-amber-800 dark:text-amber-300"
    >
      <span aria-hidden="true">🇻🇳</span>
      {t.content.viOnlyBadge}
    </p>
  );
}
