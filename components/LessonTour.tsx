"use client";

import SpotlightTour, { type TourStep } from "@/components/SpotlightTour";

const STEPS: TourStep[] = [
  {
    selector: '[data-tour="lesson-progress"]',
    title: "Tiến độ đọc bài",
    text: "Thanh này theo dõi bạn đã đọc đến đâu - tự động lưu lại, quay lại bài học lúc nào cũng thấy đúng chỗ cũ.",
  },
  {
    selector: '[data-tour="lesson-bookmark"]',
    title: "Lưu bài để đọc sau",
    text: "Bấm vào đây để đánh dấu bài học này, xem lại nhanh trong danh sách đã lưu của bạn.",
  },
  {
    selector: '[data-tour="lesson-tai-tai"]',
    title: "Tài Tài - mẹo tự động",
    text: "Mỗi bài đều có một mẹo ngắn liên quan đến nội dung, tự động chọn cho bạn - không cần hỏi.",
  },
  {
    selector: '[data-tour="lesson-quiz"]',
    title: "Kiểm tra nhanh",
    text: "Làm quiz ở đây để tự kiểm tra mình đã hiểu bài chưa - kết quả được lưu lại vào tiến độ học của bạn.",
  },
];

// Same one-time spotlight walkthrough mechanism as the dashboard, but for a
// first-time visitor's very first lesson page - including the free preview
// lesson reachable without an account, which never sees the dashboard tour
// at all since it never visits /dashboard.
export default function LessonTour() {
  return <SpotlightTour steps={STEPS} storageKey="lesson_tour_seen_v1" />;
}
