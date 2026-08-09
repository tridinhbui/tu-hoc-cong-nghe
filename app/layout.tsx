import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";
import ThemeLoader from "@/components/ThemeLoader";
import GlobalChatWrapper from "@/components/GlobalChatWrapper";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { I18nProvider } from "@/lib/i18n/context";
import { getDictionary } from "@/lib/i18n";
import { DEFAULT_LOCALE, LOCALE_INIT_SCRIPT } from "@/lib/i18n/locales";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["vietnamese", "latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

// NEXT_PUBLIC_SITE_URL must be set to the real production domain for the
// og:image/twitter:image URLs below to resolve to an absolute, publicly
// reachable path - without it they fall back to localhost, which is fine
// for local dev but means link previews (Facebook/Zalo/Messenger) will
// show no image at all when the site is actually deployed and shared.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Reads the same generated lesson index the dashboard/homepage counter use,
// so the SEO description's lesson count always matches the real catalog
// size - no manual copy update needed when lessons are added or removed.
export async function generateMetadata(): Promise<Metadata> {
  // Ngôn ngữ mặc định, không đọc cookie: metadata là thứ trình thu thập đọc,
  // và một `generateMetadata` chạm `cookies()` cũng ép route thành động y hệt
  // root layout. Tiêu đề trang vì thế luôn là tiếng Việt - chấp nhận được, vì
  // đây là ngôn ngữ nguồn của toàn bộ nội dung.
  const t = getDictionary(DEFAULT_LOCALE);
  const title = t.finalTwo.rootLayout.siteTitle;
  const lessons = await getLessonsMeta();
  // Round down to the nearest 10 so this doesn't need editing every time a
  // single lesson is added - "360+" stays accurate until the count crosses
  // the next multiple of 10.
  const lessonCountFloor = Math.floor(lessons.length / 10) * 10;
  const description = `${lessonCountFloor}+ bài học - 100% miễn phí - về tài chính cá nhân, CFA và tài chính chuyên ngành. Học 5 phút mỗi ngày, ứng dụng Spaced Repetition để nhớ lâu.`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: title,
      locale: "vi_VN",
      type: "website",
      images: [{ url: "/logo.png", width: 1254, height: 1254, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo.png"],
    },
  };
}

// Async so it can read the locale cookie. The theme needs an inline script
// because it lives in localStorage, which the server can't see - the locale is
// a cookie, so it arrives with the request and the first HTML is already
// correct. No init script, no flash, no hydration mismatch.
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={DEFAULT_LOCALE} className={`${plusJakartaSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Applies the saved/system theme before first paint to avoid a flash of the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {/* Cùng lý do với script chủ đề ngay trên: HTML đầu tiên giờ dựng sẵn
            nên nó không biết cookie ngôn ngữ. Đặt `lang` trước khi vẽ. */}
        <script dangerouslySetInnerHTML={{ __html: LOCALE_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-[#FAFAFC] dark:bg-stone-950 text-stone-900 dark:text-stone-100 antialiased font-sans transition-colors" suppressHydrationWarning>
        <I18nProvider>
        <ThemeLoader />
        {children}
        <GlobalChatWrapper />
        <Toaster position="top-right" richColors closeButton />
        </I18nProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
