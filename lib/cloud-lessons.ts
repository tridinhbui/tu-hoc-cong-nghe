import type { Lesson } from "./lesson-types";

// Chặng 13 của track cá nhân: đám mây và hạ tầng thuê ngoài.
//
// VÌ SAO CHẶNG NÀY TỒN TẠI. Chặng 9 dừng ở chỗ đưa được sản phẩm lên một máy
// chủ. Chặng này là câu hỏi tiếp theo và là câu hỏi tốn tiền nhất: máy chủ đó
// nên sống ở đâu, ai vận hành nó, và bạn đang trả thêm cho tính chất nào.
//
// Ids 320-327 nối tiếp Chặng 12 (310-319) trong dải 299-800.
// Tám điểm nối phải cập nhật cùng lúc - xem chú thích đầu
// lib/income-growth-lessons.ts và lib/personal-banking-lessons.ts.
//
// Tệp này trước đây tên gold-fx-lessons.ts và chứa tám bài về vàng, ngoại tệ
// và tỷ giá. Đổi tên cùng lúc với nội dung: một tệp tên gold-fx chứa bài về
// đám mây là đúng cái bẫy mà AGENTS.md ghi lại nhiều lần - tên cũ sống sót
// qua lần chuyển đổi rồi đánh lừa người đọc sau.

