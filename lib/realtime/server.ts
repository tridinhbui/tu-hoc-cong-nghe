import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Đẩy một sự kiện vào một topic realtime từ mã phía máy chủ.
 *
 * DÙNG SAU KHI GHI D1 THÀNH CÔNG - đây là đường thay `postgres_changes` của
 * Supabase, vốn tự động phát khi một hàng đổi. D1 không có cơ chế đó, nên
 * publish phải là một bước tường minh ngay sau lệnh ghi, giống cách 53 hàm
 * RPC trong lib/d1/rpc.ts tự viết ra mọi điều Postgres từng làm ngầm.
 *
 * KHÔNG NÉM LỖI. Một lượt publish trượt (worker realtime đang khởi động lại,
 * mạng chập chờn) không được làm hỏng cả lượt ghi D1 đã thành công - dữ liệu
 * đã đúng, chỉ có thông báo tức thời bị chậm một nhịp cho tới khi client tự
 * tải lại hoặc kết nối lại.
 */
export async function publishTopic(topic: string, event: string, payload: unknown): Promise<void> {
  try {
    const { env } = getCloudflareContext();
    await env.REALTIME.fetch(`https://thcn-realtime/publish?topic=${encodeURIComponent(topic)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, payload }),
    });
  } catch (err) {
    console.error(`[realtime] publish "${topic}"/"${event}" thất bại:`, err);
  }
}
