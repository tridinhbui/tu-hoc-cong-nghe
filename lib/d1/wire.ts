/**
 * Định dạng truyền một truy vấn từ trình duyệt sang máy chủ: tên bảng và
 * chuỗi thao tác `[tên, ...đối số]`, đúng thứ tự người gọi đã viết.
 *
 * VÌ SAO MỘT ENDPOINT CHUNG CHỨ KHÔNG PHẢI MỘT ROUTE CHO MỖI TÍNH NĂNG.
 * Hệ Postgres cũ cho trình duyệt nói chuyện thẳng với cơ sở dữ liệu, và RLS là thứ
 * gác. query-builder.ts được dựng để thay RLS bằng policy registry, áp ở
 * build() - tức nó chạy đúng như nhau bất kể truy vấn tới từ đâu. Nên cách
 * trung thực nhất là giữ nguyên mô hình ấy: trình duyệt dựng truy vấn, máy
 * chủ chạy nó dưới danh nghĩa người đang đăng nhập, chính sách gác. Hơn 40
 * module client chạy trên D1 thật cùng lúc, thay vì 40 route viết tay mà mỗi
 * cái là một cơ hội quên kiểm quyền.
 *
 * DANH SÁCH TRẮNG, KHÔNG PHẢI DANH SÁCH ĐEN. Mọi thao tác ngoài danh sách bị
 * từ chối - quan trọng nhất là `unsafeManualPolicy`, thứ tắt kiểm quyền trên
 * 8 bảng "manual": trình duyệt tuyệt đối không được gọi nó.
 */
export type WireOp = [string, ...unknown[]];

export interface WireQuery {
  table: string;
  ops: WireOp[];
}

export const ALLOWED_OPS = new Set([
  "select", "eq", "neq", "gt", "gte", "lt", "lte", "like", "ilike", "is", "in",
  "match", "not", "or", "order", "limit", "range", "single", "maybeSingle",
  "insert", "update", "delete", "upsert",
]);

export const MAX_OPS = 40;

export class WireError extends Error {}

/** Kiểm hình dạng trước khi chạm vào builder. Ném WireError nếu sai. */
export function validateWireQuery(body: unknown): WireQuery {
  const q = body as Partial<WireQuery> | null;
  if (!q || typeof q.table !== "string" || !/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(q.table)) {
    throw new WireError("Tên bảng không hợp lệ.");
  }
  if (!Array.isArray(q.ops) || q.ops.length > MAX_OPS) {
    throw new WireError("Danh sách thao tác không hợp lệ.");
  }
  for (const op of q.ops) {
    if (!Array.isArray(op) || typeof op[0] !== "string" || !ALLOWED_OPS.has(op[0])) {
      throw new WireError(`Thao tác "${Array.isArray(op) ? String(op[0]) : "?"}" không được phép.`);
    }
  }
  return q as WireQuery;
}

/** Áp chuỗi thao tác lên một builder đã có (từ client.from(table)). */
export function applyWireOps<B>(builder: B, ops: WireOp[]): B {
  let b = builder as unknown as Record<string, (...a: unknown[]) => unknown>;
  for (const [name, ...args] of ops) {
    const fn = b[name];
    if (typeof fn !== "function") throw new WireError(`Thao tác "${name}" không có trên builder.`);
    b = fn.apply(b, args) as typeof b;
  }
  return b as unknown as B;
}
