import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { vi as viDict } from "../i18n/dictionaries/vi";
import { en as enDict } from "../i18n/dictionaries/en";

// Trang /lo-trinh nói với người mới ba con số, và cả ba là khẳng định về KHO,
// không phải lời khuyên: một bài dài khoảng bao nhiêu phút, và app tự nhắc lại
// bài cách đó bao nhiêu vị trí. Nếu kho đổi mà mấy câu đó không đổi theo thì
// hướng dẫn thành sai - và không có gì báo, vì chúng chỉ là chữ.
//
// Đây là cùng lớp lỗi với nhãn "hiện hành" của biểu thuế: phép tính đúng, cái
// nhãn hết đúng, và không test nào buộc nhãn khớp thực tế.

/** Phải khớp MEDIAN_LESSON_MINUTES trong components/LearningPathClient.tsx. */
const CLAIMED_MEDIAN_MINUTES = 6;

function median(xs: number[]): number {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

describe("con số trang /lo-trinh nói với người học", () => {
  const lessons = readdirSync("lib/lessons-data")
    .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
    .map((f) => JSON.parse(readFileSync(`lib/lessons-data/${f}`, "utf8")) as { totalMinutes?: number });

  it("có bài để đo - nếu không, test này vô nghĩa", () => {
    expect(lessons.length).toBeGreaterThan(100);
  });

  it("trung vị thời lượng một bài vẫn đúng bằng con số trang đang hiện", () => {
    const mins = lessons.map((l) => l.totalMinutes).filter((m): m is number => typeof m === "number");
    expect(mins.length).toBeGreaterThan(100);
    expect(median(mins)).toBe(CLAIMED_MEDIAN_MINUTES);
  });

  it("khoảng nhắc lại 5 và 12 bài vẫn là điều RECALL_SCHEDULE làm", () => {
    // Không import RECALL_SCHEDULE (server-only, ~5000 dòng). Đọc chính comment
    // đầu file - nơi con số đó được ghi - vì đó là thứ trang /lo-trinh dựa vào.
    // Chuẩn hoá trước khi so: comment ngắt dòng giữa "~12 positions" và
    // "earlier", nên so chuỗi thô là bắt được lỗi của chính phép kiểm chứ không
    // phải lỗi của code - đúng điều đã xảy ra ở bản đầu của test này.
    const head = readFileSync("lib/recall-schedule.ts", "utf8")
      .slice(0, 1400)
      .replace(/^\s*\/\/ ?/gm, "")
      .replace(/\s+/g, " ");
    expect(head).toContain("~5 and ~12 positions earlier");
  });

  it("câu giải thích nhịp học nhắc đúng hai con số đó, ở cả hai ngôn ngữ", () => {
    // So bằng SỐ, không bằng cả cụm. Bản đầu của phép kiểm này đòi đúng chuỗi
    // "5 back", rồi đỏ ngay khi câu tiếng Anh được viết lại thành "5 lessons
    // back" - tức nó bắt lỗi của chính nó, không phải lỗi của nội dung. Điều
    // đáng canh là hai con số 5 và 12 còn được nhắc, không phải chúng được nhắc
    // bằng cụm từ nào.
    for (const body of [viDict.learningPath.paceWarnBody, enDict.learningPath.paceWarnBody]) {
      expect(body).toMatch(/\b5\b/);
      expect(body).toMatch(/\b12\b/);
    }
  });

  it("ngưỡng 70% ở mốc kiểm nói giống nhau ở hai ngôn ngữ", () => {
    expect(viDict.learningPath.stepCheckBody).toContain("70%");
    expect(enDict.learningPath.stepCheckBody).toContain("70%");
  });
});
