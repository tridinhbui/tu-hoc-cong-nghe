"use client";

import {
  CIVIC_ROOMS,
  getRoom,
  type Doorway,
  type DistrictRoomId,
} from "./district-space";
import { CAREER_CATEGORY_LABELS, CAREER_CATEGORY_ORDER } from "@/lib/career-categories";
import { useI18n } from "@/lib/i18n/context";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

/** Mục lục con phố: bấm một dòng là tới thẳng phòng đó.
 *
 *  Đi bộ là cái hay của khu phố, nhưng BẮT đi bộ mỗi lần là cái dở - phố dài
 *  180 m với 22 cánh cửa, và hai cửa xa nhau nhất cách 168 m.
 *
 *  Tách khỏi DistrictWorld vì đó là file 900 dòng nằm sau tường đăng nhập, nên
 *  không dựng nó lên để NHÌN được. Ở đây thì dựng thật trong test được
 *  (lib/__tests__/room-directory.test.tsx), và cách chia nhóm - thứ dễ lặng lẽ
 *  sai nhất - có người kiểm.
 *
 *  Danh sách suy ra từ cửa thật của con phố, không kê tay: thêm một phòng là
 *  có thêm một dòng ở đây, không phải sửa hai chỗ. */

/** Ký hiệu từng nơi. career-district.test.ts canh cho nó phủ hết mọi cửa trên
 *  phố: thiếu một id thì mục đó rơi về "■" và trông như một chỗ kém quan trọng
 *  hơn hàng xóm - đã xảy ra với cả sáu căn phòng dạy. */
export const PLACE_ICONS: Record<string, string> = {
  thap: "🛗",
  "khu-game": "🎮",
  "cong-vien": "🌳",
  "trung-tam": "⛲",
  "quan-ca-phe": "☕",
  "cua-hang": "🪞",
  "bang-vang": "🏆",
  "phong-thi": "📝",
  "can-ho": "🏠",
  "bao-tang": "🏛️",
  "nha-ban-be": "🏘️",
  "ba-bao-cao": "📊",
  "thap-lai-kep": "📈",
  "phong-lbo": "🧱",
  "vong-quay-tien": "🔄",
  "phan-bo-rui-ro": "🎲",
  "ban-tron": "🗣️",
};

/** Chia nhóm các cửa của con phố.
 *
 *  Tách khỏi phần vẽ để test được mà không cần dựng DOM: đây là chỗ duy nhất
 *  có thể sai về NỘI DUNG (một phòng dạy rơi nhầm xuống nhóm dưới rồi chìm),
 *  còn phần còn lại chỉ là thẻ và lớp CSS. */
export function directoryGroups(t: Dictionary): Array<{ title: string; doors: Doorway[] }> {
  // "Phòng nào là phòng dạy" đọc từ cờ `teaching` trong CIVIC_ROOMS chứ không
  // phải một danh sách thứ ba viết ở đây; cờ đó lại được đối chiếu với
  // TEACHING_PANELS bằng test.
  const teaching = new Set(CIVIC_ROOMS.filter((c) => c.teaching).map((c) => c.id as string));
  const doors = getRoom("street").doorways.filter(
    (d) => d.to !== "street" && !CAREER_CATEGORY_ORDER.includes(d.to as never)
  );
  return [
    { title: t.careerDistrict.roomDirectory.teachingRooms, doors: doors.filter((d) => teaching.has(d.to as string)) },
    { title: t.careerDistrict.roomDirectory.otherPlaces, doors: doors.filter((d) => !teaching.has(d.to as string)) },
  ];
}

function Row({
  door,
  onGo,
  here,
}: {
  door: Doorway;
  onGo: (d: Doorway) => void;
  /** Đây có phải chính căn phòng đang đứng không. */
  here?: boolean;
}) {
  const { t } = useI18n();
  return (
    <button
      type="button"
      onClick={() => onGo(door)}
      // Phòng đang đứng vẫn bấm được - bấm vào nó là về chỗ đứng ban đầu của
      // phòng, tức một cách thoát khi đi lạc vào góc. Nhưng nó phải TRÔNG khác,
      // vì một danh sách 22 dòng mà không dòng nào nói "bạn đang ở đây" thì
      // vẫn bắt người ta đọc lại tên phòng ở góc trên để định vị.
      className={`block w-full cursor-pointer rounded-lg px-2 py-1 text-left text-[11px] font-bold transition hover:bg-stone-800 ${
        here ? "bg-stone-800/70" : ""
      }`}
      style={{ color: door.accent }}
    >
      {PLACE_ICONS[door.to as string] ?? "■"} {door.label}
      {here && <span className="ml-1 text-[9px] font-black text-stone-400">· {t.careerDistrict.roomDirectory.youAreHere}</span>}
    </button>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-2 pb-0.5 pt-1.5 text-[9px] font-black uppercase tracking-widest text-stone-500">
      {children}
    </p>
  );
}

export default function RoomDirectory({
  open,
  onGo,
  pinned = false,
  current,
}: {
  open: boolean;
  onGo: (d: Doorway) => void;
  /** Ghim mở sẵn trên màn rộng.
   *
   *  Bật ở ngoài phố: đứng giữa phố thì mục lục là thứ đang cần. Tắt ở trong
   *  phòng: ghim luôn ở mọi phòng nghĩa là một tấm bảng che góc phải màn hình
   *  suốt lúc đang đọc ba báo cáo hay đang gõ bài giảng lại - trong phòng thì
   *  căn phòng mới là thứ đang cần. */
  pinned?: boolean;
  /** Phòng đang đứng, để đánh dấu "đang ở đây". */
  current?: DistrictRoomId;
}) {
  const { t } = useI18n();
  return (
    <div
      className={`pointer-events-auto absolute right-4 top-20 z-10 max-h-[calc(100vh-16rem)] w-44 overflow-y-auto rounded-2xl border border-stone-700 bg-stone-900/85 p-2.5 shadow-xl backdrop-blur ${
        open ? "block" : "hidden"
      } ${pinned ? "sm:block" : ""}`}
    >
      <p className="mb-1.5 text-[10px] font-black uppercase tracking-widest text-stone-400">
        {t.careerDistrict.roomDirectory.jumpToRoom}
      </p>
      <div className="space-y-1">
        {/* Chia nhóm có nhãn. Trước đó 22 cửa nằm trong một cột dài không đầu
            không cuối, và sáu căn phòng DẠY - thứ đáng vào nhất - chìm giữa
            cửa hàng, căn hộ và khu nhà bạn bè. */}
        {directoryGroups(t).map((g) => (
          <div key={g.title}>
            <Heading>{g.title}</Heading>
            {g.doors.map((d) => (
              <Row key={d.id} door={d} onGo={onGo} here={d.to === current} />
            ))}
          </div>
        ))}
        <Heading>{t.careerDistrict.roomDirectory.careerGroups}</Heading>
        {CAREER_CATEGORY_ORDER.map((c) => {
          const d = getRoom("street").doorways.find((x) => x.to === (c as DistrictRoomId));
          if (!d) return null;
          return (
            <button
              key={c}
              type="button"
              onClick={() => onGo(d)}
              className="block w-full cursor-pointer rounded-lg px-2 py-1 text-left text-[11px] font-bold text-stone-300 transition hover:bg-stone-800"
            >
              <span style={{ color: d.accent }}>■</span> {CAREER_CATEGORY_LABELS[c]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
