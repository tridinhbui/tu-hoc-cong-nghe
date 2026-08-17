// Nhãn của trình tuỳ biến avatar: tông da, màu và kiểu tóc, khuôn mặt, ánh
// mắt, kính, râu, trang phục, phụ kiện, nền, và ba bộ dựng sẵn.
//
// KHOÁ THEO `id` của từng lựa chọn, không theo vị trí. Khác với công thức hay
// chặng, `id` ở đây được GHI XUỐNG cấu hình avatar của người dùng - `hairStyle:
// "business-slick"` nằm trong hồ sơ đã lưu - nên nó là khoá ổn định nhất có
// thể, và khoá theo vị trí sẽ hỏng ngay lần thêm một lựa chọn vào giữa danh
// sách. Ba bộ dựng sẵn không có `id` nên khoá theo `name` tiếng Việt.
//
// MỘT BẢNG CHO MỖI NHÓM, không phải một bảng phẳng. `id` chỉ duy nhất TRONG
// nhóm: kính, râu và phụ kiện đều có `id: "none"` với ba nhãn khác nhau
// ("Không Dùng Kính" / "Không Râu" / "Không Phụ Kiện"), nên một Record phẳng
// chỉ giữ được một trong ba.
//
// Bản đầu của tệp này phẳng, và nó né va chạm đó bằng cách đặt khoá
// `no-glasses` / `no-accessory` - tức là ĐỔI `id` cho vừa cấu trúc. Từ đó trôi
// tiếp: 30 khoá được bịa ra từ nhãn ("Đen Tuyền" -> `jet-black`, `id` thật là
// `black`) và 28 `id` không có khoá nào. Tổng vẫn 71 = 71 nên đếm thì thấy đủ,
// còn `t.avatarOptions[x.id] ?? x.label` thì rơi lặng lẽ về tiếng Việt.
//
// lib/__tests__/avatar-options-i18n.test.ts gác cả hai chiều.
//
// MÀU (`hex`) và `config` của bộ dựng sẵn không nằm ở đây: chúng là dữ liệu
// được lưu, không phải chữ.
//
// Nhiều nhãn chơi chữ theo mô-típ phố Wall - "Vàng Kim Bò Tăng Trưởng",
// "Bể Vàng Kim Kho Báu", "Huyền Mạch". Bản Anh giữ mô-típ đó thay vì dịch sát:
// "Bull Market Gold", "Golden Vault", "Deepest". Dịch từng chữ sẽ ra một bảng
// màu nghe như catalogue sơn.
//
// Xem AGENTS.md, mục "Translating the UI".

