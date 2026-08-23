import type { Lesson } from "./lesson-types";

// Five "Masterclass" deep-dives that sit at the front of the catalog
// (lib/lessons.ts spreads this array first). They shipped as stubs - two
// headings and two paragraphs each, ~600 characters, the thinnest lessons in
// the whole 436-lesson program despite carrying the most advanced label - and
// were rewritten to the depth the rest of the 1200-block is written at.
//
// Each one is anchored in a Vietnamese situation rather than a textbook one,
// because that is where these topics actually bite: cap rates below mortgage
// rates in HCMC, the 2022 corporate-bond freeze, option pools coming out of
// the founders' side of the table.

export const ADVANCED_MASTERCLASS_LESSONS: Lesson[] = [
  {
    "id": 801,
    "slug": "masterclass-ha-tang-trung-tam-du-lieu",
    "title": "Chuyên đề Masterclass 1: Hạ tầng trung tâm dữ liệu - định mức và chi phí thật",
    "subtitle": "Một máy chủ vật lý có bốn ngân sách, và cái hết trước quyết định bạn mua thêm bao nhiêu.",
    "duration": "14 phút",
    "difficulty": "Khó",
    "track": "bonus",
    "emoji": "🏢",
    "whyItMatters": "Đội quen với hạ tầng thuê theo nhu cầu thường tính chi phí theo số máy, trong khi chi phí thật của một trung tâm dữ liệu bị chi phối bởi những thứ không ai nhìn thấy trên hoá đơn đám mây.",
    "openingQuestion": "Ngân sách nào của một tủ máy chủ thường hết trước tiên?",
    "openingOptions": [
      "Điện và làm mát, chứ không phải chỗ trống để lắp thêm máy",
      "Chỗ trống trong tủ, vì kích thước tủ là giới hạn vật lý cứng nhất",
      "Băng thông mạng, vì các máy trong tủ dùng chung một đường lên",
      "Số cổng kết nối còn trống trên thiết bị chuyển mạch của tủ đó"
    ],
    "correctOption": 0,
    "explanation": "Một tủ có bốn mươi hai vị trí lắp máy nhưng chỉ được cấp một công suất điện nhất định, và máy chủ hiện đại tiêu thụ nhiều hơn thế hệ mà trung tâm dữ liệu được thiết kế cho. Kết quả là rất nhiều tủ chỉ lắp được nửa số vị trí - phần còn lại là chỗ trống mà bạn vẫn trả tiền thuê.",
    "diagram": [
      {
        "label": "Bốn ngân sách: chỗ lắp, điện, làm mát, băng thông",
        "arrow": true
      },
      {
        "label": "Điện và làm mát thường hết trước chỗ lắp",
        "arrow": true
      },
      {
        "label": "Chi phí thật = mua thiết bị + điện + vận hành + thay thế",
        "arrow": true
      },
      {
        "label": "So với đám mây phải so cả bốn, không chỉ giá thiết bị"
      }
    ],
    "realWorldExample": {
      "company": "Tủ nửa trống mà vẫn trả tiền đủ",
      "description": "Rất nhiều trung tâm dữ liệu cũ chỉ lắp được một nửa số vị trí trong mỗi tủ vì công suất điện cấp cho tủ đã hết. Phần vị trí trống đó vẫn nằm trong hợp đồng thuê, nên chi phí thật cho mỗi máy chủ cao gần gấp đôi con số mà bảng tính đưa ra."
    },
    "quiz": [
      {
        "question": "Vì sao công suất điện thường hết trước chỗ lắp máy?",
        "options": [
          "Vì máy chủ đời mới tiêu thụ nhiều hơn thế hệ mà trung tâm dữ liệu được thiết kế cho",
          "Vì các thiết bị mạng trong tủ chiếm phần lớn công suất được cấp",
          "Vì hệ thống làm mát trong phòng dùng chung nguồn điện với chính các máy chủ trong tủ đó",
          "Vì công suất được cấp theo hợp đồng nên thấp hơn nhu cầu thực tế"
        ],
        "correct": 0,
        "explanation": "Đây là chênh lệch giữa hai thế hệ phần cứng chứ không phải sai sót trong thiết kế: một trung tâm dữ liệu được xây cho mật độ công suất của mười năm trước không thể lắp đầy tủ với máy chủ hôm nay."
      },
      {
        "question": "Chi phí thật của một máy chủ tự vận hành gồm những gì?",
        "options": [
          "Giá thiết bị, điện tiêu thụ, công vận hành, và phần dự phòng thay thế khi hỏng",
          "Giá thiết bị và đồng thời chi phí thuê chỗ đặt ở ngay trong trung tâm phần dữ liệu hằng tháng",
          "Giá thiết bị cộng chi phí khấu hao được phân bổ theo tuổi thọ dự kiến",
          "Giá thiết bị và chi phí băng thông mạng mà máy đó sử dụng mỗi tháng"
        ],
        "correct": 0,
        "explanation": "Hai khoản cuối là hai khoản hay bị bỏ nhất. Công vận hành thì không xuất hiện trên bất kỳ hoá đơn nào, còn phần dự phòng thay thế thì chỉ lộ ra vào lần hỏng đầu tiên - và lúc đó nó là chi phí gấp gáp."
      },
      {
        "question": "Vì sao so sánh với hạ tầng thuê chỉ theo giá thiết bị lại sai?",
        "options": [
          "Vì giá thuê đã bao gồm điện, làm mát, vận hành và thay thế trong cùng một con số",
          "Vì giá thuê đổi theo đúng mức dùng nên cũng không so sánh trực tiếp được",
          "Vì thiết bị tự mua có tuổi thọ dài hơn nên cần tính theo nhiều năm",
          "Vì hai mô hình có mức độ linh hoạt khác nhau nên không cùng đơn vị"
        ],
        "correct": 0,
        "explanation": "Đây là lỗi so sánh phổ biến nhất trong các bảng tính loại này: một con số đã gộp bốn khoản được đặt cạnh một con số chỉ có một khoản, và kết luận rút ra từ đó luôn nghiêng về phía tự vận hành."
      },
      {
        "question": "Vì sao mật độ công suất quan trọng khi chọn phần cứng?",
        "options": [
          "Vì một máy mạnh hơn nhưng ngốn điện gấp đôi có thể làm giảm số máy lắp được trong tủ",
          "Vì máy tiêu thụ nhiều điện thường toả nhiệt lớn nên tuổi thọ ngắn hơn",
          "Vì chi phí điện chiếm phần lớn trong tổng chi phí vận hành hằng tháng",
          "Vì công suất tiêu thụ quyết định loại nguồn điện dự phòng mà tủ đó cần được trang bị thêm"
        ],
        "correct": 0,
        "explanation": "Đây là ràng buộc mà bảng so sánh hiệu năng của nhà sản xuất không nhắc tới: hiệu năng trên mỗi watt quan trọng hơn hiệu năng tuyệt đối khi ngân sách điện là ngân sách hết trước."
      },
      {
        "question": "Khi nào tự vận hành hạ tầng thật sự rẻ hơn thuê?",
        "options": [
          "Khi tải ổn định, dự đoán được, và chạy gần hết công suất trong nhiều năm",
          "Khi khối lượng đủ lớn để chi phí trên mỗi đơn vị giảm xuống đáng kể",
          "Khi đội có đủ chuyên môn để vận hành mà không cần thuê thêm người",
          "Khi yêu cầu về bảo mật hoặc pháp lý không cho phép dùng hạ tầng thuê"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là điều kiện cần và không đủ. Điều kiện quyết định là hình dạng TẢI: hạ tầng tự vận hành phải mua theo đỉnh và trả tiền suốt thời gian không dùng tới, nên tải càng dao động thì lợi thế càng mất."
      }
    ],
    "keyTakeaways": [
      "Bốn ngân sách: chỗ lắp, ĐIỆN, làm mát, băng thông - và điện thường hết trước.",
      "Trung tâm dữ liệu xây cho mật độ mười năm trước không lắp đầy tủ được hôm nay.",
      "Chi phí thật gồm cả CÔNG VẬN HÀNH và PHẦN DỰ PHÒNG THAY THẾ - hai khoản hay bị bỏ.",
      "So với đám mây bằng giá thiết bị là đặt con số một khoản cạnh con số bốn khoản.",
      "Tự vận hành rẻ hơn khi tải ỔN ĐỊNH và chạy gần hết công suất nhiều năm."
    ],
    "practicePrompt": {
      "question": "Bảng tính cho thấy tự mua rẻ hơn thuê 40%. Kiểm tra gì đầu tiên?",
      "options": [
        "Bảng đó có tính công vận hành và phần dự phòng thay thế chưa",
        "Giá thiết bị trong bảng có phải giá thị trường hiện tại hay không",
        "Thời gian khấu hao được dùng có phù hợp với tuổi thọ thực tế không",
        "Mức sử dụng dự kiến có được ước tính một cách thận trọng không"
      ],
      "correct": 0,
      "explanation": "Ba lựa chọn kia đều làm con số lệch vài chục phần trăm và đều dễ kiểm. Hai khoản này thì thường vắng mặt hoàn toàn khỏi bảng tính, và cộng chúng vào có thể đảo ngược kết luận chứ không chỉ thu hẹp khoảng cách."
    },
    "summary": {
      "keyIdea": "Một máy chủ vật lý có bốn ngân sách, và cái hết trước quyết định chi phí thật.",
      "formula": "Chi phí thật = thiết bị + điện + công vận hành + dự phòng thay thế.",
      "commonMistake": "So giá thiết bị với giá thuê, tức là so một khoản với bốn khoản đã gộp.",
      "action": "Tìm mức tiêu thụ điện thực tế của tủ máy chủ so với công suất được cấp."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Nếu đội bạn có hạ tầng vật lý, tìm hai con số cho một tủ: công suất điện được cấp và mức tiêu thụ thực tế ở giờ cao điểm.",
      "secondary": "Nếu tủ còn nhiều vị trí trống mà điện đã gần hết, bạn đang trả tiền cho phần chỗ không dùng được - và con số chi phí trên mỗi máy chủ đang bị tính thấp hơn thực tế."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Đội quen với hạ tầng thuê theo nhu cầu thường tính chi phí theo số máy, trong khi chi phí thật của một trung tâm dữ liệu bị chi phối bởi những thứ không ai nhìn thấy trên hoá đơn đám mây."
      },
      {
        "type": "heading",
        "text": "Bốn ngân sách của một tủ"
      },
      {
        "type": "callout",
        "label": "Điện hết trước chỗ lắp",
        "text": "Một tủ có bốn mươi hai vị trí lắp máy nhưng chỉ được cấp một công suất điện nhất định. Máy chủ hiện đại tiêu thụ nhiều hơn thế hệ mà trung tâm dữ liệu được thiết kế cho, nên rất nhiều tủ chỉ lắp được nửa số vị trí - và phần còn lại vẫn nằm trong hợp đồng thuê."
      },
      {
        "type": "paragraph",
        "text": "Hệ quả cho việc chọn phần cứng: HIỆU NĂNG TRÊN MỖI WATT quan trọng hơn hiệu năng tuyệt đối. Một máy mạnh gấp rưỡi mà ngốn điện gấp đôi làm giảm số máy lắp được trong tủ, và tổng năng lực của tủ đó giảm theo."
      },
      {
        "type": "heading",
        "text": "Chi phí thật gồm bốn khoản"
      },
      {
        "type": "list",
        "items": [
          "Giá thiết bị - khoản duy nhất luôn có trong bảng tính.",
          "Điện tiêu thụ, gồm cả phần làm mát.",
          "CÔNG VẬN HÀNH - không xuất hiện trên bất kỳ hoá đơn nào.",
          "PHẦN DỰ PHÒNG THAY THẾ - chỉ lộ ra vào lần hỏng đầu tiên, và lúc đó là chi phí gấp gáp."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Bảng tính thường làm",
          "text": "Đặt giá thiết bị cạnh giá thuê hằng tháng. Một con số một khoản cạnh một con số đã gộp cả bốn."
        },
        "right": {
          "label": "So sánh đúng",
          "text": "Cộng đủ bốn khoản rồi mới so. Kết luận đôi khi đảo ngược, chứ không chỉ thu hẹp khoảng cách."
        }
      },
      {
        "type": "closing",
        "lines": [
          "Điều kiện quyết định tự vận hành có rẻ hơn không là hình dạng TẢI, không phải quy mô.",
          "Hạ tầng tự vận hành phải mua theo đỉnh và trả tiền suốt thời gian không dùng tới - nên tải càng dao động thì lợi thế càng mất, bất kể tổng khối lượng lớn tới đâu."
        ]
      }
    ]
  },
  {
    "id": 802,
    "slug": "masterclass-mang-doanh-nghiep-va-cam-ket-duong-truyen",
    "title": "Chuyên đề Masterclass 2: Mạng doanh nghiệp - đường truyền, dự phòng và cam kết",
    "subtitle": "Hai đường truyền từ hai nhà cung cấp vẫn có thể đi qua cùng một sợi cáp dưới lòng đất.",
    "duration": "14 phút",
    "difficulty": "Khó",
    "track": "bonus",
    "emoji": "📜",
    "whyItMatters": "Phần lớn kế hoạch dự phòng đường truyền được lập trên sơ đồ logic, còn sự cố thì xảy ra ở tầng vật lý mà sơ đồ đó không thể hiện.",
    "openingQuestion": "Bạn thuê hai đường truyền từ hai nhà cung cấp khác nhau. Đủ dự phòng chưa?",
    "openingOptions": [
      "Chưa - phải kiểm hai đường có đi chung tuyến cáp vật lý nào không",
      "Rồi, vì hai nhà cung cấp độc lập thì sự cố của họ cũng độc lập",
      "Chưa, thật sự cần thêm một đường thứ ba để có thể chịu đã được hai sự cố cùng lúc",
      "Tuỳ vào cam kết mức độ dịch vụ mà từng nhà cung cấp đưa ra"
    ],
    "correctOption": 0,
    "explanation": "Nhà cung cấp thuê lại hạ tầng của nhau là chuyện bình thường, nên hai hợp đồng khác nhau vẫn có thể chạy trên cùng một sợi cáp trong cùng một cống ngầm. Một chiếc máy xúc cắt đứt cả hai cùng lúc, và đây là dạng nguyên nhân chung mà không sơ đồ logic nào cho thấy.",
    "diagram": [
      {
        "label": "Hai hợp đồng khác nhau vẫn có thể chung một sợi cáp",
        "arrow": true
      },
      {
        "label": "Hỏi thẳng nhà cung cấp về tuyến vật lý và điểm vào toà nhà",
        "arrow": true
      },
      {
        "label": "Cam kết dịch vụ đo cái gì, đo ở đâu, và bồi thường bao nhiêu",
        "arrow": true
      },
      {
        "label": "Bồi thường gần như luôn nhỏ hơn thiệt hại thật rất nhiều"
      }
    ],
    "realWorldExample": {
      "company": "Điểm vào toà nhà",
      "description": "Kể cả khi hai đường đi hai tuyến cáp khác nhau, chúng thường vào toà nhà qua cùng một điểm và cùng một phòng thiết bị. Một sự cố ở phòng đó - cháy, ngập, mất điện - làm mất cả hai, và đây là nguyên nhân chung dễ kiểm nhất mà ít ai kiểm."
    },
    "quiz": [
      {
        "question": "Vì sao hai nhà cung cấp khác nhau không đảm bảo hai đường độc lập?",
        "options": [
          "Vì họ thuê lại hạ tầng của nhau nên hai hợp đồng có thể chạy chung một sợi cáp",
          "Vì hai nhà cung cấp có thể dùng chung một điểm trung chuyển lưu lượng quốc tế",
          "Vì các nhà cung cấp trong cùng khu vực chịu ảnh hưởng bởi cùng điều kiện thời tiết",
          "Vì họ mua thiết bị từ cùng một số ít hãng nên lỗi phần cứng có thể giống nhau"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là nguyên nhân chung có thật và đều hiếm hơn nhiều. Chung tuyến cáp là chuyện thường ngày trong ngành, và nó không được ghi ở đâu trong hợp đồng nếu bạn không hỏi."
      },
      {
        "question": "Nguyên nhân chung nào dễ kiểm nhất mà ít ai kiểm?",
        "options": [
          "Hai đường vào toà nhà qua cùng một điểm và cùng một phòng thiết bị",
          "Hai đường dùng chung một thiết bị định tuyến ở phía trong hệ thống",
          "Hai đường được cấu hình bởi cùng một người nên có thể sai giống nhau",
          "Hai đường có băng thông không đủ để một cái gánh toàn bộ khi cái kia hỏng"
        ],
        "correct": 0,
        "explanation": "Lựa chọn cuối là một vấn đề thật và khác loại - nó là chuyện dung lượng chứ không phải nguyên nhân chung. Điểm vào toà nhà thì kiểm được bằng cách đi bộ xuống tầng hầm và nhìn."
      },
      {
        "question": "Điều gì cần đọc kỹ nhất trong một cam kết mức độ dịch vụ?",
        "options": [
          "Cam kết đo cái gì, đo ở đâu, và loại trừ những trường hợp nào",
          "Con số phần trăm thời gian hoạt động mà nhà cung cấp cam kết đạt được",
          "Mức bồi thường được áp dụng khi nhà cung cấp không đạt cam kết",
          "Thời hạn hợp đồng và điều kiện để chấm dứt trước thời hạn đó"
        ],
        "correct": 0,
        "explanation": "Con số phần trăm là thứ được đưa lên đầu tài liệu và nó không có nghĩa cho tới khi bạn biết ba điều kia. Đo ở biên mạng của nhà cung cấp khác hẳn đo từ vị trí của bạn, và danh sách loại trừ thường bao gồm cả bảo trì theo kế hoạch."
      },
      {
        "question": "Vì sao mức bồi thường không phải thứ để dựa vào?",
        "options": [
          "Vì nó gần như luôn nhỏ hơn nhiều so với thiệt hại thật của một lần gián đoạn",
          "Vì thủ tục yêu cầu bồi thường phức tạp nên nhiều đội không theo tới cùng",
          "Vì bồi thường thường được trả bằng tín dụng dịch vụ thay vì bằng tiền mặt",
          "Vì cần chứng minh được mức gián đoạn nên tranh chấp thường kéo dài"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là trở ngại thật khi đi đòi bồi thường. Vấn đề gốc thì nằm ở độ lớn: bồi thường được thiết kế để bù một phần phí dịch vụ, không phải để bù doanh thu bạn mất trong bốn giờ."
      },
      {
        "question": "Điều gì nên kiểm định kỳ với đường truyền dự phòng?",
        "options": [
          "Chuyển hẳn lưu lượng sang nó một lần và xem hệ thống có chạy đủ không",
          "Kiểm tra trạng thái kết nối của nó trên bảng theo dõi mỗi tuần",
          "Đối chiếu băng thông thực tế của nó với mức cam kết trong hợp đồng",
          "Xác nhận với nhà cung cấp rằng đường đó vẫn đang hoạt động bình thường"
        ],
        "correct": 0,
        "explanation": "Ba cách kia đều cho biết đường đó còn sống, không cho biết nó GÁNH ĐƯỢC. Cùng bài học với bản sao lưu chưa từng được khôi phục thử: một cơ chế dự phòng chưa từng chạy thật là một giả định chưa được kiểm."
      }
    ],
    "keyTakeaways": [
      "Hai hợp đồng khác nhau vẫn có thể chạy chung một sợi cáp - họ thuê lại của nhau.",
      "Nguyên nhân chung dễ kiểm nhất: cùng ĐIỂM VÀO toà nhà và cùng phòng thiết bị.",
      "Cam kết dịch vụ: đọc ĐO CÁI GÌ, ĐO Ở ĐÂU, LOẠI TRỪ GÌ - không đọc con số phần trăm.",
      "Bồi thường bù một phần phí dịch vụ, không bù doanh thu mất trong bốn giờ.",
      "Chuyển hẳn lưu lượng sang đường dự phòng một lần - còn sống khác với gánh được."
    ],
    "practicePrompt": {
      "question": "Nhà cung cấp cam kết 99,9%. Câu hỏi tiếp theo nên là gì?",
      "options": [
        "Con số đó đo ở đâu, và những gì được loại trừ khỏi phép đo",
        "Mức bồi thường là bao nhiêu nếu họ không đạt được cam kết đó",
        "Trong mười hai tháng qua họ đã đạt được con số đó hay chưa",
        "Con số đó được tính theo tháng hay theo năm trong hợp đồng"
      ],
      "correct": 0,
      "explanation": "Lựa chọn thứ tư là một phần của câu hỏi này và nó hẹp hơn. Đo ở biên mạng của nhà cung cấp thì gián đoạn ở đoạn cuối tới bạn không tính vào - và đoạn cuối chính là đoạn hay hỏng nhất."
    },
    "summary": {
      "keyIdea": "Kế hoạch dự phòng lập trên sơ đồ logic; sự cố xảy ra ở tầng vật lý.",
      "formula": "Hỏi tuyến cáp và điểm vào toà nhà → đọc cách đo và danh sách loại trừ → thử chuyển thật.",
      "commonMistake": "Coi hai nhà cung cấp khác nhau là hai đường độc lập.",
      "action": "Hỏi nhà cung cấp hai đường của bạn có đi chung tuyến cáp nào không."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Gửi một câu hỏi cho nhà cung cấp: hai đường truyền của chúng tôi có đi chung tuyến cáp vật lý hoặc chung điểm vào toà nhà ở đoạn nào không?",
      "secondary": "Câu hỏi này thường không được trả lời ngay, và bản thân việc đó đã là thông tin. Nếu không ai trong đội biết câu trả lời, kế hoạch dự phòng của bạn đang dựa trên một sơ đồ chứ không dựa trên thực tế."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Phần lớn kế hoạch dự phòng đường truyền được lập trên sơ đồ logic, còn sự cố thì xảy ra ở tầng vật lý mà sơ đồ đó không thể hiện."
      },
      {
        "type": "heading",
        "text": "Hai đường, một sợi cáp"
      },
      {
        "type": "callout",
        "label": "Nhà cung cấp thuê lại của nhau",
        "text": "Hai hợp đồng khác nhau vẫn có thể chạy trên cùng một sợi cáp trong cùng một cống ngầm. Một chiếc máy xúc cắt đứt cả hai cùng lúc - và chuyện này không được ghi ở đâu trong hợp đồng nếu bạn không hỏi."
      },
      {
        "type": "paragraph",
        "text": "Nguyên nhân chung dễ kiểm nhất lại là cái ít ai kiểm: ĐIỂM VÀO toà nhà. Kể cả khi hai đường đi hai tuyến cáp khác nhau, chúng thường vào qua cùng một điểm và cùng một phòng thiết bị - và việc này kiểm được bằng cách đi bộ xuống tầng hầm và nhìn."
      },
      {
        "type": "heading",
        "text": "Đọc một cam kết dịch vụ"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Con số phần trăm",
          "text": "Ở đầu tài liệu, và không có nghĩa cho tới khi bạn biết ba thứ bên phải."
        },
        "right": {
          "label": "Ba thứ quyết định",
          "text": "Đo CÁI GÌ, đo Ở ĐÂU, và LOẠI TRỪ gì. Đo ở biên mạng nhà cung cấp thì gián đoạn ở đoạn cuối tới bạn không tính - mà đoạn cuối là đoạn hay hỏng nhất."
        }
      },
      {
        "type": "paragraph",
        "text": "Và đừng dựa vào mức bồi thường: nó được thiết kế để bù một phần phí dịch vụ, không phải để bù doanh thu bạn mất trong bốn giờ. Nó là một hình thức chia sẻ rủi ro rất nhỏ, không phải một khoản bảo hiểm."
      },
      {
        "type": "closing",
        "lines": [
          "Việc đáng làm định kỳ: CHUYỂN HẲN lưu lượng sang đường dự phòng một lần và xem hệ thống có chạy đủ không.",
          "Bảng theo dõi cho biết đường đó còn sống; nó không cho biết đường đó gánh được. Cùng bài học với bản sao lưu chưa từng được khôi phục thử."
        ]
      }
    ]
  },
  {
    "title": "Chuyên Đề Masterclass 3: Kỹ thuật ở giai đoạn đầu",
    "subtitle": "Nợ nào đáng vay khi thứ quý nhất không phải mã mà là thời gian còn lại",
    "duration": "12 phút",
    "difficulty": "Khó",
    "emoji": "🌱",
    "whyItMatters": "Ở giai đoạn đầu, phần lớn lời khuyên kỹ thuật đúng đắn đều sai, vì chúng được viết cho những hệ thống đã biết mình cần làm gì. Biết khi nào không áp dụng chúng là kỹ năng riêng.",
    "openingQuestion": "Sản phẩm mới, chưa rõ ai dùng. Nên đầu tư vào kiểm thử tự động tới mức nào?",
    "openingOptions": [
      "Chỉ cho phần đã chắc chắn còn tồn tại sau ba tháng",
      "Càng nhiều càng tốt",
      "Ở mức tối thiểu, vì mọi phần của sản phẩm đều có thể bị vứt đi trong giai đoạn này",
      "Ở mức tương đương với các sản phẩm đã trưởng thành, vì tiêu chuẩn chất lượng không nên đổi"
    ],
    "correctOption": 0,
    "explanation": "Kiểm thử là một khoản tích luỹ, và tích luỹ cho thứ sắp bị vứt đi là lãng phí thuần. Nhưng mọi sản phẩm giai đoạn đầu đều có một phần đã chắc chắn - cách người dùng đăng nhập, cách tiền được tính, cách dữ liệu được lưu - và phần ấy đáng được bảo vệ đầy đủ. Phương án tối thiểu cho tất cả sai ở chỗ nó coi mọi phần đều bấp bênh như nhau.",
    "diagram": [
      {
        "label": "Thời gian còn lại là tài nguyên khan hiếm nhất",
        "arrow": true
      },
      {
        "label": "Vay nợ kỹ thuật để đổi lấy tốc độ",
        "arrow": true
      },
      {
        "label": "Ghi lại khoản vay và điều kiện trả",
        "arrow": true
      },
      {
        "label": "Trả trước khi lãi lớn hơn phần đã vay"
      }
    ],
    "realWorldExample": {
      "company": "Sáu tháng dựng nền cho một sản phẩm sống bốn tháng",
      "description": "Một đội ba người dành sáu tháng dựng nền tảng đầy đủ trước khi phát hành: kiểm thử toàn diện, nhiều môi trường, quy trình triển khai tự động. Sản phẩm ra mắt và bị dừng sau bốn tháng vì không ai cần nó. Toàn bộ phần nền ấy đúng về kỹ thuật và không dòng nào trong đó từng được dùng lại, vì nó gắn chặt với một mô hình dữ liệu chỉ tồn tại trong sản phẩm đã chết."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Kỹ thuật giai đoạn đầu không phải kỹ thuật kém chất lượng. Nó là kỹ thuật cho một bài toán khác: tối đa hoá số lần thử trong khoảng thời gian còn lại, thay vì tối đa hoá tuổi thọ của thứ đang xây."
      },
      {
        "type": "heading",
        "text": "Thời gian còn lại là ràng buộc, không phải mã"
      },
      {
        "type": "paragraph",
        "text": "Ở một hệ thống trưởng thành, ràng buộc là công sức bảo trì và mọi lời khuyên đều hướng tới việc giảm nó. Ở giai đoạn đầu, ràng buộc là số lần thử còn lại trước khi hết thời gian, và mọi lời khuyên phải được đọc lại qua lăng kính ấy. Một việc làm giảm công sức bảo trì nhưng làm chậm vòng thử thì ở đây là một việc lỗ."
      },
      {
        "type": "heading",
        "text": "Phân biệt phần chắc chắn với phần đang dò"
      },
      {
        "type": "list",
        "items": [
          "Phần chắc chắn: đăng nhập, tính tiền, lưu dữ liệu người dùng. Sai ở đây tốn thật và nó sẽ còn đó",
          "Phần đang dò: giao diện, luồng thao tác, thuật toán gợi ý. Có thể bị vứt cả trong một tuần",
          "Quy tắc: bảo vệ đầy đủ phần đầu, chấp nhận nợ ở phần sau, và biết mình đang ở phần nào"
        ]
      },
      {
        "type": "paragraph",
        "text": "Sai lầm phổ biến không phải chọn nhầm mức đầu tư mà là áp cùng một mức cho cả hai phần. Áp mức cao cho tất cả thì hết thời gian trước khi tìm được thứ ai đó cần; áp mức thấp cho tất cả thì phần chắc chắn hỏng theo cách tốn tiền thật."
      },
      {
        "type": "heading",
        "text": "Nợ kỹ thuật là công cụ, với điều kiện được ghi lại"
      },
      {
        "type": "paragraph",
        "text": "Vay nợ để đi nhanh là hợp lý ở giai đoạn này. Thứ biến nó từ công cụ thành vấn đề là việc không ai ghi lại đã vay gì. Một dòng ghi chú nêu rõ chỗ này làm tắt, sẽ hỏng khi có hơn một nghìn người dùng đồng thời biến một khoản nợ vô hình thành một khoản có điều kiện trả - và điều kiện ấy là thứ duy nhất khiến nó được trả trước khi nổ."
      },
      {
        "type": "callout",
        "label": "Nợ đắt nhất là nợ ở tầng dữ liệu",
        "text": "Mã viết vội thì viết lại được trong một tuần. Một mô hình dữ liệu viết vội thì sau sáu tháng đã có dữ liệu thật nằm trong đó, và việc sửa nó cần một cuộc di trú, một khoảng ngừng, và một phương án quay lui. Nếu chỉ có thời gian làm cẩn thận đúng một thứ ở giai đoạn đầu, hãy chọn hình dạng dữ liệu."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Nợ có kiểm soát",
          "text": "Ghi lại đã vay gì và điều kiện phải trả. Nợ vẫn là nợ, nhưng nó xuất hiện trong kế hoạch trước khi xuất hiện trong sự cố."
        },
        "right": {
          "label": "Nợ vô hình",
          "text": "Không ai ghi, và người viết đã rời đi. Nó chỉ được phát hiện đúng vào lúc điều kiện của nó xảy ra."
        }
      },
      {
        "type": "heading",
        "text": "Dấu hiệu đã tới lúc đổi cách làm"
      },
      {
        "type": "list",
        "items": [
          "Có người dùng thật trả tiền thật và họ phàn nàn khi hệ thống hỏng",
          "Đội vượt quá năm người, nên trí nhớ chung không còn thay được tài liệu",
          "Mô hình dữ liệu đã ngừng đổi trong hai tháng liên tiếp"
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Ràng buộc ở giai đoạn đầu là số lần thử còn lại, không phải công sức bảo trì.",
          "Nợ đắt nhất nằm ở tầng dữ liệu, vì sửa nó cần một cuộc di trú chứ không cần một tuần."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Ràng buộc thật sự của một sản phẩm giai đoạn đầu là gì?",
        "options": [
          "Số lần thử còn lại trước khi hết thời gian",
          "Số người trong đội",
          "Chất lượng của phần nền kỹ thuật đã dựng được trong những tháng đầu tiên",
          "Mức độ chính xác của những giả định về nhu cầu của người dùng mục tiêu"
        ],
        "correct": 0,
        "explanation": "Ba yếu tố kia đều ảnh hưởng tới tốc độ và chất lượng. Số lần thử còn lại là ràng buộc cứng: hết nó thì mọi thứ khác không còn nghĩa gì, và nó là thứ duy nhất giảm đều đặn dù đội làm gì."
      },
      {
        "question": "Sai lầm phổ biến nhất về mức đầu tư kỹ thuật ở giai đoạn đầu là gì?",
        "options": [
          "Áp cùng một mức cho cả phần chắc chắn lẫn phần đang dò",
          "Đầu tư quá ít vào kiểm thử tự động",
          "Chọn công nghệ quá mới nên đội mất thời gian học thay vì tập trung làm sản phẩm",
          "Xây quá nhiều tính năng cùng lúc thay vì hoàn thiện từng tính năng một cách kỹ càng"
        ],
        "correct": 0,
        "explanation": "Cả hai hướng của sai lầm này đều tốn: áp mức cao cho tất cả thì hết thời gian trước khi tìm ra thứ ai cần, áp mức thấp cho tất cả thì phần đăng nhập và tính tiền hỏng theo cách tốn tiền thật."
      },
      {
        "question": "Điều gì biến nợ kỹ thuật từ công cụ thành vấn đề?",
        "options": [
          "Không ai ghi lại đã vay gì và điều kiện phải trả",
          "Số lượng nợ tích luỹ quá lớn",
          "Việc người viết ra khoản nợ đó rời khỏi đội trước khi kịp bàn giao lại cho ai khác",
          "Việc đội không dành thời gian định kỳ để rà soát và trả bớt những khoản đã vay"
        ],
        "correct": 0,
        "explanation": "Ba yếu tố kia đều làm tình hình xấu hơn và đều là hệ quả của yếu tố đầu. Một khoản nợ được ghi lại kèm điều kiện thì xuất hiện trong kế hoạch; một khoản không ghi thì chỉ xuất hiện trong sự cố."
      },
      {
        "question": "Vì sao nợ ở tầng dữ liệu đắt hơn nợ ở tầng mã?",
        "options": [
          "Vì sửa nó cần một cuộc di trú chứ không cần một tuần viết lại",
          "Vì nó ảnh hưởng tới nhiều phần của hệ thống hơn",
          "Vì các quyết định về dữ liệu thường được đưa ra sớm nhất nên chúng khó thay đổi nhất",
          "Vì nó liên quan tới dữ liệu của người dùng nên có thêm ràng buộc về mặt pháp lý"
        ],
        "correct": 0,
        "explanation": "Mã viết vội thì viết lại được, và cái giá là công sức. Một mô hình dữ liệu sai sau sáu tháng đã có dữ liệu thật nằm trong đó, nên cái giá gồm cả một khoảng ngừng và một phương án quay lui."
      },
      {
        "question": "Dấu hiệu nào cho biết đã tới lúc đổi sang cách làm của hệ thống trưởng thành?",
        "options": [
          "Mô hình dữ liệu đã ngừng đổi trong hai tháng liên tiếp",
          "Sản phẩm đã ra mắt được sáu tháng",
          "Đội đã hoàn thành hầu hết những tính năng nằm trong kế hoạch ban đầu của sản phẩm",
          "Chi phí hạ tầng đã vượt qua mức mà công ty đặt ra cho giai đoạn thử nghiệm"
        ],
        "correct": 0,
        "explanation": "Ba dấu hiệu kia đều là mốc thời gian hoặc mốc kế hoạch, và cả ba đều đạt được kể cả khi sản phẩm vẫn đang dò. Mô hình dữ liệu ngừng đổi thì nói đúng thứ cần biết: phần chắc chắn đã lớn hơn phần đang dò."
      }
    ],
    "keyTakeaways": [
      "Ràng buộc là số lần thử còn lại, không phải công sức bảo trì",
      "Bảo vệ đầy đủ phần chắc chắn, chấp nhận nợ ở phần đang dò",
      "Nợ được ghi kèm điều kiện trả thì xuất hiện trong kế hoạch, không trong sự cố",
      "Nếu chỉ làm cẩn thận được một thứ, hãy chọn hình dạng dữ liệu"
    ],
    "practicePrompt": {
      "question": "Đội có 8 tháng thời gian. Dựng nền đầy đủ mất 5 tháng, mỗi vòng thử mất 1 tháng. Còn bao nhiêu lần thử?",
      "options": [
        "3",
        "8",
        "5 lần, vì phần dựng nền cũng tính là những vòng thử đầu tiên của sản phẩm",
        "4 lần, vì tháng cuối thường được dành để hoàn thiện chứ không để thử thêm lần nữa"
      ],
      "correct": 0,
      "explanation": "Tám trừ năm còn ba. Ba lần thử là rất ít cho một sản phẩm chưa biết ai dùng, và đó là toàn bộ lập luận cho việc rút phần dựng nền xuống - mỗi tháng cắt được ở đó là thêm một lần thử."
    },
    "summary": {
      "keyIdea": "Tối đa hoá số lần thử còn lại, không tối đa hoá tuổi thọ của thứ đang xây",
      "commonMistake": "Áp một mức đầu tư kỹ thuật cho cả phần chắc chắn lẫn phần đang dò",
      "action": "Chia sản phẩm hiện tại thành hai danh sách: phần chắc còn sau ba tháng, và phần còn lại."
    },
    "application": {
      "title": "Ba câu mỗi khi định làm tắt",
      "message": "Phần này thuộc nhóm chắc chắn hay nhóm đang dò? Nếu vay thì điều kiện phải trả là gì? Nó có chạm vào hình dạng dữ liệu không?",
      "secondary": "Câu thứ ba là câu quyết định, vì một cái gật đầu ở đó biến khoản vay một tuần thành một cuộc di trú."
    },
    "id": 803,
    "slug": "tai-chinh-khoi-nghiep-cap-table-vc-valuation",
    "track": "bonus"
  },
  {
    "title": "Chuyên Đề Masterclass 4: Định lượng rủi ro hệ thống",
    "subtitle": "Phân vị nói được gì, và vì sao thứ giết bạn luôn nằm ngoài phần đã đo",
    "duration": "12 phút",
    "difficulty": "Khó",
    "emoji": "📊",
    "interactiveType": "risk",
    "whyItMatters": "Định lượng rủi ro cho ra những con số trông rất chắc chắn, và chính vẻ chắc chắn ấy là nguy hiểm lớn nhất của chúng nếu người đọc không biết chúng im lặng về điều gì.",
    "openingQuestion": "Phân vị 99 của độ trễ là 800ms. Câu nào đúng?",
    "openingOptions": [
      "1% số yêu cầu chậm hơn 800ms, không biết chậm hơn bao nhiêu",
      "Không yêu cầu nào chậm quá 800ms",
      "Trung bình của 1% chậm nhất là khoảng 800ms, tính trên toàn bộ khoảng thời gian đo",
      "99% người dùng có trải nghiệm tốt vì họ luôn nhận được phản hồi dưới ngưỡng 800ms"
    ],
    "correctOption": 0,
    "explanation": "Phân vị là một ranh giới, không phải một trần. Nó nói có bao nhiêu phần trăm nằm bên kia, và tuyệt đối im lặng về việc bên kia xa tới đâu - một phần trăm ấy có thể là 900ms hoặc 90 giây. Phương án nói 99% người dùng ổn cũng sai theo một cách khác: một người gửi trăm yêu cầu gần như chắc chắn gặp phần đuôi.",
    "diagram": [
      {
        "label": "Đo phân phối của thứ quan sát được",
        "arrow": true
      },
      {
        "label": "Phân vị chia nó thành hai phần",
        "arrow": true
      },
      {
        "label": "Phần bên kia không được mô tả",
        "arrow": true
      },
      {
        "label": "Và phần chưa từng xảy ra thì không có mặt"
      }
    ],
    "realWorldExample": {
      "company": "Ngân sách lỗi đủ cho mọi tháng trừ tháng thứ mười ba",
      "description": "Một đội theo dõi ngân sách lỗi suốt một năm và chưa tháng nào tiêu quá sáu mươi phần trăm. Họ kết luận hệ thống có dư an toàn và giảm mức dự phòng. Tháng thứ mười ba có một sự cố kéo dài chín giờ, tiêu hết ngân sách của cả quý trong một lần. Mười hai tháng dữ liệu không hề sai - chúng chỉ chưa từng chứa một sự kiện thuộc loại ấy, nên chúng không nói gì được về nó."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bài này về hai thứ: đọc đúng những con số phân vị, và biết chính xác chúng im lặng về điều gì. Phần thứ hai quan trọng hơn."
      },
      {
        "type": "heading",
        "text": "Phân vị là ranh giới, không phải trần"
      },
      {
        "type": "paragraph",
        "text": "Nói phân vị 99 là 800ms tức là một phần trăm số yêu cầu chậm hơn thế. Nó không nói một phần trăm ấy chậm hơn bao nhiêu, và khoảng cách giữa 900ms với 90 giây là toàn bộ khác biệt giữa một hệ thống chậm và một hệ thống treo. Muốn biết thì phải nhìn giá trị lớn nhất, hoặc phân vị 99,9 đặt cạnh phân vị 99."
      },
      {
        "type": "heading",
        "text": "Người dùng gặp phần đuôi nhiều hơn con số gợi ý"
      },
      {
        "type": "paragraph",
        "text": "Một phần trăm nghe nhỏ cho tới khi tính theo phiên làm việc. Một người mở ứng dụng và tạo ra một trăm yêu cầu thì xác suất họ gặp ít nhất một yêu cầu chậm là khoảng sáu mươi ba phần trăm. Phân vị đo trên yêu cầu, còn người dùng thì trải nghiệm theo phiên, và hai đơn vị ấy cách nhau rất xa."
      },
      {
        "type": "formula",
        "title": "Ba con số nên đứng cạnh nhau",
        "variables": [
          {
            "symbol": "p50",
            "name": "Trung vị: trải nghiệm của người dùng điển hình",
            "description": "Con số dùng để trả lời hệ thống nhanh hay chậm. Nó không nói gì về ngày xấu."
          },
          {
            "symbol": "p99",
            "name": "Ranh giới của phần chậm",
            "description": "Con số dùng để đặt cam kết. Đứng một mình thì nó tạo cảm giác an toàn giả."
          },
          {
            "symbol": "max",
            "name": "Giá trị tệ nhất đã quan sát được",
            "description": "Con số duy nhất mô tả phần đuôi. Nó nhiễu và đó là lý do người ta bỏ nó, nhưng bỏ nó là bỏ thứ duy nhất nói về ngày xấu."
          },
          {
            "symbol": "n",
            "name": "Số yêu cầu mỗi phiên người dùng",
            "description": "Thứ chuyển một tỷ lệ trên yêu cầu thành một tỷ lệ trên người. Không có nó thì mọi phân vị đều bị đọc lạc quan hơn thực tế."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Loại rủi ro mà mọi phép đo đều im lặng"
      },
      {
        "type": "paragraph",
        "text": "Mọi con số ở trên đều được tính từ những gì đã xảy ra. Một sự kiện chưa từng xảy ra trong khoảng thời gian đo thì đóng góp bằng không vào mọi phân vị, mọi trung bình và mọi ngân sách lỗi. Điều đó không phải khuyết điểm của phép đo - nó là định nghĩa của phép đo, và nhầm lẫn giữa hai điều ấy là chỗ những đội cẩn thận nhất vẫn bị bất ngờ."
      },
      {
        "type": "callout",
        "label": "Dữ liệu yên ả là dữ liệu chưa đủ dài",
        "text": "Mười hai tháng không có sự cố lớn có thể nghĩa là hệ thống bền, hoặc nghĩa là mười hai tháng chưa đủ dài để gặp loại sự kiện xảy ra vài năm một lần. Hai khả năng ấy nhìn giống hệt nhau từ trong dữ liệu, và cách duy nhất tách chúng là đi hỏi ngoài dữ liệu: hệ thống này chưa từng gặp chuyện gì, và nếu gặp thì nó xoay xở thế nào."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Đọc thận trọng",
          "text": "Ba con số đứng cạnh nhau, đọc theo phiên chứ không theo yêu cầu, và một danh sách những kịch bản chưa từng xảy ra."
        },
        "right": {
          "label": "Đọc tự tin",
          "text": "Một con số phân vị 99 trên bảng. Trông chính xác, và nó im lặng về cả phần đuôi lẫn phần chưa xảy ra."
        }
      },
      {
        "type": "heading",
        "text": "Việc cần làm với phần không đo được"
      },
      {
        "type": "list",
        "items": [
          "Liệt kê kịch bản chưa từng xảy ra: mất cả một vùng, mất nhà cung cấp danh tính, dữ liệu hỏng lan rộng",
          "Với mỗi kịch bản, hỏi hệ thống mất bao lâu để trở lại chứ đừng hỏi xác suất nó xảy ra",
          "Diễn tập ít nhất một kịch bản mỗi quý, vì phương án chưa chạy thử là phương án chưa tồn tại"
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Phân vị là ranh giới; thứ mô tả phần đuôi là giá trị tệ nhất đã quan sát.",
          "Sự kiện chưa từng xảy ra đóng góp bằng không vào mọi phép đo, theo đúng định nghĩa."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Phân vị 99 là 800ms. Điều gì không suy ra được từ con số này?",
        "options": [
          "Phần chậm nhất chậm tới mức nào",
          "Tỷ lệ yêu cầu chậm hơn 800ms",
          "Việc hệ thống có đang đáp ứng được cam kết đặt ở ngưỡng 800ms hay không",
          "Số lượng yêu cầu tuyệt đối nằm ngoài ngưỡng trong khoảng thời gian đã đo"
        ],
        "correct": 0,
        "explanation": "Ba thứ kia đều suy ra được trực tiếp hoặc bằng một phép nhân đơn giản. Phần đuôi thì không: một phần trăm ấy có thể là 900ms hoặc 90 giây, và phân vị 99 cho ra cùng một con số trong cả hai trường hợp."
      },
      {
        "question": "1% yêu cầu chậm, mỗi phiên có 100 yêu cầu. Bao nhiêu phần trăm phiên gặp ít nhất một yêu cầu chậm?",
        "options": [
          "Khoảng 63%",
          "1%",
          "Khoảng 10% (= lấy căn bậc hai của tỷ lệ chậm rồi quy đổi sang phần trăm phiên)",
          "100% (= giả định mỗi phiên 100 yêu cầu thì chắc chắn có đúng một yêu cầu chậm)"
        ],
        "correct": 0,
        "explanation": "1 trừ 0,99 mũ 100 ra khoảng 0,63. Đây là khoảng cách giữa một chỉ số nghe rất tốt và một trải nghiệm mà gần hai phần ba người dùng gặp phải, và nó sinh ra chỉ vì hai bên đếm theo hai đơn vị khác nhau."
      },
      {
        "question": "Vì sao giá trị tệ nhất đã quan sát hay bị bỏ khỏi bảng?",
        "options": [
          "Vì nó nhiễu và dao động mạnh giữa các kỳ",
          "Vì nó thường do một lỗi đơn lẻ gây ra",
          "Vì các công cụ giám sát mặc định chỉ hiển thị những phân vị phổ biến chứ không hiện nó",
          "Vì nó khó dùng để đặt cam kết do không có cách nào dự đoán được giá trị của kỳ sau"
        ],
        "correct": 0,
        "explanation": "Lý do bỏ nó là chính đáng và hệ quả thì không: nó là con số duy nhất trên bảng mô tả phần đuôi. Bỏ nó đi thì bảng chỉ còn nói về những ngày bình thường, đúng những ngày không ai cần bảng."
      },
      {
        "question": "Mười hai tháng không có sự cố lớn. Hai cách hiểu nào cùng khớp với dữ liệu đó?",
        "options": [
          "Hệ thống bền, hoặc mười hai tháng chưa đủ dài",
          "Hệ thống bền, hoặc phép đo đang có lỗi",
          "Hệ thống bền, hoặc các sự cố đã xảy ra nhưng không được ghi nhận vào hệ thống theo dõi",
          "Hệ thống bền, hoặc tải trong năm đó thấp hơn mức mà hệ thống được thiết kế để chịu"
        ],
        "correct": 0,
        "explanation": "Ba cách hiểu kia đều giả định có gì đó sai và đều kiểm tra được. Cách hiểu đầu thì không có gì sai cả và cũng không kiểm được từ trong dữ liệu, nên nó là cách hiểu duy nhất đòi phải đi hỏi ở ngoài."
      },
      {
        "question": "Nên hỏi gì về một kịch bản chưa từng xảy ra?",
        "options": [
          "Hệ thống mất bao lâu để trở lại nếu nó xảy ra",
          "Xác suất nó xảy ra trong năm tới là bao nhiêu",
          "Những công ty tương tự đã gặp kịch bản này với tần suất khoảng bao nhiêu lần mỗi năm",
          "Chi phí để phòng ngừa kịch bản này so với thiệt hại ước tính nếu nó thực sự xảy ra"
        ],
        "correct": 0,
        "explanation": "Xác suất của một sự kiện chưa từng xảy ra là thứ không ước lượng được đáng tin, nên mọi câu hỏi bắt đầu từ nó đều dẫn tới một con số bịa. Thời gian trở lại thì đo được bằng một buổi diễn tập, và nó đủ để quyết định."
      }
    ],
    "keyTakeaways": [
      "Phân vị là ranh giới chứ không phải trần; nó im lặng về phần bên kia",
      "Người dùng trải nghiệm theo phiên, còn phân vị đo theo yêu cầu",
      "Giá trị tệ nhất đã quan sát là con số duy nhất mô tả phần đuôi",
      "Sự kiện chưa xảy ra đóng góp bằng không vào mọi phép đo, theo định nghĩa"
    ],
    "practicePrompt": {
      "question": "p99 = 800ms, p99,9 = 12 giây. Điều này nói lên gì về phần đuôi?",
      "options": [
        "Đuôi rất dày, phần tệ nhất tệ hơn nhiều so với ranh giới p99",
        "Đuôi mỏng và hệ thống ổn định",
        "Hệ thống có hai nhóm người dùng với hai mức trải nghiệm khác nhau rõ rệt về tốc độ",
        "Phép đo p99,9 chưa đủ mẫu nên con số 12 giây nhiều khả năng là một giá trị ngoại lai"
      ],
      "correct": 0,
      "explanation": "Từ 800ms lên 12 giây chỉ trong khoảng từ phân vị 99 tới 99,9 là gấp mười lăm lần. Một hệ thống có đuôi mỏng thì hai con số ấy gần nhau; khoảng cách này nói rằng một phần nghìn số yêu cầu đang ở một thế giới khác hẳn."
    },
    "summary": {
      "keyIdea": "Đọc phân vị cùng giá trị tệ nhất, và theo phiên chứ không theo yêu cầu",
      "commonMistake": "Đọc một con số p99 đứng một mình như một lời bảo đảm",
      "action": "Đặt p50, p99 và giá trị tệ nhất cạnh nhau trên bảng của đội bạn."
    },
    "application": {
      "title": "Bốn việc",
      "message": "Ba con số cạnh nhau. Quy đổi sang tỷ lệ phiên. Liệt kê kịch bản chưa từng xảy ra. Diễn tập một cái mỗi quý.",
      "secondary": "Việc cuối là việc duy nhất chạm được vào phần mà không phép đo nào nhìn thấy."
    },
    "id": 804,
    "slug": "quan-tri-rui-ro-dinh-luong-var-black-swan",
    "track": "bonus"
  },
  {
    "title": "Chuyên Đề Masterclass 5: Phần mềm tiết kiệm năng lượng",
    "subtitle": "Điện của một dòng mã, và vì sao phần lớn cách giảm nó đều là chuyển chỗ",
    "duration": "12 phút",
    "difficulty": "Khó",
    "emoji": "🌿",
      "whyItMatters": "Hạ tầng máy tính tiêu thụ điện ở quy mô của một quốc gia trung bình, và phần lớn quyết định làm nó tăng lên đều do kỹ sư đưa ra mà không hề biết mình đang quyết chuyện đó.",
    "openingQuestion": "Chuyển dịch vụ sang một vùng chạy bằng điện tái tạo. Lượng phát thải của nó đổi thế nào?",
    "openingOptions": [
      "Giảm trên sổ sách, nhưng tổng điện tiêu thụ không đổi",
      "Giảm thật, vì dịch vụ giờ chạy hoàn toàn bằng nguồn điện không phát thải",
      "Không đổi, vì phát thải tính theo lượng tính toán chứ không theo nguồn điện",
      "Tăng lên, vì vùng tái tạo thường xa người dùng nên phải truyền dữ liệu xa hơn"
    ],
    "correctOption": 0,
    "explanation": "Điện tái tạo trong một khu vực là hữu hạn. Dịch vụ của bạn dùng phần đó thì một tải khác phải lấy phần điện còn lại, vốn bẩn hơn. Con số trong báo cáo của bạn giảm thật, nhưng tổng phát thải của lưới không đổi. Đó là lý do việc giảm lượng tính toán khác hẳn về bản chất so với việc đổi chỗ chạy nó.",
    "diagram": [
      {
        "label": "Dòng mã chạy tốn chu kỳ xử lý",
        "arrow": true
      },
      {
        "label": "Chu kỳ tốn điện, cộng phần làm mát",
        "arrow": true
      },
      {
        "label": "Điện có cường độ phát thải theo giờ và theo vùng",
        "arrow": true
      },
      {
        "label": "Giảm lượng tính toán, hoặc chỉ đổi chỗ"
      }
    ],
    "realWorldExample": {
      "company": "Công việc nền chạy lúc nửa đêm",
      "description": "Một đội chuyển toàn bộ công việc xử lý theo lô sang chạy lúc hai giờ sáng cho rẻ. Ở lưới điện của họ, hai giờ sáng là lúc điện gió dư và cường độ phát thải thấp nhất trong ngày, nên quyết định vì tiền cũng vô tình đúng về môi trường. Ở một lưới khác, hai giờ sáng lại là lúc nhiệt điện than gánh phần lớn tải. Cùng một hành động, hai kết quả ngược nhau, và cả hai đội đều không biết mình đang chọn gì."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Mọi phép tính đều tốn điện, và lượng điện ấy ước lượng được từ những con số đội nào cũng đã có. Bài này đi từ dòng mã tới ki-lô-oát giờ, rồi tới chỗ khó hơn: phân biệt giảm thật với chuyển chỗ."
      },
      {
        "type": "heading",
        "text": "Từ chu kỳ xử lý tới điện"
      },
      {
        "type": "paragraph",
        "text": "Một máy chủ tiêu thụ điện gần như tuyến tính theo mức sử dụng bộ xử lý, nhưng nó không tiêu thụ bằng không khi rảnh - máy nhàn rỗi vẫn ăn khoảng một nửa mức đỉnh. Đó là con số quan trọng nhất trong cả bài, vì nó nói rằng một cụm máy chạy ở mức mười phần trăm đang lãng phí gần như toàn bộ điện của nó."
      },
      {
        "type": "formula",
        "title": "Bốn thừa số",
        "variables": [
          {
            "symbol": "U",
            "name": "Mức sử dụng thực tế của cụm máy",
            "description": "Phần lớn cụm máy nội bộ chạy dưới hai mươi phần trăm. Đây là chỗ có nhiều dư địa nhất và cũng là chỗ ít ai nhìn nhất."
          },
          {
            "symbol": "P",
            "name": "Công suất máy, tính cả mức tiêu thụ khi nhàn rỗi",
            "description": "Máy nhàn rỗi ăn khoảng một nửa mức đỉnh, nên gộp mười máy chạy mười phần trăm thành hai máy chạy năm mươi phần trăm là một khoản tiết kiệm thật."
          },
          {
            "symbol": "PUE",
            "name": "Hệ số hạ tầng phụ trợ, chủ yếu là làm mát",
            "description": "Trung tâm dữ liệu hiện đại quanh 1,2; phòng máy tự dựng thường trên 1,8. Nhân vào toàn bộ, nên nó khuếch đại mọi thứ khác."
          },
          {
            "symbol": "CI",
            "name": "Cường độ phát thải của lưới, theo vùng và theo giờ",
            "description": "Chênh nhau tới mười lần giữa các vùng và tới ba lần trong cùng một ngày. Đây là thừa số duy nhất đổi được mà không phải sửa mã."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Ba việc thật sự giảm"
      },
      {
        "type": "list",
        "items": [
          "Gộp tải để cụm máy chạy ở mức cao hơn, thay vì nhiều cụm cùng chạy nhàn rỗi",
          "Xoá công việc định kỳ không còn ai đọc kết quả - thường chiếm phần đáng kể",
          "Đệm và tính sẵn thứ được hỏi lại nhiều lần, thay vì tính lại từ đầu mỗi lần"
        ]
      },
      {
        "type": "heading",
        "text": "Ba việc chỉ chuyển chỗ"
      },
      {
        "type": "list",
        "items": [
          "Chuyển sang vùng dùng điện tái tạo, khi lượng tái tạo trong vùng ấy là hữu hạn",
          "Mua chứng chỉ bù trừ để trừ vào con số báo cáo mà không đổi gì trong hệ thống",
          "Đẩy phần tính toán xuống thiết bị người dùng, nơi không ai đo và pin thì hao"
        ]
      },
      {
        "type": "callout",
        "label": "Chuyển chỗ không vô dụng, nó chỉ không phải giảm",
        "text": "Chạy công việc nền vào giờ lưới sạch là chuyển chỗ theo thời gian, và nó có ích thật khi lượng điện sạch trong giờ ấy đang dư và không ai dùng. Điều cần giữ là gọi đúng tên: một dòng ghi giảm phát thải nhờ đổi vùng và một dòng ghi giảm phát thải nhờ xoá công việc thừa không nên nằm cùng một cột, vì cái thứ hai còn nguyên giá trị khi mọi vùng đều đã sạch."
      },
      {
        "type": "heading",
        "text": "Đo trước khi tối ưu"
      },
      {
        "type": "paragraph",
        "text": "Phần lớn đội bắt đầu bằng cách viết lại phần mã họ nghi là tốn nhất, và phần lớn đoán sai. Thứ tự đúng là đo mức sử dụng của cụm máy trước, vì nếu cụm đang chạy ở mười phần trăm thì mọi tối ưu mã đều không đổi được hoá đơn - máy vẫn bật, vẫn ăn nửa công suất, chỉ rảnh hơn."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Giảm thật",
          "text": "Tổng ki-lô-oát giờ xuống, và nó xuống dù lưới sạch hay bẩn. Kiểm chứng được bằng hoá đơn điện hoặc hoá đơn hạ tầng."
        },
        "right": {
          "label": "Chuyển chỗ",
          "text": "Con số trong báo cáo xuống nhưng tổng tiêu thụ không đổi. Hết giá trị vào ngày mọi vùng đều sạch."
        }
      },
      {
        "type": "closing",
        "lines": [
          "Máy nhàn rỗi ăn nửa công suất, nên mức sử dụng thấp là lãng phí lớn nhất.",
          "Phân biệt giảm thật với chuyển chỗ, và đừng để hai thứ ấy nằm cùng một cột."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Con số nào quan trọng nhất khi ước lượng điện của một cụm máy?",
        "options": [
          "Mức tiêu thụ khi máy nhàn rỗi",
          "Công suất đỉnh mà nhà sản xuất ghi trên thông số kỹ thuật của từng máy chủ",
          "Số lõi xử lý và dung lượng bộ nhớ mà mỗi máy trong cụm đang được cấp phát",
          "Lượng yêu cầu mỗi giây mà cụm máy phục vụ được vào giờ cao điểm trong ngày"
        ],
        "correct": 0,
        "explanation": "Máy nhàn rỗi ăn khoảng một nửa mức đỉnh, nên một cụm chạy ở mười phần trăm tiêu thụ hơn một nửa lượng điện của cụm chạy hết công suất. Bỏ qua con số này là bỏ qua phần lớn hoá đơn."
      },
      {
        "question": "Vì sao chuyển dịch vụ sang vùng điện tái tạo không giảm tổng phát thải?",
        "options": [
          "Vì lượng tái tạo trong vùng là hữu hạn nên tải khác phải lấy phần bẩn hơn",
          "Vì việc truyền dữ liệu tới vùng mới tiêu thụ thêm điện đủ để bù lại phần đã giảm",
          "Vì các vùng tái tạo vẫn phải chạy máy phát dự phòng chạy dầu vào giờ cao điểm",
          "Vì cách tính phát thải hiện nay chưa công nhận nguồn điện của từng vùng riêng"
        ],
        "correct": 0,
        "explanation": "Đây là điểm khó nhất của cả bài. Điện sạch trong lưới là một lượng cố định tại mỗi thời điểm; ai dùng nó thì người khác dùng phần còn lại. Báo cáo của bạn đẹp lên, lưới thì không đổi."
      },
      {
        "question": "Cụm máy chạy ở 10%. Đội định viết lại phần mã tốn nhất. Vấn đề là gì?",
        "options": [
          "Tối ưu mã không đổi được hoá đơn khi máy vẫn bật và vẫn rảnh",
          "Phần mã tốn nhất thường khó viết lại nên công sức bỏ ra sẽ lớn hơn dự kiến nhiều",
          "Cần đo lại sau khi viết xong mới biết được phần tiết kiệm thực tế là bao nhiêu",
          "Viết lại mã có thể làm phát sinh lỗi mới trong khi phần tiết kiệm lại không lớn"
        ],
        "correct": 0,
        "explanation": "Ở mức sử dụng thấp, điện đi vào việc giữ máy bật chứ không vào việc tính toán. Gộp mười máy chạy mười phần trăm thành hai máy chạy năm mươi phần trăm tiết kiệm nhiều hơn mọi lần viết lại mã cộng lại."
      },
      {
        "question": "Vì sao hệ số hạ tầng phụ trợ khuếch đại mọi thừa số khác?",
        "options": [
          "Vì nó nhân vào toàn bộ lượng điện chứ không cộng thêm một khoản cố định",
          "Vì chi phí làm mát tăng nhanh hơn mức tuyến tính khi mật độ máy trong phòng tăng",
          "Vì nó được tính lại theo mùa nên giá trị thay đổi nhiều lần trong cùng một năm",
          "Vì phần lớn các đội không đo được nó nên phải dùng giá trị trung bình của ngành"
        ],
        "correct": 0,
        "explanation": "Một hệ số nhân biến mọi khoản tiết kiệm thành lớn hơn và mọi khoản lãng phí thành tệ hơn theo đúng tỷ lệ ấy. Chênh giữa 1,2 và 1,8 nghĩa là cùng một khối lượng tính toán tốn thêm một nửa."
      },
      {
        "question": "Xoá một công việc định kỳ không còn ai đọc kết quả. Đây là loại hành động gì?",
        "options": [
          "Giảm thật, vì nó còn nguyên giá trị khi mọi vùng đều sạch",
          "Chuyển chỗ, vì phần tài nguyên được giải phóng sẽ được các công việc khác dùng hết",
          "Giảm thật, nhưng chỉ trong trường hợp công việc ấy chạy trên hạ tầng dùng riêng",
          "Chuyển chỗ, vì kết quả của công việc ấy sẽ phải được tính lại khi có người cần"
        ],
        "correct": 0,
        "explanation": "Đây là phép thử tốt nhất để phân biệt hai loại: hỏi xem hành động này còn giá trị không vào ngày toàn bộ lưới điện đã sạch. Xoá việc thừa thì còn; đổi vùng thì hết."
      }
    ],
    "keyTakeaways": [
      "Máy nhàn rỗi ăn khoảng một nửa công suất đỉnh, nên mức sử dụng thấp là lãng phí lớn nhất",
      "Đo mức sử dụng cụm máy trước khi tối ưu mã, vì phần lớn đội đoán sai chỗ tốn",
      "Phân biệt giảm thật với chuyển chỗ: còn giá trị không khi mọi lưới đều sạch",
      "Hệ số hạ tầng phụ trợ nhân vào toàn bộ, nên nó khuếch đại cả tiết kiệm lẫn lãng phí"
    ],
    "practicePrompt": {
      "question": "Mười máy chạy 10%, mỗi máy đỉnh 400W, nhàn rỗi 200W. Gộp còn hai máy chạy 50% thì tiết kiệm bao nhiêu?",
      "options": [
        "Khoảng 1,6kW",
        "2kW (= giả định tám máy tắt đi tiết kiệm trọn công suất đỉnh của chúng)",
        "800W (= chỉ tính phần chênh lệch công suất của hai máy còn lại sau khi gộp)",
        "400W (= tính đúng phần tiết kiệm của một máy rồi quên nhân với số máy tắt)"
      ],
      "correct": 0,
      "explanation": "Mười máy ở 10% ăn khoảng 220W mỗi cái, tổng 2,2kW. Hai máy ở 50% ăn khoảng 300W mỗi cái, tổng 0,6kW. Chênh khoảng 1,6kW, tức gần ba phần tư - và không dòng mã nào phải sửa."
    },
    "summary": {
      "keyIdea": "Điện đi vào việc giữ máy bật nhiều hơn vào việc tính toán",
      "commonMistake": "Gọi việc đổi vùng là giảm phát thải và ghi chung cột với việc xoá tải thừa",
      "action": "Tìm mức sử dụng trung bình của cụm máy đội bạn đang chạy."
    },
    "application": {
      "title": "Bốn bước theo thứ tự",
      "message": "Đo mức sử dụng cụm máy. Xoá công việc không ai đọc. Gộp tải để chạy ở mức cao hơn. Cuối cùng mới tới chuyện chọn vùng và chọn giờ.",
      "secondary": "Ba bước đầu giảm thật và kiểm chứng được bằng hoá đơn; bước cuối chỉ đổi chỗ, nên nó đứng cuối."
    },
    "id": 805,
    "slug": "tai-chinh-xanh-tieu-chuan-esg-tin-chi-carbon",
    "track": "bonus"
  },
];
