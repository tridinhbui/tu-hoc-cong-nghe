import { describe, it, expect } from "vitest";
import { GAMES, SPECIAL_GAMES, GAME_DIFFICULTIES, STATEMENT_LABELS } from "@/lib/games";
import { gamesMetaVi, gamesMetaEn } from "@/lib/i18n/dictionaries/sections/games-meta";

const DIACRITICS =
  /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

// `SPECIAL_GAMES` có 8 id trong kiểu nhưng chỉ 3 mục có chữ; ba game còn lại
// (world boss, PvP, VN30 sim) dựng chữ ở nơi khác. Bộ kiểm chỉ đòi những mục
// THỰC SỰ có trong mảng, nên thêm một game đặc biệt mới sẽ làm đỏ build.
const WITH_COPY = [...GAMES, ...SPECIAL_GAMES];

describe("bản dịch phần chữ màn chọn game", () => {
  it("mọi game đều có bản Việt khớp từng chữ", () => {
    for (const game of WITH_COPY) {
      const vi = gamesMetaVi.gameMeta[game.id];
      expect(vi, `thiếu ${game.id}`).toBeTruthy();
      expect(vi.title).toBe(game.title);
      expect(vi.description).toBe(game.description);
    }
  });

  it("mọi game đều có bản Anh không còn dấu tiếng Việt", () => {
    for (const game of WITH_COPY) {
      const en = gamesMetaEn.gameMeta[game.id];
      expect(en, `${game.id} thiếu bản Anh`).toBeTruthy();
      expect(DIACRITICS.test(en.title), `${game.id}: "${en.title}"`).toBe(false);
      expect(DIACRITICS.test(en.description), `${game.id}: "${en.description}"`).toBe(false);
    }
  });

  it("ba mức độ khó và ba nhãn báo cáo cũng vậy", () => {
    for (const d of GAME_DIFFICULTIES) {
      expect(gamesMetaVi.gameDifficulties[d.id].label).toBe(d.label);
      expect(gamesMetaVi.gameDifficulties[d.id].hint).toBe(d.hint);
      expect(DIACRITICS.test(gamesMetaEn.gameDifficulties[d.id].label)).toBe(false);
      expect(DIACRITICS.test(gamesMetaEn.gameDifficulties[d.id].hint)).toBe(false);
    }
    for (const [bucket, label] of Object.entries(STATEMENT_LABELS)) {
      expect(gamesMetaVi.statementBuckets[bucket]).toBe(label);
      expect(DIACRITICS.test(gamesMetaEn.statementBuckets[bucket])).toBe(false);
    }
  });

  it("không có khoá thừa", () => {
    const ids = new Set(WITH_COPY.map((g) => g.id));
    expect(Object.keys(gamesMetaVi.gameMeta).filter((k) => !ids.has(k as never))).toEqual([]);
    expect(Object.keys(gamesMetaEn.gameMeta).filter((k) => !ids.has(k as never))).toEqual([]);
  });
});
