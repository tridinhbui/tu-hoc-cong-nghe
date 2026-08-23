import type { Lesson } from "./lesson-types";

// Ba lỗ hổng của chặng "Đọc 3 báo cáo tài chính" (bài 41-60), tìm ra bằng cách
// đếm chứ không bằng cách đọc lướt:
//
// 1. THUYẾT MINH. 43 bài trong kho có nhắc tới thuyết minh, nhưng không bài nào
//    dạy cách đọc nó - trong khi đó mới là nơi chứa chính sách kế toán, nợ ngoài
//    bảng, giao dịch bên liên quan và thuế hoãn lại. Người học xong chặng biết
//    đọc ba bảng số và không biết phần chữ dài gấp ba đó dùng để làm gì.
// 2. PHÂN TÍCH THEO TỶ TRỌNG. Không bài nào có "common-size" hay "tỷ trọng"
//    trong tiêu đề. Bài 80 dạy dùng tỷ số để so sánh doanh nghiệp, nhưng bước
//    chuẩn hoá báo cáo về cùng một mẫu số - việc phải làm TRƯỚC khi so - thì
//    không có ở đâu.
// 3. Ý KIẾN KIỂM TOÁN. Có tám bài nhắc tới nó trong tiêu đề, tất cả đều nằm ở
//    chuyên đề kiểm toán (1531-1535). Người đi theo lộ trình ngày-qua-ngày của
//    chặng 26-60 không gặp khái niệm "ý kiến ngoại trừ" ở bất kỳ đâu, dù nó là
//    dòng đầu tiên đáng đọc của một bộ báo cáo.
//
// Đặt ở file riêng thay vì nhét vào lib/lessons.ts: file kia đang là 60 nghìn
// dòng và có phiên khác làm việc trên đó cùng lúc.

