import { FINANCE_CAREERS } from "@/lib/finance-careers";
import {
  CAREER_CATEGORY_BLURBS,
  CAREER_CATEGORY_COLORS,
  CAREER_CATEGORY_LABELS,
  CAREER_CATEGORY_ORDER,
  type CareerCategory,
} from "@/lib/career-categories";
import { STATIONS, type Station } from "@/components/lobby/stations";
import { ORGANIC_BUILDINGS } from "@/lib/rpg-buildings";
import { BODY_RADIUS, resolveObstacles, type BoxObstacle, type CircleObstacle, type Obstacle } from "@/lib/walkable-space";

/** Phố nghề: một con phố Sài Gòn ngoài trời, và sau mỗi cánh cửa là một căn
 *  phòng của một nhóm ngành, mỗi cái bàn trong đó là một nghề thật.
 *
 *  Cả khu được dựng TỪ DỮ LIỆU NGHỀ chứ không kê tay: số bàn trong phòng là số
 *  nghề của nhóm đó trong lib/finance-careers.ts, và biển hiệu ngoài cửa lấy
 *  tên nhóm từ lib/career-categories.ts. Thêm một nghề mới vào file nghề là có
 *  thêm một cái bàn trong phòng, không phải sửa ở đây - nếu không thì đây sẽ
 *  thành bản chép thứ hai của danh sách nghề, và bản chép nào rồi cũng lệch.
 *
 *  Mỗi phòng là một KHÔNG GIAN RIÊNG chứ không phải một góc của một cảnh khổng
 *  lồ: đi qua cửa là đổi phòng, và mỗi phòng chỉ mang vật cản của chính nó.
 *  Nhờ vậy va chạm không bao giờ phải xét tới đồ đạc của bốn phòng kia, và một
 *  máy yếu không phải dựng cả khu phố để đứng trong một căn phòng. */

/** Mỗi tầng của toà tháp là một phòng riêng, đặt tên theo đúng id của trạm
 *  trong components/lobby/stations.ts - danh sách điều hướng đã có sẵn ở đó,
 *  và khu phố này không được phép giữ một bản chép thứ hai của nó. */
export type FloorRoomId = `tang-${string}`;

export type DistrictRoomId =
  | "street"
  | CareerCategory
  | "thap"
  | "khu-game"
  | "cong-vien"
  | "trung-tam"
  | "quan-ca-phe"
  | FloorRoomId;

export interface Pose {
  x: number;
  z: number;
  ry: number;
}

/** Một lối đi: đứng trong tầm thì hiện lời mời, bước qua thì sang phòng khác. */
export interface Doorway {
  id: string;
  to: DistrictRoomId;
  /** Vị trí cánh cửa trong phòng hiện tại. */
  x: number;
  z: number;
  reach: number;
  label: string;
  /** Chỗ đứng khi vừa sang phòng bên kia. */
  arriveAt: Pose;
  accent: string;
}

/** Một cái bàn mang một nghề. */
export interface CareerDesk {
  careerId: string;
  title: string;
  emoji: string;
  x: number;
  z: number;
  /** Hướng bàn quay; người đứng đọc bảng tên đối diện. */
  ry: number;
}

/** Một điểm dẫn ra khỏi thế giới 3D, vào đúng màn hình thật của tính năng.
 *
 *  Thế giới 3D là cách ĐI TỚI tính năng, không phải bản thay thế cho nó: dựng
 *  lại máy tính DCF hay bài kiểm tra bằng khối 3D thì vừa khó dùng hơn vừa lập
 *  tức lệch khỏi bản thật ngay lần sửa đầu tiên. Căn phòng kể tính năng đó là
 *  gì, và cánh cổng đưa người học sang bản thật. */
export interface RoomPortal {
  id: string;
  x: number;
  z: number;
  reach: number;
  label: string;
  blurb: string;
  href: string;
  accent: string;
  /** Công thức chủ đạo của tính năng, khắc lên tường phòng. */
  formula?: string;
  formulaNote?: string;
}

/** Buồng thang máy: đứng vào là chọn được mọi tầng. Không làm thang máy thành
 *  cửa nối từng cặp tầng, vì tám tầng nối đôi một là hai mươi tám cánh cửa và
 *  không ai nhớ nổi cửa nào ra cửa nào. */
export interface LiftSpot {
  x: number;
  z: number;
  reach: number;
}

/** Một chỗ ngồi học. Khác `stops` (cột bài học) ở chỗ ngồi xuống đây mở một
 *  phiên focus_sessions thật - đây là nơi duy nhất trong khu phố mà thời gian
 *  được tính. */
export interface CafeSeat {
  index: number;
  x: number;
  z: number;
  ry: number;
}

export interface DistrictRoom {
  id: DistrictRoomId;
  label: string;
  kind: "street" | "office";
  accent: string;
  /** Khung đi lại được, đã lùi vào khỏi chân tường / mép vỉa hè. */
  bounds: { minX: number; maxX: number; minZ: number; maxZ: number };
  obstacles: Obstacle[];
  doorways: Doorway[];
  desks: CareerDesk[];
  portals: RoomPortal[];
  lift: LiftSpot | null;
  /** Các cột bài học, chỉ có ở phòng lộ trình. */
  stops?: PathStop[];
  /** Chỗ ngồi học, chỉ có ở quán cà phê. */
  seats?: CafeSeat[];
  /** Kích thước hình học để phần vẽ dựng sàn, tường, mái. */
  size: { width: number; depth: number; height: number };
}

// ── Con phố ─────────────────────────────────────────────────────────────────

/** Phố chạy theo trục x. Năm căn nhà nằm bên phía -z, vỉa hè trước cửa. */
export const STREET = {
  halfLength: 44,
  /** Vỉa hè: dải z đi lại được. Lòng đường phía +z để cho xe, không bước vào. */
  walkMinZ: -5.4,
  walkMaxZ: 5.4,
  /** Mặt tiền các căn nhà. */
  facadeZ: -7,
  height: 9,
};

