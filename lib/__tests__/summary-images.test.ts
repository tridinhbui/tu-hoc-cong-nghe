import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";
import { lessons } from "../lessons";

// Ảnh tóm tắt là tài sản duy nhất trong repo mà code không nhắc tên trừ đúng
// một chỗ, nên nó im lặng theo cả hai chiều: một bài trỏ vào file đã xoá thì
// chỉ hỏng lúc chạy, còn một file không bài nào trỏ tới thì nằm im mãi mãi.
// Hai mươi ảnh - 38 MB - đã nằm im như vậy trong public/lessons.

const DIR = path.join(process.cwd(), "public", "lessons");
const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)) : [];
const used = lessons.filter((l) => l.summaryImage).map((l) => l.summaryImage!);

describe("ảnh tóm tắt trực quan", () => {
  it("mọi đường dẫn trong bài đều có file thật", () => {
    const missing = used.filter((src) => !fs.existsSync(path.join(process.cwd(), "public", src)));
    expect(missing).toEqual([]);
  });

  it("mọi ảnh trong public/lessons đều được ít nhất một bài dùng", () => {
    const referenced = new Set(used.map((src) => path.basename(src)));
    const orphans = files.filter((f) => !referenced.has(f));
    expect(orphans).toEqual([]);
  });

  it("không hai bài nào dùng chung một ảnh", () => {
    expect(new Set(used).size).toBe(used.length);
  });
});
