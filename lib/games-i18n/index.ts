import type { Locale } from "@/lib/i18n";
import type {
  BucketConfig,
  GameDifficulty,
  GameMeta,
  GameType,
  PairConfig,
  SpecialGameMeta,
  StatementBucket,
} from "@/lib/games";
import { FINANCE_GLOSSARY } from "@/lib/finance-glossary";
import { gamesEn } from "./en";

/**
 * Lớp phủ dịch cho phần vỏ của lib/games.ts.
 *
 * KHÁC lib/frm-formulas-i18n và lib/cfa-formulas-i18n ở một điểm, và đó là lý
 * do nó không chép lại được khuôn của hai file kia: hai kho công thức là MỘT
 * mảng, một hình dạng, khoá theo `id`. `games.ts` có bảy cấu trúc khác nhau -
 * danh sách trò, danh sách độ khó, cấu hình nhóm, cấu hình ghép cặp, nhãn báo
 * cáo, danh hiệu xếp hạng - mỗi cái khoá một kiểu. Nên lớp phủ này là một
 * object nhiều nhánh chứ không phải một Record phẳng.
 *
 * Giữ nguyên nguyên tắc quan trọng nhất của hai file kia: bản dịch là LỚP PHỦ,
 * mọi thứ cấu trúc (`id`, `mechanic`, `accent`, `emoji`, `bucket` của từng
 * khoản mục) đọc từ phía tiếng Việt và không được ghi đè. Thiếu một khoá thì
 * rơi về tiếng Việt chứ không rơi về rỗng.
 *
 * PHẦN KHÔNG DỊCH được ghi ở đầu ./en.ts, và nó là ràng buộc chứ không phải
 * phạm vi: pool của `en-vi-terms` chính là đề bài của trò đó.
 */
export interface GamesTranslation {
  special: Record<string, { title: string; description: string }>;
  difficulties: Record<string, { label: string; hint: string }>;
  games: Record<string, { title: string; description: string }>;
  statementLabels: Record<string, string>;
  buckets: Record<string, { sourceHint: string; labels?: Record<string, string> }>;
  pairs: Record<string, { leftLabel: string; rightLabel: string; hint: string }>;
  titles: Record<string, [string, string, string]>;
  combinedTitles: [string, string, string];
  /**
   * Nội dung chơi, khoá theo chuỗi tiếng Việt: khoản mục kéo-thả và hai vế
   * của các cặp ghép DỊCH ĐƯỢC. Xem chú thích ở en.ts về việc chọn pool.
   */
  content: Record<string, string>;
}

const BY_LOCALE: Record<string, GamesTranslation> = { en: gamesEn };

/** Ba pool duy nhất được phép dịch. Xem localizePool. */
const TRANSLATABLE_POOLS = new Set<GameType>([
  "term-definition",
  "formula-match",
  "random-mix",
]);

function packFor(locale: Locale): GamesTranslation | null {
  return locale === "vi" ? null : BY_LOCALE[locale] ?? null;
}

export function localizeGames(games: GameMeta[], locale: Locale): GameMeta[] {
  const pack = packFor(locale);
  if (!pack) return games;
  return games.map((g) => {
    const patch = pack.games[g.id];
    return patch ? { ...g, title: patch.title, description: patch.description } : g;
  });
}

export function localizeGameMeta(meta: GameMeta, locale: Locale): GameMeta {
  const pack = packFor(locale);
  const patch = pack?.games[meta.id];
  return patch ? { ...meta, title: patch.title, description: patch.description } : meta;
}

export function localizeSpecialGames(
  games: SpecialGameMeta[],
  locale: Locale
): SpecialGameMeta[] {
  const pack = packFor(locale);
  if (!pack) return games;
  return games.map((g) => {
    const patch = pack.special[g.id];
    return patch ? { ...g, title: patch.title, description: patch.description } : g;
  });
}

export function localizeDifficulties<T extends { id: GameDifficulty; label: string; hint: string }>(
  list: T[],
  locale: Locale
): T[] {
  const pack = packFor(locale);
  if (!pack) return list;
  return list.map((d) => {
    const patch = pack.difficulties[d.id];
    return patch ? { ...d, label: patch.label, hint: patch.hint } : d;
  });
}

export function localizeStatementLabel(
  bucket: StatementBucket,
  viLabel: string,
  locale: Locale
): string {
  return packFor(locale)?.statementLabels[bucket] ?? viLabel;
}

