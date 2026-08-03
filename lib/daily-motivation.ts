// "Ngọn lửa đinh hoả" - lời nhắn mỗi ngày trên dashboard.
//
// Khác với WISDOM_CARDS (lib/wisdom-cards.ts) vốn random thuần sau mỗi bài học,
// pool này được chọn theo *trạng thái* của người học: streak vừa đứt, vắng nhiều
// ngày, sắp chạm mốc, hay đang học đều. Nguyên tắc thiết kế: người học càng
// nguội thì lời nhắn càng ấm - lửa cháy to nhất vào đêm lạnh nhất, không phải
// vào lúc đã ấm sẵn.
//
// Không có bảng DB. Lựa chọn là hàm thuần của (userId, ngày, tín hiệu), nên cả
// ngày người dùng thấy đúng một lời nhắn, và sang hôm sau thì đổi.

export type MotivationTone =
  /** Streak vừa đứt - cần vực dậy, tuyệt đối không trách móc */
  | "rekindle"
  /** Vắng nhiều ngày - kéo về thật nhẹ, hạ thấp rào cản quay lại */
  | "return"
  /** Vừa chạm mốc streak đáng kể - ăn mừng rồi đẩy tiếp */
  | "milestone"
  /** Đang giữ streak, hôm nay chưa học - nhắc trước khi nguội */
  | "keep"
  /** Ngày bình thường, đã học rồi - châm ngôn tài chính */
  | "steady";

export interface MotivationSignals {
  /** Chuỗi ngày hiện tại. 0 nghĩa là chưa có hoặc vừa đứt. */
  currentStreak: number;
  /** Đã có hoạt động học trong hôm nay chưa. */
  hasActivityToday: boolean;
  /** Số ngày kể từ lần học gần nhất. null nếu chưa từng học. */
  daysSinceLastActivity: number | null;
  /** Chuỗi ngày đã mất và còn có thể khôi phục (getStreakRestoreOffer). */
  lostStreak: number;
}

export interface MotivationMessage {
  id: string;
  tone: MotivationTone;
  /** Câu chính, hiển thị to. Giữ dưới ~120 ký tự để không vỡ card trên mobile. */
  text: string;
}

