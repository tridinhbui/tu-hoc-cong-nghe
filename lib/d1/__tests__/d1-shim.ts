import { DatabaseSync } from "node:sqlite";
import { readdirSync, copyFileSync, mkdtempSync, existsSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

/**
 * Vỏ bọc D1 mỏng trên `node:sqlite`, để bộ kiểm chạy được bộ dựng truy vấn
 * trên DỮ LIỆU THẬT chứ không phải trên dữ liệu bịa.
 *
 * D1 local của wrangler là một tệp SQLite bình thường, và Node 24 có sẵn
 * `node:sqlite`, nên không cần thêm phụ thuộc nào. Cái này KHÔNG thay cho việc
 * chạy thật trên Workers - nó chỉ kiểm phần SQL, đúng phần dễ sai nhất.
 */
/** Đường dẫn tới tệp SQLite của D1 local. */
export function localD1Path() {
  const dir = join(process.cwd(), ".wrangler/state/v3/d1/miniflare-D1DatabaseObject");
  const file = readdirSync(dir).find((f) => f.endsWith(".sqlite") && f !== "metadata.sqlite");
  if (!file) throw new Error("chưa có D1 local - chạy scripts/d1 để dựng lược đồ và nạp dữ liệu");
  return join(dir, file);
}

/**
 * Bản sao GHI ĐƯỢC của D1 local, trong thư mục tạm.
 *
 * Vài phép kiểm cách ly cần dữ liệu mà kho thật không có - một bài đăng bị ẩn,
 * một tài liệu chưa duyệt. Không có nó thì bài test bỏ qua và xanh mà không
 * chứng minh gì, đúng nhánh riêng tư quan trọng nhất.
 *
 * Chép ra chứ không ghi vào bản gốc: bản gốc là dữ liệu production đã nạp, và
 * một bài test ghi vào đó sẽ làm mọi phép đo sau lệch đi mà không ai truy ra.
 */
/**
 * Ảnh chụp riêng của D1 local, dựng một lần cho mỗi tiến trình kiểm.
 *
 * VÌ SAO KHÔNG ĐỌC THẲNG TỆP SỐNG. Vitest chạy nhiều tệp kiểm song song trong
 * nhiều tiến trình, và tất cả cùng mở một tệp SQLite. Ở chế độ WAL, mỗi kết
 * nối - kể cả chỉ đọc - cần ghi vào tệp `-shm`, nên các tiến trình tranh nhau
 * và SQLite trả "database is locked".
 *
 * Lỗi ấy ĐÃ Ở ĐÂY SẴN, bị một `catch {}` trong two-account-isolation.test.ts
 * nuốt mất: số bảng được kiểm tụt xuống 1 và bài kiểm đỏ với "expected 1 to be
 * greater than 15", một thông báo không chỉ về nguyên nhân nào. Nó đỏ khi thì
 * không, tuỳ tiến trình nào giành được tệp trước.
 *
 * Chép CẢ BA tệp chứ không chỉ tệp .sqlite: ở chế độ WAL, phần lớn dữ liệu mới
 * nằm trong `-wal` (ở đây 27 MB so với 24 MB của tệp chính). Chép thiếu nó thì
 * bản sao là một ảnh chụp cũ, và tệ hơn lỗi khoá vì nó KHÔNG báo gì cả.
 */
let snapshotPath: string | null = null;
function snapshot(): string {
  if (snapshotPath) return snapshotPath;
  const src = localD1Path();
  const dir = mkdtempSync(join(tmpdir(), "d1-snap-"));
  const dst = join(dir, "snap.sqlite");
  copyFileSync(src, dst);
  for (const ext of ["-wal", "-shm"]) {
    if (existsSync(src + ext)) copyFileSync(src + ext, dst + ext);
  }
  snapshotPath = dst;
  return dst;
}

export function openWritableCopy(seed: string[]) {
  const tmp = join(mkdtempSync(join(tmpdir(), "d1-test-")), "copy.sqlite");
  copyFileSync(snapshot(), tmp);
  const db = new DatabaseSync(tmp);
  for (const sql of seed) db.prepare(sql).all();
  db.close();

  const ro = new DatabaseSync(tmp, { readOnly: true });
  return {
    prepare(sql: string) {
      return {
        bind(...args: unknown[]) {
          return { async all() { return { results: ro.prepare(sql).all(...(args as never[])) }; } };
        },
      };
    },
  } as never;
}

export function openLocalD1() {
  const db = new DatabaseSync(snapshot(), { readOnly: true });

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
