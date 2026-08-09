// Mã lỗi cho các route API, để câu chữ không phải dựng ở server.
//
// Một route chạy trên server và không có `useI18n()`. Nếu nó trả về
// `{ error: "Bạn chỉ có thể sửa tin nhắn của mình" }` thì câu tiếng Việt ấy đi
// thẳng qua `throw new Error(payload.error)` ở lib, rồi vào `toast.error` ở
// component - và không cổng nào chặn được, vì `i18n-coverage` chỉ nhìn vị trí
// hiển thị còn đây là một `return`.
//
// Nên route trả về MÃ, client tra mã ra câu chữ. `error` vẫn được giữ lại làm
// dự phòng cho chỗ nào chưa đọc mã, để việc chuyển đổi không phải làm một lần
// dứt điểm ở mọi nơi.
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

export type ApiErrorCode =
  | "notOwnMessageEdit"
  | "notOwnMessageDelete"
  | "notInGroup"
  | "systemMessageNotEditable"
  | "messageLength"
  | "notInStudyRoom"
  | "voiceNotConfigured"
  | "questNotComplete"
  | "voiceJoinFailed"
  | "micFailed"
  | "bossDamageNotRecorded";

/** Lỗi kèm mã, để component tra ra câu chữ theo ngôn ngữ đang xem. */
export class ApiError extends Error {
  code?: ApiErrorCode;
  constructor(message: string, code?: ApiErrorCode) {
    super(message);
    this.name = "ApiError";
    this.code = code;
  }
}

/** Trả về câu chữ đã dịch nếu lỗi mang mã, ngược lại `null` để chỗ gọi tự chọn
 *  câu dự phòng của riêng nó. Không tự rơi về `err.message`: message là chuỗi
 *  server dựng, đúng thứ hàm này tồn tại để tránh hiển thị. */
export function translateApiError(t: Dictionary, err: unknown): string | null {
  const code = err instanceof ApiError ? err.code : undefined;
  if (!code) return null;
  return t.apiErrors[code] ?? null;
}