/** Khoảng cách giữa hai cửa nhà. */
const SHOP_SPACING = 15;

/** Vị trí x của cửa từng nhóm ngành, xếp theo CAREER_CATEGORY_ORDER và đặt
 *  đối xứng qua giữa phố, để không nhóm nào phải đi xa hơn hẳn các nhóm kia. */
export const SHOP_X: Record<CareerCategory, number> = CAREER_CATEGORY_ORDER.reduce(
  (acc, id, i) => {
    acc[id] = (i - (CAREER_CATEGORY_ORDER.length - 1) / 2) * SHOP_SPACING;
    return acc;
  },
  {} as Record<CareerCategory, number>
);

/** Chỗ đứng khi mới vào phố: giữa vỉa hè, quay mặt về phía các cửa hàng.
 *
 *  ry = 0 là nhìn về -z, tức nhìn thẳng vào dãy nhà - và camera đứng sau lưng
 *  nên khung hình đầu tiên là cả dãy biển hiệu. Quay ngược lại thì camera chen
 *  vào giữa người và dãy nhà, còn người học nhìn ra lòng đường. z lùi khỏi
 *  hàng cây ở z=4.6, nếu không thì cảnh mở đầu là một gốc cây. */
export const STREET_SPAWN: Pose = { x: 0, z: 2.2, ry: 0 };

/** Cây và cột đèn dọc mép vỉa hè phía lòng đường - vừa là cảnh, vừa là hàng
 *  rào mềm nhắc người học rằng lòng đường không đi được. */
/** Hàng cây lệch khỏi trục giữa: cây đứng đúng x=0 thì nó chen vào giữa camera
 *  và nhân vật ngay khung hình đầu tiên, và cảnh mở đầu của cả khu phố là một
 *  thân cây. */
export const STREET_TREE_XS = [-31.9, -24.4, -16.9, -9.4, -1.9, 5.6, 13.1, 20.6, 28.1];
export const TREE_Z = 4.6;
export const LAMP_XS = [-27.5, -12.5, 2.5, 17.5];
export const LAMP_Z = 4.6;

/** Hai cổng ở đầu tây con phố: một sang thư viện, một sang phòng học nhóm. */
export const GATE_XS = [-STREET.halfLength + 5, -STREET.halfLength + 10];
export const GATE_Z = -2.4;
/** Trụ cổng đứng lùi về phía tường, sát mép đi lại nên không chừa khe sau lưng. */
export const GATE_PILLAR_Z = -4.45;

/** Xe máy dựng trước hiên - thứ khiến một con phố trông là phố Sài Gòn. */
export const BIKE_SPOTS: Array<[number, number]> = [
  [-26, -4.2],
  [-18.6, -4.2],
  [-3.4, -4.2],
  [11.4, -4.2],
  [26.6, -4.2],
];

// ── Phòng ngành ─────────────────────────────────────────────────────────────

/** Bàn xếp thành hai dãy đối diện nhau dọc chiều sâu phòng. */
const DESK_PITCH = 3;
const DESK_HALF_W = 1.05;
const DESK_HALF_D = 0.62;
const OFFICE_WIDTH = 12;
/** Lùi vào khỏi chân tường - cũng là mép ngoài của khung đi lại. */
const OFFICE_MARGIN = 0.6;

/** Dãy bàn kê SÁT tường, không chừa lối phía sau.
 *
 *  Chừa lại một khe hẹp sau lưng bàn nghe như chuyện nhỏ, nhưng khe đó rộng
 *  0.34m - vừa đủ để bước vào và không đủ để lách qua giữa hai cái bàn liền
 *  nhau. Người học đi vào đó là kẹt cứng: mỗi bước đều bị đẩy ngược lại đúng
 *  chỗ cũ, và không có nút nào để thoát ra. Đặt mép vùng chặn của bàn trùng
 *  đúng mép khung đi lại thì khe ấy biến mất, và cái bàn chỉ còn tới được từ
 *  lối đi giữa phòng - đúng như người ta đi trong một văn phòng thật. */
const DESK_ROW_X = OFFICE_WIDTH / 2 - OFFICE_MARGIN - DESK_HALF_D - BODY_RADIUS;

function careersIn(category: CareerCategory) {
  return FINANCE_CAREERS.filter((c) => c.category === category);
}

/** Kích thước phòng suy từ số nghề: mỗi dãy chứa một nửa số bàn, cộng lối vào
 *  và khoảng trống trước bảng ngành. Một phòng cố định sẽ hoặc chật cứng với
 *  nhóm 13 nghề, hoặc trống hoác với nhóm 3 nghề. */
function roomDepthFor(count: number) {
  const perRow = Math.ceil(count / 2);
  return Math.max(14, perRow * DESK_PITCH + 8);
}

