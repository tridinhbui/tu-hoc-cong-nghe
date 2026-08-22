import type { Lesson } from "./lesson-types";

// Chặng 19 của track cá nhân: sức khoẻ nghề nghiệp và rủi ro con người.
//
// VÌ SAO CHẶNG NÀY TỒN TẠI. Bốn rủi ro mà nghề lập trình đặt lên chính người
// làm nghề - kiệt sức, lệ thuộc công cụ, chấn thương do lặp lại, nhịp làm việc
// kém - đều có chung một tính chất: chúng tích tụ âm thầm và chỉ phát tín hiệu
// khi tổn thương đã đáng kể. Đó là lý do bài cuối là một danh sách kiểm chứ
// không phải một lời nhắc phải cảnh giác.
//
// KHÔNG ĐIỀN interactiveType. Trường này tuỳ chọn, và không widget nào trong
// WIDGET_TOPIC_TERMS nói về sức khoẻ nghề nghiệp - gắn ép thì widget-topic-match
// im nhưng người học mở bài Tư thế ra lại thấy một máy tính lãi kép.
//
// Ids 380-384 nối tiếp Chặng 18 (370-376).
//
// Tệp này trước đây tên health-risk-lessons.ts và chứa năm bài về BHYT, bảo
// hiểm bổ sung và rủi ro y tế như một bài toán tài chính. Đổi tên cùng lúc với
// nội dung, vì tên cũ sống sót qua lần chuyển đổi là cái bẫy AGENTS.md ghi lại
// nhiều lần.

