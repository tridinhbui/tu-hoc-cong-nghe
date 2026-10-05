import type { LessonSectionBlock } from "../lesson-types";

// Khối mô phỏng (sim | aiLab | scenario) cho bài còn thiếu - đợt r04. Một người viết cho một tệp.
export const R04_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "kiem-chung-truoc-khi-xay": [
    {
      type: "scenario",
      title: "Ý tưởng công cụ báo cáo tự động",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Bạn nghĩ ra một công cụ tự gom số liệu bán hàng thành báo cáo tuần cho các trưởng nhóm. Cả đội hào hứng, quản lý hỏi bao giờ bắt đầu. Ba tháng công sức là có thật, còn bằng chứng có người cần thì chưa có gì ngoài cảm giác. Bạn làm gì trước?",
          choices: [
            { label: "Gom đội, bắt tay dựng bản đầu tiên ngay", next: "xay-ngay" },
            { label: "Hỏi năm trưởng nhóm xem họ ý kiến ra sao", next: "hoi-y-kien" },
            { label: "Xem tuần qua họ tự làm báo cáo thế nào", next: "xem-viec-that" },
          ],
        },
        "xay-ngay": {
          text: "Ba tháng sau công cụ ra mắt, chạy tốt và đẹp. Nhưng các trưởng nhóm vẫn mở bảng tính cũ mỗi sáng thứ Hai, vì bảng đó chứa những cột họ tự thêm mà công cụ không có. Không ai ghét công cụ, chỉ là không ai cần nó đủ để đổi thói quen.",
          ending: "bad",
        },
        "hoi-y-kien": {
          text: "Cả năm người đều nói nghe hay đấy, chắc sẽ tiện. Bạn có năm lời khen và không có thêm hiểu biết nào, vì khen một ý tưởng không tốn họ gì. Bạn cần một thứ nặng hơn lời nói. Bước tiếp theo?",
          choices: [
            { label: "Coi năm lời khen là đủ rồi bắt đầu xây", next: "xay-ngay" },
            { label: "Hỏi lại họ đã tự xoay xở việc này ra sao", next: "xem-viec-that" },
          ],
        },
        "xem-viec-that": {
          text: "Bạn xin xem bảng tính họ đang dùng. Ba trong năm người mất gần nửa buổi sáng thứ Hai để ghép số, và một người đã nhờ nhân viên viết hộ một macro. Đó là dấu vết của việc tự xoay xở, loại bằng chứng nặng hơn lời khen. Bạn nên làm gì tiếp?",
          choices: [
            { label: "Xây luôn đủ chức năng cho cả năm người", next: "xay-het" },
            { label: "Làm bản thô thay đúng bước ghép số, cho hai người dùng thử", next: "ban-tho" },
          ],
        },
        "xay-het": {
          text: "Bạn có bằng chứng tốt nhưng vẫn đặt cược cả ba tháng vào một phỏng đoán về chi tiết. Cuối cùng công cụ đúng hướng, song thiếu cột mà người thứ tư luôn cần, và phải sửa lại hai tháng. Vẫn ổn hơn lúc đầu, nhưng chưa rẻ bằng cách còn lại.",
          ending: "bad",
        },
        "ban-tho": {
          text: "Chỉ sau hai tuần, hai người dùng thử bản thô, và một người nói ngay cột nào thiếu. Bạn biết mình nên xây gì trước khi bỏ ba tháng, và có hai người sẵn sàng dùng thật. Thông tin mua bằng hai tuần rẻ hơn nhiều so với phát hiện sau ba tháng.",
          ending: "good",
        },
      },
    },
  ],

  "he-thong-lon-khac-he-thong-nho": [
    {
      type: "scenario",
      title: "Đội từ năm lên hai mươi người",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Công ty vừa gọi vốn, đội của bạn sắp từ năm lên hai mươi người trong sáu tháng. Cách làm cũ, cả đội họp sáng, ai cũng sửa mọi nơi, đang chạy rất tốt. Quản lý hỏi bạn cần chuẩn bị gì. Bạn đề xuất gì?",
          choices: [
            { label: "Giữ nguyên, người mới sẽ tự học cách làm", next: "giu-nguyen" },
            { label: "Họp thường xuyên hơn để ai cũng nắm tình hình", next: "hop-nhieu" },
            { label: "Chia vùng việc rõ ràng trước khi người mới vào", next: "chia-vung" },
          ],
        },
        "giu-nguyen": {
          text: "Năm người có mười cặp trao đổi, hai mươi người có một trăm chín mươi cặp. Sau hai tháng, hai nhóm cùng sửa một module mà không biết nhau, và một lần triển khai ghi đè thay đổi của người khác. Cách làm cũ không hỏng, chỉ là hết đúng ở quy mô mới.",
          ending: "bad",
        },
        "hop-nhieu": {
          text: "Cuộc họp sáng kéo từ mười lăm phút lên bốn mươi phút, rồi người mới im lặng vì không dám chen vào giữa hai mươi người. Cuộc họp tăng theo quy mô nhưng không thêm được hiểu biết chung. Bạn vẫn cần làm gì đó cho số đường liên lạc?",
          choices: [
            { label: "Họp thêm một buổi chiều cho mỗi nhóm nhỏ", next: "hop-nhom" },
            { label: "Chia vùng việc để giảm số cặp phải trao đổi", next: "chia-vung" },
          ],
        },
        "hop-nhom": {
          text: "Giờ có thêm họp chiều, mà ai cũng vẫn phải biết chuyện của mọi nơi. Năng lực làm việc tăng bốn lần còn số cuộc họp tăng cả chục lần, nên cuối quý đội bạn dành hơn nửa tuần để họp và ít còn thời gian viết mã.",
          ending: "bad",
        },
        "chia-vung": {
          text: "Bạn chia mã thành ba vùng, mỗi vùng có một chủ rõ ràng và một nhóm sáu bảy người. Nhưng ba vùng vẫn cần dùng chung một số thứ. Bạn xử lý chỗ giao nhau thế nào?",
          choices: [
            { label: "Nhờ mọi người tự nhắn nhau khi cần", next: "tu-nhan" },
            { label: "Ghi rõ vùng nào cung cấp gì cho vùng nào", next: "ghi-ro" },
          ],
        },
        "tu-nhan": {
          text: "Ba tháng đầu mọi việc ổn vì ai cũng nhớ. Rồi người trực của vùng thứ hai nghỉ phép, tin nhắn bị trôi, và một thay đổi giao diện làm hỏng vùng ba mà không ai biết cho tới khi khách báo lỗi. Ranh giới có, nhưng chỗ giao nhau chưa ai sở hữu.",
          ending: "bad",
        },
        "ghi-ro": {
          text: "Mỗi vùng có một trang ngắn nêu thứ nó cung cấp và ai chịu trách nhiệm. Người mới biết hỏi ai, thay đổi nhỏ không phải qua cả hai mươi người. Số đường liên lạc thực sự cần dùng giảm mạnh dù số người vẫn tăng bốn lần.",
          ending: "good",
        },
      },
    },
  ],

  "ranh-gioi-va-quyen-so-huu": [
    {
      type: "scenario",
      title: "Mười tính năng cùng chạm bốn nơi",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Đội bạn chia theo tầng: một nhóm giao diện, một nhóm máy chủ, một nhóm cơ sở dữ liệu. Nhìn lại mười tính năng gần nhất, tính năng nào cũng cần cả ba nhóm sửa và phải chờ nhau. Ai đó đề nghị cải tổ. Bạn nói gì?",
          choices: [
            { label: "Họp hằng ngày giữa ba nhóm để chờ ít đi", next: "hop-ngay" },
            { label: "Chia lại theo miền nghiệp vụ như thanh toán, đơn hàng", next: "chia-mien" },
            { label: "Cho mọi người sửa được mọi tầng để khỏi chờ", next: "ai-cung-sua" },
          ],
        },
        "hop-ngay": {
          text: "Chờ đợi vẫn còn, chỉ là giờ có mặt để than. Đường cắt vẫn đặt vuông góc với hướng công việc, nên mỗi tính năng vẫn phải đi xuyên cả ba nhóm. Họp không đổi chuyện đó, nó chỉ làm chi phí phối hợp trông có vẻ được quản lý.",
          ending: "bad",
        },
        "ai-cung-sua": {
          text: "Tốc độ tăng vài tuần đầu. Rồi vùng cơ sở dữ liệu nhận hàng chục thay đổi nhỏ từ những người khác nhau, mỗi cái vừa đủ cho việc của người sửa. Sáu tháng sau không ai dám động vào nó vì không ai còn nắm toàn cảnh.",
          ending: "bad",
        },
        "chia-mien": {
          text: "Bạn đề xuất nhóm Thanh toán, nhóm Đơn hàng, mỗi nhóm có đủ người cho giao diện, máy chủ và dữ liệu của miền mình. Quản lý hỏi: bảng khách hàng cả hai nhóm đều dùng, ai là chủ?",
          choices: [
            { label: "Để cả hai nhóm cùng sửa cho linh hoạt", next: "chung-chu" },
            { label: "Chọn một nhóm làm chủ, nhóm kia gọi qua giao diện", next: "mot-chu" },
          ],
        },
        "chung-chu": {
          text: "Hai nhóm đều sửa bảng khách hàng, và một lần đổi định dạng số điện thoại của nhóm này làm hỏng báo cáo của nhóm kia. Vùng có hai chủ thực ra không có chủ, và mọi lỗi trở thành chuyện của nhau.",
          ending: "bad",
        },
        "mot-chu": {
          text: "Nhóm Đơn hàng làm chủ bảng khách hàng, nhóm Thanh toán xin thay đổi qua giao diện. Nghe chậm hơn một chút ở chỗ giao nhau, nhưng mười tính năng tiếp theo chỉ có hai tính năng phải vượt ranh giới. Đường cắt đã đi cùng hướng với công việc.",
          ending: "good",
        },
      },
    },
  ],

  "hop-dong-giua-cac-doi": [
    {
      type: "scenario",
      title: "Đổi tên một trường dữ liệu",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Đội Hồ sơ của bạn muốn đổi trường \"ho_ten\" thành \"ten_day_du\" trong dữ liệu trả về. Đội Thông báo ngồi bàn bên cạnh, hôm qua còn ăn trưa cùng nhau, và bạn biết họ đang dùng trường này. Bạn làm gì?",
          choices: [
            { label: "Nhắn họ một câu rồi đổi luôn", next: "nhan-roi-doi" },
            { label: "Chạy bộ kiểm hợp đồng trước khi đổi", next: "chay-kiem" },
            { label: "Đổi luôn, họ giỏi thì tự sửa kịp", next: "doi-luon" },
          ],
        },
        "nhan-roi-doi": {
          text: "Người đọc tin nhắn là một bạn đang bận, thả biểu tượng ngón tay cái rồi quên. Tuần sau đổi tên có hiệu lực và mọi thư thông báo gửi đi với lời chào \"Chào undefined\". Tin nhắn đó không ai kiểm được là đã thực sự được xử lý.",
          ending: "bad",
        },
        "doi-luon": {
          text: "Mười phút sau khi triển khai, đội Thông báo phát hiện thư lỗi từ khách hàng. Họ không sai, và bạn cũng không cố ý, vì hợp đồng chưa bao giờ ghi trường nào là bắt buộc. Cả hai đội mất nửa ngày điều tra điều lẽ ra máy có thể báo trong vài giây.",
          ending: "bad",
        },
        "chay-kiem": {
          text: "Bộ kiểm báo đỏ: thay đổi làm hỏng một yêu cầu mà đội Thông báo đã khai báo là dựa vào. Bạn chưa cần đoán ai đúng ai sai, chỉ cần quyết định cách đi tiếp.",
          choices: [
            { label: "Tắt bài kiểm đó để triển khai kịp lịch", next: "tat-kiem" },
            { label: "Trả cả hai tên song song, báo họ chuyển dần", next: "song-song" },
          ],
        },
        "tat-kiem": {
          text: "Bộ kiểm xanh, nhưng chỉ vì bạn đã gỡ phần quan trọng nhất của nó. Lần này lỗi lọt thẳng ra khách hàng và lần sau không ai còn tin bộ kiểm vì đã có tiền lệ tắt khi vướng.",
          ending: "bad",
        },
        "song-song": {
          text: "Bản mới trả cả ho_ten lẫn ten_day_du. Đội Thông báo chuyển sang tên mới theo nhịp của họ, bộ kiểm báo xanh liên tục, và hai tuần sau bạn gỡ tên cũ khi chính bộ kiểm xác nhận không ai còn dùng. Lời hứa được giữ vì có cỗ máy kiểm nó.",
          ending: "good",
        },
      },
    },
  ],

  "doi-nen-tang-noi-bo": [
    {
      type: "scenario",
      title: "Đội nền tảng bị các đội né tránh",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Bạn dẫn đội nền tảng nội bộ. Quý này tỷ lệ tuân thủ chuẩn chung đạt chín mươi phần trăm, nhưng ở buổi trò chuyện, hai trưởng đội thở dài khi nhắc tên nền tảng. Họ vẫn dùng vì bị yêu cầu. Bạn phản ứng ra sao?",
          choices: [
            { label: "Yên tâm vì con số tuân thủ rất cao", next: "yen-tam" },
            { label: "Đo thời gian đội mới dựng được dịch vụ đầu tiên", next: "do-thoi-gian" },
            { label: "Ép các đội còn lại dùng cho bằng hết", next: "ep-dung" },
          ],
        },
        "yen-tam": {
          text: "Tỷ lệ tuân thủ đo việc bị buộc phải dùng chứ không đo việc có muốn dùng. Sáu tháng sau, hai đội âm thầm dựng bản sao riêng của nền tảng, và đội bạn chỉ phát hiện ra khi họ xin cấp quyền cho một công cụ lạ.",
          ending: "bad",
        },
        "ep-dung": {
          text: "Chín mươi lăm phần trăm tuân thủ, và hàng đợi yêu cầu dài ra vì giờ mọi đội cùng xếp hàng vào một đội. Người dùng bị buộc mua không có cách nào nói không, nên mọi bực bội chuyển thành việc chờ lâu hơn.",
          ending: "bad",
        },
        "do-thoi-gian": {
          text: "Con số làm bạn giật mình: đội mới cần chín ngày để dựng dịch vụ đầu tiên, phần lớn thời gian nằm chờ yêu cầu được duyệt. Bạn có hai hướng cải thiện.",
          choices: [
            { label: "Thuê thêm người để xử lý hàng đợi nhanh hơn", next: "them-nguoi" },
            { label: "Cho các đội tự phục vụ phần chuẩn, qua một mẫu sẵn", next: "tu-phuc-vu" },
          ],
        },
        "them-nguoi": {
          text: "Hàng đợi ngắn đi một thời gian, rồi các đội tăng yêu cầu lên vì giờ xin dễ hơn. Chi phí đội nền tảng tăng đều còn thời gian chờ chỉ giảm chút ít. Bạn đang mở rộng nút thắt thay vì gỡ nó.",
          ending: "bad",
        },
        "tu-phuc-vu": {
          text: "Các đội dựng dịch vụ từ mẫu sẵn trong một buổi chiều, và ai cần ngoại lệ thì có đường thoát công khai để bạn nhìn thấy. Thời gian dựng giảm từ chín ngày xuống dưới một ngày, và trong buổi khảo sát sau đó, đa số nói họ vẫn chọn dùng nếu được chọn lại.",
          ending: "good",
        },
      },
    },
  ],

  "du-lieu-dung-chung-giua-cac-doi": [
    {
      type: "scenario",
      title: "Mười hai đội đọc thẳng một bảng",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Bảng \"khach_hang\" có cột \"sdt\" bạn muốn đổi thành \"so_dien_thoai\". Khi tra cứu, bạn thấy mười hai đội khác nhau cùng đọc thẳng bảng này, vài đội còn ghi. Sơ đồ kiến trúc vẫn vẽ mỗi đội một hộp riêng. Bạn xử lý thế nào?",
          choices: [
            { label: "Đổi tên cột, ai lỗi thì tự sửa", next: "doi-luon" },
            { label: "Bỏ ý định, giữ tên cũ mãi mãi", next: "bo-y" },
            { label: "Lập bản sao dành cho đọc và đưa mọi người sang", next: "ban-sao" },
          ],
        },
        "doi-luon": {
          text: "Ba đội hỏng ngay trong đêm, hai đội khác hỏng ở lần chạy báo cáo cuối tháng mà không ai nhớ có tồn tại. Thay đổi một cột chạm mười hai đội, và không đội nào được báo trước vì không ai biết hết danh sách người đọc.",
          ending: "bad",
        },
        "bo-y": {
          text: "Tên cột giữ nguyên, nhưng cũng chẳng ai dám sửa thêm cột nào khác, vì không biết ai đang phụ thuộc. Đây là nợ tích tụ dễ dàng nhất: lợi ích của việc đọc thẳng thuộc về hôm nay, chi phí di trú rơi vào người ba năm sau.",
          ending: "bad",
        },
        "ban-sao": {
          text: "Bạn dựng một bản dành cho đọc, với giao diện ổn định, và giữ bảng gốc chỉ cho đội sở hữu. Việc di trú sẽ kéo dài vì mười hai đội cần chuyển. Bạn bắt đầu từ đâu?",
          choices: [
            { label: "Chuyển cả mười hai đội trong một tuần", next: "chuyen-het" },
            { label: "Chuyển từng đội, đo ai còn đọc bảng gốc", next: "chuyen-dan" },
          ],
        },
        "chuyen-het": {
          text: "Lịch quá dày. Một đội đang bận ra mắt sản phẩm bỏ qua, hai đội chuyển vội và đọc sai cột. Bạn phải giữ bảng gốc thêm vô thời hạn, và giờ có cả hai nguồn sự thật trong cùng lúc.",
          ending: "bad",
        },
        "chuyen-dan": {
          text: "Bạn theo dõi truy cập vào bảng gốc, nhắn riêng từng đội còn đọc và hỗ trợ họ chuyển. Sau hai tháng không còn ai đọc thẳng, và bạn đổi tên cột chỉ trong bản gốc mà không ai hay. Ranh giới trên sơ đồ nay đã đúng với thực tế.",
          ending: "good",
        },
      },
    },
  ],

  "su-kien-giua-cac-doi": [
    {
      type: "scenario",
      title: "Phát sự kiện khi đơn hàng được tạo",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Đội Đơn hàng cần báo cho các đội khác khi có đơn mới. Bạn thiết kế sự kiện sẽ phát lên bảng tin chung. Đặt tên và nội dung sự kiện thế nào?",
          choices: [
            { label: "GuiEmailXacNhan, nội dung gồm địa chỉ người nhận", next: "menh-lenh" },
            { label: "DonHangDaDuocTao, nội dung gồm mã và các dòng hàng", next: "su-that" },
            { label: "CapNhatKhoNgay, nội dung gồm số lượng cần trừ", next: "menh-lenh-kho" },
          ],
        },
        "menh-lenh": {
          text: "Tên sự kiện là một lệnh gửi riêng cho đội Thông báo. Khi đội Phân tích muốn biết đơn mới, họ phải nghe một sự kiện tên là gửi email, và đội Đơn hàng phải tạo thêm sự kiện thứ hai. Bạn đang điều khiển người nghe thay vì kể lại điều đã xảy ra.",
          ending: "bad",
        },
        "menh-lenh-kho": {
          text: "Sự kiện chỉ phục vụ đội Kho, và nếu đội Kho đổi cách đếm thì đội Đơn hàng cũng phải sửa theo. Tên là mệnh lệnh nên người nghe nào ngoài Kho đều khó dùng, và ranh giới giữa hai đội thực ra vẫn dính.",
          ending: "bad",
        },
        "su-that": {
          text: "Ba đội đăng ký nghe: Thông báo, Kho, Phân tích. Sáu tuần sau bạn muốn đổi trường \"khach\" thành \"khach_hang\". Bạn làm gì?",
          choices: [
            { label: "Đổi tên luôn, bên nghe tự cập nhật", next: "doi-ten" },
            { label: "Phát cả hai dạng một thời gian, rồi bỏ dạng cũ", next: "phat-song-song" },
          ],
        },
        "doi-ten": {
          text: "Bên nghe cũ không còn thấy trường \"khach\" và âm thầm xử lý đơn thiếu khách. Sự kiện cũng là hợp đồng: đổi tên hay bỏ trường mà không có giai đoạn chuyển tiếp là phá hợp đồng, dù mã của bạn rất sạch.",
          ending: "bad",
        },
        "phat-song-song": {
          text: "Trong sáu tuần, sự kiện mang cả hai trường. Mỗi đội đổi sang tên mới theo lịch riêng, và bạn gỡ trường cũ khi không còn ai nghe nó. Không ai phải triển khai cùng giờ, và sự kiện vẫn kể được chuyện đã xảy ra cho bất kỳ ai quan tâm.",
          ending: "good",
        },
      },
    },
  ],

  "phoi-hop-trien-khai-nhieu-doi": [
    {
      type: "scenario",
      title: "Hai đội phải ra mắt cùng giờ",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Đội A đổi định dạng ngày trong dữ liệu gửi sang đội B. Bản mới của B chỉ hiểu định dạng mới, bản cũ của A chỉ gửi định dạng cũ. Hai bên đặt lịch triển khai cùng hai giờ sáng thứ Bảy. Bạn là người điều phối. Bạn làm gì?",
          choices: [
            { label: "Giữ lịch hai giờ sáng, cả hai đội trực", next: "trien-khai-cung" },
            { label: "Cho bản mới của B hiểu cả hai định dạng trước", next: "hieu-ca-hai" },
            { label: "Dời lịch sang thứ Hai, lúc đông người", next: "doi-lich" },
          ],
        },
        "trien-khai-cung": {
          text: "Triển khai A xong, B chậm mười phút vì mạng. Mười phút đó mọi yêu cầu đều lỗi. Rồi sự cố thật tới: đội B phải lui lại, nhưng lui riêng một bên chỉ tạo ra đúng trạng thái không tương thích bạn muốn tránh, và cả hai đội lui cùng lúc giữa đêm.",
          ending: "bad",
        },
        "doi-lich": {
          text: "Thứ Hai đông người hơn, nhưng cũng nghĩa là nhiều khách hàng hơn chịu ảnh hưởng nếu lỗi. Việc phối hợp vẫn còn nguyên, chỉ đổi từ ban đêm sang ban ngày. Lúc này bạn vẫn có thể giảm sự phụ thuộc nhưng chưa làm.",
          choices: [
            { label: "Giữ cách cũ, triển khai cùng giờ vào thứ Hai", next: "trien-khai-cung" },
            { label: "Cho B hiểu cả hai định dạng trước khi triển khai", next: "hieu-ca-hai" },
          ],
        },
        "hieu-ca-hai": {
          text: "Bản mới của B chạy được với cả định dạng cũ lẫn mới. B triển khai thứ Tư, A triển khai thứ Sáu, thứ tự không còn quan trọng. Bạn cần quyết định về việc xử lý sau cùng.",
          choices: [
            { label: "Bỏ nhánh định dạng cũ ngay khi A xong", next: "bo-ngay" },
            { label: "Bỏ nhánh cũ sau khi xác nhận không còn gì gửi nó", next: "bo-sau" },
          ],
        },
        "bo-ngay": {
          text: "Một công việc định kỳ của đội thứ ba vẫn gửi định dạng cũ và bắt đầu lỗi âm thầm. Bạn đã giữ được đường đi không phối hợp nhưng gỡ đường lui hơi sớm, nên phải mất một ngày mới tìm ra nguồn.",
          ending: "bad",
        },
        "bo-sau": {
          text: "Bạn kiểm tra nhật ký, thấy vẫn còn một công việc định kỳ gửi dạng cũ, và nhắc đội đó đổi. Sau khi không còn gì gửi nữa, nhánh cũ mới được gỡ. Không ai phải thức đêm, và nếu có lỗi, mỗi đội lui riêng được mà không phá đội khác.",
          ending: "good",
        },
      },
    },
  ],

  "duong-gang-va-phu-thuoc-noi-tiep": [
    {
      type: "scenario",
      title: "Sáu tuần-người, ba đội, hạn hai tuần",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Tính năng mới cần ba phần nối tiếp nhau: dữ liệu, giao diện lập trình, màn hình. Mỗi phần hai tuần-người, ba đội, ba người. Quản lý nói: sáu chia ba, hai tuần là xong. Bạn nhận thấy ngay một vấn đề với phép chia đó. Bạn trả lời gì?",
          choices: [
            { label: "Đồng ý, chia đều và theo dõi tiến độ", next: "dong-y" },
            { label: "Giải thích phép cộng chỉ đúng khi các phần độc lập", next: "giai-thich" },
            { label: "Xin thêm người để nhanh hơn", next: "them-nguoi" },
          ],
        },
        "dong-y": {
          text: "Đội dữ liệu xong sau hai tuần, giao diện lập trình mất thêm hai, màn hình thêm hai nữa. Kế hoạch trễ gấp ba mà không ai làm sai việc nào, và đội cuối cùng, sát ngày hẹn, là đội phải gánh trễ.",
          ending: "bad",
        },
        "them-nguoi": {
          text: "Công ty thêm hai người vào đội cuối. Họ không thể bắt đầu vì phần trước chưa xong. Thêm người vào một chuỗi nối tiếp không rút ngắn được chuỗi, nó chỉ tăng chi phí.",
          ending: "bad",
        },
        "giai-thich": {
          text: "Quản lý đồng ý nhìn lại kế hoạch. Chuỗi nối tiếp thành sáu tuần, đội sau chờ vì chưa biết hình dạng thứ mình sẽ nhận. Bạn đề xuất cắt chuỗi như thế nào?",
          choices: [
            { label: "Bắt các đội làm tăng ca để nối nhanh hơn", next: "tang-ca" },
            { label: "Chốt trước hình dạng giao diện để làm song song", next: "chot-hop-dong" },
          ],
        },
        "tang-ca": {
          text: "Mỗi đội cố rút từ hai tuần xuống mười ngày, tổng chuỗi còn năm tuần rưỡi. Mọi người kiệt sức, và một tuần trễ ở đầu chuỗi vẫn là một tuần trễ cho cả kế hoạch. Bạn nén được một phần mà vẫn nối tiếp.",
          ending: "bad",
        },
        "chot-hop-dong": {
          text: "Trong hai ngày ba đội thống nhất một bản mô tả giao diện và một ví dụ dữ liệu. Đội màn hình dựng bản giả lập và làm song song, chỉ ghép thật vào cuối. Chuỗi sáu tuần rút còn khoảng hai tuần rưỡi mà không thêm người nào.",
          ending: "good",
        },
      },
    },
  ],

  "ra-soat-kien-truc": [
    {
      type: "scenario",
      title: "Ba đề xuất trong một tuần",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Tổ chức vừa lập buổi rà soát kiến trúc hằng tuần. Tuần này có ba đề xuất: đổi thư viện định dạng ngày nội bộ, đổi cách các dịch vụ trao dữ liệu cho nhau, và đổi màu nút bấm. Thời gian chỉ đủ nghe kỹ một đề xuất. Bạn chọn thế nào?",
          choices: [
            { label: "Nghe cả ba theo thứ tự đăng ký", next: "nghe-het" },
            { label: "Nghe cách trao đổi dữ liệu, hai cái kia để đội tự quyết", next: "loc-theo-chi-phi" },
            { label: "Nghe thư viện ngày vì mã thay đổi nhiều nhất", next: "theo-mat" },
          ],
        },
        "nghe-het": {
          text: "Mỗi đề xuất được mười phút, không cái nào đủ sâu, và đề xuất quan trọng nhất bị cắt đúng lúc đang hay. Các đội bắt đầu nghĩ buổi rà soát là thủ tục và dần tìm cách đưa việc lớn qua mà không nhắc tới nó.",
          ending: "bad",
        },
        "theo-mat": {
          text: "Thay đổi trông to, nhưng sai thì sửa trong một tuần. Trong khi đó đề xuất về trao đổi dữ liệu, mà sai thì sửa mất hai năm, được duyệt qua loa ở cuối buổi. Bạn lọc theo kích thước của mã thay vì chi phí sửa sai.",
          ending: "bad",
        },
        "loc-theo-chi-phi": {
          text: "Buổi rà soát chuyên sâu vào đề xuất trao đổi dữ liệu. Có người phản đối gay gắt, và ý kiến của hội đồng khác với ý đội đề xuất. Bước tiếp theo?",
          choices: [
            { label: "Hội đồng bỏ phiếu và bắt đội làm theo", next: "bat-buoc" },
            { label: "Ghi các lo ngại, đội đề xuất vẫn là người quyết", next: "van-la-chu" },
          ],
        },
        "bat-buoc": {
          text: "Đội đề xuất làm theo, nhưng khi sự cố xảy ra sáu tháng sau, họ nói \"hội đồng đã duyệt\". Quyền quyết định chuyển sang người không chịu hậu quả, và các đội bắt đầu né buổi rà soát để giữ quyền của mình.",
          ending: "bad",
        },
        "van-la-chu": {
          text: "Đội đề xuất đọc các lo ngại, chỉnh lại thiết kế và ghi lý do chọn cách của mình vào tài liệu. Buổi rà soát hoạt động như một cửa sổ để người khác nhìn vào, còn trách nhiệm vẫn nằm ở người sở hữu. Các đội bắt đầu chủ động gửi những việc lớn tới.",
          ending: "good",
        },
      },
    },
  ],

  "go-he-thong-cu": [
    {
      type: "scenario",
      title: "Hệ thống cũ còn bốn phần trăm lưu lượng",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Hệ thống mới đã chạy chín mươi sáu phần trăm lưu lượng, đội đã ăn mừng. Hệ thống cũ vẫn tốn tiền máy chủ và một người trực. Có đề xuất cứ để đó, thỉnh thoảng nhìn lại. Bạn quyết thế nào?",
          choices: [
            { label: "Để đó, ưu tiên tính năng mới đang hấp dẫn hơn", next: "de-do" },
            { label: "Tắt luôn, vì bốn phần trăm chắc không quan trọng", next: "tat-luon" },
            { label: "Tìm ra ai đang gọi nó rồi đặt một ngày gỡ", next: "tim-nguoi-goi" },
          ],
        },
        "de-do": {
          text: "Ba năm sau người hiểu hệ thống cũ đã nghỉ, tài liệu lỗi thời, và một lỗ hổng bảo mật trong nền công nghệ cũ đòi vá. Sửa lỗi nhỏ ấy tốn nhiều hơn cả việc chuyển nốt bốn phần trăm hôm nay.",
          ending: "bad",
        },
        "tat-luon": {
          text: "Bốn phần trăm đó là luồng đối soát cuối tháng của phòng kế toán, hiếm nhưng quan trọng. Ngày mùng một, báo cáo không chạy và phòng kế toán gọi cho bạn khi chưa ai biết hệ thống cũ từng làm việc này.",
          ending: "bad",
        },
        "tim-nguoi-goi": {
          text: "Nhật ký cho thấy bốn bên còn gọi: phòng kế toán, một đối tác, một công cụ nội bộ cũ, và một khách hàng có cấu hình đặc biệt. Bạn xử lý họ thế nào?",
          choices: [
            { label: "Gửi một thông báo chung rồi chờ họ tự chuyển", next: "cho-tu-chuyen" },
            { label: "Liên hệ từng bên, giúp họ chuyển theo hạn", next: "chu-dong" },
          ],
        },
        "cho-tu-chuyen": {
          text: "Hai bên chuyển, hai bên im lặng. Ngày gỡ tới, bạn lại hoãn vì còn người dùng, rồi hoãn tiếp. Bốn phần trăm thành ba phần trăm và đứng đó, vì chờ họ tự làm thì phần cuối không bao giờ có ai muốn xử lý.",
          ending: "bad",
        },
        "chu-dong": {
          text: "Bạn ngồi với từng bên, viết lại luồng đối soát cho kế toán và tìm cách xử lý cấu hình đặc biệt. Sau hai tháng nhật ký sạch, và hệ thống cũ được tắt đúng ngày đã hẹn. Chi phí cố định biến mất thay vì thành một khoản cứ lớn dần.",
          ending: "good",
        },
      },
    },
  ],

  "on-tap-quy-mo-va-nhieu-doi": [
    {
      type: "scenario",
      title: "Đánh giá đề xuất tách dịch vụ",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Một đề xuất đến tay bạn: tách module thanh toán thành dịch vụ riêng cho đội mới. Bản đề xuất đẹp, có sơ đồ, nhưng chưa nói gì về người sở hữu hay cách các đội phối hợp. Câu hỏi đầu tiên của bạn là gì?",
          choices: [
            { label: "Dịch vụ này dùng công nghệ gì", next: "cong-nghe" },
            { label: "Ai sở hữu nó, và một thay đổi đi qua mấy đội", next: "so-huu" },
            { label: "Bao nhiêu người sẽ làm trong quý đầu", next: "bao-nhieu-nguoi" },
          ],
        },
        "cong-nghe": {
          text: "Cuộc thảo luận kéo dài về ngôn ngữ và khung làm việc. Đề xuất được duyệt, dịch vụ ra đời, và ba tháng sau mọi tính năng thanh toán cần ba đội cùng sửa. Câu hỏi về công nghệ trả lời được, nhưng đó không phải chỗ đề xuất này có thể sai.",
          ending: "bad",
        },
        "bao-nhieu-nguoi": {
          text: "Đề xuất có đủ người, nên được duyệt. Nhưng chưa ai nói hợp đồng giữa dịch vụ mới và hệ thống đặt hàng là gì, nên hai đội dựa vào hành vi chưa được ghi lại. Sáu tuần sau một thay đổi nhỏ làm hỏng cả hai.",
          ending: "bad",
        },
        "so-huu": {
          text: "Đề xuất trả lời: đội Thanh toán sở hữu, một thay đổi điển hình đi qua hai đội. Bạn hỏi tiếp về giao tiếp giữa các đội. Bạn chọn câu nào?",
          choices: [
            { label: "Đội kề nhau thì sẽ tự trao đổi tốt", next: "tin-quen-biet" },
            { label: "Hợp đồng giữa hai bên là gì, ai kiểm nó", next: "hop-dong" },
          ],
        },
        "tin-quen-biet": {
          text: "Đề xuất được duyệt với niềm tin rằng các đội quen nhau. Khi một người chuyển đội và người mới vào không biết thoả thuận miệng, hợp đồng ngầm biến mất mà không ai chủ ý làm vậy, và lỗi chỉ lộ ra ở môi trường chạy thật.",
          ending: "bad",
        },
        "hop-dong": {
          text: "Đề xuất bổ sung một bộ kiểm hợp đồng chạy ở mỗi thay đổi, và nêu rõ nếu chọn sai thì sửa trong khoảng một quý. Bạn duyệt với nhận định này: ranh giới có chủ, hợp đồng có máy kiểm, chi phí sửa sai hữu hạn. Bốn câu hỏi ngắn đủ để đánh giá một đề xuất ở quy mô nhiều đội.",
          ending: "good",
        },
      },
    },
  ],

  "mo-hinh-moi-de-doa": [
    {
      type: "scenario",
      title: "Dịch vụ mới lên mạng, nguồn lực chỉ đủ ba việc",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Dịch vụ đặt lịch hẹn của bạn sắp mở ra Internet. Đội bảo mật chỉ có một người và hai tuần. Danh sách việc dài hai mươi mục, mục nào cũng nghe hợp lý. Bạn bắt đầu bằng gì?",
          choices: [
            { label: "Làm lần lượt từ mục đầu danh sách", next: "lam-lan-luot" },
            { label: "Ghi tài sản quan trọng nhất và ai muốn lấy nó", next: "ghi-tai-san" },
            { label: "Thuê kiểm thử xâm nhập rồi làm theo báo cáo", next: "thue-kiem-thu" },
          ],
        },
        "lam-lan-luot": {
          text: "Hai tuần trôi qua với việc hoàn thiện bảy mục đầu danh sách, trong đó có vài mục ít ai bận tâm. Mật khẩu quản trị mặc định chưa đổi vì nó nằm ở mục mười bốn. Một máy quét tự động tìm ra nó trong vài phút sau khi dịch vụ lên mạng.",
          ending: "bad",
        },
        "thue-kiem-thu": {
          text: "Báo cáo dày bốn mươi trang, ba tuần mới có, và mọi phát hiện được xếp ngang hàng. Bạn vẫn không biết nên làm cái nào trước vì báo cáo không biết điều gì đáng mất nhất với dịch vụ của bạn.",
          ending: "bad",
        },
        "ghi-tai-san": {
          text: "Nửa trang ghi chú: tài sản đáng giá nhất là danh sách bệnh nhân và lịch khám. Kẻ tấn công phổ biến là máy quét tự động thử mật khẩu mặc định và lỗ hổng đã công bố. Bạn tiếp tục xếp thứ tự bằng cách nào?",
          choices: [
            { label: "Xếp theo mức độ nghe đáng sợ", next: "theo-cam-giac" },
            { label: "Xếp theo khả năng bị thử nhân với thiệt hại", next: "theo-rui-ro" },
          ],
        },
        "theo-cam-giac": {
          text: "Danh sách đầu tiên gồm tin tặc nhà nước và mã độc tinh vi, những thứ nghe rất đáng sợ nhưng ít khả năng nhắm vào một dịch vụ đặt lịch nhỏ. Hai tuần dùng cho những kịch bản hiếm, còn máy quét tự động vẫn tìm thấy cổng quản trị mở.",
          ending: "bad",
        },
        "theo-rui-ro": {
          text: "Ba việc đứng đầu: đổi mật khẩu mặc định và đóng cổng quản trị ra Internet, vá các lỗ hổng đã công bố của phần mềm đang dùng, và mã hoá danh sách bệnh nhân. Phần còn lại ghi lại là rủi ro chấp nhận có chủ ý. Nguồn lực dồn vào chỗ quan trọng nhất thay vì trải mỏng.",
          ending: "good",
        },
      },
    },
  ],

  "luu-mat-khau-dung-cach": [
    {
      type: "scenario",
      title: "Rà soát cách lưu mật khẩu",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Bạn nhận lại một hệ thống đăng nhập cũ. Chức năng quên mật khẩu của nó gửi mật khẩu cũ qua email. Sếp hỏi có vấn đề gì không, vì \"người dùng thấy tiện\". Bạn đánh giá thế nào?",
          choices: [
            { label: "Ổn, miễn là đường truyền email được mã hoá", next: "email-ma-hoa" },
            { label: "Hệ thống không băm mật khẩu, cần sửa", next: "nhan-ra" },
            { label: "Ổn, cơ sở dữ liệu có phân quyền chặt", next: "phan-quyen" },
          ],
        },
        "email-ma-hoa": {
          text: "Đường truyền không phải điểm yếu. Nếu hệ thống gửi lại được mật khẩu thì nó lưu mật khẩu ở dạng đọc được. Cơ sở dữ liệu bị lộ một ngày nào đó và toàn bộ mật khẩu, cũng là mật khẩu người dùng dùng cho dịch vụ khác, bị lộ cùng lúc.",
          ending: "bad",
        },
        "phan-quyen": {
          text: "Phân quyền tốt không giúp khi bản sao lưu bị thất lạc hay một lỗ hổng cho đọc bảng người dùng. Câu hỏi thiết kế là nếu mất cơ sở dữ liệu thì mất bao nhiêu, và ở đây câu trả lời là tất cả mật khẩu.",
          ending: "bad",
        },
        "nhan-ra": {
          text: "Bạn đề xuất băm mật khẩu. Bạn chọn cách băm nào?",
          choices: [
            { label: "Băm nhanh cho đăng nhập không bị chậm", next: "bam-nhanh" },
            { label: "Dùng thư viện chuyên cho mật khẩu, có muối riêng", next: "bam-cham" },
          ],
        },
        "bam-nhanh": {
          text: "Hàm băm nhanh lại là thứ kẻ dò mật khẩu yêu thích: một thẻ đồ hoạ thử hàng tỷ mật khẩu mỗi giây. Cơ sở dữ liệu bị lộ năm sau, và phần lớn mật khẩu yếu bị dò ra trong vài giờ dù đã băm.",
          ending: "bad",
        },
        "bam-cham": {
          text: "Mỗi lần kiểm tra mất khoảng một phần mười giây, người dùng không nhận ra, nhưng kẻ dò mật khẩu thì chậm đi hàng triệu lần. Muối riêng khiến hai người trùng mật khẩu vẫn cho hai giá trị khác nhau, và chức năng quên mật khẩu chuyển sang đặt lại thay vì gửi lại. Nếu mất cơ sở dữ liệu, thiệt hại đã giảm đáng kể.",
          ending: "good",
        },
      },
    },
  ],

  "quan-ly-khoa-ma-hoa": [
    {
      type: "scenario",
      title: "Khoá mã hoá nằm ở đâu",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Đội bạn đã mã hoá cột số căn cước trong cơ sở dữ liệu, và mọi người thấy yên tâm. Khi rà soát, bạn thấy khoá giải mã nằm trong tệp cấu hình cùng máy chủ ứng dụng, và tệp cấu hình đó cũng có trong bản sao lưu hằng đêm. Bạn kết luận gì?",
          choices: [
            { label: "Ổn, vì dữ liệu đã được mã hoá rồi", next: "o-on" },
            { label: "Một lần chiếm máy lấy được cả khoá lẫn dữ liệu", next: "tach-kich-ban" },
            { label: "Ổn, nếu tệp cấu hình đặt quyền chặt", next: "quyen-chat" },
          ],
        },
        "o-on": {
          text: "Kẻ tấn công vào được máy chủ, lấy tệp cấu hình và bản sao lưu, rồi giải mã toàn bộ cột. Mã hoá chỉ có giá trị khi lấy dữ liệu và lấy khoá là hai chuyện độc lập, còn ở đây chúng là một.",
          ending: "bad",
        },
        "quyen-chat": {
          text: "Quyền tệp không giúp gì khi bản sao lưu chứa cả khoá lẫn dữ liệu và được chép sang nơi lưu trữ khác. Một bản sao lưu thất lạc là mất cả gói, và đây chính là kịch bản đơn lẻ bạn cần loại bỏ.",
          ending: "bad",
        },
        "tach-kich-ban": {
          text: "Bạn đề xuất chuyển khoá sang kho khoá chuyên dụng. Đội hỏi: sau đó nên xử lý dữ liệu đã mã hoá thế nào để sau này đổi khoá được?",
          choices: [
            { label: "Mã hoá tất cả bằng một khoá, không bao giờ đổi", next: "mot-khoa" },
            { label: "Ghi số phiên bản khoá cạnh mỗi bản ghi", next: "phien-ban" },
          ],
        },
        "mot-khoa": {
          text: "Một năm sau, khoá nghi ngờ bị lộ. Không có số phiên bản, bạn phải dừng hệ thống, giải mã rồi mã hoá lại toàn bộ cột trong một đêm, và nếu có bước nào lỗi giữa chừng thì không biết bản ghi nào dùng khoá nào.",
          ending: "bad",
        },
        "phien-ban": {
          text: "Mỗi bản ghi mang số phiên bản khoá. Khi xoay vòng, bản ghi mới dùng khoá mới còn bản cũ được mã hoá lại dần ở nền, và hệ thống không phải dừng. Bạn cũng ghi đường khôi phục khoá, vì mất khoá là mất dữ liệu vĩnh viễn. Cả hai kịch bản, bị lộ và bị mất, đều có kế hoạch.",
          ending: "good",
        },
      },
    },
  ],
};
