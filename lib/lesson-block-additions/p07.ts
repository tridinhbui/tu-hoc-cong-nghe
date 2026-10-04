import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track personal - đợt 07. Một người viết cho một tệp.
export const P07_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "join-ghep-du-lieu-nhieu-bang": [
    {
      type: "flow",
      title: "Vì sao điều kiện đặt sai chỗ làm mất khách hàng",
      steps: [
        {
          label: "Hai bảng đầu vào",
          detail: "Bảng khách có An, Bình, Chi. Bảng đơn có hai đơn của An (một xong, một huỷ) và một đơn huỷ của Bình. Chi chưa mua gì.",
        },
        {
          label: "Ghép trái theo mã khách",
          detail: "Mỗi khách giữ nguyên. An ra hai hàng, Bình ra một hàng, còn Chi ra một hàng mà mọi cột của bảng đơn đều là NULL.",
        },
        {
          label: "Đặt điều kiện trạng thái ở WHERE",
          detail: "WHERE trạng thái = 'xong' chạy SAU phép ghép. Hàng của Chi có trạng thái NULL, so sánh cho ra không xác định nên bị loại.",
        },
        {
          label: "Kết quả: ghép trái thành ghép trong",
          detail: "Chi biến mất, Bình cũng biến mất vì đơn của anh ấy đều đã huỷ. Báo cáo chạy bình thường nhưng thiếu khách, không có lỗi nào được báo.",
        },
        {
          label: "Chuyển điều kiện vào ON",
          detail: "ON đơn.khach_id = khach.id AND đơn.trang_thai = 'xong' lọc bảng đơn TRƯỚC khi ghép. Chi và Bình vẫn còn, chỉ là phần đơn của họ để NULL.",
        },
      ],
    },
  ],

  "gop-nhom-va-ham-tong-hop": [
    {
      type: "flow",
      title: "Một câu gộp nhóm đi qua từng bước",
      steps: [
        {
          label: "Bảng đầu vào",
          detail: "Bảng đơn hàng có 6 hàng: 4 đơn Hà Nội (3 xong, 1 huỷ), 2 đơn Huế (đều xong). Cột tiền có một giá trị NULL ở một đơn Huế.",
        },
        {
          label: "WHERE lọc từng hàng",
          detail: "Bỏ đơn huỷ trước. Còn 5 hàng: 3 của Hà Nội, 2 của Huế. Bước này chạy sớm nên các bước sau xử lý ít hàng hơn.",
        },
        {
          label: "GROUP BY chia nhóm",
          detail: "5 hàng được chia thành 2 nhóm theo thành phố. Nhóm nào không có hàng nào còn lại thì không tồn tại, không hiện cột bằng không.",
        },
        {
          label: "Hàm tổng hợp tính mỗi nhóm",
          detail: "COUNT(*) của Huế là 2 nhưng COUNT(tien) là 1, vì dấu sao đếm hàng còn tên cột bỏ qua NULL. Trung bình của Huế cũng chia cho 1, không phải 2.",
        },
        {
          label: "HAVING lọc từng nhóm",
          detail: "HAVING SUM(tien) >= 100 nhìn thấy kết quả tổng hợp nên chỉ nó mới lọc được theo tổng. Nhóm không đạt bị bỏ khỏi bảng cuối.",
        },
      ],
    },
  ],

  "giao-dich-co-so-du-lieu": [
    {
      type: "flow",
      title: "Chuyển tiền gặp mất điện, có và không có giao dịch",
      steps: [
        {
          label: "BEGIN",
          detail: "Bạn mở giao dịch. Từ đây cơ sở dữ liệu biết các câu lệnh tiếp theo thuộc về nhau và chưa coi chúng là xong.",
        },
        {
          label: "Trừ 500.000 đ ở tài khoản A",
          detail: "Số dư A giảm, nhưng thay đổi này mới nằm trong giao dịch. Người khác chưa nhìn thấy trạng thái dở dang này.",
        },
        {
          label: "Máy chủ mất điện",
          detail: "Chương trình chết trước khi cộng cho B. Không có giao dịch thì A đã mất tiền còn B chưa nhận được, và không có gì tự sửa lại.",
        },
        {
          label: "Khởi động lại và khôi phục",
          detail: "Cơ sở dữ liệu đọc nhật ký, thấy giao dịch chưa COMMIT nên huỷ bước trừ. A lại đủ 500.000 đ, như thể chuyện chưa từng xảy ra.",
        },
        {
          label: "COMMIT chỉ khi cả hai bước xong",
          detail: "Khi cộng cho B thành công, COMMIT ép nhật ký xuống đĩa rồi mới báo xác nhận. Từ lúc nhận xác nhận, mất điện cũng không làm mất khoản chuyển.",
        },
      ],
    },
  ],

  "truy-van-cham-va-ke-hoach-thuc-thi": [
    {
      type: "chart",
      title: "Số truy vấn tăng theo dữ liệu: N+1 so với một lần ghép",
      caption: "Số minh hoạ để thấy hình dạng: giả sử mỗi truy vấn tốn vài mili giây cố định. Thời gian thật phụ thuộc máy, mạng và dữ liệu của bạn.",
      kind: "line",
      xLabel: "Số bài viết trên trang",
      yLabel: "Tổng thời gian truy vấn (ms)",
      x: { from: 10, to: 200, step: 10 },
      params: [{ id: "t", label: "Thời gian mỗi truy vấn", min: 1, max: 10, step: 1, value: 3, unit: "ms" }],
      series: [
        { label: "N+1: 1 truy vấn lấy bài + N truy vấn lấy tác giả", expr: "(1 + x) * t" },
        { label: "Ghép bảng: lấy tất cả trong 1 lần", expr: "t * 2" },
      ],
    },
  ],

  "tong-ket-co-so-du-lieu": [
    {
      type: "flow",
      title: "Trang chậm: đo trước khi sửa",
      steps: [
        {
          label: "Đếm số truy vấn của MỘT lần tải trang",
          detail: "Bật nhật ký truy vấn rồi tải trang đúng một lần. Nếu thấy cùng một mẫu câu lệnh lặp lại hàng chục lần, đó là N cộng một.",
        },
        {
          label: "Có lặp: lấy gộp trong một lần",
          detail: "Ghép bảng, hoặc một truy vấn thứ hai lấy toàn bộ tác giả theo danh sách mã. Chỉ mục và bộ nhớ đệm cho từng truy vấn con không đổi được số lượng.",
        },
        {
          label: "Không lặp: tìm một truy vấn thật sự chậm",
          detail: "Chạy kế hoạch thực thi cho đúng truy vấn đó, ở dạng chạy thật để thấy cả số hàng thực tế.",
        },
        {
          label: "Đọc kế hoạch",
          detail: "Quét toàn bảng trên bảng lớn mà chỉ cần vài hàng thì thêm chỉ mục. Số hàng thực tế lệch xa ước tính thì cập nhật thống kê.",
        },
        {
          label: "Đo lại bằng chính phép đo ban đầu",
          detail: "Chạy lại phép đo ở bước một. Không nhanh hơn thì bạn đã sửa nhầm chỗ, và cần quay lại bước hai hoặc ba chứ không thêm cấu hình máy.",
        },
      ],
    },
  ],

  "chon-noi-chay-ung-dung": [
    {
      type: "chart",
      title: "Máy thuê cố định và trả theo lượt gọi: điểm hoà vốn",
      caption: "Giá minh hoạ, không phải bảng giá của nhà cung cấp nào. Biểu đồ chỉ tính tiền mặt, chưa tính giờ bạn dành cho cập nhật, sao lưu, chứng chỉ của máy thuê.",
      kind: "line",
      xLabel: "Số lượt gọi mỗi tháng (nghìn)",
      yLabel: "Chi phí mỗi tháng (USD)",
      x: { from: 0, to: 10000, step: 500 },
      params: [
        { id: "vps", label: "Giá thuê máy cố định mỗi tháng", min: 5, max: 40, step: 1, value: 10, unit: "USD" },
        { id: "gia", label: "Giá mỗi triệu lượt gọi", min: 0.5, max: 5, step: 0.5, value: 2, unit: "USD" },
      ],
      series: [
        { label: "Máy thuê cố định", expr: "vps" },
        { label: "Trả theo lượt gọi", expr: "x / 1000 * gia" },
      ],
    },
  ],

  "ten-mien-va-he-thong-ten-mien": [
    {
      type: "flow",
      title: "Đổi bản ghi A rồi vẫn thấy trang cũ: chuyện gì đang xảy ra",
      steps: [
        {
          label: "Bạn sửa bản ghi A ở nhà cung cấp",
          detail: "Địa chỉ mới đã được lưu ở máy chủ tên miền gốc của bạn. Từ phía bạn, thay đổi đã có hiệu lực.",
        },
        {
          label: "Máy chủ tên miền của nhà mạng còn bản cũ",
          detail: "Nhà mạng đã lưu tạm bản ghi cũ cùng thời hạn sống. Trong thời hạn đó họ không hỏi lại máy chủ gốc.",
        },
        {
          label: "Hệ điều hành và trình duyệt lưu thêm một lớp",
          detail: "Máy của bạn cũng nhớ địa chỉ cũ. Làm mới trang chỉ lấy lại từ những lớp nhớ này, nên không chứng minh được gì.",
        },
        {
          label: "Tra trực tiếp bằng công cụ tra cứu",
          detail: "Công cụ tra cứu hỏi thẳng một máy chủ tên miền cụ thể và bỏ qua lớp nhớ trên máy bạn. Bạn thấy địa chỉ mới đã lan tới đâu.",
        },
        {
          label: "Chờ hết thời hạn sống rồi mới kết luận",
          detail: "Chỉ khi tra trực tiếp vẫn ra địa chỉ cũ thì mới là cấu hình sai. Còn lại thì chờ, đừng đổi tiếp vì đó là cách biến chuyện chờ thành lỗi thật.",
        },
      ],
    },
  ],

  "cau-hinh-va-quan-ly-bi-mat": [
    {
      type: "flow",
      title: "Một bản dựng đi qua ba môi trường",
      steps: [
        {
          label: "Dựng một lần",
          detail: "Công cụ dựng tạo ra một sản phẩm duy nhất. Trong sản phẩm đó không có địa chỉ cơ sở dữ liệu, không có khoá, không có tên môi trường.",
        },
        {
          label: "Môi trường thử nghiệm đọc cấu hình của nó",
          detail: "Cùng sản phẩm chạy với cơ sở dữ liệu thử nghiệm và khoá thử nghiệm đưa vào qua biến môi trường. Bạn kiểm thử đúng thứ sẽ phát hành.",
        },
        {
          label: "Môi trường thật dùng cùng bản dựng",
          detail: "Chỉ bộ cấu hình khác. Thêm một môi trường mới là thêm một bộ cấu hình, không sửa dòng mã nào.",
        },
        {
          label: "Lúc khởi động kiểm biến bắt buộc",
          detail: "Thiếu DATABASE_URL thì dừng ngay và in rõ tên biến thiếu. Không có giá trị mặc định chạy ngầm, nên không có cấu hình ẩn.",
        },
        {
          label: "Bí mật bị lộ thì thay giá trị, không đụng mã",
          detail: "Cấp khoá mới, cập nhật biến môi trường, khởi động lại. Không phải dựng lại hay sửa mã, vì mã chưa bao giờ chứa khoá đó.",
        },
      ],
    },
  ],

  "quy-trinh-phat-hanh-va-quay-lai": [
    {
      type: "flow",
      title: "Đổi tên một cột mà lần phát hành nào cũng quay lại được",
      steps: [
        {
          label: "Lần 1: thêm cột mới",
          detail: "Chỉ thêm, chưa đọc. Mã cũ vẫn chạy bình thường vì nó không biết cột mới tồn tại. Quay lại không mất gì.",
        },
        {
          label: "Lần 2: ghi vào cả hai cột",
          detail: "Mã mới ghi cả cột cũ lẫn cột mới, vẫn đọc cột cũ. Quay lại được vì cột cũ luôn đúng.",
        },
        {
          label: "Lần 3: chuyển sang đọc cột mới",
          detail: "Dữ liệu cũ đã được sao sang cột mới từ trước. Có sự cố thì quay lại mã đọc cột cũ, vì cột cũ vẫn được ghi đủ.",
        },
        {
          label: "Chờ một thời gian",
          detail: "Để tính năng chạy ổn định thật. Mỗi ngày chờ thêm là một ngày bạn còn đường lui rẻ.",
        },
        {
          label: "Lần 4: xoá cột cũ",
          detail: "Đây là bước duy nhất không quay lại được, nên nó đứng riêng và đứng cuối, khi chắc chắn không ai cần bản cũ nữa.",
        },
      ],
    },
  ],

  "https-va-chung-chi-so": [
    {
      type: "feynman",
      title: "Cái ổ khoá chứng minh gì, và không chứng minh gì",
      intro: "Hình dung bạn nhận một gói hàng. Phong bì dán kín nghĩa là giữa đường không ai mở xem được, và người giao hàng đưa thẻ nhân viên của hãng giao hàng. Nhưng không phong bì nào cho bạn biết người gửi có lương thiện hay không.",
      columns: ["Điều cần biết", "Chuyện đời thường", "Trên web"],
      rows: [
        ["Giữa đường có bị đọc hay sửa không", "Phong bì dán kín, bóc ra là biết", "Mã hoá: không ai trên đường truyền đọc hay sửa được dữ liệu"],
        ["Người giao có đúng là người của hãng", "Kiểm thẻ nhân viên trước khi nhận hàng", "Xác thực: bạn nói chuyện với đúng tên miền trên thanh địa chỉ"],
        ["Người gửi có lương thiện không", "Thẻ nhân viên không nói gì về người gửi", "Ổ khoá không nói gì: trang lừa đảo xin được chứng chỉ cho tên miền của chính nó"],
        ["Hàng được cất thế nào khi về kho", "Phong bì chỉ lo đoạn đường, không lo kho", "HTTPS không lo việc lưu, băm mật khẩu, phân quyền sau khi dữ liệu tới nơi"],
      ],
      oneLiner: "Ổ khoá nghĩa là đường truyền kín và đúng tên miền, không nghĩa là trang đó đáng tin.",
    },
  ],

  "luu-mat-khau-nguoi-dung-dung-cach": [
    {
      type: "flow",
      title: "Đăng ký và đăng nhập khi máy chủ không giữ mật khẩu",
      steps: [
        {
          label: "Đăng ký: tạo muối ngẫu nhiên",
          detail: "Mỗi người dùng nhận một giá trị ngẫu nhiên riêng. Hai người cùng đặt mật khẩu giống nhau vẫn sẽ có hai muối khác nhau.",
        },
        {
          label: "Trộn muối với mật khẩu rồi băm chậm",
          detail: "Hàm băm mật khẩu cố ý tốn khoảng một phần mười giây mỗi lần. Người dùng không thấy khác biệt, nhưng kẻ dò hàng loạt thì bị chậm đi hàng triệu lần.",
        },
        {
          label: "Lưu muối và kết quả băm",
          detail: "Cơ sở dữ liệu chỉ chứa hai thứ này. Mật khẩu gốc không được ghi vào bất kỳ đâu, kể cả nhật ký.",
        },
        {
          label: "Đăng nhập: lấy muối của đúng người đó",
          detail: "Máy chủ tìm tài khoản, lấy muối đã lưu rồi băm mật khẩu vừa nhập theo cách y hệt lúc đăng ký.",
        },
        {
          label: "So hai kết quả băm",
          detail: "Khớp thì cho vào. Sai thì báo chung là thông tin không đúng, không nói riêng mật khẩu sai, để kẻ tấn công không biết tài khoản có tồn tại hay không.",
        },
      ],
    },
  ],

  "ba-lo-hong-pho-bien-nhat": [
    {
      type: "feynman",
      title: "Ba lỗ hổng, một chỗ hở: lệnh và dữ liệu lẫn vào nhau",
      intro: "Bạn đưa nhân viên kho một phiếu ghi sẵn: lấy hàng cho khách tên .... Nếu khách điền tên là 'An, rồi mở két trả luôn cho tôi', nhân viên làm theo thì phiếu đã bị người điền biến thành lệnh.",
      columns: ["Lỗ hổng", "Chuyện đời thường", "Cách chặn"],
      rows: [
        ["Tiêm nhiễm truy vấn", "Tên khách điền vào ô trở thành một lệnh của nhân viên kho", "Truy vấn tham số hoá: câu lệnh và giá trị đi riêng, giá trị không được đọc như lệnh"],
        ["Chèn kịch bản", "Lời nhắn của khách bị đọc to lên như một chỉ thị của cửa hàng", "Mã hoá đầu ra theo đúng ngữ cảnh nó xuất hiện trên trang"],
        ["Giả mạo yêu cầu liên trang", "Ai đó nhờ bạn ký giấy thay mình, bạn ký vì tưởng giấy của chính mình", "Giá trị bí mật gửi kèm mỗi biểu mẫu, cộng giới hạn phạm vi gửi kèm của thông tin phiên"],
      ],
      oneLiner: "Chặn bằng cách tách dữ liệu khỏi lệnh, đừng cố đoán ký tự nào nguy hiểm để lọc.",
    },
  ],

  "thu-thap-va-giu-du-lieu-nguoi-dung": [
    {
      type: "flow",
      title: "Đường đi của một trường dữ liệu: từ biểu mẫu tới lúc bị xoá",
      steps: [
        {
          label: "Biểu mẫu đăng ký hỏi gì",
          detail: "Với mỗi ô, hỏi: nếu không có ô này thì sản phẩm có chạy được không. Không cần thì bỏ, vì dữ liệu không tồn tại không thể bị lộ.",
        },
        {
          label: "Lưu kèm thời hạn",
          detail: "Mỗi loại dữ liệu có một mục đích và một ngày hết hạn. Hết mục đích là xoá tự động, không để dữ liệu cũ nằm lại như tài sản vô hại.",
        },
        {
          label: "Hiển thị chỉ đủ để nhận ra",
          detail: "Số điện thoại hiện vài số cuối, thư điện tử hiện chữ đầu. Người dùng nhận ra mình, người nhìn qua vai thì không dùng được.",
        },
        {
          label: "Nhật ký không ghi nội dung nhạy cảm",
          detail: "Gỡ lỗi chỉ ghi mã yêu cầu và trạng thái, không ghi nguyên thân yêu cầu. Nhiều người xem được nhật ký hơn cơ sở dữ liệu.",
        },
        {
          label: "Yêu cầu xoá đi tới đâu thì xoá tới đó",
          detail: "Người dùng đòi xoá, bạn cần biết dữ liệu của họ nằm ở bảng nào, bản sao lưu nào, nhật ký nào, hệ thống phân tích nào. Chưa lập danh mục thì chưa làm được.",
        },
      ],
    },
  ],

  "tong-ket-dua-san-pham-ra-ngoai": [
    {
      type: "flow",
      title: "Cách chứng minh một bản sao lưu dùng được",
      steps: [
        {
          label: "Lấy bản sao lưu mới nhất",
          detail: "Dùng đúng tệp mà việc sao lưu hằng đêm tạo ra, không tạo một bản riêng cho buổi thử, vì bạn cần thử đúng thứ sẽ phải dùng thật.",
        },
        {
          label: "Khôi phục vào một nơi riêng",
          detail: "Dựng một cơ sở dữ liệu trống ở chỗ khác, không đè lên bản đang chạy. Nếu bước này lỗi, bạn vừa phát hiện chuyện đó lúc còn rẻ.",
        },
        {
          label: "Đếm bảng và số hàng, so với bản gốc",
          detail: "Tệp rỗng hay thiếu bảng lộ ra ngay ở bước này. Số hàng lệch nhiều so với bản gốc nghĩa là sao lưu bỏ sót gì đó.",
        },
        {
          label: "Chạy một truy vấn có thật của sản phẩm",
          detail: "Ví dụ đăng nhập thử một tài khoản hoặc mở một đơn hàng cũ. Dữ liệu có đủ mà ứng dụng đọc không ra thì cũng chưa phải là khôi phục.",
        },
        {
          label: "Bấm giờ và viết thành quy trình",
          detail: "Ghi từng lệnh và thời gian khôi phục mất bao lâu. Lúc sự cố, bốn dòng viết sẵn quý hơn bốn dòng nghĩ ra lúc ba giờ sáng.",
        },
      ],
    },
  ],

  "don-bay-ky-nang-trong-nghe-lap-trinh": [
    {
      type: "scenario",
      title: "Bạn có ba năm kinh nghiệm và một quý để đầu tư vào bản thân",
      start: "mo-dau",
      nodes: {
        "mo-dau": {
          text: "Bạn là lập trình viên ba năm kinh nghiệm ở một công ty có mảng thanh toán. Bạn muốn thu nhập tăng rõ rệt trong hai năm tới và có thể dành vài giờ mỗi tuần. Bạn đầu tư vào đâu trước?",
          choices: [
            { label: "Học thêm ngôn ngữ lập trình thứ tư vào cuối tuần", next: "ngon-ngu" },
            { label: "Ngồi cùng bộ phận vận hành để hiểu mảng thanh toán", next: "nghiep-vu" },
            { label: "Học một công nghệ mà cả nước chỉ vài chục người biết", next: "hiem" },
          ],
        },
        "ngon-ngu": {
          text: "Sau hai tháng bạn viết được ngôn ngữ thứ tư ở mức cơ bản. Giờ bạn làm gì với nó?",
          choices: [
            { label: "Ghi thêm vào hồ sơ rồi chờ nhà tuyển dụng liên hệ", next: "ket-cong-don" },
            { label: "Dùng nó viết công cụ nhỏ cho đúng mảng thanh toán đang làm", next: "nghiep-vu" },
          ],
        },
        "hiem": {
          text: "Bạn học xong và đúng là rất ít người trong nước biết công nghệ này. Bước tiếp theo?",
          choices: [
            { label: "Học sâu thêm, vì hiếm thì chắc chắn sẽ được trả cao", next: "ket-hiem" },
            { label: "Đếm xem có bao nhiêu nơi thật sự cần rồi mới quyết", next: "nghiep-vu" },
          ],
        },
        "nghiep-vu": {
          text: "Bạn đã hiểu cách tiền đi qua hệ thống: đối soát, hoàn tiền, đơn lỗi. Một sự cố thanh toán xảy ra và mọi người nhìn về phía bạn. Bạn xử lý thế nào?",
          choices: [
            { label: "Sửa đúng chỗ báo lỗi rồi chờ yêu cầu tiếp theo", next: "ket-thuc-hien" },
            { label: "Tìm nguyên nhân gốc ở quy trình, đề xuất sửa trước khi được hỏi", next: "ket-nguoi-duoc-hoi" },
          ],
        },
        "ket-cong-don": {
          text: "Hồ sơ giờ dài hơn một dòng. Nhưng người biết mười thứ ở mức trung bình thì đầy thị trường, nên không ai trả thêm cho một mục nữa trong danh sách. Bạn cộng thêm một kỹ năng mà chưa nhân lên được kỹ năng nào.",
          ending: "bad",
        },
        "ket-hiem": {
          text: "Công nghệ đó hiếm thật, nhưng sau ba tháng tìm bạn chỉ thấy hai nơi dùng và cả hai đã đủ người. Hiếm chỉ là một vế của khan hiếm, vế còn lại là có nơi thật sự cần, và bạn đã đầu tư mà không kiểm vế đó.",
          ending: "bad",
        },
        "ket-thuc-hien": {
          text: "Bạn sửa đúng và nhanh, nhưng vẫn là người nhận yêu cầu đã được viết sẵn. Sau hai năm bạn giỏi hơn về kỹ thuật, còn vị trí thì chưa đổi: người ta vẫn không hỏi ý bạn trước khi viết yêu cầu.",
          ending: "bad",
        },
        "ket-nguoi-duoc-hoi": {
          text: "Bạn trở thành người duy nhất vừa đọc được mã vừa hiểu nghiệp vụ của mảng này. Từ sau sự cố đó, trưởng nhóm hỏi ý bạn trước khi yêu cầu được viết ra. Đòn bẩy của bạn đến từ chỗ giao nhau giữa hai lĩnh vực.",
          ending: "good",
        },
      },
    },
  ],

  "biet-gia-thi-truong-cua-minh": [
    {
      type: "scenario",
      title: "Chuẩn bị con số trước buổi trao đổi về lương",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Tuần sau bạn có buổi trao đổi về mức lương với một công ty bạn muốn vào. Bạn cần một con số trong đầu. Bạn lấy nó từ đâu?",
          choices: [
            { label: "Lương hiện tại cộng thêm khoảng một phần mười", next: "ket-luong-cu" },
            { label: "Tổng chi phí sinh hoạt hằng tháng của mình cộng dư", next: "ket-sinh-hoat" },
            { label: "Gom dải từ tin tuyển dụng, báo cáo ngành và người trong nghề", next: "ba-nguon" },
          ],
        },
        "ba-nguon": {
          text: "Ba nguồn cho ba dải hơi lệch nhau: tin tuyển dụng ghi thấp nhất, báo cáo ngành ở giữa, một người quen cùng nghề nói cao hơn cả. Bạn xử lý chỗ lệch này thế nào?",
          choices: [
            { label: "Lấy trung bình ba con số làm mức duy nhất cần xin", next: "ket-trung-binh" },
            { label: "Bỏ nguồn lệch nhất vì coi đó là nhiễu của số liệu", next: "ket-bo-nguon" },
            { label: "Tìm xem hai nguồn lệch nhau vì quy mô hay cấp bậc khác nhau", next: "ket-tim-bien" },
          ],
        },
        "ket-luong-cu": {
          text: "Con số này kế thừa mọi sai lệch của lần đàm phán trước. Nếu hiện giờ bạn đang được trả thấp hơn thị trường thì lần này bạn vẫn bị trả thấp, chỉ là thấp theo tỷ lệ cộng thêm.",
          ending: "bad",
        },
        "ket-sinh-hoat": {
          text: "Chi phí sinh hoạt đo nhu cầu của bạn, nhưng công ty mua giá trị công việc chứ không mua nhu cầu của bạn. Con số này có thể thấp hơn hoặc cao hơn thị trường mà bạn không có cách nào biết.",
          ending: "bad",
        },
        "ket-trung-binh": {
          text: "Một con số trung bình che mất cả dải và không nói bạn đứng ở đâu trong dải. Bạn cũng mất chỗ để lùi hay tiến khi bên kia đưa một mức khác.",
          ending: "bad",
        },
        "ket-bo-nguon": {
          text: "Nguồn lệch nhất có thể chính là nguồn cho biết một biến bạn chưa lọc, ví dụ người quen làm ở tập đoàn lớn còn bạn nhắm tới công ty ba mươi người. Bỏ đi thì bạn bỏ luôn manh mối này.",
          ending: "bad",
        },
        "ket-tim-bien": {
          text: "Bạn thấy tin có mức thấp nhất là của công ty nhỏ, còn người quen làm ở công ty lớn. Lọc lại theo quy mô và cấp bậc của đúng chỗ bạn nhắm tới, bạn có một dải hai số và biết mình đứng ở đâu trong dải đó.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Từ ba nguồn tới một dải bạn dùng được",
      steps: [
        {
          label: "Chọn bộ lọc trước khi tìm",
          detail: "Ghi ra cấp bậc, ngành, quy mô công ty và địa điểm của chỗ bạn nhắm tới. Chức danh giống nhau ở công ty ba mươi người và ở tập đoàn lớn là hai phạm vi công việc khác nhau.",
        },
        {
          label: "Thu từng nguồn theo đúng bộ lọc",
          detail: "Tin tuyển dụng có ghi lương, báo cáo lương ngành, và vài người trong nghề. Mỗi nguồn cho bạn một dải, không phải một con số.",
        },
        {
          label: "Ghi dải bằng hai số",
          detail: "Thấp nhất và cao nhất, đừng quy về trung bình. Nhớ rằng mức trong tin tuyển dụng thường là mức khởi điểm, còn báo cáo ngành thường trễ khoảng một năm.",
        },
        {
          label: "Tìm biến gây chênh lệch giữa các nguồn",
          detail: "Hai nguồn lệch nhau là thông tin. Hỏi xem chúng khác nhau ở quy mô, cấp bậc hay loại hình doanh nghiệp, rồi lọc lại.",
        },
        {
          label: "Đổi câu hỏi",
          detail: "Từ tôi muốn bao nhiêu sang tôi đứng ở đâu trong dải này. Đó là câu hỏi bạn trả lời được bằng bằng chứng.",
        },
      ],
    },
  ],
};