export function localizeBucketConfig(
  config: BucketConfig,
  gameType: GameType,
  locale: Locale
): BucketConfig {
  const pack = packFor(locale);
  if (!pack) return config;
  const patch = pack.buckets[gameType];
  if (!patch) return config;
  return {
    ...config,
    sourceHint: patch.sourceHint,
    // `bucket` của từng khoản mục là ĐÁP ÁN - đọc từ phía tiếng Việt, không
    // bao giờ ghi đè. Chỉ chữ hiện trên thẻ được thay.
    items: config.items.map((it) => ({ ...it, term: pack.content[it.term] ?? it.term })),
    // Nhãn nhóm tra theo `id` của nhóm, không theo vị trí: thứ tự nhóm đổi
    // được mà không ai nhớ sửa bản dịch, và tra theo vị trí sẽ dán nhãn "Rủi
    // ro thấp" lên nhóm rủi ro cao mà không có gì báo.
    buckets: config.buckets.map((b) => ({
      ...b,
      label: patch.labels?.[b.id] ?? pack.statementLabels[b.id] ?? b.label,
    })),
  };
}

export function localizePairConfig(
  config: PairConfig,
  gameType: GameType,
  locale: Locale
): PairConfig {
  const pack = packFor(locale);
  if (!pack) return config;
  // `random-mix` và `en-vi-terms` không có mục riêng trong PAIR_CONFIGS - cái
  // đầu dựng pool trộn, cái sau rơi vào nhánh mặc định của getPairConfig. Ánh
  // xạ ở đây phải khớp đúng ba nhánh đó.
  const patch =
    gameType === "random-mix"
      ? pack.pairs.randomMix
      : pack.pairs[gameType] ?? pack.pairs.fallback;
  const pool = localizePool(config.pool, gameType, pack);
  return {
    ...config,
    pool,
    // `roundSize` đã được getPairConfig tính theo pool TIẾNG VIỆT, mà pool
    // tiếng Anh của `random-mix` ngắn hơn vì các cặp vi↔en bị loại. Kẹp lại
    // ở đây; hiện 32 cặp so với ván lớn nhất là 14 nên chưa chạm, nhưng con
    // số đó là dữ liệu, không phải bất biến.
    roundSize: Math.min(config.roundSize, pool.length),
    leftLabel: patch.leftLabel,
    rightLabel: patch.rightLabel,
    hint: patch.hint,
  };
}

/**
 * Pool nào được dịch, và pool nào phải giữ nguyên tiếng Việt.
 *
 * `en-vi-terms` là ranh giới cứng: đề bài của nó LÀ khoảng cách giữa hai thứ
 * tiếng. Dịch vế trái thì hai cột cùng một thứ tiếng và không còn gì để ghép.
 * `ticker-match` là danh từ riêng.
 *
 * `random-mix` là chỗ dễ hỏng nhất vì nó trộn CẢ BỐN pool vào một, kể cả pool
 * vi↔en. Dịch cả nắm theo chuỗi thì "Thanh khoản" của cặp thuật ngữ - định
 * nghĩa thành "Liquidity", mà "Liquidity" đang là VẾ PHẢI của chính từ đó
 * trong pool vi↔en: người chơi thấy "Liquidity" ở cả hai cột, ghép vào nhau
 * theo phản xạ, và bị chấm sai. Nên với tiếng Anh, các cặp vi↔en bị LOẠI khỏi
 * ván trộn thay vì được dịch - lọc theo chính FINANCE_GLOSSARY chứ không cắt
 * theo vị trí, để việc thêm bớt mục trong từ điển không làm lệch lát cắt.
 */
function localizePool(
  pool: PairConfig["pool"],
  gameType: GameType,
  pack: GamesTranslation
): PairConfig["pool"] {
  // Danh sách CHO PHÉP, không phải danh sách cấm: một trò ghép cặp mới thêm
  // sau này mặc định giữ nguyên tiếng Việt và người thêm phải chủ động mở, chứ
  // không âm thầm được dịch bằng bảng tra chuỗi.
  if (!TRANSLATABLE_POOLS.has(gameType)) return pool;
  const translatable =
    gameType === "random-mix"
      ? pool.filter((p) => FINANCE_GLOSSARY[p.left.toLowerCase()] !== p.right)
      : pool;
  return translatable.map((p) => ({
    left: pack.content[p.left] ?? p.left,
    right: pack.content[p.right] ?? p.right,
  }));
}

export function localizeGameTitle(
  viTitle: string | null,
  gameType: GameType,
  rank: number,
  locale: Locale
): string | null {
  if (viTitle === null) return null;
  const pack = packFor(locale);
  return pack?.titles[gameType]?.[rank - 1] ?? viTitle;
}

export function localizeCombinedGameTitle(
  viTitle: string | null,
  rank: number,
  locale: Locale
): string | null {
  if (viTitle === null) return null;
  return packFor(locale)?.combinedTitles[rank - 1] ?? viTitle;
}
