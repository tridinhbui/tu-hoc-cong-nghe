import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
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
    <html lang="vi" className={`${plusJakartaSans.variable}`}>
      <body className="min-h-screen bg-[#FAFAFC] text-stone-900 antialiased font-sans">{children}</body>
    </html>
  );
}
