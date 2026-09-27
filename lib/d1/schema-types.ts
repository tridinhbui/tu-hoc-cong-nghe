import type { ColumnTypes } from "./query-builder";

type Snapshot = { tables: Record<string, { columns: { name: string; format: string }[] }> };

/**
 * Bảng kiểu cột `{ bảng: { cột: format } }` từ scripts/d1/schema-snapshot.json.
 *
 * Tách ra hàm riêng vì chính phép dựng này từng sai MÀ KHÔNG AI THẤY: server.ts
 * viết `snapshot.columns ?? snapshot`, trong khi bản chụp có dạng
 * `{ takenAt, tables: { bảng: { columns: [...] } }, rpcs }`. Bảng kiểu nhận ba
 * khoá `takenAt`, `tables`, `rpcs` thay cho tên bảng, nên MỌI lệnh `.from()` phía
 * máy chủ ném "không có trong lược đồ". 1.576 bộ kiểm vẫn xanh, vì mọi bộ kiểm
 * tự dựng bảng kiểu cho riêng mình - đúng cách - và không bộ nào đi qua dòng của
 * server.ts. Tìm ra khi chạy thử realtime trên workerd thật.
 *
 * Giờ cả server.ts lẫn bộ kiểm đều gọi hàm này, nên hai bên không thể lệch nhau.
 */
export function typesFromSnapshot(snapshot: unknown): ColumnTypes {
  const tables = (snapshot as Partial<Snapshot>)?.tables;
  if (!tables || typeof tables !== "object") {
    throw new Error("schema-snapshot.json không có khoá `tables` - tệp bị hỏng hoặc sai phiên bản (công cụ chụp đã gỡ cùng hệ cũ - khôi phục từ git).");
  }
  return Object.fromEntries(
    Object.entries(tables).map(([t, d]) => [t, Object.fromEntries(d.columns.map((c) => [c.name, c.format]))])
  );
}
