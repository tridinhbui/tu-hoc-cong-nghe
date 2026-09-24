import "server-only";
import { requireAdminDb } from "@/lib/admin/db";
import { getDb } from "@/lib/d1/server";
import { adminResyncAllUserStats } from "@/lib/d1/rpc";
import { revokeAllSessions } from "@/lib/auth/session";
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
  const { db } = await requireAdminDb();

  let q = db
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
    users: (data as unknown as AdminUserRow[]) ?? [],
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function updateUserRole(userId: string, role: "user" | "admin") {
  const { db } = await requireAdminDb();
  const { error } = await db.from("user_profiles").update({ role }).eq("id", userId);
  if (error) throw new Error(error.message);
}

/**
 * Khoá/mở tài khoản. Thay hai bước của bản Supabase (cờ hiển thị trong bảng
 * + auth.admin.updateUserById() để chặn phiên) bằng một bước, vì thiết kế
 * phiên D1 đã giải quyết gọn hơn: getCurrentUser() kiểm is_disabled ở MỖI
 * yêu cầu (xem lib/auth/current-user.ts), nên chỉ cần cờ trong bảng là phiên
 * hiện có đã ngừng dùng được ngay ở lượt gọi kế tiếp - không cần một cơ chế
 * "ban" riêng nào khác.
 *
 * Vẫn gọi revokeAllSessions(): is_disabled chặn được YÊU CẦU TIẾP THEO, còn
 * thu hồi phiên chặn NGAY LẬP TỨC một request đang xử lý dở dùng cùng token -
 * khoảng cách rất nhỏ, nhưng không có lý do gì để lại nó khi thu hồi rẻ.
 */
export async function setUserDisabled(userId: string, isDisabled: boolean) {
  const { db } = await requireAdminDb();
  const { error } = await db
    .from("user_profiles")
    .update({ is_disabled: isDisabled })
    .eq("id", userId);
  if (error) throw new Error(error.message);

  if (isDisabled) await revokeAllSessions(getDb(), userId);
}

export async function getUserCount(): Promise<number> {
  const { db } = await requireAdminDb();
  const { count, error } = await db
    .from("user_profiles")
    .select("*", { count: "exact", head: true });
  if (error) return 0;
  return count ?? 0;
}

/**
 * Recomputes lessons_completed/total_xp/current_level/avg_quiz_score for
 * EVERY user in one set-based SQL pass - the bulk counterpart to
 * lib/supabase-user.ts#recalculateUserStats, which only self-heals one
 * account at a time, the next time that person visits the dashboard/profile.
 * adminResyncAllUserStats() (lib/d1/rpc.ts) là bản dịch tay của hàm SQL gốc,
 * không qua bộ điều phối .rpc() vì hàm này không nhận actor.
 */
export async function resyncAllUserStats(): Promise<number> {
  await requireAdminDb(); // chỉ để kiểm quyền - hàm dưới nhận D1Like thô
  return adminResyncAllUserStats(getDb());
}
