import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/** Mọi `slug:` trỏ tới một bài học phải trỏ tới bài có thật.
 *
 *  Vì sao cần: các tệp dưới đây giữ danh sách "bài liên quan" cho trò chơi và
 *  case study, và chúng tham chiếu bài học bằng chuỗi slug. Không có kiểu nào
 *  ràng buộc chuỗi ấy, nên khi một bài bị thay trong quá trình chuyển kho sang
 *  nội dung công nghệ, liên kết thành trang không tồn tại mà không cổng nào
 *  đỏ - tsc không thấy, audit:lessons không đọc các tệp này, và bộ kiểm khác
 *  cũng không.
 *
 *  Đã xảy ra ba lần: ke-toan-la-gi ở chặng 7, income-statement-la-gi và
 *  present-value ở chặng 10, bao-cao-luu-chuyen-tien-te ở chặng 12 - lần cuối
 *  do một bài bonus bị thay ở phiên khác. Mỗi lần đều được tìm ra bằng tay. */

const repoRoot = path.resolve(__dirname, "..", "..");
const dataDir = path.join(repoRoot, "lib", "lessons-data");
const FILES = ["lib/games.ts", "lib/case-studies-data.ts", "lib/preview-lessons.ts"];

function existingSlugs(): Set<string> {
  return new Set(
    readdirSync(dataDir)
      .filter((f) => f.endsWith(".json") && !f.startsWith("_") && f !== "index.json")
      .map((f) => f.replace(/\.json$/, "")),
  );
}

describe("liên kết bài học trong dữ liệu tĩnh", () => {
  it("mọi slug được tham chiếu đều trỏ tới bài có thật", () => {
    const valid = existingSlugs();
    const broken: string[] = [];
    for (const rel of FILES) {
      const source = readFileSync(path.join(repoRoot, rel), "utf8");
      for (const m of source.matchAll(/slug:\s*"([a-z0-9-]+)"/g)) {
        if (!valid.has(m[1])) broken.push(`${rel}: ${m[1]}`);
      }
    }
    expect([...new Set(broken)]).toEqual([]);
  });
});
