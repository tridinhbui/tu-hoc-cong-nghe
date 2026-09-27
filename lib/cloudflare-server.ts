import "server-only";
import { getCurrentUser } from "@/lib/auth/current-user";
import { getClient, getDb } from "@/lib/d1/server";
import { createD1Rpc } from "@/lib/d1/rpc-dispatch";
import { serverClientShape } from "@/lib/cloudflare-server-shape";
import type { CloudflareClient } from "@/lib/cloudflare";

/**
 * Client phía máy chủ theo phiên người dùng, chạy trên D1 THẬT.
 *
 * Bản trước chỉ `return createClient()` - client trình duyệt, lúc đó còn là
 * stub trả rỗng: mọi Server Component và Route Handler thấy "chưa đăng nhập"
 * và "không có dữ liệu", không một lỗi nào báo.
 *
 * Ở đây đọc thẳng D1 qua binding, dưới danh nghĩa người trong cookie phiên -
 * cùng policy registry với /api/db, nên một truy vấn cho kết quả như nhau dù
 * chạy ở máy chủ hay đi qua trình duyệt.
 */
export async function createServerCloudflareClient(): Promise<CloudflareClient> {
  const user = await getCurrentUser();
  const db = getClient(user?.id ?? null);
  return serverClientShape({
    user: user
      ? { id: user.id, email: user.email, user_metadata: { full_name: user.fullName ?? undefined, avatar_url: user.avatarUrl ?? undefined } }
      : null,
    from: (table) => db.from(table),
    rpc: (name, params) => createD1Rpc(getDb(), user?.id ?? null)(name, params),
  });
}