export const avatarOptionsVi = {
  // Nhóm chủ đề của mục "Case chuyên sâu" trên dashboard. Sáu giá trị, dùng lại
  // cho ~90 slug trong lib/bonus-lesson-categories.ts.
  bonusCategories: {
    "Định giá doanh nghiệp": "Định giá doanh nghiệp",
    "Đọc báo cáo tài chính": "Đọc báo cáo tài chính",
    "Case công ty thực tế": "Case công ty thực tế",
    "Vốn & cổ đông": "Vốn & cổ đông",
    "Đầu tư & danh mục": "Đầu tư & danh mục",
    "Khác": "Khác",
  } as Record<string, string>,
  avatarOptions: {
    skinTones: {
      "fair": "Trắng Hồng",
      "natural": "Tự Nhiên",
      "warm-peach": "Đào Ấm",
      "olive": "Olive",
      "tan": "Rám Nắng",
      "bronze": "Đồng Rắn Rỏi",
      "dark": "Nâu Đậm",
      "deep": "Huyền Mạch",
    } as Record<string, string>,
    hairColors: {
      "black": "Đen Tuyền",
      "dark-brown": "Nâu Gỗ",
      "golden-blonde": "Vàng Vàng Wall St",
      "platinum": "Bạch Kim",
      "chestnut": "Nâu Hạt Dẻ",
      "burgundy": "Đỏ Rượu Burgundy",
      "silver-fox": "Xám Bạc Executive",
      "neon-cyan": "Xanh Cyber Trader",
    } as Record<string, string>,
    outfitColors: {
      "navy-suit": "Navy Silicon Valley",
      "midnight-black": "Đen Đêm Silicon Valley",
      "emerald-wealth": "Xanh Ngọc Bảo Vốn",
      "royal-blue": "Xanh Hoàng Gia",
      "deep-purple": "Tím Huyền Thoại Kiến Trúc",
      "crimson-red": "Đỏ Bùng Nổ VN30",
      "amber-gold": "Vàng Kim Bò Tăng Trưởng",
    } as Record<string, string>,
    hairStyles: {
      "business-slick": "Slick Back Doanh Nhân",
      "fade-cut": "Fade Cut Hiện Đại",
      "wavy-medium": "Bồng Bềnh Wavy",
      "bob-cut": "Bob Cut Quyền Lực",
      "long-curly": "Tóc Dài Uốn Lọn",
      "ponytail": "Cột Đuôi Ngựa CEO",
      "buzz-cut": "Buzz Cut Mạnh Mẽ",
      "afro": "Afro Độc Đáo",
      "short-classic": "Cổ Điển Wall St",
    } as Record<string, string>,
    faceShapes: {
      "oval": "Khuôn Mặt Trái Xoan",
      "square": "Góc Cạnh Vuông Vắn",
      "round": "Tròn Trĩnh Thân Thiện",
      "heart": "Hình Trái Tim Thẩm Mỹ",
    } as Record<string, string>,
    eyeExpressions: {
      "confident": "Tự Tin Sắc Sảo",
      "sharp": "Phân Tích Sắc Lạnh",
      "focused": "Tập Trung Cao Độ",
      "cheerful": "Tươi Cười Đón Lãi",
      "cool": "Điềm Tĩnh Ngầu",
    } as Record<string, string>,
    glasses: {
      "none": "Không Dùng Kính",
      "classic-black": "Kính Phân Tích BCTC",
      "gold-aviator": "Kính Phi Công Mạ Vàng",
      "analyst-round": "Kính Tròn Chuyên Gia",
      "tech-blue": "Kính Lọc Ánh Sáng Xanh",
      "cyber-hud": "Kính HUD Algo Trader",
    } as Record<string, string>,
    beards: {
      "none": "Không Râu",
      "stubble": "Râu Quai Nón Lịch Lãm",
      "gentleman-mustache": "Râu Mép Silicon Valley",
      "full-beard": "Râu Quai Nón Rậm",
      "goatee": "Râu Dê Chuyên Gia",
    } as Record<string, string>,
    outfitStyles: {
      "wall-st-suit": "Bộ Suit Silicon Valley Premium",
      "executive-vest": "Áo Ghê-lê Executive CFO",
      "trader-hoodie": "Hoodie Silicon Valley Trader",
      "cfo-blazer": "Áo Vest Blazer Quyền Lực",
      "casual-shirt": "Sơ Mi Thanh Lịch",
      "cyber-trader": "Giáp Kim Loại Quant Trader",
    } as Record<string, string>,
    accessories: {
      "none": "Không Phụ Kiện",
      "cfo-crown": "Vương Miện CFO Vàng",
      "rolex-watch": "Đồng Hồ Rolex Executive",
      "valuation-pen": "Bút Định Giá Thần Kỳ",
      "gold-necklace": "Dây Chuyền Vàng Bò Tăng Trưởng",
      "trophy-cup": "Cúp Vô Địch Server",
      "coffee-cup": "Tách Cà Phê Bloomberg",
    } as Record<string, string>,
    backgrounds: {
      "wallstreet-trading-floor": "Sàn Giao Dịch Server Silicon Valley",
      "penthouse-office": "Văn Phòng Penthouse Tầng 88",
      "gold-vault": "Bể Vàng Kim Kho Báu",
      "neon-broadway": "Quảng Trường Times Square Neon",
      "zen-garden": "Khu Vườn Zen Cân Bằng Tài Chính",
      "minimal-gradient": "Nền Gradient Tối Giản",
    } as Record<string, string>,
  },

  avatarPresets: {
    "Nữ Giám Đốc CFO": "Nữ Giám Đốc CFO",
    "Quant Trader Algo": "Quant Trader Algo",
  } as Record<string, string>,
};

