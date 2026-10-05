import type { LessonSectionBlock } from "../lesson-types";

// Khối mô phỏng (sim | aiLab | scenario) cho bài còn thiếu - đợt r06. Một người viết cho một tệp.
export const R06_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "hieu-nang-phia-trinh-duyet": [
    {
      type: "scenario",
      title: "Trang hiện ra rồi mà bấm không ăn",
      start: "report",
      nodes: {
        report: {
          text: "Khách phản ánh: trang danh sách sản phẩm mở ra rất nhanh, nhưng bấm nút lọc thì đơ gần hai giây. Trên máy của bạn mọi thứ mượt. Bạn làm gì đầu tiên?",
          choices: [
            { label: "Nâng cấu hình máy chủ để trang trả về nhanh hơn nữa", next: "server" },
            { label: "Bật giả lập điện thoại chậm trong công cụ đo rồi thử lại", next: "throttle" },
            { label: "Báo khách thử trình duyệt khác vì lỗi do máy của họ", next: "blame" },
          ],
        },
        server: {
          text: "Máy chủ vốn trả về trong vài chục mili giây. Bạn tốn một sprint và một khoản tiền thuê máy mà người dùng không thấy gì khác đi: nút lọc vẫn đơ vì nút thắt nằm ở luồng chính của trình duyệt, không ở đường truyền.",
          ending: "bad",
        },
        blame: {
          text: "Khách thử trình duyệt khác và vẫn đơ như vậy. Họ không quay lại, và bạn chưa hề thấy lỗi trên máy mình nên cũng không có gì để sửa. Phàn nàn tiếp theo đến từ nhiều người hơn.",
          ending: "bad",
        },
        throttle: {
          text: "Với bộ vi xử lý bị làm chậm, bạn thấy rõ: bấm lọc kích hoạt một vòng lặp sắp xếp và dựng lại hai nghìn dòng, chạy liền một mạch gần hai giây và chiếm hết luồng chính. Bạn xử lý thế nào?",
          choices: [
            { label: "Bỏ bớt dữ liệu hiển thị, chỉ giữ lại vài dòng đầu", next: "cut" },
            { label: "Chia vòng lặp thành từng đợt nhỏ, nhả luồng giữa các đợt", next: "chunk" },
          ],
        },
        cut: {
          text: "Trang nhanh hơn thật, nhưng khách không còn xem được phần lớn sản phẩm và phải bấm sang trang liên tục. Bạn đã đổi một vấn đề hiệu năng lấy một vấn đề chức năng, trong khi cách làm vẫn chiếm luồng chính y như cũ với mọi danh sách dài.",
          ending: "bad",
        },
        chunk: {
          text: "Mỗi đợt chỉ vài chục dòng, giữa các đợt trình duyệt kịp nhận thao tác và vẽ lại. Tổng thời gian gần như không đổi, nhưng nút bấm phản hồi ngay. Bạn đo lại trên bản dựng thật với bộ nhớ đệm trống và con số khớp với cảm giác.",
          ending: "good",
        },
      },
    },
  ],

  "kich-thuoc-goi-tai-ve": [
    {
      type: "scenario",
      title: "Thêm thư viện biểu đồ, mất bao nhiêu",
      start: "pr",
      nodes: {
        pr: {
          text: "Một đồng nghiệp mở yêu cầu gộp mã thêm thư viện biểu đồ nặng khoảng 300 kilobyte (số minh hoạ) cho đúng một màn hình báo cáo ít người mở. Bạn review thế nào?",
          choices: [
            { label: "Duyệt luôn, ba trăm kilobyte đã nén thì mạng gánh được", next: "approve" },
            { label: "Hỏi gói chính tăng bao nhiêu và màn hình nào cần nó", next: "ask" },
            { label: "Từ chối, bảo cậu ấy tự vẽ biểu đồ bằng tay", next: "refuse" },
          ],
        },
        approve: {
          text: "Một quý sau gói chính đã béo gấp đôi sau hàng chục quyết định hợp lý như thế này. Người dùng điện thoại tầm trung mất thêm hai giây phân tích mã trước khi trang bấm được, kể cả người quay lại đã có bộ nhớ đệm.",
          ending: "bad",
        },
        refuse: {
          text: "Đồng nghiệp mất ba ngày vẽ biểu đồ thiếu tính năng và nhiều lỗi. Bạn chặn được ba trăm kilobyte nhưng đội học được rằng review là rào cản, và lần sau họ sẽ giấu thay đổi trong những yêu cầu lớn hơn.",
          ending: "bad",
        },
        ask: {
          text: "Gói chính tăng 300 kilobyte chỉ để phục vụ một màn hình hiếm khi mở. Đồng nghiệp hỏi lại: vậy làm sao vừa dùng thư viện vừa không bắt mọi người trả giá?",
          choices: [
            { label: "Nén mạnh hơn bằng cấu hình mới của máy chủ", next: "compress" },
            { label: "Chỉ tải thư viện khi người dùng mở màn hình báo cáo", next: "lazy" },
          ],
        },
        compress: {
          text: "Gói tải về nhỏ đi một phần, nhưng sau khi giải nén thiết bị vẫn phải phân tích và chạy đủ ba trăm kilobyte ấy ở mọi lần mở trang. Phần đắt nhất không hề giảm, và biểu đồ vẫn làm chậm cả những người không bao giờ xem báo cáo.",
          ending: "bad",
        },
        lazy: {
          text: "Thư viện nằm trong một gói riêng chỉ tải khi mở màn hình báo cáo. Gói chính không đổi, và bạn thêm một ngưỡng kích thước tự động vào quy trình để lần sau không ai phải nhớ mà cảnh giác.",
          ending: "good",
        },
      },
    },
  ],

  "chi-phi-ha-tang-nhu-mot-chi-so": [
    {
      type: "sim",
      tool: "cloud",
      mission: "cost-tags",
      title: "Biến một hoá đơn tổng thành danh sách theo nhóm",
      task: "Trong bảng điều khiển đám mây, tạo vài tài nguyên (máy ảo, kho lưu trữ, cơ sở dữ liệu) rồi vào Ngân sách và thẻ để gắn thẻ team và env cho từng cái, kể cả cái tạo sau cùng. Đây chính là bước gắn nhãn theo dịch vụ mà bài nói tới: sau đó hoá đơn tổng mới trả lời được nhóm nào đang tiêu bao nhiêu.",
    },
  ],

  "do-tin-cay-do-bang-gi": [
    {
      type: "scenario",
      title: "Bảng theo dõi xanh mà khách vẫn khiếu nại",
      start: "alert",
      nodes: {
        alert: {
          text: "Sáng thứ Hai, bộ phận chăm sóc khách hàng báo có mười mấy khiếu nại: trang thanh toán chậm, có người không đặt được đơn. Bảng theo dõi nội bộ báo 99,99% thời gian hoạt động, toàn màu xanh. Bạn nói gì?",
          choices: [
            { label: "Các số đo đều xanh, chắc khách gặp lỗi mạng của riêng họ", next: "dismiss" },
            { label: "Thời gian hoạt động không đo đúng thứ khách cảm nhận, ta xem lại", next: "reframe" },
            { label: "Mở thêm cảnh báo cho mọi tiến trình để chắc nó còn sống", next: "more" },
          ],
        },
        dismiss: {
          text: "Khiếu nại tiếp tục tăng. Hoá ra cơ sở dữ liệu quá tải và mỗi truy vấn mất hơn ba mươi giây: không tiến trình nào chết nên bảng vẫn xanh suốt. Bạn mất một ngày doanh thu vì tin con số đo sai thứ.",
          ending: "bad",
        },
        more: {
          text: "Bạn có thêm hàng chục cảnh báo cho thấy mọi tiến trình đều còn sống, và đúng là chúng còn sống. Không cảnh báo nào kêu, khiếu nại vẫn tới, và đội bắt đầu bỏ qua tiếng chuông vì quá nhiều.",
          ending: "bad",
        },
        reframe: {
          text: "Bạn đặt lại ba câu hỏi: có trả lời không, có đúng không, có kịp không. Câu thứ ba đang hỏng, nhưng bạn cần số liệu để chắc. Bạn chọn đo gì?",
          choices: [
            { label: "Độ trễ trung bình của trang thanh toán trong ngày", next: "avg" },
            { label: "Phân vị 95 và 99 của độ trễ, đo từ phía người dùng", next: "pct" },
          ],
        },
        avg: {
          text: "Trung bình ra khoảng hai trăm mili giây, nghe vẫn ổn, vì hầu hết lượt tải đều nhanh. Năm phần trăm khách phải chờ hàng chục giây bị con số này che mất, và chính họ là những người đang gửi khiếu nại.",
          ending: "bad",
        },
        pct: {
          text: "Phân vị 99 là 31 giây (số minh hoạ), phân vị 50 vẫn dưới nửa giây. Nhóm chậm nhất hiện ra rõ ràng, bạn lần được sang cơ sở dữ liệu và thêm phân vị này vào bảng để lần sau nó chuyển đỏ trước khi khách phải gọi.",
          ending: "good",
        },
      },
    },
  ],

  "ngan-sach-loi": [
    {
      type: "scenario",
      title: "Ngân sách lỗi còn 10% mà tính năng đã hẹn khách",
      start: "state",
      nodes: {
        state: {
          text: "Mục tiêu độ sẵn sàng tháng này khoảng 43 phút lỗi cho phép (số minh hoạ). Đã dùng 39 phút, còn 4 phút, mới đến ngày 18. Hôm nay sắp phát hành một tính năng đã hẹn khách. Quy tắc cả đội đã thoả thuận trước nói gì cần làm?",
          choices: [
            { label: "Phát hành, vì đã hẹn khách và lỗi chỉ là chuyện thường", next: "ship" },
            { label: "Tạm dừng tính năng mới và dồn sức làm hệ thống ổn định", next: "freeze" },
            { label: "Nâng mục tiêu lên chút để có thêm phút lỗi mà phát hành", next: "raise" },
          ],
        },
        ship: {
          text: "Tính năng mới kéo theo một lỗi làm trang chậm thêm 20 phút. Ngân sách cạn từ giữa tháng và những tuần còn lại, mọi sự cố nhỏ đều vi phạm mục tiêu. Quy tắc thoả thuận trước bị phá đúng lúc cần nó nhất.",
          ending: "bad",
        },
        raise: {
          text: "Ngân sách có thêm vài phút trên giấy, nhưng hệ thống thật không khá hơn gì. Từ đó con số trở thành thứ ai cũng chỉnh được khi bất tiện, và không còn ai tin nó nữa.",
          ending: "bad",
        },
        freeze: {
          text: "Giám đốc sản phẩm phản đối vì đã hẹn khách. Bạn dẫn lại quy tắc cả đội đã ký lúc bình thường. Ba sự cố trong tháng có chung một nguyên nhân, và bạn cần chọn việc ổn định nào làm trước.",
          choices: [
            { label: "Sửa nguyên nhân chung của ba sự cố trước", next: "root" },
            { label: "Viết thêm tài liệu hướng dẫn xử lý từng sự cố", next: "docs" },
          ],
        },
        docs: {
          text: "Tài liệu rất đẹp, nhưng nguyên nhân vẫn còn đó. Tuần sau sự cố thứ tư xảy ra, tài liệu giúp xử lý nhanh hơn nhưng ngân sách tháng vẫn cạn sạch và tính năng đã hẹn khách vẫn chưa ra mắt.",
          ending: "bad",
        },
        root: {
          text: "Một cấu hình hết thời gian chờ đặt sai khiến cả ba sự cố xảy ra. Sau khi sửa, tháng sau ngân sách còn nguyên, tính năng ra mắt chậm một tuần nhưng không kéo theo sự cố, và khách nhận được bản ổn định.",
          ending: "good",
        },
      },
    },
  ],

  "truc-cac-mo-hinh-va-cai-gia": [
    {
      type: "scenario",
      title: "Vòng trực ba người đang kiệt sức",
      start: "tally",
      nodes: {
        tally: {
          text: "Đội ba người luân phiên trực từng tuần. Tháng qua một người bị đánh thức 11 đêm vì cùng một cảnh báo ổ đĩa đầy (số minh hoạ), người kia đã xin chuyển đội. Trưởng nhóm hỏi bạn đề xuất gì?",
          choices: [
            { label: "Đổi sang trực hai ngày một ca để chia đều lịch hơn", next: "shuffle" },
            { label: "Đếm số lần bị đánh thức theo từng loại cảnh báo trước", next: "count" },
            { label: "Thêm một lớp người đón cảnh báo rồi chuyển lên cho đội", next: "triage" },
          ],
        },
        shuffle: {
          text: "Lịch trông công bằng hơn, nhưng cảnh báo ổ đĩa vẫn gọi mười mấy đêm mỗi tháng, chỉ đổi người nghe. Chi phí không giảm, chỉ được chia lại, và người thứ hai cũng bắt đầu nói chuyện chuyển đội.",
          ending: "bad",
        },
        triage: {
          text: "Người đón cảnh báo không có quyền sửa nên phải đánh thức thêm một người nữa cho mỗi sự cố. Một sự cố giờ làm mất giấc của hai người, thêm một lớp truyền đạt, và không ai học được gì trọn vẹn.",
          ending: "bad",
        },
        count: {
          text: "Bảng đếm cho thấy 9 trong 11 đêm là do cảnh báo ổ đĩa đầy, thứ mà máy hoàn toàn có thể tự xử lý. Bạn đã biết giảm cái gì. Bạn chọn cách nào?",
          choices: [
            { label: "Viết tự động dọn log và mở rộng ổ đĩa khi sắp đầy", next: "auto" },
            { label: "Đổi cảnh báo thành tin nhắn không kêu để khỏi đánh thức ai", next: "mute" },
          ],
        },
        mute: {
          text: "Những đêm yên tĩnh đầu tiên khiến cả đội thở phào. Ba tuần sau ổ đĩa thực sự đầy lúc nửa đêm, cơ sở dữ liệu ngừng ghi, và không ai biết cho tới khi khách báo lúc sáng. Bạn đã tắt nhầm cái cần nghe.",
          ending: "bad",
        },
        auto: {
          text: "Máy tự dọn và mở rộng, cảnh báo chỉ kêu khi tự động hoá thất bại. Số đêm bị đánh thức giảm từ 11 xuống 2 trong tháng sau, và đội có thêm thời gian để tuyển người mà không phải chữa cháy.",
          ending: "good",
        },
      },
    },
  ],

  "do-thoi-gian-phat-hien-va-hoi-phuc": [
    {
      type: "scenario",
      title: "Báo cáo sự cố quý này có đáng tin không",
      start: "report",
      nodes: {
        report: {
          text: "Cuối quý, sếp muốn một con số cho thấy đội xử lý sự cố tốt lên. Trung bình thời gian hồi phục quý trước là 40 phút, quý này 35 phút (số minh hoạ). Bạn nộp con số nào?",
          choices: [
            { label: "Số sự cố giảm từ 14 xuống 9, nghe rất ấn tượng", next: "count" },
            { label: "Trung bình hồi phục giảm 5 phút, kèm biểu đồ", next: "avg" },
            { label: "Phân vị 90 của thời gian phát hiện và hồi phục, tách riêng", next: "pct" },
          ],
        },
        count: {
          text: "Sếp khen, nhưng ai trong đội cũng biết quý này họ gộp nhiều vấn đề vào một sự cố để con số thấp. Quý sau định nghĩa lại trôi tiếp, bạn mất khả năng so sánh giữa các kỳ và chẳng ai còn biết đội tốt lên thật hay không.",
          ending: "bad",
        },
        avg: {
          text: "Sếp tạm hài lòng. Nhưng một sự cố kéo dài 6 giờ đã bị chia đều vào trung bình và biến mất. Tuần sau nó lặp lại, và con số đẹp đó không giúp bạn giải thích được vì sao khách vẫn tức giận.",
          ending: "bad",
        },
        pct: {
          text: "Phân vị 90 của thời gian hồi phục vẫn là hai giờ, dù trung bình đẹp. Sếp hỏi nên cải thiện cái nào trước: phát hiện hay hồi phục. Bạn trả lời thế nào?",
          choices: [
            { label: "Hồi phục trước, đổi kiến trúc để quay lại nhanh hơn", next: "recover" },
            { label: "Phát hiện trước, thêm phép đo và cảnh báo đúng chỗ", next: "detect" },
          ],
        },
        recover: {
          text: "Đây là việc đòi thay đổi kiến trúc và mất cả quý. Trong lúc đó phần lớn sự cố vẫn được khách báo trước đội 20 phút, vì chưa ai thêm cảnh báo, và khoảng thời gian rẻ nhất để rút ngắn vẫn còn nguyên.",
          ending: "bad",
        },
        detect: {
          text: "Bạn đếm thấy 60% sự cố do khách báo trước cảnh báo. Thêm hai phép đo vào đường thanh toán chỉ mất vài ngày, và quý sau thời gian phát hiện giảm mạnh. Bạn để việc đổi kiến trúc cho quý sau, khi đã biết đo gì.",
          ending: "good",
        },
      },
    },
  ],

  "loi-lan-truyen-giua-cac-dich-vu": [
    {
      type: "scenario",
      title: "Dịch vụ thư chậm, nhưng trang đặt hàng sập",
      start: "page",
      nodes: {
        page: {
          text: "Trang đặt hàng ngừng phục vụ lúc cao điểm. Biểu đồ cho thấy luồng xử lý của dịch vụ đơn hàng đã cạn, còn dịch vụ gửi thư phía dưới đang chậm gấp mười lần. Bạn bắt đầu điều tra từ đâu?",
          choices: [
            { label: "Dịch vụ đơn hàng, vì đó là nơi người dùng đang phản ánh", next: "top" },
            { label: "Dịch vụ gửi thư, vì nó là nơi mọi thứ bắt đầu chậm", next: "down" },
            { label: "Tăng số luồng cho dịch vụ đơn hàng ngay cho đỡ", next: "threads" },
          ],
        },
        top: {
          text: "Bạn đọc nhật ký và đo bộ vi xử lý của dịch vụ đơn hàng nhưng không thấy bất thường: mã vẫn đúng, chỉ có hàng chục luồng đang đứng chờ. Một giờ trôi qua mà bạn chưa nhìn xuống phụ thuộc phía dưới, nơi nguyên nhân thật đang nằm.",
          ending: "bad",
        },
        threads: {
          text: "Số luồng tăng gấp đôi, nhưng dịch vụ thư chậm gấp mười nên các luồng mới cũng bị giữ và cạn sau vài phút. Bạn chỉ dời thời điểm sập ra xa hơn một chút, cơ chế lan vẫn nguyên.",
          ending: "bad",
        },
        down: {
          text: "Đúng, mọi yêu cầu đặt hàng đều đứng chờ dịch vụ thư rồi mới trả lời, nên luồng bị giữ. Giờ bạn cần chặn đường lan này. Bạn chọn cách nào trước?",
          choices: [
            { label: "Đặt thời gian chờ ngắn cho lượt gọi sang dịch vụ thư", next: "timeout" },
            { label: "Đặt thời gian chờ dài cho chắc thư được gửi xong", next: "long" },
          ],
        },
        long: {
          text: "Thời gian chờ dài khiến luồng bị giữ lâu hơn nữa. Dịch vụ đơn hàng vẫn cạn luồng, chỉ muộn hơn vài giây, và thư vẫn chẳng đi nhanh hơn. Thời gian chờ ở đây để bảo vệ chính dịch vụ gọi, không phải để chiều dịch vụ kia.",
          ending: "bad",
        },
        timeout: {
          text: "Lượt gọi thư bị ngắt sau một giây, đơn hàng vẫn tạo được và thư được đưa vào hàng đợi gửi lại sau. Luồng trả về nhanh, trang hoạt động trở lại. Bạn ghi việc cách ly tài nguyên và cầu dao ngắt mạch vào danh sách làm tiếp.",
          ending: "good",
        },
      },
    },
  ],

  "kiem-thu-tai-va-ke-hoach-dung-luong": [
    {
      type: "scenario",
      title: "Chuẩn bị cho đợt khuyến mãi gấp ba lưu lượng",
      start: "plan",
      nodes: {
        plan: {
          text: "Tuần sau có khuyến mãi, dự kiến lưu lượng đỉnh gấp ba. Bạn được giao chuẩn bị. Kiểm thử tải thử trên máy kiểm thử, bộ vi xử lý vẫn dưới 30% mà hệ thống đã ngừng phục vụ. Bạn làm gì?",
          choices: [
            { label: "Nâng cấu hình bộ vi xử lý lên gấp ba cho chắc", next: "cpu" },
            { label: "Xem phần nào cạn trước khi hệ thống ngừng phục vụ", next: "find" },
            { label: "Chạy lại thử nghiệm bằng dữ liệu đều và nhẹ cho dễ qua", next: "easy" },
          ],
        },
        cpu: {
          text: "Hoá đơn tăng gấp ba, ngày khuyến mãi hệ thống vẫn sập đúng ở mức tải đó. Bộ vi xử lý chưa bao giờ là chỗ nghẽn, và bạn đã đầu tư tiền vào đúng thứ không phải nút thắt.",
          ending: "bad",
        },
        easy: {
          text: "Thử nghiệm qua dễ dàng, báo cáo ghi hệ thống chịu được. Đến ngày thật, dữ liệu lệch nặng và lưu lượng có đỉnh nhọn khiến một truy vấn sập hệ thống. Kết quả đẹp ấy không có nghĩa gì vì dữ liệu không giống dữ liệu thật.",
          ending: "bad",
        },
        find: {
          text: "Biểu đồ cho thấy số kết nối cơ sở dữ liệu chạm trần ngay trước khi hệ thống sập, trong khi bộ vi xử lý vẫn nhàn rỗi. Giờ bạn cần quyết định cách chuẩn bị cho đỉnh gấp ba.",
          choices: [
            { label: "Dựa vào lưu lượng trung bình tuần để tính dung lượng", next: "avgcap" },
            { label: "Dựa vào đỉnh thật đã quan sát, nhân tăng trưởng và biên an toàn", next: "peak" },
          ],
        },
        avgcap: {
          text: "Dung lượng đủ cho ngày thường nhưng đỉnh tải của khuyến mãi dồn vào vài phút. Hệ thống không được phép chỉ chịu được mức trung bình, và nó sập ngay trong phút mở bán đầu tiên.",
          ending: "bad",
        },
        peak: {
          text: "Bạn nâng giới hạn kết nối, thêm bộ gộp kết nối, và chạy lại thử nghiệm với dữ liệu lệch và đỉnh nhọn giống thật. Hệ thống chậm dần khi tới ngưỡng thay vì sập đột ngột, đủ cho bạn phản ứng. Ngày khuyến mãi trôi qua êm.",
          ending: "good",
        },
      },
    },
  ],

  "phu-thuoc-ben-ngoai-va-cam-ket-cua-ho": [
    {
      type: "scenario",
      title: "Cam kết 99,95% trên giấy, chuỗi phụ thuộc không cho phép",
      start: "goal",
      nodes: {
        goal: {
          text: "Đội muốn cam kết với khách độ sẵn sàng 99,95% cho luồng đặt hàng. Luồng này gọi ba dịch vụ bên ngoài, mỗi cái cam kết 99,9% (số minh hoạ). Bạn nói gì với trưởng nhóm?",
          choices: [
            { label: "Mỗi bên đều cam kết 99,9%, nên ta giữ được 99,95% thôi", next: "min" },
            { label: "Nhân ba cam kết lại trước rồi mới quyết định con số", next: "mult" },
            { label: "Yêu cầu từng nhà cung cấp tăng cam kết lên 99,99%", next: "demand" },
          ],
        },
        min: {
          text: "Cam kết được ký. Nhưng yêu cầu chỉ thành công khi cả ba hoạt động, nên trần thật chỉ quanh 99,7%. Quý đầu đội vi phạm mục tiêu đều đặn dù không làm gì sai, và chịu trách nhiệm cho một con số không có cách nào đạt được.",
          ending: "bad",
        },
        demand: {
          text: "Các nhà cung cấp từ chối hoặc đòi trả giá cao hơn nhiều, và hợp đồng không thay đổi trong thời gian bạn cần. Phần bạn kiểm soát được chưa hề làm gì, nên mục tiêu vẫn trượt khi sự cố đầu tiên tới.",
          ending: "bad",
        },
        mult: {
          text: "Ba lần 99,9% cho ra khoảng 99,7%, thấp hơn 99,95% rất nhiều. Bạn cần chọn cách nâng trần. Một trong ba dịch vụ là dịch vụ gửi thư xác nhận. Bạn làm gì?",
          choices: [
            { label: "Giữ dịch vụ thư trên đường chính và hạ mục tiêu cam kết xuống", next: "lower" },
            { label: "Đưa dịch vụ thư vào hàng đợi, khỏi nằm trên đường chính", next: "queue" },
          ],
        },
        lower: {
          text: "Mục tiêu hạ xuống 99,7% là con số trung thực nhưng chưa phải cách tốt nhất. Dịch vụ thư vẫn kéo cả luồng đặt hàng xuống mỗi khi nó hỏng, trong khi có thể tách nó ra mà không mất gì về mặt chức năng.",
          ending: "bad",
        },
        queue: {
          text: "Đơn vẫn tạo được dù dịch vụ thư đang hỏng, thư gửi sau khi nó hồi phục. Chỉ còn hai dịch vụ trong phép nhân, trần lên khoảng 99,8%. Bạn cam kết đúng số bạn tự đo được, không phải số trong hợp đồng của họ.",
          ending: "good",
        },
      },
    },
  ],

  "thay-doi-la-nguyen-nhan-pho-bien-nhat": [
    {
      type: "scenario",
      title: "Không ai phát hành gì, vậy mà hệ thống hỏng",
      start: "outage",
      nodes: {
        outage: {
          text: "Chín giờ sáng, mọi lượt đăng nhập đột nhiên lỗi. Kho mã cho thấy không có bản phát hành nào từ hôm kia. Có người đề nghị tìm sâu vào nhật ký lỗi. Bạn hỏi gì đầu tiên?",
          choices: [
            { label: "Vừa có gì thay đổi, kể cả thứ không ai gọi là phát hành", next: "changes" },
            { label: "Quay lại bản phát hành trước đó cho chắc ăn", next: "rollback" },
            { label: "Đọc toàn bộ nhật ký hai ngày để tìm dòng lỗi lạ", next: "logs" },
          ],
        },
        rollback: {
          text: "Quay lại bản trước mất hai mươi phút và không thay đổi gì, vì bản mã không phải thủ phạm. Bạn đã tốn thời gian sự cố vào việc không liên quan, trong khi nguyên nhân vẫn chưa ai nhìn tới.",
          ending: "bad",
        },
        logs: {
          text: "Hai ngày nhật ký có hàng triệu dòng, và lỗi đăng nhập chỉ là một dòng trong đó. Một giờ trôi qua mà bạn vẫn chưa biết tìm gì, vì chưa thu hẹp phạm vi bằng câu hỏi gì đã đổi.",
          ending: "bad",
        },
        changes: {
          text: "Bạn lập danh sách theo từng loại: mã, cấu hình, dữ liệu, nhà cung cấp, thời gian trôi. Chỉ hai mục đáng nghi: chứng chỉ của dịch vụ xác thực sắp hết hạn, và nhà cung cấp đăng nhập mạng xã hội vừa thông báo bảo trì. Bạn kiểm tra cái nào trước?",
          choices: [
            { label: "Bản tin bảo trì của nhà cung cấp đăng nhập", next: "vendor" },
            { label: "Ngày hết hạn của chứng chỉ trên dịch vụ xác thực", next: "cert" },
          ],
        },
        vendor: {
          text: "Bản tin chỉ nói bảo trì vào cuối tuần. Bạn mất mười lăm phút đọc và loại nó, trong khi chứng chỉ vừa hết hạn sáng nay mới là nguyên nhân. Mười lăm phút đó khách vẫn không đăng nhập được.",
          ending: "bad",
        },
        cert: {
          text: "Chứng chỉ hết hạn lúc 8 giờ 58 sáng, đúng với giờ lỗi bắt đầu. Bạn gia hạn chứng chỉ, đăng nhập hoạt động lại, và thêm cảnh báo hết hạn từ ba mươi ngày trước vào danh sách để loại thay đổi do thời gian trôi này không bất ngờ nữa.",
          ending: "good",
        },
      },
    },
  ],

  "ba-loai-tin-hieu-so-lieu-nhat-ky-dau-vet": [
    {
      type: "scenario",
      title: "Yêu cầu đặt hàng chậm, nên mở tín hiệu nào trước",
      start: "slow",
      nodes: {
        slow: {
          text: "Khách phản ánh đặt hàng thỉnh thoảng mất hơn mười giây. Hệ thống có chục dịch vụ. Bạn bắt đầu điều tra bằng loại tín hiệu nào?",
          choices: [
            { label: "Nhật ký của dịch vụ nào có tên nghe quen nhất", next: "logfirst" },
            { label: "Số liệu độ trễ để biết chậm ở đâu và từ lúc nào", next: "metrics" },
            { label: "Dấu vết lấy mẫu ngẫu nhiên một phần trăm số yêu cầu", next: "sample" },
          ],
        },
        logfirst: {
          text: "Dịch vụ bạn chọn có mấy trăm nghìn dòng mỗi giờ và không dòng nào bất thường. Bạn đọc suốt hai tiếng mà chưa biết mình đang tìm gì, vì chưa thu hẹp được dịch vụ hay thời điểm.",
          ending: "bad",
        },
        sample: {
          text: "Với một phần trăm lấy mẫu ngẫu nhiên, hầu như không có dấu vết nào của những yêu cầu mười giây hiếm hoi. Bạn có hàng nghìn dấu vết nhanh và không có cái nào chậm, nên không rút được kết luận gì.",
          ending: "bad",
        },
        metrics: {
          text: "Biểu đồ phân vị 99 cho thấy độ trễ vọt lên ở dịch vụ đơn hàng từ 14 giờ, trong khi các dịch vụ khác phẳng. Giờ bạn cần biết chặng nào trong dịch vụ đơn hàng chậm. Bạn mở gì tiếp?",
          choices: [
            { label: "Dấu vết của một yêu cầu chậm để xem từng chặng", next: "trace" },
            { label: "Nhật ký cả ngày của dịch vụ đơn hàng để đoán chặng chậm", next: "biglog" },
          ],
        },
        biglog: {
          text: "Nhật ký cho thấy hàng nghìn dòng giống nhau và không dòng nào ghi thời gian từng chặng. Bạn đoán sang cơ sở dữ liệu, tốn nửa buổi tối ưu truy vấn, và chặng chậm thật nằm ở một dịch vụ khác.",
          ending: "bad",
        },
        trace: {
          text: "Dấu vết của yêu cầu chậm cho thấy 9 giây nằm ở lượt gọi sang dịch vụ kiểm tra tồn kho. Bạn lấy mã định danh yêu cầu đó, mở nhật ký của đúng dịch vụ tồn kho và thấy một truy vấn thiếu chỉ mục. Ba loại tín hiệu bổ sung nhau đúng thứ tự.",
          ending: "good",
        },
      },
    },
  ],

  "hang-doi-ba-phan-va-mot-hop-dong": [
    {
      type: "scenario",
      title: "Thư xác nhận gửi hai lần cho một số khách",
      start: "dup",
      nodes: {
        dup: {
          text: "Vài khách nhận hai email xác nhận giống nhau. Nhật ký không có lỗi nào, mọi việc đều hoàn thành. Việc gửi thư chạy qua hàng đợi, người tiêu thụ xác nhận sau khi gửi xong, và xử lý một thư mất khoảng 40 giây. Bạn nghi điều gì?",
          choices: [
            { label: "Nhà sản xuất đẩy cùng một tin nhắn vào hai lần", next: "producer" },
            { label: "Thời gian chờ xác nhận có thể ngắn hơn thời gian xử lý", next: "visibility" },
            { label: "Nhà cung cấp thư gửi nhầm, nên đổi sang nhà khác", next: "vendor" },
          ],
        },
        producer: {
          text: "Bạn đọc mã phía sản xuất và mỗi sự kiện chỉ đẩy một lần. Một ngày trôi qua mà số lượng thư gửi trùng vẫn như cũ, vì nguyên nhân thật nằm ở phía hàng đợi giao lại chứ không phải phía đẩy vào.",
          ending: "bad",
        },
        vendor: {
          text: "Bạn đổi nhà cung cấp thư, mất một tuần tích hợp. Thư vẫn gửi trùng, vì nhà cung cấp mới cũng nhận hai lệnh gửi giống nhau. Chi phí di chuyển bị bỏ ra mà không đụng tới nguyên nhân.",
          ending: "bad",
        },
        visibility: {
          text: "Cấu hình thời gian chờ xác nhận là 30 giây, ngắn hơn 40 giây xử lý, nên hàng đợi giao lại tin nhắn trước khi bản đầu xong. Hai người tiêu thụ cùng gửi thư. Bạn xử lý thế nào?",
          choices: [
            { label: "Đổi sang xác nhận ngay khi nhận tin nhắn cho khỏi giao lại", next: "ackearly" },
            { label: "Tăng thời gian chờ vượt thời gian xử lý, thêm kiểm tra trùng", next: "fix" },
          ],
        },
        ackearly: {
          text: "Thư hết trùng, nhưng tuần sau một người tiêu thụ chết giữa chừng sau khi đã xác nhận. Tin nhắn bị xoá khỏi hàng đợi và thư của vài chục khách không bao giờ được gửi. Bạn đổi lỗi trùng lấy lỗi mất, và mất thì khó phát hiện hơn.",
          ending: "bad",
        },
        fix: {
          text: "Thời gian chờ đặt là hai phút, và mỗi thư gửi kèm mã tin nhắn để bỏ qua nếu đã gửi rồi. Người tiêu thụ chết giữa chừng thì tin nhắn quay lại và được xử lý đúng một lần. Bạn cũng thêm số phiên bản vào tin nhắn cho lần đổi lược đồ sau.",
          ending: "good",
        },
      },
    },
  ],

  "thu-tu-tin-nhan": [
    {
      type: "scenario",
      title: "Đơn hàng bị huỷ rồi lại hiện là đã giao",
      start: "bug",
      nodes: {
        bug: {
          text: "Từ khi tăng số người tiêu thụ từ một lên năm vì tải tăng, vài đơn hàng có trạng thái cuối là đã giao dù khách đã huỷ trước đó. Hàng đợi giao tin nhắn đúng thứ tự. Bạn nghi điều gì?",
          choices: [
            { label: "Hàng đợi giao sai thứ tự, nên đổi sang công cụ khác", next: "swap" },
            { label: "Hai người tiêu thụ xử lý hai tin liền nhau, xong ngược thứ tự", next: "race" },
            { label: "Có lỗi trong mã huỷ đơn mới sửa tuần trước", next: "code" },
          ],
        },
        swap: {
          text: "Công cụ mới cũng giao đúng thứ tự, nên lỗi vẫn còn nguyên sau hai tuần chuyển đổi. Hàng đợi chưa bao giờ giao sai. Lỗi nằm ở chỗ nhiều người tiêu thụ chạy song song nhận hai tin liên tiếp.",
          ending: "bad",
        },
        code: {
          text: "Mã huỷ đơn đúng khi bạn thử từng bước. Bạn không tái hiện được lỗi vì trên máy cá nhân chỉ có một người tiêu thụ, và giả định thứ tự được giữ ngầm từ nhiều tháng trước chưa hề bị nhìn tới.",
          ending: "bad",
        },
        race: {
          text: "Tin huỷ đơn đến sau tin giao hàng chưa đầy một giây, nhưng người tiêu thụ xử lý tin giao nhanh hơn rồi bị tin huỷ ghi đè ngược lại thứ tự. Bạn chọn cách chữa nào?",
          choices: [
            { label: "Quay về một người tiêu thụ duy nhất cho mọi đơn hàng", next: "single" },
            { label: "Chia phân vùng theo mã đơn hàng, mỗi phân vùng một người", next: "partition" },
          ],
        },
        single: {
          text: "Thứ tự đúng trở lại, nhưng một người tiêu thụ không theo kịp tải gấp ba. Hàng đợi tồn đọng hàng giờ và khách đợi xác nhận lâu. Bạn bỏ đi lý do ban đầu của việc mở rộng chỉ để giữ một giả định.",
          ending: "bad",
        },
        partition: {
          text: "Mọi tin nhắn của một đơn đi vào cùng phân vùng nên luôn xử lý đúng thứ tự, còn các đơn khác nhau chạy song song. Bạn cũng thêm số phiên bản vào tin nhắn để bỏ qua tin cũ hơn trạng thái hiện tại, phòng cả tin trùng.",
          ending: "good",
        },
      },
    },
  ],

  "hang-doi-thu-chet": [
    {
      type: "scenario",
      title: "Một tin nhắn hỏng chặn cả luồng thanh toán",
      start: "stuck",
      nodes: {
        stuck: {
          text: "Lúc bảy giờ tối, hàng đợi thanh toán tồn đọng 20.000 tin và tăng dần, trong khi người tiêu thụ vẫn chạy hết công suất. Nhật ký cho thấy cùng một mã tin nhắn được giao lại hơn một nghìn lần. Bạn làm gì?",
          choices: [
            { label: "Thêm người tiêu thụ để dọn tồn đọng nhanh hơn", next: "scale" },
            { label: "Tách tin nhắn đó khỏi hàng đợi chính để luồng chạy tiếp", next: "isolate" },
            { label: "Xoá thẳng tin nhắn đó, không ai cần nó nữa", next: "delete" },
          ],
        },
        scale: {
          text: "Mỗi người tiêu thụ mới cũng nhận tin hỏng và kẹt đúng chỗ đó, vì hàng đợi giữ thứ tự. Bạn tốn thêm tiền tài nguyên mà tồn đọng không giảm một tin nào.",
          ending: "bad",
        },
        delete: {
          text: "Luồng chạy lại ngay. Nhưng tin nhắn ấy là một khoản thanh toán thật của một khách và bạn đã xoá nó mà chưa biết nội dung. Hai ngày sau khách khiếu nại không nhận được hàng, và không còn gì để truy lại nguyên nhân.",
          ending: "bad",
        },
        isolate: {
          text: "Luồng chạy tiếp, tồn đọng giảm dần. Tin nhắn nằm trong hàng đợi thư chết cùng nguyên nhân lỗi: trường số tiền để trống. Bạn cần đảm bảo chuyện này không lặp lại âm thầm. Bạn làm gì tiếp?",
          choices: [
            { label: "Đặt cảnh báo khi có bất kỳ tin nhắn nào vào hàng đợi chết", next: "alert" },
            { label: "Đặt cảnh báo khi hàng đợi chết vượt 1.000 tin", next: "threshold" },
          ],
        },
        threshold: {
          text: "Sáu tháng sau hàng đợi chết có 800 tin mà cảnh báo chưa kêu, mỗi tin là một khách chưa nhận được thứ họ chờ. Không ai mở nó, không ai biết chúng đã được xử lý một phần chưa, nên không ai dám chạy lại.",
          ending: "bad",
        },
        alert: {
          text: "Cảnh báo kêu ngay khi có tin đầu tiên, nên mỗi tin hỏng đều có người xem trong ngày với nguyên nhân kèm theo. Bạn sửa chỗ để trống trường số tiền, chạy lại tin đã lưu, và khách nhận được thanh toán của họ.",
          ending: "good",
        },
      },
    },
  ],
};
