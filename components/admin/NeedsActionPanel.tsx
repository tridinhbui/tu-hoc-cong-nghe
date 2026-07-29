import Link from "next/link";
import { AlertCircle, ShieldQuestion, Bug, Unlock, FileText, MessageSquare, PartyPopper } from "lucide-react";

interface NeedsActionItem {
  key: string;
  label: string;
  count: number;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

// The one panel on the overview page that answers "what do I do today?"
// instead of "what happened" - every other card/chart on app/admin/page.tsx
// is a historical number, this is the only one that turns into a to-do list.
// Pure props in, no data fetching of its own, so the counts here can never
// drift from what AdminSidebar's badges show - both read the same helpers.
export default function NeedsActionPanel({
  pendingAppeals,
  openBugReports,
  pendingUnlocks,
  pendingDocuments,
  unreadMessages,
}: {
  pendingAppeals: number;
  openBugReports: number;
  pendingUnlocks: number;
  pendingDocuments: number;
  unreadMessages: number;
}) {
  const items: NeedsActionItem[] = [
    { key: "appeals", label: "Khiếu nại chờ duyệt", count: pendingAppeals, href: "/admin/appeals", icon: ShieldQuestion },
    { key: "bugs", label: "Báo lỗi đang mở", count: openBugReports, href: "/admin/messages", icon: Bug },
    { key: "unlocks", label: "Yêu cầu mở khóa bài học", count: pendingUnlocks, href: "/admin/lessons", icon: Unlock },
    { key: "documents", label: "Tài liệu chờ duyệt", count: pendingDocuments, href: "/admin/documents", icon: FileText },
    { key: "messages", label: "Tin nhắn & chat chưa đọc", count: unreadMessages, href: "/admin/messages", icon: MessageSquare },
  ];

  const totalPending = items.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 uppercase tracking-widest flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          Cần xử lý ngay
        </h2>
        {totalPending > 0 && (
          <span className="text-xs text-stone-500 dark:text-stone-400">{totalPending} việc</span>
        )}
      </div>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
        Mọi hàng đợi cần admin duyệt hoặc trả lời, gộp về một chỗ.
      </p>

      {totalPending === 0 ? (
        <div className="py-8 flex flex-col items-center gap-2 text-center">
          <PartyPopper className="w-8 h-8 text-emerald-500" />
          <p className="text-sm font-bold text-stone-700 dark:text-stone-300">
            Không có việc gì cần xử lý 🎉
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const pending = item.count > 0;
            return (
              <div
                key={item.key}
                className={`flex items-center justify-between gap-3 rounded-lg px-3.5 py-3 ${
                  pending
                    ? "bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50"
                    : "bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${pending ? "text-amber-600 dark:text-amber-400" : "text-stone-400 dark:text-stone-600"}`} />
                  <span className="text-sm font-semibold text-stone-700 dark:text-stone-300 truncate">{item.label}</span>
                  <span
                    className={`text-sm font-extrabold shrink-0 ${
                      pending ? "text-amber-700 dark:text-amber-400" : "text-stone-400 dark:text-stone-600"
                    }`}
                  >
                    {item.count}
                  </span>
                </div>
                {pending ? (
                  <Link
                    href={item.href}
                    className="shrink-0 inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:opacity-90 transition-opacity"
                  >
                    Xử lý ngay →
                  </Link>
                ) : (
                  <span className="shrink-0 text-xs font-semibold text-stone-400 dark:text-stone-600">Đã xong</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
