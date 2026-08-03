import { MEZZ_BAND, type Floor } from "./world";

/** Các cửa phòng học mở ra từ ban công tầng hai.
 *
 *  Ban công trước đó chỉ có bàn ghế, tức là một hành lang đẹp mà không để làm
 *  gì - leo lên một lần rồi thôi. Đặt cửa vào các phòng học ở đây cho tầng hai
 *  một lý do tồn tại, và cho cả sảnh 3D một lý do tồn tại ngoài việc gặp nhau:
 *  đi qua nó là đường vào chỗ học thật.
 *
 *  Mỗi cửa mang một CÔNG THỨC THẬT của phòng phía sau, không phải một câu khẩu
 *  hiệu. Người đi ngang đọc được `WACC = E/V × Re + D/V × Rd × (1 − t)` sẽ biết
 *  ngay phòng CFA dạy gì, và đó là thứ một cái tên phòng không nói được.
 *
 *  Danh sách để ở đây, tách khỏi phần vẽ, vì nó vừa là hình học (vị trí cửa)
 *  vừa là điều hướng (đường dẫn) - cùng một lý do đã tách room-obstacles. */

export interface Station {
  id: string;
  /** -1 là tường tây, 1 là tường đông. */
  side: -1 | 1;
  z: number;
  room: string;
  blurb: string;
  href: string;
  /** Công thức chủ đạo, khắc trên biển đá phía trên cửa. */
  formula: string;
  /** Một dòng giải thích công thức đọc là gì. */
  note: string;
  accent: string;
}

export const STATIONS: Station[] = [
  {
    id: "hoc-bai",
    side: -1,
    z: -6,
    room: "Phòng học hôm nay",
    blurb: "Bài kế tiếp trong lộ trình của bạn",
    href: "/hoc-bai",
    formula: "FV = PV × (1 + r)ⁿ",
    note: "Lãi kép - nền của mọi thứ còn lại trong tài chính",
    accent: "#e5b567",
  },
  {
    id: "kiem-tra",
    side: -1,
    z: 3,
    room: "Phòng luyện đề",
    blurb: "Kiểm tra theo chặng, chấm điểm ngay",
    href: "/kiem-tra",
    formula: "NPV = Σ CFₜ / (1 + r)ᵗ − C₀",
    note: "Dự án đáng làm khi NPV > 0",
    accent: "#7dd3fc",
  },
  {
    id: "on-tap",
    side: -1,
    z: 12,
    room: "Phòng ôn câu sai",
    blurb: "Những câu bạn đã trả lời sai, quay lại đúng lúc",
    href: "/on-tap-cau-sai",
    formula: "R(t) ≈ e^(−t / S)",
    note: "Đường cong quên: không ôn lại thì trí nhớ rơi theo hàm mũ",
    accent: "#f0a3a3",
  },
  {
    id: "cong-cu",
    side: -1,
    z: 21,
    room: "Phòng công cụ",
    blurb: "Máy tính DCF, WACC, lãi kép",
    href: "/cong-cu",
    formula: "EV = Σ FCFₜ/(1+w)ᵗ + TV/(1+w)ⁿ",
    note: "Chiết khấu dòng tiền - cách định giá một doanh nghiệp",
    accent: "#86efac",
  },
  {
    id: "cfa",
    side: 1,
    z: -6,
    room: "Phòng CFA",
    blurb: "Ba cấp độ, theo giáo trình chính thức",
    href: "/cfa",
    formula: "WACC = E/V × Rₑ + D/V × R_d × (1 − t)",
    note: "Chi phí vốn bình quân, đã trừ lá chắn thuế của nợ",
    accent: "#c4b5fd",
  },
  {
    id: "frm",
    side: 1,
    z: 3,
    room: "Phòng FRM",
    blurb: "Quản trị rủi ro tài chính",
    href: "/frm",
    formula: "VaR = μ − z_α × σ",
    note: "Mức lỗ tệ nhất trong α% trường hợp xấu",
    accent: "#fca5a5",
  },
  {
    id: "phong-van",
    side: 1,
    z: 12,
    room: "Phòng phỏng vấn",
    blurb: "Câu hỏi kỹ thuật IB, trả lời có chấm",
    href: "/phong-van-ky-thuat",
    formula: "EV = Vốn hoá + Nợ − Tiền mặt",
    note: "Giá trị doanh nghiệp - câu hỏi mở màn của mọi buổi phỏng vấn IB",
    accent: "#fdba74",
  },
  {
    id: "su-nghiep",
    side: 1,
    z: 21,
    room: "Phòng nghề nghiệp",
    blurb: "Bạn đang cách nghề mình muốn bao xa",
    href: "/su-nghiep",
    formula: "ROE = Biên LN × Vòng quay TS × Đòn bẩy",
    note: "Phân rã DuPont: ba nguồn duy nhất tạo ra ROE",
    accent: "#5eead4",
  },
];

/** Cửa nằm trên tường ngoài của ban công. */
export const STATION_X = 11.92;
/** Đứng gần hơn khoảng này thì HUD hiện thẻ giới thiệu phòng. */
export const STATION_REACH = 2.7;

/** Cửa gần nhất trong tầm, hoặc null.
 *
 *  Chỉ xét khi đang ở tầng hai. Dưới sảnh, cùng toạ độ x,z đó là chỗ đi dưới
 *  gầm ban công - hiện lời mời vào phòng CFA khi người ta đang đi ngang tủ
 *  mục lục thì vừa sai vừa gây nhiễu. */
export function nearestStation(x: number, z: number, floor: Floor): Station | null {
  if (floor !== 1) return null;
  // Ngoài dải đi lại của ban công thì không thể đứng trước cửa nào cả.
  const ax = Math.abs(x);
  if (ax < MEZZ_BAND[0] - 0.5) return null;

  let best: Station | null = null;
  let bestDz = STATION_REACH;
  for (const s of STATIONS) {
    if (Math.sign(x) !== s.side) continue;
    const dz = Math.abs(z - s.z);
    if (dz < bestDz) {
      bestDz = dz;
      best = s;
    }
  }
  return best;
}