function buildOffice(category: CareerCategory): DistrictRoom {
  const careers = careersIn(category);
  const depth = roomDepthFor(careers.length);
  const halfD = depth / 2;
  const width = OFFICE_WIDTH;
  const halfW = width / 2;
  /** Dãy bàn bắt đầu lùi khỏi bảng ngành ở đầu bắc. */
  const firstZ = -halfD + 4.4;

  const desks: CareerDesk[] = careers.map((career, i) => {
    const row = i % 2 === 0 ? -1 : 1;
    const slot = Math.floor(i / 2);
    return {
      careerId: career.id,
      title: career.title,
      emoji: career.emoji,
      x: row * DESK_ROW_X,
      z: firstZ + slot * DESK_PITCH,
      // Bàn quay mặt vào lối đi giữa phòng.
      ry: row < 0 ? Math.PI / 2 : -Math.PI / 2,
    };
  });

  const obstacles: Obstacle[] = [
    ...desks.map(
      (d): BoxObstacle => ({
        kind: "box",
        x: d.x,
        z: d.z,
        // Bàn quay ngang nên bề ngang và bề sâu đổi chỗ cho nhau.
        halfW: DESK_HALF_D,
        halfD: DESK_HALF_W,
      })
    ),
    // Chậu cây hai bên bảng ngành.
    { kind: "circle", x: -halfW + 1.2, z: -halfD + 1.2, radius: 0.5 },
    { kind: "circle", x: halfW - 1.2, z: -halfD + 1.2, radius: 0.5 },
  ];

  return {
    id: category,
    label: CAREER_CATEGORY_LABELS[category],
    kind: "office",
    accent: CAREER_CATEGORY_COLORS[category],
    size: { width, depth, height: 4.2 },
    bounds: {
      minX: -halfW + OFFICE_MARGIN,
      maxX: halfW - OFFICE_MARGIN,
      minZ: -halfD + OFFICE_MARGIN,
      maxZ: halfD - OFFICE_MARGIN,
    },
    obstacles,
    desks,
    portals: [],
    lift: null,
    doorways: [
      {
        id: `${category}-exit`,
        to: "street",
        x: 0,
        z: halfD - 0.4,
        reach: 2,
        label: "Ra phố",
        // Bước ra phố thì quay dọc phố, không quay vào tường nhà: camera đứng
        // sau lưng, nên quay vào nhà là camera nằm gọn trong khối nhà và người
        // học nhận được một khung hình đen.
        arriveAt: { x: SHOP_X[category], z: -3.4, ry: Math.PI / 2 },
        accent: CAREER_CATEGORY_COLORS[category],
      },
    ],
  };
}

const OFFICES = CAREER_CATEGORY_ORDER.map(buildOffice);


// ── Toà tháp Tự Học ─────────────────────────────────────────────────────────

/** Toà tháp đứng ở đầu phố, và mỗi tầng của nó là một tính năng của ứng dụng.
 *
 *  Danh sách tầng lấy nguyên từ STATIONS - cùng cái danh sách đã dựng các cửa
 *  phòng trên ban công thư viện. Nhờ vậy thêm một trạm mới là có thêm một tầng,
 *  và không bao giờ có chuyện thư viện dẫn tới bảy chỗ còn khu phố dẫn tới sáu.
 *  Đây cũng là lý do phòng tầng không tự viết công thức: STATIONS đã mang sẵn
 *  công thức chủ đạo và một dòng giải thích cho mỗi trạm. */
export const TOWER_X = 37;
const TOWER_WIDTH = 15;
const TOWER_DEPTH = 15;
export const TOWER_HALF_D = TOWER_DEPTH / 2;

export function floorRoomId(station: Station): FloorRoomId {
  return `tang-${station.id}`;
}

/** Sảnh tháp: chỉ có thang máy và đường ra phố. Cố tình để trống - một sảnh
 *  đầy đồ thì người học dừng lại ở đó thay vì lên tầng. */
const TOWER_LOBBY: DistrictRoom = {
  id: "thap",
  label: "Tháp Tự Học",
  kind: "office",
  accent: "#fbbf24",
  size: { width: TOWER_WIDTH, depth: TOWER_DEPTH, height: 5 },
  bounds: {
    minX: -TOWER_WIDTH / 2 + 0.7,
    maxX: TOWER_WIDTH / 2 - 0.7,
    minZ: -TOWER_HALF_D + 0.7,
    maxZ: TOWER_HALF_D - 0.7,
  },
  obstacles: [
    { kind: "circle", x: -TOWER_WIDTH / 2 + 1.5, z: TOWER_HALF_D - 1.6, radius: 0.55 },
    { kind: "circle", x: TOWER_WIDTH / 2 - 1.5, z: TOWER_HALF_D - 1.6, radius: 0.55 },
  ],
  desks: [],
  portals: [],
  // Buồng thang ÁP SÁT tường, không đứng rời ra giữa sàn: camera vai thứ ba bị
  // kẹp trong lòng phòng, nên bất cứ khối nào đứng rời khỏi tường đều có lúc
  // nằm chen giữa camera và nhân vật và chiếm trọn khung hình.
  lift: { x: 0, z: -TOWER_HALF_D + 0.35, reach: 2.6 },
  doorways: [
    {
      id: "thap-exit",
      to: "street",
      x: 0,
      z: TOWER_HALF_D - 0.4,
      reach: 2,
      label: "Ra phố",
      arriveAt: { x: TOWER_X, z: -3.4, ry: Math.PI / 2 },
      accent: "#fbbf24",
    },
  ],
};

const FLOOR_WIDTH = 14;
const FLOOR_DEPTH = 16;

/** Một tầng: buồng thang ở đầu nam, bàn tính năng ở giữa, công thức trên tường
 *  bắc. Cùng một khuôn cho mọi tầng vì cái phân biệt chúng là NỘI DUNG - công
 *  thức, tên phòng, đường dẫn - chứ không phải hình dạng; tám cách bố trí khác
 *  nhau chỉ khiến người học phải học lại cách đi ở mỗi tầng. */
function buildFloor(station: Station): DistrictRoom {
  const halfW = FLOOR_WIDTH / 2;
  const halfD = FLOOR_DEPTH / 2;
  return {
    id: floorRoomId(station),
    label: station.room,
    kind: "office",
    accent: station.accent,
    size: { width: FLOOR_WIDTH, depth: FLOOR_DEPTH, height: 4.4 },
    bounds: { minX: -halfW + 0.7, maxX: halfW - 0.7, minZ: -halfD + 0.7, maxZ: halfD - 0.7 },
    obstacles: [
      { kind: "box", x: 0, z: -1.2, halfW: 1.5, halfD: 0.75 },
      { kind: "circle", x: -halfW + 1.4, z: -halfD + 1.4, radius: 0.52 },
      { kind: "circle", x: halfW - 1.4, z: -halfD + 1.4, radius: 0.52 },
    ],
    desks: [],
    portals: [
      {
        id: station.id,
        x: 0,
        z: 0.6,
        reach: 2.4,
        label: station.room,
        blurb: station.blurb,
        href: station.href,
        accent: station.accent,
        formula: station.formula,
        formulaNote: station.note,
      },
    ],
    lift: { x: 0, z: halfD - 0.35, reach: 2.6 },
    doorways: [],
  };
}

