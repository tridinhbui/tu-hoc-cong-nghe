/** Bề rộng kéo tay của các panel chat neo bên phải.
 *
 *  VÌ SAO. Panel góp ý có sẵn một nút phóng to, nhưng nó chỉ có HAI nấc và nấc
 *  rộng vẫn chặn ở `max-w-2xl` - 672px. Người dùng báo: phóng to hết rồi mà
 *  vẫn bị khuyết. Trên màn hình rộng thì 672px là một dải hẹp giữa một khoảng
 *  trống lớn, còn nội dung dài trong đó vẫn phải xuống dòng liên tục.
 *
 *  Nên bề rộng thành một con số kéo được, nhớ lại giữa các lần mở.
 *
 *  Phần tính nằm ở đây thay vì trong component vì nó có ba biên dễ sai và cả
 *  ba đều làm panel không dùng được: kéo hẹp quá thì tin nhắn không đọc nổi,
 *  kéo rộng quá thì panel tràn khỏi màn hình và mất luôn cạnh để kéo lại, và
 *  một giá trị hỏng đọc từ localStorage không được phép làm panel biến mất. */

/** Hẹp hơn mức này thì bong bóng tin nhắn vỡ chữ. */
export const MIN_PANEL_WIDTH = 320;

/** Chừa lại một dải mép để panel không dán sát cạnh màn hình. */
export const VIEWPORT_MARGIN = 48;

/**
 * Bề rộng hợp lệ gần nhất với `requested`.
 *
 * Màn hình hẹp hơn cả mức tối thiểu thì lấy trọn bề ngang: thà panel chạm mép
 * còn hơn tràn ra ngoài và mất cạnh kéo.
 */
export function clampPanelWidth(requested: number, viewportWidth: number): number {
  if (!Number.isFinite(viewportWidth) || viewportWidth <= 0) return MIN_PANEL_WIDTH;

  const max = viewportWidth - VIEWPORT_MARGIN;
  if (max <= MIN_PANEL_WIDTH) return Math.max(1, Math.min(viewportWidth, MIN_PANEL_WIDTH));

  if (!Number.isFinite(requested)) return MIN_PANEL_WIDTH;
  return Math.round(Math.min(max, Math.max(MIN_PANEL_WIDTH, requested)));
}

/**
 * Bề rộng suy ra từ vị trí con trỏ khi kéo cạnh TRÁI của một panel neo phải.
 *
 * Panel dính mép phải, nên kéo sang trái là rộng ra: bề rộng bằng khoảng cách
 * từ con trỏ tới mép phải, trừ đi phần lề panel đang cách mép.
 */
export function widthFromPointer(
  pointerX: number,
  viewportWidth: number,
  rightOffset: number
): number {
  return clampPanelWidth(viewportWidth - pointerX - rightOffset, viewportWidth);
}

/** Đọc bề rộng đã nhớ. Giá trị hỏng, thiếu hay quá khổ đều về mức hợp lệ. */
export function readStoredWidth(raw: string | null, viewportWidth: number): number | null {
  if (raw === null) return null;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed)) return null;
  return clampPanelWidth(parsed, viewportWidth);
}
