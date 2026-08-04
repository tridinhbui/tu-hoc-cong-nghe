/**
 * Hạ chất lượng theo khung hình ĐO ĐƯỢC, thay vì theo một lần đoán lúc mở.
 *
 * Hiện `useRenderQuality` quyết định một lần duy nhất, dựa vào
 * `navigator.hardwareConcurrency <= 4`. Đó là chỉ dấu rẻ và có sẵn, nhưng nó
 * đoán sai theo cả hai chiều: một laptop tám nhân dùng đồ hoạ tích hợp báo là
 * "máy khoẻ" rồi bò ở cảnh ngoài trời, còn một điện thoại bốn nhân đời mới
 * chạy tốt vẫn bị cắt bóng đổ ngay từ đầu.
 *
 * Cách chắc chắn hơn là nhìn vào thứ thật sự quan trọng: một khung hình mất
 * bao nhiêu mili giây. File này giữ toàn bộ phần quyết định ở dạng hàm thuần
 * để kiểm được, còn phần đo đặt ở component.
 *
 * Ba nguyên tắc, đều để tránh cái tệ hơn cả cảnh chậm là cảnh NHẤP NHÁY giữa
 * hai mức:
 *
 *   1. Chỉ hạ sau một chuỗi khung chậm liên tiếp, không hạ vì một khung lỡ.
 *   2. Nâng lại khó hơn hạ rất nhiều - cần chuỗi khung nhanh dài gấp bội.
 *   3. Mỗi phiên chỉ nâng lại một số lần có hạn. Cảnh dao động quanh ngưỡng sẽ
 *      dừng ở mức thấp thay vì đổi qua đổi lại mãi.
 */

/** Khung chậm hơn mức này thì bị tính là chậm (ms). 33ms ≈ dưới 30 hình/giây. */
export const SLOW_FRAME_MS = 33;
/** Khung nhanh hơn mức này mới được tính vào chuỗi để nâng lại. 20ms ≈ 50 h/g. */
export const FAST_FRAME_MS = 20;
/** Bao nhiêu khung chậm liên tiếp thì hạ một mức. */
export const SLOW_STREAK = 45;
/** Bao nhiêu khung nhanh liên tiếp thì nâng lại một mức. */
export const FAST_STREAK = 600;
/** Số lần được nâng lại trong một phiên. */
export const MAX_UPGRADES = 1;

/** Mức 0 là đầy đủ; càng lớn càng nhẹ. */
export const MAX_LEVEL = 2;

export interface GovernorState {
  level: number;
  slow: number;
  fast: number;
  upgrades: number;
}

export function createGovernor(level = 0): GovernorState {
  return { level, slow: 0, fast: 0, upgrades: 0 };
}

/**
 * Nạp một khung hình vào bộ điều tiết và trả về trạng thái mới.
 *
 * Luôn trả về đối tượng mới thay vì sửa tại chỗ: phía gọi so sánh `level` cũ
 * với mới để biết có phải dựng lại gì không, và một đối tượng bị sửa ngầm sẽ
 * làm phép so đó luôn cho kết quả "không đổi".
 */
export function observeFrame(state: GovernorState, frameMs: number): GovernorState {
  // Khung đầu tiên sau khi chuyển tab hoặc sau một lần dựng nặng có thể lên tới
  // hàng trăm mili giây mà không nói gì về khả năng của máy. Bỏ qua hẳn.
  if (frameMs > 500 || !Number.isFinite(frameMs)) {
    return { ...state, slow: 0, fast: 0 };
  }

  if (frameMs > SLOW_FRAME_MS) {
    const slow = state.slow + 1;
    if (slow >= SLOW_STREAK && state.level < MAX_LEVEL) {
      return { level: state.level + 1, slow: 0, fast: 0, upgrades: state.upgrades };
    }
    return { ...state, slow, fast: 0 };
  }

  if (frameMs < FAST_FRAME_MS) {
    const fast = state.fast + 1;
    if (fast >= FAST_STREAK && state.level > 0 && state.upgrades < MAX_UPGRADES) {
      return { level: state.level - 1, slow: 0, fast: 0, upgrades: state.upgrades + 1 };
    }
    return { ...state, fast, slow: 0 };
  }

  // Vùng giữa hai ngưỡng: không nhanh cũng không chậm. Không cộng vào chuỗi
  // nào - đây chính là khoảng đệm giữ cho cảnh không nhấp nháy quanh ngưỡng.
  return state;
}

export interface QualityLike {
  shadows: boolean;
  dpr: [number, number];
}

/**
 * Áp mức đã hạ lên chất lượng gốc.
 *
 * Chỉ đụng vào hai thứ đổi được khi Canvas đã chạy: bóng đổ và tỉ lệ điểm ảnh.
 * `antialias` nằm trong tuỳ chọn khởi tạo WebGL và không sửa được sau đó, nên
 * nó phải theo lần đoán ban đầu chứ không theo bộ điều tiết này.
 */
export function applyLevel(base: QualityLike, level: number): QualityLike {
  if (level <= 0) return base;
  if (level === 1) return { shadows: false, dpr: base.dpr };
  return { shadows: false, dpr: [1, Math.min(base.dpr[1], 1)] };
}
