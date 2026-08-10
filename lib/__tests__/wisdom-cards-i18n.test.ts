import { describe, it, expect } from "vitest";
import { WISDOM_CARDS, WISDOM_TONE_CARDS } from "@/lib/wisdom-cards";
import { wisdomCardsVi, wisdomCardsEn } from "@/lib/i18n/dictionaries/sections/wisdom-cards";

const DIACRITICS =
  /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;
const ALL = [...WISDOM_CARDS, ...WISDOM_TONE_CARDS];

describe("bản dịch thẻ trí tuệ", () => {
  it("mọi thẻ đều có bản Việt khớp từng chữ", () => {
    for (const card of ALL) {
      expect(wisdomCardsVi.wisdomCards[card.id], `thiếu ${card.id}`).toBe(card.text);
    }
  });

  it("mọi thẻ đều có bản Anh không còn dấu tiếng Việt", () => {
    for (const card of ALL) {
      const en = wisdomCardsEn.wisdomCards[card.id];
      expect(en, `${card.id} thiếu bản Anh`).toBeTruthy();
      expect(DIACRITICS.test(en), `${card.id}: "${en}"`).toBe(false);
    }
  });

  it("không có khoá thừa", () => {
    const ids = new Set(ALL.map((c) => c.id));
    expect(Object.keys(wisdomCardsVi.wisdomCards).filter((k) => !ids.has(k))).toEqual([]);
    expect(Object.keys(wisdomCardsEn.wisdomCards).filter((k) => !ids.has(k))).toEqual([]);
  });
});
