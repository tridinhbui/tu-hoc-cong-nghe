import { describe, expect, it } from "vitest";
import { INITIAL_VN30_STOCKS, MARKET_NEWS_POOL } from "@/lib/vn30-stock-data";
import { vn30En } from "@/lib/vn30-stock-data-i18n/en";
import { mergeVn30Stocks, mergeVn30News } from "@/lib/vn30-stock-data-i18n";

/** Cổng đủ-100% cho bản dịch VN30, và cổng toàn vẹn của KHOÁ GHÉP.
 *
 *  Phần thứ hai là phần thật sự đáng có. `lib/market-sim.ts` chạy
 *  `news.affectedSectors.includes(stock.sector)` - một phép so chuỗi thuần - nên
 *  một ngành dịch lệch giữa hai bể làm mọi tin thị trường mất tác dụng: không
 *  lỗi, không cảnh báo, giá cổ phiếu chỉ đi ngẫu nhiên và trò mô phỏng nghèo đi.
 *  Không có bộ kiểm nào khác trong repo thấy được chuyện đó.
 *
 *  Phép kiểm chạy trên MỌI ngôn ngữ, kể cả tiếng Việt, vì cùng một lỗi có thể
 *  xảy ra ở tệp gốc khi ai đó sửa tên một ngành ở một chỗ. */

const LOCALES = ["vi", "en"] as const;
const VN = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;

describe("khoá ghép ngành còn nguyên ở mọi ngôn ngữ", () => {
  for (const locale of LOCALES) {
    it(`${locale}: mọi affectedSectors đều khớp một ngành có thật`, () => {
      const stocks = mergeVn30Stocks(INITIAL_VN30_STOCKS, locale);
      const news = mergeVn30News(MARKET_NEWS_POOL, locale);
      const sectors = new Set(stocks.map((s) => s.sector));
      const orphans = news.flatMap((n) =>
        n.affectedSectors.filter((s) => !sectors.has(s)).map((s) => `${s} <- ${n.headline}`)
      );
      expect(orphans).toEqual([]);
    });

    it(`${locale}: số ngành không đổi sau khi dịch`, () => {
      // Hai ngành khác nhau dịch trùng thành một chuỗi sẽ gộp chúng lại, và một
      // tin nhắm vào ngành này sẽ tác động cả sang ngành kia.
      const translated = new Set(mergeVn30Stocks(INITIAL_VN30_STOCKS, locale).map((s) => s.sector));
      expect(translated.size).toBe(new Set(INITIAL_VN30_STOCKS.map((s) => s.sector)).size);
    });
  }

  it("tin thị trường vẫn tác động đúng số cổ phiếu như bản tiếng Việt", () => {
    // Phép kiểm cuối và là phép kiểm chặt nhất: đếm số cổ phiếu bị ảnh hưởng bởi
    // từng tin, ở hai ngôn ngữ, và hai dãy số phải bằng nhau. Nếu một ngành dịch
    // sai thì con số của tin đó tụt xuống 0 trong khi mọi phép kiểm khác vẫn
    // xanh.
    const count = (locale: (typeof LOCALES)[number]) => {
      const stocks = mergeVn30Stocks(INITIAL_VN30_STOCKS, locale);
      return mergeVn30News(MARKET_NEWS_POOL, locale).map(
        (n) => stocks.filter((s) => n.affectedSectors.includes(s.sector)).length
      );
    };
    expect(count("en")).toEqual(count("vi"));
    // Và không tin nào được ảnh hưởng 0 cổ phiếu - một tin như vậy là tin chết.
    expect(count("vi").filter((n) => n === 0)).toEqual([]);
  });
});

