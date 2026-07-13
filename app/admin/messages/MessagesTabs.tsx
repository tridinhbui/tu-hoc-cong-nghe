"use client";

import { useState } from "react";
import { Bug, Mail, MessageCircle } from "lucide-react";
import type { MessagesResult } from "@/lib/admin/messages";
import type { ChatThread } from "@/lib/admin/chat";
import type { BugReport } from "@/lib/admin/bugs";
import MessagesTable from "./MessagesTable";
import ChatThreadsPanel from "./ChatThreadsPanel";
import BugReportsPanel from "./BugReportsPanel";

export default function MessagesTabs({
  result,
  initialSearch,
  initialFilter,
  threads,
  bugReports,
}: {
  result: MessagesResult;
  initialSearch: string;
  initialFilter: "all" | "read" | "unread";
  threads: ChatThread[];
  bugReports: BugReport[];
}) {
  const [tab, setTab] = useState<"feedback" | "chat" | "bugs">("feedback");
  const unreadChat = threads.reduce((sum, t) => sum + t.unread_count, 0);
  const openBugReports = bugReports.filter((report) => report.status !== "fixed").length;

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab("feedback")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
            tab === "feedback"
              ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
              : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
          }`}
        >
          <Mail className="w-4 h-4" />
          Góp ý
          {result.total > 0 && <span className="opacity-60">({result.total})</span>}
        </button>
        <button
          onClick={() => setTab("chat")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
            tab === "chat"
              ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
              : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          Chat trực tiếp
          {unreadChat > 0 && <span className="bg-blue-600 text-white text-[10px] rounded-full px-1.5 py-0.5">{unreadChat}</span>}
        </button>
        <button
          onClick={() => setTab("bugs")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
            tab === "bugs"
              ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
              : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
          }`}
        >
          <Bug className="w-4 h-4" />
          Bảng lỗi
          {openBugReports > 0 && <span className="opacity-60">({openBugReports})</span>}
        </button>
      </div>

      {tab === "feedback" ? (
        <MessagesTable result={result} initialSearch={initialSearch} initialFilter={initialFilter} />
      ) : tab === "chat" ? (
        <ChatThreadsPanel threads={threads} />
      ) : (
        <BugReportsPanel bugReports={bugReports} />
      )}
    </div>
  );
}
