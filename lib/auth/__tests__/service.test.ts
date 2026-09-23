import { describe, it, expect, beforeEach } from "vitest";
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import {
  signUp, signInWithPassword, requestPasswordReset, resetPassword,
  changePassword, signInWithIdentity, AuthError,
} from "../service";
import { verifySession } from "../session";
import type { D1Like } from "../../d1/rpc";

/** Lấy đúng DDL của user_profiles từ lược đồ thật, không chép tay lại. */
function userProfilesDDL() {
  const sql = readFileSync("migrations-d1/0001_schema.sql", "utf8");
  const m = sql.match(/CREATE TABLE IF NOT EXISTS "user_profiles"[\s\S]*?\n\);/);
  if (!m) throw new Error("không tìm thấy user_profiles trong 0001_schema.sql");
  return m[0];
}

function makeDb() {
  const raw = new DatabaseSync(":memory:");
  raw.exec(readFileSync("migrations-d1/0003_auth.sql", "utf8"));
  raw.exec(readFileSync("migrations-d1/0004_auth_identities_and_resets.sql", "utf8"));
  raw.exec(userProfilesDDL());
  const db: D1Like & { raw: DatabaseSync } = {
    raw,
    prepare(sql: string) {
      return {
        bind(...args: unknown[]) {
          const isSelect = sql.trim().toUpperCase().startsWith("SELECT");
          return {
            async all() {
              if (isSelect) return { results: raw.prepare(sql).all(...(args as never[])) };
              raw.prepare(sql).run(...(args as never[]));
              return { results: [] };
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
  return db;
}

describe("đăng ký", () => {
  let db: ReturnType<typeof makeDb>;
  beforeEach(() => { db = makeDb(); });

  it("tạo cả tài khoản lẫn hồ sơ, và cấp phiên ngay", async () => {
    // Supabase làm phần hồ sơ bằng một trigger trên auth.users, thứ không port
    // sang D1 được. Ở đây phải là lệnh ghi tường minh, nên phải có bài kiểm.
    const r = await signUp(db, "Ai@Example.VN", "mat-khau-du-dai");
    expect(r.user.email).toBe("ai@example.vn");
    const p = db.raw.prepare(`SELECT id FROM user_profiles WHERE id = ?`).all(r.user.id);
    expect(p, "hồ sơ không được tạo cùng tài khoản").toHaveLength(1);
    expect((await verifySession(db, r.token))?.userId).toBe(r.user.id);
  });

  it("từ chối email trùng, không phân biệt hoa thường", async () => {
    await signUp(db, "ai@example.vn", "mat-khau-du-dai");
    await expect(signUp(db, "AI@EXAMPLE.VN", "mat-khau-khac")).rejects.toThrow(/đã có tài khoản/);
  });

  it("từ chối mật khẩu quá ngắn và email không hợp lệ", async () => {
    await expect(signUp(db, "a@b.vn", "ngan")).rejects.toThrow(/8 ký tự/);
    await expect(signUp(db, "khong-co-a-cong", "mat-khau-du-dai")).rejects.toThrow(/không hợp lệ/);
  });
});

describe("đăng nhập", () => {
  let db: ReturnType<typeof makeDb>;
  beforeEach(async () => { db = makeDb(); await signUp(db, "ai@example.vn", "mat-khau-du-dai"); });

  it("đúng mật khẩu thì cấp phiên", async () => {
    const r = await signInWithPassword(db, "ai@example.vn", "mat-khau-du-dai");
    expect((await verifySession(db, r.token))?.userId).toBe(r.user.id);
  });

  it("email lạ và mật khẩu sai cho CÙNG một thông báo", async () => {
    // Phân biệt hai trường hợp là biến trang đăng nhập thành công cụ dò xem
    // một email có tài khoản hay không.
    const bat = async (em: string, mk: string) => {
      try { await signInWithPassword(db, em, mk); throw new Error("lẽ ra phải hỏng"); }
      catch (e) { return e as AuthError; }
    };
    const a = await bat("khong-ton-tai@x.vn", "gi-do-dai-dai");
    const b = await bat("ai@example.vn", "sai-mat-khau");
    expect(a.message).toBe(b.message);
    expect(a.code).toBe(b.code);
  });

  it("tài khoản bị khoá thì không vào được", async () => {
    db.raw.prepare(`UPDATE user_profiles SET is_disabled = 1 WHERE lower(email) = ?`).run("ai@example.vn");
    await expect(signInWithPassword(db, "ai@example.vn", "mat-khau-du-dai")).rejects.toThrow(/bị khoá/);
  });
});

describe("đặt lại mật khẩu", () => {
  let db: ReturnType<typeof makeDb>;
  beforeEach(async () => { db = makeDb(); await signUp(db, "ai@example.vn", "mat-khau-du-dai"); });

  it("token dùng được đúng MỘT lần", async () => {
    // D1 không có transaction tương tác, nên chỗ này dựa vào số dòng đổi của
    // lệnh đánh dấu. Hỏng là hai yêu cầu cùng token cùng đổi được mật khẩu.
    const t = await requestPasswordReset(db, "ai@example.vn");
    await resetPassword(db, t!.token, "mat-khau-moi-dai");
    await expect(resetPassword(db, t!.token, "mat-khau-khac-nua")).rejects.toThrow(/đã dùng rồi/);
  });

  it("đặt lại xong thì mọi phiên cũ chết", async () => {
    // Nếu ai đó chiếm tài khoản, chủ nhân đặt lại mật khẩu phải đẩy họ ra.
    const cu = await signInWithPassword(db, "ai@example.vn", "mat-khau-du-dai");
    const t = await requestPasswordReset(db, "ai@example.vn");
    await resetPassword(db, t!.token, "mat-khau-moi-dai");
    expect(await verifySession(db, cu.token)).toBeNull();
    await expect(signInWithPassword(db, "ai@example.vn", "mat-khau-du-dai")).rejects.toThrow();
    const moi = await signInWithPassword(db, "ai@example.vn", "mat-khau-moi-dai");
    expect(moi.user.email).toBe("ai@example.vn");
  });

  it("email không có tài khoản trả null chứ không lộ ra", async () => {
    expect(await requestPasswordReset(db, "khong-ton-tai@x.vn")).toBeNull();
  });

  it("token hết hạn thì không dùng được", async () => {
    const t = await requestPasswordReset(db, "ai@example.vn");
    db.raw.prepare(`UPDATE auth_password_resets SET expires_at = ?`).run("2000-01-01T00:00:00.000Z");
    await expect(resetPassword(db, t!.token, "mat-khau-moi-dai")).rejects.toThrow(/hết hạn/);
  });

  it("KHÔNG lưu token thường vào cơ sở dữ liệu", async () => {
    const t = await requestPasswordReset(db, "ai@example.vn");
    const r = db.raw.prepare(`SELECT id FROM auth_password_resets`).all() as { id: string }[];
    expect(r[0].id).not.toBe(t!.token);
    expect(r[0].id).toMatch(/^[0-9a-f]{64}$/);
  });
});

describe("đổi mật khẩu", () => {
  it("cần đúng mật khẩu hiện tại, và thu hồi mọi phiên", async () => {
    const db = makeDb();
    const r = await signUp(db, "ai@example.vn", "mat-khau-du-dai");
    await expect(changePassword(db, r.user.id, "sai", "mat-khau-moi-dai")).rejects.toThrow(/không đúng/);
    await changePassword(db, r.user.id, "mat-khau-du-dai", "mat-khau-moi-dai");
    expect(await verifySession(db, r.token)).toBeNull();
  });
});

describe("đăng nhập bằng Google", () => {
  let db: ReturnType<typeof makeDb>;
  beforeEach(() => { db = makeDb(); });

  it("tạo tài khoản mới ở lần đầu, rồi nhận ra ở lần sau", async () => {
    const a = await signInWithIdentity(db, "google", "sub-123", "ai@example.vn", true);
    expect(a.created).toBe(true);
    const b = await signInWithIdentity(db, "google", "sub-123", "ai@example.vn", true);
    expect(b.created).toBe(false);
    expect(b.user.id).toBe(a.user.id);
  });

  it("khớp theo sub chứ KHÔNG theo email", async () => {
    // Email đổi được. Khớp theo email nghĩa là ai chiếm được một email là
    // chiếm được tài khoản.
    const a = await signInWithIdentity(db, "google", "sub-123", "cu@example.vn", true);
    const b = await signInWithIdentity(db, "google", "sub-123", "moi-doi@example.vn", true);
    expect(b.user.id).toBe(a.user.id);

    // sub khác + email chưa xác minh của người khác: phải TỪ CHỐI, chứ không
    // ghép và cũng không tạo tài khoản thứ hai cùng email.
    await expect(
      signInWithIdentity(db, "google", "sub-KHAC", "cu@example.vn", false)
    ).rejects.toThrow(/đã có tài khoản/);
  });

  it("email CHƯA xác minh thì không ghép được vào tài khoản mật khẩu sẵn có", async () => {
    // Đây là đường chiếm tài khoản: đăng ký một tài khoản Google mang email
    // của người khác mà không xác minh, rồi đăng nhập vào tài khoản của họ.
    const goc = await signUp(db, "nan-nhan@example.vn", "mat-khau-du-dai");
    await expect(
      signInWithIdentity(db, "google", "sub-gia", "nan-nhan@example.vn", false)
    ).rejects.toThrow(/đã có tài khoản/);
    // Và không được sinh ra tài khoản thứ hai nào mang email ấy.
    const n = db.raw.prepare(`SELECT count(*) c FROM auth_users WHERE lower(email) = ?`)
      .all("nan-nhan@example.vn") as { c: number }[];
    expect(n[0].c).toBe(1);
    expect(goc.user.id).toBeTruthy();
  });

  it("liên kết vào tài khoản email sẵn có khi email ĐÃ xác minh", async () => {
    const goc = await signUp(db, "ai@example.vn", "mat-khau-du-dai");
    const g = await signInWithIdentity(db, "google", "sub-123", "ai@example.vn", true);
    expect(g.user.id).toBe(goc.user.id);
    expect(g.created).toBe(false);
  });

  it("tài khoản chỉ có Google thì không đăng nhập bằng mật khẩu được", async () => {
    await signInWithIdentity(db, "google", "sub-123", "chi-google@example.vn", true);
    await expect(signInWithPassword(db, "chi-google@example.vn", "doan-dai-dai")).rejects.toThrow(/không đúng/);
  });

  it("tài khoản bị khoá thì Google cũng không vào được", async () => {
    const a = await signInWithIdentity(db, "google", "sub-123", "ai@example.vn", true);
    db.raw.prepare(`UPDATE user_profiles SET is_disabled = 1 WHERE id = ?`).run(a.user.id);
    await expect(signInWithIdentity(db, "google", "sub-123", "ai@example.vn", true)).rejects.toThrow(/bị khoá/);
  });
});
