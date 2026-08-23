import type { Lesson } from "./lesson-types";

// Cụm "Chọn công cụ trả phí cho công việc" (ids 1761-1763, personal track).
//
// VÌ SAO CỤM NÀY TỒN TẠI. Kho đã có nhiều bài về chi phí hạ tầng (chặng 13) và
// về điều khoản kho ứng dụng (chặng 17, bài 2). Không bài nào trả lời câu hỏi
// hẹp mà người làm nghề gặp thường xuyên nhất: trước một công cụ trả phí, đọc
// gì để biết mình đang mua cái gì. Ba bài ở đây đi theo đúng thứ tự đó - điều
// khoản, số liệu nhà cung cấp trưng ra, rồi so hai lựa chọn và chốt.
//
// KHÔNG TRÙNG BA VÙNG ĐÃ CÓ. Chặng 13 nói về cơ chế hoá đơn hạ tầng theo mức
// dùng. Chặng 17 bài 2 nói về kho ứng dụng với tư cách kênh phân phối. Nhánh
// `professional` giữ SLI/SLO/SLA, sao lưu và khôi phục. Cụm này đứng ở phía
// người bỏ tiền mua một công cụ, và chỉ ở đó.

export const PAID_TOOLS_LESSONS: Lesson[] = [
  {
    id: 1761,
    slug: "dieu-khoan-ho-tro-va-gioi-han",
    title: "Chọn công cụ, Bài 1: Điều khoản quyết định bạn có được giúp hay không",
    subtitle: "Phần quyết định nằm ở danh sách loại trừ, không ở trang giới thiệu",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "📄",
    track: "personal",
    whyItMatters:
      "Người ta chọn công cụ theo danh sách tính năng và trả tiền theo bảng giá, rồi phát hiện thứ mình cần nhất nằm ngoài gói đang dùng hoặc ngoài phạm vi được hỗ trợ. Cả hai điều đó đều đã được viết ra trước khi bạn trả tiền.",
    openingQuestion: "Phần nào của một điều khoản dịch vụ quyết định bạn có được giúp khi hỏng việc?",
    openingOptions: [
      "Phạm vi hỗ trợ và danh sách những gì không được hỗ trợ",
      "Mức phí bạn đang trả, vì gói cao hơn thì luôn được hỗ trợ nhanh hơn và đầy đủ hơn",
      "Cam kết thời gian phản hồi ở trang giới thiệu",
      "Kênh liên hệ mà nhà cung cấp mở ra cho khách hàng đang dùng gói trả phí của họ",
    ],
    correctOption: 0,
    explanation:
      "Ba thứ kia đều có thật và đều được nêu ở chỗ dễ thấy. Thứ quyết định thì nằm ở chỗ ít ai đọc: định nghĩa phạm vi hỗ trợ, và danh sách những trường hợp nằm ngoài. Một dịch vụ có thể cam kết phản hồi trong một giờ và vẫn đúng cam kết khi trả lời rằng vấn đề của bạn thuộc nhóm không được hỗ trợ. Những nhóm hay bị loại trừ gồm: lỗi phát sinh khi dùng qua giao diện lập trình thay vì giao diện chính thức, sự cố ở phần bạn tự cấu hình, và mọi thứ liên quan tới việc tích hợp với dịch vụ của bên thứ ba. Đọc danh sách ấy trước mất mười phút và nó dự đoán trải nghiệm của bạn tốt hơn mọi đánh giá trên mạng.",
    diagram: [
      { label: "Trang giới thiệu: tính năng và cam kết phản hồi", arrow: true },
      { label: "Điều khoản: định nghĩa phạm vi hỗ trợ", arrow: true },
      { label: "Danh sách loại trừ: nơi câu trả lời thật nằm", arrow: true },
      { label: "Đọc từ dưới lên thì mất mười phút" },
    ],
    realWorldExample: {
      company: "Cam kết một giờ và một câu trả lời đúng hạn",
      description:
        "Một đội chọn dịch vụ vì cam kết phản hồi trong một giờ. Đến khi luồng đồng bộ dữ liệu hỏng, họ nhận được trả lời sau bốn mươi phút: sự cố nằm ở phần tích hợp với một dịch vụ khác, thuộc nhóm không được hỗ trợ, và họ nên liên hệ bên kia. Cam kết được giữ đúng từng chữ. Điều họ mua không phải thứ họ nghĩ mình đã mua.",
    },
    quiz: [
      {
        question: "Vì sao nên đọc danh sách loại trừ trước khi đọc danh sách tính năng?",
        options: [
          "Vì tính năng cho biết công cụ làm được gì, còn loại trừ cho biết bạn được giúp tới đâu",
          "Vì danh sách loại trừ thường ngắn hơn nên đọc trước sẽ tiết kiệm thời gian hơn đáng kể",
          "Vì các tính năng được quảng cáo thường không chính xác bằng phần điều khoản pháp lý",
          "Vì nhà cung cấp có thể thay đổi tính năng bất cứ lúc nào còn loại trừ thì ổn định hơn",
        ],
        correct: 0,
        explanation:
          "Hai danh sách trả lời hai câu hỏi khác nhau, và câu thứ hai mới là câu bạn sẽ cần vào đúng ngày mọi thứ hỏng. Một công cụ có đủ mọi tính năng bạn cần vẫn có thể là lựa chọn tệ nếu đúng phần bạn dựa vào lại nằm ngoài phạm vi được hỗ trợ.",
      },
      {
        question: "Hạn mức sử dụng trong một gói trả phí nên được kiểm thế nào?",
        options: [
          "Xem điều gì xảy ra khi vượt: chặn lại hay tính thêm tiền",
          "So sánh hạn mức của các gói khác nhau để chọn gói có hạn mức cao nhất trong tầm ngân sách",
          "Ước lượng mức sử dụng hiện tại rồi chọn gói có hạn mức cao hơn khoảng gấp đôi cho an toàn",
          "Kiểm tra xem hạn mức được tính theo tháng hay theo năm để lập kế hoạch sử dụng phù hợp",
        ],
        correct: 0,
        explanation:
          "Đây là khác biệt lớn nhất giữa hai loại hạn mức và nó hiếm khi được nêu ở bảng giá. Hạn mức cứng thì dịch vụ dừng và bạn biết ngay; hạn mức mềm thì mọi thứ vẫn chạy và bạn biết vào cuối kỳ, qua hoá đơn. Cả hai đều dùng được, nhưng chúng đòi hỏi hai cách chuẩn bị khác nhau.",
      },
      {
        question: "Điều khoản nào đáng chú ý nhất khi công cụ giữ dữ liệu của bạn?",
        options: [
          "Cách lấy toàn bộ dữ liệu ra, và ở định dạng nào",
          "Nhà cung cấp cam kết bảo mật dữ liệu của khách hàng theo những tiêu chuẩn nào hiện nay",
          "Dữ liệu của bạn được lưu trữ ở khu vực địa lý nào và có tuân thủ quy định nơi đó không",
          "Nhà cung cấp có quyền sử dụng dữ liệu của bạn cho các mục đích nội bộ của họ hay không",
        ],
        correct: 0,
        explanation:
          "Ba điều kia đều đáng đọc và chúng nói về lúc mọi thứ bình thường. Điều này nói về lúc bạn muốn đi, và đó là lúc bạn không còn sức mặc cả nào. Xuất được ra một định dạng mở là khác biệt giữa đổi công cụ trong một tuần và bị giữ lại vì chi phí rời đi quá cao.",
      },
      {
        question: "Điều khoản đơn phương thay đổi giá nên được hiểu ra sao?",
        options: [
          "Là chuyện bình thường; điều đáng xem là bạn được báo trước bao lâu",
          "Là dấu hiệu nhà cung cấp không ổn định về mặt tài chính nên cần cân nhắc lại lựa chọn",
          "Là điều khoản chỉ áp dụng cho khách hàng mới còn hợp đồng đang chạy thì giữ nguyên giá",
          "Là thứ thương lượng bỏ được nếu cam kết dài",
        ],
        correct: 0,
        explanation:
          "Gần như mọi dịch vụ đều có điều khoản này và không có nó thì họ không kinh doanh được. Thứ tạo ra khác biệt thực tế là thời gian báo trước: ba mươi ngày đủ để bạn phản ứng, còn có hiệu lực ngay ở kỳ thanh toán kế tiếp thì không.",
      },
      {
        question: "Bản dùng thử miễn phí nên được dùng để kiểm điều gì?",
        options: [
          "Đúng phần việc khó nhất mà bạn định giao cho công cụ này",
          "Toàn bộ các tính năng được quảng cáo để đảm bảo không có tính năng nào hoạt động sai",
          "Tốc độ và độ ổn định khi dùng hằng ngày",
          "Chất lượng hỗ trợ bằng cách gửi vài câu hỏi và đo thời gian nhận được phản hồi",
        ],
        correct: 0,
        explanation:
          "Bản dùng thử có thời hạn nên nó là một quỹ nhỏ và phải tiêu đúng chỗ. Mọi công cụ đều xử lý tốt trường hợp thông thường; thứ phân biệt chúng là trường hợp khó nhất của bạn, và đó cũng là thứ quyết định bạn có phải đổi công cụ sau sáu tháng hay không.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn định mua một công cụ và đã đọc bảng giá cùng danh sách tính năng. Việc tiếp theo nên là gì?",
      options: [
        "Tìm phần định nghĩa phạm vi hỗ trợ và danh sách loại trừ",
        "Đọc các đánh giá của người dùng khác để biết trải nghiệm thực tế khi sử dụng công cụ này",
        "So sánh với hai công cụ tương đương khác trên thị trường về mặt tính năng và mức giá",
        "Đăng ký bản dùng thử để kiểm tra xem giao diện có phù hợp với cách làm việc của bạn",
      ],
      correct: 0,
      explanation:
        "Ba việc kia đều nên làm và đều nói về lúc mọi thứ chạy tốt. Phần loại trừ nói về ngày mọi thứ hỏng, và nó là phần duy nhất trong bốn thứ mà bạn không tìm được ở đâu khác ngoài chính văn bản đó.",
    },
    keyTakeaways: [
      "Cam kết phản hồi nhanh vẫn đúng khi câu trả lời là vấn đề này không được hỗ trợ",
      "Nhóm hay bị loại trừ: dùng qua giao diện lập trình, phần bạn tự cấu hình, tích hợp bên thứ ba",
      "Hạn mức cứng thì dừng và biết ngay; hạn mức mềm thì biết qua hoá đơn",
      "Điều khoản xuất dữ liệu là thứ quyết định bạn có đi được không",
      "Bản dùng thử là quỹ nhỏ; tiêu vào đúng phần việc khó nhất",
    ],
    summary: {
      keyIdea: "Trang giới thiệu nói công cụ làm được gì; danh sách loại trừ nói bạn được giúp tới đâu",
      commonMistake: "Chọn theo cam kết thời gian phản hồi mà không đọc định nghĩa phạm vi hỗ trợ",
      action: "Trước khi trả tiền, tìm phần loại trừ và kiểm xem phần việc bạn dựa vào có nằm trong đó không.",
    },
    application: {
      title: "Đọc ngược từ dưới lên",
      message:
        "Mở điều khoản, tìm phần loại trừ trước, rồi mới đọc lên. Mười phút đó dự đoán trải nghiệm của bạn tốt hơn mọi bài đánh giá.",
      secondary:
        "Ghi lại ba dòng: cái gì không được hỗ trợ, vượt hạn mức thì sao, và lấy dữ liệu ra bằng cách nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Một công cụ trả phí được chọn bằng trang giới thiệu và được trả tiền bằng bảng giá. Cả hai trang đó đều không nói cho bạn biết chuyện gì xảy ra vào ngày bạn cần tới nó nhất.",
      },
      {
        type: "heading",
        text: "Cam kết đúng và câu trả lời vô dụng",
      },
      {
        type: "paragraph",
        text: "Một dịch vụ cam kết phản hồi trong một giờ có thể giữ đúng cam kết ấy và vẫn không giúp được gì, nếu câu trả lời là vấn đề của bạn nằm ngoài phạm vi hỗ trợ. Hai thứ đó không mâu thuẫn nhau: cam kết nói về tốc độ trả lời, phạm vi nói về việc có trả lời hay không. Chỉ một trong hai được in ở trang đầu.",
      },
      {
        type: "comparison",
        left: {
          label: "Hạn mức cứng",
          text: "Chạm ngưỡng thì dịch vụ dừng hoặc chậm lại. Khó chịu ngay lập tức, nhưng bạn biết vào đúng lúc nó xảy ra và không có hoá đơn bất ngờ nào ở cuối kỳ.",
        },
        right: {
          label: "Hạn mức mềm",
          text: "Vượt ngưỡng thì mọi thứ vẫn chạy và phần vượt được tính thêm tiền. Không có gì hỏng, và bạn biết vào cuối tháng qua một con số lớn hơn dự tính.",
        },
      },
      {
        type: "heading",
        text: "Ba nhóm hay nằm ngoài phạm vi",
      },
      {
        type: "paragraph",
        text: "Thứ nhất là mọi thứ đi qua giao diện lập trình thay vì giao diện chính thức - đúng cách mà một đội kỹ thuật sẽ dùng. Thứ hai là phần bạn tự cấu hình, và ranh giới giữa cấu hình sai với lỗi dịch vụ thường do chính nhà cung cấp định nghĩa. Thứ ba là mọi thứ liên quan tới tích hợp với dịch vụ khác, tức là chỗ hay hỏng nhất trong thực tế.",
      },
      {
        type: "formula",
        title: "Chi phí thật mỗi tháng",
        equation: "(Giá gói × Số người dùng) + Phần vượt hạn mức × Đơn giá vượt",
        variables: [
          { symbol: "Giá gói", name: "Con số trên bảng giá", description: "Thường tính theo từng người dùng, không phải cho cả đội" },
          { symbol: "Số người dùng", name: "Ghế phải trả tiền", description: "Kiểm xem tài khoản không hoạt động có bị tính không" },
          { symbol: "Phần vượt", name: "Mức dùng trên hạn mức", description: "Chỉ tồn tại với hạn mức mềm; với hạn mức cứng thì bằng không" },
        ],
        example: {
          title: "Gói 12 đô mỗi người, đội 8 người, vượt 20% hạn mức gọi",
          calculation: "12 × 8 + phần vượt tính riêng theo đơn giá",
          result: "96 đô cộng phần vượt, không phải 96 đô",
          explanation: "Con số trên bảng giá là con số nhỏ nhất bạn sẽ trả. Với hạn mức mềm, hoá đơn thật chỉ hiện ra sau kỳ đầu tiên.",
        },
      },
      {
        type: "heading",
        text: "Đọc theo thứ tự nào",
      },
      {
        type: "list",
        items: [
          "Danh sách loại trừ trước - phần việc bạn dựa vào có nằm trong đó không",
          "Hạn mức: cứng hay mềm, và vượt thì tính thế nào",
          "Xuất dữ liệu: lấy toàn bộ ra được không, ở định dạng nào",
          "Thay đổi giá: được báo trước bao lâu",
        ],
      },
      {
        type: "callout",
        label: "Bản dùng thử là một quỹ nhỏ, đừng tiêu dàn trải",
        text: "Cám dỗ là thử hết mọi tính năng để chắc chắn không sót gì. Mọi công cụ đều làm tốt trường hợp thông thường, nên thử dàn trải cho ra cùng một kết quả với mọi lựa chọn. Thứ phân biệt chúng là phần việc khó nhất của bạn, và đó cũng là thứ quyết định sáu tháng nữa bạn có phải đổi công cụ hay không.",
      },
      {
        type: "closing",
        lines: [
          "Điều khoản không phải thứ đọc sau khi mua; nó là phần duy nhất nói về ngày mọi thứ hỏng.",
          "Bài sau: những con số nhà cung cấp trưng ra, và điều kiện để chúng đúng.",
        ],
      },
    ],
  },
  {
    id: 1762,
    interactiveType: "ethics-case",
    slug: "doc-so-lieu-nha-cung-cap-trung-ra",
    title: "Chọn công cụ, Bài 2: Đọc số liệu nhà cung cấp trưng ra",
    subtitle: "Con số thường đúng; điều kiện để nó đúng mới là thứ cần đọc",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "📈",
    track: "personal",
    whyItMatters:
      "Mọi nhà cung cấp đều công bố số liệu chứng minh mình nhanh hơn, rẻ hơn hoặc ổn định hơn. Phần lớn những con số ấy không sai. Chúng chỉ được đo trong một điều kiện mà bạn sẽ không bao giờ có, và điều kiện đó nằm ở chú thích.",
    openingQuestion: "Một con số hiệu năng do chính nhà cung cấp công bố nên được đọc thế nào?",
    openingOptions: [
      "Đọc điều kiện đo trước, rồi mới đọc con số",
      "So sánh với số liệu tương ứng của các nhà cung cấp khác để biết vị trí trên thị trường",
      "Coi như một mức trần lý thuyết rồi tự chia đôi để có được ước lượng an toàn hơn",
      "Kiểm tra xem con số đó có được một bên thứ ba độc lập xác nhận lại hay không",
    ],
    correctOption: 0,
    explanation:
      "Con số hiếm khi bị bịa, vì bịa thì dễ bị bắt và rất đắt. Thứ được chọn là điều kiện đo: tập dữ liệu vừa đủ nhỏ để nằm gọn trong bộ nhớ, mạng cùng khu vực, không có tải nào khác chạy song song, và phép đo lấy giá trị tốt nhất trong nhiều lần thay vì giá trị trung vị. Mỗi lựa chọn ấy đều hợp lệ và đều được ghi ở chú thích. Cộng lại, chúng tạo ra một con số đúng trong một thế giới không phải thế giới của bạn. Chia đôi cho an toàn nghe có vẻ thận trọng nhưng đó là đoán chứ không phải đọc - hệ số thật có thể là hai, có thể là hai mươi, tuỳ vào chính những điều kiện mà bạn vừa bỏ qua.",
    diagram: [
      { label: "Con số nổi bật: thường đúng", arrow: true },
      { label: "Chú thích: tập dữ liệu, cấu hình, cách lấy mẫu", arrow: true },
      { label: "So với điều kiện thật của bạn", arrow: true },
      { label: "Khoảng cách giữa hai điều kiện chính là câu trả lời" },
    ],
    realWorldExample: {
      company: "Nhanh gấp mười lần, trong một điều kiện",
      description:
        "Một đội chọn công cụ vì số liệu công bố cho thấy nó nhanh gấp mười lần lựa chọn hiện tại. Đọc kỹ chú thích: phép đo chạy trên tập dữ liệu nằm gọn trong bộ nhớ, máy khách cùng khu vực với máy chủ, và lấy giá trị nhanh nhất trong hai mươi lần chạy. Dữ liệu thật của họ lớn gấp nhiều lần và người dùng nằm rải khắp nơi. Con số họ thấy sau khi chuyển là nhanh hơn khoảng một lần rưỡi.",
    },
    quiz: [
      {
        question: "Vì sao giá trị trung vị nói nhiều hơn giá trị tốt nhất?",
        options: [
          "Vì người dùng gặp phân bố chứ không gặp một lần chạy may mắn",
          "Vì trung vị tính trên toàn bộ số lần đo",
          "Vì giá trị tốt nhất có thể là kết quả của một lỗi đo lường chứ không phải hiệu năng thật",
          "Vì các nhà cung cấp thường không công bố số lần chạy nên giá trị tốt nhất khó kiểm chứng",
        ],
        correct: 0,
        explanation:
          "Một lần chạy nhanh nhất trong hai mươi lần là một sự kiện có thật và cũng là sự kiện mà người dùng của bạn gặp khoảng năm phần trăm số lần. Điều họ gặp phần lớn thời gian là vùng giữa, và điều họ nhớ lâu nhất là vùng đuôi chậm - đúng hai chỗ mà giá trị tốt nhất không nói gì.",
      },
      {
        question: "Chú thích nào của một phép đo đáng chú ý nhất?",
        options: [
          "Kích thước tập dữ liệu và nó có nằm gọn trong bộ nhớ hay không",
          "Phiên bản phần mềm và ngày tiến hành đo",
          "Cấu hình máy chủ: số lõi và bộ nhớ",
          "Số lần lặp lại và khoảng cách giữa các lần",
        ],
        correct: 0,
        explanation:
          "Ba thứ kia đều đáng đọc và chúng thường tạo ra khác biệt vài chục phần trăm. Ranh giới nằm gọn trong bộ nhớ hay không thì tạo ra khác biệt nhiều lần, vì vượt qua nó là chuyển từ một loại thao tác sang một loại thao tác khác hẳn về bản chất.",
      },
      {
        question: "Số liệu so sánh với đối thủ do một bên công bố nên được đọc ra sao?",
        options: [
          "Xem cấu hình của bên bị so có được tối ưu tương đương hay không",
          "Coi là không đáng tin vì bên công bố luôn có động cơ làm cho mình trông tốt hơn đối thủ",
          "Chấp nhận nếu phương pháp đo chạy lại được",
          "Đối chiếu với số liệu mà bên bị so tự công bố về chính sản phẩm của họ để tìm khác biệt",
        ],
        correct: 0,
        explanation:
          "Cách phổ biến nhất để tạo ra một so sánh có lợi mà không nói dối câu nào là chạy sản phẩm của mình ở cấu hình đã tinh chỉnh kỹ và chạy đối thủ ở cấu hình mặc định. Mọi con số đều thật, phương pháp được mô tả đầy đủ, và kết quả vẫn nói lên rất ít.",
      },
      {
        question: "Cách kiểm số liệu đáng tin nhất trước khi quyết định là gì?",
        options: [
          "Chạy thử trên dữ liệu và tải của chính bạn, dù chỉ ở quy mô nhỏ",
          "Tìm bài đánh giá từ đơn vị độc lập",
          "Hỏi đội khác về con số thực tế họ thấy",
          "Xin thêm số liệu về phương pháp và điều kiện",
        ],
        correct: 0,
        explanation:
          "Ba cách kia đều thêm thông tin và không cách nào trả lời được câu hỏi thật, vì câu hỏi thật là dữ liệu của bạn và tải của bạn. Một phép thử nhỏ trên dữ liệu thật nói nhiều hơn mọi con số công bố, và nó thường mất chưa tới một ngày.",
      },
      {
        question: "Cam kết về mức độ sẵn sàng dịch vụ nên được đọc kèm thứ gì?",
        options: [
          "Cách tính thời gian gián đoạn và những gì không được tính vào đó",
          "Mức bồi thường mà nhà cung cấp cam kết chi trả khi không đạt được cam kết đã công bố",
          "Lịch sử thực tế về các sự cố đã xảy ra trong khoảng thời gian một hoặc hai năm gần đây",
          "Kiến trúc hạ tầng bảo đảm mức sẵn sàng đó",
        ],
        correct: 0,
        explanation:
          "Bảo trì có báo trước thường không được tính, sự cố ở phần bạn tự cấu hình cũng không, và nhiều nơi chỉ tính khi dịch vụ hỏng hoàn toàn chứ không tính lúc nó chậm tới mức không dùng được. Con số cam kết vì thế có thể đúng trong khi trải nghiệm của bạn tệ hơn hẳn.",
      },
    ],
    practicePrompt: {
      question:
        "Nhà cung cấp công bố công cụ của họ xử lý nhanh gấp năm lần so với lựa chọn bạn đang dùng. Nên làm gì?",
      options: [
        "Đọc điều kiện đo, rồi chạy thử trên một phần dữ liệu thật của bạn",
        "Chia con số cho hai hoặc ba cho thận trọng",
        "Tìm bài đánh giá độc lập để kiểm chứng",
        "Hỏi nhà cung cấp chi tiết phương pháp đo",
      ],
      correct: 0,
      explanation:
        "Chia cho hai là đoán, và hệ số thật có thể là một lần rưỡi hoặc hai mươi tuỳ vào chính những điều kiện bạn vừa bỏ qua. Đọc chú thích cho biết khoảng cách giữa hai thế giới; chạy thử cho biết con số của bạn. Không cách nào khác trong bốn cách này làm được điều thứ hai.",
    },
    keyTakeaways: [
      "Con số hiếm khi bị bịa; điều kiện đo mới là thứ được chọn",
      "Ranh giới nằm gọn trong bộ nhớ hay không tạo ra khác biệt nhiều lần",
      "Trung vị nói về thứ người dùng gặp; giá trị tốt nhất nói về một lần may mắn",
      "So sánh với đối thủ hay được tạo ra bằng cấu hình tinh chỉnh so với cấu hình mặc định",
      "Cam kết sẵn sàng phải đọc kèm định nghĩa thời gian gián đoạn",
    ],
    summary: {
      keyIdea: "Số liệu nhà cung cấp trưng ra thường đúng trong một thế giới không phải thế giới của bạn",
      commonMistake: "Chia con số cho hai để cho an toàn, tức là đoán thay vì đọc chú thích",
      action: "Đọc điều kiện đo trước con số, rồi chạy một phép thử nhỏ trên dữ liệu thật của bạn.",
    },
    application: {
      title: "Một buổi chiều đáng giá hơn mọi trang số liệu",
      message:
        "Lấy một phần dữ liệu thật của bạn, chạy qua công cụ đang cân nhắc, đo trung vị chứ không đo lần nhanh nhất. Con số đó là con số duy nhất nói về bạn.",
      secondary:
        "Nếu không chạy thử được, ít nhất hãy ghi ra ba khác biệt giữa điều kiện đo của họ và điều kiện của bạn.",
    },
    sections: [
      {
        type: "lead",
        text: "Trang số liệu của một nhà cung cấp hiếm khi chứa câu nào sai. Nó chứa những câu đúng được chọn lọc kỹ, và phần chọn lọc nằm ở chú thích cuối trang.",
      },
      {
        type: "heading",
        text: "Không phải nói dối, mà là chọn điều kiện",
      },
      {
        type: "paragraph",
        text: "Bịa số liệu thì dễ bị bắt và rất đắt, nên gần như không ai làm. Thứ được chọn là hoàn cảnh: tập dữ liệu vừa đủ nhỏ, máy khách cùng khu vực, không tải nào khác chạy song song, và lấy lần chạy nhanh nhất. Mỗi lựa chọn đều hợp lệ và đều được ghi ra. Cộng lại, chúng dựng nên một thế giới mà con số ấy đúng - chỉ là bạn không sống ở đó.",
      },
      {
        type: "comparison",
        left: {
          label: "Điều kiện trong bài đo",
          text: "Dữ liệu nằm gọn trong bộ nhớ, mạng cùng khu vực, máy không chạy gì khác, lấy giá trị nhanh nhất trong hai mươi lần chạy liên tiếp.",
        },
        right: {
          label: "Điều kiện của bạn",
          text: "Dữ liệu lớn hơn bộ nhớ, người dùng rải nhiều nơi, máy đang chạy vài thứ khác, và người dùng gặp cả vùng đuôi chậm chứ không chỉ vùng giữa.",
        },
      },
      {
        type: "heading",
        text: "Ba chú thích đáng đọc trước con số",
      },
      {
        type: "paragraph",
        text: "Kích thước tập dữ liệu, vì ranh giới nằm gọn trong bộ nhớ hay không tạo ra khác biệt nhiều lần chứ không phải vài chục phần trăm. Cách lấy mẫu, vì trung vị và giá trị tốt nhất trả lời hai câu hỏi khác nhau. Và cấu hình của bên bị đem ra so, vì tinh chỉnh một bên rồi để bên kia ở mặc định là cách tạo ra so sánh có lợi mà không cần nói dối câu nào.",
      },
      {
        type: "formula",
        title: "Con số bạn sẽ thấy",
        equation: "Con số công bố ÷ (Hệ số dữ liệu × Hệ số mạng × Hệ số tải)",
        variables: [
          { symbol: "Hệ số dữ liệu", name: "Dữ liệu bạn lớn hơn bao nhiêu lần", description: "Lớn nhất khi vượt ngưỡng nằm gọn trong bộ nhớ" },
          { symbol: "Hệ số mạng", name: "Khoảng cách thật tới người dùng", description: "Bài đo thường chạy cùng khu vực, người dùng thì không" },
          { symbol: "Hệ số tải", name: "Những thứ khác đang chạy", description: "Bài đo chạy trên máy trống; hệ thống thật thì không bao giờ trống" },
        ],
        example: {
          title: "Vì sao không nên chỉ chia đôi",
          calculation: "Ba hệ số nhân với nhau, mỗi cái từ 1 tới nhiều lần",
          result: "Khoảng cách thật có thể là 1,5 lần hoặc 20 lần",
          explanation: "Chia đôi cho an toàn là chọn một con số không dựa trên gì. Đọc ba chú thích thì biết hệ số nào trong ba cái đang lớn.",
        },
      },
      {
        type: "callout",
        label: "Một phép thử nhỏ thắng mọi trang số liệu",
        text: "Lấy một phần dữ liệu thật, chạy qua công cụ đang cân nhắc, đo trung vị. Việc này thường mất chưa tới một ngày và nó trả lời đúng câu hỏi bạn đang hỏi, thứ mà không con số công bố nào làm được - vì không con số nào trong đó được đo trên dữ liệu của bạn.",
      },
      {
        type: "closing",
        lines: [
          "Con số công bố cho biết công cụ làm được gì trong điều kiện tốt nhất; phép thử của bạn cho biết nó làm được gì cho bạn.",
          "Bài sau: có hai lựa chọn đều đọc kỹ rồi, chốt bằng cách nào.",
        ],
      },
    ],
  },
  {
    id: 1763,
    slug: "so-hai-cong-cu-va-chot",
    title: "Chọn công cụ, Bài 3: So hai lựa chọn và chốt",
    subtitle: "Quy về cùng một gốc, rồi chọn theo chi phí rời đi chứ không theo tính năng",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "⚖️",
    track: "personal",
    whyItMatters:
      "Đến bước cuối, hai lựa chọn thường ngang nhau về tính năng và chênh nhau ở những thứ khó so. Đó là lúc người ta chọn theo cảm giác, và cũng là lúc một khung so sánh đơn giản đổi hẳn kết quả.",
    openingQuestion: "Khi hai công cụ ngang nhau về tính năng, nên chọn theo tiêu chí nào?",
    openingOptions: [
      "Chi phí rời đi nếu sáu tháng nữa bạn muốn đổi",
      "Mức giá thấp hơn tính trên toàn bộ thời gian dự kiến sử dụng của cả đội trong hai năm tới",
      "Nhà cung cấp có quy mô lớn hơn và lịch sử hoạt động lâu hơn trên thị trường hiện nay",
      "Trải nghiệm sử dụng tốt hơn theo đánh giá của những người trong đội đã dùng thử cả hai",
    ],
    correctOption: 0,
    explanation:
      "Khi hai lựa chọn ngang nhau ở hiện tại, thứ phân biệt chúng là tương lai, và phần tương lai duy nhất bạn ước lượng được là chi phí rời đi. Nó gồm ba thứ đo được: dữ liệu có xuất ra định dạng mở được không, có bao nhiêu chỗ trong hệ thống của bạn gắn trực tiếp vào công cụ đó, và ràng buộc hợp đồng nếu dừng giữa chừng. Chọn lựa chọn dễ rời hơn không phải vì bạn dự định rời, mà vì nó là cách duy nhất giữ được quyền sửa sai. Giá và quy mô nhà cung cấp đều quan trọng, nhưng chúng đã được cân nhắc ở các bước trước và không phải thứ giải được thế bế tắc ở bước cuối.",
    diagram: [
      { label: "Quy hai bảng giá về cùng một gốc", arrow: true },
      { label: "Cộng chi phí ẩn: chuyển đổi, đào tạo, tích hợp", arrow: true },
      { label: "Ước lượng chi phí rời đi của từng bên", arrow: true },
      { label: "Ngang nhau thì chọn bên dễ rời hơn" },
    ],
    realWorldExample: {
      company: "Rẻ hơn hai mươi phần trăm và một năm mắc kẹt",
      description:
        "Một đội chọn công cụ rẻ hơn hai mươi phần trăm. Một năm sau họ muốn đổi và phát hiện dữ liệu chỉ xuất được ở định dạng riêng của nhà cung cấp, cùng với mười hai chỗ trong hệ thống gọi thẳng vào giao diện lập trình của công cụ đó. Việc đổi mất gần ba tháng công. Khoản tiết kiệm của cả năm đầu nhỏ hơn nhiều so với ba tháng ấy.",
    },
    quiz: [
      {
        question: "Vì sao phải quy hai bảng giá về cùng một gốc trước khi so?",
        options: [
          "Vì mỗi bên tính theo một đơn vị khác nhau nên hai con số không so trực tiếp được",
          "Vì các nhà cung cấp thường thay đổi giá theo chu kỳ nên cần một mốc thời gian thống nhất",
          "Vì mức giá công bố thường chưa gồm thuế và các khoản phụ phí phát sinh khi sử dụng",
          "Vì cần tính đến khả năng đội của bạn sẽ mở rộng quy mô trong thời gian sắp tới",
        ],
        correct: 0,
        explanation:
          "Một bên tính theo người dùng, một bên theo lượng dùng, một bên theo dự án. Ba đơn vị ấy cho ba con số không có ý nghĩa khi đặt cạnh nhau. Quy về cùng một gốc - thường là tổng chi phí một năm với mức dùng dự kiến của bạn - mất mười lăm phút và thường đảo ngược thứ tự.",
      },
      {
        question: "Chi phí chuyển đổi nên được tính vào đâu?",
        options: [
          "Vào tổng chi phí năm đầu, vì nó có thật và chỉ phát sinh một lần",
          "Vào một khoản riêng, vì nó không lặp lại",
          "Vào chi phí vận hành, chia đều các năm",
          "Không cần tính, vì bên nào cũng tương đương",
        ],
        correct: 0,
        explanation:
          "Nó không lặp lại, nhưng nó vẫn phải trả và nó khác nhau đáng kể giữa các lựa chọn. Bỏ ra ngoài so sánh vì lý do chỉ một lần là cách phổ biến khiến lựa chọn có giá niêm yết thấp thắng trên giấy trong khi tổng chi năm đầu lại cao hơn.",
      },
      {
        question: "Khi nào thì nên chọn công cụ đắt hơn?",
        options: [
          "Khi phần đắt hơn mua được thứ bạn không tự làm nổi trong cùng số giờ",
          "Khi ngân sách còn dư và muốn khỏi đổi lại",
          "Khi nhà cung cấp đó có uy tín cao hơn hẳn",
          "Khi bên đắt hơn có nhiều tính năng hơn",
        ],
        correct: 0,
        explanation:
          "Đây là phép quy đổi duy nhất làm cho câu hỏi đắt hay rẻ trở nên trả lời được: phần chênh lệch giá đổi ra bao nhiêu giờ của đội, và trong ngần ấy giờ bạn có tự làm được thứ tương đương không. Tính năng chưa dùng tới thì không thuộc phép tính này.",
      },
      {
        question: "Ràng buộc hợp đồng nào đáng chú ý nhất khi chốt?",
        options: [
          "Cam kết thời hạn tối thiểu, và có được dừng giữa chừng không",
          "Mức tăng giá tối đa cho mỗi kỳ gia hạn",
          "Quy định về số lượng người dùng tối thiểu phải duy trì trong suốt thời hạn hợp đồng",
          "Chính sách hoàn tiền nếu dịch vụ không đáp ứng được cam kết đã nêu trong hợp đồng",
        ],
        correct: 0,
        explanation:
          "Đây là điều khoản biến một quyết định sửa được thành một quyết định phải sống cùng. Chiết khấu cho cam kết dài hạn thường hấp dẫn và đúng là rẻ hơn thật, nhưng nó mua sự rẻ ấy bằng chính quyền đổi ý của bạn - và ở lần chọn công cụ đầu tiên thì quyền đó đáng giá hơn phần chiết khấu.",
      },
      {
        question: "Sau khi chốt, việc nên làm ngay là gì?",
        options: [
          "Ghi lại lý do chọn và mốc thời gian sẽ xem lại quyết định này",
          "Lập kế hoạch triển khai và phân công người",
          "Đào tạo cho toàn đội để mọi người sử dụng thành thạo công cụ mới càng sớm càng tốt",
          "Thiết lập các quy ước sử dụng chung để tránh mỗi người dùng theo một cách khác nhau",
        ],
        correct: 0,
        explanation:
          "Ba việc kia đều nằm trong kế hoạch triển khai và sẽ được làm. Việc này thì không ai nhắc, và nó là thứ duy nhất giúp lần xem lại sau có căn cứ: nếu không ghi vì sao chọn, một năm sau bạn chỉ còn cảm giác quen tay để bảo vệ lựa chọn đó.",
      },
    ],
    practicePrompt: {
      question:
        "Hai công cụ ngang nhau về tính năng, một bên rẻ hơn 20% nhưng dữ liệu chỉ xuất ra định dạng riêng. Chọn thế nào?",
      options: [
        "Quy phần chênh giá ra số giờ, rồi so với công sức đổi công cụ về sau",
        "Chọn bên rẻ hơn vì khoản tiết kiệm là chắc chắn còn việc đổi công cụ thì chưa chắc xảy ra",
        "Chọn bên đắt hơn vì xuất được định dạng mở",
        "Thương lượng với bên rẻ hơn để họ bổ sung khả năng xuất dữ liệu ra định dạng phổ biến",
      ],
      correct: 0,
      explanation:
        "Đây là phép tính biến một câu hỏi về nguyên tắc thành một câu hỏi có con số. Hai mươi phần trăm của một gói nhỏ có thể là vài giờ công mỗi năm, trong khi việc đổi công cụ có định dạng đóng thường tính bằng tuần. Với một gói lớn thì tỷ lệ ấy đảo lại - và đó là lý do phải tính chứ không phải chọn theo nguyên tắc.",
    },
    keyTakeaways: [
      "Ba đơn vị tính giá khác nhau cho ba con số không so trực tiếp được",
      "Chi phí chuyển đổi có thật và khác nhau giữa các lựa chọn; đừng bỏ nó ra ngoài",
      "Đắt hơn chỉ đáng khi phần chênh mua được thứ bạn không tự làm nổi trong cùng số giờ",
      "Cam kết dài hạn mua sự rẻ bằng chính quyền đổi ý của bạn",
      "Ngang nhau thì chọn bên dễ rời hơn, để giữ quyền sửa sai",
    ],
    summary: {
      keyIdea: "Ở bước cuối, thứ phân biệt hai lựa chọn ngang nhau là chi phí rời đi chứ không phải tính năng",
      commonMistake: "So hai bảng giá tính theo hai đơn vị khác nhau, rồi chọn theo cảm giác khi chúng gần bằng nhau",
      action: "Quy cả hai về tổng chi phí một năm với mức dùng của bạn, cộng chi phí chuyển đổi, rồi so chi phí rời đi.",
    },
    application: {
      title: "Một bảng bốn dòng",
      message:
        "Tổng chi một năm, chi phí chuyển đổi, số chỗ trong hệ thống gắn trực tiếp vào công cụ, và ràng buộc hợp đồng. Bốn dòng đó thường đủ để chốt.",
      secondary:
        "Ghi lại lý do chọn cùng một mốc xem lại - đó là thứ duy nhất giúp lần đánh giá sau có căn cứ thay vì có thói quen.",
    },
    sections: [
      {
        type: "lead",
        text: "Đến bước cuối, hai lựa chọn còn lại thường đã ngang nhau về mọi thứ dễ so. Đó chính là lúc quyết định được đưa ra tệ nhất, vì không còn tiêu chí nào rõ ràng và người ta chọn theo thứ nhớ lâu nhất từ bản dùng thử.",
      },
      {
        type: "heading",
        text: "Quy về cùng một gốc trước đã",
      },
      {
        type: "paragraph",
        text: "Một bên tính theo người dùng, một bên theo lượng dùng, một bên theo dự án. Ba đơn vị đó không so trực tiếp được, nên bước đầu tiên luôn là quy cả hai về tổng chi phí một năm với mức dùng dự kiến của chính bạn. Việc này mất mười lăm phút, không cần thông tin nào bạn chưa có, và nó thường đảo ngược thứ tự mà cảm giác ban đầu đã xếp.",
      },
      {
        type: "formula",
        title: "Tổng chi phí năm đầu",
        equation: "Phí dịch vụ 12 tháng + Chi phí chuyển đổi + Thời gian đội học × Giá trị một giờ",
        variables: [
          { symbol: "Phí dịch vụ", name: "Sau khi quy về cùng gốc", description: "Theo mức dùng dự kiến của bạn, không theo gói mẫu trên bảng giá" },
          { symbol: "Chi phí chuyển đổi", name: "Chuyển dữ liệu và nối lại hệ thống", description: "Chỉ một lần, nhưng có thật và khác nhau giữa hai bên" },
          { symbol: "Thời gian đội học", name: "Số giờ tới khi dùng trôi chảy", description: "Nhân với số người, thường lớn hơn phần phí dịch vụ ở đội nhỏ" },
        ],
        example: {
          title: "Gói rẻ hơn 20% nhưng chuyển đổi tốn hai tuần công",
          calculation: "Khoản tiết kiệm 12 tháng so với hai tuần công cộng thời gian học",
          result: "Bên rẻ hơn thường thua ở năm đầu",
          explanation: "Với đội nhỏ, phần chi phí tính bằng giờ người gần như luôn lớn hơn phần chênh lệch phí dịch vụ.",
        },
      },
      {
        type: "heading",
        text: "Ngang nhau thì chọn bên dễ rời hơn",
      },
      {
        type: "comparison",
        left: {
          label: "Dễ rời",
          text: "Dữ liệu xuất ra được ở định dạng mở, hệ thống gắn vào qua một lớp trung gian, hợp đồng theo tháng. Đổi ý về sau tốn vài ngày.",
        },
        right: {
          label: "Khó rời",
          text: "Dữ liệu chỉ xuất ra định dạng riêng, mã gọi thẳng vào công cụ ở nhiều chỗ, hợp đồng cam kết nhiều năm đổi lấy chiết khấu.",
        },
      },
      {
        type: "list",
        items: [
          "Quy hai bảng giá về tổng chi một năm theo mức dùng của bạn",
          "Cộng chi phí chuyển đổi và số giờ cả đội cần để dùng trôi chảy",
          "Đếm số chỗ trong hệ thống sẽ gắn trực tiếp vào công cụ",
          "Đọc ràng buộc thời hạn: dừng giữa chừng được không, mất gì",
        ],
      },
      {
        type: "callout",
        label: "Chiết khấu cam kết dài hạn mua bằng quyền đổi ý",
        text: "Cam kết ba năm để được giảm giá là một lựa chọn hợp lệ khi bạn đã dùng công cụ đó vài năm và biết rõ mình cần gì. Ở lần chọn đầu tiên thì nó bán đi đúng thứ bạn cần nhất, vì xác suất bạn chọn sai ở lần đầu cao hơn nhiều so với những lần sau.",
      },
      {
        type: "closing",
        lines: [
          "Một quyết định tốt ở đây không phải quyết định đúng, mà là quyết định sửa được nếu sai.",
          "Ghi lại lý do chọn cùng một mốc xem lại - đó là phần rẻ nhất và hay bị bỏ qua nhất.",
        ],
      },
    ],
  },
];
