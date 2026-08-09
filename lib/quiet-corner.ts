// Nội dung cho /loi-nhan - "góc yên tĩnh".
//
// Nguyên tắc thiết kế của trang này, ngược hẳn với phần còn lại của app:
// KHÔNG XP, KHÔNG streak, KHÔNG đếm ngược, KHÔNG nút "học tiếp ngay". Toàn bộ
// app còn lại đã đẩy người dùng đi tới rồi. Một trang có nhiệm vụ hạ nhịp mà
// vẫn gắn phần thưởng vào thì tự mâu thuẫn - nó biến việc nghỉ thành một
// nhiệm vụ nữa phải hoàn thành.
//
// Phạm vi cũng phải thành thật: đây không phải trị liệu, và không chỗ nào
// trong file này được phép nói như thể nó là trị liệu. Xem QUIET_CORNER_LIMITS
// ở cuối file - phần đó luôn hiển thị, không gập lại được.

/** Nhịp thở hộp 4-4-4-4, bốn chu kỳ (~64 giây). */
export interface BreathPhase {
  label: string;
  seconds: number;
  /** Vòng tròn phình ra hay co lại trong pha này. */
  scale: number;
}

/** Nhịp thở hộp 4-4-4-4. Chỉ có CẤU TRÚC ở đây - số giây và độ phình - vì đó
 *  là dữ liệu; nhãn là câu chữ nên nó đi qua từ điển (breathPhasesOf).
 *
 *  Tách ra vì `BREATH_CYCLE_SECONDS` được suy từ mảng này và không được phụ
 *  thuộc vào ngôn ngữ đang chọn: một thiết lập đếm thời gian mà đổi theo ngôn
 *  ngữ là một cái bẫy chờ sẵn. */
export const BREATH_STEPS: Array<{ key: "inhale" | "hold" | "exhale"; seconds: number; scale: number }> = [
  { key: "inhale", seconds: 4, scale: 1 },
  { key: "hold", seconds: 4, scale: 1 },
  { key: "exhale", seconds: 4, scale: 0.6 },
  { key: "hold", seconds: 4, scale: 0.6 },
];

/** Nhịp thở kèm nhãn đã dịch. */
export function breathPhasesOf(t: {
  breathing: { inhale: string; hold: string; exhale: string };
}): BreathPhase[] {
  return BREATH_STEPS.map((s) => ({
    label: t.breathing[s.key],
    seconds: s.seconds,
    scale: s.scale,
  }));
}

export const BREATH_CYCLES = 4;

export const BREATH_CYCLE_SECONDS = BREATH_STEPS.reduce((sum, p) => sum + p.seconds, 0);

/**
 * Lo lắng về tiền là chỗ giao nhau thật sự giữa một app tài chính và sức khoẻ
 * tinh thần - và là thứ không phần nào khác của app này chạm tới. Mỗi mục là
 * một nỗi lo cụ thể người học hay mang, kèm một góc nhìn khác.
 *
 * Góc nhìn ở đây là cách nghĩ, KHÔNG phải lời khuyên đầu tư hay tài chính cá
 * nhân. Không mục nào được bảo người đọc nên mua gì, bán gì, hay tiêu bao
 * nhiêu - đó là việc của người có chuyên môn và biết hoàn cảnh cụ thể của họ.
 */
export interface WorryReframe {
  id: string;
  /** Nỗi lo, viết ở ngôi thứ nhất đúng như người ta nghĩ trong đầu. */
  worry: string;
  /** Góc nhìn khác. Thừa nhận nỗi lo trước, không gạt phăng nó đi. */
  reframe: string;
}

/**
 * Một câu chào theo giờ trong ngày - tín hiệu thấu cảm rẻ nhất mà trang có
 * thể phát ra. Quan trọng nhất là dải đêm khuya: lo lắng về tiền lúc một giờ
 * sáng là một trải nghiệm rất cụ thể, và việc trang *biết* lúc đó là mấy giờ
 * đã là một nửa lời an ủi. Hàm thuần theo giờ địa phương, không lưu gì.
 */
/** Khung giờ, tách khỏi câu chữ. Component tra `t.quietGreeting[key]`; hàm
 *  `getQuietGreeting` bên dưới giữ nguyên chữ tiếng Việt cho bộ kiểm và cho
 *  bất kỳ chỗ nào chưa có từ điển trong tay. */
export type QuietGreetingKey = "lateNight" | "morning" | "afternoon" | "evening" | "night";

export function getQuietGreetingKey(hour: number): QuietGreetingKey {
  if (hour < 5) return "lateNight";
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  if (hour < 22) return "evening";
  return "night";
}