describe("bản dịch đủ", () => {
  it("đủ 18 ngành, không thừa ngành nào", () => {
    const source = new Set(INITIAL_VN30_STOCKS.map((s) => s.sector));
    expect(Object.keys(vn30En.sectors).filter((s) => !source.has(s))).toEqual([]);
    expect([...source].filter((s) => !vn30En.sectors[s])).toEqual([]);
  });

  it("mọi cổ phiếu có tên và mô tả", () => {
    const missing = INITIAL_VN30_STOCKS.filter(
      (s) => !vn30En.stocks[s.ticker]?.name || !vn30En.stocks[s.ticker]?.description
    ).map((s) => s.ticker);
    expect(missing).toEqual([]);
  });

  it("không có bản dịch mồ côi theo ticker", () => {
    const tickers = new Set(INITIAL_VN30_STOCKS.map((s) => s.ticker));
    expect(Object.keys(vn30En.stocks).filter((k) => !tickers.has(k))).toEqual([]);
  });

  it("mọi tin có tiêu đề và lời giải thích, và đúng số lượng", () => {
    expect(vn30En.news).toHaveLength(MARKET_NEWS_POOL.length);
    for (const [i, n] of vn30En.news.entries()) {
      expect(n.headline, `news[${i}]`).toBeTruthy();
      expect(n.explanation, `news[${i}]`).toBeTruthy();
    }
  });
});

describe("bản tiếng Anh thật sự là tiếng Anh", () => {
  it("không còn dấu tiếng Việt, trừ tên riêng đã ghi tên", () => {
    // Ba tên riêng cố ý giữ dấu: chúng là thương hiệu, và viết "Thế Giới Di
    // Động" không dấu là một cái tên khác. Danh sách này phải ngắn và phải có
    // tên - nếu dài ra thì đó là bản dịch chưa xong đang trốn sau một ngoại lệ.
    const ALLOWED = ["Thế Giới Di Động", "Bách Hóa Xanh", "Bia Sài Gòn", "Lộc Phát"];
    const offenders: string[] = [];
    const walk = (node: unknown, path: string) => {
      if (typeof node === "string") {
        const stripped = ALLOWED.reduce((acc, name) => acc.split(name).join(""), node);
        if (VN.test(stripped)) offenders.push(`${path}: ${node}`);
        return;
      }
      if (Array.isArray(node)) return node.forEach((v, i) => walk(v, `${path}[${i}]`));
      if (node && typeof node === "object")
        for (const [k, v] of Object.entries(node)) walk(v, `${path}.${k}`);
    };
    // Khoá của `sectors` là chuỗi tiếng Việt gốc, nên chỉ soát GIÁ TRỊ.
    walk(Object.values(vn30En.sectors), "sectors");
    walk(vn30En.stocks, "stocks");
    walk(vn30En.news, "news");
    expect(offenders).toEqual([]);
  });

  it("mã niêm yết không bao giờ bị dịch", () => {
    const merged = mergeVn30Stocks(INITIAL_VN30_STOCKS, "en");
    expect(merged.map((s) => s.ticker)).toEqual(INITIAL_VN30_STOCKS.map((s) => s.ticker));
  });

  it("số liệu đi qua nguyên vẹn", () => {
    // Lớp phủ chỉ được chạm vào chữ. Một giá hay một tỷ lệ cổ tức bị đổi ở đây
    // sẽ làm hai ngôn ngữ chơi ra hai kết quả khác nhau.
    const merged = mergeVn30Stocks(INITIAL_VN30_STOCKS, "en");
    merged.forEach((s, i) => {
      const src = INITIAL_VN30_STOCKS[i];
      expect([s.basePrice, s.currentPrice, s.previousPrice, s.dividendYield, s.volatility]).toEqual([
        src.basePrice,
        src.currentPrice,
        src.previousPrice,
        src.dividendYield,
        src.volatility,
      ]);
    });
    expect(mergeVn30News(MARKET_NEWS_POOL, "en").map((n) => n.impactMultiplier)).toEqual(
      MARKET_NEWS_POOL.map((n) => n.impactMultiplier)
    );
  });

  it("locale vi trả về đúng bể gốc", () => {
    expect(mergeVn30Stocks(INITIAL_VN30_STOCKS, "vi")).toBe(INITIAL_VN30_STOCKS);
    expect(mergeVn30News(MARKET_NEWS_POOL, "vi")).toBe(MARKET_NEWS_POOL);
  });
});
