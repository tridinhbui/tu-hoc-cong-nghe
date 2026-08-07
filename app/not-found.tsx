import Link from "next/link";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";

export default async function NotFound() {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-sm">
        <p className="text-6xl font-extrabold text-stone-900 dark:text-stone-100">404</p>
        <div className="space-y-2">
          <p className="text-lg font-bold text-stone-900 dark:text-stone-100">{t.finalTwo.notFoundPage.title}</p>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {t.finalTwo.notFoundPage.body}
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-block bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 px-6 py-3 rounded-xl font-bold text-sm transition-colors"
        >
          {t.finalTwo.notFoundPage.backToDashboard}
        </Link>
      </div>
    </div>
  );
}
