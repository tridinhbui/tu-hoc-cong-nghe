import { trackHours } from "@/lib/track-totals";

// Xem chú thích cùng nội dung trong lib/tracks.ts: hai con số `estimatedHours`
// dưới đây từng là hằng số gõ tay và cả hai đã lệch khỏi kho bài.
export interface StagePart {
  name: string;
  days: [number, number];
  // Lesson ids to include in this part even though they fall outside the
  // contiguous `days` range - e.g. a bonus-track case study that belongs
  // topically in this part but can't be given a contiguous id here without
  // renumbering every lesson after it (which would break existing users'
  // progress, tracked by these exact ids).
  extraLessonIds?: number[];
}

export interface Stage {
  label: string;
  name: string;
  days: [number, number];
  available: boolean;
  parts: StagePart[];
  extraLessonIds?: number[];
  // Shows a "Mới" badge on the stage card. Manually flip off once a stage
  // has been live for a while - not time-based, so it won't silently expire.
  isNew?: boolean;
}

// True if `lesson` belongs to `range` either via the contiguous [start, end]
// day span or via `range`'s extraLessonIds allowlist.
export function isLessonInRange(
  lessonId: number,
  range: { days: [number, number]; extraLessonIds?: number[] }
): boolean {
  return (lessonId >= range.days[0] && lessonId <= range.days[1]) || !!range.extraLessonIds?.includes(lessonId);
}

/* i18n-ignore-start: `title`, `subtitle`, `description`, `pillars` và mọi
   `label`/`name` dưới đây là dữ liệu lộ trình. Giao diện đọc
   `t.trackStages[track]` theo VỊ TRÍ và chỉ rơi về bản Việt khi từ điển lệch -
   trường hợp mà lib/__tests__/track-stages-i18n.test.ts bắt được, cả về số
   lượng lẫn thứ tự. `label` còn là khoá của `lessonsByStageLabel` và của cột
   `stage_label` đã ghi xuống Supabase, nên nó KHÔNG được dịch tại đây. */