/* i18n-ignore-start: mọi chuỗi từ đây tới hết tệp đã có lớp phủ dịch, khoá
   theo `id` (nỗi lo, câu hỏi) hoặc theo khung giờ. QuietCornerClient đọc
   `t.worryReframes`, `t.quietQuestionItems`, `t.quietGreeting`, `t.quietClosing`
   và `t.quietLimits`; `getQuietGreeting` chỉ còn phục vụ bộ kiểm.
   lib/__tests__/quiet-corner-i18n.test.ts giữ cả hai bản khớp nhau, và kiểm
   riêng rằng phần ranh giới bản Anh vẫn chỉ ra ngoài ứng dụng thay vì bị làm
   mềm đi trong lúc dịch. */
export function getQuietGreeting(hour: number): string {
  if (hour < 5) {
    return "Đã quá nửa đêm. Nỗi lo nào cũng nghe to hơn vào giờ này - chúng sẽ nhỏ lại dưới ánh sáng ban ngày.";
  }
  if (hour < 11) {
    return "Chào buổi sáng. Ngày chưa đòi hỏi gì ở bạn cả - khoan hãy vội.";
  }
  if (hour < 17) {
    return "Giữa một ngày bận, bạn vẫn ghé qua đây - vậy là bạn biết tự cho mình một quãng nghỉ.";
  }
  if (hour < 22) {
    return "Ngày hôm nay đã xong phần việc của nó. Buổi tối còn lại là của bạn.";
  }
  return "Đêm đã khuya. Không còn việc gì của hôm nay bắt buộc phải xong nữa.";
}

/**
 * Bản rút gọn của lời chào trên, dành cho card lời nhắn ở dashboard - và cố ý
 * chỉ lên tiếng trong dải đêm khuya, còn lại trả về null.
 *
 * Không phải vì lười đồng bộ: card đó chỉ có một nhãn, một câu và một nút, nên
 * thêm một dòng vào mọi khung giờ là biến nó thành bốn dòng chữ chen nhau để
 * đổi lấy gần như không gì. Riêng người mở app tài chính lúc hai giờ sáng thì
 * dòng này đáng giá - đó là lúc duy nhất mà việc được nhìn thấy quan trọng hơn
 * việc card gọn.
 */
export function getLateNightNote(hour: number): string | null {
  if (hour >= 23 || hour < 5) {
    return "Khuya rồi - chuyện gì cũng nặng hơn vào giờ này.";
  }
  return null;
}

