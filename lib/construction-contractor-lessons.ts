import type { Lesson } from "./lesson-types";

// Cụm "Tài chính nhà thầu xây dựng" (ids 1751-1753, professional track,
// gắn vào Chặng 5 phần "Vận hành vốn và tài chính khởi nghiệp").
//
// Vì sao cụm này tồn tại: quét cả 726 bài trong kho ra 0 bài về ghi nhận
// doanh thu theo tiến độ, tiền giữ lại, bảo lãnh hợp đồng hay backlog. Kho đã
// có `working-capital-management`, `cash-conversion-cycle-2` và
// `cong-ty-lai-ma-het-tien` ở dạng TỔNG QUÁT - đủ cho một doanh nghiệp bán
// hàng, không đủ cho một nhà thầu, vì ba thứ làm méo báo cáo của nhà thầu đều
// không tồn tại ở doanh nghiệp bán hàng: doanh thu ghi theo tiến độ chứ không
// theo hoá đơn, một phần tiền bị giữ lại tới tận sau bảo hành, và mỗi hợp
// đồng mới đều ngốn tiền trước khi trả tiền.
//
// Cụm này KHÔNG dạy lại NPV/IRR - `npv-co-ban`, `irr-co-ban`,
// `danh-gia-du-an-npv-irr` và `wacc-co-ban` đã làm việc đó. Bài 1753 giả định
// người học đã qua chúng và chỉ nói phần khác đi khi dự án là một gói thầu.
//
// Cũng KHÔNG mâu thuẫn với `cau-truc-von-du-an-bat-dong-san` và cụm dự án BĐS
// (1731-1735): cụm kia đứng ở phía CHỦ ĐẦU TƯ - người bỏ vốn, bán sản phẩm,
// chịu rủi ro pháp lý và thị trường. Cụm này đứng ở phía NHÀ THẦU - người
// nhận thi công, doanh thu đã chốt bằng hợp đồng, và rủi ro nằm ở chi phí
// vượt dự toán cùng tiến độ thanh toán.

