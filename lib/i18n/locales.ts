// Locale primitives. Kept dependency-free (no next/headers, no React) so it
// can be imported from server components, client components, the proxy, and
// plain scripts alike.

export const LOCALES = ["vi", "en"] as const;
export type Locale = (typeof LOCALES)[number];

// Vietnamese is the source language: every string in the app was authored in
// it, and lesson content stays Vietnamese-only for now, so an unrecognized or
// missing cookie should land the reader on the complete experience.
export const DEFAULT_LOCALE: Locale = "vi";

// Not the `NEXT_LOCALE` name Next.js uses for its own built-in i18n routing -
// this app deliberately does cookie-based switching without a [lang] route
// segment, and reusing that name would imply routing behaviour that isn't
// there.
export const LOCALE_COOKIE = "thtcdn_locale";

// One year. The switch is an explicit user choice, so it should outlive a
// session; there's nothing sensitive in it.
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const LOCALE_LABELS: Record<Locale, string> = {
  vi: "Tiếng Việt",
  en: "English",
};

/** Short label for the switcher button, where space is tight. */
export const LOCALE_SHORT_LABELS: Record<Locale, string> = {
  vi: "VI",
  en: "EN",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** Narrows anything (cookie value, Accept-Language fragment, URL param) to a
 *  supported locale, falling back rather than throwing - a bad cookie should
 *  never be able to break a render. */
export function resolveLocale(value: unknown): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}
