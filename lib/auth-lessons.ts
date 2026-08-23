import type { Lesson } from "./lesson-types";

// Chặng "Xác thực, phân quyền và tuân thủ" (ids 1401-1402, professional).
//
// Gần như mọi lỗ hổng xác thực nghiêm trọng đều không nằm ở thuật toán mà ở
// vòng đời của thứ được cấp sau khi đăng nhập thành công - và ở lượng quyền
// thừa mà một tài khoản tích tụ được qua nhiều năm.

export const AUTH_LESSONS: Lesson[] = [
  {
    "id": 1401,
    "slug": "doc-mot-he-thong-xac-thuc",
    "title": "Xác thực, Bài 1: Đọc một hệ thống xác thực - phiên, thẻ và nơi giữ chúng",
    "subtitle": "Xác thực trả lời bạn là ai; chỗ hay sai không nằm ở phép kiểm mà ở nơi kết quả được cất.",
    "duration": "12 phút",
    "difficulty": "Khó",
    "track": "professional",
    "emoji": "🏦",
    "whyItMatters": "Gần như mọi lỗ hổng xác thực nghiêm trọng đều không nằm ở thuật toán mà ở vòng đời của thứ được cấp sau khi đăng nhập thành công.",
    "openingQuestion": "Sau khi người dùng đăng nhập đúng, hệ thống cấp cho họ cái gì?",
    "openingOptions": [
      "Một bằng chứng có hạn để lần sau không phải nhập mật khẩu lại",
      "Một bản ghi trong cơ sở dữ liệu đánh dấu rằng tài khoản này đang hoạt động",
      "Một khoá mã hoá riêng dùng để bảo vệ dữ liệu của người dùng đó",
      "Một quyền truy cập vào các tài nguyên mà vai trò của họ cho phép"
    ],
    "correctOption": 0,
    "explanation": "Hai chữ CÓ HẠN là phần quan trọng nhất và cũng là phần hay bị làm sai nhất. Lựa chọn cuối mô tả phân quyền - một câu hỏi khác, và trộn hai câu hỏi này vào một thứ là nguồn của nhiều lỗi. Xác thực trả lời bạn là ai; phân quyền trả lời bạn được làm gì.",
    "diagram": [
      {
        "label": "Đăng nhập đúng → cấp một bằng chứng CÓ HẠN",
        "arrow": true
      },
      {
        "label": "Ba câu hỏi: giữ ở đâu, sống bao lâu, thu hồi thế nào",
        "arrow": true
      },
      {
        "label": "Thẻ tự chứa thì nhanh nhưng THU HỒI rất khó",
        "arrow": true
      },
      {
        "label": "Phiên tra cứu thì thu hồi ngay nhưng mỗi yêu cầu một lượt tra"
      }
    ],
    "realWorldExample": {
      "company": "Đánh đổi mà mọi hệ thống đều phải chọn",
      "description": "Thẻ tự chứa kiểm tra được bằng chữ ký mà không cần hỏi ai, nên nó nhanh và mở rộng tốt. Cái giá là bạn không thu hồi được nó trước khi hết hạn - máy chủ không có cách nào biết thẻ này đã bị vô hiệu."
    },
    "quiz": [
      {
        "question": "Vì sao thẻ tự chứa khó thu hồi?",
        "options": [
          "Vì máy chủ kiểm tra bằng chữ ký mà không hỏi ai, nên không biết thẻ đã bị vô hiệu",
          "Vì thẻ được lưu ở phía người dùng nên máy chủ không xoá được nó",
          "Vì việc thu hồi đòi hỏi đổi khoá ký, và điều đó làm mọi tấm thẻ khác cũng hỏng theo",
          "Vì thẻ không chứa mã định danh nên không xác định được thẻ nào cần thu hồi"
        ],
        "correct": 0,
        "explanation": "Lựa chọn thứ hai mô tả đúng chỗ lưu nhưng không phải nguyên nhân - phiên tra cứu cũng lưu ở phía người dùng và vẫn thu hồi được. Nguyên nhân là phép kiểm không đi qua chỗ nào có thể nói không nữa."
      },
      {
        "question": "Vì sao thời gian sống của thẻ là một đánh đổi chứ không phải một lựa chọn tối ưu?",
        "options": [
          "Vì ngắn thì cửa sổ bị lạm dụng hẹp nhưng phải làm mới thường xuyên hơn",
          "Vì thẻ ngắn hạn tốn nhiều tài nguyên hơn để có thể tạo và kiểm tra chữ ký",
          "Vì các trình duyệt giới hạn thời gian lưu trữ nên thẻ dài hạn không giữ được",
          "Vì khoảng thời gian sống dài hơn hẳn làm tăng kích thước của tấm thẻ được truyền đi"
        ],
        "correct": 0,
        "explanation": "Đây là lý do gần như mọi hệ thống dùng cặp thẻ ngắn hạn cộng thẻ làm mới dài hạn: thẻ truy cập hết hạn nhanh nên cửa sổ hẹp, còn thẻ làm mới thì tra cứu được nên thu hồi được."
      },
      {
        "question": "Vì sao trộn xác thực với phân quyền vào một thứ là nguồn lỗi?",
        "options": [
          "Vì quyền thay đổi thường xuyên hơn danh tính, nên thẻ mang quyền sẽ nhanh lỗi thời",
          "Vì hai chức năng này thường do hai hệ thống khác nhau chịu trách nhiệm quản lý",
          "Vì việc gộp làm tăng kích thước thẻ và làm chậm quá trình kiểm tra",
          "Vì các tiêu chuẩn bảo mật yêu cầu tách riêng hai chức năng này ra"
        ],
        "correct": 0,
        "explanation": "Một người bị thu hồi quyền quản trị lúc mười giờ vẫn dùng được quyền đó tới khi thẻ hết hạn, vì quyền đã được đóng gói vào thẻ từ lúc tám giờ. Danh tính thì hiếm khi đổi, còn quyền thì đổi hằng ngày."
      },
      {
        "question": "Chỗ lưu thẻ ở phía trình duyệt nên là gì?",
        "options": [
          "Cookie có cờ chặn truy cập từ mã kịch bản, để mã độc trên trang không đọc được",
          "Bộ nhớ cục bộ của trình duyệt vì nó bền và tồn tại được qua tất cả các phiên làm việc",
          "Biến trong bộ nhớ của ứng dụng vì nó biến mất khi người dùng đóng tab",
          "Bộ nhớ phiên của trình duyệt vì nó tự xoá khi tab được đóng lại"
        ],
        "correct": 0,
        "explanation": "Bộ nhớ cục bộ đọc được bằng mã kịch bản, nên một lỗ hổng chèn mã trên bất kỳ trang nào cũng lấy được thẻ. Lựa chọn thứ ba an toàn trước chuyện đó nhưng nó buộc đăng nhập lại mỗi lần tải trang."
      },
      {
        "question": "Điều gì cần kiểm khi rà soát một hệ thống xác thực?",
        "options": [
          "Đường thu hồi có thật sự chạy không, chứ không chỉ có tồn tại trong mã",
          "Thuật toán băm mật khẩu có thuộc nhóm được khuyến nghị hiện nay không",
          "Chính sách độ phức tạp của mật khẩu có đủ chặt cho người dùng không",
          "Số lần đăng nhập sai liên tiếp trước khi tài khoản bị khoá tạm thời"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều đáng kiểm và đều là những thứ thư viện lo giúp. Đường thu hồi thì hầu như không bao giờ được thử: nó chỉ chạy khi có sự cố, và lúc đó mới phát hiện nó không hoạt động là quá muộn."
      }
    ],
    "keyTakeaways": [
      "Xác thực trả lời BẠN LÀ AI; phân quyền trả lời BẠN ĐƯỢC LÀM GÌ. Đừng gộp.",
      "Ba câu hỏi về thứ được cấp: giữ ở đâu, sống bao lâu, thu hồi thế nào.",
      "Thẻ tự chứa nhanh vì không hỏi ai, và không thu hồi được vì cùng lý do đó.",
      "Quyền đổi hằng ngày còn danh tính thì hiếm khi - nên đừng đóng quyền vào thẻ.",
      "Rà soát thì kiểm ĐƯỜNG THU HỒI có chạy thật không, đó là thứ không ai thử."
    ],
    "practicePrompt": {
      "question": "Một tài khoản bị lộ. Bạn khoá nó lúc 10 giờ. Người tấn công mất quyền lúc nào?",
      "options": [
        "Tuỳ cơ chế - với thẻ tự chứa thì tới khi thẻ hết hạn, có thể là nhiều giờ sau",
        "Ngay lập tức, vì tài khoản đã bị khoá nên mọi yêu cầu tiếp theo sẽ bị từ chối",
        "Sau lần làm mới thẻ tiếp theo, thường là trong vòng vài phút kể từ lúc khoá",
        "Khi phiên hiện tại của họ kết thúc do không có hoạt động trong một khoảng thời gian"
      ],
      "correct": 0,
      "explanation": "Đây là câu hỏi mà phần lớn đội chưa bao giờ trả lời cho hệ thống của chính mình, và câu trả lời quyết định thời gian thật giữa lúc phát hiện và lúc chặn được. Lựa chọn thứ ba đúng với thẻ làm mới nhưng không đúng với thẻ truy cập đang còn hạn."
    },
    "summary": {
      "keyIdea": "Chỗ hay sai không nằm ở phép kiểm mà ở vòng đời của thứ được cấp.",
      "formula": "Giữ ở đâu + sống bao lâu + thu hồi thế nào = ba câu hỏi phải trả lời được.",
      "commonMistake": "Đóng gói quyền vào thẻ, nên thu hồi quyền không có hiệu lực ngay.",
      "action": "Trả lời cho hệ thống của bạn: khoá tài khoản lúc 10 giờ thì mất quyền lúc nào."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Trả lời một câu cho hệ thống của bạn: nếu khoá một tài khoản ngay bây giờ, người đang giữ thẻ của tài khoản đó mất quyền vào lúc nào?",
      "secondary": "Con số đó là thời gian thật giữa lúc bạn phát hiện và lúc bạn chặn được. Phần lớn đội chưa bao giờ tính nó, và nó thường dài hơn họ nghĩ."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Gần như mọi lỗ hổng xác thực nghiêm trọng đều không nằm ở thuật toán mà ở VÒNG ĐỜI của thứ được cấp sau khi đăng nhập thành công."
      },
      {
        "type": "heading",
        "text": "Hai câu hỏi khác nhau"
      },
      {
        "type": "callout",
        "label": "Bạn là ai, và bạn được làm gì",
        "text": "Xác thực trả lời câu đầu, phân quyền trả lời câu sau. Trộn chúng vào một thứ - đóng gói quyền vào thẻ - thì một người bị thu hồi quyền quản trị lúc mười giờ vẫn dùng được quyền đó tới khi thẻ hết hạn."
      },
      {
        "type": "heading",
        "text": "Ba câu hỏi về thứ được cấp"
      },
      {
        "type": "list",
        "items": [
          "GIỮ Ở ĐÂU: cookie có cờ chặn truy cập từ mã kịch bản là mặc định đúng. Bộ nhớ cục bộ đọc được bằng mã kịch bản, nên một lỗ hổng chèn mã ở bất kỳ trang nào cũng lấy được thẻ.",
          "SỐNG BAO LÂU: ngắn thì cửa sổ bị lạm dụng hẹp nhưng phải làm mới thường xuyên hơn.",
          "THU HỒI THẾ NÀO: đây là câu ít được trả lời nhất."
        ]
      },
      {
        "type": "heading",
        "text": "Đánh đổi mà mọi hệ thống đều phải chọn"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Thẻ tự chứa",
          "text": "Kiểm bằng chữ ký, không hỏi ai. Nhanh và mở rộng tốt. Và không thu hồi được trước khi hết hạn - vì phép kiểm không đi qua chỗ nào có thể nói không nữa."
        },
        "right": {
          "label": "Phiên tra cứu",
          "text": "Mỗi yêu cầu một lượt tra. Chậm hơn và thu hồi được ngay lập tức."
        }
      },
      {
        "type": "paragraph",
        "text": "Cách dung hoà phổ biến là cặp thẻ: thẻ truy cập ngắn hạn tự chứa, cộng thẻ làm mới dài hạn có tra cứu. Cửa sổ lạm dụng hẹp lại còn bằng thời gian sống của thẻ truy cập, và bạn vẫn thu hồi được ở lớp làm mới."
      },
      {
        "type": "closing",
        "lines": [
          "Khi rà soát, thứ đáng kiểm nhất không phải thuật toán băm mật khẩu - thư viện lo giúp bạn rồi. Thứ đáng kiểm là ĐƯỜNG THU HỒI có thật sự chạy không.",
          "Nó chỉ chạy khi có sự cố, nên nó hầu như không bao giờ được thử - và phát hiện nó hỏng vào lúc đang cần dùng thì đã quá muộn."
        ]
      }
    ]
  },
  {
    "id": 1402,
    "slug": "ra-soat-phan-quyen-vai-tro-va-han-muc",
    "title": "Xác thực, Bài 2: Rà soát phân quyền - từ vai trò tới quyền cụ thể",
    "subtitle": "Quyền chỉ tăng lên nếu không ai chủ động lấy bớt đi, và không ai chủ động cả.",
    "duration": "12 phút",
    "difficulty": "Khó",
    "track": "professional",
    "emoji": "⚖️",
    "whyItMatters": "Trong phần lớn tổ chức, thứ quyết định thiệt hại của một tài khoản bị chiếm không phải là hàng rào bên ngoài mà là tài khoản đó có bao nhiêu quyền thừa.",
    "openingQuestion": "Vì sao quyền của một nhân viên lâu năm thường rộng hơn nhiều so với việc họ làm?",
    "openingOptions": [
      "Vì mỗi lần đổi việc họ được cấp thêm quyền mới mà quyền cũ không ai lấy lại",
      "Vì người làm lâu năm cần quyền rộng hơn để xử lý các tình huống bất thường",
      "Vì các vai trò được thiết kế rộng để giảm bớt số lần phải xin cấp quyền bổ sung",
      "Vì hệ thống phân quyền thường không hỗ trợ cấp quyền ở mức đủ chi tiết"
    ],
    "correctOption": 0,
    "explanation": "Đây là hiện tượng quyền tích tụ, và nó là kết quả của một bất đối xứng đơn giản: cấp thêm quyền có người yêu cầu và có việc bị chặn nếu không làm, còn lấy bớt quyền thì không ai yêu cầu và chỉ có rủi ro làm hỏng việc của người khác. Ba lựa chọn kia đều góp phần nhưng chúng là lý do phụ.",
    "diagram": [
      {
        "label": "Cấp thêm có người yêu cầu; lấy bớt thì không ai",
        "arrow": true
      },
      {
        "label": "Nên quyền chỉ tăng, trừ khi có cơ chế chủ động",
        "arrow": true
      },
      {
        "label": "Rà soát dựa trên quyền THẬT SỰ DÙNG, không dựa trên khai báo",
        "arrow": true
      },
      {
        "label": "Và tách vai trò khỏi quyền - vai trò đổi, quyền thì không"
      }
    ],
    "realWorldExample": {
      "company": "Rà soát bằng dữ liệu sử dụng",
      "description": "Một lượt rà soát hỏi người quản lý còn cần quyền này không sẽ luôn nhận được câu có, vì trả lời có thì không mất gì còn trả lời không thì có thể chặn việc. Một lượt rà soát bắt đầu từ danh sách quyền chưa dùng trong chín mươi ngày thì đổi hẳn cuộc trò chuyện."
    },
    "quiz": [
      {
        "question": "Vì sao rà soát bằng cách hỏi người quản lý ít hiệu quả?",
        "options": [
          "Vì trả lời còn cần thì không mất gì, còn trả lời không cần thì có thể chặn việc",
          "Vì người quản lý thường không nắm được chi tiết công việc hằng ngày của nhân viên",
          "Vì số lượng quyền cần rà soát quá lớn nên rốt cuộc cũng hoàn toàn không ai xem kỹ được từng cái",
          "Vì tất cả các đợt rà soát diễn ra quá thưa nên rốt cuộc thông tin đã lỗi thời khi được xem"
        ],
        "correct": 0,
        "explanation": "Đây là bất đối xứng động cơ, không phải thiếu thông tin hay thiếu thời gian. Bắt đầu từ danh sách quyền CHƯA DÙNG trong chín mươi ngày thì đổi hẳn cuộc trò chuyện: bây giờ người phải đưa lý do là người muốn giữ."
      },
      {
        "question": "Vì sao nên tách vai trò khỏi quyền cụ thể?",
        "options": [
          "Vì người đổi vai trò thì đổi một dòng, thay vì phải rà lại hàng chục quyền lẻ",
          "Vì vai trò dễ hiểu hơn với người quản lý khi họ phê duyệt yêu cầu cấp quyền",
          "Vì cả hệ thống chỉ hỗ trợ kiểm tra quyền truy cập ở mức vai trò chứ không ở mức chi tiết",
          "Vì số lượng vai trò ít hơn nhiều so với số lượng quyền nên dễ quản lý hơn"
        ],
        "correct": 0,
        "explanation": "Cấp quyền lẻ cho từng người là cách chắc chắn dẫn tới quyền tích tụ, vì khi họ đổi việc không ai biết đủ để rà lại. Vai trò làm cho việc lấy bớt trở thành một thao tác thay vì một cuộc điều tra."
      },
      {
        "question": "Vì sao quyền thừa quyết định thiệt hại khi tài khoản bị chiếm?",
        "options": [
          "Vì người tấn công dùng được đúng những gì tài khoản đó dùng được, không hơn",
          "Vì các hệ thống giám sát khó phát hiện hành vi bất thường khi quyền quá rộng",
          "Vì tài khoản có nhiều quyền thường thuộc về người có vị trí cao trong tổ chức",
          "Vì quyền thừa cho phép người tấn công tự cấp thêm quyền cho tài khoản khác"
        ],
        "correct": 0,
        "explanation": "Đây là lý do giới hạn quyền là lớp phòng vệ hiệu quả nhất mà cũng ít được đầu tư nhất: nó không ngăn được việc bị chiếm tài khoản, nó chỉ quyết định chuyện gì xảy ra sau đó."
      },
      {
        "question": "Quyền tạm thời nên được cấp thế nào?",
        "options": [
          "Kèm thời hạn tự hết, vì quyền tạm không có thời hạn sẽ thành quyền vĩnh viễn",
          "Kèm yêu cầu phê duyệt của hai người để tránh việc cấp quyền quá dễ dàng",
          "Kèm ghi chú về lý do cấp để lần rà soát sau biết được có nên rốt cuộc giữ lại hay không",
          "Kèm giới hạn về phạm vi tài nguyên mà quyền đó được phép tác động tới"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều tốt và đều dựa vào việc có người nhớ quay lại. Thời hạn tự hết thì không cần ai nhớ - đó là khác biệt giữa một cơ chế và một ý định tốt."
      },
      {
        "question": "Điều gì nên kiểm khi rà soát một hệ thống phân quyền?",
        "options": [
          "Phép kiểm quyền chạy ở phía máy chủ hay chỉ ẩn nút bấm ở phía giao diện",
          "Số lượng vai trò có quá nhiều so với số lượng chức năng thực tế hay không",
          "Các quyền có được đặt tên rõ ràng và nhất quán giữa các phần của hệ thống không",
          "Nhật ký cấp và thu hồi quyền có được lưu đầy đủ để tra cứu về sau hay không"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều đáng kiểm và đều là chuyện chất lượng quản lý. Cái này là lỗ hổng thật: ẩn nút bấm chặn được người dùng bình thường và không chặn được ai gọi thẳng vào giao diện lập trình."
      }
    ],
    "keyTakeaways": [
      "Cấp thêm có người yêu cầu; lấy bớt thì không ai - nên quyền chỉ tăng.",
      "Rà soát dựa trên quyền THẬT SỰ DÙNG, không dựa trên câu hỏi còn cần không.",
      "Tách vai trò khỏi quyền lẻ - đổi việc thì đổi một dòng, không phải một cuộc điều tra.",
      "Quyền tạm phải có THỜI HẠN TỰ HẾT, nếu không nó thành quyền vĩnh viễn.",
      "Kiểm phép kiểm quyền chạy ở PHÍA MÁY CHỦ - ẩn nút bấm không chặn được ai."
    ],
    "practicePrompt": {
      "question": "Bạn muốn bắt đầu giảm quyền thừa. Bước đầu tiên cho kết quả nhanh nhất là gì?",
      "options": [
        "Lấy danh sách quyền chưa được dùng lần nào trong chín mươi ngày qua",
        "Rà soát lại toàn bộ định nghĩa vai trò để thu hẹp phạm vi của từng vai trò",
        "Gửi bảng hỏi cho các quản lý để xác nhận quyền nào còn cần thiết cho đội họ",
        "Thiết lập quy trình phê duyệt chặt hơn cho các yêu cầu cấp quyền mới"
      ],
      "correct": 0,
      "explanation": "Hai việc sau là cải thiện cho DÒNG CHẢY mới và không dọn được phần đã tích tụ. Danh sách quyền chưa dùng thì vừa có ngay từ dữ liệu sẵn có, vừa đảo ngược gánh nặng chứng minh sang phía người muốn giữ."
    },
    "summary": {
      "keyIdea": "Quyền chỉ tăng lên nếu không ai chủ động lấy bớt đi, và không ai chủ động cả.",
      "formula": "Vai trò thay quyền lẻ + quyền tạm có hạn tự hết + rà soát theo dữ liệu sử dụng.",
      "commonMistake": "Rà soát bằng cách hỏi còn cần không, câu mà trả lời có thì không mất gì.",
      "action": "Lấy danh sách quyền chưa được dùng lần nào trong chín mươi ngày qua."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Lấy danh sách các quyền chưa được dùng lần nào trong chín mươi ngày qua. Phần lớn hệ thống đã ghi đủ dữ liệu cho việc này mà chưa ai hỏi.",
      "secondary": "Danh sách đó đảo ngược gánh nặng chứng minh: thay vì bạn phải chứng minh quyền này không cần, người muốn giữ phải nói vì sao vẫn cần."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Trong phần lớn tổ chức, thứ quyết định thiệt hại của một tài khoản bị chiếm không phải hàng rào bên ngoài mà là tài khoản đó có bao nhiêu QUYỀN THỪA."
      },
      {
        "type": "heading",
        "text": "Vì sao quyền chỉ tăng"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Cấp thêm",
          "text": "Có người yêu cầu, có việc bị chặn nếu không làm, và có người cảm ơn khi làm xong."
        },
        "right": {
          "label": "Lấy bớt",
          "text": "Không ai yêu cầu, không ai cảm ơn, và có rủi ro làm hỏng việc của người khác."
        }
      },
      {
        "type": "paragraph",
        "text": "Đây là bất đối xứng động cơ chứ không phải thiếu thông tin, nên nó không sửa được bằng cách viết thêm quy định. Nó chỉ sửa được bằng một cơ chế chạy mà không cần ai chủ động."
      },
      {
        "type": "heading",
        "text": "Rà soát bằng dữ liệu, không bằng câu hỏi"
      },
      {
        "type": "callout",
        "label": "Đảo ngược gánh nặng chứng minh",
        "text": "Hỏi người quản lý còn cần quyền này không thì luôn nhận được câu có - trả lời có thì không mất gì. Bắt đầu từ danh sách quyền CHƯA DÙNG trong chín mươi ngày thì bây giờ người phải đưa lý do là người muốn giữ."
      },
      {
        "type": "heading",
        "text": "Hai quyết định thiết kế"
      },
      {
        "type": "list",
        "items": [
          "Tách VAI TRÒ khỏi quyền lẻ. Người đổi việc thì đổi một dòng, thay vì phải rà lại hàng chục quyền mà không ai biết đủ để rà.",
          "Quyền tạm phải có THỜI HẠN TỰ HẾT. Ghi chú lý do và quy trình phê duyệt đều dựa vào việc có người nhớ quay lại; thời hạn tự hết thì không cần ai nhớ."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Và khi rà soát, thứ đáng kiểm nhất là phép kiểm quyền chạy Ở PHÍA MÁY CHỦ hay chỉ ẩn nút bấm ở giao diện. Ẩn nút chặn được người dùng bình thường và không chặn được ai gọi thẳng vào giao diện lập trình.",
          "Giới hạn quyền không ngăn được việc bị chiếm tài khoản. Nó quyết định chuyện gì xảy ra sau đó, và đó là lý do nó là lớp phòng vệ đáng đầu tư nhất."
        ]
      }
    ]
  },
];
