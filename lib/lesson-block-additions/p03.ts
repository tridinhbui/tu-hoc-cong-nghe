import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track personal - đợt 03. Một người viết cho một tệp.
export const P03_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "cong-cu-nha-phat-trien": [
    {
      type: "sim",
      tool: "editor",
      mission: "fix-bug",
      title: "Tìm lỗi bằng bảng điều khiển",
      task: "Bấm Chạy trong trình soạn mã rồi nhìn bảng điều khiển: có một dòng lỗi đỏ báo một tên lệnh không tồn tại. Mở script.js, tìm chỗ gõ nhầm tên lệnh in ra, sửa lại, rồi bấm Chạy lần nữa cho tới khi bảng điều khiển hết lỗi và in ra dòng chữ của trang.",
    },
    {
      type: "flow",
      title: "Điều tra một trang hỏng: mở thẻ nào trước",
      steps: [
        { label: "Thấy triệu chứng", detail: "Nút Mua ngay bấm không có phản ứng gì. Đừng đoán, bấm chuột phải rồi mở công cụ nhà phát triển." },
        { label: "Bảng điều khiển trước tiên", detail: "Nút không phản ứng thì lỗi mã lệnh thường nằm ở đây. Một dòng đỏ ghi tên tệp và số dòng, nghĩa là bạn biết chính xác chỗ cần mở." },
        { label: "Thẻ mạng nếu thiếu ảnh", detail: "Ảnh bìa không hiện thì sắp xếp các yêu cầu theo dung lượng, tìm dòng của ảnh và nhìn mã trạng thái. Một dòng đỏ 404 nghĩa là đường dẫn sai hoặc tệp chưa được đưa lên." },
        { label: "Thẻ phần tử nếu bố cục lệch", detail: "Chọn phần tử bị lệch, đọc danh sách quy tắc CSS. Quy tắc bị gạch ngang là quy tắc đã thua, và sơ đồ hộp cho con số thật của đệm và lề." },
        { label: "Thử tại chỗ rồi chép về", detail: "Đổi giá trị ngay trong công cụ cho tới khi ưng ý. Chép giá trị đúng vào tệp CSS thật trước khi tải lại, vì tải lại là mất sạch mọi thay đổi." },
      ],
    },
  ],

  "kha-nang-truy-cap-co-ban": [
    {
      type: "scenario",
      title: "Nhà thiết kế chê viền tiêu điểm xấu",
      start: "viền",
      nodes: {
        viền: {
          text: "Bạn đang hoàn thiện trang bán hàng. Nhà thiết kế nhìn thấy viền xanh mặc định quanh nút khi bấm phím Tab và nhắn: nhìn xấu quá, bỏ đi. Bạn làm gì?",
          choices: [
            { label: "Thêm một dòng CSS tắt hẳn viền tiêu điểm cho gọn", next: "viền-tắt" },
            { label: "Thay bằng viền dày màu thương hiệu, có khoảng cách", next: "kiểm" },
            { label: "Tắt viền ở nút, còn liên kết thì để nguyên mặc định", next: "viền-nửa" },
          ],
        },
        "viền-tắt": {
          text: "Trang đẹp hơn trong ảnh chụp màn hình. Nhưng người dùng bàn phím bấm Tab và không thấy mình đang ở đâu: họ phải đoán, bấm nhầm nút Xoá giỏ hàng, rồi rời trang. Không ai báo lỗi cho bạn.",
          ending: "bad",
        },
        "viền-nửa": {
          text: "Nút mất viền, liên kết vẫn có. Người dùng bàn phím đi từ liên kết sang nút thì dấu hiệu biến mất giữa chừng, và họ không biết tiêu điểm đã nhảy tới đâu. Sửa một nửa vẫn bỏ rơi cùng một nhóm người.",
          ending: "bad",
        },
        kiểm: {
          text: "Nhà thiết kế hài lòng với viền màu thương hiệu, và người dùng bàn phím vẫn thấy rõ mình đang ở đâu. Bây giờ bạn muốn chắc cả trang dùng được. Cách kiểm tra nào đáng làm trước?",
          choices: [
            { label: "Cất chuột đi và dùng Tab đi hết cả trang", next: "div" },
            { label: "Chạy một công cụ tự động rồi tin vào điểm số của nó", next: "tự-động" },
            { label: "Nhờ đồng nghiệp xem trên máy tính bảng có đẹp không", next: "đẹp" },
          ],
        },
        "tự-động": {
          text: "Công cụ báo điểm cao. Nó bắt được thiếu nhãn và thiếu tương phản, nhưng không biết nút Mua ngay là một hộp chung chung không ai Tab tới được. Điểm số đẹp, còn người dùng bàn phím vẫn không mua được hàng.",
          ending: "bad",
        },
        đẹp: {
          text: "Đồng nghiệp khen bố cục. Câu hỏi đúng không phải là trang có đẹp không mà là trang có dùng được bằng bàn phím không, và bạn vẫn chưa biết câu trả lời.",
          ending: "bad",
        },
        div: {
          text: "Bạn bấm Tab qua cả trang và phát hiện nút Mua ngay không bao giờ được chọn: nó là một hộp chung chung gắn sự kiện chuột. Bạn sửa thế nào?",
          choices: [
            { label: "Gắn thuộc tính vai trò là nút vào hộp đó", next: "vai-trò" },
            { label: "Đổi hộp thành thẻ nút thật của HTML", next: "nút-thật" },
            { label: "Để nguyên vì chuột bấm được là đủ dùng", next: "bỏ-qua" },
          ],
        },
        "vai-trò": {
          text: "Máy đọc màn hình giờ thông báo đây là một nút, nhưng nó vẫn không nhận phím Tab, không bấm được bằng phím Enter. Người dùng bị báo là có nút mà bấm không được, tệ hơn lúc chưa gắn gì.",
          ending: "bad",
        },
        "bỏ-qua": {
          text: "Với bạn thì trang chạy. Với người không dùng được chuột thì nút thanh toán không tồn tại, và họ chuyển sang cửa hàng khác mà không để lại một dòng phản hồi.",
          ending: "bad",
        },
        "nút-thật": {
          text: "Thẻ nút thật tự có vai trò đúng, tự nhận phím Tab và phím Enter, nên bạn chẳng cần thêm gì. Phép thử năm phút bằng bàn phím đã bắt được lỗi mà không công cụ nào cần tới.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Lối dốc ở vỉa hè: làm cho một nhóm, lợi cho tất cả",
      intro: "Lối dốc ở vỉa hè sinh ra cho xe lăn. Rồi người đẩy xe nôi, người kéo vali, shipper chở hàng cũng dùng nó mỗi ngày. Khả năng truy cập trên web cũng vậy: việc làm cho một nhóm thường là việc làm cho gần như mọi người.",
      columns: ["Việc bạn làm", "Người cần nó nhất", "Người khác cũng được lợi"],
      rows: [
        ["Dùng được hoàn toàn bằng bàn phím", "Người không dùng được chuột", "Người đang đau cổ tay, người gõ nhanh để điền biểu mẫu"],
        ["Chữ đủ tương phản với nền", "Người nhìn kém, người mù màu", "Bất kỳ ai xem điện thoại ngoài trời nắng"],
        ["Ảnh có mô tả bằng chữ", "Người dùng máy đọc màn hình", "Người đang ở vùng sóng yếu, ảnh chưa tải kịp"],
        ["Dùng đúng thẻ ngữ nghĩa", "Máy đọc màn hình", "Công cụ tìm kiếm, và người đọc mã sau này"],
      ],
      oneLiner: "Làm cho người khó dùng nhất dùng được, thì mọi người khác dùng cũng dễ hơn.",
    },
  ],

  "responsive-mot-trang-cho-moi-man-hinh": [
    {
      type: "exercise",
      language: "javascript",
      title: "Chọn số cột theo chiều rộng, bắt đầu từ màn hình hẹp",
      task: "Viết soCot(rong): màn hình hẹp hơn 600px thì 1 cột, từ 600px tới dưới 900px thì 2 cột, từ 900px trở lên thì 3 cột. Hãy để 1 cột là mặc định rồi mở rộng dần, đúng tinh thần hẹp trước. Hai ngưỡng 600 và 900 ở đây chỉ để minh hoạ, ngưỡng thật của bạn nằm ở chỗ bố cục bắt đầu gãy. Đoạn in bên dưới giữ nguyên.",
      starter:
        'function soCot(rong) {\n  let cot = 1;\n  // TODO: mở rộng dần khi màn hình rộng hơn\n  return cot;\n}\n\nfor (const w of [360, 599, 600, 768, 900, 1280]) {\n  console.log(w + "px: " + soCot(w) + " cột");\n}',
      solution:
        'function soCot(rong) {\n  let cot = 1;\n  if (rong >= 600) cot = 2;\n  if (rong >= 900) cot = 3;\n  return cot;\n}\n\nfor (const w of [360, 599, 600, 768, 900, 1280]) {\n  console.log(w + "px: " + soCot(w) + " cột");\n}',
      expectedOutput: "360px: 1 cột\n599px: 1 cột\n600px: 2 cột\n768px: 2 cột\n900px: 3 cột\n1280px: 3 cột",
      hints: [
        "Giá trị mặc định là 1 cột. Chỉ khi màn hình đủ rộng bạn mới nâng nó lên.",
        "Hai điều kiện nối tiếp nhau: rộng từ 600 thì 2 cột, rộng từ 900 thì ghi đè thành 3 cột. Chú ý 599 vẫn là 1 cột còn 600 là 2 cột.",
      ],
    },
    {
      type: "chart",
      title: "Gửi ảnh 2000px xuống điện thoại thì thừa bao nhiêu",
      caption: "Số liệu minh hoạ: ước tính phần điểm ảnh bị bỏ phí khi gửi một ảnh rộng bằng giá trị bạn chọn xuống màn hình hẹp hơn, coi ảnh vuông vức và bỏ qua màn hình mật độ cao. Kéo chiều rộng ảnh để thấy ảnh càng lớn thì điện thoại càng phí.",
      kind: "line",
      xLabel: "Chiều rộng màn hình (px)",
      yLabel: "Điểm ảnh thừa (%)",
      x: { from: 320, to: 1280, step: 80 },
      params: [{ id: "w", label: "Chiều rộng ảnh gửi đi", min: 800, max: 2400, step: 200, value: 2000, unit: "px" }],
      series: [{ label: "Điểm ảnh gửi thừa (%)", expr: "max(0, 100 * (1 - (x / w) ^ 2))" }],
    },
  ],

  "toc-do-tai-trang": [
    {
      type: "exercise",
      language: "javascript",
      title: "Ba tệp nặng nhất của trang",
      task: "Làm theo cách bài đã dạy: sắp xếp theo dung lượng giảm dần, lấy ba tệp đầu rồi in ra. Sau đó in tổng dung lượng và phần trăm (làm tròn) mà tệp nặng nhất chiếm. Danh sách minh hoạ, chỉ để luyện. Đoạn in giữ nguyên.",
      starter:
        'const tai = [\n  { ten: "anh-nen.jpg", kb: 3072 },\n  { ten: "phong.woff2", kb: 85 },\n  { ten: "style.css", kb: 12 },\n  { ten: "script.js", kb: 240 },\n  { ten: "logo.png", kb: 9 },\n];\n\nconst top3 = [...tai].sort((a, b) => a.kb - b.kb).slice(0, 3);\nfor (const t of top3) console.log(t.ten + ": " + t.kb + " KB");\n\nlet tong = 0;\nfor (const t of tai) tong += t.kb;\nconsole.log("Tổng: " + tong + " KB");\nconsole.log("Tệp nặng nhất chiếm " + Math.round((top3[0].kb / tong) * 100) + "%");',
      solution:
        'const tai = [\n  { ten: "anh-nen.jpg", kb: 3072 },\n  { ten: "phong.woff2", kb: 85 },\n  { ten: "style.css", kb: 12 },\n  { ten: "script.js", kb: 240 },\n  { ten: "logo.png", kb: 9 },\n];\n\nconst top3 = [...tai].sort((a, b) => b.kb - a.kb).slice(0, 3);\nfor (const t of top3) console.log(t.ten + ": " + t.kb + " KB");\n\nlet tong = 0;\nfor (const t of tai) tong += t.kb;\nconsole.log("Tổng: " + tong + " KB");\nconsole.log("Tệp nặng nhất chiếm " + Math.round((top3[0].kb / tong) * 100) + "%");',
      expectedOutput: "anh-nen.jpg: 3072 KB\nscript.js: 240 KB\nphong.woff2: 85 KB\nTổng: 3418 KB\nTệp nặng nhất chiếm 90%",
      hints: [
        "Hiện tại bạn đang lấy ba tệp NHẸ nhất. Chiều sắp xếp quyết định tệp nào đứng đầu.",
        "Muốn giá trị lớn đứng trước thì hàm so sánh trừ ngược lại: b.kb - a.kb.",
      ],
    },
    {
      type: "chart",
      title: "Ảnh nặng làm trang chờ bao lâu",
      caption: "Số liệu minh hoạ: thời gian tải lý thuyết = dung lượng nhân 8 rồi chia tốc độ mạng, bỏ qua độ trễ và các tệp khác. Kéo thanh trượt để so ảnh gốc 3 MB với ảnh đã xử lý lại đúng kích thước hiển thị.",
      kind: "line",
      xLabel: "Tốc độ mạng (Mbps)",
      yLabel: "Thời gian tải ảnh (giây)",
      x: { from: 1, to: 20, step: 1 },
      params: [{ id: "anh", label: "Dung lượng ảnh sau khi xử lý", min: 0.3, max: 3, step: 0.1, value: 0.5, unit: "MB" }],
      series: [
        { label: "Ảnh gốc 3 MB", expr: "3 * 8 / x" },
        { label: "Ảnh đã xử lý", expr: "anh * 8 / x" },
      ],
    },
  ],

  "bieu-mau-dung-duoc": [
    {
      type: "scenario",
      title: "Biểu mẫu đăng ký nhiều người bỏ giữa chừng",
      start: "mười-ô",
      nodes: {
        "mười-ô": {
          text: "Biểu mẫu đăng ký nhận bản tin của bạn có mười ô: tên, email, điện thoại, địa chỉ, ngày sinh, nghề nghiệp và vài ô khác. Số người điền xong rất thấp. Bạn làm gì trước?",
          choices: [
            { label: "Hỏi từng ô xem có cần ngay không rồi bỏ bớt", next: "ba-ô" },
            { label: "Thêm thanh tiến độ cho người dùng thấy còn mấy ô", next: "tiến-độ" },
            { label: "Đổi nút gửi sang màu cam và ghi Gửi ngay", next: "nút-cam" },
          ],
        },
        "tiến-độ": {
          text: "Thanh tiến độ đẹp, nhưng nó chỉ cho người dùng thấy rõ họ còn phải gõ mười ô. Số ô vẫn nguyên nên lý do bỏ cuộc cũng nguyên, và tỷ lệ hoàn thành hầu như không nhích.",
          ending: "bad",
        },
        "nút-cam": {
          text: "Nút đổi màu, nhưng người bỏ cuộc đâu có dừng ở nút: họ dừng ở ô thứ năm, thứ sáu. Bạn tối ưu đúng chỗ ít người tới được và bỏ nguyên nguyên nhân thật.",
          ending: "bad",
        },
        "ba-ô": {
          text: "Chỉ còn ba ô: tên, email và mật khẩu. Nhà thiết kế muốn chặn dán vào ô mật khẩu vì cho rằng như vậy an toàn hơn. Bạn quyết định thế nào?",
          choices: [
            { label: "Cho dán để trình quản lý mật khẩu điền được", next: "báo-lỗi" },
            { label: "Chặn dán để mọi người buộc phải gõ tay", next: "chặn-dán" },
            { label: "Chặn dán nhưng thêm gợi ý mật khẩu mạnh", next: "chặn-gợi-ý" },
          ],
        },
        "chặn-dán": {
          text: "Người dùng trình quản lý mật khẩu vốn có mật khẩu dài, ngẫu nhiên. Bị chặn dán, họ chuyển sang mật khẩu gõ tay được, tức là ngắn và dễ đoán hơn. Hệ thống của bạn vừa yếu đi chứ không mạnh lên.",
          ending: "bad",
        },
        "chặn-gợi-ý": {
          text: "Gợi ý mật khẩu mạnh nghe hợp lý, nhưng ô vẫn không cho dán. Người dùng mật khẩu ngẫu nhiên phải gõ lại một chuỗi dài từng ký tự, hoặc đổi sang cái dễ nhớ hơn và yếu hơn.",
          ending: "bad",
        },
        "báo-lỗi": {
          text: "Một người dùng dán mật khẩu 6 ký tự trong khi bạn yêu cầu tối thiểu 8. Bạn báo lỗi theo cách nào?",
          choices: [
            { label: "Báo ngay cạnh ô: cần ít nhất 8 ký tự, đang có 6; giữ nguyên dữ liệu", next: "tốt" },
            { label: "Sau khi bấm gửi, hiện một dòng ở đầu trang và xoá trắng mật khẩu", next: "xoá-trắng" },
            { label: "Hiện hộp thoại Có lỗi xảy ra rồi tải lại trang để nhập lại từ đầu", next: "tải-lại" },
          ],
        },
        "xoá-trắng": {
          text: "Người dùng phải kéo lên đầu trang để đọc lỗi, rồi gõ lại mật khẩu. Họ không biết lỗi nằm ở ô nào, và nhiều người sẽ đóng trang thay vì thử lần nữa.",
          ending: "bad",
        },
        "tải-lại": {
          text: "Hộp thoại không nói sai ở đâu, còn trang tải lại thì xoá sạch cả tên lẫn email đã điền. Bắt gõ lại từ đầu là lý do bỏ cuộc phổ biến nhất của biểu mẫu.",
          ending: "bad",
        },
        tốt: {
          text: "Lỗi nằm ngay cạnh ô, nói rõ cần sửa gì, và mọi thứ đã điền vẫn còn. Người dùng chỉ cần thêm hai ký tự rồi gửi. Ít ô, cho dán, báo lỗi tử tế: ba quyết định nhỏ giữ chân người dùng.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Mỗi ô thêm vào làm mất bao nhiêu người",
      caption: "Số liệu minh hoạ, không phải đo thật: giả sử mỗi ô bắt buộc làm một tỷ lệ người dùng bỏ đi, và tỷ lệ đó như nhau ở mọi ô. Kéo thanh trượt để thấy vài phần trăm nhỏ mỗi ô cộng dồn thành khoảng cách lớn thế nào ở ô thứ mười.",
      kind: "line",
      xLabel: "Số ô trong biểu mẫu",
      yLabel: "Người điền xong (%)",
      x: { from: 1, to: 12, step: 1 },
      params: [{ id: "p", label: "Người bỏ đi ở mỗi ô", min: 1, max: 15, step: 1, value: 7, unit: "%" }],
      series: [
        { label: "Theo mức bạn chọn", expr: "100 * (1 - p / 100) ^ x" },
        { label: "Nếu chỉ bỏ đi 3% mỗi ô", expr: "100 * (1 - 0.03) ^ x" },
      ],
    },
  ],

  "dua-trang-len-mang": [
    {
      type: "scenario",
      title: "Triển khai xong mà ảnh bìa trống",
      start: "trống",
      nodes: {
        trống: {
          text: "Trang chạy hoàn hảo trên máy bạn. Sau khi đưa lên mạng, ảnh bìa biến thành khung trống. Tệp thật tên Anh-Bia.JPG, còn HTML viết src là anh-bia.jpg. Bạn làm gì đầu tiên?",
          choices: [
            { label: "Mở công cụ nhà phát triển, xem yêu cầu ảnh trả về mã gì", next: "404" },
            { label: "Đẩy lại mã lên ba lần cho chắc ăn", next: "đẩy-lại" },
            { label: "Chuyển sang một dịch vụ lưu trữ khác để thử", next: "đổi-nơi" },
          ],
        },
        "đẩy-lại": {
          text: "Mỗi lần đẩy lại là một lần triển khai, nhưng tệp và đường dẫn vẫn y nguyên nên kết quả không đổi. Bạn mất nửa tiếng để học lại điều mà thẻ mạng chỉ cần ba mươi giây để chỉ ra.",
          ending: "bad",
        },
        "đổi-nơi": {
          text: "Bạn dựng lại mọi thứ ở dịch vụ mới và ảnh vẫn trống, vì lỗi nằm ở tên tệp chứ không ở nơi lưu trữ. Thêm một buổi tối trôi qua, và nguyên nhân thật vẫn chưa ai nhìn tới.",
          ending: "bad",
        },
        "404": {
          text: "Yêu cầu ảnh trả mã 404. Trên máy bạn tên tệp không phân biệt hoa thường nên chạy được, còn máy chủ thì có phân biệt. Bạn sửa thế nào?",
          choices: [
            { label: "Đặt tên tệp và đường dẫn chữ thường giống hệt nhau rồi đẩy lên", next: "đã-sửa" },
            { label: "Thêm cả hai tệp, một tên viết hoa và một tên viết thường", next: "hai-tệp" },
            { label: "Bảo người xem tải lại trang vài lần cho ảnh hiện ra", next: "tải-lại" },
          ],
        },
        "hai-tệp": {
          text: "Ảnh hiện, nhưng giờ có hai bản của cùng một tấm ảnh. Lần sau bạn thay ảnh ở một nơi và quên nơi kia, và trang lại hiện ảnh cũ mà không ai hiểu vì sao.",
          ending: "bad",
        },
        "tải-lại": {
          text: "Tải lại không đổi được tên tệp, nên ảnh sẽ không bao giờ hiện. Trong lúc đó, mọi người truy cập đều thấy một trang giới thiệu có khung trống ở đúng chỗ quan trọng nhất.",
          ending: "bad",
        },
        "đã-sửa": {
          text: "Bạn đã sửa và đẩy lên, dịch vụ tự triển khai lại. Mở trang trên máy bạn thì ảnh đã hiện. Bước kiểm tra cuối cùng là gì?",
          choices: [
            { label: "Mở địa chỉ thật trên điện thoại hoặc một máy khác", next: "tốt" },
            { label: "Mở lại trên máy mình, hiện rồi thì xong", next: "máy-mình" },
            { label: "Gửi liên kết cho khách ngay để họ góp ý luôn", next: "gửi-khách" },
          ],
        },
        "máy-mình": {
          text: "Máy bạn có thể đang giữ bản cũ trong bộ nhớ đệm, nên ảnh hiện không chứng minh được gì. Một máy khác vào trang thì vẫn có thể thấy khung trống, và bạn không biết.",
          ending: "bad",
        },
        "gửi-khách": {
          text: "Khách mở trang trước khi bạn kiểm tra trên thiết bị nào khác. Nếu còn một lỗi đường dẫn nữa, họ là người đầu tiên thấy nó thay vì bạn.",
          ending: "bad",
        },
        tốt: {
          text: "Trên máy khác, ảnh hiện đúng, vì vậy bộ nhớ đệm của máy bạn không còn che mắt bạn nữa. Khi ảnh không hiện sau triển khai: xem mã trạng thái, kiểm tra chữ hoa chữ thường, rồi thử lại trên thiết bị khác.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Từ máy bạn tới địa chỉ thật",
      steps: [
        { label: "Đẩy mã lên kho bằng Git", detail: "Bạn commit rồi đẩy nhánh chính lên kho công khai. Từ đây lịch sử Git của bạn cũng là lịch sử triển khai." },
        { label: "Dịch vụ phát hiện thay đổi", detail: "Dịch vụ lưu trữ trang tĩnh đã nối với kho. Nó thấy có commit mới và lấy các tệp HTML, CSS, JS, ảnh về." },
        { label: "Triển khai tự động", detail: "Dịch vụ đặt các tệp lên máy chủ của nó. Trang tĩnh không cần dựng gì thêm phía máy chủ, nên việc này thường xong trong vài phút." },
        { label: "Người xem mở địa chỉ", detail: "Trình duyệt xin trang, máy chủ gửi đúng các tệp như nhau cho mọi người. Mọi tệp gửi xuống đều xem được, nên đừng đặt khoá bí mật vào đó." },
        { label: "Bạn kiểm tra trên thiết bị khác", detail: "Mở địa chỉ thật trên điện thoại. Nếu hỏng, quay về commit cũ chạy được cũng là một lần đẩy lên mới." },
      ],
    },
  ],

  "tong-on-chang-web": [
    {
      type: "sim",
      tool: "editor",
      mission: "about-page",
      title: "Dựng trang giới thiệu hai trang",
      task: "Làm đúng việc chặng này dạy: trong trình soạn mã, tạo một tệp mới tên about.html có tiêu đề và một đoạn giới thiệu bản thân, rồi sửa index.html để có một thẻ a dẫn tới about.html. Nhớ lưu lại.",
    },
    {
      type: "feynman",
      title: "Sợi chỉ của cả chặng: tôn trọng người dùng",
      intro: "Một quán cà phê tốt không chỉ ngon. Nó có lối vào cho xe lăn, thực đơn chữ đủ to, bảng chỉ dẫn cho người lạ. Khách không khen những thứ đó, nhưng khách thiếu chúng sẽ lặng lẽ không quay lại. Mười chín bài của chặng web cũng là những lựa chọn như vậy.",
      columns: ["Quyết định trên trang", "Tôn trọng ai", "Nếu bỏ qua"],
      rows: [
        ["Thẻ ngữ nghĩa", "Máy đọc màn hình, công cụ tìm kiếm, người đọc mã", "Cả ba nhóm vô hình mất cấu trúc của trang"],
        ["Đơn vị tương đối cho cỡ chữ", "Người đã chỉnh cỡ chữ trong trình duyệt", "Chữ bị ép nhỏ dù họ đã cần nó to"],
        ["Giữ viền tiêu điểm", "Người dùng bàn phím", "Họ không biết mình đang ở đâu trên trang"],
        ["Suy giảm êm", "Trình duyệt cũ, thiết bị lạ", "Phần trang trí hỏng kéo theo cả chức năng"],
      ],
      oneLiner: "Tách nội dung, hình thức, hành vi, rồi dành chỗ cho người dùng chọn cách của họ.",
    },
  ],

  "javascript-chay-o-dau": [
    {
      type: "exercise",
      language: "javascript",
      title: "Đoạn mã này chạy được ở đâu",
      task: "Cho hai danh sách: những thứ có trong trình duyệt, và những thứ có trên máy chủ (như Node.js). Với mỗi tên trong vòng lặp, in ra nơi dùng được theo mẫu 'tên: nơi', trong đó nơi là một trong ba cụm: 'cả hai', 'chỉ trình duyệt' hoặc 'chỉ máy chủ'. Đoạn in giữ nguyên.",
      starter:
        'const trinhDuyet = ["document", "localStorage", "console"];\nconst mayChu = ["fs", "process", "console"];\n\nfor (const ten of ["document", "fs", "localStorage", "process", "console"]) {\n  let noi = "chưa biết";\n  // TODO: xem tên có trong danh sách nào\n  console.log(ten + ": " + noi);\n}',
      solution:
        'const trinhDuyet = ["document", "localStorage", "console"];\nconst mayChu = ["fs", "process", "console"];\n\nfor (const ten of ["document", "fs", "localStorage", "process", "console"]) {\n  const o1 = trinhDuyet.includes(ten);\n  const o2 = mayChu.includes(ten);\n  let noi = "chỉ máy chủ";\n  if (o1 && o2) noi = "cả hai";\n  else if (o1) noi = "chỉ trình duyệt";\n  console.log(ten + ": " + noi);\n}',
      expectedOutput: "document: chỉ trình duyệt\nfs: chỉ máy chủ\nlocalStorage: chỉ trình duyệt\nprocess: chỉ máy chủ\nconsole: cả hai",
      hints: [
        "Mảng có phương thức includes: nó cho true nếu tên nằm trong mảng.",
        "Xét trường hợp có trong cả hai danh sách trước. console là ví dụ duy nhất của trường hợp đó.",
      ],
    },
  ],

  "bien-kieu-va-ep-kieu-ngam-dinh": [
    {
      type: "flow",
      title: "Chuyện gì xảy ra khi bạn viết 0 == \"\"",
      steps: [
        { label: "Hai vế khác kiểu", detail: "Bên trái là số 0, bên phải là chuỗi rỗng. Hai dấu bằng không so ngay mà tự hỏi: có ép được về cùng kiểu không?" },
        { label: "Chuỗi rỗng bị ép thành số", detail: "Theo bảng quy tắc, chuỗi rỗng đổi thành số 0. Bạn không viết dòng nào bảo nó làm vậy." },
        { label: "So 0 với 0", detail: "Giờ hai vế cùng kiểu và cùng giá trị, nên chúng bằng nhau." },
        { label: "Kết quả true, không một cảnh báo", detail: "Mã chạy tiếp như thể số 0 và ô trống là một. Nếu 0 là số lượng hợp lệ người dùng vừa nhập thì bạn vừa đối xử với nó như chưa nhập gì." },
        { label: "Ba dấu bằng thì dừng ngay", detail: "0 === \"\" thấy hai kiểu khác nhau và trả false liền, không ép gì. Đó là lý do nên luôn dùng ba dấu bằng." },
      ],
    },
  ],

  "ham-trong-javascript": [
    {
      type: "flow",
      title: "Trao hàm cho trình duyệt, và vì sao không được thêm ngoặc",
      steps: [
        { label: "Bạn viết một hàm", detail: "const chao = () => console.log(\"Xin chào\"). Lúc này hàm chỉ là một giá trị nằm trong biến chao, chưa chạy dòng nào." },
        { label: "Trao chính hàm đi", detail: "nutBam.addEventListener(\"click\", chao): bạn đưa cái hàm, không ngoặc, cho trình duyệt giữ giúp." },
        { label: "Mã của bạn chạy tiếp", detail: "Trang hiển thị bình thường. Không dòng nào gọi chao, và bạn cũng không quyết định khi nào nó chạy." },
        { label: "Người dùng bấm nút", detail: "Lúc này trình duyệt mới lấy hàm ra gọi, đúng một lần cho mỗi lần bấm. Đó là hàm gọi lại: bên nhận quyết định thời điểm." },
        { label: "Nếu viết chao() có ngoặc", detail: "Hàm chạy ngay lúc đăng ký, rồi giá trị trả về (undefined) mới được trao cho trình duyệt. Bấm nút sau đó không còn gì để gọi." },
      ],
    },
  ],

  "mang-va-cac-phuong-thuc-duyet": [
    {
      type: "flow",
      title: "Một chuỗi lọc, ánh xạ, gom đi qua ba đơn hàng",
      steps: [
        { label: "Mảng gốc", detail: "Ba đơn: D1 đã giao 120, D2 huỷ 300, D3 đã giao 80. Mọi bước sau đây đều không đổi mảng này." },
        { label: "filter: giữ đơn đã giao", detail: "Mỗi đơn đi qua hàm kiểm tra. D2 bị loại. Kết quả là mảng mới [D1, D3]." },
        { label: "map: chỉ lấy số tiền", detail: "Từng đơn đổi thành số tiền của nó. Mảng mới là [120, 80]." },
        { label: "reduce: cộng dồn", detail: "Bắt đầu từ 0, cộng 120 rồi cộng 80 ra 200. Số 0 ban đầu là chỗ bắt đầu của tổng." },
        { label: "Mảng gốc vẫn còn nguyên", detail: "Cả ba đơn vẫn nằm đó, kể cả D2 đã huỷ. Hai bước đầu trả mảng mới, nên bạn phải hứng kết quả; gọi mà không hứng thì không thấy gì đổi." },
      ],
    },
  ],

  "doi-tuong-va-json": [
    {
      type: "flow",
      title: "Đọc dữ liệu từ mạng khi một tầng bị thiếu",
      steps: [
        { label: "Nhận về một chuỗi", detail: "Từ mạng bạn nhận chuỗi {\"nguoiDung\":{\"ten\":\"An\",\"diaChi\":null}}. Nó trông như đối tượng nhưng chỉ là chữ, chưa đọc được thuộc tính." },
        { label: "JSON.parse", detail: "Phân tích chuỗi thành đối tượng thật. Nếu quên bước này thì dl.nguoiDung trên một chuỗi sẽ là undefined." },
        { label: "Đọc tầng có sẵn", detail: "dl.nguoiDung.ten cho ra \"An\" vì cả hai tầng đều tồn tại." },
        { label: "Đi sâu vào tầng thiếu", detail: "dl.nguoiDung.diaChi là null, nên dl.nguoiDung.diaChi.thanhPho ném lỗi và đoạn mã dừng ngay tại đó." },
        { label: "Dùng ?. và ??", detail: "dl.nguoiDung.diaChi?.thanhPho ra undefined thay vì lỗi, và ?? \"chưa có\" điền giá trị dự phòng. Sáu dòng kiểm tra thu về một dòng." },
      ],
    },
  ],

  "pham-vi-closure-va-ngu-canh": [
    {
      type: "feynman",
      title: "Ba câu hỏi khác nhau, dễ bị gộp thành một",
      intro: "Hình dung một công ty có nhiều phòng. Thẻ ra vào quy định bạn vào được phòng nào, quyển sổ tay bạn mang theo kể cả khi chuyển phòng, và cách mọi người gọi bạn tuỳ vào ai đang gọi. Ba thứ đó khác nhau, nhưng ở JavaScript chúng đều bị gọi chung là chuyện biến.",
      columns: ["Khái niệm", "Ví dụ đời thường", "Trong JavaScript"],
      rows: [
        ["Phạm vi", "Thẻ ra vào cấp ngay khi bạn ký hợp đồng: phòng nào mở được đã được ghi sẵn", "Hàm nhìn thấy biến bao quanh nơi nó được viết ra. Đọc mã là biết"],
        ["Closure", "Cuốn sổ tay bạn mang theo khi sang phòng khác, vẫn đọc được trang cũ", "Hàm bên trong vẫn dùng được biến của hàm bao ngoài đã chạy xong"],
        ["Ngữ cảnh (this)", "Người ta gọi bạn là con, em hay sếp tuỳ ai đang mở lời", "Giá trị của this thay đổi tuỳ cách hàm được gọi, không phải nơi viết"],
      ],
      oneLiner: "Phạm vi quyết định lúc viết, ngữ cảnh quyết định lúc gọi, closure là hệ quả của phạm vi.",
    },
  ],

  "nhung-cai-bay-cua-javascript": [
    {
      type: "flow",
      title: "Vì sao [10, 9, 1, 100].sort() ra [1, 10, 100, 9]",
      steps: [
        { label: "Mảng bốn số", detail: "[10, 9, 1, 100] là số, và bạn mong sort() sắp theo giá trị số." },
        { label: "Mặc định sắp theo chuỗi", detail: "Không có hàm so sánh, sort() đổi từng phần tử thành chuỗi: \"10\", \"9\", \"1\", \"100\"." },
        { label: "So từng ký tự một", detail: "\"1\" đứng trước \"10\", \"10\" đứng trước \"100\", còn \"9\" lớn hơn \"1\" ở ký tự đầu nên đứng sau cùng." },
        { label: "Kết quả gần đúng, không lỗi", detail: "[1, 10, 100, 9]. Không có cảnh báo nào. Với dữ liệu nhỏ, thứ tự có thể vẫn trông hợp lý nên lỗi nằm im hàng tháng." },
        { label: "Truyền hàm so sánh", detail: "sort((a, b) => a - b) bảo nó so theo giá trị số, và kết quả là [1, 9, 10, 100]." },
      ],
    },
  ],

  "loi-va-ngoai-le-trong-javascript": [
    {
      type: "flow",
      title: "Một lỗi trên trang của bạn đi đâu",
      steps: [
        { label: "Người dùng bấm Thanh toán", detail: "Hàm xử lý chạy và gặp dữ liệu giỏ hàng bị thiếu một trường. Dòng đó ném một lỗi." },
        { label: "Đoạn mã dừng, trang không dừng", detail: "Chỉ hàm đang chạy bị cắt ngang. Trang vẫn hiện, các nút khác vẫn bấm được, nên không có gì sụp đổ trông thấy." },
        { label: "Lỗi ghi vào bảng điều khiển", detail: "Dòng đỏ nằm ở một nơi mà chỉ lập trình viên mới mở. Với người dùng, nút Thanh toán chỉ đơn giản là không làm gì." },
        { label: "Người dùng bấm vài lần rồi đi", detail: "Họ không báo lỗi cho ai. Nếu không có bộ bắt lỗi toàn cục, bạn không biết chuyện này đã xảy ra." },
        { label: "Có bộ bắt lỗi thì lỗi về tới bạn", detail: "Bộ bắt lỗi toàn cục gửi dấu vết ngăn xếp và thông tin môi trường về máy chủ, trong khi người dùng thấy một dòng thông báo kèm nút thử lại." },
      ],
    },
  ],

  "vi-sao-trinh-duyet-khong-dung-cho": [
    {
      type: "flow",
      title: "Một lời gọi mạng đi qua luồng chính và hàng đợi",
      steps: [
        { label: "Luồng chính gọi fetch", detail: "Mã của bạn xin dữ liệu từ máy chủ. Lời gọi này không bắt luồng đứng chờ hai giây." },
        { label: "Trình duyệt nhận việc", detail: "Phần mạng của trình duyệt lo việc chờ ở bên ngoài, còn hàm gọi lại của bạn được cất sẵn để dùng sau." },
        { label: "Luồng chính làm việc khác", detail: "Trong lúc chờ, trang vẫn cuộn được, nút vẫn bấm được và mã tiếp theo vẫn chạy. Đây là cách một luồng duy nhất phục vụ nhiều việc." },
        { label: "Dữ liệu về, hàm vào hàng đợi", detail: "Khi phản hồi tới nơi, trình duyệt xếp hàm gọi lại vào hàng đợi chứ không chen vào giữa mã đang chạy." },
        { label: "Vòng lặp lấy ra chạy", detail: "Luồng chính xong việc hiện tại, nhìn vào hàng đợi và lấy hàm của bạn ra chạy. Nếu có một vòng lặp nặng đang chiếm luồng thì hàm này phải đợi, dù dữ liệu đã về từ lâu." },
      ],
    },
  ],
};
