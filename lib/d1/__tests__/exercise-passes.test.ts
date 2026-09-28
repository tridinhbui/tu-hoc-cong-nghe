import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { describe, expect, it } from "vitest";
import { getMyExercisePasses, recordExercisePass } from "../rpc";

// Chạy thẳng migration thật trên SQLite trong bộ nhớ: bảng mà RPC ghi vào
// phải đúng là bảng migrations-d1/0009 tạo ra, không phải một bản dựng tay.
function memoryDb() {
  const db = new DatabaseSync(":memory:");
  db.exec(`CREATE TABLE user_profiles (id TEXT PRIMARY KEY)`);
  db.exec(`INSERT INTO user_profiles (id) VALUES ('u1'), ('u2')`);
  db.exec(readFileSync("migrations-d1/0009_exercise_passes.sql", "utf8"));
  return {
    prepare(sql: string) {
      return {
        bind(...args: unknown[]) {
          return {
            async all() {
              return { results: db.prepare(sql).all(...(args as never[])) };
            },
            async run() {
              const r = db.prepare(sql).run(...(args as never[]));
              return { meta: { changes: Number(r.changes) } };
            },
          };
        },
      };
    },
  } as never;
}

describe("bài tập viết mã đã qua", () => {
  it("ghi một lần cho mỗi (bài, khối), và chỉ trả về của chính người gọi", async () => {
    const db = memoryDb();
    await recordExercisePass(db, "u1", 2, 11);
    await recordExercisePass(db, "u1", 2, 11); // chạy lại: không thành hai dòng
    await recordExercisePass(db, "u1", 3, 12);
    await recordExercisePass(db, "u2", 2, 11);
    const mine = await getMyExercisePasses(db, "u1");
    expect(mine.map((r) => [r.lesson_id, r.block_index])).toEqual([
      [2, 11],
      [3, 12],
    ]);
  });

  it("từ chối khi chưa đăng nhập và khi tham số không phải số nguyên hợp lệ", async () => {
    const db = memoryDb();
    await expect(recordExercisePass(db, "", 2, 1)).rejects.toThrow();
    await expect(recordExercisePass(db, "u1", 2.5, 1)).rejects.toThrow();
    await expect(recordExercisePass(db, "u1", 2, -1)).rejects.toThrow();
    expect(await getMyExercisePasses(db, "")).toEqual([]);
  });
});
