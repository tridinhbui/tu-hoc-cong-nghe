import { describe, it, expect } from "vitest";
import {
  GAMES,
  GAME_DIFFICULTIES,
  SPECIAL_GAMES,
  STATEMENT_LABELS,
  getBucketConfig,
  getPairConfig,
  getGameTitle,
  type GameType,
} from "@/lib/games";
import { gamesEn } from "@/lib/games-i18n/en";
import {
  localizeBucketConfig,
  localizeGames,
  localizePairConfig,
  localizeSpecialGames,
  localizeDifficulties,
  localizeGameTitle,
} from "@/lib/games-i18n";

const DIACRITICS =
  /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

describe("bản dịch phần vỏ của games.ts", () => {
  it("mọi trò, trò đặc biệt và mức độ khó đều có bản Anh", () => {
    expect(GAMES.filter((g) => !gamesEn.games[g.id]).map((g) => g.id)).toEqual([]);
    expect(SPECIAL_GAMES.filter((g) => !gamesEn.special[g.id]).map((g) => g.id)).toEqual([]);
    expect(GAME_DIFFICULTIES.filter((d) => !gamesEn.difficulties[d.id]).map((d) => d.id)).toEqual([]);
    expect(Object.keys(STATEMENT_LABELS).filter((k) => !gamesEn.statementLabels[k])).toEqual([]);
  });

  it("không có khoá thừa - id phải tồn tại trong bản gốc", () => {
    const ids = new Set<string>(GAMES.map((g) => g.id));
    expect(Object.keys(gamesEn.games).filter((k) => !ids.has(k))).toEqual([]);
    expect(Object.keys(gamesEn.titles).filter((k) => !ids.has(k))).toEqual([]);
  });

  it("mọi chuỗi đã dịch đều không còn dấu tiếng Việt", () => {
    const walk = (value: unknown, path: string): string[] => {
      if (typeof value === "string") return DIACRITICS.test(value) ? [`${path}: "${value}"`] : [];
      if (Array.isArray(value)) return value.flatMap((v, i) => walk(v, `${path}[${i}]`));
      if (value && typeof value === "object") {
        return Object.entries(value).flatMap(([k, v]) => walk(v, `${path}.${k}`));
      }
      return [];
    };
    expect(walk(gamesEn, "gamesEn")).toEqual([]);
  });

  it("im lặng hoàn toàn ở tiếng Việt", () => {
    expect(localizeGames(GAMES, "vi")).toBe(GAMES);
    expect(localizeSpecialGames(SPECIAL_GAMES, "vi")).toBe(SPECIAL_GAMES);
    expect(localizeDifficulties(GAME_DIFFICULTIES, "vi")).toBe(GAME_DIFFICULTIES);
  });

  it("dịch nhãn nhóm theo ID chứ không theo vị trí", () => {
    // Tra theo vị trí sẽ dán "Low risk" lên nhóm rủi ro cao ngay khi ai đó đảo
    // thứ tự nhóm trong games.ts, và không có gì báo.
    const vi = getBucketConfig("risk-category");
    const en = localizeBucketConfig(vi, "risk-category", "en");
    expect(en.buckets.map((b) => b.id)).toEqual(vi.buckets.map((b) => b.id));
    const byId = Object.fromEntries(en.buckets.map((b) => [b.id, b.label]));
    expect(byId.low).toBe("Low risk");
    expect(byId.high).toBe("High risk");
  });

  it("giữ nguyên items của trò xếp nhóm - đó là đề bài, không phải nhãn", () => {
    const vi = getBucketConfig("cost-category");
    const en = localizeBucketConfig(vi, "cost-category", "en");
    expect(en.items).toBe(vi.items);
  });

  // ĐÂY LÀ BÀI KIỂM QUAN TRỌNG NHẤT CỦA TỆP NÀY.
  //
  // `en-vi-terms` ghép thuật ngữ tiếng Việt với thuật ngữ tiếng Anh, và pool
  // của nó dựng thẳng từ FINANCE_GLOSSARY. Dịch vế trái sang tiếng Anh thì hai
  // cột cùng một thứ tiếng và trò chơi không còn gì để ghép - hỏng hoàn toàn
  // mà không có lỗi nào, chỉ là một màn hình vô nghĩa.
  it("KHÔNG bao giờ dịch pool ghép cặp", () => {
    for (const gameType of ["en-vi-terms", "term-definition", "formula-match", "ticker-match", "random-mix"] as GameType[]) {
      const vi = getPairConfig(gameType);
      const en = localizePairConfig(vi, gameType, "en");
      expect(en.pool, `${gameType}: pool bị đụng tới`).toBe(vi.pool);
    }
  });

  it("nhãn hai cột của en-vi-terms vẫn nói đúng bên nào là ngôn ngữ nào", () => {
    const en = localizePairConfig(getPairConfig("en-vi-terms"), "en-vi-terms", "en");
    expect(en.leftLabel).toBe("Vietnamese");
    expect(en.rightLabel).toBe("English");
  });

  it("danh hiệu xếp hạng dịch đúng thứ hạng và giữ null ở hạng 4+", () => {
    expect(localizeGameTitle(getGameTitle("term-definition", 1), "term-definition", 1, "en")).toBe(
      "Living Dictionary"
    );
    expect(localizeGameTitle(getGameTitle("term-definition", 4), "term-definition", 4, "en")).toBeNull();
  });
});
