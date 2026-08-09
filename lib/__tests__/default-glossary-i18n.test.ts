import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { VIETNAMESE_DIACRITICS } from "./vietnamese-diacritics";
import { DEFAULT_FINANCIAL_GLOSSARY } from "@/lib/supabase-flashcards";
import { defaultGlossaryEn } from "@/lib/supabase-flashcards-i18n/en";
import { localizedDefaultGlossary } from "@/lib/supabase-flashcards-i18n";

/** Cổng đủ-100% cho bộ thẻ mặc định, và cổng CHỐNG TRÙNG khi đổi ngôn ngữ.
 *
 *  Đây là kho thứ hai trong repo mà `term` vừa là chữ hiển thị vừa là khoá của
 *  dữ liệu ĐÃ LƯU, và đường ghi ở đây khác đường của album thẻ:
 *  `saveFlashcard` upsert theo `(user_id, term)`, nên nạp lại cùng một thẻ chỉ
 *  cập nhật hàng cũ - nhưng một `term` đã dịch là khoá KHÁC, nên nó tạo hàng
 *  mới. Người bấm "nạp bộ mẫu" ở hai ngôn ngữ sẽ có 16 thẻ trùng nội dung. */

const VN = VIETNAMESE_DIACRITICS;
const CLIENT = readFileSync(
  new URL("../../components/flashcard/FlashcardClient.tsx", import.meta.url),
  "utf-8"
);

describe("bản dịch đủ", () => {
  it("mọi thẻ mặc định đều có bản tiếng Anh", () => {
    const missing = DEFAULT_FINANCIAL_GLOSSARY.filter((c) => !defaultGlossaryEn[c.term]).map(
      (c) => c.term
    );
    expect(missing).toEqual([]);
  });

  it("không có bản dịch mồ côi", () => {
    // Sửa một chữ trong tên tiếng Việt là làm mồ côi khoá ở đây, và thẻ đó âm
    // thầm quay về tiếng Việt trong bản tiếng Anh.
    const terms = new Set(DEFAULT_FINANCIAL_GLOSSARY.map((c) => c.term));
    expect(Object.keys(defaultGlossaryEn).filter((k) => !terms.has(k))).toEqual([]);
  });

  it("bản tiếng Anh không còn dấu tiếng Việt", () => {
    for (const card of localizedDefaultGlossary("en")) {
      expect(VN.test(card.term), card.term).toBe(false);
      expect(VN.test(card.definition), card.term).toBe(false);
    }
  });

  it("locale vi trả về đúng bộ gốc, không thêm alsoKnownAs", () => {
    const vi = localizedDefaultGlossary("vi");
    expect(vi.map((c) => c.term)).toEqual(DEFAULT_FINANCIAL_GLOSSARY.map((c) => c.term));
    expect(vi.every((c) => c.alsoKnownAs === undefined)).toBe(true);
  });
});

describe("chống trùng khi người học đổi ngôn ngữ", () => {
  it("thẻ đổi tên đều mang theo tên tiếng Việt", () => {
    for (const card of localizedDefaultGlossary("en")) {
      const original = DEFAULT_FINANCIAL_GLOSSARY.find(
        (c) => defaultGlossaryEn[c.term]?.term === card.term
      );
      if (original && original.term !== card.term) {
        expect(card.alsoKnownAs, card.term).toContain(original.term);
      }
    }
  });

  it("thẻ KHÔNG đổi tên thì không mang alsoKnownAs rỗng nghĩa", () => {
    // WACC và NPV vốn đã là tiếng Anh, nên tên giữ nguyên và không có gì để
    // ghi vào alsoKnownAs.
    for (const card of localizedDefaultGlossary("en")) {
      const unchanged = DEFAULT_FINANCIAL_GLOSSARY.some((c) => c.term === card.term);
      if (unchanged) expect(card.alsoKnownAs, card.term).toBeUndefined();
    }
  });

  it("nạp tiếng Việt rồi nạp lại tiếng Anh KHÔNG thêm thẻ nào", () => {
    // Dựng lại đúng luật của saveFlashcardsBulk.
    const stored = new Set(localizedDefaultGlossary("vi").map((c) => c.term));
    const isNew = (c: { term: string; alsoKnownAs?: string[] }) =>
      !stored.has(c.term) && !(c.alsoKnownAs ?? []).some((a) => stored.has(a));
    expect(localizedDefaultGlossary("en").filter(isNew).map((c) => c.term)).toEqual([]);
  });
});

describe("đường nạp phải là bản bulk", () => {
  it("bootstrap gọi saveFlashcardsBulk, không lặp saveFlashcard", () => {
    // `saveFlashcard` upsert theo (user_id, term) nên nó KHÔNG biết gì về
    // alsoKnownAs. Quay lại vòng lặp cũ là mở lại đúng lỗi trùng thẻ, và không
    // phép kiểm nào khác thấy - cả hai đường đều lưu thành công.
    // Regex chứ không phải chuỗi nguyên: bám vào đúng dấu xuống dòng thì một
    // lần chạy trình định dạng là đỏ vô cớ, và người sau sẽ học cách bỏ qua nó.
    expect(CLIENT).toMatch(/saveFlashcardsBulk\(\s*userId,\s*localizedDefaultGlossary\(locale\)\s*\)/);
    expect(CLIENT).not.toContain("for (const item of DEFAULT_FINANCIAL_GLOSSARY)");
  });

  it("bộ thẻ nạp vào theo NGÔN NGỮ đang dùng, không cứng tiếng Việt", () => {
    expect(CLIENT).toContain("localizedDefaultGlossary(locale)");
  });
});
