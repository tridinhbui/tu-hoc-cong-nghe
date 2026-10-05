import type { LessonSectionBlock } from "../lesson-types";

// Khối mô phỏng (sim | aiLab | scenario) cho bài còn thiếu - đợt r21. Một người viết cho một tệp.
export const R21_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "du-an-phan-tich-du-lieu-kinh-doanh-bang-ai": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Soát bản nhận xét AI viết từ bảng 6 tháng",
      task:
        "Bạn đưa AI bảng đã làm sạch (doanh thu 5.315, giá vốn 3.253, tháng 4 chi phí bán hàng 118 và lợi nhuận hoạt động 101) và nhờ viết nhận xét. Dưới đây là bản nháp. Bấm vào các câu không có căn cứ trong bảng hoặc tính sai, rồi nộp.",
      segments: [
        { text: "Doanh thu 6 tháng là 5.315 và giá vốn là 3.253, nên lãi gộp cả kỳ là 2.062 (ô nguồn: tổng cột Doanh thu trừ tổng cột Giá vốn)." },
        {
          text: "Biên lãi gộp cả kỳ khoảng 61,2%, một mức rất khỏe cho thấy doanh nghiệp kiểm soát giá vốn tốt.",
          error:
            "Sai. 61,2% là giá vốn chia doanh thu (3.253 / 5.315), tức phần doanh thu bị giá vốn ăn mất. Biên lãi gộp là 2.062 / 5.315, khoảng 38,8%. Nhầm tử số và mẫu số là kiểu sai trông rất hợp lý, nên mỗi tỉ lệ phải đối chiếu lại bằng công thức trong bảng.",
        },
        { text: "Tháng 4 là tháng đáng chú ý: chi phí bán hàng lên 118, mức cao nhất kỳ, trong khi doanh thu giảm so với tháng 3." },
        {
          text: "Lợi nhuận tháng 4 giảm vì chiến dịch khuyến mãi ra mắt hồi đầu tháng không đạt kỳ vọng.",
          error:
            "Sai về căn cứ. Bảng không có dòng nào nói về chiến dịch khuyến mãi; đây là lý do do AI tự đoán. Điều đúng là nêu hiện tượng (chi phí bán hàng tăng, doanh thu giảm) và viết nguyên nhân thành câu hỏi gửi phòng kinh doanh.",
        },
        { text: "Lợi nhuận hoạt động tháng 4 chỉ còn 101, nên đây là tháng cần hỏi phòng kinh doanh trước khi kết luận gì." },
        { text: "Câu hỏi để xác nhận: chi phí bán hàng tháng 4 gồm những khoản nào, và có khoản nào chỉ phát sinh một lần?" },
      ],
    },
  ],

  "giai-phau-mot-workflow-tu-dong": [
    {
      type: "scenario",
      title: "Dựng workflow nhận đơn: bắt đầu từ đâu",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Cửa hàng nhận 30 đơn mỗi ngày qua biểu mẫu, mỗi đơn mất 3 phút để chép sang bảng tính và nhắn cho kho. Chủ cửa hàng nhờ bạn tự động hoá. Bạn làm gì đầu tiên?",
          choices: [
            { label: "Mở công cụ tự động hoá và kéo thử vài bước xem sao", next: "keo_thu" },
            { label: "Viết ra giấy từng bước mà người chép đơn đang làm tay", next: "viet_giay" },
            { label: "Nhờ AI dựng luôn cả workflow rồi bật chạy thật", next: "bat_chay" },
          ],
        },
        keo_thu: {
          text: "Sau hai giờ bạn có một dãy bước chạy được, nhưng không ai nhớ chỗ nào là điều kiện, chỗ nào là hành động. Đơn có ghi chú đặc biệt vẫn bị nhắn kho như đơn thường, vì chưa ai nghĩ đến trường hợp đó.",
          ending: "bad",
        },
        bat_chay: {
          text: "Workflow chạy ngay nhưng sao chép đúng cái quy trình lộn xộn đang có: đơn nào cũng nhắn kho, kể cả đơn thiếu số điện thoại. Lỗi cũ giờ lặp lại 30 lần mỗi ngày và nhanh hơn trước.",
          ending: "bad",
        },
        viet_giay: {
          text: "Trên giấy có sáu dòng. Bạn khoanh dòng đầu \"có đơn mới trong biểu mẫu\" và đánh dấu một chỗ người chép phải xem rồi quyết định: đơn có ghi chú đặc biệt. Bạn xếp các dòng còn lại vào đâu?",
          choices: [
            { label: "Dòng đầu là trình kích hoạt, chỗ phải quyết định là điều kiện", next: "xep_dung" },
            { label: "Mọi dòng đều là hành động, điều kiện để người làm tay xử lý", next: "xep_het_hanh_dong" },
          ],
        },
        xep_het_hanh_dong: {
          text: "Workflow chép đơn và nhắn kho cho mọi đơn, kể cả đơn có ghi chú cần hỏi lại khách. Kho giao nhầm vài đơn trước khi ai đó nhận ra điều kiện đã bị bỏ sót.",
          ending: "bad",
        },
        xep_dung: {
          text: "Bạn có bộ khung rõ: kích hoạt là đơn mới, điều kiện là ghi chú đặc biệt, hành động là chép bảng và nhắn kho. Còn một việc: đơn có ghi chú thì làm gì?",
          choices: [
            { label: "Gửi đơn đó cho một người xem trước, đơn thường chạy tự động", next: "tach_nhanh" },
            { label: "Bỏ qua đơn có ghi chú, coi đó là chuyện hiếm gặp", next: "bo_qua" },
          ],
        },
        bo_qua: {
          text: "Đơn có ghi chú không đi đâu cả, không vào bảng, không tới kho. Một khách chờ ba ngày rồi gọi hỏi, vì workflow không hề báo rằng nó đã lặng lẽ bỏ đơn của họ.",
          ending: "bad",
        },
        tach_nhanh: {
          text: "Đơn thường tự chạy, đơn có ghi chú rẽ sang một người duyệt. Mỗi bước hiện rõ dữ liệu vào, dữ liệu ra, nên khi có lỗi bạn biết ngay bước nào. Quy trình được gọn lại trước, rồi mới tự động.",
          ending: "good",
        },
      },
    },
  ],

  "chon-viec-dang-tu-dong-hoa": [
    {
      type: "scenario",
      title: "Ba việc, một tuần rảnh: tự động hoá việc nào",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Bạn có thời gian dựng đúng một workflow. Ứng viên: (A) báo cáo quý, 40 phút, 4 lần mỗi năm, người làm cứ kêu phiền; (B) đối chiếu đơn hàng, 15 phút mỗi sáng; (C) trả lời khiếu nại khó, mỗi ca một kiểu. Bạn chọn theo tiêu chí nào?",
          choices: [
            { label: "Việc nào nhiều người than phiền nhất thì làm trước", next: "than_phien" },
            { label: "Tính tổng thời gian tiết kiệm trừ bảo trì, rồi tính hoàn vốn", next: "tinh_toan" },
            { label: "Việc khó nhất, vì làm được nó thì làm được tất cả", next: "kho_nhat" },
          ],
        },
        than_phien: {
          text: "Bạn dựng workflow cho báo cáo quý. Mất hai ngày dựng, mỗi năm tiết kiệm chưa tới ba giờ, còn đối chiếu đơn hàng vẫn ngốn 15 phút mỗi sáng. Cảm giác phiền không phải là thước đo.",
          ending: "bad",
        },
        kho_nhat: {
          text: "Khiếu nại khó cần phán đoán theo ngữ cảnh, nên workflow trả lời sai giọng và sai chính sách. Bạn quay lại làm tay, sau khi mất cả tuần.",
          ending: "bad",
        },
        tinh_toan: {
          text: "Đối chiếu đơn: 15 phút x 4 lần mỗi tuần = 1 giờ mỗi tuần, dựng mất 5 giờ nên hoàn vốn sau 5 tuần. Báo cáo quý chỉ tiết kiệm khoảng 2 giờ 40 phút mỗi năm. Bạn chọn đối chiếu đơn, rồi hỏi tiếp: nếu workflow này sai thì sao?",
          choices: [
            { label: "Sai thì chỉ vài đơn bị lệch, sửa được, có người rà mỗi tuần", next: "an_toan" },
            { label: "Chưa cần nghĩ tới chuyện sai, bắt tay dựng ngay cho nhanh", next: "bo_loc" },
          ],
        },
        bo_loc: {
          text: "Workflow chạy được, nhưng một tháng sau ai đó đổi tên cột trong bảng đơn hàng. Workflow đối chiếu lệch và không báo gì, và vài đơn bị gửi nhầm trước khi ai nhận ra. Chưa hỏi \"sai thì sao\" nên chưa có chốt chặn.",
          ending: "bad",
        },
        an_toan: {
          text: "Việc lặp nhiều, quy tắc rõ, sai thì sửa được, hoàn vốn nhanh: đủ cả ba. Báo cáo quý để làm tay, và khiếu nại khó vẫn do người xử lý.",
          ending: "good",
        },
      },
    },
  ],

  "workflow-dau-tien-bieu-mau-bang-tinh-email": [
    {
      type: "scenario",
      title: "Email báo đăng ký tư vấn: ba quyết định nhỏ",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Khách đăng ký tư vấn qua biểu mẫu, nhưng người trực chỉ mở bảng tính hai lần mỗi ngày. Bạn dựng workflow gửi email mỗi khi có dòng mới. Email này gửi cho ai?",
          choices: [
            { label: "Hộp thư cá nhân của người trực hôm nay", next: "ca_nhan" },
            { label: "Hộp thư nhóm tư vấn mà cả nhóm cùng thấy", next: "hop_thu_nhom" },
            { label: "Cả công ty, để chắc chắn không ai bỏ sót", next: "ca_cong_ty" },
          ],
        },
        ca_nhan: {
          text: "Người trực nghỉ phép và email nằm im trong hộp thư của họ ba ngày. Khách đăng ký vẫn không ai gọi, như trước khi có workflow.",
          ending: "bad",
        },
        ca_cong_ty: {
          text: "Ai cũng nhận email nên ai cũng nghĩ người khác sẽ gọi. Hai người cùng gọi một khách, ba khách không ai gọi, và hộp thư cả công ty ngập thêm.",
          ending: "bad",
        },
        hop_thu_nhom: {
          text: "Cả nhóm cùng thấy, và nhóm tự phân công ai gọi. Giờ chọn nội dung email: bạn đưa những trường nào của biểu mẫu vào?",
          choices: [
            { label: "Họ tên, số điện thoại, nhu cầu: đủ để gọi lại khách", next: "du_truong" },
            { label: "Toàn bộ biểu mẫu, kể cả ảnh giấy tờ tuỳ thân khách đính kèm", next: "du_lieu_nhay_cam" },
          ],
        },
        du_lieu_nhay_cam: {
          text: "Ảnh giấy tờ tuỳ thân nằm trong hộp thư nhóm, và một email bị chuyển tiếp nhầm ra ngoài công ty. Email là nơi dữ liệu dễ đi lạc nhất; chỉ nên đưa trường cần để gọi lại.",
          ending: "bad",
        },
        du_truong: {
          text: "Email gọn, đủ thông tin để gọi. Trước khi bật chạy thật, bạn làm gì?",
          choices: [
            { label: "Chạy thử với một dòng giả, người nhận là chính mình", next: "chay_thu" },
            { label: "Bật luôn, có lỗi thì sửa sau khi khách thật than phiền", next: "bat_luon" },
          ],
        },
        bat_luon: {
          text: "Ô số điện thoại bị kéo nhầm cột, email ghi số của khách là một ngày giờ. Người trực gọi sai số suốt buổi sáng, và đến chiều mới có người phát hiện.",
          ending: "bad",
        },
        chay_thu: {
          text: "Bạn thấy ngay trường kéo nhầm cột, sửa xong rồi mới bật cho khách thật. Khách đăng ký lúc 9 giờ được gọi trong vòng vài phút, và dữ liệu gửi đi chỉ có những gì cần.",
          ending: "good",
        },
      },
    },
  ],

  "khi-workflow-hong": [
    {
      type: "scenario",
      title: "Workflow báo giá im lặng suốt 9 ngày",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Một khách hỏi vì sao chưa có báo giá. Bạn mở n8n và thấy workflow dừng từ chín ngày trước vì mật khẩu email bị đổi, không ai nhận được thông báo nào. Việc đầu tiên bạn làm?",
          choices: [
            { label: "Đổi lại mật khẩu cho chạy tiếp và coi như xong", next: "chi_chua" },
            { label: "Chạy lại cả chín ngày dữ liệu bỏ lỡ để bù ngay", next: "chay_lai_het" },
            { label: "Xem nhật ký để biết đơn nào bị bỏ lỡ và đơn nào đã gửi", next: "xem_nhat_ky" },
          ],
        },
        chi_chua: {
          text: "Workflow chạy lại từ bây giờ, nhưng báo giá của chín ngày vẫn chưa ai gửi. Hai khách khác sau đó cũng hỏi, và lần sau lỗi tương tự sẽ im lặng y như thế.",
          ending: "bad",
        },
        chay_lai_het: {
          text: "Một nửa số báo giá đó đã được nhân viên gửi tay trong lúc workflow dừng. Khách nhận hai email báo giá cho cùng một yêu cầu, trong đó một bản đã lỗi thời.",
          ending: "bad",
        },
        xem_nhat_ky: {
          text: "Nhật ký cho thấy 14 yêu cầu bị bỏ lỡ, trong đó 5 đã được gửi tay. Bạn có danh sách 9 khách cần gửi bù. Bạn gửi bù thế nào?",
          choices: [
            { label: "Chạy workflow một lần với chỉ 9 yêu cầu chưa xử lý, người nhận thử là mình", next: "gui_bu" },
            { label: "Gửi tay cả 14 yêu cầu cho chắc không sót", next: "gui_trung" },
          ],
        },
        gui_trung: {
          text: "5 khách đã được báo giá nay nhận thêm một email nữa, giống hệt. Gửi trùng nghe nhỏ, nhưng với khách nó cho thấy công ty không nắm được mình đã làm gì.",
          ending: "bad",
        },
        gui_bu: {
          text: "9 khách nhận báo giá, 5 khách đã có không bị làm phiền. Giờ bạn ngăn chuyện này lặp lại bằng cách nào?",
          choices: [
            { label: "Thêm thông báo khi lỗi vào hộp thư nhóm và ghi tên người sở hữu", next: "chot_chan" },
            { label: "Ghi chú trong đầu rằng nhớ kiểm tra workflow mỗi tuần", next: "nho_tay" },
          ],
        },
        nho_tay: {
          text: "Ba tuần sau bạn đi công tác và không ai kiểm tra. Workflow lại dừng lần nữa, lần này vì thiếu một cột, và lại im lặng.",
          ending: "bad",
        },
        chot_chan: {
          text: "Lần sau workflow hỏng, cả nhóm nhận email lỗi trong vòng vài phút và người sở hữu có tên biết mình phải sửa. Chín ngày im lặng không thể lặp lại.",
          ending: "good",
        },
      },
    },
  ],

  "du-an-tu-dong-hoa-bao-cao-thang": [
    {
      type: "scenario",
      title: "Báo cáo tháng chạy tự động: thiếu số của một chi nhánh",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Đêm cuối tháng, workflow gom số của bốn chi nhánh. Chi nhánh Thủ Đức chưa nhập số tháng này. Workflow nên làm gì?",
          choices: [
            { label: "Tính tiếp với ba chi nhánh còn lại và bỏ qua Thủ Đức", next: "tinh_thieu" },
            { label: "Dừng, báo người duyệt đúng tên chi nhánh còn thiếu", next: "dung_bao" },
            { label: "Lấy số tháng trước của Thủ Đức điền vào cho đủ bảng", next: "dien_so_cu" },
          ],
        },
        tinh_thieu: {
          text: "Tổng doanh thu tụt 25% so với tháng trước. Bản nháp AI viết \"doanh thu giảm mạnh toàn hệ thống\", và nếu bản này tới tay sếp thì cả cuộc họp sẽ bàn một sự cố không có thật.",
          ending: "bad",
        },
        dien_so_cu: {
          text: "Bảng trông đầy đủ và tăng trưởng Thủ Đức đúng bằng 0%. Không ai biết con số đó là điền tạm cho tới khi chi nhánh nhập số thật và lệch hẳn.",
          ending: "bad",
        },
        dung_bao: {
          text: "Người duyệt nhận email: \"Thiếu số tháng này của chi nhánh Thủ Đức\". Sáng hôm sau chi nhánh nhập số, bạn chạy lại và đủ dữ liệu. Tiếp theo, ai tính các chỉ số như tăng trưởng?",
          choices: [
            { label: "Công thức trong bảng tính, không để AI tự tính", next: "cong_thuc" },
            { label: "Gửi bảng cho AI tính luôn và viết nhận xét một lượt", next: "ai_tinh" },
          ],
        },
        ai_tinh: {
          text: "AI trả phần trăm tăng trưởng đọc rất trôi chảy, nhưng một chi nhánh bị chia nhầm cho kỳ khác. Người duyệt tin con số, và sai sót chỉ lộ ra khi sếp hỏi lại.",
          ending: "bad",
        },
        cong_thuc: {
          text: "Chỉ số do công thức tính, AI chỉ nhận bảng chỉ số đã tổng hợp và viết nháp. Bản nháp đi tới ai?",
          choices: [
            { label: "Người duyệt nhận bảng chỉ số và bản nháp trong một thư", next: "nguoi_duyet" },
            { label: "Gửi thẳng cho sếp để đỡ mất một vòng chờ", next: "gui_sep" },
          ],
        },
        gui_sep: {
          text: "Bản nháp có một câu \"nhờ khuyến mãi tháng 3\" mà AI tự bịa nguyên nhân. Sếp đọc xong hỏi phòng kinh doanh về chiến dịch chưa từng tồn tại.",
          ending: "bad",
        },
        nguoi_duyet: {
          text: "Người duyệt đối chiếu từng con số với bảng, sửa câu chữ rồi mới gửi lên. Hai tháng liền họ không phải sửa số nào, và workflow có tên người sở hữu.",
          ending: "good",
        },
      },
    },
  ],

  "ai-cho-cham-soc-khach-hang-phan-loai-va-tra-loi-nhap": [
    {
      type: "aiLab",
      mode: "prompt",
      title: "Viết câu lệnh phân loại yêu cầu hỗ trợ",
      task:
        "Shop nhận 250 yêu cầu mỗi ngày. Hãy lắp câu lệnh để AI phân loại chủ đề, chấm độ khẩn và soạn nháp, rồi xem AI trả lời ra sao với yêu cầu: \"Mình bị trừ tiền hai lần cho đơn #4821, ai xử lý giúp mình với.\"",
      parts: [
        {
          id: "chu_de",
          label: "Danh sách chủ đề",
          options: [
            { text: "Phân loại thành chủ đề phù hợp nhất.", feedback: "Không có danh sách cố định, AI tự đặt tên chủ đề, mỗi lần mỗi khác và không thống kê được." },
            { text: "Chọn đúng một chủ đề trong: tình trạng đơn, đổi trả, phí giao, thanh toán, khác.", good: true, feedback: "Đúng. Danh sách đóng cho đầu ra ổn định, và mục \"khác\" tránh việc AI ép yêu cầu lạ vào chủ đề sai." },
            { text: "Chọn bất kỳ chủ đề nào bạn thấy hợp, càng nhiều càng tốt.", feedback: "Nhiều nhãn lẫn lộn làm bảng phân loại vô nghĩa, và hàng đợi không biết giao cho ai." },
          ],
        },
        {
          id: "khan",
          label: "Quy tắc độ khẩn",
          options: [
            { text: "Chấm khẩn khi khách có vẻ rất bực.", feedback: "Cảm giác chủ quan dễ lệch. Khách lịch sự nhưng bị trừ tiền hai lần vẫn là ca khẩn." },
            { text: "Khẩn nếu tiền bị trừ sai, hàng lỗi gây hại, khách nhắc lần hai hoặc dọa đăng lên mạng. Không chắc thì xếp khẩn.", good: true, feedback: "Đúng. Quy tắc cụ thể và nghiêng về an toàn: xếp nhầm ca thường vào khẩn chỉ tốn vài phút." },
            { text: "Khẩn nếu yêu cầu dài hơn 100 chữ.", feedback: "Độ dài không liên quan độ khẩn. Một dòng \"bị trừ tiền hai lần\" mới là ca cần xử lý trước." },
          ],
        },
        {
          id: "nguon",
          label: "Nguồn câu trả lời nháp",
          options: [
            { text: "Soạn nháp dựa trên những gì bạn biết về chính sách của các shop online.", feedback: "AI sẽ trả lời theo mức phổ biến ngoài thị trường, có thể hứa hoàn tiền 7 ngày khi shop chỉ cho 3 ngày." },
            { text: "Chỉ dùng mẫu trả lời trong kho dưới đây. Không có mẫu hợp thì để trống và báo người duyệt.", good: true, feedback: "Đúng. Ràng buộc vào kho mẫu và cho phép bỏ trống giúp chặn việc AI bịa chính sách." },
          ],
        },
      ],
      responses: [
        {
          requires: ["chu_de", "khan", "nguon"],
          text: "Chủ đề: thanh toán. Độ khẩn: KHẨN (tiền bị trừ sai). Nháp (từ mẫu \"trừ tiền hai lần\"): \"Chào bạn, chúng tôi đã ghi nhận giao dịch trùng cho đơn #4821 và chuyển bộ phận kế toán kiểm tra. Bạn sẽ nhận phản hồi trong thời gian cam kết của shop.\" Đã chuyển cho người duyệt.",
        },
        {
          requires: ["chu_de", "khan"],
          text: "Chủ đề: thanh toán. Độ khẩn: KHẨN. Nháp: \"Shop sẽ hoàn tiền trong 7 ngày làm việc.\" Con số 7 ngày không nằm trong kho mẫu; AI lấy theo mức phổ biến. Người duyệt phải để ý mới bắt được.",
        },
        {
          text: "Chủ đề: có vẻ liên quan đến tiền. Độ khẩn: thường. Nháp: \"Cảm ơn bạn đã liên hệ, shop sẽ xem xét sớm.\" Ca bị trừ tiền hai lần bị xếp thường và nằm cùng hàng với câu hỏi phí giao.",
        },
      ],
    },
  ],

  "ai-cho-van-hanh-trich-xuat-chung-tu": [
    {
      type: "scenario",
      title: "Hoá đơn PDF ra bảng: số khớp mà vẫn có thể sai",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "AI trích xuất 300 hoá đơn thành bảng. Bạn đang chọn cách kiểm trước khi chuyển sang đối chiếu thanh toán. Cách nào?",
          choices: [
            { label: "Mở ngẫu nhiên vài hoá đơn xem mắt thường có đúng không", next: "xem_ngau_nhien" },
            { label: "Kiểm bằng quy luật: trước thuế + thuế = tổng, mã số thuế đủ số, số hoá đơn không trùng", next: "kiem_quy_luat" },
            { label: "Tin kết quả vì AI đọc cả PDF lẫn ảnh rất chính xác", next: "tin_hoan_toan" },
          ],
        },
        xem_ngau_nhien: {
          text: "Năm hoá đơn bạn mở đều đúng, và bạn kết luận ổn. Nhưng 12 hoá đơn trong số 300 bị lệch tổng tiền, và không có mẫu nào trong năm cái bạn xem.",
          ending: "bad",
        },
        tin_hoan_toan: {
          text: "Thanh toán chạy theo bảng. Một hoá đơn bị đọc nhầm 8.500.000 thành 850.000, và hai tháng sau nhà cung cấp mới đòi phần còn thiếu.",
          ending: "bad",
        },
        kiem_quy_luat: {
          text: "Máy đánh dấu 14 dòng không qua kiểm. Trong đó có một dòng mà phép cộng khớp hoàn toàn, nhưng mã số thuế của nhà cung cấp không có trong danh mục. Bạn xử lý dòng đó ra sao?",
          choices: [
            { label: "Phép cộng khớp thì coi như đúng, cho qua", next: "bo_qua_mst" },
            { label: "Đối chiếu mã số thuế và tên với danh mục nhà cung cấp", next: "doi_chieu_mst" },
          ],
        },
        bo_qua_mst: {
          text: "Một chữ số mã số thuế bị đọc sai vẫn trông hợp lệ. Tiền được chuyển cho một đơn vị không phải nhà cung cấp thật, và người ký duyệt vẫn là người chịu trách nhiệm.",
          ending: "bad",
        },
        doi_chieu_mst: {
          text: "Mã số thuế sai một chữ số so với danh mục; bạn sửa theo hoá đơn gốc. 14 dòng lỗi được đưa cho người, phần còn lại đi tiếp sang đối chiếu đơn đặt hàng. Sau đó bạn đo kết quả thế nào?",
          choices: [
            { label: "Tính tỉ lệ lỗi theo từng trường trên một mẫu kiểm mỗi tháng", next: "do_tung_truong" },
            { label: "Một con số chung: tỉ lệ hoá đơn đúng toàn bộ", next: "do_chung" },
          ],
        },
        do_chung: {
          text: "Con số 95% nghe tốt, nhưng không cho biết lỗi tập trung ở mã số thuế hay ở tổng tiền. Bạn không biết nên siết kiểm trường nào, và để mẫu kiểm quá thưa ở trường nguy hiểm nhất.",
          ending: "bad",
        },
        do_tung_truong: {
          text: "Bảng cho thấy tổng tiền hai tháng liền không lỗi nên giảm cỡ mẫu, còn mã số thuế vẫn có lỗi nên giữ mẫu lớn. Máy kiểm trước, người chỉ xem những dòng không khớp.",
          ending: "good",
        },
      },
    },
  ],

  "do-gia-tri-du-an-ai-trong-phong": [
    {
      type: "scenario",
      title: "Sếp hỏi: dự án AI này có đáng tiền không",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Sau một tháng dùng AI, sếp hỏi tiết kiệm được bao nhiêu và có đáng tiền công cụ không. Bạn chỉ có cảm giác \"nhanh hơn\", vì chưa ai ghi số \"trước\". Bạn làm gì?",
          choices: [
            { label: "Nói đại khái mỗi người tiết kiệm khoảng 5 giờ một tuần", next: "noi_dai_khai" },
            { label: "Đề xuất chạy thử hai tuần, ghi số việc và số phút trước và sau", next: "chay_thu" },
            { label: "Hỏi cả nhóm có thấy nhanh hơn không rồi lấy ý kiến chung", next: "hoi_cam_giac" },
          ],
        },
        noi_dai_khai: {
          text: "Sếp hỏi nguồn con số, và bạn không có bảng nào. Ngân sách cho tháng sau bị treo vì không ai chứng minh được con số.",
          ending: "bad",
        },
        hoi_cam_giac: {
          text: "Cả nhóm đồng ý là nhanh hơn, nhưng không ai nói được nhanh bao nhiêu phút mỗi việc. Cảm giác không quy ra tiền được.",
          ending: "bad",
        },
        chay_thu: {
          text: "Bạn chọn một việc lặp nhiều và hai người làm việc đó thường ngày. Tuần đầu ghi nền, hai tuần sau ghi lúc dùng AI. Ai là người nên vào nhóm thử?",
          choices: [
            { label: "Người giỏi nhất, để kết quả đẹp và thuyết phục", next: "chon_nguoi_gioi" },
            { label: "Những người đang làm việc đó mỗi ngày, ghi đủ mọi ngày", next: "chon_dung" },
          ],
        },
        chon_nguoi_gioi: {
          text: "Kết quả đẹp, nhưng khi mở ra cho cả nhóm thì mức tiết kiệm chỉ bằng một nửa. Số đo cho nhóm giỏi nhất không đại diện cho nhóm thường.",
          ending: "bad",
        },
        chon_dung: {
          text: "Bảng có đủ số việc, số phút, số bản nháp phải sửa. Tiết kiệm gộp 1.200 phút, trừ 240 phút sửa nháp còn 960 phút. Bạn trình bày với sếp con số nào?",
          choices: [
            { label: "Tiết kiệm ròng sau khi trừ thời gian sửa, quy ra tiền và số tháng hoàn vốn", next: "so_rong" },
            { label: "Tiết kiệm gộp 1.200 phút, vì con số này lớn hơn", next: "so_gop" },
          ],
        },
        so_gop: {
          text: "Sếp tự trừ phần sửa nháp và thấy con số bạn đưa cao hơn thực tế gần 25%. Từ đó sếp ngờ ngợ các số còn lại.",
          ending: "bad",
        },
        so_rong: {
          text: "Bạn nói rõ giờ rảnh ra chỉ có giá trị khi được dùng vào việc khác, và đưa thêm số lỗi lọt ra ngoài. Sếp thấy một phép tính có thể kiểm lại, và quyết định mở rộng có căn cứ. Một người ngoài nhóm đã xem lại bảng.",
          ending: "good",
        },
      },
    },
  ],

  "du-lieu-nao-khong-duoc-dan-vao-ai": [
    {
      type: "scenario",
      title: "Nhờ AI dựng báo cáo từ bảng lương của phòng",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Bạn muốn AI giúp viết công thức và dựng khung báo cáo cho bảng lương 40 người, gồm họ tên, CCCD, số tài khoản, mức lương. Bạn đang dùng tài khoản AI cá nhân. Bạn làm gì?",
          choices: [
            { label: "Dán nguyên bảng vào, AI cần dữ liệu thật mới làm đúng", next: "dan_nguyen" },
            { label: "Hỏi mình: AI có thật sự cần dữ liệu thật để viết công thức không", next: "tu_hoi" },
            { label: "Chụp màn hình bảng gửi cho AI, ảnh thì không phải dữ liệu", next: "chup_man_hinh" },
          ],
        },
        dan_nguyen: {
          text: "CCCD và số tài khoản của 40 đồng nghiệp nằm trên một dịch vụ bên ngoài, qua tài khoản cá nhân mà công ty không kiểm soát. Nếu bị lộ thì người chịu trách nhiệm là bạn.",
          ending: "bad",
        },
        chup_man_hinh: {
          text: "AI đọc được chữ trong ảnh nên dữ liệu vẫn đi ra ngoài y như dán chữ. Đổi định dạng không làm dữ liệu bớt mật.",
          ending: "bad",
        },
        tu_hoi: {
          text: "Viết công thức và dựng khung chỉ cần cấu trúc cột. Bạn dựng bảng giả cùng định dạng. Nhưng một phần cần số liệu thật để kiểm công thức. Bạn xử lý thế nào?",
          choices: [
            { label: "Thay tên bằng mã NV01, bỏ CCCD và số tài khoản, giữ cột lương", next: "an_danh" },
            { label: "Chỉ xoá cột CCCD, còn tên và số tài khoản thì giữ", next: "xoa_mot_phan" },
          ],
        },
        xoa_mot_phan: {
          text: "Họ tên kèm số tài khoản vẫn xác định được từng người. Ẩn danh chưa xong: dữ liệu vẫn ghép lại ra người.",
          ending: "bad",
        },
        an_danh: {
          text: "Bảng chỉ còn mã, phòng ban và mức lương. Trước khi gửi bạn rà lần cuối: có chức danh nào duy nhất, như giám đốc phòng, mà ghép với mức lương thì ra đúng một người không?",
          choices: [
            { label: "Gộp chức danh duy nhất vào nhóm chung rồi mới gửi", next: "ra_lan_cuoi" },
            { label: "Bỏ qua bước rà, vì đã bỏ tên rồi", next: "bo_ra_soat" },
          ],
        },
        bo_ra_soat: {
          text: "Dòng \"Giám đốc kinh doanh, 85 triệu\" chỉ có một người, nên ai biết công ty cũng đoán ra. Ẩn danh hoá không dừng ở chỗ bỏ tên.",
          ending: "bad",
        },
        ra_lan_cuoi: {
          text: "Dữ liệu đã bỏ danh tính và các chi tiết ghép lại ra người. Bạn chỉ dùng công cụ công ty cho phép, nhận công thức từ AI và áp lại lên bảng thật ngay trên máy mình.",
          ending: "good",
        },
      },
    },
  ],

  "con-nguoi-trong-vong-lap": [
    {
      type: "scenario",
      title: "Xếp việc cho AI: làm một mình, nhờ duyệt, hay người làm",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Nhóm của bạn có ba việc mới giao cho AI: gắn nhãn email vào thư mục, soạn nháp phản hồi hoàn tiền cho khách, và quyết định hoàn tiền trên 5 triệu. Bạn xếp từng việc vào ô nào dựa trên hai câu hỏi: sai thì thiệt hại tới đâu, và sửa lại được không?",
          choices: [
            { label: "Cả ba việc đều cho AI làm một mình, duyệt thì chậm", next: "ai_het" },
            { label: "Cả ba việc đều có người duyệt từng cái cho an toàn", next: "duyet_het" },
            { label: "Gắn nhãn cho AI, nháp cho người duyệt, quyết định hoàn tiền để người làm", next: "xep_phan_tang" },
          ],
        },
        ai_het: {
          text: "AI hứa hoàn tiền sai cho một khách, và lời AI nói trên kênh công ty là lời của công ty. \"Do AI làm\" không trả lời được ai khi có sự cố.",
          ending: "bad",
        },
        duyet_het: {
          text: "Người duyệt phải đọc hàng trăm email gắn nhãn mỗi ngày. Sau vài tuần AI đúng liên tục, họ bấm duyệt mà không đọc, kể cả ở việc hoàn tiền, nên ô duyệt chỉ còn là hình thức.",
          ending: "bad",
        },
        xep_phan_tang: {
          text: "Gắn nhãn sai thì sửa dễ và thiệt hại nhỏ; nháp phản hồi sai thì có người đọc trước khi gửi; quyết định hoàn tiền không rút lại được nên để người. Mỗi ô có ai đứng tên chịu trách nhiệm?",
          choices: [
            { label: "Ghi tên người thiết lập, người bấm duyệt, người quyết định", next: "co_ten" },
            { label: "Ghi chung là \"cả nhóm\" cho gọn", next: "ca_nhom" },
          ],
        },
        ca_nhom: {
          text: "Khi một nháp sai lọt ra ngoài, mỗi người nghĩ một người khác đã đọc. Việc không có tên người đứng sau, và không ai trả lời khách.",
          ending: "bad",
        },
        co_ten: {
          text: "Bạn có nhật ký ghi AI đề xuất gì, ai duyệt, có sửa gì. Cuối tháng đọc lại, thấy nháp trả lời phí giao gần như không bao giờ bị sửa. Bạn làm gì với phát hiện đó?",
          choices: [
            { label: "Cân nhắc chuyển việc đó sang ô AI làm, giữ ít việc ở ô duyệt", next: "chuyen_o" },
            { label: "Giữ nguyên mọi việc ở ô duyệt, chuyển ô nghe có vẻ liều", next: "giu_nguyen" },
          ],
        },
        giu_nguyen: {
          text: "Người duyệt ngày càng nhiều việc, bắt đầu bấm mà không đọc, và đến khi một nháp sai lọt qua thì không còn ai đọc thật.",
          ending: "bad",
        },
        chuyen_o: {
          text: "Việc ít rủi ro chuyển sang ô AI làm, người duyệt chỉ giữ những việc đáng đọc nên còn đọc thật. Ô nào cũng có tên người và nhật ký để kiểm tra lại.",
          ending: "good",
        },
      },
    },
  ],

  "llm-nhin-tu-phia-api": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Soát lời giải thích về token và lịch sử hội thoại",
      task:
        "Một trợ lý được nhờ giải thích cho đồng nghiệp mới cách gọi mô hình ngôn ngữ qua API. Có những câu đúng và những câu sai theo bài vừa học. Bấm vào các câu sai rồi nộp.",
      segments: [
        { text: "Mô hình không đọc chữ mà đọc token, là các mẩu văn bản do bộ tách từ cắt ra; từ tiếng Việt có dấu thường bị cắt thành nhiều mẩu hơn." },
        {
          text: "Cùng một câu sẽ cho đúng số token như nhau ở mọi nhà cung cấp, nên ước lượng chi phí xong là dùng được cho mọi mô hình.",
          error:
            "Sai. Mỗi nhà cung cấp có bộ tách từ riêng nên cùng một câu cho số token khác nhau. Cần con số chính xác thì đọc trường usage trong phản hồi hoặc dùng API đếm token của nhà cung cấp.",
        },
        { text: "API không có trạng thái: mô hình không nhớ lượt trước, nên ứng dụng phải gửi lại lịch sử hội thoại ở mỗi lượt." },
        { text: "Vì lịch sử được gửi lại, lượt hội thoại thứ 30 tốn gấp khoảng mười lần lượt đầu, dù người dùng chỉ gõ một câu ngắn." },
        {
          text: "Đặt nhiệt độ về 0 là cách chắc chắn nhất để mô hình không bịa, vì khi đó nó chỉ nói điều đúng.",
          error:
            "Sai. Nhiệt độ thấp chỉ làm đầu ra ổn định hơn giữa các lần gọi; một câu trả lời sai có xác suất cao vẫn được chọn đều đặn. Chống bịa là việc của ngữ cảnh đúng, đầu ra có cấu trúc và bước kiểm tra.",
        },
        { text: "Để giữ chi phí hội thoại dài, có thể dùng cửa sổ trượt, tóm tắt phần cũ hoặc chỉ giữ những gì liên quan." },
      ],
    },
  ],

  "cau-truc-mot-loi-goi-llm": [
    {
      type: "scenario",
      title: "Bản tóm tắt bị cắt cụt mà không ai báo",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Ứng dụng của bạn lưu bản tóm tắt cuộc họp do mô hình viết. Hôm nay một người dùng phàn nàn: bản tóm tắt dừng giữa câu. Bạn mở log phản hồi và thấy văn bản trông hoàn toàn bình thường. Bạn kiểm tra gì trước?",
          choices: [
            { label: "Đọc nội dung văn bản trong phản hồi xem có lạ không", next: "doc_noi_dung" },
            { label: "Xem lý do dừng và số token đầu ra trong phản hồi", next: "xem_ly_do" },
            { label: "Giảm nhiệt độ về 0 vì có lẽ mô hình viết thiếu ổn định", next: "doi_nhiet_do" },
          ],
        },
        doc_noi_dung: {
          text: "Văn bản đọc trôi chảy, chỉ ngắn. Bạn không tìm thấy lỗi nào trong chữ, vì nguyên nhân nằm ngoài chữ: phản hồi còn mang theo một thông tin khác mà bạn chưa nhìn tới.",
          ending: "bad",
        },
        doi_nhiet_do: {
          text: "Nhiệt độ không liên quan độ dài đầu ra. Bạn chạy lại và bản tóm tắt vẫn bị cắt đúng chỗ đó, sau một giờ tốn thêm.",
          ending: "bad",
        },
        xem_ly_do: {
          text: "Lý do dừng là max_tokens: đầu ra chạm trần bạn đặt. Bạn nhận ra mã đang lưu thẳng văn bản mà không kiểm lý do dừng. Bạn sửa thế nào?",
          choices: [
            { label: "Nâng trần lên thật cao và vẫn lưu thẳng như cũ", next: "nang_tran" },
            { label: "Kiểm lý do dừng trước khi lưu, đánh dấu bản bị cắt và xử lý riêng", next: "kiem_ly_do" },
          ],
        },
        nang_tran: {
          text: "Bản này ổn, nhưng một cuộc họp dài hơn nữa lại chạm trần mới, và lỗi quay lại im lặng như cũ. Nâng trần chỉ lùi vấn đề, không kiểm được nó.",
          ending: "bad",
        },
        kiem_ly_do: {
          text: "Khi lý do dừng không phải kết thúc tự nhiên, bạn không lưu như bản hoàn chỉnh. Bạn tuỳ trường hợp mà tóm tắt phần còn lại, gọi tiếp hoặc báo người dùng. Bạn còn một việc nữa: nếu lỗi này lặp lại, bạn muốn biết bằng cách nào?",
          choices: [
            { label: "Ghi log số lần mỗi lý do dừng để thấy khi tỉ lệ cắt tăng", next: "co_log" },
            { label: "Chờ người dùng báo lại nếu có vấn đề", next: "cho_phan_nan" },
          ],
        },
        cho_phan_nan: {
          text: "Lần sau bản tóm tắt bị cắt, người dùng không để ý vì nó vẫn trông bình thường. Một nửa bản tóm tắt được lưu mà không ai biết.",
          ending: "bad",
        },
        co_log: {
          text: "Bảng log cho thấy 3% bản tóm tắt chạm trần mỗi tuần; bạn thấy được con số, đặt trần hợp lý và xử lý riêng các bản bị cắt. Lỗi không còn im lặng.",
          ending: "good",
        },
      },
    },
  ],

  "dau-ra-co-cau-truc-tu-llm": [
    {
      type: "scenario",
      title: "Mô hình trả JSON thiếu trường: xử lý thế nào",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Hệ thống phân loại ticket yêu cầu mô hình trả JSON có hai trường: category và priority. Hôm nay một đầu ra thiếu priority. Mã của bạn làm gì?",
          choices: [
            { label: "Gán priority = 1 để hệ thống chạy tiếp", next: "dien_mac_dinh" },
            { label: "Báo lỗi cụ thể và gọi lại mô hình, kèm thông báo thiếu trường nào", next: "goi_lai" },
            { label: "Bỏ qua ticket đó và xử lý tiếp các ticket còn lại", next: "bo_ticket" },
          ],
        },
        dien_mac_dinh: {
          text: "Hệ thống chạy trơn tru. Nhưng mỗi lỗi của mô hình giờ thành dữ liệu sai trông hoàn toàn hợp lệ, và ticket \"khách bị trừ tiền hai lần\" nằm trong hàng ưu tiên 1 như câu hỏi giờ mở cửa.",
          ending: "bad",
        },
        bo_ticket: {
          text: "Ticket biến mất khỏi hàng đợi, không ai biết. Khách chờ tới khi nhắc lần hai.",
          ending: "bad",
        },
        goi_lai: {
          text: "Lần gọi lại, mô hình trả đủ cả hai trường. Nhưng đầu ra thứ ba hôm nay có category là \"thanh_toan_gap\", không nằm trong danh sách bạn định nghĩa. Bạn xử lý ra sao?",
          choices: [
            { label: "Kiểm giá trị thuộc tập cho phép, sai thì coi như đầu ra lỗi", next: "kiem_enum" },
            { label: "Chấp nhận vì JSON hợp lệ và có đủ hai trường", next: "chi_kiem_parse" },
          ],
        },
        chi_kiem_parse: {
          text: "Parse xong, đủ trường, nhưng giá trị lạ làm bảng thống kê xuất hiện một nhóm không ai định nghĩa, và hàng đợi không biết ticket này giao cho ai.",
          ending: "bad",
        },
        kiem_enum: {
          text: "Giá trị lạ bị từ chối, bạn gọi lại tối đa 3 lần. Nếu hết lượt mà vẫn sai thì sao?",
          choices: [
            { label: "Chuyển ticket sang hàng người duyệt và ghi lại lỗi", next: "chuyen_nguoi" },
            { label: "Gọi lại mãi cho tới khi mô hình trả đúng", next: "lap_vo_han" },
          ],
        },
        lap_vo_han: {
          text: "Mô hình lặp lại cùng một lỗi. Mỗi lần gọi tốn token và thời gian, hàng đợi tắc lại, và hoá đơn cuối tháng tăng vì một ticket duy nhất.",
          ending: "bad",
        },
        chuyen_nguoi: {
          text: "Ticket lỗi sang hàng người duyệt và được xử lý trong ngày. Log ghi tỉ lệ bị từ chối, nên bạn thấy khi mô hình bắt đầu trả sai nhiều hơn. Lỗi lộ ra thay vì ẩn đi.",
          ending: "good",
        },
      },
    },
  ],

  "chi-phi-va-do-tre-llm": [
    {
      type: "scenario",
      title: "Tính năng tóm tắt tăng chi phí gấp ba",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Hoá đơn LLM tháng này gấp ba tháng trước, dù số người dùng chỉ tăng nhẹ. Giá dưới đây chỉ là giá giả định. Bạn tìm nguyên nhân bằng cách nào?",
          choices: [
            { label: "Đổi sang mô hình rẻ nhất rồi xem hoá đơn có giảm không", next: "doi_mo_hinh" },
            { label: "Tính lại: token vào x giá vào cộng token ra x giá ra, theo từng tính năng", next: "tinh_lai" },
            { label: "Giới hạn mỗi người dùng một số lượt mỗi ngày", next: "gioi_han" },
          ],
        },
        doi_mo_hinh: {
          text: "Chi phí giảm một chút nhưng chất lượng tóm tắt giảm rõ, người dùng phàn nàn. Bạn chưa biết khoản nào đang đắt, nên đã đổi một thứ không cần đổi.",
          ending: "bad",
        },
        gioi_han: {
          text: "Hoá đơn giảm vì người dùng ít dùng hơn, còn tính năng thì kém đi. Bạn đã trả giá bằng trải nghiệm mà vẫn chưa hiểu nguyên nhân.",
          ending: "bad",
        },
        tinh_lai: {
          text: "Bạn phát hiện đầu ra của tính năng tóm tắt dài gấp đôi trước, vì ai đó đổi prompt thành \"viết chi tiết\". Giá ra thường cao hơn giá vào, nên đầu ra dài kéo hoá đơn lên nhanh. Bạn xử lý thế nào?",
          choices: [
            { label: "Đặt trần độ dài đầu ra và yêu cầu tóm tắt ngắn gọn", next: "tran_dau_ra" },
            { label: "Giữ nguyên, tăng ngân sách cho tháng sau", next: "tang_ngan_sach" },
          ],
        },
        tang_ngan_sach: {
          text: "Chi phí tiếp tục leo cùng lượng người dùng. Cuối quý bạn phải giải thích với sếp vì sao chi phí tăng mà không có gì tốt lên.",
          ending: "bad",
        },
        tran_dau_ra: {
          text: "Chi phí về gần mức cũ. Người dùng lại nhắc rằng tóm tắt vẫn phải hiện nhanh, vì họ chờ lâu mới thấy chữ đầu tiên. Bạn làm gì?",
          choices: [
            { label: "Bật streaming để chữ đầu hiện sớm, đo thời gian tới token đầu tiên", next: "streaming" },
            { label: "Bật streaming cho cả tính năng trả JSON vì nghe là nhanh hơn", next: "streaming_json" },
          ],
        },
        streaming_json: {
          text: "Đầu ra JSON phải chờ đủ mới kiểm được, nên người dùng không thấy nhanh hơn chút nào, còn mã của bạn phức tạp thêm vì phải ghép từng mảnh.",
          ending: "bad",
        },
        streaming: {
          text: "Tính năng tóm tắt hiện chữ sau chưa đầy một giây, còn tính năng JSON vẫn gọi một lần vì phải kiểm đủ. Bạn nắm được cả hai con số độ trễ và chi phí theo từng tính năng.",
          ending: "good",
        },
      },
    },
  ],
};
