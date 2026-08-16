import { describe, it, expect } from "vitest";
import {
  CFA_BOOK_SUBJECTS,
  booksForSubject,
  subjectsForBook,
  mappedSubjectIds,
  knownSubjectIds,
} from "@/lib/cfa-library-map";
import { CFA_SUBJECT_ORDER } from "@/lib/cfa-progression";

describe("bảng ánh xạ quyển → môn", () => {
  it("phủ ĐỦ mười môn - thiếu một môn là một môn không có sách nào để mở", () => {
    const mapped = mappedSubjectIds();
    const missing = CFA_SUBJECT_ORDER.filter((id) => !mapped.has(id));
    expect(missing, `môn chưa có quyển nào: ${missing.join(", ")}`).toEqual([]);
  });

  it("không nhắc tới môn nào không tồn tại", () => {
    const known = knownSubjectIds();
    for (const [bookId, subjects] of Object.entries(CFA_BOOK_SUBJECTS)) {
      for (const s of subjects) {
        expect(known.has(s), `${bookId} trỏ tới môn lạ: ${s}`).toBe(true);
      }
    }
  });

  it("mỗi môn thuộc đúng MỘT quyển - trùng nghĩa là gợi ý hai quyển cho một mission", () => {
    for (const id of CFA_SUBJECT_ORDER) {
      expect(booksForSubject(id), `môn ${id}`).toHaveLength(1);
    }
  });

  it("bốn quyển chính, đúng id mà giao diện lọc (`book-*`)", () => {
    const ids = Object.keys(CFA_BOOK_SUBJECTS);
    expect(ids).toHaveLength(4);
    for (const id of ids) expect(id.startsWith("book-")).toBe(true);
  });
});

describe("tra ngược", () => {
  it("quyển 4 phục vụ Ethics, Portfolio và Alternatives", () => {
    expect(subjectsForBook("book-4")).toEqual(["alternatives", "portfolio", "ethics"]);
  });

  it("Ethics trỏ về quyển 4", () => {
    expect(booksForSubject("ethics")).toEqual(["book-4"]);
  });

  it("quyển ngoài bảng trả mảng rỗng, không ném", () => {
    expect(subjectsForBook("schweser-l1-2025-book1")).toEqual([]);
  });

  it("chưa có môn đang học thì không gợi ý quyển nào", () => {
    expect(booksForSubject(null)).toEqual([]);
  });
});
