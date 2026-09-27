import "server-only";
import { getSystemDb, getDb } from "@/lib/d1/server";
import { createD1Rpc } from "@/lib/d1/rpc-dispatch";
import { serverClientShape } from "@/lib/cloudflare-server-shape";
import type { CloudflareClient } from "@/lib/cloudflare";

/**
 * Client bỏ qua chính sách, thay service-role key của Supabase. Chạy D1 THẬT
 * (bản trước trả stub rỗng).
 *
 * Như service-role key cũ, hàm này TỰ NÓ KHÔNG KIỂM GÌ - chỗ gọi phải đã xác
 * thực bằng cách của nó (requireAdmin/getAdminSession, cron secret, hoặc mã
 * máy chủ tự quyết số liệu như cộng coin). Mã mới nên dùng requireAdminDb()
 * (lib/admin/db.ts), nơi kiểm và cấp đi cùng một lời gọi.
 */
export function createAdminClient(): CloudflareClient {
  const db = getSystemDb();
  return serverClientShape({
    user: null,
    from: (table) => db.from(table),
    rpc: (name, params) => createD1Rpc(getDb(), null, { serviceRole: true })(name, params),
  });
}
