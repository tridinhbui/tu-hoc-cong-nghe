import type { LessonSectionBlock } from "../lesson-types";

// Khối mô phỏng (sim | aiLab | scenario) cho bài còn thiếu - đợt r18. Một người viết cho một tệp.
export const R18_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "su-dong-y-va-quyen-chu-the-du-lieu": [
    {
      type: "scenario",
      title: "Người dùng rút đồng ý nhưng thư vẫn tới",
      start: "bao",
      nodes: {
        bao: {
          text: "Một khách phản ánh: họ đã bấm rút đồng ý nhận email tiếp thị từ hôm qua, giao diện cũng hiện trạng thái mới, nhưng sáng nay vẫn nhận thư. Bạn là người nhận ticket. Bạn làm gì đầu tiên?",
          choices: [
            { label: "Kiểm tra bản ghi đồng ý của khách trong cơ sở dữ liệu", next: "db" },
            { label: "Chạy thật luồng gửi thư và xem danh sách người được gửi", next: "chay" },
            { label: "Trả lời khách rằng hệ thống đã ghi nhận và thư sẽ dừng", next: "tra" },
          ],
        },
        db: {
          text: "Bản ghi đúng: cờ đồng ý của khách đã là sai. Có vẻ mọi thứ ổn, nhưng thư vẫn tới và bạn chưa biết vì sao. Bạn làm gì tiếp?",
          choices: [
            { label: "Đóng ticket vì dữ liệu đã đúng, chờ xem hôm sau có thư nữa không", next: "dong" },
            { label: "Lần theo việc gửi thư đêm xem nó đọc danh sách từ đâu", next: "chay" },
          ],
        },
        tra: {
          text: "Khách yên tâm, nhưng không ai kiểm luồng gửi. Đêm đó việc gửi thư lại chạy trên danh sách dựng sẵn và email lại tới. Lần này khách chụp màn hình gửi cho cơ quan quản lý, kèm dòng bạn đã hứa là thư sẽ dừng.",
          ending: "bad",
        },
        dong: {
          text: "Đêm sau thư tới lần nữa, vì việc gửi thư vẫn đọc một danh sách dựng sẵn từ tuần trước thay vì trạng thái hiện tại. Bản ghi đúng không cứu được ai: nút chạy được không có nghĩa là luồng chạy đúng, và khách đã bị làm phiền thêm một lần nữa.",
          ending: "bad",
        },
        chay: {
          text: "Bạn thấy ngay việc gửi thư đêm đọc danh sách được dựng từ tuần trước, lúc khách còn đồng ý. Bạn cần sửa. Cách nào?",
          choices: [
            { label: "Xoá khách này khỏi danh sách dựng sẵn bằng tay", next: "tay" },
            { label: "Cho việc gửi thư đọc trạng thái đồng ý tại thời điểm chạy", next: "ok" },
          ],
        },
        tay: {
          text: "Khách này hết nhận thư, nhưng hôm sau một người khác rút đồng ý và gặp đúng lỗi cũ. Bạn thành người chữa từng ca, trong khi mọi luồng khác dựa trên đồng ý, như chia sẻ với đối tác hay chạy phân tích, vẫn đọc dữ liệu cũ mà không ai biết.",
          ending: "bad",
        },
        ok: {
          text: "Từ nay mọi lần gửi đều hỏi trạng thái đồng ý ngay lúc chạy, nên rút đồng ý có hiệu lực ở đầu ra. Bạn thêm một bài kiểm chạy thật luồng và so danh sách được gửi với trạng thái hiện tại, rồi rà các luồng nền khác theo cùng cách.",
          ending: "good",
        },
      },
    },
  ],
  "luu-tru-du-lieu-trong-nuoc": [
    {
      type: "scenario",
      title: "Chuyển vùng xong, nhưng dữ liệu còn nằm đâu đó",
      start: "van",
      nodes: {
        van: {
          text: "Công ty bạn thuộc nhóm dịch vụ phải lưu dữ liệu trong nước. Đội đã chuyển cơ sở dữ liệu chính và máy chủ ứng dụng về vùng trong nước, sơ đồ kiến trúc đã cập nhật. Sếp hỏi: xong chưa? Bạn trả lời thế nào?",
          choices: [
            { label: "Xong, sơ đồ cho thấy mọi thứ đã nằm trong nước", next: "xong" },
            { label: "Chưa chắc, tôi sẽ kiểm kê mọi nơi dữ liệu đang thực sự nằm", next: "kk" },
          ],
        },
        xong: {
          text: "Một tháng sau, đoàn kiểm tra yêu cầu liệt kê vị trí mọi bản sao. Bản sao lưu hằng đêm hoá ra nằm ở vùng mặc định của nhà cung cấp ở nước ngoài, và nhật ký giám sát cũng chảy sang một công cụ bên thứ ba ở vùng khác. Sơ đồ không có hai chỗ này.",
          ending: "bad",
        },
        kk: {
          text: "Bạn liệt kê tài nguyên theo vùng thay vì tin sơ đồ. Danh sách ra bốn mục nằm trong nước, nhưng bản sao lưu đêm và nhật ký giám sát nằm ngoài. Hai mục này khác nhau về cách xử lý. Bạn bắt đầu từ đâu?",
          choices: [
            { label: "Chỉ chuyển bản sao lưu, vì nhật ký chỉ là dữ liệu kỹ thuật", next: "mot" },
            { label: "Chuyển bản sao lưu, và xét xem nhật ký có chứa dữ liệu cần giữ trong nước", next: "ca" },
          ],
        },
        mot: {
          text: "Bản sao lưu về đúng vùng. Nhưng nhật ký vẫn mang ID người dùng, địa chỉ email lẫn trong thông báo lỗi và chảy ra ngoài mỗi ngày. Đây là nơi dữ liệu đang nằm, dù không ai coi nó là cơ sở dữ liệu, và đợt kiểm tra sau vẫn bắt được.",
          ending: "bad",
        },
        ca: {
          text: "Bạn đổi vùng sao lưu, rồi rà nhật ký: các trường định danh được che hoặc chuyển sang công cụ giám sát đặt trong nước. Bạn cũng ghi bản kiểm kê kèm ngày kiểm lại, vì cấu hình mặc định của nhà cung cấp có thể đổi khi thêm dịch vụ mới.",
          ending: "good",
        },
      },
    },
  ],
  "kiem-tra-xu-phat-va-ho-so-du-lieu": [
    {
      type: "scenario",
      title: "Thư mời làm việc của đoàn kiểm tra",
      start: "thu",
      nodes: {
        thu: {
          text: "Công ty nhận thông báo: tuần sau có buổi kiểm tra về xử lý dữ liệu cá nhân. Đội kỹ thuật nói chính sách thời hạn lưu đã chạy từ lâu. Bạn cần chuẩn bị gì trước?",
          choices: [
            { label: "Soạn lại văn bản chính sách cho thật rõ ràng", next: "vb" },
            { label: "Gom nhật ký thực thi để chứng minh chính sách đã chạy", next: "nk" },
            { label: "Báo đội kỹ thuật dừng mọi thay đổi cho tới sau buổi kiểm tra", next: "dung" },
          ],
        },
        vb: {
          text: "Văn bản rất đẹp. Đoàn hỏi: tác vụ dọn dữ liệu đã chạy những ngày nào, xoá bao nhiêu? Không có nhật ký nào trả lời. Trong mắt người kiểm tra, một chính sách đúng nhưng không có dấu vết thực thi không khác một chính sách chưa từng chạy.",
          ending: "bad",
        },
        dung: {
          text: "Đóng băng thay đổi nghe cẩn thận, nhưng nó không tạo ra bằng chứng nào. Đoàn vẫn yêu cầu nhật ký truy cập, thực thi và đồng ý, và đội mới phát hiện hai trong ba loại chưa từng được ghi lại.",
          ending: "bad",
        },
        nk: {
          text: "Bạn mở nhật ký thực thi và thấy ngày 4 và ngày 5 không có dòng nào, ngày 6 có chạy nhưng xoá 0 bản ghi. Đoàn chắc chắn sẽ hỏi. Bạn xử lý thế nào?",
          choices: [
            { label: "Bổ sung dòng nhật ký cho các ngày thiếu cho đủ bộ", next: "bia" },
            { label: "Điều tra nguyên nhân, sửa tác vụ, ghi rõ khoảng trống và cách khắc phục", next: "that" },
          ],
        },
        bia: {
          text: "Một nhật ký sửa sau không còn là bằng chứng, nó là tài liệu làm giả. Dấu thời gian trong cơ sở dữ liệu lệch với các dòng được thêm, người kiểm tra phát hiện ngay, và vấn đề lúc này không còn là tác vụ hỏng mà là mất toàn bộ độ tin cậy của hồ sơ.",
          ending: "bad",
        },
        that: {
          text: "Bạn tìm ra tác vụ dừng vì một lần đổi cấu hình, vá lại, thêm cảnh báo khi một ngày không có dòng nhật ký. Khi đoàn hỏi, bạn có sẵn bằng chứng, giải thích khoảng trống và biện pháp khắc phục. Phát hiện sớm giúp bạn nói được những điều này.",
          ending: "good",
        },
      },
    },
  ],
  "thanh-toan-cho-nguoi-dung-viet-nam": [
    {
      type: "scenario",
      title: "Chuyển khoản về nhưng khách chưa được cấp gói",
      start: "ve",
      nodes: {
        ve: {
          text: "Cuối tháng, bảng kê của cổng thanh toán báo 12 giao dịch paid, nhưng hệ thống của bạn chỉ có 9 đơn đã cấp quyền lợi. Bảng giao dịch của bạn chỉ có một trường trạng thái duy nhất. Bạn làm gì?",
          choices: [
            { label: "Cấp quyền lợi cho tất cả đơn có tên người chuyển khớp", next: "cap" },
            { label: "Đối chiếu từng giao dịch giữa trạng thái cổng và việc đã cấp", next: "doi" },
          ],
        },
        cap: {
          text: "Bạn cấp cho cả những đơn khớp tên sơ sài. Hai khách chuyển cùng một số tiền cho hai đơn khác nhau nên một đơn được cấp hai lần, một đơn thì chưa. Trường trạng thái duy nhất không cho bạn biết giao dịch nào lệch ở vế nào.",
          ending: "bad",
        },
        doi: {
          text: "Việc đối soát chậm vì không thể tách được vế nào lệch. Bạn thấy mình cần phải lưu hai thứ riêng. Bạn sửa thiết kế thế nào?",
          choices: [
            { label: "Thêm hai trường: trạng thái do cổng báo và cờ đã cấp quyền lợi", next: "hai" },
            { label: "Thêm thêm giá trị vào trường trạng thái cũ, ví dụ paid_nhung_chua_cap", next: "gop" },
          ],
        },
        gop: {
          text: "Tập trạng thái phình lên, mỗi cổng và mỗi lỗi lại thêm một tổ hợp. Các đường thanh toán khác nhau, như ví điện tử và chuyển khoản nhanh, có mô hình hoàn tất khác nhau, nên tổ hợp tăng không kiểm soát và đối soát vẫn khó.",
          ending: "bad",
        },
        hai: {
          text: "Giờ mỗi dòng cho biết cổng nói gì và bạn đã cấp gì. Hàng paid mà chưa cấp thì cấp quyền lợi, hàng failed mà đã lỡ cấp thì thu hồi. Bảng kê lệch lần sau bạn chỉ cần lọc đúng hai cột, và biết ngay đơn nào cần xử lý.",
          ending: "good",
        },
      },
    },
  ],
  "nghia-vu-voi-nguoi-dung-va-khieu-nai": [
    {
      type: "scenario",
      title: "Khách cũ hỏi điều khoản đã đổi từ khi nào",
      start: "hoi",
      nodes: {
        hoi: {
          text: "Một khách dùng từ ba năm khiếu nại: họ nói chính sách hoàn tiền họ đồng ý lúc đăng ký là 14 ngày, nay bạn áp 7 ngày. Hệ thống chỉ lưu bản điều khoản mới nhất, không lưu việc ai chấp nhận bản nào. Bạn xử lý thế nào?",
          choices: [
            { label: "Áp bản điều khoản hiện hành cho mọi người dùng cũ", next: "hh" },
            { label: "Hoàn tiền cho khách này, rồi sửa hệ thống để không gặp lại", next: "hoan" },
            { label: "Yêu cầu khách đưa bằng chứng họ đã đồng ý bản 14 ngày", next: "bc" },
          ],
        },
        hh: {
          text: "Khách không có cách nào chứng minh, và bạn cũng không. Vấn đề không nằm ở một ca: toàn bộ người dùng cũ đã đi qua hệ thống mà không có phiên bản và thời điểm chấp nhận, nên thông tin đó mất vĩnh viễn và chỉ còn cách chấp nhận thiệt cho cả nhóm.",
          ending: "bad",
        },
        bc: {
          text: "Khách không giữ ảnh chụp từ ba năm trước, và bạn cũng không giữ gì. Bạn đẩy trách nhiệm chứng minh sang người không có công cụ để làm điều đó, rồi mất khách và để lại một bài đánh giá một sao.",
          ending: "bad",
        },
        hoan: {
          text: "Bạn xử lý ca này theo bản có lợi cho khách để tránh tranh cãi. Giờ phải quyết định cách sửa hệ thống. Bạn chọn gì?",
          choices: [
            { label: "Ghi chú trong tài liệu nội bộ rằng điều khoản đã đổi", next: "ghi" },
            { label: "Lưu phiên bản điều khoản và thời điểm chấp nhận cho từng người dùng", next: "ok" },
          ],
        },
        ghi: {
          text: "Ghi chú giúp nhân viên nhớ, nhưng không trả lời được câu hỏi của người dùng nào đã chấp nhận bản nào, vào lúc nào. Vài tháng sau điều khoản đổi tiếp và ca khiếu nại giống hệt lại tới.",
          ending: "bad",
        },
        ok: {
          text: "Từ giờ mỗi lần chấp nhận ghi kèm phiên bản và thời điểm, và mã tham chiếu khiếu nại nối thẳng tới giao dịch. Các người dùng cũ đã mất dữ liệu này, nhưng người dùng mới thì được bảo vệ, và lần đổi điều khoản sau sẽ không lặp lại tình huống này.",
          ending: "good",
        },
      },
    },
  ],
  "so-lieu-thi-truong-noi-gi-va-giau-gi": [
    {
      type: "scenario",
      title: "Báo cáo thị trường bảo làm bản cho nền tảng nào?",
      start: "bc",
      nodes: {
        bc: {
          text: "Đội bạn có ngân sách làm một bản cho một nền tảng trước. Báo cáo thị trường toàn quốc cho thấy nền tảng A chiếm thị phần người dùng cao nhất. Sản phẩm của bạn nhắm tới tiểu thương và đã có vài trăm người dùng thật. Bạn quyết định dựa vào đâu?",
          choices: [
            { label: "Báo cáo toàn quốc, vì mẫu lớn hơn nhiều", next: "bao" },
            { label: "Phân bố và doanh thu của vài trăm người dùng thật của mình", next: "that" },
          ],
        },
        bao: {
          text: "Bạn làm cho nền tảng A. Sau ba tháng, doanh thu thấp hơn dự kiến: nhóm tiểu thương của bạn dùng nền tảng khác nhiều hơn, vì con số toàn quốc là trung bình của mọi nhóm và không mô tả đúng nhóm nào. Chi phí đã tiêu.",
          ending: "bad",
        },
        that: {
          text: "Dữ liệu cho thấy nền tảng B chiếm 7% người dùng của bạn, A chiếm 60%. Bạn cân nhắc tiếp. Cách xếp hạng nào?",
          choices: [
            { label: "Xếp theo tỷ lệ người dùng, làm cho nền tảng A", next: "ti" },
            { label: "Xếp theo tích của tỷ lệ người dùng và doanh thu mỗi người", next: "tich" },
          ],
        },
        ti: {
          text: "Bạn bỏ sót vế giá trị mỗi người. Khi tính lại, nhóm B chiếm 7% người dùng nhưng 40% doanh thu, còn A chiếm nhiều người nhưng mỗi người chi ít. Cùng chi phí phát triển, hai cách đọc cho hai kết luận trái ngược và bạn dùng sai.",
          ending: "bad",
        },
        tich: {
          text: "Tích cho thấy B xứng đáng làm trước. Bạn ghi lại giả định rằng nhóm B sẽ giữ tỷ lệ này, kèm ngày kiểm lại sau ba tháng. Nhờ vậy khi số liệu đổi, giả định cũ không âm thầm biến thành sự thật. Các số trong ví dụ này là minh hoạ.",
          ending: "good",
        },
      },
    },
  ],
  "thiet-bi-va-mang-cua-nguoi-dung-vn": [
    {
      type: "scenario",
      title: "Màn hình nhanh trên máy đội, chậm với người dùng",
      start: "bao",
      nodes: {
        bao: {
          text: "Màn hình chính mở trong 1,5 giây trên máy của đội, nhưng đánh giá cửa hàng ứng dụng than phiền chậm, và số người dùng mới ở lại thấp. Số liệu nội bộ lại đẹp. Bạn làm gì?",
          choices: [
            { label: "Chạy thêm phép đo hiệu năng trên máy của đội cho chắc", next: "may" },
            { label: "Lấy một máy phổ thông, mạng di động, cài mới và mở lần đầu", next: "that" },
            { label: "Tin số liệu nội bộ và coi than phiền là ý kiến thiểu số", next: "tin" },
          ],
        },
        may: {
          text: "Kết quả vẫn 1,5 giây, đúng như lần trước. Phép đo chạy ở phía trái của phép nhân, nên không thể thấy hệ số phần cứng, mạng và lần chạy đầu. Bạn kết luận không có vấn đề trong khi người dùng vẫn bỏ đi.",
          ending: "bad",
        },
        tin: {
          text: "Chỉ số nội bộ đẹp vì người chờ tám giây rồi thoát chưa từng vào được bên trong, nên không để lại dấu vết nào. Tăng trưởng vẫn đứng yên và không ai hiểu vì sao.",
          ending: "bad",
        },
        that: {
          text: "Tám giây ở lần mở đầu. Bạn lần theo và thấy hai nghi phạm: gói cài lớn, và ảnh nặng tải trước khi hiện được màn hình. Nhưng bạn cũng nhận ra mạng chập chờn làm yêu cầu treo mãi. Bạn ưu tiên gì?",
          choices: [
            { label: "Tối ưu gói cài rồi coi như xong", next: "goi" },
            { label: "Giảm gói cài, và thử cả mạng chập chờn, có chống bấm lặp", next: "ok" },
          ],
        },
        goi: {
          text: "Màn hình mở nhanh hơn, nhưng ngoài đường mạng chập chờn khiến giao diện đứng ở trạng thái đang tải. Người dùng bấm lại nhiều lần và tạo yêu cầu trùng lặp ở phía máy chủ, như từng xảy ra ở luồng thanh toán.",
          ending: "bad",
        },
        ok: {
          text: "Bạn giảm gói cài, thêm thời hạn chờ và nút thử lại, đồng thời chặn bấm lặp ở phía máy chủ. Một buổi chiều với máy thật đã cho nhiều hơn nhiều tuần xem số liệu, và lần kiểm sau đội dùng thiết bị này làm chuẩn.",
          ending: "good",
        },
      },
    },
  ],
  "tieng-viet-trong-san-pham": [
    {
      type: "scenario",
      title: "Tìm “huong” không ra khách tên Hương",
      start: "loi",
      nodes: {
        loi: {
          text: "Người dùng gõ \"huong\" vào ô tìm kiếm nhưng không thấy khách tên Hương, dù chắc chắn có. Bạn mở dữ liệu: tên được lưu đầy đủ dấu. Bạn thử trước điều gì?",
          choices: [
            { label: "Thêm mệnh đề tìm kiếm không phân biệt hoa thường", next: "hoa" },
            { label: "So sánh dãy byte của hai chuỗi trông giống nhau", next: "byte" },
          ],
        },
        hoa: {
          text: "Tìm không phân biệt hoa thường giúp được vài trường hợp, nhưng \"huong\" vẫn không khớp \"Hương\" vì dấu vẫn còn đó, và một số tên lưu bằng ký tự dấu đứng riêng vẫn không khớp dù trông giống hệt trên màn hình. Lỗi vẫn còn.",
          ending: "bad",
        },
        byte: {
          text: "Bạn thấy hai tên nhìn giống nhau nhưng dãy byte khác nhau: một tên dùng ký tự đã gộp sẵn, tên kia dùng chữ gốc kèm dấu đứng riêng. Giờ bạn cần chọn chỗ chuẩn hoá. Ở đâu?",
          choices: [
            { label: "Gọi hàm chuẩn hoá tại từng chỗ có so sánh chuỗi", next: "nhieu" },
            { label: "Chuẩn hoá một lần khi dữ liệu vào, và viết một bài kiểm cho quy tắc đó", next: "cua" },
          ],
        },
        nhieu: {
          text: "Bạn vá năm chỗ, đúng ở thời điểm đó. Hai tháng sau có thêm tính năng lọc danh sách, người viết quên gọi hàm và lỗi cũ xuất hiện ở chỗ mới. Số chỗ có phép so sánh tăng theo thời gian và mỗi chỗ là một cơ hội quên.",
          ending: "bad",
        },
        cua: {
          text: "Dữ liệu vào hệ thống được đưa về một dạng, và hàm tìm kiếm bỏ dấu, đổi đ thành d, rồi so sánh. Cả \"Hương\" lưu kiểu ký tự dấu đứng riêng lẫn \"HƯƠNG\" đều khớp. Mọi thứ phía sau làm việc trên dữ liệu đã sạch, và một bài kiểm đủ để canh giữ.",
          ending: "good",
        },
      },
    },
  ],
  "may-ao-lam-gi-tu-ma-nguon-toi-lenh-may": [
    {
      type: "scenario",
      title: "Phép đo đẹp nhưng sản phẩm thật chậm",
      start: "do",
      nodes: {
        do: {
          text: "Bạn viết lại một hàm và đo: gọi 20 lần, trung bình mỗi lần chỉ 3 ms, nhanh hơn bản cũ rất nhiều. Nhưng khi triển khai thật, người dùng báo lần đầu mở tính năng này vẫn chậm. Bạn nghi điều gì?",
          choices: [
            { label: "Phép đo thiếu giai đoạn làm nóng", next: "nong" },
            { label: "Mạng của người dùng chậm hơn máy bạn", next: "mang" },
          ],
        },
        mang: {
          text: "Mạng có thể góp phần, nhưng bạn tiêu một ngày đổi cách tải mà thời gian của hàm vẫn không giải thích được. Chênh lệch giữa mã thông dịch và mã đã biên dịch thường là hàng chục lần, nên con số bạn có nói về một chương trình khác với chương trình chạy thật.",
          ending: "bad",
        },
        nong: {
          text: "Đúng hướng. Bạn tách các lần gọi đầu, khi máy ảo còn thông dịch, khỏi các lần sau khi phần nóng đã được biên dịch. Giờ bạn báo cáo kết quả thế nào?",
          choices: [
            { label: "Báo trung bình cả lượt chạy, vì đó là thứ người dùng thấy", next: "tb" },
            { label: "Báo riêng lần đầu và trạng thái sau làm nóng, nêu rõ cả hai", next: "ok" },
          ],
        },
        tb: {
          text: "Trung bình gộp trộn hai giai đoạn thành một số không thuộc giai đoạn nào: không phản ánh lần đầu chậm mà người dùng mới gặp, cũng không phản ánh tốc độ ổn định. Người xem sau không biết có nên tin vào con số.",
          ending: "bad",
        },
        ok: {
          text: "Bạn có hai con số rõ ràng: lần đầu chậm vì thông dịch, và trạng thái ổn định nhanh nhờ biên dịch. Đội quyết định gọi hàm sớm khi khởi động để làm nóng, thay vì tối ưu thêm mã. Các con số trong ví dụ này là minh hoạ, không phải đo từ một máy ảo cụ thể.",
          ending: "good",
        },
      },
    },
  ],
  "bo-cuc-bo-nho-va-chi-phi-truy-cap": [
    {
      type: "scenario",
      title: "Cấu trúc tốt hơn trên giấy nhưng chậm hơn trên máy",
      start: "ds",
      nodes: {
        ds: {
          text: "Đồng nghiệp đề xuất đổi mảng đối tượng sang danh sách liên kết để chèn nhanh hơn, vì độ phức tạp chèn tốt hơn trên giấy. Dữ liệu chỉ vài nghìn phần tử và vòng lặp chủ yếu là duyệt qua. Bạn đáp lại thế nào?",
          choices: [
            { label: "Đồng ý, độ phức tạp tốt hơn thì sẽ nhanh hơn", next: "dong" },
            { label: "Đề nghị đo cả hai trên dữ liệu thật trước khi đổi", next: "do" },
          ],
        },
        dong: {
          text: "Sau khi đổi, vòng lặp duyệt chậm hẳn. Độ phức tạp bỏ qua hằng số, và hằng số ở đây chênh hàng trăm lần: mỗi nút nằm ở một chỗ khác nhau nên mỗi bước là một lượt chờ bộ nhớ. Trên dữ liệu vừa, phần tiết kiệm số phép tính không bù được.",
          ending: "bad",
        },
        do: {
          text: "Phép đo cho thấy mảng thắng rõ. Giờ bạn quay sang vòng lặp chỉ đọc 2 trong 20 trường của mỗi đối tượng. Bạn xử lý thế nào?",
          choices: [
            { label: "Giữ nguyên, vì đọc ít trường thì tốn ít hơn", next: "giu" },
            { label: "Gom hai trường hay dùng cùng nhau vào hai mảng liền kề", next: "ok" },
          ],
        },
        giu: {
          text: "Mỗi khối bộ nhớ đệm mang về 18 trường vô ích đi cùng 2 trường cần. Vòng lặp trả giá cho cả khối và chỉ dùng khoảng một phần mười nó. Số lượt đọc vẫn nhiều, và tốc độ vẫn bị giới hạn bởi bố cục chứ không bởi mã.",
          ending: "bad",
        },
        ok: {
          text: "Bố cục theo trường làm mỗi khối đọc về gần như toàn byte hữu ích, nên số khối phải mang về giảm mạnh. Bạn ghi lại cả số đo và lý do trong mô tả thay đổi, để người sau không đổi lại chỉ vì độ phức tạp trông đẹp hơn.",
          ending: "good",
        },
      },
    },
  ],
  "go-bo-diem-nghen-va-biet-khi-nao-dung": [
    {
      type: "scenario",
      title: "Còn đáng tối ưu thêm hay nên dừng?",
      start: "dau",
      nodes: {
        dau: {
          text: "Hồ sơ hiệu năng cho thấy một hàm chiếm 8% thời gian chạy. Một đồng nghiệp háo hức muốn viết lại nó hai tuần cho nhanh gấp mười. Bạn làm gì trước?",
          choices: [
            { label: "Để họ viết lại, nhanh gấp mười chắc chắn có lợi", next: "viet" },
            { label: "Tính trần: nhanh vô hạn thì cả chương trình giảm tối đa bao nhiêu", next: "tran" },
          ],
        },
        viet: {
          text: "Hai tuần sau hàm nhanh gấp mười, nhưng cả chương trình chỉ nhanh hơn chưa tới 8%, người dùng không cảm nhận được. Mã mới phức tạp hơn nên làm chậm mọi thay đổi sau đó, không chỉ việc tối ưu tiếp.",
          ending: "bad",
        },
        tran: {
          text: "Phép tính mất năm phút: tối đa giảm 8%, dưới ngưỡng đội đặt ra. Bạn chuyển sang phần đứng đầu danh sách, chiếm 35%, và gỡ được điểm nghẽn đó. Sau khi gỡ, bạn làm gì tiếp?",
          choices: [
            { label: "Làm tiếp ngay phần đứng thứ hai trong danh sách cũ", next: "cu" },
            { label: "Đo lại từ đầu rồi xếp lại ưu tiên", next: "lai" },
          ],
        },
        cu: {
          text: "Tỷ lệ giữa các phần đã đổi sau khi gỡ điểm nghẽn, nhưng bạn vẫn đi theo danh sách cũ. Phần bạn làm tiếp giờ chỉ chiếm vài phần trăm, trong khi một chỗ khác vừa nhảy lên đứng đầu mà không ai nhìn.",
          ending: "bad",
        },
        lai: {
          text: "Danh sách mới cho thấy mức giảm tối đa của phần tiếp theo nằm dưới ngưỡng cảm nhận được. Bạn dừng, ghi lại số đo trước và sau, và trả thời gian của đội về cho tính năng. Điểm nghẽn tiếp theo giờ là thời gian hiểu mã, không phải hệ thống.",
          ending: "good",
        },
      },
    },
  ],
  "ke-hoach-nhan-su-cho-doi-ky-thuat": [
    {
      type: "scenario",
      title: "Bốn vị trí được duyệt, cam kết tiến độ cả năm",
      start: "duyet",
      nodes: {
        duyet: {
          text: "Đầu năm công ty duyệt thêm bốn vị trí cho đội bạn. Giám đốc muốn bạn cam kết tiến độ cả năm ngay. Bạn lập kế hoạch năng lực bằng cách nào?",
          choices: [
            { label: "Nhân năng lực hiện tại với bốn người thêm, chia đều bốn quý", next: "dau" },
            { label: "Lập một dòng cho mỗi vị trí: tháng vào làm và tháng tự chủ", next: "dong" },
          ],
        },
        dau: {
          text: "Cam kết dựa trên năng lực đầy đủ ngay từ quý đầu. Nhưng người kèm phải dừng việc của họ, tuyển mất nhiều tháng và người mới cần thời gian tự chủ. Năng lực thật của năm chỉ bằng một phần ba tới một nửa, và đội trễ hạn từ quý hai.",
          ending: "bad",
        },
        dong: {
          text: "Bảng cho thấy hai vị trí khó tuyển sẽ vào muộn, một vị trí vào quý cuối gần như không đóng góp gì cho năm nay. Bạn cần quyết định cam kết. Bạn làm gì?",
          choices: [
            { label: "Cam kết theo năng lực thật và chuẩn bị phương án cho vị trí khó nhất", next: "that" },
            { label: "Cam kết theo kế hoạch đầu người và hy vọng tuyển nhanh", next: "hv" },
          ],
        },
        hv: {
          text: "Hy vọng không phải kế hoạch. Quý ba vẫn chưa tuyển được vị trí khó nhất và bạn không có phương án nào. Để bù, cả đội phải làm thêm giờ, và hai người giỏi nhất bắt đầu tìm chỗ khác.",
          ending: "bad",
        },
        that: {
          text: "Cam kết nhỏ hơn mong muốn của giám đốc, nhưng bạn đưa bảng ra và chỉ rõ chỗ nào là giả định. Khi một vị trí trễ hai tháng, bạn đã có phương án thay thế sẵn, và giám đốc thấy rõ cái giá của việc thúc ép lịch hơn nữa.",
          ending: "good",
        },
      },
    },
  ],
  "phat-hanh-dan-thay-vi-bat-cho-tat-ca": [
    {
      type: "scenario",
      title: "Phát hành 1% và tỉ lệ lỗi lên 3%",
      start: "bat",
      nodes: {
        bat: {
          text: "Bạn chuẩn bị phát hành một thay đổi lớn cho 200.000 người dùng. Đội muốn mở cho tất cả cùng lúc vì đã kiểm thử kỹ. Bạn đề xuất gì?",
          choices: [
            { label: "Mở cho tất cả cùng lúc, kiểm thử đã đủ", next: "tat" },
            { label: "Phát hành theo các mức 1%, 10%, 50%, 100%", next: "dan" },
          ],
        },
        tat: {
          text: "Một cấu hình lạ mà môi trường kiểm thử không có làm lỗi lan tới toàn bộ người dùng, và triển khai lại phiên bản cũ mất hàng chục phút trong khi lỗi vẫn tiếp tục chạm tới họ.",
          ending: "bad",
        },
        dan: {
          text: "Ở mức 1%, tỉ lệ lỗi là 3%. Ngưỡng dừng bạn chưa viết ra, và có người nói con số này vẫn chấp nhận được vì đã đi một đoạn. Bạn quyết định thế nào?",
          choices: [
            { label: "Tiếp tục lên 10% rồi theo dõi sát hơn", next: "tiep" },
            { label: "Dừng, chuyển lưu lượng về bản cũ và điều tra", next: "dung" },
          ],
        },
        tiep: {
          text: "Không có ngưỡng thì mỗi mức trở thành câu hỏi \"thế này có tệ không\", và câu trả lời luôn nghiêng về tiếp tục. Ở mức 10%, số người gặp lỗi gấp mười lần so với lúc cần dừng.",
          ending: "bad",
        },
        dung: {
          text: "Chuyển lưu lượng về chỉ mất vài giây, và chỉ khoảng hai nghìn người gặp lỗi. Sau đó bạn viết ngưỡng dừng cho từng mức trước khi thử lại, để lần sau quyết định chỉ là một phép so sánh, không phụ thuộc vào việc đã đầu tư bao nhiêu.",
          ending: "good",
        },
      },
    },
  ],
  "co-tinh-nang-tach-trien-khai-khoi-phat-hanh": [
    {
      type: "scenario",
      title: "Năm cờ trong hệ thống, ai dọn?",
      start: "dem",
      nodes: {
        dem: {
          text: "Khi rà hệ thống, bạn thấy năm cờ: ba cờ tính năng, trong đó hai cái đã quá hạn gỡ, và hai cờ cấu hình như ngắt mạch và chế độ bảo trì. Đội đề nghị dọn cho gọn. Bạn làm gì?",
          choices: [
            { label: "Gỡ cả năm cờ cho sạch mã", next: "het" },
            { label: "Chỉ gỡ cờ tính năng quá hạn, giữ cờ cấu hình", next: "tach" },
            { label: "Để nguyên, cờ rẻ nên không gây hại", next: "yen" },
          ],
        },
        het: {
          text: "Cờ ngắt mạch và chế độ bảo trì là cờ vận hành sống cùng hệ thống. Đến sự cố tuần sau, không còn cách bật chế độ bảo trì hay tắt phụ thuộc đang lỗi, và đội phải triển khai lại mất cả chục phút.",
          ending: "bad",
        },
        yen: {
          text: "Đọc một cờ thì rẻ, nhưng cái giá là tổ hợp: ba cờ tính năng là tám nhánh mà kiểm thử phải đi qua và thực tế hầu như không bao giờ kiểm đủ. Cờ cũ nằm mãi, và rủi ro tăng lên mỗi lần có cờ mới.",
          ending: "bad",
        },
        tach: {
          text: "Bạn xác định đúng, và giờ cần quyết định cách tránh lặp lại. Bạn làm gì với quy trình tạo cờ?",
          choices: [
            { label: "Nhắc đội gỡ cờ khi nhớ ra", next: "nhac" },
            { label: "Mỗi cờ tính năng phải có ngày hết hạn ngay khi tạo", next: "han" },
          ],
        },
        nhac: {
          text: "Gỡ cờ không mang lại lợi ích thấy được nên không bao giờ tự được ưu tiên. Sáu tháng sau số cờ lại nhiều như trước, và các tổ hợp lại không được kiểm thử.",
          ending: "bad",
        },
        han: {
          text: "Mỗi cờ tính năng có ngày hết hạn và một người chịu trách nhiệm, còn cờ cấu hình được ghi riêng là sống lâu. Số cờ giảm khi quá hạn, và rủi ro tổ hợp được giữ ở mức đội kiểm thử nổi.",
          ending: "good",
        },
      },
    },
  ],
  "phan-bo-luu-luong-va-thu-nghiem-khi-phat-hanh": [
    {
      type: "scenario",
      title: "Thử nghiệm cho kết quả đẹp sau hai ngày",
      start: "bd",
      nodes: {
        bd: {
          text: "Bạn chuẩn bị chạy thử nghiệm chia lưu lượng giữa hai phiên bản thanh toán. Trước khi chia thật, bạn làm gì?",
          choices: [
            { label: "Chia ngay và theo dõi mười lăm chỉ số, cái nào tốt hơn thì kết luận", next: "muoi" },
            { label: "Chia hai nhóm cùng một phiên bản để đo nhiễu nền, rồi chọn một chỉ số quyết định", next: "nhieu" },
          ],
        },
        muoi: {
          text: "Với mười lăm chỉ số độc lập, xác suất có ít nhất một cái trông khác biệt chỉ vì ngẫu nhiên đã vượt một nửa. Bạn tuyên bố thắng lợi dựa trên một chỉ số tình cờ, và phiên bản mới không thật sự tốt hơn.",
          ending: "bad",
        },
        nhieu: {
          text: "Hai nhóm cùng phiên bản chênh nhau 0,8 điểm phần trăm, đó là nhiễu nền. Giờ bạn chạy thử nghiệm thật. Sau hai ngày bản mới hơn bản cũ 1 điểm phần trăm và đội muốn dừng. Bạn làm gì?",
          choices: [
            { label: "Dừng ngay, kết quả đã có và mọi người đang chờ", next: "dung" },
            { label: "Chạy tới hết thời gian đã định, rồi so với mức nhiễu nền", next: "het" },
          ],
        },
        dung: {
          text: "Chênh lệch 1 điểm gần bằng nhiễu nền, nên rất có thể chỉ là ngẫu nhiên. Nhìn liên tục và dừng lúc thuận lợi phá vỡ mức ý nghĩa bạn tưởng đang dùng. Bản mới ra rồi mới thấy không có khác biệt thật.",
          ending: "bad",
        },
        het: {
          text: "Hết thời gian đã định, chênh lệch tăng lên 2,5 điểm, vượt xa nhiễu nền, nên bạn tin. Các chỉ số còn lại vẫn được theo dõi, nhưng chỉ để bắt tác dụng phụ, và nhóm được gắn theo người dùng nên không ai thấy hai phiên bản xen kẽ. Các số trong ví dụ này là minh hoạ.",
          ending: "good",
        },
      },
    },
  ],
};
