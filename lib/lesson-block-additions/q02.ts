import type { LessonSectionBlock } from "../lesson-types";

// Khối `sim` đợt hai - nhiệm vụ mới của trình mô phỏng. Một người viết cho một tệp.
export const Q02_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "bo-cuc-voi-flexbox": [
    {
      type: "sim",
      tool: "editor",
      mission: "flex-center",
      title: "Căn giữa khối chữ bằng Flexbox",
      task: "Bài vừa cho thấy Flexbox căn hàng và cột bằng vài thuộc tính. Mở style.css trong trình soạn thảo, thêm vào quy tắc body các thuộc tính display: flex, justify-content, align-items cùng min-height: 100vh để khối giới thiệu nằm chính giữa trang cả chiều ngang lẫn chiều dọc, rồi bấm Chạy để xem kết quả.",
    },
  ],
  "ba-loi-bo-cuc-hay-gap": [
    {
      type: "sim",
      tool: "editor",
      mission: "flex-center",
      title: "Sửa khối dính mép bằng căn giữa Flexbox",
      task: "Trong bài, nhiều lỗi bố cục đến từ việc đặt chỗ cho phần tử bằng mẹo thay vì bằng bố cục. Ở đây khối chữ đang dính sát góc trên bên trái. Sửa style.css để quy tắc body dùng display: flex và căn giữa theo cả hai chiều (nhớ đặt min-height để có chiều cao mà căn), rồi Chạy để kiểm tra.",
    },
  ],
  "responsive-mot-trang-cho-moi-man-hinh": [
    {
      type: "sim",
      tool: "editor",
      mission: "viewport-media",
      title: "Khai báo khung nhìn và quy tắc cho màn hình hẹp",
      task: "Một trang responsive cần hai thứ bài vừa nhắc: thẻ meta viewport và truy vấn @media theo chiều rộng. Thêm thẻ meta viewport vào phần head của index.html, thêm một khối @media (max-width: 600px) trong style.css đổi cỡ chữ hoặc lề của một phần tử có thật, rồi bấm Chạy.",
    },
  ],
  "the-ngu-nghia-va-cay-tai-lieu": [
    {
      type: "sim",
      tool: "editor",
      mission: "semantic-tags",
      title: "Bọc trang bằng header, main và footer",
      task: "Bài này nói thẻ ngữ nghĩa cho trình duyệt và trình đọc màn hình biết vai trò từng vùng của trang. Sửa index.html: đặt tiêu đề h1 cùng nội dung chính trong main, thêm header ở đầu và footer có một dòng bản quyền, cả hai nằm ngoài main. Bấm Chạy để xác nhận trang vẫn hiện đúng.",
    },
  ],
  "kha-nang-truy-cap-co-ban": [
    {
      type: "sim",
      tool: "editor",
      mission: "semantic-tags",
      title: "Cho trình đọc màn hình biết các vùng của trang",
      task: "Người dùng trình đọc màn hình nhảy qua các vùng đầu trang, nội dung chính và chân trang nhờ thẻ ngữ nghĩa. Mở index.html và bọc nội dung bằng header, main, footer đúng chỗ (h1 nằm trong main, header và footer ở ngoài main), rồi Chạy trang.",
    },
  ],
  "toc-do-tai-trang": [
    {
      type: "sim",
      tool: "editor",
      mission: "img-alt-lazy",
      title: "Thêm ảnh tải lười, không làm giật trang",
      task: "Ảnh là thủ phạm quen thuộc làm trang chậm và giật. Thêm vào index.html một thẻ img có src, alt mô tả thật, loading=\"lazy\" cùng width và height để trình duyệt chừa sẵn chỗ khi ảnh về. Bấm Chạy và xem console không báo thiếu tệp.",
    },
  ],
  "hinh-anh-that-nhe-va-co-chu-thich": [
    {
      type: "sim",
      tool: "editor",
      mission: "img-alt-lazy",
      title: "Đặt ảnh sản phẩm có mô tả vào trang",
      task: "Bài dạy viết câu mô tả cho người không nhìn thấy ảnh và giữ trang nhẹ. Hãy áp vào một trang thật: thêm thẻ img vào index.html với alt viết như lời kể ngắn, loading=\"lazy\", width và height. Chạy trang để chắc ảnh không gây lỗi.",
    },
  ],
  "bieu-mau-dung-duoc": [
    {
      type: "sim",
      tool: "editor",
      mission: "labeled-form",
      title: "Dựng biểu mẫu liên hệ có nhãn đúng",
      task: "Một biểu mẫu dùng được bắt đầu từ việc mỗi ô có nhãn. Trong index.html, dựng form liên hệ có ô email, gắn label bằng for trùng id của ô (hoặc bọc ô trong label) và thêm nút gửi. Chạy trang để xem biểu mẫu hiện đủ.",
    },
  ],
  "bo-cuc-voi-luoi-css": [
    {
      type: "sim",
      tool: "editor",
      mission: "css-grid-cards",
      title: "Xếp ba thẻ sản phẩm thành lưới",
      task: "Lưới CSS chia vùng chứa thành cột đều nhau mà không cần tính toán thủ công. Thêm vào index.html ít nhất ba thẻ sản phẩm trong một vùng chứa, rồi trong style.css đặt cho vùng chứa đó display: grid, grid-template-columns từ hai cột trở lên và gap. Bấm Chạy để xem lưới.",
    },
  ],
  "dung-mot-trang-tinh-hoan-chinh": [
    {
      type: "sim",
      tool: "editor",
      mission: "css-grid-cards",
      title: "Thêm lưới thẻ sản phẩm vào trang tĩnh",
      task: "Một trang tĩnh hoàn chỉnh thường có phần danh sách sản phẩm. Dựng phần đó: một vùng chứa có ít nhất ba thẻ con trong index.html, và quy tắc display: grid với nhiều cột cùng gap trong style.css. Chạy trang để kiểm tra các thẻ xếp đều.",
    },
  ],
  "cay-tai-lieu-tim-va-doc-phan-tu": [
    {
      type: "sim",
      tool: "editor",
      mission: "dom-add-item",
      title: "Thêm mục vào danh sách bằng JavaScript",
      task: "Bài đã cho thấy cách tìm phần tử trong cây tài liệu. Giờ sửa nó: index.html có một nút và một danh sách, script.js bắt sự kiện click của nút rồi tạo phần tử li mới thêm vào danh sách. Chạy trang, bấm nút vài lần và xem danh sách dài ra.",
    },
  ],
  "dung-mot-ung-dung-nho": [
    {
      type: "sim",
      tool: "editor",
      mission: "dom-add-item",
      title: "Viết chức năng thêm việc vào danh sách",
      task: "Ứng dụng nhỏ nào cũng có một chức năng thêm mục. Làm phần cốt lõi của nó: index.html có nút và danh sách, script.js lắng nghe click rồi tạo và gắn phần tử mới vào danh sách. Bấm Chạy, bấm nút trên trang và kiểm tra mục xuất hiện.",
    },
  ],
  "su-kien-va-cach-chung-lan-truyen": [
    {
      type: "sim",
      tool: "editor",
      mission: "event-delegation",
      title: "Gắn một bộ nghe cho cả danh sách",
      task: "Sự kiện nổi bọt lên phần tử cha, nên một bộ nghe ở cha nhận được click của mọi con. Tạo danh sách từ ba mục trở lên trong index.html, trong script.js chỉ dùng một addEventListener gắn lên danh sách và đọc event.target để gạch ngang mục vừa bấm. Chạy trang rồi bấm thử từng mục.",
    },
  ],
  "bieu-mau-va-du-lieu-nguoi-dung": [
    {
      type: "sim",
      tool: "editor",
      mission: "form-validate",
      title: "Báo lỗi khi gửi biểu mẫu để trống",
      task: "Bài nói dữ liệu người dùng phải được kiểm tra trước khi dùng. Dựng biểu mẫu có ô email, nút gửi và một ô thông báo có id=\"error\". Trong script.js bắt sự kiện submit, gọi preventDefault và hiện lời nhắc khi ô còn trống. Chạy trang, bấm Gửi và xem thông báo.",
    },
  ],
  "javascript-chay-o-dau": [
    {
      type: "sim",
      tool: "editor",
      mission: "defer-script",
      title: "Nạp script từ head mà không chặn trang",
      task: "Trình duyệt dừng dựng trang khi gặp script thường, nên vị trí và cách nạp script quan trọng. Đưa thẻ script lên head của index.html, thêm thuộc tính defer, sửa lỗi gõ sai trong script.js nếu có, rồi Chạy để thấy console sạch lỗi và có dòng log.",
    },
  ],
  "to-chuc-ma-va-mo-dun": [
    {
      type: "sim",
      tool: "editor",
      mission: "move-files",
      title: "Gọn dự án vào thư mục css và js",
      task: "Tổ chức mã bắt đầu từ việc đặt tệp đúng chỗ. Chuyển style.css vào thư mục css và script.js vào thư mục js, rồi cập nhật đường dẫn trong index.html cho khớp, vì đổi tên tệp không tự sửa liên kết. Chạy trang để chắc không báo thiếu tệp và script vẫn chạy.",
    },
  ],
  "luu-du-lieu-tren-trinh-duyet": [
    {
      type: "sim",
      tool: "editor",
      mission: "local-storage",
      title: "Nhớ tên khách sau khi tải lại trang",
      task: "localStorage giữ dữ liệu qua các lần tải lại. Trong index.html thêm ô nhập và nút, trong script.js dùng setItem khi bấm nút và getItem khi trang tải để hiện lời chào kèm tên. Bấm Chạy, nhập tên, rồi Chạy lại để xem lời chào vẫn còn.",
    },
  ],
  "goi-dich-vu-tren-mang": [
    {
      type: "sim",
      tool: "editor",
      mission: "fetch-error",
      title: "Tải dữ liệu mà không để lỗi 500 làm hỏng trang",
      task: "Bài nhắc rằng fetch chỉ ném lỗi khi mạng hỏng, còn lỗi 500 vẫn là một phản hồi. Trong script.js gọi fetch tới https://api.example.com/products để hiện tên sản phẩm, rồi gọi /orders, kiểm tra res.ok và hiện thông báo trong phần tử có id=\"notice\". Chạy trang, console không được có lỗi đỏ.",
    },
  ],
  "xu-ly-loi-khi-goi-dich-vu-ngoai": [
    {
      type: "sim",
      tool: "editor",
      mission: "fetch-error",
      title: "Giữ trang sống khi dịch vụ ngoài trả lỗi",
      task: "Khi dịch vụ ngoài hỏng, phần thiết yếu của sản phẩm vẫn phải chạy. Làm điều đó trong trang mẫu: lấy danh sách từ /products và hiện ra, còn lỗi 500 của /orders thì kiểm tra bằng res.ok và báo trong phần tử id=\"notice\" thay vì để trang hỏng hay im lặng.",
    },
  ],
};
