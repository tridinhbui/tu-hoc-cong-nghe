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

  const updatedFlags = { ...flags, [key]: true };

  // First try a normal UPDATE. If it matches 0 rows (no user_profiles for
  // this account yet - should not happen with the new auth trigger, but
  // handle it anyway), then INSERT a new row.
  const { error: updateError } = await supabase
    .from("user_profiles")
    .update({ tour_flags: updatedFlags })
    .eq("id", userId);

  if (updateError && !isMissingSchemaError(updateError)) {
    console.error("Error updating tour flags:", updateError);
    return;
  }

  // Check if UPDATE matched any rows. If not, INSERT instead.
  const { count, error: countError } = await supabase
    .from("user_profiles")
    .select("id", { count: "exact", head: true })
    .eq("id", userId);

  if (!countError && count === 0) {
    const { error: insertError } = await supabase
      .from("user_profiles")
      .insert({ id: userId, tour_flags: updatedFlags });

    if (insertError && !isMissingSchemaError(insertError)) {
      console.error("Error inserting user profile with tour flag:", insertError);
    }
  }
}
