export interface AvatarConfig {
  gender: "male" | "female";
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  faceShape: string;
  eyeExpression: string;
  glasses: string;
  beard: string;
  outfitStyle: string;
  outfitColor: string;
  accessory: string;
  background: string;
}

export interface AvatarOptionItem {
  id: string;
  label: string;
  previewColor?: string;
  iconEmoji?: string;
  requiredLevel?: number;
  requiredAchievement?: string;
  isVip?: boolean;
}

export const DEFAULT_AVATAR_CONFIG: AvatarConfig = {
  gender: "male",
  skinTone: "#FCD5CE",
  hairStyle: "business-slick",
  hairColor: "#1A1A1A",
  faceShape: "oval",
  eyeExpression: "confident",
  glasses: "classic-black",
  beard: "none",
  outfitStyle: "wall-st-suit",
  outfitColor: "#1E293B",
  accessory: "cfo-crown",
  background: "wallstreet-trading-floor",
};

/* i18n-ignore-start: mọi `label` từ đây tới hết danh sách bộ dựng sẵn đã có
   lớp phủ trong lib/i18n/dictionaries/sections/avatar-options.ts, khoá theo
   `id` TRONG TỪNG NHÓM - và `id` ở đây được GHI XUỐNG cấu hình avatar của
   người dùng, nên nó ổn định hơn mọi khoá khác trong repo. `hex` và `config`
   là dữ liệu đã lưu, không phải chữ.

   Lời khai này từng SAI mà không có gì bắt được: lớp phủ có đúng 71 khoá cho
   71 lựa chọn nên đếm thì thấy đủ, nhưng khoá được bịa từ nhãn chứ không chép
   từ `id` ("Đen Tuyền" -> `jet-black`, trong khi `id` thật là `black`). Giờ
   lib/__tests__/avatar-options-i18n.test.ts gác hai chiều - thiếu khoá VÀ
   khoá thừa - nên nó là lời khai kiểm được, không còn là lời hứa. */
export const SKIN_TONES: { id: string; hex: string; label: string }[] = [
  { id: "fair", hex: "#FFE5D9", label: "Trắng Hồng" },
  { id: "natural", hex: "#FCD5CE", label: "Tự Nhiên" },
  { id: "warm-peach", hex: "#F8AD9D", label: "Đào Ấm" },
  { id: "olive", hex: "#E0A96D", label: "Olive" },
  { id: "tan", hex: "#C68B59", label: "Rám Nắng" },
  { id: "bronze", hex: "#9C6644", label: "Đồng Rắn Rỏi" },
  { id: "dark", hex: "#5C3D2E", label: "Nâu Đậm" },
  { id: "deep", hex: "#3D2314", label: "Huyền Mạch" },
];

export const HAIR_COLORS: { id: string; hex: string; label: string }[] = [
  { id: "black", hex: "#1A1A1A", label: "Đen Tuyền" },
  { id: "dark-brown", hex: "#4A2E2B", label: "Nâu Gỗ" },
  { id: "golden-blonde", hex: "#D4AF37", label: "Vàng Vàng Wall St" },
  { id: "platinum", hex: "#E6E6FA", label: "Bạch Kim" },
  { id: "chestnut", hex: "#8B4513", label: "Nâu Hạt Dẻ" },
  { id: "burgundy", hex: "#8B0000", label: "Đỏ Rượu Burgundy" },
  { id: "silver-fox", hex: "#708090", label: "Xám Bạc Executive" },
  { id: "neon-cyan", hex: "#00F0FF", label: "Xanh Cyber Trader" },
];

export const OUTFIT_COLORS: { id: string; hex: string; label: string }[] = [
  { id: "navy-suit", hex: "#1E293B", label: "Navy Wall Street" },
  { id: "midnight-black", hex: "#0F172A", label: "Đen Đêm Phố Wall" },
  { id: "emerald-wealth", hex: "#047857", label: "Xanh Ngọc Bảo Vốn" },
  { id: "royal-blue", hex: "#1E3A8A", label: "Xanh Hoàng Gia" },
  { id: "deep-purple", hex: "#7C3AED", label: "Tím Huyền Thoại M&A" },
  { id: "crimson-red", hex: "#991B1B", label: "Đỏ Bùng Nổ VN30" },
  { id: "amber-gold", hex: "#D97706", label: "Vàng Kim Bò Tăng Trưởng" },
];

