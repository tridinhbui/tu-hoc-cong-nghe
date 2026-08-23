import type { Lesson } from "./lesson-types";

// Chặng "Nhật ký hệ thống và sổ sự kiện" (ids 1721-1725, professional).
//
// Lúc có sự cố, thứ quyết định mất năm phút hay ba giờ không phải là có ghi
// log hay không, mà là log có lọc được không. Chặng này đi từ ghi log có cấu
// trúc, qua đường đi từ một dòng log tới biểu đồ và những chỗ mất mát trên
// đường đó, tới xoay vòng lưu trữ, đối chiếu và chốt kỳ số liệu.

export const LOGGING_LESSONS: Lesson[] = [
  {
    "id": 1721,
    "slug": "ghi-log-co-cau-truc",
    "title": "Nhật ký, Bài 1: Ghi log có cấu trúc - vì sao một dòng chữ là không đủ",
    "subtitle": "Log viết cho người đọc thì máy không truy vấn được; log viết cho máy thì người vẫn đọc được.",
    "duration": "11 phút",
    "difficulty": "Trung bình",
    "track": "professional",
    "emoji": "📒",
    "whyItMatters": "Lúc có sự cố, thứ quyết định bạn mất năm phút hay ba giờ không phải là bạn có ghi log hay không, mà là log của bạn có lọc được không.",
    "openingQuestion": "Log có cấu trúc khác log dạng câu chữ ở điểm nào quan trọng nhất?",
    "openingOptions": [
      "Nó lọc và gộp nhóm được theo trường, thay vì chỉ tìm được bằng chuỗi ký tự",
      "Nó ghi được nhiều thông tin hơn trong cùng một dòng nhật ký duy nhất",
      "Nó tốn ít dung lượng lưu trữ hơn hẳn nên giữ lại được lâu hơn với chính cùng chi phí",
      "Nó dễ đọc hơn cho người trực khi phải xem trực tiếp trên máy chủ"
    ],
    "correctOption": 0,
    "explanation": "Một dòng chữ chỉ tìm được bằng cách khớp chuỗi, nên bạn không hỏi được những câu như tỷ lệ lỗi theo từng khách hàng trong giờ qua. Log có cấu trúc đặt mỗi mẩu thông tin vào một trường có tên, và lúc đó nó trở thành dữ liệu truy vấn được. Đổi lại, nó khó đọc hơn khi xem trực tiếp - đó là cái giá, không phải lợi ích.",
    "diagram": [
      {
        "label": "Mỗi mẩu thông tin vào một TRƯỜNG có tên",
        "arrow": true
      },
      {
        "label": "Lọc và gộp nhóm theo trường, không khớp chuỗi",
        "arrow": true
      },
      {
        "label": "Kèm mã định danh yêu cầu ở MỌI dòng",
        "arrow": true
      },
      {
        "label": "Không bao giờ ghi mật khẩu, khoá hay dữ liệu cá nhân"
      }
    ],
    "realWorldExample": {
      "company": "Trường quan trọng nhất",
      "description": "Mã định danh yêu cầu là trường đáng giá nhất trong một dòng log, vì nó biến hàng nghìn dòng rời rạc từ nhiều dịch vụ thành một câu chuyện về một yêu cầu. Không có nó, bạn phải nối các dòng bằng dấu thời gian - việc gần như không làm được khi có nhiều yêu cầu chạy song song."
    },
    "quiz": [
      {
        "question": "Vì sao mã định danh yêu cầu là trường đáng giá nhất?",
        "options": [
          "Vì nó biến hàng nghìn dòng rời rạc từ nhiều dịch vụ thành một câu chuyện",
          "Vì nó giúp đếm chính xác số lượng yêu cầu mà hệ thống đã xử lý",
          "Vì nó cho phép phát hiện các yêu cầu bị gửi trùng lặp nhiều lần",
          "Vì nó chính là trường bắt buộc theo đúng chuẩn ghi dòng log của phần lớn công cụ"
        ],
        "correct": 0,
        "explanation": "Không có nó thì bạn phải nối các dòng bằng dấu thời gian, và việc đó gần như không làm được khi có nhiều yêu cầu chạy song song trên nhiều máy chủ có đồng hồ lệch nhau vài mili giây."
      },
      {
        "question": "Cái giá của log có cấu trúc là gì?",
        "options": [
          "Khó đọc hơn khi xem trực tiếp trên máy chủ, vì mỗi dòng dài và nhiều dấu ngoặc",
          "Tốn nhiều dung lượng lưu trữ hơn nên chi phí giữ log tăng lên đáng kể",
          "Cần thêm một hệ thống thu thập và lập chỉ mục thì mới dùng được",
          "Làm chậm ứng dụng vì phải chuyển đổi dữ liệu sang định dạng có cấu trúc"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là chi phí thật nhưng chúng nhỏ và đo được. Cái này thì ảnh hưởng tới thói quen hằng ngày, và nó là lý do nhiều đội quay về log dạng câu chữ sau vài tuần."
      },
      {
        "question": "Điều gì không bao giờ được ghi vào log?",
        "options": [
          "Mật khẩu, khoá truy cập và dữ liệu cá nhân của người dùng hệ thống",
          "Nội dung đầy đủ của các yêu cầu và phản hồi giữa các dịch vụ nội bộ",
          "Thông tin về phiên bản mã và cấu hình đang chạy trên từng máy chủ",
          "Các giá trị tham số đầu vào mà hàm nhận được khi có lỗi xảy ra"
        ],
        "correct": 0,
        "explanation": "Log thường được sao chép sang nhiều hệ thống, giữ lâu hơn dữ liệu gốc, và nhiều người truy cập được hơn cơ sở dữ liệu. Ba lựa chọn kia đều hữu ích và đều nên ghi, có chọn lọc."
      },
      {
        "question": "Vì sao nên có mức độ log và dùng chúng nhất quán?",
        "options": [
          "Vì không nhất quán thì cảnh báo theo mức lỗi trở nên vô nghĩa do quá nhiều nhiễu",
          "Vì các công cụ thu thập log yêu cầu mỗi dòng phải khai báo một mức độ cụ thể",
          "Vì mức độ quyết định dòng log đó được lưu giữ trong bao lâu trước khi bị xoá",
          "Vì người trực thật sự cần biết dòng nào quan trọng mỗi khi đọc dòng log trực tiếp lúc có sự cố"
        ],
        "correct": 0,
        "explanation": "Khi mọi thứ hơi bất thường đều được ghi ở mức lỗi thì con số lỗi mỗi phút không còn nói lên điều gì. Cách phân biệt hữu ích: mức lỗi dành cho thứ CẦN CÓ NGƯỜI xử lý, mọi thứ khác là mức cảnh báo hoặc thấp hơn."
      },
      {
        "question": "Vì sao không nên ghi log trong vòng lặp nóng?",
        "options": [
          "Vì chi phí ghi và lưu trữ tăng theo cấp số, và tín hiệu hữu ích bị chôn vùi",
          "Vì việc ghi dòng log làm thay đổi hành vi thời gian của đoạn mã đang được đo",
          "Vì các công cụ lập chỉ mục có giới hạn số dòng nhận được mỗi giây",
          "Vì dữ liệu ghi ra sẽ trùng lặp nên không cung cấp thêm thông tin mới"
        ],
        "correct": 0,
        "explanation": "Hai hậu quả này đi cùng nhau và hậu quả thứ hai nặng hơn: một vòng lặp ghi mười triệu dòng mỗi giờ vừa làm hoá đơn tăng vừa làm cho dòng log quan trọng của bạn không tìm thấy được."
      }
    ],
    "keyTakeaways": [
      "Log có cấu trúc LỌC và GỘP NHÓM được theo trường; log dạng câu chữ chỉ khớp chuỗi.",
      "Mã định danh yêu cầu là trường đáng giá nhất - nó nối các dòng thành một câu chuyện.",
      "Cái giá thật là khó đọc trực tiếp, và đó là lý do nhiều đội bỏ cuộc sau vài tuần.",
      "Không bao giờ ghi mật khẩu, khoá hay dữ liệu cá nhân - log đi xa hơn dữ liệu gốc.",
      "Mức lỗi dành cho thứ CẦN CÓ NGƯỜI xử lý; nếu không cảnh báo theo mức lỗi thành nhiễu."
    ],
    "practicePrompt": {
      "question": "Đội bạn ghi log dạng câu chữ. Thay đổi nào cho lợi ích lớn nhất với ít công nhất?",
      "options": [
        "Thêm mã định danh yêu cầu vào mọi dòng, trước cả khi đổi sang định dạng có cấu trúc",
        "Chuyển toàn bộ hệ thống sang định dạng có cấu trúc trong một lần thay đổi lớn",
        "Dựng đúng một cả hệ thống thu thập và lập chỉ mục dòng log tập trung cho tất cả các dịch vụ",
        "Rà soát lại toàn bộ mức độ log hiện có và sửa những chỗ đang dùng sai mức"
      ],
      "correct": 0,
      "explanation": "Ba việc kia đều đáng làm và đều tốn nhiều tuần. Mã định danh thì thêm được ở một chỗ duy nhất là lớp trung gian, và nó cho bạn thứ mà không công cụ nào bù được: khả năng nối các dòng lại."
    },
    "summary": {
      "keyIdea": "Log viết cho máy thì người vẫn đọc được; log viết cho người thì máy chịu.",
      "formula": "Mỗi mẩu thông tin một trường + mã định danh yêu cầu ở mọi dòng.",
      "commonMistake": "Ghi mọi thứ hơi bất thường ở mức lỗi, làm cảnh báo theo mức lỗi thành nhiễu.",
      "action": "Kiểm xem một dòng log của bạn có mã định danh yêu cầu không."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Mở một dòng log bất kỳ của hệ thống bạn và hỏi: từ dòng này, tôi tìm được mọi dòng khác thuộc cùng một yêu cầu không?",
      "secondary": "Nếu không, thêm mã định danh yêu cầu ở lớp trung gian. Đó là thay đổi một chỗ, và nó đổi hoàn toàn việc gỡ lỗi của mọi sự cố sau này."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Lúc có sự cố, thứ quyết định bạn mất năm phút hay ba giờ không phải là bạn có ghi log hay không, mà là log của bạn có LỌC được không."
      },
      {
        "type": "heading",
        "text": "Hai kiểu log"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Dạng câu chữ",
          "text": "Một dòng chữ cho người đọc. Chỉ tìm được bằng cách khớp chuỗi, nên bạn không hỏi được những câu như tỷ lệ lỗi theo từng khách hàng trong giờ qua."
        },
        "right": {
          "label": "Có cấu trúc",
          "text": "Mỗi mẩu thông tin vào một TRƯỜNG có tên. Lúc đó log trở thành dữ liệu truy vấn được: lọc, gộp nhóm, đếm, so sánh giữa các khoảng thời gian."
        }
      },
      {
        "type": "callout",
        "label": "Cái giá, nói thẳng",
        "text": "Log có cấu trúc khó đọc hơn khi xem trực tiếp trên máy chủ - mỗi dòng dài và nhiều dấu ngoặc. Đây là lý do nhiều đội quay về dạng câu chữ sau vài tuần, và nó là chi phí phải chấp nhận chứ không phải khuyết điểm sửa được."
      },
      {
        "type": "heading",
        "text": "Trường đáng giá nhất"
      },
      {
        "type": "paragraph",
        "text": "Mã định danh yêu cầu. Nó biến hàng nghìn dòng rời rạc từ nhiều dịch vụ thành một câu chuyện về MỘT yêu cầu. Không có nó, bạn phải nối các dòng bằng dấu thời gian, và việc đó gần như không làm được khi có nhiều yêu cầu chạy song song."
      },
      {
        "type": "heading",
        "text": "Hai điều đừng làm"
      },
      {
        "type": "list",
        "items": [
          "Đừng ghi mật khẩu, khoá truy cập hay dữ liệu cá nhân. Log được sao chép sang nhiều hệ thống, giữ lâu hơn dữ liệu gốc, và nhiều người truy cập được hơn cơ sở dữ liệu.",
          "Đừng ghi trong vòng lặp nóng. Một vòng lặp ghi mười triệu dòng mỗi giờ vừa làm hoá đơn tăng vừa chôn vùi dòng log bạn thật sự cần."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Và giữ MỨC ĐỘ log nhất quán: mức lỗi dành cho thứ CẦN CÓ NGƯỜI xử lý, mọi thứ khác là cảnh báo hoặc thấp hơn.",
          "Khi mọi thứ hơi bất thường đều là lỗi thì con số lỗi mỗi phút không còn nói lên điều gì, và bạn mất luôn một trong những cảnh báo rẻ nhất mà mình có."
        ]
      }
    ]
  },
  {
    "id": 1722,
    "interactiveType": "tail-risk",
    "slug": "duong-di-tu-su-kien-toi-dashboard",
    "title": "Nhật ký, Bài 2: Từ một dòng log tới biểu đồ - đường đi và chỗ mất mát",
    "subtitle": "Giữa chỗ ghi và chỗ nhìn có bốn chặng, và mỗi chặng đều làm mất một ít.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "track": "professional",
    "emoji": "🗂️",
    "whyItMatters": "Người ta tin biểu đồ như tin số liệu gốc, trong khi giữa hai thứ đó có bốn chặng biến đổi mà không chặng nào báo khi nó bỏ bớt.",
    "openingQuestion": "Biểu đồ báo 0 lỗi trong mười phút qua. Có bao nhiêu cách giải thích?",
    "openingOptions": [
      "Ít nhất ba - không có lỗi, đường thu thập đứt, hoặc truy vấn lọc nhầm",
      "Một - hệ thống đang chạy bình thường và không có lỗi nào xảy ra",
      "Hai - hoặc hoàn toàn không có lỗi, hoặc cả hệ thống ghi dòng log đã ngừng hoạt động",
      "Tuỳ vào khoảng thời gian mà biểu đồ đang hiển thị dữ liệu"
    ],
    "correctOption": 0,
    "explanation": "Không có dữ liệu và không có lỗi trông giống hệt nhau trên phần lớn biểu đồ, và đây là kiểu hỏng im lặng phổ biến nhất của hệ thống theo dõi. Cách chữa là một cảnh báo riêng cho việc KHÔNG NHẬN ĐƯỢC dữ liệu, chứ không phải nhìn kỹ hơn vào biểu đồ đang có.",
    "diagram": [
      {
        "label": "Ghi → thu thập → lập chỉ mục → truy vấn → hiển thị",
        "arrow": true
      },
      {
        "label": "Mỗi chặng bỏ bớt một ít, và không chặng nào báo",
        "arrow": true
      },
      {
        "label": "Không có dữ liệu trông giống hệt không có lỗi",
        "arrow": true
      },
      {
        "label": "Cần cảnh báo riêng cho việc KHÔNG nhận được dữ liệu"
      }
    ],
    "realWorldExample": {
      "company": "Lấy mẫu ở chặng thu thập",
      "description": "Nhiều hệ thống thu thập chỉ giữ một phần dòng log khi lưu lượng cao để không vỡ. Đó là quyết định đúng, và nó có nghĩa là con số bạn đếm trên biểu đồ phải nhân lại - còn nếu bạn đang tìm MỘT dòng cụ thể thì nó có thể không bao giờ tới nơi."
    },
    "quiz": [
      {
        "question": "Vì sao lấy mẫu ở chặng thu thập nguy hiểm khi điều tra sự cố?",
        "options": [
          "Vì dòng log bạn đang tìm có thể là dòng đã bị bỏ, và bạn không biết điều đó",
          "Vì tỷ lệ lấy mẫu thay đổi theo đúng tải nên con số trên biểu đồ hoàn toàn không ổn định",
          "Vì việc lấy mẫu làm tăng độ trễ giữa lúc ghi và lúc dữ liệu hiện lên",
          "Vì các dòng log bị bỏ vẫn tính vào chi phí lưu trữ của hệ thống"
        ],
        "correct": 0,
        "explanation": "Với số liệu tổng hợp thì lấy mẫu vô hại vì bạn nhân lại được. Với việc tìm một dòng cụ thể thì nó là hố đen: bạn kết luận sự việc không xảy ra, trong khi nó xảy ra và bị bỏ."
      },
      {
        "question": "Vì sao cần cảnh báo riêng cho việc không nhận được dữ liệu?",
        "options": [
          "Vì đường thu thập đứt trông giống hệt hệ thống đang chạy tốt trên biểu đồ",
          "Vì hệ thống thu thập cần được theo dõi giống như mọi dịch vụ khác",
          "Vì con số độ trễ của đường thu thập ảnh hưởng tới khoảng thời gian phát hiện sự cố",
          "Vì cần biết khi nào dữ liệu bị thiếu để loại khoảng đó khỏi báo cáo"
        ],
        "correct": 0,
        "explanation": "Đây là kiểu hỏng im lặng phổ biến nhất của hệ thống theo dõi, và nó tệ ở chỗ nó hỏng theo hướng làm bạn yên tâm. Một biểu đồ phẳng ở mức không trông giống hệt một hệ thống hoàn hảo."
      },
      {
        "question": "Vì sao độ trễ của đường thu thập là con số cần biết?",
        "options": [
          "Vì lúc có sự cố bạn cần biết biểu đồ đang cho thấy hiện tại hay ba phút trước",
          "Vì độ trễ cao làm tăng dung lượng bộ đệm cần thiết ở phía thu thập",
          "Vì nó quyết định tần suất tối thiểu mà biểu đồ có thể được làm mới",
          "Vì cần đối chiếu độ trễ giữa các vùng để phát hiện vấn đề mạng"
        ],
        "correct": 0,
        "explanation": "Ba phút trong lúc xử lý sự cố là rất dài. Không biết con số này thì bạn dễ kết luận thay đổi vừa rồi không có tác dụng, trong khi tác dụng của nó chưa kịp hiện lên biểu đồ."
      },
      {
        "question": "Số liệu tổng hợp khác log ở điểm nào?",
        "options": [
          "Số liệu tổng hợp rẻ và giữ lâu được, nhưng mất hoàn toàn chi tiết từng sự việc",
          "Số liệu tổng hợp chính xác hơn vì nó được tính từ toàn bộ các dòng log",
          "Số liệu tổng hợp cập nhật nhanh hơn vì không cần qua bước lập chỉ mục",
          "Số liệu tổng hợp chỉ dùng được cho tất cả các chỉ số kỹ thuật chứ hoàn toàn không cho nghiệp vụ"
        ],
        "correct": 0,
        "explanation": "Đây là lý do cần cả hai chứ không chọn một: số liệu tổng hợp trả lời câu có gì bất thường không, còn log trả lời câu bất thường đó là chuyện gì. Dùng một cái thay cả hai thì hoặc rất đắt, hoặc rất mù."
      },
      {
        "question": "Vì sao truy vấn dựng biểu đồ cũng là một chỗ mất mát?",
        "options": [
          "Vì bộ lọc trong truy vấn có thể loại đúng phần dữ liệu mà bạn cần nhìn",
          "Vì truy vấn chạy trên dữ liệu đã được nén nên độ chính xác bị giảm",
          "Vì thời gian chạy truy vấn giới hạn lượng dữ liệu được đưa vào tính toán",
          "Vì mỗi biểu đồ chỉ hiển thị được một số lượng điểm dữ liệu nhất định"
        ],
        "correct": 0,
        "explanation": "Đây là chỗ mất mát khó thấy nhất vì nó do chính bạn viết ra. Một bộ lọc theo tên dịch vụ sẽ im lặng bỏ qua các dòng từ một dịch vụ mới được tách ra, và biểu đồ vẫn trông bình thường."
      }
    ],
    "keyTakeaways": [
      "Bốn chặng giữa chỗ ghi và chỗ nhìn, mỗi chặng bỏ bớt một ít và không chặng nào báo.",
      "KHÔNG CÓ DỮ LIỆU trông giống hệt KHÔNG CÓ LỖI - cần cảnh báo riêng cho chuyện đó.",
      "Lấy mẫu vô hại với số liệu tổng hợp và là hố đen khi tìm một dòng cụ thể.",
      "Biết ĐỘ TRỄ của đường thu thập, nếu không bạn đọc quá khứ tưởng là hiện tại.",
      "Cần cả hai: số liệu tổng hợp nói có gì bất thường, log nói bất thường đó là gì."
    ],
    "practicePrompt": {
      "question": "Biểu đồ lỗi phẳng ở mức không suốt hai giờ. Việc đầu tiên nên làm là gì?",
      "options": [
        "Kiểm xem đường thu thập còn nhận được dòng nào không, trước khi kết luận là tốt",
        "So sánh với cùng khoảng thời gian của ngày hôm trước để xem có bất thường không",
        "Kiểm tra xem có thay đổi nào vừa được triển khai có thể đã sửa các lỗi cũ không",
        "Xem các biểu đồ khác trên cùng bảng theo dõi để xác nhận hệ thống đang bình thường"
      ],
      "correct": 0,
      "explanation": "Lựa chọn cuối nghe hợp lý nhưng nếu đường thu thập đứt thì các biểu đồ khác cũng phẳng, và chúng cùng xác nhận cho nhau một điều sai. Kiểm ở gốc là cách duy nhất phân biệt."
    },
    "summary": {
      "keyIdea": "Giữa chỗ ghi và chỗ nhìn có bốn chặng, và mỗi chặng đều làm mất một ít.",
      "formula": "Ghi → thu thập → lập chỉ mục → truy vấn → hiển thị, cộng một cảnh báo vắng dữ liệu.",
      "commonMistake": "Đọc biểu đồ phẳng ở mức không là mọi thứ đều tốt.",
      "action": "Đặt một cảnh báo cho việc không nhận được dòng log nào trong mười phút."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Đặt một cảnh báo cho việc hệ thống thu thập không nhận được dòng nào từ một dịch vụ trong mười phút. Đó là cảnh báo rẻ nhất mà phần lớn đội chưa có.",
      "secondary": "Rồi tìm hai con số: tỷ lệ lấy mẫu hiện tại, và độ trễ từ lúc ghi tới lúc dữ liệu hiện lên. Cả hai đều cần biết trước sự cố, không phải trong lúc đang có sự cố."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Người ta tin biểu đồ như tin số liệu gốc. Giữa hai thứ đó có bốn chặng biến đổi, và không chặng nào báo khi nó bỏ bớt."
      },
      {
        "type": "heading",
        "text": "Bốn chặng"
      },
      {
        "type": "list",
        "items": [
          "GHI: ứng dụng viết ra một dòng. Nếu bộ đệm đầy, dòng đó có thể bị bỏ ngay tại đây.",
          "THU THẬP: một tiến trình đọc và gửi đi. Nhiều hệ thống LẤY MẪU khi lưu lượng cao.",
          "LẬP CHỈ MỤC: dữ liệu được sắp xếp để truy vấn được. Chặng này tạo ra ĐỘ TRỄ.",
          "TRUY VẤN VÀ HIỂN THỊ: bộ lọc của chính bạn quyết định cái gì lên biểu đồ."
        ]
      },
      {
        "type": "heading",
        "text": "Kiểu hỏng im lặng"
      },
      {
        "type": "callout",
        "label": "Không có dữ liệu trông giống hệt không có lỗi",
        "text": "Một biểu đồ phẳng ở mức không trông giống hệt một hệ thống hoàn hảo. Đây là kiểu hỏng tệ nhất của hệ thống theo dõi vì nó hỏng theo hướng làm bạn YÊN TÂM - và cách chữa là một cảnh báo riêng cho việc không nhận được dữ liệu."
      },
      {
        "type": "heading",
        "text": "Lấy mẫu: vô hại hay hố đen"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Số liệu tổng hợp",
          "text": "Lấy mẫu vô hại - bạn nhân lại được. Đếm lỗi mỗi phút vẫn đúng về hình dạng."
        },
        "right": {
          "label": "Tìm một dòng cụ thể",
          "text": "Hố đen. Dòng bạn đang tìm có thể chính là dòng đã bị bỏ, và bạn kết luận sự việc không xảy ra."
        }
      },
      {
        "type": "paragraph",
        "text": "Cùng lý do đó, đừng chọn giữa số liệu tổng hợp và log. Số liệu tổng hợp rẻ, giữ lâu được và trả lời câu CÓ GÌ BẤT THƯỜNG KHÔNG. Log đắt hơn, giữ ngắn hơn, và trả lời câu BẤT THƯỜNG ĐÓ LÀ CHUYỆN GÌ."
      },
      {
        "type": "closing",
        "lines": [
          "Con số cuối cùng cần biết trước sự cố: ĐỘ TRỄ từ lúc ghi tới lúc dữ liệu hiện lên. Ba phút trong lúc xử lý sự cố là rất dài.",
          "Không biết nó thì bạn dễ kết luận thay đổi vừa rồi không có tác dụng, trong khi tác dụng của nó chưa kịp hiện lên biểu đồ."
        ]
      }
    ]
  },
  {
    "id": 1723,
    "slug": "xoay-vong-log-va-chi-phi-luu-tru",
    "title": "Nhật ký, Bài 3: Xoay vòng và lưu trữ - giữ bao lâu và giữ cái gì",
    "subtitle": "Giữ tất cả thì không trả nổi; giữ ít quá thì lúc cần lại không còn.",
    "duration": "12 phút",
    "difficulty": "Khó",
    "track": "professional",
    "emoji": "🔧",
    "whyItMatters": "Chi phí log là khoản dễ vượt ngân sách nhất trong hạ tầng, và cách cắt sai sẽ xoá đúng phần dữ liệu mà cuộc điều tra sáu tháng sau cần tới.",
    "openingQuestion": "Nên giữ log trong bao lâu?",
    "openingOptions": [
      "Nhiều mức khác nhau tuỳ loại, thay vì một thời hạn chung cho tất cả",
      "Ba mươi ngày, vì đó là khoảng đủ cho phần lớn cuộc điều tra sự cố",
      "Càng lâu càng tốt trong giới hạn ngân sách mà đội được cấp",
      "Theo yêu cầu tối thiểu của quy định pháp luật áp dụng cho ngành"
    ],
    "correctOption": 0,
    "explanation": "Một thời hạn chung luôn sai theo cả hai chiều cùng lúc: quá dài cho log gỡ lỗi chi tiết, thứ mà giá trị rơi gần như thẳng đứng sau khi sự cố đóng, và quá ngắn cho log truy cập, thứ mà câu hỏi thường tới sau nhiều tháng và không ai lên lịch trước được. Chia theo loại thì bạn giữ được phần đáng giữ lâu mà không trả tiền cho phần không ai đọc sau ba ngày.",
    "diagram": [
      {
        "label": "Chia theo LOẠI, không một thời hạn chung",
        "arrow": true
      },
      {
        "label": "Gỡ lỗi chi tiết: vài ngày. Truy cập và kiểm toán: nhiều năm",
        "arrow": true
      },
      {
        "label": "Số liệu tổng hợp rẻ hơn log hàng nghìn lần - giữ lâu",
        "arrow": true
      },
      {
        "label": "Cắt bằng lấy mẫu có chủ đích, không cắt bằng rút ngắn thời hạn"
      }
    ],
    "realWorldExample": {
      "company": "Cắt sai chỗ",
      "description": "Cách cắt chi phí hay được chọn nhất là rút ngắn thời hạn cho mọi loại log. Nó giảm hoá đơn ngay và nó xoá đúng phần bạn cần khi có một cuộc điều tra về việc gì đã xảy ra ba tháng trước - loại điều tra mà không ai lên lịch trước được."
    },
    "quiz": [
      {
        "question": "Vì sao một thời hạn chung cho mọi loại log luôn sai?",
        "options": [
          "Vì nó vừa quá dài cho log gỡ lỗi vừa quá ngắn cho log truy cập cùng một lúc",
          "Vì các loại log có kích thước khác nhau nên chi phí lưu trữ không đồng đều",
          "Vì các quy định pháp luật đặt ra yêu cầu khác nhau cho từng loại dữ liệu",
          "Vì thời hạn cần được điều chỉnh theo đúng mức tăng trưởng của lưu lượng hệ thống"
        ],
        "correct": 0,
        "explanation": "Hai sai lầm cùng tồn tại là điều làm cho lựa chọn này khác các lựa chọn kia: bạn vừa trả tiền cho thứ không ai đọc sau ba ngày vừa mất thứ mà một cuộc điều tra sáu tháng sau cần tới."
      },
      {
        "question": "Vì sao số liệu tổng hợp nên giữ lâu hơn log rất nhiều?",
        "options": [
          "Vì nó rẻ hơn hàng nghìn lần mà vẫn trả lời được câu hỏi về xu hướng dài hạn",
          "Vì nó không chứa dữ liệu cá nhân nên không bị ràng buộc bởi quy định lưu trữ",
          "Vì nó được nén tốt hơn nhiều so với dữ liệu log dạng văn bản",
          "Vì các công cụ phân tích chỉ hỗ trợ truy vấn số liệu trong khoảng thời gian dài"
        ],
        "correct": 0,
        "explanation": "Câu hỏi độ trễ năm nay so với năm ngoái thế nào chỉ trả lời được nếu bạn còn số liệu của năm ngoái, và giữ số liệu tổng hợp một năm rẻ hơn giữ log một tuần ở phần lớn hệ thống."
      },
      {
        "question": "Cách cắt chi phí nào ít gây hại nhất?",
        "options": [
          "Lấy mẫu có chủ đích: giữ toàn bộ dòng lỗi, chỉ lấy mẫu các dòng thành công",
          "Rút ngắn thời hạn lưu trữ cho mọi loại log xuống mức tối thiểu chấp nhận được",
          "Chuyển log cũ sang hệ thống lưu trữ lạnh có giá thấp hơn nhiều lần",
          "Giảm mức độ chi tiết của log bằng cách bỏ bớt các trường ít dùng tới"
        ],
        "correct": 0,
        "explanation": "Lựa chọn thứ ba cũng tốt và nó thường đi kèm một cái bẫy: dữ liệu lạnh có thể mất hàng giờ mới lấy ra được, nên nó vô dụng trong lúc đang xử lý sự cố. Lấy mẫu có chủ đích thì giữ nguyên phần đáng giá nhất."
      },
      {
        "question": "Vì sao phải kiểm tra được rằng log cũ thật sự lấy ra được?",
        "options": [
          "Vì một bản lưu trữ chưa từng được khôi phục thử là một giả định chưa được kiểm",
          "Vì hệ thống lưu trữ lạnh hoàn toàn có thể thay đổi định dạng dữ liệu theo đúng thời gian",
          "Vì chi phí lấy dữ liệu ra khỏi lưu trữ lạnh thường cao hơn dự kiến",
          "Vì cần biết thời gian lấy dữ liệu để lập kế hoạch cho các cuộc điều tra"
        ],
        "correct": 0,
        "explanation": "Đây là cùng bài học với bản sao lưu chưa từng được khôi phục thử. Ba lựa chọn kia đều là chi tiết vận hành đáng biết, nhưng chúng giả định rằng dữ liệu vẫn còn ở đó và vẫn đọc được."
      },
      {
        "question": "Loại log nào nên giữ lâu nhất?",
        "options": [
          "Log về ai truy cập cái gì và ai thay đổi cái gì, vì nó phục vụ điều tra về sau",
          "Log lỗi của ứng dụng vì chúng cho thấy tất cả các vấn đề lặp lại theo đúng thời gian",
          "Log về hiệu năng của cả hệ thống vì chúng cần để so sánh giữa tất cả các phiên bản",
          "Log của các công việc chạy theo đúng lịch vì chu kỳ của chúng hoàn toàn có thể tính bằng năm"
        ],
        "correct": 0,
        "explanation": "Log truy cập là loại duy nhất mà câu hỏi thường tới rất muộn và không lên lịch trước được - một cuộc điều tra nội bộ, một yêu cầu từ cơ quan quản lý, hoặc một sự cố bảo mật phát hiện chậm."
      }
    ],
    "keyTakeaways": [
      "Chia thời hạn theo LOẠI - một thời hạn chung sai theo cả hai chiều cùng lúc.",
      "Gỡ lỗi chi tiết giữ vài ngày; log truy cập và thay đổi giữ nhiều năm.",
      "Số liệu tổng hợp rẻ hơn hàng nghìn lần - giữ nó lâu, đó là cách nhìn xu hướng.",
      "Cắt bằng LẤY MẪU CÓ CHỦ ĐÍCH: giữ hết dòng lỗi, lấy mẫu dòng thành công.",
      "Lưu trữ lạnh có bẫy: mất hàng giờ mới lấy ra, nên vô dụng lúc đang có sự cố."
    ],
    "practicePrompt": {
      "question": "Hoá đơn log tăng gấp ba trong sáu tháng. Việc đầu tiên nên làm là gì?",
      "options": [
        "Xem dịch vụ nào và loại dòng nào chiếm phần lớn, vì nó thường tập trung ở vài chỗ",
        "Rút ngắn thời hạn lưu trữ chung xuống đúng một nửa để có thể đưa chi phí về mức cũ ngay",
        "Chuyển toàn bộ log cũ hơn ba mươi ngày sang hệ thống lưu trữ lạnh giá thấp",
        "Giảm mức độ chi tiết của log bằng cách nâng ngưỡng ghi lên một mức"
      ],
      "correct": 0,
      "explanation": "Phần tăng gần như luôn tập trung ở một dịch vụ mới hoặc một vòng lặp mới thêm, chứ không rải đều. Ba cách kia đều cắt trên toàn bộ, nên chúng trả giá ở mọi chỗ để chữa vấn đề nằm ở một chỗ."
    },
    "summary": {
      "keyIdea": "Giữ tất cả thì không trả nổi; giữ ít quá thì lúc cần lại không còn.",
      "formula": "Thời hạn theo loại + số liệu tổng hợp giữ lâu + lấy mẫu có chủ đích.",
      "commonMistake": "Cắt chi phí bằng cách rút ngắn thời hạn cho mọi loại log cùng lúc.",
      "action": "Xem log của bạn có mấy mức thời hạn - nếu chỉ một, đó là chỗ bắt đầu."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Xem cấu hình lưu trữ log của bạn có mấy mức thời hạn. Nếu chỉ có một mức chung, đó là chỗ tiết kiệm được nhiều nhất mà không mất gì.",
      "secondary": "Rồi thử lấy ra một dòng log từ ba tháng trước. Nếu không lấy được, thời hạn ghi trong cấu hình và thời hạn thật sự đang khác nhau."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chi phí log là khoản dễ vượt ngân sách nhất trong hạ tầng. Cách cắt sai sẽ xoá đúng phần dữ liệu mà cuộc điều tra sáu tháng sau cần tới."
      },
      {
        "type": "heading",
        "text": "Vì sao một thời hạn chung luôn sai"
      },
      {
        "type": "callout",
        "label": "Sai theo cả hai chiều cùng lúc",
        "text": "Ba mươi ngày là quá dài cho log gỡ lỗi chi tiết - không ai đọc chúng sau ba ngày - và quá ngắn cho log truy cập, thứ mà câu hỏi thường tới sau nhiều tháng. Bạn vừa trả thừa vừa mất thứ cần giữ."
      },
      {
        "type": "heading",
        "text": "Chia theo loại"
      },
      {
        "type": "list",
        "items": [
          "Gỡ lỗi chi tiết: vài ngày. Giá trị của nó rơi gần như thẳng đứng sau khi sự cố đóng.",
          "Log lỗi và cảnh báo: vài tuần tới vài tháng, đủ để thấy khuôn mẫu lặp lại.",
          "Log truy cập và thay đổi: nhiều năm. Câu hỏi tới muộn và không lên lịch trước được.",
          "Số liệu tổng hợp: giữ lâu nhất. Nó rẻ hơn log hàng nghìn lần."
        ]
      },
      {
        "type": "heading",
        "text": "Cắt chi phí mà không cắt vào xương"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Lấy mẫu có chủ đích",
          "text": "Giữ TOÀN BỘ dòng lỗi, chỉ lấy mẫu các dòng thành công. Phần đáng giá nhất còn nguyên, phần chiếm chỗ nhất giảm mạnh."
        },
        "right": {
          "label": "Lưu trữ lạnh",
          "text": "Rẻ hơn nhiều và có bẫy: dữ liệu có thể mất hàng giờ mới lấy ra được, nên nó vô dụng đúng lúc bạn đang xử lý sự cố."
        }
      },
      {
        "type": "paragraph",
        "text": "Và khi hoá đơn tăng, đừng cắt trên toàn bộ. Phần tăng gần như luôn tập trung ở một dịch vụ mới hoặc một vòng lặp mới thêm - chữa ở đó thì rẻ hơn và không ai mất gì."
      },
      {
        "type": "closing",
        "lines": [
          "Cuối cùng, kiểm rằng log cũ THẬT SỰ lấy ra được. Đây là cùng bài học với bản sao lưu chưa từng được khôi phục thử: một bản lưu trữ chưa ai đọc lại là một giả định chưa được kiểm.",
          "Bài sau là việc dùng chính những dữ liệu này để đối chiếu: tìm ra chỗ sai trước khi người khác tìm ra."
        ]
      }
    ]
  },
  {
    "id": 1724,
    "interactiveType": "sampling",
    "slug": "doi-chieu-va-tim-sai-sot-he-thong",
    "title": "Nhật ký, Bài 4: Đối chiếu - tìm ra chỗ sai trước khi người dùng tìm ra",
    "subtitle": "Hai nguồn số liệu độc lập lệch nhau là bằng chứng chắc chắn, kể cả khi chưa biết bên nào đúng.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "track": "professional",
    "emoji": "🔍",
    "whyItMatters": "Phần lớn lỗi dữ liệu không gây ra lỗi kỹ thuật nào - chúng chỉ tạo ra những con số hơi lệch, và chỉ đối chiếu mới thấy.",
    "openingQuestion": "Vì sao đối chiếu bắt được lỗi mà cảnh báo không bắt được?",
    "openingOptions": [
      "Vì nhiều lỗi dữ liệu không gây lỗi kỹ thuật nào, chúng chỉ làm con số hơi lệch",
      "Vì đối chiếu chạy trên toàn bộ dữ liệu còn cảnh báo chỉ dựa trên mẫu",
      "Vì cảnh báo có ngưỡng nên nó bỏ qua các sai lệch nhỏ dưới ngưỡng đó",
      "Vì đối chiếu chạy theo lịch nên nó có nhiều thời gian tính toán hơn"
    ],
    "correctOption": 0,
    "explanation": "Một sự kiện bị đếm hai lần, một bản ghi ghi thiếu một trường, một lượt chuyển đổi làm tròn sai chiều - không cái nào ném ra ngoại lệ, không cái nào làm tỷ lệ lỗi nhích lên, và không cảnh báo nào kêu. Chúng chỉ hiện ra khi bạn đếm cùng một thứ theo hai đường độc lập rồi so hai con số, và đó là lý do đối chiếu là lớp phòng vệ duy nhất với loại lỗi này.",
    "diagram": [
      {
        "label": "Đếm cùng một thứ theo HAI đường độc lập, rồi so",
        "arrow": true
      },
      {
        "label": "Lệch nhau là bằng chứng chắc chắn có gì sai",
        "arrow": true
      },
      {
        "label": "Kể cả khi chưa biết bên nào đúng",
        "arrow": true
      },
      {
        "label": "Chạy theo lịch, và cảnh báo khi lệch vượt ngưỡng"
      }
    ],
    "realWorldExample": {
      "company": "Đường thứ hai phải thật sự độc lập",
      "description": "Nếu cả hai con số đều lấy từ cùng một bảng qua cùng một truy vấn thì bạn không đối chiếu, bạn chỉ chạy một phép tính hai lần. Đường thứ hai phải đi qua nguồn khác, cách tính khác, hoặc ít nhất là một lát cắt dữ liệu khác."
    },
    "quiz": [
      {
        "question": "Điều gì làm cho một lượt đối chiếu thật sự có giá trị?",
        "options": [
          "Hai con số phải đi qua hai đường độc lập, không cùng nguồn và cùng cách tính",
          "Hai con số buộc phải được tính tại cùng đúng một thời điểm để tránh sai lệch thời gian",
          "Hai con số phải được tính trên toàn bộ dữ liệu chứ không trên một mẫu",
          "Hai con số phải do hai đội khác nhau chịu trách nhiệm tính toán và kiểm tra"
        ],
        "correct": 0,
        "explanation": "Cùng bảng, cùng truy vấn thì bạn không đối chiếu mà chỉ chạy một phép tính hai lần. Lựa chọn thứ hai là điều kiện kỹ thuật cần thiết nhưng nó không tạo ra tính độc lập."
      },
      {
        "question": "Vì sao lệch nhau là bằng chứng ngay cả khi chưa biết bên nào đúng?",
        "options": [
          "Vì hai đường tính đúng cùng một thứ thì phải ra cùng kết quả, nên lệch là có lỗi",
          "Vì con số lệch cho biết mức độ nghiêm trọng của vấn đề đang tồn tại",
          "Vì bên có con số nhỏ hơn thường là bên bị mất dữ liệu trên đường truyền",
          "Vì việc so sánh giúp thu hẹp phạm vi tìm kiếm xuống một trong hai đường"
        ],
        "correct": 0,
        "explanation": "Đây là điểm mạnh riêng của đối chiếu: nó cho kết luận chắc chắn về SỰ TỒN TẠI của lỗi mà không cần biết đáp án đúng. Lựa chọn cuối cũng đúng nhưng đó là lợi ích phụ."
      },
      {
        "question": "Vì sao một khoản lệch nhỏ và ổn định vẫn đáng điều tra?",
        "options": [
          "Vì nó thường là một lớp bản ghi có chung đặc điểm chứ không phải nhiễu ngẫu nhiên",
          "Vì khoản lệch nhỏ có thể lớn dần lên theo thời gian nếu không được xử lý",
          "Vì nó cho thấy một trong hai đường tính đang có sai sót về mặt logic",
          "Vì các quy định về chất lượng dữ liệu yêu cầu giải thích mọi khoản chênh lệch"
        ],
        "correct": 0,
        "explanation": "Nhiễu ngẫu nhiên thì đổi dấu và đổi độ lớn. Một khoản lệch ổn định ở 0,2% gần như luôn là một nhóm bản ghi cụ thể bị xử lý sai theo cùng một cách - và nhóm đó có thể lớn lên bất cứ lúc nào."
      },
      {
        "question": "Đối chiếu nên chạy theo lịch hay chạy khi có sự kiện?",
        "options": [
          "Theo lịch, vì thứ nó tìm bao gồm cả những sự kiện lẽ ra phải có mà không có",
          "Khi có sự kiện, vì như vậy phát hiện được sai lệch ngay lúc nó phát sinh",
          "Cả hai, vì mỗi cách bắt được một loại sai lệch khác nhau trong hệ thống",
          "Theo lịch nhưng với chính tần suất cao để rút ngắn thời gian phát hiện sai lệch"
        ],
        "correct": 0,
        "explanation": "Đây là cùng lý do mà công việc theo lịch không thay được bằng sự kiện: bạn không phát hiện được thứ bị thiếu bằng một cơ chế được kích hoạt bởi chính thứ đó."
      },
      {
        "question": "Nên làm gì đầu tiên khi đối chiếu báo lệch?",
        "options": [
          "Phân nhóm các bản ghi lệch để xem chúng có chung đặc điểm gì không",
          "Sửa dữ liệu cho hai bên khớp nhau rồi theo dõi xem có lệch lại không",
          "Kiểm tra lại logic của cả hai đường tính để tìm chỗ viết sai công thức",
          "So sánh với kết quả đối chiếu của những ngày trước để xem xu hướng"
        ],
        "correct": 0,
        "explanation": "Sửa dữ liệu trước khi hiểu nguyên nhân thì chúng lệch lại ngay chu kỳ sau. Phân nhóm thường trả lời luôn câu nguyên nhân - tất cả đều thuộc một loại tiền tệ, một múi giờ, hay một đường mã cụ thể."
      }
    ],
    "keyTakeaways": [
      "Nhiều lỗi dữ liệu không gây lỗi kỹ thuật nào - chúng chỉ làm con số hơi lệch.",
      "Đường thứ hai phải THẬT SỰ độc lập, nếu không bạn chỉ chạy một phép tính hai lần.",
      "Lệch nhau là bằng chứng chắc chắn, kể cả khi chưa biết bên nào đúng.",
      "Lệch nhỏ mà ỔN ĐỊNH gần như luôn là một nhóm bản ghi bị xử lý sai cùng một cách.",
      "Chạy theo LỊCH - bạn không tìm được thứ bị thiếu bằng cơ chế do chính nó kích hoạt."
    ],
    "practicePrompt": {
      "question": "Bạn muốn thêm một lượt đối chiếu. Chọn cặp số nào để bắt đầu?",
      "options": [
        "Số sự kiện hệ thống ghi nhận so với số bản ghi thật sự được tạo trong cơ sở dữ liệu",
        "Số dòng log ghi ra so với số dòng log mà hệ thống thu thập nhận được",
        "Số lượt truy cập trong báo cáo so với số lượt truy cập trên bảng theo dõi",
        "Số bản ghi hôm nay so với số bản ghi cùng ngày này của tuần trước"
      ],
      "correct": 0,
      "explanation": "Lựa chọn thứ hai là một phép đối chiếu tốt cho đường thu thập nhưng nó chỉ nói về hạ tầng log. Lựa chọn cuối không phải đối chiếu mà là so sánh xu hướng - hai con số ấy vốn được phép khác nhau."
    },
    "summary": {
      "keyIdea": "Hai nguồn độc lập lệch nhau là bằng chứng, kể cả khi chưa biết bên nào đúng.",
      "formula": "Đếm cùng một thứ theo hai đường độc lập → so → phân nhóm chỗ lệch.",
      "commonMistake": "Sửa cho khớp trước khi hiểu nguyên nhân, và nó lệch lại chu kỳ sau.",
      "action": "Thêm một lượt đối chiếu giữa số sự kiện và số bản ghi thật sự được tạo."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Chọn một luồng quan trọng và viết một lượt đối chiếu: đếm số sự kiện hệ thống ghi nhận, đếm số bản ghi thật sự được tạo, rồi so hai con số.",
      "secondary": "Chạy nó một lần bằng tay trước khi đặt vào lịch. Nếu hai con số đã lệch ngay lần đầu, bạn vừa tìm ra một thứ đã tồn tại từ lâu mà không cảnh báo nào thấy."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Phần lớn lỗi dữ liệu không gây ra lỗi kỹ thuật nào. Một sự kiện bị đếm hai lần, một bản ghi thiếu một trường, một lượt chuyển đổi làm tròn sai chiều - không cái nào ném ra ngoại lệ."
      },
      {
        "type": "heading",
        "text": "Cách duy nhất thấy chúng"
      },
      {
        "type": "callout",
        "label": "Đếm cùng một thứ theo hai đường",
        "text": "Rồi so hai con số. Lệch nhau là bằng chứng CHẮC CHẮN có gì đó sai - kể cả khi bạn chưa biết bên nào đúng. Đây là điểm mạnh riêng của đối chiếu: nó kết luận về sự tồn tại của lỗi mà không cần biết đáp án."
      },
      {
        "type": "paragraph",
        "text": "Điều kiện là đường thứ hai phải THẬT SỰ độc lập. Nếu cả hai con số đều lấy từ cùng một bảng qua cùng một truy vấn thì bạn không đối chiếu, bạn chỉ chạy một phép tính hai lần."
      },
      {
        "type": "heading",
        "text": "Đọc một khoản lệch"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Nhiễu ngẫu nhiên",
          "text": "Đổi dấu và đổi độ lớn giữa các chu kỳ. Thường là chuyện thời điểm chốt số liệu."
        },
        "right": {
          "label": "Lệch ỔN ĐỊNH",
          "text": "0,2% mỗi ngày, cùng chiều. Gần như luôn là một nhóm bản ghi cụ thể bị xử lý sai theo cùng một cách - và nhóm đó có thể lớn lên bất cứ lúc nào."
        }
      },
      {
        "type": "paragraph",
        "text": "Nên việc đầu tiên khi thấy lệch là PHÂN NHÓM các bản ghi lệch, không phải sửa cho khớp. Phân nhóm thường trả lời luôn câu nguyên nhân: tất cả đều thuộc một loại tiền tệ, một múi giờ, hay một đường mã cụ thể."
      },
      {
        "type": "closing",
        "lines": [
          "Và chạy đối chiếu theo LỊCH, không theo sự kiện. Thứ nó tìm bao gồm cả những sự kiện lẽ ra phải có mà không có, và bạn không phát hiện được thứ bị thiếu bằng một cơ chế do chính nó kích hoạt.",
          "Bài cuối chặng là chốt kỳ: khi nào một khoảng thời gian được coi là đã đóng."
        ]
      }
    ]
  },
  {
    "id": 1725,
    "interactiveType": "tail-risk",
    "slug": "chot-ky-so-lieu-va-du-lieu-den-muon",
    "title": "Nhật ký, Bài 5: Chốt kỳ số liệu - khi nào một khoảng thời gian được coi là xong",
    "subtitle": "Dữ liệu đến muộn làm con số của hôm qua đổi vào hôm nay, và không ai được báo.",
    "duration": "11 phút",
    "difficulty": "Khó",
    "track": "professional",
    "emoji": "🔒",
    "whyItMatters": "Một báo cáo gửi đi rồi mà con số bên dưới còn đổi được là một cách phá vỡ niềm tin rất khó sửa, vì lần sau không ai tin cả những con số đúng.",
    "openingQuestion": "Vì sao con số của ngày hôm qua có thể đổi vào hôm nay?",
    "openingOptions": [
      "Vì dữ liệu đến muộn - sự kiện xảy ra hôm qua nhưng tới hệ thống hôm nay",
      "Vì tất cả các truy vấn dựng báo cáo được cập nhật nên rốt cuộc cách tính đã thay đổi",
      "Vì hệ thống lưu trữ nén dữ liệu cũ nên rốt cuộc độ chính xác bị giảm đi đúng một chút",
      "Vì múi giờ của chính người xem khác múi giờ mà hệ thống dùng để có thể nhóm dữ liệu"
    ],
    "correctOption": 0,
    "explanation": "Một thiết bị mất mạng ba giờ rồi gửi bù, một hàng đợi bị tồn đọng qua đêm, một đối tác gửi dữ liệu theo lô mỗi sáng - cả ba đều tạo ra sự kiện mang dấu thời gian của hôm qua nhưng tới nơi hôm nay. Ba lựa chọn kia đều là nguyên nhân thật nhưng chúng hiếm hơn nhiều và đều có thể kiểm soát được.",
    "diagram": [
      {
        "label": "Thời điểm SỰ KIỆN XẢY RA khác thời điểm nó TỚI NƠI",
        "arrow": true
      },
      {
        "label": "Đo độ trễ đó, rồi đặt cửa sổ chốt dài hơn phần lớn nó",
        "arrow": true
      },
      {
        "label": "Trước khi chốt: con số TẠM. Sau khi chốt: con số CHÍNH THỨC",
        "arrow": true
      },
      {
        "label": "Đánh dấu rõ trên báo cáo cái nào là cái nào"
      }
    ],
    "realWorldExample": {
      "company": "Nhãn tạm và chính thức",
      "description": "Cách rẻ nhất để giữ niềm tin không phải là làm cho con số ngừng đổi - điều đó không làm được - mà là ghi rõ trên báo cáo rằng con số này còn tạm. Người đọc biết trước thì họ chấp nhận; người đọc bị bất ngờ thì họ ngừng tin cả những con số đã chốt."
    },
    "quiz": [
      {
        "question": "Cửa sổ chốt nên đặt dựa trên gì?",
        "options": [
          "Phân bố độ trễ thực tế giữa lúc sự kiện xảy ra và lúc nó tới hệ thống",
          "Thời điểm mà các báo cáo định kỳ cần được gửi cho các bên liên quan",
          "Chu kỳ chạy của các công việc xử lý dữ liệu theo lô trong hệ thống",
          "Yêu cầu về thời gian phản hồi của những người sử dụng báo cáo hằng ngày"
        ],
        "correct": 0,
        "explanation": "Đây là một con số đo được chứ không phải một lựa chọn tuỳ ý, và phần lớn đội chưa bao giờ đo nó. Ba lựa chọn kia là ràng buộc về lịch, và chúng quyết định bạn chịu được cửa sổ dài bao nhiêu chứ không quyết định cửa sổ cần dài bao nhiêu."
      },
      {
        "question": "Vì sao đánh dấu tạm và chính thức lại quan trọng?",
        "options": [
          "Vì người đọc bị bất ngờ sẽ ngừng tin cả những con số đã được chốt",
          "Vì các quy định về báo cáo yêu cầu ghi rõ trạng thái của dữ liệu được trình bày",
          "Vì nó giúp đội biết khi nào có thể xoá dữ liệu thô của khoảng thời gian đó",
          "Vì nó cho phép hệ thống tự động chặn việc sửa dữ liệu sau khi đã chốt"
        ],
        "correct": 0,
        "explanation": "Đây là chi phí thật và khó sửa nhất: mất niềm tin lan sang cả phần đang đúng. Cách rẻ nhất để giữ niềm tin không phải là làm cho con số ngừng đổi - điều đó không làm được - mà là báo trước rằng nó còn đổi."
      },
      {
        "question": "Nên làm gì với dữ liệu tới sau khi đã chốt?",
        "options": [
          "Ghi vào kỳ hiện tại kèm ghi chú, thay vì sửa lại con số của kỳ đã chốt",
          "Sửa lại con số của kỳ đã chốt để dữ liệu phản ánh đúng thực tế đã xảy ra",
          "Bỏ qua vì cửa sổ chốt đã được đặt đủ dài để bao phần lớn dữ liệu đến muộn",
          "Giữ riêng và cộng dồn lại để xử lý một lần vào cuối chu kỳ báo cáo lớn hơn"
        ],
        "correct": 0,
        "explanation": "Sửa lại kỳ đã chốt phá vỡ đúng thứ mà việc chốt sinh ra để bảo vệ. Bỏ qua thì mất dữ liệu thật. Ghi vào kỳ hiện tại kèm ghi chú giữ được cả hai: con số đã chốt bất biến, và không có gì bị mất."
      },
      {
        "question": "Vì sao nên đo phân bố độ trễ chứ không chỉ độ trễ trung bình?",
        "options": [
          "Vì trung bình che mất phần đuôi, mà chính phần đuôi quyết định cửa sổ chốt",
          "Vì độ trễ trung bình thay đổi theo tải nên nó hoàn toàn không ổn định giữa tất cả các ngày",
          "Vì cần biết độ trễ của từng nguồn dữ liệu để đặt cửa sổ riêng cho từng nguồn",
          "Vì phân bố cho biết có bao nhiêu dữ liệu bị mất hoàn toàn trên đường truyền"
        ],
        "correct": 0,
        "explanation": "Độ trễ trung bình hai phút không nói gì về việc mỗi tháng có một đợt gửi bù sau mười tám giờ. Cửa sổ chốt phải đủ dài cho phần lớn phần đuôi, không phải cho phần giữa."
      },
      {
        "question": "Điều gì nên ghi lại mỗi khi một kỳ được chốt?",
        "options": [
          "Con số đã chốt, thời điểm chốt, và phiên bản logic tính toán đã dùng",
          "Danh sách những người đã phê duyệt việc chốt kỳ đó và thời gian phê duyệt",
          "Toàn bộ phần dữ liệu thô của kỳ đó để có thể tính lại khi cần đối chiếu",
          "Khoảng chênh lệch giữa con số tạm cuối cùng và con số chính thức đã chốt"
        ],
        "correct": 0,
        "explanation": "Phiên bản logic tính toán là phần hay bị quên và là phần quan trọng nhất khi có tranh cãi sáu tháng sau: nếu công thức đã đổi từ đó, tính lại sẽ ra con số khác và không ai giải thích được vì sao."
      }
    ],
    "keyTakeaways": [
      "Thời điểm sự kiện XẢY RA khác thời điểm nó TỚI NƠI - đó là gốc của mọi chuyện.",
      "Cửa sổ chốt đặt theo PHÂN BỐ độ trễ thật, không theo trung bình và không tuỳ ý.",
      "Đánh dấu rõ con số TẠM và con số CHÍNH THỨC - bất ngờ làm mất cả niềm tin đúng.",
      "Dữ liệu tới sau khi chốt thì ghi vào kỳ hiện tại kèm ghi chú, đừng sửa kỳ đã chốt.",
      "Ghi lại PHIÊN BẢN logic tính toán - không có nó thì tính lại sẽ ra số khác."
    ],
    "practicePrompt": {
      "question": "Báo cáo hôm qua gửi lúc 8 giờ sáng, con số đổi lúc 11 giờ. Chữa thế nào?",
      "options": [
        "Đo độ trễ thật, dời giờ gửi ra sau cửa sổ chốt, và đánh dấu tạm nếu vẫn phải gửi sớm",
        "Khoá con số lại tại thời điểm gửi để có thể nó không thay đổi sau mỗi khi báo cáo đã đi",
        "Gửi lại báo cáo cập nhật mỗi khi con số thay đổi để mọi người có số mới nhất",
        "Chuyển sang gửi báo cáo theo tuần để có đủ thời gian cho dữ liệu đến muộn"
      ],
      "correct": 0,
      "explanation": "Khoá con số tại thời điểm gửi thì báo cáo và hệ thống lệch nhau vĩnh viễn, và câu hỏi vì sao hai chỗ khác nhau còn khó trả lời hơn. Gửi lại nhiều lần thì mỗi lần lại nhắc người đọc rằng con số không đáng tin."
    },
    "summary": {
      "keyIdea": "Dữ liệu đến muộn làm con số của hôm qua đổi vào hôm nay.",
      "formula": "Đo phân bố độ trễ → đặt cửa sổ chốt → đánh dấu tạm và chính thức.",
      "commonMistake": "Sửa lại kỳ đã chốt, phá vỡ đúng thứ mà việc chốt sinh ra để bảo vệ.",
      "action": "Đo khoảng cách giữa thời điểm sự kiện xảy ra và thời điểm nó tới hệ thống."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Đo khoảng cách giữa dấu thời gian của sự kiện và thời điểm nó thật sự tới hệ thống. Nhìn cả phân bố, không chỉ trung bình.",
      "secondary": "Phần đuôi của phân bố đó là con số quyết định cửa sổ chốt của bạn, và phần lớn đội chưa bao giờ nhìn nó."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một báo cáo gửi đi rồi mà con số bên dưới còn đổi được là cách phá vỡ niềm tin rất khó sửa, vì lần sau không ai tin cả những con số đúng."
      },
      {
        "type": "heading",
        "text": "Vì sao con số đổi"
      },
      {
        "type": "callout",
        "label": "Xảy ra và tới nơi là hai thời điểm",
        "text": "Một thiết bị mất mạng ba giờ rồi gửi bù. Một hàng đợi bị tồn đọng qua đêm. Một đối tác gửi dữ liệu theo lô mỗi sáng. Cả ba đều tạo ra sự kiện mang dấu thời gian của hôm qua nhưng tới nơi hôm nay."
      },
      {
        "type": "heading",
        "text": "Cửa sổ chốt"
      },
      {
        "type": "paragraph",
        "text": "Đo PHÂN BỐ độ trễ giữa hai thời điểm đó, rồi đặt cửa sổ chốt dài hơn phần lớn phần đuôi. Trung bình hai phút không nói gì về việc mỗi tháng có một đợt gửi bù sau mười tám giờ - và chính đợt đó là thứ làm con số đổi."
      },
      {
        "type": "heading",
        "text": "Hai nhãn"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Trước khi chốt",
          "text": "Con số TẠM. Ghi rõ trên báo cáo. Người đọc biết trước thì họ chấp nhận nó đổi."
        },
        "right": {
          "label": "Sau khi chốt",
          "text": "Con số CHÍNH THỨC. Bất biến. Dữ liệu tới sau đó ghi vào kỳ hiện tại kèm ghi chú."
        }
      },
      {
        "type": "paragraph",
        "text": "Cám dỗ lớn nhất là sửa lại kỳ đã chốt cho nó đúng với thực tế. Đừng - việc đó phá vỡ đúng thứ mà chốt kỳ sinh ra để bảo vệ, và nó biến mọi con số lịch sử thành thứ có thể đổi."
      },
      {
        "type": "closing",
        "lines": [
          "Mỗi lần chốt, ghi lại ba thứ: con số, thời điểm chốt, và PHIÊN BẢN logic tính toán đã dùng.",
          "Cái thứ ba hay bị quên và là cái quan trọng nhất khi có tranh cãi sáu tháng sau: nếu công thức đã đổi từ đó, tính lại sẽ ra con số khác và không ai giải thích được vì sao."
        ]
      }
    ]
  },
];
