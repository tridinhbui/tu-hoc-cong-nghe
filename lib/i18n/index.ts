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

export type { Dictionary };
export * from "./locales";
