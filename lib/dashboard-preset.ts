// Hai mức dày đặc của trang tổng quan, do người học tự chọn.
//
// Vì sao mặc định là "gon" chứ không phải giữ nguyên hiện trạng: dashboard
// đang dựng 13 widget, và phần lớn người dùng không bao giờ mở phần tuỳ chỉnh.
// Một bản đầy đủ làm mặc định kèm nút "cho gọn lại" nghĩa là với đa số người
// dùng không có gì thay đổi. Đảo lại thì người mới - nhóm dễ rời đi nhất -
// thấy một trang sạch ngay từ đầu, còn ai muốn đủ vẫn bấm một lần là có, và
// lựa chọn đó được nhớ.
//
// KHÔNG có widget nào bị xoá ở đây. "gon" chỉ ẩn, và mọi thứ ẩn đi đều quay
// lại nguyên vẹn ở "day-du". Điều đó đáng nói ra vì CommunityStreakWidget đã
// bị GỠ HẲN hai lần trước đây (30bca5b, 85b0f34) với lý do trùng lặp rồi phải
// đưa lại - chú thích của nó trong DashboardClient.tsx yêu cầu đừng gỡ lần
// nữa. Ẩn theo lựa chọn của chính người dùng không phải là gỡ.
export type DashboardPreset = "gon" | "day-du";

const STORAGE_KEY = "thtcdn_dashboard_preset";

export const DEFAULT_PRESET: DashboardPreset = "gon";

export function getStoredPreset(): DashboardPreset | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "gon" || stored === "day-du" ? stored : null;
  } catch {
    // Safari ở chế độ riêng tư ném lỗi khi đọc localStorage. Rơi về mặc định
    // thay vì làm hỏng cả trang tổng quan vì một tuỳ chọn hiển thị.
    return null;
  }
}

export function storePreset(preset: DashboardPreset) {
  try {
    localStorage.setItem(STORAGE_KEY, preset);
  } catch {
    // Không lưu được thì lựa chọn chỉ sống trong phiên này - vẫn tốt hơn là ném.
  }
}
