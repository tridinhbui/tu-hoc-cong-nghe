// Ánh sáng của phòng học nhóm 3D đổi theo giờ thật của người học.
//
// Phòng trước đây luôn là ban đêm: cửa sổ nhìn ra skyline tối, tường xám, chỉ
// có quầng đèn xanh trên bàn. Đẹp, nhưng một người ngồi học lúc 7 giờ sáng và
// một người ngồi lúc 2 giờ đêm nhìn thấy đúng một căn phòng - và cái vào lúc
// 2 giờ đêm mới là cái đúng.
//
// Toàn bộ file này là dữ liệu thuần: giờ vào, bảng màu ra. Không đọc đồng hồ ở
// đây - `getRoomLighting` nhận `hour` từ nơi gọi, nhờ vậy test được cả 24 giờ
// mà không phải giả lập thời gian, và component vẫn là chỗ duy nhất chạm vào
// `new Date()`.
//
// Một ràng buộc xuyên suốt: đây là phòng học, không phải phòng trưng bày. Ánh
// sáng phải đổi đủ để nhận ra mà không bao giờ làm chữ trên bảng trắng hay tên
// người ngồi khó đọc - nên mọi thay đổi dồn vào tường, cửa sổ và sàn, còn
// vùng quanh mặt bàn giữ độ sáng gần như cố định.

export type RoomTimeOfDay = "dawn" | "morning" | "afternoon" | "dusk" | "night" | "lateNight";

export interface RoomLighting {
  phase: RoomTimeOfDay;
  /** Nhãn ngắn hiện trên thẻ góc sân khấu. */
  label: string;
  /** Nền bên trong khung cửa sổ - thứ đổi rõ nhất. */
  windowSky: string;
  /** Quầng sáng hắt ra từ cửa sổ vào phòng. */
  windowGlow: string;
  /** Tường sau: sáng ở trên hay dưới tuỳ nguồn sáng là cửa sổ hay đèn bàn. */
  backWall: string;
  /** Hai tường bên, tối hơn tường sau một bậc. */
  sideWallLeft: string;
  sideWallRight: string;
  /** Vũng sáng trên sàn dưới đèn thả. */
  floorPool: string;
  /** Độ tối của vignette quanh mép sân khấu, 0 → 1. Khuya thì đậm nhất. */
  vignette: number;
}

