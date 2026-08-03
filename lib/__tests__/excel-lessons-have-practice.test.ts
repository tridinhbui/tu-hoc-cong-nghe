import { describe, expect, it } from "vitest";
import { EXCEL_PRACTICE_SETS } from "../excel-practice-data";
import { WIDGET_TYPES } from "@/components/InteractiveWidget";
import { EXCEL_DATA_LESSONS } from "../excel-data-lessons";

// Hợp đồng giữa nội dung và giao diện: mỗi bài trong chặng Excel phải có một
// bộ bài tập gõ được, và bộ đó phải thực sự được widget nhận ra.
//
// Trước đây cả sáu bài khai `interactiveType: "process"`. Loại đó có widget
// nên trang bài học vẫn dựng khối "Thử nghiệm tương tác" - và người học nhận
// một sơ đồ quy trình chung chung thay vì một bảng tính để gõ. Không có gì
// hỏng, không có gì báo; chỉ là phần thực hành của một chặng dạy thao tác thì
// không cho thao tác. Test này là thứ khiến điều đó không lặp lại.

describe("chặng Excel: mỗi bài một bài tập thực hành", () => {
  const lessons = EXCEL_DATA_LESSONS.filter((l) => l.title.startsWith("Excel, Bài"));

  it("có đủ sáu bài Excel", () => {
    expect(lessons.length).toBe(6);
  });

  for (const lesson of lessons) {
    it(`${lesson.slug} có bộ bài tập riêng`, () => {
      const key = lesson.interactiveType;
      expect(key, "chưa khai interactiveType").toBeTruthy();
      expect(EXCEL_PRACTICE_SETS[key!], `không có bộ bài tập "${key}"`).toBeTruthy();
      expect(WIDGET_TYPES as readonly string[], `"${key}" chưa đăng ký trong widget`).toContain(key);
    });
  }

  it("không bài nào dùng chung bộ bài tập với bài khác", () => {
    const keys = lessons.map((l) => l.interactiveType);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("mọi bộ bài tập đều được ít nhất một bài dùng tới", () => {
    const used = new Set(lessons.map((l) => l.interactiveType));
    for (const key of Object.keys(EXCEL_PRACTICE_SETS)) {
      expect(used, `bộ "${key}" không bài nào dùng`).toContain(key);
    }
  });
});