export const TRACK_PERSONAL = {
  id: "personal",
  title: "Nền tảng công nghệ",
  // Không hứa số ngày nữa. Con số 108 được viết khi track có 108 bài và mỗi
  // ngày một bài; hôm nay track có 136 bài và người học đi theo nhịp của họ,
  // nên "108 ngày" vừa sai vừa không có gì trong ứng dụng đối chiếu được.
  subtitle: "Dành cho người mới bắt đầu",
  estimatedHours: trackHours("personal"),
  description:
    "Dành cho người muốn hiểu máy tính, viết được chương trình đầu tiên, dựng sản phẩm chạy thật và đi làm nghề công nghệ - không cần kiến thức ngành.",
  pillars: ["Tư duy lập trình", "Web & sản phẩm", "Dữ liệu & triển khai"],
  stages: [
    {
      // Foundation-first: know your own numbers before learning any theory.
      // Ids 263-268 sort after 262 but stages render in array order, so this
      // block appears first on the dashboard as intended.
      label: "Chặng 1",
      name: "Biết mình trước khi học: máy tính, hệ điều hành, dòng lệnh",
      days: [263, 268] as [number, number],
      // Ids 1351-1353 mở rộng chặng ở hai đầu: một bài đo chi tiêu đứng trước
      // phần lập ngân sách, hai bài tự động hóa và bảo hiểm đứng sau. Dải
      // 263-268 đã kín và 269 trở đi thuộc Chặng 7, nên không nới days được.
      extraLessonIds: [1351, 1352, 1353],
      available: true,
      parts: [
        { name: "Đo trước: máy của bạn đang chạy gì", days: [0, 0] as [number, number], extraLessonIds: [1351] },
        { name: "Hệ điều hành và cấu trúc tập tin", days: [263, 264] as [number, number] },
        { name: "Dòng lệnh, quyền truy cập và mục tiêu học", days: [265, 268] as [number, number] },
        { name: "Giữ máy sống sót: sao lưu và tự động hoá", days: [0, 0] as [number, number], extraLessonIds: [1352, 1353] },
      ],
    },
    {
      // Placed second on purpose: you cannot budget, size an emergency fund
      // or plan debt repayment without knowing your actual take-home pay,
      // which is what this chặng computes. Ids 1301-1308 sit above every
      // existing block so no renumbering (and no progress loss) is needed.
      label: "Chặng 2",
      name: "Git & kho mã chung",
      days: [1301, 1308] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Từ commit đầu tiên đến nhánh làm việc", days: [1301, 1304] as [number, number] },
        { name: "Merge, xung đột và pull request", days: [1305, 1308] as [number, number] },
      ],
    },
    {
      label: "Chặng 3",
      name: "Tư duy lập trình và ngôn ngữ đầu tiên",
      days: [1, 20] as [number, number],
      // 1048 (tu-duy-tai-chinh) là trang viết tay được kéo về corpus. Nội dung
      // của nó đúng là chủ đề chặng này, nhưng id nằm ngoài dải 1-20.
      extraLessonIds: [1048],
      available: true,
      parts: [
        { name: "Biến, kiểu dữ liệu và luồng điều khiển", days: [1, 10] as [number, number] },
        { name: "Hàm, lỗi và cách chương trình chạy", days: [11, 20] as [number, number] },
      ],
    },
    {
      label: "Chặng 4",
      name: "HTML, CSS và trang web đầu tiên",
      days: [201, 220] as [number, number],
      available: true,
      // Display in numerical order to avoid lesson-number jumps on dashboard
      // (was: psychology first [212-214], stocks [201-211], taxes [215-220])
      parts: [
        { name: "Thẻ HTML, bố cục CSS và trang tĩnh", days: [201, 211] as [number, number] },
        { name: "Lỗi hay gặp và kỳ vọng thực tế về giao diện", days: [212, 214] as [number, number] },
        { name: "Khả năng truy cập, responsive và thực hành", days: [215, 220] as [number, number] },
      ],
    },
    {
      label: "Chặng 5",
      name: "JavaScript và trình duyệt",
      days: [221, 240] as [number, number],
      available: true,
      parts: [
        { name: "Nền tảng JavaScript", days: [221, 230] as [number, number] },
        { name: "DOM, sự kiện và bất đồng bộ", days: [231, 240] as [number, number] },
      ],
    },
    {
      label: "Chặng 6",
      name: "Cấu trúc dữ liệu và thuật toán cơ bản",
      days: [241, 262] as [number, number],
      available: true,
      parts: [
        { name: "Mảng, map, ngăn xếp và hàng đợi", days: [241, 250] as [number, number] },
        { name: "Tìm kiếm, sắp xếp và tổng kết hành trình", days: [251, 262] as [number, number] },
      ],
    },
    {
      label: "Chặng 7",
      name: "Gọi API và ghép dịch vụ ngoài",
      days: [269, 278] as [number, number],
      available: true,
      parts: [
        { name: "HTTP, JSON và một lệnh gọi đầu tiên", days: [269, 273] as [number, number] },
        { name: "Xác thực, giới hạn tần suất và xử lý lỗi", days: [274, 278] as [number, number] },
      ],
    },
    {
      label: "Chặng 8",
      name: "Cơ sở dữ liệu và truy vấn",
      days: [279, 288] as [number, number],
      available: true,
      parts: [
        { name: "Bảng, quan hệ, SELECT và chỉ mục", days: [279, 283] as [number, number] },
        { name: "Ghép bảng, giao dịch và truy vấn chậm", days: [284, 288] as [number, number] },
      ],
    },
    {
      label: "Chặng 9",
      name: "Triển khai, tên miền và bảo mật cơ bản",
      days: [289, 298] as [number, number],
      available: true,
      isNew: true,
      // 1761-1763: cụm chọn bảo hiểm. Ngày 289-298 đã kín nên chúng đi qua
      // extraLessonIds, giống cách Chặng 5 chuyên ngành làm.
      extraLessonIds: [1761, 1762, 1763],
      parts: [
        { name: "Máy chủ & tên miền", days: [289, 293] as [number, number] },
        {
          name: "HTTPS & bảo vệ dữ liệu người dùng",
          days: [294, 298] as [number, number],
          extraLessonIds: [1761, 1762, 1763],
        },
      ],
    },
    {
      label: "Chặng 10",
      name: "Code review, kiểm thử và tài liệu",
      days: [1235, 1240] as [number, number],
      extraLessonIds: [1030],
      available: true,
      isNew: true,
      parts: [
        { name: "Điểm mù khi tự đọc code của mình", days: [1235, 1237] as [number, number] },
        {
          name: "Kiểm thử, thói quen và kỷ luật nghề",
          days: [1238, 1240] as [number, number],
          extraLessonIds: [1030],
        },
      ],
    },
    {
      // Chặng 11 nói về vế còn lại của phương trình: số tiền ĐI VÀO. Mười
      // chặng trên phủ rất kỹ việc phân bổ và đầu tư số tiền đã có, nhưng
      // không có bài nào về thu nhập - trong khi với người đi làm, đó thường
      // là biến thay đổi được nhiều nhất.
      //
      // Ids 300-309 nằm ngay sau Chặng 9 (289-298). Dải 299-800 trống hoàn
      // toàn ở cả tệp này lẫn career-competency.ts, nên khai báo được bằng
      // `days` mà không cần extraLessonIds như Chặng 1 và Chặng 10 phải làm.
      label: "Chặng 11",
      name: "Nghề lập trình & đầu tư vào bản thân",
      days: [300, 309] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Đòn bẩy kỹ năng và giá thị trường của bạn", days: [300, 301] as [number, number] },
        { name: "Đàm phán lương và tổng đãi ngộ", days: [302, 304] as [number, number] },
        { name: "Dự án phụ và nguồn thu thứ hai", days: [305, 307] as [number, number] },
        { name: "Đầu tư vào bản thân và bản đồ 12 tháng", days: [308, 309] as [number, number] },
      ],
    },
    {
      // Chặng 12: nơi gần như 100% người học Việt Nam thật sự để tiền. Track
      // này dạy rất kỹ cổ phiếu, trái phiếu và danh mục, nhưng sổ tiết kiệm
      // ngân hàng thì trước đây không có bài nào - nên người học biết tính
      // duration của trái phiếu mà không biết vì sao rút sổ trước hạn lại mất
      // gần hết lãi.
      label: "Chặng 12",
      name: "Linux, mạng & giao thức",
      days: [310, 319] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Tiến trình, tập tin và quyền", days: [310, 311] as [number, number] },
        { name: "Cổng, tường lửa và SSH", days: [312, 313] as [number, number] },
        { name: "DNS, TLS và lớp bảo vệ", days: [314, 315] as [number, number] },
        { name: "Shell script, cron và sắp xếp toàn bộ", days: [316, 319] as [number, number] },
      ],
    },
    {
      // Chặng 13: vàng là kênh giữ tiền phổ biến bậc nhất ở Việt Nam và track
      // này trước đó có ĐÚNG 0 bài về nó.
      label: "Chặng 13",
      name: "Đám mây và hạ tầng thuê ngoài",
      days: [320, 327] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Đám mây thực chất là gì", days: [320, 321] as [number, number] },
        { name: "Chi phí thật và chuyện tiết kiệm hạ tầng", days: [322, 323] as [number, number] },
        { name: "Vùng, khả dụng và độ trễ", days: [324, 325] as [number, number] },
        { name: "Chọn dịch vụ hợp lý và tổng kết", days: [326, 327] as [number, number] },
      ],
    },
    {
      // Chặng 14: Chặng 4 có 20 bài lý thuyết về cổ phiếu nhưng không bài nào
      // nói người học phải làm gì để MUA được một cổ phiếu ở Việt Nam.
      label: "Chặng 14",
      name: "Thị trường IT Việt Nam trong thực tế",
      days: [330, 339] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Làm CV và nộp hồ sơ đầu tiên", days: [330, 331] as [number, number] },
        { name: "Phỏng vấn, thử việc và mức lương", days: [332, 334] as [number, number] },
        { name: "Outsource, product và startup", days: [335, 337] as [number, number] },
        { name: "Đọc tin tuyển dụng và ứng tuyển thật", days: [338, 339] as [number, number] },
      ],
    },
    {
      // Chặng 15: track có 0 bài về crypto trong khi đây là nơi người học gặp
      // nhiều lời mời chào nhất. Im lặng không bảo vệ được ai - họ vẫn gặp chủ
      // đề này, chỉ là từ những nguồn có động cơ bán hàng. Giọng của chặng là
      // cơ chế và rủi ro, không khuyên mua và cũng không khuyên tránh.
      label: "Chặng 15",
      name: "Blockchain & ứng dụng phi tập trung",
      days: [340, 347] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Bản chất chuỗi khối và cách lưu khoá", days: [340, 341] as [number, number] },
        { name: "Ví, hợp đồng thông minh và pháp lý", days: [342, 344] as [number, number] },
        { name: "Lừa đảo, giới hạn ứng dụng và tổng kết", days: [345, 347] as [number, number] },
      ],
    },
    {
      // Chặng 16: track chỉ có ĐÚNG MỘT bài về lừa đảo (id 284), trong khi đây
      // là nguyên nhân mất tiền nhanh nhất và không có cơ hội gỡ lại. Dạy nhận
      // diện theo CẤU TRÚC chứ không theo dấu hiệu bề mặt: kịch bản nào cũng
      // cần bạn gấp, một mình, và qua kênh do chúng chọn.
      label: "Chặng 16",
      name: "An toàn thông tin & phòng tấn công",
      days: [350, 357] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Cơ chế tấn công và kịch bản giả mạo", days: [350, 352] as [number, number] },
        { name: "Mật khẩu, xác thực hai lớp và thiết bị", days: [353, 355] as [number, number] },
        { name: "Khi đã bị xâm nhập và quy tắc cho cả nhà", days: [356, 357] as [number, number] },
      ],
    },
    {
      // Chặng 17 KHÔNG trùng Chặng 9. Chặng 9 có phần lý thuyết: khoản vay hoạt
      // động thế nào, DTI, thuê hay mua. Chặng này bắt đầu từ chỗ đó dừng lại -
      // kiểm gì trước khi cọc, chi phí thật ngoài giá, lãi thả nổi sau ưu đãi,
      // và lợi suất cho thuê sau khi trừ hết.
      label: "Chặng 17",
      name: "Ứng dụng di động thực chiến",
      days: [360, 367] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Chọn nền tảng và khởi tạo dự án", days: [360, 361] as [number, number] },
        { name: "Chi phí thật và vòng đời phát hành", days: [362, 363] as [number, number] },
        { name: "Native, cross-platform và web app", days: [364, 366] as [number, number] },
        { name: "Danh sách kiểm trước khi lên store", days: [367, 367] as [number, number] },
      ],
    },
    {
      // Chặng 18: thứ làm hỏng kế hoạch tài chính của phần lớn hộ gia đình
      // không phải đầu tư sai, mà là vài khoản chi lớn đến theo lịch của đời
      // người - và đều BIẾT TRƯỚC được.
      label: "Chặng 18",
      name: "Những dự án lớn trong nghề",
      days: [370, 376] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Nguyên tắc chung và dự án cá nhân đầu tiên", days: [370, 371] as [number, number] },
        { name: "Dự án nhóm, sản phẩm nội bộ và mã nguồn mở", days: [372, 374] as [number, number] },
        { name: "Bàn giao, bảo trì và bản đồ tổng thể", days: [375, 376] as [number, number] },
      ],
    },
    {
      // Chặng 19: rủi ro sức khỏe tấn công CẢ HAI VẾ cùng lúc - chi phí tăng
      // trong khi thu nhập dừng. Mọi chặng trước chỉ nói về một vế.
      label: "Chặng 19",
      name: "Sức khoẻ nghề nghiệp và rủi ro con người",
      days: [380, 384] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Rủi ro hai vế: kiệt sức và lệ thuộc công cụ", days: [380, 381] as [number, number] },
        { name: "Tư thế, mắt và nhịp làm việc bền", days: [382, 383] as [number, number] },
        { name: "Danh sách kiểm", days: [384, 384] as [number, number] },
      ],
    },
    {
      // Chặng 20: cùng một lời khuyên đúng có thể vô dụng nếu đưa sai giai
      // đoạn. Chặng này xếp lại 19 chặng trước theo trục tuổi.
      label: "Chặng 20",
      name: "Nghề công nghệ theo giai đoạn sự nghiệp",
      days: [390, 393] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Junior và mid-level", days: [390, 391] as [number, number] },
        { name: "Senior, lead và sau đó", days: [392, 393] as [number, number] },
      ],
    },
    {
      // Chặng 21: thất bại phổ biến nhất trong tài chính cá nhân không phải
      // hiểu sai, mà là hiểu đúng rồi không duy trì được.
      label: "Chặng 21",
      name: "Công cụ và vận hành",
      days: [400, 403] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Bộ công cụ tối thiểu và tự động hoá", days: [400, 401] as [number, number] },
        { name: "Rà soát hằng năm và tổng kết", days: [402, 403] as [number, number] },
      ],
    },
  ] satisfies Stage[],
};

