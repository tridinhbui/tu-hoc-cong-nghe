import { describe, it, expect } from "vitest";
import {
  GAMES,
  GAME_DIFFICULTIES,
  SPECIAL_GAMES,
  STATEMENT_LABELS,
  getBucketConfig,
  getPairConfig,
  pickPairRoundFrom,
  getGameTitle,
  type GameType,
} from "@/lib/games";
import { FINANCE_GLOSSARY } from "@/lib/finance-glossary";
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

  it("dịch chữ trên thẻ nhưng KHÔNG đụng tới `bucket` - bucket là đáp án", () => {
    const vi = getBucketConfig("cost-category");
    const en = localizeBucketConfig(vi, "cost-category", "en");
    expect(en.items.map((i) => i.bucket)).toEqual(vi.items.map((i) => i.bucket));
    const byBucket = Object.fromEntries(en.items.map((i) => [i.term, i.bucket]));
    expect(byBucket["Sales commission"]).toBe("variable");
    expect(byBucket["Premises rent"]).toBe("fixed");
  });

  // ĐÂY LÀ BÀI KIỂM QUAN TRỌNG NHẤT CỦA TỆP NÀY.
  //
  // `en-vi-terms` ghép thuật ngữ tiếng Việt với thuật ngữ tiếng Anh, và pool
  // của nó dựng thẳng từ FINANCE_GLOSSARY. Dịch vế trái sang tiếng Anh thì hai
  // cột cùng một thứ tiếng và trò chơi không còn gì để ghép - hỏng hoàn toàn
  // mà không có lỗi nào, chỉ là một màn hình vô nghĩa. `ticker-match` là danh
  // từ riêng, dịch là sai chứ không phải là thừa.
  it("KHÔNG bao giờ dịch pool của en-vi-terms và ticker-match", () => {
    for (const gameType of ["en-vi-terms", "ticker-match"] as GameType[]) {
      const vi = getPairConfig(gameType);
      const en = localizePairConfig(vi, gameType, "en");
      expect(en.pool, `${gameType}: pool bị đụng tới`).toBe(vi.pool);
    }
  });

  // Mặt kia của cùng ràng buộc đó, và là chỗ dễ hỏng nhất: `random-mix` trộn
  // CẢ pool vi↔en vào ván. Nếu các cặp đó được dịch thay vì bị loại, "Thanh
  // khoản" thành "Liquidity" trong khi "Liquidity" vốn đang là vế phải của
  // chính từ đó - hai thẻ giống hệt nhau ở hai cột, người chơi ghép theo phản
  // xạ và bị chấm sai.
  it("ván trộn tiếng Anh không còn cặp vi↔en nào", () => {
    const en = localizePairConfig(getPairConfig("random-mix"), "random-mix", "en");
    const glossaryPairs = en.pool.filter(
      (p) => FINANCE_GLOSSARY[p.left.toLowerCase()] === p.right
    );
    expect(glossaryPairs).toEqual([]);
    expect(en.roundSize).toBeLessThanOrEqual(en.pool.length);
  });

  // Cùng một chuỗi vừa đứng cột trái vừa đứng cột phải là một ván không giải
  // được: hai thẻ chữ giống hệt nhau, và cái đúng không phải cái người chơi
  // bấm. Bản tiếng Việt không có tình trạng này; bản dịch phải giữ được vậy.
  it("không chuỗi nào vừa là vế trái vừa là vế phải trong cùng một pool", () => {
    for (const gameType of ["term-definition", "formula-match", "random-mix"] as GameType[]) {
      const en = localizePairConfig(getPairConfig(gameType), gameType, "en");
      const rights = new Set(en.pool.map((p) => p.right));
      const clash = en.pool.map((p) => p.left).filter((l) => rights.has(l));
      expect(clash, `${gameType}: chuỗi đứng cả hai cột`).toEqual([]);
    }
  });

  // Một khoản mục mới thêm vào games.ts mà quên thêm bản dịch sẽ hiện tiếng
  // Việt lẫn giữa các thẻ tiếng Anh. Không có gì báo, nên bài kiểm này báo.
  it("mọi chuỗi nội dung chơi đều đã sang tiếng Anh", () => {
    const left: string[] = [];
    for (const gameType of ["financial-statement-match", "ratio-category", "risk-category", "cost-category"] as GameType[]) {
      const en = localizeBucketConfig(getBucketConfig(gameType), gameType, "en");
      left.push(...en.items.map((i) => i.term).filter((t) => DIACRITICS.test(t)));
    }
    // `random-mix` cố tình vắng mặt: pool của nó là hai pool ngay dưới cộng
    // TICKER_PAIRS, mà "Hòa Phát Group" và "Thế Giới Di Động" là TÊN DOANH
    // NGHIỆP - còn dấu tiếng Việt là đúng, không phải sót. Hai pool kia phủ
    // hết phần dịch được của ván trộn nên không có lỗ hổng nào ở đây.
    for (const gameType of ["term-definition", "formula-match"] as GameType[]) {
      const en = localizePairConfig(getPairConfig(gameType), gameType, "en");
      left.push(...en.pool.flatMap((p) => [p.left, p.right]).filter((t) => DIACRITICS.test(t)));
    }
    expect(left).toEqual([]);
  });

  // Một khoá gõ sai trong `content` không bao giờ khớp, nên nó im lặng không
  // làm gì - đúng cái hình dạng mà bài kiểm ngay trên KHÔNG bắt được, vì chuỗi
  // gốc vẫn còn nguyên ở games.ts dưới một cách viết khác.
  it("không khoá `content` nào chết", () => {
    const reachable = new Set<string>();
    for (const gameType of ["financial-statement-match", "ratio-category", "risk-category", "cost-category"] as GameType[]) {
      for (const it of getBucketConfig(gameType).items) reachable.add(it.term);
    }
    for (const gameType of ["term-definition", "formula-match"] as GameType[]) {
      for (const p of getPairConfig(gameType).pool) {
        reachable.add(p.left);
        reachable.add(p.right);
      }
    }
    expect(Object.keys(gamesEn.content).filter((k) => !reachable.has(k))).toEqual([]);
  });

  it("nhãn hai cột của en-vi-terms vẫn nói đúng bên nào là ngôn ngữ nào", () => {
    const en = localizePairConfig(getPairConfig("en-vi-terms"), "en-vi-terms", "en");
    expect(en.leftLabel).toBe("Vietnamese");
    expect(en.rightLabel).toBe("English");
  });

  // Bản dịch pool chỉ có giá trị nếu VÁN CHƠI được rút từ nó. `pickPairRound`
  // tự gọi lại getPairConfig, nên gọi hàm đó thì pool đã dịch bị bỏ qua hoàn
  // toàn và người chơi thấy nhãn cột tiếng Anh trên thẻ bài tiếng Việt.
  it("ván chơi rút từ pool đã dịch, không phải từ pool gốc", () => {
    const en = localizePairConfig(getPairConfig("term-definition", "kho"), "term-definition", "en");
    for (let i = 0; i < 20; i++) {
      const round = pickPairRoundFrom(en);
      expect(round.length).toBeGreaterThan(0);
      const viLeft = round.flatMap((p) => [p.left, p.right]).filter((x) => DIACRITICS.test(x));
      expect(viLeft, "thẻ bài còn tiếng Việt").toEqual([]);
    }
  });

  it("danh hiệu xếp hạng dịch đúng thứ hạng và giữ null ở hạng 4+", () => {
    expect(localizeGameTitle(getGameTitle("term-definition", 1), "term-definition", 1, "en")).toBe(
      "Living Dictionary"
    );
    expect(localizeGameTitle(getGameTitle("term-definition", 4), "term-definition", 4, "en")).toBeNull();
  });
});
