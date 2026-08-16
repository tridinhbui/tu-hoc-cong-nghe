// Static content pool for the post-lesson "wisdom card" flip reveal - no
// table, no persistence of which card was shown, purely random each time a
// lesson is finished. Same "hardcoded content array" pattern as
// CHEST_REWARDS in lib/chests.ts.
//
// The card now reads the quiz result the learner just got. That is a sharper
// signal here than the streak-based tone on the dashboard
// (lib/daily-motivation.ts): the flip happens seconds after scoring, so
// someone who just got 2/10 should not be handed a neutral aphorism about
// compound interest. Same principle as the dashboard card - the colder the
// moment, the warmer the line.

export type WisdomTone =
  /** Điểm tuyệt đối - ghi nhận rồi đẩy tiếp, không tâng bốc. */
  | "celebrate"
  /** Làm bài kém - gỡ mặc cảm, đóng khung cái sai là dữ liệu. */
  | "encourage"
  /** Mặc định: châm ngôn tài chính, không nhắc gì tới điểm số. */
  | "steady";

export interface WisdomCard {
  id: string;
  text: string;
  /** Bỏ trống nghĩa là "steady" - giữ nguyên 45 thẻ cũ không phải sửa. */
  tone?: WisdomTone;
}

/* i18n-ignore-start: `text` là bản gốc tiếng Việt, đã có lớp phủ. Component
   đọc `t.wisdomCards[card.id]`. lib/__tests__/wisdom-cards-i18n.test.ts làm đỏ
   build khi thiếu hoặc thừa khoá, ở cả hai mảng. */
