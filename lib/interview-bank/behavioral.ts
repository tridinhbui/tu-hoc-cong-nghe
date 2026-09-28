import type { BehavioralCard } from "./types";

/**
 * Thẻ chuẩn bị câu hỏi hành vi cho phỏng vấn ngành công nghệ ở Việt Nam (dải id
 * 9001-9999). KHÔNG chấm điểm: câu chuyện nghề nghiệp của mỗi người không có
 * một đáp án đúng, nên mỗi thẻ đưa ra điều người phỏng vấn muốn nghe, một khung
 * trả lời từng bước và một lỗi hay gặp.
 */
export const BEHAVIORAL_CARDS: BehavioralCard[] = [
  {
    id: 9001,
    category: "Mở đầu",
    question: "Bạn hãy giới thiệu về bản thân.",
    whatTheyWant:
      "Một bản tóm tắt 1-2 phút nối quá khứ của bạn với đúng vị trí này, để họ biết nên hỏi sâu vào đâu - không phải bản đọc lại CV.",
    framework: [
      "Hiện tại: bạn đang làm gì, mạnh nhất ở mảng nào (một câu).",
      "Quá khứ: hai trải nghiệm liên quan nhất tới vị trí, mỗi cái kèm một kết quả cụ thể.",
      "Lý do: vì sao bạn ứng tuyển vào công ty và vai trò này lúc này.",
      "Kết bằng một móc nối để họ hỏi tiếp, ví dụ dự án bạn muốn kể kỹ.",
    ],
    pitfall: "Kể từ quê quán, năm sinh, trường cấp ba theo thứ tự thời gian và hết giờ trước khi tới phần liên quan.",
  },
  {
    id: 9002,
    category: "Động lực",
    question: "Vì sao bạn chọn nghề này, hoặc vì sao chuyển ngành sang IT?",
    whatTheyWant:
      "Bằng chứng rằng lựa chọn này có suy nghĩ và bền - bạn đã thử làm thật, không chỉ chạy theo lương hay trào lưu, và sẽ không bỏ sau sáu tháng.",
    framework: [
      "Khoảnh khắc bắt đầu: việc cụ thể khiến bạn thích (một công cụ tự viết, một bài toán ở chỗ làm cũ).",
      "Hành động: bạn đã tự học gì, làm dự án gì để kiểm chứng sở thích đó.",
      "Kỹ năng mang theo: điều từ ngành cũ giúp bạn làm tốt hơn (hiểu nghiệp vụ, giao tiếp khách hàng).",
      "Hướng đi: bạn muốn phát triển tới đâu trong 2-3 năm tới.",
    ],
    pitfall: "Nói thẳng 'vì IT lương cao' hoặc chê ngành cũ, khiến người nghe lo bạn sẽ lại bỏ đi khi chán.",
  },
  {
    id: 9003,
    category: "Kinh nghiệm",
    question: "Kể về một dự án bạn tự hào nhất.",
    whatTheyWant:
      "Phần việc CỦA BẠN trong dự án, các quyết định kỹ thuật và lý do chọn chúng, cùng kết quả đo được - để đánh giá tầm hiểu biết thật.",
    framework: [
      "Bối cảnh: dự án giải quyết vấn đề gì, cho ai, đội mấy người (ngắn gọn).",
      "Vai trò: bạn chịu trách nhiệm phần nào, nói 'tôi' thay vì 'chúng tôi'.",
      "Quyết định khó: một lựa chọn kỹ thuật, các phương án đã cân nhắc và vì sao chọn cái đó.",
      "Kết quả bằng số: người dùng, tốc độ, lỗi giảm, thời gian tiết kiệm.",
      "Nếu làm lại, bạn sẽ đổi điều gì.",
    ],
    pitfall: "Liệt kê công nghệ đã dùng (React, Docker, Redis...) mà không nói vì sao chọn và bạn đã giải quyết khó khăn gì.",
  },
  {
    id: 9004,
    category: "Thất bại",
    question: "Kể về một lần bạn làm hỏng việc hoặc gây ra lỗi.",
    whatTheyWant:
      "Bạn có dám nhận trách nhiệm, xử lý sự cố bình tĩnh và thay đổi cách làm để lỗi đó không lặp lại hay không.",
    framework: [
      "Situation: chuyện gì xảy ra, ảnh hưởng tới ai (một lỗi thật, có hậu quả thật).",
      "Nhận lỗi: phần nào là do bạn, nói thẳng không vòng vo.",
      "Action: bạn đã làm gì để khắc phục ngay và báo cho ai.",
      "Bài học: bạn đổi quy trình gì sau đó (thêm test, checklist, review) và kết quả ra sao.",
    ],
    pitfall: "Chọn một 'thất bại' giả như 'tôi làm việc quá chăm', hoặc kể lỗi rồi đổ cho đồng nghiệp hay khách hàng.",
  },
  {
    id: 9005,
    category: "Làm việc nhóm",
    question: "Kể về một lần bạn bất đồng với đồng nghiệp, ví dụ trong code review.",
    whatTheyWant:
      "Cách bạn tranh luận bằng lý lẽ và dữ liệu, tôn trọng người khác, và biết chấp nhận khi mình sai - không cần thắng mọi cuộc cãi.",
    framework: [
      "Bối cảnh: hai bên bất đồng về điều gì, vì sao nó quan trọng.",
      "Hiểu người kia: lập luận của họ là gì, bạn đã hỏi lại để hiểu ra sao.",
      "Cách giải quyết: đưa dữ liệu, thử nghiệm nhỏ, hoặc nhờ người thứ ba quyết.",
      "Kết quả và quan hệ sau đó: quyết định cuối cùng, hai người làm việc tiếp thế nào.",
    ],
    pitfall: "Kể câu chuyện mà mình luôn đúng và đồng nghiệp là người kém, nghe như bạn khó làm việc chung.",
  },
  {
    id: 9006,
    category: "Áp lực",
    question: "Kể về một lần bạn phải làm việc dưới hạn chót gấp.",
    whatTheyWant:
      "Khả năng ưu tiên, cắt phạm vi có chủ đích và báo sớm rủi ro cho người liên quan, thay vì chỉ thức đêm cho kịp.",
    framework: [
      "Tình huống: hạn chót là gì, vì sao gấp, khối lượng việc bao nhiêu.",
      "Ưu tiên: bạn chia việc phải có, nên có, để sau thế nào.",
      "Giao tiếp: bạn báo gì cho quản lý hoặc khách hàng, lúc nào.",
      "Kết quả: giao được gì đúng hạn, phần nào dời lại, và bạn rút ra gì.",
    ],
    pitfall: "Tự hào kể việc làm xuyên đêm mấy ngày liền mà không nói gì về ưu tiên hay chất lượng bị ảnh hưởng.",
  },
  {
    id: 9007,
    category: "Học hỏi",
    question: "Kể về một lần bạn phải học một công nghệ mới thật nhanh.",
    whatTheyWant:
      "Phương pháp tự học của bạn: tìm nguồn nào, học đến mức nào thì bắt tay làm, và kiểm tra hiểu biết của mình ra sao.",
    framework: [
      "Bối cảnh: công nghệ gì, vì sao phải học, có bao nhiêu thời gian.",
      "Cách học: tài liệu chính thức, ví dụ mẫu, hỏi người đã biết - theo thứ tự nào.",
      "Áp dụng: bản chạy được đầu tiên sau bao lâu, bạn vấp chỗ nào.",
      "Kết quả: dùng nó vào việc gì, và bạn chia sẻ lại cho đội ra sao.",
    ],
    pitfall: "Chỉ nói 'tôi học rất nhanh' hoặc 'tôi xem video trên YouTube' mà không có ví dụ cụ thể.",
  },
  {
    id: 9008,
    category: "Kết thúc",
    question: "Bạn có câu hỏi gì cho chúng tôi không?",
    whatTheyWant:
      "Sự quan tâm thật tới công việc và đội ngũ, thể hiện qua câu hỏi đã chuẩn bị - đồng thời đây là lúc bạn đánh giá ngược công ty.",
    framework: [
      "Hỏi về công việc: ba tháng đầu người ở vị trí này cần làm được gì.",
      "Hỏi về đội: quy trình review code, triển khai, xử lý sự cố ra sao.",
      "Hỏi về phát triển: người giỏi ở đây thường lớn lên theo hướng nào.",
      "Hỏi bước tiếp theo của quy trình tuyển dụng và thời gian phản hồi.",
    ],
    pitfall: "Trả lời 'Dạ không ạ', hoặc chỉ hỏi về lương, thưởng và ngày nghỉ ngay trong vòng phỏng vấn kỹ thuật.",
  },
  {
    id: 9009,
    category: "Đãi ngộ",
    question: "Mức lương mong muốn của bạn là bao nhiêu?",
    whatTheyWant:
      "Xem kỳ vọng của bạn có nằm trong ngân sách vị trí không, và bạn có hiểu giá trị thị trường của mình hay đang nói con số tuỳ hứng.",
    framework: [
      "Tìm hiểu trước khoảng lương thị trường cho vị trí và số năm kinh nghiệm (báo cáo lương, người quen trong nghề).",
      "Nêu một khoảng có cơ sở, ghi rõ gross hay net, không phải một con số cứng.",
      "Gắn khoảng đó với kỹ năng và kết quả bạn mang lại.",
      "Để ngỏ cho tổng đãi ngộ: thưởng, bảo hiểm, đào tạo, làm từ xa.",
    ],
    pitfall: "Nói 'tuỳ công ty ạ' rồi bị trả thấp, hoặc không phân biệt gross và net nên lệch nhau vài triệu mỗi tháng.",
  },
  {
    id: 9010,
    category: "Tự nhận thức",
    question: "Điểm yếu lớn nhất của bạn là gì?",
    whatTheyWant:
      "Khả năng tự nhìn nhận trung thực và bằng chứng rằng bạn đang chủ động cải thiện - không phải một điểm mạnh đội lốt điểm yếu.",
    framework: [
      "Chọn một điểm yếu thật nhưng không phải kỹ năng cốt lõi của vị trí.",
      "Ví dụ cụ thể: điểm yếu đó từng gây ra chuyện gì.",
      "Bạn đang làm gì để cải thiện (khoá học, thói quen, công cụ).",
      "Tiến bộ đo được đến hiện tại.",
    ],
    pitfall: "Trả lời 'em quá cầu toàn' hay 'em làm việc quá chăm chỉ' - người phỏng vấn nghe câu này hàng ngày và thấy né tránh.",
  },
  {
    id: 9011,
    category: "Cách làm việc",
    question: "Bạn làm việc từ xa hiệu quả bằng cách nào?",
    whatTheyWant:
      "Bạn có tự quản lý được thời gian, chủ động báo tiến độ và giao tiếp rõ ràng bằng văn bản khi không có ai ngồi cạnh hay không.",
    framework: [
      "Kinh nghiệm: bạn đã làm từ xa hoặc lai bao lâu, trong đội thế nào.",
      "Tổ chức: cách bạn lên kế hoạch ngày, giữ tập trung và giờ làm việc rõ ràng.",
      "Giao tiếp: cập nhật tiến độ chủ động, viết mô tả PR và tài liệu đủ để người khác không phải hỏi.",
      "Khi bị tắc: bạn tự tìm bao lâu rồi hỏi ai, qua kênh nào.",
    ],
    pitfall: "Chỉ nói 'em rất tự giác' mà không có thói quen hay công cụ cụ thể nào chứng minh.",
  },
  {
    id: 9012,
    category: "Nền tảng",
    question: "Bạn không có bằng CNTT, làm sao chúng tôi tin bạn làm được việc?",
    whatTheyWant:
      "Bằng chứng năng lực thay cho tấm bằng: sản phẩm đã làm, code có thể xem, và cách bạn tự lấp các lỗ hổng kiến thức nền.",
    framework: [
      "Thừa nhận thẳng thắn: bạn không học chính quy, và điều đó không làm bạn né câu hỏi.",
      "Bằng chứng: dự án thật, repo GitHub, sản phẩm có người dùng hoặc việc đã làm cho khách.",
      "Kiến thức nền: bạn đã tự học cấu trúc dữ liệu, mạng, cơ sở dữ liệu thế nào.",
      "Lợi thế riêng: kinh nghiệm ngành cũ hoặc thói quen tự học giúp bạn làm tốt vị trí này.",
    ],
    pitfall: "Phản ứng phòng thủ hoặc chê bằng cấp là vô dụng, thay vì đưa ra bằng chứng cụ thể.",
  },
];
