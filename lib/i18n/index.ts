import { vi, type Dictionary } from "./dictionaries/vi";
import { en } from "./dictionaries/en";
import { DEFAULT_LOCALE, type Locale } from "./locales";

// Statically imported rather than the dynamic `import()` + `server-only`
// pattern in the Next docs, because these dictionaries are needed in client
// components too (useI18n). Both together are a few KB - far cheaper than the
// async plumbing a lazy split would need on the client.
const DICTIONARIES: Record<Locale, Dictionary> = { vi, en };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}

/** Fills {placeholders} in a dictionary string.
 *
 *  Deliberately not a general template engine: an unknown placeholder is left
 *  visibly intact ("{name}") rather than replaced with "undefined", so a
 *  missing variable shows up in review instead of shipping as a broken
 *  sentence. */
export function format(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : match
  );
}

/**
 * BCP 47 tag for `Intl` / `toLocaleDateString` / `toLocaleString`.
 *
 * There are 53 hard-coded `"vi-VN"` arguments across 40 files, which is why this
 * exists as one table rather than a find-and-replace per call site: they all
 * have to move together, or an English reader gets Vietnamese month names in
 * some places and not others.
 *
 * English maps to en-GB, not en-US, and that is deliberate. Vietnamese formats
 * dates day-first (25/12/2026) and so does en-GB; en-US would silently reorder
 * to 12/25/2026. Since these dates sit in the same layouts and often next to
 * each other in a list, changing language should not change what position the
 * day is in - "03/04" meaning two different dates depending on the UI language
 * is the kind of bug nobody reports and everyone misreads.
 */
/* i18n-ignore-start: thẻ BCP 47 truyền cho Intl, không phải chữ hiện ra màn
   hình. Dịch chúng thì `new Intl.DateTimeFormat()` ném lỗi. */
export const INTL_LOCALE: Record<Locale, string> = {
  vi: "vi-VN",
  en: "en-GB",
};
/* i18n-ignore-end */

/** `Intl` tag for the given UI locale, falling back rather than throwing. */
export function intlLocale(locale: Locale): string {
  return INTL_LOCALE[locale] ?? INTL_LOCALE[DEFAULT_LOCALE];
}

export type { Dictionary };
export * from "./locales";
