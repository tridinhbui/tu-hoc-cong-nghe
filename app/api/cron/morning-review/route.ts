import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { sendPushNotification } from "@/lib/web-push";
import { isAuthorizedCronRequest } from "@/lib/cron-auth";
import { MORNING_REVIEW_SIZE } from "@/lib/morning-review";
import { getDictionary, format } from "@/lib/i18n";
import { resolveLocale } from "@/lib/i18n/locales";

// Vercel Cron hits this via GET (see vercel.json: "30 0 * * *" = 07:30 giờ
// Việt Nam). Sends opted-in learners one push a day pointing straight into a
// ~90-second interleaved review session.
//
// Why this exists separately from send-reminders: that job nudges people who
// are ABOUT TO LOSE something (a streak) in the evening. This one is a
// retrieval-practice prompt in the morning, and it goes to people who are
// doing fine - the whole point is that reviewing stops depending on whether
// someone happens to open a lesson that day. Sharing the cooldown column
// would make the two jobs mute each other.
//
// The session's actual contents are chosen client-side by
// lib/morning-review.ts, because the spacing schedule lives in the browser's
// localStorage (see OnTapCauSaiClient). This route only decides WHETHER a
// user has anything worth reviewing.

export const dynamic = "force-dynamic";

// Under this many outstanding mistakes a session is not worth a
// notification - waking someone up for two questions spends push permission
// (which they can revoke once, permanently) on almost nothing.
const MIN_ITEMS_TO_NOTIFY = 4;

// 20h rather than 24h so a run that drifts slightly later than the previous
// day's does not skip that day entirely. Same value and reasoning as
// send-reminders.
const SEND_COOLDOWN_HOURS = 20;

// Bounds one invocation, so repeated calls drain the queue a batch at a
// time instead of any single call scanning the whole table.
const MAX_CANDIDATES_PER_RUN = 500;

export async function GET(request: NextRequest) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const cutoff = new Date(Date.now() - SEND_COOLDOWN_HOURS * 60 * 60 * 1000).toISOString();

  const { data: candidates, error } = await supabase
    .from("notification_preferences")
    .select("user_id")
    .eq("morning_review_enabled", true)
    .or(`last_morning_review_sent_at.is.null,last_morning_review_sent_at.lt.${cutoff}`)
    .limit(MAX_CANDIDATES_PER_RUN);

  if (error) {
    // Until 20260822_morning_review_push.sql is applied, morning_review_enabled
    // does not exist and PostgREST rejects the filter. That is a deploy
    // ordering issue, not a failure - report it as "nobody to notify" so the
    // daily run does not alert every morning until the migration lands.
    const missingColumn = error.code === "42703" || error.code === "PGRST204";
    if (missingColumn) {
      console.warn("[morning-review] morning_review_enabled column missing - migration not applied yet.");
      return NextResponse.json({ processed: 0, pushSent: 0, skippedTooFewItems: 0, pushSkippedNoVapidKeys: 0, migrationPending: true });
    }
    console.error("[morning-review] Failed to query notification_preferences:", error);
    return NextResponse.json({ error: "Failed to query candidates" }, { status: 500 });
  }

  const candidateIds = ((candidates ?? []) as { user_id: string }[]).map((c) => c.user_id);
  const processed = candidateIds.length;

  if (processed === 0) {
    return NextResponse.json({ processed: 0, pushSent: 0, skippedTooFewItems: 0, pushSkippedNoVapidKeys: 0 });
  }

  // One query for the whole batch rather than a count per user. Only the
  // key columns are pulled; the questions themselves are re-derived from
  // lesson content on the client.
  const { data: mistakeRows, error: mistakeError } = await supabase
    .from("quiz_mistakes")
    .select("user_id")
    .in("user_id", candidateIds)
    .eq("resolved", false);

  if (mistakeError) {
    console.error("[morning-review] Failed to query quiz_mistakes:", mistakeError);
    return NextResponse.json({ error: "Failed to query review items" }, { status: 500 });
  }

  const itemCountByUser = new Map<string, number>();
  for (const row of (mistakeRows ?? []) as { user_id: string }[]) {
    itemCountByUser.set(row.user_id, (itemCountByUser.get(row.user_id) ?? 0) + 1);
  }

  const notifiableIds = candidateIds.filter((id) => (itemCountByUser.get(id) ?? 0) >= MIN_ITEMS_TO_NOTIFY);
  const skippedTooFewItems = processed - notifiableIds.length;

  if (notifiableIds.length === 0) {
    return NextResponse.json({ processed, pushSent: 0, skippedTooFewItems, pushSkippedNoVapidKeys: 0 });
  }

  // Push là thông báo riêng cho từng người, nên đọc ngôn ngữ của chính họ.
  // Cron không có cookie nào để đọc - xem migration 20260902.
  const { data: localeRows } = await supabase
    .from("user_profiles")
    .select("id, preferred_locale")
    .in("id", notifiableIds);
  const localeByUser = new Map(
    ((localeRows ?? []) as { id: string; preferred_locale: string | null }[]).map((r) => [r.id, r.preferred_locale])
  );

  const { data: subscriptionRows } = await supabase
    .from("push_subscriptions")
    .select("id, user_id, endpoint, p256dh, auth")
    .in("user_id", notifiableIds);

  const subscriptionsByUser = new Map<string, { id: number; endpoint: string; p256dh: string; auth: string }[]>();
  for (const sub of (subscriptionRows ?? []) as {
    id: number;
    user_id: string;
    endpoint: string;
    p256dh: string;
    auth: string;
  }[]) {
    const list = subscriptionsByUser.get(sub.user_id) ?? [];
    list.push(sub);
    subscriptionsByUser.set(sub.user_id, list);
  }

  const expiredSubscriptionIds: number[] = [];
  let pushSent = 0;
  let pushSkippedNoVapidKeys = 0;
  // Only users we actually reached get their cooldown stamped, so someone
  // with no working subscription stays eligible tomorrow instead of being
  // silently marked as notified today.
  const notifiedIds: string[] = [];

  for (const userId of notifiableIds) {
    const subscriptions = subscriptionsByUser.get(userId) ?? [];
    if (subscriptions.length === 0) continue;

    const available = itemCountByUser.get(userId) ?? 0;
    const sessionSize = Math.min(available, MORNING_REVIEW_SIZE);
    let reachedThisUser = false;

    for (const sub of subscriptions) {
      const t = getDictionary(resolveLocale(localeByUser.get(userId)));
      const result = await sendPushNotification(sub, {
        title: format(t.emails.morningReviewTitle, { count: sessionSize }),
        body: t.emails.morningReviewBody,
        url: "/on-tap-cau-sai?phien=sang",
      });

      if (result.sent) {
        pushSent += 1;
        reachedThisUser = true;
      } else if (result.reason === "no_vapid_keys") {
        pushSkippedNoVapidKeys += 1;
      } else if (result.reason === "expired") {
        expiredSubscriptionIds.push(sub.id);
      }
    }

    if (reachedThisUser) notifiedIds.push(userId);
  }

  if (expiredSubscriptionIds.length > 0) {
    await supabase.from("push_subscriptions").delete().in("id", expiredSubscriptionIds);
  }
  if (notifiedIds.length > 0) {
    await supabase
      .from("notification_preferences")
      .update({ last_morning_review_sent_at: new Date().toISOString() })
      .in("user_id", notifiedIds);
  }

  return NextResponse.json({ processed, pushSent, skippedTooFewItems, pushSkippedNoVapidKeys });
}
