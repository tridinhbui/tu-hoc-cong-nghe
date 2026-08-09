"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getDictionary, type Dictionary } from "./index";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  readLocaleCookie,
  LOCALE_COOKIE_MAX_AGE,
  type Locale,
} from "./locales";
import { persistPreferredLocale } from "./persist-locale";

interface I18nValue {
  locale: Locale;
  /** The whole dictionary. Accessed as `t.nav.students` rather than
   *  `t("nav.students")` so a typo is a compile error, not a blank label. */
  t: Dictionary;
  setLocale: (next: Locale) => void;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  initialLocale = DEFAULT_LOCALE,
  children,
}: {
  initialLocale?: Locale;
  children: ReactNode;
}) {
  // Khởi tạo bằng ngôn ngữ mặc định, KHÔNG bằng cookie đọc ở server.
  //
  // Đọc cookie trong app/layout.tsx là thứ duy nhất ép toàn bộ 99 route thành
  // động: một root layout chạm `cookies()` thì mọi trang bên dưới nó không
  // route nào được dựng sẵn hay nằm trên CDN. Chính lib/i18n/locales.ts đã ghi
  // lại cái giá đó và ghi luôn cách trả: đưa ngôn ngữ tới provider mà không
  // qua `cookies()`.
  //
  // Cái giá của chiều ngược lại, nói thẳng: người đọc tiếng Anh thấy một nhịp
  // tiếng Việt ở lần tải đầu, trước khi effect dưới đây kịp chạy. Thuộc tính
  // `lang` thì không nhấp nháy - LOCALE_INIT_SCRIPT đặt nó trước khi vẽ.
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();

  useEffect(() => {
    const fromCookie = readLocaleCookie();
    if (fromCookie !== initialLocale) setLocaleState(fromCookie);
  }, [initialLocale]);

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      // Written from the client rather than through a route handler: there is
      // nothing sensitive here, and skipping the round-trip means the UI
      // switches instantly. Not HttpOnly for the same reason - the client is
      // the writer. SameSite=Lax so it survives normal navigation.
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
      document.documentElement.lang = next;
      // Bản sao bền của cookie, chỉ dùng cho những thứ chạy khi người dùng
      // không có mặt: email cron không đọc được cookie của trình duyệt nào
      // cả, nên trước đây chúng gửi tiếng Việt cho cả người đã chuyển sang
      // tiếng Anh. Không chặn UI: đổi ngôn ngữ vẫn tức thì dù ghi hỏng.
      void persistPreferredLocale(next);
      // Re-renders server components with the new cookie, so any server-rendered
      // strings catch up too. Client components already re-rendered via state.
      router.refresh();
    },
    [router]
  );

  const value = useMemo<I18nValue>(
    () => ({ locale, t: getDictionary(locale), setLocale }),
    [locale, setLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** Throws outside the provider rather than silently falling back, so a
 *  component mounted outside the tree is caught in development instead of
 *  quietly rendering Vietnamese for an English reader. */
export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used inside <I18nProvider> (mounted in app/layout.tsx)");
  }
  return ctx;
}

/** For the handful of shared components that may render outside the provider
 *  (error boundaries, standalone widgets). Falls back to the default locale. */
export function useI18nOptional(): I18nValue {
  const ctx = useContext(I18nContext);
  return (
    ctx ?? {
      locale: DEFAULT_LOCALE,
      t: getDictionary(DEFAULT_LOCALE),
      setLocale: () => {},
    }
  );
}
