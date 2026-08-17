// Bước giá của sàn giả lập trong TechGuildWidget.
//
// Tách khỏi component vì hai lý do, và lý do thứ hai mới là lý do thật:
//
//  1. React Compiler đọc mọi hàm khai trong thân component như thể nó có thể
//     chạy lúc render, nên `Math.random()` ở đó bị chặn - dù thực tế nó chỉ
//     được gọi từ onClick. Đưa ra ngoài module là cách nói với trình biên
//     dịch điều mà con người vốn đã biết.
//  2. Đây là toàn bộ logic thị trường mà người học nhìn thấy - biên độ biến
//     động theo nhóm cổ phiếu, độ lệch âm nhẹ của xu hướng ngày, tác động
//     của tin tức lên đúng ngành. Nằm trong component thì không ai kiểm được
//     nó có đúng như mô tả không.
//
// Nguồn ngẫu nhiên được truyền vào (`rand`) thay vì gọi thẳng `Math.random`,
// nên test có thể ghim một chuỗi số và kiểm từng quy tắc một.

export type SimStock = {
  currentPrice: number;
  previousPrice: number;
  sector: string;
  volatility: "high" | "medium" | "low";
};

export type SimNews = {
  affectedSectors: string[];
  impactMultiplier: number;
};

/** Biên độ dao động một ngày, theo nhóm biến động của cổ phiếu. */
export const VOLATILITY_BAND: Record<SimStock["volatility"], number> = {
  high: 0.035,
  medium: 0.02,
  low: 0.01,
};

/** Xác suất một lượt tua có tin tức thị trường. */
export const NEWS_CHANCE = 0.6;

/**
 * Chọn tin cho lượt tua, hoặc `null` nếu lượt này không có tin.
 *
 * `rand()` phải trả về [0, 1).
 */
export function pickNews<T>(pool: readonly T[], rand: () => number): T | null {
  if (pool.length === 0) return null;
  if (rand() > NEWS_CHANCE) return null;
  return pool[Math.floor(rand() * pool.length)] ?? null;
}

/**
 * Giá đóng cửa sau một ngày.
 *
 * Xu hướng chung của ngày lệch âm nhẹ (−0,48 thay vì −0,5) để thị trường
 * không trôi lên vô hạn, và giá luôn làm tròn về bội số 100 với sàn 1.000 -
 * đúng bước giá của sàn Việt Nam.
 */
export function stepPrice(stock: SimStock, marketTrend: number, news: SimNews | null, rand: () => number): number {
  const band = VOLATILITY_BAND[stock.volatility];
  let delta = (rand() - 0.49) * band + marketTrend;
  if (news && news.affectedSectors.includes(stock.sector)) {
    delta += news.impactMultiplier * 0.5;
  }
  return Math.max(1000, (Math.round((stock.currentPrice * (1 + delta)) / 100) * 100));
}

/** Xu hướng chung của một ngày giao dịch: khoảng −0,96% đến +1,04%. */
export function dailyTrend(rand: () => number): number {
  return (rand() - 0.48) * 0.02;
}

/**
 * Tua `days` ngày cho cả bảng giá. Trả về bảng mới và tin của lượt này;
 * không đụng vào state nào của React.
 */
export function advanceMarket<S extends SimStock, N extends SimNews>(
  stocks: readonly S[],
  days: number,
  newsPool: readonly N[],
  rand: () => number = Math.random,
): { stocks: S[]; news: N | null } {
  const news = pickNews(newsPool, rand);
  let out = [...stocks];
  for (let day = 0; day < days; day++) {
    const trend = dailyTrend(rand);
    out = out.map((stock) => ({
      ...stock,
      previousPrice: stock.currentPrice,
      currentPrice: stepPrice(stock, trend, news, rand),
    }));
  }
  return { stocks: out, news };
}

/**
 * Xáo trộn Fisher-Yates. Thay cho `sort(() => Math.random() - 0.5)`, một cách
 * xáo phổ biến nhưng KHÔNG cho phân phối đều: kết quả so sánh không nhất quán
 * nên thứ tự cuối phụ thuộc vào thuật toán sắp xếp của từng engine, và các vị
 * trí gần đầu mảng có xu hướng ở lại chỗ cũ.
 */
export function shuffle<T>(items: readonly T[], rand: () => number = Math.random): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
