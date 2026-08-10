"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Users, UserPlus, MessagesSquare, MessageCircleHeart, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import {
  EMPTY_CONNECT_COUNTS,
  connectBadgeLabel,
  hasPending,
  type ConnectCounts,
} from "@/lib/connect-menu-badge";
import { getPendingFriendRequestCount, subscribeToSocialGraph } from "@/lib/supabase-social";
import { getUnreadAdminReplyCount, subscribeToChatMessages } from "@/lib/supabase-chat";
import { useDraggablePosition } from "@/lib/hooks/useDraggablePosition";

/** Một nút duy nhất ở góc phải dưới, thay cho ba nút nổi chồng lên nhau.
 *
 *  TRƯỚC: góp ý, mời bạn và nhóm học mỗi cái một nút tròn 56px, xếp dọc từ
 *  `bottom-6` lên `bottom-40`. Ba chấm màu khác nhau chiếm gần một phần ba
 *  chiều cao màn hình điện thoại, và không cái nào nói được là có việc đang
 *  chờ.
 *
 *  SAU: một nút ba gạch. Mở ra là bốn dòng - bạn bè & kết nối, mời bạn, nhóm
 *  học, góp ý.
 *
 *  HUY HIỆU LÀ PHẦN QUAN TRỌNG NHẤT, không phải việc gộp. Người dùng báo rằng
 *  lời mời kết bạn tới mà không thấy báo ở đâu, và đúng thế: trước đây lời mời
 *  kết bạn KHÔNG có nút nào ở góc, trang Bạn bè chỉ tới được từ menu điều
 *  hướng. Gộp mà không có huy hiệu thì việc gộp lại giấu thêm hai thứ nữa.
 *
 *  Trợ lý AI (FloatingChatbot) KHÔNG nằm trong menu này - nó ở ngoài, theo
 *  đúng yêu cầu: cái tên "chatbot" để dành cho trợ lý, còn luồng nhắn cho đội
 *  ngũ đổi tên thành "Góp ý" và vào đây. */
