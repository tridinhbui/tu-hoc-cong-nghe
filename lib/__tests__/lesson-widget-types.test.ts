import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Có HAI danh sách loại widget: union `interactiveType` trong lib/lesson-types.ts
// mà dữ liệu bài học phải khớp, và WIDGET_TYPES trong InteractiveWidget.tsx mà
// dispatcher dựa vào. Chúng phải luôn bằng nhau.
//
// Lần thêm bốn widget vừa rồi chỉ cập nhật một bên. Test bài học vẫn xanh,
// audit nội dung vẫn xanh, generator vẫn chạy - chỉ có `next build` đỏ ở bước
// type check, tức là sau hai phút build. Test này đưa cùng lỗi đó về trong một
// giây.

const repoRoot = path.resolve(__dirname, "..", "..");

function typesFromUnion(): Set<string> {
  const source = readFileSync(path.join(repoRoot, "lib", "lesson-types.ts"), "utf8");
  const start = source.indexOf("interactiveType?:");
  const end = source.indexOf(";", start);
  return new Set([...source.slice(start, end).matchAll(/"([a-z-]+)"/g)].map((m) => m[1]));
}

function typesFromDispatcher(): Set<string> {
  const source = readFileSync(path.join(repoRoot, "components", "InteractiveWidget.tsx"), "utf8");
  const block = source.slice(source.indexOf("export const WIDGET_TYPES"));
  const listStart = block.indexOf("= [") + 2;
  const list = block.slice(listStart, block.indexOf("]", listStart) + 1);
  return new Set([...list.matchAll(/"([a-z-]+)"/g)].map((m) => m[1]));
}

describe("hai danh sach loai widget", () => {
  it("khong ben nao co loai ma ben kia thieu", () => {
    const union = typesFromUnion();
    const dispatcher = typesFromDispatcher();
    expect([...union].filter((t) => !dispatcher.has(t)), "có trong lesson-types nhưng thiếu widget").toEqual([]);
    expect([...dispatcher].filter((t) => !union.has(t)), "có widget nhưng lesson-types chưa cho phép").toEqual([]);
  });

  it("ca hai danh sach deu khong rong - phong khi bo tach doc hong", () => {
    expect(typesFromUnion().size).toBeGreaterThan(5);
    expect(typesFromDispatcher().size).toBeGreaterThan(5);
  });
});
