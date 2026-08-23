import type { Lesson } from "./lesson-types";

// Chặng 18 của track cá nhân: những dự án lớn trong nghề.
//
// VÌ SAO CHẶNG NÀY TỒN TẠI. Mỗi thứ ở đây là một cam kết lớn, biết trước được,
// và tốn hơn nhiều so với con số người ta ước lượng lúc quyết định: nhận một
// dự án phụ, kèm một người mới, bỏ tiền đi học, giữ một dự án sống nhiều năm.
// Không cái nào là quyết định kỹ thuật; tất cả đều là quyết định về thời gian
// của chính bạn, và đó là thứ không chặng nào khác đụng tới.
//
// KHÔNG TRÙNG CHẶNG 19 VÀ NHÁNH DI TRÚ. Chặng 19 nói về sức khoẻ nghề nghiệp -
// kiệt sức, nhịp làm việc, tư thế. Nhánh `professional` đã có "Thay hệ thống
// cũ: bóp nghẹt dần thay vì viết lại" cùng hai bài di trú, nên chặng này KHÔNG
// bàn chuyện viết lại hay thay hệ thống - nó đứng ở phía người bỏ thời gian ra,
// không ở phía hệ thống nhận thời gian đó.
//
// Ids 370-376 nối tiếp Chặng 17 (360-367).
// Tám điểm nối phải cập nhật cùng lúc - xem chú thích đầu
// lib/income-growth-lessons.ts.

