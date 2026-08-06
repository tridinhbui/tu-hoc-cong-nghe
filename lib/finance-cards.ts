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

export type FinanceCardRarity = "common" | "rare" | "epic" | "legendary";

export interface FinanceCardDefinition {
  id: string;
  name: string;
  ticker: string;
  rarity: FinanceCardRarity;
  domain_type: string;
  sector: string;
  description: string;
  advantage: string;
  metrics: string[];
}

export const FINANCE_CARDS: FinanceCardDefinition[] = [
  {
    id: "card-fpt",
    name: "Tập đoàn FPT",
    ticker: "FPT",
    rarity: "rare",
    domain_type: "valuation",
    sector: "Công nghệ",
    description: "Doanh nghiệp công nghệ, viễn thông và giáo dục tiêu biểu của Việt Nam.",
    advantage: "Năng lực xuất khẩu phần mềm, hệ sinh thái giáo dục và nhu cầu chuyển đổi số dài hạn.",
    metrics: ["Doanh thu ký mới", "Biên lợi nhuận", "P/E forward"],
  },
  {
    id: "card-vnm",
    name: "Vinamilk",
    ticker: "VNM",
    rarity: "epic",
    domain_type: "accounting",
    sector: "Sữa / FMCG",
    description: "Cổ phiếu tiêu dùng phòng thủ với thương hiệu và phân phối mạnh.",
    advantage: "Thương hiệu quốc gia, độ phủ bán lẻ rộng và dòng tiền vận hành ổn định.",
    metrics: ["Biên gộp", "ROE", "Dòng tiền tự do"],
  },
  {
    id: "card-vcb",
    name: "Vietcombank",
    ticker: "VCB",
    rarity: "legendary",
    domain_type: "corporate_finance",
    sector: "Ngân hàng",
    description: "Ngân hàng đầu ngành với chất lượng tài sản và chi phí vốn nổi bật.",
    advantage: "CASA cao, kiểm soát nợ xấu tốt và vị thế dẫn dắt hệ thống.",
    metrics: ["NIM", "CASA", "Bao phủ nợ xấu"],
  },
  {
    id: "card-hpg",
    name: "Tập đoàn Hòa Phát",
    ticker: "HPG",
    rarity: "rare",
    domain_type: "investment",
    sector: "Thép",
    description: "Doanh nghiệp thép tích hợp quy mô lớn, nhạy với chu kỳ đầu tư.",
    advantage: "Lợi thế quy mô, chuỗi sản xuất khép kín và vị thế dẫn đầu thép xây dựng.",
    metrics: ["Sản lượng thép", "Biên EBITDA", "Chu kỳ hàng tồn kho"],
  },
  {
    id: "card-mwg",
    name: "Thế Giới Di Động",
    ticker: "MWG",
    rarity: "rare",
    domain_type: "valuation",
    sector: "Bán lẻ",
    description: "Nhà bán lẻ hiện đại với năng lực vận hành chuỗi cửa hàng lớn.",
    advantage: "Quản trị vận hành, dữ liệu khách hàng và khả năng mở rộng chuỗi.",
    metrics: ["Doanh thu/cửa hàng", "Vòng quay tồn kho", "Biên EBIT"],
  },
  {
    id: "card-msn",
    name: "Tập đoàn Masan",
    ticker: "MSN",
    rarity: "epic",
    domain_type: "corporate_finance",
    sector: "Tiêu dùng",
    description: "Hệ sinh thái tiêu dùng, bán lẻ và hàng thiết yếu quy mô lớn.",
    advantage: "Danh mục thương hiệu mạnh và chiến lược tích hợp bán lẻ - tiêu dùng.",
    metrics: ["Tăng trưởng same-store", "Đòn bẩy", "Biên EBITDA"],
  },
  {
    id: "card-vhm",
    name: "Vinhomes",
    ticker: "VHM",
    rarity: "epic",
    domain_type: "risk_management",
    sector: "Bất động sản",
    description: "Nhà phát triển khu đô thị quy mô lớn, nhạy với lãi suất và pháp lý.",
    advantage: "Quỹ đất lớn, thương hiệu mạnh và năng lực triển khai đại dự án.",
    metrics: ["Backlog", "Dòng tiền bán hàng", "Nợ vay ròng"],
  },
  {
    id: "card-ssi",
    name: "Chứng khoán SSI",
    ticker: "SSI",
    rarity: "common",
    domain_type: "investment",
    sector: "Chứng khoán",
    description: "Công ty chứng khoán đầu ngành, hưởng lợi khi thanh khoản thị trường tăng.",
    advantage: "Thị phần môi giới, ngân hàng đầu tư và năng lực quản trị rủi ro margin.",
    metrics: ["Thanh khoản thị trường", "Dư nợ margin", "Thị phần môi giới"],
  },
  {
    id: "card-gas",
    name: "PV Gas",
    ticker: "GAS",
    rarity: "rare",
    domain_type: "economics",
    sector: "Năng lượng",
    description: "Doanh nghiệp hạ tầng khí có vai trò quan trọng trong chuỗi năng lượng.",
    advantage: "Hạ tầng độc quyền tự nhiên và hợp đồng dài hạn với khách hàng lớn.",
    metrics: ["Sản lượng khí", "Giá dầu", "Biên lợi nhuận"],
  },
  {
    id: "card-vic",
    name: "Tập đoàn Vingroup",
    ticker: "VIC",
    rarity: "legendary",
    domain_type: "risk_management",
    sector: "Tập đoàn đa ngành",
    description: "Tập đoàn đa ngành với hệ sinh thái bất động sản, công nghiệp và dịch vụ.",
    advantage: "Khả năng huy động vốn, thương hiệu lớn và hệ sinh thái nhiều mảng.",
    metrics: ["Dòng tiền hợp nhất", "Đòn bẩy", "CAPEX"],
  },
];

/** FINANCE_CARDS' name/sector/description/advantage/metrics in the current
 *  locale of `t.libData.financeCards`, keyed by card id. `id`, `ticker`,
 *  `rarity` and `domain_type` are structural (persisted as
 *  `gamification_assets.asset_key`, used for filtering/styling) and stay
 *  untouched. */
export function financeCardsOf(t: Dictionary): FinanceCardDefinition[] {
  const copy = t.libData.financeCards;
  return FINANCE_CARDS.map((card) => {
    const c = copy[card.id as keyof typeof copy];
    return { ...card, name: c.name, sector: c.sector, description: c.description, advantage: c.advantage, metrics: c.metrics };
  });
}

export interface CardDropResult {
  dropped: boolean;
  reason?: "daily_cap" | "chance_miss" | "complete_collection" | "missing_asset" | "duplicate" | "error";
  card?: FinanceCardDefinition;
}

function rarityWeight(rarity: FinanceCardRarity) {
  if (rarity === "legendary") return 1;
  if (rarity === "epic") return 3;
  if (rarity === "rare") return 6;
  return 10;
}

function pickWeighted(cards: FinanceCardDefinition[]) {
  const total = cards.reduce((sum, card) => sum + rarityWeight(card.rarity), 0);
  let cursor = Math.random() * total;
  for (const card of cards) {
    cursor -= rarityWeight(card.rarity);
    if (cursor <= 0) return card;
  }
  return cards[0];
}

export async function maybeAwardFinanceCardDrop(userId: string, score = 100): Promise<CardDropResult> {
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
    const missingCards = FINANCE_CARDS.filter((card) => !ownedKeys.has(card.id));
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
