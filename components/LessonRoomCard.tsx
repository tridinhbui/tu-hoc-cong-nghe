"use client";

import Link from "next/link";
import { linkForLesson, roomHref } from "@/lib/lesson-room-links";
import { civicRoomsOf } from "@/components/career-district/district-space";
import { useI18n } from "@/lib/i18n/context";
import { mergeLessonRoomLink } from "@/lib/lesson-room-links-i18n";
import { format } from "@/lib/i18n";

/** Đường dẫn từ một bài học sang căn phòng 3D dạy đúng điều đó.
 *
 *  Sáu căn phòng dạy trong Phố nghề chỉ tới được bằng cách tìm ra /pho-nghe,
 *  đi bộ dọc con phố 180 m, rồi đoán đúng một trong 22 cánh cửa - và cả ứng
 *  dụng chỉ có hai đường dẫn tới /pho-nghe. Tấm thẻ này nối theo chiều ngược
 *  lại, ở đúng lúc căn phòng có ích nhất: ngay sau khi đọc xong.
 *
 *  Đặt SAU phần ghi nhớ và bên trong cổng nhớ lại, không đặt ở đầu bài. Ở đầu
 *  bài nó là một cái nút rủ người ta bỏ dở; ở đây nó là bước tiếp theo của
 *  người vừa tự tóm tắt xong.
 *
 *  Bài nào không có trong bảng thì không dựng gì cả - đa số bài không có, và
 *  gắn một cái nút vào mọi bài sẽ khiến nó thành thứ ai cũng lướt qua. */
export default function LessonRoomCard({ slug }: { slug: string }) {
  const { t, locale } = useI18n();
  const raw = linkForLesson(slug);
  // Chữ trên nút nằm ngoài từ điển UI - xem lib/lesson-room-links-i18n. `room`
  // không đi qua lớp phủ nên nút vẫn dẫn đúng phòng ở mọi ngôn ngữ.
  const link = raw ? mergeLessonRoomLink(slug, raw, locale) : raw;
  if (!link) return null;

  // Màu nhấn lấy từ chính căn phòng, không gõ lại: tấm thẻ và cánh cửa phải
  // cùng màu thì người học mới nhận ra mình vừa bấm cái gì khi tới nơi.
  const civicRooms = civicRoomsOf(t);
  const accent = civicRooms.find((c) => c.id === link.room)?.accent ?? "#a3e635";
  const label = civicRooms.find((c) => c.id === link.room)?.label ?? t.miscUi.lessonRoomCard.fallbackDistrictLabel;

  return (
    <Link
      href={roomHref(link.room)}
      className="group block overflow-hidden rounded-2xl border-2 border-stone-800 bg-stone-900 shadow-xl transition hover:border-stone-600"
    >
      <div className="flex items-start gap-4 px-6 py-5">
        <span
          className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg"
          style={{ backgroundColor: `${accent}22`, color: accent }}
          aria-hidden
        >
          🚪
        </span>
        <div className="min-w-0">
          <p
            className="text-[10px] font-black uppercase tracking-widest"
            style={{ color: accent }}
          >
            {format(t.miscUi.lessonRoomCard.viewIn3d, { label })}
          </p>
          <p className="mt-1 text-lg font-extrabold leading-snug text-white">{link.cta}</p>
          <p className="mt-1 text-sm leading-relaxed text-stone-400">{link.why}</p>
          <p className="mt-2 text-sm font-bold text-stone-300 group-hover:text-white">
            {t.miscUi.lessonRoomCard.openRoom}
          </p>
        </div>
      </div>
    </Link>
  );
}
