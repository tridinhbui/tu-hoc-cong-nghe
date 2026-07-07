import "server-only";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

export interface AdminSession {
  userId: string;
  email: string;
}

/**
 * Verifies the current request is an authenticated admin.
 * Returns the session on success, or null if the caller is not an admin
 * (no session, no profile row, role !== 'admin', or account disabled).
 *
 * Must be called from a Server Component / Route Handler / Server Action - * never trust a client-side check alone for admin gating.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Read the role from user_profiles using the admin (service-role) client so
  // this check works even if RLS on user_profiles doesn't grant self-select
  // of the role column, and so it can't be spoofed by a client-side JWT claim.
  const admin = createAdminClient();
  const { data: profile, error } = await admin
    .from("user_profiles")
    .select("role, is_disabled, email")
    .eq("id", user.id)
    .single();

  if (error || !profile) return null;
  if (profile.role !== "admin") return null;
  if (profile.is_disabled) return null;

  return { userId: user.id, email: profile.email ?? user.email ?? "" };
}

/** Throws if the caller is not an admin. Use inside Server Actions / Route Handlers. */
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Forbidden: admin access required");
  }
  return session;
}
