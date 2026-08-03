import type { Metadata } from "next";
import FrmMockExamClient from "@/components/FrmMockExamClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Thi thử FRM",
  description:
    "Bài thi thử đúng khuôn đề GARP: Part I 100 câu, Part II 80 câu, mỗi phần một ca 4 tiếng, chấm điểm tách theo từng môn.",
};

export default function FrmMockExamPage() {
  return <FrmMockExamClient />;
}
