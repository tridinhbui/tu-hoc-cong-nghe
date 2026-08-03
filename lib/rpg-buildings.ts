/** Mười ba địa điểm của Thế Giới Game Tài Chính.
 *
 *  Tách khỏi FinancialRpgWorldMap để khu game trong thế giới 3D dựng được từ
 *  ĐÚNG danh sách này. Trước đó nó là một const nằm trong một client component
 *  923 dòng - muốn dùng lại phải kéo cả component vào bundle, mà chép lại thì
 *  hai bản đồ sẽ lệch nhau ngay lần thêm địa điểm đầu tiên.
 *
 *  Các trường bgLight/posClass/desktopClass là của riêng bản đồ 2D; thế giới 3D
 *  chỉ đọc id, tên, phụ đề, emoji và minLevel. Để nguyên chúng ở đây thay vì
 *  tách làm hai kiểu, vì một danh sách là một danh sách. */

export interface OrganicBuilding {
  id: string;
  name: string;
  subtitle: string;
  emoji: string;
  badge: string;
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

export const ORGANIC_BUILDINGS: OrganicBuilding[] = [
  // KHU VỰC 1: SÀN GIAO DỊCH NYSE & TRADING PIT
  {
    id: "world-boss",
    name: "Sàn NYSE & Boss Phố Wall",
    subtitle: "Săn Bò Tót Tăng Trưởng 1,000,000 HP",
    emoji: "🐂",
    badge: "🏛️ NYSE CENTRAL",
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
    name: "Đấu Trường Kiến Thức Solo",
    subtitle: "Đánh Boss bằng câu hỏi từ bài bạn đã học",
    emoji: "🧠",
    badge: "🏛️ NYSE CENTRAL",
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
    name: "🔥 TỔNG HỢP MINI GAME",
    subtitle: "Tất Cả Game Phân Loại BCTC & Nối Thuật Ngữ",
    emoji: "🏛️",
    badge: "🔥 TỔNG HỢP MINI GAME",
    bgLight: "bg-gradient-to-br from-amber-500/25 via-orange-500/20 to-red-500/25",
    borderColor: "border-amber-400 ring-4 ring-amber-500/80 shadow-[0_0_40px_rgba(245,158,11,0.6)]",
    textColor: "text-amber-800 dark:text-amber-300 font-black",
    badgeBg: "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-black animate-pulse",
    posClass: "top-64 left-1/2 -translate-x-1/2 sm:top-60 scale-110 sm:scale-125 z-30",
    desktopClass: "lg:col-start-2 lg:row-start-3",
    imageSrc: "/nyse-building.jpg",
  },
  {
    id: "weekly-challenge",
    name: "Quảng Trường Times Square Hub",
    subtitle: "Case Study Doanh Nghiệp & Bảng Tin Neon Phố Wall",
    emoji: "🏙️",
    badge: "🏙️ TIMES SQUARE",
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
    name: "Tập Đoàn Goldman Sachs Investment Bank",
    subtitle: "Đấu Trường M&A Dealmaking, Định Giá & IPO Pitching",
    emoji: "🏛️",
    badge: "🏛️ GOLDMAN SACHS WALL ST.",
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
    name: "Bảo Tàng Thẻ VN30",
    subtitle: "Bộ Sưu Tập 30 Thẻ Doanh Nghiệp 3D",
    emoji: "📇",
    badge: "🏰 HEDGE FUND QUARTER",
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
    name: "Tiệm Đồ Executive Wall St.",
    subtitle: "Trang Bị Dụng Cụ & Tủ Đồ RPG",
    emoji: "💼",
    badge: "🏰 HEDGE FUND QUARTER",
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
    name: "Cục Dự Trữ Liên Bang Fed",
    subtitle: "Kho Thỏi Vàng & Mô Phỏng Lãi Suất Vĩ Mô",
    emoji: "🏦",
    badge: "🏛️ US FEDERAL RESERVE",
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
    name: "Đảo Silicon FinTech Bay",
    subtitle: "Venture Capital & Algo AI Trading",
    emoji: "🌐",
    badge: "🚀 SILICON BAY",
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
    name: "Tập Đoàn Blackstone Private Equity",
    subtitle: "Quỹ Đầu Tư Tư Nhân & M&A Bất Động Sản Triệu Đô",
    emoji: "🏬",
    badge: "🏛️ BLACKSTONE CAPITAL",
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
    name: "Sàn Hàng Hóa Chicago CME",
    subtitle: "Hợp Đồng Tương Lai Dầu Mỏ & Vàng CME",
    emoji: "🛢️",
    badge: "🌾 CME COMMODITY",
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
    name: "Đại Lộ Thụy Sĩ Wealth Haven",
    subtitle: "Quản Lý Tài Sản Triệu Đô & Quỹ Gia Tộc",
    emoji: "💎",
    badge: "💎 SWISS HAVEN",
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
    name: "Cảng Thương Mại Singapore",
    subtitle: "Tài Chính Chuỗi Cung Ứng & Tín Dụng L/C",
    emoji: "🚢",
    badge: "🚢 SINGAPORE DOCK",
    bgLight: "bg-gradient-to-br from-blue-50/80 via-sky-50 to-indigo-50",
    borderColor: "border-blue-400 ring-1 ring-blue-400/40",
    textColor: "text-blue-900 font-black",
    badgeBg: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black",
    posClass: "top-[1040px] left-1/2 -translate-x-1/2",
    desktopClass: "lg:col-start-2 lg:row-start-10",
    imageSrc: "/rpg/singapore_dock.jpg",
  },
];
