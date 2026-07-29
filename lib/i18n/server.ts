import "server-only";
import { cookies } from "next/headers";
import { getDictionary } from "./index";
import { LOCALE_COOKIE, resolveLocale, type Locale } from "./locales";

// Reading the locale on the server is what makes this flash-free: the cookie
// arrives with the request, so the very first HTML already carries the right
// language and <html lang>. That's why the switch is a cookie rather than
// localStorage - localStorage would force the inline-script dance that
// lib/theme.ts#THEME_INIT_SCRIPT has to do for the theme.
//
// `cookies()` is async in Next 16 (see
// node_modules/next/dist/docs/01-app/03-api-reference/04-functions/cookies.md).

export async function getServerLocale(): Promise<Locale> {
  const store = await cookies();
  return resolveLocale(store.get(LOCALE_COOKIE)?.value);
}

/** Convenience for server components that only need the strings. */
export async function getServerDictionary() {
  return getDictionary(await getServerLocale());
}
