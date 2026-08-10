"use client";

import DashboardArenaCard from "@/components/DashboardArenaCard";

/** Lớp client mỏng cho cảnh xem thử thẻ "Thử sức".
 *
 *  Cùng lý do như ConnectMenuPreview: app/dev-world-preview/page.tsx là server
 *  component, và truyền thẳng `onOpenBoss={() => {}}` từ đó vào một client
 *  component làm cả route 500 ("Event handlers cannot be passed to Client
 *  Component props").
 *
 *  Hai hàm rỗng ở đây nghĩa là cảnh này soát được BỐ CỤC và chữ của thẻ, chứ
 *  KHÔNG soát được hai modal mà nút thật sẽ mở - chúng cần phiên đăng nhập. */
export default function ArenaCardPreview() {
  return <DashboardArenaCard onOpenBoss={() => {}} onOpenPvp={() => {}} />;
}
