import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

/** Mười ba địa điểm của Thế Giới Game Tài Chính.
 *
 *  Tách khỏi TechRpgWorldMap để khu game trong thế giới 3D dựng được từ
 *  ĐÚNG danh sách này. Trước đó nó là một const nằm trong một client component
 *  923 dòng - muốn dùng lại phải kéo cả component vào bundle, mà chép lại thì
 *  hai bản đồ sẽ lệch nhau ngay lần thêm địa điểm đầu tiên.
 *
 *  Các trường bgLight/posClass/desktopClass là của riêng bản đồ 2D; thế giới 3D
 *  chỉ đọc id, tên, phụ đề, emoji và minLevel. Để nguyên chúng ở đây thay vì
 *  tách làm hai kiểu, vì một danh sách là một danh sách. */

export interface OrganicBuildingStruct {
  id: string;
  emoji: string;
  bgLight: string;
  borderColor: string;
  textColor: string;
  badgeBg: string;
  posClass: string;
  desktopClass: string;
  imageSrc?: string;
  isUnderConstruction?: boolean;
  minLevel?: number;
}

const BUILDING_STRUCT: OrganicBuildingStruct[] = [
  // KHU VỰC 1: SÀN GIAO DỊCH NYSE & TRADING PIT
  {
    id: "world-boss",
    emoji: "🐂",
    bgLight: "bg-gradient-to-br from-amber-500/15 via-red-500/10 to-amber-500/5",
    borderColor: "border-amber-400 ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/10",
    textColor: "text-amber-700 dark:text-amber-400",
    badgeBg: "bg-gradient-to-r from-amber-500 to-red-500 text-white font-black",
    posClass: "top-4 left-1/2 -translate-x-1/2 sm:top-6",
    desktopClass: "lg:col-start-2 lg:row-start-1",
    imageSrc: "/boss-wallstreet-bull.png",
  },
  {
    id: "pvp",
    emoji: "🧠",
    bgLight: "bg-gradient-to-br from-sky-50 via-emerald-50/50 to-sky-100/30",
    borderColor: "border-sky-300 ring-1 ring-sky-400/30",
    textColor: "text-sky-700 dark:text-sky-400",
    badgeBg: "bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-black",
    posClass: "top-20 left-6 sm:left-12",
    desktopClass: "lg:col-start-1 lg:row-start-2",
    imageSrc: "/images/dau-truong-kien-thuc.jpg",
  },
  // KHU VỰC 2: TRUNG TÂM LUYỆN TẬP BCTC & KHÁI NIỆM
  {
    id: "arcade",
    emoji: "🏛️",
    bgLight: "bg-gradient-to-br from-amber-500/25 via-orange-500/20 to-red-500/25",
    borderColor: "border-amber-400 ring-4 ring-amber-500/80 shadow-[0_0_40px_rgba(245,158,11,0.6)]",
    textColor: "text-amber-800 dark:text-amber-300 font-black",
    badgeBg: "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-black animate-pulse",
    posClass: "top-64 left-1/2 -translate-x-1/2 sm:top-60 scale-110 sm:scale-125 z-30",
    desktopClass: "lg:col-start-2 lg:row-start-3",
    imageSrc: "/images/dau-truong-kien-thuc.jpg",
  },
  {
    id: "weekly-challenge",
    emoji: "🏙️",
    bgLight: "bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50",
    borderColor: "border-purple-300 ring-1 ring-purple-400/40 shadow-sm",
    textColor: "text-purple-900 font-black",
    badgeBg: "bg-gradient-to-r from-violet-600 via-purple-500 to-rose-600 text-white font-black animate-pulse",
    posClass: "top-[320px] left-8 sm:left-20",
    desktopClass: "lg:col-start-1 lg:row-start-4",
    imageSrc: "/times-square.jpg",
  },

  // KHU VỰC 3: QUỸ ĐẦU TƯ & NGÂN HÀNG ĐẦU TƯ
  {
    id: "goldman-sachs",
    emoji: "🏛️",
    bgLight: "bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-50",
    borderColor: "border-sky-400 ring-2 ring-sky-400/40 shadow-lg shadow-sky-500/10",
    textColor: "text-sky-800 dark:text-sky-300 font-black",
    badgeBg: "bg-gradient-to-r from-sky-600 via-indigo-600 to-slate-800 text-white font-black",
    posClass: "top-[320px] right-8 sm:right-20",
    desktopClass: "lg:col-start-3 lg:row-start-4",
    imageSrc: "/rpg/goldman_sachs.png",
  },
  {
    id: "cards",
    emoji: "📇",
    bgLight: "bg-gradient-to-br from-sky-50 via-cyan-50/50 to-teal-100/30",
    borderColor: "border-sky-400 ring-1 ring-sky-400/30",
    textColor: "text-sky-700 dark:text-sky-400",
    badgeBg: "bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-black",
    posClass: "top-[480px] left-12 sm:left-28",
    desktopClass: "lg:col-start-1 lg:row-start-6",
    imageSrc: "/rpg/vn30-market.png",
  },
  {
    id: "shop",
    emoji: "💼",
    bgLight: "bg-gradient-to-br from-amber-50 via-yellow-50/50 to-orange-100/30",
    borderColor: "border-amber-400 ring-1 ring-amber-400/30",
    textColor: "text-amber-700 dark:text-amber-400",
    badgeBg: "bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-black",
    posClass: "top-[480px] right-12 sm:right-28",
    desktopClass: "lg:col-start-3 lg:row-start-6",
    imageSrc: "/rpg/wolf_of_wall_street.jpg",
  },

  // 🏗️ KHU VỰC 4: VÙNG ĐẤT TÀI CHÍNH TOÀN CẦU
  {
    id: "fed-vault",
    emoji: "🏦",
    bgLight: "bg-gradient-to-br from-amber-50/80 via-yellow-50 to-stone-100",
    borderColor: "border-amber-400 ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/10",
    textColor: "text-amber-800 dark:text-amber-300 font-black",
    badgeBg: "bg-gradient-to-r from-amber-600 to-stone-700 text-white font-black",
    posClass: "top-[620px] left-1/2 -translate-x-1/2",
    desktopClass: "lg:col-start-2 lg:row-start-7",
    imageSrc: "/rpg/fed_reserve.jpg",
  },
  {
    id: "silicon-bay",
    emoji: "🌐",
    bgLight: "bg-gradient-to-br from-cyan-50/80 via-teal-50 to-blue-50",
    borderColor: "border-cyan-400 ring-1 ring-cyan-400/40",
    textColor: "text-cyan-900 font-black",
    badgeBg: "bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 text-white font-black",
    posClass: "top-[760px] left-8 sm:left-20",
    desktopClass: "lg:col-start-1 lg:row-start-8",
    imageSrc: "/rpg/silicon_valley.png",
  },
  {
    id: "capitol-hill",
    emoji: "🏬",
    bgLight: "bg-gradient-to-br from-stone-100 via-stone-50 to-stone-200",
    borderColor: "border-stone-400 ring-1 ring-stone-400/40",
    textColor: "text-stone-900 font-black",
    badgeBg: "bg-gradient-to-r from-stone-900 via-stone-800 to-stone-950 text-white font-black",
    posClass: "top-[760px] right-8 sm:right-20",
    desktopClass: "lg:col-start-3 lg:row-start-8",
    imageSrc: "/rpg/blackstone.png",
  },
  {
    id: "cme-commodities",
    emoji: "🛢️",
    bgLight: "bg-gradient-to-br from-emerald-50/80 via-green-50 to-teal-50",
    borderColor: "border-emerald-400 ring-1 ring-emerald-400/40",
    textColor: "text-emerald-900 font-black",
    badgeBg: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black",
    posClass: "top-[900px] left-12 sm:left-28",
    desktopClass: "lg:col-start-1 lg:row-start-9",
    imageSrc: "/rpg/chicago-board-of-trade.png",
  },
  {
    id: "swiss-haven",
    emoji: "💎",
    bgLight: "bg-gradient-to-br from-rose-50/80 via-pink-50 to-slate-50",
    borderColor: "border-rose-400 ring-1 ring-rose-400/40",
    textColor: "text-rose-900 font-black",
    badgeBg: "bg-gradient-to-r from-rose-600 via-pink-600 to-slate-700 text-white font-black",
    posClass: "top-[900px] right-12 sm:right-28",
    desktopClass: "lg:col-start-3 lg:row-start-9",
    imageSrc: "/rpg/empire_state_building.jpg",
  },
  {
    id: "singapore-dock",
    emoji: "🚢",
    bgLight: "bg-gradient-to-br from-blue-50/80 via-sky-50 to-indigo-50",
    borderColor: "border-blue-400 ring-1 ring-blue-400/40",
    textColor: "text-blue-900 font-black",
    badgeBg: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black",
    posClass: "top-[1040px] left-1/2 -translate-x-1/2",
    desktopClass: "lg:col-start-2 lg:row-start-10",
    imageSrc: "/rpg/singapore_dock.jpg",
  },
];

/** Địa điểm kèm chữ hiển thị theo ngôn ngữ đang xem.
 *
 *  Chữ nằm ở `t.rpgBuildings`, cấu trúc ở trên. Cùng hình dạng với
 *  `stationsOf()` và `districtRoomsOf()`: một danh sách là một danh sách, và
 *  bản chép thứ hai của nó sẽ lệch ngay lần thêm địa điểm đầu tiên. */
export interface OrganicBuilding extends OrganicBuildingStruct {
  name: string;
  subtitle: string;
  badge: string;
}

const buildingCache = new WeakMap<Dictionary, OrganicBuilding[]>();

export function organicBuildingsOf(t: Dictionary): OrganicBuilding[] {
  const cached = buildingCache.get(t);
  if (cached) return cached;
  const copy = t.rpgBuildings as Record<string, { name: string; subtitle: string; badge: string }>;
  const list = BUILDING_STRUCT.map((b) => ({ ...b, ...copy[b.id] }));
  buildingCache.set(t, list);
  return list;
}

/** Số địa điểm - dùng cho hình học và câu chữ đếm, không cần tới bản dịch. */
export const BUILDING_COUNT = BUILDING_STRUCT.length;