export const WORRY_REFRAMES: WorryReframe[] = [
  {
    id: "wr-01",
    worry: "Mình đang tụt lại phía sau so với bạn bè cùng tuổi.",
    reframe:
      "Bạn đang so sánh phần trong của mình với phần ngoài của họ - bạn biết hết nợ và nỗi lo của bản thân, nhưng chỉ thấy phần họ chọn cho bạn thấy. So sánh với chính mình sáu tháng trước mới là phép đo có thật.",
  },
  {
    id: "wr-02",
    worry: "Mình bắt đầu quá muộn rồi.",
    reframe:
      "Muộn hơn lý tưởng không có nghĩa là hết. Thời điểm tốt thứ hai để bắt đầu luôn là bây giờ, và điều đó đúng ở mọi độ tuổi - câu này không phải để an ủi, nó chỉ là số học.",
  },
  {
    id: "wr-03",
    worry: "Mình sợ nhìn vào số dư tài khoản.",
    reframe:
      "Né tránh làm nỗi lo lớn lên chứ không nhỏ đi - phần đáng sợ nhất thường là khoảng trống bạn tự lấp bằng tưởng tượng. Con số thật, dù xấu, vẫn là thứ hữu hạn và xử lý được.",
  },
  {
    id: "wr-04",
    worry: "Mình thấy tệ vì đã ra một quyết định tiền bạc sai.",
    reframe:
      "Bạn quyết định bằng thông tin có lúc đó, không phải thông tin bây giờ. Đánh giá lại quyết định bằng những gì chỉ sau này mới biết là tự phạt mình vì một việc bất khả.",
  },
  {
    id: "wr-05",
    worry: "Nghĩ tới tiền là mình thấy nghẹt thở, không biết bắt đầu từ đâu.",
    reframe:
      "Cảm giác đó thường đến từ việc ôm tất cả cùng lúc chứ không từ độ khó thật. Chọn đúng một thứ nhỏ cho hôm nay và cho phép mình bỏ qua phần còn lại tới mai.",
  },
  {
    id: "wr-06",
    worry: "Mình thấy mình kém cỏi vì không hiểu mấy thứ tài chính này.",
    reframe:
      "Không ai sinh ra đã biết. Đây là kiến thức chuyên môn phải học, không phải bản năng ai cũng có sẵn - việc bạn thấy khó là dấu hiệu bạn đang học thật, không phải dấu hiệu bạn kém.",
  },
  {
    id: "wr-07",
    worry: "Mình thấy có lỗi mỗi khi tiêu tiền cho bản thân.",
    reframe:
      "Một kế hoạch mà mọi khoản chi cho bản thân đều kèm cảm giác tội lỗi là kế hoạch sẽ bị bỏ. Chỗ cho những thứ khiến đời sống dễ chịu hơn không phải là lỗ hổng của kế hoạch - nó là thứ giữ kế hoạch sống được.",
  },
  {
    id: "wr-08",
    worry: "Mình lo mình sẽ chẳng bao giờ đủ tiền.",
    reframe:
      "\"Đủ\" không có con số mặc định - nếu không tự định nghĩa, nó sẽ luôn lùi ra xa đúng bằng tốc độ bạn tiến tới. Viết ra một con số cụ thể biến nỗi lo vô hạn thành một mục tiêu hữu hạn.",
  },
  // Bốn mục dưới đây là nhóm nỗi lo đặc thù nhất với người học Việt Nam -
  // tiền trong quan hệ gia đình - mà tám mục đầu chưa chạm tới. Vẫn đúng
  // nguyên tắc cũ: thừa nhận trước, không chỉ dẫn hành động tài chính.
  {
    id: "wr-09",
    worry: "Mình đang giấu người thân một khoản nợ.",
    reframe:
      "Khoản nợ có con số, còn sự giấu giếm thì không - và thứ không đo được mới là thứ nặng thêm mỗi ngày. Không cần nói với tất cả mọi người; một người đáng tin biết chuyện là gánh đã được chia đôi.",
  },
  {
    id: "wr-10",
    worry: "Người thân hỏi vay tiền, mình không biết từ chối sao cho phải.",
    reframe:
      "Từ chối một khoản vay không phải là từ chối một con người. Một lời không rõ ràng và tử tế thường giữ được quan hệ lâu hơn một cái gật đầu miễn cưỡng kèm theo ấm ức.",
  },
  {
    id: "wr-11",
    worry: "Xung quanh ai cũng khoe lãi, chỉ mình đứng ngoài.",
    reframe:
      "Bạn đang nghe những khoản lãi được kể lại - khoản lỗ hiếm khi được đem đi khoe. Đứng ngoài một thứ mình chưa hiểu không phải là chậm chân; đó là kỷ luật đang làm đúng việc của nó.",
  },
  {
    id: "wr-12",
    worry: "Cả nhà trông vào thu nhập của mình, mình không được phép sai.",
    reframe:
      "Trụ cột cũng là người - được phép mệt, được phép sai rồi sửa. Điều gia đình cần về lâu dài không phải một người không bao giờ sai, mà một người không gãy; và người không gãy là người biết lúc nào cần đặt gánh xuống.",
  },
  // Nhóm thứ ba: nỗi lo về công việc và thu nhập. Mười hai mục trước nói về
  // tiền đã có và quan hệ quanh nó; nhóm này nói về nguồn tạo ra nó, phần mà
  // người đi làm ở đầu sự nghiệp lo nhiều nhất.
  {
    id: "wr-13",
    worry: "Mình sợ mất việc và không có gì để dựa vào.",
    reframe:
      "Nỗi sợ đó đang chỉ đúng chỗ: nó không phải chuyện tính cách, nó là chuyện chưa có đệm. Đệm không cần lớn ngay - một tháng chi phí đã đổi hẳn cảm giác so với con số không, và nó xây được bằng những khoản rất nhỏ.",
  },
  {
    id: "wr-14",
    worry: "Lương mình mãi không tăng, cố gắng cũng chẳng để làm gì.",
    reframe:
      "Thu nhập tăng theo bậc chứ hiếm khi tăng đều, nên quãng phẳng không có nghĩa là đứng yên - phần lớn thứ tạo ra bậc tiếp theo được tích trong đúng những quãng phẳng đó. Điều bạn kiểm soát được là năng lực và thông tin về mức giá thị trường của nó.",
  },
  {
    id: "wr-15",
    worry: "Mình muốn đổi hướng nhưng sợ mất hết những gì đã xây.",
    reframe:
      "Phần lớn thứ bạn đã xây là kỹ năng và cách làm việc, và chúng đi theo bạn qua mọi ngành. Thứ thật sự mất đi thường nhỏ hơn nhiều so với con số bạn đang hình dung - và chi phí chìm thì không nên là lý do để ở lại.",
  },
  {
    id: "wr-16",
    worry: "Mình thấy mệt và không còn muốn cố gắng nữa.",
    reframe:
      "Mệt kéo dài là tín hiệu cần nghe, không phải kẻ thù cần thắng. Nghỉ có kế hoạch rẻ hơn rất nhiều so với nghỉ vì kiệt sức - và nếu cảm giác này ở lại nhiều tuần, đó là lúc nên nói với một người thật, không phải cố thêm một chút nữa.",
  },
];

