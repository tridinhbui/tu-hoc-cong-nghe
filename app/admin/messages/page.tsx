import { getMessages } from "@/lib/admin/messages";
import { getChatThreads } from "@/lib/admin/chat";
import MessagesTabs from "./MessagesTabs";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ q?: string; filter?: string; page?: string }>;
}

export default async function AdminMessagesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.q ?? "";
  const filter = (params.filter as "all" | "read" | "unread") ?? "all";
  const page = Number(params.page ?? "1") || 1;

  const [result, threads] = await Promise.all([
    getMessages({ search, filter, page, pageSize: 20 }),
    getChatThreads(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">Tin nhắn</h1>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        Góp ý gửi qua form liên hệ, và các cuộc trò chuyện trực tiếp từ khung chat
      </p>
      <MessagesTabs result={result} initialSearch={search} initialFilter={filter} threads={threads} />
    </div>
  );
}