export const HAIR_STYLES: AvatarOptionItem[] = [
  { id: "business-slick", label: "Slick Back Doanh Nhân", iconEmoji: "💇‍♂️" },
  { id: "fade-cut", label: "Fade Cut Hiện Đại", iconEmoji: "✂️" },
  { id: "wavy-medium", label: "Bồng Bềnh Wavy", iconEmoji: "🌊" },
  { id: "bob-cut", label: "Bob Cut Quyền Lực", iconEmoji: "👩" },
  { id: "long-curly", label: "Tóc Dài Uốn Lọn", iconEmoji: "👩‍🦱" },
  { id: "ponytail", label: "Cột Đuôi Ngựa CEO", iconEmoji: "👱‍♀️" },
  { id: "buzz-cut", label: "Buzz Cut Mạnh Mẽ", iconEmoji: "👨‍🦲" },
  { id: "afro", label: "Afro Độc Đáo", iconEmoji: "👨‍🦱" },
  { id: "short-classic", label: "Cổ Điển Wall St", iconEmoji: "👨" },
];

export const FACE_SHAPES: AvatarOptionItem[] = [
  { id: "oval", label: "Khuôn Mặt Trái Xoan", iconEmoji: "🥚" },
  { id: "square", label: "Góc Cạnh Vuông Vắn", iconEmoji: "⬛" },
  { id: "round", label: "Tròn Trĩnh Thân Thiện", iconEmoji: "⚪" },
  { id: "heart", label: "Hình Trái Tim Thẩm Mỹ", iconEmoji: "🤍" },
];

export const EYE_EXPRESSIONS: AvatarOptionItem[] = [
  { id: "confident", label: "Tự Tin Sắc Sảo", iconEmoji: "😎" },
  { id: "sharp", label: "Phân Tích Sắc Lạnh", iconEmoji: "👁️" },
  { id: "focused", label: "Tập Trung Cao Độ", iconEmoji: "🧐" },
  { id: "cheerful", label: "Tươi Cười Đón Lãi", iconEmoji: "😊" },
  { id: "cool", label: "Điềm Tĩnh Ngầu", iconEmoji: "😏" },
];

export const GLASSES_OPTIONS: AvatarOptionItem[] = [
  { id: "none", label: "Không Dùng Kính", iconEmoji: "🚫" },
  { id: "classic-black", label: "Kính Phân Tích BCTC", iconEmoji: "👓" },
  { id: "gold-aviator", label: "Kính Phi Công Mạ Vàng", iconEmoji: "🕶️", requiredLevel: 3 },
  { id: "analyst-round", label: "Kính Tròn Chuyên Gia", iconEmoji: "🤓" },
  { id: "tech-blue", label: "Kính Lọc Ánh Sáng Xanh", iconEmoji: "💻", requiredLevel: 5 },
  { id: "cyber-hud", label: "Kính HUD Algo Trader", iconEmoji: "🥽", requiredLevel: 8 },
];

export const BEARD_OPTIONS: AvatarOptionItem[] = [
  { id: "none", label: "Không Râu", iconEmoji: "🚫" },
  { id: "stubble", label: "Râu Quai Nón Lịch Lãm", iconEmoji: "🧔" },
  { id: "gentleman-mustache", label: "Râu Mép Phố Wall", iconEmoji: "👨‍🦰" },
  { id: "full-beard", label: "Râu Quai Nón Rậm", iconEmoji: "🧔‍♂️" },
  { id: "goatee", label: "Râu Dê Chuyên Gia", iconEmoji: "🐐" },
];