export const TRACK_PROFESSIONAL = {
  id: "professional",
  title: "Công nghệ chuyên sâu",
  subtitle: "Chuyên sâu, cho người đã có nền lập trình",
  estimatedHours: trackHours("professional"),
  description:
    "Lộ trình chuyên sâu dành cho người đã biết lập trình cơ bản: kiến trúc, thiết kế API, mạng, độ tin cậy, dữ liệu, hạ tầng.",
  pillars: ["Ngôn ngữ & kiến trúc", "Hiệu năng & đo lường", "Hạ tầng & độ tin cậy"],
  stages: [
    {
      label: "Chặng 1",
      name: "Nền tảng dữ liệu",
      days: [21, 40] as [number, number],
      // 1051 và 1244 là hai bài tài chính (khấu hao, kế toán dồn tích) từng bổ
      // trợ cho chặng kế toán cũ ở dải 21-40. Nội dung dải này đã chuyển sang
      // nền tảng dữ liệu, nên hai bài đó không còn liên quan - giữ tạm ở đây
      // để chúng vẫn vào được từ giáo trình, tới khi chặng tài chính tương ứng
      // được chuyển đổi.
      extraLessonIds: [1051, 1244],
      available: true,
      parts: [
        { name: "Giá trị: kiểu, phạm vi và cái rỗng", days: [21, 30] as [number, number] },
        {
          name: "Hệ thống dữ liệu: quan hệ, giao dịch và độ tin cậy",
          days: [31, 40] as [number, number],
          extraLessonIds: [1244],
        },
      ],
    },
    {
      label: "Chặng 2",
      name: "Mạng và giao tiếp giữa các hệ thống",
      days: [41, 60] as [number, number],
      // 1053, 1690, 1691 và 1692 là bốn bài tài chính từng bổ trợ cho chặng ba
      // báo cáo cũ ở dải 41-60. Nội dung dải này đã chuyển sang mạng và dịch
      // vụ, nên chúng không còn liên quan - giữ tạm để không rơi khỏi giáo
      // trình, tới khi chặng tài chính tương ứng được chuyển đổi.
      extraLessonIds: [1053, 1690, 1691, 1692],
      available: true,
      parts: [
        { name: "Đường đi của một lời gọi", days: [41, 50] as [number, number] },
        { name: "Chịu lỗi, đo lường và bảo mật", days: [51, 60] as [number, number] },
        {
          name: "Đọc sâu: chú thích, độ phủ kiểm thử và kết quả review",
          days: [0, 0] as [number, number],
          extraLessonIds: [1690, 1691, 1692],
        },
      ],
    },
    {
      label: "Chặng 3",
      name: "Từ mã nguồn tới người dùng",
      days: [61, 80] as [number, number],
      available: true,
      parts: [
        { name: "Dựng, kiểm và đưa mã ra", days: [61, 70] as [number, number] },
        { name: "Triển khai, vận hành và học từ sự cố", days: [71, 80] as [number, number] },
      ],
    },
    {
      label: "Chặng 4",
      name: "Đo lường sản phẩm và chọn việc",
      days: [81, 100] as [number, number],
      // 1047 (on-tap-npv) là bài tài chính từng bổ trợ cho chặng giá trị thời
      // gian của tiền ở dải 81-100. Nội dung dải này đã chuyển sang đo lường
      // sản phẩm, nên giữ tạm để bài đó không rơi khỏi giáo trình.
      extraLessonIds: [1047],
      available: true,
      parts: [
        { name: "Đo cho đúng: chỉ số, nhóm và thử nghiệm", days: [81, 90] as [number, number] },
        { name: "Chọn cho đúng: ưu tiên và kiểm chứng", days: [91, 100] as [number, number] },
      ],
    },
    {
      label: "Chặng 5",
      name: "Quy mô và nhiều đội",
      days: [101, 120] as [number, number],
      // Tám bài bổ trợ ở đây đều là bài tài chính từng gắn với chặng tài chính
      // doanh nghiệp cũ ở dải 101-120. Nội dung dải này đã chuyển sang quy mô
      // tổ chức, nên chúng không còn liên quan - giữ tạm để không rơi khỏi
      // giáo trình, tới khi chặng tài chính tương ứng được chuyển đổi.
      extraLessonIds: [1247, 1257, 1337, 1338, 1339, 1751, 1752, 1753],
      available: true,
      parts: [
        {
          name: "Ranh giới và hợp đồng giữa các đội",
          days: [101, 110] as [number, number],
          extraLessonIds: [1337, 1338, 1339],
        },
        {
          name: "Phối hợp, di trú lớn và hình dạng tổ chức",
          days: [111, 120] as [number, number],
          extraLessonIds: [1247, 1257, 1751, 1752, 1753],
        },
      ],
    },
    {
      label: "Chặng 6",
      name: "Bảo mật ứng dụng",
      days: [121, 140] as [number, number],
      available: true,
      // 1036 là bài định giá tài sản ròng, từng bổ trợ cho chặng định giá cũ ở
      // dải 121-140. Giữ tạm để nó không rơi khỏi giáo trình, tới khi chặng
      // tài chính tương ứng được chuyển đổi.
      extraLessonIds: [1036],
      parts: [
        { name: "Danh tính, quyền và dữ liệu nhạy cảm", days: [121, 130] as [number, number] },
        { name: "Giới hạn hậu quả và chuẩn bị cho sự cố", days: [131, 140] as [number, number], extraLessonIds: [1036] },
      ],
    },
    {
      label: "Chặng 7",
      name: "Mạng, độ trễ và giao thức",
      days: [141, 160] as [number, number],
      available: true,
      parts: [
        { name: "TCP, HTTP/2 và chi phí một vòng gọi", days: [141, 150] as [number, number] },
        { name: "Mất gói, timeout và các kiểu thử lại", days: [151, 160] as [number, number] },
      ],
    },
    {
      label: "Chặng 8",
      name: "Độ tin cậy và quản trị sự cố",
      days: [161, 180] as [number, number],
      available: true,
      parts: [
        { name: "SLO, ngân sách lỗi và dự phòng", days: [161, 170] as [number, number] },
        { name: "Đo lường sự cố và các mô hình trực", days: [171, 180] as [number, number] },
      ],
    },
    {
      label: "Chặng 9",
      name: "Hàng đợi, sự kiện và xử lý bất đồng bộ",
      days: [181, 200] as [number, number],
      available: true,
      parts: [
        { name: "Hàng đợi và pub/sub cơ bản", days: [181, 190] as [number, number] },
        { name: "Idempotency, bù trừ lỗi và tổng kết", days: [191, 200] as [number, number] },
      ],
    },
    {
      label: "Chặng 10",
      name: "Nâng cao: Ứng dụng nghề Kỹ sư nền tảng & hệ thống lớn",
      days: [1101, 1110] as [number, number],
      available: true,
      isNew: true,
      extraLessonIds: [1021, 1260],
      parts: [
        { name: "Chất lượng mã, đối chuẩn hiệu năng và nợ kỹ thuật", days: [1101, 1105] as [number, number] },
        {
          name: "Di trú hệ thống, tách khối và cơ chế phát hành",
          days: [1106, 1110] as [number, number],
          extraLessonIds: [1021, 1260],
        },
      ],
    },
    {
      label: "Chặng 11",
      name: "Vận hành sản phẩm công nghệ hiện đại",
      days: [1201, 1210] as [number, number],
      extraLessonIds: [1213, 1214, 1259],
      available: true,
      isNew: true,
      parts: [
        {
          name: "Giám sát & hoạch định dung lượng",
          days: [1201, 1205] as [number, number],
          extraLessonIds: [1213, 1214],
        },
        {
          name: "SRE & quản trị độ tin cậy",
          days: [1206, 1210] as [number, number],
          extraLessonIds: [1259],
        },
      ],
    },
    {
      label: "Chặng 12",
      name: "Tâm lý người dùng và thiết kế hành vi nâng cao",
      days: [1241, 1243] as [number, number],
      // The second part below always pointed at 1250-1252, but membership is
      // decided at stage level first, and the stage span stopped at 1243 - so
      // those three lessons belonged to no stage at all and appeared nowhere
      // in the learning path. The span cannot simply be widened to 1252:
      // 1244 is Chặng 1's, 1247 is Chặng 5's, 1248 is Chặng 18's, and
      // 1245/1246/1249 are Chặng 20 and 21's.
      extraLessonIds: [1250, 1251, 1252],
      available: true,
      isNew: true,
      parts: [
        { name: "Nền tảng lý thuyết & nghiên cứu người dùng", days: [1241, 1243] as [number, number] },
        { name: "Quản lý vòng đời & thiết kế sản phẩm", days: [1250, 1252] as [number, number] },
      ],
    },
    {
      label: "Chặng 13",
      name: "AI trong sản phẩm: Dùng ChatGPT/Claude để đọc mã, rà lỗi và viết tài liệu",
      days: [1261, 1280] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Bắt đầu an toàn: AI làm gì, đọc tài liệu và đọc mã nguồn", days: [1261, 1266] as [number, number] },
        { name: "Thực hành: rà soát, sinh kiểm thử, trợ lý riêng và viết tài liệu", days: [1267, 1273] as [number, number] },
        { name: "Project cuối chặng: thư viện câu lệnh và quy trình kiểm chứng", days: [1274, 1280] as [number, number] },
      ],
    },
    {
      label: "Chặng 14",
      name: "Masterclass chuyên đề: hạ tầng, mạng, startup công nghệ, bảo mật & phần mềm xanh",
      days: [801, 805] as [number, number],
      extraLessonIds: [801, 802, 803, 804, 805],
      available: true,
      isNew: true,
      parts: [
        { name: "Hạ tầng trung tâm dữ liệu, mạng doanh nghiệp, startup công nghệ, quản trị rủi ro bảo mật & phần mềm xanh", days: [801, 805] as [number, number], extraLessonIds: [801, 802, 803, 804, 805] },
      ],
    },
    {
      // Hands-on modelling is the core hard skill behind the analyst/IB path
      // that Chặng 10 introduces, so it sits at the end as the applied
      // capstone. Text lessons target structure, statement linkage and the
      // judgment behind assumptions - the parts that transfer through prose.
      label: "Chặng 15",
      name: "Dựng hệ thống thực hành (System Building)",
      days: [1311, 1320] as [number, number],
      extraLessonIds: [1342],
      available: true,
      isNew: true,
      parts: [
        { name: "Cấu trúc dự án, luồng dữ liệu và ba lớp dịch vụ", days: [1311, 1313] as [number, number] },
        { name: "Lớp phụ trợ, hàng đợi nền và đo hiệu năng", days: [1314, 1317] as [number, number] },
        {
          name: "Kiểm thử tải, rà soát thiết kế và project cuối chặng",
          days: [1318, 1320] as [number, number],
          extraLessonIds: [1342],
        },
      ],
    },
    {
      // ESG had four lessons but no home in either track: 805 sat inside the
      // Chặng 14 masterclass bundle, while 1229-1231 were reachable only by
      // learners who happened to pick the "esg-analyst" career path. A learner
      // working through Track 2 in order never met them. This stage gives the
      // topic a proper sequence - the three existing foundation lessons first,
      // then the four new ones covering what 805 doesn't: disclosure regimes,
      // rủi ro khí hậu như rủi ro vận hành, ESG inside a valuation model, and the
      // governance pillar in depth.
      label: "Chặng 16",
      name: "Phần mềm xanh (Green Software & hiệu quả năng lượng)",
      days: [1327, 1330] as [number, number],
      extraLessonIds: [1229, 1230, 1231],
      available: true,
      isNew: true,
      parts: [
        {
          name: "Nền tảng: phần mềm xanh là gì, đo lường và tối ưu tiêu thụ",
          days: [1229, 1231] as [number, number],
          extraLessonIds: [1229, 1230, 1231],
        },
        { name: "Quy định, dấu chân carbon của hạ tầng và chi phí", days: [1327, 1329] as [number, number] },
        { name: "Quản trị kỹ thuật chuyên sâu", days: [1330, 1330] as [number, number] },
      ],
    },
    {
      // Track 2 had no macro stage at all, yet eleven finished CFA Economics
      // lessons existed - reachable only from the CFA cross-reference page,
      // never from the curriculum itself. They carried track: "bonus", which
      // DashboardClient filters out of professional stages, so putting them
      // here also required flipping that field in lib/lessons.ts.
      label: "Chặng 17",
      name: "Hệ điều hành cho người làm công nghệ",
      days: [1321, 1326] as [number, number],
      extraLessonIds: [1224, 1225, 1226, 1227, 1228, 1258],
      available: true,
      isNew: true,
      parts: [
        {
          name: "Tiến trình: lập lịch, bộ nhớ và cấu trúc tập tin",
          days: [1321, 1322] as [number, number],
          extraLessonIds: [1228],
        },
        {
          name: "Hệ thống: tải, mở rộng, chu kỳ phát hành và chính sách vận hành",
          days: [1323, 1325] as [number, number],
          extraLessonIds: [1224, 1225],
        },
        {
          name: "Hệ phân tán và đọc chỉ báo hệ thống",
          days: [1326, 1326] as [number, number],
          extraLessonIds: [1226, 1227, 1258],
        },
      ],
    },
    {
      // The whole Track 2 spine assumes a doanh nghiệp không thuộc mảng tài chính, so it breaks
      // silently on banks - the largest sector on the local market. 1401-1402
      // are new; the rest already existed but were reachable only by learners
      // who happened to pick the credit-analyst or compliance career path.
      label: "Chặng 18",
      name: "Xác thực, phân quyền và tuân thủ",
      days: [1401, 1402] as [number, number],
      extraLessonIds: [1218, 1222, 1248, 1253, 1254, 1256, 1281, 1282, 1283],
      available: true,
      isNew: true,
      parts: [
        { name: "Đọc và rà soát một hệ thống xác thực", days: [1401, 1402] as [number, number] },
        {
          name: "Phân quyền: xét duyệt, phân vai và hạn mức",
          days: [0, 0] as [number, number],
          extraLessonIds: [1218, 1222, 1256],
        },
        {
          name: "Tuân thủ, kiểm soát nội bộ và mô hình sản phẩm mới",
          days: [0, 0] as [number, number],
          extraLessonIds: [1248, 1253, 1254, 1281, 1282, 1283],
        },
      ],
    },
    {
      // Chặng 9 stops at "what is an option". 1411-1414 answer the question
      // every practitioner hits next - where the price comes from and what the
      // position is sensitive to - and 1216/1217/1223 (previously career-path
      // only) are the risk-management half of the same subject.
      label: "Chặng 19",
      name: "Tối ưu hiệu năng và quản trị rủi ro vận hành",
      days: [1411, 1414] as [number, number],
      extraLessonIds: [1216, 1217, 1223],
      available: true,
      isNew: true,
      parts: [
        { name: "Tối ưu sâu: từ hồ sơ CPU đến độ trễ đuôi", days: [1411, 1414] as [number, number] },
        {
          name: "Đo lường và quản trị rủi ro vận hành",
          days: [0, 0] as [number, number],
          extraLessonIds: [1216, 1217, 1223],
        },
      ],
    },
    {
      // Nine finished lessons that no learner following Track 2 in order ever
      // met. Grouped here by what a buy-side analyst actually does end to end:
      // research process, market plumbing, then the asset classes where the
      // standard DCF/multiples toolkit does not apply.
      label: "Chặng 20",
      name: "Nền tảng: quy trình nghiên cứu và thiết kế chuyên sâu",
      days: [0, 0] as [number, number],
      extraLessonIds: [1215, 1219, 1220, 1221, 1245, 1246, 1286, 1288, 1289],
      available: true,
      isNew: true,
      parts: [
        {
          name: "Quy trình nhóm, luận điểm kỹ thuật và chiến lược đo lường",
          days: [0, 0] as [number, number],
          extraLessonIds: [1221, 1245, 1246, 1215],
        },
        {
          name: "Cơ chế nền tảng và công cụ",
          days: [0, 0] as [number, number],
          extraLessonIds: [1288, 1289],
        },
        {
          name: "Tối ưu hệ thống đặc thù: thời gian thực, nhúng, dữ liệu lớn",
          days: [0, 0] as [number, number],
          extraLessonIds: [1219, 1220, 1286],
        },
      ],
    },
    {
      // Same story: eight lessons covering the advisory/insurance side of the
      // industry, previously visible only through two career paths.
      label: "Chặng 21",
      name: "Quản trị dữ liệu và sao lưu",
      days: [0, 0] as [number, number],
      extraLessonIds: [1232, 1233, 1234, 1249, 1255, 1284, 1285, 1287],
      available: true,
      isNew: true,
      parts: [
        {
          name: "Quy trình thiết kế giải pháp cho khách hàng",
          days: [0, 0] as [number, number],
          extraLessonIds: [1249, 1284, 1285, 1287],
        },
        {
          name: "Sao lưu: chiến lược, khôi phục thảm hoạ và quy định",
          days: [0, 0] as [number, number],
          extraLessonIds: [1255, 1232, 1233, 1234],
        },
      ],
    },
    {
      label: "Chặng 22",
      name: "Phương pháp đo lường (Measurement & Benchmarking)",
      days: [1421, 1426] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Phân phối, lấy mẫu và suy diễn thống kê", days: [1421, 1423] as [number, number] },
        { name: "Hồi quy, chuỗi thời gian và kiểm chứng ngoài mẫu", days: [1424, 1426] as [number, number] },
      ],
    },
    {
      // Chặng 15 deliberately teaches modelling judgment in prose and says so.
      // This is the execution half that recruiting actually tests.
      label: "Chặng 23",
      name: "SQL và dữ liệu cho phân tích hệ thống",
      days: [1431, 1436] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Truy vấn, phép nối và dựng báo cáo bằng SQL", days: [1431, 1433] as [number, number] },
        { name: "Kiểm tra, làm sạch dữ liệu và tối ưu truy vấn", days: [1434, 1436] as [number, number] },
      ],
    },
    {
      // Track 2 dạy kế toán và thuế ở mức nguyên lý phổ quát. Hai lỗ hổng bối
      // cảnh: không bài nào nói VAS khác IFRS ở đâu (trong khi doanh nghiệp
      // niêm yết đang chuyển đổi), và tám bài thuế hiện có đều là thuế TNCN
      // của track cá nhân - không bài nào về thuế doanh nghiệp.
      label: "Chặng 24",
      name: "Chuẩn mực mã nguồn và quy định dữ liệu Việt Nam",
      // Dải dừng ở 1448, và nó TỪNG tới 1449.
      //
      // Bài 1449 (IFRS 16) là Bài 9 của chính loạt "Chuẩn mực & Thuế" này. Nó
      // được thêm vào kho mà dải ở đây không nới theo, nên nó tồn tại mà không
      // lộ trình nào dẫn tới - lib/__tests__/track-stage-coverage.test.ts bắt
      // được, nhưng chỉ sau khi lib/lessons-data/ được sinh lại, vì thư mục ấy
      // nằm trong .gitignore và dữ liệu cũ trên máy đã che nó một thời gian.
      //
      // Nới xong thì e7fe9cf gỡ luôn bài đó khỏi nguồn, nên dải phải co lại.
      // Ghi ra đây vì bài học không nằm ở con số mà ở CẶP: dải này và dải
      // `accounting` trong lib/career-competency.ts phải đi cùng nhau theo cả
      // hai chiều. Một bài vào được lộ trình mà không thuộc miền năng lực nào
      // thì học xong không con số nào nhúc nhích; một bài đã bị gỡ mà còn nằm
      // trong dải thì hai tệp trỏ vào chỗ trống. Chiều thứ hai không có bộ
      // kiểm nào - `skill-domain-coverage` chỉ soi phía miền năng lực.
      //
      // Bài 1449 quay lại thì nới lại cả hai.
      days: [1441, 1448] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Quy ước mã, linter và chuyển đổi chuẩn", days: [1441, 1442] as [number, number] },
        { name: "Nghị định 13 và bảo vệ dữ liệu cá nhân", days: [1443, 1445] as [number, number] },
        { name: "Lưu trữ trong nước, kiểm tra và xử phạt", days: [1446, 1448] as [number, number] },
      ],
    },
    {
      label: "Chặng 25",
      name: "Hệ sinh thái công nghệ Việt Nam",
      days: [1451, 1457] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Cơ chế thị trường và vốn đầu tư nước ngoài", days: [1451, 1452] as [number, number] },
        { name: "Sản phẩm nội địa và quản trị công ty công nghệ", days: [1453, 1454] as [number, number] },
        { name: "Cộng đồng, sự kiện và quỹ đầu tư mạo hiểm", days: [1455, 1457] as [number, number] },
      ],
    },
    {
      // Chặng 19 dạy phòng hộ tỷ giá ở mức công cụ và Chặng 17 dạy dòng vốn
      // quốc tế ở mức vĩ mô, nhưng phần nối hai thứ đó - quan hệ ngang giá và
      // hệ quả của chúng lên mô hình định giá - thì chưa có bài nào.
      label: "Chặng 26",
      name: "Hệ thống đa vùng và quốc tế hoá",
      days: [1461, 1464] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Đồng bộ đa vùng: độ trễ và nhất quán", days: [1461, 1462] as [number, number] },
        { name: "Bản địa hoá, múi giờ và rủi ro dữ liệu xuyên biên giới", days: [1463, 1464] as [number, number] },
      ],
    },
    {
      // App đã có bài về phía thương vụ (PE là gì, VC là gì, cap table, LBO).
      // Chặng này bổ sung phía quỹ: tiền của ai, nhà quản lý được trả thế nào,
      // và vì sao hiệu suất quỹ đóng cần bộ chỉ số riêng.
      label: "Chặng 27",
      name: "Nội bộ runtime: cấu trúc và hiệu năng máy ảo",
      days: [1471, 1474] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Cấu trúc runtime và cơ chế cấp phát bộ nhớ", days: [1471, 1472] as [number, number] },
        { name: "Đo hiệu năng và gỡ bỏ điểm nghẽn", days: [1473, 1474] as [number, number] },
      ],
    },
    {
      // Trang /phong-van-ky-thuat có ngân hàng câu hỏi nhưng không có bài học
      // nào dạy phần kỹ năng đứng sau nó.
      label: "Chặng 28",
      name: "Kỹ năng nghề kỹ sư phần mềm",
      days: [1481, 1484] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Viết tài liệu thiết kế và bảo vệ phương án", days: [1481, 1482] as [number, number] },
        { name: "Bài kiểm tra dựng hệ thống và lộ trình nghề", days: [1483, 1484] as [number, number] },
      ],
    },
    {
      // Chặng 23 dừng ở SQL cơ bản vì với một mô hình định giá thì Excel vẫn
      // là công cụ đúng. Hai chặng này là phần công việc còn lại - phần mà
      // bảng tính thành gánh nặng - và là nền cho ba nghề dữ liệu vừa thêm
      // vào lib/career-paths.ts (đã gỡ).
      label: "Chặng 29",
      name: "Công cụ phân tích dữ liệu",
      days: [1491, 1496] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Chuyển từ bảng tính sang code, và làm sạch dữ liệu", days: [1491, 1493] as [number, number] },
        { name: "Trực quan hóa, dashboard và SQL nâng cao", days: [1494, 1496] as [number, number] },
      ],
    },
    {
      // Phần khiến công cụ ở Chặng 29 có ích hay có hại: chọn đo cái gì, đọc
      // con số ra sao, và ở đâu thì một phân tích đúng kỹ thuật vẫn dẫn tới
      // kết luận sai.
      label: "Chặng 30",
      name: "Tư duy phân tích dữ liệu",
      days: [1501, 1506] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Chọn chỉ số, phân tích cohort và thử nghiệm A/B", days: [1501, 1503] as [number, number] },
        { name: "Nhân quả, kể chuyện bằng dữ liệu và đạo đức dữ liệu", days: [1504, 1506] as [number, number] },
      ],
    },
    {
      // Chặng 11 dạy ngân sách, rolling forecast và variance - tức là các sản
      // phẩm đầu ra của FP&A. Chặng này lo phần đứng trước: những con số ấy
      // từ đâu ra, và nó là phần chiếm gần hết thời gian thật của nghề.
      label: "Chặng 31",
      name: "Lập kế hoạch dung lượng và vận hành",
      days: [1511, 1516] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Yếu tố dẫn dắt tải, kế hoạch nhân sự và lịch phát hành 13 tuần", days: [1511, 1513] as [number, number] },
        { name: "Kịch bản tải, phân bổ chi phí hạ tầng và nhịp báo cáo tháng", days: [1514, 1516] as [number, number] },
      ],
    },
    {
      // Chặng 10 dạy vì sao mua, mua ai, trả bằng gì và vì sao hậu sáp nhập
      // hay hỏng. Chặng này lo phần cơ khí ở giữa - và là phần mà bộ câu hỏi
      // phỏng vấn IB hỏi nhiều nhất trong khi chưa có bài học nào dạy nó.
      label: "Chặng 32",
      name: "Cơ chế phát hành và di trú hệ thống",
      days: [1521, 1526] as [number, number],
      // 1049 (danh-gia-deal-dau-tu) là trang viết tay được kéo về corpus:
      // khung đọc một thương vụ mua lại, đúng chủ đề chặng này.
      extraLessonIds: [1049, 1052],
      available: true,
      isNew: true,
      parts: [
        { name: "Phát hành dần, cờ tính năng và phân bổ lưu lượng", days: [1521, 1523] as [number, number] },
        { name: "Gỡ bỏ hệ thống cũ, quy trình di trú và nghĩa vụ bàn giao", days: [1524, 1526] as [number, number] },
      ],
    },
    {
      // Có hai nghề kiểm toán trong lib/career-paths.ts (đã gỡ) và trước chặng này
      // cả kho chỉ có đúng một bài liên quan (1254, khung COSO). Lộ trình của
      // nghề "Kiểm toán viên" gồm năm bài kế toán chung, không bài nào nói
      // kiểm toán làm gì.
      label: "Chặng 33",
      name: "Kiểm thử: cách một bản phát hành được xác nhận",
      days: [1531, 1536] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Kết luận kiểm thử, mức nghiêm trọng và bằng chứng", days: [1531, 1533] as [number, number] },
        { name: "Chọn mẫu, lỗi ẩn và ba tuyến phòng vệ", days: [1534, 1536] as [number, number] },
      ],
    },
    {
      // Lấp 3/10 môn FRM gần như trống trơn trên /frm (xem lib/frm-track.ts):
      // Foundations of Risk Management, Operational Resilience, và Liquidity
      // and Treasury Risk. Ids 1531-1536 đã bị lib/audit-lessons.ts (Chặng
      // 33) chiếm trước trong cùng một đợt commit song song, nên chặng này
      // nhảy cóc qua đoạn đó - xem extraLessonIds.
      label: "Chặng 34",
      name: "SRE: Nền tảng, rủi ro vận hành & rủi ro dung lượng",
      days: [1527, 1530] as [number, number],
      extraLessonIds: [1537, 1538, 1539, 1540, 1541],
      available: true,
      isNew: true,
      parts: [
        { name: "Foundations of Reliability: quản trị rủi ro, văn hoá không đổ lỗi, sự cố kinh điển", days: [1527, 1529] as [number, number] },
        { name: "Operational Resilience: dữ liệu sự cố, BCP/DR, rủi ro mô hình & bên thứ ba", days: [1530, 1530] as [number, number], extraLessonIds: [1537, 1538] },
        { name: "Capacity and Resource Risk: hạn mức, kế hoạch dung lượng, tự mở rộng", days: [1539, 1541] as [number, number] },
      ],
    },
    {
      // Market Risk chiếm 20% FRM Part II nhưng chỉ có 5 bài mượn từ nơi khác
      // (VaR nhập môn, duration, Greeks, implied vol). Phần lõi định lượng mà
      // GARP kiểm tra - so sánh phương pháp VaR, kiểm định hậu nghiệm, ES,
      // mô hình biến động, copula, stress testing - không có bài nào.
      label: "Chặng 35",
      name: "SRE: Rủi ro hiệu năng",
      days: [1551, 1556] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Đo độ trễ đuôi, kiểm định hậu nghiệm và p99", days: [1551, 1553] as [number, number] },
        { name: "Mô hình biến động tải, phụ thuộc dịch vụ và kiểm thử chịu tải", days: [1554, 1556] as [number, number] },
      ],
    },
    {
      // Lấp phần rủi ro tín dụng nâng cao (CDS, chứng khoán hoá/CDO, CVA,
      // sovereign credit risk) và các chủ đề Current Issues còn thiếu của
      // FRM Part II. Xem lib/frm-track.ts's credit-risk/current-issues
      // subjects.
      label: "Chặng 36",
      name: "SRE: Bảo mật nâng cao & Vấn đề thời sự",
      days: [1557, 1563] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Chuỗi cung ứng phần mềm, ký số và rủi ro phụ thuộc bên thứ ba", days: [1557, 1559] as [number, number] },
        { name: "Shadow IT, rủi ro liên kết hệ thống và tài sản số", days: [1560, 1561] as [number, number] },
        { name: "Rủi ro nhà cung cấp độc quyền và khoá nền tảng", days: [1562, 1563] as [number, number] },
      ],
    },
    {
      // Bốn môn FRM mỏng nhất so với tỷ trọng đề thi sau các đợt trước (xem
      // lib/frm-track.ts): Foundations và Operational Resilience mỗi môn 4
      // bài trên tỷ trọng 20%, Liquidity and Treasury 4 bài trên 15%, và
      // Quantitative Analysis 6 bài trên 20%.
      label: "Chặng 37",
      name: "SRE: Nền tảng, vận hành, dung lượng & đo lường nâng cao",
      days: [1613, 1636] as [number, number],
      // 1650-1654 nằm ngoài dải liên tục vì dải 1637-1648 đã thuộc Chặng 38.
      // Không có chúng ở đây thì năm bài đó tồn tại, sinh ra file, lên trang
      // FRM - và không chặng nào dẫn tới, đúng lỗi mà Chặng 12 từng mắc.
      extraLessonIds: [1650, 1651, 1652, 1653, 1654, 1655, 1656, 1657, 1658, 1659, 1660, 1661, 1662, 1663, 1664, 1665, 1666, 1667, 1668, 1669, 1670, 1671, 1672],
      available: true,
      isNew: true,
      parts: [
        { name: "Foundations: phân loại sự cố, ngưỡng & hạn mức, đo hiệu quả, SLO, đạo đức, quản trị dữ liệu", days: [1613, 1618] as [number, number] },
        {
          name: "Foundations nâng cao: chi phí trên mỗi request & ngân sách hạ tầng, quản trị cấp lãnh đạo, bốn lựa chọn với rủi ro, rủi ro hệ thống, uy tín & chiến lược",
          days: [0, 0] as [number, number],
          extraLessonIds: [1650, 1651, 1652, 1653, 1654],
        },
        {
          name: "Operational nâng cao: phân tích kịch bản, dữ liệu sự cố bên ngoài, rủi ro thay đổi, dịch vụ trọng yếu, rủi ro con người",
          days: [0, 0] as [number, number],
          extraLessonIds: [1655, 1656, 1657, 1658, 1659],
        },
        {
          name: "Hiệu năng nâng cao: đo tải chuẩn, độ nhạy theo tài nguyên, ánh xạ nhân tố nghẽn, phân rã chi phí giữa các dịch vụ",
          days: [0, 0] as [number, number],
          extraLessonIds: [1660, 1661, 1662, 1663],
        },
        {
          name: "San nốt bốn phần: đo lường nâng cao, rủi ro phụ thuộc và tập trung, dung lượng theo giờ và bộ đệm, quy kết hiệu năng và rủi ro nền tảng",
          days: [0, 0] as [number, number],
          extraLessonIds: [1664, 1665, 1666, 1667, 1668, 1669, 1670, 1671, 1672],
        },
        { name: "Operational Resilience: phân loại sự cố, tự đánh giá & KRI, an ninh mạng, gian lận, dự phòng tài nguyên, rủi ro hành vi", days: [1619, 1624] as [number, number] },
        { name: "Capacity and Resources: hai loại dung lượng, thang tải, phân bổ chi phí, kiểm thử chịu tải, tài nguyên dự trữ, tự mở rộng", days: [1625, 1630] as [number, number] },
        { name: "Quantitative Analysis: Bayes, MLE, Monte Carlo, bootstrapping, EVT, PCA", days: [1631, 1636] as [number, number] },
      ],
    },
    {
      // Hai môn còn lại của FRM: Valuation and Risk Models (30% Part I, tỷ
      // trọng lớn nhất của cả phần, trước đợt này không có bài viết riêng
      // nào) và Current Issues.
      label: "Chặng 38",
      name: "SRE: Đo lường, mô hình rủi ro & vấn đề thời sự",
      days: [1637, 1648] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Measurement and Risk Models: đường cơ sở, cây quyết định, mô hình hàng đợi, độ nhạy, chi phí biên, xếp hạng dịch vụ", days: [1637, 1642] as [number, number] },
        { name: "Current Issues: AI/ML, điện năng trung tâm dữ liệu, hậu monolith, hạ tầng chủ quyền, tập trung đám mây, các sự cố diện rộng gần đây", days: [1643, 1648] as [number, number] },
      ],
    },
    {
      // Nghề "Kỹ sư sản phẩm thanh toán" trong lib/career-paths.ts (đã gỡ)
      // là nghề duy nhất trong 44 nghề mà kho bài học thực sự mỏng - quét cả
      // 689 bài chỉ ra vài bài chung chung để nối vào, trong khi mọi nghề khác
      // đều đã có bài đúng chủ đề nằm rải rác. Chặng này lấp chỗ đó, và cố ý
      // không dạy công nghệ: người làm tài chính sản phẩm không viết code, họ
      // trả lời câu sản phẩm này kiếm tiền ở đâu và mỗi khách lãi hay lỗ.
      label: "Chặng 39",
      name: "Sản phẩm thanh toán và ví điện tử",
      days: [1701, 1706] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Doanh thu và đơn vị kinh tế: take rate, CAC/LTV, số dư ví", days: [1701, 1703] as [number, number] },
        { name: "Phần mất đi và đường tới hoà vốn: lỗi giao dịch, gian lận, chi phí hạ tầng", days: [1704, 1706] as [number, number] },
      ],
    },
    {
      // Quét kho theo từng kỹ năng mà nghề "Chuyên viên Quan hệ Cổ đông" tự
      // khai - soạn thông cáo, gặp nhà đầu tư, xử lý câu hỏi khó - cho ra 0
      // bài. Nghề này trước đó học ghép từ các bài tài chính doanh nghiệp
      // chung, tức là học được phần hiểu số mà không học phần chính: đứng
      // trước người khác và chịu trách nhiệm về những con số đó.
      label: "Chặng 40",
      name: "Quan hệ nhà phát triển (DevRel)",
      days: [1711, 1715] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Nghề DevRel và nghĩa vụ công bố thay đổi", days: [1711, 1712] as [number, number] },
        { name: "Lộ trình sản phẩm, gặp gỡ cộng đồng và xử lý sự cố công khai", days: [1713, 1715] as [number, number] },
      ],
    },
    {
      // Kho có rất nhiều bài dạy ĐỌC báo cáo tài chính và không bài nào dạy
      // báo cáo đó được LẬP ra thế nào - quét bút toán, sổ cái, hạch toán ra
      // 0 bài. Ảnh hưởng xa hơn nghề kế toán: người phân tích chưa từng thấy
      // hai vế của một định khoản sẽ không giải thích được vì sao lãi tăng mà
      // tiền không tăng.
      label: "Chặng 41",
      name: "Nhật ký hệ thống và sổ sự kiện",
      days: [1721, 1725] as [number, number],
      // 1050 (credit-debit-phan-2) là trang viết tay được kéo về corpus. Nó là
      // phần ÁP DỤNG của bài 1721 (Ghi sổ kép) chứ không dạy lại quy tắc, nên
      // thuộc đúng chặng này dù id nằm ngoài dải 1721-1725.
      extraLessonIds: [1050],
      available: true,
      isNew: true,
      parts: [
        { name: "Ghi log có cấu trúc và đường đi từ sự kiện tới dashboard", days: [1721, 1722] as [number, number] },
        { name: "Xoay vòng log, đối chiếu và lưu trữ dài hạn", days: [1723, 1725] as [number, number] },
      ],
    },
    {
      // Kho đã có phía ĐỊNH GIÁ bất động sản - cap rate, FFO, định giá tài sản
      // - nhưng quét pháp lý đất đai, dòng tiền dự án, cấu trúc vốn dự án ra 0
      // bài. Người học biết định giá một toà nhà đã xây xong và không biết gì
      // về quãng đường từ mảnh đất tới toà nhà đó, trong khi phần lớn tiền của
      // ngành được kiếm và mất ở chính quãng ấy.
      label: "Chặng 42",
      name: "Dự án hạ tầng và trung tâm dữ liệu",
      days: [1731, 1735] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Pháp lý, chi phí đầu tư ban đầu và cấu trúc dự án hạ tầng", days: [1731, 1733] as [number, number] },
        { name: "Tài nguyên thuê ngoài và rủi ro dự án", days: [1734, 1735] as [number, number] },
      ],
    },
    {
      // Nghề định phí bảo hiểm khai xác suất thống kê nâng cao, mô hình định
      // phí, dự phòng. Kho có ba bài ở mức giới thiệu và 0 bài về bảng tỷ lệ
      // tử vong, dự phòng nghiệp vụ hay tái bảo hiểm - nghề này đọc được mô tả
      // công việc của mình mà không học được một phép tính nào của nó.
      label: "Chặng 43",
      name: "Định mức tài nguyên và chi phí đám mây",
      days: [1741, 1745] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Định mức, tài nguyên dự phòng và hạ tầng dự phòng chéo", days: [1741, 1743] as [number, number] },
        { name: "Bất cân xứng thông tin và biên lợi nhuận nhà cung cấp đám mây", days: [1744, 1745] as [number, number] },
      ],
    },
  ] satisfies Stage[],
};
/* i18n-ignore-end */