export const CAREER_PROJECTS_LESSONS: Lesson[] = [
  {
    id: 370,
    slug: "du-an-lon-nao-cung-bao-truoc",
    title: "Chặng 18, Bài 1: Dự án lớn nào cũng báo trước",
    subtitle: "Chúng hiếm khi bất ngờ; cái bất ngờ là tổng thời gian chúng lấy đi",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "🗺️",
    track: "personal",
    whyItMatters:
      "Những cam kết lớn của một người làm nghề gần như luôn nhìn thấy được từ nhiều tháng trước. Thứ khiến chúng thành gánh nặng không phải sự bất ngờ mà là việc chưa ai cộng chúng lại xem tổng cộng chiếm bao nhiêu phần quỹ thời gian.",
    openingQuestion: "Vì sao các cam kết lớn trong nghề thường gây quá tải?",
    openingOptions: [
      "Vì chúng được nhận lẻ, mỗi cái đều hợp lý, và không ai cộng lại",
      "Vì khối lượng thật luôn lớn hơn ước lượng ban đầu",
      "Vì chúng thường đến cùng lúc do chu kỳ của công ty và của ngành trùng nhau",
      "Vì người ta không dám từ chối cơ hội được giao",
    ],
    correctOption: 0,
    explanation:
      "Nhận kèm một người mới là hợp lý. Nhận thêm một dự án phụ là hợp lý. Đăng ký một khoá học buổi tối là hợp lý. Nhận nói ở một hội thảo cũng hợp lý. Mỗi quyết định được cân nhắc riêng và không quyết định nào sai, nhưng chúng rút từ cùng một quỹ thời gian mà không lần nào quỹ đó được nhìn tổng thể. Ước lượng thấp cũng có thật, nhưng nó là vấn đề nhỏ hơn: một việc bị ước lượng thiếu ba mươi phần trăm vẫn xử lý được, còn bốn việc cộng lại vượt quỹ thì không có cách nào xử lý ngoài bỏ bớt.",
    diagram: [
      { label: "Từng cam kết được cân nhắc riêng và đều hợp lý", arrow: true },
      { label: "Tất cả rút từ cùng một quỹ thời gian", arrow: true },
      { label: "Không lần nào quỹ đó được nhìn tổng thể", arrow: true },
      { label: "Quá tải xuất hiện mà không có quyết định nào sai" },
    ],
    realWorldExample: {
      company: "Bốn cái gật đầu trong một quý",
      description:
        "Một kỹ sư nhận kèm một bạn mới vào tháng Một, nhận thêm một dự án nội bộ vào tháng Hai, đăng ký một khoá học vào tháng Ba, rồi nhận viết một bài chia sẻ nội bộ. Từng cái đều nhỏ và đều đáng làm. Đến tháng Tư thì cả bốn cùng chạy, và thứ bị cắt đầu tiên là phần việc chính - thứ duy nhất trong năm cái mà bạn ấy chưa bao giờ chủ động nhận thêm.",
    },
    quiz: [
      {
        question: "Cách nào giúp thấy được tổng tải trước khi nhận thêm?",
        options: [
          "Viết ra mọi cam kết đang chạy kèm số giờ mỗi tuần của từng cái",
          "Ước lượng lại khối lượng của từng cam kết và cộng thêm một khoảng dự phòng cho mỗi cái",
          "Hỏi quản lý trước khi nhận việc ngoài phạm vi",
          "Đặt giới hạn cứng về số lượng cam kết được nhận cùng lúc, không quá hai hoặc ba việc",
        ],
        correct: 0,
        explanation:
          "Vấn đề là tính vô hình chứ không phải tính sai. Khi bốn cam kết nằm rải trong bốn cuộc trò chuyện khác nhau, không ai nhìn thấy tổng. Viết chúng vào cùng một chỗ với số giờ mỗi tuần biến câu hỏi từ có nên nhận không thành nhận thì bỏ cái nào, và câu hỏi thứ hai dễ trả lời hơn hẳn.",
      },
      {
        question: "Cam kết nào thường bị ước lượng thấp nhất?",
        options: [
          "Loại kéo dài nhiều tháng với khối lượng nhỏ đều đặn mỗi tuần",
          "Loại đòi học một công nghệ bạn chưa từng dùng",
          "Loại phụ thuộc vào người khác nên tiến độ nằm ngoài tầm bạn",
          "Loại có thời hạn cứng gắn với sự kiện đã công bố",
        ],
        correct: 0,
        explanation:
          "Người ta ước lượng khá tốt cho một việc gọn trong hai tuần, và ước lượng rất tệ cho một việc chỉ tốn hai giờ mỗi tuần nhưng kéo tám tháng. Con số mỗi tuần nghe nhỏ tới mức không đáng cân nhắc, còn tổng thì lớn hơn cả một dự án hai tuần - và nó chiếm chỗ suốt cả năm.",
      },
      {
        question: "Khi phải từ chối một việc đáng làm, cách nói nào tốt hơn?",
        options: [
          "Nói rõ mình đang giữ những gì, và đề nghị một mốc thời gian khác",
          "Từ chối dứt khoát mà không giải thích để tránh tạo ra kỳ vọng rằng bạn có thể nhận sau này",
          "Nhận nhưng báo trước là tiến độ có thể chậm",
          "Đề nghị người khác trong đội nhận thay và giới thiệu người phù hợp nhất cho việc đó",
        ],
        correct: 0,
        explanation:
          "Từ chối mà nêu được danh sách đang giữ thì đó không còn là từ chối mà là một cuộc trao đổi về thứ tự ưu tiên, và người đề nghị thường có thông tin để giúp bạn sắp lại. Nhận rồi báo chậm là cách tệ nhất: bên kia mất khả năng lập kế hoạch mà bạn vẫn mất thời gian.",
      },
      {
        question: "Vì sao phần việc chính hay bị cắt đầu tiên khi quá tải?",
        options: [
          "Vì nó là thứ duy nhất bạn không phải chủ động nhận, nên nó không có ngày hẹn với ai",
          "Vì các cam kết thêm thường có thời hạn cứng hơn nên phải được ưu tiên xử lý trước",
          "Vì phần việc chính thường có thể lùi lại mà không ảnh hưởng ngay tới kết quả chung",
          "Vì những việc mới nhận thường thú vị hơn nên người ta có xu hướng dành thời gian cho chúng",
        ],
        correct: 0,
        explanation:
          "Mọi cam kết bạn nhận thêm đều đi kèm một người đang chờ và một lời hứa cụ thể. Phần việc chính thì không có ai nhắc theo cách đó, nên nó lặng lẽ nhận phần còn lại. Đây là lý do người nhận nhiều việc phụ thường bị đánh giá kém đi ở đúng phần việc chính của mình.",
      },
      {
        question: "Nên xem lại danh sách cam kết vào lúc nào?",
        options: [
          "Định kỳ theo lịch, chứ không phải lúc đã thấy quá tải",
          "Ngay khi có dấu hiệu quá tải để cắt bớt kịp thời trước khi ảnh hưởng tới các bên liên quan",
          "Vào cuối mỗi dự án lớn, khi đã có đủ dữ liệu về khối lượng thực tế của công việc đó",
          "Khi nhận được đề nghị mới, vì đó là thời điểm cần cân nhắc kỹ nhất về khả năng tiếp nhận",
        ],
        correct: 0,
        explanation:
          "Lúc đã quá tải thì mọi cam kết đều đang dở dang và rút khỏi cái nào cũng đắt. Xem lại theo lịch, lúc mọi thứ còn ổn, là lúc duy nhất bạn còn lựa chọn rẻ - và cũng là lúc bạn ít thấy cần làm việc đó nhất.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn được mời tham gia một nhóm nội bộ, họp một giờ mỗi tuần trong sáu tháng. Nên cân nhắc thế nào?",
      options: [
        "Quy ra tổng số giờ của cả sáu tháng rồi đặt cạnh những gì đang giữ",
        "Nhận vì một giờ mỗi tuần là khối lượng rất nhỏ",
        "Hỏi rõ nội dung của nhóm để đánh giá xem nó có giúp ích cho hướng phát triển của bạn không",
        "Nhận thử vài buổi rồi quyết định có tiếp tục hay không sau khi đã hiểu khối lượng thực tế",
      ],
      correct: 0,
      explanation:
        "Một giờ mỗi tuần nghe không đáng kể, và sáu tháng thì thành hai mươi sáu giờ cộng thời gian chuẩn bị và thời gian bị cắt vụn quanh mỗi buổi họp. Đây đúng là loại cam kết bị ước lượng thấp nhất, và cách duy nhất thấy được nó là nhân lên rồi đặt cạnh những thứ đang giữ.",
    },
    keyTakeaways: [
      "Từng cam kết đều hợp lý; tổng thì chưa ai nhìn",
      "Loại nhỏ đều đặn kéo dài bị ước lượng thấp nhất",
      "Phần việc chính bị cắt đầu tiên vì nó không có ngày hẹn với ai",
      "Xem lại danh sách theo lịch, lúc còn lựa chọn rẻ",
    ],
    summary: {
      keyIdea: "Quá tải trong nghề hiếm khi đến từ một quyết định sai, mà từ nhiều quyết định đúng không được cộng lại",
      commonMistake: "Cân nhắc từng lời mời riêng lẻ, vì mỗi lần nhìn riêng thì lần nào cũng nhận được",
      action: "Viết mọi cam kết đang chạy vào một chỗ, kèm số giờ mỗi tuần, và cập nhật nó mỗi quý.",
    },
    application: {
      title: "Một danh sách, một cột số giờ",
      message:
        "Liệt kê mọi thứ bạn đã hứa với ai đó, kèm số giờ mỗi tuần. Cộng lại. Nếu tổng vượt quỹ bạn thật sự có, danh sách đó cũng chính là danh sách phải cắt.",
      secondary:
        "Nhân số giờ mỗi tuần với số tuần còn lại trước khi nhận thêm bất cứ gì - đó là phép tính hay bị bỏ qua nhất.",
    },
    sections: [
      {
        type: "lead",
        text: "Những cam kết lớn của một người làm nghề gần như không bao giờ ập đến. Chúng được nhìn thấy trước hàng tháng, và vẫn gây quá tải.",
      },
      {
        type: "heading",
        text: "Không có quyết định nào sai",
      },
      {
        type: "paragraph",
        text: "Đó là điều khiến chuyện này khó xử lý. Mỗi lời mời đến riêng, được cân nhắc riêng, và lần nào lý do nhận cũng vững. Cái thiếu không phải sự cẩn thận ở từng lần mà là một chỗ duy nhất ghi lại tất cả. Khi bốn cam kết nằm rải trong bốn cuộc trò chuyện, tổng của chúng không tồn tại ở đâu cả cho tới lúc nó tự hiện ra dưới dạng một tuần làm việc không đủ giờ.",
      },
      {
        type: "list",
        items: [
          "Mọi thứ đã hứa với ai đó đều vào danh sách, kể cả những việc rất nhỏ",
          "Ghi số giờ mỗi tuần, và nhân với số tuần còn lại",
          "Xem lại theo lịch định kỳ, không đợi tới lúc thấy quá tải",
          "Khi từ chối, nói rõ mình đang giữ gì - đó là trao đổi về ưu tiên, không phải lời từ chối",
        ],
      },
      {
        type: "callout",
        label: "Phần việc chính không có ai nhắc",
        text: "Mọi cam kết thêm đều đi kèm một người đang chờ, còn phần việc chính thì không. Vì thế nó luôn là thứ nhận phần thời gian còn lại, và người nhận nhiều việc phụ thường bị đánh giá kém đi ở đúng chỗ mà lẽ ra họ mạnh nhất - một kết cục không ai chọn nhưng rất nhiều người đi tới.",
      },
      {
        type: "closing",
        lines: [
          "Các cam kết lớn đều báo trước; chỉ có tổng của chúng là không.",
          "Bài sau: một dự án phụ tốn gì ngoài thời gian viết nó.",
        ],
      },
    ],
  },
  {
    id: 371,
    slug: "nhan-mot-du-an-phu",
    title: "Chặng 18, Bài 2: Nhận một dự án phụ - thời gian viết là phần nhỏ nhất",
    subtitle: "Dựng xong là mốc dễ thấy nhất và cũng là phần rẻ nhất",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🧰",
    track: "personal",
    whyItMatters:
      "Người ta quyết định nhận một dự án phụ dựa trên ước lượng thời gian dựng nó. Đó là con số nhỏ nhất trong toàn bộ vòng đời, và nó là con số duy nhất được đưa vào lúc quyết định.",
    openingQuestion: "Trong vòng đời một dự án phụ, phần nào thường tốn nhiều thời gian nhất?",
    openingOptions: [
      "Duy trì sau khi nó đã chạy và có người dùng",
      "Giai đoạn thiết kế ban đầu, vì đây là lúc phải đưa ra những quyết định khó thay đổi về sau",
      "Việc viết mã cho các tính năng chính, vì đó là phần chiếm khối lượng lớn nhất của dự án",
      "Việc kiểm thử và sửa lỗi trước khi đưa dự án ra cho những người dùng đầu tiên sử dụng",
    ],
    correctOption: 0,
    explanation:
      "Dựng xong một thứ chạy được thường mất vài tuần và có thể ước lượng khá chính xác. Phần sau đó thì không có điểm dừng: người dùng hỏi, thư viện cần nâng phiên bản, một thay đổi ở hệ thống bên cạnh làm hỏng một chỗ, và mỗi năm có vài thứ phải cập nhật chỉ để giữ nguyên hiện trạng. Khoản này nhỏ mỗi tuần nên không ai đưa vào ước lượng, và nó không dừng lại chừng nào dự án còn có người dùng. Đây là lý do phần lớn dự án phụ không chết vì dựng không xong mà vì không ai nuôi nổi năm thứ hai.",
    diagram: [
      { label: "Ước lượng lúc quyết định: thời gian dựng", arrow: true },
      { label: "Ra mắt: bắt đầu có người hỏi", arrow: true },
      { label: "Mỗi năm: nâng phiên bản, sửa thứ hỏng vì bên ngoài đổi", arrow: true },
      { label: "Khoản này không dừng khi còn người dùng" },
    ],
    realWorldExample: {
      company: "Công cụ nội bộ ba tuần",
      description:
        "Một bạn dựng một công cụ nội bộ trong ba tuần và cả đội dùng ngay. Hai năm sau, công cụ đó vẫn chạy và bạn ấy vẫn là người duy nhất sửa được nó: mỗi tháng vài yêu cầu nhỏ, mỗi năm một đợt nâng phiên bản. Tổng thời gian đã bỏ vào phần sau lớn hơn ba tuần ban đầu nhiều lần, và không có lần nào trong số đó được ai coi là một dự án.",
    },
    quiz: [
      {
        question: "Trước khi nhận dựng một công cụ nội bộ, câu hỏi nào đáng đặt nhất?",
        options: [
          "Ai sẽ sửa nó sau một năm nữa, khi mình đã chuyển sang việc khác",
          "Công cụ này sẽ tiết kiệm được bao nhiêu thời gian cho đội trong khoảng thời gian sắp tới",
          "Có công cụ sẵn có nào trên thị trường đáp ứng được nhu cầu này mà không phải tự dựng không",
          "Việc dựng nó có giúp bạn học được gì mới không",
        ],
        correct: 0,
        explanation:
          "Ba câu kia đều đáng hỏi và đều nói về quyết định có dựng hay không. Câu này nói về hai năm tiếp theo, và nó là câu duy nhất mà câu trả lời thường là chưa ai nghĩ tới. Nếu câu trả lời là chính bạn, thì đó là một cam kết dài hạn chứ không phải một dự án ba tuần.",
      },
      {
        question: "Vì sao chi phí duy trì tăng dần dù dự án không thêm tính năng?",
        options: [
          "Vì mọi thứ xung quanh nó thay đổi: thư viện, hệ điều hành, hệ thống bên cạnh",
          "Vì số lượng người dùng tăng lên nên khối lượng yêu cầu hỗ trợ cũng tăng theo tương ứng",
          "Vì mã nguồn cũ dần trở nên khó hiểu hơn với chính người đã viết ra nó ban đầu",
          "Vì các lỗi tiềm ẩn dần lộ ra khi dự án được sử dụng trong thời gian đủ dài",
        ],
        correct: 0,
        explanation:
          "Một dự án đứng yên trong một thế giới đang đổi thì không đứng yên - nó đang hỏng dần. Đây là khoản chi phí thuần tuý phòng thủ: bỏ công ra để giữ nguyên thứ đang có, không tạo thêm gì mới, và vì thế rất khó xin thời gian cho nó.",
      },
      {
        question: "Cách nào giảm được chi phí duy trì ngay từ đầu?",
        options: [
          "Giữ phạm vi hẹp và ít phụ thuộc bên ngoài nhất có thể",
          "Viết tài liệu thật đầy đủ để người khác có thể tiếp nhận và bảo trì dự án khi cần thiết",
          "Dùng các công nghệ phổ biến nhất để dễ tìm người thay thế khi bạn không còn phụ trách",
          "Tự động hoá phần kiểm thử để mỗi lần nâng phiên bản đều có thể kiểm tra lại nhanh chóng",
        ],
        correct: 0,
        explanation:
          "Ba cách kia đều giúp, nhưng chúng làm việc bảo trì rẻ hơn chứ không làm nó ít đi. Mỗi phụ thuộc bên ngoài là một nguồn thay đổi bạn không kiểm soát, và mỗi tính năng là một thứ phải giữ cho chạy mãi mãi. Thứ rẻ nhất để bảo trì là thứ không tồn tại.",
      },
      {
        question: "Dự án phụ nên được bàn giao vào lúc nào?",
        options: [
          "Trước khi bạn muốn rời nó, lúc còn đủ động lực để làm việc bàn giao tử tế",
          "Khi bạn chuyển sang vị trí khác hoặc rời công ty, lúc bắt buộc phải bàn giao",
          "Khi có người trong đội muốn tiếp nhận và đủ năng lực đảm nhận",
          "Khi khối lượng bảo trì vượt quá mức bạn xử lý nổi cùng việc chính",
        ],
        correct: 0,
        explanation:
          "Bàn giao lúc đã chán hoặc đã quá tải là lúc bạn ít sẵn lòng nhất để làm nó cho tử tế, mà bàn giao tử tế lại tốn khá nhiều công. Kết quả thường thấy là bàn giao trên giấy còn thực tế thì người cũ vẫn bị hỏi thêm một năm nữa.",
      },
      {
        question: "Dự án phụ nào đáng nhận nhất?",
        options: [
          "Loại có đường kết thúc rõ ràng, hoặc có người khác sẽ nuôi tiếp",
          "Loại giải đúng vấn đề bạn đang gặp hằng ngày",
          "Loại dùng công nghệ bạn muốn học, vì như vậy vừa làm được việc vừa nâng được kỹ năng",
          "Loại có nhiều người trong đội quan tâm, vì khi đó sẽ dễ có người cùng tham gia đóng góp",
        ],
        correct: 0,
        explanation:
          "Ba lý do kia đều tốt để bắt đầu và không lý do nào nói gì về việc kết thúc. Một dự án không có đường ra là một khoản trừ vào quỹ thời gian của bạn mỗi tuần, mãi mãi, và nó cạnh tranh với mọi thứ bạn muốn làm sau này.",
      },
    ],
    practicePrompt: {
      question:
        "Đội cần một công cụ nhỏ, bạn dựng được trong hai tuần. Nên đưa gì vào quyết định ngoài hai tuần đó?",
      options: [
        "Ai nuôi nó trong hai năm tới, và bao nhiêu giờ mỗi tháng",
        "Liệu công cụ này có thể mở rộng thành một sản phẩm lớn hơn trong tương lai hay không",
        "Mức độ ưu tiên của công cụ này so với các đầu việc khác đang có trong kế hoạch của đội",
        "Công nghệ nào nên dùng để dựng nó sao cho phù hợp nhất với hạ tầng hiện có của công ty",
      ],
      correct: 0,
      explanation:
        "Hai tuần là phần bạn ước lượng được và cũng là phần nhỏ nhất. Nếu câu trả lời cho câu hỏi này là chính bạn và chưa ai tính giờ cho nó, thì quyết định thật sự đang được đưa ra không phải là hai tuần mà là một khoản trừ đều đặn kéo dài hai năm.",
    },
    keyTakeaways: [
      "Thời gian dựng là phần duy nhất ước lượng được, và là phần nhỏ nhất",
      "Dự án đứng yên trong thế giới đang đổi thì đang hỏng dần",
      "Thứ rẻ nhất để bảo trì là thứ không tồn tại",
      "Bàn giao lúc đã chán là lúc ít sẵn lòng làm nó tử tế nhất",
    ],
    summary: {
      keyIdea: "Một dự án phụ là cam kết đều đặn nhiều năm, không phải một khoản đầu tư vài tuần",
      commonMistake: "Quyết định dựa trên thời gian dựng, con số nhỏ nhất trong toàn bộ vòng đời",
      action: "Trước khi nhận, trả lời: ai nuôi nó sau một năm, và bao nhiêu giờ mỗi tháng.",
    },
    application: {
      title: "Hai câu trước khi gật đầu",
      message:
        "Ai sửa nó sau một năm, và dự án này kết thúc bằng cách nào. Không trả lời được câu thứ hai thì đây là một khoản trừ vĩnh viễn vào quỹ thời gian của bạn.",
      secondary:
        "Cắt phạm vi và cắt phụ thuộc là hai cách duy nhất làm việc bảo trì ít đi, chứ không chỉ rẻ hơn.",
    },
    sections: [
      {
        type: "lead",
        text: "Câu hỏi dựng cái này mất bao lâu luôn được trả lời, và nó là câu hỏi về phần rẻ nhất trong toàn bộ vòng đời của thứ sắp được dựng.",
      },
      {
        type: "heading",
        text: "Khoản không dừng lại",
      },
      {
        type: "paragraph",
        text: "Sau ngày chạy được, dự án bắt đầu một dòng chi phí không có điểm kết thúc: người dùng hỏi, thư viện cần nâng, một thay đổi ở nơi khác làm hỏng một chỗ. Mỗi khoản đều nhỏ và không khoản nào đáng gọi là dự án, nên không khoản nào được tính vào đâu cả. Cộng lại qua hai năm, chúng thường lớn hơn nhiều lần phần đã bỏ ra để dựng.",
      },
      {
        type: "callout",
        label: "Bảo trì là chi phí phòng thủ",
        text: "Nó không tạo ra gì mới, chỉ giữ cho thứ đang có tiếp tục chạy. Vì thế nó luôn thua khi phải cạnh tranh thời gian với một tính năng, và nó thua cho tới lúc thứ đó hỏng thật - lúc mà chi phí đã cao hơn nhiều so với nếu làm sớm.",
      },
      {
        type: "closing",
        lines: [
          "Câu hỏi đúng không phải dựng mất bao lâu, mà nuôi mất bao lâu và ai nuôi.",
          "Bài sau: một loại cam kết khác, ít ai gọi tên là chi phí.",
        ],
      },
    ],
  },
  {
    id: 372,
    slug: "duoc-biet-toi-trong-nghe",
    title: "Chặng 18, Bài 3: Được biết tới trong nghề - chi phí ít ai gọi tên",
    subtitle: "Viết, nói và đóng góp đều trả lại nhiều, và đều lấy đi nhiều hơn con số người ta nghĩ",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "📣",
    track: "personal",
    whyItMatters:
      "Viết bài, nói ở hội thảo hay đóng góp mã nguồn mở đều mở ra cơ hội thật, nên chúng được khuyên rất nhiều. Phần ít được nói tới là chúng tốn bao nhiêu, và điều đó khiến người ta nhận rồi mới biết.",
    openingQuestion: "Một buổi nói ba mươi phút ở hội thảo thường tốn tổng cộng bao nhiêu?",
    openingOptions: [
      "Vài chục giờ, phần lớn nằm ở việc chuẩn bị và tập trước",
      "Khoảng vài giờ, chủ yếu là thời gian chuẩn bị slide và sắp xếp lại nội dung cho mạch lạc",
      "Gần đúng ba mươi phút nếu bạn đã hiểu rất kỹ",
      "Khó ước lượng vì phụ thuộc hoàn toàn vào mức độ quen thuộc của bạn với chủ đề đó",
    ],
    correctOption: 0,
    explanation:
      "Một bài nói ba mươi phút tử tế thường ngốn vài chục giờ: chọn góc, dựng mạch, làm ví dụ chạy được, rồi tập ít nhất vài lượt để biết chỗ nào lê thê và chỗ nào hụt. Điều làm nhiều người bất ngờ là việc đã hiểu rất kỹ chủ đề không giảm được con số đó bao nhiêu, vì phần tốn thời gian không phải là biết mà là sắp xếp cho người chưa biết nghe hiểu trong ba mươi phút. Đây không phải lý do để từ chối - lợi ích của việc được biết tới là có thật - mà là lý do để đưa con số đúng vào lúc quyết định thay vì phát hiện ra nó trong ba tuần trước ngày nói.",
    diagram: [
      { label: "Nhận lời vì nghĩ mình đã biết chủ đề", arrow: true },
      { label: "Chọn góc và dựng mạch: phần tốn nhất", arrow: true },
      { label: "Làm ví dụ chạy được, tập vài lượt", arrow: true },
      { label: "Ba mươi phút trên sân khấu là phần nhỏ nhất" },
    ],
    realWorldExample: {
      company: "Ba tuần trước ngày nói",
      description:
        "Một kỹ sư nhận lời nói về một hệ thống mình đã dựng, nghĩ rằng mình thuộc nó nên chuẩn bị sẽ nhanh. Đến khi ngồi xuống thì phát hiện thứ mình thuộc là các chi tiết, còn thứ cần là một mạch kể cho người chưa từng thấy hệ thống ấy. Ba tuần cuối bạn ấy làm ngoài giờ, và phần việc chính trong quý đó trễ hạn.",
    },
    quiz: [
      {
        question: "Vì sao viết một bài kỹ thuật tử tế lại tốn nhiều hơn dự tính?",
        options: [
          "Vì viết ra buộc bạn phát hiện những chỗ mình tưởng đã hiểu",
          "Vì cần thời gian nghiên cứu thêm để đảm bảo mọi thông tin trong bài đều chính xác và cập nhật",
          "Vì phải chỉnh sửa nhiều lần theo góp ý của người đọc thử trước khi bài đủ tốt để đăng",
          "Vì trình bày mã và hình minh hoạ tốn thời gian",
        ],
        correct: 0,
        explanation:
          "Đây vừa là chi phí lớn nhất vừa là lợi ích lớn nhất của việc viết. Trong đầu, một hiểu biết có thể nhảy cóc qua vài bước; trên giấy thì không, và mỗi chỗ nhảy cóc buộc bạn dừng lại tìm hiểu cho xong. Bài viết vì thế thường mất gấp đôi dự tính, và bạn hiểu chủ đề khác hẳn lúc bắt đầu.",
      },
      {
        question: "Đóng góp mã nguồn mở tốn thời gian nhiều nhất ở khâu nào?",
        options: [
          "Đọc quy ước của dự án và chờ qua các vòng phản hồi",
          "Viết phần mã cho tính năng hoặc bản sửa lỗi mà bạn định đóng góp cho dự án đó",
          "Dựng môi trường phát triển của dự án trên máy mình để có thể chạy và kiểm thử được",
          "Tìm một vấn đề phù hợp với năng lực và đang thật sự cần người giải quyết trong dự án",
        ],
        correct: 0,
        explanation:
          "Phần mã thường nhỏ, nhất là ở những đóng góp đầu tiên. Thứ kéo dài là nhịp: gửi lên rồi chờ vài ngày, nhận phản hồi, sửa, chờ tiếp. Một đóng góp mười dòng có thể trải ba tuần, và đó chính là thứ khiến nó có giá trị trên hồ sơ - nó chứng minh bạn chịu được vòng phản hồi của người lạ.",
      },
      {
        question: "Lợi ích rõ nhất của việc được biết tới trong nghề là gì?",
        options: [
          "Cơ hội tìm tới bạn thay vì bạn phải đi tìm chúng",
          "Mức lương cao hơn khi thương lượng vì nhà tuyển dụng đã biết tới bạn từ trước đó",
          "Được mời tham gia các dự án thú vị hơn so với những gì công việc hiện tại đang có",
          "Mạng lưới quan hệ rộng hơn giúp bạn giải quyết vấn đề nhanh hơn khi cần hỏi ai đó",
        ],
        correct: 0,
        explanation:
          "Ba thứ kia đều xảy ra nhưng chúng là hệ quả của một thay đổi cơ bản hơn: chiều của dòng chảy đảo lại. Người phải đi tìm cơ hội chỉ chọn được trong số mình tìm thấy; người được cơ hội tìm tới thì chọn trong số đã được đưa tới, và tập đó thường tốt hơn hẳn.",
      },
      {
        question: "Nên bắt đầu bằng hình thức nào nếu quỹ thời gian hẹp?",
        options: [
          "Viết, vì nó chia nhỏ được và không có ngày hẹn cứng",
          "Nói ở các buổi chia sẻ nội bộ vì quy mô nhỏ nên áp lực chuẩn bị cũng thấp hơn nhiều",
          "Đóng góp mã nguồn mở vì phần mã thường nhỏ và có thể làm dần trong thời gian rảnh",
          "Trả lời câu hỏi trên các diễn đàn kỹ thuật vì mỗi câu chỉ mất một khoảng thời gian ngắn",
        ],
        correct: 0,
        explanation:
          "Yếu tố quyết định khi quỹ thời gian hẹp không phải tổng khối lượng mà là tính chia nhỏ được và có ngày hẹn cứng hay không. Một bài viết dừng giữa chừng vẫn nằm đó chờ bạn; một buổi nói đã nhận lời thì ngày đó tới dù tuần ấy bạn có việc gấp hay không.",
      },
      {
        question: "Dấu hiệu nào cho thấy bạn đang nhận quá nhiều loại việc này?",
        options: [
          "Phần việc chính bắt đầu trễ hạn, và bạn bù bằng thời gian ngoài giờ",
          "Bạn không còn đủ thời gian để chuẩn bị kỹ như những lần trước nên chất lượng giảm dần",
          "Số lời mời nhận được nhiều hơn hẳn số lời mời bạn có thể nhận trong cùng khoảng thời gian",
          "Bạn thấy mệt và mất hứng thú với thứ từng thích",
        ],
        correct: 0,
        explanation:
          "Hai dấu hiệu kia đến muộn hơn. Dấu hiệu này đến sớm và rất cụ thể, nhưng nó dễ bị bỏ qua vì việc bù bằng giờ ngoài luôn khả thi trong ngắn hạn - và chính tính khả thi ấy làm nó kéo dài cho tới lúc thành một vấn đề khác hẳn.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn được mời nói ba mươi phút về một hệ thống mình đã dựng, sau hai tháng nữa. Nên làm gì trước khi trả lời?",
      options: [
        "Ước lượng vài chục giờ chuẩn bị và xem hai tháng đó bạn đang giữ gì",
        "Nhận vì bạn đã hiểu rõ nên chuẩn bị sẽ nhanh",
        "Hỏi rõ về quy mô và đối tượng người nghe để đánh giá mức độ chuẩn bị cần thiết cho buổi nói",
        "Nhận nhưng đề nghị rút ngắn thời lượng xuống còn mười lăm phút để giảm khối lượng chuẩn bị",
      ],
      correct: 0,
      explanation:
        "Việc đã hiểu rõ hệ thống giảm được rất ít con số ấy, vì phần tốn thời gian là dựng mạch kể chứ không phải biết nội dung. Rút xuống mười lăm phút cũng ít khi rẻ hơn - nói ngắn về một chủ đề phức tạp thường khó chuẩn bị hơn nói dài.",
    },
    keyTakeaways: [
      "Phần tốn thời gian không phải là biết, mà là sắp cho người chưa biết hiểu được",
      "Viết chia nhỏ được và không có ngày hẹn cứng; nói thì ngược lại",
      "Đóng góp mã nguồn mở đắt ở nhịp chờ phản hồi, không ở phần mã",
      "Dấu hiệu quá tải đến sớm nhất là phần việc chính trễ hạn",
    ],
    summary: {
      keyIdea: "Được biết tới trong nghề trả lại rất nhiều và lấy đi nhiều hơn con số người ta đưa vào lúc nhận lời",
      commonMistake: "Nghĩ rằng đã hiểu kỹ chủ đề thì chuẩn bị sẽ nhanh, trong khi hai việc đó gần như không liên quan",
      action: "Trước khi nhận lời nói, nhân ước lượng của bạn lên vài lần rồi đặt cạnh những gì đang giữ trong khoảng đó.",
    },
    application: {
      title: "Bắt đầu bằng thứ chia nhỏ được",
      message:
        "Nếu quỹ thời gian hẹp, viết trước khi nói. Một bài viết dừng giữa chừng vẫn chờ bạn; một buổi nói đã nhận thì ngày đó cứ tới.",
      secondary:
        "Ghi lại thời gian thật của lần đầu tiên - đó là con số bạn sẽ dùng cho mọi lời mời sau này.",
    },
    sections: [
      {
        type: "lead",
        text: "Viết, nói và đóng góp mã nguồn mở đều được khuyên rất nhiều, và phần được khuyên thường dừng ở chỗ nên làm chứ không nói tốn bao nhiêu.",
      },
      {
        type: "heading",
        text: "Biết và trình bày là hai việc khác nhau",
      },
      {
        type: "paragraph",
        text: "Đây là chỗ ước lượng sai nhiều nhất. Người ta nhận lời nói về thứ mình thuộc lòng và nghĩ rằng vì thuộc nên chuẩn bị sẽ nhanh. Thứ thuộc lòng là các chi tiết; thứ cần dựng là một mạch đi từ chỗ người nghe đang đứng tới chỗ bạn muốn họ tới, trong ba mươi phút. Hai việc đó dùng những kỹ năng khác nhau, và cái thứ hai gần như luôn tốn hơn.",
      },
      {
        type: "callout",
        label: "Lợi ích là thật, và đó là lý do phải tính đúng",
        text: "Không có gì trong bài này nói rằng đừng làm. Chiều của dòng chảy đảo lại khi người ta biết tới bạn, và đó là thay đổi lớn nhất trong cách cơ hội đến với một người làm nghề. Chính vì lợi ích lớn như vậy nên đáng đưa con số đúng vào lúc quyết định, thay vì phát hiện nó trong ba tuần cuối trước ngày hẹn.",
      },
      {
        type: "closing",
        lines: [
          "Đây là khoản đầu tư đáng làm với một cái giá hay bị bỏ trống trong lúc quyết định.",
          "Bài sau: một cam kết mà phần lớn chi phí nằm ở năm đầu, và nó không dừng ở đó.",
        ],
      },
    ],
  },
  {
    id: 373,
    slug: "kem-cap-mot-nguoi-moi",
    title: "Chặng 18, Bài 4: Kèm một người mới - năm đầu và những khoản định kỳ",
    subtitle: "Vài tháng đầu bạn chậm hẳn lại, và đó là phần dễ thấy nhất",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🤝",
    track: "personal",
    whyItMatters:
      "Kèm người mới là cách nhanh nhất để một đội lớn lên và cũng là cam kết bị đánh giá thấp nhất. Người nhận kèm thường được hỏi có sẵn lòng không, hiếm khi được hỏi tuần này bạn đang giữ những gì.",
    openingQuestion: "Trong ba tháng đầu kèm một người mới, điều gì xảy ra với năng suất của bạn?",
    openingOptions: [
      "Giảm rõ rệt, và đó là chuyện bình thường chứ không phải dấu hiệu làm sai",
      "Không đổi đáng kể nếu bạn sắp xếp thời gian hợp lý và trả lời câu hỏi theo khung giờ cố định",
      "Tăng lên, vì việc giải thích cho người khác giúp bạn hệ thống lại hiểu biết của chính mình",
      "Giảm vài tuần đầu rồi hồi phục khi họ ít hỏi hơn",
    ],
    correctOption: 0,
    explanation:
      "Chi phí thật không nằm ở số giờ ngồi trả lời câu hỏi mà ở sự cắt vụn: một câu hỏi giữa lúc bạn đang giữ trong đầu một vấn đề phức tạp lấy đi nhiều hơn nhiều so với thời lượng của chính câu hỏi đó. Cộng thêm việc xem lại mã của người mới, việc chọn cho họ những việc vừa sức, và việc sửa những chỗ đi sai hướng. Điều đáng nói là năng suất giảm ở đây không phải dấu hiệu bạn kèm dở - nó là hình dạng bình thường của việc kèm, và người nhận kèm mà không được điều chỉnh khối lượng công việc chính sẽ tự bù bằng giờ ngoài.",
    diagram: [
      { label: "Tháng 1-3: bạn chậm hẳn, người mới chưa đóng góp được", arrow: true },
      { label: "Tháng 4-9: người mới bắt đầu tự làm, bạn vẫn xem lại", arrow: true },
      { label: "Sau năm đầu: chi phí nhỏ đi nhưng không về không", arrow: true },
      { label: "Đổi lại: một người nữa làm được việc bạn đang giữ" },
    ],
    realWorldExample: {
      company: "Không ai điều chỉnh khối lượng",
      description:
        "Một kỹ sư được giao kèm một bạn mới, và khối lượng công việc chính của bạn ấy giữ nguyên như quý trước. Ba tháng sau, bạn mới tiến bộ tốt còn người kèm thì trễ hai hạn và làm ngoài giờ đều đặn. Không ai làm gì sai; chỉ là việc kèm được coi như miễn phí ở khâu lập kế hoạch, nên nó được trả bằng thời gian cá nhân.",
    },
    quiz: [
      {
        question: "Vì sao trả lời câu hỏi rải rác lại đắt hơn cùng số giờ gộp lại?",
        options: [
          "Vì mỗi lần bị cắt ngang, bạn mất thêm thời gian lấy lại mạch của việc đang làm",
          "Vì các câu hỏi rải rác thường lặp lại nhiều lần nên tổng thời gian trả lời nhiều hơn",
          "Vì trả lời vội thì thiếu chính xác nên phải giải thích lại từ đầu",
          "Vì không chuẩn bị trước nên mỗi câu đều phải nghĩ lại từ đầu",
        ],
        correct: 0,
        explanation:
          "Với công việc cần giữ nhiều thứ trong đầu cùng lúc, chi phí thật của một lần bị cắt ngang lớn hơn nhiều so với thời lượng của nó. Đây là lý do một khung giờ cố định để hỏi thường tốt cho cả hai phía, miễn là người mới không bị kẹt cả buổi chờ tới khung giờ đó.",
      },
      {
        question: "Cách kèm nào giúp người mới tiến nhanh hơn?",
        options: [
          "Để họ làm phần khó và mình ngồi cạnh, thay vì làm mẫu rồi giao phần dễ",
          "Giao việc nhỏ và rõ trước, rồi tăng dần độ khó",
          "Giải thích kỹ kiến trúc tổng thể trước khi họ bắt tay",
          "Xem lại mã của họ thật chi tiết và chỉ ra mọi chỗ có thể viết tốt hơn nữa",
        ],
        correct: 0,
        explanation:
          "Cách phổ biến là giữ phần khó cho mình vì như vậy nhanh hơn, và nó nhanh hơn thật trong tuần đó. Nhưng thứ người mới cần học chính là ra quyết định lúc chưa đủ dữ kiện, và điều đó chỉ hình thành khi chính họ phải quyết định. Ngồi cạnh đắt ở lần đầu và rẻ hơn hẳn từ lần thứ ba.",
      },
      {
        question: "Nên trao đổi gì với quản lý trước khi nhận kèm một người mới?",
        options: [
          "Khối lượng công việc chính của bạn sẽ được điều chỉnh thế nào trong quý đó",
          "Tiêu chí đánh giá việc kèm cặp có thành công hay không",
          "Người mới sẽ được giao những phần việc nào để bạn chuẩn bị nội dung phù hợp",
          "Việc kèm cặp được ghi nhận ra sao trong kỳ đánh giá",
        ],
        correct: 0,
        explanation:
          "Ba câu kia đều đáng hỏi và không câu nào ngăn được vấn đề phổ biến nhất. Nếu khối lượng chính giữ nguyên thì việc kèm sẽ được trả bằng thời gian cá nhân của bạn, và điều đó diễn ra âm thầm cho tới khi thành một cuộc trò chuyện khó chịu về tiến độ.",
      },
      {
        question: "Sau năm đầu, chi phí kèm cặp thay đổi ra sao?",
        options: [
          "Nhỏ đi nhiều nhưng không về không, vì vẫn còn xem lại và bàn hướng",
          "Về gần bằng không khi họ đã làm việc độc lập",
          "Giữ nguyên vì các vấn đề gặp phải ngày càng phức tạp nên vẫn cần trao đổi thường xuyên",
          "Chuyển thành chi phí của cả đội thay vì của riêng người kèm khi họ đã hoà nhập được",
        ],
        correct: 0,
        explanation:
          "Đây là điểm khác giữa kèm một người và làm một dự án: dự án có ngày kết thúc còn quan hệ này thì chuyển dạng chứ không dừng. Nó nhẹ đi rất nhiều, và phần còn lại là thứ đáng giữ chứ không phải thứ cần cắt.",
      },
      {
        question: "Kèm cặp trả lại cho chính người kèm điều gì rõ nhất?",
        options: [
          "Bạn phát hiện những chỗ mình làm theo thói quen mà không giải thích được vì sao",
          "Bạn có thêm một người có thể chia sẻ khối lượng công việc trong đội của mình",
          "Bạn xây dựng được uy tín và mối quan hệ tốt với đồng nghiệp mới trong công ty",
          "Bạn tích luỹ được kinh nghiệm cần thiết cho vai trò quản lý ở giai đoạn sau này",
        ],
        correct: 0,
        explanation:
          "Ba thứ kia đều đến nhưng chậm hơn và không chắc chắn bằng. Thứ đến ngay từ tuần đầu là những câu hỏi vì sao mà bạn không trả lời được: rất nhiều thứ trong công việc hằng ngày được làm theo quán tính, và chỉ khi có người hỏi thì chúng mới lộ ra.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn được đề nghị kèm một bạn mới trong sáu tháng, khối lượng công việc chính giữ nguyên. Nên phản hồi thế nào?",
      options: [
        "Nhận, và đề nghị điều chỉnh phần việc chính trong ba tháng đầu",
        "Nhận, vì đây là cơ hội rèn kỹ năng dẫn dắt",
        "Từ chối vì với khối lượng hiện tại thì bạn không thể đảm bảo chất lượng kèm cặp được",
        "Nhận nhưng giới hạn việc hỗ trợ trong một khung giờ cố định mỗi ngày để không ảnh hưởng",
      ],
      correct: 0,
      explanation:
        "Từ chối là bỏ mất một trong những việc trả lại nhiều nhất, còn nhận mà không điều chỉnh gì thì bạn đang tình nguyện trả bằng thời gian cá nhân. Ba tháng đầu là khoảng chi phí tập trung nhất, nên đó là chỗ cụ thể để đề nghị chứ không phải một lời xin chung chung.",
    },
    keyTakeaways: [
      "Chi phí thật nằm ở sự cắt vụn, không ở số giờ trả lời câu hỏi",
      "Năng suất giảm trong ba tháng đầu là hình dạng bình thường, không phải dấu hiệu kèm dở",
      "Để người mới làm phần khó và ngồi cạnh, thay vì giữ phần khó cho mình",
      "Không điều chỉnh khối lượng chính thì việc kèm được trả bằng thời gian cá nhân",
    ],
    summary: {
      keyIdea: "Kèm người mới là khoản đầu tư dồn vào năm đầu, và nó chuyển dạng chứ không kết thúc",
      commonMistake: "Nhận kèm mà giữ nguyên khối lượng công việc chính, rồi bù âm thầm bằng giờ ngoài",
      action: "Khi nhận kèm, đề nghị cụ thể việc điều chỉnh phần việc chính trong ba tháng đầu.",
    },
    application: {
      title: "Một đề nghị cụ thể, không phải một lời than",
      message:
        "Nói rõ ba tháng đầu bạn cần giảm bao nhiêu phần khối lượng chính. Con số cụ thể dễ được chấp nhận hơn nhiều so với một lời nhắc rằng việc kèm cũng tốn thời gian.",
      secondary:
        "Ghi lại những câu hỏi vì sao mà bạn không trả lời được - đó là danh sách những chỗ chính bạn đang làm theo quán tính.",
    },
    sections: [
      {
        type: "lead",
        text: "Kèm một người mới thường được hỏi dưới dạng bạn có sẵn lòng không. Câu hỏi đó bỏ qua phần duy nhất quyết định việc kèm có chạy hay không: tuần này bạn đang giữ những gì.",
      },
      {
        type: "heading",
        text: "Chi phí nằm ở chỗ bị cắt vụn",
      },
      {
        type: "paragraph",
        text: "Nếu chỉ đếm số giờ trả lời câu hỏi thì con số nhỏ và ai cũng nhận. Thứ không được đếm là mỗi lần bị cắt ngang giữa một việc cần giữ nhiều thứ trong đầu, và thời gian lấy lại mạch sau đó. Cộng với việc xem lại mã, chọn việc vừa sức, và sửa hướng khi thấy đi lệch - phần lớn dồn vào ba tháng đầu, đúng lúc người mới chưa đóng góp lại được gì.",
      },
      {
        type: "list",
        items: [
          "Đề nghị điều chỉnh khối lượng chính trong ba tháng đầu, bằng con số cụ thể",
          "Thống nhất một khung giờ để hỏi, nhưng đừng để người mới kẹt cả buổi chờ tới khung đó",
          "Để họ làm phần khó và mình ngồi cạnh, thay vì giữ phần khó cho nhanh",
          "Ghi lại những câu hỏi vì sao mà chính bạn không trả lời được",
        ],
      },
      {
        type: "callout",
        label: "Giảm năng suất không phải dấu hiệu bạn kèm dở",
        text: "Nhiều người nhận kèm rồi thấy mình chậm hẳn và kết luận là mình đang làm sai cách, nên cố bù bằng giờ ngoài thay vì nói ra. Đó là hình dạng bình thường của ba tháng đầu. Thứ bất thường là một kế hoạch coi việc kèm như không tốn gì.",
      },
      {
        type: "closing",
        lines: [
          "Đây là khoản đầu tư trả lại rõ nhất trong cả chặng, với điều kiện có ai đó tính nó vào kế hoạch.",
          "Bài sau: khoản duy nhất trong chặng này mà bạn tự bỏ tiền ra.",
        ],
      },
    ],
  },
  {
    id: 374,
    slug: "chi-cho-viec-hoc",
    title: "Chặng 18, Bài 5: Chi cho việc học - khoá học, chứng chỉ, hội thảo",
    subtitle: "Khoản duy nhất trong chặng này bạn trả bằng tiền, và tiền là phần nhỏ hơn",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🎓",
    track: "personal",
    whyItMatters:
      "Học thì luôn tốt, nên các khoản chi cho học ít khi bị cân nhắc kỹ như các khoản khác. Kết quả là nhiều người trả cả tiền lẫn thời gian cho những thứ không đổi được gì trong công việc của họ.",
    openingQuestion: "Phần đắt nhất của một khoá học có trả phí thường là gì?",
    openingOptions: [
      "Thời gian bạn bỏ ra, chứ không phải học phí",
      "Học phí, đặc biệt với những khoá do các tổ chức uy tín quốc tế cấp chứng chỉ sau khi hoàn thành",
      "Chi phí đi lại và thời gian nghỉ làm nếu khoá học diễn ra trực tiếp tại một địa điểm cụ thể",
      "Các khoản phát sinh như tài liệu, phần mềm và lệ phí thi lại nếu không đạt ngay lần đầu",
    ],
    correctOption: 0,
    explanation:
      "Một khoá học ba mươi giờ, cộng bài tập và ôn lại, dễ ngốn năm mươi tới sáu mươi giờ - tương đương một tuần rưỡi làm việc. Nếu đặt cạnh học phí thì phần thời gian gần như luôn lớn hơn, và nó là phần duy nhất không hoàn lại được. Hệ quả thực tế là câu hỏi đúng không phải khoá này có đáng tiền không mà là trong năm mươi giờ ấy, có cách nào học được nhiều hơn không. Với nhiều mục tiêu, câu trả lời là có: tự dựng một thứ nhỏ dùng đúng công nghệ đó thường dạy nhiều hơn, dù nó không cấp chứng chỉ nào.",
    diagram: [
      { label: "Học phí: con số duy nhất được nhìn thấy", arrow: true },
      { label: "Thời gian: thường lớn hơn, và không hoàn lại được", arrow: true },
      { label: "Câu hỏi đúng: trong ngần ấy giờ, có cách nào tốt hơn không", arrow: true },
      { label: "Với nhiều mục tiêu, tự dựng một thứ nhỏ dạy nhiều hơn" },
    ],
    realWorldExample: {
      company: "Hai cách dùng sáu mươi giờ",
      description:
        "Hai bạn cùng muốn học một nền tảng đám mây. Một bạn mua khoá ôn thi chứng chỉ, học đủ và thi đỗ. Một bạn dựng một dịch vụ nhỏ chạy thật trên nền tảng đó, gặp lỗi cấu hình, tự tìm cách sửa. Bạn thứ nhất có chứng chỉ để đưa vào hồ sơ; bạn thứ hai kể được ba câu chuyện cụ thể trong buổi phỏng vấn. Cả hai đều dùng khoảng sáu mươi giờ.",
    },
    quiz: [
      {
        question: "Chứng chỉ có giá trị rõ nhất trong trường hợp nào?",
        options: [
          "Khi nó là điều kiện lọc hồ sơ ở nơi bạn nhắm tới",
          "Khi bạn muốn học một cách có hệ thống thay vì tự học rời rạc theo nhu cầu công việc",
          "Khi bạn cần chứng minh năng lực với một công nghệ mà mình chưa từng làm việc cùng",
          "Khi công ty chi trả toàn bộ chi phí nên bạn không phải bỏ tiền cá nhân ra cho nó",
        ],
        correct: 0,
        explanation:
          "Đây là trường hợp mà chứng chỉ làm được thứ không gì thay thế: qua được một bộ lọc tự động hoặc một yêu cầu bắt buộc của khách hàng. Ngoài trường hợp đó, người phỏng vấn thường quan tâm bạn đã làm được gì hơn là bạn đã thi đỗ gì.",
      },
      {
        question: "Vì sao nên xác định mục tiêu trước khi chọn hình thức học?",
        options: [
          "Vì mục tiêu quyết định hình thức, và nhiều mục tiêu không cần khoá học nào",
          "Vì mục tiêu rõ ràng giúp bạn giữ được động lực khi học",
          "Vì khoá học có nhiều cấp độ nên phải chọn đúng cấp",
          "Vì cần biết sẽ áp dụng vào đâu để chọn nội dung học",
        ],
        correct: 0,
        explanation:
          "Muốn qua bộ lọc hồ sơ thì cần chứng chỉ. Muốn dùng được một công nghệ thì cần dựng một thứ bằng nó. Muốn hiểu nền tảng sâu hơn thì một cuốn sách tốt thường hơn hẳn một khoá quay sẵn. Ba mục tiêu, ba hình thức, và chọn nhầm thì bạn trả đủ giá mà không được thứ mình cần.",
      },
      {
        question: "Hội thảo trong ngành mang lại giá trị lớn nhất ở đâu?",
        options: [
          "Ở những cuộc trò chuyện bên lề, không ở các bài trình bày",
          "Ở việc cập nhật những xu hướng công nghệ mới nhất mà ngành đang tập trung phát triển",
          "Ở cơ hội nghe trực tiếp từ những người có kinh nghiệm sâu trong lĩnh vực bạn quan tâm",
          "Ở tài liệu và bản ghi các phiên trình bày mà bạn có thể xem lại sau khi sự kiện kết thúc",
        ],
        correct: 0,
        explanation:
          "Phần lớn bài trình bày sẽ có bản ghi và bạn xem lại được ở nhà với tốc độ gấp rưỡi. Thứ không có bản ghi là cuộc trò chuyện với người vừa gặp đúng vấn đề bạn đang gặp. Ai đi hội thảo mà ngồi kín lịch các phiên thường mang về ít hơn người bỏ vài phiên để nói chuyện.",
      },
      {
        question: "Công ty chi trả học phí thì nên cân nhắc thêm gì?",
        options: [
          "Điều khoản ràng buộc nếu nghỉ việc, và phần thời gian vẫn là của bạn",
          "Chọn khoá đắt nhất trong hạn mức để tận dụng quyền lợi",
          "Ưu tiên khoá liên quan việc hiện tại cho dễ được duyệt",
          "Thời điểm đăng ký hợp với chu kỳ ngân sách đào tạo",
        ],
        correct: 0,
        explanation:
          "Học phí được trả không làm khoản này miễn phí: thời gian vẫn là của bạn, và nhiều nơi gắn kèm cam kết ở lại. Cả hai đều là những thứ đã bàn ở chặng về hợp đồng lao động, và chúng áp dụng nguyên vẹn ở đây.",
      },
      {
        question: "Dấu hiệu nào cho thấy một khoản chi cho học đã không hiệu quả?",
        options: [
          "Ba tháng sau, không có gì trong công việc của bạn khác đi",
          "Bạn không hoàn thành hết nội dung của khoá học vì thiếu thời gian trong giai đoạn bận rộn",
          "Kiến thức trong khoá học trùng lặp khá nhiều với những gì bạn đã biết từ trước đó",
          "Bạn không thi đỗ ngay lần đầu và phải thi lại",
        ],
        correct: 0,
        explanation:
          "Phép thử ba tháng thẳng thắn hơn mọi cách đánh giá khác, và nó cũng dùng được cho lần sau: nếu hai khoản chi liên tiếp đều không đổi được gì thì vấn đề nằm ở cách chọn chứ không ở khoá học cụ thể nào.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn muốn làm việc được với một nền tảng đám mây và đang cân nhắc một khoá ôn thi chứng chỉ. Nên quyết thế nào?",
      options: [
        "Xem nơi bạn nhắm tới có yêu cầu chứng chỉ không; nếu không thì dựng một thứ nhỏ",
        "Học khoá ôn thi trước để có nền tảng rồi mới làm dự án thực tế",
        "Chọn khoá có nhiều bài thực hành để vừa có chứng chỉ vừa làm thật",
        "Hỏi những người đã có chứng chỉ xem nó giúp gì cho công việc họ",
      ],
      correct: 0,
      explanation:
        "Câu hỏi này tách được hai mục tiêu hay bị trộn: qua bộ lọc, và dùng được. Nếu nơi bạn nhắm không lọc theo chứng chỉ thì sáu mươi giờ dựng một thứ chạy thật cho bạn nhiều hơn hẳn - cả về năng lực lẫn về thứ để kể trong buổi phỏng vấn.",
    },
    keyTakeaways: [
      "Thời gian gần như luôn lớn hơn học phí, và nó không hoàn lại được",
      "Mục tiêu quyết định hình thức; nhiều mục tiêu không cần khoá học nào",
      "Chứng chỉ có giá trị rõ nhất khi nó là điều kiện lọc hồ sơ",
      "Phép thử: ba tháng sau, có gì trong công việc của bạn khác đi không",
    ],
    summary: {
      keyIdea: "Học phí là phần nhỏ hơn; câu hỏi đúng là trong ngần ấy giờ có cách nào học được nhiều hơn không",
      commonMistake: "Chọn hình thức trước rồi mới nghĩ mục tiêu, nên trả đủ giá mà không được thứ mình cần",
      action: "Viết mục tiêu ra một câu, rồi chọn hình thức. Ba tháng sau, kiểm xem có gì khác đi.",
    },
    application: {
      title: "Một câu mục tiêu, một phép thử ba tháng",
      message:
        "Trước khi trả tiền, viết ra bạn muốn làm được gì mà hiện chưa làm được. Ba tháng sau khi học xong, kiểm lại đúng câu đó.",
      secondary:
        "Nếu hai khoản liên tiếp đều không đổi được gì, vấn đề nằm ở cách chọn chứ không ở khoá học nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Đây là khoản duy nhất trong chặng này có hoá đơn, và cũng vì thế nó là khoản dễ bị nhìn sai nhất - người ta cân nhắc con số trên hoá đơn và bỏ qua con số lớn hơn.",
      },
      {
        type: "heading",
        text: "Mục tiêu quyết định hình thức",
      },
      {
        type: "paragraph",
        text: "Ba mục tiêu hay bị trộn vào nhau: qua một bộ lọc hồ sơ, dùng được một công nghệ, và hiểu sâu một nền tảng. Cái thứ nhất cần chứng chỉ và không gì thay thế được. Cái thứ hai cần dựng một thứ chạy thật. Cái thứ ba thường được phục vụ tốt nhất bởi một cuốn sách. Chọn nhầm hình thức thì bạn vẫn trả đủ cả tiền lẫn giờ.",
      },
      {
        type: "callout",
        label: "Công ty trả tiền không làm khoản này miễn phí",
        text: "Thời gian vẫn là của bạn, và nhiều nơi gắn kèm cam kết ở lại kèm điều khoản hoàn chi phí nếu nghỉ sớm. Đó là cùng loại điều khoản đã bàn ở chặng về lời mời làm việc, và nó đáng đọc kỹ ở đây đúng như ở đó.",
      },
      {
        type: "closing",
        lines: [
          "Học luôn tốt; một khoản chi cụ thể cho việc học thì không tự động tốt.",
          "Bài sau: thứ bạn đã dựng và quyết định giữ lại nhiều năm.",
        ],
      },
    ],
  },
  {
    id: 375,
    slug: "nuoi-mot-du-an-song-lau",
    title: "Chặng 18, Bài 6: Nuôi một dự án sống lâu",
    subtitle: "Khoản đều đặn kéo dài nhất, và nó lớn dần chứ không nhỏ đi",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🌳",
    track: "personal",
    whyItMatters:
      "Một dự án có người dùng thật là thứ đáng tự hào nhất mà nhiều người làm nghề có, và cũng là cam kết dài nhất họ từng nhận mà chưa lần nào được đưa ra quyết định một cách rõ ràng.",
    openingQuestion: "Chi phí nuôi một dự án đã có người dùng thay đổi thế nào theo thời gian?",
    openingOptions: [
      "Lớn dần, vì số người dùng và số thứ phụ thuộc đều tăng",
      "Nhỏ dần khi dự án đã ổn định và phần lớn lỗi nghiêm trọng đã được phát hiện và xử lý hết",
      "Giữ nguyên ở mức tương đối đều đặn nếu bạn không bổ sung thêm tính năng mới nào cả",
      "Biến động theo chu kỳ, tăng lên khi có phiên bản mới và giảm xuống trong các giai đoạn khác",
    ],
    correctOption: 0,
    explanation:
      "Trực giác nói rằng dự án càng chín thì càng ít việc, và thực tế thường ngược lại. Càng nhiều người dùng thì càng nhiều trường hợp lạ, càng nhiều yêu cầu nhỏ, và càng khó đổi bất cứ thứ gì mà không làm ai đó khó chịu. Càng nhiều thứ khác phụ thuộc vào nó thì mỗi thay đổi càng phải cẩn thận hơn. Cộng thêm việc thế giới xung quanh vẫn đổi và bạn phải chạy theo chỉ để đứng yên. Đây là lý do câu hỏi khó nhất của một dự án cá nhân thành công không phải làm sao lớn hơn mà là mình còn muốn nuôi nó nữa không.",
    diagram: [
      { label: "Ít người dùng: sửa gì cũng dễ", arrow: true },
      { label: "Nhiều người dùng: nhiều trường hợp lạ, khó đổi", arrow: true },
      { label: "Có thứ khác phụ thuộc: mỗi thay đổi phải cẩn thận hơn", arrow: true },
      { label: "Chi phí lớn dần, trong khi hứng thú thì không" },
    ],
    realWorldExample: {
      company: "Năm thứ tư",
      description:
        "Một thư viện nhỏ được dựng trong hai tuần, sau bốn năm có vài nghìn dự án dùng. Người viết nó giờ dành phần lớn thời gian cho dự án này vào việc trả lời câu hỏi và cân nhắc xem một thay đổi có làm hỏng ai không. Phần viết mã gần như không còn. Không có gì hỏng cả; nó chỉ đã trở thành một công việc khác so với thứ bạn ấy nhận vào bốn năm trước.",
    },
    quiz: [
      {
        question: "Vì sao dự án càng nhiều người dùng thì càng khó thay đổi?",
        options: [
          "Vì mỗi thay đổi đều có khả năng làm hỏng cách ai đó đang dùng nó",
          "Vì cần nhiều thời gian hơn để kiểm thử kỹ trước khi phát hành mỗi phiên bản mới ra ngoài",
          "Vì mã nguồn phức tạp dần khi thêm nhiều tính năng",
          "Vì phải chờ ý kiến của cộng đồng người dùng trước khi đưa ra các quyết định quan trọng",
        ],
        correct: 0,
        explanation:
          "Với một trăm người dùng, gần như chắc chắn có ai đó đang dựa vào một hành vi mà bạn thậm chí không coi là một tính năng. Đây là thứ khiến việc dọn dẹp và cải thiện ngày càng đắt, và nó không liên quan gì tới chất lượng mã nguồn.",
      },
      {
        question: "Cách nào bền nhất để giảm gánh nặng của một dự án lâu năm?",
        options: [
          "Thu hẹp phạm vi công khai và nói rõ thứ gì không được hỗ trợ",
          "Tự động hoá tối đa phần kiểm thử và phát hành để giảm công sức cho mỗi lần cập nhật",
          "Tìm thêm người cùng chia khối lượng bảo trì",
          "Viết tài liệu thật đầy đủ để người dùng tự tìm được câu trả lời mà không cần hỏi bạn",
        ],
        correct: 0,
        explanation:
          "Ba cách kia làm cùng khối lượng công việc rẻ hơn; cách này làm khối lượng ít đi. Mỗi thứ bạn hứa hỗ trợ là một thứ phải giữ cho chạy mãi, nên biên giới càng hẹp và càng rõ thì phần phải giữ càng nhỏ - và người dùng cũng biết trước để không dựa vào chỗ không nên dựa.",
      },
      {
        question: "Khi không còn muốn nuôi tiếp, cách xử lý nào tốt nhất?",
        options: [
          "Nói rõ tình trạng dự án, thay vì im lặng để nó tự tàn dần",
          "Tiếp tục duy trì ở mức tối thiểu để không ảnh hưởng tới những người đang phụ thuộc vào nó",
          "Tìm bằng được người tiếp nhận trước khi thông báo bất kỳ điều gì với cộng đồng người dùng",
          "Ngừng phát hành phiên bản mới nhưng vẫn tiếp tục trả lời các câu hỏi khi có người hỏi",
        ],
        correct: 0,
        explanation:
          "Im lặng là kết cục phổ biến nhất và tệ nhất cho tất cả: người dùng vẫn tưởng dự án còn sống, còn bạn thì mang cảm giác nợ nần mà không làm gì. Một dòng thông báo rằng dự án đang ở chế độ chỉ sửa lỗi nặng giải phóng cả hai phía ngay lập tức.",
      },
      {
        question: "Nhận thêm người cùng bảo trì có tác dụng gì rõ nhất?",
        options: [
          "Dự án không còn phụ thuộc vào việc bạn có rảnh hay không",
          "Khối lượng bảo trì chia đều nên phần bạn giảm",
          "Chất lượng mã nguồn tốt hơn vì có thêm người xem lại các thay đổi trước khi phát hành",
          "Dự án phát triển nhanh hơn vì có nhiều người cùng làm các tính năng mới cùng lúc",
        ],
        correct: 0,
        explanation:
          "Việc chia khối lượng đến chậm, vì thời gian đầu bạn còn tốn công hướng dẫn. Thứ có ngay là dự án thôi phụ thuộc vào một người, và đó là thay đổi quan trọng nhất - cả cho người dùng lẫn cho chính bạn khi muốn nghỉ một tháng.",
      },
      {
        question: "Trước khi mở rộng một dự án cá nhân, câu hỏi nào đáng đặt nhất?",
        options: [
          "Mình có muốn làm việc này thêm ba năm nữa không",
          "Dự án có đủ người dùng để mở rộng không",
          "Có đủ thời gian trong quỹ hiện tại để làm phần mở rộng đó một cách tử tế không",
          "Việc mở rộng có làm ảnh hưởng tới sự ổn định mà người dùng hiện tại đang có không",
        ],
        correct: 0,
        explanation:
          "Ba câu kia đều về phần thêm vào; câu này về toàn bộ phần còn lại. Mở rộng làm dự án đáng giá hơn và cũng nặng hơn, nên nó chỉ có nghĩa khi bạn còn muốn ở lại với nó - và đó là câu ít khi được hỏi thẳng nhất.",
      },
    ],
    practicePrompt: {
      question:
        "Dự án của bạn có vài trăm người dùng và bạn thấy mệt với nó. Bước đầu tiên nên là gì?",
      options: [
        "Nói rõ tình trạng và thu hẹp lại thứ bạn cam kết hỗ trợ",
        "Tìm người tiếp nhận dự án để bàn giao lại toàn bộ trước khi thông báo cho người dùng biết",
        "Tạm dừng nhận yêu cầu mới trong vài tháng",
        "Tự động hoá phần lớn công việc lặp lại để giảm khối lượng phải xử lý mỗi tuần xuống",
      ],
      correct: 0,
      explanation:
        "Đây là bước duy nhất bạn làm được ngay hôm nay mà không cần ai đồng ý, và nó giảm gánh nặng thật chứ không chỉ hoãn lại. Tìm người tiếp nhận thì đáng làm nhưng có thể mất nhiều tháng, và trong lúc chờ thì mọi thứ vẫn nguyên như cũ.",
    },
    keyTakeaways: [
      "Chi phí nuôi lớn dần theo số người dùng, ngược với trực giác",
      "Với một trăm người dùng, luôn có ai đó dựa vào thứ bạn không coi là tính năng",
      "Thu hẹp cam kết làm khối lượng ít đi; tự động hoá chỉ làm nó rẻ hơn",
      "Im lặng để dự án tàn dần là kết cục tệ nhất cho cả hai phía",
    ],
    summary: {
      keyIdea: "Một dự án thành công là cam kết dài nhất bạn từng nhận mà chưa lần nào quyết định rõ ràng",
      commonMistake: "Nghĩ rằng dự án chín rồi thì nhẹ đi, trong khi nó nặng dần theo số người phụ thuộc",
      action: "Mỗi năm một lần, hỏi thẳng: mình có muốn làm việc này thêm ba năm nữa không.",
    },
    application: {
      title: "Thu hẹp biên giới trước khi thu hẹp công sức",
      message:
        "Viết rõ dự án hỗ trợ gì và không hỗ trợ gì. Mỗi dòng bạn bỏ khỏi danh sách hỗ trợ là một khoản trừ vĩnh viễn khỏi công việc hằng tuần.",
      secondary:
        "Nếu đã hết muốn nuôi, một dòng thông báo về tình trạng thật giải phóng cả bạn lẫn người dùng ngay hôm nay.",
    },
    sections: [
      {
        type: "lead",
        text: "Một dự án có người dùng thật là thành tựu, và nó cũng là hoá đơn dài nhất trong chặng này - hoá đơn không có ngày kết thúc và không ai từng ký.",
      },
      {
        type: "heading",
        text: "Nặng dần, không nhẹ dần",
      },
      {
        type: "paragraph",
        text: "Trực giác nói dự án chín thì ít việc. Thực tế là mỗi người dùng mới mang theo một cách dùng lạ, mỗi thứ phụ thuộc vào nó làm mọi thay đổi đắt thêm, và thế giới xung quanh vẫn đổi. Phần viết mã teo dần trong khi phần cân nhắc và trả lời phình ra, cho tới lúc công việc này không còn giống thứ bạn đã nhận lúc đầu.",
      },
      {
        type: "list",
        items: [
          "Nói rõ dự án hỗ trợ gì và không hỗ trợ gì - đây là cách duy nhất làm khối lượng ít đi",
          "Nhận người cùng bảo trì sớm hơn lúc bạn thấy cần, vì hướng dẫn cũng tốn thời gian",
          "Mỗi năm hỏi một lần: mình có muốn làm việc này thêm ba năm nữa không",
          "Hết muốn thì nói ra, đừng để nó tàn dần trong im lặng",
        ],
      },
      {
        type: "callout",
        label: "Câu hỏi khó nhất của một dự án thành công",
        text: "Không phải làm sao cho nó lớn hơn, mà là mình còn muốn nuôi nó nữa không. Câu này ít khi được hỏi thẳng vì dự án đang chạy tốt và người dùng đang hài lòng, nên hỏi ra có vẻ như phụ lòng ai đó. Không hỏi thì câu trả lời vẫn tới, chỉ là dưới dạng những tháng im lặng và những yêu cầu không được trả lời.",
      },
      {
        type: "closing",
        lines: [
          "Thứ bạn dựng ra trong hai tuần có thể ở lại với bạn nhiều năm, và đó vừa là phần thưởng vừa là hoá đơn.",
          "Bài sau: đặt cả sáu khoản lên cùng một trang.",
        ],
      },
    ],
  },
  {
    id: 376,
    slug: "ban-do-cac-du-an-lon",
    title: "Chặng 18, Bài 7: Tổng kết - bản đồ các dự án lớn",
    subtitle: "Sáu cam kết, một quỹ thời gian, và một trang giấy",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🧾",
    track: "personal",
    whyItMatters:
      "Sáu bài trước mỗi bài mô tả một cam kết. Không cam kết nào trong đó là sai lầm, và đó chính là lý do cần một chỗ nhìn thấy cả sáu cùng lúc - vì cái sai chỉ xuất hiện ở tổng.",
    openingQuestion: "Điểm chung của cả sáu cam kết trong chặng này là gì?",
    openingOptions: [
      "Phần lớn chi phí nằm sau lúc quyết định, còn ước lượng thì chỉ tính phần trước",
      "Chúng đều đòi một khoản đầu tư thời gian ban đầu đáng kể",
      "Chúng đều là việc nằm ngoài phạm vi công việc chính nên ít khi được ghi nhận đúng mức",
      "Chúng đều có lợi ích rõ nên hầu như không ai từ chối",
    ],
    correctOption: 0,
    explanation:
      "Dựng một dự án phụ mất hai tuần và nuôi nó mất nhiều năm. Chuẩn bị một bài nói mất vài chục giờ trong khi lời mời chỉ nhắc tới ba mươi phút. Kèm một người mới nặng nhất ở ba tháng đầu rồi chuyển dạng chứ không dừng. Một khoá học tính bằng học phí trong khi phần đắt hơn là thời gian. Mỗi lần, con số được đưa ra để quyết định là con số của phần đầu, và phần đầu là phần nhỏ. Đó là lý do người ta nhận đúng và vẫn quá tải: họ không quyết sai, họ quyết dựa trên một phép tính thiếu vế.",
    diagram: [
      { label: "Lúc quyết định: chỉ phần đầu được tính", arrow: true },
      { label: "Phần sau lớn hơn và không có điểm dừng", arrow: true },
      { label: "Sáu cam kết cùng rút từ một quỹ", arrow: true },
      { label: "Tổng chỉ hiện ra khi được viết vào cùng một chỗ" },
    ],
    realWorldExample: {
      company: "Một trang giấy và bốn dòng",
      description:
        "Một kỹ sư ngồi viết ra mọi thứ mình đã hứa với ai đó: kèm một bạn mới, một công cụ nội bộ đang nuôi, một buổi nói đã nhận, một khoá học đang dở. Cộng số giờ mỗi tuần thì ra gần một phần ba quỹ làm việc, trong khi khối lượng công việc chính chưa hề giảm dòng nào. Không dòng nào trong bốn dòng đó đáng bỏ; điều đáng nói là chưa lần nào chúng nằm cạnh nhau.",
    },
    quiz: [
      {
        question: "Vì sao viết tất cả vào một chỗ lại có tác dụng?",
        options: [
          "Vì nó biến câu hỏi có nên nhận không thành nhận thì bỏ cái nào",
          "Vì nó giúp bạn theo dõi tiến độ của từng cam kết và không bỏ sót việc nào đã hứa với ai",
          "Vì nó là căn cứ để trao đổi với quản lý khi cần điều chỉnh lại khối lượng công việc chính",
          "Vì nó cho thấy bạn đóng góp ngoài phạm vi được giao",
        ],
        correct: 0,
        explanation:
          "Câu hỏi thứ nhất gần như luôn được trả lời là có, vì mỗi lời mời nhìn riêng đều đáng nhận. Câu hỏi thứ hai buộc phải so sánh, và so sánh thì cho ra quyết định khác hẳn. Đây là toàn bộ tác dụng của tờ giấy đó.",
      },
      {
        question: "Cam kết nào trong chặng này không có điểm kết thúc tự nhiên?",
        options: [
          "Nuôi một dự án đang có người dùng",
          "Kèm một người mới cho tới khi họ làm việc được độc lập trong đội",
          "Chuẩn bị và trình bày một bài nói tại hội thảo đã nhận lời tham gia",
          "Hoàn thành một khoá học có cấp chứng chỉ sau khi kết thúc chương trình",
        ],
        correct: 0,
        explanation:
          "Ba cái kia đều có một ngày mà bạn nói xong rồi. Nuôi một dự án thì không, chừng nào còn người dùng - và đó là lý do nó cần được quyết định lại định kỳ chứ không phải một lần lúc bắt đầu.",
      },
      {
        question: "Nên xử lý ra sao khi tổng vượt quá quỹ thời gian thật?",
        options: [
          "Bỏ hẳn một cam kết, thay vì giảm đều tất cả",
          "Giảm bớt thời gian dành cho mỗi cam kết một cách đồng đều để vẫn giữ được tất cả",
          "Kéo dài thời hạn của các cam kết có thể lùi được để giãn khối lượng ra trong thời gian dài hơn",
          "Tăng thời gian làm việc trong giai đoạn cao điểm rồi cân bằng lại sau khi qua giai đoạn đó",
        ],
        correct: 0,
        explanation:
          "Giảm đều nghe công bằng và cho ra bốn thứ làm dở dang, vì mỗi cam kết đều có một mức tối thiểu để còn có nghĩa. Bỏ hẳn một cái thì khó chịu hơn nhiều lúc quyết định và là cách duy nhất thật sự giải phóng được quỹ.",
      },
      {
        question: "Cam kết nào đáng ưu tiên giữ nhất khi phải cắt bớt?",
        options: [
          "Loại tạo ra thứ tiếp tục chạy khi bạn không còn tham gia",
          "Loại có nhiều người khác đang phụ thuộc vào tiến độ của bạn nên khó rút lui giữa chừng",
          "Loại bạn đã đầu tư nhiều thời gian nhất nên việc bỏ dở sẽ lãng phí công sức đã bỏ ra",
          "Loại có lợi rõ nhất cho hướng đi sắp tới của bạn",
        ],
        correct: 0,
        explanation:
          "Thời gian đã bỏ ra không quay lại được dù bạn tiếp tục hay dừng, nên nó không nên có mặt trong quyết định. Thứ đáng cân nhắc là phần còn lại sau khi bạn rút tay: một người đã học được cách làm việc mới thì vẫn giữ nó, còn một dự án chỉ chạy khi có bạn thì dừng.",
      },
      {
        question: "Nên xem lại bản đồ này bao lâu một lần?",
        options: [
          "Định kỳ theo lịch, và thêm một lần trước mỗi khi nhận cam kết mới",
          "Mỗi khi cảm thấy quá tải để kịp thời điều chỉnh trước khi ảnh hưởng tới chất lượng công việc",
          "Vào đầu mỗi năm khi lập kế hoạch cá nhân",
          "Khi có thay đổi lớn về công việc như chuyển vị trí, chuyển đội hoặc chuyển sang công ty khác",
        ],
        correct: 0,
        explanation:
          "Một lần theo lịch để bắt được thứ đã âm thầm phình ra, và một lần trước khi nhận thêm để quyết định mới được đưa ra với đủ thông tin. Xem lại chỉ khi đã thấy quá tải thì luôn muộn, vì lúc đó mọi cam kết đều đang dở và rút khỏi cái nào cũng đắt.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn viết ra bốn cam kết và thấy tổng chiếm khoảng một phần ba quỹ thời gian. Việc tiếp theo là gì?",
      options: [
        "Kiểm xem khối lượng công việc chính đã được giảm tương ứng chưa",
        "Sắp xếp lại thứ tự ưu tiên giữa bốn cam kết để tập trung vào những việc quan trọng nhất trước",
        "Lên kế hoạch chi tiết cho từng cam kết để đảm bảo chúng không chồng lấn nhau về thời gian",
        "Xin giãn thời hạn những cam kết lùi được",
      ],
      correct: 0,
      explanation:
        "Nếu chưa giảm dòng nào thì một phần ba đó đang được lấy ra từ đâu, và câu trả lời gần như luôn là thời gian cá nhân hoặc phần việc chính. Sắp xếp lại thứ tự và giãn thời hạn đều không tạo thêm giờ nào; chúng chỉ đổi thứ tự các việc rút từ cùng một quỹ đã cạn.",
    },
    keyTakeaways: [
      "Phần lớn chi phí nằm sau lúc quyết định; ước lượng chỉ tính phần trước",
      "Viết vào một chỗ biến câu hỏi có nên nhận thành nhận thì bỏ cái nào",
      "Giảm đều cho ra bốn thứ dở dang; bỏ hẳn một cái mới giải phóng được quỹ",
      "Thời gian đã bỏ ra không nên có mặt trong quyết định giữ hay bỏ",
    ],
    summary: {
      keyIdea: "Sáu cam kết đúng vẫn cộng thành một tình trạng sai, và tổng chỉ hiện ra khi được viết vào cùng một chỗ",
      commonMistake: "Cân nhắc từng lời mời riêng lẻ, rồi trả phần vượt quỹ bằng thời gian cá nhân",
      action: "Viết mọi cam kết vào một trang kèm số giờ mỗi tuần, và xem lại nó theo lịch chứ không đợi lúc quá tải.",
    },
    application: {
      title: "Một trang, cập nhật mỗi quý",
      message:
        "Mỗi dòng là một thứ bạn đã hứa với ai đó, kèm số giờ mỗi tuần và ngày kết thúc. Dòng nào không điền được ngày kết thúc là dòng đáng chú ý nhất.",
      secondary:
        "Trước khi nhận bất cứ gì mới, mở trang này ra trước - đó là toàn bộ kỷ luật mà chặng này đòi hỏi.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáu bài trước mỗi bài mô tả một cam kết đáng nhận. Bài này không thêm cam kết nào; nó chỉ đặt cả sáu lên cùng một trang, vì đó là chỗ duy nhất vấn đề thật sự hiện ra.",
      },
      {
        type: "heading",
        text: "Cùng một hình dạng, lặp lại sáu lần",
      },
      {
        type: "paragraph",
        text: "Mỗi cam kết đều có một phần đầu ước lượng được và một phần sau lớn hơn nhiều. Lúc quyết định, chỉ phần đầu có mặt trong phép tính - vì nó là phần duy nhất ai đó nói ra thành con số. Nhận ra hình dạng này là toàn bộ nội dung của chặng, và nó áp dụng được cho cả những cam kết chưa có trong sáu bài trên.",
      },
      {
        type: "list",
        items: [
          "Mỗi dòng: thứ đã hứa, số giờ mỗi tuần, và ngày kết thúc nếu có",
          "Dòng không điền được ngày kết thúc là dòng cần quyết định lại định kỳ",
          "Vượt quỹ thì bỏ hẳn một dòng, đừng giảm đều tất cả",
          "Khi cắt, giữ lại thứ còn tiếp tục chạy sau khi bạn rút tay",
        ],
      },
      {
        type: "callout",
        label: "Thời gian đã bỏ ra không thuộc về quyết định này",
        text: "Lý do phổ biến nhất để giữ một cam kết đã hết ý nghĩa là mình đã đầu tư nhiều vào nó rồi. Phần đã bỏ ra không quay lại dù bạn tiếp tục hay dừng, nên nó không nên có mặt trong phép tính. Câu hỏi duy nhất còn đúng là: từ hôm nay trở đi, ngần ấy giờ mỗi tuần có đáng không.",
      },
      {
        type: "closing",
        lines: [
          "Chặng này không bảo bạn nhận ít đi; nó chỉ đảm bảo mỗi lần nhận là một quyết định thật.",
          "Không có cam kết nào ở đây là sai; chỉ có tổng của chúng là thứ chưa ai nhìn.",
        ],
      },
    ],
  },
];
