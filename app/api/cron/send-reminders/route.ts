import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { getStreakRiskStatus, getInactiveDaysCount } from "@/lib/streak-reminders";
import { sendEmail } from "@/lib/send-email";
import { sendPushNotification } from "@/lib/web-push";
import { isAuthorizedCronRequest } from "@/lib/cron-auth";
import type { UserStreak } from "@/lib/supabase-streak";

// Vercel Cron hits this route via GET (see vercel.json: "0 12 * * *" = 19:00
// giờ Việt Nam). It opt-in emails learners who are about to lose their
// streak or have a spaced-repetition review due, at most once per day.
//
// Actual sending goes through lib/send-email.ts (plain-fetch Resend call,
// no npm install needed) - it no-ops until RESEND_API_KEY is configured.

export const dynamic = "force-dynamic";

const REMINDER_COOLDOWN_HOURS = 20;

async function sendReminderEmail(
  to: string,
  subject: string,
  body: string
): Promise<{ sent: boolean; reason?: string }> {
  return sendEmail(to, subject, `<p>${body}</p>`);
}

interface ReminderCandidate {
  user_id: string;
  email_reminders_enabled: boolean;
  browser_reminders_enabled: boolean;
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
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  const cutoff = new Date(Date.now() - REMINDER_COOLDOWN_HOURS * 60 * 60 * 1000).toISOString();

  // Capped so a single invocation (whether the real daily cron or, absent
  // CRON_SECRET, anyone who finds the URL) can only ever touch a bounded
  // slice of users - repeated calls drain the queue a batch at a time
  // instead of one call being able to scan+process the entire table.
  const MAX_CANDIDATES_PER_RUN = 500;

  // Candidate pool now spans both channels - a user only opted into browser
  // push (no email) still needs to show up here, since last_reminder_sent_at
  // is a single shared cooldown for "was this user reminded today at all".
  const { data: candidates, error } = await supabase
    .from("notification_preferences")
    .select("user_id, email_reminders_enabled, browser_reminders_enabled")
    .or("email_reminders_enabled.eq.true,browser_reminders_enabled.eq.true")
    .or(`last_reminder_sent_at.is.null,last_reminder_sent_at.lt.${cutoff}`)
    .limit(MAX_CANDIDATES_PER_RUN);

  if (error) {
    console.error("[send-reminders] Failed to query notification_preferences:", error);
    return NextResponse.json({ error: "Failed to query candidates" }, { status: 500 });
  }

  let processed = 0;
  let emailSent = 0;
  let skippedNoApiKey = 0;
  let pushSent = 0;
  let pushSkippedNoVapidKeys = 0;

  for (const candidate of (candidates ?? []) as ReminderCandidate[]) {
    processed += 1;

    const { needed, reason } = await needsReminder(supabase, candidate.user_id);
    if (!needed) continue;

    const title =
      reason === "streak_at_risk"
        ? "Đừng để mất streak học tập của bạn!"
        : "Đã lâu rồi bạn chưa quay lại học tài chính";

    if (candidate.email_reminders_enabled) {
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("email, full_name")
        .eq("id", candidate.user_id)
        .maybeSingle();

      if (profile?.email) {
        const body =
          reason === "streak_at_risk"
            ? `Chào ${profile.full_name || "bạn"}, streak học tập của bạn sắp bị mất nếu hôm nay không học. Quay lại ngay nhé!`
            : `Chào ${profile.full_name || "bạn"}, đã vài ngày rồi bạn chưa học bài mới. Quay lại tiếp tục lộ trình của bạn nhé!`;

        const result = await sendReminderEmail(profile.email, title, body);
        if (result.sent) {
          emailSent += 1;
        } else if (result.reason === "no_api_key") {
          skippedNoApiKey += 1;
        }
      }
    }

    if (candidate.browser_reminders_enabled) {
      const pushBody =
        reason === "streak_at_risk"
          ? "Streak học tập của bạn sắp bị mất nếu hôm nay không học. Quay lại ngay nhé!"
          : "Đã vài ngày rồi bạn chưa học bài mới. Quay lại tiếp tục lộ trình của bạn nhé!";

      const { data: subscriptions } = await supabase
        .from("push_subscriptions")
        .select("id, endpoint, p256dh, auth")
        .eq("user_id", candidate.user_id);

      for (const sub of subscriptions ?? []) {
        const result = await sendPushNotification(sub, { title, body: pushBody, url: "/dashboard" });
        if (result.sent) {
          pushSent += 1;
        } else if (result.reason === "no_vapid_keys") {
          pushSkippedNoVapidKeys += 1;
        } else if (result.reason === "expired") {
          await supabase.from("push_subscriptions").delete().eq("id", sub.id);
        }
      }
    }

    // Mark as attempted regardless of whether either channel actually sent,
    // so we don't retry more than once per day per user.
    await supabase
      .from("notification_preferences")
      .update({ last_reminder_sent_at: new Date().toISOString() })
      .eq("user_id", candidate.user_id);
  }

  return NextResponse.json({
    processed,
    emailSent,
    skippedNoApiKey,
    pushSent,
    pushSkippedNoVapidKeys,
  });
}
