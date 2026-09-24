import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { D1Database } from "@cloudflare/workers-types";
import { createD1Client, ADMIN_BYPASS, type ColumnTypes, type PolicyRegistry, type ManualPredicates } from "./query-builder";
import snapshot from "../../scripts/d1/schema-snapshot.json";
import registryJson from "../../scripts/d1/policy-registry.json";
import predicatesJson from "../../scripts/d1/manual-predicates.json";

/**
 * Client D1 phía máy chủ, thay cho createServerSupabaseClient().
 *
 * BA TỆP JSON ĐƯỢC NHẬP CHỨ KHÔNG ĐỌC TỪ ĐĨA. Bộ kiểm đọc chúng bằng
 * readFileSync vì chạy trên Node; Workers không có hệ tệp, nên ở đây chúng
 * phải nằm trong gói build. Đó cũng là lý do chúng vừa được đưa vào git.
 */

const types = (snapshot as { columns?: ColumnTypes }).columns ?? (snapshot as unknown as ColumnTypes);
const registry = registryJson as unknown as PolicyRegistry;
const predicates = predicatesJson as unknown as ManualPredicates;

/** Binding D1 thô. Dùng cho lớp auth, vốn làm việc dưới mức phân quyền. */
export function getDb(): D1Database {
  const { env } = getCloudflareContext();
  if (!env.DB) throw new Error("Thiếu binding DB. Kiểm tra d1_databases trong wrangler.jsonc.");
  return env.DB;
}

/**
 * Client có gác quyền, chạy dưới danh nghĩa `actor`.
 *
 * `actor` là null khi chưa đăng nhập, và bộ dựng truy vấn sẽ chặn mọi thứ
 * không cho đọc công khai. Truyền một id bịa để "đỡ phải xử lý null" là mở
 * toang đúng lớp đang thay thế cho RLS.
 */
export function getClient(actor: string | null) {
  return createD1Client(getDb(), types, registry, actor, predicates);
}

/**
 * Client bỏ qua chính sách, cho các route đã tự xác thực bằng cách KHÁC với
 * phiên người dùng - cron (bí mật Bearer token, xem lib/cron-auth.ts), hoặc
 * bất kỳ tác vụ hệ thống nào ghi/đọc thay nhiều người dùng cùng lúc mà không
 * có một "actor" cụ thể nào.
 *
 * KHÁC requireAdminDb() (lib/admin/db.ts): hàm đó GỘP kiểm quyền (role ===
 * "admin" qua getCurrentUser()) với việc cấp client, nên không thể lấy được
 * ADMIN_BYPASS mà chưa qua kiểm. Hàm NÀY không tự kiểm gì cả - nó CHỈ được
 * gọi sau khi route đã tự xác thực bằng cơ chế của riêng nó. Đặt tên khác
 * hẳn (getSystemDb, không phải getAdminDb) để không ai nhầm hai thứ.
 */
export function getSystemDb() {
  return createD1Client(getDb(), types, registry, ADMIN_BYPASS, predicates);
}
