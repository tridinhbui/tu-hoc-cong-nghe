import { createClient } from "@/lib/supabase";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

/**
 * Hàng tồn kho kèm quan hệ `gamification_assets`.
 *
 * Kiểu Supabase sinh ra cho quan hệ lồng nhau là một MẢNG, nhưng với khoá
 * ngoại nhiều-một thì runtime trả về một OBJECT. Chỗ này trước đây dùng `any`
 * để đi qua khoảng vênh đó, tức tắt luôn kiểm tra kiểu ở đúng nơi dữ liệu đến
 * từ bên ngoài. Khai đúng hình dạng runtime rồi ép một lần, có ghi lý do, giữ
 * được phần kiểm tra cho mọi thứ phía sau.
 */
interface CardInventoryRow {
  acquired_at?: string | null;
  gamification_assets?: { asset_key?: string | null; asset_type?: string | null } | null;
}

export type TechCardRarity = "common" | "rare" | "epic" | "legendary";

export interface TechCardDefinition {
  id: string;
  name: string;
  ticker: string;
  rarity: TechCardRarity;
  domain_type: string;
  sector: string;
  description: string;
  advantage: string;
  metrics: string[];
}

export const TECH_CARDS: TechCardDefinition[] = [
  {
    id: "card-fpt",
    name: "Tập đoàn FPT",
    ticker: "FPT",
    rarity: "rare",
    domain_type: "valuation",
    sector: "Phần mềm & dịch vụ CNTT",
    description: "Nhà xuất khẩu phần mềm lớn nhất Việt Nam, làm dự án cho khách nước ngoài.",
    advantage: "Quy mô kỹ sư, quy trình giao hàng theo dự án và mảng đào tạo tự nuôi nguồn nhân lực.",
    metrics: ["Số kỹ sư", "Dự án ký mới", "Tỷ lệ giữ người"],
  },
  {
    id: "card-vnm",
    name: "Vinamilk",
    ticker: "VNM",
    rarity: "epic",
    domain_type: "accounting",
    sector: "Chuỗi cung ứng & ERP",
    description: "Chuỗi cung ứng lạnh điều phối bởi hệ ERP phủ hàng nghìn điểm phân phối.",
    advantage: "Dữ liệu tồn kho theo thời gian thực và hệ hoạch định nhu cầu chạy trên toàn quốc.",
    metrics: ["Điểm phân phối", "Độ chính xác dự báo", "Thời gian giao hàng"],
  },
  {
    id: "card-vcb",
    name: "Vietcombank",
    ticker: "VCB",
    rarity: "legendary",
    domain_type: "corporate_finance",
    sector: "Hệ thống giao dịch trực tuyến",
    description: "Core banking và ứng dụng di động phục vụ hàng chục triệu người dùng mỗi ngày.",
    advantage: "Khối lượng giao dịch lớn nhất hệ thống, kèm yêu cầu uptime gần như tuyệt đối.",
    metrics: ["Giao dịch mỗi giây", "Uptime", "Người dùng hoạt động"],
  },
  {
    id: "card-hpg",
    name: "Tập đoàn Hòa Phát",
    ticker: "HPG",
    rarity: "rare",
    domain_type: "investment",
    sector: "Tự động hoá công nghiệp",
    description: "Nhà máy tích hợp với dây chuyền điều khiển tự động và cảm biến khắp chuyền.",
    advantage: "Hệ SCADA giám sát liên tục và dữ liệu vận hành thu thẳng từ dây chuyền.",
    metrics: ["Thời gian dừng máy", "Điểm đo cảm biến", "Sản lượng mỗi ca"],
  },
  {
    id: "card-mwg",
    name: "Thế Giới Di Động",
    ticker: "MWG",
    rarity: "rare",
    domain_type: "valuation",
    sector: "Thương mại điện tử",
    description: "Nền tảng bán lẻ đa kênh nối hàng nghìn cửa hàng vào một kho dữ liệu chung.",
    advantage: "Hệ điểm bán, đồng bộ tồn kho theo thời gian thực và dữ liệu khách hàng tích luỹ nhiều năm.",
    metrics: ["Đơn mỗi ngày", "Độ trễ đồng bộ tồn kho", "Tỷ lệ lỗi thanh toán"],
  },
  {
    id: "card-msn",
    name: "Tập đoàn Masan",
    ticker: "MSN",
    rarity: "epic",
    domain_type: "corporate_finance",
    sector: "Nền tảng dữ liệu",
    description: "Hệ sinh thái bán lẻ - tiêu dùng chạy trên một nền dữ liệu khách hàng dùng chung.",
    advantage: "Gộp dữ liệu nhiều mảng về một chỗ, ở quy mô đủ lớn để mô hình học được thật.",
    metrics: ["Người dùng định danh", "Điểm dữ liệu mỗi ngày", "Độ trễ báo cáo"],
  },
  {
    id: "card-vhm",
    name: "Vinhomes",
    ticker: "VHM",
    rarity: "epic",
    domain_type: "risk_management",
    sector: "Hạ tầng số đô thị",
    description: "Khu đô thị vận hành bằng hệ quản lý cư dân, kiểm soát ra vào và thiết bị IoT.",
    advantage: "Hạ tầng mạng lắp sẵn ngay từ lúc xây, và một tập thiết bị đầu cuối rất lớn.",
    metrics: ["Thiết bị kết nối", "Căn hộ vận hành", "Sự cố hệ thống"],
  },
  {
    id: "card-ssi",
    name: "Chứng khoán SSI",
    ticker: "SSI",
    rarity: "common",
    domain_type: "investment",
    sector: "Hệ thống độ trễ thấp",
    description: "Hệ khớp lệnh và ứng dụng giao dịch chịu tải dồn thành từng đợt theo phiên.",
    advantage: "Kinh nghiệm xử lý đỉnh tải trong vài phút mở cửa, với độ trễ tính bằng mili giây.",
    metrics: ["Độ trễ khớp lệnh", "Lệnh mỗi giây", "Đỉnh tải phiên"],
  },
  {
    id: "card-gas",
    name: "PV Gas",
    ticker: "GAS",
    rarity: "rare",
    domain_type: "economics",
    sector: "Hệ điều khiển công nghiệp",
    description: "Đường ống và nhà máy khí giám sát bằng hệ điều khiển công nghiệp chạy 24/7.",
    advantage: "Mạng cảm biến trải dài, và yêu cầu an toàn khiến mọi thay đổi đều phải quay lui được.",
    metrics: ["Trạm giám sát", "Cảnh báo mỗi tháng", "Thời gian phản hồi"],
  },
  {
    id: "card-vic",
    name: "Tập đoàn Vingroup",
    ticker: "VIC",
    rarity: "legendary",
    domain_type: "risk_management",
    sector: "Tập đoàn công nghệ đa mảng",
    description: "Tập đoàn có mảng xe điện, phần mềm nhúng và hạ tầng dữ liệu tự vận hành.",
    advantage: "Tự viết phần mềm cho phần cứng của chính mình, từ lớp nhúng lên tới đám mây.",
    metrics: ["Xe kết nối", "Bản cập nhật OTA", "Trung tâm dữ liệu"],
  },
];

