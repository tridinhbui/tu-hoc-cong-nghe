import type { Lesson } from "./lesson-types";

// Chặng "Cơ chế phát hành và di trú hệ thống" (ids 1521-1526, professional).
//
// Chặng 10 dạy vì sao chọn kiến trúc này, chặng 32 lo phần cơ khí ở giữa:
// đưa một thay đổi tới người dùng mà không làm hỏng thứ đang chạy, rồi gỡ
// bỏ thứ nó thay thế. Phần lớn sự cố sản xuất bắt nguồn từ một thay đổi vừa
// được đưa lên, và phần lớn hệ thống cũ thì không bao giờ được gỡ.

export const RELEASE_MECHANICS_LESSONS: Lesson[] = [
  {
    "id": 1521,
    "slug": "phat-hanh-dan-thay-vi-bat-cho-tat-ca",
    "title": "Phát hành, Bài 1: Phát hành dần - vì sao không bật cho tất cả cùng lúc",
    "subtitle": "Bản phát hành nào cũng là một giả thuyết; phát hành dần là cách kiểm nó với ít người nhất.",
    "duration": "11 phút",
    "difficulty": "Khó",
    "track": "professional",
    "emoji": "➗",
    "whyItMatters": "Phần lớn sự cố sản xuất bắt nguồn từ một thay đổi vừa được đưa lên. Phát hành dần không làm thay đổi an toàn hơn - nó làm cho thiệt hại khi thay đổi sai nhỏ đi.",
    "openingQuestion": "Phát hành dần giúp được gì mà kiểm thử kỹ trước khi phát hành không giúp được?",
    "openingOptions": [
      "Nó bắt được những lỗi chỉ lộ ra với dữ liệu thật và tải thật của người dùng",
      "Nó giảm số lượng lỗi có trong bản phát hành trước khi đưa lên môi trường thật",
      "Nó cho phép đội kiểm thử thêm một lượt nữa trên chính môi trường sản xuất",
      "Nó làm cho việc quay lui về phiên bản cũ diễn ra nhanh hơn khi có sự cố"
    ],
    "correctOption": 0,
    "explanation": "Môi trường kiểm thử không bao giờ có đủ hình dạng dữ liệu thật, đủ mức đồng thời thật, đủ những cấu hình lạ mà người dùng thật mang tới. Phát hành dần chấp nhận điều đó và đổi chiến lược: thay vì cố tìm hết lỗi trước, nó giới hạn số người gặp lỗi còn sót. Quay lui nhanh là lợi ích thật nhưng nó là hệ quả, không phải mục đích.",
    "diagram": [
      {
        "label": "Bản phát hành nào cũng là một giả thuyết chưa được kiểm",
        "arrow": true
      },
      {
        "label": "1% người dùng → xem chỉ số → 10% → 50% → tất cả",
        "arrow": true
      },
      {
        "label": "Mỗi mức phải có ngưỡng dừng ĐẶT TRƯỚC",
        "arrow": true
      },
      {
        "label": "Không có ngưỡng thì đó chỉ là phát hành chậm"
      }
    ],
    "realWorldExample": {
      "company": "Ngưỡng đặt trước, không phải cảm giác",
      "description": "Điều phân biệt phát hành dần với phát hành chậm là ngưỡng dừng viết ra TRƯỚC. Không có nó thì ở mỗi mức, người ta nhìn biểu đồ và tự hỏi thế này có tệ không - và câu trả lời luôn nghiêng về tiếp tục, vì đã đi được nửa đường rồi."
    },
    "quiz": [
      {
        "question": "Vì sao ngưỡng dừng phải được viết ra trước khi bắt đầu phát hành?",
        "options": [
          "Vì nhìn biểu đồ giữa chừng thì câu trả lời luôn nghiêng về việc tiếp tục",
          "Vì đội cần thống nhất với các bên liên quan về tiêu chí trước khi triển khai",
          "Vì các công cụ theo dõi cần được cấu hình ngưỡng trước khi bắt đầu thu thập",
          "Vì ngưỡng đặt sau sẽ không có đủ phần dữ liệu lịch sử để có thể so sánh chính xác"
        ],
        "correct": 0,
        "explanation": "Đây là thiên lệch chi phí chìm áp vào một quyết định kỹ thuật: đã đi được nửa đường thì dừng lại cảm thấy lãng phí. Ngưỡng viết trước là cách duy nhất để quyết định đó không phụ thuộc vào việc bạn đã đầu tư bao nhiêu."
      },
      {
        "question": "Vì sao mức đầu tiên nên nhỏ tới mức khó chịu, ví dụ 1%?",
        "options": [
          "Vì đó là mức mà một lỗi nghiêm trọng vẫn chỉ chạm tới rất ít người dùng",
          "Vì mức nhỏ giúp hệ thống theo dõi thu thập được dữ liệu sạch hơn để so sánh",
          "Vì hạ tầng chưa được chuẩn bị để phục vụ phiên bản mới cho toàn bộ lưu lượng",
          "Vì cần khoảng thời gian để bộ nhớ đệm của chính phiên bản mới được làm nóng dần lên"
        ],
        "correct": 0,
        "explanation": "Đánh đổi thật nằm ở chỗ 1% có thể không đủ lưu lượng để một chỉ số đạt ý nghĩa thống kê, nên bạn phải giữ lâu hơn. Đó là cái giá đáng trả, và nó là lý do mức đầu tiên nên tính bằng giờ chứ không bằng phút."
      },
      {
        "question": "Chọn ai vào nhóm đầu tiên là quyết định thế nào?",
        "options": [
          "Ngẫu nhiên hoặc theo nội bộ trước, không theo nhóm dùng ít nhất để cho an toàn",
          "Theo nhóm người dùng ít hoạt động nhất để hạn chế ảnh hưởng khi có sự cố",
          "Theo nhóm người dùng am hiểu nhất vì họ báo lỗi chi tiết và nhanh hơn",
          "Theo vùng địa lý gần trung tâm dữ liệu nhất để độ trễ không làm nhiễu được số liệu"
        ],
        "correct": 0,
        "explanation": "Chọn nhóm dùng ít nhất là cái bẫy hay gặp: nó an toàn hơn thật, nhưng nó cũng làm cho việc không thấy vấn đề gì ở mức đó gần như không nói lên điều gì. Nhóm đầu phải đại diện cho lưu lượng thật thì tín hiệu mới có nghĩa."
      },
      {
        "question": "Vì sao phát hành dần cần một cơ chế quay lui tách rời?",
        "options": [
          "Vì lúc phát hiện vấn đề thì việc cần làm là dừng ngay, không phải triển khai lại",
          "Vì phiên bản cũ có thể đã bị xoá khỏi hệ thống lưu trữ bản dựng sau khi phát hành",
          "Vì quay lui bằng cách triển khai lại sẽ làm mất dữ liệu của những người dùng mới",
          "Vì cần giữ lại phiên bản mới cho một nhóm nhỏ để có thể tiếp tục điều tra nguyên nhân"
        ],
        "correct": 0,
        "explanation": "Triển khai lại phiên bản cũ mất vài phút tới vài chục phút, và trong lúc đó lỗi vẫn đang chạm tới người dùng. Chuyển lưu lượng về không mất vài giây, nên nó là thứ phải có sẵn trước khi bắt đầu."
      },
      {
        "question": "Điều gì làm cho phát hành dần trở nên vô nghĩa?",
        "options": [
          "Không tách được chỉ số của phiên bản mới khỏi chỉ số của phiên bản cũ",
          "Số lượng mức phát hành quá nhiều nên toàn bộ quá trình kéo dài nhiều ngày",
          "Đội không có đủ người trực để theo dõi liên tục trong suốt quá trình phát hành",
          "Các thay đổi trong bản phát hành quá nhỏ nên không đo được khác biệt nào"
        ],
        "correct": 0,
        "explanation": "Nếu tỷ lệ lỗi báo về là tỷ lệ chung của cả hai phiên bản thì ở mức 1%, một phiên bản mới hỏng hoàn toàn cũng chỉ làm con số chung nhích lên chút ít. Bạn phát hành dần mà không đọc được gì."
      }
    ],
    "keyTakeaways": [
      "Phát hành dần không làm thay đổi an toàn hơn - nó làm thiệt hại khi sai nhỏ đi.",
      "Ngưỡng dừng phải viết ra TRƯỚC; không có nó thì đó chỉ là phát hành chậm.",
      "Nhóm đầu tiên phải đại diện cho lưu lượng thật, không phải nhóm dùng ít nhất.",
      "Quay lui bằng chuyển lưu lượng, không bằng triển khai lại phiên bản cũ.",
      "Phải tách được chỉ số của hai phiên bản, nếu không thì không đọc được gì."
    ],
    "practicePrompt": {
      "question": "Ở mức 10%, tỷ lệ lỗi của phiên bản mới cao hơn 0,3 điểm phần trăm. Nên làm gì?",
      "options": [
        "Xem ngưỡng đã đặt trước nói gì, và làm đúng theo đó chứ không bàn lại",
        "Điều tra nguyên nhân trước rồi mới quyết định có tiếp tục phát hành hay không",
        "Giữ nguyên ở mức 10% thêm vài giờ để xem con số có tự trở lại bình thường không",
        "Tiếp tục lên 50% vì 0,3 điểm phần trăm là chênh lệch nhỏ trong phạm vi dao động"
      ],
      "correct": 0,
      "explanation": "Ba lựa chọn kia đều là những cách bàn lại quyết định vào đúng lúc bạn có ít khả năng bàn tỉnh táo nhất. Nếu ngưỡng đặt trước là sai thì sửa nó SAU bản phát hành này, không phải giữa chừng."
    },
    "summary": {
      "keyIdea": "Bản phát hành là một giả thuyết; phát hành dần kiểm nó với ít người nhất.",
      "formula": "1% → 10% → 50% → tất cả, mỗi mức một ngưỡng dừng viết trước.",
      "commonMistake": "Không có ngưỡng đặt trước, nên mỗi mức đều thành một cuộc thương lượng.",
      "action": "Viết ra ngưỡng dừng cho bản phát hành tiếp theo, trước khi bắt đầu."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Với bản phát hành sắp tới, viết ra ba con số trước khi bắt đầu: chỉ số nào theo dõi, ngưỡng nào thì dừng, và giữ mỗi mức bao lâu.",
      "secondary": "Rồi kiểm một thứ dễ bị bỏ qua: bảng theo dõi của bạn có tách được chỉ số của phiên bản mới khỏi phiên bản cũ không. Nếu không, ba con số kia không đọc được."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Phần lớn sự cố sản xuất bắt nguồn từ một thay đổi vừa được đưa lên. Phát hành dần không làm thay đổi an toàn hơn - nó làm cho thiệt hại khi thay đổi sai nhỏ đi."
      },
      {
        "type": "heading",
        "text": "Vì sao kiểm thử kỹ vẫn không đủ"
      },
      {
        "type": "callout",
        "label": "Môi trường kiểm thử không có dữ liệu thật",
        "text": "Không đủ hình dạng dữ liệu thật, không đủ mức đồng thời thật, không có những cấu hình lạ mà người dùng thật mang tới. Phát hành dần chấp nhận điều đó và đổi chiến lược: thay vì cố tìm hết lỗi trước, nó giới hạn số người gặp lỗi còn sót."
      },
      {
        "type": "heading",
        "text": "Bốn quyết định của một lần phát hành dần"
      },
      {
        "type": "list",
        "items": [
          "Các mức: 1% → 10% → 50% → tất cả. Mức đầu nhỏ tới mức khó chịu, và tính bằng giờ chứ không bằng phút.",
          "Chọn ai: ngẫu nhiên hoặc nội bộ trước. KHÔNG chọn nhóm dùng ít nhất - nó an toàn hơn nhưng làm tín hiệu mất nghĩa.",
          "Ngưỡng dừng cho từng mức, viết ra TRƯỚC.",
          "Cơ chế quay lui bằng chuyển lưu lượng, có sẵn trước khi bắt đầu."
        ]
      },
      {
        "type": "heading",
        "text": "Ngưỡng viết trước, và vì sao"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Có ngưỡng",
          "text": "Ở mỗi mức, quyết định là một phép so sánh. Nó không phụ thuộc vào việc bạn đã đầu tư bao nhiêu vào lần phát hành này."
        },
        "right": {
          "label": "Không có ngưỡng",
          "text": "Ở mỗi mức, người ta nhìn biểu đồ và tự hỏi thế này có tệ không. Câu trả lời luôn nghiêng về tiếp tục, vì đã đi được nửa đường rồi."
        }
      },
      {
        "type": "paragraph",
        "text": "Quay lui cũng phải là một cơ chế TÁCH RỜI. Triển khai lại phiên bản cũ mất vài phút tới vài chục phút, và trong lúc đó lỗi vẫn đang chạm tới người dùng. Chuyển lưu lượng về mất vài giây."
      },
      {
        "type": "closing",
        "lines": [
          "Và điều kiện làm cho tất cả những thứ trên có nghĩa: bảng theo dõi phải TÁCH được chỉ số của hai phiên bản. Nếu tỷ lệ lỗi báo về là tỷ lệ chung, thì ở mức 1% một phiên bản hỏng hoàn toàn cũng chỉ làm con số nhích lên chút ít.",
          "Bài sau là công cụ làm cho việc này thực hiện được mà không phải triển khai lại mỗi lần."
        ]
      }
    ]
  },
  {
    "id": 1522,
    "slug": "co-tinh-nang-tach-trien-khai-khoi-phat-hanh",
    "title": "Phát hành, Bài 2: Cờ tính năng - tách triển khai khỏi phát hành",
    "subtitle": "Đưa mã lên và bật tính năng là hai việc; gộp chúng là nguồn của phần lớn rủi ro.",
    "duration": "11 phút",
    "difficulty": "Trung bình",
    "track": "professional",
    "emoji": "🧾",
    "whyItMatters": "Cờ tính năng là công cụ mạnh và cũng là loại nợ kỹ thuật sinh sôi nhanh nhất - mỗi cờ là một nhánh trong mã, và hai cờ là bốn tổ hợp.",
    "openingQuestion": "Triển khai và phát hành khác nhau ở điểm nào?",
    "openingOptions": [
      "Triển khai là đưa mã lên máy chủ; phát hành là cho người dùng thấy tính năng",
      "Triển khai áp dụng cho môi trường thử nghiệm còn phát hành là cho môi trường thật",
      "Triển khai do đội kỹ thuật thực hiện còn phát hành do bộ phận sản phẩm quyết định",
      "Triển khai đưa mã lên toàn bộ máy chủ còn phát hành chỉ đưa lên một phần trong đó"
    ],
    "correctOption": 0,
    "explanation": "Gộp hai việc này là nguồn của phần lớn rủi ro phát hành: mã mới chỉ lên được khi tính năng sẵn sàng, nên các thay đổi dồn lại thành lô lớn, và lô càng lớn thì càng khó biết cái gì gây ra sự cố. Tách ra thì mã lên liên tục trong trạng thái tắt, và việc bật là một quyết định riêng, đảo ngược được trong vài giây.",
    "diagram": [
      {
        "label": "Triển khai: đưa mã lên, tính năng đang TẮT",
        "arrow": true
      },
      {
        "label": "Phát hành: bật cờ - một quyết định riêng, đảo ngược trong giây",
        "arrow": true
      },
      {
        "label": "Lô nhỏ, liên tục → dễ truy nguyên nhân khi có sự cố",
        "arrow": true
      },
      {
        "label": "Cái giá: mỗi cờ là một nhánh, hai cờ là bốn tổ hợp"
      }
    ],
    "realWorldExample": {
      "company": "Cờ không có ngày hết hạn",
      "description": "Cờ tính năng sinh sôi nhanh hơn mọi loại nợ kỹ thuật khác vì gỡ nó không mang lại lợi ích thấy được. Một kho mã sau hai năm có thể có tám mươi cờ, trong đó bảy mươi đã bật cho tất cả từ lâu - và mỗi cái vẫn là một nhánh mà kiểm thử phải đi qua."
    },
    "quiz": [
      {
        "question": "Lợi ích lớn nhất của việc tách triển khai khỏi phát hành là gì?",
        "options": [
          "Mã lên liên tục theo lô nhỏ, nên khi có sự cố thì dễ truy ra nguyên nhân",
          "Đội có thể triển khai vào bất cứ lúc nào mà không cần xin phê duyệt trước",
          "Phiên bản mới được kiểm thử trực tiếp trên môi trường thật trước khi bật lên",
          "Việc quay lui trở nên đơn giản hơn vì chỉ cần triển khai lại phiên bản cũ"
        ],
        "correct": 0,
        "explanation": "Đây là lợi ích gián tiếp nhưng lớn nhất: khi mã chỉ lên được lúc tính năng sẵn sàng thì các thay đổi dồn thành lô lớn, và lô càng lớn thì càng khó biết cái gì trong đó gây ra sự cố."
      },
      {
        "question": "Vì sao mỗi cờ tính năng cần một ngày hết hạn?",
        "options": [
          "Vì gỡ cờ không mang lại lợi ích thấy được nên nó không bao giờ được ưu tiên",
          "Vì cờ để lâu quá chắc chắn sẽ làm chậm hệ thống do phải kiểm tra trạng thái ở mỗi yêu cầu",
          "Vì các công cụ quản lý cờ tính năng thường giới hạn số lượng cờ hoạt động",
          "Vì trạng thái của cờ cũ có thể xung đột với những cờ mới được thêm vào sau"
        ],
        "correct": 0,
        "explanation": "Đây là lý do cờ sinh sôi nhanh hơn mọi loại nợ kỹ thuật khác. Chi phí thật của một cờ để lâu không phải hiệu năng mà là tổ hợp: hai cờ là bốn nhánh mà kiểm thử phải đi qua, ba cờ là tám."
      },
      {
        "question": "Cờ tính năng khác cờ cấu hình ở chỗ nào?",
        "options": [
          "Cờ tính năng có vòng đời ngắn và phải bị gỡ; cờ cấu hình sống cùng hệ thống",
          "Cờ tính năng do đội sản phẩm quản lý còn cờ cấu hình do đội vận hành quản lý",
          "Cờ tính năng chỉ nhận hai giá trị còn cờ cấu hình có thể nhận nhiều giá trị",
          "Cờ tính năng thay đổi thường xuyên còn cờ cấu hình gần như không đổi"
        ],
        "correct": 0,
        "explanation": "Phân biệt này quan trọng vì nó quyết định cờ nào cần ngày hết hạn. Gộp chúng lại thì hoặc bạn dọn nhầm một cờ vận hành cần thiết, hoặc bạn để một cờ tính năng nằm mãi vì tưởng nó là cấu hình."
      },
      {
        "question": "Rủi ro ít được nói tới của cờ tính năng là gì?",
        "options": [
          "Các tổ hợp trạng thái cờ hầu như không bao giờ được kiểm thử đầy đủ",
          "Việc đọc trạng thái cờ có thể thất bại và làm cả yêu cầu người dùng hỏng theo",
          "Người dùng có thể nhận được trải nghiệm khác nhau giữa các lần truy cập",
          "Mã trong nhánh chưa bật không được rà soát kỹ như mã đang chạy thật"
        ],
        "correct": 0,
        "explanation": "Ba rủi ro kia đều thật và đều xử lý được bằng giá trị mặc định, phiên bản gắn theo người dùng, và quy trình rà soát. Rủi ro tổ hợp thì không xử lý được bằng kỹ thuật - nó chỉ giảm khi số cờ giảm."
      },
      {
        "question": "Cờ tính năng nên có giá trị mặc định thế nào khi không đọc được cấu hình?",
        "options": [
          "Trở về trạng thái cũ đã biết là chạy được, thay vì trạng thái mới",
          "Trở về trạng thái bật để người dùng vẫn thấy được tính năng mới nhất",
          "Báo lỗi ngay để đội phát hiện được sớm vấn đề với cả hệ thống quản lý cờ",
          "Giữ nguyên giá trị đọc được lần gần nhất dù nó đã cũ bao lâu đi nữa"
        ],
        "correct": 0,
        "explanation": "Lựa chọn cuối nghe hợp lý và nó nguy hiểm theo cách khó thấy: khi hệ thống cờ hỏng, mỗi máy chủ sẽ giữ một giá trị cũ khác nhau, nên hành vi của hệ thống trở nên không xác định thay vì sai một cách nhất quán."
      }
    ],
    "keyTakeaways": [
      "Triển khai là đưa mã lên; phát hành là bật tính năng. Hai việc, hai quyết định.",
      "Lợi ích lớn nhất: mã lên theo LÔ NHỎ, nên dễ truy nguyên nhân khi có sự cố.",
      "Mỗi cờ tính năng cần một ngày hết hạn - gỡ cờ không bao giờ tự được ưu tiên.",
      "Chi phí thật là TỔ HỢP: hai cờ là bốn nhánh, ba cờ là tám.",
      "Không đọc được cấu hình thì trở về trạng thái cũ đã biết là chạy được."
    ],
    "practicePrompt": {
      "question": "Kho mã của bạn có tám mươi cờ, bảy mươi đã bật cho tất cả từ lâu. Bắt đầu từ đâu?",
      "options": [
        "Gỡ những cờ đã bật toàn bộ lâu nhất, vì chúng là nhánh chết mà kiểm thử vẫn đi qua",
        "Đặt ngày hết hạn cho toàn bộ tám mươi cờ và xử lý theo thứ tự ngày tới hạn",
        "Gỡ những cờ nằm trong phần mã được thay đổi nhiều nhất trong sáu tháng qua",
        "Viết tài liệu mô tả mục đích của từng cờ trước khi quyết định gỡ cái nào"
      ],
      "correct": 0,
      "explanation": "Lựa chọn thứ hai là việc đúng cho cờ MỚI nhưng nó không dọn được bảy mươi cái đã có. Bảy mươi cờ bật toàn bộ là bảy mươi nhánh chết, và gỡ chúng vừa an toàn nhất vừa giảm tổ hợp nhiều nhất."
    },
    "summary": {
      "keyIdea": "Đưa mã lên và bật tính năng là hai việc; gộp chúng là nguồn của rủi ro.",
      "formula": "Triển khai liên tục lô nhỏ (tắt) → bật cờ là quyết định riêng, đảo ngược trong giây.",
      "commonMistake": "Cờ không có ngày hết hạn, nên chúng sinh sôi và tổ hợp bùng nổ.",
      "action": "Đếm số cờ trong kho mã và xem bao nhiêu cái đã bật toàn bộ."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Đếm số cờ tính năng trong kho mã của bạn và xem bao nhiêu cái đã bật cho tất cả người dùng từ hơn ba tháng trước. Mỗi cái là một nhánh chết.",
      "secondary": "Rồi thêm một trường vào quy trình tạo cờ mới: ngày hết hạn. Nó không tự dọn được cái cũ nhưng nó chặn được việc danh sách tiếp tục dài ra."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bài trước cần một cơ chế bật tắt nhanh hơn triển khai lại. Bài này là cơ chế đó, và nó mang theo một loại nợ kỹ thuật sinh sôi nhanh hơn mọi loại khác."
      },
      {
        "type": "heading",
        "text": "Hai việc bị gộp làm một"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Gộp",
          "text": "Mã mới chỉ lên được khi tính năng sẵn sàng. Các thay đổi dồn lại thành lô lớn, và lô càng lớn thì càng khó biết cái gì trong đó gây ra sự cố."
        },
        "right": {
          "label": "Tách",
          "text": "Mã lên liên tục trong trạng thái TẮT. Việc bật là một quyết định riêng, đảo ngược được trong vài giây thay vì vài chục phút."
        }
      },
      {
        "type": "heading",
        "text": "Hai loại cờ, đừng gộp"
      },
      {
        "type": "callout",
        "label": "Vòng đời khác nhau",
        "text": "Cờ TÍNH NĂNG có vòng đời ngắn và phải bị gỡ. Cờ CẤU HÌNH - ngắt mạch, giới hạn tần suất, chế độ bảo trì - sống cùng hệ thống. Gộp chúng thì hoặc bạn dọn nhầm một cờ vận hành cần thiết, hoặc bạn để một cờ tính năng nằm mãi vì tưởng nó là cấu hình."
      },
      {
        "type": "heading",
        "text": "Cái giá thật"
      },
      {
        "type": "paragraph",
        "text": "Không phải hiệu năng - đọc một cờ là chuyện rẻ. Cái giá là TỔ HỢP: hai cờ là bốn nhánh mà kiểm thử phải đi qua, ba cờ là tám. Trên thực tế các tổ hợp ấy hầu như không bao giờ được kiểm thử đầy đủ."
      },
      {
        "type": "paragraph",
        "text": "Rủi ro này không xử lý được bằng kỹ thuật. Nó chỉ giảm khi số cờ giảm, và số cờ chỉ giảm khi mỗi cờ có một ngày hết hạn từ lúc sinh ra - vì gỡ cờ không mang lại lợi ích thấy được nên nó không bao giờ tự được ưu tiên."
      },
      {
        "type": "closing",
        "lines": [
          "Một chi tiết nhỏ mà quan trọng: khi không đọc được cấu hình, cờ phải trở về trạng thái CŨ đã biết là chạy được. Giữ nguyên giá trị đọc được lần gần nhất nghe hợp lý và nó nguy hiểm - mỗi máy chủ sẽ giữ một giá trị cũ khác nhau.",
          "Bài sau là cách chia lưu lượng giữa hai phiên bản, và cách đọc kết quả từ đó."
        ]
      }
    ]
  },
  {
    "id": 1523,
    "slug": "phan-bo-luu-luong-va-thu-nghiem-khi-phat-hanh",
    "title": "Phát hành, Bài 3: Phân bổ lưu lượng và đọc kết quả",
    "subtitle": "Chia lưu lượng thì dễ; điều khó là biết con số chênh lệch có nghĩa gì.",
    "duration": "12 phút",
    "difficulty": "Khó",
    "track": "professional",
    "emoji": "🏷️",
    "whyItMatters": "Phần lớn quyết định phát hành dựa trên một so sánh giữa hai nhóm, và phần lớn so sánh đó được đọc sai theo những cách có tên gọi.",
    "openingQuestion": "Phiên bản mới có tỷ lệ chuyển đổi cao hơn 2%. Kết luận được chưa?",
    "openingOptions": [
      "Chưa - phải biết khoảng dao động của chỉ số đó khi không có thay đổi nào",
      "Rồi, chỉ vì 2% chính là mức chênh lệch đủ lớn để chắc chắn không phải do ngẫu nhiên gây ra",
      "Chưa, phải chờ đủ một chu kỳ bảy ngày để loại bỏ ảnh hưởng của ngày trong tuần",
      "Rồi, nếu số lượng người dùng trong cả hai nhóm đều đã vượt quá một nghìn"
    ],
    "correctOption": 0,
    "explanation": "Cách kiểm rẻ nhất và ít được làm nhất là chia lưu lượng thành hai nhóm với CÙNG một phiên bản, rồi xem chúng chênh nhau bao nhiêu. Con số đó là mức nhiễu nền, và mọi chênh lệch nhỏ hơn nó đều vô nghĩa. Chu kỳ bảy ngày và cỡ mẫu đều là điều kiện cần thật, nhưng chúng không thay được việc biết nhiễu nền.",
    "diagram": [
      {
        "label": "Chia hai nhóm CÙNG phiên bản → đo nhiễu nền",
        "arrow": true
      },
      {
        "label": "Mọi chênh lệch nhỏ hơn nhiễu nền đều vô nghĩa",
        "arrow": true
      },
      {
        "label": "Gắn nhóm theo người dùng, không theo từng yêu cầu",
        "arrow": true
      },
      {
        "label": "Chọn MỘT chỉ số quyết định trước khi bắt đầu"
      }
    ],
    "realWorldExample": {
      "company": "Nhìn đủ lâu thì có ý nghĩa",
      "description": "Theo dõi mười lăm chỉ số và dừng khi thấy cái nào đó khác biệt là cách chắc chắn tìm ra khác biệt ở đâu đó. Với mười lăm chỉ số độc lập ở mức ý nghĩa thông thường, xác suất ít nhất một cái có vẻ khác biệt do ngẫu nhiên đã vượt một nửa."
    },
    "quiz": [
      {
        "question": "Cách rẻ nhất để biết mức nhiễu nền của một chỉ số là gì?",
        "options": [
          "Chia lưu lượng thành hai nhóm cùng chạy một phiên bản rồi xem chúng chênh bao nhiêu",
          "Tính độ lệch chuẩn của chỉ số đó qua dữ liệu lịch sử của ba mươi ngày gần nhất",
          "Chạy phiên bản mới trên một nhóm nhỏ trong thời gian dài hơn mức thông thường",
          "So sánh chỉ số của cùng khoảng thời gian này với tuần trước và tháng trước"
        ],
        "correct": 0,
        "explanation": "Lựa chọn thứ hai đo được dao động theo thời gian nhưng không đo được dao động do chia nhóm, vốn là thứ bạn cần. Phép kiểm hai nhóm cùng phiên bản đo đúng cái gây nhầm lẫn, và nó gần như không tốn gì."
      },
      {
        "question": "Vì sao phải gắn nhóm theo người dùng chứ không theo từng yêu cầu?",
        "options": [
          "Vì cùng một người thấy hai phiên bản xen kẽ sẽ tạo trải nghiệm mâu thuẫn",
          "Vì gắn theo yêu cầu sẽ làm cho hai nhóm có kích thước không bằng nhau",
          "Vì hệ thống theo dõi không ghép được tất cả các yêu cầu rời rạc thành một phiên",
          "Vì gắn theo yêu cầu đòi hỏi thêm một lượt tra cứu ở mỗi lần xử lý"
        ],
        "correct": 0,
        "explanation": "Ngoài trải nghiệm mâu thuẫn còn một hậu quả về đo lường: một chỉ số theo phiên - ví dụ tỷ lệ hoàn tất một luồng nhiều bước - trở nên không tính được, vì phiên đó đi qua cả hai phiên bản."
      },
      {
        "question": "Vì sao theo dõi mười lăm chỉ số cùng lúc là cách đọc sai?",
        "options": [
          "Vì xác suất ít nhất một chỉ số có vẻ khác biệt do ngẫu nhiên vượt quá một nửa",
          "Vì đội không đủ thời gian để phân tích kỹ từng chỉ số trong khoảng thời gian ngắn",
          "Vì các chỉ số thường tương quan với nhau nên chúng lặp lại cùng một thông tin",
          "Vì mỗi chỉ số cần đúng một cỡ mẫu khác nhau nên rốt cuộc hoàn toàn không cùng đạt ý nghĩa một lúc"
        ],
        "correct": 0,
        "explanation": "Đây là bài toán so sánh bội. Cách chữa không phải là bỏ theo dõi các chỉ số kia mà là chọn TRƯỚC một chỉ số quyết định; những cái còn lại là để phát hiện tác dụng phụ, không phải để tuyên bố thắng lợi."
      },
      {
        "question": "Vì sao dừng thử nghiệm ngay khi thấy kết quả có ý nghĩa là sai?",
        "options": [
          "Vì nhìn liên tục và dừng lúc thuận lợi làm tỷ lệ báo động giả tăng lên nhiều lần",
          "Vì kết quả cần được xác nhận lại bởi một thử nghiệm độc lập thứ hai",
          "Vì tác dụng của thay đổi thường giảm dần sau vài ngày người dùng làm quen",
          "Vì cần chờ đủ thời gian để những người dùng ít hoạt động cũng được tính vào"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là lý do thật để chạy lâu hơn, nhưng chúng khác về bản chất. Cái này là lỗi phương pháp: chính hành vi nhìn nhiều lần rồi dừng lúc thuận lợi đã phá vỡ mức ý nghĩa mà bạn tưởng mình đang dùng."
      },
      {
        "question": "Chỉ số nào nên chọn làm chỉ số quyết định?",
        "options": [
          "Chỉ số gần nhất với thứ bạn thật sự muốn cải thiện, dù nó chậm và ồn hơn",
          "Chỉ số nhạy nhất với thay đổi để phát hiện được khác biệt trong thời gian ngắn",
          "Chỉ số ổn định nhất qua thời gian để giảm thiểu ảnh hưởng của nhiễu nền",
          "Chỉ số mà các bên liên quan quan tâm nhất trong báo cáo hằng tháng"
        ],
        "correct": 0,
        "explanation": "Chọn chỉ số nhạy nhất là cái bẫy phổ biến: số lượt nhấp nhạy hơn tỷ lệ giữ chân rất nhiều, nên nó cho kết quả nhanh - về một thứ bạn không thật sự quan tâm. Đo cái dễ đo thay cho cái quan trọng là hỏng theo cách khó thấy."
      }
    ],
    "keyTakeaways": [
      "Đo NHIỄU NỀN trước: chia hai nhóm cùng một phiên bản và xem chúng chênh bao nhiêu.",
      "Gắn nhóm theo NGƯỜI DÙNG, không theo yêu cầu - nếu không chỉ số theo phiên vô nghĩa.",
      "Chọn TRƯỚC một chỉ số quyết định; các chỉ số khác là để bắt tác dụng phụ.",
      "Nhìn liên tục rồi dừng lúc thuận lợi phá vỡ chính mức ý nghĩa bạn đang dùng.",
      "Chỉ số quyết định là cái gần nhất với thứ bạn muốn, không phải cái nhạy nhất."
    ],
    "practicePrompt": {
      "question": "Kết quả không có ý nghĩa thống kê sau hai tuần. Kết luận đúng là gì?",
      "options": [
        "Chưa đủ bằng chứng để nói có khác biệt - không phải đã chứng minh không có khác biệt",
        "Thay đổi này không có tác dụng nên nên bỏ và chuyển sang thử nghiệm khác",
        "Cần chạy thêm để đạt cỡ mẫu đủ lớn cho tới khi kết quả trở nên có ý nghĩa",
        "Chỉ số được chọn không phù hợp nên cần đổi sang một chỉ số nhạy hơn để đo"
      ],
      "correct": 0,
      "explanation": "Phân biệt này quan trọng vì hai kết luận dẫn tới hai hành động khác nhau. Và chạy thêm cho tới khi có ý nghĩa là đúng cái lỗi dừng lúc thuận lợi, chỉ khác chiều - thời gian dừng phải quyết định trước."
    },
    "summary": {
      "keyIdea": "Chia lưu lượng thì dễ; điều khó là biết con số chênh lệch có nghĩa gì.",
      "formula": "Đo nhiễu nền → gắn theo người dùng → một chỉ số quyết định → thời gian định trước.",
      "commonMistake": "Theo dõi mười lăm chỉ số và dừng khi một cái nào đó trông khác biệt.",
      "action": "Chạy một phép kiểm hai nhóm cùng phiên bản để biết nhiễu nền của bạn."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Chạy một phép kiểm rẻ: chia lưu lượng thành hai nhóm với CÙNG phiên bản đang chạy, để một ngày, rồi xem các chỉ số chính chênh nhau bao nhiêu.",
      "secondary": "Con số đó là mức nhiễu nền của bạn. Mọi chênh lệch nhỏ hơn nó mà bạn từng dùng để ra quyết định đều là đọc nhiễu."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chia lưu lượng giữa hai phiên bản là chuyện kỹ thuật đơn giản. Điều khó là biết con số chênh lệch có nghĩa gì, và phần lớn cách đọc sai đều có tên gọi."
      },
      {
        "type": "heading",
        "text": "Việc phải làm trước tiên"
      },
      {
        "type": "callout",
        "label": "Đo nhiễu nền",
        "text": "Chia lưu lượng thành hai nhóm với CÙNG một phiên bản, rồi xem chúng chênh nhau bao nhiêu. Con số đó là mức nhiễu nền, và mọi chênh lệch nhỏ hơn nó đều vô nghĩa. Phép kiểm này gần như không tốn gì và gần như không ai làm."
      },
      {
        "type": "heading",
        "text": "Gắn nhóm theo người dùng"
      },
      {
        "type": "paragraph",
        "text": "Gắn theo từng yêu cầu thì cùng một người thấy hai phiên bản xen kẽ - vừa là trải nghiệm mâu thuẫn, vừa làm cho mọi chỉ số theo phiên trở nên không tính được, vì phiên đó đi qua cả hai phiên bản."
      },
      {
        "type": "heading",
        "text": "Hai cách đọc sai có tên"
      },
      {
        "type": "list",
        "items": [
          "So sánh bội: theo dõi mười lăm chỉ số và dừng khi thấy cái nào đó khác biệt. Với mười lăm chỉ số độc lập, xác suất ít nhất một cái trông khác biệt do ngẫu nhiên đã vượt một nửa.",
          "Dừng lúc thuận lợi: nhìn liên tục và dừng ngay khi kết quả có ý nghĩa. Chính hành vi đó phá vỡ mức ý nghĩa mà bạn tưởng mình đang dùng."
        ]
      },
      {
        "type": "paragraph",
        "text": "Cách chữa cho cả hai giống nhau: quyết định TRƯỚC. Một chỉ số quyết định, và một thời gian chạy. Các chỉ số còn lại vẫn theo dõi, nhưng để bắt tác dụng phụ chứ không để tuyên bố thắng lợi."
      },
      {
        "type": "heading",
        "text": "Chọn chỉ số quyết định"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Đúng",
          "text": "Cái gần nhất với thứ bạn thật sự muốn cải thiện, dù nó chậm hơn và ồn hơn."
        },
        "right": {
          "label": "Bẫy",
          "text": "Cái nhạy nhất. Số lượt nhấp nhạy hơn tỷ lệ giữ chân rất nhiều, nên nó cho kết quả nhanh - về một thứ bạn không thật sự quan tâm."
        }
      },
      {
        "type": "closing",
        "lines": [
          "Và một phân biệt hay bị bỏ qua khi kết thúc: không có ý nghĩa thống kê nghĩa là CHƯA ĐỦ BẰNG CHỨNG để nói có khác biệt. Nó không phải bằng chứng rằng không có khác biệt.",
          "Ba bài sau chuyển sang phần khó hơn của cùng chủ đề: gỡ bỏ cái cũ."
        ]
      }
    ]
  },
  {
    "id": 1524,
    "slug": "go-bo-he-thong-cu",
    "title": "Phát hành, Bài 4: Gỡ bỏ hệ thống cũ - vì sao khó hơn dựng mới",
    "subtitle": "Dựng cái mới có người ủng hộ; gỡ cái cũ chỉ có rủi ro và không có ai ăn mừng.",
    "duration": "11 phút",
    "difficulty": "Khó",
    "track": "professional",
    "emoji": "✂️",
    "whyItMatters": "Hệ thống cũ không tự chết. Nó nằm đó tiêu tài nguyên, giữ lỗ hổng bảo mật, và bắt mọi thay đổi phải làm hai lần - cho tới khi có người quyết định gỡ nó, và việc đó gần như không bao giờ được ưu tiên.",
    "openingQuestion": "Vì sao gỡ một hệ thống cũ thường khó hơn dựng cái thay thế nó?",
    "openingOptions": [
      "Vì không ai biết hết ai đang dùng nó, và người dùng cuối cùng luôn xuất hiện muộn",
      "Vì mã của hệ thống cũ thường không có tài liệu nên khó hiểu được nó làm gì",
      "Vì hệ thống cũ dùng công nghệ đã lỗi thời nên khó tìm người có kỹ năng phù hợp",
      "Vì việc gỡ bỏ đòi hỏi phê duyệt từ nhiều bộ phận khác nhau trong tổ chức"
    ],
    "correctOption": 0,
    "explanation": "Danh sách người dùng của một hệ thống mười năm tuổi không tồn tại ở dạng viết ra. Có một công việc chạy theo lịch tháng, một báo cáo quý, một tích hợp của đối tác mà người phụ trách đã nghỉ - và mỗi cái trong số đó chỉ lộ diện khi hệ thống ngừng chạy. Ba lựa chọn kia đều là khó khăn thật nhưng chúng đều giải được bằng cách bỏ công đọc.",
    "diagram": [
      {
        "label": "Ghi nhật ký MỌI lượt truy cập, kèm ai gọi và từ đâu",
        "arrow": true
      },
      {
        "label": "Chờ ít nhất một chu kỳ dài nhất - thường là một quý",
        "arrow": true
      },
      {
        "label": "Tắt tạm có kế hoạch: dừng vài giờ, xem ai kêu",
        "arrow": true
      },
      {
        "label": "Rồi mới gỡ. Và gỡ cả dữ liệu, không chỉ mã"
      }
    ],
    "realWorldExample": {
      "company": "Tắt tạm có kế hoạch",
      "description": "Cách hiệu quả nhất để tìm người dùng còn sót là dừng hệ thống vài giờ trong giờ làm việc, có thông báo trước, và xem ai kêu. Nó tìm ra những người mà nhật ký không thấy - vì họ dùng qua một lớp trung gian, hoặc vì lần dùng gần nhất nằm ngoài cửa sổ quan sát."
    },
    "quiz": [
      {
        "question": "Vì sao phải ghi nhật ký ít nhất một chu kỳ dài nhất trước khi gỡ?",
        "options": [
          "Vì có những việc chỉ chạy theo quý hoặc theo năm nên cửa sổ ngắn không thấy chúng",
          "Vì cần đủ dữ liệu để phân tích được xu hướng sử dụng đang giảm dần",
          "Vì tất cả các quy định về lưu trữ yêu cầu giữ nhật ký truy cập trong một thời gian tối thiểu",
          "Vì lượng truy cập thay đổi theo mùa nên cần loại bỏ ảnh hưởng của yếu tố đó"
        ],
        "correct": 0,
        "explanation": "Một tháng nhật ký sạch nghe thuyết phục cho tới khi báo cáo quý chạy vào tuần sau khi bạn gỡ. Chu kỳ dài nhất chứ không phải chu kỳ trung bình là con số quyết định ở đây."
      },
      {
        "question": "Vì sao tắt tạm có kế hoạch tìm ra được cái mà nhật ký không thấy?",
        "options": [
          "Vì có người dùng qua một lớp trung gian nên nhật ký ghi tên lớp đó chứ không ghi họ",
          "Vì nhật ký chỉ ghi lại tất cả các lượt truy cập thành công chứ hoàn toàn không ghi lượt thất bại",
          "Vì một số hệ thống gọi vào mà không để lại dấu vết trong nhật ký truy cập",
          "Vì việc phân tích nhật ký thủ công dễ bỏ sót những nguồn gọi có lượng nhỏ"
        ],
        "correct": 0,
        "explanation": "Đây là điểm mù cấu trúc của nhật ký chứ không phải khuyết điểm của nó: bạn thấy lớp trung gian gọi vào nhưng không thấy ai đứng sau lớp đó. Tắt tạm thì người thật sự phụ thuộc sẽ tự lên tiếng."
      },
      {
        "question": "Vì sao gỡ hệ thống cũ hiếm khi được ưu tiên?",
        "options": [
          "Vì nó chỉ mang lại rủi ro trước mắt và lợi ích thì phân tán, không ai ăn mừng",
          "Vì các đội thường không có đủ thông tin để đánh giá được chi phí của việc gỡ bỏ",
          "Vì hệ thống cũ vẫn đang hoạt động ổn định nên rốt cuộc không có lý do cấp bách để có thể gỡ",
          "Vì trách nhiệm về cả hệ thống cũ thường hoàn toàn không thuộc về đúng một đội cụ thể nào cả"
        ],
        "correct": 0,
        "explanation": "Đây là bất đối xứng động cơ, không phải thiếu thông tin. Người gỡ nhận toàn bộ rủi ro nếu có gì hỏng, còn lợi ích - bớt tài nguyên, bớt bề mặt tấn công, bớt việc phải làm hai lần - thì chia đều cho mọi người và không thấy được."
      },
      {
        "question": "Vì sao phải gỡ cả dữ liệu chứ không chỉ mã?",
        "options": [
          "Vì dữ liệu để lại vẫn là bề mặt tấn công và vẫn nằm trong phạm vi các nghĩa vụ pháp lý",
          "Vì dữ liệu cũ chiếm dung lượng lưu trữ và làm tăng chi phí vận hành hằng tháng",
          "Vì dữ liệu không đồng bộ với hệ thống mới sẽ gây nhầm lẫn khi có người tra cứu",
          "Vì việc sao lưu dữ liệu cũ làm chậm quy trình sao lưu của toàn bộ hệ thống"
        ],
        "correct": 0,
        "explanation": "Một kho dữ liệu người dùng của hệ thống đã tắt vẫn bị rò rỉ được, và nó vẫn phải trả lời được yêu cầu xoá dữ liệu của người dùng. Ba lựa chọn kia đều là chi phí thật nhưng chúng nhỏ hơn nhiều."
      },
      {
        "question": "Bước nào nên làm ngay khi bắt đầu kế hoạch gỡ bỏ?",
        "options": [
          "Ghi nhật ký mọi lượt truy cập kèm thông tin ai gọi và gọi từ đâu",
          "Thông báo cho toàn bộ tổ chức về kế hoạch gỡ bỏ và thời hạn dự kiến",
          "Rà soát mã của chính cả hệ thống cũ để có thể hiểu đầy đủ những gì nó đang làm",
          "Xây dựng hệ thống thay thế đầy đủ tính năng trước khi bắt đầu quá trình gỡ"
        ],
        "correct": 0,
        "explanation": "Thông báo là việc cần nhưng nó chỉ chạm tới những người đọc thông báo, mà đó thường không phải nhóm bạn cần tìm. Nhật ký chạy im lặng và bắt được cả những nguồn gọi mà không ai còn nhớ."
      }
    ],
    "keyTakeaways": [
      "Không ai biết hết ai đang dùng - người dùng cuối cùng luôn xuất hiện muộn.",
      "Ghi nhật ký ít nhất một CHU KỲ DÀI NHẤT, thường là một quý, không phải một tháng.",
      "Tắt tạm có kế hoạch tìm ra người mà nhật ký không thấy vì họ qua lớp trung gian.",
      "Việc này hiếm khi được ưu tiên vì rủi ro dồn vào một người, lợi ích chia cho tất cả.",
      "Gỡ cả DỮ LIỆU - nó vẫn là bề mặt tấn công và vẫn kèm nghĩa vụ pháp lý."
    ],
    "practicePrompt": {
      "question": "Nhật ký ba tháng cho thấy không có lượt truy cập nào. Gỡ được chưa?",
      "options": [
        "Chưa - làm một lượt tắt tạm có thông báo trước, rồi mới gỡ hẳn sau đó",
        "Được, ba tháng không có truy cập nào là bằng chứng đủ mạnh để kết luận",
        "Chưa, cần chờ đủ mười hai tháng để loại trừ các công việc chạy theo năm",
        "Được, nhưng nên rốt cuộc giữ lại phần dữ liệu phòng mỗi khi cần khôi phục về sau này"
      ],
      "correct": 0,
      "explanation": "Lựa chọn thứ ba an toàn hơn nhưng nó thường không khả thi và nó vẫn không bắt được người dùng qua lớp trung gian. Lựa chọn cuối là cái bẫy phổ biến nhất: giữ lại dữ liệu nghĩa là việc gỡ chưa xong."
    },
    "summary": {
      "keyIdea": "Dựng cái mới có người ủng hộ; gỡ cái cũ chỉ có rủi ro và không ai ăn mừng.",
      "formula": "Nhật ký một chu kỳ dài nhất → tắt tạm có kế hoạch → gỡ mã → gỡ dữ liệu.",
      "commonMistake": "Tin vào một tháng nhật ký sạch, rồi báo cáo quý chạy vào tuần sau.",
      "action": "Chọn một hệ thống cũ và bật ghi nhật ký truy cập cho nó ngay hôm nay."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Chọn một hệ thống cũ mà bạn nghĩ không còn ai dùng, và bật ghi nhật ký mọi lượt truy cập kèm thông tin ai gọi. Đừng gỡ gì cả - chỉ ghi.",
      "secondary": "Ba tháng sau bạn sẽ có thứ mà hôm nay không có: một danh sách. Và gần như chắc chắn nó dài hơn bạn đoán."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Hệ thống cũ không tự chết. Nó nằm đó tiêu tài nguyên, giữ lỗ hổng bảo mật, và bắt mọi thay đổi phải làm hai lần - cho tới khi có người quyết định gỡ nó."
      },
      {
        "type": "heading",
        "text": "Vì sao khó"
      },
      {
        "type": "callout",
        "label": "Danh sách người dùng không tồn tại",
        "text": "Một hệ thống mười năm tuổi có một công việc chạy theo lịch tháng, một báo cáo quý, một tích hợp của đối tác mà người phụ trách đã nghỉ. Mỗi cái trong số đó chỉ lộ diện khi hệ thống ngừng chạy."
      },
      {
        "type": "heading",
        "text": "Bốn bước"
      },
      {
        "type": "list",
        "items": [
          "Ghi nhật ký MỌI lượt truy cập, kèm ai gọi và gọi từ đâu. Bước này làm ngay, trước cả khi có kế hoạch.",
          "Chờ ít nhất một CHU KỲ DÀI NHẤT - thường là một quý. Một tháng nhật ký sạch nghe thuyết phục cho tới khi báo cáo quý chạy vào tuần sau khi bạn gỡ.",
          "Tắt tạm có kế hoạch: dừng vài giờ trong giờ làm việc, có thông báo trước, xem ai kêu.",
          "Gỡ mã, rồi gỡ DỮ LIỆU."
        ]
      },
      {
        "type": "paragraph",
        "text": "Bước ba tìm ra thứ mà nhật ký không thấy. Nhật ký có một điểm mù cấu trúc: khi người dùng đi qua một lớp trung gian, bạn thấy lớp đó gọi vào nhưng không thấy ai đứng sau nó."
      },
      {
        "type": "heading",
        "text": "Vì sao việc này không bao giờ được ưu tiên"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Người gỡ nhận",
          "text": "Toàn bộ rủi ro nếu có gì hỏng, và một cuộc điều tra sự cố mang tên mình."
        },
        "right": {
          "label": "Lợi ích thì",
          "text": "Bớt tài nguyên, bớt bề mặt tấn công, bớt việc phải làm hai lần - chia đều cho mọi người và không ai thấy."
        }
      },
      {
        "type": "closing",
        "lines": [
          "Đây là bất đối xứng động cơ, không phải thiếu thông tin, nên nó không sửa được bằng cách viết thêm tài liệu. Nó sửa được bằng cách đưa việc gỡ vào kế hoạch như một hạng mục có tên, có người, có ngày.",
          "Và đừng dừng ở mã: một kho dữ liệu người dùng của hệ thống đã tắt vẫn bị rò rỉ được, và vẫn phải trả lời được yêu cầu xoá dữ liệu."
        ]
      }
    ]
  },
  {
    "id": 1525,
    "slug": "quy-trinh-di-tru-du-lieu",
    "title": "Phát hành, Bài 5: Quy trình di trú dữ liệu - từ kế hoạch tới ngày cắt",
    "subtitle": "Di trú dữ liệu là thao tác ít đảo ngược được nhất mà một đội thường xuyên phải làm.",
    "duration": "11 phút",
    "difficulty": "Trung bình",
    "track": "professional",
    "emoji": "🚦",
    "whyItMatters": "Mã sai thì quay lui; dữ liệu sai thì có thể không khôi phục được, vì bản gốc đã bị ghi đè và bản sao lưu thì cũ hơn thời điểm bắt đầu.",
    "openingQuestion": "Điều gì làm cho di trú dữ liệu khó đảo ngược hơn triển khai mã?",
    "openingOptions": [
      "Dữ liệu gốc có thể đã bị ghi đè, và bản sao lưu thì cũ hơn thời điểm bắt đầu",
      "Quá trình di trú thường mất rất nhiều giờ nên rốt cuộc hoàn toàn không dừng lại giữa chừng được",
      "Dữ liệu sau khi di trú có cấu trúc khác nên rốt cuộc mã cũ hoàn toàn không đọc đã được nữa",
      "Người dùng đã thao tác trên dữ liệu mới nên không thể huỷ bỏ những thay đổi đó"
    ],
    "correctOption": 0,
    "explanation": "Quay lui một bản triển khai là chuyển về một tập tin đã có sẵn. Quay lui một lượt di trú thì thứ bạn cần - trạng thái dữ liệu ngay trước khi chạy - có thể không còn tồn tại ở đâu cả. Đây là lý do quy tắc đầu tiên của di trú là không bao giờ ghi đè trực tiếp lên bản gốc.",
    "diagram": [
      {
        "label": "KHÔNG ghi đè bản gốc - viết sang chỗ mới, giữ cả hai",
        "arrow": true
      },
      {
        "label": "Chạy song song: ghi cả hai, đọc từ cũ, đối chiếu",
        "arrow": true
      },
      {
        "label": "Chuyển đọc sang mới, vẫn ghi cả hai",
        "arrow": true
      },
      {
        "label": "Ổn định một thời gian rồi mới ngừng ghi vào cũ"
      }
    ],
    "realWorldExample": {
      "company": "Đối chiếu tự động trong lúc chạy song song",
      "description": "Giai đoạn chạy song song chỉ có giá trị nếu có một lượt đối chiếu tự động so hai bên và báo chênh lệch. Ghi vào cả hai chỗ mà không so thì bạn chỉ đang tốn gấp đôi công, và bạn sẽ phát hiện lệch vào đúng lúc đã ngừng ghi vào chỗ cũ."
    },
    "quiz": [
      {
        "question": "Quy tắc đầu tiên của di trú dữ liệu là gì?",
        "options": [
          "Không ghi đè trực tiếp lên bản gốc - viết sang chỗ mới và giữ cả hai bên",
          "Luôn sao lưu toàn bộ dữ liệu ngay trước khi bắt đầu quá trình di trú",
          "Chạy di trú vào khung giờ có ít người dùng nhất để giảm ảnh hưởng",
          "Chia dữ liệu thành từng lô nhỏ để dừng lại được giữa chừng khi cần"
        ],
        "correct": 0,
        "explanation": "Sao lưu là việc cần nhưng nó không thay được quy tắc này: khôi phục từ bản sao lưu nghĩa là mất mọi thay đổi của người dùng kể từ lúc sao lưu. Giữ cả hai bên thì việc quay lui là chuyển hướng đọc, không phải khôi phục."
      },
      {
        "question": "Giai đoạn chạy song song có giá trị khi nào?",
        "options": [
          "Khi có một lượt đối chiếu tự động so hai bên và báo ra mọi chênh lệch",
          "Khi cả hai hệ thống đều được theo dõi bằng cùng một bộ chỉ số hiệu năng",
          "Khi khoảng thời gian chạy song song đủ dài để có thể bao trọn đúng một chu kỳ nghiệp vụ",
          "Khi đội có đủ người để có thể xử lý sự cố ở cả hai cả hệ thống cùng lúc"
        ],
        "correct": 0,
        "explanation": "Ghi vào cả hai chỗ mà không so thì bạn chỉ đang tốn gấp đôi công. Và bạn sẽ phát hiện lệch vào đúng lúc tệ nhất: sau khi đã ngừng ghi vào chỗ cũ, tức là lúc không còn gì để đối chiếu nữa."
      },
      {
        "question": "Thứ tự chuyển đổi đúng trong giai đoạn cắt là gì?",
        "options": [
          "Chuyển đọc sang bên mới trước, vẫn ghi cả hai, rồi mới ngừng ghi vào bên cũ",
          "Ngừng ghi vào bên cũ trước, rồi chuyển đọc sang bên mới sau khi xác nhận",
          "Chuyển đọc và ngừng ghi vào bên cũ cùng lúc để tránh trạng thái không nhất quán",
          "Chuyển đọc theo từng nhóm người dùng và ngừng ghi cho từng nhóm tương ứng"
        ],
        "correct": 0,
        "explanation": "Thứ tự này giữ cho việc quay lui luôn khả thi trong suốt giai đoạn nguy hiểm nhất: nếu bên mới có vấn đề khi bắt đầu phục vụ lượt đọc thật, bạn chỉ cần chuyển đọc về bên cũ, vốn vẫn đang được cập nhật đầy đủ."
      },
      {
        "question": "Vì sao khôi phục từ bản sao lưu không phải là kế hoạch quay lui tốt?",
        "options": [
          "Vì nó làm mất mọi thay đổi của người dùng kể từ thời điểm sao lưu",
          "Vì quá trình khôi phục thường mất nhiều giờ với khối lượng dữ liệu lớn",
          "Vì bản sao lưu có thể bị hỏng và điều đó chỉ phát hiện được lúc khôi phục",
          "Vì cấu trúc dữ liệu trong bản sao lưu không tương thích với mã phiên bản mới"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là rủi ro thật của việc khôi phục. Cái này là vấn đề khác về bản chất: kể cả khi mọi thứ chạy hoàn hảo, bạn vẫn xoá mất công việc của người dùng trong khoảng thời gian đó."
      },
      {
        "question": "Điều gì nên chuẩn bị trước ngày cắt mà nhiều đội bỏ qua?",
        "options": [
          "Một kế hoạch cho phần dữ liệu không chuyển được vì nó không hợp lệ ở cấu trúc mới",
          "Một buổi diễn tập toàn bộ quy trình cắt trên môi trường thử nghiệm",
          "Một danh sách các bên liên quan cần được thông báo trước và sau khi cắt",
          "Một khung thời gian dự phòng đủ dài trong trường hợp quá trình chạy chậm"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia thường có trong kế hoạch. Phần dữ liệu bẩn thì không - và nó luôn tồn tại: bản ghi thiếu trường bắt buộc, ngày tháng vô lý, tham chiếu tới thứ đã bị xoá. Quyết định giữa bỏ qua, sửa tay hay chặn cắt phải có trước, không phải lúc ba giờ sáng."
      }
    ],
    "keyTakeaways": [
      "KHÔNG ghi đè bản gốc - viết sang chỗ mới và giữ cả hai bên.",
      "Chạy song song chỉ có giá trị nếu có ĐỐI CHIẾU tự động báo chênh lệch.",
      "Chuyển ĐỌC sang mới trước, vẫn ghi cả hai, rồi mới ngừng ghi vào cũ.",
      "Khôi phục từ sao lưu xoá mất công việc của người dùng - đó không phải quay lui.",
      "Chuẩn bị trước quyết định cho phần dữ liệu bẩn không chuyển được."
    ],
    "practicePrompt": {
      "question": "Đối chiếu báo 0,2% bản ghi lệch giữa hai bên. Nên làm gì trước ngày cắt?",
      "options": [
        "Tìm nguyên nhân của 0,2% đó, vì tỷ lệ nhỏ thường là một lớp bản ghi có chung đặc điểm",
        "Chấp nhận vì 0,2% nằm trong ngưỡng sai số hoàn toàn có thể chấp nhận được của một lượt di trú",
        "Sửa tay 0,2% bản ghi đó cho khớp rồi tiến hành cắt theo đúng kế hoạch",
        "Lùi ngày cắt và chạy lại toàn bộ quá trình di trú từ đầu cho sạch"
      ],
      "correct": 0,
      "explanation": "Sửa tay mà không hiểu nguyên nhân thì chúng lệch lại ngay hôm sau. Và 0,2% hiếm khi là ngẫu nhiên rải đều - nó thường là một lớp bản ghi có chung đặc điểm mà lượt chuyển đổi xử lý sai."
    },
    "summary": {
      "keyIdea": "Mã sai thì quay lui; dữ liệu sai thì có thể không khôi phục được.",
      "formula": "Ghi hai bên + đối chiếu → chuyển đọc → ổn định → mới ngừng ghi bên cũ.",
      "commonMistake": "Coi bản sao lưu là kế hoạch quay lui, trong khi nó xoá công việc người dùng.",
      "action": "Với lượt di trú sắp tới, viết ra kế hoạch cho phần dữ liệu bẩn."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Với lượt di trú gần nhất bạn sắp làm, viết ra hai thứ: lượt đối chiếu tự động sẽ so cái gì, và làm gì với phần dữ liệu không chuyển được.",
      "secondary": "Thứ hai là thứ hay bị bỏ qua nhất và nó luôn tồn tại. Quyết định giữa bỏ qua, sửa tay hay chặn cắt phải có trước, không phải lúc ba giờ sáng ngày cắt."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Di trú dữ liệu là thao tác ít đảo ngược được nhất mà một đội thường xuyên phải làm. Mã sai thì quay lui; dữ liệu sai thì có thể không khôi phục được."
      },
      {
        "type": "heading",
        "text": "Vì sao quay lui không giống nhau"
      },
      {
        "type": "callout",
        "label": "Thứ bạn cần có thể không còn tồn tại",
        "text": "Quay lui một bản triển khai là chuyển về một tập tin đã có sẵn. Quay lui một lượt di trú thì thứ bạn cần - trạng thái dữ liệu ngay TRƯỚC khi chạy - có thể đã bị ghi đè, và bản sao lưu thì cũ hơn thời điểm bắt đầu."
      },
      {
        "type": "paragraph",
        "text": "Và khôi phục từ bản sao lưu không phải một kế hoạch quay lui: kể cả khi mọi thứ chạy hoàn hảo, bạn vẫn xoá mất công việc của người dùng trong khoảng thời gian giữa lúc sao lưu và lúc khôi phục."
      },
      {
        "type": "heading",
        "text": "Bốn giai đoạn"
      },
      {
        "type": "list",
        "items": [
          "Viết sang chỗ MỚI, giữ nguyên bản gốc. Không ghi đè.",
          "Chạy song song: ghi vào cả hai, đọc từ bên cũ, và ĐỐI CHIẾU tự động.",
          "Chuyển ĐỌC sang bên mới, vẫn ghi cả hai.",
          "Ổn định một thời gian rồi mới ngừng ghi vào bên cũ."
        ]
      },
      {
        "type": "paragraph",
        "text": "Thứ tự của giai đoạn ba và bốn giữ cho việc quay lui luôn khả thi trong lúc nguy hiểm nhất: nếu bên mới có vấn đề khi bắt đầu phục vụ lượt đọc thật, bạn chỉ cần chuyển đọc về bên cũ, vốn vẫn đang được cập nhật đầy đủ."
      },
      {
        "type": "heading",
        "text": "Phần luôn bị bỏ qua"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Có trong kế hoạch",
          "text": "Diễn tập, danh sách thông báo, khung thời gian dự phòng. Ba thứ này gần như đội nào cũng chuẩn bị."
        },
        "right": {
          "label": "Thường không có",
          "text": "Làm gì với dữ liệu BẨN: bản ghi thiếu trường bắt buộc, ngày tháng vô lý, tham chiếu tới thứ đã bị xoá. Nó luôn tồn tại."
        }
      },
      {
        "type": "closing",
        "lines": [
          "Quyết định giữa bỏ qua, sửa tay hay chặn cắt phải có TRƯỚC, không phải lúc ba giờ sáng ngày cắt khi lượt chuyển đổi dừng ở bản ghi thứ bốn triệu.",
          "Bài cuối chặng là phần con người của cùng việc này: bàn giao."
        ]
      }
    ]
  },
  {
    "id": 1526,
    "slug": "nghia-vu-ban-giao-he-thong",
    "title": "Phát hành, Bài 6: Nghĩa vụ bàn giao - tài liệu, quyền và người chịu trách nhiệm",
    "subtitle": "Một hệ thống không có người chịu trách nhiệm rõ ràng là một hệ thống sẽ hỏng vào lúc không ai sẵn sàng.",
    "duration": "11 phút",
    "difficulty": "Trung bình",
    "track": "professional",
    "emoji": "⚖️",
    "whyItMatters": "Bàn giao là chỗ trách nhiệm rơi xuống đất mà không ai nhận ra, và người phát hiện ra thường là người trực vào đêm hệ thống hỏng lần đầu.",
    "openingQuestion": "Điều gì làm cho một lần bàn giao thất bại?",
    "openingOptions": [
      "Bên nhận không có quyền, không có ngữ cảnh, hoặc không đồng ý nhận",
      "Tài liệu kỹ thuật của hệ thống không đầy đủ hoặc đã lỗi thời so với mã",
      "Thời gian bàn giao quá ngắn nên bên nhận chưa kịp làm quen với hệ thống",
      "Bên giao đã rời tổ chức trước khi quá trình bàn giao được hoàn tất"
    ],
    "correctOption": 0,
    "explanation": "Ba điều kiện này độc lập với nhau và thiếu bất kỳ cái nào cũng đủ làm bàn giao thất bại. Điều kiện thứ ba là điều kiện hay bị bỏ qua nhất: bàn giao không phải một thông báo mà là một thoả thuận, và một đội bị giao thêm một hệ thống họ không muốn nhận sẽ không thật sự vận hành nó.",
    "diagram": [
      {
        "label": "Ba điều kiện: QUYỀN, NGỮ CẢNH, và SỰ ĐỒNG Ý",
        "arrow": true
      },
      {
        "label": "Bàn giao là một thoả thuận, không phải một thông báo",
        "arrow": true
      },
      {
        "label": "Ngữ cảnh = vì sao thế này, không phải mô tả nó là gì",
        "arrow": true
      },
      {
        "label": "Phép thử: bên nhận tự xử lý một sự cố khi bên giao còn ở đó"
      }
    ],
    "realWorldExample": {
      "company": "Phép thử duy nhất có nghĩa",
      "description": "Cách duy nhất biết bàn giao đã xong là để bên nhận tự xử lý một sự cố thật trong khi bên giao vẫn còn ở đó nhưng không can thiệp. Ký vào biên bản bàn giao không chứng minh được gì; xử lý được một sự cố thì chứng minh được cả ba điều kiện cùng lúc."
    },
    "quiz": [
      {
        "question": "Vì sao sự đồng ý của bên nhận là điều kiện chứ không phải hình thức?",
        "options": [
          "Vì một đội bị giao hệ thống họ không muốn nhận sẽ không thật sự vận hành nó",
          "Vì các quy định nội bộ yêu cầu có xác nhận bằng văn bản khi chuyển giao",
          "Vì bên nhận cần thời gian để bố trí lại nguồn lực trước khi tiếp quản hệ thống",
          "Vì việc đồng ý giúp xác định rõ ai là người liên hệ khi có sự cố xảy ra"
        ],
        "correct": 0,
        "explanation": "Họ sẽ không đọc cảnh báo, không xem lại phần nợ kỹ thuật, và khi hỏng thì phản xạ đầu tiên là tìm người cũ. Đây là lý do bàn giao là một thoả thuận cần thương lượng, không phải một thông báo."
      },
      {
        "question": "Loại tài liệu nào thật sự cần cho bàn giao?",
        "options": [
          "Ghi lại vì sao hệ thống được làm thế này, gồm cả những cách đã thử và bỏ",
          "Mô tả đầy đủ kiến trúc cùng với các thành phần của chính hệ thống một cách thật chi tiết",
          "Hướng dẫn từng bước để thực hiện các thao tác vận hành thường gặp nhất",
          "Danh sách toàn bộ các phụ thuộc bên ngoài và phiên bản đang được dùng"
        ],
        "correct": 0,
        "explanation": "Ba loại kia đọc được từ mã và từ cấu hình, tuy tốn công. Cái không đọc được từ đâu là LÝ DO - và không có nó thì bên nhận sẽ lặp lại đúng những sai lầm mà bên giao đã trả giá để học."
      },
      {
        "question": "Phép thử nào chứng minh bàn giao đã hoàn tất?",
        "options": [
          "Bên nhận tự xử lý một sự cố thật khi bên giao còn ở đó nhưng không can thiệp",
          "Bên nhận ký xác nhận vào biên bản bàn giao sau khi đã đọc toàn bộ tài liệu",
          "Bên nhận thực hiện thành công một lần triển khai lên môi trường thật",
          "Bên nhận trả lời đúng một bộ câu hỏi kiểm tra về kiến trúc của hệ thống"
        ],
        "correct": 0,
        "explanation": "Nó chứng minh được cả ba điều kiện cùng lúc: họ có quyền để thao tác, có ngữ cảnh để hiểu chuyện gì đang xảy ra, và đủ nhận trách nhiệm để bắt tay vào. Ba phép thử kia chỉ chứng minh được từng phần."
      },
      {
        "question": "Rủi ro của việc bàn giao quyền truy cập là gì?",
        "options": [
          "Bên giao thường giữ lại quyền và điều đó làm trách nhiệm trở nên mơ hồ",
          "Bên nhận có thể được cấp quyền rộng hơn mức họ thật sự cần để vận hành",
          "Việc chuyển quyền qua nhiều hệ thống khác nhau dễ bỏ sót một vài chỗ",
          "Quyền truy cập cũ không bị thu hồi làm tăng bề mặt tấn công của hệ thống"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là vấn đề bảo mật thật. Cái này là vấn đề về trách nhiệm: khi cả hai bên đều còn quyền thì khi có sự cố, mỗi bên đều hợp lý khi cho rằng bên kia đang xử lý."
      },
      {
        "question": "Điều gì nên đi kèm hệ thống trong lúc bàn giao?",
        "options": [
          "Danh sách nợ kỹ thuật đã biết, kèm mức nghiêm trọng và cách xử lý tạm hiện tại",
          "Kế hoạch phát triển các tính năng mới đã được thống nhất cho quý tiếp theo",
          "Lịch sử đầy đủ các sự cố đã xảy ra với hệ thống trong hai năm gần nhất",
          "Bản đánh giá về mức độ quan trọng của hệ thống đối với hoạt động chung"
        ],
        "correct": 0,
        "explanation": "Giấu nợ kỹ thuật lúc bàn giao là cách chắc chắn nhất để phá vỡ niềm tin giữa hai đội, và nó luôn bị phát hiện - thường là vào lúc bên nhận đang xử lý sự cố đầu tiên và tìm ra một cách xử lý tạm không ai nói với họ."
      }
    ],
    "keyTakeaways": [
      "Ba điều kiện: QUYỀN, NGỮ CẢNH, và SỰ ĐỒNG Ý - thiếu cái nào cũng đủ hỏng.",
      "Bàn giao là một THOẢ THUẬN cần thương lượng, không phải một thông báo.",
      "Tài liệu cần nhất là VÌ SAO thế này - mọi thứ khác đọc được từ mã.",
      "Bên giao giữ lại quyền thì trách nhiệm mơ hồ và mỗi bên tưởng bên kia lo.",
      "Phép thử: bên nhận tự xử lý một sự cố thật khi bên giao còn đó mà không can thiệp."
    ],
    "practicePrompt": {
      "question": "Đội bạn sắp nhận một hệ thống. Câu hỏi đầu tiên nên hỏi là gì?",
      "options": [
        "Nợ kỹ thuật đã biết là gì, và cách xử lý tạm nào đang được dùng",
        "Hệ thống này có kiến trúc thế nào và gồm những thành phần nào",
        "Ai là những người dùng chính và họ mong đợi gì từ hệ thống này",
        "Lịch sử phát triển của hệ thống ra sao và đã qua bao nhiêu phiên bản"
      ],
      "correct": 0,
      "explanation": "Kiến trúc và người dùng đều tra được sau. Nợ kỹ thuật và cách xử lý tạm thì chỉ nằm trong đầu bên giao, và cửa sổ để hỏi sẽ đóng lại khi họ chuyển sang việc khác."
    },
    "summary": {
      "keyIdea": "Bàn giao là chỗ trách nhiệm rơi xuống đất mà không ai nhận ra.",
      "formula": "Quyền + ngữ cảnh + đồng ý, rồi kiểm bằng một sự cố thật do bên nhận xử lý.",
      "commonMistake": "Coi bàn giao là thông báo, và bên giao vẫn giữ lại quyền truy cập.",
      "action": "Với hệ thống bạn đang giữ, viết ra ba câu vì sao nó được làm thế này."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Với một hệ thống bạn đang giữ, viết ra ba câu trả lời cho câu hỏi vì sao nó được làm thế này - gồm cả cách đã thử và bỏ đi.",
      "secondary": "Đó là phần tài liệu duy nhất không đọc được từ mã, và nó là phần biến mất hoàn toàn khi bạn chuyển sang việc khác."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bàn giao là chỗ trách nhiệm rơi xuống đất mà không ai nhận ra. Người phát hiện ra thường là người trực vào đêm hệ thống hỏng lần đầu."
      },
      {
        "type": "heading",
        "text": "Ba điều kiện"
      },
      {
        "type": "list",
        "items": [
          "QUYỀN: bên nhận truy cập được mọi thứ họ cần, và bên giao KHÔNG còn giữ lại.",
          "NGỮ CẢNH: vì sao hệ thống được làm thế này, gồm cả những cách đã thử và bỏ.",
          "SỰ ĐỒNG Ý: bên nhận thật sự nhận, chứ không phải được thông báo."
        ]
      },
      {
        "type": "callout",
        "label": "Điều kiện thứ ba hay bị bỏ qua nhất",
        "text": "Một đội bị giao thêm một hệ thống họ không muốn nhận sẽ không thật sự vận hành nó. Họ không đọc cảnh báo, không xem lại phần nợ kỹ thuật, và khi hỏng thì phản xạ đầu tiên là tìm người cũ."
      },
      {
        "type": "heading",
        "text": "Về quyền, và vì sao phải thu hồi"
      },
      {
        "type": "paragraph",
        "text": "Bên giao giữ lại quyền nghe như một mạng lưới an toàn, và nó tạo ra một vùng xám: khi có sự cố, mỗi bên đều hợp lý khi cho rằng bên kia đang xử lý. Đó không phải hai lớp bảo vệ - đó là không lớp nào."
      },
      {
        "type": "heading",
        "text": "Tài liệu nào thật sự cần"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Đọc được từ mã",
          "text": "Kiến trúc, thành phần, phụ thuộc, các bước vận hành. Tốn công nhưng tra ra được."
        },
        "right": {
          "label": "Không đọc được từ đâu",
          "text": "LÝ DO. Vì sao chọn cách này, đã thử cách nào và bỏ vì sao. Không có nó thì bên nhận lặp lại đúng những sai lầm bên giao đã trả giá để học."
        }
      },
      {
        "type": "closing",
        "lines": [
          "Và đưa cả danh sách NỢ KỸ THUẬT đã biết, kèm mức nghiêm trọng và cách xử lý tạm hiện tại. Giấu nó là cách chắc chắn nhất để phá vỡ niềm tin giữa hai đội, và nó luôn bị phát hiện.",
          "Phép thử cuối cùng, và là phép thử duy nhất có nghĩa: để bên nhận tự xử lý một sự cố thật trong khi bên giao còn ở đó nhưng không can thiệp."
        ]
      }
    ]
  },
];
