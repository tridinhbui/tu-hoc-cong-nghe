"use client";

import SpotlightTour, { type TourStep } from "@/components/SpotlightTour";

// The learning path moved to its own /hoc-bai route, so the steps that point
// at it (track selector, resume card, stage list) only have targets there.
// Running one combined list on both routes would silently drop those three
// steps on the dashboard (SpotlightTour skips targets it can't find) - which
// is most of what a first-time learner needs to be shown. So each route gets
// the steps whose targets it actually renders, tracked under its own storage
// key so both play once.
const OVERVIEW_STEPS: TourStep[] = [
  {
    selector: '[data-tour="hoc-bai-cta"]',
    title: "Chỗ học bài",
    text: "Toàn bộ lộ trình và bài học nằm ở trang Học bài. Bấm vào đây (hoặc mục \"Học bài\" ở menu bên trái) mỗi khi bạn muốn học.",
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

const LESSONS_STEPS: TourStep[] = [
  {
    selector: '[data-tour="resume-learning"]',
    title: "Học tiếp từ đâu",
    text: "Bấm vào đây để quay lại đúng bài học tiếp theo trong lộ trình, không cần tự tìm.",
  },
  {
    selector: '[data-tour="track-selector"]',
    title: "Chọn lộ trình",
    text: "Bạn có 2 lộ trình: Tài chính cá nhân (ngắn hơn, cho người mới) và Tài chính chuyên ngành (sâu hơn). Có thể đổi qua lại bất cứ lúc nào.",
  },
  {
    selector: '[data-tour="stage-list"]',
    title: "Lộ trình học",
    text: "Toàn bộ bài học được chia theo từng Chặng, mở khoá tuần tự. Bấm vào một Chặng để xem danh sách bài bên trong.",
  },
];

export default function DashboardTour({
  userId,
  view = "overview",
}: {
  userId?: string | null;
  view?: "overview" | "lessons";
}) {
  const isLessons = view === "lessons";
  return (
    <SpotlightTour
      steps={isLessons ? LESSONS_STEPS : OVERVIEW_STEPS}
      storageKey={isLessons ? "lessons_tour_seen_v1" : "dashboard_tour_seen_v1"}
      userId={userId}
      remoteKey={isLessons ? "lessons" : "dashboard"}
    />
  );
}
