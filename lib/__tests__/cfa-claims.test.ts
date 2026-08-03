import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { CFA_FORMULAS_DATA } from "@/lib/cfa-formulas-data";
import { CFA_GLOSSARY_TERMS } from "@/lib/cfa-glossary-terms";

/** Chặn một loại lỗi rất dễ tái phát: con số quảng cáo gõ cứng vào giao diện.
 *
 *  Banner trang CFA từng ghi "500+ thuật ngữ" trong khi bộ thẻ có 75, và "100%
 *  công thức thi CFA" trong khi sổ có 98. Không ai cố nói sai - con số được gõ
 *  một lần lúc dựng màn hình, rồi dữ liệu đi tiếp còn chuỗi thì đứng yên. Đó là
 *  loại sai không bao giờ tự lộ ra: không lỗi biên dịch, không test đỏ, và
 *  người đọc thì tin.
 *
 *  Cách chữa duy nhất bền được là đọc số từ dữ liệu. Test này canh việc đó bằng
 *  cách quét chính mã nguồn màn hình - nếu ai gõ lại một con số vào chuỗi thì
 *  đây là chỗ báo. */

const UI_FILES = [
  "components/CfaTrackView.tsx",
  "app/(app)/cfa/formulas/page.tsx",
  "app/(app)/cfa/flashcards/page.tsx",
];

/** Số đi liền với danh từ đếm được, ví dụ "500+ thuật ngữ" hay "120 công thức".
 *  Cố tình KHÔNG bắt "CFA Level 1" hay "10 môn thi" - mười môn là con số của đề
 *  cương chính thức, nó không trôi theo dữ liệu của ta. */
const HARDCODED_COUNT = /\d+\s*\+?\s*(thuật ngữ|công thức|câu hỏi|thẻ)\b/gi;
/** Lời khẳng định bao phủ toàn bộ - không kiểm chứng được và gần như luôn sai. */
const TOTALITY_CLAIM = /(100%|toàn bộ|tất cả|đầy đủ)\s+(công thức|thuật ngữ|câu hỏi)/gi;

describe("con số trên giao diện CFA", () => {
  for (const file of UI_FILES) {
    const source = (() => {
      try {
        // Bỏ ghi chú trước khi soi. Chính lời giải thích về lỗi này có trích
        // lại chuỗi cũ ("100% công thức thi CFA"), và một hàng rào bắt lỗi ở
        // đúng dòng mô tả lỗi thì chỉ dạy người ta xoá ghi chú đi.
        return readFileSync(file, "utf8")
          .replace(/\/\*[\s\S]*?\*\//g, "")
          .replace(/^\s*\/\/.*$/gm, "");
      } catch {
        return null;
      }
    })();

    it(`${file} không gõ cứng số lượng`, () => {
      if (source === null) return; // màn hình có thể chưa tồn tại
      expect(source.match(HARDCODED_COUNT) ?? []).toEqual([]);
    });

    it(`${file} không khẳng định bao phủ toàn bộ`, () => {
      if (source === null) return;
      expect(source.match(TOTALITY_CLAIM) ?? []).toEqual([]);
    });
  }

  it("dữ liệu thật vẫn còn đủ để banner có gì mà hiện", () => {
    // Không phải kiểm số đẹp - chỉ chặn trường hợp một lần refactor làm rỗng
    // mảng và banner lặng lẽ hiện "0 thuật ngữ".
    expect(CFA_GLOSSARY_TERMS.length).toBeGreaterThan(50);
    expect(CFA_FORMULAS_DATA.length).toBeGreaterThan(50);
  });
});