const FLOORS = STATIONS.map(buildFloor);

/** Một tầng riêng cho các chặng học, không đến từ STATIONS: chặng không phải
 *  một màn hình để mở mà là một danh sách để chọn, nên nó cần bảng chọn của
 *  riêng nó chứ không phải một cái bàn có nút "mở". */
export const STAGE_FLOOR_ID = "tang-chang-hoc" as DistrictRoomId;

const STAGE_FLOOR: DistrictRoom = {
  id: STAGE_FLOOR_ID,
  label: "Sảnh chặng học",
  kind: "office",
  accent: "#a7f3d0",
  size: { width: 14, depth: 16, height: 4.4 },
  bounds: { minX: -6.3, maxX: 6.3, minZ: -7.3, maxZ: 7.3 },
  obstacles: [
    { kind: "circle", x: -5.6, z: -6.6, radius: 0.52 },
    { kind: "circle", x: 5.6, z: -6.6, radius: 0.52 },
  ],
  desks: [],
  portals: [],
  lift: { x: 0, z: 7.65, reach: 2.6 },
  doorways: [],
};

/** Danh sách tầng cho bảng thang máy, kèm sảnh ở dưới cùng. */
export const TOWER_STOPS: Array<{ id: DistrictRoomId; label: string; accent: string; arriveAt: Pose }> = [
  // Ra thang máy ở sảnh thì đứng NGAY TRONG buồng thang, không phải giữa sảnh:
  // người vừa bấm nhầm tầng phải bấm lại được ngay mà không đi bộ vòng lại.
  { id: "thap", label: "Sảnh · ra phố", accent: "#fbbf24", arriveAt: { x: 0, z: -TOWER_HALF_D + 2.4, ry: Math.PI } },
  { id: STAGE_FLOOR_ID, label: "Chặng học tài chính", accent: "#a7f3d0", arriveAt: { x: 0, z: 5.4, ry: 0 } },
  ...STATIONS.map((s) => ({
    id: floorRoomId(s) as DistrictRoomId,
    label: s.room,
    accent: s.accent,
    arriveAt: { x: 0, z: FLOOR_DEPTH / 2 - 2.6, ry: 0 },
  })),
];


// ── Khu game ────────────────────────────────────────────────────────────────

/** Quảng trường game ở đầu đông con phố: mười ba địa điểm của Thế Giới Game
 *  Tài Chính, mỗi cái một bục.
 *
 *  Danh sách lấy từ lib/rpg-buildings.ts - đúng cái mà bản đồ 2D ở /game đang
 *  dùng - nên thêm một địa điểm là có thêm một bục, và không bao giờ có chuyện
 *  bản đồ có mười bốn chỗ còn quảng trường có mười ba.
 *
 *  Bục dẫn sang /game?building=<id>, đúng đường deep-link mà bản đồ đã hỗ trợ
 *  sẵn. Dựng lại từng trò chơi bằng khối 3D thì vừa khó dùng hơn bản thật vừa
 *  lệch khỏi nó ngay lần sửa đầu tiên; quảng trường là ĐƯỜNG TỚI, không phải
 *  bản thay thế. */
export const GAME_SQUARE_X = -TOWER_X;

/** Quảng trường hẹp lại so với bản đầu: rộng 26m thì hai dãy bục nằm ở x=±7.2,
 *  và đi giữa quảng trường thì chúng rơi ra ngoài khung hình cả hai bên - người
 *  học đi hết chiều dài mà không nhìn thấy cái bục nào. */
const SQUARE_W = 18;
const PODIUM_PITCH = 4.2;
const PODIUM_ROW_X = 5;
/** Chiều sâu suy từ SỐ ĐỊA ĐIỂM, không phải một con số gõ tay.
 *
 *  Gõ tay 30 thì mười ba cái bục cần 41 mét đã tràn ra ngoài tường - và tràn
 *  một cách lặng lẽ, vì bục không phải vật cản chắn đường nên không có gì báo.
 *  Đây là lý do test giờ kiểm cả bục nằm trong khung phòng, chứ trước đó nó chỉ
 *  kiểm bàn. */
const SQUARE_D = Math.max(30, Math.ceil(ORGANIC_BUILDINGS.length / 2) * PODIUM_PITCH + 12);

const GAME_ACCENTS = ["#f472b6", "#facc15", "#60a5fa", "#4ade80", "#c084fc", "#fb923c"];

const GAME_SQUARE: DistrictRoom = (() => {
  const halfW = SQUARE_W / 2;
  const halfD = SQUARE_D / 2;
  const portals: RoomPortal[] = ORGANIC_BUILDINGS.map((b, i) => ({
    id: `game-${b.id}`,
    x: (i % 2 === 0 ? -1 : 1) * PODIUM_ROW_X,
    z: -halfD + 5 + Math.floor(i / 2) * PODIUM_PITCH,
    reach: 2.3,
    label: b.name,
    blurb: b.minLevel ? `${b.subtitle} · cần cấp ${b.minLevel}` : b.subtitle,
    href: `/game?building=${b.id}`,
    accent: GAME_ACCENTS[i % GAME_ACCENTS.length],
  }));
  return {
    id: "khu-game",
    label: "Quảng trường Game Tài chính",
    kind: "office",
    accent: "#f472b6",
    size: { width: SQUARE_W, depth: SQUARE_D, height: 6 },
    bounds: { minX: -halfW + 0.8, maxX: halfW - 0.8, minZ: -halfD + 0.8, maxZ: halfD - 0.8 },
    obstacles: portals.map((p): CircleObstacle => ({ kind: "circle", x: p.x, z: p.z, radius: 1.1 })),
    desks: [],
    portals,
    lift: null,
    doorways: [
      {
        id: "khu-game-exit",
        to: "street",
        x: 0,
        z: halfD - 0.6,
        reach: 2.2,
        label: "Ra phố",
        arriveAt: { x: GAME_SQUARE_X, z: -3.4, ry: Math.PI / 2 },
        accent: "#f472b6",
      },
    ],
  };
})();


