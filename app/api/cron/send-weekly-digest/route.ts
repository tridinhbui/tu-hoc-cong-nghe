import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { sendEmail } from "@/lib/send-email";
import { isAuthorizedCronRequest } from "@/lib/cron-auth";
import { getDictionary } from "@/lib/i18n";
import { format } from "@/lib/i18n";
import { resolveLocale } from "@/lib/i18n/locales";

// Vercel Cron hits this via GET (see vercel.json: "0 12 * * 1" = Monday
// 19:00 giờ Việt Nam). Opt-in weekly summary of the PAST week: lessons
// completed, XP earned in that window, and current streak - separate
// toggle/cooldown from the daily at-risk reminder (lib/notification-
// preferences.ts's weeklyDigestEnabled / last_weekly_digest_sent_at), since
// it's a different cadence and purely a retention/recap email, not a
// "you're about to lose something" nudge.
export const dynamic = "force-dynamic";

interface DigestCandidate {
  user_id: string;
}

// Weekly XP isn't tracked as its own running total anywhere (total_xp is
// cumulative, not delta-per-week) - recomputed here the same way the rest
// of the XP system already derives it from source activity (see
// recalculateUserStats), just scoped to rows from the last 7 days instead
// of all-time. Good enough for a friendly recap; not written back anywhere,
// so it doesn't need to be as strictly abuse-proof as the real total.
async function getWeeklyStats(
  supabase: ReturnType<typeof createAdminClient>,
  userId: string,
  weekStart: string
) {
  const [{ data: lessonsRows }, { data: quizRows }, { data: gameRows }, { data: streakRow }] = await Promise.all([
    supabase
      .from("user_progress")
      .select("id")
      .eq("user_id", userId)
      .eq("completed", true)
      .gte("completed_at", weekStart),
    supabase.from("user_quiz_sessions").select("xp_earned").eq("user_id", userId).gte("completed_at", weekStart),
    supabase.from("game_sessions").select("xp_earned").eq("user_id", userId).gte("created_at", weekStart),
    supabase.from("user_streaks").select("current_streak, longest_streak").eq("user_id", userId).maybeSingle(),
  ]);

  const lessonsCompleted = lessonsRows?.length ?? 0;
  const quizXp = (quizRows ?? []).reduce((sum: number, r: { xp_earned: number }) => sum + (r.xp_earned || 0), 0);
  const gameXp = (gameRows ?? []).reduce((sum: number, r: { xp_earned: number }) => sum + (r.xp_earned || 0), 0);
  const xpThisWeek = lessonsCompleted * 10 + quizXp + gameXp;

  return {
    lessonsCompleted,
    xpThisWeek,
    currentStreak: streakRow?.current_streak ?? 0,
    longestStreak: streakRow?.longest_streak ?? 0,
  };
}

// `locale` đến từ `user_profiles.preferred_locale`, không phải cookie: cron
// chạy khi người dùng không có mặt nên không có cookie nào để đọc.
function buildDigestEmail(
  name: string,
  stats: Awaited<ReturnType<typeof getWeeklyStats>>,
  locale: string | null | undefined
) {
  const t = getDictionary(resolveLocale(locale));
  const hasActivity = stats.lessonsCompleted > 0 || stats.xpThisWeek > 0;
  const greeting = format(t.emails.digestGreeting, { name });
  const body = hasActivity
    ? `
      <p>${greeting}</p>
      <ul>
        <li>📚 ${format(t.emails.digestLessons, { count: stats.lessonsCompleted })}</li>
        <li>⭐ ${format(t.emails.digestXp, { count: stats.xpThisWeek })}</li>
        <li>🔥 ${format(t.emails.digestStreak, { days: stats.currentStreak, record: stats.longestStreak })}</li>
      </ul>
      <p>${t.emails.digestKeepGoing}</p>
    `
    : `
      <p>${greeting}</p>
      <p>${format(t.emails.digestNoActivity, { days: stats.currentStreak })}</p>
    `;
  return { subject: t.emails.digestSubject, html: body };
}

export async function GET(request: NextRequest) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  // Only sends once every ~6 days per user even if the cron somehow fires
  // more than once a week, without hardcoding "must be exactly Monday".
  const cooldownCutoff = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString();
  const weekStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const MAX_CANDIDATES_PER_RUN = 500;

  const { data: candidates, error } = await supabase
    .from("notification_preferences")
    .select("user_id")
    .eq("weekly_digest_enabled", true)
    .or(`last_weekly_digest_sent_at.is.null,last_weekly_digest_sent_at.lt.${cooldownCutoff}`)
    .limit(MAX_CANDIDATES_PER_RUN);

  if (error) {
    console.error("[send-weekly-digest] Failed to query candidates:", error);
    return NextResponse.json({ error: "Failed to query candidates" }, { status: 500 });
  }

  let processed = 0;
  let sent = 0;

  for (const candidate of (candidates ?? []) as DigestCandidate[]) {
    processed += 1;

    const { data: profile } = await supabase
      .from("user_profiles")
      .select("email, full_name, preferred_locale")
      .eq("id", candidate.user_id)
      .maybeSingle();

    if (!profile?.email) continue;

    const stats = await getWeeklyStats(supabase, candidate.user_id, weekStart);
    const t = getDictionary(resolveLocale(profile.preferred_locale));
    const { subject, html } = buildDigestEmail(profile.full_name || t.emails.fallbackName, stats, profile.preferred_locale);

    const result = await sendEmail(profile.email, subject, html);
    if (result.sent) sent += 1;

    // Mark as attempted regardless of send success, same reasoning as the
    // daily reminder cron - avoids retrying more than once per window.
    await supabase
      .from("notification_preferences")
      .update({ last_weekly_digest_sent_at: new Date().toISOString() })
      .eq("user_id", candidate.user_id);
  }

  return NextResponse.json({ processed, sent });
}
