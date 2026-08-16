import type { Lesson } from "./lesson-types";

// Chặng 16 của track cá nhân: phòng lừa đảo và an toàn tài chính.
//
// VÌ SAO CHẶNG NÀY TỒN TẠI. Track cá nhân có đúng MỘT bài về lừa đảo (id 284,
// trong chặng Quản lý tài sản), trong khi đây là nguyên nhân mất tiền nhanh
// nhất và phổ biến nhất với người học Việt Nam - nhanh hơn mọi khoản đầu tư
// sai, và không có cơ hội gỡ lại.
//
// NGUYÊN TẮC VIẾT. Không dạy nhận diện theo DẤU HIỆU BỀ MẶT (sai chính tả, số
// lạ, giọng miền nào) - những thứ đó thay đổi liên tục và tạo cảm giác an toàn
// giả. Dạy nhận diện theo CẤU TRÚC: kịch bản nào cũng cần bạn hành động gấp,
// một mình, và qua một kênh do chúng chọn. Cấu trúc thì không đổi được vì nó
// là điều kiện để trò lừa hoạt động.
//
// Ids 350-357 nối tiếp Chặng 15 (340-347), chừa 348-349 làm chỗ chèn.
// Tám điểm nối phải cập nhật cùng lúc - xem chú thích đầu
// lib/income-growth-lessons.ts.

