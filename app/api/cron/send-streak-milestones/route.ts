import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { isAuthorizedCronRequest } from "@/lib/cron-auth";
import { getDictionary, format } from "@/lib/i18n";
import { resolveLocale } from "@/lib/i18n/locales";

// Vercel Cron hits this route daily (see vercel.json). Sends a personal
// "chúc mừng" DM (via the same chat_messages/ChatWithAdminWidget channel
// admins already use for 1:1 replies) the first time a user's streak
// crosses one of the 7/14/21/28-day milestones.

export const dynamic = "force-dynamic";

const MILESTONES = [7, 14, 21, 28] as const;

// Tin nhắn RIÊNG gửi cho một người, nên dịch theo ngôn ngữ của chính họ.
function milestoneMessage(name: string, days: number, locale: string | null | undefined): string {
  const t = getDictionary(resolveLocale(locale));
  const label = name && name.trim() ? name.trim() : t.emails.fallbackName;
  return format(t.emails.milestoneMessage, { name: label, days });
}

// Bài đăng lên TƯỜNG CHUNG: một bản lưu, cả cộng đồng đọc. Không dịch theo
// người xem được - hai người sẽ thấy hai nội dung cho cùng một bài đăng.
/* i18n-ignore-start: nội dung bài đăng đã lưu, cả cộng đồng đọc chung một bản */
function feedPostContent(name: string, days: number): string {
  const label = name && name.trim() ? name.trim() : "Một bạn học";
  return `${label} vừa đạt chuỗi ${days} ngày học liên tục! 🔥`;
}
/* i18n-ignore-end */

interface StreakRow {
  user_id: string;
  current_streak: number;
  last_milestone_notified: number | null;
}

export async function GET(request: NextRequest) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  // Capped per run for the same reason as send-reminders - bound the blast
  // radius of a single invocation.
  const MAX_CANDIDATES_PER_RUN = 500;

  const { data: candidates, error } = await supabase
    .from("user_streaks")
    .select("user_id, current_streak, last_milestone_notified")
    .in("current_streak", MILESTONES as unknown as number[])
    .limit(MAX_CANDIDATES_PER_RUN);

  if (error) {
    // last_milestone_notified column not migrated yet on this environment.
    if (error.code === "42703" || error.code === "PGRST204") {
      return NextResponse.json({ processed: 0, sent: 0, note: "migration not applied yet" });
    }
    console.error("[send-streak-milestones] Failed to query user_streaks:", error);
    return NextResponse.json({ error: "Failed to query candidates" }, { status: 500 });
  }

  let processed = 0;
  let sent = 0;

  for (const row of (candidates ?? []) as StreakRow[]) {
    processed += 1;
    const alreadyNotified = (row.last_milestone_notified ?? 0) >= row.current_streak;
    if (alreadyNotified) continue;

    const { data: profile } = await supabase
      .from("user_profiles")
      .select("full_name, preferred_locale")
      .eq("id", row.user_id)
      .maybeSingle();

    const { error: insertError } = await supabase.from("chat_messages").insert({
      user_id: row.user_id,
      sender: "admin",
      content: milestoneMessage(profile?.full_name ?? "", row.current_streak, profile?.preferred_locale),
    });

    if (insertError) {
      console.error(`[send-streak-milestones] Failed to send to ${row.user_id}:`, insertError);
      continue;
    }

    // Best-effort - a failed feed post shouldn't block the DM/milestone
    // marker above, which is why this isn't checked for errors.
    await supabase.from("community_posts").insert({
      user_id: row.user_id,
      kind: "streak",
      content: feedPostContent(profile?.full_name ?? "", row.current_streak),
      metadata: { streak_days: row.current_streak },
    });

    await supabase
      .from("user_streaks")
      .update({ last_milestone_notified: row.current_streak })
      .eq("user_id", row.user_id);

    sent += 1;
  }

  return NextResponse.json({ processed, sent });
}
