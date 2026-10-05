import type { LessonSectionBlock } from "../lesson-types";

// Khối mô phỏng (sim | aiLab | scenario) cho bài còn thiếu - đợt r11. Một người viết cho một tệp.
export const R11_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "dam-phan-tang-luong-o-cong-ty-hien-tai": [
    {
      type: "scenario",
      title: "Cuộc trò chuyện về lương với quản lý",
      start: "mo-dau",
      nodes: {
        "mo-dau": {
          text: "Bạn đã ghi lại kết quả sáu tháng qua và định xin tăng lương trong buổi một-một sắp tới. Quản lý hỏi: \"Em muốn trao đổi gì hôm nay?\" Bạn mở đầu bằng cách nào?",
          choices: [
            { label: "Em ở công ty ba năm rồi, em nghĩ đã đến lúc xem lại mức lương", next: "tham-nien" },
            { label: "Phạm vi việc của em đã rộng hơn, em muốn xem lại mức lương theo đó", next: "pham-vi" },
            { label: "Bạn cùng nhóm vào sau em mà đang được trả cao hơn em", next: "so-sanh" },
          ],
        },
        "tham-nien": {
          text: "Quản lý gật đầu và nói: \"Anh hiểu, nhưng ngân sách năm nay chặt, ai cũng ở lâu cả.\" Bạn thấy cuộc trò chuyện đang trượt đi. Bạn làm gì tiếp?",
          choices: [
            { label: "Nhắc lại rằng chi phí sinh hoạt tăng nên em cần được điều chỉnh", next: "chi-phi" },
            { label: "Chuyển sang nói về ba việc em đã nhận thêm từ đầu năm", next: "pham-vi" },
          ],
        },
        "so-sanh": {
          text: "Quản lý cau mày: \"Bạn đó có kinh nghiệm khác, vị trí khác, em không biết hết đâu.\" Cuộc nói chuyện chuyển sang chuyện công bằng nội bộ và bạn không có số liệu để đáp lại.",
          choices: [
            { label: "Cố chứng minh hai người làm việc giống nhau", next: "ket-so-sanh" },
            { label: "Xin lỗi vì lạc đề rồi quay về những việc em đã làm", next: "pham-vi" },
          ],
        },
        "chi-phi": {
          text: "Quản lý đáp: \"Ai cũng chịu giá cả như nhau, anh không có lý do gì để ưu tiên riêng em.\"",
          ending: "bad",
        },
        "ket-so-sanh": {
          text: "Bạn không có hợp đồng hay mức lương của người kia, chỉ có lời kể. Quản lý đóng chủ đề bằng \"việc nội bộ anh không bàn\", và bạn ra về mà không có gì ngoài một mối quan hệ gượng gạo.",
          ending: "bad",
        },
        "pham-vi": {
          text: "Bạn đưa ra sổ ghi: ba việc nhận thêm, một quy trình đã rút ngắn thời gian xử lý, và một khoản chi phí đã cắt. Quản lý hỏi: \"Em đề nghị con số nào?\" Bạn trả lời thế nào?",
          choices: [
            { label: "Em cần bao nhiêu thì anh cứ cân nhắc giúp em", next: "mo-ho" },
            { label: "Em đề nghị một mức cụ thể, kèm cách tính theo phạm vi mới", next: "cu-the" },
          ],
        },
        "mo-ho": {
          text: "Quản lý hứa \"sẽ xem xét\" nhưng không có hạn nào. Đến kỳ chốt ngân sách, khoản của bạn không có trong danh sách vì chưa ai biết cần xin bao nhiêu.",
          ending: "bad",
        },
        "cu-the": {
          text: "Quản lý có thứ để mang lên cấp trên: một con số, các việc đã làm, và mốc thời gian. Ông hẹn trả lời trước kỳ chốt ngân sách, và bạn có đủ tài liệu để ông bênh vực bạn khi vắng mặt.",
          ending: "good",
        },
      },
    },
  ],

  "tong-dai-ngo-khong-chi-luong-gross": [
    {
      type: "scenario",
      title: "Hai thư mời, cùng một con số lương",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Bạn nhận hai thư mời cùng ghi lương gross 30 triệu một tháng. Nơi A nhắn bạn trả lời trong hai ngày. Bạn quyết định xử lý thế nào? (Các con số trong tình huống chỉ để minh hoạ.)",
          choices: [
            { label: "Chọn nơi A vì công ty có tên tuổi hơn, lương hai bên bằng nhau", next: "chon-ten" },
            { label: "Gửi hai nơi cùng một danh sách câu hỏi về các khoản ngoài lương", next: "hoi" },
            { label: "Chọn nơi có văn phòng gần nhà hơn để đỡ tốn đi lại", next: "chon-gan" },
          ],
        },
        "chon-ten": {
          text: "Ba tháng sau bạn mới biết nơi A đóng bảo hiểm chỉ trên 12 triệu lương cứng, còn phần còn lại là phụ cấp, và thưởng cuối năm chưa từng quá một tháng lương.",
          ending: "bad",
        },
        "chon-gan": {
          text: "Khoảng cách gần giúp bạn tiết kiệm một khoản đi lại, nhưng đó chỉ là một trong nhiều khoản. Bạn vẫn chưa biết mức đóng bảo hiểm và thưởng của hai nơi. Quyết định này hơi vội. Bạn làm gì tiếp?",
          choices: [
            { label: "Ký luôn với nơi gần nhà, vì khoản đi lại là thứ chắc chắn", next: "ky-vo" },
            { label: "Quay lại hỏi cả hai nơi về bảo hiểm, thưởng và phụ cấp", next: "hoi" },
          ],
        },
        "ky-vo": {
          text: "Bạn ký ngay. Sau này nhìn bảng so sánh của đồng nghiệp ở nơi kia, bạn thấy chênh lệch về thưởng và bảo hiểm lớn hơn nhiều khoản đi lại bạn đã tiết kiệm được.",
          ending: "bad",
        },
        "hoi": {
          text: "Nơi A trả lời đầy đủ. Nơi B chỉ trả lời \"có thưởng theo kết quả\" mà không nêu số tháng. Bạn nên tính thế nào cho phần chưa được cam kết?",
          choices: [
            { label: "Tính thưởng của nơi B ở mức tối đa họ từng nhắc miệng", next: "tinh-cao" },
            { label: "Coi khoản chưa có văn bản là bằng không, chỉ cộng khoản đã nêu", next: "tinh-thap" },
          ],
        },
        "tinh-cao": {
          text: "Với con số lạc quan, nơi B có vẻ hơn gần hai tháng lương. Bạn chọn B, nhưng năm đó công ty hết ngân sách và khoản thưởng bằng không. Cuối năm bạn thấy mình thiệt so với nơi A.",
          ending: "bad",
        },
        "tinh-thap": {
          text: "Hai bảng tính giờ cùng một gốc, chỉ cộng những gì có trên giấy. Bạn thấy nơi nào thật sự hơn, và nếu thưởng của B tốt hơn dự kiến thì đó là phần thêm. Quyết định của bạn dựa trên thứ kiểm chứng được.",
          ending: "good",
        },
      },
    },
  ],

  "dinh-gia-dich-vu-freelance": [
    {
      type: "scenario",
      title: "Báo giá cho khách đầu tiên",
      start: "tinh-gia",
      nodes: {
        "tinh-gia": {
          text: "Bạn vừa nghỉ việc làm công, mức lương cũ tương đương khoảng 250.000 đồng một giờ. Một khách nhỏ hỏi giá thiết kế trang web. Bạn báo giá theo cách nào? (Số liệu chỉ minh hoạ.)",
          choices: [
            { label: "Lấy đúng 250.000 đồng một giờ vì đó là mức bạn đã quen", next: "dung-luong-cu" },
            { label: "Cộng chi phí tự lo, chia cho số giờ bán được thật mỗi tháng", next: "chia-gio-ban" },
            { label: "Giảm còn 150.000 đồng một giờ để chắc chắn có khách", next: "ha-gia" },
          ],
        },
        "dung-luong-cu": {
          text: "Cuối tháng đầu bạn tính lại: chỉ khoảng một nửa số giờ làm là giờ tính tiền được, phần còn lại là họp, báo giá, sửa theo góp ý. Bạn cũng phải tự mua phần mềm và bảo hiểm. Thu nhập thực thấp hơn lương cũ rõ rệt. Bạn làm gì?",
          choices: [
            { label: "Làm thêm giờ để bù, giữ nguyên đơn giá", next: "cay-gio" },
            { label: "Tính lại đơn giá theo giờ bán được và báo cho khách mới", next: "chia-gio-ban" },
          ],
        },
        "ha-gia": {
          text: "Khách nhận giá ngay và giới thiệu bạn cho vài người cùng nhóm giá rẻ. Khi bạn muốn nâng giá, họ nói \"lúc đầu đâu có vậy\", và bạn đã tự đặt một mốc rất khó kéo lên.",
          ending: "bad",
        },
        "cay-gio": {
          text: "Bạn làm cuối tuần, bỏ cả bữa trưa, và kiệt sức sau hai tháng. Con số trên giấy trông ổn, nhưng nó dựa trên việc bạn làm nhiều giờ hơn bất kỳ người làm công nào, và không ai trả thêm cho chuyện đó.",
          ending: "bad",
        },
        "chia-gio-ban": {
          text: "Đơn giá của bạn cao hơn mức lương cũ vì đã bù cho giờ không bán được và các khoản trước kia công ty gánh. Khách do dự và đề nghị giảm giá để dự án này mở đầu mối quan hệ. Bạn đáp thế nào?",
          choices: [
            { label: "Giảm đơn giá một phần để khách chịu ký", next: "giam-don-gia" },
            { label: "Giữ đơn giá, đổi lại bằng phạm vi nhỏ hơn hoặc tiến độ dài hơn", next: "nhuong-pham-vi" },
          ],
        },
        "giam-don-gia": {
          text: "Khách ký, nhưng lần sau họ lấy mức đã giảm làm mốc. Bạn nhận ra mình vừa nhượng đúng thứ khó lấy lại nhất.",
          ending: "bad",
        },
        "nhuong-pham-vi": {
          text: "Khách chấp nhận phạm vi gọn hơn trong đợt đầu, và còn lại phần mở rộng sẽ báo giá sau. Đơn giá của bạn vẫn nguyên, nên các dự án sau không bị kéo xuống.",
          ending: "good",
        },
      },
    },
  ],

  "ban-do-tang-thu-nhap-12-thang": [
    {
      type: "scenario",
      title: "Năm giờ mỗi tuần, bốn hướng đi",
      start: "dau-nam",
      nodes: {
        "dau-nam": {
          text: "Đầu năm, bạn muốn tăng thu nhập và có chừng năm giờ rảnh mỗi tuần. Bạn đang có bốn ý định: đàm phán, đổi việc, nhận việc tự do, và làm một sản phẩm riêng. Bạn bắt đầu từ đâu?",
          choices: [
            { label: "Làm cả bốn song song, mỗi việc khoảng một giờ rưỡi mỗi tuần", next: "lam-het" },
            { label: "Tra dải thị trường và mở sổ ghi kết quả, hai việc rẻ nhất", next: "tra-thi-truong" },
            { label: "Nhắm ngay vào sản phẩm riêng vì thu nhập thụ động có vẻ hấp dẫn nhất", next: "san-pham" },
          ],
        },
        "lam-het": {
          text: "Sau ba tháng, mỗi nhánh mới tới nửa chừng: chưa đủ để đàm phán, chưa gửi hồ sơ đi đâu, chưa có khách nào, sản phẩm chưa ra mắt. Bạn mệt hơn nhưng thu nhập chưa đổi. Bạn làm gì?",
          choices: [
            { label: "Cắt còn một nhánh có tỷ suất cao nhất và dồn giờ vào đó", next: "tra-thi-truong" },
            { label: "Thêm thời gian ban đêm để cả bốn nhánh kịp tiến độ", next: "thuc-khuya" },
          ],
        },
        "thuc-khuya": {
          text: "Bạn ngủ ít đi và chất lượng công việc chính giảm. Đến tháng thứ chín, bốn nhánh vẫn dở dang và quản lý bắt đầu để ý chuyện bạn lơ đãng.",
          ending: "bad",
        },
        "san-pham": {
          text: "Bạn dành năm giờ mỗi tuần cho sản phẩm riêng. Sáu tháng sau chưa có người dùng trả tiền, trong khi lương chính của bạn vẫn nằm yên. Bạn nghĩ lại.",
          choices: [
            { label: "Tiếp tục vì đã đầu tư rồi, tin rằng sắp có kết quả", next: "sa-lay" },
            { label: "Quay về nhánh đàm phán ở việc chính, nơi tỷ suất cao nhất", next: "tra-thi-truong" },
          ],
        },
        "sa-lay": {
          text: "Chín tháng, rồi mười hai tháng trôi qua. Sản phẩm có vài chục người dùng thử miễn phí và doanh thu gần bằng không. Cùng quãng thời gian đó, bạn đã bỏ lỡ hai kỳ chốt ngân sách.",
          ending: "bad",
        },
        "tra-thi-truong": {
          text: "Bạn biết mình đang ở đâu so với thị trường và có sổ ghi kết quả thật. Đến quý hai, kỳ chốt ngân sách đang tới. Bạn dùng những giờ rảnh vào đâu?",
          choices: [
            { label: "Chuẩn bị đàm phán ở việc chính, rồi mới xét nhánh kế tiếp", next: "dam-phan-truoc" },
            { label: "Nộp luôn hồ sơ nơi khác để lấy lời mời làm đòn bẩy", next: "doi-viec-som" },
          ],
        },
        "doi-viec-som": {
          text: "Bạn nhận một lời mời, nhưng công ty hiện tại thấy bạn dùng nó làm vũ khí. Họ nâng lương để giữ người và âm thầm bắt đầu tìm người thay.",
          ending: "bad",
        },
        "dam-phan-truoc": {
          text: "Bạn đàm phán đúng thời điểm với sổ ghi kết quả trong tay và được tăng lương. Phần tăng thêm bạn giữ lại, không để hòa vào chi tiêu. Đến quý ba, nhánh chính đã tới trần và bạn chuyển sang nguồn thu thứ hai.",
          ending: "good",
        },
      },
    },
  ],

  "cong-va-dich-vu-dang-lang-nghe": [
    {
      type: "scenario",
      title: "Một cổng lạ trong danh sách đang nghe",
      start: "phat-hien",
      nodes: {
        "phat-hien": {
          text: "Bạn chạy lệnh liệt kê cổng đang lắng nghe trên máy chủ web của nhóm và thấy cổng 6379 nghe trên mọi giao diện (0.0.0.0). Người dựng máy trước đây đã nghỉ. Bạn xử lý thế nào?",
          choices: [
            { label: "Bỏ qua, vì Redis chạy lâu rồi mà chưa có sự cố nào", next: "bo-qua" },
            { label: "Tìm tiến trình đứng sau cổng và hỏi ứng dụng có cần nghe ra ngoài không", next: "tim-tien-trinh" },
            { label: "Tắt ngay dịch vụ đó để chắc chắn không ai vào được", next: "tat-ngay" },
          ],
        },
        "bo-qua": {
          text: "Hai tuần sau, một bộ quét tự động từ Internet tìm thấy cổng đó, kết nối vào mà không cần mật khẩu và xoá sạch phiên đăng nhập của người dùng.",
          ending: "bad",
        },
        "tat-ngay": {
          text: "Trang web báo lỗi 500 ngay vì ứng dụng dùng chính dịch vụ này để lưu phiên. Bạn phải bật lại trong lúc khách đang hỏi, và vẫn chưa biết nó nên nghe ở đâu.",
          choices: [
            { label: "Bật lại như cũ rồi để đó, chờ cuối tuần xử lý", next: "bat-lai-de-do" },
            { label: "Bật lại, rồi tìm hiểu ai gọi vào cổng đó trước khi sửa cấu hình", next: "tim-tien-trinh" },
          ],
        },
        "bat-lai-de-do": {
          text: "Cuối tuần đến, việc khác chen vào, và cổng vẫn nghe trên mọi giao diện. Nó nằm đó thêm nhiều tháng cho đến khi có người khác phát hiện.",
          ending: "bad",
        },
        "tim-tien-trinh": {
          text: "Tiến trình là Redis, và chỉ ứng dụng web trên cùng máy này gọi vào nó. Cấu hình hiện cho nghe trên mọi giao diện, bạn chọn gì?",
          choices: [
            { label: "Giữ nguyên nghe mọi giao diện, thêm mật khẩu cho yên tâm", next: "chi-them-mat-khau" },
            { label: "Đổi sang nghe ở 127.0.0.1, khởi động lại rồi kiểm tra từ bên ngoài", next: "dong-cong" },
          ],
        },
        "chi-them-mat-khau": {
          text: "Mật khẩu giúp một phần, nhưng cổng vẫn nằm trên bề mặt tấn công, và mọi lỗi sau này của dịch vụ đều chạm được từ Internet. Dịch vụ không cần ra ngoài mà vẫn đứng ngoài.",
          ending: "bad",
        },
        "dong-cong": {
          text: "Ứng dụng web vẫn hoạt động vì gọi qua địa chỉ nội bộ. Lệnh kiểm tra từ máy khác không còn thấy cổng 6379. Bạn ghi lại trong tài liệu vận hành lý do và cấu hình đúng.",
          ending: "good",
        },
      },
    },
  ],

  "tls-chung-chi-va-lop-bao-ve-phia-truoc": [
    {
      type: "scenario",
      title: "Ba tuần trước khi chứng chỉ hết hạn",
      start: "canh-bao",
      nodes: {
        "canh-bao": {
          text: "Một đồng nghiệp nhắn rằng chứng chỉ TLS của trang khách hàng còn 20 ngày là hết hạn. Việc gia hạn từng làm tay bởi người đã rời đội. Bạn xử lý thế nào?",
          choices: [
            { label: "Ghi chú vào lịch nhắc làm tay vào ngày còn một tuần", next: "lich-nhac" },
            { label: "Gia hạn ngay bây giờ, rồi dựng cách tự gia hạn và có báo động", next: "gia-han-tu-dong" },
            { label: "Tạm tắt cảnh báo trình duyệt cho trang, chờ có thời gian xử lý", next: "tat-canh-bao" },
          ],
        },
        "lich-nhac": {
          text: "Ngày nhắc đến đúng lúc cả đội đang chạy theo một đợt phát hành. Ai cũng tưởng người khác sẽ làm. Hai ngày sau khi hết hạn, khách bắt đầu báo trình duyệt cảnh báo \"không an toàn\".",
          ending: "bad",
        },
        "tat-canh-bao": {
          text: "Bạn không thể làm vậy từ phía máy chủ; việc tắt cảnh báo chỉ có thể nằm ở máy người dùng, và đó không phải giải pháp. Bạn quay lại nghĩ cách thật sự. Hướng nào?",
          choices: [
            { label: "Chuyển trang sang HTTP thường cho đến khi gia hạn xong", next: "ha-http" },
            { label: "Gia hạn chứng chỉ và đặt gia hạn tự động", next: "gia-han-tu-dong" },
          ],
        },
        "ha-http": {
          text: "Mọi dữ liệu đăng nhập của khách đi qua đường truyền không mã hoá, nhìn thấy được với bất kỳ ai chen giữa. Trình duyệt còn gắn nhãn \"không bảo mật\" lên toàn trang.",
          ending: "bad",
        },
        "gia-han-tu-dong": {
          text: "Chứng chỉ mới đã cài và trang hiện ổ khoá bình thường. Giờ bạn có một việc nữa: cách bảo đảm lần sau không ai phải nhớ. Bạn chọn gì?",
          choices: [
            { label: "Để proxy phía trước tự gia hạn, và báo khi còn dưới 14 ngày mà chưa đổi", next: "tu-dong-co-bao" },
            { label: "Để nó tự gia hạn, tin rằng sẽ ổn vì không còn việc tay", next: "tu-dong-khong-bao" },
          ],
        },
        "tu-dong-khong-bao": {
          text: "Chín tháng sau, cơ chế tự gia hạn lặng lẽ thất bại vì thay đổi DNS. Không ai biết cho đến khi khách báo trình duyệt cảnh báo, vì việc tự động chết đi không sinh ra lỗi nào.",
          ending: "bad",
        },
        "tu-dong-co-bao": {
          text: "Chứng chỉ gia hạn không cần ai nhớ, và nếu quá trình trục trặc thì còn đủ hai tuần để xử lý trước hạn. Việc kiểm tra chủ động nằm ở phía báo động, không phụ thuộc trí nhớ.",
          ending: "good",
        },
      },
    },
  ],

  "dat-tien-o-dau-cho-tung-muc-dich": [
    {
      type: "scenario",
      title: "Bản sao lưu đêm im lặng suốt ba tuần",
      start: "phat-hien",
      nodes: {
        "phat-hien": {
          text: "Cần khôi phục dữ liệu, bạn mới thấy bản sao lưu mới nhất trên máy chủ đã ba tuần tuổi. Dòng cron chạy sao lưu mỗi đêm vẫn nằm trong lịch. Điều đầu tiên bạn làm?",
          choices: [
            { label: "Chạy lại script bằng tay, thấy chạy được thì kết luận cron không có vấn đề", next: "chay-tay" },
            { label: "Xem nhật ký cron và chạy script trong môi trường tối giản của cron", next: "moi-truong" },
            { label: "Sửa lịch sang chạy hai lần mỗi đêm cho chắc", next: "chay-doi" },
          ],
        },
        "chay-tay": {
          text: "Chạy tay thì thành công, nên bạn tưởng yên tâm. Nhưng tối hôm sau bản sao lưu vẫn không có. Bạn đã bỏ sót điều gì?",
          choices: [
            { label: "Cho rằng cron bị lỗi hệ thống và bỏ nó để dùng cách khác", next: "bo-cron" },
            { label: "Thử chạy với đúng môi trường cron dùng thay vì phiên đăng nhập của mình", next: "moi-truong" },
          ],
        },
        "chay-doi": {
          text: "Lịch chạy hai lần nhưng nguyên nhân vẫn còn, nên cả hai lần đều thất bại âm thầm. Hai lần im lặng không an toàn hơn một lần.",
          ending: "bad",
        },
        "bo-cron": {
          text: "Bạn chuyển sang một cách chạy khác nhưng chưa tìm ra nguyên nhân thật. Nó có thể lặp lại ở công cụ mới, và bạn vẫn không biết khi nào nó chết.",
          ending: "bad",
        },
        "moi-truong": {
          text: "Trong môi trường tối giản của cron, lệnh pg_dump không được tìm thấy vì đường dẫn không có trong PATH. Script chết ngay dòng đầu và cron không báo gì. Bạn sửa bằng cách nào?",
          choices: [
            { label: "Ghi đường dẫn đầy đủ của lệnh và tệp trong script", next: "co-duong-dan" },
            { label: "Thêm \"|| true\" vào cuối dòng để không còn thông báo lỗi nào nữa", next: "nuot-loi" },
          ],
        },
        "nuot-loi": {
          text: "Cron không còn gửi thư báo lỗi, nhưng script vẫn thất bại như cũ. Bạn vừa tắt luôn thứ duy nhất có thể báo cho mình biết.",
          ending: "bad",
        },
        "co-duong-dan": {
          text: "Bản sao lưu chạy lại được. Bạn cũng cho script ping về một dịch vụ giám sát sau mỗi lần thành công, và nơi đó báo động khi quá hai ngày chưa thấy tín hiệu. Lần sau, sự im lặng sẽ tự kêu lên.",
          ending: "good",
        },
      },
    },
  ],

  "ra-soat-tien-gui-hang-nam": [
    {
      type: "sim",
      tool: "terminal",
      mission: "log-rank",
      title: "Xếp hạng điều đáng nhìn nhất trong nhật ký",
      task: "Buổi rà soát cần biết điều gì lặp nhiều nhất. Trong trình mô phỏng, lấy các dòng ERROR của app.log, cắt cột tên lỗi, đếm từng loại rồi xếp giảm dần vào top-loi.txt. Cùng đường ống grep, cut, sort, uniq này dùng được để đếm số lần đăng nhập SSH thất bại theo từng địa chỉ trong nhật ký xác thực khi bạn rà máy thật.",
    },
  ],

  "luong-gross-net-thue-va-bao-hiem": [
    {
      type: "scenario",
      title: "Hai thư mời, khác nhau ở chỗ ít ai đọc",
      start: "hai-thu",
      nodes: {
        "hai-thu": {
          text: "Công ty X mời bạn 28 triệu \"net\" mỗi tháng, đóng bảo hiểm trên 8 triệu. Công ty Y mời 32 triệu \"gross\", đóng bảo hiểm trên toàn bộ lương. Bạn so sánh thế nào? (Số liệu chỉ minh hoạ.)",
          choices: [
            { label: "Chọn X vì 28 triệu net nghe cao hơn nhiều so với 32 triệu gross", next: "chon-net" },
            { label: "Hỏi lại cách tính cả hai, quy về cùng gốc rồi mới so", next: "quy-doi" },
            { label: "Chọn Y vì con số 32 triệu lớn hơn và khỏi lo chuyện thuế", next: "chon-gross" },
          ],
        },
        "chon-net": {
          text: "Bạn nhận lời X ngay. Nhưng so sánh một con số net với một con số gross là so hai thứ khác loại. Bạn chưa biết lương X nếu quy về gross là bao nhiêu. Bạn làm gì tiếp?",
          choices: [
            { label: "Ký luôn, nhà tuyển dụng đã nêu con số rõ ràng rồi", next: "ky-mu" },
            { label: "Xin X và Y gửi bảng tính từ gross xuống net và ghi mức đóng bảo hiểm", next: "quy-doi" },
          ],
        },
        "chon-gross": {
          text: "Bạn chọn Y mà chưa tính phần hao hụt. Thuế lũy tiến lấy đi một phần lớn hơn bạn nghĩ, và con số 32 triệu về tay thấp hơn 28 triệu của X nhiều tháng cuối năm.",
          ending: "bad",
        },
        "ky-mu": {
          text: "Sáu tháng sau bạn mới biết X đóng bảo hiểm ở mức rất thấp. Số tiền vào tài khoản mỗi tháng nhiều, nhưng trợ cấp thai sản và thất nghiệp của bạn tính trên con số nhỏ đó.",
          ending: "bad",
        },
        "quy-doi": {
          text: "Cả hai bên gửi bảng tính. Y về tay thấp hơn một chút mỗi tháng, nhưng đóng bảo hiểm trên toàn bộ lương, X về tay cao hơn nhưng đóng trên mức thấp. Bạn quyết định theo tiêu chí nào?",
          choices: [
            { label: "Chọn nơi tiền về tay nhiều nhất mỗi tháng, vì đó là tiền thật", next: "chi-nhin-thang" },
            { label: "Cân cả tiền về tay lẫn quyền lợi bảo hiểm dài hạn, rồi chọn có chủ ý", next: "chon-co-chu-y" },
          ],
        },
        "chi-nhin-thang": {
          text: "Bạn chọn đúng tiền về tay lớn nhất, nhưng chưa nghĩ tới việc quyền lợi thai sản và hưu trí sẽ tính trên mức đóng thấp. Quyết định này không sai hẳn, nhưng bạn đã không biết mình đang đánh đổi.",
          ending: "bad",
        },
        "chon-co-chu-y": {
          text: "Dù chọn X hay Y, bạn biết chính xác mình được gì và đánh đổi gì: tiền về tay mỗi tháng, mức đóng bảo hiểm, và quyền lợi về sau. Lựa chọn là của bạn chứ không phải của một cách ghi con số.",
          ending: "good",
        },
      },
    },
  ],

  "doc-bao-cao-luong-nganh-it": [
    {
      type: "scenario",
      title: "Chuẩn bị con số trước buổi phỏng vấn",
      start: "tim-bao-cao",
      nodes: {
        "tim-bao-cao": {
          text: "Bạn sắp nhận lời mời cho vị trí lập trình viên backend ba năm kinh nghiệm. Bạn tìm được một báo cáo lương ghi mức trung bình là một con số khá cao. Bạn dùng nó thế nào?",
          choices: [
            { label: "Lấy ngay mức trung bình đó làm con số đề nghị", next: "dung-trung-binh" },
            { label: "Xem báo cáo lấy mẫu từ đâu và có trung vị, phân vị theo thành phố không", next: "doc-mau" },
            { label: "Bỏ qua báo cáo vì khảo sát nào cũng thiên lệch", next: "bo-bao-cao" },
          ],
        },
        "dung-trung-binh": {
          text: "Bạn đề nghị theo mức trung bình. Nhà tuyển dụng hỏi: \"Em lấy con số này từ mẫu nào?\" Bạn không trả lời được vì chưa đọc phần phương pháp. Bạn làm gì?",
          choices: [
            { label: "Khẳng định báo cáo uy tín nên con số chắc đúng", next: "khang-dinh" },
            { label: "Thừa nhận chưa xem kỹ mẫu và hẹn quay lại với số liệu theo đúng nhóm", next: "doc-mau" },
          ],
        },
        "bo-bao-cao": {
          text: "Không có mốc nào, bạn đề nghị theo cảm giác và thấp hơn mức phổ biến cho vị trí này khá nhiều. Nhà tuyển dụng nhận ngay, và bạn chỉ nhận ra sau khi hỏi đồng nghiệp.",
          ending: "bad",
        },
        "khang-dinh": {
          text: "Nhà tuyển dụng chỉ ra mẫu của báo cáo phần lớn là công ty sản phẩm lớn ở một thành phố khác, còn công ty này làm gia công. Đề nghị của bạn trông thiếu căn cứ và bị gạt đi.",
          ending: "bad",
        },
        "doc-mau": {
          text: "Báo cáo có phân vị theo thành phố và loại hình công ty. Mẫu nghiêng về người đang hài lòng, và con số trung bình cao hơn trung vị vì vài mức lương rất lớn kéo lên. Bạn dùng gì làm mốc?",
          choices: [
            { label: "Lấy trung vị của đúng nhóm gần bạn nhất, làm tâm của một khoảng", next: "khoang-hop-ly" },
            { label: "Lấy phân vị cao nhất của báo cáo để có chỗ nhượng bộ", next: "phan-vi-cao" },
          ],
        },
        "phan-vi-cao": {
          text: "Con số bạn đề nghị cao hơn xa so với những gì công ty từng trả cho vị trí này. Nhà tuyển dụng cho rằng kỳ vọng của bạn không thực tế và buổi thương lượng dừng lại ở đó.",
          ending: "bad",
        },
        "khoang-hop-ly": {
          text: "Bạn đưa ra một khoảng quanh trung vị của đúng nhóm, kèm lý do vì sao mình ở nửa trên của khoảng. Nhà tuyển dụng thấy có căn cứ, cuộc nói chuyện chuyển sang kinh nghiệm thật của bạn thay vì con số.",
          ending: "good",
        },
      },
    },
  ],

  "esop-va-vesting": [
    {
      type: "scenario",
      title: "Một gói cổ phần trong thư mời",
      start: "thu-moi",
      nodes: {
        "thu-moi": {
          text: "Thư mời của một công ty khởi nghiệp ghi: \"Thưởng 20.000 cổ phần ESOP, vesting bốn năm.\" Lương thấp hơn nơi khác 15%. Bạn hỏi gì đầu tiên? (Số liệu chỉ minh hoạ.)",
          choices: [
            { label: "Hỏi công ty định giá mỗi cổ phần bao nhiêu để tính ra tiền", next: "hoi-gia" },
            { label: "Hỏi tổng số cổ phần đang lưu hành và lịch vesting chi tiết", next: "hoi-ty-le" },
            { label: "Nhận lời ngay vì 20.000 cổ phần nghe là một con số lớn", next: "nhan-ngay" },
          ],
        },
        "nhan-ngay": {
          text: "Bạn nhận lời mà chưa biết 20.000 là bao nhiêu phần trăm công ty. Hóa ra tổng cổ phần đang lưu hành là 50 triệu, nên gói của bạn chưa tới 0,04%.",
          ending: "bad",
        },
        "hoi-gia": {
          text: "Công ty trả lời một mức định giá từ vòng gọi vốn gần nhất, nên bạn nhân ra một con số lớn. Nhưng con số đó chưa nói tới tỷ lệ pha loãng ở các vòng sau, hay việc có ai mua lại phần của bạn không. Bạn làm gì?",
          choices: [
            { label: "Dùng luôn con số đó để thuyết phục bản thân chấp nhận lương thấp hơn", next: "tin-dinh-gia" },
            { label: "Hỏi thêm về tổng cổ phần, lịch vesting và điều gì xảy ra khi nghỉ", next: "hoi-ty-le" },
          ],
        },
        "tin-dinh-gia": {
          text: "Bạn chấp nhận lương thấp để đổi lấy giá trị trên giấy. Hai năm sau công ty gọi thêm hai vòng, tỷ lệ của bạn bị pha loãng, và chưa có sàn nào cho bạn bán cổ phần.",
          ending: "bad",
        },
        "hoi-ty-le": {
          text: "Gói của bạn là 0,2% công ty, vesting bốn năm với mốc chặn một năm, mỗi tháng trao đều sau đó. Nghỉ trước mốc chặn thì mất sạch. Bạn cân nhắc điều gì tiếp theo?",
          choices: [
            { label: "Tính phần cổ phần như tiền mặt, cộng vào tổng đãi ngộ", next: "tinh-nhu-tien" },
            { label: "Coi cổ phần là khoản có điều kiện, so lương thấp với mức bù có thể đòi", next: "doi-bu" },
          ],
        },
        "tinh-nhu-tien": {
          text: "Bảng so sánh của bạn nghiêng hẳn về phía cổ phần nhờ con số lạc quan. Bạn nhận lời, rồi nghỉ ở tháng thứ mười vì công việc không hợp, và toàn bộ phần \"thưởng\" mất theo mốc chặn.",
          ending: "bad",
        },
        "doi-bu": {
          text: "Bạn đề nghị nâng lương cố định thêm một phần để bù cho rủi ro, hoặc rút ngắn mốc chặn. Dù họ đồng ý hay không, bạn quyết định dựa trên điều kiện đã đọc kỹ và mức bù bạn có thể chắc chắn.",
          ending: "good",
        },
      },
    },
  ],

  "cam-ket-dao-tao-va-rang-buoc": [
    {
      type: "scenario",
      title: "Đọc trang cuối của hợp đồng",
      start: "hop-dong",
      nodes: {
        "hop-dong": {
          text: "Bạn đã chốt lương và nhận được hợp đồng. Trang cuối có một điều khoản cam kết đào tạo: nếu nghỉ trong 24 tháng, phải hoàn lại chi phí khoá học do công ty trả. Bạn làm gì?",
          choices: [
            { label: "Ký luôn vì lương đã chốt và phần cuối chỉ là thủ tục", next: "ky-luon" },
            { label: "Hỏi mức hoàn tối đa, thời hạn, và có giảm dần theo tháng không", next: "hoi-ba-so" },
            { label: "Từ chối cả khoá học để khỏi bị ràng buộc", next: "tu-choi-khoa" },
          ],
        },
        "ky-luon": {
          text: "Tám tháng sau bạn nhận lời mời tốt hơn. Điều khoản yêu cầu hoàn toàn bộ 40 triệu như nhau dù bạn đã ở được gần một năm. Bạn mới đọc lại. (Số tiền chỉ để minh hoạ.)",
          ending: "bad",
        },
        "tu-choi-khoa": {
          text: "Bạn từ chối khoá học, nhưng điều khoản này nằm chung trong một mẫu hợp đồng gồm cả thưởng ký hợp đồng và không cạnh tranh mà bạn chưa đọc. Các ràng buộc khác vẫn nguyên.",
          choices: [
            { label: "Cho rằng đã tránh được rủi ro và ký phần còn lại", next: "ky-phan-con-lai" },
            { label: "Đọc tiếp các điều khoản còn lại và hỏi từng điều", next: "hoi-ba-so" },
          ],
        },
        "ky-phan-con-lai": {
          text: "Sau này bạn mới thấy điều khoản không cạnh tranh cấm làm cho đối thủ trong 12 tháng ở toàn bộ ngành, nên bạn không thể nhận hầu hết lời mời tốt.",
          ending: "bad",
        },
        "hoi-ba-so": {
          text: "Công ty trả lời: hoàn tối đa 40 triệu, 24 tháng, không giảm dần. Bạn nhận ra mình đang vay một khoản mà trả sớm không được lợi gì. Bạn đề xuất thế nào?",
          choices: [
            { label: "Xin công ty bỏ điều khoản vì bạn không định nghỉ", next: "xin-bo" },
            { label: "Đề nghị hoàn giảm dần theo từng tháng đã làm, hoặc rút xuống 12 tháng", next: "giam-dan" },
          ],
        },
        "xin-bo": {
          text: "Công ty từ chối gọn: \"Ai cũng ký như vậy.\" Bạn không có phương án thay thế để đưa ra, nên chỉ còn ký nguyên bản hoặc rút lui.",
          ending: "bad",
        },
        "giam-dan": {
          text: "Công ty đồng ý hoàn giảm dần theo tháng làm việc. Bạn đã thương lượng trước khi ký, đúng lúc duy nhất bạn có sức nặng, và cái giá để ra đi về sau nhỏ dần thay vì giữ nguyên.",
          ending: "good",
        },
      },
    },
  ],

  "doc-tin-tuyen-dung": [
    {
      type: "scenario",
      title: "Nộp hay không nộp vị trí này",
      start: "tin",
      nodes: {
        "tin": {
          text: "Bạn thấy một tin tuyển dụng backend junior: yêu cầu có Node.js, SQL và Git; \"ưu tiên\" Docker, Kubernetes, AWS và hai năm kinh nghiệm. Bạn mới biết Node.js, SQL và Git. Bạn quyết định thế nào?",
          choices: [
            { label: "Không nộp vì chưa đủ Kubernetes và hai năm kinh nghiệm", next: "khong-nop" },
            { label: "Đọc mô tả công việc để xem nhóm nào là cốt lõi rồi mới quyết", next: "doc-mo-ta" },
            { label: "Nộp ngay mà không đọc thêm vì dù sao cũng chẳng mất gì", next: "nop-mu" },
          ],
        },
        "khong-nop": {
          text: "Ba tuần sau bạn thấy tin đó vẫn mở, rồi đóng lại. Người được nhận có đúng bộ kỹ năng như bạn. Chi phí của việc không nộp không thấy được, nên bạn không biết mình đã bỏ lỡ gì.",
          ending: "bad",
        },
        "nop-mu": {
          text: "Hồ sơ của bạn nói chung chung \"yêu thích lập trình\" mà không nhắc tới những việc tin yêu cầu. Nhà tuyển dụng lướt qua trong vài giây và chuyển sang hồ sơ có dự án sát mô tả.",
          choices: [
            { label: "Nộp tiếp hàng loạt cùng một bản hồ sơ cho vị trí khác", next: "nop-hang-loat" },
            { label: "Quay lại đọc mô tả công việc và chỉnh hồ sơ theo đó", next: "doc-mo-ta" },
          ],
        },
        "nop-hang-loat": {
          text: "Một tháng, hai mươi hồ sơ, không có phản hồi nào. Bạn kết luận thị trường quá khó, trong khi vấn đề nằm ở chỗ hồ sơ không bám vào bất kỳ tin nào.",
          ending: "bad",
        },
        "doc-mo-ta": {
          text: "Mô tả nói công việc hằng ngày là viết API bằng Node.js, truy vấn SQL và làm việc với Git. Docker và Kubernetes chỉ xuất hiện ở phần cuối. Bạn tách thế nào?",
          choices: [
            { label: "Coi cả danh sách là bắt buộc và đợi học xong hết mới nộp", next: "doi-hoc-xong" },
            { label: "Coi phần lặp lại trong mô tả là cốt lõi, phần cuối là có thì tốt", next: "tach-hai-nhom" },
          ],
        },
        "doi-hoc-xong": {
          text: "Bạn học thêm hai tháng, rồi lại thấy tin tiếp theo có danh sách mới. Việc chờ sẵn sàng chưa bao giờ dừng, và bạn vẫn chưa có buổi phỏng vấn nào.",
          ending: "bad",
        },
        "tach-hai-nhom": {
          text: "Bạn nhận ra mình đủ phần cốt lõi. Hồ sơ của bạn chỉ ghim hai dự án dùng Node.js và SQL, kèm README chạy được. Bạn nộp, và nhà tuyển dụng tự quyết định phần thiếu có quan trọng không.",
          ending: "good",
        },
      },
    },
  ],

  "ke-hoach-ung-tuyen-dau-tien": [
    {
      type: "scenario",
      title: "Sau mười hai hồ sơ, vẫn chưa có lời mời",
      start: "kiem-tra",
      nodes: {
        "kiem-tra": {
          text: "Bạn đã nộp mười hai hồ sơ trong một tháng. Chín cái không phản hồi, hai cái qua vòng sàng lọc nhưng dừng ở phỏng vấn kỹ thuật, một cái đang chờ. Bạn nhìn lại thế nào?",
          choices: [
            { label: "Học thêm hai tháng nữa mới nộp tiếp vì chắc kiến thức còn thiếu", next: "hoc-them" },
            { label: "Lập bảng xem mỗi hồ sơ đang dừng ở vòng nào", next: "lap-bang" },
            { label: "Nộp thêm thật nhiều nữa, số lượng sẽ tự cho kết quả", next: "nop-them" },
          ],
        },
        "hoc-them": {
          text: "Hai tháng sau, bạn đã học thêm vài công nghệ nhưng không có buổi phỏng vấn nào để biết thị trường cần gì. Hồ sơ vẫn nguyên như cũ.",
          ending: "bad",
        },
        "nop-them": {
          text: "Bạn nộp thêm ba mươi hồ sơ cùng một bản. Số hồ sơ đang chạy tăng, nhưng hầu hết vẫn dừng ở cùng một chỗ vì chưa ai biết chỗ đó là đâu.",
          choices: [
            { label: "Cứ tiếp tục, tin rằng sớm muộn sẽ có kết quả", next: "nop-mai" },
            { label: "Dừng lại, lập bảng xem hồ sơ dồn ở vòng nào", next: "lap-bang" },
          ],
        },
        "nop-mai": {
          text: "Thêm hai tháng trôi qua. Bạn có năm mươi hồ sơ nộp nhưng vẫn chưa hiểu vì sao hai lần phỏng vấn kỹ thuật đều dừng. Công sức nhiều, thông tin gần như không có.",
          ending: "bad",
        },
        "lap-bang": {
          text: "Bảng cho thấy chín hồ sơ bị loại ngay ở vòng sàng lọc, còn hai lần phỏng vấn kỹ thuật đều dừng ở phần thiết kế cơ sở dữ liệu. Có hai vấn đề rõ ràng. Bạn xử lý cái nào trước?",
          choices: [
            { label: "Sửa cả hai cùng lúc, mỗi việc nửa thời gian", next: "chia-doi" },
            { label: "Sửa vòng phỏng vấn kỹ thuật trước vì đó là chỗ đã có bằng chứng cụ thể", next: "sua-vong-ky-thuat" },
          ],
        },
        "chia-doi": {
          text: "Chia đôi thời gian, nên không việc nào đủ sâu: hồ sơ chỉ sửa sơ sài và phần cơ sở dữ liệu ôn dang dở. Hai tuần sau bạn vẫn chưa biết cái nào có hiệu quả.",
          ending: "bad",
        },
        "sua-vong-ky-thuat": {
          text: "Bạn ôn riêng thiết kế cơ sở dữ liệu, làm một dự án nhỏ về chủ đề đó và ghim lên hồ sơ. Lần phỏng vấn sau bạn qua vòng đó, và bảng cho bạn biết vòng tiếp theo cần chú ý. Mỗi tuần bạn có thông tin mới thay vì cảm giác.",
          ending: "good",
        },
      },
    },
  ],

  "chuoi-khoi-la-gi-ve-mat-ky-thuat": [
    {
      type: "scenario",
      title: "Có nên dùng chuỗi khối cho dự án này",
      start: "de-xuat",
      nodes: {
        "de-xuat": {
          text: "Giám đốc sản phẩm đề xuất lưu hồ sơ bảo hành nội bộ của công ty trên một chuỗi khối \"để không ai sửa được\". Bạn là người kỹ thuật được hỏi ý kiến. Bạn trả lời thế nào?",
          choices: [
            { label: "Ủng hộ vì chuỗi khối đảm bảo dữ liệu luôn đúng và không thể sai", next: "ung-ho-mu" },
            { label: "Hỏi những bên nào ghi vào sổ và có bên nào không tin nhau không", next: "hoi-ben" },
            { label: "Từ chối vì chuỗi khối chỉ dành cho tiền điện tử", next: "tu-choi-mu" },
          ],
        },
        "ung-ho-mu": {
          text: "Dự án chạy, rồi một nhân viên nhập nhầm số sê-ri. Con số sai đó được bảo vệ vĩnh viễn, không ai sửa được, kể cả bạn. Chuỗi khối bảo vệ tính toàn vẹn chứ không bảo đảm tính chính xác.",
          ending: "bad",
        },
        "tu-choi-mu": {
          text: "Giám đốc hỏi lại: \"Vậy hợp đồng chuỗi cung ứng nhiều bên thì sao?\" Bạn không có lập luận kỹ thuật, chỉ có định kiến, nên ý kiến của bạn bị gạt đi trong cuộc họp sau.",
          choices: [
            { label: "Im lặng và để dự án chạy theo ý giám đốc", next: "im-lang" },
            { label: "Quay lại bằng câu hỏi: bài toán này có bên nào không tin nhau không", next: "hoi-ben" },
          ],
        },
        "im-lang": {
          text: "Dự án chạy với chi phí lớn gấp nhiều lần một bảng cơ sở dữ liệu thường, mà người dùng duy nhất là chính công ty. Không ai trong đội nói ra điều này.",
          ending: "bad",
        },
        "hoi-ben": {
          text: "Chỉ công ty ghi vào sổ, và cũng chỉ công ty đọc. Không có bên nào không tin nhau. Giám đốc nói mục tiêu là chứng minh với kiểm toán rằng hồ sơ không bị sửa sau khi ghi. Bạn đề xuất gì?",
          choices: [
            { label: "Vẫn dùng chuỗi khối công khai cho mọi bản ghi", next: "cong-khai-het" },
            { label: "Dùng bảng chỉ ghi thêm kèm mã băm nối chuỗi, ghim mã băm định kỳ ra ngoài", next: "bang-chi-ghi-them" },
          ],
        },
        "cong-khai-het": {
          text: "Dữ liệu bảo hành của khách bị đưa lên mạng công khai theo cách không xoá được. Bạn chọn công cụ nặng hơn nhu cầu và còn tạo ra rủi ro riêng tư mới.",
          ending: "bad",
        },
        "bang-chi-ghi-them": {
          text: "Giải pháp có tính chất kiểm toán mà bạn cần: không có lệnh sửa hay xoá, mỗi bản ghi nối với bản trước bằng mã băm, và mã băm được ghim ra ngoài. Chi phí là một phần nhỏ so với chuỗi khối, và bài toán không có vế không tin nhau nên bạn không cần phần còn lại.",
          ending: "good",
        },
      },
    },
  ],
};
