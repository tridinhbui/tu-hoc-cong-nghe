import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Mọi `interactiveType` mà dữ liệu bài học khai ra phải có một widget đứng
// sau nó. Lỗ hổng này từng tồn tại và im lặng: 150 bài khai chart, process,
// risk hoặc budget - bốn loại chưa có widget - còn trang bài học thì chỉ kiểm
// tra trường có giá trị rồi ép kiểu bằng `as`. Người học nhận một tiêu đề
// "Thử nghiệm tương tác" với khoảng trống bên dưới, và TypeScript không nói
// gì vì chính lời ép kiểu đã che đi.
//
// Test đọc thẳng file nguồn thay vì import component: dispatcher là file TSX
// có JSX, và điều cần khoá ở đây là DANH SÁCH chứ không phải hành vi render.

const repoRoot = path.resolve(__dirname, "..", "..");
const dataDir = path.join(repoRoot, "lib", "lessons-data");

function declaredWidgetTypes(): Set<string> {
  const source = readFileSync(path.join(repoRoot, "components", "InteractiveWidget.tsx"), "utf8");
  const block = source.slice(source.indexOf("export const WIDGET_TYPES"));
  // Bắt đầu từ "= [" chứ không phải "[": chú thích kiểu `readonly WidgetType[]`
  // đứng trước và có sẵn một cặp ngoặc rỗng, cắt từ đó ra thì được danh sách
  // rỗng và test đi qua trong khi nó chẳng kiểm tra gì.
  const start = block.indexOf("= [") + 2;
  const list = block.slice(start, block.indexOf("]", start) + 1);
  return new Set([...list.matchAll(/"([a-z-]+)"/g)].map((m) => m[1]));
}

function typesUsedByLessons(): Map<string, number> {
  const used = new Map<string, number>();
  for (const file of readdirSync(dataDir)) {
    if (!file.endsWith(".json") || file.startsWith("_")) continue;
    const lesson = JSON.parse(readFileSync(path.join(dataDir, file), "utf8"));
    const type = lesson.interactiveType;
    if (!type || type === "none") continue;
    used.set(type, (used.get(type) ?? 0) + 1);
  }
  return used;
}

describe("widget tuong tac", () => {
  it("moi loai bai hoc khai ra deu co widget dung sau", () => {
    const declared = declaredWidgetTypes();
    const orphans = [...typesUsedByLessons().entries()]
      .filter(([type]) => !declared.has(type))
      .map(([type, count]) => `${type} (${count} bài)`);
    expect(orphans, "loại này được khai trong dữ liệu nhưng không có widget").toEqual([]);
  });

  it("moi widget khai bao deu duoc it nhat mot bai dung toi", () => {
    const used = typesUsedByLessons();
    // Một widget không bài nào dùng là mã chết, và mã chết ở đây tốn công bảo
    // trì y như mã sống - nó vẫn phải chạy qua mọi lần đổi giao diện.
    const unused = [...declaredWidgetTypes()].filter((type) => !used.has(type));
    expect(unused, "widget này không bài học nào dùng tới").toEqual([]);
  });

  it("dispatcher xu ly du moi loai, khong con nhanh mac dinh tra ve null", () => {
    const source = readFileSync(path.join(repoRoot, "components", "InteractiveWidget.tsx"), "utf8");
    const cases = new Set([...source.matchAll(/case "([a-z-]+)":/g)].map((m) => m[1]));
    for (const type of declaredWidgetTypes()) {
      expect(cases.has(type), `thiếu case cho ${type}`).toBe(true);
    }
  });
});
