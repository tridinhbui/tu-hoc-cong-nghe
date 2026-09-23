import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { createD1Rpc, D1RpcError, RPC_COUNT } from "../rpc-dispatch";
import type { D1Like } from "../rpc";

/**
 * Đọc chữ ký thật từ rpc.ts và đối chiếu với bảng điều phối.
 *
 * Đây mới là phần đáng kiểm. Một lời gọi sai tham số vẫn CHẠY và trả về dữ
 * liệu sai, nên bài kiểm "gọi được không" xanh mà không chứng minh gì. Bài
 * kiểm phải là: bảng có còn khớp chữ ký không, sau khi ai đó sửa rpc.ts.
 */
function signatures() {
  const src = readFileSync("lib/d1/rpc.ts", "utf8");
  const re = /^export async function ([a-zA-Z]+)\(([\s\S]*?)\)\s*:\s*Promise/gm;
  const out: Record<string, { name: string; optional: boolean }[]> = {};
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    out[m[1]] = m[2]
      .split(/,(?![^(]*\))/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => ({
        name: s.split(":")[0].trim().replace("?", ""),
        optional: s.includes("?:") || s.includes("="),
      }))
      .filter((p) => p.name !== "db");
  }
  return out;
}

/** Bảng điều phối, đọc lại từ nguồn để so vị trí tham số. */
function table() {
  const src = readFileSync("lib/d1/rpc-dispatch.ts", "utf8");
  const re = /"([a-z_]+)":\s*\{\s*fn:\s*"([a-zA-Z]+)",\s*args:\s*\[([^\]]*)\]/g;
  const out: Record<string, { fn: string; args: (string | null)[] }> = {};
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    const args = m[3].trim()
      ? m[3].split(",").map((s) => {
          const t = s.trim();
          return t === "null" ? null : t.replace(/^"|"$/g, "");
        })
      : [];
    out[m[1]] = { fn: m[2], args };
  }
  return out;
}

describe("bảng điều phối khớp chữ ký thật", () => {
  const sig = signatures();
  const tbl = table();

  it("phủ đủ 53 hàm và khoá con số lại", () => {
    // Khoá để một hàm bị rơi ra khỏi bảng là đỏ, chứ không phải im lặng
    // thành "không có hàm RPC đó" lúc chạy thật.
    expect(RPC_COUNT).toBe(53);
    expect(Object.keys(tbl)).toHaveLength(53);
    expect(Object.keys(sig)).toHaveLength(53);
  });

  it("mọi hàm được trỏ tới đều tồn tại trong rpc.ts", () => {
    for (const [name, spec] of Object.entries(tbl)) {
      expect(sig[spec.fn], `${name} trỏ tới ${spec.fn} không có thật`).toBeDefined();
    }
  });

  it("số tham số không vượt quá chữ ký, và mọi tham số bắt buộc đều được cấp", () => {
    for (const [name, spec] of Object.entries(tbl)) {
      const params = sig[spec.fn];
      expect(spec.args.length, `${name}: truyền thừa tham số`).toBeLessThanOrEqual(params.length);
      params.forEach((p, i) => {
        if (p.optional) return;
        expect(spec.args[i], `${name}: tham số bắt buộc "${p.name}" ở vị trí ${i} không được cấp`).not.toBe(undefined);
        expect(spec.args[i], `${name}: tham số bắt buộc "${p.name}" bị bỏ trống`).not.toBeNull();
      });
    }
  });

  it("__actor__ nằm đúng chỗ tham số tên actor", () => {
    // Đây là phép kiểm quan trọng nhất của cả tệp. Tiêm id người gọi sai vị
    // trí nghĩa là một hàm lọc theo NGƯỜI KHÁC - đúng loại lỗi phân quyền mà
    // việc bỏ RLS sinh ra.
    for (const [name, spec] of Object.entries(tbl)) {
      const params = sig[spec.fn];
      const want = params.findIndex((p) => p.name === "actor");
      const got = spec.args.indexOf("__actor__");
      expect(got, `${name}: vị trí actor lệch (chữ ký ${want}, bảng ${got})`).toBe(want);
    }
  });

  it("mọi khoá tham số đều ứng với đúng một tham số của hàm", () => {
    const camel = (s: string) => s.replace(/^p_/, "").replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    const RENAME: Record<string, Record<string, string>> = { search_accounts: { result_limit: "limit" } };
    for (const [name, spec] of Object.entries(tbl)) {
      const params = sig[spec.fn];
      spec.args.forEach((a, i) => {
        if (a === null || a === "__actor__") return;
        const expected = RENAME[name]?.[a] ?? camel(a);
        expect(params[i].name, `${name}: khoá "${a}" đặt ở vị trí của "${params[i].name}"`).toBe(expected);
      });
    }
  });
});

describe("điều phối từ chối sai sót thay vì nuốt", () => {
  const db = { prepare: () => ({ bind: () => ({ all: async () => ({ results: [] }) }) }) } as unknown as D1Like;

  it("tên hàm lạ thì ném lỗi", async () => {
    // Nuốt lặng nghĩa là một lời gọi gõ sai tên vẫn chạy và trả rỗng.
    await expect(createD1Rpc(db, "u1")("khong_co_ham_nay")).rejects.toThrow(D1RpcError);
  });

  it("khoá tham số lạ thì ném lỗi", async () => {
    await expect(createD1Rpc(db, "u1")("get_follow_counts", { p_sai: 1 })).rejects.toThrow(/không nhận tham số/);
  });

  it("hàm cần người gọi mà chưa đăng nhập thì ném lỗi", async () => {
    // Cho qua ở đây là chạy một hàm lẽ ra lọc theo chủ sở hữu với actor null.
    await expect(createD1Rpc(db, null)("get_dashboard_summary")).rejects.toThrow(/chưa đăng nhập/);
  });

  it("hàm không cần người gọi thì chạy được khi chưa đăng nhập", async () => {
    const r = await createD1Rpc(db, null)("get_total_user_count");
    expect(r.error).toBeNull();
  });

  it("lỗi lúc chạy trả về trong { error }, không ném", async () => {
    // 60 chỗ gọi đang đọc theo kiểu Supabase; ném sẽ thành sự cố chưa bắt.
    const vo = { prepare: () => ({ bind: () => ({ all: async () => { throw new Error("D1 hỏng"); } }) }) } as unknown as D1Like;
    const r = await createD1Rpc(vo, "u1")("get_dashboard_summary");
    expect(r.error).toBeInstanceOf(Error);
    expect(r.data).toBeNull();
  });
});
