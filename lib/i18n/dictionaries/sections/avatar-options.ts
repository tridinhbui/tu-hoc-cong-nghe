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
// Nhiều nhãn chơi chữ theo mô-típ dân công nghệ - "Vàng Kim Bản Phát Hành",
// "Kho Dữ Liệu Vàng Kim", "Huyền Mạch". Bản Anh giữ mô-típ đó thay vì dịch sát:
// "Release Day Gold", "The Golden Data Vault", "Deepest". Dịch từng chữ sẽ ra một bảng
// màu nghe như catalogue sơn.
//
// Xem AGENTS.md, mục "Translating the UI".

export const avatarOptionsVi = {
  // Nhóm chủ đề của mục "Case chuyên sâu" trên dashboard. Sáu giá trị, dùng lại
  // cho ~90 slug trong lib/bonus-lesson-categories.ts.
  bonusCategories: {
    "Ước lượng & quyết định kỹ thuật": "Ước lượng & quyết định kỹ thuật",
    "Đo lường & vận hành hệ thống": "Đo lường & vận hành hệ thống",
    "Đọc số liệu hệ thống": "Đọc số liệu hệ thống",
    "Case sản phẩm thực tế": "Case sản phẩm thực tế",
    "Cam kết độ tin cậy": "Cam kết độ tin cậy",
    "Kiến trúc & nền tảng": "Kiến trúc & nền tảng",
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
      "golden-blonde": "Vàng Óng",
      "platinum": "Bạch Kim",
      "chestnut": "Nâu Hạt Dẻ",
      "burgundy": "Đỏ Rượu Burgundy",
      "silver-fox": "Xám Bạc Senior",
      "neon-cyan": "Xanh Cyber Hacker",
    } as Record<string, string>,
    outfitColors: {
      "navy-suit": "Navy Silicon Valley",
      "midnight-black": "Đen Chế Độ Tối",
      "emerald-wealth": "Xanh Ngọc Terminal",
      "royal-blue": "Xanh Hoàng Gia",
      "deep-purple": "Tím Huyền Thoại Kiến Trúc",
      "crimson-red": "Đỏ Cảnh Báo Build",
      "amber-gold": "Vàng Kim Bản Phát Hành",
    } as Record<string, string>,
    hairStyles: {
      "business-slick": "Slick Back Tech Lead",
      "fade-cut": "Fade Cut Hiện Đại",
      "wavy-medium": "Bồng Bềnh Wavy",
      "bob-cut": "Bob Cut Quyền Lực",
      "long-curly": "Tóc Dài Uốn Lọn",
      "ponytail": "Cột Đuôi Ngựa CTO",
      "buzz-cut": "Buzz Cut Mạnh Mẽ",
      "afro": "Afro Độc Đáo",
      "short-classic": "Cổ Điển Kỹ Sư",
    } as Record<string, string>,
    faceShapes: {
      "oval": "Khuôn Mặt Trái Xoan",
      "square": "Góc Cạnh Vuông Vắn",
      "round": "Tròn Trĩnh Thân Thiện",
      "heart": "Hình Trái Tim Thẩm Mỹ",
    } as Record<string, string>,
    eyeExpressions: {
      "confident": "Tự Tin Sắc Sảo",
      "sharp": "Soi Lỗi Sắc Lạnh",
      "focused": "Tập Trung Cao Độ",
      "cheerful": "Tươi Cười Build Xanh",
      "cool": "Điềm Tĩnh Ngầu",
    } as Record<string, string>,
    glasses: {
      "none": "Không Dùng Kính",
      "classic-black": "Kính Đọc Mã Nguồn",
      "gold-aviator": "Kính Phi Công Mạ Vàng",
      "analyst-round": "Kính Tròn Chuyên Gia",
      "tech-blue": "Kính Lọc Ánh Sáng Xanh",
      "cyber-hud": "Kính HUD Hacker",
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
      "executive-vest": "Áo Ghê-lê Executive CTO",
      "trader-hoodie": "Hoodie Hacker Silicon Valley",
      "cfo-blazer": "Áo Vest Blazer Quyền Lực",
      "casual-shirt": "Sơ Mi Thanh Lịch",
      "cyber-trader": "Giáp Kim Loại Cyber Hacker",
    } as Record<string, string>,
    accessories: {
      "none": "Không Phụ Kiện",
      "cfo-crown": "Vương Miện CTO Vàng",
      "rolex-watch": "Đồng Hồ Thông Minh Executive",
      "valuation-pen": "Bút Vẽ Kiến Trúc Thần Kỳ",
      "gold-necklace": "Dây Chuyền Vàng Commit Xanh",
      "trophy-cup": "Cúp Vô Địch Hackathon",
      "coffee-cup": "Tách Cà Phê Deploy Đêm",
    } as Record<string, string>,
    backgrounds: {
      "server-room": "Phòng Máy Chủ Silicon Valley",
      "penthouse-office": "Văn Phòng Penthouse Tầng 88",
      "gold-vault": "Kho Dữ Liệu Vàng Kim",
      "neon-broadway": "Quảng Trường Times Square Neon",
      "zen-garden": "Khu Vườn Zen Cân Bằng Công Việc",
      "minimal-gradient": "Nền Gradient Tối Giản",
    } as Record<string, string>,
  },

  avatarPresets: {
    "Silicon Valley Shark": "Silicon Valley Shark",
    "Nữ Giám Đốc CTO": "Nữ Giám Đốc CTO",
    "Hacker Thuật Toán": "Hacker Thuật Toán",
  } as Record<string, string>,
};