const LIGHTING: Record<RoomTimeOfDay, Omit<RoomLighting, "phase">> = {
  // 5–7h. Trời vừa hé, cửa sổ là nguồn sáng lạnh và yếu.
  dawn: {
    label: "Rạng sáng",
    windowSky: "linear-gradient(165deg, #7dd3fc 0%, #38bdf8 40%, #0ea5e9 100%)",
    windowGlow: "0 0 60px rgba(56,189,248,0.42)",
    backWall: "linear-gradient(180deg, #1e293b 0%, #1c1917 62%, #292524 100%)",
    sideWallLeft: "linear-gradient(90deg, #0f172a 0%, #1c1917 100%)",
    sideWallRight: "linear-gradient(270deg, #0f172a 0%, #1c1917 100%)",
    floorPool:
      "radial-gradient(circle, rgba(125,211,252,0.14) 0%, rgba(16,185,129,0.06) 45%, transparent 72%)",
    vignette: 0.5,
  },
  // 7–11h. Sáng nhất trong ngày, nắng xiên qua cửa sổ.
  morning: {
    label: "Buổi sáng",
    windowSky: "linear-gradient(165deg, #e0f2fe 0%, #7dd3fc 45%, #38bdf8 100%)",
    windowGlow: "0 0 78px rgba(186,230,253,0.55)",
    backWall: "linear-gradient(180deg, #44403c 0%, #292524 58%, #1c1917 100%)",
    sideWallLeft: "linear-gradient(90deg, #1c1917 0%, #3f3a36 100%)",
    sideWallRight: "linear-gradient(270deg, #1c1917 0%, #3f3a36 100%)",
    floorPool:
      "radial-gradient(circle, rgba(224,242,254,0.16) 0%, rgba(16,185,129,0.07) 45%, transparent 72%)",
    vignette: 0.34,
  },
  // 11–16h. Nắng gắt, tường sáng đều, bóng đổ ít nhất.
  afternoon: {
    label: "Buổi chiều",
    windowSky: "linear-gradient(165deg, #fef3c7 0%, #93c5fd 48%, #60a5fa 100%)",
    windowGlow: "0 0 72px rgba(254,243,199,0.5)",
    backWall: "linear-gradient(180deg, #57534e 0%, #3f3a36 60%, #292524 100%)",
    sideWallLeft: "linear-gradient(90deg, #292524 0%, #44403c 100%)",
    sideWallRight: "linear-gradient(270deg, #292524 0%, #44403c 100%)",
    floorPool:
      "radial-gradient(circle, rgba(254,243,199,0.15) 0%, rgba(16,185,129,0.07) 45%, transparent 72%)",
    vignette: 0.3,
  },
  // 16–19h. Hoàng hôn - khoảnh khắc căn phòng đẹp nhất, nên cho nó màu đậm nhất.
  dusk: {
    label: "Hoàng hôn",
    windowSky: "linear-gradient(165deg, #fdba74 0%, #f97316 38%, #9a3412 78%, #451a03 100%)",
    windowGlow: "0 0 86px rgba(249,115,22,0.52)",
    backWall: "linear-gradient(180deg, #431407 0%, #292524 58%, #1c1917 100%)",
    sideWallLeft: "linear-gradient(90deg, #1c1917 0%, #3b2318 100%)",
    sideWallRight: "linear-gradient(270deg, #1c1917 0%, #3b2318 100%)",
    floorPool:
      "radial-gradient(circle, rgba(251,146,60,0.16) 0%, rgba(16,185,129,0.06) 45%, transparent 72%)",
    vignette: 0.44,
  },
  // 19–24h. Cảnh gốc: skyline đêm, đèn bàn xanh là nguồn sáng chính.
  night: {
    label: "Buổi tối",
    windowSky: "linear-gradient(165deg, #0b3b33 0%, #052e2b 55%, #03211f 100%)",
    windowGlow: "0 0 46px rgba(16,185,129,0.28)",
    backWall: "linear-gradient(180deg, #0a0908 0%, #1c1917 60%, #292524 100%)",
    sideWallLeft: "linear-gradient(90deg, #0a0908 0%, #191614 100%)",
    sideWallRight: "linear-gradient(270deg, #0a0908 0%, #191614 100%)",
    floorPool:
      "radial-gradient(circle, rgba(16,185,129,0.17) 0%, rgba(16,185,129,0.05) 45%, transparent 72%)",
    vignette: 0.6,
  },
  // 0–5h. Chỉ còn đèn bàn. Tường gần như tắt hẳn, cửa sổ tối hơn cả tường -
  // ngoài kia không còn gì sáng nữa. Người ngồi học giờ này đáng được thấy
  // căn phòng biết rằng bây giờ là mấy giờ.
  lateNight: {
    label: "Khuya",
    windowSky: "linear-gradient(165deg, #020617 0%, #0f172a 60%, #020617 100%)",
    windowGlow: "0 0 30px rgba(30,41,59,0.5)",
    backWall: "linear-gradient(180deg, #050505 0%, #0f0e0d 62%, #17150f 100%)",
    sideWallLeft: "linear-gradient(90deg, #030303 0%, #0f0e0d 100%)",
    sideWallRight: "linear-gradient(270deg, #030303 0%, #0f0e0d 100%)",
    floorPool:
      "radial-gradient(circle, rgba(251,191,36,0.16) 0%, rgba(16,185,129,0.05) 45%, transparent 72%)",
    vignette: 0.72,
  },
};

export function getRoomPhase(hour: number): RoomTimeOfDay {
  // Chuẩn hoá trước, để một giá trị giờ hỏng (hoặc âm) không rơi ra ngoài bảng
  // và trả về undefined ở giữa lúc đang render phòng.
  const h = ((Math.floor(hour) % 24) + 24) % 24;
  if (h < 5) return "lateNight";
  if (h < 7) return "dawn";
  if (h < 11) return "morning";
  if (h < 16) return "afternoon";
  if (h < 19) return "dusk";
  return "night";
}

export function getRoomLighting(hour: number): RoomLighting {
  const phase = getRoomPhase(hour);
  return { phase, ...LIGHTING[phase] };
}
