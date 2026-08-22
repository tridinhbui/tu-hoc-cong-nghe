import { DatabaseSync } from "node:sqlite";
import { readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Vỏ bọc D1 mỏng trên `node:sqlite`, để bộ kiểm chạy được bộ dựng truy vấn
 * trên DỮ LIỆU THẬT chứ không phải trên dữ liệu bịa.
 *
 * D1 local của wrangler là một tệp SQLite bình thường, và Node 24 có sẵn
 * `node:sqlite`, nên không cần thêm phụ thuộc nào. Cái này KHÔNG thay cho việc
 * chạy thật trên Workers - nó chỉ kiểm phần SQL, đúng phần dễ sai nhất.
 */
export function openLocalD1() {
  const dir = join(process.cwd(), ".wrangler/state/v3/d1/miniflare-D1DatabaseObject");
  const file = readdirSync(dir).find((f) => f.endsWith(".sqlite") && f !== "metadata.sqlite");
  if (!file) throw new Error("chưa có D1 local - chạy scripts/d1 để dựng lược đồ và nạp dữ liệu");
  const db = new DatabaseSync(join(dir, file), { readOnly: true });

  return {
    prepare(sql: string) {
      return {
        bind(...args: unknown[]) {
          return {
            async all() {
              const stmt = db.prepare(sql);
              return { results: stmt.all(...(args as never[])) };
            },
          };
        },
      };
    },
  } as never;
}
