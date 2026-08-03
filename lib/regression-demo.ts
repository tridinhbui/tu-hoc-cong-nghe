import { tCdf } from "./tail-risk";

/**
 * Hồi quy đơn biến trên dữ liệu sinh ra được, cho widget dạy thống kê.
 *
 * Vì sao có file này: bài học nói "mẫu nhỏ cho ước lượng không đáng tin" và
 * "p < 0,05 không có nghĩa là phát hiện đúng". Cả hai câu đó đọc xong ai cũng
 * gật, và không ai thực sự tin cho tới khi tự tay kéo cỡ mẫu xuống 15 rồi bấm
 * lấy mẫu lại vài lần, thấy hệ số nhảy từ 0,2 sang 1,4 trong khi sự thật không
 * hề đổi.
 *
 * Nên dữ liệu phải sinh từ một quan hệ ĐÃ BIẾT: chỉ khi biết trước hệ số thật
 * thì mới nói được ước lượng sai bao nhiêu. Trên dữ liệu thật thì không ai có
 * con số đó để so.
 */

/** Bộ sinh số giả ngẫu nhiên có hạt (mulberry32) - cùng hạt thì cùng dữ liệu,
 *  nên biểu đồ không nhảy loạn mỗi lần React vẽ lại. */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Hai số chuẩn tắc từ hai số đều - biến đổi Box-Muller. */
function normalPair(rand: () => number): [number, number] {
  const u1 = Math.max(1e-9, rand());
  const u2 = rand();
  const r = Math.sqrt(-2 * Math.log(u1));
  return [r * Math.cos(2 * Math.PI * u2), r * Math.sin(2 * Math.PI * u2)];
}

export interface Point {
  x: number;
  y: number;
}

/** Sinh n điểm từ y = trueSlope·x + nhiễu. */
export function generateSample(n: number, trueSlope: number, noise: number, seed: number): Point[] {
  const rand = seededRandom(seed);
  const out: Point[] = [];
  for (let i = 0; i < n; i++) {
    const [zx, zy] = normalPair(rand);
    const x = zx;
    out.push({ x, y: trueSlope * x + noise * zy });
  }
  return out;
}

export interface Fit {
  slope: number;
  intercept: number;
  r2: number;
  /** Sai số chuẩn của hệ số góc. */
  se: number;
  t: number;
  pValue: number;
}

/** Hồi quy bình phương nhỏ nhất một biến, kèm kiểm định hệ số góc bằng 0. */
export function fitLine(points: Point[]): Fit {
  const n = points.length;
  const empty: Fit = { slope: 0, intercept: 0, r2: 0, se: 0, t: 0, pValue: 1 };
  if (n < 3) return empty;

  const mx = points.reduce((s, p) => s + p.x, 0) / n;
  const my = points.reduce((s, p) => s + p.y, 0) / n;
  let sxx = 0;
  let sxy = 0;
  for (const p of points) {
    sxx += (p.x - mx) ** 2;
    sxy += (p.x - mx) * (p.y - my);
  }
  if (sxx === 0) return empty;

  const slope = sxy / sxx;
  const intercept = my - slope * mx;

  let ssRes = 0;
  let ssTot = 0;
  for (const p of points) {
    ssRes += (p.y - (slope * p.x + intercept)) ** 2;
    ssTot += (p.y - my) ** 2;
  }
  const r2 = ssTot === 0 ? 0 : 1 - ssRes / ssTot;

  const df = n - 2;
  const se = Math.sqrt(ssRes / df / sxx);
  const t = se === 0 ? 0 : slope / se;
  // Hai phía.
  const pValue = se === 0 ? 1 : 2 * (1 - tCdf(Math.abs(t), df));

  return { slope, intercept, r2, se, t, pValue };
}

/**
 * Xác suất có ÍT NHẤT một kết quả "có ý nghĩa" giả, khi thử k biến độc lập ở
 * mức ý nghĩa alpha và thực tế không biến nào có tác dụng.
 *
 * 1 − (1−alpha)^k. Đây là toàn bộ p-hacking gói trong một dòng: thử 20 biến ở
 * mức 5% thì xác suất tìm được ít nhất một "phát hiện" là 64%, dù sự thật là
 * không có gì để tìm.
 */
export function falsePositiveChance(tests: number, alpha = 0.05): number {
  if (tests <= 0) return 0;
  return 1 - Math.pow(1 - alpha, tests);
}