// A professional stage only renders on the dashboard if some branch lists its
// label (DashboardClient filters track.stages by the active branch), so every
// stage added above must appear in exactly one branch here or it is invisible
// to learners - which is what had silently happened to Chặng 14, 15 and 16.
/* i18n-ignore-start: `label` và `subtitle` đã có lớp phủ trong
   lib/i18n/dictionaries/sections/track-stages.ts, còn `stageLabels` thì KHÔNG
   PHẢI chữ hiển thị - chúng so khớp với `stage.label` để lọc chặng theo nhánh
   nghề. Dịch chúng sang "Stage 1" thì bộ lọc không khớp gì và mọi nhánh rỗng:
   không lỗi, không cảnh báo, chỉ là một dashboard trống.
   lib/__tests__/track-stages-i18n.test.ts giữ cả ba: bản Việt khớp từng chữ,
   bản Anh không còn dấu, và mọi `stageLabels` trỏ tới chặng có thật. */
export const PROFESSIONAL_BRANCHES = [
  {
    id: "corporate",
    label: "Kiến trúc dịch vụ",
    subtitle: "Ngôn ngữ, kiến trúc dịch vụ, API, vận hành & dựng hệ thống",
    emoji: "🏢",
    stageLabels: ["Chặng 1", "Chặng 2", "Chặng 3", "Chặng 4", "Chặng 5", "Chặng 11", "Chặng 15", "Chặng 24", "Chặng 31", "Chặng 33", "Chặng 40", "Chặng 41", "Chặng 42"],
  },
  {
    id: "investment",
    label: "Hệ thống & hiệu năng",
    subtitle: "Mạng, độ tin cậy, hàng đợi, tối ưu, hệ điều hành & quy trình nghiên cứu",
    emoji: "📈",
    stageLabels: [
      "Chặng 6",
      "Chặng 7",
      "Chặng 8",
      "Chặng 9",
      "Chặng 10",
      "Chặng 12",
      "Chặng 14",
      "Chặng 16",
      "Chặng 17",
      "Chặng 19",
      "Chặng 20",
      "Chặng 25",
      "Chặng 26",
      "Chặng 27",
      "Chặng 32",
    ],
  },
  {
    id: "banking",
    label: "Bảo mật, dữ liệu & tư vấn",
    subtitle: "Xác thực, phân quyền, tuân thủ, quản trị dữ liệu & sao lưu",
    emoji: "🏦",
    stageLabels: ["Chặng 18", "Chặng 21", "Chặng 34", "Chặng 35", "Chặng 36", "Chặng 37", "Chặng 38", "Chặng 39", "Chặng 43"],
  },
  {
    id: "quant",
    label: "Đo lường & dữ liệu",
    subtitle: "Thống kê, hồi quy, chuỗi thời gian, SQL và benchmark cho phân tích",
    emoji: "📊",
    stageLabels: ["Chặng 22", "Chặng 23"],
  },
  {
    // Tách khỏi nhánh "quant" thay vì nối thêm vào đó: nhánh kia phục vụ
    // người làm phân tích tài chính cần công cụ định lượng, còn nhánh này là
    // lộ trình của ba nghề dữ liệu (data-analyst, bi-analyst, data-engineer)
    // trong lib/career-paths.ts (đã gỡ) - cùng dùng SQL nhưng đích đến khác nhau.
    id: "data",
    label: "Phân tích dữ liệu",
    subtitle: "Python, làm sạch dữ liệu, dashboard, chọn chỉ số, thử nghiệm A/B và đạo đức dữ liệu",
    emoji: "🧮",
    stageLabels: ["Chặng 29", "Chặng 30"],
  },
  {
    id: "craft",
    label: "Kỹ năng nghề",
    subtitle: "Viết tài liệu, bảo vệ thiết kế, bài kiểm tra dựng hệ thống và lộ trình nghề nghiệp",
    emoji: "💼",
    stageLabels: ["Chặng 28"],
  },
  {
    id: "ai",
    label: "AI trong sản phẩm",
    subtitle: "Dùng ChatGPT/Claude để đọc mã, rà lỗi và viết tài liệu",
    emoji: "🤖",
    stageLabels: ["Chặng 13"],
  },
] as const;

