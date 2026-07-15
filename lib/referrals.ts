import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01" || error?.code === "PGRST202" || error?.code === "42883";
}

// One-time XP bonus per side when a referral converts (referred user
// completes their first lesson) - flat and modest, not per-lesson, so it
// can't be farmed by inviting fake accounts to grind XP; each account can
// only ever be "the referred person" once (unique constraint), and only
// pays out once real engagement happens.
export const REFERRER_BONUS_XP = 50;
export const REFERRED_BONUS_XP = 30;

const PENDING_REFERRAL_KEY = "thtcdn_pending_referral_code";

/** Call on the login page: stashes ?ref=<referrerId> from the URL so it
 *  survives an OAuth redirect round-trip (localStorage is same-origin and
 *  outlives the navigation, unlike a query param). */
export function stashReferralCodeFromUrl(searchParams: URLSearchParams) {
  const ref = searchParams.get("ref");
  if (ref && typeof window !== "undefined") {
    window.localStorage.setItem(PENDING_REFERRAL_KEY, ref);
  }
}

/** Call once per session after confirming a signed-in user (e.g. AppNavbar's
 *  mount effect) - if a referral code is stashed, attempts to record it via
 *  record_referral() (safe to call even if this account already has a
 *  referrer or signed up long before this feature existed; the RPC no-ops
 *  in every case that isn't "brand new person, no referrer yet, valid
 *  code") then clears the stash either way so it isn't retried forever. */
export async function claimPendingReferral(): Promise<void> {
  if (typeof window === "undefined") return;
  const referrerId = window.localStorage.getItem(PENDING_REFERRAL_KEY);
  if (!referrerId) return;
  window.localStorage.removeItem(PENDING_REFERRAL_KEY);

  const supabase = createClient();
  const { error } = await supabase.rpc("record_referral", { p_referrer_id: referrerId });
  if (error && !isMissingTableError(error)) {
    console.error("Error recording referral:", error);
  }
}

/** Best-effort: flips the caller's own pending referral (if any) to
 *  rewarded. Called from recalculateUserStats once lessonsCompleted >= 1 -
 *  safe to call unconditionally on every recompute, it's a no-op update
 *  when there's nothing pending. */
export async function rewardMyReferralIfPending(): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.rpc("reward_my_referral");
  if (error && !isMissingTableError(error)) {
    console.error("Error rewarding referral:", error);
  }
}

/** Sums this user's rewarded-referral XP from both sides: REFERRER_BONUS_XP
 *  for each person they successfully referred, plus REFERRED_BONUS_XP once
 *  if they themselves were referred and converted. Folded into
 *  recalculateUserStats' total_xp formula the same way quiz/game XP are. */
export async function getTotalReferralXp(userId: string): Promise<number> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("referrals")
    .select("referrer_id, referred_id")
    .eq("status", "rewarded")
    .or(`referrer_id.eq.${userId},referred_id.eq.${userId}`);

  if (error) {
    if (isMissingTableError(error)) return 0;
    throw handleSupabaseError(error);
  }

  let xp = 0;
  for (const row of (data ?? []) as { referrer_id: string; referred_id: string }[]) {
    if (row.referrer_id === userId) xp += REFERRER_BONUS_XP;
    if (row.referred_id === userId) xp += REFERRED_BONUS_XP;
  }
  return xp;
}

export interface MyReferralStats {
  totalInvited: number;
  totalRewarded: number;
}

/** For the "Mời bạn học cùng" card: how many people signed up through this
 *  user's link, and how many of those have converted (completed a lesson,
 *  triggering both sides' bonus). */
export async function getMyReferralStats(userId: string): Promise<MyReferralStats> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("referrals")
    .select("status")
    .eq("referrer_id", userId);

  if (error) {
    if (isMissingTableError(error)) return { totalInvited: 0, totalRewarded: 0 };
    throw handleSupabaseError(error);
  }

  const rows = (data ?? []) as { status: string }[];
  return {
    totalInvited: rows.length,
    totalRewarded: rows.filter((r) => r.status === "rewarded").length,
  };
}
