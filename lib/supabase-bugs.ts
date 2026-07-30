import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";
import { uniqueRealtimeTopic } from "@/lib/supabase-realtime-topic";

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
}

export interface BugReportMessage {
  id: number;
  bug_report_id: number;
  user_id: string | null;
  sender: "user" | "admin" | "system";
  content: string;
  created_at: string;
}

function isMissingTableError(error: { code?: string } | null) {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

export async function getUserBugReports(userId: string): Promise<BugReport[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("bug_reports")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }

  return data as BugReport[];
}

export async function createBugReport(input: {
  userId: string;
  title: string;
  description: string;
  pagePath?: string;
  severity?: BugSeverity;
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("bug_reports")
    .insert({
      user_id: input.userId,
      title: input.title,
      description: input.description,
      page_path: input.pagePath ?? null,
      severity: input.severity ?? "medium",
    })
    .select()
    .single();

  if (error) throw handleSupabaseError(error);

  const report = data as BugReport;
  const { error: messageError } = await supabase.from("bug_report_messages").insert({
    bug_report_id: report.id,
    user_id: input.userId,
    sender: "user",
    content: input.description,
  });

  if (messageError) throw handleSupabaseError(messageError);
  return report;
}

export async function getBugReportMessages(reportId: number): Promise<BugReportMessage[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("bug_report_messages")
    .select("*")
    .eq("bug_report_id", reportId)
    .order("created_at", { ascending: true });

  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }

  return data as BugReportMessage[];
}

export async function sendBugReportMessage(reportId: number, userId: string, content: string) {
  const supabase = createClient();

  const [{ data, error }, { error: reportError }] = await Promise.all([
    supabase
      .from("bug_report_messages")
      .insert({
        bug_report_id: reportId,
        user_id: userId,
        sender: "user",
        content,
      })
      .select()
      .single(),
    supabase
      .from("bug_reports")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", reportId),
  ]);

  if (error) throw handleSupabaseError(error);
  if (reportError) throw handleSupabaseError(reportError);

  return data as BugReportMessage;
}

export function subscribeToUserBugReports(userId: string, onChange: () => void) {
  const supabase = createClient();

  const channel = supabase
    .channel(uniqueRealtimeTopic(`bug_reports:user:${userId}`))
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "bug_reports",
        filter: `user_id=eq.${userId}`,
      },
      onChange
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export function subscribeToBugReportMessages(reportId: number, onMessage: () => void) {
  const supabase = createClient();

  const channel = supabase
    .channel(uniqueRealtimeTopic(`bug_report_messages:${reportId}`))
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "bug_report_messages",
        filter: `bug_report_id=eq.${reportId}`,
      },
      onMessage
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
