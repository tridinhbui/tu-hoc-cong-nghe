import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["vietnamese", "latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tự học Tài chính Mỗi Ngày",
  description: "Mỗi ngày chỉ 5 phút để hiểu thêm một khái niệm tài chính. Dành cho người Việt Nam.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${plusJakartaSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Applies the saved/system theme before first paint to avoid a flash of the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-[#FAFAFC] dark:bg-stone-950 text-stone-900 dark:text-stone-100 antialiased font-sans transition-colors" suppressHydrationWarning>{children}</body>
    </html>
  );
}