export const avatarOptionsEn: typeof avatarOptionsVi = {
  bonusCategories: {
    "Định giá doanh nghiệp": "Company valuation",
    "Đọc báo cáo tài chính": "Reading financial statements",
    "Case công ty thực tế": "Real company cases",
    "Vốn & cổ đông": "Capital & shareholders",
    "Đầu tư & danh mục": "Investing & portfolios",
    "Khác": "Other",
  },
  avatarOptions: {
    skinTones: {
      "fair": "Fair",
      "natural": "Natural",
      "warm-peach": "Warm Peach",
      "olive": "Olive",
      "tan": "Tan",
      "bronze": "Bronze",
      "dark": "Deep Brown",
      "deep": "Deepest",
    } as Record<string, string>,
    hairColors: {
      "black": "Jet Black",
      "dark-brown": "Wood Brown",
      "golden-blonde": "Wall St Blonde",
      "platinum": "Platinum",
      "chestnut": "Chestnut",
      "burgundy": "Burgundy",
      "silver-fox": "Executive Silver",
      "neon-cyan": "Cyber Trader Teal",
    } as Record<string, string>,
    outfitColors: {
      "navy-suit": "Silicon Valley Navy",
      "midnight-black": "Silicon Valley Midnight",
      "emerald-wealth": "Capital Emerald",
      "royal-blue": "Royal Blue",
      "deep-purple": "Architecture Legend Purple",
      "crimson-red": "VN30 Rally Red",
      "amber-gold": "Bull Market Gold",
    } as Record<string, string>,
    hairStyles: {
      "business-slick": "Business Slick Back",
      "fade-cut": "Modern Fade",
      "wavy-medium": "Loose Waves",
      "bob-cut": "Power Bob",
      "long-curly": "Long Curls",
      "ponytail": "CEO Ponytail",
      "buzz-cut": "Buzz Cut",
      "afro": "Statement Afro",
      "short-classic": "Wall St Classic",
    } as Record<string, string>,
    faceShapes: {
      "oval": "Oval",
      "square": "Square-Jawed",
      "round": "Round & Friendly",
      "heart": "Heart-Shaped",
    } as Record<string, string>,
    eyeExpressions: {
      "confident": "Confident",
      "sharp": "Coldly Analytical",
      "focused": "Deeply Focused",
      "cheerful": "Smiling at the Gains",
      "cool": "Unbothered",
    } as Record<string, string>,
    glasses: {
      "none": "No Glasses",
      "classic-black": "Statement Analyst Frames",
      "gold-aviator": "Gold Aviators",
      "analyst-round": "Round Expert Frames",
      "tech-blue": "Blue Light Filters",
      "cyber-hud": "Algo Trader HUD",
    } as Record<string, string>,
    beards: {
      "none": "Clean Shaven",
      "stubble": "Neat Stubble",
      "gentleman-mustache": "Silicon Valley Moustache",
      "full-beard": "Full Beard",
      "goatee": "Expert's Goatee",
    } as Record<string, string>,
    outfitStyles: {
      "wall-st-suit": "Silicon Valley Premium Suit",
      "executive-vest": "Executive CFO Waistcoat",
      "trader-hoodie": "Silicon Valley Trader Hoodie",
      "cfo-blazer": "Power Blazer",
      "casual-shirt": "Elegant Shirt",
      "cyber-trader": "Quant Trader Armour",
    } as Record<string, string>,
    accessories: {
      "none": "No Accessory",
      "cfo-crown": "Golden CFO Crown",
      "rolex-watch": "Executive Rolex",
      "valuation-pen": "The Magic Valuation Pen",
      "gold-necklace": "Bull Market Gold Chain",
      "trophy-cup": "Server Champion's Trophy",
      "coffee-cup": "Bloomberg Coffee Cup",
    } as Record<string, string>,
    backgrounds: {
      "wallstreet-trading-floor": "Server Trading Floor",
      "penthouse-office": "88th-Floor Penthouse Office",
      "gold-vault": "The Gold Vault",
      "neon-broadway": "Times Square Neon",
      "zen-garden": "Financial Balance Zen Garden",
      "minimal-gradient": "Minimal Gradient",
    } as Record<string, string>,
  },

  avatarPresets: {
    "Nữ Giám Đốc CFO": "The CFO",
    "Quant Trader Algo": "Algo Quant Trader",
  },
};
