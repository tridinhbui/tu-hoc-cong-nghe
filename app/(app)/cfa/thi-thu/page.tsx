import type { Metadata } from "next";
import CfaMockExamClient from "@/components/CfaMockExamClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Thi thử CFA Level I",
  description:
    "Bài thi thử đúng khuôn đề thật: 180 câu, hai ca 135 phút, ba lựa chọn mỗi câu, chấm điểm tách theo từng môn.",
};

export default function CfaMockExamPage() {
  return <CfaMockExamClient />;
}