/** TECH_CARDS' name/sector/description/advantage/metrics in the current
 *  locale of `t.libData.techCards`, keyed by card id. `id`, `ticker`,
 *  `rarity` and `domain_type` are structural (persisted as
 *  `gamification_assets.asset_key`, used for filtering/styling) and stay
 *  untouched. */
export function techCardsOf(t: Dictionary): TechCardDefinition[] {
  const copy = t.libData.techCards;
  return TECH_CARDS.map((card) => {
    const c = copy[card.id as keyof typeof copy];
    return { ...card, name: c.name, sector: c.sector, description: c.description, advantage: c.advantage, metrics: c.metrics };
  });
}

export interface CardDropResult {
  dropped: boolean;
  reason?: "daily_cap" | "chance_miss" | "complete_collection" | "missing_asset" | "duplicate" | "error";
  card?: TechCardDefinition;
}

function rarityWeight(rarity: TechCardRarity) {
  if (rarity === "legendary") return 1;
  if (rarity === "epic") return 3;
  if (rarity === "rare") return 6;
  return 10;
}

function pickWeighted(cards: TechCardDefinition[]) {
  const total = cards.reduce((sum, card) => sum + rarityWeight(card.rarity), 0);
  let cursor = Math.random() * total;
  for (const card of cards) {
    cursor -= rarityWeight(card.rarity);
    if (cursor <= 0) return card;
  }
  return cards[0];
}

export async function maybeAwardTechCardDrop(userId: string, score = 100): Promise<CardDropResult> {
  const supabase = createClient();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  try {
    const { data: inventory } = await supabase
      .from("user_inventories")
      .select("asset_id, acquired_at, gamification_assets(asset_key, asset_type)")
      .eq("user_id", userId);

    const rows = (inventory ?? []) as unknown as CardInventoryRow[];
    const cardInventory = rows.filter((item) => item.gamification_assets?.asset_type === "card");
    const dropsToday = cardInventory.filter((item) => new Date(item.acquired_at ?? 0).getTime() >= todayStart.getTime()).length;

    if (dropsToday >= 3) return { dropped: false, reason: "daily_cap" };

    const chance = score >= 100 ? 0.45 : score >= 80 ? 0.35 : score >= 60 ? 0.25 : 0.16;
    if (Math.random() > chance) return { dropped: false, reason: "chance_miss" };

    const ownedKeys = new Set(cardInventory.map((item) => item.gamification_assets?.asset_key).filter(Boolean));
    const missingCards = TECH_CARDS.filter((card) => !ownedKeys.has(card.id));
    if (missingCards.length === 0) return { dropped: false, reason: "complete_collection" };

    const selected = pickWeighted(missingCards);
    const { data: asset } = await supabase
      .from("gamification_assets")
      .select("id")
      .eq("asset_key", selected.id)
      .eq("asset_type", "card")
      .maybeSingle();

    if (!asset) return { dropped: false, reason: "missing_asset" };

    const { error } = await supabase.from("user_inventories").insert({
      user_id: userId,
      asset_id: asset.id,
    });

    if (error) {
      if (error.code === "23505") return { dropped: false, reason: "duplicate" };
      throw error;
    }

    return { dropped: true, card: selected };
  } catch (error) {
    console.error("Error awarding finance card drop:", error);
    return { dropped: false, reason: "error" };
  }
}
