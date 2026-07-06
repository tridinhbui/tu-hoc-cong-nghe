import Link from "next/link";
import { MessageSquare, Users, BookOpen, Clock, FileText } from "lucide-react";
import { getUnreadMessageCount } from "@/lib/admin/messages";
import { getUnreadChatCount } from "@/lib/admin/chat";
import { getUserCount } from "@/lib/admin/users";
import { getLessonCount } from "@/lib/admin/lessons";
import { getPendingUnlockCount } from "@/lib/admin/unlock-requests";
import { getDocumentCount } from "@/lib/admin/documents";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [unreadMessages, unreadChat, userCount, lessonCount, pendingUnlocks, documentCount] = await Promise.all([
    getUnreadMessageCount(),
    getUnreadChatCount(),
    getUserCount(),
    getLessonCount(),
    getPendingUnlockCount(),
    getDocumentCount(),
  ]);

  const cards = [
    {
      href: "/admin/messages",
      label: "Tin nhắn chưa đọc",
      value: unreadMessages + unreadChat,
      icon: MessageSquare,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/40",
    },
    {
      href: "/admin/users",
      label: "Tổng người dùng",
      value: userCount,
      icon: Users,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
    },
    {
      href: "/admin/lessons",
      label: "Tổng bài học",
      value: lessonCount,
      icon: BookOpen,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/40",
    },
    {
      href: "/admin/lessons",
      label: "Yêu cầu mở khóa chờ duyệt",
      value: pendingUnlocks,
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40",
    },
    {
      href: "/admin/documents",
      label: "Tài liệu giveaway",
      value: documentCount,
      icon: FileText,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-950/40",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">Tổng quan</h1>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        Trạng thái hệ thống Tự Học Tài Chính
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5 hover:border-stone-400 dark:hover:border-stone-600 transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">{card.value}</p>
              <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 mt-1">{card.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
