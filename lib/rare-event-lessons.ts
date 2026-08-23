import type { Lesson } from "./lesson-types";

// Chặng "Sự kiện hiếm" (ids 1741-1745, professional track).
//
// Vì sao chặng này tồn tại: kho dạy rất kỹ những thứ xảy ra thường xuyên - độ
// trễ, tỷ lệ lỗi, thông lượng - và mọi công cụ ở đó đều dựa vào việc có nhiều
// quan sát. Sự kiện hiếm thì ngược lại: mất một vùng, hỏng dữ liệu âm thầm,
// một lỗ hổng bị khai thác. Chúng có ít hoặc không có quan sát nào, nên mọi
// trực giác rèn từ dữ liệu dày đều dẫn sai.
//
// KHÔNG TRÙNG BA VÙNG ĐÃ CÓ: độ trễ đuôi (nhánh Tối ưu) nói về phân vị của một
// thứ xảy ra hàng triệu lần; chặng độ tin cậy nói về SLO và quản trị sự cố; các
// bài ước lượng ở nhánh bonus nói về cách ước lượng khối lượng công việc. Chặng
// này chỉ nói về những thứ gần như không bao giờ xảy ra và rất đắt khi xảy ra.

export const RARE_EVENT_LESSONS: Lesson[] = [
  {
    "id": 1741,
    "slug": "dinh-muc-tai-nguyen-va-gia-cua-mot-cam-ket",
    "title": "Sự kiện hiếm, Bài 1: Đặt định mức tài nguyên - giá của một cam kết dài hạn",
    "subtitle": "Cam kết dùng ba năm để đổi lấy giá rẻ hơn là một vụ cá cược về nhu cầu của chính bạn.",
    "duration": "12 phút",
    "difficulty": "Khó",
    "track": "professional",
    "emoji": "📊",
    "interactiveType": "risk",
    "whyItMatters": "Khoản chiết khấu cho cam kết dài hạn lớn tới mức khó từ chối, và cái giá của nó chỉ hiện ra khi nhu cầu đi khác dự báo.",
    "openingQuestion": "Nhà cung cấp giảm 40% nếu bạn cam kết mức dùng trong ba năm. Cân nhắc gì trước tiên?",
    "openingOptions": [
      "Mức dùng thấp nhất mà bạn chắc chắn sẽ đạt trong cả ba năm đó",
      "Mức dùng trung bình dự kiến của ba năm theo kế hoạch tăng trưởng",
      "Tổng số tiền tiết kiệm được so với việc trả theo mức dùng thực tế",
      "Khả năng chuyển sang nhà cung cấp khác nếu điều kiện thị trường đổi"
    ],
    "correctOption": 0,
    "explanation": "Cam kết ở mức trung bình nghĩa là bạn trả cho phần chưa dùng trong những giai đoạn thấp, và chiết khấu chỉ áp cho phần đã cam kết chứ không cho phần vượt. Con số an toàn là mức SÀN - phần bạn chắc chắn dùng kể cả trong kịch bản tệ nhất - còn phần trên đó thì trả theo thực tế.",
    "diagram": [
      {
        "label": "Cam kết ở mức SÀN, không ở mức trung bình dự kiến",
        "arrow": true
      },
      {
        "label": "Phần trên sàn trả theo thực tế, chấp nhận giá cao hơn",
        "arrow": true
      },
      {
        "label": "Rủi ro thật: kiến trúc đổi làm nhu cầu đổi loại, không đổi lượng",
        "arrow": true
      },
      {
        "label": "Và cam kết dài hạn làm giảm động lực tối ưu chi phí"
      }
    ],
    "realWorldExample": {
      "company": "Đổi loại chứ không đổi lượng",
      "description": "Rủi ro lớn nhất của cam kết ba năm không phải nhu cầu giảm mà là nhu cầu đổi LOẠI: một quyết định kiến trúc chuyển tải từ máy chủ thường sang dịch vụ chạy theo sự kiện làm cam kết cũ thành vô dụng, dù tổng khối lượng công việc vẫn tăng."
    },
    "quiz": [
      {
        "question": "Vì sao cam kết ở mức trung bình dự kiến lại nguy hiểm?",
        "options": [
          "Vì bạn trả cho phần chưa dùng trong những giai đoạn thấp mà không được bù lại",
          "Vì mức trung bình rất khó ước tính chính xác cho một khoảng thời gian dài như vậy",
          "Vì nhu cầu thực tế thường thấp hơn dự báo trong phần lớn trường hợp",
          "Vì mức trung bình không phản ánh được tính mùa vụ của nhu cầu"
        ],
        "correct": 0,
        "explanation": "Cấu trúc giá này bất đối xứng: chiết khấu chỉ áp cho phần đã cam kết, còn phần vượt trả giá thường - nên dùng ít hơn cam kết thì mất tiền, dùng nhiều hơn thì không được gì thêm."
      },
      {
        "question": "Rủi ro lớn nhất của một cam kết ba năm là gì?",
        "options": [
          "Nhu cầu đổi LOẠI do một quyết định kiến trúc, dù tổng khối lượng vẫn tăng",
          "Nhu cầu giảm xuống do sản phẩm không tăng trưởng đúng như kế hoạch ban đầu đã đặt",
          "Giá thị trường giảm nên mức cam kết trở nên đắt so với giá mới",
          "Nhà cung cấp thay đổi điều khoản dịch vụ trong thời hạn cam kết"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều được cân nhắc khi ký. Cái này thì không, vì nó không phải rủi ro thị trường mà là rủi ro do chính đội tạo ra - và ba năm là khoảng thời gian mà phần lớn kiến trúc đều đổi một lần."
      },
      {
        "question": "Vì sao cam kết dài hạn làm giảm động lực tối ưu chi phí?",
        "options": [
          "Vì tối ưu để dùng ít hơn mức đã cam kết thì không tiết kiệm được đồng nào",
          "Vì đội tin rằng chi phí đã được kiểm soát nên không cần theo dõi nữa",
          "Vì phần chiết khấu đã đủ lớn nên tất cả cáci thiện nhỏ trở nên hoàn toàn không đáng kể",
          "Vì việc thay đổi cấu hình có thể vi phạm điều kiện của hợp đồng cam kết"
        ],
        "correct": 0,
        "explanation": "Đây là hệ quả thẳng từ cấu trúc giá và nó ít được nói tới khi bàn về cam kết: bạn vừa mua một khoản chiết khấu và vừa tắt một động lực cải thiện, cho tới khi mức dùng vượt qua sàn cam kết."
      },
      {
        "question": "Cách nào giảm rủi ro của cam kết dài hạn?",
        "options": [
          "Chia thành nhiều cam kết ngắn hơn xen kẽ nhau thay vì một cam kết dài",
          "Đàm phán điều khoản cho phép chuyển đổi giữa các loại tài nguyên",
          "Cam kết ở mức thấp hơn nhu cầu dự kiến rồi bổ sung khi cần thiết",
          "Chỉ cam kết cho những phần hạ tầng đã ổn định trong thời gian dài"
        ],
        "correct": 0,
        "explanation": "Bốn cách đều giảm rủi ro và ba cách sau đều nằm trong cách đầu ở dạng cụ thể hơn. Chia nhỏ theo thời gian là cách duy nhất giữ được lựa chọn ở mọi thời điểm, thay vì chỉ ở thời điểm ký."
      },
      {
        "question": "Con số nào cần đo trước khi quyết định cam kết?",
        "options": [
          "Mức dùng thấp nhất trong mười hai tháng qua, không phải mức trung bình",
          "Tốc độ tăng trưởng của mức dùng trong mười hai tháng qua",
          "Tỷ lệ chi phí hạ tầng trên tổng chi phí vận hành của sản phẩm",
          "Mức dùng ở giờ cao điểm so với mức dùng ở giờ thấp điểm"
        ],
        "correct": 0,
        "explanation": "Ba con số kia đều hữu ích cho việc lập kế hoạch. Mức thấp nhất thì trả lời thẳng câu hỏi của quyết định này: phần nào bạn chắc chắn dùng kể cả trong tháng tệ nhất."
      }
    ],
    "keyTakeaways": [
      "Cam kết ở mức SÀN - phần chắc chắn dùng kể cả trong kịch bản tệ nhất.",
      "Cấu trúc giá bất đối xứng: dùng ít hơn thì mất tiền, dùng nhiều hơn không được gì thêm.",
      "Rủi ro lớn nhất là nhu cầu ĐỔI LOẠI do kiến trúc đổi, không phải nhu cầu giảm.",
      "Cam kết dài hạn TẮT động lực tối ưu, cho tới khi mức dùng vượt qua sàn.",
      "Đo mức dùng THẤP NHẤT mười hai tháng qua, không đo mức trung bình."
    ],
    "practicePrompt": {
      "question": "Mức dùng của bạn dao động từ 60 tới 140 đơn vị. Nên cam kết bao nhiêu?",
      "options": [
        "Khoảng 60 hoặc thấp hơn, và trả theo thực tế cho phần dao động phía trên",
        "Khoảng 100, là mức trung bình của khoảng dao động đó",
        "Khoảng 140, để được chiết khấu cho toàn bộ mức dùng ở giờ cao điểm",
        "Khoảng 80, cân bằng giữa mức chiết khấu và rủi ro trả thừa"
      ],
      "correct": 0,
      "explanation": "Lựa chọn thứ tư nghe cân bằng và nó vẫn là một vụ cá cược: hai mươi đơn vị giữa 60 và 80 chỉ có ở một phần thời gian, nên phần đó bạn trả cho chỗ trống. Chiết khấu ít hơn mà chắc chắn thì tốt hơn chiết khấu nhiều mà có điều kiện."
    },
    "summary": {
      "keyIdea": "Cam kết dài hạn là một vụ cá cược về nhu cầu của chính bạn.",
      "formula": "Cam kết ở mức sàn mười hai tháng qua; phần trên trả theo thực tế.",
      "commonMistake": "Cam kết ở mức trung bình dự kiến, rồi trả cho chỗ trống ở giai đoạn thấp.",
      "action": "Tìm mức dùng thấp nhất trong mười hai tháng qua của tài nguyên chính."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Tìm mức dùng THẤP NHẤT của tài nguyên chính trong mười hai tháng qua - không phải trung bình, không phải mức hiện tại.",
      "secondary": "Đó là trần của một cam kết an toàn. Nếu cam kết hiện tại của bạn cao hơn con số đó, phần chênh lệch là tiền đang trả cho chỗ trống ở những tháng thấp."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Khoản chiết khấu cho cam kết dài hạn lớn tới mức khó từ chối, và cái giá của nó chỉ hiện ra khi nhu cầu đi khác dự báo."
      },
      {
        "type": "heading",
        "text": "Cấu trúc giá bất đối xứng"
      },
      {
        "type": "callout",
        "label": "Dùng ít thì mất, dùng nhiều thì không được gì thêm",
        "text": "Chiết khấu chỉ áp cho phần đã cam kết. Dùng ít hơn thì bạn trả cho chỗ trống; dùng nhiều hơn thì phần vượt trả giá thường. Nên con số an toàn là mức SÀN, không phải mức trung bình dự kiến."
      },
      {
        "type": "heading",
        "text": "Rủi ro mà ít ai cân nhắc khi ký"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Rủi ro được bàn",
          "text": "Nhu cầu giảm, giá thị trường giảm, nhà cung cấp đổi điều khoản. Cả ba đều được cân nhắc trong cuộc họp quyết định."
        },
        "right": {
          "label": "Rủi ro thật",
          "text": "Nhu cầu ĐỔI LOẠI. Một quyết định kiến trúc chuyển tải sang loại tài nguyên khác làm cam kết cũ vô dụng, dù tổng khối lượng vẫn tăng."
        }
      },
      {
        "type": "paragraph",
        "text": "Rủi ro này không được bàn vì nó không phải rủi ro thị trường mà là rủi ro do chính đội tạo ra - và ba năm là khoảng thời gian mà phần lớn kiến trúc đều đổi một lần."
      },
      {
        "type": "heading",
        "text": "Một cái giá vô hình"
      },
      {
        "type": "paragraph",
        "text": "Cam kết dài hạn TẮT động lực tối ưu chi phí: tối ưu để dùng ít hơn mức đã cam kết thì không tiết kiệm được đồng nào. Bạn vừa mua một khoản chiết khấu và vừa tắt một cơ chế cải thiện, cho tới khi mức dùng vượt qua sàn."
      },
      {
        "type": "closing",
        "lines": [
          "Cách giảm rủi ro tốt nhất là chia thành nhiều cam kết ngắn hơn xen kẽ nhau, thay vì một cam kết dài duy nhất.",
          "Nó giữ cho bạn có lựa chọn ở mọi thời điểm, thay vì chỉ có lựa chọn đúng vào ngày ký."
        ]
      }
    ]
  },
  {
    id: 1742,
    interactiveType: "tail-risk",
    slug: "trung-binh-vo-dung-voi-su-kien-hiem",
    title: "Sự kiện hiếm, Bài 2: Vì sao trung bình là công cụ sai",
    subtitle: "Thiệt hại trung bình mỗi năm là một con số không ai từng gặp",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "📉",
    track: "professional",
    whyItMatters:
      "Mọi bản đề xuất ngân sách cho rủi ro đều quy về một con số kỳ vọng mỗi năm. Con số ấy đúng về mặt số học và nó giấu đi thứ quyết định tổ chức sống sót hay không: kích thước của lần tệ nhất.",
    openingQuestion: "Một rủi ro gây thiệt hại 5 tỷ với tần suất một lần mỗi mười năm. Con số nào đáng đưa vào quyết định?",
    openingOptions: [
      "Cả 500 triệu mỗi năm lẫn 5 tỷ trong một năm, vì chúng trả lời hai câu khác nhau",
      "Năm trăm triệu mỗi năm, vì đó là thiệt hại kỳ vọng đã tính tới cả tần suất xảy ra",
      "Năm tỷ, vì đó là con số thật sự xảy ra và tổ chức phải chuẩn bị cho tình huống đó",
      "Một khoảng nằm giữa hai con số đó, tuỳ theo mức độ chấp nhận rủi ro của tổ chức",
    ],
    correctOption: 0,
    explanation:
      "Năm trăm triệu mỗi năm trả lời câu về chi phí dài hạn: nếu tổ chức chịu được nhiều lần thì đây là mức nên chi để phòng ngừa. Năm tỷ trong một năm trả lời câu về khả năng sống sót: nếu tổ chức không chịu nổi khoản đó một lần thì con số kỳ vọng không còn ý nghĩa gì, vì sẽ không có lần thứ hai để trung bình hoá. Hai câu hỏi ấy độc lập với nhau và câu thứ hai luôn phải trả lời trước. Chọn một khoảng giữa hai con số là trộn hai đại lượng khác đơn vị vào nhau và cho ra một số không trả lời được câu nào.",
    diagram: [
      { label: "Câu 1: dài hạn tốn bao nhiêu mỗi năm", arrow: true },
      { label: "Câu 2: một lần có làm tổ chức sập không", arrow: true },
      { label: "Trả lời câu 2 trước, luôn luôn", arrow: true },
      { label: "Nếu câu 2 là có, con số kỳ vọng không còn nghĩa" },
    ],
    realWorldExample: {
      company: "Kỳ vọng nhỏ, một lần đủ chết",
      description:
        "Một sản phẩm nhỏ tính ra thiệt hại kỳ vọng của việc mất toàn bộ dữ liệu người dùng là vài chục triệu mỗi năm, và kết luận rằng đầu tư sao lưu nhiều vùng là không đáng. Phép tính đúng. Điều nó không nói là một lần mất dữ liệu sẽ kết thúc sản phẩm, nên sẽ không có chuỗi nhiều năm nào để con số trung bình ấy hiện ra.",
    },
    quiz: [
      {
        question: "Khi nào thì con số thiệt hại kỳ vọng dùng được?",
        options: [
          "Khi tổ chức chịu được sự kiện đó nhiều lần mà không sập",
          "Khi cả tần suất lẫn thiệt hại đều đo chắc",
          "Khi có đủ dữ liệu lịch sử để tính được giá trị trung bình một cách chính xác",
          "Khi rủi ro đó thuộc loại có thể chuyển sang bên thứ ba bằng hợp đồng",
        ],
        correct: 0,
        explanation:
          "Trung bình là khái niệm chỉ có nghĩa khi có nhiều lần để trung bình hoá. Với một sự kiện làm tổ chức không tồn tại nữa thì chuỗi dừng ở lần đầu tiên, và con số kỳ vọng mô tả một chuỗi không bao giờ diễn ra.",
      },
      {
        question: "Vì sao gộp nhiều rủi ro nhỏ độc lập lại thì dự đoán được?",
        options: [
          "Vì chúng không cùng xảy ra một lúc nên tổng biến động ít hơn từng cái",
          "Vì tổng của nhiều rủi ro nhỏ vẫn nhỏ hơn một rủi ro lớn nên dễ chịu đựng hơn",
          "Vì các rủi ro nhỏ thường có nguyên nhân giống nhau nên xử lý được cùng lúc",
          "Vì mỗi rủi ro nhỏ có tần suất cao hơn nên dễ ước lượng chính xác hơn hẳn",
        ],
        correct: 0,
        explanation:
          "Đây là cơ chế làm cho việc gộp có tác dụng, và cũng là chỗ nó gãy. Điều kiện độc lập là điều kiện then chốt: khi các rủi ro có chung một nguyên nhân gốc, chúng xảy ra cùng lúc và việc gộp không giảm biến động chút nào.",
      },
      {
        question: "Rủi ro tương quan nguy hiểm hơn rủi ro độc lập ở điểm nào?",
        options: [
          "Chúng cùng xảy ra, nên tổng thiệt hại lớn hơn nhiều so với dự tính",
          "Chúng khó phát hiện hơn vì nguyên nhân gốc thường nằm ở tầng sâu của hệ thống",
          "Chúng lặp lại nhiều lần theo chu kỳ nên tổng thiệt hại tích luỹ dần theo thời gian",
          "Chúng khó chuyển vì không bên nào muốn nhận",
        ],
        correct: 0,
        explanation:
          "Ba máy chủ ở ba giá khác nhau hỏng độc lập; ba máy chủ trong cùng một trung tâm dữ liệu thì không, vì mất điện làm cả ba hỏng cùng lúc. Mọi phép tính dựa trên giả định độc lập đều cho kết quả lạc quan nhiều lần khi giả định ấy sai.",
      },
      {
        question: "Cách trình bày rủi ro nào giúp người quyết định nhất?",
        options: [
          "Kèm cả mức tệ nhất hợp lý bên cạnh con số kỳ vọng",
          "Trình bày phân phối đầy đủ của thiệt hại để người quyết định tự đánh giá",
          "Đưa ra một con số duy nhất đã tính tới mọi yếu tố để tránh gây nhiễu thông tin",
          "So sánh với mức rủi ro mà các tổ chức tương tự trong ngành đang chấp nhận",
        ],
        correct: 0,
        explanation:
          "Phân phối đầy đủ thì đúng và hầu như không ai đọc. Hai con số - kỳ vọng và mức tệ nhất hợp lý - giữ được thông tin quan trọng nhất mà vẫn vừa một dòng, và chúng buộc cuộc thảo luận đi qua câu hỏi tổ chức có chịu nổi mức thứ hai không.",
      },
      {
        question: "Ngưỡng nào quyết định một rủi ro phải được xử lý bất kể chi phí?",
        options: [
          "Mức mà một lần xảy ra là tổ chức không phục hồi được",
          "Mức thiệt hại kỳ vọng hằng năm vượt quá ngân sách dành cho quản trị rủi ro",
          "Mức mà các quy định pháp luật yêu cầu phải có biện pháp phòng ngừa bắt buộc",
          "Mức ảnh hưởng tới phần lớn người dùng",
        ],
        correct: 0,
        explanation:
          "Đây là ngưỡng duy nhất mà phép so chi phí với lợi ích ngừng áp dụng được, vì phía bên kia của phép so không phải một khoản tiền mà là sự tồn tại. Mọi rủi ro dưới ngưỡng ấy đều là bài toán kinh tế bình thường và giải bằng con số kỳ vọng.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn trình bày một rủi ro cho ban lãnh đạo. Nên đưa con số nào?",
      options: [
        "Kỳ vọng mỗi năm và mức tệ nhất hợp lý, kèm câu hỏi có chịu nổi mức đó không",
        "Thiệt hại kỳ vọng mỗi năm, so được với chi phí",
        "Mức thiệt hại tối đa, cho thấy đúng mức nghiêm trọng",
        "Xác suất và mức thiệt hại tách riêng, để họ tự cân",
      ],
      correct: 0,
      explanation:
        "Chỉ đưa kỳ vọng thì cuộc thảo luận thành một phép so chi phí và rủi ro sống còn bị xử lý như một khoản chi thường. Chỉ đưa mức tối đa thì nghe như doạ và mất độ tin cậy. Hai con số cùng một câu hỏi buộc đúng người phải trả lời đúng câu cần trả lời.",
    },
    keyTakeaways: [
      "Kỳ vọng trả lời câu dài hạn; mức tệ nhất trả lời câu sống sót",
      "Trung bình chỉ có nghĩa khi có nhiều lần để trung bình hoá",
      "Gộp rủi ro chỉ giảm biến động khi chúng thật sự độc lập",
      "Trên ngưỡng không phục hồi được, phép so chi phí với lợi ích ngừng áp dụng",
    ],
    summary: {
      keyIdea: "Thiệt hại trung bình mỗi năm là con số không ai từng gặp, và nó giấu đi kích thước của lần tệ nhất",
      commonMistake: "Bác bỏ một khoản đầu tư phòng ngừa vì kỳ vọng nhỏ, trong khi một lần là đủ kết thúc sản phẩm",
      action: "Với mỗi rủi ro, viết hai con số: kỳ vọng mỗi năm và mức tệ nhất hợp lý một lần.",
    },
    application: {
      title: "Hai cột, và một câu hỏi",
      message:
        "Bảng rủi ro thêm cột mức tệ nhất một lần bên cạnh cột kỳ vọng. Với mỗi dòng, hỏi: tổ chức chịu nổi cột thứ hai một lần không.",
      secondary:
        "Dòng nào trả lời là không thì nó ra khỏi bài toán kinh tế và vào nhóm phải xử lý, bất kể con số kỳ vọng nhỏ tới đâu.",
    },
    sections: [
      {
        type: "lead",
        text: "Một bản đề xuất ngân sách cho rủi ro luôn kết thúc bằng một con số mỗi năm. Con số ấy đúng về số học, và với sự kiện hiếm thì nó mô tả một thế giới không tồn tại.",
      },
      {
        type: "heading",
        text: "Hai câu hỏi, hai con số",
      },
      {
        type: "comparison",
        left: {
          label: "Kỳ vọng mỗi năm",
          text: "Tần suất nhân mức thiệt hại. Trả lời câu dài hạn tốn bao nhiêu, và so sánh trực tiếp được với chi phí phòng ngừa hằng năm.",
        },
        right: {
          label: "Mức tệ nhất một lần",
          text: "Con số thật sự xảy ra trong lần nó xảy ra. Trả lời câu tổ chức có còn tồn tại sau đó không - và câu này phải hỏi trước.",
        },
      },
      {
        type: "paragraph",
        text: "Trung bình là khái niệm của một chuỗi dài. Nếu lần đầu tiên đã kết thúc chuỗi thì không có gì để trung bình hoá, và con số kỳ vọng đang mô tả một thế giới mà tổ chức sống qua mười lần sự kiện đó. Với một sản phẩm nhỏ, phần lớn rủi ro thảm hoạ đều thuộc loại này.",
      },
      {
        type: "callout",
        label: "Gộp rủi ro chỉ hiệu quả khi chúng độc lập",
        text: "Ba máy ở ba giá khác nhau hỏng độc lập, và ba máy trong cùng một trung tâm dữ liệu thì có chung nguyên nhân gốc là nguồn điện. Mọi phép tính dựa trên giả định độc lập cho kết quả lạc quan nhiều lần khi giả định ấy sai - và nó thường sai đúng vào lúc sự cố lớn xảy ra, vì đó chính là lúc nguyên nhân chung được kích hoạt.",
      },
      {
        type: "closing",
        lines: [
          "Con số kỳ vọng là câu trả lời đúng cho câu hỏi thứ hai, và nó hay được dùng để trả lời câu thứ nhất.",
          "Bài sau: khi không giảm được rủi ro, còn cách chuyển nó sang chỗ khác.",
        ],
      },
    ],
  },
  {
    id: 1743,
    slug: "chuyen-rui-ro-sang-ben-khac",
    title: "Sự kiện hiếm, Bài 3: Chuyển rủi ro thay vì giảm rủi ro",
    subtitle: "Có những rủi ro rẻ hơn khi trả tiền cho người khác gánh, và vài loại không chuyển được",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🔀",
    track: "professional",
    whyItMatters:
      "Phản xạ mặc định trước một rủi ro là tìm cách giảm nó, và với nhóm hiếm mà đắt thì việc giảm thường tốn hơn nhiều so với việc trả cho bên có quy mô lớn hơn gánh hộ. Biết phân biệt hai nhóm ấy tiết kiệm được phần lớn ngân sách rủi ro.",
    openingQuestion: "Khi nào thì chuyển rủi ro cho bên khác rẻ hơn tự giảm rủi ro?",
    openingOptions: [
      "Khi bên nhận gộp được rủi ro đó với nhiều khách hàng khác",
      "Khi chi phí giảm rủi ro vượt ngân sách",
      "Khi rủi ro nằm ngoài chuyên môn kỹ thuật của đội nên khó xử lý một cách hiệu quả",
      "Khi rủi ro có tần suất thấp tới mức việc đầu tư phòng ngừa khó được phê duyệt",
    ],
    correctOption: 0,
    explanation:
      "Cơ chế làm cho việc chuyển rủi ro rẻ hơn là quy mô: một bên phục vụ hàng nghìn khách hàng có tổng rủi ro dự đoán được hơn nhiều so với rủi ro của riêng bạn, nên họ định giá được nó và vẫn có lãi ở mức thấp hơn chi phí bạn tự phòng ngừa. Đó cũng là lý do việc chuyển không phải lúc nào cũng có: khi rủi ro của bạn tương quan với rủi ro của mọi khách hàng khác của họ, phần gộp không giúp gì và giá sẽ phản ánh đúng điều đó. Ba lý do kia đều là hoàn cảnh của bạn chứ không phải cơ chế, nên chúng giải thích vì sao bạn muốn chuyển chứ không giải thích vì sao chuyển được.",
    diagram: [
      { label: "Rủi ro hiếm và đắt với một mình bạn", arrow: true },
      { label: "Bên nhận gộp với hàng nghìn khách khác", arrow: true },
      { label: "Tổng của họ dự đoán được, nên định giá được", arrow: true },
      { label: "Giá đó thấp hơn chi phí bạn tự phòng ngừa" },
    ],
    realWorldExample: {
      company: "Tự dựng hay mua bảo đảm",
      description:
        "Một đội tính chi phí tự dựng hạ tầng nhiều vùng để chống mất một vùng, và con số ra rất lớn với quy mô của họ. Cùng mức bảo vệ mua từ một dịch vụ quản lý sẵn rẻ hơn nhiều lần, vì bên đó đã dựng hạ tầng ấy cho hàng nghìn khách. Điều họ mua không phải công nghệ; họ mua phần chia sẻ của một khoản đầu tư đã có sẵn.",
    },
    quiz: [
      {
        question: "Rủi ro nào không chuyển được cho bên khác?",
        options: [
          "Rủi ro mất uy tín với người dùng của chính bạn",
          "Rủi ro mất dữ liệu do lỗi ở tầng lưu trữ của nhà cung cấp hạ tầng",
          "Rủi ro gián đoạn dịch vụ do sự cố ở trung tâm dữ liệu bên thứ ba",
          "Rủi ro thiệt hại tài chính từ một vụ tấn công vào hệ thống của bạn",
        ],
        correct: 0,
        explanation:
          "Ba rủi ro kia đều quy được về tiền, và thứ quy được về tiền thì có bên sẵn sàng nhận với một mức giá. Uy tín thì không: một hợp đồng có thể bồi thường cho bạn khoản mất doanh thu, và không điều khoản nào làm người dùng quay lại. Đây là ranh giới thật của việc chuyển rủi ro.",
      },
      {
        question: "Điều khoản bồi thường trong hợp đồng dịch vụ thường bù được bao nhiêu?",
        options: [
          "Một phần nhỏ, thường giới hạn ở mức phí bạn đã trả cho kỳ đó",
          "Toàn bộ thiệt hại trực tiếp chứng minh được",
          "Phần thiệt hại vượt quá mức cam kết trong thoả thuận về chất lượng dịch vụ",
          "Một tỷ lệ phần trăm doanh thu bị mất trong khoảng thời gian dịch vụ gián đoạn",
        ],
        correct: 0,
        explanation:
          "Gần như mọi hợp đồng dịch vụ đều giới hạn trách nhiệm ở mức phí đã thu, và khoản đó thường nhỏ hơn thiệt hại thật nhiều bậc. Nghĩa là điều khoản bồi thường không phải một cơ chế chuyển rủi ro; nó là một cơ chế tạo động lực nhẹ cho nhà cung cấp.",
      },
      {
        question: "Vì sao dùng hai nhà cung cấp cho cùng một chức năng thường đắt hơn dự tính?",
        options: [
          "Vì phải viết và nuôi một lớp trừu tượng chạy được với cả hai",
          "Vì tổng chi phí dịch vụ tăng lên do không đạt được mức chiết khấu theo sản lượng",
          "Vì đội phải nắm cả hai hệ thống cùng lúc",
          "Vì việc chuyển đổi giữa hai nhà cung cấp cần thời gian và có thể gây gián đoạn",
        ],
        correct: 0,
        explanation:
          "Ba khoản kia đều có thật và đều nhìn thấy được từ trước. Khoản lớn nhất thì không: lớp trừu tượng phải hỗ trợ giao điểm chung của hai bên, nên bạn mất những tính năng riêng của từng bên, và mỗi lần một bên ra tính năng mới thì lớp ấy lại phải quyết định có theo hay không.",
      },
      {
        question: "Thuê ngoài một phần hệ thống chuyển được rủi ro nào?",
        options: [
          "Rủi ro vận hành phần đó, nhưng không chuyển được trách nhiệm với người dùng",
          "Toàn bộ rủi ro liên quan tới phần đó vì bên nhận đã cam kết trong hợp đồng",
          "Rủi ro kỹ thuật nhưng không chuyển được rủi ro về chi phí phát sinh thêm",
          "Rủi ro về nhân sự vì không còn phụ thuộc vào người trong đội biết phần đó",
        ],
        correct: 0,
        explanation:
          "Người dùng của bạn không có quan hệ nào với nhà thầu của bạn, nên khi phần đó hỏng thì họ vẫn đến gặp bạn. Đây là lý do việc thuê ngoài giảm được khối lượng công việc và gần như không giảm được mức độ khẩn cấp khi có sự cố.",
      },
      {
        question: "Bảo hiểm trách nhiệm mạng phù hợp nhất với loại thiệt hại nào?",
        options: [
          "Chi phí xử lý sự cố quy được ra tiền: điều tra, thông báo, hỗ trợ pháp lý",
          "Doanh thu bị mất trong khoảng thời gian hệ thống không hoạt động được",
          "Chi phí xây dựng lại hệ thống và dữ liệu sau khi bị tấn công phá hoại",
          "Thiệt hại mà người dùng phải chịu và có thể yêu cầu bạn bồi thường lại",
        ],
        correct: 0,
        explanation:
          "Nhóm chi phí xử lý thì rõ ràng, có hoá đơn, và bên bảo hiểm định giá được nên họ nhận. Ba nhóm kia khó chứng minh hoặc khó định giá hơn nhiều, nên chúng thường bị giới hạn nặng trong điều khoản - đọc phần loại trừ trước khi coi rủi ro đã được chuyển.",
      },
    ],
    practicePrompt: {
      question:
        "Đội bạn đang cân nhắc tự dựng hệ thống nhiều vùng để chống mất một vùng. Nên kiểm gì trước?",
      options: [
        "Cùng mức bảo vệ mua từ dịch vụ quản lý sẵn tốn bao nhiêu",
        "Chi phí và thời gian để đội tự dựng",
        "Mức độ thiệt hại nếu mất một vùng để xác định đây có phải ưu tiên hay không",
        "Kinh nghiệm của đội với loại hạ tầng này để đánh giá khả năng thực hiện",
      ],
      correct: 0,
      explanation:
        "Ba việc kia đều nằm ở vế tự làm và chúng chỉ cho một nửa phép so. Vế còn lại thường rẻ hơn nhiều lần vì bên bán đã dựng hạ tầng ấy cho hàng nghìn khách - và biết con số đó trước sẽ đổi hẳn nội dung của cuộc thảo luận về vế thứ nhất.",
    },
    keyTakeaways: [
      "Cơ chế làm việc chuyển rủi ro rẻ hơn là quy mô của bên nhận, không phải chuyên môn",
      "Điều khoản bồi thường thường giới hạn ở mức phí đã trả, nhỏ hơn thiệt hại nhiều bậc",
      "Uy tín với người dùng là rủi ro không chuyển được bằng bất kỳ hợp đồng nào",
      "Thuê ngoài chuyển được công việc, không chuyển được trách nhiệm",
    ],
    summary: {
      keyIdea: "Với rủi ro hiếm mà đắt, trả tiền cho bên có quy mô lớn hơn gánh thường rẻ hơn tự phòng ngừa",
      commonMistake: "Coi điều khoản bồi thường trong hợp đồng là đã chuyển được rủi ro sang nhà cung cấp",
      action: "Trước khi tự dựng lớp bảo vệ nào, hỏi giá cùng mức bảo vệ đó mua sẵn tốn bao nhiêu.",
    },
    application: {
      title: "Hai vế của một phép so",
      message:
        "Với mỗi rủi ro lớn: chi phí tự phòng ngừa, và giá mua cùng mức bảo vệ từ bên có quy mô. Ghi cả hai trước khi quyết.",
      secondary:
        "Đọc phần loại trừ của mọi hợp đồng bạn đang coi là đã chuyển rủi ro - phần lớn chúng giới hạn ở mức phí đã thu.",
    },
    sections: [
      {
        type: "lead",
        text: "Trước một rủi ro, phản xạ đầu tiên luôn là tìm cách giảm nó. Với nhóm hiếm mà đắt, việc giảm thường tốn hơn nhiều lần so với việc trả cho ai đó gánh hộ.",
      },
      {
        type: "heading",
        text: "Quy mô là cơ chế, không phải chuyên môn",
      },
      {
        type: "paragraph",
        text: "Một bên phục vụ hàng nghìn khách có tổng rủi ro dự đoán được hơn hẳn rủi ro của riêng bạn, nên họ định giá được và vẫn lãi ở mức thấp hơn chi phí bạn tự làm. Điều này cũng chỉ ra khi nào cơ chế ấy gãy: nếu rủi ro của bạn tương quan với rủi ro của mọi khách khác của họ thì phần gộp không giúp gì, và giá sẽ phản ánh đúng điều đó.",
      },
      {
        type: "list",
        items: [
          "Chuyển được: chi phí quy ra tiền, có hoá đơn, bên nhận định giá được",
          "Chuyển một phần: gián đoạn dịch vụ - bồi thường thường giới hạn ở mức phí đã trả",
          "Không chuyển được: uy tín với người dùng, và trách nhiệm trả lời họ",
          "Không chuyển được: hiểu biết về hệ thống, khi bên nhận rời đi",
        ],
      },
      {
        type: "callout",
        label: "Điều khoản bồi thường không phải cơ chế chuyển rủi ro",
        text: "Gần như mọi hợp đồng dịch vụ đều giới hạn trách nhiệm ở mức phí đã thu trong kỳ, và khoản đó nhỏ hơn thiệt hại thật nhiều bậc. Nó là một cơ chế tạo động lực nhẹ cho nhà cung cấp, không phải một khoản bảo hiểm - đọc nó như khoản bảo hiểm là cách phổ biến nhất để tin rằng một rủi ro đã được xử lý trong khi nó vẫn nằm nguyên ở chỗ cũ.",
      },
      {
        type: "closing",
        lines: [
          "Không phải rủi ro nào cũng đáng giảm; một số đáng mua, và một số phải tự gánh vì không ai nhận.",
          "Bài sau: có lớp bảo vệ rồi thì hành vi của chính đội bạn đổi theo.",
        ],
      },
    ],
  },
  {
    id: 1744,
    interactiveType: "prospect",
    slug: "lop-bao-ve-lam-doi-hanh-vi",
    title: "Sự kiện hiếm, Bài 4: Lớp bảo vệ làm đổi hành vi",
    subtitle: "Hai lệch động cơ kéo ngược nhau, và cả hai đều xuất hiện ngay khi có lưới an toàn",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🪢",
    track: "professional",
    whyItMatters:
      "Mọi lớp bảo vệ đều đổi cách người ta hành động, và phần đổi ấy ăn mất một phần lợi ích của chính lớp bảo vệ. Không tính tới nó là lý do các biện pháp an toàn hay cho kết quả thấp hơn nhiều so với dự tính trên giấy.",
    openingQuestion: "Đội có hệ thống tự khôi phục tốt thì điều gì thường xảy ra với chất lượng mã?",
    openingOptions: [
      "Ngưỡng cẩn thận hạ xuống, vì hậu quả của một lỗi đã nhẹ đi",
      "Chất lượng mã cải thiện vì đội có thêm thời gian để tập trung vào việc viết mã tốt",
      "Không thay đổi vì chất lượng mã phụ thuộc vào quy trình review chứ không vào hạ tầng",
      "Số lỗi giảm xuống vì hệ thống tự khôi phục đã xử lý được phần lớn các trường hợp",
    ],
    correctOption: 0,
    explanation:
      "Đây không phải chuyện ai lười. Khi hậu quả của một lỗi giảm từ mất dữ liệu xuống còn một lần khởi động lại tự động, mức cẩn thận hợp lý cũng giảm theo - và mọi người điều chỉnh mà không nhận ra mình đang điều chỉnh. Một phần lợi ích của lớp bảo vệ vì thế bị tiêu ngay vào việc chấp nhận rủi ro cao hơn ở chỗ khác, nên lợi ích ròng luôn nhỏ hơn con số tính trên giấy. Điều này không có nghĩa là đừng dựng lớp bảo vệ; nó có nghĩa là phải đo lợi ích sau khi hành vi đã điều chỉnh, chứ không phải trước.",
    diagram: [
      { label: "Dựng lớp bảo vệ, hậu quả của lỗi nhẹ đi", arrow: true },
      { label: "Ngưỡng cẩn thận hạ xuống, không ai chủ ý", arrow: true },
      { label: "Rủi ro chấp nhận ở chỗ khác tăng lên", arrow: true },
      { label: "Lợi ích ròng nhỏ hơn con số trên giấy" },
    ],
    realWorldExample: {
      company: "Có thể quay lại bản cũ trong ba mươi giây",
      description:
        "Một đội dựng cơ chế quay lại bản cũ rất nhanh và tự tin phát hành thường xuyên hơn. Sáu tháng sau, số lần phải quay lại tăng gấp nhiều lần, và một trong số đó rơi vào trường hợp không quay lại được vì đã có thay đổi ở cơ sở dữ liệu. Lớp bảo vệ hoạt động đúng như thiết kế; thứ đổi là số lần nó được đem ra dùng.",
    },
    quiz: [
      {
        question: "Lệch động cơ thứ hai xuất hiện khi bên bảo vệ không biết rõ rủi ro thật là gì?",
        options: [
          "Bên có rủi ro cao nhất là bên tích cực nhất đi tìm lớp bảo vệ",
          "Bên bảo vệ tính giá cao để bù phần chưa rõ",
          "Bên có rủi ro thấp không quan tâm tới lớp bảo vệ nên không tham gia vào hệ thống",
          "Bên bảo vệ yêu cầu quá nhiều thông tin khiến quá trình đăng ký trở nên phức tạp",
        ],
        correct: 0,
        explanation:
          "Đây là cơ chế đối xứng với vế kia và nó xảy ra trước cả khi hợp đồng được ký. Đội biết hệ thống mình mong manh nhất là đội sẵn sàng trả nhiều nhất cho lớp bảo vệ, nên tập khách hàng của bất kỳ dịch vụ bảo vệ nào cũng lệch về phía rủi ro cao hơn mức trung bình của thị trường.",
      },
      {
        question: "Cách nào giảm được phần lợi ích bị ăn mất do hành vi điều chỉnh?",
        options: [
          "Giữ một phần hậu quả ở lại phía người ra quyết định",
          "Truyền thông rõ ràng rằng lớp bảo vệ không phải lý do để giảm mức cẩn thận",
          "Giới hạn số lần được sử dụng lớp bảo vệ trong một khoảng thời gian nhất định",
          "Theo dõi chặt các chỉ số chất lượng để phát hiện sớm khi chúng bắt đầu xấu đi",
        ],
        correct: 0,
        explanation:
          "Nhắc nhở và theo dõi đều tác động lên ý thức, còn hành vi thì điều chỉnh theo hậu quả thật. Giữ lại một phần hậu quả - người phát hành bản lỗi là người trực xử lý, chẳng hạn - làm mức cẩn thận hợp lý không rơi xuống, vì hậu quả với họ chưa hề nhẹ đi.",
      },
      {
        question: "Vì sao lợi ích của một biện pháp an toàn nên được đo sau khi triển khai?",
        options: [
          "Vì con số trước triển khai giả định hành vi không đổi, mà nó luôn đổi",
          "Vì cần thời gian để nó phát huy tác dụng",
          "Vì giả định về tần suất có thể không đúng",
          "Vì triển khai rồi mới lộ vấn đề kỹ thuật",
        ],
        correct: 0,
        explanation:
          "Ba lý do kia đều đúng cho mọi thay đổi kỹ thuật. Lý do riêng của nhóm biện pháp an toàn là nó tác động ngược lại lên chính hành vi tạo ra rủi ro, nên con số dự tính luôn được tính trong một thế giới có mức cẩn thận cũ - một thế giới không còn tồn tại sau khi biện pháp được triển khai.",
      },
      {
        question: "Cơ chế tự khôi phục nên đi kèm điều gì?",
        options: [
          "Một tín hiệu rõ ràng cho thấy nó vừa được kích hoạt",
          "Một giới hạn về số lần được tự khôi phục trước khi cần con người can thiệp",
          "Một quy trình rà soát định kỳ để đảm bảo cơ chế vẫn hoạt động đúng như thiết kế",
          "Một tài liệu mô tả các trường hợp mà cơ chế này được thiết kế để xử lý",
        ],
        correct: 0,
        explanation:
          "Cơ chế tự khôi phục âm thầm sẽ che đi chính vấn đề nó đang che chở, và tần suất kích hoạt tăng dần mà không ai biết. Một tín hiệu rõ ràng giữ cho phần hậu quả không biến mất hoàn toàn khỏi tầm nhìn của người ra quyết định - đó là điều kiện để hành vi không trôi.",
      },
      {
        question: "Kết luận đúng rút ra từ hai lệch động cơ này là gì?",
        options: [
          "Vẫn dựng lớp bảo vệ, nhưng đừng tính lợi ích như thể hành vi đứng yên",
          "Cân nhắc kỹ hơn vì lợi ích thật thấp hơn",
          "Kèm biện pháp kiểm soát để chặn hành vi trôi",
          "Ưu tiên phòng ngừa hơn khắc phục",
        ],
        correct: 0,
        explanation:
          "Lợi ích ròng thấp hơn con số trên giấy vẫn thường là lợi ích lớn, nên kết luận đừng dựng là sai. Điều cần đổi là phép tính: trừ đi phần bị hành vi ăn mất, và thiết kế sao cho phần đó nhỏ - chứ không phải bỏ qua nó rồi ngạc nhiên khi kết quả không như dự tính.",
      },
    ],
    practicePrompt: {
      question:
        "Đội bạn sắp dựng cơ chế quay lại bản cũ tự động. Nên thêm gì vào thiết kế?",
      options: [
        "Một tín hiệu rõ khi nó kích hoạt, và người phát hành là người xử lý",
        "Một giới hạn số lần quay lại trong ngày",
        "Một quy trình rà soát sau mỗi lần kích hoạt",
        "Một bộ kiểm tự động chạy trước khi phát hành",
      ],
      correct: 0,
      explanation:
        "Hai thứ này giữ cho hậu quả không biến mất khỏi tầm nhìn và khỏi phía người ra quyết định, tức là chặn đúng cơ chế làm ngưỡng cẩn thận trôi xuống. Ba phương án kia đều tốt và đều tác động lên quy trình chứ không lên động cơ, nên chúng không ngăn được sự trôi đó.",
    },
    keyTakeaways: [
      "Hậu quả nhẹ đi thì ngưỡng cẩn thận hạ xuống, không ai chủ ý",
      "Bên có rủi ro cao nhất là bên tích cực nhất đi tìm lớp bảo vệ",
      "Giữ một phần hậu quả ở lại phía người ra quyết định là biện pháp hiệu quả nhất",
      "Cơ chế bảo vệ âm thầm che đi chính vấn đề nó đang che chở",
    ],
    summary: {
      keyIdea: "Lớp bảo vệ đổi hành vi, và phần đổi ấy ăn mất một phần lợi ích của chính nó",
      commonMistake: "Tính lợi ích của biện pháp an toàn trong một thế giới có mức cẩn thận cũ",
      action: "Với mỗi lớp bảo vệ, thiết kế sao cho có tín hiệu khi nó kích hoạt và người gây ra là người xử lý.",
    },
    application: {
      title: "Đừng để hậu quả biến mất hẳn",
      message:
        "Mỗi cơ chế tự khôi phục cần một tín hiệu thấy được và một người chịu trách nhiệm xử lý. Không có hai thứ đó, tần suất kích hoạt sẽ tăng mà không ai biết.",
      secondary:
        "Đo lại lợi ích sau sáu tháng vận hành - con số trước triển khai được tính trong một thế giới đã không còn.",
    },
    sections: [
      {
        type: "lead",
        text: "Mọi lớp bảo vệ đều làm hai việc: giảm hậu quả của sự cố, và đổi cách người ta hành động vì hậu quả đã nhẹ đi. Phép tính lợi ích thường chỉ tính việc thứ nhất.",
      },
      {
        type: "heading",
        text: "Hai lệch động cơ, hai thời điểm",
      },
      {
        type: "comparison",
        left: {
          label: "Trước khi có lớp bảo vệ",
          text: "Bên biết mình mong manh nhất là bên tích cực nhất đi tìm nó. Nên tập khách của bất kỳ dịch vụ bảo vệ nào cũng rủi ro cao hơn mức trung bình.",
        },
        right: {
          label: "Sau khi có lớp bảo vệ",
          text: "Hậu quả một lỗi nhẹ đi, nên mức cẩn thận hợp lý cũng giảm. Mọi người điều chỉnh mà không nhận ra mình đang điều chỉnh.",
        },
      },
      {
        type: "paragraph",
        text: "Cả hai cơ chế đều không phải chuyện đạo đức của ai. Chúng là phản ứng hợp lý trước một thay đổi trong cấu trúc hậu quả, và chúng xuất hiện ở mọi tổ chức bất kể văn hoá. Vì vậy cách xử lý cũng phải ở tầng cấu trúc chứ không ở tầng nhắc nhở.",
      },
      {
        type: "callout",
        label: "Bảo vệ âm thầm là loại tệ nhất",
        text: "Một cơ chế tự khôi phục không để lại tín hiệu nào sẽ che đi chính vấn đề nó đang che chở. Tần suất kích hoạt tăng dần, không ai thấy, cho tới lần rơi vào trường hợp cơ chế ấy không xử lý được - và lúc đó tất cả những lần trước đã trôi qua mà không ai học được gì.",
      },
      {
        type: "closing",
        lines: [
          "Lớp bảo vệ vẫn đáng dựng; chỉ có phép tính lợi ích là phải trừ đi phần hành vi ăn mất.",
          "Bài sau: chi phí thật của việc chuẩn bị, và chỗ giá trị thực sự đến từ đâu.",
        ],
      },
    ],
  },
  {
    id: 1745,
    slug: "chi-phi-that-cua-viec-chuan-bi",
    title: "Sự kiện hiếm, Bài 5: Chi phí thật của việc chuẩn bị",
    subtitle: "Phần đắt không phải lúc dựng, mà là khoản đều đặn để nó còn hoạt động khi cần",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🧮",
    track: "professional",
    whyItMatters:
      "Ngân sách cho một biện pháp phòng ngừa gần như luôn được duyệt theo chi phí dựng. Thứ quyết định biện pháp ấy có hoạt động vào ngày cần tới lại là khoản đều đặn phía sau, và khoản đó thường không được duyệt cùng.",
    openingQuestion: "Phần nào của một biện pháp phòng ngừa hay bị bỏ khỏi phép tính chi phí?",
    openingOptions: [
      "Khoản đều đặn để kiểm rằng nó vẫn hoạt động",
      "Chi phí hạ tầng để duy trì hệ thống dự phòng ở trạng thái sẵn sàng hoạt động",
      "Thời gian đào tạo đội ngũ về quy trình sử dụng biện pháp phòng ngừa đó",
      "Chi phí cập nhật biện pháp mỗi khi hệ thống chính có thay đổi lớn về kiến trúc",
    ],
    correctOption: 0,
    explanation:
      "Ba khoản kia đều có hoá đơn hoặc có mặt trong kế hoạch, nên chúng thường được tính. Khoản kiểm định kỳ thì không: nó không tạo ra gì mới, không ai đòi, và nó cạnh tranh thời gian với công việc có người chờ. Vì thế nó là khoản đầu tiên bị cắt khi bận, và việc cắt nó không gây hậu quả gì trong nhiều tháng - cho tới ngày cần tới biện pháp phòng ngừa và phát hiện nó đã hỏng từ lâu. Một bản sao lưu chưa từng được khôi phục thử thì chưa phải một bản sao lưu, và một cơ chế chuyển đổi dự phòng chưa từng được kích hoạt thì chỉ là một giả định có tên gọi.",
    diagram: [
      { label: "Chi phí dựng: được duyệt, có trong kế hoạch", arrow: true },
      { label: "Chi phí kiểm định kỳ: không ai đòi, không tạo ra gì", arrow: true },
      { label: "Bị cắt khi bận, không hậu quả trong nhiều tháng", arrow: true },
      { label: "Ngày cần tới thì biện pháp đã hỏng từ lâu" },
    ],
    realWorldExample: {
      company: "Chuyển đổi dự phòng chưa từng chạy",
      description:
        "Một hệ thống có cơ chế chuyển sang vùng dự phòng, dựng công phu và được duyệt ngân sách đầy đủ. Trong hai năm nó chưa từng được kích hoạt, kể cả để thử. Đến lần cần thật, cơ chế chạy và dừng ở bước giữa vì một khoá truy cập đã hết hạn từ nhiều tháng. Phần dựng đúng; phần không ai kiểm mới là phần hỏng.",
    },
    quiz: [
      {
        question: "Vì sao khoản kiểm định kỳ hay bị cắt đầu tiên?",
        options: [
          "Vì nó không tạo ra gì mới và không có ai đang chờ kết quả của nó",
          "Vì phải dừng hệ thống nên khó xếp lịch",
          "Vì kết quả kiểm hầu như luôn tốt nên nó dần bị coi là một thủ tục hình thức",
          "Vì cần người giỏi, mà họ thì bận",
        ],
        correct: 0,
        explanation:
          "Ba lý do kia làm việc kiểm khó hơn và không quyết định thứ tự ưu tiên. Thứ quyết định là mọi việc khác đều có một người đang chờ, còn việc này thì không - nên nó luôn ở cuối hàng, và ở cuối hàng thì nó không bao giờ tới lượt vào những tuần bận.",
      },
      {
        question: "Cách nào giữ được khoản kiểm định kỳ không bị cắt?",
        options: [
          "Tự động hoá và đặt lịch, để nó không cần ai quyết định làm hay không",
          "Đưa nó vào kế hoạch quý với người phụ trách và thời hạn cụ thể được ghi rõ",
          "Báo kết quả lên cấp trên để tạo áp lực",
          "Gộp việc kiểm vào quy trình phát hành",
        ],
        correct: 0,
        explanation:
          "Mọi cách còn phụ thuộc vào một quyết định của con người trong một tuần bận đều sẽ thua trong một tuần bận nào đó. Tự động hoá bỏ hẳn quyết định ấy ra khỏi vòng, và nó cũng là cách duy nhất khiến việc kiểm vẫn chạy khi người từng lập ra nó đã chuyển đi.",
      },
      {
        question: "Thế nào là một phép kiểm có ý nghĩa cho biện pháp phòng ngừa?",
        options: [
          "Chạy đúng cơ chế đó trên đường đi thật, không phải kiểm rằng nó tồn tại",
          "Kiểm tra đầy đủ các thành phần của biện pháp phòng ngừa còn hoạt động bình thường",
          "Đối chiếu cấu hình với tài liệu thiết kế",
          "Rà soát nhật ký tìm dấu hiệu bất thường",
        ],
        correct: 0,
        explanation:
          "Ba cách kia đều kiểm được rằng các mảnh còn đó, và cái hỏng thường không phải một mảnh mà là chỗ nối giữa chúng - một khoá hết hạn, một quyền bị thu hồi, một bước thủ công mà người biết làm đã nghỉ. Chỉ chạy hết đường đi thật mới chạm tới những chỗ đó.",
      },
      {
        question: "Giá trị của một biện pháp phòng ngừa nên được đo bằng gì?",
        options: [
          "Xác suất nó hoạt động đúng vào ngày cần, nhân với thiệt hại nó chặn được",
          "Mức thiệt hại tối đa mà biện pháp đó có khả năng ngăn chặn khi sự cố xảy ra",
          "Tỷ lệ giữa chi phí đầu tư và mức thiệt hại kỳ vọng mà nó giúp tránh được",
          "Thời gian khôi phục mà biện pháp đó rút ngắn được so với khi không có nó",
        ],
        correct: 0,
        explanation:
          "Vế xác suất hoạt động đúng hầu như không bao giờ xuất hiện trong đề xuất nào, và nó thường là vế nhỏ nhất. Một biện pháp chặn được thiệt hại lớn nhưng chỉ chạy đúng ở nửa số lần cần tới thì giá trị thật bằng một nửa con số đang được trình bày.",
      },
      {
        question: "Khi ngân sách hạn chế, nên ưu tiên thế nào?",
        options: [
          "Ít biện pháp hơn nhưng được kiểm đều, thay vì nhiều biện pháp không ai kiểm",
          "Nhiều biện pháp phòng ngừa để phủ được càng nhiều loại rủi ro càng tốt",
          "Các biện pháp có chi phí dựng thấp nhất để tối đa hoá số rủi ro được phủ",
          "Các biện pháp dành cho những rủi ro có tần suất cao nhất trong danh mục hiện có",
        ],
        correct: 0,
        explanation:
          "Ba biện pháp không được kiểm có giá trị kỳ vọng thấp hơn một biện pháp được kiểm đều, dù trên giấy chúng phủ ba rủi ro thay vì một. Đây là phép so ít khi được làm, vì cột xác suất hoạt động đúng không có trong bảng nào.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn đề xuất ngân sách cho một biện pháp phòng ngừa. Cần đưa thêm gì ngoài chi phí dựng?",
      options: [
        "Khoản đều đặn để kiểm nó, và cách kiểm đó được tự động hoá ra sao",
        "Chi phí vận hành và duy trì hạ tầng cho biện pháp đó trong các năm tiếp theo",
        "Mức thiệt hại mà nó giúp tránh được",
        "So sánh với chi phí của các phương án thay thế để cho thấy đây là lựa chọn tốt nhất",
      ],
      correct: 0,
      explanation:
        "Ba thứ kia đều đã có trong mọi đề xuất chuẩn. Khoản kiểm định kỳ thì không, và nó là khoản quyết định biện pháp có hoạt động vào ngày cần hay không - tức là quyết định toàn bộ giá trị của phần ngân sách đang xin.",
    },
    keyTakeaways: [
      "Phần đắt là khoản đều đặn phía sau, không phải chi phí dựng",
      "Việc kiểm bị cắt đầu tiên vì nó không có ai đang chờ kết quả",
      "Cái hỏng thường là chỗ nối, nên phải chạy hết đường đi thật",
      "Ba biện pháp không ai kiểm có giá trị thấp hơn một biện pháp kiểm đều",
    ],
    summary: {
      keyIdea: "Giá trị của một biện pháp phòng ngừa bằng thiệt hại nó chặn nhân với xác suất nó còn chạy",
      commonMistake: "Duyệt chi phí dựng mà không duyệt khoản đều đặn để kiểm, rồi phát hiện nó hỏng vào đúng ngày cần",
      action: "Mỗi biện pháp phòng ngừa đi kèm một phép kiểm tự động theo lịch, chạy hết đường đi thật.",
    },
    application: {
      title: "Thêm một cột vào bảng rủi ro",
      message:
        "Bên cạnh cột biện pháp, thêm cột lần cuối nó được chạy thử hết đường đi. Dòng nào để trống là dòng bạn đang ghi nhận một sự bảo vệ không kiểm chứng được.",
      secondary:
        "Nếu ngân sách chỉ đủ cho một biện pháp được kiểm đều hoặc ba biện pháp không ai kiểm, chọn cái thứ nhất.",
    },
    sections: [
      {
        type: "lead",
        text: "Một biện pháp phòng ngừa được duyệt theo chi phí dựng, và được đánh giá theo thiệt hại nó chặn được. Cả hai con số đều bỏ qua vế quyết định: xác suất nó còn hoạt động vào ngày cần.",
      },
      {
        type: "heading",
        text: "Khoản không ai đòi",
      },
      {
        type: "paragraph",
        text: "Việc kiểm định kỳ không tạo ra tính năng nào, không có người dùng nào chờ, và kết quả gần như luôn là mọi thứ ổn. Ba đặc điểm ấy đưa nó xuống cuối hàng trong mọi tuần bận, và việc bỏ nó không gây hậu quả gì suốt nhiều tháng. Cơ chế này giống hệt cơ chế đã nói ở bài một, chỉ khác là ở đây nó ăn mòn chính thứ được dựng ra để phòng bài một.",
      },
      {
        type: "formula",
        title: "Giá trị thật của một biện pháp phòng ngừa",
        equation: "Thiệt hại chặn được × Xác suất nó hoạt động đúng vào ngày cần",
        variables: [
          { symbol: "Thiệt hại chặn được", name: "Con số trong đề xuất", description: "Luôn có mặt, và thường là con số duy nhất được trình bày" },
          { symbol: "Xác suất hoạt động đúng", name: "Vế bị bỏ quên", description: "Phụ thuộc gần như hoàn toàn vào việc có kiểm định kỳ hay không" },
        ],
        example: {
          title: "Biện pháp chặn được 10 tỷ, chạy đúng ở một nửa số lần cần",
          calculation: "10 tỷ × 0,5",
          result: "Giá trị thật 5 tỷ, không phải 10 tỷ",
          explanation: "Và vế thứ hai không phải hằng số - nó giảm dần theo thời gian nếu không ai chạy thử hết đường đi.",
        },
      },
      {
        type: "callout",
        label: "Kiểm rằng nó tồn tại không phải là kiểm",
        text: "Rà soát cấu hình, đối chiếu tài liệu, xem nhật ký - tất cả đều xác nhận rằng các mảnh còn đó. Thứ hỏng thường không phải một mảnh mà là chỗ nối: một khoá hết hạn, một quyền bị thu hồi, một bước thủ công mà người biết làm đã chuyển đi. Chỉ chạy hết đường đi thật mới chạm tới chúng, và đó cũng là lý do phép kiểm ấy tốn thời gian.",
      },
      {
        type: "closing",
        lines: [
          "Một biện pháp phòng ngừa không được kiểm là một dòng trong tài liệu, không phải một lớp bảo vệ.",
          "Chặng này không dạy cách làm hệ thống ít hỏng hơn; nó dạy cách suy nghĩ về những lần hỏng mà bạn gần như không bao giờ thấy.",
        ],
      },
    ],
  },
];
