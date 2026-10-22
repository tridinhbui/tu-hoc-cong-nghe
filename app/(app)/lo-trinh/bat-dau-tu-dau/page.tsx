import LearningPathClient from "@/components/LearningPathClient";
import { loadLearningPath } from "../data";

export const dynamic = "force-dynamic";

/** Bắt đầu từ đầu - đường chung từ con số 0. Chọn ở /lo-trinh; vào trang này là ghi hướng "personal". */
export default async function Page() {
  const data = await loadLearningPath();
  return <LearningPathClient {...data} lockedTrack="personal" />;
}
