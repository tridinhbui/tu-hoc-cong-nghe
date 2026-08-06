import { getMessages } from "@/lib/admin/messages";
import { getChatThreads } from "@/lib/admin/chat";
import { getBugReports } from "@/lib/admin/bugs";
import { listAnnouncements } from "@/lib/admin/announcements";
import MessagesCombinedWrapper from "./MessagesCombinedWrapper";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ q?: string; filter?: string; page?: string; tab?: string }>;
}

export default async function AdminMessagesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.q ?? "";
  const filter = (params.filter as "all" | "read" | "unread") ?? "all";
  const page = Number(params.page ?? "1") || 1;
  const tab = params.tab ?? "messages";
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  const tp = t.adminThree.messagesPage;

  const [result, threads, bugReports, announcements] = await Promise.all([
    getMessages({ search, filter, page, pageSize: 20 }).catch(() => ({ messages: [], total: 0, page: 1, pageSize: 20, totalPages: 1 })),
    getChatThreads().catch(() => []),
    getBugReports().catch(() => []),
    listAnnouncements().catch(() => []),
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

      <MessagesCombinedWrapper
        result={result}
        initialSearch={search}
        initialFilter={filter}
        threads={threads}
        bugReports={bugReports}
        announcements={announcements}
        initialSection={tab}
      />
    </div>
  );
}
