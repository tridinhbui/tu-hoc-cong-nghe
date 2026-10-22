import LearningPathHub from "@/components/learning-path/LearningPathHub";
import { loadLearningPath } from "./data";

// Đọc Cloudflare lúc render, nên không prerender tĩnh.
export const dynamic = "force-dynamic";

/** /lo-trinh - lớp chọn lối: Bắt đầu từ đầu, Học theo nghề, Học theo nhu cầu.
 *  Mỗi lối có trang chi tiết riêng bên dưới; dữ liệu chung ở ./data.ts. */
export default async function LearningPathPage() {
  const { milestones, savedTrack, flowEffort } = await loadLearningPath();
  return <LearningPathHub milestones={milestones} savedTrack={savedTrack} flowEffort={flowEffort} />;
}
