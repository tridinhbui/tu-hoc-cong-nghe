import { getCurrentUser } from "@/lib/auth/current-user";
import { getClient } from "@/lib/d1/server";
import { validateWireQuery, applyWireOps, WireError } from "@/lib/d1/wire";

/**
 * Chạy một truy vấn do trình duyệt dựng, DƯỚI DANH NGHĨA NGƯỜI ĐANG ĐĂNG NHẬP.
 * Xem lib/d1/wire.ts về vì sao đây là một endpoint chung.
 *
 * Người gọi LUÔN lấy từ cookie phiên ở phía máy chủ, không bao giờ từ thân
 * yêu cầu - thân yêu cầu không có trường nào để khai mình là ai.
 */
export async function POST(req: Request) {
  let query;
  try {
    query = validateWireQuery(await req.json().catch(() => null));
  } catch (err) {
    return Response.json({ data: null, error: { message: (err as Error).message }, count: null }, { status: 400 });
  }

  const user = await getCurrentUser();
  try {
    const builder = applyWireOps(getClient(user?.id ?? null).from(query.table), query.ops);
    const result = await (builder as unknown as { run(): Promise<{ data: unknown; error: Error | null; count?: number | null }> }).run();
    return Response.json({
      data: result.data,
      // `code` đi cùng: PGRST116 (single() không có hàng) là "bình thường" với 22 chỗ gọi ở
      // trình duyệt, và chúng chỉ nhận ra nó nếu mã sống sót qua dây.
      error: result.error ? { message: result.error.message, code: (result.error as { code?: string }).code } : null,
      count: result.count ?? null,
    });
  } catch (err) {
    // Lỗi chính sách, bảng lạ, thao tác sai hình dạng: trả trong { error } như
    // SDK client cũ, để các chỗ gọi đang đọc `const { data, error }` vẫn đúng.
    const status = err instanceof WireError ? 400 : 403;
    return Response.json({ data: null, error: { message: (err as Error).message }, count: null }, { status });
  }
}
