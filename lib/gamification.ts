import { createClient } from "@/lib/supabase";
import { DomainType } from "./levels";

export interface SkillNode {
  id: string;
  name: string;
  domain: DomainType;
  prerequisites: string[]; // Parent Node IDs
  requiredLessonId: number;
}

// Cây kỹ năng định nghĩa sẵn.
//
// `requiredLessonId` là id thật trong lib/lessons.ts, không phải số thứ tự của
// node. Bảy giá trị ở đây từng là 1..7 - tức bảy bài NHẬP MÔN của track cá nhân
// ("Tài chính là gì?", "Tiền là gì?", "Dòng tiền là gì?"...), không liên quan gì
// tới tên node. Hệ quả: một người mới học xong tuần đầu tiên mở cây kỹ năng ra
// và thấy cả bảy node xanh hết, gồm "LBO Modeling" và "M&A Valuation" - phần
// duy nhất của màn hình có ý nghĩa thì nói ngược lại sự thật. Không ai phát
// hiện vì tab mở cây kỹ năng đã bị gỡ, nên màn hình này chưa từng được ai nhìn.
//
// Mỗi id dưới đây là bài dạy đúng khái niệm của node, tra từ lib/lessons-data/_index.json.
export const SKILL_TREE: SkillNode[] = [
  // 81 present-value, không phải 10 gia-tri-thoi-gian-cua-tien: sáu node còn
  // lại đều nằm ở track chuyên ngành, nên gốc cây lấy bài mở màn Chặng 4 của
  // cùng track thay vì bài giới thiệu bên track cá nhân.
  { id: "TVM", name: "Time Value of Money", domain: "economics", prerequisites: [], requiredLessonId: 81 },
  { id: "CAPM", name: "CAPM Model", domain: "investment", prerequisites: ["TVM"], requiredLessonId: 97 },
  { id: "WACC", name: "WACC Calculation", domain: "corporate_finance", prerequisites: ["CAPM"], requiredLessonId: 93 },
  { id: "DCF", name: "DCF Valuation", domain: "valuation", prerequisites: ["WACC", "TVM"], requiredLessonId: 133 },
  { id: "CCA", name: "Comparable Companies Analysis", domain: "valuation", prerequisites: ["WACC"], requiredLessonId: 131 },
  { id: "LBO", name: "LBO Modeling", domain: "corporate_finance", prerequisites: ["DCF"], requiredLessonId: 117 },
  { id: "MA", name: "M&A Valuation", domain: "valuation", prerequisites: ["LBO", "CCA"], requiredLessonId: 108 },
];

/**
 * Các node cây kỹ năng user đủ điều kiện học nhưng chưa học.
 *
 * `justCompletedLessonId` là thứ biến hàm này thành một thông báo dùng được.
 * Không có nó, hàm trả về TOÀN BỘ node đang mở - tức là cùng một danh sách sau
 * mỗi bài học, nên gọi sau mỗi lần hoàn thành bài sẽ báo "mở khoá kỹ năng mới"
 * lặp đi lặp lại cho những node đã mở từ lâu. Truyền vào id bài vừa xong thì
 * chỉ những node mà chính bài đó vừa gỡ nốt điều kiện tiên quyết mới được trả
 * về, và tính được trực tiếp như vậy nên không cần lưu "đã báo chưa" ở đâu cả.
 */
export async function getUnlockedSkills(
  userId: string,
  justCompletedLessonId?: number
): Promise<SkillNode[]> {
  const supabase = createClient();

  // Lấy các bài học user đã hoàn thành
  const { data: progress } = await supabase
    .from("user_progress")
    .select("lesson_id")
    .eq("user_id", userId)
    .eq("completed", true);

  const completedLessonIds = new Set(progress?.map((p) => Number(p.lesson_id)) || []);
  const prereqNodeOf = (prereqId: string) => SKILL_TREE.find((n) => n.id === prereqId);

  // Lọc các node mà user chưa hoàn thành nhưng đã hoàn thành tất cả prereq
  return SKILL_TREE.filter((node) => {
    // Nếu chính node này đã học xong, không cần báo mở khóa nữa
    if (completedLessonIds.has(node.requiredLessonId)) return false;

    // Phải hoàn thành tất cả prerequisites
    const allPrereqsDone = node.prerequisites.every((prereqId) => {
      const prereqNode = prereqNodeOf(prereqId);
      return prereqNode && completedLessonIds.has(prereqNode.requiredLessonId);
    });
    if (!allPrereqsDone) return false;

    if (justCompletedLessonId === undefined) return true;

    // Chỉ giữ node mà bài vừa học xong chính là điều kiện tiên quyết cuối cùng.
    return node.prerequisites.some(
      (prereqId) => prereqNodeOf(prereqId)?.requiredLessonId === justCompletedLessonId
    );
  });
}
