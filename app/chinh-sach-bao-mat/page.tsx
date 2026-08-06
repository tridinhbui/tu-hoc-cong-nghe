import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary, format } from "@/lib/i18n";

export const metadata = {
  title: "Chính sách bảo mật - Tự học Tài chính",
};

export default async function PrivacyPolicyPage() {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
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
