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
/* i18n-ignore-start: `text` ở đây là bản gốc tiếng Việt của pool, không phải
   chuỗi chưa dịch. Widget đọc `t.motivationLines[message.id]` và chỉ rơi về
   `text` khi từ điển thiếu id đó - trường hợp mà
   lib/__tests__/motivation-i18n.test.ts làm đỏ build, cả khi thiếu lẫn khi
   thừa khoá. */
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
  { id: "mv-rk-09", tone: "rekindle", text: "Ngọn lửa tắt không làm củi biến mất. Thứ bạn tích được vẫn nằm nguyên đó, chỉ chờ một lần châm." },
  { id: "mv-rk-10", tone: "rekindle", text: "Bạn không cần lấy lại con số cũ. Bạn chỉ cần một ngày mới - và hôm nay đang còn." },
  { id: "mv-rk-11", tone: "rekindle", text: "Điều làm người ta bỏ hẳn không phải cú đứt chuỗi, mà là ý nghĩ phải bắt đầu lại từ số không." },
  { id: "mv-rk-12", tone: "rekindle", text: "Streak là công cụ, không phải bản án. Nó tồn tại để phục vụ bạn, không phải để chấm điểm bạn." },
  { id: "mv-rk-13", tone: "rekindle", text: "Nhóm lại một ngọn lửa còn than dễ hơn nhiều so với đốt từ đầu. Bạn đang ở trường hợp thứ nhất." },
  { id: "mv-rk-14", tone: "rekindle", text: "Không cần bù cho những ngày đã mất. Chúng đã đi rồi, và chúng không đòi gì ở bạn cả." },

  // --- return: vắng nhiều ngày ---------------------------------------------
  { id: "mv-rt-01", tone: "return", text: "Bạn quay lại rồi - đó đã là phần khó nhất. Phần còn lại chỉ là mở một bài học." },
  { id: "mv-rt-02", tone: "return", text: "Không cần học bù những ngày đã qua. Chỉ cần học hôm nay là đủ để đi tiếp." },
  { id: "mv-rt-03", tone: "return", text: "Nghỉ vài ngày không phải thất bại. Thất bại là để vài ngày đó kéo dài thành vài tháng." },
  { id: "mv-rt-04", tone: "return", text: "Cuộc sống bận là chuyện thật, không phải cái cớ. Nhưng mười phút hôm nay cũng là chuyện thật." },
  { id: "mv-rt-05", tone: "return", text: "Đêm càng lạnh thì đốm lửa càng đáng giá. Bạn mở app hôm nay chính là đốm lửa đó." },
  { id: "mv-rt-06", tone: "return", text: "Không ai chấm điểm quãng nghỉ của bạn. Cái được tính là bạn đang ngồi đây." },
  { id: "mv-rt-07", tone: "return", text: "Kiến thức tài chính không hết hạn. Nó vẫn nằm nguyên chỗ bạn để lại, chờ bạn quay lại." },
  { id: "mv-rt-08", tone: "return", text: "Bắt đầu lại lần thứ năm vẫn tốt hơn bắt đầu lần đầu vào năm sau." },
  { id: "mv-rt-09", tone: "return", text: "Khoảng nghỉ vừa rồi có lý do của nó. Bạn không nợ ai một lời giải thích, kể cả chính mình." },
  { id: "mv-rt-10", tone: "return", text: "Mở lại app sau một quãng vắng khó hơn học một bài mới. Phần khó bạn vừa làm xong rồi." },
  { id: "mv-rt-11", tone: "return", text: "Đừng bắt đầu bằng bài khó nhất để chuộc lỗi. Bắt đầu bằng bài dễ nhất để quay lại nhịp." },
  { id: "mv-rt-12", tone: "return", text: "Việc học không có hạn nộp bài. Nó chỉ có một câu hỏi lặp lại mỗi ngày: hôm nay có làm không." },
  { id: "mv-rt-13", tone: "return", text: "Người học đều đặn nhiều năm ai cũng có vài quãng vắng như thế này. Khác biệt nằm ở chỗ họ quay lại." },
  { id: "mv-rt-14", tone: "return", text: "Bạn không cần cảm thấy sẵn sàng mới bắt đầu. Cảm giác sẵn sàng thường đến sau vài phút đầu tiên." },

  // --- milestone: vừa chạm mốc ---------------------------------------------
  { id: "mv-ms-01", tone: "milestone", text: "Chuỗi ngày này không tự có. Nó là kết quả của rất nhiều lần bạn chọn học thay vì lướt." },
  { id: "mv-ms-02", tone: "milestone", text: "Điều bạn vừa chứng minh không phải là kiến thức, mà là tính kỷ luật - thứ đắt hơn nhiều." },
  { id: "mv-ms-03", tone: "milestone", text: "Lãi kép áp dụng cho cả việc học. Bạn đang ở đoạn đường cong bắt đầu dốc lên." },
  { id: "mv-ms-04", tone: "milestone", text: "Giữ được đến đây nghĩa là bạn đã vượt phần lớn người từng bắt đầu cùng bạn." },
  { id: "mv-ms-05", tone: "milestone", text: "Ngọn lửa đã cháy đủ lâu để tự giữ nhiệt. Đừng để một ngày lười thổi tắt nó." },
  { id: "mv-ms-06", tone: "milestone", text: "Cột mốc chỉ là con số. Thói quen bạn xây để tới đó mới là tài sản thật." },
  { id: "mv-ms-07", tone: "milestone", text: "Điều đáng ăn mừng không phải con số hôm nay, mà là những ngày bạn học dù chẳng muốn học chút nào." },
  { id: "mv-ms-08", tone: "milestone", text: "Bạn vừa chứng minh mình làm được việc khó nhất trong mọi việc: xuất hiện đều đặn." },
  { id: "mv-ms-09", tone: "milestone", text: "Mốc này là hệ quả, không phải mục tiêu. Mục tiêu là con người biết ngồi xuống học mỗi ngày." },
  { id: "mv-ms-10", tone: "milestone", text: "Đây là lúc dễ tự thưởng bằng một ngày nghỉ. Cứ nghỉ nếu cần - nhưng hãy chọn nó, đừng trượt vào nó." },
  { id: "mv-ms-11", tone: "milestone", text: "Kiến thức bạn có bây giờ đủ để đọc hiểu những thứ mà chính bạn vài tháng trước thấy khó tin." },
  { id: "mv-ms-12", tone: "milestone", text: "Cột mốc nào cũng từng là con số xa vời. Con số xa vời tiếp theo cũng sẽ tới theo đúng cách này." },

  // --- keep: đang giữ streak, hôm nay chưa học ------------------------------
  { id: "mv-kp-01", tone: "keep", text: "Chuỗi ngày của bạn đang chờ hôm nay. Một bài thôi là nó sống tiếp." },
  { id: "mv-kp-02", tone: "keep", text: "Ngày khó học nhất luôn là ngày đáng học nhất - vì nó dạy bạn kỷ luật, không chỉ kiến thức." },
  { id: "mv-kp-03", tone: "keep", text: "Đừng phá vỡ chuỗi vì một ngày mệt. Học ít vẫn tính, bỏ hẳn thì không." },
  { id: "mv-kp-04", tone: "keep", text: "Mười phút hôm nay rẻ hơn nhiều so với việc nhóm lại ngọn lửa từ đầu." },
  { id: "mv-kp-05", tone: "keep", text: "Bạn của một năm sau đang nhìn quyết định của tối nay. Đừng làm người đó thất vọng." },
  { id: "mv-kp-06", tone: "keep", text: "Học đều đặn khi không có hứng - đó chính xác là thứ tách người học ra khỏi người định học." },
  { id: "mv-kp-07", tone: "keep", text: "Không cần học nhiều hôm nay. Chỉ cần học, để mai không phải bắt đầu lại từ đầu." },
  { id: "mv-kp-08", tone: "keep", text: "Việc khó không phải bài học, mà là mười giây quyết định mở nó ra. Qua được mười giây đó là xong." },
  { id: "mv-kp-09", tone: "keep", text: "Một bài ngắn hôm nay giữ được thứ mà một tuần chăm chỉ tháng sau không mua lại được: sự liên tục." },
  { id: "mv-kp-10", tone: "keep", text: "Bạn đã đi được tới đây bằng những ngày y hệt hôm nay - không đặc biệt, không hứng thú, vẫn làm." },
  { id: "mv-kp-11", tone: "keep", text: "Đừng thương lượng với chính mình về việc có học hay không. Chỉ thương lượng về việc học bao nhiêu." },
  { id: "mv-kp-12", tone: "keep", text: "Ngọn lửa cần thêm củi mỗi ngày, không cần nhiều. Vài phút hôm nay là đủ để nó qua đêm." },

  // --- steady: ngày thường, đã học rồi -------------------------------------
  { id: "mv-st-01", tone: "steady", text: "Đầu tư vào kiến thức tài chính của chính mình trả lãi cao nhất, và không ai đánh thuế được nó." },
  { id: "mv-st-02", tone: "steady", text: "Thời gian ở trên thị trường thường quan trọng hơn việc canh đúng thời điểm vào thị trường." },
  { id: "mv-st-03", tone: "steady", text: "Tự do tài chính không phải là có thật nhiều tiền - đó là có đủ lựa chọn." },
  { id: "mv-st-04", tone: "steady", text: "Rủi ro lớn nhất không phải mất tiền ngắn hạn, mà là không bao giờ bắt đầu vì sợ mất tiền." },
  { id: "mv-st-05", tone: "steady", text: "Một quyết định tài chính tốt hôm nay là món quà bạn gửi cho chính mình mười năm sau." },
  { id: "mv-st-06", tone: "steady", text: "Đừng đợi đến khi có nhiều tiền hơn mới học về tài chính - kiến thức nên đi trước số tiền." },
  { id: "mv-st-07", tone: "steady", text: "Kỷ luật đều đặn mỗi tháng thường thắng việc cố đoán đúng đỉnh và đáy." },
  { id: "mv-st-08", tone: "steady", text: "Hiểu tiền của mình đi đâu là bước đầu tiên, và nó không cần thêm đồng thu nhập nào để bắt đầu." },
  { id: "mv-st-09", tone: "steady", text: "Phần lớn quyết định tài chính tệ không đến từ thiếu kiến thức, mà từ việc quyết lúc đang gấp." },
  { id: "mv-st-10", tone: "steady", text: "Không có khoản đầu tư nào tốt cho tất cả mọi người. Có khoản phù hợp với hoàn cảnh của bạn." },
  { id: "mv-st-11", tone: "steady", text: "Người hiểu tài chính không phải người đoán đúng thị trường. Họ là người biết mình đang đánh đổi gì." },
  { id: "mv-st-12", tone: "steady", text: "Một quỹ khẩn cấp không sinh lời cao, nhưng nó mua cho bạn quyền không phải bán tài sản lúc giá xấu." },
  { id: "mv-st-13", tone: "steady", text: "Tiền không giải quyết được mọi thứ, nhưng thiếu tiền thì làm mọi vấn đề khác trở nên khó hơn." },
  { id: "mv-st-14", tone: "steady", text: "Học tài chính không làm bạn giàu nhanh. Nó làm bạn ít mất tiền vì những lý do lẽ ra tránh được." },
  { id: "mv-st-15", tone: "steady", text: "Danh mục tốt là danh mục bạn ngủ ngon, không phải danh mục lãi cao nhất trên giấy." },
];