// ── Công viên và trung tâm ──────────────────────────────────────────────────

/** Công viên bên kia đường, và quảng trường trung tâm ở giữa phố.
 *
 *  Hai chỗ này KHÔNG có tính năng nào - và đó là chủ ý. Một khu phố mà chỗ nào
 *  cũng có việc phải làm thì đi trong đó là đi làm việc vặt; công viên là chỗ
 *  đứng lại, nhìn quanh, gặp người khác mà không phải mở gì cả. Đây cũng là
 *  chỗ duy nhất trong cả thành phố có ghế để ngồi mà không tính giờ.
 *
 *  Trung tâm thì ngược lại: nó là nơi cả thành phố nhìn thấy nhau - bảng lớn ở
 *  giữa mang tiến độ của chính người đang đứng, và bốn lối toả ra bốn hướng
 *  của khu phố. */

export const PARK_X = -18;
export const CENTER_X = 0;

const PARK_W = 34;
const PARK_D = 26;

/** Cây trong công viên: xếp theo vòng chứ không theo hàng, để nó khác hẳn hàng
 *  cây thẳng tắp ngoài phố. */
export const PARK_TREES: Array<[number, number]> = Array.from({ length: 10 }, (_, i) => {
  const a = (i / 10) * Math.PI * 2;
  const r = 9 + (i % 3) * 2.2;
  return [Math.cos(a) * r, Math.sin(a) * r * 0.8] as [number, number];
});

/** Ghế đá quanh hồ nước ở giữa. */
export const PARK_BENCHES: Array<[number, number]> = [
  [-5, 2.4],
  [5, 2.4],
  [-5, -2.4],
  [5, -2.4],
];

export const POND = { x: 0, z: 0, radius: 3.4 };

const PARK_ROOM: DistrictRoom = {
  id: "cong-vien",
  label: "Công viên Bến Nghé",
  kind: "office",
  accent: "#4ade80",
  size: { width: PARK_W, depth: PARK_D, height: 14 },
  bounds: { minX: -PARK_W / 2 + 1, maxX: PARK_W / 2 - 1, minZ: -PARK_D / 2 + 1, maxZ: PARK_D / 2 - 1 },
  obstacles: [
    { kind: "circle", x: POND.x, z: POND.z, radius: POND.radius },
    ...PARK_TREES.map(([x, z]): CircleObstacle => ({ kind: "circle", x, z, radius: 0.6 })),
    ...PARK_BENCHES.map(([x, z]): BoxObstacle => ({ kind: "box", x, z, halfW: 0.9, halfD: 0.3 })),
  ],
  desks: [],
  portals: [],
  lift: null,
  doorways: [
    {
      id: "cong-vien-exit",
      to: "street",
      x: 0,
      z: PARK_D / 2 - 0.6,
      reach: 2.2,
      label: "Ra phố",
      arriveAt: { x: PARK_X, z: -3.4, ry: Math.PI / 2 },
      accent: "#4ade80",
    },
  ],
};

const CENTER_W = 24;
const CENTER_D = 24;

/** Bốn lối toả ra từ quảng trường trung tâm. */
const CENTER_EXITS: Array<{ id: string; to: DistrictRoomId; x: number; z: number; label: string; accent: string }> = [
  { id: "tt-pho", to: "street", x: 0, z: CENTER_D / 2 - 0.6, label: "Ra phố", accent: "#fbbf24" },
  { id: "tt-thap", to: "thap", x: 0, z: -CENTER_D / 2 + 0.6, label: "Tháp Tự Học", accent: "#fbbf24" },
  { id: "tt-game", to: "khu-game", x: CENTER_W / 2 - 0.6, z: 0, label: "Quảng trường Game", accent: "#f472b6" },
  { id: "tt-cong-vien", to: "cong-vien", x: -CENTER_W / 2 + 0.6, z: 0, label: "Công viên", accent: "#4ade80" },
];

/** Cột đèn quanh quảng trường, xếp thành vòng. */
export const CENTER_LAMPS: Array<[number, number]> = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
  return [Math.cos(a) * 8.4, Math.sin(a) * 8.4] as [number, number];
});

/** Đài phun nước ở giữa quảng trường - mốc định hướng của cả thành phố. */
export const FOUNTAIN = { x: 0, z: 0, radius: 2.6 };

const CENTER_ROOM: DistrictRoom = {
  id: "trung-tam",
  label: "Quảng trường Trung tâm",
  kind: "office",
  accent: "#fbbf24",
  size: { width: CENTER_W, depth: CENTER_D, height: 16 },
  bounds: { minX: -CENTER_W / 2 + 1, maxX: CENTER_W / 2 - 1, minZ: -CENTER_D / 2 + 1, maxZ: CENTER_D / 2 - 1 },
  obstacles: [
    { kind: "circle", x: FOUNTAIN.x, z: FOUNTAIN.z, radius: FOUNTAIN.radius },
    ...CENTER_LAMPS.map(([x, z]): CircleObstacle => ({ kind: "circle", x, z, radius: 0.34 })),
  ],
  desks: [],
  portals: [],
  lift: null,
  doorways: CENTER_EXITS.map((e) => ({
    id: e.id,
    to: e.to,
    x: e.x,
    z: e.z,
    reach: 2.4,
    label: e.label,
    // Vào phòng nào thì đứng ở lối vào của phòng đó, không phải giữa phòng:
    // bước qua một cánh cửa rồi thấy mình ở giữa gian phòng là mất hẳn cảm
    // giác vừa đi qua cái gì.
    arriveAt:
      e.to === "street"
        ? { x: CENTER_X, z: -3.4, ry: Math.PI / 2 }
        : e.to === "thap"
        ? { x: 0, z: TOWER_HALF_D - 3.8, ry: 0 }
        : e.to === "khu-game"
        ? { x: 0, z: SQUARE_D / 2 - 6, ry: 0 }
        : { x: 0, z: PARK_D / 2 - 3, ry: 0 },
    accent: e.accent,
  })),
};


