import "server-only";
import { createAdminClient } from "@/lib/supabase-admin";
import { buildOrIlikeFilter } from "@/lib/admin/search-filter";

export interface AdminUserRow {
  id: string;
  email: string;
  full_name: string | null;
  role: "user" | "admin";
  is_disabled: boolean;
  created_at: string;
  last_login_at: string | null;
  lessons_completed: number;
}

export interface UsersQuery {
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface UsersResult {
  users: AdminUserRow[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function getUsers(query: UsersQuery = {}): Promise<UsersResult> {
  const { search = "", page = 1, pageSize = 20 } = query;
  const supabase = createAdminClient();

  let q = supabase
    .from("user_profiles")
    .select("id, email, full_name, role, is_disabled, created_at, last_login_at, lessons_completed", {
      count: "exact",
    });

  const searchFilter = buildOrIlikeFilter(["email", "full_name"], search);
  if (searchFilter) q = q.or(searchFilter);

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await q
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching users:", error);
    return { users: [], total: 0, page, pageSize, totalPages: 0 };
  }

  const total = count ?? 0;
  return {
    users: (data as AdminUserRow[]) ?? [],
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function updateUserRole(userId: string, role: "user" | "admin") {
  const supabase = createAdminClient();
  const { error } = await supabase.from("user_profiles").update({ role }).eq("id", userId);
  if (error) throw new Error(error.message);
}

export async function setUserDisabled(userId: string, isDisabled: boolean) {
  const supabase = createAdminClient();

  // Flip the flag used for display/filtering in the admin table...
  const { error } = await supabase
    .from("user_profiles")
    .update({ is_disabled: isDisabled })
    .eq("id", userId);
  if (error) throw new Error(error.message);

  // ...and actually prevent the account from authenticating via Supabase Auth
  // (a DB flag alone wouldn't stop a valid session/JWT from continuing to work).
  const { error: banError } = await supabase.auth.admin.updateUserById(userId, {
    ban_duration: isDisabled ? "876000h" : "none", // ~100 years, effectively indefinite
  });
  if (banError) throw new Error(banError.message);
}

export async function getUserCount(): Promise<number> {
  const supabase = createAdminClient();
  const { count, error } = await supabase
    .from("user_profiles")
    .select("*", { count: "exact", head: true });
  if (error) return 0;
  return count ?? 0;
}
