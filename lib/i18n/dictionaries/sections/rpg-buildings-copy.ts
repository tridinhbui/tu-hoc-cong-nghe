// Tên và phụ đề 13 địa điểm của Thế Giới Game Công Nghệ.
//
// Chúng từng là literal trong lib/rpg-buildings.ts, và không cổng nào nhìn
// thấy: `i18n-scan` chỉ quét components/ và app/, còn `i18n-coverage` chỉ chấm
// các vị trí hiển thị trong .tsx. Một người đọc tiếng Anh mở bản đồ ra thấy
// mười ba tấm thẻ tiếng Việt trên một trang tiếng Anh.
//
// Chỉ CHỮ ở đây; id, màu, vị trí, ảnh và minLevel vẫn nằm nguyên trong
// lib/rpg-buildings.ts - cùng cách stationsOf() và districtRoomsOf() đã tách.
//
// Các id (`goldman-sachs`, `fed-vault`, `cme-commodities`, …) và tên tệp ảnh
// giữ nguyên tên cũ từ thời kho bài còn là tài chính. Chúng là khoá tra cứu và
// đường dẫn tài nguyên, không phải chữ hiển thị: đổi id sẽ làm mất tiến độ mở
// khoá đã lưu của người học, đổi tên ảnh thì phải đổi cả tệp trong public/.
// Chỉ phần chữ ở dưới là thứ người học đọc.
export const rpgBuildingsCopyVi = {
  rpgBuildings: {
    "world-boss": { name: "Trung Tâm Sự Cố & Boss Hệ Thống", subtitle: "Săn Boss Sập Hệ Thống 1.000.000 HP", badge: "🏛️ Server CENTRAL" },
    pvp: { name: "Đấu Trường Kiến Thức Solo", subtitle: "Đánh Boss bằng câu hỏi từ bài bạn đã học", badge: "🏛️ Server CENTRAL" },
    arcade: { name: "🔥 TỔNG HỢP MINI GAME", subtitle: "Tất Cả Game Phân Loại Log & Nối Thuật Ngữ", badge: "🔥 TỔNG HỢP MINI GAME" },
    "weekly-challenge": { name: "Quảng Trường Dev Square Hub", subtitle: "Case Study Hệ Thống & Bảng Tin Sự Cố Silicon Valley", badge: "🏙️ DEV SQUARE" },
    "goldman-sachs": { name: "Trung Tâm Dữ Liệu Silicon Valley", subtitle: "Đấu Trường Thiết Kế Hệ Thống, Định Mức Dung Lượng & Bảo Vệ Phương Án", badge: "🏛️ SILICON VALLEY DC" },
    cards: { name: "Bảo Tàng Thẻ Công Nghệ", subtitle: "Bộ Sưu Tập 30 Thẻ Công Nghệ 3D", badge: "🏰 KHU KỸ SƯ" },
    shop: { name: "Tiệm Đồ Kỹ Sư Trưởng", subtitle: "Trang Bị Dụng Cụ & Tủ Đồ RPG", badge: "🏰 KHU KỸ SƯ" },
    "fed-vault": { name: "Trung Tâm Xương Sống Internet", subtitle: "Kho Chứng Chỉ & Mô Phỏng Định Tuyến Toàn Cầu", badge: "🌐 INTERNET BACKBONE" },
    "silicon-bay": { name: "Đảo Silicon AI Bay", subtitle: "Vườn Ươm Startup & Mô Hình AI Trong Sản Phẩm", badge: "🚀 SILICON BAY" },
    "capitol-hill": { name: "Tập Đoàn Hạ Tầng Đám Mây", subtitle: "Thuê Vùng Máy Chủ & Di Trú Hệ Thống Triệu Đô", badge: "🏛️ CLOUD CAPITAL" },
    "cme-commodities": { name: "Sàn Tài Nguyên Chicago", subtitle: "Định Mức GPU & Điện Năng Trung Tâm Dữ Liệu", badge: "⚡ RESOURCE FLOOR" },
    "swiss-haven": { name: "Đại Lộ Thụy Sĩ Data Haven", subtitle: "Chủ Quyền Dữ Liệu & Kho Lưu Trữ Riêng", badge: "💎 SWISS HAVEN" },
    "singapore-dock": { name: "Cảng Dữ Liệu Singapore", subtitle: "Pipeline Dữ Liệu & Hàng Đợi Xuyên Vùng", badge: "🚢 SINGAPORE DOCK" },
  },
};

export const rpgBuildingsCopyEn: typeof rpgBuildingsCopyVi = {
  rpgBuildings: {
    "world-boss": { name: "Incident Center & System Boss", subtitle: "Hunt the Outage Boss, 1,000,000 HP", badge: "🏛️ Server CENTRAL" },
    pvp: { name: "Solo Knowledge Arena", subtitle: "Fight the boss with questions from lessons you have studied", badge: "🏛️ Server CENTRAL" },
    arcade: { name: "🔥 ALL MINI GAMES", subtitle: "Every game: log sorting and term matching", badge: "🔥 ALL MINI GAMES" },
    "weekly-challenge": { name: "Dev Square Hub", subtitle: "System case studies and the Silicon Valley incident ticker", badge: "🏙️ DEV SQUARE" },
    "goldman-sachs": { name: "Silicon Valley Data Center", subtitle: "System design, capacity sizing and design-defence arena", badge: "🏛️ SILICON VALLEY DC" },
    cards: { name: "Technology Card Museum", subtitle: "A collection of 30 technology cards in 3D", badge: "🏰 ENGINEER QUARTER" },
    shop: { name: "Principal Engineer's Store", subtitle: "Gear and the RPG locker", badge: "🏰 ENGINEER QUARTER" },
    "fed-vault": { name: "Internet Backbone Center", subtitle: "Certificate vault and global routing simulation", badge: "🌐 INTERNET BACKBONE" },
    "silicon-bay": { name: "Silicon AI Bay", subtitle: "Startup incubator and AI models in production", badge: "🚀 SILICON BAY" },
    "capitol-hill": { name: "Cloud Infrastructure Group", subtitle: "Renting server regions and million-dollar system migrations", badge: "🏛️ CLOUD CAPITAL" },
    "cme-commodities": { name: "Chicago Resource Floor", subtitle: "GPU quotas and data-centre power", badge: "⚡ RESOURCE FLOOR" },
    "swiss-haven": { name: "Swiss Avenue Data Haven", subtitle: "Data sovereignty and private storage vaults", badge: "💎 SWISS HAVEN" },
    "singapore-dock": { name: "Port of Singapore Data Dock", subtitle: "Data pipelines and cross-region queues", badge: "🚢 SINGAPORE DOCK" },
  },
};