// ── Quán cà phê tài chính ───────────────────────────────────────────────────

/** Quán cà phê vỉa hè kiểu Sài Gòn, có sách và có chỗ ngồi ôn.
 *
 *  Đây là chỗ DUY NHẤT trong khu phố mà ngồi xuống thì thời gian được tính -
 *  cùng một phiên focus_sessions với thư viện và phòng nhóm. Thư viện là chỗ
 *  ngồi nghiêm túc, phòng nhóm là chỗ ngồi cùng nhóm, còn đây là chỗ ngồi một
 *  mình với ly cà phê và một cuốn sách; ba kiểu học khác nhau, và người ta
 *  không phải lúc nào cũng muốn kiểu thứ nhất.
 *
 *  Bàn ghế là ghế nhựa thấp và bàn inox, xếp quay ra phía cửa - đúng cách quán
 *  vỉa hè Sài Gòn xếp bàn, vì người ta ngồi để nhìn ra đường. */
export const CAFE_X = 18;

const CAFE_W = 20;
const CAFE_D = 22;

/** Bàn cà phê: một dãy sát cửa nhìn ra phố, một dãy trong góc yên tĩnh. */
export const CAFE_TABLES: Array<[number, number]> = [
  [-6, 6.5],
  [-2, 6.5],
  [2, 6.5],
  [6, 6.5],
  [-6.4, 0.5],
  [-6.4, -3.5],
  [6.4, 0.5],
  [6.4, -3.5],
];

/** Kệ sách tài chính dọc tường bắc. */
export const CAFE_SHELF_XS = [-5.5, 0, 5.5];
export const CAFE_SHELF_Z = -CAFE_D / 2 + 0.35;

/** Quầy pha chế ở góc tây bắc. */
/** Quầy lùi lên phía tường bắc để không chạm dãy bàn góc tây - hai vùng chặn
 *  chạm nhau là kẹt người, xem lib/walkable-space.ts. */
export const CAFE_COUNTER = { x: -CAFE_W / 2 + 1.4, z: -8, halfW: 1.2, halfD: 1.2 };

/** Chậu cây và đèn dây - phần "chill" của quán. */
export const CAFE_PLANTS: Array<[number, number]> = [
  [CAFE_W / 2 - 1.4, CAFE_D / 2 - 2],
  [-CAFE_W / 2 + 1.4, CAFE_D / 2 - 2],
];

const CAFE_ROOM: DistrictRoom = (() => {
  const halfW = CAFE_W / 2;
  const halfD = CAFE_D / 2;
  // Mỗi bàn một chỗ ngồi, quay mặt về phía bàn.
  const seats: CafeSeat[] = CAFE_TABLES.map(([x, z], i) => ({
    index: i,
    x,
    z: z + 1.15,
    ry: 0,
  }));
  return {
    id: "quan-ca-phe",
    label: "Cà phê Số & Sách",
    kind: "office",
    accent: "#fbbf24",
    size: { width: CAFE_W, depth: CAFE_D, height: 4.6 },
    bounds: { minX: -halfW + 0.8, maxX: halfW - 0.8, minZ: -halfD + 0.8, maxZ: halfD - 0.8 },
    obstacles: [
      ...CAFE_TABLES.map(([x, z]): CircleObstacle => ({ kind: "circle", x, z, radius: 0.62 })),
      ...CAFE_SHELF_XS.map((x): BoxObstacle => ({ kind: "box", x, z: CAFE_SHELF_Z, halfW: 1.5, halfD: 0.35 })),
      {
        kind: "box",
        x: CAFE_COUNTER.x,
        z: CAFE_COUNTER.z,
        halfW: CAFE_COUNTER.halfW,
        halfD: CAFE_COUNTER.halfD,
      },
      ...CAFE_PLANTS.map(([x, z]): CircleObstacle => ({ kind: "circle", x, z, radius: 0.5 })),
    ],
    desks: [],
    portals: [],
    lift: null,
    seats,
    doorways: [
      {
        id: "quan-ca-phe-exit",
        to: "street",
        x: 0,
        z: halfD - 0.5,
        reach: 2.2,
        label: "Ra phố",
        arriveAt: { x: CAFE_X, z: -3.4, ry: Math.PI / 2 },
        accent: "#fbbf24",
      },
    ],
  };
})();

/** Đứng gần hơn khoảng này thì mời ngồi. */
export const CAFE_SEAT_REACH = 1.9;

/** Chỗ ngồi trống gần nhất trong tầm, hoặc null. */
export function nearestCafeSeat(
  room: DistrictRoom,
  x: number,
  z: number,
  taken: ReadonlySet<number>
): CafeSeat | null {
  let best: CafeSeat | null = null;
  let bestDist = CAFE_SEAT_REACH;
  for (const seat of room.seats ?? []) {
    if (taken.has(seat.index)) continue;
    const d = Math.hypot(seat.x - x, seat.z - z);
    if (d < bestDist) {
      bestDist = d;
      best = seat;
    }
  }
  return best;
}

