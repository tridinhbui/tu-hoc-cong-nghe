import LearningPathClient from "@/components/LearningPathClient";
import { loadLearningPath } from "../data";

export const dynamic = "force-dynamic";

/** Học theo nghề - tuyến nghề công nghệ. Chọn ở /lo-trinh; vào trang này là ghi hướng "professional". */
export default async function Page() {
  const data = await loadLearningPath();
  return <LearningPathClient {...data} lockedTrack="professional" />;
}
