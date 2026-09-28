import { createClient } from "@/lib/cloudflare";
import { embedRelated } from "@/lib/embed-related";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

/**
 * Hàng tồn kho kèm quan hệ `gamification_assets`.
 *
 * Kiểu Cloudflare sinh ra cho quan hệ lồng nhau là một MẢNG, nhưng với khoá
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
    id: "card-python",
    name: "Python",
    ticker: "PY",
    rarity: "rare",
    domain_type: "system_design",
    sector: "Ngôn ngữ lập trình",
    description: "Ngôn ngữ dễ đọc, dùng từ tự động hoá việc lặt vặt tới phân tích dữ liệu và huấn luyện mô hình AI.",
    advantage: "Hệ sinh thái thư viện khổng lồ cho dữ liệu và AI, cú pháp gần với ngôn ngữ tự nhiên.",
    metrics: ["Số thư viện trên PyPI", "Tốc độ thực thi", "Độ phủ chú thích kiểu"],
  },
  {
    id: "card-postgresql",
    name: "PostgreSQL",
    ticker: "PG",
    rarity: "epic",
    domain_type: "web",
    sector: "Cơ sở dữ liệu quan hệ",
    description: "Hệ quản trị cơ sở dữ liệu mã nguồn mở, giữ dữ liệu nhất quán bằng transaction ACID.",
    advantage: "Hỗ trợ SQL đầy đủ, mở rộng được bằng kiểu dữ liệu và chỉ mục riêng.",
    metrics: ["Truy vấn mỗi giây", "Độ trễ truy vấn", "Tỷ lệ trúng bộ đệm"],
  },
  {
    id: "card-linux",
    name: "Linux",
    ticker: "LNX",
    rarity: "legendary",
    domain_type: "backend",
    sector: "Hệ điều hành",
    description: "Nhân hệ điều hành chạy phần lớn máy chủ, điện thoại Android và siêu máy tính trên thế giới.",
    advantage: "Mã nguồn mở, được hàng nghìn công ty cùng đóng góp và cùng soát lỗi.",
    metrics: ["Thời gian hoạt động", "Tải CPU", "Bộ nhớ đã dùng"],
  },
  {
    id: "card-docker",
    name: "Docker",
    ticker: "DKR",
    rarity: "rare",
    domain_type: "product",
    sector: "Đóng gói ứng dụng",
    description: "Đóng gói ứng dụng cùng mọi phụ thuộc vào container để chạy giống nhau trên mọi máy.",
    advantage: "Xoá bỏ câu \"máy tôi chạy được mà\": môi trường phát triển và môi trường thật dùng chung một ảnh.",
    metrics: ["Kích thước ảnh", "Thời gian khởi động", "Số container"],
  },
  {
    id: "card-react",
    name: "React",
    ticker: "RCT",
    rarity: "rare",
    domain_type: "system_design",
    sector: "Thư viện giao diện web",
    description: "Thư viện dựng giao diện từ những thành phần nhỏ, tự cập nhật khi dữ liệu thay đổi.",
    advantage: "Cộng đồng rất lớn, và cách nghĩ theo thành phần dùng lại được cả trên web lẫn di động.",
    metrics: ["Thời gian hiển thị đầu", "Kích thước gói JS", "Số lần render lại"],
  },
  {
    id: "card-kubernetes",
    name: "Kubernetes",
    ticker: "K8S",
    rarity: "epic",
    domain_type: "backend",
    sector: "Điều phối container",
    description: "Hệ thống tự xếp container lên cụm máy chủ, tự khởi động lại khi hỏng và mở rộng theo tải.",
    advantage: "Mô tả trạng thái mong muốn một lần, hệ thống tự kéo thực tế về đúng như vậy.",
    metrics: ["Số pod", "Tỷ lệ khởi động lại", "Mức dùng tài nguyên cụm"],
  },
  {
    id: "card-aws",
    name: "Amazon Web Services",
    ticker: "AWS",
    rarity: "epic",
    domain_type: "security",
    sector: "Điện toán đám mây",
    description: "Nền tảng đám mây cho thuê máy chủ, lưu trữ, cơ sở dữ liệu và hàng trăm dịch vụ khác theo giờ.",
    advantage: "Hạ tầng trải khắp nhiều vùng trên thế giới, bật một máy chủ mới chỉ mất vài phút.",
    metrics: ["Chi phí mỗi tháng", "Số vùng triển khai", "Độ khả dụng"],
  },
  {
    id: "card-javascript",
    name: "JavaScript",
    ticker: "JS",
    rarity: "common",
    domain_type: "product",
    sector: "Ngôn ngữ của trình duyệt",
    description: "Ngôn ngữ duy nhất chạy sẵn trong mọi trình duyệt, giúp trang web phản ứng với người dùng.",
    advantage: "Viết được cả giao diện lẫn máy chủ (Node.js) bằng cùng một ngôn ngữ.",
    metrics: ["Thời gian tải trang", "Số lỗi JavaScript", "Kích thước gói"],
  },
  {
    id: "card-redis",
    name: "Redis",
    ticker: "RDS",
    rarity: "rare",
    domain_type: "operating_systems",
    sector: "Bộ nhớ đệm trong RAM",
    description: "Kho khoá - giá trị nằm trong bộ nhớ, trả lời trong vài phần nghìn giây.",
    advantage: "Giảm tải cho cơ sở dữ liệu chính bằng cách giữ sẵn những dữ liệu hay được đọc.",
    metrics: ["Tỷ lệ trúng cache", "Độ trễ đọc", "Bộ nhớ đã dùng"],
  },
  {
    id: "card-git",
    name: "Git",
    ticker: "GIT",
    rarity: "legendary",
    domain_type: "security",
    sector: "Quản lý phiên bản",
    description: "Hệ thống ghi lại lịch sử mọi thay đổi của mã, cho phép nhiều người làm song song trên các nhánh.",
    advantage: "Mỗi bản sao là một kho đầy đủ, nên vẫn làm việc được cả khi mất mạng.",
    metrics: ["Số commit", "Số nhánh đang mở", "Thời gian review"],
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
  const cloudflare = createClient();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  try {
    const { data: inventory } = await cloudflare
      .from("user_inventories")
      .select("asset_id, acquired_at")
      .eq("user_id", userId);

    const rows = (await embedRelated(cloudflare, (inventory ?? []) as Record<string, unknown>[], {
      fk: "asset_id",
      table: "gamification_assets",
      columns: "asset_key, asset_type",
    })) as unknown as CardInventoryRow[];
    const cardInventory = rows.filter((item) => item.gamification_assets?.asset_type === "card");
    const dropsToday = cardInventory.filter((item) => new Date(item.acquired_at ?? 0).getTime() >= todayStart.getTime()).length;

    if (dropsToday >= 3) return { dropped: false, reason: "daily_cap" };

    const chance = score >= 100 ? 0.45 : score >= 80 ? 0.35 : score >= 60 ? 0.25 : 0.16;
    if (Math.random() > chance) return { dropped: false, reason: "chance_miss" };

    const ownedKeys = new Set(cardInventory.map((item) => item.gamification_assets?.asset_key).filter(Boolean));
    const missingCards = TECH_CARDS.filter((card) => !ownedKeys.has(card.id));
    if (missingCards.length === 0) return { dropped: false, reason: "complete_collection" };

    const selected = pickWeighted(missingCards);
    const { data: asset } = await cloudflare
      .from("gamification_assets")
      .select("id")
      .eq("asset_key", selected.id)
      .eq("asset_type", "card")
      .maybeSingle();

    if (!asset) return { dropped: false, reason: "missing_asset" };

    const { error } = await cloudflare.from("user_inventories").insert({
      user_id: userId,
      asset_id: asset.id,
    });

    if (error) {
      if (error.code === "23505") return { dropped: false, reason: "duplicate" };
      throw error;
    }

    return { dropped: true, card: selected };
  } catch (error) {
    console.error("Error awarding tech card drop:", error);
    return { dropped: false, reason: "error" };
  }
}
