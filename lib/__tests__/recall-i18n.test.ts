import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

/** Thẻ "Nhớ lại" được dịch bằng cách lần ngược chuỗi tiếng Việt về
 *  `keyTakeaways` của bài học rồi lấy phần tử cùng chỉ số trong bản dịch.
 *
 *  Bộ kiểm này đo chính cái tỷ lệ khớp ấy trên dữ liệu thật, vì đó là thứ
 *  quyết định bao nhiêu phần trăm thẻ sẽ sang được tiếng Anh. Một lần sửa
 *  `keyTakeaways` ở bài học làm tỷ lệ này tụt mà không có gì báo - thẻ vẫn
 *  hiện, chỉ là hiện tiếng Việt. */

const dataDir = path.join(process.cwd(), "lib", "lessons-data");

function buildIndex() {
  const map = new Map<string, { slug: string; index: number }>();
  const ambiguous = new Set<string>();
  for (const file of readdirSync(dataDir).filter((f) => f.endsWith(".json") && f !== "index.json")) {
    const lesson = JSON.parse(readFileSync(path.join(dataDir, file), "utf8")) as { keyTakeaways?: string[] };
    const slug = file.replace(/\.json$/, "");
    lesson.keyTakeaways?.forEach((text, index) => {
      if (map.has(text)) ambiguous.add(text);
      else map.set(text, { slug, index });
    });
  }
  for (const t of ambiguous) map.delete(t);
  return map;
}

function recallStrings() {
  const src = readFileSync(path.join(process.cwd(), "lib", "recall-schedule.ts"), "utf8");
  const json = src.slice(src.indexOf("= {") + 2, src.lastIndexOf("};") + 1);
  const data = JSON.parse(json) as Record<string, { text: string; distractors: string[] }[]>;
  const out: string[] = [];
  for (const items of Object.values(data)) for (const it of items) out.push(it.text, ...it.distractors);
  return out;
}

describe("bản dịch thẻ nhớ lại", () => {
  it("phần lớn chuỗi lần ngược được về một takeaway của bài học", () => {
    const index = buildIndex();
    const strings = recallStrings();
    const matched = strings.filter((s) => index.has(s)).length;
    const share = matched / strings.length;
    // Ngưỡng đặt dưới mức đo được (97%) một khoảng, để một lần sửa lẻ tẻ ở bài
    // học không làm đỏ build - nhưng một đợt viết lại keyTakeaways diện rộng
    // thì có. Nâng ngưỡng sau khi ai đó viết lại script sinh; đừng hạ nó.
    expect(share, `khớp ${matched}/${strings.length}`).toBeGreaterThan(0.9);
  });

  it("không chuỗi nào khớp về hai bài khác nhau", () => {
    // Bảng tra loại hẳn chuỗi trùng, nên phép này chỉ khẳng định con số đó còn
    // nhỏ: nếu nhiều bài bắt đầu dùng chung câu takeaway thì cách lần ngược
    // này mất dần tác dụng và cần đổi sang lưu chỉ số lúc sinh.
    const seen = new Map<string, Set<string>>();
    for (const file of readdirSync(dataDir).filter((f) => f.endsWith(".json") && f !== "index.json")) {
      const lesson = JSON.parse(readFileSync(path.join(dataDir, file), "utf8")) as { keyTakeaways?: string[] };
      for (const t of lesson.keyTakeaways ?? []) {
        if (!seen.has(t)) seen.set(t, new Set());
        seen.get(t)!.add(file);
      }
    }
    const shared = [...seen.entries()].filter(([, files]) => files.size > 1);
    expect(shared.length).toBeLessThan(10);
  });
});
