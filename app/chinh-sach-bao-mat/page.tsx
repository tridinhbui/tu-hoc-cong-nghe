import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Sys } from "@/components/ui/system";
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

/* i18n-ignore-start: định danh hệ thống và ngày ISO - cùng một chuỗi ở mọi
   ngôn ngữ. Ngày là ngày cập nhật thật của văn bản, trước đây viết thẳng
   trong lời gọi format(). */
const SYS_CODE = "THCN://LEGAL/PRIVACY";
const SYS_DATE = "2026-07-06";
/* i18n-ignore-end */

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(DEFAULT_LOCALE);
  return { title: t.finalTwo.privacyPolicyPage.metaTitle };
}

export default async function PrivacyPolicyPage() {
  const t = getDictionary(DEFAULT_LOCALE);
  const p = t.privacyPolicy;

  return (
    <div className="min-h-screen bg-page dark:bg-stone-950">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <Link
          href="/login"
          className="mb-8 inline-flex items-center gap-1 text-sm font-bold text-ink-muted transition-colors hover:text-ink-max"
        >
          <ChevronLeft className="w-4 h-4" />
          {p.backLink}
        </Link>

        <div className="border-b border-line-strong pb-2">
          <Sys className="text-ink-muted">{SYS_CODE}</Sys>
        </div>
        <h1 className="mt-4 text-[1.9rem] font-black leading-[1.1] tracking-tight text-ink-max sm:text-4xl">{p.title}</h1>
        <p className="mt-2 mb-8 text-sm text-ink-muted">{format(p.updatedAt, { date: SYS_DATE })}</p>

        <div className="divide-y divide-stone-200 border-t border-stone-300 text-sm leading-relaxed text-ink-body dark:divide-stone-800 dark:border-stone-700">
          <section className="py-5">
            <h2 className="mb-2 text-base font-black tracking-tight text-ink-max">{p.section1Heading}</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              {p.section1Items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="py-5">
            <h2 className="mb-2 text-base font-black tracking-tight text-ink-max">{p.section2Heading}</h2>
            <p>{p.section2Body}</p>
          </section>

          <section className="py-5">
            <h2 className="mb-2 text-base font-black tracking-tight text-ink-max">{p.section3Heading}</h2>
            <p>{p.section3Body}</p>
          </section>

          <section className="py-5">
            <h2 className="mb-2 text-base font-black tracking-tight text-ink-max">{p.section4Heading}</h2>
            <p>{p.section4Body}</p>
          </section>

          <section className="py-5">
            <h2 className="mb-2 text-base font-black tracking-tight text-ink-max">{p.section5Heading}</h2>
            <p>{p.section5Body}</p>
          </section>

          <section className="py-5">
            <h2 className="mb-2 text-base font-black tracking-tight text-ink-max">{p.section6Heading}</h2>
            <p>
              {p.section6Part1}{" "}
              <a href="mailto:tribd.tec@gmail.com" className="font-bold text-accent-strong underline-offset-4 hover:underline">
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