/* i18n-ignore-end */

/** Các mốc streak được coi là đáng ăn mừng. */
const MILESTONES = [3, 7, 14, 30, 50, 100, 200, 365];

/** Vắng bao nhiêu ngày thì chuyển sang giọng "quay lại". */
const AWAY_DAYS_THRESHOLD = 3;

export function selectTone(signals: MotivationSignals): MotivationTone {
  // Streak vừa đứt và còn khôi phục được - đây là trạng thái lạnh nhất, ưu tiên
  // cao hơn cả việc vắng mặt, vì người dùng vừa mất một thứ họ đã xây.
  if (signals.lostStreak > 0 && signals.currentStreak === 0) return "rekindle";

  // `hasActivityToday` thắng khi hai tín hiệu mâu thuẫn. Hai nguồn này được đọc
  // độc lập - một từ bảng streak, một từ log hoạt động - nên chúng lệch nhau
  // được: bảng streak chỉ cập nhật khi hoàn thành bài, còn hoạt động hôm nay
  // ghi nhận sớm hơn thế. Khi lệch, người vừa học xong hôm nay bị chào "chào
  // mừng quay lại" như thể họ vắng cả tuần, và đó là cách nhanh nhất để một
  // trang nói-cho-tử-tế trở nên vô duyên.
  if (
    !signals.hasActivityToday &&
    signals.daysSinceLastActivity !== null &&
    signals.daysSinceLastActivity >= AWAY_DAYS_THRESHOLD
  ) {
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
/* i18n-ignore-start: nhãn gốc; giao diện đọc `t.motivationToneLabel[tone]`. */
export const MOTIVATION_TONE_LABEL: Record<MotivationTone, string> = {
  rekindle: "Nhóm lại ngọn lửa",
  return: "Chào mừng quay lại",
  milestone: "Cột mốc của bạn",
  keep: "Giữ lửa hôm nay",
  steady: "Lời nhắn hôm nay",
};
/* i18n-ignore-end */

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
