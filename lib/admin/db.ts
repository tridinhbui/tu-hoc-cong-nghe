import "server-only";
import { getCurrentUser, type CurrentUser } from "@/lib/auth/current-user";
import { getDb } from "@/lib/d1/server";
import { createD1Client, ADMIN_BYPASS } from "@/lib/d1/query-builder";
import snapshot from "../../scripts/d1/schema-snapshot.json";
import registryJson from "../../scripts/d1/policy-registry.json";
import predicatesJson from "../../scripts/d1/manual-predicates.json";
import type { ColumnTypes, PolicyRegistry, ManualPredicates } from "@/lib/d1/query-builder";

/**
 * Cổng admin cho D1 - thay lib/admin-auth.ts + lib/supabase-admin.ts.
 *
 * Bản Supabase tách hai việc làm hai module: getAdminSession()/requireAdmin()
 * (lib/admin-auth.ts) kiểm vai trò, createAdminClient() (lib/supabase-admin.ts)
 * tạo client bỏ qua RLS - và HAI THỨ ẤY KHÔNG BUỘC ĐI CÙNG NHAU. Bất kỳ mã nào
 * import được createAdminClient() là có client bỏ qua RLS, bất kể đã qua
 * requireAdmin() hay chưa; an toàn chỉ tới từ việc mọi chỗ gọi ĐỀU TỰ GIÁC gọi
 * requireAdmin() trước.
 *
 * Ở đây gộp làm một: requireAdminDb() vừa kiểm vừa trả client, nên không có
 * cách nào lấy được client bỏ qua chính sách (ADMIN_BYPASS) mà chưa qua kiểm
 * vai trò admin thật.
 */

const types = (snapshot as { columns?: ColumnTypes }).columns ?? (snapshot as unknown as ColumnTypes);
const registry = registryJson as unknown as PolicyRegistry;
const predicates = predicatesJson as unknown as ManualPredicates;

export class AdminAuthError extends Error {}

/** Ném nếu người gọi không phải admin còn hoạt động. Trả cả phiên lẫn client. */
export async function requireAdminDb(): Promise<{ session: CurrentUser; db: ReturnType<typeof createD1Client> }> {
  const user = await getCurrentUser();
  if (!user) throw new AdminAuthError("Chưa đăng nhập.");
  if (user.role !== "admin") throw new AdminAuthError("Cần quyền admin.");
  // getCurrentUser() đã tự lọc is_disabled (xem lib/auth/current-user.ts),
  // nên không cần kiểm lại ở đây - một tài khoản admin bị khoá đã không còn
  // có phiên hợp lệ để tới được dòng này.
  return { session: user, db: createD1Client(getDb(), types, registry, ADMIN_BYPASS, predicates) };
}