export const WISDOM_CARDS: WisdomCard[] = [
  {
    id: "wc-001",
    text: "Viết ít mã hơn số mã bạn hiểu là quy tắc đầu tiên - không framework nào cứu được một người luôn dán vào nhiều hơn mình đọc nổi.",
  },
  {
    id: "wc-002",
    text: "Bản sao lưu không phải để chạy nhanh - nó tồn tại để bạn không phải sửa vội một hệ thống đang cháy vào đúng lúc tệ nhất.",
  },
  {
    id: "wc-003",
    text: "Thói quen commit đều cần thời gian hơn là cần một tuần cày. Mỗi ngày một chút thường thắng một đợt dồn sức rồi bỏ.",
  },
  {
    id: "wc-004",
    text: "Rủi ro lớn nhất không phải là viết ra mã tệ, mà là không bao giờ bắt đầu vì sợ viết ra mã tệ.",
  },
  {
    id: "wc-005",
    text: "Một kiến trúc tốt bị cài đặt vụng vẫn cứu được. Một kiến trúc sai được cài đặt hoàn hảo thì không.",
  },
  {
    id: "wc-006",
    text: "Dự phòng không phải để chạy nhanh hơn - nó để bạn không bị loại khỏi cuộc chơi chỉ vì một máy chủ chết.",
  },
  {
    id: "wc-007",
    text: "Nợ kỹ thuật có chủ đích giúp bạn ra mắt sớm. Nợ kỹ thuật không ai ghi lại giúp người sau trả lãi thay bạn.",
  },
  { id: "wc-008", text: "Máy không quan tâm mã của bạn đẹp cỡ nào - nó chỉ quan tâm mã ấy làm đúng việc gì." },
  {
    id: "wc-009",
    text: "Kỷ luật viết kiểm thử cho từng thay đổi nhỏ thường thắng việc cố gỡ một lỗi lớn vào phút chót.",
  },
  {
    id: "wc-010",
    text: "Đọc mã nguồn một thư viện trước khi phụ thuộc vào nó giống như đọc hợp đồng trước khi ký - đừng bỏ qua bước này.",
  },
  { id: "wc-011", text: "Độ trễ là kẻ trộm âm thầm nhất - nó không làm hệ thống chết, nó lấy đi người dùng của bạn." },
  {
    id: "wc-012",
    text: "Giám sát không phải chi phí lãng phí - nó là cách bạn biết hệ thống hỏng trước khi người dùng gọi điện báo.",
  },
  {
    id: "wc-013",
    text: "Đừng nhầm giữa 'mã chạy được' với 'mã đúng' - hai điều này không phải lúc nào cũng giống nhau.",
  },
  {
    id: "wc-014",
    text: "Một thiết kế tồi được viết ra vẫn tốt hơn không có thiết kế nào - vì ít nhất nó cho bạn thứ để sửa.",
  },
  {
    id: "wc-015",
    text: "Tài sản là đoạn mã người khác đọc được và sửa được. Gánh nặng là đoạn mã chỉ mình bạn hiểu - dù nó có thông minh đến đâu.",
  },
  { id: "wc-016", text: "Đừng đưa vào hệ thống một công nghệ bạn không hiểu, chỉ vì người khác đang nói nó nhanh." },
  { id: "wc-017", text: "Thời gian một hệ thống đã chạy ổn định thường nói nhiều hơn số sao trên GitHub của nó." },
  {
    id: "wc-018",
    text: "Một dòng mã xoá hôm nay đáng giá hơn một dòng mã xoá năm sau - vì mỗi tháng trôi qua lại có thêm thứ phụ thuộc vào nó.",
  },
  {
    id: "wc-019",
    text: "Đừng để cảm xúc quyết định lúc hệ thống đang sập - đó chính xác là lúc quy trình trở nên đắt giá nhất.",
  },
  {
    id: "wc-020",
    text: "Chi phí ẩn (một truy vấn thừa, một vòng gọi mạng thừa) âm thầm bào mòn hiệu năng nhiều hơn bạn tưởng qua nhiều năm.",
  },
  {
    id: "wc-021",
    text: "Một bản ghi log không phải để làm phiền bạn - nó để bạn biết chính xác hệ thống của mình đang làm gì.",
  },
  {
    id: "wc-022",
    text: "Không ai quan tâm đến mã của bạn nhiều hơn chính bạn - đừng giao toàn bộ quyết định thiết kế cho người khác.",
  },
  {
    id: "wc-023",
    text: "So sánh tốc độ học của mình với người khác trong nghề là con đường nhanh nhất dẫn đến quyết định sai lầm.",
  },
  {
    id: "wc-024",
    text: "Giỏi nghề không phải là biết thật nhiều công nghệ - đó là có đủ lựa chọn để không phải làm theo cách mình biết là sai.",
  },
  {
    id: "wc-025",
    text: "Học cách đọc giấy phép của một thư viện trước khi dùng - ràng buộc thật thường nằm ở những dòng chữ nhỏ nhất.",
  },
  {
    id: "wc-026",
    text: "Đầu tư vào nền tảng của chính mình luôn trả lãi cao nhất, và không framework nào làm nó lỗi thời được.",
  },
  {
    id: "wc-027",
    text: "Một hệ thống tốt là hệ thống bạn ngủ ngon khi tới phiên trực, không phải hệ thống có sơ đồ đẹp nhất trên giấy.",
  },
  { id: "wc-028", text: "Đừng dựng thêm một dịch vụ mới để giải quyết một vấn đề mà bạn còn chưa đo được." },
  {
    id: "wc-029",
    text: "Sự kiên nhẫn khi gỡ lỗi là một kỹ năng - chỉ là ít người đủ bình tĩnh để thực sự áp dụng nó.",
  },
  {
    id: "wc-030",
    text: "Công nghệ không giải quyết được mọi việc, nhưng thiếu một kế hoạch rõ ràng chắc chắn tạo ra rất nhiều việc.",
  },
  {
    id: "wc-031",
    text: "Hãy trả cho chính mình trước - dành thời gian dọn mã ngay sau khi ra mắt, trước khi kịp bị cuốn vào tính năng mới.",
  },
  {
    id: "wc-032",
    text: "Giá trị của một hệ thống đến từ việc nó phục vụ được ai, không phải từ việc nó dùng công nghệ đang được bàn tán.",
  },
  {
    id: "wc-033",
    text: "Quản lý rủi ro vận hành không phải là tránh mọi thay đổi - đó là chỉ chấp nhận thay đổi bạn hiểu rõ và quay lui được.",
  },
  { id: "wc-034", text: "Đừng để một lần tối ưu thành công khiến bạn quên mất phép đo đã giúp bạn tìm ra nó." },
  {
    id: "wc-035",
    text: "Cam kết của bạn trong một tài liệu thiết kế có giá trị hơn lời hứa miệng của bất kỳ ai - viết ra trước khi bắt tay làm.",
  },
  {
    id: "wc-036",
    text: "Dọn mã mà không có mục tiêu cụ thể rất dễ bỏ dở giữa chừng - hãy gắn mỗi lần dọn với một vấn đề có thật.",
  },
  { id: "wc-037", text: "Kỹ sư giỏi dựng nền trước, thêm tính năng sau. Người vội thường làm ngược lại." },
  {
    id: "wc-038",
    text: "Không có công nghệ nào 'chắc chắn hợp' - ai nói vậy với bạn đang bán thứ gì đó, không phải sự thật.",
  },
  {
    id: "wc-039",
    text: "Học cách nói 'không' với một tính năng thêm vào phút chót là kỹ năng nghề quan trọng nhất ít ai dạy bạn.",
  },
  {
    id: "wc-040",
    text: "Một quyết định kỹ thuật tốt hôm nay là món quà bạn gửi cho chính mình mười năm sau, lúc phải mở lại kho mã ấy.",
  },
  {
    id: "wc-041",
    text: "Trừu tượng hoá giống như con dao hai lưỡi - đúng chỗ thì gọn cả hệ thống, sai chỗ thì giấu mất chỗ hỏng.",
  },
  {
    id: "wc-042",
    text: "Đừng đợi đến khi 'có dự án lớn hơn' mới bắt đầu học nền tảng - kiến thức nên đi trước quy mô, không phải theo sau.",
  },
  {
    id: "wc-043",
    text: "Chi phí cơ hội là thứ vô hình nhưng luôn hiện diện - mỗi giờ bạn dành cho một tính năng là một giờ không dành cho chỗ đang hỏng.",
  },
  {
    id: "wc-044",
    text: "Đừng nhầm lẫn giữa viết nhanh và làm xong - nhiều người viết rất nhanh rồi mất gấp đôi thời gian để sửa.",
  },
  { id: "wc-045", text: "Số lỗi còn tồn đọng của bạn nói nhiều về hệ thống hơn là số dòng mã đã viết ra." },
];

