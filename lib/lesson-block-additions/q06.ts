import type { LessonSectionBlock } from "../lesson-types";

// Khối `sim` cho các nhiệm vụ chưa có bài ở đợt hai (git-tag, orphan-volumes, distinct-city,
// date-range, case-price-tier, undelivered-products). Được phép nhúng vào bài đã có bản dịch
// tiếng Anh - khi đó bản dịch phải được chèn khối sim tương ứng.
export const Q06_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "chat-luong-du-lieu": [
    {
      type: "sim",
      tool: "sql",
      mission: "distinct-city",
      title: "Liệt kê giá trị khác nhau của một cột",
      task: "Một trong bốn phép kiểm trên bảng mới nhận là nhìn xem cột có những giá trị nào, mỗi giá trị đúng một lần, để thấy ngay chỗ viết lệch hoặc lạ. Trong bảng khách hàng của trình mô phỏng, viết truy vấn lấy cột thành phố với DISTINCT để mỗi thành phố chỉ hiện một dòng, dù có nhiều khách ở đó.",
    },
  ],
  "ngay-thang-luu-dang-chu-doi-ngay-sang-ngay-that": [
    {
      type: "sim",
      tool: "sql",
      mission: "date-range",
      title: "Lọc đơn trong một tháng khi ngày là chữ",
      task: "Bài này bắt đầu từ việc lọc doanh thu một tháng mà ngày lưu như chữ. Trong cơ sở dữ liệu, ngày viết dạng năm-tháng-ngày vẫn sắp và so sánh đúng thứ tự, nên lọc theo khoảng được. Viết truy vấn lấy mã các đơn đặt từ đầu đến cuối tháng 8 năm 2026 bằng BETWEEN, và để ý đơn đặt đúng ngày mùng 1 không được rơi mất.",
    },
  ],
  "tong-ket-co-so-du-lieu": [
    {
      type: "sim",
      tool: "sql",
      mission: "undelivered-products",
      title: "Tìm sản phẩm chưa từng nằm trong đơn đã giao",
      task: "Bài tổng kết nhắc lỗi im lặng: ghép bảng làm biến mất thực thể không có bản ghi con, và truy vấn vẫn trả về con số trông hợp lý. Ở đây mọi sản phẩm đều từng có trong chi tiết đơn, nên chỉ nhìn một bảng là sai. Viết truy vấn lấy tên các sản phẩm chưa nằm trong đơn nào có trạng thái đã giao, bằng truy vấn con hoặc LEFT JOIN với điều kiện trạng thái đặt đúng chỗ.",
    },
  ],
  // ── Ba nhiệm vụ mà kho CHƯA có bài nào dạy: thêm đoạn dạy ngắn rồi đến khối sim. ──
  "quy-trinh-phat-hanh-va-quay-lai": [
    { type: "heading", text: "Ghim đúng bản đã phát hành bằng thẻ" },
    {
      type: "paragraph",
      text: "Quay lại được hay không còn phụ thuộc vào việc bạn biết CHÍNH XÁC bản nào đang chạy. Tên nhánh thì trôi: main hôm nay không còn là main của tuần trước. Git có sẵn thứ để ghim một mốc cố định, gọi là thẻ (tag). Một thẻ như v1.0.0 là một cái tên trỏ vào đúng một commit và không tự dịch chuyển khi có commit mới.",
    },
    {
      type: "paragraph",
      text: "Khi sự cố xảy ra, bạn không phải lục lịch sử để đoán \"bản trước\" là commit nào: liệt kê các thẻ, rồi chạy lại đúng thẻ gần nhất còn tốt. Lỗi hay gặp là gắn thẻ vào commit đang đứng thay vì commit đã thật sự được kiểm và phát hành, trong khi giữa hai lúc đó đội đã đẩy thêm việc khác lên.",
    },
    {
      type: "list",
      items: [
        "git log --oneline để tìm đúng commit đã phát hành.",
        "git tag v1.0.0 <mã commit> để gắn thẻ vào commit đó. Không ghi mã thì thẻ gắn vào commit hiện tại.",
        "git tag, không kèm tham số, liệt kê các thẻ đang có để xác nhận.",
      ],
    },
    {
      type: "sim",
      tool: "terminal",
      mission: "git-tag",
      title: "Gắn thẻ v1.0.0 vào đúng commit phát hành",
      task: "Trong kho /srv/phat-hanh, bản 1.0 đã được đóng gói ở commit có tên \"Release 1.0: freeze packaging\", nhưng sau đó có thêm một commit thử nghiệm giao diện tối. Dùng git log để tìm commit phát hành, gắn thẻ v1.0.0 vào đúng commit đó chứ không phải commit mới nhất, rồi chạy git tag để kiểm tra.",
    },
  ],
  "chon-dich-vu-quan-ly-san-hay-tu-dung": [
    { type: "heading", text: "Tự dựng thì cũng phải tự dọn" },
    {
      type: "paragraph",
      text: "Một khoản tiền điển hình của đội tự vận hành: xoá máy ảo không có nghĩa là xoá luôn ổ đĩa. Ổ đĩa rời gắn vào máy là một tài nguyên riêng. Tuỳ cấu hình, khi máy bị xoá thì ổ vẫn còn nguyên và vẫn tính tiền theo dung lượng mỗi tháng, trong khi không máy nào dùng nó và không ai nhìn thấy nó trong danh sách máy.",
    },
    {
      type: "paragraph",
      text: "Dịch vụ quản lý sẵn dọn phần này thay bạn. Tự dựng thì câu \"ai xoá cái gì sau đợt thử nghiệm\" là việc của bạn, và nó là loại việc dễ bị bỏ quên nhất vì không có gì hỏng để nhắc bạn nhớ. Hoá đơn là chỗ duy nhất nó lộ ra.",
    },
    {
      type: "list",
      items: [
        "Sau mỗi đợt thử nghiệm, liệt kê ổ đĩa và bản sao lưu không còn gắn vào máy nào.",
        "Gắn thẻ người tạo và dự án lúc tạo tài nguyên, để biết ổ nào của ai mà xoá.",
        "Đặt lịch rà hoá đơn hằng tháng và tìm khoản tiền lưu trữ không có máy đi kèm.",
      ],
    },
    {
      type: "sim",
      tool: "cloud",
      mission: "orphan-volumes",
      title: "Dọn ổ đĩa mồ côi sau khi xoá máy",
      task: "Làm lại tình huống ở trên trong trình mô phỏng: tạo một máy và một ổ đĩa rời, gắn ổ vào máy, rồi xoá máy. Quay lại mục ổ đĩa để thấy ổ vẫn còn và vẫn tính tiền, sau đó xoá ổ mồ côi và xem hoá đơn giảm.",
    },
  ],
  "cham-diem-rui-ro-tu-dong-va-nguong-quyet-dinh": [
    { type: "heading", text: "Ngưỡng cắt viết thành SQL: CASE WHEN" },
    {
      type: "paragraph",
      text: "Khi điểm đã có, bước cuối là xếp từng đối tượng vào một nhóm bằng các ngưỡng. Trong SQL việc đó là CASE WHEN: các điều kiện được duyệt theo thứ tự, điều kiện đúng đầu tiên quyết định nhãn, và ELSE là nhãn cho phần còn lại. Cùng khuôn đó dùng được cho điểm rủi ro, mức giá hay độ tuổi của khoản nợ.",
    },
    {
      type: "list",
      items: [
        "Xếp ngưỡng từ cao xuống thấp. Điều kiện đúng đầu tiên thắng, nên thứ tự quyết định kết quả.",
        "Dùng >= hay > ở đúng ranh giới: một giá trị nằm chính xác trên ngưỡng thuộc nhóm nào phải được viết ra, vì đây là chỗ \"ngưỡng không phải quyết định kỹ thuật\" hiện thành một ký tự.",
        "GROUP BY chính biểu thức CASE (hoặc bí danh của nó) để mỗi nhóm một dòng, rồi COUNT(*) để biết nhóm đông hay thưa.",
      ],
    },
    {
      type: "sim",
      tool: "sql",
      mission: "case-price-tier",
      title: "Chia sản phẩm thành ba nhóm theo ngưỡng giá",
      task: "Thực hành khuôn CASE WHEN trên bảng sản phẩm của trình mô phỏng. Từ 10.000.000 đ trở lên là \"premium\", từ 2.000.000 đến dưới 10.000.000 là \"mid\", còn lại là \"budget\" (đúng các nhãn này). Viết truy vấn trả về mỗi nhóm một dòng kèm số sản phẩm của nhóm.",
    },
  ],
};
