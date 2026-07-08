import { createClient } from "@/lib/supabase";

// "Table/column not found in schema cache" (PostgREST) or "relation/column
// does not exist" (raw Postgres) - tour flags are a non-critical UX nicety,
// so a missing column (e.g. migration not applied yet on this environment)
// should degrade to "not seen yet" / a silent no-op write, never crash the
// tour or the dashboard around it.
function isMissingSchemaError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01" || error?.code === "42703";
}

/**
 * Has this account already seen the given one-time tour? `key` is an
 * arbitrary short id like "dashboard" or "lesson" - stored inside the single
 * `tour_flags` JSON column so new tours don't need new migrations.
 */
export async function hasSeenTour(userId: string, key: string): Promise<boolean> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_profiles")
    .select("tour_flags")
    .eq("id", userId)
    .single();

  if (error || !data) {
    if (error && !isMissingSchemaError(error)) {
      console.error("Error reading tour flags:", error);
    }
    return false;
  }

  const flags = (data.tour_flags ?? {}) as Record<string, boolean>;
  return !!flags[key];
}

/**
 * Mark a one-time tour as seen for this account, permanently (until the row
 * is reset), so it never plays again on any device signed into this account.
 */
export async function markTourSeen(userId: string, key: string): Promise<void> {
  const supabase = createClient();

  // Read first so we don't clobber other tour flags already recorded for
  // this account.
  const { data, error: readError } = await supabase
    .from("user_profiles")
    .select("tour_flags")
    .eq("id", userId)
    .single();

  if (readError && !isMissingSchemaError(readError)) {
    console.error("Error reading tour flags before update:", readError);
  }

  const flags = (data?.tour_flags ?? {}) as Record<string, boolean>;
  if (flags[key]) return; // already recorded, nothing to do

  // Upsert rather than a plain update: if this account has no user_profiles
  // row yet (older accounts created before the profile-row trigger existed,
  // or any other gap), an update matches zero rows and silently writes
  // nothing - the flag is never actually persisted, so hasSeenTour reports
  // "not seen" forever and the tour reappears on every future login despite
  // markTourSeen having run every single time. Upsert guarantees the row
  // exists after this call either way.
  const { error: writeError } = await supabase
    .from("user_profiles")
    .upsert({ id: userId, tour_flags: { ...flags, [key]: true } }, { onConflict: "id" });

  if (writeError && !isMissingSchemaError(writeError)) {
    console.error("Error saving tour flag:", writeError);
  }
}
