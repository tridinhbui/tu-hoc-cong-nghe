// Tên và phụ đề 13 địa điểm của Thế Giới Game Tài Chính.
//
// Chúng từng là literal trong lib/rpg-buildings.ts, và không cổng nào nhìn
// thấy: `i18n-scan` chỉ quét components/ và app/, còn `i18n-coverage` chỉ chấm
// các vị trí hiển thị trong .tsx. Một người đọc tiếng Anh mở bản đồ ra thấy
// mười ba tấm thẻ tiếng Việt trên một trang tiếng Anh.
//
// Chỉ CHỮ ở đây; id, màu, vị trí, ảnh và minLevel vẫn nằm nguyên trong
// lib/rpg-buildings.ts - cùng cách stationsOf() và districtRoomsOf() đã tách.
export const rpgBuildingsCopyVi = {
  rpgBuildings: {
    "world-boss": { name: "Sàn NYSE & Boss Phố Wall", subtitle: "Săn Bò Tót Tăng Trưởng 1,000,000 HP", badge: "🏛️ NYSE CENTRAL" },
    pvp: { name: "Đấu Trường Kiến Thức Solo", subtitle: "Đánh Boss bằng câu hỏi từ bài bạn đã học", badge: "🏛️ NYSE CENTRAL" },
    arcade: { name: "🔥 TỔNG HỢP MINI GAME", subtitle: "Tất Cả Game Phân Loại BCTC & Nối Thuật Ngữ", badge: "🔥 TỔNG HỢP MINI GAME" },
    "weekly-challenge": { name: "Quảng Trường Times Square Hub", subtitle: "Case Study Doanh Nghiệp & Bảng Tin Neon Phố Wall", badge: "🏙️ TIMES SQUARE" },
    "goldman-sachs": { name: "Tập Đoàn Goldman Sachs Investment Bank", subtitle: "Đấu Trường M&A Dealmaking, Định Giá & IPO Pitching", badge: "🏛️ GOLDMAN SACHS WALL ST." },
    cards: { name: "Bảo Tàng Thẻ VN30", subtitle: "Bộ Sưu Tập 30 Thẻ Doanh Nghiệp 3D", badge: "🏰 HEDGE FUND QUARTER" },
    shop: { name: "Tiệm Đồ Executive Wall St.", subtitle: "Trang Bị Dụng Cụ & Tủ Đồ RPG", badge: "🏰 HEDGE FUND QUARTER" },
    "fed-vault": { name: "Cục Dự Trữ Liên Bang Fed", subtitle: "Kho Thỏi Vàng & Mô Phỏng Lãi Suất Vĩ Mô", badge: "🏛️ US FEDERAL RESERVE" },
    "silicon-bay": { name: "Đảo Silicon FinTech Bay", subtitle: "Venture Capital & Algo AI Trading", badge: "🚀 SILICON BAY" },
    "capitol-hill": { name: "Tập Đoàn Blackstone Private Equity", subtitle: "Quỹ Đầu Tư Tư Nhân & M&A Bất Động Sản Triệu Đô", badge: "🏛️ BLACKSTONE CAPITAL" },
    "cme-commodities": { name: "Sàn Hàng Hóa Chicago CME", subtitle: "Hợp Đồng Tương Lai Dầu Mỏ & Vàng CME", badge: "🌾 CME COMMODITY" },
    "swiss-haven": { name: "Đại Lộ Thụy Sĩ Wealth Haven", subtitle: "Quản Lý Tài Sản Triệu Đô & Quỹ Gia Tộc", badge: "💎 SWISS HAVEN" },
    "singapore-dock": { name: "Cảng Thương Mại Singapore", subtitle: "Tài Chính Chuỗi Cung Ứng & Tín Dụng L/C", badge: "🚢 SINGAPORE DOCK" },
  },
};

export const rpgBuildingsCopyEn: typeof rpgBuildingsCopyVi = {
  rpgBuildings: {
    "world-boss": { name: "NYSE Floor & Wall Street Boss", subtitle: "Hunt the Growth Bull, 1,000,000 HP", badge: "🏛️ NYSE CENTRAL" },
    pvp: { name: "Solo Knowledge Arena", subtitle: "Fight the boss with questions from lessons you have studied", badge: "🏛️ NYSE CENTRAL" },
    arcade: { name: "🔥 ALL MINI GAMES", subtitle: "Every game: statement sorting and term matching", badge: "🔥 ALL MINI GAMES" },
    "weekly-challenge": { name: "Times Square Hub", subtitle: "Company case studies and the Wall Street neon ticker", badge: "🏙️ TIMES SQUARE" },
    "goldman-sachs": { name: "Goldman Sachs Investment Bank", subtitle: "M&A dealmaking, valuation and IPO pitching arena", badge: "🏛️ GOLDMAN SACHS WALL ST." },
    cards: { name: "VN30 Card Museum", subtitle: "A collection of 30 company cards in 3D", badge: "🏰 HEDGE FUND QUARTER" },
    shop: { name: "Executive Wall St. Store", subtitle: "Gear and the RPG locker", badge: "🏰 HEDGE FUND QUARTER" },
    "fed-vault": { name: "The Federal Reserve", subtitle: "Gold vault and macro interest-rate simulation", badge: "🏛️ US FEDERAL RESERVE" },
    "silicon-bay": { name: "Silicon FinTech Bay", subtitle: "Venture capital and algo AI trading", badge: "🚀 SILICON BAY" },
    "capitol-hill": { name: "Blackstone Private Equity", subtitle: "Private equity funds and million-dollar property M&A", badge: "🏛️ BLACKSTONE CAPITAL" },
    "cme-commodities": { name: "Chicago CME Commodity Floor", subtitle: "CME crude oil and gold futures", badge: "🌾 CME COMMODITY" },
    "swiss-haven": { name: "Swiss Avenue Wealth Haven", subtitle: "Million-dollar wealth management and family offices", badge: "💎 SWISS HAVEN" },
    "singapore-dock": { name: "Port of Singapore", subtitle: "Supply-chain finance and L/C credit", badge: "🚢 SINGAPORE DOCK" },
  },
};
