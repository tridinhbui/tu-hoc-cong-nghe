import type { CloudflareClient } from "@/lib/cloudflare";

/**
 * Thay cú pháp nhúng quan hệ của PostgREST (`select("*, bang(cot)")`), thứ D1
 * không có - lib/d1/query-builder.ts cố ý NÉM LỖI khi gặp nó thay vì trả thiếu
 * cột. Chạy truy vấn thứ hai theo khoá ngoại rồi gắn kết quả vào từng hàng,
 * ĐÚNG TÊN KHOÁ mà PostgREST từng dùng, để mã phía sau không phải đổi.
 *
 * Hai truy vấn thay một: chấp nhận được với mấy chỗ gọi hiện có (đều là danh
 * sách của một người, vài chục hàng). Không dùng cho danh sách lớn.
 */
export async function embedRelated<T extends Record<string, unknown>>(
  client: CloudflareClient,
  rows: T[],
  opts: { fk: string; table: string; pk?: string; columns: string; as?: string }
): Promise<(T & Record<string, unknown>)[]> {
  const pk = opts.pk ?? "id";
  const as = opts.as ?? opts.table;
  const ids = [...new Set(rows.map((r) => r[opts.fk]).filter((v) => v !== null && v !== undefined))];
  if (ids.length === 0) return rows.map((r) => ({ ...r, [as]: null }));

  const cols = opts.columns.split(",").map((c) => c.trim());
  const selectCols = cols.includes(pk) ? opts.columns : `${pk}, ${opts.columns}`;
  const { data, error } = await client.from(opts.table).select(selectCols).in(pk, ids);
  if (error) throw new Error(`Không nạp được ${opts.table}: ${error.message}`);

  const byId = new Map(((data ?? []) as Record<string, unknown>[]).map((r) => [r[pk], r]));
  return rows.map((r) => {
    const rel = byId.get(r[opts.fk]);
    if (!rel) return { ...r, [as]: null };
    const picked = Object.fromEntries(cols.map((c) => [c, rel[c]]));
    return { ...r, [as]: picked };
  });
}
