import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

/** Hai cánh cổng sang thế giới 3D khác, tách khỏi phần vẽ.
 *
 *  Cùng lý do đã tách `stations.ts`: đây vừa là hình học (chỗ đặt khung vòm)
 *  vừa là điều hướng (đường dẫn). Nhưng còn một lý do nữa, riêng cho file này -
 *  bảng chỉ đường trên HUD cần đúng danh sách này, và HUD nằm NGOÀI Canvas.
 *  Nếu nó `import` từ RoomFixtures thì kéo theo cả `three` và
 *  `@react-three/fiber` vào bundle mà `dynamic(ssr:false)` ở LobbyClient đang
 *  cố giữ ra ngoài. */

export interface GateTarget {
  id: string;
  href: string;
  /** Lời mời hiện khi đang đứng trước cổng - nói ra hành động ("bước qua"). */
  label: string;
  /** Tên nơi đến, cho bảng chỉ đường: ở đó tiêu đề mục đã nói chúng là cổng. */
  shortLabel: string;
  /** Một dòng về nơi đến, cho cân với mô tả của tám phòng học. */
  blurb: string;
  accent: string;
}

/** Cổng ở đầu bắc phòng đọc và cổng cạnh sảnh tròn, kèm nhãn theo ngôn ngữ
 *  hiện tại. Vị trí đặt trong cảnh vẫn nằm ở RoomFixtures. */
export function gatesOf(t: Dictionary): GateTarget[] {
  const c = t.finalTwo.roomFixturesGates;
  return [
    {
      id: "nhom-hoc",
      href: "/nhom-hoc",
      label: c.studyLabel,
      shortLabel: c.studyShort,
      blurb: c.studyBlurb,
      accent: "#7dd3fc",
    },
  ];
}