/* i18n-ignore-end */

export type ProfessionalBranchId = (typeof PROFESSIONAL_BRANCHES)[number]["id"];

/**
 * Whether a lesson id falls within a track's day ranges. Most lessons don't
 * carry an explicit `track` field on the Lesson object - track membership is
 * determined by which stage's day range the id falls into (mirrors the
 * dashboard's own stage-matching logic). An explicit `track` field, when
 * present, still takes priority and is checked by the caller first.
 */
export function isLessonIdInTrack(id: number, track: "personal" | "professional"): boolean {
  const stages = track === "personal" ? TRACK_PERSONAL.stages : TRACK_PROFESSIONAL.stages;
  return stages.some((stage) => isLessonInRange(id, stage));
}

type TrackLessonLike = {
  id: number;
  track?: "personal" | "professional" | "bonus";
};

/**
 * The single rule for "does this lesson belong to this track": an explicit
 * `track` field wins, otherwise membership is derived from the stage day
 * ranges. Most lessons carry no `track` (42% of them), so anything that
 * compares `lesson.track === track` directly silently drops the majority of
 * the curriculum - which is exactly what lib/lessons-loader's
 * getLessonsByTrack used to do.
 */
export function lessonBelongsToTrack(
  lesson: TrackLessonLike,
  track: "personal" | "professional"
): boolean {
  return isExplicitlyInTrack(lesson, track);
}

