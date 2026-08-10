/** Một panel vừa tự giữ trạng thái mở, vừa cho cha điều khiển - phần dễ sai.
 *
 *  Ba panel nổi trong repo (FloatingStudyGroupChat, ChatWithAdminWidget,
 *  ReferralPromptModal) đều chạy hai chế độ:
 *
 *    - KHÔNG ĐIỀU KHIỂN: state bên trong là sự thật.
 *    - CÓ ĐIỀU KHIỂN: GlobalChatWrapper truyền `isOpen`, sự thật nằm ở cha, và
 *      state bên trong ĐỨNG YÊN ở `false` mãi mãi - cha mở panel bằng cách đổi
 *      `activeChatWidget`, không đụng gì tới bên trong.
 *
 *  Cái bẫy nằm ở vế thứ hai. Hai trong ba panel viết setter kiểu này:
 *
 *      setInternal(prev => {
 *        const next = ...;
 *        if (prev !== next) onOpenChange?.(next);   // prev là state BÊN TRONG
 *        return next;
 *      });
 *
 *  Ở chế độ có điều khiển, `prev` luôn là `false`. Bấm nút đóng gọi
 *  `setOpen(false)`: `false !== false` sai, `onOpenChange` không chạy, cha
 *  không biết gì, panel không đóng. Người dùng thấy đúng một triệu chứng: bấm
 *  X không tắt được.
 *
 *  Hàm này nhận trạng thái CÓ HIỆU LỰC và trả về `changed` so với chính nó.
 *
 *  VÌ SAO TRẢ `changed` CHỨ KHÔNG GỌI VÔ ĐIỀU KIỆN. FloatingStudyGroupChat
 *  dùng setter làm chỗ ĐỌC trạng thái trong callback realtime
 *  (`setOpen(cur => cur)` để đếm tin chưa đọc). Gọi `onOpenChange` vô điều kiện
 *  sẽ bắn một lần ghi state lên cha cho MỖI tin nhắn tới, kéo cả cây vẽ lại.
 *  ReferralPromptModal gọi vô điều kiện được vì nó không có chỗ đọc kiểu ấy -
 *  đó là lý do nó đúng mà không cần hàm này. */

export function resolveOpenChange(
  current: boolean,
  openState: boolean | ((prev: boolean) => boolean)
): { next: boolean; changed: boolean } {
  const next = typeof openState === "function" ? openState(current) : openState;
  return { next, changed: next !== current };
}
