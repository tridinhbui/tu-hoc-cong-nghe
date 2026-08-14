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

/**
 * Mốc để nhiệm vụ hằng ngày `daily_focus` tính là xong, tính bằng phút CỘNG DỒN
 * cả ngày qua cả ba phòng - không phải trọn một phiên Pomodoro.
 *
 * Ở đây chứ không phải trong lib/supabase-quests.ts, vì giờ có HAI nơi đọc nó:
 * chỗ chấm nhiệm vụ, và đồng hồ trên HUD phòng 3D nói cho người ngồi biết còn
 * bao lâu nữa. Để mỗi nơi tự viết `15` là cách chắc chắn nhất để một hôm nào đó
 * đồng hồ hứa một mốc mà nhiệm vụ không công nhận.
 *
 * 25 phút, và chữ CỘNG DỒN ở trên là thứ giữ cho con số đó không trở thành
 * hoặc-tất-cả-hoặc-không. Mốc từng là 15 với lý lẽ: một phiên bị cắt ngang vì
 * có việc vẫn là thời gian đã ngồi học thật. Lý lẽ ấy vẫn đúng và vẫn được tôn
 * trọng - nó chống lại việc đòi TRỌN một phiên liên tục, chứ không chống lại
 * việc đòi nhiều phút hơn. Ngồi 10 phút sáng, 8 phút trưa, 7 phút tối vẫn đủ;
 * đứng dậy giữa chừng không mất gì; đổi phòng cũng không.
 *
 * Hệ quả cần biết: mốc này giờ TRÙNG với POMODORO_MS. Trước đây hai con số cố
 * ý khác nhau và HUD phải nói rõ "đồng hồ đếm ngược 25, mốc thưởng 15" để người
 * ngồi không nhầm. Giờ chúng bằng nhau, nên đồng hồ Pomodoro chạy hết đúng lúc
 * nhiệm vụ đủ điều kiện - với điều kiện phiên đó là phiên duy nhất trong ngày.
 * Người đã ngồi buổi sáng sẽ đủ trước khi đồng hồ về 0, và đó là đúng.
 */
export const DAILY_FOCUS_TARGET_MINUTES = 25;

/**
 * Mốc nhiệm vụ daily_street khi hoàn thành bằng cách NGỒI HỌC ở Phố Nghề.
 *
 * Thấp hơn hẳn DAILY_FOCUS_TARGET_MINUTES vì đây không phải nhiệm vụ ngồi học -
 * nó chỉ là nhánh thứ hai của một nhiệm vụ mà nhánh chính là làm thử thách cột
 * trụ. Đặt bằng 25 sẽ biến nó thành bản sao của daily_focus, và người học chỉ
 * cần ngồi im một chỗ là xong cả hai - đúng thứ mà nhiệm vụ "ra phố" muốn tránh.
 *
 * Phút ngồi ở Phố Nghề vẫn được cộng vào daily_focus như mọi phòng khác; hai
 * nhiệm vụ chồng nhau ở đây là có chủ ý, không phải sót.
 */
export const DAILY_STREET_TARGET_MINUTES = 10;

/**
 * Giá trị `user_quiz_sessions.source` mà PillarQuiz ở Phố Nghề ghi xuống.
 *
 * Sống ở đây - chứ không viết thẳng chuỗi ở ba nơi - vì nó phải khớp giữa client
 * gửi (components/career-district/PillarQuiz.tsx), route nhận
 * (app/api/knowledge-challenge/submit/route.ts) và truy vấn đếm
 * (lib/supabase-quests.ts). Lệch một ký tự thì nhiệm vụ không bao giờ xong và
 * không có lỗi nào hiện ra.
 */
export const PILLAR_QUIZ_SOURCE = "pho-nghe-pillar";

/**
 * Số phút ngồi học đã tích được hôm nay, tính cả phiên ĐANG mở.
 *
 * `focus_sessions.seconds` chỉ được ghi lúc đóng phiên, nên tổng lấy từ máy chủ
 * không hề chứa phiên đang chạy. Cộng thêm phần đã trôi của phiên hiện tại mới
 * ra con số người ngồi đang nhìn thấy trên đồng hồ.
 */
export function focusMinutesToday(
  closedSecondsToday: number,
  seatStartedAt: number | null,
  now: number
): number {
  const live = seatStartedAt === null ? 0 : Math.max(0, now - seatStartedAt) / 1000;
  return Math.floor((closedSecondsToday + live) / 60);
}

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

/**
 * Mốc bắt đầu của phiên đang chạy tại một bàn: sớm nhất trong số người đang
 * ngồi.
 *
 * Đồng hồ thuộc về BÀN chứ không thuộc về người. Ai ngồi xuống muộn nhận đúng
 * thời gian còn lại của phiên đang chạy, thay vì mở một phiên 25 phút riêng
 * ngay cạnh người khác - đó là khác biệt giữa "cùng học" và "ngồi gần nhau".
 *
 * Thư viện đã có quy tắc này trong lib/supabase-lobby.ts nhưng gắn với hình
 * dạng dữ liệu chỗ ngồi của riêng nó (`seat.startedAt`), còn phòng học nhóm
 * giữ chỗ ngồi và mốc bắt đầu ở hai trường tách rời. Hàm này nhận thẳng danh
 * sách mốc để cả hai cách lưu đều dùng được.
 */
export function earliestSessionStart(starts: Array<number | null | undefined>): number | null {
  let earliest: number | null = null;
  for (const t of starts) {
    if (t === null || t === undefined || !Number.isFinite(t)) continue;
    if (earliest === null || t < earliest) earliest = t;
  }
  return earliest;
}
