import type { LessonSectionBlock } from "../lesson-types";

// Khối mô phỏng (sim | aiLab | scenario) cho bài còn thiếu - đợt r14. Một người viết cho một tệp.
export const R14_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "case-ai-trong-san-pham-that": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Soát kế hoạch ra mắt tính năng tóm tắt do AI viết",
      task: "Một công cụ AI viết kế hoạch đưa tính năng tóm tắt nội dung vào sản phẩm thật. Bấm vào các đoạn đi ngược với bài vừa học rồi nộp.",
      segments: [
        {
          text: "Mã gọi mô hình qua một lớp riêng có thời gian chờ 3 giây; quá hạn thì hiện nội dung gốc thay vì bắt người dùng chờ.",
        },
        {
          text: "Vì bản demo trả lời đúng cả 20 câu thử, tỷ lệ sai coi như bằng không nên chưa cần đường báo sai cho người dùng.",
          error: "Hai mươi câu thử không nói gì về tỷ lệ sai ngoài đời. Mô hình sai một cách tự tin, và người dùng cần cách sửa hoặc báo sai ngay từ ngày đầu.",
        },
        {
          text: "Bản tóm tắt gắn nhãn là do AI tạo và có thể sai, kèm nút để người dùng sửa hoặc báo sai.",
        },
        {
          text: "Khi nhà cung cấp giới hạn tần suất, cứ thử lại liên tục cho tới khi được là cách xử lý an toàn nhất.",
          error: "Thử lại dồn dập chỉ làm tình trạng bị giới hạn kéo dài thêm. Phụ thuộc mạng không đáng tin cần chờ giãn cách và một đường lui cho người dùng.",
        },
        {
          text: "Các lần người dùng báo sai được lưu lại để làm bộ kiểm thử mỗi khi đổi mô hình hoặc đổi cách viết prompt.",
        },
        {
          text: "Nếu mô hình trả lời sai thì mã sẽ báo lỗi, nên chỉ cần bắt ngoại lệ là biết lúc nào tính năng đang sai.",
          error: "Câu trả lời sai vẫn là một phản hồi hợp lệ, không có ngoại lệ nào để bắt. Muốn biết nó sai phải nhờ người dùng báo lại hoặc đo chất lượng riêng.",
        },
      ],
    },
  ],
  "kiem-ke-tai-san-so-va-be-mat-tan-cong": [
    {
      type: "scenario",
      title: "Chiếc máy thu-nghiem-2023 trên hoá đơn",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Bạn mới nhận việc vận hành. Hoá đơn đám mây tháng này có máy thu-nghiem-2023 mà bảng tính của đội không ghi, CPU gần như luôn ở mức không. Việc đầu tiên bạn làm là gì?",
          choices: [
            { label: "Tắt máy ngay vì trông giống rác, xoá luôn khỏi hoá đơn", next: "tat_ngay" },
            { label: "Hỏi trong kênh chung, không ai nhận thì để nguyên", next: "hoi_roi_quen" },
            { label: "Xem nhãn, log truy cập và các khoá nó đang giữ trước", next: "xem_truoc" },
          ],
        },
        tat_ngay: {
          text: "Sáng hôm sau báo cáo cuối tuần của phòng kinh doanh không chạy. Máy ấy đang chạy một tác vụ định kỳ mà không ai ghi lại, và bạn mất nửa ngày mới đoán ra nó từng làm gì.",
          ending: "bad",
        },
        hoi_roi_quen: {
          text: "Không ai trả lời, chuyện trôi đi. Ba tháng sau đợt quét lỗ hổng đầu tiên của công ty tìm ra máy này vẫn mở cổng quản trị với phần mềm lỗi thời, nằm ngoài lịch vá.",
          ending: "bad",
        },
        xem_truoc: {
          text: "Log cho thấy mỗi đêm có vài kết nối từ bên ngoài tới máy này, và trong biến môi trường có một khoá truy cập đám mây đã 400 ngày chưa đổi. Bạn làm gì tiếp?",
          choices: [
            { label: "Đổi khoá ngay nhưng không báo ai để khỏi làm phiền", next: "doi_khoa_im" },
            { label: "Ghi máy và khoá vào bảng tính tay như các dòng khác", next: "ghi_tay" },
            { label: "Tìm người phụ trách, đổi khoá, rồi chuyển việc kiểm kê sang tập lệnh đọc từ hoá đơn", next: "tu_sinh" },
          ],
        },
        doi_khoa_im: {
          text: "Khoá cũ đang được tác vụ của một nhà thầu dùng. Nó chết ngay trong đêm, không ai biết vì sao và cũng không biết hỏi ai.",
          ending: "bad",
        },
        ghi_tay: {
          text: "Bảng tính có thêm một dòng và đúng đến hết tuần. Tháng sau lại có máy mới mọc lên mà không ai nhớ cập nhật, còn khoá 400 ngày vẫn nằm nguyên trong máy.",
          ending: "bad",
        },
        tu_sinh: {
          text: "Người phụ trách nhận ra máy cũ của dự án đã dừng, khoá được đổi, tác vụ nhà thầu được chuyển sang khoá riêng. Từ nay danh sách tự sinh mỗi tuần và lệch với thực tế là có cảnh báo.",
          ending: "good",
        },
      },
    },
  ],
  "case-hai-cach-do-do-kha-dung": [
    {
      type: "scenario",
      title: "99,9% mà khách vẫn phàn nàn",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Báo cáo tháng ghi độ khả dụng 99,9% theo thời gian, đúng cam kết. Nhưng 40 phút sự cố rơi vào giờ cao điểm buổi tối và hộp thư hỗ trợ đầy phàn nàn. Sếp hỏi: số liệu đúng sao khách lại giận?",
          choices: [
            { label: "Trả lời rằng con số đúng hợp đồng nên phàn nàn là cảm tính", next: "cam_tinh" },
            { label: "Đặt mục tiêu mới 99,99% cũng tính theo thời gian", next: "van_theo_gio" },
            { label: "Tính lại theo số request trong đúng 40 phút đó", next: "tinh_lai" },
          ],
        },
        cam_tinh: {
          text: "Sếp yên tâm một tuần. Sự cố tối thứ Sáu lặp lại đúng giờ cao điểm, và lần này khách hàng lớn nhất gửi thư chấm dứt hợp đồng.",
          ending: "bad",
        },
        van_theo_gio: {
          text: "Con số nghe nghiêm khắc hơn nhưng vẫn coi phút vắng và phút đông như nhau. Sự cố 4 phút ngay giờ cao điểm vẫn lọt dưới ngưỡng, còn khách vẫn gặp lỗi đúng lúc họ cần nhất.",
          ending: "bad",
        },
        tinh_lai: {
          text: "Theo request, tháng này chỉ còn khoảng 99% (số minh hoạ): hàng chục nghìn lượt gọi lỗi dồn vào giờ đông. Đã rõ vì sao khách giận. Bạn đề xuất gì?",
          choices: [
            { label: "Đưa số theo request vào hợp đồng, không báo bên pháp lý", next: "sua_hop_dong" },
            { label: "Chỉ tính request lỗi hoàn toàn, bỏ qua hỏng một phần", next: "bo_mot_phan" },
            { label: "Giữ theo thời gian cho hợp đồng, theo request cho mục tiêu nội bộ", next: "hai_so" },
          ],
        },
        sua_hop_dong: {
          text: "Hợp đồng đã ký không đổi được từ một phía. Bên pháp lý biết chuyện qua khách hàng, và đội bạn mất uy tín trước cả hai bên.",
          ending: "bad",
        },
        bo_mot_phan: {
          text: "Các lượt trả về chậm hoặc thiếu dữ liệu không được đếm. Con số đẹp lên trong báo cáo, nhưng đó lại là dạng sự cố phổ biến nhất nên phàn nàn vẫn tiếp tục.",
          ending: "bad",
        },
        hai_so: {
          text: "Hợp đồng vẫn nói bằng ngôn ngữ cam kết cũ, còn đội sản phẩm có một mục tiêu phản ánh đúng trải nghiệm, kể cả hỏng một phần. Sáng thứ Hai sếp có câu trả lời cho khách.",
          ending: "good",
        },
      },
    },
  ],
  "tu-xay-hay-mua-san": [
    {
      type: "scenario",
      title: "Đề xuất tự xây hệ thống gửi thông báo",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Một đồng đội đề xuất tự xây hệ thống gửi thông báo: 'Mất hai tháng công một lần, còn mua sẵn là 400 đô mỗi tháng mãi mãi, nên tự xây rẻ hơn.' (Số minh hoạ.) Bạn phản hồi thế nào?",
          choices: [
            { label: "Duyệt luôn vì một lần luôn rẻ hơn khoản lặp lại", next: "duyet_luon" },
            { label: "Hỏi xem cả đội có hứng thú tự xây hay không", next: "hung_thu" },
            { label: "Quy hai vế về tổng chi phí ba năm, công đổi ra tiền", next: "quy_doi" },
          ],
        },
        duyet_luon: {
          text: "Hai vế chưa cùng đơn vị nên kết luận đã sai từ câu đầu. Tám tháng sau hệ thống vẫn cần sửa lỗi và nâng thư viện, và không ai còn nhớ con số ban đầu.",
          ending: "bad",
        },
        hung_thu: {
          text: "Cả đội hào hứng, và hứng thú không phải là một khoản chi phí hay lợi ích. Quyết định được chốt bằng cảm tính, đúng thứ cần khung câu hỏi để tránh.",
          ending: "bad",
        },
        quy_doi: {
          text: "Sau khi quy đổi, tự xây vẫn rẻ hơn khoảng một phần ba trong ba năm, nhưng bảng chưa có dòng duy trì. Bạn xử lý tiếp thế nào?",
          choices: [
            { label: "Cộng duy trì khoảng một phần tư công dựng mỗi năm, rồi hỏi đây có phải việc của đội", next: "cong_duy_tri" },
            { label: "Chốt mua vì duy trì chắc chắn làm tự xây đắt hơn", next: "chot_mua" },
            { label: "Chốt tự xây vì đội đủ giỏi nên duy trì gần như bằng không", next: "chot_xay" },
          ],
        },
        chot_mua: {
          text: "Bạn chưa tính duy trì mà đã kết luận. Thực tế sau khi cộng, hai phương án sát nhau, và lý do thật để chọn nằm ở câu hỏi bạn đã bỏ qua: thứ này có phải chỗ sản phẩm khác biệt không.",
          ending: "bad",
        },
        chot_xay: {
          text: "Duy trì không giảm theo thời gian. Sau một năm, hai kỹ sư giỏi nhất dành một phần tư thời gian cho hệ thống thông báo thay vì phần tạo khác biệt của sản phẩm.",
          ending: "bad",
        },
        cong_duy_tri: {
          text: "Sau khi cộng duy trì, mua rẻ hơn, và thông báo không phải chỗ sản phẩm khác biệt. Bạn chọn mua, ghi rõ khoảng điều kiện: chọn mua khi dưới một ngưỡng quy mô và sẽ xem lại nếu vượt.",
          ending: "good",
        },
      },
    },
  ],
  "so-su-kien-thuc-chien": [
    {
      type: "scenario",
      title: "Bảng thống kê báo lưu lượng gấp đôi",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Bảng thống kê của dịch vụ báo số lượt phục vụ gấp đôi thực tế. Log có hai sự kiện cùng mang con số 200: hoàn tất 200 lượt gọi, và bên gọi nhận xong 200 kết quả. Bạn bắt đầu từ đâu?",
          choices: [
            { label: "Chia đôi mọi con số trên bảng cho khớp thực tế", next: "chia_doi" },
            { label: "Thêm một phép kiểm tổng Vào bằng tổng Ra, chắc sẽ bắt được", next: "kiem_can" },
            { label: "Lần theo từng sự kiện xem nó chạm sổ nào, vế nào", next: "lan_theo" },
          ],
        },
        chia_doi: {
          text: "Con số tổng nhìn khớp, nhưng những sự kiện không bị đếm đôi cũng bị chia đôi. Số lượt của các dịch vụ khác giờ sai theo hướng ngược lại, và không ai biết vì sao.",
          ending: "bad",
        },
        kiem_can: {
          text: "Phép kiểm báo mọi sự kiện đều cân. Cả hai vế đều ghi đúng số nhưng một vế ghi vào sai sổ, nên tổng khớp và lỗi vẫn nằm đó: bảng thống kê kể một câu chuyện mạch lạc về điều không có thật.",
          ending: "bad",
        },
        lan_theo: {
          text: "Sự kiện hoàn tất ghi lượt phục vụ 200 là đúng. Sự kiện nhận kết quả cũng ghi lượt phục vụ 200, trong khi nó chỉ chuyển 200 đơn vị từ việc đang chờ trả về kết nối rảnh. Bạn sửa thế nào?",
          choices: [
            { label: "Xoá hẳn sự kiện nhận kết quả khỏi log", next: "xoa_su_kien" },
            { label: "Giữ cách ghi, trừ 200 ở bước làm báo cáo", next: "tru_o_bao_cao" },
            { label: "Đổi thành Vào kết nối rảnh, Ra việc đang chờ trả", next: "doi_sang_chuyen" },
          ],
        },
        xoa_su_kien: {
          text: "Việc đang chờ trả không bao giờ giảm và kết nối rảnh luôn thiếu đúng 200. Lượt phục vụ hết bị đếm đôi, nhưng hai sổ kia lệch dần mỗi ngày.",
          ending: "bad",
        },
        tru_o_bao_cao: {
          text: "Báo cáo này đúng, nhưng log vẫn sai. Mọi bảng khác đọc thẳng từ log vẫn gấp đôi, và người viết báo cáo kế tiếp không biết phải trừ gì.",
          ending: "bad",
        },
        doi_sang_chuyen: {
          text: "Sự kiện nhận kết quả giờ chỉ là chuyển đổi giữa hai thứ đang giữ, không phát sinh lượt phục vụ mới. Bảng thống kê khớp thực tế và log nói đúng điều xảy ra.",
          ending: "good",
        },
      },
    },
  ],
  "phan-bo-chi-phi-tra-truoc": [
    {
      type: "scenario",
      title: "Có nên bỏ dịch vụ đã trả trước vì đắt hơn?",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Dịch vụ A trả trước 120 triệu cho bốn quý, phân bổ đều 30 triệu mỗi quý. Dịch vụ B trả theo giờ. Quý 1 lượng dùng của A thấp nên chi phí mỗi request của A cao hơn B; có người đề nghị bỏ A. (Số minh hoạ.) Bạn làm gì?",
          choices: [
            { label: "Bỏ A ngay vì mỗi request đắt hơn B", next: "bo_ngay" },
            { label: "Xem tiền đã ra và phần chưa phân bổ trước khi so", next: "xem_phan_con_lai" },
            { label: "Đổi A sang phân bổ theo mức dùng để trông rẻ hơn", next: "doi_cach" },
          ],
        },
        bo_ngay: {
          text: "120 triệu đã ra khỏi tài khoản từ ngày ký cam kết. Bỏ A không đem lại đồng nào, còn 90 triệu chưa phân bổ vẫn nằm đó trong khi bạn trả thêm cho B.",
          ending: "bad",
        },
        doi_cach: {
          text: "Quý 1 và các quý sau giờ dùng hai cách phân bổ khác nhau nên không so được với nhau. Con số quý 1 đẹp lên chỉ vì cách tính đổi, không vì dịch vụ rẻ hơn.",
          ending: "bad",
        },
        xem_phan_con_lai: {
          text: "Tiền đã ra đủ 120 triệu, còn 90 triệu chưa phân bổ. Khi cân nhắc gia hạn hay chuyển sang B, bạn so sánh thế nào?",
          choices: [
            { label: "Coi 90 triệu chưa phân bổ là tiền còn giữ được và đòi hoàn lại", next: "doi_hoan" },
            { label: "So phần còn lại chưa phân bổ với giá B cho cùng lượng dùng", next: "so_phan_con_lai" },
            { label: "So tổng 120 triệu với giá B của riêng quý 1", next: "so_lech_ky" },
          ],
        },
        doi_hoan: {
          text: "Khoản đó đã trả và hợp đồng không cho hoàn. Kế hoạch dòng tiền dựa trên 90 triệu không tồn tại bị hụt, và bạn phải giải thích với bên tài chính.",
          ending: "bad",
        },
        so_phan_con_lai: {
          text: "Chỉ phần còn lại mới đáng đưa vào so sánh, vì phần đã trả không đổi dù bạn chọn gì. Với lượng dùng tăng ở quý 3 và quý 4, A rẻ hơn B và bạn giữ nguyên cam kết.",
          ending: "good",
        },
        so_lech_ky: {
          text: "Tổng của cả năm đem so với một quý của B là so hai kỳ khác nhau. Kết luận đúng nghĩa không có, và quyết định chỉ là đoán.",
          ending: "bad",
        },
      },
    },
  ],
  "10-cong-thuc-phong-van-ky-thuat": [
    {
      type: "scenario",
      title: "Ước lượng tải trong buổi phỏng vấn thiết kế hệ thống",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Người phỏng vấn nói: 'Hệ thống có 100 triệu lượt xem mỗi ngày, phần lớn là đọc. Cần bao nhiêu máy?' (Số minh hoạ.) Bạn trả lời thế nào?",
          choices: [
            { label: "Chia 100 triệu cho 86.400 giây, ra khoảng 1.200 QPS, vậy bốn node là đủ", next: "chia_tho" },
            { label: "Chọn công nghệ trước, tính số sau khi đã vẽ xong sơ đồ", next: "chon_cong_nghe" },
            { label: "Lấy QPS trung bình, nhân hệ số đỉnh và nói rõ giả định", next: "nhan_dinh" },
          ],
        },
        chia_tho: {
          text: "Con số trung bình khoảng 1.200 QPS nghe hợp lý, nhưng đỉnh buổi tối gấp ba lần và bạn chưa nhắc tới cache. Người phỏng vấn ghi chú: bỏ sót hai bước của chuỗi.",
          ending: "bad",
        },
        chon_cong_nghe: {
          text: "Bạn nói hay về công nghệ, nhưng khi bị hỏi tại sao cần chừng đó node thì không có con số nào đỡ cho lựa chọn. Cả buổi chỉ còn là tranh luận về sở thích.",
          ending: "bad",
        },
        nhan_dinh: {
          text: "QPS đỉnh khoảng 3.600. Bạn giả định cache trúng 90% nên chỉ khoảng 360 QPS đến máy gốc, và nói rõ hai giả định đó. Người phỏng vấn hỏi: 'Sau một lần triển khai, cache trống thì sao?'",
          choices: [
            { label: "Cache lúc nào cũng trúng 90%, không cần tính tình huống đó", next: "bo_qua_cache" },
            { label: "Tải tới máy gốc gấp mười lần, tính node cho cả hai trạng thái", next: "hai_trang_thai" },
            { label: "Nhân gấp ba số node cho chắc mà không cần tính thêm", next: "nhan_cho_chac" },
          ],
        },
        bo_qua_cache: {
          text: "Đó chính là ngày con số sai gấp mười lần vào lúc tệ nhất. Người phỏng vấn kết luận bạn nhớ công thức nhưng chưa nối được chúng thành chuỗi.",
          ending: "bad",
        },
        hai_trang_thai: {
          text: "Cache trống thì tới 3.600 QPS đổ vào máy gốc. Bạn nêu số node cho cả hai trạng thái và đề xuất làm ấm cache trước khi chuyển lưu lượng sang. Đó là cách nối các công thức thành chuỗi.",
          ending: "good",
        },
        nhan_cho_chac: {
          text: "Gấp ba có thể đủ hoặc thừa tới ba lần, và bạn không giải thích được vì sao chọn con số đó. Tính chất 'cho chắc' là điều người phỏng vấn muốn bạn tránh.",
          ending: "bad",
        },
      },
    },
  ],
  "chon-cach-uoc-luong": [
    {
      type: "scenario",
      title: "Ước lượng dung lượng cho tính năng chưa có",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Bạn cần ước lượng dung lượng lưu trữ cho tính năng gửi ảnh đính kèm, chưa dòng mã nào được viết. Nhưng có sẵn một tính năng lưu tệp đang chạy và gần giống. Bạn chọn cách nào?",
          choices: [
            { label: "Dựng bảng ba mươi dòng nhân từ một ô đoán về số người dùng", next: "bang_dai" },
            { label: "Chạy thử mười phút trên máy cá nhân rồi nhân lên", next: "nhan_len" },
            { label: "Lấy tính năng đang chạy, nói rõ chúng giống nhau ở khía cạnh nào", next: "so_sanh" },
          ],
        },
        bang_dai: {
          text: "Bảng đẹp và nhiều dòng, nhưng mọi dòng đều nhân từ cùng một ô đoán. Khi ô ấy sai gấp ba, cả bảng sai theo mà trông vẫn đáng tin.",
          ending: "bad",
        },
        nhan_len: {
          text: "Chạy trên một máy không có nút thắt dùng chung nên phép nhân lên đẹp. Lên môi trường thật, ổ lưu trữ dùng chung nghẽn trước khi đạt một phần mười con số ước lượng.",
          ending: "bad",
        },
        so_sanh: {
          text: "Tính năng cũ lưu trung bình 2 GB mỗi người dùng (số minh hoạ), nhưng tính năng mới lưu ảnh, mỗi bản ghi lớn hơn nhiều. Hình dạng không giống hoàn toàn. Bạn làm gì tiếp?",
          choices: [
            { label: "Dùng nguyên số 2 GB vì hai tính năng cùng lưu tệp", next: "dung_nguyen" },
            { label: "Mượn phần giống, dựng mô hình cho phần khác, thử gấp ba và một phần ba", next: "ket_hop" },
            { label: "Bỏ so sánh, thử nghiệm ba tuần để đo từ đầu", next: "do_tu_dau" },
          ],
        },
        dung_nguyen: {
          text: "Giống nhau ở chỗ cùng lưu tệp, nhưng khác ở kích thước từng bản ghi, chính là đại lượng quyết định kết quả. Dung lượng thực tế gấp nhiều lần ước lượng, và bạn biết điều đó vào tháng thứ hai.",
          ending: "bad",
        },
        ket_hop: {
          text: "Bạn nói được vì sao phần lưu giống và phần ảnh khác. Thử đổi kích thước ảnh gấp ba và một phần ba thì chi phí đổi từ rẻ sang vừa phải, nên bạn báo khoảng từ mười tới bốn mươi nghìn đô thay vì một con số lẻ.",
          ending: "good",
        },
        do_tu_dau: {
          text: "Ba tuần sau bạn có số đo nhưng quyết định chọn nhà cung cấp lưu trữ đã hết hạn. Đo trực tiếp đáng tin nhất, nhưng không phải lúc nào cũng kịp so với quyết định.",
          ending: "bad",
        },
      },
    },
  ],
  "chat-luong-ma-do-bang-gi": [
    {
      type: "scenario",
      title: "Mục tiêu độ phủ kiểm thử 90%",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Quản lý đặt mục tiêu độ phủ kiểm thử 90% trước cuối quý, và chặn gộp mã nếu dưới ngưỡng. Hiện đội đang ở 62%. Bạn phản ứng ra sao?",
          choices: [
            { label: "Phản đối mọi chỉ số vì chất lượng chỉ là cảm nhận", next: "phan_doi_het" },
            { label: "Viết nhanh các kiểm thử chỉ gọi hàm mà không khẳng định gì", next: "test_rong" },
            { label: "Đề xuất dùng độ phủ để tìm chỗ cần nhìn, không làm ngưỡng chặn", next: "de_xuat" },
          ],
        },
        phan_doi_het: {
          text: "Không đưa ra thứ gì để thay thế, bạn bị coi là né tránh. Quản lý giữ nguyên ngưỡng 90% và cuộc tranh luận chỉ còn là sở thích cá nhân của hai bên.",
          ending: "bad",
        },
        test_rong: {
          text: "Độ phủ chạm 92% trong hai tháng. Số lỗi lọt ra sản xuất không giảm, vì phần lớn kiểm thử mới chỉ chạy qua mã mà không khẳng định điều gì.",
          ending: "bad",
        },
        de_xuat: {
          text: "Quản lý đồng ý xem thử. Bạn lập bảng ba hàm: A rất phức tạp nhưng không ai sửa hai năm nay; B đơn giản nhưng sửa hằng tuần; C vừa phức tạp vừa bị sửa hằng tuần. Bạn đề xuất dồn công sức vào đâu trước?",
          choices: [
            { label: "Hàm A vì điểm phức tạp cao nhất bảng", next: "chon_a" },
            { label: "Hàm B vì bị sửa nhiều nhất", next: "chon_b" },
            { label: "Hàm C, nơi phức tạp giao với tần suất thay đổi", next: "chon_c" },
          ],
        },
        chon_a: {
          text: "Hàm A không ai đụng tới nên bạn chưa phải trả đồng lãi nào cho nó. Hai tuần dọn dẹp xong, tốc độ làm việc của đội không đổi.",
          ending: "bad",
        },
        chon_b: {
          text: "Hàm B bị sửa hằng tuần nhưng đơn giản, nên mỗi lần sửa chỉ tốn ít công. Bạn dành thời gian ở nơi chi phí thay đổi vốn đã thấp.",
          ending: "bad",
        },
        chon_c: {
          text: "Hàm C vừa khó đổi vừa bị đổi liên tục, nên chi phí thay đổi vừa cao vừa bị trả thường xuyên. Sau khi thêm kiểm thử có khẳng định cho C, các lần sửa sau nhanh hơn và độ phủ tăng như hệ quả phụ.",
          ending: "good",
        },
      },
    },
  ],
  "doi-chuan-hieu-nang-do-cho-dung": [
    {
      type: "scenario",
      title: "Số 'trung bình 100 ms' trên trang giới thiệu",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Một đồng đội đề xuất dùng dịch vụ X vì trang giới thiệu ghi thời gian phản hồi trung bình 100 ms. Trang của bạn gọi tới mười dịch vụ như vậy mỗi lần mở. Bạn nói gì?",
          choices: [
            { label: "Chọn luôn vì trung bình thấp thì phần lớn người dùng nhanh", next: "chon_luon" },
            { label: "Chạy thử mười lần trên laptop rồi lấy trung bình", next: "chay_thu_it" },
            { label: "Hỏi p95, p99 và điều kiện đo: tải, dữ liệu, thời lượng", next: "hoi_duoi" },
          ],
        },
        chon_luon: {
          text: "Trung bình 100 ms hoàn toàn tương thích với việc năm phần trăm lượt phải chờ ba giây. Bạn chọn X mà chưa nhìn vào phần đuôi, nơi những người dùng bỏ đi nằm.",
          ending: "bad",
        },
        chay_thu_it: {
          text: "Mười mẫu trên một laptop rảnh rỗi cho 90 ms, và bạn thấy mình được xác nhận. Mười mẫu không đủ để có phần đuôi, và môi trường khác hẳn lúc chạy thật.",
          ending: "bad",
        },
        hoi_duoi: {
          text: "Nhà cung cấp trả lời: p95 khoảng 3 giây, đo ở tải thấp (số minh hoạ). Mỗi dịch vụ có 5% lượt chậm, còn trang gọi mười dịch vụ. Bạn quyết định thế nào?",
          choices: [
            { label: "Chọn X vì chỉ 5% lượt chậm là chấp nhận được", next: "nam_phan_tram" },
            { label: "Tính xác suất ở cấp trang, rồi thử X dưới tải thật", next: "tinh_cap_trang" },
            { label: "Loại X vì dịch vụ nào có phần đuôi đều không dùng được", next: "loai_het" },
          ],
        },
        nam_phan_tram: {
          text: "Năm phần trăm là của từng dịch vụ, không phải của trang. Với mười dịch vụ, khoảng 40% lượt mở trang chạm ít nhất một lượt chậm, và đó là trải nghiệm điển hình, không phải ngoại lệ.",
          ending: "bad",
        },
        tinh_cap_trang: {
          text: "Xác suất ở cấp trang là khoảng 40% nên bạn đặt mục tiêu p95 cho cả trang, thử X dưới tải thật và so với hai ứng viên khác. Quyết định dựa trên số do chính bạn đo.",
          ending: "good",
        },
        loai_het: {
          text: "Dịch vụ nào cũng có phần đuôi, nên bạn không còn gì để chọn. Việc cần làm là đo và hạn chế phần đuôi ở cấp trang, không phải đòi hỏi một dịch vụ không tồn tại.",
          ending: "bad",
        },
      },
    },
  ],
  "no-ky-thuat-quyet-dinh-tra-cai-nao": [
    {
      type: "scenario",
      title: "Hai tuần ngân sách, ba khoản nợ",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Đội được cấp hai tuần để trả nợ kỹ thuật. Có ba khoản: module thanh toán cũ rất tệ nhưng hai năm không ai đụng; module báo cáo khá tệ, quý tới có bốn tính năng mới chạm vào; và một đống tập lệnh triển khai thủ công. Bạn bắt đầu với gì?",
          choices: [
            { label: "Module thanh toán cũ, vì nó tệ nhất", next: "tra_cai_te" },
            { label: "Viết lại toàn bộ cả ba trong hai tuần cho sạch", next: "viet_lai_het" },
            { label: "Module báo cáo, vì sắp có việc nhiều và nó cản trở việc đó", next: "bao_cao" },
          ],
        },
        tra_cai_te: {
          text: "Sau hai tuần module thanh toán sạch đẹp, nhưng không ai đụng tới nó trước đó và cũng không ai đụng sau này. Bạn đã trả khoản nợ chưa bao giờ phải trả lãi, trong khi module báo cáo vẫn cản bốn tính năng.",
          ending: "bad",
        },
        viet_lai_het: {
          text: "Hai tuần trôi qua mà chưa có gì chạy được. Hệ thống cũ vẫn phải bảo trì song song, và đội chưa ra được tính năng nào.",
          ending: "bad",
        },
        bao_cao: {
          text: "Bạn nhận ra lãi nợ là số việc sắp làm nhân với mức cản trở, và module báo cáo lớn nhất ở cả hai. Bạn xử lý nó như thế nào?",
          choices: [
            { label: "Dọn dần phần mỗi tính năng sắp chạm, ghi lý do khoản còn lại", next: "don_dan" },
            { label: "Khoá đội hai tháng để viết lại từ đầu, song song bảo trì cũ", next: "khoa_doi" },
            { label: "Dọn nhanh rồi thôi, không ghi gì vì ai cũng biết lý do", next: "khong_ghi" },
          ],
        },
        don_dan: {
          text: "Mỗi tính năng mới để lại phần mã nó chạm vào sạch hơn trước, không cần xin thời gian riêng. Khoản nợ chưa trả được ghi cùng lý do, nên không biến thành nợ do cẩu thả.",
          ending: "good",
        },
        khoa_doi: {
          text: "Hai tháng sau bản viết lại mới được nửa chừng, bốn tính năng của quý này đã trễ, và hệ thống cũ vẫn phát sinh lỗi cần người sửa.",
          ending: "bad",
        },
        khong_ghi: {
          text: "Sáu tháng sau người mới vào đội thấy những chỗ chưa dọn và không biết đó là quyết định có chủ ý hay cẩu thả. Họ làm theo đúng kiểu cũ, và nợ tự nhân bản.",
          ending: "bad",
        },
      },
    },
  ],
  "quy-uoc-va-kiem-tra-tu-dong": [
    {
      type: "scenario",
      title: "Quy tắc kiểm tra tự động gây nhiễu",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Bạn thêm vào công cụ kiểm tra mã một quy tắc mới: 'tên biến phải mô tả đúng giá trị nó chứa'. Hôm sau nó báo ba trăm chỗ, phần lớn là báo sai, và cả đội bắt đầu bấm bỏ qua. Bạn làm gì?",
          choices: [
            { label: "Giữ nguyên và bảo mọi người tự lọc cảnh báo thật", next: "tu_loc" },
            { label: "Hạ yêu cầu xuống mức mã cũ đã đạt để cổng xanh", next: "ha_chuan" },
            { label: "Tắt hẳn quy tắc và giao việc đó cho người rà soát", next: "tat_quy_tac" },
          ],
        },
        tu_loc: {
          text: "Cả đội học cách bỏ qua cảnh báo, kể cả những cảnh báo thật. Ba tuần sau một lỗi nghiêm trọng bị công cụ báo nhưng không ai đọc.",
          ending: "bad",
        },
        ha_chuan: {
          text: "Cổng xanh trở lại, nhưng quy tắc giờ chỉ chặn những thứ mã cũ vốn đã đạt. Nó không còn lý do để tồn tại, và mọi người đều biết điều đó.",
          ending: "bad",
        },
        tat_quy_tac: {
          text: "Cảnh báo còn lại ít nhưng đáng tin. Bạn thêm một quy tắc máy kiểm được thật sự: tên hàm dạng snake_case. Mã cũ vi phạm khoảng hai nghìn chỗ. Bạn áp dụng thế nào?",
          choices: [
            { label: "Chỉ áp cho mã mới và mã vừa sửa, cấu hình giống nhau ở mọi máy", next: "ap_dan" },
            { label: "Sửa hết hai nghìn chỗ trong một bản thay đổi duy nhất", next: "sua_mot_lan" },
            { label: "Chỉ chạy ở quy trình chung, máy cá nhân khỏi cài", next: "chi_chay_chung" },
          ],
        },
        ap_dan: {
          text: "Mã mới luôn đúng quy ước, mã cũ được sửa dần mỗi khi chạm tới. Cấu hình dùng chung nên không ai thấy kết quả khác ở máy mình so với quy trình chung.",
          ending: "good",
        },
        sua_mot_lan: {
          text: "Bản thay đổi hai nghìn chỗ không ai rà soát nổi. Nó xung đột với ba nhánh đang làm dở, và cả đội mất hai ngày chỉ để gộp mã.",
          ending: "bad",
        },
        chi_chay_chung: {
          text: "Lập trình viên chỉ biết mình vi phạm sau khi đẩy mã và chờ quy trình chạy. Phản hồi muộn nghĩa là mỗi lỗi nhỏ tốn một vòng sửa, rà lại.",
          ending: "bad",
        },
      },
    },
  ],
  "vi-sao-nhieu-cuoc-thay-doi-lon-that-bai": [
    {
      type: "scenario",
      title: "Đội xin dời hạn di trú lần thứ hai",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Đội di trú sang hệ thống mới xin dời ngày kết thúc lần thứ hai, giữ nguyên phạm vi. Báo cáo ghi 80% module đã viết xong. Bạn trả lời thế nào?",
          choices: [
            { label: "Đồng ý dời vì 80% nghĩa là gần xong", next: "dong_y" },
            { label: "Từ chối dời và yêu cầu cả đội làm thêm giờ", next: "lam_them_gio" },
            { label: "Hỏi tỷ lệ lưu lượng thật đang chạy qua hệ thống mới", next: "hoi_luu_luong" },
          ],
        },
        dong_y: {
          text: "Lần dời thứ ba đã nằm sẵn trong kế hoạch vì ước lượng chưa được sửa. Dự án không thất bại dứt khoát mà mờ dần, và nguồn lực vẫn bị ngốn mà không ai phải quyết gì.",
          ending: "bad",
        },
        lam_them_gio: {
          text: "Đội làm thêm giờ vài tuần, rồi hai người giỏi nhất xin chuyển đi. Hạn vẫn không đổi nhưng phạm vi thì chưa ai đụng tới.",
          ending: "bad",
        },
        hoi_luu_luong: {
          text: "Chỉ khoảng 15% yêu cầu thật đang đi qua hệ thống mới. Phần còn lại là trường hợp lạ và khách hàng đặc biệt mà chưa đội nào nhận. Bạn quyết định gì?",
          choices: [
            { label: "Báo cáo 80% lên cấp trên để mọi người yên tâm", next: "bao_cao_80" },
            { label: "Đặt định nghĩa xong là gì, cắt phạm vi và giao người nhận phần ở giữa", next: "dat_diem_dung" },
            { label: "Giao cho đội nào rảnh nhất, không đặt điểm dừng", next: "giao_roi" },
          ],
        },
        bao_cao_80: {
          text: "Cấp trên yên tâm đúng đến lúc họ hỏi tại sao hệ thống cũ chưa tắt được. Con số đội tự khai báo không đo thứ quan trọng, và bạn là người đã chuyển nó đi tiếp.",
          ending: "bad",
        },
        dat_diem_dung: {
          text: "Cả đội thống nhất: xong nghĩa là 100% lưu lượng đi qua hệ thống mới, trừ ba loại trường hợp được cắt ra rõ ràng. Hạn dời lần này đi kèm phạm vi nhỏ lại, nên đó là điều chỉnh lành mạnh chứ không phải mờ dần.",
          ending: "good",
        },
        giao_roi: {
          text: "Không có điểm dừng nên mọi vấn đề đều là lý do hợp lý để kéo dài. Sáu tháng sau phần mười cuối cùng vẫn ở đó, không ai nhận và cũng không ai bị hỏi.",
          ending: "bad",
        },
      },
    },
  ],
  "phan-tich-variance-thuc-te-vs-ke-hoach": [
    {
      type: "scenario",
      title: "Chi phí đám mây thấp hơn dự trù 30%",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Báo cáo tháng cho thấy chi phí đám mây dưới dự trù 30%. Sếp muốn coi đây là tin tốt và chuyển sang việc khác. (Số minh hoạ.) Bạn làm gì?",
          choices: [
            { label: "Ghi nhận tin tốt và không xem thêm", next: "ghi_nhan" },
            { label: "Giảm dự trù tháng sau đúng 30% cho khớp", next: "giam_du_tru" },
            { label: "Tách chênh lệch thành phần lượng dùng và phần đơn giá", next: "tach" },
          ],
        },
        ghi_nhan: {
          text: "Chi phí dưới dự trù hiếm khi bị xem xét. Ba tháng sau mới có người nhận ra con số thấp là vì tính năng mới gần như không có người dùng, và lúc đó chiến dịch ra mắt đã trôi qua.",
          ending: "bad",
        },
        giam_du_tru: {
          text: "Dự trù mới khớp với thực tế tháng này, nhưng bạn vừa xoá khả năng cảnh báo của báo cáo. Tháng nào cũng khớp thì không còn gì để đọc, và kế hoạch chỉ còn là bản sao của kỳ trước.",
          ending: "bad",
        },
        tach: {
          text: "Đơn giá không đổi. Toàn bộ chênh lệch nằm ở lượng dùng: tính năng mới chỉ có khoảng một nửa số người dùng dự tính. Bạn xử lý kết quả này ra sao?",
          choices: [
            { label: "Coi đây là kỷ luật chi tiêu tốt và khen cả đội", next: "khen_doi" },
            { label: "Báo đây là tin về sản phẩm và đưa cho đội sản phẩm xem", next: "bao_san_pham" },
            { label: "Dùng khoản dư mua thêm tài nguyên cho đủ ngân sách", next: "tieu_cho_het" },
          ],
        },
        khen_doi: {
          text: "Đội được khen vì một thứ họ không làm. Chi phí thấp chỉ vì ít người dùng, và lời khen che mất điều quan trọng nhất của cả bảng.",
          ending: "bad",
        },
        bao_san_pham: {
          text: "Đội sản phẩm xem lại phễu và thấy bước đăng ký bị gãy ở một màn hình. Bạn giúp biến một dòng trông tốt trên báo cáo chi phí thành một việc cụ thể cho đúng người.",
          ending: "good",
        },
        tieu_cho_het: {
          text: "Tài nguyên mới không có người dùng nào để phục vụ, và chênh lệch biến mất khỏi báo cáo. Bạn đã chi tiền để làm cho lượng dùng thấp trông không còn là vấn đề.",
          ending: "bad",
        },
      },
    },
  ],
  "dung-luong-du-phong-bao-nhieu-la-du": [
    {
      type: "scenario",
      title: "Giữ bao nhiêu dung lượng dự phòng",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Tải trung bình là 100 yêu cầu mỗi giây, đỉnh đã quan sát được là 700, và dự kiến tăng 20%. Một đồng đội đề xuất giữ dung lượng gấp đôi trung bình, tức 200. (Số minh hoạ.) Bạn trả lời thế nào?",
          choices: [
            { label: "Duyệt vì gấp đôi nghe đã đủ an toàn", next: "duyet_gap_doi" },
            { label: "Giữ đỉnh nhân năm cho chắc, không cần tính thêm", next: "nhan_nam" },
            { label: "Tính theo đỉnh quan sát được, cộng tăng trưởng và độ trễ mở rộng", next: "tinh_theo_dinh" },
          ],
        },
        duyet_gap_doi: {
          text: "Dung lượng 200 nằm rất xa dưới đỉnh 700. Đợt tải cao đầu tiên làm hệ thống sập đúng lúc nhiều người dùng nhất, và con số gấp đôi nghe an toàn chỉ vì nó là bội số của phần giữa.",
          ending: "bad",
        },
        nhan_nam: {
          text: "Dung lượng giờ rất dư, và chi phí đều đặn mỗi tháng cho phần chưa từng dùng tới không gây sự cố nào, nên không ai rà soát. Nó lớn dần mỗi lần có người thấy lo.",
          ending: "bad",
        },
        tinh_theo_dinh: {
          text: "Đỉnh nhân 1,2 cho khoảng 840, cộng thêm phần tải tăng trong thời gian chờ mở rộng. Bạn muốn giảm đệm bằng cách dựa vào cơ chế mở rộng tự động, nhưng nó chưa bao giờ chạy ở quy mô thật. Bạn làm gì?",
          choices: [
            { label: "Tin cơ chế tự động và hạ đệm xuống 300 ngay", next: "ha_ngay" },
            { label: "Giữ 840 mãi để khỏi phải chạy thử cơ chế", next: "giu_mai" },
            { label: "Chạy thử mở rộng ở quy mô thật rồi mới hạ đệm", next: "chay_thu" },
          ],
        },
        ha_ngay: {
          text: "Đúng ngày cần mở rộng, tài khoản chạm hạn mức mà không ai biết có hạn mức đó. Cơ chế tự động chưa từng chạy ở quy mô thật chỉ là một giả định, và lần này nó sai.",
          ending: "bad",
        },
        giu_mai: {
          text: "Hệ thống an toàn nhưng chi phí đệm không bao giờ được xem lại. Mỗi quý lại có người cộng thêm một chút cho yên tâm, và hoá đơn đều đặn tăng theo.",
          ending: "bad",
        },
        chay_thu: {
          text: "Buổi chạy thử cho thấy hạn mức tài khoản và số kết nối tối đa tới cơ sở dữ liệu là hai giới hạn chưa ai biết. Sau khi nới cả hai, bạn hạ đệm xuống mức mỏng hơn có căn cứ.",
          ending: "good",
        },
      },
    },
  ],
};
