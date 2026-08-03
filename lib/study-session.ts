/**
 * Vòng đời một phiên ngồi học trong phòng 3D: lúc nào là xong, lúc nào coi như
 * người học đã rời đi, và tiếng chuông báo hết giờ.
 *
 * Tách khỏi component vì hai phần đầu là quy tắc sản phẩm có thể sai một cách
 * im lặng. Trước đây đồng hồ chạy về 0 rồi hiện chữ "Xong!" và dừng ở đó -
 * người ngồi học đúng cách nhất, tức là không nhìn màn hình, là người duy nhất
 * không biết mình đã xong. Và phiên vẫn đếm tiếp khi người học đã bỏ đi, nên
 * con số "hôm nay đã ngồi học bao nhiêu phút" - thứ cả căn phòng tồn tại để
 * tạo ra - lại là thứ nó không bảo vệ.
 */

/** Một phiên Pomodoro. Giữ ở lib/supabase-lobby.ts vì phòng thư viện cũng dùng;
 *  ở đây chỉ nhập lại để các hàm dưới đây tự đủ nghĩa. */
export { POMODORO_MS } from "./supabase-lobby";

/**
 * Ẩn tab bao lâu thì coi như đã rời đi.
 *
 * Ba phút, và con số này là một đánh đổi có chủ ý. Ngắn hơn thì phạt oan người
 * mở nhanh một tab tra cứu - việc xảy ra liên tục khi đang học. Dài hơn thì một
 * người đóng máy đi ăn trưa vẫn được cộng gần hết phiên.
 *
 * Cố ý KHÔNG đo hoạt động bàn phím hay chuột: người học nghiêm túc nhất là
 * người ngồi im đọc sách giấy, và một bộ đếm vắng mặt dựa trên thao tác sẽ đá
 * đúng người đó ra khỏi phiên.
 */
export const AWAY_MS = 3 * 60 * 1000;

/** Đã ngồi đủ một phiên chưa. */
export function isSessionComplete(startedAt: number | null, now: number, pomodoroMs: number): boolean {
  if (startedAt === null) return false;
  return now - startedAt >= pomodoroMs;
}

/** Số mili giây còn lại, không bao giờ âm. */
export function remainingMs(startedAt: number | null, now: number, pomodoroMs: number): number {
  if (startedAt === null) return pomodoroMs;
  return Math.max(0, pomodoroMs - (now - startedAt));
}

/** Định dạng mm:ss cho đồng hồ đếm ngược. */
export function formatCountdown(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = String(Math.floor(total / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
}

/**
 * Tab đã ẩn liên tục đủ lâu để kết thúc phiên chưa.
 *
 * `hiddenSince` là thời điểm tab bị ẩn, hoặc null nếu đang hiển thị.
 */
export function shouldEndForAway(hiddenSince: number | null, now: number, awayMs = AWAY_MS): boolean {
  if (hiddenSince === null) return false;
  return now - hiddenSince >= awayMs;
}

type AudioContextCtor = typeof AudioContext;

function audioContextCtor(): AudioContextCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { AudioContext?: AudioContextCtor; webkitAudioContext?: AudioContextCtor };
  return w.AudioContext ?? w.webkitAudioContext ?? null;
}

/**
 * Tiếng chuông báo hết phiên: hai nốt ngắn, sinh bằng Web Audio.
 *
 * Không dùng file âm thanh - không phải tải thêm gì, và không có tài nguyên
 * ngoài nào để hỏng. Hai nốt chứ không phải một hồi chuông: đây là dấu chấm
 * hết cho một phiên tập trung, không phải báo động.
 *
 * Trả về false khi trình duyệt không có Web Audio hoặc chặn phát - lúc đó phần
 * hiển thị vẫn báo xong bình thường, chỉ mất tiếng.
 */
export function playSessionChime(): boolean {
  const Ctor = audioContextCtor();
  if (!Ctor) return false;
  try {
    const ctx = new Ctor();
    const now = ctx.currentTime;
    // Quãng năm đi lên, hai nốt cách nhau 0,18 giây.
    [
      { freq: 587.33, at: 0 },
      { freq: 880, at: 0.18 },
    ].forEach(({ freq, at }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now + at);
      gain.gain.linearRampToValueAtTime(0.12, now + at + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + at + 0.7);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + at);
      osc.stop(now + at + 0.75);
    });
    window.setTimeout(() => void ctx.close(), 1200);
    return true;
  } catch {
    return false;
  }
}

/**
 * Báo hết phiên qua thông báo hệ thống, nếu người dùng đã cho phép từ trước.
 *
 * KHÔNG tự hỏi quyền ở đây. Một hộp thoại xin quyền bật lên giữa lúc đang ngồi
 * học là đúng thứ phiên tập trung sinh ra để tránh; nếu ứng dụng cần quyền đó
 * thì phải hỏi ở nơi khác, vào lúc khác.
 */
export function notifySessionDone(minutes: number): boolean {
  if (typeof window === "undefined" || !("Notification" in window)) return false;
  if (Notification.permission !== "granted") return false;
  try {
    new Notification("Xong một phiên học", {
      body: `Bạn vừa ngồi học ${minutes} phút. Đứng dậy đi lại một chút.`,
      silent: true,
    });
    return true;
  } catch {
    return false;
  }
}
