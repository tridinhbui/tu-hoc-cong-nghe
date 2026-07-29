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
import { getServerLocale } from "@/lib/i18n/server";
import { I18nProvider } from "@/lib/i18n/context";

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
const title = "Tự học Tài chính Mỗi Ngày";

// Reads the same generated lesson index the dashboard/homepage counter use,
// so the SEO description's lesson count always matches the real catalog
// size - no manual copy update needed when lessons are added or removed.
export async function generateMetadata(): Promise<Metadata> {
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
  const locale = await getServerLocale();

  return (
    <html lang={locale} className={`${plusJakartaSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Applies the saved/system theme before first paint to avoid a flash of the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-[#FAFAFC] dark:bg-stone-950 text-stone-900 dark:text-stone-100 antialiased font-sans transition-colors" suppressHydrationWarning>
        <I18nProvider initialLocale={locale}>
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
