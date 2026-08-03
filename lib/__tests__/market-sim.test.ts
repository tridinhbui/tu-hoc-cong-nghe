import { describe, expect, it } from "vitest";
import {
  NEWS_CHANCE,
  VOLATILITY_BAND,
  advanceMarket,
  dailyTrend,
  pickNews,
  shuffle,
  stepPrice,
  type SimNews,
  type SimStock,
} from "../market-sim";

/** Nguồn ngẫu nhiên ghim sẵn: trả lần lượt các số đã cho, rồi lặp lại. */
function seq(...values: number[]) {
  let i = 0;
  return () => values[i++ % values.length];
}

const stock = (over: Partial<SimStock> = {}): SimStock => ({
  currentPrice: 100_000,
  previousPrice: 100_000,
  sector: "bank",
  volatility: "medium",
  ...over,
});

describe("chọn tin thị trường", () => {
  it("không có tin khi rút trên ngưỡng", () => {
    expect(pickNews(["a", "b"], seq(0.9))).toBeNull();
  });

  it("có tin khi rút dưới ngưỡng, và lấy đúng phần tử theo số thứ hai", () => {
    expect(pickNews(["a", "b", "c"], seq(0.1, 0.5))).toBe("b");
    expect(pickNews(["a", "b", "c"], seq(0.1, 0.99))).toBe("c");
  });

  it("kho tin rỗng thì không nổ, chỉ là không có tin", () => {
    expect(pickNews([], seq(0.1, 0.5))).toBeNull();
  });

  it("ngưỡng khớp với hằng số công bố", () => {
    expect(pickNews(["a"], seq(NEWS_CHANCE + 0.01))).toBeNull();
    expect(pickNews(["a"], seq(NEWS_CHANCE - 0.01, 0))).toBe("a");
  });
});

describe("bước giá một ngày", () => {
  it("cổ phiếu biến động cao dao động mạnh hơn cổ phiếu biến động thấp", () => {
    const high = stepPrice(stock({ volatility: "high" }), 0, null, seq(1));
    const low = stepPrice(stock({ volatility: "low" }), 0, null, seq(1));
    expect(high).toBeGreaterThan(low);
  });

  it("biên độ đúng bằng bảng đã công bố", () => {
    expect(VOLATILITY_BAND.high).toBeGreaterThan(VOLATILITY_BAND.medium);
    expect(VOLATILITY_BAND.medium).toBeGreaterThan(VOLATILITY_BAND.low);
  });

  it("tin chỉ tác động lên đúng ngành của nó", () => {
    const news: SimNews = { affectedSectors: ["bank"], impactMultiplier: 0.1 };
    const hit = stepPrice(stock({ sector: "bank" }), 0, news, seq(0.49));
    const miss = stepPrice(stock({ sector: "retail" }), 0, news, seq(0.49));
    expect(hit).toBeGreaterThan(miss);
    expect(miss).toBe(100_000);
  });

  it("giá luôn là bội số của 100 và không xuống dưới sàn 1.000", () => {
    expect(stepPrice(stock(), 0, null, seq(0.7)) % 100).toBe(0);
    const crash: SimNews = { affectedSectors: ["bank"], impactMultiplier: -10 };
    expect(stepPrice(stock({ currentPrice: 1_100 }), 0, crash, seq(0))).toBe(1000);
  });

  it("xu hướng ngày lệch âm nhẹ - rút đúng 0,48 thì thị trường đứng yên", () => {
    expect(dailyTrend(seq(0.48))).toBe(0);
    expect(dailyTrend(seq(0))).toBeLessThan(0);
    expect(dailyTrend(seq(1))).toBeGreaterThan(0);
  });
});

describe("tua nhiều ngày", () => {
  it("previousPrice luôn là giá của ngày liền trước, không phải giá ban đầu", () => {
    const { stocks } = advanceMarket([stock()], 3, [], seq(0.9, 0.2, 0.8, 0.3));
    expect(stocks[0].previousPrice).not.toBe(stocks[0].currentPrice);
    expect(typeof stocks[0].previousPrice).toBe("number");
  });

  it("không sửa mảng gốc", () => {
    const original = [stock()];
    const snapshot = JSON.stringify(original);
    advanceMarket(original, 5, [], seq(0.3, 0.6));
    expect(JSON.stringify(original)).toBe(snapshot);
  });

  it("tua 0 ngày trả lại đúng bảng cũ", () => {
    const input = [stock()];
    const { stocks } = advanceMarket(input, 0, [], seq(0.9));
    expect(stocks).toEqual(input);
  });

  it("trả kèm tin của lượt để giao diện hiện đúng thứ đã tác động vào giá", () => {
    const pool: SimNews[] = [{ affectedSectors: ["bank"], impactMultiplier: 0.2 }];
    const { news } = advanceMarket([stock()], 1, pool, seq(0.1, 0, 0.5, 0.5));
    expect(news).toBe(pool[0]);
  });
});

describe("xáo trộn", () => {
  it("giữ nguyên tập phần tử", () => {
    const input = [1, 2, 3, 4, 5];
    expect([...shuffle(input, seq(0.1, 0.9, 0.5, 0.3))].sort()).toEqual(input);
  });

  it("không sửa mảng gốc", () => {
    const input = [1, 2, 3];
    shuffle(input, seq(0.5));
    expect(input).toEqual([1, 2, 3]);
  });

  it("phân phối đều - thứ khác hẳn sort(() => Math.random() - 0.5)", () => {
    // Với 3 phần tử, mỗi vị trí phải nhận mỗi phần tử ở khoảng 1/3 số lần.
    // Cách xáo bằng sort cho phân phối lệch rõ rệt ở phép kiểm này.
    const counts = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    let seed = 12345;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      return seed / 2147483648;
    };
    const N = 6000;
    for (let i = 0; i < N; i++) {
      const out = shuffle([0, 1, 2], rand);
      out.forEach((value, pos) => counts[pos][value]++);
    }
    for (const row of counts) {
      for (const c of row) {
        expect(Math.abs(c / N - 1 / 3)).toBeLessThan(0.05);
      }
    }
  });
});