export const CONSTRUCTION_CONTRACTOR_LESSONS: Lesson[] = [
  {
    "id": 1751,
    "slug": "ghi-nhan-tien-do-theo-phan-viec-hoan-thanh",
    "title": "Nhiều đội, Bài 1: Ghi nhận tiến độ theo phần việc xong, không theo mốc bàn giao",
    "subtitle": "Một dự án báo 90% xong trong sáu tháng liền là một dự án đang đo sai thứ.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "track": "professional",
    "emoji": "🏗️",
    "whyItMatters": "Cách đo tiến độ quyết định lúc nào vấn đề lộ ra, và cách đo phổ biến nhất giấu vấn đề cho tới đúng lúc không còn thời gian xử lý.",
    "openingQuestion": "Vì sao dự án hay kẹt ở mốc 90% suốt nhiều tháng?",
    "openingOptions": [
      "Vì phần trăm được ước lượng theo cảm giác, và phần khó luôn nằm ở cuối",
      "Vì các đội thường lạc quan quá mức khi báo cáo tiến độ công việc",
      "Vì phạm vi công việc mở rộng thêm trong quá trình thực hiện dự án",
      "Vì các phần phụ thuộc lẫn nhau nên phải chờ nhau ở giai đoạn cuối"
    ],
    "correctOption": 0,
    "explanation": "Vế thứ hai là phần cơ chế: phần tích hợp, xử lý trường hợp lạ, di trú dữ liệu và vận hành đều nằm ở cuối và đều khó ước lượng nhất. Ba lựa chọn kia đều xảy ra và đều làm mọi thứ tệ thêm, nhưng chúng không giải thích được vì sao con số kẹt ở đúng chín mươi chứ không phải một mức bất kỳ.",
    "diagram": [
      {
        "label": "Đo bằng PHẦN VIỆC ĐÃ XONG VÀ DÙNG ĐƯỢC, không bằng phần trăm",
        "arrow": true
      },
      {
        "label": "Xong nghĩa là chạy trên môi trường thật, không phải viết xong mã",
        "arrow": true
      },
      {
        "label": "Chia thành phần giao được độc lập, mỗi phần có người dùng thật",
        "arrow": true
      },
      {
        "label": "Rồi tiến độ tự đo được: đếm phần đã giao"
      }
    ],
    "realWorldExample": {
      "company": "Định nghĩa chữ xong",
      "description": "Một phần việc viết xong mã nhưng chưa kiểm thử, chưa triển khai, chưa có người dùng nào chạm tới thì đang ở đâu đó giữa không phần trăm và một trăm phần trăm - và mọi con số đặt vào khoảng đó đều là ước lượng của người đang muốn báo cáo tiến độ tốt."
    },
    "quiz": [
      {
        "question": "Vì sao phần khó luôn nằm ở cuối dự án?",
        "options": [
          "Vì tích hợp, trường hợp lạ, di trú dữ liệu và vận hành đều nằm ở đó",
          "Vì đội thường làm những phần dễ trước để tạo đà cho dự án",
          "Vì các quyết định khó thường bị hoãn tới khi không thể hoãn thêm",
          "Vì áp lực thời gian ở giai đoạn cuối làm chất lượng công việc giảm"
        ],
        "correct": 0,
        "explanation": "Lựa chọn thứ hai cũng đúng và nó nói về lựa chọn của đội. Cái này là tính chất của công việc: bốn phần đó không làm được sớm vì chúng cần những thứ khác đã tồn tại trước, nên chúng dồn về cuối bất kể đội chọn thứ tự nào."
      },
      {
        "question": "Chữ xong nên được định nghĩa thế nào?",
        "options": [
          "Chạy trên môi trường thật và có người dùng thật chạm tới",
          "Viết xong mã và đã qua vòng rà soát của một người khác trong đội",
          "Hoàn thành toàn bộ các hạng mục trong danh sách công việc của phần đó",
          "Được đội kiểm thử xác nhận là đạt yêu cầu đã đặt ra từ đầu"
        ],
        "correct": 0,
        "explanation": "Ba định nghĩa kia đều dừng trước ranh giới quan trọng nhất. Một phần việc chưa chạy thật thì mọi rủi ro về tích hợp, hiệu năng và vận hành của nó vẫn còn nguyên - và đó chính là phần hay làm dự án trượt."
      },
      {
        "question": "Vì sao chia thành phần giao được độc lập lại giải quyết vấn đề đo tiến độ?",
        "options": [
          "Vì lúc đó tiến độ tự đo được bằng cách đếm số phần đã giao",
          "Vì các phần nhỏ dễ ước lượng chính xác hơn so với một phần lớn",
          "Vì đội có thể làm song song nhiều phần nên tiến độ nhanh hơn",
          "Vì rủi ro được phân tán ra nhiều phần nên một phần trượt ít ảnh hưởng"
        ],
        "correct": 0,
        "explanation": "Ba lợi ích kia đều thật và đều là lợi ích phụ. Cái này giải quyết đúng vấn đề của bài: nó thay một con số ước lượng bằng một phép đếm, và phép đếm thì không ước lượng được theo cảm giác."
      },
      {
        "question": "Điều gì làm cho một phần được coi là giao được độc lập?",
        "options": [
          "Nó mang lại giá trị cho ai đó ngay cả khi các phần còn lại chưa xong",
          "Nó có thể được phát triển mà không cần chờ các phần khác hoàn thành",
          "Nó có ranh giới kỹ thuật rõ ràng với chính những phần còn lại của chính hệ thống",
          "Nó được giao cho một đội duy nhất chịu trách nhiệm từ đầu tới cuối"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia mô tả tính độc lập về KỸ THUẬT hoặc TỔ CHỨC. Điều kiện thật là độc lập về GIÁ TRỊ - nếu không ai dùng được nó cho tới khi mọi thứ xong thì việc giao nó không chứng minh được gì."
      },
      {
        "question": "Dấu hiệu nào cho thấy cách đo tiến độ đang có vấn đề?",
        "options": [
          "Con số tiến độ tăng đều mỗi tuần trong khi chưa có gì chạy được",
          "Con số tiến độ đứng yên trong nhiều tuần liền không thay đổi",
          "Các đội báo tiến độ khác nhau cho cùng một hạng mục công việc",
          "Tiến độ thực tế chậm hơn so với kế hoạch ban đầu đã đặt ra"
        ],
        "correct": 0,
        "explanation": "Lựa chọn thứ hai trông xấu hơn và nó trung thực hơn. Con số tăng đều mà không có gì chạy được thì nó đang đo lượng công việc đã bỏ ra, không đo kết quả - và hai thứ đó chỉ trùng nhau ở cuối."
      }
    ],
    "keyTakeaways": [
      "Phần khó dồn về cuối vì tích hợp, trường hợp lạ, di trú và vận hành cần thứ khác có trước.",
      "XONG nghĩa là chạy trên môi trường thật và có người dùng thật chạm tới.",
      "Chia thành phần giao được độc lập thì tiến độ thành một PHÉP ĐẾM.",
      "Độc lập về GIÁ TRỊ, không phải về kỹ thuật hay tổ chức.",
      "Tiến độ tăng đều mà chưa có gì chạy được = đang đo công bỏ ra, không đo kết quả."
    ],
    "practicePrompt": {
      "question": "Dự án báo 85% xong. Câu hỏi nào cho thông tin thật nhất?",
      "options": [
        "Phần nào đã chạy trên môi trường thật và có người dùng thật rồi",
        "Còn bao nhiêu hạng mục trong danh sách công việc chưa hoàn thành",
        "Đội ước tính cần thêm bao nhiêu thời gian để hoàn thành nốt phần còn lại",
        "Có rủi ro nào có thể làm tương đối chậm phần công việc còn lại hay không"
      ],
      "correct": 0,
      "explanation": "Ba câu kia đều nhận được câu trả lời dựa trên cùng một ước lượng đã tạo ra con số 85%. Câu này hỏi một sự kiện đã xảy ra, nên nó không ước lượng lại được - và câu trả lời thường nhỏ hơn nhiều so với 85%."
    },
    "summary": {
      "keyIdea": "Cách đo tiến độ quyết định lúc nào vấn đề lộ ra.",
      "formula": "Chia phần giao được độc lập → định nghĩa xong là chạy thật → đếm phần đã giao.",
      "commonMistake": "Đo bằng phần trăm ước lượng, thứ giấu vấn đề tới lúc hết thời gian.",
      "action": "Hỏi dự án gần nhất: phần nào đã chạy thật và có người dùng thật."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Với dự án đang chạy, hỏi một câu: phần nào đã chạy trên môi trường thật và có người dùng thật chạm tới?",
      "secondary": "Câu trả lời thường nhỏ hơn nhiều so với con số phần trăm đang được báo cáo, và khoảng chênh giữa hai con số chính là phần rủi ro chưa ai nhìn thấy."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Cách đo tiến độ quyết định lúc nào vấn đề lộ ra, và cách đo phổ biến nhất giấu vấn đề cho tới đúng lúc không còn thời gian xử lý."
      },
      {
        "type": "heading",
        "text": "Vì sao kẹt ở chín mươi phần trăm"
      },
      {
        "type": "callout",
        "label": "Phần khó dồn về cuối",
        "text": "Tích hợp, xử lý trường hợp lạ, di trú dữ liệu và vận hành đều nằm ở cuối. Bốn phần đó không làm sớm được vì chúng cần những thứ khác đã tồn tại trước - nên chúng dồn về cuối bất kể đội chọn thứ tự nào."
      },
      {
        "type": "heading",
        "text": "Định nghĩa chữ xong"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Định nghĩa hay dùng",
          "text": "Viết xong mã, qua rà soát, xong danh sách công việc. Cả ba đều dừng TRƯỚC ranh giới quan trọng nhất."
        },
        "right": {
          "label": "Định nghĩa dùng được",
          "text": "Chạy trên môi trường thật và có người dùng thật chạm tới. Chưa qua đó thì mọi rủi ro về tích hợp, hiệu năng và vận hành vẫn còn nguyên."
        }
      },
      {
        "type": "heading",
        "text": "Cách sửa gốc"
      },
      {
        "type": "paragraph",
        "text": "Chia dự án thành các phần GIAO ĐƯỢC ĐỘC LẬP - độc lập về GIÁ TRỊ, không phải về kỹ thuật. Điều kiện là nó mang lại giá trị cho ai đó ngay cả khi các phần còn lại chưa xong."
      },
      {
        "type": "closing",
        "lines": [
          "Lúc đó tiến độ tự đo được bằng một PHÉP ĐẾM, và phép đếm thì không ước lượng lại theo cảm giác được.",
          "Dấu hiệu cách đo cũ đang hỏng: con số tăng đều mỗi tuần trong khi chưa có gì chạy được. Nó đang đo lượng công việc bỏ ra chứ không đo kết quả - và hai thứ đó chỉ trùng nhau ở cuối."
        ]
      }
    ]
  },
  {
    "id": 1752,
    "slug": "chi-phi-phoi-hop-giua-nhieu-doi",
    "title": "Nhiều đội, Bài 2: Chi phí phối hợp - vì sao càng nhiều đội càng chậm",
    "subtitle": "Thêm một đội thêm một đường liên lạc; thêm đội thứ năm thêm bốn đường cùng lúc.",
    "duration": "11 phút",
    "difficulty": "Khó",
    "track": "professional",
    "emoji": "🧱",
    "whyItMatters": "Chi phí phối hợp tăng nhanh hơn số đội, nên một tổ chức có thể tăng gấp đôi nhân lực mà tổng năng lực đi ngang.",
    "openingQuestion": "Vì sao thêm đội thứ năm tốn hơn thêm đội thứ hai?",
    "openingOptions": [
      "Vì số cặp đội cần phối hợp tăng nhanh hơn nhiều so với số đội",
      "Vì đội mới cần thời gian dài hơn để hiểu hệ thống đã trở nên phức tạp",
      "Vì các đội có sẵn phải dành thời gian hướng dẫn cho đội mới",
      "Vì việc phân chia lại phạm vi công việc giữa các đội tốn nhiều công"
    ],
    "correctOption": 0,
    "explanation": "Hai đội có một đường liên lạc; năm đội có mười. Thêm đội thứ năm thêm bốn đường cùng lúc, trong khi thêm đội thứ hai chỉ thêm một đường duy nhất. Ba lựa chọn kia là chi phí một lần phải trả khi thêm đội, còn chi phí phối hợp thì trả mãi mãi và tăng theo bình phương của số đội.",
    "diagram": [
      {
        "label": "Hai đội một đường; năm đội mười đường",
        "arrow": true
      },
      {
        "label": "Chi phí một lần khi thêm đội; chi phí phối hợp trả mãi mãi",
        "arrow": true
      },
      {
        "label": "Cách chữa: cắt số ĐƯỜNG, không cắt số đội",
        "arrow": true
      },
      {
        "label": "Ranh giới rõ + hợp đồng ổn định = hai đội không cần nói chuyện"
      }
    ],
    "realWorldExample": {
      "company": "Cắt đường, không cắt đội",
      "description": "Hai đội có ranh giới rõ và một hợp đồng ổn định giữa chúng gần như không cần nói chuyện với nhau. Hai đội chia nhau một phần mã không có ranh giới thì cần một cuộc họp mỗi tuần - và cuộc họp đó là chi phí, không phải giải pháp."
    },
    "quiz": [
      {
        "question": "Chi phí phối hợp khác chi phí thêm đội ở chỗ nào?",
        "options": [
          "Chi phí thêm đội trả một lần; chi phí phối hợp trả mãi mãi và tăng theo bình phương",
          "Chi phí phối hợp khó đo hơn nên thường không được tính vào kế hoạch",
          "Chi phí thêm đội xuất hiện ngay còn chi phí phối hợp xuất hiện dần theo thời gian",
          "Chi phí phối hợp phụ thuộc vào văn hoá làm việc còn chi phí thêm đội thì không"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều đúng và đều là đặc điểm phụ. Hai vế trong lựa chọn đầu quyết định hình dạng của bài toán: một khoản trả một lần thì lớn tới đâu cũng chịu được, còn một khoản tăng theo bình phương thì sớm muộn cũng vượt phần lợi ích."
      },
      {
        "question": "Cách chữa đúng cho chi phí phối hợp là gì?",
        "options": [
          "Cắt số ĐƯỜNG liên lạc bằng ranh giới rõ, không cắt số đội",
          "Giảm số đội bằng cách gộp những đội có công việc liên quan tới nhau",
          "Tăng tần suất họp để mọi đội cùng nắm được thông tin đầy đủ hơn",
          "Chỉ định một người điều phối chung cho các đội có phụ thuộc lẫn nhau"
        ],
        "correct": 0,
        "explanation": "Lựa chọn thứ ba là phản xạ phổ biến nhất và nó làm chi phí tăng chứ không giảm - họp là chi phí phối hợp ở dạng thuần tuý nhất. Cắt số đường thì giữ được lợi ích của việc có nhiều đội."
      },
      {
        "question": "Điều gì làm hai đội gần như không cần nói chuyện với nhau?",
        "options": [
          "Một ranh giới rõ và một hợp đồng ổn định giữa hai bên",
          "Việc phân chia công việc theo các lĩnh vực chuyên môn khác nhau",
          "Có tài liệu đầy đủ mô tả phần việc mà mỗi đội đang phụ trách",
          "Hai đội báo cáo cho cùng một người quản lý cấp trên"
        ],
        "correct": 0,
        "explanation": "Chữ ỔN ĐỊNH là phần quyết định: một hợp đồng đổi mỗi tháng thì hai đội vẫn phải nói chuyện mỗi tháng, và ranh giới rõ không cứu được điều đó. Ba lựa chọn kia đều không nói gì về mức ổn định."
      },
      {
        "question": "Vì sao chia hệ thống theo lĩnh vực nghiệp vụ tốt hơn chia theo tầng kỹ thuật?",
        "options": [
          "Vì mỗi tính năng chạm vào nhiều tầng, nên chia theo tầng buộc mọi đội phối hợp cho mọi việc",
          "Vì các lĩnh vực nghiệp vụ ổn định hơn so với các tầng kỹ thuật",
          "Vì đội hiểu nghiệp vụ sẽ đưa ra quyết định kỹ thuật phù hợp hơn",
          "Vì cách chia theo nghiệp vụ giúp giao tiếp với các bên liên quan dễ hơn"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là lợi ích thật và đều mềm. Cái này là toán: chia theo tầng thì một tính năng bất kỳ cần cả ba đội, nên mọi đường liên lạc đều được kích hoạt cho mọi việc."
      },
      {
        "question": "Dấu hiệu nào cho thấy ranh giới giữa các đội đang đặt sai?",
        "options": [
          "Phần lớn thay đổi cần nhiều hơn một đội cùng phát hành trong một đợt",
          "Các đội thường xuyên phải chờ nhau để có thể hoàn thành công việc của mình",
          "Số lượng cuộc họp giữa các đội tăng lên theo thời gian",
          "Các đội có mức tải công việc chênh lệch nhau đáng kể"
        ],
        "correct": 0,
        "explanation": "Ba dấu hiệu kia là triệu chứng và có nhiều nguyên nhân. Cái này đo thẳng vào thứ ranh giới sinh ra để đạt: nếu hai đội phải phát hành cùng nhau thì về mặt vận hành chúng vẫn là một đội, chỉ khác là có thêm chi phí phối hợp."
      }
    ],
    "keyTakeaways": [
      "Hai đội một đường; năm đội mười đường - chi phí tăng theo bình phương.",
      "Chi phí thêm đội trả MỘT LẦN; chi phí phối hợp trả MÃI MÃI.",
      "Cắt số ĐƯỜNG bằng ranh giới rõ, đừng cắt số đội và đừng thêm họp.",
      "Hợp đồng phải ỔN ĐỊNH - đổi mỗi tháng thì hai đội vẫn nói chuyện mỗi tháng.",
      "Dấu hiệu ranh giới sai: phần lớn thay đổi cần nhiều đội phát hành cùng một đợt."
    ],
    "practicePrompt": {
      "question": "Đội bạn phải họp với ba đội khác mỗi tuần. Nên sửa gì?",
      "options": [
        "Tìm xem cuộc họp nào tồn tại vì ranh giới không rõ, rồi sửa ranh giới đó",
        "Gộp ba cuộc họp thành một để tiết kiệm thời gian của mọi người",
        "Rút ngắn thời lượng mỗi cuộc họp và chuẩn bị nội dung kỹ hơn trước",
        "Chuyển sang trao đổi bằng văn bản thay vì họp trực tiếp hằng tuần"
      ],
      "correct": 0,
      "explanation": "Ba cách kia làm cuộc họp rẻ hơn và giữ nguyên nguyên nhân. Một cuộc họp định kỳ giữa hai đội thường là dấu hiệu của một ranh giới không rõ - sửa ranh giới thì cuộc họp tự biến mất."
    },
    "summary": {
      "keyIdea": "Chi phí phối hợp tăng nhanh hơn số đội.",
      "formula": "Đếm số đường, không đếm số đội; cắt đường bằng ranh giới rõ và hợp đồng ổn định.",
      "commonMistake": "Thêm họp để chữa vấn đề phối hợp - họp chính là chi phí đó ở dạng thuần nhất.",
      "action": "Đếm số cuộc họp định kỳ giữa đội bạn và các đội khác."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Đếm số cuộc họp định kỳ giữa đội bạn và các đội khác, rồi với mỗi cuộc hỏi: nó tồn tại vì ranh giới nào không rõ?",
      "secondary": "Cuộc họp nào không trả lời được câu đó thì thường là cuộc họp đáng giữ. Cuộc nào trả lời được thì bạn vừa tìm ra một ranh giới cần sửa."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chi phí phối hợp tăng nhanh hơn số đội, nên một tổ chức có thể tăng gấp đôi nhân lực mà tổng năng lực đi ngang."
      },
      {
        "type": "heading",
        "text": "Phép đếm"
      },
      {
        "type": "callout",
        "label": "Đếm đường, không đếm đội",
        "text": "Hai đội có một đường liên lạc; năm đội có mười. Thêm đội thứ năm thêm bốn đường cùng lúc, trong khi thêm đội thứ hai chỉ thêm một."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Chi phí thêm đội",
          "text": "Tuyển, hướng dẫn, chia lại phạm vi. Trả MỘT LẦN - lớn tới đâu cũng chịu được."
        },
        "right": {
          "label": "Chi phí phối hợp",
          "text": "Trả MÃI MÃI và tăng theo bình phương. Sớm muộn cũng vượt phần lợi ích mà đội mới mang lại."
        }
      },
      {
        "type": "heading",
        "text": "Cắt đường bằng ranh giới"
      },
      {
        "type": "paragraph",
        "text": "Hai đội có ranh giới rõ và một hợp đồng ỔN ĐỊNH giữa chúng gần như không cần nói chuyện. Chữ ổn định là phần quyết định: một hợp đồng đổi mỗi tháng thì hai đội vẫn phải nói chuyện mỗi tháng, và ranh giới rõ không cứu được điều đó."
      },
      {
        "type": "paragraph",
        "text": "Hệ quả cho cách chia hệ thống: chia theo LĨNH VỰC NGHIỆP VỤ, không theo tầng kỹ thuật. Chia theo tầng thì một tính năng bất kỳ cần cả ba đội, nên mọi đường liên lạc đều được kích hoạt cho mọi việc."
      },
      {
        "type": "closing",
        "lines": [
          "Dấu hiệu ranh giới đang đặt sai: phần lớn thay đổi cần nhiều hơn một đội cùng phát hành trong một đợt.",
          "Lúc đó, về mặt vận hành hai đội vẫn là một đội - chỉ khác là bây giờ có thêm chi phí phối hợp mà trước kia không có."
        ]
      }
    ]
  },
  {
    "id": 1753,
    "interactiveType": "multiples",
    "slug": "uoc-luong-goi-viec-va-do-hieu-qua-cua-doi",
    "title": "Quy mô, Bài 2: Ước lượng gói việc và đo hiệu quả thật của một đội",
    "subtitle": "Một đội hoàn thành đúng mọi ước lượng có thể là đội đang ước lượng thừa.",
    "duration": "11 phút",
    "difficulty": "Khó",
    "track": "professional",
    "emoji": "📐",
    "whyItMatters": "Mọi chỉ số về hiệu quả của đội đều bị chính đội đó điều chỉnh được, và biết cơ chế đó là điều kiện để đọc chúng cho đúng.",
    "openingQuestion": "Một đội hoàn thành đúng hạn 100% số hạng mục trong sáu tháng. Đọc thế nào?",
    "openingOptions": [
      "Đáng nghi - nhiều khả năng họ đang ước lượng dư để luôn về đích trước",
      "Rất tốt - đây là dấu hiệu của chính đúng một đội có quy trình và đồng thời kỷ luật cao",
      "Bình thường - hoàn thành đúng hạn là kỳ vọng cơ bản với mọi đội",
      "Chưa đủ thông tin - cần biết độ phức tạp của các hạng mục đó"
    ],
    "correctOption": 0,
    "explanation": "Ước lượng là dự đoán, và một chuỗi dự đoán trung thực về công việc chưa làm bao giờ cũng có sai số theo cả hai chiều. Đúng một trăm phần trăm nghĩa là hoặc có phần dư trong mọi ước lượng, hoặc phạm vi công việc đang được cắt bớt âm thầm để vừa với hạn - và cả hai đều không hiện ra trên bảng chỉ số.",
    "diagram": [
      {
        "label": "Ước lượng là dự đoán - sai số phải có ở CẢ HAI chiều",
        "arrow": true
      },
      {
        "label": "Đúng 100% = có phần dư, hoặc phạm vi bị cắt âm thầm",
        "arrow": true
      },
      {
        "label": "Đo bằng thời gian từ ý tưởng tới người dùng, không bằng số hạng mục",
        "arrow": true
      },
      {
        "label": "Và mọi chỉ số về đội đều bị chính đội đó điều chỉnh được"
      }
    ],
    "realWorldExample": {
      "company": "Chỉ số khó làm đẹp giả tạo",
      "description": "Thời gian từ lúc một yêu cầu được nhận tới lúc người dùng thật sự dùng được là chỉ số khó làm đẹp nhất, vì rút ngắn nó đòi hỏi cải thiện thật ở toàn bộ chuỗi. Số hạng mục hoàn thành thì làm đẹp được chỉ bằng cách chia nhỏ hạng mục."
    },
    "quiz": [
      {
        "question": "Vì sao một chuỗi ước lượng trung thực phải có sai số hai chiều?",
        "options": [
          "Vì ước lượng là dự đoán về công việc chưa làm, nên nó lệch cả hai phía",
          "Vì độ phức tạp của các hạng mục khác nhau nên độ chính xác cũng khác nhau",
          "Vì các yếu tố ngoài tầm kiểm soát ảnh hưởng tới tiến độ theo hai hướng",
          "Vì kinh nghiệm của người ước lượng thay đổi theo từng loại công việc"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia mô tả các nguồn sai số cụ thể. Điểm cốt lõi đơn giản hơn: nếu mọi ước lượng đều đúng hoặc dư thì nó không còn là dự đoán mà là một cam kết có đệm sẵn."
      },
      {
        "question": "Vì sao số hạng mục hoàn thành là chỉ số dễ làm đẹp?",
        "options": [
          "Vì chia nhỏ hạng mục làm con số tăng lên mà khối lượng công việc không đổi",
          "Vì đội có thể ưu tiên các hạng mục dễ để hoàn thành được nhiều hơn",
          "Vì cách phân loại hạng mục không thống nhất giữa các đội khác nhau",
          "Vì một số hạng mục được đánh dấu hoàn thành khi chưa thật sự xong hết"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều cần một quyết định có thể bị phản đối. Chia nhỏ hạng mục thì lại là việc được khuyến khích vì lý do khác - nên con số tăng lên mà không ai làm gì sai."
      },
      {
        "question": "Chỉ số nào khó làm đẹp giả tạo nhất?",
        "options": [
          "Thời gian từ lúc nhận yêu cầu tới lúc người dùng thật sự dùng được",
          "Số lượng lỗi được phát hiện trong môi trường thật mỗi tháng",
          "Tỷ lệ hạng mục hoàn thành đúng hạn so với kế hoạch ban đầu",
          "Số lần triển khai lên môi trường thật trong mỗi tuần làm việc"
        ],
        "correct": 0,
        "explanation": "Rút ngắn nó đòi hỏi cải thiện thật ở toàn bộ chuỗi - từ làm rõ yêu cầu, viết mã, rà soát, kiểm thử tới phát hành. Lựa chọn cuối là chỉ số tốt và nó làm đẹp được bằng cách triển khai nhiều bản nhỏ vô nghĩa."
      },
      {
        "question": "Vì sao cắt phạm vi âm thầm nguy hiểm hơn trễ hạn?",
        "options": [
          "Vì trễ hạn thì mọi người biết, còn cắt phạm vi thì không hiện ra ở đâu",
          "Vì phần bị cắt thường là phần khó nhất nên nợ kỹ thuật tích tụ",
          "Vì người dùng nhận được sản phẩm không đầy đủ như đã được hứa",
          "Vì việc bổ sung phần bị cắt về sau tốn nhiều công hơn làm ngay từ đầu"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là hậu quả thật. Cái này là vấn đề về thông tin: một hạng mục trễ hai tuần khởi động một cuộc trò chuyện, còn một hạng mục xong đúng hạn với một nửa nội dung thì không khởi động gì cả."
      },
      {
        "question": "Cách đọc một ước lượng cho đúng là gì?",
        "options": [
          "Như một khoảng có mức tin cậy, không như một con số duy nhất",
          "Như một cam kết mà đội chịu trách nhiệm hoàn thành đúng thời hạn",
          "Như một mục tiêu để đội phấn đấu chứ không phải một dự báo chính xác",
          "Như một con số cần được nhân thêm hệ số dự phòng trước khi dùng"
        ],
        "correct": 0,
        "explanation": "Lựa chọn cuối là cách xử lý phổ biến và nó chuyển phần dự phòng sang một chỗ khác mà vẫn giấu mức không chắc chắn. Một khoảng thì nói thẳng điều đó, và nó cho phép người nhận quyết định dựa trên rủi ro thật."
      }
    ],
    "keyTakeaways": [
      "Ước lượng là dự đoán - một chuỗi trung thực phải lệch cả HAI chiều.",
      "Đúng một trăm phần trăm = có phần dư, hoặc phạm vi bị cắt âm thầm.",
      "Số hạng mục hoàn thành làm đẹp được bằng cách chia nhỏ, mà chia nhỏ lại được khuyến khích.",
      "Chỉ số khó làm đẹp nhất: thời gian từ nhận yêu cầu tới người dùng dùng được.",
      "Đọc ước lượng như một KHOẢNG có mức tin cậy, không như một con số."
    ],
    "practicePrompt": {
      "question": "Đội bạn muốn cải thiện chỉ số hiệu quả. Nên chọn đo cái gì?",
      "options": [
        "Thời gian từ lúc nhận yêu cầu tới lúc người dùng dùng được, và phân bố của nó",
        "Số hạng mục hoàn thành mỗi chu kỳ, so sánh giữa các chu kỳ liên tiếp",
        "Tỷ lệ hạng mục hoàn thành đúng hạn theo kế hoạch đã cam kết",
        "Số giờ làm việc thực tế so với số giờ đã ước lượng cho từng hạng mục"
      ],
      "correct": 0,
      "explanation": "Chữ PHÂN BỐ là phần quan trọng: giá trị trung bình của chỉ số này che mất phần đuôi, và phần đuôi - những hạng mục mất ba tháng - mới là chỗ có vấn đề đáng sửa."
    },
    "summary": {
      "keyIdea": "Mọi chỉ số về hiệu quả của đội đều bị chính đội đó điều chỉnh được.",
      "formula": "Đo thời gian từ ý tưởng tới người dùng, nhìn cả phân bố, đọc ước lượng như khoảng.",
      "commonMistake": "Coi tỷ lệ đúng hạn cao là dấu hiệu tốt thay vì dấu hiệu có phần dư.",
      "action": "Đo thời gian từ lúc nhận yêu cầu tới lúc người dùng dùng được."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Với năm hạng mục gần nhất, đo thời gian từ lúc yêu cầu được nhận tới lúc người dùng thật sự dùng được - không phải từ lúc bắt đầu viết mã.",
      "secondary": "Khoảng chênh giữa hai cách đo đó thường lớn hơn nhiều so với mọi người nghĩ, và nó nằm ở phần chờ chứ không ở phần làm."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Mọi chỉ số về hiệu quả của đội đều bị chính đội đó điều chỉnh được, và biết cơ chế đó là điều kiện để đọc chúng cho đúng."
      },
      {
        "type": "heading",
        "text": "Vì sao đúng hạn 100% là dấu hiệu xấu"
      },
      {
        "type": "callout",
        "label": "Sai số phải có ở cả hai chiều",
        "text": "Ước lượng là dự đoán về công việc chưa làm. Nếu mọi ước lượng đều đúng hoặc dư thì nó không còn là dự đoán mà là một cam kết có đệm sẵn - hoặc phạm vi đang bị cắt âm thầm để vừa với hạn."
      },
      {
        "type": "paragraph",
        "text": "Vế thứ hai nguy hiểm hơn vế thứ nhất vì nó vô hình: một hạng mục trễ hai tuần khởi động một cuộc trò chuyện, còn một hạng mục xong đúng hạn với một nửa nội dung thì không khởi động gì cả."
      },
      {
        "type": "heading",
        "text": "Chỉ số nào làm đẹp được"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Số hạng mục hoàn thành",
          "text": "Tăng lên chỉ bằng cách chia nhỏ hạng mục - mà chia nhỏ lại là việc được khuyến khích vì lý do khác. Con số tăng mà không ai làm gì sai."
        },
        "right": {
          "label": "Thời gian tới người dùng",
          "text": "Rút ngắn nó đòi hỏi cải thiện thật ở toàn bộ chuỗi: làm rõ yêu cầu, viết mã, rà soát, kiểm thử, phát hành."
        }
      },
      {
        "type": "paragraph",
        "text": "Và nhìn cả PHÂN BỐ của chỉ số đó, không chỉ giá trị trung bình. Trung bình che mất phần đuôi, mà phần đuôi - những hạng mục mất ba tháng - mới là chỗ có vấn đề đáng sửa."
      },
      {
        "type": "closing",
        "lines": [
          "Cuối cùng, đọc ước lượng như một KHOẢNG có mức tin cậy, không như một con số duy nhất.",
          "Nhân thêm hệ số dự phòng chỉ chuyển phần đệm sang chỗ khác mà vẫn giấu mức không chắc chắn; một khoảng thì nói thẳng điều đó và cho người nhận quyết định dựa trên rủi ro thật."
        ]
      }
    ]
  },
];
