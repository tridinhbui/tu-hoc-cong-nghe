// Locale primitives. Kept dependency-free (no next/headers, no React) so it
// can be imported from server components, client components, the proxy, and
// plain scripts alike.

export const LOCALES = ["vi", "en"] as const;
export type Locale = (typeof LOCALES)[number];

// Vietnamese is the source language: every string in the app was authored in
// it, so an unrecognized or missing cookie should land the reader on the
// complete experience.
//
// Lesson content is now translated too, one lesson at a time, under
// lib/lessons-i18n/<locale>/ - see lib/lesson-translations.js. It is a patch
// merged onto the Vietnamese lesson rather than a replacement, so a lesson with
// no translation yet still renders, in Vietnamese, with a "Vietnamese only"
// badge (components/LessonTranslationBadge.tsx). That fallback is deliberate:
// hiding untranslated lessons from an English reader would punch holes in the
// day-numbered path and break both the lesson-unlock gate and the /su-nghiep
// competency percentages, which count lessons.
export const DEFAULT_LOCALE: Locale = "vi";

// Not the `NEXT_LOCALE` name Next.js uses for its own built-in i18n routing -
// this app does cookie-based switching without a [lang] route segment, and
// reusing that name would imply routing behaviour that isn't there.
//
// Note the cost this choice already imposes, since it is easy to miss: reading
// the cookie in app/layout.tsx to seed the i18n provider makes every route in
// the app server-rendered on demand. app/bai-hoc/[slug] still carries a
// generateStaticParams and used to be CDN-served; `next build` now reports it as
// dynamic. Restoring static rendering means getting the locale to the provider
// without `cookies()`, not adding routes around it.
export const LOCALE_COOKIE = "thtcdn_locale";

// One year. The switch is an explicit user choice, so it should outlive a
// session; there's nothing sensitive in it.
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/* i18n-ignore-start: tên mỗi ngôn ngữ viết bằng CHÍNH ngôn ngữ đó - đó là cả điểm của một hộp
   đổi ngôn ngữ. Người đang đọc giao diện tiếng Việt mà muốn chuyển sang tiếng
   Anh cần thấy chữ "English", không phải "Tiếng Anh" */
/* i18n-ignore-start: tên mỗi ngôn ngữ viết BẰNG CHÍNH ngôn ngữ đó - "Tiếng
   Việt" và "English". Đó là quy ước của mọi bộ chuyển ngôn ngữ: người đang đọc
   tiếng Anh phải nhận ra dòng tiếng Việt để bấm vào. Dịch nó là làm hỏng đúng
   chức năng của nó. */
export const LOCALE_LABELS: Record<Locale, string> = {
  vi: "Tiếng Việt",
  en: "English",
};
/* i18n-ignore-end */
/* i18n-ignore-end */

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

/** Đọc cookie ngôn ngữ ở phía trình duyệt.
 *
 *  Đối trọng của `getServerLocale()`: cùng một cookie, đọc từ phía không có
 *  `next/headers`. Có nó thì `app/layout.tsx` không cần chạm `cookies()` nữa,
 *  và đó là điều kiện duy nhất để mọi route không bị ép thành động. */
export function readLocaleCookie(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE}=([^;]*)`)
  );
  return resolveLocale(match?.[1]);
}

/** Đặt thuộc tính `lang` trước khi trang vẽ lần đầu.
 *
 *  Cùng khuôn với THEME_INIT_SCRIPT và vì cùng một lý do: HTML đầu tiên giờ
 *  được dựng sẵn ở mức tĩnh nên nó không biết cookie của người đọc. Script này
 *  chạy đồng bộ trong <head>, trước khi có gì được vẽ, nên `lang` đúng ngay từ
 *  khung hình đầu - trình đọc màn hình và trình dịch của trình duyệt đọc thuộc
 *  tính này chứ không đọc state của React. */
export const LOCALE_INIT_SCRIPT = `(function(){try{var m=document.cookie.match(/(?:^|;\\s*)${LOCALE_COOKIE}=([^;]*)/);var l=m&&m[1];if(l==="en"||l==="vi"){document.documentElement.lang=l;}}catch(e){}})();`;
