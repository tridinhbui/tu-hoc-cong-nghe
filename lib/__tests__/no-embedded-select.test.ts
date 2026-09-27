import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { embedRelated } from "@/lib/embed-related";

/** D1 không có cú pháp nhúng quan hệ của PostgREST (`select("*, bang(cot)")`,
 *  `bang!inner(...)`). lib/d1/query-builder.ts ném lỗi khi gặp nó - nhưng LÚC
 *  CHẠY, ở đúng màn hình dùng truy vấn ấy, không phải lúc build. Lần rà đầu tìm
 *  được năm chỗ, một trong đó (lessons!inner) nằm trên nhiều dòng và lọt qua
 *  phép grep một dòng. Cổng tĩnh này đọc cả chuỗi nhiều dòng. */
function walk(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(dir)) {
    if (e === "node_modules" || e.startsWith(".") || e === "__tests__") continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(e)) out.push(p);
  }
  return out;
}

describe("không còn select nhúng quan hệ", () => {
  it("không tệp nào dùng cú pháp bang(cot) trong .select()", () => {
    const hits: string[] = [];
    for (const f of [...walk("app"), ...walk("lib"), ...walk("components")]) {
      const s = readFileSync(f, "utf8");
      for (const m of s.matchAll(/\.select\(\s*([`"'])([\s\S]*?)\1/g)) {
        // Hàm tổng hợp SQL (count(*)) không phải quan hệ; tên bảng thì luôn
        // có chữ cái ngay trước dấu ngoặc.
        const body = m[2].replace(/\bcount\s*\(\s*\*?\s*\)/gi, "");
        if (/[a-z_]+(![a-z]+)?\s*\(/i.test(body)) hits.push(`${f}: ${body.replace(/\s+/g, " ").slice(0, 60)}`);
      }
    }
    expect(hits, "tách thành hai truy vấn - xem lib/embed-related.ts").toEqual([]);
  });
});

describe("embedRelated", () => {
  const fake = (rows: Record<string, unknown>[]) => {
    const calls: unknown[][] = [];
    const client = {
      from: (table: string) => ({
        select: (cols: string) => ({
          in: async (col: string, ids: unknown[]) => {
            calls.push([table, cols, col, ids]);
            return { data: rows, error: null };
          },
        }),
      }),
    };
    return { client: client as never, calls };
  };

  it("gắn quan hệ đúng tên khoá PostgREST từng dùng, chỉ các cột yêu cầu", async () => {
    const { client } = fake([{ id: 7, asset_key: "k", asset_type: "card", secret: "x" }]);
    const out = await embedRelated(client, [{ asset_id: 7 }], { fk: "asset_id", table: "gamification_assets", columns: "asset_key, asset_type" });
    expect(out[0].gamification_assets).toEqual({ asset_key: "k", asset_type: "card" });
  });

  it("khoá ngoại không khớp thì null, không ném", async () => {
    const { client } = fake([]);
    const out = await embedRelated(client, [{ asset_id: 1 }], { fk: "asset_id", table: "t", columns: "a" });
    expect(out[0].t).toBeNull();
  });

  it("không có hàng nào thì không gọi truy vấn thứ hai", async () => {
    const { client, calls } = fake([]);
    await embedRelated(client, [], { fk: "asset_id", table: "t", columns: "a" });
    expect(calls).toHaveLength(0);
  });

  it("gộp id trùng thành một lần tra", async () => {
    const { client, calls } = fake([]);
    await embedRelated(client, [{ u: "a" }, { u: "a" }, { u: "b" }], { fk: "u", table: "t", columns: "x" });
    expect(calls[0][3]).toEqual(["a", "b"]);
  });
});