export const FRAUD_SAFETY_LESSONS: Lesson[] = [
  {
    id: 350,
    slug: "vi-sao-ai-cung-co-the-bi-lua",
    title: "Chặng 16, Bài 1: Vì sao ai cũng có thể bị lừa",
    subtitle: "Không phải vì thiếu hiểu biết - mà vì trò lừa nhắm vào trạng thái, không nhắm vào kiến thức",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "🧠",
    track: "personal",
    whyItMatters:
      "Niềm tin mình đủ tỉnh táo để không bị lừa chính là điều kiện khiến người ta không chuẩn bị gì. Người bị lừa thường không phải người nhẹ dạ, mà là người đang ở đúng trạng thái mà kịch bản nhắm tới - và trạng thái ấy có thể xảy ra với bất kỳ ai.",
    openingQuestion: "Điều gì khiến một người bình thường tỉnh táo vẫn có thể bị lừa?",
    openingOptions: [
      "Thiếu kiến thức về các hình thức lừa đảo đang phổ biến nhất trên thị trường",
      "Bị đặt vào trạng thái gấp gáp và sợ hãi khiến khả năng suy xét giảm mạnh",
      "Không kiểm tra kỹ số điện thoại và địa chỉ của bên liên hệ với mình",
      "Chưa cài đặt đầy đủ các phần mềm bảo mật trên điện thoại và máy tính",
    ],
    correctOption: 1,
    explanation:
      "Mọi kịch bản lừa đảo hiệu quả đều bắt đầu bằng việc tạo ra một trạng thái: sợ hãi vì bị nói là đang dính líu tới một vụ án, gấp gáp vì cơ hội sắp hết, hoặc xúc động vì người thân đang gặp chuyện. Trong trạng thái ấy, phần não lo suy xét cẩn thận bị lấn át bởi phần lo phản ứng nhanh - đó là cơ chế sinh học, không phải khiếm khuyết cá nhân. Kiến thức về các hình thức lừa đảo có ích nhưng không đủ, vì kịch bản mới xuất hiện liên tục còn trạng thái thì luôn giống nhau. Đó là lý do cách phòng vệ hiệu quả nhất không phải nhớ nhiều thủ đoạn, mà là có sẵn một quy tắc áp dụng được ngay cả khi bạn đang hoảng.",
    diagram: [
      { label: "Tạo trạng thái: sợ, gấp, xúc động", arrow: true },
      { label: "Khả năng suy xét giảm xuống", arrow: true },
      { label: "Yêu cầu hành động ngay và một mình", arrow: true },
      { label: "Quy tắc định sẵn là thứ duy nhất còn hoạt động" },
    ],
    realWorldExample: {
      company: "Cùng một người, hai thời điểm",
      description:
        "Một người đọc tin cảnh báo về thủ đoạn mạo danh cơ quan chức năng và thấy nó rõ ràng tới mức khó tin có ai mắc. Ba tháng sau, giữa giờ làm việc căng thẳng, người đó nhận cuộc gọi nói tài khoản của mình liên quan tới một vụ án và cần phối hợp ngay nếu không sẽ bị phong tỏa. Kiến thức vẫn nằm đó, nhưng nó không được gọi ra - vì trạng thái lúc ấy đã khác.",
    },
    quiz: [
      {
        question: "Vì sao kiến thức về thủ đoạn lừa đảo là chưa đủ để phòng vệ?",
        options: [
          "Vì kịch bản thay đổi liên tục, còn trạng thái mà chúng tạo ra thì luôn giống nhau",
          "Vì phần lớn người dân không có thời gian cập nhật tin tức về lừa đảo",
          "Vì các thủ đoạn được mô tả trên báo chí thì thường đã lỗi thời từ nhiều năm trước",
          "Vì kẻ lừa đảo luôn nhắm vào những người chưa từng đọc cảnh báo nào",
        ],
        correct: 0,
        explanation:
          "Ghi nhớ một danh sách thủ đoạn là cuộc chạy đua không thắng được, vì bên kia chỉ cần đổi chi tiết. Nhận ra cấu trúc chung thì không phụ thuộc vào việc kịch bản mới có gì.",
      },
      {
        question: "Ba trạng thái mà kịch bản lừa đảo thường tạo ra là gì?",
        options: [
          "Sợ hãi, gấp gáp, và xúc động vì người thân đang gặp chuyện",
          "Tò mò, hoài nghi, và mong muốn tìm hiểu thêm thông tin",
          "Buồn chán, mệt mỏi, và thiếu tập trung vào công việc hằng ngày",
          "Tự tin, thoải mái, và cảm giác kiểm soát được tình hình",
        ],
        correct: 0,
        explanation:
          "Ba trạng thái này có điểm chung: chúng đều đẩy người ta về phía hành động nhanh. Hoài nghi và tò mò thì ngược lại - chúng làm chậm quyết định, nên không kịch bản nào muốn tạo ra chúng.",
      },
      {
        question: "Vì sao kẻ lừa đảo luôn muốn bạn không hỏi ai khác?",
        options: [
          "Vì một người thứ hai không ở trong trạng thái đó sẽ nhìn ra vấn đề ngay",
          "Vì họ sợ thông tin bị lan truyền rộng làm hỏng các vụ khác của họ",
          "Vì việc có thêm người tham gia làm giao dịch chậm hơn về mặt kỹ thuật",
          "Vì quy định pháp luật yêu cầu mọi giao dịch phải do một người thực hiện",
        ],
        correct: 0,
        explanation:
          "Trạng thái là thứ không lây sang người khác. Người thân của bạn nghe cùng câu chuyện mà không có nỗi sợ đi kèm sẽ thấy ngay những chỗ vô lý mà bạn đang không thấy.",
      },
      {
        question: "Vì sao niềm tin tôi đủ tỉnh táo lại nguy hiểm?",
        options: [
          "Vì nó khiến người ta không chuẩn bị quy tắc nào cho lúc mình không tỉnh táo",
          "Vì kẻ lừa đảo thường chỉ nhắm vào những người tự tin nhất trong xã hội hiện nay",
          "Vì sự tỉnh táo giảm dần theo tuổi tác mà người ta không nhận ra",
          "Vì nó khiến người ta chia sẻ nhiều thông tin cá nhân hơn trên mạng",
        ],
        correct: 0,
        explanation:
          "Đây là điểm quan trọng nhất của bài. Phòng vệ hiệu quả không dựa vào việc bạn luôn tỉnh táo, mà dựa vào những quy tắc vẫn chạy được khi bạn đang hoảng - và người tin mình không bao giờ hoảng thì không dựng những quy tắc đó.",
      },
      {
        question: "Cách phòng vệ hiệu quả nhất có dạng thế nào?",
        options: [
          "Một quy tắc đơn giản áp dụng được ngay cả khi bạn đang hoảng loạn",
          "Một danh sách đầy đủ các thủ đoạn lừa đảo đã được ghi nhận",
          "Một phần mềm chặn tự động mọi cuộc gọi từ số điện thoại lạ",
          "Một thói quen kiểm tra kỹ ngữ pháp và chính tả trong mọi tin nhắn",
        ],
        correct: 0,
        explanation:
          "Quy tắc phải đủ đơn giản để chạy được trong trạng thái xấu nhất. Ví dụ: mọi yêu cầu chuyển tiền gấp đều phải chờ và gọi lại bằng số tôi tự tra - một câu, không cần nhớ thủ đoạn nào.",
      },
    ],
    keyTakeaways: [
      "Kịch bản nhắm vào trạng thái, không nhắm vào kiến thức - nên biết nhiều thủ đoạn là chưa đủ",
      "Ba trạng thái quen thuộc: sợ hãi, gấp gáp, xúc động vì người thân",
      "Kẻ lừa đảo luôn muốn bạn không hỏi ai, vì trạng thái không lây sang người thứ hai",
      "Phòng vệ tốt là quy tắc chạy được khi bạn đang hoảng, không phải trí nhớ về thủ đoạn",
    ],
    practicePrompt: {
      question:
        "Bạn nhận một cuộc gọi khiến tim đập nhanh và người gọi giục quyết định ngay. Việc đầu tiên nên làm là gì?",
      options: [
        "Dừng lại, cúp máy, và gọi lại bằng số bạn tự tra từ nguồn chính thức",
        "Hỏi thật nhiều câu để kiểm tra xem người gọi có nắm rõ thông tin không",
        "Yêu cầu họ gửi văn bản qua tin nhắn để bạn có bằng chứng lưu lại",
        "Làm theo yêu cầu trước rồi kiểm tra lại sau khi đã xử lý xong việc gấp",
      ],
      correct: 0,
      explanation:
        "Hỏi thêm câu là ở lại trong cuộc trò chuyện mà bên kia đang dẫn dắt, và họ luôn có sẵn câu trả lời. Cúp máy phá vỡ trạng thái, và gọi lại bằng số bạn tự tra loại bỏ toàn bộ khả năng mạo danh.",
    },
    summary: {
      keyIdea: "Trò lừa nhắm vào trạng thái chứ không nhắm vào kiến thức - nên ai cũng có thể mắc",
      commonMistake: "Tin rằng hiểu biết là đủ, rồi không chuẩn bị quy tắc nào cho lúc mình không tỉnh táo",
      action: "Chọn một quy tắc đơn giản cho mọi yêu cầu chuyển tiền gấp, và nói cho cả nhà biết.",
    },
    application: {
      title: "Một câu cho cả nhà",
      message:
        "Thống nhất trong gia đình một quy tắc: mọi yêu cầu chuyển tiền gấp - dù đến từ ai - đều phải dừng lại và gọi lại bằng số tự tra. Không có ngoại lệ nào cho người thân, cơ quan hay ngân hàng.",
      secondary:
        "Quy tắc chỉ có tác dụng nếu nó được thống nhất TRƯỚC. Giữa lúc hoảng loạn thì không ai nghĩ ra được quy tắc nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Phần lớn người đọc bài này sẽ nghĩ mình không thuộc nhóm dễ bị lừa. Đó là phản ứng bình thường, và nó cũng chính là lý do bài này cần thiết.",
      },
      { type: "heading", text: "Trò lừa không nhắm vào kiến thức" },
      {
        type: "paragraph",
        text: "Nếu lừa đảo hoạt động bằng cách khai thác sự thiếu hiểu biết, thì người có học vấn cao sẽ miễn nhiễm - và thực tế không như vậy. Cơ chế thật nằm ở chỗ khác: kịch bản tạo ra một trạng thái, và trong trạng thái đó khả năng suy xét cẩn thận bị lấn át bởi nhu cầu phản ứng nhanh. Bạn vẫn biết mọi điều bạn từng đọc; chỉ là kiến thức ấy không được gọi ra kịp.",
      },
      {
        type: "conceptTable",
        title: "Ba trạng thái, cùng một mục đích",
        subtitle: "Chi tiết kịch bản đổi liên tục, ba trạng thái này thì không",
        concepts: [
          {
            vi: "Sợ hãi",
            en: "Fear",
            def: "Bị nói là đang dính líu tới một vụ án, tài khoản sắp bị phong tỏa, có lệnh gì đó liên quan tới bạn. Mục đích là làm bạn muốn thoát khỏi tình huống ngay.",
          },
          {
            vi: "Gấp gáp",
            en: "Urgency",
            def: "Cơ hội sắp hết, chỉ còn vài suất, ưu đãi kết thúc hôm nay. Mục đích là loại bỏ khoảng thời gian bạn cần để kiểm chứng.",
          },
          {
            vi: "Xúc động",
            en: "Emotional pull",
            def: "Người thân gặp tai nạn, con đang cần tiền gấp, bạn bè nhờ giúp. Mục đích là làm việc dừng lại kiểm tra trở nên có vẻ vô tình.",
          },
        ],
      },
      {
        type: "callout",
        label: "Vì sao chúng luôn muốn bạn không nói với ai",
        text: "Câu đừng nói với ai kẻo ảnh hưởng tới điều tra, hay hãy giữ bí mật cơ hội này, xuất hiện trong gần như mọi kịch bản. Lý do rất đơn giản: trạng thái không lây. Người thứ hai nghe cùng câu chuyện mà không mang theo nỗi sợ sẽ thấy ngay những chỗ vô lý. Nói cách khác, yêu cầu giữ bí mật tự nó đã là dấu hiệu mạnh nhất.",
      },
      {
        type: "closing",
        lines: [
          "Không ai miễn nhiễm, nên phòng vệ phải là thứ hoạt động được cả khi bạn đang hoảng.",
          "Bài sau: kịch bản mạo danh cơ quan chức năng - phổ biến nhất và gây thiệt hại lớn nhất.",
        ],
      },
    ],
  },
  {
    id: 351,
    slug: "mao-danh-co-quan-chuc-nang",
    title: "Chặng 16, Bài 2: Mạo danh cơ quan chức năng và ngân hàng",
    subtitle: "Vài quy tắc bất biến loại bỏ toàn bộ nhóm kịch bản này, không cần nhớ thủ đoạn nào",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "📞",
    track: "personal",
    whyItMatters:
      "Đây là nhóm kịch bản gây thiệt hại lớn nhất, vì nó nhắm vào nỗi sợ mạnh nhất và thường dẫn tới việc chuyển đi toàn bộ số tiền có được. Điều may mắn là nhóm này có thể bị loại bỏ hoàn toàn bằng vài quy tắc không thay đổi theo thời gian.",
    openingQuestion: "Cơ quan chức năng có làm việc với người dân qua điện thoại và yêu cầu chuyển tiền không?",
    openingOptions: [
      "Có, trong các vụ việc khẩn cấp cần được xử lý ngay để bảo vệ tài sản của người dân",
      "Không - quy trình làm việc là giấy mời và làm việc trực tiếp, không qua điện thoại",
      "Có, nếu người gọi cung cấp được đầy đủ số hiệu và thông tin của đơn vị",
      "Có, nhưng chỉ với các khoản tiền dưới một hạn mức nhất định theo quy định",
    ],
    correctOption: 1,
    explanation:
      "Đây là quy tắc bất biến và nó loại bỏ toàn bộ nhóm kịch bản này chỉ trong một câu: cơ quan chức năng làm việc bằng giấy mời và làm việc trực tiếp tại trụ sở, không gọi điện yêu cầu chuyển tiền, không có cái gọi là tài khoản tạm giữ để chứng minh trong sạch, và không yêu cầu ai giữ bí mật với gia đình. Việc người gọi đọc đúng tên, số căn cước hay địa chỉ của bạn không chứng minh điều gì - những thông tin đó có thể có được từ nhiều nguồn rò rỉ. Cũng không có hạn mức nào làm quy trình này trở nên hợp lệ.",
    diagram: [
      { label: "Cơ quan chức năng: giấy mời, làm việc trực tiếp", arrow: true },
      { label: "Ngân hàng: không bao giờ hỏi mã xác thực", arrow: true },
      { label: "Không có tài khoản tạm giữ nào để chứng minh trong sạch", arrow: true },
      { label: "Cúp máy và gọi lại bằng số tự tra" },
    ],
    realWorldExample: {
      company: "Vì sao kịch bản này hiệu quả tới vậy",
      description:
        "Nó kết hợp cả ba trạng thái của bài trước cùng lúc: sợ hãi vì bị nói là liên quan tới một vụ án, gấp gáp vì được bảo là phải xử lý trong hôm nay, và yêu cầu giữ bí mật với người thân vì lý do điều tra. Người nghe bị tách khỏi mọi nguồn có thể phản biện, đúng vào lúc họ cần nó nhất - và thường chuyển đi không phải một phần mà toàn bộ số tiền họ có.",
    },
    quiz: [
      {
        question: "Ngân hàng có bao giờ hỏi mã xác thực gửi về điện thoại bạn không?",
        options: [
          "Không - không nhân viên hợp pháp nào cần mã đó trong bất kỳ tình huống nào",
          "Có, khi cần xác minh danh tính chủ tài khoản trong trường hợp khẩn cấp",
          "Có, nhưng chỉ khi bạn là người chủ động gọi tới tổng đài của ngân hàng",
          "Có, khi hệ thống phát hiện một giao dịch bất thường cần xác nhận ngay lập tức",
        ],
        correct: 0,
        explanation:
          "Mã xác thực tồn tại để chứng minh rằng chính bạn đang thực hiện giao dịch. Đưa nó cho người khác là phá bỏ chính cơ chế đó, nên không có tình huống hợp pháp nào cần tới.",
      },
      {
        question: "Người gọi đọc đúng tên và số căn cước của bạn thì sao?",
        options: [
          "Không chứng minh điều gì - những thông tin này có thể có từ nhiều nguồn rò rỉ",
          "Chứng tỏ họ đang truy cập hệ thống chính thức nên đáng tin cậy",
          "Chứng tỏ vụ việc là có thật vì thông tin đó không công khai",
          "Chỉ đáng tin nếu họ đọc được cả số tài khoản",
        ],
        correct: 0,
        explanation:
          "Đây là kỹ thuật tạo lòng tin quan trọng nhất của kịch bản, và nó rất hiệu quả vì trực giác của chúng ta gắn thông tin riêng tư với thẩm quyền. Thực tế dữ liệu cá nhân rò rỉ là chuyện phổ biến.",
      },
      {
        question: "Yêu cầu giữ bí mật với gia đình nên được hiểu thế nào?",
        options: [
          "Là dấu hiệu mạnh nhất của lừa đảo - không quy trình hợp pháp nào yêu cầu điều đó",
          "Là một quy định bảo mật điều tra bình thường mà mọi người dân đều có nghĩa vụ phải tuân thủ",
          "Là cách bảo vệ người thân của bạn khỏi bị liên lụy vào vụ việc",
          "Là yêu cầu chỉ áp dụng trong giai đoạn đầu của quá trình xác minh",
        ],
        correct: 0,
        explanation:
          "Không có quy trình hợp pháp nào cấm bạn nói chuyện với gia đình về việc của chính mình. Yêu cầu này tồn tại vì một lý do duy nhất: người thứ hai sẽ nhìn ra vấn đề.",
      },
      {
        question: "Cách xử lý an toàn nhất khi nhận cuộc gọi đáng ngờ là gì?",
        options: [
          "Cúp máy và gọi lại bằng số tổng đài bạn tự tra từ nguồn chính thức",
          "Yêu cầu người gọi cung cấp số máy bàn để bạn gọi lại xác minh",
          "Ghi âm cuộc gọi rồi tiếp tục trao đổi để thu thập thêm các bằng chứng",
          "Hỏi họ những thông tin mà chỉ cơ quan thật mới có thể biết được",
        ],
        correct: 0,
        explanation:
          "Số máy do họ cung cấp thì cũng do họ kiểm soát - đây là biến thể phổ biến. Chỉ số bạn tự tra từ trang chính thức mới cắt được đường dây, và cúp máy còn phá vỡ trạng thái mà cuộc gọi đang tạo ra.",
      },
      {
        question: "Vì sao không nên tin vào số điện thoại hiển thị trên màn hình?",
        options: [
          "Vì số gọi đến có thể bị giả mạo để hiển thị giống số của cơ quan thật",
          "Vì các cơ quan nhà nước thay đổi số điện thoại liên hệ hằng năm",
          "Vì nhà mạng không hiển thị đầy đủ số của các cuộc gọi quốc tế",
          "Vì số hiển thị chỉ chính xác khi bạn đã lưu số đó vào danh bạ từ trước",
        ],
        correct: 0,
        explanation:
          "Giả mạo số hiển thị là kỹ thuật đã tồn tại từ lâu và không khó thực hiện. Đó chính là lý do quy tắc gọi lại phải dùng số bạn tự tra chứ không phải số vừa gọi đến.",
      },
    ],
    keyTakeaways: [
      "Cơ quan chức năng làm việc bằng giấy mời và trực tiếp, không qua điện thoại yêu cầu chuyển tiền",
      "Không có tài khoản tạm giữ nào để chứng minh trong sạch - khái niệm này không tồn tại",
      "Ngân hàng không bao giờ hỏi mã xác thực, trong mọi tình huống",
      "Yêu cầu giữ bí mật với gia đình là dấu hiệu mạnh nhất, không phải quy định nào cả",
    ],
    practicePrompt: {
      question:
        "Người gọi nói bạn liên quan một vụ án, đọc đúng số căn cước, và yêu cầu chuyển tiền vào tài khoản tạm giữ để chứng minh trong sạch. Bạn làm gì?",
      options: [
        "Cúp máy - không có tài khoản tạm giữ nào tồn tại trong quy trình thật",
        "Yêu cầu họ gửi quyết định bằng văn bản trước khi bạn chuyển tiền",
        "Chuyển một khoản nhỏ trước để xem sự việc có được giải quyết không",
        "Đề nghị tới trụ sở làm việc trực tiếp thay vì trao đổi qua điện thoại",
      ],
      correct: 0,
      explanation:
        "Phương án đề nghị tới trụ sở nghe hợp lý nhưng vẫn giữ bạn trong cuộc trò chuyện, và họ sẽ có lý do để từ chối. Khái niệm tài khoản tạm giữ không tồn tại, nên nghe thấy nó là đã đủ để kết thúc - không cần xác minh gì thêm.",
    },
    summary: {
      keyIdea: "Vài quy tắc bất biến loại bỏ cả nhóm kịch bản này mà không cần nhớ thủ đoạn nào",
      commonMistake: "Coi việc người gọi biết thông tin cá nhân của mình là bằng chứng của thẩm quyền",
      action: "Ghi số tổng đài chính thức của ngân hàng bạn dùng vào danh bạ ngay hôm nay.",
    },
    application: {
      title: "Lưu sẵn số đúng",
      message:
        "Tra số tổng đài chính thức của ngân hàng bạn đang dùng từ trang web chính thức hoặc mặt sau thẻ, rồi lưu vào danh bạ. Khi có chuyện, bạn cần số ấy trong lúc đang hoảng - không phải lúc đó mới đi tìm.",
      secondary:
        "Nói cho người lớn tuổi trong nhà biết hai câu: cơ quan chức năng không gọi điện đòi tiền, và ngân hàng không bao giờ hỏi mã xác thực.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước nói mọi kịch bản đều nhắm vào trạng thái. Bài này lấy nhóm gây thiệt hại lớn nhất và cho thấy vài quy tắc bất biến đủ để vô hiệu hóa toàn bộ nhóm ấy.",
      },
      { type: "heading", text: "Bốn câu không bao giờ đúng" },
      {
        type: "list",
        items: [
          "Cơ quan chức năng gọi điện yêu cầu bạn chuyển tiền - không có quy trình nào như vậy",
          "Có một tài khoản tạm giữ để bạn chứng minh mình trong sạch - khái niệm này không tồn tại",
          "Ngân hàng cần mã xác thực gửi về máy bạn - mã đó tồn tại để chống lại chính việc này",
          "Bạn phải giữ bí mật với gia đình vì lý do điều tra - không quy định nào cấm bạn nói chuyện với người thân",
        ],
      },
      {
        type: "paragraph",
        text: "Bốn câu trên không đổi theo thời gian, không đổi theo địa phương, và không có ngoại lệ. Nghĩa là bạn không cần theo dõi thủ đoạn mới: chỉ cần nghe thấy một trong bốn thứ đó là đủ để kết thúc cuộc trò chuyện, bất kể phần còn lại nghe thuyết phục tới đâu.",
      },
      {
        type: "conceptTable",
        title: "Ba kỹ thuật tạo lòng tin thường gặp",
        subtitle: "Biết chúng là kỹ thuật thì chúng mất tác dụng",
        concepts: [
          {
            vi: "Đọc đúng thông tin cá nhân",
            en: "Known details",
            def: "Tên, số căn cước, địa chỉ, nơi làm việc. Dữ liệu cá nhân rò rỉ là chuyện phổ biến, nên biết chúng không chứng minh thẩm quyền.",
          },
          {
            vi: "Số gọi đến trông chính thức",
            en: "Spoofed caller ID",
            def: "Số hiển thị có thể bị giả mạo. Đây là lý do quy tắc gọi lại phải dùng số bạn tự tra, không dùng số vừa gọi tới.",
          },
          {
            vi: "Chuyển máy cho cấp trên",
            en: "Authority escalation",
            def: "Chuyển bạn cho một người có chức danh cao hơn để tăng sức ép. Toàn bộ đường dây do một bên kiểm soát.",
          },
        ],
      },
      {
        type: "callout",
        label: "Cúp máy không bất lịch sự, nó là biện pháp kỹ thuật",
        text: "Nhiều người ngại cúp máy giữa chừng vì thấy bất lịch sự, và kịch bản khai thác đúng sự ngại ấy. Nhưng cúp máy làm hai việc cùng lúc: cắt đường dây do bên kia kiểm soát, và phá vỡ trạng thái gấp gáp mà cuộc gọi đang duy trì. Nếu việc là thật, gọi lại bằng số chính thức không làm hỏng gì cả.",
      },
      {
        type: "closing",
        lines: [
          "Cả nhóm kịch bản này sụp đổ trước một câu: tôi sẽ gọi lại bằng số tôi tự tra.",
          "Bài sau: khi lời đề nghị đến từ chính người quen của bạn.",
        ],
      },
    ],
  },
  {
    id: 352,
    slug: "nguoi-quen-bi-chiem-tai-khoan",
    title: "Chặng 16, Bài 3: Khi lời nhắn đến từ chính người quen",
    subtitle: "Tài khoản bị chiếm, giọng nói và khuôn mặt giả được - nên xác minh phải đi qua kênh khác",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "👥",
    track: "personal",
    whyItMatters:
      "Quy tắc chỉ tin người quen từng là lời khuyên hợp lý, và nó đã hết hiệu lực. Khi tài khoản có thể bị chiếm và cả giọng nói lẫn hình ảnh đều tạo giả được, danh tính người gửi không còn là bằng chứng - nhưng phản xạ tin tưởng thì vẫn nguyên.",
    openingQuestion: "Bạn nhận tin nhắn từ tài khoản của một người bạn thân xin mượn tiền gấp. Nên làm gì?",
    openingOptions: [
      "Chuyển tiền vì tin nhắn đến từ đúng tài khoản của người bạn đó",
      "Gọi thẳng vào số điện thoại của họ bằng cuộc gọi thường để xác minh",
      "Nhắn lại hỏi vài câu riêng tư mà chỉ hai người mới biết câu trả lời",
      "Chuyển một khoản nhỏ trước để kiểm tra xem có đúng là họ không",
    ],
    correctOption: 1,
    explanation:
      "Điểm mấu chốt là xác minh phải đi qua một KÊNH KHÁC với kênh đang nhận yêu cầu. Nếu tài khoản nhắn tin đã bị chiếm, thì mọi câu hỏi bạn nhắn trong chính ứng dụng đó đều đến tay kẻ chiếm - và họ có thể đọc toàn bộ lịch sử trò chuyện để trả lời những câu riêng tư. Gọi bằng cuộc gọi thường tới số bạn đã lưu từ trước là một kênh độc lập, nên nó cắt được vấn đề. Chuyển khoản nhỏ để thử không kiểm chứng được gì: người chiếm tài khoản sẽ nhận khoản đó rồi tiếp tục xin thêm, và bạn vừa tự chứng minh với chính mình rằng mọi thứ ổn.",
    diagram: [
      { label: "Yêu cầu đến qua một kênh", arrow: true },
      { label: "Kênh đó có thể đã bị chiếm", arrow: true },
      { label: "Xác minh phải qua kênh KHÁC", arrow: true },
      { label: "Gọi số đã lưu từ trước, không nhắn lại" },
    ],
    realWorldExample: {
      company: "Vì sao câu hỏi riêng tư không còn tác dụng",
      description:
        "Một người nhận tin nhắn xin mượn tiền và cẩn thận hỏi lại vài chuyện chỉ hai người biết. Câu trả lời chính xác tới từng chi tiết, nên họ chuyển tiền. Vấn đề là kẻ chiếm tài khoản đang ngồi đọc toàn bộ lịch sử trò chuyện nhiều năm - mọi kỷ niệm riêng tư đều nằm sẵn ở đó. Bài kiểm tra được thực hiện trong chính kênh đã bị kiểm soát thì không kiểm tra được gì.",
    },
    quiz: [
      {
        question: "Vì sao hỏi câu riêng tư trong cùng ứng dụng không đủ để xác minh?",
        options: [
          "Vì kẻ chiếm tài khoản đọc được toàn bộ lịch sử trò chuyện để trả lời",
          "Vì người bạn thật có thể quên mất các chi tiết đã xảy ra từ lâu",
          "Vì ứng dụng nhắn tin không mã hóa nội dung nên ai cũng đọc được",
          "Vì câu hỏi riêng tư làm cho người nhận cảm thấy bị nghi ngờ và khó chịu",
        ],
        correct: 0,
        explanation:
          "Đây là lý do quy tắc phải nói về KÊNH chứ không nói về nội dung câu hỏi. Bất kỳ bài kiểm tra nào thực hiện trong kênh đã bị kiểm soát đều vô hiệu, dù câu hỏi khó tới đâu.",
      },
      {
        question: "Cuộc gọi video thấy đúng mặt người quen có đủ để tin không?",
        options: [
          "Không - hình ảnh và giọng nói đều có thể được tạo giả bằng công nghệ hiện nay",
          "Có, vì video trực tiếp không thể làm giả trong thời gian thực",
          "Có, nếu cuộc gọi kéo dài đủ lâu để quan sát biểu cảm tự nhiên",
          "Không, trừ khi người đó thực hiện đúng một hành động mà bạn yêu cầu ngẫu nhiên",
        ],
        correct: 0,
        explanation:
          "Yêu cầu một hành động ngẫu nhiên từng là mẹo hữu ích và nó ngày càng kém tin cậy. Nguyên tắc an toàn hơn không phụ thuộc vào chất lượng công nghệ: xác minh bằng một kênh khác mà bạn chủ động khởi tạo.",
      },
      {
        question: "Vì sao chuyển một khoản nhỏ để thử là sai?",
        options: [
          "Vì kẻ lừa đảo nhận khoản đó rồi xin tiếp, và bạn đã tự thuyết phục mình rằng mọi thứ ổn",
          "Vì giao dịch nhỏ vẫn bị tính phí chuyển khoản như giao dịch lớn",
          "Vì ngân hàng không cho hủy giao dịch đã chuyển",
          "Vì khoản nhỏ không đủ để kẻ lừa đảo lộ ra ý định thật của họ",
        ],
        correct: 0,
        explanation:
          "Phép thử này tạo ra cảm giác đã kiểm chứng mà không kiểm chứng gì. Tệ hơn, nó làm bạn tin tưởng hơn ở bước tiếp theo - đúng lúc số tiền được yêu cầu tăng lên.",
      },
      {
        question: "Dấu hiệu nào thường xuất hiện khi tài khoản người quen bị chiếm?",
        options: [
          "Yêu cầu chuyển vào một tài khoản mang tên người khác với lý do hợp lý",
          "Tin nhắn có lỗi chính tả và cách xưng hô khác thường ngày",
          "Người đó đột nhiên nhắn tin vào giờ mà bình thường họ không online",
          "Ảnh đại diện của tài khoản đó vừa được thay đổi trong vài ngày gần đây",
        ],
        correct: 0,
        explanation:
          "Ba dấu hiệu bề mặt kia có thể có hoặc không, và chúng dễ khắc phục từ phía kẻ lừa đảo. Tài khoản nhận mang tên người lạ thì khó tránh hơn nhiều, vì tiền phải chảy về một nơi họ kiểm soát được.",
      },
      {
        question: "Quy tắc chung rút ra từ bài này là gì?",
        options: [
          "Xác minh luôn phải đi qua kênh khác với kênh nhận yêu cầu, và do bạn chủ động khởi tạo",
          "Chỉ nên cho người thân trong gia đình mượn tiền, không cho bạn bè",
          "Nên đặt ra mật khẩu chung với bạn bè để dùng khi cần xác minh danh tính",
          "Nên tránh dùng các ứng dụng nhắn tin cho mọi trao đổi có liên quan tới chuyện tiền bạc",
        ],
        correct: 0,
        explanation:
          "Quy tắc này không phụ thuộc vào công nghệ giả mạo tiến bộ tới đâu, nên nó không lỗi thời. Mật khẩu chung thì có ích nhưng nó vẫn nằm trong kênh có thể bị đọc nếu lịch sử trò chuyện bị lộ.",
      },
    ],
    keyTakeaways: [
      "Danh tính người gửi không còn là bằng chứng - tài khoản chiếm được, giọng và mặt giả được",
      "Xác minh phải qua KÊNH KHÁC, do bạn chủ động khởi tạo",
      "Câu hỏi riêng tư trong cùng ứng dụng vô hiệu vì lịch sử trò chuyện nằm sẵn ở đó",
      "Tài khoản nhận mang tên người khác là dấu hiệu khó che nhất",
    ],
    practicePrompt: {
      question:
        "Người thân gọi video, đúng mặt đúng giọng, nói đang gặp chuyện và cần tiền gấp. Bạn làm gì?",
      options: [
        "Nói sẽ gọi lại, rồi tự gọi vào số bạn đã lưu để xác minh trước khi chuyển",
        "Chuyển tiền ngay vì đã thấy mặt và nghe giọng",
        "Hỏi thêm vài chuyện gia đình để chắc chắn đúng là người đó",
        "Yêu cầu họ quay camera xung quanh để xem đang ở đâu",
      ],
      correct: 0,
      explanation:
        "Ba phương án còn lại đều cố xác minh bên trong chính cuộc gọi đang đáng ngờ. Chủ động gọi lại bằng số đã lưu là kênh độc lập duy nhất, và nếu là người thân thật thì việc chậm vài phút không gây hại gì.",
    },
    summary: {
      keyIdea: "Xác minh phải đi qua kênh khác với kênh nhận yêu cầu - đó là quy tắc không lỗi thời",
      commonMistake: "Kiểm tra danh tính bằng câu hỏi riêng tư ngay trong ứng dụng đã bị chiếm",
      action: "Lưu số điện thoại của người thân vào danh bạ, và luôn gọi lại bằng số đã lưu.",
    },
    application: {
      title: "Thống nhất trước với gia đình",
      message:
        "Nói với người thân: mọi yêu cầu chuyển tiền, dù nhắn tin hay gọi video, đều sẽ được gọi lại xác minh bằng số đã lưu. Thống nhất trước thì lúc đó không ai thấy bị nghi ngờ.",
      secondary:
        "Với người lớn tuổi trong nhà, chỉ cần một câu: thấy ai xin tiền gấp thì gọi cho con trước, kể cả khi trông giống người quen.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai bài trước nói về người lạ mạo danh tổ chức. Bài này khó hơn: lời đề nghị đến từ đúng tài khoản, đúng khuôn mặt, đúng giọng nói của người bạn quen thật.",
      },
      { type: "heading", text: "Danh tính không còn là bằng chứng" },
      {
        type: "paragraph",
        text: "Tài khoản mạng xã hội bị chiếm là chuyện xảy ra hằng ngày, và khi đó mọi tin nhắn gửi đi đều mang danh chủ tài khoản thật. Công nghệ tạo giả hình ảnh và giọng nói cũng đã tới mức một cuộc gọi ngắn không còn đủ để phân biệt. Nghĩa là câu hỏi có đúng là người đó không đã thôi trả lời được bằng những gì bạn thấy và nghe.",
      },
      {
        type: "callout",
        label: "Nguyên tắc thay thế: đổi kênh, và bạn là bên khởi tạo",
        text: "Thay vì cố phân biệt thật giả trong kênh đang nhận yêu cầu, hãy bước hẳn sang một kênh khác mà bạn chủ động mở: gọi vào số đã lưu trong danh bạ từ trước, hoặc hỏi trực tiếp một người thân khác. Quy tắc này không phụ thuộc vào việc công nghệ giả mạo tiến bộ tới đâu, nên nó không có hạn sử dụng.",
      },
      {
        type: "list",
        items: [
          "Không xác minh bên trong chính ứng dụng hay cuộc gọi đang đáng ngờ",
          "Gọi lại bằng số đã lưu trong danh bạ, không dùng số hay liên kết vừa nhận được",
          "Cảnh giác đặc biệt khi tài khoản nhận tiền mang tên người khác",
          "Chuyển khoản nhỏ để thử không kiểm chứng gì, nó chỉ làm bạn tin tưởng hơn",
        ],
      },
      {
        type: "closing",
        lines: [
          "Khi mọi thứ nhìn thấy và nghe thấy đều giả được, thứ còn lại đáng tin là kênh do chính bạn mở.",
          "Bài sau: lời mời việc làm và nhiệm vụ online - cửa vào phổ biến nhất với người trẻ.",
        ],
      },
    ],
  },
  {
    id: 353,
    slug: "lua-dao-viec-lam-va-nhiem-vu-online",
    title: "Chặng 16, Bài 4: Việc nhẹ lương cao và nhiệm vụ online",
    subtitle: "Mọi biến thể đều có chung một bước: tới lúc nào đó bạn phải nạp tiền vào",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "💼",
    track: "personal",
    whyItMatters:
      "Đây là cửa vào phổ biến nhất với người trẻ và người đang cần thu nhập, và nó nguy hiểm vì giai đoạn đầu hoàn toàn có thật: bạn làm việc, bạn được trả tiền, bạn rút được. Cấu trúc chỉ lộ ra ở bước sau, khi số tiền đã đủ lớn.",
    openingQuestion: "Đặc điểm chung của mọi biến thể nhiệm vụ online là gì?",
    openingOptions: [
      "Tới một bước nào đó, bạn phải nạp tiền của mình vào để tiếp tục nhận hoa hồng",
      "Công việc đòi hỏi chuyên môn quá cao",
      "Người tuyển dụng luôn yêu cầu gặp mặt trực tiếp trước khi giao việc",
      "Mức thù lao được trả thấp hơn hẳn so với mặt bằng công việc tương tự",
    ],
    correctOption: 0,
    explanation:
      "Chi tiết đổi liên tục - làm nhiệm vụ tăng tương tác, đặt đơn ảo, đánh giá sản phẩm, chốt đơn cho sàn - nhưng cấu trúc thì giống hệt nhau. Vài nhiệm vụ đầu có tiền thật về tài khoản, rút được, và đó là bằng chứng thuyết phục nhất họ có. Rồi tới nhiệm vụ có giá trị lớn hơn, và bạn được yêu cầu nạp tiền của mình vào để ứng trước, với lời hứa hoàn lại cùng hoa hồng. Đó là bước duy nhất mà mọi biến thể đều phải có, vì đó là lúc tiền chảy từ bạn sang họ. Trước bước ấy thì mọi thứ đều thật.",
    diagram: [
      { label: "Vài nhiệm vụ đầu: tiền thật, rút được", arrow: true },
      { label: "Bạn tin, và tăng mức tham gia", arrow: true },
      { label: "Nhiệm vụ lớn: phải NẠP TIỀN vào trước", arrow: true },
      { label: "Đó là bước duy nhất mọi biến thể đều cần" },
    ],
    realWorldExample: {
      company: "Vì sao khoản đầu tiên luôn được trả",
      description:
        "Chi phí trả vài trăm nghìn cho người mới là khoản đầu tư rẻ nhất mà kịch bản này bỏ ra. Nó biến một người hoài nghi thành người tin tưởng, và người tin tưởng thì tự thuyết phục chính mình ở các bước sau - kể cả khi số tiền phải nạp vào bắt đầu lớn bất thường. Khoản trả đầu tiên không phải sơ hở, nó là một phần của thiết kế.",
    },
    quiz: [
      {
        question: "Vì sao giai đoạn đầu luôn trả tiền thật?",
        options: [
          "Vì đó là khoản đầu tư rẻ để biến người hoài nghi thành người tin tưởng",
          "Vì hệ thống cần thời gian để xác minh tài khoản của người tham gia mới",
          "Vì họ muốn thu thập thông tin tài khoản ngân hàng của bạn trước",
          "Vì quy định yêu cầu phải thanh toán cho ba nhiệm vụ đầu tiên",
        ],
        correct: 0,
        explanation:
          "Đây là chỗ khiến kịch bản này khó nhận ra hơn nhiều so với các loại khác: bằng chứng bạn nhận được ở giai đoạn đầu là bằng chứng thật. Vấn đề là nó chứng minh cho một giai đoạn chứ không chứng minh cho toàn bộ mô hình.",
      },
      {
        question: "Yêu cầu nạp tiền để làm nhiệm vụ nên được hiểu thế nào?",
        options: [
          "Là ranh giới - công việc thật không bao giờ đòi người lao động ứng tiền",
          "Là thủ tục bình thường để chứng minh năng lực tài chính của cộng tác viên",
          "Là khoản đặt cọc sẽ được hoàn lại sau khi hoàn thành đủ số nhiệm vụ",
          "Là cách hệ thống lọc ra những người tham gia thật sự nghiêm túc",
        ],
        correct: 0,
        explanation:
          "Đây là ranh giới đơn giản nhất và đủ để loại bỏ toàn bộ nhóm này. Trong quan hệ lao động, tiền chảy từ người thuê sang người làm - chiều ngược lại luôn là dấu hiệu.",
      },
      {
        question: "Khi bạn muốn rút khoản lớn và bị yêu cầu nạp thêm để mở khóa lệnh rút thì sao?",
        options: [
          "Đó là giai đoạn cuối - dừng lại ngay, mọi khoản nạp thêm đều mất",
          "Nên nạp thêm vì số tiền đang bị kẹt lớn hơn nhiều so với khoản phải nạp",
          "Nên thương lượng để họ trừ khoản phí đó vào số tiền đang chờ rút",
          "Nên nạp một nửa để thể hiện thiện chí rồi chờ xem phản ứng của họ",
        ],
        correct: 0,
        explanation:
          "Lập luận số tiền kẹt lớn hơn khoản phải nạp chính là cái bẫy được thiết kế cho bước này, và nó lặp lại nhiều vòng với lý do mới mỗi lần. Số tiền đang hiển thị trên hệ thống không tồn tại.",
      },
      {
        question: "Vì sao lời mời thường đến qua tin nhắn từ người lạ?",
        options: [
          "Vì đây là cách tiếp cận số lượng lớn với chi phí gần như bằng không",
          "Vì các nền tảng tuyển dụng chính thức không cho phép đăng loại công việc này",
          "Vì công việc cần bảo mật nên không thể tuyển qua kênh công khai",
          "Vì người tuyển muốn đánh giá phản ứng của ứng viên qua tin nhắn trước",
        ],
        correct: 0,
        explanation:
          "Mô hình này cần rất nhiều người tham gia và chỉ một phần nhỏ trong số đó đi tới bước nạp tiền. Nhắn hàng loạt là cách rẻ nhất, và đó cũng là lý do lời mời thường mơ hồ về nội dung công việc.",
      },
      {
        question: "Câu hỏi nào loại bỏ nhanh nhất một lời mời việc làm đáng ngờ?",
        options: [
          "Ở bước nào tôi phải bỏ tiền của mình ra, và vì sao",
          "Công ty này đã hoạt động được bao nhiêu năm trên thị trường",
          "Mức thu nhập trung bình của những người đang làm là bao nhiêu",
          "Có bao nhiêu người đang tham gia công việc này hiện nay",
        ],
        correct: 0,
        explanation:
          "Ba câu còn lại đều nhận được câu trả lời đẹp và không kiểm chứng được. Câu hỏi về dòng tiền thì buộc phải lộ ra bước nạp tiền, hoặc buộc họ nói dối một điều dễ kiểm.",
      },
    ],
    keyTakeaways: [
      "Mọi biến thể đều có chung một bước: tới lúc nào đó bạn phải nạp tiền của mình vào",
      "Khoản trả đầu tiên là thật, và nó là một phần của thiết kế chứ không phải sơ hở",
      "Công việc thật không bao giờ đòi người lao động ứng tiền trước",
      "Số dư hiển thị trên hệ thống của họ không phải tiền của bạn",
    ],
    practicePrompt: {
      question:
        "Bạn đã làm ba nhiệm vụ nhỏ và nhận đủ tiền. Nhiệm vụ thứ tư yêu cầu nạp 5 triệu để nhận hoa hồng cao hơn. Nên làm gì?",
      options: [
        "Dừng hoàn toàn - đây chính là bước mà toàn bộ mô hình hướng tới",
        "Nạp vì ba lần trước đều nhận được tiền đầy đủ và đúng hạn",
        "Nạp một khoản nhỏ hơn để thử xem hệ thống có trả đúng hạn không",
        "Yêu cầu họ trừ khoản nạp vào phần hoa hồng sẽ nhận được sau",
      ],
      correct: 0,
      explanation:
        "Ba lần trả trước không phải bằng chứng về lần thứ tư - chúng là chi phí để tạo ra niềm tin cho đúng lúc này. Đây là điểm mà toàn bộ chi phí họ đã bỏ ra bắt đầu được thu hồi.",
    },
    summary: {
      keyIdea: "Nhận diện bằng cấu trúc dòng tiền: ở bước nào tiền chảy từ bạn sang họ",
      commonMistake: "Coi các khoản đã nhận được ở giai đoạn đầu là bằng chứng cho toàn bộ mô hình",
      action: "Với mọi lời mời việc làm, hỏi ngay ở bước nào tôi phải bỏ tiền ra.",
    },
    application: {
      title: "Một câu hỏi cho mọi lời mời",
      message:
        "Ở bước nào tôi phải bỏ tiền của mình ra. Nếu câu trả lời là có một bước như vậy - dù gọi là đặt cọc, ứng vốn, phí kích hoạt hay nâng cấp tài khoản - thì đó là mô hình cần tránh.",
      secondary:
        "Nói câu này cho người trẻ trong nhà. Đây là nhóm nhận được nhiều lời mời nhất và cũng là nhóm cần thu nhập nhất.",
    },
    sections: [
      {
        type: "lead",
        text: "Nhóm kịch bản này khó nhận ra hơn hai bài trước, vì phần đầu của nó hoàn toàn thật: bạn làm việc, tiền về tài khoản, rút được. Cấu trúc chỉ lộ ra ở một bước cụ thể.",
      },
      { type: "heading", text: "Ba giai đoạn, luôn theo thứ tự này" },
      {
        type: "conceptTable",
        title: "Cấu trúc chung của mọi biến thể",
        subtitle: "Tên gọi nhiệm vụ đổi liên tục, ba giai đoạn thì không",
        concepts: [
          {
            vi: "Giai đoạn thật",
            en: "Real payouts",
            def: "Vài nhiệm vụ nhỏ, tiền thật về tài khoản, rút được. Đây là chi phí họ bỏ ra để tạo niềm tin, không phải sơ hở.",
          },
          {
            vi: "Giai đoạn nạp vào",
            en: "The deposit",
            def: "Nhiệm vụ giá trị lớn hơn đòi bạn ứng tiền trước, hứa hoàn lại kèm hoa hồng. Đây là bước duy nhất mọi biến thể đều phải có.",
          },
          {
            vi: "Giai đoạn giữ tiền",
            en: "The lock",
            def: "Muốn rút thì phải nạp thêm - phí thuế, phí nâng cấp, phí mở khóa. Lý do mới mỗi lần, và số dư hiển thị không tồn tại.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Điều làm giai đoạn ba hiệu quả là một lập luận nghe rất hợp lý: số tiền đang kẹt lớn hơn nhiều so với khoản phải nạp thêm, nên nạp là quyết định đúng. Lập luận ấy được thiết kế sẵn, và nó lặp lại nhiều vòng cho tới khi người tham gia hết khả năng nạp. Số dư trên màn hình chỉ là một con số trong hệ thống do họ kiểm soát.",
      },
      {
        type: "callout",
        label: "Trong quan hệ lao động, tiền chảy một chiều",
        text: "Từ người thuê sang người làm. Mọi yêu cầu đi ngược chiều - đặt cọc, ứng vốn, phí kích hoạt tài khoản, mua gói nâng cấp để nhận việc tốt hơn - đều là dấu hiệu, bất kể lý do nghe hợp lý tới đâu. Đây là ranh giới đơn giản tới mức không cần nhớ thủ đoạn nào.",
      },
      {
        type: "closing",
        lines: [
          "Tiền đã nhận được ở giai đoạn đầu là thật; nó chỉ không chứng minh gì cho giai đoạn sau.",
          "Bài sau: cùng cấu trúc ấy, nhưng khoác áo một cơ hội đầu tư.",
        ],
      },
    ],
  },
  {
    id: 354,
    slug: "lua-dao-dau-tu-san-gia",
    title: "Chặng 16, Bài 5: Sàn giả, app giả và nhóm kín",
    subtitle: "Bạn thấy tài khoản tăng đều mỗi ngày, nhưng con số đó chỉ tồn tại trên màn hình của họ",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "📈",
    track: "personal",
    whyItMatters:
      "Nhóm này lấy đi số tiền lớn nhất trên mỗi nạn nhân, vì nó nhắm vào người có tiền tiết kiệm và vì nó kéo dài nhiều tháng. Người tham gia thường mất toàn bộ khoản tích lũy của nhiều năm, và họ nhận ra vào đúng lúc muốn rút.",
    openingQuestion: "Trên một sàn đầu tư giả, con số lợi nhuận hiển thị trên tài khoản của bạn là gì?",
    openingOptions: [
      "Kết quả giao dịch thật được cập nhật theo diễn biến của thị trường",
      "Một con số do chính họ nhập vào hệ thống, không tương ứng với tài sản nào",
      "Giá trị ước tính dựa trên hiệu suất trung bình của những nhà đầu tư khác trên hệ thống",
      "Phần lợi nhuận đã được ghi nhận nhưng chưa hoàn tất thủ tục thanh toán",
    ],
    correctOption: 1,
    explanation:
      "Giao diện là phần rẻ nhất để làm, và nó có thể hiển thị bất kỳ con số nào. Không có giao dịch nào diễn ra, không có tài sản nào được mua - tiền bạn nạp vào đi thẳng vào tài khoản của họ, và cái bạn nhận lại là quyền nhìn một con số tăng đều mỗi ngày. Đó là lý do kịch bản này cho phép rút những khoản nhỏ ở giai đoạn đầu mà không mất gì: khoản rút ấy nhỏ hơn nhiều so với khoản bạn sẽ nạp tiếp. Chỉ khi bạn muốn rút một khoản lớn thì các loại phí mới xuất hiện, và đó là lúc mô hình lộ ra.",
    diagram: [
      { label: "Tiền nạp vào đi thẳng vào tài khoản của họ", arrow: true },
      { label: "Giao diện hiển thị lợi nhuận tăng đều", arrow: true },
      { label: "Rút khoản nhỏ được - đó là chi phí tạo niềm tin", arrow: true },
      { label: "Rút khoản lớn thì phí xuất hiện" },
    ],
    realWorldExample: {
      company: "Nhóm kín và những người cùng tham gia",
      description:
        "Một người được mời vào nhóm kín có hàng trăm thành viên đang khoe kết quả mỗi ngày, có người hướng dẫn tận tình, có cả những thành viên đặt câu hỏi hoài nghi rồi được giải đáp thuyết phục. Phần lớn những tài khoản ấy thuộc về cùng một nhóm tổ chức. Bầu không khí đông đúc và có vẻ minh bạch là sản phẩm được dựng lên, không phải bằng chứng.",
    },
    quiz: [
      {
        question: "Vì sao giai đoạn đầu cho rút tiền dễ dàng?",
        options: [
          "Vì khoản rút nhỏ rẻ hơn nhiều so với số tiền bạn sẽ nạp thêm sau đó",
          "Vì hệ thống chưa kịp phát hiện tài khoản mới nên chưa áp dụng hạn chế",
          "Vì họ cần bạn xác minh tài khoản ngân hàng trước khi khóa lại",
          "Vì quy định yêu cầu cho phép rút trong ba mươi ngày đầu tiên",
        ],
        correct: 0,
        explanation:
          "Đây là cùng cơ chế với bài trước và với mô hình lấy tiền người sau trả người trước ở Chặng 15. Khoản chi ban đầu là chi phí tạo niềm tin, và nó luôn nhỏ hơn nhiều so với khoản thu về.",
      },
      {
        question: "Nhóm kín đông thành viên khoe lãi mỗi ngày nói lên điều gì?",
        options: [
          "Rất ít - phần lớn tài khoản đó có thể thuộc về cùng một nhóm tổ chức",
          "Chứng tỏ mô hình đang hoạt động tốt vì nhiều người cùng có lãi",
          "Chứng tỏ nền tảng có quy mô lớn nên rủi ro sụp đổ thấp hơn",
          "Chứng tỏ thông tin ở đây minh bạch",
        ],
        correct: 0,
        explanation:
          "Bao gồm cả những thành viên tỏ ra hoài nghi rồi được thuyết phục - đó là vai diễn được dựng sẵn để trả lời trước những câu hỏi mà bạn sắp nghĩ tới.",
      },
      {
        question: "Khi muốn rút khoản lớn và bị yêu cầu nộp thuế trước thì sao?",
        options: [
          "Đó là dấu hiệu kết thúc - nơi hợp pháp khấu trừ thuế chứ không đòi nộp trước",
          "Nên nộp vì nghĩa vụ thuế vốn là quy định của pháp luật mà ai cũng bắt buộc phải thực hiện",
          "Nên thương lượng để họ khấu trừ thuế vào chính khoản tiền đang rút",
          "Nên nộp một phần và yêu cầu rút một phần tương ứng để kiểm chứng",
        ],
        correct: 0,
        explanation:
          "Chặng 14 đã nói: thuế bán chứng khoán được khấu trừ ngay tại giao dịch, người đầu tư không phải nộp trước. Yêu cầu nộp tiền để được nhận tiền là cấu trúc không tồn tại ở bất kỳ tổ chức hợp pháp nào.",
      },
      {
        question: "Cách kiểm tra một nền tảng đầu tư trước khi nạp tiền là gì?",
        options: [
          "Kiểm tra xem tổ chức đó có được cấp phép hoạt động tại Việt Nam không",
          "Xem giao diện của ứng dụng có chuyên nghiệp và đầy đủ tính năng không",
          "Đọc đánh giá của người dùng trên chính trang web của nền tảng đó",
          "Thử nạp một khoản nhỏ rồi rút ra để kiểm tra hệ thống hoạt động",
        ],
        correct: 0,
        explanation:
          "Giao diện đẹp là phần rẻ nhất để làm, đánh giá trên trang của chính họ thì do họ kiểm soát, và phép thử nạp rút nhỏ đúng là thứ mô hình này được thiết kế để vượt qua.",
      },
      {
        question: "Vì sao người hướng dẫn tận tình lại là dấu hiệu đáng ngờ?",
        options: [
          "Vì không ai bỏ nhiều giờ hướng dẫn miễn phí trừ khi họ thu lợi từ việc bạn nạp tiền",
          "Vì người hướng dẫn thật luôn thu phí",
          "Vì họ thường không có chứng chỉ hành nghề tư vấn tài chính",
          "Vì hướng dẫn qua tin nhắn không đủ chi tiết để đầu tư an toàn",
        ],
        correct: 0,
        explanation:
          "Hãy hỏi người này được trả công thế nào. Ở một tổ chức hợp pháp, câu trả lời rõ ràng: phí quản lý, hoa hồng công khai. Ở đây câu trả lời là hoa hồng trên số tiền bạn nạp, và điều đó không được nói ra.",
      },
    ],
    keyTakeaways: [
      "Con số lợi nhuận trên giao diện là do họ nhập vào, không tương ứng với tài sản nào",
      "Cho rút khoản nhỏ ở giai đoạn đầu là chi phí tạo niềm tin, không phải bằng chứng",
      "Yêu cầu nộp tiền để được nhận tiền là cấu trúc không tồn tại ở tổ chức hợp pháp",
      "Nhóm đông thành viên và người hướng dẫn tận tình là sản phẩm được dựng lên",
    ],
    practicePrompt: {
      question:
        "Tài khoản của bạn trên một nền tảng đang hiển thị lãi 200 triệu và bạn muốn rút. Họ yêu cầu nạp 30 triệu phí. Nên làm gì?",
      options: [
        "Dừng lại và chấp nhận mất khoản đã nạp - 200 triệu đó không tồn tại",
        "Nạp 30 triệu vì khoản sắp nhận được lớn hơn nhiều so với chi phí bỏ ra",
        "Vay mượn để nạp cho đủ rồi rút toàn bộ ra ngay sau khi nhận được",
        "Thương lượng giảm phí xuống mức thấp hơn rồi mới quyết định nạp",
      ],
      correct: 0,
      explanation:
        "Đây là quyết định khó nhất trong cả bài, vì dừng lại nghĩa là chấp nhận mất khoản đã nạp. Nhưng con số 200 triệu chỉ là một dòng trong cơ sở dữ liệu của họ, và mọi khoản nạp thêm chỉ làm tăng số tiền thật đã mất.",
    },
    summary: {
      keyIdea: "Con số trên màn hình là sản phẩm rẻ nhất trong toàn bộ mô hình này",
      commonMistake: "Coi việc rút được khoản nhỏ ở giai đoạn đầu là bằng chứng nền tảng đáng tin",
      action: "Trước khi nạp tiền vào bất kỳ nền tảng nào, kiểm tra giấy phép hoạt động của tổ chức đó.",
    },
    application: {
      title: "Kiểm tra giấy phép trước, mọi thứ khác sau",
      message:
        "Với mọi nền tảng đầu tư, câu hỏi đầu tiên là tổ chức này có được cấp phép hoạt động tại Việt Nam không, và kiểm tra ở nguồn chính thức chứ không phải trên trang của chính họ.",
      secondary:
        "Nếu không tìm thấy, mọi thông tin khác - giao diện, đánh giá, kết quả của người khác - đều không cần xem tới.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước là cùng một cấu trúc khoác áo việc làm. Bài này khoác áo đầu tư, nhắm vào người có tiền tiết kiệm, và vì thế lấy đi số tiền lớn nhất trên mỗi người.",
      },
      { type: "heading", text: "Thứ rẻ nhất là con số trên màn hình" },
      {
        type: "paragraph",
        text: "Dựng một ứng dụng hiển thị biểu đồ đẹp và số dư tăng đều mỗi ngày là phần rẻ nhất trong toàn bộ mô hình. Không có giao dịch nào diễn ra phía sau, không có tài sản nào được mua. Tiền bạn nạp đi thẳng vào tài khoản của họ, và thứ bạn nhận về là quyền được nhìn một con số. Điều này giải thích mọi hành vi còn lại của kịch bản, kể cả việc cho rút dễ dàng lúc đầu.",
      },
      {
        type: "conceptTable",
        title: "Bốn thứ trông như bằng chứng nhưng không phải",
        subtitle: "Mỗi thứ đều rẻ để dựng và không kiểm chứng được từ bên ngoài",
        concepts: [
          {
            vi: "Giao diện chuyên nghiệp",
            en: "Polished app",
            def: "Phần rẻ nhất. Biểu đồ, số dư, lịch sử giao dịch đều là dữ liệu do họ nhập vào hệ thống của chính họ.",
          },
          {
            vi: "Rút được lúc đầu",
            en: "Small withdrawals",
            def: "Chi phí tạo niềm tin, luôn nhỏ hơn nhiều so với khoản sẽ nạp thêm. Đây là phép thử mà mô hình được thiết kế để vượt qua.",
          },
          {
            vi: "Nhóm đông người",
            en: "Active group",
            def: "Bao gồm cả những thành viên đóng vai hoài nghi rồi được thuyết phục - vai diễn dựng sẵn cho câu hỏi bạn sắp nghĩ tới.",
          },
          {
            vi: "Người hướng dẫn tận tình",
            en: "The mentor",
            def: "Hỏi họ được trả công thế nào. Tổ chức hợp pháp trả lời rõ; ở đây câu trả lời là hoa hồng trên tiền bạn nạp.",
          },
        ],
      },
      {
        type: "callout",
        label: "Nộp tiền để được nhận tiền là cấu trúc không tồn tại",
        text: "Phí thuế phải nộp trước khi rút, phí nâng cấp tài khoản để mở hạn mức, phí xác minh quốc tế - lý do đổi liên tục nhưng cấu trúc thì một. Không tổ chức tài chính hợp pháp nào bắt bạn chuyển tiền vào để được nhận tiền ra; mọi khoản phí đều được khấu trừ từ chính số tiền đó.",
      },
      {
        type: "closing",
        lines: [
          "Khi đã tới bước phải nạp thêm để rút, quyết định đúng là dừng lại - dù nó đau tới đâu.",
          "Bài sau: khóa cửa trước khi có chuyện - bảo mật tài khoản ở mức tối thiểu.",
        ],
      },
    ],
  },
  {
    id: 355,
    slug: "bao-mat-tai-khoan-toi-thieu",
    title: "Chặng 16, Bài 6: Bảo mật tài khoản ở mức tối thiểu",
    subtitle: "Bốn việc làm một lần chặn được phần lớn cách người ta mất tiền qua tài khoản",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🔒",
    track: "personal",
    whyItMatters:
      "Bốn bài trước nói về việc bạn bị thuyết phục tự chuyển tiền đi. Bài này nói về cách còn lại: người khác truy cập được tài khoản của bạn mà không cần thuyết phục ai. Cách này chặn được bằng vài thao tác làm một lần rồi thôi.",
    openingQuestion: "Lớp bảo vệ nào quan trọng nhất cho tài khoản ngân hàng và ví điện tử?",
    openingOptions: [
      "Mã xác thực hai lớp, và tuyệt đối không đọc mã đó cho bất kỳ ai",
      "Đổi mật khẩu định kỳ mỗi tháng một lần theo khuyến cáo chung",
      "Đặt mật khẩu thật dài và phức tạp với nhiều ký tự đặc biệt",
      "Chỉ đăng nhập tài khoản khi đang dùng mạng di động thay vì wifi",
    ],
    correctOption: 0,
    explanation:
      "Xác thực hai lớp là biện pháp có hiệu quả cao nhất trên mỗi đơn vị công sức: kể cả khi mật khẩu của bạn bị lộ, kẻ tấn công vẫn thiếu lớp thứ hai. Nhưng nó chỉ hoạt động nếu bạn không tự tay đưa mã cho người khác - và đó chính là điều mọi kịch bản lừa đảo cố đạt được, nên hai vế của câu trả lời không tách rời nhau. Đổi mật khẩu định kỳ là khuyến cáo cũ và hiện được cho là ít tác dụng, vì nó khiến người ta chọn mật khẩu dễ đoán hơn theo quy luật. Mật khẩu dài có ích nhưng vô nghĩa nếu dùng lại ở nhiều nơi.",
    diagram: [
      { label: "Mật khẩu riêng cho tài khoản tiền", arrow: true },
      { label: "Bật xác thực hai lớp", arrow: true },
      { label: "Không bao giờ đọc mã cho ai", arrow: true },
      { label: "Khóa số điện thoại tại nhà mạng" },
    ],
    realWorldExample: {
      company: "Một mật khẩu dùng lại ở năm nơi",
      description:
        "Một dịch vụ nhỏ mà bạn đăng ký từ lâu bị lộ dữ liệu người dùng. Bản thân dịch vụ đó không có gì quan trọng - nhưng mật khẩu bạn dùng ở đó cũng chính là mật khẩu email, và email là nơi nhận mọi liên kết đặt lại mật khẩu của các tài khoản còn lại. Một mắt xích yếu ở nơi không quan trọng mở ra toàn bộ phần còn lại.",
    },
    quiz: [
      {
        question: "Vì sao dùng lại mật khẩu ở nhiều nơi là rủi ro lớn?",
        options: [
          "Vì một dịch vụ bị lộ dữ liệu là đủ để mở luôn các tài khoản còn lại",
          "Vì hệ thống sẽ tự động khóa tài khoản khi phát hiện mật khẩu trùng nhau",
          "Vì mật khẩu dùng nhiều nơi sẽ hết hạn nhanh hơn mật khẩu dùng riêng",
          "Vì ngân hàng không chịu trách nhiệm nếu khách dùng lại mật khẩu",
        ],
        correct: 0,
        explanation:
          "Điểm yếu không nằm ở nơi quan trọng nhất mà nằm ở nơi yếu nhất bạn từng đăng ký. Đó là lý do tài khoản email và tài khoản tiền cần mật khẩu riêng, không dùng chung với bất cứ đâu.",
      },
      {
        question: "Vì sao tài khoản email cần được bảo vệ ngang tài khoản ngân hàng?",
        options: [
          "Vì email là nơi nhận liên kết đặt lại mật khẩu của gần như mọi tài khoản khác",
          "Vì email chứa nhiều thông tin cá nhân có thể bị đem đi bán lại",
          "Vì các ngân hàng gửi sao kê hằng tháng qua địa chỉ email của khách",
          "Vì địa chỉ email được dùng làm tên đăng nhập cho phần lớn những dịch vụ trực tuyến hiện nay",
        ],
        correct: 0,
        explanation:
          "Ai kiểm soát email thì có thể lần lượt đặt lại mật khẩu của mọi dịch vụ khác. Nó là chìa khóa vạn năng, nên nó xứng đáng có lớp bảo vệ mạnh nhất của bạn.",
      },
      {
        question: "Khóa đổi sim tại nhà mạng có tác dụng gì?",
        options: [
          "Ngăn kẻ khác chiếm số điện thoại của bạn để nhận mã xác thực thay bạn",
          "Ngăn nhà mạng cắt dịch vụ khi tài khoản của bạn hết tiền",
          "Ngăn các cuộc gọi lừa đảo từ số điện thoại lạ gọi tới máy bạn",
          "Ngăn số điện thoại bị dùng đăng ký dịch vụ",
        ],
        correct: 0,
        explanation:
          "Nếu mã xác thực gửi về số điện thoại và ai đó chiếm được số đó, họ nhận được mã thay bạn - lớp bảo vệ thứ hai biến mất. Đây là lỗ hổng ít người biết và bịt được bằng một lần tới nhà mạng.",
      },
      {
        question: "Nên xử lý thế nào với các ứng dụng đòi quyền truy cập bất thường?",
        options: [
          "Từ chối và gỡ bỏ - ứng dụng chỉ nên có quyền cần cho chức năng của nó",
          "Cấp quyền vì nếu không thì ứng dụng sẽ không hoạt động đầy đủ",
          "Cấp quyền tạm thời rồi tắt lại sau khi dùng xong tính năng đó",
          "Chỉ cần cẩn thận với những ứng dụng được tải về từ ngoài các cửa hàng chính thức",
        ],
        correct: 0,
        explanation:
          "Một ứng dụng đèn pin không cần đọc tin nhắn của bạn. Quyền đọc tin nhắn là quyền đọc mã xác thực, nên đây là con đường vòng qua toàn bộ lớp bảo mật thứ hai.",
      },
      {
        question: "Việc nào KHÔNG còn được coi là biện pháp bảo mật hiệu quả?",
        options: [
          "Đổi mật khẩu định kỳ hằng tháng theo lịch cố định",
          "Bật xác thực hai lớp cho tài khoản email và tài khoản ngân hàng",
          "Dùng mật khẩu riêng biệt cho từng dịch vụ quan trọng",
          "Kiểm tra kỹ địa chỉ trang web trước khi nhập thông tin đăng nhập",
        ],
        correct: 0,
        explanation:
          "Khuyến cáo này đã cũ và bị chính các tổ chức bảo mật rút lại: buộc đổi thường xuyên khiến người dùng chọn mật khẩu theo quy luật dễ đoán. Đổi mật khẩu khi có dấu hiệu bị lộ thì vẫn cần thiết.",
      },
    ],
    keyTakeaways: [
      "Xác thực hai lớp là biện pháp hiệu quả nhất - nhưng chỉ khi bạn không đọc mã cho ai",
      "Email cần lớp bảo vệ mạnh nhất vì nó đặt lại được mật khẩu mọi tài khoản khác",
      "Mật khẩu riêng cho tài khoản tiền và email, không dùng lại ở bất cứ đâu",
      "Khóa đổi sim tại nhà mạng bịt được lỗ hổng mà rất ít người biết",
    ],
    practicePrompt: {
      question:
        "Bạn dùng cùng một mật khẩu cho email, ngân hàng và vài dịch vụ nhỏ. Nên bắt đầu sửa từ đâu?",
      options: [
        "Đổi mật khẩu email trước và bật xác thực hai lớp cho nó, rồi tới tài khoản tiền",
        "Đổi mật khẩu ngân hàng trước tiên vì đó mới là nơi có tiền và cần được bảo vệ nhất",
        "Đổi toàn bộ mật khẩu của mọi dịch vụ cùng lúc trong một buổi",
        "Đổi các dịch vụ nhỏ trước vì chúng là nơi dễ bị lộ dữ liệu nhất",
      ],
      correct: 0,
      explanation:
        "Email đứng trước vì nó là chìa khóa của mọi thứ còn lại - đổi mật khẩu ngân hàng trước mà email vẫn bị kiểm soát thì kẻ tấn công chỉ cần bấm quên mật khẩu. Thứ tự quan trọng hơn tốc độ ở đây.",
    },
    summary: {
      keyIdea: "Bốn việc làm một lần chặn được phần lớn cách người khác vào được tài khoản của bạn",
      commonMistake: "Bảo vệ kỹ tài khoản ngân hàng nhưng để email dùng chung mật khẩu với dịch vụ khác",
      action: "Đổi mật khẩu email sang một mật khẩu riêng và bật xác thực hai lớp cho nó ngay hôm nay.",
    },
    application: {
      title: "Bốn việc, một buổi tối",
      message:
        "Mật khẩu riêng cho email và cho tài khoản tiền. Bật xác thực hai lớp cho cả hai. Tới nhà mạng đăng ký khóa đổi sim. Rà lại quyền của các ứng dụng đang cài, đặc biệt quyền đọc tin nhắn.",
      secondary:
        "Bốn việc này làm một lần rồi thôi, và chúng chặn được phần lớn con đường mà người khác dùng để vào tài khoản của bạn.",
    },
    sections: [
      {
        type: "lead",
        text: "Bốn bài trước nói về việc bạn bị thuyết phục tự chuyển tiền. Bài này nói về con đường còn lại: có người vào được tài khoản của bạn mà không cần thuyết phục ai cả.",
      },
      { type: "heading", text: "Email là chìa khóa của mọi thứ" },
      {
        type: "paragraph",
        text: "Phần lớn người bảo vệ tài khoản ngân hàng cẩn thận hơn hẳn tài khoản email, trong khi email mới là nơi có quyền lực lớn nhất: ai kiểm soát nó thì bấm quên mật khẩu ở mọi dịch vụ khác và nhận liên kết đặt lại. Nghĩa là lớp bảo vệ của bạn chỉ mạnh bằng lớp bảo vệ của email, bất kể bạn đặt mật khẩu ngân hàng phức tạp tới đâu.",
      },
      {
        type: "conceptTable",
        title: "Bốn việc, xếp theo hiệu quả trên công sức",
        subtitle: "Tất cả đều làm một lần rồi thôi",
        concepts: [
          {
            vi: "Xác thực hai lớp",
            en: "Two-factor",
            def: "Hiệu quả cao nhất. Mật khẩu lộ vẫn chưa đủ để vào. Điều kiện duy nhất: không bao giờ đọc mã cho người khác.",
          },
          {
            vi: "Mật khẩu riêng",
            en: "Unique passwords",
            def: "Ít nhất cho email và các tài khoản có tiền. Một dịch vụ nhỏ bị lộ dữ liệu là đủ mở luôn phần còn lại nếu dùng chung.",
          },
          {
            vi: "Khóa đổi sim",
            en: "SIM lock",
            def: "Ngăn kẻ khác chiếm số điện thoại để nhận mã thay bạn. Ít người biết, và bịt được bằng một lần tới nhà mạng.",
          },
          {
            vi: "Rà quyền ứng dụng",
            en: "App permissions",
            def: "Quyền đọc tin nhắn là quyền đọc mã xác thực. Ứng dụng nào không cần chức năng đó thì không nên có quyền đó.",
          },
        ],
      },
      {
        type: "callout",
        label: "Xác thực hai lớp chỉ mạnh bằng việc bạn không đưa mã đi",
        text: "Đây là lý do bài này nằm sau bốn bài về kịch bản lừa đảo chứ không nằm trước. Mọi biện pháp kỹ thuật đều có thể bị vô hiệu hóa bằng cách thuyết phục chính chủ tài khoản tự tay mở cửa - và đó chính xác là việc mà bốn bài trước mô tả.",
      },
      {
        type: "closing",
        lines: [
          "Khóa cửa là việc của một buổi tối; nhớ không mở cửa cho người lạ là việc của mọi ngày.",
          "Bài sau: nếu chuyện đã xảy ra rồi thì giờ đầu tiên làm gì.",
        ],
      },
    ],
  },
  {
    id: 356,
    slug: "neu-da-bi-lua-lam-gi",
    title: "Chặng 16, Bài 7: Nếu đã bị lừa - giờ đầu tiên làm gì",
    subtitle: "Tốc độ quyết định khả năng thu hồi, và cảm giác xấu hổ là thứ làm chậm nhất",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🆘",
    track: "personal",
    whyItMatters:
      "Không ai muốn đọc bài này trước khi cần tới nó, và đó chính là vấn đề: khi cần thì người ta đang hoảng loạn và xấu hổ, hai trạng thái làm chậm mọi hành động. Biết trước thứ tự việc cần làm rút ngắn được khoảng thời gian duy nhất có thể thu hồi.",
    openingQuestion: "Vừa nhận ra mình bị lừa và đã chuyển tiền. Việc đầu tiên nên làm là gì?",
    openingOptions: [
      "Gọi ngay ngân hàng của bạn để báo và yêu cầu hỗ trợ phong tỏa khoản tiền",
      "Liên hệ lại kẻ lừa đảo để thương lượng lấy lại một phần số tiền",
      "Đăng bài cảnh báo lên mạng xã hội để nhiều người khác cùng biết",
      "Chờ vài ngày xem tiền có tự về không",
    ],
    correctOption: 0,
    explanation:
      "Khả năng thu hồi giảm rất nhanh theo thời gian, vì tiền thường được chuyển qua nhiều tài khoản trung gian ngay sau khi nhận. Gọi ngân hàng ngay là việc duy nhất có thể can thiệp vào dòng tiền, và càng sớm thì khả năng khoản tiền còn nằm ở tài khoản nhận đầu tiên càng cao. Liên hệ lại kẻ lừa đảo thì gần như luôn dẫn tới việc mất thêm - đây chính là lúc kịch bản hỗ trợ thu hồi tiền xuất hiện. Chờ đợi là lựa chọn tệ nhất, và nó thường được chọn vì hy vọng rằng mình đã hiểu nhầm tình huống.",
    diagram: [
      { label: "Gọi ngân hàng ngay, càng sớm càng tốt", arrow: true },
      { label: "Giữ nguyên mọi bằng chứng, không xóa gì", arrow: true },
      { label: "Trình báo cơ quan chức năng", arrow: true },
      { label: "Đổi mật khẩu nếu có khả năng bị lộ thông tin" },
    ],
    realWorldExample: {
      company: "Kịch bản thứ hai nhắm vào chính nạn nhân",
      description:
        "Sau khi ai đó bị lừa và chia sẻ chuyện của mình, thường xuất hiện những lời đề nghị giúp thu hồi tiền với một khoản phí ứng trước. Đây là một mô hình riêng nhắm vào người vừa mất tiền - nhóm dễ tổn thương nhất vì họ đang rất muốn tin rằng còn cách cứu vãn. Không có dịch vụ tư nhân nào thu hồi được tiền đã chuyển đi, và mọi lời hứa như vậy đều là vòng thứ hai.",
    },
    quiz: [
      {
        question: "Vì sao tốc độ lại quyết định khả năng thu hồi?",
        options: [
          "Vì tiền thường được chuyển tiếp qua nhiều tài khoản trung gian ngay sau khi nhận",
          "Vì ngân hàng chỉ tiếp nhận các khiếu nại trong vòng hai mươi bốn giờ đầu tiên kể từ giao dịch",
          "Vì hệ thống tự động hoàn tiền nếu được báo trong cùng ngày giao dịch",
          "Vì sau một ngày thì giao dịch được ghi nhận vĩnh viễn không sửa được",
        ],
        correct: 0,
        explanation:
          "Cơ hội duy nhất là khoản tiền vẫn còn nằm ở tài khoản nhận đầu tiên. Việc chuyển tiếp thường diễn ra rất nhanh, nên khoảng thời gian hữu ích được tính bằng giờ chứ không bằng ngày.",
      },
      {
        question: "Vì sao không nên liên hệ lại kẻ lừa đảo?",
        options: [
          "Vì đó là lúc kịch bản hỗ trợ thu hồi tiền xuất hiện và bạn mất thêm lần nữa",
          "Vì liên hệ lại có thể khiến bạn bị liên lụy",
          "Vì họ sẽ chặn liên lạc ngay khi biết bạn đã phát hiện ra sự việc",
          "Vì mọi cuộc trao đổi sau đó không còn giá trị làm bằng chứng nữa",
        ],
        correct: 0,
        explanation:
          "Người vừa mất tiền là nhóm dễ tổn thương nhất vì họ rất muốn tin còn cách cứu vãn, và có hẳn một mô hình riêng nhắm vào chính nhóm này.",
      },
      {
        question: "Nên xử lý các bằng chứng thế nào?",
        options: [
          "Giữ nguyên toàn bộ - tin nhắn, số tài khoản, ảnh chụp màn hình, lịch sử giao dịch",
          "Xóa các cuộc trò chuyện để tránh bị kẻ lừa đảo tiếp tục liên hệ",
          "Chỉ giữ lại những phần có liên quan trực tiếp tới việc chuyển tiền cho gọn gàng hồ sơ",
          "Chuyển toàn bộ cho một bên dịch vụ thu hồi tiền để họ xử lý giúp",
        ],
        correct: 0,
        explanation:
          "Phản xạ muốn xóa cho khuất mắt là tự nhiên và nó phá hủy đúng thứ cần dùng. Số tài khoản nhận tiền là thông tin quan trọng nhất, vì nó là điểm bám duy nhất để lần theo.",
      },
      {
        question: "Vì sao cảm giác xấu hổ lại là yếu tố nguy hiểm?",
        options: [
          "Vì nó khiến người ta chậm báo, và mỗi giờ chậm đều làm giảm khả năng thu hồi",
          "Vì nó khiến người ta không còn nhớ chính xác diễn biến của sự việc vừa xảy ra",
          "Vì nó làm mất quyền khiếu nại sau khi đã qua thời hạn quy định",
          "Vì nó khiến người ta chia sẻ quá nhiều thông tin lên mạng xã hội",
        ],
        correct: 0,
        explanation:
          "Đây là lý do bài đầu chặng nhấn mạnh rằng ai cũng có thể bị lừa. Hiểu rằng đây là cơ chế chứ không phải khiếm khuyết cá nhân giúp người ta hành động nhanh hơn thay vì giấu.",
      },
      {
        question: "Nếu đã cung cấp thông tin đăng nhập hoặc mã xác thực thì cần làm gì thêm?",
        options: [
          "Đổi ngay mật khẩu các tài khoản liên quan, bắt đầu từ email",
          "Chờ ngân hàng xác nhận rồi mới đổi để không ảnh hưởng tới điều tra",
          "Đóng toàn bộ tài khoản ngân hàng hiện có và mở tài khoản mới",
          "Chỉ cần đổi mật khẩu của đúng tài khoản đã bị lộ thông tin",
        ],
        correct: 0,
        explanation:
          "Đổi mật khẩu không ảnh hưởng tới điều tra vì lịch sử giao dịch vẫn còn nguyên. Bắt đầu từ email vì lý do đã nói ở bài trước: nó đặt lại được mật khẩu của mọi thứ khác.",
      },
    ],
    keyTakeaways: [
      "Gọi ngân hàng ngay - khoảng thời gian có thể can thiệp được tính bằng giờ",
      "Giữ nguyên mọi bằng chứng, đặc biệt là số tài khoản nhận tiền",
      "Không liên hệ lại kẻ lừa đảo, và cảnh giác với dịch vụ hứa thu hồi tiền",
      "Xấu hổ làm chậm việc báo tin, và chậm là thứ duy nhất khiến mất trắng",
    ],
    practicePrompt: {
      question:
        "Người thân vừa kể với bạn rằng họ mới chuyển tiền cho một kẻ lừa đảo. Việc đầu tiên bạn nên làm là gì?",
      options: [
        "Cùng họ gọi ngân hàng ngay lập tức, trước khi bàn tới bất cứ chuyện gì khác",
        "Hỏi thật kỹ diễn biến của sự việc để hiểu rõ mọi chuyện trước khi quyết định hành động",
        "Trấn an họ và hẹn hôm sau bình tĩnh rồi cùng ra ngân hàng xử lý",
        "Tìm hiểu xem có dịch vụ nào hỗ trợ thu hồi khoản tiền đó không",
      ],
      correct: 0,
      explanation:
        "Hỏi kỹ diễn biến là việc cần làm nhưng không phải việc đầu tiên - nó có thể làm song song trong lúc chờ tổng đài. Mỗi phút trôi qua đều làm giảm khả năng khoản tiền còn nằm ở tài khoản nhận đầu tiên.",
    },
    summary: {
      keyIdea: "Khoảng thời gian có thể thu hồi được tính bằng giờ, và xấu hổ là thứ tiêu tốn nó nhanh nhất",
      commonMistake: "Chờ đợi, hoặc liên hệ lại kẻ lừa đảo với hy vọng thương lượng",
      action: "Lưu số tổng đài ngân hàng vào danh bạ, và nói với gia đình rằng báo ngay quan trọng hơn giải thích.",
    },
    application: {
      title: "Nói trước một câu với gia đình",
      message:
        "Nếu có chuyện, gọi cho con hoặc gọi ngân hàng ngay - đừng ngại và đừng chờ. Câu này nói trước lúc chưa có chuyện thì mới có tác dụng lúc có chuyện.",
      secondary:
        "Người lớn tuổi thường giấu vì sợ bị trách. Cho họ biết trước rằng sẽ không ai trách là cách rút ngắn thời gian phản ứng hiệu quả nhất.",
    },
    sections: [
      {
        type: "lead",
        text: "Không ai đọc bài này trước khi cần, và đó là vấn đề - vì lúc cần thì người ta đang hoảng và xấu hổ, hai trạng thái làm chậm đúng thứ cần nhanh.",
      },
      { type: "heading", text: "Thứ tự việc cần làm" },
      {
        type: "list",
        items: [
          "Gọi ngân hàng ngay, báo giao dịch bị lừa đảo và đề nghị hỗ trợ - đây là việc đầu tiên",
          "Giữ nguyên mọi bằng chứng: tin nhắn, số tài khoản nhận, ảnh chụp màn hình, biên lai",
          "Trình báo cơ quan chức năng với đầy đủ hồ sơ đã giữ",
          "Đổi mật khẩu nếu có khả năng thông tin đăng nhập bị lộ, bắt đầu từ email",
        ],
      },
      {
        type: "paragraph",
        text: "Thứ tự này không tùy tiện. Chỉ bước đầu tiên có khả năng can thiệp vào dòng tiền, và khả năng ấy giảm theo từng giờ vì tiền thường được chuyển tiếp ngay sau khi nhận. Ba bước còn lại quan trọng nhưng không cạnh tranh với đồng hồ.",
      },
      {
        type: "callout",
        label: "Cảnh giác với vòng thứ hai",
        text: "Sau khi một người bị lừa, thường xuất hiện lời đề nghị giúp thu hồi tiền với phí ứng trước. Đây là mô hình riêng nhắm vào người vừa mất tiền, vì họ đang rất muốn tin còn cách cứu vãn. Không có dịch vụ tư nhân nào lấy lại được khoản đã chuyển đi, và mọi lời hứa như vậy chỉ làm khoản mất lớn thêm.",
      },
      {
        type: "closing",
        lines: [
          "Bị lừa không phải lỗi của người bị lừa; chậm báo mới là thứ biến một khoản có thể cứu thành khoản mất trắng.",
          "Bài cuối chặng: gộp bảy bài thành vài quy tắc mà cả nhà cùng dùng.",
        ],
      },
    ],
  },
  {
    id: 357,
    slug: "quy-tac-an-toan-cho-ca-nha",
    title: "Chặng 16, Bài 8: Tổng kết - quy tắc cho cả nhà",
    subtitle: "Bảy bài trước là kiến thức của bạn; bài này biến nó thành thứ bảo vệ được cả người không đọc",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "🏠",
    track: "personal",
    whyItMatters:
      "Người bị nhắm tới nhiều nhất thường là người ít đọc những nội dung này nhất - bố mẹ, ông bà, người ít dùng công nghệ. Kiến thức của bạn chỉ bảo vệ được họ nếu nó được rút gọn thành vài câu họ nhớ được và dùng được lúc đang hoảng.",
    openingQuestion: "Điều gì làm một quy tắc an toàn thật sự có tác dụng?",
    openingOptions: [
      "Nó đủ ngắn để nhớ được và áp dụng được ngay cả khi đang hoảng loạn",
      "Nó liệt kê đầy đủ các thủ đoạn lừa đảo đang phổ biến hiện nay",
      "Nó được viết ra chi tiết và dán ở nơi mọi người trong nhà đều thấy",
      "Nó phân biệt rõ từng loại lừa đảo và cách xử lý riêng cho mỗi loại",
    ],
    correctOption: 0,
    explanation:
      "Quy tắc chỉ có giá trị khi nó chạy được trong trạng thái xấu nhất - đúng lúc người ta đang sợ, đang gấp, đang bị giục. Một danh sách chi tiết phân loại từng thủ đoạn thì không ai nhớ nổi giữa lúc ấy, và nó cũng lỗi thời liên tục khi kịch bản mới xuất hiện. Một câu duy nhất kiểu mọi yêu cầu chuyển tiền gấp đều phải dừng lại và gọi lại bằng số tự tra thì bao được gần như toàn bộ các trường hợp trong bảy bài trước, và nó nhớ được. Dán ở nơi dễ thấy có ích, nhưng nó là cách triển khai chứ không phải điều làm quy tắc hiệu quả.",
    diagram: [
      { label: "Kiến thức chi tiết cho người đọc", arrow: true },
      { label: "Rút thành một câu cho cả nhà", arrow: true },
      { label: "Thống nhất TRƯỚC khi có chuyện", arrow: true },
      { label: "Và nói rõ: báo ngay, không ai trách" },
    ],
    realWorldExample: {
      company: "Một câu thay cho bảy bài",
      description:
        "Một gia đình thống nhất đúng một câu: mọi yêu cầu chuyển tiền gấp đều dừng lại và gọi cho con trước, kể cả khi người yêu cầu là cơ quan, ngân hàng hay chính người thân. Vài tháng sau người mẹ nhận cuộc gọi mạo danh cơ quan chức năng. Bà không cần biết thủ đoạn ấy tên gì hay hoạt động ra sao - bà chỉ làm đúng câu đã thống nhất, và cuộc gọi kết thúc ở đó.",
    },
    quiz: [
      {
        question: "Vì sao một quy tắc ngắn hiệu quả hơn một danh sách thủ đoạn?",
        options: [
          "Vì nó vẫn dùng được khi người ta đang hoảng, và không lỗi thời khi kịch bản đổi",
          "Vì danh sách thủ đoạn thường không chính xác",
          "Vì quy tắc ngắn dễ được cơ quan chức năng công nhận hơn",
          "Vì người lớn tuổi không có khả năng ghi nhớ danh sách dài",
        ],
        correct: 0,
        explanation:
          "Hai tính chất này quan trọng ngang nhau. Kịch bản mới xuất hiện liên tục nên danh sách luôn thiếu, còn trạng thái hoảng loạn thì làm mọi thứ dài hơn một câu trở nên vô dụng.",
      },
      {
        question: "Vì sao phải thống nhất quy tắc TRƯỚC khi có chuyện?",
        options: [
          "Vì giữa lúc hoảng loạn thì không ai nghĩ ra được quy tắc nào",
          "Vì quy tắc cần thời gian để mọi người trong nhà tập làm quen",
          "Vì sau khi có chuyện thì người bị lừa sẽ không muốn nghe góp ý",
          "Vì cơ quan chức năng yêu cầu gia đình có thỏa thuận trước bằng văn bản",
        ],
        correct: 0,
        explanation:
          "Bài đầu chặng đã nói: trò lừa nhắm vào trạng thái. Quy tắc là thứ duy nhất tồn tại sẵn từ trước nên nó không bị trạng thái đó xóa đi.",
      },
      {
        question: "Vì sao cần nói rõ với người nhà rằng báo ngay sẽ không bị trách?",
        options: [
          "Vì sợ bị trách là lý do phổ biến nhất khiến người ta giấu và báo muộn",
          "Vì đó là quy định bắt buộc khi làm việc với cơ quan chức năng",
          "Vì người bị lừa cần được động viên tinh thần để nhớ lại diễn biến thật chính xác",
          "Vì việc trách móc khiến người bị lừa dễ tiếp tục mắc lần thứ hai",
        ],
        correct: 0,
        explanation:
          "Bài trước đã cho thấy tốc độ quyết định khả năng thu hồi. Nỗi sợ bị trách trực tiếp làm chậm bước đầu tiên, nên xử lý nó trước là một biện pháp kỹ thuật chứ không chỉ là sự tử tế.",
      },
      {
        question: "Câu quy tắc tốt nhất nên có dạng thế nào?",
        options: [
          "Mọi yêu cầu chuyển tiền gấp đều dừng lại và gọi lại bằng số tự tra",
          "Không tin bất kỳ ai gọi điện tới từ số điện thoại lạ",
          "Chỉ chuyển tiền cho người thân và bạn bè thân thiết",
          "Kiểm tra thật kỹ mọi thông tin trước khi thực hiện bất kỳ giao dịch nào",
        ],
        correct: 0,
        explanation:
          "Ba câu kia hoặc quá rộng để hành động, hoặc đã hết hiệu lực - bài 3 cho thấy người thân cũng bị mạo danh được. Câu đầu nói rõ hành động cụ thể và bao được cả trường hợp người quen.",
      },
      {
        question: "Ai trong nhà nên được ưu tiên nói chuyện trước?",
        options: [
          "Người ít tiếp xúc với các cảnh báo này nhất và giữ tiền tiết kiệm của gia đình",
          "Người trẻ nhất vì họ dùng nhiều ứng dụng và mạng xã hội nhất",
          "Người có thu nhập cao nhất vì họ là mục tiêu giá trị nhất",
          "Tất cả cùng lúc trong một buổi họp gia đình",
        ],
        correct: 0,
        explanation:
          "Người trẻ gặp nhiều lời mời hơn nhưng thường có nhiều thông tin hơn và khoản tiền nhỏ hơn. Người lớn tuổi giữ tiền tiết kiệm và ít gặp cảnh báo - đó là kết hợp rủi ro cao nhất.",
      },
    ],
    keyTakeaways: [
      "Quy tắc phải đủ ngắn để chạy được khi đang hoảng, và không lỗi thời khi kịch bản đổi",
      "Thống nhất TRƯỚC khi có chuyện - giữa lúc hoảng thì không ai nghĩ ra quy tắc nào",
      "Nói rõ báo ngay sẽ không bị trách, vì sợ bị trách làm chậm bước quan trọng nhất",
      "Ưu tiên người ít gặp cảnh báo nhất mà lại giữ tiền tiết kiệm của gia đình",
    ],
    practicePrompt: {
      question:
        "Bạn muốn bảo vệ bố mẹ khỏi lừa đảo nhưng họ không đọc những nội dung dài. Cách hiệu quả nhất là gì?",
      options: [
        "Thống nhất một câu duy nhất và nhắc lại vài lần cho tới khi thành phản xạ",
        "Gửi cho họ các bài viết cảnh báo mỗi khi có một thủ đoạn mới nào đó xuất hiện",
        "Cài phần mềm chặn cuộc gọi lạ trên điện thoại của họ",
        "Yêu cầu họ hỏi ý kiến bạn trước mọi giao dịch dù lớn hay nhỏ",
      ],
      correct: 0,
      explanation:
        "Gửi bài viết liên tục tạo cảm giác đã làm gì đó nhưng không đọng lại quy tắc nào. Yêu cầu hỏi trước mọi giao dịch thì quá rộng nên sẽ bị bỏ qua - còn giới hạn ở chuyển tiền gấp thì đủ hẹp để thực hiện được.",
    },
    summary: {
      keyIdea: "Kiến thức chi tiết cho bạn, một câu duy nhất cho những người bạn muốn bảo vệ",
      commonMistake: "Gửi bài cảnh báo cho người nhà và tin rằng như vậy là đã bảo vệ được họ",
      action: "Chọn một câu quy tắc, nói với cả nhà tuần này, và nhắc lại cho tới khi thành phản xạ.",
    },
    application: {
      title: "Một câu, nói tuần này",
      message:
        "Chọn câu của gia đình bạn - ví dụ: mọi yêu cầu chuyển tiền gấp đều dừng lại và gọi cho con trước, kể cả khi người yêu cầu là cơ quan, ngân hàng hay người thân. Nói nó ra, và nhắc lại vài lần.",
      secondary:
        "Kèm theo một câu nữa quan trọng không kém: nếu lỡ có chuyện thì báo ngay, sẽ không ai trách. Câu đó rút ngắn thời gian phản ứng nhiều hơn mọi lời cảnh báo.",
    },
    sections: [
      {
        type: "lead",
        text: "Bảy bài trước dành cho bạn - người đang đọc. Bài này giải quyết vấn đề khác: những người bị nhắm tới nhiều nhất thường là những người sẽ không bao giờ đọc bảy bài đó.",
      },
      { type: "heading", text: "Rút bảy bài thành một câu" },
      {
        type: "paragraph",
        text: "Mọi kịch bản trong chặng này đều cần ba điều kiện: bạn hành động gấp, bạn hành động một mình, và bạn dùng kênh liên lạc do họ chọn. Một câu quy tắc phá được cả ba cùng lúc - dừng lại phá điều kiện thứ nhất, gọi cho người khác phá điều kiện thứ hai, và gọi bằng số tự tra phá điều kiện thứ ba. Đó là lý do một câu ngắn bao được nhiều tình huống hơn một danh sách dài.",
      },
      {
        type: "conceptTable",
        title: "Ba điều kiện chung, và câu quy tắc phá cả ba",
        subtitle: "Kịch bản nào cũng cần đủ ba - thiếu một là hỏng",
        concepts: [
          {
            vi: "Phải gấp",
            en: "Urgency",
            def: "Bị phá bởi hai chữ dừng lại. Việc thật không hỏng đi vì chậm mười lăm phút; việc giả thì có.",
          },
          {
            vi: "Phải một mình",
            en: "Isolation",
            def: "Bị phá bởi việc gọi cho người khác. Trạng thái không lây, nên người thứ hai nhìn ra ngay điều bạn đang không thấy.",
          },
          {
            vi: "Phải qua kênh của họ",
            en: "Their channel",
            def: "Bị phá bởi việc gọi lại bằng số tự tra. Số hiển thị giả được, tài khoản chiếm được, giọng và mặt tạo giả được.",
          },
        ],
      },
      {
        type: "callout",
        label: "Câu thứ hai quan trọng ngang câu thứ nhất",
        text: "Nếu lỡ có chuyện thì báo ngay, sẽ không ai trách. Bài trước cho thấy khả năng thu hồi được tính bằng giờ, và lý do phổ biến nhất khiến người ta chậm báo là sợ bị mắng. Nói trước câu này - lúc chưa có chuyện - làm được nhiều hơn mọi lời cảnh báo về thủ đoạn.",
      },
      {
        type: "closing",
        lines: [
          "Hết Chặng 16. Điều đáng giá nhất không phải bạn nhớ được bao nhiêu thủ đoạn, mà là gia đình bạn nhớ được một câu.",
          "Và câu ấy chỉ có tác dụng nếu được nói ra trước khi cần tới nó.",
        ],
      },
    ],
  },
];
