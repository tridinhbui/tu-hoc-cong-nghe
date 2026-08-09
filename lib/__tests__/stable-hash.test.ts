import { describe, it, expect } from "vitest";
import { stableHash, questionFingerprint } from "../stable-hash";

describe("dấu vân tay nội dung", () => {
  it("cùng đầu vào cho cùng kết quả", () => {
    expect(stableHash("abc")).toBe(stableHash("abc"));
  });

  it("đổi một ký tự là đổi kết quả", () => {
    expect(stableHash("Lãi suất là gì?")).not.toBe(stableHash("Lãi suất là gì!"));
  });

  it("bỏ qua khoảng trắng và hoa thường", () => {
    // Sửa lại cách xuống dòng trong lib/lessons.ts không được phép vứt lịch sử
    // câu sai của người học đi.
    expect(questionFingerprint("Lãi  suất\nlà gì?")).toBe(questionFingerprint("lãi suất là gì?"));
  });

  it("GIỮ dấu tiếng Việt", () => {
    expect(questionFingerprint("lãi")).not.toBe(questionFingerprint("lai"));
  });

  it("dài cố định, an toàn để in ra", () => {
    for (const s of ["", "a", "câu hỏi rất dài ".repeat(40)]) {
      expect(stableHash(s)).toMatch(/^[0-9A-Z]{7,}$/);
    }
  });
});
