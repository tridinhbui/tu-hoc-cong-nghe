import { Gamepad2 } from "lucide-react";
import GamesAdminClient from "./GamesAdminClient";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function GamesAdminPage() {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  const tp = t.adminThree.gamesPage;
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
          <Gamepad2 className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">{tp.title}</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">{tp.subtitle}</p>
        </div>
      </div>

      <GamesAdminClient />
    </div>
  );
}
