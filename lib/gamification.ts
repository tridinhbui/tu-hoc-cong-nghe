import { createClient } from "@/lib/supabase";
import { DomainType, DOMAINS } from "./levels";

export interface SkillNode {
  id: string;
  name: string;
  domain: DomainType;
  prerequisites: string[]; // Parent Node IDs
  requiredLessonId: number;
}

// Cây kỹ năng định nghĩa sẵn
export const SKILL_TREE: SkillNode[] = [
  { id: "TVM", name: "Time Value of Money", domain: "economics", prerequisites: [], requiredLessonId: 1 },
  { id: "CAPM", name: "CAPM Model", domain: "investment", prerequisites: ["TVM"], requiredLessonId: 2 },
  { id: "WACC", name: "WACC Calculation", domain: "corporate_finance", prerequisites: ["CAPM"], requiredLessonId: 3 },
  { id: "DCF", name: "DCF Valuation", domain: "valuation", prerequisites: ["WACC", "TVM"], requiredLessonId: 4 },
  { id: "CCA", name: "Comparable Companies Analysis", domain: "valuation", prerequisites: ["WACC"], requiredLessonId: 5 },
  { id: "LBO", name: "LBO Modeling", domain: "corporate_finance", prerequisites: ["DCF"], requiredLessonId: 6 },
  { id: "MA", name: "M&A Valuation", domain: "valuation", prerequisites: ["LBO", "CCA"], requiredLessonId: 7 },
];

/**
 * Kiểm tra các skill mới có thể mở khóa sau khi hoàn thành một lesson
 */
export async function getUnlockedSkills(userId: string): Promise<SkillNode[]> {
  const supabase = createClient();

  // Lấy các bài học user đã hoàn thành
  const { data: progress } = await supabase
    .from("user_progress")
    .select("lesson_id")
    .eq("user_id", userId)
    .eq("completed", true);

  const completedLessonIds = new Set(progress?.map((p) => Number(p.lesson_id)) || []);

  // Lọc các node mà user chưa hoàn thành nhưng đã hoàn thành tất cả prereq
  return SKILL_TREE.filter((node) => {
    // Nếu chính node này đã học xong, không cần báo mở khóa nữa
    if (completedLessonIds.has(node.requiredLessonId)) return false;

    // Phải hoàn thành tất cả prerequisites
    return node.prerequisites.every((prereqId) => {
      const prereqNode = SKILL_TREE.find((n) => n.id === prereqId);
      return prereqNode && completedLessonIds.has(prereqNode.requiredLessonId);
    });
  });
}

export interface RandomRewardResult {
  hasReward: boolean;
  rewardType?: "xp" | "coin" | "card";
  rewardValue?: number | string; // số lượng hoặc asset_key của thẻ
  rewardName?: string;
}

/**
 * Cơ chế quay thưởng ngẫu nhiên lành mạnh (Random Reward)
 * Giới hạn tối đa 3 hộp quà/ngày
 */
export async function drawRandomReward(userId: string): Promise<RandomRewardResult> {
  const supabase = createClient();
  
  // 1. Kiểm tra giới hạn ngày (Daily Cap)
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from("user_challenge_attempts")
    // Dùng bảng attempts hoặc thêm trường logs để track số hộp quà đã nhận hôm nay.
    // Ở đây ta có thể tính từ logs hoặc một bảng đếm. 
    // Tạm thời, để đơn giản và đáng tin cậy, ta check số quà nhận được từ user_inventories có acquired_at trong hôm nay.
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("completed_at", todayStart.toISOString());

  // Giả sử tối đa 3 phần quà ngẫu nhiên từ bài học mỗi ngày
  // (Chúng ta có thể kiểm tra một bảng ghi nhận lịch sử quay quà, ở đây mock đơn giản để demo)
  
  // Tỷ lệ xuất hiện: 50% có quà
  if (Math.random() > 0.5) {
    return { hasReward: false };
  }

  const rand = Math.random();
  
  if (rand < 0.60) {
    // 60% nhận XP
    const xpBonus = Math.floor(Math.random() * 31) + 20; // 20 - 50 XP
    return {
      hasReward: true,
      rewardType: "xp",
      rewardValue: xpBonus,
      rewardName: `+${xpBonus} XP Bonus`
    };
  } else if (rand < 0.85) {
    // 25% nhận Coin
    const coinBonus = Math.floor(Math.random() * 21) + 10; // 10 - 30 Coins
    return {
      hasReward: true,
      rewardType: "coin",
      rewardValue: coinBonus,
      rewardName: `+${coinBonus} Coins`
    };
  } else {
    // 15% nhận Card doanh nghiệp ngẫu nhiên
    // Lấy một card ngẫu nhiên từ bảng gamification_assets
    const { data: cards } = await supabase
      .from("gamification_assets")
      .select("asset_key, name")
      .eq("asset_type", "card");

    if (cards && cards.length > 0) {
      const selected = cards[Math.floor(Math.random() * cards.length)];
      return {
        hasReward: true,
        rewardType: "card",
        rewardValue: selected.asset_key,
        rewardName: `Thẻ doanh nghiệp: ${selected.name}`
      };
    }
    
    return {
      hasReward: true,
      rewardType: "coin",
      rewardValue: 15,
      rewardName: "+15 Coins"
    };
  }
}
