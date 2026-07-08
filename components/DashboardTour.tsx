"use client";

import SpotlightTour, { type TourStep } from "@/components/SpotlightTour";

const STEPS: TourStep[] = [
  {
    selector: '[data-tour="track-selector"]',
    title: "Chọn lộ trình",
    text: "Bạn có 2 lộ trình: Tài chính cá nhân (ngắn hơn, cho người mới) và Tài chính chuyên ngành (sâu hơn). Có thể đổi qua lại bất cứ lúc nào.",
  },
  {
    selector: '[data-tour="resume-learning"]',
    title: "Học tiếp từ đâu",
    text: "Bấm vào đây để quay lại đúng bài học tiếp theo trong lộ trình, không cần tự tìm.",
  },
  {
    selector: '[data-tour="stage-list"]',
    title: "Lộ trình học",
    text: "Toàn bộ bài học được chia theo từng Chặng, mở khoá tuần tự. Bấm vào một Chặng để xem danh sách bài bên trong.",
  },
  {
    selector: '[data-tour="user-stats"]',
    title: "Tiến độ của bạn",
    text: "Theo dõi XP, cấp độ và số ngày học liên tiếp ở đây.",
  },
  {
    selector: '[data-tour="free-docs"]',
    title: "Tài liệu miễn phí & Thống kê",
    text: "Trên máy tính, hai mục này nằm ở đây. Trên điện thoại, bấm vào biểu tượng menu (☰) để mở.",
  },
];

export default function DashboardTour({ userId }: { userId?: string | null }) {
  return <SpotlightTour steps={STEPS} storageKey="dashboard_tour_seen_v1" userId={userId} remoteKey="dashboard" />;
}
