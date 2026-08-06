import { Settings } from "lucide-react";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";

export default async function AdminSettingsPage() {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  const tp = t.adminThree.settingsPage;
  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">{tp.title}</h1>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        {tp.subtitle}
      </p>
      <div className="bg-white dark:bg-stone-900 border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-xl p-16 flex flex-col items-center text-center">
        <Settings className="w-10 h-10 text-stone-300 dark:text-stone-700 mb-3" />
        <p className="font-semibold text-stone-600 dark:text-stone-400">{tp.comingSoon}</p>
        <p className="text-sm text-stone-400 dark:text-stone-500 mt-1 max-w-sm">
          {tp.description}
        </p>
      </div>
    </div>
  );
}
