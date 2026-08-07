"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { stationsOf } from "./stations";
import { gatesOf } from "./gates";

/** Bảng chỉ đường của sảnh thư viện.
 *
 *  Tám phòng học thật đều nằm trên ban công TẦNG HAI, và thẻ giới thiệu từng
 *  phòng chỉ hiện khi đứng cách cửa dưới `STATION_REACH` (2,7m). Hai cánh cổng
 *  ra Nhóm học và Phố nghề cũng vậy. Nghĩa là toàn bộ danh sách đích đến bị
 *  giấu sau hành vi khám phá - người vào lần đầu đứng ở tầng trệt không có
 *  cách nào biết là có tám phòng ở trên, chứ chưa nói tới việc biết phải leo
 *  thang đầu bắc. Thứ duy nhất hiện ngay lúc vào là thẻ "bài kế tiếp" và ô
 *  chat, còn dòng hướng dẫn thì chỉ nói cách ĐI, không nói đi ĐÂU.
 *
 *  Panel này nói ra danh sách đó. Hai quyết định đáng ghi lại:
 *
 *  1. BẤM LÀ VÀO THẲNG, không phải "tự đi bộ tới cửa". Đặt `walkRef.target`
 *     nghe hấp dẫn hơn và sẽ hỏng: `inputTowardTarget` lái theo đường thẳng và
 *     `world.ts` giữ tầng trong TRẠNG THÁI người chơi chứ không suy từ toạ độ,
 *     nên không có đường nào từ sàn lên ban công ngoài việc thật sự leo thang.
 *     Nhắm một đích trên tầng hai từ dưới sảnh chỉ làm nhân vật dí vào tường.
 *  2. Vẫn NÓI cửa nằm ở đâu. Nếu chỉ là một menu điều hướng thì thế giới 3D
 *     thành thừa; dòng "ban công tầng hai · thang ở đầu bắc" là thứ biến bảng
 *     này thành bản đồ của một nơi có thật, và người muốn đi bộ tới vẫn đi
 *     được. */

/** Mở hay thu gọn, nhớ qua các lần vào. Người mới cần thấy cả danh sách nên
 *  mặc định là MỞ; người đã thuộc đường thu gọn một lần và nó ở yên như thế.
 *
 *  Lưu chính trạng thái, không lưu cờ "đã xem lần đầu". Bản đầu làm theo cách
 *  thứ hai và hỏng ngay ở dev: StrictMode mount hai lần, lần một ghi cờ rồi mở
 *  panel, lần hai state về lại `false` còn cờ thì đã có nên effect thoát sớm -
 *  người vào lần đầu tiên thấy đúng cái panel thu gọn mà cả tính năng này sinh
 *  ra để tránh. Trạng thái tự nó thì đọc sao ghi vậy, mount mấy lần cũng thế. */
const OPEN_KEY = "lobbyDirectoryOpen";

export default function LobbyDirectory() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  // Đọc trong effect chứ không trong useState: LobbyClient vẫn được render ở
  // server, và một giá trị khởi tạo từ localStorage sẽ lệch giữa hai lần render.
  useEffect(() => {
    try {
      setOpen(window.localStorage.getItem(OPEN_KEY) !== "0");
    } catch {
      // Trình duyệt chặn localStorage thì cứ mở - thà thừa một lần thu gọn còn
      // hơn giấu mất danh sách của người vào lần đầu.
      setOpen(true);
    }
  }, []);

  const toggle = (next: boolean) => {
    setOpen(next);
    try {
      window.localStorage.setItem(OPEN_KEY, next ? "1" : "0");
    } catch {
      // Không nhớ được thì thôi, phiên này vẫn đúng.
    }
  };

  const stations = stationsOf(t);
  const gates = gatesOf(t);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => toggle(true)}
        className="pointer-events-auto rounded-2xl bg-stone-900/85 px-4 py-2.5 text-xs font-bold text-amber-200 shadow-lg backdrop-blur transition hover:bg-stone-800"
      >
        🧭 {t.lobby.directoryToggle}
      </button>
    );
  }

  // Trần chiều cao thấp hơn hẳn trên điện thoại: panel này còn xếp DƯỚI tiêu
  // đề và thẻ bài kế tiếp, nên 70vh ở màn 812px là chạm tới nút "Ngồi xuống"
  // và cần điều khiển ở đáy. Danh sách tự cuộn bên trong, nên cắt ngắn không
  // mất mục nào.
  return (
    <div className="pointer-events-auto flex max-h-[min(46vh,32rem)] w-72 max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-stone-700 bg-stone-900/90 shadow-2xl backdrop-blur sm:max-h-[min(70vh,32rem)]">
      <div className="flex items-center justify-between gap-2 border-b border-stone-700 px-4 py-2.5">
        <h2 className="text-xs font-black uppercase tracking-widest text-amber-300">
          {t.lobby.directoryTitle}
        </h2>
        <button
          type="button"
          onClick={() => toggle(false)}
          className="shrink-0 rounded-lg px-2 py-1 text-[11px] font-bold text-stone-400 transition hover:bg-stone-800 hover:text-stone-200"
        >
          {t.lobby.directoryClose}
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
        <p className="px-1 pb-2 text-[10px] font-bold uppercase tracking-wider text-stone-500">
          {t.lobby.directoryUpstairs}
        </p>
        <ul className="flex flex-col gap-1">
          {stations.map((s) => (
            <li key={s.id}>
              <Link
                href={s.href}
                className="flex items-start gap-2.5 rounded-xl px-2 py-1.5 transition hover:bg-stone-800"
              >
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: s.accent }}
                />
                <span className="min-w-0">
                  <span className="block text-xs font-bold text-stone-100">{s.room}</span>
                  <span className="block text-[11px] leading-snug text-stone-400">{s.blurb}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="px-1 pb-2 pt-4 text-[10px] font-bold uppercase tracking-wider text-stone-500">
          {t.lobby.directoryGates}
        </p>
        <ul className="flex flex-col gap-1">
          {gates.map((g) => (
            <li key={g.id}>
              <Link
                href={g.href}
                className="flex items-start gap-2.5 rounded-xl px-2 py-1.5 transition hover:bg-stone-800"
              >
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: g.accent }}
                />
                <span className="min-w-0">
                  <span className="block text-xs font-bold text-stone-100">{g.shortLabel}</span>
                  <span className="block text-[11px] leading-snug text-stone-400">{g.blurb}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="border-t border-stone-700 px-4 py-2 text-[10px] leading-snug text-stone-500">
        {t.lobby.directoryHint}
      </p>
    </div>
  );
}
