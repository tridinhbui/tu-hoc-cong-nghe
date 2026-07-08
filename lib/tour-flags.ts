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

  // Read-modify-write rather than a blind upsert of `{[key]: true}` so we
  // don't clobber other tour flags already recorded for this account.
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

  const { error: writeError } = await supabase
    .from("user_profiles")
    .update({ tour_flags: { ...flags, [key]: true } })
    .eq("id", userId);

  if (writeError && !isMissingSchemaError(writeError)) {
    console.error("Error saving tour flag:", writeError);
  }
}
