import type { LessonSectionBlock } from "../lesson-types";

// Khối mô phỏng (sim | aiLab | scenario) cho bài còn thiếu - đợt r16. Một người viết cho một tệp.
export const R16_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "khi-chi-tieu-cua-doi-xung-dot-voi-loi-ich-nguoi-dung": [
    {
      type: "scenario",
      title: "Chỉ tiêu tỉ lệ bật thông báo và cặp đối trọng",
      start: "mo",
      nodes: {
        mo: {
          text: "Đội tăng trưởng của bạn có chỉ tiêu quý này: tỉ lệ người dùng bật thông báo đẩy phải tăng từ 40% lên 60%. Một đồng đội đề xuất mặc định bật sẵn thông báo cho mọi tài khoản mới và giấu nút tắt vào ba lớp menu. Tỉ lệ bật sẽ vọt lên ngay. Bạn là người phụ trách cả chỉ tiêu này.",
          choices: [
            { label: "Duyệt, vì đây chỉ là một thay đổi giao diện nhỏ", next: "duyet" },
            { label: "Từ chối rồi giữ nguyên, chờ xem con số tự lên", next: "tuchoi" },
            { label: "Duyệt kèm thêm một chỉ số đối trọng đi cùng chỉ tiêu", next: "doitrong" },
          ],
        },
        duyet: {
          text: "Tỉ lệ bật đạt 63% sau hai tuần. Không ai trong đội cố ý làm hại người dùng, mỗi người chỉ làm việc đạt chỉ tiêu. Bạn có nên lo không, và nếu lo thì cần nhìn con số nào?",
          choices: [
            { label: "Không cần, chỉ tiêu đã xanh nên mọi thứ ổn", next: "bad_xanh" },
            { label: "Thêm chỉ số cảnh báo rồi chờ ai đó chú ý đến nó", next: "bad_canhbao" },
          ],
        },
        tuchoi: {
          text: "Ba tuần sau tỉ lệ bật chỉ nhích lên 44%. Quản lý hỏi vì sao chưa đạt chỉ tiêu. Đồng đội kia nói thẳng rằng cách của họ có hiệu quả nhưng bạn đã chặn. Bạn cần một phương án không đối đầu với ai.",
          choices: [
            { label: "Quay lại duyệt cách cũ để kịp chỉ tiêu quý", next: "duyet" },
            { label: "Đề xuất gắn chỉ tiêu bật với tỉ lệ người tắt lại", next: "doitrong" },
          ],
        },
        doitrong: {
          text: "Bạn gắn chỉ tiêu bật thông báo với tỉ lệ tắt thông báo sau 30 ngày, và chính bạn chịu trách nhiệm cho cả hai con số. Lần này cách giấu nút tắt sẽ làm chỉ số thứ hai xấu đi ngay ở tuần đầu.",
          choices: [
            { label: "Đo cả hai, rồi chọn cách xin phép bật cho rõ ràng", next: "good_ok" },
            { label: "Giao hai con số cho hai người để họ tự cân bằng", next: "bad_haingu" },
          ],
        },
        bad_xanh: {
          text: "Một quý sau, tỉ lệ gỡ ứng dụng tăng gần gấp đôi vì người dùng bị làm phiền mà không tắt được. Người mới vào đội thay người cũ vẫn thấy cách này hợp lý. Lỗi nằm ở cấu trúc khuyến khích nên thay người không chữa được.",
          ending: "bad",
        },
        bad_canhbao: {
          text: "Chỉ số cảnh báo nằm trong một bảng điều khiển ít người mở. Không ai nhìn đúng lúc nên thiệt hại đã xảy ra, rồi mới có người phản ứng. Theo dõi và phản ứng phụ thuộc vào việc ai đó chú ý đúng thời điểm.",
          ending: "bad",
        },
        bad_haingu: {
          text: "Người giữ chỉ tiêu bật tối ưu phần của mình bằng cách giấu nút, người giữ tỉ lệ tắt không có quyền sửa giao diện. Hai con số quay về thành hai chỉ tiêu độc lập và xung đột nhau như trước.",
          ending: "bad",
        },
        good_ok: {
          text: "Đội thử hộp thoại xin phép rõ ràng. Tỉ lệ bật lên 52%, tỉ lệ tắt giữ thấp, không ai phải ngầm đánh đổi lợi ích người dùng. Các con số trong tình huống chỉ để minh hoạ. Chỉ khi một người chịu trách nhiệm cho cả hai thì cặp đối trọng mới có tác dụng.",
          ending: "good",
        },
      },
    },
  ],

  "bat-thuong-trong-du-lieu-hanh-vi": [
    {
      type: "scenario",
      title: "Tỉ lệ hoàn thành đơn tăng ở tổng, giảm ở mọi nhóm",
      start: "mo",
      nodes: {
        mo: {
          text: "Báo cáo tuần cho thấy tỉ lệ hoàn thành đơn của cả ứng dụng tăng từ 61% lên 66%. Nhưng khi bạn tách theo từng kênh (web, Android, iOS), cả ba kênh đều giảm nhẹ. Số liệu minh hoạ. Sếp muốn một lời giải thích trước cuộc họp chiều nay.",
          choices: [
            { label: "Nghi bảng báo cáo tính sai và yêu cầu xoá đi tính lại", next: "nghisai" },
            { label: "Kiểm tỷ trọng giữa các kênh có đổi trong tuần này không", next: "tytrong" },
            { label: "Kết luận người dùng thật sự hài lòng hơn ở mọi kênh", next: "haiLong" },
          ],
        },
        nghisai: {
          text: "Bạn mất nửa ngày rà công thức nhưng mọi phép tính đều đúng. Cuộc họp bắt đầu mà bạn chưa có lời giải. Còn hai phép kiểm rẻ chưa thử.",
          choices: [
            { label: "Báo với sếp rằng số liệu chưa đáng tin để chờ", next: "bad_cho" },
            { label: "Quay lại tách theo nhóm và so tỷ trọng các kênh", next: "tytrong" },
          ],
        },
        tytrong: {
          text: "Tuần này một chiến dịch đẩy mạnh kênh web, nơi tỉ lệ hoàn thành vốn cao nhất, nên web chiếm phần lớn đơn hơn trước. Tổng tăng chỉ vì tỷ trọng đổi, còn trong từng kênh thì tỉ lệ giảm thật. Giờ cần xử lý tiếp.",
          choices: [
            { label: "Báo tổng tăng là do thành phần đổi, mỗi kênh giảm", next: "good_ok" },
            { label: "Báo cáo chỉ con số tổng vì nó là con số đẹp", next: "bad_dep" },
          ],
        },
        haiLong: {
          text: "Bạn đưa kết luận này vào cuộc họp và nhóm sản phẩm quyết định giữ nguyên mọi thứ. Một thành viên hỏi lại vì sao ba kênh đều giảm mà tổng lại tăng. Bạn chưa có câu trả lời.",
          ending: "bad",
        },
        bad_cho: {
          text: "Sếp không nhận được gì để quyết định, còn sự giảm thật ở từng kênh vẫn tiếp diễn thêm hai tuần. Hai phép kiểm mất chưa tới một giờ mỗi cái, và chúng đã loại được phần lớn khả năng ngay từ đầu.",
          ending: "bad",
        },
        bad_dep: {
          text: "Cả đội dựa vào con số tổng để mở rộng chiến dịch, trong khi trải nghiệm từng kênh đang xấu đi. Giả định sai đưa vào hôm nay sẽ còn chống đỡ cho các quyết định của nhiều tháng sau, và không ai quay lại kiểm.",
          ending: "bad",
        },
        good_ok: {
          text: "Bạn chỉ rõ cả hai bước: kiểm cách đo không đổi, rồi so từng nhóm với tổng. Sếp hiểu nên tập trung sửa trải nghiệm từng kênh thay vì ăn mừng con số tổng. Bất thường được giải thích đúng nguyên nhân.",
          ending: "good",
        },
      },
    },
  ],

  "nhat-ky-quyet-dinh-va-pre-mortem": [
    {
      type: "scenario",
      title: "Trước khi chốt quyết định chuyển sang cơ sở dữ liệu mới",
      start: "mo",
      nodes: {
        mo: {
          text: "Đội bạn sắp quyết định chuyển hệ thống đơn hàng sang một cơ sở dữ liệu mới, hạn là cuối quý. Bạn là tech lead và tin khá chắc việc này ổn. Bạn muốn vừa ra quyết định vừa có cách để về sau biết mình đúng hay sai.",
          choices: [
            { label: "Ghi lại quyết định kèm mức chắc chắn trước khi làm", next: "ghi" },
            { label: "Cứ làm, sau này ngồi lại nhớ xem đúng hay sai", next: "bad_nho" },
            { label: "Họp cả đội hỏi dự án này có thể sai ở đâu", next: "hoisai" },
          ],
        },
        ghi: {
          text: "Bạn viết: nghĩ khoảng bảy phần mười là xong trước tháng Sáu, rủi ro lớn nhất là dữ liệu cũ. Giờ cả đội cần soi các rủi ro một cách có hệ thống.",
          choices: [
            { label: "Họp pre-mortem, mỗi người viết riêng rồi mới đọc", next: "good_ok" },
            { label: "Mở họp, để người nói trước nêu kịch bản thất bại", next: "bad_neo" },
          ],
        },
        bad_nho: {
          text: "Tám tháng sau dự án trễ hạn. Khi nhìn lại, bạn nhớ mình đã nghi ngờ từ đầu, dù thực tế bạn từng rất chắc. Không có bản ghi nào viết trước nên không có tỉ lệ đúng nào để học. Trí nhớ tự chỉnh theo kết quả và sẽ tự chỉnh lần sau nữa.",
          ending: "bad",
        },
        hoisai: {
          text: "Cả đội đưa ra một danh sách rủi ro chung chung: dữ liệu mất, hiệu năng, tiến độ. Ai cũng biết những thứ này từ trước. Bạn vẫn chưa có bản ghi nào để sau này đối chiếu kết quả với dự đoán.",
          choices: [
            { label: "Dùng danh sách chung này và bắt đầu làm ngay", next: "bad_chung" },
            { label: "Ghi mức chắc chắn rồi hỏi lại: sáu tháng sau thất bại", next: "ghi" },
          ],
        },
        bad_neo: {
          text: "Người đầu tiên kể kịch bản về tốc độ truy vấn, và cả nhóm dồn theo hướng đó. Rủi ro dữ liệu cũ mà bạn đã ghi không ai nhắc tới. Đa dạng góc nhìn là toàn bộ giá trị của pre-mortem và nó bị mất ngay phút đầu.",
          ending: "bad",
        },
        bad_chung: {
          text: "Dự án chạy theo kế hoạch cho tới khi dữ liệu cũ có định dạng lạ làm hỏng bước di chuyển. Đó đúng là loại rủi ro cụ thể mà câu hỏi chung chung không moi ra được.",
          ending: "bad",
        },
        good_ok: {
          text: "Năm phút viết riêng khiến một đồng nghiệp kể cụ thể: bản di chuyển hỏng vì mã hoá ký tự của dữ liệu cũ. Đội bổ sung bước thử trước. Sáu tháng sau, bản ghi của bạn cho thấy mình đúng bao nhiêu lần trong số các dự đoán, thay vì một ký ức đã bị viết lại.",
          ending: "good",
        },
      },
    },
  ],

  "nhung-dich-vu-vao-san-pham-nguoi-khac": [
    {
      type: "scenario",
      title: "Sự cố của dịch vụ nhúng và phiên bản API cũ",
      start: "mo",
      nodes: {
        mo: {
          text: "Công ty bạn cung cấp một widget thanh toán nhúng vào cửa hàng của khách hàng. Lúc 9 giờ sáng, widget lỗi và người mua tại ba cửa hàng không trả tiền được. Người mua sẽ khiếu nại với cửa hàng, còn bạn chỉ nghe tin gián tiếp. Bạn phải ra thông báo đầu tiên.",
          choices: [
            { label: "Sửa xong lỗi rồi mới thông báo cho đỡ rối", next: "suarui" },
            { label: "Báo ngay cho khách hàng bằng bản tin họ chuyển tiếp được", next: "baongay" },
            { label: "Đăng lên trang trạng thái nội bộ và chờ họ tự thấy", next: "noibo" },
          ],
        },
        suarui: {
          text: "Bạn mất ba mươi phút để sửa. Trong lúc đó cửa hàng nhận hàng chục tin nhắn người mua mà không có gì để trả lời. Khách hàng gọi điện hỏi gì đang xảy ra. Bạn còn cơ hội báo lại.",
          choices: [
            { label: "Báo ngay bây giờ kèm tình hình và giờ sửa dự kiến", next: "baongay" },
            { label: "Báo sau khi viết xong báo cáo nguyên nhân đầy đủ", next: "bad_muon" },
          ],
        },
        noibo: {
          text: "Không khách hàng nào đọc trang trạng thái nội bộ. Cửa hàng chỉ biết khi người mua đã phàn nàn nhiều lần. Bạn vẫn kịp gửi thông báo trực tiếp thay vì chờ.",
          choices: [
            { label: "Gửi thông báo trực tiếp cho người phụ trách kỹ thuật", next: "baongay" },
            { label: "Chờ khách hàng liên hệ rồi trả lời từng người", next: "bad_cho" },
          ],
        },
        baongay: {
          text: "Thông báo viết cho người sẽ chuyển tiếp: chuyện gì xảy ra, người mua bị ảnh hưởng thế nào, khi nào có cập nhật tiếp. Sau sự cố, bạn muốn dừng phiên bản API cũ, nhưng một khách hàng lớn vẫn dùng nó nhiều năm.",
          choices: [
            { label: "Tắt phiên bản cũ ngay cuối tuần này", next: "bad_tat" },
            { label: "Đặt ngày dừng cụ thể và nhắc khách lớn từ hôm nay", next: "good_ok" },
          ],
        },
        bad_muon: {
          text: "Thông báo đến sau gần ba tiếng. Cửa hàng đã tự đoán nguyên nhân và nhiều chủ cửa hàng nói với người mua rằng bạn bỏ mặc họ. Tốc độ bạn phản hồi quyết định họ có gì để nói với người dùng của họ, và lần này họ không có gì.",
          ending: "bad",
        },
        bad_cho: {
          text: "Mỗi khách hàng phải tự hỏi và bạn trả lời từng người, mỗi người nhận một thông tin khác nhau. Người mua ở cuối chuỗi vẫn không biết gì suốt buổi sáng, và họ đổ lỗi cho cửa hàng.",
          ending: "bad",
        },
        bad_tat: {
          text: "Khách lớn chưa kịp chuyển nên toàn bộ cửa hàng của họ ngừng thanh toán sáng thứ Hai. Họ không hề biết bạn có kế hoạch này. Phiên bản cũ cần một ngày dừng đã báo từ khi phát hành nó, không phải một quyết định đột ngột.",
          ending: "bad",
        },
        good_ok: {
          text: "Bạn hẹn ngày dừng sau sáu tháng, gửi hướng dẫn chuyển đổi và liên hệ riêng khách lớn. Khi đến hạn, người cuối cùng đã rời khỏi phiên bản cũ. Thời gian sáu tháng chỉ là số minh hoạ.",
          ending: "good",
        },
      },
    },
  ],

  "xac-dinh-du-lieu-nao-can-bao-ve-toi-muc-nao": [
    {
      type: "scenario",
      title: "Chia ngân sách sao lưu cho ba loại dữ liệu",
      start: "mo",
      nodes: {
        mo: {
          text: "Ngân sách sao lưu quý này chỉ đủ bảo vệ kỹ một phần dữ liệu. Bạn có ba thứ: bảng giao dịch do khách hàng tạo, bảng thống kê doanh thu tính lại được trong hai giờ, và bảng báo cáo tháng tính lại mất hai ngày. Bạn phải quyết định trước.",
          choices: [
            { label: "Sao lưu tất cả ở mức cao nhất cho yên tâm", next: "tatca" },
            { label: "Hỏi từng bảng: mất đi có dựng lại được và nhanh không", next: "phanloai" },
            { label: "Chọn bảng nào lớn nhất vì nó đắt nhất", next: "bad_lon" },
          ],
        },
        tatca: {
          text: "Khi diễn tập khôi phục, bạn thấy mọi thứ nằm trong cùng một lượt: thời gian khôi phục toàn bộ dài hơn tám giờ. Bảng giao dịch, thứ cần trong ba mươi phút, phải chờ cả những bảng không gấp.",
          choices: [
            { label: "Tách mức bảo vệ theo từng loại dữ liệu", next: "phanloai" },
            { label: "Mua thêm dung lượng và băng thông để nhanh hơn", next: "bad_mua" },
          ],
        },
        phanloai: {
          text: "Bảng giao dịch không dựng lại được. Bảng báo cáo tháng dựng lại được nhưng chậm. Bảng thống kê doanh thu dựng lại nhanh từ giao dịch. Còn một việc nữa với bảng thống kê: bạn cần chắc rằng mã tính lại vẫn chạy.",
          choices: [
            { label: "Sao lưu thật kỹ bảng thống kê vì nó hay được xem", next: "bad_thongke" },
            { label: "Bảo vệ cao nhất cho giao dịch, kiểm thử lượt tính lại", next: "good_ok" },
          ],
        },
        bad_lon: {
          text: "Bảng lớn nhất lại là bảng log, dựng lại được. Bảng giao dịch chỉ được sao lưu sơ sài. Sáu tháng sau một lỗi ổ đĩa xoá đi ba ngày giao dịch của khách và không còn cách nào lấy lại. Kích thước không nói gì về việc có dựng lại được không.",
          ending: "bad",
        },
        bad_mua: {
          text: "Dung lượng và băng thông tăng lên và vẫn giải quyết được, nhưng khoản đắt thật là thời gian khôi phục toàn bộ. Bạn trả thêm tiền mà vẫn không rút ngắn được thời gian chờ cho dữ liệu quan trọng nhất.",
          ending: "bad",
        },
        bad_thongke: {
          text: "Bảng thống kê được sao lưu rất kỹ nhưng không ai thử tính lại. Mười tám tháng sau cần dựng lại, mã tính đã lỗi thời và không chạy được. Dữ liệu dựng lại nhanh thì cần bảo vệ mã và dữ liệu nguồn, không phải bảng kết quả.",
          ending: "bad",
        },
        good_ok: {
          text: "Giao dịch được bảo vệ ở mức cao nhất, báo cáo tháng sao lưu để rút ngắn thời gian khôi phục, thống kê doanh thu chỉ cần mã và dữ liệu nguồn kèm một lần chạy thử định kỳ. Diễn tập khôi phục xong trong vài chục phút cho phần quan trọng nhất.",
          ending: "good",
        },
      },
    },
  ],

  "chi-phi-co-dinh-va-bien-doi-khi-tach-dich-vu": [
    {
      type: "scenario",
      title: "Có nên tách dịch vụ gửi email ra riêng không",
      start: "mo",
      nodes: {
        mo: {
          text: "Một kỹ sư đề xuất tách phần gửi email, chỉ khoảng hai trăm dòng mã, thành một dịch vụ riêng vì trông gọn và hiện đại. Bạn là người duyệt đề xuất. Đội có bảy kỹ sư và đã quản lý sáu dịch vụ.",
          choices: [
            { label: "Duyệt, vì dịch vụ nhỏ thì chi phí cũng nhỏ", next: "nho" },
            { label: "Liệt kê chi phí cố định trước rồi mới quyết", next: "cophi" },
            { label: "Từ chối luôn vì tách dịch vụ lúc nào cũng tốn", next: "bad_tuchoi" },
          ],
        },
        nho: {
          text: "Tháng sau bạn nhận ra dịch vụ nhỏ này vẫn cần kho mã, đường phát hành, bảng theo dõi và người trực. Chi phí cố định gần bằng một dịch vụ hai mươi nghìn dòng mã. Hãy tính lại đúng.",
          choices: [
            { label: "Đo tổng chi phí theo số dịch vụ đang có", next: "cophi" },
            { label: "Bỏ qua, coi đó là chi phí của sự phát triển", next: "bad_bo" },
          ],
        },
        cophi: {
          text: "Bạn liệt kê bốn khoản: kho mã, đường phát hành, bảng theo dõi, người trực. Bảy kỹ sư mà thêm dịch vụ thứ bảy thì mỗi người gánh thêm việc trực. Lợi ích kỹ thuật của việc tách là gì thì chưa rõ.",
          choices: [
            { label: "Hỏi lợi ích có thật, ví dụ cần mở rộng riêng không", next: "loiich" },
            { label: "Quyết theo ý kiến của người đề xuất vì họ hiểu rõ", next: "bad_y" },
          ],
        },
        loiich: {
          text: "Đề xuất viết: không cần mở rộng riêng, tải email rất thấp, chỉ muốn mã gọn hơn. Không có lợi ích kỹ thuật nào lớn hơn khoản cố định của dịch vụ thứ bảy.",
          choices: [
            { label: "Đồng ý tách ra vì mã sẽ gọn hơn", next: "bad_gon" },
            { label: "Giữ trong một module riêng và hẹn xem lại khi tải đổi", next: "good_ok" },
          ],
        },
        bad_tuchoi: {
          text: "Đề xuất bị bác không kèm lý do. Hai tháng sau, khi một tính năng thực sự cần mở rộng độc lập, cả đội không có khung để cân nhắc và lại tranh cãi cảm tính. Quyết định tách phải dựa trên cân đo, không phải thiên kiến.",
          ending: "bad",
        },
        bad_bo: {
          text: "Chi phí không vào bảng tính nào, nên nó cộng dồn im lặng: nửa ngày mỗi tháng của một kỹ sư cho đường phát hành. Một năm sau đội mất vài chục ngày công cho việc không ai ghi nhận.",
          ending: "bad",
        },
        bad_y: {
          text: "Người đề xuất tách ra, và sau đó sáu dịch vụ khác cũng được tách theo kiểu tương tự. Cuối năm, đội bảy người gánh mười ba dịch vụ. Chi phí tăng tuyến tính theo số dịch vụ, không theo khối lượng công việc.",
          ending: "bad",
        },
        bad_gon: {
          text: "Dịch vụ email có đủ bốn khoản cố định cho một lượng việc rất nhỏ. Mã gọn hơn nhưng thời gian của đội đi vào bảo trì, và đúng khoản chi phí đã được liệt kê lại không được tính vào quyết định.",
          ending: "bad",
        },
        good_ok: {
          text: "Mã vẫn gọn trong module có ranh giới rõ, mà chưa phải trả bốn khoản cố định. Đội ghi điều kiện xem lại: khi tải hoặc nhu cầu mở rộng đổi, quyết định tách sẽ được cân lại bằng số liệu.",
          ending: "good",
        },
      },
    },
  ],

  "danh-sach-san-sang-ngay-dau-sau-khi-tach-khoi": [
    {
      type: "scenario",
      title: "Một trăm ngày sau khi tách hệ thống thanh toán",
      start: "mo",
      nodes: {
        mo: {
          text: "Ba tháng trước, đội bạn tách mô-đun thanh toán thành một dịch vụ riêng. Ngày cắt trơn tru: có kế hoạch, có người trực, có đường quay lui. Hôm nay hai bên đã phát hành độc lập nhiều lần và không ai còn nhìn ranh giới giữa chúng. Sáng nay đơn hàng bắt đầu báo thành công nhưng tiền không về.",
          choices: [
            { label: "Mở nhật ký của dịch vụ thanh toán để tìm lỗi", next: "nhatky" },
            { label: "Hỏi bên đơn hàng có đổi gì gần đây trong cách gọi", next: "hoi" },
            { label: "Quay lui toàn bộ về trước ngày tách khối", next: "bad_quaylui" },
          ],
        },
        nhatky: {
          text: "Nhật ký thanh toán không báo lỗi gì. Mọi yêu cầu đến đều được xử lý thành công. Vấn đề không nằm ở một bên, mà ở thứ hai bên từng ngầm hiểu với nhau.",
          choices: [
            { label: "Kết luận dịch vụ thanh toán không có lỗi và dừng", next: "bad_dung" },
            { label: "So định dạng và thứ tự các bước giữa hai bên", next: "hoi" },
          ],
        },
        hoi: {
          text: "Bên đơn hàng gần đây đổi định dạng trường số tiền từ đồng sang nghìn đồng. Lúc còn chung khối, định dạng này luôn đúng nên không ai viết ra. Bây giờ cần một cách để chuyện này không lặp lại.",
          choices: [
            { label: "Ghi định dạng vào tài liệu và nhắc đội nhớ", next: "bad_taiLieu" },
            { label: "Biến giả định thành hợp đồng có phép kiểm tự động", next: "good_ok" },
          ],
        },
        bad_quaylui: {
          text: "Đường quay lui chỉ tồn tại trong tài liệu và đã không được thử từ ngày cắt. Nó không chạy được với dữ liệu hiện tại. Bạn mất cả buổi mà tiền vẫn không về, còn phát sinh thêm giao dịch trùng.",
          ending: "bad",
        },
        bad_dung: {
          text: "Bạn đóng yêu cầu với ghi chú không phát hiện lỗi. Khách hàng vẫn thấy đơn thành công mà không nhận được tiền, và vài trăm giao dịch nữa tiếp tục sai trước khi ai đó mở lại.",
          ending: "bad",
        },
        bad_taiLieu: {
          text: "Tài liệu và thoả thuận bằng lời đều dựa vào việc con người nhớ. Ba tháng sau có thêm một người mới vào đội, không biết quy ước, và sự cố tương tự lại xảy ra với trường khác.",
          ending: "bad",
        },
        good_ok: {
          text: "Đội viết phép kiểm hợp đồng chạy ở mỗi thay đổi của cả hai bên. Lần sau có ai đổi định dạng trường, phép kiểm báo lỗi ngay lúc gộp mã chứ không phải khi tiền đã sai. Danh sách ngày đầu cũng được rà lại: quyền truy cập, bảng theo dõi, người trực, đường quay lui còn dùng được.",
          ending: "good",
        },
      },
    },
  ],

  "ranh-gioi-an-toan-khi-dung-ai": [
    {
      type: "aiLab",
      mode: "prompt",
      title: "Hỏi AI về lỗi cấu hình mà không lộ khoá thật",
      task: "Dịch vụ của bạn bị lỗi kết nối cơ sở dữ liệu và bạn muốn nhờ AI xem tệp cấu hình. Tệp có chuỗi kết nối chứa mật khẩu thật. Lắp từng phần của câu hỏi sao cho AI vẫn giúp được, mà bạn không đưa gì không nên đưa.",
      parts: [
        {
          id: "du-lieu",
          label: "Phần cấu hình dán vào",
          options: [
            {
              text: "Dán nguyên tệp, vì đang vội và AI cần thấy mọi thứ",
              feedback: "Mật khẩu thật đã đi qua một hệ thống bên ngoài và có thể nằm trong nhật ký. Khoá đã dán vào thì coi như đã lộ.",
            },
            {
              text: "Giữ cấu trúc, thay mật khẩu bằng chuỗi giả cùng độ dài",
              good: true,
              feedback: "Đúng. Dữ liệu giả cùng hình dạng giữ nguyên câu hỏi kỹ thuật mà không lộ giá trị thật.",
            },
            {
              text: "Xoá tên trường, chỉ giữ các giá trị trong tệp",
              feedback: "Cách này nhầm: xoá tên trường làm hỏng câu hỏi mà vẫn để lộ giá trị. Bạn mất cả hai phía.",
            },
          ],
        },
        {
          id: "bo-canh",
          label: "Bối cảnh nói cho AI",
          options: [
            {
              text: "Ghi rõ dịch vụ, phiên bản, và lỗi nhận được ở dòng nào",
              good: true,
              feedback: "Đúng. Bối cảnh kỹ thuật không cần dữ liệu thật mà giúp câu trả lời sát hơn.",
            },
            {
              text: "Chỉ nói dịch vụ bị lỗi, không nói thêm gì",
              feedback: "Quá mơ hồ nên câu trả lời sẽ là danh sách chung chung áp dụng cho mọi dịch vụ.",
            },
            {
              text: "Dán thêm mã nguồn nội bộ của khách hàng cho đủ ngữ cảnh",
              feedback: "Có hợp đồng cấm đưa mã của khách ra bên thứ ba thì đây là vi phạm pháp lý, không chỉ chuyện nội bộ. Phải hỏi trước khi dán.",
            },
          ],
        },
        {
          id: "cau-hoi",
          label: "Điều bạn hỏi",
          options: [
            {
              text: "Chuỗi kết nối này đã đúng chưa, bạn kiểm giúp được không",
              feedback: "Câu hỏi này gợi AI trả lời có hoặc không mà không chỉ ra điều kiện cụ thể nào gây lỗi.",
            },
            {
              text: "Nếu chuỗi này sai thì sai ở chỗ nào trong ba trường hợp thường gặp",
              feedback: "Câu hỏi quá hẹp: bạn tự giới hạn ba trường hợp trước khi AI xem xét, nên có thể bỏ sót nguyên nhân thật.",
            },
            {
              text: "Cấu hình sai ở đâu, và trong trường hợp nào kết nối hỏng",
              good: true,
              feedback: "Đúng. Hỏi điều kiện cụ thể là thứ bạn kiểm chứng được.",
            },
          ],
        },
      ],
      responses: [
        {
          requires: ["du-lieu", "bo-canh", "cau-hoi"],
          text: "Chuỗi kết nối dùng cổng 5432 trong khi dịch vụ đang chạy sau một cổng proxy ở 6432, nên kết nối bị từ chối ở bước đầu. Ngoài ra trường thời gian chờ để 0 nghĩa là không bao giờ hết hạn, sẽ treo luồng khi cơ sở dữ liệu chậm. Bạn đã giữ mật khẩu thật ở ngoài cuộc trò chuyện.",
        },
        {
          requires: ["du-lieu"],
          text: "Cấu hình của bạn có thể sai ở cổng, tên máy chủ hoặc thông tin đăng nhập. Hãy kiểm tra từng thứ theo thứ tự. Do câu hỏi chưa có bối cảnh nên đây chỉ là gợi ý chung.",
        },
        {
          text: "Tôi thấy tệp cấu hình của bạn và cả mật khẩu bên trong. Bạn nên thu hồi mật khẩu này vì nó đã bị đưa ra ngoài và cấp khoá mới. Xoá cuộc trò chuyện là chưa đủ.",
        },
      ],
    },
  ],

  "ra-soat-ma-bang-ai": [
    {
      type: "aiLab",
      mode: "prompt",
      title: "Nhờ AI soi một hàm tính phí vận chuyển",
      task: "Bạn vừa viết hàm tính phí vận chuyển và muốn AI rà trước khi gửi người khác xem. Lắp prompt từng phần để AI chỉ ra lỗi cụ thể thay vì khen chung chung.",
      parts: [
        {
          id: "cau-hoi",
          label: "Cách hỏi",
          options: [
            {
              text: "Đoạn này có tốt không, bạn nhận xét tổng quát giúp mình nhé",
              feedback: "Câu mở kiểu này nhận về danh sách gợi ý chung chung, áp dụng được cho mọi đoạn mã.",
            },
            {
              text: "Đoạn này sai ở đâu, và khi nào hỏng",
              good: true,
              feedback: "Đúng. Điều kiện cụ thể là thứ bạn tự kiểm chứng được.",
            },
            {
              text: "Hãy viết lại cho đẹp hơn và đúng hơn, rồi giải thích từng chỗ đã đổi giúp mình",
              feedback: "Bạn nhận về một đoạn mã mới phải đọc kỹ mới đánh giá được, mà không biết nó sửa lỗi gì.",
            },
          ],
        },
        {
          id: "boi-canh",
          label: "Bối cảnh đi kèm",
          options: [
            {
              text: "Hàm được gọi từ trang thanh toán, đầu vào là cân nặng và vùng giao",
              feedback: "Có bối cảnh nhưng thiếu ràng buộc về dữ liệu vào, nên AI vẫn phải đoán giá trị nào là hợp lệ.",
            },
            {
              text: "Không thêm gì, để AI tự đọc mã là đủ vì mã đã nói lên tất cả",
              feedback: "AI đọc đúng thứ nằm trên màn hình nhưng không biết yêu cầu thật, nên bỏ sót lỗi hiểu sai nghiệp vụ.",
            },
            {
              text: "Cân nặng từ 0,1 đến 30 kg, vùng giao có ba loại",
              good: true,
              feedback: "Đúng. Càng rõ ràng buộc dữ liệu vào, AI càng chỉ ra đúng điều kiện biên.",
            },
          ],
        },
        {
          id: "pham-vi",
          label: "Phạm vi lỗi cần tìm",
          options: [
            {
              text: "Tìm lỗi cục bộ: giá trị rỗng, điều kiện biên",
              good: true,
              feedback: "Đúng. Đây là nhóm có khuôn mẫu rõ mà AI làm tốt, còn người rà soát hay bỏ qua vì nhàm chán.",
            },
            {
              text: "Tìm mọi lỗi thiết kế và nghiệp vụ của cả hệ thống đang chạy",
              feedback: "Lỗi thiết kế và nghiệp vụ cần bối cảnh mà AI không có. Lượt rà soát của người vẫn phải làm phần này.",
            },
            {
              text: "Chỉ kiểm cách đặt tên biến cho đúng quy ước của cả đội",
              feedback: "Đây là việc nhỏ mà bỏ qua nhóm lỗi gây hậu quả thật như sai điều kiện biên.",
            },
          ],
        },
      ],
      responses: [
        {
          requires: ["cau-hoi", "boi-canh", "pham-vi"],
          text: "Hàm hỏng khi cân nặng đúng 30 kg: điều kiện dùng dấu nhỏ hơn thay vì nhỏ hơn hoặc bằng nên kiện 30 kg rơi sang bậc giá thấp hơn. Khi vùng giao là giá trị rỗng, hàm trả về None và trang thanh toán hiển thị NaN. Phần đúng đắn của bậc giá theo yêu cầu thực tế thì cần người xác nhận.",
        },
        {
          requires: ["cau-hoi"],
          text: "Có thể có lỗi ở điều kiện biên và ở giá trị rỗng, nhưng tôi không chắc vì chưa biết dữ liệu vào ràng buộc thế nào. Bạn nên cung cấp thêm bối cảnh.",
        },
        {
          text: "Hàm của bạn viết khá rõ ràng. Một vài gợi ý chung: thêm chú thích, đặt tên biến mô tả hơn, và viết kiểm thử.",
        },
      ],
    },
  ],

  "sinh-kiem-thu-bang-ai": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Bộ kiểm thử AI sinh ra cho hàm cắt chuỗi",
      task: "Hàm cat_chuoi(s, n) có mục đích cắt chuỗi s xuống tối đa n ký tự và thêm dấu ba chấm nếu bị cắt. AI trả về bản nháp bên dưới. Bấm vào các đoạn đáng ngờ rồi nộp.",
      segments: [
        {
          text: "Liệt kê trước các trường hợp cần kiểm: chuỗi rỗng, n bằng 0, n âm, chuỗi có tiếng Việt có dấu, chuỗi đúng bằng n ký tự.",
        },
        {
          text: "Kiểm thử 1: cat_chuoi(\"Xin chào\", 4) mong đợi \"Xin \" vì hàm cắt đúng 4 ký tự, không có dấu ba chấm.",
          error: "Giá trị mong đợi được suy từ tên hàm và hành vi hiện tại, không từ mục đích. Mục đích nói phải thêm dấu ba chấm khi bị cắt, nên kiểm thử này khoá lại hành vi sai.",
        },
        {
          text: "Kiểm thử 2: mỗi nhánh if trong mã được kiểm một lần, theo đúng thứ tự dòng mã đang viết.",
          error: "Kiểm thử bám sát cấu trúc mã thay vì hành vi, nên sau này đổi cách viết là hỏng mà không có lỗi thật. Cần yêu cầu rõ kiểm thử theo hành vi.",
        },
        {
          text: "Kiểm thử 3: cat_chuoi(\"\", 5) mong đợi chuỗi rỗng, vì không có gì để cắt.",
        },
        {
          text: "Kết quả: cả mười hai kiểm thử đều xanh ngay lần chạy đầu tiên, nên mã chắc chắn đúng.",
          error: "Kiểm thử xanh ngay từ lần đầu là lúc đáng nghi nhất. Có thể giá trị mong đợi chỉ khoá lại hành vi hiện tại, tạo thêm một lớp giả bảo đảm.",
        },
        {
          text: "Đề xuất thêm 100 kiểm thử ngẫu nhiên nữa để chắc ăn.",
          error: "Số lượng là cái bẫy: kiểm thử phải bảo trì suốt vòng đời dự án, nên một trăm kiểm thử vô nghĩa tệ hơn năm kiểm thử tốt.",
        },
      ],
    },
  ],

  "kiem-tra-gia-dinh-ai-ngam-dat": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Giả định ngầm trong hàm AI viết để đọc tệp nhật ký",
      task: "Bạn nhờ AI viết hàm đọc tệp nhật ký và đếm số dòng lỗi. Dưới đây là phần AI mô tả cách làm. Bấm vào những câu chứa giả định ngầm mà hệ thống thật có thể phá vỡ, rồi nộp.",
      segments: [
        {
          text: "Hàm đọc toàn bộ tệp vào một danh sách các dòng, rồi duyệt từng dòng để đếm.",
          error: "Giả định dữ liệu đủ nhỏ để nằm hết trong bộ nhớ. Tệp nhật ký thật có thể lớn hàng chục gigabyte, cần đọc từng dòng một.",
        },
        {
          text: "Hàm nhận đường dẫn tệp, mở bằng open() trong khối with để tệp luôn được đóng.",
        },
        {
          text: "Mỗi dòng được tách bằng dấu cách, phần tử thứ ba coi là mức độ, không cần kiểm lại độ dài.",
          error: "Giả định đầu vào đã hợp lệ ở đâu đó. Một dòng ngắn hoặc bị cắt dở sẽ gây lỗi chỉ số, và chỉ hỏng khi gặp đúng dữ liệu đó.",
        },
        {
          text: "Kết quả đếm được cộng dồn vào một biến toàn cục để các luồng khác đọc cùng lúc.",
          error: "Giả định không có lượt gọi đồng thời chạm vào cùng dữ liệu. Nhiều luồng cộng cùng biến có thể làm mất lượt đếm.",
        },
        {
          text: "Hàm trả về số dòng có chữ ERROR và để người gọi quyết định xử lý tiếp.",
        },
        {
          text: "Tệp được mở với mã hoá mặc định của hệ điều hành, coi mỗi ký tự là một byte.",
          error: "Giả định văn bản chỉ có chữ cái không dấu. Nhật ký tiếng Việt cần chỉ định mã hoá rõ ràng, nếu không ký tự có dấu có thể gây lỗi hoặc đọc sai.",
        },
      ],
    },
  ],

  "xay-thu-vien-cau-lenh-ca-nhan": [
    {
      type: "scenario",
      title: "Thư viện câu lệnh phình to và không ai dùng",
      start: "mo",
      nodes: {
        mo: {
          text: "Bạn vừa bắt đầu một dự án mới và muốn có một thư viện câu lệnh cho AI. Bạn đang nhìn một bộ sưu tập mẫu nổi tiếng gồm hai trăm câu lệnh. Bạn chưa có gì của riêng mình ngoài vài câu lẻ lưu rải rác.",
          choices: [
            { label: "Sao chép cả bộ mẫu về làm thư viện của mình", next: "saochep" },
            { label: "Viết một khối mô tả dự án để dán vào đầu mỗi cuộc trò chuyện", next: "khoi" },
            { label: "Ngồi viết trước một bộ đầy đủ cho mọi việc có thể gặp", next: "batruoc" },
          ],
        },
        saochep: {
          text: "Hai tuần sau bạn thấy câu lệnh mẫu chỉ dạy cách diễn đạt. Chúng không biết dự án dùng phiên bản nào hay thư viện nào bị cấm, nên kết quả vẫn sai ràng buộc. Cần có phần dành riêng cho dự án.",
          choices: [
            { label: "Viết khối mô tả dự án và dán vào mỗi cuộc trò chuyện", next: "khoi" },
            { label: "Thêm hai trăm câu mẫu nữa từ nguồn khác", next: "bad_them" },
          ],
        },
        batruoc: {
          text: "Bạn mất cả buổi chiều viết ba mươi câu lệnh, nhưng khi làm việc thật bạn chỉ dùng ba. Phần còn lại chỉ là đoán những thứ mình có thể cần.",
          choices: [
            { label: "Giữ cả ba mươi câu cho khỏi mất công viết lại", next: "bad_giu" },
            { label: "Chuyển sang lưu từng câu khi nó cho kết quả tốt", next: "khoi" },
          ],
        },
        khoi: {
          text: "Khối mô tả ghi ngôn ngữ và phiên bản, khung làm việc, quy ước đặt tên, thứ không được dùng. Cảnh báo giả giảm rõ. Tháng sau, một câu lệnh sửa lỗi cho kết quả rất tốt. Bạn đứng trước quyết định lưu nó như thế nào.",
          choices: [
            { label: "Lưu ngay kèm việc nó dùng cho và vì sao tốt", next: "good_ok" },
            { label: "Lưu mỗi câu, để cuối tuần mới ghi chú sau", next: "bad_ghi" },
          ],
        },
        bad_them: {
          text: "Thư viện có bốn trăm câu và tìm một câu mất lâu hơn tự viết. Ràng buộc dự án vẫn không có trong câu nào, nên bạn vẫn nhận về mã dùng thư viện bị cấm.",
          ending: "bad",
        },
        bad_giu: {
          text: "Sáu tháng sau thư viện có hơn một trăm câu, và bạn không nhớ vì sao mình lưu từng câu hay nó hiệu quả cho việc gì. Tìm lâu hơn tự viết lại nên không ai mở nó.",
          ending: "bad",
        },
        bad_ghi: {
          text: "Cuối tuần bạn không còn nhớ câu nào dùng cho việc gì. Thư viện đầy các câu lệnh không có bối cảnh, và sau vài tháng bạn nhìn một câu mà không hiểu vì sao đã lưu nó.",
          ending: "bad",
        },
        good_ok: {
          text: "Thư viện nhỏ, mỗi câu có bối cảnh. Mỗi vài tháng bạn xoá những câu không dùng, vì cần thì viết lại nhanh hơn tìm. Khối mô tả dự án gần như không đổi và là phần có tỷ lệ hoàn vốn cao nhất.",
          ending: "good",
        },
      },
    },
  ],

  "du-an-nho-hieu-mot-kho-ma-la": [
    {
      type: "scenario",
      title: "Ngày đầu nhận một kho mã chưa từng thấy",
      start: "mo",
      nodes: {
        mo: {
          text: "Bạn vừa vào một đội mới, và việc đầu tiên là sửa lỗi sai chữ hiển thị trên màn hình xác nhận đơn hàng. Kho mã có hàng nghìn tệp và bạn chưa từng đọc nó. Bạn có AI hỗ trợ.",
          choices: [
            { label: "Nhờ AI giải thích toàn bộ kho mã cho bạn", next: "toanbo" },
            { label: "Hỏi bản đồ kho rồi chọn một việc cụ thể để lần theo", next: "banDo" },
            { label: "Tìm đúng dòng chữ trong kho và sửa ngay", next: "timchu" },
          ],
        },
        toanbo: {
          text: "AI trả về một bài dài mô tả mười hai thư mục. Bạn đọc hết nhưng khi cần sửa một chữ thì không biết bắt đầu từ đâu. Hiểu toàn bộ hệ thống là việc tính bằng tháng.",
          choices: [
            { label: "Đặt lại mục tiêu: lần theo màn hình xác nhận đơn", next: "banDo" },
            { label: "Đọc tiếp từng thư mục cho đủ rồi mới làm", next: "bad_doc" },
          ],
        },
        timchu: {
          text: "Dòng chữ có mặt ở ba nơi: một tệp ngôn ngữ, một mẫu email, một bản thử cũ. Bạn không biết nơi nào hiển thị trên màn hình xác nhận. Cần lần theo đường đi.",
          choices: [
            { label: "Sửa cả ba nơi cho chắc", next: "bad_ba" },
            { label: "Lần theo đường đi của màn hình đó qua hệ thống", next: "banDo" },
          ],
        },
        banDo: {
          text: "AI mô tả luồng: màn hình gọi hàm lấy chữ, hàm đọc tệp ngôn ngữ. Mô tả có vẻ đầy đủ. Bước cuối là kiểm chứng điều bạn vừa nghe, vì tài liệu hay mô tả của AI đều chỉ là diễn giải.",
          choices: [
            { label: "Tin mô tả và gửi bản sửa luôn vì nghe hợp lý", next: "bad_tin" },
            { label: "Đổi chữ thử rồi chạy xem nó có hiện đúng chỗ không", next: "good_ok" },
          ],
        },
        bad_doc: {
          text: "Hai ngày sau bạn đã đọc nhiều thư mục nhưng chưa sửa gì. Phần lớn hiểu biết đó mờ đi trước khi bạn dùng tới, vì mục tiêu của bạn chỉ là một dòng chữ.",
          ending: "bad",
        },
        bad_ba: {
          text: "Bản sửa thay luôn mẫu email đang chạy và bản thử cũ, gây một lỗi nhỏ ở hộp thư khách hàng. Bạn chưa biết tệp nào mới là nguồn thật của màn hình, và lỗi được ghi cho bạn.",
          ending: "bad",
        },
        bad_tin: {
          text: "Bản sửa lên môi trường thật mà chữ vẫn không đổi, vì màn hình dùng một tệp ngôn ngữ khác ngoài mô tả. Mã là sự thật, và chỗ mô tả lệch khỏi mã thường là chỗ có ngoại lệ đáng đọc kỹ nhất.",
          ending: "bad",
        },
        good_ok: {
          text: "Chữ hiện sai chỗ và bạn thấy ngay tệp ngôn ngữ thứ hai cũng có tham gia, một điều mô tả không nhắc tới. Nhờ phép kiểm vài phút, bạn sửa đúng tệp và ghi lại ngoại lệ cho người sau.",
          ending: "good",
        },
      },
    },
  ],

  "du-an-nho-tim-loi-va-kiem-chung": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Danh sách nghi ngờ AI đưa ra và cách chứng minh kèm theo",
      task: "Sau khi quét kho mã, AI trả về danh sách vài nghi ngờ, mỗi nghi ngờ kèm cách kiểm. Một cách chứng minh tốt là việc cụ thể, làm được trong vài phút, cho kết quả dứt khoát. Bấm vào các mục có cách kiểm KHÔNG đạt chuẩn đó, rồi nộp.",
      segments: [
        {
          text: "Nghi ngờ 1: hàm tính giảm giá làm tròn sai khi giá lẻ. Cách kiểm: gọi hàm với giá 99,5 và 100,5 rồi so với kết quả tính tay.",
        },
        {
          text: "Nghi ngờ 2: truy vấn danh sách đơn hàng có thể chạy chậm khi dữ liệu lớn. Cách kiểm: xem mã và đánh giá xem nó có vẻ chậm không.",
          error: "Kết quả còn phải diễn giải, nên đó chưa phải cách chứng minh. Cần đo thời gian chạy trên dữ liệu đủ lớn để có số dứt khoát.",
        },
        {
          text: "Nghi ngờ 3: tệp cấu hình có thể bị đọc hai lần. Cách kiểm: hỏi AI xác nhận lại rằng tệp có bị đọc hai lần không.",
          error: "Hỏi AI xác nhận nghi ngờ chính nó nêu gần như chắc chắn nhận về câu đồng ý, vì nghi ngờ đã nằm trong ngữ cảnh làm tiền đề. Phải tự chạy kiểm chứng.",
        },
        {
          text: "Nghi ngờ 4: nút huỷ đơn có thể gọi API hai lần khi bấm nhanh. Cách kiểm: mở trang, bấm đúp thật nhanh và đếm số yêu cầu trong tab mạng.",
        },
        {
          text: "Nghi ngờ 5: biến toàn cục đếm phiên đăng nhập có thể bị ghi đè. Cách kiểm: nghe có vẻ đúng nên ghi vào báo cáo là đã xác nhận.",
          error: "Nghe hợp lý không phải bằng chứng. Nếu chưa thể kiểm trong vài phút thì ghi vào nhóm chưa kết luận được, đừng ép vào đã xác nhận.",
        },
      ],
    },
  ],

  "du-an-nho-tu-phan-bien": [
    {
      type: "scenario",
      title: "Rà lại báo cáo trước khi gửi đồng nghiệp",
      start: "mo",
      nodes: {
        mo: {
          text: "Bạn vừa hoàn thành dự án nhỏ: hiểu một kho mã, tìm ba vấn đề và viết một trang tài liệu. Cảm giác rất chắc chắn vì mọi thứ diễn ra trôi chảy. Bạn chuẩn bị gửi báo cáo cho đồng nghiệp phụ trách kho mã này.",
          choices: [
            { label: "Gửi ngay, vì mình đã kiểm kỹ trong suốt buổi làm việc", next: "gui" },
            { label: "Đánh dấu chỗ nào dựa vào thứ mình chưa tự kiểm chứng", next: "danhdau" },
            { label: "Nhờ AI tự phản biện rồi gửi nếu không thấy vấn đề", next: "ai" },
          ],
        },
        gui: {
          text: "Đồng nghiệp trả lời: nhận định thứ hai của bạn dựa trên một mô-đun đã bị loại bỏ từ năm ngoái. Bạn không nhớ đó là điều bạn đã kiểm hay chỉ đọc rồi gật đầu, vì cả hai nằm trong đầu với cùng mức chắc chắn.",
          choices: [
            { label: "Nhận lỗi và rà lại toàn bộ theo từng câu", next: "danhdau" },
            { label: "Giải thích rằng cảm giác của mình lúc làm là đúng", next: "bad_camgiac" },
          ],
        },
        ai: {
          text: "AI chỉ ra hai chỗ rõ ràng như thiếu ví dụ và một câu ngắt dở. Bạn thấy nhẹ nhõm và định gửi, nhưng cùng một sai lệch trong dữ liệu dẫn tới điểm mù ở cả lượt viết lẫn lượt phản biện.",
          choices: [
            { label: "Gửi vì AI đã xác nhận không còn vấn đề lớn", next: "bad_ai" },
            { label: "Giữ lại lượt AI và thêm một đồng nghiệp đọc", next: "danhdau" },
          ],
        },
        danhdau: {
          text: "Bạn liệt kê sáu chỗ dựa vào thứ chưa tự kiểm. Chỗ nào bạn kiểm trước? Mức khả năng sai và mức hậu quả khi sai không giống nhau ở từng chỗ.",
          choices: [
            { label: "Kiểm chỗ dễ sai nhất trước, vì khả năng sai cao", next: "bad_kham" },
            { label: "Kiểm chỗ sai thì mất dữ liệu trước, dù ít khả năng sai", next: "good_ok" },
          ],
        },
        bad_camgiac: {
          text: "Cảm giác tự tin đến từ việc mọi thứ trôi chảy, mà trôi chảy là đặc điểm của mọi câu trả lời, kể cả câu sai. Đồng nghiệp không còn tin các nhận định khác trong báo cáo và cả bản tài liệu bị hoãn.",
          ending: "bad",
        },
        bad_ai: {
          text: "Đồng nghiệp tìm ra ngay một ràng buộc từ khách hàng mà cả bạn lẫn AI đều không biết. Loại thông tin đó nằm ngoài mã và ngoài đầu bạn, và không cách kiểm chứng tự động nào thay được.",
          ending: "bad",
        },
        bad_kham: {
          text: "Bạn sửa được vài chỗ hiển thị lệch, trong khi một chỗ ít khả năng sai nhưng nếu sai thì xoá nhầm dữ liệu vẫn chưa được kiểm. Xếp ưu tiên theo hậu quả, không theo khả năng sai.",
          ending: "bad",
        },
        good_ok: {
          text: "Bạn kiểm chỗ có thể mất dữ liệu trước, phát hiện một giả định sai và sửa. Bạn gửi kèm danh sách chỗ chưa kiểm để đồng nghiệp biết cần đọc kỹ ở đâu. Hai lớp phản biện bổ sung cho nhau.",
          ending: "good",
        },
      },
    },
  ],
};
