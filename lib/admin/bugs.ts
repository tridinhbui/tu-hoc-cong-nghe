import "server-only";
import { createAdminClient } from "@/lib/supabase-admin";

export type BugStatus = "open" | "investigating" | "fixed";
export type BugSeverity = "low" | "medium" | "high";

export interface BugReport {
  id: number;
  user_id: string;
  title: string;
  description: string;
  page_path: string | null;
  status: BugStatus;
  severity: BugSeverity;
  created_at: string;
  updated_at: string;
  user_name?: string | null;
  user_email?: string | null;
  latest_message?: string | null;
  unread_user_messages?: number;
}

export interface BugReportMessage {
  id: number;
  bug_report_id: number;
  user_id: string | null;
  sender: "user" | "admin" | "system";
  content: string;
  created_at: string;
}

export async function getBugReports(): Promise<BugReport[]> {
  const supabase = createAdminClient();
  const { data: reports, error } = await supabase
    .from("bug_reports")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error || !reports) {
    console.error("Error fetching bug reports:", error);
    return [];
  }

  const userIds = Array.from(new Set(reports.map((report) => report.user_id)));
  const reportIds = reports.map((report) => report.id);

  const [{ data: users }, { data: messages }] = await Promise.all([
    userIds.length
      ? supabase.from("user_profiles").select("id, full_name, email").in("id", userIds)
      : Promise.resolve({ data: [], error: null }),
    reportIds.length
      ? supabase
          .from("bug_report_messages")
          .select("id, bug_report_id, sender, content, created_at")
          .in("bug_report_id", reportIds)
          .order("created_at", { ascending: false })
      : Promise.resolve({ data: [], error: null }),
  ]);

  const userMap = new Map((users ?? []).map((user) => [user.id, user]));
  const latestMessageByReport = new Map<number, string>();
  const unreadUserMessagesByReport = new Map<number, number>();

  for (const message of messages ?? []) {
    if (!latestMessageByReport.has(message.bug_report_id)) {
      latestMessageByReport.set(message.bug_report_id, message.content as string);
    }
    if (message.sender === "user") {
      unreadUserMessagesByReport.set(
        message.bug_report_id as number,
        (unreadUserMessagesByReport.get(message.bug_report_id as number) ?? 0) + 1
      );
    }
  }

  return reports.map((report) => {
    const user = userMap.get(report.user_id);
    return {
      ...(report as Omit<BugReport, "user_name" | "user_email" | "latest_message" | "unread_user_messages">),
      user_name: user?.full_name ?? null,
      user_email: user?.email ?? null,
      latest_message: latestMessageByReport.get(report.id) ?? null,
      unread_user_messages: unreadUserMessagesByReport.get(report.id) ?? 0,
    };
  });
}

export async function getBugReportMessages(reportId: number): Promise<BugReportMessage[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("bug_report_messages")
    .select("*")
    .eq("bug_report_id", reportId)
    .order("created_at", { ascending: true });

  if (error || !data) {
    console.error("Error fetching bug report messages:", error);
    return [];
  }

  return data as BugReportMessage[];
}

export async function getOpenBugReportCount(): Promise<number> {
  const supabase = createAdminClient();
  const { count, error } = await supabase
    .from("bug_reports")
    .select("*", { count: "exact", head: true })
    .neq("status", "fixed");
  if (error) return 0;
  return count ?? 0;
}

export async function updateBugReportStatus(reportId: number, status: BugStatus) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("bug_reports")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", reportId);

  if (error) throw new Error(error.message);
}

export async function addAdminBugReply(reportId: number, content: string) {
  const supabase = createAdminClient();
  const now = new Date().toISOString();

  const [{ error: messageError }, { error: reportError }] = await Promise.all([
    supabase.from("bug_report_messages").insert({
      bug_report_id: reportId,
      sender: "admin",
      content,
    }),
    supabase.from("bug_reports").update({ updated_at: now }).eq("id", reportId),
  ]);

  if (messageError) throw new Error(messageError.message);
  if (reportError) throw new Error(reportError.message);
}
