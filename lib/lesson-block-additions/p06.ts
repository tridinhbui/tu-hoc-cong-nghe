import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track personal - đợt 06. Một người viết cho một tệp.
export const P06_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "he-dieu-hanh-lam-gi": [
    {
      type: "exercise",
      language: "python",
      title: "Tự làm bộ lập lịch chia lát thời gian",
      task: "Ba tiến trình cần chạy: A cần 5ms, B cần 2ms, C cần 4ms. Mỗi lần bộ lập lịch chỉ cho một tiến trình chạy tối đa 3ms (một lát) rồi xếp nó xuống cuối hàng nếu chưa xong. In mỗi lát trên một dòng theo mẫu \"A: 3ms (còn 2)\". Mã hiện cho mỗi tiến trình chạy một mạch tới hết, nên không có tiến trình nào bị cắt ngang.",
      starter:
        "from collections import deque\n\nhang = deque([(\"A\", 5), (\"B\", 2), (\"C\", 4)])\nlat = 3\n\nwhile hang:\n    ten, con = hang.popleft()\n    print(f\"{ten}: {con}ms (còn 0)\")\n",
      solution:
        "from collections import deque\n\nhang = deque([(\"A\", 5), (\"B\", 2), (\"C\", 4)])\nlat = 3\n\nwhile hang:\n    ten, con = hang.popleft()\n    chay = min(lat, con)\n    con -= chay\n    print(f\"{ten}: {chay}ms (còn {con})\")\n    if con > 0:\n        hang.append((ten, con))\n",
      expectedOutput: "A: 3ms (còn 2)\nB: 2ms (còn 0)\nC: 3ms (còn 1)\nA: 2ms (còn 0)\nC: 1ms (còn 0)",
      hints: [
        "Một lát chạy được min(lat, con) mili giây: tiến trình còn ít hơn một lát thì chạy hết phần còn lại rồi thôi.",
        "Sau khi trừ thời gian đã chạy, chỉ tiến trình còn con > 0 mới được xếp lại cuối hàng bằng hang.append.",
      ],
    },
  ],

  "dong-lenh-bon-lenh-dau-tien": [
    {
      type: "sim",
      tool: "terminal",
      mission: "ls-project",
      title: "Đi vào thư mục dự án và xem có gì trong đó",
      task: "Dùng lệnh cd để vào thư mục du-an, rồi dùng ls để liệt kê các tệp bên trong. Nếu lạc đường, gõ pwd để biết mình đang ở đâu.",
    },
  ],

  "muc-tieu-hoc-va-cach-do-tien-bo": [
    {
      type: "scenario",
      title: "Kẹt ở buổi thứ ba của mục tiêu \"trang ghi chú\"",
      start: "kẹt",
      nodes: {
        kẹt: {
          text: "Mục tiêu của bạn là dựng một trang ghi chú lưu được dữ liệu và đưa lên mạng. Buổi thứ ba, bạn đã vật lộn 30 phút với một lỗi khiến trang không hiện chữ nào. Bạn làm gì tiếp?",
          choices: [
            { label: "Ghi lại thông báo lỗi và mã, rồi đem đi hỏi hoặc tra tài liệu", next: "hoi" },
            { label: "Thử thêm hai tiếng nữa, chưa chịu hỏi hay tra ai cả", next: "cang" },
            { label: "Chép một đoạn mã tương tự trên mạng, chạy được là xong", next: "chep" },
          ],
        },
        hoi: {
          text: "Sau 20 phút bạn biết lỗi nằm ở tên tệp viết sai chữ hoa chữ thường. Trang hiện chữ, buổi học còn 40 phút. Bạn kết thúc buổi thế nào?",
          choices: [
            { label: "Ghi nhật ký ba dòng: làm gì, kẹt ở đâu, thoát bằng cách nào", next: "nhatky" },
            { label: "Tắt máy luôn, mai chắc mình sẽ nhớ lại được mọi chuyện", next: "quen" },
          ],
        },
        nhatky: {
          text: "Một tháng sau đọc lại, bạn thấy mình từng mất 30 phút cho một lỗi mà giờ chỉ cần nhìn là ra. Đó là bằng chứng tiến bộ đáng tin hơn số giờ đã học.",
          ending: "good",
        },
        quen: {
          text: "Tuần sau lỗi tên tệp lặp lại và bạn mất thêm 30 phút, vì không còn dòng nào ghi lại lần trước thoát bằng cách nào. Không có nhật ký, bạn cũng không có gì để thấy mình đã tiến bộ.",
          ending: "bad",
        },
        cang: {
          text: "Cả buổi trôi qua cho một lỗi, lỗi vẫn còn, và bạn thấy mình giậm chân. Hôm sau bạn quyết định thế nào?",
          choices: [
            { label: "Đặt ngưỡng 30 phút: quá ngưỡng thì hỏi hoặc ghi lại rồi gác", next: "nguong" },
            { label: "Bỏ trang ghi chú, chuyển sang một khoá học khác cho nhẹ đầu", next: "bo" },
          ],
        },
        nguong: {
          text: "Từ nay bạn tự vật lộn đúng 30 phút đầu, phần dạy được nhiều nhất, rồi đi hỏi. Buổi học nào cũng kết thúc bằng một thứ chạy được.",
          ending: "good",
        },
        bo: {
          text: "Khoá mới có bài dễ hơn nên vài tuần đầu thấy ổn, nhưng mục tiêu cũ chưa bao giờ xong. Không có sản phẩm nào để kiểm chứng, đến tháng thứ tư bạn lại không trả lời được mình có tiến bộ không.",
          ending: "bad",
        },
        chep: {
          text: "Trang chạy được. Nhưng khi bạn thử đóng tài liệu lại và tự viết từ đầu thì không viết nổi dòng nào. Bạn làm gì?",
          choices: [
            { label: "Đóng đoạn mã lại, tự viết lại từ đầu dù chậm và sai nhiều", next: "viet" },
            { label: "Coi như đã hiểu vì chạy được rồi, sang bài tiếp theo thôi", next: "ao" },
          ],
        },
        viet: {
          text: "Lần viết lại này chậm và sai vài chỗ, nhưng đó chính là lúc việc học xảy ra. Lần sau bạn tạo ra được lời giải, không chỉ nhận ra nó.",
          ending: "good",
        },
        ao: {
          text: "Cảm giác hiểu bài chỉ chứng minh bạn nhận ra được lời giải. Ba buổi sau gặp lỗi tương tự, bạn không tự sửa nổi và phải chép tiếp, nên vòng lặp này cứ lặp lại.",
          ending: "bad",
        },
      },
    },
    {
      type: "flow",
      title: "Từ mục tiêu mơ hồ tới một buổi học có kết quả",
      steps: [
        {
          label: "Phát biểu thành sản phẩm",
          detail: "\"Học JavaScript cho vững\" không có ngày kết thúc. Đổi thành \"dựng trang ghi chú lưu được dữ liệu và đưa lên mạng\" là có trạng thái xong để người khác mở lên kiểm trong mười giây.",
        },
        {
          label: "Chia tới mức một buổi",
          detail: "Mỗi buổi chốt bằng một thứ nhìn thấy được: một trang hiển thị đúng, một lệnh chạy đúng hoặc một lỗi đã sửa.",
        },
        {
          label: "Làm và chạm ngưỡng kẹt",
          detail: "Tự vật lộn trong 30 phút đầu, không tra lời giải. Chạm ngưỡng thì hỏi, tìm tài liệu hoặc ghi lại rồi tạm gác.",
        },
        {
          label: "Thử bằng cách tự viết lại",
          detail: "Đóng tài liệu, tự viết lại từ đầu. Chậm và sai nhiều là bình thường, vì đây là phép thử duy nhất phân biệt nhận ra lời giải với tạo ra lời giải.",
        },
        {
          label: "Ghi nhật ký ba dòng",
          detail: "Hôm nay làm gì, kẹt ở đâu, thoát bằng cách nào. Cuối tháng đọc lại nhật ký tháng trước để thấy mình đã đi được bao xa.",
        },
      ],
    },
  ],

  "http-phuong-thuc-va-ma-trang-thai": [
    {
      type: "flow",
      title: "Một yêu cầu đi qua hai đầu: GET /sp/9",
      steps: [
        {
          label: "Máy khách ghép yêu cầu",
          detail: "Phương thức GET, đường dẫn /sp/9, kèm phần đầu như định dạng mong muốn. GET nghĩa là chỉ đọc, nên không có nội dung gửi kèm.",
        },
        {
          label: "Máy chủ chọn xử lý theo phương thức và đường dẫn",
          detail: "Cặp GET + /sp/:id được chuyển tới đoạn mã tra một sản phẩm theo id. Nếu phương thức lạ với đường dẫn này, nó phải trả 405.",
        },
        {
          label: "Tra trong kho",
          detail: "Không có sản phẩm số 9. Máy chủ không hỏng, yêu cầu cũng không sai khuôn: chỉ là thứ bạn xin không tồn tại.",
        },
        {
          label: "Máy chủ chọn mã trạng thái",
          detail: "Trả 404, thuộc nhóm bắt đầu bằng 4: lỗi nằm ở yêu cầu, không phải ở máy chủ.",
        },
        {
          label: "Máy khách đọc nhóm mã để quyết định",
          detail: "Nhóm 4 thì gửi lại y hệt chỉ cho đúng kết quả đó, nên không thử lại tự động mà sửa yêu cầu. Nếu là 503 (nhóm 5) thì thử lại mới có ý nghĩa.",
        },
      ],
    },
  ],

  "json-va-cach-doc-tai-lieu-api": [
    {
      type: "flow",
      title: "Từ chuỗi JSON nhận về tới dữ liệu dùng được",
      steps: [
        {
          label: "Nhận một chuỗi",
          detail: "Phản hồi chỉ là văn bản, ví dụ {\"tien\":\"1500000\",\"luc\":\"2026-03-04T10:00:00Z\"}. Chưa có kiểu số hay kiểu ngày nào cả.",
        },
        {
          label: "Phân tích thành đối tượng",
          detail: "JSON.parse biến chuỗi thành đối tượng, mảng, chuỗi, số, đúng sai hoặc rỗng. Không có kiểu ngày tháng: trường luc vẫn là một chuỗi.",
        },
        {
          label: "Kiểm khuôn ngay tại biên",
          detail: "Trường nào bắt buộc mà vắng thì dừng ở đây và báo rõ. Để lọt vào trong, nó thành giá trị rỗng rồi nổ ở một chỗ khác mà bạn mất hàng giờ truy ngược.",
        },
        {
          label: "Đổi kiểu một lần, có chủ đích",
          detail: "Tiền dạng chuỗi được đổi sang số khi cần tính toán, chuỗi ISO được đổi thành ngày. Trường ghi chú có thể là null hoặc vắng hẳn, nên cho nó một giá trị thay thế.",
        },
        {
          label: "Đưa vào phần nghiệp vụ",
          detail: "Từ đây mã của bạn chỉ làm việc với dữ liệu đã sạch và đã đúng kiểu, không phải đoán lại hình dạng của bên kia.",
        },
      ],
    },
  ],

  "goi-api-dau-tien-tu-dong-lenh-toi-ma": [
    {
      type: "flow",
      title: "Lượt gọi đầu tiên: từ curl tới mã",
      steps: [
        {
          label: "Cất khoá vào biến môi trường",
          detail: "Khoá nằm trong $API_KEY, không nằm trong mã hay tệp cấu hình cùng thư mục. Đẩy nhầm lên kho là phải thu hồi khoá, xoá tệp là chưa đủ.",
        },
        {
          label: "Gọi bằng curl -i",
          detail: "Bạn thấy nguyên dòng trạng thái và phần đầu phản hồi, không có mã của bạn xen vào. Chỉ còn hai nghi phạm nếu lỗi: khoá và địa chỉ.",
        },
        {
          label: "Ghi lại đúng tham số vừa chạy được",
          detail: "Địa chỉ, phần đầu Authorization, tham số gioi_han=2. Khi sang mã, giữ nguyên chúng để không quay lại cảnh có năm nghi phạm.",
        },
        {
          label: "Chuyển vào mã, tách lớp riêng",
          detail: "Phần gọi API nằm trong một hàm riêng, nghiệp vụ gọi vào nó. Đặt luôn thời gian chờ tối đa vì mặc định của nhiều thư viện là chờ gần như vô hạn.",
        },
        {
          label: "Ghi nhật ký, không ghi khoá",
          detail: "Ghi điểm truy cập, mã trạng thái và thời gian phản hồi của cả lượt thành công để thấy xu hướng chậm dần. Khoá và dữ liệu nhạy cảm không được vào nhật ký.",
        },
      ],
    },
  ],

  "tham-so-bo-loc-va-phan-trang-api": [
    {
      type: "chart",
      title: "Phân trang bằng offset đọc bao nhiêu hàng",
      caption: "Số minh hoạ, không đo từ một hệ thống thật. Offset phải đọc rồi vứt đi mọi hàng của các trang trước, còn con trỏ chỉ lấy đúng một trang kể từ vị trí đã đánh dấu. Kéo cỡ trang để thấy khoảng cách mở rộng thế nào.",
      kind: "line",
      xLabel: "Trang cần lấy (bắt đầu từ 0)",
      yLabel: "Số hàng máy chủ phải đọc",
      x: { from: 0, to: 1000, step: 100 },
      params: [{ id: "co", label: "Cỡ một trang", min: 10, max: 200, step: 10, value: 20, unit: "hàng" }],
      series: [
        { label: "Offset (bỏ qua rồi lấy tiếp)", expr: "x * co + co" },
        { label: "Con trỏ (lọc tiếp từ hàng cuối)", expr: "co" },
      ],
    },
  ],

  "xac-thuc-khoa-api-va-ma-thong-bao": [
    {
      type: "feynman",
      title: "Ba cách chứng minh \"tôi được phép\"",
      intro:
        "Hãy nghĩ tới việc ra vào một toà nhà. Chìa khoá cứng mở cửa cho bất kỳ ai cầm nó. Thẻ khách tạm thời hết hạn cuối ngày. Còn giấy uỷ quyền thì chủ nhà tự ký ngay tại quầy lễ tân, và người được uỷ quyền không bao giờ biết chủ nhà giữ chìa khoá nào.",
      columns: ["Cơ chế", "Giống gì ngoài đời", "Bị lộ thì sao / Người dùng kiểm soát"],
      rows: [
        ["Khoá API", "Chìa khoá cứng của ứng dụng", "Mở được tới khi bạn thu hồi và cấp khoá mới — Không có, nó định danh ứng dụng"],
        ["Mã thông báo", "Thẻ khách có hạn dùng ngắn", "Thiệt hại giới hạn trong khoảng thời gian còn hạn — Gián tiếp, qua phiên đăng nhập"],
        ["Uỷ quyền nhiều bước", "Giấy uỷ quyền ký tại quầy", "Bạn không có mật khẩu để mà lộ — Cho phép và thu hồi bất cứ lúc nào"],
      ],
      oneLiner:
        "Khoá định danh ứng dụng, mã thông báo định danh một phiên, uỷ quyền để người dùng tự mở cửa cho bạn mà không đưa mật khẩu.",
    },
  ],

  "gioi-han-tan-suat-va-thu-lai": [
    {
      type: "chart",
      title: "Thời gian chờ tăng gấp đôi sau mỗi lần lỗi",
      caption: "Số minh hoạ. Chờ cố định thì mọi lần thử cách nhau như nhau và dội đều vào dịch vụ đang quá tải; chờ giãn dần cho nó thời gian hồi phục, còn trần chặn việc chờ vô hạn. Kéo mức chờ ban đầu và trần để xem đường cong đổi.",
      kind: "line",
      xLabel: "Lần thử lại thứ",
      yLabel: "Thời gian chờ tối đa (ms)",
      x: { from: 0, to: 8, step: 1 },
      params: [
        { id: "dau", label: "Chờ lần đầu", min: 100, max: 1000, step: 100, value: 500, unit: "ms" },
        { id: "tran", label: "Trần thời gian chờ", min: 2000, max: 30000, step: 1000, value: 30000, unit: "ms" },
      ],
      series: [
        { label: "Chờ cố định", expr: "dau" },
        { label: "Giãn dần gấp đôi, có trần", expr: "min(tran, dau * 2 ^ x)" },
      ],
    },
  ],

  "xu-ly-loi-khi-goi-dich-vu-ngoai": [
    {
      type: "flow",
      title: "Đẩy việc gửi thư vào hàng đợi để dịch vụ thư chậm không chặn bán hàng",
      steps: [
        {
          label: "Người dùng bấm đặt hàng",
          detail: "Ứng dụng kiểm tra tồn kho và lưu đơn. Đây là phần thiết yếu, nên nếu nó hỏng thì phải báo rõ và dừng luồng lại.",
        },
        {
          label: "Đơn được lưu",
          detail: "Dữ liệu đơn đã nằm trong cơ sở dữ liệu của bạn. Từ đây phần việc còn lại đều là bổ trợ, không cần xong trước khi trả lời.",
        },
        {
          label: "Việc gửi thư vào hàng đợi",
          detail: "Ứng dụng chỉ ghi một dòng \"gửi thư xác nhận cho đơn này\" vào hàng đợi, mất vài mili giây, không gọi dịch vụ thư ở bước này.",
        },
        {
          label: "Trả lời người dùng ngay",
          detail: "Người dùng thấy \"Đặt hàng thành công\" ngay. Nếu gọi thẳng dịch vụ thư đang chậm, họ sẽ chờ ba mươi giây và luồng xử lý bị giữ suốt khoảng đó.",
        },
        {
          label: "Một tiến trình khác lấy việc ra gửi",
          detail: "Dịch vụ thư lỗi thì việc nằm lại và được thử lại sau. Thư đến muộn vài phút còn tốt hơn là cả cửa hàng ngừng bán.",
        },
      ],
    },
  ],

  "webhook-khi-dich-vu-goi-nguoc-lai": [
    {
      type: "flow",
      title: "Đường đi của một webhook ở phía bạn",
      steps: [
        {
          label: "Nhà cung cấp gửi một yêu cầu POST tới địa chỉ của bạn",
          detail: "Nội dung mô tả sự kiện, ví dụ đơn hàng đã thanh toán, kèm chữ ký ký bằng bí mật chung và một mã sự kiện.",
        },
        {
          label: "Tính lại chữ ký và đối chiếu",
          detail: "Làm việc này đầu tiên. Địa chỉ nhận nằm công khai, nên chữ ký không khớp thì bỏ yêu cầu, nếu không ai cũng tự báo mình đã thanh toán được.",
        },
        {
          label: "Kiểm mã sự kiện đã xử lý chưa",
          detail: "Nhà cung cấp thường đảm bảo ít nhất một lần, không phải đúng một lần. Gặp mã đã lưu thì bỏ qua, nhờ vậy gửi lại không tạo hai bản ghi.",
        },
        {
          label: "Đẩy việc vào hàng đợi và trả về thành công ngay",
          detail: "Nhà cung cấp chỉ chờ vài giây rồi coi là thất bại và gửi lại. Xử lý nặng ở đây thì vượt thời gian chờ.",
        },
        {
          label: "Xử lý sau, bỏ sự kiện cũ hơn trạng thái hiện tại",
          detail: "Thứ tự nhận không phải thứ tự phát sinh. Nếu đơn đã ở trạng thái đã giao thì sự kiện đã xác nhận đến muộn phải bị bỏ qua.",
        },
      ],
    },
  ],

  "tong-ket-ghep-dich-vu-ngoai": [
    {
      type: "flow",
      title: "Lớp trung gian mỏng bọc quanh dịch vụ ngoài",
      steps: [
        {
          label: "Mã nghiệp vụ gọi vào hàm của bạn",
          detail: "Ví dụ guiThuXacNhan(donHang). Mã nghiệp vụ không biết nhà cung cấp thư nào đang đứng sau và không import thư viện của họ.",
        },
        {
          label: "Lớp trung gian đặt thời gian chờ và kiểm bộ nhớ đệm",
          detail: "Mọi lượt gọi ra ngoài đều có thời gian chờ tối đa, và kết quả lặp lại được thì lấy từ bộ nhớ đệm thay vì gọi lại.",
        },
        {
          label: "Cầu dao ngắt mạch quyết định có gọi hay không",
          detail: "Sau nhiều lỗi liên tiếp, lớp này ngừng gọi hẳn một khoảng để cho bên kia hồi phục và không treo luồng của bạn.",
        },
        {
          label: "Gọi dịch vụ ngoài, thử lại đúng lỗi",
          detail: "Chỉ lỗi có khả năng tự khỏi mới thử lại, với thời gian chờ giãn dần. Mọi lượt gọi được ghi nhật ký: điểm truy cập, mã trạng thái, thời gian phản hồi.",
        },
        {
          label: "Trả về kết quả theo khuôn của bạn",
          detail: "Khuôn dữ liệu của nhà cung cấp dừng lại ở đây. Đổi nhà cung cấp thì sửa một chỗ, thay vì hàng trăm chỗ rải khắp mã.",
        },
      ],
    },
  ],

  "bang-cot-kieu-du-lieu-va-rang-buoc": [
    {
      type: "feynman",
      title: "Ràng buộc là người gác cổng chung của mọi đường ghi",
      intro:
        "Hãy nghĩ tới một toà chung cư. Người gác ở cổng chính chỉ kiểm được ai đi qua cổng chính. Nếu có một cổng sau mà ai cũng ra vào được thì việc kiểm soát ở cổng chính vô nghĩa. Ràng buộc trong cơ sở dữ liệu giống người gác ở cánh cửa duy nhất mà mọi lượt ghi đều phải đi qua.",
      columns: ["Ràng buộc", "Giống gì ngoài đời", "Chặn gì"],
      rows: [
        ["NOT NULL", "Ô bắt buộc trong đơn đăng ký", "Hàng thiếu giá trị ở cột bắt buộc"],
        ["UNIQUE", "Biển số xe không thể trùng nhau", "Hai hàng có cùng giá trị, kể cả khi hai lượt ghi đến cùng lúc"],
        ["CHECK", "Số lượng hàng không thể âm", "Giá trị vi phạm điều luôn đúng theo bản chất dữ liệu"],
        ["Giá trị mặc định", "Ô được điền sẵn \"Việt Nam\"", "Không chặn gì, chỉ điền sẵn khi bỏ trống là chuyện thường gặp"],
      ],
      oneLiner:
        "Kiểm tra trong mã chỉ canh được đường ghi bạn viết, còn ràng buộc trong cơ sở dữ liệu canh mọi đường ghi.",
    },
  ],

  "khoa-chinh-khoa-ngoai-va-quan-he": [
    {
      type: "flow",
      title: "Một đơn hàng được nối vào cơ sở dữ liệu như thế nào",
      steps: [
        {
          label: "Bảng khách hàng có khoá chính",
          detail: "Mỗi khách có một id duy nhất và không trống, ví dụ khách số 7. Id này là cách duy nhất để các bảng khác nhắc tới khách đó.",
        },
        {
          label: "Bảng đơn hàng giữ khoá ngoại",
          detail: "Quan hệ một nhiều, nên cột khach_id nằm ở bảng đơn hàng, bảng bên nhiều. Cơ sở dữ liệu từ chối đơn trỏ tới khách số 99 không tồn tại.",
        },
        {
          label: "Bảng nối giữa đơn hàng và sản phẩm",
          detail: "Một đơn có nhiều sản phẩm và một sản phẩm nằm trong nhiều đơn, nên cần một bảng nối. Mỗi hàng là một cặp (đơn, sản phẩm).",
        },
        {
          label: "Bảng nối lưu thuộc tính của chính mối quan hệ",
          detail: "Ví dụ số lượng và giá tại thời điểm mua. Không lưu giá này thì khi bảng giá đổi, mọi đơn cũ đổi theo và báo cáo doanh thu tháng trước khác đi.",
        },
        {
          label: "Xoá một khách hàng",
          detail: "Phải chọn: chặn lại, xoá lan sang các đơn, hay đặt khach_id về trống. Xoá lan chọn không cân nhắc có thể xoá nhầm rất nhiều dữ liệu chỉ bằng một câu lệnh.",
        },
      ],
    },
  ],

  "select-loc-sap-xep-va-gioi-han": [
    {
      type: "flow",
      title: "Câu truy vấn được thực hiện theo thứ tự nào",
      steps: [
        {
          label: "FROM: lấy bảng don",
          detail: "Toàn bộ các hàng của bảng đơn hàng đi vào, ví dụ 6 hàng. Chưa lọc gì cả.",
        },
        {
          label: "WHERE: giữ hàng thoả điều kiện",
          detail: "Điều kiện trang_thai = 'xong' loại các đơn khác. Hàng mà điều kiện cho ra không xác định, như so sánh với NULL, cũng bị loại một cách im lặng.",
        },
        {
          label: "ORDER BY: sắp xếp phần còn lại",
          detail: "ORDER BY tien DESC xếp đơn có tiền lớn lên đầu. Không có bước này thì thứ tự trả về hoàn toàn không được bảo đảm.",
        },
        {
          label: "LIMIT: cắt lấy các hàng đầu",
          detail: "LIMIT 3 giữ ba hàng đầu tiên sau khi đã sắp xếp, nên đó là ba đơn lớn nhất. Đặt LIMIT mà thiếu ORDER BY thì ba hàng đó là ba hàng nào cũng chưa biết.",
        },
      ],
    },
  ],

  "chi-muc-trong-co-so-du-lieu": [
    {
      type: "flow",
      title: "Có chỉ mục và không có chỉ mục: một lượt tìm và một lượt ghi",
      steps: [
        {
          label: "Truy vấn WHERE email = 'an@vi-du.vn'",
          detail: "Bảng có một triệu dòng. Không có chỉ mục thì cơ sở dữ liệu quét từng dòng một, tức khoảng một triệu lần so sánh.",
        },
        {
          label: "Bộ tối ưu quyết định dùng chỉ mục",
          detail: "Chỉ mục trên cột email là một cây cân bằng nằm cạnh bảng, giữ các giá trị đã sắp xếp cùng vị trí hàng tương ứng.",
        },
        {
          label: "Đi xuống cây",
          detail: "Mỗi nút vừa một khối đọc từ đĩa nên cây rất thấp: khoảng hai mươi bước tới đúng giá trị, thay vì một triệu.",
        },
        {
          label: "Nhảy thẳng tới hàng trong bảng",
          detail: "Chỉ mục trả về vị trí hàng, và hệ thống đọc đúng hàng đó. Truy vấn gọi hàm lên cột, như cắt phần năm của ngày, thì không dùng được chỉ mục.",
        },
        {
          label: "Lượt ghi phải trả giá",
          detail: "Mỗi lần thêm, sửa, xoá phải cập nhật cả bảng lẫn mọi chỉ mục. Bảng có tám chỉ mục thì một lượt ghi là chín lần cập nhật, nên chỉ tạo chỉ mục cho chỗ đang quét toàn bảng.",
        },
      ],
    },
  ],
};
