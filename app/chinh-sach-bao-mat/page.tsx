import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import { getDictionary, format } from "@/lib/i18n";
import { DEFAULT_LOCALE } from "@/lib/i18n/locales";

// Trang tĩnh: chữ pháp lý không phụ thuộc người đọc là ai.
//
// Trước đây nó gọi `getServerLocale()` để chọn từ điển, và một lần chạm cookie
// là đủ để route rời CDN - với đúng hai trang mà trình thu thập và người chưa
// đăng nhập vào nhiều nhất. Đổi lại: nội dung pháp lý luôn hiện ở ngôn ngữ
// nguồn. Đây là đánh đổi có chủ ý, không phải bỏ sót; bản dịch của hai trang
// này cần một segment ngôn ngữ trong đường dẫn mới làm được mà vẫn tĩnh.
export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(DEFAULT_LOCALE);
  return { title: t.finalTwo.privacyPolicyPage.metaTitle };
}

export default async function PrivacyPolicyPage() {
  const t = getDictionary(DEFAULT_LOCALE);
  const p = t.privacyPolicy;

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <Link
          href="/login"
          className="inline-flex items-center gap-1 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          {p.backLink}
        </Link>

        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">{p.title}</h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-8">{format(p.updatedAt, { date: "2026-07-06" })}</p>

        <div className="space-y-6 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">{p.section1Heading}</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              {p.section1Items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">{p.section2Heading}</h2>
            <p>{p.section2Body}</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">{p.section3Heading}</h2>
            <p>{p.section3Body}</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">{p.section4Heading}</h2>
            <p>{p.section4Body}</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">{p.section5Heading}</h2>
            <p>{p.section5Body}</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">{p.section6Heading}</h2>
            <p>
              {p.section6Part1}{" "}
              <a href="mailto:tribd.tec@gmail.com" className="underline underline-offset-2 hover:text-stone-900 dark:hover:text-stone-100">
                tribd.tec@gmail.com
              </a>
              {p.section6Part2}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
