import { describe, it, expect, beforeEach } from "vitest";
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import { hashPassword, verifyPassword, needsRehash } from "../password";
import {
  createSession,
  verifySession,
  revokeSession,
  revokeAllSessions,
  purgeExpiredSessions,
} from "../session";
import type { D1Like } from "../../d1/rpc";

/** Vỏ D1 mỏng trên node:sqlite - cùng cách lib/d1/__tests__ vẫn làm. */
function makeDb(): D1Like & { raw: DatabaseSync } {
  const raw = new DatabaseSync(":memory:");
  raw.exec(readFileSync("migrations-d1/0003_auth.sql", "utf8"));
  return {
    raw,
    prepare(sql: string) {
      return {
        bind(...args: unknown[]) {
          return {
            async all() {
              const st = raw.prepare(sql);
              return { results: sql.trim().toUpperCase().startsWith("SELECT") ? st.all(...(args as never[])) : (st.run(...(args as never[])), []) };
            },
            async run() {
              const r = raw.prepare(sql).run(...(args as never[]));
              return { meta: { changes: Number(r.changes) } };
            },
          };
        },
      };
    },
  };
}

function addUser(db: ReturnType<typeof makeDb>, id: string, email: string) {
  db.raw.prepare(`INSERT INTO auth_users (id, email, password_hash) VALUES (?, ?, 'x')`).run(id, email);
}

describe("mật khẩu", () => {
  it("băm rồi kiểm lại đúng, và từ chối mật khẩu sai", async () => {
    const h = await hashPassword("mật khẩu đúng");
    expect(await verifyPassword("mật khẩu đúng", h)).toBe(true);
    expect(await verifyPassword("mật khẩu sai", h)).toBe(false);
  });

  it("hai lần băm cùng một mật khẩu cho hai chuỗi khác nhau", async () => {
    // Muối ngẫu nhiên. Nếu hai chuỗi bằng nhau thì muối không được dùng, và cả
    // kho mật khẩu bẻ được bằng một bảng tra duy nhất.
    expect(await hashPassword("abc")).not.toBe(await hashPassword("abc"));
  });

  it("trả false chứ không ném lỗi với chuỗi băm hỏng", async () => {
    // Đường đăng nhập không được sập vì một dòng dữ liệu xấu: ném lỗi ở đây là
    // biến một bản ghi hỏng thành lỗi 500 cho mọi lần thử đăng nhập.
    for (const bad of ["", "không-phải-băm", "pbkdf2-sha256$abc$x$y", "a$b$c$d"]) {
      expect(await verifyPassword("bất kỳ", bad)).toBe(false);
    }
  });

  it("nhận ra chuỗi băm ở số vòng cũ", async () => {
    expect(needsRehash(await hashPassword("x"))).toBe(false);
    expect(needsRehash("pbkdf2-sha256$1000$c2FsdA==$aGFzaA==")).toBe(true);
    expect(needsRehash("bcrypt$...")).toBe(true);
  });
});

describe("phiên", () => {
  let db: ReturnType<typeof makeDb>;
  beforeEach(() => {
    db = makeDb();
    addUser(db, "u1", "a@x.vn");
    addUser(db, "u2", "b@x.vn");
  });

  it("cấp rồi kiểm lại ra đúng chủ phiên", async () => {
    const { token } = await createSession(db, "u1");
    expect((await verifySession(db, token))?.userId).toBe("u1");
  });

  it("KHÔNG lưu token vào cơ sở dữ liệu", async () => {
    // Tính chất quan trọng nhất của bảng này. Nếu token nằm trong bảng thì ai
    // đọc được bảng là đăng nhập được thành mọi người dùng.
    const { token } = await createSession(db, "u1");
    const rows = db.raw.prepare(`SELECT id FROM auth_sessions`).all() as { id: string }[];
    expect(rows).toHaveLength(1);
    expect(rows[0].id).not.toBe(token);
    expect(rows[0].id).toMatch(/^[0-9a-f]{64}$/);
  });

  it("từ chối token không tồn tại, rỗng, null", async () => {
    await createSession(db, "u1");
    expect(await verifySession(db, "0".repeat(64))).toBeNull();
    expect(await verifySession(db, "")).toBeNull();
    expect(await verifySession(db, null)).toBeNull();
  });

  it("từ chối phiên đã hết hạn", async () => {
    const { token } = await createSession(db, "u1", -1);
    expect(await verifySession(db, token)).toBeNull();
  });

  it("thu hồi một phiên không đụng tới phiên khác của cùng người", async () => {
    const a = await createSession(db, "u1");
    const b = await createSession(db, "u1");
    await revokeSession(db, a.token);
    expect(await verifySession(db, a.token)).toBeNull();
    expect((await verifySession(db, b.token))?.userId).toBe("u1");
  });

  it("thu hồi toàn bộ chỉ ảnh hưởng đúng người đó", async () => {
    const a = await createSession(db, "u1");
    const c = await createSession(db, "u2");
    await revokeAllSessions(db, "u1");
    expect(await verifySession(db, a.token)).toBeNull();
    expect((await verifySession(db, c.token))?.userId).toBe("u2");
  });

  it("dọn phiên hết hạn và giữ phiên còn hạn", async () => {
    const song = await createSession(db, "u1");
    await createSession(db, "u2", -1);
    expect(await purgeExpiredSessions(db)).toBe(1);
    expect((await verifySession(db, song.token))?.userId).toBe("u1");
  });

  it("xoá tài khoản thì phiên đi theo", async () => {
    db.raw.exec("PRAGMA foreign_keys = ON");
    const { token } = await createSession(db, "u1");
    db.raw.prepare(`DELETE FROM auth_users WHERE id = ?`).run("u1");
    expect(await verifySession(db, token)).toBeNull();
  });
});

describe("email trùng", () => {
  it("chặn trùng không phân biệt hoa thường ở tầng cơ sở dữ liệu", async () => {
    // Trong mã đăng ký thì hai yêu cầu cùng lúc đều thấy trống và cùng ghi.
    const db = makeDb();
    addUser(db, "u1", "Ai@Example.VN");
    expect(() => addUser(db, "u2", "ai@example.vn")).toThrow();
  });
});
