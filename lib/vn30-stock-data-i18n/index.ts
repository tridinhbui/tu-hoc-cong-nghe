import type { Locale } from "@/lib/i18n";
import { mergePositional, overlayFor } from "@/lib/i18n/overlay";
import type { StockItem, MarketNewsEvent } from "@/lib/vn30-stock-data";
import { vn30En } from "./en";

/**
 * Bản dịch danh sách VN30 và bể tin thị trường trong lib/vn30-stock-data.ts.
 *
 * ĐIỀU QUAN TRỌNG NHẤT Ở TỆP NÀY: `sector` KHÔNG chỉ là chữ hiển thị, nó là
 * KHOÁ GHÉP. `lib/market-sim.ts` chạy `news.affectedSectors.includes(stock.sector)`
 * - một phép so chuỗi thuần. Dịch một bên mà không dịch bên kia thì mọi tin thị
 * trường mất tác dụng: không lỗi, không cảnh báo, giá cổ phiếu chỉ đi ngẫu nhiên
 * và trò mô phỏng nghèo đi mà không ai biết vì sao.
 *
 * Nên bản dịch KHÔNG ghi ngành theo từng cổ phiếu. Nó có đúng MỘT bảng
 * `sectors` (tiếng Việt -> tiếng Anh), và `mergeVn30` cho cả hai phía đi qua
 * đúng bảng ấy. Một ngành thiếu bản dịch thì cả hai phía giữ nguyên tiếng Việt,
 * nên hai bên không bao giờ lệch nhau được - đó là tính chất có được từ cấu
 * trúc, không phải từ việc người dịch cẩn thận.
 *
 * `ticker` không bao giờ dịch: nó là mã niêm yết, và widget dùng nó làm khoá.
 */

export interface Vn30Translation {
  /** Tiếng Việt -> tiếng Anh. Dùng cho CẢ `stock.sector` và `news.affectedSectors`. */
  sectors: Record<string, string>;
  /** Khoá theo `ticker`. */
  stocks: Record<string, { name?: string; description?: string }>;
  /** THEO VỊ TRÍ, khớp MARKET_NEWS_POOL. */
  news: { headline?: string; explanation?: string }[];
}

const BY_LOCALE: Record<string, Vn30Translation> = { en: vn30En };

const patchFor = (locale: Locale) => overlayFor(BY_LOCALE, locale);

export function mergeVn30Stocks(stocks: readonly StockItem[], locale: Locale): StockItem[] {
  const patch = patchFor(locale);
  if (!patch) return stocks as StockItem[];
  return stocks.map((stock) => {
    const entry = patch.stocks[stock.ticker];
    return {
      ...stock,
      name: entry?.name ?? stock.name,
      description: entry?.description ?? stock.description,
      sector: patch.sectors[stock.sector] ?? stock.sector,
    };
  });
}

export function mergeVn30News(
  pool: readonly MarketNewsEvent[],
  locale: Locale
): MarketNewsEvent[] {
  const patch = patchFor(locale);
  if (!patch) return pool as MarketNewsEvent[];
  // Chữ của tin ghép THEO VỊ TRÍ, nên lệch độ dài là bỏ nguyên phần dịch chữ -
  // ghép lệch sẽ gán lời giải thích của tin này cho tiêu đề của tin khác.
  // `affectedSectors` thì KHÁC: nó không theo vị trí, nó đi qua cùng bảng
  // `sectors` với stock.sector, và đó là dòng giữ cho phép ghép của market-sim
  // còn đúng - nên nó nằm ngoài bộ chắn độ dài.
  const translatedText = mergePositional(pool, patch.news, (news, t) => ({
    ...news,
    headline: t.headline ?? news.headline,
    explanation: t.explanation ?? news.explanation,
  }));
  return (translatedText ?? pool).map((news) => ({
    ...news,
    affectedSectors: news.affectedSectors.map((s) => patch.sectors[s] ?? s),
  }));
}
