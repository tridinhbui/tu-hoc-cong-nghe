/** Ánh sáng của đại sảnh đổi theo giờ thật của người học.
 *
 *  Lý do không để một khung cảnh cố định: hầu hết người dùng vào đây nhiều lần
 *  trong ngày, và một căn phòng luôn luôn hoàng hôn thì đến lần thứ ba đã thành
 *  hình nền. Bầu trời sáng lúc 9h và tối lúc 22h là thứ duy nhất trong sảnh nói
 *  cho người ta biết họ đang học vào lúc nào.
 *
 *  Toàn bộ file là hàm thuần theo giờ - không đọc Date, không chạm three.js.
 *  Phía gọi tự lấy giờ, nên kiểm được từng mốc mà không phải giả lập đồng hồ.
 *
 *  Nội suy vòng quanh 24 tiếng thay vì chia bốn ca rời rạc: chia ca thì đúng
 *  18h00 cả căn phòng đổi màu trong một khung hình, và ai đang ngồi học lúc đó
 *  sẽ thấy đèn giật một cái. */

export interface DaySample {
  /** Tên ca, dùng cho nhãn trên HUD. */
  label: string;
  skyTop: [number, number, number];
  skyMid: [number, number, number];
  skyHorizon: [number, number, number];
  /** Màu và cường độ nguồn sáng chính (mặt trời hoặc trăng). */
  sunColor: [number, number, number];
  sunIntensity: number;
  ambientColor: [number, number, number];
  ambientIntensity: number;
  fogColor: [number, number, number];
  /** Ô kính cửa sổ sáng tới mức nào - ban ngày chói, ban đêm gần tắt. */
  windowGlow: number;
  /** Đèn nhân tạo (đèn bàn, đèn đường, cửa hàng) rõ tới mức nào. */
  lamps: number;
}

interface Keyframe extends DaySample {
  hour: number;
}

/** Các mốc trong ngày. Giữa hai mốc là nội suy tuyến tính. */
const KEYFRAMES: Keyframe[] = [
  {
    hour: 0,
    label: "Đêm khuya",
    skyTop: [8, 12, 26],
    skyMid: [16, 20, 40],
    skyHorizon: [40, 38, 58],
    sunColor: [150, 170, 215],
    sunIntensity: 0.32,
    ambientColor: [110, 125, 165],
    ambientIntensity: 0.3,
    fogColor: [14, 15, 24],
    windowGlow: 0.12,
    lamps: 1,
  },
  {
    hour: 5.5,
    label: "Rạng sáng",
    skyTop: [40, 55, 105],
    skyMid: [130, 105, 130],
    skyHorizon: [235, 155, 110],
    sunColor: [255, 200, 165],
    sunIntensity: 0.7,
    ambientColor: [180, 165, 175],
    ambientIntensity: 0.45,
    fogColor: [46, 40, 44],
    windowGlow: 0.45,
    lamps: 0.6,
  },
  {
    hour: 8,
    label: "Buổi sáng",
    skyTop: [92, 150, 226],
    skyMid: [150, 195, 240],
    skyHorizon: [215, 232, 246],
    sunColor: [255, 246, 226],
    sunIntensity: 1.35,
    ambientColor: [225, 232, 240],
    ambientIntensity: 0.72,
    fogColor: [122, 132, 142],
    windowGlow: 1,
    lamps: 0.18,
  },
  {
    hour: 15,
    label: "Buổi chiều",
    skyTop: [80, 140, 220],
    skyMid: [145, 190, 236],
    skyHorizon: [225, 226, 224],
    sunColor: [255, 244, 214],
    sunIntensity: 1.25,
    ambientColor: [224, 226, 228],
    ambientIntensity: 0.68,
    fogColor: [118, 124, 130],
    windowGlow: 0.95,
    lamps: 0.22,
  },
  {
    hour: 18,
    label: "Hoàng hôn",
    skyTop: [27, 42, 74],
    skyMid: [110, 92, 128],
    skyHorizon: [242, 160, 96],
    sunColor: [255, 190, 130],
    sunIntensity: 0.95,
    ambientColor: [200, 168, 150],
    ambientIntensity: 0.55,
    fogColor: [58, 44, 40],
    windowGlow: 0.6,
    lamps: 0.75,
  },
  {
    hour: 20.5,
    label: "Buổi tối",
    skyTop: [12, 18, 38],
    skyMid: [24, 30, 56],
    skyHorizon: [62, 52, 74],
    sunColor: [170, 185, 225],
    sunIntensity: 0.42,
    ambientColor: [130, 142, 178],
    ambientIntensity: 0.34,
    fogColor: [20, 21, 32],
    windowGlow: 0.18,
    lamps: 1,
  },
];