export const READING_STATEMENTS_LESSONS: Lesson[] = [
  {
    "id": 1690,
    "slug": "doc-chu-thich-va-tai-lieu-trong-ma",
    "title": "Đọc chú thích trong mã - phần dài nhất và ít người đọc nhất",
    "subtitle": "Mã nói hệ thống làm gì; chú thích là nơi duy nhất nói vì sao nó làm thế.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "track": "professional",
    "emoji": "📑",
    "whyItMatters": "Phần lớn thời gian đọc một kho mã lạ bị tiêu vào việc dựng lại những quyết định mà người trước đã cân nhắc xong và không ghi lại.",
    "openingQuestion": "Chú thích nào đáng giá nhất khi đọc một kho mã lạ?",
    "openingOptions": [
      "Chú thích giải thích vì sao chọn cách này thay vì cách hiển nhiên hơn",
      "Chú thích mô tả tham số đầu vào và giá trị trả về của từng hàm công khai",
      "Chú thích tóm tắt luồng xử lý chính của từng thành phần trong hệ thống",
      "Chú thích ghi lại lịch sử thay đổi và người chịu trách nhiệm cho mỗi phần"
    ],
    "correctOption": 0,
    "explanation": "Ba loại kia đều đọc được từ chính mã và từ lịch sử kho mã, tuy tốn công. Lý do chọn một cách thay vì cách hiển nhiên hơn thì không suy ra được từ đâu - và nó là thứ ngăn người đọc dọn dẹp đúng chỗ đã được cân nhắc kỹ, rồi khôi phục lại đúng lỗi mà người trước đã trả giá để tránh.",
    "diagram": [
      {
        "label": "Mã nói CÁI GÌ; chú thích nói VÌ SAO",
        "arrow": true
      },
      {
        "label": "Cái gì thì đọc được từ mã, vì sao thì không",
        "arrow": true
      },
      {
        "label": "Chú thích lặp lại mã là nợ - nó lệch khi mã đổi",
        "arrow": true
      },
      {
        "label": "Chú thích đáng viết nhất: cách đã thử và bỏ vì lý do gì"
      }
    ],
    "realWorldExample": {
      "company": "Chú thích lệch còn tệ hơn không có",
      "description": "Một chú thích mô tả hành vi cũ của hàm sau khi hàm đã đổi sẽ dẫn người đọc đi sai hướng, và nó có vẻ đáng tin hơn cả việc không có chú thích nào. Đây là lý do chú thích nên nói về lý do - lý do ít lỗi thời hơn hành vi nhiều lần."
    },
    "quiz": [
      {
        "question": "Vì sao chú thích lặp lại nội dung mã lại là nợ kỹ thuật?",
        "options": [
          "Vì nó lệch khỏi mã ngay lần sửa đầu tiên mà không ai nhận ra",
          "Vì nó làm tệp dài hơn nên tốn thời gian đọc mà không thêm thông tin",
          "Vì nó khiến người mới tin rằng mọi phần đều đã được ghi chú đầy đủ",
          "Vì việc duy trì các chú thích đó chiếm thời gian của đội mỗi lần sửa mã"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là chi phí nhỏ và đo được. Chú thích lệch thì tệ hơn không có gì: nó dẫn người đọc đi sai hướng và có vẻ đáng tin, nên họ không kiểm lại bằng cách đọc mã."
      },
      {
        "question": "Vì sao chú thích về lý do ít lỗi thời hơn chú thích về hành vi?",
        "options": [
          "Vì ràng buộc dẫn tới quyết định thường tồn tại lâu hơn cách triển khai cụ thể",
          "Vì lý do được viết bằng ngôn ngữ tự nhiên nên rốt cuộc cũng không phụ thuộc vào cú pháp mã",
          "Vì các quyết định lớn tương đối ít được thay đổi hơn so với chi tiết trong từng hàm",
          "Vì lý là do khá thường xuyên ngắn hơn nên tương đối ít có chỗ để trở nên không chính xác"
        ],
        "correct": 0,
        "explanation": "Một hàm được viết lại ba lần trong hai năm; ràng buộc buộc nó phải xử lý đồng thời thì vẫn nguyên. Lựa chọn thứ ba gần đúng và nó nói về tần suất, còn đây là lý do cấu trúc."
      },
      {
        "question": "Chú thích nào đáng viết nhất khi kết thúc một việc khó?",
        "options": [
          "Những cách đã thử và bỏ, kèm lý do bỏ từng cách",
          "Mô tả chi tiết cách mà giải pháp cuối cùng hoạt động",
          "Danh sách các trường hợp đặc biệt mà mã đang xử lý",
          "Ghi chú về những phần còn có thể cải thiện trong tương lai"
        ],
        "correct": 0,
        "explanation": "Đây là kinh nghiệm âm bản, thứ mà không ai viết vì nó không mang lại uy tín và cũng không có chỗ tự nhiên để viết. Người tiếp theo nhìn mã sẽ thấy ngay cách hiển nhiên mà bạn đã thử và bỏ."
      },
      {
        "question": "Vì sao chú thích cạnh một con số kỳ lạ lại quan trọng?",
        "options": [
          "Vì không có nó thì người sau sẽ chỉnh con số đó mà không biết nó từ đâu ra",
          "Vì tất cả các con số cố định ở ngay trong mã bị coi là dấu hiệu của chính mã kém chất lượng",
          "Vì con số đó có thể cần thay đổi khi hệ thống mở rộng quy mô",
          "Vì việc đặt tên cho con số giúp mã dễ đọc hơn ở những chỗ dùng lại"
        ],
        "correct": 0,
        "explanation": "Một thời gian chờ ba giây có thể là con số tuỳ ý hoặc là con số đo được từ phân vị 99 của một dịch vụ cụ thể. Hai trường hợp trông giống hệt nhau trong mã và dẫn tới hai hành động khác hẳn."
      },
      {
        "question": "Khi nào tài liệu ngoài mã tốt hơn chú thích trong mã?",
        "options": [
          "Khi nội dung nói về nhiều thành phần cùng lúc nên không thuộc về tệp nào",
          "Khi nội dung dài hơn mức hoàn toàn có thể đọc thoải mái ở ngay trong lúc đang đọc mã",
          "Khi người đọc dự kiến không phải là kỹ sư trong đội phát triển",
          "Khi nội dung cần được cập nhật thường xuyên hơn so với mã nguồn"
        ],
        "correct": 0,
        "explanation": "Đây là tiêu chí về PHẠM VI, và nó cũng giải thích vì sao tài liệu ngoài mã lỗi thời nhanh hơn: nó không nằm cạnh thứ nó mô tả nên người sửa mã không thấy nó."
      }
    ],
    "keyTakeaways": [
      "Mã nói CÁI GÌ; chú thích là nơi duy nhất nói VÌ SAO.",
      "Chú thích lặp lại mã lệch ngay lần sửa đầu - và lệch thì tệ hơn không có.",
      "Lý do ít lỗi thời hơn hành vi vì ràng buộc sống lâu hơn cách triển khai.",
      "Đáng viết nhất: những cách ĐÃ THỬ VÀ BỎ, kèm lý do bỏ.",
      "Mỗi con số kỳ lạ cần một dòng nói nó từ đâu ra."
    ],
    "practicePrompt": {
      "question": "Bạn thấy một dòng mã trông thừa và không có chú thích. Nên làm gì?",
      "options": [
        "Tìm trong lịch sử kho mã xem nó được thêm vào lúc nào và cùng với thay đổi gì",
        "Xoá nó đi và chạy bộ kiểm thử để xem có gì hỏng không",
        "Giữ nguyên vì có thể nó đang xử lý một trường hợp mà bạn chưa nghĩ tới",
        "Hỏi trong nhóm của đội xem có ai nhớ vì sao dòng đó tồn tại không"
      ],
      "correct": 0,
      "explanation": "Bộ kiểm thử xanh không chứng minh dòng đó thừa - trường hợp mà nó xử lý có thể chính là trường hợp chưa có kiểm thử. Lịch sử kho mã thì thường cho câu trả lời trong hai phút, qua chính lần sửa lỗi đã sinh ra nó."
    },
    "summary": {
      "keyIdea": "Chú thích là nơi duy nhất ghi được vì sao, và vì sao thì không suy ra được từ mã.",
      "formula": "Viết lý do và cách đã bỏ; đừng viết lại thứ mã đã nói.",
      "commonMistake": "Chú thích mô tả hành vi, rồi nó lệch và dẫn người đọc đi sai hướng.",
      "action": "Thêm một dòng lý do cho con số cố định gần nhất trong mã bạn."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Tìm một con số cố định trong mã của bạn và thêm một dòng: nó từ đâu ra, đo được hay chọn tuỳ ý.",
      "secondary": "Rồi với việc khó gần nhất bạn vừa làm xong, viết hai câu về những cách đã thử và bỏ. Đó là phần duy nhất người sau không tự dựng lại được."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Phần lớn thời gian đọc một kho mã lạ bị tiêu vào việc dựng lại những quyết định mà người trước đã cân nhắc xong và không ghi lại."
      },
      {
        "type": "heading",
        "text": "Cái gì và vì sao"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Cái gì",
          "text": "Đọc được từ mã, tuy tốn công. Chú thích lặp lại nó là nợ: nó lệch khỏi mã ngay lần sửa đầu tiên."
        },
        "right": {
          "label": "Vì sao",
          "text": "Không suy ra được từ đâu. Ràng buộc dẫn tới quyết định thường sống lâu hơn cách triển khai, nên loại chú thích này cũng ít lỗi thời hơn."
        }
      },
      {
        "type": "callout",
        "label": "Lệch tệ hơn không có",
        "text": "Một chú thích mô tả hành vi cũ sau khi hàm đã đổi dẫn người đọc đi sai hướng - và nó có vẻ đáng tin, nên họ không kiểm lại bằng cách đọc mã."
      },
      {
        "type": "heading",
        "text": "Ba thứ đáng viết"
      },
      {
        "type": "list",
        "items": [
          "Vì sao chọn cách này thay vì cách hiển nhiên hơn. Không có nó, người sau sẽ dọn dẹp đúng chỗ đã được cân nhắc kỹ.",
          "Những cách ĐÃ THỬ VÀ BỎ, kèm lý do. Người tiếp theo nhìn mã sẽ thấy ngay cách hiển nhiên mà bạn đã thử.",
          "Mỗi con số kỳ lạ từ đâu ra. Một thời gian chờ ba giây có thể là con số tuỳ ý hoặc đo được từ phân vị 99 - hai trường hợp trông giống hệt nhau."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Khi nội dung nói về nhiều thành phần cùng lúc thì nó không thuộc về tệp nào và nên ra tài liệu ngoài.",
          "Nhưng biết trước cái giá: tài liệu ngoài lỗi thời nhanh hơn, đúng vì nó không nằm cạnh thứ nó mô tả nên người sửa mã không thấy nó."
        ]
      }
    ]
  },

  {
    "id": 1691,
    "slug": "doc-do-phu-kiem-thu-theo-ty-trong",
    "title": "Đọc độ phủ kiểm thử theo tỷ trọng - so module lớn với module nhỏ",
    "subtitle": "Con số tuyệt đối không so được giữa hai phần khác quy mô; tỷ trọng thì so được, nếu biết nó giấu gì.",
    "duration": "9 phút",
    "difficulty": "Trung bình",
    "track": "professional",
    "emoji": "📐",
    "interactiveType": "ratios",
    "whyItMatters": "Quyết định phân bổ công kiểm thử thường dựa trên một bảng chỉ số, và bảng đó dễ dẫn tới việc dồn công vào chỗ dễ nhất.",
    "openingQuestion": "Module A phủ 90%, module B phủ 60%. Nên dồn công vào đâu?",
    "openingOptions": [
      "Chưa biết - phải xem phần chưa phủ của mỗi bên là phần nào",
      "Module B, bởi vì độ phủ thấp hơn nên rủi ro còn lại tương đối lớn hơn",
      "Module A, vì đã gần đạt mức cao nên hoàn thiện nốt sẽ nhanh hơn",
      "Chia đều cho cả hai để độ phủ toàn cả hệ thống tăng lên đồng đều"
    ],
    "correctOption": 0,
    "explanation": "Mười phần trăm chưa phủ của module A có thể là toàn bộ nhánh xử lý thanh toán, còn bốn mươi phần trăm chưa phủ của module B có thể là mã tạo giao diện quản trị nội bộ. Chỉ số theo tỷ trọng cho phép so hai module khác quy mô, và nó cố tình bỏ qua thứ quan trọng nhất là phần chưa phủ đó nằm ở đâu.",
    "diagram": [
      {
        "label": "Tỷ trọng cho phép so hai phần khác quy mô",
        "arrow": true
      },
      {
        "label": "Và nó bỏ qua thứ quan trọng nhất: phần chưa phủ nằm ở đâu",
        "arrow": true
      },
      {
        "label": "Xem xu hướng theo thời gian, không xem một lát cắt",
        "arrow": true
      },
      {
        "label": "Và nhìn độ phủ của phần MỚI THÊM, không của toàn kho"
      }
    ],
    "realWorldExample": {
      "company": "Độ phủ của phần mới thêm",
      "description": "Chỉ số hữu ích hơn độ phủ toàn kho là độ phủ của những dòng vừa được thêm trong bản thay đổi này. Nó không bắt đội trả nợ cũ, và nó ngăn khoản nợ đó lớn thêm - hai tính chất mà con số toàn kho không có cái nào."
    },
    "quiz": [
      {
        "question": "Vì sao dùng tỷ trọng thay vì số dòng được phủ?",
        "options": [
          "Vì số tuyệt đối không so được giữa hai module có quy mô khác nhau",
          "Vì số dòng được phủ thay đổi mỗi khi mã được viết lại dù chất lượng như cũ",
          "Vì các công cụ đo độ phủ báo cáo theo tỷ lệ phần trăm là chính",
          "Vì tỷ trọng phản ánh được cả phần mã không thể viết kiểm thử"
        ],
        "correct": 0,
        "explanation": "Một module nghìn dòng phủ tám trăm dòng và một module trăm dòng phủ chín mươi dòng - số tuyệt đối làm cái đầu trông tốt hơn, tỷ trọng cho thấy ngược lại. Đây là toàn bộ lý do tồn tại của loại chỉ số này."
      },
      {
        "question": "Tỷ trọng cố tình bỏ qua điều gì?",
        "options": [
          "Phần chưa phủ nằm ở đâu, và phần đó quan trọng tới mức nào",
          "Chất lượng của các phép kiểm thử đang phủ những dòng còn lại",
          "Số lượng nhánh điều kiện bên trong mỗi dòng mã được phủ",
          "Thời gian mà bộ kiểm thử cần để chạy hết toàn bộ số dòng đó"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia cũng bị bỏ qua và đều là khuyết điểm phụ. Cái này là khuyết điểm gốc: một con số duy nhất cho cả module không phân biệt được nhánh thanh toán với mã tạo giao diện nội bộ."
      },
      {
        "question": "Vì sao độ phủ của phần mới thêm hữu ích hơn độ phủ toàn kho?",
        "options": [
          "Vì nó không bắt đội trả nợ cũ mà vẫn ngăn khoản nợ đó lớn thêm",
          "Vì phần mã mới thường có nhiều lỗi hơn so với phần mã đã chạy lâu",
          "Vì đo trên phần tương đối nhỏ hơn nên con số ổn định và dễ theo dõi hơn",
          "Vì nó cho thấy được thói quen viết kiểm thử của từng người trong đội"
        ],
        "correct": 0,
        "explanation": "Hai tính chất này đi cùng nhau và con số toàn kho không có cái nào: nó vừa làm đội nản vì khoản nợ quá lớn, vừa không ngăn được việc thêm mã không có kiểm thử."
      },
      {
        "question": "Vì sao nên xem xu hướng thay vì một lát cắt?",
        "options": [
          "Vì một con số đứng yên không phân biệt được đội đang cải thiện hay đang trượt",
          "Vì độ phủ dao động theo đúng từng bản phát hành nên rốt cuộc đúng một lần đo không đại diện",
          "Vì xu hướng cho phép dự báo được thời điểm đạt mục tiêu đã đặt ra",
          "Vì cần so sánh với các module khác trong cùng khoảng thời gian"
        ],
        "correct": 0,
        "explanation": "Bảy mươi phần trăm đang tăng dần và bảy mươi phần trăm đang giảm là hai tình huống trái ngược cần hai hành động khác nhau - cùng bài học với việc đọc tồn đọng hàng đợi bằng xu hướng."
      },
      {
        "question": "Điều gì xảy ra khi độ phủ trở thành mục tiêu được đánh giá?",
        "options": [
          "Đội viết kiểm thử cho phần dễ phủ nhất, không cho phần rủi ro nhất",
          "Đội dành quá nhiều thời gian cho kiểm thử nên chậm ra tính năng mới",
          "Con số tăng nhanh trong vài tháng đầu rồi chững lại ở một mức nhất định",
          "Các phép kiểm thử được viết vội nên chất lượng không đảm bảo"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều xảy ra và đều là hệ quả phụ. Cái này là hệ quả trực tiếp và nó làm chỉ số phản tác dụng: con số tăng lên đúng lúc rủi ro thật không đổi chút nào."
      }
    ],
    "keyTakeaways": [
      "Tỷ trọng cho phép so hai phần khác quy mô - đó là toàn bộ lý do nó tồn tại.",
      "Và nó cố tình bỏ qua thứ quan trọng nhất: PHẦN CHƯA PHỦ NẰM Ở ĐÂU.",
      "Độ phủ của phần MỚI THÊM: không bắt trả nợ cũ mà vẫn ngăn nợ lớn thêm.",
      "Xem XU HƯỚNG - bảy mươi phần trăm đang tăng khác hẳn bảy mươi đang giảm.",
      "Đặt độ phủ làm mục tiêu thì đội phủ phần DỄ NHẤT, không phải phần rủi ro nhất."
    ],
    "practicePrompt": {
      "question": "Độ phủ toàn kho đứng yên ở 72% suốt một năm. Kết luận gì?",
      "options": [
        "Chưa kết luận được - phải xem độ phủ của phần mã mới thêm trong năm đó",
        "Đội hoàn toàn không ưu tiên viết kiểm thử nên rốt cuộc chất lượng đang giữ nguyên mức cũ",
        "Bộ kiểm thử đã bao phủ hết những phần dễ viết kiểm thử nhất",
        "Con số đã đạt mức bão hoà tự nhiên của kho mã này nên khó tăng thêm"
      ],
      "correct": 0,
      "explanation": "Con số đứng yên có thể là mã mới phủ tốt cân bằng với mã cũ bị xoá, hoặc mã mới không phủ gì cả mà tổng dòng không đổi. Hai trường hợp trái ngược cho ra cùng một con số toàn kho."
    },
    "summary": {
      "keyIdea": "Tỷ trọng so được hai phần khác quy mô, và nó giấu chỗ phần chưa phủ nằm ở đâu.",
      "formula": "Nhìn độ phủ phần mới thêm + nhìn xu hướng + xem phần chưa phủ là phần nào.",
      "commonMistake": "Đặt độ phủ làm mục tiêu, khiến đội phủ phần dễ nhất chứ không phần rủi ro nhất.",
      "action": "Tìm chỉ số độ phủ của phần mã mới thêm, không phải của toàn kho."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Tìm xem công cụ của bạn có báo độ phủ cho riêng phần mã mới thêm trong mỗi bản thay đổi không. Phần lớn công cụ có và ít đội bật nó.",
      "secondary": "Rồi mở phần chưa phủ của module quan trọng nhất và đọc xem đó là mã gì. Câu trả lời thường làm bạn đổi thứ tự ưu tiên ngay trong buổi chiều."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Quyết định phân bổ công kiểm thử thường dựa trên một bảng chỉ số, và bảng đó dễ dẫn tới việc dồn công vào chỗ dễ nhất."
      },
      {
        "type": "heading",
        "text": "Tỷ trọng làm được gì"
      },
      {
        "type": "paragraph",
        "text": "Một module nghìn dòng phủ tám trăm dòng và một module trăm dòng phủ chín mươi dòng: số tuyệt đối làm cái đầu trông tốt hơn, tỷ trọng cho thấy ngược lại. So được hai phần khác quy mô là toàn bộ lý do loại chỉ số này tồn tại."
      },
      {
        "type": "heading",
        "text": "Và nó giấu gì"
      },
      {
        "type": "callout",
        "label": "Phần chưa phủ nằm ở đâu",
        "text": "Mười phần trăm chưa phủ của một module có thể là toàn bộ nhánh xử lý thanh toán; bốn mươi phần trăm chưa phủ của module khác có thể là mã tạo giao diện quản trị nội bộ. Một con số duy nhất không phân biệt được hai chuyện đó."
      },
      {
        "type": "heading",
        "text": "Hai cách đọc tốt hơn"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Độ phủ phần mới thêm",
          "text": "Không bắt đội trả nợ cũ, mà vẫn ngăn khoản nợ đó lớn thêm. Con số toàn kho không có tính chất nào trong hai."
        },
        "right": {
          "label": "Xu hướng",
          "text": "Bảy mươi phần trăm đang tăng dần và bảy mươi đang giảm là hai tình huống trái ngược - cùng bài học với việc đọc tồn đọng hàng đợi."
        }
      },
      {
        "type": "closing",
        "lines": [
          "Và một cảnh báo về việc đặt độ phủ làm mục tiêu được đánh giá: đội sẽ viết kiểm thử cho phần DỄ PHỦ nhất, không cho phần rủi ro nhất.",
          "Con số tăng lên đúng lúc rủi ro thật không đổi chút nào - và lúc đó chỉ số không chỉ vô dụng mà còn dẫn quyết định đi sai hướng."
        ]
      }
    ]
  },

  {
    "id": 1692,
    "slug": "ket-qua-review-doc-truoc-ca-phan-ma",
    "title": "Kết quả rà soát - dòng đáng đọc trước cả phần mã",
    "subtitle": "Một bản thay đổi được duyệt nhanh và một bản bị hỏi mười câu nói hai chuyện khác nhau về nó.",
    "duration": "9 phút",
    "difficulty": "Trung bình",
    "track": "professional",
    "emoji": "🔍",
    "whyItMatters": "Lịch sử rà soát là nguồn thông tin về chất lượng mà mọi đội đều đang tạo ra và gần như không đội nào đọc lại.",
    "openingQuestion": "Đọc lịch sử rà soát của một phần mã cho bạn biết gì mà đọc mã không cho?",
    "openingOptions": [
      "Chỗ nào đã từng gây tranh cãi, và tranh cãi đó kết thúc bằng lập luận gì",
      "Ai là người hiểu rõ nhất về phần mã đó trong đội hiện tại",
      "Những lỗi đã từng được phát hiện và sửa trong quá trình rà soát",
      "Mức độ cẩn thận mà đội áp dụng khi làm việc với phần mã đó"
    ],
    "correctOption": 0,
    "explanation": "Ba lựa chọn kia đều rút ra được và đều là thông tin về con người. Vế thứ hai của lựa chọn đầu mới là thứ đáng giá nhất: một tranh cãi kết thúc bằng số đo thì kết luận đó vẫn đúng, còn một tranh cãi kết thúc vì hết thời gian thì nó sẽ quay lại - và bạn biết trước mình đang đứng ở đâu.",
    "diagram": [
      {
        "label": "Chỗ từng gây tranh cãi = chỗ có đánh đổi thật",
        "arrow": true
      },
      {
        "label": "Tranh cãi kết bằng SỐ ĐO thì kết luận còn đúng",
        "arrow": true
      },
      {
        "label": "Kết vì hết thời gian thì nó sẽ quay lại",
        "arrow": true
      },
      {
        "label": "Nhiều vòng sửa không phải dấu hiệu người viết kém"
      }
    ],
    "realWorldExample": {
      "company": "Ghi kết luận vào mã, không để trong lượt rà soát",
      "description": "Một tranh cãi được giải quyết bằng số đo trong phần thảo luận rà soát sẽ biến mất khỏi tầm nhìn ngay khi bản thay đổi được gộp. Chuyển kết luận đó thành một chú thích cạnh mã là cách duy nhất để nó còn ở đó sáu tháng sau."
    },
    "quiz": [
      {
        "question": "Vì sao chỗ từng gây tranh cãi đáng chú ý khi đọc mã lạ?",
        "options": [
          "Vì tranh cãi thường xuất hiện ở chỗ có đánh đổi thật, không có phương án hiển nhiên",
          "Vì đó là chỗ có nhiều khả năng còn tồn tại lỗi chưa được phát hiện",
          "Vì nó cho thấy phần mã đó đã phức tạp hơn hẳn mức cần thiết nên cần được đơn giản hoá lại",
          "Vì các bên tham gia tranh cãi là những người hiểu rõ phần mã đó nhất"
        ],
        "correct": 0,
        "explanation": "Người ta không tranh cãi về chỗ chỉ có một cách làm đúng. Nên một lượt rà soát dài bất thường thường đánh dấu đúng chỗ mà người đọc sau cần cẩn thận nhất."
      },
      {
        "question": "Vì sao cách kết thúc một tranh cãi lại quan trọng?",
        "options": [
          "Vì kết bằng số đo thì kết luận còn đúng, kết vì hết thời gian thì nó sẽ quay lại",
          "Vì nó cho biết ai chính là người có tiếng nói quyết định ở ngay trong tất cả các vấn đề kỹ thuật",
          "Vì tranh cãi kéo dài làm chậm tiến độ nên cần rút kinh nghiệm cho lần sau",
          "Vì cách kết thúc phản ánh văn hoá làm việc của đội trong các vấn đề khó"
        ],
        "correct": 0,
        "explanation": "Đây là thông tin dùng được ngay: nếu bạn đang định đổi đúng chỗ đó, biết tranh cãi cũ kết thúc thế nào quyết định bạn cần chuẩn bị số đo hay chỉ cần một lập luận."
      },
      {
        "question": "Vì sao nên chuyển kết luận rà soát thành chú thích trong mã?",
        "options": [
          "Vì thảo luận trong lượt rà soát biến mất khỏi tầm nhìn ngay khi bản thay đổi được gộp",
          "Vì các nền tảng quản lý mã có thể xoá lịch sử thảo luận sau một thời gian",
          "Vì chú thích nằm trong mã thì dễ tìm kiếm hơn hẳn so với thảo luận trong một lượt rà soát",
          "Vì người ngoài đội không có quyền truy cập vào lịch sử rà soát nội bộ"
        ],
        "correct": 0,
        "explanation": "Lựa chọn thứ ba đúng một phần và tra được nếu bạn biết mình cần tra. Vấn đề thật là người đọc mã sáu tháng sau không biết rằng có một cuộc thảo luận để mà đi tìm."
      },
      {
        "question": "Nhiều vòng sửa trong một lượt rà soát nói lên điều gì?",
        "options": [
          "Chưa nói gì cả - có thể là bản thay đổi khó, hoặc yêu cầu chưa rõ từ đầu",
          "Người viết chưa nắm vững phần mã hoặc chưa đủ cẩn thận khi làm",
          "Người rà soát đang đưa ra quá nhiều nhận xét về những chi tiết nhỏ",
          "Quy trình rà soát của đội chưa hiệu quả nên tốn nhiều vòng lặp"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là cách đọc quy chỉ số này về một người hoặc một quy trình. Nguyên nhân phổ biến nhất lại nằm ở trước đó: yêu cầu chưa rõ khi bắt đầu, nên bản thay đổi phải đổi hướng giữa chừng."
      },
      {
        "question": "Chỉ số nào từ lịch sử rà soát đáng theo dõi nhất?",
        "options": [
          "Thời gian một bản thay đổi nằm chờ trước khi có người rà soát lần đầu",
          "Số lượng nhận xét trung bình trên mỗi bản thay đổi được gửi lên",
          "Tỷ lệ bản thay đổi được duyệt ngay mà không cần sửa gì thêm",
          "Số người tham gia rà soát trung bình cho mỗi bản thay đổi"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều dễ bị làm đẹp bằng cách đổi hành vi mà không đổi chất lượng. Thời gian chờ thì đo thứ thật sự làm chậm cả đội, và nó khó làm đẹp một cách giả tạo."
      }
    ],
    "keyTakeaways": [
      "Chỗ từng gây tranh cãi là chỗ có đánh đổi thật - không ai cãi về chỗ chỉ có một cách đúng.",
      "Kết bằng SỐ ĐO thì kết luận còn đúng; kết vì hết thời gian thì nó sẽ quay lại.",
      "Chuyển kết luận thành chú thích - người đọc sau không biết có cuộc thảo luận để đi tìm.",
      "Nhiều vòng sửa thường do YÊU CẦU CHƯA RÕ từ đầu, không do người viết kém.",
      "Chỉ số đáng theo dõi nhất là THỜI GIAN CHỜ được rà soát lần đầu."
    ],
    "practicePrompt": {
      "question": "Bạn sắp đổi một phần mã mà lịch sử rà soát cho thấy từng tranh cãi rất dài. Nên làm gì?",
      "options": [
        "Đọc xem tranh cãi đó kết thúc bằng gì trước khi viết dòng mã đầu tiên",
        "Hỏi những người đã tham gia tranh cãi đó xem họ còn giữ quan điểm cũ không",
        "Viết thay đổi theo cách đơn giản nhất rồi để lượt rà soát quyết định",
        "Tránh đổi phần đó và tìm cách giải quyết vấn đề ở một chỗ khác"
      ],
      "correct": 0,
      "explanation": "Lựa chọn thứ hai tốn thời gian của nhiều người và có thể không cần. Nếu tranh cãi cũ kết thúc bằng một số đo thì bạn biết mình cần chuẩn bị số đo mới; nếu nó kết thúc vì hết thời gian thì bạn đang có cơ hội đóng nó lại hẳn."
    },
    "summary": {
      "keyIdea": "Lịch sử rà soát là nguồn thông tin về chất lượng mà gần như không đội nào đọc lại.",
      "formula": "Tìm chỗ từng tranh cãi → xem nó kết thúc bằng gì → chuẩn bị theo cách đó.",
      "commonMistake": "Để kết luận nằm trong lượt rà soát, nơi nó biến mất khi bản thay đổi được gộp.",
      "action": "Mở lịch sử rà soát của phần mã bạn sắp đổi trước khi viết dòng đầu tiên."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Trước khi đổi một phần mã, mở lịch sử rà soát của nó và tìm lượt có nhiều thảo luận nhất. Việc này mất năm phút.",
      "secondary": "Rồi lần sau khi một tranh cãi trong lượt rà soát của bạn kết thúc bằng một số đo, chuyển kết luận đó thành một chú thích cạnh mã. Đó là cách duy nhất nó còn ở đó sáu tháng sau."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Lịch sử rà soát là nguồn thông tin về chất lượng mà mọi đội đều đang tạo ra và gần như không đội nào đọc lại."
      },
      {
        "type": "heading",
        "text": "Vì sao chỗ tranh cãi đáng chú ý"
      },
      {
        "type": "callout",
        "label": "Không ai cãi về chỗ chỉ có một cách đúng",
        "text": "Tranh cãi xuất hiện ở chỗ có đánh đổi THẬT. Nên một lượt rà soát dài bất thường thường đánh dấu đúng chỗ mà người đọc sau cần cẩn thận nhất - và nó làm việc đó tốt hơn mọi tài liệu kiến trúc."
      },
      {
        "type": "heading",
        "text": "Cách kết thúc quan trọng hơn nội dung"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Kết bằng số đo",
          "text": "Kết luận vẫn còn đúng. Nếu bạn muốn đổi, bạn cần một số đo mới."
        },
        "right": {
          "label": "Kết vì hết thời gian",
          "text": "Nó sẽ quay lại. Và bạn đang có cơ hội đóng nó lại hẳn."
        }
      },
      {
        "type": "paragraph",
        "text": "Nhưng thông tin này biến mất nhanh: thảo luận trong lượt rà soát ra khỏi tầm nhìn ngay khi bản thay đổi được gộp, và người đọc mã sáu tháng sau không biết rằng có một cuộc thảo luận để mà đi tìm. Chuyển kết luận thành CHÚ THÍCH cạnh mã là cách duy nhất giữ nó."
      },
      {
        "type": "heading",
        "text": "Đọc các chỉ số cho đúng"
      },
      {
        "type": "list",
        "items": [
          "Nhiều vòng sửa: nguyên nhân phổ biến nhất là YÊU CẦU CHƯA RÕ từ đầu, không phải người viết kém.",
          "Số nhận xét mỗi bản và tỷ lệ duyệt ngay: cả hai đều làm đẹp được bằng cách đổi hành vi mà không đổi chất lượng.",
          "THỜI GIAN CHỜ được rà soát lần đầu: đo thứ thật sự làm chậm cả đội, và khó làm đẹp giả tạo."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Đây là bài cuối của phần đọc sâu, và nó nối lại với hai bài trước bằng cùng một ý.",
          "Chú thích, độ phủ và lịch sử rà soát đều là dữ liệu mà đội đã tạo ra rồi - phần lớn giá trị nằm ở việc đọc chúng, không ở việc tạo thêm."
        ]
      }
    ]
  },
];