export const CLOUD_LESSONS: Lesson[] = [
  {
    "id": 320,
    "slug": "dam-may-thuc-chat-la-gi",
    "title": "Chặng 13, Bài 1: Đám mây thực chất là gì",
    "subtitle": "Vẫn là máy tính của ai đó - nhưng cách bạn trả tiền cho nó thì khác hẳn.",
    "duration": "6 phút",
    "difficulty": "Dễ",
    "emoji": "☁️",
    "track": "personal",
    "isFundamental": true,
    "whyItMatters": "Hiểu đám mây bán cái gì giúp bạn biết khi nào nó đáng tiền và khi nào không. Rất nhiều dự án nhỏ trả gấp ba lần cần thiết vì mua thứ được thiết kế cho một bài toán họ không có.",
    "openingQuestion": "Thứ đám mây thật sự bán cho bạn là gì?",
    "openingOptions": [
      "Khả năng lấy thêm và trả lại tài nguyên trong vài phút, thay vì mua máy trước nhiều tháng",
      "Máy chủ mạnh hơn và ổn định hơn so với máy chủ mà bạn tự mua về đặt tại chỗ",
      "Dịch vụ vận hành trọn gói nên bạn không cần biết gì về hệ thống bên dưới nữa",
      "Chi phí hạ tầng thấp hơn nhờ nhà cung cấp mua thiết bị với số lượng rất lớn"
    ],
    "correctOption": 0,
    "explanation": "Máy trong trung tâm dữ liệu của nhà cung cấp không mạnh hơn máy bạn mua được, và tính theo giờ thì nó đắt hơn. Thứ bạn mua là tính CO GIÃN: mở thêm hai mươi máy trong năm phút cho đợt cao điểm rồi trả lại. Với ai không cần co giãn thì đám mây là lựa chọn đắt tiền, và đó là lý do rất nhiều dự án nhỏ trả nhiều hơn mức cần.",
    "diagram": [
      {
        "label": "Không phải: máy mạnh hơn hay rẻ hơn tính theo giờ",
        "arrow": true
      },
      {
        "label": "Mà là: lấy thêm và trả lại trong vài phút",
        "arrow": true
      },
      {
        "label": "Bạn trả giá cao hơn để đổi lấy tính co giãn",
        "arrow": true
      },
      {
        "label": "Không cần co giãn thì đó là món đắt tiền"
      }
    ],
    "realWorldExample": {
      "company": "Chuyển ngược về máy thuê",
      "description": "Một số công ty có lưu lượng ổn định đã chuyển ngược từ đám mây về máy chủ thuê và cắt được phần lớn hoá đơn. Điều đó không có nghĩa đám mây là sai - nó có nghĩa họ đang trả cho tính co giãn mà mô hình kinh doanh của họ không dùng tới."
    },
    "quiz": [
      {
        "question": "Vì sao đám mây đắt hơn nếu tính theo giờ máy chạy?",
        "options": [
          "Vì giá đã bao gồm phần dự phòng để bạn lấy thêm máy bất cứ lúc nào bạn cần",
          "Vì nhà cung cấp phải bù đắp chi phí cho các trung tâm dữ liệu đặt ở rất nhiều quốc gia",
          "Vì phần lớn khách hàng dùng ít hơn mức đăng ký nên nhà cung cấp bù chéo qua lại",
          "Vì thiết bị trong trung tâm dữ liệu đám mây thuộc loại cao cấp hơn thiết bị phổ thông"
        ],
        "correct": 0,
        "explanation": "Bạn đang mua một quyền chọn chứ không chỉ mua thời gian máy chạy: quyền mở thêm hai mươi máy trong năm phút. Quyền đó có giá, và bạn trả nó ngay cả trong những tháng không dùng tới."
      },
      {
        "question": "Khi nào đám mây rõ ràng đáng tiền?",
        "options": [
          "Khi lưu lượng thất thường, hoặc khi bạn chưa biết mình cần bao nhiêu tài nguyên",
          "Khi bạn cần hệ thống chạy liên tục và không được phép gián đoạn dịch vụ",
          "Khi dự án còn nhỏ nên chi phí hạ tầng chưa phải là khoản đáng kể trong ngân sách",
          "Khi đội của bạn đã quen với các công cụ và giao diện của nhà cung cấp đó rồi"
        ],
        "correct": 0,
        "explanation": "Cả hai vế đều là dạng của cùng một thứ: không biết trước nhu cầu. Chạy liên tục thì máy thuê cũng làm được, và đôi khi còn rẻ hơn nhiều vì lưu lượng ổn định là trường hợp đám mây kém lợi thế nhất."
      },
      {
        "question": "Ràng buộc nhà cung cấp nghĩa là gì?",
        "options": [
          "Bạn dùng nhiều dịch vụ riêng của họ tới mức chuyển đi sẽ phải viết lại phần lớn hệ thống",
          "Hợp đồng buộc bạn phải sử dụng dịch vụ trong một số năm tối thiểu nhất định",
          "Dữ liệu của bạn bị lưu ở định dạng riêng nên không xuất ra được khi muốn rời đi",
          "Nhà cung cấp có quyền từ chối phục vụ nếu bạn đồng thời sử dụng dịch vụ của một đối thủ cạnh tranh"
        ],
        "correct": 0,
        "explanation": "Nó tích tụ dần chứ không phải một quyết định: mỗi lần bạn dùng thêm một dịch vụ riêng vì nó tiện, chi phí rời đi lại tăng lên. Khoá dữ liệu cũng có thật ở một số dịch vụ, nhưng nó hẹp hơn nhiều so với cơ chế chính."
      },
      {
        "question": "Vì sao nói đám mây vẫn là máy tính của ai đó?",
        "options": [
          "Vì mọi giới hạn vật lý vẫn còn nguyên: máy vẫn hỏng, đĩa vẫn đầy, mạng vẫn có độ trễ",
          "Vì nhà cung cấp vẫn dùng cùng loại phần cứng phổ thông như máy chủ thông thường",
          "Vì bạn vẫn phải tự cài đặt hệ điều hành và các phần mềm cần thiết cho ứng dụng",
          "Vì quyền sở hữu thiết bị vẫn luôn thuộc về nhà cung cấp chứ không hề chuyển sang cho bạn"
        ],
        "correct": 0,
        "explanation": "Câu này quan trọng vì nó chặn một hiểu lầm phổ biến: đám mây không xoá bỏ được ràng buộc vật lý nào cả. Nó chỉ làm cho việc thay một máy hỏng trở nên nhanh và tự động, chứ không làm máy ngừng hỏng."
      },
      {
        "question": "Vì sao một số công ty chuyển ngược từ đám mây về máy thuê?",
        "options": [
          "Vì lưu lượng của họ ổn định nên họ đang trả cho tính co giãn mà không dùng tới",
          "Vì các quy định về dữ liệu buộc họ phải tự quản lý lấy toàn bộ phần hạ tầng của mình",
          "Vì đội kỹ thuật của họ đủ lớn nên tự vận hành sẽ nhanh hơn là dùng dịch vụ ngoài",
          "Vì các nhà cung cấp đám mây liên tục tăng giá khiến chi phí vượt quá ngân sách"
        ],
        "correct": 0,
        "explanation": "Điều này không có nghĩa đám mây là lựa chọn sai - nó có nghĩa mô hình giá của đám mây khớp với một hình dạng nhu cầu cụ thể, và không phải ai cũng có hình dạng đó."
      }
    ],
    "keyTakeaways": [
      "Thứ đám mây bán là tính CO GIÃN, không phải máy mạnh hơn hay rẻ hơn theo giờ.",
      "Không cần co giãn thì đám mây là món đắt tiền - đó là trường hợp nó kém lợi thế nhất.",
      "Ràng buộc nhà cung cấp tích tụ dần, mỗi lần bạn dùng thêm một dịch vụ riêng.",
      "Mọi giới hạn vật lý vẫn còn: máy vẫn hỏng, đĩa vẫn đầy, mạng vẫn có độ trễ.",
      "Chuyển ngược về máy thuê không phải thất bại - nó là khớp lại giá với hình dạng nhu cầu."
    ],
    "practicePrompt": {
      "question": "Dự án của bạn có lưu lượng đều đặn quanh năm. Đám mây có phải lựa chọn tốt không?",
      "options": [
        "Có thể không, vì bạn đang trả thêm cho tính co giãn mà nhu cầu của bạn không dùng tới",
        "Có, vì đám mây luôn rẻ hơn so với việc tự mua và tự vận hành máy chủ riêng",
        "Có, vì lưu lượng đều đặn giúp bạn dự đoán chính xác được hoá đơn hằng tháng",
        "Có thể không, vì lưu lượng đều đặn nghĩa là hệ thống của bạn chưa có người dùng thật"
      ],
      "correct": 0,
      "explanation": "Đây là trường hợp mà máy chủ thuê thường thắng rõ. Dự đoán được hoá đơn đúng là một lợi ích thật, nhưng máy thuê còn dự đoán được tốt hơn nữa vì giá của nó cố định hoàn toàn."
    },
    "summary": {
      "keyIdea": "Đám mây bán tính co giãn; ai không cần co giãn thì đang trả cho thứ mình không dùng.",
      "formula": "Nhu cầu thất thường hoặc chưa biết → đám mây. Nhu cầu ổn định → cân nhắc máy thuê.",
      "commonMistake": "Chọn đám mây vì nó là mặc định, không vì hình dạng nhu cầu thật của mình.",
      "action": "Vẽ biểu đồ lưu lượng của bạn theo giờ trong một tuần và nhìn hình dạng của nó."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Vẽ biểu đồ lưu lượng của dự án bạn theo từng giờ trong một tuần. Hình dạng đó trả lời câu hỏi bạn có cần tính co giãn hay không.",
      "secondary": "Nếu đường biểu đồ gần như phẳng, hãy so giá gói đám mây hiện tại với một máy chủ thuê cùng cấu hình. Con số chênh lệch thường gây bất ngờ."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chặng trước bạn đưa sản phẩm lên một máy chủ. Chặng này về nơi máy chủ đó sống, và về một mô hình kinh doanh mà rất nhiều người dùng mà không hiểu mình đang mua cái gì."
      },
      {
        "type": "heading",
        "text": "Câu đùa đúng một nửa"
      },
      {
        "type": "paragraph",
        "text": "Có một câu nói phổ biến: đám mây chỉ là máy tính của người khác. Nó đúng ở phần vật lý - máy vẫn hỏng, đĩa vẫn đầy, mạng vẫn có độ trễ. Đám mây không xoá bỏ được ràng buộc vật lý nào cả."
      },
      {
        "type": "callout",
        "label": "Nhưng nó bỏ sót phần quan trọng",
        "text": "Cái khác không nằm ở máy mà nằm ở CÁCH BẠN TRẢ TIỀN. Trước đây mua máy là quyết định vài tháng và vài chục triệu. Bây giờ mở thêm hai mươi máy mất năm phút, và trả lại cũng mất năm phút. Đó là thứ bạn thật sự mua."
      },
      {
        "type": "heading",
        "text": "Và bạn trả giá cho nó"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Tính theo giờ máy chạy",
          "text": "Đám mây đắt hơn máy thuê, thường là đắt hơn nhiều. Máy trong trung tâm dữ liệu của họ cũng không mạnh hơn máy bạn thuê được ở nơi khác."
        },
        "right": {
          "label": "Vì sao vẫn đáng",
          "text": "Bạn đang mua một quyền chọn: quyền lấy thêm tài nguyên bất cứ lúc nào. Quyền đó có giá, và bạn trả nó cả trong những tháng không dùng tới."
        }
      },
      {
        "type": "paragraph",
        "text": "Từ đó ra kết luận thực dụng nhất của bài: đám mây đáng tiền khi lưu lượng THẤT THƯỜNG, hoặc khi bạn chưa biết mình cần bao nhiêu. Lưu lượng ổn định là trường hợp nó kém lợi thế nhất - và đó là lý do một số công ty đã chuyển ngược về máy thuê và cắt được phần lớn hoá đơn."
      },
      {
        "type": "heading",
        "text": "Cái giá thứ hai, trả dần"
      },
      {
        "type": "paragraph",
        "text": "Ràng buộc nhà cung cấp không phải một quyết định mà là thứ tích tụ. Mỗi lần bạn dùng thêm một dịch vụ riêng của họ vì nó tiện, chi phí rời đi lại tăng lên - cho tới lúc chuyển đi nghĩa là viết lại phần lớn hệ thống."
      },
      {
        "type": "closing",
        "lines": [
          "Không phải là đừng bao giờ dùng dịch vụ riêng. Nguyên tắc vẫn như ở chặng API: biết mình đang đổi gì lấy gì, và cẩn thận nhất ở những phần cốt lõi.",
          "Bài sau là ba tầng dịch vụ mà mọi nhà cung cấp đều bán, và cách chọn giữa chúng."
        ]
      }
    ]
  },
  {
    "id": 321,
    "slug": "ba-tang-dich-vu-dam-may",
    "title": "Chặng 13, Bài 2: Ba tầng dịch vụ đám mây",
    "subtitle": "Càng lên cao càng ít việc phải làm, và càng khó rời đi.",
    "duration": "6 phút",
    "difficulty": "Trung bình",
    "emoji": "🏢",
    "track": "personal",
    "isFundamental": true,
    "whyItMatters": "Chọn sai tầng là lý do phổ biến khiến một đội nhỏ dành phần lớn thời gian cho việc vận hành. Ba tầng này giải cùng một bài toán ở ba mức, và mức đúng phụ thuộc vào việc bạn có bao nhiêu người.",
    "openingQuestion": "Ba tầng dịch vụ đám mây khác nhau ở điểm nào?",
    "openingOptions": [
      "Ở chỗ ranh giới trách nhiệm nằm đâu: bạn lo tới đâu và nhà cung cấp lo từ đâu",
      "Ở mức giá, vì tầng càng cao thì càng nhiều tính năng nên càng đắt tiền hơn",
      "Ở hiệu năng, vì tầng thấp cho bạn truy cập gần với phần cứng nên chạy nhanh hơn",
      "Ở mức độ bảo mật, vì tầng cao có sẵn nhiều lớp bảo vệ hơn so với tầng thấp"
    ],
    "correctOption": 0,
    "explanation": "Ba tầng là ba vị trí của cùng một đường ranh giới. Ở tầng thấp bạn nhận một máy trống và lo mọi thứ từ hệ điều hành trở lên. Ở tầng giữa bạn đẩy mã lên và nhà cung cấp lo phần chạy. Ở tầng cao bạn chỉ viết hàm. Giá và hiệu năng đều thay đổi theo, nhưng chúng là hệ quả chứ không phải điểm phân biệt - và điểm phân biệt mới là thứ giúp bạn chọn.",
    "diagram": [
      {
        "label": "Máy ảo: bạn lo từ hệ điều hành trở lên",
        "arrow": true
      },
      {
        "label": "Nền tảng: bạn đẩy mã, họ lo phần chạy",
        "arrow": true
      },
      {
        "label": "Hàm: bạn chỉ viết logic, họ lo tất cả phần còn lại",
        "arrow": true
      },
      {
        "label": "Lên cao: ít việc hơn, nhưng khó rời đi hơn"
      }
    ],
    "realWorldExample": {
      "company": "Trộn tầng trong một hệ thống",
      "description": "Phần lớn hệ thống thật không nằm gọn ở một tầng. Ứng dụng chính chạy trên nền tảng quản lý, công việc xử lý ảnh chạy dưới dạng hàm vì nó thất thường, còn cơ sở dữ liệu thì dùng dịch vụ quản lý sẵn. Chọn tầng là quyết định theo từng phần, không phải cho cả hệ thống."
    },
    "quiz": [
      {
        "question": "Ở tầng máy ảo, bạn chịu trách nhiệm những gì?",
        "options": [
          "Hệ điều hành, các bản vá bảo mật, cấu hình máy chủ web và mọi thứ bên trên đó",
          "Chỉ có mã nguồn ứng dụng, còn toàn bộ phần hệ điều hành thì do nhà cung cấp tự cập nhật",
          "Chỉ phần cấu hình mạng và tường lửa, còn phần mềm bên trong thì có sẵn",
          "Toàn bộ kể cả phần cứng, vì bạn có quyền truy cập trực tiếp vào máy vật lý"
        ],
        "correct": 0,
        "explanation": "Đây là danh sách đầy đủ và nó dài hơn người ta thường nghĩ. Chính vế các bản vá bảo mật là chỗ hay bị quên nhất, vì nó không có ai nhắc và hậu quả chỉ lộ ra khi đã muộn."
      },
      {
        "question": "Vì sao tầng càng cao thì càng khó rời đi?",
        "options": [
          "Vì cách viết mã phải khớp với khuôn mà nền tảng đó quy định, nên chuyển là viết lại",
          "Vì hợp đồng ở tầng cao thường đi kèm thời hạn cam kết dài hơn hẳn so với tầng thấp",
          "Vì dữ liệu ở tầng cao được lưu ở định dạng riêng nên không xuất ra được",
          "Vì các nhà cung cấp khác thường không có dịch vụ nào tương đương ở tầng cao nhất"
        ],
        "correct": 0,
        "explanation": "Một máy ảo chạy được ở bất cứ đâu vì nó chỉ là một máy. Một hàm viết theo khuôn của nhà cung cấp thì mang tri thức về nền tảng đó ngay trong cấu trúc mã, nên chuyển đi là viết lại chứ không phải sao chép."
      },
      {
        "question": "Vì sao dịch vụ cơ sở dữ liệu quản lý sẵn thường đáng tiền?",
        "options": [
          "Vì sao lưu, vá lỗi và chuyển đổi khi hỏng là những việc dễ làm sai mà hậu quả nặng",
          "Vì cơ sở dữ liệu quản lý sẵn chạy nhanh hơn nhiều so với bản bạn tự cài đặt",
          "Vì nó cho phép mở rộng dung lượng lưu trữ mà không phải dừng hệ thống lại",
          "Vì nó có sẵn giao diện quản trị nên bạn không cần cài thêm công cụ nào khác"
        ],
        "correct": 0,
        "explanation": "Đây là chỗ mà việc tự làm có tỷ lệ hoàn vốn thấp nhất: bạn bỏ công ra để làm một việc mà làm sai thì mất dữ liệu. Mở rộng không dừng hệ thống cũng là lợi ích thật nhưng nó phụ so với ba việc kia."
      },
      {
        "question": "Vì sao một hệ thống thật thường trộn nhiều tầng?",
        "options": [
          "Vì mỗi phần có hình dạng nhu cầu khác nhau nên tầng phù hợp cũng khác nhau",
          "Vì dùng nhiều tầng giúp giảm rủi ro khi một tầng của nhà cung cấp gặp sự cố",
          "Vì nhà cung cấp giảm giá khi khách hàng sử dụng nhiều loại dịch vụ cùng lúc",
          "Vì các tầng khác nhau được đặt ở các trung tâm dữ liệu khác nhau nên phân tán rủi ro"
        ],
        "correct": 0,
        "explanation": "Ứng dụng chính chạy đều nên hợp với nền tảng quản lý; công việc xử lý ảnh thất thường nên hợp với hàm. Chọn tầng là quyết định theo TỪNG PHẦN chứ không phải một lựa chọn duy nhất cho cả hệ thống."
      },
      {
        "question": "Đội nhỏ không có người vận hành riêng nên bắt đầu ở đâu?",
        "options": [
          "Tầng nền tảng quản lý, rồi chỉ xuống tầng thấp hơn ở đúng phần thật sự cần",
          "Tầng máy ảo, vì nó rẻ nhất và cho bạn hiểu rõ hệ thống của mình nhất",
          "Tầng hàm, vì nó không cần vận hành gì cả nên tiết kiệm thời gian nhiều nhất",
          "Tầng nào cũng được, vì với quy mô nhỏ thì khác biệt giữa các tầng không đáng kể"
        ],
        "correct": 0,
        "explanation": "Bắt đầu ở tầng cao rồi đi xuống khi có lý do cụ thể thì rẻ hơn nhiều so với hướng ngược lại. Tầng hàm nghe hấp dẫn nhưng nó ràng buộc cách viết mã, nên nó là quyết định lớn hơn vẻ ngoài của nó."
      }
    ],
    "keyTakeaways": [
      "Ba tầng là ba vị trí của cùng một đường ranh giới trách nhiệm.",
      "Lên cao thì ít việc vận hành hơn, nhưng khó rời đi hơn vì mã mang khuôn của nền tảng.",
      "Cơ sở dữ liệu quản lý sẵn gần như luôn đáng tiền: sao lưu, vá lỗi, chuyển đổi khi hỏng.",
      "Hệ thống thật trộn nhiều tầng - chọn theo từng phần, không chọn một lần cho tất cả.",
      "Đội nhỏ bắt đầu ở tầng nền tảng, chỉ xuống thấp hơn ở đúng phần cần."
    ],
    "practicePrompt": {
      "question": "Bạn chọn tầng máy ảo vì nó rẻ nhất trên bảng giá. Khoản chi phí nào chưa được tính?",
      "options": [
        "Thời gian bạn dành cho vá bảo mật, cấu hình, sao lưu và xử lý khi máy có sự cố",
        "Chi phí băng thông mạng phát sinh khi lưu lượng người dùng tăng lên đột ngột",
        "Phí bản quyền cho hệ điều hành và các phần mềm máy chủ mà bạn cần cài đặt",
        "Chi phí mua thêm dung lượng lưu trữ khi dữ liệu của ứng dụng lớn dần theo thời gian"
      ],
      "correct": 0,
      "explanation": "Đây lại là bài học ở chặng triển khai: so theo giá thuê là so sai đơn vị. Ba khoản kia đều là chi phí thật nhưng chúng xuất hiện trên hoá đơn, còn thời gian của bạn thì không xuất hiện ở đâu cả."
    },
    "summary": {
      "keyIdea": "Ba tầng là ba vị trí của ranh giới trách nhiệm giữa bạn và nhà cung cấp.",
      "formula": "Ít người vận hành → chọn tầng cao. Cần kiểm soát cụ thể → xuống tầng thấp ở đúng chỗ đó.",
      "commonMistake": "Chọn một tầng cho cả hệ thống thay vì chọn theo từng phần.",
      "action": "Liệt kê các phần trong hệ thống của bạn và gắn tầng phù hợp cho từng phần."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Liệt kê các thành phần trong hệ thống của bạn - ứng dụng chính, cơ sở dữ liệu, công việc chạy nền, xử lý tệp - và gắn cho mỗi cái một tầng phù hợp.",
      "secondary": "Chú ý những phần có nhu cầu thất thường: đó là ứng viên tốt cho tầng hàm. Và nếu cơ sở dữ liệu đang do bạn tự vận hành, đó thường là chỗ đầu tiên nên chuyển lên."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Mọi nhà cung cấp đám mây đều bán ba tầng dịch vụ, dưới nhiều tên gọi khác nhau. Chúng không phải ba sản phẩm khác nhau mà là ba vị trí của cùng một đường ranh giới."
      },
      {
        "type": "heading",
        "text": "Đường ranh giới đó"
      },
      {
        "type": "conceptTable",
        "title": "Bạn lo tới đâu",
        "concepts": [
          {
            "vi": "Máy ảo",
            "en": "IaaS",
            "def": "Bạn nhận một máy trống. Hệ điều hành, bản vá bảo mật, cấu hình máy chủ web, sao lưu - tất cả là việc của bạn. Kiểm soát nhiều nhất, việc nhiều nhất."
          },
          {
            "vi": "Nền tảng",
            "en": "PaaS",
            "def": "Bạn đẩy mã lên, nhà cung cấp lo phần chạy. Mặc định đúng cho đội nhỏ, vì nó cắt đi đúng phần việc không tạo ra giá trị cho sản phẩm."
          },
          {
            "vi": "Hàm",
            "en": "FaaS",
            "def": "Bạn chỉ viết logic, mọi thứ khác là của họ. Trả theo lượt gọi, nhưng nó RÀNG BUỘC cách viết mã chứ không chỉ là nơi chạy."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Việc hay bị quên nhất ở tầng máy ảo",
        "text": "Các bản vá bảo mật. Không ai nhắc bạn, không có gì báo lỗi, và hậu quả chỉ lộ ra khi đã muộn. Đây là khoản chi phí thật của tầng thấp mà bảng giá không hiển thị."
      },
      {
        "type": "heading",
        "text": "Đánh đổi khi lên cao"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Được",
          "text": "Ít việc vận hành hơn ở mỗi bậc. Với đội không có người chuyên vận hành, đó là khác biệt giữa việc ra được tính năng và việc suốt ngày sửa máy chủ."
        },
        "right": {
          "label": "Mất",
          "text": "Khó rời đi hơn. Một máy ảo chạy được ở bất cứ đâu; một hàm viết theo khuôn của nhà cung cấp thì mang tri thức về nền tảng đó ngay trong cấu trúc mã."
        }
      },
      {
        "type": "heading",
        "text": "Chọn theo từng phần"
      },
      {
        "type": "paragraph",
        "text": "Phần lớn hệ thống thật không nằm gọn ở một tầng. Ứng dụng chính chạy đều nên hợp với nền tảng quản lý; công việc xử lý ảnh thất thường nên hợp với hàm; cơ sở dữ liệu thì dùng dịch vụ quản lý sẵn."
      },
      {
        "type": "paragraph",
        "text": "Mục cuối đáng nói riêng: cơ sở dữ liệu là chỗ tự làm có tỷ lệ hoàn vốn thấp nhất. Sao lưu, vá lỗi và chuyển đổi khi máy chính hỏng đều là việc dễ làm sai, và làm sai thì mất dữ liệu - loại hỏng mà chặng trước xếp vào nhóm không cứu được."
      },
      {
        "type": "closing",
        "lines": [
          "Quy tắc thực dụng cho đội nhỏ: bắt đầu ở tầng nền tảng, rồi chỉ xuống thấp hơn ở đúng phần có lý do cụ thể. Đi hướng đó rẻ hơn nhiều so với hướng ngược lại.",
          "Bài sau là thứ khiến nhiều người bất ngờ nhất khi dùng đám mây: hoá đơn."
        ]
      }
    ]
  },
  {
    "id": 322,
    "slug": "hoa-don-dam-may-nhung-khoan-khong-thay-truoc",
    "title": "Chặng 13, Bài 3: Hoá đơn đám mây và những khoản không thấy trước",
    "subtitle": "Giá máy thì ai cũng nhìn; khoản làm hoá đơn phình ra thì nằm ở chỗ khác.",
    "duration": "7 phút",
    "difficulty": "Trung bình",
    "emoji": "🧾",
    "track": "personal",
    "interactiveType": "fee-drag",
    "isFundamental": true,
    "whyItMatters": "Hoá đơn đám mây tăng gấp đôi mà không ai đổi gì là chuyện xảy ra thường xuyên, và nguyên nhân gần như luôn nằm ở những khoản phí bạn không nghĩ tới lúc thiết kế. Biết chúng trước thì rẻ hơn nhiều so với phát hiện sau.",
    "openingQuestion": "Khoản phí nào hay làm hoá đơn đám mây phình ra nhất mà người ta không lường trước?",
    "openingOptions": [
      "Phí truyền dữ liệu ra ngoài, vì nó tính theo lượng chứ không có trần cố định nào",
      "Phí thuê máy chủ, vì cấu hình thường phải nâng lên cao hơn dự kiến ban đầu",
      "Phí lưu trữ dữ liệu, vì dung lượng tăng đều theo thời gian mà không ai xoá bớt",
      "Phí bản quyền phần mềm đi kèm mà nhà cung cấp tính riêng ngoài giá thuê máy"
    ],
    "correctOption": 0,
    "explanation": "Giá máy và giá lưu trữ đều là con số bạn nhìn thấy khi chọn gói, nên chúng ít gây bất ngờ. Phí truyền dữ liệu ra ngoài thì không: nó tính theo mỗi gigabyte đi ra, không có trần, và nó tăng theo lượng người dùng chứ không theo hạ tầng bạn đặt. Đưa dữ liệu VÀO thường miễn phí, lấy RA thì tính tiền - và sự bất đối xứng đó là thứ nhiều người chỉ nhận ra khi đọc hoá đơn.",
    "diagram": [
      {
        "label": "Vào thì miễn phí, ra thì tính tiền",
        "arrow": true
      },
      {
        "label": "Gọi giữa các vùng cũng tính là đi ra",
        "arrow": true
      },
      {
        "label": "Tài nguyên quên tắt chạy hai mươi tư trên bảy",
        "arrow": true
      },
      {
        "label": "Đặt cảnh báo ngân sách trước, không phải sau"
      }
    ],
    "realWorldExample": {
      "company": "Ổ đĩa mồ côi",
      "description": "Xoá một máy ảo thường không xoá ổ đĩa gắn với nó. Những ổ đĩa mồ côi đó vẫn tính tiền hằng tháng, không xuất hiện ở bất kỳ bảng điều khiển nào bạn hay mở, và chúng tích tụ dần sau mỗi lần thử nghiệm. Đây là khoản lãng phí phổ biến nhất và cũng dễ dọn nhất."
    },
    "quiz": [
      {
        "question": "Vì sao phí truyền dữ liệu khó dự đoán hơn phí thuê máy?",
        "options": [
          "Vì nó tăng theo lượng người dùng chứ không theo hạ tầng mà bạn chủ động đặt",
          "Vì nhà cung cấp thay đổi đơn giá truyền dữ liệu thường xuyên hơn các loại phí khác",
          "Vì nó chỉ được tính vào cuối kỳ thanh toán nên bạn không theo dõi được lúc đang phát sinh",
          "Vì mỗi vùng có một mức giá truyền dữ liệu khác nhau nên khó tính tổng chính xác"
        ],
        "correct": 0,
        "explanation": "Đây là điểm phân biệt cốt lõi: máy chủ là thứ bạn quyết định, còn lượng dữ liệu đi ra là thứ người dùng quyết định. Một bài viết được chia sẻ rộng có thể làm khoản này tăng gấp mười trong một ngày."
      },
      {
        "question": "Gọi dịch vụ giữa hai vùng khác nhau bị tính phí thế nào?",
        "options": [
          "Tính như dữ liệu đi ra, nên đặt các thành phần ở khác vùng làm phát sinh chi phí đều đặn",
          "Được miễn phí hoàn toàn vì cả hai vùng đều thuộc cùng một nhà cung cấp dịch vụ đám mây",
          "Tính theo số lượt gọi chứ không theo lượng dữ liệu được truyền giữa hai bên",
          "Tính với mức giá thấp hơn so với truyền ra internet nên thường không đáng kể"
        ],
        "correct": 0,
        "explanation": "Đây là chỗ một quyết định kiến trúc trở thành một khoản chi phí lặp lại. Đặt ứng dụng ở một vùng và cơ sở dữ liệu ở vùng khác vừa thêm độ trễ vừa thêm hoá đơn, mà cả hai đều không lộ ra ngay."
      },
      {
        "question": "Vì sao ổ đĩa mồ côi là khoản lãng phí phổ biến?",
        "options": [
          "Vì xoá máy ảo thường không xoá ổ đĩa gắn kèm, và ổ đó không hiện ở bảng điều khiển hay mở",
          "Vì ổ đĩa vẫn được sao lưu tự động ngay cả khi không còn máy nào sử dụng chúng",
          "Vì nhà cung cấp giữ lại ổ đĩa một thời gian dài để phòng khi khách hàng cần khôi phục",
          "Vì dung lượng ổ đĩa luôn được cấp phát theo mức tối đa chứ không theo mức thực tế đang dùng"
        ],
        "correct": 0,
        "explanation": "Hai vế cộng lại tạo ra loại lãng phí khó phát hiện nhất: nó vừa tồn tại vừa vô hình. Chúng tích tụ dần sau mỗi lần thử nghiệm, và đây cũng là khoản dễ dọn nhất một khi bạn biết đi tìm."
      },
      {
        "question": "Vì sao nên gắn nhãn cho mọi tài nguyên đám mây?",
        "options": [
          "Vì không gắn nhãn thì hoá đơn chỉ là một con số tổng, không truy được phần nào tốn nhất",
          "Vì nhà cung cấp yêu cầu phải gắn nhãn thì mới hỗ trợ kỹ thuật được khi có sự cố xảy ra",
          "Vì gắn nhãn giúp các tài nguyên cùng nhóm được đặt gần nhau để giảm độ trễ",
          "Vì hệ thống tự động xoá những tài nguyên không có nhãn sau một khoảng thời gian"
        ],
        "correct": 0,
        "explanation": "Không có nhãn thì bạn biết tháng này tốn nhiều hơn tháng trước nhưng không biết vì đâu, và mọi nỗ lực cắt giảm đều là đoán mò. Đây là việc làm một lần lúc tạo tài nguyên, rẻ hơn nhiều so với truy ngược sau này."
      },
      {
        "question": "Cảnh báo ngân sách nên được đặt khi nào?",
        "options": [
          "Ngay khi bắt đầu dùng, vì hoá đơn bất ngờ chỉ lộ ra vào cuối kỳ thanh toán",
          "Sau vài tháng khi đã có đủ dữ liệu để biết mức chi tiêu bình thường là bao nhiêu",
          "Khi hệ thống bắt đầu có người dùng thật, vì trước đó chi phí còn rất nhỏ",
          "Khi hoá đơn vượt quá ngân sách lần đầu, để biết ngưỡng nào là phù hợp với dự án"
        ],
        "correct": 0,
        "explanation": "Một vòng lặp lỗi chạy suốt cuối tuần có thể tạo ra hoá đơn lớn hơn cả tháng bình thường, và không có cảnh báo thì bạn biết chuyện đó vào ngày thanh toán. Đợi có dữ liệu nghe hợp lý nhưng nó bỏ ngỏ đúng giai đoạn dễ mắc lỗi nhất."
      }
    ],
    "keyTakeaways": [
      "Vào miễn phí, ra tính tiền - phí truyền dữ liệu tăng theo người dùng, không theo hạ tầng.",
      "Gọi giữa hai vùng cũng tính như đi ra, nên đặt sai vùng là chi phí lặp lại đều đặn.",
      "Ổ đĩa mồ côi vừa tồn tại vừa vô hình - khoản lãng phí phổ biến nhất và dễ dọn nhất.",
      "Gắn nhãn mọi tài nguyên, nếu không hoá đơn chỉ là một con số tổng không truy được.",
      "Đặt cảnh báo ngân sách NGAY, vì hoá đơn bất ngờ chỉ lộ ra vào cuối kỳ."
    ],
    "practicePrompt": {
      "question": "Hoá đơn tháng này gấp đôi tháng trước mà không ai đổi gì. Nên bắt đầu tìm ở đâu?",
      "options": [
        "Ở phí truyền dữ liệu ra ngoài, vì đó là khoản duy nhất tăng được mà không cần ai đổi gì",
        "Ở số lượng máy chủ đang chạy, vì có thể ai đó đã mở thêm máy mà quên báo lại",
        "Ở dung lượng lưu trữ, vì dữ liệu tăng đều theo thời gian mà không ai để ý",
        "Ở bảng giá của nhà cung cấp, vì có thể họ vừa điều chỉnh đơn giá một số dịch vụ"
      ],
      "correct": 0,
      "explanation": "Chữ KHÔNG AI ĐỔI GÌ là manh mối. Máy chủ và dung lượng lưu trữ đều cần một hành động của ai đó mới tăng lên; lượng dữ liệu đi ra thì tăng theo người dùng, hoàn toàn ngoài tầm tay bạn."
    },
    "summary": {
      "keyIdea": "Khoản làm hoá đơn phình ra không phải giá máy - đó là con số duy nhất ai cũng nhìn.",
      "formula": "Dữ liệu ra + gọi chéo vùng + tài nguyên quên tắt = phần bất ngờ của hoá đơn.",
      "commonMistake": "Đợi có dữ liệu vài tháng rồi mới đặt cảnh báo ngân sách.",
      "action": "Mở bảng chi phí, sắp xếp giảm dần, và nhìn ba dòng đầu tiên."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Mở bảng phân tích chi phí của nhà cung cấp, sắp xếp theo dịch vụ giảm dần, và nhìn ba dòng đầu. Nếu có dòng nào bạn không giải thích được thì đó là chỗ cần tìm.",
      "secondary": "Sau đó tìm danh sách ổ đĩa không gắn với máy nào và địa chỉ mạng tĩnh không dùng tới. Đây là hai khoản dọn được ngay trong mười lăm phút."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Hoá đơn đám mây tăng gấp đôi mà không ai đổi gì là chuyện xảy ra thường xuyên. Nguyên nhân gần như không bao giờ là giá máy - đó là con số duy nhất ai cũng nhìn khi chọn gói."
      },
      {
        "type": "heading",
        "text": "Sự bất đối xứng cơ bản"
      },
      {
        "type": "callout",
        "label": "Vào miễn phí, ra tính tiền",
        "text": "Đưa dữ liệu lên đám mây thường không mất phí; lấy ra thì tính theo mỗi gigabyte, không có trần. Và khoản này tăng theo LƯỢNG NGƯỜI DÙNG chứ không theo hạ tầng bạn đặt - một bài viết được chia sẻ rộng có thể làm nó tăng gấp mười trong một ngày."
      },
      {
        "type": "paragraph",
        "text": "Có một biến thể ít người để ý: gọi dịch vụ giữa hai VÙNG khác nhau cũng được tính như dữ liệu đi ra. Đặt ứng dụng ở một vùng và cơ sở dữ liệu ở vùng khác vừa thêm độ trễ vừa thêm một khoản lặp lại đều đặn trên hoá đơn."
      },
      {
        "type": "heading",
        "text": "Thứ chạy mà không ai dùng"
      },
      {
        "type": "list",
        "items": [
          "Ổ đĩa mồ côi: xoá máy ảo thường không xoá ổ đĩa gắn kèm, và ổ đó không hiện ở bảng điều khiển bạn hay mở.",
          "Máy thử nghiệm quên tắt: chạy hai mươi tư giờ mỗi ngày cho một thứ dùng hai tiếng.",
          "Địa chỉ mạng tĩnh đã cấp mà không gắn vào máy nào - nhiều nhà cung cấp tính phí đúng cho trường hợp này.",
          "Bản sao lưu cũ không có chính sách xoá, tích tụ từng tháng một."
        ]
      },
      {
        "type": "paragraph",
        "text": "Điểm chung của cả bốn: chúng vừa tồn tại vừa vô hình. Đó là lý do chúng tích tụ dần sau mỗi lần thử nghiệm - và cũng là lý do đây là khoản dễ dọn nhất một khi bạn biết đi tìm."
      },
      {
        "type": "heading",
        "text": "Hai việc làm một lần"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Gắn nhãn mọi tài nguyên",
          "text": "Dự án nào, môi trường nào, ai chịu trách nhiệm. Không có nhãn thì hoá đơn chỉ là một con số tổng, bạn biết tháng này tốn hơn tháng trước nhưng không biết vì đâu."
        },
        "right": {
          "label": "Đặt cảnh báo ngân sách",
          "text": "Ngay từ đầu, đừng đợi có dữ liệu vài tháng. Một vòng lặp lỗi chạy suốt cuối tuần có thể tạo ra hoá đơn lớn hơn cả tháng bình thường, và không có cảnh báo thì bạn biết vào ngày thanh toán."
        }
      },
      {
        "type": "closing",
        "lines": [
          "Cả hai đều rẻ lúc tạo tài nguyên và đắt lúc truy ngược, nên chúng thuộc loại việc làm sớm thì lời.",
          "Bài sau là chiều ngược lại: những cách cắt hoá đơn thật sự có tác dụng, và một cách nghe hay mà thường không."
        ]
      }
    ]
  },
  {
    "id": 323,
    "slug": "tiet-kiem-ha-tang-cach-nao-that-su-hieu-qua",
    "title": "Chặng 13, Bài 4: Tiết kiệm hạ tầng - cách nào thật sự hiệu quả",
    "subtitle": "Thứ tự đúng: tắt cái không dùng, chỉnh cho vừa, rồi mới cam kết dài hạn.",
    "duration": "6 phút",
    "difficulty": "Trung bình",
    "emoji": "✂️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Người ta hay bắt đầu bằng việc cam kết dài hạn vì nó cho mức giảm giá lớn nhất trên giấy. Làm ngược thứ tự thì bạn khoá luôn cả phần lãng phí, và trả tiền cho nó suốt ba năm.",
    "openingQuestion": "Việc đầu tiên nên làm khi muốn cắt hoá đơn đám mây là gì?",
    "openingOptions": [
      "Tắt những thứ không ai dùng, vì đó là phần cắt được mà không đánh đổi gì cả",
      "Mua gói cam kết dài hạn, vì nó cho mức giảm giá lớn nhất trong tất cả các cách",
      "Chuyển sang loại máy thế hệ mới hơn vì chúng cho hiệu năng cao hơn trên mỗi đồng",
      "Bật tự động mở rộng để hệ thống chỉ dùng đúng lượng tài nguyên cần thiết mỗi lúc"
    ],
    "correctOption": 0,
    "explanation": "Thứ tự quan trọng hơn từng biện pháp. Tắt thứ không dùng là việc duy nhất không có mặt trái: không giảm hiệu năng, không thêm rủi ro, không ràng buộc gì. Cam kết dài hạn cho mức giảm lớn nhất trên giấy nhưng nếu làm nó trước thì bạn khoá luôn cả phần đang lãng phí - và trả tiền cho phần đó đủ ba năm.",
    "diagram": [
      {
        "label": "1. Tắt thứ không ai dùng - không đánh đổi gì",
        "arrow": true
      },
      {
        "label": "2. Chỉnh cấu hình cho vừa với nhu cầu thật",
        "arrow": true
      },
      {
        "label": "3. Tự động mở rộng theo lưu lượng",
        "arrow": true
      },
      {
        "label": "4. Cam kết dài hạn - chỉ cho phần nền đã ổn định"
      }
    ],
    "realWorldExample": {
      "company": "Máy môi trường thử nghiệm ngủ đêm",
      "description": "Môi trường thử nghiệm thường chỉ được dùng trong giờ làm việc nhưng chạy suốt hai mươi tư giờ. Đặt lịch tắt buổi tối và cuối tuần cắt được khoảng bảy mươi phần trăm chi phí của chúng, và không ai bị ảnh hưởng vì không ai dùng chúng vào lúc đó."
    },
    "quiz": [
      {
        "question": "Vì sao không nên cam kết dài hạn trước khi dọn dẹp?",
        "options": [
          "Vì bạn sẽ khoá giá cho cả phần đang lãng phí và trả tiền cho nó suốt kỳ cam kết",
          "Vì mức giảm giá của gói cam kết sẽ thấp hơn nếu lượng sử dụng của bạn còn nhỏ",
          "Vì nhà cung cấp không cho phép huỷ gói cam kết khi nhu cầu của bạn thay đổi",
          "Vì giá của các gói cam kết thường giảm dần theo từng năm nên nên chờ thêm"
        ],
        "correct": 0,
        "explanation": "Đây là lý do thứ tự quan trọng hơn từng biện pháp. Cam kết là quyết định về QUY MÔ, nên nó chỉ đúng sau khi bạn đã biết quy mô thật của mình - và trước khi dọn thì con số bạn thấy không phải quy mô thật."
      },
      {
        "question": "Chỉnh cấu hình cho vừa nghĩa là gì?",
        "options": [
          "Hạ cấu hình máy xuống mức khớp với lượng tài nguyên thật sự được sử dụng",
          "Đổi sang loại máy được tối ưu cho đúng loại công việc mà ứng dụng đang chạy",
          "Chia một máy lớn thành nhiều máy nhỏ để tận dụng tài nguyên hiệu quả hơn",
          "Đặt giới hạn tài nguyên tối đa cho từng tiến trình để tránh một tiến trình chiếm hết"
        ],
        "correct": 0,
        "explanation": "Phần lớn máy được chọn cấu hình lúc bắt đầu dự án theo phỏng đoán, rồi không ai xem lại. Nhìn số liệu sử dụng thật trong một tháng thường cho thấy máy đang dùng dưới hai mươi phần trăm khả năng."
      },
      {
        "question": "Máy giá rẻ có thể bị thu hồi phù hợp với loại công việc nào?",
        "options": [
          "Công việc chạy nền chịu được gián đoạn và chạy lại, ví dụ xử lý ảnh hay tính toán theo lô",
          "Máy chủ phục vụ người dùng, vì lưu lượng hoàn toàn có thể chuyển sang máy khác khi bị thu hồi",
          "Cơ sở dữ liệu, vì dữ liệu đã được sao lưu nên khôi phục lại được khi máy bị lấy đi",
          "Mọi loại công việc, vì nhà cung cấp luôn báo trước đủ lâu để bạn kịp chuẩn bị"
        ],
        "correct": 0,
        "explanation": "Chúng rẻ hơn rất nhiều nhưng nhà cung cấp có quyền lấy lại khi cần, thường chỉ báo trước vài phút. Chữ CHẠY LẠI là điều kiện bắt buộc: công việc phải khởi động lại được từ đầu mà không mất gì."
      },
      {
        "question": "Vì sao tự động mở rộng đôi khi không tiết kiệm được như kỳ vọng?",
        "options": [
          "Vì nếu ngưỡng đặt sai thì hệ thống mở thêm máy quá sớm và thu về quá muộn",
          "Vì việc mở thêm máy mất vài phút nên hệ thống luôn phải giữ dư một lượng máy",
          "Vì nhà cung cấp tính thêm phí cho mỗi lần hệ thống thay đổi số lượng máy đang chạy",
          "Vì tự động mở rộng chỉ hoạt động được với những ứng dụng không lưu trạng thái"
        ],
        "correct": 0,
        "explanation": "Nó là một cơ chế cần chỉnh chứ không phải bật rồi quên. Đặt ngưỡng quá nhạy thì hệ thống dao động liên tục; đặt quá chậm thì người dùng chịu ảnh hưởng trước khi máy mới kịp sẵn sàng."
      },
      {
        "question": "Cách tiết kiệm nào thường bị đánh giá thấp nhất?",
        "options": [
          "Đặt bộ nhớ đệm, vì nó vừa giảm số máy cần chạy vừa giảm phí truyền dữ liệu ra",
          "Nén dữ liệu trước khi lưu để giảm bớt dung lượng lưu trữ phải trả tiền hằng tháng",
          "Chuyển dữ liệu cũ sang loại lưu trữ giá thấp dành cho dữ liệu ít khi truy cập",
          "Gộp nhiều dịch vụ nhỏ vào chung một máy để giảm tổng số máy đang chạy"
        ],
        "correct": 0,
        "explanation": "Nó cắt cùng lúc hai khoản lớn nhất trong hoá đơn, trong khi ba cách kia mỗi cách chỉ chạm vào một khoản. Đây là cùng nguyên tắc với bài về giới hạn tần suất ở chặng API: lượt gọi không thực hiện là lượt gọi rẻ nhất."
      }
    ],
    "keyTakeaways": [
      "Thứ tự: tắt thứ không dùng → chỉnh cho vừa → tự động mở rộng → mới cam kết dài hạn.",
      "Tắt thứ không dùng là việc duy nhất không có mặt trái nào.",
      "Cam kết là quyết định về quy mô, nên chỉ đúng sau khi đã biết quy mô thật.",
      "Máy giá rẻ có thể bị thu hồi chỉ hợp với công việc chạy lại được từ đầu.",
      "Bộ nhớ đệm bị đánh giá thấp: nó cắt cùng lúc cả số máy lẫn phí truyền dữ liệu."
    ],
    "practicePrompt": {
      "question": "Bạn được giao cắt ba mươi phần trăm hoá đơn đám mây. Bắt đầu từ đâu?",
      "options": [
        "Liệt kê tài nguyên không ai dùng và tắt chúng, vì phần này cắt được mà không mất gì",
        "Mua gói cam kết một năm cho toàn bộ số máy hiện tại để hưởng mức giảm giá ngay",
        "Hạ cấu hình tất cả các máy xuống một bậc và theo dõi xem có ảnh hưởng gì không",
        "Chuyển toàn bộ hệ thống sang loại máy giá rẻ có thể bị thu hồi để giảm chi phí nhiều nhất"
      ],
      "correct": 0,
      "explanation": "Đây là phần cắt được mà không phải đánh đổi hiệu năng hay rủi ro nào, nên nó luôn đi trước. Hạ cấu hình đồng loạt một bậc thì bỏ qua việc mỗi máy có mức sử dụng khác nhau, còn máy có thể bị thu hồi thì không dùng được cho phần phục vụ người dùng."
    },
    "summary": {
      "keyIdea": "Thứ tự làm quan trọng hơn từng biện pháp; làm ngược thì bạn khoá luôn phần lãng phí.",
      "formula": "Tắt → chỉnh vừa → tự mở rộng → cam kết cho phần nền đã ổn định.",
      "commonMistake": "Cam kết dài hạn trước vì nó cho mức giảm giá lớn nhất trên giấy.",
      "action": "Đặt lịch tắt môi trường thử nghiệm vào buổi tối và cuối tuần."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Đặt lịch tắt các máy môi trường thử nghiệm vào buổi tối và cuối tuần. Đây là việc mất mười lăm phút và cắt khoảng bảy mươi phần trăm chi phí của chúng.",
      "secondary": "Sau đó mở số liệu sử dụng tài nguyên trong ba mươi ngày của máy đắt nhất. Nếu nó dùng dưới hai mươi phần trăm khả năng thì bạn vừa tìm ra chỗ chỉnh tiếp theo."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bài trước là chỗ hoá đơn phình ra. Bài này là cách cắt nó - và điều quan trọng nhất không phải từng biện pháp mà là THỨ TỰ làm chúng."
      },
      {
        "type": "heading",
        "text": "Bốn bước, theo đúng thứ tự"
      },
      {
        "type": "list",
        "items": [
          "Tắt thứ không ai dùng: ổ đĩa mồ côi, máy thử nghiệm quên tắt, bản sao lưu quá cũ.",
          "Chỉnh cấu hình cho vừa: hạ máy xuống mức khớp với lượng tài nguyên thật sự dùng.",
          "Tự động mở rộng: để số máy đi theo lưu lượng thay vì cố định ở mức cao điểm.",
          "Cam kết dài hạn: chỉ cho phần NỀN đã ổn định, và chỉ ở bước cuối."
        ]
      },
      {
        "type": "callout",
        "label": "Vì sao cam kết phải đứng cuối",
        "text": "Nó cho mức giảm giá lớn nhất trên giấy nên ai cũng muốn làm trước. Nhưng cam kết là quyết định về QUY MÔ, và trước khi dọn thì con số bạn thấy không phải quy mô thật - bạn sẽ khoá giá cho cả phần đang lãng phí và trả tiền cho nó suốt ba năm."
      },
      {
        "type": "heading",
        "text": "Hai bước đầu là phần dễ nhất"
      },
      {
        "type": "paragraph",
        "text": "Bước một là việc duy nhất trong cả danh sách không có mặt trái: không giảm hiệu năng, không thêm rủi ro, không ràng buộc gì. Môi trường thử nghiệm ngủ đêm và cuối tuần cắt khoảng bảy mươi phần trăm chi phí của chúng, và không ai bị ảnh hưởng."
      },
      {
        "type": "paragraph",
        "text": "Bước hai gần như luôn có chỗ để cắt, vì phần lớn máy được chọn cấu hình lúc bắt đầu dự án theo phỏng đoán rồi không ai xem lại. Nhìn số liệu sử dụng thật trong một tháng thường cho thấy máy đang dùng dưới hai mươi phần trăm khả năng."
      },
      {
        "type": "heading",
        "text": "Hai công cụ cần cẩn thận"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Máy giá rẻ có thể bị thu hồi",
          "text": "Rẻ hơn rất nhiều, nhưng nhà cung cấp lấy lại khi cần và thường chỉ báo trước vài phút. Chỉ hợp với công việc chạy lại được từ đầu mà không mất gì."
        },
        "right": {
          "label": "Tự động mở rộng",
          "text": "Cần chỉnh chứ không phải bật rồi quên. Ngưỡng quá nhạy thì hệ thống dao động liên tục; quá chậm thì người dùng chịu ảnh hưởng trước khi máy mới kịp sẵn sàng."
        }
      },
      {
        "type": "paragraph",
        "text": "Và một cách bị đánh giá thấp: đặt bộ nhớ đệm. Nó cắt cùng lúc hai khoản lớn nhất - số máy cần chạy và lượng dữ liệu đi ra - trong khi mọi cách khác mỗi cách chỉ chạm vào một khoản."
      },
      {
        "type": "closing",
        "lines": [
          "Đây là cùng một nguyên tắc với bài giới hạn tần suất ở chặng API: việc không phải làm là việc rẻ nhất.",
          "Bài sau là một quyết định vừa ảnh hưởng chi phí vừa ảnh hưởng trải nghiệm: đặt hệ thống ở đâu."
        ]
      }
    ]
  },
  {
    "id": 324,
    "slug": "vung-va-khu-kha-dung",
    "title": "Chặng 13, Bài 5: Vùng và khu khả dụng",
    "subtitle": "Hai khái niệm nghe giống nhau, và nhầm chúng là lý do một hệ thống dự phòng vẫn sập.",
    "duration": "6 phút",
    "difficulty": "Trung bình",
    "emoji": "🌏",
    "track": "personal",
    "isFundamental": true,
    "whyItMatters": "Nhiều đội tin rằng mình đã dự phòng vì có hai máy, nhưng hai máy đó nằm cùng một chỗ. Phân biệt được vùng với khu khả dụng là điều kiện để biết hệ thống của bạn chịu được loại sự cố nào.",
    "openingQuestion": "Bạn chạy hai máy để dự phòng. Điều gì quyết định chúng có thật sự dự phòng cho nhau không?",
    "openingOptions": [
      "Chúng có nằm ở hai khu khả dụng khác nhau hay cùng một khu trong cùng vùng",
      "Chúng có được cấu hình giống hệt nhau về hệ điều hành và phần mềm hay không",
      "Chúng có cùng chạy phiên bản mã nguồn mới nhất của ứng dụng hay không",
      "Chúng có được theo dõi bằng cùng một hệ thống giám sát tập trung hay không"
    ],
    "correctOption": 0,
    "explanation": "Hai máy trong cùng một khu khả dụng chia sẻ nguồn điện, mạng và toà nhà - nên một sự cố hạ tầng làm sập cả hai cùng lúc. Đây là lý do nhiều hệ thống có dự phòng trên giấy mà vẫn sập nguyên. Cấu hình giống nhau và mã cùng phiên bản đều cần thiết để chuyển đổi hoạt động được, nhưng chúng không giải quyết được việc hai máy nằm chung một chỗ.",
    "diagram": [
      {
        "label": "Vùng: một khu vực địa lý, ví dụ Singapore",
        "arrow": true
      },
      {
        "label": "Khu khả dụng: trung tâm dữ liệu riêng trong vùng đó",
        "arrow": true
      },
      {
        "label": "Nhiều khu trong một vùng: chống sự cố hạ tầng",
        "arrow": true
      },
      {
        "label": "Nhiều vùng: chống sự cố cả khu vực - đắt hơn nhiều"
      }
    ],
    "realWorldExample": {
      "company": "Dự phòng trên giấy",
      "description": "Một hệ thống có hai máy chủ ứng dụng, hai bản sao cơ sở dữ liệu và một bộ cân bằng tải - nhưng tất cả đều nằm trong cùng một khu khả dụng vì đó là mặc định lúc tạo. Khi khu đó mất điện, mọi thứ sập cùng lúc, và bảng thiết kế vẫn ghi là có dự phòng."
    },
    "quiz": [
      {
        "question": "Khu khả dụng khác vùng ở điểm nào?",
        "options": [
          "Khu khả dụng là một trung tâm dữ liệu riêng biệt nằm bên trong một vùng địa lý",
          "Khu khả dụng là một phần của trung tâm dữ liệu được chia ra cho từng khách hàng",
          "Khu khả dụng là nhóm các vùng gần nhau được kết nối bằng đường truyền tốc độ cao",
          "Khu khả dụng là bản sao dự phòng của một vùng, chỉ hoạt động khi vùng chính gặp sự cố"
        ],
        "correct": 0,
        "explanation": "Điểm quan trọng là các khu trong cùng vùng có nguồn điện và hệ thống mạng ĐỘC LẬP với nhau, nhưng vẫn gần nhau về địa lý. Đó là thứ cho phép chúng vừa chống được sự cố hạ tầng vừa giữ độ trễ giữa chúng ở mức rất thấp."
      },
      {
        "question": "Trải hệ thống ra nhiều khu khả dụng chống được loại sự cố nào?",
        "options": [
          "Mất điện, hỏng thiết bị mạng hay cháy ở một trung tâm dữ liệu cụ thể",
          "Sự cố khiến toàn bộ dịch vụ của nhà cung cấp ngừng hoạt động trên cả nước",
          "Lỗi trong mã nguồn ứng dụng khiến máy chủ bị treo khi xử lý một loại yêu cầu",
          "Thiên tai làm gián đoạn hạ tầng viễn thông của cả một khu vực địa lý rộng"
        ],
        "correct": 0,
        "explanation": "Đây là ranh giới cần nhớ rõ. Nhiều khu chống được sự cố ở mức TOÀ NHÀ; sự cố ở mức khu vực hay ở mức toàn nhà cung cấp thì cần nhiều vùng, và lỗi trong mã thì không có kiến trúc hạ tầng nào chống được."
      },
      {
        "question": "Vì sao chạy nhiều vùng lại đắt hơn nhiều so với nhiều khu?",
        "options": [
          "Vì dữ liệu phải đồng bộ qua khoảng cách xa, tốn phí truyền và làm kiến trúc phức tạp hơn",
          "Vì giá thuê máy ở các vùng khác nhau chênh lệch rất lớn nên tổng chi phí sẽ tăng cao hơn nhiều",
          "Vì mỗi vùng đều cần một đội vận hành riêng để xử lý sự cố theo đúng múi giờ địa phương",
          "Vì nhà cung cấp tính thêm phí quản lý cho khách hàng sử dụng nhiều hơn một vùng"
        ],
        "correct": 0,
        "explanation": "Phần khó nhất là dữ liệu chứ không phải máy chủ. Đồng bộ cơ sở dữ liệu qua hàng nghìn kilomet buộc bạn chọn giữa chờ đợi và chấp nhận dữ liệu lệch nhau tạm thời - một quyết định kiến trúc chứ không phải một cấu hình."
      },
      {
        "question": "Chọn vùng nên dựa vào tiêu chí nào trước tiên?",
        "options": [
          "Người dùng của bạn ở đâu, vì khoảng cách vật lý tạo ra độ trễ không tối ưu được",
          "Vùng nào có mức giá thuê máy và giá truyền dữ liệu thấp nhất trong bảng giá",
          "Vùng nào có nhiều loại dịch vụ nhất để sau này không bị thiếu thứ mình cần",
          "Vùng nào gần trụ sở công ty nhất để đội kỹ thuật dễ liên hệ khi có sự cố"
        ],
        "correct": 0,
        "explanation": "Số dịch vụ có sẵn cũng là tiêu chí thật vì các vùng mới thường thiếu một số dịch vụ, nhưng nó xếp sau. Còn khoảng cách tới trụ sở thì không liên quan gì - bạn quản lý hạ tầng đám mây qua mạng, không phải bằng cách tới tận nơi."
      },
      {
        "question": "Vì sao cần thử chuyển đổi dự phòng chứ không chỉ cấu hình nó?",
        "options": [
          "Vì cấu hình đúng trên giấy vẫn có thể hỏng lúc chạy thật, và lúc đó mới biết là quá muộn",
          "Vì nhà cung cấp yêu cầu khách hàng phải kiểm tra định kỳ để duy trì cam kết dịch vụ",
          "Vì việc thử giúp đo được chính xác thời gian mà quá trình chuyển đổi cần hoàn tất",
          "Vì cấu hình dự phòng sẽ tự động bị vô hiệu hoá nếu không được sử dụng trong thời gian dài"
        ],
        "correct": 0,
        "explanation": "Đây là cùng một bài học với bản sao lưu chưa khôi phục thử ở chặng triển khai: một cơ chế dự phòng chưa được kích hoạt thử thì chưa phải là một cơ chế dự phòng. Đo được thời gian chuyển đổi là lợi ích phụ, không phải lý do chính."
      }
    ],
    "keyTakeaways": [
      "Vùng là khu vực địa lý; khu khả dụng là trung tâm dữ liệu riêng bên trong vùng đó.",
      "Hai máy cùng một khu thì chia sẻ điện và mạng - dự phòng trên giấy chứ không thật.",
      "Nhiều khu chống sự cố mức toà nhà; nhiều vùng chống sự cố mức khu vực, và đắt hơn nhiều.",
      "Phần khó của nhiều vùng là dữ liệu, không phải máy chủ.",
      "Cấu hình dự phòng chưa thử kích hoạt thì chưa phải là dự phòng."
    ],
    "practicePrompt": {
      "question": "Hệ thống của bạn có hai máy chủ nhưng cả hai đều ở khu khả dụng mặc định. Rủi ro thật là gì?",
      "options": [
        "Một sự cố điện hoặc mạng ở khu đó làm sập cả hai máy cùng lúc, dự phòng thành vô nghĩa",
        "Hai máy cùng khu sẽ tranh nhau tài nguyên nên hiệu năng của cả hai đều giảm xuống",
        "Nhà cung cấp có thể đặt hai máy trên cùng một máy chủ vật lý nên không tách biệt được",
        "Độ trễ giữa hai máy quá thấp khiến cơ chế phát hiện lỗi không hoạt động chính xác"
      ],
      "correct": 0,
      "explanation": "Đây là kiểu hỏng khó chịu vì nó chỉ lộ ra đúng lúc bạn cần dự phòng nhất. Sửa thì rẻ - chuyển một máy sang khu khác thường chỉ là một dòng cấu hình - nhưng phải nhận ra vấn đề trước đã."
    },
    "summary": {
      "keyIdea": "Dự phòng chỉ có nghĩa khi các bản sao không chia sẻ chung một điểm hỏng.",
      "formula": "Nhiều khu → chống sự cố toà nhà. Nhiều vùng → chống sự cố khu vực, đắt hơn nhiều.",
      "commonMistake": "Tạo hai máy ở khu mặc định rồi ghi vào thiết kế là đã có dự phòng.",
      "action": "Kiểm tra xem các thành phần của bạn đang nằm ở những khu khả dụng nào."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Mở bảng điều khiển và ghi lại khu khả dụng của từng thành phần: máy chủ ứng dụng, cơ sở dữ liệu, bộ cân bằng tải. Nếu tất cả cùng một khu, bạn vừa tìm ra một điểm hỏng chung.",
      "secondary": "Nếu đã trải ra nhiều khu, thử tắt hẳn một máy và xem hệ thống có tự chuyển không. Làm thử lúc bình thường rẻ hơn nhiều so với lần đầu làm nó lúc đang có sự cố."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Hai từ này xuất hiện ở mọi bảng chọn khi bạn tạo tài nguyên, và rất nhiều người bấm qua chúng bằng giá trị mặc định. Nhầm hai khái niệm này là lý do một hệ thống có dự phòng trên giấy vẫn sập nguyên."
      },
      {
        "type": "heading",
        "text": "Hai mức"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Vùng",
          "text": "Một khu vực địa lý - Singapore, Tokyo, Mumbai. Cách nhau hàng nghìn kilomet, nên độ trễ giữa hai vùng là hàng chục tới hàng trăm mili giây."
        },
        "right": {
          "label": "Khu khả dụng",
          "text": "Một trung tâm dữ liệu riêng biệt BÊN TRONG một vùng. Nguồn điện và hệ thống mạng độc lập với nhau, nhưng gần nhau nên độ trễ chỉ khoảng một mili giây."
        }
      },
      {
        "type": "callout",
        "label": "Vì sao khu khả dụng là ý tưởng hay",
        "text": "Nó cho bạn hai thứ vốn xung khắc: tách biệt về điểm hỏng, mà vẫn gần nhau về độ trễ. Nhờ vậy bạn chạy được cơ sở dữ liệu đồng bộ giữa hai khu mà không phải trả giá bằng tốc độ."
      },
      {
        "type": "heading",
        "text": "Chống được gì và không chống được gì"
      },
      {
        "type": "list",
        "items": [
          "Nhiều khu trong một vùng: chống mất điện, hỏng thiết bị mạng, cháy ở một toà nhà.",
          "Nhiều vùng: chống sự cố ở mức cả khu vực - nhưng đắt hơn nhiều và phức tạp hơn nhiều.",
          "Không kiến trúc hạ tầng nào chống được lỗi trong mã của bạn. Nó chạy giống nhau ở mọi khu."
        ]
      },
      {
        "type": "paragraph",
        "text": "Với phần lớn dự án, nhiều khu trong một vùng là điểm cân bằng đúng. Nhiều vùng chỉ đáng khi bạn có người dùng ở nhiều châu lục, hoặc khi thời gian ngừng dịch vụ đắt tới mức trả được cái giá đó."
      },
      {
        "type": "paragraph",
        "text": "Phần đắt của nhiều vùng không phải máy chủ mà là DỮ LIỆU: đồng bộ cơ sở dữ liệu qua hàng nghìn kilomet buộc bạn chọn giữa chờ đợi và chấp nhận dữ liệu lệch nhau tạm thời. Đó là một quyết định kiến trúc, không phải một ô cấu hình."
      },
      {
        "type": "heading",
        "text": "Hai việc cụ thể"
      },
      {
        "type": "paragraph",
        "text": "Chọn vùng theo vị trí NGƯỜI DÙNG, vì khoảng cách vật lý tạo ra độ trễ mà không mã nào tối ưu được. Tiêu chí phụ là vùng đó có đủ dịch vụ bạn cần không - các vùng mới thường thiếu một số dịch vụ."
      },
      {
        "type": "closing",
        "lines": [
          "Và thử kích hoạt chuyển đổi dự phòng, đừng chỉ cấu hình nó. Đây là cùng bài học với bản sao lưu chưa khôi phục thử: một cơ chế chưa được kích hoạt thử thì chưa phải là cơ chế.",
          "Bài sau đi sâu vào con số mà khoảng cách vật lý tạo ra: độ trễ."
        ]
      }
    ]
  },
  {
    "id": 325,
    "slug": "do-tre-va-khoang-cach-vat-ly",
    "title": "Chặng 13, Bài 6: Độ trễ và khoảng cách vật lý",
    "subtitle": "Tốc độ ánh sáng là trần cứng, và nó gần hơn bạn tưởng.",
    "duration": "6 phút",
    "difficulty": "Trung bình",
    "emoji": "📡",
    "track": "personal",
    "isFundamental": true,
    "whyItMatters": "Rất nhiều nỗ lực tối ưu nhắm vào phần xử lý trong khi phần lớn thời gian chờ nằm ở đường truyền. Biết trần vật lý giúp bạn nhận ra khi nào tối ưu thêm là vô ích và phải đổi kiến trúc.",
    "openingQuestion": "Máy chủ của bạn ở Singapore, người dùng ở Hà Nội. Điều gì không tối ưu được bằng mã?",
    "openingOptions": [
      "Thời gian tín hiệu đi và về giữa hai nơi, vì nó bị chặn bởi tốc độ ánh sáng trong cáp",
      "Thời gian máy chủ xử lý yêu cầu, vì phần cứng ở vùng đó đã cố định không đổi được",
      "Thời gian trình duyệt dựng giao diện, vì nó phụ thuộc vào thiết bị của người dùng",
      "Thời gian truy vấn cơ sở dữ liệu, vì dữ liệu phải đọc từ ổ đĩa vật lý mỗi lần"
    ],
    "correctOption": 0,
    "explanation": "Ba thứ kia đều tối ưu được: nâng cấu hình máy, giảm khối lượng gửi về trình duyệt, thêm chỉ mục cho truy vấn. Thời gian tín hiệu đi và về thì bị chặn bởi vật lý - ánh sáng trong cáp quang đi chậm hơn trong chân không, và đường cáp không bao giờ là đường thẳng. Bạn chỉ có hai cách: đi ít lượt hơn, hoặc đặt dữ liệu gần người dùng hơn.",
    "diagram": [
      {
        "label": "Khoảng cách vật lý → độ trễ, không tối ưu được bằng mã",
        "arrow": true
      },
      {
        "label": "Cách 1: đi ít lượt hơn - gộp các lượt gọi lại",
        "arrow": true
      },
      {
        "label": "Cách 2: đặt dữ liệu gần người dùng hơn",
        "arrow": true
      },
      {
        "label": "Đo trước: phần lớn thời gian chờ nằm ở đâu?"
      }
    ],
    "realWorldExample": {
      "company": "Mười lượt gọi nối tiếp",
      "description": "Một trang gọi mười API lần lượt, mỗi lượt mất năm mươi mili giây đường truyền, thành nửa giây chỉ để đi lại. Gộp thành một lượt gọi trả về đủ dữ liệu thì còn năm mươi mili giây - và không dòng mã xử lý nào được tối ưu, chỉ có số lượt đi lại giảm đi."
    },
    "quiz": [
      {
        "question": "Vì sao độ trễ giữa hai châu lục không giảm được bằng cách nâng cấp đường truyền?",
        "options": [
          "Vì nó bị chặn bởi tốc độ ánh sáng trong cáp quang, còn băng thông là chuyện khác",
          "Vì các nhà mạng quốc tế giới hạn tốc độ truyền dữ liệu qua biên giới các quốc gia",
          "Vì tín hiệu phải đi qua nhiều thiết bị trung gian mà mỗi thiết bị đều có giới hạn xử lý",
          "Vì các tuyến cáp biển hiện đã hoạt động gần hết công suất nên không tăng tốc thêm nữa"
        ],
        "correct": 0,
        "explanation": "Đây là chỗ hai khái niệm hay bị nhầm: băng thông là bao nhiêu dữ liệu đi được mỗi giây, độ trễ là bao lâu để bit đầu tiên tới nơi. Tăng băng thông không làm bit đầu tiên tới sớm hơn chút nào."
      },
      {
        "question": "Vì sao gộp nhiều lượt gọi lại thành một cải thiện đáng kể?",
        "options": [
          "Vì mỗi lượt gọi phải trả trọn vẹn chi phí đi và về, nên mười lượt là mười lần khoảng đó",
          "Vì một lượt gọi lớn được nén hiệu quả hơn nhiều lượt gọi nhỏ nên tổng dữ liệu ít hơn",
          "Vì máy chủ xử lý một yêu cầu lớn nhanh hơn so với xử lý nhiều yêu cầu nhỏ liên tiếp",
          "Vì mỗi lượt gọi đều phải thiết lập lại kết nối mã hoá từ đầu nên tốn thêm thời gian mỗi lần"
        ],
        "correct": 0,
        "explanation": "Mười lượt nối tiếp mỗi lượt năm mươi mili giây thành nửa giây chỉ để đi lại. Việc thiết lập kết nối cũng tốn thật nhưng các giao thức hiện đại đã tái sử dụng kết nối, nên đó không còn là nguyên nhân chính."
      },
      {
        "question": "Mạng phân phối nội dung giải quyết vấn đề gì?",
        "options": [
          "Đặt bản sao nội dung tĩnh ở nhiều nơi để người dùng lấy từ điểm gần mình nhất",
          "Tăng băng thông của đường truyền giữa máy chủ và người dùng ở xa",
          "Nén nội dung trước khi gửi đi để giảm lượng dữ liệu phải truyền qua mạng",
          "Phân tán tải giữa nhiều máy chủ để không máy nào bị quá tải khi lưu lượng lên cao"
        ],
        "correct": 0,
        "explanation": "Nó tấn công đúng nguyên nhân gốc bằng cách rút ngắn khoảng cách vật lý. Đó cũng là lý do nó chỉ giúp cho nội dung TĨNH - phần dữ liệu động riêng cho từng người vẫn phải về tận máy chủ gốc."
      },
      {
        "question": "Vì sao nên đo trước khi tối ưu độ trễ?",
        "options": [
          "Vì thời gian chờ có thể nằm ở đường truyền, ở máy chủ, hay ở trình duyệt - mỗi chỗ chữa khác nhau",
          "Vì các công cụ đo cho biết chính xác nhà mạng nào đang gây ra độ trễ cao nhất",
          "Vì độ trễ thay đổi theo từng thời điểm trong ngày nên cần đo nhiều lần rồi lấy giá trị trung bình",
          "Vì đo được con số cụ thể giúp bạn thuyết phục được cấp trên duyệt ngân sách tối ưu"
        ],
        "correct": 0,
        "explanation": "Không đo thì người ta thường tối ưu phần mã xử lý, vì đó là phần dễ nhìn thấy nhất - trong khi phần lớn thời gian chờ có thể đang nằm ở mười lượt đi lại mà không ai đếm."
      },
      {
        "question": "Vì sao đặt máy chủ ở vùng gần người dùng lại quan trọng hơn nâng cấu hình máy?",
        "options": [
          "Vì độ trễ đường truyền thường lớn hơn nhiều so với thời gian máy chủ xử lý một yêu cầu",
          "Vì máy chủ cấu hình cao hơn sẽ tiêu tốn nhiều điện năng hơn nên chi phí vận hành tăng lên",
          "Vì các vùng gần người dùng thường có giá thuê máy thấp hơn so với vùng ở xa",
          "Vì nâng cấu hình máy chỉ giúp được khi số lượng người dùng đồng thời tăng cao"
        ],
        "correct": 0,
        "explanation": "Một yêu cầu điển hình mất vài chục mili giây để xử lý và có thể mất hàng trăm mili giây để đi và về từ nửa kia địa cầu. Nâng máy gấp đôi thì cắt được vài chục; đổi vùng thì cắt được hàng trăm."
      }
    ],
    "keyTakeaways": [
      "Băng thông là bao nhiêu mỗi giây; độ trễ là bao lâu để bit đầu tiên tới - hai thứ khác nhau.",
      "Tốc độ ánh sáng là trần cứng, nên chỉ có hai cách: đi ít lượt hơn hoặc đặt gần hơn.",
      "Mười lượt gọi nối tiếp là mười lần trả trọn chi phí đi và về.",
      "Mạng phân phối nội dung rút ngắn khoảng cách thật, nhưng chỉ cho nội dung tĩnh.",
      "Đo trước: thời gian chờ ở đường truyền, ở máy chủ hay ở trình duyệt thì chữa khác nhau."
    ],
    "practicePrompt": {
      "question": "Trang của bạn tải chậm với người dùng ở xa. Bạn nâng cấu hình máy chủ lên gấp đôi. Kết quả?",
      "options": [
        "Gần như không đổi, vì phần lớn thời gian chờ nằm ở đường truyền chứ không ở xử lý",
        "Nhanh hơn khoảng gấp đôi, vì máy chủ xử lý được nhiều yêu cầu hơn trong cùng thời gian",
        "Nhanh hơn đáng kể vào giờ cao điểm nhưng không đổi trong những khung giờ vắng",
        "Chậm hơn, vì máy cấu hình cao cần thời gian khởi động lâu hơn khi có yêu cầu mới"
      ],
      "correct": 0,
      "explanation": "Đây là cách tiền bị tiêu vào đúng chỗ không phải nút thắt. Nâng máy chỉ giúp khi máy đang quá tải, còn với người dùng ở xa thì nút thắt là khoảng cách - và tiền đó lẽ ra nên dùng cho một vùng gần hơn hoặc một mạng phân phối nội dung."
    },
    "summary": {
      "keyIdea": "Khoảng cách vật lý là trần cứng; mã không vượt qua được, chỉ có kiến trúc mới đi vòng được.",
      "formula": "Giảm SỐ LƯỢT đi lại, hoặc giảm KHOẢNG CÁCH mỗi lượt phải đi.",
      "commonMistake": "Tối ưu phần xử lý vì nó dễ nhìn, trong khi thời gian chờ nằm ở đường truyền.",
      "action": "Đếm số lượt gọi mà trang chính của bạn thực hiện trước khi hiển thị xong."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Mở công cụ mạng của trình duyệt trên trang chính của bạn và đếm số lượt gọi trước khi trang hiển thị xong. Chú ý những lượt nối tiếp nhau chứ không chạy song song.",
      "secondary": "Mỗi chuỗi nối tiếp là một lần cộng dồn độ trễ. Gộp chúng lại hoặc cho chạy song song thường cho cải thiện lớn hơn mọi tối ưu ở phía máy chủ."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bài trước nói khoảng cách vật lý tạo ra độ trễ. Bài này là con số cụ thể của chuyện đó, và vì sao nó là một trong số ít giới hạn trong nghề mà bạn không lập trình vòng qua được."
      },
      {
        "type": "heading",
        "text": "Hai khái niệm hay bị nhầm"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Băng thông",
          "text": "Bao nhiêu dữ liệu đi được mỗi giây. Cái này mua thêm được, và nó quyết định thời gian tải một tệp lớn."
        },
        "right": {
          "label": "Độ trễ",
          "text": "Bao lâu để bit ĐẦU TIÊN tới nơi. Cái này bị chặn bởi tốc độ ánh sáng trong cáp quang, và tăng băng thông không làm nó nhỏ đi chút nào."
        }
      },
      {
        "type": "callout",
        "label": "Vì sao đó là trần cứng",
        "text": "Ánh sáng trong cáp quang đi chậm hơn trong chân không, và đường cáp không bao giờ là đường thẳng giữa hai điểm. Một chuyến đi và về giữa hai châu lục mất hàng trăm mili giây, và không nhà cung cấp nào bán được cách vượt qua nó."
      },
      {
        "type": "heading",
        "text": "Hai cách đi vòng"
      },
      {
        "type": "list",
        "items": [
          "Đi ít lượt hơn: gộp mười lượt gọi thành một. Mười lượt nối tiếp mỗi lượt năm mươi mili giây thành nửa giây chỉ để đi lại - gộp lại thì còn năm mươi.",
          "Đặt gần hơn: chọn vùng gần người dùng, hoặc dùng mạng phân phối nội dung đặt bản sao ở nhiều nơi."
        ]
      },
      {
        "type": "paragraph",
        "text": "Cách thứ hai có một giới hạn cần nhớ: mạng phân phối nội dung chỉ giúp cho nội dung TĨNH. Phần dữ liệu động riêng cho từng người vẫn phải đi về tận máy chủ gốc, nên nó không thay được việc chọn đúng vùng."
      },
      {
        "type": "heading",
        "text": "Đo trước khi sửa"
      },
      {
        "type": "paragraph",
        "text": "Thời gian chờ của người dùng có thể nằm ở ba chỗ: đường truyền, xử lý ở máy chủ, hoặc dựng giao diện ở trình duyệt. Mỗi chỗ chữa khác nhau, và không đo thì người ta thường tối ưu phần mã xử lý vì đó là phần dễ nhìn thấy nhất."
      },
      {
        "type": "paragraph",
        "text": "Con số đáng nhớ để so sánh: một yêu cầu điển hình mất vài chục mili giây để máy chủ xử lý, và có thể mất hàng TRĂM mili giây để đi và về từ nửa kia địa cầu. Nâng máy gấp đôi cắt được vài chục; đổi vùng cắt được hàng trăm."
      },
      {
        "type": "closing",
        "lines": [
          "Đó là lý do nâng cấu hình máy chủ cho người dùng ở xa gần như không đổi được gì - tiền đi vào đúng chỗ không phải nút thắt.",
          "Bài sau quay lại câu hỏi thực dụng nhất của cả chặng: dùng dịch vụ quản lý sẵn hay tự dựng."
        ]
      }
    ]
  },
  {
    "id": 326,
    "slug": "chon-dich-vu-quan-ly-san-hay-tu-dung",
    "title": "Chặng 13, Bài 7: Dịch vụ quản lý sẵn hay tự dựng",
    "subtitle": "Câu hỏi không phải cái nào rẻ hơn, mà việc này có phải thứ bạn nên giỏi không.",
    "duration": "6 phút",
    "difficulty": "Trung bình",
    "emoji": "⚖️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Mỗi lần chọn tự dựng là bạn nhận thêm một hệ thống phải vận hành mãi mãi. Với đội nhỏ, tổng số hệ thống phải vận hành là thứ quyết định bạn còn bao nhiêu thời gian cho sản phẩm.",
    "openingQuestion": "Khi nào tự dựng một dịch vụ thay vì dùng bản quản lý sẵn là hợp lý?",
    "openingOptions": [
      "Khi bạn có yêu cầu đặc thù mà bản quản lý sẵn không đáp ứng, và bạn có người vận hành",
      "Khi chi phí của bản quản lý sẵn cao hơn chi phí thuê máy để tự dựng dịch vụ đó",
      "Khi đội của bạn đã có kinh nghiệm vận hành loại dịch vụ đó ở dự án trước đây",
      "Khi bạn muốn tránh phụ thuộc vào nhà cung cấp để giữ khả năng chuyển đi về sau"
    ],
    "correctOption": 0,
    "explanation": "Hai điều kiện phải đúng cùng lúc, và người ta hay chỉ kiểm tra điều kiện đầu. So chi phí thuần theo giá thuê là so sai đơn vị, vì nó bỏ qua thời gian vận hành. Kinh nghiệm cũ giúp bạn dựng nhanh hơn nhưng không làm giảm công vận hành hằng ngày. Còn tránh phụ thuộc là mối lo hợp lý, nhưng nó được giải bằng một lớp trung gian chứ không phải bằng cách tự dựng mọi thứ.",
    "diagram": [
      {
        "label": "Dựng là việc một lần; vận hành là việc mãi mãi",
        "arrow": true
      },
      {
        "label": "Cập nhật, sao lưu, theo dõi, xử lý sự cố lúc nửa đêm",
        "arrow": true
      },
      {
        "label": "Đội nhỏ: tổng số hệ thống phải vận hành mới là giới hạn",
        "arrow": true
      },
      {
        "label": "Tự dựng khi có yêu cầu đặc thù VÀ có người vận hành"
      }
    ],
    "realWorldExample": {
      "company": "Cuối tuần dựng xong, ba năm vận hành",
      "description": "Dựng một hệ quản trị cơ sở dữ liệu hay một hàng đợi tin nhắn mất một buổi chiều và ai cũng làm được. Phần khó nằm ở ba năm sau đó: vá lỗi bảo mật, nâng phiên bản, khôi phục khi hỏng lúc hai giờ sáng. Người ta ước lượng cho phần đầu và trả cho phần sau."
    },
    "quiz": [
      {
        "question": "Chi phí thật của việc tự dựng một dịch vụ nằm ở đâu?",
        "options": [
          "Ở phần vận hành kéo dài: cập nhật, sao lưu, theo dõi và xử lý sự cố ngoài giờ",
          "Ở giai đoạn dựng ban đầu, vì đó là lúc cần nhiều công sức và kiến thức nhất",
          "Ở chi phí thuê máy chủ để chạy dịch vụ đó liên tục hai mươi tư giờ mỗi ngày",
          "Ở việc phải đào tạo thêm người trong đội để ai cũng biết cách sử dụng dịch vụ đó"
        ],
        "correct": 0,
        "explanation": "Dựng là việc một lần và mất một buổi chiều; vận hành là việc mãi mãi. Người ta ước lượng cho phần đầu và trả cho phần sau, và đó là lý do quyết định này hay bị đánh giá sai."
      },
      {
        "question": "Vì sao đội nhỏ nên hạn chế số hệ thống tự vận hành?",
        "options": [
          "Vì mỗi hệ thống chiếm một phần sự chú ý cố định, và tổng của chúng mới là giới hạn thật",
          "Vì càng nhiều hệ thống thì càng khó tìm được người có đủ kiến thức về tất cả chúng",
          "Vì các hệ thống tự vận hành thường không tương thích tốt với nhau khi phải kết nối chúng lại",
          "Vì chi phí thuê máy cho từng hệ thống cộng lại sẽ vượt quá ngân sách hạ tầng"
        ],
        "correct": 0,
        "explanation": "Đây là ràng buộc mà người ta hay bỏ qua khi quyết định từng cái một: mỗi lựa chọn riêng lẻ đều hợp lý, nhưng tổng của chúng thì vượt quá khả năng của đội. Câu hỏi đúng không phải cái này có nên tự dựng không mà là chúng ta chịu nổi bao nhiêu hệ thống."
      },
      {
        "question": "Lo ngại phụ thuộc nhà cung cấp nên được giải quyết thế nào?",
        "options": [
          "Bằng một lớp trung gian trong mã để đổi nhà cung cấp là sửa một chỗ",
          "Bằng cách tự dựng mọi dịch vụ quan trọng để không phụ thuộc vào bên ngoài",
          "Bằng cách dùng đồng thời hai nhà cung cấp để luôn có phương án thay thế sẵn",
          "Bằng cách chỉ ký hợp đồng ngắn hạn để có thể chuyển đi bất cứ lúc nào cần"
        ],
        "correct": 0,
        "explanation": "Đây là cùng kỹ thuật ở bài tổng kết chặng API, áp dụng cho hạ tầng. Tự dựng mọi thứ để tránh phụ thuộc là trả một cái giá rất lớn cho một rủi ro thường không xảy ra - và bạn vẫn phụ thuộc, chỉ là phụ thuộc vào chính mình."
      },
      {
        "question": "Dịch vụ nào gần như luôn nên dùng bản quản lý sẵn?",
        "options": [
          "Cơ sở dữ liệu, vì sao lưu và chuyển đổi khi hỏng là việc dễ sai mà hậu quả không cứu được",
          "Máy chủ ứng dụng, vì đó là phần trực tiếp chạy mã của bạn nên cần được quản lý chặt nhất",
          "Hệ thống ghi nhật ký, vì lượng dữ liệu lớn nên tự vận hành sẽ rất tốn kém",
          "Bộ nhớ đệm, vì nó ảnh hưởng trực tiếp tới tốc độ mà người dùng cảm nhận được"
        ],
        "correct": 0,
        "explanation": "Điểm phân biệt là hậu quả khi làm sai: mất dữ liệu thuộc nhóm không cứu được, còn bộ nhớ đệm hỏng thì hệ thống chỉ chậm đi. Đó là lý do cơ sở dữ liệu xếp đầu danh sách nên giao ra ngoài."
      },
      {
        "question": "Vì sao nên hỏi việc này có phải thứ chúng ta nên giỏi không?",
        "options": [
          "Vì thời gian dành cho nó là thời gian không dành cho thứ tạo ra khác biệt cho sản phẩm",
          "Vì kỹ năng vận hành hạ tầng rất khó tuyển người nên cả đội sẽ phụ thuộc vào một cá nhân",
          "Vì các nhà cung cấp liên tục cải tiến nên kiến thức tự vận hành sẽ nhanh lỗi thời",
          "Vì khách hàng không quan tâm hạ tầng nên đầu tư vào đó không tăng được doanh thu"
        ],
        "correct": 0,
        "explanation": "Câu hỏi này biến một quyết định kỹ thuật thành một quyết định về ưu tiên, và nó thường cho câu trả lời rõ hơn nhiều so với việc so bảng giá. Nó cũng đúng cùng nguyên tắc với việc chọn tự viết hay dùng dịch vụ ngoài ở chặng API."
      }
    ],
    "keyTakeaways": [
      "Dựng là việc một lần; vận hành là việc mãi mãi - người ta ước lượng phần đầu và trả phần sau.",
      "Với đội nhỏ, TỔNG số hệ thống phải vận hành mới là giới hạn thật.",
      "Lo phụ thuộc thì giải bằng lớp trung gian, không phải bằng cách tự dựng mọi thứ.",
      "Cơ sở dữ liệu xếp đầu danh sách nên giao ra ngoài, vì mất dữ liệu là loại không cứu được.",
      "Câu hỏi đúng: việc này có phải thứ chúng ta nên giỏi không?"
    ],
    "practicePrompt": {
      "question": "Bản quản lý sẵn đắt gấp ba lần tự dựng trên bảng giá. Nên tính thêm gì trước khi quyết?",
      "options": [
        "Số giờ mỗi tháng đội bạn sẽ dành cho vận hành, nhân với giá trị một giờ làm việc",
        "Chi phí băng thông phát sinh khi dịch vụ tự dựng phải đồng bộ dữ liệu giữa các máy",
        "Chi phí mua thêm bản quyền phần mềm cho phiên bản dùng trong môi trường doanh nghiệp",
        "Thời gian ban đầu để dựng dịch vụ đó, quy đổi ra chi phí và cộng vào tổng đầu tư"
      ],
      "correct": 0,
      "explanation": "Thời gian dựng ban đầu cũng nên tính, nhưng nó là một lần và thường nhỏ hơn nhiều so với phần vận hành lặp lại hằng tháng suốt nhiều năm. Đây lại là bài học so sai đơn vị đã gặp ở chặng triển khai."
    },
    "summary": {
      "keyIdea": "Câu hỏi không phải cái nào rẻ hơn, mà việc này có phải thứ bạn nên giỏi không.",
      "formula": "Tự dựng khi có yêu cầu đặc thù VÀ có người vận hành - thiếu một vế thì không.",
      "commonMistake": "So giá thuê máy với giá dịch vụ quản lý sẵn mà bỏ qua thời gian vận hành.",
      "action": "Đếm số hệ thống mà đội bạn đang tự vận hành và ước lượng giờ mỗi tháng cho chúng."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Liệt kê mọi hệ thống mà đội bạn đang tự vận hành. Với từng cái, ước lượng số giờ mỗi tháng dành cho nó - kể cả những giờ xử lý sự cố ngoài giờ làm.",
      "secondary": "Cộng lại và so với tổng thời gian của đội. Con số đó thường lớn hơn nhiều so với cảm giác, vì mỗi hệ thống riêng lẻ thì nhỏ."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Đây là quyết định bạn gặp lại nhiều lần trong đời làm nghề: cơ sở dữ liệu, hàng đợi, bộ nhớ đệm, hệ thống ghi nhật ký. Mỗi lần đều có bản quản lý sẵn đắt hơn và bản tự dựng rẻ hơn trên bảng giá."
      },
      {
        "type": "heading",
        "text": "Chi phí nằm ở chỗ người ta không nhìn"
      },
      {
        "type": "callout",
        "label": "Dựng một lần, vận hành mãi mãi",
        "text": "Dựng một hệ quản trị cơ sở dữ liệu hay một hàng đợi tin nhắn mất một buổi chiều và ai cũng làm được. Phần khó là ba năm sau đó: vá lỗi bảo mật, nâng phiên bản, khôi phục khi hỏng lúc hai giờ sáng. Người ta ước lượng cho phần đầu và trả cho phần sau."
      },
      {
        "type": "paragraph",
        "text": "Với đội nhỏ, ràng buộc thật không phải chi phí mà là SỐ LƯỢNG. Mỗi hệ thống chiếm một phần sự chú ý cố định, và từng lựa chọn riêng lẻ đều hợp lý trong khi tổng của chúng thì vượt quá khả năng của đội."
      },
      {
        "type": "heading",
        "text": "Hai điều kiện để tự dựng"
      },
      {
        "type": "list",
        "items": [
          "Có yêu cầu đặc thù mà bản quản lý sẵn không đáp ứng được - không phải là bạn thích kiểm soát hơn.",
          "Có người vận hành được, và người đó còn thời gian sau khi đã lo những hệ thống hiện có."
        ]
      },
      {
        "type": "paragraph",
        "text": "Hai điều kiện phải đúng CÙNG LÚC, và người ta hay chỉ kiểm tra điều kiện đầu. Kinh nghiệm cũ giúp bạn dựng nhanh hơn nhưng không làm giảm công vận hành hằng ngày, nên nó không thay được điều kiện thứ hai."
      },
      {
        "type": "heading",
        "text": "Một mối lo được giải sai"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Mối lo",
          "text": "Dùng dịch vụ quản lý sẵn thì phụ thuộc vào nhà cung cấp, và chuyển đi về sau sẽ rất tốn kém."
        },
        "right": {
          "label": "Cách giải đúng",
          "text": "Một lớp trung gian trong mã, để đổi nhà cung cấp là sửa một chỗ. Tự dựng mọi thứ là trả một cái giá rất lớn cho một rủi ro thường không xảy ra."
        }
      },
      {
        "type": "paragraph",
        "text": "Có một dịch vụ gần như luôn nên giao ra ngoài: cơ sở dữ liệu. Điểm phân biệt là hậu quả khi làm sai - mất dữ liệu thuộc nhóm không cứu được, còn bộ nhớ đệm hỏng thì hệ thống chỉ chậm đi."
      },
      {
        "type": "closing",
        "lines": [
          "Câu hỏi cho ra câu trả lời rõ nhất không phải cái nào rẻ hơn, mà: việc này có phải thứ chúng ta nên giỏi không? Nó biến một quyết định kỹ thuật thành một quyết định về ưu tiên.",
          "Bài cuối chặng gom lại thành một cách nghĩ dùng được cho mọi lựa chọn hạ tầng về sau."
        ]
      }
    ]
  },
  {
    "id": 327,
    "slug": "tong-ket-dam-may-va-ha-tang",
    "title": "Chặng 13, Bài 8: Tổng kết - đám mây và hạ tầng thuê ngoài",
    "subtitle": "Bốn câu hỏi thay cho việc nhớ tên dịch vụ, vốn đổi mỗi năm.",
    "duration": "6 phút",
    "difficulty": "Trung bình",
    "emoji": "🏁",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Tên dịch vụ và bảng giá đổi liên tục, nên nhớ chúng có hạn sử dụng ngắn. Bốn câu hỏi trong bài này thì dùng được cho cả những dịch vụ chưa ra đời.",
    "openingQuestion": "Thứ nào từ chặng này còn giá trị lâu nhất?",
    "openingOptions": [
      "Thói quen hỏi mình đang trả cho tính chất nào, và mình có dùng tính chất đó không",
      "Bảng so sánh giá và tính năng giữa các nhà cung cấp đám mây lớn hiện nay",
      "Kiến thức về tên gọi và cách cấu hình các dịch vụ của nhà cung cấp bạn đang dùng",
      "Danh sách các loại máy ảo và mức giá tương ứng của từng cấu hình phổ biến"
    ],
    "correctOption": 0,
    "explanation": "Ba lựa chọn kia đều đổi hằng năm và tra lại được trong vài phút. Câu hỏi về tính chất thì áp dụng được cho mọi lựa chọn hạ tầng, kể cả những dịch vụ chưa ra đời: bạn đang trả thêm cho tính co giãn, cho việc khỏi vận hành, hay cho độ tin cậy - và hình dạng nhu cầu của bạn có cần cái đó không.",
    "diagram": [
      {
        "label": "1. Nhu cầu của tôi có hình dạng gì?",
        "arrow": true
      },
      {
        "label": "2. Tôi có bao nhiêu người để vận hành?",
        "arrow": true
      },
      {
        "label": "3. Hỏng thì mất bao lâu để hồi phục?",
        "arrow": true
      },
      {
        "label": "4. Rời đi thì mất bao lâu?"
      }
    ],
    "realWorldExample": {
      "company": "Mặc định là một quyết định",
      "description": "Rất nhiều thứ trong đám mây được chọn bằng cách bấm qua giá trị mặc định: khu khả dụng, vùng, cấu hình máy, chính sách sao lưu. Mỗi cái đều là một quyết định thật với hệ quả thật, chỉ là không ai nhớ mình đã đưa ra nó."
    },
    "quiz": [
      {
        "question": "Câu hỏi về hình dạng nhu cầu giúp quyết định điều gì?",
        "options": [
          "Bạn có cần tính co giãn không, tức đám mây có đáng giá hơn máy thuê không",
          "Cấu hình máy nào phù hợp nhất với khối lượng công việc mà ứng dụng phải xử lý",
          "Vùng nào nên được chọn để đặt hệ thống dựa trên phân bố người dùng thực tế",
          "Nên dùng dịch vụ quản lý sẵn hay tự dựng cho từng thành phần trong hệ thống"
        ],
        "correct": 0,
        "explanation": "Đây là câu hỏi đầu tiên vì nó quyết định cả nhóm lựa chọn phía sau. Lưu lượng phẳng thì máy thuê thường thắng, và mọi tối ưu chi tiết sau đó đều nằm trong một khung đã chọn sai."
      },
      {
        "question": "Vì sao câu hỏi về số người vận hành lại quan trọng?",
        "options": [
          "Vì nó quyết định bạn nên ở tầng dịch vụ nào và tự vận hành được bao nhiêu hệ thống",
          "Vì nhà cung cấp có các gói hỗ trợ khác nhau tuỳ theo quy mô đội kỹ thuật của bạn",
          "Vì số người quyết định tốc độ xử lý sự cố nên ảnh hưởng tới cam kết dịch vụ",
          "Vì đội càng đông thì lại càng cần công cụ quản lý quyền truy cập chi tiết hơn nữa"
        ],
        "correct": 0,
        "explanation": "Nó là ràng buộc thật nhưng ít khi được viết ra, vì người ta quyết định từng hệ thống một. Câu hỏi đúng không phải cái này có tự dựng được không mà là chúng ta chịu nổi bao nhiêu hệ thống cùng lúc."
      },
      {
        "question": "Vì sao giá trị mặc định trong đám mây đáng được xem lại?",
        "options": [
          "Vì mỗi mặc định là một quyết định thật với hệ quả thật, chỉ là không ai nhớ đã đưa ra nó",
          "Vì các giá trị mặc định thường được đặt theo hướng có lợi nhất cho nhà cung cấp",
          "Vì giá trị mặc định thay đổi giữa các phiên bản nên hệ thống cũ và hệ thống mới sẽ khác nhau",
          "Vì mặc định được thiết kế cho hệ thống lớn nên thường thừa với dự án nhỏ"
        ],
        "correct": 0,
        "explanation": "Khu khả dụng, vùng, cấu hình máy, chính sách sao lưu - tất cả đều có mặc định, và bấm qua chúng vẫn là chọn. Loại quyết định nguy hiểm nhất là loại không ai biết mình đã đưa ra."
      },
      {
        "question": "Ba con số tối thiểu nên theo dõi cho hạ tầng đám mây là gì?",
        "options": [
          "Chi phí theo dịch vụ, mức sử dụng tài nguyên thật, và cảnh báo khi vượt ngân sách",
          "Số máy đang chạy, dung lượng lưu trữ đã dùng, và băng thông tiêu thụ mỗi tháng",
          "Thời gian hoạt động, số lần sự cố, và thời gian trung bình để khắc phục mỗi lần",
          "Số người dùng đồng thời, số yêu cầu mỗi giây, và tỷ lệ yêu cầu bị lỗi"
        ],
        "correct": 0,
        "explanation": "Ba con số này trả lời riêng câu hỏi về hạ tầng: tiền đang đi đâu, có đang trả cho thứ không dùng không, và có gì bất thường không. Các chỉ số về sự cố và người dùng thì thuộc về việc theo dõi ứng dụng."
      },
      {
        "question": "Nguyên tắc nào áp dụng được cho cả dịch vụ chưa ra đời?",
        "options": [
          "Hỏi mình đang trả thêm cho tính chất nào, và nhu cầu của mình có dùng tính chất đó không",
          "Chọn nhà cung cấp lớn nhất vì họ có nhiều dịch vụ và cộng đồng hỗ trợ đông nhất",
          "Ưu tiên dịch vụ mới vì chúng thường có mức giá cạnh tranh hơn hẳn trong thời gian mới ra mắt",
          "Tránh mọi dịch vụ riêng của nhà cung cấp để giữ khả năng chuyển đi bất cứ lúc nào"
        ],
        "correct": 0,
        "explanation": "Nó là câu hỏi về cấu trúc giá chứ không về sản phẩm cụ thể, nên nó không lỗi thời. Tránh mọi dịch vụ riêng thì quá cứng nhắc - nguyên tắc đúng là biết mình đang đổi gì lấy gì."
      }
    ],
    "keyTakeaways": [
      "Bốn câu hỏi: hình dạng nhu cầu, số người vận hành, thời gian hồi phục, thời gian rời đi.",
      "Mỗi giá trị mặc định là một quyết định thật - loại nguy hiểm nhất là loại không ai nhớ.",
      "Theo dõi chi phí theo dịch vụ, mức sử dụng thật, và cảnh báo vượt ngân sách.",
      "Hỏi mình đang trả thêm cho tính chất nào - câu hỏi đó không lỗi thời theo bảng giá.",
      "Tên dịch vụ và giá đổi hằng năm; cách nghĩ thì dùng được cho cả thứ chưa ra đời."
    ],
    "practicePrompt": {
      "question": "Bạn sắp chọn một dịch vụ đám mây mới chưa từng dùng. Câu hỏi đầu tiên nên đặt là gì?",
      "options": [
        "Nó đắt hơn cách làm thủ công ở chỗ nào, và mình có dùng tới đúng phần đắt thêm đó không",
        "Nó có được nhiều công ty lớn sử dụng không, để biết mức độ tin cậy của dịch vụ",
        "Nó có tương thích với các dịch vụ khác mà hệ thống của mình đang sử dụng không",
        "Nó có tài liệu hướng dẫn đầy đủ và cộng đồng hỗ trợ đủ lớn để tự học được không"
      ],
      "correct": 0,
      "explanation": "Ba câu kia đều đáng hỏi nhưng chúng là câu hỏi về chất lượng dịch vụ. Câu đầu là câu hỏi về việc nó có phù hợp với BẠN không, và đó là câu duy nhất mà tài liệu của nhà cung cấp không trả lời hộ được."
    },
    "summary": {
      "keyIdea": "Bốn câu hỏi về nhu cầu và ràng buộc của bạn, thay cho việc nhớ tên dịch vụ.",
      "formula": "Hình dạng nhu cầu → số người vận hành → thời gian hồi phục → thời gian rời đi.",
      "commonMistake": "Bấm qua giá trị mặc định rồi quên rằng mình vừa đưa ra một quyết định.",
      "action": "Chạy bốn câu hỏi này qua hạ tầng hiện tại của bạn và ghi lại câu trả lời."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Chạy bốn câu hỏi qua hạ tầng hiện tại của bạn và viết ra câu trả lời cho từng cái. Câu nào bạn không trả lời được ngay thì đó là chỗ đáng tìm hiểu trước.",
      "secondary": "Sau đó mở lại các giá trị mặc định bạn đã bấm qua - vùng, khu khả dụng, chính sách sao lưu - và quyết định lại chúng một cách có ý thức."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chặng này đi từ đám mây bán cái gì tới việc chọn từng dịch vụ. Bài cuối không thêm kiến thức mới mà rút ra bốn câu hỏi - vì tên dịch vụ và bảng giá đổi hằng năm, còn câu hỏi thì không."
      },
      {
        "type": "heading",
        "text": "Bốn câu hỏi"
      },
      {
        "type": "list",
        "items": [
          "Nhu cầu của tôi có HÌNH DẠNG gì? Thất thường thì đám mây đáng tiền; phẳng thì máy thuê thường thắng.",
          "Tôi có bao nhiêu người để VẬN HÀNH? Nó quyết định tầng dịch vụ và số hệ thống tự dựng được.",
          "Hỏng thì mất bao lâu để HỒI PHỤC? Câu này quyết định bạn cần mấy khu khả dụng, mấy vùng.",
          "Rời đi thì mất bao lâu? Nó cho biết bạn đang chấp nhận mức ràng buộc nào."
        ]
      },
      {
        "type": "callout",
        "label": "Vì sao câu một đứng đầu",
        "text": "Nó quyết định cả nhóm lựa chọn phía sau. Nếu lưu lượng của bạn phẳng thì mọi tối ưu chi tiết sau đó đều nằm trong một khung đã chọn sai - bạn đang trả cho tính co giãn mà nhu cầu không dùng tới."
      },
      {
        "type": "heading",
        "text": "Thứ dễ quên nhất"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Bạn nghĩ mình chưa quyết",
          "text": "Khu khả dụng, vùng, cấu hình máy, chính sách sao lưu - bấm qua giá trị mặc định vì đang vội và sẽ xem lại sau."
        },
        "right": {
          "label": "Thực tế",
          "text": "Mỗi mặc định là một quyết định thật với hệ quả thật. Loại quyết định nguy hiểm nhất là loại không ai nhớ mình đã đưa ra - vì không ai xem lại thứ mình không biết là mình đã chọn."
        }
      },
      {
        "type": "heading",
        "text": "Ba con số theo dõi"
      },
      {
        "type": "paragraph",
        "text": "Chi phí theo dịch vụ để biết tiền đang đi đâu; mức sử dụng tài nguyên thật để biết có đang trả cho thứ không dùng không; và cảnh báo khi vượt ngân sách để hoá đơn bất ngờ không đợi tới ngày thanh toán mới lộ."
      },
      {
        "type": "paragraph",
        "text": "Ba con số này thuộc về hạ tầng và khác với những con số theo dõi ứng dụng ở chặng triển khai. Cả hai nhóm đều cần, và chúng trả lời hai câu hỏi khác nhau."
      },
      {
        "type": "closing",
        "lines": [
          "Nguyên tắc còn giá trị lâu nhất: khi gặp một dịch vụ mới, hỏi mình đang trả thêm cho TÍNH CHẤT nào, và nhu cầu của mình có dùng tới tính chất đó không.",
          "Đó là câu hỏi về cấu trúc giá chứ không về sản phẩm, nên nó dùng được cho cả những dịch vụ chưa ra đời."
        ]
      }
    ]
  },
];
