import { MEZZ_BAND, type Floor } from "./world";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

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
 *  vừa là điều hướng (đường dẫn) - cùng một lý do đã tách room-obstacles.
 *
 *  `room`/`blurb`/`formula`/`note` là chữ hiển thị, và sống trong
 *  `t.worldSpaces.lobbyStations` (xem AGENTS.md, mục "Translating the UI") -
 *  đây là một module dữ liệu mà scripts/i18n-coverage.mjs không nhìn thấy vì
 *  nó chỉ chấm các vị trí hiển thị trong .tsx. Mọi thứ CẤU TRÚC (id, side, z,
 *  href, accent) vẫn nằm nguyên ở STATION_STRUCT dưới đây. */

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

interface StationStruct {
  id: string;
  side: -1 | 1;
  z: number;
  href: string;
  accent: string;
}

const STATION_STRUCT: StationStruct[] = [
  { id: "hoc-bai", side: -1, z: -6, href: "/hoc-bai", accent: "#e5b567" },
  { id: "kiem-tra", side: -1, z: 3, href: "/kiem-tra", accent: "#7dd3fc" },
  { id: "on-tap", side: -1, z: 12, href: "/on-tap-cau-sai", accent: "#f0a3a3" },
  { id: "cong-cu", side: -1, z: 21, href: "/cong-cu", accent: "#86efac" },
  { id: "cfa", side: 1, z: -6, href: "/cfa", accent: "#c4b5fd" },
  { id: "frm", side: 1, z: 3, href: "/frm", accent: "#fca5a5" },
  { id: "phong-van", side: 1, z: 12, href: "/phong-van-ky-thuat", accent: "#fdba74" },
  { id: "su-nghiep", side: 1, z: 21, href: "/su-nghiep", accent: "#5eead4" },
];

/** Khoá tra chữ hiển thị trong `t.worldSpaces.lobbyStations`, theo đúng id
 *  của từng trạm. */
const STATION_COPY_KEY: Record<string, keyof Dictionary["worldSpaces"]["lobbyStations"]> = {
  "hoc-bai": "hocBai",
  "kiem-tra": "kiemTra",
  "on-tap": "onTap",
  "cong-cu": "congCu",
  cfa: "cfa",
  frm: "frm",
  "phong-van": "phongVan",
  "su-nghiep": "suNghiep",
};

/** Chỉ id, side, z - dùng cho những chỗ chỉ cần hình học chứ không cần chữ. */
export const STATION_IDS: string[] = STATION_STRUCT.map((s) => s.id);

const stationsCache = new WeakMap<Dictionary, Station[]>();

/** Tám trạm, kèm chữ hiển thị theo ngôn ngữ hiện tại của
 *  `t.worldSpaces.lobbyStations`. */
export function stationsOf(t: Dictionary): Station[] {
  const cached = stationsCache.get(t);
  if (cached) return cached;
  const copy = t.worldSpaces.lobbyStations;
  const stations = STATION_STRUCT.map((s): Station => {
    const c = copy[STATION_COPY_KEY[s.id]];
    return { ...s, room: c.room, blurb: c.blurb, formula: c.formula, note: c.note };
  });
  stationsCache.set(t, stations);
  return stations;
}

/** Đường vào PHÒNG 3D của một trạm, không phải trang 2D của nó.
 *
 *  `station.href` vẫn là trang 2D và phải giữ nguyên: nó là thứ cái bục trong
 *  phòng mở ra (xem `buildFloor` ở career-district/district-space.ts), tức là
 *  đích cuối cùng chứ không phải cánh cửa.
 *
 *  Cửa trên ban công thì trước đây trỏ thẳng vào `href` ấy - bấm "Vào phòng"
 *  là rời hẳn thế giới 3D và đứng trên một trang. Cả toà nhà trở thành một
 *  menu có dựng hình, và cánh cửa không dẫn tới đâu cả.
 *
 *  Khu phố nghề ĐÃ có sẵn một phòng 3D cho mỗi trạm - `tang-<id>`, dựng từ
 *  đúng danh sách này bằng `stations.map(buildFloor)` - nên cửa thư viện dẫn
 *  vào đó thay vì dựng bản thứ hai. Đó cũng là lý do hai nơi cùng đọc một
 *  danh sách ngay từ đầu: để không bao giờ có chuyện thư viện có tám cửa còn
 *  toà tháp có bảy tầng. */
export function stationRoomHref(station: Station): string {
  return `/pho-nghe?phong=tang-${station.id}`;
}

/** Cửa nằm trên tường ngoài của ban công. */
export const STATION_X = 11.92;
/** Đứng gần hơn khoảng này thì HUD hiện thẻ giới thiệu phòng. */
export const STATION_REACH = 2.7;

/** Cửa gần nhất trong tầm, hoặc null.
 *
 *  Chỉ xét khi đang ở tầng hai. Dưới sảnh, cùng toạ độ x,z đó là chỗ đi dưới
 *  gầm ban công - hiện lời mời vào phòng CFA khi người ta đang đi ngang tủ
 *  mục lục thì vừa sai vừa gây nhiễu. */
export function nearestStation(stations: Station[], x: number, z: number, floor: Floor): Station | null {
  if (floor !== 1) return null;
  // Ngoài dải đi lại của ban công thì không thể đứng trước cửa nào cả.
  const ax = Math.abs(x);
  if (ax < MEZZ_BAND[0] - 0.5) return null;

  let best: Station | null = null;
  let bestDz = STATION_REACH;
  for (const s of stations) {
    if (Math.sign(x) !== s.side) continue;
    const dz = Math.abs(z - s.z);
    if (dz < bestDz) {
      bestDz = dz;
      best = s;
    }
  }
  return best;
}
