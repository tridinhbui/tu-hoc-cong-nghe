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

// Pure decision over an already-fetched streak row (batched below with a
// single .in() query, instead of the old one-query-per-candidate N+1).
function needsReminder(streak: UserStreak | null): { needed: boolean; reason?: string } {
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

  const candidateList = (candidates ?? []) as ReminderCandidate[];
  const processed = candidateList.length;
  let emailSent = 0;
  let skippedNoApiKey = 0;
  let pushSent = 0;
  let pushSkippedNoVapidKeys = 0;

  // Batch every per-user lookup into one .in() query per table instead of
  // the previous per-candidate round trips (~3 sequential queries x 500
  // candidates = ~1500 queries per run before this).
  const candidateIds = candidateList.map((c) => c.user_id);

  const { data: streakRows } = candidateIds.length
    ? await supabase
        .from("user_streaks")
        .select("id, user_id, current_streak, longest_streak, last_activity_date, created_at, updated_at")
        .in("user_id", candidateIds)
    : { data: [] };
  const streakByUser = new Map(((streakRows ?? []) as UserStreak[]).map((s) => [s.user_id, s]));

  const needyCandidates = candidateList
    .map((candidate) => ({ candidate, decision: needsReminder(streakByUser.get(candidate.user_id) ?? null) }))
    .filter(({ decision }) => decision.needed);

  const emailUserIds = needyCandidates.filter(({ candidate }) => candidate.email_reminders_enabled).map(({ candidate }) => candidate.user_id);
  const pushUserIds = needyCandidates.filter(({ candidate }) => candidate.browser_reminders_enabled).map(({ candidate }) => candidate.user_id);

  const [{ data: profileRows }, { data: subscriptionRows }] = await Promise.all([
    emailUserIds.length
      ? supabase.from("user_profiles").select("id, email, full_name").in("id", emailUserIds)
      : Promise.resolve({ data: [] }),
    pushUserIds.length
      ? supabase.from("push_subscriptions").select("id, user_id, endpoint, p256dh, auth").in("user_id", pushUserIds)
      : Promise.resolve({ data: [] }),
  ]);
  const profileByUser = new Map(
    ((profileRows ?? []) as { id: string; email: string | null; full_name: string | null }[]).map((p) => [p.id, p])
  );
  const subscriptionsByUser = new Map<string, { id: number; endpoint: string; p256dh: string; auth: string }[]>();
  for (const sub of (subscriptionRows ?? []) as { id: number; user_id: string; endpoint: string; p256dh: string; auth: string }[]) {
    const list = subscriptionsByUser.get(sub.user_id) ?? [];
    list.push(sub);
    subscriptionsByUser.set(sub.user_id, list);
  }

  const expiredSubscriptionIds: number[] = [];

  for (const { candidate, decision } of needyCandidates) {
    const { reason } = decision;
    const title =
      reason === "streak_at_risk"
        ? "Đừng để mất streak học tập của bạn!"
        : "Đã lâu rồi bạn chưa quay lại học tài chính";

    if (candidate.email_reminders_enabled) {
      const profile = profileByUser.get(candidate.user_id);
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

      for (const sub of subscriptionsByUser.get(candidate.user_id) ?? []) {
        const result = await sendPushNotification(sub, { title, body: pushBody, url: "/dashboard" });
        if (result.sent) {
          pushSent += 1;
        } else if (result.reason === "no_vapid_keys") {
          pushSkippedNoVapidKeys += 1;
        } else if (result.reason === "expired") {
          expiredSubscriptionIds.push(sub.id);
        }
      }
    }
  }

  // Two batched writes to close out the run: drop every expired push
  // subscription at once, and stamp the shared cooldown for every needy
  // user at once (same semantics as before - only users we actually
  // attempted get marked, so the untouched rest stay eligible next run).
  if (expiredSubscriptionIds.length > 0) {
    await supabase.from("push_subscriptions").delete().in("id", expiredSubscriptionIds);
  }
  const needyIds = needyCandidates.map(({ candidate }) => candidate.user_id);
  if (needyIds.length > 0) {
    await supabase
      .from("notification_preferences")
      .update({ last_reminder_sent_at: new Date().toISOString() })
      .in("user_id", needyIds);
  }

  return NextResponse.json({
    processed,
    emailSent,
    skippedNoApiKey,
    pushSent,
    pushSkippedNoVapidKeys,
  });
}
