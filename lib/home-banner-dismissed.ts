// Trạng thái "đã đóng banner trang chủ", đọc qua useSyncExternalStore chứ không
// phải useEffect + setState.
//
// Cách hiển nhiên hơn - một effect đọc localStorage rồi setState - bị
// react-hooks/set-state-in-effect chặn, và chặn đúng: nó vẽ một lần với giá trị
// sai rồi vẽ lại. useSyncExternalStore có sẵn ĐÚNG hình dạng cần ở đây, gồm cả
// ảnh chụp riêng cho phía máy chủ (luôn false, vì máy chủ không có localStorage
// mà cũng không được đoán thay).
//
// Khoá có hậu tố phiên bản: đổi nội dung banner thì tăng số, để người đã đóng
// bản cũ vẫn thấy thông báo mới thay vì im lặng mãi mãi.
const KEY = "home-banner-dismissed-v1";

const listeners = new Set<() => void>();

// Safari ở chế độ riêng tư ném khi truy cập localStorage - coi như chưa đóng và
// banner cứ hiện, thay vì để cả trang chủ hỏng.
function read(): boolean {
  try {
    return window.localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function subscribeHomeBannerDismissed(onChange: () => void): () => void {
  listeners.add(onChange);
  // Một tab khác đóng banner thì tab này cập nhật theo - `storage` chỉ bắn sang
  // các tab KHÁC, nên lượt đóng tại chỗ vẫn cần vòng lặp listeners bên dưới.
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === KEY) onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

// Trả về boolean nguyên thuỷ nên useSyncExternalStore so sánh được bằng
// Object.is và không rơi vào vòng vẽ lại vô tận.
export function getHomeBannerDismissed(): boolean {
  return read();
}

export function getHomeBannerDismissedServer(): boolean {
  return false;
}

export function dismissHomeBanner(): void {
  try {
    window.localStorage.setItem(KEY, "1");
  } catch {
    // Không lưu được thì lần tải sau hiện lại; vẫn hơn là chặn nút đóng.
  }
  for (const listener of listeners) listener();
}
