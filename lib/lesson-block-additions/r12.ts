import type { LessonSectionBlock } from "../lesson-types";

// Khối mô phỏng (sim | aiLab | scenario) cho bài còn thiếu - đợt r12. Một người viết cho một tệp.
export const R12_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "stablecoin-neo-vao-cai-gi": [
    {
      type: "scenario",
      title: "Hợp đồng cho vay cần một mức giá",
      start: "dau",
      nodes: {
        dau: {
          text: "Bạn thiết kế một hợp đồng cho vay: khi giá tài sản thế chấp tụt dưới ngưỡng thì thanh lý. Hợp đồng cần biết giá hôm nay. Đồng đội đề xuất ba hướng.",
          choices: [
            { label: "Gọi API của một sàn ngay trong hàm của hợp đồng", next: "goi_api" },
            { label: "Dùng oracle lấy giá từ nhiều nguồn rồi tính trung vị", next: "nhieu_nguon" },
            { label: "Để một địa chỉ của đội ghi giá lên chuỗi mỗi giờ", next: "mot_nguon" },
          ],
        },
        goi_api: {
          text: "Các nút trong mạng chạy cùng hàm vào những thời điểm hơi khác nhau. Nút A nhận 100,2, nút B nhận 100,4 vì giá vừa nhảy. Hai bên ra hai kết quả khác nhau cho cùng một giao dịch.",
          choices: [
            { label: "Lấy giá của nút đầu tiên làm chuẩn cho mọi nút", next: "thua_nut" },
            { label: "Bỏ lời gọi API, chuyển sang để giá được ghi lên chuỗi trước", next: "nhieu_nguon" },
          ],
        },
        thua_nut: {
          text: "Không có cơ chế nào buộc các nút tin vào nút đầu tiên, và chính nút đó cũng không chứng minh được số nó nhận là thật. Mạng không đạt được đồng thuận và giao dịch của bạn bị từ chối ở mọi nơi.",
          ending: "bad",
        },
        mot_nguon: {
          text: "Giá được cập nhật đều và rẻ. Hai tuần sau, khoá của địa chỉ ghi giá bị lộ. Kẻ tấn công ghi một mức giá thấp giả, thanh lý hàng loạt vị thế vay và mua lại tài sản thế chấp với giá rẻ. Bạn xử lý tiếp thế nào?",
          choices: [
            { label: "Thêm một nguồn thứ hai, lấy giá thấp hơn trong hai nguồn", next: "hai_nguon" },
            { label: "Chuyển sang nhiều nguồn độc lập, lấy trung vị", next: "nhieu_nguon" },
          ],
        },
        hai_nguon: {
          text: "Hai nguồn không có người phân xử. Khi chúng lệch nhau, lấy số thấp hơn nghĩa là kẻ chiếm được một nguồn vẫn kéo giá xuống được, và người dùng bị thanh lý oan mỗi lần một nguồn trục trặc.",
          ending: "bad",
        },
        nhieu_nguon: {
          text: "Năm nguồn độc lập báo 100,2 / 99,8 / 100,1 / 100,0 / 250. Một nguồn bị chiếm, nhưng trung vị là 100,1. Bạn còn một việc nhỏ cần quyết định về phí và độ trễ.",
          choices: [
            { label: "Chấp nhận phí ghi giá và cập nhật theo ngưỡng lệch, không theo từng giây", next: "ket_tot" },
            { label: "Ghi giá lên chuỗi mỗi giây để luôn mới nhất", next: "ket_dat" },
          ],
        },
        ket_tot: {
          text: "Hợp đồng chỉ nhận một dữ kiện đã được nhiều bên xác nhận, và chi phí ghi giá vừa phải. Muốn lệch giá, kẻ tấn công phải chiếm nhiều nguồn cùng lúc. Bạn vẫn tin vào mạng oracle, nhưng đã biết đúng mình tin ở đâu.",
          ending: "good",
        },
        ket_dat: {
          text: "Giá luôn mới nhưng mỗi lần ghi tốn phí giao dịch. Chi phí phí-ghi-giá ăn hết phần lãi của giao thức trong vài tuần, và đội phải tạm ngừng cập nhật vào lúc thị trường biến động mạnh nhất.",
          ending: "bad",
        },
      },
    },
  ],

  "lua-dao-trong-tai-san-so": [
    {
      type: "scenario",
      title: "Review hợp đồng trước khi triển khai",
      start: "dau",
      nodes: {
        dau: {
          text: "Bạn review hợp đồng ví gửi tiền của đồng đội. Hàm rut gửi tiền cho người gọi trước, rồi mới trừ số dư. Phần còn lại trông gọn gàng. Bạn nhận xét gì?",
          choices: [
            { label: "Đổi thứ tự: kiểm tra, trừ số dư, rồi mới gửi tiền ra ngoài", next: "doi_thu_tu" },
            { label: "Logic nghiệp vụ đúng, chuyển sang kiểm lỗi định dạng mã", next: "bo_qua" },
            { label: "Thêm kiểm tra số dư lớn hơn không ở đầu hàm rồi duyệt", next: "chi_kiem_so_du" },
          ],
        },
        bo_qua: {
          text: "Bạn duyệt và hợp đồng được triển khai. Một hợp đồng khác của kẻ tấn công nhận tiền, rồi gọi rut lại ngay trong lúc nhận. Số dư chưa bị trừ nên vòng lặp rút cho tới khi ví cạn.",
          ending: "bad",
        },
        chi_kiem_so_du: {
          text: "Kiểm tra số dư vẫn chạy trước khi tiền gửi đi, và số dư vẫn chưa bị trừ lúc mã nhận tiền chạy. Kẻ tấn công gọi lại vẫn qua được kiểm tra mỗi vòng. Review lần hai, bạn làm gì?",
          choices: [
            { label: "Chuyển bước trừ số dư lên trước bước gửi tiền", next: "doi_thu_tu" },
            { label: "Giữ nguyên thứ tự, nói người dùng chỉ nên gửi số nhỏ", next: "gui_so_nho" },
          ],
        },
        gui_so_nho: {
          text: "Lỗ hổng vẫn còn đó, chỉ là mỗi vòng rút được ít hơn. Kẻ tấn công tự động hoá vòng gọi và vẫn rút cạn từng ví một.",
          ending: "bad",
        },
        doi_thu_tu: {
          text: "Giờ gọi lại không còn rút được lần hai vì số dư đã bằng không. Còn một câu hỏi khác trước khi triển khai: hợp đồng có hàm chỉ chủ sở hữu gọi được, cho phép đổi địa chỉ nhận tiền.",
          choices: [
            { label: "Ghi rõ ai giữ khoá đó, đặt nó sau ví đa chữ ký có độ trễ", next: "ket_tot" },
            { label: "Để nguyên, vì đó là hàm quản trị chứ không phải lỗi mã", next: "ket_xau" },
          ],
        },
        ket_tot: {
          text: "Thứ tự thao tác đã vá, và quyền quản trị không còn nằm trong tay một khoá. Người dùng đọc mã sẽ biết hợp đồng có thể đổi gì và ai đổi được. Đây là phần việc review đầy đủ.",
          ending: "good",
        },
        ket_xau: {
          text: "Một tháng sau khoá chủ sở hữu bị lộ qua một laptop nhiễm mã độc. Kẻ tấn công đổi địa chỉ nhận tiền sang địa chỉ của mình và rút toàn bộ. Mã không có lỗi nào, quyền quản trị mới là lỗ hổng.",
          ending: "bad",
        },
      },
    },
  ],

  "kiem-truoc-khi-nop-len-kho-ung-dung": [
    {
      type: "scenario",
      title: "Ứng dụng bị trả về lần đầu",
      start: "dau",
      nodes: {
        dau: {
          text: "Ứng dụng của bạn vừa nộp lên kho và nhận thư từ chối: thiếu đường dẫn chính sách quyền riêng tư và đội duyệt không đăng nhập thử được. Bạn định xử lý ra sao?",
          choices: [
            { label: "Sửa cả hai điểm bị nêu rồi nộp lại ngay trong hôm nay", next: "nop_ngay" },
            { label: "Rà toàn bộ danh sách hồ sơ rồi mới nộp lại", next: "ra_soat" },
            { label: "Trả lời đội duyệt rằng ứng dụng đủ tốt và xin xét lại", next: "tranh_cai" },
          ],
        },
        tranh_cai: {
          text: "Thư trả lời không đổi gì trong hồ sơ. Đội duyệt xem lại và vẫn thấy cùng hai thiếu sót, thêm vài ngày chờ nữa.",
          ending: "bad",
        },
        nop_ngay: {
          text: "Bạn thêm đường dẫn và một tài khoản thử, nộp lại. Hai hôm sau lại bị trả: ứng dụng xin quyền vị trí mà không giải thích vì sao, và không có cách xoá tài khoản trong ứng dụng.",
          choices: [
            { label: "Viết lời giải thích quyền và làm màn hình xoá tài khoản ngay", next: "lam_xoa" },
            { label: "Bỏ quyền vị trí, để nguyên phần xoá tài khoản chờ bản sau", next: "bo_quyen" },
          ],
        },
        bo_quyen: {
          text: "Quyền vị trí đã bỏ nhưng thiếu cách xoá tài khoản vẫn là một lý do bị trả. Lần nộp thứ ba mất thêm vài ngày, và bạn nhận ra phần xoá cần chạm tới máy chủ.",
          ending: "bad",
        },
        ra_soat: {
          text: "Bạn đối chiếu bốn mục: chính sách quyền riêng tư, giải thích từng quyền, tài khoản thử còn sống, đường xoá tài khoản. Hai mục đầu xong nhanh, nhưng xoá tài khoản cần sửa cả máy chủ.",
          choices: [
            { label: "Làm xoá tài khoản trước, nộp khi cả bốn mục đủ", next: "lam_xoa" },
            { label: "Nộp tạm với ba mục, bổ sung mục thứ tư sau khi qua duyệt", next: "nop_thieu" },
          ],
        },
        nop_thieu: {
          text: "Đội duyệt kiểm hồ sơ trước khi kiểm trải nghiệm, nên thiếu một mục là dừng lại. Bạn mất thêm một lượt chờ mà việc cần làm vẫn y nguyên.",
          ending: "bad",
        },
        lam_xoa: {
          text: "Cả bốn mục đủ, bạn còn tự đăng nhập bằng tài khoản mới tinh trên máy sạch để chạy luồng người dùng mới. Bản nộp qua duyệt ngay lần kế tiếp.",
          ending: "good",
        },
      },
    },
  ],

  "native-hay-da-nen-tang": [
    {
      type: "scenario",
      title: "Chọn cách dựng cho ứng dụng đầu tay",
      start: "dau",
      nodes: {
        dau: {
          text: "Đội ba người, ai cũng thạo JavaScript và web, muốn làm ứng dụng ghi chú chi tiêu cho người dùng ở Việt Nam. Có người đề nghị học Swift và Kotlin để làm native cho cả hai hệ. Bạn nghiêng về hướng nào?",
          choices: [
            { label: "Dùng khung đa nền tảng với thứ đội đã biết, ra bản Android trước", next: "da_nen_tang" },
            { label: "Học Swift và Kotlin, dựng hai bản native song song", next: "hai_native" },
            { label: "Chọn khung đang được bàn nhiều nhất, dù cả đội chưa dùng", next: "theo_trao_luu" },
          ],
        },
        hai_native: {
          text: "Hai mã nguồn đồng nghĩa với việc mỗi tính năng viết hai lần. Ba tháng trôi qua mà chưa có bản nào dùng được vì đội vừa học vừa dựng.",
          choices: [
            { label: "Bỏ iOS, dồn sức làm xong bản Android", next: "ket_vua" },
            { label: "Tiếp tục cả hai bản và thuê thêm người", next: "ket_xau_a" },
          ],
        },
        ket_xau_a: {
          text: "Chi phí thuê người ăn hết quỹ trước khi có người dùng đầu tiên. Ứng dụng chỉ là danh sách và biểu mẫu, đâu cần sức mạnh native.",
          ending: "bad",
        },
        ket_vua: {
          text: "Bản Android ra mắt muộn vài tháng so với dự kiến, nhưng chạy được. Đội mất thời gian học một thứ mà sản phẩm không đòi hỏi.",
          ending: "good",
        },
        theo_trao_luu: {
          text: "Khung mới hứa hẹn nhiều, nhưng mỗi lỗi lạ đều phải tra cứu từ đầu. Sau hai tháng, bạn mới có ba màn hình.",
          choices: [
            { label: "Quay lại khung đội đã quen, viết lại ba màn hình", next: "ket_vua" },
            { label: "Ở lại khung mới vì đã đầu tư hai tháng rồi", next: "ket_xau_b" },
          ],
        },
        ket_xau_b: {
          text: "Hai tháng đã bỏ ra không quay lại dù bạn ở lại hay đi. Ở lại chỉ làm đội tiếp tục chậm hơn mức cần thiết, và số màn hình gắn vào lựa chọn này ngày một tăng.",
          ending: "bad",
        },
        da_nen_tang: {
          text: "Đội ra bản đầu sau sáu tuần. Tháng thứ tám có yêu cầu cần đọc cảm biến Bluetooth ở tầng hệ thống, và thư viện đa nền tảng chưa hỗ trợ tốt.",
          choices: [
            { label: "Viết riêng một mô-đun native cho đúng tính năng đó", next: "ket_tot" },
            { label: "Viết lại toàn bộ sang native vì tính năng này", next: "ket_xau_c" },
          ],
        },
        ket_tot: {
          text: "Phần lớn ứng dụng vẫn là một mã nguồn, chỉ một mô-đun nhỏ cần mã riêng của từng hệ. Quyết định ban đầu dựa vào kỹ năng của đội và yêu cầu của sản phẩm đã đứng vững.",
          ending: "good",
        },
        ket_xau_c: {
          text: "Gần như toàn bộ màn hình phải viết lại chỉ vì một tính năng ngoại lệ. Tháng thứ tám là lúc đổi ý đắt nhất, và ứng dụng đứng yên cả quý.",
          ending: "bad",
        },
      },
    },
  ],

  "doanh-thu-that-cua-mot-ung-dung": [
    {
      type: "scenario",
      title: "Mười nghìn lượt tải, bao nhiêu tiền về?",
      start: "dau",
      nodes: {
        dau: {
          text: "Ứng dụng của bạn vừa vượt mười nghìn lượt tải trong tháng đầu. Đồng đội muốn mở chiến dịch quảng cáo gấp ba tháng sau. Số liệu minh hoạ: sau 30 ngày còn 20% người dùng hoạt động, 3% trong họ trả tiền, một người trả trung bình 4 tháng.",
          choices: [
            { label: "Nhân bốn bước từ số tải xuống tới tiền thực nhận trước", next: "tinh_toan" },
            { label: "Đồng ý quảng cáo, vì nhiều người dùng là nhiều doanh thu", next: "quang_cao" },
            { label: "Ước chừng rằng 3% trên mười nghìn là đủ rồi", next: "uoc_chung" },
          ],
        },
        uoc_chung: {
          text: "Ba trăm người trả tiền nghe đẹp, nhưng nó bỏ qua việc chỉ 20% còn hoạt động, và chưa trừ phí nền tảng lẫn thuế. Con số bạn mang đi kể cao hơn nhiều so với tiền về tài khoản.",
          choices: [
            { label: "Tính lại từng bước từ số người còn hoạt động", next: "tinh_toan" },
            { label: "Dùng con số này làm cơ sở ngân sách quảng cáo", next: "quang_cao" },
          ],
        },
        quang_cao: {
          text: "Chi phí mỗi lượt cài từ quảng cáo cao hơn doanh thu trung bình thực nhận mỗi người. Chiến dịch kéo về thêm người dùng và đồng thời kéo âm thêm vài chục triệu mỗi tháng.",
          ending: "bad",
        },
        tinh_toan: {
          text: "Qua bốn bước, doanh thu thực nhận mỗi người dùng mới hoá ra nhỏ hơn chi phí phục vụ và chi phí quảng cáo ước tính. Phép tính đang âm. Bạn làm gì trước?",
          choices: [
            { label: "Tăng tỷ lệ trả tiền hoặc giảm tỷ lệ hủy, rồi mới nghĩ tới quảng cáo", next: "sua_phep_tinh" },
            { label: "Mở quảng cáo nhỏ để xem có thêm người trả tiền không", next: "quang_cao_nho" },
          ],
        },
        quang_cao_nho: {
          text: "Quảng cáo nhỏ cho đúng kết quả của phép tính: mỗi người mới làm bạn lỗ thêm một chút, chỉ chậm hơn. Bạn mất thêm một tháng ngân sách mà không học được điều gì mới.",
          ending: "bad",
        },
        sua_phep_tinh: {
          text: "Bạn thử một gói trả tiền rõ giá trị hơn và sửa màn hình hủy đăng ký để hỏi lý do. Hai tháng sau tỷ lệ trả tiền tăng, phép tính dương. Lúc này mở quảng cáo mới là mở một cỗ máy đang có lãi.",
          ending: "good",
        },
      },
    },
  ],

  "danh-sach-truoc-khi-bam-phat-hanh": [
    {
      type: "scenario",
      title: "Một buổi chiều trước giờ phát hành",
      start: "dau",
      nodes: {
        dau: {
          text: "Còn một ngày là phát hành. Mọi bài kiểm thử tự động đều xanh và đội đã thử tay nhiều vòng trên máy của mình. Bạn dành buổi chiều cuối làm gì?",
          choices: [
            { label: "Cài ứng dụng trên máy mới, tạo tài khoản mới và đi hết luồng đầu tiên", next: "may_moi" },
            { label: "Thử thêm vài vòng nữa trên máy dev vì mọi thứ ở đó đã quen", next: "may_dev" },
            { label: "Viết thêm bài kiểm thử tự động cho các màn hình chính", next: "viet_test" },
          ],
        },
        may_dev: {
          text: "Máy dev có tài khoản đã đăng nhập sẵn và dữ liệu từ những lần thử trước. Mọi thứ chạy mượt, và đội kết luận sẵn sàng. Luồng mà mọi người dùng thật đều đi qua đầu tiên vẫn chưa ai chạy.",
          choices: [
            { label: "Phát hành cho toàn bộ người dùng ngay", next: "phat_het" },
            { label: "Phát hành cho một phần nhỏ người dùng rồi tăng dần", next: "phat_dan" },
          ],
        },
        viet_test: {
          text: "Bộ kiểm thử mới đều dùng dữ liệu và tài khoản có sẵn trong môi trường thử, nên đều xanh. Nó không phản ánh người dùng mới chưa có gì.",
          choices: [
            { label: "Chuyển sang cài thử trên máy sạch như một người dùng mới", next: "may_moi" },
            { label: "Coi bộ kiểm thử xanh là đủ, phát hành toàn bộ", next: "phat_het" },
          ],
        },
        phat_het: {
          text: "Màn hình đăng ký lỗi với tài khoản chưa từng tồn tại vì một tệp cấu hình chỉ có trên máy của đội. Mọi người dùng mới đều gặp lỗi, và bạn chạy theo sửa trong khi đánh giá một sao dồn về.",
          ending: "bad",
        },
        phat_dan: {
          text: "Chỉ năm phần trăm người dùng mới gặp lỗi đăng ký. Bạn dừng đợt phát hành, sửa tệp cấu hình thiếu và tiếp tục. Mất thêm vài ngày nhưng ít người bị ảnh hưởng.",
          ending: "good",
        },
        may_moi: {
          text: "Trên máy sạch, màn hình đăng ký treo vì thiếu một tệp cấu hình mà máy dev vẫn còn sót. Bạn sửa ngay.",
          choices: [
            { label: "Sửa, kiểm lại trên máy sạch rồi phát hành dần từng đợt", next: "phat_dan" },
            { label: "Sửa, tin là đã xong và phát hành cho tất cả", next: "tin_xong" },
          ],
        },
        tin_xong: {
          text: "Lần này luồng đăng ký chạy, nhưng một lỗi khác ở màn hình đầu sau khi đăng nhập thoát ra mà đội chưa thấy vì chưa ai thử lại. Nó gặp cả người dùng mới lẫn cũ cùng lúc.",
          ending: "bad",
        },
      },
    },
  ],

  "du-an-lon-nao-cung-bao-truoc": [
    {
      type: "scenario",
      title: "Lời mời thứ tư trong một quý",
      start: "dau",
      nodes: {
        dau: {
          text: "Bạn đã nhận ba việc ngoài phần chính: dẫn một nhóm đọc mã, viết tài liệu hạ tầng, đứng trực tuần luân phiên. Giờ có lời mời thứ tư: diễn thuyết ở một buổi gặp mặt. Cái nào cũng hợp lý khi xét riêng. Bạn làm gì?",
          choices: [
            { label: "Liệt kê cả bốn cam kết kèm số giờ mỗi tuần trên một trang, rồi trả lời", next: "liet_ke" },
            { label: "Nhận ngay, vì lần này chỉ tốn vài giờ", next: "nhan_ngay" },
            { label: "Từ chối luôn mà không nhìn lại phần đang giữ", next: "tu_choi_mu" },
          ],
        },
        nhan_ngay: {
          text: "Bốn cam kết nằm rải trong bốn cuộc trò chuyện, chưa chỗ nào cộng lại. Tuần sau tổng số giờ vượt quá tuần làm việc và phần việc chính nhận phần thời gian còn dư.",
          choices: [
            { label: "Làm thêm buổi tối để bù phần việc chính", next: "lam_them" },
            { label: "Ghi lại tất cả cam kết, nói chuyện với quản lý", next: "liet_ke" },
          ],
        },
        lam_them: {
          text: "Vài tuần làm bù đủ để giữ tiến độ, nhưng mã viết lúc mệt phải sửa lại sau đó. Phần việc chính bị đánh giá kém đi đúng ở chỗ bạn vốn mạnh nhất.",
          ending: "bad",
        },
        tu_choi_mu: {
          text: "Bạn từ chối vì cảm giác quá tải, nhưng không biết mình đang giữ bao nhiêu giờ. Hai tuần sau một cam kết cũ kết thúc, và bạn nhận ra mình đã có chỗ trống để nhận lời mời tốt.",
          ending: "bad",
        },
        liet_ke: {
          text: "Tổng bốn cam kết lên tới mười một giờ mỗi tuần, trong khi bạn chỉ còn khoảng tám giờ trống. Có hai lời mời đáng giữ và hai lời mời có thể nhường.",
          choices: [
            { label: "Nhường việc trực cho người khác, hẹn lại buổi diễn thuyết quý sau", next: "ket_tot" },
            { label: "Giữ cả bốn, tự nhủ rằng sẽ tìm cách xoay xở", next: "ket_xau" },
          ],
        },
        ket_tot: {
          text: "Bạn nói rõ với người mời vì sao hẹn lại và đề xuất thời điểm cụ thể. Phần việc chính được giữ nhịp, và quan trọng hơn, bạn có một trang ghi mọi cam kết để mở ra trước khi nhận việc tiếp.",
          ending: "good",
        },
        ket_xau: {
          text: "Xoay xở nghĩa là cắt vào phần việc chính, thứ duy nhất không có người đang chờ ngay. Đến cuối quý các cam kết phụ xong đẹp, còn việc chính trễ hạn.",
          ending: "bad",
        },
      },
    },
  ],

  "kem-cap-mot-nguoi-moi": [
    {
      type: "scenario",
      title: "Tuần thứ ba kèm một bạn mới vào nhóm",
      start: "dau",
      nodes: {
        dau: {
          text: "Bạn nhận kèm một bạn mới. Sang tuần thứ ba, bạn thấy mình chậm hẳn: mỗi lần đang giữ một luồng xử lý phức tạp trong đầu thì bạn mới nhắn hỏi. Việc của bạn đang trễ.",
          choices: [
            { label: "Báo với quản lý, xin dời bớt một việc trong ba tháng đầu", next: "bao_quan_ly" },
            { label: "Bù bằng giờ buổi tối và không nói gì", next: "bu_gio" },
            { label: "Bảo bạn mới hạn chế hỏi và tự tra cứu trước", next: "han_che_hoi" },
          ],
        },
        bu_gio: {
          text: "Bạn kết luận mình làm sai cách, nên cố bù thêm. Đó là hình dạng bình thường của ba tháng đầu, nhưng không ai biết ngoài bạn nên không có gì được điều chỉnh.",
          choices: [
            { label: "Tiếp tục tới khi thật sự kiệt sức", next: "kiet_suc" },
            { label: "Nói ra với quản lý cái giá đang trả thật", next: "bao_quan_ly" },
          ],
        },
        kiet_suc: {
          text: "Sau hai tháng việc chính trễ, bạn mới và bạn đều mệt. Quản lý hỏi vì sao không nói sớm, và bạn không có câu trả lời tốt.",
          ending: "bad",
        },
        han_che_hoi: {
          text: "Người mới ngại hỏi, ngồi kẹt hàng giờ ở những chỗ bạn trả lời được trong hai phút. Việc của bạn đỡ bị cắt ngang nhưng người mới tiến chậm, và bạn bị kéo vào xem lại một sửa đổi lớn do hiểu sai từ đầu.",
          choices: [
            { label: "Đặt khung giờ cố định mỗi ngày để người mới gom câu hỏi", next: "khung_gio" },
            { label: "Quay lại cách cũ, trả lời ngay khi có tin nhắn", next: "bu_gio" },
          ],
        },
        bao_quan_ly: {
          text: "Quản lý nhận ra kế hoạch đã coi việc kèm như không tốn gì. Bạn đề xuất chuyển một việc phụ sang người khác và chọn cho người mới những việc vừa sức.",
          choices: [
            { label: "Thêm một khung giờ cố định hằng ngày để gom câu hỏi", next: "khung_gio" },
            { label: "Chỉ chuyển việc, giữ nguyên cách trả lời ngay lập tức", next: "chi_chuyen_viec" },
          ],
        },
        chi_chuyen_viec: {
          text: "Có thêm thời gian, nhưng mạch làm việc vẫn bị cắt vụn mỗi lần tin nhắn tới. Nhẹ hơn một chút, chưa đủ để việc kèm chạy bền.",
          ending: "bad",
        },
        khung_gio: {
          text: "Mỗi ngày một khung giờ cố định cho câu hỏi và xem mã. Bạn giữ được những khối tập trung dài, người mới biết khi nào có thể hỏi. Việc kèm vẫn tốn công, nhưng giờ có kế hoạch nằm trong lịch.",
          ending: "good",
        },
      },
    },
  ],

  "ban-do-cac-du-an-lon": [
    {
      type: "scenario",
      title: "Giữ hay dừng một cam kết đã đầu tư nhiều",
      start: "dau",
      nodes: {
        dau: {
          text: "Một năm trước bạn nhận bảo trì một thư viện mã nguồn mở nhỏ. Giờ nó tốn sáu giờ mỗi tuần, ít người dùng, và bạn không còn hứng thú. Bạn đã bỏ vào đó rất nhiều công. Bạn tự hỏi điều gì?",
          choices: [
            { label: "Từ hôm nay trở đi, sáu giờ mỗi tuần này có đáng không", next: "tu_hom_nay" },
            { label: "Mình đã bỏ ra cả năm rồi, dừng bây giờ thì phí", next: "da_dau_tu" },
            { label: "Có ai phàn nàn đâu, cứ để mọi thứ như cũ", next: "de_nguyen" },
          ],
        },
        da_dau_tu: {
          text: "Phần công sức đã bỏ ra không quay lại dù bạn tiếp tục hay dừng. Lý do này đưa vào phép tính chỉ làm bạn giữ cam kết lâu hơn mức nó đáng.",
          choices: [
            { label: "Bỏ phần đã đầu tư ra ngoài, tính lại từ hôm nay", next: "tu_hom_nay" },
            { label: "Giữ thêm một năm nữa cho xứng với công đã bỏ", next: "ket_xau" },
          ],
        },
        de_nguyen: {
          text: "Không ai phàn nàn vì sáu giờ của bạn không hiện trên bất kỳ bảng nào. Cam kết cứ thế kéo dài, và quyết định không được đưa ra ở chỗ nào.",
          ending: "bad",
        },
        ket_xau: {
          text: "Một năm sau bạn vẫn dành sáu giờ mỗi tuần cho thứ mình không còn muốn, trong khi một cơ hội tốt hơn đi qua mà bạn không còn chỗ trống để nhận.",
          ending: "bad",
        },
        tu_hom_nay: {
          text: "Tính từ hôm nay, sáu giờ mỗi tuần không còn đáng với bạn nữa. Có hai cách rút ra.",
          choices: [
            { label: "Tìm người nhận bảo trì, bàn giao tài liệu rồi rút ra", next: "ban_giao" },
            { label: "Ngừng trả lời mà không báo ai", next: "bo_im" },
          ],
        },
        bo_im: {
          text: "Những người đang phụ thuộc vào thư viện không biết ai còn quản lý. Lỗi bảo mật sau đó nằm không ai vá, và tên bạn vẫn đứng trên trang dự án.",
          ending: "bad",
        },
        ban_giao: {
          text: "Một người đóng góp thường xuyên nhận bảo trì và bạn ghi rõ trạng thái dự án. Sáu giờ mỗi tuần quay về cho bạn để đặt vào thứ khác, và cam kết kết thúc có chủ đích.",
          ending: "good",
        },
      },
    },
  ],

  "nhip-lam-viec-ben": [
    {
      type: "scenario",
      title: "Một ngày năm cuộc họp rải rác",
      start: "dau",
      nodes: {
        dau: {
          text: "Lịch của bạn có năm cuộc họp ngắn rải đều từ sáng tới chiều, tổng cộng hai giờ. Mã bạn viết vẫn chưa xong và hạn là cuối tuần. Bạn xử lý lịch ra sao?",
          choices: [
            { label: "Đề nghị gom các cuộc họp vào một khối buổi chiều", next: "gom_hop" },
            { label: "Giữ lịch, làm thêm tới tối để bù khoảng bị cắt", next: "lam_khuya" },
            { label: "Từ chối ba cuộc họp trong năm mà không hỏi ai", next: "tu_choi" },
          ],
        },
        lam_khuya: {
          text: "Mười một giờ đêm bạn vẫn gõ mã. Tổng số giờ ngồi tăng, nhưng số giờ tập trung sâu vẫn khoảng vài giờ mỗi ngày. Phần viết lúc mệt sẽ phải sửa.",
          choices: [
            { label: "Ngày mai gom họp lại và dành buổi sáng cho mã", next: "gom_hop" },
            { label: "Lặp lại cách này cả tuần", next: "ket_xau" },
          ],
        },
        ket_xau: {
          text: "Đến thứ Năm bạn kiệt sức, và mã đã viết trong các tối phải được viết lại. Tổng sản lượng không tăng, chỉ chuyển từ cột này sang cột kia.",
          ending: "bad",
        },
        tu_choi: {
          text: "Vắng mặt ở các cuộc họp mà không báo khiến đồng đội thiếu thông tin cần cho việc của bạn, và hai quyết định được đưa ra thiếu ý kiến bạn.",
          ending: "bad",
        },
        gom_hop: {
          text: "Quản lý đồng ý dồn họp vào buổi chiều. Buổi sáng thành một khối bốn giờ liền. Bạn còn hai cách dùng khối đó.",
          choices: [
            { label: "Đặt khối này vào lịch như một cuộc họp và tắt thông báo", next: "ket_tot" },
            { label: "Để trống và mở mọi kênh nhắn tin trong lúc làm", next: "mo_tin_nhan" },
          ],
        },
        mo_tin_nhan: {
          text: "Tin nhắn cứ đến mỗi vài phút và bạn trả lời từng cái. Khối bốn giờ thực tế chỉ còn những đoạn mười phút, và mã vẫn chưa xong.",
          ending: "bad",
        },
        ket_tot: {
          text: "Bạn bảo vệ cái khối chứ không bảo vệ tổng số giờ. Mã xong vào chiều thứ Tư, và bạn về đúng giờ. Cùng hai giờ họp, nhưng gom lại ít tốn kém hơn nhiều.",
          ending: "good",
        },
      },
    },
  ],

  "danh-sach-kiem-suc-khoe-nghe-nghiep": [
    {
      type: "scenario",
      title: "Mười phút kiểm tra hằng tuần",
      start: "dau",
      nodes: {
        dau: {
          text: "Sau tuần dài, bạn mở danh sách kiểm bốn câu hỏi về kiệt sức, lệ thuộc công cụ, chấn thương lặp lại và nhịp làm việc. Hai tuần liền bạn thấy cổ tay hơi tê, và gần đây hay ngủ dậy vẫn mệt. Bạn ưu tiên gì?",
          choices: [
            { label: "Chọn đúng một thứ để sửa trong tuần tới", next: "chon_mot" },
            { label: "Quyết tâm sửa cả bốn thứ từ thứ Hai", next: "sua_het" },
            { label: "Bỏ qua, vì bận quá và chưa thấy đau thật", next: "bo_qua" },
          ],
        },
        sua_het: {
          text: "Bạn lập lịch tập, nghỉ giải lao, ngủ sớm và ghi nhật ký cùng lúc. Đến thứ Tư thì thất bại cái nào cũng bỏ dở.",
          choices: [
            { label: "Chỉ giữ lại cái ảnh hưởng nhiều nhất", next: "chon_mot" },
            { label: "Tự nhủ tuần sau làm lại cả bốn", next: "ket_xau_a" },
          ],
        },
        ket_xau_a: {
          text: "Tuần sau cũng bận như tuần này, và danh sách bốn mục vẫn nằm đó. Không thứ nào thay đổi, chỉ thêm cảm giác thất bại.",
          ending: "bad",
        },
        bo_qua: {
          text: "Chấn thương do lặp lại không đau lúc đang hình thành. Ba tháng sau cổ tay đau tới mức không gõ được lâu, và bạn phải nghỉ để điều trị.",
          ending: "bad",
        },
        chon_mot: {
          text: "Cổ tay tê là dấu hiệu rõ nhất. Bạn chọn nó và phải quyết định cách làm.",
          choices: [
            { label: "Đổi tư thế ngồi, đặt nhắc nghỉ mỗi 45 phút và theo dõi một tuần", next: "ket_tot" },
            { label: "Mua ngay bàn phím đắt tiền và coi như xong", next: "mua_phim" },
          ],
        },
        mua_phim: {
          text: "Bàn phím mới giúp một chút, nhưng tư thế ngồi và việc gõ liên tục không nghỉ vẫn như cũ. Hai tuần sau cổ tay vẫn tê.",
          ending: "bad",
        },
        ket_tot: {
          text: "Một thứ, một cách rõ ràng, một tuần để xem kết quả. Cuối tuần bạn mở lại danh sách, thấy tê tay giảm. Mười phút mỗi tuần đã làm đúng việc của nó.",
          ending: "good",
        },
      },
    },
  ],

  "tu-dong-hoa-toan-bo-he-thong": [
    {
      type: "scenario",
      title: "Thứ Sáu trước ngày hạn chót",
      start: "dau",
      nodes: {
        dau: {
          text: "Mỗi lần sắp hạn chót, đội bạn bỏ qua bước chạy kiểm thử và định dạng mã để kịp giao. Tuần nào cũng vậy, và lỗi lại lọt. Bạn đề xuất gì?",
          choices: [
            { label: "Cho kiểm thử và định dạng mã tự chạy mỗi lần commit", next: "tu_dong" },
            { label: "Nhắc cả đội nhớ chạy kiểm thử trước khi đẩy mã", next: "nhac_nho" },
            { label: "Dành riêng một ngày dọn dẹp sau mỗi đợt giao", next: "don_sau" },
          ],
        },
        nhac_nho: {
          text: "Lời nhắc có tác dụng hai tuần. Tới hạn chót kế tiếp mọi người lại bận, và đúng lúc bận là lúc người ta quên.",
          choices: [
            { label: "Chuyển sang cho máy tự chạy mỗi lần commit", next: "tu_dong" },
            { label: "Thêm lời nhắc to hơn trên kênh chung", next: "ket_xau_a" },
          ],
        },
        ket_xau_a: {
          text: "Cảnh giác đòi mỗi người nhớ ra đúng lúc, mà đúng lúc là lúc họ bận và mệt. Lỗi lọt qua ở đợt giao kế tiếp.",
          ending: "bad",
        },
        don_sau: {
          text: "Ngày dọn dẹp luôn bị việc gấp lấp đầy. Phần dư không phải một khoảng cố định mà là chỗ trống còn lại, và nó biến mất sau hai đợt giao.",
          ending: "bad",
        },
        tu_dong: {
          text: "Kiểm thử chạy tự động và một commit lỗi bị chặn ngay. Đội mất hai ngày để thiết lập. Bạn còn phải quyết định có tự động hoá cả việc cần người nghĩ hay không.",
          choices: [
            { label: "Chỉ tự động các bước giống nhau mỗi lần: định dạng, kiểm thử, dựng bản", next: "ket_tot" },
            { label: "Tự động luôn cả việc quyết định tách dịch vụ hay đổi cấu trúc dữ liệu", next: "tu_dong_qua" },
          ],
        },
        tu_dong_qua: {
          text: "Một quy tắc máy tự áp để đề xuất tách dịch vụ, nhưng nó không biết ngữ cảnh. Đội mất tuần để rút lại những thay đổi không ai thật sự quyết.",
          ending: "bad",
        },
        ket_tot: {
          text: "Chất lượng bây giờ là phần cố định, còn phạm vi là phần điều chỉnh. Tới hạn chót, đội cắt bớt tính năng thay vì bỏ kiểm thử, và bản giao qua mà không lỗi mới.",
          ending: "good",
        },
      },
    },
  ],

  "masterclass-ha-tang-trung-tam-du-lieu": [
    {
      type: "scenario",
      title: "Chọn máy chủ để lấp đầy một tủ",
      start: "dau",
      nodes: {
        dau: {
          text: "Đội bạn thuê một tủ 42 vị trí với công suất điện cố định. Hai dòng máy: dòng A mạnh gấp rưỡi nhưng ngốn điện gấp đôi, dòng B yếu hơn nhưng tiết kiệm. Bạn dùng tiêu chí nào để chọn?",
          choices: [
            { label: "Tính hiệu năng trên mỗi watt và số máy lắp được trong tủ", next: "tinh_watt" },
            { label: "Chọn dòng A vì hiệu năng tuyệt đối cao nhất", next: "chon_a" },
            { label: "Chọn dòng nào rẻ nhất khi mua", next: "chon_re" },
          ],
        },
        chon_a: {
          text: "Dòng A ngốn điện nên tủ chỉ lắp được khoảng nửa số vị trí trước khi chạm trần công suất. Tổng năng lực cả tủ thấp hơn kỳ vọng, và các vị trí trống vẫn nằm trong hợp đồng thuê.",
          choices: [
            { label: "Tính lại bằng hiệu năng trên mỗi watt", next: "tinh_watt" },
            { label: "Xin tăng công suất của tủ", next: "xin_them" },
          ],
        },
        xin_them: {
          text: "Công suất cấp thêm cho một tủ tốn phí cao, và hạn mức của cả dãy có thể đã hết. Bạn trả thêm cho một thứ vốn tránh được bằng việc chọn máy khác.",
          ending: "bad",
        },
        chon_re: {
          text: "Máy rẻ khi mua nhưng tốn điện và toả nhiệt nhiều. Hoá đơn điện và làm mát bốn khoản chi phí thật nhanh chóng vượt chênh lệch giá mua.",
          ending: "bad",
        },
        tinh_watt: {
          text: "Với dòng B, tủ lắp đủ số máy trong hạn mức điện và tổng năng lực cao hơn dòng A. Bạn còn phải tính chi phí cả vòng đời.",
          choices: [
            { label: "Cộng bốn khoản: thuê chỗ, điện, làm mát, khấu hao máy", next: "ket_tot" },
            { label: "Chỉ so giá thuê chỗ vì đó là khoản trên hợp đồng", next: "ket_xau" },
          ],
        },
        ket_xau: {
          text: "Tiền điện và làm mát không có trên hoá đơn đám mây quen thuộc nên bị bỏ sót. Cuối năm chi phí thật cao hơn dự toán đáng kể.",
          ending: "bad",
        },
        ket_tot: {
          text: "Bạn có một con số chi phí thật cho mỗi đơn vị năng lực của tủ, và dòng B thắng. Con số này dùng được để so với việc thuê theo nhu cầu trên đám mây khi cần.",
          ending: "good",
        },
      },
    },
  ],

  "quan-tri-rui-ro-dinh-luong-var-black-swan": [
    {
      type: "scenario",
      title: "Phân vị 99 đẹp nhưng người dùng vẫn kêu chậm",
      start: "dau",
      nodes: {
        dau: {
          text: "Bảng theo dõi cho thấy phân vị 99 của thời gian phản hồi là 800ms, đúng mục tiêu. Nhưng người dùng vẫn phàn nàn là ứng dụng đôi lúc treo. Bạn kiểm tra gì trước?",
          choices: [
            { label: "Xem giá trị lớn nhất và phân vị 99,9 cạnh phân vị 99", next: "xem_duoi" },
            { label: "Báo rằng hệ thống đạt mục tiêu, vấn đề không phải ở máy chủ", next: "bao_dat" },
            { label: "Giảm mục tiêu phân vị 99 xuống 400ms", next: "giam_muc_tieu" },
          ],
        },
        bao_dat: {
          text: "Người dùng tiếp tục phàn nàn và bạn chỉ có con số trung bình để đối đáp. Phân vị đo yêu cầu, còn người dùng trải nghiệm theo phiên có cả trăm yêu cầu.",
          choices: [
            { label: "Xem phần đuôi: giá trị lớn nhất và phân vị 99,9", next: "xem_duoi" },
            { label: "Giữ nguyên báo cáo", next: "ket_xau_a" },
          ],
        },
        ket_xau_a: {
          text: "Một phần người dùng gặp yêu cầu chậm gần như ở mọi phiên và bỏ đi. Số liệu của bạn vẫn xanh trong khi khách hàng rời đi.",
          ending: "bad",
        },
        giam_muc_tieu: {
          text: "Siết phân vị 99 không nói được 1% còn lại chậm bao nhiêu. Chi phí kỹ thuật tăng mà yêu cầu 90 giây vẫn nằm ngoài tầm nhìn.",
          ending: "bad",
        },
        xem_duoi: {
          text: "Giá trị lớn nhất là 90 giây. Một phần trăm yêu cầu chậm không phải 900ms mà có lúc tới 90 giây, và một người tạo trăm yêu cầu trong phiên có khoảng sáu mươi ba phần trăm khả năng gặp ít nhất một yêu cầu chậm. Bạn làm gì tiếp?",
          choices: [
            { label: "Đặt thêm hạn mức thời gian chờ và theo dõi phân vị 99,9", next: "ket_tot" },
            { label: "Coi 90 giây là sự cố hiếm và không cần xử lý", next: "ket_xau_b" },
          ],
        },
        ket_xau_b: {
          text: "Sự cố hiếm theo yêu cầu lại không hiếm theo phiên. Người dùng cứ gặp tình trạng treo và đánh giá giảm dần dù bảng theo dõi vẫn xanh.",
          ending: "bad",
        },
        ket_tot: {
          text: "Bạn đã biết phân vị là ranh giới chứ không phải trần. Theo dõi thêm phần đuôi cho thấy đúng yêu cầu nào treo, và đội điều tra nguyên nhân thay vì trấn an bằng một con số.",
          ending: "good",
        },
      },
    },
  ],

  "phan-mem-tiet-kiem-nang-luong": [
    {
      type: "scenario",
      title: "Cắt hoá đơn điện của một cụm máy",
      start: "dau",
      nodes: {
        dau: {
          text: "Sếp yêu cầu giảm điện năng của cụm máy chủ dịch vụ. Đồng đội muốn viết lại phần mã mà họ nghi là tốn nhất. Bạn làm gì trước?",
          choices: [
            { label: "Đo mức sử dụng bộ xử lý của cả cụm trước", next: "do_truoc" },
            { label: "Viết lại phần mã bị nghi để nhanh hơn", next: "viet_lai" },
            { label: "Dời công việc nền sang giờ lưới điện sạch", next: "doi_gio" },
          ],
        },
        viet_lai: {
          text: "Mã nhanh hơn thật, nhưng cụm vẫn bật cùng số máy. Máy nhàn rỗi vẫn ăn khoảng một nửa công suất đỉnh nên hoá đơn gần như không đổi.",
          choices: [
            { label: "Quay lại đo mức sử dụng của cả cụm", next: "do_truoc" },
            { label: "Viết lại thêm phần khác", next: "ket_xau_a" },
          ],
        },
        ket_xau_a: {
          text: "Vài tuần sau, mã đẹp hơn nhưng số ki-lô-oát giờ không đổi. Đội mất công mà không đạt mục tiêu.",
          ending: "bad",
        },
        doi_gio: {
          text: "Dời giờ chạy chỉ chuyển chỗ phát thải theo thời gian, không giảm lượng công việc. Con số báo cáo đẹp lên nhưng cụm vẫn bật nguyên số máy.",
          choices: [
            { label: "Báo cáo đây là giảm phát thải thật", next: "ket_xau_b" },
            { label: "Ghi riêng là chuyển chỗ, rồi đo mức sử dụng cụm", next: "do_truoc" },
          ],
        },
        ket_xau_b: {
          text: "Báo cáo gộp chuyển chỗ và giảm thật vào một cột. Khi mọi vùng đã sạch, khoản giảm đó biến mất mà không ai hiểu vì sao.",
          ending: "bad",
        },
        do_truoc: {
          text: "Cụm đang chạy ở mức mười phần trăm. Mọi tối ưu mã đều không đổi được hoá đơn vì máy vẫn bật và vẫn ăn nửa công suất. Bạn quyết định gì?",
          choices: [
            { label: "Gom tải lại, tắt bớt máy nhàn rỗi, rồi mới tối ưu mã", next: "ket_tot" },
            { label: "Giữ số máy để dự phòng, chỉ tối ưu mã", next: "giu_may" },
          ],
        },
        giu_may: {
          text: "Mã nhanh hơn thì cụm càng rảnh hơn, nhưng máy vẫn bật và vẫn ăn nửa công suất. Bạn tối ưu đúng chỗ nhưng sai thứ tự.",
          ending: "bad",
        },
        ket_tot: {
          text: "Số máy giảm một nửa, điện giảm theo, và đó là khoản giảm thật vì công việc thừa đã được xoá. Bạn ghi riêng khoản này với mọi khoản chuyển chỗ trong báo cáo.",
          ending: "good",
        },
      },
    },
  ],
};