/** Nhãn cho động tác "đặt xuống" một nỗi lo. Chỉ là trạng thái trong phiên -
 *  không lưu, không đếm, đúng nguyên tắc của trang. */
export const WORRY_SET_DOWN = {
  action: "Mình đặt nó xuống hôm nay",
  done: "Đã đặt xuống. Nó vẫn ở đây nếu bạn muốn cầm lên xem lại.",
} as const;

/**
 * Ba câu hỏi để tự gỡ một nỗi lo tiền bạc đang chạy vòng trong đầu.
 *
 * Đặt sau danh sách nỗi lo có sẵn vì nó phục vụ đúng trường hợp danh sách kia
 * không với tới: nỗi lo cụ thể của riêng người đọc, thứ không ai viết sẵn được.
 * Cả ba câu đều hỏi về thông tin và thời điểm, không câu nào gợi ý nên làm gì
 * với tiền - ranh giới của trang này vẫn nguyên như cũ.
 */
export const QUIET_CORNER_QUESTIONS = {
  title: "Ba câu hỏi cho nỗi lo của riêng bạn",
  intro:
    "Khi nỗi lo không nằm trong danh sách trên, ba câu này thường đủ để tách phần xử lý được ra khỏi phần chỉ có thể chờ.",
  items: [
    {
      id: "qq-01",
      question: "Đây là một vấn đề, hay là một cảm giác về vấn đề?",
      note:
        "Vấn đề có con số và có hạn: còn thiếu bao nhiêu, tới ngày nào. Cảm giác thì không có bờ, nên nó nghe to hơn nhiều so với thứ đang thật sự xảy ra. Viết ra con số cụ thể là cách nhanh nhất để biết mình đang đối mặt với cái nào.",
    },
    {
      id: "qq-02",
      question: "Có việc gì tôi làm được trong tuần này không?",
      note:
        "Nếu có, nó thường nhỏ hơn nhiều so với hình dung - mở một bảng sao kê, hỏi một câu, viết ra một danh sách. Nếu không có việc nào, thì nỗi lo này thuộc nhóm phải chờ, và ngồi nghĩ thêm về nó tối nay không làm nó ngắn lại.",
    },
    {
      id: "qq-03",
      question: "Một năm nữa nhìn lại, chuyện này còn lớn thế này không?",
      note:
        "Câu này không để phủ nhận nỗi lo mà để đặt lại tỷ lệ. Một số chuyện vẫn sẽ lớn, và biết được điều đó cũng có ích - nó cho bạn lý do để xử lý nghiêm túc thay vì để đó. Phần lớn còn lại thì không, và chúng đang chiếm chỗ nhiều hơn phần chúng đáng.",
    },
  ],
} as const;

/** Điểm hạ cánh của trang - đứng ngay trước phần ranh giới. Trang không được
 *  phép kết thúc bằng disclaimer: cần thiết nhưng lạnh, và ấn tượng cuối cùng
 *  nên là một lời cho phép rời đi, không phải một lời cảnh báo. */
export const QUIET_CORNER_CLOSING = {
  title: "Trước khi bạn quay lại",
  lines: [
    "Không có gì trên trang này cần hoàn thành, nên cũng không có gì đang dở dang.",
    "Nghỉ đủ rồi thì quay lại. Chưa đủ thì ở thêm một lát. Ngọn lửa không tắt khi bạn rời đi.",
  ],
} as const;

/**
 * Ranh giới của trang này. Luôn hiển thị, không gập lại được, không đặt sau
 * một cú bấm - nếu người đọc chỉ nhìn trang này một lần thì đây là phần họ
 * cần đọc nhất.
 *
 * Cố ý KHÔNG kèm số điện thoại đường dây nóng: một số máy sai hoặc đã ngừng
 * hoạt động in trên trang này còn tệ hơn là không có số nào. Muốn thêm thì
 * phải là số đã tự kiểm chứng từ nguồn chính thức.
 */
export const QUIET_CORNER_LIMITS = {
  title: "Trang này không thay thế được điều gì",
  body:
    "Đây là một góc để dừng lại một phút, không phải tư vấn tâm lý và cũng không phải tư vấn tài chính cá nhân. Nếu sự lo lắng kéo dài, ảnh hưởng tới giấc ngủ, công việc hay các mối quan hệ của bạn, hãy nói chuyện với một người bạn tin tưởng hoặc tìm tới chuyên gia sức khoẻ tâm thần. Việc đó không phải là yếu đuối - nó cũng giống như đi khám khi cơ thể có vấn đề vậy.",
} as const;

/* i18n-ignore-end */
