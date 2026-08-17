import { createClient } from "@/lib/supabase";

// The pinned target career, mirrored into localStorage so the /su-nghiep
// banner and the dashboard widget paint instantly on load, with Supabase as
// the source of truth across devices.
//
// Every function here used to swallow *all* errors into an empty catch. That
// hid a real outage for weeks: 20260803_user_career_goals.sql had never been
// applied to production, so every write failed with PGRST205 while the UI
// cheerfully toasted "Đã đặt mục tiêu" and quietly fell back to localStorage.
// Nothing in the app or the logs said otherwise. So the two cases are
// separated now: a missing table degrades to local-only and says so in the
// return value (the caller can soften its message), and anything else - auth,
// RLS, network - throws so it reaches a toast and the console instead of
// vanishing.

/** "Table not found in schema cache" (PostgREST) / "relation does not exist"
 *  (raw Postgres): this environment hasn't run the migration yet. */
function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

function getLocalGoal(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("active_career_goal") || localStorage.getItem("thtcdn_career_goal") || null;
}

function setLocalGoal(careerId: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("active_career_goal", careerId);
  localStorage.setItem("thtcdn_career_goal", careerId);
}

function clearLocalGoal() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("active_career_goal");
  localStorage.removeItem("thtcdn_career_goal");
}

/** Whether the change reached Supabase, or only this browser. Callers use it
 *  to avoid promising cross-device persistence that didn't happen. */
export type CareerGoalWriteResult = "persisted" | "local-only";

/** The career id (matches FinanceCareer.id in lib/career-paths.ts (đã gỡ)) the
 *  user has pinned as their target career, or null if none set.
 *
 *  Reads stay non-throwing - a stale-but-present local value beats blocking
 *  the page - but an unexpected error is logged rather than discarded. */
export async function getMyCareerGoal(userId: string): Promise<string | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("user_career_goals")
      .select("career_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      if (!isMissingTableError(error)) {
        console.error("Error reading career goal, falling back to local value:", error);
      }
    } else if (data?.career_id) {
      setLocalGoal(data.career_id);
      return data.career_id;
    }
  } catch (error) {
    console.error("Error reading career goal, falling back to local value:", error);
  }
  return getLocalGoal();
}

/** Pins `careerId` as the target career.
 *
 *  Resolves "persisted" on a real write, "local-only" when the table isn't
 *  migrated in this environment, and throws on anything else. Note that the
 *  Supabase client reports Postgres failures in `error` rather than by
 *  rejecting, so the returned error has to be inspected - awaiting the
 *  builder alone would report success on a failed write. */
export async function setCareerGoal(userId: string, careerId: string): Promise<CareerGoalWriteResult> {
  setLocalGoal(careerId);
  const supabase = createClient();
  const { error } = await supabase
    .from("user_career_goals")
    .upsert({ user_id: userId, career_id: careerId, set_at: new Date().toISOString() });

  if (error) {
    if (isMissingTableError(error)) {
      console.warn("user_career_goals is not migrated in this environment - career goal saved locally only.");
      return "local-only";
    }
    throw new Error(error.message);
  }
  return "persisted";
}

/** Unpins the target career. Same contract as setCareerGoal. */
export async function clearCareerGoal(userId: string): Promise<CareerGoalWriteResult> {
  clearLocalGoal();
  const supabase = createClient();
  const { error } = await supabase.from("user_career_goals").delete().eq("user_id", userId);

  if (error) {
    if (isMissingTableError(error)) {
      console.warn("user_career_goals is not migrated in this environment - career goal cleared locally only.");
      return "local-only";
    }
    throw new Error(error.message);
  }
  return "persisted";
}
