import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "katex/dist/katex.min.css";
import "./globals.css";

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
const description = "300+ bài học miễn phí về tài chính cá nhân, CFA và tài chính chuyên ngành. Học 5 phút mỗi ngày, ứng dụng Spaced Repetition để nhớ lâu.";

export const metadata: Metadata = {
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${plusJakartaSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Applies the saved/system theme before first paint to avoid a flash of the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-[#FAFAFC] dark:bg-stone-950 text-stone-900 dark:text-stone-100 antialiased font-sans transition-colors" suppressHydrationWarning>
        {children}
        <Toaster position="top-right" richColors closeButton />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
