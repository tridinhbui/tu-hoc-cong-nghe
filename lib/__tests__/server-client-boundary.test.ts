import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

/**
 * Không module nào chạy phía server được phép lấy GIÁ TRỊ từ một file
 * `"use client"`.
 *
 * Vì sao cần canh: một hằng số khai trong file client, nhìn từ server, không
 * phải giá trị mà là một tham chiếu để trình duyệt nạp sau. Kiểu vẫn đúng nên
 * `tsc` im lặng, `vitest` im lặng, và `next build` cũng biên dịch xong - lỗi
 * chỉ nổ ở bước thu thập dữ liệu trang.
 *
 * Đã xảy ra thật: `/pho-nghe` đọc DISTRICT_ROOMS, kéo theo
 *
 *     district-space → lobby/stations → lobby/world → lobby/room-obstacles
 *                    → lobby/ReadingRoom   ← "use client"
 *
 * và room-obstacles gọi `TABLE_ZS.map(...)` ngay ở tầng module, nên bản dựng
 * chết với "TABLE_ZS.map is not a function". Cách chữa là đưa các hằng số
 * thuần ra room-geometry.ts; test này giữ cho đường đi đó không mọc lại.
 *
 * Chỉ tính HẰNG SỐ, không tính component. Một module server import component
 * client rồi render nó là cách React Server Components được thiết kế để dùng -
 * giá trị không bao giờ bị đọc ở phía server, nó chỉ được chuyền tiếp. Phân
 * biệt bằng cách viết tên: `FormulaBlock` là component, `TABLE_ZS` và `ROOM`
 * thì không. Bắt cả hai loại sẽ cho ra một test luôn đỏ mà không ai sửa được,
 * và một test như thế thì sớm muộn cũng bị tắt đi.
 */

const ROOT = path.resolve(__dirname, "../..");

/** Các module mà một server component đọc trực tiếp. Thêm vào đây khi có trang
 *  server mới import dữ liệu từ tầng components. */
const SERVER_ENTRIES: string[] = [
];

function resolveImport(fromFile: string, spec: string): string | null {
  let base: string;
  if (spec.startsWith("@/")) base = path.join(ROOT, spec.slice(2));
  else if (spec.startsWith(".")) base = path.resolve(path.dirname(fromFile), spec);
  else return null; // gói ngoài, không quan tâm
  for (const ext of [".ts", ".tsx", "/index.ts", "/index.tsx", ""]) {
    const p = base + ext;
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
  }
  return null;
}

/** Import của một file, bỏ qua `import type` - tham chiếu kiểu bị xoá lúc biên
 *  dịch nên không bao giờ chạm vào ranh giới client. */
function valueImports(file: string): Array<{ spec: string; names: string[] }> {
  const src = fs.readFileSync(file, "utf8");
  const out: Array<{ spec: string; names: string[] }> = [];
  const re = /import\s+(type\s+)?([\s\S]*?)from\s+["']([^"']+)["']/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    if (m[1]) continue; // import type { ... }
    const clause = m[2];
    // `import { type A, type B } from` cũng chỉ là kiểu.
    const named = clause.match(/\{([\s\S]*)\}/);
    if (named && named[1].trim() && named[1].split(",").every((s) => s.trim().startsWith("type "))) {
      continue;
    }
    out.push({ spec: m[3], names: importedNames(clause) });
  }
  return out;
}

/** Tên viết kiểu component React: chữ đầu hoa VÀ có chữ thường, không gạch
 *  dưới. `FormulaBlock` đúng; `TABLE_ZS`, `ROOM`, `DOOR_HALF_W` thì không. */
function looksLikeComponent(name: string): boolean {
  return /^[A-Z]/.test(name) && /[a-z]/.test(name) && !name.includes("_");
}

/** Các tên lấy từ một import, đã bỏ phần `as` và các mục `type`. */
function importedNames(clause: string): string[] {
  const named = clause.match(/\{([\s\S]*)\}/);
  const names: string[] = [];
  const def = clause.split("{")[0].replace(/,\s*$/, "").trim();
  if (def && !def.startsWith("*")) names.push(def);
  if (named) {
    for (const part of named[1].split(",")) {
      const t = part.trim();
      if (!t || t.startsWith("type ")) continue;
      names.push((t.split(/\s+as\s+/)[1] ?? t.split(/\s+as\s+/)[0]).trim());
    }
  }
  return names.filter(Boolean);
}

function isClientModule(file: string): boolean {
  const head = fs.readFileSync(file, "utf8").slice(0, 200);
  return /^\s*["']use client["']/.test(head);
}

describe("ranh giới server/client", () => {
  it("không đường nào từ module server chạm tới một file 'use client'", () => {
    const offenders: string[] = [];
    for (const entry of SERVER_ENTRIES) {
      const start = path.join(ROOT, entry);
      expect(fs.existsSync(start), `${entry} không tồn tại - sửa danh sách SERVER_ENTRIES`).toBe(true);
      const seen = new Set<string>();
      const stack: Array<{ file: string; trail: string[] }> = [{ file: start, trail: [entry] }];
      while (stack.length) {
        const { file, trail } = stack.pop()!;
        if (seen.has(file)) continue;
        seen.add(file);
        for (const { spec, names } of valueImports(file)) {
          const next = resolveImport(file, spec);
          if (!next || seen.has(next)) continue;
          const rel = path.relative(ROOT, next);
          if (isClientModule(next)) {
            const constants = names.filter((n) => !looksLikeComponent(n));
            if (constants.length) {
              offenders.push([...trail, rel].join(" → ") + "  [" + constants.join(", ") + "]");
            }
            continue;
          }
          stack.push({ file: next, trail: [...trail, rel] });
        }
      }
    }
    expect(offenders, "đường đi này khiến hằng số thành undefined lúc dựng trang").toEqual([]);
  });
});
