/**
 * Phân vị của phân phối chuẩn và Student-t, cho widget VaR.
 *
 * Tách khỏi component vì đây là toán thật, và toán sai trong một widget dạy về
 * rủi ro thì không có gì báo cho ta biết: giao diện vẫn hiện một con số gọn
 * gàng, chỉ là con số sai. Ở đây thì kiểm được bằng những giá trị tra bảng mà
 * ai học FRM cũng thuộc - z(99%) = 2,326 và t(99%, 4 bậc tự do) = 3,747.
 *
 * Không dùng thư viện thống kê nào: cả file này nhỏ hơn nhiều so với việc kéo
 * một gói vào bundle của trang bài học.
 */

/** Phân vị của phân phối chuẩn chuẩn hoá. Xấp xỉ Acklam, đủ chính xác cho
 *  mục đích dạy học ở vùng đuôi 90-99,9%. */
export function normalQuantile(p: number): number {
  const a = [-39.6968302866538, 220.946098424521, -275.928510446969, 138.357751867269, -30.6647980661472, 2.50662827745924];
  const b = [-54.4760987982241, 161.585836858041, -155.698979859887, 66.8013118877197, -13.2806815528857];
  const c = [-0.00778489400243029, -0.322396458041136, -2.40075827716184, -2.54973253934373, 4.37466414146497, 2.93816398269878];
  const d = [0.00778469570904146, 0.32246712907004, 2.445134137143, 3.75440866190742];
  const pl = 0.02425;
  if (p < pl) {
    const q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  if (p > 1 - pl) return -normalQuantile(1 - p);
  const q = p - 0.5;
  const r = q * q;
  return ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) /
    (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}

/** Phân vị Student-t, tìm bằng chia đôi trên hàm phân phối tích luỹ tính từ
 *  hàm beta không hoàn chỉnh. Chậm hơn công thức đóng nhưng ở đây chỉ chạy vài
 *  lần mỗi lần kéo thanh, và đổi lại là không kéo thêm thư viện nào vào bundle. */
export function tQuantile(p: number, df: number): number {
  let lo = 0, hi = 40;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (tCdf(mid, df) < p) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

function tCdf(t: number, df: number): number {
  const x = df / (df + t * t);
  const ib = incompleteBeta(x, df / 2, 0.5);
  return t > 0 ? 1 - 0.5 * ib : 0.5 * ib;
}

function logGamma(z: number): number {
  const g = [676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059,
    12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - logGamma(1 - z);
  z -= 1;
  let x = 0.99999999999980993;
  for (let i = 0; i < g.length; i++) x += g[i] / (z + i + 1);
  const t = z + g.length - 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}

function incompleteBeta(x: number, a: number, b: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const lbeta = logGamma(a) + logGamma(b) - logGamma(a + b);
  const front = Math.exp(a * Math.log(x) + b * Math.log(1 - x) - lbeta) / a;
  // Phân số liên tục Lentz.
  let f = 1, c = 1, d = 0;
  for (let i = 0; i <= 200; i++) {
    const m = Math.floor(i / 2);
    let num: number;
    if (i === 0) num = 1;
    else if (i % 2 === 0) num = (m * (b - m) * x) / ((a + 2 * m - 1) * (a + 2 * m));
    else num = -((a + m) * (a + b + m) * x) / ((a + 2 * m) * (a + 2 * m + 1));
    d = 1 + num * d;
    if (Math.abs(d) < 1e-30) d = 1e-30;
    d = 1 / d;
    c = 1 + num / c;
    if (Math.abs(c) < 1e-30) c = 1e-30;
    const cd = c * d;
    f *= cd;
    if (Math.abs(1 - cd) < 1e-10) break;
  }
  const res = front * (f - 1);
  return a + 1 > (a + b + 2) * x ? res : 1 - incompleteBeta(1 - x, b, a);
}