function mix(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function mixRgb(
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] {
  return [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)];
}

/** Giờ trong ngày, cho phép số lẻ (13.5 = 13h30). Ngoài [0,24) thì gói lại. */
export function daylightAt(hour: number): DaySample {
  const h = ((hour % 24) + 24) % 24;

  let prev = KEYFRAMES[KEYFRAMES.length - 1];
  let next = KEYFRAMES[0];
  for (let i = 0; i < KEYFRAMES.length; i += 1) {
    const k = KEYFRAMES[i];
    if (k.hour <= h) {
      prev = k;
      next = KEYFRAMES[(i + 1) % KEYFRAMES.length];
    }
  }

  // Đoạn cuối vòng qua nửa đêm, nên chênh lệch giờ phải tính theo vòng tròn.
  const span = (next.hour - prev.hour + 24) % 24 || 24;
  const t = ((h - prev.hour + 24) % 24) / span;

  return {
    // Nhãn lấy của mốc gần hơn: nửa đầu quãng vẫn là "buổi sáng", nửa sau đã
    // là "buổi chiều", chứ không phải đổi tên ngay khi vừa qua mốc.
    label: t < 0.5 ? prev.label : next.label,
    skyTop: mixRgb(prev.skyTop, next.skyTop, t),
    skyMid: mixRgb(prev.skyMid, next.skyMid, t),
    skyHorizon: mixRgb(prev.skyHorizon, next.skyHorizon, t),
    sunColor: mixRgb(prev.sunColor, next.sunColor, t),
    sunIntensity: mix(prev.sunIntensity, next.sunIntensity, t),
    ambientColor: mixRgb(prev.ambientColor, next.ambientColor, t),
    ambientIntensity: mix(prev.ambientIntensity, next.ambientIntensity, t),
    fogColor: mixRgb(prev.fogColor, next.fogColor, t),
    windowGlow: mix(prev.windowGlow, next.windowGlow, t),
    lamps: mix(prev.lamps, next.lamps, t),
  };
}

export function rgbToHex([r, g, b]: [number, number, number]): string {
  const c = (v: number) =>
    Math.max(0, Math.min(255, Math.round(v)))
      .toString(16)
      .padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

/** Góc mặt trời trên vòm, để bóng đổ dài ra vào sáng sớm và chiều muộn thay vì
 *  luôn chiếu thẳng từ một góc cố định. Ban đêm giữ nguồn sáng ở cao độ thấp -
 *  đó là mặt trăng, và một mặt trăng dưới đường chân trời thì không soi được gì. */
export function sunPosition(hour: number): [number, number, number] {
  const h = ((hour % 24) + 24) % 24;
  // 6h ở phía đông, 12h trên đỉnh, 18h phía tây.
  const a = ((h - 6) / 12) * Math.PI;
  const daytime = h > 5.5 && h < 18.5;
  const y = daytime ? Math.max(3, Math.sin(a) * 16) : 9;
  return [Math.cos(a) * 14, y, daytime ? 5 : 8];
}

/**
 * Cùng một đồng hồ, rút gọn về đúng một con số cho nơi chỉ cần "trời sáng tới
 * đâu" - Phố nghề dùng nó để chỉnh ánh sáng cảnh.
 *
 * Trước đây Phố nghề tự có một ternary riêng: sáng bằng 1 từ 6h tới 18h, 0,45
 * tới 20h, rồi 0. Đó là định nghĩa "mấy giờ" thứ ba trong ứng dụng, và là bản
 * thô nhất - ánh sáng nhảy bậc tại đúng 18:00, trong khi thư viện ngay cạnh
 * nội suy mượt. Đi từ thư viện sang Phố nghề lúc 18h05 là thấy hai thế giới
 * cạnh nhau nói hai giờ khác nhau.
 *
 * Lấy `windowGlow` chứ không lấy `sunIntensity`: cái đầu đã ở sẵn thang 0 → 1
 * và mô tả đúng thứ Phố nghề cần - trời ngoài kia còn sáng bao nhiêu.
 */
export function outdoorBrightnessAt(hour: number): number {
  return Math.min(1, Math.max(0, daylightAt(hour).windowGlow));
}