// Mỗi tone cần đủ câu để một người dùng đều đặn không gặp lại câu cũ trong
// vài tuần. Tone càng "lạnh" thì pool càng phải dày, vì đó là lúc người học
// dễ bỏ cuộc nhất và lặp lại câu cũ sẽ nghe như máy trả lời tự động.
export const MOTIVATION_MESSAGES: MotivationMessage[] = [
  // --- rekindle: streak vừa đứt -------------------------------------------
  { id: "mv-rk-01", tone: "rekindle", text: "Chuỗi ngày đứt không xoá được thứ bạn đã học. Kiến thức không có streak - nó nằm lại trong bạn." },
  { id: "mv-rk-02", tone: "rekindle", text: "Một con số về 0 không có nghĩa bạn về 0. Hôm nay mở lại một bài là ngọn lửa cháy lại." },
  { id: "mv-rk-03", tone: "rekindle", text: "Người bỏ cuộc và người đứt streak trông giống nhau đúng một ngày. Ngày mai mới phân biệt được." },
  { id: "mv-rk-04", tone: "rekindle", text: "Đứt chuỗi là chuyện của lịch, không phải chuyện của năng lực. Bắt đầu lại rẻ hơn bạn tưởng rất nhiều." },
  { id: "mv-rk-05", tone: "rekindle", text: "Không ai giữ được ngọn lửa cháy liên tục cả đời. Điều làm nên khác biệt là biết nhóm lại." },
  { id: "mv-rk-06", tone: "rekindle", text: "Bạn đã từng giữ được chuỗi đó một lần. Thứ làm được một lần thì làm lại được." },
  { id: "mv-rk-07", tone: "rekindle", text: "Đừng đợi thứ Hai, đừng đợi đầu tháng. Ngọn lửa không xem lịch - nó chỉ cần một que diêm." },
  { id: "mv-rk-08", tone: "rekindle", text: "Hôm nay chỉ cần một bài ngắn thôi. Nhỏ mà có, hơn lớn mà đợi." },

  // --- return: vắng nhiều ngày ---------------------------------------------
  { id: "mv-rt-01", tone: "return", text: "Bạn quay lại rồi - đó đã là phần khó nhất. Phần còn lại chỉ là mở một bài học." },
  { id: "mv-rt-02", tone: "return", text: "Không cần học bù những ngày đã qua. Chỉ cần học hôm nay là đủ để đi tiếp." },
  { id: "mv-rt-03", tone: "return", text: "Nghỉ vài ngày không phải thất bại. Thất bại là để vài ngày đó kéo dài thành vài tháng." },
  { id: "mv-rt-04", tone: "return", text: "Cuộc sống bận là chuyện thật, không phải cái cớ. Nhưng mười phút hôm nay cũng là chuyện thật." },
  { id: "mv-rt-05", tone: "return", text: "Đêm càng lạnh thì đốm lửa càng đáng giá. Bạn mở app hôm nay chính là đốm lửa đó." },
  { id: "mv-rt-06", tone: "return", text: "Không ai chấm điểm quãng nghỉ của bạn. Cái được tính là bạn đang ngồi đây." },
  { id: "mv-rt-07", tone: "return", text: "Kiến thức tài chính không hết hạn. Nó vẫn nằm nguyên chỗ bạn để lại, chờ bạn quay lại." },
  { id: "mv-rt-08", tone: "return", text: "Bắt đầu lại lần thứ năm vẫn tốt hơn bắt đầu lần đầu vào năm sau." },

  // --- milestone: vừa chạm mốc ---------------------------------------------
  { id: "mv-ms-01", tone: "milestone", text: "Chuỗi ngày này không tự có. Nó là kết quả của rất nhiều lần bạn chọn học thay vì lướt." },
  { id: "mv-ms-02", tone: "milestone", text: "Điều bạn vừa chứng minh không phải là kiến thức, mà là tính kỷ luật - thứ đắt hơn nhiều." },
  { id: "mv-ms-03", tone: "milestone", text: "Lãi kép áp dụng cho cả việc học. Bạn đang ở đoạn đường cong bắt đầu dốc lên." },
  { id: "mv-ms-04", tone: "milestone", text: "Giữ được đến đây nghĩa là bạn đã vượt phần lớn người từng bắt đầu cùng bạn." },
  { id: "mv-ms-05", tone: "milestone", text: "Ngọn lửa đã cháy đủ lâu để tự giữ nhiệt. Đừng để một ngày lười thổi tắt nó." },
  { id: "mv-ms-06", tone: "milestone", text: "Cột mốc chỉ là con số. Thói quen bạn xây để tới đó mới là tài sản thật." },

  // --- keep: đang giữ streak, hôm nay chưa học ------------------------------
  { id: "mv-kp-01", tone: "keep", text: "Chuỗi ngày của bạn đang chờ hôm nay. Một bài thôi là nó sống tiếp." },
  { id: "mv-kp-02", tone: "keep", text: "Ngày khó học nhất luôn là ngày đáng học nhất - vì nó dạy bạn kỷ luật, không chỉ kiến thức." },
  { id: "mv-kp-03", tone: "keep", text: "Đừng phá vỡ chuỗi vì một ngày mệt. Học ít vẫn tính, bỏ hẳn thì không." },
  { id: "mv-kp-04", tone: "keep", text: "Mười phút hôm nay rẻ hơn nhiều so với việc nhóm lại ngọn lửa từ đầu." },
  { id: "mv-kp-05", tone: "keep", text: "Bạn của một năm sau đang nhìn quyết định của tối nay. Đừng làm người đó thất vọng." },
  { id: "mv-kp-06", tone: "keep", text: "Học đều đặn khi không có hứng - đó chính xác là thứ tách người học ra khỏi người định học." },

  // --- steady: ngày thường, đã học rồi -------------------------------------
  { id: "mv-st-01", tone: "steady", text: "Đầu tư vào kiến thức tài chính của chính mình trả lãi cao nhất, và không ai đánh thuế được nó." },
  { id: "mv-st-02", tone: "steady", text: "Thời gian ở trên thị trường thường quan trọng hơn việc canh đúng thời điểm vào thị trường." },
  { id: "mv-st-03", tone: "steady", text: "Tự do tài chính không phải là có thật nhiều tiền - đó là có đủ lựa chọn." },
  { id: "mv-st-04", tone: "steady", text: "Rủi ro lớn nhất không phải mất tiền ngắn hạn, mà là không bao giờ bắt đầu vì sợ mất tiền." },
  { id: "mv-st-05", tone: "steady", text: "Một quyết định tài chính tốt hôm nay là món quà bạn gửi cho chính mình mười năm sau." },
  { id: "mv-st-06", tone: "steady", text: "Đừng đợi đến khi có nhiều tiền hơn mới học về tài chính - kiến thức nên đi trước số tiền." },
  { id: "mv-st-07", tone: "steady", text: "Kỷ luật đều đặn mỗi tháng thường thắng việc cố đoán đúng đỉnh và đáy." },
  { id: "mv-st-08", tone: "steady", text: "Danh mục tốt là danh mục bạn ngủ ngon, không phải danh mục lãi cao nhất trên giấy." },
];

/** Các mốc streak được coi là đáng ăn mừng. */
const MILESTONES = [3, 7, 14, 30, 50, 100, 200, 365];

