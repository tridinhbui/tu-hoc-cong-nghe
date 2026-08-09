"use client";

import ConnectMenu from "@/components/ConnectMenu";

/** Lớp client mỏng cho cảnh xem thử menu Kết nối.
 *
 *  app/dev-world-preview/page.tsx là một server component, và truyền thẳng
 *  `onOpenGroup={() => {}}` từ đó vào ConnectMenu làm cả route 500: "Event
 *  handlers cannot be passed to Client Component props". Bản đầu của cảnh này
 *  mắc đúng lỗi đó. */
export default function ConnectMenuPreview() {
  return (
    <ConnectMenu
      // UUID hợp lệ nhưng không tồn tại: ba phép đếm trả 0, nên huy hiệu tổng
      // chỉ phản ánh `groupUnread` truyền tay dưới đây.
      userId="00000000-0000-4000-8000-000000000000"
      groupUnread={3}
      onOpenGroup={() => {}}
      onOpenFeedback={() => {}}
      onOpenInvite={() => {}}
    />
  );
}
