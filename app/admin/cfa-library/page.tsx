import { listBooks } from "@/lib/admin/cfa-library";
import CfaLibraryPanel from "./CfaLibraryPanel";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function AdminCfaLibraryPage() {
  const books = await listBooks();
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  const tp = t.adminThree.cfaLibraryPage;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">{tp.title}</h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {tp.subtitle}
        </p>
      </div>

      <CfaLibraryPanel books={books} />
    </div>
  );
}
