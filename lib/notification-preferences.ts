import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

// "Table not found in schema cache" (PostgREST) or "relation does not exist"
// (raw Postgres) - notification preferences are non-critical, so a missing
// table (not yet migrated) should degrade to "no preferences yet" instead of
// crashing the settings page.
function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

export interface NotificationPreferences {
  emailRemindersEnabled: boolean;
  browserRemindersEnabled: boolean;
}

export async function getNotificationPreferences(
  userId: string
): Promise<NotificationPreferences | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("notification_preferences")
    .select("email_reminders_enabled, browser_reminders_enabled")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    if (isMissingTableError(error)) return null;
    throw handleSupabaseError(error);
  }
  if (!data) return null;

  return {
    emailRemindersEnabled: Boolean(data.email_reminders_enabled),
    browserRemindersEnabled: Boolean(data.browser_reminders_enabled),
  };
}

export async function saveNotificationPreferences(
  userId: string,
  prefs: Partial<NotificationPreferences>
): Promise<void> {
  const supabase = createClient();

  const payload: Record<string, unknown> = {
    user_id: userId,
    updated_at: new Date().toISOString(),
  };
  if (prefs.emailRemindersEnabled !== undefined) {
    payload.email_reminders_enabled = prefs.emailRemindersEnabled;
  }
  if (prefs.browserRemindersEnabled !== undefined) {
    payload.browser_reminders_enabled = prefs.browserRemindersEnabled;
  }

  const { error } = await supabase
    .from("notification_preferences")
    .upsert(payload, { onConflict: "user_id" });

  if (error && !isMissingTableError(error)) throw handleSupabaseError(error);
}
