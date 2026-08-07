import { listAppeals } from "@/lib/admin/appeals";
import { listAiReports } from "@/lib/admin/ai-reports";
import AppealsCombinedWrapper from "./AppealsCombinedWrapper";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function AdminAppealsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; tab?: string }>;
}) {
  const { view = "pending", tab = "appeals" } = await searchParams;
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  const tp = t.adminThree.appealsPage;

  const [appeals, aiReports] = await Promise.all([
    listAppeals(view === "all" ? "all" : "pending").catch(() => []),
    listAiReports().catch(() => []),
  ]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">
          {tp.title}
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {tp.subtitle}
        </p>
      </div>

      <AppealsCombinedWrapper
        appeals={appeals}
        aiReports={aiReports}
        initialView={view}
        initialSection={tab}
      />
    </div>
  );
}
