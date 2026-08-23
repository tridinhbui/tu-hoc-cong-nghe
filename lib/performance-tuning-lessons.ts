import type { Lesson } from "./lesson-types";

// Chặng "Tối ưu hiệu năng và quản trị rủi ro vận hành" (ids 1411-1414).
//
// Chặng hiệu năng ở phần đầu dừng ở "đo trước, tìm nút thắt sau". Bốn bài này
// đi tiếp vào phần mà người làm nghề gặp ngay sau đó: đọc một hồ sơ CPU, áp
// lực thu gom rác, đo độ nhạy của tham số, và vì sao độ trễ trung bình nói dối.

export const PERFORMANCE_TUNING_LESSONS: Lesson[] = [
  {
    "id": 1411,
    "slug": "ho-so-cpu-do-truoc-khi-doan",
    "title": "Tối ưu, Bài 1: Hồ sơ CPU - đo trước khi đoán",
    "subtitle": "Trực giác về chỗ chậm sai gần như mọi lần, và cái giá của việc tin nó là tối ưu nhầm chỗ.",
    "duration": "11 phút",
    "difficulty": "Khó",
    "track": "professional",
    "emoji": "⚖️",
    "whyItMatters": "Tối ưu nhầm chỗ không chỉ vô ích - nó để lại mã phức tạp hơn ở đúng nơi không cần, và làm chỗ thật sự chậm khó sửa hơn về sau.",
    "openingQuestion": "Vì sao phải đo trước khi tối ưu?",
    "openingOptions": [
      "Vì thời gian thường dồn vào chỗ không ai đoán, và tối ưu nhầm để lại mã phức tạp vô ích",
      "Vì thật sự cần có số liệu ban đầu để chứng minh được đã được mức cải thiện sau mỗi khi tối ưu xong",
      "Vì việc đo giúp phát hiện thêm những vấn đề khác ngoài vấn đề đang xử lý",
      "Vì các công cụ đo hiệu năng cần chạy một lượt để thiết lập ngưỡng so sánh"
    ],
    "correctOption": 0,
    "explanation": "Mắt người bị hút về đoạn mã trông phức tạp, còn máy thì tốn thời gian ở chỗ được gọi nhiều lần - hai thứ đó hiếm khi trùng nhau. Vế thứ hai mới là phần đắt: một vòng lặp được viết lại cho nhanh hơn nhưng khó đọc hơn sẽ nằm đó nhiều năm, ở đúng chỗ không cần nó.",
    "diagram": [
      {
        "label": "Mắt người bị hút về mã trông phức tạp",
        "arrow": true
      },
      {
        "label": "Máy tốn thời gian ở chỗ được GỌI NHIỀU LẦN",
        "arrow": true
      },
      {
        "label": "Hai thứ đó hiếm khi trùng nhau",
        "arrow": true
      },
      {
        "label": "Đo trên tải giống thật, không đo trên một lượt chạy đơn lẻ"
      }
    ],
    "realWorldExample": {
      "company": "Thời gian riêng và thời gian gộp",
      "description": "Thời gian riêng là phần một hàm tự tiêu; thời gian gộp còn tính cả những hàm nó gọi. Nhìn nhầm cột là sai lầm phổ biến nhất khi đọc hồ sơ: hàm chính luôn có thời gian gộp gần một trăm phần trăm, và điều đó không nói gì cả."
    },
    "quiz": [
      {
        "question": "Thời gian riêng khác thời gian gộp ở chỗ nào?",
        "options": [
          "Thời gian riêng là phần hàm tự tiêu; thời gian gộp tính cả các hàm nó gọi",
          "Thời gian riêng đo trên một luồng còn thời gian gộp cộng mọi luồng lại",
          "Thời gian riêng không tính thời gian chờ còn thời gian gộp thì có tính",
          "Thời gian riêng đo bằng đồng hồ CPU còn thời gian gộp đo bằng đồng hồ thật"
        ],
        "correct": 0,
        "explanation": "Nhìn nhầm cột là sai lầm phổ biến nhất khi đọc hồ sơ. Hàm chính luôn có thời gian gộp gần một trăm phần trăm, và nếu bạn xếp hạng theo cột đó thì danh sách đầu bảng toàn là các hàm gọi ngoài cùng."
      },
      {
        "question": "Vì sao phải đo trên tải giống thật?",
        "options": [
          "Vì một lượt chạy đơn lẻ không có bộ nhớ đệm lạnh, tranh chấp khoá hay áp lực bộ nhớ",
          "Vì tải thật cho số liệu ổn định hơn hẳn nên rốt cuộc kết quả đo ít dao động giữa tất cả các lần",
          "Vì các công cụ đo cần đủ số mẫu để dựng được hồ sơ có ý nghĩa thống kê",
          "Vì chỉ trên tải thật mới xác định được phần trăm sử dụng CPU của tiến trình"
        ],
        "correct": 0,
        "explanation": "Lựa chọn thứ ba cũng đúng và nó là điều kiện kỹ thuật. Cái này nói về bản chất: ba hiện tượng nêu ra chỉ xuất hiện khi có nhiều việc chạy cùng lúc, và chúng thường là nguyên nhân thật của chỗ chậm."
      },
      {
        "question": "Vì sao hồ sơ lấy mẫu được dùng phổ biến hơn hồ sơ đếm từng lượt gọi?",
        "options": [
          "Vì nó ít làm biến dạng chính thứ đang đo, nên dùng được trên môi trường thật",
          "Vì nó cho kết quả chính xác hơn về số lần mỗi hàm được gọi",
          "Vì nó không cần biên dịch lại mã nguồn trước khi chạy đo đạc",
          "Vì nó ghi được cả những hàm nằm trong thư viện bên thứ ba"
        ],
        "correct": 0,
        "explanation": "Đếm từng lượt gọi làm chậm chương trình nhiều tới mức tỷ lệ giữa các phần thay đổi - bạn đo một chương trình khác với chương trình đang chạy thật. Đổi lại, lấy mẫu bỏ sót các hàm rất ngắn."
      },
      {
        "question": "Điều gì làm cho hồ sơ CPU không giải thích được chỗ chậm?",
        "options": [
          "Khi thời gian bị tiêu vào việc CHỜ chứ không vào việc tính toán",
          "Khi chương trình chạy trên nhiều luồng nên hồ sơ bị phân tán",
          "Khi mã đã được trình biên dịch tối ưu nên tên hàm không còn khớp",
          "Khi khoảng thời gian đo quá ngắn nên số mẫu thu được không đủ nhiều"
        ],
        "correct": 0,
        "explanation": "Chờ mạng, chờ đĩa, chờ khoá - CPU rảnh nên hồ sơ CPU không thấy gì, mà người dùng thì vẫn chờ. Đây là lý do phải biết trước mình đang bị giới hạn bởi tính toán hay bởi chờ đợi."
      },
      {
        "question": "Sau khi tối ưu xong, việc bắt buộc phải làm là gì?",
        "options": [
          "Đo lại trên cùng điều kiện, vì một phần đáng kể các lượt tối ưu không cải thiện gì",
          "Viết tài liệu mô tả thay đổi để người sau hiểu được vì sao mã đã được viết như vậy",
          "Chạy lại toàn bộ bộ kiểm thử để đảm bảo thay đổi không làm hỏng chức năng",
          "So sánh mức sử dụng tài nguyên trước và sau để tính chi phí tiết kiệm được"
        ],
        "correct": 0,
        "explanation": "Ba việc kia đều nên làm. Cái này thì bắt buộc vì nếu bỏ qua, bạn giữ lại một đoạn mã phức tạp hơn để đổi lấy một cải thiện chưa từng được xác nhận là có thật."
      }
    ],
    "keyTakeaways": [
      "Mắt người bị hút về mã phức tạp; máy tốn thời gian ở chỗ được gọi nhiều lần.",
      "Thời gian RIÊNG là phần hàm tự tiêu - xếp hạng theo thời gian gộp là nhìn nhầm cột.",
      "Đo trên tải giống thật: đệm lạnh, tranh chấp khoá và áp lực bộ nhớ chỉ có ở đó.",
      "Hồ sơ CPU mù với thời gian CHỜ - chờ mạng, chờ đĩa, chờ khoá đều không hiện lên.",
      "Đo lại sau khi tối ưu, nếu không bạn giữ mã phức tạp đổi lấy cải thiện chưa xác nhận."
    ],
    "practicePrompt": {
      "question": "Hồ sơ CPU cho thấy không hàm nào chiếm quá 3%. Kết luận gì?",
      "options": [
        "Nhiều khả năng thời gian đang bị tiêu vào việc chờ, không vào việc tính toán",
        "Chương trình đã được tối ưu tốt nên không còn điểm nghẽn nào rõ rệt",
        "Cần đo trong khoảng thời gian dài hơn để các hàm chậm lộ rõ hơn",
        "Chi phí đang rải đều nên buộc phải tối ưu rất nhiều chỗ cùng lúc mới có tác dụng"
      ],
      "correct": 0,
      "explanation": "Một hồ sơ phẳng thường không phải là chương trình cân bằng - nó là dấu hiệu CPU rảnh trong lúc có người đang chờ. Bước tiếp theo là đo thời gian thật từ đầu tới cuối và tìm chỗ chênh với thời gian CPU."
    },
    "summary": {
      "keyIdea": "Trực giác về chỗ chậm sai gần như mọi lần; cái giá là tối ưu nhầm chỗ.",
      "formula": "Đo trên tải thật → xếp theo thời gian riêng → sửa một chỗ → đo lại.",
      "commonMistake": "Xếp hạng theo thời gian gộp, nên đầu bảng toàn hàm gọi ngoài cùng.",
      "action": "Chạy một lượt đo hồ sơ trên tải thật và xem ba hàm đầu bảng."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Chạy một lượt đo hồ sơ trên môi trường có tải giống thật và xem ba hàm đầu bảng theo THỜI GIAN RIÊNG.",
      "secondary": "So chúng với ba chỗ mà bạn đoán là chậm trước khi đo. Nếu hai danh sách khác nhau - và chúng thường khác - bạn vừa tiết kiệm được một tuần tối ưu nhầm chỗ."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Tối ưu nhầm chỗ không chỉ vô ích. Nó để lại mã phức tạp hơn ở đúng nơi không cần, và làm chỗ thật sự chậm khó sửa hơn về sau."
      },
      {
        "type": "heading",
        "text": "Vì sao trực giác sai"
      },
      {
        "type": "callout",
        "label": "Hai thứ hiếm khi trùng nhau",
        "text": "Mắt người bị hút về đoạn mã trông phức tạp - nhiều vòng lặp lồng nhau, nhiều điều kiện. Máy thì tốn thời gian ở chỗ được GỌI NHIỀU LẦN, kể cả khi mỗi lượt gọi rất rẻ."
      },
      {
        "type": "heading",
        "text": "Đọc hồ sơ"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Thời gian riêng",
          "text": "Phần một hàm TỰ tiêu. Đây là cột để xếp hạng."
        },
        "right": {
          "label": "Thời gian gộp",
          "text": "Còn tính cả các hàm nó gọi. Hàm chính luôn gần một trăm phần trăm - xếp theo cột này thì đầu bảng toàn hàm gọi ngoài cùng."
        }
      },
      {
        "type": "heading",
        "text": "Đo ở đâu"
      },
      {
        "type": "paragraph",
        "text": "Trên tải GIỐNG THẬT. Một lượt chạy đơn lẻ trên máy cá nhân không có bộ nhớ đệm lạnh, không có tranh chấp khoá, không có áp lực bộ nhớ - và ba thứ đó thường chính là nguyên nhân thật."
      },
      {
        "type": "paragraph",
        "text": "Dùng hồ sơ LẤY MẪU chứ không đếm từng lượt gọi. Đếm từng lượt làm chậm chương trình nhiều tới mức tỷ lệ giữa các phần thay đổi, và bạn đo một chương trình khác với chương trình đang chạy thật."
      },
      {
        "type": "heading",
        "text": "Giới hạn của công cụ này"
      },
      {
        "type": "paragraph",
        "text": "Hồ sơ CPU mù với thời gian CHỜ. Chờ mạng, chờ đĩa, chờ khoá - CPU rảnh nên hồ sơ không thấy gì, mà người dùng thì vẫn chờ. Một hồ sơ phẳng, không hàm nào quá vài phần trăm, thường là dấu hiệu của chuyện này."
      },
      {
        "type": "closing",
        "lines": [
          "Và luôn ĐO LẠI sau khi sửa, trên cùng điều kiện. Một phần đáng kể các lượt tối ưu không cải thiện gì đo được.",
          "Bỏ qua bước này thì bạn giữ lại một đoạn mã phức tạp hơn để đổi lấy một cải thiện chưa từng được xác nhận là có thật."
        ]
      }
    ]
  },
  {
    "id": 1412,
    "slug": "cap-phat-bo-nho-va-ap-luc-thu-gom-rac",
    "title": "Tối ưu, Bài 2: Cấp phát bộ nhớ và áp lực thu gom rác",
    "subtitle": "Phần lớn chỗ chậm mang tiếng là do thu gom rác thật ra là do cấp phát quá nhiều.",
    "duration": "13 phút",
    "difficulty": "Khó",
    "track": "professional",
    "emoji": "🧮",
    "whyItMatters": "Chỉnh tham số bộ thu gom rác là việc dễ làm và hiếm khi giúp; giảm số lần cấp phát thì khó hơn và gần như luôn giúp.",
    "openingQuestion": "Ứng dụng dừng ngắt quãng vì thu gom rác. Nên sửa ở đâu trước?",
    "openingOptions": [
      "Ở chỗ cấp phát - vì bộ thu gom chỉ bận đúng bằng lượng rác mà mã tạo ra",
      "Ở tham số của bộ thu gom rác, vì cấu hình mặc định hiếm khi phù hợp",
      "Ở kích thước vùng nhớ được cấp cho tiến trình, vì vùng lớn thì thu gom thưa hơn",
      "Ở phiên bản môi trường chạy, vì các phiên bản mới có bộ thu gom tốt hơn"
    ],
    "correctOption": 0,
    "explanation": "Bộ thu gom rác không tự sinh ra việc cho mình - nó bận đúng bằng lượng rác mã của bạn tạo ra. Ba lựa chọn kia đều có thể giúp và đều là cách dời vấn đề: vùng nhớ lớn hơn nghĩa là mỗi lượt dừng dài hơn, phiên bản mới nghĩa là cùng lượng rác được dọn hiệu quả hơn một chút.",
    "diagram": [
      {
        "label": "Bộ thu gom bận đúng bằng lượng rác mã tạo ra",
        "arrow": true
      },
      {
        "label": "Đối tượng chết trẻ thì rẻ; đối tượng sống sót thì đắt",
        "arrow": true
      },
      {
        "label": "Tìm chỗ cấp phát trong vòng lặp và trong đường nóng",
        "arrow": true
      },
      {
        "label": "Đo bằng tỷ lệ cấp phát, không bằng mức bộ nhớ đang dùng"
      }
    ],
    "realWorldExample": {
      "company": "Đối tượng sống sót mới là đắt",
      "description": "Phần lớn bộ thu gom rác hiện đại dọn đối tượng chết trẻ gần như miễn phí. Cái đắt là đối tượng sống qua vài lượt dọn rồi mới chết - nó bị sao chép qua lại giữa các vùng nhiều lần trước khi được bỏ đi."
    },
    "quiz": [
      {
        "question": "Vì sao đối tượng chết trẻ rẻ hơn đối tượng sống lâu rồi mới chết?",
        "options": [
          "Vì đối tượng sống sót bị sao chép qua lại giữa các vùng nhiều lần trước khi bỏ",
          "Vì đối tượng chết trẻ thường xuyên có kích thước nhỏ hơn hẳn nên rốt cuộc tốn ít công dọn hơn",
          "Vì đối tượng sống lâu nằm ở vùng nhớ được dọn theo lịch thưa hơn nhiều",
          "Vì bộ thu gom rác ưu tiên dọn các đối tượng mới được tạo ra gần nhất"
        ],
        "correct": 0,
        "explanation": "Đây là lý do một bộ đệm giữ đối tượng đúng đủ lâu để chúng được thăng hạng rồi mới bỏ là mẫu tệ nhất cho bộ thu gom rác - tệ hơn cả việc không có bộ đệm nào."
      },
      {
        "question": "Chỉ số nào phản ánh áp lực thu gom rác tốt nhất?",
        "options": [
          "Tỷ lệ cấp phát, tức lượng bộ nhớ được cấp mới trên mỗi đơn vị thời gian",
          "Mức bộ nhớ mà tiến trình đang chiếm dụng tại một thời điểm quan sát",
          "Số lần bộ thu gom rác chạy trong một khoảng thời gian nhất định",
          "Tỷ lệ phần trăm thời gian CPU mà bộ thu gom rác đang sử dụng"
        ],
        "correct": 0,
        "explanation": "Mức bộ nhớ đang dùng có thể phẳng trong khi hệ thống cấp phát và bỏ đi hàng gigabyte mỗi phút. Lựa chọn cuối là hệ quả và nó tới muộn - tỷ lệ cấp phát là nguyên nhân và nó chỉ thẳng vào chỗ cần sửa."
      },
      {
        "question": "Chỗ nào nên tìm đầu tiên khi muốn giảm cấp phát?",
        "options": [
          "Các đối tượng tạm được tạo bên trong vòng lặp hoặc trên đường xử lý nóng",
          "các cấu trúc dữ liệu lớn đã được giữ ở ngay trong bộ nhớ suốt vòng đời tiến trình",
          "Các đối tượng được tạo trong quá trình khởi động của ứng dụng",
          "Các bản sao dữ liệu được tạo khi truyền tham số giữa các hàm"
        ],
        "correct": 0,
        "explanation": "Một đối tượng tạm trong vòng lặp chạy một triệu lần là một triệu lượt cấp phát. Cấu trúc lớn giữ lâu thì tốn bộ nhớ nhưng không tạo áp lực thu gom, vì nó không sinh ra rác."
      },
      {
        "question": "Vì sao tăng kích thước vùng nhớ không phải cách chữa tốt?",
        "options": [
          "Vì thu gom thưa hơn nhưng mỗi lượt dừng lại dài hơn, nên đuôi độ trễ tệ đi",
          "Vì hệ thống có thể hoàn toàn không đủ bộ nhớ vật lý để cấp thêm cho vùng nhớ lớn hơn",
          "Vì bộ thu gom rác cần thời gian khởi động lâu hơn với vùng nhớ lớn",
          "Vì chi phí thuê máy chủ tăng theo lượng bộ nhớ được cấp phát"
        ],
        "correct": 0,
        "explanation": "Đây là đánh đổi ít được nói rõ: bạn đổi tần suất lấy độ dài, và nếu vấn đề của bạn là độ trễ đuôi thì đó là đổi sai chiều. Ba lựa chọn kia là ràng buộc về tài nguyên chứ không phải về hành vi."
      },
      {
        "question": "Vì sao dùng lại đối tượng không phải lúc nào cũng tốt?",
        "options": [
          "Vì nó giữ đối tượng sống lâu, biến thứ rẻ để dọn thành thứ đắt để dọn",
          "Vì việc quản lý nhóm đối tượng dùng lại tốn thêm bộ nhớ để lưu trạng thái",
          "Vì đối tượng dùng lại có thể còn giữ dữ liệu cũ và gây lỗi logic khó tìm",
          "Vì mã trở nên phức tạp hơn hẳn nên khó bảo trì ở ngay trong khoảng thời gian dài"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là chi phí thật của mẫu này. Cái này ngược đời hơn và hay bị bỏ qua: một nhóm đối tượng dùng lại được thiết kế để giảm áp lực thu gom lại có thể làm nó tệ hơn."
      }
    ],
    "keyTakeaways": [
      "Bộ thu gom rác bận đúng bằng lượng rác mã tạo ra - sửa ở chỗ CẤP PHÁT.",
      "Đối tượng chết trẻ gần như miễn phí; đối tượng sống sót vài lượt mới là đắt.",
      "Đo bằng TỶ LỆ CẤP PHÁT, không bằng mức bộ nhớ đang dùng - mức có thể phẳng.",
      "Tìm đối tượng tạm trong vòng lặp và trên đường nóng trước mọi chỗ khác.",
      "Tăng vùng nhớ là đổi tần suất lấy độ dài - sai chiều nếu vấn đề là độ trễ đuôi."
    ],
    "practicePrompt": {
      "question": "Mức bộ nhớ phẳng suốt ngày nhưng ứng dụng vẫn dừng ngắt quãng. Giải thích?",
      "options": [
        "Hệ thống đang cấp phát và bỏ đi rất nhiều, mà mức đang dùng không cho thấy điều đó",
        "Có rò rỉ bộ nhớ ở một vùng mà công cụ theo dõi hiện tại không quan sát được",
        "Các lượt dừng đến từ nguyên nhân khác chứ không liên quan tới thu gom rác",
        "Bộ thu gom rác đang được cấu hình để chạy theo đúng lịch cố định thay vì theo nhu cầu"
      ],
      "correct": 0,
      "explanation": "Mức bộ nhớ là ảnh chụp tại một thời điểm; tỷ lệ cấp phát là dòng chảy. Một hệ thống cấp phát và bỏ đi hàng gigabyte mỗi phút có thể giữ mức phẳng hoàn hảo trong khi bộ thu gom chạy liên tục."
    },
    "summary": {
      "keyIdea": "Phần lớn chỗ chậm mang tiếng do thu gom rác thật ra là do cấp phát quá nhiều.",
      "formula": "Đo tỷ lệ cấp phát → tìm đối tượng tạm trong vòng lặp → giảm số lượt cấp phát.",
      "commonMistake": "Chỉnh tham số bộ thu gom, việc dễ làm và hiếm khi giúp.",
      "action": "Đo tỷ lệ cấp phát của ứng dụng, không phải mức bộ nhớ đang dùng."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Tìm chỉ số TỶ LỆ CẤP PHÁT trong công cụ theo dõi của bạn - lượng bộ nhớ cấp mới mỗi giây. Phần lớn bảng theo dõi chỉ hiển thị mức đang dùng.",
      "secondary": "Nếu con số đó lớn trong khi mức bộ nhớ phẳng, bạn vừa tìm ra nguyên nhân của những lượt dừng mà không ai giải thích được."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chỉnh tham số bộ thu gom rác là việc dễ làm và hiếm khi giúp. Giảm số lần cấp phát thì khó hơn và gần như luôn giúp."
      },
      {
        "type": "heading",
        "text": "Vì sao sửa ở chỗ cấp phát"
      },
      {
        "type": "callout",
        "label": "Bộ thu gom không tự sinh việc cho mình",
        "text": "Nó bận đúng bằng lượng rác mà mã của bạn tạo ra. Mọi cách chỉnh tham số đều là dời vấn đề: vùng nhớ lớn hơn nghĩa là mỗi lượt dừng dài hơn, phiên bản mới nghĩa là cùng lượng rác được dọn hiệu quả hơn một chút."
      },
      {
        "type": "heading",
        "text": "Rác nào rẻ, rác nào đắt"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Chết trẻ",
          "text": "Gần như miễn phí với phần lớn bộ thu gom hiện đại. Tạo ra rồi bỏ ngay trong cùng một lượt xử lý."
        },
        "right": {
          "label": "Sống sót vài lượt",
          "text": "Đắt. Nó bị sao chép qua lại giữa các vùng nhiều lần trước khi được bỏ đi."
        }
      },
      {
        "type": "paragraph",
        "text": "Hệ quả ngược đời: một bộ đệm giữ đối tượng đúng đủ lâu để chúng được thăng hạng rồi mới bỏ là mẫu TỆ NHẤT cho bộ thu gom rác - tệ hơn cả việc không có bộ đệm nào. Nhóm đối tượng dùng lại cũng dính đúng cái bẫy đó."
      },
      {
        "type": "heading",
        "text": "Đo cái gì"
      },
      {
        "type": "paragraph",
        "text": "TỶ LỆ CẤP PHÁT, không phải mức bộ nhớ đang dùng. Mức đang dùng là ảnh chụp tại một thời điểm và nó có thể phẳng hoàn hảo trong khi hệ thống cấp phát rồi bỏ đi hàng gigabyte mỗi phút."
      },
      {
        "type": "closing",
        "lines": [
          "Chỗ tìm đầu tiên: đối tượng TẠM được tạo bên trong vòng lặp hoặc trên đường xử lý nóng. Một đối tượng tạm trong vòng lặp chạy một triệu lần là một triệu lượt cấp phát.",
          "Cấu trúc dữ liệu lớn giữ suốt vòng đời thì tốn bộ nhớ nhưng không tạo áp lực - nó không sinh ra rác."
        ]
      }
    ]
  },
  {
    "id": 1413,
    "slug": "do-nhay-tham-so-nao-chi-phoi-do-tre",
    "title": "Tối ưu, Bài 3: Độ nhạy - tham số nào thật sự chi phối độ trễ",
    "subtitle": "Một hệ thống có hàng chục tham số chỉnh được, và thường chỉ hai hoặc ba cái làm nên khác biệt.",
    "duration": "12 phút",
    "difficulty": "Khó",
    "track": "professional",
    "emoji": "📐",
    "whyItMatters": "Chỉnh mò từng tham số một là cách tốn thời gian nhất, và nó còn để lại một cấu hình mà không ai nhớ vì sao lại đặt như thế.",
    "openingQuestion": "Làm sao biết tham số nào đáng chỉnh?",
    "openingOptions": [
      "Đổi từng cái một quanh giá trị hiện tại và đo độ trễ đổi bao nhiêu theo mỗi cái",
      "Chỉnh theo khuyến nghị trong tài liệu của thư viện hoặc hệ quản trị đang dùng",
      "Đổi nhiều tham số cùng lúc để tìm nhanh cấu hình cho kết quả tốt nhất",
      "Chọn tất cả các tham số liên quan trực tiếp tới thành phần đang chậm nhất ở ngay trong hồ sơ"
    ],
    "correctOption": 0,
    "explanation": "Đây là phép đo độ nhạy: giữ mọi thứ khác cố định, đổi một tham số quanh giá trị hiện tại, và ghi lại độ trễ đổi bao nhiêu. Đổi nhiều cái cùng lúc thì bạn không quy được kết quả cho cái nào, và nếu hai thay đổi tác dụng ngược chiều thì tổng có thể bằng không - bạn kết luận cả hai đều vô dụng.",
    "diagram": [
      {
        "label": "Giữ mọi thứ cố định, đổi MỘT tham số quanh giá trị hiện tại",
        "arrow": true
      },
      {
        "label": "Ghi lại độ trễ đổi bao nhiêu theo mỗi tham số",
        "arrow": true
      },
      {
        "label": "Thường chỉ hai hoặc ba cái làm nên khác biệt",
        "arrow": true
      },
      {
        "label": "Độ nhạy đo TẠI ĐIỂM HIỆN TẠI - đi xa thì nó đổi"
      }
    ],
    "realWorldExample": {
      "company": "Độ nhạy chỉ đúng ở lân cận",
      "description": "Số kết nối trong nhóm có thể gần như không ảnh hưởng gì trong khoảng từ hai mươi tới năm mươi, rồi thành tham số quan trọng nhất khi vượt qua giới hạn của cơ sở dữ liệu phía sau. Một phép đo độ nhạy nói về lân cận điểm hiện tại, không nói về toàn bộ khoảng giá trị."
    },
    "quiz": [
      {
        "question": "Vì sao đổi nhiều tham số cùng lúc là sai?",
        "options": [
          "Vì hai thay đổi tác dụng ngược chiều có thể triệt tiêu nhau và bạn kết luận cả hai vô dụng",
          "Vì số lượng tổ hợp cần thử tăng quá nhanh nên không đủ thời gian đo hết",
          "Vì mỗi tham số cần một khoảng thời gian ổn định khác nhau sau khi được thay đổi, và khoảng đó không đo trước được",
          "Vì một số tham số chỉ có hiệu lực sau khi tiến trình được khởi động lại"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia là khó khăn về quy trình. Cái này là lỗi suy luận và nó tệ hơn ở chỗ nó cho ra một kết luận SAI mà bạn tin tưởng, thay vì chỉ làm bạn chậm."
      },
      {
        "question": "Vì sao độ nhạy chỉ đúng ở lân cận điểm hiện tại?",
        "options": [
          "Vì quan hệ giữa tham số và độ trễ thường có ngưỡng, và qua ngưỡng thì nó đổi hẳn",
          "Vì tất cả các phép đo có sai số nên rốt cuộc kết quả chỉ tin được ở ngay trong khoảng hẹp",
          "Vì tải của hệ thống thay đổi theo đúng khoảng thời gian nên rốt cuộc số đo cũ nhanh lỗi thời",
          "Vì tất cả các tham số ảnh hưởng lẫn nhau nên rốt cuộc độ nhạy thay đổi mỗi khi tham số khác đổi"
        ],
        "correct": 0,
        "explanation": "Lựa chọn cuối cũng đúng và nó nói về tương tác giữa các tham số. Ngưỡng thì rõ hơn: số kết nối có thể vô hại từ hai mươi tới năm mươi rồi thành quan trọng nhất khi vượt sức chịu của cơ sở dữ liệu phía sau."
      },
      {
        "question": "Vì sao cần ghi lại lý do đằng sau mỗi giá trị cấu hình?",
        "options": [
          "Vì không có nó thì sáu tháng sau không ai dám đổi và cũng không ai biết vì sao là thế",
          "Vì tất cả các công cụ quản lý cấu hình đều yêu cầu một mô tả cho từng tham số được thay đổi",
          "Vì cần bằng chứng khi giải thích quyết định cấu hình cho người rà soát",
          "Vì lý do giúp người mới trong đội hiểu được kiến trúc của hệ thống nhanh hơn"
        ],
        "correct": 0,
        "explanation": "Một cấu hình không ai dám đổi là một cấu hình đã đóng băng, và nó đóng băng ở giá trị phù hợp với hệ thống của hai năm trước. Đây là loại nợ kỹ thuật lặng lẽ nhất."
      },
      {
        "question": "Điều gì nên làm trước khi bắt đầu chỉnh tham số?",
        "options": [
          "Xác định xem hệ thống đang bị giới hạn bởi cái gì - tính toán, chờ đợi hay bộ nhớ",
          "Ghi lại toàn bộ giá trị cấu hình hiện tại để có thể khôi phục lại chúng mỗi khi cần tới",
          "Chuẩn bị một môi trường riêng có cấu hình giống hệt môi trường thật",
          "Đặt mục tiêu cụ thể về mức độ trễ mà việc chỉnh tham số cần đạt được"
        ],
        "correct": 0,
        "explanation": "Ba việc kia đều nên làm và đều là chuẩn bị. Cái này quyết định bạn có nên chỉnh tham số hay không: nếu điểm nghẽn nằm ở một lượt gọi ra ngoài chậm thì không tham số nội bộ nào chữa được."
      },
      {
        "question": "Kết quả của một lượt đo độ nhạy nên được đọc thế nào?",
        "options": [
          "Như một danh sách xếp hạng để biết chỉnh cái gì trước, không phải một cấu hình tối ưu",
          "Như một tập giá trị tối ưu có thể áp dụng trực tiếp cho hệ thống đang chạy",
          "Như một bằng chứng cho thấy hệ thống đã chạm tới đúng giới hạn của kiến trúc hiện tại rồi",
          "Như một cơ sở để so sánh hiệu năng giữa các phiên bản khác nhau của ứng dụng"
        ],
        "correct": 0,
        "explanation": "Vì độ nhạy chỉ đúng ở lân cận, kết quả không cho ra một cấu hình tối ưu toàn cục. Nó trả lời một câu hẹp hơn nhưng hữu ích hơn: trong hàng chục tham số, cái nào đáng bỏ công tiếp theo."
      }
    ],
    "keyTakeaways": [
      "Giữ mọi thứ cố định, đổi MỘT tham số - đổi nhiều cái thì hai tác dụng có thể triệt tiêu.",
      "Thường chỉ hai hoặc ba tham số trong hàng chục cái làm nên khác biệt.",
      "Độ nhạy đúng ở LÂN CẬN điểm hiện tại; qua một ngưỡng thì quan hệ đổi hẳn.",
      "Xác định hệ thống bị giới hạn bởi cái gì TRƯỚC - có khi không tham số nào chữa được.",
      "Ghi lại lý do cho mỗi giá trị, nếu không cấu hình sẽ đóng băng ở hệ thống hai năm trước."
    ],
    "practicePrompt": {
      "question": "Bạn đo được hai tham số cùng có độ nhạy cao. Nên chỉnh cái nào trước?",
      "options": [
        "Cái ít rủi ro hơn khi đặt sai, vì hai cái có độ nhạy tương đương thì rủi ro là tiêu chí còn lại",
        "Cái có độ nhạy cao hơn dù chênh lệch giữa hai cái là không đáng kể",
        "Cả hai cùng lúc vì chúng đều đã được xác nhận là có ảnh hưởng lớn",
        "Cái nằm ở thành phần chậm nhất theo hồ sơ hiệu năng đã đo trước đó"
      ],
      "correct": 0,
      "explanation": "Độ nhạy nói về mức cải thiện có thể có, nó không nói gì về thiệt hại khi đặt sai. Một tham số về thời gian chờ đặt quá thấp có thể làm hỏng cả luồng, còn một tham số về kích thước bộ đệm thì chỉ tốn thêm bộ nhớ."
    },
    "summary": {
      "keyIdea": "Hàng chục tham số chỉnh được, và thường chỉ hai ba cái làm nên khác biệt.",
      "formula": "Giữ cố định → đổi một cái → đo → xếp hạng theo mức ảnh hưởng.",
      "commonMistake": "Đổi nhiều cái cùng lúc, rồi kết luận sai mà vẫn tin tưởng.",
      "action": "Chọn ba tham số và đo độ nhạy của từng cái quanh giá trị hiện tại."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Chọn ba tham số mà bạn nghĩ là quan trọng, đổi từng cái quanh giá trị hiện tại, và ghi lại độ trễ đổi bao nhiêu.",
      "secondary": "Rồi ghi kết quả vào ngay cạnh giá trị cấu hình. Sáu tháng sau, đó là thứ phân biệt một cấu hình có lý do với một cấu hình không ai dám đổi."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một hệ thống có hàng chục tham số chỉnh được, và thường chỉ hai hoặc ba cái làm nên khác biệt. Chỉnh mò từng cái là cách tốn thời gian nhất."
      },
      {
        "type": "heading",
        "text": "Phép đo"
      },
      {
        "type": "callout",
        "label": "Một tham số một lượt",
        "text": "Giữ mọi thứ khác cố định, đổi một tham số quanh giá trị hiện tại, ghi lại độ trễ đổi bao nhiêu. Đổi nhiều cái cùng lúc thì hai thay đổi tác dụng ngược chiều có thể triệt tiêu nhau - và bạn kết luận cả hai đều vô dụng."
      },
      {
        "type": "heading",
        "text": "Giới hạn của kết quả"
      },
      {
        "type": "paragraph",
        "text": "Độ nhạy đo TẠI ĐIỂM HIỆN TẠI. Số kết nối trong nhóm có thể gần như không ảnh hưởng gì trong khoảng từ hai mươi tới năm mươi, rồi thành tham số quan trọng nhất khi vượt qua giới hạn của cơ sở dữ liệu phía sau."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Kết quả cho bạn",
          "text": "Một danh sách XẾP HẠNG: trong hàng chục tham số, cái nào đáng bỏ công tiếp theo."
        },
        "right": {
          "label": "Kết quả KHÔNG cho bạn",
          "text": "Một cấu hình tối ưu. Vì độ nhạy chỉ đúng ở lân cận, không có gì đảm bảo giá trị tốt nhất nằm gần chỗ bạn đang đứng."
        }
      },
      {
        "type": "heading",
        "text": "Việc phải làm trước"
      },
      {
        "type": "paragraph",
        "text": "Xác định hệ thống đang bị giới hạn bởi cái gì - tính toán, chờ đợi, hay bộ nhớ. Nếu điểm nghẽn nằm ở một lượt gọi ra ngoài chậm thì không tham số nội bộ nào chữa được, và cả tuần chỉnh tham số sẽ cho ra con số không đổi."
      },
      {
        "type": "closing",
        "lines": [
          "Và khi chọn giữa hai tham số có độ nhạy tương đương, chọn cái ÍT RỦI RO hơn khi đặt sai. Độ nhạy nói về mức cải thiện có thể có, nó không nói gì về thiệt hại khi đặt nhầm.",
          "Cuối cùng: ghi LÝ DO ngay cạnh mỗi giá trị. Một cấu hình không ai dám đổi là một cấu hình đã đóng băng ở hệ thống của hai năm trước."
        ]
      }
    ]
  },
  {
    "id": 1414,
    "slug": "do-tre-duoi-vi-sao-trung-binh-noi-doi",
    "title": "Tối ưu, Bài 4: Độ trễ đuôi - vì sao trung bình nói dối",
    "subtitle": "Người dùng không trải nghiệm giá trị trung bình; họ trải nghiệm lượt chậm nhất của mình.",
    "duration": "11 phút",
    "difficulty": "Khó",
    "track": "professional",
    "emoji": "🌋",
    "interactiveType": "tail-risk",
    "whyItMatters": "Một hệ thống có độ trễ trung bình rất đẹp vẫn có thể làm hỏng trải nghiệm của một phần đáng kể người dùng, và bảng theo dõi sẽ không cho thấy điều đó.",
    "openingQuestion": "Vì sao độ trễ trung bình là con số dễ gây hiểu nhầm nhất?",
    "openingOptions": [
      "Vì phân bố độ trễ lệch nặng, nên trung bình nằm ở chỗ ít lượt gọi nào rơi vào",
      "Vì trung bình bị ảnh hưởng bởi các giá trị ngoại lai rất lớn ở phần đuôi",
      "Vì trung bình thay đổi theo tải nên không so sánh được giữa các khoảng thời gian",
      "Vì trung bình không phân biệt được giữa các loại yêu cầu khác nhau"
    ],
    "correctOption": 0,
    "explanation": "Phân bố độ trễ gần như luôn lệch phải: phần lớn lượt gọi rất nhanh, một số ít rất chậm. Trung bình rơi vào khoảng giữa hai nhóm đó - một vùng mà rất ít lượt gọi thật sự nằm ở đấy. Lựa chọn thứ hai nêu đúng cơ chế nhưng nó lại là lý do người ta bỏ trung bình để dùng trung vị, mà trung vị cũng che mất phần đuôi.",
    "diagram": [
      {
        "label": "Phân bố lệch phải: phần lớn nhanh, một số ít rất chậm",
        "arrow": true
      },
      {
        "label": "Trung bình rơi vào vùng ít lượt gọi nào nằm ở đấy",
        "arrow": true
      },
      {
        "label": "Một trang gọi 20 dịch vụ thì p99 của mỗi cái thành chuyện thường",
        "arrow": true
      },
      {
        "label": "Đo phân vị theo NGƯỜI DÙNG, không chỉ theo lượt gọi"
      }
    ],
    "realWorldExample": {
      "company": "Vì sao p99 không hiếm",
      "description": "Một trang gọi hai mươi dịch vụ và phải chờ tất cả. Xác suất ít nhất một lượt gọi rơi vào phần trăm chậm nhất là khoảng mười tám phần trăm - nên gần một phần năm số lần tải trang chạm phải cái mà tên gọi khiến ta tưởng là một trên một trăm."
    },
    "quiz": [
      {
        "question": "Vì sao p99 của từng dịch vụ lại thành chuyện thường với người dùng?",
        "options": [
          "Vì một trang gọi nhiều dịch vụ, nên xác suất ít nhất một lượt rơi vào đuôi là lớn",
          "Vì các dịch vụ chậm cùng lúc do chúng dùng chung một hạ tầng phía sau",
          "Vì phân vị được tính trên toàn bộ lượt gọi chứ không tính riêng cho từng người dùng",
          "Vì các lượt gọi chậm thường được thử lại nên chúng xuất hiện nhiều lần"
        ],
        "correct": 0,
        "explanation": "Với hai mươi lượt gọi độc lập, xác suất ít nhất một cái rơi vào phần trăm chậm nhất là khoảng mười tám phần trăm. Cái tên p99 khiến người ta tưởng đây là chuyện một trên một trăm, còn người dùng thì gặp nó gần một phần năm số lần."
      },
      {
        "question": "Vì sao đo phân vị theo người dùng khác với đo theo lượt gọi?",
        "options": [
          "Vì người dùng hoạt động nhiều đóng góp nhiều lượt gọi, nên họ chi phối con số chung",
          "Vì mỗi người dùng có điều kiện mạng khác nhau nên rốt cuộc con số độ trễ của họ cũng khác nhau",
          "Vì số lượt gọi trên mỗi người dùng thay đổi theo từng phiên làm việc",
          "Vì cần biết người dùng nào đang gặp vấn đề để liên hệ hỗ trợ trực tiếp"
        ],
        "correct": 0,
        "explanation": "Nếu một phần trăm người dùng gặp trải nghiệm rất tệ nhưng họ ít hoạt động, con số theo lượt gọi sẽ không thấy họ. Đo theo người dùng trả lời câu bao nhiêu NGƯỜI đang có trải nghiệm tệ."
      },
      {
        "question": "Vì sao trung vị cũng không đủ?",
        "options": [
          "Vì nó nói về lượt gọi ở giữa và không nói gì về nửa chậm hơn của phân bố",
          "Vì trung vị thay đổi chậm nên nó phát hiện vấn đề muộn hơn trung bình",
          "Vì trung vị khó tính hơn nên nhiều công cụ theo dõi không hỗ trợ sẵn",
          "Vì trung vị hoàn toàn không so sánh được giữa tất cả các dịch vụ có khối lượng khác nhau"
        ],
        "correct": 0,
        "explanation": "Trung vị chữa được khuyết điểm của trung bình là bị kéo bởi ngoại lai, và nó tạo ra khuyết điểm ngược lại: nó hoàn toàn mù với phần đuôi, vốn là phần quyết định trải nghiệm tệ nhất."
      },
      {
        "question": "Vì sao trung bình của các phân vị là phép tính không có nghĩa?",
        "options": [
          "Vì phân vị không cộng được - trung bình của p99 nhiều máy chủ không phải p99 chung",
          "Vì tất cả các máy chủ có khối lượng khác nhau nên rốt cuộc thật sự cần tính trung bình có trọng số",
          "Vì phân vị được tính trên các khoảng thời gian khác nhau ở mỗi máy chủ",
          "Vì cần loại bỏ các máy chủ có ít lượt gọi trước khi tính trung bình"
        ],
        "correct": 0,
        "explanation": "Đây là lỗi phổ biến trong các bảng theo dõi gộp nhiều máy chủ, và nó cho ra con số luôn ĐẸP HƠN sự thật. Muốn có phân vị chung thì phải gộp dữ liệu thô rồi tính, không tính rồi gộp."
      },
      {
        "question": "Biện pháp nào giảm độ trễ đuôi mà không cần làm mọi thứ nhanh hơn?",
        "options": [
          "Gửi yêu cầu tới hai bản sao và lấy kết quả về trước, đổi tài nguyên lấy đuôi ngắn",
          "Tăng số lượng máy chủ để giảm tải trung bình trên mỗi máy trong nhóm",
          "Đặt vùng bộ nhớ đệm cho các yêu cầu thường gặp để có thể giảm bớt số lượt gọi xuống dưới",
          "Giảm thời gian chờ tối đa để các lượt gọi chậm bị cắt sớm hơn"
        ],
        "correct": 0,
        "explanation": "Kỹ thuật này đổi tài nguyên lấy đuôi ngắn và nó hiệu quả vì các lượt chậm thường do nguyên nhân cục bộ trên một máy. Lựa chọn cuối làm con số đẹp lên mà không giúp gì - yêu cầu bị cắt là một yêu cầu thất bại."
      }
    ],
    "keyTakeaways": [
      "Phân bố độ trễ lệch phải, nên trung bình rơi vào vùng ít lượt gọi nào nằm ở đấy.",
      "Trang gọi hai mươi dịch vụ thì gần một phần năm số lần chạm phải phần đuôi.",
      "Đo phân vị theo NGƯỜI DÙNG - người hoạt động nhiều chi phối con số theo lượt gọi.",
      "Trung bình của các phân vị là phép tính vô nghĩa, và nó luôn đẹp hơn sự thật.",
      "Gửi tới hai bản sao và lấy cái về trước: đổi tài nguyên lấy đuôi ngắn."
    ],
    "practicePrompt": {
      "question": "Ai đó đề nghị giảm thời gian chờ tối đa để p99 đẹp hơn. Nên nói gì?",
      "options": [
        "Nó cắt lượt chậm thành lượt thất bại, nên con số đẹp lên mà trải nghiệm tệ đi",
        "Nên thử vì thời gian chờ ngắn giúp giải phóng tài nguyên nhanh hơn cho lượt khác",
        "Cần đo trước xem có bao nhiêu lượt gọi vượt quá thời gian chờ mới đó",
        "Nên áp dụng cho các lượt gọi không quan trọng và giữ nguyên cho lượt quan trọng"
      ],
      "correct": 0,
      "explanation": "Đây là ví dụ rõ nhất của việc tối ưu chỉ số thay vì tối ưu thứ chỉ số đo. Một yêu cầu bị cắt ở ba giây biến mất khỏi phân bố độ trễ và xuất hiện ở tỷ lệ lỗi - nếu không ai nhìn hai con số cùng nhau thì nó trông như một cải thiện."
    },
    "summary": {
      "keyIdea": "Người dùng không trải nghiệm trung bình; họ trải nghiệm lượt chậm nhất của mình.",
      "formula": "Nhìn phân vị cao + đo theo người dùng + gộp dữ liệu thô rồi mới tính.",
      "commonMistake": "Lấy trung bình của các phân vị, cho ra con số luôn đẹp hơn sự thật.",
      "action": "Kiểm xem bảng theo dõi của bạn tính p99 bằng cách gộp thô hay gộp phân vị."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Kiểm xem con số p99 trên bảng theo dõi của bạn được tính bằng cách gộp dữ liệu thô rồi tính, hay tính trên từng máy chủ rồi lấy trung bình.",
      "secondary": "Nếu là cách thứ hai, con số bạn đang nhìn luôn đẹp hơn sự thật - và bạn không biết đẹp hơn bao nhiêu."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một hệ thống có độ trễ trung bình rất đẹp vẫn có thể làm hỏng trải nghiệm của một phần đáng kể người dùng, và bảng theo dõi sẽ không cho thấy điều đó."
      },
      {
        "type": "heading",
        "text": "Vì sao trung bình nói dối"
      },
      {
        "type": "callout",
        "label": "Phân bố lệch phải",
        "text": "Phần lớn lượt gọi rất nhanh, một số ít rất chậm. Trung bình rơi vào khoảng giữa hai nhóm - một vùng mà rất ít lượt gọi thật sự nằm ở đấy. Trung vị chữa được chuyện đó và tạo ra khuyết điểm ngược: nó hoàn toàn mù với phần đuôi."
      },
      {
        "type": "heading",
        "text": "Vì sao phần đuôi không hiếm"
      },
      {
        "type": "paragraph",
        "text": "Một trang gọi hai mươi dịch vụ và phải chờ tất cả. Xác suất ít nhất một lượt rơi vào phần trăm chậm nhất là khoảng mười tám phần trăm - nên gần một phần năm số lần tải trang chạm phải cái mà tên gọi khiến ta tưởng là chuyện một trên một trăm."
      },
      {
        "type": "heading",
        "text": "Hai lỗi khi tính"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Gộp phân vị",
          "text": "Tính p99 trên từng máy chủ rồi lấy trung bình. Phân vị KHÔNG cộng được, và kết quả luôn đẹp hơn sự thật."
        },
        "right": {
          "label": "Gộp thô",
          "text": "Gộp dữ liệu thô của mọi máy chủ rồi mới tính phân vị. Đây là cách duy nhất cho ra con số đúng."
        }
      },
      {
        "type": "paragraph",
        "text": "Lỗi thứ hai: chỉ đo theo lượt gọi. Người dùng hoạt động nhiều đóng góp nhiều lượt gọi nên họ chi phối con số chung, và nếu một phần trăm người dùng có trải nghiệm rất tệ nhưng ít hoạt động thì con số đó không thấy họ."
      },
      {
        "type": "closing",
        "lines": [
          "Một cách giảm đuôi mà không cần làm mọi thứ nhanh hơn: gửi yêu cầu tới hai bản sao và lấy kết quả về trước. Nó đổi tài nguyên lấy đuôi ngắn, và hiệu quả vì lượt chậm thường do nguyên nhân cục bộ trên một máy.",
          "Và cảnh giác với đề nghị giảm thời gian chờ để p99 đẹp hơn: nó cắt lượt chậm thành lượt thất bại, nên con số đẹp lên mà trải nghiệm tệ đi."
        ]
      }
    ]
  },
];
