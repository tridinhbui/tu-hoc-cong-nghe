/** Game tình huống của năm toà nhà trên bản đồ Vương quốc - components/BuildingScenarioGame.tsx.
 *
 *  QUY ƯỚC: trong mỗi `options`, PHẦN TỬ ĐẦU TIÊN là đáp án đúng. Component xáo
 *  thứ tự mỗi lượt chơi, nên vị trí không lộ gì; chỉ độ dài là còn lộ được, vì
 *  thế ba phương án sai được viết dài ngang (AGENTS.md, quy tắc 2 và 6), và mỗi
 *  phương án sai là một nhầm lẫn người học thật sự hay mắc (quy tắc 3).
 *
 *  Bản tiếng Anh giữ đúng thứ tự phần tử của bản tiếng Việt, cùng quy ước ấy.
 *  Khoá của `games` trùng id toà nhà trong lib/rpg-buildings.ts. */
export const buildingGamesVi = {
  buildingGames: {
    progress: "Tình huống {n}/{total}",
    correct: "Chính xác!",
    wrong: "Chưa đúng.",
    next: "Tình huống tiếp",
    finish: "Xem kết quả",
    resultTitle: "Bạn xử lý đúng {score}/{total} tình huống",
    resultXp: "+{xp} XP (cần đúng từ 70% để nhận XP, chỉ tính lượt tốt nhất)",
    resultNoXp: "Chưa đạt 70% - chơi lại để nhận XP.",
    playAgain: "Chơi lại",
    games: {
      "silicon-bay": {
        title: "Phòng thí nghiệm AI",
        intro: "Bạn là kỹ sư đưa AI vào sản phẩm của một startup. Mỗi tình huống, chọn việc nên làm.",
        scenarios: [
          {
            q: "Chatbot hỗ trợ khách trả lời sai chính sách hoàn tiền vài lần mỗi ngày. Việc nên làm đầu tiên?",
            options: [
              "Cho mô hình đọc tài liệu chính sách thật khi trả lời (RAG)",
              "Tăng temperature để câu trả lời linh hoạt, đa dạng hơn",
              "Đổi sang mô hình lớn nhất rồi phát hành lại ngay trong ngày",
              "Fine-tune lại trên toàn bộ log chat cũ, kể cả các câu trả lời sai",
            ],
            why: "Mô hình không tự biết chính sách của công ty bạn. Đưa đúng đoạn tài liệu vào ngữ cảnh mỗi lần trả lời là cách rẻ và kiểm chứng được. Tăng temperature chỉ làm câu trả lời ngẫu nhiên hơn; fine-tune trên log sai là dạy lại chính cái sai.",
          },
          {
            q: "Tính năng tóm tắt email chạy ổn khi thử, nhưng ra thật thì chi phí API tăng gấp 10. Nguyên nhân hay gặp nhất?",
            options: [
              "Gửi nguyên cả chuỗi email dài mỗi lần, không cắt bớt",
              "Bộ nhớ đệm làm mỗi câu hỏi bị gọi hai lần liên tiếp",
              "Máy chủ production chậm hơn nên bị nhà cung cấp tính thêm",
              "API tính tiền theo số lần người dùng bấm nút trên giao diện",
            ],
            why: "Mô hình tính tiền theo token vào và ra. Email thật dài hơn email thử nhiều lần, nên cắt bớt trích dẫn, chữ ký, lịch sử cũ là chỗ tiết kiệm lớn nhất.",
          },
          {
            q: "Làm sao biết bản prompt mới tốt hơn bản cũ?",
            options: [
              "Chạy cả hai trên cùng bộ câu hỏi mẫu rồi chấm điểm",
              "Thử tay vài câu, thấy câu trả lời hay hơn là đủ",
              "Hỏi chính mô hình xem prompt nào viết tốt hơn",
              "Chọn prompt dài hơn vì nó cho mô hình nhiều ngữ cảnh",
            ],
            why: "Vài câu thử tay dễ khiến bạn chọn theo cảm giác. Một bộ câu hỏi cố định kèm tiêu chí chấm là cách duy nhất so hai bản một cách công bằng, và dùng lại được mỗi lần sửa prompt.",
          },
          {
            q: "Người dùng dán số thẻ ngân hàng vào ô chat AI. Nên xử lý thế nào?",
            options: [
              "Che dữ liệu nhạy cảm trước khi gửi đi và trước khi ghi log",
              "Để nguyên, vì nhà cung cấp AI đã mã hoá đường truyền rồi",
              "Chỉ cần xoá khỏi log sau 30 ngày theo lịch dọn dẹp định kỳ",
              "Nhắc người dùng trong điều khoản sử dụng là đã đủ trách nhiệm",
            ],
            why: "Mã hoá đường truyền chỉ bảo vệ lúc dữ liệu đang đi. Khi đã tới nhà cung cấp và nằm trong log, số thẻ vẫn là số thẻ. Che ngay từ đầu thì không còn gì để lộ.",
          },
          {
            q: "Mô hình đôi khi bịa ra đường link không tồn tại. Cách giảm hiệu quả nhất?",
            options: [
              "Chỉ cho trả về link nằm trong danh sách nguồn đã kiểm",
              "Thêm câu \"tuyệt đối đừng bịa link\" vào cuối prompt là xong",
              "Giới hạn câu trả lời chỉ còn đúng một dòng ngắn gọn",
              "Chuyển sang mô hình mã nguồn mở vì chúng ít bịa hơn",
            ],
            why: "Lời dặn trong prompt giảm được một ít nhưng không đảm bảo. Kiểm tra đầu ra bằng code - link không có trong danh sách thì bỏ - mới chặn được hẳn.",
          },
        ],
      },
      "capitol-hill": {
        title: "Dự án chuyển lên đám mây",
        intro: "Công ty giao bạn dời hệ thống từ phòng máy lên cloud. Mỗi quyết định đều tốn tiền thật.",
        scenarios: [
          {
            q: "Bước nào nên làm TRƯỚC khi dời máy chủ lên cloud?",
            options: [
              "Đo tải hiện tại để chọn cỡ máy cho đúng",
              "Mua gói máy lớn nhất cho chắc, tối ưu sau",
              "Tắt hệ thống cũ trước để ép cả đội chuyển nhanh",
              "Viết lại toàn bộ ứng dụng thành microservice",
            ],
            why: "Không đo thì chỉ đoán: đoán to là trả tiền thừa hằng tháng, đoán nhỏ là sập ngày chuyển. Viết lại toàn bộ cùng lúc với dời hạ tầng là gộp hai rủi ro lớn làm một.",
          },
          {
            q: "Hoá đơn cloud tháng này tăng 40% dù lượng người dùng không đổi. Nên xem chỗ nào đầu tiên?",
            options: [
              "Tài nguyên được tạo ra để thử rồi quên tắt",
              "Giá điện ở trung tâm dữ liệu vừa tăng lên",
              "Người dùng tải nhiều ảnh hơn vào cuối tháng",
              "Cloud tự tăng giá khi hợp đồng sang năm hai",
            ],
            why: "Máy chủ thử, ổ đĩa không gắn vào đâu, bản chụp cũ - đó là thủ phạm quen thuộc nhất khi người dùng không đổi mà hoá đơn đổi. Gắn nhãn chủ sở hữu cho mọi tài nguyên giúp tìm ra ngay.",
          },
          {
            q: "Chọn vùng (region) đặt máy chủ cho app phục vụ người Việt. Tiêu chí quan trọng nhất?",
            options: [
              "Gần người dùng để độ trễ thấp, và hợp quy định dữ liệu",
              "Vùng rẻ nhất, vì độ trễ mạng ngày nay không còn đáng kể nữa",
              "Vùng ở Mỹ, vì cloud luôn ra tính năng mới ở đó trước",
              "Vùng có nhiều dịch vụ nhất, dù người dùng ở rất xa",
            ],
            why: "Mỗi lượt đi về giữa Việt Nam và Mỹ mất cỡ 200 ms, và một trang web cần hàng chục lượt như vậy. Luật dữ liệu cũng có thể bắt buộc lưu trong nước.",
          },
          {
            q: "Ngày chuyển đổi, cơ sở dữ liệu mới gặp lỗi. Kế hoạch tốt đã chuẩn bị sẵn điều gì?",
            options: [
              "Đường quay về hệ thống cũ, đã diễn tập trước",
              "Một bản sao lưu từ tháng trước để khôi phục lại",
              "Cam kết từ nhà cung cấp sẽ sửa trong 24 giờ",
              "Thông báo bảo trì dài ngày gửi cho người dùng",
            ],
            why: "Bản sao lưu một tháng tuổi là mất một tháng dữ liệu. Một đường quay lui đã chạy thử nghĩa là sự cố trở thành vài phút gián đoạn thay vì một ngày khủng hoảng.",
          },
          {
            q: "Tài khoản gốc (root) của cloud nên được dùng thế nào?",
            options: [
              "Khoá lại bằng MFA, làm việc hằng ngày bằng tài khoản quyền hẹp",
              "Dùng chung một tài khoản cho cả đội để cấp quyền cho nhau nhanh hơn",
              "Dùng hằng ngày nhưng đổi mật khẩu đều đặn mỗi tháng",
              "Lưu mật khẩu trong mã nguồn để CI tự động triển khai",
            ],
            why: "Root làm được mọi thứ, kể cả xoá toàn bộ tài khoản. Càng ít dùng nó càng ít cơ hội bị lộ; việc hằng ngày chỉ cần quyền vừa đủ.",
          },
        ],
      },
      "cme-commodities": {
        title: "Sàn điều phối GPU",
        intro: "Bạn quản lý ngân sách GPU và điện năng của đội AI. Tính nhanh, chọn đúng.",
        scenarios: [
          {
            q: "Huấn luyện mô hình mất 10 giờ trên 1 GPU. Chuyển sang 4 GPU thì thường mất bao lâu?",
            options: [
              "Hơn 2,5 giờ, vì các GPU phải chờ trao đổi dữ liệu",
              "Đúng 2,5 giờ (= 10 ÷ 4), vì việc được chia đều hoàn hảo",
              "Vẫn 10 giờ, vì mỗi GPU phải làm lại cùng việc",
              "40 giờ (= 10 × 4), vì phải đồng bộ bốn lần",
            ],
            why: "Sau mỗi bước, các GPU phải gộp kết quả với nhau, và lúc đó chúng chờ. Tăng tốc gần tuyến tính là tình huống tốt nhất, hiếm khi đạt đúng.",
          },
          {
            q: "Cụm GPU thuê theo giờ nhưng chỉ có việc vào ban ngày. Cách tiết kiệm hợp lý?",
            options: [
              "Tự động tắt cụm khi hàng đợi việc trống",
              "Chạy liên tục để GPU khỏi nguội, tránh hỏng",
              "Mua thêm GPU cho xong sớm rồi mới tắt đi",
              "Giảm độ phân giải màn hình máy chủ để bớt tải",
            ],
            why: "Thuê theo giờ thì giờ chạy không là tiền mất trắng. Tắt theo hàng đợi cắt được gần nửa hoá đơn khi việc chỉ có ban ngày.",
          },
          {
            q: "Trung tâm dữ liệu có PUE = 1,5. Con số này nghĩa là gì?",
            options: [
              "Mỗi 1 kWh cho máy tính thì tốn thêm 0,5 kWh cho làm mát và phụ trợ",
              "Có 50% số máy chủ đang bật nhưng chạy không tải, lãng phí điện",
              "Máy tính đang chạy ở 150% công suất danh định của nhà sản xuất",
              "Mỗi máy chủ trong trung tâm tiêu thụ 1,5 kWh điện mỗi giờ chạy",
            ],
            why: "PUE = tổng điện của cả trung tâm ÷ điện cho thiết bị tính toán. 1,0 là lý tưởng; phần vượt lên là điều hoà, chiếu sáng, hao hụt nguồn.",
          },
          {
            q: "Phục vụ mô hình cho người dùng (inference) bị thiếu GPU giờ cao điểm. Cách nhanh nhất để phục vụ nhiều hơn?",
            options: [
              "Gộp nhiều yêu cầu vào một lượt chạy (batching)",
              "Huấn luyện mô hình lớn hơn để trả lời nhanh hơn",
              "Tăng số epoch huấn luyện cho mô hình chín hơn",
              "Tắt bộ nhớ đệm để luôn có câu trả lời mới nhất",
            ],
            why: "GPU xử lý một lô gần nhanh bằng một yêu cầu lẻ, nên gộp lô tăng số người phục vụ được mà không mua thêm máy. Mô hình lớn hơn thì chạy chậm hơn, không nhanh hơn.",
          },
          {
            q: "Mô hình 7 tỷ tham số, lưu ở FP16 (2 byte mỗi tham số). Riêng việc nạp trọng số cần tối thiểu bao nhiêu bộ nhớ GPU?",
            options: [
              "Khoảng 14 GB (= 7 tỷ × 2 byte)",
              "Khoảng 7 GB (= 7 tỷ × 1 byte, quên FP16 là 2 byte)",
              "Khoảng 28 GB (= 7 tỷ × 4 byte, nhầm sang FP32)",
              "Khoảng 3,5 GB (= 7 tỷ ÷ 2, chia thay vì nhân)",
            ],
            why: "Bộ nhớ = số tham số × số byte mỗi tham số: 7 × 10⁹ × 2 = 14 × 10⁹ byte. Khi chạy thật còn cần thêm chỗ cho bộ nhớ đệm hội thoại.",
          },
        ],
      },
      "swiss-haven": {
        title: "Kho dữ liệu an toàn",
        intro: "Bạn giữ chìa khoá kho dữ liệu khách hàng. Một sai sót là mất dữ liệu hoặc vi phạm luật.",
        scenarios: [
          {
            q: "Luật yêu cầu dữ liệu cá nhân người Việt lưu tại Việt Nam. Điều gì dễ bị bỏ sót nhất?",
            options: [
              "Bản sao lưu và log cũng phải nằm trong vùng cho phép",
              "Chỉ riêng cơ sở dữ liệu chính mới cần đặt tại Việt Nam thôi",
              "Đã mã hoá thì đặt dữ liệu ở đâu cũng không sao",
              "Chỉ áp dụng cho công ty có trên 1.000 nhân viên",
            ],
            why: "Cơ sở dữ liệu chính thường được để ý. Bản sao lưu tự động sang vùng khác và log chứa email, số điện thoại thì hay bị quên - và chúng cũng là dữ liệu cá nhân.",
          },
          {
            q: "Quy tắc sao lưu 3-2-1 là gì?",
            options: [
              "3 bản, trên 2 loại lưu trữ, 1 bản ở nơi khác",
              "Sao lưu 3 lần/ngày, giữ 2 tuần, 1 người trực",
              "3 ổ RAID, 2 máy chủ, trong 1 trung tâm dữ liệu",
              "Giữ 3 tháng, nén còn 2 phần, 1 bản lên cloud",
            ],
            why: "Ba bản để một bản hỏng vẫn còn hai; hai loại lưu trữ để một lỗi phần cứng không diệt hết; một bản ở xa để cháy, lụt, ransomware ở chỗ chính không chạm tới.",
          },
          {
            q: "Làm sao chắc chắn bản sao lưu dùng được khi cần?",
            options: [
              "Định kỳ khôi phục thử ra một môi trường riêng",
              "Kiểm tra dung lượng tệp sao lưu có tăng đều",
              "Xem log báo \"backup completed\" mỗi đêm",
              "Lưu sao lưu ngay trên cùng máy chủ cho nhanh",
            ],
            why: "Một bản sao lưu chưa từng khôi phục thử chỉ là hi vọng. Tệp vẫn lớn dần và log vẫn báo xong ngay cả khi nội dung bên trong hỏng.",
          },
          {
            q: "Mã hoá dữ liệu lúc lưu trữ (at rest) bảo vệ khỏi rủi ro nào?",
            options: [
              "Ổ đĩa hoặc bản sao bị lấy cắp khỏi hệ thống",
              "Kẻ gian đăng nhập bằng mật khẩu admin bị lộ",
              "Lỗ hổng SQL injection trong ứng dụng web",
              "Nhân viên có quyền truy vấn xem dữ liệu khách",
            ],
            why: "Ứng dụng tự giải mã cho người dùng hợp lệ, nên ai đi qua ứng dụng - kể cả kẻ lấy được mật khẩu admin - vẫn đọc được. Mã hoá lúc lưu chỉ cứu khi dữ liệu bị mang ra ngoài.",
          },
          {
            q: "Khách hàng yêu cầu xoá toàn bộ dữ liệu của mình. Việc khó nhất thường là gì?",
            options: [
              "Tìm hết mọi bản sao trong log, sao lưu và hệ thống phụ",
              "Xoá dòng dữ liệu của họ trong bảng người dùng chính của hệ thống",
              "Gửi email xác nhận đã xoá dữ liệu cho khách hàng",
              "Đặt cờ is_deleted = true là coi như đã xoá xong",
            ],
            why: "Dữ liệu một người rải khắp nơi: công cụ phân tích, email marketing, bản sao lưu, log lỗi. Không có bản đồ dữ liệu thì không biết đã xoá hết chưa. Cờ is_deleted thì chẳng xoá gì.",
          },
        ],
      },
      "singapore-dock": {
        title: "Cảng hàng đợi dữ liệu",
        intro: "Dữ liệu cập cảng từ khắp khu vực. Giữ cho dòng chảy không mất, không trùng, không tắc.",
        scenarios: [
          {
            q: "Hàng đợi xử lý đơn hàng có thể giao một thông điệp hai lần. Consumer cần làm gì?",
            options: [
              "Xử lý idempotent: nhận lần hai không tạo thêm đơn",
              "Tin rằng hàng đợi đã tự đảm bảo giao đúng một lần duy nhất",
              "Bỏ hàng đợi, gọi thẳng API cho chắc chắn hơn",
              "Tăng thời gian chờ để thông điệp khỏi bị lặp",
            ],
            why: "Hầu hết hàng đợi hứa \"ít nhất một lần\", không phải \"đúng một lần\". Gắn mã đơn duy nhất và bỏ qua mã đã xử lý là cách chịu được trùng lặp.",
          },
          {
            q: "Một thông điệp hỏng làm consumer sập đi sập lại. Cách xử lý chuẩn là gì?",
            options: [
              "Sau vài lần thử, chuyển nó sang hàng đợi thư chết (DLQ)",
              "Thử lại vô hạn lần cho tới khi thông điệp đó chạy được thì thôi",
              "Xoá toàn bộ hàng đợi rồi chạy lại mọi thứ từ đầu",
              "Tắt consumer cho tới khi có người vào sửa bằng tay",
            ],
            why: "Thử lại vô hạn một thông điệp hỏng là chặn luôn mọi thông điệp tốt phía sau. DLQ tách nó ra để xem sau, dòng chảy chính tiếp tục.",
          },
          {
            q: "Chạy lại pipeline ETL cho ngày hôm qua thì doanh thu bị nhân đôi. Lỗi thiết kế nằm ở đâu?",
            options: [
              "Bước ghi chỉ chèn thêm, không ghi đè theo ngày",
              "Dữ liệu nguồn của hôm qua đã bị ai đó sửa lại",
              "Máy chủ chạy pipeline quá chậm so với dữ liệu",
              "Lệch múi giờ làm dữ liệu dời sang ngày khác",
            ],
            why: "Pipeline tốt chạy lại bao nhiêu lần cũng ra cùng kết quả: xoá phân vùng của ngày đó rồi ghi lại, thay vì chỉ chèn thêm dòng.",
          },
          {
            q: "Dữ liệu gửi từ Singapore về Hà Nội bị chậm. Cách nào thật sự giảm được độ trễ tổng?",
            options: [
              "Gom thông điệp thành lô và nén trước khi gửi đi",
              "Tăng RAM máy nhận để nó tải dữ liệu nhanh hơn",
              "Đổi định dạng từ JSON sang XML cho có cấu trúc",
              "Gửi từng thông điệp riêng lẻ để khỏi phải chờ",
            ],
            why: "Mỗi lượt đi về tốn cỡ 40 ms dù gói nhỏ hay lớn, nên gửi lẻ là trả phí đó cho từng thông điệp. Gom lô và nén cắt số lượt và số byte.",
          },
          {
            q: "Consumer xử lý chậm hơn tốc độ dữ liệu đổ vào. Dấu hiệu nào báo sớm nhất?",
            options: [
              "Độ trễ hàng đợi (lag) tăng đều theo thời gian",
              "CPU của máy gửi dữ liệu lên tới 100% liên tục",
              "Số lỗi HTTP 404 trong log tăng lên bất thường",
              "Dung lượng ổ đĩa trống của consumer giảm dần",
            ],
            why: "Lag là khoảng cách giữa thông điệp mới nhất và thông điệp đang xử lý. Nó tăng đều nghĩa là đầu ra thua đầu vào - cảnh báo trước khi người dùng thấy dữ liệu cũ.",
          },
        ],
      },
    },
  },
};