export const OUTFIT_STYLES: AvatarOptionItem[] = [
  { id: "wall-st-suit", label: "Bộ Suit Wall Street Premium", iconEmoji: "👔" },
  { id: "executive-vest", label: "Áo Ghê-lê Executive CFO", iconEmoji: "🎽" },
  { id: "trader-hoodie", label: "Hoodie Silicon Valley Trader", iconEmoji: "🧥" },
  { id: "cfo-blazer", label: "Áo Vest Blazer Quyền Lực", iconEmoji: "💼" },
  { id: "casual-shirt", label: "Sơ Mi Thanh Lịch", iconEmoji: "👔" },
  { id: "cyber-trader", label: "Giáp Kim Loại Quant Trader", iconEmoji: "🛡️", requiredLevel: 10 },
];

export const ACCESSORIES_OPTIONS: AvatarOptionItem[] = [
  { id: "none", label: "Không Phụ Kiện", iconEmoji: "🚫" },
  { id: "cfo-crown", label: "Vương Miện CFO Vàng", iconEmoji: "👑", requiredLevel: 5 },
  { id: "rolex-watch", label: "Đồng Hồ Rolex Executive", iconEmoji: "⌚", requiredLevel: 3 },
  { id: "valuation-pen", label: "Bút Định Giá Thần Kỳ", iconEmoji: "🖊️" },
  { id: "gold-necklace", label: "Dây Chuyền Vàng Bò Tăng Trưởng", iconEmoji: "📿" },
  { id: "trophy-cup", label: "Cúp Vô Địch NYSE", iconEmoji: "🏆", requiredLevel: 7 },
  { id: "coffee-cup", label: "Tách Cà Phê Bloomberg", iconEmoji: "☕" },
];

export const BACKGROUND_OPTIONS: AvatarOptionItem[] = [
  { id: "wallstreet-trading-floor", label: "Sàn Giao Dịch NYSE Wall Street", iconEmoji: "🏙️" },
  { id: "penthouse-office", label: "Văn Phòng Penthouse Tầng 88", iconEmoji: "🏢" },
  { id: "gold-vault", label: "Bể Vàng Kim Kho Báu", iconEmoji: "💰", requiredLevel: 5 },
  { id: "neon-broadway", label: "Quảng Trường Times Square Neon", iconEmoji: "🌆" },
  { id: "zen-garden", label: "Khu Vườn Zen Cân Bằng Tài Chính", iconEmoji: "🌿" },
  { id: "minimal-gradient", label: "Nền Gradient Tối Giản", iconEmoji: "🎨" },
];

export const AVATAR_PRESETS: { name: string; icon: string; config: AvatarConfig }[] = [
  {
    name: "Wall Street Shark",
    icon: "🦈",
    config: {
      gender: "male",
      skinTone: "#FCD5CE",
      hairStyle: "business-slick",
      hairColor: "#1A1A1A",
      faceShape: "square",
      eyeExpression: "confident",
      glasses: "gold-aviator",
      beard: "stubble",
      outfitStyle: "wall-st-suit",
      outfitColor: "#0F172A",
      accessory: "rolex-watch",
      background: "wallstreet-trading-floor",
    },
  },
  {
    name: "Nữ Giám Đốc CFO",
    icon: "👑",
    config: {
      gender: "female",
      skinTone: "#FFE5D9",
      hairStyle: "bob-cut",
      hairColor: "#4A2E2B",
      faceShape: "oval",
      eyeExpression: "sharp",
      glasses: "classic-black",
      beard: "none",
      outfitStyle: "cfo-blazer",
      outfitColor: "#1E3A8A",
      accessory: "cfo-crown",
      background: "penthouse-office",
    },
  },
  {
    name: "Quant Trader Algo",
    icon: "🤖",
    config: {
      gender: "male",
      skinTone: "#E0A96D",
      hairStyle: "fade-cut",
      hairColor: "#00F0FF",
      faceShape: "square",
      eyeExpression: "focused",
      glasses: "cyber-hud",
      beard: "none",
      outfitStyle: "trader-hoodie",
      outfitColor: "#7C3AED",
      accessory: "valuation-pen",
      background: "neon-broadway",
    },
  },
];

/* i18n-ignore-end */
