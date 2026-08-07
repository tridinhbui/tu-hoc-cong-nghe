"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Bug, Send } from "lucide-react";
import type { BugReport, BugReportMessage, BugStatus } from "@/lib/admin/bugs";
import EmptyState from "@/components/admin/EmptyState";
import {
  addAdminBugReplyAction,
  getBugReportMessagesAction,
  updateBugReportStatusAction,
} from "./actions";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

function statusOptions(t: Dictionary): { value: BugStatus; label: string }[] {
  return [
    { value: "open", label: t.adminThree.bugReportsPanel.statusOpen },
    { value: "investigating", label: t.adminThree.bugReportsPanel.statusInvestigating },
    { value: "fixed", label: t.adminThree.bugReportsPanel.statusFixed },
  ];
}

function severityLabels(t: Dictionary) {
  return {
    low: t.adminThree.bugReportsPanel.severityLow,
    medium: t.adminThree.bugReportsPanel.severityMedium,
    high: t.adminThree.bugReportsPanel.severityHigh,
  } as const;
}

export default function BugReportsPanel({ bugReports }: { bugReports: BugReport[] }) {
  const router = useRouter();
  const { t, locale } = useI18n();
  const tb = t.adminThree.bugReportsPanel;
  const STATUS_OPTIONS = statusOptions(t);
  const SEVERITY_LABELS = severityLabels(t);
  const [isPending, startTransition] = useTransition();
  const [activeReportId, setActiveReportId] = useState<number | null>(null);
  const [messages, setMessages] = useState<BugReportMessage[]>([]);
  const [loadingThread, setLoadingThread] = useState(false);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  async function openReport(reportId: number) {
    setActiveReportId(reportId);
    setLoadingThread(true);
    try {
      const nextMessages = await getBugReportMessagesAction(reportId);
      setMessages(nextMessages);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : tb.loadThreadFailed);
    } finally {
      setLoadingThread(false);
    }
  }

  async function handleStatusChange(status: BugStatus) {
    if (!activeReportId) return;
    setUpdatingStatus(true);
    try {
      await updateBugReportStatusAction(activeReportId, status);
      toast.success(tb.statusUpdated);
      startTransition(() => router.refresh());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : tb.statusUpdateFailed);
    } finally {
      setUpdatingStatus(false);
    }
  }

  async function handleSendReply() {
    if (!activeReportId || !reply.trim()) return;
    setSending(true);
    try {
      await addAdminBugReplyAction(activeReportId, reply.trim());
      const nextMessages = await getBugReportMessagesAction(activeReportId);
      setMessages(nextMessages);
      setReply("");
      toast.success(tb.replySent);
      startTransition(() => router.refresh());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : tb.replySendFailed);
    } finally {
      setSending(false);
    }
  }

  if (bugReports.length === 0) {
    return (
      <EmptyState
        icon={Bug}
        title={tb.emptyTitle}
        description={tb.emptyDescription}
      />
    );
  }

  const activeReport = bugReports.find((report) => report.id === activeReportId) ?? null;

  return (
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-[320px_1fr] min-h-[460px]">
      <div className="border-b md:border-b-0 md:border-r border-stone-200 dark:border-stone-800 divide-y divide-stone-200 dark:divide-stone-800 overflow-y-auto max-h-[560px]">
        {bugReports.map((report) => (
          <button
            key={report.id}
            onClick={() => openReport(report.id)}
            className={`w-full text-left p-3 transition-colors ${
              activeReportId === report.id ? "bg-stone-100 dark:bg-stone-800" : "hover:bg-stone-50 dark:hover:bg-stone-800/50"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate">{report.title}</p>
                <p className="text-xs text-stone-500 dark:text-stone-400 truncate mt-0.5">
                  {report.user_name || report.user_email || tb.unknownUser}
                </p>
              </div>
              {report.unread_user_messages ? (
                <span className="text-[10px] font-bold bg-blue-600 text-white rounded-full px-1.5 py-0.5">
                  {report.unread_user_messages}
                </span>
              ) : null}
            </div>

            <div className="flex items-center gap-2 mt-2 text-[10px] uppercase tracking-wide">
              <span className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300">
                {STATUS_OPTIONS.find((option) => option.value === report.status)?.label}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300">
                {SEVERITY_LABELS[report.severity]}
              </span>
            </div>

            {report.latest_message ? (
              <p className="text-xs text-stone-500 dark:text-stone-400 truncate mt-2">{report.latest_message}</p>
            ) : null}
            <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1">
              {new Date(report.updated_at).toLocaleString(intlLocale(locale))}
            </p>
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        {!activeReport ? (
          <div className="flex-1 flex items-center justify-center text-sm text-stone-400 dark:text-stone-500">
            {tb.selectReportPrompt}
          </div>
        ) : (
          <>
            <div className="px-4 py-3 border-b border-stone-200 dark:border-stone-800 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold text-sm text-stone-900 dark:text-stone-100">{activeReport.title}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    {activeReport.user_name || activeReport.user_email || tb.unknownUser}
                  </p>
                  {activeReport.page_path ? (
                    <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                      {format(tb.pagePathLabel, { path: activeReport.page_path })}
                    </p>
                  ) : null}
                </div>
                <select
                  value={activeReport.status}
                  onChange={(event) => void handleStatusChange(event.target.value as BugStatus)}
                  disabled={updatingStatus || isPending}
                  className="px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="rounded-xl bg-stone-50 dark:bg-stone-800/70 p-3 text-sm text-stone-700 dark:text-stone-300">
                {activeReport.description}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[380px]">
              {loadingThread ? (
                <p className="text-xs text-stone-400">{tb.loading}</p>
              ) : (
                messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-md px-3 py-2 rounded-xl text-sm ${
                        message.sender === "admin"
                          ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                          : "bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-[10px] opacity-60 mt-1">
                        {new Date(message.created_at).toLocaleTimeString(intlLocale(locale), {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 border-t border-stone-200 dark:border-stone-800 flex gap-2">
              <input
                value={reply}
                onChange={(event) => setReply(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && void handleSendReply()}
                placeholder={tb.replyPlaceholder}
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-500"
              />
              <button
                onClick={() => void handleSendReply()}
                disabled={sending || !reply.trim()}
                className="px-3 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
