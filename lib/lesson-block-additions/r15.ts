import type { LessonSectionBlock } from "../lesson-types";

// Khối mô phỏng (sim | aiLab | scenario) cho bài còn thiếu - đợt r15. Một người viết cho một tệp.
export const R15_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "rui-ro-tap-trung-khi-mot-phan-chi-phoi": [
    {
      type: "scenario",
      title: "Một dịch vụ chiếm bảy mươi phần trăm hoá đơn",
      start: "a",
      nodes: {
        a: {
          text: "Hoá đơn hạ tầng cho thấy dịch vụ xử lý ảnh chiếm khoảng 70% chi phí, và chỉ một kỹ sư tên Hải hiểu nó. (Số liệu minh hoạ.) Quý này bạn được giao việc cắt giảm. Bạn bắt đầu từ đâu?",
          choices: [
            { label: "Chia đều mục tiêu cắt giảm cho mọi dịch vụ", next: "bad-chia-deu" },
            { label: "Tối ưu dịch vụ ảnh trước, vì mỗi giờ ở đó đáng giá nhất", next: "b" },
            { label: "Tách dịch vụ ảnh thành nhiều phần nhỏ cho đỡ tập trung", next: "bad-tach" },
          ],
        },
        "bad-chia-deu": {
          text: "Mười dịch vụ nhỏ mỗi nơi giảm vài phần trăm, tổng tiết kiệm không đáng kể, còn dịch vụ ảnh vẫn nguyên. Cuối quý hoá đơn gần như không đổi và đội đã mất sáu tuần cho những chỗ ít giá trị.",
          ending: "bad",
        },
        "bad-tach": {
          text: "Việc tách tốn hai tháng và thêm nhiều chỗ gọi nhau qua mạng. Chi phí mạng tăng, hoá đơn còn cao hơn, trong khi Hải vẫn là người duy nhất hiểu cả mớ phần mới.",
          ending: "bad",
        },
        b: {
          text: "Bạn và Hải tìm ra cách giảm được một phần ba chi phí của dịch vụ ảnh. Nhưng bạn nhận ra mọi quyết định về dịch vụ này đều chờ Hải, và tuần sau anh ấy xin nghỉ phép dài. Bạn làm gì?",
          choices: [
            { label: "Chờ anh ấy về rồi hãy triển khai bản tối ưu", next: "bad-cho" },
            { label: "Nhờ Hải ghi lại cách vận hành, rồi để một người khác chạy thử", next: "good" },
            { label: "Thuê ngoài cả dịch vụ ảnh để khỏi phụ thuộc", next: "bad-thue" },
          ],
        },
        "bad-cho": {
          text: "Trong lúc Hải vắng, dịch vụ ảnh gặp sự cố vào đêm Chủ nhật. Không ai biết cách xử lý nên cả hệ thống đình trệ ba tiếng, vì năng lực bảy mươi phần trăm kia nằm hết trong đầu một người.",
          ending: "bad",
        },
        "bad-thue": {
          text: "Bên ngoài cần ba tháng để hiểu hệ thống và tính phí cao hơn cả khoản vừa tiết kiệm. Rủi ro tập trung chỉ chuyển từ một người sang một nhà cung cấp, không giảm đi.",
          ending: "bad",
        },
        good: {
          text: "Tài liệu của Hải lộ ra hai bước mà anh ấy làm theo thói quen và chưa ai biết. Người thứ hai chạy thử thành công trước khi anh nghỉ. Bạn vừa giảm chi phí vừa giảm rủi ro, và chấp nhận cái giá nhỏ của việc có thêm một người cùng nắm.",
          ending: "good",
        },
      },
    },
  ],

  "cau-truc-so-huu-ha-tang": [
    {
      type: "scenario",
      title: "Chốt tỷ lệ cam kết cho sản phẩm mới",
      start: "a",
      nodes: {
        a: {
          text: "Nhà cung cấp đám mây chào mức giảm lớn nếu bạn cam kết dùng ba năm. Sản phẩm của bạn mới ra mắt tám tháng, mức tải còn dao động mạnh. Bạn đề xuất cam kết thế nào?",
          choices: [
            { label: "Cam kết toàn bộ dung lượng hiện tại để lấy mức giảm tối đa", next: "bad-het" },
            { label: "Không cam kết gì, trả theo nhu cầu cho an toàn", next: "bad-khong" },
            { label: "Chỉ cam kết phần nền mà kịch bản xấu vẫn cần", next: "b" },
          ],
        },
        "bad-het": {
          text: "Bốn tháng sau, đội tối ưu được mã và nhu cầu giảm gần một nửa. Phần cam kết thừa vẫn phải trả. Cả đội bắt đầu giữ lại những hệ thống lẽ ra nên tắt cho đỡ phí khoản đã trả.",
          ending: "bad",
        },
        "bad-khong": {
          text: "Phần nền chạy suốt đêm ngày vẫn bị tính giá cao nhất. Cuối năm kế toán chỉ ra rằng chỉ riêng phần nền đã trả thừa một khoản đủ thuê thêm một kỹ sư, mà không đổi lại được gì.",
          ending: "bad",
        },
        b: {
          text: "Bạn chọn cam kết khoảng bốn mươi phần trăm dung lượng (con số minh hoạ). Quản lý hỏi bao giờ xem lại tỷ lệ này. Bạn trả lời sao?",
          choices: [
            { label: "Khi nào có sự kiện lớn làm tải đổi thì xem lại", next: "bad-su-kien" },
            { label: "Ba năm sau, khi hợp đồng hết hạn", next: "bad-ba-nam" },
            { label: "Mỗi sáu tháng, kể cả khi chưa có gì xảy ra", next: "good" },
          ],
        },
        "bad-su-kien": {
          text: "Khách hàng lớn nhất ngừng dùng sản phẩm. Tải giảm đột ngột và phần cam kết trở thành khoản thừa ngay lúc ngân sách bị siết, nên không còn lựa chọn nào ngoài việc trả cho hết.",
          ending: "bad",
        },
        "bad-ba-nam": {
          text: "Hai năm rưỡi sau tỷ lệ vẫn nguyên dù sản phẩm đã đổi kiến trúc. Chẳng ai nhớ giả định ban đầu, và cuộc rà soát cuối cùng chỉ để xác nhận một sai lầm đã kéo dài.",
          ending: "bad",
        },
        good: {
          text: "Lần rà soát đầu tiên cho thấy nhu cầu nền ổn định hơn dự kiến, nên bạn tăng nhẹ phần cam kết với mức giảm tốt hơn. Nhịp xem lại đều đặn khiến tỷ lệ luôn bám sát thực tế thay vì bám sát giả định cũ.",
          ending: "good",
        },
      },
    },
  ],

  "hoach-dinh-dung-luong-la-gi": [
    {
      type: "scenario",
      title: "Biểu đồ đẹp nhưng chưa ai biết hạn",
      start: "a",
      nodes: {
        a: {
          text: "Đội bạn đo được hệ thống chịu tối đa khoảng 2.000 yêu cầu mỗi giây, hiện đang chạy 1.400 và tăng đều. (Số minh hoạ.) Trưởng nhóm hỏi bạn đã hoạch định dung lượng xong chưa. Bạn nộp gì?",
          choices: [
            { label: "Một báo cáo đẹp về mức chịu tải tối đa hiện nay", next: "bad-bao-cao" },
            { label: "Một ngày cụ thể ước tính sẽ chạm trần, có tên người chịu trách nhiệm", next: "b" },
            { label: "Bảng theo dõi mức dùng CPU gửi tới cả nhóm mỗi tuần", next: "bad-bang" },
          ],
        },
        "bad-bao-cao": {
          text: "Báo cáo được khen rồi nằm trong thư mục. Tám tuần sau lưu lượng chạm trần vào giờ cao điểm, và không ai có việc nào trong lịch để chuẩn bị, nên đội xử lý lúc ba giờ sáng.",
          ending: "bad",
        },
        "bad-bang": {
          text: "CPU chỉ là một tài nguyên. Hệ thống thật ra nghẽn ở số kết nối cơ sở dữ liệu khi CPU mới dùng một nửa, nên bảng theo dõi vẫn xanh đúng lúc người dùng bắt đầu gặp lỗi.",
          ending: "bad",
        },
        b: {
          text: "Bạn tính ra tải sẽ chạm trần trong khoảng chín tuần. Nhưng đội sản phẩm vừa kể tháng sau sẽ ra tính năng gợi ý, hứa hẹn thêm nhiều yêu cầu. Bạn xử lý ra sao?",
          choices: [
            { label: "Giữ nguyên ngày, vì dữ liệu quá khứ không nói gì khác", next: "bad-giu" },
            { label: "Hỏi đội sản phẩm dự báo tải của tính năng, rồi dời ngày sớm lại", next: "good" },
            { label: "Giao hẳn việc hoạch định cho một bộ phận hạ tầng chung", next: "bad-chung" },
          ],
        },
        "bad-giu": {
          text: "Tính năng gợi ý ra mắt và tải tăng gấp đôi mức dự kiến chỉ trong hai tuần. Ngày trong lịch của bạn đúng với quá khứ nhưng sai với tương lai, nên hạn bị bỏ lỡ gần một tháng.",
          ending: "bad",
        },
        "bad-chung": {
          text: "Bộ phận chung tổng hợp số liệu rất chuẩn nhưng không biết tính năng nào sắp ra mắt. Họ vẫn dự báo theo đường cũ, và đội sở hữu dịch vụ chỉ biết mình thiếu chỗ khi đã quá muộn.",
          ending: "bad",
        },
        good: {
          text: "Đội sản phẩm cho biết tính năng mới có thể tăng thêm ba mươi phần trăm yêu cầu. Ngày chạm trần dời xuống còn khoảng năm tuần, được ghi vào lịch kèm tên người đặt mua thêm dung lượng, và nó được rà soát đúng buổi họp tháng sau.",
          ending: "good",
        },
      },
    },
  ],

  "ngan-sach-tai-nguyen-va-nguong-can-thiep": [
    {
      type: "scenario",
      title: "Ngưỡng bảy mươi phần trăm cho mọi thứ",
      start: "a",
      nodes: {
        a: {
          text: "Đội bạn dùng một ngưỡng chung 70% cho mọi tài nguyên. Số kết nối cơ sở dữ liệu hay chạm ngưỡng nhưng thêm máy chủ chỉ mất vài phút. Phần cứng lưu trữ thì phải đặt mua và mất khoảng sáu tuần. Bạn chỉnh thế nào?",
          choices: [
            { label: "Hạ ngưỡng chung xuống 50% cho mọi thứ", next: "bad-ha-chung" },
            { label: "Đặt ngưỡng riêng theo thời gian cần để chuẩn bị của từng tài nguyên", next: "b" },
            { label: "Giữ nguyên 70% và tắt cảnh báo của những tài nguyên hay nhiễu", next: "bad-tat" },
          ],
        },
        "bad-ha-chung": {
          text: "Máy chủ cảnh báo liên tục dù thêm máy chỉ mất vài phút, nên cả đội quen bỏ qua màu vàng. Trong khi đó 50% vẫn chưa đủ sớm cho lưu trữ cần sáu tuần, nên nó vẫn hết chỗ lúc chưa kịp mua.",
          ending: "bad",
        },
        "bad-tat": {
          text: "Cảnh báo yên ắng, rồi một đêm kết nối cơ sở dữ liệu cạn mà không ai hay trước. Sự cố kéo dài vì tài nguyên vừa bị tắt cảnh báo lại cần một cửa sổ bảo trì mới sửa được.",
          ending: "bad",
        },
        b: {
          text: "Ngưỡng riêng đã chạy. Một tuần sau ngưỡng lưu trữ bị vượt, nhưng không ai đang trực nên nó chỉ hiện trên bảng. Bạn làm gì với ngưỡng này?",
          choices: [
            { label: "Để nó vàng thêm vài tuần, vì chưa phải sự cố", next: "bad-vang" },
            { label: "Gán tên một người cùng một ngày quyết định mở rộng, giảm tải hoặc dời ngưỡng", next: "good" },
            { label: "Gắn nó vào lịch trực để đánh thức người trực mỗi đêm", next: "bad-danh-thuc" },
          ],
        },
        "bad-vang": {
          text: "Cả đội quen dần với màu vàng. Sáu tuần sau phần cứng vẫn chưa được đặt mua, và khi đĩa đầy thì thời gian chờ giao hàng đã không còn cách nào rút ngắn.",
          ending: "bad",
        },
        "bad-danh-thuc": {
          text: "Người trực bị đánh thức vì một việc không cấp bách và không làm gì được lúc ba giờ sáng. Hai tuần sau họ tắt thông báo của riêng nhóm này, đúng loại cảnh báo mà họ cần đọc.",
          ending: "bad",
        },
        good: {
          text: "Chị Mai nhận việc với hạn thứ Sáu tuần sau, ghi rõ lý do chọn mở rộng. Đơn mua phần cứng đi trước hạn chạm trần, và ngưỡng trở lại xanh mà không có sự cố nào xảy ra.",
          ending: "good",
        },
      },
    },
  ],

  "he-thong-thoi-gian-thuc-do-tre-co-han-cung": [
    {
      type: "scenario",
      title: "Bộ điều khiển phanh chạy nhanh nhưng thỉnh thoảng giật",
      start: "a",
      nodes: {
        a: {
          text: "Bộ điều khiển trong một thiết bị công nghiệp phải phản hồi trong 5 mili giây. Trung bình nó mất 1 mili giây, nhưng thỉnh thoảng có lần mất 40. (Số minh hoạ.) Bạn đề xuất gì?",
          choices: [
            { label: "Bổ sung bộ nhớ đệm để kéo con số trung bình xuống thấp hơn", next: "bad-dem" },
            { label: "Tìm nguyên nhân của những lần mất 40 mili giây và loại bỏ nó", next: "b" },
            { label: "Báo cáo rằng hệ thống đạt yêu cầu vì trung bình dưới 5", next: "bad-trung-binh" },
          ],
        },
        "bad-dem": {
          text: "Trung bình giảm còn 0,6 mili giây nhưng những lần xả bộ nhớ đệm cùng lúc làm trần tệ hơn, có lần lên tới 60. Con số đẹp hơn trên báo cáo, hệ thống lại kém đáng tin hơn.",
          ending: "bad",
        },
        "bad-trung-binh": {
          text: "Một lần phản hồi muộn trên dây chuyền làm lệnh dừng tới chậm. Với hệ thống thời gian thực, kết quả đúng mà tới muộn vẫn là kết quả sai, và con số trung bình không cứu được lần đó.",
          ending: "bad",
        },
        b: {
          text: "Bạn thấy những lần chậm trùng với lúc bộ thu gom rác của ngôn ngữ đang dùng chạy ngầm. Bạn chọn hướng nào?",
          choices: [
            { label: "Cấp trước bộ nhớ cố định và tránh cấp phát khi đang chạy", next: "good" },
            { label: "Chỉnh bộ thu gom rác chạy thường xuyên hơn cho đỡ dồn", next: "bad-thuong-xuyen" },
            { label: "Tăng tốc độ xung nhịp để mỗi lần chạy xong nhanh hơn", next: "bad-xung-nhip" },
          ],
        },
        "bad-thuong-xuyen": {
          text: "Mỗi lần dọn nhỏ hơn nhưng số lần nhiều hơn, và thời điểm xảy ra vẫn không đoán trước được. Trần vẫn còn những lần vọt lên, chỉ là thấp hơn một chút.",
          ending: "bad",
        },
        "bad-xung-nhip": {
          text: "Mọi thứ nhanh hơn kể cả lần chậm, nhưng nguyên nhân bất định vẫn còn nguyên. Thiết bị nóng hơn, pin nhanh cạn hơn, và vẫn có lần vượt hạn khi hệ thống bận.",
          ending: "bad",
        },
        good: {
          text: "Sau khi bỏ cấp phát động trong vòng lặp chính, thời gian phản hồi tệ nhất rơi xuống còn 3 mili giây và gần như không đổi giữa các lần đo. Trung bình không đẹp hơn nhiều, nhưng giờ có thể đoán trước, và đó mới là yêu cầu thật.",
          ending: "good",
        },
      },
    },
  ],

  "he-thong-nhung-toi-uu-khi-tai-nguyen-co-dinh": [
    {
      type: "scenario",
      title: "Thiết bị đeo hết pin sau ba tuần thay vì sáu tháng",
      start: "a",
      nodes: {
        a: {
          text: "Một cảm biến chạy pin được giao cho khách hàng. Phản hồi cho thấy pin chỉ trụ ba tuần thay vì sáu tháng như thiết kế, dù mọi phép đo tốc độ đều xanh. Bạn nghi ngờ điều gì trước?",
          choices: [
            { label: "Bộ nhớ không đủ nên thiết bị phải chạy chậm lại", next: "bad-bo-nho" },
            { label: "Có vòng lặp bận chạy hết công suất thay vì ngủ giữa các lần đọc", next: "b" },
            { label: "Pin của lô hàng này kém chất lượng hơn dự kiến", next: "bad-pin" },
          ],
        },
        "bad-bo-nho": {
          text: "Bạn mất hai ngày đo bộ nhớ và thấy còn dư. Trong thời gian đó khách hàng tiếp tục phàn nàn, còn thiết bị vẫn trả đủ dữ liệu đúng và nhanh nên chỉ số nào cũng xanh.",
          ending: "bad",
        },
        "bad-pin": {
          text: "Đổi sang một lô pin khác không thay đổi gì. Bạn đã tốn một tuần và cả chi phí vận chuyển, trong khi nguyên nhân nằm sẵn trong mã mà không phép đo hiệu năng nào chạm tới.",
          ending: "bad",
        },
        b: {
          text: "Đúng vậy: vòng lặp đọc cảm biến chờ bằng cách hỏi liên tục. Bạn sửa nó để thiết bị ngủ giữa các lần đọc, và giờ cần phát bản cập nhật cho hàng nghìn thiết bị ngoài hiện trường. Bạn làm gì?",
          choices: [
            { label: "Phát thẳng bản mới cho mọi thiết bị để khách có ngay", next: "bad-phat-het" },
            { label: "Ghi đè cả phần khởi động để dọn sạch bộ nhớ cho gọn", next: "bad-ghi-de" },
            { label: "Phát từng nhóm nhỏ, giữ phần khởi động bất khả ghi để quay lại bản cũ", next: "good" },
          ],
        },
        "bad-phat-het": {
          text: "Một lỗi nhỏ trong bản mới làm vài trăm thiết bị không khởi động nổi. Vì cập nhật hỏng nên chúng không nhận được cả bản sửa, và phải thu hồi về trạm bằng tay.",
          ending: "bad",
        },
        "bad-ghi-de": {
          text: "Một thiết bị mất điện giữa lúc ghi đè, phần khởi động bị hỏng và nó thành cục chặn giấy. Bạn đã bỏ đi đúng phần duy nhất giúp thiết bị tự cứu mình.",
          ending: "bad",
        },
        good: {
          text: "Đợt đầu 2% thiết bị cập nhật xong, vài chiếc lỗi tự quay về bản cũ. Bạn sửa lỗi, rồi phát tiếp với tuổi thọ pin trở lại sáu tháng. Ngân sách năng lượng giờ là một dòng được đo từ đầu mọi bản phát hành.",
          ending: "good",
        },
      },
    },
  ],

  "cong-cu-giam-thiet-hai-khi-phu-thuoc-ngoai-hong": [
    {
      type: "scenario",
      title: "Dịch vụ kiểm tra gian lận chậm đi mười lần",
      start: "a",
      nodes: {
        a: {
          text: "Dịch vụ kiểm tra gian lận bên ngoài không báo lỗi nhưng trả lời chậm gấp mười lần. Trang thanh toán của bạn bắt đầu treo, rồi cả trang tìm kiếm cũng chậm theo. Bạn xử lý trước tiên thế nào?",
          choices: [
            { label: "Tăng số lần thử lại để lượt nào chậm thì gọi lại", next: "bad-thu-lai" },
            { label: "Đặt thời gian chờ tối đa ngắn cho lượt gọi tới dịch vụ đó", next: "b" },
            { label: "Tăng số luồng xử lý để chịu được lượt gọi chậm", next: "bad-luong" },
          ],
        },
        "bad-thu-lai": {
          text: "Mỗi lượt giờ thành ba lượt và đè thêm lên dịch vụ đang quá tải. Nó chậm hơn nữa, luồng bị giữ nhiều hơn nữa, và cả hệ thống ngừng phục vụ nhanh hơn trước.",
          ending: "bad",
        },
        "bad-luong": {
          text: "Cái hồ luồng lớn hơn đầy lên trong vài phút thay vì vài giây. Với lưu lượng không đổi, số luồng bị giữ cứ tăng cho tới khi hết, chỉ muộn hơn một chút.",
          ending: "bad",
        },
        b: {
          text: "Thời gian chờ giúp luồng được giải phóng, nhưng giờ nhiều lượt gọi hết hạn và bạn phải quyết định khi không kiểm tra được gian lận thì làm gì với giao dịch. Bạn chọn thế nào?",
          choices: [
            { label: "Tạm chấp nhận mọi giao dịch cho tới khi dịch vụ ổn lại", next: "bad-chap-nhan" },
            { label: "Từ chối mọi giao dịch cho tới khi dịch vụ ổn lại", next: "bad-tu-choi" },
            { label: "Áp quy tắc đã thống nhất với bộ phận rủi ro từ trước, ví dụ giới hạn giá trị", next: "good" },
          ],
        },
        "bad-chap-nhan": {
          text: "Kẻ gian nhận ra khi nào kiểm tra tắt. Trong hai giờ chúng thử hàng loạt thẻ đánh cắp, và khoản hoàn tiền sau đó lớn hơn cả doanh thu mất đi nếu từ chối.",
          ending: "bad",
        },
        "bad-tu-choi": {
          text: "Khách hàng thật không mua được gì suốt buổi chiều. Doanh thu về không, đội chăm sóc khách quá tải, và quyết định đáng ra phải do bộ phận nghiệp vụ cân nhắc từ trước.",
          ending: "bad",
        },
        good: {
          text: "Giao dịch nhỏ được cho qua, giao dịch lớn được giữ lại xem xét sau. Người trực làm đúng quy tắc đã viết sẵn thay vì tự quyết lúc ba giờ sáng. Thiệt hại nằm trong mức đã chấp nhận, và cơ chế ngắt mạch cho dịch vụ kia thời gian hồi phục.",
          ending: "good",
        },
      },
    },
  ],

  "xac-suat-va-thong-ke-cho-ke-hoach-sao-luu": [
    {
      type: "scenario",
      title: "Ba bản sao trên cùng một máy chủ",
      start: "a",
      nodes: {
        a: {
          text: "Đồng nghiệp tính rằng nếu mỗi bản sao hỏng với xác suất 1% mỗi năm thì ba bản cùng hỏng chỉ còn một phần triệu, và nói kế hoạch sao lưu đã quá an toàn. (Số minh hoạ.) Cả ba bản nằm trên ba đĩa của cùng một máy. Bạn nói gì?",
          choices: [
            { label: "Đồng ý, vì ba bản thì chắc chắn an toàn hơn một bản", next: "bad-dong-y" },
            { label: "Phép nhân chỉ đúng khi các bản hỏng độc lập, mà ở đây thì không", next: "b" },
            { label: "Đề nghị thêm bản thứ tư trên một đĩa nữa của máy đó", next: "bad-them-ban" },
          ],
        },
        "bad-dong-y": {
          text: "Tháng sau nguồn điện của máy hỏng và cả ba đĩa chết cùng lúc. Một phần triệu chỉ là con số trên giấy, còn nguyên nhân chung đã xoá sạch mọi bản sao trong một lần.",
          ending: "bad",
        },
        "bad-them-ban": {
          text: "Bản thứ tư cũng chung nguồn điện, chung vỏ máy và chung vị trí. Nó thêm chi phí mà không loại bỏ nguyên nhân chung nào, nên rủi ro thực tế gần như không đổi.",
          ending: "bad",
        },
        b: {
          text: "Đồng nghiệp đồng ý và hỏi cách sửa. Bạn đề xuất đưa một bản sang địa điểm khác. Nhưng một nhân viên chạy nhầm lệnh xoá sạch thư mục, mà lệnh ấy đồng bộ ngay sang mọi bản có thể ghi. Bạn bổ sung gì?",
          choices: [
            { label: "Thêm một bản sao chép tức thời nữa sang máy thứ ba", next: "bad-dong-bo" },
            { label: "Tăng tần suất đồng bộ để bản sao luôn mới nhất", next: "bad-tan-suat" },
            { label: "Giữ một bản không ghi đè được, chỉ thêm mới chứ không sửa hay xoá", next: "good" },
          ],
        },
        "bad-dong-bo": {
          text: "Lệnh xoá nhầm lan sang cả máy thứ ba trong vài giây. Có thêm một nơi chứa thì cũng thêm một nơi bị xoá cùng lúc, vì cơ chế sao chép tức thời chuyển cả sai lầm.",
          ending: "bad",
        },
        "bad-tan-suat": {
          text: "Bản sao giờ mới hơn từng phút, tức là nó cũng trống rỗng nhanh hơn. Đồng bộ thường xuyên làm lệnh xoá nhầm lan nhanh hơn chứ không giúp khôi phục.",
          ending: "bad",
        },
        good: {
          text: "Khi lệnh xoá nhầm xảy ra, các bản thông thường mất dữ liệu nhưng bản không ghi đè được vẫn nguyên. Đội khôi phục trong vài giờ, và hai con số được đặt thành mục tiêu rõ ràng: mất bao nhiêu dữ liệu, ngừng phục vụ bao lâu.",
          ending: "good",
        },
      },
    },
  ],

  "nguong-an-toan-toi-thieu-va-quy-dinh-luu-tru": [
    {
      type: "scenario",
      title: "Quy định giữ nhật ký năm năm, và cả xoá sau bảy năm",
      start: "a",
      nodes: {
        a: {
          text: "Quy định yêu cầu giữ nhật ký giao dịch tối thiểu năm năm. Hệ thống của bạn có khách hàng nhạy cảm và nhật ký chứa nhiều dữ liệu cá nhân. Bạn đặt chính sách lưu trữ thế nào?",
          choices: [
            { label: "Giữ vô thời hạn, vì giữ nhiều thì không bao giờ vi phạm", next: "bad-vo-han" },
            { label: "Cân nhắc rủi ro của hệ thống rồi quyết định, ghi lại lý do", next: "b" },
            { label: "Đặt đúng năm năm, vì quy định yêu cầu thế", next: "bad-dung-muc" },
          ],
        },
        "bad-vo-han": {
          text: "Nhiều năm sau một vụ rò rỉ lộ cả nhật ký của những khách đã ngừng dùng từ rất lâu. Thiệt hại tỷ lệ với lượng dữ liệu giữ, mà phần lớn lượng đó chẳng mang lại lợi ích nào.",
          ending: "bad",
        },
        "bad-dung-muc": {
          text: "Chính sách sao chép nguyên con số, không ai hỏi nó có hợp với hệ thống này không. Khi có tranh chấp ở năm thứ sáu, nhật ký cần để làm bằng chứng đã bị xoá, dù pháp lý của công ty cần nó.",
          ending: "bad",
        },
        b: {
          text: "Bạn chọn giữ bảy năm vì nhóm pháp chế cần cho tranh chấp, và ghi lý do vào chính sách. Rồi bạn đọc kỹ lại quy định và thấy nó còn nói phải xoá dữ liệu cá nhân sau tối đa tám năm. Bạn làm gì?",
          choices: [
            { label: "Bỏ qua vế này vì mình đã tuân thủ vế giữ tối thiểu", next: "bad-bo-qua" },
            { label: "Tạo công việc tự động xoá sau bảy năm và báo lỗi nếu nó thất bại", next: "good" },
            { label: "Ghi trong tài liệu rằng dữ liệu sẽ được xoá khi có người nhớ", next: "bad-tai-lieu" },
          ],
        },
        "bad-bo-qua": {
          text: "Kiểm toán viên chỉ ra rằng đội tuân thủ một nửa quy định và vi phạm nửa còn lại. Dữ liệu giữ quá tám năm trở thành phát hiện nghiêm trọng, dù đội tin mình đang làm đúng.",
          ending: "bad",
        },
        "bad-tai-lieu": {
          text: "Chính sách nằm trên giấy, không công việc nào thi hành nó. Hai năm sau người viết nghỉ việc, dữ liệu vẫn tích tụ, và không ai biết chính sách này chưa bao giờ chạy thật.",
          ending: "bad",
        },
        good: {
          text: "Công việc xoá chạy hằng đêm và cảnh báo khi lỗi. Chính sách có hai vế rõ ràng, có công việc thi hành, và có dòng ghi lý do giữ bảy năm để người rà soát sau không cắt nó về mức sàn.",
          ending: "good",
        },
      },
    },
  ],

  "diem-mu-khi-doc-code-cua-chinh-minh": [
    {
      type: "scenario",
      title: "Đọc lại mười lần vẫn không thấy lỗi",
      start: "a",
      nodes: {
        a: {
          text: "Hàm tính giá khuyến mãi của bạn trả về sai vào vài đơn hàng. Bạn đã đọc lại nó mười lần mà vẫn thấy mọi thứ ổn. Sắp hết ngày, bạn làm gì tiếp theo?",
          choices: [
            { label: "Đọc lại lần nữa, thật chậm và tập trung hơn", next: "bad-doc-lai" },
            { label: "Giải thích từng dòng thành lời cho một đồng nghiệp hoặc một vật vô tri", next: "b" },
            { label: "Viết thêm kiểm thử dựa trên cách bạn hiểu hàm đang chạy", next: "bad-kiem-thu" },
          ],
        },
        "bad-doc-lai": {
          text: "Lần thứ mười một cũng giống mười lần trước. Bạn đọc ra cái tên biến đúng thay cho cái bạn thực sự gõ, vì não lấy ý định lấp vào khoảng trống. Cố gắng hơn không đổi được gì ở tầng này.",
          ending: "bad",
        },
        "bad-kiem-thu": {
          text: "Mọi kiểm thử đều xanh vì chúng được viết từ cùng một cách hiểu với chính hàm. Điểm mù tạo ra cả code lẫn kiểm thử, nên bộ kiểm xanh vẫn để lọt lỗi.",
          ending: "bad",
        },
        b: {
          text: "Đang giải thích tới dòng thứ bảy, bạn khựng lại: biến giamGia được dùng trước khi tính xong. Đồng nghiệp chưa kịp nói gì. Bạn đã tìm ra lỗi, và còn muốn kiểm tra thêm vì nghi còn lỗi khác. Bạn làm gì?",
          choices: [
            { label: "Đọc tiếp phần còn lại ngay khi đầu óc đang quen với nó", next: "bad-doc-tiep" },
            { label: "Để cách một đêm rồi đọc lại bằng cách đổi cỡ chữ hoặc đọc từ dưới lên", next: "good" },
            { label: "Bỏ qua, vì lỗi chính đã sửa xong", next: "bad-bo-qua" },
          ],
        },
        "bad-doc-tiep": {
          text: "Ý định trong đầu vẫn đang chạy, nên mắt bạn lại lướt qua một điều kiện so sánh ngược dấu. Lỗi thứ hai tồn tại thêm hai tuần cho tới khi một khách hàng gặp nó.",
          ending: "bad",
        },
        "bad-bo-qua": {
          text: "Lỗi thứ hai là một điều kiện biên với giá bằng không, không liên quan lỗi đầu. Nó lọt vào bản phát hành vì bạn dừng khi cảm giác đã xong chứ không phải khi đã thực sự kiểm.",
          ending: "bad",
        },
        good: {
          text: "Sáng hôm sau đọc từ dưới lên, bạn thấy ngay một điều kiện so sánh ngược dấu mà hôm qua mắt bạn đã lướt qua. Cái đêm cách quãng xoá bớt ý định lấp khoảng trống, nên đoạn code trở nên lạ trở lại.",
          ending: "good",
        },
      },
    },
  ],

  "qua-tu-tin-va-neo-vao-cach-lam-dau-tien": [
    {
      type: "scenario",
      title: "Ước lượng ba ngày cho một tính năng xuất báo cáo",
      start: "a",
      nodes: {
        a: {
          text: "Quản lý hỏi bạn mất bao lâu để thêm tính năng xuất báo cáo ra tệp. Bạn hình dung ngay các bước và thấy chừng ba ngày. Bạn trả lời thế nào?",
          choices: [
            { label: "Ba ngày, bạn đã nghĩ kỹ từng bước rồi", next: "bad-ba-ngay" },
            { label: "Chia việc thành nhiều phần nhỏ rồi cộng thời gian từng phần", next: "bad-chia-nho" },
            { label: "Xem mấy việc tương tự gần đây mất bao lâu rồi lấy làm gốc", next: "b" },
          ],
        },
        "bad-ba-ngay": {
          text: "Giữa chừng bạn gặp thư viện xuất tệp không chạy như tài liệu mô tả, và dữ liệu thật có hình dạng khác. Việc mất tám ngày, vì bạn chỉ tưởng tượng được những bước mình đã biết.",
          ending: "bad",
        },
        "bad-chia-nho": {
          text: "Mười phần nhỏ cộng lại ra bốn ngày, nghe chắc chắn hơn. Nhưng mỗi phần bỏ sót chi phí kết nối với phần khác, và thực tế vẫn mất sáu ngày.",
          ending: "bad",
        },
        b: {
          text: "Ba việc xuất dữ liệu trước đó mất từ bảy tới chín ngày, nên bạn báo khoảng một tuần rưỡi. Khi bắt tay làm, bạn nghĩ ngay ra một cách: ghi thẳng từng dòng vào tệp. Bạn làm gì?",
          choices: [
            { label: "Viết luôn cách đó vì nó đơn giản và có vẻ chạy được", next: "bad-viet-luon" },
            { label: "Nghĩ thêm cách thứ hai và thứ ba rồi so sánh trước khi viết", next: "c" },
            { label: "Hỏi đồng nghiệp xem cách của mình có ổn không", next: "bad-hoi" },
          ],
        },
        "bad-viet-luon": {
          text: "Cách đầu tiên tải toàn bộ dữ liệu vào bộ nhớ, và báo cáo lớn làm máy chủ cạn bộ nhớ. Bạn viết lại một nửa, vì khi neo vào cách đầu tiên bạn không có gì để so sánh.",
          ending: "bad",
        },
        "bad-hoi": {
          text: "Đồng nghiệp nghe cách của bạn trước nên gật đầu theo, và cả hai cùng bỏ qua cách xử lý theo luồng. Hỏi sau khi đã neo chỉ là bảo vệ cách đầu tiên với thêm một người.",
          ending: "bad",
        },
        c: {
          text: "Cách thứ hai là ghi theo lô, cách thứ ba là tạo tệp ở nền rồi gửi liên kết tải. Cách thứ ba mới buộc bạn nhìn bài toán từ hướng khác. Bạn cũng viết ra dự đoán của mình trước khi chạy thử. Quyết định cuối là gì?",
          choices: [
            { label: "Chọn cách ghi theo lô vì nó gần với cách đầu tiên nhất", next: "bad-gan" },
            { label: "Chọn cách tạo ở nền vì báo cáo lớn là trường hợp thật", next: "good" },
            { label: "Chọn cách đầu tiên vì đã nghĩ nhiều cách mà vẫn thấy nó dễ nhất", next: "bad-quay-lai" },
          ],
        },
        "bad-gan": {
          text: "Cách theo lô vẫn giữ nhiều dữ liệu trong bộ nhớ ở lúc cuối. Nó đỡ hơn cách đầu nhưng báo cáo lớn nhất vẫn làm chậm cả máy chủ, vì bạn chọn cách giống cách đã neo.",
          ending: "bad",
        },
        "bad-quay-lai": {
          text: "Bạn quay về đúng chỗ ban đầu và gặp đúng sự cố bộ nhớ. Mỗi cách so sánh có ích chỉ khi bạn chịu để nó thắng, còn ở đây bạn đã chọn trước rồi mới tìm lý do.",
          ending: "bad",
        },
        good: {
          text: "Báo cáo lớn chạy ở nền, người dùng nhận liên kết khi xong, máy chủ không bị đè. Việc mất chín ngày, nằm giữa khoảng bạn đã báo, và bạn ghi lại con số để làm dữ liệu cho lần ước lượng sau.",
          ending: "good",
        },
      },
    },
  ],

  "kiem-thu-viet-cai-gi-va-khong-viet-cai-gi": [
    {
      type: "scenario",
      title: "Độ phủ chín mươi phần trăm nhưng lỗi vẫn lọt",
      start: "a",
      nodes: {
        a: {
          text: "Dự án có độ phủ kiểm thử 90%, nhưng tuần trước một lỗi trong hàm tính phí vận chuyển vẫn lọt ra sản phẩm. Quản lý muốn tăng độ phủ lên 95%. Bạn đề xuất gì?",
          choices: [
            { label: "Làm theo, thêm kiểm thử cho những hàm còn trống cho nhanh đạt", next: "bad-phu" },
            { label: "Viết thêm kiểm thử cho những chỗ phức tạp, hay đổi và hậu quả nặng", next: "b" },
            { label: "Tập trung vào các hàm đơn giản vì chúng dễ viết kiểm thử nhất", next: "bad-de-viet" },
          ],
        },
        "bad-phu": {
          text: "Độ phủ lên 95% nhờ những kiểm thử gọi hàm mà không kiểm tra kết quả. Con số đẹp hơn nhưng hàm phí vận chuyển vẫn không được bảo vệ, vì độ phủ đo dòng được chạy chứ không đo điều gì được kiểm chứng.",
          ending: "bad",
        },
        "bad-de-viet": {
          text: "Bạn thêm được mấy chục kiểm thử cho hàm thuần tuý, vốn đã ít khi sai. Chỗ dễ viết thường cũng là chỗ dễ đúng, nên lỗi tiếp theo vẫn nằm ở nơi bạn không nhìn tới.",
          ending: "bad",
        },
        b: {
          text: "Bạn chọn hàm tính phí vận chuyển trước. Bạn đang viết kiểm thử thì thấy mã đang lấy giá trị từ một hàm phụ bên trong, nên có cám dỗ kiểm tra chính hàm phụ ấy được gọi bao nhiêu lần. Bạn làm gì?",
          choices: [
            { label: "Kiểm tra số lần hàm phụ được gọi để chắc cách làm đúng", next: "bad-cach-lam" },
            { label: "Kiểm tra kết quả phí với vài bộ đầu vào khác nhau", next: "c" },
            { label: "Bỏ qua hàm này vì quá phức tạp để kiểm thử", next: "bad-bo" },
          ],
        },
        "bad-cach-lam": {
          text: "Tuần sau đồng nghiệp dọn lại hàm mà kết quả vẫn đúng, nhưng 12 kiểm thử đỏ vì số lần gọi đổi. Mọi người ngại dọn code hơn, nên kiểm thử đã làm việc sửa trở nên đắt.",
          ending: "bad",
        },
        "bad-bo": {
          text: "Hàm phức tạp, hay đổi và xử lý tiền là đúng loại cần kiểm thử nhất. Bỏ qua nó nghĩa là lần sửa tiếp theo vẫn không có lưới bảo vệ nào.",
          ending: "bad",
        },
        c: {
          text: "Kiểm thử mới phát hiện hai trường hợp sai, và bạn sửa xong. Hôm sau một kiểm thử cũ lúc xanh lúc đỏ khiến cả đội phải chạy lại mỗi lần. Bạn xử lý thế nào?",
          choices: [
            { label: "Cứ chạy lại cho đến khi xanh, vì nó đỏ không thường xuyên", next: "bad-chay-lai" },
            { label: "Tạm tắt nó đi và ghi chú sửa sau khi rảnh", next: "bad-tat" },
            { label: "Tìm nguyên nhân gây chập chờn và sửa ngay", next: "good" },
          ],
        },
        "bad-chay-lai": {
          text: "Cả đội học cách chạy lại mỗi khi đỏ. Vài tuần sau, một kiểm thử đỏ thật vì có lỗi mới, và phản xạ đầu tiên của mọi người vẫn là bấm chạy lại rồi bỏ qua.",
          ending: "bad",
        },
        "bad-tat": {
          text: "Ghi chú sửa sau không có người nhận và không có ngày. Kiểm thử bị tắt chính là một kiểm thử bảo vệ phần mã dùng thời gian, nơi lỗi hay xuất hiện nhất, và chẳng còn gì canh nó nữa.",
          ending: "bad",
        },
        good: {
          text: "Nguyên nhân là kiểm thử phụ thuộc đồng hồ hệ thống. Bạn cố định thời gian trong kiểm thử và màu xanh trở nên đáng tin. Bạn cũng thêm một kiểm thử tái hiện lỗi tuần trước, để nó không quay lại.",
          ending: "good",
        },
      },
    },
  ],

  "khi-ca-doi-dong-y-qua-nhanh": [
    {
      type: "scenario",
      title: "Cả buổi họp gật đầu trong ba phút",
      start: "a",
      nodes: {
        a: {
          text: "Trong buổi họp, trưởng nhóm đề xuất chuyển cả hệ thống sang một cơ sở dữ liệu mới. Ba người đồng ý ngay, không ai hỏi gì. Bạn có chút băn khoăn mà chưa nói được thành lời. Bạn làm gì?",
          choices: [
            { label: "Im lặng vì cả nhóm đồng ý rồi, chắc mình thiếu thông tin", next: "bad-im" },
            { label: "Hỏi nhóm: trong điều kiện nào thì phương án này sẽ hỏng?", next: "b" },
            { label: "Phản đối thẳng rằng đây là quyết định vội vàng", next: "bad-thang" },
          ],
        },
        "bad-im": {
          text: "Người thứ tư, thứ năm cũng nghĩ giống bạn và cũng im lặng. Quyết định được thông qua, và hai tháng sau cả nhóm mới phát hiện công cụ báo cáo hiện có không chạy được trên cơ sở dữ liệu mới.",
          ending: "bad",
        },
        "bad-thang": {
          text: "Cả phòng chuyển sang thế phòng thủ. Cuộc tranh luận xoay quanh việc bạn có công kích trưởng nhóm không, chứ không xoay quanh phương án, và băn khoăn cụ thể của bạn không bao giờ được nêu ra.",
          ending: "bad",
        },
        b: {
          text: "Không ai trả lời ngay. Một người nói tải ghi lớn có thể là vấn đề, rồi mọi người lại im. Trưởng nhóm hỏi liệu có nên tiếp tục không. Bạn đáp thế nào?",
          choices: [
            { label: "Cứ tiếp tục, vì chỉ có một mối lo thôi", next: "bad-tiep" },
            { label: "Mỗi người ghi riêng điều kiện hỏng rồi mới trao đổi chung", next: "good" },
            { label: "Biểu quyết giơ tay xem ai đồng ý", next: "bad-bieu-quyet" },
          ],
        },
        "bad-tiep": {
          text: "Lo ngại về tải ghi bị gạt đi vì chỉ một người nêu, rồi những người khác không dám bổ sung. Nó trở thành sự cố đầu tiên sau khi chuyển, đúng chỗ đã được nhắc.",
          ending: "bad",
        },
        "bad-bieu-quyet": {
          text: "Người giơ tay sau cùng nhìn xung quanh rồi giơ theo. Biểu quyết công khai chỉ đo ai dám đi ngược, và kết quả đồng thuận giả vẫn mang vẻ chắc chắn như cũ.",
          ending: "bad",
        },
        good: {
          text: "Khi ghi riêng, bốn người nêu ra bốn điều kiện khác nhau, kể cả vụ công cụ báo cáo mà trước đó không ai nói. Đội quyết định thử nghiệm ở một dịch vụ nhỏ trước, và sự bất đồng được nêu sớm đã rẻ hơn nhiều so với sau khi chuyển xong.",
          ending: "good",
        },
      },
    },
  ],

  "ghi-ngay-hay-ghi-theo-lo-va-do-tre-du-lieu": [
    {
      type: "scenario",
      title: "Hai báo cáo, hai con số doanh thu",
      start: "a",
      nodes: {
        a: {
          text: "Bảng điều khiển của đội kinh doanh ghi doanh thu hôm nay là 120 triệu, còn báo cáo của đội tài chính cùng lúc lại ghi 112 triệu. (Số minh hoạ.) Hai đội nghi nhau tính sai. Bạn làm gì?",
          choices: [
            { label: "Kiểm tra công thức của từng báo cáo xem ai tính sai", next: "bad-cong-thuc" },
            { label: "Hỏi mỗi con số được cập nhật tới thời điểm nào", next: "b" },
            { label: "Bắt hai đội dùng chung một báo cáo từ nay về sau", next: "bad-chung" },
          ],
        },
        "bad-cong-thuc": {
          text: "Cả hai công thức đều đúng. Bạn mất nửa ngày để chứng minh điều đó, trong khi chênh lệch chỉ là vì một bên đọc dữ liệu ghi ngay, bên kia đọc dữ liệu đã gom lô lúc rạng sáng.",
          ending: "bad",
        },
        "bad-chung": {
          text: "Một báo cáo duy nhất làm đội kinh doanh mất số liệu gần thời gian thực mà họ cần để theo dõi chiến dịch. Bạn vừa xoá sự khác biệt mà không hiểu vì sao nó có, nên họ lặng lẽ dựng lại báo cáo riêng.",
          ending: "bad",
        },
        b: {
          text: "Bảng điều khiển ghi ngay, còn báo cáo tài chính chạy theo lô mỗi đêm nên chỉ có số liệu tới 00:00. Giờ đội muốn thêm một chức năng kiểm tra số dư trước khi cho giao dịch đi. Bạn chọn nguồn nào?",
          choices: [
            { label: "Báo cáo theo lô, vì nó là số liệu đã được đối soát", next: "bad-lo" },
            { label: "Đường ghi ngay, vì quyết định dựa trên giá trị mới nhất", next: "c" },
            { label: "Cả hai và so khớp kết quả rồi lấy số nhỏ hơn", next: "bad-ca-hai" },
          ],
        },
        "bad-lo": {
          text: "Một khách rút tiền hai lần trong cùng ngày vì số dư theo lô chưa phản ánh lần rút đầu. Quyết định dựa trên dữ liệu cũ cho phép giao dịch vượt số dư.",
          ending: "bad",
        },
        "bad-ca-hai": {
          text: "Hai nguồn lệch nhau vì độ trễ, và lấy số nhỏ hơn làm giao dịch hợp lệ bị từ chối ngẫu nhiên. Không ai biết nguồn nào chuẩn, nên khách phàn nàn mà đội không giải thích được.",
          ending: "bad",
        },
        c: {
          text: "Chức năng chạy đúng. Nhưng giờ hệ thống có hai đường chạy song song và thỉnh thoảng hai con số vẫn lệch. Quản lý hỏi cách giải quyết lâu dài. Bạn đề xuất gì?",
          choices: [
            { label: "Làm cho hai đường khớp nhau tuyệt đối", next: "bad-khop" },
            { label: "Tuyên bố một đường là nguồn chuẩn và ghi rõ số liệu tính tới lúc nào", next: "good" },
            { label: "Bỏ đường theo lô để chỉ còn một đường", next: "bad-bo-lo" },
          ],
        },
        "bad-khop": {
          text: "Độ trễ khiến việc khớp tuyệt đối không bao giờ đạt được. Đội mất hai tháng cho mục tiêu bất khả và hai báo cáo vẫn lệch nhau mỗi ngày, chỉ khác là giờ có thêm một kho mã đồng bộ cần bảo trì.",
          ending: "bad",
        },
        "bad-bo-lo": {
          text: "Ghi ngay cho mọi thứ đắt hơn hàng chục lần, vì chi phí cố định mỗi lượt ghi không còn được chia đều theo lô. Hoá đơn tăng mạnh để phục vụ cả báo cáo không cần số liệu từng giây.",
          ending: "bad",
        },
        good: {
          text: "Đội tài chính được chỉ định là nguồn chuẩn, mỗi báo cáo có dòng ghi rõ số liệu tính tới thời điểm nào. Lần sau con số lệch nhau, ai nhìn dòng đó cũng hiểu trong năm phút thay vì tranh cãi nửa ngày.",
          ending: "good",
        },
      },
    },
  ],

  "chien-luoc-do-luong-xu-huong-va-hoi-quy-trung-binh": [
    {
      type: "scenario",
      title: "Ngưỡng cảnh báo khớp hoàn hảo với năm ngoái",
      start: "a",
      nodes: {
        a: {
          text: "Bạn thử nhiều ngưỡng độ trễ trên dữ liệu năm ngoái và tìm được một ngưỡng báo trước đúng cả chín sự cố, không báo nhầm lần nào. Bạn định đưa nó vào hệ thống cảnh báo. Việc đầu tiên bạn làm là gì?",
          choices: [
            { label: "Đưa vào ngay, vì khớp hoàn hảo là bằng chứng tốt nhất", next: "bad-dua-vao" },
            { label: "Thử nó trên dữ liệu mà bạn chưa từng dùng để tìm ra ngưỡng", next: "b" },
            { label: "Thử thêm vài ngưỡng nữa cho tới khi có cái khớp hơn", next: "bad-thu-them" },
          ],
        },
        "bad-dua-vao": {
          text: "Tháng đầu tiên ngưỡng báo nhầm mười một lần và bỏ lỡ sự cố thật duy nhất. Thử đủ nhiều ngưỡng thì luôn có cái khớp hoàn hảo trên dữ liệu cũ, kể cả khi dữ liệu là nhiễu.",
          ending: "bad",
        },
        "bad-thu-them": {
          text: "Càng thử nhiều ngưỡng, bạn càng chắc chắn tìm ra một cái khớp, vì thế khớp hơn cũng là dấu hiệu bám nhiễu hơn. Bạn đang làm xấu đi chính cái mình muốn cải thiện.",
          ending: "bad",
        },
        b: {
          text: "Bạn quyết định chia dữ liệu. Có hai cách: xáo ngẫu nhiên rồi chia, hoặc để các tháng cũ làm dữ liệu tìm quy tắc và các tháng mới nhất làm dữ liệu kiểm. Bạn chọn cách nào?",
          choices: [
            { label: "Xáo ngẫu nhiên rồi chia, để cả hai phần giống nhau", next: "bad-xao" },
            { label: "Chia theo thời gian, tháng cũ để tìm và tháng mới để kiểm", next: "c" },
            { label: "Dùng toàn bộ dữ liệu cho cả hai việc để có nhiều mẫu hơn", next: "bad-toan-bo" },
          ],
        },
        "bad-xao": {
          text: "Xáo ngẫu nhiên đưa các ngày kề nhau vào cả hai phần, nên quy tắc thực chất đã nhìn thấy tương lai của chính nó. Kết quả kiểm đẹp, nhưng ngoài đời nó không đứng vững.",
          ending: "bad",
        },
        "bad-toan-bo": {
          text: "Không còn phần nào chưa từng thấy để kiểm. Mức khớp trên chính dữ liệu đã dùng để tìm ra quy tắc không mang thông tin nào, nên bạn chỉ đo lại điều mình đã biết.",
          ending: "bad",
        },
        c: {
          text: "Trên phần kiểm, ngưỡng bắt được sáu trên chín sự cố, kèm vài lần báo nhầm. Kết quả chưa đẹp như bạn mong. Bạn chỉnh lại ngưỡng và định chạy phần kiểm một lần nữa. Bạn làm gì?",
          choices: [
            { label: "Chỉnh ngưỡng rồi chạy lại đúng phần kiểm đó", next: "bad-chay-lai" },
            { label: "Dùng ngay ngưỡng ban đầu và coi như kết quả kiểm là kết quả cuối", next: "bad-dung-luon" },
            { label: "Chỉnh theo phần tìm, rồi thử trên dữ liệu mới của tháng tiếp theo", next: "good" },
          ],
        },
        "bad-chay-lai": {
          text: "Phần kiểm giờ đã ảnh hưởng tới quy tắc, nên không còn là dữ liệu chưa từng thấy. Con số mới đẹp hơn nhưng nó đã bị dùng một lần để tinh chỉnh, và niềm tin vào nó không còn cơ sở.",
          ending: "bad",
        },
        "bad-dung-luon": {
          text: "Sáu trên chín là kết quả thật, nhưng bạn bỏ qua cơ hội cải thiện bằng cách sạch. Ngưỡng ban đầu không tệ, chỉ là đội mất một dịp để làm cho nó tốt hơn mà vẫn giữ được phép kiểm.",
          ending: "bad",
        },
        good: {
          text: "Phần kiểm cũ được giữ nguyên để so sánh và dữ liệu tháng mới đóng vai kiểm mới. Ngưỡng đơn giản hơn bắt được bảy trên mười hai sự cố ngoài mẫu. Con số khiêm tốn hơn mức khớp hoàn hảo ban đầu, nhưng đây mới là con số bạn có thể tin.",
          ending: "good",
        },
      },
    },
  ],
};