export const OCCUPATIONAL_HEALTH_LESSONS: Lesson[] = [
  {
    "id": 380,
    "slug": "kiet-suc-nghe-lap-trinh",
    "title": "Chặng 19, Bài 1: Kiệt sức - cơ chế và dấu hiệu sớm",
    "subtitle": "Nó không đến từ làm nhiều giờ, mà từ làm nhiều giờ vào thứ bạn không kiểm soát được.",
    "duration": "7 phút",
    "difficulty": "Trung bình",
    "emoji": "🪫",
    "track": "personal",
    "isFundamental": true,
    "whyItMatters": "Kiệt sức là rủi ro nghề nghiệp lớn nhất của công việc trí óc, và nó tấn công đúng thứ bạn kiếm sống bằng nó. Nhận ra sớm rẻ hơn rất nhiều so với hồi phục, vì hồi phục tính bằng tháng.",
    "openingQuestion": "Yếu tố nào dự báo kiệt sức mạnh nhất?",
    "openingOptions": [
      "Mức kiểm soát bạn có với công việc của mình, chứ không phải số giờ bạn làm",
      "Tổng số giờ làm việc mỗi tuần, vì càng làm nhiều giờ thì lại càng nhanh cạn kiệt năng lượng",
      "Độ khó kỹ thuật của bài toán, vì việc khó đòi hỏi nhiều nỗ lực tinh thần hơn",
      "Số lượng dự án bạn phải tham gia cùng lúc trong một khoảng thời gian nhất định"
    ],
    "correctOption": 0,
    "explanation": "Nghiên cứu về kiệt sức nghề nghiệp cho thấy quyền tự chủ là yếu tố dự báo mạnh hơn khối lượng công việc. Người làm sáu mươi giờ vào thứ họ chọn và kiểm soát được thường ổn hơn người làm bốn mươi giờ vào thứ họ bị giao, bị đổi ý liên tục và không được quyết gì. Đó là lý do giảm giờ làm mà không đổi mức kiểm soát thường không giúp được bao nhiêu.",
    "diagram": [
      {
        "label": "Kiểm soát thấp + đòi hỏi cao = tổ hợp nguy hiểm nhất",
        "arrow": true
      },
      {
        "label": "Ba dấu hiệu: cạn kiệt, hoài nghi, thấy mình vô dụng",
        "arrow": true
      },
      {
        "label": "Chúng đến theo thứ tự đó, và cái đầu là cái dễ bỏ qua",
        "arrow": true
      },
      {
        "label": "Nghỉ ngơi chữa mệt; nó không chữa được thiếu kiểm soát"
      }
    ],
    "realWorldExample": {
      "company": "Nghỉ phép rồi quay lại y như cũ",
      "description": "Một kỳ nghỉ hai tuần làm bạn thấy khá hơn rõ rệt, rồi ba ngày sau khi quay lại mọi thứ về đúng chỗ cũ. Đó là dấu hiệu vấn đề nằm ở điều kiện làm việc chứ không ở mức mệt tích tụ - và nghỉ thêm cũng không đổi được gì."
    },
    "quiz": [
      {
        "question": "Ba biểu hiện của kiệt sức nghề nghiệp là gì?",
        "options": [
          "Cạn kiệt năng lượng, hoài nghi và xa cách công việc, cảm giác mình làm gì cũng vô ích",
          "Mất ngủ kéo dài, đau đầu thường xuyên và giảm sút trí nhớ ngắn hạn rõ rệt",
          "Giảm năng suất, tăng số lỗi trong công việc và chậm hoàn thành các nhiệm vụ",
          "Căng thẳng, lo âu và né tránh các cuộc trao đổi với đồng nghiệp trong đội"
        ],
        "correct": 0,
        "explanation": "Ba biểu hiện này thường đến theo đúng thứ tự đó, và biểu hiện đầu tiên là cái dễ bỏ qua nhất vì ai cũng nghĩ mình chỉ đang mệt. Các triệu chứng thể chất và việc giảm năng suất là HỆ QUẢ, xuất hiện sau khi ba biểu hiện kia đã có."
      },
      {
        "question": "Vì sao nghỉ phép thường không giải quyết được kiệt sức?",
        "options": [
          "Vì nó chữa mức mệt tích tụ nhưng không đổi được điều kiện đã tạo ra tình trạng đó",
          "Vì thời gian nghỉ phép quá ngắn so với thời gian cần thiết để hồi phục hoàn toàn",
          "Vì trong lúc nghỉ người ta vẫn theo dõi công việc nên không thật sự tách khỏi nó",
          "Vì khối lượng công việc dồn lại trong lúc nghỉ khiến lúc quay lại còn nặng hơn"
        ],
        "correct": 0,
        "explanation": "Dấu hiệu nhận biết rất rõ: bạn thấy khá hơn hẳn trong kỳ nghỉ rồi trở lại y như cũ sau vài ngày. Nếu đúng vậy thì vấn đề nằm ở điều kiện làm việc, và nghỉ thêm bao lâu cũng không đổi được."
      },
      {
        "question": "Vì sao lập trình viên dễ gặp kiệt sức hơn nhiều nghề khác?",
        "options": [
          "Vì công việc đòi hỏi tập trung sâu kéo dài mà lại thường xuyên bị cắt vụn bởi việc xen ngang",
          "Vì ngành công nghệ thay đổi rất nhanh nên người làm phải liên tục học thêm kiến thức mới mỗi năm",
          "Vì phần lớn lập trình viên làm việc một mình nên thiếu sự hỗ trợ từ đồng nghiệp",
          "Vì kết quả công việc khó đo lường nên khó có được cảm giác hoàn thành nhiệm vụ"
        ],
        "correct": 0,
        "explanation": "Mâu thuẫn giữa nhu cầu tập trung sâu và thực tế bị cắt vụn là đặc trưng của nghề này. Việc phải học liên tục cũng có thật nhưng nó thường tạo hứng thú hơn là gây kiệt sức, ít nhất khi bạn còn kiểm soát được nhịp học."
      },
      {
        "question": "Cách can thiệp nào có tác dụng thật khi mới có dấu hiệu sớm?",
        "options": [
          "Giành lại quyền kiểm soát ở một phần cụ thể: được chọn việc, được quyết cách làm, được nói không",
          "Giảm số giờ làm việc mỗi tuần xuống mức thấp hơn hẳn cho tới khi bản thân cảm thấy đỡ hơn",
          "Chuyển sang một dự án khác trong công ty để thay đổi không khí và nội dung công việc",
          "Tăng thời gian nghỉ giữa các phiên làm việc để cơ thể có thời gian phục hồi nhiều hơn"
        ],
        "correct": 0,
        "explanation": "Vì kiểm soát mới là yếu tố dự báo nên cách can thiệp phải nhắm vào đó. Đổi dự án đôi khi hiệu quả nhưng chỉ khi dự án mới cho bạn nhiều quyền tự chủ hơn - còn nếu không thì bạn mang theo nguyên vấn đề cũ."
      },
      {
        "question": "Vì sao nói kiệt sức là rủi ro nghề nghiệp đặc biệt nghiêm trọng?",
        "options": [
          "Vì nó làm hỏng đúng khả năng tập trung mà bạn kiếm sống bằng nó, và hồi phục tính bằng tháng",
          "Vì nó thường không được công nhận là bệnh nghề nghiệp nên không có chế độ hỗ trợ",
          "Vì nó ảnh hưởng tới cả những người xung quanh trong đội chứ không chỉ riêng cá nhân",
          "Vì nó thường tái phát nhiều lần ngay cả sau khi người bệnh đã được điều trị đầy đủ theo phác đồ"
        ],
        "correct": 0,
        "explanation": "Đây là điểm phân biệt với những rủi ro nghề nghiệp khác: nó tấn công chính công cụ làm việc của bạn. Và thời gian hồi phục tính bằng tháng chứ không phải bằng tuần, nên phòng rẻ hơn chữa rất nhiều."
      }
    ],
    "keyTakeaways": [
      "Mức kiểm soát dự báo kiệt sức mạnh hơn số giờ làm - đó là điều ngược trực giác nhất.",
      "Ba biểu hiện theo thứ tự: cạn kiệt, hoài nghi, thấy mình vô dụng. Cái đầu dễ bỏ qua nhất.",
      "Khá hơn khi nghỉ rồi về như cũ sau vài ngày: vấn đề ở điều kiện, không ở mức mệt.",
      "Lập trình cần tập trung sâu nhưng lại hay bị cắt vụn - mâu thuẫn đặc trưng của nghề.",
      "Nó làm hỏng đúng khả năng bạn kiếm sống bằng nó, và hồi phục tính bằng tháng."
    ],
    "practicePrompt": {
      "question": "Bạn thấy cạn kiệt nhưng vẫn làm đúng số giờ như hai năm trước. Nên xem lại điều gì?",
      "options": [
        "Mức kiểm soát của bạn với công việc đã đổi thế nào trong hai năm đó",
        "Chất lượng giấc ngủ và chế độ sinh hoạt của bạn có xấu đi trong thời gian qua không",
        "Độ khó của các bài toán bạn đang xử lý có tăng lên so với trước đây không",
        "Số lượng đồng nghiệp trong đội có giảm đi khiến phần việc của bạn nặng thêm không"
      ],
      "correct": 0,
      "explanation": "Cùng số giờ mà cảm giác khác hẳn là dấu hiệu điển hình cho việc yếu tố kiểm soát đã đổi: trước đây bạn chọn việc, giờ bạn nhận việc. Giấc ngủ và độ khó đều đáng xem nhưng chúng thường là hệ quả chứ không phải nguyên nhân."
    },
    "summary": {
      "keyIdea": "Kiệt sức đến từ thiếu kiểm soát, không từ làm nhiều - nên nghỉ ngơi không chữa được nó.",
      "formula": "Đòi hỏi cao + kiểm soát thấp = tổ hợp nguy hiểm nhất.",
      "commonMistake": "Nghỉ phép dài rồi quay lại đúng điều kiện cũ và mong kết quả khác.",
      "action": "Viết ra ba việc trong tuần qua mà bạn không có quyền quyết bất cứ điều gì."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Viết ra ba việc trong tuần qua mà bạn hoàn toàn không có quyền quyết: làm gì, làm thế nào, hay khi nào xong. Đó là bản đồ chỗ thiếu kiểm soát của bạn.",
      "secondary": "Chọn một trong ba và nghĩ xem giành lại được một phần quyền quyết ở đó bằng cách nào. Một phần nhỏ cũng đủ, vì hướng đi quan trọng hơn kích thước bước đi."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chặng này về những rủi ro mà nghề lập trình đặt lên chính người làm nghề. Bài đầu là rủi ro lớn nhất trong số đó, và cũng là rủi ro bị hiểu sai nhiều nhất."
      },
      {
        "type": "heading",
        "text": "Điều ngược trực giác"
      },
      {
        "type": "callout",
        "label": "Không phải số giờ - mà là mức kiểm soát",
        "text": "Người làm sáu mươi giờ vào thứ họ chọn và kiểm soát được thường ổn hơn người làm bốn mươi giờ vào thứ họ bị giao, bị đổi ý liên tục và không được quyết gì. Đó là lý do giảm giờ làm mà không đổi mức kiểm soát thường không giúp được bao nhiêu."
      },
      {
        "type": "heading",
        "text": "Ba biểu hiện, theo thứ tự"
      },
      {
        "type": "list",
        "items": [
          "Cạn kiệt: hết năng lượng, và nghỉ một đêm không nạp lại được. Đây là cái dễ bỏ qua nhất vì ai cũng nghĩ mình chỉ đang mệt.",
          "Hoài nghi và xa cách: bạn bắt đầu thấy công việc vô nghĩa, đồng nghiệp phiền, sản phẩm không đáng.",
          "Cảm giác vô dụng: làm gì cũng thấy không tạo ra khác biệt gì."
        ]
      },
      {
        "type": "paragraph",
        "text": "Mất ngủ, đau đầu và giảm năng suất là HỆ QUẢ, xuất hiện sau khi ba biểu hiện trên đã có. Đó là lý do đợi tới lúc năng suất giảm mới xử lý là đã muộn khá lâu."
      },
      {
        "type": "heading",
        "text": "Vì sao nghề này dễ mắc"
      },
      {
        "type": "paragraph",
        "text": "Lập trình đòi hỏi tập trung sâu kéo dài, và môi trường làm việc thật thì cắt vụn thời gian bằng họp, tin nhắn và việc xen ngang. Mâu thuẫn đó là đặc trưng của nghề, và nó tạo ra cảm giác làm cả ngày mà không xong được gì."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Nghỉ phép chữa được",
          "text": "Mức mệt tích tụ. Bạn thấy khá hơn, và giữ được sau khi quay lại - vì nguyên nhân chỉ là bạn đã làm quá nhiều trong một đợt."
        },
        "right": {
          "label": "Nghỉ phép không chữa được",
          "text": "Thiếu kiểm soát. Bạn khá hơn hẳn trong kỳ nghỉ rồi về đúng chỗ cũ sau vài ngày. Nếu vậy thì nghỉ thêm bao lâu cũng không đổi được gì."
        }
      },
      {
        "type": "closing",
        "lines": [
          "Cách can thiệp phải nhắm vào nguyên nhân: giành lại quyền quyết ở một phần cụ thể - được chọn việc, được quyết cách làm, được nói không với một thứ.",
          "Bài sau là rủi ro thứ hai của nghề, mới xuất hiện gần đây và ít ai gọi tên: lệ thuộc công cụ."
        ]
      }
    ]
  },
  {
    "id": 381,
    "slug": "le-thuoc-cong-cu-va-ky-nang-nen",
    "title": "Chặng 19, Bài 2: Lệ thuộc công cụ và kỹ năng nền",
    "subtitle": "Công cụ tốt làm bạn nhanh hơn; câu hỏi là nó có làm bạn giỏi hơn không.",
    "duration": "6 phút",
    "difficulty": "Trung bình",
    "emoji": "🧰",
    "track": "personal",
    "isFundamental": true,
    "whyItMatters": "Trợ lý viết mã bằng AI làm phần lớn công việc nhanh hơn thật, và chúng cũng làm mờ ranh giới giữa việc bạn hiểu một thứ với việc bạn khiến nó chạy được. Ranh giới đó là thứ quyết định bạn xử lý được gì khi công cụ bí.",
    "openingQuestion": "Dấu hiệu nào cho thấy bạn đang lệ thuộc công cụ chứ không phải đang tận dụng nó?",
    "openingOptions": [
      "Bạn không giải thích được vì sao đoạn mã nó viết lại chạy đúng, mà vẫn dùng",
      "Bạn dùng công cụ cho hầu hết các phần công việc thay vì tự ngồi viết mã bằng tay như trước",
      "Bạn mất nhiều thời gian hơn khi phải làm việc trên một máy không có công cụ đó",
      "Bạn thường phải sửa lại kết quả mà công cụ đưa ra trước khi có thể sử dụng được"
    ],
    "correctOption": 0,
    "explanation": "Dùng nhiều không phải vấn đề - đó là tận dụng, và làm nhanh hơn là mục đích của công cụ. Vấn đề nằm ở chỗ bạn đưa vào sản phẩm một thứ bạn không hiểu: khi nó hỏng theo cách mà công cụ không sửa được, bạn không có gì để dựa vào. Phải sửa lại kết quả thì ngược lại - đó là dấu hiệu bạn đang đánh giá được nó, tức là đang ở phía an toàn.",
    "diagram": [
      {
        "label": "Tận dụng: nhanh hơn ở thứ bạn hiểu",
        "arrow": true
      },
      {
        "label": "Lệ thuộc: đưa vào sản phẩm thứ bạn không hiểu",
        "arrow": true
      },
      {
        "label": "Ranh giới: bạn có đánh giá được kết quả không?",
        "arrow": true
      },
      {
        "label": "Kỹ năng nền là thứ cho bạn khả năng đánh giá đó"
      }
    ],
    "realWorldExample": {
      "company": "Đúng cú pháp, sai bài toán",
      "description": "Trợ lý viết mã rất giỏi tạo ra thứ trông đúng và chạy được với dữ liệu mẫu. Nó kém hơn hẳn ở việc biết trường hợp biên nào quan trọng trong bài toán CỦA BẠN - vì nó không biết bài toán của bạn, chỉ biết những bài toán trông giống vậy."
    },
    "quiz": [
      {
        "question": "Ranh giới giữa tận dụng và lệ thuộc nằm ở đâu?",
        "options": [
          "Ở chỗ bạn có đánh giá được kết quả công cụ đưa ra hay chỉ chấp nhận nó vì nó chạy",
          "Ở tỷ lệ phần trăm khối lượng mã do công cụ sinh ra so với phần bạn tự viết",
          "Ở chỗ bạn có đọc lại toàn bộ đoạn mã mà công cụ sinh ra trước khi dùng hay không",
          "Ở việc bạn có thể tự viết lại đoạn mã đó trong thời gian hợp lý hay không"
        ],
        "correct": 0,
        "explanation": "Tỷ lệ không nói lên gì cả: một người hiểu rõ có thể để công cụ sinh chín mươi phần trăm mà vẫn an toàn. Đọc lại cũng chưa đủ - đọc mà không đánh giá được thì chỉ là lướt qua một thứ mình không hiểu."
      },
      {
        "question": "Trợ lý viết mã yếu nhất ở việc gì?",
        "options": [
          "Biết trường hợp biên nào quan trọng trong bài toán cụ thể của bạn",
          "Viết đúng cú pháp và tuân theo quy ước của ngôn ngữ lập trình bạn dùng",
          "Tạo ra mã cho những tác vụ phổ biến đã xuất hiện nhiều trong tài liệu",
          "Giải thích một đoạn mã có sẵn đang làm gì theo từng bước một"
        ],
        "correct": 0,
        "explanation": "Nó không biết bài toán của bạn, chỉ biết những bài toán TRÔNG GIỐNG vậy - và khác biệt giữa hai thứ đó thường nằm đúng ở các trường hợp biên. Ba việc còn lại là những chỗ nó làm rất tốt."
      },
      {
        "question": "Kỹ năng nền nào giữ được giá trị dù công cụ đổi thế nào?",
        "options": [
          "Đọc hiểu mã người khác viết, gỡ lỗi có phương pháp, và biết mô tả đúng bài toán",
          "Thuộc cú pháp của nhiều ngôn ngữ lập trình khác nhau để chuyển đổi linh hoạt",
          "Nhớ được các hàm trong thư viện chuẩn và tham số của chúng mà không cần phải tra cứu lại",
          "Gõ phím nhanh và thành thạo các phím tắt của trình soạn thảo đang dùng"
        ],
        "correct": 0,
        "explanation": "Ba kỹ năng này đều là thứ công cụ hỗ trợ chứ không thay thế được, và chúng còn giá trị hơn khi có công cụ - vì lúc đó bạn phải đánh giá nhiều mã hơn trong cùng thời gian."
      },
      {
        "question": "Cách dùng công cụ nào giữ được kỹ năng nền?",
        "options": [
          "Tự nghĩ cách giải trước, rồi mới so với thứ công cụ đưa ra",
          "Chỉ dùng công cụ cho những phần việc lặp lại, còn phần khó thì tự viết",
          "Đặt giới hạn về số dòng mã mà công cụ được phép sinh ra trong mỗi lần",
          "Định kỳ dành thời gian viết mã hoàn toàn thủ công để duy trì kỹ năng"
        ],
        "correct": 0,
        "explanation": "Nó giữ được cả tốc độ lẫn kỹ năng, và còn thêm một lợi ích nữa: khi cách của công cụ khác cách của bạn, chỗ khác biệt đó thường là chỗ bạn học được nhiều nhất. Ba cách kia đều đánh đổi tốc độ để giữ kỹ năng."
      },
      {
        "question": "Vì sao lệ thuộc công cụ nguy hiểm nhất ở lúc có sự cố?",
        "options": [
          "Vì lúc đó bài toán nằm ngoài thứ công cụ xử lý được, và bạn không có nền để dựa vào",
          "Vì các công cụ hỗ trợ thường không truy cập được vào hệ thống đang gặp sự cố",
          "Vì áp lực về thời gian khiến bạn không kịp chờ công cụ đưa ra câu trả lời đầy đủ cho mình",
          "Vì sự cố thường xảy ra ngoài giờ làm việc khi bạn không có sẵn công cụ bên cạnh"
        ],
        "correct": 0,
        "explanation": "Sự cố thật gần như luôn là tổ hợp riêng của hệ thống bạn - không có trong tài liệu nào và không giống bài toán nào công cụ từng thấy. Đó chính là lúc kỹ năng nền là thứ duy nhất còn lại."
      }
    ],
    "keyTakeaways": [
      "Ranh giới không phải dùng nhiều hay ít, mà là bạn có đánh giá được kết quả không.",
      "Công cụ giỏi tạo ra thứ trông đúng; nó yếu ở trường hợp biên của bài toán CỦA BẠN.",
      "Kỹ năng nền còn giá trị: đọc mã, gỡ lỗi có phương pháp, mô tả đúng bài toán.",
      "Tự nghĩ cách giải trước rồi mới so - giữ được cả tốc độ lẫn kỹ năng.",
      "Lúc có sự cố là lúc bài toán nằm ngoài thứ công cụ từng thấy."
    ],
    "practicePrompt": {
      "question": "Công cụ sinh ra một đoạn mã chạy đúng nhưng bạn không hiểu vì sao. Nên làm gì?",
      "options": [
        "Tìm hiểu cho hiểu trước khi đưa vào, hoặc thay bằng cách bạn hiểu được",
        "Dùng nó vì nó chạy đúng, và tìm hiểu sau khi đã hoàn thành công việc trước mắt",
        "Yêu cầu công cụ giải thích lại đoạn mã đó rồi dựa vào phần giải thích để dùng",
        "Viết thêm kiểm thử cho đoạn mã đó để chắc chắn nó hoạt động đúng trong mọi trường hợp"
      ],
      "correct": 0,
      "explanation": "Nhờ công cụ giải thích thì bạn lại đang đánh giá lời giải thích bằng cùng mức hiểu biết đang thiếu. Viết kiểm thử cũng vậy: bạn chỉ nghĩ ra được những trường hợp mà mình hiểu, đúng như bài về điểm mù đã chỉ ra."
    },
    "summary": {
      "keyIdea": "Công cụ làm bạn nhanh hơn ở thứ bạn hiểu, và nguy hiểm ở thứ bạn không hiểu.",
      "formula": "Tự nghĩ trước → so với công cụ → chỗ khác biệt là chỗ học được.",
      "commonMistake": "Đưa vào sản phẩm một đoạn mã chạy đúng mà mình không giải thích được.",
      "action": "Lần tới trước khi hỏi công cụ, viết ra cách bạn định làm - dù chỉ ba dòng."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Lần tới trước khi hỏi công cụ, dành hai phút viết ra cách bạn định làm - dù chỉ ba dòng gạch đầu dòng. Rồi mới hỏi, rồi so hai bên.",
      "secondary": "Chỗ hai cách khác nhau là chỗ đáng dừng lại lâu nhất: hoặc bạn học được một cách hay hơn, hoặc bạn phát hiện công cụ đang bỏ qua một ràng buộc mà chỉ bạn biết."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Rủi ro thứ hai của nghề này mới xuất hiện gần đây và ít ai gọi tên. Nó không đến từ làm việc quá sức mà từ một thứ có vẻ hoàn toàn tích cực: công cụ ngày càng tốt."
      },
      {
        "type": "heading",
        "text": "Ranh giới nằm ở đâu"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Tận dụng",
          "text": "Bạn nhanh hơn ở thứ bạn hiểu. Công cụ lo phần gõ và phần nhớ cú pháp, còn bạn vẫn đánh giá được kết quả đúng hay sai và vì sao."
        },
        "right": {
          "label": "Lệ thuộc",
          "text": "Bạn đưa vào sản phẩm một thứ bạn không hiểu. Khi nó hỏng theo cách công cụ không sửa được, bạn không có gì để dựa vào."
        }
      },
      {
        "type": "callout",
        "label": "Tỷ lệ không phải thước đo",
        "text": "Người hiểu rõ có thể để công cụ sinh chín mươi phần trăm mã mà vẫn an toàn. Người không hiểu thì mười phần trăm cũng đủ tạo ra một quả bom hẹn giờ. Câu hỏi luôn là bạn có ĐÁNH GIÁ được kết quả không."
      },
      {
        "type": "heading",
        "text": "Chỗ công cụ mạnh và chỗ nó yếu"
      },
      {
        "type": "paragraph",
        "text": "Nó rất giỏi tạo ra thứ trông đúng và chạy được với dữ liệu mẫu, viết đúng cú pháp, và giải thích một đoạn mã có sẵn. Nó yếu hơn hẳn ở việc biết trường hợp biên nào quan trọng trong bài toán CỦA BẠN - vì nó không biết bài toán của bạn, chỉ biết những bài toán trông giống vậy."
      },
      {
        "type": "paragraph",
        "text": "Khác biệt giữa bài toán của bạn và những bài toán trông giống vậy thường nằm đúng ở các trường hợp biên - tức đúng chỗ hay sinh ra sự cố."
      },
      {
        "type": "heading",
        "text": "Ba kỹ năng nền"
      },
      {
        "type": "list",
        "items": [
          "Đọc hiểu mã người khác viết. Có công cụ thì kỹ năng này còn quan trọng hơn, vì bạn phải đánh giá nhiều mã hơn trong cùng thời gian.",
          "Gỡ lỗi có phương pháp: thu hẹp dần phạm vi thay vì đoán. Sự cố thật là tổ hợp riêng của hệ thống bạn, không có trong tài liệu nào.",
          "Mô tả đúng bài toán. Đây cũng là kỹ năng quyết định chất lượng thứ bạn nhận lại từ công cụ."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Cách dùng giữ được cả tốc độ lẫn kỹ năng: tự nghĩ cách giải trước, rồi mới so với thứ công cụ đưa ra. Chỗ hai cách khác nhau thường là chỗ bạn học được nhiều nhất.",
          "Bài sau chuyển sang phần thân thể - thứ mà nghề ngồi tám tiếng trước màn hình đặt ra."
        ]
      }
    ]
  },
  {
    "id": 382,
    "slug": "tu-the-co-tay-va-man-hinh",
    "title": "Chặng 19, Bài 3: Tư thế, cổ tay và màn hình",
    "subtitle": "Chấn thương do lặp lại không đau lúc nó đang hình thành - đó là lý do nó phổ biến.",
    "duration": "6 phút",
    "difficulty": "Dễ",
    "emoji": "🪑",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Đây là nhóm rủi ro duy nhất trong chặng mà cách phòng đã được biết rõ, rẻ, và gần như không ai làm cho tới khi đã đau. Chi phí phòng tính bằng vài trăm nghìn; chi phí chữa tính bằng tháng nghỉ việc.",
    "openingQuestion": "Yếu tố nào quan trọng nhất để tránh đau do ngồi làm việc lâu?",
    "openingOptions": [
      "Đổi tư thế thường xuyên, vì không có tư thế nào đúng nếu giữ nguyên hàng giờ",
      "Ngồi đúng tư thế chuẩn với lưng thẳng và hai chân đặt vuông góc trên sàn",
      "Mua ghế công thái học chất lượng cao để nâng đỡ cột sống trong lúc làm việc",
      "Tập thể dục đều đặn ngoài giờ làm để tăng sức bền cho cơ lưng và cơ cổ"
    ],
    "correctOption": 0,
    "explanation": "Tư thế tốt nhất là tư thế tiếp theo. Cơ thể không được thiết kế để giữ nguyên một trạng thái hàng giờ, kể cả trạng thái được coi là đúng chuẩn - giữ nguyên tư thế chuẩn trong ba tiếng vẫn gây vấn đề. Ghế tốt và tập thể dục đều có ích thật, nhưng chúng không thay được việc đứng dậy, và người ta hay mua ghế rồi ngồi lì trên nó.",
    "diagram": [
      {
        "label": "Tư thế tốt nhất là tư thế TIẾP THEO",
        "arrow": true
      },
      {
        "label": "Mắt: nhìn xa hai mươi giây sau mỗi hai mươi phút",
        "arrow": true
      },
      {
        "label": "Cổ tay: thẳng hàng với cẳng tay, không gập lên",
        "arrow": true
      },
      {
        "label": "Đau ở đây là dấu hiệu muộn, không phải dấu hiệu đầu"
      }
    ],
    "realWorldExample": {
      "company": "Màn hình thấp là vấn đề phổ biến nhất",
      "description": "Máy tính xách tay đặt trên bàn luôn quá thấp, nên người dùng cúi cổ suốt ngày. Một cái giá kê máy cộng bàn phím rời giải quyết được gần hết vấn đề, và tổng chi phí thường ít hơn một bữa ăn ngoài - nhưng phần lớn người làm nghề vẫn không có."
    },
    "quiz": [
      {
        "question": "Vì sao chấn thương do lặp lại lại phổ biến trong nghề này?",
        "options": [
          "Vì nó không đau trong lúc đang hình thành, nên không có tín hiệu nào để dừng lại",
          "Vì lập trình viên thường làm việc liên tục nhiều giờ mà không có thời gian nghỉ",
          "Vì bàn phím và chuột thông thường không được thiết kế phù hợp với bàn tay người dùng",
          "Vì phần lớn người làm nghề không được đào tạo về an toàn lao động trước khi đi làm"
        ],
        "correct": 0,
        "explanation": "Đây là điểm khác biệt với chấn thương cấp tính: bong gân báo ngay, còn chấn thương do lặp lại thì tích tụ âm thầm rồi biểu hiện khi tổn thương đã đáng kể. Đó cũng là lý do đau ở đây là dấu hiệu MUỘN chứ không phải dấu hiệu đầu."
      },
      {
        "question": "Màn hình nên đặt ở độ cao nào?",
        "options": [
          "Cạnh trên ngang tầm mắt, để nhìn hơi chếch xuống và cổ giữ được ở tư thế trung tính",
          "Đặt chính giữa màn hình ngang tầm mắt, để không phải ngước lên hay cúi xuống chút nào cả",
          "Thấp hơn tầm mắt khoảng ba mươi độ, vì mắt nhìn xuống tự nhiên hơn nhìn ngang",
          "Cao hơn tầm mắt một chút, để cổ được kéo giãn ngược lại tư thế cúi khi gõ phím"
        ],
        "correct": 0,
        "explanation": "Máy tính xách tay đặt trên bàn luôn thấp hơn mức này khá nhiều, nên người dùng cúi cổ suốt ngày. Một cái giá kê máy cộng bàn phím rời giải quyết được gần hết, và tổng chi phí thường ít hơn một bữa ăn ngoài."
      },
      {
        "question": "Quy tắc hai mươi dành cho mắt nói gì?",
        "options": [
          "Mỗi hai mươi phút, nhìn ra xa khoảng sáu mét trong hai mươi giây",
          "Mỗi hai mươi phút, nhắm mắt nghỉ trong hai mươi giây để mắt được thư giãn",
          "Mỗi hai mươi phút, chớp mắt hai mươi lần liên tiếp để làm ẩm bề mặt mắt",
          "Sau hai mươi giờ làm việc mỗi tuần, nên có hai mươi phút nghỉ hoàn toàn"
        ],
        "correct": 0,
        "explanation": "Cơ chế là cho cơ điều tiết của mắt được thả lỏng, vì nhìn gần liên tục giữ nó ở trạng thái co suốt ngày. Chớp mắt cũng quan trọng - người nhìn màn hình chớp ít hơn hẳn bình thường - nhưng đó là một vấn đề khác về khô mắt."
      },
      {
        "question": "Cổ tay nên ở tư thế nào khi gõ phím?",
        "options": [
          "Thẳng hàng với cẳng tay, không gập lên cũng không bẻ sang hai bên",
          "Hơi gập lên một góc nhỏ để các ngón tay chạm phím dễ dàng hơn khi gõ",
          "Tựa hẳn lên miếng đệm kê tay trong suốt quá trình gõ để giảm mỏi cơ",
          "Nâng cao hơn khuỷu tay để máu lưu thông tốt hơn xuống bàn tay khi làm việc"
        ],
        "correct": 0,
        "explanation": "Miếng đệm kê tay là để nghỉ giữa các lần gõ chứ không phải để tựa lên trong lúc gõ - tựa lên khi đang gõ tạo áp lực đúng vào chỗ dây thần kinh đi qua cổ tay. Đây là chi tiết bị hiểu ngược rất phổ biến."
      },
      {
        "question": "Vì sao mua ghế tốt không đủ để giải quyết vấn đề?",
        "options": [
          "Vì không tư thế nào chịu được việc giữ nguyên hàng giờ, kể cả tư thế đúng chuẩn",
          "Vì ghế cần được điều chỉnh đúng theo số đo cơ thể mới phát huy được tác dụng",
          "Vì phần lớn vấn đề đến từ vị trí màn hình và bàn phím chứ không đến từ ghế ngồi",
          "Vì chất lượng ghế giảm dần theo thời gian nên tác dụng nâng đỡ cũng giảm theo"
        ],
        "correct": 0,
        "explanation": "Cái bẫy ở đây là tâm lý: mua ghế xong người ta thấy đã giải quyết xong vấn đề và ngồi lì trên nó lâu hơn trước. Ghế tốt làm việc ngồi lâu dễ chịu hơn, và đó vừa là lợi ích vừa là rủi ro."
      }
    ],
    "keyTakeaways": [
      "Tư thế tốt nhất là tư thế TIẾP THEO - giữ nguyên tư thế chuẩn hàng giờ vẫn gây vấn đề.",
      "Chấn thương do lặp lại không đau lúc hình thành, nên đau là dấu hiệu muộn.",
      "Cạnh trên màn hình ngang tầm mắt; máy tính xách tay đặt trên bàn luôn quá thấp.",
      "Cổ tay thẳng hàng với cẳng tay; đệm kê tay là để NGHỈ, không phải để tựa khi gõ.",
      "Ghế tốt làm ngồi lâu dễ chịu hơn - đó vừa là lợi ích vừa là rủi ro."
    ],
    "practicePrompt": {
      "question": "Bạn bắt đầu thấy tê nhẹ ở ngón tay sau vài giờ gõ phím. Nên hiểu thế nào?",
      "options": [
        "Đó là dấu hiệu muộn của một quá trình đã tích tụ, cần đổi cách làm việc ngay",
        "Đó là hiện tượng bình thường khi làm việc cường độ cao và sẽ tự hết sau khi nghỉ",
        "Đó là dấu hiệu thiếu vận động nói chung, cần tăng cường tập thể dục ngoài giờ",
        "Đó là do bàn phím không phù hợp, nên đổi sang loại bàn phím công thái học"
      ],
      "correct": 0,
      "explanation": "Vì quá trình này không đau lúc đang hình thành, tê là tín hiệu đầu tiên bạn nhận được chứ không phải khởi đầu của vấn đề. Đổi bàn phím có thể có ích nhưng nếu chỉ đổi thiết bị mà giữ nguyên nhịp làm việc thì chưa đủ."
    },
    "summary": {
      "keyIdea": "Cách phòng đã biết rõ và rất rẻ; vấn đề là gần như không ai làm cho tới khi đã đau.",
      "formula": "Đổi tư thế thường xuyên + màn hình ngang tầm mắt + cổ tay thẳng.",
      "commonMistake": "Mua ghế tốt rồi ngồi lì trên nó lâu hơn trước.",
      "action": "Đo chiều cao màn hình của bạn so với tầm mắt ngay bây giờ."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Ngồi vào chỗ làm việc và kiểm tra ba thứ: cạnh trên màn hình có ngang tầm mắt không, cổ tay có thẳng hàng với cẳng tay khi gõ không, và chân có chạm sàn không.",
      "secondary": "Nếu bạn dùng máy tính xách tay không có giá kê, đó gần như chắc chắn là vấn đề lớn nhất trong ba thứ trên - và cũng là thứ rẻ nhất để sửa."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Hai bài trước về đầu óc. Bài này về thân thể - nhóm rủi ro duy nhất trong chặng mà cách phòng đã được biết rõ, rất rẻ, và gần như không ai làm cho tới khi đã đau."
      },
      {
        "type": "heading",
        "text": "Vì sao không ai làm"
      },
      {
        "type": "callout",
        "label": "Nó không đau lúc đang hình thành",
        "text": "Bong gân báo ngay lập tức. Chấn thương do lặp lại thì tích tụ âm thầm qua nhiều tháng rồi mới biểu hiện, khi tổn thương đã đáng kể. Nên tê hay đau là tín hiệu ĐẦU TIÊN bạn nhận được, không phải khởi đầu của vấn đề."
      },
      {
        "type": "heading",
        "text": "Nguyên tắc quan trọng nhất"
      },
      {
        "type": "paragraph",
        "text": "Tư thế tốt nhất là tư thế TIẾP THEO. Cơ thể không được thiết kế để giữ nguyên một trạng thái hàng giờ, kể cả trạng thái được coi là đúng chuẩn - ngồi đúng chuẩn ba tiếng liền vẫn gây vấn đề."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Ghế tốt giúp được",
          "text": "Nó làm việc ngồi lâu dễ chịu hơn và nâng đỡ tốt hơn khi bạn ngồi đúng."
        },
        "right": {
          "label": "Và đó cũng là rủi ro",
          "text": "Mua ghế xong người ta thấy đã giải quyết xong vấn đề rồi ngồi lì trên nó lâu hơn trước. Thiết bị không thay được việc đứng dậy."
        }
      },
      {
        "type": "heading",
        "text": "Ba thứ chỉnh một lần"
      },
      {
        "type": "list",
        "items": [
          "Màn hình: cạnh TRÊN ngang tầm mắt, để nhìn hơi chếch xuống và cổ ở tư thế trung tính.",
          "Cổ tay: thẳng hàng với cẳng tay, không gập lên và không bẻ sang hai bên.",
          "Chân chạm sàn, đùi gần song song mặt sàn - nếu ghế quá cao thì cần một cái kê chân."
        ]
      },
      {
        "type": "paragraph",
        "text": "Mục đầu là vấn đề phổ biến nhất: máy tính xách tay đặt trên bàn LUÔN thấp hơn mức này khá nhiều. Một giá kê máy cộng bàn phím rời giải quyết gần hết, và tổng chi phí thường ít hơn một bữa ăn ngoài."
      },
      {
        "type": "paragraph",
        "text": "Một chi tiết bị hiểu ngược rất phổ biến: miếng đệm kê tay là để NGHỈ giữa các lần gõ, không phải để tựa lên trong lúc đang gõ - tựa lên khi gõ tạo áp lực đúng vào chỗ dây thần kinh đi qua cổ tay."
      },
      {
        "type": "closing",
        "lines": [
          "Còn mắt thì có một quy tắc dễ nhớ: mỗi hai mươi phút, nhìn ra xa khoảng sáu mét trong hai mươi giây, để cơ điều tiết được thả lỏng.",
          "Bài sau là phần khó hơn: nhịp làm việc, và vì sao nhiều giờ không đồng nghĩa với nhiều việc."
        ]
      }
    ]
  },
  {
    "id": 383,
    "slug": "nhip-lam-viec-ben",
    "title": "Chặng 19, Bài 4: Nhịp làm việc bền",
    "subtitle": "Số giờ ngồi trước máy và số giờ làm được việc là hai con số rất khác nhau.",
    "duration": "6 phút",
    "difficulty": "Trung bình",
    "emoji": "🌊",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Nghề này trả công cho tư duy chứ không cho thời gian có mặt, nhưng gần như mọi thói quen làm việc lại được xây quanh thời gian có mặt. Khoảng cách đó là chỗ năng suất và sức khoẻ cùng bị mất.",
    "openingQuestion": "Vì sao làm thêm giờ kéo dài lại phản tác dụng trong nghề này?",
    "openingOptions": [
      "Vì chất lượng quyết định giảm nhanh, và một quyết định sai tốn nhiều hơn số giờ tiết kiệm",
      "Vì luật lao động giới hạn số giờ làm thêm nên công ty không được phép kéo dài",
      "Vì làm thêm giờ khiến người lao động mất động lực và muốn tìm công việc khác",
      "Vì công việc dồn lại vào cuối dự án nên làm thêm sớm không giải quyết được gì"
    ],
    "correctOption": 0,
    "explanation": "Trong công việc chân tay, thêm giờ thì thêm sản lượng theo tỷ lệ khá thẳng. Trong công việc tư duy thì không: giờ thứ mười một tạo ra mã mà giờ thứ nhất của ngày hôm sau phải sửa. Đây là lý do các đo lường trong ngành cho thấy làm thêm giờ kéo dài không tăng được tổng sản lượng, chỉ chuyển thời gian từ cột này sang cột kia.",
    "diagram": [
      {
        "label": "Trả công cho tư duy, không cho thời gian có mặt",
        "arrow": true
      },
      {
        "label": "Tập trung sâu: vài giờ mỗi ngày là mức thật",
        "arrow": true
      },
      {
        "label": "Cắt vụn tốn hơn tổng thời gian bị cắt",
        "arrow": true
      },
      {
        "label": "Bảo vệ khối thời gian liền mạch, không bảo vệ tổng giờ"
      }
    ],
    "realWorldExample": {
      "company": "Chi phí của một lần bị ngắt",
      "description": "Một tin nhắn mất ba mươi giây để đọc và trả lời, nhưng việc lấy lại trạng thái tập trung sâu mất lâu hơn nhiều lần. Đó là lý do một ngày có năm cuộc họp rải rác gây thiệt hại lớn hơn nhiều so với một ngày có năm cuộc họp liền nhau."
    },
    "quiz": [
      {
        "question": "Vì sao một ngày có nhiều cuộc họp rải rác tệ hơn nhiều cuộc họp liền nhau?",
        "options": [
          "Vì mỗi khoảng trống giữa hai cuộc họp quá ngắn để vào lại trạng thái tập trung sâu",
          "Vì họp rải rác khiến người tham gia mệt hơn hẳn do phải chuyển đổi bối cảnh liên tục cả ngày",
          "Vì các cuộc họp liền nhau thường ngắn hơn do người tham gia muốn kết thúc sớm",
          "Vì họp rải rác làm lịch làm việc khó dự đoán nên khó lên kế hoạch cho công việc"
        ],
        "correct": 0,
        "explanation": "Bốn mươi phút giữa hai cuộc họp gần như không dùng được cho công việc cần tập trung, dù trên lịch nó vẫn hiện ra là thời gian trống. Đây là lý do gom họp lại thành một khối là thay đổi rẻ nhất mà có tác dụng lớn nhất."
      },
      {
        "question": "Số giờ tập trung sâu thật sự mà một người duy trì được mỗi ngày là bao nhiêu?",
        "options": [
          "Vài giờ, và con số này khá ổn định dù tổng thời gian làm việc dài bao nhiêu",
          "Khoảng tám giờ, tương ứng với một ngày làm việc tiêu chuẩn ở hầu hết nơi làm việc",
          "Tuỳ từng người, có người duy trì được cả ngày nếu đã rèn luyện đủ lâu",
          "Khoảng sáu giờ, và có thể tăng dần lên nếu luyện tập một cách có hệ thống"
        ],
        "correct": 0,
        "explanation": "Chữ ỔN ĐỊNH là phần quan trọng: kéo dài ngày làm việc không kéo dài được con số này. Nó chỉ thêm giờ ở trạng thái tập trung nông, và giờ ở trạng thái đó tạo ra thứ mà hôm sau bạn phải sửa."
      },
      {
        "question": "Cách bảo vệ thời gian tập trung nào hiệu quả nhất?",
        "options": [
          "Giữ một khối liền mạch trong ngày và bảo vệ đúng khối đó, thay vì bảo vệ tổng số giờ",
          "Tắt mọi thông báo trong suốt cả ngày làm việc để không bị ngắt quãng lần nào",
          "Đặt ra quy định chung cho cả đội về khung giờ không được phép trao đổi với nhau",
          "Ghi lại thời gian mình bị ngắt quãng để biết ai đang làm phiền nhiều nhất"
        ],
        "correct": 0,
        "explanation": "Bảo vệ một khối là thứ có thể thoả thuận được với đội; tắt thông báo cả ngày thì không bền vì công việc thật vẫn cần trao đổi. Đây là khác biệt giữa một thay đổi duy trì được và một quyết tâm kéo dài ba ngày."
      },
      {
        "question": "Vì sao nghỉ ngắn giữa các phiên làm việc lại quan trọng?",
        "options": [
          "Vì khả năng tập trung giảm dần trong một phiên, và nghỉ ngắn nạp lại được phần đó",
          "Vì cơ thể cần vận động để tránh các vấn đề về tư thế và tuần hoàn máu",
          "Vì nghỉ ngắn giúp bạn có thời gian xử lý các tin nhắn và thư đã tích tụ lại",
          "Vì các nghiên cứu đã cho thấy một phiên làm việc không nên kéo dài quá một khoảng nhất định"
        ],
        "correct": 0,
        "explanation": "Vận động cũng là lý do thật và nó nối với bài trước, nhưng cơ chế chính ở đây là nhận thức. Điểm cần chú ý là nghỉ phải THẬT SỰ nghỉ - chuyển sang đọc tin tức hay mạng xã hội thì não vẫn đang xử lý thông tin."
      },
      {
        "question": "Dấu hiệu nào cho thấy bạn đang làm nhiều giờ mà không hiệu quả?",
        "options": [
          "Bạn dành phần lớn ngày hôm sau để sửa những gì mình làm vào cuối ngày hôm trước",
          "Bạn cảm thấy mệt mỏi vào cuối ngày làm việc dù đã hoàn thành các nhiệm vụ",
          "Bạn phải mang việc về nhà làm thêm vào buổi tối để kịp tiến độ mà mình đã cam kết trước đó",
          "Bạn không có thời gian tham gia các hoạt động chung của đội trong giờ làm việc"
        ],
        "correct": 0,
        "explanation": "Đây là dấu hiệu đo được chứ không phải cảm giác, và nó chỉ thẳng vào cơ chế: giờ làm thêm không tạo ra sản lượng mà chỉ chuyển công việc sang ngày hôm sau dưới dạng việc phải sửa."
      }
    ],
    "keyTakeaways": [
      "Giờ thứ mười một tạo ra mã mà giờ thứ nhất của ngày hôm sau phải sửa.",
      "Tập trung sâu chỉ được vài giờ mỗi ngày, và kéo dài ngày làm việc không tăng con số đó.",
      "Bốn mươi phút giữa hai cuộc họp gần như không dùng được, dù lịch hiện là trống.",
      "Bảo vệ một KHỐI liền mạch, đừng bảo vệ tổng số giờ - khối thì thoả thuận được.",
      "Nghỉ phải thật sự nghỉ; đọc tin tức thì não vẫn đang xử lý thông tin."
    ],
    "practicePrompt": {
      "question": "Lịch của bạn có bốn cuộc họp rải đều trong ngày. Đề nghị nào cải thiện nhiều nhất?",
      "options": [
        "Gom cả bốn vào một buổi, để buổi còn lại là một khối liền mạch",
        "Rút ngắn mỗi cuộc họp xuống một nửa thời gian để có thêm giờ làm việc",
        "Bỏ bớt hai cuộc họp ít quan trọng nhất và nhận biên bản thay vì tham dự",
        "Chuyển các cuộc họp sang hình thức trao đổi bằng văn bản để chủ động thời gian"
      ],
      "correct": 0,
      "explanation": "Rút ngắn hay bỏ bớt vẫn để lại lịch bị cắt vụn, và các khoảng trống còn lại vẫn quá ngắn để vào lại trạng thái tập trung. Gom lại không tốn thêm gì của ai mà tạo ra một khối liền mạch - đó là lý do nó là thay đổi rẻ nhất trong bốn cách."
    },
    "summary": {
      "keyIdea": "Nghề này trả công cho tư duy, còn thói quen làm việc lại được xây quanh thời gian có mặt.",
      "formula": "Bảo vệ khối liền mạch > tổng số giờ. Gom họp > rút ngắn họp.",
      "commonMistake": "Đo công việc bằng số giờ ngồi trước máy thay vì bằng thứ làm xong.",
      "action": "Nhìn lịch tuần tới và tìm ngày nào có thể gom họp lại để lấy một khối liền."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Mở lịch tuần tới và tìm một ngày bị cắt vụn nhất. Thử dời các cuộc họp lại gần nhau để lấy được một khối liền mạch ít nhất ba tiếng.",
      "secondary": "Nếu bạn không tự dời được, đề nghị người tổ chức - lý do gom lại để có khối làm việc liền là lý do gần như ai cũng hiểu và ít khi bị từ chối."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bài trước về thân thể trong lúc làm việc. Bài này về nhịp của chính công việc đó, và về khoảng cách giữa hai con số mà người ta hay nhầm là một."
      },
      {
        "type": "heading",
        "text": "Hai con số khác nhau"
      },
      {
        "type": "callout",
        "label": "Giờ có mặt và giờ làm được việc",
        "text": "Nghề này trả công cho tư duy chứ không cho thời gian có mặt, nhưng gần như mọi thói quen làm việc lại được xây quanh thời gian có mặt. Số giờ tập trung sâu thật sự mà một người duy trì được là vài giờ mỗi ngày, và con số đó khá ổn định dù bạn ngồi bao lâu."
      },
      {
        "type": "paragraph",
        "text": "Từ đó ra hệ quả về làm thêm giờ. Trong công việc chân tay, thêm giờ thì thêm sản lượng khá thẳng. Trong công việc tư duy thì giờ thứ mười một tạo ra mã mà giờ thứ nhất của ngày hôm sau phải sửa - tổng sản lượng không tăng, chỉ chuyển từ cột này sang cột kia."
      },
      {
        "type": "heading",
        "text": "Chi phí của việc bị cắt vụn"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Bạn nghĩ",
          "text": "Một tin nhắn mất ba mươi giây, một cuộc họp mất ba mươi phút. Cộng lại là chi phí của chúng."
        },
        "right": {
          "label": "Thực tế",
          "text": "Việc lấy lại trạng thái tập trung sâu mất lâu hơn nhiều lần so với bản thân lần ngắt. Bốn mươi phút giữa hai cuộc họp gần như không dùng được, dù trên lịch nó vẫn hiện là thời gian trống."
        }
      },
      {
        "type": "paragraph",
        "text": "Vì vậy một ngày có năm cuộc họp rải rác gây thiệt hại lớn hơn nhiều so với một ngày có năm cuộc họp liền nhau - dù tổng thời gian họp bằng nhau. Gom họp lại thành một khối là thay đổi rẻ nhất mà có tác dụng lớn nhất trong cả bài."
      },
      {
        "type": "heading",
        "text": "Bảo vệ khối, đừng bảo vệ tổng"
      },
      {
        "type": "list",
        "items": [
          "Giữ một khối liền mạch trong ngày và bảo vệ đúng khối đó. Khối thì thoả thuận được với đội; tắt thông báo cả ngày thì không bền.",
          "Nghỉ ngắn giữa các phiên, và nghỉ phải THẬT SỰ nghỉ - chuyển sang đọc tin tức thì não vẫn đang xử lý thông tin.",
          "Để việc không cần tập trung sâu vào phần ngày đã bị cắt vụn sẵn: trả lời tin nhắn, rà soát mã, cập nhật tài liệu."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Dấu hiệu đo được cho việc bạn đang làm nhiều giờ mà không hiệu quả: bạn dành phần lớn ngày hôm sau để sửa những gì mình làm vào cuối ngày hôm trước.",
          "Bài cuối chặng gom bốn bài lại thành một danh sách kiểm chạy được hằng tuần."
        ]
      }
    ]
  },
  {
    "id": 384,
    "slug": "danh-sach-kiem-suc-khoe-nghe-nghiep",
    "title": "Chặng 19, Bài 5: Tổng kết - danh sách kiểm sức khoẻ nghề nghiệp",
    "subtitle": "Bốn rủi ro, và bốn thứ kiểm tra được trong mười phút mỗi tuần.",
    "duration": "5 phút",
    "difficulty": "Dễ",
    "emoji": "🏁",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Cả bốn rủi ro trong chặng đều có chung một tính chất: chúng tích tụ âm thầm và chỉ báo khi đã muộn. Một danh sách kiểm ngắn chạy đều còn hơn nhiều so với sự cảnh giác, vì cảnh giác cũng cạn.",
    "openingQuestion": "Điểm chung của cả bốn rủi ro trong chặng này là gì?",
    "openingOptions": [
      "Chúng tích tụ âm thầm và chỉ phát tín hiệu khi tổn thương đã đáng kể",
      "Chúng đều bắt nguồn từ việc làm việc quá nhiều giờ trong thời gian dài",
      "Chúng đều có thể phòng tránh hoàn toàn nếu công ty có chính sách phù hợp",
      "Chúng đều xuất hiện rõ rệt hơn khi người làm nghề bước qua tuổi trung niên"
    ],
    "correctOption": 0,
    "explanation": "Kiệt sức có ba biểu hiện mà biểu hiện đầu bị nhầm với mệt thường. Lệ thuộc công cụ chỉ lộ ra khi có sự cố. Chấn thương do lặp lại không đau lúc đang hình thành. Và nhịp làm việc kém thì biểu hiện thành công việc phải sửa lại chứ không thành cảm giác nào rõ ràng. Chính tính chất chung đó là lý do một danh sách kiểm chạy đều hiệu quả hơn sự cảnh giác.",
    "diagram": [
      {
        "label": "Kiệt sức: mức kiểm soát, không phải số giờ",
        "arrow": true
      },
      {
        "label": "Công cụ: bạn còn đánh giá được kết quả không?",
        "arrow": true
      },
      {
        "label": "Thân thể: đổi tư thế, màn hình ngang mắt, cổ tay thẳng",
        "arrow": true
      },
      {
        "label": "Nhịp: một khối liền mạch mỗi ngày"
      }
    ],
    "realWorldExample": {
      "company": "Vì sao danh sách kiểm hơn cảnh giác",
      "description": "Cảnh giác đòi bạn nhớ ra đúng lúc, mà đúng lúc là khi bạn đang bận và mệt - tức là lúc trí nhớ hoạt động kém nhất. Danh sách kiểm chạy vào một thời điểm cố định thì không phụ thuộc vào việc bạn có nhớ hay không."
    },
    "quiz": [
      {
        "question": "Vì sao danh sách kiểm hiệu quả hơn việc tự nhắc mình cảnh giác?",
        "options": [
          "Vì cảnh giác đòi bạn nhớ ra đúng lúc bạn đang bận và mệt nhất",
          "Vì danh sách kiểm bao quát được nhiều loại rủi ro hơn hẳn so với trí nhớ của một người",
          "Vì danh sách kiểm có thể chia sẻ cho cả đội cùng thực hiện một cách đồng bộ",
          "Vì việc ghi lại kết quả kiểm tra giúp theo dõi được xu hướng qua thời gian"
        ],
        "correct": 0,
        "explanation": "Đây là cùng lập luận với bốn cơ chế chống thiên kiến ở chặng rà soát code: thứ có tác dụng là thứ không đòi bạn nhận ra đúng lúc. Ba lợi ích còn lại đều có thật nhưng chúng là lợi ích phụ."
      },
      {
        "question": "Câu hỏi nào kiểm tra được nguy cơ kiệt sức nhanh nhất?",
        "options": [
          "Tuần qua tôi có quyền quyết gì trong công việc của mình, và điều đó có đang giảm không",
          "Tuần qua tôi đã làm bao nhiêu giờ, và con số đó có tăng so với các tuần trước không",
          "Tuần qua tôi có cảm thấy mệt mỏi vào cuối ngày làm việc thường xuyên không",
          "Tuần qua tôi có hoàn thành được các mục tiêu đã đặt ra từ đầu tuần không"
        ],
        "correct": 0,
        "explanation": "Vì mức kiểm soát mới là yếu tố dự báo nên câu hỏi phải nhắm vào đó. Câu về số giờ nghe hợp lý nhất nhưng nó đo sai thứ - đúng cái nhầm lẫn mà bài đầu chặng đã chỉ ra."
      },
      {
        "question": "Câu hỏi nào kiểm tra được mức lệ thuộc công cụ?",
        "options": [
          "Tuần qua tôi có đưa vào sản phẩm đoạn mã nào mà mình không giải thích được không",
          "Tuần qua tôi đã dùng công cụ hỗ trợ cho bao nhiêu phần trăm khối lượng công việc",
          "Tuần qua tôi có gặp trường hợp nào mà công cụ đưa ra kết quả sai hoàn toàn không",
          "Tuần qua tôi có dành thời gian tự viết mã mà không dùng tới công cụ hỗ trợ không"
        ],
        "correct": 0,
        "explanation": "Tỷ lệ sử dụng không nói lên gì - người hiểu rõ có thể để công cụ sinh phần lớn mã mà vẫn an toàn. Câu hỏi phải nhắm vào khả năng đánh giá, và cách kiểm tra khả năng đó là thử giải thích."
      },
      {
        "question": "Vì sao nên chọn một thay đổi thay vì làm cả bốn cùng lúc?",
        "options": [
          "Vì làm bốn cùng lúc thì vài tuần sau bạn duy trì được không cái nào",
          "Vì mỗi thay đổi cần thời gian để thấy được kết quả nên phải làm lần lượt",
          "Vì bốn rủi ro có mức độ nghiêm trọng khác nhau nên cần xử lý theo thứ tự ưu tiên",
          "Vì thay đổi nhiều thứ cùng lúc khiến bạn không biết thứ nào mang lại hiệu quả"
        ],
        "correct": 0,
        "explanation": "Đây là cùng kết luận với bài tổng kết chặng rà soát code, và nó lặp lại vì nó là sai lầm phổ biến nhất khi đọc xong một danh sách các thứ nên làm. Việc không biết thứ nào hiệu quả là vấn đề thật nhưng nhỏ hơn nhiều."
      },
      {
        "question": "Thay đổi nào trong chặng này rẻ nhất so với tác dụng nó mang lại?",
        "options": [
          "Nâng màn hình lên ngang tầm mắt, vì nó tốn ít tiền và chỉ phải làm đúng một lần",
          "Gom các cuộc họp trong ngày lại thành một khối để lấy thời gian liền mạch",
          "Tự nghĩ cách giải trước khi hỏi công cụ để giữ được kỹ năng nền của mình",
          "Giành lại quyền quyết ở một phần công việc để giảm nguy cơ kiệt sức về lâu dài"
        ],
        "correct": 0,
        "explanation": "Điểm phân biệt là ba thay đổi kia đều đòi duy trì hằng ngày hoặc đòi thoả thuận với người khác. Nâng màn hình thì làm một lần rồi nó tự có tác dụng mãi mãi mà không cần bạn nhớ tới nó nữa."
      }
    ],
    "keyTakeaways": [
      "Cả bốn rủi ro đều tích tụ âm thầm và chỉ báo khi đã muộn.",
      "Danh sách kiểm hơn cảnh giác, vì cảnh giác đòi bạn nhớ ra đúng lúc đang bận nhất.",
      "Kiệt sức hỏi về mức KIỂM SOÁT, không hỏi về số giờ.",
      "Lệ thuộc công cụ hỏi về khả năng GIẢI THÍCH, không hỏi về tỷ lệ sử dụng.",
      "Chọn MỘT thay đổi - làm bốn cùng lúc thì vài tuần sau không duy trì được cái nào."
    ],
    "practicePrompt": {
      "question": "Bạn muốn bắt đầu bằng một thay đổi duy nhất. Nên chọn theo tiêu chí nào?",
      "options": [
        "Chọn cái làm một lần rồi có tác dụng mãi, thay vì cái đòi duy trì hằng ngày",
        "Chọn cái nhắm vào đúng rủi ro mà bạn đang có nhiều dấu hiệu nhất trong cả bốn cái",
        "Chọn cái dễ thực hiện nhất để tạo đà rồi mới chuyển sang những cái khó hơn",
        "Chọn cái mà đội của bạn cũng đang quan tâm để có thêm sự hỗ trợ từ mọi người"
      ],
      "correct": 0,
      "explanation": "Lựa chọn thứ hai nghe đúng nhất nhưng nó bỏ qua vấn đề duy trì - mà duy trì mới là chỗ phần lớn nỗ lực thất bại. Một thay đổi một lần thì không cần bạn nhớ tới nó nữa, nên nó không cạnh tranh với bất cứ thứ gì."
    },
    "summary": {
      "keyIdea": "Bốn rủi ro cùng một tính chất: tích tụ âm thầm, báo khi đã muộn.",
      "formula": "Danh sách kiểm chạy đều > cảnh giác, vì cảnh giác cũng cạn.",
      "commonMistake": "Đọc xong bốn bài rồi quyết tâm làm cả bốn thứ cùng lúc.",
      "action": "Chạy bốn câu hỏi kiểm tra và chọn đúng một thay đổi."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Chạy bốn câu hỏi: tuần qua tôi có quyền quyết gì, tôi có đưa vào sản phẩm thứ gì mình không giải thích được, màn hình có ngang tầm mắt, và tôi có được khối liền mạch nào không.",
      "secondary": "Rồi chọn ĐÚNG MỘT thay đổi. Nếu phải gợi ý: nâng màn hình lên ngang tầm mắt, vì đó là thứ duy nhất làm một lần rồi có tác dụng mãi mà không cần bạn nhớ tới nữa."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chặng này đi qua bốn rủi ro mà nghề lập trình đặt lên người làm nghề: kiệt sức, lệ thuộc công cụ, chấn thương do lặp lại, và nhịp làm việc kém."
      },
      {
        "type": "heading",
        "text": "Điểm chung của cả bốn"
      },
      {
        "type": "callout",
        "label": "Chúng chỉ báo khi đã muộn",
        "text": "Kiệt sức có biểu hiện đầu bị nhầm với mệt thường. Lệ thuộc công cụ chỉ lộ ra khi có sự cố. Chấn thương do lặp lại không đau lúc đang hình thành. Nhịp làm việc kém biểu hiện thành công việc phải sửa lại chứ không thành cảm giác nào rõ ràng."
      },
      {
        "type": "paragraph",
        "text": "Chính vì vậy mà một danh sách kiểm chạy đều hiệu quả hơn sự cảnh giác. Cảnh giác đòi bạn nhớ ra đúng lúc, mà đúng lúc là khi bạn đang bận và mệt - tức là lúc trí nhớ hoạt động kém nhất."
      },
      {
        "type": "heading",
        "text": "Bốn câu hỏi, mười phút mỗi tuần"
      },
      {
        "type": "conceptTable",
        "title": "Mỗi câu nhắm vào một rủi ro",
        "concepts": [
          {
            "vi": "Kiểm soát",
            "en": "autonomy",
            "def": "Tuần qua tôi có quyền quyết gì trong công việc của mình, và điều đó có đang giảm không? Hỏi về kiểm soát, KHÔNG hỏi về số giờ."
          },
          {
            "vi": "Đánh giá được",
            "en": "judgement",
            "def": "Tôi có đưa vào sản phẩm đoạn mã nào mà mình không giải thích được không? Hỏi về khả năng giải thích, không hỏi về tỷ lệ dùng công cụ."
          },
          {
            "vi": "Thân thể",
            "en": "ergonomics",
            "def": "Màn hình có ngang tầm mắt, cổ tay có thẳng, tôi có đứng dậy đủ không? Ba thứ kiểm tra trong ba mươi giây."
          },
          {
            "vi": "Khối liền mạch",
            "en": "focus block",
            "def": "Tuần qua tôi có được bao nhiêu khối liền mạch trên ba tiếng? Nếu con số là không, đó là chỗ cần sửa trước."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Và chọn đúng một thứ"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Thứ làm một lần",
          "text": "Nâng màn hình lên ngang tầm mắt. Làm một lần rồi nó tự có tác dụng mãi mãi, không cần bạn nhớ tới nó nữa - nên nó không cạnh tranh với bất cứ thứ gì."
        },
        "right": {
          "label": "Thứ phải duy trì",
          "text": "Gom họp, tự nghĩ trước khi hỏi công cụ, giành lại quyền quyết. Tác dụng lớn hơn, nhưng chúng đòi duy trì hằng ngày hoặc đòi thoả thuận với người khác."
        }
      },
      {
        "type": "closing",
        "lines": [
          "Đọc xong bốn bài rồi quyết tâm làm cả bốn thứ cùng lúc là sai lầm phổ biến nhất - vài tuần sau bạn duy trì được không cái nào. Đây là cùng kết luận với chặng rà soát code, và nó lặp lại vì cùng một lý do.",
          "Nếu phải gợi ý một thứ để bắt đầu: cột bên trái. Nó rẻ nhất so với tác dụng, và nó không đòi gì ở bạn sau lần đầu."
        ]
      }
    ]
  },
];
