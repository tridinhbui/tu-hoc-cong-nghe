"use client";

import { useState } from "react";
import { Bug, Mail, MessageCircle, Users2 } from "lucide-react";
import type { MessagesResult } from "@/lib/admin/messages";
import type { ChatThread } from "@/lib/admin/chat";
import type { BugReport } from "@/lib/admin/bugs";
import MessagesTable from "./MessagesTable";
import ChatThreadsPanel from "./ChatThreadsPanel";
import BugReportsPanel from "./BugReportsPanel";
import CommunityModerationPanel from "./CommunityModerationPanel";
import { useI18n } from "@/lib/i18n/context";

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
  const { t } = useI18n();
  const tm = t.adminThree.messagesTabs;
  const [tab, setTab] = useState<"feedback" | "chat" | "bugs" | "community">("feedback");
  const unreadChat = threads.reduce((sum, t) => sum + t.unread_count, 0);
  const openBugReports = bugReports.filter((report) => report.status !== "fixed").length;

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab("feedback")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
            tab === "feedback"
              ? "border border-brand-600 bg-accent-soft text-ink-max dark:border-brand-400"
              : "border border-line-strong text-ink-soft hover:border-stone-950 dark:hover:border-stone-300"
          }`}
        >
          <Mail className="w-4 h-4" />
          {tm.feedback}
          {result.total > 0 && <span className="opacity-60">({result.total})</span>}
        </button>
        <button
          onClick={() => setTab("chat")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
            tab === "chat"
              ? "border border-brand-600 bg-accent-soft text-ink-max dark:border-brand-400"
              : "border border-line-strong text-ink-soft hover:border-stone-950 dark:hover:border-stone-300"
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          {tm.chat}
          {unreadChat > 0 && <span className="rounded-xs bg-brand-600 px-1.5 py-0.5 font-mono text-[10px] font-medium tabular-nums text-white">{unreadChat}</span>}
        </button>
        <button
          onClick={() => setTab("bugs")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
            tab === "bugs"
              ? "border border-brand-600 bg-accent-soft text-ink-max dark:border-brand-400"
              : "border border-line-strong text-ink-soft hover:border-stone-950 dark:hover:border-stone-300"
          }`}
        >
          <Bug className="w-4 h-4" />
          {tm.bugs}
          {openBugReports > 0 && <span className="opacity-60">({openBugReports})</span>}
        </button>
        <button
          onClick={() => setTab("community")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
            tab === "community"
              ? "border border-brand-600 bg-accent-soft text-ink-max dark:border-brand-400"
              : "border border-line-strong text-ink-soft hover:border-stone-950 dark:hover:border-stone-300"
          }`}
        >
          <Users2 className="w-4 h-4" />
          {tm.community}
        </button>
      </div>

      {tab === "feedback" ? (
        <MessagesTable result={result} initialSearch={initialSearch} initialFilter={initialFilter} />
      ) : tab === "chat" ? (
        <ChatThreadsPanel threads={threads} />
      ) : tab === "bugs" ? (
        <BugReportsPanel bugReports={bugReports} />
      ) : (
        <CommunityModerationPanel />
      )}
    </div>
  );
}
