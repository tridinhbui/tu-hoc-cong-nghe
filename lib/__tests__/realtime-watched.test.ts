import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  WATCHED_TABLES,
  classifyWrite,
  isValidHubName,
  signalsFromResult,
  MAX_ROW_SIGNALS,
} from "../realtime/watched";

const LIB = join(process.cwd(), "lib");

describe("danh sách bảng được theo dõi không trôi khỏi mã thật", () => {
  it("mọi bảng có handler postgres_changes đều nằm trong WATCHED_TABLES", () => {
    // Bảng nghe mà không nằm trong danh sách thì không lệnh ghi nào phát tín
    // hiệu cho nó: giao diện đứng im, không lỗi nào báo. Đây là thứ duy nhất
    // bắt được trường hợp ấy trước khi người dùng thấy.
    const heard = new Set<string>();
    for (const f of readdirSync(LIB).filter((x) => /^cloudflare-.*\.ts$/.test(x))) {
      const src = readFileSync(join(LIB, f), "utf8");
      for (const m of src.matchAll(/postgres_changes[\s\S]{0,200}?table:\s*["']([a-z_]+)["']/g)) heard.add(m[1]);
    }
    expect(heard.size).toBeGreaterThan(5); // phép đo không rỗng vì regex hỏng
    const missing = [...heard].filter((t) => !(WATCHED_TABLES as readonly string[]).includes(t));
    expect(missing).toEqual([]);
  });

  it("mọi câu SQL thô ghi vào bảng được theo dõi trong rpc.ts đều được nhận ra", () => {
    // 13 câu lúc viết. Bộ phân loại trả null cho câu nó không hiểu - sai về
    // phía an toàn (không lộ gì), nhưng là một cập nhật bị nuốt im lặng.
    const src = readFileSync(join(LIB, "d1", "rpc.ts"), "utf8");
    const re = new RegExp(`\`\\s*((?:insert\\s+(?:or\\s+\\w+\\s+)?into|update|delete\\s+from)\\s+"?(?:${WATCHED_TABLES.join("|")})"?\\b[^\`]*)\``, "gi");
    const stmts = [...src.matchAll(re)].map((m) => m[1]);
    expect(stmts.length).toBeGreaterThanOrEqual(13);
    const unrecognised = stmts.filter((s) => classifyWrite(s) === null);
    expect(unrecognised).toEqual([]);
  });
});

describe("classifyWrite", () => {
  it("nhận ra ba loại ghi, cả khi có nháy và chữ hoa", () => {
    expect(classifyWrite(`insert into chat_messages (a) values (?)`)).toEqual({ table: "chat_messages", event: "INSERT" });
    expect(classifyWrite(`INSERT OR REPLACE INTO "direct_messages" (a) values (?)`)).toEqual({ table: "direct_messages", event: "INSERT" });
    expect(classifyWrite(`  update study_room_members set left_at = 1`)).toEqual({ table: "study_room_members", event: "UPDATE" });
    expect(classifyWrite(`DELETE FROM "community_posts" WHERE id = ?`)).toEqual({ table: "community_posts", event: "DELETE" });
  });

  it("bỏ qua bảng không theo dõi và câu đọc", () => {
    expect(classifyWrite(`insert into auth_sessions (id) values (?)`)).toBeNull();
    expect(classifyWrite(`select * from chat_messages`)).toBeNull();
    // Không nhầm tiền tố: chat_messages_archive KHÔNG phải chat_messages.
    expect(classifyWrite(`update chat_messages_archive set x = 1`)).toBeNull();
  });
});

describe("signalsFromResult", () => {
  const k = { table: "chat_messages" as const, event: "UPDATE" as const };

  it("0 hàng đổi thì không phát gì", () => {
    expect(signalsFromResult(k, { results: [], meta: { changes: 0 } })).toEqual([]);
  });

  it("RETURNING có id thì phát đúng từng hàng", () => {
    expect(signalsFromResult(k, { results: [{ id: 3 }, { id: 7 }], meta: { changes: 2 } })).toEqual([
      { ...k, id: 3 },
      { ...k, id: 7 },
    ]);
  });

  it("quá nhiều hàng thì gộp thành một tín hiệu cấp bảng", () => {
    const rows = Array.from({ length: MAX_ROW_SIGNALS + 1 }, (_, i) => ({ id: i + 1 }));
    expect(signalsFromResult(k, { results: rows })).toEqual([{ ...k, id: null }]);
  });

  it("INSERT một hàng không RETURNING lấy id từ last_row_id", () => {
    const ins = { table: "study_room_messages" as const, event: "INSERT" as const };
    expect(signalsFromResult(ins, { results: [], meta: { changes: 1, last_row_id: 42 } })).toEqual([{ ...ins, id: 42 }]);
  });

  it("UPDATE không RETURNING thì không bịa id", () => {
    expect(signalsFromResult(k, { results: [], meta: { changes: 5 } })).toEqual([{ ...k, id: null }]);
  });
});

describe("isValidHubName", () => {
  it("chỉ nhận hub bảng đúng mười một bảng, và chủ đề trong bảng chữ hẹp", () => {
    expect(isValidHubName("table:direct_messages")).toBe(true);
    expect(isValidHubName("table:auth_sessions")).toBe(false);
    expect(isValidHubName("topic:lobby")).toBe(true);
    expect(isValidHubName("topic:study_world:12")).toBe(true);
    expect(isValidHubName("topic:" + "x".repeat(121))).toBe(false);
    expect(isValidHubName("topic:<script>")).toBe(false);
    expect(isValidHubName("direct_messages")).toBe(false);
  });
});
