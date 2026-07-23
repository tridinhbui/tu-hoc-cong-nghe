import { Suspense } from "react";
import FinancialRpgWorldMap from "@/components/FinancialRpgWorldMap";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Thế Giới Game Tài Chính | TuHocTaiChinh.org",
  description: "Bản đồ thị trấn RPG Tài chính nhập vai với các chế độ Săn Boss Server, Cây kỹ năng, Bang Hội và Đấu Trường 1v1 PvP.",
};

export default function GamePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50 flex items-center justify-center text-stone-500">Đang tải Thế Giới Game...</div>}>
      <FinancialRpgWorldMap />
    </Suspense>
  );
}