function isExplicitlyInTrack(lesson: TrackLessonLike, track: "personal" | "professional"): boolean {
  if (lesson.track === "bonus") return false;
  if (lesson.track) return lesson.track === track;
  return isLessonIdInTrack(lesson.id, track);
}

// Dashboard sections render in stage/part order, not raw numeric id order.
// Personal Chặng 0 lives at ids 263-268 but is intentionally the FIRST
// thing a learner should do; sorting by id makes resume logic jump to Day 1
// first and makes the app talk as if Chặng 0 were "after" 262 earlier days.
export function orderLessonsForTrack<T extends TrackLessonLike>(
  lessons: T[],
  track: "personal" | "professional"
): T[] {
  const stages = track === "personal" ? TRACK_PERSONAL.stages : TRACK_PROFESSIONAL.stages;
  const trackLessons = lessons.filter((lesson) => isExplicitlyInTrack(lesson, track));
  const byId = new Map(trackLessons.map((lesson) => [lesson.id, lesson]));
  const ordered: T[] = [];
  const seen = new Set<number>();

  const pushLessonsInRange = (range: { days: [number, number]; extraLessonIds?: number[] }) => {
    const partLessons = trackLessons
      .filter((lesson) => !seen.has(lesson.id) && isLessonInRange(lesson.id, range))
      .sort((a, b) => a.id - b.id);

    for (const lesson of partLessons) {
      seen.add(lesson.id);
      ordered.push(lesson);
    }
  };

  for (const stage of stages) {
    for (const part of stage.parts) {
      pushLessonsInRange(part);
    }

    const stageExtraLessonIds = (stage as Stage).extraLessonIds;
    if (stageExtraLessonIds) {
      for (const lessonId of stageExtraLessonIds) {
        const lesson = byId.get(lessonId);
        if (lesson && !seen.has(lesson.id)) {
          seen.add(lesson.id);
          ordered.push(lesson);
        }
      }
    }
  }

  const leftovers = trackLessons
    .filter((lesson) => !seen.has(lesson.id))
    .sort((a, b) => a.id - b.id);

  return [...ordered, ...leftovers];
}