export const avatarOptionsEn: typeof avatarOptionsVi = {
  bonusCategories: {
    "Ước lượng & quyết định kỹ thuật": "Estimation & technical decisions",
    "Đo lường & vận hành hệ thống": "Measuring & running systems",
    "Đọc số liệu hệ thống": "Reading system numbers",
    "Case sản phẩm thực tế": "Real product cases",
    "Cam kết độ tin cậy": "Reliability commitments",
    "Kiến trúc & nền tảng": "Architecture & platforms",
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
      "golden-blonde": "Golden Blonde",
      "platinum": "Platinum",
      "chestnut": "Chestnut",
      "burgundy": "Burgundy",
      "silver-fox": "Senior Silver",
      "neon-cyan": "Cyber Hacker Teal",
    } as Record<string, string>,
    outfitColors: {
      "navy-suit": "Silicon Valley Navy",
      "midnight-black": "Dark Mode Black",
      "emerald-wealth": "Terminal Teal",
      "royal-blue": "Royal Blue",
      "deep-purple": "Architecture Legend Purple",
      "crimson-red": "Build Alert Red",
      "amber-gold": "Release Day Gold",
    } as Record<string, string>,
    hairStyles: {
      "business-slick": "Tech Lead Slick Back",
      "fade-cut": "Modern Fade",
      "wavy-medium": "Loose Waves",
      "bob-cut": "Power Bob",
      "long-curly": "Long Curls",
      "ponytail": "CTO Ponytail",
      "buzz-cut": "Buzz Cut",
      "afro": "Statement Afro",
      "short-classic": "Classic Engineer",
    } as Record<string, string>,
    faceShapes: {
      "oval": "Oval",
      "square": "Square-Jawed",
      "round": "Round & Friendly",
      "heart": "Heart-Shaped",
    } as Record<string, string>,
    eyeExpressions: {
      "confident": "Confident",
      "sharp": "Coldly Bug-Hunting",
      "focused": "Deeply Focused",
      "cheerful": "Smiling at a Green Build",
      "cool": "Unbothered",
    } as Record<string, string>,
    glasses: {
      "none": "No Glasses",
      "classic-black": "Code Review Frames",
      "gold-aviator": "Gold Aviators",
      "analyst-round": "Round Expert Frames",
      "tech-blue": "Blue Light Filters",
      "cyber-hud": "Hacker HUD",
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
      "executive-vest": "Executive CTO Waistcoat",
      "trader-hoodie": "Silicon Valley Hacker Hoodie",
      "cfo-blazer": "Power Blazer",
      "casual-shirt": "Elegant Shirt",
      "cyber-trader": "Cyber Hacker Armour",
    } as Record<string, string>,
    accessories: {
      "none": "No Accessory",
      "cfo-crown": "Golden CTO Crown",
      "rolex-watch": "Executive Smartwatch",
      "valuation-pen": "The Magic Architecture Pen",
      "gold-necklace": "Green Commit Gold Chain",
      "trophy-cup": "Hackathon Champion's Trophy",
      "coffee-cup": "Late-Night Deploy Coffee",
    } as Record<string, string>,
    backgrounds: {
      "server-room": "Silicon Valley Server Room",
      "penthouse-office": "88th-Floor Penthouse Office",
      "gold-vault": "The Golden Data Vault",
      "neon-broadway": "Times Square Neon",
      "zen-garden": "Work-Life Balance Zen Garden",
      "minimal-gradient": "Minimal Gradient",
    } as Record<string, string>,
  },

  avatarPresets: {
    "Silicon Valley Shark": "The Silicon Valley Shark",
    "Nữ Giám Đốc CTO": "The CTO",
    "Hacker Thuật Toán": "Algorithm Hacker",
  },
};