export default function ConnectMenu({
  userId,
  groupUnread,
  onOpenGroup,
  onOpenFeedback,
  onOpenInvite,
}: {
  userId: string;
  /** Nhóm học do FloatingStudyGroupChat quản lý, nên số của nó truyền vào. */
  groupUnread: number;
  onOpenGroup: () => void;
  onOpenFeedback: () => void;
  onOpenInvite: () => void;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const bubbleRef = useRef<HTMLButtonElement>(null);
  // Khoá riêng cho nút này. Ba nút nổi trong app dùng ba khoá khác nhau, nếu
  // không thì dời một cái là hai cái kia nhảy theo.
  const bubbleDrag = useDraggablePosition("thtcdn_connect_menu_pos", bubbleRef);
  const [counts, setCounts] = useState<ConnectCounts>(EMPTY_CONNECT_COUNTS);

  // Trả về số thay vì tự đặt state, và người gọi đặt trong `.then` - cùng mẫu
  // với NotificationBell. Gọi thẳng một hàm async trong thân effect là đúng
  // thứ quy tắc react-hooks/set-state-in-effect của repo chặn.
  //
  // Hai lời gọi chạy song song và mỗi cái tự chịu lỗi của mình: một nguồn hỏng
  // thì hai nguồn kia vẫn báo được, thay vì cả huy hiệu tắt.
  const readCounts = useCallback(
    () =>
      Promise.all([
        getPendingFriendRequestCount().catch(() => 0),
        getUnreadAdminReplyCount(userId).catch(() => 0),
      ]).then(([friendRequests, feedbackReplies]) => ({ friendRequests, feedbackReplies })),
    [userId]
  );

  useEffect(() => {
    let cancelled = false;
    const refresh = () => {
      readCounts().then((next) => {
        if (!cancelled) setCounts((prev) => ({ ...prev, ...next }));
      });
    };
    refresh();
    // Cùng hai kênh realtime mà FriendsClient và ChatWithAdminWidget đã dùng,
    // nên huy hiệu đổi ngay lúc lời mời tới chứ không chờ tải lại trang - đó
    // là toàn bộ điểm của nó.
    const unsubSocial = subscribeToSocialGraph(userId, refresh);
    const unsubChat = subscribeToChatMessages(userId, refresh, refresh);
    return () => {
      cancelled = true;
      unsubSocial();
      unsubChat();
    };
  }, [userId, readCounts]);

  const allCounts: ConnectCounts = { ...counts, groupMessages: groupUnread };
  const badge = connectBadgeLabel(allCounts);

  const items = [
    {
      key: "friends" as const,
      icon: Users,
      label: t.connectMenu.friends,
      sub: t.connectMenu.friendsSub,
      href: "/ban-be",
      dot: hasPending(allCounts, "friendRequests"),
      count: allCounts.friendRequests,
    },
    {
      key: "group" as const,
      icon: MessagesSquare,
      label: t.connectMenu.group,
      sub: t.connectMenu.groupSub,
      onClick: onOpenGroup,
      dot: hasPending(allCounts, "groupMessages"),
      count: allCounts.groupMessages,
    },
    {
      key: "feedback" as const,
      icon: MessageCircleHeart,
      label: t.connectMenu.feedback,
      sub: t.connectMenu.feedbackSub,
      onClick: onOpenFeedback,
      dot: hasPending(allCounts, "feedbackReplies"),
      count: allCounts.feedbackReplies,
    },
    {
      key: "invite" as const,
      icon: UserPlus,
      label: t.connectMenu.invite,
      sub: t.connectMenu.inviteSub,
      onClick: onOpenInvite,
      dot: false,
      count: 0,
    },
  ];

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Nền mờ để bấm ra ngoài là đóng. Không có nó thì trên điện thoại
                menu che mất nội dung và không có chỗ nào rõ ràng để thoát. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-stone-950/20 backdrop-blur-[2px]"
            />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.16 }}
              // Bảng bám theo nút bằng CÙNG cặp motion value. Không có dòng này
              // thì kéo nút sang chỗ khác rồi mở ra, bảng vẫn bung ở góc phải
              // dưới - trông như bấm nhầm vào thứ gì đó.
              style={{ x: bubbleDrag.x, y: bubbleDrag.y }}
              className="fixed bottom-24 right-4 sm:right-6 z-50 w-[17.5rem] overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl dark:border-stone-800 dark:bg-stone-900"
            >
              <div className="flex items-center justify-between border-b border-stone-100 px-4 py-3 dark:border-stone-800">
                <p className="text-sm font-black text-stone-900 dark:text-stone-100">{t.connectMenu.title}</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t.connectMenu.close}
                  className="rounded-full p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-1.5">
                {items.map((item) => {
                  const Icon = item.icon;
                  const body = (
                    <>
                      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                        <Icon className="h-4.5 w-4.5" />
                        {item.dot && (
                          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-stone-900" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1 text-left">
                        <span className="block truncate text-sm font-bold text-stone-900 dark:text-stone-100">
                          {item.label}
                        </span>
                        <span className="block truncate text-[11px] text-stone-500 dark:text-stone-400">
                          {item.sub}
                        </span>
                      </span>
                      {item.count > 0 && (
                        <span className="shrink-0 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-black tabular-nums text-white">
                          {item.count > 9 ? "9+" : item.count}
                        </span>
                      )}
                    </>
                  );
                  const cls =
                    "flex w-full items-center gap-3 rounded-2xl px-2.5 py-2.5 transition-colors hover:bg-stone-50 dark:hover:bg-stone-800/60 cursor-pointer";

                  return item.href ? (
                    <Link key={item.key} href={item.href} onClick={() => setOpen(false)} className={cls}>
                      {body}
                    </Link>
                  ) : (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        item.onClick?.();
                      }}
                      className={cls}
                    >
                      {body}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.button
        ref={bubbleRef}
        type="button"
        drag
        dragElastic={0.06}
        dragMomentum={false}
        onDragStart={bubbleDrag.onDragStart}
        onDragEnd={bubbleDrag.onDragEnd}
        // x/y do `drag` sở hữu hoàn toàn, không đưa vào initial/animate - xem
        // chú thích dài trong useDraggablePosition về việc hai bên cùng ghi vào
        // một cặp motion value thì cái nút bật về chỗ cũ ngay khi vừa kéo.
        style={{ x: bubbleDrag.x, y: bubbleDrag.y }}
        onClick={() => {
          // Một cú kéo kết thúc bằng một sự kiện click. Không chặn thì thả tay
          // ra là bảng mở/đóng theo, tức không thể chỉ dời nút mà không đụng
          // vào menu.
          if (bubbleDrag.isDragging) return;
          setOpen((v) => !v);
        }}
        aria-label={t.connectMenu.open}
        title={t.connectMenu.dragTitle}
        className="fixed bottom-6 right-4 sm:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-stone-900 text-white shadow-xl transition-transform hover:scale-105 dark:border-stone-800 dark:bg-stone-100 dark:text-stone-900 cursor-grab active:cursor-grabbing select-none touch-none"
      >
        {open ? <X className="h-5.5 w-5.5 pointer-events-none" /> : <Menu className="h-5.5 w-5.5 pointer-events-none" />}
        {!open && badge && (
          <span className="absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-black tabular-nums text-white ring-2 ring-white dark:ring-stone-900">
            {badge}
          </span>
        )}
      </motion.button>
    </>
  );
}