/** Vắng bao nhiêu ngày thì chuyển sang giọng "quay lại". */
const AWAY_DAYS_THRESHOLD = 3;

export function selectTone(signals: MotivationSignals): MotivationTone {
  // Streak vừa đứt và còn khôi phục được - đây là trạng thái lạnh nhất, ưu tiên
  // cao hơn cả việc vắng mặt, vì người dùng vừa mất một thứ họ đã xây.
  if (signals.lostStreak > 0 && signals.currentStreak === 0) return "rekindle";

  if (signals.daysSinceLastActivity !== null && signals.daysSinceLastActivity >= AWAY_DAYS_THRESHOLD) {
    return "return";
  }

  // Mốc chỉ ăn mừng vào đúng ngày người dùng đã học - trước khi học thì con số
  // chưa thuộc về hôm nay.
  if (signals.hasActivityToday && MILESTONES.includes(signals.currentStreak)) {
    return "milestone";
  }

  if (signals.currentStreak > 0 && !signals.hasActivityToday) return "keep";

  return "steady";
}

/**
 * Hash ổn định (FNV-1a 32-bit) để cùng một người trong cùng một ngày luôn nhận
 * cùng một lời nhắn - không dùng Math.random, vì card sẽ đổi mỗi lần re-render.
 */
function hashSeed(seed: string): number {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** Khoá ngày theo giờ địa phương (YYYY-MM-DD), không dùng UTC. */
export function localDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Độ "ấm" của card, 0 → 1. Trạng thái càng nguội thì càng gần 1: đêm càng lạnh,
 * lửa càng phải to. Widget dùng giá trị này cho cường độ gradient và quầng sáng.
 */
export function warmthFor(tone: MotivationTone): number {
  switch (tone) {
    case "rekindle":
      return 1;
    case "return":
      return 0.85;
    case "keep":
      return 0.55;
    case "milestone":
      return 0.4;
    case "steady":
      return 0.25;
  }
}

/** Nhãn hiển thị của từng giọng - dùng chung giữa card dashboard và trang riêng. */
export const MOTIVATION_TONE_LABEL: Record<MotivationTone, string> = {
  rekindle: "Nhóm lại ngọn lửa",
  return: "Chào mừng quay lại",
  milestone: "Cột mốc của bạn",
  keep: "Giữ lửa hôm nay",
  steady: "Lời nhắn hôm nay",
};

export interface DailyMotivation {
  message: MotivationMessage;
  tone: MotivationTone;
  warmth: number;
}

/**
 * Lấy một lời nhắn của đúng tone chỉ định, ổn định theo (người dùng, ngày).
 * Dùng khi tone đã được quyết định ở nơi khác - ví dụ cron nhắc học đã tự phân
 * loại "sắp mất streak" / "vắng 3 ngày" theo luật riêng của nó.
 */
export function getMotivationLine(
  userId: string,
  tone: MotivationTone,
  dateKey: string = localDateKey(),
): MotivationMessage {
  const pool = MOTIVATION_MESSAGES.filter((m) => m.tone === tone);
  return pool[hashSeed(`${userId}:${dateKey}:${tone}`) % pool.length];
}

export function getDailyMotivation(
  userId: string,
  signals: MotivationSignals,
  dateKey: string = localDateKey(),
): DailyMotivation {
  const tone = selectTone(signals);
  return { message: getMotivationLine(userId, tone, dateKey), tone, warmth: warmthFor(tone) };
}

/**
 * Cắt câu thành các dòng để vẽ vào SVG chia sẻ - SVG không tự xuống dòng, mỗi
 * dòng phải là một <tspan> riêng. Cắt theo khoảng trắng nên không bao giờ chẻ
 * đôi một từ tiếng Việt (dấu thanh nằm trong từ, chẻ ra là hỏng chữ). Từ dài
 * hơn cả `maxChars` vẫn được giữ nguyên trên dòng của nó thay vì bị cắt.
 */
export function wrapQuoteLines(text: string, maxChars = 34): string[] {
  const lines: string[] = [];
  let current = "";

  for (const word of text.split(/\s+/).filter(Boolean)) {
    if (!current) {
      current = word;
    } else if (current.length + 1 + word.length <= maxChars) {
      current += ` ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);

  return lines;
}

/** Số ngày giữa last_activity_date (YYYY-MM-DD) và hôm nay. */
export function daysSince(lastActivityDate: string | null | undefined): number | null {
  if (!lastActivityDate) return null;
  const last = new Date(`${lastActivityDate}T00:00:00`);
  if (Number.isNaN(last.getTime())) return null;
  const today = new Date(`${localDateKey()}T00:00:00`);
  return Math.max(0, Math.round((today.getTime() - last.getTime()) / 86_400_000));
}
