import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { createAdminClient } from "@/lib/supabase-admin";
import { getStreakRiskStatus, getInactiveDaysCount } from "@/lib/streak-reminders";
import { sendEmail } from "@/lib/send-email";
import type { UserStreak } from "@/lib/supabase-streak";

// Vercel Cron hits this route via GET (see vercel.json: "0 12 * * *" = 19:00
// giờ Việt Nam). It opt-in emails learners who are about to lose their
// streak or have a spaced-repetition review due, at most once per day.
//
// Actual sending goes through lib/send-email.ts (plain-fetch Resend call,
// no npm install needed) - it no-ops until RESEND_API_KEY is configured.

export const dynamic = "force-dynamic";

const REMINDER_COOLDOWN_HOURS = 20;

// Fail-closed: a missing CRON_SECRET used to make this route run wide open
// (anyone who found the URL could trigger it - a real risk once email
// sending is wired up, since it can mark up to 500 users/call as reminded).
// Set CRON_SECRET locally too if you need to exercise this route in dev.
function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error("[send-reminders] CRON_SECRET is not set - refusing to run. Set it in the environment.");
    return false;
  }

  const authHeader = request.headers.get("authorization") ?? "";
  const expected = `Bearer ${cronSecret}`;
  const authBuf = Buffer.from(authHeader);
  const expectedBuf = Buffer.from(expected);
  if (authBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(authBuf, expectedBuf);
}

async function sendReminderEmail(
  to: string,
  subject: string,
  body: string
): Promise<{ sent: boolean; reason?: string }> {
  return sendEmail(to, subject, `<p>${body}</p>`);
}

interface ReminderCandidate {
  user_id: string;
}

async function needsReminder(
  supabase: ReturnType<typeof createAdminClient>,
  userId: string
): Promise<{ needed: boolean; reason?: string }> {
  const { data: streakRow } = await supabase
    .from("user_streaks")
    .select("id, user_id, current_streak, longest_streak, last_activity_date, created_at, updated_at")
    .eq("user_id", userId)
    .maybeSingle();

  const streak = (streakRow as UserStreak | null) ?? null;

  // 1) About to lose the streak today - reuses the same "is it late enough
  // in the day with no activity yet" rule the client-side browser-reminder
  // uses (lib/streak-reminders.ts), so both channels agree on the trigger.
  const riskStatus = getStreakRiskStatus(streak);
  if (riskStatus.isAtRisk) {
    return { needed: true, reason: "streak_at_risk" };
  }

  // 2) Has not studied in >= 3 days.
  const inactiveDays = getInactiveDaysCount(streak);
  if (inactiveDays >= 3) {
    return { needed: true, reason: "inactive_3_days" };
  }

  // Note: a proper "spaced-repetition review due" check would ideally reuse
  // getDueRecallCount() from lib/streak-reminders.ts, but that needs the
  // user's next uncompleted lesson id, which requires re-deriving lesson
  // ordering server-side (client does this via lib/progress.ts, which is
  // localStorage-based and not available here). Left out for now; wire in
  // once there's a server-side "next lesson for user" helper.

  return { needed: false };
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  const cutoff = new Date(Date.now() - REMINDER_COOLDOWN_HOURS * 60 * 60 * 1000).toISOString();

  // Capped so a single invocation (whether the real daily cron or, absent
  // CRON_SECRET, anyone who finds the URL) can only ever touch a bounded
  // slice of users - repeated calls drain the queue a batch at a time
  // instead of one call being able to scan+process the entire table.
  const MAX_CANDIDATES_PER_RUN = 500;

  const { data: candidates, error } = await supabase
    .from("notification_preferences")
    .select("user_id")
    .eq("email_reminders_enabled", true)
    .or(`last_reminder_sent_at.is.null,last_reminder_sent_at.lt.${cutoff}`)
    .limit(MAX_CANDIDATES_PER_RUN);

  if (error) {
    console.error("[send-reminders] Failed to query notification_preferences:", error);
    return NextResponse.json({ error: "Failed to query candidates" }, { status: 500 });
  }

  let processed = 0;
  let sent = 0;
  let skippedNoApiKey = 0;

  for (const candidate of (candidates ?? []) as ReminderCandidate[]) {
    processed += 1;

    const { needed, reason } = await needsReminder(supabase, candidate.user_id);
    if (!needed) continue;

    const { data: profile } = await supabase
      .from("user_profiles")
      .select("email, full_name")
      .eq("id", candidate.user_id)
      .maybeSingle();

    if (!profile?.email) continue;

    const subject =
      reason === "streak_at_risk"
        ? "Đừng để mất streak học tập của bạn!"
        : "Đã lâu rồi bạn chưa quay lại học tài chính";
    const body =
      reason === "streak_at_risk"
        ? `Chào ${profile.full_name || "bạn"}, streak học tập của bạn sắp bị mất nếu hôm nay không học. Quay lại ngay nhé!`
        : `Chào ${profile.full_name || "bạn"}, đã vài ngày rồi bạn chưa học bài mới. Quay lại tiếp tục lộ trình của bạn nhé!`;

    const result = await sendReminderEmail(profile.email, subject, body);
    if (result.sent) {
      sent += 1;
    } else if (result.reason === "no_api_key") {
      skippedNoApiKey += 1;
    }

    // Mark as attempted regardless of whether the email actually went out,
    // so we don't retry more than once per day per user.
    await supabase
      .from("notification_preferences")
      .update({ last_reminder_sent_at: new Date().toISOString() })
      .eq("user_id", candidate.user_id);
  }

  return NextResponse.json({
    processed,
    sent,
    skippedNoApiKey,
  });
}