// Thẻ theo kết quả bài quiz. Pool "encourage" dày hơn "celebrate" một chút -
// người làm sai nhiều dễ quay lại làm lại bài đó ngay, nên lặp câu cũ sẽ lộ
// hơn; người đạt điểm tuyệt đối thì hiếm khi làm lại.
export const WISDOM_TONE_CARDS: WisdomCard[] = [
  {
    id: "wc-cl-01",
    tone: "celebrate",
    text: "Đúng hết không phải may mắn - đó là dấu hiệu bạn đã thật sự hiểu, không chỉ đọc lướt.",
  },
  {
    id: "wc-cl-02",
    tone: "celebrate",
    text: "Điểm tuyệt đối hôm nay đáng giá nhất ở chỗ nó cho bạn nền để học bài khó hơn.",
  },
  { id: "wc-cl-03", tone: "celebrate", text: "Hiểu đúng một khái niệm kỹ thuật là thứ không ai lấy lại được của bạn." },
  {
    id: "wc-cl-04",
    tone: "celebrate",
    text: "Làm tốt rồi thì đừng dừng ở đây - kiến thức chỉ đọng lại khi được dùng ở bài tiếp theo.",
  },
  {
    id: "wc-cl-05",
    tone: "celebrate",
    text: "Bạn vừa chứng minh mình đọc kỹ. Trong nghề này, đọc kỹ là kỹ năng đắt tiền.",
  },

  {
    id: "wc-en-01",
    tone: "encourage",
    text: "Câu sai hôm nay là câu bạn sẽ nhớ lâu nhất. Đó là cách trí nhớ hoạt động, không phải dấu hiệu bạn kém.",
  },
  {
    id: "wc-en-02",
    tone: "encourage",
    text: "Sai ở bài tập rẻ hơn sai trên hệ thống thật rất nhiều. Bạn đang trả học phí bằng thời gian.",
  },
  {
    id: "wc-en-03",
    tone: "encourage",
    text: "Không ai hiểu một khái niệm kỹ thuật ngay lần đọc đầu. Đọc lại không phải thụt lùi.",
  },
  {
    id: "wc-en-04",
    tone: "encourage",
    text: "Điểm thấp chỉ nói bài này cần thêm một lượt nữa, không nói gì về khả năng của bạn.",
  },
  {
    id: "wc-en-05",
    tone: "encourage",
    text: "Người bỏ cuộc và người làm lại đều vừa làm sai như nhau. Khác nhau ở bước tiếp theo.",
  },
  {
    id: "wc-en-06",
    tone: "encourage",
    text: "Cứ ôn lại đúng những câu vừa sai - đó là cách học nhanh nhất, và cũng ít người chịu làm nhất.",
  },
  {
    id: "wc-en-07",
    tone: "encourage",
    text: "Chỗ bạn thấy khó chính là chỗ đáng học nhất. Phần dễ thì ai cũng qua được.",
  },
];

/* i18n-ignore-end */

const ALL_WISDOM_CARDS = [...WISDOM_CARDS, ...WISDOM_TONE_CARDS];

/** Dưới ngưỡng này thì coi là làm chưa tốt và chuyển sang giọng động viên. */
export const WISDOM_STRUGGLE_RATIO = 0.7;

export function selectWisdomTone(score: number, total: number): WisdomTone {
  if (total <= 0) return "steady";
  if (score === total) return "celebrate";
  if (score / total < WISDOM_STRUGGLE_RATIO) return "encourage";
  return "steady";
}

function pickRandom(pool: WisdomCard[]): WisdomCard {
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getRandomWisdomCard(): WisdomCard {
  return pickRandom(WISDOM_CARDS);
}

/**
 * Thẻ hợp với kết quả vừa đạt. Vẫn random trong pool đúng giọng, không lưu
 * lại thẻ đã hiện - giữ nguyên tính chất của tính năng cũ.
 */
export function getWisdomCardForScore(score: number, total: number): WisdomCard {
  const tone = selectWisdomTone(score, total);
  return pickRandom(ALL_WISDOM_CARDS.filter((c) => (c.tone ?? "steady") === tone));
}
