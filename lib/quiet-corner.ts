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

export const BREATH_PHASES: BreathPhase[] = [
  { label: "Hít vào", seconds: 4, scale: 1 },
  { label: "Giữ", seconds: 4, scale: 1 },
  { label: "Thở ra", seconds: 4, scale: 0.6 },
  { label: "Giữ", seconds: 4, scale: 0.6 },
];

export const BREATH_CYCLES = 4;

export const BREATH_CYCLE_SECONDS = BREATH_PHASES.reduce((sum, p) => sum + p.seconds, 0);

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
];

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