const STREET_ROOM: DistrictRoom = {
  id: "street",
  label: "Phố nghề Sài Gòn",
  kind: "street",
  accent: "#fbbf24",
  size: { width: STREET.halfLength * 2, depth: 26, height: STREET.height },
  bounds: {
    minX: -STREET.halfLength + 1,
    maxX: STREET.halfLength - 1,
    minZ: STREET.walkMinZ,
    maxZ: STREET.walkMaxZ,
  },
  obstacles: [
    // Hai trụ cổng ở đầu phố. Là vật cản thật để người học đi vòng qua chúng
    // và nhận ra chúng là cửa, thay vì lướt qua một tấm biển phẳng.
    ...GATE_XS.map((x): CircleObstacle => ({ kind: "circle", x, z: GATE_PILLAR_Z, radius: 0.6 })),
    ...STREET_TREE_XS.map((x): CircleObstacle => ({ kind: "circle", x, z: TREE_Z, radius: 0.55 })),
    ...LAMP_XS.map((x): CircleObstacle => ({ kind: "circle", x, z: LAMP_Z, radius: 0.3 })),
    ...BIKE_SPOTS.map(([x, z]): BoxObstacle => ({ kind: "box", x, z, halfW: 0.85, halfD: 0.4 })),
  ],
  desks: [],
  /** Đầu tây con phố mở sang hai thế giới 3D còn lại.
   *
   *  Chúng là RouterPortal chứ không phải Doorway: thư viện và phòng nhóm là
   *  hai cảnh three.js riêng ở hai địa chỉ riêng, không phải hai căn phòng của
   *  khu phố này. Gộp chúng thành một cảnh duy nhất sẽ phải nạp cả ba thế giới
   *  mỗi lần vào bất kỳ cái nào. */
  portals: [
    {
      id: "toi-thu-vien",
      x: GATE_XS[0],
      z: GATE_Z,
      reach: 2.8,
      label: "Thư viện Sài Gòn",
      blurb: "Phòng đọc chung, gặp người khác đang học",
      href: "/cong-dong",
      accent: "#e5b567",
    },
    {
      id: "toi-nhom-hoc",
      x: GATE_XS[1],
      z: GATE_Z,
      reach: 2.8,
      label: "Phòng học nhóm",
      blurb: "Bàn tám ghế, phiên học 25 phút cùng nhóm",
      href: "/nhom-hoc",
      accent: "#34d399",
    },
  ],
  lift: null,
  doorways: [
    {
      id: "door-quan-ca-phe",
      to: "quan-ca-phe" as DistrictRoomId,
      x: CAFE_X,
      z: STREET.walkMaxZ - 0.4,
      reach: 2.6,
      label: "Cà phê Số & Sách",
      arriveAt: { x: 0, z: CAFE_D / 2 - 3, ry: 0 },
      accent: "#fbbf24",
    },
    {
      id: "door-cong-vien",
      to: "cong-vien" as DistrictRoomId,
      x: PARK_X,
      z: STREET.walkMaxZ - 0.4,
      reach: 2.6,
      label: "Công viên Bến Nghé",
      arriveAt: { x: 0, z: PARK_D / 2 - 3, ry: 0 },
      accent: "#4ade80",
    },
    {
      id: "door-trung-tam",
      to: "trung-tam" as DistrictRoomId,
      x: CENTER_X,
      z: STREET.walkMaxZ - 0.4,
      reach: 2.6,
      label: "Quảng trường Trung tâm",
      arriveAt: { x: 0, z: CENTER_D / 2 - 3, ry: 0 },
      accent: "#fbbf24",
    },
    {
      id: "door-khu-game",
      to: "khu-game" as DistrictRoomId,
      x: GAME_SQUARE_X,
      z: STREET.facadeZ + 1.4,
      reach: 2.6,
      label: "Quảng trường Game",
      // Đứng lùi hẳn vào quảng trường, không đứng sát cửa: camera bám sau lưng
      // ~5m và bị kẹp trong khung phòng, nên đứng sát cửa là nó dí vào gáy.
      arriveAt: { x: 0, z: SQUARE_D / 2 - 6, ry: 0 },
      accent: "#f472b6",
    },
    {
      id: "door-thap",
      to: "thap" as DistrictRoomId,
      x: TOWER_X,
      z: STREET.facadeZ + 1.4,
      reach: 2.6,
      label: "Tháp Tự Học",
      arriveAt: { x: 0, z: TOWER_HALF_D - 3.8, ry: 0 },
      accent: "#fbbf24",
    },
    ...CAREER_CATEGORY_ORDER.map((category) => ({
      id: `door-${category}`,
      to: category,
      x: SHOP_X[category],
      z: STREET.facadeZ + 1.4,
      reach: 2.3,
      label: CAREER_CATEGORY_LABELS[category],
      arriveAt: { x: 0, z: roomDepthFor(careersIn(category).length) / 2 - 2.2, ry: 0 },
      accent: CAREER_CATEGORY_COLORS[category],
    })),
  ],
};

export const DISTRICT_ROOMS: Record<string, DistrictRoom> = Object.fromEntries(
  [STREET_ROOM, TOWER_LOBBY, STAGE_FLOOR, GAME_SQUARE, PARK_ROOM, CENTER_ROOM, CAFE_ROOM, ...OFFICES, ...FLOORS].map(
    (r) => [r.id, r]
  )
);

export function getRoom(id: DistrictRoomId): DistrictRoom {
  const room = DISTRICT_ROOMS[id] ?? pathRoomCache.get(id);
  if (!room) throw new Error(`Không có phòng nào tên "${id}" trong khu phố nghề`);
  return room;
}

/** Cổng gần nhất trong tầm, hoặc null. */
export function nearestPortal(room: DistrictRoom, x: number, z: number): RoomPortal | null {
  let best: RoomPortal | null = null;
  let bestDist = Infinity;
  for (const p of room.portals) {
    const dist = Math.hypot(p.x - x, p.z - z);
    if (dist <= p.reach && dist < bestDist) {
      bestDist = dist;
      best = p;
    }
  }
  return best;
}

