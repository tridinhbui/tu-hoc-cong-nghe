import NeedsPathClient from "@/components/learning-path/NeedsPathClient";
import { loadLearningPath } from "../data";

export const dynamic = "force-dynamic";

/** Học theo nhu cầu - các lối ngắn tới một việc cụ thể (website, trợ lý AI...).
 *  Người chưa đăng nhập xem cùng nội dung ở /hoc-theo-nhu-cau. */
export default async function Page() {
  const { flowEffort } = await loadLearningPath();
  return <NeedsPathClient flowEffort={flowEffort} />;
}
