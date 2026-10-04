import type { LessonSectionBlock } from "../lesson-types";

// Khối `sim` đợt hai - nhiệm vụ mới của trình mô phỏng. Một người viết cho một tệp.
export const Q05_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "ma-hoa-du-lieu-nam-yen": [
    {
      type: "sim",
      tool: "cloud",
      mission: "bucket-block-public",
      title: "Khoá kho tài liệu nội bộ khỏi Internet",
      task: "Bài vừa nói mã hoá chỉ là một lớp, còn câu hỏi đầu tiên là ai mở được dữ liệu. Trong trình mô phỏng đám mây, hãy tạo một kho lưu trữ, tải một tệp hoá đơn lên, rồi bật Chặn truy cập công khai cho kho đó. Giữ nguyên chế độ không phục vụ website để tệp không thể bị mở từ bên ngoài.",
    },
  ],
  "kiem-tra-tai-khoan-quan-tri-co-bat-hai-lop-chua": [
    {
      type: "sim",
      tool: "cloud",
      mission: "iam-mfa",
      title: "Tạo tài khoản mới đúng chuẩn ngay từ đầu",
      task: "Rà tài khoản cũ là việc dọn dẹp, còn tạo tài khoản mới đúng cách thì tránh được việc phải dọn. Trong mục Danh tính của trình mô phỏng, hãy tạo một người dùng cho nhân viên mới, bật xác thực hai lớp cho tài khoản đó và không gán quyền quản trị toàn bộ.",
    },
  ],
  "xac-thuc-hai-lop-vi-sao-biet-mat-khau-van-chua-du": [
    {
      type: "sim",
      tool: "cloud",
      mission: "iam-mfa",
      title: "Bật lớp xác thực thứ hai cho một tài khoản",
      task: "Biết mật khẩu chưa đủ, nên tài khoản trên đám mây nào cũng cần lớp thứ hai. Hãy tạo một người dùng trong mục Danh tính của trình mô phỏng, bật xác thực hai lớp (MFA) cho người đó và kiểm tra rằng tài khoản không mang quyền quản trị toàn bộ.",
    },
  ],
  "quyen-toi-thieu": [
    {
      type: "sim",
      tool: "cloud",
      mission: "iam-least-privilege",
      title: "Cấp cho dịch vụ báo cáo đúng một quyền đọc",
      task: "Bài nói quyền hẹp không làm giảm khả năng bị chiếm, mà giảm hậu quả khi bị chiếm. Hãy làm đúng điều đó: trong mục Danh tính, tạo một vai trò cho dịch vụ báo cáo (không phải người dùng), chỉ gán quyền đọc Kho lưu trữ và không gán thêm quyền nào khác.",
    },
  ],
  "phan-quyen-chi-tiet": [
    {
      type: "sim",
      tool: "cloud",
      mission: "iam-least-privilege",
      title: "Một vai trò, một việc: chỉ đọc kho lưu trữ",
      task: "Phân quyền theo vai trò chỉ tốt khi từng vai trò được cắt hẹp tới mức cần. Trong mục Danh tính của trình mô phỏng, hãy tạo một vai trò cho dịch vụ chỉ đọc tệp, chọn quyền chỉ đọc Kho lưu trữ và để trống mọi quyền ghi hay quyền với cơ sở dữ liệu.",
    },
  ],
  "buoi-ra-soat-hang-nam": [
    {
      type: "sim",
      tool: "cloud",
      mission: "budget-alert",
      title: "Đặt ngưỡng cảnh báo hoá đơn cho đúng quy mô",
      task: "Ngưỡng cảnh báo cũ là loại sai lệch không phát ra tín hiệu nào, nên mỗi lần rà soát phải đặt lại. Trong mục Ngân sách và thẻ, hãy đặt ngân sách 500000 mỗi tháng, chọn một ngưỡng cảnh báo sớm từ 80% trở xuống và thêm ngưỡng 100% rồi lưu.",
    },
  ],
  "chi-phi-nam-thang-cua-mot-san-pham-nho-doc-hoa-don-the-nao": [
    {
      type: "sim",
      tool: "cloud",
      mission: "budget-alert",
      title: "Đặt hạn mức để lần sau không bị bất ngờ",
      task: "Đọc hoá đơn xong thì phải đặt cảnh báo, để lần sau bạn biết trước chứ không phải biết sau. Trong mục Ngân sách và thẻ của trình mô phỏng, hãy đặt ngân sách 500000 mỗi tháng với một ngưỡng cảnh báo sớm (ví dụ 50 hoặc 80) và một ngưỡng 100%, rồi lưu.",
    },
  ],
  "sao-luu-va-khoi-phuc": [
    {
      type: "sim",
      tool: "cloud",
      mission: "db-snapshot",
      title: "Chụp ảnh cơ sở dữ liệu làm điểm quay lại",
      task: "Một bản sao lưu chỉ có giá trị nếu lấy lúc dữ liệu còn nguyên. Hãy tạo một cơ sở dữ liệu trong trình mô phỏng, chờ nó chuyển sang Sẵn sàng, rồi vào mục Ổ đĩa và sao lưu để chụp một ảnh. Đó là điểm quay lại trước mọi thay đổi rủi ro.",
    },
  ],
  "ba-tang-dich-vu-dam-may": [
    {
      type: "sim",
      tool: "cloud",
      mission: "db-snapshot",
      title: "Xem dịch vụ cơ sở dữ liệu quản lý sẵn lo sao lưu ra sao",
      task: "Bài khuyên giao cơ sở dữ liệu cho dịch vụ quản lý sẵn, vì sao lưu là việc dễ làm sai. Hãy tạo một cơ sở dữ liệu trong trình mô phỏng, chờ nó Sẵn sàng và chụp một ảnh ở mục Ổ đĩa và sao lưu để thấy việc đó chỉ còn là một thao tác.",
    },
  ],
  "sao-luu-chua-khoi-phuc-thu-thi-chua-phai-sao-luu-cua-ban": [
    {
      type: "sim",
      tool: "cloud",
      mission: "db-restore",
      title: "Khôi phục thử sau một lần xoá nhầm",
      task: "Sao lưu thành công mỗi đêm chưa chứng minh được gì cho tới khi bạn khôi phục thử. Trong trình mô phỏng, hãy chụp ảnh cơ sở dữ liệu khi dữ liệu còn nguyên, bấm giả lập sự cố, khôi phục từ ảnh thành một cơ sở dữ liệu mới, chờ nó Sẵn sàng rồi xoá bản hỏng.",
    },
  ],
  "xu-ly-su-co": [
    {
      type: "sim",
      tool: "cloud",
      mission: "db-restore",
      title: "Khôi phục trước, tìm nguyên nhân sau",
      task: "Trong sự cố mất dữ liệu, việc gấp là đưa dịch vụ trở lại, chưa phải tìm lỗi. Hãy diễn lại trong trình mô phỏng: chụp ảnh cơ sở dữ liệu trước khi bấm giả lập sự cố, khôi phục ra một cơ sở dữ liệu mới từ ảnh, chờ Sẵn sàng rồi dọn bản hỏng.",
    },
  ],
  "case-chi-phi-va-kien-truc": [
    {
      type: "sim",
      tool: "cloud",
      mission: "cost-tags",
      title: "Gắn nhãn để hoá đơn tổng thành danh sách xếp hạng",
      task: "Bài nói một con số tổng không ai hành động được, còn nhãn theo dịch vụ thì có. Hãy tạo ít nhất hai tài nguyên trong trình mô phỏng (máy, kho hoặc cơ sở dữ liệu), rồi vào Ngân sách và thẻ gắn thẻ team và env cho mọi tài nguyên đang có.",
    },
  ],
  "do-tre-va-khoang-cach-vat-ly": [
    {
      type: "sim",
      tool: "cloud",
      mission: "vm-fit-need",
      title: "Chọn vùng gần người dùng và cỡ máy vừa đủ",
      task: "Bài nói đổi vùng cắt được hàng trăm mili giây, còn nâng máy chỉ cắt được vài chục. Trong trình mô phỏng, đổi vùng sang Hà Nội ở thanh trên cùng trước khi tạo máy, rồi chọn cỡ nhỏ nhất đủ 2 vCPU và 4 GB RAM và cho máy chạy.",
    },
  ],
  "bac-thang-tien-gui": [
    {
      type: "sim",
      tool: "cloud",
      mission: "sg-db-internal",
      title: "Tường lửa cho máy chạy cơ sở dữ liệu",
      task: "Tường lửa mặc định chặn, nên mỗi cổng mở ra phải có lý do. Trong trình mô phỏng, tạo một máy ảo chạy PostgreSQL, thêm luật cổng 5432 với nguồn là Mạng nội bộ và xoá luật SSH đang mở cho Mọi nơi nếu có.",
    },
  ],
  "chon-dich-vu-quan-ly-san-hay-tu-dung": [
    {
      type: "sim",
      tool: "cloud",
      mission: "sg-db-internal",
      title: "Nếu tự dựng cơ sở dữ liệu, phần bảo vệ cũng là của bạn",
      task: "Tự dựng cơ sở dữ liệu nghĩa là bạn nhận cả việc vá lỗi và việc đóng cổng. Hãy thử phần việc đầu trong trình mô phỏng: tạo một máy ảo, mở cổng 5432 chỉ cho Mạng nội bộ và bảo đảm không còn luật nào mở cổng cơ sở dữ liệu hay SSH cho Mọi nơi.",
    },
  ],
  "vung-va-khu-kha-dung": [
    {
      type: "sim",
      tool: "cloud",
      mission: "two-az-lb",
      title: "Hai khu khả dụng sau một bộ cân bằng tải",
      task: "Nhiều khu trong một vùng là điểm cân bằng đúng cho phần lớn dự án. Trong trình mô phỏng, tạo hai máy web trong mạng con riêng, mỗi máy một khu A và B, mở cổng 80 cho Mạng nội bộ, rồi tạo bộ cân bằng tải, thêm cả hai làm đích và thử cắt điện từng khu.",
    },
  ],
  "tu-khoi-phuc-va-suy-giam-nhe-nhang": [
    {
      type: "sim",
      tool: "cloud",
      mission: "two-az-lb",
      title: "Để bộ cân bằng tải tránh bản hỏng",
      task: "Bộ cân bằng tải chỉ đẩy lưu lượng vào những bản còn khoẻ, nên dư một bản ở nơi khác là cách tự khôi phục rẻ nhất. Hãy dựng hai máy web ở hai khu khác nhau, thêm chúng làm đích của một bộ cân bằng tải và cắt điện từng khu để xem dịch vụ vẫn trả lời.",
    },
  ],
  "tong-ket-dam-may-va-ha-tang": [
    {
      type: "sim",
      tool: "cloud",
      mission: "autoscale-spike",
      title: "Trả tiền cho co giãn khi nhu cầu thật sự co giãn",
      task: "Lưu lượng đột biến là lúc tính co giãn đáng tiền. Trong trình mô phỏng, tạo nhóm tự mở rộng tối thiểu 2 máy, tối đa ít nhất 4, ngưỡng thêm máy không quá 70% CPU, rồi bấm Đột biến và chờ nhóm tự thêm máy tới khi CPU hạ xuống dưới ngưỡng.",
    },
  ],
}