/** Đang đứng trong buồng thang máy chưa. */
export function isAtLift(room: DistrictRoom, x: number, z: number): boolean {
  return !!room.lift && Math.hypot(room.lift.x - x, room.lift.z - z) <= room.lift.reach;
}

/** Số nghề trong một nhóm, dùng cho biển hiệu và bảng trong phòng. */
export function careerCountIn(category: CareerCategory) {
  return careersIn(category).length;
}

export { CAREER_CATEGORY_BLURBS };

// ── Đi lại ──────────────────────────────────────────────────────────────────

/** Kẹp vào khung đi lại rồi đẩy ra khỏi đồ đạc của ĐÚNG phòng đang đứng. */
export function moveWithin(room: DistrictRoom, x: number, z: number, bodyRadius = BODY_RADIUS) {
  const cx = Math.max(room.bounds.minX, Math.min(room.bounds.maxX, x));
  const cz = Math.max(room.bounds.minZ, Math.min(room.bounds.maxZ, z));
  return resolveObstacles(room.obstacles, cx, cz, bodyRadius);
}

/** Cửa gần nhất trong tầm, hoặc null. */
export function nearestDoorway(room: DistrictRoom, x: number, z: number): Doorway | null {
  let best: Doorway | null = null;
  let bestDist = Infinity;
  for (const d of room.doorways) {
    const dist = Math.hypot(d.x - x, d.z - z);
    if (dist <= d.reach && dist < bestDist) {
      bestDist = dist;
      best = d;
    }
  }
  return best;
}

/** Đứng gần hơn khoảng này thì thẻ giới thiệu nghề hiện lên. */
export const DESK_REACH = 2.1;

/** Bàn nghề gần nhất trong tầm, hoặc null. */
export function nearestDesk(room: DistrictRoom, x: number, z: number): CareerDesk | null {
  let best: CareerDesk | null = null;
  let bestDist = DESK_REACH;
  for (const d of room.desks) {
    const dist = Math.hypot(d.x - x, d.z - z);
    if (dist < bestDist) {
      bestDist = dist;
      best = d;
    }
  }
  return best;
}

// ── Phòng lộ trình ──────────────────────────────────────────────────────────

/** Một chặng đường học, dựng thành hành lang đi được: mỗi bài là một cột đá
 *  dọc hai bên, đi hết hành lang là hết lộ trình.
 *
 *  Đây là chỗ thế giới 3D nói được thứ mà danh sách phẳng không nói: lộ trình
 *  DÀI bao nhiêu là thứ nhìn thấy bằng mắt, và bài đã học sáng lên phía sau
 *  lưng trong khi phần chưa học còn tối phía trước. Một danh sách 20 dòng
 *  không tạo ra cảm giác đó.
 *
 *  Phòng dựng THEO YÊU CẦU chứ không dựng sẵn: 44 nghề cộng vài chục chặng là
 *  gần một trăm căn phòng, và người học chỉ vào một hai căn mỗi phiên. Dựng
 *  sẵn hết chỉ để chúng nằm im trong bộ nhớ. */
export interface PathStop {
  /** Slug bài học, hoặc id bất kỳ mà phía gọi tra ngược được. */
  slug: string;
  index: number;
  x: number;
  z: number;
}

const PATH_HALF_W = 4.6;
const PATH_PITCH = 3.2;
const PATH_STOP_X = 2.9;

/** Đứng gần hơn khoảng này thì thẻ bài học hiện lên. */
export const PATH_REACH = 2.2;

const pathRoomCache = new Map<string, DistrictRoom>();

export function buildPathRoom(
  id: string,
  label: string,
  accent: string,
  slugs: string[],
  back: { to: DistrictRoomId; label: string; arriveAt: Pose }
): DistrictRoom {
  const cached = pathRoomCache.get(id);
  if (cached) return cached;

  const rows = Math.max(1, Math.ceil(slugs.length / 2));
  const depth = Math.max(14, rows * PATH_PITCH + 9);
  const halfD = depth / 2;
  const firstZ = -halfD + 5;

  const stops: PathStop[] = slugs.map((slug, i) => ({
    slug,
    index: i,
    x: (i % 2 === 0 ? -1 : 1) * PATH_STOP_X,
    z: firstZ + Math.floor(i / 2) * PATH_PITCH,
  }));

  const room: DistrictRoom = {
    id: id as DistrictRoomId,
    label,
    kind: "office",
    accent,
    size: { width: PATH_HALF_W * 2, depth, height: 4.2 },
    bounds: { minX: -PATH_HALF_W + 0.6, maxX: PATH_HALF_W - 0.6, minZ: -halfD + 0.6, maxZ: halfD - 0.6 },
    // Cột đá là vật cản: đi vòng qua chúng chính là cái làm hành lang có nhịp,
    // và cũng là thứ ngăn người học lướt thẳng từ đầu tới cuối mà không nhìn.
    obstacles: stops.map((s): CircleObstacle => ({ kind: "circle", x: s.x, z: s.z, radius: 0.55 })),
    desks: [],
    portals: [],
    lift: null,
    doorways: [
      {
        id: `${id}-back`,
        to: back.to,
        x: 0,
        z: halfD - 0.5,
        reach: 2,
        label: back.label,
        arriveAt: back.arriveAt,
        accent,
      },
    ],
    stops,
  };
  pathRoomCache.set(id, room);
  return room;
}

/** Cột bài học gần nhất trong tầm, hoặc null. */
export function nearestStop(room: DistrictRoom, x: number, z: number): PathStop | null {
  let best: PathStop | null = null;
  let bestDist = PATH_REACH;
  for (const s of room.stops ?? []) {
    const dist = Math.hypot(s.x - x, s.z - z);
    if (dist < bestDist) {
      bestDist = dist;
      best = s;
    }
  }
  return best;
}