export const buildingGamesEn: typeof buildingGamesVi = {
  buildingGames: {
    progress: "Scenario {n}/{total}",
    correct: "Correct!",
    wrong: "Not quite.",
    next: "Next scenario",
    finish: "See results",
    resultTitle: "You handled {score}/{total} scenarios correctly",
    resultXp: "+{xp} XP (70% needed to earn XP; only your best run counts)",
    resultNoXp: "Below 70% - play again to earn XP.",
    playAgain: "Play again",
    games: {
      "silicon-bay": {
        title: "AI Lab",
        intro: "You are the engineer bringing AI into a startup's product. For each scenario, pick what to do.",
        scenarios: [
          {
            q: "The support chatbot gets the refund policy wrong a few times a day. What should you do first?",
            options: [
              "Have the model read the real policy documents when answering (RAG)",
              "Raise the temperature so the answers come out more flexible and varied",
              "Switch to the largest model and redeploy the same day",
              "Fine-tune on all the old chat logs, wrong answers included",
            ],
            why: "The model doesn't know your company's policy. Putting the right document passage into context on every answer is cheap and verifiable. Higher temperature only makes answers more random; fine-tuning on wrong logs teaches the mistake again.",
          },
          {
            q: "An email-summary feature worked fine in testing, but API costs are 10x higher in production. The most common cause?",
            options: [
              "Sending the whole long email thread every time, untrimmed",
              "The cache making every question get called twice in a row",
              "The production server being slower, so the provider charges more",
              "The API billing per button click in the user interface",
            ],
            why: "Models bill by input and output tokens. Real emails are many times longer than test ones, so trimming quotes, signatures and old history is the biggest saving.",
          },
          {
            q: "How do you know a new prompt is better than the old one?",
            options: [
              "Run both on the same set of sample questions and score them",
              "Try a few by hand; if the answers look better, that's enough",
              "Ask the model itself which prompt is better written",
              "Pick the longer prompt because it gives more context",
            ],
            why: "A few hand tests make you pick by feel. A fixed question set with scoring criteria is the only fair comparison, and you can reuse it every time you edit the prompt.",
          },
          {
            q: "A user pastes a bank card number into the AI chat box. How should you handle it?",
            options: [
              "Mask sensitive data before sending it out and before logging",
              "Leave it, because the AI provider already encrypts the connection",
              "Just delete it from the logs after 30 days on the cleanup schedule",
              "Mentioning it in the terms of service covers your responsibility",
            ],
            why: "Transport encryption only protects data in transit. Once it reaches the provider and sits in a log, a card number is still a card number. Mask it up front and there's nothing to leak.",
          },
          {
            q: "The model sometimes makes up links that don't exist. The most effective fix?",
            options: [
              "Only allow links that are on a list of checked sources",
              "Adding \"don't make up links\" to the prompt solves it",
              "Limiting answers to exactly one short line of text",
              "Switching to an open-source model since they invent less",
            ],
            why: "A prompt instruction reduces it a little but guarantees nothing. Checking the output in code - dropping any link not on the list - stops it completely.",
          },
        ],
      },
      "capitol-hill": {
        title: "Cloud Migration Project",
        intro: "Your company is moving its systems from a server room to the cloud. Every decision costs real money.",
        scenarios: [
          {
            q: "What should you do BEFORE moving servers to the cloud?",
            options: [
              "Measure current load to size machines correctly",
              "Buy the biggest machines to be safe, optimise later",
              "Shut down the old system first to force a fast move",
              "Rewrite the whole application as microservices",
            ],
            why: "Without measuring you're guessing: guess big and you overpay every month, guess small and you crash on migration day. Rewriting everything while moving infrastructure merges two big risks into one.",
          },
          {
            q: "This month's cloud bill is up 40% with no change in users. Where should you look first?",
            options: [
              "Resources created for a test and never shut down",
              "Electricity prices at the data centre going up",
              "Users uploading more photos at the end of the month",
              "The cloud raising prices in the contract's second year",
            ],
            why: "Test servers, unattached disks, old snapshots - the usual culprits when users stay flat but the bill doesn't. Tagging every resource with an owner finds them fast.",
          },
          {
            q: "Choosing a server region for an app serving Vietnamese users. The most important criterion?",
            options: [
              "Close to users for low latency, and compliant with data rules",
              "The cheapest region, since network latency barely matters now",
              "A US region, because the cloud always launches features there first",
              "The region with the most services, even if users are far away",
            ],
            why: "A round trip between Vietnam and the US takes about 200 ms, and a web page needs dozens of them. Data law may also require storage inside the country.",
          },
          {
            q: "On migration day the new database fails. What had a good plan prepared?",
            options: [
              "A path back to the old system, rehearsed in advance",
              "A backup from last month to restore from",
              "A promise from the provider to fix it within 24 hours",
              "A long maintenance notice sent to users",
            ],
            why: "A month-old backup means losing a month of data. A rehearsed rollback turns the incident into minutes of disruption instead of a day of crisis.",
          },
          {
            q: "How should the cloud's root account be used?",
            options: [
              "Locked with MFA; daily work uses narrowly scoped accounts",
              "Shared by the whole team so permissions are granted faster",
              "Used daily but with the password changed every month",
              "Password stored in the source code so CI can deploy",
            ],
            why: "Root can do anything, including deleting the whole account. The less it's used, the fewer chances it leaks; daily work only needs just-enough permissions.",
          },
        ],
      },
      "cme-commodities": {
        title: "GPU Dispatch Floor",
        intro: "You manage the AI team's GPU and power budget. Calculate fast, choose right.",
        scenarios: [
          {
            q: "Training takes 10 hours on 1 GPU. How long does it usually take on 4 GPUs?",
            options: [
              "More than 2.5 hours, since GPUs wait to exchange data",
              "Exactly 2.5 hours (= 10 ÷ 4), work split perfectly",
              "Still 10 hours, since each GPU redoes the same work",
              "40 hours (= 10 × 4), because it syncs four times",
            ],
            why: "After each step the GPUs must combine results, and they wait while doing it. Near-linear speed-up is the best case and rarely hit exactly.",
          },
          {
            q: "An hourly-rented GPU cluster only has work during the day. A sensible way to save?",
            options: [
              "Automatically shut the cluster down when the job queue is empty",
              "Keep it running around the clock so the GPUs never cool down and break",
              "Buy more GPUs to finish sooner, then shut them down",
              "Lower the server's screen resolution to reduce load",
            ],
            why: "With hourly rental, idle hours are money thrown away. Shutting down on an empty queue cuts nearly half the bill when work only happens in the daytime.",
          },
          {
            q: "A data centre has a PUE of 1.5. What does that mean?",
            options: [
              "Every 1 kWh for computing costs another 0.5 kWh for cooling and overhead",
              "50% of the servers are switched on but idle, wasting electricity",
              "The computers are running at 150% of the manufacturer's rated capacity",
              "Each server in the centre uses 1.5 kWh of electricity per hour",
            ],
            why: "PUE = total facility power ÷ power for computing equipment. 1.0 is ideal; the excess is cooling, lighting and power losses.",
          },
          {
            q: "Serving a model to users (inference) runs short of GPUs at peak. The fastest way to serve more?",
            options: [
              "Group many requests into one run (batching)",
              "Train a bigger model so it answers faster",
              "Increase training epochs so the model matures",
              "Turn off caching to always get the newest answer",
            ],
            why: "A GPU processes a batch almost as fast as a single request, so batching serves more people without buying machines. A bigger model runs slower, not faster.",
          },
          {
            q: "A 7-billion-parameter model stored in FP16 (2 bytes per parameter). Minimum GPU memory just to load the weights?",
            options: [
              "About 14 GB (= 7 billion × 2 bytes)",
              "About 7 GB (= 7 billion × 1 byte, forgetting FP16 is 2 bytes)",
              "About 28 GB (= 7 billion × 4 bytes, mistaking it for FP32)",
              "About 3.5 GB (= 7 billion ÷ 2, dividing instead of multiplying)",
            ],
            why: "Memory = parameters × bytes per parameter: 7 × 10⁹ × 2 = 14 × 10⁹ bytes. Running it for real also needs room for the conversation cache.",
          },
        ],
      },
      "swiss-haven": {
        title: "Secure Data Vault",
        intro: "You hold the keys to the customer data vault. One slip means lost data or a broken law.",
        scenarios: [
          {
            q: "The law requires Vietnamese personal data to be stored in Vietnam. What is most often missed?",
            options: [
              "Backups and logs must also stay in the permitted region",
              "Only the main database needs to be located in Vietnam",
              "Once it's encrypted, it doesn't matter where data lives",
              "It only applies to companies with over 1,000 employees",
            ],
            why: "The main database usually gets attention. Automatic backups to another region and logs full of emails and phone numbers get forgotten - and they are personal data too.",
          },
          {
            q: "What is the 3-2-1 backup rule?",
            options: [
              "3 copies, on 2 kinds of storage, 1 kept off-site",
              "Back up 3 times a day, keep 2 weeks, 1 person on call",
              "3 RAID disks, 2 servers, in 1 data centre",
              "Keep 3 months, compress to 2 parts, 1 copy in the cloud",
            ],
            why: "Three copies so one failing still leaves two; two storage types so one hardware fault can't wipe all; one far away so fire, flood or ransomware at the main site can't reach it.",
          },
          {
            q: "How do you make sure a backup will work when you need it?",
            options: [
              "Regularly test-restore it into a separate environment",
              "Check the backup file size keeps growing steadily",
              "Read the \"backup completed\" log line every night",
              "Store the backup on the same server so it's faster",
            ],
            why: "A backup that's never been restored is just a hope. The file keeps growing and the log keeps saying done even when the contents are corrupt.",
          },
          {
            q: "Encrypting data at rest protects against which risk?",
            options: [
              "A disk or copy being stolen out of the system",
              "An attacker logging in with a leaked admin password",
              "An SQL injection hole in the web application",
              "Staff with query access viewing customer data",
            ],
            why: "The application decrypts for any valid user, so anyone going through it - including someone with the admin password - can still read the data. Encryption at rest only helps when the data is carried out.",
          },
          {
            q: "A customer asks for all their data to be deleted. What is usually hardest?",
            options: [
              "Finding every copy in logs, backups and side systems",
              "Deleting their row in the main users table of the application",
              "Emailing the customer to confirm the deletion",
              "Setting is_deleted = true and calling it done",
            ],
            why: "One person's data is scattered: analytics tools, marketing email, backups, error logs. Without a data map you can't know you got it all. An is_deleted flag deletes nothing.",
          },
        ],
      },
      "singapore-dock": {
        title: "Data Queue Port",
        intro: "Data docks here from across the region. Keep the flow from being lost, duplicated or jammed.",
        scenarios: [
          {
            q: "The order-processing queue may deliver a message twice. What must the consumer do?",
            options: [
              "Be idempotent: a second delivery creates no new order",
              "Trust that the queue guarantees exactly-once delivery",
              "Drop the queue and call the API directly to be safe",
              "Raise the timeout so messages don't get repeated",
            ],
            why: "Most queues promise \"at least once\", not \"exactly once\". A unique order ID and skipping IDs already processed is how you survive duplicates.",
          },
          {
            q: "One broken message keeps crashing the consumer. The standard fix?",
            options: [
              "After a few retries, move it to a dead-letter queue (DLQ)",
              "Retry it forever until the message finally goes through on its own",
              "Delete the whole queue and rerun everything from scratch",
              "Stop the consumer until someone fixes it by hand",
            ],
            why: "Retrying a broken message forever blocks every good message behind it. A DLQ sets it aside for later while the main flow continues.",
          },
          {
            q: "Rerunning the ETL pipeline for yesterday doubles the revenue figure. Where is the design flaw?",
            options: [
              "The write step only appends, never overwrites by day",
              "Someone edited yesterday's source data afterwards",
              "The pipeline server is too slow for the data volume",
              "A time zone offset shifted data into another day",
            ],
            why: "A good pipeline gives the same result however many times it runs: drop that day's partition and rewrite it, rather than just appending rows.",
          },
          {
            q: "Data sent from Singapore to Hanoi is slow. What actually reduces total latency?",
            options: [
              "Batch messages together and compress before sending",
              "Add RAM to the receiving machine so it loads faster",
              "Switch from JSON to XML so the data is structured",
              "Send each message on its own so nothing has to wait",
            ],
            why: "Each round trip costs about 40 ms whatever the packet size, so sending one by one pays that fee per message. Batching and compression cut both trips and bytes.",
          },
          {
            q: "The consumer processes slower than data arrives. Which sign shows it earliest?",
            options: [
              "Queue lag rising steadily over time",
              "The sending machine's CPU stuck at 100%",
              "An unusual rise in HTTP 404 errors in the logs",
              "The consumer's free disk space shrinking",
            ],
            why: "Lag is the gap between the newest message and the one being processed. Steady growth means output is losing to input - a warning before users see stale data.",
          },
        ],
      },
    },
  },
};
